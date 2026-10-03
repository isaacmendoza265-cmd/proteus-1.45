// Noticias por unidad territorial: búsqueda de Google desde Gemini, bajo demanda (botón "Noticias" del mapa).
// Reglas en src/services/noticias/noticias.ts. Gemini y la resolución de enlaces se inyectan (pruebas sin red).
import express, { Router } from 'express';
import type { Prisma, PrismaClient } from '@prisma/client';
import { usuarioDe } from './sesion';
import {
  esRedireccionGoogle, extraerNoticias, promptNoticias,
  type RegistroNoticias, type RespuestaBusqueda,
} from '../services/noticias/noticias';

export interface DepsNoticias {
  /** Llama a Gemini con la herramienta googleSearch */
  buscar: (prompt: string) => Promise<RespuestaBusqueda>;
  modelo: string;
  /** Destino final de un enlace de redirección de Google (los de vertexaisearch caducan) */
  resolver?: (uri: string) => Promise<string>;
}

const ID_VALIDO = /^(muni:\d{5}|sub:[\p{L} .'-]{2,60}|antioquia|[a-z0-9-]{2,80})$/u;
const hoyBogota = (d = new Date()) => d.toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });

/** Sigue una sola redirección, y solo de vertexaisearch (nada de seguir enlaces arbitrarios desde el servidor). */
export async function resolverRedireccion(uri: string): Promise<string> {
  if (!esRedireccionGoogle(uri)) return uri;
  try {
    const r = await fetch(uri, { method: 'HEAD', redirect: 'manual', signal: AbortSignal.timeout(5000) });
    const destino = r.headers.get('location');
    return destino && /^https?:\/\//.test(destino) ? destino : uri;
  } catch {
    return uri;
  }
}

const aRegistro = (f: { unidadId: string; nombre: string; buscadoEn: Date; datos: unknown }): RegistroNoticias => ({
  ...(f.datos as Omit<RegistroNoticias, 'unidadId' | 'nombre' | 'buscadoEn'>),
  unidadId: f.unidadId,
  nombre: f.nombre,
  buscadoEn: f.buscadoEn.toISOString(),
});

export function rutasNoticias(prisma: PrismaClient, deps: DepsNoticias) {
  const router = Router();
  router.use(express.json({ limit: '50kb' }));
  const resolver = deps.resolver ?? resolverRedireccion;

  const ultima = (unidadId: string) =>
    prisma.noticiasUnidad.findFirst({ where: { unidadId }, orderBy: { buscadoEn: 'desc' } });

  // Última búsqueda de varias unidades: GET /api/noticias?ids=muni:05001,comuna-14
  router.get('/', async (req, res) => {
    const ids = String(req.query.ids ?? '').split(',').map((s) => s.trim()).filter((s) => ID_VALIDO.test(s)).slice(0, 10);
    const filas = await Promise.all(ids.map(ultima));
    res.json({ registros: Object.fromEntries(filas.filter(Boolean).map((f) => [f!.unidadId, aRegistro(f!)])) });
  });

  // Buscar (o devolver la búsqueda de hoy): POST /api/noticias/buscar {unidadId, nombre, consulta, forzar?}
  router.post('/buscar', async (req, res) => {
    const { unidadId, nombre, consulta, forzar } = req.body ?? {};
    if (typeof unidadId !== 'string' || !ID_VALIDO.test(unidadId) || typeof nombre !== 'string' || !nombre.trim()
      || typeof consulta !== 'string' || !consulta.trim() || consulta.length > 200 || nombre.length > 120) {
      res.status(400).json({ error: 'Falta la unidad, su nombre o la consulta (máximo 200 caracteres).' });
      return;
    }
    const previa = await ultima(unidadId);
    if (previa && !forzar && hoyBogota(previa.buscadoEn) === hoyBogota()) {
      res.json({ registro: aRegistro(previa), deCache: true });
      return;
    }
    try {
      const r = await deps.buscar(promptNoticias(consulta.trim(), hoyBogota()));
      const ext = extraerNoticias(r);
      const noticias = await Promise.all(ext.noticias.map(async (n) => ({ ...n, enlace: await resolver(n.enlace) })));
      const datos = { noticias, descartadas: ext.descartadas, consultas: ext.consultas, sugerenciasHtml: ext.sugerenciasHtml, modelo: deps.modelo };
      const fila = await prisma.noticiasUnidad.create({
        data: { unidadId, nombre: nombre.trim(), datos: datos as unknown as Prisma.InputJsonObject, buscadoPor: usuarioDe(res).email },
      });
      res.status(201).json({ registro: aRegistro(fila), deCache: false });
    } catch (err: unknown) {
      const e = err as { status?: number; message?: string };
      const status = Number(e?.status) || 502;
      console.error('Error en /api/noticias/buscar:', err);
      const motivo = status === 401 || status === 403
        ? 'Google rechazó la clave de Gemini del servidor (sin permiso).'
        : status === 429 ? 'Se agotó la cuota de Gemini. Intenta más tarde.' : 'No se pudo buscar noticias.';
      res.status(status).json({ error: `${motivo} (${status}${e?.message ? `: ${String(e.message).slice(0, 200)}` : ''})` });
    }
  });

  return router;
}

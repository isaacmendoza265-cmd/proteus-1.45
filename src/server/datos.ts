// Datos que produce el equipo y que antes vivían en el localStorage de cada navegador: perfil del
// candidato (con su identidad), piezas analizadas y archivos guardados. Compartidos por todo el equipo.
import express, { Router } from 'express';
import type { Prisma, PrismaClient } from '@prisma/client';
import { usuarioDe } from './sesion';

const MAX_PIEZAS = 200;

export function rutasDatos(prisma: PrismaClient) {
  const router = Router();
  router.use(express.json({ limit: '15mb' }));

  // ---- Perfil del candidato activo ----
  router.get('/perfil', async (_req, res) => {
    const fila = await prisma.perfilCandidato.findUnique({ where: { clave: 'activo' } });
    res.json({ perfil: fila?.datos ?? null, actualizadoEn: fila?.actualizadoEn ?? null, actualizadoPor: fila?.actualizadoPor ?? null });
  });

  router.put('/perfil', async (req, res) => {
    const perfil = req.body?.perfil;
    if (!perfil || typeof perfil !== 'object' || Array.isArray(perfil)) {
      res.status(400).json({ error: 'Falta el perfil.' });
      return;
    }
    const datos = perfil as Prisma.InputJsonObject;
    const actualizadoPor = usuarioDe(res).email;
    await prisma.perfilCandidato.upsert({
      where: { clave: 'activo' },
      create: { clave: 'activo', datos, actualizadoPor },
      update: { datos, actualizadoPor },
    });
    res.json({ ok: true });
  });

  // ---- Piezas analizadas ----
  router.get('/piezas', async (_req, res) => {
    const filas = await prisma.piezaAnalizada.findMany({ orderBy: { creadoEn: 'desc' }, take: MAX_PIEZAS });
    res.json({ piezas: filas.map((f) => f.datos) });
  });

  router.post('/piezas', async (req, res) => {
    const pieza = req.body?.pieza;
    if (!pieza || typeof pieza.id !== 'string' || !pieza.id) {
      res.status(400).json({ error: 'Falta la pieza (con su id).' });
      return;
    }
    const datos = pieza as Prisma.InputJsonObject;
    await prisma.piezaAnalizada.upsert({
      where: { id: pieza.id },
      create: { id: pieza.id, datos, creadoPor: usuarioDe(res).email },
      update: { datos },
    });
    res.status(201).json({ ok: true });
  });

  router.delete('/piezas/:id', async (req, res) => {
    await prisma.piezaAnalizada.deleteMany({ where: { id: req.params.id } });
    res.json({ ok: true });
  });

  // ---- Archivos guardados (briefs, análisis y reportes de los módulos) ----
  router.get('/archivos', async (_req, res) => {
    const archivos = await prisma.archivoGuardado.findMany({
      orderBy: { creadoEn: 'desc' },
      select: { id: true, nombre: true, categoria: true, candidato: true, creadoEn: true, creadoPor: true, contenido: true },
    });
    // La lista lleva tamaño y vista previa; el contenido completo se pide al descargar
    res.json({
      archivos: archivos.map(({ contenido, ...a }) => ({
        ...a,
        bytes: Buffer.byteLength(contenido),
        vistaPrevia: contenido.slice(0, 160) + (contenido.length > 160 ? '…' : ''),
      })),
    });
  });

  router.get('/archivos/:id', async (req, res) => {
    const a = await prisma.archivoGuardado.findUnique({ where: { id: req.params.id } });
    if (!a) {
      res.status(404).json({ error: 'Archivo no encontrado.' });
      return;
    }
    const nombre = `${a.nombre.replace(/[^\p{L}\p{N}_.-]+/gu, '_').slice(0, 120)}.json`;
    res.set('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(nombre)}`).type('application/json').send(a.contenido);
  });

  router.post('/archivos', async (req, res) => {
    const { nombre, categoria, candidato, datos } = req.body ?? {};
    if (typeof nombre !== 'string' || !nombre.trim() || datos === undefined) {
      res.status(400).json({ error: 'Faltan el nombre o los datos del archivo.' });
      return;
    }
    const archivo = await prisma.archivoGuardado.create({
      data: {
        nombre: nombre.trim().slice(0, 200),
        categoria: String(categoria || 'analisis_territorial'),
        candidato: String(candidato || 'Candidato general'),
        contenido: typeof datos === 'string' ? datos : JSON.stringify(datos, null, 2),
        creadoPor: usuarioDe(res).email,
      },
      select: { id: true, nombre: true, creadoEn: true },
    });
    res.status(201).json({ archivo });
  });

  router.delete('/archivos/:id', async (req, res) => {
    await prisma.archivoGuardado.deleteMany({ where: { id: req.params.id } });
    res.json({ ok: true });
  });

  return router;
}

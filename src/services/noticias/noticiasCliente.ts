/**
 * Noticias en el navegador: lee las búsquedas guardadas (GET /api/noticias) y lanza búsquedas nuevas
 * (POST /api/noticias/buscar). Tras una búsqueda invalida el dossier para que todos los análisis la usen.
 */
import { invalidarFuentes } from '../ia/motor/registro';
import { territorioFicha, type TerritorioFicha } from '../territoryProfileService';
import { objetivoNoticias, type ObjetivoNoticias, type RegistroNoticias } from './noticias';
import type { SeleccionDossier } from '../dossierTerritorialService';

const guardadas = new Map<string, RegistroNoticias | null>();

/** Objetivo de búsqueda para la unidad del mapa (un barrio usa su comuna). */
export function objetivoDeSeleccion(sel: SeleccionDossier): ObjetivoNoticias {
  const id = sel.barrioId ?? sel.comunaId ?? sel.muniId;
  const t = id ? territorioFicha(id) : null;
  const padre = t?.tipo === 'subdivision' && t.padreId ? territorioFicha(t.padreId) : null;
  return objetivoNoticias(t, sel.subregion, padre);
}

/** Ids de noticias que alimentan el dossier de una unidad: la suya (o la de su comuna) y la de su municipio. */
export function idsParaDossier(t: TerritorioFicha | null, subregion: string | null): { id: string; rotulo: string; max: number }[] {
  if (!t) return [{ id: subregion ? `sub:${subregion}` : 'antioquia', rotulo: '', max: 12 }];
  const muni = { id: `muni:${t.dane}`, rotulo: t.tipo === 'municipio' ? '' : `(del municipio de ${t.municipio}) `, max: t.tipo === 'municipio' ? 12 : 5 };
  if (t.tipo === 'municipio') return [muni];
  if (t.tipo === 'subdivision' && t.padreId) {
    return [{ id: t.padreId, rotulo: `(de ${territorioFicha(t.padreId)?.nombre ?? 'su comuna'}) `, max: 12 }, muni];
  }
  return [{ id: t.id, rotulo: '', max: 12 }, muni];
}

export async function cargarNoticias(ids: string[]): Promise<Record<string, RegistroNoticias>> {
  const faltan = ids.filter((i) => !guardadas.has(i));
  if (faltan.length && typeof window !== 'undefined' && typeof fetch === 'function') {
    try {
      const r = await fetch(`/api/noticias?ids=${encodeURIComponent(faltan.join(','))}`);
      if (r.ok) {
        const { registros } = await r.json() as { registros: Record<string, RegistroNoticias> };
        for (const i of faltan) guardadas.set(i, registros[i] ?? null);
      }
    } catch { /* sin servidor (pruebas) o sin sesión */ }
  }
  return Object.fromEntries(ids.map((i) => [i, guardadas.get(i)]).filter(([, v]) => v)) as Record<string, RegistroNoticias>;
}

export async function buscarNoticias(o: ObjetivoNoticias, forzar = false): Promise<{ registro: RegistroNoticias; deCache: boolean }> {
  const r = await fetch('/api/noticias/buscar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ unidadId: o.unidadId, nombre: o.nombre, consulta: o.consulta, forzar }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || `No se pudo buscar noticias (${r.status}).`);
  guardadas.set(o.unidadId, j.registro);
  invalidarFuentes();
  return j;
}

/** Solo para pruebas */
export const _fijarNoticias = (id: string, r: RegistroNoticias | null) => { guardadas.set(id, r); invalidarFuentes(); };

/**
 * ESTRATIFICACIÓN OFICIAL DEL MUNICIPIO (la que adopta la alcaldía, predio por predio), por barrio y vereda.
 *
 * src/data/estratificacion/<municipio>.json, generados con `python3 scripts/build_estratificacion_oficial.py`
 * (crudos y procedencia en _originales/estratificacion/). Hoy: Sabaneta. Es distinta del estrato del censo DANE
 * 2018 que ya muestra la ficha (lo que declararon los hogares por su factura de energía, por manzana).
 * Archivos pequeños: se leen con import.meta.glob eager, así que un municipio sin archivo simplemente no tiene bloque.
 */
import { idsBarrios, type TerritorioFicha } from './territoryProfileService';

interface ArchivoEstratificacion {
  meta: { fuente: string; url: string; unidad: string; corte: string; descarga: string; nota: string };
  /** Predios por estrato 1 a 6 en todo el municipio (incluye los sin ubicar) */
  municipio: number[];
  sinUbicar: number;
  porTerritorio: Record<string, number[]>;
}

const ARCHIVOS = import.meta.glob<ArchivoEstratificacion>('../data/estratificacion/*.json', { eager: true, import: 'default' });

export interface EstratificacionOficial {
  /** Predios por estrato 1 a 6 */
  estratos: number[];
  total: number;
  estratoModa: number;
  fuente: string;
  url: string;
  unidad: string;
  corte: string;
  nota: string;
}

/** Estratificación oficial de un municipio, comuna, barrio o vereda; null si el municipio no la publica */
export function estratificacionOficial(t: TerritorioFicha, slug: string | null): EstratificacionOficial | null {
  const a = slug ? ARCHIVOS[`../data/estratificacion/${slug}.json`] : undefined;
  if (!a) return null;
  const estratos = t.tipo === 'municipio'
    ? a.municipio
    : idsBarrios(t).map((id) => a.porTerritorio[id]).filter(Boolean).reduce((acc, f) => acc.map((v, i) => v + f[i]), [0, 0, 0, 0, 0, 0]);
  const total = estratos.reduce((s, v) => s + v, 0);
  if (!total) return null;
  return {
    estratos, total, estratoModa: estratos.indexOf(Math.max(...estratos)) + 1,
    fuente: a.meta.fuente, url: a.meta.url, unidad: a.meta.unidad, corte: a.meta.corte, nota: a.meta.nota,
  };
}

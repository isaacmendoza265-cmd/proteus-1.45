/// <reference types="vite/client" />
/**
 * PUESTOS DE VOTACIÓN (municipios con más de 20.000 votantes)
 *
 * - Censo, mesas y código de cada puesto: censo electoral de la Registraduría, corte 30-abr-2026.
 * - Dirección, comuna y coordenadas: Divipole 2023 georreferenciada de la Registraduría
 *   (datos.gov.co mv2e-prx5), cruzada por nombre de puesto. Los puestos creados después de 2023
 *   no tienen coordenadas (`divipole2023: null`).
 *
 * Datos generados por `python3 scripts/build_puestos_20k.py`. El resumen por municipio se carga
 * siempre (≈50 KB); los puestos se cargan por departamento, bajo demanda.
 */
import resumen from '../data/electoral/puestos/resumen.json';
import { getMunicipalCensus, normalizeTerritoryName, resolveDepartmentId } from './electoralCensusService';
import type { TerritoryGeoFeature } from '../data/geojson/types';

export type TipoCruce = 'exacto' | 'normalizado' | 'aproximado';

export interface UbicacionDivipole {
  /** Nombre del puesto en la Divipole 2023 */
  puesto: string;
  /** Comuna o localidad que asigna la Registraduría (solo en ciudades que las tienen) */
  comuna: string | null;
  direccion: string | null;
  lat: number | null;
  lon: number | null;
  /** Presente cuando la fuente trae coordenadas imposibles (se anulan) */
  coordenadaInvalida?: string;
  cruce: TipoCruce;
  similitud: number;
}

export interface PuestoVotacion {
  /** Código Registraduría del municipio (departamento 2 + municipio 3). No es DANE. */
  codMunicipio: string;
  /** Código completo del puesto: municipio (5) + zona (2) + puesto (2) */
  codPuesto: string;
  zona: string;
  puesto: string;
  mujeres: number;
  hombres: number;
  total: number;
  mesas: number;
  divipole2023: UbicacionDivipole | null;
}

export interface Municipio20k {
  codMunicipio: string;
  /** id del departamento (igual que en electoralCensusService) */
  departamento: string;
  municipio: string;
  dane: string | null;
  censo: number;
  mesas: number;
  puestos: number;
  puestosConCoordenadas: number;
}

interface Resumen {
  meta: { criterio: string; fuentes: string[]; nota: string; cruce: Record<string, number> };
  municipios: Municipio20k[];
}

const DATA = resumen as Resumen;

export const PUESTOS_META = DATA.meta;
/** Municipios con más de 20.000 votantes, de mayor a menor censo */
export const MUNICIPIOS_20K: Municipio20k[] = DATA.municipios;
export const UMBRAL_MUNICIPIOS_PUESTOS = 20_000;

const porCodigo = new Map(MUNICIPIOS_20K.map((m) => [m.codMunicipio, m]));

/** Municipio por código de la Registraduría (p. ej. '01001' = Medellín) */
export function getMunicipio20kByRegistraduria(codigo: string): Municipio20k | undefined {
  return porCodigo.get(codigo);
}

/**
 * Municipio por nombre o código DANE (el DANE solo está cargado para Antioquia). Devuelve
 * `undefined` si el municipio tiene 20.000 votantes o menos.
 */
export function getMunicipio20k(nameOrDane: string, department = 'antioquia'): Municipio20k | undefined {
  const censo = getMunicipalCensus(nameOrDane, department);
  return censo ? porCodigo.get(censo.codigoRegistraduria) : undefined;
}

/** Municipios con más de 20.000 votantes de un departamento (nombre o id) */
export function getMunicipios20kDepartamento(department: string): Municipio20k[] {
  const dep = resolveDepartmentId(department);
  return dep ? MUNICIPIOS_20K.filter((m) => m.departamento === dep) : [];
}

// --- Carga bajo demanda ------------------------------------------------------------------

const cargadores = import.meta.glob<{ default: PuestoVotacion[] }>(['../data/electoral/puestos/*.json', '!../data/electoral/puestos/resumen.json']);
const cache = new Map<string, Promise<PuestoVotacion[]>>();

/** Todos los puestos (de municipios > 20.000) de un departamento */
export function loadPuestosDepartamento(department: string): Promise<PuestoVotacion[]> {
  const dep = resolveDepartmentId(department);
  const loader = dep ? cargadores[`../data/electoral/puestos/${dep}.json`] : undefined;
  if (!dep || !loader) return Promise.resolve([]);
  if (!cache.has(dep)) cache.set(dep, loader().then((m) => m.default));
  return cache.get(dep)!;
}

export async function loadPuestosMunicipio(m: Municipio20k): Promise<PuestoVotacion[]> {
  const lista = await loadPuestosDepartamento(m.departamento);
  return lista.filter((p) => p.codMunicipio === m.codMunicipio);
}

export function tieneCoordenadas(p: PuestoVotacion): p is PuestoVotacion & { divipole2023: UbicacionDivipole & { lat: number; lon: number } } {
  return p.divipole2023?.lat != null && p.divipole2023?.lon != null;
}

// --- Puestos dentro de comunas, barrios o veredas -----------------------------------------

type Ring = number[][];

function inRing(x: number, y: number, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function polygonsOf(geometry: TerritoryGeoFeature['geometry']): Ring[][] {
  const g = geometry as { type: string; coordinates: unknown };
  if (g.type === 'Polygon') return [g.coordinates as Ring[]];
  if (g.type === 'MultiPolygon') return g.coordinates as Ring[][];
  return [];
}

/** ¿El punto (lon, lat) cae dentro del polígono del territorio? */
export function puntoEnTerritorio(lon: number, lat: number, feature: TerritoryGeoFeature): boolean {
  return polygonsOf(feature.geometry).some(
    (rings) => rings.length > 0 && inRing(lon, lat, rings[0]) && !rings.slice(1).some((h) => inRing(lon, lat, h)),
  );
}

export interface ResumenTerritorio {
  censo: number;
  mesas: number;
  puestos: number;
}

export interface AsignacionPuestos {
  /** id del territorio -> totales de los puestos que caen dentro */
  porTerritorio: Record<string, ResumenTerritorio>;
  /** codPuesto -> id del territorio */
  territorioDePuesto: Record<string, string>;
  /** Puestos sin coordenadas (no se pueden ubicar) */
  sinCoordenadas: PuestoVotacion[];
  /** Puestos con coordenadas que no caen en ningún territorio de la capa */
  fueraDeLaCapa: PuestoVotacion[];
}

/**
 * Ubica cada puesto en el territorio (comuna, barrio, vereda...) que lo contiene y suma su censo.
 * Solo usa las coordenadas de la Divipole 2023; no reparte ni estima nada.
 */
export function asignarPuestosATerritorios(puestos: PuestoVotacion[], features: TerritoryGeoFeature[]): AsignacionPuestos {
  const cajas = features.map((f) => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const rings of polygonsOf(f.geometry)) {
      for (const [x, y] of rings[0] ?? []) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
    return { f, minX, minY, maxX, maxY };
  });
  const out: AsignacionPuestos = { porTerritorio: {}, territorioDePuesto: {}, sinCoordenadas: [], fueraDeLaCapa: [] };
  for (const p of puestos) {
    if (!tieneCoordenadas(p)) {
      out.sinCoordenadas.push(p);
      continue;
    }
    const { lon, lat } = p.divipole2023;
    const hit = cajas.find((c) => lon >= c.minX && lon <= c.maxX && lat >= c.minY && lat <= c.maxY && puntoEnTerritorio(lon, lat, c.f));
    if (!hit) {
      out.fueraDeLaCapa.push(p);
      continue;
    }
    const id = String(hit.f.id);
    out.territorioDePuesto[p.codPuesto] = id;
    const t = (out.porTerritorio[id] ??= { censo: 0, mesas: 0, puestos: 0 });
    t.censo += p.total;
    t.mesas += p.mesas;
    t.puestos += 1;
  }
  return out;
}

/** Texto corto sobre la calidad del cruce con la Divipole 2023 */
export function describirCruce(p: PuestoVotacion): string {
  const d = p.divipole2023;
  if (!d) return 'Sin ubicar: no aparece en la Divipole 2023 (probablemente es un puesto nuevo)';
  if (d.lat == null) return `Coordenadas inválidas en la fuente (${d.coordenadaInvalida})`;
  if (d.cruce === 'exacto') return 'Ubicado con la Divipole 2023 (mismo nombre)';
  if (d.cruce === 'normalizado') return `Ubicado con la Divipole 2023 (nombre equivalente: ${d.puesto})`;
  return `Ubicado por nombre parecido (${Math.round(d.similitud * 100)} %): ${d.puesto}. Conviene verificar`;
}

/** Nombre normalizado, útil para buscar puestos */
export const normalizarPuesto = (s: string) => normalizeTerritoryName(s);

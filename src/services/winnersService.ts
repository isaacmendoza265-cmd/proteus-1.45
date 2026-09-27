/**
 * GANADORES POR TERRITORIO Y ELECCIÓN (capa "Resultado electoral" del mapa)
 *
 * - Escala departamental: índice precalculado por municipio (scripts/indice_ganadores.py ->
 *   src/data/electoral/ganadoresMunicipio.json), cargado bajo demanda.
 * - Escala municipal: suma de los puestos que caen en cada comuna/barrio/vereda (misma regla de la
 *   ficha: 2026 por el código del censo; los demás años por la ubicación de cada puesto ese año).
 * En Presidencia se colorea por candidato (los partidos de los candidatos presidenciales suelen ser
 * coaliciones sin color propio); en las demás, por el partido del ganador o la lista más votada.
 */
import { colorDePartido, COLOR_SIN_DATO } from '../data/electoral/partidoColors';
import { sumarEleccion, type EleccionPuestos } from './electionResultsService';
import { puntoEnTerritorio, tieneCoordenadas, type PuestoVotacion } from './pollingStationsService';
import type { TerritoryGeoFeature } from '../data/geojson/types';

/** [ganador, partido, % de votos válidos, votantes] */
export type Ganador = [string, string, number, number];
export interface IndiceGanadores {
  elecciones: { id: string; nombre: string }[];
  ganadores: Record<string, Record<string, Ganador>>;
}

let carga: Promise<IndiceGanadores> | null = null;
export function cargarGanadores(): Promise<IndiceGanadores> {
  carga ??= import('../data/electoral/ganadoresMunicipio.json').then((m) => m.default as unknown as IndiceGanadores);
  return carga;
}

export const esPresidencial = (id: string) => id.startsWith('presidente');

const PALETA_CANDIDATOS = ['#0284c7', '#a855f7', '#f59e0b', '#10b981', '#ef4444', '#64748b'];

/** Color de cada candidato presidencial: por número de municipios ganados en Antioquia */
export function coloresCandidatos(indice: IndiceGanadores, eleccionId: string): { nombre: string; color: string }[] {
  const conteo = new Map<string, number>();
  for (const g of Object.values(indice.ganadores[eleccionId] ?? {})) conteo.set(g[0], (conteo.get(g[0]) ?? 0) + 1);
  return [...conteo.entries()].sort((a, b) => b[1] - a[1]).map(([nombre], i) => ({ nombre, color: PALETA_CANDIDATOS[Math.min(i, PALETA_CANDIDATOS.length - 1)] }));
}

export function colorGanador(eleccionId: string, g: { ganador: string; partido: string } | undefined, candidatos: { nombre: string; color: string }[]): string {
  if (!g) return COLOR_SIN_DATO;
  if (esPresidencial(eleccionId)) return candidatos.find((c) => c.nombre === g.ganador)?.color ?? PALETA_CANDIDATOS[PALETA_CANDIDATOS.length - 1];
  return colorDePartido(g.partido).color;
}

export interface GanadorTerritorio { ganador: string; partido: string; pct: number; votantes: number; puestos: number }

/** Ganador de la elección en cada territorio de una capa municipal (solo con los puestos que caen dentro) */
export function ganadoresPorTerritorio(e: EleccionPuestos, features: TerritoryGeoFeature[], puestos2026: PuestoVotacion[]): Record<string, GanadorTerritorio> {
  const puntos: [string, number, number][] = e.codigos === '2026'
    ? puestos2026.filter(tieneCoordenadas).map((p) => [p.codPuesto, p.divipole2023.lon, p.divipole2023.lat])
    : Object.entries(e.ubicaciones ?? {}).map(([c, u]) => [c, u.lon, u.lat]);
  const porTerritorio = new Map<string, string[]>();
  for (const [c, lon, lat] of puntos) {
    if (!e.puestos[c]) continue;
    const f = features.find((x) => puntoEnTerritorio(lon, lat, x));
    if (f) porTerritorio.set(String(f.id), [...(porTerritorio.get(String(f.id)) ?? []), c]);
  }
  const out: Record<string, GanadorTerritorio> = {};
  for (const [id, cods] of porTerritorio) {
    const r = sumarEleccion(e, cods);
    const lider = r && (e.porCandidato ? r.candidatos[0] : r.partidos[0]);
    if (!r || !lider) continue;
    out[id] = { ganador: lider.nombre, partido: 'partido' in lider ? String(lider.partido) : lider.nombre, pct: lider.pct, votantes: r.votantes, puestos: r.puestos };
  }
  return out;
}

/**
 * CONCEJO 2023 POR PARTIDO Y CANDIDATO — 125 municipios de Antioquia (nivel municipal)
 *
 * src/data/electoral/concejo2023/<municipio>.json, generados con
 * `python scripts/build_concejo_2023_candidatos.py` desde el libro "Concejo 2023 — Todos los resultados"
 * (_originales/registraduria/). Fuente: Registraduría, escrutinio E-24/E-26 CON en 13 municipios y
 * preconteo oficial con al menos el 98 % de las mesas en 86. Los 26 restantes quedan "sin datos sólidos"
 * (el preconteo no llegó al 98 % y el escrutinio no se transcribió): no se muestra ni se estima nada.
 *
 * El voto por candidato solo existe por municipio (el archivo por puesto trae votos por partido).
 * Las curules por lista salen del escrutinio municipal (`resultados2023Antioquia.json`).
 */
import rawIndice from '../data/electoral/resultadosPuesto/indice.json';
import { getResultado2023 } from './electoralResults2023Service';

export type EstadoConcejo2023 = 'solido' | 'incompleto' | 'sin-datos';

export interface Concejo2023Archivo {
  meta: { eleccion: string; fuente: string; nota: string };
  dane: string;
  municipio: string;
  /** solido: cifras publicables; incompleto: oficiales pero no son la votación del municipio; sin-datos: no se muestran */
  estado: EstadoConcejo2023;
  /** % de mesas que alcanzó el preconteo (100 en escrutinio) */
  pctMesas: number | null;
  habilitados: number | null;
  tipo?: 'escrutinio' | 'preconteo';
  fuente?: string;
  votosPartidos?: number;
  blanco?: number;
  nulos?: number | null;
  noMarcados?: number | null;
  /** Ordenados por total. Candidatos: [código en el tarjetón, nombre, votos], ordenados por votos */
  partidos?: { nombre: string; total: number; soloLista: number; candidatos: [string, string, number][] }[];
  nota?: string;
}

export interface CandidatoConcejo2023 {
  codigo: string;
  nombre: string;
  votos: number;
  /** % sobre el total de su lista */
  pctLista: number;
}

export interface PartidoConcejo2023 {
  nombre: string;
  total: number;
  /** % sobre votos válidos (partidos + voto en blanco) */
  pctValidos: number;
  soloLista: number;
  candidatos: CandidatoConcejo2023[];
  /** Curules de la lista según el escrutinio; null si el escrutinio municipal no las publica */
  curules: number | null;
}

export interface Concejo2023 {
  dane: string;
  municipio: string;
  estado: EstadoConcejo2023;
  pctMesas: number | null;
  habilitados: number | null;
  tipo: 'escrutinio' | 'preconteo' | null;
  fuente: string | null;
  votosPartidos: number;
  blanco: number;
  nulos: number | null;
  noMarcados: number | null;
  /** Partidos + blanco */
  validos: number;
  partidos: PartidoConcejo2023[];
  totalCurules: number | null;
  nota: string | null;
}

type Indice = Record<string, { nombre: string; '2023'?: string }>;
const INDICE = rawIndice as unknown as Indice;
const cargadores = import.meta.glob<{ default: Concejo2023Archivo }>('../data/electoral/concejo2023/*.json');

/** Para cruzar nombres de partido entre fuentes (mayúsculas, tildes, espacios y la sigla entre comillas,
 *  que unas fuentes traen y otras no: 'MOVIMIENTO AUTORIDADES INDÍGENAS DE COLOMBIA "AICO"') */
export const normPartido = (s: string) =>
  s.replace(/"[^"]*"/g, ' ').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Arma el resultado a partir del archivo del municipio (función pura, para probarla sin cargar nada). */
export function armarConcejo2023(a: Concejo2023Archivo): Concejo2023 {
  const ofic = getResultado2023(a.dane)?.concejo;
  const curulesPor = new Map((ofic?.curulesPorLista ?? []).map((c) => [normPartido(c.partido), c.curules]));
  const blanco = a.blanco ?? 0;
  const votosPartidos = a.votosPartidos ?? 0;
  const validos = votosPartidos + blanco;
  const partidos: PartidoConcejo2023[] = (a.partidos ?? []).map((p) => ({
    nombre: p.nombre,
    total: p.total,
    pctValidos: validos ? r1((100 * p.total) / validos) : 0,
    soloLista: p.soloLista,
    candidatos: p.candidatos.map(([codigo, nombre, votos]) => ({ codigo, nombre, votos, pctLista: p.total ? r1((100 * votos) / p.total) : 0 })),
    curules: ofic ? (curulesPor.get(normPartido(p.nombre)) ?? 0) : null,
  }));
  return {
    dane: a.dane,
    municipio: a.municipio,
    estado: a.estado,
    pctMesas: a.pctMesas,
    habilitados: a.habilitados,
    tipo: a.tipo ?? null,
    fuente: a.fuente ?? null,
    votosPartidos,
    blanco,
    nulos: a.nulos ?? null,
    noMarcados: a.noMarcados ?? null,
    validos,
    partidos,
    totalCurules: ofic ? ofic.totalCurulesListas : null,
    nota: a.nota ?? null,
  };
}

/** Concejo 2023 por partido y candidato del municipio (código DANE '05001' o id 'mpio-05001'). */
export async function cargarConcejo2023(daneOrId: string): Promise<Concejo2023 | null> {
  const dane = /(\d{5})$/.exec(daneOrId)?.[1];
  const slug = dane ? INDICE[dane]?.['2023'] : undefined;
  const cargar = slug ? cargadores[`../data/electoral/concejo2023/${slug}.json`] : undefined;
  if (!cargar) return null;
  return armarConcejo2023((await cargar()).default);
}

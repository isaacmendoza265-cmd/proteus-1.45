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
import { sumarEleccion, type EleccionPuestos } from './electionResultsService';

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
  /** true cuando se suman puestos: cada puesto guarda solo los candidatos que suman el 97 % del voto
   *  preferente (hasta 25), así que el voto por candidato es un mínimo y el voto solo por lista no se calcula */
  candidatosParciales?: boolean;
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

/** Concejos que ya vienen por candidato en el escrutinio mesa a mesa (MMV) por puesto */
export const CONCEJOS_POR_PUESTO = ['concejo-2019', 'concejo-2015'];

/** Corporaciones con voto preferente que Proteus tiene por candidato y por puesto, para la vista por listas:
 *  Concejo y Asamblea 2019 y 2015 (escrutinio MMV), Cámara y Senado 2022 (escrutinio MMV) y 2026 (preconteo).
 *  Concejo y Asamblea 2023: escrutinio MMV por candidato en el Valle de Aburrá (resultadosPuesto2023Escrutinio/);
 *  en los demás municipios el preconteo solo trae partidos (la vista no aparece) y el Concejo 2023 sale de concejo2023/. */
export const LISTAS_POR_CANDIDATO = ['concejo-2023', 'asamblea-2023', 'concejo-2019', 'concejo-2015', 'asamblea-2019', 'asamblea-2015', 'camara-2026', 'camara-2022', 'senado-2026', 'senado-2022'];

/**
 * Concejo por partido y candidato a partir de una elección por puesto (escrutinio MMV 2019 y 2015),
 * sumando los puestos dados ('todos' = total del municipio). El total de cada lista incluye el voto
 * preferente de sus candidatos: el voto solo por la lista es la diferencia. No trae curules.
 * El total municipal trae a todos los candidatos; cada puesto, solo los que suman el 97 % del voto
 * preferente (hasta 25, scripts/build_resultados_historicos.py): al sumar puestos, el voto por candidato
 * queda como mínimo y el voto solo por la lista no se calcula (se deja en 0 y `candidatosParciales`).
 * Si la elección trae todos los candidatos en cada puesto (`candidatosCompletos`, escrutinio 2023 del Valle de
 * Aburrá), la suma de puestos es exacta. Con `dane`, el total municipal del Concejo 2023 trae las curules por lista
 * del escrutinio municipal.
 */
export function concejoDesdeEleccion(e: EleccionPuestos, codigos: string[] | 'todos', municipio: string, dane?: string): Concejo2023 | null {
  const r = sumarEleccion(e, codigos);
  if (!r) return null;
  const porPartido = new Map<string, { nombre: string; votos: number }[]>();
  for (const c of r.candidatos) {
    const l = porPartido.get(c.partido) ?? [];
    l.push({ nombre: c.nombre, votos: c.votos });
    porPartido.set(c.partido, l);
  }
  const parciales = codigos !== 'todos' && !e.candidatosCompletos;
  const ofic = e.id === 'concejo-2023' && codigos === 'todos' && dane ? getResultado2023(dane)?.concejo : undefined;
  const curulesPor = new Map((ofic?.curulesPorLista ?? []).map((c) => [normPartido(c.partido), c.curules]));
  const votosPartidos = r.partidos.reduce((s, p) => s + p.votos, 0);
  const validos = votosPartidos + r.blanco;
  const partidos: PartidoConcejo2023[] = r.partidos.map((p) => {
    const cands = (porPartido.get(p.nombre) ?? []).sort((a, b) => b.votos - a.votos);
    const suma = cands.reduce((s, c) => s + c.votos, 0);
    return {
      nombre: p.nombre,
      total: p.votos,
      pctValidos: validos ? r1((100 * p.votos) / validos) : 0,
      soloLista: parciales ? 0 : Math.max(0, p.votos - suma),
      candidatos: cands.map((c) => ({ codigo: '', nombre: c.nombre, votos: c.votos, pctLista: p.votos ? r1((100 * c.votos) / p.votos) : 0 })),
      curules: ofic ? (curulesPor.get(normPartido(p.nombre)) ?? 0) : null,
    };
  });
  return {
    dane: '', municipio, estado: 'solido', pctMesas: null, habilitados: r.habilitados || null,
    tipo: e.tipo, fuente: e.fuente, votosPartidos, blanco: r.blanco, nulos: r.nulos, noMarcados: r.noMarcados,
    validos, partidos, totalCurules: ofic ? ofic.totalCurulesListas : null, nota: null, candidatosParciales: parciales,
  };
}

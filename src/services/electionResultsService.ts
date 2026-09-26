/**
 * RESULTADOS ELECTORALES POR PUESTO DE VOTACIÓN
 *
 * Cada elección se guarda por municipio y se carga bajo demanda:
 *  - 2023 (Alcaldía y Concejo): src/data/electoral/resultadosPuesto2023/<municipio>.json. Claves:
 *    códigos de puesto de 2023, que NO son los del censo 2026; cada puesto trae su ubicación
 *    (Divipole 2023) para asignarlo a comuna o barrio por coordenadas.
 *  - 2026 (Senado y Cámara): src/data/electoral/resultadosPuesto2026/<municipio>.json. Claves:
 *    códigos del censo 2026 (misma jornada). Preconteo.
 *  - Presidencia 2026 (1.ª y 2.ª vuelta): src/data/electoral/resultadosPuestoPresidencial2026/<municipio>.json.
 *    Escrutinio oficial mesa a mesa (comisión municipal); claves: códigos del censo 2026.
 * 2023 y Congreso son preconteo de la Registraduría: pueden diferir levemente del escrutinio.
 */
import rawIndice from '../data/electoral/resultadosPuesto/indice.json';

export interface FilaEleccion {
  habilitados: number;
  votantes: number;
  blanco: number;
  nulos: number;
  noMarcados: number;
  partidos?: [number, number][];
  candidatos?: [number, number][];
}

export interface EleccionPuestos {
  id: string;
  nombre: string;
  /** Fecha de la jornada (texto) */
  fecha: string;
  fuente: string;
  nota: string;
  /** Preconteo o escrutinio */
  tipo: 'preconteo' | 'escrutinio';
  /** true: se muestra por candidato (Alcaldía, Presidencia); false: por partido con voto preferente */
  porCandidato: boolean;
  /** Qué códigos usan las claves de `puestos` */
  codigos: '2023' | '2026';
  partidos: string[];
  candidatos: { n: string; p: number }[];
  municipio: FilaEleccion;
  puestos: Record<string, FilaEleccion>;
  nombres: Record<string, string>;
  /** Solo en 2023: ubicación de cada puesto (Divipole 2023) */
  ubicaciones?: Record<string, { lat: number; lon: number }>;
}

export interface ResultadoEleccion {
  id: string;
  nombre: string;
  fecha: string;
  fuente: string;
  puestos: number;
  habilitados: number;
  votantes: number;
  blanco: number;
  nulos: number;
  noMarcados: number;
  partidos: { nombre: string; votos: number; pct: number }[];
  candidatos: { nombre: string; partido: string; votos: number; pct: number }[];
}

type Indice = Record<string, { nombre: string; '2023'?: string; '2026'?: string; pres2026?: string }>;
const INDICE = rawIndice as unknown as Indice;

/** Elecciones que se muestran como "sin información" cuando un municipio no las tiene cargadas */
export const ELECCIONES_PENDIENTES = [
  { id: 'presidente-2026-1', nombre: 'Presidencia 2026 · 1.ª vuelta', motivo: 'Todavía no se cargó el escrutinio por puesto de este municipio.' },
  { id: 'presidente-2026-2', nombre: 'Presidencia 2026 · 2.ª vuelta', motivo: 'Todavía no se cargó el escrutinio por puesto de este municipio.' },
];

/** ¿Hay resultados por puesto cargados para este municipio (código DANE)? */
export function tieneResultadosPorPuesto(dane: string): boolean {
  const e = INDICE[dane];
  return !!(e && (e['2023'] || e['2026'] || e.pres2026));
}

/** Municipios (código DANE) con resultados por puesto */
export const MUNICIPIOS_CON_RESULTADOS = Object.keys(INDICE);

// --- Formatos de archivo --------------------------------------------------------------------

interface Archivo2023 {
  meta: { fuente: string; nota: string };
  candidatos: { n: string; p: number }[];
  partidos: string[];
  municipio: { alcaldia: Fila2023Al; concejo: Fila2023Co };
  puestos: Record<string, { n: string; ubicacion: { lat: number; lon: number } | null; alcaldia: Fila2023Al; concejo: Fila2023Co }>;
}
interface Fila2023Al { habilitados: number; votantes: number; blanco: number; nulos: number; noMarcados: number; candidatos: [number, number][] }
interface Fila2023Co { habilitados?: number; votantes: number; blanco: number; nulos: number; noMarcados: number; partidos: [number, number][] }

interface Archivo2026 {
  meta: { fuente: string; nota: string };
  elecciones: Record<string, { nombre: string; partidos: string[]; candidatos: { n: string; p: number }[]; municipio: FilaEleccion; puestos: Record<string, FilaEleccion>; nombres?: Record<string, string>; fecha?: string; fuente?: string }>;
}
interface ArchivoPres { meta: { tipo: 'escrutinio'; nota: string; fuente?: string }; elecciones: Archivo2026['elecciones'] }

const cargadores2023 = import.meta.glob<{ default: Archivo2023 }>('../data/electoral/resultadosPuesto2023/*.json');
const cargadores2026 = import.meta.glob<{ default: Archivo2026 }>('../data/electoral/resultadosPuesto2026/*.json');
const cargadoresPres = import.meta.glob<{ default: ArchivoPres }>('../data/electoral/resultadosPuestoPresidencial2026/*.json');
const cache = new Map<string, Promise<EleccionPuestos[]>>();

function convertir2023(a: Archivo2023): EleccionPuestos[] {
  // Alcaldía: los partidos salen de sumar los votos de sus candidatos
  const alFila = (f: Fila2023Al): FilaEleccion => {
    const par = new Map<number, number>();
    for (const [i, v] of f.candidatos) par.set(a.candidatos[i].p, (par.get(a.candidatos[i].p) ?? 0) + v);
    return { habilitados: f.habilitados, votantes: f.votantes, blanco: f.blanco, nulos: f.nulos, noMarcados: f.noMarcados, candidatos: f.candidatos, partidos: [...par.entries()].sort((x, y) => y[1] - x[1]) };
  };
  const coFila = (f: Fila2023Co, hab: number): FilaEleccion => ({ habilitados: f.habilitados ?? hab, votantes: f.votantes, blanco: f.blanco, nulos: f.nulos, noMarcados: f.noMarcados, partidos: f.partidos });
  const nombres: Record<string, string> = {};
  const ubicaciones: Record<string, { lat: number; lon: number }> = {};
  const pAl: Record<string, FilaEleccion> = {};
  const pCo: Record<string, FilaEleccion> = {};
  for (const [c, p] of Object.entries(a.puestos)) {
    nombres[c] = p.n;
    if (p.ubicacion) ubicaciones[c] = p.ubicacion;
    pAl[c] = alFila(p.alcaldia);
    pCo[c] = coFila(p.concejo, p.alcaldia.habilitados);
  }
  const base = { fecha: '29-oct-2023', fuente: a.meta.fuente, nota: a.meta.nota, tipo: 'preconteo' as const, codigos: '2023' as const, partidos: a.partidos, candidatos: a.candidatos, nombres, ubicaciones };
  return [
    { ...base, id: 'alcaldia-2023', nombre: 'Alcaldía 2023', porCandidato: true, municipio: alFila(a.municipio.alcaldia), puestos: pAl },
    { ...base, id: 'concejo-2023', nombre: 'Concejo 2023', porCandidato: false, municipio: coFila(a.municipio.concejo, a.municipio.alcaldia.habilitados), puestos: pCo },
  ];
}

function convertir2026(a: Archivo2026 | ArchivoPres, tipo: 'preconteo' | 'escrutinio', porCandidato: boolean): EleccionPuestos[] {
  return Object.entries(a.elecciones).map(([id, e]) => ({
    id, nombre: e.nombre, fecha: e.fecha ?? '8-mar-2026', fuente: e.fuente ?? a.meta.fuente ?? '', nota: a.meta.nota, tipo, porCandidato, codigos: '2026' as const,
    partidos: e.partidos, candidatos: e.candidatos, municipio: e.municipio, puestos: e.puestos, nombres: e.nombres ?? {},
  }));
}

/** Todas las elecciones con resultados por puesto de un municipio (orden: 2023, Congreso 2026, Presidencia 2026) */
export function cargarElecciones(dane: string): Promise<EleccionPuestos[]> {
  if (!cache.has(dane)) {
    const e = INDICE[dane];
    const l23 = e?.['2023'] ? cargadores2023[`../data/electoral/resultadosPuesto2023/${e['2023']}.json`] : undefined;
    const l26 = e?.['2026'] ? cargadores2026[`../data/electoral/resultadosPuesto2026/${e['2026']}.json`] : undefined;
    const lPr = e?.pres2026 ? cargadoresPres[`../data/electoral/resultadosPuestoPresidencial2026/${e.pres2026}.json`] : undefined;
    cache.set(dane, Promise.all([
      l23 ? l23().then((m) => convertir2023(m.default)) : [],
      l26 ? l26().then((m) => convertir2026(m.default, 'preconteo', false)) : [],
      lPr ? lPr().then((m) => convertir2026(m.default, 'escrutinio', true)) : [],
    ]).then((ls) => ls.flat()));
  }
  return cache.get(dane)!;
}

/**
 * Suma una elección en los puestos dados; con 'todos' devuelve el total municipal (que trae a
 * todos los candidatos). No reparte ni estima.
 */
export function sumarEleccion(e: EleccionPuestos, codigos: string[] | 'todos'): ResultadoEleccion | null {
  const filas = codigos === 'todos' ? [e.municipio] : codigos.map((c) => e.puestos[c]).filter(Boolean);
  if (!filas.length) return null;
  const par = new Map<number, number>();
  const can = new Map<number, number>();
  let habilitados = 0, votantes = 0, blanco = 0, nulos = 0, noMarcados = 0;
  for (const f of filas) {
    habilitados += f.habilitados; votantes += f.votantes; blanco += f.blanco; nulos += f.nulos; noMarcados += f.noMarcados;
    for (const [i, v] of f.partidos ?? []) par.set(i, (par.get(i) ?? 0) + v);
    for (const [i, v] of f.candidatos ?? []) can.set(i, (can.get(i) ?? 0) + v);
  }
  const validos = [...par.values()].reduce((s, v) => s + v, 0) + blanco;
  return {
    id: e.id, nombre: e.nombre, fecha: e.fecha, fuente: e.fuente,
    puestos: codigos === 'todos' ? Object.keys(e.puestos).length : filas.length,
    habilitados, votantes, blanco, nulos, noMarcados,
    partidos: [...par.entries()].sort((a, b) => b[1] - a[1]).map(([i, v]) => ({ nombre: e.partidos[i], votos: v, pct: validos ? (100 * v) / validos : 0 })),
    candidatos: [...can.entries()].sort((a, b) => b[1] - a[1]).map(([i, v]) => ({
      nombre: e.candidatos[i].n, partido: e.partidos[e.candidatos[i].p], votos: v, pct: validos ? (100 * v) / validos : 0,
    })),
  };
}

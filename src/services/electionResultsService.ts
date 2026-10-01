/**
 * RESULTADOS ELECTORALES POR PUESTO DE VOTACIÓN
 *
 * Cada elección se guarda por municipio y se carga bajo demanda:
 *  - 2023 (Alcaldía, Concejo y, donde ya se descargaron, Gobernación y Asamblea):
 *    src/data/electoral/resultadosPuesto2023/<municipio>.json. Claves: códigos de puesto de 2023,
 *    que NO son los del censo 2026; cada puesto trae su ubicación (Divipole 2023) para asignarlo a
 *    comuna o barrio por coordenadas.
 *  - 2026 (Senado y Cámara): src/data/electoral/resultadosPuesto2026/<municipio>.json. Claves:
 *    códigos del censo 2026 (misma jornada). Preconteo.
 *  - Presidencia 2026 (1.ª y 2.ª vuelta): src/data/electoral/resultadosPuestoPresidencial2026/<municipio>.json.
 *    Escrutinio oficial mesa a mesa (comisión municipal); claves: códigos del censo 2026.
 *  - Serie histórica (escrutinio mesa a mesa del Observatorio de la Registraduría):
 *    src/data/electoral/resultadosPuestoHistorico/<año>/<municipio>.json, años 2015, 2018, 2019 y
 *    2022 (scripts/build_resultados_historicos.py). Claves: códigos de puesto de ESE año; cada puesto
 *    trae su ubicación (por nombre) para asignarlo a un territorio, como 2023.
 *  - Concejo y Asamblea 2023 por candidato (escrutinio MMV, Valle de Aburrá):
 *    src/data/electoral/resultadosPuesto2023Escrutinio/<municipio>.json (scripts/build_resultados_2023_mmv.py),
 *    mismo formato que la serie histórica y mismos códigos de puesto que el preconteo 2023. Donde existe,
 *    REEMPLAZA al preconteo de esas dos elecciones; cada puesto trae a todos sus candidatos.
 * 2023 y Congreso son preconteo de la Registraduría: pueden diferir levemente del escrutinio.
 */
import rawIndice from '../data/electoral/resultadosPuesto/indice.json';
import { censoDeEleccion } from './censoHistoricoService';

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
  /** Qué códigos usan las claves de `puestos`: '2026' = censo 2026; otro año = códigos de ese año,
   *  que se ubican con `ubicaciones` */
  codigos: string;
  /** Año de la jornada */
  anio: number;
  partidos: string[];
  candidatos: { n: string; p: number }[];
  municipio: FilaEleccion;
  puestos: Record<string, FilaEleccion>;
  nombres: Record<string, string>;
  /** Años distintos de 2026: ubicación de cada puesto ("a": aproximada, en cabecera o vereda) */
  ubicaciones?: Record<string, { lat: number; lon: number; a?: number }>;
  /** true: cada puesto trae a todos los candidatos (si no, solo los que suman el 97 % del voto preferente) */
  candidatosCompletos?: boolean;
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
  municipio: { alcaldia: Fila2023Al; concejo: Fila2023Co; gobernacion?: Fila2023Al; asamblea?: Fila2023Co };
  puestos: Record<string, {
    n: string; ubicacion: { lat: number; lon: number } | null;
    alcaldia: Fila2023Al; concejo: Fila2023Co; gobernacion?: Fila2023Al; asamblea?: Fila2023Co;
  }>;
}
interface Fila2023Al { habilitados: number; votantes: number; blanco: number; nulos: number; noMarcados: number; candidatos: [number, number][] }
interface Fila2023Co { habilitados?: number; votantes: number; blanco: number; nulos: number; noMarcados: number; partidos: [number, number][] }

interface Archivo2026 {
  meta: { fuente: string; nota: string };
  elecciones: Record<string, { nombre: string; partidos: string[]; candidatos: { n: string; p: number }[]; municipio: FilaEleccion; puestos: Record<string, FilaEleccion>; nombres?: Record<string, string>; fecha?: string; fuente?: string }>;
}
interface ArchivoPres { meta: { tipo: 'escrutinio'; nota: string; fuente?: string }; elecciones: Archivo2026['elecciones'] }
interface ArchivoHistorico {
  meta: { fuente: string; nota: string; codigos: string; candidatosCompletos?: boolean };
  nombres: Record<string, string>;
  ubicaciones: Record<string, { lat: number; lon: number; a?: number }>;
  elecciones: Record<string, { nombre: string; fecha: string; porCandidato: boolean; partidos: string[]; candidatos: { n: string; p: number }[]; municipio: FilaEleccion; puestos: Record<string, FilaEleccion> }>;
}
/** Años de la serie histórica por puesto */
export const ANIOS_HISTORICOS = [2022, 2019, 2018, 2015];

const cargadores2023 = import.meta.glob<{ default: Archivo2023 }>('../data/electoral/resultadosPuesto2023/*.json');
const cargadores2026 = import.meta.glob<{ default: Archivo2026 }>('../data/electoral/resultadosPuesto2026/*.json');
const cargadoresPres = import.meta.glob<{ default: ArchivoPres }>('../data/electoral/resultadosPuestoPresidencial2026/*.json');
const cargadoresHist = import.meta.glob<{ default: ArchivoHistorico }>('../data/electoral/resultadosPuestoHistorico/*/*.json');
const cargadores2023Esc = import.meta.glob<{ default: ArchivoHistorico }>('../data/electoral/resultadosPuesto2023Escrutinio/*.json');
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
  const pGo: Record<string, FilaEleccion> = {};
  const pAs: Record<string, FilaEleccion> = {};
  for (const [c, p] of Object.entries(a.puestos)) {
    nombres[c] = p.n;
    if (p.ubicacion) ubicaciones[c] = p.ubicacion;
    pAl[c] = alFila(p.alcaldia);
    pCo[c] = coFila(p.concejo, p.alcaldia.habilitados);
    if (p.gobernacion) pGo[c] = alFila(p.gobernacion);
    if (p.asamblea) pAs[c] = coFila(p.asamblea, p.alcaldia.habilitados);
  }
  const base = { fecha: '29-oct-2023', fuente: a.meta.fuente, nota: a.meta.nota, tipo: 'preconteo' as const, codigos: '2023', anio: 2023, partidos: a.partidos, candidatos: a.candidatos, nombres, ubicaciones };
  const resultado: EleccionPuestos[] = [
    { ...base, id: 'alcaldia-2023', nombre: 'Alcaldía 2023', porCandidato: true, municipio: alFila(a.municipio.alcaldia), puestos: pAl },
    { ...base, id: 'concejo-2023', nombre: 'Concejo 2023', porCandidato: false, municipio: coFila(a.municipio.concejo, a.municipio.alcaldia.habilitados), puestos: pCo },
  ];
  // Gobernación y Asamblea: mismo preconteo y jornada del 29-oct-2023; algunos municipios todavía
  // no las tienen descargadas (compatibilidad hacia atrás), así que solo se agregan si vienen.
  if (a.municipio.gobernacion) {
    resultado.push({ ...base, id: 'gobernacion-2023', nombre: 'Gobernación 2023', porCandidato: true, municipio: alFila(a.municipio.gobernacion), puestos: pGo });
  }
  if (a.municipio.asamblea) {
    resultado.push({ ...base, id: 'asamblea-2023', nombre: 'Asamblea 2023', porCandidato: false, municipio: coFila(a.municipio.asamblea, a.municipio.alcaldia.habilitados), puestos: pAs });
  }
  return resultado;
}

function convertir2026(a: Archivo2026 | ArchivoPres, tipo: 'preconteo' | 'escrutinio', porCandidato: boolean): EleccionPuestos[] {
  return Object.entries(a.elecciones).map(([id, e]) => ({
    id, nombre: e.nombre, fecha: e.fecha ?? '8-mar-2026', fuente: e.fuente ?? a.meta.fuente ?? '', nota: a.meta.nota, tipo, porCandidato, codigos: '2026', anio: 2026,
    partidos: e.partidos, candidatos: e.candidatos, municipio: e.municipio, puestos: e.puestos, nombres: e.nombres ?? {},
  }));
}

/** El MMV no trae habilitados: el total municipal toma el censo de la misma jornada (censoHistorico.json) */
function convertirHistorico(a: ArchivoHistorico, dane: string): EleccionPuestos[] {
  return Object.entries(a.elecciones).map(([id, e]) => ({
    id, nombre: e.nombre, fecha: e.fecha, fuente: a.meta.fuente, nota: a.meta.nota, tipo: 'escrutinio' as const, porCandidato: e.porCandidato,
    codigos: a.meta.codigos, anio: Number(a.meta.codigos), partidos: e.partidos, candidatos: e.candidatos, puestos: e.puestos,
    municipio: e.municipio.habilitados ? e.municipio : { ...e.municipio, habilitados: censoDeEleccion(dane, id) ?? 0 },
    nombres: a.nombres, ubicaciones: a.ubicaciones, candidatosCompletos: a.meta.candidatosCompletos,
  }));
}

/** Tipo de elección sin el año ("alcaldia", "presidente-1"...), para comparar entre años */
export const tipoEleccion = (id: string) => id.replace(/-\d{4}(?=-\d$|$)/, '');

/** Todas las elecciones con resultados por puesto de un municipio (de la más reciente a la más antigua) */
export function cargarElecciones(dane: string): Promise<EleccionPuestos[]> {
  if (!cache.has(dane)) {
    const e = INDICE[dane];
    const l23 = e?.['2023'] ? cargadores2023[`../data/electoral/resultadosPuesto2023/${e['2023']}.json`] : undefined;
    const l26 = e?.['2026'] ? cargadores2026[`../data/electoral/resultadosPuesto2026/${e['2026']}.json`] : undefined;
    const lPr = e?.pres2026 ? cargadoresPres[`../data/electoral/resultadosPuestoPresidencial2026/${e.pres2026}.json`] : undefined;
    const slug = e?.['2023'];
    const lHist = slug ? ANIOS_HISTORICOS.map((y) => cargadoresHist[`../data/electoral/resultadosPuestoHistorico/${y}/${slug}.json`]).filter(Boolean) : [];
    const lEsc = slug ? cargadores2023Esc[`../data/electoral/resultadosPuesto2023Escrutinio/${slug}.json`] : undefined;
    cache.set(dane, Promise.all([
      l26 ? l26().then((m) => convertir2026(m.default, 'preconteo', false)) : [],
      lPr ? lPr().then((m) => convertir2026(m.default, 'escrutinio', true)) : [],
      Promise.all([
        l23 ? l23().then((m) => convertir2023(m.default)) : [],
        lEsc ? lEsc().then((m) => convertirHistorico(m.default, dane)) : [],
      ]).then(([pre, esc]) => {
        // El escrutinio por candidato reemplaza al preconteo de la misma elección (Concejo y Asamblea 2023)
        const ids = new Set(pre.map((p) => p.id));
        return [...pre.map((p) => esc.find((x) => x.id === p.id) ?? p), ...esc.filter((x) => !ids.has(x.id))];
      }),
      ...lHist.map((l) => l().then((m) => convertirHistorico(m.default, dane))),
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

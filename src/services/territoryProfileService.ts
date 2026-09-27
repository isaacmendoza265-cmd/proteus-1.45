/**
 * FICHA TERRITORIAL (comunas, barrios y veredas)
 *
 * Reúne en cuatro secciones lo que Proteus sabe de un territorio y marca cada dato como
 * Oficial, Estimado o Sin información:
 *  1. Política: Alcaldía 2023 (escrutinio a nivel municipal; preconteo por puesto donde está cargado:
 *     Rionegro, Bello y Medellín) y actores de la base curada.
 *  2. Demografía: DANE, CNPV 2018 por manzana (hoy Bello) y proyección 2026.
 *  3. Censo electoral: suma de los puestos de votación ubicados dentro del territorio.
 *  4. Grupos: composición estimada por edad y sexo de los votantes.
 *
 * Nada se inventa: cuando no hay dato, la ficha lo dice y explica por qué.
 */
import rawSexoEdad from '../data/dane/proyeccionSexoEdad2026.json';
import rawIndice from '../data/territorio/indiceTerritorios.json';
import { getDaneMunicipio } from './daneMunicipalService';
import { getResultado2023, type Resultado2023 } from './electoralResults2023Service';
import { tieneResultadosPorPuesto } from './electionResultsService';
import type { PuestoVotacion } from './pollingStationsService';
import { GRAPH_NODES_DATA, POLITICAL_HOUSES_DATA } from '../data/politicalHouses/politicalHousesMasterData';

export type EstadoDato = 'oficial' | 'estimado' | 'sin-informacion';

export const ETIQUETA_ESTADO: Record<EstadoDato, string> = {
  oficial: 'Oficial',
  estimado: 'Estimado',
  'sin-informacion': 'Sin información',
};

/** Grupos quinquenales del DANE (índices 0..16) */
export const EDADES_DANE = ['0–4', '5–9', '10–14', '15–19', '20–24', '25–29', '30–34', '35–39', '40–44', '45–49', '50–54', '55–59', '60–64', '65–69', '70–74', '75–79', '80 o más'];

/**
 * Grupos de edad para votantes: [etiqueta, [[índice DANE, fracción], ...]].
 * 18 y 19 años son el 40 % del grupo 15–19 (dos de cinco edades).
 */
/** Grupos decenales del CNPV por manzana (0–9 … 80 o más), usados cuando la demografía sale de las manzanas */
export const EDADES_DANE_10 = ['0–9', '10–19', '20–29', '30–39', '40–49', '50–59', '60–69', '70–79', '80 o más'];
/** Grupos de votantes con edades decenales: 18 y 19 años son el 20 % del grupo 10–19 */
export const GRUPOS_EDAD_VOTANTES_10: [string, [number, number][]][] = [
  ['18–29', [[1, 0.2], [2, 1]]], ['30–39', [[3, 1]]], ['40–49', [[4, 1]]], ['50–59', [[5, 1]]], ['60–69', [[6, 1]]], ['70 o más', [[7, 1], [8, 1]]],
];
export const GRUPOS_EDAD_VOTANTES: [string, [number, number][]][] = [
  ['18–24', [[3, 0.4], [4, 1]]],
  ['25–34', [[5, 1], [6, 1]]],
  ['35–44', [[7, 1], [8, 1]]],
  ['45–54', [[9, 1], [10, 1]]],
  ['55–64', [[11, 1], [12, 1]]],
  ['65 o más', [[13, 1], [14, 1], [15, 1], [16, 1]]],
];

// --- Territorio -------------------------------------------------------------------------

export type TipoTerritorio = 'municipio' | 'division' | 'subdivision';

export interface TerritorioFicha {
  tipo: TipoTerritorio;
  /** id de la capa (p. ej. 'bello-div-4', 'bello-sub-B010') o id del municipio ('bello') */
  id: string;
  nombre: string;
  /** Código DANE del municipio */
  dane: string;
  municipio: string;
  /** Comuna / Zona rural / Barrio / Vereda (si aplica) */
  clase?: string;
  /** id de la división que contiene a la subdivisión */
  padreId?: string;
}

interface DemografiaData {
  meta: { fuente: string; nota: string; campos: string[] };
  porTerritorio: Record<string, number[]>;
}
interface IndiceMunicipio {
  dane: string;
  nombre: string;
  divisiones: Record<string, { nombre: string; tipo: string }>;
  subdivisiones: Record<string, { nombre: string; tipo: string; padre: string }>;
}
const INDICE = rawIndice as unknown as Record<string, IndiceMunicipio>;

/** Municipios con demografía por barrio cargada (código DANE) */
// Bello ya no usa la consulta por polígono (belloCnpv2018Barrios.json): su demografía sale de las manzanas
// (src/data/dane/cnpv2018/bello.json), como el resto del área metropolitana.
const DEMOGRAFIA_POR_MUNICIPIO: Record<string, DemografiaData> = {};

// Fase B: población del CNPV 2018 por barrio/sección/vereda, un archivo por municipio, cargado bajo demanda
const CARGADORES_DEM = import.meta.glob<{ default: unknown }>('../data/dane/cnpv2018/*.json');
const cargasDem = new Map<string, Promise<boolean>>();
/** Carga la demografía por territorio del municipio (si existe). Devuelve true si quedó disponible. */
export function cargarDemografia(dane: string): Promise<boolean> {
  if (DEMOGRAFIA_POR_MUNICIPIO[dane]) return Promise.resolve(true);
  if (!cargasDem.has(dane)) {
    const muni = Object.entries(INDICE).find(([, m]) => m.dane === dane)?.[0];
    const cargar = muni ? CARGADORES_DEM[`../data/dane/cnpv2018/${muni}.json`] : undefined;
    cargasDem.set(dane, cargar
      ? cargar().then((m) => { DEMOGRAFIA_POR_MUNICIPIO[dane] = m.default as DemografiaData; return true; }).catch(() => false)
      : Promise.resolve(false));
  }
  return cargasDem.get(dane)!;
}

/** Municipios con ficha territorial (id del registro de divisiones) */
export const MUNICIPIOS_CON_FICHA = Object.keys(INDICE);

/** Construye la ficha a partir del id del municipio ('rionegro') o de una división/subdivisión */
export function territorioFicha(id: string): TerritorioFicha | null {
  for (const [muniId, m] of Object.entries(INDICE)) {
    if (id === muniId) return { tipo: 'municipio', id, nombre: m.nombre, dane: m.dane, municipio: m.nombre };
    const d = m.divisiones[id];
    if (d) return { tipo: 'division', id, nombre: d.nombre, dane: m.dane, municipio: m.nombre, clase: d.tipo };
    const sd = m.subdivisiones[id];
    if (sd) return { tipo: 'subdivision', id, nombre: sd.nombre, dane: m.dane, municipio: m.nombre, clase: sd.tipo, padreId: sd.padre };
  }
  return null;
}

/** Compatibilidad: ficha de Bello */
export const territorioBello = (id: string) => territorioFicha(id);

/** ¿Tiene este territorio ficha completa? (hoy: Bello y Rionegro, con sus comunas, barrios y veredas) */
export function tieneFicha(id: string): boolean {
  return territorioFicha(id) !== null;
}

/** id del municipio del registro a partir de su código DANE */
export function municipioFichaPorDane(dane: string): string | null {
  return Object.entries(INDICE).find(([, m]) => m.dane === dane)?.[0] ?? null;
}

const indiceDe = (t: TerritorioFicha) => Object.values(INDICE).find((m) => m.dane === t.dane)!;
const esRural = (t: TerritorioFicha) => t.clase === 'Zona rural' || t.clase === 'Vereda' || t.clase === 'Corregimiento';

// --- 2. Demografía -------------------------------------------------------------------------

export interface Demografia {
  personas: number;
  hombres: number;
  mujeres: number;
  /** 17 grupos quinquenales */
  edades: number[];
  viviendas: number;
  hogares: number;
  unidadesEconomicas: number;
  /** Personas en zonas anonimizadas (el DANE solo da el total, sin sexo ni edad) */
  personasAnonimizadas: number;
  /** Etiquetas de `edades`: 17 grupos quinquenales o 9 decenales (datos por manzana) */
  etiquetasEdad: string[];
}

export interface SeccionDemografia {
  estado: EstadoDato;
  datos: Demografia | null;
  /** Sexo y edad disponibles */
  conDetalle: boolean;
  motivo?: string;
  fuente: string;
  proyeccion: { estado: EstadoDato; valor: number | null; texto: string };
}

function idsBarrios(t: TerritorioFicha): string[] {
  const subs = indiceDe(t).subdivisiones;
  if (t.tipo === 'subdivision') return [t.id];
  if (t.tipo === 'division') return Object.keys(subs).filter((k) => subs[k].padre === t.id);
  return Object.keys(subs);
}

export function sumarDemografia(filas: number[][], decenal = false): Demografia {
  // quinquenal: total, hombres, mujeres, 17 edades, edad no informa, viviendas, hogares, unidades económicas
  // decenal (manzanas): total, hombres, mujeres, 9 edades, viviendas, hogares, unidades económicas
  const nE = decenal ? 9 : 17, iV = decenal ? 12 : 21;
  const d: Demografia = { personas: 0, hombres: 0, mujeres: 0, edades: new Array(nE).fill(0), viviendas: 0, hogares: 0, unidadesEconomicas: 0, personasAnonimizadas: 0, etiquetasEdad: decenal ? EDADES_DANE_10 : EDADES_DANE };
  for (const v of filas) {
    d.personas += v[0];
    d.hombres += v[1];
    d.mujeres += v[2];
    for (let i = 0; i < nE; i++) d.edades[i] += v[3 + i];
    d.viviendas += v[iV];
    d.hogares += v[iV + 1];
    d.unidadesEconomicas += v[iV + 2];
    if (v[0] > 0 && v[1] + v[2] === 0) d.personasAnonimizadas += v[0];
  }
  return d;
}

export function demografia(t: TerritorioFicha): SeccionDemografia {
  const data = DEMOGRAFIA_POR_MUNICIPIO[t.dane];
  const dane = getDaneMunicipio(t.dane);
  const fuente = data?.meta.fuente ?? 'DANE';
  if (!data) {
    return {
      estado: 'sin-informacion', datos: null, conDetalle: false, fuente,
      motivo: `Proteus todavía no tiene la población por manzana de ${t.municipio}. Se puede cargar con la misma consulta al Geoportal del DANE que se usó para Bello.`,
      proyeccion: dane
        ? { estado: 'oficial', valor: dane.poblacion, texto: `DANE proyecta ${fmt(dane.poblacion)} habitantes para el municipio en 2026.` }
        : { estado: 'sin-informacion', valor: null, texto: 'Sin proyección cargada.' },
    };
  }
  const datos = sumarDemografia(idsBarrios(t).map((id) => data.porTerritorio[id]).filter(Boolean), data.meta.campos.includes('E0_9'));
  const conDetalle = datos.personas > 0 && datos.hombres + datos.mujeres > 0;
  let motivo: string | undefined;
  if (!conDetalle) {
    if (datos.personas > 0) motivo = `El DANE anonimiza esta zona: publica solo el total (${fmt(datos.personas)} personas), sin sexo ni edad.`;
    else if (esRural(t)) motivo = 'El DANE no publica la población rural dispersa por manzana, así que aquí no hay conteo por sexo ni edad.';
    else motivo = 'No hay manzanas censadas por el DANE dentro de este polígono (zona industrial, verde o en desarrollo).';
  }
  const subs = indiceDe(t).subdivisiones;
  const urbano2018 = Object.keys(subs)
    .filter((k) => ['Barrio', 'Sección urbana', 'Sector urbano', 'Cabecera'].includes(subs[k].tipo))
    .reduce((s, k) => s + (data.porTerritorio[k]?.[0] ?? 0), 0);

  let proyeccion: SeccionDemografia['proyeccion'];
  if (!dane) proyeccion = { estado: 'sin-informacion', valor: null, texto: 'Sin proyección cargada.' };
  else if (t.tipo === 'municipio') {
    proyeccion = {
      estado: 'oficial', valor: dane.poblacion,
      texto: `DANE proyecta ${fmt(dane.poblacion)} habitantes para ${t.nombre} en 2026: ${fmt(dane.poblacionCabecera)} en la cabecera y ${fmt(dane.poblacionRural)} en la zona rural. La suma urbana por manzanas de 2018 (${fmt(urbano2018)}) no corrige la omisión censal: sirve para comparar el peso de las comunas, no como población absoluta.`,
    };
  } else if (esRural(t)) {
    proyeccion = { estado: 'sin-informacion', valor: null, texto: `El DANE proyecta ${fmt(dane.poblacionRural)} habitantes para toda la zona rural en 2026, pero no los desagrega por corregimiento ni vereda.` };
  } else if (datos.personas > 0 && urbano2018 > 0) {
    const valor = Math.round((datos.personas * dane.poblacionCabecera) / urbano2018);
    proyeccion = {
      estado: 'estimado', valor,
      texto: `≈ ${fmt(valor)} habitantes en 2026. Reparte la proyección DANE de la cabecera (${fmt(dane.poblacionCabecera)}) según el peso de este territorio en 2018. El DANE no publica proyecciones por comuna ni por barrio.`,
    };
  } else {
    proyeccion = { estado: 'sin-informacion', valor: null, texto: 'Sin población de base en 2018 no hay forma honesta de proyectar.' };
  }
  if (conDetalle && datos.personasAnonimizadas > 0) {
    proyeccion = { ...proyeccion, texto: `${proyeccion.texto} Incluye ${fmt(datos.personasAnonimizadas)} personas en zonas anonimizadas, sin sexo ni edad.` };
  }
  return { estado: conDetalle ? 'oficial' : 'sin-informacion', datos, conDetalle, motivo, fuente, proyeccion };
}

// --- 2a. Sexo y edad 2026 (proyección oficial del DANE por municipio y área) ------------------
// El CNPV 2018 por manzana trae la edad sin separarla por sexo; el cruce sexo x edad solo existe en la
// proyección municipal del DANE, que distingue cabecera y resto (centros poblados y rural disperso).

interface AreaSexoEdad { h: number[]; m: number[]; mayores18: number }
const SEXO_EDAD = rawSexoEdad as unknown as { meta: { fuente: string; grupos: string[] }; municipios: Record<string, Partial<Record<'total' | 'cabecera' | 'rural', AreaSexoEdad>>> };

export interface PiramideSexoEdad {
  /** Área de la proyección que corresponde al territorio */
  alcance: 'municipio' | 'cabecera' | 'rural';
  grupos: string[];
  hombres: number[];
  mujeres: number[];
  total: number;
  mayores18: number;
  fuente: string;
}

/** Pirámide 2026 del territorio: municipio, su cabecera o todo su resto rural. Null por debajo (no se reparte). */
export function piramide2026(t: TerritorioFicha): PiramideSexoEdad | null {
  const m = SEXO_EDAD.municipios[t.dane];
  if (!m) return null;
  let alcance: PiramideSexoEdad['alcance'] | null = null;
  if (t.tipo === 'municipio') alcance = 'municipio';
  else if (t.clase === 'Cabecera' || (t.tipo === 'division' && t.clase === 'Zona urbana')) alcance = 'cabecera';
  else if (t.tipo === 'division' && t.clase === 'Zona rural') {
    // Solo si esa división es TODO el resto rural (sin corregimientos aparte)
    if (!Object.values(indiceDe(t).divisiones).some((d) => d.tipo === 'Corregimiento')) alcance = 'rural';
  }
  const a = alcance && m[alcance === 'municipio' ? 'total' : alcance];
  if (!alcance || !a) return null;
  return {
    alcance, grupos: SEXO_EDAD.meta.grupos, hombres: a.h, mujeres: a.m,
    total: a.h.reduce((x, y) => x + y, 0) + a.m.reduce((x, y) => x + y, 0), mayores18: a.mayores18, fuente: SEXO_EDAD.meta.fuente,
  };
}

// --- 2b. Condiciones económicas (datos por manzana del DANE, sumados por barrio/vereda) ----------------

interface FilaEconomia { p: number; v: number; h: number; e: number[]; s: number[]; ed: number[]; ipm: number[]; ue: number[]; tv: number[]; vul?: number[] }
interface EconomiaData { meta: { fuente: string; nota: string }; porTerritorio: Record<string, FilaEconomia> }
const ECONOMIA_POR_MUNICIPIO: Record<string, EconomiaData> = {};
const CARGADORES_ECO = import.meta.glob<{ default: unknown }>('../data/dane/manzanas/*.json');
const cargasEco = new Map<string, Promise<boolean>>();
export function cargarEconomia(dane: string): Promise<boolean> {
  if (ECONOMIA_POR_MUNICIPIO[dane]) return Promise.resolve(true);
  if (!cargasEco.has(dane)) {
    const muni = Object.entries(INDICE).find(([, m]) => m.dane === dane)?.[0];
    const cargar = muni ? CARGADORES_ECO[`../data/dane/manzanas/${muni}.json`] : undefined;
    cargasEco.set(dane, cargar
      ? cargar().then((m) => { ECONOMIA_POR_MUNICIPIO[dane] = m.default as EconomiaData; return true; }).catch(() => false)
      : Promise.resolve(false));
  }
  return cargasEco.get(dane)!;
}

export interface SeccionEconomia {
  estado: EstadoDato;
  fuente: string;
  nota: string;
  /** Viviendas por estrato 1–6 y sin estrato */
  estratos: number[];
  estratoPromedio: number | null;
  estratoModa: number | null;
  /** % de viviendas (que respondieron) con cada servicio */
  servicios: { nombre: string; pct: number }[];
  /** % de personas por nivel educativo alcanzado */
  educacion: { nombre: string; pct: number }[];
  ipm: number | null;
  /** % de personas (con dato) por nivel de vulnerabilidad DANE; null si el municipio no la tiene cargada todavía */
  vulnerabilidad: { nombre: string; pct: number }[] | null;
  unidadesEconomicas: { total: number; comercio: number; industria: number; servicios: number; otras: number };
}

const NIVELES_VULNERABILIDAD = ['Baja', 'Media-baja', 'Media', 'Media-alta', 'Alta'];

export function economia(t: TerritorioFicha): SeccionEconomia | null {
  const data = ECONOMIA_POR_MUNICIPIO[t.dane];
  if (!data) return null;
  const filas = idsBarrios(t).map((id) => data.porTerritorio[id]).filter(Boolean);
  const suma = (k: 'e' | 's' | 'ed' | 'ipm' | 'ue', n: number) => filas.reduce((acc, f) => acc.map((v, i) => v + (f[k][i] ?? 0)), new Array(n).fill(0) as number[]);
  const e = suma('e', 7), sv = suma('s', 7), ed = suma('ed', 6), ipm = suma('ipm', 3), ue = suma('ue', 7);
  const conEstrato = e.slice(0, 6).reduce((a, b) => a + b, 0);
  const pctDe = (v: number, base: number) => (base ? (100 * v) / base : 0);
  const baseEd = ed.reduce((a, b) => a + b, 0) - ed[5];
  // Vulnerabilidad: solo si el municipio ya tiene el campo 'vul' cargado (agregar_manzanas.py, 27-sep-2026).
  const vul = filas.every((f) => f.vul) ? filas.reduce((acc, f) => acc.map((v, i) => v + (f.vul![i] ?? 0)), new Array(6).fill(0) as number[]) : null;
  const baseVul = vul ? vul.slice(0, 5).reduce((a, b) => a + b, 0) : 0;
  return {
    estado: conEstrato ? 'oficial' : 'sin-informacion',
    fuente: 'DANE, CNPV 2018 por manzana · IPM y vulnerabilidad por manzana · conteo de unidades económicas',
    nota: data.meta.nota,
    estratos: e,
    estratoPromedio: conEstrato ? e.slice(0, 6).reduce((a, v, i) => a + v * (i + 1), 0) / conEstrato : null,
    estratoModa: conEstrato ? e.slice(0, 6).indexOf(Math.max(...e.slice(0, 6))) + 1 : null,
    servicios: ['Energía', 'Acueducto', 'Alcantarillado', 'Gas natural', 'Recolección de basuras', 'Internet'].map((nombre, i) => ({ nombre, pct: pctDe(sv[i], sv[6]) })),
    educacion: ['Ninguno', 'Primaria', 'Secundaria', 'Técnica o universitaria', 'Posgrado'].map((nombre, i) => ({ nombre, pct: pctDe(ed[i], baseEd) })),
    ipm: ipm[1] ? ipm[0] / ipm[1] : null,
    vulnerabilidad: vul && baseVul ? NIVELES_VULNERABILIDAD.map((nombre, i) => ({ nombre, pct: pctDe(vul[i], baseVul) })) : null,
    unidadesEconomicas: { total: ue[0], comercio: ue[1], industria: ue[2], servicios: ue[3], otras: ue[4] + ue[5] + ue[6] },
  };
}

// --- 3. Censo electoral --------------------------------------------------------------------

export interface SeccionCenso {
  estado: EstadoDato;
  censo: number;
  mujeres: number;
  hombres: number;
  mesas: number;
  puestos: PuestoVotacion[];
  /** Puestos del municipio sin coordenadas (no se pueden ubicar en ninguna comuna) */
  sinUbicar: PuestoVotacion[];
  nota: string;
}

/**
 * @param puestosDentro puestos cuyo punto cae en el territorio (asignarPuestosATerritorios)
 * @param sinUbicar puestos sin coordenadas del municipio (solo se muestran a nivel municipal)
 */
export function censoElectoral(t: TerritorioFicha, puestosDentro: PuestoVotacion[], sinUbicar: PuestoVotacion[] = []): SeccionCenso {
  const todos = t.tipo === 'municipio' ? [...puestosDentro, ...sinUbicar] : puestosDentro;
  const suma = (k: 'total' | 'mujeres' | 'hombres' | 'mesas') => todos.reduce((s, p) => s + p[k], 0);
  let nota = 'El censo se cuenta por puesto, no por residencia: un puesto recibe votantes de barrios vecinos.';
  if (t.tipo === 'municipio' && sinUbicar.length) {
    nota = `${fmt(sinUbicar.length)} puestos (${fmt(sinUbicar.reduce((s, p) => s + p.total, 0))} votantes) no tienen coordenadas y no se asignan a ninguna comuna. ${nota}`;
  }
  if (t.tipo !== 'municipio' && !puestosDentro.length) nota = 'No hay puestos de votación dentro: sus residentes votan en puestos vecinos. No se reparte ni se estima.';
  return {
    estado: todos.length ? 'oficial' : 'sin-informacion',
    censo: suma('total'), mujeres: suma('mujeres'), hombres: suma('hombres'), mesas: suma('mesas'),
    puestos: [...puestosDentro].sort((a, b) => b.total - a.total), sinUbicar: t.tipo === 'municipio' ? sinUbicar : [], nota,
  };
}

// --- 4. Grupos ------------------------------------------------------------------------------

export interface FilaGrupo {
  grupo: string;
  /** Personas de 18 años o más (DANE 2018) */
  mujeresPoblacion: number;
  hombresPoblacion: number;
  /** Porcentaje del grupo en la población adulta */
  pct: number;
  /** Votantes estimados (censo de sus puestos repartido con la composición por edad) */
  votantesMujeres: number | null;
  votantesHombres: number | null;
}

export interface SeccionGrupos {
  estado: EstadoDato;
  filas: FilaGrupo[];
  /** Segmentos sexo × tramo (18–34, 35–54, 55 o más) */
  segmentos: { etiqueta: string; valor: number; unidad: 'votantes' | 'habitantes' }[];
  nota: string;
}

export function grupos(dem: SeccionDemografia, censo: SeccionCenso): SeccionGrupos {
  const d = dem.datos;
  if (!d || !dem.conDetalle) {
    return { estado: 'sin-informacion', filas: [], segmentos: [], nota: `Sin información para estimar. ${dem.motivo ?? ''}`.trim() };
  }
  const decenal = d.edades.length === 9;
  const GRUPOS = decenal ? GRUPOS_EDAD_VOTANTES_10 : GRUPOS_EDAD_VOTANTES;
  const adultos = GRUPOS.map(([, partes]) => partes.reduce((s, [i, f]) => s + d.edades[i] * f, 0));
  const total = adultos.reduce((s, v) => s + v, 0);
  if (!total) return { estado: 'sin-informacion', filas: [], segmentos: [], nota: 'Sin población adulta registrada para estimar.' };
  const fm = d.mujeres / (d.mujeres + d.hombres);
  const hayCenso = censo.censo > 0;
  // El sexo de los votantes es oficial (Registraduría, por puesto); la edad se reparte con la del DANE
  const vm = hayCenso ? censo.mujeres : 0;
  const vh = hayCenso ? censo.hombres : 0;
  const filas: FilaGrupo[] = GRUPOS.map(([grupo], i) => ({
    grupo,
    mujeresPoblacion: Math.round(adultos[i] * fm),
    hombresPoblacion: Math.round(adultos[i] * (1 - fm)),
    pct: (100 * adultos[i]) / total,
    votantesMujeres: hayCenso ? Math.round((vm * adultos[i]) / total) : null,
    votantesHombres: hayCenso ? Math.round((vh * adultos[i]) / total) : null,
  }));
  const tramos: [string, number[]][] = decenal ? [['18–29', [0]], ['30–49', [1, 2]], ['50 o más', [3, 4, 5]]] : [['18–34', [0, 1]], ['35–54', [2, 3]], ['55 o más', [4, 5]]];
  const segmentos: SeccionGrupos['segmentos'] = [];
  for (const [et, idx] of tramos) {
    const a = idx.reduce((s, i) => s + adultos[i], 0) / total;
    segmentos.push(hayCenso
      ? { etiqueta: `Mujeres ${et}`, valor: Math.round(vm * a), unidad: 'votantes' }
      : { etiqueta: `Mujeres ${et}`, valor: Math.round(total * a * fm), unidad: 'habitantes' });
    segmentos.push(hayCenso
      ? { etiqueta: `Hombres ${et}`, valor: Math.round(vh * a), unidad: 'votantes' }
      : { etiqueta: `Hombres ${et}`, valor: Math.round(total * a * (1 - fm)), unidad: 'habitantes' });
  }
  let nota = `Cruce estimado: el sexo de los votantes es oficial (Registraduría, por puesto) y la edad se reparte según la pirámide del DANE 2018 del territorio (${decenal ? '18–19 años = 20 % del grupo 10–19' : '18–19 años = 40 % del grupo 15–19'}). Se supone que la edad se distribuye igual entre mujeres y hombres, porque el DANE no publica sexo por edad a nivel de manzana.`;
  if (!hayCenso) nota += ' Este territorio no tiene puestos: se muestran habitantes, no votantes.';
  return { estado: 'estimado', filas, segmentos, nota };
}

// --- 1. Política -----------------------------------------------------------------------------

export interface ActorFicha {
  id: string;
  nombre: string;
  cargo: string;
  partido: string;
  casa: string;
}

export interface SeccionPolitica {
  resultados: { estado: EstadoDato; texto: string; alcaldia: Resultado2023['alcaldia'] | null; ambito: 'municipio' | 'territorio' };
  actores: ActorFicha[];
  fuenteActores: string;
}

/** Palabras con que la base curada ubica a un actor en cada comuna o zona de Bello */
const ANCLAS_BELLO: Record<string, (a: string) => boolean> = {
  'bello-div-1': (a) => /comuna 1\b|par[ií]s/.test(a),
  'bello-div-2': (a) => /comuna 2\b|la madera/.test(a),
  'bello-div-3': (a) => /comuna 3\b|santa ana/.test(a),
  'bello-div-4': (a) => /comuna 4\b|su[aá]rez/.test(a),
  'bello-div-5': (a) => /comuna 5\b|la cumbre|trapiche/.test(a),
  'bello-div-6': (a) => /comuna 6\b|bellavista/.test(a),
  'bello-div-7': (a) => /comuna 7\b|altos de niqu[ií]a/.test(a),
  'bello-div-8': (a) => /comuna 8\b|(?<!altos de )niqu[ií]a/.test(a),
  'bello-div-9': (a) => /comuna 9\b|guasimalito/.test(a),
  'bello-div-10': (a) => /comuna 10\b|fontidue[nñ]o/.test(a),
  'bello-div-11': (a) => /comuna 11\b|zamora/.test(a),
  'bello-div-12': (a) => /comuna 12\b/.test(a),
  'bello-div-SF': (a) => /san f[eé]lix/.test(a),
  'bello-div-RUR': (a) => /vereda/.test(a),
};

const casaNombre = new Map(POLITICAL_HOUSES_DATA.map((h) => [h.id, h.name]));

export function actoresDeTerritorio(t: TerritorioFicha): ActorFicha[] {
  const delMunicipio = GRAPH_NODES_DATA.filter((n) => n.municipality === t.municipio);
  const divId = t.tipo === 'subdivision' ? t.padreId : t.id;
  const regla = divId ? ANCLAS_BELLO[divId] : undefined;
  const lista = t.tipo === 'municipio' ? delMunicipio : regla ? delMunicipio.filter((n) => regla((n.municipalAnchor || '').toLowerCase())) : [];
  return lista.map((n) => ({
    id: n.id,
    nombre: n.name,
    cargo: n.roleLabel || n.role,
    partido: n.partyName || 'Sin partido',
    casa: casaNombre.get(n.houseId) || n.houseName || 'Sin casa',
  }));
}

/** Resultado oficial municipal (escrutinio) y actores; los resultados por puesto están en electionResultsService */
export function politica(t: TerritorioFicha): SeccionPolitica {
  const r = getResultado2023(t.dane);
  const fuenteActores = 'Base curada del desarrollador (casas políticas). Sin verificar.';
  const porPuesto = tieneResultadosPorPuesto(t.dane);
  if (t.tipo === 'municipio') {
    return {
      resultados: r
        ? { estado: 'oficial', ambito: 'municipio', alcaldia: r.alcaldia, texto: `Escrutinio oficial de la Alcaldía 2023: participación ${pct(r.alcaldia.participacion)} de ${fmt(r.alcaldia.censo)} habilitados.` }
        : { estado: 'sin-informacion', ambito: 'municipio', alcaldia: null, texto: 'Sin resultados 2023 cargados para este municipio.' },
      actores: actoresDeTerritorio(t), fuenteActores,
    };
  }
  return {
    resultados: {
      estado: porPuesto ? 'oficial' : 'sin-informacion', ambito: 'territorio', alcaldia: r?.alcaldia ?? null,
      texto: porPuesto
        ? 'Resultados de los puestos ubicados dentro (Registraduría). Los votos se cuentan donde está el puesto, no donde vive el votante.'
        : 'Proteus aún no tiene resultados por puesto de votación para este municipio, así que no puede sumar los de este territorio.',
    },
    actores: actoresDeTerritorio(t), fuenteActores,
  };
}

// --- Utilidades -----------------------------------------------------------------------------

export const fmt = (n: number | null | undefined) => (n == null ? '—' : Math.round(n).toLocaleString('es-CO'));
export const pct = (n: number | null | undefined) =>
  n == null ? '—' : `${n.toLocaleString('es-CO', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;

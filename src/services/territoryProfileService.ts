/**
 * FICHA TERRITORIAL (comunas, barrios y veredas)
 *
 * Reúne en cuatro secciones lo que Proteus sabe de un territorio y marca cada dato como
 * Oficial, Estimado o Sin información:
 *  1. Política: Alcaldía 2023 (escrutinio a nivel municipal; preconteo por puesto donde está cargado,
 *     hoy Rionegro) y actores de la base curada.
 *  2. Demografía: DANE, CNPV 2018 por manzana (hoy Bello) y proyección 2026.
 *  3. Censo electoral: suma de los puestos de votación ubicados dentro del territorio.
 *  4. Grupos: composición estimada por edad y sexo de los votantes.
 *
 * Nada se inventa: cuando no hay dato, la ficha lo dice y explica por qué.
 */
import rawBello from '../data/dane/belloCnpv2018Barrios.json';
import rawIndice from '../data/territorio/indiceTerritorios.json';
import rawRionegro2023 from '../data/electoral/resultadosPuesto2023/rionegro.json';
import { getDaneMunicipio } from './daneMunicipalService';
import { getResultado2023, type Resultado2023 } from './electoralResults2023Service';
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
const BELLO = rawBello as unknown as DemografiaData;
export const DEMOGRAFIA_BELLO_META = BELLO.meta;

/** Municipios con demografía por barrio cargada (código DANE) */
const DEMOGRAFIA_POR_MUNICIPIO: Record<string, DemografiaData> = { '05088': BELLO };

/** Municipios con ficha territorial (id del registro de divisiones) */
export const MUNICIPIOS_CON_FICHA = Object.keys(INDICE);

/** Construye la ficha a partir del id del municipio ('rionegro') o de una división/subdivisión */
export function territorioFicha(id: string): TerritorioFicha | null {
  for (const [muniId, m] of Object.entries(INDICE)) {
    if (id === muniId) return { tipo: 'municipio', id, nombre: m.nombre, dane: m.dane, municipio: m.nombre };
    if (!id.startsWith(`${muniId}-`)) continue;
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

export function sumarDemografia(filas: number[][]): Demografia {
  const d: Demografia = { personas: 0, hombres: 0, mujeres: 0, edades: new Array(17).fill(0), viviendas: 0, hogares: 0, unidadesEconomicas: 0, personasAnonimizadas: 0 };
  for (const v of filas) {
    // campos: total, hombres, mujeres, 17 edades, edad no informa, viviendas, hogares, unidades económicas
    d.personas += v[0];
    d.hombres += v[1];
    d.mujeres += v[2];
    for (let i = 0; i < 17; i++) d.edades[i] += v[3 + i];
    d.viviendas += v[21];
    d.hogares += v[22];
    d.unidadesEconomicas += v[23];
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
  const datos = sumarDemografia(idsBarrios(t).map((id) => data.porTerritorio[id]).filter(Boolean));
  const conDetalle = datos.personas > 0 && datos.hombres + datos.mujeres > 0;
  let motivo: string | undefined;
  if (!conDetalle) {
    if (datos.personas > 0) motivo = `El DANE anonimiza esta zona: publica solo el total (${fmt(datos.personas)} personas), sin sexo ni edad.`;
    else if (esRural(t)) motivo = 'El DANE no publica la población rural dispersa por manzana, así que aquí no hay conteo por sexo ni edad.';
    else motivo = 'No hay manzanas censadas por el DANE dentro de este polígono (zona industrial, verde o en desarrollo).';
  }
  const subs = indiceDe(t).subdivisiones;
  const urbano2018 = Object.keys(subs)
    .filter((k) => subs[k].tipo === 'Barrio')
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
  const adultos = GRUPOS_EDAD_VOTANTES.map(([, partes]) => partes.reduce((s, [i, f]) => s + d.edades[i] * f, 0));
  const total = adultos.reduce((s, v) => s + v, 0);
  if (!total) return { estado: 'sin-informacion', filas: [], segmentos: [], nota: 'Sin población adulta registrada para estimar.' };
  const fm = d.mujeres / (d.mujeres + d.hombres);
  const hayCenso = censo.censo > 0;
  // El sexo de los votantes es oficial (Registraduría, por puesto); la edad se reparte con la del DANE
  const vm = hayCenso ? censo.mujeres : 0;
  const vh = hayCenso ? censo.hombres : 0;
  const filas: FilaGrupo[] = GRUPOS_EDAD_VOTANTES.map(([grupo], i) => ({
    grupo,
    mujeresPoblacion: Math.round(adultos[i] * fm),
    hombresPoblacion: Math.round(adultos[i] * (1 - fm)),
    pct: (100 * adultos[i]) / total,
    votantesMujeres: hayCenso ? Math.round((vm * adultos[i]) / total) : null,
    votantesHombres: hayCenso ? Math.round((vh * adultos[i]) / total) : null,
  }));
  const tramos: [string, number[]][] = [['18–34', [0, 1]], ['35–54', [2, 3]], ['55 o más', [4, 5]]];
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
  let nota = 'Cruce estimado: el sexo de los votantes es oficial (Registraduría, por puesto) y la edad se reparte según la pirámide del DANE 2018 del territorio (18–19 años = 40 % del grupo 15–19). Se supone que la edad se distribuye igual entre mujeres y hombres, porque el DANE no publica sexo por edad a nivel de manzana.';
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

/** Resultado sumado por puesto (preconteo) */
export interface ResultadoPuestos {
  fuente: string;
  habilitados: number;
  votantes: number;
  blanco: number;
  nulos: number;
  noMarcados: number;
  puestos: number;
  alcaldia: { nombre: string; partido: string; votos: number; pct: number }[];
  concejo: { partido: string; votos: number; pct: number }[];
}

export interface SeccionPolitica {
  resultados: { estado: EstadoDato; texto: string; alcaldia: Resultado2023['alcaldia'] | null; ambito: 'municipio' | 'territorio' };
  /** Resultados 2023 sumando los puestos del territorio (si el municipio los tiene cargados) */
  porPuestos: ResultadoPuestos | null;
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

interface ResultadosPuestoData {
  meta: { fuente: string; tipo: string; nota: string };
  candidatos: { n: string; p: number }[];
  partidos: string[];
  puestos: Record<string, {
    alcaldia: { habilitados: number; votantes: number; blanco: number; nulos: number; noMarcados: number; candidatos: [number, number][] };
    concejo: { votantes: number; blanco: number; partidos: [number, number][] };
  }>;
}
/** Resultados 2023 por puesto (preconteo) cargados, por código DANE */
const RESULTADOS_PUESTO_2023: Record<string, ResultadosPuestoData> = { '05615': rawRionegro2023 as unknown as ResultadosPuestoData };

export function tieneResultadosPorPuesto(dane: string): boolean {
  return !!RESULTADOS_PUESTO_2023[dane];
}

/** Suma los resultados de los puestos dados (no reparte ni estima: solo puestos con resultado) */
export function sumarResultadosPuestos(dane: string, codPuestos: string[]): ResultadoPuestos | null {
  const data = RESULTADOS_PUESTO_2023[dane];
  if (!data) return null;
  const filas = codPuestos.map((c) => data.puestos[c]).filter(Boolean);
  if (!filas.length) return null;
  const al = new Map<number, number>();
  const co = new Map<number, number>();
  let habilitados = 0, votantes = 0, blanco = 0, nulos = 0, noMarcados = 0, blancoCo = 0;
  for (const f of filas) {
    habilitados += f.alcaldia.habilitados;
    votantes += f.alcaldia.votantes;
    blanco += f.alcaldia.blanco;
    nulos += f.alcaldia.nulos;
    noMarcados += f.alcaldia.noMarcados;
    blancoCo += f.concejo.blanco;
    for (const [i, v] of f.alcaldia.candidatos) al.set(i, (al.get(i) ?? 0) + v);
    for (const [i, v] of f.concejo.partidos) co.set(i, (co.get(i) ?? 0) + v);
  }
  const validosAl = [...al.values()].reduce((s, v) => s + v, 0) + blanco;
  const validosCo = [...co.values()].reduce((s, v) => s + v, 0) + blancoCo;
  return {
    fuente: data.meta.fuente,
    habilitados, votantes, blanco, nulos, noMarcados, puestos: filas.length,
    alcaldia: [...al.entries()].sort((a, b) => b[1] - a[1]).map(([i, v]) => ({
      nombre: data.candidatos[i].n, partido: data.partidos[data.candidatos[i].p], votos: v, pct: validosAl ? (100 * v) / validosAl : 0,
    })),
    concejo: [...co.entries()].sort((a, b) => b[1] - a[1]).map(([i, v]) => ({ partido: data.partidos[i], votos: v, pct: validosCo ? (100 * v) / validosCo : 0 })),
  };
}

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

/**
 * @param puestosDentro puestos del territorio; si el municipio tiene resultados por puesto, se suman
 */
export function politica(t: TerritorioFicha, puestosDentro: PuestoVotacion[] = []): SeccionPolitica {
  const r = getResultado2023(t.dane);
  const fuenteActores = 'Base curada del desarrollador (casas políticas). Sin verificar.';
  const porPuestos = sumarResultadosPuestos(t.dane, puestosDentro.map((p) => p.codPuesto));
  if (t.tipo === 'municipio') {
    return {
      resultados: r
        ? { estado: 'oficial', ambito: 'municipio', alcaldia: r.alcaldia, texto: `Escrutinio oficial: participación ${pct(r.alcaldia.participacion)} de ${fmt(r.alcaldia.censo)} habilitados. ${tieneResultadosPorPuesto(t.dane) ? 'Los resultados por comuna, barrio y vereda salen de sumar el preconteo de sus puestos.' : 'Resultados por comuna: pendientes; se sumarán al cargar los resultados por puesto.'}` }
        : { estado: 'sin-informacion', ambito: 'municipio', alcaldia: null, texto: 'Sin resultados 2023 cargados para este municipio.' },
      actores: actoresDeTerritorio(t), fuenteActores, porPuestos,
    };
  }
  if (porPuestos) {
    return {
      resultados: {
        estado: 'oficial', ambito: 'territorio', alcaldia: r?.alcaldia ?? null,
        texto: `Suma de ${fmt(porPuestos.puestos)} puesto(s) ubicados dentro, según el preconteo de la Registraduría. Los votos se cuentan donde está el puesto, no donde vive el votante.`,
      },
      actores: actoresDeTerritorio(t), fuenteActores, porPuestos,
    };
  }
  const tieneDatos = tieneResultadosPorPuesto(t.dane);
  return {
    resultados: {
      estado: 'sin-informacion', ambito: 'territorio', alcaldia: r?.alcaldia ?? null,
      texto: tieneDatos
        ? 'No hay puestos de votación dentro de este territorio: sus residentes votan en puestos vecinos, así que no tiene resultados propios.'
        : 'Proteus aún no tiene resultados por puesto de votación para este municipio, así que no puede sumar los de este territorio.',
    },
    actores: actoresDeTerritorio(t), fuenteActores, porPuestos: null,
  };
}

// --- Utilidades -----------------------------------------------------------------------------

export const fmt = (n: number | null | undefined) => (n == null ? '—' : Math.round(n).toLocaleString('es-CO'));
export const pct = (n: number | null | undefined) =>
  n == null ? '—' : `${n.toLocaleString('es-CO', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;

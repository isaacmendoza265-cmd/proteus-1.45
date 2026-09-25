/**
 * CENSO ELECTORAL OFICIAL (fuente única)
 *
 * Potencial electoral de la Registraduría Nacional del Estado Civil (visor "Censo
 * electoral" del Observatorio Electoral), corte 30-abr-2026. Los datos se generan con
 * `node scripts/build_censo_electoral.mjs` desde _originales/censo_electoral/.
 *
 * Ningún módulo debe estimar el censo (p. ej. población x 0,72): si un territorio no
 * está aquí, se devuelve `undefined` y quien llama decide cómo mostrarlo.
 */
import rawCensus from '../data/electoral/censoElectoral2026.json';

export interface CensusFigures {
  mujeres: number;
  hombres: number;
  total: number;
  mesas: number;
  puestos: number;
}

export interface MunicipalCensus extends CensusFigures {
  /** id del departamento en colombiaDepartments.geo.json (p. ej. 'antioquia') */
  departamento: string;
  /** Nombre tal como lo escribe la Registraduría (mayúsculas, sin tildes) */
  nombre: string;
  /** Departamento (2) + municipio (3) de la Registraduría. No es el código DANE. */
  codigoRegistraduria: string;
  /** Código DANE (por ahora solo Antioquia) */
  dane: string | null;
}

export interface DepartmentCensus extends CensusFigures {
  id: string;
  nombreRegistraduria: string;
  municipios: number;
}

interface CensusFile {
  meta: { fuente: string; url: string; corte: string; extraido: string; nota: string };
  total: CensusFigures;
  nacional: CensusFigures;
  exterior: CensusFigures;
  departamentos: Record<string, DepartmentCensus>;
  municipios: MunicipalCensus[];
  medellinZonas: Record<string, CensusFigures>;
  medellinCorregimientos: Record<string, CensusFigures>;
}

const DATA = rawCensus as unknown as CensusFile;

export const CENSUS_META = DATA.meta;
/** Colombia + exterior */
export const TOTAL_CENSUS: CensusFigures = DATA.total;
/** Solo puestos en territorio nacional */
export const NATIONAL_CENSUS: CensusFigures = DATA.nacional;
export const ABROAD_CENSUS: CensusFigures = DATA.exterior;

/** Texto corto para citar la fuente en pantallas y prompts */
export const CENSUS_SOURCE_LABEL = `Registraduría, censo electoral con corte ${DATA.meta.corte.split('-').reverse().join('/')}`;

/** Mayúsculas, sin tildes ni signos, espacios simples (igual que el script de generación) */
export function normalizeTerritoryName(s: string): string {
  return String(s ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, ' ')
    .trim();
}

// Nombre oficial -> nombre de la Registraduría, cuando difieren (Antioquia)
const MUNICIPAL_ALIASES: Record<string, string> = {
  'ARMENIA MANTEQUILLA': 'ARMENIA',
  'CAROLINA DEL PRINCIPE': 'CAROLINA',
  'CIUDAD BOLIVAR': 'BOLIVAR',
  DONMATIAS: 'DON MATIAS',
  'EL CARMEN DE VIBORAL': 'CARMEN DE VIBORAL',
  'EL SANTUARIO': 'SANTUARIO',
  'EL PENOL': 'PENOL',
  'PUERTO NARE': 'PUERTO NARE LA MAGDALENA',
  'EL RETIRO': 'RETIRO',
  'SAN ANDRES DE CUERQUIA': 'SAN ANDRES',
  'SAN PEDRO DE LOS MILAGROS': 'SAN PEDRO',
  'SANTA FE DE ANTIOQUIA': 'ANTIOQUIA',
  YONDO: 'YONDO CASABE',
  'SAN VICENTE FERRER': 'SAN VICENTE',
  ITAGUI: 'ITAGUI',
  BOGOTA: 'BOGOTA D C',
  'BOGOTA D C': 'BOGOTA D C',
};

const DEPARTMENT_ALIASES: Record<string, string> = {
  'BOGOTA D C': 'bogota',
  BOGOTA: 'bogota',
  'NORTE DE SANTANDER': 'nortedesantander',
  'LA GUAJIRA': 'laguajira',
  GUAJIRA: 'laguajira',
  'VALLE DEL CAUCA': 'valle_del_cauca',
  VALLE: 'valle_del_cauca',
  'SAN ANDRES Y PROVIDENCIA': 'sanandresyprovidencia',
  'SAN ANDRES': 'sanandresyprovidencia',
};

const byDane = new Map<string, MunicipalCensus>();
const byName = new Map<string, MunicipalCensus>();
for (const m of DATA.municipios) {
  if (m.dane) byDane.set(m.dane, m);
  byName.set(`${m.departamento}|${normalizeTerritoryName(m.nombre)}`, m);
}

/** Resuelve el id de departamento del GeoJSON a partir de un id o nombre */
export function resolveDepartmentId(nameOrId: string): string | undefined {
  if (DATA.departamentos[nameOrId]) return nameOrId;
  const n = normalizeTerritoryName(nameOrId);
  if (DEPARTMENT_ALIASES[n]) return DEPARTMENT_ALIASES[n];
  const compact = n.replace(/ /g, '').toLowerCase();
  if (DATA.departamentos[compact]) return compact;
  return Object.values(DATA.departamentos).find((d) => normalizeTerritoryName(d.nombreRegistraduria) === n)?.id;
}

export function getDepartmentCensus(nameOrId: string): DepartmentCensus | undefined {
  const id = resolveDepartmentId(nameOrId);
  return id ? DATA.departamentos[id] : undefined;
}

export function getAllDepartmentCensus(): DepartmentCensus[] {
  return Object.values(DATA.departamentos);
}

/**
 * Censo de un municipio. Acepta código DANE ('05001'), id tipo 'mpio-05001' o nombre
 * (con o sin tildes). Sin departamento se asume Antioquia, para no confundir homónimos
 * (hay un Rionegro en Antioquia y otro en Santander).
 */
export function getMunicipalCensus(nameOrCode: string, department = 'antioquia'): MunicipalCensus | undefined {
  if (!nameOrCode) return undefined;
  const code = /(\d{5})$/.exec(nameOrCode)?.[1];
  if (code && byDane.has(code)) return byDane.get(code);
  const depId = resolveDepartmentId(department);
  if (!depId) return undefined;
  const n = normalizeTerritoryName(nameOrCode.replace(/_/g, ' ').replace(/-/g, ' '));
  return byName.get(`${depId}|${MUNICIPAL_ALIASES[n] ?? n}`) ?? byName.get(`${depId}|${n}`);
}

export function getMunicipalitiesCensus(department?: string): MunicipalCensus[] {
  if (!department) return DATA.municipios;
  const depId = resolveDepartmentId(department);
  return DATA.municipios.filter((m) => m.departamento === depId);
}

/** Total oficial o, si no hay dato, el valor de respaldo que se pase */
export function officialCensusOr(nameOrCode: string, fallback: number, department = 'antioquia'): number {
  return getMunicipalCensus(nameOrCode, department)?.total ?? fallback;
}

export function formatCensus(n: number): string {
  return n.toLocaleString('es-CO');
}

/** 41421973 -> "41,4M"; 267999 -> "268K" */
export function formatCensusShort(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toLocaleString('es-CO', { maximumFractionDigits: 1 })}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000).toLocaleString('es-CO')}K`;
  return String(n);
}

// --- Medellín por comuna (zonas electorales de la Registraduría) ---------------------

/**
 * Zonas de la Registraduría por comuna. Zona 90 = puesto censo (Estadio y Plaza Mayor),
 * 98 = centros carcelarios, 99 = corregimientos.
 */
export const MEDELLIN_COMUNA_ZONES: Record<number, string[]> = {
  1: ['01', '02'], 2: ['03', '04'], 3: ['05', '06'], 4: ['07', '08'],
  5: ['09', '10'], 6: ['11', '12'], 7: ['13', '14'], 8: ['15', '16'],
  9: ['17', '18'], 10: ['19', '20'], 11: ['21', '22'], 12: ['23', '24'],
  13: ['25', '26'], 14: ['27', '28'], 15: ['29', '30'], 16: ['31', '32'],
};

export function getMedellinZoneCensus(zone: string): CensusFigures | undefined {
  return DATA.medellinZonas[zone];
}

const sumFigures = (list: (CensusFigures | undefined)[]): CensusFigures | undefined => {
  const present = list.filter((x): x is CensusFigures => !!x);
  if (!present.length) return undefined;
  return present.reduce(
    (a, b) => ({
      mujeres: a.mujeres + b.mujeres,
      hombres: a.hombres + b.hombres,
      total: a.total + b.total,
      mesas: a.mesas + b.mesas,
      puestos: a.puestos + b.puestos,
    }),
    { mujeres: 0, hombres: 0, total: 0, mesas: 0, puestos: 0 },
  );
};

/** Censo oficial de una comuna urbana de Medellín (1 a 16) */
export function getMedellinComunaCensus(comuna: number): CensusFigures | undefined {
  const zones = MEDELLIN_COMUNA_ZONES[comuna];
  return zones ? sumFigures(zones.map((z) => DATA.medellinZonas[z])) : undefined;
}

/**
 * Corregimientos: la zona 99 los agrupa a todos. Solo se reparten los puestos que el
 * nombre ubica sin duda (ver scripts/build_censo_electoral.mjs); Altavista y Palmitas
 * comparten puestos que no se pueden separar sin la Divipole georreferenciada.
 */
export function getMedellinCorregimientoCensus(id: string): CensusFigures | undefined {
  const key = id.replace(/^med-correg-/, '');
  return key === 'sin-asignar' ? undefined : DATA.medellinCorregimientos[key];
}

/** Puestos de la zona 99 que aún no se pueden atribuir a Altavista o Palmitas */
export const MEDELLIN_CORREGIMIENTOS_SIN_ASIGNAR = DATA.medellinCorregimientos['sin-asignar'];

/** Zona 90: votantes inscritos en el puesto censo (no se ubican en ninguna comuna) */
export const MEDELLIN_PUESTO_CENSO = DATA.medellinZonas['90'];
/** Zona 99 completa (los 5 corregimientos) */
export const MEDELLIN_CORREGIMIENTOS_TOTAL = DATA.medellinZonas['99'];

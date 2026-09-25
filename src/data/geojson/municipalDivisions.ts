import { TerritoryFeatureCollection } from './types';
import { MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON } from './medellin16ComunasOfficialGeoJson';
import { MEDELLIN_BARRIOS_GEOJSON } from './medellinBarriosGeoJson';
import { getMunicipalCensus } from '../../services/electoralCensusService';

/**
 * Registro de municipios con divisiones internas cartografiadas (niveles 4 y 5 del mapa).
 *
 * Para agregar un municipio: descargar sus capas a _originales/<id>/ con un FUENTE.md,
 * configurarlo en scripts/build_divisiones_municipales.mjs, correr el script y
 * registrarlo aquí. Los archivos se cargan solo cuando se abre ese municipio.
 */
export type ConfianzaFuente = 'oficial' | 'por verificar';

/**
 * REGLA DE NIVELES DEL ZOOM MUNICIPAL (definida por Isaac, 24-sep-2026)
 * - Solo estas ciudades tienen el nivel intermedio de comunas (o localidades) entre municipio y
 *   barrio. Se podrán agregar Cali, Barranquilla, Bucaramanga y Cúcuta cuando haya cartografía.
 * - Los demás municipios pasan directo a su último nivel: barrios, o veredas/corregimientos y
 *   cabecera urbana cuando no distinguen barrios.
 * - Ese último nivel solo existe en municipios con más de 20.000 personas en el censo electoral.
 */
export const CIUDADES_CON_COMUNAS = ['medellin', 'bello', 'itagui', 'bogota', 'cali', 'barranquilla', 'bucaramanga', 'cucuta'];
export const CENSO_MINIMO_ULTIMO_NIVEL = 20_000;

/** Niveles internos que corresponden a un municipio según la regla anterior */
export function nivelesMunicipales(id: string, municipio: string, departamento = 'antioquia') {
  const censo = getMunicipalCensus(municipio, departamento)?.total;
  return {
    comunas: CIUDADES_CON_COMUNAS.includes(id),
    ultimoNivel: censo !== undefined && censo > CENSO_MINIMO_ULTIMO_NIVEL,
    censo,
  };
}

export interface MunicipalDivisionEntry {
  id: string;
  name: string;
  department: string;
  daneCode: string;
  /** Nombre de las divisiones del nivel 4 (p. ej. "Comunas y corregimientos") */
  divisionLabel: string;
  /** Nombre de las subdivisiones del nivel 5 (p. ej. "Barrios y veredas") */
  subdivisionLabel?: string;
  fuente: string;
  confianza: ConfianzaFuente;
  /** false: el municipio se conoce pero todavía no tiene cartografía interna */
  disponible: boolean;
  /** true solo en CIUDADES_CON_COMUNAS: el nivel 4 muestra comunas/localidades. Si es false, el
   *  nivel 4 muestra directamente barrios/veredas (loadSubdivisions). */
  nivelComunas: boolean;
  nota?: string;
  loadDivisions?: () => Promise<TerritoryFeatureCollection>;
  loadSubdivisions?: () => Promise<TerritoryFeatureCollection>;
}

const asFC = (m: { default: unknown }) => m.default as TerritoryFeatureCollection;

export const MUNICIPAL_DIVISIONS_REGISTRY: Record<string, MunicipalDivisionEntry> = {
  medellin: {
    id: 'medellin', name: 'Medellín', department: 'Antioquia', daneCode: '05001',
    divisionLabel: '16 comunas y 5 corregimientos', subdivisionLabel: '332 barrios y veredas',
    fuente: 'Distrito de Medellín - Planeac_Barrio_Vereda_DM (2025)', confianza: 'oficial', disponible: true, nivelComunas: true,
    loadDivisions: async () => MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON,
    loadSubdivisions: async () => MEDELLIN_BARRIOS_GEOJSON,
  },
  bogota: {
    id: 'bogota', name: 'Bogotá D.C.', department: 'Bogotá D.C.', daneCode: '11001',
    divisionLabel: '20 localidades', subdivisionLabel: '1.230 sectores catastrales',
    fuente: 'Catastro Distrital de Bogotá (IDECA)', confianza: 'oficial', disponible: true, nivelComunas: true,
    loadDivisions: () => import('./municipios/bogota.divisiones.geo.json').then(asFC),
    loadSubdivisions: () => import('./municipios/bogota.subdivisiones.geo.json').then(asFC),
  },
  itagui: {
    id: 'itagui', name: 'Itagüí', department: 'Antioquia', daneCode: '05360',
    divisionLabel: '7 comunas', subdivisionLabel: '85 barrios',
    fuente: 'Capa pública de ArcGIS "Infraestructura Deportiva y Recreativa de Itagüí" (2026)',
    confianza: 'por verificar', disponible: true, nivelComunas: true,
    nota: 'La fuente no incluye la zona rural del corregimiento El Manzanillo (solo su cabecera).',
    loadDivisions: () => import('./municipios/itagui.divisiones.geo.json').then(asFC),
    loadSubdivisions: () => import('./municipios/itagui.subdivisiones.geo.json').then(asFC),
  },
  rionegro: {
    id: 'rionegro', name: 'Rionegro', department: 'Antioquia', daneCode: '05615',
    divisionLabel: '15 barrios y 36 veredas', subdivisionLabel: '15 barrios y 36 veredas',
    fuente: 'Capa pública de ArcGIS "Mapa Observatorio" (2023); veredas según Decreto 158 de 2018',
    confianza: 'por verificar', disponible: true, nivelComunas: false,
    nota: 'Sin nivel de comunas: pasa directo a barrios (zona urbana) y veredas (zona rural).',
    loadDivisions: () => import('./municipios/rionegro.divisiones.geo.json').then(asFC),
    loadSubdivisions: () => import('./municipios/rionegro.subdivisiones.geo.json').then(asFC),
  },
  bello: {
    id: 'bello', name: 'Bello', department: 'Antioquia', daneCode: '05088',
    divisionLabel: '12 comunas urbanas y la zona rural (corregimiento San Félix y veredas sin corregimiento)', subdivisionLabel: '132 barrios y 19 veredas',
    fuente: 'Alcaldía de Bello - barrios del POT (Acuerdo 033 de 2009), datos.gov.co pnhh-ccwd; comuna de cada barrio según el plano del POT "Comunas y Barrios" (PL13) y veredas según el plano "Veredas" (PL14), Secretaría de Planeación, digitalizados',
    confianza: 'oficial', disponible: true, nivelComunas: true,
    nota: 'Barrios y comunas oficiales del POT. 123 de 132 barrios caen en una sola comuna; 9 (zonas en desarrollo, industriales y asentamientos de borde) se asignan a la comuna donde está la mayor parte. Los nombres de las comunas 1 a 11 son los de la Divipole 2023 de la Registraduría (misma numeración; coincide en 34 de 35 puestos). La 12 (El Pinar) no tiene nombre oficial. Las 19 veredas se digitalizaron del plano PL14 (10 forman el corregimiento San Félix); el POT deja fuera de sus veredas el sector de Ovejas, que el límite DANE sí incluye.',
    loadDivisions: () => import('./municipios/bello.divisiones.geo.json').then(asFC),
    loadSubdivisions: () => import('./municipios/bello.subdivisiones.geo.json').then(asFC),
  },
};

const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Encuentra el municipio del registro a partir de un id, código DANE o nombre.
 * Con código DANE se evita confundir municipios homónimos (p. ej. Rionegro de Santander).
 */
export function resolveMunicipality(ref: { id?: string; name?: string; daneCode?: string }): MunicipalDivisionEntry | null {
  const entries = Object.values(MUNICIPAL_DIVISIONS_REGISTRY);
  const code = (ref.daneCode || ref.id?.match(/\d{5}$/)?.[0] || '').padStart(5, '0');
  if (code !== '00000') {
    const byCode = entries.find((e) => e.daneCode === code);
    if (byCode) return byCode;
    if (ref.daneCode) return null; // tiene código DANE y no está registrado
  }
  const candidates = [ref.id, ref.name].filter(Boolean).map((s) => norm(String(s).replace(/^mpio-/, '')));
  return entries.find((e) => candidates.some((c) => c === e.id || c === norm(e.name) || (e.id === 'bogota' && c.startsWith('bogota')))) ?? null;
}

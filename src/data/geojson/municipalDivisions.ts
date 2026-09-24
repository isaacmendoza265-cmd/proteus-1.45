import { TerritoryFeatureCollection } from './types';
import { MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON } from './medellin16ComunasOfficialGeoJson';
import { MEDELLIN_BARRIOS_GEOJSON } from './medellinBarriosGeoJson';

/**
 * Registro de municipios con divisiones internas cartografiadas (niveles 4 y 5 del mapa).
 *
 * Para agregar un municipio: descargar sus capas a _originales/<id>/ con un FUENTE.md,
 * configurarlo en scripts/build_divisiones_municipales.mjs, correr el script y
 * registrarlo aquí. Los archivos se cargan solo cuando se abre ese municipio.
 */
export type ConfianzaFuente = 'oficial' | 'por verificar';

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
  nota?: string;
  loadDivisions?: () => Promise<TerritoryFeatureCollection>;
  loadSubdivisions?: () => Promise<TerritoryFeatureCollection>;
}

const asFC = (m: { default: unknown }) => m.default as TerritoryFeatureCollection;

export const MUNICIPAL_DIVISIONS_REGISTRY: Record<string, MunicipalDivisionEntry> = {
  medellin: {
    id: 'medellin', name: 'Medellín', department: 'Antioquia', daneCode: '05001',
    divisionLabel: '16 comunas y 5 corregimientos', subdivisionLabel: '332 barrios y veredas',
    fuente: 'Distrito de Medellín - Planeac_Barrio_Vereda_DM (2025)', confianza: 'oficial', disponible: true,
    loadDivisions: async () => MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON,
    loadSubdivisions: async () => MEDELLIN_BARRIOS_GEOJSON,
  },
  bogota: {
    id: 'bogota', name: 'Bogotá D.C.', department: 'Bogotá D.C.', daneCode: '11001',
    divisionLabel: '20 localidades', subdivisionLabel: '1.230 sectores catastrales',
    fuente: 'Catastro Distrital de Bogotá (IDECA)', confianza: 'oficial', disponible: true,
    loadDivisions: () => import('./municipios/bogota.divisiones.geo.json').then(asFC),
    loadSubdivisions: () => import('./municipios/bogota.subdivisiones.geo.json').then(asFC),
  },
  itagui: {
    id: 'itagui', name: 'Itagüí', department: 'Antioquia', daneCode: '05360',
    divisionLabel: '7 comunas', subdivisionLabel: '85 barrios',
    fuente: 'Capa pública de ArcGIS "Infraestructura Deportiva y Recreativa de Itagüí" (2026)',
    confianza: 'por verificar', disponible: true,
    nota: 'La fuente no incluye la zona rural del corregimiento El Manzanillo (solo su cabecera).',
    loadDivisions: () => import('./municipios/itagui.divisiones.geo.json').then(asFC),
    loadSubdivisions: () => import('./municipios/itagui.subdivisiones.geo.json').then(asFC),
  },
  rionegro: {
    id: 'rionegro', name: 'Rionegro', department: 'Antioquia', daneCode: '05615',
    divisionLabel: '4 comunas y 4 corregimientos', subdivisionLabel: '15 barrios y 36 veredas',
    fuente: 'Capa pública de ArcGIS "Mapa Observatorio" (2023); veredas según Decreto 158 de 2018',
    confianza: 'por verificar', disponible: true,
    loadDivisions: () => import('./municipios/rionegro.divisiones.geo.json').then(asFC),
    loadSubdivisions: () => import('./municipios/rionegro.subdivisiones.geo.json').then(asFC),
  },
  bello: {
    id: 'bello', name: 'Bello', department: 'Antioquia', daneCode: '05088',
    divisionLabel: 'Comunas', fuente: 'Sin fuente digital', confianza: 'por verificar', disponible: false,
    nota: 'No hay cartografía digital pública de comunas y barrios; pendiente de construir a partir del plano oficial del POT.',
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

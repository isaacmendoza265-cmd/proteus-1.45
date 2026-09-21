import { ZoomLevelId, TerritoryFeatureCollection } from './types';
import { COLOMBIA_DEPARTMENTS_GEOJSON } from './colombiaDepartmentsGeoJson';
import { ANTIOQUIA_SUBREGIONES_GEOJSON } from './antioquiaSubregionesGeoJson';
import { ANTIOQUIA_125_MUNICIPIOS_GEOJSON } from './antioquia125MunicipiosGeoJson';
import { VALLE_ABURRA_MUNICIPIOS_GEOJSON } from './valleAburraMunicipiosGeoJson';
import { MEDELLIN_COMUNAS_GEOJSON } from './medellinComunasGeoJson';
import { MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON } from './medellin16ComunasOfficialGeoJson';
import { MEDELLIN_BARRIOS_GEOJSON } from './medellinBarriosGeoJson';

export * from './types';
export { COLOMBIA_DEPARTMENTS_GEOJSON } from './colombiaDepartmentsGeoJson';
export { ANTIOQUIA_SUBREGIONES_GEOJSON } from './antioquiaSubregionesGeoJson';
export { ANTIOQUIA_125_MUNICIPIOS_GEOJSON } from './antioquia125MunicipiosGeoJson';
export { VALLE_ABURRA_MUNICIPIOS_GEOJSON } from './valleAburraMunicipiosGeoJson';
export { MEDELLIN_COMUNAS_GEOJSON } from './medellinComunasGeoJson';
export { MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON } from './medellin16ComunasOfficialGeoJson';
export { MEDELLIN_BARRIOS_GEOJSON } from './medellinBarriosGeoJson';

export const GEOJSON_LAYERS_BY_ZOOM: Record<ZoomLevelId, TerritoryFeatureCollection> = {
  'nacional': COLOMBIA_DEPARTMENTS_GEOJSON,
  'departamental': ANTIOQUIA_SUBREGIONES_GEOJSON,
  'metropolitano': VALLE_ABURRA_MUNICIPIOS_GEOJSON,
  'municipal': MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON,
  'comunas-barrios': MEDELLIN_BARRIOS_GEOJSON,
  'hiperlocal': MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON // Backward compatibility alias
};

export interface ZoomLevelConfig {
  id: ZoomLevelId;
  numericLevel: number;
  label: string;
  shortLabel: string;
  icon: string;
  subhead: string;
  datasetName: string;
  nextLevelId?: ZoomLevelId;
  prevLevelId?: ZoomLevelId;
}

export const ZOOM_LEVELS_CONFIG: Record<ZoomLevelId, ZoomLevelConfig> = {
  'nacional': {
    id: 'nacional',
    numericLevel: 1,
    label: '1. Nivel Nacional',
    shortLabel: 'Colombia',
    icon: 'Compass',
    subhead: '32 Departamentos + Bogotá D.C. (Censo Electoral 39M+)',
    datasetName: 'DANE / Registraduría Presidencia 2026',
    nextLevelId: 'departamental'
  },
  'departamental': {
    id: 'departamental',
    numericLevel: 2,
    label: '2. Nivel Departamental',
    shortLabel: 'Antioquia',
    icon: 'Shield',
    subhead: 'Antioquia - 9 Subregiones y 125 Municipios (Sala de Gobernación)',
    datasetName: 'Gobernación de Antioquia / 7 Agentes IA',
    nextLevelId: 'metropolitano',
    prevLevelId: 'nacional'
  },
  'metropolitano': {
    id: 'metropolitano',
    numericLevel: 3,
    label: '3. Nivel Metropolitano',
    shortLabel: 'Valle de Aburrá',
    icon: 'Layers',
    subhead: 'Área Metropolitana del Valle de Aburrá (10 Municipios Conurbados)',
    datasetName: 'AMVA / Registraduría y DANE Metropolitano / Redes de Poder',
    nextLevelId: 'municipal',
    prevLevelId: 'departamental'
  },
  'municipal': {
    id: 'municipal',
    numericLevel: 4,
    label: '4. Nivel Municipal',
    shortLabel: 'Medellín / AMVA',
    icon: 'Building2',
    subhead: 'Municipio y División Comunal / Corregimientos (16 Comunas + 5 Correg)',
    datasetName: 'Alcaldía de Medellín / Escrutinios E-26 Oficiales',
    nextLevelId: 'comunas-barrios',
    prevLevelId: 'metropolitano'
  },
  'comunas-barrios': {
    id: 'comunas-barrios',
    numericLevel: 5,
    label: '5. Nivel Comunas & Barrios',
    shortLabel: 'Comunas & Barrios',
    icon: 'MapPin',
    subhead: 'Zoom Hiperlocal a Barrios y Sectores (E-24 Histórico 2015-2023, IPM, Delitos y Puestos)',
    datasetName: 'Registraduría E-24 Histórico / DANE / Seguridad',
    prevLevelId: 'municipal'
  },
  'hiperlocal': {
    id: 'hiperlocal',
    numericLevel: 4,
    label: '4. Nivel Municipal',
    shortLabel: 'Medellín Comunas',
    icon: 'MapPin',
    subhead: 'Distrito de Medellín - 16 Comunas Urbanas y 5 Corregimientos',
    datasetName: 'Alcaldía de Medellín / Microdatos Electorales 2023-2026',
    nextLevelId: 'comunas-barrios',
    prevLevelId: 'metropolitano'
  }
};

export const ORDERED_ZOOM_LEVELS: ZoomLevelId[] = [
  'nacional',
  'departamental',
  'metropolitano',
  'municipal',
  'comunas-barrios'
];

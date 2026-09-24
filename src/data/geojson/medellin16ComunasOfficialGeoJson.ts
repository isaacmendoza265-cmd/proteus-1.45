import { TerritoryFeatureCollection } from './types';
import data from './medellin16ComunasOfficial.geo.json';

// Cartografía: 16 comunas y 5 corregimientos de Medellín.
// Los datos viven en medellin16ComunasOfficial.geo.json (antes eran un objeto literal gigante en TypeScript).
// Coordenadas redondeadas a 5 decimales (~1 m de precisión).
export const MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON = data as unknown as TerritoryFeatureCollection;

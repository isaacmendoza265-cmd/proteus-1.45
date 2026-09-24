import { TerritoryFeatureCollection } from './types';
import data from './antioquia125Municipios.geo.json';

// Cartografía: 125 municipios de Antioquia.
// Los datos viven en antioquia125Municipios.geo.json (antes eran un objeto literal gigante en TypeScript).
// Coordenadas redondeadas a 5 decimales (~1 m de precisión).
export const ANTIOQUIA_125_MUNICIPIOS_GEOJSON = data as unknown as TerritoryFeatureCollection;

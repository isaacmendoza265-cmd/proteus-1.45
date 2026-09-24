import { TerritoryFeatureCollection } from './types';
import data from './colombiaDepartments.geo.json';

// Cartografía: 33 departamentos + Bogotá D.C..
// Los datos viven en colombiaDepartments.geo.json (antes eran un objeto literal gigante en TypeScript).
// Coordenadas redondeadas a 5 decimales (~1 m de precisión).
export const COLOMBIA_DEPARTMENTS_GEOJSON = data as unknown as TerritoryFeatureCollection;

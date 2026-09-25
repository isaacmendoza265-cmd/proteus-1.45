import { TerritoryFeatureCollection } from './types';
import data from './medellinBarrios.geo.json';

// Nivel 5: 332 barrios, veredas, áreas institucionales y de expansión de Medellín.
// Fuente oficial: capa Planeac_Barrio_Vereda_DM del Distrito de Medellín
// (ver _originales/barrios_medellin/FUENTE.md). Se regenera con:
//   node scripts/build_medellin_barrios.mjs
// Antes este nivel tenía 12 rectángulos aproximados.
export const MEDELLIN_BARRIOS_GEOJSON = data as unknown as TerritoryFeatureCollection;

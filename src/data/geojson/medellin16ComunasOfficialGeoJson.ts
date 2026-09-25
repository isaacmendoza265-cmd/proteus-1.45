import { TerritoryFeatureCollection } from './types';
import data from './medellin16ComunasOfficial.geo.json';
import BOUNDARIES from './medellinComunas.boundaries.geo.json';

// Nivel 4: 16 comunas y 5 corregimientos de Medellín (atributos en medellin16ComunasOfficial.geo.json).
// Las geometrías se reemplazan por las que resultan de disolver los barrios oficiales del
// Distrito (medellinComunas.boundaries.geo.json), así las fronteras de cada comuna coinciden
// exactamente con las de sus barrios. Antes los corregimientos eran figuras aproximadas.
const base = data as unknown as TerritoryFeatureCollection;
const geometries = BOUNDARIES as Record<string, TerritoryFeatureCollection['features'][number]['geometry']>;

export const MEDELLIN_16_COMUNAS_OFFICIAL_GEOJSON: TerritoryFeatureCollection = {
  ...base,
  features: base.features.map((f) => ({ ...f, geometry: geometries[f.id] ?? f.geometry })),
};

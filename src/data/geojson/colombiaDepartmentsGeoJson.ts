import { TerritoryFeatureCollection } from './types';
import data from './colombiaDepartments.geo.json';
import { getDepartmentCensus } from '../../services/electoralCensusService';

// Cartografía: 33 departamentos + Bogotá D.C..
// Los datos viven en colombiaDepartments.geo.json (antes eran un objeto literal gigante en TypeScript).
// Coordenadas redondeadas a 5 decimales (~1 m de precisión).
// El censo electoral se toma del censo oficial de la Registraduría (corte 30-abr-2026).
const raw = data as unknown as TerritoryFeatureCollection;

export const COLOMBIA_DEPARTMENTS_GEOJSON: TerritoryFeatureCollection = {
  ...raw,
  features: raw.features.map((f) => {
    const census = getDepartmentCensus(String(f.properties.id ?? f.id));
    return census ? { ...f, properties: { ...f.properties, electoralCensus: census.total } } : f;
  }),
};

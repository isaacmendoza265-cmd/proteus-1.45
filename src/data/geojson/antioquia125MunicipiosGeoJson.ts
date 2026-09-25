import { TerritoryFeatureCollection } from './types';
import data from './antioquia125Municipios.geo.json';
import { ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA } from '../antioquia125MunicipalitiesMasterData';

// Cartografía: 125 municipios de Antioquia.
// Los datos viven en antioquia125Municipios.geo.json (antes eran un objeto literal gigante en TypeScript).
// Coordenadas redondeadas a 5 decimales (~1 m de precisión).
// Nombre, subregión, censo electoral oficial y datos del alcalde se toman del maestro por código DANE:
// así las correcciones del maestro (p. ej. Cañasgordas, Guadalupe y San Vicente Ferrer, que estaban
// duplicados con el nombre del vecino) llegan también al mapa.
const raw = data as unknown as TerritoryFeatureCollection;
const byDane = new Map(ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA.map((m) => [m.daneCode, m]));

export const ANTIOQUIA_125_MUNICIPIOS_GEOJSON: TerritoryFeatureCollection = {
  ...raw,
  features: raw.features.map((f) => {
    const m = byDane.get(String(f.properties.daneCode ?? ''));
    if (!m) return f;
    return {
      ...f,
      properties: {
        ...f.properties,
        name: m.name,
        subregion: m.subregion,
        electoralCensus: m.electoralCensus,
        electedMayor: m.electedMayor,
        winnerParty: m.winnerParty,
        predominantParty: m.predominantParty,
      },
    };
  }),
};

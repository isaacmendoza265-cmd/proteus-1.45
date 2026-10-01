export type ZoomLevelId = 
  | 'nacional' 
  | 'departamental' 
  | 'metropolitano' 
  | 'municipal' 
  | 'comunas-barrios'
  | 'hiperlocal'; // Alias for compatibility

/** Capas del mapa (27-sep-2026): electoral, demográfica y económica. NBI pasó a la económica; la
 *  capa "Riesgo" se quitó porque su campo riskLevel no tenía fuente. */
export type ThematicMetricLayer = 'electoral' | 'demografico' | 'economico' | 'institucional';

export interface GeoJsonPolygonGeometry {
  type: 'Polygon' | 'MultiPolygon';
  coordinates: number[][][] | number[][][][]; // GeoJSON standard: [lng, lat]
}

export interface TerritoryGeoFeature<T = Record<string, any>> {
  type: 'Feature';
  id: string;
  properties: T & {
    id: string;
    name: string;
    level: ZoomLevelId;
    centroid: [number, number]; // [lat, lng] for Leaflet camera
    bounds?: [[number, number], [number, number]]; // [[south, west], [north, east]]
    population?: number;
    electoralCensus?: number;
    nbiPercentage?: number;
    predominantParty?: string;
    riskLevel?: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
    colorCode?: string;
  };
  geometry: GeoJsonPolygonGeometry;
}

export interface TerritoryFeatureCollection<T = Record<string, any>> {
  type: 'FeatureCollection';
  name: string;
  level: ZoomLevelId;
  center: [number, number]; // [lat, lng]
  defaultZoom: number;
  features: TerritoryGeoFeature<T>[];
}

/**
 * MOTOR DE AGREGACIÓN Y RESALTADO DE SUBREGIONES DE ANTIOQUIA
 * Proyecto Proteus - Cartografía de Precisión
 * 
 * En lugar de utilizar polígonos trapezoidales o toscos, este motor agrupa
 * y resalta las geometrías oficiales de los 125 municipios de Antioquia
 * pertenecientes a cada una de las 9 subregiones departamentales.
 */

import { ANTIOQUIA_125_MUNICIPIOS_GEOJSON, TerritoryFeatureCollection, TerritoryGeoFeature } from '../data/geojson';

export interface SubregionMeta {
  id: string;
  name: string;
  canonicalName: string;
  color: string;
  capitalNode: string;
  expectedMunicipalities: number;
  description: string;
}

export const SUBREGIONES_ANTIOQUIA_META: Record<string, SubregionMeta> = {
  'valle-de-aburra': {
    id: 'valle-de-aburra',
    name: 'Valle de Aburrá',
    canonicalName: 'Valle de Aburrá',
    color: '#6366f1', // Indigo tecnológico
    capitalNode: 'Medellín',
    expectedMunicipalities: 10,
    description: 'Núcleo metropolitano conurbado, centro industrial, financiero y de servicios de Antioquia.'
  },
  'oriente': {
    id: 'oriente',
    name: 'Oriente Antioqueño',
    canonicalName: 'Oriente',
    color: '#10b981', // Verde esmeralda
    capitalNode: 'Rionegro',
    expectedMunicipalities: 23,
    description: 'Polo agroindustrial, aeroespacial, hídrico y de clase media en rápida expansión.'
  },
  'suroeste': {
    id: 'suroeste',
    name: 'Suroeste',
    canonicalName: 'Suroeste',
    color: '#f59e0b', // Ámbar cafetero
    capitalNode: 'Andes / Ciudad Bolívar',
    expectedMunicipalities: 23,
    description: 'Tradición cafetera, turismo ecológico y corredor patrimonial de la colonización antioqueña.'
  },
  'occidente': {
    id: 'occidente',
    name: 'Occidente',
    canonicalName: 'Occidente',
    color: '#06b6d4', // Cyan
    capitalNode: 'Santa Fe de Antioquia',
    expectedMunicipalities: 19,
    description: 'Eje histórico, minero, turístico y de articulación vial hacia el mar con el Túnel del Toyo.'
  },
  'norte': {
    id: 'norte',
    name: 'Norte',
    canonicalName: 'Norte',
    color: '#38bdf8', // Celeste lechero
    capitalNode: 'Santa Rosa de Osos / Yarumal',
    expectedMunicipalities: 17,
    description: 'Cuenca lechera por excelencia, generación hidroeléctrica y páramos de altura.'
  },
  'bajo-cauca': {
    id: 'bajo-cauca',
    name: 'Bajo Cauca',
    canonicalName: 'Bajo Cauca',
    color: '#ef4444', // Rojo alerta
    capitalNode: 'Caucasia',
    expectedMunicipalities: 6,
    description: 'Eje minero, ganadero y comercial de conexión con la Costa Caribe.'
  },
  'magdalena-medio': {
    id: 'magdalena-medio',
    name: 'Magdalena Medio',
    canonicalName: 'Magdalena Medio',
    color: '#ec4899', // Rosa
    capitalNode: 'Puerto Berrío',
    expectedMunicipalities: 6,
    description: 'Puerto fluvial, corredor logístico multimodal y ganadería extensiva.'
  },
  'nordeste': {
    id: 'nordeste',
    name: 'Nordeste',
    canonicalName: 'Nordeste',
    color: '#a855f7', // Púrpura
    capitalNode: 'Segovia / Amalfi',
    expectedMunicipalities: 10,
    description: 'Minería aurífera tecnificada, caña panelera y conectividad vial 4G.'
  },
  'uraba': {
    id: 'uraba',
    name: 'Urabá',
    canonicalName: 'Urabá',
    color: '#14b8a6', // Turquesa bananero
    capitalNode: 'Apartadó / Turbo',
    expectedMunicipalities: 11,
    description: 'Complejo portuario internacional (Puerto Antioquia), agroindustria bananera y platanera.'
  }
};

export class SubregionAggregationEngine {
  /**
   * Normaliza el nombre de una subregión a su clave canónica
   */
  public static normalizeSubregionKey(subregionName: string): string {
    const clean = subregionName.trim().toLowerCase();
    if (clean.includes('aburr') || clean.includes('metropol')) return 'valle-de-aburra';
    if (clean.includes('oriente')) return 'oriente';
    if (clean.includes('suroeste')) return 'suroeste';
    if (clean.includes('occidente')) return 'occidente';
    if (clean.includes('norte') && !clean.includes('nordeste')) return 'norte';
    if (clean.includes('bajo cauca')) return 'bajo-cauca';
    if (clean.includes('magdalena')) return 'magdalena-medio';
    if (clean.includes('nordeste')) return 'nordeste';
    if (clean.includes('urab')) return 'uraba';
    return 'oriente';
  }

  /**
   * Obtiene la metadata y color de una subregión
   */
  public static getSubregionMeta(subregionName: string): SubregionMeta {
    const key = this.normalizeSubregionKey(subregionName);
    return SUBREGIONES_ANTIOQUIA_META[key] || SUBREGIONES_ANTIOQUIA_META['valle-de-aburra'];
  }

  /**
   * Retorna los municipios que componen una subregión específica
   */
  public static getMunicipalitiesForSubregion(subregionNameOrKey: string): TerritoryGeoFeature[] {
    const targetKey = this.normalizeSubregionKey(subregionNameOrKey);
    return ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features.filter((f) => {
      const muniSubregion = f.properties.subregion || '';
      return this.normalizeSubregionKey(muniSubregion) === targetKey;
    });
  }

  /**
   * Construye el dataset de subregiones agregadas usando las formas reales de los 125 municipios.
   * Cada municipio recibe el color de su subregión y metadatos para resaltado grupal.
   */
  public static buildSubregionDataset(): TerritoryFeatureCollection {
    const enrichedFeatures: TerritoryGeoFeature[] = ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features.map((f) => {
      const subregionName = f.properties.subregion || 'Antioquia';
      const meta = this.getSubregionMeta(subregionName);

      return {
        ...f,
        properties: {
          ...f.properties,
          subregionId: meta.id,
          subregionCanonical: meta.canonicalName,
          subregionColor: meta.color,
          colorCode: meta.color,
          // Permite interacción como grupo subregional
          subregionGroupLabel: `${meta.name} (${meta.expectedMunicipalities} mpios)`
        }
      };
    });

    return {
      type: 'FeatureCollection',
      name: 'Antioquia - 9 Subregiones Agregadas por Municipios Reales',
      level: 'departamental',
      center: [6.8, -75.6],
      defaultZoom: 8,
      features: enrichedFeatures
    };
  }

  /**
   * Calcula el bounding box consolidado de una subregión completa a partir de sus municipios
   */
  public static getSubregionBounds(subregionKey: string): [[number, number], [number, number]] | null {
    const munis = this.getMunicipalitiesForSubregion(subregionKey);
    if (!munis.length) return null;

    let minLat = 90, maxLat = -90, minLon = 180, maxLon = -180;

    munis.forEach((m) => {
      const coords = m.geometry.type === 'Polygon' 
        ? m.geometry.coordinates[0] 
        : (m.geometry.coordinates as any)[0][0];

      coords.forEach(([lon, lat]: [number, number]) => {
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
        if (lon < minLon) minLon = lon;
        if (lon > maxLon) maxLon = lon;
      });
    });

    return [[minLat, minLon], [maxLat, maxLon]];
  }
}

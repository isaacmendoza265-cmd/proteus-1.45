import { TerritoryFeatureCollection } from './types';

export const ANTIOQUIA_SUBREGIONES_GEOJSON: TerritoryFeatureCollection = {
  type: 'FeatureCollection',
  name: 'Antioquia - 9 Subregiones Departamentales',
  level: 'departamental',
  center: [6.8, -75.6],
  defaultZoom: 8,
  features: [
    {
      type: 'Feature',
      id: 'valle-de-aburra',
      properties: {
        id: 'valle-de-aburra',
        name: 'Valle de Aburrá',
        level: 'departamental',
        centroid: [6.2442, -75.5812],
        bounds: [[6.05, -75.68], [6.48, -75.30]],
        capitalNode: 'Medellín',
        totalMunicipalities: 10,
        population: 4055296,
        electoralCensus: 3012400,
        nbiPercentage: 9.2,
        predominantParty: 'Creemos / Centro Democrático',
        riskLevel: 'Medio',
        colorCode: '#6366f1',
        isInteractiveTarget: true // Links to Nivel 3 (Metropolitano)
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.62, 6.48], [-75.30, 6.44], [-75.34, 6.28],
            [-75.50, 6.08], [-75.65, 6.06], [-75.68, 6.30],
            [-75.62, 6.48]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'oriente',
      properties: {
        id: 'oriente',
        name: 'Oriente Antioqueño',
        level: 'departamental',
        centroid: [6.05, -75.25],
        bounds: [[5.65, -75.50], [6.38, -74.85]],
        capitalNode: 'Rionegro',
        totalMunicipalities: 23,
        population: 712000,
        electoralCensus: 520000,
        nbiPercentage: 12.8,
        predominantParty: 'Centro Democrático / Conservador',
        riskLevel: 'Bajo',
        colorCode: '#10b981'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.34, 6.28], [-74.85, 6.35], [-74.90, 5.70],
            [-75.40, 5.65], [-75.50, 6.08], [-75.34, 6.28]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'occidente',
      properties: {
        id: 'occidente',
        name: 'Occidente Antioqueño',
        level: 'departamental',
        centroid: [6.60, -75.95],
        bounds: [[6.20, -76.35], [7.10, -75.65]],
        capitalNode: 'Santa Fe de Antioquia',
        totalMunicipalities: 19,
        population: 228000,
        electoralCensus: 175000,
        nbiPercentage: 24.3,
        predominantParty: 'Liberal / Conservador',
        riskLevel: 'Medio',
        colorCode: '#f59e0b'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.68, 6.30], [-75.65, 7.08], [-76.35, 7.05],
            [-76.30, 6.25], [-75.68, 6.30]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'suroeste',
      properties: {
        id: 'suroeste',
        name: 'Suroeste Antioqueño',
        level: 'departamental',
        centroid: [5.80, -75.80],
        bounds: [[5.50, -76.15], [6.15, -75.55]],
        capitalNode: 'Jericó / Andes',
        totalMunicipalities: 23,
        population: 388000,
        electoralCensus: 310000,
        nbiPercentage: 17.6,
        predominantParty: 'Conservador / Centro Democrático',
        riskLevel: 'Bajo',
        colorCode: '#06b6d4'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.65, 6.06], [-75.50, 5.52], [-76.12, 5.54],
            [-76.15, 6.14], [-75.65, 6.06]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'norte',
      properties: {
        id: 'norte',
        name: 'Norte Antioqueño',
        level: 'departamental',
        centroid: [6.85, -75.45],
        bounds: [[6.50, -75.80], [7.25, -75.10]],
        capitalNode: 'Santa Rosa de Osos / Yarumal',
        totalMunicipalities: 17,
        population: 265000,
        electoralCensus: 198000,
        nbiPercentage: 19.5,
        predominantParty: 'Conservador / Centro Democrático',
        riskLevel: 'Medio',
        colorCode: '#8b5cf6'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.62, 6.48], [-75.78, 7.20], [-75.15, 7.22],
            [-75.12, 6.55], [-75.30, 6.44], [-75.62, 6.48]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'nordeste',
      properties: {
        id: 'nordeste',
        name: 'Nordeste Antioqueño',
        level: 'departamental',
        centroid: [6.95, -74.85],
        bounds: [[6.45, -75.25], [7.50, -74.45]],
        capitalNode: 'Segovia / Amalfi',
        totalMunicipalities: 10,
        population: 215000,
        electoralCensus: 162000,
        nbiPercentage: 27.8,
        predominantParty: 'Liberal / Pacto Histórico',
        riskLevel: 'Alto',
        colorCode: '#ec4899'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.15, 7.22], [-74.50, 7.48], [-74.55, 6.50],
            [-75.12, 6.55], [-75.15, 7.22]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'bajo-cauca',
      properties: {
        id: 'bajo-cauca',
        name: 'Bajo Cauca Antioqueño',
        level: 'departamental',
        centroid: [7.85, -75.20],
        bounds: [[7.30, -75.65], [8.20, -74.75]],
        capitalNode: 'Caucasia',
        totalMunicipalities: 6,
        population: 310000,
        electoralCensus: 215000,
        nbiPercentage: 38.2,
        predominantParty: 'Liberal / La U / Mov. Sociales',
        riskLevel: 'Crítico',
        colorCode: '#ef4444'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.65, 7.30], [-75.62, 8.18], [-74.80, 8.10],
            [-74.75, 7.35], [-75.65, 7.30]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'magdalena-medio',
      properties: {
        id: 'magdalena-medio',
        name: 'Magdalena Medio Antioqueño',
        level: 'departamental',
        centroid: [6.30, -74.50],
        bounds: [[5.85, -74.85], [6.75, -74.20]],
        capitalNode: 'Puerto Berrío',
        totalMunicipalities: 6,
        population: 135000,
        electoralCensus: 95000,
        nbiPercentage: 29.4,
        predominantParty: 'Liberal / Centro Democrático',
        riskLevel: 'Medio',
        colorCode: '#14b8a6'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.85, 6.72], [-74.22, 6.68], [-74.45, 5.88],
            [-74.88, 5.92], [-74.85, 6.72]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'uraba',
      properties: {
        id: 'uraba',
        name: 'Urabá Antioqueño',
        level: 'departamental',
        centroid: [8.10, -76.60],
        bounds: [[7.45, -77.15], [8.90, -76.20]],
        capitalNode: 'Apartadó / Turbo',
        totalMunicipalities: 11,
        population: 590000,
        electoralCensus: 420000,
        nbiPercentage: 35.6,
        predominantParty: 'Liberal / Mais / Pacto',
        riskLevel: 'Alto',
        colorCode: '#f97316'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-77.10, 7.48], [-77.12, 8.88], [-76.35, 8.85],
            [-76.25, 7.50], [-77.10, 7.48]
          ]
        ]
      }
    }
  ]
};

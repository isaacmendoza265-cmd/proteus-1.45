import { TerritoryFeatureCollection } from './types';
import { MEDELLIN_COMUNAS_DATA } from '../metropolitanAndMedellinData';

export const MEDELLIN_COMUNAS_GEOJSON: TerritoryFeatureCollection = {
  type: 'FeatureCollection',
  name: 'Medellín - 16 Comunas Urbanas y 5 Corregimientos Rurales',
  level: 'hiperlocal',
  center: [6.2442, -75.5812],
  defaultZoom: 12,
  features: [
    // 1. POPULAR (Comuna 1)
    {
      type: 'Feature',
      id: 'med-c1',
      properties: {
        id: 'med-c1',
        number: 1,
        name: 'Comuna 1 - Popular',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.305, -75.545],
        bounds: [[6.295, -75.555], [6.320, -75.535]],
        population: MEDELLIN_COMUNAS_DATA['med-c1'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c1'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c1'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c1'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c1'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c1'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Medio',
        colorCode: '#ef4444'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.555, 6.320], [-75.535, 6.315], [-75.538, 6.295],
            [-75.558, 6.298], [-75.555, 6.320]
          ]
        ]
      }
    },
    // 2. SANTA CRUZ (Comuna 2)
    {
      type: 'Feature',
      id: 'med-c2',
      properties: {
        id: 'med-c2',
        number: 2,
        name: 'Comuna 2 - Santa Cruz',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.300, -75.560],
        bounds: [[6.288, -75.570], [6.315, -75.550]],
        population: MEDELLIN_COMUNAS_DATA['med-c2'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c2'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c2'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c2'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c2'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c2'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Medio',
        colorCode: '#f97316'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.570, 6.312], [-75.555, 6.315], [-75.552, 6.288],
            [-75.568, 6.285], [-75.570, 6.312]
          ]
        ]
      }
    },
    // 3. MANRIQUE (Comuna 3)
    {
      type: 'Feature',
      id: 'med-c3',
      properties: {
        id: 'med-c3',
        number: 3,
        name: 'Comuna 3 - Manrique',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.275, -75.545],
        bounds: [[6.262, -75.555], [6.295, -75.530]],
        population: MEDELLIN_COMUNAS_DATA['med-c3'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c3'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c3'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c3'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c3'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c3'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Medio',
        colorCode: '#f59e0b'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.555, 6.295], [-75.532, 6.290], [-75.535, 6.265],
            [-75.556, 6.262], [-75.555, 6.295]
          ]
        ]
      }
    },
    // 4. ARANJUEZ (Comuna 4)
    {
      type: 'Feature',
      id: 'med-c4',
      properties: {
        id: 'med-c4',
        number: 4,
        name: 'Comuna 4 - Aranjuez',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.280, -75.560],
        bounds: [[6.265, -75.572], [6.292, -75.548]],
        population: MEDELLIN_COMUNAS_DATA['med-c4'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c4'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c4'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c4'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c4'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c4'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Bajo',
        colorCode: '#eab308'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.568, 6.290], [-75.550, 6.292], [-75.552, 6.265],
            [-75.572, 6.266], [-75.568, 6.290]
          ]
        ]
      }
    },
    // 5. CASTILLA (Comuna 5)
    {
      type: 'Feature',
      id: 'med-c5',
      properties: {
        id: 'med-c5',
        number: 5,
        name: 'Comuna 5 - Castilla',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.295, -75.575],
        bounds: [[6.280, -75.588], [6.315, -75.565]],
        population: MEDELLIN_COMUNAS_DATA['med-c5'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c5'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c5'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c5'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c5'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c5'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Medio',
        colorCode: '#84cc16'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.585, 6.312], [-75.568, 6.310], [-75.568, 6.282],
            [-75.586, 6.280], [-75.585, 6.312]
          ]
        ]
      }
    },
    // 6. DOCE DE OCTUBRE (Comuna 6)
    {
      type: 'Feature',
      id: 'med-c6',
      properties: {
        id: 'med-c6',
        number: 6,
        name: 'Comuna 6 - Doce de Octubre',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.305, -75.590],
        bounds: [[6.290, -75.602], [6.320, -75.580]],
        population: MEDELLIN_COMUNAS_DATA['med-c6'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c6'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c6'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c6'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c6'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c6'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Medio',
        colorCode: '#10b981'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.600, 6.318], [-75.582, 6.315], [-75.584, 6.290],
            [-75.602, 6.292], [-75.600, 6.318]
          ]
        ]
      }
    },
    // 7. ROBLEDO (Comuna 7)
    {
      type: 'Feature',
      id: 'med-c7',
      properties: {
        id: 'med-c7',
        number: 7,
        name: 'Comuna 7 - Robledo',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.280, -75.600],
        bounds: [[6.260, -75.615], [6.295, -75.580]],
        population: MEDELLIN_COMUNAS_DATA['med-c7'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c7'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c7'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c7'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c7'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c7'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Bajo',
        colorCode: '#06b6d4'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.612, 6.292], [-75.585, 6.290], [-75.582, 6.262],
            [-75.614, 6.265], [-75.612, 6.292]
          ]
        ]
      }
    },
    // 8. VILLA HERMOSA (Comuna 8)
    {
      type: 'Feature',
      id: 'med-c8',
      properties: {
        id: 'med-c8',
        number: 8,
        name: 'Comuna 8 - Villa Hermosa',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.250, -75.545],
        bounds: [[6.238, -75.558], [6.265, -75.530]],
        population: MEDELLIN_COMUNAS_DATA['med-c8'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c8'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c8'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c8'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c8'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c8'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Bajo',
        colorCode: '#0ea5e9'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.556, 6.264], [-75.532, 6.260], [-75.536, 6.238],
            [-75.558, 6.240], [-75.556, 6.264]
          ]
        ]
      }
    },
    // 9. BUENOS AIRES (Comuna 9)
    {
      type: 'Feature',
      id: 'med-c9',
      properties: {
        id: 'med-c9',
        number: 9,
        name: 'Comuna 9 - Buenos Aires',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.235, -75.550],
        bounds: [[6.222, -75.560], [6.245, -75.535]],
        population: MEDELLIN_COMUNAS_DATA['med-c9'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c9'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c9'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c9'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c9'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c9'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Bajo',
        colorCode: '#3b82f6'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.558, 6.242], [-75.536, 6.240], [-75.540, 6.222],
            [-75.560, 6.225], [-75.558, 6.242]
          ]
        ]
      }
    },
    // 10. LA CANDELARIA (Comuna 10 - Centro)
    {
      type: 'Feature',
      id: 'med-c10',
      properties: {
        id: 'med-c10',
        number: 10,
        name: 'Comuna 10 - La Candelaria (Centro)',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.250, -75.568],
        bounds: [[6.238, -75.578], [6.262, -75.555]],
        population: MEDELLIN_COMUNAS_DATA['med-c10'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c10'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c10'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c10'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c10'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c10'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Medio',
        colorCode: '#6366f1'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.576, 6.262], [-75.556, 6.260], [-75.558, 6.238],
            [-75.578, 6.240], [-75.576, 6.262]
          ]
        ]
      }
    },
    // 11. LAURELES-ESTADIO (Comuna 11)
    {
      type: 'Feature',
      id: 'med-c11',
      properties: {
        id: 'med-c11',
        number: 11,
        name: 'Comuna 11 - Laureles-Estadio',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.248, -75.590],
        bounds: [[6.235, -75.602], [6.262, -75.575]],
        population: MEDELLIN_COMUNAS_DATA['med-c11'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c11'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c11'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c11'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c11'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c11'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Bajo',
        colorCode: '#8b5cf6'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.598, 6.260], [-75.578, 6.260], [-75.580, 6.236],
            [-75.602, 6.238], [-75.598, 6.260]
          ]
        ]
      }
    },
    // 12. LA AMÉRICA (Comuna 12)
    {
      type: 'Feature',
      id: 'med-c12',
      properties: {
        id: 'med-c12',
        number: 12,
        name: 'Comuna 12 - La América',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.252, -75.605],
        bounds: [[6.242, -75.615], [6.265, -75.595]],
        population: MEDELLIN_COMUNAS_DATA['med-c12'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c12'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c12'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c12'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c12'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c12'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Bajo',
        colorCode: '#a855f7'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.614, 6.264], [-75.596, 6.262], [-75.598, 6.242],
            [-75.615, 6.244], [-75.614, 6.264]
          ]
        ]
      }
    },
    // 13. SAN JAVIER (Comuna 13)
    {
      type: 'Feature',
      id: 'med-c13',
      properties: {
        id: 'med-c13',
        number: 13,
        name: 'Comuna 13 - San Javier',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.255, -75.625],
        bounds: [[6.242, -75.638], [6.270, -75.612]],
        population: MEDELLIN_COMUNAS_DATA['med-c13'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c13'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c13'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c13'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c13'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c13'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Medio',
        colorCode: '#d946ef'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.636, 6.268], [-75.614, 6.264], [-75.615, 6.244],
            [-75.638, 6.245], [-75.636, 6.268]
          ]
        ]
      }
    },
    // 14. EL POBLADO (Comuna 14)
    {
      type: 'Feature',
      id: 'med-c14',
      properties: {
        id: 'med-c14',
        number: 14,
        name: 'Comuna 14 - El Poblado',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.208, -75.565],
        bounds: [[6.185, -75.580], [6.228, -75.545]],
        population: MEDELLIN_COMUNAS_DATA['med-c14'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c14'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c14'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c14'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c14'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c14'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Bajo',
        colorCode: '#ec4899'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.578, 6.228], [-75.548, 6.225], [-75.552, 6.188],
            [-75.580, 6.186], [-75.578, 6.228]
          ]
        ]
      }
    },
    // 15. GUAYABAL (Comuna 15)
    {
      type: 'Feature',
      id: 'med-c15',
      properties: {
        id: 'med-c15',
        number: 15,
        name: 'Comuna 15 - Guayabal',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.215, -75.585],
        bounds: [[6.195, -75.598], [6.230, -75.575]],
        population: MEDELLIN_COMUNAS_DATA['med-c15'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c15'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c15'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c15'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c15'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c15'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Bajo',
        colorCode: '#f43f5e'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.596, 6.230], [-75.578, 6.228], [-75.580, 6.195],
            [-75.598, 6.198], [-75.596, 6.230]
          ]
        ]
      }
    },
    // 16. BELÉN (Comuna 16)
    {
      type: 'Feature',
      id: 'med-c16',
      properties: {
        id: 'med-c16',
        number: 16,
        name: 'Comuna 16 - Belén',
        zone: 'Urbana',
        level: 'hiperlocal',
        centroid: [6.225, -75.605],
        bounds: [[6.205, -75.620], [6.238, -75.590]],
        population: MEDELLIN_COMUNAS_DATA['med-c16'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-c16'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-c16'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-c16'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-c16'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-c16'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Bajo',
        colorCode: '#10b981'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.618, 6.238], [-75.594, 6.236], [-75.596, 6.205],
            [-75.620, 6.208], [-75.618, 6.238]
          ]
        ]
      }
    },
    // CORREGIMIENTOS (5 RURALES)
    // 50. PALMITAS
    {
      type: 'Feature',
      id: 'med-correg-palmitas',
      properties: {
        id: 'med-correg-palmitas',
        number: 50,
        name: 'Corregimiento San Sebastián de Palmitas',
        zone: 'Rural',
        level: 'hiperlocal',
        centroid: [6.335, -75.685],
        bounds: [[6.305, -75.720], [6.365, -75.650]],
        population: MEDELLIN_COMUNAS_DATA['med-correg-palmitas'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-correg-palmitas'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-correg-palmitas'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-correg-palmitas'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-correg-palmitas'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-correg-palmitas'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Bajo',
        colorCode: '#14b8a6'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.718, 6.362], [-75.652, 6.358], [-75.655, 6.310],
            [-75.715, 6.312], [-75.718, 6.362]
          ]
        ]
      }
    },
    // 60. SAN CRISTÓBAL
    {
      type: 'Feature',
      id: 'med-correg-san-cristobal',
      properties: {
        id: 'med-correg-san-cristobal',
        number: 60,
        name: 'Corregimiento San Cristóbal',
        zone: 'Rural',
        level: 'hiperlocal',
        centroid: [6.285, -75.635],
        bounds: [[6.260, -75.665], [6.315, -75.605]],
        population: MEDELLIN_COMUNAS_DATA['med-correg-san-cristobal'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-correg-san-cristobal'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-correg-san-cristobal'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-correg-san-cristobal'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-correg-san-cristobal'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-correg-san-cristobal'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Medio',
        colorCode: '#06b6d4'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.662, 6.312], [-75.608, 6.308], [-75.612, 6.262],
            [-75.665, 6.265], [-75.662, 6.312]
          ]
        ]
      }
    },
    // 70. ALTAVISTA
    {
      type: 'Feature',
      id: 'med-correg-altavista',
      properties: {
        id: 'med-correg-altavista',
        number: 70,
        name: 'Corregimiento Altavista',
        zone: 'Rural',
        level: 'hiperlocal',
        centroid: [6.230, -75.640],
        bounds: [[6.210, -75.665], [6.255, -75.615]],
        population: MEDELLIN_COMUNAS_DATA['med-correg-altavista'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-correg-altavista'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-correg-altavista'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-correg-altavista'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-correg-altavista'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-correg-altavista'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Medio',
        colorCode: '#0284c7'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.662, 6.252], [-75.618, 6.250], [-75.620, 6.212],
            [-75.664, 6.215], [-75.662, 6.252]
          ]
        ]
      }
    },
    // 80. SAN ANTONIO DE PRADO
    {
      type: 'Feature',
      id: 'med-correg-san-antonio-de-prado',
      properties: {
        id: 'med-correg-san-antonio-de-prado',
        number: 80,
        name: 'Corregimiento San Antonio de Prado',
        zone: 'Rural',
        level: 'hiperlocal',
        centroid: [6.185, -75.635],
        bounds: [[6.160, -75.665], [6.210, -75.605]],
        population: MEDELLIN_COMUNAS_DATA['med-correg-san-antonio-de-prado'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-correg-san-antonio-de-prado'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-correg-san-antonio-de-prado'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-correg-san-antonio-de-prado'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-correg-san-antonio-de-prado'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-correg-san-antonio-de-prado'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Medio',
        colorCode: '#3b82f6'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.662, 6.208], [-75.608, 6.205], [-75.610, 6.162],
            [-75.665, 6.164], [-75.662, 6.208]
          ]
        ]
      }
    },
    // 90. SANTA ELENA
    {
      type: 'Feature',
      id: 'med-correg-santa-elena',
      properties: {
        id: 'med-correg-santa-elena',
        number: 90,
        name: 'Corregimiento Santa Elena',
        zone: 'Rural',
        level: 'hiperlocal',
        centroid: [6.225, -75.495],
        bounds: [[6.190, -75.535], [6.260, -75.460]],
        population: MEDELLIN_COMUNAS_DATA['med-correg-santa-elena'].population,
        electoralCensus: MEDELLIN_COMUNAS_DATA['med-correg-santa-elena'].electoralCensus,
        predominantStratum: MEDELLIN_COMUNAS_DATA['med-correg-santa-elena'].predominantStratum,
        youthPercentage: MEDELLIN_COMUNAS_DATA['med-correg-santa-elena'].youthPercentage,
        historicalTurnout: MEDELLIN_COMUNAS_DATA['med-correg-santa-elena'].historicalTurnout,
        abstentionRate: MEDELLIN_COMUNAS_DATA['med-correg-santa-elena'].abstentionRate,
        winnerParty: 'Creemos',
        winnerCandidate: 'Federico Gutiérrez',
        riskLevel: 'Bajo',
        colorCode: '#10b981'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.532, 6.258], [-75.462, 6.254], [-75.465, 6.192],
            [-75.535, 6.195], [-75.532, 6.258]
          ]
        ]
      }
    }
  ]
};

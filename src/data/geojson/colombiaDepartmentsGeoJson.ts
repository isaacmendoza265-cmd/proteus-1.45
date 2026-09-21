import { TerritoryFeatureCollection } from './types';

export const COLOMBIA_DEPARTMENTS_GEOJSON: TerritoryFeatureCollection = {
  type: 'FeatureCollection',
  name: 'Colombia - 32 Departamentos y Distrito Capital',
  level: 'nacional',
  center: [4.5709, -74.2973],
  defaultZoom: 6,
  features: [
    {
      type: 'Feature',
      id: 'antioquia',
      properties: {
        id: 'antioquia',
        name: 'Antioquia',
        level: 'nacional',
        centroid: [6.5, -75.5],
        bounds: [[5.4, -77.1], [8.9, -73.9]],
        population: 6890000,
        electoralCensus: 5240000,
        nbiPercentage: 14.2,
        predominantParty: 'Centro Democrático / Creemos',
        riskLevel: 'Medio',
        colorCode: '#10b981',
        isInteractiveTarget: true,
        region: 'Andina'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-76.9, 8.8], [-76.4, 8.9], [-75.8, 8.2], [-74.8, 8.1],
            [-74.2, 7.5], [-74.4, 6.1], [-75.0, 5.8], [-75.5, 5.5],
            [-76.1, 5.6], [-76.5, 6.2], [-76.8, 7.1], [-77.1, 7.8],
            [-76.9, 8.8]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'bogota',
      properties: {
        id: 'bogota',
        name: 'Bogotá D.C.',
        level: 'nacional',
        centroid: [4.65, -74.1],
        bounds: [[4.4, -74.3], [4.9, -73.9]],
        population: 7900000,
        electoralCensus: 6010000,
        nbiPercentage: 4.8,
        predominantParty: 'Pacto Histórico / Verde',
        riskLevel: 'Bajo',
        colorCode: '#0284c7',
        region: 'Andina'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.25, 4.85], [-74.00, 4.85], [-73.95, 4.55],
            [-74.15, 4.40], [-74.30, 4.60], [-74.25, 4.85]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'cundinamarca',
      properties: {
        id: 'cundinamarca',
        name: 'Cundinamarca',
        level: 'nacional',
        centroid: [5.0, -74.3],
        bounds: [[4.1, -74.9], [5.8, -73.4]],
        population: 3400000,
        electoralCensus: 2200000,
        nbiPercentage: 11.5,
        predominantParty: 'Liberal / Conservador / La U',
        riskLevel: 'Bajo',
        colorCode: '#38bdf8',
        region: 'Andina'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.8, 5.7], [-73.7, 5.7], [-73.5, 4.5],
            [-74.2, 4.1], [-74.8, 4.6], [-74.8, 5.7]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'valle-del-cauca',
      properties: {
        id: 'valle-del-cauca',
        name: 'Valle del Cauca',
        level: 'nacional',
        centroid: [3.8, -76.5],
        bounds: [[3.1, -77.5], [5.0, -75.7]],
        population: 4600000,
        electoralCensus: 3700000,
        nbiPercentage: 12.0,
        predominantParty: 'La U / Pacto Histórico / Liberal',
        riskLevel: 'Alto',
        colorCode: '#6366f1',
        region: 'Pacífica'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-77.4, 4.9], [-75.8, 4.9], [-75.9, 3.2],
            [-77.1, 3.2], [-77.5, 4.0], [-77.4, 4.9]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'atlantico',
      properties: {
        id: 'atlantico',
        name: 'Atlántico',
        level: 'nacional',
        centroid: [10.8, -74.9],
        bounds: [[10.3, -75.2], [11.1, -74.7]],
        population: 2750000,
        electoralCensus: 2050000,
        nbiPercentage: 15.6,
        predominantParty: 'Cambio Radical / Liberal',
        riskLevel: 'Medio',
        colorCode: '#06b6d4',
        region: 'Caribe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.1, 11.1], [-74.75, 11.05], [-74.8, 10.3],
            [-75.2, 10.4], [-75.1, 11.1]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'santander',
      properties: {
        id: 'santander',
        name: 'Santander',
        level: 'nacional',
        centroid: [6.8, -73.4],
        bounds: [[5.7, -74.5], [7.6, -72.6]],
        population: 2300000,
        electoralCensus: 1820000,
        nbiPercentage: 13.1,
        predominantParty: 'Conservador / Centro Democrático',
        riskLevel: 'Medio',
        colorCode: '#f59e0b',
        region: 'Andina'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.2, 7.5], [-72.8, 7.5], [-72.7, 5.9],
            [-74.1, 5.8], [-74.4, 6.7], [-74.2, 7.5]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'bolivar',
      properties: {
        id: 'bolivar',
        name: 'Bolívar',
        level: 'nacional',
        centroid: [8.8, -74.3],
        bounds: [[7.0, -75.4], [10.8, -73.8]],
        population: 2200000,
        electoralCensus: 1700000,
        nbiPercentage: 26.8,
        predominantParty: 'Conservador / Liberal',
        riskLevel: 'Alto',
        colorCode: '#ec4899',
        region: 'Caribe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.4, 10.7], [-74.8, 10.4], [-73.9, 8.4],
            [-74.4, 7.2], [-74.9, 7.8], [-75.2, 9.5],
            [-75.4, 10.7]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'boyaca',
      properties: {
        id: 'boyaca',
        name: 'Boyacá',
        level: 'nacional',
        centroid: [5.6, -73.0],
        bounds: [[4.6, -74.6], [7.1, -71.8]],
        population: 1300000,
        electoralCensus: 1010000,
        nbiPercentage: 14.5,
        predominantParty: 'Verde / Conservador',
        riskLevel: 'Bajo',
        colorCode: '#10b981',
        region: 'Andina'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.8, 6.9], [-72.0, 6.9], [-72.3, 4.8],
            [-73.5, 4.7], [-73.8, 6.9]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'tolima',
      properties: {
        id: 'tolima',
        name: 'Tolima',
        level: 'nacional',
        centroid: [4.1, -75.2],
        bounds: [[2.9, -76.1], [5.3, -74.4]],
        population: 1400000,
        electoralCensus: 1150000,
        nbiPercentage: 18.2,
        predominantParty: 'Conservador / Centro Democrático',
        riskLevel: 'Medio',
        colorCode: '#8b5cf6',
        region: 'Andina'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.4, 5.2], [-74.6, 5.0], [-74.7, 3.3],
            [-75.6, 3.1], [-75.9, 4.2], [-75.4, 5.2]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'narino',
      properties: {
        id: 'narino',
        name: 'Nariño',
        level: 'nacional',
        centroid: [1.3, -77.5],
        bounds: [[0.5, -79.0], [2.4, -76.8]],
        population: 1700000,
        electoralCensus: 1220000,
        nbiPercentage: 32.4,
        predominantParty: 'Pacto Histórico / Liberal',
        riskLevel: 'Crítico',
        colorCode: '#ef4444',
        region: 'Pacífica'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-78.9, 2.3], [-77.0, 2.2], [-77.1, 0.6],
            [-78.6, 0.7], [-78.9, 2.3]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'cordoba',
      properties: {
        id: 'cordoba',
        name: 'Córdoba',
        level: 'nacional',
        centroid: [8.4, -75.8],
        bounds: [[7.4, -76.5], [9.4, -74.9]],
        population: 1850000,
        electoralCensus: 1350000,
        nbiPercentage: 34.0,
        predominantParty: 'La U / Liberal',
        riskLevel: 'Alto',
        colorCode: '#f97316',
        region: 'Caribe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-76.3, 9.3], [-75.4, 9.1], [-75.1, 8.1],
            [-75.8, 7.5], [-76.4, 7.9], [-76.3, 9.3]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'magdalena',
      properties: {
        id: 'magdalena',
        name: 'Magdalena',
        level: 'nacional',
        centroid: [10.2, -74.3],
        bounds: [[8.9, -74.9], [11.3, -73.6]],
        population: 1450000,
        electoralCensus: 1080000,
        nbiPercentage: 31.8,
        predominantParty: 'Fuerza Ciudadana / Liberal',
        riskLevel: 'Medio',
        colorCode: '#eab308',
        region: 'Caribe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.4, 11.3], [-73.7, 11.2], [-73.9, 9.1],
            [-74.8, 9.2], [-74.8, 10.7], [-74.4, 11.3]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'la-guajira',
      properties: {
        id: 'la-guajira',
        name: 'La Guajira',
        level: 'nacional',
        centroid: [11.5, -72.8],
        bounds: [[10.4, -73.6], [12.5, -71.1]],
        population: 1000000,
        electoralCensus: 680000,
        nbiPercentage: 53.7,
        predominantParty: 'Conservador / Cambio Radical',
        riskLevel: 'Alto',
        colorCode: '#d97706',
        region: 'Caribe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-71.7, 12.4], [-71.2, 11.9], [-72.8, 10.6],
            [-73.5, 10.7], [-73.1, 11.6], [-71.7, 12.4]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'cesar',
      properties: {
        id: 'cesar',
        name: 'Cesar',
        level: 'nacional',
        centroid: [9.5, -73.5],
        bounds: [[7.7, -74.2], [10.8, -72.9]],
        population: 1300000,
        electoralCensus: 920000,
        nbiPercentage: 30.2,
        predominantParty: 'La U / Cambio Radical',
        riskLevel: 'Medio',
        colorCode: '#14b8a6',
        region: 'Caribe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.5, 10.7], [-72.9, 10.3], [-73.3, 7.9],
            [-74.0, 8.0], [-73.8, 9.4], [-73.5, 10.7]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'norte-de-santander',
      properties: {
        id: 'norte-de-santander',
        name: 'Norte de Santander',
        level: 'nacional',
        centroid: [8.0, -72.8],
        bounds: [[6.9, -73.6], [9.3, -72.1]],
        population: 1650000,
        electoralCensus: 1300000,
        nbiPercentage: 24.5,
        predominantParty: 'Conservador / Centro Democrático',
        riskLevel: 'Crítico',
        colorCode: '#dc2626',
        region: 'Andina'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.2, 9.2], [-72.4, 9.0], [-72.3, 7.3],
            [-72.9, 7.0], [-73.5, 7.8], [-73.2, 9.2]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'caldas',
      properties: {
        id: 'caldas',
        name: 'Caldas',
        level: 'nacional',
        centroid: [5.3, -75.4],
        bounds: [[4.8, -75.9], [5.8, -74.7]],
        population: 1040000,
        electoralCensus: 840000,
        nbiPercentage: 11.8,
        predominantParty: 'Liberal / Gente en Movimiento',
        riskLevel: 'Bajo',
        colorCode: '#10b981',
        region: 'Andina'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.7, 5.7], [-74.8, 5.6], [-75.0, 4.9],
            [-75.8, 5.0], [-75.7, 5.7]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'risaralda',
      properties: {
        id: 'risaralda',
        name: 'Risaralda',
        level: 'nacional',
        centroid: [4.9, -75.8],
        bounds: [[4.6, -76.2], [5.5, -75.6]],
        population: 970000,
        electoralCensus: 830000,
        nbiPercentage: 12.3,
        predominantParty: 'Liberal / Conservador',
        riskLevel: 'Bajo',
        colorCode: '#3b82f6',
        region: 'Andina'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-76.1, 5.4], [-75.6, 5.3], [-75.6, 4.7],
            [-76.1, 4.8], [-76.1, 5.4]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'quindio',
      properties: {
        id: 'quindio',
        name: 'Quindío',
        level: 'nacional',
        centroid: [4.4, -75.7],
        bounds: [[4.1, -75.9], [4.7, -75.5]],
        population: 560000,
        electoralCensus: 490000,
        nbiPercentage: 10.9,
        predominantParty: 'Liberal / Cambio Radical',
        riskLevel: 'Bajo',
        colorCode: '#06b6d4',
        region: 'Andina'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.8, 4.7], [-75.5, 4.6], [-75.6, 4.2],
            [-75.9, 4.2], [-75.8, 4.7]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'huila',
      properties: {
        id: 'huila',
        name: 'Huila',
        level: 'nacional',
        centroid: [2.5, -75.5],
        bounds: [[1.6, -76.6], [3.5, -74.4]],
        population: 1140000,
        electoralCensus: 900000,
        nbiPercentage: 19.4,
        predominantParty: 'Conservador / Liberal',
        riskLevel: 'Medio',
        colorCode: '#a855f7',
        region: 'Andina'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.2, 3.4], [-74.6, 3.2], [-75.6, 1.7],
            [-76.5, 1.8], [-76.3, 2.7], [-75.2, 3.4]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'cauca',
      properties: {
        id: 'cauca',
        name: 'Cauca',
        level: 'nacional',
        centroid: [2.5, -76.8],
        bounds: [[1.4, -77.9], [3.3, -75.8]],
        population: 1500000,
        electoralCensus: 1080000,
        nbiPercentage: 34.8,
        predominantParty: 'Pacto Histórico / AICO / MAIS',
        riskLevel: 'Crítico',
        colorCode: '#ef4444',
        region: 'Pacífica'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-77.7, 3.2], [-76.0, 3.1], [-76.2, 1.6],
            [-77.5, 1.6], [-77.7, 3.2]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'choco',
      properties: {
        id: 'choco',
        name: 'Chocó',
        level: 'nacional',
        centroid: [5.7, -76.8],
        bounds: [[4.1, -77.6], [8.6, -76.2]],
        population: 550000,
        electoralCensus: 340000,
        nbiPercentage: 58.0,
        predominantParty: 'Liberal / Pacto Histórico',
        riskLevel: 'Crítico',
        colorCode: '#b91c1c',
        region: 'Pacífica'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-77.3, 8.5], [-76.4, 8.4], [-76.4, 4.3],
            [-77.5, 4.3], [-77.4, 6.5], [-77.3, 8.5]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'meta',
      properties: {
        id: 'meta',
        name: 'Meta',
        level: 'nacional',
        centroid: [3.5, -73.0],
        bounds: [[1.6, -74.9], [4.9, -71.1]],
        population: 1070000,
        electoralCensus: 810000,
        nbiPercentage: 17.5,
        predominantParty: 'Centro Democrático / Liberal',
        riskLevel: 'Medio',
        colorCode: '#f59e0b',
        region: 'Orinoquía'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.2, 4.7], [-71.3, 4.6], [-71.5, 2.2],
            [-74.4, 2.0], [-74.2, 4.7]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'casanare',
      properties: {
        id: 'casanare',
        name: 'Casanare',
        level: 'nacional',
        centroid: [5.3, -71.8],
        bounds: [[4.3, -73.1], [6.3, -69.8]],
        population: 440000,
        electoralCensus: 315000,
        nbiPercentage: 18.0,
        predominantParty: 'Centro Democrático / Cambio Radical',
        riskLevel: 'Bajo',
        colorCode: '#10b981',
        region: 'Orinoquía'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-72.8, 6.2], [-70.2, 6.0], [-70.5, 4.5],
            [-73.0, 4.6], [-72.8, 6.2]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'arauca',
      properties: {
        id: 'arauca',
        name: 'Arauca',
        level: 'nacional',
        centroid: [6.8, -70.7],
        bounds: [[6.0, -72.2], [7.1, -69.4]],
        population: 300000,
        electoralCensus: 220000,
        nbiPercentage: 27.2,
        predominantParty: 'Liberal / Centro Democrático',
        riskLevel: 'Crítico',
        colorCode: '#ef4444',
        region: 'Orinoquía'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-71.9, 7.1], [-69.6, 7.0], [-69.8, 6.1],
            [-72.1, 6.2], [-71.9, 7.1]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'putumayo',
      properties: {
        id: 'putumayo',
        name: 'Putumayo',
        level: 'nacional',
        centroid: [0.5, -76.3],
        bounds: [[-0.6, -77.4], [1.5, -74.8]],
        population: 360000,
        electoralCensus: 240000,
        nbiPercentage: 35.0,
        predominantParty: 'Pacto Histórico / Liberal',
        riskLevel: 'Alto',
        colorCode: '#f97316',
        region: 'Amazonía'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-77.2, 1.4], [-75.0, 0.8], [-75.2, -0.4],
            [-77.1, 0.1], [-77.2, 1.4]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'caqueta',
      properties: {
        id: 'caqueta',
        name: 'Caquetá',
        level: 'nacional',
        centroid: [1.0, -74.0],
        bounds: [[-0.7, -76.3], [2.9, -71.3]],
        population: 420000,
        electoralCensus: 300000,
        nbiPercentage: 33.1,
        predominantParty: 'Conservador / Pacto Histórico',
        riskLevel: 'Alto',
        colorCode: '#ea580c',
        region: 'Amazonía'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.8, 2.7], [-72.0, 1.8], [-72.4, -0.5],
            [-75.9, 0.3], [-75.8, 2.7]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'amazonas',
      properties: {
        id: 'amazonas',
        name: 'Amazonas',
        level: 'nacional',
        centroid: [-2.0, -71.5],
        bounds: [[-4.2, -73.6], [0.0, -69.6]],
        population: 80000,
        electoralCensus: 52000,
        nbiPercentage: 42.0,
        predominantParty: 'Liberal / Pacto Histórico',
        riskLevel: 'Medio',
        colorCode: '#059669',
        region: 'Amazonía'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.4, -0.2], [-69.8, -1.2], [-70.0, -4.1],
            [-72.0, -4.0], [-73.4, -0.2]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'guaviare',
      properties: {
        id: 'guaviare',
        name: 'Guaviare',
        level: 'nacional',
        centroid: [2.0, -72.0],
        bounds: [[0.8, -73.6], [3.0, -70.4]],
        population: 90000,
        electoralCensus: 62000,
        nbiPercentage: 36.5,
        predominantParty: 'La U / Cambio Radical',
        riskLevel: 'Alto',
        colorCode: '#ca8a04',
        region: 'Amazonía'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.2, 2.9], [-70.6, 2.8], [-70.8, 1.1],
            [-73.4, 1.2], [-73.2, 2.9]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'guainia',
      properties: {
        id: 'guainia',
        name: 'Guainía',
        level: 'nacional',
        centroid: [2.8, -68.5],
        bounds: [[1.2, -70.5], [4.0, -66.8]],
        population: 52000,
        electoralCensus: 33000,
        nbiPercentage: 49.0,
        predominantParty: 'La U / Liberal',
        riskLevel: 'Medio',
        colorCode: '#0d9488',
        region: 'Amazonía'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-70.3, 3.8], [-67.1, 3.8], [-67.3, 1.5],
            [-70.2, 1.6], [-70.3, 3.8]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'vaupes',
      properties: {
        id: 'vaupes',
        name: 'Vaupés',
        level: 'nacional',
        centroid: [1.0, -70.5],
        bounds: [[-0.1, -72.1], [2.1, -69.1]],
        population: 46000,
        electoralCensus: 26000,
        nbiPercentage: 48.0,
        predominantParty: 'Pacto Histórico / MAIS',
        riskLevel: 'Medio',
        colorCode: '#16a34a',
        region: 'Amazonía'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-71.9, 1.9], [-69.3, 1.8], [-69.5, 0.1],
            [-71.8, 0.2], [-71.9, 1.9]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'vichada',
      properties: {
        id: 'vichada',
        name: 'Vichada',
        level: 'nacional',
        centroid: [4.5, -69.5],
        bounds: [[2.8, -71.4], [6.3, -67.4]],
        population: 115000,
        electoralCensus: 61000,
        nbiPercentage: 44.5,
        predominantParty: 'Liberal / Cambio Radical',
        riskLevel: 'Medio',
        colorCode: '#eab308',
        region: 'Orinoquía'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-71.2, 6.1], [-67.6, 6.0], [-67.8, 3.0],
            [-71.3, 3.1], [-71.2, 6.1]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'san-andres',
      properties: {
        id: 'san-andres',
        name: 'San Andrés y Providencia',
        level: 'nacional',
        centroid: [12.55, -81.7],
        bounds: [[12.4, -81.8], [13.4, -81.3]],
        population: 65000,
        electoralCensus: 52000,
        nbiPercentage: 16.0,
        predominantParty: 'Liberal / Progresistas',
        riskLevel: 'Bajo',
        colorCode: '#38bdf8',
        region: 'Insular'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-81.74, 12.60], [-81.68, 12.60], [-81.68, 12.48],
            [-81.74, 12.48], [-81.74, 12.60]
          ]
        ]
      }
    }
  ]
};

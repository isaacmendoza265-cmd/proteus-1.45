import { TerritoryFeatureCollection } from './types';
import { METROPOLITAN_MUNICIPALITIES_DATA } from '../metropolitanAndMedellinData';

export const VALLE_ABURRA_MUNICIPIOS_GEOJSON: TerritoryFeatureCollection = {
  type: 'FeatureCollection',
  name: 'Área Metropolitana del Valle de Aburrá - 10 Municipios Conurbados',
  level: 'metropolitano',
  center: [6.25, -75.57],
  defaultZoom: 11,
  features: [
    {
      type: 'Feature',
      id: 'barbosa',
      properties: {
        id: 'barbosa',
        name: 'Barbosa',
        level: 'metropolitano',
        subregion: 'Valle de Aburrá Norte',
        centroid: [6.4378, -75.3311],
        bounds: [[6.40, -75.37], [6.48, -75.29]],
        population: METROPOLITAN_MUNICIPALITIES_DATA['barbosa'].population,
        electoralCensus: METROPOLITAN_MUNICIPALITIES_DATA['barbosa'].electoralCensus,
        nbiPercentage: METROPOLITAN_MUNICIPALITIES_DATA['barbosa'].nbiPercentage,
        predominantParty: 'Liberal / Conservador',
        riskLevel: 'Bajo',
        colorCode: '#0284c7'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.365, 6.475], [-75.295, 6.460], [-75.310, 6.405],
            [-75.370, 6.415], [-75.365, 6.475]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'girardota',
      properties: {
        id: 'girardota',
        name: 'Girardota',
        level: 'metropolitano',
        subregion: 'Valle de Aburrá Norte',
        centroid: [6.3764, -75.4464],
        bounds: [[6.35, -75.48], [6.42, -75.37]],
        population: METROPOLITAN_MUNICIPALITIES_DATA['girardota'].population,
        electoralCensus: METROPOLITAN_MUNICIPALITIES_DATA['girardota'].electoralCensus,
        nbiPercentage: METROPOLITAN_MUNICIPALITIES_DATA['girardota'].nbiPercentage,
        predominantParty: 'Conservador / Creemos',
        riskLevel: 'Bajo',
        colorCode: '#0ea5e9'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.475, 6.415], [-75.370, 6.415], [-75.390, 6.355],
            [-75.478, 6.352], [-75.475, 6.415]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'copacabana',
      properties: {
        id: 'copacabana',
        name: 'Copacabana',
        level: 'metropolitano',
        subregion: 'Valle de Aburrá Norte',
        centroid: [6.3475, -75.5089],
        bounds: [[6.32, -75.53], [6.37, -75.47]],
        population: METROPOLITAN_MUNICIPALITIES_DATA['copacabana'].population,
        electoralCensus: METROPOLITAN_MUNICIPALITIES_DATA['copacabana'].electoralCensus,
        nbiPercentage: METROPOLITAN_MUNICIPALITIES_DATA['copacabana'].nbiPercentage,
        predominantParty: 'Centro Democrático / Liberal',
        riskLevel: 'Bajo',
        colorCode: '#38bdf8'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.530, 6.368], [-75.475, 6.365], [-75.485, 6.322],
            [-75.532, 6.325], [-75.530, 6.368]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'bello',
      properties: {
        id: 'bello',
        name: 'Bello',
        level: 'metropolitano',
        subregion: 'Valle de Aburrá Norte',
        centroid: [6.3373, -75.5579],
        bounds: [[6.295, -75.62], [6.375, -75.51]],
        population: METROPOLITAN_MUNICIPALITIES_DATA['bello'].population,
        electoralCensus: METROPOLITAN_MUNICIPALITIES_DATA['bello'].electoralCensus,
        nbiPercentage: METROPOLITAN_MUNICIPALITIES_DATA['bello'].nbiPercentage,
        predominantParty: 'Conservador / Suárez Mira / Creemos',
        riskLevel: 'Medio',
        colorCode: '#f59e0b'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.615, 6.372], [-75.525, 6.365], [-75.520, 6.315],
            [-75.575, 6.300], [-75.618, 6.312], [-75.615, 6.372]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'medellin',
      properties: {
        id: 'medellin',
        name: 'Medellín (Distrito Especial)',
        level: 'metropolitano',
        subregion: 'Valle de Aburrá Centro',
        centroid: [6.2442, -75.5812],
        bounds: [[6.15, -75.72], [6.34, -75.46]],
        population: METROPOLITAN_MUNICIPALITIES_DATA['medellin'].population,
        electoralCensus: METROPOLITAN_MUNICIPALITIES_DATA['medellin'].electoralCensus,
        nbiPercentage: METROPOLITAN_MUNICIPALITIES_DATA['medellin'].nbiPercentage,
        predominantParty: 'Creemos (Fico Gutiérrez)',
        riskLevel: 'Medio',
        colorCode: '#10b981',
        isInteractiveTarget: true // Links to Nivel 4 (Hiperlocal Medellín)
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.715, 6.335], [-75.575, 6.300], [-75.520, 6.315],
            [-75.465, 6.245], [-75.525, 6.185], [-75.575, 6.178],
            [-75.645, 6.170], [-75.710, 6.220], [-75.715, 6.335]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'itagui',
      properties: {
        id: 'itagui',
        name: 'Itagüí',
        level: 'metropolitano',
        subregion: 'Valle de Aburrá Sur',
        centroid: [6.1722, -75.6094],
        bounds: [[6.14, -75.635], [6.195, -75.58]],
        population: METROPOLITAN_MUNICIPALITIES_DATA['itagui'].population,
        electoralCensus: METROPOLITAN_MUNICIPALITIES_DATA['itagui'].electoralCensus,
        nbiPercentage: METROPOLITAN_MUNICIPALITIES_DATA['itagui'].nbiPercentage,
        predominantParty: 'Conservador / Trujillo',
        riskLevel: 'Bajo',
        colorCode: '#6366f1'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.632, 6.192], [-75.585, 6.188], [-75.592, 6.145],
            [-75.635, 6.148], [-75.632, 6.192]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'envigado',
      properties: {
        id: 'envigado',
        name: 'Envigado',
        level: 'metropolitano',
        subregion: 'Valle de Aburrá Sur',
        centroid: [6.1667, -75.5833],
        bounds: [[6.12, -75.60], [6.195, -75.51]],
        population: METROPOLITAN_MUNICIPALITIES_DATA['envigado'].population,
        electoralCensus: METROPOLITAN_MUNICIPALITIES_DATA['envigado'].electoralCensus,
        nbiPercentage: METROPOLITAN_MUNICIPALITIES_DATA['envigado'].nbiPercentage,
        predominantParty: 'Liberal',
        riskLevel: 'Bajo',
        colorCode: '#8b5cf6'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.585, 6.188], [-75.515, 6.180], [-75.535, 6.125],
            [-75.590, 6.130], [-75.585, 6.188]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'sabaneta',
      properties: {
        id: 'sabaneta',
        name: 'Sabaneta',
        level: 'metropolitano',
        subregion: 'Valle de Aburrá Sur',
        centroid: [6.1517, -75.6153],
        bounds: [[6.13, -75.63], [6.165, -75.595]],
        population: METROPOLITAN_MUNICIPALITIES_DATA['sabaneta'].population,
        electoralCensus: METROPOLITAN_MUNICIPALITIES_DATA['sabaneta'].electoralCensus,
        nbiPercentage: METROPOLITAN_MUNICIPALITIES_DATA['sabaneta'].nbiPercentage,
        predominantParty: 'Liberal / Somos Sabaneta',
        riskLevel: 'Bajo',
        colorCode: '#ec4899'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.628, 6.164], [-75.598, 6.162], [-75.602, 6.134],
            [-75.630, 6.136], [-75.628, 6.164]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'la-estrella',
      properties: {
        id: 'la-estrella',
        name: 'La Estrella',
        level: 'metropolitano',
        subregion: 'Valle de Aburrá Sur',
        centroid: [6.1578, -75.6431],
        bounds: [[6.125, -75.67], [6.18, -75.625]],
        population: METROPOLITAN_MUNICIPALITIES_DATA['la-estrella'].population,
        electoralCensus: METROPOLITAN_MUNICIPALITIES_DATA['la-estrella'].electoralCensus,
        nbiPercentage: METROPOLITAN_MUNICIPALITIES_DATA['la-estrella'].nbiPercentage,
        predominantParty: 'Liberal / Conservador',
        riskLevel: 'Bajo',
        colorCode: '#14b8a6'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.668, 6.178], [-75.628, 6.175], [-75.632, 6.132],
            [-75.670, 6.135], [-75.668, 6.178]
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
        level: 'metropolitano',
        subregion: 'Valle de Aburrá Sur',
        centroid: [6.0911, -75.6358],
        bounds: [[6.05, -75.67], [6.13, -75.58]],
        population: METROPOLITAN_MUNICIPALITIES_DATA['caldas'].population,
        electoralCensus: METROPOLITAN_MUNICIPALITIES_DATA['caldas'].electoralCensus,
        nbiPercentage: METROPOLITAN_MUNICIPALITIES_DATA['caldas'].nbiPercentage,
        predominantParty: 'Conservador / Centro Democrático',
        riskLevel: 'Bajo',
        colorCode: '#eab308'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.665, 6.128], [-75.585, 6.125], [-75.590, 6.055],
            [-75.668, 6.058], [-75.665, 6.128]
          ]
        ]
      }
    }
  ]
};

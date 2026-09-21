import { TerritoryFeatureCollection } from './types';

export const MEDELLIN_BARRIOS_GEOJSON: TerritoryFeatureCollection = {
  type: 'FeatureCollection',
  name: 'Nivel 5: Comunas y Barrios del Área Metropolitana (Micro-Territorial)',
  level: 'comunas-barrios',
  center: [6.2442, -75.5812],
  defaultZoom: 13,
  features: [
    // COMUNA 11: LAURELES - ESTADIO
    {
      type: 'Feature',
      id: 'barrio-laureles-central',
      properties: {
        id: 'barrio-laureles-central',
        name: 'Barrio Laureles (Nutibara)',
        comunaId: 'med-c11',
        comunaName: 'Comuna 11 - Laureles-Estadio',
        muniId: 'medellin',
        level: 'comunas-barrios',
        centroid: [6.244, -75.592],
        population: 28450,
        electoralCensus: 26100,
        predominantStratum: 'Estrato 5',
        votingStationsCount: 4,
        winner2023: 'Federico Gutiérrez (Creemos - 82.4%)',
        winner2019: 'Alfredo Ramos (Centro Democrático - 58.2%)',
        colorCode: '#8b5cf6',
        nbiPercentage: 1.8,
        riskLevel: 'Bajo',
        keyLandmark: 'Primer y Segundo Parque de Laureles, Av. Nutibara'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.596, 6.249], [-75.588, 6.248], [-75.589, 6.239],
            [-75.597, 6.240], [-75.596, 6.249]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'barrio-estadio-florencia',
      properties: {
        id: 'barrio-estadio-florencia',
        name: 'Barrio Estadio / Atanasio Girardot',
        comunaId: 'med-c11',
        comunaName: 'Comuna 11 - Laureles-Estadio',
        muniId: 'medellin',
        level: 'comunas-barrios',
        centroid: [6.255, -75.590],
        population: 22150,
        electoralCensus: 20400,
        predominantStratum: 'Estrato 4',
        votingStationsCount: 3,
        winner2023: 'Federico Gutiérrez (Creemos - 79.1%)',
        winner2019: 'Alfredo Ramos (Centro Democrático - 52.6%)',
        colorCode: '#6366f1',
        nbiPercentage: 2.2,
        riskLevel: 'Bajo',
        keyLandmark: 'Complejo Deportivo Atanasio Girardot, Estación Estadio'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.596, 6.260], [-75.584, 6.259], [-75.585, 6.250],
            [-75.597, 6.251], [-75.596, 6.260]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'barrio-suramericana',
      properties: {
        id: 'barrio-suramericana',
        name: 'Barrio Suramericana',
        comunaId: 'med-c11',
        comunaName: 'Comuna 11 - Laureles-Estadio',
        muniId: 'medellin',
        level: 'comunas-barrios',
        centroid: [6.254, -75.580],
        population: 18200,
        electoralCensus: 16900,
        predominantStratum: 'Estrato 4-5',
        votingStationsCount: 2,
        winner2023: 'Federico Gutiérrez (Creemos - 78.5%)',
        winner2019: 'Alfredo Ramos (Centro Democrático - 54.1%)',
        colorCode: '#a855f7',
        nbiPercentage: 1.9,
        riskLevel: 'Bajo',
        keyLandmark: 'Sede Sura, Estación Suramericana, Biblioteca Pública Piloto'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.584, 6.259], [-75.576, 6.258], [-75.577, 6.248],
            [-75.585, 6.250], [-75.584, 6.259]
          ]
        ]
      }
    },

    // COMUNA 14: EL POBLADO
    {
      type: 'Feature',
      id: 'barrio-poblado-milla-oro',
      properties: {
        id: 'barrio-poblado-milla-oro',
        name: 'Barrio Milla de Oro / Castropol',
        comunaId: 'med-c14',
        comunaName: 'Comuna 14 - El Poblado',
        muniId: 'medellin',
        level: 'comunas-barrios',
        centroid: [6.205, -75.572],
        population: 31200,
        electoralCensus: 29800,
        predominantStratum: 'Estrato 6',
        votingStationsCount: 4,
        winner2023: 'Federico Gutiérrez (Creemos - 88.6%)',
        winner2019: 'Alfredo Ramos (Centro Democrático - 74.2%)',
        colorCode: '#ec4899',
        nbiPercentage: 0.9,
        riskLevel: 'Bajo',
        keyLandmark: 'Av. El Poblado, Centro Financiero Milla de Oro, Santa Fe'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.576, 6.218], [-75.565, 6.216], [-75.567, 6.195],
            [-75.578, 6.196], [-75.576, 6.218]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      id: 'barrio-poblado-manila-lleras',
      properties: {
        id: 'barrio-poblado-manila-lleras',
        name: 'Barrio Manila & Parque Lleras',
        comunaId: 'med-c14',
        comunaName: 'Comuna 14 - El Poblado',
        muniId: 'medellin',
        level: 'comunas-barrios',
        centroid: [6.209, -75.568],
        population: 24500,
        electoralCensus: 22900,
        predominantStratum: 'Estrato 5-6',
        votingStationsCount: 3,
        winner2023: 'Federico Gutiérrez (Creemos - 85.2%)',
        winner2019: 'Alfredo Ramos (Centro Democrático - 68.5%)',
        colorCode: '#f43f5e',
        nbiPercentage: 1.2,
        riskLevel: 'Bajo',
        keyLandmark: 'Parque Lleras, Provenza, Calle 10, Manila'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.572, 6.218], [-75.558, 6.217], [-75.560, 6.202],
            [-75.573, 6.204], [-75.572, 6.218]
          ]
        ]
      }
    },

    // COMUNA 10: LA CANDELARIA (CENTRO)
    {
      type: 'Feature',
      id: 'barrio-centro-alpujarra',
      properties: {
        id: 'barrio-centro-alpujarra',
        name: 'Sector La Alpujarra & San Antonio',
        comunaId: 'med-c10',
        comunaName: 'Comuna 10 - La Candelaria',
        muniId: 'medellin',
        level: 'comunas-barrios',
        centroid: [6.245, -75.573],
        population: 26800,
        electoralCensus: 25400,
        predominantStratum: 'Comercial / Mixto (3-4)',
        votingStationsCount: 4,
        winner2023: 'Federico Gutiérrez (Creemos - 71.3%)',
        winner2019: 'Daniel Quintero (Independientes - 42.1%)',
        colorCode: '#38bdf8',
        nbiPercentage: 6.4,
        riskLevel: 'Medio',
        keyLandmark: 'Centro Administrativo La Alpujarra, Plaza Mayor, Estación San Antonio'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.577, 6.252], [-75.567, 6.250], [-75.568, 6.239],
            [-75.578, 6.240], [-75.577, 6.252]
          ]
        ]
      }
    },

    // COMUNA 13: SAN JAVIER
    {
      type: 'Feature',
      id: 'barrio-independencias-escaleras',
      properties: {
        id: 'barrio-independencias-escaleras',
        name: 'Barrio Las Independencias (Escaleras Eléctricas)',
        comunaId: 'med-c13',
        comunaName: 'Comuna 13 - San Javier',
        muniId: 'medellin',
        level: 'comunas-barrios',
        centroid: [6.252, -75.628],
        population: 36400,
        electoralCensus: 25800,
        predominantStratum: 'Estrato 1-2',
        votingStationsCount: 4,
        winner2023: 'Federico Gutiérrez (Creemos - 64.2%)',
        winner2019: 'Daniel Quintero (Independientes - 48.9%)',
        colorCode: '#d946ef',
        nbiPercentage: 16.5,
        riskLevel: 'Medio',
        keyLandmark: 'Escaleras Eléctricas de la 13, Graffitour, Viaducto Metro'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.635, 6.262], [-75.620, 6.260], [-75.622, 6.245],
            [-75.636, 6.247], [-75.635, 6.262]
          ]
        ]
      }
    },

    // COMUNA 1: POPULAR
    {
      type: 'Feature',
      id: 'barrio-santo-domingo-savio',
      properties: {
        id: 'barrio-santo-domingo-savio',
        name: 'Barrio Santo Domingo Savio',
        comunaId: 'med-c1',
        comunaName: 'Comuna 1 - Popular',
        muniId: 'medellin',
        level: 'comunas-barrios',
        centroid: [6.308, -75.542],
        population: 42100,
        electoralCensus: 30800,
        predominantStratum: 'Estrato 1',
        votingStationsCount: 5,
        winner2023: 'Federico Gutiérrez (Creemos - 67.8%)',
        winner2019: 'Daniel Quintero (Independientes - 52.4%)',
        colorCode: '#ef4444',
        nbiPercentage: 22.4,
        riskLevel: 'Medio',
        keyLandmark: 'Estación Santo Domingo Metrocable, Biblioteca España'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.548, 6.318], [-75.535, 6.315], [-75.538, 6.300],
            [-75.550, 6.302], [-75.548, 6.318]
          ]
        ]
      }
    },

    // COMUNA 16: BELÉN
    {
      type: 'Feature',
      id: 'barrio-belen-parque-rosales',
      properties: {
        id: 'barrio-belen-parque-rosales',
        name: 'Barrio Belén Central & Rosales',
        comunaId: 'med-c16',
        comunaName: 'Comuna 16 - Belén',
        muniId: 'medellin',
        level: 'comunas-barrios',
        centroid: [6.228, -75.602],
        population: 38900,
        electoralCensus: 33400,
        predominantStratum: 'Estrato 3-4',
        votingStationsCount: 5,
        winner2023: 'Federico Gutiérrez (Creemos - 76.8%)',
        winner2019: 'Alfredo Ramos (Centro Democrático - 51.2%)',
        colorCode: '#10b981',
        nbiPercentage: 4.8,
        riskLevel: 'Bajo',
        keyLandmark: 'Parque de Belén, UdeM, Centro Comercial Los Molinos'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.612, 6.236], [-75.595, 6.234], [-75.597, 6.218],
            [-75.614, 6.220], [-75.612, 6.236]
          ]
        ]
      }
    },

    // BELLO: NIQUÍA (SECTOR METROPOLITANO)
    {
      type: 'Feature',
      id: 'barrio-bello-niquia',
      properties: {
        id: 'barrio-bello-niquia',
        name: 'Bello - Comuna 8 Niquía',
        comunaId: 'bello-c8',
        comunaName: 'Comuna 8 Niquía',
        muniId: 'bello',
        level: 'comunas-barrios',
        centroid: [6.345, -75.545],
        population: 58900,
        electoralCensus: 42100,
        predominantStratum: 'Estrato 2-3',
        votingStationsCount: 6,
        winner2023: 'Lorena González (Alcaldía Bello - 41.2%)',
        winner2019: 'Óscar Andrés Pérez (Centro Democrático)',
        colorCode: '#f59e0b',
        nbiPercentage: 11.4,
        riskLevel: 'Medio',
        keyLandmark: 'Estación Niquía Metro, Centro Comercial Puerta del Norte'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.558, 6.358], [-75.535, 6.355], [-75.538, 6.338],
            [-75.560, 6.340], [-75.558, 6.358]
          ]
        ]
      }
    },

    // ITAGÜÍ: CENTRO Y DITAIRES
    {
      type: 'Feature',
      id: 'barrio-itagui-ditaires',
      properties: {
        id: 'barrio-itagui-ditaires',
        name: 'Itagüí - Sector Ditaires & Comuna 3',
        comunaId: 'itagui-c3',
        comunaName: 'Comuna 3 Ditaires',
        muniId: 'itagui',
        level: 'comunas-barrios',
        centroid: [6.168, -75.615],
        population: 46200,
        electoralCensus: 37500,
        predominantStratum: 'Estrato 3-4',
        votingStationsCount: 5,
        winner2023: 'Diego Torres (Itagüí Somos Todos - 52.4%)',
        winner2019: 'José Fernando Escobar (Conservador)',
        colorCode: '#6366f1',
        nbiPercentage: 6.9,
        riskLevel: 'Bajo',
        keyLandmark: 'Estadio Ditaires, Parque Ditaires, Complejo Deportivo'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.626, 6.180], [-75.605, 6.178], [-75.608, 6.158],
            [-75.628, 6.160], [-75.626, 6.180]
          ]
        ]
      }
    },

    // ENVIGADO: ZONA 5 ALCALÁ / VIVAL
    {
      type: 'Feature',
      id: 'barrio-envigado-alcala',
      properties: {
        id: 'barrio-envigado-alcala',
        name: 'Envigado - Zona 5 Alcalá & Parque Central',
        comunaId: 'envigado-z5',
        comunaName: 'Zona 5 Alcalá',
        muniId: 'envigado',
        level: 'comunas-barrios',
        centroid: [6.169, -75.588],
        population: 34100,
        electoralCensus: 31200,
        predominantStratum: 'Estrato 3-4',
        votingStationsCount: 4,
        winner2023: 'Raúl Cardona (Liberal - 56.8%)',
        winner2019: 'Braulio Espinosa (Liberal)',
        colorCode: '#8b5cf6',
        nbiPercentage: 3.5,
        riskLevel: 'Bajo',
        keyLandmark: 'Parque Marceliano Vélez, Estación Envigado, Iglesia Santa Gertrudis'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-75.594, 6.178], [-75.578, 6.176], [-75.580, 6.159],
            [-75.596, 6.160], [-75.594, 6.178]
          ]
        ]
      }
    }
  ]
};

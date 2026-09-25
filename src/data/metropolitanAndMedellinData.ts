/**
 * Datos Electorales y Demográficos Consolidados:
 * - Área Metropolitana del Valle de Aburrá (10 Municipios)
 * - Distrito de Medellín (16 Comunas Urbanas y 5 Corregimientos)
 */

import {
  getMunicipalCensus,
  getMedellinComunaCensus,
  getMedellinCorregimientoCensus,
  type CensusFigures,
} from '../services/electoralCensusService';
import { getDaneMunicipio } from '../services/daneMunicipalService';

export interface ComunaElectoralProfile {
  id: string;
  number: number;
  name: string;
  zone: 'Urbana' | 'Rural';
  population: number;
  electoralCensus: number;
  /** 'oficial' = Registraduría (corte 30-abr-2026); 'estimado' = sin dato oficial */
  electoralCensusSource?: 'oficial' | 'estimado';
  votingStations: number;
  votingTables: number;
  predominantStratum: string;
  strataDistribution: {
    bajo: number;   // Estratos 1-2 (%)
    medio: number;  // Estratos 3-4 (%)
    alto: number;   // Estratos 5-6 (%)
  };
  youthPercentage: number;      // 18-28 años (%)
  historicalTurnout: number;    // Participación promedio (%)
  abstentionRate: number;       // Abstención promedio (%)
  historicalMayorResults2023: {
    winnerCandidate: string;
    winnerParty: string;
    winnerVotes: number;
    winnerPercentage: number;
    secondPlaceCandidate: string;
    secondPlaceVotes: number;
    blankVotes: number;
    nullVotes: number;
  };
  keyDynamics: string;
  barriosList: string[];
}

export interface MetroMunicipalityProfile {
  id: string;
  name: string;
  subregion: 'Valle de Aburrá Norte' | 'Valle de Aburrá Centro' | 'Valle de Aburrá Sur';
  population: number;
  electoralCensus: number;
  /** 'oficial' = Registraduría (corte 30-abr-2026); 'estimado' = sin dato oficial */
  electoralCensusSource?: 'oficial' | 'estimado';
  votingStations: number;
  votingTables: number;
  urbanDivisionsCount: number;
  ruralDivisionsCount: number;
  predominantEconomicActivity: string;
  nbiPercentage: number;
  coordinates: [number, number]; // [lat, lng]
  historicalMayorResults2023: {
    winnerParty: string;
    winnerCandidate: string;
    totalVotes: number;
    abstentionRate: number;
  };
  communesOrZonesSummary: string[];
}

// 1. LOS 10 MUNICIPIOS DEL ÁREA METROPOLITANA DEL VALLE DE ABURRÁ
export const METROPOLITAN_MUNICIPALITIES_DATA: Record<string, MetroMunicipalityProfile> = {
  'medellin': {
    id: 'medellin',
    name: 'Medellín',
    subregion: 'Valle de Aburrá Centro',
    population: 2612958,
    electoralCensus: 1845230,
    votingStations: 239,
    votingTables: 4890,
    urbanDivisionsCount: 16,
    ruralDivisionsCount: 5,
    predominantEconomicActivity: 'Servicios, Tecnología, Comercio, Moda e Industria',
    nbiPercentage: 8.8,
    coordinates: [6.2442, -75.5812],
    historicalMayorResults2023: {
      winnerParty: 'Creemos',
      winnerCandidate: 'Federico Gutiérrez',
      totalVotes: 689519,
      abstentionRate: 46.8
    },
    communesOrZonesSummary: [
      'Popular', 'Santa Cruz', 'Manrique', 'Aranjuez', 'Castilla', 'Doce de Octubre',
      'Robledo', 'Villa Hermosa', 'Buenos Aires', 'La Candelaria', 'Laureles-Estadio',
      'La América', 'San Javier', 'El Poblado', 'Guayabal', 'Belén',
      'Palmitas', 'San Cristóbal', 'Altavista', 'San Antonio de Prado', 'Santa Elena'
    ]
  },
  'bello': {
    id: 'bello',
    name: 'Bello',
    subregion: 'Valle de Aburrá Norte',
    population: 560412,
    electoralCensus: 378410,
    votingStations: 42,
    votingTables: 940,
    urbanDivisionsCount: 10,
    ruralDivisionsCount: 1,
    predominantEconomicActivity: 'Manufactura textil, Comercio metropolitano y Construcción',
    nbiPercentage: 11.2,
    coordinates: [6.3333, -75.5583],
    historicalMayorResults2023: {
      winnerParty: 'Coalición Bello Nos Une',
      winnerCandidate: 'Lorena González',
      totalVotes: 66345,
      abstentionRate: 53.4
    },
    communesOrZonesSummary: ['París', 'La Madera', 'Santa Ana', 'Suárez', 'La Cumbre', 'Bellavista', 'Altos de Niquía', 'Niquía', 'Fontidueño', 'Acevedo', 'San Félix']
  },
  'itagui': {
    id: 'itagui',
    name: 'Itagüí',
    subregion: 'Valle de Aburrá Sur',
    population: 298450,
    electoralCensus: 234120,
    votingStations: 31,
    votingTables: 610,
    urbanDivisionsCount: 6,
    ruralDivisionsCount: 1,
    predominantEconomicActivity: 'Industria pesada, Almacenamiento logístico y Comercio mayorista',
    nbiPercentage: 7.9,
    coordinates: [6.1725, -75.6097],
    historicalMayorResults2023: {
      winnerParty: 'Itagüí Somos Todos',
      winnerCandidate: 'Diego Torres',
      totalVotes: 58210,
      abstentionRate: 48.2
    },
    communesOrZonesSummary: ['Comuna 1', 'Comuna 2', 'Comuna 3', 'Comuna 4', 'Comuna 5', 'Comuna 6', 'El Manzanillo']
  },
  'envigado': {
    id: 'envigado',
    name: 'Envigado',
    subregion: 'Valle de Aburrá Sur',
    population: 249810,
    electoralCensus: 215430,
    votingStations: 26,
    votingTables: 560,
    urbanDivisionsCount: 12,
    ruralDivisionsCount: 1,
    predominantEconomicActivity: 'Servicios corporativos, Salud, Gastronomía y Residencial premium',
    nbiPercentage: 4.1,
    coordinates: [6.1667, -75.5833],
    historicalMayorResults2023: {
      winnerParty: 'Partido Liberal / Coalición',
      winnerCandidate: 'Raúl Cardona',
      totalVotes: 62410,
      abstentionRate: 44.1
    },
    communesOrZonesSummary: ['Zona 1 Centro', 'Zona 2 Mesa', 'Zona 3 San Rafael', 'Zona 4 Dorado', 'Zona 5 Alcalá', 'Zona 6 Señorial', 'Zona 7 Bucarest', 'Zona 8 Esmeraldal', 'Zona 9 Zuñiga', 'Las Palmas']
  },
  'caldas': {
    id: 'caldas',
    name: 'Caldas',
    subregion: 'Valle de Aburrá Sur',
    population: 86410,
    electoralCensus: 68910,
    votingStations: 12,
    votingTables: 175,
    urbanDivisionsCount: 4,
    ruralDivisionsCount: 1,
    predominantEconomicActivity: 'Industria cerámica, Manufactura y Puerta sur al Suroeste',
    nbiPercentage: 12.4,
    coordinates: [6.0911, -75.6358],
    historicalMayorResults2023: {
      winnerParty: 'Caldas Con Todos',
      winnerCandidate: 'Jorge Mario Rendón',
      totalVotes: 18450,
      abstentionRate: 51.3
    },
    communesOrZonesSummary: ['Zona Centro', 'Zona Norte', 'Zona Sur', 'Veredas del Sur']
  },
  'la_estrella': {
    id: 'la_estrella',
    name: 'La Estrella',
    subregion: 'Valle de Aburrá Sur',
    population: 78910,
    electoralCensus: 62340,
    votingStations: 9,
    votingTables: 155,
    urbanDivisionsCount: 3,
    ruralDivisionsCount: 1,
    predominantEconomicActivity: 'Expansión residencial, Logística de transporte y Turismo ecológico',
    nbiPercentage: 8.9,
    coordinates: [6.1583, -75.6431],
    historicalMayorResults2023: {
      winnerParty: 'Fuerza Ciudadana / Verde',
      winnerCandidate: 'Carlos Mario Morales',
      totalVotes: 19820,
      abstentionRate: 47.9
    },
    communesOrZonesSummary: ['Cabecera Urbana', 'Tablacito', 'La Ferrería', 'La Inmaculada']
  },
  'sabaneta': {
    id: 'sabaneta',
    name: 'Sabaneta',
    subregion: 'Valle de Aburrá Sur',
    population: 92450,
    electoralCensus: 84120,
    votingStations: 11,
    votingTables: 215,
    urbanDivisionsCount: 6,
    ruralDivisionsCount: 1,
    predominantEconomicActivity: 'Servicios gastronómicos, Construcción vertical en altura y Comercio',
    nbiPercentage: 4.8,
    coordinates: [6.1500, -75.6167],
    historicalMayorResults2023: {
      winnerParty: 'Partido Conservador / Coalición',
      winnerCandidate: 'Alder Cruz',
      totalVotes: 26430,
      abstentionRate: 41.5
    },
    communesOrZonesSummary: ['Calle Larga', 'Prados de Sabaneta', 'Betania', 'Aliadas', 'La Doctora', 'Pan de Azúcar']
  },
  'copacabana': {
    id: 'copacabana',
    name: 'Copacabana',
    subregion: 'Valle de Aburrá Norte',
    population: 82340,
    electoralCensus: 65420,
    votingStations: 10,
    votingTables: 165,
    urbanDivisionsCount: 4,
    ruralDivisionsCount: 1,
    predominantEconomicActivity: 'Metalmecánica, Turismo campestre de fincas y Conexión nordeste',
    nbiPercentage: 9.8,
    coordinates: [6.3467, -75.5089],
    historicalMayorResults2023: {
      winnerParty: 'Coalición Copacabana Avanza',
      winnerCandidate: 'Johnfredy Quintero',
      totalVotes: 17230,
      abstentionRate: 49.6
    },
    communesOrZonesSummary: ['Zona Urbana Central', 'Machado', 'El Porvenir', 'Veredas Orientales']
  },
  'girardota': {
    id: 'girardota',
    name: 'Girardota',
    subregion: 'Valle de Aburrá Norte',
    population: 62410,
    electoralCensus: 48930,
    votingStations: 8,
    votingTables: 120,
    urbanDivisionsCount: 3,
    ruralDivisionsCount: 1,
    predominantEconomicActivity: 'Industria química y papelera, Turismo religioso del Señor Caído',
    nbiPercentage: 11.6,
    coordinates: [6.3750, -75.4472],
    historicalMayorResults2023: {
      winnerParty: 'Girardota Unida',
      winnerCandidate: 'Kevin Bernal',
      totalVotes: 13910,
      abstentionRate: 50.8
    },
    communesOrZonesSummary: ['Cabecera Municipal', 'El Barro', 'San Andrés', 'Zona Industrial']
  },
  'barbosa': {
    id: 'barbosa',
    name: 'Barbosa',
    subregion: 'Valle de Aburrá Norte',
    population: 58910,
    electoralCensus: 42150,
    votingStations: 7,
    votingTables: 105,
    urbanDivisionsCount: 3,
    ruralDivisionsCount: 1,
    predominantEconomicActivity: 'Agroindustria panelera, Parques recreativos y Puerta norte',
    nbiPercentage: 13.9,
    coordinates: [6.4383, -75.3317],
    historicalMayorResults2023: {
      winnerParty: 'Coalición Por Barbosa',
      winnerCandidate: 'Víctor Camacho',
      totalVotes: 12450,
      abstentionRate: 52.1
    },
    communesOrZonesSummary: ['Cabecera Urbana', 'El Hatillo', 'Popalito', 'Veredas Altas']
  }
};

// 2. LAS 16 COMUNAS Y 5 CORREGIMIENTOS DE MEDELLÍN
export const MEDELLIN_COMUNAS_DATA: Record<string, ComunaElectoralProfile> = {
  'med-c1': {
    id: 'med-c1',
    number: 1,
    name: 'Popular',
    zone: 'Urbana',
    population: 134510,
    electoralCensus: 98450,
    votingStations: 14,
    votingTables: 245,
    predominantStratum: 'Bajo (1-2)',
    strataDistribution: { bajo: 96.4, medio: 3.6, alto: 0.0 },
    youthPercentage: 27.8,
    historicalTurnout: 46.2,
    abstentionRate: 53.8,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 32140,
      winnerPercentage: 68.4,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 9810,
      blankVotes: 2410,
      nullVotes: 1250
    },
    keyDynamics: 'Fuerte demanda de empleo juvenil, consolidación de espacio público y control de seguridad en corredores barriales.',
    barriosList: ['Popular No. 1', 'Popular No. 2', 'Santo Domingo Savio No. 1', 'Santo Domingo Savio No. 2', 'Granizal', 'Moscú No. 2', 'Villa Guadalupe', 'San Pablo', 'Aldea Pablo VI', 'La Esperanza No. 2']
  },
  'med-c2': {
    id: 'med-c2',
    number: 2,
    name: 'Santa Cruz',
    zone: 'Urbana',
    population: 114210,
    electoralCensus: 84310,
    votingStations: 12,
    votingTables: 210,
    predominantStratum: 'Bajo (1-2)',
    strataDistribution: { bajo: 94.2, medio: 5.8, alto: 0.0 },
    youthPercentage: 26.5,
    historicalTurnout: 48.1,
    abstentionRate: 51.9,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 27850,
      winnerPercentage: 66.8,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 8910,
      blankVotes: 2120,
      nullVotes: 1040
    },
    keyDynamics: 'Sector ribereño del Río Medellín, alta actividad comercial minorista y tejido asociativo barrial de larga data.',
    barriosList: ['La Isla', 'El Playón de Los Comuneros', 'Pablo VI', 'La Frontera', 'La Francia', 'Andalucía', 'Villa del Socorro', 'Villa Niza', 'Moscú No. 1', 'Santa Cruz']
  },
  'med-c3': {
    id: 'med-c3',
    number: 3,
    name: 'Manrique',
    zone: 'Urbana',
    population: 162450,
    electoralCensus: 122410,
    votingStations: 16,
    votingTables: 310,
    predominantStratum: 'Bajo-Medio (1-3)',
    strataDistribution: { bajo: 84.1, medio: 15.9, alto: 0.0 },
    youthPercentage: 25.4,
    historicalTurnout: 50.4,
    abstentionRate: 49.6,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 41250,
      winnerPercentage: 67.2,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 13210,
      blankVotes: 3410,
      nullVotes: 1610
    },
    keyDynamics: 'Eje cultural tanguero sobre la Carrera 45 (Metroplús), demandas de mejoramiento integral barrial y movilidad en laderas.',
    barriosList: ['La Salle', 'Las Granjas', 'Campo Valdés No. 2', 'Santa Inés', 'El Raizal', 'El Pomar', 'Manrique Central No. 2', 'Manrique Oriental', 'Versalles No. 1', 'Versalles No. 2', 'La Cruz', 'Oriente']
  },
  'med-c4': {
    id: 'med-c4',
    number: 4,
    name: 'Aranjuez',
    zone: 'Urbana',
    population: 165810,
    electoralCensus: 129450,
    votingStations: 17,
    votingTables: 325,
    predominantStratum: 'Medio-Bajo (2-3)',
    strataDistribution: { bajo: 62.5, medio: 37.5, alto: 0.0 },
    youthPercentage: 24.8,
    historicalTurnout: 52.3,
    abstentionRate: 47.7,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 48910,
      winnerPercentage: 71.4,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 11450,
      blankVotes: 3820,
      nullVotes: 1450
    },
    keyDynamics: 'Tradicional epicentro educativo e investigativo (Parque Explora, Jardín Botánico, Ruta N), gran peso cívico de opinión.',
    barriosList: ['Berlín', 'San Isidro', 'Palermo', 'Bermejal-Los Álamos', 'Moravia', 'Sevilla', 'San Pedro', 'Manrique Central No. 1', 'Campo Valdés No. 1', 'Las Esmeraldas', 'Aranjuez', 'Brasilia', 'Miranda']
  },
  'med-c5': {
    id: 'med-c5',
    number: 5,
    name: 'Castilla',
    zone: 'Urbana',
    population: 152140,
    electoralCensus: 124810,
    votingStations: 15,
    votingTables: 312,
    predominantStratum: 'Medio-Bajo (2-3)',
    strataDistribution: { bajo: 58.2, medio: 41.8, alto: 0.0 },
    youthPercentage: 25.1,
    historicalTurnout: 53.6,
    abstentionRate: 46.4,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 47210,
      winnerPercentage: 70.8,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 12150,
      blankVotes: 3650,
      nullVotes: 1510
    },
    keyDynamics: 'Comuna con gran vocación cívica, deportiva (Unidad Deportiva José René Higuita) y comercial estructurada sobre el corredor de la 68.',
    barriosList: ['Toscana', 'Las Brisas', 'Florencia', 'Tejelo', 'Boyacá', 'Belalcázar', 'Héctor Abad Gómez', 'Castilla', 'Francisco Antonio Zea', 'Alfonso López', 'Caribe']
  },
  'med-c6': {
    id: 'med-c6',
    number: 6,
    name: 'Doce de Octubre',
    zone: 'Urbana',
    population: 194510,
    electoralCensus: 145230,
    votingStations: 18,
    votingTables: 365,
    predominantStratum: 'Bajo-Medio (1-3)',
    strataDistribution: { bajo: 78.4, medio: 21.6, alto: 0.0 },
    youthPercentage: 26.2,
    historicalTurnout: 51.1,
    abstentionRate: 48.9,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 51240,
      winnerPercentage: 68.9,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 14210,
      blankVotes: 4120,
      nullVotes: 1840
    },
    keyDynamics: 'La comuna más densamente poblada del noroccidente; clave en votaciones legislativas por volumen absoluto de sufragantes.',
    barriosList: ['Santander', 'Doce de Octubre No. 1', 'Doce de Octubre No. 2', 'Progreso No. 2', 'El Triunfo', 'Mirador del Doce', 'Picachito', 'Picacho', 'San Martín de Porres', 'Kennedy', 'Jorge Eliécer Gaitán']
  },
  'med-c7': {
    id: 'med-c7',
    number: 7,
    name: 'Robledo',
    zone: 'Urbana',
    population: 178940,
    electoralCensus: 138420,
    votingStations: 18,
    votingTables: 345,
    predominantStratum: 'Medio-Bajo (2-4)',
    strataDistribution: { bajo: 48.5, medio: 49.2, alto: 2.3 },
    youthPercentage: 28.4,
    historicalTurnout: 54.2,
    abstentionRate: 45.8,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 54120,
      winnerPercentage: 72.1,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 13410,
      blankVotes: 4210,
      nullVotes: 1620
    },
    keyDynamics: 'Ciudadela universitaria del noroccidente (U. de A., Pascual Bravo, ITM, Colegio Mayor), alta proporción de voto joven estudiantil.',
    barriosList: ['Cerro El Volador', 'San Germán', 'Facultad de Minas', 'La Pilarica', 'Bosques de San Pablo', 'Altamira', 'Córdoba', 'López de Mesa', 'El Diamante', 'Aures No. 1', 'Aures No. 2', 'Bello Horizonte', 'Villa Flora', 'Palenque', 'Robledo', 'Cucaracho', 'Fuente Clara', 'Santa Margarita', 'Olaya Herrera', 'Pajarito']
  },
  'med-c8': {
    id: 'med-c8',
    number: 8,
    name: 'Villa Hermosa',
    zone: 'Urbana',
    population: 141250,
    electoralCensus: 108450,
    votingStations: 14,
    votingTables: 270,
    predominantStratum: 'Medio-Bajo (2-3)',
    strataDistribution: { bajo: 64.8, medio: 35.2, alto: 0.0 },
    youthPercentage: 24.9,
    historicalTurnout: 51.8,
    abstentionRate: 48.2,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 39850,
      winnerPercentage: 71.0,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 10420,
      blankVotes: 3120,
      nullVotes: 1310
    },
    keyDynamics: 'Zona de transición oriental con miradores metropolitanos (Pan de Azúcar), demandas de contención de riesgo en laderas.',
    barriosList: ['Villa Hermosa', 'La Mansión', 'San Miguel', 'La Ladera', 'Batallón Girardot', 'Llanaditas', 'Los Ángeles', 'Sucre', 'El Fanal', 'Sol de Oriente', 'Trece de Julio', 'Enciso', 'La Libertad', 'Treinta y Ocho']
  },
  'med-c9': {
    id: 'med-c9',
    number: 9,
    name: 'Buenos Aires',
    zone: 'Urbana',
    population: 143890,
    electoralCensus: 116230,
    votingStations: 15,
    votingTables: 290,
    predominantStratum: 'Medio (3)',
    strataDistribution: { bajo: 38.6, medio: 61.4, alto: 0.0 },
    youthPercentage: 24.2,
    historicalTurnout: 55.1,
    abstentionRate: 44.9,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 46810,
      winnerPercentage: 73.2,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 10890,
      blankVotes: 3610,
      nullVotes: 1410
    },
    keyDynamics: 'Articulada por el Tranvía de Ayacucho, clase media tradicional, intensa vida de barrio y comercio de proximidad.',
    barriosList: ['Juan Pablo II', 'Barrios de Jesús', 'Ocho de Marzo', 'Los Cerros El Vergel', 'Alejandro Echavarría', 'Miraflores', 'Buenos Aires', 'Caicedo', 'El Salvador', 'Asomadera No. 1', 'Asomadera No. 2', 'Loreto']
  },
  'med-c10': {
    id: 'med-c10',
    number: 10,
    name: 'La Candelaria (Centro)',
    zone: 'Urbana',
    population: 86450,
    electoralCensus: 114120,
    votingStations: 16,
    votingTables: 285,
    predominantStratum: 'Medio-Comercial (3-4)',
    strataDistribution: { bajo: 28.4, medio: 68.2, alto: 3.4 },
    youthPercentage: 23.5,
    historicalTurnout: 53.9,
    abstentionRate: 46.1,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 44210,
      winnerPercentage: 72.0,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 10920,
      blankVotes: 3410,
      nullVotes: 1350
    },
    keyDynamics: 'Corazón institucional, financiero y patrimonial; población flotante de más de 1.2 millones de personas al día.',
    barriosList: ['Prado', 'Jesús Nazareno', 'El Chagualo', 'Estación Villa', 'San Benito', 'Guayaquil', 'Corazón de Jesús', 'Calle Nueva', 'La Candelaria', 'Boston', 'Los Ángeles', 'Villa Nueva', 'Las Palmas', 'Bomboná No. 1', 'Colón']
  },
  'med-c11': {
    id: 'med-c11',
    number: 11,
    name: 'Laureles-Estadio',
    zone: 'Urbana',
    population: 124850,
    electoralCensus: 118450,
    votingStations: 18,
    votingTables: 295,
    predominantStratum: 'Medio-Alto (4-5)',
    strataDistribution: { bajo: 1.2, medio: 72.4, alto: 26.4 },
    youthPercentage: 22.8,
    historicalTurnout: 62.4,
    abstentionRate: 37.6,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 61450,
      winnerPercentage: 83.1,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 6810,
      blankVotes: 3210,
      nullVotes: 1120
    },
    keyDynamics: 'Bastión histórico de voto de opinión calificado, polo gastronómico, turístico, deportivo (Atanasio Girardot) y empresarial.',
    barriosList: ['Carlos E. Restrepo', 'Suramericana', 'Naranjal', 'San Joaquín', 'Los Conquistadores', 'Bolivariana', 'Laureles', 'Las Acacias', 'La Castellana', 'Lorena', 'El Velódromo', 'Estadio', 'Los Colores', 'Cuarta Brigada', 'Florida Nueva']
  },
  'med-c12': {
    id: 'med-c12',
    number: 12,
    name: 'La América',
    zone: 'Urbana',
    population: 98450,
    electoralCensus: 89410,
    votingStations: 12,
    votingTables: 220,
    predominantStratum: 'Medio (3-4)',
    strataDistribution: { bajo: 8.5, medio: 88.2, alto: 3.3 },
    youthPercentage: 23.1,
    historicalTurnout: 58.7,
    abstentionRate: 41.3,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 40920,
      winnerPercentage: 77.9,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 6940,
      blankVotes: 2850,
      nullVotes: 980
    },
    keyDynamics: 'Sector residencial tradicional de clase media consolidada, alta participación cívica e interés en seguridad y movilidad vial.',
    barriosList: ['Ferrini', 'Calasanz', 'Los Pinos', 'La América', 'La Floresta', 'Santa Lucía', 'El Danubio', 'Campo Alegre', 'Santa Mónica', 'Barrio Cristóbal', 'Simón Bolívar', 'Santa Teresita', 'Calasanz Parte Alta']
  },
  'med-c13': {
    id: 'med-c13',
    number: 13,
    name: 'San Javier',
    zone: 'Urbana',
    population: 138940,
    electoralCensus: 104510,
    votingStations: 15,
    votingTables: 260,
    predominantStratum: 'Bajo-Medio (1-3)',
    strataDistribution: { bajo: 82.4, medio: 17.6, alto: 0.0 },
    youthPercentage: 27.2,
    historicalTurnout: 49.5,
    abstentionRate: 50.5,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 34510,
      winnerPercentage: 66.8,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 11840,
      blankVotes: 2940,
      nullVotes: 1250
    },
    keyDynamics: 'Símbolo internacional de resiliencia y turismo urbano (Escaleras Eléctricas, Graffitour), fuerte movimiento artístico juvenil.',
    barriosList: ['El Pesebre', 'Blanquizal', 'Santa Rosa de Lima', 'Los Alcázares', 'Metropolitano', 'La Pradera', 'Juan XXIII', 'La Divisa', 'San Javier No. 1', 'San Javier No. 2', 'El Salado', 'Nuevos Conquistadores', 'Las Independencias', 'Eduardo Santos', 'Peñitas', 'Antonio Nariño', 'El Socorro', 'Betania', 'Corazón']
  },
  'med-c14': {
    id: 'med-c14',
    number: 14,
    name: 'El Poblado',
    zone: 'Urbana',
    population: 134210,
    electoralCensus: 128450,
    votingStations: 19,
    votingTables: 320,
    predominantStratum: 'Alto (5-6)',
    strataDistribution: { bajo: 0.2, medio: 8.4, alto: 91.4 },
    youthPercentage: 21.4,
    historicalTurnout: 66.8,
    abstentionRate: 33.2,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 73840,
      winnerPercentage: 86.2,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 5120,
      blankVotes: 3840,
      nullVotes: 950
    },
    keyDynamics: 'Mayor capacidad económica y fiscal de la ciudad; votación marcadamente conservadora, empresarial y de centroderecha.',
    barriosList: ['Castropol', 'Barrio Colombia', 'Villa Carlota', 'Lalinde', 'Las Lomas No. 1', 'Las Lomas No. 2', 'Altos del Poblado', 'El Tesoro', 'Los Naranjos', 'Los Balsos No. 1', 'Los Balsos No. 2', 'San Lucas', 'El Diamante No. 2', 'El Castillo', 'Alejandría', 'La Florida', 'Poblado Centro', 'Manila', 'Astorga', 'Patio Bonito', 'La Aguacatala', 'Santa María de los Ángeles']
  },
  'med-c15': {
    id: 'med-c15',
    number: 15,
    name: 'Guayabal',
    zone: 'Urbana',
    population: 99450,
    electoralCensus: 88410,
    votingStations: 12,
    votingTables: 218,
    predominantStratum: 'Medio (3-4)',
    strataDistribution: { bajo: 18.2, medio: 78.4, alto: 3.4 },
    youthPercentage: 23.6,
    historicalTurnout: 56.4,
    abstentionRate: 43.6,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 38120,
      winnerPercentage: 76.5,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 6840,
      blankVotes: 2940,
      nullVotes: 1040
    },
    keyDynamics: 'Corredor industrial y logístico de la Avenida Guayabal, aeropuerto Olaya Herrera y Parque Comfenalco Guayabal.',
    barriosList: ['Tenche', 'Trinidad', 'Santa Fe', 'Campo Amor', 'Cristo Rey', 'Guayabal', 'La Colina', 'El Rodeo']
  },
  'med-c16': {
    id: 'med-c16',
    number: 16,
    name: 'Belén',
    zone: 'Urbana',
    population: 198450,
    electoralCensus: 168420,
    votingStations: 22,
    votingTables: 420,
    predominantStratum: 'Medio (3-5)',
    strataDistribution: { bajo: 12.4, medio: 74.8, alto: 12.8 },
    youthPercentage: 24.1,
    historicalTurnout: 59.8,
    abstentionRate: 40.2,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 78910,
      winnerPercentage: 78.3,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 12450,
      blankVotes: 5120,
      nullVotes: 1840
    },
    keyDynamics: 'La comuna más poblada y extensa del sur-occidente; decisiva en cualquier elección municipal por su gigantesco caudal electoral.',
    barriosList: ['Fátima', 'Rosales', 'Belén Centro', 'Granada', 'San Bernardo', 'Las Playas', 'Diego Echavarría', 'La Mota', 'La Hondonada', 'El Rincón', 'La Colina', 'La Gloria', 'Loma de Los Bernal', 'Las Mercedes', 'Los Alpes', 'La Palma', 'Las Violetas', 'Las Juntas', 'El Nogal-Los Almendros', 'Cerro Nutibara']
  },

  // CORREGIMIENTOS DE MEDELLÍN
  'med-correg-san-antonio': {
    id: 'med-correg-san-antonio',
    number: 80,
    name: 'San Antonio de Prado',
    zone: 'Rural',
    population: 154210,
    electoralCensus: 92450,
    votingStations: 12,
    votingTables: 230,
    predominantStratum: 'Medio-Bajo (2-3)',
    strataDistribution: { bajo: 54.2, medio: 45.8, alto: 0.0 },
    youthPercentage: 26.8,
    historicalTurnout: 50.8,
    abstentionRate: 49.2,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 31450,
      winnerPercentage: 67.0,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 9840,
      blankVotes: 3410,
      nullVotes: 1240
    },
    keyDynamics: 'El corregimiento más poblado de Colombia; masiva expansión de vivienda multifamiliar y fuertes cuellos de botella en movilidad vial.',
    barriosList: ['Cabecera San Antonio', 'El Salado', 'La Verde', 'Montañita', 'Potrerito', 'San José', 'Yarumalito']
  },
  'med-correg-san-cristobal': {
    id: 'med-correg-san-cristobal',
    number: 60,
    name: 'San Cristóbal',
    zone: 'Rural',
    population: 112450,
    electoralCensus: 68910,
    votingStations: 10,
    votingTables: 172,
    predominantStratum: 'Bajo-Medio (1-3)',
    strataDistribution: { bajo: 68.4, medio: 31.6, alto: 0.0 },
    youthPercentage: 25.9,
    historicalTurnout: 48.9,
    abstentionRate: 51.1,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 23140,
      winnerPercentage: 68.6,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 6940,
      blankVotes: 2140,
      nullVotes: 950
    },
    keyDynamics: 'Tradición floricultora y hortícola en transición hacia macroproyectos habitacionales como Pajarito.',
    barriosList: ['Cabecera San Cristóbal', 'La Loma', 'El Llano', 'Travesías', 'Boquerón', 'San José de la Montaña', 'La Palma']
  },
  'med-correg-santa-elena': {
    id: 'med-correg-santa-elena',
    number: 90,
    name: 'Santa Elena',
    zone: 'Rural',
    population: 26450,
    electoralCensus: 18920,
    votingStations: 5,
    votingTables: 48,
    predominantStratum: 'Mixto (2-5)',
    strataDistribution: { bajo: 28.5, medio: 54.2, alto: 17.3 },
    youthPercentage: 22.4,
    historicalTurnout: 58.2,
    abstentionRate: 41.8,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 8120,
      winnerPercentage: 73.8,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 1650,
      blankVotes: 740,
      nullVotes: 210
    },
    keyDynamics: 'Cuna de la tradición Silletera (Patrimonio Inmaterial), turismo ecológico (Parque Arví) y población neo-rural de clase media-alta.',
    barriosList: ['Central Santa Elena', 'El Placer', 'Mazo', 'Piedras Blancas', 'Piedra Sacra', 'El Plan', 'Barro Blanco', 'El Tambo']
  },
  'med-correg-altavista': {
    id: 'med-correg-altavista',
    number: 70,
    name: 'Altavista',
    zone: 'Rural',
    population: 41250,
    electoralCensus: 24510,
    votingStations: 6,
    votingTables: 62,
    predominantStratum: 'Bajo (1-2)',
    strataDistribution: { bajo: 91.2, medio: 8.8, alto: 0.0 },
    youthPercentage: 27.1,
    historicalTurnout: 47.3,
    abstentionRate: 52.7,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 7850,
      winnerPercentage: 67.7,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 2450,
      blankVotes: 810,
      nullVotes: 320
    },
    keyDynamics: 'Zona de ladrilleras y explotación minera artesanal, asentamientos informales y proyectos de agua potable veredal.',
    barriosList: ['Altavista Central', 'Buga', 'San José del Manzanillo', 'El Jardín', 'San Pablo', 'Aguas Frías']
  },
  'med-correg-palmitas': {
    id: 'med-correg-palmitas',
    number: 50,
    name: 'San Sebastián de Palmitas',
    zone: 'Rural',
    population: 9450,
    electoralCensus: 6230,
    votingStations: 3,
    votingTables: 16,
    predominantStratum: 'Bajo (1-2)',
    strataDistribution: { bajo: 94.8, medio: 5.2, alto: 0.0 },
    youthPercentage: 23.8,
    historicalTurnout: 53.4,
    abstentionRate: 46.6,
    historicalMayorResults2023: {
      winnerCandidate: 'Federico Gutiérrez',
      winnerParty: 'Creemos',
      winnerVotes: 2410,
      winnerPercentage: 72.5,
      secondPlaceCandidate: 'Juan Carlos Upegui',
      secondPlaceVotes: 580,
      blankVotes: 210,
      nullVotes: 80
    },
    keyDynamics: 'El corregimiento más rural y agrícola de Medellín (café, plátano, caña); enlace con el Occidente antioqueño a través del Túnel de Occidente.',
    barriosList: ['Palmitas Central', 'La Suiza', 'La Aldea', 'La Sucia', 'Potrera Miserenga', 'La Frisola']
  }
};

// 3. CENSO OFICIAL (Registraduría, corte 30-abr-2026): reemplaza las cifras escritas a mano.
// Puestos y mesas también salen del censo. Altavista y Palmitas quedan con su cifra previa
// marcada como 'estimado' porque comparten puestos de la zona 99 que aún no se separan.
const applyCensus = (
  rec: { electoralCensus: number; votingStations: number; votingTables: number; electoralCensusSource?: 'oficial' | 'estimado' },
  official: CensusFigures | undefined,
) => {
  if (official) {
    rec.electoralCensus = official.total;
    rec.votingStations = official.puestos;
    rec.votingTables = official.mesas;
    rec.electoralCensusSource = 'oficial';
  } else {
    rec.electoralCensusSource = 'estimado';
  }
};
for (const m of Object.values(METROPOLITAN_MUNICIPALITIES_DATA)) {
  applyCensus(m, getMunicipalCensus(m.name));
  // Población (DANE, proyección 2026) y NBI (DANE, CNPV 2018) oficiales
  const dane = getDaneMunicipio(m.name);
  if (dane) {
    m.population = dane.poblacion;
    m.nbiPercentage = dane.nbi2018;
  }
}
for (const c of Object.values(MEDELLIN_COMUNAS_DATA)) {
  applyCensus(c, c.zone === 'Urbana' ? getMedellinComunaCensus(c.number) : getMedellinCorregimientoCensus(c.id));
}

import { RIONEGRO_COMMUNE_DETAILED_PROFILES } from './rionegroECV2020Data';
import { RIONEGRO_REAL_SECTORS } from '../components/Rionegro3DDiorama';

export interface AreaBarrioVereda {
  name: string;
  population?: number | null;
  percentage?: number | null;
  note?: string;
  hasData: boolean; // if false, UI displays "Sin datos"
}

export interface AreaTerritorialProfile {
  id: string;
  municipioId: string;
  name: string;
  shortName: string;
  type: 'Comuna Urbana' | 'Corregimiento Rural' | 'Zona Urbana' | 'Vereda Rural';
  zone: 'Urbana' | 'Rural';
  color: string;
  coords: [number, number]; // [lat, lng]
  
  // Demografía e Indicadores
  populationText: string;
  populationExactKnown: boolean;
  estimatedPopulationNumeric?: number;
  householdsShareText: string;
  householdsSharePercentage?: number | null;
  
  // Juventud
  youthSharePercentage?: number | null;
  youthShareText: string;
  estimatedYouthCount?: number | null;
  
  // Género & Edad
  genderDistributionText: string;
  ageGroupsDistributionText: string;
  
  // Educación & Pobreza
  educationLevelText: string;
  inbiText: string;
  inbiBenchmark: string;
  
  // Estratos & Ingresos
  strataText: string;
  predominantStrataNumbers: number[];
  incomeLevelText: string;
  
  // Métricas específicas
  specificMetrics: {
    unemploymentRate?: number | null;
    unemploymentNote: string;
    keyLandmarks: string[];
  };
  
  // Barrios o veredas detalladas
  barriosList: AreaBarrioVereda[];
  strategicHighlights: string[];
  
  // Geometría 3D para diorama
  geometry3D: {
    height: number;
    icon: string;
    landmarkName: string;
    landmarkPos: [number, number]; // [x, y]
    points: [number, number][];     // Polígono cerrado [x, y]
    innerLines?: [number, number][][];
  };
}

export interface MunicipioConfig {
  id: string;
  name: string;
  fullName: string;
  subregion: string;
  centerCoords: [number, number]; // [lat, lng]
  defaultZoom: number;
  scale3D: number;
  centerX3D: number;
  centerY3D: number;
  riverName: string;
  riverPoints3D?: [number, number][]; // [x, y]
  areas: AreaTerritorialProfile[];
}

export const ALL_MUNICIPIOS_TERRITORIAL_DATA: Record<string, MunicipioConfig> = {
  // =========================================================================
  // 1. BELLO
  // =========================================================================
  'bello': {
    id: 'bello',
    name: 'Bello',
    fullName: 'Municipio de Bello',
    subregion: 'Valle de Aburrá (Norte)',
    centerCoords: [6.337, -75.558],
    defaultZoom: 13,
    scale3D: 0.024,
    centerX3D: 250,
    centerY3D: 250,
    riverName: 'Río Medellín (Aburrá)',
    riverPoints3D: [
      [150, 420], [210, 360], [260, 290], [300, 210], [340, 140], [370, 70]
    ],
    areas: [
      {
        id: 'bello-c1',
        municipioId: 'bello',
        name: 'Comuna 1: París',
        shortName: 'C1 París',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#E11D48',
        coords: [6.315, -75.578],
        populationText: '61.500 hab. (Estimación DANE/Planeación)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 61500,
        householdsShareText: '11,1% de los hogares del municipio',
        householdsSharePercentage: 11.1,
        youthSharePercentage: null, // Sin datos
        youthShareText: 'Sin datos desagregados por comuna (estimado municipal: 24,5%)',
        estimatedYouthCount: null,
        genderDistributionText: 'Sin datos a nivel de comuna desagregados (promedio municipal: 51,6% mujeres, 48,4% hombres).',
        ageGroupsDistributionText: 'Sin datos por rangos etarios comunales exactos.',
        educationLevelText: 'Sin datos a nivel de comuna desagregados (nivel general predominante: Básico).',
        inbiText: 'Sin datos a nivel de comuna (INBI municipal: 11,8%).',
        inbiBenchmark: 'Zona de ladera occidental con retos en servicios públicos.',
        strataText: 'Estratos 1 y 2 predominantes en barrios de ladera.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados (economía informal y servicios).',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna (tasa metropolitana de referencia: ~10,2%).',
          keyLandmarks: ['Metrocable Picacho / Estación París', 'Mirador de Picacho', 'UVA El Cafetal']
        },
        barriosList: [
          { name: 'París', hasData: false },
          { name: 'Los Sauces', hasData: false },
          { name: 'El Cafetal', hasData: false },
          { name: 'La Pradera', hasData: false },
          { name: 'La Esmeralda', hasData: false },
          { name: 'La Maruchenga', hasData: false },
          { name: 'José Antonio Galán', hasData: false },
          { name: 'Salvador Allende', hasData: false }
        ],
        strategicHighlights: [
          'Conectividad directa con Medellín a través de la Línea P del Metrocable.',
          'Fuerte tejido comunitario y organizaciones populares de base.',
          'Demandas prioritarias en contención de laderas y empleo formal juvenil.'
        ],
        geometry3D: {
          height: 0.52,
          icon: 'mountain',
          landmarkName: 'Metrocable Picacho',
          landmarkPos: [110, 360],
          points: [
            [60, 320], [130, 310], [150, 370], [130, 420], [60, 410], [40, 360]
          ]
        }
      },
      {
        id: 'bello-c2',
        municipioId: 'bello',
        name: 'Comuna 2: La Madera',
        shortName: 'C2 La Madera',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#2563EB',
        coords: [6.322, -75.560],
        populationText: '54.200 hab. (Estimación DANE/Sisbén)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 54200,
        householdsShareText: '9,8% de los hogares de Bello',
        householdsSharePercentage: 9.8,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos a nivel de comuna desagregados',
        ageGroupsDistributionText: 'Sin datos comunales específicos',
        educationLevelText: 'Nivel Medio (técnicos y tecnólogos predominantes).',
        inbiText: 'Sin datos comunales (estratos 3 y 4 con bajo NBI).',
        inbiBenchmark: 'Corredor consolidado con cobertura total de acueducto.',
        strataText: 'Estrato 3 predominante (La Cabañita, Madera).',
        predominantStrataNumbers: [3, 4],
        incomeLevelText: 'Sin datos desagregados (clase media asalariada y comercio).',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna',
          keyLandmarks: ['Estación Madera del Metro', 'Corredor Autopista Norte', 'Parque de La Cabaña']
        },
        barriosList: [
          { name: 'Barrio Nuevo', hasData: false },
          { name: 'La Cabañita', hasData: false },
          { name: 'La Cabaña', hasData: false },
          { name: 'La Madera', hasData: false },
          { name: 'La Florida', hasData: false },
          { name: 'Gran Avenida', hasData: false },
          { name: 'San José Obrero', hasData: false }
        ],
        strategicHighlights: [
          'Eje multimodal de transporte sobre la Autopista Norte y estación Madera.',
          'Alta estabilidad residencial y tradición obrera textil de Fabricato.',
          'Elevada participación cívica y voto de opinión moderado.'
        ],
        geometry3D: {
          height: 0.38,
          icon: 'train',
          landmarkName: 'Estación Madera Metro',
          landmarkPos: [190, 340],
          points: [
            [130, 310], [210, 300], [220, 370], [150, 370]
          ]
        }
      },
      {
        id: 'bello-c3',
        municipioId: 'bello',
        name: 'Comuna 3: Santa Ana',
        shortName: 'C3 Santa Ana',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#0891B2',
        coords: [6.332, -75.550],
        populationText: '46.000 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 46000,
        householdsShareText: '8,3% de los hogares de Bello',
        householdsSharePercentage: 8.3,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos a nivel de comuna',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Medio y Superior en urbanizaciones cerradas.',
        inbiText: 'Sin datos a nivel comunal',
        inbiBenchmark: 'Bajo índice de NBI relativo en la zona urbana.',
        strataText: 'Estratos 3 y 4 en Serramonte y Salento.',
        predominantStrataNumbers: [3, 4],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales comunales',
          keyLandmarks: ['Sector Residencial Serramonte', 'Vía La Selva', 'Complejo Salento']
        },
        barriosList: [
          { name: 'Santa Ana', hasData: false },
          { name: 'Serramonte', hasData: false },
          { name: 'Salento', hasData: false },
          { name: 'Autopista Norte', hasData: false },
          { name: 'Guayabal', hasData: false }
        ],
        strategicHighlights: [
          'Polo de expansión inmobiliaria de familias jóvenes y nuevos profesionales.',
          'Alta motorización particular y demanda urgente de nuevas vías de salida.',
          'Comunidad activa en redes sociales y veedurías ciudadanas.'
        ],
        geometry3D: {
          height: 0.40,
          icon: 'building',
          landmarkName: 'Serramonte Towers',
          landmarkPos: [240, 310],
          points: [
            [210, 300], [270, 290], [280, 350], [220, 370]
          ]
        }
      },
      {
        id: 'bello-c4',
        municipioId: 'bello',
        name: 'Comuna 4: Suárez / Centro',
        shortName: 'C4 Suárez / Centro',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#4F46E5',
        coords: [6.335, -75.558],
        populationText: '67.800 hab. (Estimación DANE)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 67800,
        householdsShareText: '12,2% de los hogares del municipio',
        householdsSharePercentage: 12.2,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos a nivel de comuna',
        ageGroupsDistributionText: 'Sin datos comunales específicos',
        educationLevelText: 'Nivel Medio y Técnico con fuerte arraigo comercial.',
        inbiText: 'Sin datos a nivel comunal',
        inbiBenchmark: 'Centro cívico con dotación de servicios completa.',
        strataText: 'Estrato 3 predominante en el casco tradicional.',
        predominantStrataNumbers: [3],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna',
          keyLandmarks: ['Choza Marco Fidel Suárez', 'Parque Santander de Bello', 'Estación Bello Metro', 'Alcaldía Municipal']
        },
        barriosList: [
          { name: 'Centro de Bello', hasData: false },
          { name: 'Suárez', hasData: false },
          { name: 'Rincón Santo', hasData: false },
          { name: 'Congolo', hasData: false },
          { name: 'Central', hasData: false },
          { name: 'El Rosario', hasData: false }
        ],
        strategicHighlights: [
          'Centro histórico, político, bancario y cívico del norte del Valle de Aburrá.',
          'Monumento Nacional Choza de Marco Fidel Suárez y parroquia Nuestra Señora del Rosario.',
          'Alta densidad de comercio formal y flujo peatonal continuo.'
        ],
        geometry3D: {
          height: 0.44,
          icon: 'landmark',
          landmarkName: 'Choza Marco Fidel Suárez',
          landmarkPos: [210, 250],
          points: [
            [170, 230], [250, 220], [270, 290], [210, 300], [150, 270]
          ]
        }
      },
      {
        id: 'bello-c5',
        municipioId: 'bello',
        name: 'Comuna 5: La Cumbre',
        shortName: 'C5 La Cumbre',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#D97706',
        coords: [6.345, -75.565],
        populationText: '49.500 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 49500,
        householdsShareText: '8,9% de los hogares de Bello',
        householdsSharePercentage: 8.9,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos a nivel de comuna',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico con demandas de formación vocacional.',
        inbiText: 'Sin datos a nivel comunal',
        inbiBenchmark: 'Sectores en ladera oriental con necesidad de saneamiento.',
        strataText: 'Estratos 1 y 2 predominantes.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna',
          keyLandmarks: ['Parroquia Nuestra Señora de La Cumbre', 'Mirador Altamira', 'Sector Carmelo']
        },
        barriosList: [
          { name: 'La Cumbre', hasData: false },
          { name: 'Altamira', hasData: false },
          { name: 'El Carmelo', hasData: false },
          { name: 'Buenos Aires', hasData: false },
          { name: 'Nazareth', hasData: false }
        ],
        strategicHighlights: [
          'Comunidad con arraigo tradicional en artesanía y pequeñas manufacturas.',
          'Reclamos de legalización predial e inversión en espacios lúdicos.',
          'Foco en prevención de violencias juveniles y oportunidades técnicas.'
        ],
        geometry3D: {
          height: 0.48,
          icon: 'home',
          landmarkName: 'Iglesia La Cumbre',
          landmarkPos: [140, 200],
          points: [
            [100, 180], [170, 160], [170, 230], [110, 240]
          ]
        }
      },
      {
        id: 'bello-c6',
        municipioId: 'bello',
        name: 'Comuna 6: Bellavista',
        shortName: 'C6 Bellavista',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#DC2626',
        coords: [6.350, -75.555],
        populationText: '58.000 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 58000,
        householdsShareText: '10,5% de los hogares de Bello',
        householdsSharePercentage: 10.5,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos a nivel de comuna',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico.',
        inbiText: 'Sin datos a nivel comunal',
        inbiBenchmark: 'Alta densidad poblacional en zona de base obrera.',
        strataText: 'Estratos 1 y 2 en asentamientos históricos.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna',
          keyLandmarks: ['UVA Aguas del Norte', 'Complejo Deportivo Bellavista', 'Cárcel Bellavista']
        },
        barriosList: [
          { name: 'Bellavista', hasData: false },
          { name: 'Pachelly', hasData: false },
          { name: 'Tierra Adentro', hasData: false },
          { name: 'San Martín', hasData: false },
          { name: 'Villa Linda', hasData: false }
        ],
        strategicHighlights: [
          'Zona de alta relevancia estratégica para planes integrales de seguridad y paz.',
          'Presencia de la UVA Aguas del Norte como epicentro de cultura y agua.',
          'Importante demanda de centros de primera infancia e inserción productiva.'
        ],
        geometry3D: {
          height: 0.46,
          icon: 'shield',
          landmarkName: 'Complejo Bellavista',
          landmarkPos: [180, 140],
          points: [
            [140, 110], [210, 90], [220, 170], [160, 180]
          ]
        }
      },
      {
        id: 'bello-c7',
        municipioId: 'bello',
        name: 'Comuna 7: Altos de Niquía',
        shortName: 'C7 Altos de Niquía',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#059669',
        coords: [6.355, -75.545],
        populationText: '43.200 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 43200,
        householdsShareText: '7,8% de los hogares de Bello',
        householdsSharePercentage: 7.8,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos a nivel de comuna',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico.',
        inbiText: 'Sin datos a nivel comunal',
        inbiBenchmark: 'Suelo de protección ambiental colindante con el Cerro Quitasol.',
        strataText: 'Estratos 1 y 2.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna',
          keyLandmarks: ['Faldas del Cerro Quitasol', 'Mirador El Carmelo', 'Camino Indígena Niquía']
        },
        barriosList: [
          { name: 'Altos de Niquía', hasData: false },
          { name: 'El Mirador', hasData: false },
          { name: 'Altos de Quitasol', hasData: false },
          { name: 'La Selva', hasData: false },
          { name: 'Bifamiliares', hasData: false },
          { name: 'Los Ángeles', hasData: false }
        ],
        strategicHighlights: [
          'Puerta de acceso al Cerro Quitasol (la pirámide natural de Antioquia).',
          'Vulnerabilidad ante eventos climáticos y quemas forestales en verano.',
          'Vocación hacia el turismo ambiental comunitario y senderismo regulado.'
        ],
        geometry3D: {
          height: 0.58,
          icon: 'mountain',
          landmarkName: 'Cerro Quitasol (Base)',
          landmarkPos: [240, 100],
          points: [
            [210, 80], [280, 60], [290, 140], [220, 160]
          ]
        }
      },
      {
        id: 'bello-c8',
        municipioId: 'bello',
        name: 'Comuna 8: Niquía',
        shortName: 'C8 Niquía',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#7C3AED',
        coords: [6.340, -75.540],
        populationText: '76.500 hab. (La más poblada de Bello)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 76500,
        householdsShareText: '13,8% de los hogares de Bello',
        householdsSharePercentage: 13.8,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos a nivel de comuna',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Medio y Superior en ciudadelas residenciales.',
        inbiText: 'Sin datos a nivel comunal',
        inbiBenchmark: 'Epicentro comercial moderno con NBI bajo.',
        strataText: 'Estratos 3 y 4 en Terranova y Camacol.',
        predominantStrataNumbers: [3, 4],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna',
          keyLandmarks: ['Estación Niquía del Metro', 'Centro Comercial Puerta del Norte', 'Unidad Deportiva Tulio Ospina', 'Clínica del Norte']
        },
        barriosList: [
          { name: 'Niquía Centro', hasData: false },
          { name: 'Terranova', hasData: false },
          { name: 'Panamericano', hasData: false },
          { name: 'La Navarra', hasData: false },
          { name: 'Ciudad Niquía', hasData: false },
          { name: 'Camacol', hasData: false }
        ],
        strategicHighlights: [
          'Terminal norte del sistema Metro de Medellín con más de 120.000 abordajes diarios.',
          'Complejo comercial Puerta del Norte y Parque Tulio Ospina con pista de patinaje.',
          'Consolidación de clase media emergente y comercio formal dinámico.'
        ],
        geometry3D: {
          height: 0.42,
          icon: 'train',
          landmarkName: 'CC Puerta del Norte',
          landmarkPos: [290, 190],
          points: [
            [250, 160], [330, 150], [350, 230], [270, 240]
          ]
        }
      },
      {
        id: 'bello-c9',
        municipioId: 'bello',
        name: 'Comuna 9: Fontidueño',
        shortName: 'C9 Fontidueño',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#EA580C',
        coords: [6.328, -75.535],
        populationText: '42.000 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 42000,
        householdsShareText: '7,6% de los hogares de Bello',
        householdsSharePercentage: 7.6,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos a nivel de comuna',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico y Técnico.',
        inbiText: 'Sin datos a nivel comunal',
        inbiBenchmark: 'Ribera del Río Medellín con polígonos logísticos.',
        strataText: 'Estratos 1 y 2 en zonas residenciales ribereñas.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna',
          keyLandmarks: ['Parque Ambiental Fontidueño', 'Corredor Industrial Guasimalito', 'Ribera Río Medellín']
        },
        barriosList: [
          { name: 'Fontidueño', hasData: false },
          { name: 'La Mina', hasData: false },
          { name: 'San Gabriel', hasData: false },
          { name: 'Vegas de la Navarra', hasData: false },
          { name: 'Guasimalito', hasData: false }
        ],
        strategicHighlights: [
          'Mezcla de parques industriales, bodegas logísticas y viviendas populares.',
          'Límite con Copacabana y cercanía a la planta de tratamiento de aguas residuales.',
          'Proyectos de mitigación ambiental y recuperación del espacio ribereño.'
        ],
        geometry3D: {
          height: 0.36,
          icon: 'factory',
          landmarkName: 'Parque Fontidueño',
          landmarkPos: [330, 270],
          points: [
            [280, 240], [350, 230], [370, 310], [300, 320]
          ]
        }
      },
      {
        id: 'bello-c10',
        municipioId: 'bello',
        name: 'Comuna 10: Zamora',
        shortName: 'C10 Zamora',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#65A30D',
        coords: [6.310, -75.538],
        populationText: '37.500 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 37500,
        householdsShareText: '6,8% de los hogares de Bello',
        householdsSharePercentage: 6.8,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos a nivel de comuna',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico.',
        inbiText: 'Sin datos a nivel comunal',
        inbiBenchmark: 'Zona limítrofe oriental con Medellín.',
        strataText: 'Estrato 1 y 2 predominantes.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna',
          keyLandmarks: ['Puente Zamora', 'Autopista Medellín-Bogotá', 'Intercambiador Acevedo']
        },
        barriosList: [
          { name: 'Zamora', hasData: false },
          { name: 'Santa Rita', hasData: false },
          { name: 'Acevedo límite', hasData: false },
          { name: 'Playas del Norte', hasData: false }
        ],
        strategicHighlights: [
          'Garganta de entrada a la Autopista Medellín-Bogotá con intenso flujo de carga pesada.',
          'Interconexión clave con el metro mediante la estación Acevedo en el borde sur.',
          'Demanda de espacio público, mitigación de ruido y seguridad vial peatonal.'
        ],
        geometry3D: {
          height: 0.35,
          icon: 'truck',
          landmarkName: 'Corredor Zamora',
          landmarkPos: [290, 370],
          points: [
            [240, 340], [320, 330], [340, 410], [260, 420]
          ]
        }
      },
      {
        id: 'bello-rural-sanfelix',
        municipioId: 'bello',
        name: 'Corregimiento San Félix',
        shortName: 'Corr. San Félix',
        type: 'Corregimiento Rural',
        zone: 'Rural',
        color: '#166534',
        coords: [6.350, -75.630],
        populationText: '17.500 hab. (Zona campesina y ecoturística)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 17500,
        householdsShareText: '3,2% de los hogares de Bello',
        householdsSharePercentage: 3.2,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados (población rural campesina)',
        genderDistributionText: 'Sin datos a nivel rural desagregados',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico campesino.',
        inbiText: 'Sin datos a nivel de veredas',
        inbiBenchmark: 'Rural disperso con vocación lechera y agrícola.',
        strataText: 'Estratos 1 y 2 rural.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados (actividad agropecuaria y servicios de ecoturismo).',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales en suelo rural',
          keyLandmarks: ['Voladero San Félix (Parapente)', 'Alto de Las Baldías (Páramo)', 'Meseta Lechera de Ovejas']
        },
        barriosList: [
          { name: 'Sabanalarga', hasData: false },
          { name: 'El Carmelo', hasData: false },
          { name: 'La Unión', hasData: false },
          { name: 'La China', hasData: false },
          { name: 'Cuartas', hasData: false },
          { name: 'La Palma', hasData: false },
          { name: 'Cerezales', hasData: false },
          { name: 'El Tambo', hasData: false },
          { name: 'Ovejas', hasData: false },
          { name: 'Potrerito', hasData: false }
        ],
        strategicHighlights: [
          'Meseta de clima frío a más de 2.400 msnm; principal destino de parapentismo del país.',
          'Reserva de páramo de Las Baldías, proveedora de agua para el Valle de Aburrá.',
          'Economía campesina lechera, cultivo de papa y hortalizas de clima frío.'
        ],
        geometry3D: {
          height: 0.65,
          icon: 'wind',
          landmarkName: 'Voladero San Félix (2.400m)',
          landmarkPos: [50, 180],
          points: [
            [20, 80], [100, 70], [110, 260], [40, 290], [10, 180]
          ]
        }
      }
    ]
  },

  // =========================================================================
  // 2. ITAGÜÍ
  // =========================================================================
  'itagui': {
    id: 'itagui',
    name: 'Itagüí',
    fullName: 'Municipio de Itagüí',
    subregion: 'Valle de Aburrá (Sur)',
    centerCoords: [6.173, -75.611],
    defaultZoom: 14,
    scale3D: 0.026,
    centerX3D: 250,
    centerY3D: 250,
    riverName: 'Río Medellín (Aburrá) - Borde Oriental',
    riverPoints3D: [
      [360, 80], [340, 180], [320, 280], [300, 390], [280, 480]
    ],
    areas: [
      {
        id: 'itagui-c1',
        municipioId: 'itagui',
        name: 'Comuna 1: Centro / Administrativa',
        shortName: 'C1 Centro',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#3B82F6',
        coords: [6.173, -75.611],
        populationText: '38.200 hab. (Estimación Planeación)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 38200,
        householdsShareText: '13,2% de los hogares de Itagüí',
        householdsSharePercentage: 13.2,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna (municipal: 23,8%)',
        genderDistributionText: 'Sin datos comunales específicos',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Medio y Técnico comercial.',
        inbiText: 'Sin datos a nivel de comuna',
        inbiBenchmark: 'Bajo índice de NBI en el centro urbano.',
        strataText: 'Estratos 3 y 4 predominantes.',
        predominantStrataNumbers: [3, 4],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales comunales',
          keyLandmarks: ['Parque Principal de Itagüí', 'Alcaldía Municipal', 'Parroquia Nuestra Señora del Rosario', 'Plaza de Mercado']
        },
        barriosList: [
          { name: 'Centro de Itagüí', hasData: false },
          { name: 'Parque Principal', hasData: false },
          { name: 'Plaza de Mercado', hasData: false },
          { name: 'Asturias', hasData: false },
          { name: 'Los Conquistadores', hasData: false }
        ],
        strategicHighlights: [
          'Núcleo institucional, bancario y administrativo con gran afluencia ciudadana.',
          'Parque Principal remodelado como epicentro del civismo itagüiseño.',
          'Alta densidad de microcomercios y servicios especializados.'
        ],
        geometry3D: {
          height: 0.42,
          icon: 'landmark',
          landmarkName: 'Parque Principal Itagüí',
          landmarkPos: [230, 220],
          points: [
            [180, 180], [270, 170], [280, 260], [190, 270]
          ]
        }
      },
      {
        id: 'itagui-c2',
        municipioId: 'itagui',
        name: 'Comuna 2: Santa María',
        shortName: 'C2 Santa María',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#EF4444',
        coords: [6.183, -75.602],
        populationText: '58.900 hab. (La más poblada de Itagüí)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 58900,
        householdsShareText: '20,3% de los hogares del municipio',
        householdsSharePercentage: 20.3,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos a nivel comunal',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico con alta fuerza obrera.',
        inbiText: 'Sin datos comunales específicos',
        inbiBenchmark: 'Mayor densidad habitacional del sur metropolitano.',
        strataText: 'Estratos 1 y 2 en barrios populares de base.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna',
          keyLandmarks: ['Parque Obrero de Santa María', 'Sector Playa Rica', 'Parroquia San Pablo']
        },
        barriosList: [
          { name: 'Santa María N° 1', hasData: false },
          { name: 'Santa María N° 2', hasData: false },
          { name: 'Santa María N° 3', hasData: false },
          { name: 'La Finca', hasData: false },
          { name: 'Playa Rica', hasData: false },
          { name: 'San Pablo', hasData: false }
        ],
        strategicHighlights: [
          'La comuna con mayor peso demográfico y electoral de Itagüí.',
          'Fuerte identidad obrera, comercio de barrio y vida asociativa activa.',
          'Prioridad en infraestructura deportiva, seguridad barrial y programas juveniles.'
        ],
        geometry3D: {
          height: 0.46,
          icon: 'users',
          landmarkName: 'Parque Obrero Santa María',
          landmarkPos: [270, 130],
          points: [
            [220, 90], [310, 80], [320, 170], [230, 180]
          ]
        }
      },
      {
        id: 'itagui-c3',
        municipioId: 'itagui',
        name: 'Comuna 3: Ditaires / San Fernando',
        shortName: 'C3 Ditaires',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#10B981',
        coords: [6.162, -75.618],
        populationText: '46.800 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 46800,
        householdsShareText: '16,1% de los hogares de Itagüí',
        householdsSharePercentage: 16.1,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos comunales específicos',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Superior y Medio (profesionales y cuadros ejecutivos).',
        inbiText: 'Sin datos a nivel comunal',
        inbiBenchmark: 'Excelente calidad de vida urbana y espacios verdes.',
        strataText: 'Estratos 3, 4 y conjuntos cerrados de estrato 5.',
        predominantStrataNumbers: [3, 4, 5],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales comunales',
          keyLandmarks: ['Estadio Ditaires (Coliseo El Cubo)', 'Humedal Ditaires', 'Casa de la Cultura Ditaires', 'Sede Cervecería Pilsen']
        },
        barriosList: [
          { name: 'Ditaires', hasData: false },
          { name: 'San Fernando', hasData: false },
          { name: 'Viviendas del Sur', hasData: false },
          { name: 'Pilsen', hasData: false },
          { name: 'Triana', hasData: false },
          { name: 'San Francisco', hasData: false }
        ],
        strategicHighlights: [
          'Pulmón deportivo y cultural con el Estadio Metropolitano y Humedal Ditaires.',
          'Residencias de estrato medio-alto y complejos cerrados de alta valoración.',
          'Voto de opinión calificado y exigente con la gestión del espacio público.'
        ],
        geometry3D: {
          height: 0.40,
          icon: 'trophy',
          landmarkName: 'Estadio Ditaires',
          landmarkPos: [190, 310],
          points: [
            [130, 270], [230, 260], [240, 350], [150, 360]
          ]
        }
      },
      {
        id: 'itagui-c4',
        municipioId: 'itagui',
        name: 'Comuna 4: Bariloche / San Gabriel',
        shortName: 'C4 Bariloche',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#F59E0B',
        coords: [6.155, -75.625],
        populationText: '39.400 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 39400,
        householdsShareText: '13,6% de los hogares de Itagüí',
        householdsSharePercentage: 13.6,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos a nivel comunal',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Medio y Básico.',
        inbiText: 'Sin datos comunales específicos',
        inbiBenchmark: 'Zona en expansión limítrofe con San Antonio de Prado.',
        strataText: 'Estratos 2 y 3 predominantes.',
        predominantStrataNumbers: [2, 3],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna',
          keyLandmarks: ['Mirador de San Gabriel', 'Bariloche Centro Comunitario', 'Sector Ferrara']
        },
        barriosList: [
          { name: 'Bariloche', hasData: false },
          { name: 'San Gabriel', hasData: false },
          { name: '19 de Abril', hasData: false },
          { name: 'Ferrara', hasData: false },
          { name: 'Triana Baja', hasData: false }
        ],
        strategicHighlights: [
          'Conector natural hacia el corregimiento de San Antonio de Prado (Medellín).',
          'Nuevas urbanizaciones residenciales en altura y familias jóvenes.',
          'Reclamo de mayor cobertura en rutas integradas del sistema Metro.'
        ],
        geometry3D: {
          height: 0.44,
          icon: 'home',
          landmarkName: 'Mirador San Gabriel',
          landmarkPos: [130, 390],
          points: [
            [80, 360], [160, 350], [170, 430], [90, 440]
          ]
        }
      },
      {
        id: 'itagui-c5',
        municipioId: 'itagui',
        name: 'Comuna 5: Calatrava / Terranova',
        shortName: 'C5 Calatrava',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#8B5CF6',
        coords: [6.168, -75.630],
        populationText: '44.100 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 44100,
        householdsShareText: '15,2% de los hogares de Itagüí',
        householdsSharePercentage: 15.2,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos comunales',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico con avance en educación media.',
        inbiText: 'Sin datos comunales específicos',
        inbiBenchmark: 'Zona transformada por obras urbanas y cámaras de seguridad.',
        strataText: 'Estratos 1 y 2 en barrios de ladera occidental.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna',
          keyLandmarks: ['Centro Deportivo Calatrava', 'Loma Linda', 'Balcones de Sevilla']
        },
        barriosList: [
          { name: 'Calatrava', hasData: false },
          { name: 'Terranova', hasData: false },
          { name: 'Loma Linda', hasData: false },
          { name: 'Balcones de Sevilla', hasData: false },
          { name: 'La Aldea', hasData: false }
        ],
        strategicHighlights: [
          'Ejemplo de recuperación urbana mediante inversión social y canchas sintéticas.',
          'Topografía inclinada que requiere monitoreo permanente de cuencas.',
          'Fuerte arraigo de clubes deportivos infantiles y juveniles.'
        ],
        geometry3D: {
          height: 0.48,
          icon: 'shield',
          landmarkName: 'Polideportivo Calatrava',
          landmarkPos: [110, 260],
          points: [
            [60, 220], [150, 210], [160, 290], [70, 300]
          ]
        }
      },
      {
        id: 'itagui-c6',
        municipioId: 'itagui',
        name: 'Comuna 6: Los Naranjos / Simón Bolívar',
        shortName: 'C6 Los Naranjos',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#06B6D4',
        coords: [6.178, -75.615],
        populationText: '34.500 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 34500,
        householdsShareText: '11,9% de los hogares de Itagüí',
        householdsSharePercentage: 11.9,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por comuna',
        genderDistributionText: 'Sin datos comunales',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Medio y Técnico en confección y diseño.',
        inbiText: 'Sin datos comunales específicos',
        inbiBenchmark: 'Zona mixta comercial e industrial de bajo NBI.',
        strataText: 'Estratos 3 y 4 en sectores residenciales consolidados.',
        predominantStrataNumbers: [3, 4],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna',
          keyLandmarks: ['Corredor Confeccionista de Los Naranjos', 'Sector Simón Bolívar', 'Parque de Las Chimeneas']
        },
        barriosList: [
          { name: 'Simón Bolívar', hasData: false },
          { name: 'Los Naranjos', hasData: false },
          { name: 'La Gloria', hasData: false },
          { name: 'Las Acacias', hasData: false },
          { name: 'Las Américas', hasData: false }
        ],
        strategicHighlights: [
          'Cuna de la confección, moda y talleres textiles de microempresarios.',
          'Excelente conectividad con la Autopista Sur y estaciones del Metro.',
          'Comercio minorista y talleres familiares de segunda y tercera generación.'
        ],
        geometry3D: {
          height: 0.39,
          icon: 'scissors',
          landmarkName: 'Distrito Confección',
          landmarkPos: [180, 130],
          points: [
            [130, 90], [210, 80], [220, 160], [140, 170]
          ]
        }
      },
      {
        id: 'itagui-c7',
        municipioId: 'itagui',
        name: 'Comuna 7: Mayorista / Guayabalito',
        shortName: 'C7 Mayorista',
        type: 'Comuna Urbana',
        zone: 'Urbana',
        color: '#F97316',
        coords: [6.188, -75.590],
        populationText: '14.200 hab. (Hub Logístico y Comercial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 14200,
        householdsShareText: '4,9% de los hogares residentes',
        householdsSharePercentage: 4.9,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados (población flotante de >60.000 personas/día)',
        genderDistributionText: 'Sin datos comunales específicos',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Medio y Técnico logístico.',
        inbiText: 'Sin datos comunales específicos',
        inbiBenchmark: 'Zona altamente industrializada y comercial.',
        strataText: 'Estratos 3 y 4 en sectores residenciales.',
        predominantStrataNumbers: [3, 4],
        incomeLevelText: 'Sin datos desagregados (alto flujo comercial)',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por comuna',
          keyLandmarks: ['Central Mayorista de Antioquia', 'Parque de Las Chimeneas', 'Zona Industrial 1 y 2']
        },
        barriosList: [
          { name: 'Central Mayorista', hasData: false },
          { name: 'Guayabalito', hasData: false },
          { name: 'El Rosario', hasData: false },
          { name: 'Zona Industrial 1 y 2', hasData: false }
        ],
        strategicHighlights: [
          'La Central Mayorista de Antioquia es el mayor centro de abastos del noroccidente colombiano.',
          'Mueve miles de toneladas diarias de alimentos e insumos para todo el departamento.',
          'Población flotante masiva de transportadores, comerciantes y cuadrillas de carga.'
        ],
        geometry3D: {
          height: 0.35,
          icon: 'store',
          landmarkName: 'Central Mayorista (Abastos)',
          landmarkPos: [320, 140],
          points: [
            [270, 100], [360, 90], [370, 180], [280, 190]
          ]
        }
      },
      {
        id: 'itagui-rural-manzanillo',
        municipioId: 'itagui',
        name: 'Corregimiento El Manzanillo',
        shortName: 'Corr. El Manzanillo',
        type: 'Corregimiento Rural',
        zone: 'Rural',
        color: '#15803D',
        coords: [6.150, -75.645],
        populationText: '15.400 hab. (Reserva ambiental y ladera)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 15400,
        householdsShareText: '5,3% de los hogares de Itagüí',
        householdsSharePercentage: 5.3,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados a nivel rural',
        genderDistributionText: 'Sin datos a nivel rural',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico.',
        inbiText: 'Sin datos a nivel de veredas',
        inbiBenchmark: 'Suelo rural y de conservación en Pico Manzanillo.',
        strataText: 'Estratos 1 y 2 en asentamientos campesinos.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales en suelo rural',
          keyLandmarks: ['Pico Manzanillo (Reserva Natural)', 'Vereda El Ajizal', 'Loma de los Zuleta']
        },
        barriosList: [
          { name: 'El Ajizal', hasData: false },
          { name: 'El Pedregal', hasData: false },
          { name: 'El Porvenir', hasData: false },
          { name: 'El Progreso', hasData: false },
          { name: 'La María (La Verde)', hasData: false },
          { name: 'Loma de los Zuleta', hasData: false },
          { name: 'Los Gómez', hasData: false },
          { name: 'Los Olivares', hasData: false }
        ],
        strategicHighlights: [
          'Pico Manzanillo como principal reserva forestal y santuario hídrico de Itagüí.',
          'Proceso de conurbación en veredas bajas como El Ajizal con necesidades de alcantarillado.',
          'Foco en reforestación, turismo ecológico y senderismo responsable.'
        ],
        geometry3D: {
          height: 0.62,
          icon: 'trees',
          landmarkName: 'Pico Manzanillo (Reserva)',
          landmarkPos: [40, 280],
          points: [
            [10, 180], [80, 160], [90, 390], [20, 380]
          ]
        }
      }
    ]
  },

  // =========================================================================
  // 3. ENVIGADO
  // =========================================================================
  'envigado': {
    id: 'envigado',
    name: 'Envigado',
    fullName: 'Municipio de Envigado',
    subregion: 'Valle de Aburrá (Sur)',
    centerCoords: [6.168, -75.583],
    defaultZoom: 13,
    scale3D: 0.024,
    centerX3D: 250,
    centerY3D: 250,
    riverName: 'Río Medellín (Aburrá) - Borde Occidental',
    riverPoints3D: [
      [80, 90], [90, 200], [100, 310], [110, 420]
    ],
    areas: [
      {
        id: 'envigado-z-centro',
        municipioId: 'envigado',
        name: 'Zona Centro y Tradicional',
        shortName: 'Z. Centro',
        type: 'Zona Urbana',
        zone: 'Urbana',
        color: '#6366F1',
        coords: [6.168, -75.583],
        populationText: '38.500 hab. (Estimación DANE)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 38500,
        householdsShareText: '15,9% de los hogares de Envigado',
        householdsSharePercentage: 15.9,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por zona (municipal: 21,8%)',
        genderDistributionText: 'Sin datos por zona desagregados',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Superior y Medio (alta escolaridad histórica).',
        inbiText: 'Sin datos a nivel de zona',
        inbiBenchmark: 'Envigado ostenta el NBI más bajo de Colombia (~4,2%).',
        strataText: 'Estratos 3 y 4 con alta calidad de vida.',
        predominantStrataNumbers: [3, 4],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por zona',
          keyLandmarks: ['Parque Marceliano Vélez', 'Parroquia Santa Gertrudis', 'Casa Museo Otraparte (Fernando González)', 'Calle de la Buena Mesa']
        },
        barriosList: [
          { name: 'Zona Centro', hasData: false },
          { name: 'Barrio Mesa', hasData: false },
          { name: 'San Marcos', hasData: false },
          { name: 'La Magnolia', hasData: false },
          { name: 'Pontevedra', hasData: false },
          { name: 'Jardines', hasData: false }
        ],
        strategicHighlights: [
          'Cuna cultural de Fernando González y la filosofía nadaísta en Otraparte.',
          'Tradición colonial, gastronomía típica y sentido de pertenencia envigadeño.',
          'Alta cultura ciudadana y modelo de gestión de residuos y arbolado urbano.'
        ],
        geometry3D: {
          height: 0.42,
          icon: 'coffee',
          landmarkName: 'Otraparte / Parque Central',
          landmarkPos: [170, 210],
          points: [
            [120, 160], [210, 150], [220, 260], [130, 270]
          ]
        }
      },
      {
        id: 'envigado-z-zuniga',
        municipioId: 'envigado',
        name: 'Zona Noroccidental / Zúñiga - Villagrande',
        shortName: 'Z. Zúñiga',
        type: 'Zona Urbana',
        zone: 'Urbana',
        color: '#3B82F6',
        coords: [6.180, -75.582],
        populationText: '42.300 hab. (Límite con El Poblado)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 42300,
        householdsShareText: '17,5% de los hogares de Envigado',
        householdsSharePercentage: 17.5,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por zona',
        genderDistributionText: 'Sin datos por zona',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Superior (altos cuadros profesionales y ejecutivos).',
        inbiText: 'Sin datos específicos',
        inbiBenchmark: 'Zona de muy alta capacidad económica.',
        strataText: 'Estratos 5 y 6 predominantes en condominios.',
        predominantStrataNumbers: [5, 6],
        incomeLevelText: 'Sin datos desagregados (ingresos altos)',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por zona',
          keyLandmarks: ['Corredor Las Vegas', 'Clínica de la Policía', 'Sector Villagrande']
        },
        barriosList: [
          { name: 'Zúñiga', hasData: false },
          { name: 'Bosques de Zúñiga', hasData: false },
          { name: 'Villagrande', hasData: false },
          { name: 'La Pradera', hasData: false },
          { name: 'San Mateo', hasData: false },
          { name: 'Las Vegas', hasData: false }
        ],
        strategicHighlights: [
          'Integración natural con El Poblado de Medellín y eje empresarial de Las Vegas.',
          'Alta concentración de torres de apartamentos de estrato alto y servicios médicos.',
          'Voto de opinión sofisticado de centroderecha con alta participación electoral.'
        ],
        geometry3D: {
          height: 0.44,
          icon: 'building',
          landmarkName: 'Zúñiga High-End',
          landmarkPos: [160, 110],
          points: [
            [110, 70], [200, 60], [210, 150], [120, 160]
          ]
        }
      },
      {
        id: 'envigado-z-dorado-san-jose',
        municipioId: 'envigado',
        name: 'Zona Central-Sur / El Dorado - San José',
        shortName: 'Z. Dorado / San José',
        type: 'Zona Urbana',
        zone: 'Urbana',
        color: '#EC4899',
        coords: [6.160, -75.578],
        populationText: '51.200 hab. (Tradición industrial obrera)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 51200,
        householdsShareText: '21,2% de los hogares de Envigado',
        householdsSharePercentage: 21.2,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por zona',
        genderDistributionText: 'Sin datos por zona',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Medio y Técnico obrero.',
        inbiText: 'Sin datos a nivel de zona',
        inbiBenchmark: 'Tejido barrial tradicional con servicios completos.',
        strataText: 'Estratos 3 y 4 con orgullo raizal.',
        predominantStrataNumbers: [3, 4],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por zona',
          keyLandmarks: ['Antigua Fábrica Rosellón', 'Parque de San José', 'Barrio Obrero']
        },
        barriosList: [
          { name: 'El Dorado', hasData: false },
          { name: 'San José', hasData: false },
          { name: 'Los Naranjos', hasData: false },
          { name: 'Alcalá', hasData: false },
          { name: 'Barrio Obrero', hasData: false },
          { name: 'Bucarest', hasData: false }
        ],
        strategicHighlights: [
          'Cuna de la industria textil de Rosellón que forjó el carácter trabajador de Envigado.',
          'Barrios obreros con casas unifamiliares tradicionales y clubes deportivos.',
          'Fuerte maquinaria social y participación en presupuestos participativos.'
        ],
        geometry3D: {
          height: 0.39,
          icon: 'factory',
          landmarkName: 'Complejo Rosellón',
          landmarkPos: [190, 290],
          points: [
            [140, 250], [230, 240], [240, 330], [150, 340]
          ]
        }
      },
      {
        id: 'envigado-z-trianon-paz',
        municipioId: 'envigado',
        name: 'Zona Suroriental / El Trianón - La Paz',
        shortName: 'Z. El Trianón',
        type: 'Zona Urbana',
        zone: 'Urbana',
        color: '#F59E0B',
        coords: [6.153, -75.586],
        populationText: '45.600 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 45600,
        householdsShareText: '18,8% de los hogares del municipio',
        householdsSharePercentage: 18.8,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por zona',
        genderDistributionText: 'Sin datos por zona',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Medio y Técnico.',
        inbiText: 'Sin datos a nivel comunal',
        inbiBenchmark: 'Excelente conectividad con la estación Itagüí del Metro.',
        strataText: 'Estratos 3 y 4 predominantes.',
        predominantStrataNumbers: [3, 4],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por zona',
          keyLandmarks: ['Polideportivo Sur de Envigado', 'Loma del Barro', 'Sector La Paz']
        },
        barriosList: [
          { name: 'El Trianón', hasData: false },
          { name: 'Loma del Barro', hasData: false },
          { name: 'La Paz', hasData: false },
          { name: 'Las Casitas', hasData: false },
          { name: 'Primavera', hasData: false },
          { name: 'Milán-Vallejuelos', hasData: false }
        ],
        strategicHighlights: [
          'Sede del Polideportivo Sur, hogar del Envigado Fútbol Club y cantera de talentos.',
          'Zona residencial de clase media con alta movilidad y comercio de cercanía.',
          'Equipamientos deportivos y recreativos de alto nivel metropolitano.'
        ],
        geometry3D: {
          height: 0.38,
          icon: 'trophy',
          landmarkName: 'Polideportivo Sur',
          landmarkPos: [150, 360],
          points: [
            [110, 330], [190, 320], [200, 410], [120, 420]
          ]
        }
      },
      {
        id: 'envigado-z-lomas',
        municipioId: 'envigado',
        name: 'Zona Lomas / Escobero - Las Brujas - Atravesado',
        shortName: 'Z. Lomas',
        type: 'Zona Urbana',
        zone: 'Urbana',
        color: '#10B981',
        coords: [6.165, -75.560],
        populationText: '32.400 hab. (Condominios de alto valor)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 32400,
        householdsShareText: '13,4% de los hogares de Envigado',
        householdsSharePercentage: 13.4,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por zona',
        genderDistributionText: 'Sin datos por zona',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Superior y Posgrados.',
        inbiText: 'Sin datos específicos',
        inbiBenchmark: 'Zona de condominios campestres con NBI prácticamente nulo.',
        strataText: 'Estratos 5 y 6 en parcelaciones cerradas.',
        predominantStrataNumbers: [5, 6],
        incomeLevelText: 'Sin datos desagregados (alto poder adquisitivo)',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por zona',
          keyLandmarks: ['Loma del Escobero', 'Loma de Las Brujas', 'El Chocho', 'City Plaza Mall']
        },
        barriosList: [
          { name: 'Loma de Las Brujas', hasData: false },
          { name: 'Loma El Atravesado', hasData: false },
          { name: 'El Esmeraldal', hasData: false },
          { name: 'El Chocho', hasData: false },
          { name: 'La Inmaculada', hasData: false },
          { name: 'La Sebastiana', hasData: false }
        ],
        strategicHighlights: [
          'Crecimiento vertical de lujo y condominios campestres sobre la ladera.',
          'Preocupación constante por la capacidad de las vías empinadas y tráfico en horas pico.',
          'Movilización ciudadana en defensa de la fauna silvestre y corredores biológicos.'
        ],
        geometry3D: {
          height: 0.54,
          icon: 'trees',
          landmarkName: 'Loma del Escobero',
          landmarkPos: [270, 240],
          points: [
            [220, 190], [320, 170], [330, 290], [230, 300]
          ]
        }
      },
      {
        id: 'envigado-z-salado-mina',
        municipioId: 'envigado',
        name: 'Zona Alta / El Salado - La Mina - Chinguí',
        shortName: 'Z. El Salado',
        type: 'Zona Urbana',
        zone: 'Urbana',
        color: '#8B5CF6',
        coords: [6.152, -75.568],
        populationText: '22.800 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 22800,
        householdsShareText: '9,4% de los hogares de Envigado',
        householdsSharePercentage: 9.4,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por zona',
        genderDistributionText: 'Sin datos por zona',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico y Medio.',
        inbiText: 'Sin datos a nivel de zona',
        inbiBenchmark: 'Zona de transición urbana-rural de ladera.',
        strataText: 'Estratos 1, 2 y 3 tradicionales.',
        predominantStrataNumbers: [1, 2, 3],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por zona',
          keyLandmarks: ['Parque Ecoturístico El Salado', 'Cuevas del Chinguí', 'Sector La Mina']
        },
        barriosList: [
          { name: 'El Salado', hasData: false },
          { name: 'El Chinguí', hasData: false },
          { name: 'La Mina', hasData: false },
          { name: 'San Rafael', hasData: false },
          { name: 'Las Antillas', hasData: false },
          { name: 'Uribe Ángel', hasData: false }
        ],
        strategicHighlights: [
          'Entorno natural privilegiado junto al Parque Ecoturístico El Salado.',
          'Población con arraigo comunitario en torno a quebradas y senderos veredales.',
          'Políticas activas de protección de microcuencas y prevención de deslizamientos.'
        ],
        geometry3D: {
          height: 0.50,
          icon: 'compass',
          landmarkName: 'Parque Ecoturístico El Salado',
          landmarkPos: [270, 360],
          points: [
            [220, 310], [310, 290], [320, 420], [230, 430]
          ]
        }
      },
      {
        id: 'envigado-rural-palmas-esmeralda',
        municipioId: 'envigado',
        name: 'Zona Rural / Las Palmas - Santa Catalina',
        shortName: 'Z. Rural Las Palmas',
        type: 'Vereda Rural',
        zone: 'Rural',
        color: '#166534',
        coords: [6.150, -75.520],
        populationText: '9.200 hab. (Veredas campestres y páramo)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 9200,
        householdsShareText: '3,8% de los hogares de Envigado',
        householdsSharePercentage: 3.8,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados en suelo rural',
        genderDistributionText: 'Sin datos a nivel rural',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Mixto (campesinos nativos y profesionales en casas campestres).',
        inbiText: 'Sin datos a nivel de veredas',
        inbiBenchmark: 'Suelo de protección y reserva natural del Vallano.',
        strataText: 'Estratos 5 y 6 campestre / 1 y 2 campesino tradicional.',
        predominantStrataNumbers: [1, 5, 6],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales en suelo rural',
          keyLandmarks: ['Corredor Vial Las Palmas', 'Parque Ecológico El Vallano', 'Mirador La Paloma']
        },
        barriosList: [
          { name: 'Las Palmas', hasData: false },
          { name: 'Santa Catalina', hasData: false },
          { name: 'El Vallano', hasData: false },
          { name: 'Pantanillo', hasData: false },
          { name: 'Perico', hasData: false },
          { name: 'Arenales', hasData: false }
        ],
        strategicHighlights: [
          'Corredor vial de alta velocidad entre el Valle de Aburrá y el Oriente Antioqueño.',
          'Reserva Ecológica El Vallano, hábitat de pumas, aves migratorias y flora nativa.',
          'Preservación de fincas de flores, viveros y gastronomía de fin de semana.'
        ],
        geometry3D: {
          height: 0.68,
          icon: 'mountain',
          landmarkName: 'Alto de Las Palmas (Reserva)',
          landmarkPos: [390, 250],
          points: [
            [320, 150], [450, 140], [460, 390], [330, 400]
          ]
        }
      }
    ]
  },

  // =========================================================================
  // 4. SABANETA
  // =========================================================================
  'sabaneta': {
    id: 'sabaneta',
    name: 'Sabaneta',
    fullName: 'Municipio de Sabaneta',
    subregion: 'Valle de Aburrá (Sur)',
    centerCoords: [6.151, -75.616],
    defaultZoom: 14,
    scale3D: 0.030,
    centerX3D: 250,
    centerY3D: 250,
    riverName: 'Río Medellín (Aburrá) - Borde Noroccidental',
    riverPoints3D: [
      [110, 80], [130, 200], [150, 320], [170, 440]
    ],
    areas: [
      {
        id: 'sabaneta-z-centro-betania',
        municipioId: 'sabaneta',
        name: 'Zona Centro / Betania / Casitas',
        shortName: 'Z. Centro',
        type: 'Zona Urbana',
        zone: 'Urbana',
        color: '#F59E0B',
        coords: [6.151, -75.616],
        populationText: '39.500 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 39500,
        householdsShareText: '45,4% de los hogares del municipio',
        householdsSharePercentage: 45.4,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por zona (municipal: 22,5%)',
        genderDistributionText: 'Sin datos por zona',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Medio y Superior.',
        inbiText: 'Sin datos específicos',
        inbiBenchmark: 'Excelente dotación de servicios cívicos.',
        strataText: 'Estratos 3 y 4 tradicionales.',
        predominantStrataNumbers: [3, 4],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por zona',
          keyLandmarks: ['Santuario María Auxiliadora', 'Parque Principal Simón Bolívar', 'Plazoleta Los Platanitos']
        },
        barriosList: [
          { name: 'Centro de Sabaneta', hasData: false },
          { name: 'Betania', hasData: false },
          { name: 'Las Casitas', hasData: false },
          { name: 'Calle Larga', hasData: false },
          { name: 'Playas de María', hasData: false },
          { name: 'San Joaquín', hasData: false }
        ],
        strategicHighlights: [
          'El municipio más pequeño de Colombia (15 km²) pero con una devoción mariana masiva.',
          'Miles de peregrinos los martes al Santuario de María Auxiliadora en el parque central.',
          'Tradición gastronómica en buñuelos gigantes, asados y tabernas tradicionales.'
        ],
        geometry3D: {
          height: 0.42,
          icon: 'church',
          landmarkName: 'Santuario María Auxiliadora',
          landmarkPos: [230, 240],
          points: [
            [160, 180], [280, 170], [290, 300], [170, 310]
          ]
        }
      },
      {
        id: 'sabaneta-z-torres-altura',
        municipioId: 'sabaneta',
        name: 'Zona de Expansión Vertical / Aliadas - Holanda',
        shortName: 'Z. Torres Altura',
        type: 'Zona Urbana',
        zone: 'Urbana',
        color: '#3B82F6',
        coords: [6.155, -75.610],
        populationText: '28.400 hab. (Edificios >20 pisos)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 28400,
        householdsShareText: '32,6% de los hogares de Sabaneta',
        householdsSharePercentage: 32.6,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por zona',
        genderDistributionText: 'Sin datos por zona',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Superior (profesionales jóvenes y tecnólogos).',
        inbiText: 'Sin datos específicos',
        inbiBenchmark: 'Zona de alto valor inmobiliario nuevo.',
        strataText: 'Estratos 3 y 4 en torres cerradas.',
        predominantStrataNumbers: [3, 4],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por zona',
          keyLandmarks: ['Estación Sabaneta del Metro', 'Centro Comercial Mayorca Mega Plaza', 'Complejo Holanda']
        },
        barriosList: [
          { name: 'Aliadas del Sur', hasData: false },
          { name: 'Holanda', hasData: false },
          { name: 'Los Alcázares', hasData: false },
          { name: 'Vegas de San José', hasData: false },
          { name: 'Prados de Sabaneta', hasData: false }
        ],
        strategicHighlights: [
          'Zona de mayor densificación vertical de Antioquia en la última década.',
          'Llegada masiva de familias jóvenes y profesionales que laboran en Medellín.',
          'Desafíos de movilidad y saturación de servicios educativos públicos.'
        ],
        geometry3D: {
          height: 0.48,
          icon: 'building',
          landmarkName: 'Torres Holanda / Mayorca',
          landmarkPos: [230, 110],
          points: [
            [160, 60], [280, 50], [290, 170], [170, 180]
          ]
        }
      },
      {
        id: 'sabaneta-rural-lomas',
        municipioId: 'sabaneta',
        name: 'Zona Veredal y Campestre / Lomitas - Doctora',
        shortName: 'Z. Veredal La Romera',
        type: 'Vereda Rural',
        zone: 'Rural',
        color: '#10B981',
        coords: [6.140, -75.605],
        populationText: '18.300 hab. (Ladera y Reserva La Romera)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 18300,
        householdsShareText: '22,0% de los hogares del municipio',
        householdsSharePercentage: 22.0,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados en suelo veredal',
        genderDistributionText: 'Sin datos a nivel veredal',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Superior y Medio en conjuntos campestres.',
        inbiText: 'Sin datos a nivel de veredas',
        inbiBenchmark: 'Suelo de conservación ecológica en La Romera.',
        strataText: 'Estratos 4, 5 y 6 campestre.',
        predominantStrataNumbers: [4, 5, 6],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales en suelo rural',
          keyLandmarks: ['Parque Ecológico y Reserva La Romera', 'Loma La Doctora', 'Pan de Azúcar']
        },
        barriosList: [
          { name: 'María Auxiliadora', hasData: false },
          { name: 'Las Lomitas', hasData: false },
          { name: 'La Doctora', hasData: false },
          { name: 'San José Vereda', hasData: false },
          { name: 'Cañaveralejo', hasData: false },
          { name: 'Pan de Azúcar', hasData: false }
        ],
        strategicHighlights: [
          'La Reserva Natural La Romera alberga el 40% del territorio municipal con bosques de niebla.',
          'Hábitat del cacique candela y especies endémicas de orquídeas y mariposas.',
          'Equilibrio delicado entre expansión urbanística de estrato alto y protección de nacimientos.'
        ],
        geometry3D: {
          height: 0.60,
          icon: 'trees',
          landmarkName: 'Reserva Ecológica La Romera',
          landmarkPos: [320, 270],
          points: [
            [280, 120], [390, 110], [400, 390], [290, 380]
          ]
        }
      }
    ]
  },

  // =========================================================================
  // 5. LA ESTRELLA
  // =========================================================================
  'la-estrella': {
    id: 'la-estrella',
    name: 'La Estrella',
    fullName: 'Municipio de La Estrella',
    subregion: 'Valle de Aburrá (Sur)',
    centerCoords: [6.158, -75.643],
    defaultZoom: 13,
    scale3D: 0.026,
    centerX3D: 250,
    centerY3D: 250,
    riverName: 'Río Medellín (Aburrá) - Borde Oriental (Ancón)',
    riverPoints3D: [
      [360, 90], [340, 210], [320, 330], [300, 440]
    ],
    areas: [
      {
        id: 'estrella-z-suramerica',
        municipioId: 'la-estrella',
        name: 'Sector Suramérica / San Agustín',
        shortName: 'Z. Suramérica',
        type: 'Zona Urbana',
        zone: 'Urbana',
        color: '#6366F1',
        coords: [6.165, -75.632],
        populationText: '26.500 hab. (Estratos 4, 5 y 6)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 26500,
        householdsShareText: '34,9% de los hogares de La Estrella',
        householdsSharePercentage: 34.9,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por zona (municipal: 23,5%)',
        genderDistributionText: 'Sin datos por zona',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Superior (alta tasa de graduados universitarios).',
        inbiText: 'Sin datos específicos',
        inbiBenchmark: 'Zona residencial de alta capacidad contributiva.',
        strataText: 'Estratos 4, 5 y 6 en condominios cerrados.',
        predominantStrataNumbers: [4, 5, 6],
        incomeLevelText: 'Sin datos desagregados (ingresos medios-altos)',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por zona',
          keyLandmarks: ['Mall Suramérica', 'Estación La Estrella del Metro', 'Colegio Colombo Británico']
        },
        barriosList: [
          { name: 'Suramérica', hasData: false },
          { name: 'San Agustín-Suramérica', hasData: false },
          { name: 'San Agustín-Industrial', hasData: false },
          { name: 'Bavaria', hasData: false }
        ],
        strategicHighlights: [
          'La zona de mayor valorización inmobiliaria del extremo sur del Valle de Aburrá.',
          'Terminal sur del sistema Metro (Estación La Estrella) con miles de usuarios diarios.',
          'Comunidad organizada que exige mejoras en accesos viales y preservación de zonas verdes.'
        ],
        geometry3D: {
          height: 0.44,
          icon: 'building',
          landmarkName: 'Mall Suramérica / Metro',
          landmarkPos: [260, 130],
          points: [
            [200, 80], [310, 70], [320, 180], [210, 190]
          ]
        }
      },
      {
        id: 'estrella-z-centro',
        municipioId: 'la-estrella',
        name: 'Zona Centro / Casco Urbano Tradicional',
        shortName: 'Z. Centro',
        type: 'Zona Urbana',
        zone: 'Urbana',
        color: '#EF4444',
        coords: [6.158, -75.643],
        populationText: '23.400 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 23400,
        householdsShareText: '30,8% de los hogares del municipio',
        householdsSharePercentage: 30.8,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por zona',
        genderDistributionText: 'Sin datos por zona',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Medio y Básico tradicional.',
        inbiText: 'Sin datos a nivel comunal',
        inbiBenchmark: 'Casco histórico con equipamiento completo.',
        strataText: 'Estratos 3 y 4 tradicionales.',
        predominantStrataNumbers: [3, 4],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por zona',
          keyLandmarks: ['Basílica Nuestra Señora de Chiquinquirá', 'Parque Principal de La Estrella', 'Teatro Municipal']
        },
        barriosList: [
          { name: 'Centro', hasData: false },
          { name: 'Centro-Pueblo Viejo', hasData: false },
          { name: 'Juan XXIII', hasData: false },
          { name: 'Las Brisas', hasData: false },
          { name: 'San Cayetano', hasData: false },
          { name: 'Chile', hasData: false }
        ],
        strategicHighlights: [
          'Parque Principal remodelado frente a la monumental Basílica de Chiquinquirá.',
          'Población nativa con arraigo en las Fiestas del Romeral y procesiones religiosas.',
          'Comercio de cercanía y activa agenda cultural en la Casa de la Cultura.'
        ],
        geometry3D: {
          height: 0.40,
          icon: 'church',
          landmarkName: 'Basílica de Chiquinquirá',
          landmarkPos: [180, 220],
          points: [
            [130, 170], [220, 160], [230, 270], [140, 280]
          ]
        }
      },
      {
        id: 'estrella-z-ferreria-ancon',
        municipioId: 'la-estrella',
        name: 'Zona Oriental / Ancón Sur - La Ferrería',
        shortName: 'Z. La Ferrería / Ancón',
        type: 'Zona Urbana',
        zone: 'Urbana',
        color: '#F59E0B',
        coords: [6.145, -75.635],
        populationText: '17.800 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 17800,
        householdsShareText: '23,4% de los hogares de La Estrella',
        householdsSharePercentage: 23.4,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por zona',
        genderDistributionText: 'Sin datos por zona',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico y Técnico industrial.',
        inbiText: 'Sin datos específicos',
        inbiBenchmark: 'Zona de base obrera e industrial ribereña.',
        strataText: 'Estratos 1 y 2 en barrios obreros.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por zona',
          keyLandmarks: ['Antigua Ferrería de Amagá/Ancón', 'Parque Ecológico La Ferrería', 'Corredor Autopista Sur']
        },
        barriosList: [
          { name: 'Ancón Sur', hasData: false },
          { name: 'Ancón San Martín', hasData: false },
          { name: 'La Ferrería', hasData: false },
          { name: 'Bellavista', hasData: false },
          { name: 'Primavera', hasData: false },
          { name: 'Industrial', hasData: false }
        ],
        strategicHighlights: [
          'Memoria histórica siderúrgica de Antioquia en los vestigios de La Ferrería.',
          'Corredor paralelo a la Autopista Sur con grandes plantas manufactureras y bodegas.',
          'Prioridad en generación de empleo juvenil y contención de laderas.'
        ],
        geometry3D: {
          height: 0.36,
          icon: 'factory',
          landmarkName: 'Antigua Ferrería',
          landmarkPos: [270, 290],
          points: [
            [220, 240], [330, 230], [340, 360], [230, 370]
          ]
        }
      },
      {
        id: 'estrella-rural-romeral',
        municipioId: 'la-estrella',
        name: 'Corregimiento / Zona Rural El Romeral',
        shortName: 'Corr. El Romeral',
        type: 'Corregimiento Rural',
        zone: 'Rural',
        color: '#15803D',
        coords: [6.150, -75.670],
        populationText: '8.300 hab. (Reserva Natural El Romeral)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 8300,
        householdsShareText: '10,9% de los hogares del municipio',
        householdsSharePercentage: 10.9,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados a nivel rural',
        genderDistributionText: 'Sin datos a nivel rural',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico campesino.',
        inbiText: 'Sin datos a nivel de veredas',
        inbiBenchmark: 'Suelo de protección hídrica y bosque de niebla.',
        strataText: 'Estratos 1 y 2 campesino.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales en suelo rural',
          keyLandmarks: ['Reserva Natural El Romeral', 'Vereda Pueblo Viejo', 'Laguna del Romeral']
        },
        barriosList: [
          { name: 'Pueblo Viejo', hasData: false },
          { name: 'La Bermejala', hasData: false },
          { name: 'San José', hasData: false },
          { name: 'El Guayabo', hasData: false },
          { name: 'Tarapacá', hasData: false }
        ],
        strategicHighlights: [
          'La Reserva El Romeral es una de las mayores joyas ecológicas del Valle de Aburrá.',
          'Nacimiento de múltiples quebradas que abastecen los acueductos veredales y urbanos.',
          'Pueblo Viejo conserva las primeras huellas fundacionales de La Estrella (1685).'
        ],
        geometry3D: {
          height: 0.64,
          icon: 'trees',
          landmarkName: 'Reserva El Romeral (2.800m)',
          landmarkPos: [70, 240],
          points: [
            [20, 140], [130, 130], [140, 370], [30, 360]
          ]
        }
      }
    ]
  },

  // =========================================================================
  // 6. CALDAS
  // =========================================================================
  'caldas': {
    id: 'caldas',
    name: 'Caldas',
    fullName: 'Municipio de Caldas',
    subregion: 'Valle de Aburrá (Extremo Sur)',
    centerCoords: [6.091, -75.635],
    defaultZoom: 13,
    scale3D: 0.024,
    centerX3D: 250,
    centerY3D: 250,
    riverName: 'Nacimiento del Río Medellín / Aburrá (Alto de San Miguel)',
    riverPoints3D: [
      [270, 430], [260, 320], [250, 220], [240, 110]
    ],
    areas: [
      {
        id: 'caldas-z-centro-urbano',
        municipioId: 'caldas',
        name: 'Zona Centro / Fundadores / La Rivera',
        shortName: 'Z. Centro',
        type: 'Zona Urbana',
        zone: 'Urbana',
        color: '#3B82F6',
        coords: [6.091, -75.635],
        populationText: '29.800 hab. (Estimación oficial)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 29800,
        householdsShareText: '35,5% de los hogares de Caldas',
        householdsSharePercentage: 35.5,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por zona (municipal: 24,2%)',
        genderDistributionText: 'Sin datos por zona',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Medio y Superior.',
        inbiText: 'Sin datos específicos',
        inbiBenchmark: 'Centro urbano con dotación institucional completa.',
        strataText: 'Estratos 3 y 4 en el casco cívico.',
        predominantStrataNumbers: [3, 4],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por zona',
          keyLandmarks: ['Catedral Nuestra Señora de las Mercedes', 'Parque Santander de Caldas', 'Alcaldía Municipal']
        },
        barriosList: [
          { name: 'Zona Centro', hasData: false },
          { name: 'Fundadores', hasData: false },
          { name: 'La Acuarela y/o La Rivera', hasData: false },
          { name: 'Centenario', hasData: false },
          { name: 'Mandalay', hasData: false },
          { name: 'Bellavista', hasData: false }
        ],
        strategicHighlights: [
          'Parque Santander como gran salón cívico al aire libre del sur del Valle de Aburrá.',
          'Catedral de Las Mercedes, joya de la arquitectura religiosa regional.',
          'Polo de servicios bancarios, notariales y comercio minorista para el suroeste cercano.'
        ],
        geometry3D: {
          height: 0.42,
          icon: 'landmark',
          landmarkName: 'Parque Santander / Catedral',
          landmarkPos: [230, 210],
          points: [
            [170, 160], [270, 150], [280, 270], [180, 280]
          ]
        }
      },
      {
        id: 'caldas-z-olaya-andalucia',
        municipioId: 'caldas',
        name: 'Zona Obrera Tradicional / Olaya Herrera - Andalucía',
        shortName: 'Z. Olaya / Andalucía',
        type: 'Zona Urbana',
        zone: 'Urbana',
        color: '#EF4444',
        coords: [6.096, -75.638],
        populationText: '36.200 hab. (La más poblada de Caldas)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 36200,
        householdsShareText: '43,1% de los hogares del municipio',
        householdsSharePercentage: 43.1,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados por zona',
        genderDistributionText: 'Sin datos por zona',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico y Técnico ceramista.',
        inbiText: 'Sin datos específicos',
        inbiBenchmark: 'Zona obrera nacida en torno a la industria de la loza.',
        strataText: 'Estratos 1 y 2 predominantes.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales por zona',
          keyLandmarks: ['Antigua Planta Locería Colombiana', 'Cristo Rey Caldas', 'Sector La Docena']
        },
        barriosList: [
          { name: 'Olaya Herrera', hasData: false },
          { name: 'Andalucía', hasData: false },
          { name: 'La Docena', hasData: false },
          { name: 'Cristo Rey', hasData: false },
          { name: 'La Inmaculada', hasData: false },
          { name: 'Felipe Echavarría 1 y 2', hasData: false },
          { name: 'La Playita', hasData: false }
        ],
        strategicHighlights: [
          'Patrimonio industrial cerámico que le dio a Caldas el título de Capital Alfarera.',
          'Barrios con gran solidaridad comunitaria y arraigo de familias trabajadoras.',
          'Necesidad de oportunidades educativas técnicas para los jóvenes del sector.'
        ],
        geometry3D: {
          height: 0.40,
          icon: 'factory',
          landmarkName: 'Locería Colombiana (Loza)',
          landmarkPos: [230, 110],
          points: [
            [170, 60], [280, 50], [290, 160], [180, 170]
          ]
        }
      },
      {
        id: 'caldas-rural-norte-salada',
        municipioId: 'caldas',
        name: 'Zona Rural Norte / La Salada - La Clara - Quiebra',
        shortName: 'Z. Rural La Salada',
        type: 'Corregimiento Rural',
        zone: 'Rural',
        color: '#10B981',
        coords: [6.075, -75.620],
        populationText: '10.400 hab. (Refugio ecológico La Clara)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 10400,
        householdsShareText: '12,4% de los hogares del municipio',
        householdsSharePercentage: 12.4,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados a nivel rural',
        genderDistributionText: 'Sin datos a nivel rural',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico campesino.',
        inbiText: 'Sin datos a nivel de veredas',
        inbiBenchmark: 'Zona protegida y de ecoturismo de fin de semana.',
        strataText: 'Estratos 1 y 2 campesino.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales en suelo rural',
          keyLandmarks: ['Refugio Natural La Clara', 'Vereda La Chuscala', 'Puente de La Clara']
        },
        barriosList: [
          { name: 'La Salada', hasData: false },
          { name: 'La Clara', hasData: false },
          { name: 'La Quiebra', hasData: false },
          { name: 'La Chuscala', hasData: false },
          { name: 'El Raizal', hasData: false },
          { name: 'Minas', hasData: false },
          { name: 'Aguacatala', hasData: false }
        ],
        strategicHighlights: [
          'La Clara es el tradicional balneario natural donde miles de antioqueños disfrutan del río limpio.',
          'Programas continuos de saneamiento y educación ambiental a visitantes.',
          'Población campesina productora de café de montaña y flores exóticas.'
        ],
        geometry3D: {
          height: 0.55,
          icon: 'waves',
          landmarkName: 'Balneario La Clara',
          landmarkPos: [340, 240],
          points: [
            [280, 160], [390, 150], [400, 330], [290, 340]
          ]
        }
      },
      {
        id: 'caldas-rural-sur-miel',
        municipioId: 'caldas',
        name: 'Zona Rural Sur / La Miel - Primavera - Alto San Miguel',
        shortName: 'Z. Rural Alto San Miguel',
        type: 'Vereda Rural',
        zone: 'Rural',
        color: '#15803D',
        coords: [6.055, -75.640],
        populationText: '8.200 hab. (Nacimiento del Río Medellín)',
        populationExactKnown: false,
        estimatedPopulationNumeric: 8200,
        householdsShareText: '9,8% de los hogares del municipio',
        householdsSharePercentage: 9.8,
        youthSharePercentage: null,
        youthShareText: 'Sin datos desagregados a nivel rural',
        genderDistributionText: 'Sin datos a nivel rural',
        ageGroupsDistributionText: 'Sin datos por rangos completos',
        educationLevelText: 'Nivel Básico campesino.',
        inbiText: 'Sin datos a nivel de veredas',
        inbiBenchmark: 'Santuario de biodiversidad del Alto de San Miguel.',
        strataText: 'Estratos 1 y 2 campesino tradicional.',
        predominantStrataNumbers: [1, 2],
        incomeLevelText: 'Sin datos desagregados',
        specificMetrics: {
          unemploymentRate: null,
          unemploymentNote: 'Sin datos oficiales en suelo rural',
          keyLandmarks: ['Reserva Alto de San Miguel (Cuna del Río Medellín)', 'Vereda La Miel', 'Sector La Corrala']
        },
        barriosList: [
          { name: 'La Miel', hasData: false },
          { name: 'Primavera', hasData: false },
          { name: 'La Corrala', hasData: false },
          { name: 'La Valeria', hasData: false },
          { name: 'Cardalito', hasData: false },
          { name: 'Maní del Cardal', hasData: false },
          { name: 'Salinas', hasData: false },
          { name: 'El 60', hasData: false },
          { name: 'Sinifaná', hasData: false }
        ],
        strategicHighlights: [
          'En el Alto de San Miguel nace el Río Medellín (Aburrá) en aguas cristalinas y puras.',
          'Reserva de biodiversidad que concentra el 16% de las especies de aves de Colombia.',
          'Suelo sagrado de conservación hídrica vigilado por guardabosques de la Alcaldía de Medellín y Caldas.'
        ],
        geometry3D: {
          height: 0.68,
          icon: 'mountain',
          landmarkName: 'Alto de San Miguel (Cuna del Río)',
          landmarkPos: [230, 370],
          points: [
            [170, 290], [290, 280], [300, 440], [180, 450]
          ]
        }
      }
    ]
  },

  // =========================================================================
  // 7. RIONEGRO (Preservando 100% de la información oficial de la ECV 2020)
  // =========================================================================
  'rionegro': {
    id: 'rionegro',
    name: 'Rionegro',
    fullName: 'Municipio de Rionegro',
    subregion: 'Oriente Antioqueño (Altiplano)',
    centerCoords: [6.155, -75.374],
    defaultZoom: 12,
    scale3D: 0.026,
    centerX3D: 280,
    centerY3D: 325,
    riverName: 'Río Negro',
    riverPoints3D: [
      [140, 280], [200, 270], [260, 290], [320, 280], [360, 260], [420, 280]
    ],
    areas: Object.values(RIONEGRO_COMMUNE_DETAILED_PROFILES).map((p) => {
      const geom = RIONEGRO_REAL_SECTORS[p.id] || {
        height: 0.4,
        icon: 'map-pin',
        landmarkName: p.name,
        landmarkPos: [250, 250],
        points: [[200, 200], [300, 200], [300, 300], [200, 300]]
      };

      // Extract coords
      const coordsMap: Record<string, [number, number]> = {
        'rionegro-c1-liborio': [6.154, -75.374],
        'rionegro-c2-san-antonio': [6.138, -75.368],
        'rionegro-c3-alfonso-uribe': [6.148, -75.358],
        'rionegro-c4-porvenir': [6.155, -75.390],
        'rionegro-corr-sur': [6.115, -75.380],
        'rionegro-corr-norte': [6.200, -75.350],
        'rionegro-corr-centro': [6.175, -75.385],
        'rionegro-corr-jose-maria-cordova': [6.168, -75.420]
      };

      return {
        id: p.id,
        municipioId: 'rionegro',
        name: p.name,
        shortName: p.shortName,
        type: p.type,
        zone: p.zone,
        color: p.color,
        coords: coordsMap[p.id] || [6.155, -75.374],
        populationText: p.populationText,
        populationExactKnown: p.populationExactKnown,
        estimatedPopulationNumeric: p.estimatedPopulationNumeric,
        householdsShareText: p.householdsShareText || 'Sin datos de hogares',
        householdsSharePercentage: p.householdsSharePercentage ?? null,
        youthSharePercentage: p.youthSharePercentage,
        youthShareText: p.youthShareText,
        estimatedYouthCount: p.estimatedYouthCount,
        genderDistributionText: p.genderDistributionText,
        ageGroupsDistributionText: p.ageGroupsDistributionText,
        educationLevelText: p.educationLevelText,
        inbiText: p.inbiText,
        inbiBenchmark: p.inbiBenchmark,
        strataText: p.strataText,
        predominantStrataNumbers: p.predominantStrataNumbers,
        incomeLevelText: p.incomeLevelText,
        specificMetrics: {
          unemploymentRate: p.specificMetrics.unemploymentRate ?? null,
          unemploymentNote: p.specificMetrics.unemploymentNote || 'Sin datos oficiales',
          keyLandmarks: p.specificMetrics.keyLandmarks || []
        },
        barriosList: p.youthDistributionInSectors.map(s => ({
          name: s.name,
          percentage: s.percentage,
          note: s.note,
          hasData: true
        })),
        strategicHighlights: p.strategicHighlights,
        geometry3D: {
          height: geom.height,
          icon: geom.icon,
          landmarkName: geom.landmarkName,
          landmarkPos: geom.landmarkPos,
          points: geom.points,
          innerLines: 'innerLines' in geom ? (geom as any).innerLines : undefined
        }
      };
    })
  }
};

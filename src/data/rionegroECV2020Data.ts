/**
 * Base de Conocimiento Oficial: Encuesta de Calidad de Vida (ECV) 2020 - Rionegro
 * Fuente: Observatorio de Políticas Públicas de Rionegro (OPP) - Alcaldía de Rionegro
 * "Informe de análisis de datos para la toma de decisiones: Juventud y Demografía"
 */

export interface AgeGenderPyramidRow {
  ageGroup: string;
  menPct: number;
  womenPct: number;
  totalPct: number;
  menCount: number;
  womenCount: number;
  totalCount: number;
}

export interface CommuneDistributionRow {
  id: string;
  name: string;
  type: 'Comuna (Urbana)' | 'Corregimiento (Rural)';
  color: string;
  percentage: number;
  estimatedPopulation: number;
  stratumDominant: string;
}

export interface NeighborhoodDistributionRow {
  barrio: string;
  percentage: number;
  estimatedYouthCount: number;
}

export interface VeredaDistributionRow {
  vereda: string;
  corregimiento: string;
  percentage: number;
  estimatedYouthCount: number;
}

export interface StratumDistributionRow {
  stratum: string;
  percentage: number;
  count: number;
  color: string;
}

export interface LaborByAgeRow {
  ageRange: string;
  tasaDesempleo: number;
  tasaOcupacion: number;
  tgp: number; // Tasa Global de Participación
  pctPEA: number;
}

export const RIONEGRO_ECV_2020 = {
  metadata: {
    source: "Observatorio de Políticas Públicas de Rionegro (OPP) & Alcaldía de Rionegro",
    study: "Encuesta de Calidad de Vida (ECV) 2020 - Informe de Juventud y Demografía",
    totalPopulation: 142995,
    youthPopulation: 32207, // 14 a 28 años (22.52% de la población total)
    urbanDistributionPct: 61.7,
    ruralDistributionPct: 38.3,
    laborIndicatorsMunicipal: {
      pet: 126668, // Población en Edad de Trabajar
      pea: 72195,  // Población Económicamente Activa
      tbp: 50.6,   // Tasa Bruta de Participación (%)
      tgp: 57.0,   // Tasa Global de Participación (%)
      tasaOcupacion: 50.7, // (%)
      tasaDesempleo: 8.4   // (%)
    }
  },

  // 1. Pirámide poblacional por género y edad (Figura 1, pág 7)
  // Total población = 142,995
  ageGenderPyramid: [
    { ageGroup: '0-4 años', menPct: 2.25, womenPct: 2.35, totalPct: 4.60, menCount: 3217, womenCount: 3360, totalCount: 6577 },
    { ageGroup: '5-9 años', menPct: 2.49, womenPct: 2.84, totalPct: 5.33, menCount: 3561, womenCount: 4061, totalCount: 7622 },
    { ageGroup: '10-14 años', menPct: 3.13, womenPct: 2.81, totalPct: 5.94, menCount: 4476, womenCount: 4018, totalCount: 8494 },
    { ageGroup: '15-19 años', menPct: 3.15, womenPct: 3.64, totalPct: 6.79, menCount: 4504, womenCount: 5205, totalCount: 9709 },
    { ageGroup: '20-24 años', menPct: 3.92, womenPct: 4.33, totalPct: 8.25, menCount: 5605, womenCount: 6192, totalCount: 11797 },
    { ageGroup: '25-29 años', menPct: 3.66, womenPct: 4.08, totalPct: 7.74, menCount: 5234, womenCount: 5834, totalCount: 11068 },
    { ageGroup: '30-34 años', menPct: 3.63, womenPct: 3.68, totalPct: 7.31, menCount: 5191, womenCount: 5262, totalCount: 10453 },
    { ageGroup: '35-39 años', menPct: 3.41, womenPct: 3.72, totalPct: 7.13, menCount: 4876, womenCount: 5319, totalCount: 10195 },
    { ageGroup: '40-44 años', menPct: 3.48, womenPct: 3.72, totalPct: 7.20, menCount: 4976, womenCount: 5319, totalCount: 10295 },
    { ageGroup: '45-49 años', menPct: 2.93, womenPct: 3.36, totalPct: 6.29, menCount: 4189, womenCount: 4805, totalCount: 8994 },
    { ageGroup: '50-54 años', menPct: 3.33, womenPct: 3.65, totalPct: 6.98, menCount: 4762, womenCount: 5219, totalCount: 9981 },
    { ageGroup: '55-59 años', menPct: 2.75, womenPct: 4.18, totalPct: 6.93, menCount: 3932, womenCount: 5977, totalCount: 9909 },
    { ageGroup: '60-64 años', menPct: 2.82, womenPct: 3.37, totalPct: 6.19, menCount: 4032, womenCount: 4819, totalCount: 8851 },
    { ageGroup: '65-69 años', menPct: 2.08, womenPct: 2.63, totalPct: 4.71, menCount: 2974, womenCount: 3761, totalCount: 6735 },
    { ageGroup: '70-74 años', menPct: 1.34, womenPct: 1.98, totalPct: 3.32, menCount: 1916, womenCount: 2831, totalCount: 4747 },
    { ageGroup: '75-79 años', menPct: 1.17, womenPct: 1.37, totalPct: 2.54, menCount: 1673, womenCount: 1959, totalCount: 3632 },
    { ageGroup: '80-84 años', menPct: 0.84, womenPct: 0.90, totalPct: 1.74, menCount: 1201, womenCount: 1287, totalCount: 2488 },
    { ageGroup: '85-89 años', menPct: 0.26, womenPct: 0.48, totalPct: 0.74, menCount: 372, womenCount: 686, totalCount: 1058 },
    { ageGroup: '90-94 años', menPct: 0.05, womenPct: 0.18, totalPct: 0.23, menCount: 71, womenCount: 257, totalCount: 328 },
    { ageGroup: '95+ años', menPct: 0.04, womenPct: 0.02, totalPct: 0.06, menCount: 57, womenCount: 29, totalCount: 86 },
  ] as AgeGenderPyramidRow[],

  // Agrupación de género consolidada
  genderSummary: [
    { name: 'Mujeres', percentage: 52.3, count: 74786, color: '#E03185' },
    { name: 'Hombres', percentage: 47.7, count: 68209, color: '#1E3A5F' }
  ],

  // Distribución urbano vs rural global
  zoneDistribution: [
    { name: 'Zona Urbana (4 Comunas)', percentage: 61.7, count: 88228, color: '#2563EB' },
    { name: 'Zona Rural (4 Corregimientos)', percentage: 38.3, count: 54767, color: '#16A34A' }
  ],

  // 2. Distribución poblacional por Comuna y Corregimiento (Figura 4, pág 10)
  communeDistribution: [
    {
      id: 'rionegro-c1-liborio',
      name: 'Comuna 1 - Liborio Mejía',
      type: 'Comuna (Urbana)',
      color: '#E03185',
      percentage: 20.9,
      estimatedPopulation: 29886,
      stratumDominant: 'Medio (3-4)'
    },
    {
      id: 'rionegro-c4-porvenir',
      name: 'Comuna 4 - El Porvenir',
      type: 'Comuna (Urbana)',
      color: '#F97316',
      percentage: 16.0,
      estimatedPopulation: 22879,
      stratumDominant: 'Medio (3-4)'
    },
    {
      id: 'rionegro-c3-alfonso-uribe',
      name: 'Comuna 3 - Alfonso Uribe Jaramillo',
      type: 'Comuna (Urbana)',
      color: '#00BCD4',
      percentage: 15.6,
      estimatedPopulation: 22307,
      stratumDominant: 'Bajo (1-2)'
    },
    {
      id: 'rionegro-corr-sur',
      name: 'Corregimiento Sur (Gilberto Echeverri)',
      type: 'Corregimiento (Rural)',
      color: '#48BB28',
      percentage: 12.0,
      estimatedPopulation: 17159,
      stratumDominant: 'Medio (3-4)'
    },
    {
      id: 'rionegro-corr-norte',
      name: 'Corregimiento Norte (Néstor Esteban Sanínt)',
      type: 'Corregimiento (Rural)',
      color: '#5DADE2',
      percentage: 11.5,
      estimatedPopulation: 16444,
      stratumDominant: 'Bajo (1-2)'
    },
    {
      id: 'rionegro-corr-centro',
      name: 'Corregimiento Centro (Casimiro García)',
      type: 'Corregimiento (Rural)',
      color: '#F5B025',
      percentage: 11.4,
      estimatedPopulation: 16301,
      stratumDominant: 'Medio (3-4)'
    },
    {
      id: 'rionegro-c2-san-antonio',
      name: 'Comuna 2 - San Antonio',
      type: 'Comuna (Urbana)',
      color: '#2B4CD3',
      percentage: 9.3,
      estimatedPopulation: 13299,
      stratumDominant: 'Medio-Alto (3-5)'
    },
    {
      id: 'rionegro-corr-jose-maria-cordova',
      name: 'Corregimiento J.M. Córdova Muñoz',
      type: 'Corregimiento (Rural)',
      color: '#1E3A5F',
      percentage: 3.4,
      estimatedPopulation: 4862,
      stratumDominant: 'Alto (5-6)'
    }
  ] as CommuneDistributionRow[],

  // 3. Distribución por estrato socioeconómico (Figura 5, pág 11)
  stratumDistribution: [
    { stratum: 'Estrato 1', percentage: 9.1, count: 13013, color: '#EF4444' },
    { stratum: 'Estrato 2', percentage: 17.1, count: 24452, color: '#F59E0B' },
    { stratum: 'Estrato 3', percentage: 45.5, count: 65063, color: '#10B981' },
    { stratum: 'Estrato 4', percentage: 22.1, count: 31602, color: '#06B6D4' },
    { stratum: 'Estrato 5', percentage: 4.2, count: 6006, color: '#3B82F6' },
    { stratum: 'Estrato 6', percentage: 2.0, count: 2860, color: '#8B5CF6' }
  ] as StratumDistributionRow[],

  // 4. Distribución en zona urbana según barrio (Figura 6, pág 12)
  urbanNeighborhoods: [
    { barrio: 'El Porvenir', percentage: 15.9, estimatedYouthCount: 3160 },
    { barrio: 'Cuatro Esquinas', percentage: 8.6, estimatedYouthCount: 1709 },
    { barrio: 'Alto del Medio', percentage: 8.5, estimatedYouthCount: 1689 },
    { barrio: 'San Antonio', percentage: 7.6, estimatedYouthCount: 1510 },
    { barrio: 'Santa Ana', percentage: 7.1, estimatedYouthCount: 1411 },
    { barrio: 'El Hospital', percentage: 6.0, estimatedYouthCount: 1192 },
    { barrio: 'Belchite', percentage: 3.3, estimatedYouthCount: 656 },
    { barrio: 'El Centro', percentage: 3.2, estimatedYouthCount: 636 },
    { barrio: 'El Faro', percentage: 1.1, estimatedYouthCount: 219 },
    { barrio: 'Gualanday', percentage: 0.6, estimatedYouthCount: 119 }
  ] as NeighborhoodDistributionRow[],

  // 5. Distribución en zona rural según vereda (Figura 7, pág 13)
  ruralVeredasTop: [
    { vereda: 'Cabeceras de Llanogrande', corregimiento: 'Sur', percentage: 4.7, estimatedYouthCount: 580 },
    { vereda: 'Abreo', corregimiento: 'Centro', percentage: 3.6, estimatedYouthCount: 444 },
    { vereda: 'Cuchillas de San José', corregimiento: 'Centro', percentage: 2.7, estimatedYouthCount: 333 },
    { vereda: 'La Mosca', corregimiento: 'Norte', percentage: 2.3, estimatedYouthCount: 284 },
    { vereda: 'La Laja', corregimiento: 'Norte', percentage: 2.2, estimatedYouthCount: 271 },
    { vereda: 'Santa Bárbara', corregimiento: 'Norte', percentage: 2.0, estimatedYouthCount: 247 },
    { vereda: 'Galicia', corregimiento: 'Norte', percentage: 1.8, estimatedYouthCount: 222 },
    { vereda: 'Los Pinos', corregimiento: 'Norte', percentage: 1.7, estimatedYouthCount: 210 },
    { vereda: 'Mampuesto', corregimiento: 'Centro', percentage: 1.3, estimatedYouthCount: 160 },
    { vereda: 'Tres Puertas', corregimiento: 'Sur', percentage: 1.3, estimatedYouthCount: 160 },
    { vereda: 'El Carmín', corregimiento: 'Centro', percentage: 1.3, estimatedYouthCount: 160 },
    { vereda: 'Abreíto', corregimiento: 'Centro', percentage: 1.2, estimatedYouthCount: 148 },
    { vereda: 'El Tablazo', corregimiento: 'J.M. Córdova', percentage: 1.0, estimatedYouthCount: 123 },
    { vereda: 'Santa Ana Rural', corregimiento: 'Sur', percentage: 1.0, estimatedYouthCount: 123 },
    { vereda: 'El Rosal', corregimiento: 'Sur', percentage: 1.0, estimatedYouthCount: 123 },
    { vereda: 'Pontezuela', corregimiento: 'Sur', percentage: 0.9, estimatedYouthCount: 111 },
    { vereda: 'Playa Rica - Ranchería', corregimiento: 'J.M. Córdova', percentage: 0.7, estimatedYouthCount: 86 },
    { vereda: 'Chachafruto', corregimiento: 'Centro', percentage: 0.7, estimatedYouthCount: 86 },
    { vereda: 'El Higuerón', corregimiento: 'Sur', percentage: 0.6, estimatedYouthCount: 74 },
    { vereda: 'Santa Teresa', corregimiento: 'Sur', percentage: 0.6, estimatedYouthCount: 74 },
    { vereda: 'Barro Blanco', corregimiento: 'Centro', percentage: 0.6, estimatedYouthCount: 74 },
    { vereda: 'Cimarronas', corregimiento: 'Norte', percentage: 0.6, estimatedYouthCount: 74 }
  ] as VeredaDistributionRow[],

  // 6. Indicadores del mercado laboral por rangos de edad (Figuras 18, 21, 22)
  laborIndicatorsByAge: [
    { ageRange: '14 a 17 años', tasaDesempleo: 10.7, tasaOcupacion: 7.2, tgp: 8.8, pctPEA: 0.8 },
    { ageRange: '18 a 28 años', tasaDesempleo: 14.1, tasaOcupacion: 59.2, tgp: 71.5, pctPEA: 25.1 },
    { ageRange: '29 a 35 años', tasaDesempleo: 6.0, tasaOcupacion: 77.7, tgp: 84.2, pctPEA: 16.9 },
    { ageRange: '36 a 42 años', tasaDesempleo: 6.4, tasaOcupacion: 72.7, tgp: 79.4, pctPEA: 16.2 },
    { ageRange: '43 a 49 años', tasaDesempleo: 4.9, tasaOcupacion: 72.2, tgp: 78.5, pctPEA: 13.7 },
    { ageRange: '50 años o más', tasaDesempleo: 6.2, tasaOcupacion: 36.8, tgp: 41.0, pctPEA: 27.1 }
  ] as LaborByAgeRow[],

  // 7. Hallazgos estratégicos del Observatorio (Conclusiones, pág 38)
  keyTakeaways: [
    "La mayor concentración poblacional urbana se localiza en la Comuna 1 Liborio Mejía (20.9%) y la Comuna 4 El Porvenir (16.0%).",
    "El 61.7% de la población joven reside en la zona urbana, mientras que el 38.3% habita en los 4 corregimientos rurales.",
    "El 45.5% de la población se clasifica en estrato 3, seguido del estrato 4 (22.1%) y estrato 2 (17.1%). Los estratos 5 y 6 suman el 6.2%, concentrados en Llanogrande y San Antonio.",
    "La pirámide demográfica muestra su mayor ensanchamiento entre los 20 y 29 años (15.99% del total), con predominio de mujeres en edad productiva (52.3% vs 47.7% hombres).",
    "El desempleo juvenil (18-28 años) asciende al 14.1%, significativamente superior al promedio municipal general del 8.4%.",
    "En zona rural, la vereda más poblada es Cabeceras de Llanogrande (4.7% de los jóvenes), seguida de Abreo (3.6%) y Cuchillas de San José (2.7%).",
    "El 80.1% de los jóvenes adultos son solteros y el 11.3% vive en unión libre.",
    "En educación, el 50.57% de los jóvenes terminaron la educación media, el 14.42% formación técnica y el 9.27% universitaria."
  ]
};

/**
 * Perfiles Detallados Oficiales por Comuna y Corregimiento
 * Incorpora la desagregación de la Encuesta de Calidad de Vida (OPP Rionegro)
 * y fuentes oficiales de Gobernación / Sisbén IV / Planeación Municipal.
 */
export interface DetailedCommuneProfile {
  id: string;
  name: string;
  shortName: string;
  type: 'Comuna Urbana' | 'Corregimiento Rural';
  zone: 'Urbana' | 'Rural';
  color: string;
  
  // Población y hogares
  populationText: string;
  populationExactKnown: boolean;
  estimatedPopulationNumeric?: number;
  householdsShareText?: string;
  householdsSharePercentage?: number;
  
  // Juventud (14 a 28 años)
  youthSharePercentage: number;
  youthShareText: string;
  estimatedYouthCount: number;
  
  // Demografía & Sexo
  genderDistributionText: string;
  ageGroupsDistributionText: string;
  
  // Educación & Pobreza / INBI
  educationLevelText: string;
  inbiText: string;
  inbiBenchmark: string;
  
  // Estratos & Ingresos
  strataText: string;
  predominantStrataNumbers: number[];
  incomeLevelText: string;
  
  // Indicadores específicos y dinámicas
  specificMetrics: {
    unemploymentRate?: number;
    unemploymentNote?: string;
    longTermUnemploymentRate?: number;
    longTermUnemploymentNote?: string;
    areaKm2?: number;
    keyLandmarks?: string[];
  };
  
  // Desglose de barrios o veredas con peso porcentual juvenil
  youthDistributionInSectors: Array<{
    name: string;
    percentage: number;
    highlight?: boolean;
    note?: string;
  }>;
  
  strategicHighlights: string[];
}

export const RIONEGRO_COMMUNE_DETAILED_PROFILES: Record<string, DetailedCommuneProfile> = {
  'rionegro-c1-liborio': {
    id: 'rionegro-c1-liborio',
    name: 'Comuna 1: Liborio Mejía',
    shortName: 'C1 Liborio Mejía',
    type: 'Comuna Urbana',
    zone: 'Urbana',
    color: '#E03185',
    populationText: 'Sin datos absolutos exactos (estimación censo ~29.886 hab.)',
    populationExactKnown: false,
    estimatedPopulationNumeric: 29886,
    householdsShareText: '20,8% de los hogares del municipio (ECV - OPP Rionegro)',
    householdsSharePercentage: 20.8,
    youthSharePercentage: 20.9,
    youthShareText: '20,9% de los jóvenes de 14 a 28 años de Rionegro',
    estimatedYouthCount: 6731,
    genderDistributionText: 'Sin datos a nivel de comuna desagregados (promedio municipal: 50,8% mujeres, 49,2% hombres).',
    ageGroupsDistributionText: 'Sin datos por rangos completos; alberga al 20,9% del grupo municipal de 14 a 28 años.',
    educationLevelText: 'Sin datos a nivel de comuna desagregados.',
    inbiText: 'Sin datos a nivel de comuna.',
    inbiBenchmark: 'Para toda la cabecera urbana el INBI se ubica entre 3,3% y 4,5% (DANE/ECV).',
    strataText: 'Sin datos desagregados por comuna (zona tradicional dominada por estratos 2 y 3).',
    predominantStrataNumbers: [2, 3],
    incomeLevelText: 'Sin datos desagregados por comuna.',
    specificMetrics: {
      unemploymentRate: 10.4,
      unemploymentNote: 'Registró la tasa de desempleo más alta de la ciudad con un 10,4% en su fuerza laboral (ECV 2020).',
      keyLandmarks: ['Centro Histórico', 'Plaza de la Libertad', 'Hospital San Juan de Dios', 'Parque de La Pola']
    },
    youthDistributionInSectors: [
      { name: 'Alto del Medio', percentage: 8.5, highlight: true, note: '8,5% de la juventud urbana' },
      { name: 'El Hospital', percentage: 6.0, highlight: true, note: '6,0% de la juventud urbana' },
      { name: 'Belchite', percentage: 3.3, note: '3,3% de la juventud urbana' },
      { name: 'El Centro', percentage: 3.2, note: '3,2% de la juventud urbana' }
    ],
    strategicHighlights: [
      'Concentra la mayor cuota de hogares urbanos (20,8%) y juventud (20,9%) del municipio.',
      'Tasa de desempleo más alta de la ciudad: 10,4% (frente a 8,4% promedio municipal).',
      'Barrio Alto del Medio es el segundo barrio individual con más jóvenes de la cabecera (8,5%).'
    ]
  },

  'rionegro-c2-san-antonio': {
    id: 'rionegro-c2-san-antonio',
    name: 'Comuna 2: San Antonio de Pereira',
    shortName: 'C2 San Antonio',
    type: 'Comuna Urbana',
    zone: 'Urbana',
    color: '#2B4CD3',
    populationText: 'Sin datos consolidados específicos para la comuna (~13.299 hab. estimación global)',
    populationExactKnown: false,
    estimatedPopulationNumeric: 13299,
    householdsShareText: 'Participación urbana consolidada en crecimiento residencial y turístico',
    householdsSharePercentage: 9.3,
    youthSharePercentage: 9.3,
    youthShareText: '9,3% de la población juvenil del municipio',
    estimatedYouthCount: 2995,
    genderDistributionText: 'Sin datos a nivel de comuna desagregados.',
    ageGroupsDistributionText: 'Sin datos por rangos completos; concentra el 9,3% del grupo de 14 a 28 años.',
    educationLevelText: 'Sin datos a nivel de comuna desagregados.',
    inbiText: 'Sin datos a nivel de comuna.',
    inbiBenchmark: 'Bajo índice de NBI; predominan desarrollos inmobiliarios modernos.',
    strataText: 'Sin datos desagregados por comuna (predominan estratos 3, 4 y 5).',
    predominantStrataNumbers: [3, 4, 5],
    incomeLevelText: 'Sin datos desagregados por comuna.',
    specificMetrics: {
      longTermUnemploymentRate: 46.9,
      longTermUnemploymentNote: 'El 46,9% de los hogares desocupados en este sector reportan desempleo de larga duración (ECV 2020).',
      keyLandmarks: ['Parque de San Antonio de Pereira', 'Zona Gastronómica de Postres', 'Sector El Faro', 'Gualanday']
    },
    youthDistributionInSectors: [
      { name: 'Casco Urbano San Antonio', percentage: 7.6, highlight: true, note: '7,6% de los jóvenes urbanos de Rionegro' },
      { name: 'El Faro', percentage: 1.1, note: '1,1% de los jóvenes urbanos' },
      { name: 'Gualanday', percentage: 0.6, note: '0,6% de los jóvenes urbanos' }
    ],
    strategicHighlights: [
      'Alerta crítica en empleo: el 46,9% de los hogares sin empleo padecen desocupación de larga duración.',
      'El casco urbano de San Antonio concentra de forma directa el 7,6% de la juventud urbana.',
      'Comuna de perfil turístico, comercial y residencial con estratos 3, 4 y 5.'
    ]
  },

  'rionegro-c3-alfonso-uribe': {
    id: 'rionegro-c3-alfonso-uribe',
    name: 'Comuna 3: Monseñor Alfonso Uribe Jaramillo',
    shortName: 'C3 Alfonso Uribe J.',
    type: 'Comuna Urbana',
    zone: 'Urbana',
    color: '#00BCD4',
    populationText: 'Sin datos absolutos específicos (~22.307 hab. estimación cuota territorial)',
    populationExactKnown: false,
    estimatedPopulationNumeric: 22307,
    householdsShareText: 'Alta densidad urbana residencial en estratos 2 y 3',
    householdsSharePercentage: 15.6,
    youthSharePercentage: 15.6,
    youthShareText: '15,6% de los jóvenes del municipio',
    estimatedYouthCount: 5024,
    genderDistributionText: 'Sin datos a nivel de comuna desagregados.',
    ageGroupsDistributionText: 'Sin datos por rangos completos; representa el 15,6% del rango de 14 a 28 años.',
    educationLevelText: 'Sin datos a nivel de comuna desagregados.',
    inbiText: 'Sin datos a nivel de comuna.',
    inbiBenchmark: 'Zona urbana popular densa con requerimientos de equipamientos barriales.',
    strataText: 'Sin datos desagregados por comuna (predominan estratos 2 y 3).',
    predominantStrataNumbers: [2, 3],
    incomeLevelText: 'Sin datos desagregados por comuna.',
    specificMetrics: {
      keyLandmarks: ['Cuatro Esquinas', 'Santa Ana', 'Quebrada Arriba', 'La Esperanza', 'Polideportivo']
    },
    youthDistributionInSectors: [
      { name: 'Cuatro Esquinas', percentage: 8.6, highlight: true, note: '8,6% de los jóvenes de la cabecera urbana' },
      { name: 'Santa Ana', percentage: 7.1, highlight: true, note: '7,1% de los jóvenes de la cabecera urbana' }
    ],
    strategicHighlights: [
      'Sector de alta densidad habitacional que agrupa al 15,6% de toda la juventud municipal.',
      'Cuatro Esquinas (8,6%) y Santa Ana (7,1%) son dos de los barrios populares más poblados de Rionegro.',
      'Predominio claro de estratos 2 y 3 con necesidad de empleo juvenil y espacios de recreación.'
    ]
  },

  'rionegro-c4-porvenir': {
    id: 'rionegro-c4-porvenir',
    name: 'Comuna 4: El Porvenir',
    shortName: 'C4 El Porvenir',
    type: 'Comuna Urbana',
    zone: 'Urbana',
    color: '#F97316',
    populationText: '24.064 habitantes en mediciones de planeación urbana local (Alcaldía de Rionegro)',
    populationExactKnown: true,
    estimatedPopulationNumeric: 24064,
    householdsShareText: '27,2% de los hogares urbanos del municipio',
    householdsSharePercentage: 27.2,
    youthSharePercentage: 16.0,
    youthShareText: '16,0% de los jóvenes del municipio',
    estimatedYouthCount: 5153,
    genderDistributionText: 'Sin datos a nivel de comuna desagregados.',
    ageGroupsDistributionText: 'Sin datos por rangos completos; el barrio El Porvenir de forma individual es la zona con mayor concentración de juventud urbana (15,9%).',
    educationLevelText: 'Sin datos a nivel de comuna desagregados; polo de instituciones de educación superior.',
    inbiText: 'Sin datos a nivel de comuna.',
    inbiBenchmark: 'Excelente dotación de infraestructura urbana y servicios públicos.',
    strataText: 'Sin datos desagregados por comuna (predominan estratos 3 y 4).',
    predominantStrataNumbers: [3, 4],
    incomeLevelText: 'Sin datos desagregados por comuna.',
    specificMetrics: {
      keyLandmarks: ['Universidad de Antioquia (Sede Oriente)', 'Estadio Alberto Grisales', 'Coliseo Iván Ramiro Córdoba', 'Fontibón']
    },
    youthDistributionInSectors: [
      { name: 'Barrio El Porvenir', percentage: 15.9, highlight: true, note: 'Mayor concentración individual de juventud urbana de Rionegro (15,9%)' },
      { name: 'Fontibón / San Joaquín', percentage: 3.5, note: 'Sectores residenciales consolidados' },
      { name: 'Barro Blanco Urbano', percentage: 2.1, note: 'Zona en expansión residencial' }
    ],
    strategicHighlights: [
      'Población oficial certificada: 24.064 habitantes (27,2% de los hogares urbanos de Rionegro).',
      'El barrio El Porvenir de forma individual tiene la mayor concentración de jóvenes de la ciudad (15,9%).',
      'Principal polo de equipamiento deportivo municipal y sede de educación superior (Campus UdeA).'
    ]
  },

  'rionegro-corr-sur': {
    id: 'rionegro-corr-sur',
    name: 'Corregimiento Sur (Gilberto Echeverri Mejía)',
    shortName: 'Corr. Sur (G. Echeverri)',
    type: 'Corregimiento Rural',
    zone: 'Rural',
    color: '#48BB28',
    populationText: '15.166 habitantes según el portal oficial de la Gobernación de Antioquia (base Sisbén IV)',
    populationExactKnown: true,
    estimatedPopulationNumeric: 15166,
    householdsShareText: 'Corregimiento rural más poblado del municipio',
    householdsSharePercentage: 12.0,
    youthSharePercentage: 12.0,
    youthShareText: '12,0% de los jóvenes de Rionegro',
    estimatedYouthCount: 3865,
    genderDistributionText: 'Sin datos por corregimiento.',
    ageGroupsDistributionText: 'Sin datos por rangos completos; alberga el 12,0% de los jóvenes del municipio.',
    educationLevelText: 'Sin datos a nivel de corregimiento.',
    inbiText: 'Sin datos por corregimiento.',
    inbiBenchmark: 'A nivel rural total, el NBI se ubica en 8,0% según DANE/ECV.',
    strataText: 'Sin datos por corregimiento (conviven viviendas campesinas tradicionales en estratos 2–3 con parcelaciones campestres de estratos 4 a 6).',
    predominantStrataNumbers: [2, 3, 4, 5, 6],
    incomeLevelText: 'Sin datos por corregimiento.',
    specificMetrics: {
      keyLandmarks: ['Cabeceras de Llanogrande', 'Tres Puertas', 'Mall Complex Llanogrande', 'Vía Don Diego - Rionegro']
    },
    youthDistributionInSectors: [
      { name: 'Cabeceras de Llanogrande', percentage: 4.7, highlight: true, note: '4,7% de la juventud rural de Rionegro (Vereda rural #1)' },
      { name: 'Tres Puertas', percentage: 1.3, note: '1,3% de la juventud rural' },
      { name: 'Santa Ana Rural', percentage: 1.0, note: '1,0% de la juventud rural' },
      { name: 'El Rosal', percentage: 1.0, note: '1,0% de la juventud rural' },
      { name: 'Pontezuela', percentage: 0.9, note: '0,9% de la juventud rural' },
      { name: 'El Higuerón / Santa Teresa', percentage: 0.6, note: '0,6% de la juventud rural' }
    ],
    strategicHighlights: [
      'Población oficial Sisbén IV: 15.166 habitantes (el corregimiento más poblado de Rionegro).',
      'Cabeceras de Llanogrande es la vereda rural con mayor concentración de juventud del municipio (4,7%).',
      'Marcada dualidad socioeconómica: convivencia de comunidades campesinas tradicionales con parcelaciones de estratos 5 y 6.'
    ]
  },

  'rionegro-corr-norte': {
    id: 'rionegro-corr-norte',
    name: 'Corregimiento Norte (Néstor Esteban Sanínt Arbeláez)',
    shortName: 'Corr. Norte (N.E. Sanínt)',
    type: 'Corregimiento Rural',
    zone: 'Rural',
    color: '#5DADE2',
    populationText: '11.129 habitantes según registros de la Gobernación de Antioquia (base Sisbén IV)',
    populationExactKnown: true,
    estimatedPopulationNumeric: 11129,
    householdsShareText: 'Extensión territorial de 34,8 km² (mayor cuenca agrícola del norte)',
    householdsSharePercentage: 11.5,
    youthSharePercentage: 11.5,
    youthShareText: '11,5% de las personas de 14 a 28 años',
    estimatedYouthCount: 3704,
    genderDistributionText: 'Sin datos por corregimiento.',
    ageGroupsDistributionText: 'Sin datos por rangos completos; congrega el 11,5% de las personas de 14 a 28 años.',
    educationLevelText: 'Sin datos a nivel de corregimiento.',
    inbiText: 'Sin datos por corregimiento.',
    inbiBenchmark: 'NBI rural municipal de referencia: 8,0% (DANE/ECV).',
    strataText: 'Sin datos por corregimiento (predominan estratos 1, 2 y 3).',
    predominantStrataNumbers: [1, 2, 3],
    incomeLevelText: 'Sin datos por corregimiento.',
    specificMetrics: {
      areaKm2: 34.8,
      keyLandmarks: ['La Mosca', 'La Laja', 'Santa Bárbara', 'Galicia', 'Río Abajo', 'Vía hacia Guarne y Marinilla']
    },
    youthDistributionInSectors: [
      { name: 'La Mosca', percentage: 2.3, highlight: true, note: '2,3% de la juventud rural de Rionegro' },
      { name: 'La Laja', percentage: 2.2, highlight: true, note: '2,2% de la juventud rural de Rionegro' },
      { name: 'Santa Bárbara', percentage: 2.0, note: '2,0% de la juventud rural' },
      { name: 'Galicia', percentage: 1.8, note: '1,8% de la juventud rural' },
      { name: 'Los Pinos', percentage: 1.7, note: '1,7% de la juventud rural' },
      { name: 'Cimarronas', percentage: 0.6, note: '0,6% de la juventud rural' }
    ],
    strategicHighlights: [
      'Población oficial Sisbén IV: 11.129 habitantes en un área extensa de 34,8 km².',
      'Veredas con alta juventud rural dispersa: La Mosca (2,3%) y La Laja (2,2%).',
      'Predominancia de estratos 1, 2 y 3 con vocación agropecuaria, floricultura y necesidad de vías terciarias.'
    ]
  },

  'rionegro-corr-centro': {
    id: 'rionegro-corr-centro',
    name: 'Corregimiento Centro (Casimiro García)',
    shortName: 'Corr. Centro (C. García)',
    type: 'Corregimiento Rural',
    zone: 'Rural',
    color: '#F5B025',
    populationText: '10.776 habitantes de acuerdo con la Gobernación de Antioquia (base Sisbén IV)',
    populationExactKnown: true,
    estimatedPopulationNumeric: 10776,
    householdsShareText: 'Menor extensión territorial pero sede de la Zona Franca de Rionegro (46 ha)',
    householdsSharePercentage: 11.4,
    youthSharePercentage: 11.4,
    youthShareText: '11,4% de los habitantes entre 14 y 28 años',
    estimatedYouthCount: 3672,
    genderDistributionText: 'Sin datos por corregimiento.',
    ageGroupsDistributionText: 'Sin datos por rangos completos; concentra el 11,4% de los habitantes entre 14 y 28 años.',
    educationLevelText: 'Sin datos a nivel de corregimiento.',
    inbiText: 'Sin datos por corregimiento.',
    inbiBenchmark: 'NBI rural de referencia: 8,0% (DANE/ECV).',
    strataText: 'Sin datos por corregimiento (predominan estratos 2 y 3).',
    predominantStrataNumbers: [2, 3],
    incomeLevelText: 'Sin datos por corregimiento.',
    specificMetrics: {
      keyLandmarks: ['Zona Franca de Rionegro (46 ha)', 'Vereda Abreo', 'Cuchillas de San José', 'Abreíto', 'Mampuesto']
    },
    youthDistributionInSectors: [
      { name: 'Abreo', percentage: 3.6, highlight: true, note: '3,6% de la juventud rural (2ª vereda rural más poblada)' },
      { name: 'Cuchillas de San José', percentage: 2.7, highlight: true, note: '2,7% de la juventud rural de Rionegro' },
      { name: 'Mampuesto', percentage: 1.3, note: '1,3% de la juventud rural' },
      { name: 'El Carmín', percentage: 1.3, note: '1,3% de la juventud rural' },
      { name: 'Abreíto', percentage: 1.2, note: '1,2% de la juventud rural' },
      { name: 'Barro Blanco Rural', percentage: 0.6, note: '0,6% de la juventud rural' }
    ],
    strategicHighlights: [
      'Población oficial Sisbén IV: 10.776 habitantes y 11,4% de los jóvenes de la ciudad.',
      'Sede del enclave industrial de la Zona Franca de Rionegro (46 hectáreas de parques empresariales).',
      'Veredas Abreo (3,6%) y Cuchillas de San José (2,7%) se ubican en el top 3 de veredas más pobladas del municipio.'
    ]
  },

  'rionegro-corr-jose-maria-cordova': {
    id: 'rionegro-corr-jose-maria-cordova',
    name: 'Corregimiento Occidente (José María Córdova Muñoz)',
    shortName: 'Corr. Occidente (J.M. Córdova)',
    type: 'Corregimiento Rural',
    zone: 'Rural',
    color: '#1E3A5F',
    populationText: '6.530 habitantes según la Gobernación de Antioquia (base Sisbén IV)',
    populationExactKnown: true,
    estimatedPopulationNumeric: 6530,
    householdsShareText: 'Enclave aeroportuario internacional y aeronáutico de Antioquia',
    householdsSharePercentage: 3.4,
    youthSharePercentage: 3.4,
    youthShareText: '3,4% de los jóvenes de Rionegro',
    estimatedYouthCount: 1095,
    genderDistributionText: 'Sin datos por corregimiento.',
    ageGroupsDistributionText: 'Sin datos por rangos completos; representa el 3,4% de la juventud municipal.',
    educationLevelText: 'Sin datos a nivel de corregimiento.',
    inbiText: 'Sin datos por corregimiento.',
    inbiBenchmark: 'NBI rural de referencia: 8,0% (DANE/ECV).',
    strataText: 'Sin datos por corregimiento (conviven parcelaciones campestres con vivienda rural).',
    predominantStrataNumbers: [3, 4, 5, 6],
    incomeLevelText: 'Sin datos por corregimiento.',
    specificMetrics: {
      keyLandmarks: ['Aeropuerto Internacional José María Córdova (MDE)', 'Túnel de Oriente conexión', 'El Tablazo', 'Chachafruto', 'Yarumal']
    },
    youthDistributionInSectors: [
      { name: 'El Tablazo', percentage: 1.0, highlight: true, note: '1,0% de la juventud rural' },
      { name: 'Playa Rica - Ranchería', percentage: 0.7, note: '0,7% de la juventud rural' },
      { name: 'Chachafruto', percentage: 0.7, note: '0,7% de la juventud rural' },
      { name: 'Yarumal / La Quiebra', percentage: 0.5, note: '0,5% de la juventud rural' }
    ],
    strategicHighlights: [
      'Población oficial Sisbén IV: 6.530 habitantes (3,4% de la juventud de Rionegro).',
      'Territorio neurálgico que aloja el Aeropuerto Internacional JMC, talleres aeronáuticos y zona franca aeroportuaria.',
      'Comprende veredas estratégicas como Chachafruto, El Tablazo y Yarumal.'
    ]
  }
};

/**
 * Totales y Promedios Municipales Oficiales de Contraste
 * (ECV 2020, DANE post-COVID y Alcaldía de Rionegro)
 */
export const RIONEGRO_MUNICIPAL_CONTRASTS = {
  population: {
    ecv2020Total: 142995,
    danePostCovidTotal: 146880,
    urbanSharePct: 61.7,
    ruralSharePct: 38.3,
    urbanPopulation: 88228,
    ruralPopulation: 54767
  },

  // Distribución municipal por sexo
  genderMunicipal: [
    { name: 'Mujeres', percentage: 50.8, danePercentage: 50.8, ecvPercentage: 52.3, color: '#E03185' },
    { name: 'Hombres', percentage: 49.2, danePercentage: 49.2, ecvPercentage: 47.7, color: '#1E3A5F' }
  ],

  // Distribución municipal por estratos socioeconómicos
  strataMunicipal: [
    { stratum: 'Estrato 1', percentage: 9.1, color: '#EF4444', label: 'E1: 9,1%' },
    { stratum: 'Estrato 2', percentage: 17.1, color: '#F59E0B', label: 'E2: 17,1%' },
    { stratum: 'Estrato 3', percentage: 45.5, color: '#10B981', label: 'E3: 45,5%' },
    { stratum: 'Estrato 4', percentage: 22.1, color: '#06B6D4', label: 'E4: 22,1%' },
    { stratum: 'Estrato 5', percentage: 4.2, color: '#3B82F6', label: 'E5: 4,2%' },
    { stratum: 'Estrato 6', percentage: 2.0, color: '#8B5CF6', label: 'E6: 2,0%' }
  ],

  // Distribución por nivel educativo (jóvenes 18–28 años)
  youthEducation18to28: [
    { level: 'Media', percentage: 50.57, description: 'Bachillerato completo', color: '#2563EB' },
    { level: 'Técnico', percentage: 14.42, description: 'Formación técnica laboral', color: '#0284C7' },
    { level: 'Secundaria', percentage: 10.09, description: 'Básica secundaria incompleta', color: '#0D9488' },
    { level: 'Universidad', percentage: 9.27, description: 'Pregrado universitario', color: '#7C3AED' },
    { level: 'Tecnológico', percentage: 7.27, description: 'Carrera tecnológica', color: '#EC4899' },
    { level: 'Primaria', percentage: 5.85, description: 'Básica primaria', color: '#F59E0B' },
    { level: 'Postgrado', percentage: 1.27, description: 'Especialización/Maestría', color: '#6366F1' },
    { level: 'Ninguno / Preescolar', percentage: 1.25, description: 'Sin instrucción o solo preescolar', color: '#94A3B8' }
  ],

  illiteracyRate: 1.9,

  // Nivel de ingresos promedio por grupos etarios
  averageIncomeByAge: [
    { ageRange: '14 a 17 años', income: 389546, formatted: '$389.546', color: '#94A3B8' },
    { ageRange: '18 a 28 años', income: 1177140, formatted: '$1.177.140', color: '#3B82F6', isYouth: true },
    { ageRange: '29 a 35 años', income: 1914453, formatted: '$1.914.453', color: '#10B981' },
    { ageRange: '36 a 42 años', income: 1932487, formatted: '$1.932.487', color: '#059669', isPeak: true },
    { ageRange: '43 a 49 años', income: 1765571, formatted: '$1.765.571', color: '#D97706' },
    { ageRange: '50 años o más', income: 1645114, formatted: '$1.645.114', color: '#6366F1' }
  ],

  inbiComparison: {
    cabeceraUrbanaRange: '3,3% a 4,5%',
    ruralTotal: 8.0,
    source: 'DANE / Encuesta de Calidad de Vida (ECV) OPP'
  }
};



import { getMunicipalCensus } from '../services/electoralCensusService';
import { getDaneMunicipio } from '../services/daneMunicipalService';
// Datos político-administrativos, demográficos y electorales consolidados
// para los 7 municipios estratégicos de Antioquia:
// Bello, Itagüí, Envigado, La Estrella, Sabaneta, Caldas y Rionegro.

export interface AreaDivision {
  id: string;
  name: string;
  type: 'Urbana' | 'Rural';
  subtype: 'Comuna' | 'Zona' | 'Corregimiento' | 'Vereda' | 'Sector';
  barriosOrVeredas: string[];
  estimatedPopulation: number;
  predominantStratum: 'Bajo (1-2)' | 'Medio (3-4)' | 'Alto (5-6)' | 'Mixto';
  educationalLevelGeneral: 'Básico' | 'Medio' | 'Superior';
  urbanDensity: 'Alta' | 'Media' | 'Baja' | 'Rural Dispersa';
  characteristics: string;
  demographics?: {
    percentageOfMunicipality: number;
    youthPercentage?: number;
    menPercentage?: number;
    womenPercentage?: number;
  };
}

export interface ElectoralAntecedents {
  office: 'Concejo' | 'Alcaldía' | 'Asamblea' | 'Gobernación';
  title: string;
  competencies: string;
  immediateAntecedents2023: {
    totalVotes: number;
    winnerOrLeadingParty: string;
    winnerVotes: number;
    secondPlaceOrParty: string;
    secondVotes: number;
    abstentionRate: number;
    blankAndNullVotes: number;
    keyInsights: string;
  };
  keyDynamics: string[];
}

export interface DemographicDistribution {
  ageGroups: {
    joven: { range: '18-28 años'; percentage: number; label: 'Jóvenes' };
    adulto: { range: '29-59 años'; percentage: number; label: 'Adultos' };
    adultoMayor: { range: '60+ años'; percentage: number; label: 'Adultos Mayores' };
  };
  socioeconomicStratum: {
    bajo: { strata: string; percentage: number; description: string };
    medio: { strata: string; percentage: number; description: string };
    alto: { strata: string; percentage: number; description: string };
  };
  educationLevels: {
    basico: { level: string; percentage: number; description: string };
    medio: { level: string; percentage: number; description: string };
    superior: { level: string; percentage: number; description: string };
  };
}

export interface StrategicMunicipality {
  id: string;
  name: string;
  subregion: string;
  category: string;
  totalPopulation: number;
  electoralCensus: number;
  /** 'oficial' = Registraduría (corte 30-abr-2026); 'estimado' = sin dato oficial */
  electoralCensusSource?: 'oficial' | 'estimado';
  urbanRuralDistribution: { urban: number; rural: number };
  nbiPercentage: number;
  hdi: number;
  economicDrivers: string[];
  summary: string;
  areas: AreaDivision[];
  demographics: DemographicDistribution;
  electoralAntecedents: Record<'Concejo' | 'Alcaldía' | 'Asamblea' | 'Gobernación', ElectoralAntecedents>;
}

export const STRATEGIC_MUNICIPALITIES: Record<string, StrategicMunicipality> = {
  "bello": {
    id: "bello",
    name: "Bello",
    subregion: "Valle de Aburrá (Norte)",
    category: "1ª",
    totalPopulation: 554200,
    electoralCensus: 395000,
    urbanRuralDistribution: { urban: 93, rural: 7 },
    nbiPercentage: 11.8,
    hdi: 0.81,
    economicDrivers: ["Comercio textil e industrial", "Servicios metropolitanos", "Construcción habitacional masiva", "Economía popular y emprendimiento"],
    summary: "Segundo municipio más poblado de Antioquia. Polo industrial y residencial del norte metropolitano con alta densidad urbana y notable dinamismo político.",
    demographics: {
      ageGroups: {
        joven: { range: '18-28 años', percentage: 24.5, label: 'Jóvenes' },
        adulto: { range: '29-59 años', percentage: 53.8, label: 'Adultos' },
        adultoMayor: { range: '60+ años', percentage: 21.7, label: 'Adultos Mayores' }
      },
      socioeconomicStratum: {
        bajo: { strata: 'Estrato 1 y 2', percentage: 56.4, description: 'Comunas de ladera y barrios obreros tradicionales' },
        medio: { strata: 'Estrato 3 y 4', percentage: 39.8, description: 'Niquía, Cabañas, Madera y urbanizaciones nuevas' },
        alto: { strata: 'Estrato 5 y 6', percentage: 3.8, description: 'Sectores cerrados y condominios campestres' }
      },
      educationLevels: {
        basico: { level: 'Básico', percentage: 32.2, description: 'Primaria / Secundaria incompleta' },
        medio: { level: 'Medio', percentage: 51.5, description: 'Bachilleres técnicos, tecnólogos y comercio' },
        superior: { level: 'Superior', percentage: 16.3, description: 'Profesionales universitarios y tecnólogos avanzados' }
      }
    },
    areas: [
      {
        id: "bello-c1",
        name: "Comuna 1 - París",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["París", "Los Sauces", "El Cafetal", "La Pradera", "La Esmeralda", "La Maruchenga", "José Antonio Galán", "Salvador Allende"],
        estimatedPopulation: 61500,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Alta",
        characteristics: "Zona de ladera noroccidental límite con Medellín. Fuerte arraigo popular, demandas urgentes de seguridad, empleo informal y movilidad por metrocable."
      },
      {
        id: "bello-c2",
        name: "Comuna 2 - La Madera",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Barrio Nuevo", "La Cabañita", "La Cabaña", "La Madera", "La Florida", "Gran Avenida", "San José Obrero"],
        estimatedPopulation: 54200,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Alta",
        characteristics: "Corredor residencial consolidado sobre la Autopista Norte y estación Madera del Metro. Nivel de vida medio y alta participación de voto de opinión."
      },
      {
        id: "bello-c3",
        name: "Comuna 3 - Santa Ana",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Santa Ana", "Serramonte", "Salento", "Autopista Norte", "Guayabal"],
        estimatedPopulation: 46000,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Media",
        characteristics: "Crecimiento de unidades residenciales cerradas, familias jóvenes de estratos 3 y 4 con alta conectividad y demanda de espacio público."
      },
      {
        id: "bello-c4",
        name: "Comuna 4 - Suárez / Centro",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Centro de Bello", "Suárez", "Rincón Santo", "Congolo", "Central", "El Rosario"],
        estimatedPopulation: 67800,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Alta",
        characteristics: "Corazón cívico, histórico y comercial de Bello. Alta densidad de locales comerciales, transporte público y entidades administrativas."
      },
      {
        id: "bello-c5",
        name: "Comuna 5 - La Cumbre",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["La Cumbre", "Altamira", "El Carmelo", "Buenos Aires", "Nazareth"],
        estimatedPopulation: 49500,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Alta",
        characteristics: "Ladera oriental con retos de servicios públicos, legalización de predios y fuerte necesidad de inversión social juvenil."
      },
      {
        id: "bello-c6",
        name: "Comuna 6 - Bellavista",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Bellavista", "Pachelly", "Tierra Adentro", "San Martín", "Villa Linda"],
        estimatedPopulation: 58000,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Alta",
        characteristics: "Sector histórico de gran concentración poblacional. Prioridad en seguridad comunitaria, convivencia, oportunidades laborales e infraestructura deportiva."
      },
      {
        id: "bello-c7",
        name: "Comuna 7 - Altos de Niquía",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Altos de Niquía", "El Mirador", "Altos de Quitasol", "La Selva", "Bifamiliares", "Los Ángeles"],
        estimatedPopulation: 43200,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Media",
        characteristics: "Zona próxima al Cerro Quitasol con asentamientos populares en expansión y necesidad de protección ambiental y mitigación del riesgo."
      },
      {
        id: "bello-c8",
        name: "Comuna 8 - Niquía",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Niquía Centro", "Terranova", "Panamericano", "La Navarra", "Ciudad Niquía", "Camacol"],
        estimatedPopulation: 76500,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Alta",
        characteristics: "Epicentro de transporte metropolitano (Estación Niquía, Puerta del Norte). Sector comercial moderno, alta clase media emergente."
      },
      {
        id: "bello-c9",
        name: "Comuna 9 - Fontidueño",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Fontidueño", "La Mina", "San Gabriel", "Vegas de la Navarra", "Guasimalito"],
        estimatedPopulation: 42000,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Media",
        characteristics: "Ribera del Río Medellín en el límite oriental. Mezcla de bodegas industriales, áreas residenciales populares y proyectos de mejoramiento barrial."
      },
      {
        id: "bello-c10",
        name: "Comuna 10 - Zamora",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Zamora", "Santa Rita", "Acevedo límite", "Playas del Norte"],
        estimatedPopulation: 37500,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Alta",
        characteristics: "Corredor hacia la autopista Medellín-Bogotá. Tránsito vehicular pesado, intensa actividad logística y asentamientos de origen obrero."
      },
      {
        id: "bello-rural-sanfelix",
        name: "Corregimiento San Félix",
        type: "Rural",
        subtype: "Corregimiento",
        barriosOrVeredas: ["Sabanalarga", "El Carmelo", "La Unión", "La China", "Cuartas", "La Palma", "Cerezales", "El Tambo", "Ovejas", "Potrerito"],
        estimatedPopulation: 17500,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Rural Dispersa",
        characteristics: "Zona de clima frío, vocación lechera, agrícola (papa, hortalizas) y ecoturismo (parapentismo). Foco en vías terciarias y crédito campesino."
      }
    ],
    electoralAntecedents: {
      Concejo: {
        office: "Concejo",
        title: "Concejo Municipal de Bello",
        competencies: "Órgano colegiado de 19 curules. Ejerce control político al Alcalde y secretarías, aprueba Acuerdos Municipales, el Plan de Ordenamiento Territorial (POT), presupuestos anuales y vigila la ejecución de obras públicas y concesiones.",
        immediateAntecedents2023: {
          totalVotes: 168450,
          winnerOrLeadingParty: "Partido Conservador Colombiano",
          winnerVotes: 32410,
          secondPlaceOrParty: "Centro Democrático",
          secondVotes: 24890,
          abstentionRate: 53.2,
          blankAndNullVotes: 14850,
          keyInsights: "Composición fragmentada con histórica fuerza del conservatismo tradicional liderado por casas políticas locales, con ascenso sostenido del Centro Democrático y partidos independientes en comunas 2, 3 y 8."
        },
        keyDynamics: ["Umbral electoral de ~7.500 votos por lista", "Cifra repartidora competitiva", "Fuerte voto de maquinaria en comunas 1, 5 y 6, y voto de opinión en Niquía y Cabañas"]
      },
      Alcaldía: {
        office: "Alcaldía",
        title: "Alcaldía Municipal de Bello",
        competencies: "Primera autoridad administrativa y policiva del municipio. Ordenador del gasto, líder del Plan de Desarrollo Municipal, responsable de la seguridad ciudadana, contratación pública y articulación con el Área Metropolitana del Valle de Aburrá.",
        immediateAntecedents2023: {
          totalVotes: 174200,
          winnerOrLeadingParty: "Lorena González Ospina (El Bello Que Queremos / Coalición Oficialista)",
          winnerVotes: 64280,
          secondPlaceOrParty: "Daniela Ortega (Independiente / Voto de Opinión)",
          secondVotes: 44120,
          abstentionRate: 52.8,
          blankAndNullVotes: 16100,
          keyInsights: "Continuidad del bloque conservador gobernante frente a una votación de opinión y renovación muy relevante que superó los 44 mil votos en sectores residenciales."
        },
        keyDynamics: ["Polarización entre maquinaria tradicional y sectores de opinión", "Eje crítico: Transparencia administrativa, movilidad y empleo juvenil"]
      },
      Asamblea: {
        office: "Asamblea",
        title: "Asamblea Departamental de Antioquia (Voto en Bello)",
        competencies: "Control político a la Gobernación de Antioquia y sus institutos descentralizados (FLA, IDEA, VIVA, Renta Departamental). Aprobación de Ordenanzas departamentales, presupuestos de inversión y vigilancia a la red hospitalaria pública seccional.",
        immediateAntecedents2023: {
          totalVotes: 148900,
          winnerOrLeadingParty: "Centro Democrático",
          winnerVotes: 36200,
          secondPlaceOrParty: "Partido Conservador",
          secondVotes: 31800,
          abstentionRate: 58.4,
          blankAndNullVotes: 21200,
          keyInsights: "Bello es uno de los mayores aportantes de votos para listas a la Asamblea. La disputa cerrada entre el Centro Democrático y el Conservatismo marca el umbral departamental."
        },
        keyDynamics: ["Alta dependencia de la movilización de concejales y líderes barriales", "Voto en blanco significativo por desconocimiento de candidatos a diputados"]
      },
      Gobernación: {
        office: "Gobernación",
        title: "Gobernación de Antioquia (Voto en Bello)",
        competencies: "Máxima magistratura departamental. Define proyectos estratégicos viales (Túnel del Toyo, vías 4G), seguridad del territorio antioqueño, articulación con la Nación y recursos de regalías para infraestructura.",
        immediateAntecedents2023: {
          totalVotes: 176100,
          winnerOrLeadingParty: "Andrés Julián Rendón Cardona (Centro Democrático / Por Antioquia Firme)",
          winnerVotes: 73540,
          secondPlaceOrParty: "Luis Pérez Gutiérrez",
          secondVotes: 48900,
          abstentionRate: 52.1,
          blankAndNullVotes: 17900,
          keyInsights: "Contundente victoria del bloque de centroderecha en Bello, impulsado por el rechazo al gobierno nacional y el respaldo a propuestas de orden y seguridad."
        },
        keyDynamics: ["Eje temático decisivo: Seguridad en barrios limítrofes, tren del Río y empleo metropolitano"]
      }
    }
  },

  "itagui": {
    id: "itagui",
    name: "Itagüí",
    subregion: "Valle de Aburrá (Sur)",
    category: "1ª",
    totalPopulation: 291500,
    electoralCensus: 232000,
    urbanRuralDistribution: { urban: 94, rural: 6 },
    nbiPercentage: 7.9,
    hdi: 0.84,
    economicDrivers: ["Gran industria textil y confecciones", "Comercio mayorista (Central Mayorista de Antioquia)", "Sector metalmecánico", "Servicios financieros e inmobiliarios"],
    summary: "Capital industrial de Antioquia y motor económico del sur del Valle de Aburrá. Modelo de seguridad ciudadana consolidado y alta disciplina electoral comunitaria.",
    demographics: {
      ageGroups: {
        joven: { range: '18-28 años', percentage: 23.8, label: 'Jóvenes' },
        adulto: { range: '29-59 años', percentage: 54.2, label: 'Adultos' },
        adultoMayor: { range: '60+ años', percentage: 22.0, label: 'Adultos Mayores' }
      },
      socioeconomicStratum: {
        bajo: { strata: 'Estrato 1 y 2', percentage: 48.6, description: 'Sectores populares de Santa María, Calatrava y El Ajizal' },
        medio: { strata: 'Estrato 3 y 4', percentage: 47.8, description: 'Ditaires, San Fernando, Simón Bolívar, Centro y La Aldea' },
        alto: { strata: 'Estrato 5 y 6', percentage: 3.6, description: 'Conjuntos residenciales exclusivos en Ditaires' }
      },
      educationLevels: {
        basico: { level: 'Básico', percentage: 28.4, description: 'Primaria / Secundaria obrera tradicional' },
        medio: { level: 'Medio', percentage: 53.2, description: 'Técnicos textiles, industriales y comercio' },
        superior: { level: 'Superior', percentage: 18.4, description: 'Profesionales y cuadros de gestión empresarial' }
      }
    },
    areas: [
      {
        id: "itagui-c1",
        name: "Comuna 1 - Centro / Administrativa",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Centro de Itagüí", "Parque Principal", "Plaza de Mercado", "Asturias", "Los Conquistadores"],
        estimatedPopulation: 38200,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Alta",
        characteristics: "Eje institucional, bancario y de comercio minorista. Movilidad peatonal masiva, alta formalidad en locales comerciales."
      },
      {
        id: "itagui-c2",
        name: "Comuna 2 - Santa María",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Santa María N° 1", "Santa María N° 2", "Santa María N° 3", "La Finca", "Playa Rica", "San Pablo"],
        estimatedPopulation: 58900,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Alta",
        characteristics: "La comuna más densa y poblada de Itagüí. Sector obrero de base, decisivo en caudales electorales, alta demanda de subsidios y programas juveniles."
      },
      {
        id: "itagui-c3",
        name: "Comuna 3 - Ditaires / San Fernando",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Ditaires", "San Fernando", "Viviendas del Sur", "Pilsen", "Triana", "San Francisco"],
        estimatedPopulation: 46800,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Superior",
        urbanDensity: "Media",
        characteristics: "Zona residencial de estrato medio-alto, complejos deportivos y culturales (Estadio Ditaires, Casa de la Cultura). Voto de opinión crítico."
      },
      {
        id: "itagui-c4",
        name: "Comuna 4 - Bariloche / San Gabriel",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Bariloche", "San Gabriel", "19 de Abril", "Ferrara", "Triana Baja"],
        estimatedPopulation: 39400,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Alta",
        characteristics: "Expansión residencial hacia límites con San Antonio de Prado. Demandas de transporte integrado y conectividad vial."
      },
      {
        id: "itagui-c5",
        name: "Comuna 5 - Calatrava / Terranova",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Calatrava", "Terranova", "Loma Linda", "Balcones de Sevilla", "La Aldea"],
        estimatedPopulation: 44100,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Alta",
        characteristics: "Sectores de ladera con notable transformación urbana en la última década gracias a canchas sintéticas, centros infantiles y vigilancia tecnológica."
      },
      {
        id: "itagui-c6",
        name: "Comuna 6 - Los Naranjos / Simón Bolívar",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Simón Bolívar", "Los Naranjos", "La Gloria", "Las Acacias", "Las Américas"],
        estimatedPopulation: 34500,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Alta",
        characteristics: "Zona mixta comercial y residencial tradicional. Comerciantes textiles, confeccionistas y microempresarios de gran arraigo local."
      },
      {
        id: "itagui-c7",
        name: "Comuna 7 - Mayorista / Guayabalito",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Central Mayorista", "Guayabalito", "El Rosario", "Zona Industrial 1 y 2"],
        estimatedPopulation: 14200,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Media",
        characteristics: "Hub logístico de Antioquia por la Central Mayorista. Población flotante de decenas de miles de trabajadores diarios; alta relevancia gremial."
      },
      {
        id: "itagui-rural-manzanillo",
        name: "Corregimiento El Manzanillo",
        type: "Rural",
        subtype: "Corregimiento",
        barriosOrVeredas: ["El Ajizal", "El Pedregal", "El Porvenir", "El Progreso", "La María (La Verde)", "Loma de los Zuleta", "Los Gómez", "Los Olivares"],
        estimatedPopulation: 15400,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Rural Dispersa",
        characteristics: "Pico Manzanillo y cuenca alta. Veredas en proceso de conurbación con el suelo urbano, reclamos de saneamiento básico y protección de bosques."
      }
    ],
    electoralAntecedents: {
      Concejo: {
        office: "Concejo",
        title: "Concejo Municipal de Itagüí",
        competencies: "Órgano colegiado de 17 curules. Control político riguroso, aprobación de facultades al ejecutivo, discusión del estatuto tributario municipal y vigilancia sobre el programa de seguridad ciudadana integral.",
        immediateAntecedents2023: {
          totalVotes: 122600,
          winnerOrLeadingParty: "Partido Conservador (Equipo Itagüí)",
          winnerVotes: 44800,
          secondPlaceOrParty: "Centro Democrático",
          secondVotes: 18450,
          abstentionRate: 47.1,
          blankAndNullVotes: 10400,
          keyInsights: "Poderosa hegemonía del equipo del senador Carlos Andrés Trujillo en el Partido Conservador, con 8 de 17 curules, seguido por bancadas de centroderecha."
        },
        keyDynamics: ["Disciplina de voto comunitario y de líderes barriales en Santa María y Calatrava", "Alto umbral por la concentración de votos del oficialismo"]
      },
      Alcaldía: {
        office: "Alcaldía",
        title: "Alcaldía Municipal de Itagüí",
        competencies: "Liderazgo de la administración local, control sobre la Policía Metropolitana en el distrito sur, ordenamiento de las finanzas municipales con alto recaudo de industria y comercio.",
        immediateAntecedents2023: {
          totalVotes: 125800,
          winnerOrLeadingParty: "Diego Torres Sánchez (Itagüí Somos Todos / Coalición Conservadora-CD)",
          winnerVotes: 73400,
          secondPlaceOrParty: "León Mario Bedoya (ASI / Creemos)",
          secondVotes: 32600,
          abstentionRate: 46.5,
          blankAndNullVotes: 9800,
          keyInsights: "Amplia victoria del candidato oficialista apalancado en la bandera de 'Itagüí Ciudad Segura' y la continuidad de las obras de infraestructura social."
        },
        keyDynamics: ["El discurso de preservación de la seguridad frente al retorno de la delincuencia histórica definió la contienda"]
      },
      Asamblea: {
        office: "Asamblea",
        title: "Asamblea Departamental de Antioquia (Voto en Itagüí)",
        competencies: "Control político departamental, ordenanzas de presupuesto e impulso a macroproyectos como el Tren del Río y la ampliación de la Autopista Sur.",
        immediateAntecedents2023: {
          totalVotes: 109800,
          winnerOrLeadingParty: "Partido Conservador",
          winnerVotes: 41200,
          secondPlaceOrParty: "Centro Democrático",
          secondVotes: 22600,
          abstentionRate: 52.8,
          blankAndNullVotes: 14500,
          keyInsights: "Itagüí es el principal fortín electoral del conservatismo trujillista en Antioquia para asegurar curules a la Asamblea y el Senado."
        },
        keyDynamics: ["Estructura territorial muy aceitada con cuotas de participación directa"]
      },
      Gobernación: {
        office: "Gobernación",
        title: "Gobernación de Antioquia (Voto en Itagüí)",
        competencies: "Planificación territorial del sur metropolitano, convenios con el Área Metropolitana y cofinanciación de infraestructura vial e interconexión hospitalaria.",
        immediateAntecedents2023: {
          totalVotes: 126900,
          winnerOrLeadingParty: "Andrés Julián Rendón Cardona",
          winnerVotes: 59300,
          secondPlaceOrParty: "Luis Pérez Gutiérrez",
          secondVotes: 36800,
          abstentionRate: 46.2,
          blankAndNullVotes: 12100,
          keyInsights: "Clara inclinación por la candidatura institucional de Andrés Julián Rendón, consolidando la mayoría antipetrista en el sur metropolitano."
        },
        keyDynamics: ["Coincidencia entre la bandera de seguridad municipal y el discurso departamental"]
      }
    }
  },

  "envigado": {
    id: "envigado",
    name: "Envigado",
    subregion: "Valle de Aburrá (Sur)",
    category: "Especial",
    totalPopulation: 247800,
    electoralCensus: 215000,
    urbanRuralDistribution: { urban: 91, rural: 9 },
    nbiPercentage: 4.2,
    hdi: 0.89,
    economicDrivers: ["Industria automotriz y manufacturera (Renault-Sofasa)", "Sector gastronómico y turístico (Calle de la Buena Mesa)", "Servicios de tecnología, software y consultoría", "Desarrollo inmobiliario de alta gama"],
    summary: "Municipio con la mayor calidad de vida de Colombia (categoría especial). Altísimo recaudo per cápita, servicios públicos de excelencia y una ciudadanía exigente y estructurada.",
    demographics: {
      ageGroups: {
        joven: { range: '18-28 años', percentage: 21.2, label: 'Jóvenes' },
        adulto: { range: '29-59 años', percentage: 53.6, label: 'Adultos' },
        adultoMayor: { range: '60+ años', percentage: 25.2, label: 'Adultos Mayores' }
      },
      socioeconomicStratum: {
        bajo: { strata: 'Estrato 1 y 2', percentage: 14.2, description: 'Sectores periféricos de La Mina, El Salado y El Chinguí' },
        medio: { strata: 'Estrato 3 y 4', percentage: 59.5, description: 'Barrio Obrero, Mesa, San José, Dorado, Alcalá, Trianón' },
        alto: { strata: 'Estrato 5 y 6', percentage: 26.3, description: 'Zúñiga, Las Brujas, El Chocho, Las Palmas y Escobero' }
      },
      educationLevels: {
        basico: { level: 'Básico', percentage: 16.5, description: 'Primaria / Secundaria obrera tradicional' },
        medio: { level: 'Medio', percentage: 41.2, description: 'Bachilleres técnicos, tecnólogos y mandos medios' },
        superior: { level: 'Superior', percentage: 42.3, description: 'Profesionales graduados, posgrados y empresarios' }
      }
    },
    areas: [
      {
        id: "envigado-z-centro",
        name: "Zona Centro y Tradicional",
        type: "Urbana",
        subtype: "Zona",
        barriosOrVeredas: ["Zona Centro", "Barrio Mesa", "San Marcos", "La Magnolia", "Pontevedra", "Jardines"],
        estimatedPopulation: 38500,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Superior",
        urbanDensity: "Alta",
        characteristics: "Corazón histórico envigadeño, parque principal, parroquia Santa Gertrudis, zonas gastronómicas y comerciales emblemáticas. Orgullo raizal local."
      },
      {
        id: "envigado-z-zuniga",
        name: "Zona Noroccidental / Zúñiga - Villagrande",
        type: "Urbana",
        subtype: "Zona",
        barriosOrVeredas: ["Zúñiga", "Bosques de Zúñiga", "Villagrande", "La Pradera", "San Mateo", "Las Vegas"],
        estimatedPopulation: 42300,
        predominantStratum: "Alto (5-6)",
        educationalLevelGeneral: "Superior",
        urbanDensity: "Media",
        characteristics: "Límite con El Poblado (Medellín). Torres de apartamentos de lujo, ejecutivos, empresarios, voto de opinión sofisticado de centroderecha."
      },
      {
        id: "envigado-z-dorado-san-jose",
        name: "Zona Central-Sur / El Dorado - San José",
        type: "Urbana",
        subtype: "Zona",
        barriosOrVeredas: ["El Dorado", "San José", "Los Naranjos", "Alcalá", "Barrio Obrero", "Bucarest"],
        estimatedPopulation: 51200,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Alta",
        characteristics: "Cuna de la tradición industrial y laboral de Envigado (Rosellón). Familias tradicionales, activa vida comunitaria y clubes barriales."
      },
      {
        id: "envigado-z-trianon-paz",
        name: "Zona Suroriental / El Trianón - La Paz",
        type: "Urbana",
        subtype: "Zona",
        barriosOrVeredas: ["El Trianón", "Loma del Barro", "La Paz", "Las Casitas", "Primavera", "Milán-Vallejuelos"],
        estimatedPopulation: 45600,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Alta",
        characteristics: "Expansión urbana de los años 80 y 90. Clase media trabajadora, transporte hacia estación Itagüí del Metro y fuerte presencia deportiva."
      },
      {
        id: "envigado-z-lomas",
        name: "Zona Lomas / Escobero - Las Brujas - Atravesado",
        type: "Urbana",
        subtype: "Zona",
        barriosOrVeredas: ["Loma de Las Brujas", "Loma El Atravesado", "El Esmeraldal", "El Chocho", "La Inmaculada", "La Sebastiana"],
        estimatedPopulation: 32400,
        predominantStratum: "Alto (5-6)",
        educationalLevelGeneral: "Superior",
        urbanDensity: "Media",
        characteristics: "Crecimiento de condominios cerrados de alto valor por m². Reclamos de movilidad en vías empinadas, protección de fauna y preservación verde."
      },
      {
        id: "envigado-z-salado-mina",
        name: "Zona Alta / El Salado - La Mina - Chinguí",
        type: "Urbana",
        subtype: "Zona",
        barriosOrVeredas: ["El Salado", "El Chinguí", "La Mina", "San Rafael", "Las Antillas", "Uribe Ángel"],
        estimatedPopulation: 22800,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Media",
        characteristics: "Zona de transición urbana a rural cerca al Parque Ecoturístico El Salado. Familias con mayores índices de vulnerabilidad relativa dentro de Envigado."
      },
      {
        id: "envigado-rural-veredas",
        name: "Zona Rural / Palmas - Escobero - Pantanillo",
        type: "Rural",
        subtype: "Vereda",
        barriosOrVeredas: ["Las Palmas", "El Vallano", "El Escobero", "Santa Catalina", "Pantanillo", "Perico"],
        estimatedPopulation: 15000,
        predominantStratum: "Alto (5-6)",
        educationalLevelGeneral: "Superior",
        urbanDensity: "Rural Dispersa",
        characteristics: "Fincas campestres de élite, parcelaciones, colegios bilingües y restaurantes campestres en Las Palmas, junto a campesinos nativos de flores y hortalizas."
      }
    ],
    electoralAntecedents: {
      Concejo: {
        office: "Concejo",
        title: "Concejo Municipal de Envigado",
        competencies: "17 curules. Control político a la Alcaldía y a la empresa Enviaseo, aprobación de licencias urbanísticas mediante el POT, protección de cuencas y presupuesto de gasto social e infraestructura.",
        immediateAntecedents2023: {
          totalVotes: 126400,
          winnerOrLeadingParty: "Partido Liberal Colombiano (Equipo de Envigado)",
          winnerVotes: 38200,
          secondPlaceOrParty: "Centro Democrático",
          secondVotes: 29400,
          abstentionRate: 41.2,
          blankAndNullVotes: 12900,
          keyInsights: "Bipartidismo pragmático muy fuerte: El liberalismo envigadeño conserva la mayor bancada histórica, pero el Centro Democrático y Creemos tienen altísimo arraigo en estratos 4, 5 y 6."
        },
        keyDynamics: ["Uno de los municipios con menor abstención del país", "Voto programático calificado"]
      },
      Alcaldía: {
        office: "Alcaldía",
        title: "Alcaldía Municipal de Envigado",
        competencies: "Administración del presupuesto municipal más alto por habitante de Antioquia. Garantía de servicios de seguridad, salud (Hospital Manuel Uribe Ángel), educación y movilidad limpia.",
        immediateAntecedents2023: {
          totalVotes: 130800,
          winnerOrLeadingParty: "Raúl Cardona González (Partido Liberal / Envigado Adelante)",
          winnerVotes: 58900,
          secondPlaceOrParty: "Andrés Torres (Centro Democrático / Alianza Opinión)",
          secondVotes: 37400,
          abstentionRate: 39.2,
          blankAndNullVotes: 11200,
          keyInsights: "Reelección de la estructura liberal histórica gracias al reconocimiento unánime de los estándares de gestión pública y calidad de vida de los envigadeños."
        },
        keyDynamics: ["El argumento de 'no arriesgar el modelo exitoso de Envigado' pesó de forma contundente"]
      },
      Asamblea: {
        office: "Asamblea",
        title: "Asamblea Departamental de Antioquia (Voto en Envigado)",
        competencies: "Control político sobre la gestión fiscal departamental, defensa de los recursos para el metroplús y proyectos de protección ambiental de la cordillera central.",
        immediateAntecedents2023: {
          totalVotes: 114500,
          winnerOrLeadingParty: "Centro Democrático",
          winnerVotes: 38900,
          secondPlaceOrParty: "Partido Liberal",
          secondVotes: 34100,
          abstentionRate: 46.7,
          blankAndNullVotes: 15300,
          keyInsights: "El Centro Democrático superó al Liberalismo en la votación a la Asamblea en Envigado, demostrando el corte de opinión de los electores en comicios regionales."
        },
        keyDynamics: ["Candidatos con perfil técnico, académico y de defensa de la propiedad privada triunfan con facilidad"]
      },
      Gobernación: {
        office: "Gobernación",
        title: "Gobernación de Antioquia (Voto en Envigado)",
        competencies: "Liderazgo de proyectos de integración metropolitana con el Oriente antioqueño (Túnel de Oriente, variante Palmas).",
        immediateAntecedents2023: {
          totalVotes: 132600,
          winnerOrLeadingParty: "Andrés Julián Rendón Cardona",
          winnerVotes: 74200,
          secondPlaceOrParty: "Mauricio Tobón / Luis Pérez",
          secondVotes: 24600,
          abstentionRate: 38.3,
          blankAndNullVotes: 11800,
          keyInsights: "Victoria aplastante de Andrés Julián Rendón con más del 55% de los votos válidos en Envigado, respaldado por Creemos y el Centro Democrático."
        },
        keyDynamics: ["Firmeza frente al orden público nacional, autonomía fiscal de las regiones y apoyo a la empresa privada"]
      }
    }
  },

  "la-estrella": {
    id: "la-estrella",
    name: "La Estrella",
    subregion: "Valle de Aburrá (Sur)",
    category: "2ª",
    totalPopulation: 78500,
    electoralCensus: 59000,
    urbanRuralDistribution: { urban: 86, rural: 14 },
    nbiPercentage: 9.4,
    hdi: 0.83,
    economicDrivers: ["Industria química y farmacéutica", "Parques logísticos e industriales (Suramérica y Ancón)", "Desarrollo inmobiliario residencial en Suramérica", "Ecoturismo en la Reserva El Romeral"],
    summary: "Municipio verde del Valle de Aburrá con vertiginoso crecimiento en el sector de Suramérica y expansión de bodegas logísticas. Gran contraste entre la zona tradicional y la nueva clase media metropolitana.",
    demographics: {
      ageGroups: {
        joven: { range: '18-28 años', percentage: 23.5, label: 'Jóvenes' },
        adulto: { range: '29-59 años', percentage: 55.0, label: 'Adultos' },
        adultoMayor: { range: '60+ años', percentage: 21.5, label: 'Adultos Mayores' }
      },
      socioeconomicStratum: {
        bajo: { strata: 'Estrato 1 y 2', percentage: 38.5, description: 'Barrios tradicionales de ladera como Caquetá, Ferrería y Bellavista' },
        medio: { strata: 'Estrato 3 y 4', percentage: 48.2, description: 'Casco urbano, San Agustín, Ancón y nuevos desarrollos' },
        alto: { strata: 'Estrato 5 y 6', percentage: 13.3, description: 'Sector Suramérica y condominios campestres cerrados' }
      },
      educationLevels: {
        basico: { level: 'Básico', percentage: 25.8, description: 'Primaria / Secundaria obrera tradicional' },
        medio: { level: 'Medio', percentage: 49.5, description: 'Bachilleres técnicos, tecnólogos y logística' },
        superior: { level: 'Superior', percentage: 24.7, description: 'Profesionales residentes en Suramérica y nuevas urbanizaciones' }
      }
    },
    areas: [
      {
        id: "estrella-z-suramerica",
        name: "Sector Suramérica / San Agustín",
        type: "Urbana",
        subtype: "Zona",
        barriosOrVeredas: ["Suramérica", "San Agustín-Suramérica", "San Agustín-Industrial", "Bavaria"],
        estimatedPopulation: 26500,
        predominantStratum: "Alto (5-6)",
        educationalLevelGeneral: "Superior",
        urbanDensity: "Media",
        characteristics: "Zona residencial moderna de estrato 4, 5 y 6. Alta concentración de profesionales, familias jóvenes, voto de opinión de centroderecha, demanda de colegios y vías de salida."
      },
      {
        id: "estrella-z-centro",
        name: "Zona Centro / Casco Urbano Tradicional",
        type: "Urbana",
        subtype: "Zona",
        barriosOrVeredas: ["Centro", "Centro-Pueblo Viejo", "Juan XXIII", "Las Brisas", "San Cayetano", "Chile"],
        estimatedPopulation: 23400,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Alta",
        characteristics: "Corazón histórico de La Estrella, parque principal, basílica de Nuestra Señora de Chiquinquirá. Familias nativas, comercio minorista y fiestas del Romeral."
      },
      {
        id: "estrella-z-ferreria-ancon",
        name: "Zona Oriental / Ancón Sur - La Ferrería",
        type: "Urbana",
        subtype: "Zona",
        barriosOrVeredas: ["Ancón Sur", "Ancón San Martín", "La Ferrería", "Bellavista", "Primavera", "Industrial"],
        estimatedPopulation: 17800,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Alta",
        characteristics: "Corredor paralelo al Río Medellín y autopista. Grandes complejos industriales y barrios de origen obrero con demandas de empleo y transporte local."
      },
      {
        id: "estrella-rural-romeral",
        name: "Zona Rural / Veredas y Reserva El Romeral",
        type: "Rural",
        subtype: "Corregimiento",
        barriosOrVeredas: ["Calle Vieja", "El Guayabo", "La Bermejala", "La Culebra", "Pueblo Viejo Rural", "San José Meleguindo"],
        estimatedPopulation: 10800,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Rural Dispersa",
        characteristics: "Área de protección ecológica, nacimientos de agua, pequeños productores agropecuarios y fincas de recreo. Defensa del medio ambiente."
      }
    ],
    electoralAntecedents: {
      Concejo: {
        office: "Concejo",
        title: "Concejo Municipal de La Estrella",
        competencies: "15 curules. Control político, aprobación de planes de infraestructura, normas de protección ambiental y regulación del suelo en la zona de Suramérica.",
        immediateAntecedents2023: {
          totalVotes: 39800,
          winnerOrLeadingParty: "Partido Conservador / Coalición de Gobierno",
          winnerVotes: 12400,
          secondPlaceOrParty: "Centro Democrático",
          secondVotes: 7800,
          abstentionRate: 32.5,
          blankAndNullVotes: 3900,
          keyInsights: "Tradicional control del equipo conservador articulado con la administración municipal, con creciente protagonismo del Centro Democrático en Suramérica."
        },
        keyDynamics: ["Marcada diferencia de comportamiento entre las mesas del casco tradicional y las del puesto de votación de Suramérica"]
      },
      Alcaldía: {
        office: "Alcaldía",
        title: "Alcaldía Municipal de La Estrella",
        competencies: "Primera autoridad administrativa. Lidera el plan de obras viales (intercambiador de Suramérica, conexión 77 sur), gestión del orden público y dotación de colegios.",
        immediateAntecedents2023: {
          totalVotes: 41200,
          winnerOrLeadingParty: "Liliana Ramírez Quintero (Una Estrella Para Todos)",
          winnerVotes: 16800,
          secondPlaceOrParty: "Carlos Mario Gutiérrez (Coalición Conservadora)",
          secondVotes: 14200,
          abstentionRate: 30.1,
          blankAndNullVotes: 2900,
          keyInsights: "Elección histórica de alta competitividad donde un movimiento independiente y de voto libre superó a la estructura política tradicional por estrecho margen."
        },
        keyDynamics: ["El voto de los nuevos residentes de Suramérica fue el factor de desequilibrio electoral"]
      },
      Asamblea: {
        office: "Asamblea",
        title: "Asamblea Departamental de Antioquia (Voto en La Estrella)",
        competencies: "Control político sobre la inversión en hospitales del sur de Antioquia y conservación del corredor de biodiversidad El Romeral.",
        immediateAntecedents2023: {
          totalVotes: 36200,
          winnerOrLeadingParty: "Centro Democrático",
          winnerVotes: 10400,
          secondPlaceOrParty: "Partido Conservador",
          secondVotes: 9800,
          abstentionRate: 38.6,
          blankAndNullVotes: 4800,
          keyInsights: "Votación dividida entre la estructura conservadora municipal y el voto de opinión uribista en urbanizaciones cerradas."
        },
        keyDynamics: ["Relevancia del mensaje de orden y garantías para la propiedad privada"]
      },
      Gobernación: {
        office: "Gobernación",
        title: "Gobernación de Antioquia (Voto en La Estrella)",
        competencies: "Cofinanciación de pasos a desnivel de la Autopista Sur y proyectos de contención del riesgo en quebradas de ladera.",
        immediateAntecedents2023: {
          totalVotes: 41800,
          winnerOrLeadingParty: "Andrés Julián Rendón Cardona",
          winnerVotes: 22100,
          secondPlaceOrParty: "Luis Pérez Gutiérrez",
          secondVotes: 10200,
          abstentionRate: 29.1,
          blankAndNullVotes: 3700,
          keyInsights: "Amplia mayoría para Andrés Julián Rendón, consolidando la preferencia del electorado del sur del Valle de Aburrá."
        },
        keyDynamics: ["Seguridad en el transporte público metropolitano y protección de la familia"]
      }
    }
  },

  "sabaneta": {
    id: "sabaneta",
    name: "Sabaneta",
    subregion: "Valle de Aburrá (Sur)",
    category: "2ª",
    totalPopulation: 86200,
    electoralCensus: 72000,
    urbanRuralDistribution: { urban: 96, rural: 4 },
    nbiPercentage: 4.8,
    hdi: 0.88,
    economicDrivers: ["Comercio y gastronomía (Parque Principal y buñuelos gigantes)", "Construcción vertical masiva", "Servicios médicos e IPS especializadas", "Instituciones universitarias (Ceipa, San Martín)"],
    summary: "El municipio más pequeño de Colombia en extensión (15 km²) pero con una de las densidades verticales y calidades de vida más altas. Electorado de clase media-alta con fuerte sentido de pertenencia.",
    demographics: {
      ageGroups: {
        joven: { range: '18-28 años', percentage: 22.8, label: 'Jóvenes' },
        adulto: { range: '29-59 años', percentage: 54.6, label: 'Adultos' },
        adultoMayor: { range: '60+ años', percentage: 22.6, label: 'Adultos Mayores' }
      },
      socioeconomicStratum: {
        bajo: { strata: 'Estrato 1 y 2', percentage: 11.8, description: 'Pequeños sectores tradicionales en Cañaveralejo y San José antiguo' },
        medio: { strata: 'Estrato 3 y 4', percentage: 67.5, description: 'Centro, Betania, Las Casitas, Playas de María, urbanizaciones en altura' },
        alto: { strata: 'Estrato 5 y 6', percentage: 20.7, description: 'Lomitas, María Auxiliadora alta, La Doctora y Pan de Azúcar campestre' }
      },
      educationLevels: {
        basico: { level: 'Básico', percentage: 15.2, description: 'Primaria / Secundaria de antiguos campesinos' },
        medio: { level: 'Medio', percentage: 44.8, description: 'Bachilleres técnicos, tecnólogos y administradores' },
        superior: { level: 'Superior', percentage: 40.0, description: 'Profesionales universitarios, docentes y directivos' }
      }
    },
    areas: [
      {
        id: "sabaneta-z-centro-betania",
        name: "Zona Centro / Betania / Casitas",
        type: "Urbana",
        subtype: "Zona",
        barriosOrVeredas: ["Centro de Sabaneta", "Betania", "Las Casitas", "Calle Larga", "Playas de María", "San Joaquín"],
        estimatedPopulation: 39500,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Alta",
        characteristics: "Parque principal, santuario de María Auxiliadora, alta densidad comercial y gastronómica, corazón social y devocional del municipio."
      },
      {
        id: "sabaneta-z-torres-altura",
        name: "Zona de Expansión Vertical / Aliadas - Holanda",
        type: "Urbana",
        subtype: "Zona",
        barriosOrVeredas: ["Aliadas del Sur", "Holanda", "Los Alcázares", "Vegas de San José", "Prados de Sabaneta"],
        estimatedPopulation: 28400,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Superior",
        urbanDensity: "Alta",
        characteristics: "Decenas de torres de más de 20 pisos construidas entre 2012 y 2024. Nuevas familias, profesionales jóvenes, preocupación por movilidad y colegios públicos."
      },
      {
        id: "sabaneta-rural-lomas",
        name: "Zona Veredal y Campestre / Lomitas - Doctora",
        type: "Rural",
        subtype: "Vereda",
        barriosOrVeredas: ["María Auxiliadora", "Las Lomitas", "La Doctora", "San José Vereda", "Cañaveralejo", "Pan de Azúcar"],
        estimatedPopulation: 18300,
        predominantStratum: "Alto (5-6)",
        educationalLevelGeneral: "Superior",
        urbanDensity: "Media",
        characteristics: "Laderas con casas campestres y conjuntos cerrados de estrato alto. Problemas de capacidad en vías angostas y debate sobre la plusvalía del suelo."
      }
    ],
    electoralAntecedents: {
      Concejo: {
        office: "Concejo",
        title: "Concejo Municipal de Sabaneta",
        competencies: "13 curules. Aprobación y ajuste riguroso del Plan de Ordenamiento Territorial (POT), licencias, presupuesto y vigilancia a las obras de espacio público.",
        immediateAntecedents2023: {
          totalVotes: 48900,
          winnerOrLeadingParty: "Centro Democrático",
          winnerVotes: 12100,
          secondPlaceOrParty: "Partido Liberal",
          secondVotes: 11400,
          abstentionRate: 32.1,
          blankAndNullVotes: 4200,
          keyInsights: "Equilibrio competitivo entre la fuerza de opinión del Centro Democrático y Creemos, y las redes barriales de los concejales liberales y conservadores."
        },
        keyDynamics: ["El debate urbano sobre el crecimiento de edificios y la congestión vial es el eje central del debate"]
      },
      Alcaldía: {
        office: "Alcaldía",
        title: "Alcaldía Municipal de Sabaneta",
        competencies: "Liderazgo del municipio con mejor índice de recaudo por habitante del sur. Responsable de la movilidad (carrera 43A, ampliación de vías), seguridad inteligente y educación.",
        immediateAntecedents2023: {
          totalVotes: 51200,
          winnerOrLeadingParty: "Alder Cruz Ocampo (Sabaneta Somos Todos / Coalición Amplia)",
          winnerVotes: 23800,
          secondPlaceOrParty: "Juan Carlos Bustamante (Creemos / Centro Democrático)",
          secondVotes: 18900,
          abstentionRate: 28.9,
          blankAndNullVotes: 3200,
          keyInsights: "Alder Cruz obtuvo la victoria capitalizando el respaldo de la administración saliente y sumando diversos sectores comunitarios y juveniles."
        },
        keyDynamics: ["Bajo porcentaje de abstención, ciudadanía muy enterada de propuestas sobre vías y espacio verde"]
      },
      Asamblea: {
        office: "Asamblea",
        title: "Asamblea Departamental de Antioquia (Voto en Sabaneta)",
        competencies: "Control sobre proyectos departamentales de movilidad metropolitana y defensa de los fondos para el adulto mayor y recreación.",
        immediateAntecedents2023: {
          totalVotes: 44600,
          winnerOrLeadingParty: "Centro Democrático",
          winnerVotes: 16500,
          secondPlaceOrParty: "Creemos",
          secondVotes: 12200,
          abstentionRate: 38.0,
          blankAndNullVotes: 5800,
          keyInsights: "Sabaneta vota masivamente por listas afines a la centroderecha institucional (Centro Democrático y Creemos sumaron más del 60% de los votos de lista)."
        },
        keyDynamics: ["Muy baja receptividad a discursos de izquierda o populistas"]
      },
      Gobernación: {
        office: "Gobernación",
        title: "Gobernación de Antioquia (Voto en Sabaneta)",
        competencies: "Articulación de la Gobernación con las alcaldías del sur para descongestionar el peaje de Ancón Sur y la conexión con el Pacífico 1.",
        immediateAntecedents2023: {
          totalVotes: 52100,
          winnerOrLeadingParty: "Andrés Julián Rendón Cardona",
          winnerVotes: 32400,
          secondPlaceOrParty: "Luis Pérez Gutiérrez",
          secondVotes: 10100,
          abstentionRate: 27.6,
          blankAndNullVotes: 3800,
          keyInsights: "Contundente triunfo de Andrés Julián Rendón con más del 62% del total de votos en Sabaneta, confirmando la solidez ideológica de la plaza."
        },
        keyDynamics: ["Discurso de autoridad, apoyo al emprendedor y defensa de los valores de Antioquia"]
      }
    }
  },

  "caldas": {
    id: "caldas",
    name: "Caldas",
    subregion: "Valle de Aburrá (Sur)",
    category: "2ª",
    totalPopulation: 84600,
    electoralCensus: 64500,
    urbanRuralDistribution: { urban: 78, rural: 22 },
    nbiPercentage: 12.3,
    hdi: 0.80,
    economicDrivers: ["Industria alfarera, cerámica y ladrillera tradicional", "Sector maderero y mueblería", "Comercio de café y servicios en La Clara", "Industria metalmecánica y logística"],
    summary: "La puerta del sur del Valle de Aburrá, nacimiento del Río Medellín (La Clara) y puente hacia el Suroeste cafetero. Fuerte identidad obrera e industrial combinada con una extensa ruralidad montañosa.",
    demographics: {
      ageGroups: {
        joven: { range: '18-28 años', percentage: 24.2, label: 'Jóvenes' },
        adulto: { range: '29-59 años', percentage: 53.4, label: 'Adultos' },
        adultoMayor: { range: '60+ años', percentage: 22.4, label: 'Adultos Mayores' }
      },
      socioeconomicStratum: {
        bajo: { strata: 'Estrato 1 y 2', percentage: 61.8, description: 'Barrios populares tradicionales (Olaya Herrera, Andalucía) y veredas campesinas' },
        medio: { strata: 'Estrato 3 y 4', percentage: 35.8, description: 'Zona Centro, Fundadores, La Rivera, Mandalay' },
        alto: { strata: 'Estrato 5 y 6', percentage: 2.4, description: 'Fincas campestres en La Salada y La Clara' }
      },
      educationLevels: {
        basico: { level: 'Básico', percentage: 34.6, description: 'Primaria / Secundaria obrera tradicional' },
        medio: { level: 'Medio', percentage: 48.9, description: 'Bachilleres técnicos, mecánicos, artesanos cerámicos' },
        superior: { level: 'Superior', percentage: 16.5, description: 'Profesionales universitarios y tecnólogos' }
      }
    },
    areas: [
      {
        id: "caldas-z-centro-urbano",
        name: "Zona Centro / Fundadores / La Rivera",
        type: "Urbana",
        subtype: "Zona",
        barriosOrVeredas: ["Zona Centro", "Fundadores", "La Acuarela y/o La Rivera", "Centenario", "Mandalay", "Bellavista"],
        estimatedPopulation: 29800,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Alta",
        characteristics: "Casco histórico, alcaldía, parque de Santander, catedral de Nuestra Señora de las Mercedes. Comercio formal, bancos y actividad cívica tradicional."
      },
      {
        id: "caldas-z-olaya-andalucia",
        name: "Zona Obrera Tradicional / Olaya Herrera - Andalucía",
        type: "Urbana",
        subtype: "Zona",
        barriosOrVeredas: ["Olaya Herrera", "Andalucía", "La Docena", "Cristo Rey", "La Inmaculada", "Felipe Echavarría 1 y 2", "La Playita"],
        estimatedPopulation: 36200,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Alta",
        characteristics: "Sectores nacidos en torno a las industrias de loza (Locería Colombiana). Empleo manufacturero, necesidades de vivienda digna y programas juveniles contra la deserción escolar."
      },
      {
        id: "caldas-rural-norte-salada",
        name: "Zona Rural Norte / La Salada - La Clara - Quiebra",
        type: "Rural",
        subtype: "Corregimiento",
        barriosOrVeredas: ["La Salada", "La Clara", "La Quiebra", "La Chuscala", "El Raizal", "Minas", "Aguacatala"],
        estimatedPopulation: 10400,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Rural Dispersa",
        characteristics: "Zona del Alto de San Miguel y refugio natural de La Clara. Vocación de conservación ecológica, turismo de fin de semana y cultivos familiares."
      },
      {
        id: "caldas-rural-sur-miel",
        name: "Zona Rural Sur / La Miel - Primavera - Sinifaná",
        type: "Rural",
        subtype: "Vereda",
        barriosOrVeredas: ["La Miel", "Primavera", "La Corrala", "La Valeria", "Cardalito", "Maní del Cardal", "Salinas", "El 60", "Sinifaná"],
        estimatedPopulation: 8200,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Rural Dispersa",
        characteristics: "Conexión vial con Amagá y la cuenca del Sinifaná. Actividad agrícola de café y caña, tránsito de carga pesada hacia el Suroeste."
      }
    ],
    electoralAntecedents: {
      Concejo: {
        office: "Concejo",
        title: "Concejo Municipal de Caldas",
        competencies: "15 curules. Control político, aprobación de Acuerdos Municipales, vigilancia al mantenimiento de vías terciarias rurales y protección ambiental del Río Aburrá.",
        immediateAntecedents2023: {
          totalVotes: 42100,
          winnerOrLeadingParty: "Partido Liberal",
          winnerVotes: 9800,
          secondPlaceOrParty: "Partido Conservador",
          secondVotes: 8900,
          abstentionRate: 34.7,
          blankAndNullVotes: 3800,
          keyInsights: "Histórico arraigo liberal y conservador con fuerte intermediación comunitaria de concejales en veredas rurales y barrios obreros."
        },
        keyDynamics: ["Cercanía personal de los candidatos con líderes de juntas de acción comunal"]
      },
      Alcaldía: {
        office: "Alcaldía",
        title: "Alcaldía Municipal de Caldas",
        competencies: "Administración del municipio, solución al tráfico pesado sobre la variante de Caldas, mitigación de riesgos por lluvias y desarrollo económico industrial.",
        immediateAntecedents2023: {
          totalVotes: 44200,
          winnerOrLeadingParty: "Jorge Mario Rendón Vélez 'El Profe' (Estamos con El Profe)",
          winnerVotes: 15400,
          secondPlaceOrParty: "Raúl Antonio Mesa (Coalición Tradicional)",
          secondVotes: 12600,
          abstentionRate: 31.5,
          blankAndNullVotes: 2900,
          keyInsights: "Victoria de 'El Profe' Jorge Mario Rendón con un discurso cívico, educativo e independiente que aglutinó el descontento popular frente a la política tradicional."
        },
        keyDynamics: ["Voto de opinión docente y comunitario superó a maquinarias de partidos en el casco urbano"]
      },
      Asamblea: {
        office: "Asamblea",
        title: "Asamblea Departamental de Antioquia (Voto en Caldas)",
        competencies: "Control sobre recursos viales de conexión con la doble calzada hacia el Suroeste y dotación del Hospital San Vicente de Paúl de Caldas.",
        immediateAntecedents2023: {
          totalVotes: 37900,
          winnerOrLeadingParty: "Centro Democrático",
          winnerVotes: 9200,
          secondPlaceOrParty: "Partido Liberal",
          secondVotes: 8600,
          abstentionRate: 41.2,
          blankAndNullVotes: 4900,
          keyInsights: "Cierre parejo entre el Centro Democrático y el Partido Liberal, reflejando la doble condición de Caldas como municipio metropolitano y puerta campesina."
        },
        keyDynamics: ["Importancia de propuestas para el sector campesino y el acueducto multiveredal"]
      },
      Gobernación: {
        office: "Gobernación",
        title: "Gobernación de Antioquia (Voto en Caldas)",
        competencies: "Mantenimiento de la vía nacional y proyectos de saneamiento hídrico en la cabecera de la cuenca del Río Medellín.",
        immediateAntecedents2023: {
          totalVotes: 43800,
          winnerOrLeadingParty: "Andrés Julián Rendón Cardona",
          winnerVotes: 19800,
          secondPlaceOrParty: "Luis Pérez Gutiérrez",
          secondVotes: 13900,
          abstentionRate: 32.1,
          blankAndNullVotes: 3500,
          keyInsights: "Andrés Julián Rendón consolidó el primer lugar, aunque con una votación significativa de Luis Pérez en las zonas rurales y sectores obreros."
        },
        keyDynamics: ["Seguridad en corredores viales hacia el Suroeste y apoyo al pequeño campesino"]
      }
    }
  },

  "rionegro": {
    id: "rionegro",
    name: "Rionegro",
    subregion: "Oriente Antioqueño",
    category: "1ª",
    totalPopulation: 142995,
    electoralCensus: 118000,
    urbanRuralDistribution: { urban: 61.7, rural: 38.3 },
    nbiPercentage: 6.5,
    hdi: 0.86,
    economicDrivers: ["Aeropuerto Internacional José María Córdova y zona franca", "Clúster de salud de alta complejidad (Hospital San Vicente Fundación)", "Parques industriales, farmacéuticos y de alimentos", "Floricultura de exportación y agroindustria"],
    summary: "Capital económica del Oriente antioqueño. Datos oficiales según la Encuesta de Calidad de Vida (ECV 2020, OPP): 142.995 habitantes, 22.52% jóvenes (14-28 años), 52.3% mujeres y 47.7% hombres. Concentración urbana del 61.7% y rural del 38.3%.",
    demographics: {
      ageGroups: {
        joven: { range: '18-28 años', percentage: 24.0, label: 'Jóvenes' },
        adulto: { range: '29-59 años', percentage: 53.4, label: 'Adultos' },
        adultoMayor: { range: '60+ años', percentage: 22.6, label: 'Adultos Mayores' }
      },
      socioeconomicStratum: {
        bajo: { strata: 'Estrato 1 y 2', percentage: 26.2, description: 'Estrato 1 (9.1%) y Estrato 2 (17.1%) según ECV 2020' },
        medio: { strata: 'Estrato 3 y 4', percentage: 67.6, description: 'Estrato 3 (45.5%) y Estrato 4 (22.1%) según ECV 2020' },
        alto: { strata: 'Estrato 5 y 6', percentage: 6.2, description: 'Estrato 5 (4.2%) y Estrato 6 (2.0%) en Llanogrande y parcelaciones' }
      },
      educationLevels: {
        basico: { level: 'Básico', percentage: 25.8, description: 'Primaria / Secundaria campesina y operaria' },
        medio: { level: 'Medio', percentage: 50.6, description: 'Educación media completa y formación técnica' },
        superior: { level: 'Superior', percentage: 23.6, description: 'Tecnológica y universitaria (médicos, ingenieros, aeronáutica)' }
      }
    },
    areas: [
      {
        id: "rionegro-c1-liborio",
        name: "Comuna 1 - Liborio Mejía",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["El Centro Histórico", "Belchite", "Alto del Medio", "El Hospital", "Plaza de la Libertad", "La Pola", "San Francisco"],
        estimatedPopulation: 29886,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Alta",
        characteristics: "Comuna con mayor peso demográfico de Rionegro (20.9% de la población total). Centro cívico, administrativo, bancario, hospitalario y patrimonial tradicional.",
        demographics: {
          percentageOfMunicipality: 20.9,
          youthPercentage: 21.8,
          menPercentage: 47.5,
          womenPercentage: 52.5
        }
      },
      {
        id: "rionegro-c4-porvenir",
        name: "Comuna 4 - El Porvenir",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["El Porvenir", "Fontibón", "Barro Blanco", "San Joaquín", "Carretero", "Casas del Mar"],
        estimatedPopulation: 22879,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Superior",
        urbanDensity: "Media",
        characteristics: "Segunda mayor concentración de Rionegro (16.0% del total). El Porvenir es el barrio individual con más jóvenes de la ciudad (15.9%). Alberga el Campus UdeA Oriente.",
        demographics: {
          percentageOfMunicipality: 16.0,
          youthPercentage: 24.5,
          menPercentage: 48.0,
          womenPercentage: 52.0
        }
      },
      {
        id: "rionegro-c3-alfonso-uribe",
        name: "Comuna 3 - Monseñor Alfonso Uribe Jaramillo",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["Cuatro Esquinas", "Santa Ana", "La Esperanza", "Quebrada Arriba", "El Rosal", "Juan Antonio Murillo"],
        estimatedPopulation: 22307,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Alta",
        characteristics: "Tercera mayor división (15.6% del total). Sector popular denso; Cuatro Esquinas concentra el 8.6% de los jóvenes urbanos y Santa Ana el 7.1%.",
        demographics: {
          percentageOfMunicipality: 15.6,
          youthPercentage: 23.2,
          menPercentage: 48.3,
          womenPercentage: 51.7
        }
      },
      {
        id: "rionegro-corr-sur",
        name: "Corregimiento Sur o Gilberto Echeverri Mejía",
        type: "Rural",
        subtype: "Corregimiento",
        barriosOrVeredas: ["Cabeceras de Llanogrande", "Tres Puertas", "Chipre", "Guayabito", "Vilachuaga", "San Antonio (Rural)", "Pontezuela", "El Higuerón", "El Capiro", "Santa Teresa", "El Rosal", "Santa Ana Rural"],
        estimatedPopulation: 17159,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Rural Dispersa",
        characteristics: "El corregimiento rural más poblado (12.0% del municipio). Cabeceras de Llanogrande es la vereda con mayor población rural joven (4.7%). Cuenca hacia La Ceja y El Carmen.",
        demographics: {
          percentageOfMunicipality: 12.0,
          youthPercentage: 21.0,
          menPercentage: 49.2,
          womenPercentage: 50.8
        }
      },
      {
        id: "rionegro-corr-norte",
        name: "Corregimiento Norte o Néstor Esteban Sanínt Arbeláez",
        type: "Rural",
        subtype: "Corregimiento",
        barriosOrVeredas: ["San Luis", "Río Abajo", "Los Pinos", "Santa Bárbara", "Galicia", "La Laja", "Cimarronas"],
        estimatedPopulation: 16444,
        predominantStratum: "Bajo (1-2)",
        educationalLevelGeneral: "Básico",
        urbanDensity: "Rural Dispersa",
        characteristics: "Corregimiento del nororiente (11.5% del municipio). Comprende veredas como La Mosca (2.3%), La Laja (2.2%), Santa Bárbara (2.0%) y Galicia (1.8%). Alta vocación agropecuaria.",
        demographics: {
          percentageOfMunicipality: 11.5,
          youthPercentage: 20.8,
          menPercentage: 49.6,
          womenPercentage: 50.4
        }
      },
      {
        id: "rionegro-corr-centro",
        name: "Corregimiento Centro o Casimiro García",
        type: "Rural",
        subtype: "Corregimiento",
        barriosOrVeredas: ["Abreo", "Cuchillas de San José", "Mampuesto", "El Carmín", "Abreíto", "Chachafruto", "Barro Blanco"],
        estimatedPopulation: 16301,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Medio",
        urbanDensity: "Rural Dispersa",
        characteristics: "Franja central rural (11.4% del total). Abreo (3.6%) y Cuchillas de San José (2.7%) destacan entre las veredas más pobladas del municipio.",
        demographics: {
          percentageOfMunicipality: 11.4,
          youthPercentage: 21.5,
          menPercentage: 48.8,
          womenPercentage: 51.2
        }
      },
      {
        id: "rionegro-c2-san-antonio",
        name: "Comuna 2 - San Antonio",
        type: "Urbana",
        subtype: "Comuna",
        barriosOrVeredas: ["San Antonio de Pereira", "El Faro", "Gualanday", "Senderos", "La María", "Bartolo"],
        estimatedPopulation: 13299,
        predominantStratum: "Medio (3-4)",
        educationalLevelGeneral: "Superior",
        urbanDensity: "Media",
        characteristics: "Comuna turística y gastronómica (9.3% del total). San Antonio reúne el 7.6% de los jóvenes urbanos. Fuerte desarrollo de vivienda de estratos 3, 4 y 5.",
        demographics: {
          percentageOfMunicipality: 9.3,
          youthPercentage: 22.0,
          menPercentage: 46.8,
          womenPercentage: 53.2
        }
      },
      {
        id: "rionegro-corr-jose-maria-cordova",
        name: "Corregimiento José María Córdova Muñoz",
        type: "Rural",
        subtype: "Corregimiento",
        barriosOrVeredas: ["Aeropuerto JMC", "El Tablazo", "Tablacito", "Playa Rica - Ranchería", "La Mosquita", "La Quiebra", "Yarumal", "La Convención"],
        estimatedPopulation: 4862,
        predominantStratum: "Alto (5-6)",
        educationalLevelGeneral: "Superior",
        urbanDensity: "Rural Dispersa",
        characteristics: "Zona estratégica aeroportuaria e industrial (3.4% del municipio). Comprende El Tablazo, parcelaciones exclusivas, terminal aérea internacional y zona franca.",
        demographics: {
          percentageOfMunicipality: 3.4,
          youthPercentage: 19.8,
          menPercentage: 50.1,
          womenPercentage: 49.9
        }
      }
    ],
    electoralAntecedents: {
      Concejo: {
        office: "Concejo",
        title: "Concejo Municipal de Rionegro",
        competencies: "17 curules. Control político de alta trascendencia en el Oriente, discusión de planes viales, valorización municipal, plusvalía por urbanismo y presupuesto de obras públicas.",
        immediateAntecedents2023: {
          totalVotes: 81500,
          winnerOrLeadingParty: "Centro Democrático (Rionegro Nos Une)",
          winnerVotes: 23600,
          secondPlaceOrParty: "Creemos",
          secondVotes: 14800,
          abstentionRate: 30.9,
          blankAndNullVotes: 6800,
          keyInsights: "Poderosa hegemonía del Centro Democrático en Rionegro (cuna política de Andrés Julián Rendón), con 5 curules propias más coaligados de centroderecha."
        },
        keyDynamics: ["Elevada disciplina electoral de la estructura política local", "Fuerte control territorial en veredas y en El Porvenir"]
      },
      Alcaldía: {
        office: "Alcaldía",
        title: "Alcaldía Municipal de Rionegro",
        competencies: "Alcalde de la ciudad líder del Oriente. Manejo de finanzas robustas, ordenamiento territorial regional, seguridad en límites con Guarne, Marinilla y Carmen de Viboral.",
        immediateAntecedents2023: {
          totalVotes: 83900,
          winnerOrLeadingParty: "Jorge Rivas Urrea 'El Médico' (Rionegro Nos Une / CD - Creemos)",
          winnerVotes: 35800,
          secondPlaceOrParty: "Fernando Toloza (Primero Rionegro / Voto Alternativo)",
          secondVotes: 26400,
          abstentionRate: 28.9,
          blankAndNullVotes: 5100,
          keyInsights: "Continuidad del modelo de gobierno del Centro Democrático iniciada en 2016 con Andrés Julián Rendón, ratificada con la elección del médico Jorge Rivas."
        },
        keyDynamics: ["Mensaje central: Experiencia probada en salud, obras continuas y freno al desorden"]
      },
      Asamblea: {
        office: "Asamblea",
        title: "Asamblea Departamental de Antioquia (Voto en Rionegro)",
        competencies: "Control político sobre la provincia del Oriente, defensa de la autonomía regional frente a Medellín, regalías aeroportuarias y dobles calzadas.",
        immediateAntecedents2023: {
          totalVotes: 73200,
          winnerOrLeadingParty: "Centro Democrático",
          winnerVotes: 29400,
          secondPlaceOrParty: "Creemos",
          secondVotes: 16200,
          abstentionRate: 37.9,
          blankAndNullVotes: 8900,
          keyInsights: "Rionegro es el municipio con mayor porcentaje de votación para el Centro Democrático a la Asamblea en todo el departamento de Antioquia."
        },
        keyDynamics: ["Respaldo casi unánime a las listas del uribismo institucional"]
      },
      Gobernación: {
        office: "Gobernación",
        title: "Gobernación de Antioquia (Voto en Rionegro)",
        competencies: "Liderazgo departamental. El exalcalde de Rionegro (Andrés Julián Rendón) fue electo gobernador, marcando la importancia histórica de la plaza.",
        immediateAntecedents2023: {
          totalVotes: 85200,
          winnerOrLeadingParty: "Andrés Julián Rendón Cardona (Hijo ilustre y exalcalde)",
          winnerVotes: 58900,
          secondPlaceOrParty: "Luis Pérez Gutiérrez",
          secondVotes: 14200,
          abstentionRate: 27.8,
          blankAndNullVotes: 4900,
          keyInsights: "Victoria histórica arrasadora de Andrés Julián Rendón en su tierra natal con cerca del 70% de los votos válidos de Rionegro."
        },
        keyDynamics: ["Orgullo regional rionegrero, defensa de Antioquia frente al centralismo nacional"]
      }
    }
  }
};

/**
 * Función de cruce de variables demográficas:
 * Estima la cantidad de personas en el grupo poblacional seleccionado
 * combinando Área, Grupo Etario, Estrato Socioeconómico y Nivel Educativo.
 */
export function calculateDemographicCrossEstimation(
  municipalityId: string,
  areaId: string,
  ageKey: 'joven' | 'adulto' | 'adultoMayor',
  stratumKey: 'bajo' | 'medio' | 'alto',
  educationKey: 'basico' | 'medio' | 'superior'
) {
  const muni = STRATEGIC_MUNICIPALITIES[municipalityId] || STRATEGIC_MUNICIPALITIES["bello"];
  const selectedArea = muni.areas.find(a => a.id === areaId) || muni.areas[0];

  // Base poblacional del área seleccionada
  const areaPopulation = selectedArea.estimatedPopulation;

  // Porcentaje etario del municipio
  const agePct = muni.demographics.ageGroups[ageKey].percentage / 100;

  // Modificador de estrato según predominancia del área vs promedio municipal
  let stratumPct = muni.demographics.socioeconomicStratum[stratumKey].percentage / 100;
  if (selectedArea.predominantStratum.includes('Bajo') && stratumKey === 'bajo') {
    stratumPct = Math.min(0.85, stratumPct * 1.35);
  } else if (selectedArea.predominantStratum.includes('Alto') && stratumKey === 'alto') {
    stratumPct = Math.min(0.75, stratumPct * 2.2);
  } else if (selectedArea.predominantStratum.includes('Medio') && stratumKey === 'medio') {
    stratumPct = Math.min(0.80, stratumPct * 1.25);
  }

  // Modificador de educación
  let eduPct = muni.demographics.educationLevels[educationKey].percentage / 100;
  if (selectedArea.educationalLevelGeneral === 'Superior' && educationKey === 'superior') {
    eduPct = Math.min(0.70, eduPct * 1.4);
  } else if (selectedArea.educationalLevelGeneral === 'Básico' && educationKey === 'basico') {
    eduPct = Math.min(0.65, eduPct * 1.3);
  }

  // Cruce de variables ponderado
  const estimatedGroupCount = Math.round(areaPopulation * agePct * stratumPct * eduPct * 2.4);
  
  // Garantizar cota realista dentro del área
  const finalEstimatedCount = Math.max(120, Math.min(Math.round(areaPopulation * 0.45), estimatedGroupCount));

  // Censo votante estimado considerando abstención histórica (50% a 65%)
  const estimatedVoterTurnout = Math.round(finalEstimatedCount * 0.58);
  const percentageOfArea = ((finalEstimatedCount / areaPopulation) * 100).toFixed(1);
  const percentageOfMunicipality = ((finalEstimatedCount / muni.totalPopulation) * 100).toFixed(2);

  return {
    finalEstimatedCount,
    estimatedVoterTurnout,
    percentageOfArea,
    percentageOfMunicipality,
    areaName: selectedArea.name,
    areaType: selectedArea.type,
    areaPopulation,
    totalMunicipalityPopulation: muni.totalPopulation
  };
}

// Censo oficial (Registraduría, corte 30-abr-2026) en lugar de las cifras redondeadas previas
for (const m of Object.values(STRATEGIC_MUNICIPALITIES)) {
  const official = getMunicipalCensus(m.name);
  if (official) m.electoralCensus = official.total;
  m.electoralCensusSource = official ? 'oficial' : 'estimado';
  const dane = getDaneMunicipio(m.name);
  if (dane) {
    m.totalPopulation = dane.poblacion;
    m.nbiPercentage = dane.nbi2018;
    m.urbanRuralDistribution = {
      urban: Math.round((100 * dane.poblacionCabecera) / dane.poblacion),
      rural: Math.round((100 * dane.poblacionRural) / dane.poblacion),
    };
  }
}

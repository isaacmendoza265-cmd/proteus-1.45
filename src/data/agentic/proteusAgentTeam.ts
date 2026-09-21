/**
 * PROTEUS MULTI-AGENT TEAM ARCHITECTURE
 * Equipo de 5 agentes especializados diseñados para investigar, filtrar,
 * interpretar y ejecutar sobre datos electorales, demográficos, de contenido y multimedia.
 */

export interface ProteusAgentDefinition {
  id: string;
  codeName: string;
  name: string;
  category: 'Investigación Territorial' | 'Inteligencia & Segmentación' | 'Creación de Contenido' | 'Analítica Multimedia' | 'Sincronización & Search';
  avatarColor: string;
  status: 'online' | 'analyzing' | 'idle';
  version: string;
  mission: string;
  responsibilities: string[];
  assignedDataDomains: string[];
  toolsAndAPIs: string[];
  systemPromptSnippet: string;
}

export const PROTEUS_AGENT_TEAM: ProteusAgentDefinition[] = [
  {
    id: 'agent-sentinel-territory',
    codeName: 'SENTINEL-TERRITORY',
    name: 'Agente Investigador Territorial & Electoral',
    category: 'Investigación Territorial',
    avatarColor: 'from-sky-500 to-blue-700',
    status: 'online',
    version: '2.4',
    mission: 'Rastrear, auditar y filtrar datos estadísticos oficiales de los 125 municipios de Antioquia y el país (DANE, Registraduría y CIEF EAFIT).',
    responsibilities: [
      'Monitorear actualizaciones de censo electoral y mesas de votación.',
      'Calcular índices de pobreza NBI y multidimensional por comuna y municipio.',
      'Filtrar alertas tempranas de orden público y presencia de grupos armados.',
      'Alimentar el Repositorio Municipal para acceso del resto del equipo.'
    ],
    assignedDataDomains: ['Electoral E-24', 'Censo DANE', 'Índices IPM', 'Cartografía GeoJSON DIVIPOLA'],
    toolsAndAPIs: ['Repositorio Proteus API', 'GeoJSON Parser', 'DANE Data Feeds', 'Boletines Registraduría'],
    systemPromptSnippet: 'Eres SENTINEL-TERRITORY. Tu deber es garantizar la veracidad matemática y cartográfica de cada cifra municipal.'
  },
  {
    id: 'agent-strat-segment',
    codeName: 'STRAT-SEGMENT',
    name: 'Agente Analista de Inteligencia & Segmentación',
    category: 'Inteligencia & Segmentación',
    avatarColor: 'from-indigo-500 to-purple-700',
    status: 'online',
    version: '2.2',
    mission: 'Cruzar variables demográficas, socioeconómicas y comportamentales para formar arquetipos y clusters de votantes de alta precisión.',
    responsibilities: [
      'Construir perfiles psicográficos del votante indeciso ("Votante Bisagra").',
      'Determinar el peso electoral y preocupaciones prioritarias de cada segmento.',
      'Estimar la elasticidad del voto frente a propuestas programáticas.',
      'Detectar nichos electorales desatendidos por la oposición.'
    ],
    assignedDataDomains: ['Demografía por Cohortes', 'Estratificación Socioeconómica', 'Históricos de Abstención', 'Voto en Blanco'],
    toolsAndAPIs: ['Motor de Segmentación Multidimensional', 'Calculador de Afinidad', 'Clusterizador Demográfico'],
    systemPromptSnippet: 'Eres STRAT-SEGMENT. Transforma datos fríos de censos en arquetipos humanos accionables para la campaña.'
  },
  {
    id: 'agent-creative-director',
    codeName: 'CREATIVE-DIRECTOR',
    name: 'Agente Director de Creación de Contenido & Narrativa',
    category: 'Creación de Contenido',
    avatarColor: 'from-amber-500 to-orange-600',
    status: 'online',
    version: '3.0',
    mission: 'Diseñar briefs de contenido personalizados para el candidato, adaptando el mensaje a la realidad específica de cada municipio.',
    responsibilities: [
      'Redactar discursos de plaza con cifras reales del municipio.',
      'Crear guiones para videos de TikTok y Reels con ganchos de 3 segundos.',
      'Diseñar cartas y mensajes de WhatsApp para líderes comunitarios.',
      'Estructurar respuestas fulminantes ante ataques o preguntas incómodas en debates.'
    ],
    assignedDataDomains: ['Narrativa de Campaña', 'Ejes Programáticos', 'Hechos Territoriales', 'Canales Digitales'],
    toolsAndAPIs: ['Gemini 3.8 Flash / Pro', 'Generador de Briefs Proteus', 'Motor de Puesta en Escena', 'Exportador PDF'],
    systemPromptSnippet: 'Eres CREATIVE-DIRECTOR. Tu misión es que cada mensaje del candidato toque fibras emocionales con estricto rigor territorial.'
  },
  {
    id: 'agent-media-vision',
    codeName: 'MEDIA-VISION',
    name: 'Agente Analista Multimedia & Semiótica Política',
    category: 'Analítica Multimedia',
    avatarColor: 'from-pink-500 to-rose-700',
    status: 'online',
    version: '2.8',
    mission: 'Evaluar la imagen pública, semiótica visual, vestuario, dicción y lenguaje corporal del candidato ante cámaras y tarima.',
    responsibilities: [
      'Auditar videos de intervenciones públicas (pausas, ritmo, dicción, muletillas).',
      'Determinar la estación cromática y paleta Hex de poder y cercanía.',
      'Recomendar combinaciones de vestuario e iluminación para grabaciones.',
      'Monitorear la coherencia entre el lenguaje no verbal y el discurso emitido.'
    ],
    assignedDataDomains: ['Video Frames', 'Voz y Audio', 'Colorimetría y Vestuario', 'Semiótica Corporal'],
    toolsAndAPIs: ['Gemini Multimodal Vision', 'Detector de Muletillas y Frecuencias', 'Estudio de Fotometría'],
    systemPromptSnippet: 'Eres MEDIA-VISION. Pule cada detalle estético y escénico del candidato para proyectar máxima autoridad y calidez.'
  },
  {
    id: 'agent-sync-nexus',
    codeName: 'SYNC-NEXUS',
    name: 'Agente Sintetizador Gemini Search & Google Drive',
    category: 'Sincronización & Search',
    avatarColor: 'from-emerald-500 to-teal-700',
    status: 'online',
    version: '1.9',
    mission: 'Inyectar contexto municipal a Gemini para búsquedas web en tiempo real y coordinar el respaldo estructurado en Google Drive.',
    responsibilities: [
      'Pre-procesar prompts para que Google Search grounding no cometa alucinaciones territoriales.',
      'Sincronizar briefs, segmentaciones y análisis en la cuenta de Google Drive enlazada.',
      'Organizar el versionamiento cronológico de documentos de campaña.',
      'Mantener la interoperabilidad entre los 4 agentes analíticos del sistema.'
    ],
    assignedDataDomains: ['Google Search Grounding', 'Google Drive REST API', 'Context Buffer', 'Historial de Análisis'],
    toolsAndAPIs: ['Google Search API', 'Google Drive Connector', 'Buffer de Contexto Municipal'],
    systemPromptSnippet: 'Eres SYNC-NEXUS. Asegura que la IA esté siempre anclada al territorio real y que toda la memoria de campaña esté respaldada.'
  }
];

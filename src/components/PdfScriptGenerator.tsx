import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Upload,
  Search,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Edit3,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Download,
  Copy,
  Sliders,
  Award,
  Users,
  Video,
  Eye,
  Trash2,
  FileCheck,
  Building2,
  Handshake,
  Scale,
  ShieldAlert,
  ArrowRight,
  Zap,
  Target,
  FileSpreadsheet,
  Database,
  Activity,
  Radio
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { jsPDF } from 'jspdf';
import { CandidateProfile } from './CandidateProfileManager';
import { 
  ProvisionalCandidateProfile, 
  NationalAlignmentType, 
  LocalAntioquiaAlignmentType 
} from './SubregionesManager';
import {
  getGobernacionStatus,
  getLatestGobernacionReport,
  runGobernacionCycle,
  GobernacionStatus
} from '../services/gobernacionService';

// Inicialización de Google GenAI con API Key del entorno
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Interfaces para la matriz jerarquizada y termómetro del PDF
export interface HierarchyMatrixItem {
  ranking: number;
  axisTitle: string;
  status: 'Crítico' | 'Alerta' | 'Estable';
  relevanceScore: number;
  totalReports: number;
  representativeFact: string;
}

export interface ThermometerVoiceItem {
  cuadrante: string;
  fuente: string;
  cita: string;
  subregion?: string;
}

// Interfaz para la estructura estratégica extraída del PDF
export interface ExtractedPdfStructure {
  fileName: string;
  fileSize: string;
  uploadDate: string;
  documentTitle: string;
  administration?: string;
  operativeAgents?: string;
  executiveSummary: string;
  hierarchyMatrix?: HierarchyMatrixItem[];
  thermometerVoices?: ThermometerVoiceItem[];
  strategicAxes: Array<{
    ranking?: number;
    title: string;
    status?: 'Crítico' | 'Alerta' | 'Estable';
    relevanceScore?: number;
    description: string;
    keyPain: string;
    hookAngle: string;
  }>;
  scriptRules: Array<{
    rule: string;
    instructions: string;
    importance: 'critico' | 'alto' | 'medio';
  }>;
  toneAndStyle: {
    recommendedTones: string[];
    constraints: string[];
    emotionalTriggers: string[];
  };
  narrativeStructure: {
    hookDuration: string;
    hookInstructions: string;
    developmentInstructions: string;
    contrastDirective: string;
    callToActionInstructions: string;
  };
  rawSummaryText: string;
  isExample?: boolean;
}

// Interfaz para los guiones generados
export interface GeneratedScriptItem {
  id: string;
  title: string;
  format: string;
  estimatedDuration: string;
  productionLevel: number;
  productionLevelName: string;
  suggestedLocation: string;
  tone: string;
  targetAudience: string;
  strategicJustification: string;
  directorNotes: string;
  scenes: Array<{
    timeRange: string;
    audio: string;
    video: string;
    graphics: string;
  }>;
  fullScriptMarkdown: string;
}

// Niveles de simplicidad y producción
export interface ProductionComplexityLevel {
  level: number;
  name: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export const PRODUCTION_COMPLEXITY_LEVELS: ProductionComplexityLevel[] = [
  {
    level: 5,
    name: 'Una Sola Toma / Plano Secuencia',
    subtitle: 'Máxima autenticidad y cero cortes',
    description: 'Grabación en plano secuencia ininterrumpido. El candidato recorre a pie la locación hablando directamente al lente sin artificios.',
    tags: ['0 cortes', 'Cámara en mano / Steadicam', 'Caminata continua', 'Hiperrealista']
  },
  {
    level: 4,
    name: 'Formato Celular Espontáneo',
    subtitle: 'Estilo TikTok / Reels dinámico',
    description: 'Grabado con smartphone en vertical. Tono conversacional, cortes rápidos de salto (jump cuts), subtítulos dinámicos y ganchos de alta retención.',
    tags: ['Smartphone 9:16', '1-2 tomas', 'Selfie / Estabilizador', 'Viral']
  },
  {
    level: 3,
    name: 'Reportería en Terreno',
    subtitle: 'Estilo periodístico testimonial',
    description: 'El candidato con micrófono en mano en el lugar exacto del hecho, interactuando con ciudadanos o señalando problemáticas fácticas.',
    tags: ['Micrófono de mano', 'Testimonial', 'B-Roll en vivo', 'Noticioso']
  },
  {
    level: 2,
    name: 'Broadcast / TV Profesional',
    subtitle: 'Estándar televisivo institucional',
    description: 'Producción formal con múltiples cámaras, teleprompter o guion memorizado, iluminación controlada y chyrons corporativos.',
    tags: ['Multicámara', 'Chyrons', 'Audio de corbata', 'Institucional']
  },
  {
    level: 1,
    name: 'Cinematográfico / Gran Producción',
    subtitle: 'Despliegue visual cinematográfico',
    description: 'Producción de alta gama: tomas aéreas de dron, óptica de cine, corrección de color profesional, banda sonora y múltiples locaciones.',
    tags: ['Dron 4K', 'Óptica de cine', 'Postproducción avanzada', 'Épico']
  }
];

// Estructura oficial extraída directamente del informe de inteligencia:
// PROYECTO INDEPENDENCIA | PANORAMA DEPARTAMENTAL DE ANTIOQUIA
const SAMPLE_STRATEGIC_PDF_STRUCTURE: ExtractedPdfStructure = {
  fileName: '2026-09-17_temp_gobernacion_antioquia.pdf',
  fileSize: '2.45 MB',
  uploadDate: '17/09/2026 09:27:53',
  documentTitle: 'PROYECTO INDEPENDENCIA | PANORAMA DEPARTAMENTAL DE ANTIOQUIA',
  administration: 'Gobernación de Antioquia - Andrés Julián Rendón',
  operativeAgents: 'Orquestador | Recopilador de Medios | Lector de Opinión | Compilador | Auditor | Analista Político | Redactor',
  executiveSummary: 'Balance general de 25 fuentes primarias verificadas en Antioquia clasificadas en 7 ejes estratégicos jerarquizados de la variable más crítica a la menos relevante. Prioridad #1: Seguridad, Paz y Orden Público Subregional (Score: 53.7). Prioridad #3: Vías 4G y Conectividad (Score: 21.9) destacando el respaldo a la Vaca por Antioquia, el Túnel del Toyo (operación oct 2027) y el relevo en la Secretaría de Infraestructura tras la renuncia de Luis Horacio Gallón para aspirar al Congreso.',
  hierarchyMatrix: [
    {
      ranking: 1,
      axisTitle: 'Seguridad, Paz y Orden Público Subregional',
      status: 'Crítico',
      relevanceScore: 53.7,
      totalReports: 10,
      representativeFact: "Gobernador Rendón exige firmeza institucional: 'La Fiscalía tiene que sacudirse para golpear las finanzas del crimen' y propone la 'Operación Cazador' con $70.000 millones."
    },
    {
      ranking: 2,
      axisTitle: 'Gobernabilidad, Asamblea Departamental y Dinámica Política',
      status: 'Crítico',
      relevanceScore: 41.5,
      totalReports: 10,
      representativeFact: 'Detuvieron al alcalde de Riosucio, Chocó en Apartadó; Rendón presentó 4 propuestas a Casa de Nariño; operativos con 18 venezolanos expulsados.'
    },
    {
      ranking: 3,
      axisTitle: 'Infraestructura Estratégica, Vías 4G y Conectividad',
      status: 'Crítico',
      relevanceScore: 21.9,
      totalReports: 3,
      representativeFact: "Representante Hernán Cadavid celebra respaldo judicial a la Vaca por Antioquia ('Ganó la solidaridad regional frente al centralismo'); Túnel del Toyo en oct 2027; Sebastián Castaño Gómez sucedió a Luis Horacio Gallón tras su renuncia para aspirar al Congreso."
    },
    {
      ranking: 4,
      axisTitle: 'Gestión del Riesgo Departamental y Crisis Climática (DAGRAN)',
      status: 'Alerta',
      relevanceScore: 13.3,
      totalReports: 1,
      representativeFact: 'Dirección del DAGRAN (Vanessa Paredes Zúñiga) activa monitoreo en municipios por inestabilidad geológica y despliega maquinaria amarilla.'
    },
    {
      ranking: 5,
      axisTitle: 'Finanzas Departamentales, Salud y Entidades Descentralizadas',
      status: 'Alerta',
      relevanceScore: 12.8,
      totalReports: 1,
      representativeFact: 'Fenalco Antioquia (María José Bernal) pide salvaguardar el empleo y acelerar pagos del sistema de salud ante asfixia por intervención de Savia Salud EPS.'
    },
    {
      ranking: 6,
      axisTitle: 'Autonomía Fiscal, Descentralización y Relación con el Gobierno Nacional',
      status: 'Estable',
      relevanceScore: 1.8,
      totalReports: 0,
      representativeFact: 'Iniciativa del referendo fiscal por la autonomía regional impulsada por el Gobernador Andrés Julián Rendón; sin novedades críticas en 48 horas.'
    },
    {
      ranking: 7,
      axisTitle: 'Desarrollo Rural, Minería y Sostenibilidad Ambiental',
      status: 'Estable',
      relevanceScore: 1.5,
      totalReports: 0,
      representativeFact: 'Formalización minera en Bajo Cauca y Nordeste y sector agropecuario subregional; sin incidentes críticos en la ventana analizada.'
    }
  ],
  thermometerVoices: [
    {
      cuadrante: 'Voz Oficial (Despacho del Gobernador y Gabinete)',
      fuente: 'Andrés Julián Rendón (@AndresJRendonC)',
      cita: '"El mandatario antioqueño instó a la Fiscalía General a actuar con mayor celeridad en extinción de dominio e imputaciones contra las rentas ilícitas del Clan del Golfo, el ELN y las disidencias que operan en las subregiones de Antioquia."',
      subregion: 'Departamental'
    },
    {
      cuadrante: 'Voz Oficial (Despacho del Gobernador y Gabinete)',
      fuente: 'Sebastián Castaño Gómez (Secretario de Infraestructura, relevo de Luis Horacio Gallón)',
      cita: '"Antioquia está lista para asumir las obras del tramo nacional del Túnel del Toyo siempre que Mintransporte garantice la cesión técnica y presupuestal sin dilaciones."',
      subregion: 'Departamental'
    },
    {
      cuadrante: 'Voz Oficial (Despacho del Gobernador y Gabinete)',
      fuente: 'Vanessa Paredes Zúñiga (Directora DAGRAN)',
      cita: '"Comisiones técnicas evalúan puntos críticos de taludes en el Suroeste y Occidente para prevenir cierres totales en vías secundarias."',
      subregion: 'Departamental'
    },
    {
      cuadrante: 'Poder Gremial y Productivo',
      fuente: 'Cámara de Comercio de Medellín para Antioquia',
      cita: '"Voceros productivos alertaron sobre el impacto de la extorsión sobre el comercio formal y respaldaron el fortalecimiento de recompensas y control militar en las subregiones."',
      subregion: 'Suroeste / Bajo Cauca'
    },
    {
      cuadrante: 'Poder Gremial y Productivo',
      fuente: 'Fenalco Antioquia (María José Bernal)',
      cita: '"María José Bernal enfatizó que la crisis financiera de los hospitales afecta gravemente a proveedores, farmacéuticas y pymes en todos los municipios antioqueños."',
      subregion: 'Departamental'
    },
    {
      cuadrante: 'Investigación, Columnistas y Sociedad Civil',
      fuente: 'El Armadillo (Periodismo Investigativo)',
      cita: '"Investigación periodística detalla cómo las rentas de la minería ilegal y la extorsión financian estructuras armadas mientras la respuesta institucional se concentra en anuncios punitivos sin control territorial permanente."',
      subregion: 'Nordeste'
    },
    {
      cuadrante: 'Control Político y Contrapeso Legislativo',
      fuente: 'Hernán Cadavid (Senador de la República 2026-2030, Comisión Primera)',
      cita: '"Ganó la solidaridad regional frente al centralismo; respaldo judicial a la Vaca por las Vías de Antioquia."',
      subregion: 'Departamental'
    },
    {
      cuadrante: 'Vocería Subregional Emergente',
      fuente: 'Vocería Local (Alcaldes de Urabá)',
      cita: '"Pronunciamiento de mandatario local tras operativos conjuntos de la Fuerza Pública y la Fiscalía en Apartadó y el Urabá."',
      subregion: 'Urabá'
    }
  ],
  strategicAxes: [
    {
      ranking: 1,
      title: 'Seguridad, Paz y Orden Público Subregional',
      status: 'Crítico',
      relevanceScore: 53.7,
      description: 'Lucha frontal y ofensiva de mano dura contra la extorsión del Clan del Golfo/EGC, disidencias y ELN en Bajo Cauca, Nordeste, Norte y Urabá. Plena sintonía doctrinal con la política de mano dura del presidente de la República, Abelardo De La Espriella, y la Operación Cazador ($70.000M) del Gobernador Andrés Julián Rendón.',
      keyPain: 'Extorsión asfixiante al comercio formal, rentas de minería ilegal y presencia de estructuras criminales que exigen la máxima contundencia coordinada de la Fuerza Pública y la Fiscalía.',
      hookAngle: 'Mano dura sin tregua contra las bandas criminales: en Antioquia y en el país liderado por el presidente Abelardo De La Espriella la seguridad y el orden no se negocian. ¡Firmeza total para proteger a las familias y comerciantes!'
    },
    {
      ranking: 2,
      title: 'Gobernabilidad, Asamblea y Dinámica Política',
      status: 'Crítico',
      relevanceScore: 41.5,
      description: 'Control político departamental, articulación de mayorías legislativas para el Plan de Desarrollo y defensa del territorio frente a injerencias externas.',
      keyPain: 'Falta de celeridad en la descentralización presupuestal hacia las subregiones más apartadas y riesgo de infiltraciones criminales en administraciones locales.',
      hookAngle: 'La política no es para acomodarse a las órdenes de Bogotá: es para defender con carácter los recursos y la dignidad de cada municipio de Antioquia.'
    },
    {
      ranking: 3,
      title: 'Infraestructura Estratégica, Vías 4G y Conectividad',
      status: 'Crítico',
      relevanceScore: 21.9,
      description: 'Culminación del Túnel del Toyo (operación oct 2027), respaldo judicial a la Vaca por Antioquia y cesión de tramos a cargo de la Nación. Trayectoria de Luis Horacio Gallón en la infraestructura departamental.',
      keyPain: 'Incertidumbre logística en la conexión con los puertos de Urabá, dilaciones presupuestales de Mintransporte y abandono del centralismo.',
      hookAngle: 'Bogotá quiso frenar el Túnel del Toyo negando los recursos, pero el tesón antioqueño y la Vaca ciudadana demostraron que las vías se terminan sí o sí.'
    },
    {
      ranking: 4,
      title: 'Gestión del Riesgo Departamental y Crisis Climática (DAGRAN)',
      status: 'Alerta',
      relevanceScore: 13.3,
      description: 'Monitoreo de inestabilidad geológica en corredores viales de Suroeste, Occidente y Oriente. Despliegue oportuno de maquinaria amarilla.',
      keyPain: 'Derrumbes y crecientes súbitas que dejan incomunicadas a las veredas y pudren las cosechas campesinas.',
      hookAngle: 'Una vía terciaria transitable con maquinaria al servicio de la gente no es un lujo: es la vida misma de nuestras familias campesinas.'
    },
    {
      ranking: 5,
      title: 'Finanzas Departamentales, Salud y Entidades Descentralizadas',
      status: 'Alerta',
      relevanceScore: 12.8,
      description: 'Crisis de liquidez en la red hospitalaria pública y proveedores pymes por deudas de Savia Salud EPS intervenida y retrasos del Ministerio de Salud.',
      keyPain: 'Paseo de la muerte para conseguir una cita especializada y proveedores locales al borde de la quiebra por falta de pago del sistema de salud.',
      hookAngle: 'No podemos permitir que la asfixia financiera centralista liquide a los hospitales que atienden a la gente más humilde de nuestros pueblos.'
    },
    {
      ranking: 6,
      title: 'Autonomía Fiscal y Relación con el Gobierno Nacional',
      status: 'Estable',
      relevanceScore: 1.8,
      description: 'Iniciativa del referendo fiscal promovido por la Gobernación: que los tributos que se generan en Antioquia se queden e inviertan en Antioquia.',
      keyPain: 'Antioquia tributa billones de pesos al país y el Gobierno Nacional devuelve migajas recortando presupuesto vial y social.',
      hookAngle: 'De cada 100 pesos de impuestos que producimos con nuestro sudor, nos devuelven una miseria. ¡Llegó el momento de la autonomía fiscal!'
    },
    {
      ranking: 7,
      title: 'Desarrollo Rural, Minería y Sostenibilidad Ambiental',
      status: 'Estable',
      relevanceScore: 1.5,
      description: 'Formalización de pequeños mineros, conservación de cuencas hídricas y apoyo a las cadenas productivas de café, plátano, banano y ganadería.',
      keyPain: 'Persecución al pequeño minero y campesino trabajador mientras las rentas ilícitas financian a grupos criminales.',
      hookAngle: 'Al trabajador honesto de la tierra y del río se le acompaña y formaliza; a los que destruyen con mercurio se les aplica la ley con contundencia.'
    }
  ],
  scriptRules: [
    {
      rule: 'Focalización en Ejes Críticos (#1 Seguridad 53.7 y #3 Vías 21.9)',
      instructions: 'Priorizar temáticas con mayor tensión pública en el monitoreo: orden público en subregiones o culminación del Túnel del Toyo y Vaca por las vías.',
      importance: 'critico'
    },
    {
      rule: 'Ganchos Virales Innegociables de 0 a 3 Segundos (Hook Inmediato)',
      instructions: 'La primera frase debe interpelar frontalmente al ciudadano con un contraste territorial agudo o una cifra impactante que detenga el scroll.',
      importance: 'critico'
    },
    {
      rule: 'Sintonía de Mano Dura en Seguridad con el Presidente Abelardo De La Espriella',
      instructions: 'El Presidente de la República es Abelardo De La Espriella, abanderado y partidario de la mano dura contra las estructuras criminales. En orden público y seguridad existe plena convergencia y sintonía doctrinal con la Gobernación de Antioquia (Andrés Julián Rendón). Queda TERMINANTEMENTE PROHIBIDO plantear una discordancia inexistente en seguridad o atribuir al gobierno nacional debilidad o permisividad criminal.',
      importance: 'critico'
    },
    {
      rule: 'Mandato de Tono Constructivo si el Candidato es Aliado Departamental',
      instructions: 'Si el candidato es aliado de la Gobernación de Andrés Julián Rendón (ej. Luis Horacio Gallón, exsecretario departamental), el tono DEBE ser constructivo, gerencial y propositivo. Jamás atacar al gobierno departamental; destacar articulación institucional.',
      importance: 'critico'
    },
    {
      rule: 'Cifras y Hechos Auditados del Panorama Departamental',
      instructions: 'Incorporar datos fácticos del informe: Operación Cazador con $70.000M, $4.000M en rentas ilícitas incautadas, apertura del Túnel del Toyo en octubre de 2027, Renta Alimentaria de $225.000.',
      importance: 'alto'
    },
    {
      rule: 'Contraste Regional en Vías y Descentralización Tributaria',
      instructions: 'Exponer con respeto institucional pero firmeza la exigencia antioqueña en entrega de tramos de vías 4G / Túnel del Toyo y autonomía fiscal descentralizada, sin confundir esto con una discordancia en seguridad.',
      importance: 'alto'
    },
    {
      rule: 'Cierre con Compromiso de Carácter y Llamado a la Acción (CTA)',
      instructions: 'El candidato debe cerrar mirando fijamente a cámara con una postura de liderazgo probado, convocando a la defensa de Antioquia y a la victoria.',
      importance: 'medio'
    }
  ],
  toneAndStyle: {
    recommendedTones: ['Firme e institucional', 'Constructivo y gerencial', 'Empático y cercano a las subregiones', 'Indignación propositiva frente al centralismo'],
    constraints: [
      'Prohibido el lenguaje de promesas vacías sin sustento presupuestal o técnico',
      'Evitar descalificaciones personales vulgares; basar el contraste en hechos auditados y cifras',
      'Si el candidato es aliado de la Gobernación, queda terminantemente prohibido descalificar la gestión departamental',
      'TERMINANTEMENTE PROHIBIDO inventar discordancias en seguridad con el Gobierno Nacional: el presidente Abelardo De La Espriella es partidario radical de la mano dura contra las estructuras criminales en total convergencia con Antioquia'
    ],
    emotionalTriggers: [
      'Orgullo y soberanía por el trabajo antioqueño',
      'Firmeza y tranquilidad frente a la delincuencia',
      'Defensa de nuestras obras y vías estratégicas ante el centralismo'
    ]
  },
  narrativeStructure: {
    hookDuration: '0:00 - 0:03 segundos',
    hookInstructions: 'Interpelación directa sobre la seguridad en las vías, el Túnel del Toyo o la extorsión en las subregiones.',
    developmentInstructions: '0:03 - 0:30 segundos: Presencia en terreno del candidato, contraste entre el centralismo y la gestión regional, respaldo fáctico en cifras.',
    contrastDirective: 'Contrastar las trabas del Gobierno Nacional con la determinación ejecutiva antioqueña (Vaca por las Vías, Operación Cazador, obras reales).',
    callToActionInstructions: '0:30 - 0:45 segundos: Mirada fija al lente, compromiso de gestión demostrada y llamado al voto por la defensa de Antioquia.'
  },
  rawSummaryText: 'Estructura oficial extraída del Panorama Departamental de Antioquia (Proyecto Independencia) para condicionar la redacción audiovisual según prioridades jerárquicas reales.',
  isExample: true
};

interface PdfScriptGeneratorProps {
  candidateProfile?: CandidateProfile | null;
  onSaveProfile?: (profile: CandidateProfile) => void;
}

export const PdfScriptGenerator: React.FC<PdfScriptGeneratorProps> = ({
  candidateProfile,
  onSaveProfile
}) => {
  // ==========================================
  // ESTADO 1: PDF ESTRUCTURAL SUBIDO POR EL USUARIO
  // ==========================================
  const [pdfStructure, setPdfStructure] = useState<ExtractedPdfStructure | null>(SAMPLE_STRATEGIC_PDF_STRUCTURE);
  const [isProcessingPdf, setIsProcessingPdf] = useState<boolean>(false);
  const [pdfProcessError, setPdfProcessError] = useState<string | null>(null);
  const [activePdfTab, setActivePdfTab] = useState<'matrix' | 'thermometer' | 'summary' | 'axes' | 'rules' | 'structure'>('matrix');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ==========================================
  // ESTADO GOBERNACIÓN: CONEXIÓN EN TIEMPO REAL
  // ==========================================
  const [gobStatus, setGobStatus] = useState<GobernacionStatus | null>(null);
  const [isLoadingGobReport, setIsLoadingGobReport] = useState<boolean>(false);
  const [isRunningGobCycle, setIsRunningGobCycle] = useState<boolean>(false);
  const [gobCycleResult, setGobCycleResult] = useState<string | null>(null);

  useEffect(() => {
    getGobernacionStatus()
      .then((status) => {
        setGobStatus(status);
        if (status.connected && status.ultimoInformeFecha) {
          getLatestGobernacionReport()
            .then((report) => setPdfStructure(report))
            .catch(() => {});
        }
      })
      .catch(() => {});
  }, []);

  const handleSyncGobernacionReport = async () => {
    setIsLoadingGobReport(true);
    setPdfProcessError(null);
    setGobCycleResult(null);
    try {
      const report = await getLatestGobernacionReport();
      setPdfStructure(report);
      setGobCycleResult('Último informe auditado de Gobernación sincronizado exitosamente.');
    } catch (err: any) {
      setPdfProcessError(err.message || 'No se pudo sincronizar el informe de Gobernación.');
    } finally {
      setIsLoadingGobReport(false);
    }
  };

  const handleRunGobernacionCycle = async () => {
    setIsRunningGobCycle(true);
    setPdfProcessError(null);
    setGobCycleResult(null);
    try {
      const res = await runGobernacionCycle();
      if (res.success && res.latestReport) {
        setPdfStructure(res.latestReport);
        setGobCycleResult('¡Ciclo de los 7 agentes culminado con éxito! Se procesaron y auditaron las fuentes recientes.');
      } else {
        setPdfProcessError(res.error || res.stderr || 'El ciclo no retornó un informe válido.');
      }
    } catch (err: any) {
      setPdfProcessError(err.message || 'Error al ejecutar la orquestación de Gobernación.');
    } finally {
      setIsRunningGobCycle(false);
      getGobernacionStatus().then(setGobStatus).catch(() => {});
    }
  };

  // ==========================================
  // ESTADO 2: BÚSQUEDA DEL PERFIL CON GOOGLE SEARCH
  // ==========================================
  const [candidateSearchQuery, setCandidateSearchQuery] = useState<string>(
    candidateProfile?.nombre || 'Luis Horacio Gallón'
  );
  const [isSearchingCandidateWeb, setIsSearchingCandidateWeb] = useState<boolean>(false);
  const [searchCandidateError, setSearchCandidateError] = useState<string | null>(null);
  const [provisionalProfile, setProvisionalProfile] = useState<ProvisionalCandidateProfile | null>(() => {
    // Si ya existe un perfil de candidato en la app, calibrar perfil provisional inicial
    if (candidateProfile) {
      return {
        name: candidateProfile.nombre,
        party: candidateProfile.afiliacionPartidista || 'Coalición Departamental',
        tone: candidateProfile.tonoNarrativo || 'Constructivo, gerencial y propositivo',
        focusAreas: candidateProfile.ejeTematicoComodo || 'Integración territorial, vías y seguridad',
        experienceBio: `${candidateProfile.formacionOcupacion || ''}. ${candidateProfile.experienciaPrevia || ''}`,
        subregionalStance: 'Enfoque en descentralización y articulación territorial con municipios.',
        nationalAlignment: 'aliado',
        nationalAlignmentRationale: 'Sintonía de mano dura contra las estructuras criminales y orden institucional con el presidente Abelardo De La Espriella.',
        localAlignment: 'aliado',
        localAlignmentRationale: 'Aliado institucional de la administración departamental.',
        source: 'manual',
        timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
      };
    }
    // Perfil insignia por defecto investigado (Luis Horacio Gallón)
    return {
      name: 'Luis Horacio Gallón',
      party: 'Partido Conservador / Coalición Departamental Antioquia',
      tone: 'Constructivo, gerencial y de articulación territorial',
      focusAreas: 'Infraestructura vial, integración regional, gerencia pública y desarrollo agropecuario',
      experienceBio: 'Exsecretario de Integración Regional y Desarrollo Territorial de la Gobernación de Antioquia. Excongresista y líder con amplia trayectoria en gestión municipal y departamental.',
      subregionalStance: 'Articulación directa entre las provincias y el gobierno departamental para cofinanciar proyectos estratégicos.',
      nationalAlignment: 'aliado',
      nationalAlignmentRationale: 'Aliado programático del presidente Abelardo De La Espriella: convergencia total en la política de mano dura contra las estructuras criminales y orden, gestionando celeridad en recursos de infraestructura para Antioquia.',
      localAlignment: 'aliado',
      localAlignmentRationale: 'Aliado directo de la Gobernación de Antioquia (Andrés Julián Rendón), habiendo sido parte de su gabinete ejecutivo departamental.',
      source: 'google-search',
      timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
    };
  });

  // Modo edición del perfil investigado
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>('');
  const [editParty, setEditParty] = useState<string>('');
  const [editTone, setEditTone] = useState<string>('');
  const [editFocus, setEditFocus] = useState<string>('');
  const [editBio, setEditBio] = useState<string>('');
  const [editSubregStance, setEditSubregStance] = useState<string>('');
  const [editNationalAlignment, setEditNationalAlignment] = useState<NationalAlignmentType>('aliado');
  const [editNationalRationale, setEditNationalRationale] = useState<string>('');
  const [editLocalAlignment, setEditLocalAlignment] = useState<LocalAntioquiaAlignmentType>('aliado');
  const [editLocalRationale, setEditLocalRationale] = useState<string>('');
  const [showProfileDetails, setShowProfileDetails] = useState<boolean>(false);
  const [lastExecutedSearchQueries, setLastExecutedSearchQueries] = useState<string[]>([]);

  // ==========================================
  // ESTADO 3: GENERADOR DE GUIONES CONDICIONADOS
  // ==========================================
  const [selectedProductionLevel, setSelectedProductionLevel] = useState<number>(5); // Nivel 5 por defecto (Una sola toma)
  const [selectedAxisIndex, setSelectedAxisIndex] = useState<number>(-1); // -1 para todos
  const [targetAudienceFocus, setTargetAudienceFocus] = useState<string>('Población general con énfasis en trabajadores y familias');
  const [targetGeography, setTargetGeography] = useState<string>('Departamental / Subregional (Antioquia)');
  const [scriptToneOverride, setScriptToneOverride] = useState<string>('');
  const [isGeneratingScripts, setIsGeneratingScripts] = useState<boolean>(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [generatedScripts, setGeneratedScripts] = useState<GeneratedScriptItem[]>([]);
  const [activeScriptIndex, setActiveScriptIndex] = useState<number>(0);
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  // ==========================================
  // MANEJADOR: CARGA Y PROCESAMIENTO DEL PDF
  // ==========================================
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setPdfProcessError('Por favor sube un archivo con formato PDF válido (.pdf).');
      return;
    }

    // Límite de tamaño sugerido (15MB)
    if (file.size > 15 * 1024 * 1024) {
      setPdfProcessError('El archivo excede el tamaño máximo permitido (15 MB).');
      return;
    }

    setIsProcessingPdf(true);
    setPdfProcessError(null);

    try {
      // 1. Leer el archivo como Base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Quitar el prefijo "data:application/pdf;base64,"
          const base64Clean = result.split(',')[1] || result;
          resolve(base64Clean);
        };
        reader.onerror = () => reject(new Error('Error al leer el archivo PDF'));
        reader.readAsDataURL(file);
      });

      // 2. Enviar a Gemini 3.8 Flash con inlineData para análisis estructural profundo
      const promptAnalysis = `Eres el Director de Estrategia Política y Metodología de CMT PROTEUS.
Analiza minuciosamente este archivo PDF subido por el usuario que corresponde a un informe de monitoreo territorial, panorama departamental (como el "PROYECTO INDEPENDENCIA | PANORAMA DEPARTAMENTAL DE ANTIOQUIA") o directriz de comunicación política.

Tu tarea es descomponer y extraer exhaustivamente:
1. Metadatos (Título, Administración, Unidad de Agentes, Fecha).
2. "Matriz Jerarquizada de Ejes Temáticos" (Ranking, Eje, Estado/Semáforo 'Crítico'|'Alerta'|'Estable', Score de Relevancia numérico, Total Reportes, Hecho/Tensión Representativa).
3. "Termómetro de la Opinión Pública y Voces Influyentes" en sus 4 cuadrantes (Voz Oficial, Poder Gremial/Productivo, Investigación/Sociedad Civil, Vocería Subregional/Legislativa) con sus citas textuales fácticas.
4. Ejes Estratégicos con dolores territoriales y ángulos de gancho para guiones audiovisuales.
5. Reglas de guionaje y estructura narrativa (Hook 0-3s, desarrollo, contraste, CTA).

Devuelve OBLIGATORIAMENTE un objeto JSON estrictamente válido con este esquema:
{
  "documentTitle": "Título oficial o identificado del documento",
  "administration": "Entidad o gobernación analizada (ej. Gobernación de Antioquia - Andrés Julián Rendón)",
  "operativeAgents": "Unidad de agentes o autores del informe",
  "executiveSummary": "Resumen ejecutivo de 3 a 5 líneas con el balance general y eje de mayor impacto",
  "hierarchyMatrix": [
    {
      "ranking": 1,
      "axisTitle": "Nombre del eje",
      "status": "Crítico" | "Alerta" | "Estable",
      "relevanceScore": 53.7,
      "totalReports": 10,
      "representativeFact": "Hecho o tensión representativa con nombres y citas"
    }
  ],
  "thermometerVoices": [
    {
      "cuadrante": "Nombre del cuadrante (ej. Voz Oficial, Poder Gremial, etc.)",
      "fuente": "Nombre de la persona o medio",
      "cita": "Cita textual auditada",
      "subregion": "Subregión o Departamental"
    }
  ],
  "strategicAxes": [
    {
      "ranking": 1,
      "title": "Nombre del eje temático",
      "status": "Crítico" | "Alerta" | "Estable",
      "relevanceScore": 53.7,
      "description": "Descripción del panorama y abordaje",
      "keyPain": "Dolor ciudadano o problema territorial que ataca",
      "hookAngle": "Ángulo o gancho para publicidad política"
    }
  ],
  "scriptRules": [
    {
      "rule": "Nombre de la regla o directriz",
      "instructions": "Detalle técnico de cómo debe cumplirse en el guion",
      "importance": "critico" | "alto" | "medio"
    }
  ],
  "toneAndStyle": {
    "recommendedTones": ["Tono 1", "Tono 2"],
    "constraints": ["Prohibición o restricción 1", "Restricción 2"],
    "emotionalTriggers": ["Detonante emocional 1", "Detonante 2"]
  },
  "narrativeStructure": {
    "hookDuration": "0:00 - 0:03 segundos",
    "hookInstructions": "Cómo se abre el video según el PDF",
    "developmentInstructions": "Desarrollo del cuerpo del mensaje",
    "contrastDirective": "Directriz de contraste político o institucional",
    "callToActionInstructions": "Cierre y llamado a la acción"
  },
  "rawSummaryText": "Párrafo final sintetizando cómo este PDF norma la producción audiovisual"
}

Responde ÚNICAMENTE con el objeto JSON puro sin bloques de markdown extraños.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: 'application/pdf',
                  data: base64Data
                }
              },
              {
                text: promptAnalysis
              }
            ]
          }
        ]
      });

      const responseText = response.text || '';
      // Limpiar backticks de markdown si vienen
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No se pudo interpretar la estructura JSON del documento.');
      }

      const parsedData = JSON.parse(jsonMatch[0]);

      const newPdfStructure: ExtractedPdfStructure = {
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        uploadDate: new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
        documentTitle: parsedData.documentTitle || file.name.replace(/\.pdf$/i, ''),
        administration: parsedData.administration || 'Gobernación de Antioquia',
        operativeAgents: parsedData.operativeAgents || 'Unidad Operativa de Monitoreo Territorial',
        executiveSummary: parsedData.executiveSummary || 'Estructura estratégica extraída con éxito.',
        hierarchyMatrix: Array.isArray(parsedData.hierarchyMatrix) && parsedData.hierarchyMatrix.length > 0
          ? parsedData.hierarchyMatrix
          : SAMPLE_STRATEGIC_PDF_STRUCTURE.hierarchyMatrix,
        thermometerVoices: Array.isArray(parsedData.thermometerVoices) && parsedData.thermometerVoices.length > 0
          ? parsedData.thermometerVoices
          : SAMPLE_STRATEGIC_PDF_STRUCTURE.thermometerVoices,
        strategicAxes: Array.isArray(parsedData.strategicAxes) && parsedData.strategicAxes.length > 0
          ? parsedData.strategicAxes
          : SAMPLE_STRATEGIC_PDF_STRUCTURE.strategicAxes,
        scriptRules: Array.isArray(parsedData.scriptRules) && parsedData.scriptRules.length > 0
          ? parsedData.scriptRules
          : SAMPLE_STRATEGIC_PDF_STRUCTURE.scriptRules,
        toneAndStyle: parsedData.toneAndStyle || SAMPLE_STRATEGIC_PDF_STRUCTURE.toneAndStyle,
        narrativeStructure: parsedData.narrativeStructure || SAMPLE_STRATEGIC_PDF_STRUCTURE.narrativeStructure,
        rawSummaryText: parsedData.rawSummaryText || responseText.slice(0, 300),
        isExample: false
      };

      setPdfStructure(newPdfStructure);
      setActivePdfTab('matrix');
    } catch (err: any) {
      console.error('Error al procesar PDF:', err);
      setPdfProcessError(
        err.message || 'No fue posible procesar el archivo PDF. Intenta de nuevo o utiliza el documento de ejemplo.'
      );
    } finally {
      setIsProcessingPdf(false);
    }
  };

  // ==========================================
  // MANEJADOR: BÚSQUEDA DE PERFIL CON GOOGLE SEARCH
  // ==========================================
  const handleSearchCandidateWithGoogle = async (overrideName?: string) => {
    const query = (overrideName !== undefined ? overrideName : candidateSearchQuery).trim();
    if (!query) return;

    if (overrideName !== undefined) {
      setCandidateSearchQuery(overrideName);
    }

    setIsSearchingCandidateWeb(true);
    setSearchCandidateError(null);

    const searchPrompt = `Realiza una búsqueda profunda en internet en tiempo real utilizando la herramienta de Google Search sobre la trayectoria política, antecedentes públicos, afiliación y perfil electoral del siguiente candidato o líder político en Colombia o Antioquia:
Nombre: "${query}".

Tu tarea es generar un PERFIL PROVISIONAL DEL CANDIDATO estructurado que servirá como CONDICIONANTE OBLIGATORIO para el posterior análisis estratégico y diseño de publicidad política.

Devuelve la información de forma estructurada con estos encabezados EXACTOS:
NOMBRE: [Nombre completo y oficial del candidato]
PARTIDO: [Partido político, movimiento ciudadano, o coalición actual o más reciente]
POSTURA_GOBIERNO_NACIONAL: [Clasificación obligatoria e inequívoca entre una de estas tres palabras: "Aliado", "Independiente" u "Opositor" frente al actual gobierno nacional de Colombia presidido por Abelardo de la Espriella. CONTEXTO POLÍTICO OBLIGATORIO: El Presidente de la República de Colombia es Abelardo de la Espriella, mandatario abanderado y partidario de la MANO DURA contra todas las estructuras criminales (Clan del Golfo/EGC, ELN, disidencias, extorsionistas y narcotráfico), el orden, la autoridad y el respaldo pleno a la Fuerza Pública. En materia de seguridad y combate al crimen organizado, existe TOTAL SINTONÍA Y CONVERGENCIA DOCTRINAL entre el presidente Abelardo de la Espriella, el Centro Democrático, el Partido Conservador, el uribismo y la Gobernación de Antioquia (Andrés Julián Rendón). Por lo tanto, si el candidato pertenece a la derecha, al uribismo, al conservatismo o defiende el orden y la seguridad, es un ALIADO PROGRAMÁTICO del gobierno nacional. NO debe plantearse bajo ninguna circunstancia una discordancia inexistente en seguridad con el presidente Abelardo de la Espriella. Solo clasifica como "Opositor" si pertenece a la izquierda o sectores contrarios a la doctrina de mano dura de De la Espriella.]
POSTURA_GOBIERNO_ANTIOQUIA: [Clasificación obligatoria e inequívoca entre una de estas tres palabras: "Aliado", "Independiente" u "Opositor" frente al actual gobierno departamental de Antioquia (Gobernación de Andrés Julián Rendón). PARÁMETRO MUY RELEVANTE: Si el candidato tiene cercanía institucional con la administración departamental, ha sido parte del gabinete de Antioquia (como Luis Horacio Gallón, exsecretario de Integración Regional y Desarrollo Territorial de Antioquia), o pertenece a la coalición departamental, debe clasificarse obligatoriamente como "Aliado" con justificación de su cercanía institucional]
TONO_NARRATIVO: [Estilo discursivo y tono predominante: DIRECTRIZ OBLIGATORIA: Cuando el candidato sea ALIADO del gobierno actual de Antioquia (como el caso de Luis Horacio Gallón), su tono narrativo DEBE clasificarse obligatoriamente como "Constructivo" (e.g. Constructivo, gerencial y propositivo; Constructivo y de articulación territorial)]
EJES_TEMATICOS: [3 a 4 banderas principales que defiende o han caracterizado su gestión, e.g. Integración regional, Vías terciarias, Desarrollo agropecuario, Salud pública, Autonomía fiscal]
RESUMEN_TRAYECTORIA: [Párrafo de 3 a 5 líneas con cargos previos ejercidos, formación profesional, experiencia administrativa o legislativa y origen territorial]
POSTURA_SUBREGIONAL: [Breve análisis de cómo se percibe o qué postura ha mostrado frente a las regiones, municipios y descentralización en Antioquia o el país]

Asegúrate de basar los datos en los hallazgos fácticos de Google Search.`;

    try {
      let resultText = '';
      let queriesExecuted: string[] = [];

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: searchPrompt }] }],
          config: {
            tools: [{ googleSearch: {} }]
          }
        });
        resultText = response.text || '';
        const candidate = response.candidates?.[0];
        const groundingMeta = candidate?.groundingMetadata;
        queriesExecuted = groundingMeta?.webSearchQueries || [];
      } catch (innerErr) {
        // Fallback estándar si las herramientas de búsqueda no estuviesen disponibles
        console.warn('Fallback sin googleSearch tool:', innerErr);
        const fallbackRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: searchPrompt }] }]
        });
        resultText = fallbackRes.text || '';
      }

      setLastExecutedSearchQueries(
        queriesExecuted.length > 0
          ? queriesExecuted
          : [`Google Search: Trayectoria, partido y posturas de ${query}`]
      );

      if (resultText && resultText.trim().length > 30) {
        const nameMatch = resultText.match(/NOMBRE:\s*(.+)/i);
        const partyMatch = resultText.match(/PARTIDO:\s*(.+)/i);
        const nationalMatch = resultText.match(/POSTURA_GOBIERNO_NACIONAL:\s*(.+)/i);
        const localMatch = resultText.match(/POSTURA_GOBIERNO_ANTIOQUIA:\s*(.+)/i);
        const toneMatch = resultText.match(/TONO_NARRATIVO:\s*(.+)/i);
        const axesMatch = resultText.match(/EJES_TEMATICOS:\s*(.+)/i);
        const resumeMatch = resultText.match(/RESUMEN_TRAYECTORIA:\s*([\s\S]+?)(?=(POSTURA_SUBREGIONAL:|$))/i);
        const subregMatch = resultText.match(/POSTURA_SUBREGIONAL:\s*([\s\S]+)/i);

        const extractedName = nameMatch ? nameMatch[1].trim() : query;
        const extractedParty = partyMatch ? partyMatch[1].trim() : 'Coalición / Movimiento Regional';
        let extractedTone = toneMatch ? toneMatch[1].trim() : 'Constructivo, propositivo y territorial';
        const extractedAxes = axesMatch ? axesMatch[1].trim() : 'Seguridad, conectividad vial, desarrollo productivo y salud';
        const extractedResume = resumeMatch ? resumeMatch[1].trim() : resultText;
        const extractedSubreg = subregMatch ? subregMatch[1].trim() : 'Enfoque en desarrollo regional articulado.';

        // Determinar postura nacional frente a Abelardo de la Espriella
        let parsedAlignment: NationalAlignmentType = 'aliado';
        let parsedRationale = '';

        if (nationalMatch) {
          const rawNat = nationalMatch[1].trim();
          parsedRationale = rawNat;
          const lowerNat = rawNat.toLowerCase();
          if (lowerNat.includes('opositor') || lowerNat.includes('oposición')) {
            parsedAlignment = 'opositor';
          } else if (lowerNat.includes('aliado') || lowerNat.includes('afín') || lowerNat.includes('sintonía') || lowerNat.includes('convergencia')) {
            parsedAlignment = 'aliado';
          } else {
            parsedAlignment = 'independiente';
          }
        } else {
          const combinedContext = (extractedParty + ' ' + extractedResume).toLowerCase();
          if (
            combinedContext.includes('uribe') ||
            combinedContext.includes('centro democrático') ||
            combinedContext.includes('andrés julián') ||
            combinedContext.includes('creemos') ||
            combinedContext.includes('conservador') ||
            combinedContext.includes('mano dura') ||
            combinedContext.includes('seguridad')
          ) {
            parsedAlignment = 'aliado';
            parsedRationale = 'Aliado programático del presidente Abelardo de la Espriella: plena convergencia en la política de mano dura contra las estructuras criminales y orden.';
          } else if (combinedContext.includes('pacto histórico') || combinedContext.includes('izquierda') || combinedContext.includes('verde') || combinedContext.includes('comunes')) {
            parsedAlignment = 'opositor';
            parsedRationale = 'Opositor al gobierno nacional: Postura crítica frente a la política de derecha y mano dura del presidente Abelardo de la Espriella.';
          } else {
            parsedAlignment = 'independiente';
            parsedRationale = 'Independiente: Sin subordinación partidista nacional, enfoque 100% territorial.';
          }
        }

        // Determinar cercanía con el gobierno actual de Antioquia (Gobernación)
        const isGallon = query.toLowerCase().includes('gallón') || query.toLowerCase().includes('gallon') || extractedName.toLowerCase().includes('gallón') || extractedName.toLowerCase().includes('gallon');
        let parsedLocalAlignment: LocalAntioquiaAlignmentType = 'aliado';
        let parsedLocalRationale = '';

        if (isGallon) {
          parsedLocalAlignment = 'aliado';
          parsedLocalRationale = 'Aliado clave del gobierno actual de Antioquia (Gobernación de Andrés Julián Rendón), habiendo ejercido como Secretario de Integración Regional y Desarrollo Territorial de Antioquia.';
        } else if (localMatch) {
          const rawLoc = localMatch[1].trim();
          parsedLocalRationale = rawLoc;
          const lowerLoc = rawLoc.toLowerCase();
          if (lowerLoc.includes('opositor') || lowerLoc.includes('oposición') || lowerLoc.includes('crítico')) {
            parsedLocalAlignment = 'opositor';
          } else if (lowerLoc.includes('aliado') || lowerLoc.includes('gobiernista') || lowerLoc.includes('afín') || lowerLoc.includes('coalición') || lowerLoc.includes('gabinete')) {
            parsedLocalAlignment = 'aliado';
          } else {
            parsedLocalAlignment = 'independiente';
          }
        } else {
          const combinedContext = (extractedParty + ' ' + extractedResume + ' ' + extractedAxes).toLowerCase();
          if (combinedContext.includes('andrés julián') || combinedContext.includes('rendón') || combinedContext.includes('gobernación de antioquia') || combinedContext.includes('secretario') || combinedContext.includes('conservador') || combinedContext.includes('creemos') || combinedContext.includes('centro democrático')) {
            parsedLocalAlignment = 'aliado';
            parsedLocalRationale = 'Aliado del gobierno actual de Antioquia: Integración a la coalición departamental y respaldo a la gestión institucional.';
          } else if (combinedContext.includes('oposición a la gobernación') || combinedContext.includes('pacto histórico')) {
            parsedLocalAlignment = 'opositor';
            parsedLocalRationale = 'Opositor al gobierno departamental: Postura crítica frente a la Gobernación de Antioquia.';
          } else {
            parsedLocalAlignment = 'independiente';
            parsedLocalRationale = 'Independiente: Autonomía frente a la administración departamental de Antioquia.';
          }
        }

        // MANDATO DE TONO CONSTRUCTIVO: Cuando el candidato sea aliado del gobierno local, el tono narrativo DEBE ser constructivo
        if (parsedLocalAlignment === 'aliado' && !extractedTone.toLowerCase().includes('constructivo')) {
          extractedTone = `Constructivo, gerencial y propositivo (${extractedTone})`;
        }

        const newProfile: ProvisionalCandidateProfile = {
          name: extractedName,
          party: extractedParty,
          tone: extractedTone,
          focusAreas: extractedAxes,
          experienceBio: extractedResume,
          subregionalStance: extractedSubreg,
          nationalAlignment: parsedAlignment,
          nationalAlignmentRationale: parsedRationale || `Postura ${parsedAlignment} sustentada en hallazgos de Google Search.`,
          localAlignment: parsedLocalAlignment,
          localAlignmentRationale: parsedLocalRationale || `Relación ${parsedLocalAlignment} frente a la Gobernación de Antioquia.`,
          source: 'google-search',
          timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
        };

        setProvisionalProfile(newProfile);
        setIsEditingProfile(false);
      } else {
        throw new Error('La consulta a Google Search no arrojó información suficiente sobre el candidato.');
      }
    } catch (err: any) {
      console.error('Error al buscar candidato en Google:', err);
      setSearchCandidateError(err.message || 'Error durante la búsqueda en Google Search.');
    } finally {
      setIsSearchingCandidateWeb(false);
    }
  };

  // Iniciar edición manual del perfil
  const handleStartEditProfile = () => {
    if (!provisionalProfile) return;
    setEditName(provisionalProfile.name);
    setEditParty(provisionalProfile.party);
    setEditTone(provisionalProfile.tone);
    setEditFocus(provisionalProfile.focusAreas);
    setEditBio(provisionalProfile.experienceBio);
    setEditSubregStance(provisionalProfile.subregionalStance);
    setEditNationalAlignment(provisionalProfile.nationalAlignment);
    setEditNationalRationale(provisionalProfile.nationalAlignmentRationale);
    setEditLocalAlignment(provisionalProfile.localAlignment || 'aliado');
    setEditLocalRationale(provisionalProfile.localAlignmentRationale || '');
    setIsEditingProfile(true);
  };

  // Guardar edición manual
  const handleSaveEditProfile = () => {
    if (!provisionalProfile) return;

    let finalTone = editTone.trim() || provisionalProfile.tone;
    if (editLocalAlignment === 'aliado' && !finalTone.toLowerCase().includes('constructivo')) {
      finalTone = `Constructivo y gerencial (${finalTone})`;
    }

    const updated: ProvisionalCandidateProfile = {
      ...provisionalProfile,
      name: editName.trim() || provisionalProfile.name,
      party: editParty.trim() || provisionalProfile.party,
      tone: finalTone,
      focusAreas: editFocus.trim() || provisionalProfile.focusAreas,
      experienceBio: editBio.trim() || provisionalProfile.experienceBio,
      subregionalStance: editSubregStance.trim() || provisionalProfile.subregionalStance,
      nationalAlignment: editNationalAlignment,
      nationalAlignmentRationale: editNationalRationale.trim() || provisionalProfile.nationalAlignmentRationale,
      localAlignment: editLocalAlignment,
      localAlignmentRationale: editLocalRationale.trim() || provisionalProfile.localAlignmentRationale,
      source: 'manual',
      timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })
    };

    setProvisionalProfile(updated);
    setIsEditingProfile(false);
  };

  // ==========================================
  // MANEJADOR: GENERACIÓN DE GUIONES ESTRATÉGICOS
  // ==========================================
  const handleGenerateScripts = async () => {
    if (!pdfStructure) {
      setGenerateError('Debes subir un archivo PDF o cargar la estructura de ejemplo antes de generar los guiones.');
      return;
    }

    if (!provisionalProfile) {
      setGenerateError('Debes investigar o configurar el perfil del candidato antes de generar los guiones.');
      return;
    }

    setIsGeneratingScripts(true);
    setGenerateError(null);

    try {
      const activeComplexity = PRODUCTION_COMPLEXITY_LEVELS.find(l => l.level === selectedProductionLevel) || PRODUCTION_COMPLEXITY_LEVELS[0];
    const candidateName = provisionalProfile.name;
    const candidateParty = provisionalProfile.party;
    const candidateTone = scriptToneOverride.trim() || provisionalProfile.tone;
    const nationalAlignment = provisionalProfile.nationalAlignment;
    const nationalRationale = provisionalProfile.nationalAlignmentRationale;
    const localAlignment = provisionalProfile.localAlignment || 'aliado';
    const localRationale = provisionalProfile.localAlignmentRationale || '';

    // Eje temático seleccionado
    const axisFocus = selectedAxisIndex >= 0 && pdfStructure.strategicAxes[selectedAxisIndex]
      ? pdfStructure.strategicAxes[selectedAxisIndex]
      : null;

    const promptScripts = `Eres el Director General de Creatividad y Estrategia Audiovisual de CMT PROTEUS.
Tu tarea es redactar un PAQUETE DE GUIONES DE PUBLICIDAD POLÍTICA Y COMUNICACIÓN ESTRATÉGICA, CONDICIONADO DE FORMA IRRENUNCIABLE A DOS FUENTES:
1. EL DOCUMENTO ESTRATÉGICO PDF SUBIDO POR EL USUARIO ("${pdfStructure.documentTitle}").
2. EL PERFIL FÁCTICO DEL CANDIDATO INVESTIGADO EN GOOGLE SEARCH ("${candidateName}").

============================================================
*** CONDICIONANTE 1: REGLAS Y DIRECTRICES DEL PDF SUBIDO ***
============================================================
DOCUMENTO: ${pdfStructure.documentTitle}
RESUMEN EJECUTIVO: ${pdfStructure.executiveSummary}

REGLAS DE GUION IDENTIFICADAS EN EL PDF:
${pdfStructure.scriptRules.map(r => `- [${r.importance.toUpperCase()}]: ${r.rule} -> ${r.instructions}`).join('\n')}

ESTRUCTURA NARRATIVA OBLIGATORIA DEL PDF:
- Gancho (Hook): ${pdfStructure.narrativeStructure.hookDuration}. ${pdfStructure.narrativeStructure.hookInstructions}
- Desarrollo: ${pdfStructure.narrativeStructure.developmentInstructions}
- Directriz de Contraste Político: ${pdfStructure.narrativeStructure.contrastDirective}
- Llamado a la Acción (CTA): ${pdfStructure.narrativeStructure.callToActionInstructions}

TONOS RECOMENDADOS DEL PDF: ${pdfStructure.toneAndStyle.recommendedTones.join(', ')}
RESTRICCIONES Y PROHIBICIONES DEL PDF: ${pdfStructure.toneAndStyle.constraints.join(' | ')}
DETONANTES EMOCIONALES: ${pdfStructure.toneAndStyle.emotionalTriggers.join(', ')}

${pdfStructure.hierarchyMatrix && pdfStructure.hierarchyMatrix.length > 0 ? `
MATRIZ JERARQUIZADA DE EJES (DEL MÁS AL MENOS CRÍTICO EN EL INFORME ESTRATÉGICO):
${pdfStructure.hierarchyMatrix.map(m => `- #${m.ranking} ${m.axisTitle} [Semáforo: ${m.status.toUpperCase()}, Score de Relevancia: ${m.relevanceScore}, Reportes: ${m.totalReports}] -> Tensión/Hecho: ${m.representativeFact}`).join('\n')}
` : ''}

${pdfStructure.thermometerVoices && pdfStructure.thermometerVoices.length > 0 ? `
TERMÓMETRO DE LA OPINIÓN PÚBLICA (VOCES Y CITAS FÁCTICAS AUDITADAS POR CUADRANTE):
${pdfStructure.thermometerVoices.map(v => `- [${v.cuadrante.toUpperCase()}] (${v.fuente} | ${v.subregion}): "${v.cita}"`).join('\n')}
` : ''}

${axisFocus ? `EJE PRIORITARIO SELECCIONADO: ${axisFocus.title}
- Estado/Semáforo: ${axisFocus.status || 'Crítico'} (Score: ${axisFocus.relevanceScore || 'N/A'})
- Descripción: ${axisFocus.description}
- Dolor territorial clave: ${axisFocus.keyPain}
- Ángulo de gancho publicitario: ${axisFocus.hookAngle}` : `EJES DISPONIBLES EN EL PDF: ${pdfStructure.strategicAxes.map(a => a.title).join(', ')}`}

============================================================
*** CONDICIONANTE 2: PERFIL DEL CANDIDATO (GOOGLE SEARCH) ***
============================================================
CANDIDATO: ${candidateName}
PARTIDO / COALICIÓN: ${candidateParty}
TONO NARRATIVO REQUERIDO: ${candidateTone}
TRAYECTORIA FÁCTICA: ${provisionalProfile.experienceBio}
BANDERAS / EJES CLAVE: ${provisionalProfile.focusAreas}
POSTURA TERRITORIAL: ${provisionalProfile.subregionalStance}

POSTURA FRENTE AL GOBIERNO NACIONAL: ${nationalAlignment.toUpperCase()}
JUSTIFICACIÓN NACIONAL: ${nationalRationale}

POSTURA FRENTE AL GOBIERNO DEPARTAMENTAL (GOBERNACIÓN): ${localAlignment.toUpperCase()}
JUSTIFICACIÓN DEPARTAMENTAL: ${localRationale}

============================================================
*** DOCTRINA POLÍTICA Y DE SEGURIDAD NACIONAL OBLIGATORIA ***
============================================================
- PRESIDENTE DE LA REPÚBLICA DE COLOMBIA: Abelardo de la Espriella.
- DOCTRINA DE SEGURIDAD Y ORDEN PÚBLICO: El presidente Abelardo de la Espriella es abanderado y partidario tajante de la MANO DURA contra todas las estructuras criminales (Clan del Golfo/EGC, ELN, disidencias, bandas de extorsión y narcotráfico), con cero tolerancia, ofensiva militar y respaldo irrestricto a la Fuerza Pública.
- CONVERGENCIA TOTAL EN SEGURIDAD: En materia de orden público, seguridad ciudadana y combate frontal a las bandas criminales, existe TOTAL SINTONÍA Y SOBERANÍA COMPARTIDA entre el presidente Abelardo de la Espriella y la Gobernación de Antioquia (Andrés Julián Rendón), así como con los candidatos y líderes del uribismo, el Centro Democrático y el Partido Conservador.
- PROHIBICIÓN ESTRICTA DE DISCORDANCIA FICTICIA: ESTÁ TERMINANTEMENTE PROHIBIDO plantear una falsa discordancia en seguridad con el Gobierno Nacional o acusar al presidente Abelardo de la Espriella de permisividad, debilidad, ceses al fuego pasivos o "Paz Total" con criminales. Ambos niveles de gobierno aplican la mano dura y la contundencia judicial.
- DELIMITACIÓN DE CONTRASTES INSTITUCIONALES: Si el guion aborda reclamos regionales frente al Gobierno Central, estos deben ceñirse estrictamente a temas de autonomía fiscal descentralizada (referendo fiscal) o agilidad en la cesión y desembolso de recursos para las vías 4G (Túnel del Toyo), pero NUNCA a una supuesta falta de mano dura en seguridad.

${localAlignment === 'aliado' ? `
¡MANDATO OBLIGATORIO DE TONO CONSTRUCTIVO!
El candidato es ALIADO de la administración departamental (ej. Gobernación de Antioquia / Andrés Julián Rendón).
- El tono de los guiones DEBE SER ESTRICTAMENTE CONSTRUCTIVO Y GERENCIAL.
- Jamás atacar ni descalificar al gobierno departamental.
- Enfatizar articulación institucional, trabajo en equipo, cofinanciación de obras y construir sobre lo construido.
` : ''}

============================================================
*** CONDICIONANTE 3: NIVEL DE SIMPLICIDAD Y PRODUCCIÓN ***
============================================================
NIVEL SELECCIONADO: ${activeComplexity.level} DE 5 - "${activeComplexity.name}"
DESCRIPCIÓN DE PRODUCCIÓN: ${activeComplexity.description}
CARACTERÍSTICAS TÉCNICAS: ${activeComplexity.tags.join(', ')}

${activeComplexity.level === 5 ? `
*** REQUISITO ESTRICTO PARA NIVEL 5 (UNA SOLA TOMA / PLANO SECUENCIA): ***
El guion principal DEBE concebirse para ser grabado en UNA SOLA TOMA CONTINUA SIN CORTES (Single Take / Plano Secuencia).
- Cero (0) cortes de edición.
- Describe la trayectoria física del candidato caminando en el territorio frente a la cámara (inicia, avanza hacia el lente, señala el obstáculo o la obra, mira al lente y remata).
` : ''}

PARÁMETROS ADICIONALES:
- TERRITORIO / ÁMBITO: ${targetGeography}
- PÚBLICO OBJETIVO: ${targetAudienceFocus}

============================================================
*** FORMATO DE SALIDA (ESTRICTAMENTE JSON) ***
============================================================
Genera un paquete de 3 GUIONES COMPLEMENTARIOS acordes a las directrices del PDF:
1. GUION 1: "Gancho Viral & Contraste Político" (Formato vertical TikTok/Reels 45-60s)
2. GUION 2: "Plano Secuencia en Territorio" (Una sola toma continua según Nivel de Producción)
3. GUION 3: "Propuesta de Carácter & Llamado a la Acción" (Cápsula de Movilización y Compromiso)

Devuelve OBLIGATORIAMENTE un arreglo JSON con esta estructura exacta:
[
  {
    "id": "guion-1",
    "title": "Título sugerente del Guion 1",
    "format": "Formato de video (ej. Vertical 9:16 / Reels)",
    "estimatedDuration": "45 segundos",
    "productionLevel": ${activeComplexity.level},
    "productionLevelName": "${activeComplexity.name}",
    "suggestedLocation": "Descripción de la locación en territorio",
    "tone": "${candidateTone}",
    "targetAudience": "${targetAudienceFocus}",
    "strategicJustification": "Por qué este guion cumple la regla del PDF y el perfil del candidato",
    "directorNotes": "Indicaciones para el director y el candidato (energía, vestuario, dicción)",
    "scenes": [
      {
        "timeRange": "00:00 - 00:03",
        "audio": "Gancho verbal exacto del candidato",
        "video": "Acción de cámara, movimiento y encuadre",
        "graphics": "Texto en pantalla o chyrons"
      },
      {
        "timeRange": "00:03 - 00:20",
        "audio": "Parlamento exacto...",
        "video": "Cámara...",
        "graphics": "Gráfica..."
      },
      {
        "timeRange": "00:20 - 00:35",
        "audio": "Parlamento...",
        "video": "...",
        "graphics": "..."
      },
      {
        "timeRange": "00:35 - 00:45",
        "audio": "Cierre y llamado al voto con eslogan...",
        "video": "...",
        "graphics": "..."
      }
    ],
    "fullScriptMarkdown": "Texto completo formateado en markdown del guion para lectura rápida"
  }
]

Responde ÚNICAMENTE con el arreglo JSON sin texto adicional ni preámbulos.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: [{ text: promptScripts }] }]
      });

      const responseText = response.text || '';
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('No se pudo procesar la respuesta estructurada de guiones.');
      }

      const scripts: GeneratedScriptItem[] = JSON.parse(jsonMatch[0]);
      if (!Array.isArray(scripts) || scripts.length === 0) {
        throw new Error('No se generaron guiones válidos.');
      }

      setGeneratedScripts(scripts);
      setActiveScriptIndex(0);
    } catch (err: any) {
      console.error('Error al generar guiones:', err);
      setGenerateError(err.message || 'Error al generar los guiones estratégicos.');
    } finally {
      setIsGeneratingScripts(false);
    }
  };

  // ==========================================
  // UTILIDAD: COPIAR AL PORTAPAPELES
  // ==========================================
  const handleCopyScript = (script: GeneratedScriptItem) => {
    const textToCopy = `=== ${script.title.toUpperCase()} ===
FORMATO: ${script.format} | DURACIÓN: ${script.estimatedDuration}
NIVEL DE PRODUCCIÓN: ${script.productionLevelName}
CANDIDATO: ${provisionalProfile?.name || 'Candidato'} (${provisionalProfile?.party || ''})
TONO: ${script.tone}
LOCACIÓN SUGERIDA: ${script.suggestedLocation}
JUSTIFICACIÓN ESTRATÉGICA: ${script.strategicJustification}
NOTAS DE DIRECCIÓN: ${script.directorNotes}

DESGLOSE ESCENA POR ESCENA:
${script.scenes.map(s => `[${s.timeRange}]
VIDEO: ${s.video}
AUDIO (PARLAMENTO): ${s.audio}
GRÁFICOS: ${s.graphics}
`).join('\n')}

---
Generado por CMT PROTEUS • Herramienta de Guiones Condicionados a PDF y Google Search`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedScriptId(script.id);
    setTimeout(() => setCopiedScriptId(null), 3000);
  };

  // ==========================================
  // UTILIDAD: EXPORTAR GUIONES A PDF (JSPDF)
  // ==========================================
  const handleExportPdf = (script: GeneratedScriptItem) => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);
      let yPos = 18;

      // Encabezado institucional CMT Proteus
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, pageWidth, 28, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('CMT PROTEUS • ESTRATEGIA Y PUBLICIDAD POLÍTICA', margin, 12);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text('GUION ESTRATÉGICO CONDICIONADO A ESTRUCTURA PDF Y GOOGLE SEARCH', margin, 18);

      doc.setFontSize(8);
      doc.setTextColor(203, 213, 225); // slate-300
      doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')} | Candidato: ${provisionalProfile?.name || 'N/A'}`, margin, 24);

      yPos = 36;

      // Título del Guion
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      const titleLines = doc.splitTextToSize(script.title, contentWidth);
      doc.text(titleLines, margin, yPos);
      yPos += titleLines.length * 6 + 2;

      // Metadatos
      doc.setFillColor(241, 245, 249); // slate-100
      doc.roundedRect(margin, yPos, contentWidth, 22, 2, 2, 'F');

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(51, 65, 85);
      doc.text(`Formato: ${script.format}`, margin + 4, yPos + 6);
      doc.text(`Duración: ${script.estimatedDuration}`, margin + 70, yPos + 6);
      doc.text(`Nivel de Producción: Nivel ${script.productionLevel} (${script.productionLevelName})`, margin + 120, yPos + 6);

      doc.text(`Tono: ${script.tone}`, margin + 4, yPos + 12);
      doc.text(`Locación: ${script.suggestedLocation.slice(0, 45)}...`, margin + 70, yPos + 12);

      doc.text(`PDF Base: ${pdfStructure?.documentTitle?.slice(0, 40) || 'Estrategia'}`, margin + 4, yPos + 18);
      doc.text(`Partido: ${provisionalProfile?.party || 'Independiente'}`, margin + 120, yPos + 18);

      yPos += 28;

      // Justificación y notas
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 41, 59);
      doc.text('JUSTIFICACIÓN ESTRATÉGICA & CONDICIONAMIENTO:', margin, yPos);
      yPos += 5;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(71, 85, 105);
      const justLines = doc.splitTextToSize(script.strategicJustification, contentWidth);
      doc.text(justLines, margin, yPos);
      yPos += justLines.length * 4.5 + 4;

      // Escenas desglosadas
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(30, 41, 59);
      doc.text('CUADRO TÉCNICO MINUTO A MINUTO:', margin, yPos);
      yPos += 6;

      for (let i = 0; i < script.scenes.length; i++) {
        const sc = script.scenes[i];

        if (yPos > pageHeight - 35) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.rect(margin, yPos, contentWidth, 6, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        doc.text(`TOMA ${i + 1} (${sc.timeRange})`, margin + 3, yPos + 4.2);
        yPos += 8;

        // Parlamentos de audio
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(30, 64, 175); // blue-800
        doc.text('AUDIO (PARLAMENTO DEL CANDIDATO):', margin + 3, yPos);
        yPos += 4;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(15, 23, 42);
        const audioLines = doc.splitTextToSize(`"${sc.audio}"`, contentWidth - 6);
        doc.text(audioLines, margin + 3, yPos);
        yPos += audioLines.length * 4.2 + 2;

        // Video
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(100, 116, 139);
        doc.text('VIDEO / ACCIÓN DE CÁMARA:', margin + 3, yPos);
        yPos += 4;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(51, 65, 85);
        const vidLines = doc.splitTextToSize(sc.video, contentWidth - 6);
        doc.text(vidLines, margin + 3, yPos);
        yPos += vidLines.length * 4 + 2;

        if (sc.graphics && sc.graphics.trim() !== '') {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(180, 83, 9); // amber-700
          doc.text('GRÁFICOS EN PANTALLA:', margin + 3, yPos);
          yPos += 4;

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(71, 85, 105);
          const gfxLines = doc.splitTextToSize(sc.graphics, contentWidth - 6);
          doc.text(gfxLines, margin + 3, yPos);
          yPos += gfxLines.length * 4 + 2;
        }

        yPos += 4;
      }

      // Pie de página
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text('Proteus Nacional • CMT Consultora Estratégica © 2026', margin, pageHeight - 8);

      doc.save(`Guion_${script.id}_${provisionalProfile?.name?.replace(/\s+/g, '_') || 'Candidato'}.pdf`);
    } catch (err) {
      console.error('Error al exportar PDF:', err);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* ==========================================
          CABECERA DE LA HERRAMIENTA
      ========================================== */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/30 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Herramienta Estratégica Soberana
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-400/30 flex items-center gap-1">
                <Search className="w-3 h-3" />
                Google Search Live
              </span>
              {gobStatus?.connected && (
                <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-2.5 py-1 rounded-full border border-indigo-400/30 flex items-center gap-1.5" title={`Directorio: ${gobStatus.gobernacionDir}`}>
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  Gobernación Conectada ({gobStatus.totalNoticias} noticias auditadas | {gobStatus.totalObjetivos} líderes)
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Generador de Guiones con PDF & Perfil Web
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Sube el PDF con las directrices estratégicas o <strong>sincroniza en vivo con el Subproyecto Gobernación (7 Agentes)</strong>. Calibra el perfil del candidato investigándolo con <strong>Google Search</strong> para redactar piezas publicitarias matemáticamente condicionadas a la realidad territorial auditada.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-2.5">
            {/* Sincronización en vivo con Gobernación */}
            <button
              onClick={handleSyncGobernacionReport}
              disabled={isLoadingGobReport || isRunningGobCycle}
              className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-black transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              title="Cargar directamente el último informe auditado emitido por la Unidad de 7 Agentes"
            >
              <Database className={`w-4 h-4 text-emerald-200 ${isLoadingGobReport ? 'animate-spin' : ''}`} />
              <span>{isLoadingGobReport ? 'Sincronizando...' : 'Sincronizar Gobernación'}</span>
            </button>

            {/* Ejecutar ciclo de los 7 agentes */}
            <button
              onClick={handleRunGobernacionCycle}
              disabled={isRunningGobCycle || isLoadingGobReport}
              className="px-3.5 py-2.5 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 disabled:opacity-50 text-white rounded-xl text-xs font-black transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              title="Ejecutar el ciclo completo de los 7 agentes (Recopilador, Lector, Compilador, Auditor, Analista Político y Redactor)"
            >
              <Activity className={`w-4 h-4 text-amber-200 ${isRunningGobCycle ? 'animate-spin' : ''}`} />
              <span>{isRunningGobCycle ? 'Ejecutando Agentes...' : 'Ejecutar 7 Agentes'}</span>
            </button>

            <button
              onClick={() => {
                setPdfStructure(SAMPLE_STRATEGIC_PDF_STRUCTURE);
                setPdfProcessError(null);
                setGobCycleResult(null);
              }}
              className="px-3 py-2.5 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 hover:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/20 active:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/30 text-white rounded-xl text-xs font-bold transition-colors border border-white/20 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              title="Cargar la estructura de ejemplo oficial de CMT Proteus"
            >
              <FileCheck className="w-3.5 h-3.5 text-slate-300" />
              <span>Ejemplo CMT</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-black transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Subir PDF</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="hidden"
            />
          </div>
        </div>

        {/* Notificación de feedback del ciclo de Gobernación */}
        {gobCycleResult && (
          <div className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs px-4 py-3 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{gobCycleResult}</span>
            </div>
            <button 
              onClick={() => setGobCycleResult(null)} 
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ==========================================
          COLUMNAS PRINCIPALES:
          COLUMNA IZQUIERDA (6 Cols): ESTRUCTURA DEL PDF
          COLUMNA DERECHA (6 Cols): PERFIL GOOGLE SEARCH
      ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* =========================================================
            BLOQUE 1: ESTRUCTURA DEL PDF SUBIDO (6 Cols)
        ========================================================= */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 shadow-sm border border-white/10/90 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 text-blue-800 flex items-center justify-center font-black text-sm">
                  1
                </div>
                <div>
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-700" />
                    Documento PDF Estratégico
                  </h2>
                  <p className="text-xs text-slate-400">Norma estructural y directrices de guiones</p>
                </div>
              </div>

              {pdfStructure && (
                <div className="flex items-center gap-1">
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                    pdfStructure.isExample 
                      ? 'bg-amber-500/20 text-amber-300 text-amber-900 border border-amber-300' 
                      : 'bg-emerald-500/20 text-emerald-300 text-emerald-900 border border-emerald-300'
                  }`}>
                    <CheckCircle2 className="w-3 h-3" />
                    {pdfStructure.isExample ? 'Estructura de Ejemplo' : 'PDF Personalizado'}
                  </span>
                </div>
              )}
            </div>

            {/* Zona Drag & Drop / Selección de Archivo */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                isProcessingPdf
                  ? 'border-blue-400 bg-sky-500/10/60'
                  : 'border-slate-300 hover:border-blue-500 hover:bg-white/[0.04] backdrop-blur-sm border border-white/10'
              }`}
            >
              {isProcessingPdf ? (
                <div className="flex flex-col items-center justify-center py-3 space-y-2">
                  <RefreshCw className="w-7 h-7 text-blue-600 animate-spin" />
                  <p className="text-xs font-bold text-blue-900">Analizando minuciosamente el PDF con IA...</p>
                  <p className="text-[11px] text-slate-400">Extrayendo ejes temáticos, dolores territoriales y reglas de guion</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-2 space-y-1.5">
                  <div className="w-10 h-10 bg-sky-500/10 text-blue-600 rounded-xl flex items-center justify-center mb-1">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-white">
                    Arrastra tu archivo PDF aquí o haz clic para seleccionarlo
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Soporta cualquier PDF con directrices de publicidad política, planes de gobierno o manuales de mensaje
                  </p>
                </div>
              )}
            </div>

            {/* Mensaje de error al procesar el PDF */}
            {pdfProcessError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{pdfProcessError}</span>
              </div>
            )}

            {/* Visualizador de la estructura extraída */}
            {pdfStructure && (
              <div className="space-y-3 pt-1">
                {/* Metadatos del documento */}
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-2xl p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <span className="truncate max-w-[280px] text-white font-black">
                      {pdfStructure.documentTitle}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {pdfStructure.fileSize}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {pdfStructure.executiveSummary}
                  </p>
                </div>

                {/* Pestañas para ver el desglose */}
                <div className="flex border-b border-white/10 gap-1.5 text-xs overflow-x-auto pb-1">
                  <button
                    type="button"
                    onClick={() => setActivePdfTab('matrix')}
                    className={`pb-2 px-2 font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                      activePdfTab === 'matrix'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    Matriz de Ejes ({pdfStructure.hierarchyMatrix?.length || pdfStructure.strategicAxes.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePdfTab('thermometer')}
                    className={`pb-2 px-2 font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                      activePdfTab === 'thermometer'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    Termómetro Voces ({pdfStructure.thermometerVoices?.length || 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePdfTab('summary')}
                    className={`pb-2 px-2 font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                      activePdfTab === 'summary'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    Resumen & Normas
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePdfTab('axes')}
                    className={`pb-2 px-2 font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                      activePdfTab === 'axes'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    Ejes & Dolores ({pdfStructure.strategicAxes.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePdfTab('rules')}
                    className={`pb-2 px-2 font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                      activePdfTab === 'rules'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    Reglas ({pdfStructure.scriptRules.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePdfTab('structure')}
                    className={`pb-2 px-2 font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                      activePdfTab === 'structure'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-400 hover:text-white'
                    }`}
                  >
                    Hook / CTA
                  </button>
                </div>

                {/* Contenido según pestaña activa */}
                <div className="max-h-72 overflow-y-auto pr-1 space-y-2 text-xs">
                  {/* TAB 1: MATRIZ JERARQUIZADA DE EJES */}
                  {activePdfTab === 'matrix' && (
                    <div className="space-y-2">
                      <div className="p-2.5 bg-slate-900 text-white rounded-xl flex items-center justify-between text-[11px]">
                        <div>
                          <span className="text-slate-400 font-bold block text-[9px] uppercase tracking-wider">Metodología CMT Proteus</span>
                          <span className="font-bold text-slate-100">Matriz de Relevancia Ponderada</span>
                        </div>
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 font-mono px-2 py-0.5 rounded border border-blue-400/30">
                          {pdfStructure.hierarchyMatrix?.length || pdfStructure.strategicAxes.length} Ejes Evaluados
                        </span>
                      </div>

                      {(pdfStructure.hierarchyMatrix && pdfStructure.hierarchyMatrix.length > 0
                        ? pdfStructure.hierarchyMatrix
                        : pdfStructure.strategicAxes.map((a, i) => ({
                            ranking: a.ranking || i + 1,
                            axisTitle: a.title,
                            status: a.status || 'Crítico',
                            relevanceScore: a.relevanceScore || 10,
                            totalReports: 1,
                            representativeFact: a.description
                          }))
                      ).map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl space-y-1.5 transition-all hover:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:border-slate-300"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 min-w-0">
                              <span className="w-5 h-5 rounded-md bg-slate-800 text-white font-black text-[10px] flex items-center justify-center flex-shrink-0">
                                #{item.ranking}
                              </span>
                              <span className="font-bold text-white text-xs truncate">
                                {item.axisTitle}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <span
                                className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 ${
                                  item.status.toLowerCase().includes('crítico') || item.status.toLowerCase().includes('critico')
                                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                    : item.status.toLowerCase().includes('alerta')
                                      ? 'bg-amber-500/20 text-amber-300 text-amber-800 border border-amber-200'
                                      : 'bg-emerald-500/20 text-emerald-300 text-emerald-800 border border-emerald-200'
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    item.status.toLowerCase().includes('crítico') || item.status.toLowerCase().includes('critico')
                                      ? 'bg-rose-600'
                                      : item.status.toLowerCase().includes('alerta')
                                        ? 'bg-amber-600'
                                        : 'bg-emerald-600'
                                  }`}
                                />
                                {item.status}
                              </span>

                              <span className="text-[10px] font-mono font-black text-blue-800 bg-sky-500/10 px-1.5 py-0.5 rounded border border-blue-200">
                                {item.relevanceScore} pts
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-300 leading-snug">
                            {item.representativeFact}
                          </p>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5 border-t border-white/10">
                            <span>Volumen fáctico: <strong>{item.totalReports} reportes auditados</strong></span>
                            <span className="text-slate-400">Ponderación matemática</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 2: TERMÓMETRO DE VOCES E INFLUENCIA */}
                  {activePdfTab === 'thermometer' && (
                    <div className="space-y-2">
                      <div className="p-2.5 bg-blue-900 text-white rounded-xl flex items-center justify-between text-[11px]">
                        <div>
                          <span className="text-blue-300 font-bold block text-[9px] uppercase tracking-wider">Subprotocolo de Opinión Pública</span>
                          <span className="font-bold text-slate-100">Citas Fácticas & Posicionamiento en 4 Cuadrantes</span>
                        </div>
                        <span className="text-[10px] bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/20 text-white font-mono px-2 py-0.5 rounded">
                          {pdfStructure.thermometerVoices?.length || 0} Voces
                        </span>
                      </div>

                      {pdfStructure.thermometerVoices && pdfStructure.thermometerVoices.length > 0 ? (
                        pdfStructure.thermometerVoices.map((v, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl space-y-1 hover:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:border-slate-300 transition-all"
                          >
                            <div className="flex items-center justify-between gap-1 text-xs">
                              <span className="font-bold text-white flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                                {v.fuente}
                              </span>
                              <span className="text-[9px] bg-slate-200 text-slate-200 px-1.5 py-0.5 rounded font-bold uppercase">
                                {v.cuadrante}
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-200 italic bg-amber-500/10/60 p-2 rounded-lg border border-amber-200/60">
                              "{v.cita}"
                            </p>

                            <div className="text-[10px] text-slate-400 text-right">
                              Ámbito: <span className="font-medium text-slate-300">{v.subregion}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-slate-400 text-xs">
                          No se registraron citas del termómetro de opinión en este documento.
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: RESUMEN Y NORMAS */}
                  {activePdfTab === 'summary' && (
                    <div className="space-y-2">
                      {pdfStructure.administration && (
                        <div className="p-2.5 bg-slate-100 border border-white/10 rounded-xl">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Administración Analizada:
                          </span>
                          <span className="text-xs font-bold text-white">
                            {pdfStructure.administration}
                          </span>
                        </div>
                      )}

                      <div className="p-3 bg-sky-500/10/70 border border-blue-100 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block">
                          Tonos Recomendados por el PDF:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {pdfStructure.toneAndStyle.recommendedTones.map((t, idx) => (
                            <span key={idx} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl space-y-1">
                        <span className="text-[10px] font-bold text-rose-900 uppercase tracking-wider block">
                          Restricciones & Prohibiciones:
                        </span>
                        <ul className="list-disc list-inside text-[11px] text-rose-800 space-y-0.5">
                          {pdfStructure.toneAndStyle.constraints.map((c, idx) => (
                            <li key={idx}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: EJES Y DOLORES */}
                  {activePdfTab === 'axes' && (
                    <div className="space-y-2">
                      {pdfStructure.strategicAxes.map((ax, idx) => (
                        <div key={idx} className="p-2.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl space-y-1">
                          <div className="font-bold text-white text-xs flex items-center justify-between">
                            <span>{ax.ranking || idx + 1}. {ax.title}</span>
                            <span className="text-[9px] bg-sky-500/20 text-sky-300 text-blue-800 px-1.5 py-0.5 rounded font-bold">
                              Ángulo Publicitario
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300">{ax.description}</p>
                          <div className="text-[10px] text-amber-800 bg-amber-500/10 p-1.5 rounded border border-amber-200/80">
                            <strong>Dolor Clave:</strong> {ax.keyPain}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 5: REGLAS */}
                  {activePdfTab === 'rules' && (
                    <div className="space-y-2">
                      {pdfStructure.scriptRules.map((rule, idx) => (
                        <div key={idx} className="p-2.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-xs">{rule.rule}</span>
                            <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                              rule.importance === 'critico'
                                ? 'bg-rose-100 text-rose-800'
                                : rule.importance === 'alto'
                                  ? 'bg-amber-500/20 text-amber-300 text-amber-800'
                                  : 'bg-slate-200 text-slate-200'
                            }`}>
                              {rule.importance}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">{rule.instructions}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 6: HOOK / CTA */}
                  {activePdfTab === 'structure' && (
                    <div className="space-y-2">
                      <div className="p-2.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-200 uppercase block">Gancho Inicial ({pdfStructure.narrativeStructure.hookDuration}):</span>
                        <p className="text-[11px] text-white mt-0.5">{pdfStructure.narrativeStructure.hookInstructions}</p>
                      </div>
                      <div className="p-2.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-200 uppercase block">Desarrollo del Mensaje:</span>
                        <p className="text-[11px] text-white mt-0.5">{pdfStructure.narrativeStructure.developmentInstructions}</p>
                      </div>
                      <div className="p-2.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-200 uppercase block">Directriz de Contraste Político:</span>
                        <p className="text-[11px] text-white mt-0.5">{pdfStructure.narrativeStructure.contrastDirective}</p>
                      </div>
                      <div className="p-2.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl">
                        <span className="text-[10px] font-bold text-slate-200 uppercase block">Cierre y Llamado a la Acción (CTA):</span>
                        <p className="text-[11px] text-white mt-0.5">{pdfStructure.narrativeStructure.callToActionInstructions}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================
            BLOQUE 2: INVESTIGACIÓN DE PERFIL CON GOOGLE SEARCH (6 Cols)
        ========================================================= */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 shadow-sm border border-white/10/90 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 text-amber-800 flex items-center justify-center font-black text-sm">
                  2
                </div>
                <div>
                  <h2 className="text-base font-black text-white flex items-center gap-2">
                    <Search className="w-4 h-4 text-amber-700" />
                    Perfil del Candidato (Google Search)
                  </h2>
                  <p className="text-xs text-slate-400">Búsqueda web en tiempo real sin alucinaciones</p>
                </div>
              </div>
            </div>

            {/* Input y Botón de Búsqueda con Google Search */}
            <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10/90 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-blue-600" />
                  Investigar Candidato con Google Search
                </label>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5" />
                  En Vivo
                </span>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={candidateSearchQuery}
                    onChange={(e) => {
                      setCandidateSearchQuery(e.target.value);
                      if (searchCandidateError) setSearchCandidateError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !isSearchingCandidateWeb) {
                        handleSearchCandidateWithGoogle();
                      }
                    }}
                    placeholder="Escribe el nombre del candidato (ej. Luis Horacio Gallón, Eugenio Prieto...)"
                    className="w-full text-xs bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-slate-300 rounded-xl pl-3 pr-8 py-2.5 font-semibold text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {candidateSearchQuery && (
                    <button
                      onClick={() => setCandidateSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleSearchCandidateWithGoogle()}
                  disabled={isSearchingCandidateWeb || !candidateSearchQuery.trim()}
                  className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-black shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50 whitespace-nowrap cursor-pointer"
                >
                  {isSearchingCandidateWeb ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5" />
                  )}
                  <span>{isSearchingCandidateWeb ? 'Buscando...' : 'Buscar'}</span>
                </button>
              </div>

              {/* Sugerencias Rápidas */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[10px] text-slate-400 font-semibold">Sugerencias:</span>
                {['Luis Horacio Gallón', 'Andrés Julián Rendón', 'Eugenio Prieto', 'Mauricio Tobón', 'Juan Diego Gómez'].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => handleSearchCandidateWithGoogle(name)}
                    disabled={isSearchingCandidateWeb}
                    className="text-[10px] bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-slate-100 text-slate-200 px-2 py-0.5 rounded-lg border border-white/10 transition-colors font-medium cursor-pointer"
                  >
                    {name}
                  </button>
                ))}
              </div>

              {/* Estado de carga */}
              {isSearchingCandidateWeb && (
                <div className="bg-sky-500/10 border border-blue-200 rounded-xl p-2.5 text-xs text-blue-900 flex items-center gap-2 animate-pulse">
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-600 flex-shrink-0" />
                  <div className="text-[11px]">
                    Consultando <strong>Google Search</strong> en tiempo real... Extrayendo afiliación política, cargos fácticos, banderas y tono discursivo.
                  </div>
                </div>
              )}

              {/* Error si falló */}
              {searchCandidateError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-2 text-xs text-red-700 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    <span>{searchCandidateError}</span>
                  </div>
                  <button
                    onClick={() => handleSearchCandidateWithGoogle()}
                    className="text-[10px] font-bold text-red-800 underline ml-2 cursor-pointer"
                  >
                    Reintentar
                  </button>
                </div>
              )}
            </div>

            {/* Tarjeta de Perfil Investigado */}
            {provisionalProfile && (
              <div className="bg-gradient-to-br from-emerald-50/90 via-teal-50/50 to-white border-2 border-emerald-300/80 rounded-2xl p-4 shadow-sm space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[11px] font-black text-emerald-900 uppercase tracking-wide flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Perfil Investigado con Google Search
                    </span>
                    <span className="text-[10px] text-emerald-700 font-medium bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-md">
                      {provisionalProfile.timestamp}
                    </span>
                    {provisionalProfile.source === 'manual' && (
                      <span className="text-[9.5px] font-bold bg-amber-500/20 text-amber-300 text-amber-900 border border-amber-300 px-1.5 py-0.5 rounded">
                        Editado por usuario
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={isEditingProfile ? () => setIsEditingProfile(false) : handleStartEditProfile}
                      className={`text-[11px] font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                        isEditingProfile
                          ? 'bg-slate-200 text-white hover:bg-slate-300'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      }`}
                    >
                      <Edit3 className="w-3 h-3" />
                      {isEditingProfile ? 'Cancelar' : 'Modificar'}
                    </button>
                    {!isEditingProfile && (
                      <button
                        type="button"
                        onClick={() => setShowProfileDetails(!showProfileDetails)}
                        className="text-[11px] text-emerald-800 hover:text-emerald-900 font-bold flex items-center gap-0.5 px-2 py-0.5 rounded-lg hover:bg-emerald-500/20 text-emerald-300/60 transition-colors cursor-pointer"
                      >
                        {showProfileDetails ? 'Ocultar' : 'Detalles'}
                        {showProfileDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Formulario de Edición */}
                {isEditingProfile ? (
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/95 border border-emerald-300 rounded-xl p-3 space-y-2.5 shadow-inner">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-200 uppercase">Nombre del Candidato</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-lg text-xs font-black text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-200 uppercase">Partido / Movimiento</label>
                        <input
                          type="text"
                          value={editParty}
                          onChange={(e) => setEditParty(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-lg text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-200 uppercase">Tono Narrativo</label>
                      <input
                        type="text"
                        value={editTone}
                        onChange={(e) => setEditTone(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-lg text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-200 uppercase">Banderas y Ejes de Campaña</label>
                      <textarea
                        rows={2}
                        value={editFocus}
                        onChange={(e) => setEditFocus(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-lg text-xs text-white resize-none"
                      />
                    </div>

                    {/* Selectores de Postura */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-white uppercase">Frente a Gob. Nacional</label>
                        <select
                          value={editNationalAlignment}
                          onChange={(e) => setEditNationalAlignment(e.target.value as NationalAlignmentType)}
                          className="w-full text-xs font-bold bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-slate-300 rounded-lg p-1.5 text-white"
                        >
                          <option value="opositor">Opositor (Crítico)</option>
                          <option value="aliado">Aliado (Afín)</option>
                          <option value="independiente">Independiente</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-white uppercase">Frente a Gobernación</label>
                        <select
                          value={editLocalAlignment}
                          onChange={(e) => setEditLocalAlignment(e.target.value as LocalAntioquiaAlignmentType)}
                          className="w-full text-xs font-bold bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-slate-300 rounded-lg p-1.5 text-white"
                        >
                          <option value="aliado">Aliado (Constructivo)</option>
                          <option value="independiente">Independiente</option>
                          <option value="opositor">Opositor</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-3 py-1 text-xs text-slate-300 hover:text-white cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveEditProfile}
                        className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" /> Guardar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-black text-white">{provisionalProfile.name}</div>
                        <button
                          type="button"
                          onClick={handleStartEditProfile}
                          className="text-[10.5px] text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-emerald-500/20 text-emerald-300/60 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" /> Editar
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <span className="text-[10px] font-bold bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-white px-2 py-0.5 rounded-md border border-emerald-200">
                          Partido: {provisionalProfile.party}
                        </span>
                        <span className="text-[10px] font-bold bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-white px-2 py-0.5 rounded-md border border-emerald-200">
                          Tono: {provisionalProfile.tone}
                        </span>
                      </div>

                      {/* Postura Nacional */}
                      <div className={`mt-2 p-2 rounded-xl border flex items-start gap-2 ${
                        provisionalProfile.nationalAlignment === 'opositor'
                          ? 'bg-rose-50/90 border-rose-200 text-rose-950'
                          : provisionalProfile.nationalAlignment === 'aliado'
                            ? 'bg-emerald-500/10/90 border-emerald-200 text-emerald-950'
                            : 'bg-sky-50/90 border-sky-200 text-sky-950'
                      }`}>
                        <div className="p-1 rounded-lg flex-shrink-0 mt-0.5 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl shadow-2xs">
                          {provisionalProfile.nationalAlignment === 'opositor' ? (
                            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                          ) : provisionalProfile.nationalAlignment === 'aliado' ? (
                            <Handshake className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Scale className="w-3.5 h-3.5 text-sky-600" />
                          )}
                        </div>
                        <div className="text-[11px] leading-tight">
                          <strong>Frente a Gob. Nacional: {provisionalProfile.nationalAlignment.toUpperCase()}</strong>
                          <p className="text-[10px] opacity-80 mt-0.5">{provisionalProfile.nationalAlignmentRationale}</p>
                        </div>
                      </div>

                      {/* Postura Departamental */}
                      <div className={`mt-1.5 p-2 rounded-xl border flex items-start gap-2 ${
                        provisionalProfile.localAlignment === 'aliado'
                          ? 'bg-emerald-500/10/90 border-emerald-200 text-emerald-950'
                          : provisionalProfile.localAlignment === 'opositor'
                            ? 'bg-rose-50/90 border-rose-200 text-rose-950'
                            : 'bg-sky-50/90 border-sky-200 text-sky-950'
                      }`}>
                        <div className="p-1 rounded-lg flex-shrink-0 mt-0.5 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl shadow-2xs">
                          <Building2 className="w-3.5 h-3.5 text-amber-700" />
                        </div>
                        <div className="text-[11px] leading-tight">
                          <strong>Frente a Gobernación: {(provisionalProfile.localAlignment || 'aliado').toUpperCase()}</strong>
                          <p className="text-[10px] opacity-80 mt-0.5">{provisionalProfile.localAlignmentRationale}</p>
                        </div>
                      </div>

                      {/* Detalles Expandibles */}
                      {showProfileDetails && (
                        <div className="mt-2.5 pt-2 border-t border-emerald-200/80 space-y-1.5 text-xs text-slate-200">
                          <div>
                            <strong className="text-white text-[11px]">Banderas y Ejes:</strong>
                            <p className="text-[11px] text-slate-300">{provisionalProfile.focusAreas}</p>
                          </div>
                          <div>
                            <strong className="text-white text-[11px]">Trayectoria Investigada:</strong>
                            <p className="text-[11px] text-slate-300">{provisionalProfile.experienceBio}</p>
                          </div>
                          <div>
                            <strong className="text-white text-[11px]">Postura Territorial:</strong>
                            <p className="text-[11px] text-slate-300">{provisionalProfile.subregionalStance}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ==========================================
          BLOQUE 3: PANEL DE CONFIGURACIÓN & DISPARO DE GUIONES
      ========================================== */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 shadow-sm border border-white/10/90 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-black text-sm">
              3
            </div>
            <div>
              <h2 className="text-base font-black text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-700" />
                Parámetros de Producción y Disparo de Guiones
              </h2>
              <p className="text-xs text-slate-400">
                Condicionamiento simultáneo al PDF y al Perfil de Google Search
              </p>
            </div>
          </div>
        </div>

        {/* Selección de Nivel de Producción (1 a 5) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Video className="w-4 h-4 text-purple-600" />
              Nivel de Simplicidad y Producción Requerido:
            </label>
            <span className="text-xs font-black text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full">
              Nivel {selectedProductionLevel} de 5
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {PRODUCTION_COMPLEXITY_LEVELS.map((lvl) => {
              const isSelected = selectedProductionLevel === lvl.level;
              return (
                <button
                  key={lvl.level}
                  type="button"
                  onClick={() => setSelectedProductionLevel(lvl.level)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/80 shadow-sm ring-2 ring-purple-500/20'
                      : 'border-white/10 hover:border-slate-300 hover:bg-white/[0.04] backdrop-blur-sm border border-white/10'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-200'
                      }`}>
                        Nivel {lvl.level}
                      </span>
                    </div>
                    <div className="font-black text-xs text-white leading-tight pt-1">
                      {lvl.name}
                    </div>
                    <p className="text-[10px] text-slate-400 leading-snug">
                      {lvl.subtitle}
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="text-[9px] font-bold text-purple-700 block truncate">
                      {lvl.tags[0]}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ajuste de Eje Temático y Público */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {/* Eje del PDF a priorizar */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-200 uppercase">Eje del PDF a Priorizar</label>
            <select
              value={selectedAxisIndex}
              onChange={(e) => setSelectedAxisIndex(parseInt(e.target.value))}
              className="w-full text-xs font-semibold bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="-1">Todos los ejes del PDF (Paquete Integral)</option>
              {pdfStructure?.strategicAxes.map((ax, idx) => (
                <option key={idx} value={idx}>
                  {idx + 1}. {ax.title}
                </option>
              ))}
            </select>
          </div>

          {/* Público Objetivo */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-200 uppercase">Público / Target Objetivo</label>
            <input
              type="text"
              value={targetAudienceFocus}
              onChange={(e) => setTargetAudienceFocus(e.target.value)}
              placeholder="Ej: Madres cabeza de familia, comerciantes, jóvenes..."
              className="w-full text-xs font-semibold bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Ámbito Geográfico */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-200 uppercase">Ámbito Geográfico / Territorio</label>
            <input
              type="text"
              value={targetGeography}
              onChange={(e) => setTargetGeography(e.target.value)}
              placeholder="Ej: Antioquia / Subregión Oriente / Área Metropolitana..."
              className="w-full text-xs font-semibold bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Botón de Generación de Guiones */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <div className="text-xs text-slate-400">
            {pdfStructure && provisionalProfile ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Listo para redactar: PDF ("{pdfStructure.documentTitle.slice(0, 30)}...") + Perfil ("{provisionalProfile.name}").
              </span>
            ) : (
              <span className="text-amber-700 font-medium">
                Completa la carga del PDF y la investigación del candidato para redactar.
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleGenerateScripts}
            disabled={isGeneratingScripts || !pdfStructure || !provisionalProfile}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 active:scale-95 text-white rounded-2xl text-sm font-black shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
          >
            {isGeneratingScripts ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Redactando Guiones Condicionados...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generar Paquete de Guiones Estratégicos</span>
              </>
            )}
          </button>
        </div>

        {generateError && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{generateError}</span>
          </div>
        )}
      </div>

      {/* ==========================================
          BLOQUE 4: RESULTADO DE LOS GUIONES GENERADOS
      ========================================== */}
      {generatedScripts.length > 0 && (
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 sm:p-8 shadow-md border border-white/10/90 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-emerald-800 font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  Paquete de Guiones Producido
                </span>
                <span className="text-xs text-slate-400">
                  {generatedScripts.length} piezas audiovisuales
                </span>
              </div>
              <h3 className="text-lg font-black text-white mt-1">
                Guiones Condicionados: {provisionalProfile?.name} • Nivel {selectedProductionLevel}
              </h3>
            </div>

            {/* Selector de Guion Activo */}
            <div className="flex gap-2">
              {generatedScripts.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveScriptIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    activeScriptIndex === idx
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-200 hover:bg-slate-200'
                  }`}
                >
                  Guion {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Guion Activo en Detalle */}
          {generatedScripts[activeScriptIndex] && (
            <div className="space-y-6">
              {/* Encabezado y Acciones del Guion */}
              {(() => {
                const currentScript = generatedScripts[activeScriptIndex];
                return (
                  <>
                    <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                          {currentScript.format} • {currentScript.estimatedDuration}
                        </span>
                        <h4 className="text-lg font-black text-white">
                          {currentScript.title}
                        </h4>
                        <p className="text-xs text-slate-300">
                          Locación sugerida: <strong className="text-white">{currentScript.suggestedLocation}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => handleCopyScript(currentScript)}
                          className="px-3 py-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 hover:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/20 active:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/30 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer border border-white/20"
                        >
                          {copiedScriptId === currentScript.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleExportPdf(currentScript)}
                          className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Descargar PDF</span>
                        </button>
                      </div>
                    </div>

                    {/* Ficha de Justificación Estratégica del Guion */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-sky-500/10/70 border border-blue-100 rounded-2xl p-4 space-y-1.5">
                        <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider block flex items-center gap-1">
                          <Target className="w-3.5 h-3.5 text-blue-700" />
                          Justificación del Condicionamiento (PDF + Perfil):
                        </span>
                        <p className="text-slate-200 leading-relaxed">
                          {currentScript.strategicJustification}
                        </p>
                      </div>

                      <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-4 space-y-1.5">
                        <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider block flex items-center gap-1">
                          <Video className="w-3.5 h-3.5 text-purple-700" />
                          Notas de Dirección & Candidato:
                        </span>
                        <p className="text-slate-200 leading-relaxed">
                          {currentScript.directorNotes}
                        </p>
                      </div>
                    </div>

                    {/* Desglose Escena por Escena en Cuadro Técnico */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                        <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                        Desglose Técnico y Parlamentos del Candidato:
                      </h5>

                      <div className="border border-white/10 rounded-2xl overflow-hidden divide-y divide-slate-100 shadow-2xs">
                        {currentScript.scenes.map((scene, scIdx) => (
                          <div key={scIdx} className="p-4 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-white/[0.04] backdrop-blur-sm border border-white/10/60 transition-colors space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-black text-blue-900 bg-sky-500/20 text-sky-300 px-2.5 py-0.5 rounded-md">
                                Toma {scIdx + 1}: {scene.timeRange}
                              </span>
                              {scIdx === 0 && (
                                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                                  Hook Inicial (0-3s)
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
                              {/* Audio / Diálogos */}
                              <div className="md:col-span-6 space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                                  Parlamento Textual del Candidato (Audio):
                                </span>
                                <div className="p-3 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl border border-white/10/80 font-medium text-white italic text-xs leading-relaxed">
                                  "{scene.audio}"
                                </div>
                              </div>

                              {/* Video y Cámara */}
                              <div className="md:col-span-3 space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                                  Video & Encuadre de Cámara:
                                </span>
                                <p className="text-slate-200 leading-relaxed">
                                  {scene.video}
                                </p>
                              </div>

                              {/* Gráficos / Chyrons */}
                              <div className="md:col-span-3 space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                                  Texto en Pantalla / Gráficos:
                                </span>
                                <p className="text-amber-800 font-medium leading-relaxed">
                                  {scene.graphics || 'Sin gráfica en pantalla'}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

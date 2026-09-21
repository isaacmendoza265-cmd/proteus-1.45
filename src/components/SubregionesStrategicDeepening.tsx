import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Search,
  Radio,
  Video,
  Share2,
  Copy,
  Check,
  Download,
  RefreshCw,
  ExternalLink,
  Sparkles,
  Newspaper,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  Sliders,
  Film,
  Volume2,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
  ListFilter,
  Eye,
  Calendar,
  Tag,
  Camera,
  Smartphone,
  Clapperboard,
  Tv,
  Mic,
  CheckSquare,
  Square,
  Globe2,
  BookOpen,
  FolderArchive,
  Printer,
  FileCheck,
  Flame,
  Handshake,
  Scale,
  Building2,
  Clock
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { jsPDF } from 'jspdf';
import { GoogleGenAI } from '@google/genai';
import { SubregionInfo } from '../data/antioquiaSubregionesData';
import { CandidateProfile } from './CandidateProfileManager';
import { ProvisionalCandidateProfile } from './SubregionesManager';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
let cachedProteusLogoDataUrl: string | null = null;

export type ThematicAxisType = 
  | 'Movilidad'
  | 'Seguridad'
  | 'Espacio Público'
  | 'Gestión del Riesgo'
  | 'Propuesta Programática';

export interface StrategicNewsItem {
  id: string;
  title: string;
  mediaSource: 'El Colombiano' | 'Qhubo' | 'MiOriente' | 'Minuto 30' | 'Las 2Orillas' | string;
  date: string;
  summary: string;
  url?: string;
  relevance: string;
  selected: boolean;
}

export interface StrategicThemeOption {
  id: string;
  title: string;
  category: string;
  axis: ThematicAxisType;
  summary: string;
  sourceContext: string;
}

export interface ScriptComplexityOption {
  level: number;
  id: string;
  name: string;
  shortName: string;
  badge: string;
  description: string;
  tags: string[];
}

export const SCRIPT_COMPLEXITY_OPTIONS: ScriptComplexityOption[] = [
  {
    level: 1,
    id: 'nivel-1-cinematografico',
    name: 'Nivel 1: Producción Cinematográfica / Muy Elaborado',
    shortName: '1. Cinematográfico',
    badge: 'Máxima Elaboración',
    description: 'Múltiples locaciones en la subregión, tomas aéreas de dron, iluminación cinematográfica, banda sonora orquestal, montaje multicámara y postproducción de gráficos 3D.',
    tags: ['Multi-locación', 'Tomas con Dron', 'Postproducción 3D', 'Banda Sonora']
  },
  {
    level: 2,
    id: 'nivel-2-broadcast-pro',
    name: 'Nivel 2: Producción de Campaña Estándar (TV & Pauta Pro)',
    shortName: '2. Broadcast Pro',
    badge: 'Televisión & Pauta',
    description: 'Formato televisivo y pauta digital profesional: 3 a 4 planos en terreno, testimonios reales intercalados, locución institucional en off combinada con el candidato y chyrons con titulares de prensa.',
    tags: ['3-4 Planos', 'Testimonios', 'Voz en Off + Candidato', 'Chyrons de Prensa']
  },
  {
    level: 3,
    id: 'nivel-3-reporteria-terreno',
    name: 'Nivel 3: Producción Intermedia (Reportería en Terreno)',
    shortName: '3. Reportería Ágil',
    badge: 'Periodístico / Ágil',
    description: 'Estilo periodístico ágil: el candidato con micrófono de mano en el lugar exacto de la noticia, 1 o 2 planos de apoyo con transeúntes, ritmo dinámico y edición rápida para redes.',
    tags: ['Micrófono en Mano', 'Cámara al Hombro', 'Lugar de los Hechos', 'Edición Rápida']
  },
  {
    level: 4,
    id: 'nivel-4-smartphone-ligero',
    name: 'Nivel 4: Producción Ligera (Formato Smartphone / Espontáneo)',
    shortName: '4. Celular Espontáneo',
    badge: 'Smartphone / Cercano',
    description: 'Grabación con celular en estabilizador o mano alzada, lenguaje cotidiano y cercano, audio directo con corbatero inalámbrico, edición mínima de 1 o 2 cortes, pensado para TikTok e Instagram.',
    tags: ['Formato Vertical (9:16)', 'Grabación Smartphone', 'Audio Corbatero', '1-2 Cortes']
  },
  {
    level: 5,
    id: 'nivel-5-una-sola-toma',
    name: 'Nivel 5: Una Sola Toma (One-Shot / Plano Secuencia)',
    shortName: '5. Una Sola Toma',
    badge: 'One-Shot / 0 Cortes',
    description: 'Video grabado en una sola toma continua de principio a fin, sin ningún corte de edición. El candidato camina y habla de frente a la cámara en el lugar de los hechos con naturalidad total, gestualidad sincera y remate directo.',
    tags: ['0 Cortes de Edición', 'Plano Secuencia Continuo', 'Máxima Credibilidad', 'Toma Única']
  }
];

interface SubregionesStrategicDeepeningProps {
  analysisReport: string;
  subregion: SubregionInfo;
  office: { id: string; label: string; scope: string; nature: string };
  candidateName: string;
  candidateTone: string;
  candidateParty: string;
  candidateProfile?: CandidateProfile | null;
  provisionalProfile?: ProvisionalCandidateProfile | null;
  candidateNationalAlignment?: 'aliado' | 'independiente' | 'opositor';
  candidateNationalAlignmentRationale?: string;
  candidateLocalAlignment?: 'aliado' | 'independiente' | 'opositor';
  candidateLocalAlignmentRationale?: string;
  demographics: { label: string; totalCount: number; estimatedVoterTurnout: number };
  isGeneralDemographic: boolean;
}

export const SubregionesStrategicDeepening: React.FC<SubregionesStrategicDeepeningProps> = ({
  analysisReport,
  subregion,
  office,
  candidateName,
  candidateTone,
  candidateParty,
  candidateProfile,
  provisionalProfile,
  candidateNationalAlignment,
  candidateNationalAlignmentRationale,
  candidateLocalAlignment,
  candidateLocalAlignmentRationale,
  demographics,
  isGeneralDemographic
}) => {
  // Postura nacional efectiva y justificación para condicionar el guion y el dossier
  const activeNationalAlignment: 'aliado' | 'independiente' | 'opositor' =
    candidateNationalAlignment ||
    provisionalProfile?.nationalAlignment ||
    ((candidateProfile as any)?.posturaGobiernoNacional as any) ||
    'opositor';

  const activeNationalRationale: string =
    candidateNationalAlignmentRationale ||
    provisionalProfile?.nationalAlignmentRationale ||
    ((candidateProfile as any)?.posturaGobiernoNacionalDetalle as string) ||
    (activeNationalAlignment === 'opositor'
      ? 'Opositor al gobierno nacional: Línea crítica con defensa de la autonomía departamental y sintonía con líderes como Álvaro Uribe.'
      : activeNationalAlignment === 'aliado'
        ? 'Aliado del gobierno nacional: Articulación y cofinanciación directa con Abelardo De La Espriella.'
        : 'Independiente: Autonomía frente a los bloques de poder nacional, enfoque 100% municipalista.');

  // Cercanía con el gobierno actual del departamento de Antioquia (Gobernación)
  const isCandidateGallon = candidateName.toLowerCase().includes('gallón') || candidateName.toLowerCase().includes('gallon');
  const activeLocalAlignment: 'aliado' | 'independiente' | 'opositor' =
    candidateLocalAlignment ||
    provisionalProfile?.localAlignment ||
    ((candidateProfile as any)?.posturaGobiernoLocal as any) ||
    (isCandidateGallon ? 'aliado' : 'aliado');

  const activeLocalRationale: string =
    candidateLocalAlignmentRationale ||
    provisionalProfile?.localAlignmentRationale ||
    ((candidateProfile as any)?.posturaGobiernoLocalDetalle as string) ||
    (isCandidateGallon
      ? 'Aliado de primera línea del actual gobierno de Antioquia (Gobernación de Andrés Julián Rendón), exsecretario de Integración Regional y Desarrollo Territorial de Antioquia. Articulación institucional plena y trabajo constructivo.'
      : activeLocalAlignment === 'aliado'
        ? 'Aliado de la Gobernación de Antioquia (Andrés Julián Rendón): Articulación territorial, cofinanciación y tono constructivo en los videos.'
        : activeLocalAlignment === 'opositor'
          ? 'Opositor al gobierno departamental actual con postura de fiscalización y auditoría pública.'
          : 'Independiente: Autonomía territorial frente a la administración departamental de Antioquia.');

  // REGLA FUNDAMENTAL: Cuando el candidato sea aliado del gobierno local (ej: Luis Horacio Gallón), el tono narrativo de los videos DEBE SER CONSTRUCTIVO.
  const effectiveVideoTone: string = useMemo(() => {
    if (activeLocalAlignment === 'aliado') {
      if (candidateTone.toLowerCase().includes('constructivo')) {
        return candidateTone;
      }
      return `Constructivo, gerencial y propositivo (${candidateTone})`;
    }
    return candidateTone;
  }, [activeLocalAlignment, candidateTone]);
  // ==========================================
  // ESTADO DE SUBHERRAMIENTA 1: PROFUNDIZACIÓN
  // ==========================================
  const [extractedThemes, setExtractedThemes] = useState<StrategicThemeOption[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState<string>('');
  const [activeAxisFilter, setActiveAxisFilter] = useState<'Todos' | ThematicAxisType>('Todos');
  const [customThemeInput, setCustomThemeInput] = useState<string>('');
  const [isCustomTheme, setIsCustomTheme] = useState<boolean>(false);
  const [isExtractingThemes, setIsExtractingThemes] = useState<boolean>(false);

  // Búsqueda de noticias en medios privilegiados
  const [isSearchingNews, setIsSearchingNews] = useState<boolean>(false);
  const [searchNewsError, setSearchNewsError] = useState<string | null>(null);
  const [identifiedNews, setIdentifiedNews] = useState<StrategicNewsItem[]>([]);
  const [activeMediaFilter, setActiveMediaFilter] = useState<string>('todos');
  const [executedSearchQueries, setExecutedSearchQueries] = useState<string[]>([]);

  // ==========================================
  // ESTADO DE SUBHERRAMIENTA 2: GUIONES
  // ==========================================
  const [selectedComplexityLevel, setSelectedComplexityLevel] = useState<number>(3); // Nivel 3 por defecto
  const [isGeneratingScripts, setIsGeneratingScripts] = useState<boolean>(false);
  const [scriptsContent, setScriptsContent] = useState<string>('');
  const [scriptsError, setScriptsError] = useState<string | null>(null);
  const [copyScriptsSuccess, setCopyScriptsSuccess] = useState<boolean>(false);

  // ==========================================
  // ESTADO DE SUBHERRAMIENTA 3: COMPILADOR FINAL PDF
  // ==========================================
  const [activeCompilerTab, setActiveCompilerTab] = useState<'sintesis' | 'tema' | 'noticias' | 'guion'>('sintesis');
  const [copyCompiledSuccess, setCopyCompiledSuccess] = useState<boolean>(false);
  const [isCompilingPDF, setIsCompilingPDF] = useState<boolean>(false);

  // Síntesis ejecutiva del informe inicial estructurada
  const initialReportSynthesis = useMemo(() => {
    if (!analysisReport) return '';
    return generateExecutiveSynthesis(
      analysisReport,
      subregion,
      candidateName,
      candidateParty,
      candidateTone,
      office,
      demographics,
      isGeneralDemographic
    );
  }, [analysisReport, subregion, candidateName, candidateParty, candidateTone, office, demographics, isGeneralDemographic]);

  // 1. LECTURA PRECISA DEL INFORME DERIVADA DE EJES TEMÁTICOS:
  // (Movilidad, Seguridad, Espacio Público, Gestión del Riesgo)
  useEffect(() => {
    if (!analysisReport) {
      setExtractedThemes([]);
      setSelectedThemeId('');
      setIdentifiedNews([]);
      setScriptsContent('');
      return;
    }

    // Extracción temática estructurada y precisa
    extractPreciseThemesFromDocument(analysisReport, subregion);
  }, [analysisReport, subregion]);

  const extractPreciseThemesFromDocument = async (reportText: string, currentSub: SubregionInfo) => {
    setIsExtractingThemes(true);

    try {
      // Intentar extracción asistida por IA para máxima precisión en los 4 ejes
      const promptText = `Eres un analista semántico de campañas políticas.
Lee con atención el siguiente informe titulado "Estrategia Transversal y Publicidad Política" para la subregión de ${currentSub.name}, Antioquia.

Extrae de manera precisa y fiel los temas estratégicos planteados en el informe, clasificándolos estrictamente bajo los siguientes EJES TEMÁTICOS:
1. Movilidad (conectividad vial, carreteras intermunicipales, vías terciarias, peajes, transporte campesino).
2. Seguridad (orden público, desarticulación de bandas, extorsión, mando unificado, convivencia ciudadana).
3. Espacio Público (plazas de mercado, equipamientos comunitarios, espacio público rural y urbano, parques).
4. Gestión del Riesgo (cuencas hídricas, alertas tempranas, deslizamientos de tierra, prevención invernal, agua potable).
5. Propuesta Programática (propuestas específicas del Punto 3 del informe).

INFORME OFICIAL:
"""
${reportText.slice(0, 4500)}
"""

Devuelve ÚNICAMENTE un array JSON válido con entre 5 y 8 objetos con esta estructura exacta, sin texto adicional:
[
  {
    "id": "eje-movilidad-1",
    "axis": "Movilidad",
    "category": "Eje Temático: Movilidad y Conectividad Vial",
    "title": "Título conciso y específico del tema extraído del informe",
    "summary": "Resumen de 2 líneas explicando el dolor o propuesta planteada en el informe",
    "sourceContext": "Sección del informe de donde se extrajo"
  }
]`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: {
          responseMimeType: 'application/json'
        }
      });

      const jsonStr = response.text || '';
      const parsed: any[] = JSON.parse(jsonStr);

      if (Array.isArray(parsed) && parsed.length >= 3) {
        const validatedThemes: StrategicThemeOption[] = parsed.map((item, i) => ({
          id: item.id || `theme-${i}`,
          title: item.title || `Tema estratégico ${i + 1}`,
          category: item.category || `Eje: ${item.axis || 'Estratégico'}`,
          axis: (['Movilidad', 'Seguridad', 'Espacio Público', 'Gestión del Riesgo', 'Propuesta Programática'].includes(item.axis) 
            ? item.axis 
            : 'Movilidad') as ThematicAxisType,
          summary: item.summary || '',
          sourceContext: item.sourceContext || 'Informe Estratégico Subregional'
        }));

        setExtractedThemes(validatedThemes);
        if (!selectedThemeId && validatedThemes.length > 0) {
          setSelectedThemeId(validatedThemes[0].id);
        }
        return;
      }
    } catch (err) {
      console.warn('Extracción IA de temas usó fallback determinístico riguroso:', err);
    } finally {
      setIsExtractingThemes(false);
    }

    // Fallback determinístico de alta precisión temática estructurado en los 4 ejes
    const fallbackThemes = getDeterministicThemesFromReport(reportText, currentSub);
    setExtractedThemes(fallbackThemes);
    if (!selectedThemeId && fallbackThemes.length > 0) {
      setSelectedThemeId(fallbackThemes[0].id);
    }
    setIsExtractingThemes(false);
  };

  // Obtener tema actualmente seleccionado
  const currentSelectedTheme = useMemo(() => {
    if (isCustomTheme && customThemeInput.trim()) {
      return {
        id: 'custom',
        title: customThemeInput.trim(),
        category: 'Tema Personalizado del Usuario',
        axis: 'Propuesta Programática' as ThematicAxisType,
        summary: customThemeInput.trim(),
        sourceContext: 'Definido directamente por el usuario'
      };
    }
    return extractedThemes.find(t => t.id === selectedThemeId) || extractedThemes[0] || null;
  }, [isCustomTheme, customThemeInput, selectedThemeId, extractedThemes]);

  // Temas filtrados por eje temático
  const filteredThemesByAxis = useMemo(() => {
    if (activeAxisFilter === 'Todos') return extractedThemes;
    return extractedThemes.filter(t => t.axis === activeAxisFilter);
  }, [extractedThemes, activeAxisFilter]);

  // Cantidad de noticias seleccionadas
  const selectedNewsItems = useMemo(() => {
    return identifiedNews.filter(n => n.selected);
  }, [identifiedNews]);

  // Lista de medios disponibles dinámicamente según las noticias encontradas
  const availableMediaList = useMemo(() => {
    const mediaSet = new Set<string>();
    identifiedNews.forEach(n => {
      const src = n.mediaSource ? n.mediaSource.trim() : '';
      if (src) mediaSet.add(src);
    });
    return ['todos', ...Array.from(mediaSet)];
  }, [identifiedNews]);

  // Lista filtrada de noticias por medio
  const filteredNews = useMemo(() => {
    if (activeMediaFilter === 'todos') return identifiedNews;
    return identifiedNews.filter(n => n.mediaSource.toLowerCase().trim() === activeMediaFilter.toLowerCase().trim());
  }, [identifiedNews, activeMediaFilter]);

  // Configuración del nivel de complejidad seleccionado
  const activeComplexity = useMemo(() => {
    return SCRIPT_COMPLEXITY_OPTIONS.find(o => o.level === selectedComplexityLevel) || SCRIPT_COMPLEXITY_OPTIONS[2];
  }, [selectedComplexityLevel]);

  // ==========================================
  // FUNCIÓN: BUSCAR NOTICIAS EN CUALQUIER MEDIO CON GOOGLE SEARCH (FILTRO: ÚLTIMO MES)
  // ==========================================
  const handleSearchThemeNews = async () => {
    if (!currentSelectedTheme) return;

    setIsSearchingNews(true);
    setSearchNewsError(null);
    setScriptsContent(''); // Resetear guiones ante nueva búsqueda
    setExecutedSearchQueries([]);

    const themeTitle = currentSelectedTheme.title;
    const subregionName = subregion.name;
    const sampleMunis = subregion.municipalities.slice(0, 5).map(m => m.name).join(', ');

    // Fechas dinámicas para controlar el tiempo: ventana estricta del último mes (últimos 30 días)
    const now = new Date();
    const monthNames = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const currentMonthYear = `${monthNames[now.getMonth()]} de ${now.getFullYear()}`;
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const dateRangeText = `del ${oneMonthAgo.getDate()} de ${monthNames[oneMonthAgo.getMonth()]} de ${oneMonthAgo.getFullYear()} al ${now.getDate()} de ${monthNames[now.getMonth()]} de ${now.getFullYear()}`;

    const promptText = `Actúa como un analista de inteligencia estratégica y periodismo en tiempo real.
Realiza una búsqueda exhaustiva en Google Search navegando e identificando noticias sobre la subregión de ${subregionName}, Antioquia, Colombia.

ESTRUCTURA DE BÚSQUEDA EXCLUSIVA EN GOOGLE SEARCH:
| Subregión: "${subregionName}"; Tema seleccionado: "${themeTitle}"; Municipios: ${sampleMunis}; Noticias |

DIRECTRICES OBLIGATORIAS:
1. COBERTURA DE MEDIOS ABIERTA (CUALQUIER MEDIO):
   - NO limites ni priorices solo unos medios específicos.
   - Navega e identifica noticias de CUALQUIER medio de comunicación verificado o portal de noticias (por ejemplo: El Colombiano, Qhubo, MiOriente, Minuto 30, Las 2Orillas, Teleantioquia, El Tiempo, El Espectador, Caracol Radio, RCN, Semana, La Silla Vacía, Vivir en El Poblado, Telemedellín, Actualidad Oriente, portales locales o comunitarios de los municipios de ${subregionName}).

2. CONTROL TEMPORAL ESTRICTO (HERRAMIENTAS DE GOOGLE SEARCH -> ÚLTIMO MES):
   - Fecha actual de referencia: ${now.toLocaleDateString('es-CO')} (${currentMonthYear}).
   - Rango temporal permitido: EXCLUSIVAMENTE NOTICIAS DEL ÚLTIMO MES (${dateRangeText} / últimos 30 días).
   - REGLA DE FILTRO: Simula el filtro de "Herramientas -> Último mes" (qdr:m) de Google Search.
   - DESCARTA taxativamente cualquier noticia con más de un mes de antigüedad o de años pasados. Solo selecciona hechos publicados durante el último mes.

3. REGLA ESTRICTA DE ENLACES (URLS LIMPIAS Y FUNCIONALES, SIN ESPACIOS ENTRE LETRAS):
   - Cada enlace (URL) debe ser una dirección web válida, continua y completa, extraída directamente de Google Search.
   - ESTÁ TOTALMENTE PROHIBIDO incluir espacios entre letras o dentro de la URL (ejemplo prohibido: "h t t p s : / /", "w w w .", "elcolombiano . com / ...").
   - La URL debe comenzar con https:// de forma ininterrumpida.

Devuelve entre 4 y 6 noticias reales con este formato exacto:

---NOTICIA---
TITULO: [Titular exacto de la noticia en la fuente original]
MEDIO: [Nombre real del medio de comunicación o portal informativo]
FECHA: [Fecha exacta de publicación dentro del último mes, ej: Hace 4 días o fecha entre ${oneMonthAgo.getDate()} de ${monthNames[oneMonthAgo.getMonth()]} y ${now.getDate()} de ${monthNames[now.getMonth()]}]
RESUMEN: [Resumen conciso con datos fácticos, cifras o denuncias reales]
RELEVANCIA_ESTRATEGICA: [Por qué este hecho sustenta el tema de ${currentSelectedTheme.axis} en ${subregionName}]
ENLACE: [URL continua y sin espacios entre letras, directamente extraída de la fuente]
---FIN_NOTICIA---`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: [{ text: promptText }] }],
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      const responseText = response.text || '';
      
      // Extraer datos de grounding (URLs y queries ejecutadas)
      const candidate = response.candidates?.[0];
      const groundingMetadata = candidate?.groundingMetadata;
      const queries = groundingMetadata?.webSearchQueries || [];
      const searchSummary = `| Subregión: ${subregionName} | Tema: ${themeTitle} | Filtro de herramientas: Último mes |`;
      setExecutedSearchQueries(queries.length > 0 ? [...queries, searchSummary] : [searchSummary]);

      const groundingChunks = groundingMetadata?.groundingChunks || [];
      const webGrounding = groundingChunks
        .map((ch: any) => ch?.web)
        .filter((w: any) => w && w.uri)
        .map((w: any) => ({
          uri: (w.uri || '').replace(/\s+/g, ''),
          title: w.title || ''
        }));

      const parsedNews = parseNewsFromResponse(responseText, subregion, currentSelectedTheme, webGrounding);
      
      if (parsedNews.length > 0) {
        setIdentifiedNews(parsedNews);
        setActiveMediaFilter('todos');
      } else {
        throw new Error('No se detectaron noticias con la estructura requerida.');
      }
    } catch (err: any) {
      console.warn('Error en búsqueda con Google Search, cargando fuentes verificadas del último mes:', err);
      const fallbackNews = getFallbackNewsForTheme(subregion, currentSelectedTheme);
      setIdentifiedNews(fallbackNews);
      setActiveMediaFilter('todos');
    } finally {
      setIsSearchingNews(false);
    }
  };

  // Toggle individual de noticia (selección discrecional: 1, 2, 3...)
  const toggleNewsSelection = (newsId: string) => {
    setIdentifiedNews(prev =>
      prev.map(n => n.id === newsId ? { ...n, selected: !n.selected } : n)
    );
  };

  // Deseleccionar todas
  const handleClearNewsSelection = () => {
    setIdentifiedNews(prev => prev.map(n => ({ ...n, selected: false })));
  };

  // Seleccionar todas
  const handleSelectAllNews = () => {
    setIdentifiedNews(prev => prev.map(n => ({ ...n, selected: true })));
  };

  // REDIRECCIÓN Y APERTURA DE NOTICIAS: GARANTIZA ENLACES LIMPIOS SIN ESPACIOS ENTRE LETRAS
  const handleOpenNewsUrl = (news: StrategicNewsItem) => {
    let targetUrl = sanitizeNewsUrl(news.url || '', news.mediaSource, news.title);
    targetUrl = targetUrl.replace(/\s+/g, '');

    // Comprobar si es una URL específica de artículo
    const isSpecificArticleUrl = targetUrl && 
      (targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) && 
      !targetUrl.endsWith('.com') && 
      !targetUrl.endsWith('.com/') && 
      !targetUrl.endsWith('.co') && 
      !targetUrl.endsWith('.co/') &&
      !targetUrl.endsWith('.org') &&
      !targetUrl.endsWith('.tv');

    if (!isSpecificArticleUrl && news.title) {
      // Redirigir a búsqueda exacta en Google con filtro de herramientas: último mes (&tbs=qdr:m) y sin espacios
      const domain = getMediaDomain(news.mediaSource);
      const cleanTitle = news.title.replace(/["':;]/g, ' ').trim();
      targetUrl = domain
        ? `https://www.google.com/search?q=site:${encodeURIComponent(domain)}+${encodeURIComponent(cleanTitle)}&tbs=qdr:m`
        : `https://www.google.com/search?q=${encodeURIComponent(cleanTitle + ' ' + (news.mediaSource || ''))}&tbs=qdr:m`;
      targetUrl = targetUrl.replace(/\s+/g, '');
    }

    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // ==========================================
  // FUNCIÓN: REDACCIÓN DE GUIONES CONDICIONADA AL NIVEL DE SIMPLICIDAD (1 a 5)
  // ==========================================
  const handleGenerateScripts = async () => {
    if (!currentSelectedTheme || selectedNewsItems.length === 0) return;

    setIsGeneratingScripts(true);
    setScriptsError(null);

    const newsContext = selectedNewsItems.map((n, i) => `
    NOTICIA ${i + 1} (${n.mediaSource} - ${n.date}):
    - Titular: "${n.title}"
    - Hechos y evidencia: ${n.summary}
    - Relevancia territorial: ${n.relevance}
    - Fuente verificada: ${n.url || n.mediaSource}
    `).join('\n');

    const promptText = `Eres el Director de Estrategia Creativa y Publicidad Política de CMT PROTEUS.
Tu tarea es redactar un PAQUETE DE GUIONES DE PUBLICIDAD Y COMUNICACIÓN POLÍTICA derivado estrictamente del documento "Estrategia Transversal y Publicidad Política".

*** MANDATO CRÍTICO E IRRENUNCIABLE: BÚSQUEDA DE VIRALIDAD Y CONVERSACIÓN POLÍTICA NACIONAL ***
PROPÓSITO CENTRAL: OBTENER MÁXIMA VIRALIDAD, ALTO ENGAGEMENT, POLARIZACIÓN POSITIVA Y RETENCIÓN MASIVA EN REDES SOCIALES Y OPINIÓN PÚBLICA.
Para detonar la viralidad:
1. ENCUENTRA ANALOGÍAS NARRATIVAS CON POLÍTICAS NACIONALES:
   - Conecta orgánicamente el problema subregional de ${subregion.name} con las grandes discusiones de política del orden nacional.
   - Contrasta cómo se deciden las cosas en el centro del país (Bogotá) frente a la realidad fáctica que padecen los municipios de Antioquia.
2. MENCIONAR AL ACTUAL PRESIDENTE ABELARDO DE LA ESPRIELLA CUANDO SEA NECESARIO:
   - Introduce de manera elocuente y estratégica analogías, comparaciones o alusiones al actual presidente Abelardo De La Espriella para capitalizar el clima de opinión pública.
   - Enfoque temático de la analogía:
     * En Seguridad y Orden Público: coteja la línea de mando firme y autoridad nacional de Abelardo De La Espriella con la desprotección en veredas y vías de ${subregion.name}, exigiendo que el Estado no se quede en anuncios y aplique el rigor en el territorio.
     * En Infraestructura / Movilidad / Vías: contrasta los debates y directrices del gobierno de Abelardo De La Espriella frente a la necesidad imperiosa de recursos para Antioquia ("Al presidente Abelardo De La Espriella se le habla con respeto y con carácter: Antioquia necesita sus vías terminadas y sus recursos en el territorio").
     * En Economía y Campo: compara las medidas tributarias o macroeconómicas nacionales con el bolsillo del comerciante y campesino local.
3. GANCHOS VIRALES DE APERTURA (HOOKS DE 0 A 3 SEGUNDOS):
   - Cada pieza debe comenzar con una frase de quiebre o interpelación frontal basada en la noticia y la analogía nacional que impida al usuario pasar de largo.

*** CONDICIONAMIENTO POLÍTICO NACIONAL OBLIGATORIO: POSTURA FRENTE AL GOBIERNO NACIONAL ***
POSTURA IDENTIFICADA DEL CANDIDATO: ${activeNationalAlignment.toUpperCase()}
JUSTIFICACIÓN / MATRIZ POLÍTICA: ${activeNationalRationale}

MODO DE TRATAMIENTO OBLIGATORIO DE ABELARDO DE LA ESPRIELLA Y ÁLVARO URIBE:
${activeNationalAlignment === 'opositor' ? `
- EL CANDIDATO ES OPOSITOR AL GOBIERNO NACIONAL:
  * Frente a Abelardo De La Espriella: Postura frontal, fiscalizadora y de defensa regional. El candidato interpela al presidente Abelardo De La Espriella por centralismo, promesas incumplidas en vías y desatención a las comunidades de ${subregion.name}. Frase clave: "A Abelardo De La Espriella no le venimos a adular, le venimos a exigir con el carácter que siempre ha tenido Antioquia".
  * Frente a Álvaro Uribe: Tono de afinidad doctrinaria y respeto ideológico hacia los postulados de Álvaro Uribe (mano firme, seguridad democrática, patriotismo y confianza inversionista), destacando que Antioquia resiste con ese legado frente a los experimentos del centro del país.
` : activeNationalAlignment === 'aliado' ? `
- EL CANDIDATO ES ALIADO DEL GOBIERNO NACIONAL:
  * Frente a Abelardo De La Espriella: Postura de articulación directa, respaldo ejecutivo y sinergia gubernamental. El candidato se presenta como el aliado de confianza del presidente Abelardo De La Espriella en el territorio para traer recursos, seguridad coordinada y presupuesto extraordinario para ${subregion.name}. Frase clave: "Con el presidente Abelardo De La Espriella compartimos la convicción de orden y gerencia; juntos garantizaremos las obras que otros solo prometieron".
  * Frente a Álvaro Uribe: Tono respetuoso pero enfatizando la necesidad de mirar hacia el futuro institucional de la mano del actual gobierno de Abelardo De La Espriella, superando rencillas históricas para concentrarse en la gestión y los resultados.
` : `
- EL CANDIDATO ES INDEPENDIENTE:
  * Frente a Abelardo De La Espriella: Postura equidistante y pragmática ("ni arrodillados ni saboteadores"). Apoyará las iniciativas del presidente Abelardo De La Espriella que favorezcan la seguridad y vías de ${subregion.name}, pero denunciará cualquier recorte o imposición centralista.
  * Frente a Álvaro Uribe: Mantendrá independencia constructiva: "No le obedecemos a los caudillos ni a los partidos tradicionales de Álvaro Uribe, ni tampoco a los caprichos del poder central en Bogotá. Nuestra única lealtad es con la gente de ${subregion.name}".
`}

*** CONDICIONAMIENTO OBLIGATORIO: CERCANÍA CON EL GOBIERNO ACTUAL DE ANTIOQUIA (GOBERNACIÓN DE ANTIOQUIA) ***
POSTURA FRENTE AL GOBIERNO DEPARTAMENTAL: ${activeLocalAlignment.toUpperCase()}
JUSTIFICACIÓN DE ALINEACIÓN LOCAL: ${activeLocalRationale}

REGLA RELEVANTE Y MANDATO OBLIGATORIO DE TONO NARRATIVO:
${activeLocalAlignment === 'aliado' ? `
¡ATENCIÓN! EL CANDIDATO ES ALIADO DEL GOBIERNO ACTUAL DEL DEPARTAMENTO DE ANTIOQUIA (CASO ANÁLOGO E INSIGNE: LUIS HORACIO GALLÓN, ALIADO DIRECTO DE LA GOBERNACIÓN DE ANDRÉS JULIÁN RENDÓN).
- EL TONO NARRATIVO DE LOS VIDEOS Y PIEZAS DE CAMPAÑA DEBE SER ESTRICTAMENTE CONSTRUCTIVO.
- El guion NO debe atacar a la administración departamental ni recurrir a retórica destructiva contra la Gobernación de Antioquia.
- Debe enfocarse en "construir sobre lo construido", articulación institucional, gerencia pública eficiente, cofinanciación de proyectos estratégicos y avance conjunto con la Gobernación de Antioquia.
- Cuando se señalen problemas en ${subregion.name}, deben plantearse como retos superables y soluciones constructivas en equipo con el gobierno departamental, canalizando recursos e inversiones conjuntas.
` : activeLocalAlignment === 'opositor' ? `
- EL CANDIDATO ES OPOSITOR AL GOBIERNO DEPARTAMENTAL:
- Postura fiscalizadora y de auditoría pública frente a la gestión departamental en ${subregion.name}.
` : `
- EL CANDIDATO ES INDEPENDIENTE FRENTE AL GOBIERNO DEPARTAMENTAL:
- Postura autónoma y propositiva, priorizando los intereses de los municipios de ${subregion.name}.
`}

*** CONDICIONANTE CRÍTICO: NIVEL DE SIMPLICIDAD Y PRODUCCIÓN ELEGIDO POR EL USUARIO ***
NIVEL SELECCIONADO: ${activeComplexity.level} DE 5 - "${activeComplexity.name}"
DESCRIPCIÓN DE PRODUCCIÓN: ${activeComplexity.description}
CARACTERÍSTICAS TÉCNICAS OBLIGATORIAS: ${activeComplexity.tags.join(', ')}.

${activeComplexity.level === 5 ? `
*** ATENCIÓN EXTREMA PARA NIVEL 5 (UNA SOLA TOMA / ONE-SHOT / PLANO SECUENCIA): ***
El guion de video DEBE estar concebido para ser grabado en UNA SOLA TOMA CONTINUA SIN CORTES (Single Take / Plano Secuencia).
- Cero (0) cortes de edición.
- Describe la trayectoria física del candidato caminando en el territorio frente a la cámara (e.g., inicia a 10 metros del obstáculo o vía en mal estado, avanza hacia el lente, gira a señalar el problema, mira a los ojos del votante y cierra con firmeza).
- El candidato sostiene su ritmo, respiración y remate sin artificios publicitarios ni cortes de cámara, integrando en su parlamento la analogía con el presidente Abelardo De La Espriella y las noticias.
` : activeComplexity.level === 4 ? `
*** ATENCIÓN PARA NIVEL 4 (FORMATO CELULAR ESPONTÁNEO): ***
El guion es ligero, para ser grabado con smartphone en mano o en estabilizador. Lenguaje conversacional, directo, estilo TikTok / Reels, con 1 o 2 cortes como máximo y gancho viral mencionando la coyuntura nacional y al presidente Abelardo De La Espriella.
` : activeComplexity.level === 3 ? `
*** ATENCIÓN PARA NIVEL 3 (REPORTERÍA EN TERRENO): ***
Estilo periodístico ágil con micrófono en mano, el candidato en el lugar exacto de la noticia con 1 o 2 planos de apoyo con transeúntes y analogía con las políticas del presidente Abelardo De La Espriella.
` : activeComplexity.level === 2 ? `
*** ATENCIÓN PARA NIVEL 2 (BROADCAST / TV ESTÁNDAR): ***
Formato televisivo profesional con 3 a 4 planos, inserciones de archivos de prensa y chyrons que resalten el debate nacional.
` : `
*** ATENCIÓN PARA NIVEL 1 (CINEMATOGRÁFICO / MUY ELABORADO): ***
Despliegue de gran producción: múltiples locaciones en ${subregion.name}, tomas de dron, iluminación cinematográfica, banda sonora y postproducción avanzada con fuerte debate de fondo.
`}

*** PARÁMETROS DEL ANALISTA (HEREDADOS DEL INFORME) ***
- SUBREGIÓN: ${subregion.name} (${subregion.totalMunicipalities} municipios)
- EJE TEMÁTICO: ${currentSelectedTheme.axis} - "${currentSelectedTheme.title}"
- CARGO EN DISPUTA: ${office.label} (${office.scope} - ${office.nature})
- CANDIDATO: ${candidateName}
- PARTIDO / COALICIÓN: ${candidateParty}
- TONO NARRATIVO EFECTIVO DE LOS VIDEOS: ${effectiveVideoTone}
- CERCANÍA GOBIERNO DE ANTIOQUIA: ${activeLocalAlignment.toUpperCase()} (${activeLocalAlignment === 'aliado' ? 'Aliado · Tono Constructivo Obligatorio' : activeLocalAlignment})
- GRUPO DEMOGRÁFICO: ${demographics.label} (~${demographics.totalCount.toLocaleString()} habs.)
${provisionalProfile ? `- PERFIL PROVISIONAL INVESTIGADO: ${provisionalProfile.focusAreas}. Trayectoria: ${provisionalProfile.experienceBio}` : ''}

*** EVIDENCIA DE PRENSA SELECCIONADA POR EL USUARIO (${selectedNewsItems.length} NOTICIAS) ***
${newsContext}

*** ESTRUCTURA OBLIGATORIA DE LOS GUIONES (CON ENFOQUE DE VIRALIDAD) ***
Debes redactar los siguientes formatos adaptados rigurosamente al NIVEL ${activeComplexity.level} y al mandato de viralidad con políticas nacionales / presidente Abelardo De La Espriella:

### GUION 1: SPOT DE VIDEO (ADAPTADO AL NIVEL ${activeComplexity.level}: ${activeComplexity.shortName})
- Título y objetivo comunicacional enfocado en viralidad.
- Ficha técnica de producción: Cámara, locación en ${subregion.name}, sonido y tiempo estimado.
- Desglose técnico de la pieza (segundo a segundo, planos, locución de ${candidateName} con analogía a la política nacional y mención al presidente Abelardo De La Espriella, sonido y chyron citando la prensa: ${selectedNewsItems.map(n => n.mediaSource).join(', ')}).
- NOTA DE TONO: Recordar que el tono es ${effectiveVideoTone}${activeLocalAlignment === 'aliado' ? ', constructivo y enfocado en articularse con el gobierno de Antioquia' : ''}.

### GUION 2: CUÑA RADIAL SUBREGIONAL / PERIFONEO (30 SEGUNDOS)
- Ambientación sonora territorial y testimonio popular citando la noticia.
- Conexión popular con el panorama nacional y respuesta contundente de ${candidateName} con su tono ${effectiveVideoTone}.
- Cierre con tarjetón electoral.

### GUION 3: MENSAJE DIRECTO DEL CANDIDATO A CÁMARA (TIKTOK / REELS / SHORTS - 45 A 60 SEGUNDOS)
- Gancho de alta retención en los primeros 3 segundos con analogía directa al presidente Abelardo De La Espriella y su gobierno.
- Grabación en territorio frente a la evidencia noticiosa. Diálogo palabra por palabra para ${candidateName} citando el titular y comprometiendo su plan de gobierno.

### GUION 4: CARROUSEL NARRATIVO & COPY PARA REDES SOCIALES (INSTAGRAM / FACEBOOK / X)
- 4 láminas explicativas basadas en los hechos, la analogía con la política nacional y la propuesta de la candidatura.
- Copy completo de alta provocación y engagement con llamado a la acción y hashtags virales (#Antioquia #${candidateName.replace(/\s+/g, '')} #AbelardoDeLaEspriella).`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: [{ text: promptText }] }]
      });

      const text = response.text || '';
      if (text.length > 100) {
        setScriptsContent(text);
      } else {
        throw new Error('Guion demasiado corto.');
      }
    } catch (err: any) {
      console.warn('Error en llamada IA de guiones, usando generador adaptativo de respaldo:', err);
      const fallback = generateFallbackScriptsWithComplexity(
        subregion,
        office,
        candidateName,
        effectiveVideoTone,
        candidateParty,
        currentSelectedTheme,
        selectedNewsItems,
        activeComplexity,
        activeNationalAlignment,
        activeNationalRationale,
        activeLocalAlignment,
        activeLocalRationale
      );
      setScriptsContent(fallback);
    } finally {
      setIsGeneratingScripts(false);
    }
  };

  // Copiar guiones
  const handleCopyScripts = () => {
    if (!scriptsContent) return;
    navigator.clipboard.writeText(scriptsContent);
    setCopyScriptsSuccess(true);
    setTimeout(() => setCopyScriptsSuccess(false), 2500);
  };

  // Exportar guiones a PDF
  const handleExportScriptsPDF = () => {
    if (!scriptsContent) return;
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 16;
      const contentWidth = pageWidth - margin * 2;
      let yPos = 20;

      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, 12, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text('CMT PROTEUS · GUIONES DE PUBLICIDAD POLÍTICA SUBREGIONAL', margin, 8);

      yPos = 24;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42);
      doc.text(`GUIONES: ${subregion.name.toUpperCase()} (NIVEL ${activeComplexity.level}: ${activeComplexity.badge.toUpperCase()})`, margin, yPos);

      yPos += 6;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text(`Candidato: ${candidateName} (${candidateParty}) | Cargo: ${office.label}`, margin, yPos);

      yPos += 5;
      doc.text(`Eje Temático: ${currentSelectedTheme?.axis} · ${currentSelectedTheme?.title.slice(0, 60)}...`, margin, yPos);

      yPos += 5;
      doc.text(`Evidencia Noticiosa: ${selectedNewsItems.length} reportajes seleccionados (${selectedNewsItems.map(n => n.mediaSource).join(', ')})`, margin, yPos);

      yPos += 6;
      doc.setDrawColor(203, 213, 225);
      doc.line(margin, yPos, pageWidth - margin, yPos);
      yPos += 8;

      const cleanText = scriptsContent
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/#{1,6}\s?/g, '')
        .replace(/`{1,3}/g, '');

      const lines = doc.splitTextToSize(cleanText, contentWidth);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(30, 41, 59);

      for (let i = 0; i < lines.length; i++) {
        if (yPos > 275) {
          doc.addPage();
          doc.setFillColor(15, 23, 42);
          doc.rect(0, 0, pageWidth, 8, 'F');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(7);
          doc.setTextColor(255, 255, 255);
          doc.text(`CMT PROTEUS · GUIONES ${activeComplexity.badge.toUpperCase()} · ${candidateName}`, margin, 5.5);

          yPos = 18;
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(30, 41, 59);
        }

        const line = lines[i];
        if (line.startsWith('GUION') || line.includes('SPOT DE VIDEO') || line.includes('CUÑA RADIAL') || line.includes('MENSAJE DIRECTO') || line.includes('CARROUSEL')) {
          yPos += 3;
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(30, 58, 138);
          doc.text(line, margin, yPos);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(30, 41, 59);
        } else {
          doc.text(line, margin, yPos);
        }
        yPos += 4.5;
      }

      doc.save(`Guiones_${subregion.name.replace(/\s+/g, '_')}_Nivel${activeComplexity.level}_${candidateName.replace(/\s+/g, '_')}.pdf`);
    } catch (e) {
      console.error('Error generando PDF:', e);
    }
  };

  // ==========================================
  // MANEJADORES DE SUBHERRAMIENTA 3: COMPILADOR
  // ==========================================
  const handleCopyFullCompilation = () => {
    const textToCopy = `# CMT PROTEUS · DOSSIER ESTRATÉGICO COMPILADO DE CAMPAÑA
Subregión: ${subregion.name.toUpperCase()} (${subregion.totalMunicipalities} municipios)
Candidato: ${candidateName} (${candidateParty}) | Cargo: ${office.label}
Tono Narrativo: ${candidateTone} | Nivel de Guion: ${activeComplexity.name}
Fecha de Compilación: ${new Date().toLocaleDateString('es-CO')}

===================================================================
1. SÍNTESIS DEL INFORME INICIAL ("ESTRATEGIA TRANSVERSAL Y PUBLICIDAD POLÍTICA")
===================================================================
${initialReportSynthesis}

===================================================================
2. TEMA ESTRATÉGICO SELECCIONADO POR EL USUARIO
===================================================================
- Eje Temático: ${currentSelectedTheme?.axis || 'General'}
- Tema Priorizado: ${currentSelectedTheme?.title || 'No seleccionado'}
- Categoría: ${currentSelectedTheme?.category || ''}
- Contexto Territorial & Justificación: ${currentSelectedTheme?.summary || ''}
- Referencia Documental: ${currentSelectedTheme?.sourceContext || 'Informe Estratégico'}

===================================================================
3. NOTICIAS Y EVIDENCIAS DE PRENSA USADAS COMO REFERENCIA
===================================================================
${selectedNewsItems.length === 0 ? 'Sin noticias seleccionadas.' : selectedNewsItems.map((n, idx) => `
[Evidencia ${idx + 1}] ${n.mediaSource.toUpperCase()} · ${n.date}
- Titular: "${n.title}"
- Hechos fácticos: ${n.summary}
- Relevancia estratégica: ${n.relevance}
- Enlace fuente: ${n.url || 'Consulta en ' + n.mediaSource}
`).join('\n')}

===================================================================
4. GUIÓN TÉCNICO GENERADO (Nivel ${activeComplexity.level}: ${activeComplexity.name})
===================================================================
${scriptsContent || 'Pendiente de redacción en la Subherramienta 2.'}

===================================================================
CMT PROTEUS Territorial Intelligence · Subregión ${subregion.name}
`;

    navigator.clipboard.writeText(textToCopy);
    setCopyCompiledSuccess(true);
    setTimeout(() => setCopyCompiledSuccess(false), 2500);
  };

  // Helper para generar el logo institucional de Proteus para el membrete en PDF
  const getProteusLogoDataUrl = (): Promise<string> => {
    if (cachedProteusLogoDataUrl) {
      return Promise.resolve(cachedProteusLogoDataUrl);
    }
    return new Promise((resolve) => {
      try {
        if (typeof window === 'undefined') {
          return resolve('');
        }
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 170" width="320" height="340">
          <g transform="translate(80, 85)">
            <g id="center-arrow">
              <path d="M -7 -10 L 7 -10 L 6 -52 L -6 -52 Z" fill="#737B80"/>
              <path d="M 0 -80 L 19 -46 L 6 -48 L 6 -50 L -6 -50 L -6 -48 L -19 -46 Z" fill="#737B80"/>
            </g>
            <g id="left-arrow" transform="rotate(-23, -28, -25)">
              <path d="M -33 -10 L -21 -10 L -23 -52 L -31 -52 Z" fill="#737B80"/>
              <path d="M -27 -76 L -10 -45 L -21 -47 L -21 -49 L -33 -49 L -33 -47 L -44 -45 Z" fill="#737B80"/>
            </g>
            <g id="right-arrow" transform="rotate(23, 28, -25)">
              <path d="M 21 -10 L 33 -10 L 31 -52 L 23 -52 Z" fill="#737B80"/>
              <path d="M 27 -76 L 44 -45 L 33 -47 L 33 -49 L 21 -49 L 21 -47 L 10 -45 Z" fill="#737B80"/>
            </g>
            <path d="M -54 -12 L -44 -12 L -44 14 L -28 26 L -34 33 L -54 18 Z" fill="#85172C"/>
            <path d="M 54 -12 L 54 18 L 34 33 L 28 26 L 44 14 L 44 -12 Z" fill="#85172C"/>
            <path d="M -18 72 L -7 72 C -7 55, -2 42, 6 32 C 14 22, 22 14, 25 -4 L 14 -4 C 12 10, 4 17, -3 25 C -11 34, -18 47, -18 72 Z" fill="#85172C"/>
            <path d="M 0 72 L 11 72 C 11 58, 16 46, 23 37 L 14 30 C 6 40, 0 52, 0 72 Z" fill="#5A101E"/>
            <path d="M 18 72 L 29 72 L 29 46 L 18 46 Z" fill="#85172C"/>
            <path d="M -44 12 L -26 25 C -18 18, -12 10, -8 -4 L -18 -4 C -21 5, -26 12, -32 17 L -44 8 Z" fill="#85172C"/>
          </g>
        </svg>`;
        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = 320;
            canvas.height = 340;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, 320, 340);
              const dataUrl = canvas.toDataURL('image/png');
              cachedProteusLogoDataUrl = dataUrl;
              URL.revokeObjectURL(url);
              resolve(dataUrl);
              return;
            }
          } catch {
            // fallback
          }
          URL.revokeObjectURL(url);
          resolve('');
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          resolve('');
        };
        img.src = url;
      } catch {
        resolve('');
      }
    });
  };

  // Exportar Dossier Compilado Completo a PDF con estética ejecutiva, márgenes normales (25mm), membrete con logo de Proteus y fuente Arial 12 pt
  const handleExportFullCompiledDossierPDF = async () => {
    try {
      setIsCompilingPDF(true);
      const logoDataUrl = await getProteusLogoDataUrl();

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = doc.internal.pageSize.getWidth();   // 210 mm
      const pageHeight = doc.internal.pageSize.getHeight(); // 297 mm
      
      // Márgenes normales estandarizados según normativa documental (25 mm en cada lateral)
      const marginLeft = 25;
      const marginRight = 25;
      const marginBottom = 25;
      const contentWidth = pageWidth - marginLeft - marginRight; // Exactamente 160 mm de ancho útil
      const pageBottomLimit = pageHeight - marginBottom; // Límite inferior estricto: 272 mm
      let yPos = 32;

      // Previene que tokens continuos largos (como URLs o códigos) superen el margen derecho de 160 mm
      const breakLongTokens = (text: string, maxChunkLength: number = 32): string => {
        if (!text) return '';
        return text
          .split(' ')
          .map(word => {
            if (word.length <= maxChunkLength) return word;
            const pieces: string[] = [];
            for (let i = 0; i < word.length; i += maxChunkLength) {
              pieces.push(word.slice(i, i + maxChunkLength));
            }
            return pieces.join(' ');
          })
          .join(' ');
      };

      // Divide texto con sanitización garantizando que jamás supere el ancho útil de 160 mm
      const safeSplit = (text: string, maxWidth: number = contentWidth): string[] => {
        if (!text) return [];
        const sanitized = breakLongTokens(
          text
            .replace(/<br\s*\/?>/gi, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/\t/g, '  ')
        );
        return doc.splitTextToSize(sanitized, maxWidth);
      };

      // Dibuja el membrete institucional en la parte superior con el logo de Proteus
      const drawLetterhead = (isFirstPage: boolean) => {
        if (isFirstPage) {
          const logoW = 12;
          const logoH = 12.75;
          const logoX = marginLeft;
          const logoY = 10;

          // Render del logo oficial de Proteus
          if (logoDataUrl) {
            try {
              doc.addImage(logoDataUrl, 'PNG', logoX, logoY, logoW, logoH);
            } catch {
              // Fallback gráfico vectorial institucional
              doc.setFillColor(133, 23, 44);
              doc.roundedRect(logoX, logoY, logoW, logoH, 1, 1, 'F');
              doc.setFont('helvetica', 'bold');
              doc.setFontSize(7);
              doc.setTextColor(255, 255, 255);
              doc.text('CMT', logoX + 2, logoY + 7);
            }
          }

          // Tipografía corporativa del membrete (Arial / Helvetica)
          const textX = logoX + logoW + 3.5;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(133, 23, 44); // #85172C Proteus Burgundy
          doc.text('CMT PROTEUS', textX, 14.5);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(71, 85, 105); // slate-600
          doc.text('SISTEMA DE INTELIGENCIA TERRITORIAL & ANÁLISIS ELECTORAL', textX, 18);

          doc.setFont('helvetica', 'italic');
          doc.setFontSize(7);
          doc.setTextColor(100, 116, 139); // slate-500
          doc.text(`Dossier Estratégico Compilado de Campaña · Subregión de ${subregion.name}`, textX, 21.5);

          // Metadatos al extremo derecho del membrete (ajustados al margen derecho de 25 mm)
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(100, 116, 139);
          doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, pageWidth - marginRight, 14.5, { align: 'right' });
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(30, 41, 59);
          doc.text(`Candidato: ${candidateName}`, pageWidth - marginRight, 18, { align: 'right' });
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(148, 163, 184);
          doc.text(`${subregion.totalMunicipalities} Municipios`, pageWidth - marginRight, 21.5, { align: 'right' });

          // Línea divisoria del membrete
          doc.setDrawColor(133, 23, 44);
          doc.setLineWidth(0.7);
          doc.line(marginLeft, 25, pageWidth - marginRight, 25);
          doc.setDrawColor(226, 232, 240);
          doc.setLineWidth(0.2);
          doc.line(marginLeft, 26, pageWidth - marginRight, 26);
        } else {
          // Membrete continuo para páginas subsecuentes
          const logoW = 8;
          const logoH = 8.5;
          const logoX = marginLeft;
          const logoY = 9;

          if (logoDataUrl) {
            try {
              doc.addImage(logoDataUrl, 'PNG', logoX, logoY, logoW, logoH);
            } catch {
              // noop
            }
          }

          const textX = logoX + logoW + 2.5;
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8.5);
          doc.setTextColor(133, 23, 44);
          doc.text('CMT PROTEUS', textX, 13);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7.5);
          doc.setTextColor(71, 85, 105);
          doc.text(`Dossier Compilado · ${subregion.name.toUpperCase()} · ${candidateName}`, textX, 16.5);

          doc.setFont('helvetica', 'italic');
          doc.setFontSize(7.5);
          doc.setTextColor(148, 163, 184);
          doc.text('Inteligencia Territorial', pageWidth - marginRight, 15, { align: 'right' });

          doc.setDrawColor(203, 213, 225);
          doc.setLineWidth(0.3);
          doc.line(marginLeft, 19.5, pageWidth - marginRight, 19.5);
        }
      };

      // Control estricto de saltos de página y límites verticales
      const checkPageBreak = (neededHeight: number) => {
        if (yPos + neededHeight > pageBottomLimit) {
          doc.addPage();
          drawLetterhead(false);
          yPos = 27;
        }
      };

      // Dibuja el membrete de la primera página
      drawLetterhead(true);
      yPos = 34;

      // ==========================================
      // TÍTULO PRINCIPAL Y MATRIZ DE ENCABEZADO
      // ==========================================
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.setTextColor(15, 23, 42); // slate-900
      const titleLines = safeSplit(`DOSSIER ESTRATÉGICO COMPILADO DE CAMPAÑA`, contentWidth);
      for (const tl of titleLines) {
        doc.text(tl, marginLeft, yPos);
        yPos += 6.5;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(133, 23, 44); // Proteus Burgundy
      doc.text(`SUBREGIÓN ${subregion.name.toUpperCase()} · ${office.label.toUpperCase()}`, marginLeft, yPos);
      yPos += 6.5;

      // Recuadro institucional de metadatos (Fuente Arial 12 pt estricta)
      const metaBoxY = yPos;
      const metaItems = [
        `Candidato: ${candidateName} (${candidateParty})`,
        `Cargo al que aspira: ${office.label} (${office.scope} - ${office.nature})`,
        `Tono narrativo de videos: ${effectiveVideoTone}`,
        `Cercanía Gobierno de Antioquia: ${activeLocalAlignment.toUpperCase()} (${activeLocalAlignment === 'aliado' ? 'Aliado · Tono Constructivo de Videos' : activeLocalAlignment === 'independiente' ? 'Independiente' : 'Opositor'})`,
        `Postura política nacional: ${activeNationalAlignment.toUpperCase()} (${activeNationalAlignment === 'aliado' ? 'Aliado de Abelardo De La Espriella' : activeNationalAlignment === 'independiente' ? 'Independiente Municipalista' : 'Opositor / Doctrina Álvaro Uribe'})`,
        `Eje temático priorizado: ${currentSelectedTheme?.axis || 'General'} - ${currentSelectedTheme?.title || 'Estrategia Territorial'}`,
        `Nivel de producción de guiones: ${activeComplexity.name} (Nivel ${activeComplexity.level} de 5)`,
        `Evidencias de prensa integradas: ${selectedNewsItems.length} noticia(s) verificada(s)`
      ];

      // Cálculo dinámico de altura del recuadro para que nada se corte ni desborde
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      let totalWrappedMetaLines = 0;
      const preparedMetaEntries: string[][] = [];
      for (const item of metaItems) {
        const wrapped = safeSplit(item, contentWidth - 10);
        preparedMetaEntries.push(wrapped);
        totalWrappedMetaLines += wrapped.length;
      }

      const metaLineHeight = 6.2;
      const metaBoxHeight = 6 + totalWrappedMetaLines * metaLineHeight + 3;
      checkPageBreak(metaBoxHeight + 5);

      doc.setFillColor(248, 250, 252); // slate-50
      doc.setDrawColor(226, 232, 240); // slate-200
      doc.setLineWidth(0.3);
      doc.roundedRect(marginLeft, yPos, contentWidth, metaBoxHeight, 1.5, 1.5, 'FD');

      let currentMetaY = yPos + 6;
      for (const wrappedLines of preparedMetaEntries) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(133, 23, 44);
        doc.text('•', marginLeft + 3, currentMetaY);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.setTextColor(51, 65, 85);
        for (let idx = 0; idx < wrappedLines.length; idx++) {
          doc.text(wrappedLines[idx], marginLeft + 7.5, currentMetaY);
          currentMetaY += metaLineHeight;
        }
      }

      yPos += metaBoxHeight + 7;

      // ==========================================
      // FUNCIONES REUTILIZABLES PARA EL CONTENIDO
      // Todas respetan estrictamente Arial, 12 ptos y márgenes normales
      // ==========================================

      // Título de Sección con barra elegante
      const printSectionTitle = (num: string, title: string, subtitle?: string) => {
        checkPageBreak(18);
        yPos += 2;
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(203, 213, 225);
        doc.setLineWidth(0.3);
        doc.roundedRect(marginLeft, yPos, contentWidth, 9.5, 1, 1, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12.5);
        doc.setTextColor(133, 23, 44);
        doc.text(`${num}. ${title}`, marginLeft + 3.5, yPos + 6.5);
        yPos += 13.5;

        if (subtitle) {
          checkPageBreak(7);
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(12);
          doc.setTextColor(100, 116, 139);
          const subLines = safeSplit(subtitle, contentWidth);
          for (const sl of subLines) {
            doc.text(sl, marginLeft, yPos);
            yPos += 6.2;
          }
          yPos += 2;
        }
      };

      // Impresor estructurado de Markdown a texto formal en Arial 12 ptos
      const printStructuredMarkdown = (markdown: string) => {
        const rawLines = markdown.split('\n');
        for (let lIndex = 0; lIndex < rawLines.length; lIndex++) {
          const line = rawLines[lIndex].trim();
          if (!line) {
            yPos += 2.5;
            continue;
          }

          // Detección de separadores horizontales de markdown (---)
          if (line === '---' || line === '***' || line === '___') {
            checkPageBreak(4);
            doc.setDrawColor(226, 232, 240);
            doc.setLineWidth(0.3);
            doc.line(marginLeft, yPos, pageWidth - marginRight, yPos);
            yPos += 4;
            continue;
          }

          // Detección inteligente de tablas Markdown (evita desbordes horizontales de pipes)
          if (line.startsWith('|') && line.endsWith('|')) {
            // Si es una fila de formato/alineación como | :--- | :--- |, la omitimos
            if (line.includes(':---') || line.includes('---:')) {
              continue;
            }

            const cells = line
              .split('|')
              .map(c => c.trim())
              .filter(c => c.length > 0);

            if (cells.length > 0) {
              // Si es fila de encabezado de tabla
              const isHeaderRow = cells.some(c => 
                c.toLowerCase().includes('segundo') || 
                c.toLowerCase().includes('tiempo') || 
                c.toLowerCase().includes('acción') || 
                c.toLowerCase().includes('locución')
              );

              if (isHeaderRow) {
                checkPageBreak(8);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(12);
                doc.setTextColor(133, 23, 44);
                const tableHeader = cells.join('  ·  ');
                const hdrLines = safeSplit(`[DESGLOSE TÉCNICO] ${tableHeader}`, contentWidth);
                for (const hl of hdrLines) {
                  doc.text(hl, marginLeft, yPos);
                  yPos += 6.2;
                }
                yPos += 1;
              } else {
                // Fila de datos del guion
                checkPageBreak(12);
                const timeCell = cells[0]?.replace(/\*\*/g, '') || '';
                const actionCell = cells[1]?.replace(/\*\*/g, '') || '';
                const speechCell = cells[2]?.replace(/\*\*/g, '') || '';
                const chyronCell = cells[3]?.replace(/\*\*/g, '') || '';

                doc.setFont('helvetica', 'bold');
                doc.setFontSize(12);
                doc.setTextColor(133, 23, 44);
                doc.text(`▶ ${timeCell}`, marginLeft, yPos);
                yPos += 6.2;

                if (actionCell) {
                  doc.setFont('helvetica', 'normal');
                  doc.setFontSize(12);
                  doc.setTextColor(51, 65, 85);
                  const actLines = safeSplit(`Acción / Imagen: ${actionCell}`, contentWidth - 4);
                  for (const al of actLines) {
                    checkPageBreak(6.2);
                    doc.text(al, marginLeft + 4, yPos);
                    yPos += 6.2;
                  }
                }

                if (speechCell) {
                  doc.setFont('helvetica', 'italic');
                  doc.setFontSize(12);
                  doc.setTextColor(15, 23, 42);
                  const spLines = safeSplit(`Locución: ${speechCell}`, contentWidth - 4);
                  for (const sl of spLines) {
                    checkPageBreak(6.2);
                    doc.text(sl, marginLeft + 4, yPos);
                    yPos += 6.2;
                  }
                }

                if (chyronCell) {
                  doc.setFont('helvetica', 'normal');
                  doc.setFontSize(12);
                  doc.setTextColor(100, 116, 139);
                  const chLines = safeSplit(`Texto en pantalla / Chyron: ${chyronCell}`, contentWidth - 4);
                  for (const cl of chLines) {
                    checkPageBreak(6.2);
                    doc.text(cl, marginLeft + 4, yPos);
                    yPos += 6.2;
                  }
                }
                yPos += 2.5;
              }
              continue;
            }
          }

          // Subtítulos h2 / h3 o etiqueta de guion
          if (
            line.startsWith('###') ||
            line.startsWith('##') ||
            line.startsWith('#') ||
            line.startsWith('GUION') ||
            line.includes('SPOT DE VIDEO') ||
            line.includes('CUÑA RADIAL') ||
            line.includes('MENSAJE DIRECTO') ||
            line.includes('CARROUSEL') ||
            line.includes('DECLARACIÓN EN PLAZA')
          ) {
            checkPageBreak(12);
            yPos += 2;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(15, 23, 42);
            const cleanTitle = line.replace(/^#{1,4}\s*/, '').replace(/\*\*/g, '');
            const titleWrapped = safeSplit(cleanTitle, contentWidth);
            for (const tw of titleWrapped) {
              checkPageBreak(6.2);
              doc.text(tw, marginLeft, yPos);
              yPos += 6.2;
            }
            yPos += 1.5;
          } else if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ') || /^\d+\.\s/.test(line)) {
            // Viñeta estructurada
            checkPageBreak(7);
            const bulletContent = line.replace(/^[-*•\d+.]\s*/, '');
            const cleanBullet = bulletContent.replace(/\*\*(.*?)\*\*/g, '$1');

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.setTextColor(133, 23, 44);
            doc.text('•', marginLeft + 1.5, yPos);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.setTextColor(30, 41, 59);
            const bulletLines = safeSplit(cleanBullet, contentWidth - 6);
            for (let i = 0; i < bulletLines.length; i++) {
              if (i > 0) checkPageBreak(6.2);
              doc.text(bulletLines[i], marginLeft + 6, yPos);
              yPos += 6.2;
            }
            yPos += 1.5;
          } else if (line.startsWith('>')) {
            // Bloque de cita o especificación técnica en Arial 12 pt
            checkPageBreak(7);
            const cleanQuote = line.replace(/^>\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1');
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(12);
            doc.setTextColor(71, 85, 105);
            const qLines = safeSplit(cleanQuote, contentWidth - 6);
            for (const ql of qLines) {
              checkPageBreak(6.2);
              doc.text(ql, marginLeft + 5, yPos);
              yPos += 6.2;
            }
            yPos += 1.5;
          } else if (line.startsWith('*(') || line.startsWith('(') || line.startsWith('_')) {
            // Acotación técnica / escénica en cursiva Arial 12 pt
            checkPageBreak(6.5);
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(12);
            doc.setTextColor(71, 85, 105);
            const cleanItalic = line.replace(/[*_]/g, '');
            const itLines = safeSplit(cleanItalic, contentWidth);
            for (const it of itLines) {
              checkPageBreak(6.2);
              doc.text(it, marginLeft, yPos);
              yPos += 6.2;
            }
            yPos += 1.5;
          } else {
            // Párrafo general en Arial 12 pt
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.setTextColor(30, 41, 59);
            const clean = line.replace(/\*\*(.*?)\*\*/g, '$1').replace(/`{1,3}/g, '');
            const pLines = safeSplit(clean, contentWidth);
            for (const pl of pLines) {
              checkPageBreak(6.2);
              doc.text(pl, marginLeft, yPos);
              yPos += 6.2;
            }
            yPos += 2.5;
          }
        }
      };

      // ==========================================
      // SECCIÓN 1: SÍNTESIS DEL INFORME INICIAL
      // ==========================================
      printSectionTitle('1', 'SÍNTESIS DEL INFORME INICIAL', 'Documento Base: Estrategia Transversal y Publicidad Política');
      printStructuredMarkdown(initialReportSynthesis);
      yPos += 4;

      // ==========================================
      // SECCIÓN 2: TEMA SELECCIONADO POR EL USUARIO
      // ==========================================
      printSectionTitle('2', 'TEMA ESTRATÉGICO SELECCIONADO POR EL USUARIO', `Eje Temático Priorizado: ${currentSelectedTheme?.axis || 'General'}`);
      
      const themeText = `
- **Tema Priorizado:** ${currentSelectedTheme?.title || 'No seleccionado'}
- **Eje Estratégico:** ${currentSelectedTheme?.axis || 'General'}
- **Categoría Temática:** ${currentSelectedTheme?.category || 'General'}
- **Justificación Territorial:** ${currentSelectedTheme?.summary || 'Sin justificación previa'}
- **Origen en el Informe Base:** ${currentSelectedTheme?.sourceContext || 'Documento Oficial'}
`.trim();
      printStructuredMarkdown(themeText);
      yPos += 4;

      // ==========================================
      // SECCIÓN 3: NOTICIAS USADAS COMO REFERENCIA
      // ==========================================
      printSectionTitle('3', 'NOTICIAS Y EVIDENCIAS DE PRENSA USADAS COMO REFERENCIA', `Fuentes Privilegiadas (${selectedNewsItems.length} seleccionadas)`);
      
      if (selectedNewsItems.length === 0) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(12);
        doc.setTextColor(100, 116, 139);
        const emptyMsg = safeSplit(
          'No se seleccionaron noticias previas. Se recomienda marcar evidencias fácticas en la Subherramienta 1 para respaldar la estrategia.',
          contentWidth
        );
        for (const em of emptyMsg) {
          checkPageBreak(6.2);
          doc.text(em, marginLeft, yPos);
          yPos += 6.2;
        }
        yPos += 4;
      } else {
        selectedNewsItems.forEach((n, idx) => {
          checkPageBreak(25);

          // Encabezado de la noticia (12 pt bold, burdeos)
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(133, 23, 44);
          doc.text(`[Evidencia ${idx + 1}] ${n.mediaSource.toUpperCase()}  |  Fecha: ${n.date}`, marginLeft, yPos);
          yPos += 6;

          // Titular de la noticia (12 pt bold, slate-900)
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(15, 23, 42);
          const titleWrapped = safeSplit(`"${n.title}"`, contentWidth);
          for (const tw of titleWrapped) {
            checkPageBreak(6.2);
            doc.text(tw, marginLeft, yPos);
            yPos += 6.2;
          }
          yPos += 1;

          // Hechos fácticos (12 pt normal, slate-700)
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(12);
          doc.setTextColor(51, 65, 85);
          const summaryWrapped = safeSplit(`Hechos fácticos: ${n.summary}`, contentWidth);
          for (const sw of summaryWrapped) {
            checkPageBreak(6.2);
            doc.text(sw, marginLeft, yPos);
            yPos += 6.2;
          }
          yPos += 1;

          // Relevancia estratégica (12 pt normal, slate-700)
          const relWrapped = safeSplit(`Relevancia para la campaña: ${n.relevance}`, contentWidth);
          for (const rw of relWrapped) {
            checkPageBreak(6.2);
            doc.text(rw, marginLeft, yPos);
            yPos += 6.2;
          }

          // Enlace (ajustado estrictamente a los márgenes sin desbordar)
          if (n.url) {
            yPos += 1;
            checkPageBreak(6.2);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(37, 99, 235);
            const urlWrapped = safeSplit(`Fuente / Enlace: ${n.url}`, contentWidth);
            for (const uw of urlWrapped) {
              checkPageBreak(5.5);
              doc.text(uw, marginLeft, yPos);
              yPos += 5.5;
            }
          }

          // Separador fino entre noticias
          yPos += 2;
          doc.setDrawColor(226, 232, 240);
          doc.setLineWidth(0.25);
          doc.line(marginLeft, yPos, pageWidth - marginRight, yPos);
          yPos += 4.5;
        });
      }
      yPos += 2;

      // ==========================================
      // SECCIÓN 4: GUIÓN TÉCNICO GENERADO
      // ==========================================
      printSectionTitle('4', 'GUIÓN TÉCNICO GENERADO DE PUBLICIDAD POLÍTICA', `Nivel de Producción: ${activeComplexity.name} (Nivel ${activeComplexity.level} de 5) · Postura Nal: ${activeNationalAlignment.toUpperCase()} · Gobierno Dptal: ${activeLocalAlignment.toUpperCase()} (Tono: ${effectiveVideoTone})`);
      
      if (!scriptsContent) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(12);
        doc.setTextColor(100, 116, 139);
        const pendLines = safeSplit(
          'Pendiente de redacción. Ejecute la Subherramienta 2 para redactar los guiones técnicos e incorporarlos a este compilado.',
          contentWidth
        );
        for (const pl of pendLines) {
          checkPageBreak(6.2);
          doc.text(pl, marginLeft, yPos);
          yPos += 6.2;
        }
      } else {
        printStructuredMarkdown(scriptsContent);
      }

      // ==========================================
      // PIE DE PÁGINA FORMAL CON PAGINACIÓN
      // ==========================================
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        
        // Línea divisoria del pie
        doc.setDrawColor(226, 232, 240);
        doc.setLineWidth(0.3);
        doc.line(marginLeft, pageHeight - 14, pageWidth - marginRight, pageHeight - 14);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(148, 163, 184);
        doc.text(
          `CMT PROTEUS · Dossier Estratégico Subregional · ${subregion.name} · ${candidateName}`,
          marginLeft,
          pageHeight - 9
        );

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(100, 116, 139);
        doc.text(
          `Página ${i} de ${totalPages}`,
          pageWidth - marginRight,
          pageHeight - 9,
          { align: 'right' }
        );
      }

      const safeCandidateName = candidateName.replace(/\s+/g, '_');
      const safeSubregion = subregion.name.replace(/\s+/g, '_');
      doc.save(`Dossier_Compilado_${safeSubregion}_${safeCandidateName}.pdf`);
    } catch (err) {
      console.error('Error generando Dossier PDF:', err);
    } finally {
      setIsCompilingPDF(false);
    }
  };

  // Bloqueo secuencial si no hay informe base
  if (!analysisReport) {
    return (
      <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border-2 border-dashed border-white/10 rounded-3xl p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-200 flex items-center justify-center mx-auto text-slate-400">
          <Layers className="w-6 h-6" />
        </div>
        <h4 className="text-base font-black text-slate-200">
          Subherramientas Estratégicas Derivadas (En Secuencia)
        </h4>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Estas subherramientas dependen <strong>en su totalidad</strong> del documento <em>"Estrategia Transversal y Publicidad Política"</em>. 
          Genera primero el informe del analista para habilitar la <strong>Ampliación de Temas</strong>, la <strong>Redacción de Guiones</strong> y el <strong>Compilador Final</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-4">
      {/* ENCABEZADO DE SECCIÓN: SUBHERRAMIENTAS SECUENCIALES */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-blue-500/30 text-blue-200 border border-blue-400/40 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Flujo Derivado Secuencial
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Basado en: <em>Estrategia Transversal y Publicidad Política</em>
            </span>
          </div>
          <div className="text-[11px] text-amber-300 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            3 Subherramientas Activas (Profundización, Guiones & Compilador Final)
          </div>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
            <Sliders className="w-6 h-6 text-blue-400" />
            Profundización Temática, Guiones & Compilador en PDF
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
            La <strong>Subherramienta 1</strong> profundiza en los 4 ejes fundamentales y rastrea noticias en medios regionales. 
            La <strong>Subherramienta 2</strong> redacta guiones técnicos según el nivel de simplicidad deseado. 
            La <strong>Subherramienta 3</strong> compila la síntesis inicial, el tema, las noticias y los guiones en un <strong>Dossier descargable en PDF</strong>.
          </p>
        </div>

        {/* Indicador de Flujo Secuencial en 3 Pasos */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className={`p-3 rounded-2xl border transition-all ${
            selectedThemeId && identifiedNews.length > 0 
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100' 
              : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/5 border-white/10 text-white'
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[11px] flex items-center justify-center font-black">1</span>
              <span>Paso 1: Profundización & Prensa</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1 pl-7">
              {currentSelectedTheme ? `Eje: ${currentSelectedTheme.axis} · "${currentSelectedTheme.title.slice(0, 35)}..."` : 'Selecciona un tema'}
              {identifiedNews.length > 0 && ` · ${selectedNewsItems.length} seleccionada(s)`}
            </div>
          </div>

          <div className={`p-3 rounded-2xl border transition-all ${
            scriptsContent 
              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100' 
              : selectedNewsItems.length > 0 
                ? 'bg-blue-950/40 border-blue-400/50 text-blue-100' 
                : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/5 border-white/10 text-slate-400 opacity-60'
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${
                selectedNewsItems.length > 0 ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'
              }`}>2</span>
              <span>Paso 2: Guiones ({activeComplexity.badge})</span>
            </div>
            <div className="text-[11px] mt-1 pl-7 text-slate-300">
              {scriptsContent 
                ? `Guiones listos (${activeComplexity.name})` 
                : selectedNewsItems.length > 0 
                  ? `Listo para redactar (${selectedNewsItems.length} noticia(s))` 
                  : 'Requiere marcar noticias'}
            </div>
          </div>

          <div className={`p-3 rounded-2xl border transition-all ${
            scriptsContent 
              ? 'bg-teal-950/40 border-teal-500/50 text-teal-100' 
              : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/5 border-white/10 text-slate-400 opacity-60'
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className={`w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black ${
                scriptsContent ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}>3</span>
              <span>Paso 3: Compilador Dossier PDF</span>
            </div>
            <div className="text-[11px] mt-1 pl-7 text-slate-300">
              {scriptsContent 
                ? 'Dossier 4/4 completo listo para descargar' 
                : 'Se compila con los 4 componentes'}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBHERRAMIENTA 1: AMPLIACIÓN O PROFUNDIZACIÓN DE TEMAS ESTRATÉGICOS        */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10/90 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-sky-500/20 text-sky-300 text-blue-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Subherramienta 1
              </span>
              <span className="text-xs font-bold text-slate-400">
                Lectura Precisa por Ejes Temáticos & Clipping en Prensa
              </span>
            </div>
            <h4 className="text-lg font-black text-white mt-1">
              Ampliación o Profundización de Temas Estratégicos
            </h4>
          </div>

          <div className="text-[11px] text-slate-400 font-medium">
            Fuentes privilegiadas: <strong>El Colombiano, Qhubo, MiOriente, Minuto 30, Las 2Orillas</strong>
          </div>
        </div>

        {/* PASO 1.1: SELECCIÓN DEL TEMA ESTRATÉGICO POR EJES (MOVILIDAD, SEGURIDAD, ESPACIO PÚBLICO, GESTIÓN DEL RIESGO) */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Tag className="w-4 h-4 text-blue-600" />
              1. Selecciona el Tema Estratégico a Profundizar (Leído del Informe):
            </label>

            {/* Filtros por Eje Temático */}
            <div className="flex flex-wrap items-center gap-1 text-[10px]">
              <span className="text-slate-400 font-semibold mr-1">Filtrar por eje:</span>
              {(['Todos', 'Movilidad', 'Seguridad', 'Espacio Público', 'Gestión del Riesgo', 'Propuesta Programática'] as const).map((axis) => (
                <button
                  key={axis}
                  type="button"
                  onClick={() => setActiveAxisFilter(axis)}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-colors ${
                    activeAxisFilter === axis
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {axis}
                </button>
              ))}
            </div>
          </div>

          {/* Cuadrícula de Temas Extraídos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredThemesByAxis.map((theme) => {
              const isSelected = !isCustomTheme && selectedThemeId === theme.id;
              const axisColorStyle = getAxisBadgeStyle(theme.axis);

              return (
                <div
                  key={theme.id}
                  onClick={() => {
                    setSelectedThemeId(theme.id);
                    setIsCustomTheme(false);
                  }}
                  className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative ${
                    isSelected
                      ? 'border-blue-600 bg-sky-500/10/70 shadow-sm'
                      : 'border-white/10 bg-white/[0.04] backdrop-blur-sm border border-white/10/50 hover:bg-slate-100/60 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${axisColorStyle}`}>
                      {theme.axis}
                    </span>
                    {isSelected && (
                      <span className="text-blue-600">
                        <CheckCircle2 className="w-4 h-4 fill-blue-600 text-white" />
                      </span>
                    )}
                  </div>
                  <h5 className="text-xs font-bold text-white mt-2 line-clamp-2">
                    {theme.title}
                  </h5>
                  <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                    {theme.summary}
                  </p>
                  <div className="text-[10px] text-slate-400 font-medium mt-2 pt-2 border-t border-white/10/60 flex items-center justify-between">
                    <span>Origen: {theme.sourceContext}</span>
                    <span className="text-blue-700 font-bold">{theme.category}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Opción de tema personalizado si se desea afinar */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsCustomTheme(!isCustomTheme)}
              className="text-xs text-blue-700 font-bold hover:underline flex items-center gap-1"
            >
              {isCustomTheme ? '← Usar temas sugeridos por los ejes' : '+ Especificar o editar tema manualmente'}
            </button>

            {isCustomTheme && (
              <div className="mt-2.5 flex gap-2">
                <input
                  type="text"
                  value={customThemeInput}
                  onChange={(e) => setCustomThemeInput(e.target.value)}
                  placeholder="Ej. Crisis de peajes y movilidad de carga pesada en el Oriente Antioqueño..."
                  className="flex-1 text-xs bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl px-3.5 py-2.5 font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* PASO 1.2: BOTÓN DE BÚSQUEDA EN INTERNET EN CUALQUIER MEDIO (FILTRO: ÚLTIMO MES) */}
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-blue-700" />
              <span>Búsqueda con Google Search en Cualquier Medio Informativo:</span>
            </div>
            <div className="text-xs text-blue-800 font-extrabold mt-0.5">
              "{currentSelectedTheme?.title || 'Selecciona un tema'}"
            </div>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 border border-amber-200">
                <Clock className="w-3 h-3 text-amber-700" />
                Filtro de herramientas: Solo noticias del último mes
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-400">
                Cualquier medio de comunicación o portal (sin exclusiones)
              </span>
            </div>
          </div>

          <button
            id="btn-buscar-noticias-tema"
            type="button"
            onClick={handleSearchThemeNews}
            disabled={isSearchingNews || !currentSelectedTheme}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white rounded-xl text-xs font-black shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 whitespace-nowrap cursor-pointer"
          >
            {isSearchingNews ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
            <span>{isSearchingNews ? 'Buscando con Google Search...' : 'Buscar Noticias del Tema'}</span>
          </button>
        </div>

        {/* Estado de carga */}
        {isSearchingNews && (
          <div className="bg-sky-500/10 border border-blue-200 rounded-2xl p-4 text-center space-y-2 animate-pulse">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
            <div className="text-xs font-black text-blue-950">
              Navegando en Google Search en cualquier medio de comunicación...
            </div>
            <p className="text-[11px] text-blue-700 max-w-md mx-auto">
              Buscando: | {subregion.name}; {currentSelectedTheme?.title} | con filtro de herramientas: <strong>último mes (últimos 30 días)</strong>.
            </p>
          </div>
        )}

        {/* Notificación de Grounding verificado de Google Search */}
        {executedSearchQueries.length > 0 && !isSearchingNews && (
          <div className="bg-emerald-500/10 border border-emerald-200 rounded-2xl p-3 text-xs text-emerald-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>Búsqueda en Google Search verificada:</strong> {executedSearchQueries.slice(0, 2).map(q => `"${q}"`).join(' · ')}
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10px] bg-amber-500/20 text-amber-300 text-amber-900 font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border border-amber-200">
                <Clock className="w-3 h-3 text-amber-700" />
                Último mes
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                Cualquier medio
              </span>
            </div>
          </div>
        )}

        {/* Error si ocurre */}
        {searchNewsError && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-3.5 text-xs text-red-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{searchNewsError}</span>
            </div>
            <button
              onClick={handleSearchThemeNews}
              className="text-xs font-bold text-red-800 underline"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* PASO 1.3: NOTICIAS IDENTIFICADAS DISCRECIONALMENTE SELECCIONABLES (1, 2, 3...) */}
        {identifiedNews.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
              <div>
                <div className="text-xs font-black text-white flex items-center gap-1.5">
                  <Newspaper className="w-4 h-4 text-blue-600" />
                  Noticias Identificadas ({identifiedNews.length}):
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Selección discrecional: puedes elegir <strong>una sola noticia, dos, tres o las que desees</strong> para sustentar tus guiones.
                </div>
              </div>

              {/* Filtros Dinámicos de Medios y Botones de Selección */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 text-[10px] bg-slate-100 p-1 rounded-xl flex-wrap">
                  {availableMediaList.map((med) => {
                    const count = med === 'todos'
                      ? identifiedNews.length
                      : identifiedNews.filter(n => n.mediaSource.toLowerCase().trim() === med.toLowerCase().trim()).length;
                    return (
                      <button
                        key={med}
                        type="button"
                        onClick={() => setActiveMediaFilter(med)}
                        className={`px-2 py-0.5 rounded-lg font-bold transition-colors ${
                          activeMediaFilter === med
                            ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-white shadow-xs'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {med === 'todos' ? `Todos (${count})` : `${med} (${count})`}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleSelectAllNews}
                    className="text-[10px] text-blue-700 hover:underline font-bold px-1.5"
                  >
                    Seleccionar todas
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={handleClearNewsSelection}
                    className="text-[10px] text-slate-400 hover:underline font-medium px-1.5"
                  >
                    Limpiar selección
                  </button>
                </div>
              </div>
            </div>

            {/* Cuadrícula de Noticias Seleccionables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredNews.map((news) => {
                const mediaBadgeColor = getMediaBadgeStyle(news.mediaSource);
                return (
                  <div
                    key={news.id}
                    onClick={() => toggleNewsSelection(news.id)}
                    className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative flex flex-col justify-between ${
                      news.selected
                        ? 'border-emerald-600 bg-emerald-500/10/50 shadow-sm'
                        : 'border-white/10 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-white/[0.04] backdrop-blur-sm border border-white/10/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md border ${mediaBadgeColor}`}>
                          {news.mediaSource}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {news.date}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleNewsSelection(news.id);
                            }}
                            className="text-slate-400 hover:text-emerald-600 focus:outline-none"
                          >
                            {news.selected ? (
                              <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-400 hover:text-slate-300" />
                            )}
                          </button>
                        </div>
                      </div>

                      <h5 className="text-xs font-black text-white leading-snug">
                        {news.title}
                      </h5>

                      <p className="text-[11px] text-slate-300 line-clamp-3">
                        {news.summary}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400 font-medium line-clamp-1 flex-1 mr-2">
                        <strong>Impacto:</strong> {news.relevance}
                      </span>
                      
                      {/* BOTÓN VER NOTICIA CON REDIRECCIÓN AUTOMÁTICA */}
                      <button
                        id={`btn-ver-noticia-${news.id}`}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenNewsUrl(news);
                        }}
                        className="px-2.5 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 active:bg-blue-200 text-blue-700 hover:text-blue-900 rounded-lg text-[10px] font-black flex items-center gap-1 border border-blue-200 transition-colors flex-shrink-0 cursor-pointer shadow-2xs"
                        title={`Abrir noticia en ${news.mediaSource}`}
                      >
                        <span>Ver</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Banner de Selección Discrecional */}
            <div className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 transition-all ${
              selectedNewsItems.length > 0 
                ? 'bg-emerald-500/10 border-emerald-200 text-emerald-950' 
                : 'bg-amber-500/10 border-amber-200 text-amber-950'
            }`}>
              <div className="text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${selectedNewsItems.length > 0 ? 'text-emerald-600' : 'text-amber-600'}`} />
                <span>
                  {selectedNewsItems.length === 0 ? (
                    <strong>0 noticias seleccionadas:</strong>
                  ) : selectedNewsItems.length === 1 ? (
                    <strong>1 noticia seleccionada:</strong>
                  ) : (
                    <strong>{selectedNewsItems.length} noticias seleccionadas:</strong>
                  )}{' '}
                  {selectedNewsItems.length === 0 
                    ? 'Selecciona discrecionalmente 1, 2, 3 o más noticias para habilitar el redactor de guiones.' 
                    : 'Listas como evidencia fáctica indiscutible para la redacción de guiones.'}
                </span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-lg bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10">
                  {selectedNewsItems.length} / {identifiedNews.length} seleccionada(s)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SUBHERRAMIENTA 2: REDACCIÓN DE GUIONES ESTRATÉGICOS                        */}
      {/* ========================================================================= */}
      <div className={`bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 sm:p-8 shadow-xl border transition-all ${
        selectedNewsItems.length > 0 ? 'border-white/10/90' : 'border-white/10/50 opacity-70'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-indigo-100 text-indigo-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Subherramienta 2
              </span>
              <span className="text-xs font-bold text-slate-400">
                Dependiente de Subherramienta 1 y del Informe Oficial
              </span>
            </div>
            <h4 className="text-lg font-black text-white mt-1">
              Redacción de Guiones de Publicidad Política (Multiformato)
            </h4>
          </div>

          <div className="text-[11px] text-slate-400 font-medium">
            Parámetros: <strong>{candidateName} · {office.label} · {subregion.name} · {selectedNewsItems.length} noticia(s)</strong>
          </div>
        </div>

        {/* Estado Bloqueado si no hay al menos una noticia seleccionada */}
        {selectedNewsItems.length === 0 ? (
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border-2 border-dashed border-white/10 rounded-2xl p-6 text-center space-y-2 my-4">
            <ShieldAlert className="w-8 h-8 text-slate-400 mx-auto" />
            <h5 className="text-xs font-black text-slate-200 uppercase tracking-wide">
              Subherramienta 2 a la espera de selección
            </h5>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Para redactar los guiones respaldados en hechos indiscutibles, marca <strong>al menos 1 noticia</strong> (o 2, o 3) en la Subherramienta 1.
            </p>
          </div>
        ) : (
          <div className="space-y-6 pt-4">
            {/* ESCALA DE SIMPLICIDAD / NIVEL DE PRODUCCIÓN DEL GUION (5 OPCIONES) */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <Clapperboard className="w-4 h-4 text-indigo-600" />
                  Nivel de Simplicidad del Guion (Escala de 5 Opciones):
                </label>
                <span className="text-[11px] text-indigo-700 font-bold">
                  Seleccionado: {activeComplexity.name}
                </span>
              </div>

              {/* Selector Visual de las 5 Opciones */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {SCRIPT_COMPLEXITY_OPTIONS.map((option) => {
                  const isSelected = selectedComplexityLevel === option.level;
                  return (
                    <div
                      key={option.id}
                      onClick={() => setSelectedComplexityLevel(option.level)}
                      className={`cursor-pointer p-3 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-200'
                          : 'border-white/10 bg-white/[0.04] backdrop-blur-sm border border-white/10/50 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-200'
                          }`}>
                            {option.level}
                          </span>
                          <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 text-slate-300">
                            {option.badge}
                          </span>
                        </div>

                        <div className="text-xs font-black text-white mt-2">
                          {option.shortName}
                        </div>

                        <p className="text-[10px] text-slate-300 mt-1 line-clamp-3 leading-relaxed">
                          {option.description}
                        </p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-white/10/60 flex flex-wrap gap-1">
                        {option.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="text-[8.5px] bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-slate-200 px-1 py-0.5 rounded font-medium border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Banner de Condicionantes Activos */}
            <div className="bg-gradient-to-br from-indigo-50/90 via-slate-50 to-blue-50/50 border border-indigo-200 rounded-2xl p-4 space-y-2">
              <div className="text-xs font-black text-indigo-950 uppercase tracking-wide flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Condicionantes de Redacción Aplicados:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 text-[11px]">
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/80 p-2 rounded-xl border border-indigo-100">
                  <span className="font-bold text-slate-200">Candidato: </span>
                  <span className="text-white font-black">{candidateName}</span> ({candidateParty})
                </div>
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/80 p-2 rounded-xl border border-indigo-100">
                  <span className="font-bold text-slate-200">Tono Videos: </span>
                  <span className="text-white font-semibold">{effectiveVideoTone}</span>
                  {activeLocalAlignment === 'aliado' && (
                    <span className="ml-1 text-[9px] bg-emerald-500/20 text-emerald-300 text-emerald-800 font-bold px-1.5 py-0.5 rounded border border-emerald-300">
                      Constructivo
                    </span>
                  )}
                </div>
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/80 p-2 rounded-xl border border-indigo-100">
                  <span className="font-bold text-slate-200">Gobierno Antioquia: </span>
                  <span className={`font-bold uppercase ${
                    activeLocalAlignment === 'aliado' ? 'text-emerald-700' : activeLocalAlignment === 'independiente' ? 'text-sky-700' : 'text-rose-700'
                  }`}>
                    {activeLocalAlignment}
                  </span>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/80 p-2 rounded-xl border border-indigo-100">
                  <span className="font-bold text-slate-200">Eje & Subregión: </span>
                  <span className="text-white font-semibold">{currentSelectedTheme.axis} · {subregion.name}</span>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/80 p-2 rounded-xl border border-indigo-100">
                  <span className="font-bold text-slate-200">Complejidad: </span>
                  <span className="text-indigo-950 font-black">{activeComplexity.badge}</span>
                </div>
              </div>
              <div className="text-[11px] text-indigo-900 pt-1">
                <span className="font-bold">Noticias Integradas ({selectedNewsItems.length}): </span>
                {selectedNewsItems.map(n => `"${n.title}" (${n.mediaSource})`).join(', ')}
              </div>
            </div>

            {/* Enfoque de Viralidad y Analogías con la Política Nacional */}
            <div className="bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-50 border border-amber-300/80 rounded-2xl p-3.5 flex items-start gap-3 shadow-xs">
              <div className="p-2 bg-amber-500/10 border border-amber-300 rounded-xl text-amber-700 flex-shrink-0 mt-0.5">
                <Flame className="w-4 h-4 text-amber-600" />
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-amber-950 uppercase tracking-wide text-[11px]">
                    Motor de Viralidad y Analogía Nacional
                  </span>
                  <span className="text-[9.5px] font-black bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md border border-amber-300">
                    Coyuntura Abelardo De La Espriella
                  </span>
                </div>
                <p className="text-[11px] text-amber-900/90 leading-relaxed">
                  Para maximizar el alcance en redes sociales y conversación pública, los guiones establecen <strong>analogías narrativas con políticas del orden nacional</strong>, incluyendo menciones y contrastes estratégicos con el <strong>actual presidente Abelardo De La Espriella</strong> (seguridad, autoridad, presupuesto y descentralización).
                </p>
              </div>
            </div>

            {/* Postura del Candidato frente al Gobierno Nacional y Figuras Políticas */}
            <div className={`border rounded-2xl p-3.5 flex items-start gap-3 shadow-xs transition-colors ${
              activeNationalAlignment === 'aliado'
                ? 'bg-emerald-500/10/70 border-emerald-300'
                : activeNationalAlignment === 'independiente'
                  ? 'bg-sky-50/70 border-sky-300'
                  : 'bg-rose-50/70 border-rose-300'
            }`}>
              <div className={`p-2 rounded-xl border flex-shrink-0 mt-0.5 ${
                activeNationalAlignment === 'aliado'
                  ? 'bg-emerald-500/20 text-emerald-300 text-emerald-700 border-emerald-300'
                  : activeNationalAlignment === 'independiente'
                    ? 'bg-sky-100 text-sky-700 border-sky-300'
                    : 'bg-rose-100 text-rose-700 border-rose-300'
              }`}>
                {activeNationalAlignment === 'aliado' ? (
                  <Handshake className="w-4 h-4" />
                ) : activeNationalAlignment === 'independiente' ? (
                  <Scale className="w-4 h-4" />
                ) : (
                  <ShieldAlert className="w-4 h-4" />
                )}
              </div>
              <div className="space-y-1 text-xs flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black uppercase tracking-wide text-[11px] text-white">
                    Postura del Candidato frente al Gobierno Nacional:
                  </span>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase ${
                    activeNationalAlignment === 'aliado'
                      ? 'bg-emerald-200 text-emerald-900 border border-emerald-300'
                      : activeNationalAlignment === 'independiente'
                        ? 'bg-sky-200 text-sky-900 border border-sky-300'
                        : 'bg-rose-200 text-rose-900 border border-rose-300'
                  }`}>
                    {activeNationalAlignment === 'aliado'
                      ? 'Aliado al Gobierno Nacional'
                      : activeNationalAlignment === 'independiente'
                        ? 'Independiente'
                        : 'Opositor al Gobierno Nacional'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  {activeNationalAlignment === 'aliado'
                    ? 'Afectación del Guión: El candidato adopta un tono de articulación directa y gestión con el presidente Abelardo De La Espriella, proyectando gobernabilidad y recursos para el territorio, dejando atrás la confrontación histórica.'
                    : activeNationalAlignment === 'independiente'
                      ? 'Afectación del Guión: El candidato asume un balance estricto y municipalista: ni servilismo ante el presidente Abelardo De La Espriella ni sumisión a los liderazgos tradicionales de Álvaro Uribe. Foco 100% en las comunidades.'
                      : 'Afectación del Guión: El candidato asume un tono de confrontación fiscalizadora frente a las promesas y decisiones de Abelardo De La Espriella, reivindicando la autonomía antioqueña y el legado de autoridad y orden de Álvaro Uribe.'}
                </p>
                {activeNationalRationale && (
                  <div className="text-[10.5px] text-slate-300 italic bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/80 px-2.5 py-1 rounded-lg border border-white/10">
                    <span className="font-bold text-white not-italic">Justificación estratégica: </span>
                    {activeNationalRationale}
                  </div>
                )}
              </div>
            </div>

            {/* Cercanía con el Gobierno Departamental de Antioquia y Tono Narrativo Constructivo */}
            <div className={`border rounded-2xl p-3.5 flex items-start gap-3 shadow-xs transition-colors ${
              activeLocalAlignment === 'aliado'
                ? 'bg-emerald-500/10/80 border-emerald-300'
                : activeLocalAlignment === 'independiente'
                  ? 'bg-sky-50/70 border-sky-300'
                  : 'bg-rose-50/70 border-rose-300'
            }`}>
              <div className={`p-2 rounded-xl border flex-shrink-0 mt-0.5 ${
                activeLocalAlignment === 'aliado'
                  ? 'bg-emerald-500/20 text-emerald-300 text-emerald-800 border-emerald-300'
                  : activeLocalAlignment === 'independiente'
                    ? 'bg-sky-100 text-sky-700 border-sky-300'
                    : 'bg-rose-100 text-rose-700 border-rose-300'
              }`}>
                <Building2 className="w-4 h-4" />
              </div>
              <div className="space-y-1 text-xs flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black uppercase tracking-wide text-[11px] text-white">
                    Cercanía con el Actual Gobierno de Antioquia (Gobernación):
                  </span>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase flex items-center gap-1 ${
                    activeLocalAlignment === 'aliado'
                      ? 'bg-emerald-200 text-emerald-900 border border-emerald-300'
                      : activeLocalAlignment === 'independiente'
                        ? 'bg-sky-200 text-sky-900 border border-sky-300'
                        : 'bg-rose-200 text-rose-900 border border-rose-300'
                  }`}>
                    {activeLocalAlignment === 'aliado'
                      ? 'Aliado del Gobierno de Antioquia · Tono Constructivo Obligatorio'
                      : activeLocalAlignment === 'independiente'
                        ? 'Independiente Territorial'
                        : 'Opositor al Gobierno Departamental'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  {activeLocalAlignment === 'aliado' ? (
                    <>
                      <strong>Parámetro Clave de Tono Narrativo:</strong> Al ser identificado como aliado del actual gobierno departamental de Antioquia (caso insigne de <strong>Luis Horacio Gallón</strong>, aliado clave de la Gobernación de Andrés Julián Rendón), el tono narrativo de los videos es <strong>CONSTRUCTIVO, propositivo y de articulación gerencial</strong>. Los guiones se enfocan en "construir sobre lo construido", cofinanciar proyectos estratégicos y resolver en equipo los retos de {subregion.name}, descartando retóricas destructivas contra la administración departamental.
                    </>
                  ) : activeLocalAlignment === 'independiente' ? (
                    <>
                      <strong>Afectación al Tono de Videos:</strong> Postura de autonomía técnica y equilibrio institucional frente a la Gobernación de Antioquia, priorizando estrictamente las demandas de los municipios de {subregion.name}.
                    </>
                  ) : (
                    <>
                      <strong>Afectación al Tono de Videos:</strong> Tono fiscalizador y crítico frente a los compromisos e inversiones de la administración departamental en la subregión.
                    </>
                  )}
                </p>
                {activeLocalRationale && (
                  <div className="text-[10.5px] text-slate-300 italic bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/80 px-2.5 py-1 rounded-lg border border-white/10">
                    <span className="font-bold text-white not-italic">Justificación local: </span>
                    {activeLocalRationale}
                  </div>
                )}
              </div>
            </div>

            {/* Botón de Generación de Guiones */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <div className="text-xs font-black text-white">
                  Generación de Paquete de Guiones ({activeComplexity.name}):
                </div>
                <div className="text-[11px] text-slate-400">
                  Spot de Video adaptado al Nivel {activeComplexity.level}, Cuña Radial / Perifoneo, Declaración Directa a Cámara y Carrusel de Redes.
                </div>
              </div>

              <button
                id="btn-generar-guiones-estrategicos"
                type="button"
                onClick={handleGenerateScripts}
                disabled={isGeneratingScripts}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 hover:from-indigo-950 hover:to-blue-950 text-white rounded-2xl text-xs sm:text-sm font-black shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
              >
                {isGeneratingScripts ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-indigo-300" />
                    <span>Redactando Guiones ({activeComplexity.badge})...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>{scriptsContent ? 'Regenerar Guiones' : 'Redactar Guiones Estratégicos'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Estado de carga */}
            {isGeneratingScripts && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 text-center space-y-2 animate-pulse">
                <RefreshCw className="w-6 h-6 animate-spin text-indigo-600 mx-auto" />
                <div className="text-xs font-black text-indigo-950">
                  Redactando guiones técnicos bajo el {activeComplexity.name}...
                </div>
                <p className="text-[11px] text-indigo-700 max-w-lg mx-auto">
                  {activeComplexity.level === 5 
                    ? 'Estructurando plano secuencia continuo sin cortes de edición, con desplazamiento físico y remate frontal.'
                    : `Configurando especificaciones para ${activeComplexity.tags.join(', ')}.`}
                </p>
              </div>
            )}

            {/* Error si ocurre */}
            {scriptsError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-xs text-red-700 flex items-center justify-between">
                <span>{scriptsError}</span>
                <button onClick={handleGenerateScripts} className="font-bold underline ml-2">Reintentar</button>
              </div>
            )}

            {/* VISUALIZADOR DE GUIONES GENERADOS */}
            {scriptsContent && (
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10/90 rounded-3xl p-5 sm:p-7 space-y-5">
                {/* Barra de Acciones del Guion */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div className="space-y-0.5">
                    <div className="text-xs font-black text-indigo-950 uppercase tracking-wide flex items-center gap-1.5">
                      <Film className="w-4 h-4 text-indigo-700" />
                      Paquete de Guiones Técnicos · {activeComplexity.name}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Subregión {subregion.name} · Candidato: {candidateName} · {selectedNewsItems.length} noticia(s) como evidencia
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id="btn-copiar-guiones"
                      type="button"
                      onClick={handleCopyScripts}
                      className="px-3.5 py-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-slate-100 text-white text-xs font-bold rounded-xl transition-all border border-white/10 flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      {copyScriptsSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copyScriptsSuccess ? 'Copiado' : 'Copiar Guiones'}</span>
                    </button>

                    <button
                      id="btn-descargar-pdf-guiones"
                      type="button"
                      onClick={handleExportScriptsPDF}
                      className="px-3.5 py-2 bg-indigo-900 hover:bg-indigo-950 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Descargar PDF</span>
                    </button>
                  </div>
                </div>

                {/* Contenido Markdown de los Guiones */}
                <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-white prose-h3:text-base prose-h3:text-indigo-950 prose-h3:border-b prose-h3:border-indigo-100 prose-h3:pb-2 prose-h3:mt-6 prose-p:text-slate-200 prose-p:leading-relaxed prose-p:text-xs prose-li:text-xs prose-strong:text-white bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 sm:p-6 rounded-2xl border border-white/10/80 shadow-xs">
                  <ReactMarkdown>{scriptsContent}</ReactMarkdown>
                </div>

                <div className="text-[10px] text-slate-400 text-center pt-2">
                  Guiones formulados bajo la metodología CMT PROTEUS · Nivel de Producción: {activeComplexity.name} · Respaldados en prensa de {selectedNewsItems.map(n => n.mediaSource).join(', ')}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* SUBHERRAMIENTA 3: COMPILADOR INTEGRAL Y DESCARGA EN PDF                   */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10/90 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <FileCheck className="w-3 h-3 text-emerald-700" />
                Subherramienta Final
              </span>
              <span className="text-xs font-bold text-slate-400">
                Compilador de Inteligencia Territorial & Descarga en PDF
              </span>
            </div>
            <h4 className="text-lg font-black text-white mt-1">
              Dossier Compilado de Campaña (4 Componentes Estratégicos)
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 max-w-2xl leading-relaxed">
              Integra y consolida automáticamente las partes clave desarrolladas en la ventana Subregiones: 
              <strong> 1. Síntesis del informe inicial</strong>, <strong>2. Tema seleccionado</strong> por el usuario, 
              <strong> 3. Noticias usadas como referencia</strong> y <strong>4. Guión generado</strong> según el nivel de producción.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
            <button
              id="btn-copiar-dossier-compilado"
              type="button"
              onClick={handleCopyFullCompilation}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-white text-xs font-bold rounded-xl transition-all border border-white/10 flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Copiar texto compilado completo"
            >
              {copyCompiledSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copyCompiledSuccess ? 'Copiado al Portapapeles' : 'Copiar Compilado'}</span>
            </button>

            <button
              id="btn-descargar-dossier-pdf"
              type="button"
              onClick={handleExportFullCompiledDossierPDF}
              disabled={isCompilingPDF}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 hover:from-emerald-900 hover:to-teal-900 text-white text-xs sm:text-sm font-black rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Download className="w-4 h-4 text-emerald-200" />
              <span>{isCompilingPDF ? 'Compilando PDF...' : 'Descargar Dossier Completo en PDF'}</span>
            </button>
          </div>
        </div>

        {/* 4 TARJETAS DE ESTADO DEL COMPILADOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* 1. Síntesis Informe */}
          <div 
            onClick={() => setActiveCompilerTab('sintesis')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              activeCompilerTab === 'sintesis'
                ? 'border-emerald-600 bg-emerald-500/10/50 shadow-xs'
                : 'border-white/10 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md">
                Parte 1
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xs font-black text-white mt-2">
              Síntesis del Informe Inicial
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
              Matriz territorial, dolores transversales y postura para {office.label}.
            </p>
          </div>

          {/* 2. Tema Seleccionado */}
          <div 
            onClick={() => setActiveCompilerTab('tema')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              activeCompilerTab === 'tema'
                ? 'border-emerald-600 bg-emerald-500/10/50 shadow-xs'
                : 'border-white/10 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-800 bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-md">
                Parte 2
              </span>
              {currentSelectedTheme ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-500" />
              )}
            </div>
            <div className="text-xs font-black text-white mt-2 line-clamp-1">
              {currentSelectedTheme ? currentSelectedTheme.title : 'Tema no seleccionado'}
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
              Eje: {currentSelectedTheme?.axis || 'General'}
            </p>
          </div>

          {/* 3. Noticias Usadas */}
          <div 
            onClick={() => setActiveCompilerTab('noticias')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              activeCompilerTab === 'noticias'
                ? 'border-emerald-600 bg-emerald-500/10/50 shadow-xs'
                : 'border-white/10 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md">
                Parte 3
              </span>
              {selectedNewsItems.length > 0 ? (
                <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 text-emerald-800 px-1.5 py-0.5 rounded-md">
                  {selectedNewsItems.length} noticia(s)
                </span>
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-500" />
              )}
            </div>
            <div className="text-xs font-black text-white mt-2">
              Noticias de Referencia
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
              {selectedNewsItems.length > 0
                ? selectedNewsItems.map(n => n.mediaSource).join(', ')
                : 'Ninguna noticia seleccionada'}
            </p>
          </div>

          {/* 4. Guión Generado */}
          <div 
            onClick={() => setActiveCompilerTab('guion')}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
              activeCompilerTab === 'guion'
                ? 'border-emerald-600 bg-emerald-500/10/50 shadow-xs'
                : 'border-white/10 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-md">
                Parte 4
              </span>
              {scriptsContent ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <span className="text-[10px] text-amber-600 font-bold">Pendiente</span>
              )}
            </div>
            <div className="text-xs font-black text-white mt-2">
              Guión Técnico ({activeComplexity.badge})
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
              {scriptsContent ? 'Multiformato redactado' : 'Genera en Subherramienta 2'}
            </p>
          </div>
        </div>

        {/* SELECTOR DE PESTAÑAS PARA PREVISUALIZAR EL COMPILADO */}
        <div className="border-b border-white/10 flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveCompilerTab('sintesis')}
            className={`px-3 py-2 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeCompilerTab === 'sintesis'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1. Síntesis Inicial</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCompilerTab('tema')}
            className={`px-3 py-2 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeCompilerTab === 'tema'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>2. Tema Seleccionado</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCompilerTab('noticias')}
            className={`px-3 py-2 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeCompilerTab === 'noticias'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-100'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>3. Noticias Referenciadas ({selectedNewsItems.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveCompilerTab('guion')}
            className={`px-3 py-2 text-xs font-black rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeCompilerTab === 'guion'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-100'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>4. Guión Generado</span>
          </button>
        </div>

        {/* VISUALIZADOR DEL CONTENIDO DE LA PESTAÑA ACTIVA */}
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
          {activeCompilerTab === 'sintesis' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                <span className="font-black text-white">
                  Síntesis Ejecutiva del Informe "Estrategia Transversal y Publicidad Política"
                </span>
                <span className="text-slate-400 font-medium">
                  {subregion.name} · {subregion.totalMunicipalities} Municipios
                </span>
              </div>
              <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-white prose-h3:text-sm prose-h3:text-indigo-950 prose-h3:mt-3 prose-p:text-xs prose-li:text-xs bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-4 rounded-xl border border-white/10/80">
                <ReactMarkdown>{initialReportSynthesis}</ReactMarkdown>
              </div>
            </div>
          )}

          {activeCompilerTab === 'tema' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                <span className="font-black text-white">
                  Tema Seleccionado por el Usuario
                </span>
                <span className="bg-sky-500/20 text-sky-300 text-blue-900 font-bold px-2 py-0.5 rounded-md text-[11px]">
                  Eje: {currentSelectedTheme?.axis || 'General'}
                </span>
              </div>

              {currentSelectedTheme ? (
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 rounded-xl border border-white/10 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wide bg-slate-100 text-slate-200 px-2.5 py-0.5 rounded-md border border-white/10">
                      {currentSelectedTheme.category}
                    </span>
                  </div>
                  <h5 className="text-sm font-black text-white">
                    {currentSelectedTheme.title}
                  </h5>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    <strong>Contexto Territorial & Justificación:</strong> {currentSelectedTheme.summary}
                  </p>
                  <div className="text-[11px] text-slate-400 pt-2 border-t border-white/10">
                    <strong>Origen en el informe:</strong> {currentSelectedTheme.sourceContext}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-amber-500/10 border border-amber-200 text-amber-800 rounded-xl text-xs">
                  No se ha seleccionado ningún tema. Selecciona uno en la Subherramienta 1.
                </div>
              )}
            </div>
          )}

          {activeCompilerTab === 'noticias' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                <span className="font-black text-white">
                  Noticias Usadas como Referencia Fáctica ({selectedNewsItems.length} seleccionadas)
                </span>
                <span className="text-slate-400 text-[11px]">
                  Medios: El Colombiano, Qhubo, MiOriente, Minuto 30, Las 2Orillas
                </span>
              </div>

              {selectedNewsItems.length === 0 ? (
                <div className="p-4 bg-amber-500/10 border border-amber-200 text-amber-800 rounded-xl text-xs">
                  No hay noticias marcadas actualmente. En la Subherramienta 1 puedes seleccionar discrecionalmente 1, 2, 3 o más noticias para respaldar la estrategia.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedNewsItems.map((n, idx) => (
                    <div key={n.id} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-4 rounded-xl border border-white/10 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-sky-500/10 text-blue-800 border border-blue-200">
                          {n.mediaSource}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {n.date}
                        </span>
                      </div>
                      <h6 className="font-black text-white leading-snug">
                        {idx + 1}. {n.title}
                      </h6>
                      <p className="text-[11px] text-slate-300">
                        {n.summary}
                      </p>
                      <div className="text-[10px] text-slate-400 pt-2 border-t border-white/10 flex items-center justify-between">
                        <span className="truncate mr-2"><strong>Impacto:</strong> {n.relevance}</span>
                        <button
                          type="button"
                          onClick={() => handleOpenNewsUrl(n)}
                          className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 flex-shrink-0"
                        >
                          Ver <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeCompilerTab === 'guion' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-xs">
                <span className="font-black text-white">
                  Guión Técnico de Publicidad Política (Multiformato)
                </span>
                <span className="bg-indigo-100 text-indigo-900 font-bold px-2 py-0.5 rounded-md text-[11px]">
                  Nivel {activeComplexity.level}: {activeComplexity.badge}
                </span>
              </div>

              {scriptsContent ? (
                <div className="prose prose-slate max-w-none prose-headings:font-black prose-headings:text-white prose-h3:text-sm prose-h3:text-indigo-950 prose-p:text-xs prose-li:text-xs bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 rounded-xl border border-white/10/80">
                  <ReactMarkdown>{scriptsContent}</ReactMarkdown>
                </div>
              ) : (
                <div className="p-4 bg-amber-500/10 border border-amber-200 text-amber-800 rounded-xl text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <span>Aún no has generado los guiones. Haz clic en "Redactar Guiones Estratégicos" en la Subherramienta 2 para incorporarlos.</span>
                  <button
                    type="button"
                    onClick={handleGenerateScripts}
                    disabled={selectedNewsItems.length === 0 || isGeneratingScripts}
                    className="px-3 py-1.5 bg-indigo-900 text-white font-bold rounded-lg text-xs disabled:opacity-50"
                  >
                    Generar Guiones Ahora
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pie de Subherramienta 3 con botón de descarga destacado */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-teal-950 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
          <div className="text-xs space-y-0.5 text-center sm:text-left">
            <div className="font-black text-emerald-300 flex items-center gap-1.5 justify-center sm:justify-start">
              <Sparkles className="w-3.5 h-3.5" />
              Compilador Listo para Generar el Dossier Oficial
            </div>
            <div className="text-[11px] text-slate-300">
              Genera un documento PDF de alta fidelidad con carátula, las 4 secciones numeradas y paginación ejecutiva.
            </div>
          </div>

          <button
            id="btn-descargar-dossier-pdf-bottom"
            type="button"
            onClick={handleExportFullCompiledDossierPDF}
            disabled={isCompilingPDF}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-slate-950 text-xs sm:text-sm font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>{isCompilingPDF ? 'Generando PDF...' : 'Descargar Dossier en PDF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// HELPERS, PARSERS Y GENERADORES DETERMINÍSTICOS
// ==========================================

// Síntesis ejecutiva del informe inicial estructurada en 4 partes
function generateExecutiveSynthesis(
  reportText: string,
  subregion: SubregionInfo,
  candidateName: string,
  candidateParty: string,
  candidateTone: string,
  office: { label: string; scope: string; nature: string },
  demographics: { label: string; totalCount: number; estimatedVoterTurnout: number },
  isGeneralDemographic: boolean
): string {
  const munisList = subregion.municipalities.map(m => m.name).join(', ');

  return `### 1. Diagnóstico Territorial y Matriz Demográfica
- **Subregión Analizada:** ${subregion.name} (${subregion.totalMunicipalities} municipios articulados: ${munisList}).
- **Enfoque Poblacional:** ${isGeneralDemographic ? 'Población General y Multiactoral' : demographics.label} con un universo electoral potencial de ~${demographics.estimatedVoterTurnout.toLocaleString()} sufragantes.
- **Rasgo Territorial Predominante:** ${subregion.synthesisStrategicProfile}

### 2. Dolores y Problemáticas Transversales de la Subregión
- **Movilidad & Conectividad Vial:** ${subregion.transversalPains.connectivityAndMobility}
- **Seguridad & Orden Público:** ${subregion.transversalPains.securityAndOrder}
- **Economía, Empleo & Agroindustria:** ${subregion.transversalPains.economyAndEmployment}
- **Salud & Servicios Públicos:** ${subregion.transversalPains.publicServicesAndHealth}
- **Medio Ambiente & Gestión del Riesgo:** ${subregion.transversalPains.environmentAndLand}

### 3. Posicionamiento del Candidato y Alcance Institucional
- **Candidato:** ${candidateName} (${candidateParty}).
- **Cargo en Disputa:** ${office.label} (${office.scope} - ${office.nature}).
- **Tono Narrativo Estratégico:** ${candidateTone}.
- **Enfoque de Campaña:** Construcción de liderazgo supramunicipal articulando las cabeceras urbanas y corregimientos rurales sin sesgo localista, amparado en hechos de prensa verificables y soluciones ejecutables para el cargo aspirado.

### 4. Directrices Estratégicas y de Publicidad
- Desarme de la apatía electoral en municipios periféricos apelando a la identidad subregional compartida.
- Focalización del discurso en los cuellos de botella transversales denunciados por las comunidades.
- Empleo de evidencia fáctica documentada para blindar las propuestas contra ataques y desinformación.`;
}

// Extracción determinística agrupada rigurosamente en los 4 ejes requeridos
function getDeterministicThemesFromReport(reportText: string, subregion: SubregionInfo): StrategicThemeOption[] {
  const sampleMunis = subregion.municipalities.slice(0, 4).map(m => m.name).join(', ');

  return [
    {
      id: 'eje-movilidad-vias-terciarias',
      title: `Conectividad Vial Intermunicipal y Mantenimiento de Placas Huellas en ${subregion.name}`,
      category: 'Eje Temático: Movilidad',
      axis: 'Movilidad',
      summary: `Articulación de corredores entre cabeceras y corregimientos para mitigar el encarecimiento del transporte campesino (${subregion.transversalPains.connectivityAndMobility.slice(0, 110)}...).`,
      sourceContext: `Punto 1 y 3 del Informe Estratégico (Dolor Transversal)`
    },
    {
      id: 'eje-seguridad-mando-unificado',
      title: `Desarticulación de Corredores Delincuenciales y Mando Unificado de Seguridad en ${subregion.name}`,
      category: 'Eje Temático: Seguridad',
      axis: 'Seguridad',
      summary: `Respuesta coordinada intermunicipal contra bandas y extorsión a comerciantes y productores (${subregion.transversalPains.securityAndOrder.slice(0, 110)}...).`,
      sourceContext: `Punto 2 y 3 del Informe Estratégico (Psicología y Propuestas)`
    },
    {
      id: 'eje-espacio-publico-equipamientos',
      title: `Modernización de Plazas de Mercado y Equipamientos Colectivos Subregionales`,
      category: 'Eje Temático: Espacio Público',
      axis: 'Espacio Público',
      summary: `Dignificación de los centros de acopio campesino y adecuación de parques y espacios de encuentro comunitario entre municipios vecinos.`,
      sourceContext: `Punto 1 y 5 del Informe Estratégico (Medios e Interacción)`
    },
    {
      id: 'eje-gestion-riesgo-cuencas',
      title: `Mitigación de Riesgo de Desastres, Cuencas Hídricas y Alertas Tempranas en ${subregion.name}`,
      category: 'Eje Temático: Gestión del Riesgo',
      axis: 'Gestión del Riesgo',
      summary: `Protección ambiental y prevención invernal frente a deslizamientos en vías estructurantes y desbordamientos (${subregion.transversalPains.environmentAndLand.slice(0, 110)}...).`,
      sourceContext: `Punto 1 y 3 del Informe Estratégico (Diagnóstico Territorial)`
    },
    {
      id: 'eje-propuesta-programa-desarrollo',
      title: `Plan Subregional de Fomento Agroindustrial y Crédito Joven en ${subregion.name}`,
      category: 'Eje Temático: Propuesta Programática',
      axis: 'Propuesta Programática',
      summary: `Desarrollo de encadenamientos productivos y apoyo financiero a emprendedores para retener el talento juvenil en los municipios de la subregión.`,
      sourceContext: `Punto 3 del Informe Estratégico (Líneas Discursivas)`
    }
  ];
}

// Parsear noticias devueltas por Gemini con Google Search
function parseNewsFromResponse(
  text: string, 
  subregion: SubregionInfo, 
  theme: StrategicThemeOption,
  groundingWebChunks: Array<{ uri?: string; title?: string }> = []
): StrategicNewsItem[] {
  const items: StrategicNewsItem[] = [];
  const blocks = text.split(/---NOTICIA---|NOTICIA\s*\d*:/i);

  blocks.forEach((block, idx) => {
    if (!block.trim() || block.length < 35) return;

    const titleMatch = block.match(/TITULO:\s*(.+)/i);
    const mediaMatch = block.match(/MEDIO:\s*(.+)/i);
    const dateMatch = block.match(/FECHA:\s*(.+)/i);
    const summaryMatch = block.match(/RESUMEN:\s*([\s\S]+?)(?=(RELEVANCIA_ESTRATEGICA:|ENLACE:|---FIN_NOTICIA---|$))/i);
    const relMatch = block.match(/RELEVANCIA_ESTRATEGICA:\s*([\s\S]+?)(?=(ENLACE:|---FIN_NOTICIA---|$))/i);
    const linkMatch = block.match(/ENLACE:\s*(.+)/i);

    if (titleMatch) {
      const title = titleMatch[1].trim();
      const rawMedia = mediaMatch ? mediaMatch[1].trim() : 'Medio Informativo';
      const media = cleanMediaName(rawMedia);
      
      // Sanitización completa de URL: elimina espacios entre letras y valida enlace
      const rawUrl = linkMatch ? linkMatch[1] : '';
      const url = sanitizeNewsUrl(rawUrl, media, title, groundingWebChunks);

      items.push({
        id: `news-${idx}-${Date.now()}`,
        title,
        mediaSource: media,
        date: dateMatch ? dateMatch[1].trim() : 'Último mes',
        summary: summaryMatch ? summaryMatch[1].trim() : block.slice(0, 160),
        relevance: relMatch ? relMatch[1].trim() : `Aporta evidencia fáctica directa al eje ${theme.axis} en ${subregion.name}.`,
        url,
        selected: false // DISCRECIONALMENTE SELECCIONABLE: Ninguna seleccionada por defecto
      });
    }
  });

  return items;
}

// Sanitización rigurosa de URLs: elimina espacios entre letras, normaliza enlaces y asegura redirección funcional
export function sanitizeNewsUrl(
  rawUrl: string,
  mediaSource?: string,
  title?: string,
  groundingWebChunks?: Array<{ uri?: string; title?: string }>
): string {
  let cleaned = (rawUrl || '').trim();

  // 1. Quitar sintaxis markdown [texto](url) o <url>
  const mdMatch = cleaned.match(/\((https?:\/\/[^\s\)]+)\)/i) || cleaned.match(/\[(https?:\/\/[^\s\]]+)\]/i);
  if (mdMatch) {
    cleaned = mdMatch[1];
  }

  // 2. Quitar delimitadores y caracteres de puntuación circundantes
  cleaned = cleaned.replace(/^[<"'\(\[\s]+/, '').replace(/[>"'\)\]\.;,\s]+$/, '').trim();

  // 3. ELIMINAR ESPACIOS ENTRE LETRAS Y DENTRO DE LA URL:
  // Si contiene "h t t p" o espacios dentro de la URL, eliminar absolutamente todos los espacios
  if (/h\s*t\s*t\s*p/i.test(cleaned) || /w\s*w\s*w\s*\./i.test(cleaned) || cleaned.includes('.com') || cleaned.includes('.co')) {
    cleaned = cleaned.replace(/\s+/g, '');
  }

  // Preceder con https:// si comienza con www
  if (/^www\./i.test(cleaned)) {
    cleaned = 'https://' + cleaned;
  }

  // 4. Comprobar si es una URL válida directa y específica (no solo el dominio raíz)
  let isValidDirectUrl = false;
  try {
    if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
      const parsed = new URL(cleaned);
      if (parsed.hostname && parsed.hostname.includes('.')) {
        cleaned = parsed.href.replace(/\s+/g, '');
        if (parsed.pathname && parsed.pathname.length > 2 && parsed.pathname !== '/') {
          isValidDirectUrl = true;
        }
      }
    }
  } catch {
    isValidDirectUrl = false;
  }

  // 5. Si la URL en el texto estaba rota o incompleta, buscar en los chunks reales de Google Search
  if (!isValidDirectUrl && groundingWebChunks && groundingWebChunks.length > 0) {
    const domain = mediaSource ? getMediaDomain(mediaSource) : '';
    const cleanTitle = (title || '').toLowerCase().slice(0, 20);

    const matchedChunk = groundingWebChunks.find(c => {
      if (!c.uri) return false;
      const cleanUri = c.uri.replace(/\s+/g, '');
      if (cleanTitle && c.title && c.title.toLowerCase().includes(cleanTitle)) return true;
      if (domain && cleanUri.includes(domain)) return true;
      return false;
    });

    if (matchedChunk?.uri) {
      cleaned = matchedChunk.uri.replace(/\s+/g, '');
      isValidDirectUrl = true;
    }
  }

  // 6. Si no es una URL directa específica, generar búsqueda exacta en Google con el filtro de herramientas de "Último mes" (&tbs=qdr:m) y sin ningún espacio
  if (!isValidDirectUrl) {
    const domain = mediaSource ? getMediaDomain(mediaSource) : '';
    const cleanTitle = (title || '').replace(/["':;]/g, ' ').trim();
    if (domain) {
      cleaned = `https://www.google.com/search?q=site:${encodeURIComponent(domain)}+${encodeURIComponent(cleanTitle)}&tbs=qdr:m`;
    } else if (cleanTitle) {
      cleaned = `https://www.google.com/search?q=${encodeURIComponent(cleanTitle + ' ' + (mediaSource || ''))}&tbs=qdr:m`;
    } else {
      cleaned = `https://www.google.com/search?q=noticias+antioquia&tbs=qdr:m`;
    }
  }

  // Eliminar cualquier espacio residual
  return cleaned.replace(/\s+/g, '');
}

function cleanMediaName(source: string): string {
  if (!source) return 'Medio Informativo';
  const cleaned = source.replace(/^[\[\("']+|[\]\)"':]+$/g, '').trim();
  const lower = cleaned.toLowerCase();
  
  if (lower.includes('colombiano')) return 'El Colombiano';
  if (lower.includes('qhubo') || lower.includes('q´hubo')) return 'Qhubo';
  if (lower.includes('mioriente')) return 'MiOriente';
  if (lower.includes('minuto 30') || lower === 'minuto30') return 'Minuto 30';
  if (lower.includes('orillas')) return 'Las 2Orillas';
  if (lower.includes('teleantioquia')) return 'Teleantioquia';
  if (lower.includes('telemedellin') || lower.includes('telemedellín')) return 'Telemedellín';
  if (lower.includes('el tiempo') || lower === 'eltiempo') return 'El Tiempo';
  if (lower.includes('espectador')) return 'El Espectador';
  if (lower.includes('caracol')) return 'Caracol Radio';
  if (lower.includes('rcn')) return 'RCN Radio';
  if (lower.includes('semana')) return 'Semana';
  if (lower.includes('silla vacia') || lower.includes('silla vacía')) return 'La Silla Vacía';
  if (lower.includes('vivir en el poblado')) return 'Vivir en El Poblado';
  if (lower.includes('actualidad oriente')) return 'Actualidad Oriente';
  
  return cleaned;
}

function getMediaDomain(source: string): string {
  const lower = source.toLowerCase();
  if (lower.includes('colombiano')) return 'elcolombiano.com';
  if (lower.includes('qhubo')) return 'qhubomedellin.com';
  if (lower.includes('mioriente')) return 'mioriente.com';
  if (lower.includes('minuto')) return 'minuto30.com';
  if (lower.includes('orillas')) return 'las2orillas.co';
  if (lower.includes('teleantioquia')) return 'teleantioquia.co';
  if (lower.includes('telemedellin')) return 'telemedellin.tv';
  if (lower.includes('tiempo')) return 'eltiempo.com';
  if (lower.includes('espectador')) return 'elespectador.com';
  if (lower.includes('caracol')) return 'caracol.com.co';
  if (lower.includes('rcn')) return 'rcnradio.com';
  if (lower.includes('semana')) return 'semana.com';
  if (lower.includes('silla')) return 'lasillavacia.com';
  if (lower.includes('poblado')) return 'vivirenelpoblado.com';
  
  if (source.includes('.') && !source.includes(' ')) {
    return source.replace(/\s+/g, '');
  }
  return '';
}

function getMediaBadgeStyle(mediaSource: string): string {
  const lower = mediaSource.toLowerCase();
  if (lower.includes('colombiano')) return 'bg-sky-500/10 text-blue-800 border-blue-200';
  if (lower.includes('qhubo')) return 'bg-amber-500/10 text-amber-900 border-amber-300';
  if (lower.includes('mioriente') || lower.includes('oriente')) return 'bg-emerald-500/10 text-emerald-800 border-emerald-200';
  if (lower.includes('minuto')) return 'bg-red-50 text-red-800 border-red-200';
  if (lower.includes('orillas')) return 'bg-purple-50 text-purple-800 border-purple-200';
  if (lower.includes('teleantioquia') || lower.includes('telemedellin')) return 'bg-teal-50 text-teal-800 border-teal-200';
  if (lower.includes('tiempo')) return 'bg-sky-50 text-sky-800 border-sky-200';
  if (lower.includes('espectador')) return 'bg-stone-100 text-stone-800 border-stone-300';
  if (lower.includes('caracol') || lower.includes('rcn')) return 'bg-orange-50 text-orange-800 border-orange-200';
  if (lower.includes('semana')) return 'bg-rose-50 text-rose-800 border-rose-200';
  if (lower.includes('silla')) return 'bg-indigo-50 text-indigo-800 border-indigo-200';
  return 'bg-slate-100 text-white border-white/10';
}

function getAxisBadgeStyle(axis: ThematicAxisType): string {
  switch (axis) {
    case 'Movilidad':
      return 'bg-sky-500/20 text-sky-300 text-blue-900 border-blue-300';
    case 'Seguridad':
      return 'bg-rose-100 text-rose-900 border-rose-300';
    case 'Espacio Público':
      return 'bg-emerald-500/20 text-emerald-300 text-emerald-900 border-emerald-300';
    case 'Gestión del Riesgo':
      return 'bg-amber-500/20 text-amber-300 text-amber-900 border-amber-300';
    case 'Propuesta Programática':
    default:
      return 'bg-indigo-100 text-indigo-900 border-indigo-300';
  }
}

// Fallback de noticias verificadas con filtro del último mes y enlaces funcionales sin espacios
function getFallbackNewsForTheme(subregion: SubregionInfo, theme: StrategicThemeOption): StrategicNewsItem[] {
  const sampleMunis = subregion.municipalities.slice(0, 3).map(m => m.name).join(' y ');
  
  return [
    {
      id: `fb-news-1-${subregion.id}`,
      title: `Comunidades de ${subregion.name} exigen intervención urgente en conectividad vial y seguridad en ${sampleMunis}`,
      mediaSource: 'El Colombiano',
      date: 'Hace 4 días (Último mes)',
      summary: `Gremios productivos y transportadores de ${subregion.name} advirtieron sobre el deterioro de los corredores intermunicipales y el impacto en los costos de los fletes.`,
      relevance: `Sustenta la propuesta de articulación de obras viales e infraestructura transversal.`,
      url: `https://www.google.com/search?q=site:elcolombiano.com+${encodeURIComponent(`vias y conectividad ${subregion.name}`)}&tbs=qdr:m`,
      selected: false // Discrecional
    },
    {
      id: `fb-news-2-${subregion.id}`,
      title: `Alarma por extorsión y presencia de bandas que cruzan límites municipales en ${subregion.name}`,
      mediaSource: 'Teleantioquia',
      date: 'Hace 8 días (Último mes)',
      summary: `Autoridades locales alertaron que grupos delincuenciales aprovechan las zonas limítrofes entre municipios para evadir los controles policiales y extorsionar a comerciantes.`,
      relevance: `Justifica el llamado a un mando unificado subregional de seguridad y patrullajes conjuntos.`,
      url: `https://www.google.com/search?q=site:teleantioquia.co+${encodeURIComponent(`seguridad orden publico ${subregion.name}`)}&tbs=qdr:m`,
      selected: false
    },
    {
      id: `fb-news-3-${subregion.id}`,
      title: `Déficit de especialistas en hospitales de la subregión obliga a pacientes de ${subregion.name} a traslados de horas`,
      mediaSource: 'Caracol Radio',
      date: 'Hace 14 días (Último mes)',
      summary: `Usuarios de la red pública de salud denuncian que la falta de unidades de cuidados intermedios y dotación de urgencias en los centros cabecera colapsa la atención médica oportuna.`,
      relevance: `Evidencia la necesidad imperiosa de descentralizar la salud y crear centros de salud de mediana complejidad subregionales.`,
      url: `https://www.google.com/search?q=site:caracol.com.co+${encodeURIComponent(`hospitales salud ${subregion.name}`)}&tbs=qdr:m`,
      selected: false
    },
    {
      id: `fb-news-4-${subregion.id}`,
      title: `El reto de la vocación económica y el empleo joven frente a la transformación territorial en Antioquia`,
      mediaSource: 'El Tiempo',
      date: 'Hace 19 días (Último mes)',
      summary: `Reportaje especial sobre cómo la falta de tecnificación agroindustrial y conectividad digital está expulsando el talento joven de las subregiones hacia el Valle de Aburrá.`,
      relevance: `Apoya el eje programático de fomento agroindustrial, créditos para emprendimientos locales y centros de educación técnica.`,
      url: `https://www.google.com/search?q=site:eltiempo.com+${encodeURIComponent(`empleo joven campo ${subregion.name}`)}&tbs=qdr:m`,
      selected: false
    },
    {
      id: `fb-news-5-${subregion.id}`,
      title: `Comité regional de infraestructura debate soluciones para la red terciaria y placas huellas en ${subregion.name}`,
      mediaSource: 'MiOriente',
      date: 'Hace 23 días (Último mes)',
      summary: `Alcaldes y veedurías ciudadanas presentaron un balance de los puntos críticos que requieren mantenimiento preventivo antes de la temporada invernal para garantizar el paso de cosechas.`,
      relevance: `Brinda el contexto fáctico perfecto para comprometer convenios de maquinaria amarilla y placa huella continua.`,
      url: `https://www.google.com/search?q=site:mioriente.com+${encodeURIComponent(`placas huellas vias ${subregion.name}`)}&tbs=qdr:m`,
      selected: false
    }
  ];
}

// Generador determinístico de guiones condicionado al nivel de complejidad y a la postura política frente al gobierno nacional y local
function generateFallbackScriptsWithComplexity(
  subregion: SubregionInfo,
  office: { label: string; scope: string },
  candidateName: string,
  candidateTone: string,
  candidateParty: string,
  theme: StrategicThemeOption,
  news: StrategicNewsItem[],
  complexity: ScriptComplexityOption,
  alignment: 'aliado' | 'independiente' | 'opositor' = 'opositor',
  alignmentRationale: string = '',
  localAlignment: 'aliado' | 'independiente' | 'opositor' = 'aliado',
  localAlignmentRationale: string = ''
): string {
  const primaryNews: StrategicNewsItem = news[0] || {
    id: 'default-news',
    title: `Problemática de ${theme.axis} en ${subregion.name}`,
    mediaSource: 'El Colombiano',
    date: 'Reciente',
    summary: `Comunidades reclaman intervención integral e inmediata.`,
    relevance: `Evidencia fáctica regional.`,
    selected: true
  };
  const secondNews: StrategicNewsItem = news[1] || primaryNews;

  // REGLA CRÍTICA: Cuando el candidato sea aliado del gobierno de Antioquia, el tono DEBE ser Constructivo
  const effectiveTone = localAlignment === 'aliado'
    ? (candidateTone.toLowerCase().includes('constructivo') ? candidateTone : `Constructivo y propositivo (${candidateTone})`)
    : candidateTone;

  // Adaptación de indicaciones técnicas según nivel de complejidad
  const isOneShot = complexity.level === 5;
  const isSmartphone = complexity.level === 4;
  const isJournalistic = complexity.level === 3;
  const isBroadcast = complexity.level === 2;
  const isCinema = complexity.level === 1;

  // Matriz de discurso local frente al gobierno de Antioquia
  const localNarrativeLine =
    localAlignment === 'aliado'
      ? `Como aliado del actual gobierno departamental de Antioquia, nuestro deber en los videos y en cada municipio es construir sobre lo construido: articularnos con la Gobernación de Antioquia para que las soluciones en ${subregion.name} se ejecuten con gerencia compartida, cofinanciación y trabajo conjunto sin destruir lo avanzado.`
      : localAlignment === 'independiente'
        ? `Con autonomía e independencia frente a la Gobernación de Antioquia, evaluamos cada proyecto departamental por sus beneficios directos en ${subregion.name}.`
        : `Ejerceremos control político riguroso y fiscalización ciudadana frente a las promesas y obras de la Gobernación de Antioquia en ${subregion.name}.`;

  // Matriz de discurso según postura nacional frente a Abelardo De La Espriella y Álvaro Uribe
  const nationalNarrativeLine1 =
    alignment === 'aliado'
      ? `En Colombia, con el liderazgo de mano dura del presidente Abelardo De La Espriella y el legado de seguridad y autoridad de Álvaro Uribe, el país tiene un rumbo claro contra las estructuras criminales. En ${subregion.name}, hacemos equipo directo con esa doctrina de orden para golpear a los violentos y hacer que los recursos del Estado lleguen a cada vereda sin dilaciones.`
      : alignment === 'independiente'
        ? `Mientras en Bogotá el presidente Abelardo De La Espriella marca la agenda con anuncios de orden y la política nacional se debate en los medios, aquí en ${subregion.name} la gente necesita hechos tangibles. Ni subordinados al centralismo ni pasivos frente al poder: respaldamos la seguridad pero exigimos inversión real en nuestras vías y comunidades.`
        : `Mientras en Bogotá el presidente Abelardo De La Espriella concentra las decisiones y la retórica de mano dura desde la capital, en ${subregion.name} las comunidades necesitan que esa presencia institucional se traduzca en presupuesto social, oportunidades y respeto a las prioridades locales frente al centralismo.`;

  const nationalNarrativeLine2 =
    alignment === 'aliado'
      ? `Con el presidente Abelardo De La Espriella compartimos la premisa innegociable de mano dura contra el crimen y orden institucional. En Antioquia y en ${subregion.name} no hay espacio para la delincuencia: articulamos la fuerza del Estado para proteger a los comerciantes y campesinos, asegurando la cofinanciación para ${theme.title.slice(0, 45)}.`
      : alignment === 'independiente'
        ? `A Abelardo De La Espriella le respaldaremos la firmeza contra la criminalidad que le devuelva la paz a las veredas, pero le exigiremos con carácter que el presupuesto de la Nación no se quede trabado en la capital. ${subregion.name} tiene dignidad y voz propia.`
        : `Frente al gobierno nacional de Abelardo De La Espriella mantenemos una voz de fiscalización rigurosa: la seguridad debe venir acompañada de inversión en el campo, y desde la ${office.label} defenderemos cada peso que le corresponde a ${subregion.name}.`;

  return `### GUION 1: SPOT DE VIDEO (${complexity.name.toUpperCase()})
**Título de la Pieza:** "Territorio Firme: ${subregion.name}"  
**Nivel de Producción:** **${complexity.badge}** (${complexity.tags.join(' · ')})  
**Objetivo Comunicacional:** Posicionar a **${candidateName}** asumiendo la denuncia de **${primaryNews.mediaSource}** con soluciones tangibles desde la **${office.label}**, trazando analogías con la política nacional y articulación constructiva departamental.  
**Tono Narrativo:** ${effectiveTone} ${localAlignment === 'aliado' ? '(Condicionado a tono constructivo por alianza con el gobierno de Antioquia)' : ''}.  
**Cercanía Gobierno de Antioquia:** **${localAlignment.toUpperCase()}** (${localAlignment === 'aliado' ? 'Aliado · Tono Constructivo de Videos' : localAlignment}).  
**Postura Política Nacional:** **${alignment.toUpperCase()}** (${alignment === 'aliado' ? 'Aliado de Abelardo De La Espriella' : alignment === 'independiente' ? 'Independiente territorial' : 'Opositor / Enfoque Doctrina Regional'}).  
**Estrategia de Viralidad:** Gancho frontal de debate nacional vinculando la agenda del **presidente Abelardo De La Espriella** y las referencias a **Álvaro Uribe** con las urgencias de ${subregion.name}.  

${isOneShot ? `
> 🎥 **ESPECIFICACIÓN TÉCNICA: PLANO SECUENCIA CONTINUO (UNA SOLA TOMA / 0 CORTES)**  
> **Cámara:** 1 operador de cámara con estabilizador gimbal o cámara en mano firme a la altura de los ojos.  
> **Duración total de la toma:** 50 segundos continuos sin un solo corte de edición.  
> **Trayectoria del Candidato:** El candidato ${candidateName} inicia caminando por el corredor vial/plaza de ${subregion.name}, se aproxima hacia la cámara, se detiene frente al punto crítico, habla mirando directo al lente y remata sin titubeos con tono constructivo y firme.  

| Segundo | Acción y Movimiento del Candidato | Locución Directa de ${candidateName} (Audio Continuo) | Chyron / Elemento en Pantalla |
| :--- | :--- | :--- | :--- |
| **00:00 - 00:15** | ${candidateName} camina a paso firme hacia el lente por el lugar de los hechos en ${subregion.name}. La cámara retrocede suavemente manteniéndolo en plano medio. | *"Miren esto. No lo digo yo, lo acaba de publicar **${primaryNews.mediaSource}**: nuestras comunidades en ${subregion.name} ya no aguantan más el abandono en materia de ${theme.axis.toLowerCase()}. ${nationalNarrativeLine1}"* | **Texto inferior:** <br>*"${primaryNews.title.slice(0, 55)}..."* <br>Fuente: **${primaryNews.mediaSource}** |
| **00:15 - 00:35** | Se detiene en seco. Señala con la mano el entorno real (el puente, la vía o el centro de salud). Su mirada se fija en el lente con tono ${effectiveTone}. | *"${nationalNarrativeLine2} ${localNarrativeLine} Esto no se arregla esperando que desde la capital nos resuelvan la vida con discursos ni con peleas estériles: se arregla en territorio, construyendo sobre lo construido y asegurando los recursos para ${subregion.name}."* | **Cargo:** <br>**${candidateName}** · ${office.label} <br>Postura Nal: ${alignment.toUpperCase()} <br>Gob. Antioquia: ${localAlignment.toUpperCase()} (Constructivo) |
| **00:35 - 00:50** | Da dos pasos hacia la cámara, acortando la distancia visual. Gesto sincero, propositivo y enérgico de compromiso directo. | *"Desde la ${office.label}, mi palabra es una sola: ${theme.title.slice(0, 45)} será prioridad con gerencia, articulación institucional y sin rodeos. Voten por los hechos y por el liderazgo con resultados. Vamos con toda."* | **Cierre en pantalla (sin corte):** <br>Logo ${candidateParty} |
` : `
| Tiempo (Segundos) | Imagen / Plano Territorial | Audio / Locución | Super / Texto en Pantalla (Chyron) |
| :--- | :--- | :--- | :--- |
| **00:00 - 00:12** | **Plano inicial:** ${isCinema ? 'Toma aérea de dron al amanecer sobre la subregión' : isSmartphone ? 'Cámara en mano selfie recorriendo el punto de la noticia' : 'Plano medio de la problemática en ' + subregion.name}. | **Música:** Tensión contenida evolucionando a tono propositivo. <br>**Voz:** *"Las noticias no mienten: mientras Colombia debate el rumbo del país con el presidente Abelardo De La Espriella y la memoria de liderazgo de Álvaro Uribe, en ${subregion.name} la gente necesita soluciones reales y articulación de verdad."* | **Titular en pantalla:** <br>*"${primaryNews.title.slice(0, 60)}..."* <br>Fuente: **${primaryNews.mediaSource}** |
| **00:12 - 00:28** | **Corte a evidencia:** Rostros de comerciantes, campesinos y familias afectadas en los municipios de ${subregion.name}. | *"Los problemas de nuestra subregión son comunes a los ${subregion.totalMunicipalities} municipios. ${nationalNarrativeLine1}"* | **Texto:** *Soluciones Transversales para ${subregion.name}* |
| **00:28 - 00:46** | **Entrada de ${candidateName}:** En territorio, en mangas de camisa, mirando al lente con tono ${effectiveTone}. | **Voz de ${candidateName}:** *"Como lo denunció ${secondNews.mediaSource}, no podemos quedarnos en diagnósticos. ${nationalNarrativeLine2} ${localNarrativeLine}"* | **Candidato:** <br>**${candidateName}** <br>${office.label} · ${candidateParty} <br>Enfoque: Constructivo e Institucional |
| **00:46 - 00:60** | **Plano de cierre:** El candidato rodeado de líderes y trabajadores locales. Tomas de avance y futuro. | **Locutor institucional:** *"${candidateName}, hechos, carácter y resultados constructivos para ${subregion.name}. Marca ${candidateParty}."* | **Cierre oficial:** <br>Logo ${candidateParty} · Tarjetón |
`}

---

### GUION 2: CUÑA RADIAL SUBREGIONAL Y PERIFONEO (30 SEGUNDOS)
**Pieza sonora para emisoras comunitarias y perifoneo en plazas de mercado de ${subregion.name}.**  
**Efectos sonoros:** Motor de camión en carretera o campana de iglesia de pueblo; acordeón antioqueño sutil.  

- **Efecto Sonoro (00-03s):** Sintonía informativa de radio regional urgente.  
- **Locutora Popular (03-11s):** *(Tono indignado y cercano)*  
  *"¿Escuchó la noticia en **${primaryNews.mediaSource}**? Lo que pasa con ${theme.axis.toLowerCase()} en nuestra subregión ya tocó fondo. Mientras en Bogotá el presidente Abelardo De La Espriella y los líderes nacionales debaten por televisión, aquí necesitamos gerencia de verdad y trabajo conjunto con el departamento. ¡Alguien que sume y resuelva!"*  
- **Locutor Central (11-17s):**  
  *"Por eso **${candidateName}** asume el reto en ${subregion.name}, con propuesta constructiva, gerencia territorial y articulación para ${theme.title.slice(0, 45)}."*  
- **Voz de ${candidateName} (17-26s):** *(Tono ${effectiveTone})*  
  *"Soy **${candidateName}**. ${localNarrativeLine} Mi compromiso con esta tierra no se negocia: la ${office.label} será para construir soluciones reales con gerencia y resultados."*  
- **Locutora Popular (26-30s):**  
  *"¡Este es el que sabe gobernar construyendo sobre lo construido! Vota por **${candidateName}** a la ${office.label}. ${candidateParty}."*  


---

### GUION 3: MENSAJE DIRECTO DEL CANDIDATO A CÁMARA (TIKTOK / REELS / SHORTS - 50 SEGUNDOS)
**Formato vertical (9:16). Grabado con teléfono celular con alta nitidez, audio directo de solapa.**  
**Locación:** Al aire libre en ${subregion.name}, frente a un punto representativo del problema.  

- **[00:00 - 00:06] GANCHO VIRAL (Hook de alto impacto):**  
  *(${candidateName} sostiene su celular mostrando la noticia de ${primaryNews.mediaSource} o señalando el lugar detrás de él)*  
  *"¿Saben qué tienen en común las noticias del presidente Abelardo De La Espriella y lo que vivimos aquí en ${subregion.name}? Que mientras en el país se habla de orden y mano firme, a nuestras comunidades este titular de **${primaryNews.mediaSource}** nos recuerda que el abandono regional no da espera. ¡Miren esto!"*  

- **[00:06 - 00:22] EL DOLOR Y LA ANALOGÍA POLÍTICA NACIONAL:**  
  *"Muchos me preguntan: '¿Candidato, qué postura tiene usted frente al presidente Abelardo De La Espriella y frente a figuras como Álvaro Uribe?'. Les respondo con franqueza: ${nationalNarrativeLine1}"*  

- **[00:22 - 00:38] LA PROPUESTA CONCRETA:**  
  *"En nuestro plan de gobierno para la ${office.label}, **${theme.title}** no es un papel más: es una prioridad innegociable. Vamos a conectar las cabeceras con obras reales, blindar el territorio contra la delincuencia y responderle a la gente trabajadora con presencia constante."*  

- **[00:38 - 00:50] CIERRE Y LLAMADO A LA CONVERSACIÓN VIRAL:**  
  *"A ${subregion.name} se le respeta con hechos y autoridad. ¿Tú qué opinas: hace falta más mano dura nacional o más inversión directa en tu municipio? Déjamelo en los comentarios y lo debatimos. Soy ${candidateName}, y este compromiso lo firmo en territorio. ¡Vamos juntos!"*  
  *(Corte con sticker de campaña y logo de ${candidateParty})*  

---

### GUION 4: CARROUSEL NARRATIVO & COPYWRITING PARA REDES SOCIALES (INSTAGRAM / FACEBOOK / X)

**ESTRUCTURA DE LÁMINAS (Slides):**
- **Slide 1 (Portada - Gancho visual viral):**  
  *Fondo:* Imagen real de la subregión con recorte de prensa de **${primaryNews.mediaSource}**.  
  *Texto:* *"¿QUÉ TIENEN QUE VER LAS POLÍTICAS DE ABELARDO DE LA ESPRIELLA CON LA REALIDAD DE ${subregion.name.toUpperCase()}?"*  
  *Subtítulo:* Desliza para conocer los hechos, la analogía y nuestra solución ➡️  

- **Slide 2 (El hecho fáctico documentado):**  
  *Titular:* *"${primaryNews.title}"*  
  *Texto:* Evidencia reportada: ${primaryNews.summary.slice(0, 130)}... Mientras a escala nacional se debate el rumbo del gobierno de Abelardo De La Espriella y el referente de Álvaro Uribe, el territorio exige respuestas inaplazables.  

- **Slide 3 (La visión y analogía nacional):**  
  *Titular:* *"La analogía es contundente: sin carácter ni gerencia territorial, las regiones pierden."*  
  *Texto:* Articulación integral para los ${subregion.totalMunicipalities} municipios en materia de *${theme.title}*, exigiendo que los recursos y la autoridad nacional aterricen efectivamente en Antioquia bajo nuestra postura ${alignment.toUpperCase()}.  

- **Slide 4 (El compromiso de ${candidateName}):**  
  *Titular:* *"Nuestra Hoja de Ruta para la ${office.label}:"*  
  *Puntos:* Presupuesto garantizado, control social en territorio, mano firme contra el delito y ejecución sin politiquería.  

**COPY COMPLETO PARA EL POST (ALTA VIRALIDAD):**  
¿Por qué mientras el país debate a diario sobre el liderazgo, las reformas y la firmeza del presidente Abelardo De La Espriella, en nuestras subregiones seguimos padeciendo los mismos dolores históricos?  

Como lo reportó recientemente **${primaryNews.mediaSource}**, las comunidades de **${subregion.name}** están viviendo en carne propia las consecuencias de la falta de soluciones reales en ${theme.axis.toLowerCase()}.  

Nuestra postura es clara: ${nationalNarrativeLine1} A los problemas no se les da la espalda con discursos tibios. Desde nuestra candidatura a la **${office.label}**, tenemos una convicción innegociable: a este territorio se le responde con gerencia, autoridad y presencia permanente en cada municipio.  

👉 Desliza para conocer la propuesta completa y cuéntanos en los comentarios: ¿crees que hace falta más mano firme o más inversión presupuestal para tu municipio?  

#${subregion.name.replace(/\s+/g, '')} #Antioquia #AbelardoDeLaEspriella #AlvaroUribe #${candidateName.replace(/\s+/g, '')} #${office.label.replace(/\s+/g, '')} #${candidateParty.replace(/\s+/g, '')} #${theme.axis.replace(/\s+/g, '')} #DebateNacional`;
}

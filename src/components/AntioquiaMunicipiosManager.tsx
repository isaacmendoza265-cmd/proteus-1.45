import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Vote, 
  Sparkles, 
  Search, 
  Share2, 
  Printer, 
  Download, 
  CheckCircle2, 
  Target, 
  Megaphone, 
  FileText, 
  BrainCircuit, 
  Copy, 
  Check, 
  ArrowRight, 
  ChevronRight, 
  Sliders, 
  Info, 
  Radio, 
  TrendingUp, 
  ShieldCheck, 
  Globe, 
  RefreshCw,
  UserCheck,
  AlertCircle,
  BarChart3,
  PieChart as PieIcon,
  Layers,
  Box,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { jsPDF } from 'jspdf';
import { 
  STRATEGIC_MUNICIPALITIES, 
  StrategicMunicipality, 
  calculateDemographicCrossEstimation 
} from '../data/antioquia7MunicipiosData';
import { CmtIsotipo } from './CmtProteusLogo';
import { MunicipioInteractiveMap } from './MunicipioInteractiveMap';
import { MunicipioDemographicDashboard } from './MunicipioDemographicDashboard';
import { MunicipioCommuneDetailCard } from './MunicipioCommuneDetailCard';
import { Municipio3DDiorama } from './Municipio3DDiorama';
import { RionegroInteractiveMap } from './RionegroInteractiveMap';
import { Rionegro3DDiorama } from './Rionegro3DDiorama';
import { RionegroECVDashboard } from './RionegroECVDashboard';
import { BelloInteractiveMap } from './BelloInteractiveMap';
import { ALL_MUNICIPIOS_TERRITORIAL_DATA } from '../data/allMunicipiosTerritorialData';

// Inicialización de la API de Gemini para búsquedas y análisis profundo
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface CandidateProfileProps {
  nombre?: string;
  afiliacionPartidista?: string;
  tonoNarrativo?: string;
  estiloComunicacion?: string;
  ejeTematicoComodo?: string;
  formacionOcupacion?: string;
  experienciaPrevia?: string;
  resumenEstrategico?: string;
}

interface AntioquiaMunicipiosManagerProps {
  candidateProfile: CandidateProfileProps | null;
  onNavigateToBio?: () => void;
}

export const AntioquiaMunicipiosManager: React.FC<AntioquiaMunicipiosManagerProps> = ({
  candidateProfile,
  onNavigateToBio
}) => {
  // Lista fija de los 7 municipios autorizados
  const MUNICIPALITY_KEYS = [
    { id: 'bello', name: 'Bello', badge: '554k hab' },
    { id: 'itagui', name: 'Itagüí', badge: '291k hab' },
    { id: 'envigado', name: 'Envigado', badge: '247k hab' },
    { id: 'la-estrella', name: 'La Estrella', badge: '78k hab' },
    { id: 'sabaneta', name: 'Sabaneta', badge: '86k hab' },
    { id: 'caldas', name: 'Caldas', badge: '84k hab' },
    { id: 'rionegro', name: 'Rionegro', badge: '147k hab' }
  ];

  // Estado del municipio activo
  const [selectedMuniId, setSelectedMuniId] = useState<string>('bello');
  const currentMuni: StrategicMunicipality = STRATEGIC_MUNICIPALITIES[selectedMuniId] || STRATEGIC_MUNICIPALITIES['bello'];

  // Modo de visualización territorial para los 7 municipios ('both' | 'map' | 'charts' | 'comunas' | 'diorama3d')
  const [muniViewMode, setMuniViewMode] = useState<'both' | 'map' | 'charts' | 'comunas' | 'diorama3d'>('both');

  // Estados de filtros (Recuadro Derecho)
  const initialAreaId = ALL_MUNICIPIOS_TERRITORIAL_DATA[selectedMuniId]?.areas[0]?.id || currentMuni.areas[0]?.id || '';
  const [selectedAreaId, setSelectedAreaId] = useState<string>(initialAreaId);
  const [selectedAge, setSelectedAge] = useState<'joven' | 'adulto' | 'adultoMayor'>('joven');
  const [selectedStratum, setSelectedStratum] = useState<'bajo' | 'medio' | 'alto'>('medio');
  const [selectedEducation, setSelectedEducation] = useState<'basico' | 'medio' | 'superior'>('medio');
  const [selectedOffice, setSelectedOffice] = useState<'Concejo' | 'Alcaldía' | 'Asamblea' | 'Gobernación'>('Alcaldía');

  // Si cambia el municipio, sincronizamos el área predeterminada
  useEffect(() => {
    const territorialConfig = ALL_MUNICIPIOS_TERRITORIAL_DATA[selectedMuniId];
    if (territorialConfig && territorialConfig.areas.length > 0) {
      setSelectedAreaId(territorialConfig.areas[0].id);
    } else if (currentMuni.areas.length > 0) {
      setSelectedAreaId(currentMuni.areas[0].id);
    }
  }, [selectedMuniId, currentMuni.areas]);

  // Área activa seleccionada
  const currentArea = currentMuni.areas.find(a => a.id === selectedAreaId) || currentMuni.areas[0];

  // Cálculo del cruce demográfico
  const demographicEstimation = calculateDemographicCrossEstimation(
    selectedMuniId,
    selectedAreaId,
    selectedAge,
    selectedStratum,
    selectedEducation
  );

  // Antecedente electoral seleccionado
  const currentElectoralData = currentMuni.electoralAntecedents[selectedOffice];

  // Estado para el Candidato (Recuadro Izquierdo - Analista)
  const [customCandidateName, setCustomCandidateName] = useState<string>('');
  const [candidateWebSearchBio, setCandidateWebSearchBio] = useState<string>('');
  const [isSearchingCandidateWeb, setIsSearchingCandidateWeb] = useState<boolean>(false);
  const [candidateSourceMode, setCandidateSourceMode] = useState<'bio' | 'custom'>(
    candidateProfile ? 'bio' : 'custom'
  );

  // Estado del informe de la herramienta Analista
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState<boolean>(false);
  const [analysisReport, setAnalysisReport] = useState<string | null>(null);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  // Generar nombre efectivo del candidato
  const effectiveCandidateName = candidateSourceMode === 'bio' && candidateProfile?.nombre
    ? candidateProfile.nombre
    : (customCandidateName.trim() || 'Candidato / Campaña Estratégica');

  // Función para buscar candidato en internet con Gemini y Google Search si no hay perfil en biografía
  const handleSearchCandidateOnline = async () => {
    if (!customCandidateName.trim()) return;
    setIsSearchingCandidateWeb(true);

    try {
      const prompt = `Realiza una búsqueda profunda en internet sobre la trayectoria política, perfil profesional, posturas y partido político del siguiente líder o candidato en Antioquia, Colombia:
      Nombre: "${customCandidateName.trim()}".
      Resume en 3 párrafos concisos:
      1. Quién es, cargos previos y partido/afiliación política.
      2. Principales temas o banderas que defiende (seguridad, empleo, educación, etc.).
      3. Estilo de comunicación y tono predominante que proyecta en medios o redes.`;

      let text = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          config: {
            tools: [{ googleSearch: {} }]
          }
        });
        text = response.text || '';
      } catch (err) {
        // Fallback estándar
        const fallbackRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });
        text = fallbackRes.text || '';
      }

      setCandidateWebSearchBio(text);
    } catch (error: any) {
      console.error('Error buscando candidato en web:', error);
      setCandidateWebSearchBio(`Perfil identificado: ${customCandidateName}. Se utilizará el contexto estándar de campaña para cargos de elección popular en Antioquia.`);
    } finally {
      setIsSearchingCandidateWeb(false);
    }
  };

  // Función para ejecutar el Análisis Estratégico de Publicidad (Analista)
  const handleRunAnalyst = async () => {
    setIsGeneratingAnalysis(true);

    // Preparar el contexto del candidato
    let candidateContext = '';
    if (candidateSourceMode === 'bio' && candidateProfile) {
      candidateContext = `
      - Nombre del candidato: ${candidateProfile.nombre}
      - Partido / Afiliación: ${candidateProfile.afiliacionPartidista || 'Centroderecha / Independiente'}
      - Tono narrativo calibrado en Biografía: ${candidateProfile.tonoNarrativo || 'Pragmático, firme y empático'}
      - Estilo de comunicación: ${candidateProfile.estiloComunicacion || 'Cercano e institucional'}
      - Ejes temáticos cómodos: ${candidateProfile.ejeTematicoComodo || 'Seguridad, empleo, desarrollo familiar, obras'}
      - Resumen de perfil: ${candidateProfile.resumenEstrategico || candidateProfile.experienciaPrevia || ''}
      `;
    } else {
      candidateContext = `
      - Nombre del candidato ingresado: ${effectiveCandidateName}
      - Datos extraídos o conocidos: ${candidateWebSearchBio || 'Liderazgo en proceso de consolidación electoral local en Antioquia.'}
      `;
    }

    const promptText = `Eres el Analista Estratégico Senior de Campañas Electorales de CMT PROTEUS.
Tu misión es diseñar un análisis exhaustivo y profesional sobre cómo debe ser la PUBLICIDAD Y COMUNICACIÓN POLÍTICA orientada a un grupo poblacional milimétricamente microsegmentado.

DEBES CONSIDERAR RIGUROSAMENTE LOS SIGUIENTES FACTORES:
1. TERRITORIO: Municipio de ${currentMuni.name}, Antioquia.
   - Área / División Político-Administrativa: ${currentArea.name} (${currentArea.type} - ${currentArea.subtype}).
   - Barrios / Veredas que comprende: ${currentArea.barriosOrVeredas.join(', ')}.
   - Población estimada del área: ${currentArea.estimatedPopulation.toLocaleString()} habitantes.
   - Densidad: ${currentArea.urbanDensity} | Nivel educativo general: ${currentArea.educationalLevelGeneral} | Estrato predominante: ${currentArea.predominantStratum}.
   - Dinámicas locales del área: ${currentArea.characteristics}.

2. GRUPO DEMOGRÁFICO ESPECÍFICO (CRUCE DE VARIABLES):
   - Grupo etario: ${selectedAge.toUpperCase()} (${currentMuni.demographics.ageGroups[selectedAge].range}).
   - Estrato socioeconómico: ${selectedStratum.toUpperCase()} (${currentMuni.demographics.socioeconomicStratum[selectedStratum].strata} - ${currentMuni.demographics.socioeconomicStratum[selectedStratum].description}).
   - Nivel educativo: ${selectedEducation.toUpperCase()} (${currentMuni.demographics.educationLevels[selectedEducation].level} - ${currentMuni.demographics.educationLevels[selectedEducation].description}).
   - Población estimada de este segmento específico en el área: ${demographicEstimation.finalEstimatedCount.toLocaleString()} personas (~${demographicEstimation.percentageOfArea}% de la división).
   - Potencial de votantes efectivos estimados en urnas: ${demographicEstimation.estimatedVoterTurnout.toLocaleString()} votos.

3. TIPO DE ELECCIÓN Y COMPETENCIAS INSTITUCIONALES:
   - Cargo en disputa: ${selectedOffice.toUpperCase()}.
   - Competencias institucionales específicas: ${currentElectoralData.competencies}.
   - Antecedentes electorales 2023 en ${currentMuni.name}: Ganador/Primer lugar (${currentElectoralData.immediateAntecedents2023.winnerOrLeadingParty} con ${currentElectoralData.immediateAntecedents2023.winnerVotes.toLocaleString()} votos), Segundo lugar (${currentElectoralData.immediateAntecedents2023.secondPlaceOrParty} con ${currentElectoralData.immediateAntecedents2023.secondVotes.toLocaleString()} votos). Abstención histórica: ${currentElectoralData.immediateAntecedents2023.abstentionRate}%.
   - Claves de la contienda: ${currentElectoralData.immediateAntecedents2023.keyInsights}.
   - ADVERTENCIA CRÍTICA DE COMPETENCIAS: Si es Concejo o Asamblea, las promesas NO pueden ser ejecutivas de gasto directo sino de control político, acuerdos/ordenanzas y gestión comunitaria. Si es Alcaldía o Gobernación, son competencias ejecutivas plenas de presupuesto y gobierno.

4. PERFIL DEL CANDIDATO CONDICIONANTE:
${candidateContext}
TODO EL ANÁLISIS, LAS PROPUESTAS DE MENSAJES Y EL TONO DEBEN ADAPTARSE DIRECTAMENTE A ESTE CANDIDATO (${effectiveCandidateName}).

ESTRUCTURA OBLIGATORIA DEL INFORME (RESPETA EXACTAMENTE ESTOS 6 PUNTOS):
1. Perfil general.
   (Diagnóstico sintético del segmento en ${currentArea.name} y cómo intersecta con el cargo de ${selectedOffice} y la candidatura de ${effectiveCandidateName}).

2. Descripción psicológica del votante seleccionado.
   (Motivaciones profundas, miedos cotidianos, aspiraciones, fuentes de desconfianza política y detonantes emocionales de voto teniendo en cuenta su edad, estrato y nivel educativo en ${currentArea.name}).

3. Líneas discursivas estratégicas.
   (Tres ejes temáticos de alto impacto con propuestas realistas ajustadas a las competencias de ${selectedOffice}. Incluir dos eslóganes o frases-fuerza memorables adaptados al candidato).

4. Tono narrativo prioritario.
   (Definición exacta del tono: e.g. autoritativo/firme, empático/cercano, pedagógico/técnico, inspirador/juvenil. Razones psicológicas de por qué este tono penetra en este segmento).

5. Medios prioritarios.
   (Desglose táctico de canales: Redes sociales prioritarias específicas con formato recomendado -Instagram Reels, TikTok, Facebook Groups, estados de WhatsApp, pauta geolocalizada-, y medios tradicionales o publicidad física territorial -volanteo mano a mano en sitios clave de ${currentArea.name}, pasacalles, perifoneo o reuniones comunitarias-).

6. Brief general de contenidos.
   (Guion o propuesta de 3 piezas de comunicación listas para producción:
   - Pieza 1: Video corto para pauta digital / red social prioritaria (Idea visual, gancho inicial, desarrollo del candidato y llamado a la acción).
   - Pieza 2: Mensaje territorial para impreso o micro-conversación en el barrio/vereda.
   - Pieza 3: Activación en territorio orientada a este segmento demográfico en ${currentArea.name}).

Entrega un informe denso, sin texto genérico ni rodeos, con lenguaje de consultoría política de primer nivel.`;

    try {
      let result = '';
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
          config: {
            tools: [{ googleSearch: {} }]
          }
        });
        result = response.text || '';
      } catch (e) {
        const fallbackRes = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [{ role: 'user', parts: [{ text: promptText }] }]
        });
        result = fallbackRes.text || '';
      }

      setAnalysisReport(result);
    } catch (err: any) {
      console.error('Error generando informe de analista:', err);
      // Fallback precalculado inteligente si falla la red
      setAnalysisReport(generateFallbackReport(
        currentMuni,
        currentArea,
        selectedAge,
        selectedStratum,
        selectedEducation,
        selectedOffice,
        effectiveCandidateName,
        demographicEstimation
      ));
    } finally {
      setIsGeneratingAnalysis(false);
    }
  };

  // Copiar al portapapeles
  const handleCopyReport = () => {
    if (!analysisReport) return;
    navigator.clipboard.writeText(analysisReport);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  // Exportar a PDF
  const handleExportPDF = () => {
    if (!analysisReport) return;
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(`CMT PROTEUS - INFORME ESTRATÉGICO DE PUBLICIDAD`, 15, 18);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Municipio: ${currentMuni.name} | Área: ${currentArea.name}`, 15, 25);
    doc.text(`Segmento: ${selectedAge.toUpperCase()} - ${selectedStratum.toUpperCase()} - ${selectedEducation.toUpperCase()}`, 15, 30);
    doc.text(`Elección: ${selectedOffice.toUpperCase()} | Candidato: ${effectiveCandidateName}`, 15, 35);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, 15, 40);
    doc.line(15, 43, 195, 43);

    const splitText = doc.splitTextToSize(analysisReport, 180);
    doc.setFontSize(9);
    doc.text(splitText, 15, 50);
    doc.save(`Analisis_Publicidad_${currentMuni.name}_${selectedOffice}_${effectiveCandidateName.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Barra superior de control y síntesis */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0A192F] text-white p-6 rounded-3xl shadow-xl border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-2xl shadow-md border border-white/20 shrink-0">
            <CmtIsotipo size={36} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-400/30">
                CMT PROTEUS • NÚCLEO REGIONAL
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                7 Municipios Estratégicos de Antioquia
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
              Microsegmentación y Estrategia Territorial
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-0.5">
              Herramienta analítica de publicidad hiperdirigida por división político-administrativa, cruce demográfico y competencias electorales.
            </p>
          </div>
        </div>

        {/* Indicador de perfil de candidato */}
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 text-right shrink-0 w-full md:w-auto flex md:flex-col justify-between items-center md:items-end">
          <span className="text-[9px] uppercase font-black text-slate-400 tracking-wider block">
            Candidato de Referencia
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-black text-emerald-300 max-w-[200px] truncate">
              {effectiveCandidateName}
            </span>
          </div>
          {candidateProfile && (
            <button
              onClick={onNavigateToBio}
              className="text-[10px] text-blue-400 hover:text-blue-300 underline font-semibold mt-1 block"
            >
              Ver en Biografía →
            </button>
          )}
        </div>
      </div>

      {/* Contenedor Principal: Barra Lateral + 2 Columnas (Izquierda: Analista | Derecha: Desplegables) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Barra de Navegación Lateral (Municipios) */}
        <aside className="lg:col-span-3 space-y-3">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-4 shadow-sm border border-white/10">
            <div className="flex items-center justify-between mb-3 px-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Municipios Clave
              </span>
              <span className="text-[10px] font-extrabold bg-sky-500/10 text-blue-700 px-2 py-0.5 rounded-full">
                7 Unidades
              </span>
            </div>

            <div className="space-y-1.5">
              {MUNICIPALITY_KEYS.map((muni) => {
                const isActive = selectedMuniId === muni.id;
                return (
                  <button
                    key={muni.id}
                    id={`btn-muni-${muni.id}`}
                    onClick={() => setSelectedMuniId(muni.id)}
                    className={`w-full text-left px-3.5 py-3 rounded-2xl font-black text-xs transition-all flex items-center justify-between border ${
                      isActive
                        ? 'bg-blue-900 text-white shadow-md border-blue-950 scale-[1.01]'
                        : 'bg-white/[0.04] backdrop-blur-sm border border-white/10/80 hover:bg-slate-100 text-slate-200 border-white/10/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-xl ${isActive ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/20 text-white' : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-slate-300 shadow-xs'}`}>
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="tracking-tight text-sm font-black">{muni.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/20 text-blue-100' : 'bg-slate-200 text-slate-300'
                      }`}>
                        {muni.badge}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-white translate-x-0.5' : 'text-slate-400'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Ficha sintética del municipio seleccionado */}
            <div className="mt-5 pt-4 border-t border-white/10 space-y-3 px-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Categoría</span>
                <span className="font-extrabold text-white">{currentMuni.category}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Población Total</span>
                <span className="font-extrabold text-blue-900">{currentMuni.totalPopulation.toLocaleString()} hab.</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Censo Electoral</span>
                <span className="font-extrabold text-white">{currentMuni.electoralCensus.toLocaleString()} votantes</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase text-[10px]">Distribución</span>
                <span className="font-extrabold text-emerald-700">{currentMuni.urbanRuralDistribution.urban}% Urb / {currentMuni.urbanRuralDistribution.rural}% Rur</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase text-[10px]">IDH / NBI</span>
                <span className="font-extrabold text-white">{currentMuni.hdi} | {currentMuni.nbiPercentage}%</span>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Vocación Económica</span>
                <div className="flex flex-wrap gap-1">
                  {currentMuni.economicDrivers.slice(0, 3).map((driver, i) => (
                    <span key={i} className="text-[9px] bg-slate-100 text-slate-200 font-bold px-2 py-0.5 rounded-md">
                      {driver}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Ventana del Municipio Seleccionado (9 Cols) */}
        <div className="lg:col-span-9 space-y-6">

          {/* Encabezado y Herramientas Territoriales (Figura Interactiva, Diorama 3D, Comunas y Gráficas) para todos los 7 municipios */}
          <div className="space-y-6">
            {/* Barra Superior de Control de Visualización Territorial */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-3 sm:p-3.5 shadow-sm border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black text-xs shadow-2xs">
                  {currentMuni.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-blue-900 bg-sky-500/10 px-2 py-0.5 rounded-md border border-blue-200">
                      SISTEMA TERRITORIAL • {currentMuni.name.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {ALL_MUNICIPIOS_TERRITORIAL_DATA[selectedMuniId]?.areas?.length || currentMuni.areas.length} divisiones oficiales
                    </span>
                  </div>
                  <span className="text-xs font-black text-white block mt-0.5">
                    Inteligencia Territorial, Diorama 3D y Demografía
                  </span>
                </div>
              </div>

              {/* Conmutador de vistas */}
              <div className="flex flex-wrap bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto border border-white/10/80">
                <button
                  onClick={() => setMuniViewMode('both')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    muniViewMode === 'both'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Vista Integral</span>
                </button>
                <button
                  onClick={() => setMuniViewMode('charts')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    muniViewMode === 'charts'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-pink-400" />
                  <span>Gráficas Círculo & Barras</span>
                </button>
                <button
                  onClick={() => setMuniViewMode('comunas')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    muniViewMode === 'comunas'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Pánel por Comuna</span>
                </button>
                <button
                  onClick={() => setMuniViewMode('diorama3d')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    muniViewMode === 'diorama3d'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5 text-sky-400" />
                  <span>Diorama 3D</span>
                </button>
                <button
                  onClick={() => setMuniViewMode('map')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    muniViewMode === 'map'
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mapa Cartográfico</span>
                </button>
              </div>
            </div>

            {/* Componente Diorama 3D Interactivo (si mode es 'diorama3d') */}
            {muniViewMode === 'diorama3d' && (
              selectedMuniId === 'rionegro' ? (
                <Rionegro3DDiorama
                  selectedAreaId={selectedAreaId}
                  onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                />
              ) : (
                <Municipio3DDiorama
                  muniId={selectedMuniId}
                  selectedAreaId={selectedAreaId}
                  onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                />
              )
            )}

            {/* Componente Mapa Interactivo (si mode es 'both' o 'map') */}
            {(muniViewMode === 'both' || muniViewMode === 'map') && (
              selectedMuniId === 'rionegro' ? (
                <RionegroInteractiveMap
                  areas={currentMuni.areas}
                  selectedAreaId={selectedAreaId}
                  onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                />
              ) : selectedMuniId === 'bello' ? (
                <BelloInteractiveMap
                  areas={currentMuni.areas}
                  selectedAreaId={selectedAreaId}
                  onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                />
              ) : (
                <MunicipioInteractiveMap
                  muniId={selectedMuniId}
                  selectedAreaId={selectedAreaId}
                  onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                />
              )
            )}

            {/* Componente de Gráficas Demográficas Círculo y Barras (si mode es 'both' o 'charts') */}
            {(muniViewMode === 'both' || muniViewMode === 'charts') && (
              selectedMuniId === 'rionegro' ? (
                <RionegroECVDashboard
                  selectedAreaId={selectedAreaId}
                  onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                />
              ) : (
                <MunicipioDemographicDashboard
                  muniId={selectedMuniId}
                  selectedAreaId={selectedAreaId}
                  onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                />
              )
            )}

            {/* Componente Específico Pánel por Comuna y Corregimiento (si mode es 'comunas') */}
            {muniViewMode === 'comunas' && (
              selectedMuniId === 'rionegro' ? (
                <RionegroECVDashboard
                  selectedAreaId={selectedAreaId}
                  onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                />
              ) : (
                <MunicipioCommuneDetailCard
                  muniId={selectedMuniId}
                  selectedAreaId={selectedAreaId}
                  onSelectArea={(areaId) => setSelectedAreaId(areaId)}
                />
              )
            )}
          </div>

          {/* Fila de 2 Columnas: Izquierda (Herramienta Analista) | Derecha (Desplegables) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Recuadro Izquierdo: Herramienta "Analista" (Col 7) */}
            <main className="lg:col-span-7 space-y-5">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-5 sm:p-6 shadow-sm border border-white/10 flex flex-col justify-between h-full space-y-5">
            <div>
              {/* Header del Analista */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-150">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-indigo-900 text-white shadow-md">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-black tracking-widest text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                      Módulo de Inteligencia
                    </span>
                    <h2 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                      Herramienta «Analista»
                    </h2>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold bg-emerald-500/10 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  Estrategia IA
                </span>
              </div>

              {/* Panel de calibración del candidato (Factor 4) */}
              <div className="mt-4 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-4 border border-white/10/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-slate-300" />
                    <span className="text-xs font-black uppercase text-white">
                      Factor 4: Perfil del Candidato
                    </span>
                  </div>

                  {candidateProfile && (
                    <div className="flex bg-slate-200 p-0.5 rounded-lg text-[10px] font-bold">
                      <button
                        onClick={() => setCandidateSourceMode('bio')}
                        className={`px-2 py-0.5 rounded-md transition-all ${
                          candidateSourceMode === 'bio' ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-blue-900 shadow-xs' : 'text-slate-300'
                        }`}
                      >
                        Biografía
                      </button>
                      <button
                        onClick={() => setCandidateSourceMode('custom')}
                        className={`px-2 py-0.5 rounded-md transition-all ${
                          candidateSourceMode === 'custom' ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-blue-900 shadow-xs' : 'text-slate-300'
                        }`}
                      >
                        Personalizar
                      </button>
                    </div>
                  )}
                </div>

                {candidateSourceMode === 'bio' && candidateProfile ? (
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-white/10 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-blue-950 text-sm">{candidateProfile.nombre}</span>
                      <span className="text-[10px] bg-sky-500/10 text-blue-800 font-bold px-2 py-0.5 rounded-md">
                        {candidateProfile.afiliacionPartidista || 'Partido Activo'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-2">
                      <strong className="text-slate-200">Tono:</strong> {candidateProfile.tonoNarrativo || 'Pragmático y firme'}. 
                      {' '}<strong className="text-slate-200">Estilo:</strong> {candidateProfile.estiloComunicacion || 'Cercano e institucional'}.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-400">
                      {candidateProfile 
                        ? 'Ingresa un nombre diferente para adaptar el informe a otro liderazgo político:'
                        : 'No has calibrado un perfil en Biografía. Ingresa el nombre del candidato y buscaremos sus datos en internet:'}
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nombre completo del candidato..."
                        value={customCandidateName}
                        onChange={(e) => setCustomCandidateName(e.target.value)}
                        className="flex-1 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      <button
                        onClick={handleSearchCandidateOnline}
                        disabled={isSearchingCandidateWeb || !customCandidateName.trim()}
                        className="bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0"
                        title="Buscar trayectoria política del candidato con Google Search"
                      >
                        {isSearchingCandidateWeb ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Search className="w-3.5 h-3.5" />
                        )}
                        <span>{isSearchingCandidateWeb ? 'Buscando...' : 'Buscar Web'}</span>
                      </button>
                    </div>

                    {candidateWebSearchBio && (
                      <div className="bg-emerald-500/10/80 border border-emerald-200 rounded-xl p-2.5 text-[11px] text-emerald-900 space-y-1">
                        <span className="font-extrabold flex items-center gap-1 text-[10px] uppercase text-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Datos extraídos de la web:
                        </span>
                        <p className="line-clamp-3 text-slate-200 leading-snug">{candidateWebSearchBio}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Parámetros Consolidados para el informe */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-2.5 rounded-xl border border-white/10/80">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">División</span>
                  <span className="text-xs font-black text-white truncate block mt-0.5" title={currentArea.name}>
                    {currentArea.name.split('-')[1] || currentArea.name}
                  </span>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-2.5 rounded-xl border border-white/10/80">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Segmento</span>
                  <span className="text-xs font-black text-blue-900 block mt-0.5">
                    {selectedAge} / E{selectedStratum === 'bajo' ? '1-2' : selectedStratum === 'medio' ? '3-4' : '5-6'}
                  </span>
                </div>
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-2.5 rounded-xl border border-white/10/80">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">Elección</span>
                  <span className="text-xs font-black text-purple-900 block mt-0.5">
                    {selectedOffice}
                  </span>
                </div>
              </div>

              {/* Botón Principal: Ejecutar Analista */}
              <div className="mt-4">
                <button
                  id="btn-generar-analisis-estrategico"
                  onClick={handleRunAnalyst}
                  disabled={isGeneratingAnalysis}
                  className="w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 hover:from-blue-950 hover:to-indigo-950 text-white py-3.5 px-4 rounded-2xl font-black text-xs sm:text-sm tracking-wide shadow-lg flex items-center justify-center gap-2.5 transition-all disabled:opacity-60"
                >
                  {isGeneratingAnalysis ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-blue-200" />
                      <span>Analizando territorio, psicología del votante y candidato...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#FACC15]" />
                      <span>GENERAR ESTRATEGIA PUBLICITARIA DIRIGIDA</span>
                    </>
                  )}
                </button>
              </div>

              {/* Informe del Analista (Estructura de 6 puntos) */}
              {analysisReport ? (
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-blue-700" />
                      Informe Estratégico Consolidado
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleCopyReport}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1"
                        title="Copiar texto del informe"
                      >
                        {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[10px] font-bold">{copiedReport ? 'Copiado' : 'Copiar'}</span>
                      </button>
                      <button
                        onClick={handleExportPDF}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-white transition-all text-xs flex items-center gap-1"
                        title="Exportar a PDF"
                      >
                        <Download className="w-3.5 h-3.5 text-blue-700" />
                        <span className="text-[10px] font-bold">PDF</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10/90 rounded-2xl p-4 border border-white/10/90 text-xs text-slate-200 space-y-3 max-h-[580px] overflow-y-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-300">
                    <div className="whitespace-pre-line font-sans prose-sm max-w-none text-white">
                      {analysisReport}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 border-2 border-dashed border-white/10 rounded-2xl p-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-black text-slate-200 uppercase tracking-tight">
                    Listo para Generar el Plan de Publicidad
                  </h4>
                  <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                    Selecciona el área en el recuadro derecho, calibra el cruce demográfico y tipo de elección, y presiona el botón para obtener el informe de 6 puntos.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Recuadro Derecho: Listas Desplegables de Segmentación (Col 5) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-5 sm:p-6 shadow-sm border border-white/10 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-150">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-700" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Recuadro de Configuración
                </h3>
              </div>
              <span className="text-[10px] font-extrabold text-blue-900 bg-sky-500/10 px-2 py-0.5 rounded-full">
                3 Filtros Maestros
              </span>
            </div>

            {/* 1. DESPLEGABLE: Área dentro del Municipio */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  1. Área / División Político-Administrativa
                </label>
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                  currentArea.type === 'Urbana' ? 'bg-sky-500/20 text-sky-300 text-blue-800' : 'bg-amber-500/20 text-amber-300 text-amber-800'
                }`}>
                  {currentArea.type} ({currentArea.subtype})
                </span>
              </div>

              <select
                id="select-area-municipio"
                value={selectedAreaId}
                onChange={(e) => setSelectedAreaId(e.target.value)}
                className="w-full bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                {currentMuni.areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name} ({area.type} - ~{area.estimatedPopulation.toLocaleString()} hab)
                  </option>
                ))}
              </select>

              {/* Ficha descriptiva del área seleccionada */}
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10/70 p-3 rounded-xl border border-white/10/80 space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Población del área: <strong className="text-white">{currentArea.estimatedPopulation.toLocaleString()}</strong></span>
                  <span>Estrato: <strong className="text-white">{currentArea.predominantStratum}</strong></span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Educación media: <strong className="text-white">{currentArea.educationalLevelGeneral}</strong></span>
                  <span>Densidad: <strong className="text-white">{currentArea.urbanDensity}</strong></span>
                </div>
                <div className="pt-1 text-slate-400 text-[10px]">
                  <strong>Barrios/Veredas:</strong> {currentArea.barriosOrVeredas.slice(0, 5).join(', ')}
                  {currentArea.barriosOrVeredas.length > 5 && ` (+${currentArea.barriosOrVeredas.length - 5} más)`}.
                </div>
              </div>
            </div>

            {/* 2. DESPLEGABLE: Sector Demográfico (Cruce de variables) */}
            <div className="space-y-3 pt-3 border-t border-slate-150">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  2. Sector Demográfico (Cruce de Variables)
                </label>
              </div>

              {/* Sub-selector Grupo Etario */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Grupo Etario</span>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value as any)}
                  className="w-full bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="joven">Joven (18 - 28 años) - {currentMuni.demographics.ageGroups.joven.percentage}%</option>
                  <option value="adulto">Adulto (29 - 59 años) - {currentMuni.demographics.ageGroups.adulto.percentage}%</option>
                  <option value="adultoMayor">Adulto Mayor (60+ años) - {currentMuni.demographics.ageGroups.adultoMayor.percentage}%</option>
                </select>
              </div>

              {/* Sub-selector Estrato */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Estrato Socioeconómico</span>
                <select
                  value={selectedStratum}
                  onChange={(e) => setSelectedStratum(e.target.value as any)}
                  className="w-full bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="bajo">Bajo (Estrato 1 y 2) - {currentMuni.demographics.socioeconomicStratum.bajo.percentage}%</option>
                  <option value="medio">Medio (Estrato 3 y 4) - {currentMuni.demographics.socioeconomicStratum.medio.percentage}%</option>
                  <option value="alto">Alto (Estrato 5 y 6) - {currentMuni.demographics.socioeconomicStratum.alto.percentage}%</option>
                </select>
              </div>

              {/* Sub-selector Nivel Educativo */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Nivel Educativo</span>
                <select
                  value={selectedEducation}
                  onChange={(e) => setSelectedEducation(e.target.value as any)}
                  className="w-full bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="basico">Básico (Primaria / Secundaria incompleta) - {currentMuni.demographics.educationLevels.basico.percentage}%</option>
                  <option value="medio">Medio (Bachiller / Técnico / Tecnólogo SENA) - {currentMuni.demographics.educationLevels.medio.percentage}%</option>
                  <option value="superior">Superior (Universitario / Posgrados) - {currentMuni.demographics.educationLevels.superior.percentage}%</option>
                </select>
              </div>

              {/* Cuadro de Estimación de Personas en Vivo */}
              <div className="bg-emerald-500/10/90 border border-emerald-200 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-emerald-600" />
                    Estimación Poblacional del Cruce
                  </span>
                  <span className="text-[9px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                    {demographicEstimation.percentageOfArea}% del área
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center pt-1">
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2 rounded-xl shadow-2xs border border-emerald-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Población Objetivo</span>
                    <span className="text-base font-black text-emerald-900">
                      {demographicEstimation.finalEstimatedCount.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-400 block">habitantes</span>
                  </div>
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2 rounded-xl shadow-2xs border border-emerald-100">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Potencial Votante</span>
                    <span className="text-base font-black text-blue-900">
                      ~{demographicEstimation.estimatedVoterTurnout.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-slate-400 block">urnas proyectadas</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. DESPLEGABLE: Tipo de Elección */}
            <div className="space-y-3 pt-3 border-t border-slate-150">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                  <Vote className="w-3.5 h-3.5 text-purple-600" />
                  3. Tipo de Elección
                </label>
                <span className="text-[9px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                  Competencias Específicas
                </span>
              </div>

              <select
                id="select-tipo-eleccion"
                value={selectedOffice}
                onChange={(e) => setSelectedOffice(e.target.value as any)}
                className="w-full bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs font-bold text-white focus:ring-2 focus:ring-purple-600 focus:outline-none"
              >
                <option value="Concejo">Concejo Municipal (Control político & acuerdos)</option>
                <option value="Alcaldía">Alcaldía Municipal (Poder ejecutivo local)</option>
                <option value="Asamblea">Asamblea Departamental (Diputados & ordenanzas)</option>
                <option value="Gobernación">Gobernación de Antioquia (Poder ejecutivo seccional)</option>
              </select>

              {/* Ficha de Antecedentes Electorales Inmediatos (2023) */}
              <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[10px] font-black uppercase text-purple-900 border-b border-purple-200/60 pb-1.5">
                  <span>Antecedentes 2023 ({selectedOffice})</span>
                  <span className="text-slate-400 font-bold">Abstención: {currentElectoralData.immediateAntecedents2023.abstentionRate}%</span>
                </div>

                <div className="space-y-1 text-[11px] text-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-400">1º Lugar / Vencedor:</span>
                    <strong className="text-white truncate max-w-[170px]" title={currentElectoralData.immediateAntecedents2023.winnerOrLeadingParty}>
                      {currentElectoralData.immediateAntecedents2023.winnerOrLeadingParty}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Votos 1º Lugar:</span>
                    <strong className="text-purple-900 font-mono">
                      {currentElectoralData.immediateAntecedents2023.winnerVotes.toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">2º Lugar:</span>
                    <span className="text-slate-200 truncate max-w-[170px]" title={currentElectoralData.immediateAntecedents2023.secondPlaceOrParty}>
                      {currentElectoralData.immediateAntecedents2023.secondPlaceOrParty}
                    </span>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-purple-200/60 text-[10px] text-purple-950 leading-tight">
                  <strong className="text-purple-900">Competencias del cargo:</strong> {currentElectoralData.competencies}
                </div>
              </div>
            </div>

          </div>
        </div>

          </div>
        </div>

      </div>
    </div>
  );
};

// Generador de informe de contingencia estructurado en los 6 puntos exactos
function generateFallbackReport(
  muni: StrategicMunicipality,
  area: any,
  age: 'joven' | 'adulto' | 'adultoMayor',
  stratum: 'bajo' | 'medio' | 'alto',
  education: 'basico' | 'medio' | 'superior',
  office: string,
  candidateName: string,
  demographics: any
): string {
  const ageLabel = age === 'joven' ? 'Jóvenes (18-28 años)' : age === 'adulto' ? 'Adultos (29-59 años)' : 'Adultos Mayores (60+ años)';
  const stratumLabel = stratum === 'bajo' ? 'Estrato Bajo (1-2)' : stratum === 'medio' ? 'Estrato Medio (3-4)' : 'Estrato Alto (5-6)';
  const eduLabel = education === 'basico' ? 'Nivel Básico' : education === 'medio' ? 'Nivel Medio / Técnico' : 'Nivel Superior Universitario';

  return `### 1. Perfil general
El segmento objetivo en ${area.name} (${muni.name}, Antioquia) corresponde a ${ageLabel} de ${stratumLabel} con ${eduLabel}, representando un universo estimado de ${demographics.finalEstimatedCount.toLocaleString()} personas con un potencial directo de votantes en urnas de ~${demographics.estimatedVoterTurnout.toLocaleString()} ciudadanos. Para la contienda a ${office.toUpperCase()}, la candidatura de ${candidateName} debe articular una oferta diferenciada que responda a la identidad barrial y a los antecedentes electorales del municipio, donde la disciplina comunitaria y las demandas de ${area.type === 'Urbana' ? 'seguridad barrial, movilidad metropolitana y empleo' : 'vías terciarias, apoyo al productor y conectividad rural'} condicionan la decisión de voto.

### 2. Descripción psicológica del votante seleccionado
- **Motivaciones:** Búsqueda de estabilidad, certidumbre económica y protección de su entorno cotidiano. En este grupo poblacional existe alta sensibilidad frente a la falta de oportunidades concretas y el costo de vida metropolitano.
- **Miedos y frustraciones:** Temor a la delincuencia común, microtráfico en parques y esquinas, y frustración ante promesas incumplidas de políticos tradicionales. Desconfianza hacia discursos radicales o improvisados.
- **Aspiraciones:** Formalización, independencia económica o progreso para sus hijos en educación técnica/universitaria; orgullo por su territorio en ${muni.name} y anhelo de que sus impuestos se reflejen en obras tangibles.
- **Detonante de voto:** Credibilidad ética del candidato, demostración de carácter con cercanía humana y propuestas viables que no suenen a utopía burocrática.

### 3. Líneas discursivas estratégicas
Ajustadas estrictamente a las competencias constitucionales de ${office.toUpperCase()}:
- **Línea 1 (Seguridad y Tranquilidad Territorial):** ${office === 'Concejo' || office === 'Asamblea' ? 'Control político riguroso y veeduría a los recursos de vigilancia, botones de pánico y frentes de seguridad barrial.' : 'Mano firme en el gobierno local/departamental con inversión en cámaras analíticas, recuperación de parques tomados y respaldo total a la Fuerza Pública.'}
- **Línea 2 (Oportunidades y Empleo para ${ageLabel}):** ${office === 'Concejo' || office === 'Asamblea' ? 'Gestión de acuerdos normativos para incentivos tributarios a empresas que contraten mano de obra local en ' + muni.name + '.' : 'Alianzas con el sector productivo privado y el SENA para crédito sin usura y capacitación técnica enfocada en demanda laboral real.'}
- **Línea 3 (Eficiencia y Defensa de la Calidad de Vida en ${area.name}):** ${office === 'Concejo' || office === 'Asamblea' ? 'Fiscalización milimétrica para que cada peso del presupuesto llegue a las vías y centros de salud del sector.' : 'Inversión focalizada en infraestructura comunitaria, mejoramiento del transporte integrado y salud oportuna sin filas.'}

**Eslóganes y Mensajes-Fuerza:**
- *"Con ${candidateName}, en ${muni.name} el orden y las oportunidades se hacen realidad."*
- *"${area.name} merece resultados, no promesas vacías."*

### 4. Tono narrativo prioritario
- **Tono Primario:** **Firme, Pragmático y Empático**.
- **Justificación Psicológica:** Este segmento rechaza tanto la soberbia tecnocrática distante como la demagogia populista. Responde positivamente a un liderazgo con aplomo y autoridad serena que hable el lenguaje claro de la calle y conozca al dedillo las cuadras y problemáticas de ${area.name}. La voz de ${candidateName} debe transmitir confiabilidad institucional y capacidad inmediata de ejecución.

### 5. Medios prioritarios
- **Digital / Redes Sociales:**
  - *Instagram y TikTok (Especialmente si el grupo es joven o adulto con educación media/superior):* Videos cortos en formato vertical grabados en el territorio (caminando en ${area.name}), con subtítulos dinámicos de alto contraste, mensaje frontal en los primeros 3 segundos y llamados a la acción concretos.
  - *Facebook y Grupos Barriales:* Contenido más descriptivo, testimonios de vecinos, galerías fotográficas de recorridos y transmisión en vivo de diálogos ciudadanos.
  - *WhatsApp (Comunidades y Estados):* Piezas infográficas en formato JPG/PDF ligero y audios directos de ${candidateName} saludando puntualmente a la comunidad de ${area.name}.
- **Territorio y Publicidad Física:**
  - Volanteo directo mano a mano con tarjeta electoral pedagógica en puntos de alto flujo peatonal (estaciones de transporte, parques comerciales).
  - Vallas y micro-perifoneo respetuoso en zonas de concentración comercial.
  - Encuentros comunitarios en casas de líderes barriales para generar efecto multiplicador persona a persona.

### 6. Brief general de contenidos
- **Pieza 1 (Video Corto Digital - 45 segundos):**
  - *Escena:* ${candidateName} caminando en una calle representativa de ${area.name} hablando directo a cámara.
  - *Gancho (0-5s):* "¿Cansado de que solo visiten ${area.name} cada cuatro años a prometer lo mismo?"
  - *Desarrollo (5-35s):* Explica puntualmente la propuesta principal para ${office} enfocada en el grupo seleccionado, mostrando cifras y soluciones concretas.
  - *Cierre (35-45s):* "Soy ${candidateName}. Con tu apoyo en las urnas, defenderemos ${muni.name}. ¡Vota bien!"
- **Pieza 2 (Volante / Flyer Territorial Microsegmentado):**
  - *Frente:* Foto cálida y decidida de ${candidateName}, logotipo de campaña y el compromiso específico para ${area.name}.
  - *Reverso:* Infografía de "Cómo votar por ${candidateName}" explicando el número en el tarjetón o casilla electoral para ${office}, junto a 3 compromisos verificables.
- **Pieza 3 (Activación en Territorio):**
  - Jornada de "Tinto y Diálogo con ${candidateName}" en el corazón de ${area.name}, con carpa móvil, toma pedagógica del espacio y registro digital de voluntarios del segmento.`;
}

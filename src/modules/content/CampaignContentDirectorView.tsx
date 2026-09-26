import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Sparkles, 
  Send, 
  Download, 
  Copy, 
  Check, 
  Share2, 
  Video, 
  Radio, 
  Megaphone, 
  MapPin, 
  Users, 
  Palette, 
  Save, 
  HelpCircle,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  Globe,
  Building2,
  Compass,
  ChevronDown,
  Target,
  ArrowRight,
  Filter,
  Search,
  BookOpen
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { CandidateProfile } from '../../components/CandidateProfileManager';
import { callGeminiApi } from '../../services/geminiService';
import { 
  TerritoryHierarchyService, 
  TerritorialScale, 
  HierarchyTerritoryNode 
} from '../../services/territoryHierarchyService';
import { 
  VOTER_AUDIENCE_CATALOG, 
  VOTER_AUDIENCE_CATEGORIES, 
  VoterAudienceService, 
  VoterAudienceGroup,
  VoterAudienceCategory
} from '../../data/voterAudienceCatalog';
import { useActiveTerritory, activeTerritoryService } from '../../services/activeTerritoryContextService';
import { NATIONAL_CENSUS, formatCensus } from '../../services/electoralCensusService';

interface CampaignContentDirectorViewProps {
  candidateProfile: CandidateProfile;
  onSaveToDrive?: (title: string, data: any) => void;
  onNavigateToZoom?: () => void;
}

type ContentFormat = 
  | 'video-short'
  | 'speech-plaza'
  | 'whatsapp-community'
  | 'press-statement'
  | 'debate-rebuttal';

export type CognitiveFraming = 'gain-hope' | 'loss-protection' | 'balanced';

export const CampaignContentDirectorView: React.FC<CampaignContentDirectorViewProps> = ({
  candidateProfile,
  onSaveToDrive,
  onNavigateToZoom
}) => {
  const { activeTerritory, setActiveTerritory } = useActiveTerritory();

  // =========================================================================
  // 1. TERRITORIAL HIERARCHY STATE (5 ESCALAS JERÁRQUICAS)
  // =========================================================================
  const [selectedScale, setSelectedScale] = useState<TerritorialScale>(activeTerritory.scale || 'municipal');
  const [selectedDeptId, setSelectedDeptId] = useState<string>(activeTerritory.deptId || 'dept-antioquia');
  const [selectedSubregId, setSelectedSubregId] = useState<string>(activeTerritory.subregId || 'subreg-valle-de-aburra');
  const [selectedMuniId, setSelectedMuniId] = useState<string>(activeTerritory.muniId || 'mpio-05001'); // Medellín default
  const [selectedComunaId, setSelectedComunaId] = useState<string>(activeTerritory.comunaId || 'comuna-11'); // Laureles default
  const [selectedBarrioId, setSelectedBarrioId] = useState<string>(activeTerritory.barrioId || 'all-comuna');

  // React to updates from activeTerritoryContextService (e.g. clicks in GIS Map or Drawer)
  React.useEffect(() => {
    if (activeTerritory) {
      if (activeTerritory.scale) setSelectedScale(activeTerritory.scale);
      if (activeTerritory.deptId) setSelectedDeptId(activeTerritory.deptId);
      if (activeTerritory.subregId) setSelectedSubregId(activeTerritory.subregId);
      if (activeTerritory.muniId) setSelectedMuniId(activeTerritory.muniId);
      if (activeTerritory.comunaId) setSelectedComunaId(activeTerritory.comunaId);
      if (activeTerritory.barrioId) setSelectedBarrioId(activeTerritory.barrioId);
    }
  }, [activeTerritory.updatedAt]);

  // Pre-load datasets for dropdowns
  const departmentsList = useMemo(() => TerritoryHierarchyService.getDepartments(), []);
  const subregionsList = useMemo(() => TerritoryHierarchyService.getSubregions(), []);
  const allMunicipalities = useMemo(() => TerritoryHierarchyService.getMunicipalities(), []);
  const comunasList = useMemo(() => TerritoryHierarchyService.getComunas(), []);
  const barriosList = useMemo(() => TerritoryHierarchyService.getBarrios(selectedComunaId), [selectedComunaId]);

  // Helpers to synchronize bidirectional state
  const handleSelectScale = (scale: TerritorialScale) => {
    setSelectedScale(scale);
    activeTerritoryService.setState({ scale, source: 'manual_selector' });
  };

  const handleSelectDept = (deptId: string) => {
    setSelectedDeptId(deptId);
    const d = departmentsList.find(item => item.id === deptId);
    if (d) {
      activeTerritoryService.setState({
        scale: 'departamental',
        deptId,
        name: d.name,
        fullName: d.fullName,
        electoralCensus: d.electoralCensus,
        population: d.population,
        nbiPercentage: d.nbiPercentage,
        source: 'manual_selector'
      });
    }
  };

  const handleSelectSubreg = (subregId: string) => {
    setSelectedSubregId(subregId);
    const s = subregionsList.find(item => item.id === subregId);
    if (s) {
      activeTerritoryService.setState({
        scale: 'subregional',
        subregId,
        name: s.name,
        fullName: s.fullName,
        population: s.population,
        nbiPercentage: s.nbiPercentage,
        source: 'manual_selector'
      });
    }
  };

  const handleSelectMuni = (muniId: string) => {
    setSelectedMuniId(muniId);
    const m = allMunicipalities.find(item => item.id === muniId);
    if (m) {
      activeTerritoryService.setState({
        scale: 'municipal',
        muniId,
        name: m.name,
        fullName: m.fullName,
        population: m.population,
        electoralCensus: m.electoralCensus,
        nbiPercentage: m.nbiPercentage,
        source: 'manual_selector'
      });
    }
  };

  const handleSelectComuna = (comunaId: string) => {
    setSelectedComunaId(comunaId);
    setSelectedBarrioId('all-comuna');
    const c = comunasList.find(item => item.id === comunaId);
    if (c) {
      activeTerritoryService.setState({
        scale: 'comuna-barrio',
        comunaId,
        barrioId: 'all-comuna',
        name: c.name,
        fullName: c.fullName,
        population: c.population,
        electoralCensus: c.electoralCensus,
        nbiPercentage: c.nbiPercentage,
        predominantStratum: c.predominantStratum,
        source: 'manual_selector'
      });
    }
  };

  const handleSelectBarrio = (barrioId: string) => {
    setSelectedBarrioId(barrioId);
    const b = barriosList.find(item => item.id === barrioId);
    if (b) {
      activeTerritoryService.setState({
        scale: 'comuna-barrio',
        barrioId,
        name: b.name,
        fullName: b.fullName,
        population: b.population,
        predominantStratum: b.predominantStratum,
        source: 'manual_selector'
      });
    }
  };

  // Resolve active territory node with full micro-data
  const currentTerritory = useMemo(() => {
    return TerritoryHierarchyService.resolveNode(selectedScale, {
      deptId: selectedDeptId,
      subregId: selectedSubregId,
      muniId: selectedMuniId,
      comunaId: selectedComunaId,
      barrioId: selectedBarrioId
    });
  }, [selectedScale, selectedDeptId, selectedSubregId, selectedMuniId, selectedComunaId, selectedBarrioId]);

  // =========================================================================
  // 2. AUDIENCE & VOTER SEGMENT STATE (CATÁLOGO COMPLETO)
  // =========================================================================
  const [selectedAudienceCategory, setSelectedAudienceCategory] = useState<string>('all');
  const [selectedAudienceId, setSelectedAudienceId] = useState<string>('gen-jovenes-primerizos');
  const [audienceSearchQuery, setAudienceSearchQuery] = useState<string>('');

  // Filtered audience list
  const filteredAudiences = useMemo(() => {
    let list = VOTER_AUDIENCE_CATALOG;
    if (selectedAudienceCategory !== 'all') {
      list = list.filter(a => a.category === selectedAudienceCategory);
    }
    if (audienceSearchQuery.trim()) {
      const q = audienceSearchQuery.toLowerCase();
      list = list.filter(a => 
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.dominantPains.some(p => p.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedAudienceCategory, audienceSearchQuery]);

  const activeAudience = useMemo(() => {
    return VoterAudienceService.getById(selectedAudienceId) || VOTER_AUDIENCE_CATALOG[0];
  }, [selectedAudienceId]);

  // =========================================================================
  // 3. CONTENT PARAMETERS STATE
  // =========================================================================
  const [contentFormat, setContentFormat] = useState<ContentFormat>('video-short');
  const [toneOfVoice, setToneOfVoice] = useState<string>('Firmeza, Autoridad y Esperanza');
  const [cognitiveFraming, setCognitiveFraming] = useState<CognitiveFraming>('gain-hope');
  const [keyTopic, setKeyTopic] = useState<string>('Seguridad territorial, empleo y freno a la extorsión');
  
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedBrief, setGeneratedBrief] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // =========================================================================
  // 4. GENERATE STRATEGIC BRIEF VIA GEMINI
  // =========================================================================
  const handleGenerateBrief = async () => {
    setIsGenerating(true);
    setCopied(false);
    setSavedSuccess(false);

    try {
      const framingDescription = 
        cognitiveFraming === 'gain-hope'
          ? 'ENFOQUE DE GANANCIA Y ESPERANZA (Prospect Theory - Gain Framing): Centrado en oportunidades de futuro, crecimiento económico, bienestar familiar, optimismo movilizador y conquistas colectivas.'
          : cognitiveFraming === 'loss-protection'
          ? 'ENFOQUE DE PÉRDIDA Y PROTECCIÓN (Prospect Theory - Loss Aversion Framing): Centrado en lo que las familias pueden perder si gana la improvisación (seguridad, empleo, libertad, patrimonio), apelando a la necesidad de blindaje y defensa firme.'
          : 'ENFOQUE DE EQUILIBRIO PROSPECTIVO (Diagnóstico de Riesgo + Vía de Esperanza): Contraste cognitivo inmediato entre el costo de la inacción (pérdida) y la certeza del alivio y la victoria con Isaac Mendoza (ganancia).';

      const prompt = `Actúa como Director Creativo y Estratega de Campaña Principal de Proyecto Proteus.

[CONTEXTO TERRITORIAL DETALLADO - ESCALA ${currentTerritory.scale.toUpperCase()}]:
- Territorio Seleccionado: ${currentTerritory.fullName}
- Nivel de Escala: ${currentTerritory.scale}
- Censo Electoral: ${currentTerritory.electoralCensus ? currentTerritory.electoralCensus.toLocaleString('es-CO') + ' votantes' : (activeTerritory.electoralCensus ? activeTerritory.electoralCensus.toLocaleString('es-CO') + ' votantes' : 'sin dato oficial para esta escala')}
- Población Estimada: ${currentTerritory.population ? currentTerritory.population.toLocaleString('es-CO') + ' habitantes' : (activeTerritory.population ? activeTerritory.population.toLocaleString('es-CO') + ' habitantes' : 'Nacional')}
- Índice NBI / Pobreza: ${currentTerritory.nbiPercentage ? currentTerritory.nbiPercentage + '%' : (activeTerritory.nbiPercentage ? activeTerritory.nbiPercentage + '%' : 'Variable')}
- Estratificación Predominante: ${currentTerritory.predominantStratum || activeTerritory.predominantStratum || 'Mixta'}
- Autoridad Local / Alcalde 2024-2027: ${activeTerritory.electedMayor || 'Administración Municipal'} (${activeTerritory.winnerParty || 'Coalición'})
- Bancadas del Concejo: ${activeTerritory.councilSummary || 'Multipartidista'}
- Dinámica de Seguridad y Convivencia:
  * Riesgo de Extorsión a Negocios: ${activeTerritory.securityDynamics.extortionRisk || 'Monitoreo territorial'}
  * Bandas y Presencia Delincuencial: ${activeTerritory.securityDynamics.armedPresence || 'Vigilancia institucional'}
  * Homicidios: ${activeTerritory.securityDynamics.homicideRate || 'Normal subregional'}
- Sectores Económicos: ${activeTerritory.economicSectors.length > 0 ? activeTerritory.economicSectors.join(', ') : 'Comercio, servicios y producción local'}
- Problemáticas Territoriales Clave:
${(activeTerritory.keyProblems.length > 0 ? activeTerritory.keyProblems : currentTerritory.keyIssues).map(issue => `  * ${issue}`).join('\n')}
- Oportunidades Estratégicas y Propuestas Locales:
${(activeTerritory.strategicOpportunities.length > 0 ? activeTerritory.strategicOpportunities : [currentTerritory.strategicContext]).map(opp => `  * ${opp}`).join('\n')}
- Perfil Estratégico del Territorio: ${currentTerritory.strategicContext}

[AUDIENCIA OBJETIVO & SEGMENTO EXACTO]:
- Nombre del Segmento: ${activeAudience.name}
- Categoría: ${activeAudience.categoryLabel}
- Definición y Psicografía: ${activeAudience.description}
- Dolores Dominantes que le quitan el sueño:
${activeAudience.dominantPains.map(p => `  * ${p}`).join('\n')}
- Canales más Efectivos: ${activeAudience.effectiveChannels.join(', ')}
- Gatillo Psicológico Motivador: ${activeAudience.psychologicalTrigger}
- Argumento Ganador Base: "${activeAudience.winningArgument}"
- Objeción Típica a Neutralizar: ${activeAudience.counterObjection}

[PERFIL DEL CANDIDATO]:
- Nombre: ${candidateProfile.nombre}
- Cargo de aspiración: ${candidateProfile.afiliacionPartidista || 'Candidato Líder'}
- Tono narrativo de base: ${candidateProfile.tonoNarrativo || 'Firme y transparente'}
- Estilo comunicativo: ${candidateProfile.estiloComunicacion || 'Asertivo y directo'}
- Fototipo y Colorimetría sugerida: ${candidateProfile.colorimetryData?.estacionCromatica || 'Contraste Alto'}

[REQUERIMIENTO DEL BRIEF]:
- Formato: ${contentFormat}
- Tono Solicitado: ${toneOfVoice}
- Eje Temático: ${keyTopic}
- [PROTOCOLO PA-003 • ENFOQUE DE PERSUASIÓN COGNITIVA]: ${framingDescription}

Diseña un BRIEF ESTRATÉGICO DE ALTO IMPACTO estructurado exactamente en los siguientes 7 puntos:
1. OBJETIVO DE LA PIEZA: Qué queremos que ${activeAudience.name} en ${currentTerritory.name} piense, sienta y haga tras escucharla (calibrado según el sesgo cognitivo ${cognitiveFraming}).
2. EL GANCHO (HOOK DE LOS PRIMEROS 3-5 SEGUNDOS): Frase demoledora e irresistible dirigida directamente a los dolores de ${activeAudience.name} en ${currentTerritory.name}.
3. DATOS TERRITORIALES HIPERLOCALES: Cita al menos 2 cifras reales del territorio (censo electoral, población DANE, NBI, alcalde actual o problema de extorsión/seguridad citado arriba) para demostrar que el candidato conoce el territorio como la palma de su mano.
4. NÚCLEO DEL MENSAJE / PROPUESTA VALOR: La solución clara y creíble que ${candidateProfile.nombre} propone para este segmento sin rodeos.
5. LLAMADO A LA ACCIÓN (CTA): Convocatoria específica adaptada a los canales del segmento (${activeAudience.effectiveChannels[0] || 'WhatsApp'}).
6. RECOMENDACIONES DE PUESTA EN ESCENA & SEMIÓTICA:
   - Vestuario y colorimetría sugerida acorde al fototipo de ${candidateProfile.nombre}.
   - Lenguaje corporal y encuadre recomendado.
7. PREGUNTA INCÓMODA Y CÓMO NOQUEARLA: Anticipa la objeción más difícil que ${activeAudience.name} le haría al candidato y dale la respuesta exacta en 20 segundos.`;

      const response = await callGeminiApi({
        promptText: prompt,
        systemInstruction: 'Eres el Director de Creación de Contenido de Proteus. Redacta briefs estratégicos accionables, de tono demoledor, profesionales, sin lugares comunes y con estricto anclaje microterritorial y psicográfico.',
        useSearch: true
      });

      setGeneratedBrief(response);
    } catch (err: any) {
      setGeneratedBrief('Error al generar el brief con la inteligencia de Gemini. Por favor verifica la conexión e intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedBrief) return;
    navigator.clipboard.writeText(generatedBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPdf = () => {
    if (!generatedBrief) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Header Background
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 32, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text('PROTEUS • DIRECTOR DE CONTENIDO & BRIEFS', 14, 14);

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    doc.text(`CANDIDATO: ${candidateProfile.nombre.toUpperCase()} | ESCALA: ${currentTerritory.scale.toUpperCase()} | TERRITORIO: ${currentTerritory.name.toUpperCase()}`, 14, 22);
    doc.text(`AUDIENCIA: ${activeAudience.name.toUpperCase()} | FECHA: ${new Date().toLocaleDateString()}`, 14, 27);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(9.5);
    const splitText = doc.splitTextToSize(generatedBrief, 182);
    doc.text(splitText, 14, 40);

    doc.save(`Brief_${candidateProfile.nombre.replace(/\s+/g, '_')}_${currentTerritory.name}_${Date.now()}.pdf`);
  };

  const handleSaveDrive = () => {
    if (!generatedBrief || !onSaveToDrive) return;
    onSaveToDrive(`Brief_${candidateProfile.nombre}_${currentTerritory.name}_${contentFormat}`, {
      candidato: candidateProfile.nombre,
      escala: currentTerritory.scale,
      territorio: currentTerritory.fullName,
      formato: contentFormat,
      audiencia: activeAudience.name,
      categoriaAudiencia: activeAudience.categoryLabel,
      contenido: generatedBrief,
      fecha: new Date().toISOString()
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-950/40 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.4)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-gradient-to-r from-amber-400/20 via-sky-400/20 to-purple-500/30 text-amber-300 border border-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.3)] flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                Contenido
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                5 Escalas Territoriales + 40 Segmentos
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Redactar discursos y piezas</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
              Navega desde la escala <strong className="text-sky-300">Nacional</strong> hasta <strong className="text-amber-300">Comuna o Barrio</strong>. Selecciona con precisión quirúrgica el grupo de votantes y genera briefs respaldados por microdatos oficiales y persuasión cognitiva.
            </p>
          </div>

          {/* Active Candidate Badge */}
          <div className="shrink-0 p-3 rounded-2xl bg-white/05 border border-white/15 backdrop-blur-xl">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Candidato Activo</div>
            <div className="text-sm font-black text-amber-300 mt-0.5">{candidateProfile.nombre}</div>
            <div className="text-[10px] text-slate-400">{candidateProfile.afiliacionPartidista || 'Proyecto Político'}</div>
          </div>
        </div>
      </div>

      {/* 2. Control Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Bioluminescent GIS Connection Banner */}
          <div className="p-4 rounded-3xl bg-gradient-to-r from-sky-500/20 via-indigo-500/20 to-purple-500/20 border border-sky-400/50 backdrop-blur-2xl shadow-[0_0_30px_rgba(56,189,248,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-sky-500/30 border border-sky-400/60 text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.4)] shrink-0">
                <Compass className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 font-black px-2 py-0.5 rounded-full bg-sky-500/25 border border-sky-400/40">
                    📍 VINCULADO AL ZOOM TERRITORIAL GIS
                  </span>
                  <span className="text-xs font-black text-white">
                    {activeTerritory.fullName}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase font-bold">
                    Escala {activeTerritory.scale}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-300 mt-1 font-mono">
                  {activeTerritory.electoralCensus && (
                    <span>Censo: <strong className="text-emerald-300">{activeTerritory.electoralCensus.toLocaleString('es-CO')}</strong> votantes</span>
                  )}
                  {activeTerritory.population && (
                    <span>Población: <strong className="text-sky-300">{activeTerritory.population.toLocaleString('es-CO')}</strong> hab.</span>
                  )}
                  {activeTerritory.nbiPercentage && (
                    <span>NBI: <strong className="text-amber-300">{activeTerritory.nbiPercentage}%</strong></span>
                  )}
                  {activeTerritory.electedMayor && (
                    <span>Alcalde: <strong className="text-purple-300">{activeTerritory.electedMayor}</strong></span>
                  )}
                </div>
              </div>
            </div>

            {onNavigateToZoom && (
              <button
                type="button"
                onClick={onNavigateToZoom}
                className="shrink-0 px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/25 hover:border-sky-400 text-sky-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg transform hover:scale-[1.02] active:scale-95 cursor-pointer"
                title="Volver al mapa GIS interactivo"
              >
                <span>🗺️ Ver en Mapa GIS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* =========================================================================
              PANEL 1: NAVEGACIÓN TERRITORIAL EN 5 ESCALAS
              ========================================================================= */}
          <div className="p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.4)] space-y-3.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <h2 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-400" />
                Escala & Territorio Objetivo (5 Niveles Jerárquicos)
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30 uppercase font-black">
                {selectedScale}
              </span>
            </div>

            {/* 5-Scale Horizontal Selector Buttons */}
            <div className="grid grid-cols-5 gap-1 p-1 rounded-2xl bg-black/40 border border-white/10 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => handleSelectScale('nacional')}
                className={`py-1.5 px-1 rounded-xl transition text-center flex flex-col items-center gap-0.5 ${
                  selectedScale === 'nacional'
                    ? 'bg-amber-500/30 text-amber-200 border border-amber-400/60 shadow-[0_0_10px_rgba(251,191,36,0.3)] font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🇨🇴</span>
                <span className="text-[10px] truncate">1. Nacional</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectScale('departamental')}
                className={`py-1.5 px-1 rounded-xl transition text-center flex flex-col items-center gap-0.5 ${
                  selectedScale === 'departamental'
                    ? 'bg-sky-500/30 text-sky-200 border border-sky-400/60 shadow-[0_0_10px_rgba(56,189,248,0.3)] font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🏛️</span>
                <span className="text-[10px] truncate">2. Dptal.</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectScale('subregional')}
                className={`py-1.5 px-1 rounded-xl transition text-center flex flex-col items-center gap-0.5 ${
                  selectedScale === 'subregional'
                    ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/60 shadow-[0_0_10px_rgba(52,211,153,0.3)] font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🌲</span>
                <span className="text-[10px] truncate">3. Subregión</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectScale('municipal')}
                className={`py-1.5 px-1 rounded-xl transition text-center flex flex-col items-center gap-0.5 ${
                  selectedScale === 'municipal'
                    ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/60 shadow-[0_0_10px_rgba(129,140,248,0.3)] font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🏙️</span>
                <span className="text-[10px] truncate">4. Municipio</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectScale('comuna-barrio')}
                className={`py-1.5 px-1 rounded-xl transition text-center flex flex-col items-center gap-0.5 ${
                  selectedScale === 'comuna-barrio'
                    ? 'bg-purple-500/30 text-purple-200 border border-purple-400/60 shadow-[0_0_10px_rgba(168,85,247,0.3)] font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>📍</span>
                <span className="text-[10px] truncate">5. Comuna/B.</span>
              </button>
            </div>

            {/* Cascading Specific Dropdowns depending on selected scale */}
            <div className="space-y-2 pt-1">
              {/* Scale 1: Nacional */}
              {selectedScale === 'nacional' && (
                <div className="p-3 rounded-2xl bg-white/05 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-bold text-white">República de Colombia</div>
                      <div className="text-[10px] text-slate-400">32 Departamentos + Bogotá D.C.</div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-[11px] text-sky-300 font-bold">
                    Censo: {formatCensus(NATIONAL_CENSUS.total)}
                  </div>
                </div>
              )}

              {/* Scale 2: Departamental */}
              {selectedScale === 'departamental' && (
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-semibold">Selecciona el Departamento:</label>
                  <select
                    value={selectedDeptId}
                    onChange={(e) => handleSelectDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-sky-400"
                  >
                    {departmentsList.map(d => (
                      <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                        {d.name} - Censo: {d.electoralCensus?.toLocaleString('es-CO')}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Scale 3: Subregional */}
              {selectedScale === 'subregional' && (
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-semibold">Selecciona la Subregión (Antioquia):</label>
                  <select
                    value={selectedSubregId}
                    onChange={(e) => handleSelectSubreg(e.target.value)}
                    className="w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-emerald-400"
                  >
                    {subregionsList.map(s => (
                      <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                        {s.name} - Pob: {s.population?.toLocaleString('es-CO')}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Scale 4: Municipal */}
              {selectedScale === 'municipal' && (
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-300 font-semibold">Selecciona el Municipio (125 de Antioquia):</label>
                  <select
                    value={selectedMuniId}
                    onChange={(e) => handleSelectMuni(e.target.value)}
                    className="w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-indigo-400"
                  >
                    {allMunicipalities.map(m => (
                      <option key={m.id} value={m.id} className="bg-slate-900 text-white">
                        {m.name} ({m.subregionName}) - Censo: {m.electoralCensus?.toLocaleString('es-CO')}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Scale 5: Comuna o Barrio */}
              {selectedScale === 'comuna-barrio' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-300 font-semibold">Comuna / Corregimiento:</label>
                    <select
                      value={selectedComunaId}
                      onChange={(e) => handleSelectComuna(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-purple-400"
                    >
                      {comunasList.map(c => (
                        <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-300 font-semibold">Barrio Específico:</label>
                    <select
                      value={selectedBarrioId}
                      onChange={(e) => handleSelectBarrio(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-purple-400"
                    >
                      <option value="all-comuna" className="bg-slate-900 text-white">
                        Toda la Comuna (General)
                      </option>
                      {barriosList.map(b => (
                        <option key={b.id} value={b.id} className="bg-slate-900 text-white">
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Micro-Data Badge of Selected Node */}
            <div className="p-3.5 rounded-2xl bg-white/05 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-black text-amber-300">{currentTerritory.fullName}</span>
                <span className="font-mono text-[10px] text-slate-400">
                  {currentTerritory.electoralCensus ? `Censo: ${currentTerritory.electoralCensus.toLocaleString('es-CO')} votantes` : ''}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-300 font-mono">
                {currentTerritory.predominantStratum && <span>{currentTerritory.predominantStratum}</span>}
                {currentTerritory.nbiPercentage && <span>NBI: {currentTerritory.nbiPercentage}%</span>}
                {currentTerritory.subregionName && <span>Subregión: {currentTerritory.subregionName}</span>}
                {activeTerritory.electedMayor && <span className="text-purple-300 font-bold">Alcaldía: {activeTerritory.electedMayor}</span>}
              </div>
              {activeTerritory.securityDynamics.extortionRisk && (
                <div className="text-[10px] text-rose-300/90 font-mono truncate">
                  Seguridad: {activeTerritory.securityDynamics.extortionRisk}
                </div>
              )}
              {currentTerritory.keyIssues && currentTerritory.keyIssues[0] && (
                <div className="text-[10px] text-slate-400 italic pt-1 border-t border-white/05 truncate">
                  Problemática clave: {currentTerritory.keyIssues[0]}
                </div>
              )}
            </div>
          </div>

          {/* =========================================================================
              PANEL 2: SEGMENTACIÓN DE VOTANTES (CATÁLOGO COMPLETO)
              ========================================================================= */}
          <div className="p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.4)] space-y-3.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                Segmento / Audiencia Específica ({VOTER_AUDIENCE_CATALOG.length} Grupos)
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase font-black">
                {activeAudience.priority}
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px] font-mono">
              <button
                type="button"
                onClick={() => setSelectedAudienceCategory('all')}
                className={`px-2.5 py-1 rounded-lg shrink-0 transition ${
                  selectedAudienceCategory === 'all'
                    ? 'bg-amber-400/30 text-amber-200 border border-amber-400/60 font-bold'
                    : 'text-slate-400 hover:text-white bg-white/05'
                }`}
              >
                Todos ({VOTER_AUDIENCE_CATALOG.length})
              </button>
              {VOTER_AUDIENCE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedAudienceCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-lg shrink-0 transition ${
                    selectedAudienceCategory === cat.id
                      ? 'bg-amber-400/30 text-amber-200 border border-amber-400/60 font-bold'
                      : 'text-slate-400 hover:text-white bg-white/05'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input for Audiences */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar grupo por nombre, profesión, dolor o estrato..."
                value={audienceSearchQuery}
                onChange={(e) => setAudienceSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/05 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Audience Dropdown with Grouped Options */}
            <div className="space-y-1">
              <label className="text-[11px] text-slate-300 font-semibold">Grupo de Votantes Seleccionado:</label>
              <select
                value={selectedAudienceId}
                onChange={(e) => setSelectedAudienceId(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-amber-400"
              >
                {VOTER_AUDIENCE_CATEGORIES.map(cat => {
                  const catAudiences = filteredAudiences.filter(a => a.category === cat.id);
                  if (catAudiences.length === 0) return null;
                  return (
                    <optgroup key={cat.id} label={cat.label} className="bg-slate-900 text-amber-300 font-bold">
                      {catAudiences.map(a => (
                        <option key={a.id} value={a.id} className="bg-slate-900 text-white font-normal">
                          {a.name} ({a.priority})
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
            </div>

            {/* Active Audience Insights Card */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/25 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-black text-amber-200">{activeAudience.name}</div>
                  <div className="text-[10px] text-slate-300 italic">{activeAudience.tagline}</div>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-black/40 text-amber-300 border border-amber-400/30 shrink-0">
                  ~{activeAudience.shareEstimatedNational}% Censo
                </span>
              </div>

              <div className="text-[10px] text-slate-300">
                <strong className="text-amber-300">Gatillo Psicológico:</strong> {activeAudience.psychologicalTrigger}
              </div>

              <div className="text-[10px] text-slate-400">
                <strong className="text-slate-300">Canales Top:</strong> {activeAudience.effectiveChannels.join(', ')}
              </div>
            </div>
          </div>

          {/* =========================================================================
              PANEL 3: FORMATO, TONO Y ENCUADRE COGNITIVO
              ========================================================================= */}
          <div className="p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.4)] space-y-3.5">
            {/* Content Format Selector */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                Formato del Contenido:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setContentFormat('video-short')}
                  className={`p-2 rounded-xl text-left border transition ${contentFormat === 'video-short' ? 'bg-amber-500/25 border-amber-400 text-white font-bold' : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'}`}
                >
                  <Video className="w-3.5 h-3.5 text-amber-300 mb-1" />
                  Video Corto (Reels / TikTok)
                </button>
                <button
                  type="button"
                  onClick={() => setContentFormat('speech-plaza')}
                  className={`p-2 rounded-xl text-left border transition ${contentFormat === 'speech-plaza' ? 'bg-amber-500/25 border-amber-400 text-white font-bold' : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'}`}
                >
                  <Megaphone className="w-3.5 h-3.5 text-sky-300 mb-1" />
                  Discurso de Plaza Pública
                </button>
                <button
                  type="button"
                  onClick={() => setContentFormat('whatsapp-community')}
                  className={`p-2 rounded-xl text-left border transition ${contentFormat === 'whatsapp-community' ? 'bg-amber-500/25 border-amber-400 text-white font-bold' : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'}`}
                >
                  <Radio className="w-3.5 h-3.5 text-emerald-300 mb-1" />
                  WhatsApp / Redes Barriales
                </button>
                <button
                  type="button"
                  onClick={() => setContentFormat('debate-rebuttal')}
                  className={`p-2 rounded-xl text-left border transition ${contentFormat === 'debate-rebuttal' ? 'bg-amber-500/25 border-amber-400 text-white font-bold' : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'}`}
                >
                  <AlertCircle className="w-3.5 h-3.5 text-rose-300 mb-1" />
                  Debate & Respuesta a Ataques
                </button>
              </div>
            </div>

            {/* Key Topic */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Eje Temático Principal:</label>
              <input
                type="text"
                value={keyTopic}
                onChange={(e) => setKeyTopic(e.target.value)}
                placeholder="Ej. Seguridad, empleo juvenil, freno a la extorsión..."
                className="w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/20 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
              />
            </div>

            {/* Tone of Voice */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Tono de Comunicación:</label>
              <select
                value={toneOfVoice}
                onChange={(e) => setToneOfVoice(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/20 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
              >
                <option value="Firmeza, Autoridad y Esperanza" className="bg-slate-900">Firmeza, Autoridad y Esperanza</option>
                <option value="Cercano, Empático y Protector" className="bg-slate-900">Cercano, Empático y Protector</option>
                <option value="Técnico, Resolutivo y Sin Carreta" className="bg-slate-900">Técnico, Resolutivo y Sin Carreta</option>
                <option value="Disruptivo, Frontal y Denunciante" className="bg-slate-900">Disruptivo, Frontal y Denunciante</option>
              </select>
            </div>

            {/* Cognitive Framing Selector (Protocolo PA-003) */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <label className="text-xs text-slate-300 font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Persuasión cognitiva:
                </span>
                <span className="text-[10px] font-mono text-sky-400">Prospect Theory</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCognitiveFraming('gain-hope')}
                  className={`p-2 rounded-xl text-center border transition text-xs ${
                    cognitiveFraming === 'gain-hope'
                      ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold shadow-[0_0_10px_rgba(52,211,153,0.3)]'
                      : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-black">Ganancia</div>
                  <div className="text-[9px] text-slate-400">Esperanza</div>
                </button>
                <button
                  type="button"
                  onClick={() => setCognitiveFraming('loss-protection')}
                  className={`p-2 rounded-xl text-center border transition text-xs ${
                    cognitiveFraming === 'loss-protection'
                      ? 'bg-rose-500/25 border-rose-400 text-rose-200 font-bold shadow-[0_0_10px_rgba(244,63,94,0.3)]'
                      : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-black">Pérdida</div>
                  <div className="text-[9px] text-slate-400">Blindaje</div>
                </button>
                <button
                  type="button"
                  onClick={() => setCognitiveFraming('balanced')}
                  className={`p-2 rounded-xl text-center border transition text-xs ${
                    cognitiveFraming === 'balanced'
                      ? 'bg-sky-500/25 border-sky-400 text-sky-200 font-bold shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                      : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-black">Equilibrio</div>
                  <div className="text-[9px] text-slate-400">Riesgo + Victoria</div>
                </button>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateBrief}
              disabled={isGenerating}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(251,191,36,0.4)] flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Sintetizando Microdatos y Perfil Cognitivo...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generar Brief Estratégico con IA</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Column (Brief Generated) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex flex-col min-h-[640px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono uppercase text-white font-bold tracking-wider">
                  Brief Estratégico Generado
                </span>
              </div>

              {generatedBrief && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition flex items-center gap-1 text-xs"
                    title="Copiar al portapapeles"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>

                  <button
                    onClick={handleDownloadPdf}
                    className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition flex items-center gap-1 text-xs"
                    title="Descargar en PDF Institucional"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-400" />
                    <span className="hidden sm:inline">PDF</span>
                  </button>

                  {onSaveToDrive && (
                    <button
                      onClick={handleSaveDrive}
                      className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition flex items-center gap-1 text-xs"
                      title="Guardar en Google Drive"
                    >
                      <Save className="w-3.5 h-3.5 text-amber-400" />
                      <span className="hidden sm:inline">{savedSuccess ? 'Guardado' : 'Drive'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-black/30 rounded-2xl border border-white/10 p-4 overflow-y-auto max-h-[600px] font-sans text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
              {generatedBrief ? (
                generatedBrief
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-500 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white/05 border border-white/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-amber-400/50" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-300">Esperando Parámetros</h4>
                    <p className="text-xs text-slate-400 max-w-sm mt-1">
                      Selecciona la escala territorial (Nacional a Comuna/Barrio) y el grupo de votantes. Haz clic en "Generar Brief" para construir la estrategia.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Status */}
            {generatedBrief && (
              <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Territorio: {currentTerritory.name}</span>
                <span>Audiencia: {activeAudience.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
    <div className="proteus-civico space-y-6 pb-12">
      {/* 1. Header Banner */}
      <div className="p-5 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5" />
                Contenido
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-[var(--c-ok-soft)] text-[var(--c-ok)] text-xs font-bold">
                5 Escalas Territoriales + 40 Segmentos
              </span>
            </div>
            <h1 className="font-titulo m-0 text-2xl lg:text-[28px] leading-tight font-medium">
              Redactar discursos y piezas
            </h1>
            <p className="m-0 text-[var(--c-muted)] text-xs sm:text-sm max-w-3xl">
              Navega desde la escala <strong className="text-[var(--c-ink)]">Nacional</strong> hasta <strong className="text-[var(--c-ink)]">Comuna o Barrio</strong>. Selecciona con precisión quirúrgica el grupo de votantes y genera briefs respaldados por microdatos oficiales y persuasión cognitiva.
            </p>
          </div>

          {/* Active Candidate Badge */}
          <div className="shrink-0 px-3 py-2.5 rounded-lg border border-[var(--c-border)] bg-[var(--c-sunken)]">
            <div className="text-xs uppercase text-[var(--c-muted)] font-bold">Candidato Activo</div>
            <div className="text-sm font-bold text-[var(--c-accent)] mt-0.5">{candidateProfile.nombre}</div>
            <div className="text-xs text-[var(--c-muted)]">{candidateProfile.afiliacionPartidista || 'Proyecto Político'}</div>
          </div>
        </div>
      </div>

      {/* 2. Control Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* GIS Territorial Connection Banner */}
          <div className="p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-info-soft)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-info)] shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs uppercase tracking-wide text-[var(--c-info)] font-bold px-2 py-0.5 rounded-md bg-[var(--c-surface)] border border-[var(--c-border)]">
                    Vinculado al zoom territorial GIS
                  </span>
                  <span className="text-xs font-bold text-[var(--c-ink)]">
                    {activeTerritory.fullName}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] uppercase font-bold">
                    Escala {activeTerritory.scale}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--c-muted)] mt-1">
                  {activeTerritory.electoralCensus && (
                    <span>Censo: <strong className="text-[var(--c-ink)]">{activeTerritory.electoralCensus.toLocaleString('es-CO')}</strong> votantes</span>
                  )}
                  {activeTerritory.population && (
                    <span>Población: <strong className="text-[var(--c-ink)]">{activeTerritory.population.toLocaleString('es-CO')}</strong> hab.</span>
                  )}
                  {activeTerritory.nbiPercentage && (
                    <span>NBI: <strong className="text-[var(--c-ink)]">{activeTerritory.nbiPercentage}%</strong></span>
                  )}
                  {activeTerritory.electedMayor && (
                    <span>Alcalde: <strong className="text-[var(--c-ink)]">{activeTerritory.electedMayor}</strong></span>
                  )}
                </div>
              </div>
            </div>

            {onNavigateToZoom && (
              <button
                type="button"
                onClick={onNavigateToZoom}
                className="shrink-0 min-h-9 px-3 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-ink)] text-xs font-semibold flex items-center gap-1.5"
                title="Volver al mapa GIS interactivo"
              >
                <span>Ver en Mapa GIS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* =========================================================================
              PANEL 1: NAVEGACIÓN TERRITORIAL EN 5 ESCALAS
              ========================================================================= */}
          <div className="p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] space-y-3.5">
            <div className="flex items-center justify-between border-b border-[var(--c-border)] pb-2.5">
              <h2 className="text-xs uppercase tracking-wide text-[var(--c-muted)] font-bold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[var(--c-accent)]" />
                Escala & Territorio Objetivo (5 Niveles Jerárquicos)
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-md bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] uppercase font-bold">
                {selectedScale}
              </span>
            </div>

            {/* 5-Scale Horizontal Selector Buttons */}
            <div className="grid grid-cols-5 gap-1 p-1 rounded-lg bg-[var(--c-sunken)] border border-[var(--c-border)] text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleSelectScale('nacional')}
                className={`py-1.5 px-1 rounded-md transition text-center flex flex-col items-center gap-0.5 ${
                  selectedScale === 'nacional'
                    ? 'bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] font-bold'
                    : 'text-[var(--c-muted)] hover:text-[var(--c-ink)]'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="text-xs truncate">1. Nacional</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectScale('departamental')}
                className={`py-1.5 px-1 rounded-md transition text-center flex flex-col items-center gap-0.5 ${
                  selectedScale === 'departamental'
                    ? 'bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] font-bold'
                    : 'text-[var(--c-muted)] hover:text-[var(--c-ink)]'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span className="text-xs truncate">2. Dptal.</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectScale('subregional')}
                className={`py-1.5 px-1 rounded-md transition text-center flex flex-col items-center gap-0.5 ${
                  selectedScale === 'subregional'
                    ? 'bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] font-bold'
                    : 'text-[var(--c-muted)] hover:text-[var(--c-ink)]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="text-xs truncate">3. Subregión</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectScale('municipal')}
                className={`py-1.5 px-1 rounded-md transition text-center flex flex-col items-center gap-0.5 ${
                  selectedScale === 'municipal'
                    ? 'bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] font-bold'
                    : 'text-[var(--c-muted)] hover:text-[var(--c-ink)]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="text-xs truncate">4. Municipio</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectScale('comuna-barrio')}
                className={`py-1.5 px-1 rounded-md transition text-center flex flex-col items-center gap-0.5 ${
                  selectedScale === 'comuna-barrio'
                    ? 'bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] font-bold'
                    : 'text-[var(--c-muted)] hover:text-[var(--c-ink)]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-xs truncate">5. Comuna/B.</span>
              </button>
            </div>

            {/* Cascading Specific Dropdowns depending on selected scale */}
            <div className="space-y-2 pt-1">
              {/* Scale 1: Nacional */}
              {selectedScale === 'nacional' && (
                <div className="p-3 rounded-lg bg-[var(--c-sunken)] border border-[var(--c-border)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[var(--c-accent)]" />
                    <div>
                      <div className="font-bold text-[var(--c-ink)]">República de Colombia</div>
                      <div className="text-xs text-[var(--c-muted)]">32 Departamentos + Bogotá D.C.</div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-[var(--c-ink)] font-bold">
                    Censo: {formatCensus(NATIONAL_CENSUS.total)}
                  </div>
                </div>
              )}

              {/* Scale 2: Departamental */}
              {selectedScale === 'departamental' && (
                <div className="space-y-1">
                  <label className="text-xs text-[var(--c-muted)] font-semibold">Selecciona el Departamento:</label>
                  <select
                    value={selectedDeptId}
                    onChange={(e) => handleSelectDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs font-semibold"
                  >
                    {departmentsList.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name} - Censo: {d.electoralCensus?.toLocaleString('es-CO')}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Scale 3: Subregional */}
              {selectedScale === 'subregional' && (
                <div className="space-y-1">
                  <label className="text-xs text-[var(--c-muted)] font-semibold">Selecciona la Subregión (Antioquia):</label>
                  <select
                    value={selectedSubregId}
                    onChange={(e) => handleSelectSubreg(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs font-semibold"
                  >
                    {subregionsList.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name} - Pob: {s.population?.toLocaleString('es-CO')}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Scale 4: Municipal */}
              {selectedScale === 'municipal' && (
                <div className="space-y-1">
                  <label className="text-xs text-[var(--c-muted)] font-semibold">Selecciona el Municipio (125 de Antioquia):</label>
                  <select
                    value={selectedMuniId}
                    onChange={(e) => handleSelectMuni(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-xs font-semibold"
                  >
                    {allMunicipalities.map(m => (
                      <option key={m.id} value={m.id}>
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
                    <label className="text-xs text-[var(--c-muted)] font-semibold">Comuna / Corregimiento:</label>
                    <select
                      value={selectedComunaId}
                      onChange={(e) => handleSelectComuna(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      {comunasList.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-[var(--c-muted)] font-semibold">Barrio Específico:</label>
                    <select
                      value={selectedBarrioId}
                      onChange={(e) => handleSelectBarrio(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg text-xs font-semibold"
                    >
                      <option value="all-comuna">
                        Toda la Comuna (General)
                      </option>
                      {barriosList.map(b => (
                        <option key={b.id} value={b.id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Micro-Data Badge of Selected Node */}
            <div className="p-3.5 rounded-lg bg-[var(--c-sunken)] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--c-accent-text)]">{currentTerritory.fullName}</span>
                <span className="text-xs text-[var(--c-muted)]">
                  {currentTerritory.electoralCensus ? `Censo: ${currentTerritory.electoralCensus.toLocaleString('es-CO')} votantes` : ''}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--c-muted)]">
                {currentTerritory.predominantStratum && <span>{currentTerritory.predominantStratum}</span>}
                {currentTerritory.nbiPercentage && <span>NBI: {currentTerritory.nbiPercentage}%</span>}
                {currentTerritory.subregionName && <span>Subregión: {currentTerritory.subregionName}</span>}
                {activeTerritory.electedMayor && <span className="text-[var(--c-ink)] font-bold">Alcaldía: {activeTerritory.electedMayor}</span>}
              </div>
              {activeTerritory.securityDynamics.extortionRisk && (
                <div className="text-xs text-[var(--c-warn)] truncate">
                  Seguridad: {activeTerritory.securityDynamics.extortionRisk}
                </div>
              )}
              {currentTerritory.keyIssues && currentTerritory.keyIssues[0] && (
                <div className="text-xs text-[var(--c-muted)] italic pt-1 border-t border-[var(--c-border)] truncate">
                  Problemática clave: {currentTerritory.keyIssues[0]}
                </div>
              )}
            </div>
          </div>

          {/* =========================================================================
              PANEL 2: SEGMENTACIÓN DE VOTANTES (CATÁLOGO COMPLETO)
              ========================================================================= */}
          <div className="p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] space-y-3.5">
            <div className="flex items-center justify-between border-b border-[var(--c-border)] pb-2.5">
              <h2 className="text-xs uppercase tracking-wide text-[var(--c-muted)] font-bold flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[var(--c-accent)]" />
                Segmento / Audiencia Específica ({VOTER_AUDIENCE_CATALOG.length} Grupos)
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-md bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] uppercase font-bold">
                {activeAudience.priority}
              </span>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
              <button
                type="button"
                onClick={() => setSelectedAudienceCategory('all')}
                className={`px-2.5 py-1 rounded-md shrink-0 transition ${
                  selectedAudienceCategory === 'all'
                    ? 'bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] font-bold'
                    : 'text-[var(--c-muted)] hover:text-[var(--c-ink)] bg-[var(--c-sunken)]'
                }`}
              >
                Todos ({VOTER_AUDIENCE_CATALOG.length})
              </button>
              {VOTER_AUDIENCE_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedAudienceCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-md shrink-0 transition ${
                    selectedAudienceCategory === cat.id
                      ? 'bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] font-bold'
                      : 'text-[var(--c-muted)] hover:text-[var(--c-ink)] bg-[var(--c-sunken)]'
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
                className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs"
              />
              <Search className="w-3.5 h-3.5 text-[var(--c-muted)] absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Audience Dropdown with Grouped Options */}
            <div className="space-y-1">
              <label className="text-xs text-[var(--c-muted)] font-semibold">Grupo de Votantes Seleccionado:</label>
              <select
                value={selectedAudienceId}
                onChange={(e) => setSelectedAudienceId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-xs font-semibold"
              >
                {VOTER_AUDIENCE_CATEGORIES.map(cat => {
                  const catAudiences = filteredAudiences.filter(a => a.category === cat.id);
                  if (catAudiences.length === 0) return null;
                  return (
                    <optgroup key={cat.id} label={cat.label}>
                      {catAudiences.map(a => (
                        <option key={a.id} value={a.id}>
                          {a.name} ({a.priority})
                        </option>
                      ))}
                    </optgroup>
                  );
                })}
              </select>
            </div>

            {/* Active Audience Insights Card */}
            <div className="p-3.5 rounded-lg bg-[var(--c-accent-soft)] space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-[var(--c-accent-text)]">{activeAudience.name}</div>
                  <div className="text-xs text-[var(--c-muted)] italic">{activeAudience.tagline}</div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-md bg-[var(--c-surface)] border border-[var(--c-border)] text-[var(--c-accent-text)] shrink-0">
                  ~{activeAudience.shareEstimatedNational}% Censo
                </span>
              </div>

              <div className="text-xs text-[var(--c-ink)]">
                <strong className="text-[var(--c-accent-text)]">Gatillo Psicológico:</strong> {activeAudience.psychologicalTrigger}
              </div>

              <div className="text-xs text-[var(--c-muted)]">
                <strong className="text-[var(--c-ink)]">Canales Top:</strong> {activeAudience.effectiveChannels.join(', ')}
              </div>
            </div>
          </div>

          {/* =========================================================================
              PANEL 3: FORMATO, TONO Y ENCUADRE COGNITIVO
              ========================================================================= */}
          <div className="p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] space-y-3.5">
            {/* Content Format Selector */}
            <div className="space-y-1.5">
              <label className="text-xs text-[var(--c-muted)] font-semibold flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-[var(--c-accent)]" />
                Formato del Contenido:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setContentFormat('video-short')}
                  className={`p-2 rounded-lg text-left border transition ${contentFormat === 'video-short' ? 'bg-[var(--c-accent-soft)] border-[var(--c-accent)] text-[var(--c-ink)] font-bold' : 'border-[var(--c-border)] bg-[var(--c-sunken)] text-[var(--c-muted)] hover:text-[var(--c-ink)]'}`}
                >
                  <Video className="w-3.5 h-3.5 text-[var(--c-accent)] mb-1" />
                  Video Corto (Reels / TikTok)
                </button>
                <button
                  type="button"
                  onClick={() => setContentFormat('speech-plaza')}
                  className={`p-2 rounded-lg text-left border transition ${contentFormat === 'speech-plaza' ? 'bg-[var(--c-accent-soft)] border-[var(--c-accent)] text-[var(--c-ink)] font-bold' : 'border-[var(--c-border)] bg-[var(--c-sunken)] text-[var(--c-muted)] hover:text-[var(--c-ink)]'}`}
                >
                  <Megaphone className="w-3.5 h-3.5 text-[var(--c-accent)] mb-1" />
                  Discurso de Plaza Pública
                </button>
                <button
                  type="button"
                  onClick={() => setContentFormat('whatsapp-community')}
                  className={`p-2 rounded-lg text-left border transition ${contentFormat === 'whatsapp-community' ? 'bg-[var(--c-accent-soft)] border-[var(--c-accent)] text-[var(--c-ink)] font-bold' : 'border-[var(--c-border)] bg-[var(--c-sunken)] text-[var(--c-muted)] hover:text-[var(--c-ink)]'}`}
                >
                  <Radio className="w-3.5 h-3.5 text-[var(--c-accent)] mb-1" />
                  WhatsApp / Redes Barriales
                </button>
                <button
                  type="button"
                  onClick={() => setContentFormat('debate-rebuttal')}
                  className={`p-2 rounded-lg text-left border transition ${contentFormat === 'debate-rebuttal' ? 'bg-[var(--c-accent-soft)] border-[var(--c-accent)] text-[var(--c-ink)] font-bold' : 'border-[var(--c-border)] bg-[var(--c-sunken)] text-[var(--c-muted)] hover:text-[var(--c-ink)]'}`}
                >
                  <AlertCircle className="w-3.5 h-3.5 text-[var(--c-accent)] mb-1" />
                  Debate & Respuesta a Ataques
                </button>
              </div>
            </div>

            {/* Key Topic */}
            <div className="space-y-1">
              <label className="text-xs text-[var(--c-muted)] font-semibold">Eje Temático Principal:</label>
              <input
                type="text"
                value={keyTopic}
                onChange={(e) => setKeyTopic(e.target.value)}
                placeholder="Ej. Seguridad, empleo juvenil, freno a la extorsión..."
                className="w-full px-3 py-2 rounded-lg text-xs font-semibold"
              />
            </div>

            {/* Tone of Voice */}
            <div className="space-y-1">
              <label className="text-xs text-[var(--c-muted)] font-semibold">Tono de Comunicación:</label>
              <select
                value={toneOfVoice}
                onChange={(e) => setToneOfVoice(e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-xs font-semibold"
              >
                <option value="Firmeza, Autoridad y Esperanza">Firmeza, Autoridad y Esperanza</option>
                <option value="Cercano, Empático y Protector">Cercano, Empático y Protector</option>
                <option value="Técnico, Resolutivo y Sin Carreta">Técnico, Resolutivo y Sin Carreta</option>
                <option value="Disruptivo, Frontal y Denunciante">Disruptivo, Frontal y Denunciante</option>
              </select>
            </div>

            {/* Cognitive Framing Selector (Protocolo PA-003) */}
            <div className="space-y-1.5 pt-2 border-t border-[var(--c-border)]">
              <label className="text-xs text-[var(--c-muted)] font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--c-accent)]" />
                  Persuasión cognitiva:
                </span>
                <span className="text-xs text-[var(--c-muted)]">Prospect Theory</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCognitiveFraming('gain-hope')}
                  className={`p-2 rounded-lg text-center border transition text-xs ${
                    cognitiveFraming === 'gain-hope'
                      ? 'bg-[var(--c-ok-soft)] border-[var(--c-ok)] text-[var(--c-ok)] font-bold'
                      : 'border-[var(--c-border)] bg-[var(--c-sunken)] text-[var(--c-muted)] hover:text-[var(--c-ink)]'
                  }`}
                >
                  <div className="font-bold">Ganancia</div>
                  <div className="text-xs text-[var(--c-muted)]">Esperanza</div>
                </button>
                <button
                  type="button"
                  onClick={() => setCognitiveFraming('loss-protection')}
                  className={`p-2 rounded-lg text-center border transition text-xs ${
                    cognitiveFraming === 'loss-protection'
                      ? 'bg-[var(--c-warn-soft)] border-[var(--c-warn)] text-[var(--c-warn)] font-bold'
                      : 'border-[var(--c-border)] bg-[var(--c-sunken)] text-[var(--c-muted)] hover:text-[var(--c-ink)]'
                  }`}
                >
                  <div className="font-bold">Pérdida</div>
                  <div className="text-xs text-[var(--c-muted)]">Blindaje</div>
                </button>
                <button
                  type="button"
                  onClick={() => setCognitiveFraming('balanced')}
                  className={`p-2 rounded-lg text-center border transition text-xs ${
                    cognitiveFraming === 'balanced'
                      ? 'bg-[var(--c-info-soft)] border-[var(--c-info)] text-[var(--c-info)] font-bold'
                      : 'border-[var(--c-border)] bg-[var(--c-sunken)] text-[var(--c-muted)] hover:text-[var(--c-ink)]'
                  }`}
                >
                  <div className="font-bold">Equilibrio</div>
                  <div className="text-xs text-[var(--c-muted)]">Riesgo + Victoria</div>
                </button>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateBrief}
              disabled={isGenerating}
              className="w-full min-h-9 py-3 rounded-lg bg-[var(--c-accent)] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition disabled:opacity-50"
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
          <div className="p-5 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] flex flex-col min-h-[640px]">
            <div className="flex items-center justify-between border-b border-[var(--c-border)] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--c-accent)]" />
                <span className="text-xs uppercase text-[var(--c-ink)] font-bold tracking-wide">
                  Brief Estratégico Generado
                </span>
              </div>

              {generatedBrief && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="min-h-8 px-2 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-muted)] hover:text-[var(--c-ink)] transition flex items-center gap-1 text-xs"
                    title="Copiar al portapapeles"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[var(--c-ok)]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar'}</span>
                  </button>

                  <button
                    onClick={handleDownloadPdf}
                    className="min-h-8 px-2 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-muted)] hover:text-[var(--c-ink)] transition flex items-center gap-1 text-xs"
                    title="Descargar en PDF Institucional"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">PDF</span>
                  </button>

                  {onSaveToDrive && (
                    <button
                      onClick={handleSaveDrive}
                      className="min-h-8 px-2 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-muted)] hover:text-[var(--c-ink)] transition flex items-center gap-1 text-xs"
                      title="Guardar en Archivos guardados"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{savedSuccess ? 'Guardado' : 'Guardar'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-[var(--c-sunken)] rounded-lg border border-[var(--c-border)] p-4 overflow-y-auto max-h-[600px] text-xs sm:text-sm text-[var(--c-ink)] leading-relaxed whitespace-pre-wrap">
              {generatedBrief ? (
                generatedBrief
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[var(--c-muted)] space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--c-surface)] border border-[var(--c-border)] flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[var(--c-accent)]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--c-ink)]">Esperando Parámetros</h4>
                    <p className="text-xs text-[var(--c-muted)] max-w-sm mt-1">
                      Selecciona la escala territorial (Nacional a Comuna/Barrio) y el grupo de votantes. Haz clic en "Generar Brief" para construir la estrategia.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Status */}
            {generatedBrief && (
              <div className="pt-3 border-t border-[var(--c-border)] mt-3 flex items-center justify-between text-xs text-[var(--c-muted)]">
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

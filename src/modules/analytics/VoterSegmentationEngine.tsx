import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Target, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Share2, 
  Download, 
  Brain, 
  Radio, 
  MessageSquare, 
  AlertTriangle,
  MapPin,
  ChevronRight,
  Filter,
  Save,
  GraduationCap,
  DollarSign,
  Calendar,
  UserCheck,
  Search,
  FileSpreadsheet,
  BarChart3,
  Award,
  ArrowRight,
  Globe,
  Building2
} from 'lucide-react';
import { municipalRepository, UnifiedMunicipalityRecord } from '../../services/municipalRepositoryService';
import { CandidateProfile } from '../../components/CandidateProfileManager';
import { callGeminiApi, formatAiError } from '../../services/geminiService';
import { 
  VoterDemographicsService, 
  DemographicCohort, 
  CircumscriptionContext,
  GenderType,
  AgeGroupType,
  EconomicLevelType,
  EducationLevelType 
} from '../../services/voterDemographicsService';
import { TerritoryHierarchyService } from '../../services/territoryHierarchyService';

interface VoterSegmentationEngineProps {
  candidateProfile: CandidateProfile;
  onSaveToDrive?: (title: string, data: any) => void;
}

export type CircumscriptionLevel = 'nacional' | 'departamental' | 'subregional' | 'municipal' | 'comuna-barrio';

export const VoterSegmentationEngine: React.FC<VoterSegmentationEngineProps> = ({
  candidateProfile,
  onSaveToDrive
}) => {
  const allMunicipalities = useMemo(() => municipalRepository.getAll(), []);
  const departmentsList = useMemo(() => TerritoryHierarchyService.getDepartments(), []);
  const subregionsList = useMemo(() => TerritoryHierarchyService.getSubregions(), []);
  const comunasList = useMemo(() => TerritoryHierarchyService.getComunas(), []);
  
  // 1. Circumscription State across 5 scales
  const [circumscriptionLevel, setCircumscriptionLevel] = useState<CircumscriptionLevel>('municipal');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('dept-antioquia');
  const [selectedSubregId, setSelectedSubregId] = useState<string>('subreg-valle-de-aburra');
  const [selectedMuniId, setSelectedMuniId] = useState<string>('mpio-05001'); // Medellín default
  const [selectedComunaId, setSelectedComunaId] = useState<string>('comuna-11'); // Laureles default

  // 2. The 4 Demographic Variables State (with 'all' option)
  const [selectedGender, setSelectedGender] = useState<GenderType | 'all'>('all');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroupType | 'all'>('all');
  const [selectedEconomicLevel, setSelectedEconomicLevel] = useState<EconomicLevelType | 'all'>('all');
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<EducationLevelType | 'all'>('all');

  // 3. UI State
  const [searchTableQuery, setSearchTableQuery] = useState<string>('');
  const [isGeneratingAiArchetype, setIsGeneratingAiArchetype] = useState<boolean>(false);
  const [aiCustomInsight, setAiCustomInsight] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [selectedCohortId, setSelectedCohortId] = useState<string | null>(null);

  const currentMuni = useMemo(() => {
    return municipalRepository.getMunicipality(selectedMuniId) || allMunicipalities[0];
  }, [selectedMuniId, allMunicipalities]);

  // Context resolved for calculations across 5 scales
  const activeContext: CircumscriptionContext = useMemo(() => {
    if (circumscriptionLevel === 'nacional') {
      return {
        id: 'nacional',
        type: 'nacional',
        name: 'Colombia (Nacional)',
        census: 39200000,
        nbiPercentage: 19.6,
        urbanPercentage: 77.0
      };
    } else if (circumscriptionLevel === 'departamental') {
      const deptNode = departmentsList.find(d => d.id === selectedDeptId) || departmentsList[0];
      return {
        id: deptNode.id,
        type: 'departamental',
        name: `${deptNode.name} (Departamental)`,
        census: deptNode.electoralCensus || 5350000,
        nbiPercentage: deptNode.nbiPercentage || 16.5,
        urbanPercentage: 79.5
      };
    } else if (circumscriptionLevel === 'subregional') {
      const subregNode = subregionsList.find(s => s.id === selectedSubregId) || subregionsList[0];
      return {
        id: subregNode.id,
        type: 'departamental',
        name: `Subregión ${subregNode.name} (Antioquia)`,
        census: subregNode.electoralCensus || 450000,
        nbiPercentage: subregNode.nbiPercentage || 22.0,
        urbanPercentage: 68.0
      };
    } else if (circumscriptionLevel === 'comuna-barrio') {
      const comunaNode = comunasList.find(c => c.id === selectedComunaId) || comunasList[10];
      return {
        id: comunaNode.id,
        type: 'municipal',
        name: `${comunaNode.name} (Medellín)`,
        census: comunaNode.electoralCensus || 85000,
        nbiPercentage: comunaNode.nbiPercentage || 5.0,
        urbanPercentage: 99.0
      };
    } else {
      return {
        id: currentMuni.id,
        type: 'municipal',
        name: `${currentMuni.name} (${currentMuni.subregion})`,
        census: currentMuni.electoralCensus || 50000,
        nbiPercentage: currentMuni.nbiPercentage || 15.0,
        urbanPercentage: currentMuni.population > 200000 ? 92.0 : 65.0
      };
    }
  }, [circumscriptionLevel, selectedDeptId, selectedSubregId, selectedMuniId, selectedComunaId, currentMuni, departmentsList, subregionsList, comunasList]);

  // Generate all 54 cohorts for this active context
  const all54Cohorts = useMemo(() => {
    return VoterDemographicsService.generateAllCohorts(activeContext, candidateProfile.nombre);
  }, [activeContext, candidateProfile.nombre]);

  // Filter cohorts matching the 4 selected variables
  const filteredCohorts = useMemo(() => {
    return all54Cohorts.filter((c) => {
      if (selectedGender !== 'all' && c.gender !== selectedGender) return false;
      if (selectedAgeGroup !== 'all' && c.ageGroup !== selectedAgeGroup) return false;
      if (selectedEconomicLevel !== 'all' && c.economicLevel !== selectedEconomicLevel) return false;
      if (selectedEducationLevel !== 'all' && c.educationLevel !== selectedEducationLevel) return false;
      return true;
    });
  }, [all54Cohorts, selectedGender, selectedAgeGroup, selectedEconomicLevel, selectedEducationLevel]);

  // Quantified summary for current filtered selection
  const filteredSummary = useMemo(() => {
    const totalCensus = activeContext.census;
    const estimatedPopulation = filteredCohorts.reduce((acc, c) => acc + c.estimatedPopulation, 0);
    const estimatedVotes = filteredCohorts.reduce((acc, c) => acc + c.estimatedActualVotes, 0);
    const avgTurnout = estimatedPopulation > 0 ? (estimatedVotes / estimatedPopulation) * 100 : 0;
    const shareOfCensus = totalCensus > 0 ? (estimatedPopulation / totalCensus) * 100 : 0;

    return {
      count: filteredCohorts.length,
      estimatedPopulation,
      estimatedVotes,
      avgTurnout: Number(avgTurnout.toFixed(1)),
      shareOfCensus: Number(shareOfCensus.toFixed(2))
    };
  }, [filteredCohorts, activeContext.census]);

  // Currently focused cohort (first filtered or explicitly chosen)
  const focusedCohort: DemographicCohort = useMemo(() => {
    if (selectedCohortId) {
      const found = all54Cohorts.find((c) => c.id === selectedCohortId);
      if (found) return found;
    }
    return filteredCohorts[0] || all54Cohorts[0];
  }, [selectedCohortId, filteredCohorts, all54Cohorts]);

  // Deep AI synthesis for this specific demographic group and territory
  const handleGenerateAiArchetype = async () => {
    setIsGeneratingAiArchetype(true);
    setAiError(null);

    try {
      const prompt = `Actúa como Director de Inteligencia Electoral y Psicografía Política de Proyecto Proteus.

[PARÁMETROS DEL GRUPO DEMOGRÁFICO CUANTIFICADO]:
- Circunscripción: ${activeContext.name} (Censo total: ${activeContext.census.toLocaleString()} votantes)
- Segmento Específico: ${focusedCohort.fullTitle}
- Cuantificación en Territorio: ${focusedCohort.estimatedPopulation.toLocaleString()} ciudadanos (${focusedCohort.shareOfCensus}% del censo)
- Participación Esperada (Turnout): ${focusedCohort.expectedTurnoutRate}% (${focusedCohort.estimatedActualVotes.toLocaleString()} votos reales en urnas)
- Prioridad Táctica: ${focusedCohort.tacticalPriority}

[CANDIDATO]:
- Nombre: ${candidateProfile.nombre}
- Tono: ${candidateProfile.tonoNarrativo || 'Firme, cercano y propositivo'}
- Afiliación: ${candidateProfile.afiliacionPartidista || 'Liderazgo Independiente'}

Elabora un DIAGNÓSTICO PSICOGRÁFICO Y GUÍA DE ACCIÓN DE MICRO-TARGETING en 4 secciones concretas:
1. RADIOGRAFÍA PSICOGRÁFICA Y MIEDOS NO DECLARADOS: Qué le quita el sueño a este grupo específico en ${activeContext.name}.
2. PALABRAS DE PODER Y METÁFORAS GANADORAS: Vocabulario exacto que ${candidateProfile.nombre} debe usar al hablarles.
3. PROPUESTA BANDERA QUE CONVIERTE SU VOTO: La medida específica que los convence de votar por el candidato.
4. CANAL Y FORMATO DE DESPLIEGUE: Cómo alcanzarlos sin desperdiciar presupuesto (digital vs territorial).`;

      const res = await callGeminiApi({
        promptText: prompt,
        systemInstruction: 'Eres el Director de Inteligencia Electoral de Proteus. Redacta diagnósticos psicográficos precisos, contundentes y aplicables en campaña.',
        useSearch: true
      });
      setAiCustomInsight(res);
    } catch (e: any) {
      setAiError(formatAiError(e));
    } finally {
      setIsGeneratingAiArchetype(false);
    }
  };

  const handleResetFilters = () => {
    setSelectedGender('all');
    setSelectedAgeGroup('all');
    setSelectedEconomicLevel('all');
    setSelectedEducationLevel('all');
    setSelectedCohortId(null);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 text-white">
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-950/40 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.4)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-gradient-to-r from-sky-400/20 via-indigo-400/20 to-purple-500/30 text-sky-300 border border-sky-400/50 shadow-[0_0_12px_rgba(56,189,248,0.3)] flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-sky-400" />
                Propósito 2: Analista y Recopilador de Información
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                Segmentación Cuatridimensional (54 Cohortes)
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>IDENTIFICACIÓN & CUANTIFICACIÓN DEMOGRÁFICA 4D</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
              Cruce exhaustivo de 4 variables: <strong className="text-white">Sexo</strong> (Hombre/Mujer) $\times$ <strong className="text-white">Grupo Etario</strong> (Joven/Adulto/Adulto Mayor) $\times$ <strong className="text-white">Nivel Económico</strong> (Alto/Medio/Bajo) $\times$ <strong className="text-white">Grado Educativo</strong> (Primaria/Secundaria/Superior).
            </p>
          </div>

          {/* Active Candidate Badge */}
          <div className="shrink-0 p-3 rounded-2xl bg-white/05 border border-white/15 backdrop-blur-xl">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Candidato Activo</div>
            <div className="text-sm font-black text-amber-300 mt-0.5">{candidateProfile.nombre}</div>
            <div className="text-[10px] text-slate-400">{candidateProfile.afiliacionPartidista || 'Proyecto Político'}</div>
          </div>
        </div>

        {/* Circunscription Selector Tabs across 5 Scales */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1 shrink-0">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              Escala Territorial:
            </span>
            <div className="flex flex-wrap items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/10">
              <button
                onClick={() => setCircumscriptionLevel('nacional')}
                className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                  circumscriptionLevel === 'nacional'
                    ? 'bg-sky-500/30 text-white border border-sky-400/60 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🇨🇴 Nacional</span>
                <span className="text-[9px] font-mono text-slate-400">(39.2M)</span>
              </button>
              <button
                onClick={() => setCircumscriptionLevel('departamental')}
                className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                  circumscriptionLevel === 'departamental'
                    ? 'bg-emerald-500/30 text-white border border-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🏛️ Departamental</span>
                <span className="text-[9px] font-mono text-slate-400">(33 Deptos)</span>
              </button>
              <button
                onClick={() => setCircumscriptionLevel('subregional')}
                className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                  circumscriptionLevel === 'subregional'
                    ? 'bg-indigo-500/30 text-white border border-indigo-400/60 shadow-[0_0_10px_rgba(99,102,241,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🌲 Subregional</span>
                <span className="text-[9px] font-mono text-slate-400">(9 Subreg)</span>
              </button>
              <button
                onClick={() => setCircumscriptionLevel('municipal')}
                className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                  circumscriptionLevel === 'municipal'
                    ? 'bg-amber-500/30 text-white border border-amber-400/60 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🏙️ Municipal</span>
                <span className="text-[9px] font-mono text-slate-400">(125 Mpios)</span>
              </button>
              <button
                onClick={() => setCircumscriptionLevel('comuna-barrio')}
                className={`px-3 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                  circumscriptionLevel === 'comuna-barrio'
                    ? 'bg-purple-500/30 text-white border border-purple-400/60 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>📍 Comuna / Barrio</span>
                <span className="text-[9px] font-mono text-slate-400">(Medellín)</span>
              </button>
            </div>
          </div>

          {/* Cascading Specific Selector Dropdown */}
          <div className="flex items-center gap-2">
            {circumscriptionLevel === 'departamental' && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1 shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  Departamento:
                </label>
                <select
                  value={selectedDeptId}
                  onChange={(e) => setSelectedDeptId(e.target.value)}
                  className="w-full sm:w-64 px-3 py-1.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-emerald-400 backdrop-blur-xl"
                >
                  {departmentsList.map((d) => (
                    <option key={d.id} value={d.id} className="bg-slate-900 text-white">
                      {d.name} {d.electoralCensus ? `(Censo: ${d.electoralCensus.toLocaleString()})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {circumscriptionLevel === 'subregional' && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1 shrink-0">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  Subregión:
                </label>
                <select
                  value={selectedSubregId}
                  onChange={(e) => setSelectedSubregId(e.target.value)}
                  className="w-full sm:w-64 px-3 py-1.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-indigo-400 backdrop-blur-xl"
                >
                  {subregionsList.map((s) => (
                    <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                      {s.name} ({s.municipalityCount} mpios) - Censo: {s.electoralCensus?.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {circumscriptionLevel === 'municipal' && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Municipio:
                </label>
                <select
                  value={selectedMuniId}
                  onChange={(e) => setSelectedMuniId(e.target.value)}
                  className="w-full sm:w-64 px-3 py-1.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-amber-400 backdrop-blur-xl"
                >
                  {allMunicipalities.map((m) => (
                    <option key={m.id} value={m.id} className="bg-slate-900 text-white">
                      {m.name} ({m.subregion}) - Censo: {m.electoralCensus?.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {circumscriptionLevel === 'comuna-barrio' && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  Comuna:
                </label>
                <select
                  value={selectedComunaId}
                  onChange={(e) => setSelectedComunaId(e.target.value)}
                  className="w-full sm:w-64 px-3 py-1.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-purple-400 backdrop-blur-xl"
                >
                  {comunasList.map((c) => (
                    <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                      {c.name} {c.electoralCensus ? `(Censo: ${c.electoralCensus.toLocaleString()})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Bar for Active Circumscription */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Censo de la Circunscripción</div>
          <div className="text-xl font-black text-white font-mono mt-1">
            {activeContext.census.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 truncate">{activeContext.name}</div>
        </div>

        <div className="p-4 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Grupos en Disputa</div>
          <div className="text-xl font-black text-sky-300 font-mono mt-1">
            {filteredSummary.count} <span className="text-xs font-normal text-slate-400">/ 54 cohortes</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Espacio muestral 4D completo</div>
        </div>

        <div className="p-4 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Población del Cruce Activo</div>
          <div className="text-xl font-black text-amber-300 font-mono mt-1">
            {filteredSummary.estimatedPopulation.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
            {filteredSummary.shareOfCensus}% del censo total
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-emerald-400/30">
          <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Votos Proyectados en Urnas</div>
          <div className="text-xl font-black text-emerald-300 font-mono mt-1">
            {filteredSummary.estimatedVotes.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
            Participación esperada: {filteredSummary.avgTurnout}%
          </div>
        </div>
      </div>

      {/* 3. The 4-Variable Interactive Selector Quadrant */}
      <div className="p-5 rounded-3xl bg-slate-950/40 backdrop-blur-3xl border border-white/15 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Variables de Cruce Demográfico Cuatridimensional
            </h2>
          </div>
          <button
            onClick={handleResetFilters}
            className="text-[11px] font-mono text-sky-400 hover:text-sky-300 transition underline underline-offset-2"
          >
            Ver Todas las 54 Cohortes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Variable 1: Sexo */}
          <div className="p-3.5 rounded-2xl bg-white/05 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-slate-300 font-bold">
              <span className="flex items-center gap-1.5 text-sky-300">
                <UserCheck className="w-3.5 h-3.5" />
                1. Sexo:
              </span>
              <span className="text-[10px] font-mono text-slate-400">2 Opciones</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 font-medium">
              <button
                onClick={() => setSelectedGender('all')}
                className={`py-1.5 px-2 rounded-xl text-center transition ${
                  selectedGender === 'all'
                    ? 'bg-sky-500/30 text-white border border-sky-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedGender('hombre')}
                className={`py-1.5 px-2 rounded-xl text-center transition ${
                  selectedGender === 'hombre'
                    ? 'bg-sky-500/30 text-white border border-sky-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
              >
                Hombre
              </button>
              <button
                onClick={() => setSelectedGender('mujer')}
                className={`py-1.5 px-2 rounded-xl text-center transition ${
                  selectedGender === 'mujer'
                    ? 'bg-sky-500/30 text-white border border-sky-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
              >
                Mujer
              </button>
            </div>
          </div>

          {/* Variable 2: Grupo Etario */}
          <div className="p-3.5 rounded-2xl bg-white/05 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-slate-300 font-bold">
              <span className="flex items-center gap-1.5 text-indigo-300">
                <Calendar className="w-3.5 h-3.5" />
                2. Grupo Etario:
              </span>
              <span className="text-[10px] font-mono text-slate-400">3 Opciones</span>
            </div>
            <div className="grid grid-cols-4 gap-1 font-medium text-[11px]">
              <button
                onClick={() => setSelectedAgeGroup('all')}
                className={`py-1.5 rounded-xl text-center transition ${
                  selectedAgeGroup === 'all'
                    ? 'bg-indigo-500/30 text-white border border-indigo-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedAgeGroup('joven')}
                className={`py-1.5 rounded-xl text-center transition ${
                  selectedAgeGroup === 'joven'
                    ? 'bg-indigo-500/30 text-white border border-indigo-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
                title="18 a 28 años"
              >
                Joven
              </button>
              <button
                onClick={() => setSelectedAgeGroup('adulto')}
                className={`py-1.5 rounded-xl text-center transition ${
                  selectedAgeGroup === 'adulto'
                    ? 'bg-indigo-500/30 text-white border border-indigo-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
                title="29 a 59 años"
              >
                Adulto
              </button>
              <button
                onClick={() => setSelectedAgeGroup('adulto_mayor')}
                className={`py-1.5 rounded-xl text-center transition ${
                  selectedAgeGroup === 'adulto_mayor'
                    ? 'bg-indigo-500/30 text-white border border-indigo-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
                title="60+ años"
              >
                Mayor
              </button>
            </div>
          </div>

          {/* Variable 3: Nivel Económico / Estrato */}
          <div className="p-3.5 rounded-2xl bg-white/05 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-slate-300 font-bold">
              <span className="flex items-center gap-1.5 text-amber-300">
                <DollarSign className="w-3.5 h-3.5" />
                3. Nivel Económico:
              </span>
              <span className="text-[10px] font-mono text-slate-400">3 Opciones</span>
            </div>
            <div className="grid grid-cols-4 gap-1 font-medium text-[11px]">
              <button
                onClick={() => setSelectedEconomicLevel('all')}
                className={`py-1.5 rounded-xl text-center transition ${
                  selectedEconomicLevel === 'all'
                    ? 'bg-amber-500/30 text-white border border-amber-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedEconomicLevel('bajo')}
                className={`py-1.5 rounded-xl text-center transition ${
                  selectedEconomicLevel === 'bajo'
                    ? 'bg-amber-500/30 text-white border border-amber-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
                title="Estratos 1 y 2"
              >
                Bajo
              </button>
              <button
                onClick={() => setSelectedEconomicLevel('medio')}
                className={`py-1.5 rounded-xl text-center transition ${
                  selectedEconomicLevel === 'medio'
                    ? 'bg-amber-500/30 text-white border border-amber-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
                title="Estratos 3 y 4"
              >
                Medio
              </button>
              <button
                onClick={() => setSelectedEconomicLevel('alto')}
                className={`py-1.5 rounded-xl text-center transition ${
                  selectedEconomicLevel === 'alto'
                    ? 'bg-amber-500/30 text-white border border-amber-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
                title="Estratos 5 y 6"
              >
                Alto
              </button>
            </div>
          </div>

          {/* Variable 4: Grado Educativo */}
          <div className="p-3.5 rounded-2xl bg-white/05 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-slate-300 font-bold">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <GraduationCap className="w-3.5 h-3.5" />
                4. Grado Educativo:
              </span>
              <span className="text-[10px] font-mono text-slate-400">3 Opciones</span>
            </div>
            <div className="grid grid-cols-4 gap-1 font-medium text-[11px]">
              <button
                onClick={() => setSelectedEducationLevel('all')}
                className={`py-1.5 rounded-xl text-center transition ${
                  selectedEducationLevel === 'all'
                    ? 'bg-emerald-500/30 text-white border border-emerald-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedEducationLevel('primaria')}
                className={`py-1.5 rounded-xl text-center transition ${
                  selectedEducationLevel === 'primaria'
                    ? 'bg-emerald-500/30 text-white border border-emerald-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
                title="Básica Primaria"
              >
                Primaria
              </button>
              <button
                onClick={() => setSelectedEducationLevel('secundaria')}
                className={`py-1.5 rounded-xl text-center transition ${
                  selectedEducationLevel === 'secundaria'
                    ? 'bg-emerald-500/30 text-white border border-emerald-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
                title="Bachillerato o Técnico"
              >
                Secund.
              </button>
              <button
                onClick={() => setSelectedEducationLevel('superior')}
                className={`py-1.5 rounded-xl text-center transition ${
                  selectedEducationLevel === 'superior'
                    ? 'bg-emerald-500/30 text-white border border-emerald-400 font-bold'
                    : 'bg-black/20 text-slate-400 hover:text-white border border-white/05'
                }`}
                title="Universitario o Posgrado"
              >
                Superior
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Focused Cohort Deep Analysis Card */}
      <div className="p-6 rounded-3xl bg-slate-950/45 backdrop-blur-3xl border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.5)] space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                focusedCohort.tacticalPriority === 'Pivotal'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-400/40'
                  : focusedCohort.tacticalPriority === 'Alta'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                  : 'bg-sky-500/20 text-sky-300 border-sky-400/40'
              }`}>
                Prioridad: {focusedCohort.tacticalPriority}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {activeContext.name}
              </span>
            </div>
            <h3 className="text-xl font-black text-white capitalize">
              {focusedCohort.fullTitle}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 italic">
              "{focusedCohort.tagline}"
            </p>
          </div>

          <div className="flex items-center gap-4 bg-black/40 p-3 rounded-2xl border border-white/10 shrink-0">
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Potencial en Censo</div>
              <div className="text-lg font-black text-sky-400 font-mono">
                {focusedCohort.estimatedPopulation.toLocaleString()}
                <span className="text-xs text-slate-400 font-normal ml-1">({focusedCohort.shareOfCensus}%)</span>
              </div>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Votos en Urnas</div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                ~{focusedCohort.estimatedActualVotes.toLocaleString()}
                <span className="text-xs text-slate-400 font-normal ml-1">({focusedCohort.expectedTurnoutRate}% part.)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1: Dominant Concerns */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Preocupaciones & Dolores Clave
            </div>
            <ul className="space-y-1.5">
              {focusedCohort.dominantIssues.map((issue, idx) => (
                <li key={idx} className="p-2.5 rounded-xl bg-white/05 border border-white/10 text-xs text-slate-200 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Effective Communication Channels */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5" />
              Canales de Mayor Penetración
            </div>
            <div className="space-y-1.5">
              {focusedCohort.effectiveChannels.map((channel, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/25 text-xs text-sky-200 flex items-center justify-between">
                  <span>{channel}</span>
                  <span className="text-[10px] font-mono text-sky-400 font-bold">Directo</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Narrative Angle & Counter-objections */}
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 space-y-1.5">
              <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                Ángulo Discursivo para {candidateProfile.nombre}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {focusedCohort.narrativeAngle}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/05 border border-white/10 space-y-1">
              <div className="text-[11px] font-mono font-bold text-slate-300 uppercase">
                Cómo Desactivar su Principal Objeción:
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {focusedCohort.counterObjection}
              </p>
            </div>
          </div>
        </div>

        {/* AI Generator Action Button */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Afinidad con el Candidato: {focusedCohort.candidateFitScore}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onSaveToDrive && (
              <button
                onClick={() => onSaveToDrive(`Demografia_${focusedCohort.fullTitle}_${activeContext.name}`, focusedCohort)}
                className="px-3.5 py-2 rounded-2xl bg-white/05 hover:bg-white/10 border border-white/15 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5 text-sky-400" />
                <span>Guardar en Drive</span>
              </button>
            )}

            <button
              onClick={handleGenerateAiArchetype}
              disabled={isGeneratingAiArchetype}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-sky-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(251,191,36,0.3)] transition disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 text-amber-300 ${isGeneratingAiArchetype ? 'animate-spin' : ''}`} />
              <span>{isGeneratingAiArchetype ? 'Consultando Gemini 3.8...' : 'Estrategia Micro-Targeting con IA'}</span>
            </button>
          </div>
        </div>

        {/* AI Custom Strategy Box */}
        {aiError && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-400/30 text-rose-200 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{aiError}</span>
          </div>
        )}

        {aiCustomInsight && (
          <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-950/80 to-purple-950/40 border border-indigo-400/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-400" />
                <span>Guía Operativa de Persuasión IA • Gemini 3.8 Flash</span>
              </div>
              <button
                onClick={() => setAiCustomInsight(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cerrar
              </button>
            </div>
            <div className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/10 max-h-[400px] overflow-y-auto font-sans">
              {aiCustomInsight}
            </div>
          </div>
        )}
      </div>

      {/* 5. Complete Quantification Matrix (The 54 Cohorts Table) */}
      <div className="p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              Matriz Completa de Cuantificación Demográfica (54 Grupos)
            </div>
            <h3 className="text-sm font-black text-white mt-0.5">
              Censo y Votos Estimados en {activeContext.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-72">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar grupo demográfico..."
                value={searchTableQuery}
                onChange={(e) => setSearchTableQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-medium focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/15 text-[10px] font-mono uppercase text-slate-400 font-bold">
                <th className="py-2.5 px-3">Grupo Demográfico (4D)</th>
                <th className="py-2.5 px-2">Sexo</th>
                <th className="py-2.5 px-2">Edad</th>
                <th className="py-2.5 px-2">Estrato</th>
                <th className="py-2.5 px-2">Educación</th>
                <th className="py-2.5 px-2 text-right">Censo Est.</th>
                <th className="py-2.5 px-2 text-right">% Censo</th>
                <th className="py-2.5 px-2 text-right">Votos Est.</th>
                <th className="py-2.5 px-2 text-center">Prioridad</th>
                <th className="py-2.5 px-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {all54Cohorts
                .filter((c) => {
                  if (!searchTableQuery) return true;
                  return c.fullTitle.toLowerCase().includes(searchTableQuery.toLowerCase());
                })
                .slice(0, 20)
                .map((cohort) => (
                  <tr
                    key={cohort.id}
                    className={`hover:bg-white/05 transition ${
                      cohort.id === focusedCohort.id ? 'bg-sky-500/10' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-white capitalize">
                      {cohort.fullTitle}
                    </td>
                    <td className="py-2.5 px-2 text-slate-300 capitalize">{cohort.gender}</td>
                    <td className="py-2.5 px-2 text-slate-300 capitalize">{cohort.ageGroup.replace('_', ' ')}</td>
                    <td className="py-2.5 px-2 text-slate-300 capitalize">{cohort.economicLevel}</td>
                    <td className="py-2.5 px-2 text-slate-300 capitalize">{cohort.educationLevel}</td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-200">
                      {cohort.estimatedPopulation.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-400">
                      {cohort.shareOfCensus}%
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold text-emerald-300">
                      {cohort.estimatedActualVotes.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                        cohort.tacticalPriority === 'Pivotal'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-400/30'
                          : cohort.tacticalPriority === 'Alta'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-400/30'
                          : 'bg-sky-500/20 text-sky-300 border-sky-400/30'
                      }`}>
                        {cohort.tacticalPriority}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => setSelectedCohortId(cohort.id)}
                        className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-sky-300 text-[10px] font-bold transition"
                      >
                        Analizar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="text-[10px] font-mono text-slate-400 text-right pt-2">
            Mostrando las 20 cohortes con mayor peso electoral de las 54 combinaciones posibles.
          </div>
        </div>
      </div>
    </div>
  );
};

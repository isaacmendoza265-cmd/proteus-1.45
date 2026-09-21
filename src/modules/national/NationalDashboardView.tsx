import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  MapPin, 
  Building2, 
  Info, 
  TrendingUp, 
  Shield, 
  Sparkles, 
  Loader2, 
  Search, 
  FileText, 
  BarChart3,
  ChevronRight,
  X,
  Compass,
  Layers
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { 
  COLOMBIA_REGIONS, 
  NATIONAL_SUBREGION_DETAILS, 
  NATIONAL_MUNICIPALITIES 
} from '../../data/antioquiaData';
import { DEPARTMENT_NBI_SUMMARY, MUNICIPALITY_NBI_DATA, MunicipalityNBI } from '../../data/nbiDetailedData';
import { ai, formatAiError } from '../../services/geminiService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const NationalDashboardView: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>("andina");
  const [selectedDeptName, setSelectedDeptName] = useState<string>("Valle del Cauca");
  const [selectedSubregion, setSelectedSubregion] = useState<string | null>(null);
  const [selectedMuni, setSelectedMuni] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'departamento' | 'municipios'>('municipios');
  
  // Department IA report
  const [deptReport, setDeptReport] = useState<{ name: string; text: string } | null>(null);
  const [isGeneratingDeptReport, setIsGeneratingDeptReport] = useState<boolean>(false);

  // Municipal IA report
  const [muniSearchTerm, setMuniSearchTerm] = useState<string>("");
  const [muniReport, setMuniReport] = useState<{ name: string; text: string } | null>(null);
  const [isGeneratingMuniReport, setIsGeneratingMuniReport] = useState<boolean>(false);

  // Active region
  const activeRegion = useMemo(() => {
    return COLOMBIA_REGIONS.find(r => r.id === selectedRegionId) || COLOMBIA_REGIONS[0];
  }, [selectedRegionId]);

  // Active department
  const activeDepartment = useMemo(() => {
    return activeRegion.departments.find(d => d.name === selectedDeptName) || activeRegion.departments[0];
  }, [activeRegion, selectedDeptName]);

  // NBI summary for active department
  const deptNbi = useMemo(() => {
    if (!activeDepartment) return null;
    return DEPARTMENT_NBI_SUMMARY[activeDepartment.name.toUpperCase() as keyof typeof DEPARTMENT_NBI_SUMMARY] || null;
  }, [activeDepartment]);

  // Subregions and municipalities of this department
  const departmentSubregions = useMemo(() => {
    if (!activeDepartment) return {};
    return NATIONAL_MUNICIPALITIES[activeDepartment.name] || {};
  }, [activeDepartment]);

  // All municipalities for current department
  const allDeptMunicipalities = useMemo(() => {
    const list: { subregion: string; name: string }[] = [];
    Object.entries(departmentSubregions).forEach(([sub, munis]) => {
      munis.forEach(m => list.push({ subregion: sub, name: m }));
    });
    return list;
  }, [departmentSubregions]);

  // Filtered municipalities
  const filteredMunicipalities = useMemo(() => {
    return allDeptMunicipalities.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(muniSearchTerm.toLowerCase()) ||
                            item.subregion.toLowerCase().includes(muniSearchTerm.toLowerCase());
      const matchesSub = !selectedSubregion || item.subregion === selectedSubregion;
      return matchesSearch && matchesSub;
    });
  }, [allDeptMunicipalities, muniSearchTerm, selectedSubregion]);

  // Selected municipality NBI data
  const selectedMuniNbi = useMemo(() => {
    if (!selectedMuni || !activeDepartment) return null;
    return MUNICIPALITY_NBI_DATA.find(
      m => m.name.toLowerCase() === selectedMuni.toLowerCase() &&
           m.department.toUpperCase() === activeDepartment.name.toUpperCase()
    ) || null;
  }, [selectedMuni, activeDepartment]);

  // Subregion details (demographics, public order, politics)
  const currentSubregionDetails = useMemo(() => {
    if (!activeDepartment || !selectedSubregion) return null;
    const deptData = NATIONAL_SUBREGION_DETAILS[activeDepartment.name];
    return deptData ? deptData[selectedSubregion] : null;
  }, [activeDepartment, selectedSubregion]);

  // Generate Department Report
  const handleGenerateDeptReport = async () => {
    if (isGeneratingDeptReport || !activeDepartment) return;
    setIsGeneratingDeptReport(true);
    setDeptReport(null);

    try {
      const prompt = `Actúa como un EXPERTO EN ANÁLISIS SOCIOECONÓMICO Y TERRITORIAL en Colombia para elecciones 2026.
Genera un informe estratégico para el departamento de ${activeDepartment.name}.

DATOS BASE:
- NBI Departamental: ${JSON.stringify(deptNbi || "Consultar en fuentes oficiales")}
- Actividades económicas: ${activeDepartment.generalData?.actividadesEconomicas || "Diversas"}
- Contexto político: ${activeDepartment.generalData?.contextoPolitico || "Heterogéneo"}

ESTRUCTURA:
1. **Resumen Ejecutivo y Clima Político 2026**.
2. **Diagnóstico Socioeconómico y Coberturas NBI**.
3. **Focos Críticos de Seguridad y Orden Público**.
4. **3 Propuestas Estratégicas Clave para la Campaña**.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { tools: [{ googleSearch: {} }] }
      });

      setDeptReport({
        name: activeDepartment.name,
        text: response.text || "No se pudo generar el reporte."
      });
    } catch (err) {
      alert(formatAiError(err));
    } finally {
      setIsGeneratingDeptReport(false);
    }
  };

  // Generate Municipal Intelligence Report
  const handleGenerateMuniReport = async (municipio: string) => {
    if (isGeneratingMuniReport || !activeDepartment) return;
    setIsGeneratingMuniReport(true);
    setMuniReport(null);

    try {
      const prompt = `Actúa como un CONSULTOR ELECTORAL Y ANALISTA DE DATOS TERRITORIALES en Colombia.
Realiza un diagnóstico estratégico del municipio de ${municipio} (Departamento de ${activeDepartment.name}).

DATOS LOCALES DISPONIBLES:
- NBI Municipio: ${JSON.stringify(selectedMuniNbi?.total || "Consultar DANE")}
- Subregión: ${selectedSubregion || "Departamental"}
- Contexto Departamental: ${activeDepartment.generalData?.contextoPolitico || ""}

ESTRUCTURA REQUERIDA:
1. **Radiografía Municipal**: Población estimada, vocación económica y posición estratégica en el departamento.
2. **Brechas y Necesidades Críticas**: Situación de acueducto, vías terciarias, conectividad y NBI.
3. **Coyuntura Política Local**: Fuerzas predominantes, alianzas de cara a elecciones 2026 y temas de conversación comunitaria.
4. **Mensajes Clave y Discurso**: 2 propuestas de alto impacto que un candidato debe enfatizar en este municipio.

Utiliza la búsqueda web para incorporar los acontecimientos más recientes.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { tools: [{ googleSearch: {} }] }
      });

      setMuniReport({
        name: municipio,
        text: response.text || "No se obtuvo reporte para este municipio."
      });
    } catch (err) {
      alert(formatAiError(err));
    } finally {
      setIsGeneratingMuniReport(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Glass Header */}
      <div className="bg-slate-900/50 backdrop-blur-2xl border border-sky-400/30 rounded-3xl p-6 shadow-2xl shadow-[inset_0_1px_1px_0_rgba(56,189,248,0.25),0_20px_40px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-sky-950/50 border border-sky-400/50 text-sky-300 text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                Ámbito Nacional
              </span>
              <span className="text-xs text-slate-300 font-mono">
                Cobertura de Municipios en los 32 Departamentos
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Inteligencia Territorial & Municipal Nacional
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Realiza análisis demográficos, electorales y socioeconómicos sobre <strong>cualquier municipio de Colombia</strong> en las 5 regiones del país, complementado con indicadores DANE y búsqueda web en vivo con IA.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('municipios')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'municipios'
                  ? 'bg-gradient-to-r from-sky-500/40 to-blue-600/40 border border-sky-400/60 text-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_4px_15px_rgba(14,165,233,0.3)]'
                  : 'bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              Explorador Municipal
            </button>
            <button
              onClick={() => setActiveTab('departamento')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'departamento'
                  ? 'bg-gradient-to-r from-sky-500/40 to-blue-600/40 border border-sky-400/60 text-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_4px_15px_rgba(14,165,233,0.3)]'
                  : 'bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Ficha Departamental
            </button>
          </div>
        </div>

        {/* Macro-Region Filter Pills */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
          {COLOMBIA_REGIONS.map(reg => (
            <button
              key={reg.id}
              onClick={() => {
                setSelectedRegionId(reg.id);
                if (reg.departments.length > 0) {
                  setSelectedDeptName(reg.departments[0].name);
                  setSelectedSubregion(null);
                  setSelectedMuni(null);
                  setDeptReport(null);
                  setMuniReport(null);
                }
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                selectedRegionId === reg.id
                  ? 'bg-sky-500/30 border border-sky-400/50 text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_0_12px_rgba(56,189,248,0.3)]'
                  : 'bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              {reg.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Department List */}
        <div className="lg:col-span-1 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 space-y-3 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Departamentos ({activeRegion.departments.length})
            </span>
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {activeRegion.departments.map(dept => (
              <button
                key={dept.name}
                onClick={() => {
                  setSelectedDeptName(dept.name);
                  setSelectedSubregion(null);
                  setSelectedMuni(null);
                  setDeptReport(null);
                  setMuniReport(null);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  selectedDeptName === dept.name
                    ? 'bg-sky-500/30 border border-sky-400/50 text-white shadow-md'
                    : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                <span>{dept.name}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Dynamic Content based on activeTab */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'municipios' ? (
            /* TAB: MUNICIPAL EXPLORER */
            <div className="space-y-6">
              {/* Municipal Controls Card */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-xs font-mono text-sky-400 uppercase font-semibold">
                      {activeDepartment?.name} • Municipios ({allDeptMunicipalities.length})
                    </span>
                    <h2 className="text-xl font-bold text-white">
                      Explorador de Municipios de {activeDepartment?.name}
                    </h2>
                  </div>

                  {/* Search box */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={muniSearchTerm}
                      onChange={(e) => setMuniSearchTerm(e.target.value)}
                      placeholder="Buscar municipio..."
                      className="w-full bg-slate-950/60 border border-white/15 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 backdrop-blur-sm"
                    />
                  </div>
                </div>

                {/* Subregions Filter Pills */}
                {Object.keys(departmentSubregions).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <button
                      onClick={() => setSelectedSubregion(null)}
                      className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition ${
                        selectedSubregion === null
                          ? 'bg-sky-500/30 border border-sky-400/50 text-white'
                          : 'bg-white/[0.04] border border-white/10 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Todas las subregiones ({allDeptMunicipalities.length})
                    </button>
                    {Object.keys(departmentSubregions).map(sub => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubregion(sub === selectedSubregion ? null : sub)}
                        className={`px-3 py-1 rounded-full text-xs font-mono font-medium transition ${
                          selectedSubregion === sub
                            ? 'bg-sky-500/30 border border-sky-400/50 text-white'
                            : 'bg-white/[0.04] border border-white/10 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {sub} ({departmentSubregions[sub].length})
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Subregion Strategic Details if selected */}
              {currentSubregionDetails && (
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl">
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase block mb-3">
                    Subregión: {selectedSubregion}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">Demográficas</span>
                      <p className="text-slate-300">{currentSubregionDetails.demograficas}</p>
                    </div>
                    <div className="p-3.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block mb-1">Socioeconómicas</span>
                      <p className="text-slate-300">{currentSubregionDetails.socioeconomicas}</p>
                    </div>
                    <div className="p-3.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10">
                      <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block mb-1">Orden Público</span>
                      <p className="text-slate-300">{currentSubregionDetails.ordenPublico}</p>
                    </div>
                    <div className="p-3.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10">
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block mb-1">Dinámica Electoral</span>
                      <p className="text-slate-300">{currentSubregionDetails.electorales}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Municipalities Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredMunicipalities.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedMuni(item.name);
                      setMuniReport(null);
                    }}
                    className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between h-24 backdrop-blur-md ${
                      selectedMuni === item.name
                        ? 'bg-sky-500/25 border-sky-400 text-white shadow-lg shadow-sky-950/40'
                        : 'bg-slate-900/40 border-white/10 hover:border-white/25 text-slate-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-bold block truncate text-white">{item.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono block truncate">{item.subregion}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                      <span className="text-[10px] font-mono text-sky-400">Ver Ficha</span>
                      <ChevronRight className="w-3 h-3 text-slate-500" />
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Municipality Detail Card */}
              {selectedMuni && (
                <div className="bg-slate-900/60 backdrop-blur-2xl border border-sky-400/40 rounded-3xl p-6 shadow-2xl space-y-5 shadow-[inset_0_1px_1px_0_rgba(56,189,248,0.25)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-mono uppercase text-sky-400 font-bold">
                          Municipio • {activeDepartment?.name}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-white">{selectedMuni}</h3>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleGenerateMuniReport(selectedMuni)}
                        isLoading={isGeneratingMuniReport}
                        leftIcon={<Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />}
                      >
                        Generar Análisis IA del Municipio
                      </Button>
                      <button
                        onClick={() => setSelectedMuni(null)}
                        className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* NBI Indicators if available */}
                  {selectedMuniNbi ? (
                    <div>
                      <span className="text-xs font-mono text-slate-300 uppercase font-bold block mb-3">
                        Indicadores DANE / NBI ({selectedMuni})
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="p-3.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10">
                          <span className="text-[10px] font-mono text-slate-400 block">NBI Total</span>
                          <span className="text-lg font-bold text-amber-400 font-mono">
                            {selectedMuniNbi.total.nbi}%
                          </span>
                        </div>
                        <div className="p-3.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10">
                          <span className="text-[10px] font-mono text-slate-400 block">Miseria</span>
                          <span className="text-lg font-bold text-rose-400 font-mono">
                            {selectedMuniNbi.total.miseria}%
                          </span>
                        </div>
                        <div className="p-3.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10">
                          <span className="text-[10px] font-mono text-slate-400 block">NBI Urbano</span>
                          <span className="text-lg font-bold text-slate-200 font-mono">
                            {selectedMuniNbi.urban.nbi}%
                          </span>
                        </div>
                        <div className="p-3.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10">
                          <span className="text-[10px] font-mono text-slate-400 block">NBI Rural</span>
                          <span className="text-lg font-bold text-amber-400 font-mono">
                            {selectedMuniNbi.rural.nbi}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10 text-xs text-slate-300 flex items-center gap-2">
                      <Info className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>Los indicadores censales detallados de este municipio pueden ser complementados mediante el botón de Diagnóstico con IA.</span>
                    </div>
                  )}

                  {/* Municipal AI Report Output */}
                  {muniReport && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                          Reporte de Inteligencia Local • {muniReport.name}
                        </span>
                        <Badge variant="primary">Gemini 3.8 Flash + Web</Badge>
                      </div>
                      <div className="prose prose-invert max-w-none text-xs leading-relaxed font-sans text-slate-200 bg-white/[0.03] backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-inner">
                        <ReactMarkdown>{muniReport.text}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* TAB: DEPARTMENT OVERVIEW */
            <div className="space-y-6">
              {activeDepartment && (
                <>
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/10 gap-3">
                      <div>
                        <span className="text-xs font-mono text-sky-400 uppercase font-semibold">
                          Región {activeRegion.name}
                        </span>
                        <h2 className="text-2xl font-black text-white">{activeDepartment.name}</h2>
                      </div>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={handleGenerateDeptReport}
                        isLoading={isGeneratingDeptReport}
                        leftIcon={<Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />}
                      >
                        Generar Diagnóstico IA Departamental
                      </Button>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                      <div className="p-3.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">Población</span>
                        <span className="text-sm font-bold text-slate-100 font-mono">
                          {activeDepartment.generalData?.poblacion || "No disponible"}
                        </span>
                      </div>

                      <div className="p-3.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">IDH</span>
                        <span className="text-sm font-bold text-slate-100 font-mono">
                          {activeDepartment.generalData?.idh || "N/A"}
                        </span>
                      </div>

                      <div className="p-3.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">Pobreza</span>
                        <span className="text-sm font-bold text-amber-400 font-mono">
                          {activeDepartment.generalData?.pobreza || "N/A"}
                        </span>
                      </div>

                      <div className="p-3.5 bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10">
                        <span className="text-[10px] font-mono text-slate-400 uppercase block">Orden Público</span>
                        <span className="text-sm font-bold text-rose-400 font-mono">
                          {activeDepartment.generalData?.ordenPublico || "Alerta moderada"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
                      <div>
                        <span className="text-xs font-bold text-slate-200 font-mono uppercase block mb-1">
                          Actividades Económicas Principales
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {activeDepartment.generalData?.actividadesEconomicas || "Información económica general del departamento."}
                        </p>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-slate-200 font-mono uppercase block mb-1">
                          Contexto y Perfil Político
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {activeDepartment.generalData?.contextoPolitico || "Tendencia electoral pluralista y dinámica regional."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {deptReport && (
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-sky-400/30 rounded-2xl p-6 shadow-xl space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-sky-400" />
                          <span className="text-xs font-mono font-bold text-white uppercase">
                            Diagnóstico Estratégico IA • {deptReport.name}
                          </span>
                        </div>
                        <Badge variant="primary">Gemini 3.8 Flash</Badge>
                      </div>

                      <div className="prose prose-invert max-w-none text-xs leading-relaxed font-sans text-slate-200 bg-white/[0.03] p-5 rounded-xl border border-white/10">
                        <ReactMarkdown>{deptReport.text}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  Database, 
  Search, 
  MapPin, 
  Users, 
  Vote, 
  TrendingUp, 
  ShieldAlert, 
  Layers, 
  PlusCircle, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  FileCode, 
  Filter,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { municipalRepository, UnifiedMunicipalityRecord } from '../../services/municipalRepositoryService';

export const MunicipalRepositoryExplorerView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubregion, setSelectedSubregion] = useState('all');
  const [selectedMuni, setSelectedMuni] = useState<UnifiedMunicipalityRecord | null>(null);
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  const [developerJsonInput, setDeveloperJsonInput] = useState('');
  const [ingestStatus, setIngestStatus] = useState<string | null>(null);
  const [copiedContext, setCopiedContext] = useState(false);

  const allRecords = useMemo(() => municipalRepository.getAll(), []);

  // Extract all subregions
  const subregions = useMemo(() => {
    const set = new Set<string>();
    allRecords.forEach((r) => {
      if (r.subregion) set.add(r.subregion);
    });
    return Array.from(set).sort();
  }, [allRecords]);

  // Filtered list
  const filteredRecords = useMemo(() => {
    return allRecords.filter((m) => {
      const matchSearch =
        !searchQuery.trim() ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.daneCode.includes(searchQuery) ||
        m.electedMayor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.predominantParty.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSubreg =
        selectedSubregion === 'all' || m.subregion === selectedSubregion;

      return matchSearch && matchSubreg;
    });
  }, [allRecords, searchQuery, selectedSubregion]);

  const activeMuni = selectedMuni || filteredRecords[0] || allRecords[0];

  const handleIngestJson = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsed = JSON.parse(developerJsonInput);
      const recordsToIngest = Array.isArray(parsed) ? parsed : [parsed];
      const result = municipalRepository.ingest(recordsToIngest);
      setIngestStatus(`¡Éxito! Se han ingerido/actualizado ${result.count} municipios en el repositorio.`);
      setTimeout(() => {
        setShowDeveloperModal(false);
        setIngestStatus(null);
        setDeveloperJsonInput('');
      }, 2000);
    } catch (err: any) {
      setIngestStatus(`Error en el formato JSON: ${err.message}`);
    }
  };

  const handleCopyGeminiContext = () => {
    if (!activeMuni) return;
    const ctx = municipalRepository.buildContextPrompt(activeMuni.id);
    navigator.clipboard.writeText(ctx);
    setCopiedContext(true);
    setTimeout(() => setCopiedContext(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-slate-950/40 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.4)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-gradient-to-r from-sky-400/20 via-teal-400/20 to-blue-500/30 text-sky-300 border border-sky-400/50 shadow-[0_0_12px_rgba(56,189,248,0.3)] flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-sky-400" />
                Propósito 1: Repositorio Municipal Universal
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                125 Municipios • Extensible
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>REPOSITORIO DE INFORMACIÓN TERRITORIAL MUNICIPAL</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
              Base de conocimiento masiva, simple y accesible de cada municipio (datos electorales, censales DANE, NBI y seguridad). Provee contexto local exacto para los agentes del aplicativo y para Gemini con Google Search.
            </p>
          </div>

          <button
            onClick={() => setShowDeveloperModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500/30 to-sky-500/30 hover:from-emerald-500/40 hover:to-sky-500/40 border border-emerald-400/50 text-emerald-200 text-xs font-bold transition flex items-center gap-2 shadow-[0_0_15px_rgba(52,211,153,0.3)] shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span>Ingestar Datos (Desarrollador)</span>
          </button>
        </div>
      </div>

      {/* 2. Search & Subregion Filters */}
      <div className="p-4 rounded-3xl bg-slate-950/30 backdrop-blur-2xl border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por municipio, código DANE, alcalde..."
            className="w-full pl-9 pr-3 py-2 rounded-2xl bg-white/10 border border-white/20 text-white text-xs font-medium focus:outline-none focus:border-sky-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold shrink-0">Subregión:</span>
          <select
            value={selectedSubregion}
            onChange={(e) => setSelectedSubregion(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-white/10 border border-white/20 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
          >
            <option value="all" className="bg-slate-900">Todas las Subregiones ({allRecords.length})</option>
            {subregions.map((s) => (
              <option key={s} value={s} className="bg-slate-900">
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Main Workspace: List and Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left List */}
        <div className="lg:col-span-4 p-4 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.4)] space-y-2 max-h-[650px] overflow-y-auto">
          <div className="text-[10px] font-mono uppercase text-slate-400 font-bold px-2 mb-1 flex items-center justify-between">
            <span>Municipios ({filteredRecords.length})</span>
            <span>DIVIPOLA</span>
          </div>

          {filteredRecords.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMuni(m)}
              className={`w-full p-3 rounded-2xl text-left transition flex items-center justify-between gap-2 border ${
                activeMuni?.id === m.id
                  ? 'bg-sky-500/20 border-sky-400/60 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                  : 'bg-white/05 hover:bg-white/10 border-white/05'
              }`}
            >
              <div>
                <div className="font-bold text-white text-xs">{m.name}</div>
                <div className="text-[10px] text-slate-400">{m.subregion}</div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-sky-300 font-bold">
                  {m.daneCode}
                </span>
                <div className="text-[9px] text-slate-400 mt-0.5">
                  {m.population.toLocaleString()} hab.
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Right Detail Card */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-950/50 backdrop-blur-3xl border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.5)] space-y-5 text-xs">
          {activeMuni && (
            <>
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-sky-400 font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>DANE: {activeMuni.daneCode}</span>
                    <span>•</span>
                    <span>{activeMuni.subregion}</span>
                  </div>
                  <h2 className="text-xl font-black text-white mt-1">
                    {activeMuni.name}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyGeminiContext}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition"
                    title="Copiar el bloque de contexto oficial que se inyecta en Gemini"
                  >
                    {copiedContext ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-sky-400" />}
                    <span>{copiedContext ? 'Contexto Copiado' : 'Copiar Contexto Gemini'}</span>
                  </button>
                </div>
              </div>

              {/* Core KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl bg-white/05 border border-white/10">
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase">
                    <Users className="w-3 h-3 text-sky-400" />
                    Población
                  </div>
                  <div className="text-base font-black text-white font-mono mt-1">
                    {activeMuni.population.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-slate-400">Censo DANE</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/05 border border-white/10">
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase">
                    <Vote className="w-3 h-3 text-emerald-400" />
                    Censo Electoral
                  </div>
                  <div className="text-base font-black text-emerald-300 font-mono mt-1">
                    {activeMuni.electoralCensus.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-slate-400">Potencial votante</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/05 border border-white/10">
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase">
                    <TrendingUp className="w-3 h-3 text-amber-400" />
                    NBI Pobreza
                  </div>
                  <div className="text-base font-black text-amber-300 font-mono mt-1">
                    {activeMuni.nbiPercentage}%
                  </div>
                  <div className="text-[9px] text-slate-400">Vulnerabilidad</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/05 border border-white/10">
                  <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase">
                    <ShieldAlert className="w-3 h-3 text-rose-400" />
                    Riesgo
                  </div>
                  <div className="text-base font-black text-rose-300 font-mono mt-1">
                    {activeMuni.riskLevel}
                  </div>
                  <div className="text-[9px] text-slate-400">Orden público</div>
                </div>
              </div>

              {/* Political Governance Section */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-sky-500/05 to-transparent border border-amber-400/25 space-y-2">
                <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                  Gobierno Municipal & Elecciones (2024-2027)
                </div>
                <div className="text-sm font-black text-white">
                  {activeMuni.electedMayor}
                </div>
                <div className="text-xs text-sky-300 font-medium">
                  {activeMuni.winnerParty} {activeMuni.votesMayor ? `• ${activeMuni.votesMayor.toLocaleString()} votos (${activeMuni.percentageValidMayor}%)` : ''}
                </div>
                {activeMuni.runnerUp && (
                  <div className="pt-2 border-t border-white/10 text-[11px] text-slate-300">
                    <strong>Segundo puesto / Estatuto de Oposición:</strong> {activeMuni.runnerUp.name} ({activeMuni.runnerUp.party})
                  </div>
                )}
              </div>

              {/* Council Seats if present */}
              {activeMuni.councilSeats && activeMuni.councilSeats.length > 0 && (
                <div className="p-4 rounded-2xl bg-white/05 border border-white/10 space-y-2">
                  <div className="text-[10px] font-mono uppercase text-slate-300 font-bold flex items-center justify-between">
                    <span>Concejo Municipal ({activeMuni.totalCouncilSeats} Curules)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {activeMuni.councilSeats.map((cs, i) => (
                      <div key={i} className="p-2 rounded-xl bg-black/30 border border-white/05 text-[11px] flex justify-between items-center">
                        <span className="text-slate-300 truncate pr-1">{cs.party}</span>
                        <span className="font-bold text-sky-300 font-mono shrink-0">{cs.seats} c.</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Context Prompt Preview for Gemini */}
              <div className="p-4 rounded-2xl bg-black/30 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-sky-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-sky-400" />
                    Vista Previa del Contexto Gemini Search:
                  </span>
                  <span className="text-[9px] text-slate-400">Inyección Automática</span>
                </div>
                <pre className="p-3 rounded-xl bg-slate-950/60 border border-white/05 text-[11px] text-slate-300 font-mono whitespace-pre-wrap max-h-36 overflow-y-auto">
                  {municipalRepository.buildContextPrompt(activeMuni.id)}
                </pre>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 4. Developer Ingestion Modal */}
      {showDeveloperModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-950/95 border border-white/20 p-6 shadow-2xl space-y-4 text-xs text-white">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-black uppercase tracking-wider">
                  Ingesta de Nuevos Datos Municipales (Desarrollador)
                </h3>
              </div>
              <button
                onClick={() => setShowDeveloperModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 leading-relaxed">
              Pega a continuación un objeto JSON o array de objetos JSON con la información electoral, demográfica o económica de cualquier municipio para ingresarla en caliente al repositorio.
            </p>

            <form onSubmit={handleIngestJson} className="space-y-3">
              <textarea
                value={developerJsonInput}
                onChange={(e) => setDeveloperJsonInput(e.target.value)}
                placeholder={`{\n  "name": "Guarne",\n  "daneCode": "05318",\n  "subregion": "Oriente",\n  "population": 55000,\n  "electoralCensus": 42000,\n  "nbiPercentage": 8.2,\n  "electedMayor": "Mauricio Grisales",\n  "winnerParty": "Coalición Guarne Avanza"\n}`}
                rows={9}
                className="w-full p-3 rounded-2xl bg-black/50 border border-white/20 font-mono text-slate-200 text-xs focus:outline-none focus:border-emerald-400 resize-none"
                required
              />

              {ingestStatus && (
                <div className={`p-2.5 rounded-xl border text-xs ${ingestStatus.includes('Error') ? 'bg-rose-500/20 border-rose-400/40 text-rose-200' : 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200'}`}>
                  {ingestStatus}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeveloperModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-400 hover:to-sky-500 text-white font-black uppercase text-xs"
                >
                  Ingestar en Repositorio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

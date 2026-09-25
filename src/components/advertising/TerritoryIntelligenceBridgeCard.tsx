import React, { useState } from 'react';
import { 
  TerritoryGeopoliticalIntelligence, 
  TacticalAdPosture 
} from '../../services/holisticAdvertisingIntelligenceService';
import { 
  ShieldAlert, 
  Flame, 
  TrendingUp, 
  Building2, 
  Compass, 
  Radio, 
  Share2, 
  Copy, 
  Check, 
  ArrowUpRight,
  Sparkles,
  MapPin,
  Activity,
  Layers,
  Users,
  RefreshCw,
  UserCheck,
  Gauge
} from 'lucide-react';

interface TerritoryIntelligenceBridgeCardProps {
  intelligence: TerritoryGeopoliticalIntelligence;
  availableTerritories: string[];
  selectedTerritory: string;
  onSelectTerritory: (territory: string) => void;
  onNavigateToView?: (viewId: string) => void;
  onSelectHook?: (hook: string) => void;
}

export const TerritoryIntelligenceBridgeCard: React.FC<TerritoryIntelligenceBridgeCardProps> = ({
  intelligence,
  availableTerritories,
  selectedTerritory,
  onSelectTerritory,
  onNavigateToView,
  onSelectHook
}) => {
  const [copiedHookIndex, setCopiedHookIndex] = useState<number | null>(null);

  const handleCopyHook = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedHookIndex(index);
    if (onSelectHook) onSelectHook(text);
    setTimeout(() => setCopiedHookIndex(null), 2000);
  };

  const postureBadgeColor = (posture: TacticalAdPosture) => {
    switch (posture) {
      case 'Confrontación Directa':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      case 'Capitalización de Fractura':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Cooptación de Base':
        return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      case 'Consolidación de Bastión':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      default:
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
    }
  };

  const house = intelligence.dominantHouse;

  return (
    <div className="bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-5">
      {/* Header with Territory Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Capa de Inteligencia Estratégica Territorial • Protocolo PA-011</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-400 shrink-0" />
              <span>Diagnóstico Geopolítico:</span>
            </h2>

            {/* Territory Dropdown */}
            <select
              value={selectedTerritory}
              onChange={(e) => onSelectTerritory(e.target.value)}
              className="bg-slate-800/90 border border-amber-500/40 hover:border-amber-400 text-amber-300 text-xs sm:text-sm font-bold font-mono px-3 py-1.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 cursor-pointer transition shadow-inner"
            >
              {availableTerritories.map((t) => (
                <option key={t} value={t} className="bg-slate-900 text-white">
                  📍 {t}
                </option>
              ))}
            </select>

            <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full border ${postureBadgeColor(intelligence.tacticalPosture)}`}>
              Postura: {intelligence.tacticalPosture}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {intelligence.tacticalPostureDescription}
          </p>

          {/* Official Census & Microdivision Badges (Protocol PA-013) */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {intelligence.officialCensus && (
              <div className="flex flex-wrap items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-lg text-xs font-mono">
                <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-slate-300">Censo Registraduría:</span>
                <strong className="text-emerald-300 font-bold">{intelligence.officialCensus.formattedTotal}</strong>
                <span className="text-emerald-400/90 font-bold">({intelligence.officialCensus.formattedShort})</span>
                <span className="text-slate-400 border-l border-white/10 pl-2">
                  ♀ {intelligence.officialCensus.mujeres.toLocaleString('es-CO')} | ♂ {intelligence.officialCensus.hombres.toLocaleString('es-CO')}
                </span>
                <span className="text-slate-400 border-l border-white/10 pl-2">
                  {intelligence.officialCensus.mesas.toLocaleString('es-CO')} mesas
                </span>
              </div>
            )}

            {intelligence.municipalDivisionMeta && intelligence.municipalDivisionMeta.disponible && (
              <div className="flex flex-wrap items-center gap-2 bg-cyan-950/60 border border-cyan-500/40 px-2.5 py-1 rounded-lg text-xs font-mono">
                <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-slate-300">Niveles 4/5 Cartográficos:</span>
                <strong className="text-cyan-300 font-bold">{intelligence.municipalDivisionMeta.divisionLabel}</strong>
                {intelligence.municipalDivisionMeta.subdivisionLabel && (
                  <span className="text-slate-400">• {intelligence.municipalDivisionMeta.subdivisionLabel}</span>
                )}
                <span className="text-[10px] text-cyan-400/80 bg-cyan-500/10 px-1.5 py-0.5 rounded ml-1">
                  {intelligence.municipalDivisionMeta.confianza === 'oficial' ? 'Oficial' : 'En validación'}
                </span>
              </div>
            )}
          </div>

          {intelligence.electoralDynamicsNotes && (
            <div className="text-[11px] font-mono text-sky-300/90 bg-sky-950/40 border border-sky-500/20 px-2.5 py-1 rounded-lg">
              ℹ️ {intelligence.electoralDynamicsNotes}
            </div>
          )}
        </div>

      </div>

      {/* Banner de Saturación de Frecuencia y Presupuesto Techo (Protocolo PA-014) */}
      {intelligence.budgetSaturationMetrics && (
        <div className={`rounded-xl border p-4 transition-all shadow-lg ${
          intelligence.budgetSaturationMetrics.saturationState === 'optimo'
            ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900/60 to-slate-950/80 border-emerald-500/40'
            : intelligence.budgetSaturationMetrics.saturationState === 'rendimientos_decrecientes'
            ? 'bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-slate-950/80 border-amber-500/40'
            : 'bg-gradient-to-r from-rose-950/50 via-slate-900/70 to-slate-950/80 border-rose-500/50'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold">
                <Gauge className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-white">Curva de Saturación de Frecuencia & Presupuesto Techo (Budget Cap)</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0 ${
                  intelligence.budgetSaturationMetrics.saturationState === 'optimo'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : intelligence.budgetSaturationMetrics.saturationState === 'rendimientos_decrecientes'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                }`}>
                  {intelligence.budgetSaturationMetrics.saturationState === 'optimo'
                    ? '🟢 Eficiencia Óptima'
                    : intelligence.budgetSaturationMetrics.saturationState === 'rendimientos_decrecientes'
                    ? '🟡 Rendimientos Decrecientes'
                    : '🔴 Desperdicio Crítico / Fatiga'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {intelligence.budgetSaturationMetrics.reallocationAdvice}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono text-xs">
              <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-[10px] text-slate-400 block uppercase">Frecuencia Proyectada</span>
                <strong className={`text-sm ${
                  intelligence.budgetSaturationMetrics.currentFrequency <= 3.8
                    ? 'text-emerald-400'
                    : intelligence.budgetSaturationMetrics.currentFrequency <= 5.5
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}>
                  {intelligence.budgetSaturationMetrics.currentFrequency}x <span className="text-[10px] text-slate-400 font-normal">(Opt: 3.8x)</span>
                </strong>
              </div>

              <div className="bg-slate-900/80 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-[10px] text-slate-400 block uppercase">Presupuesto Techo</span>
                <strong className="text-sm text-sky-400">
                  ${(Math.round(intelligence.budgetSaturationMetrics.optimalBudgetCapCOP / 100_000) / 10).toLocaleString('es-CO')}M COP
                </strong>
              </div>

              {intelligence.budgetSaturationMetrics.wastedSpendCOP > 0 && (
                <div className="bg-rose-950/60 px-3 py-1.5 rounded-lg border border-rose-500/30">
                  <span className="text-[10px] text-rose-300 block uppercase font-bold">Desperdicio Estimado</span>
                  <strong className="text-sm text-rose-400">
                    -${(Math.round(intelligence.budgetSaturationMetrics.wastedSpendCOP / 100_000) / 10).toLocaleString('es-CO')}M COP
                  </strong>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid: 3 Pillars (Dominant House, Heatmap/Demographics, Monitoring Multinivel) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Col 1: Casa Política Predominante */}
        <div className="bg-slate-950/50 border border-white/5 hover:border-white/15 rounded-xl p-4 space-y-3 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-sky-400 font-bold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Casa Política Dominante</span>
            </span>
            {house && (
              <span 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: house.color }} 
                title={`Color de la casa: ${house.name}`}
              />
            )}
          </div>

          {house ? (
            <div className="space-y-2">
              <div>
                <h4 className="text-sm font-black text-white leading-snug">
                  {house.name}
                </h4>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Líder: <strong className="text-slate-200">{house.leader}</strong>
                </div>
                <div className="text-[10px] font-mono text-amber-300/90 mt-0.5">
                  Feudo Central: {house.headquarters} • Votos 2023: {house.totalVotes2023.toLocaleString()}
                </div>
              </div>

              <div className="text-[11px] text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-white/5">
                <span className="text-rose-400 font-bold block text-[10px] uppercase font-mono mb-0.5">
                  Vulnerabilidad Crítica:
                </span>
                {house.dialecticalSummary.antithesis}
              </div>

              {onNavigateToView && (
                <button
                  type="button"
                  onClick={() => onNavigateToView('observatorio-redes')}
                  className="w-full mt-1 px-2.5 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-lg text-sky-300 text-[11px] font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Share2 className="w-3 h-3" />
                  <span>Explorar Grafo de Redes (2D/3D)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>
          ) : (
            <div className="text-xs text-slate-400 py-4">
              Territorio sin hegemonía unipartidista absoluta. Escenario de alta dispersión electoral.
            </div>
          )}
        </div>

        {/* Col 2: Mapas de Calor & Concentración Demográfica */}
        <div className="bg-slate-950/50 border border-white/5 hover:border-white/15 rounded-xl p-4 space-y-3 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-orange-400 font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Mapas de Calor & Demografía</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              Participación: {intelligence.heatmapProfile.voterTurnoutExpected}%
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                Zonas de Alta Densidad Electoral:
              </span>
              <ul className="mt-1 space-y-1">
                {intelligence.heatmapProfile.highDensityZones.map((zone, idx) => (
                  <li key={idx} className="text-slate-200 text-[11px] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                    <span>{zone}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-1 grid grid-cols-2 gap-2 border-t border-white/5 text-[11px]">
              <div className="bg-slate-900/80 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-amber-400 block uppercase">Jóvenes Indecisos</span>
                <strong className="text-white text-sm font-mono">{intelligence.heatmapProfile.undecidedYouthPercentage}%</strong>
              </div>
              <div className="bg-slate-900/80 p-2 rounded-lg border border-white/5">
                <span className="text-[10px] font-mono text-emerald-400 block uppercase">Voto Volátil Captable</span>
                <strong className="text-white text-sm font-mono">{intelligence.heatmapProfile.swingVotersPotential}%</strong>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 italic">
              Segmento prioritario: {intelligence.heatmapProfile.socioeconomicStrataFocus}
            </div>
          </div>
        </div>

        {/* Col 3: Monitoreo Multinivel (Gobernación / Independencia) */}
        <div className="bg-slate-950/50 border border-white/5 hover:border-white/15 rounded-xl p-4 space-y-3 transition">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Monitoreo Multinivel</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              {intelligence.monitoringContext.sourceLabel}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase block">
                Agendas Calientes del Territorio:
              </span>
              <ul className="mt-1 space-y-1">
                {intelligence.monitoringContext.activeAgendas.map((agenda, idx) => (
                  <li key={idx} className="text-slate-300 text-[11px] flex items-start gap-1.5">
                    <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                    <span>{agenda}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-2.5 bg-slate-900/80 rounded-lg border border-white/5 text-[11px] text-slate-300">
              <span className="text-sky-400 font-bold block text-[10px] font-mono uppercase mb-0.5">
                Coyuntura Regional Activa:
              </span>
              {intelligence.monitoringContext.subregionalTrend}
            </div>

            <div className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-400" />
              <span>Noticias y alertas auditadas: {intelligence.monitoringContext.totalAlertasOcurrencias} eventos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Relevos de Curules Institucionales (Mayo / Agosto 2026 - PA-012) */}
      {intelligence.recentReplacements && intelligence.recentReplacements.length > 0 && (
        <div className="bg-gradient-to-r from-amber-950/60 via-slate-900/80 to-purple-950/40 border border-amber-500/40 rounded-xl p-4 space-y-3 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-amber-300">
              <RefreshCw className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Trazabilidad de Relevos de Curules • Impacto Directo en Conversión Publicitaria</span>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 w-fit">
              {intelligence.recentReplacements.length} Relevos Oficiales 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {intelligence.recentReplacements.map((rep, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-amber-500/30 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold truncate">
                    {rep.curulTitle}
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded shrink-0">
                    {rep.dateLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="text-slate-400 line-through">{rep.outgoingName}</span>
                  <span className="text-amber-400 font-mono">➜</span>
                  <span className="text-emerald-400 font-black flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>{rep.incomingName}</span>
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-snug">
                  {rep.reason}
                </p>

                <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-200">
                  <strong className="block text-amber-300 uppercase font-mono">Ventana de Persuasión:</strong>
                  {rep.politicalOpportunity}
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyHook(rep.adHookSuggestion, 9000 + idx)}
                  className="w-full mt-1 px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded text-amber-200 text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  title="Copiar y usar este gancho derivado del relevo de curul"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Usar Gancho de Relevo en Pauta</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Micro-redes de Concejales Locales (Protocolo PA-012) */}
      {intelligence.localCouncilors && intelligence.localCouncilors.length > 0 && (
        <div className="bg-slate-950/60 border border-sky-500/20 rounded-xl p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-sky-400">
              <Users className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Concejales y Bancadas Locales en {intelligence.territory} ({intelligence.localCouncilors.length} identificados)</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Operadores de proximidad y validación barrial
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
            {intelligence.localCouncilors.map((councilor, idx) => (
              <div 
                key={idx} 
                className="p-2.5 rounded-lg bg-slate-900/80 border border-white/5 hover:border-sky-500/30 transition space-y-1.5"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-white truncate" title={councilor.name}>
                    {councilor.name}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 shrink-0">
                    {councilor.partyName}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                  <span className="truncate">{councilor.roleLabel}</span>
                  {councilor.votes2023 && (
                    <span className="text-amber-300/80 font-mono shrink-0 ml-1">
                      {councilor.votes2023.toLocaleString()} votos
                    </span>
                  )}
                </div>

                {councilor.headlineTopic && (
                  <div className="text-[10px] text-slate-300 italic border-t border-white/5 pt-1 line-clamp-2">
                    🎯 {councilor.headlineTopic}
                  </div>
                )}

                {councilor.isReplacement && (
                  <span className="inline-block text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Reemplazo Oficial (2026)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Geopolitical Ad Hooks Section */}
      <div className="bg-slate-950/70 border border-amber-500/20 rounded-xl p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs sm:text-sm font-black text-white">
              Ganchos Geopolíticos de Pauta para {intelligence.territory}
            </h4>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            Optimizados para retención en scroll & conversión
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {intelligence.geopoliticalHooks.map((hook, idx) => {
            const isCopied = copiedHookIndex === idx;
            return (
              <div 
                key={idx}
                className="p-3 rounded-lg bg-slate-900/80 border border-white/5 hover:border-amber-500/40 flex items-start justify-between gap-3 transition group"
              >
                <p className="text-xs text-slate-200 leading-relaxed italic">
                  {hook}
                </p>
                <button
                  type="button"
                  onClick={() => handleCopyHook(hook, idx)}
                  className="px-2 py-1 bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/40 rounded text-slate-300 hover:text-amber-300 text-[10px] font-mono shrink-0 flex items-center gap-1 transition cursor-pointer"
                  title="Copiar gancho geopolítico"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

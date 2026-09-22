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
  Layers
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
      {/* Header with Territory Switcher and IRPV Multiplier */}
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
        </div>

        {/* IRPV ROI Gauge Card */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-emerald-950/40 border border-amber-500/30 rounded-xl p-3.5 flex items-center gap-4 shrink-0 shadow-lg">
          <div className="space-y-0.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Índice Retorno Publicidad/Votos (IRPV)</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                {intelligence.advertisingToVotesMultiplier.toFixed(2)}x
              </span>
              <span className="text-xs text-slate-300 font-medium">
                multiplicador de impacto
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              <strong className="text-white">{intelligence.estimatedVotesPerMillionCOP}</strong> votos est. / M COP 
              <span className="text-slate-500"> (vs {intelligence.standardVotesPerMillionCOP} en pauta ciega)</span>
            </div>
          </div>
        </div>
      </div>

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

import React, { useState, useEffect } from 'react';
import { 
  ADVERTISING_ARCHETYPES_DATA, 
  AdvertisingResonanceProfile 
} from '../../data/advertising/adTargetingModelData';
import { 
  AdTargetingOptimizerService, 
  GeneratedCreativeSet 
} from '../../services/adTargetingOptimizerService';
import { 
  HolisticAdvertisingIntelligenceService,
  TerritoryGeopoliticalIntelligence 
} from '../../services/holisticAdvertisingIntelligenceService';
import { AdCreativeVariantCard } from '../../components/advertising/AdCreativeVariantCard';
import { BudgetPacingSimulator } from '../../components/advertising/BudgetPacingSimulator';
import { TerritoryIntelligenceBridgeCard } from '../../components/advertising/TerritoryIntelligenceBridgeCard';
import { CandidateProfile } from '../../components/CandidateProfileManager';
import { useActiveTerritory } from '../../services/activeTerritoryContextService';
import { 
  Megaphone, 
  Target, 
  Sparkles, 
  Users, 
  TrendingUp, 
  Radio, 
  DollarSign, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  Zap,
  RefreshCw,
  Layers
} from 'lucide-react';

interface TargetedAdvertisingOptimizerViewProps {
  candidateProfile?: CandidateProfile;
  onNavigateToView?: (viewId: string) => void;
}

export const TargetedAdvertisingOptimizerView: React.FC<TargetedAdvertisingOptimizerViewProps> = ({
  candidateProfile,
  onNavigateToView
}) => {
  const candidateName = candidateProfile?.nombre || 'Isaac Mendoza';
  const { activeTerritory } = useActiveTerritory();
  const initialTerritory = activeTerritory?.name || 'Itagüí';

  const [selectedTerritory, setSelectedTerritory] = useState<string>(initialTerritory);
  const [selectedProfileId, setSelectedProfileId] = useState<string>(ADVERTISING_ARCHETYPES_DATA[0].id);
  const [creativeSet, setCreativeSet] = useState<GeneratedCreativeSet | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [territoryIntelligence, setTerritoryIntelligence] = useState<TerritoryGeopoliticalIntelligence | null>(null);

  const availableTerritories = HolisticAdvertisingIntelligenceService.getAvailableTerritories();
  const currentProfile = ADVERTISING_ARCHETYPES_DATA.find(p => p.id === selectedProfileId) || ADVERTISING_ARCHETYPES_DATA[0];

  // Load Territory Intelligence when territory changes
  useEffect(() => {
    let isMounted = true;
    async function loadTerritoryIntel() {
      try {
        const intel = await HolisticAdvertisingIntelligenceService.getTerritoryIntelligence(
          selectedTerritory,
          candidateName
        );
        if (isMounted) setTerritoryIntelligence(intel);
      } catch (err) {
        console.warn("Error al cargar inteligencia territorial:", err);
      }
    }
    loadTerritoryIntel();
    return () => { isMounted = false; };
  }, [selectedTerritory, candidateName]);

  // Load / Generate creatives when profile or territory changes
  useEffect(() => {
    let isMounted = true;
    async function loadCreatives() {
      setLoadingAi(true);
      try {
        const result = await AdTargetingOptimizerService.generateCreativesWithAI(
          currentProfile,
          candidateName,
          selectedTerritory
        );
        if (isMounted) setCreativeSet(result);
      } catch (e) {
        console.warn("Error al cargar creatividades publicitarias:", e);
      } finally {
        if (isMounted) setLoadingAi(false);
      }
    }
    loadCreatives();
    return () => { isMounted = false; };
  }, [selectedProfileId, candidateName, selectedTerritory]);

  const handleRegenerate = async () => {
    setLoadingAi(true);
    try {
      const result = await AdTargetingOptimizerService.generateCreativesWithAI(
        currentProfile,
        candidateName,
        selectedTerritory
      );
      setCreativeSet(result);
    } catch (e) {
      console.warn("Error al regenerar:", e);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900/90 via-amber-950/30 to-slate-950 border border-amber-500/20 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
            <Target className="w-4 h-4" />
            <span>Propósito Supremo • Protocolos PA-010 y PA-011 (Unidad de Automejora)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            Optimizador de Publicidad Electoral Segmentada
            <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Eficacia Publicitaria & Retorno Votos
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
            Maximiza el retorno persuasivo y la conversión en votos para la campaña de <strong>{candidateName}</strong> en <strong>{selectedTerritory}</strong> mediante el cruce de inteligencia territorial (casas políticas, monitoreo de Gobernación, mapas de calor) con microtargeting publicitario y variantes creativas A/B.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onNavigateToView && (
            <button
              type="button"
              onClick={() => onNavigateToView('national-candidates')}
              className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-slate-300 transition"
            >
              Volver al Perfil
            </button>
          )}
        </div>
      </div>

      {/* Holistic Territory Intelligence Bridge (PA-011) */}
      {territoryIntelligence && (
        <TerritoryIntelligenceBridgeCard
          intelligence={territoryIntelligence}
          availableTerritories={availableTerritories}
          selectedTerritory={selectedTerritory}
          onSelectTerritory={(t) => setSelectedTerritory(t)}
          onNavigateToView={onNavigateToView}
        />
      )}

      {/* Segment Selector Tabs */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
            <Users className="w-4 h-4 text-sky-400" />
            <span>Selecciona el Segmento de Audiencia a Pautar:</span>
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            5 Arquetipos Clave de Votantes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {ADVERTISING_ARCHETYPES_DATA.map((p) => {
            const isSelected = p.id === selectedProfileId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProfileId(p.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/60 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/60 border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`font-mono text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'bg-white/5 text-slate-400'
                  }`}>
                    {p.category}
                  </span>
                  <span className="text-[10px] font-mono text-amber-300 font-bold">
                    CTR: {p.expectedCTR}%
                  </span>
                </div>
                <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {p.name.split('(')[0]}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <Radio className="w-3 h-3 text-sky-400 shrink-0" />
                  <span className="truncate">{p.primaryChannel}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resonance Quick Diagnosis Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">
            Gancho Emocional de Detención de Scroll:
          </span>
          <p className="text-xs text-white font-bold leading-snug">
            "{currentProfile.emotionalHook}"
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
            Palabras Clave de Poder para Pauta:
          </span>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {currentProfile.powerKeywords.map((kw, i) => (
              <span key={i} className="px-2 py-0.5 text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded">
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">
            Palabras Tóxicas a Evitar (Riesgo de Rebote):
          </span>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {currentProfile.toxicWordsToAvoid.map((tw, i) => (
              <span key={i} className="px-2 py-0.5 text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20 rounded">
                ✕ {tw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Creative Card with AI Generator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-black text-white">
              Piezas Publicitarias Adaptadas a {currentProfile.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleRegenerate}
            disabled={loadingAi}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-slate-300 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingAi ? 'animate-spin' : ''}`} />
            <span>{loadingAi ? 'Generando con IA...' : 'Regenerar Creatividades'}</span>
          </button>
        </div>

        {creativeSet ? (
          <AdCreativeVariantCard
            profile={currentProfile}
            creativeSet={creativeSet}
            candidateName={candidateName}
          />
        ) : (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-white/10 text-slate-400 text-xs">
            Cargando creatividades publicitarias con Gemini 3.8 Flash...
          </div>
        )}
      </div>

      {/* Budget & ROAS Simulator */}
      <BudgetPacingSimulator
        selectedArchetypeIds={[selectedProfileId]}
      />
    </div>
  );
};

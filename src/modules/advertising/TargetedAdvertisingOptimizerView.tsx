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
  const candidateName = candidateProfile?.nombre || 'el candidato del perfil';
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
  // Las variantes se generan SOLO al pulsar "Generar" (antes se pedían a Gemini al abrir la vista y en cada cambio).
  // Al cambiar de arquetipo o de territorio se limpia lo generado para no mostrar piezas de otro segmento.
  const [errorAi, setErrorAi] = useState<string>('');
  useEffect(() => { setCreativeSet(null); setErrorAi(''); }, [selectedProfileId, selectedTerritory]);

  const handleRegenerate = async () => {
    setLoadingAi(true);
    setErrorAi('');
    try {
      const result = await AdTargetingOptimizerService.generateCreativesWithAI(
        currentProfile,
        candidateName,
        selectedTerritory
      );
      setCreativeSet(result);
    } catch (e) {
      setErrorAi(e instanceof Error ? e.message : String(e));
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="proteus-civico space-y-4">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--c-accent)] font-bold">
            <Target className="w-4 h-4" />
            <span>Publicidad segmentada</span>
          </div>
          <h1 className="font-titulo text-xl sm:text-2xl leading-tight font-medium flex flex-wrap items-center gap-2.5">
            Optimizador de Publicidad Electoral Segmentada
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[var(--c-accent-soft)] text-[var(--c-accent-text)]">
              Segmentación y Creatividades
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--c-muted)] max-w-3xl">
            Diseña mensajes segmentados para la campaña de <strong className="text-[var(--c-ink)]">{candidateName}</strong> en <strong className="text-[var(--c-ink)]">{selectedTerritory}</strong> mediante el cruce de inteligencia territorial (casas políticas, monitoreo de Gobernación, mapas de calor) con microtargeting publicitario y variantes creativas A/B.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onNavigateToView && (
            <button
              type="button"
              onClick={() => onNavigateToView('national-candidates')}
              className="min-h-9 px-3.5 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-xs font-semibold"
            >
              Volver al Perfil
            </button>
          )}
        </div>
      </div>

      {/* Puente de inteligencia territorial holística */}
      {territoryIntelligence && (
        <TerritoryIntelligenceBridgeCard
          intelligence={territoryIntelligence}
          availableTerritories={availableTerritories}
          selectedTerritory={selectedTerritory}
          onSelectTerritory={(t) => setSelectedTerritory(t)}
          onNavigateToView={onNavigateToView}
        />
      )}

      {/* Selector de segmento */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase text-[var(--c-muted)] font-bold flex items-center gap-1.5">
            <Users className="w-4 h-4 text-[var(--c-accent)]" />
            <span>Selecciona el Segmento de Audiencia a Pautar:</span>
          </span>
          <span className="text-xs text-[var(--c-muted)]">
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
                aria-pressed={isSelected}
                className={`p-3 rounded-xl border text-left ${
                  isSelected
                    ? 'bg-[var(--c-accent-soft)] border-[var(--c-accent)]'
                    : 'bg-[var(--c-surface)] border-[var(--c-border)] text-[var(--c-muted)]'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className={`text-xs uppercase font-bold px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-[var(--c-accent)] text-white' : 'bg-[var(--c-border)] text-[var(--c-muted)]'
                  }`}>
                    {p.category}
                  </span>
                  <span className="text-xs text-[var(--c-accent-text)] font-bold">
                    CTR: {p.expectedCTR}%
                  </span>
                </div>
                <div className={`text-xs font-bold truncate ${isSelected ? 'text-[var(--c-ink)]' : 'text-[var(--c-muted)]'}`}>
                  {p.name.split('(')[0]}
                </div>
                <div className="text-xs text-[var(--c-muted)] mt-1 flex items-center gap-1">
                  <Radio className="w-3 h-3 text-[var(--c-accent)] shrink-0" />
                  <span className="truncate">{p.primaryChannel}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Diagnóstico rápido de resonancia */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-4">
        <div className="space-y-1">
          <span className="text-xs uppercase text-[var(--c-muted)] font-bold block">
            Gancho Emocional de Detención de Scroll:
          </span>
          <p className="text-xs text-[var(--c-ink)] font-bold leading-snug">
            "{currentProfile.emotionalHook}"
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase text-[var(--c-muted)] font-bold block">
            Palabras Clave de Poder para Pauta:
          </span>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {currentProfile.powerKeywords.map((kw, i) => (
              <span key={i} className="px-2 py-0.5 text-xs bg-[var(--c-ok-soft)] text-[var(--c-ok)] rounded-md font-bold">
                {kw}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-xs uppercase text-[var(--c-muted)] font-bold block">
            Palabras Tóxicas a Evitar (Riesgo de Rebote):
          </span>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {currentProfile.toxicWordsToAvoid.map((tw, i) => (
              <span key={i} className="px-2 py-0.5 text-xs bg-[var(--c-warn-soft)] text-[var(--c-warn)] rounded-md font-bold">
                {tw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Piezas creativas generadas con IA */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[var(--c-accent)]" />
            <h3 className="font-titulo text-base font-medium">
              Piezas Publicitarias Adaptadas a {currentProfile.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleRegenerate}
            disabled={loadingAi}
            className="min-h-9 px-3 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingAi ? 'animate-spin' : ''}`} />
            <span>{loadingAi ? 'Generando con IA...' : creativeSet ? 'Generar de nuevo' : 'Generar variantes'}</span>
          </button>
        </div>

        {creativeSet ? (
          <AdCreativeVariantCard
            profile={currentProfile}
            creativeSet={creativeSet}
            candidateName={candidateName}
          />
        ) : (
          <div className="p-12 text-center rounded-2xl border border-[var(--c-border)] bg-[var(--c-sunken)] text-[var(--c-muted)] text-xs">
            {loadingAi ? 'Generando con Gemini 3.8 Flash a partir de los datos del territorio, el perfil del candidato y el marco…'
              : errorAi ? <span className="text-[var(--c-warn)]">No se pudo generar: {errorAi}</span>
                : 'Pulsa "Generar variantes": Gemini lee los datos del territorio, el perfil del candidato y el marco completo antes de escribir.'}
          </div>
        )}
      </div>

    </div>
  );
};

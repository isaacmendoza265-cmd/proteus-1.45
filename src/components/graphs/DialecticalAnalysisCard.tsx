import React, { useState } from 'react';
import { 
  Sparkles, 
  Flame, 
  ShieldAlert, 
  Workflow, 
  Scale, 
  Building2, 
  ChevronRight, 
  CheckCircle2, 
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { PoliticalHouse } from '../../data/politicalHouses/types';
import { PoliticalActorIntelligenceService } from '../../services/politicalActorIntelligenceService';

interface DialecticalAnalysisCardProps {
  house: PoliticalHouse;
  candidateName?: string;
}

export const DialecticalAnalysisCard: React.FC<DialecticalAnalysisCardProps> = ({
  house,
  candidateName = 'Isaac Mendoza'
}) => {
  const [tacticalBrief, setTacticalBrief] = useState<string | null>(null);
  const [loadingBrief, setLoadingBrief] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerateBrief = async () => {
    setLoadingBrief(true);
    try {
      const brief = await PoliticalActorIntelligenceService.generateTacticalCampaignBrief(house, candidateName);
      setTacticalBrief(brief);
    } catch (err) {
      console.error('Error generando brief táctico:', err);
    } finally {
      setLoadingBrief(false);
    }
  };

  const handleCopy = () => {
    if (!tacticalBrief) return;
    navigator.clipboard.writeText(tacticalBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-purple-400 block">
              Auditoría Dialéctica UACP
            </span>
            <h3 className="text-base font-black text-white">
              Análisis Dialéctico de Poder • {house.name}
            </h3>
          </div>
        </div>

        <button
          onClick={handleGenerateBrief}
          disabled={loadingBrief}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs flex items-center gap-1.5 shadow-lg transition cursor-pointer border border-purple-400/40"
        >
          {loadingBrief ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analizando con Gemini...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Generar Brief de Negociación</span>
            </>
          )}
        </button>
      </div>

      {/* Grid de 3 Columnas Dialécticas (Tesis, Antítesis, Síntesis) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* TESIS */}
        <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/30 space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-black uppercase">
            <CheckCircle2 className="w-4 h-4" />
            <span>1. Tesis (Discurso Oficial)</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {house.dialecticalSummary.thesis}
          </p>
        </div>

        {/* ANTÍTESIS */}
        <div className="p-4 rounded-2xl bg-rose-950/25 border border-rose-500/30 space-y-1.5">
          <div className="flex items-center gap-1.5 text-rose-400 text-xs font-black uppercase">
            <Flame className="w-4 h-4" />
            <span>2. Antítesis (Vulnerabilidades)</span>
          </div>
          <p className="text-xs text-rose-200/90 leading-relaxed">
            {house.dialecticalSummary.antithesis}
          </p>
        </div>

        {/* SÍNTESIS */}
        <div className="p-4 rounded-2xl bg-sky-950/25 border border-sky-500/30 space-y-1.5">
          <div className="flex items-center gap-1.5 text-sky-400 text-xs font-black uppercase">
            <Workflow className="w-4 h-4" />
            <span>3. Síntesis (Perspectiva 2026)</span>
          </div>
          <p className="text-xs text-sky-200/90 leading-relaxed">
            {house.dialecticalSummary.synthesis}
          </p>
        </div>
      </div>

      {/* Brief Táctico Generado por IA */}
      {tacticalBrief && (
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/40 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-black text-amber-300 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              Brief Táctico de Campaña para {candidateName}
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-sans">
            {tacticalBrief}
          </div>
        </div>
      )}
    </div>
  );
};

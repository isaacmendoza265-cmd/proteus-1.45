import React, { useState } from 'react';
import { 
  Vote, 
  Calendar, 
  TrendingUp, 
  Building2, 
  Award, 
  CheckCircle2, 
  Layers, 
  BarChart3,
  FileSpreadsheet,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { ALCALDIA_DATA_BY_YEAR, TerritorialYear } from '../../data/e24/territorialData';

interface E24HistoricalViewerProps {
  comunaId?: string;
  comunaName?: string;
  barrioName?: string;
}

export const E24HistoricalViewer: React.FC<E24HistoricalViewerProps> = ({
  comunaId,
  comunaName = 'Medellín General',
  barrioName
}) => {
  const [selectedYear, setSelectedYear] = useState<TerritorialYear>(2023);
  const [selectedCorp, setSelectedCorp] = useState<'alcaldia' | 'concejo' | 'congreso'>('alcaldia');

  const yearData = ALCALDIA_DATA_BY_YEAR[selectedYear] || ALCALDIA_DATA_BY_YEAR[2023];

  return (
    <div className="space-y-3.5 p-4 rounded-3xl bg-slate-950/60 backdrop-blur-2xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_12px_32px_rgba(0,0,0,0.5)] text-white">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-3">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-amber-400 tracking-wider">
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-300" />
            <span>Matriz E-24 Histórica Oficial</span>
          </div>
          <h4 className="text-sm font-black text-white mt-0.5">
            {barrioName ? `${barrioName} (${comunaName})` : comunaName}
          </h4>
        </div>

        {/* Corporate Selector */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/15 text-[11px] font-bold">
          <button
            onClick={() => setSelectedCorp('alcaldia')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedCorp === 'alcaldia'
                ? 'bg-amber-500/30 text-amber-200 border border-amber-400/50 shadow-[0_0_10px_rgba(251,191,36,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Alcaldía
          </button>
          <button
            onClick={() => setSelectedCorp('concejo')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedCorp === 'concejo'
                ? 'bg-sky-500/30 text-sky-200 border border-sky-400/50 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Concejo
          </button>
          <button
            onClick={() => setSelectedCorp('congreso')}
            className={`px-2.5 py-1 rounded-lg transition ${
              selectedCorp === 'congreso'
                ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/50 shadow-[0_0_10px_rgba(129,140,248,0.3)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Congreso E-24
          </button>
        </div>
      </div>

      {/* Year Tabs */}
      <div className="flex items-center gap-1.5 text-xs font-bold">
        <span className="text-[10px] font-mono uppercase text-slate-400 mr-1 flex items-center gap-1">
          <Calendar className="w-3 h-3 text-sky-400" />
          Periodo E-24:
        </span>
        {([2023, 2019, 2015] as TerritorialYear[]).map((yr) => (
          <button
            key={yr}
            onClick={() => setSelectedYear(yr)}
            className={`px-3 py-1 rounded-xl font-mono text-xs transition ${
              selectedYear === yr
                ? 'bg-gradient-to-r from-amber-400/30 to-orange-500/40 border border-amber-300/70 text-white shadow-[0_0_12px_rgba(251,191,36,0.3)] font-black'
                : 'bg-white/05 hover:bg-white/10 text-slate-300 border border-white/15'
            }`}
          >
            {yr}
          </button>
        ))}
      </div>

      {/* Summary KPI Pill */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-2xl bg-white/05 border border-white/10">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Votos Válidos</div>
          <div className="text-sm font-black text-white font-mono mt-0.5">
            {yearData.votosValidos.toLocaleString()}
          </div>
        </div>
        <div className="p-2 rounded-2xl bg-white/05 border border-white/10">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Voto en Blanco</div>
          <div className="text-sm font-black text-sky-300 font-mono mt-0.5">
            {yearData.votosBlanco.toLocaleString()}
          </div>
        </div>
        <div className="p-2 rounded-2xl bg-white/05 border border-white/10">
          <div className="text-[10px] font-mono text-slate-400 uppercase">Nulos / No Marc.</div>
          <div className="text-sm font-black text-rose-300 font-mono mt-0.5">
            {(yearData.votosNulos + yearData.votosNoMarcados).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Candidates List with Progress Bars */}
      <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
        {yearData.candidates.slice(0, 5).map((cand, idx) => {
          const pct = ((cand.baseTotalVotes / yearData.votosValidos) * 100).toFixed(1);
          return (
            <div key={cand.id} className="p-2.5 rounded-2xl bg-white/05 border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black font-mono shrink-0 bg-white/15 text-white">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-white truncate" title={cand.name}>
                    {cand.shortName}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 text-right">
                  <span className="font-mono text-emerald-400 font-black">{pct}%</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    ({cand.baseTotalVotes.toLocaleString()})
                  </span>
                </div>
              </div>

              {/* Bar */}
              <div className="w-full bg-slate-900/80 h-1.5 rounded-full overflow-hidden border border-white/05">
                <div
                  style={{ 
                    width: `${pct}%`,
                    backgroundColor: cand.color || '#38bdf8'
                  }}
                  className="h-full rounded-full transition-all duration-500 shadow-[0_0_8px_currentColor]"
                />
              </div>

              <div className="flex items-center justify-between text-[9px] text-slate-400">
                <span className="truncate">{cand.partyName}</span>
                <span className="font-mono uppercase text-slate-300">{cand.ideology}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

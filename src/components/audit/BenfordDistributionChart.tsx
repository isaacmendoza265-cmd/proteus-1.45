import React, { useState } from 'react';
import { BenfordTestResult } from '../../data/schemas/electoralMicrodata';
import { AlertTriangle, CheckCircle2, Info, TrendingUp } from 'lucide-react';

interface BenfordDistributionChartProps {
  testResult: BenfordTestResult;
  onToggleDigitPosition?: (pos: 1 | 2) => void;
}

export const BenfordDistributionChart: React.FC<BenfordDistributionChartProps> = ({
  testResult,
  onToggleDigitPosition
}) => {
  const [hoveredDigit, setHoveredDigit] = useState<number | null>(null);

  const maxVal = Math.max(
    ...testResult.distribution.map(d => Math.max(d.observedPercentage, d.theoreticalPercentage)),
    15
  );

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Distribución Econométrica de la Ley de Benford
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Test del {testResult.digitPosition}º Dígito ({testResult.digitPosition === 2 ? '2BL - Walter Mebane' : '1BL'}) sobre guarismos de mesas
          </p>
        </div>

        {onToggleDigitPosition && (
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => onToggleDigitPosition(2)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                testResult.digitPosition === 2
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2º Dígito (Recomendado)
            </button>
            <button
              type="button"
              onClick={() => onToggleDigitPosition(1)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                testResult.digitPosition === 1
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1º Dígito (1BL)
            </button>
          </div>
        )}
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="bg-white/5 border border-white/5 rounded-xl p-3">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Chi-Cuadrado (χ²)</span>
          <div className={`text-lg font-mono font-black ${testResult.isAnomalous ? 'text-rose-400' : 'text-emerald-400'}`}>
            {testResult.chiSquare.toFixed(2)}
          </div>
          <span className="text-[10px] text-slate-500">Crítico: {testResult.criticalValue95}</span>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-3">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">p-valor</span>
          <div className={`text-lg font-mono font-black ${testResult.isAnomalous ? 'text-rose-400' : 'text-cyan-400'}`}>
            {testResult.pValue < 0.01 ? '< 0.01' : testResult.pValue.toFixed(3)}
          </div>
          <span className="text-[10px] text-slate-500">Nivel α = 0.05</span>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-3">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Guarismos Evaluados</span>
          <div className="text-lg font-mono font-black text-white">
            {testResult.totalNumbersAnalyzed}
          </div>
          <span className="text-[10px] text-slate-500">Muestra agregada</span>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-3">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Diagnóstico Forense</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            {testResult.isAnomalous ? (
              <>
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="text-xs font-bold text-rose-400">Anómalo</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-emerald-400">Natural</span>
              </>
            )}
          </div>
          <span className="text-[10px] text-slate-500">
            {testResult.isAnomalous ? 'Sospecha alteración' : 'Alineación normal'}
          </span>
        </div>
      </div>

      {/* Chart Canvas / SVG */}
      <div className="relative pt-6 pb-2">
        {/* Legend */}
        <div className="flex items-center justify-end gap-5 text-xs text-slate-300 mb-3 font-mono">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 bg-cyan-500/80 rounded border border-cyan-300/50" />
            <span>Observado en Mesas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-amber-400 rounded-full" />
            <span>Curva Teórica Benford</span>
          </div>
        </div>

        {/* Bars Container */}
        <div className="h-60 flex items-end justify-between gap-2 px-3 pt-4 pb-8 border-b border-l border-white/10 relative">
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1.0].map((factor) => {
            const val = (maxVal * factor).toFixed(0);
            return (
              <div 
                key={factor} 
                className="absolute left-0 right-0 border-t border-white/5 pointer-events-none flex items-center justify-end pr-2"
                style={{ bottom: `${factor * 85}%` }}
              >
                <span className="text-[9px] font-mono text-slate-500">{val}%</span>
              </div>
            );
          })}

          {testResult.distribution.map((d) => {
            const obsHeightPct = (d.observedPercentage / maxVal) * 85;
            const theoHeightPct = (d.theoreticalPercentage / maxVal) * 85;
            const isHovered = hoveredDigit === d.digit;
            const isSignificantDiff = Math.abs(d.difference) > 3.5;

            return (
              <div
                key={d.digit}
                className="flex-1 flex flex-col items-center h-full justify-end relative group cursor-pointer"
                onMouseEnter={() => setHoveredDigit(d.digit)}
                onMouseLeave={() => setHoveredDigit(null)}
              >
                {/* Tooltip on Hover */}
                {isHovered && (
                  <div className="absolute -top-16 z-20 bg-slate-950/95 border border-white/20 rounded-lg px-2.5 py-1.5 shadow-2xl text-[11px] font-mono whitespace-nowrap pointer-events-none">
                    <div className="font-bold text-white">Dígito '{d.digit}'</div>
                    <div className="text-cyan-400">Observado: {d.observedPercentage}% ({d.observedCount})</div>
                    <div className="text-amber-400">Teórico: {d.theoreticalPercentage}%</div>
                    <div className={d.difference > 0 ? 'text-rose-400' : 'text-slate-400'}>
                      Dif: {d.difference > 0 ? `+${d.difference}%` : `${d.difference}%`}
                    </div>
                  </div>
                )}

                {/* Theoretical marker dot */}
                <div 
                  className="absolute w-2.5 h-2.5 bg-amber-400 border border-slate-900 rounded-full z-10 -translate-y-1/2 transition-all group-hover:scale-125"
                  style={{ bottom: `${theoHeightPct}%` }}
                  title={`Teórico: ${d.theoreticalPercentage}%`}
                />

                {/* Bar */}
                <div
                  className={`w-full max-w-[32px] rounded-t-lg transition-all duration-300 ${
                    isSignificantDiff && testResult.isAnomalous
                      ? 'bg-gradient-to-t from-rose-600/80 to-rose-400/90 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                      : 'bg-gradient-to-t from-cyan-600/70 to-cyan-400/80 group-hover:from-cyan-500 group-hover:to-cyan-300'
                  }`}
                  style={{ height: `${Math.max(obsHeightPct, 4)}%` }}
                />

                {/* Digit Label */}
                <span className={`text-xs font-mono font-bold mt-2 ${isHovered ? 'text-amber-400' : 'text-slate-400'}`}>
                  {d.digit}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Narrative Interpretation */}
      <div className={`mt-3 p-3 rounded-xl border flex items-start gap-2.5 ${
        testResult.isAnomalous 
          ? 'bg-rose-950/20 border-rose-500/30 text-rose-200' 
          : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
      }`}>
        <Info className="w-4 h-4 mt-0.5 shrink-0 opacity-80" />
        <p className="text-xs leading-relaxed">
          {testResult.interpretation}
        </p>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  AdTargetingOptimizerService, 
  BudgetPacingResult 
} from '../../services/adTargetingOptimizerService';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target, 
  BarChart3, 
  CheckCircle2, 
  PieChart, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface BudgetPacingSimulatorProps {
  selectedArchetypeIds: string[];
}

export const BudgetPacingSimulator: React.FC<BudgetPacingSimulatorProps> = ({
  selectedArchetypeIds
}) => {
  const [budgetCop, setBudgetCop] = useState<number>(15000000); // 15 millones COP por defecto

  const result: BudgetPacingResult = useMemo(() => {
    return AdTargetingOptimizerService.simulateBudgetPacing(budgetCop, selectedArchetypeIds);
  }, [budgetCop, selectedArchetypeIds]);

  const presetBudgets = [
    { label: '$5M COP', val: 5000000 },
    { label: '$15M COP', val: 15000000 },
    { label: '$35M COP', val: 35000000 },
    { label: '$75M COP', val: 75000000 },
    { label: '$120M COP', val: 120000000 }
  ];

  return (
    <div className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-black text-white">
              Simulador de Retorno de Inversión en Publicidad Electoral
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Optimización matemática de presupuesto de pauta para maximizar la conversión en votos
          </p>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          {presetBudgets.map((p) => (
            <button
              key={p.val}
              type="button"
              onClick={() => setBudgetCop(p.val)}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition ${
                budgetCop === p.val
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Slider Control */}
      <div className="space-y-2 bg-white/5 p-4 rounded-xl border border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase text-slate-300 font-bold">
            Presupuesto Total de Campaña Publicitaria:
          </span>
          <span className="text-lg font-mono font-black text-emerald-400">
            ${budgetCop.toLocaleString()} COP
          </span>
        </div>
        <input
          type="range"
          min={1000000}
          max={150000000}
          step={1000000}
          value={budgetCop}
          onChange={(e) => setBudgetCop(Number(e.target.value))}
          className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
        />
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>$1M COP (Micro-campaña)</span>
          <span>$75M COP</span>
          <span>$150M COP (Despliegue Masivo)</span>
        </div>
      </div>

      {/* Macro Impact KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white/5 border border-white/5 rounded-xl p-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Impresiones Estimadas</span>
          <div className="text-xl font-mono font-black text-white mt-0.5">
            {result.totalEstimatedImpressions.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500">Impactos visuales en canales</span>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Clics / Interacciones</span>
          <div className="text-xl font-mono font-black text-cyan-400 mt-0.5">
            {result.totalEstimatedClicks.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500">Tráfico de alta intención</span>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Votantes Persuadidos Est.</span>
          <div className="text-xl font-mono font-black text-emerald-400 mt-0.5">
            {result.totalEstimatedPersuadedVoters.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-300/80">Conversión a urna proyectada</span>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-3.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">Costo Promedio / Votante (CPVP)</span>
          <div className="text-xl font-mono font-black text-amber-300 mt-0.5">
            ${result.averageCPVP.toLocaleString()} COP
          </div>
          <span className="text-[10px] text-slate-500">Costo por simpatizante ganado</span>
        </div>
      </div>

      {/* Segment Distribution Cards */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono uppercase text-slate-300 font-bold flex items-center gap-1.5">
          <PieChart className="w-4 h-4 text-sky-400" />
          <span>Distribución Óptima de Pauta por Segmento de Audiencia</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {result.archetypeAllocations.map((alloc) => (
            <div
              key={alloc.archetype.id}
              className="bg-black/30 border border-white/10 rounded-xl p-3.5 space-y-2.5 hover:border-emerald-500/40 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate max-w-[70%]">
                  {alloc.archetype.name}
                </span>
                <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                  {alloc.budgetSharePercent}%
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Pauta asignada:</span>
                  <span className="font-mono text-white font-bold">${alloc.allocatedBudget.toLocaleString()} COP</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Canal principal:</span>
                  <span className="font-bold text-amber-300">{alloc.archetype.primaryChannel}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Votos proyectados:</span>
                  <span className="font-mono text-emerald-300 font-bold">~{alloc.estimatedPersuadedVoters.toLocaleString()} votantes</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  style={{ width: `${alloc.budgetSharePercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

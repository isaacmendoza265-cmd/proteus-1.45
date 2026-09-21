import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Calendar, 
  Users, 
  TrendingUp, 
  Layers, 
  Info, 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { DemographicCohort, DemographicIndicators } from '../../data/observatorioComunas/types';
import { 
  getDemographicPyramid, 
  getDemographicIndicators, 
  getAgeDistribution,
  POPULATION_BY_YEAR 
} from '../../data/observatorioComunas/populationData';

interface DemographicPyramidProps {
  communeId: number;
  communeName: string;
  initialYear?: number;
  compact?: boolean;
}

const AVAILABLE_YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
const KEY_YEARS = [2018, 2022, 2024, 2026, 2028, 2030];

export const DemographicPyramid: React.FC<DemographicPyramidProps> = ({
  communeId,
  communeName,
  initialYear = 2026,
  compact = false
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [viewMode, setViewMode] = useState<'quinquennial' | 'broad'>('quinquennial');
  const [hoveredCohort, setHoveredCohort] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-play / scrub animation across years
  React.useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedYear((prev) => {
          const nextIndex = AVAILABLE_YEARS.indexOf(prev) + 1;
          if (nextIndex >= AVAILABLE_YEARS.length) {
            setIsPlaying(false);
            return AVAILABLE_YEARS[0];
          }
          return AVAILABLE_YEARS[nextIndex];
        });
      }, 900);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Cohorts for active year
  const cohorts = useMemo(() => {
    return getDemographicPyramid(communeId, selectedYear);
  }, [communeId, selectedYear]);

  // Demographic indicators
  const indicators: DemographicIndicators = useMemo(() => {
    return getDemographicIndicators(communeId, selectedYear);
  }, [communeId, selectedYear]);

  // Broad life-stage distribution
  const broadGroups = useMemo(() => {
    return getAgeDistribution(communeId, undefined, selectedYear);
  }, [communeId, selectedYear]);

  // Reverse cohorts array for the standard demographic pyramid (80+ on top, 0-4 on bottom)
  const pyramidCohorts = useMemo(() => {
    return [...cohorts].reverse();
  }, [cohorts]);

  // Max percentage across cohorts to scale horizontal bars symmetrically
  const maxPct = useMemo(() => {
    const maxVal = Math.max(
      ...cohorts.map((c) => Math.max(c.hombresPct, c.mujeresPct))
    );
    return Math.max(maxVal * 1.15, 8); // Minimum 8% ceiling
  }, [cohorts]);

  const maxBroadPop = useMemo(() => {
    return Math.max(...broadGroups.map((g) => Math.max(g.hombres, g.mujeres)));
  }, [broadGroups]);

  const totalPop = useMemo(() => {
    return cohorts.reduce((acc, c) => acc + c.total, 0);
  }, [cohorts]);

  const totalMen = useMemo(() => {
    return cohorts.reduce((acc, c) => acc + c.hombres, 0);
  }, [cohorts]);

  const totalWomen = useMemo(() => {
    return cohorts.reduce((acc, c) => acc + c.mujeres, 0);
  }, [cohorts]);

  return (
    <div className="space-y-4">
      {/* 1. Interactive Year Controller Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-white/15 backdrop-blur-xl shadow-inner space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-400/30">
              <Calendar className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Año de Proyección DANE:
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-sky-400/20 border border-sky-400/40 text-sky-300 font-mono font-black text-sm">
              {selectedYear}
            </span>
            {selectedYear === 2026 && (
              <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold border border-amber-400/30">
                AÑO ELECTORAL
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                isPlaying 
                  ? 'bg-amber-500/30 text-amber-200 border border-amber-400/50'
                  : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20'
              }`}
              title={isPlaying ? 'Pausar evolución temporal' : 'Animar evolución temporal (2018 - 2030)'}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span className="text-[10px] hidden sm:inline">{isPlaying ? 'Pausa' : 'Evolución'}</span>
            </button>
          </div>
        </div>

        {/* Year Slider */}
        <div className="space-y-1">
          <input
            type="range"
            min={2018}
            max={2030}
            step={1}
            value={selectedYear}
            onChange={(e) => {
              setIsPlaying(false);
              setSelectedYear(parseInt(e.target.value));
            }}
            className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-400 px-0.5">
            {KEY_YEARS.map((y) => (
              <button
                key={y}
                onClick={() => {
                  setIsPlaying(false);
                  setSelectedYear(y);
                }}
                className={`transition hover:text-white cursor-pointer ${
                  selectedYear === y ? 'text-sky-300 font-bold underline' : ''
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Population & Sex Summary Banner */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-2.5 rounded-2xl bg-white/05 border border-white/15 text-center">
          <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Población Total ({selectedYear})</div>
          <div className="text-base font-black font-mono text-white mt-0.5">
            {totalPop.toLocaleString('es-CO')}
          </div>
          <div className="text-[9px] text-slate-400 truncate">{communeName}</div>
        </div>

        <div className="p-2.5 rounded-2xl bg-sky-500/10 border border-sky-400/30 text-center">
          <div className="text-[9px] font-mono text-sky-300 uppercase font-bold flex items-center justify-center gap-1">
            <span>♂ Hombres</span>
          </div>
          <div className="text-base font-black font-mono text-sky-200 mt-0.5">
            {totalMen.toLocaleString('es-CO')}
          </div>
          <div className="text-[9px] font-mono text-sky-400">
            {((totalMen / (totalPop || 1)) * 100).toFixed(1)}% del total
          </div>
        </div>

        <div className="p-2.5 rounded-2xl bg-pink-500/10 border border-pink-400/30 text-center">
          <div className="text-[9px] font-mono text-pink-300 uppercase font-bold flex items-center justify-center gap-1">
            <span>♀ Mujeres</span>
          </div>
          <div className="text-base font-black font-mono text-pink-200 mt-0.5">
            {totalWomen.toLocaleString('es-CO')}
          </div>
          <div className="text-[9px] font-mono text-pink-400">
            {((totalWomen / (totalPop || 1)) * 100).toFixed(1)}% del total
          </div>
        </div>
      </div>

      {/* 3. Pyramid Header & Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>Pirámide Poblacional de {communeName}</span>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-[10px] font-medium self-start sm:self-auto">
          <button
            onClick={() => setViewMode('quinquennial')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              viewMode === 'quinquennial'
                ? 'bg-sky-500/30 text-white font-bold border border-sky-400/50 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Quinquenal (17 Grupos)
          </button>
          <button
            onClick={() => setViewMode('broad')}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              viewMode === 'broad'
                ? 'bg-emerald-500/30 text-white font-bold border border-emerald-400/50 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Grandes Etapas
          </button>
        </div>
      </div>

      {/* 4. STANDARD QUINQUENNIAL PYRAMID (Diverging horizontal bars) */}
      {viewMode === 'quinquennial' && (
        <div className="p-3 sm:p-4 rounded-3xl bg-slate-950/60 border border-white/15 backdrop-blur-2xl space-y-1.5">
          {/* Legend */}
          <div className="grid grid-cols-2 gap-4 pb-2 border-b border-white/10 text-[11px] font-bold">
            <div className="flex items-center justify-end gap-1.5 text-sky-300 font-mono">
              <span>♂ HOMBRES</span>
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
            </div>
            <div className="flex items-center justify-start gap-1.5 text-pink-300 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-400 inline-block shadow-[0_0_8px_rgba(244,114,182,0.6)]" />
              <span>MUJERES ♀</span>
            </div>
          </div>

          {/* Pyramid Chart Stack */}
          <div className="space-y-1 pt-1">
            {pyramidCohorts.map((cohort) => {
              const isHovered = hoveredCohort === cohort.ageGroup;
              const hWidth = Math.min((cohort.hombresPct / maxPct) * 100, 100);
              const mWidth = Math.min((cohort.mujeresPct / maxPct) * 100, 100);

              return (
                <div
                  key={cohort.ageGroup}
                  onMouseEnter={() => setHoveredCohort(cohort.ageGroup)}
                  onMouseLeave={() => setHoveredCohort(null)}
                  className={`grid grid-cols-12 items-center gap-1 py-0.5 px-1 rounded-xl transition-all cursor-pointer ${
                    isHovered 
                      ? 'bg-sky-500/20 border border-sky-400/40 shadow-[0_0_12px_rgba(56,189,248,0.25)]' 
                      : 'hover:bg-white/05 border border-transparent'
                  }`}
                >
                  {/* Left Side: Men (Hombres) */}
                  <div className="col-span-5 flex items-center justify-end gap-1.5">
                    <span className="text-[10px] font-mono text-slate-400 tabular-nums hidden sm:inline-block">
                      {cohort.hombres.toLocaleString('es-CO')}
                    </span>
                    <span className="text-[10px] font-bold text-sky-300 tabular-nums font-mono">
                      {cohort.hombresPct.toFixed(1)}%
                    </span>
                    <div className="w-full max-w-[120px] sm:max-w-[150px] bg-slate-900/80 h-4 rounded-l-md flex justify-end overflow-hidden border border-sky-500/30">
                      <div
                        style={{ width: `${hWidth}%` }}
                        className={`h-full transition-all duration-300 rounded-l-md ${
                          isHovered 
                            ? 'bg-gradient-to-l from-sky-300 to-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.6)]' 
                            : 'bg-sky-500/80'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Center: Cohort Age Label */}
                  <div className="col-span-2 text-center">
                    <span
                      className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded-lg inline-block whitespace-nowrap transition-colors ${
                        isHovered
                          ? 'bg-sky-400 text-slate-950 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                          : 'bg-white/10 text-slate-200 border border-white/15'
                      }`}
                    >
                      {cohort.ageGroup}
                    </span>
                  </div>

                  {/* Right Side: Women (Mujeres) */}
                  <div className="col-span-5 flex items-center justify-start gap-1.5">
                    <div className="w-full max-w-[120px] sm:max-w-[150px] bg-slate-900/80 h-4 rounded-r-md flex justify-start overflow-hidden border border-pink-500/30">
                      <div
                        style={{ width: `${mWidth}%` }}
                        className={`h-full transition-all duration-300 rounded-r-md ${
                          isHovered 
                            ? 'bg-gradient-to-r from-pink-300 to-pink-500 shadow-[0_0_10px_rgba(244,114,182,0.6)]' 
                            : 'bg-pink-500/80'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-pink-300 tabular-nums font-mono">
                      {cohort.mujeresPct.toFixed(1)}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 tabular-nums hidden sm:inline-block">
                      {cohort.mujeres.toLocaleString('es-CO')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Hover Detail Tooltip Strip */}
          {hoveredCohort && (
            <div className="mt-3 p-3 bg-slate-900/95 border border-sky-400/50 rounded-2xl text-xs flex flex-wrap items-center justify-between gap-2 shadow-2xl animate-fadeIn">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sky-300">
                  Cohorte {pyramidCohorts.find((c) => c.ageGroup === hoveredCohort)?.label}:
                </span>
                <span className="font-bold text-white">
                  {pyramidCohorts.find((c) => c.ageGroup === hoveredCohort)?.total.toLocaleString('es-CO')} habitantes ({pyramidCohorts.find((c) => c.ageGroup === hoveredCohort)?.totalPct}% del total)
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono">
                <span className="text-sky-300 font-semibold">
                  ♂ {pyramidCohorts.find((c) => c.ageGroup === hoveredCohort)?.hombres.toLocaleString('es-CO')} ({pyramidCohorts.find((c) => c.ageGroup === hoveredCohort)?.hombresPct}%)
                </span>
                <span className="text-pink-300 font-semibold">
                  ♀ {pyramidCohorts.find((c) => c.ageGroup === hoveredCohort)?.mujeres.toLocaleString('es-CO')} ({pyramidCohorts.find((c) => c.ageGroup === hoveredCohort)?.mujeresPct}%)
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. BROAD AGE STAGES VIEW (Primera Infancia, Juventud, etc.) */}
      {viewMode === 'broad' && (
        <div className="space-y-2 p-3 sm:p-4 rounded-3xl bg-slate-950/60 border border-white/15 backdrop-blur-2xl">
          {broadGroups.map((group) => {
            const groupPct = ((group.total / (totalPop || 1)) * 100).toFixed(1);
            const hBarWidth = (group.hombres / (maxBroadPop || 1)) * 100;
            const mBarWidth = (group.mujeres / (maxBroadPop || 1)) * 100;

            return (
              <div
                key={group.range}
                className="p-3 rounded-2xl bg-white/05 border border-white/10 hover:border-sky-400/40 transition-colors"
              >
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-black text-white">{group.range}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {group.total.toLocaleString('es-CO')} hab.
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                      {groupPct}%
                    </span>
                  </div>
                </div>

                {/* Progress bars for men & women in this stage */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <div className="flex justify-between text-[10px] text-sky-300 font-mono mb-1">
                      <span>♂ Hombres</span>
                      <span>{group.hombres.toLocaleString('es-CO')} ({((group.hombres / (group.total || 1)) * 100).toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/10">
                      <div
                        style={{ width: `${(group.hombres / (group.total || 1)) * 100}%` }}
                        className="bg-sky-500 h-full rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] text-pink-300 font-mono mb-1">
                      <span>♀ Mujeres</span>
                      <span>{group.mujeres.toLocaleString('es-CO')} ({((group.mujeres / (group.total || 1)) * 100).toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-white/10">
                      <div
                        style={{ width: `${(group.mujeres / (group.total || 1)) * 100}%` }}
                        className="bg-pink-500 h-full rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 6. Structural Demographic Indicators Grid */}
      <div className="p-3.5 rounded-3xl bg-slate-950/60 border border-white/15 backdrop-blur-2xl space-y-2.5">
        <div className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider flex items-center justify-between">
          <span>Indicadores Demográficos Estructurales ({selectedYear})</span>
          <span className="text-slate-400 text-[9px] font-normal">Cálculo DANE / Alcaldía</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-2xl bg-white/05 border border-white/10">
            <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Edad Mediana</div>
            <div className="text-sm font-black font-mono text-sky-300 mt-0.5">{indicators.medianAge} a.</div>
            <div className="text-[8px] text-slate-400">Punto medio poblacional</div>
          </div>

          <div className="p-2 rounded-2xl bg-white/05 border border-white/10">
            <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Envejecimiento</div>
            <div className="text-sm font-black font-mono text-amber-300 mt-0.5">{indicators.agingIndex}%</div>
            <div className="text-[8px] text-slate-400">(65+ / 0-14) × 100</div>
          </div>

          <div className="p-2 rounded-2xl bg-white/05 border border-white/10">
            <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Dependencia</div>
            <div className="text-sm font-black font-mono text-purple-300 mt-0.5">{indicators.dependencyRatio}%</div>
            <div className="text-[8px] text-slate-400">Carga sobre edad productiva</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10 text-center text-xs">
          <div className="p-2 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
            <div className="text-[9px] font-mono text-emerald-300 uppercase font-bold">Bono Demográfico</div>
            <div className="text-xs font-black font-mono text-white mt-0.5">{indicators.workingAgeShare}%</div>
            <div className="text-[8px] text-slate-400">Población 15 a 64 años</div>
          </div>

          <div className="p-2 rounded-2xl bg-rose-500/10 border border-rose-400/20">
            <div className="text-[9px] font-mono text-rose-300 uppercase font-bold">Adultos Mayores</div>
            <div className="text-xs font-black font-mono text-white mt-0.5">{indicators.elderlyShare}%</div>
            <div className="text-[8px] text-slate-400">Población 65+ años</div>
          </div>

          <div className="p-2 rounded-2xl bg-sky-500/10 border border-sky-400/20">
            <div className="text-[9px] font-mono text-sky-300 uppercase font-bold">Razón de Sexo</div>
            <div className="text-xs font-black font-mono text-white mt-0.5">{indicators.sexRatio}</div>
            <div className="text-[8px] text-slate-400">Hombres por 100 mujeres</div>
          </div>
        </div>
      </div>
    </div>
  );
};

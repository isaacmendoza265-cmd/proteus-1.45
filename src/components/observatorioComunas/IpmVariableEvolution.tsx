import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';
import { 
  TrendingDown, 
  TrendingUp, 
  Minus, 
  Sliders, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  Layers,
  BarChart3
} from 'lucide-react';
import { IPM_DATA } from '../../data/observatorioComunas/ipmData';
import { IPM_DIMENSIONS_INFO } from '../../data/observatorioComunas/ipmDimensionsInfo';
import { IPMDimensionMeta, IPMRecord } from '../../data/observatorioComunas/types';

interface IpmVariableEvolutionProps {
  communeId: number;
  communeName: string;
}

const CATEGORIES = [
  'Todas',
  'Educación',
  'Salud',
  'Trabajo',
  'Vivienda y Servicios',
  'Niñez y Juventud'
] as const;

export const IpmVariableEvolution: React.FC<IpmVariableEvolutionProps> = ({
  communeId,
  communeName
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedVariableKey, setSelectedIpmKey] = useState<string>('desempleoLargaDuracion');
  const [comparisonKeys, setComparisonKeys] = useState<string[]>([
    'ipmGlobal',
    'desempleoLargaDuracion',
    'empleoInformal'
  ]);
  const [multiMode, setMultiMode] = useState<boolean>(false);

  // Historical data for this commune
  const communeIpmHistory = useMemo(() => {
    return IPM_DATA[communeId] || IPM_DATA[1] || [];
  }, [communeId]);

  // Filter available dimensions by category
  const filteredDimensions = useMemo(() => {
    if (selectedCategory === 'Todas') {
      return IPM_DIMENSIONS_INFO;
    }
    return IPM_DIMENSIONS_INFO.filter((dim) => dim.category === selectedCategory);
  }, [selectedCategory]);

  // Metadata for the primary selected variable
  const selectedMeta = useMemo(() => {
    return (
      IPM_DIMENSIONS_INFO.find((dim) => dim.key === selectedVariableKey) ||
      IPM_DIMENSIONS_INFO[0]
    );
  }, [selectedVariableKey]);

  // Transform data for Recharts
  const chartData = useMemo(() => {
    return communeIpmHistory.map((rec) => {
      const point: Record<string, any> = { year: rec.year };
      IPM_DIMENSIONS_INFO.forEach((dim) => {
        point[dim.key] = (rec as any)[dim.key] ?? 0;
      });
      return point;
    });
  }, [communeIpmHistory]);

  // Calculate change stats for single variable mode
  const stats = useMemo(() => {
    if (communeIpmHistory.length === 0) return null;
    const firstRec = communeIpmHistory[0];
    const lastRec = communeIpmHistory[communeIpmHistory.length - 1];

    const startVal = (firstRec as any)[selectedVariableKey] ?? 0;
    const endVal = (lastRec as any)[selectedVariableKey] ?? 0;
    const diff = endVal - startVal;
    const pctChange = startVal > 0 ? (diff / startVal) * 100 : 0;

    let maxVal = -1;
    let maxYear = firstRec.year;
    let minVal = 999;
    let minYear = firstRec.year;

    communeIpmHistory.forEach((r) => {
      const v = (r as any)[selectedVariableKey] ?? 0;
      if (v > maxVal) {
        maxVal = v;
        maxYear = r.year;
      }
      if (v < minVal) {
        minVal = v;
        minYear = r.year;
      }
    });

    return {
      startYear: firstRec.year,
      startVal,
      endYear: lastRec.year,
      endVal,
      diff: Number(diff.toFixed(2)),
      pctChange: Number(pctChange.toFixed(1)),
      maxVal,
      maxYear,
      minVal,
      minYear,
      isImproved: diff < 0 // In poverty metrics, a lower percentage is better
    };
  }, [communeIpmHistory, selectedVariableKey]);

  const toggleComparisonKey = (key: string) => {
    if (comparisonKeys.includes(key)) {
      if (comparisonKeys.length > 1) {
        setComparisonKeys(comparisonKeys.filter((k) => k !== key));
      }
    } else {
      if (comparisonKeys.length < 4) {
        setComparisonKeys([...comparisonKeys, key]);
      }
    }
  };

  const getLineColor = (index: number) => {
    const colors = ['#38bdf8', '#f59e0b', '#ec4899', '#10b981', '#a855f7', '#6366f1'];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-4">
      {/* 1. Header & Mode Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-2xl bg-slate-900/70 border border-white/15 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
              <BarChart3 className="w-3.5 h-3.5" />
            </span>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Evolución Histórica IPM ({communeIpmHistory[0]?.year} - {communeIpmHistory[communeIpmHistory.length - 1]?.year})
            </h4>
          </div>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Pobreza Multidimensional y 15 variables de privación territorial • {communeName}
          </p>
        </div>

        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10 text-[10px] font-medium self-start sm:self-auto shrink-0">
          <button
            onClick={() => setMultiMode(false)}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              !multiMode
                ? 'bg-emerald-500/30 text-white font-bold border border-emerald-400/50 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Variable Individual
          </button>
          <button
            onClick={() => setMultiMode(true)}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
              multiMode
                ? 'bg-sky-500/30 text-white font-bold border border-sky-400/50 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Comparar (Hasta 4)
          </button>
        </div>
      </div>

      {/* 2. Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] font-bold">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-1 rounded-xl transition shrink-0 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-white/20 text-white border border-white/30 shadow-xs'
                : 'bg-white/05 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Variable Selector Strip */}
      {!multiMode ? (
        <div className="flex items-center gap-2">
          <label className="text-[10px] font-mono uppercase text-slate-400 font-bold shrink-0">
            Variable:
          </label>
          <select
            value={selectedVariableKey}
            onChange={(e) => setSelectedIpmKey(e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl bg-slate-900/90 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-emerald-400"
          >
            {filteredDimensions.map((dim) => (
              <option key={dim.key} value={dim.key} className="bg-slate-900 text-white">
                {dim.name} ({dim.category})
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="p-2.5 rounded-2xl bg-white/05 border border-white/10 space-y-1.5">
          <div className="text-[10px] font-mono uppercase text-sky-400 font-bold">
            Selecciona hasta 4 variables para graficar simultáneamente:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filteredDimensions.map((dim) => {
              const isSelected = comparisonKeys.includes(dim.key);
              return (
                <button
                  key={dim.key}
                  onClick={() => toggleComparisonKey(dim.key)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-medium transition cursor-pointer border ${
                    isSelected
                      ? 'bg-sky-500/30 text-white border-sky-400/60 font-bold'
                      : 'bg-white/05 text-slate-400 border-white/10 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {dim.shortName}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. KPI Summary Strip (Single Variable Mode) */}
      {!multiMode && stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="p-2.5 rounded-2xl bg-white/05 border border-white/10">
            <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Inicio ({stats.startYear})</div>
            <div className="text-base font-black font-mono text-white mt-0.5">{stats.startVal}%</div>
            <div className="text-[9px] text-slate-400">Línea base</div>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/05 border border-white/10">
            <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Último ({stats.endYear})</div>
            <div className="text-base font-black font-mono text-white mt-0.5">{stats.endVal}%</div>
            <div className="text-[9px] text-slate-400">Corte actual</div>
          </div>

          <div className={`p-2.5 rounded-2xl border ${
            stats.isImproved 
              ? 'bg-emerald-500/15 border-emerald-400/30 text-emerald-200' 
              : 'bg-rose-500/15 border-rose-400/30 text-rose-200'
          }`}>
            <div className="text-[9px] font-mono uppercase font-bold flex items-center gap-1">
              {stats.isImproved ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
              <span>Variación Neta</span>
            </div>
            <div className="text-base font-black font-mono mt-0.5">
              {stats.diff > 0 ? `+${stats.diff}` : stats.diff} pts
            </div>
            <div className="text-[9px]">
              {stats.isImproved ? 'Reducción de pobreza' : 'Aumento de privación'}
            </div>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/05 border border-white/10">
            <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Pico Histórico</div>
            <div className="text-base font-black font-mono text-amber-300 mt-0.5">{stats.maxVal}%</div>
            <div className="text-[9px] text-slate-400">Registrado en {stats.maxYear}</div>
          </div>
        </div>
      )}

      {/* 5. Interactive LineChart with Recharts */}
      <div className="p-3.5 sm:p-4 rounded-3xl bg-slate-950/70 border border-white/15 backdrop-blur-2xl">
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
              <XAxis 
                dataKey="year" 
                stroke="#94a3b8" 
                fontSize={11} 
                tickLine={false}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={11} 
                tickLine={false}
                unit="%"
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#030712dd',
                  backdropFilter: 'blur(16px)',
                  borderColor: '#ffffff25',
                  borderRadius: '16px',
                  color: '#ffffff',
                  fontSize: '11px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}
                formatter={(value: any, name: any) => {
                  const meta = IPM_DIMENSIONS_INFO.find(d => d.key === name);
                  return [`${value}%`, meta?.shortName || name];
                }}
                labelFormatter={(label) => `Año ${label}`}
              />
              <Legend 
                wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }}
                formatter={(value) => {
                  const meta = IPM_DIMENSIONS_INFO.find(d => d.key === value);
                  return meta?.shortName || value;
                }}
              />

              {!multiMode ? (
                <Line
                  type="monotone"
                  dataKey={selectedVariableKey}
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#10b981', stroke: '#ffffff', strokeWidth: 1.5 }}
                  activeDot={{ r: 6, fill: '#34d399', stroke: '#ffffff', strokeWidth: 2 }}
                />
              ) : (
                comparisonKeys.map((key, idx) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={getLineColor(idx)}
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: getLineColor(idx) }}
                    activeDot={{ r: 5 }}
                  />
                ))
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Variable Context Insight */}
        {!multiMode && selectedMeta && (
          <div className="mt-3 p-2.5 rounded-2xl bg-white/05 border border-white/10 text-xs text-slate-300">
            <span className="font-bold text-white">{selectedMeta.name}: </span>
            <span>{selectedMeta.description}</span>
          </div>
        )}
      </div>
    </div>
  );
};

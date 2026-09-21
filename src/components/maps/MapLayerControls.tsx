import React from 'react';
import { Vote, Users, AlertOctagon, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { ThematicMetricLayer } from '../../data/geojson';

interface MapLayerControlsProps {
  activeLayer: ThematicMetricLayer;
  onChangeLayer: (layer: ThematicMetricLayer) => void;
  searchQuery: string;
  onChangeSearchQuery: (query: string) => void;
  totalFeaturesCount: number;
}

export const MapLayerControls: React.FC<MapLayerControlsProps> = ({
  activeLayer,
  onChangeLayer,
  searchQuery,
  onChangeSearchQuery,
  totalFeaturesCount
}) => {
  const layerOptions: {
    id: ThematicMetricLayer;
    label: string;
    icon: React.ReactNode;
    color: string;
    description: string;
  }[] = [
    {
      id: 'electoral',
      label: 'Electoral',
      icon: <Vote className="w-3.5 h-3.5" />,
      color: 'from-sky-500/30 to-blue-600/40 border-sky-400/60 text-sky-200',
      description: 'Resultados 2023-2026, partidos dominantes y abstención'
    },
    {
      id: 'demografico',
      label: 'Demografía & Estrato',
      icon: <Users className="w-3.5 h-3.5" />,
      color: 'from-emerald-500/30 to-teal-600/40 border-emerald-400/60 text-emerald-200',
      description: 'Población, estratos 1 al 6 y porcentaje de jóvenes (18-28)'
    },
    {
      id: 'nbi',
      label: 'Índice NBI',
      icon: <TrendingUp className="w-3.5 h-3.5" />,
      color: 'from-amber-500/30 to-orange-600/40 border-amber-400/60 text-amber-200',
      description: 'Necesidades Básicas Insatisfechas DANE y vulnerabilidad'
    },
    {
      id: 'riesgo',
      label: 'Riesgo & Alertas',
      icon: <AlertOctagon className="w-3.5 h-3.5" />,
      color: 'from-rose-500/30 to-red-600/40 border-rose-400/60 text-rose-200',
      description: 'Semáforo de orden público, conflictividad y seguimiento institucional'
    }
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/40 backdrop-blur-2xl border border-white/20 shadow-[0_8px_24px_0_rgba(0,0,0,0.3),inset_0_1px_1px_0_rgba(255,255,255,0.3)]">
      {/* Thematic buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-extrabold flex items-center gap-1 mr-1">
          <Sparkles className="w-3 h-3 text-sky-400" />
          Capa Temática:
        </span>
        {layerOptions.map((opt) => {
          const isActive = activeLayer === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onChangeLayer(opt.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                isActive
                  ? `bg-gradient-to-r ${opt.color} border shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.5),0_0_12px_rgba(56,189,248,0.25)] scale-105`
                  : 'text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15'
              }`}
              title={opt.description}
            >
              <span>{opt.icon}</span>
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter / Search bar */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onChangeSearchQuery(e.target.value)}
            placeholder="Buscar en el mapa..."
            className="w-44 sm:w-56 px-3 py-1.5 pl-8 rounded-xl text-xs bg-black/30 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-sky-400/80 focus:ring-2 focus:ring-sky-500/20 backdrop-blur-xl transition"
          />
          <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
        <div className="px-2.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-[11px] font-mono font-bold text-slate-300">
          {totalFeaturesCount} polígonos
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Compass, Shield, Layers, Building2, MapPin, ChevronRight, RotateCcw } from 'lucide-react';
import { ZoomLevelId, ZOOM_LEVELS_CONFIG, ORDERED_ZOOM_LEVELS } from '../../data/geojson';

interface MapBreadcrumbProps {
  currentLevel: ZoomLevelId;
  onSelectLevel: (level: ZoomLevelId) => void;
  selectedFeatureName?: string | null;
  selectedDepartmentName?: string;
  onResetToNational: () => void;
}

export const MapBreadcrumb: React.FC<MapBreadcrumbProps> = ({
  currentLevel,
  onSelectLevel,
  selectedFeatureName,
  selectedDepartmentName,
  onResetToNational
}) => {
  const levels = ORDERED_ZOOM_LEVELS;

  const getLevelIcon = (lvl: ZoomLevelId) => {
    switch (lvl) {
      case 'nacional':
        return <Compass className="w-3.5 h-3.5" />;
      case 'departamental':
        return <Shield className="w-3.5 h-3.5" />;
      case 'metropolitano':
        return <Layers className="w-3.5 h-3.5" />;
      case 'municipal':
      case 'hiperlocal':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'comunas-barrios':
        return <MapPin className="w-3.5 h-3.5" />;
      default:
        return <MapPin className="w-3.5 h-3.5" />;
    }
  };

  const isLevelActive = (lvl: ZoomLevelId) => {
    const currentIndex = levels.indexOf(currentLevel === 'hiperlocal' ? 'municipal' : currentLevel);
    const lvlIndex = levels.indexOf(lvl);
    return lvlIndex <= currentIndex;
  };

  const isCurrent = (lvl: ZoomLevelId) => {
    if (currentLevel === 'hiperlocal' && lvl === 'municipal') return true;
    return currentLevel === lvl;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-2.5 px-4 rounded-2xl bg-slate-950/45 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_1px_0_rgba(255,255,255,0.4)]">
      {/* Breadcrumb path */}
      <nav className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
        {levels.map((lvl, index) => {
          const config = ZOOM_LEVELS_CONFIG[lvl];
          const active = isLevelActive(lvl);
          const current = isCurrent(lvl);

          return (
            <React.Fragment key={lvl}>
              {index > 0 && (
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-sky-400' : 'text-slate-600'}`} />
              )}
              <button
                onClick={() => onSelectLevel(lvl)}
                disabled={!active && !current}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-300 font-bold ${
                  current
                    ? 'bg-gradient-to-r from-amber-400/30 via-sky-400/30 to-blue-600/40 text-white border border-amber-300/70 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.6),0_0_18px_rgba(251,191,36,0.35)] scale-105'
                    : active
                    ? 'text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15'
                    : 'text-slate-500 opacity-50 cursor-not-allowed border border-transparent'
                }`}
                title={`Navegar a ${config.label}`}
              >
                <span className={current ? 'text-amber-300 animate-pulse' : 'text-slate-400'}>
                  {getLevelIcon(lvl)}
                </span>
                <span>
                  {lvl === 'departamental' && selectedDepartmentName ? selectedDepartmentName : config.shortLabel}
                </span>
              </button>
            </React.Fragment>
          );
        })}

        {/* Selected target badge (if any) */}
        {selectedFeatureName && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
            <span className="flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-500/25 border border-emerald-400/60 text-emerald-200 text-xs font-black shadow-[0_0_12px_rgba(52,211,153,0.3)]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-ping" />
              {selectedFeatureName}
            </span>
          </>
        )}
      </nav>

      {/* Global Reset Button */}
      <button
        onClick={onResetToNational}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] transition active:scale-95"
        title="Restablecer vista a nivel Nacional (Colombia)"
      >
        <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
        <span className="hidden sm:inline">Resetear Zoom</span>
      </button>
    </div>
  );
};

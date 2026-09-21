import React from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  Vote, 
  TrendingUp, 
  Building2, 
  Home, 
  GraduationCap, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react';
import { TerritoryGeoFeature, ZoomLevelId } from '../../data/geojson';
import { MEDELLIN_COMUNAS_DATA, METROPOLITAN_MUNICIPALITIES_DATA } from '../../data/metropolitanAndMedellinData';

interface CommuneDetailDrawerProps {
  feature: TerritoryGeoFeature | null;
  onClose: () => void;
  onDrillDown?: (targetLevel: ZoomLevelId, featureId: string) => void;
}

export const CommuneDetailDrawer: React.FC<CommuneDetailDrawerProps> = ({
  feature,
  onClose,
  onDrillDown
}) => {
  if (!feature) return null;

  const props = feature.properties;
  const isComuna = feature.id.startsWith('med-');
  const isMetroMuni = props.level === 'metropolitano';
  const isSubregion = props.level === 'departamental';
  const isDepartment = props.level === 'nacional';

  const comunaData = isComuna ? MEDELLIN_COMUNAS_DATA[feature.id] : null;
  const metroData = isMetroMuni ? METROPOLITAN_MUNICIPALITIES_DATA[feature.id] : null;

  const canDrillDown = 
    (isDepartment && feature.id === 'antioquia') ||
    (isSubregion && feature.id === 'valle-de-aburra') ||
    (isMetroMuni && feature.id === 'medellin');

  const getDrillDownTarget = (): { level: ZoomLevelId; label: string } | null => {
    if (isDepartment && feature.id === 'antioquia') {
      return { level: 'departamental', label: 'Explorar 9 Subregiones de Antioquia' };
    }
    if (isSubregion && feature.id === 'valle-de-aburra') {
      return { level: 'metropolitano', label: 'Explorar 10 Municipios del Valle de Aburrá' };
    }
    if (isMetroMuni && feature.id === 'medellin') {
      return { level: 'hiperlocal', label: 'Explorar 16 Comunas y 5 Corregimientos' };
    }
    return null;
  };

  const drillTarget = getDrillDownTarget();

  return (
    <div className="w-full lg:w-96 flex flex-col max-h-[700px] overflow-hidden rounded-3xl bg-slate-950/65 backdrop-blur-3xl border border-white/25 shadow-[0_16px_48px_0_rgba(0,0,0,0.5),inset_0_1.5px_2px_0_rgba(255,255,255,0.45)] text-white">
      {/* Header */}
      <div className="p-4 border-b border-white/15 flex items-start justify-between gap-2 bg-gradient-to-r from-sky-500/15 via-indigo-500/10 to-transparent">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>Nivel {props.level.toUpperCase()}</span>
            {props.zone && (
              <span className="px-1.5 py-0.5 rounded-full bg-white/10 text-white text-[9px]">
                {props.zone}
              </span>
            )}
          </div>
          <h3 className="text-base font-black tracking-tight text-white mt-1">
            {props.name}
          </h3>
          {props.subregion && (
            <p className="text-xs text-slate-300 font-medium">{props.subregion}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-300 hover:text-white transition"
          title="Cerrar panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Drill-Down Action Button (if applicable) */}
      {canDrillDown && drillTarget && onDrillDown && (
        <div className="p-3 bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border-b border-white/15">
          <button
            onClick={() => onDrillDown(drillTarget.level, feature.id)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500/40 via-teal-500/40 to-sky-500/40 border border-emerald-300/60 hover:border-white text-white text-xs font-black shadow-[0_0_20px_rgba(52,211,153,0.35),inset_0_1px_1px_0_rgba(255,255,255,0.6)] transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-300 animate-spin" />
              <span>{drillTarget.label}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Core Metric Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-2xl bg-white/05 border border-white/15 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
              <Users className="w-3 h-3 text-sky-400" />
              Población
            </div>
            <div className="text-base font-black text-white mt-1">
              {(props.population || 0).toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Habitantes DANE</div>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/05 border border-white/15 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
              <Vote className="w-3 h-3 text-emerald-400" />
              Censo Electoral
            </div>
            <div className="text-base font-black text-white mt-1">
              {(props.electoralCensus || 0).toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Potencial votante</div>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/05 border border-white/15 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
              <TrendingUp className="w-3 h-3 text-amber-400" />
              NBI / Pobreza
            </div>
            <div className="text-base font-black text-amber-300 mt-1">
              {props.nbiPercentage !== undefined ? `${props.nbiPercentage}%` : 'N/D'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Necesidades básicas</div>
          </div>

          <div className="p-2.5 rounded-2xl bg-white/05 border border-white/15 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
            <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase">
              <ShieldCheck className="w-3 h-3 text-rose-400" />
              Riesgo Territorial
            </div>
            <div className="text-base font-black text-rose-300 mt-1">
              {props.riskLevel || 'Medio'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Semáforo operativo</div>
          </div>
        </div>

        {/* COMUNA-SPECIFIC DEMOGRAPHIC & ELECTORAL DETAIL */}
        {comunaData && (
          <>
            {/* Stratum Distribution Bar */}
            <div className="p-3 rounded-2xl bg-white/05 border border-white/15 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <Home className="w-3.5 h-3.5 text-indigo-400" />
                  Estratificación Socioeconómica
                </span>
                <span className="text-[10px] font-mono font-black text-indigo-300">
                  {comunaData.predominantStratum}
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-900/60 rounded-full overflow-hidden flex border border-white/10">
                <div 
                  style={{ width: `${comunaData.strataDistribution.bajo}%` }} 
                  className="bg-amber-500 h-full" 
                  title={`Bajo (1-2): ${comunaData.strataDistribution.bajo}%`}
                />
                <div 
                  style={{ width: `${comunaData.strataDistribution.medio}%` }} 
                  className="bg-sky-500 h-full" 
                  title={`Medio (3-4): ${comunaData.strataDistribution.medio}%`}
                />
                <div 
                  style={{ width: `${comunaData.strataDistribution.alto}%` }} 
                  className="bg-emerald-500 h-full" 
                  title={`Alto (5-6): ${comunaData.strataDistribution.alto}%`}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  E1-2: {comunaData.strataDistribution.bajo}%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
                  E3-4: {comunaData.strataDistribution.medio}%
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  E5-6: {comunaData.strataDistribution.alto}%
                </span>
              </div>
            </div>

            {/* Youth and Abstention Bars */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-2xl bg-white/05 border border-white/15">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                  <GraduationCap className="w-3 h-3 text-sky-400" />
                  Jóvenes (18-28)
                </div>
                <div className="text-sm font-black text-sky-300 mt-1">
                  {comunaData.youthPercentage}%
                </div>
                <div className="text-[10px] text-slate-400">Población juvenil</div>
              </div>

              <div className="p-2.5 rounded-2xl bg-white/05 border border-white/15">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                  <BarChart3 className="w-3 h-3 text-purple-400" />
                  Abstención
                </div>
                <div className="text-sm font-black text-purple-300 mt-1">
                  {comunaData.abstentionRate}%
                </div>
                <div className="text-[10px] text-slate-400">Promedio histórico</div>
              </div>
            </div>

            {/* 2023 Mayoral Results */}
            <div className="p-3 rounded-2xl bg-white/05 border border-white/15 space-y-2">
              <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                <Vote className="w-3.5 h-3.5 text-emerald-400" />
                Histórico Alcaldía de Medellín 2023
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">
                    {comunaData.historicalMayorResults2023.winnerCandidate} ({comunaData.historicalMayorResults2023.winnerParty})
                  </span>
                  <span className="font-mono font-black text-emerald-400">
                    {comunaData.historicalMayorResults2023.winnerPercentage}% ({comunaData.historicalMayorResults2023.winnerVotes.toLocaleString()})
                  </span>
                </div>
                <div className="w-full bg-slate-900/60 h-2 rounded-full overflow-hidden border border-white/10">
                  <div 
                    style={{ width: `${comunaData.historicalMayorResults2023.winnerPercentage}%` }}
                    className="bg-emerald-500 h-full rounded-full"
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>2do: {comunaData.historicalMayorResults2023.secondPlaceCandidate}</span>
                  <span className="font-mono">{comunaData.historicalMayorResults2023.secondPlaceVotes.toLocaleString()} votos</span>
                </div>
              </div>
            </div>

            {/* Key Dynamic */}
            <div className="p-3 rounded-2xl bg-white/05 border border-white/15 space-y-1">
              <div className="text-[10px] font-bold uppercase text-sky-400">Dinámica Estratégica Clave</div>
              <p className="text-slate-300 text-xs leading-relaxed">
                {comunaData.keyDynamics}
              </p>
            </div>

            {/* Barrios List */}
            {comunaData.barriosList && comunaData.barriosList.length > 0 && (
              <div className="p-3 rounded-2xl bg-white/05 border border-white/15 space-y-1.5">
                <div className="text-[10px] font-bold uppercase text-slate-400">
                  Barrios / Sectores Principales ({comunaData.barriosList.length})
                </div>
                <div className="flex flex-wrap gap-1">
                  {comunaData.barriosList.map((b, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-lg bg-white/10 text-slate-300 text-[10px]">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* METROPOLITAN MUNICIPALITY DETAIL */}
        {metroData && (
          <>
            <div className="p-3 rounded-2xl bg-white/05 border border-white/15 space-y-1">
              <div className="text-[10px] font-bold uppercase text-sky-400">Actividad Económica Predominante</div>
              <p className="text-slate-300 text-xs leading-relaxed">
                {metroData.predominantEconomicActivity}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/05 border border-white/15 space-y-2">
              <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                Alcaldía 2023 - 2027
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{metroData.historicalMayorResults2023.winnerCandidate}</span>
                <span className="font-mono text-emerald-400 font-black">
                  {metroData.historicalMayorResults2023.totalVotes.toLocaleString()} votos
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                Partido: {metroData.historicalMayorResults2023.winnerParty} • Abstención: {metroData.historicalMayorResults2023.abstentionRate}%
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/05 border border-white/15 space-y-1.5">
              <div className="text-[10px] font-bold uppercase text-slate-400">
                Divisiones Territoriales ({metroData.urbanDivisionsCount} urbanas, {metroData.ruralDivisionsCount} rurales)
              </div>
              <div className="flex flex-wrap gap-1">
                {metroData.communesOrZonesSummary.map((z, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-lg bg-white/10 text-slate-300 text-[10px]">
                    {z}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SUBREGION DETAIL */}
        {isSubregion && (
          <div className="p-3 rounded-2xl bg-white/05 border border-white/15 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Nodo Cabecera:</span>
              <span className="font-bold text-white">{props.capitalNode}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Municipios:</span>
              <span className="font-bold text-white">{props.totalMunicipalities} municipios</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Tendencia Política:</span>
              <span className="font-bold text-sky-400">{props.predominantParty}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

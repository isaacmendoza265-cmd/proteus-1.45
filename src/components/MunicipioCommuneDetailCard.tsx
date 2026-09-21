import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  MapPin,
  Users,
  GraduationCap,
  DollarSign,
  Briefcase,
  Home,
  Building2,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Percent,
  Sparkles,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ALL_MUNICIPIOS_TERRITORIAL_DATA, AreaTerritorialProfile } from '../data/allMunicipiosTerritorialData';

interface MunicipioCommuneDetailCardProps {
  muniId: string;
  selectedAreaId?: string;
  onSelectArea: (areaId: string) => void;
}

export const MunicipioCommuneDetailCard: React.FC<MunicipioCommuneDetailCardProps> = ({
  muniId,
  selectedAreaId,
  onSelectArea
}) => {
  const config = ALL_MUNICIPIOS_TERRITORIAL_DATA[muniId] || ALL_MUNICIPIOS_TERRITORIAL_DATA['rionegro'];
  const activeProfile = config.areas.find(a => a.id === selectedAreaId) || config.areas[0];

  const [benchmarkView, setBenchmarkView] = useState<'estratos' | 'juventud' | 'poblacion'>('poblacion');

  // Datos para gráfico de población por comunas
  const populationData = config.areas.map(a => ({
    name: a.shortName,
    value: a.estimatedPopulationNumeric || 0,
    color: a.color,
    isSelected: a.id === activeProfile.id
  }));

  // Datos para gráfico de juventud
  const youthShareData = activeProfile.youthSharePercentage !== null && activeProfile.youthSharePercentage !== undefined
    ? [
        { name: activeProfile.shortName, value: activeProfile.youthSharePercentage, color: activeProfile.color },
        { name: `Resto de ${config.name}`, value: Number((100 - activeProfile.youthSharePercentage).toFixed(1)), color: '#CBD5E1' }
      ]
    : null;

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-5 sm:p-7 shadow-sm border border-white/10 space-y-6">
      
      {/* Selector de Comuna / Corregimiento */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-150">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-900" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Pánel Territorial por Comuna y Sector • {config.fullName}
            </h3>
          </div>
          <span className="text-[10px] font-bold text-slate-400">
            {config.areas.length} divisiones registradas
          </span>
        </div>

        {/* Barra de botones de sectores */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-1.5 pt-1">
          {config.areas.map((area) => {
            const isSelected = area.id === activeProfile.id;
            return (
              <button
                key={area.id}
                onClick={() => onSelectArea(area.id)}
                className={`px-2.5 py-2 rounded-xl text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-900 text-white shadow-sm border-blue-950 scale-[1.02]'
                    : 'bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:bg-slate-100 text-slate-200 border-white/10 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: area.color }}
                  />
                  <span className={`text-[8px] font-black uppercase ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                    {area.zone}
                  </span>
                </div>
                <div className="mt-1">
                  <span className={`block text-[11px] font-black leading-tight line-clamp-1 ${isSelected ? 'text-white' : 'text-white'}`}>
                    {area.shortName}
                  </span>
                  <span className={`text-[9px] font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {area.estimatedPopulationNumeric ? `${(area.estimatedPopulationNumeric / 1000).toFixed(1)}k hab.` : 'Sin datos'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ENCABEZADO DE LA COMUNA SELECCIONADA */}
      <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5 border border-white/10/90 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full text-white shadow-2xs"
                style={{ backgroundColor: activeProfile.color }}
              >
                {activeProfile.type}
              </span>
              <span className="text-[10px] font-extrabold text-blue-900 bg-sky-500/20 text-sky-300/80 px-2 py-0.5 rounded-md">
                Zona {activeProfile.zone}
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                {activeProfile.householdsShareText}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{activeProfile.name}</span>
            </h3>
          </div>

          {/* Cifra Poblacional Destacada */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl px-4 py-2.5 rounded-2xl border border-white/10/90 shadow-2xs self-start md:self-auto min-w-[210px]">
            <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">
              Población Registrada
            </span>
            <div className="text-sm sm:text-base font-black text-white leading-snug">
              {activeProfile.populationText}
            </div>
            {activeProfile.estimatedYouthCount ? (
              <span className="text-[10px] text-blue-700 font-bold block mt-0.5">
                ~{activeProfile.estimatedYouthCount.toLocaleString()} jóvenes (14-28 años)
              </span>
            ) : (
              <span className="text-[10px] text-amber-700 font-bold block mt-0.5">
                Juventud por comuna: Sin datos
              </span>
            )}
          </div>
        </div>

        {/* Puntos Estratégicos Clave */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
          {activeProfile.strategicHighlights.map((highlight, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-white/10 text-xs text-slate-200 flex items-start gap-2 shadow-2xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-snug">{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SECCIÓN DE BARRIOS O VEREDAS CON AVISO EXPRESO DE "SIN DATOS" */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-150">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-900" />
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              Desglose de {activeProfile.zone === 'Urbana' ? 'Barrios' : 'Veredas'} en {activeProfile.shortName}
            </h4>
          </div>
          <span className="text-[10px] text-slate-400 font-bold">
            {activeProfile.barriosList.length} sectores oficiales
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {activeProfile.barriosList.map((barrio, idx) => (
            <div
              key={idx}
              className="p-3 bg-white/[0.04] backdrop-blur-sm border border-white/10/90 rounded-xl border border-white/10 flex flex-col justify-between space-y-1.5"
            >
              <div className="flex items-start justify-between gap-1">
                <span className="text-xs font-black text-white leading-tight">
                  {barrio.name}
                </span>
                {barrio.hasData ? (
                  <span className="text-[9px] font-black text-emerald-800 bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded shrink-0">
                    {barrio.percentage}%
                  </span>
                ) : (
                  <span className="text-[8px] font-black text-amber-800 bg-amber-500/20 text-amber-300/90 border border-amber-300 px-1.5 py-0.5 rounded shrink-0 uppercase">
                    Sin datos
                  </span>
                )}
              </div>

              <div className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>
                  {barrio.note || (barrio.hasData ? 'Juventud censada' : 'Microdato por barrio')}
                </span>
                {!barrio.hasData && (
                  <span className="text-amber-700 italic font-semibold">
                    Sin datos
                  </span>
                )}
              </div>
            </div>
          ))}

          {activeProfile.barriosList.length === 0 && (
            <div className="col-span-full p-4 bg-amber-500/10 rounded-xl border border-amber-200 text-xs text-amber-900">
              <strong>Sin datos:</strong> No se encuentra desagregación oficial de barrios o veredas para este polígono administrativo.
            </div>
          )}
        </div>
      </div>

      {/* SECCIÓN DE INDICADORES SOCIODEMOGRÁFICOS */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 pb-1 border-b border-slate-150">
          <Layers className="w-4 h-4 text-purple-600" />
          <h4 className="text-xs font-black uppercase tracking-wider text-white">
            Ficha de Indicadores Sociales y Económicos
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Tarjeta 1: Estratificación */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Estratificación
              </span>
              <Home className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-sm font-black text-white">
              {activeProfile.predominantStrataNumbers?.length > 0 
                ? `Estrato ${activeProfile.predominantStrataNumbers.join(' y ')}` 
                : (
                  <span className="text-amber-700 font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-xs">
                    Sin datos
                  </span>
                )
              }
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              {activeProfile.strataText}
            </p>
          </div>

          {/* Tarjeta 2: Nivel Educativo */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Nivel Educativo
              </span>
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-sm font-black text-white">
              {activeProfile.educationLevelText.includes('Sin datos') ? (
                <span className="text-amber-700 font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-xs">
                  Sin datos
                </span>
              ) : (
                'Desagregado'
              )}
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              {activeProfile.educationLevelText}
            </p>
          </div>

          {/* Tarjeta 3: Pobreza / NBI */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Pobreza / NBI
              </span>
              <DollarSign className="w-3.5 h-3.5 text-rose-600" />
            </div>
            <div className="text-sm font-black text-white">
              {activeProfile.inbiText.includes('Sin datos') ? (
                <span className="text-amber-700 font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-xs">
                  Sin datos
                </span>
              ) : (
                'Índice Registrado'
              )}
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              {activeProfile.inbiBenchmark || activeProfile.inbiText}
            </p>
          </div>

          {/* Tarjeta 4: Dinámica Laboral / Desempleo */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                Tasa de Desempleo
              </span>
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-sm font-black text-white">
              {activeProfile.specificMetrics?.unemploymentRate ? (
                `${activeProfile.specificMetrics.unemploymentRate}% (ECV)`
              ) : (
                <span className="text-amber-700 font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-xs">
                  Sin datos
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              {activeProfile.specificMetrics?.unemploymentNote || 'Sin datos oficiales por comuna.'}
            </p>
          </div>
        </div>
      </div>

      {/* GRÁFICO DE CONTRASTE POBLACIONAL */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between pb-1 border-b border-slate-150">
          <span className="text-xs font-black uppercase tracking-wider text-white">
            Comparativa Poblacional de {config.name}
          </span>
          <span className="text-[10px] text-slate-400 font-bold">
            Distribución por sector
          </span>
        </div>

        <div className="h-64 bg-white/[0.04] backdrop-blur-sm border border-white/10 p-3 rounded-2xl border border-white/10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={populationData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fontWeight: 700, fill: '#475569' }}
                interval={0}
                angle={-25}
                textAnchor="end"
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#64748B' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(val: number) => [`${val.toLocaleString()} habitantes`, 'Población']}
                contentStyle={{ borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {populationData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={entry.isSelected ? '#0F172A' : 'transparent'}
                    strokeWidth={entry.isSelected ? 2 : 0}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

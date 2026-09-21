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
  Cell,
  Legend
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
  ArrowRight,
  BarChart3
} from 'lucide-react';
import {
  RIONEGRO_COMMUNE_DETAILED_PROFILES,
  RIONEGRO_MUNICIPAL_CONTRASTS,
  DetailedCommuneProfile
} from '../data/rionegroECV2020Data';

interface RionegroCommuneDetailCardProps {
  selectedAreaId?: string;
  onSelectArea?: (areaId: string) => void;
  compactMode?: boolean;
}

export const RionegroCommuneDetailCard: React.FC<RionegroCommuneDetailCardProps> = ({
  selectedAreaId = 'rionegro-c1-liborio',
  onSelectArea,
  compactMode = false
}) => {
  // Asegurar perfil válido
  const activeProfileKey = RIONEGRO_COMMUNE_DETAILED_PROFILES[selectedAreaId] 
    ? selectedAreaId 
    : 'rionegro-c1-liborio';
  
  const currentProfile = RIONEGRO_COMMUNE_DETAILED_PROFILES[activeProfileKey];
  
  // Pestaña interna de contraste municipal (Educación, Ingresos, Estratos, Sexo)
  const [benchmarkView, setBenchmarkView] = useState<'educacion' | 'ingresos' | 'estratos' | 'sexo'>('educacion');

  // Datos para gráfico de cuota de juventud (Comuna vs Resto)
  const youthShareData = [
    {
      name: currentProfile.shortName,
      value: currentProfile.youthSharePercentage,
      color: currentProfile.color
    },
    {
      name: 'Resto de Rionegro',
      value: Number((100 - currentProfile.youthSharePercentage).toFixed(1)),
      color: '#CBD5E1'
    }
  ];

  // Datos para estratos con resaltado de la comuna
  const strataHighlightedData = RIONEGRO_MUNICIPAL_CONTRASTS.strataMunicipal.map((item, index) => {
    const stratumNum = index + 1;
    const isPredominant = currentProfile.predominantStrataNumbers.includes(stratumNum);
    return {
      ...item,
      isPredominant,
      fillColor: isPredominant ? item.color : '#E2E8F0',
      strokeColor: isPredominant ? '#0F172A' : 'transparent'
    };
  });

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-5 sm:p-7 shadow-sm border border-white/10 space-y-6">
      
      {/* Selector de Comuna / Corregimiento (8 botones segmentados) */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-150">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-900" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Pánel Territorial por Comuna y Corregimiento
            </h3>
          </div>
          <span className="text-[10px] font-bold text-slate-400">
            ECV 2020 OPP • Sisbén IV • Planeación Rionegro
          </span>
        </div>

        {/* Barra de 8 sectores */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 pt-1">
          {Object.values(RIONEGRO_COMMUNE_DETAILED_PROFILES).map((profile) => {
            const isSelected = profile.id === activeProfileKey;
            return (
              <button
                key={profile.id}
                onClick={() => onSelectArea && onSelectArea(profile.id)}
                className={`px-2.5 py-2 rounded-xl text-left transition-all border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-900 text-white shadow-sm border-blue-950 scale-[1.02]'
                    : 'bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:bg-slate-100 text-slate-200 border-white/10 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: profile.color }} 
                  />
                  <span className={`text-[8px] font-black uppercase ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                    {profile.zone}
                  </span>
                </div>
                <div className="mt-1">
                  <span className={`block text-[11px] font-black leading-tight line-clamp-1 ${isSelected ? 'text-white' : 'text-white'}`}>
                    {profile.shortName}
                  </span>
                  <span className={`text-[9px] font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {profile.youthSharePercentage}% jóvenes
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
                style={{ backgroundColor: currentProfile.color }}
              >
                {currentProfile.type}
              </span>
              <span className="text-[10px] font-extrabold text-blue-900 bg-sky-500/20 text-sky-300/80 px-2 py-0.5 rounded-md">
                Zona {currentProfile.zone}
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                Alberga al {currentProfile.youthSharePercentage}% de la juventud de Rionegro
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{currentProfile.name}</span>
            </h3>
          </div>

          {/* Cifra Poblacional Destacada */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl px-4 py-2.5 rounded-2xl border border-white/10/90 shadow-2xs self-start md:self-auto min-w-[200px]">
            <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wider">
              Población Registrada
            </span>
            <div className="text-sm sm:text-base font-black text-white leading-snug">
              {currentProfile.populationText}
            </div>
            {currentProfile.estimatedPopulationNumeric && (
              <span className="text-[10px] text-blue-700 font-bold block mt-0.5">
                ~{currentProfile.estimatedYouthCount.toLocaleString()} jóvenes (14-28 años)
              </span>
            )}
          </div>
        </div>

        {/* Puntos Estratégicos Clave */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
          {currentProfile.strategicHighlights.map((highlight, idx) => (
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

      {/* SECCIÓN 1: GRÁFICOS ESPECÍFICOS DE ESTA COMUNA / CORREGIMIENTO */}
      <div>
        <div className="flex items-center gap-2 pb-2 mb-4 border-b border-slate-150">
          <Layers className="w-4 h-4 text-pink-600" />
          <h4 className="text-xs font-black uppercase tracking-wider text-white">
            Gráficos Específicos de {currentProfile.shortName}
          </h4>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Gráfico 1: Desglose de Juventud en Barrios o Veredas de la Comuna (Col 7) */}
          <div className="lg:col-span-7 bg-white/[0.04] backdrop-blur-sm border border-white/10/80 p-4 sm:p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    {currentProfile.zone === 'Urbana' ? 'Barrios Principales' : 'Veredas Principales'}
                  </span>
                  <h5 className="text-sm font-black text-white mt-0.5">
                    Concentración de Juventud (% Municipal / Zonal)
                  </h5>
                </div>
                <span className="text-[10px] font-extrabold text-blue-900 bg-sky-500/10 px-2 py-0.5 rounded-md border border-blue-200">
                  ECV OPP 2020
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Participación porcentual de los sectores urbanos o veredales de esta división:
              </p>
            </div>

            {/* Gráfico de Barras Horizontales de Sectores */}
            <div className="h-[210px] w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={currentProfile.youthDistributionInSectors}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis 
                    type="number" 
                    domain={[0, 'dataMax + 2']} 
                    unit="%" 
                    tick={{ fontSize: 10, fill: '#64748B' }} 
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    tick={{ fontSize: 11, fill: '#1E293B', fontWeight: 600 }}
                    width={110}
                  />
                  <Tooltip
                    formatter={(value: any) => [`${value}% de la juventud`, 'Participación']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '11px' }}
                  />
                  <Bar 
                    dataKey="percentage" 
                    fill={currentProfile.color} 
                    radius={[0, 6, 6, 0]}
                  >
                    {currentProfile.youthDistributionInSectors.map((entry, idx) => (
                      <Cell 
                        key={`cell-${idx}`} 
                        fill={entry.highlight ? currentProfile.color : '#64748B'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detalle en texto de los barrios / veredas */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-[11px]">
              {currentProfile.youthDistributionInSectors.map((sec, idx) => (
                <div key={idx} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2 rounded-lg border border-white/10/80 flex items-center justify-between">
                  <span className="font-bold text-slate-200 truncate mr-1">{sec.name}:</span>
                  <span className="font-mono font-black text-blue-900 shrink-0">{sec.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gráfico 2: Cuota de Juventud de la Comuna vs Resto Municipal & Indicadores Clave (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Gráfico de Donut: Comuna vs Resto de Rionegro */}
            <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10/80 p-4 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                  Cuota Municipal de Juventud (14-28a)
                </span>
                <span className="text-[10px] font-black text-blue-900">
                  {currentProfile.youthSharePercentage}%
                </span>
              </div>

              <div className="h-[140px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={youthShareData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={58}
                      paddingAngle={3}
                    >
                      {youthShareData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(val: any) => [`${val}%`, 'Porcentaje']} 
                      contentStyle={{ borderRadius: '10px', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-center gap-4 text-[10px] font-bold">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentProfile.color }} />
                  <span className="text-white">{currentProfile.shortName} ({currentProfile.youthSharePercentage}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="text-slate-400">Resto Rionegro ({Number((100 - currentProfile.youthSharePercentage).toFixed(1))}%)</span>
                </div>
              </div>
            </div>

            {/* Tarjeta de Indicador Singular / Alerta Económica */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-4 rounded-2xl border border-white/10 space-y-2 shadow-2xs">
              <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                Indicador Singular de la Comuna
              </span>

              {/* Caso Comuna 1: Desempleo 10,4% */}
              {currentProfile.specificMetrics.unemploymentRate && (
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-200">Tasa de Desempleo:</span>
                    <span className="text-base font-black text-rose-700">
                      {currentProfile.specificMetrics.unemploymentRate}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                    <div 
                      className="bg-rose-600 h-full rounded-full" 
                      style={{ width: `${(currentProfile.specificMetrics.unemploymentRate / 15) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-rose-800 font-medium bg-rose-50 p-2 rounded-lg border border-rose-200/80">
                    ⚠️ {currentProfile.specificMetrics.unemploymentNote} (Promedio municipal: 8,4%).
                  </p>
                </div>
              )}

              {/* Caso Comuna 2: Desempleo de Larga Duración 46,9% */}
              {currentProfile.specificMetrics.longTermUnemploymentRate && (
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-200">Desempleo Larga Duración:</span>
                    <span className="text-base font-black text-amber-700">
                      {currentProfile.specificMetrics.longTermUnemploymentRate}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
                    <div 
                      className="bg-amber-500 h-full rounded-full" 
                      style={{ width: `${currentProfile.specificMetrics.longTermUnemploymentRate}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-amber-800 font-medium bg-amber-500/10 p-2 rounded-lg border border-amber-200/80">
                    ⏱️ {currentProfile.specificMetrics.longTermUnemploymentNote}
                  </p>
                </div>
              )}

              {/* Caso Comuna 4: 27,2% de los hogares urbanos y UdeA */}
              {currentProfile.householdsSharePercentage && currentProfile.id === 'rionegro-c4-porvenir' && (
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-200">Hogares Urbanos:</span>
                    <span className="text-base font-black text-orange-600">
                      {currentProfile.householdsSharePercentage}%
                    </span>
                  </div>
                  <p className="text-[10px] text-orange-950 font-medium bg-orange-50 p-2 rounded-lg border border-orange-200/80">
                    🎓 Concentra más de un cuarto de los hogares urbanos. Sede Campus Universidad de Antioquia Oriente e infraestructura deportiva.
                  </p>
                </div>
              )}

              {/* Caso Comuna 3: Densidad y barrios populosos */}
              {currentProfile.id === 'rionegro-c3-alfonso-uribe' && (
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-200">Densidad Habitacional:</span>
                    <span className="text-xs font-black text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                      ALTA (Estratos 2 y 3)
                    </span>
                  </div>
                  <p className="text-[10px] text-cyan-950 font-medium bg-cyan-50 p-2 rounded-lg border border-cyan-200/80">
                    🏘️ Cuatro Esquinas (8,6%) y Santa Ana (7,1%) reúnen 15,7% de la juventud urbana total.
                  </p>
                </div>
              )}

              {/* Caso Corregimientos Rurales: Sisbén IV, NBI 8,0% y Vocación */}
              {currentProfile.zone === 'Rural' && (
                <div className="space-y-1.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-slate-200">Pobreza NBI Rural:</span>
                    <span className="text-xs font-black text-emerald-800 bg-emerald-500/10 px-2 py-0.5 rounded">
                      8,0% (DANE/ECV)
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300 font-medium bg-white/[0.04] backdrop-blur-sm border border-white/10 p-2 rounded-lg border border-white/10">
                    🌲 {currentProfile.inbiBenchmark} Estratos dominantes: {currentProfile.strataText}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FICHA METODOLÓGICA DE VARIABLES ECV POR COMUNA */}
      <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-4 border border-white/10 space-y-3">
        <span className="text-[10px] font-black uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-700" />
          Ficha Descriptiva de Variables Oficiales en esta División
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-white/10/90 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Distribución por Sexo</span>
            <p className="text-white font-medium leading-snug">
              {currentProfile.genderDistributionText}
            </p>
            <span className="text-[10px] text-slate-400 font-medium block">
              Benchmark Municipal: 50,8% Mujeres • 49,2% Hombres
            </span>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-white/10/90 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Distribución por Estrato</span>
            <p className="text-white font-medium leading-snug">
              {currentProfile.strataText}
            </p>
            <div className="flex gap-1 pt-1">
              {currentProfile.predominantStrataNumbers.map((strNum) => (
                <span key={strNum} className="text-[9px] font-black px-1.5 py-0.2 rounded bg-slate-100 text-slate-200 border border-white/10">
                  Estrato {strNum}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-white/10/90 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Nivel Educativo & Pobreza</span>
            <p className="text-white font-medium leading-snug">
              {currentProfile.educationLevelText}
            </p>
            <span className="text-[10px] text-blue-800 font-semibold block">
              {currentProfile.inbiBenchmark}
            </span>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: GRÁFICOS DE CONTRASTE Y BENCHMARK MUNICIPAL DE RIONEGRO */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-150">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-900" />
              <h4 className="text-xs font-black uppercase tracking-wider text-white">
                Gráficos de Contraste Municipal: Rionegro vs Comuna
              </h4>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Totales y promedios oficiales de Rionegro (ECV 2020 y DANE) para contextualizar la realidad de esta comuna:
            </p>
          </div>

          {/* Selector de tipo de contraste municipal */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold border border-white/10/80 self-start sm:self-auto">
            <button
              onClick={() => setBenchmarkView('educacion')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                benchmarkView === 'educacion'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Educación Jóvenes
            </button>
            <button
              onClick={() => setBenchmarkView('ingresos')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                benchmarkView === 'ingresos'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Ingresos por Edad
            </button>
            <button
              onClick={() => setBenchmarkView('estratos')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                benchmarkView === 'estratos'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Estratos Resaltados
            </button>
            <button
              onClick={() => setBenchmarkView('sexo')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                benchmarkView === 'sexo'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Sexo Municipal
            </button>
          </div>
        </div>

        {/* CONTENIDO SEGÚN LA PESTAÑA DE CONTRASTE SELECCIONADA */}
        {benchmarkView === 'educacion' && (
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10/80 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-800 bg-sky-500/10 px-2 py-0.5 rounded border border-blue-200">
                  JÓVENES DE 18 A 28 AÑOS • RIONEGRO
                </span>
                <h5 className="text-sm font-black text-white mt-1">
                  Distribución por Nivel Educativo Alcanzado
                </h5>
              </div>
              <span className="text-xs font-bold text-slate-400">
                Tasa general de analfabetismo: <strong className="text-white">{RIONEGRO_MUNICIPAL_CONTRASTS.illiteracyRate}%</strong>
              </span>
            </div>

            {/* Gráfico de Barras de Educación */}
            <div className="h-[230px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={RIONEGRO_MUNICIPAL_CONTRASTS.youthEducation18to28}
                  margin={{ top: 10, right: 20, left: 10, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="level" 
                    tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }}
                    angle={-20}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis unit="%" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => [
                      `${val}% (${item.payload.description})`,
                      'Porcentaje'
                    ]}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '11px' }}
                  />
                  <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                    {RIONEGRO_MUNICIPAL_CONTRASTS.youthEducation18to28.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Fila de Estadísticas Educativas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Media (Bachiller)</span>
                <span className="text-base font-black text-blue-700">50,57%</span>
                <span className="text-[9px] text-slate-400 block">Nivel predominante</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Técnico + Tecnológico</span>
                <span className="text-base font-black text-sky-700">21,69%</span>
                <span className="text-[9px] text-slate-400 block">Formación para el empleo</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Universidad</span>
                <span className="text-base font-black text-purple-700">9,27%</span>
                <span className="text-[9px] text-slate-400 block">Pregrado profesional</span>
              </div>
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10">
                <span className="text-[9px] font-bold text-slate-400 uppercase block">Postgrado</span>
                <span className="text-base font-black text-indigo-700">1,27%</span>
                <span className="text-[9px] text-slate-400 block">Especialización/Maestría</span>
              </div>
            </div>
          </div>
        )}

        {benchmarkView === 'ingresos' && (
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10/80 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-200">
                  INGRESOS LABORALES PROMEDIO • ECV RIONEGRO
                </span>
                <h5 className="text-sm font-black text-white mt-1">
                  Nivel de Ingresos Promedio Mensual por Grupos Etarios
                </h5>
              </div>
              <span className="text-xs font-bold text-slate-400">
                Pico salarial en cohorte: <strong className="text-white">36 a 42 años ($1.932.487)</strong>
              </span>
            </div>

            {/* Gráfico de Barras de Ingresos */}
            <div className="h-[230px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={RIONEGRO_MUNICIPAL_CONTRASTS.averageIncomeByAge}
                  margin={{ top: 10, right: 20, left: 20, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="ageRange" 
                    tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }}
                    angle={-15}
                    textAnchor="end"
                    interval={0}
                  />
                  <YAxis 
                    tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`} 
                    tick={{ fontSize: 10, fill: '#64748B' }} 
                  />
                  <Tooltip
                    formatter={(val: any) => [`$${val.toLocaleString('es-CO')}`, 'Ingreso Promedio']}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '11px' }}
                  />
                  <Bar dataKey="income" radius={[6, 6, 0, 0]}>
                    {RIONEGRO_MUNICIPAL_CONTRASTS.averageIncomeByAge.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Desglose de ingresos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              {RIONEGRO_MUNICIPAL_CONTRASTS.averageIncomeByAge.map((inc, idx) => (
                <div 
                  key={idx} 
                  className={`p-2.5 rounded-xl border ${
                    inc.isYouth ? 'bg-sky-500/10/80 border-blue-200' : inc.isPeak ? 'bg-emerald-500/10/80 border-emerald-200' : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border-white/10'
                  }`}
                >
                  <span className="text-[9px] font-bold text-slate-400 uppercase block">{inc.ageRange}</span>
                  <span className={`text-sm font-black block mt-0.5 ${inc.isYouth ? 'text-blue-900' : inc.isPeak ? 'text-emerald-800' : 'text-white'}`}>
                    {inc.formatted}
                  </span>
                  {inc.isYouth && <span className="text-[8px] font-extrabold text-blue-700 uppercase">Juventud</span>}
                  {inc.isPeak && <span className="text-[8px] font-extrabold text-emerald-700 uppercase">Pico Ingreso</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {benchmarkView === 'estratos' && (
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10/80 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-800 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-200">
                  ESTRATIFICACIÓN MUNICIPAL CON RESALTADO LOCAL
                </span>
                <h5 className="text-sm font-black text-white mt-1">
                  Distribución de Estratos en Rionegro (Resaltados los de {currentProfile.shortName})
                </h5>
              </div>
              <span className="text-xs font-bold text-slate-300">
                Estratos de {currentProfile.shortName}: <strong className="text-blue-900">
                  {currentProfile.predominantStrataNumbers.map(s => `Estrato ${s}`).join(', ')}
                </strong>
              </span>
            </div>

            {/* Gráfico de Barras con Resaltado */}
            <div className="h-[210px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={strataHighlightedData}
                  margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="stratum" tick={{ fontSize: 11, fill: '#1E293B', fontWeight: 600 }} />
                  <YAxis unit="%" tick={{ fontSize: 10, fill: '#64748B' }} />
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => [
                      `${val}% ${item.payload.isPredominant ? '(PREDOMINANTE EN ESTA COMUNA)' : ''}`,
                      'Porcentaje Municipal'
                    ]}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '11px' }}
                  />
                  <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                    {strataHighlightedData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.fillColor} 
                        stroke={entry.strokeColor}
                        strokeWidth={entry.isPredominant ? 2 : 0}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Leyenda de los estratos de esta comuna */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-200">En {currentProfile.shortName} predomina:</span>
                <span className="font-mono font-black text-blue-900 bg-sky-500/10 px-2 py-0.5 rounded border border-blue-200">
                  {currentProfile.strataText}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                (Las barras con color representan los estratos dominantes en este territorio)
              </span>
            </div>
          </div>
        )}

        {benchmarkView === 'sexo' && (
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10/80 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-black uppercase text-pink-800 bg-pink-50 px-2 py-0.5 rounded border border-pink-200">
                  DEMOGRAFÍA POR GÉNERO • RIONEGRO
                </span>
                <h5 className="text-sm font-black text-white mt-1">
                  Distribución Municipal por Sexo (DANE post-COVID y ECV)
                </h5>
              </div>
              <span className="text-xs font-bold text-slate-400">
                Población total: 142.995 (ECV) / 146.880 (DANE)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Gráfico circular de Sexo */}
              <div className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={RIONEGRO_MUNICIPAL_CONTRASTS.genderMunicipal}
                      dataKey="danePercentage"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={75}
                      paddingAngle={3}
                    >
                      {RIONEGRO_MUNICIPAL_CONTRASTS.genderMunicipal.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(val: any) => [`${val}%`, 'Participación DANE']} 
                      contentStyle={{ borderRadius: '10px', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Comparativa DANE vs ECV */}
              <div className="space-y-3 text-xs">
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-pink-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-pink-600" />
                    <div>
                      <span className="font-black text-white block">Mujeres en Rionegro</span>
                      <span className="text-[10px] text-slate-400">DANE: 50,8% • ECV 2020: 52,3%</span>
                    </div>
                  </div>
                  <span className="font-mono font-black text-base text-pink-600">50,8%</span>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-900" />
                    <div>
                      <span className="font-black text-white block">Hombres en Rionegro</span>
                      <span className="text-[10px] text-slate-400">DANE: 49,2% • ECV 2020: 47,7%</span>
                    </div>
                  </div>
                  <span className="font-mono font-black text-base text-blue-900">49,2%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

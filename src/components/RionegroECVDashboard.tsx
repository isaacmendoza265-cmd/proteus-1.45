import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import {
  Users,
  PieChart as PieIcon,
  BarChart3,
  TrendingUp,
  GraduationCap,
  Briefcase,
  Layers,
  MapPin,
  CheckCircle2,
  FileText,
  Building2,
  Home,
  Percent,
  Sparkles,
  Info
} from 'lucide-react';
import {
  RIONEGRO_ECV_2020,
  CommuneDistributionRow,
  AgeGenderPyramidRow,
  StratumDistributionRow,
  NeighborhoodDistributionRow,
  LaborByAgeRow
} from '../data/rionegroECV2020Data';
import { RionegroCommuneDetailCard } from './RionegroCommuneDetailCard';

interface RionegroECVDashboardProps {
  selectedAreaId?: string;
  onSelectArea?: (areaId: string) => void;
}

export const RionegroECVDashboard: React.FC<RionegroECVDashboardProps> = ({
  selectedAreaId,
  onSelectArea
}) => {
  const [activeTab, setActiveTab] = useState<'comunas' | 'comunasDetalle' | 'edadesSexo' | 'estratosBarrios' | 'laboral'>('comunas');
  const [activeCommuneHover, setActiveCommuneHover] = useState<CommuneDistributionRow | null>(null);

  // Formateador numérico
  const formatNum = (n: number) => n.toLocaleString('es-CO');

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-5 sm:p-7 shadow-sm border border-white/10 space-y-6">
      
      {/* Cabecera Institucional del Observatorio de Políticas Públicas */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-150">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-900 text-white shadow-2xs">
              OBSERVATORIO DE POLÍTICAS PÚBLICAS (OPP)
            </span>
            <span className="text-[10px] font-extrabold text-blue-800 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-blue-200">
              ECV 2020 • ALCALDÍA DE RIONEGRO
            </span>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-200">
              142.995 Habitantes
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1.5 flex items-center gap-2">
            <span>Distribución Poblacional, Demografía y Juventud en Rionegro</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-0.5 leading-relaxed">
            Datos consolidados del Informe de Calidad de Vida (ECV) de Rionegro. Visualización interactiva de comunas, rangos de edad, pirámide de sexo, estratificación y dinámica laboral.
          </p>
        </div>

        {/* Conmutador de Pestañas Analíticas */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-white/10 self-start lg:self-auto">
          <button
            onClick={() => setActiveTab('comunas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'comunas'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5 text-cyan-300" />
            <span>Comunas y Zonas</span>
          </button>

          <button
            onClick={() => setActiveTab('comunasDetalle')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'comunasDetalle'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-rose-300" />
            <span>Pánel por Comuna</span>
          </button>

          <button
            onClick={() => setActiveTab('edadesSexo')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'edadesSexo'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-pink-300" />
            <span>Edades y Sexo</span>
          </button>

          <button
            onClick={() => setActiveTab('estratosBarrios')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'estratosBarrios'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Estratos y Barrios</span>
          </button>

          <button
            onClick={() => setActiveTab('laboral')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'laboral'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-emerald-300" />
            <span>Mercado Laboral</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Rápidas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Población Total ECV</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg sm:text-xl font-black text-white">142.995</span>
            <span className="text-[10px] font-bold text-slate-400">hab.</span>
          </div>
          <span className="text-[10px] text-blue-700 font-semibold">100% Censo Mpal</span>
        </div>

        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Distribución Urb / Rur</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg sm:text-xl font-black text-blue-900">61,7%</span>
            <span className="text-[10px] font-bold text-slate-400">/ 38,3%</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">88.2k Urb • 54.7k Rur</span>
        </div>

        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Población Joven (14-28a)</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg sm:text-xl font-black text-indigo-900">32.207</span>
            <span className="text-[10px] font-bold text-slate-400">jóvenes</span>
          </div>
          <span className="text-[10px] text-indigo-700 font-semibold">22,52% de Rionegro</span>
        </div>

        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl border border-white/10">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Mayor Comuna</span>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="text-lg sm:text-xl font-black text-pink-700">Liborio M.</span>
            <span className="text-[10px] font-bold text-slate-400">20,9%</span>
          </div>
          <span className="text-[10px] text-slate-300 font-semibold">~29.886 residentes</span>
        </div>
      </div>

      {/* PESTAÑA 1: DISTRIBUCIÓN POR COMUNA Y CORREGIMIENTO (CÍRCULO + BARRAS) */}
      {activeTab === 'comunas' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Gráfica de Círculo (Donut): Cuota de cada Comuna y Corregimiento */}
            <div className="lg:col-span-6 bg-white/[0.04] backdrop-blur-sm border border-white/10/70 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-sky-500/20 text-sky-300 text-blue-900 rounded-lg">
                    <PieIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">
                      Gráfica Circular: Distribución por Comunas y Corregimientos
                    </h3>
                    <span className="text-[10px] text-slate-400">Participación porcentual de las 8 divisiones territoriales</span>
                  </div>
                </div>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={RIONEGRO_ECV_2020.communeDistribution}
                      dataKey="percentage"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={95}
                      paddingAngle={2}
                      onClick={(entry: any) => onSelectArea && entry?.id && onSelectArea(entry.id)}
                      cursor="pointer"
                    >
                      {RIONEGRO_ECV_2020.communeDistribution.map((entry) => (
                        <Cell
                          key={entry.id}
                          fill={entry.color}
                          stroke={selectedAreaId === entry.id ? '#0F172A' : '#FFFFFF'}
                          strokeWidth={selectedAreaId === entry.id ? 3 : 1}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number) => [`${val}% (~${formatNum(Math.round((val / 100) * 142995))} hab.)`, 'Participación']}
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Leyenda interactiva debajo */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-1.5 pt-2 border-t border-white/10/80">
                {RIONEGRO_ECV_2020.communeDistribution.map((comm) => {
                  const isSelected = selectedAreaId === comm.id;
                  return (
                    <button
                      key={comm.id}
                      onClick={() => onSelectArea && onSelectArea(comm.id)}
                      className={`text-left p-2 rounded-xl transition-all border flex items-center justify-between text-xs ${
                        isSelected 
                          ? 'bg-sky-500/10 border-blue-600 shadow-2xs ring-1 ring-blue-600' 
                          : 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-slate-100/80 border-white/10/80 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: comm.color }} />
                        <span className="font-bold text-[11px] truncate">{comm.name}</span>
                      </div>
                      <span className="font-mono font-extrabold text-[11px] ml-1 shrink-0 text-white">
                        {comm.percentage}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Gráfica de Barras: Ranking de Población por División */}
            <div className="lg:col-span-6 bg-white/[0.04] backdrop-blur-sm border border-white/10/70 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-100 text-indigo-900 rounded-lg">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">
                      Gráfica de Barras: Habitantes Estimados por Zona
                    </h3>
                    <span className="text-[10px] text-slate-400">Ordenado por volumen poblacional en base a 142.995 personas</span>
                  </div>
                </div>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={RIONEGRO_ECV_2020.communeDistribution}
                    layout="vertical"
                    margin={{ top: 5, right: 25, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                    <XAxis 
                      type="number" 
                      domain={[0, 32000]} 
                      tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} 
                      tick={{ fontSize: 10, fill: '#64748B' }} 
                    />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      width={130} 
                      tick={{ fontSize: 9, fill: '#334155', fontWeight: 600 }}
                      tickFormatter={(name: string) => name.replace('Corregimiento ', 'Corr. ').replace('Comuna ', 'C.')}
                    />
                    <Tooltip
                      formatter={(val: number) => [`${formatNum(val)} habitantes`, 'Población']}
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    />
                    <Bar 
                      dataKey="estimatedPopulation" 
                      radius={[0, 6, 6, 0]}
                      onClick={(entry: any) => onSelectArea && entry?.id && onSelectArea(entry.id)}
                      cursor="pointer"
                    >
                      {RIONEGRO_ECV_2020.communeDistribution.map((entry) => (
                        <Cell 
                          key={entry.id} 
                          fill={entry.color} 
                          opacity={selectedAreaId === entry.id ? 1 : 0.85}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Ficha Resumen Urbana vs Rural */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3.5 rounded-xl border border-white/10 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span className="font-bold text-white">Zona Urbana (4 Comunas):</span>
                  <span className="font-extrabold text-blue-950">61,8% (~88.371 hab)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <span className="font-bold text-white">Zona Rural (4 Correg.):</span>
                  <span className="font-extrabold text-emerald-950">38,2% (~54.624 hab)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Gráficos Desagregados de la Comuna Seleccionada */}
          <div className="pt-3">
            <RionegroCommuneDetailCard
              selectedAreaId={selectedAreaId || 'rionegro-c1-liborio'}
              onSelectArea={onSelectArea}
            />
          </div>
        </div>
      )}

      {/* PESTAÑA: PÁNEL POR COMUNA Y CORREGIMIENTO */}
      {activeTab === 'comunasDetalle' && (
        <RionegroCommuneDetailCard
          selectedAreaId={selectedAreaId || 'rionegro-c1-liborio'}
          onSelectArea={onSelectArea}
        />
      )}

      {/* PESTAÑA 2: PIRÁMIDE POBLACIONAL POR EDADES Y SEXO (BARRAS + CÍRCULO) */}
      {activeTab === 'edadesSexo' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Gráfica de Barras: Pirámide Poblacional por Rango de Edad y Sexo (Figura 1) */}
            <div className="lg:col-span-8 bg-white/[0.04] backdrop-blur-sm border border-white/10/70 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-rose-100 text-rose-900 rounded-lg">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">
                      Gráfica de Barras: Pirámide Poblacional por Edad y Sexo (Figura 1 ECV)
                    </h3>
                    <span className="text-[10px] text-slate-400">
                      Comparativa porcentual Hombres (%) vs Mujeres (%) por quinquenio de edad
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-300 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl px-2 py-1 rounded-md border border-white/10 shadow-2xs">
                  Censo ECV 2020
                </span>
              </div>

              <div className="h-80 sm:h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={RIONEGRO_ECV_2020.ageGenderPyramid}
                    margin={{ top: 10, right: 10, left: -10, bottom: 25 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="ageGroup" 
                      angle={-45} 
                      textAnchor="end" 
                      interval={0}
                      tick={{ fontSize: 9, fill: '#475569', fontWeight: 600 }}
                      height={45}
                    />
                    <YAxis 
                      tickFormatter={(val) => `${val}%`} 
                      domain={[0, 5]}
                      tick={{ fontSize: 10, fill: '#64748B' }} 
                    />
                    <Tooltip
                      formatter={(val: number, name: string) => [
                        `${val}% (~${formatNum(Math.round((val / 100) * 142995))} hab.)`,
                        name === 'menPct' ? 'Hombres' : 'Mujeres'
                      ]}
                      labelFormatter={(label) => `Grupo de Edad: ${label}`}
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    />
                    <Legend 
                      verticalAlign="top" 
                      height={36}
                      formatter={(val) => val === 'menPct' ? 'Hombres (%)' : 'Mujeres (%)'}
                    />
                    <Bar dataKey="menPct" name="menPct" fill="#1E3A5F" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="womenPct" name="womenPct" fill="#E03185" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-white/10 text-xs text-slate-300 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <p className="leading-snug text-[11px]">
                  <strong>Ensanchamiento Demográfico:</strong> El grupo con mayor concentración poblacional en Rionegro es de <strong>20 a 24 años</strong> (3,92% hombres y 4,33% mujeres, totalizando 8,25% de la ciudad con ~11.797 habitantes), seguido por el rango de <strong>25 a 29 años</strong> (7,74%).
                </p>
              </div>
            </div>

            {/* Columna Derecha: Gráfica de Círculo por Sexo y Resumen de Etapas */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Gráfica de Círculo: Proporción Global por Sexo */}
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10/70 p-4 rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-pink-100 text-pink-900 rounded-lg">
                    <PieIcon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-black text-white uppercase tracking-wide">
                    Gráfica Circular: Proporción por Sexo
                  </h3>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={RIONEGRO_ECV_2020.genderSummary}
                        dataKey="percentage"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={38}
                        outerRadius={65}
                        paddingAngle={4}
                      >
                        {RIONEGRO_ECV_2020.genderSummary.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(val: number, name: string) => [
                          `${val}% (${formatNum(Math.round((val / 100) * 142995))} hab.)`,
                          name
                        ]}
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          borderColor: '#334155',
                          borderRadius: '10px',
                          color: '#FFFFFF',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Leyenda y Datos Exactos */}
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/10/80">
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10 text-center">
                    <span className="text-[10px] font-bold text-pink-700 block">Mujeres</span>
                    <span className="text-sm font-black text-white">52,3%</span>
                    <span className="text-[9px] text-slate-400 block">74.786 hab</span>
                  </div>
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2.5 rounded-xl border border-white/10 text-center">
                    <span className="text-[10px] font-bold text-blue-900 block">Hombres</span>
                    <span className="text-sm font-black text-white">47,7%</span>
                    <span className="text-[9px] text-slate-400 block">68.209 hab</span>
                  </div>
                </div>
              </div>

              {/* Ficha de Grandes Grupos de Edad */}
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-4 rounded-2xl border border-white/10 space-y-2.5 text-xs">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Composición por Ciclos Vitales
                </span>
                
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between font-bold text-[11px]">
                      <span className="text-slate-200">Infancia y Adolescencia (0-17a)</span>
                      <span className="text-white">22,66%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '22.66%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-[11px]">
                      <span className="text-slate-200">Jóvenes (14 a 28 años)</span>
                      <span className="text-indigo-900 font-black">22,52% (32.207 hab)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: '22.52%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-[11px]">
                      <span className="text-slate-200">Adultos Plenos (29-59 años)</span>
                      <span className="text-white">42,58%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: '42.58%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-[11px]">
                      <span className="text-slate-200">Adultos Mayores (60+ años)</span>
                      <span className="text-white">18,78%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-emerald-600 rounded-full" style={{ width: '18.78%' }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* PESTAÑA 3: ESTRATOS Y BARRIOS URBANOS (CÍRCULO + BARRAS) */}
      {activeTab === 'estratosBarrios' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Gráfica de Círculo: Estratos Socioeconómicos (Figura 5 ECV) */}
            <div className="lg:col-span-5 bg-white/[0.04] backdrop-blur-sm border border-white/10/70 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/20 text-amber-300 text-amber-900 rounded-lg">
                    <PieIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">
                      Gráfica Circular: Estrato Socioeconómico
                    </h3>
                    <span className="text-[10px] text-slate-400">Figura 5 del informe ECV Rionegro</span>
                  </div>
                </div>
              </div>

              <div className="h-60 sm:h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={RIONEGRO_ECV_2020.stratumDistribution}
                      dataKey="percentage"
                      nameKey="stratum"
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={80}
                      paddingAngle={3}
                    >
                      {RIONEGRO_ECV_2020.stratumDistribution.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number) => [`${val}% (~${formatNum(Math.round((val / 100) * 142995))} hab.)`, 'Proporción']}
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Leyenda de Estratos */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10/80">
                {RIONEGRO_ECV_2020.stratumDistribution.map((st, idx) => (
                  <div key={idx} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2 rounded-xl border border-white/10 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: st.color }} />
                      <span className="text-[10px] font-bold text-slate-200">{st.stratum}</span>
                    </div>
                    <span className="text-xs font-black text-white block mt-0.5">{st.percentage}%</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                <strong>Clase Media Dominante:</strong> El 45,5% de la población se encuentra en <strong>Estrato 3</strong> y el 22,1% en <strong>Estrato 4</strong>. Juntos concentran el 67,6% de Rionegro.
              </div>
            </div>

            {/* Gráfica de Barras: Distribución de Jóvenes en Zona Urbana según Barrio (Figura 6) */}
            <div className="lg:col-span-7 bg-white/[0.04] backdrop-blur-sm border border-white/10/70 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-sky-500/20 text-sky-300 text-blue-900 rounded-lg">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">
                      Gráfica de Barras: Población Urbana según Barrio
                    </h3>
                    <span className="text-[10px] text-slate-400">Figura 6 ECV: Concentración barrial de los jóvenes</span>
                  </div>
                </div>
              </div>

              <div className="h-64 sm:h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={RIONEGRO_ECV_2020.urbanNeighborhoods}
                    layout="vertical"
                    margin={{ top: 5, right: 25, left: 15, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                    <XAxis 
                      type="number" 
                      domain={[0, 18]} 
                      tickFormatter={(val) => `${val}%`} 
                      tick={{ fontSize: 10, fill: '#64748B' }} 
                    />
                    <YAxis 
                      dataKey="barrio" 
                      type="category" 
                      width={105} 
                      tick={{ fontSize: 10, fill: '#334155', fontWeight: 600 }}
                    />
                    <Tooltip
                      formatter={(val: number) => [`${val}% (~${formatNum(Math.round((val / 100) * 19872))} jóvenes urbanos)`, 'Concentración']}
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    />
                    <Bar 
                      dataKey="percentage" 
                      fill="#F97316" 
                      radius={[0, 6, 6, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-white/10 text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <strong className="text-white">El Porvenir es el barrio #1 de Rionegro:</strong>
                  <span className="block text-[11px] text-slate-400">Concentra el 15,9% de los jóvenes urbanos, casi el doble que Cuatro Esquinas (8,6%).</span>
                </div>
                <span className="text-xs font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                  Comuna 4
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* PESTAÑA 4: MERCADO LABORAL, PET Y JUVENTUD (BARRAS) */}
      {activeTab === 'laboral' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Gráfica de Barras: Tasa de Desempleo vs Ocupación por Edad */}
            <div className="lg:col-span-8 bg-white/[0.04] backdrop-blur-sm border border-white/10/70 p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-emerald-500/20 text-emerald-300 text-emerald-900 rounded-lg">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white">
                      Gráfica de Barras: Tasa de Desempleo vs Ocupación por Grupos de Edad
                    </h3>
                    <span className="text-[10px] text-slate-400">Figuras 21 y 22 del informe laboral ECV</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-200">
                  Desempleo Mpal: 8,4%
                </span>
              </div>

              <div className="h-72 sm:h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={RIONEGRO_ECV_2020.laborIndicatorsByAge}
                    margin={{ top: 10, right: 15, left: -10, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="ageRange" 
                      tick={{ fontSize: 10, fill: '#475569', fontWeight: 600 }}
                    />
                    <YAxis 
                      tickFormatter={(val) => `${val}%`} 
                      domain={[0, 90]}
                      tick={{ fontSize: 10, fill: '#64748B' }} 
                    />
                    <Tooltip
                      formatter={(val: number, name: string) => [
                        `${val}%`,
                        name === 'tasaDesempleo' ? 'Tasa de Desempleo' : name === 'tasaOcupacion' ? 'Tasa de Ocupación' : 'TGP'
                      ]}
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        borderColor: '#334155',
                        borderRadius: '12px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="tasaDesempleo" name="Tasa de Desempleo (%)" fill="#EF4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="tasaOcupacion" name="Tasa de Ocupación (%)" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="tgp" name="Tasa Global Participación (TGP)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-xs text-red-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <p className="leading-snug text-[11px]">
                  <strong>Foco Crítico: Desempleo Juvenil (18 a 28 años):</strong> La tasa de desempleo en este grupo alcanza el <strong>14,1%</strong> (casi el doble que el promedio municipal de 8,4%). Representan el <strong>44,1% de todos los desempleados</strong> de Rionegro (Figura 23 ECV).
                </p>
              </div>
            </div>

            {/* Ficha de Variables Laborales a Nivel Municipal (Cuadro 2 ECV) */}
            <div className="lg:col-span-4 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-4 sm:p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-150">
                <div className="p-1.5 bg-sky-500/20 text-sky-300 text-blue-900 rounded-lg">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-wide">
                    Cuadro 2: Indicadores Laborales
                  </h3>
                  <span className="text-[10px] text-slate-400">Definiciones técnicas DANE</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300 font-medium">Población en Edad Trabajar (PET):</span>
                  <span className="font-mono font-black text-white">126.668</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300 font-medium">Población Econ. Activa (PEA):</span>
                  <span className="font-mono font-black text-blue-900">72.195</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300 font-medium">Tasa Bruta Participación (TBP):</span>
                  <span className="font-mono font-black text-white">50,6%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300 font-medium">Tasa Global Participación (TGP):</span>
                  <span className="font-mono font-black text-white">57,0%</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300 font-medium">Tasa de Ocupación General:</span>
                  <span className="font-mono font-black text-emerald-700">50,7%</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-300 font-medium">Tasa de Desempleo General:</span>
                  <span className="font-mono font-black text-rose-700">8,4%</span>
                </div>
              </div>

              {/* Veredas Rurales con más Jóvenes */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1.5">
                  Top 3 Veredas Rurales con más Jóvenes
                </span>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between bg-white/[0.04] backdrop-blur-sm border border-white/10 px-2 py-1 rounded-md">
                    <span className="font-bold text-slate-200">1. Cabeceras de Llanogrande:</span>
                    <span className="font-mono font-black text-blue-900">4,7%</span>
                  </div>
                  <div className="flex justify-between bg-white/[0.04] backdrop-blur-sm border border-white/10 px-2 py-1 rounded-md">
                    <span className="font-bold text-slate-200">2. Abreo (Centro):</span>
                    <span className="font-mono font-black text-blue-900">3,6%</span>
                  </div>
                  <div className="flex justify-between bg-white/[0.04] backdrop-blur-sm border border-white/10 px-2 py-1 rounded-md">
                    <span className="font-bold text-slate-200">3. Cuchillas de San José:</span>
                    <span className="font-mono font-black text-blue-900">2,7%</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Conclusiones Oficiales del Informe */}
      <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-5 border border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-blue-700" />
          <h4 className="text-xs font-black uppercase text-white tracking-wider">
            Síntesis Estratégica del Observatorio de Políticas Públicas (ECV 2020)
          </h4>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
          {RIONEGRO_ECV_2020.keyTakeaways.slice(0, 4).map((takeaway, idx) => (
            <div key={idx} className="flex items-start gap-1.5 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-2 rounded-xl border border-white/10/80 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0 mt-0.5" />
              <span>{takeaway}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

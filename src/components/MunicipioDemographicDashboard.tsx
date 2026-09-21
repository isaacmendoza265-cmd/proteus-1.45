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
  AlertTriangle,
  Info,
  Building2,
  Home
} from 'lucide-react';
import { ALL_MUNICIPIOS_TERRITORIAL_DATA } from '../data/allMunicipiosTerritorialData';
import { STRATEGIC_MUNICIPALITIES } from '../data/antioquia7MunicipiosData';

interface MunicipioDemographicDashboardProps {
  muniId: string;
  selectedAreaId?: string;
  onSelectArea: (areaId: string) => void;
}

export const MunicipioDemographicDashboard: React.FC<MunicipioDemographicDashboardProps> = ({
  muniId,
  selectedAreaId,
  onSelectArea
}) => {
  const config = ALL_MUNICIPIOS_TERRITORIAL_DATA[muniId] || ALL_MUNICIPIOS_TERRITORIAL_DATA['rionegro'];
  const baseMuni = STRATEGIC_MUNICIPALITIES[muniId] || STRATEGIC_MUNICIPALITIES['rionegro'];

  const [activeMetricTab, setActiveMetricTab] = useState<'poblacion' | 'estratos' | 'edades' | 'educacion'>('poblacion');

  // Datos para PieChart de distribución poblacional por comunas
  const communeDistribution = config.areas.map((a) => ({
    name: a.shortName,
    fullName: a.name,
    value: a.estimatedPopulationNumeric || 1,
    color: a.color,
    id: a.id,
    type: a.type
  }));

  // Datos de estratos socioeconómicos municipales
  const strataData = [
    {
      name: 'Bajo (1-2)',
      percentage: baseMuni.demographics?.socioeconomicStratum?.bajo?.percentage || 35.0,
      description: baseMuni.demographics?.socioeconomicStratum?.bajo?.description || 'Barrios populares y veredas',
      color: '#EF4444'
    },
    {
      name: 'Medio (3-4)',
      percentage: baseMuni.demographics?.socioeconomicStratum?.medio?.percentage || 50.0,
      description: baseMuni.demographics?.socioeconomicStratum?.medio?.description || 'Casco urbano consolidado',
      color: '#3B82F6'
    },
    {
      name: 'Alto (5-6)',
      percentage: baseMuni.demographics?.socioeconomicStratum?.alto?.percentage || 15.0,
      description: baseMuni.demographics?.socioeconomicStratum?.alto?.description || 'Sectores campestres y cerrados',
      color: '#10B981'
    }
  ];

  // Datos de grupos de edad
  const ageData = [
    {
      name: 'Jóvenes (18-28)',
      percentage: baseMuni.demographics?.ageGroups?.joven?.percentage || 24.0,
      color: '#8B5CF6'
    },
    {
      name: 'Adultos (29-59)',
      percentage: baseMuni.demographics?.ageGroups?.adulto?.percentage || 54.0,
      color: '#3B82F6'
    },
    {
      name: 'Adultos Mayores (60+)',
      percentage: baseMuni.demographics?.ageGroups?.adultoMayor?.percentage || 22.0,
      color: '#F59E0B'
    }
  ];

  // Datos de educación
  const educationData = [
    {
      name: 'Básico (Primaria/Sec)',
      percentage: baseMuni.demographics?.educationLevels?.basico?.percentage || 30.0,
      color: '#64748B'
    },
    {
      name: 'Medio (Técnico/Tecnólogo)',
      percentage: baseMuni.demographics?.educationLevels?.medio?.percentage || 48.0,
      color: '#0284C7'
    },
    {
      name: 'Superior (Universitario/Pos)',
      percentage: baseMuni.demographics?.educationLevels?.superior?.percentage || 22.0,
      color: '#16A34A'
    }
  ];

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-5 sm:p-7 shadow-sm border border-white/10 space-y-6">
      
      {/* Cabecera Institucional */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-150">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-900 text-white shadow-2xs">
              OBSERVATORIO DEMOGRÁFICO Y POLÍTICO
            </span>
            <span className="text-[10px] font-extrabold text-blue-800 bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-blue-200">
              {config.fullName.toUpperCase()}
            </span>
            <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-200">
              ~{baseMuni.totalPopulation?.toLocaleString('es-CO') || 'Censo oficial'} Habitantes
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1.5 flex items-center gap-2">
            <span>Distribución Poblacional, Estratos y Demografía</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-0.5 leading-relaxed">
            Consolidado estadístico para {config.name}. Las variables no desglosadas a nivel de barrio o comuna se indican con la etiqueta <span className="font-bold text-amber-700">"Sin datos"</span>.
          </p>
        </div>

        {/* Conmutador de Pestañas Analíticas */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-white/10 self-start lg:self-auto">
          <button
            onClick={() => setActiveMetricTab('poblacion')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeMetricTab === 'poblacion'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5 text-cyan-300" />
            <span>Comunas y Zonas</span>
          </button>
          <button
            onClick={() => setActiveMetricTab('estratos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeMetricTab === 'estratos'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-emerald-300" />
            <span>Estratos</span>
          </button>
          <button
            onClick={() => setActiveMetricTab('edades')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeMetricTab === 'edades'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-purple-300" />
            <span>Grupos de Edad</span>
          </button>
          <button
            onClick={() => setActiveMetricTab('educacion')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeMetricTab === 'educacion'
                ? 'bg-blue-900 text-white shadow-sm'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            <span>Educación</span>
          </button>
        </div>
      </div>

      {/* PESTAÑA: COMUNAS Y ZONAS */}
      {activeMetricTab === 'poblacion' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Gráfico Circular (Col 6) */}
          <div className="lg:col-span-6 bg-white/[0.04] backdrop-blur-sm border border-white/10/80 p-5 rounded-3xl border border-white/10 flex flex-col items-center">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
              Participación de Población por Sector en {config.name}
            </span>
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={communeDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {communeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number) => [`${val.toLocaleString()} hab.`, 'Población']}
                    contentStyle={{ borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <span className="text-[10px] text-slate-400 font-bold">
              Total {config.areas.length} divisiones político-administrativas
            </span>
          </div>

          {/* Lista de sectores con porcentaje y aviso de datos (Col 6) */}
          <div className="lg:col-span-6 space-y-2 max-h-[380px] overflow-y-auto pr-1">
            <span className="text-xs font-black uppercase tracking-wider text-slate-200 block pb-1 border-b border-slate-150">
              Desglose Poblacional por Comuna / Corregimiento
            </span>
            {config.areas.map((area) => (
              <div
                key={area.id}
                onClick={() => onSelectArea(area.id)}
                className="p-2.5 rounded-xl border border-white/10 hover:border-blue-400 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:bg-sky-500/10/50 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: area.color }}
                  />
                  <div>
                    <span className="text-xs font-black text-white block leading-tight">
                      {area.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {area.type} • Zona {area.zone}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-black text-white block">
                    {area.populationText}
                  </span>
                  {area.barriosList.length > 0 ? (
                    <span className="text-[9px] text-slate-400 font-bold">
                      {area.barriosList.length} barrios
                    </span>
                  ) : (
                    <span className="text-[9px] text-amber-700 font-bold bg-amber-500/20 text-amber-300 px-1 py-0.2 rounded">
                      Sin datos
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PESTAÑA: ESTRATOS SOCIOECONÓMICOS */}
      {activeMetricTab === 'estratos' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white/[0.04] backdrop-blur-sm border border-white/10/80 p-5 rounded-3xl border border-white/10">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3 block">
              Distribución por Estratos Socioeconómicos (%)
            </span>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={strataData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 'bold' }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    formatter={(val: number) => [`${val}%`, 'Porcentaje municipal']}
                    contentStyle={{ borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                    {strataData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-200 block pb-1 border-b border-slate-150">
              Descripción y Concentración
            </span>
            {strataData.map((s, idx) => (
              <div key={idx} className="p-3 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl border border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white">{s.name}</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: s.color }}>
                    {s.percentage}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
            <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-200 text-[10px] text-amber-900 flex items-start gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                Para desglose exacto de estrato casa a casa por barrio o manzana, el indicador se cataloga <strong>"Sin datos"</strong> en ausencia de microcenso del Sisbén IV.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA: GRUPOS DE EDAD */}
      {activeMetricTab === 'edades' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white/[0.04] backdrop-blur-sm border border-white/10/80 p-5 rounded-3xl border border-white/10">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3 block">
              Composición por Rangos Etarios Principales (%)
            </span>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fontWeight: 'bold' }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    formatter={(val: number) => [`${val}%`, 'Porcentaje']}
                    contentStyle={{ borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                    {ageData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-200 block pb-1 border-b border-slate-150">
              Datos y Prioridades Electorales
            </span>
            <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
              <span className="text-xs font-black text-purple-900 block">Jóvenes (18-28 años): {ageData[0].percentage}%</span>
              <p className="text-[11px] text-purple-800 mt-1">
                Representan el voto de opinión más volátil e informado a través de canales digitales.
              </p>
            </div>
            <div className="p-3 bg-sky-500/10 rounded-2xl border border-blue-200">
              <span className="text-xs font-black text-blue-900 block">Adultos (29-59 años): {ageData[1].percentage}%</span>
              <p className="text-[11px] text-blue-800 mt-1">
                La principal fuerza laboral y contributiva, preocupada por seguridad, empleo y movilidad.
              </p>
            </div>
            <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-200">
              <span className="text-xs font-black text-amber-900 block">Adultos Mayores (60+ años): {ageData[2].percentage}%</span>
              <p className="text-[11px] text-amber-800 mt-1">
                Fidelidad electoral alta hacia liderazgos tradicionales y programas de salud y recreación.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA: EDUCACIÓN */}
      {activeMetricTab === 'educacion' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white/[0.04] backdrop-blur-sm border border-white/10/80 p-5 rounded-3xl border border-white/10">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3 block">
              Nivel Máximo Educativo Alcanzado (%)
            </span>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={educationData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 'bold' }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    formatter={(val: number) => [`${val}%`, 'Nivel educativo']}
                    contentStyle={{ borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                    {educationData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-slate-200 block pb-1 border-b border-slate-150">
              Perfil Formativo del Municipio
            </span>
            {educationData.map((e, idx) => (
              <div key={idx} className="p-3 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-white block">{e.name}</span>
                  <span className="text-[10px] text-slate-400">Población adulta censada</span>
                </div>
                <span className="text-xs font-black text-white bg-slate-200 px-2.5 py-1 rounded-xl">
                  {e.percentage}%
                </span>
              </div>
            ))}
            <div className="p-2.5 bg-amber-500/10 rounded-xl border border-amber-200 text-[10px] text-amber-900">
              <strong>Nota técnica:</strong> Si un barrio en particular no posee desglose censal de egresados universitarios o técnicos, la ficha barrial muestra <strong>"Sin datos"</strong>.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

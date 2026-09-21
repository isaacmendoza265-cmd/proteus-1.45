import React, { useState } from 'react';
import { 
  ArrowRight, 
  Bookmark, 
  Check, 
  ExternalLink,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Database,
  BarChart3,
  MapPin,
  Sparkles,
  Bot,
  Layers,
  Award,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  FileText
} from 'lucide-react';
import { 
  CmtIsotipo, 
  CmtIsologo 
} from './CmtProteusLogo';

interface HomePageStructureProps {
  onNavigateToBio: () => void;
  onNavigateToTab?: (tab: 'bio' | 'regions' | 'analyst' | 'proyector' | 'antioquia' | 'services') => void;
  candidateName?: string;
}

export const HomePageStructure: React.FC<HomePageStructureProps> = ({
  onNavigateToBio,
  onNavigateToTab,
  candidateName
}) => {
  const [carouselIndex, setCarouselIndex] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [activePhase, setActivePhase] = useState<number>(1);

  const CAROUSEL_MODULES = [
    {
      id: 'bio',
      tag: 'Módulo 01',
      name: "Biografía & Colorimetría Fisonómica",
      desc: "Calibración del fototipo, subtono de piel y generación de la paleta dual de 4 colores con Gemini 3.8.",
      details: ["Perfil fisonómico del candidato", "Paleta dual: Vestuario y piezas gráficas", "Sincronización con Google Drive"],
      tab: 'bio' as const,
      color: 'from-blue-600 to-indigo-700'
    },
    {
      id: 'regions',
      tag: 'Módulo 02',
      name: "Radiografía Territorial & NBI (32 Dptos)",
      desc: "Mapeo completo de Necesidades Básicas Insatisfechas, censo electoral y puestos de votación por municipio.",
      details: ["1.122 municipios analizados", "Cruce censal de la Registraduría", "Brechas de servicios, empleo y salud"],
      tab: 'regions' as const,
      color: 'from-emerald-600 to-teal-700'
    },
    {
      id: 'antioquia',
      tag: 'Módulo 03',
      name: "Especial Regional Antioquia",
      desc: "Inmersión estratégica en las 9 subregiones antioqueñas y sus 125 municipios con datos electorales históricos.",
      details: ["9 subregiones al detalle", "Comportamiento electoral local", "Prioridades de inversión regional"],
      tab: 'antioquia' as const,
      color: 'from-amber-600 to-yellow-700'
    },
    {
      id: 'analyst',
      tag: 'Módulo 04',
      name: "Analista Electoral IA con Gemini 3.8",
      desc: "Simulación de debates, formulación de contra-argumentos, eslóganes territoriales y discursos de plaza pública.",
      details: ["Entrenamiento en discurso político", "Simulador de preguntas difíciles", "Alineación fisonómica y de tono"],
      tab: 'analyst' as const,
      color: 'from-purple-600 to-indigo-800'
    },
    {
      id: 'proyector',
      tag: 'Módulo 05',
      name: "Proyector de Votos & Cifra Repartidora",
      desc: "Modelado matemático de umbral electoral, curules a disputar y metas de votos por municipio y mesa.",
      details: ["Cálculo de cifra repartidora D'Hondt", "Estimación de abstención", "Asignación de metas a testigos"],
      tab: 'proyector' as const,
      color: 'from-rose-600 to-pink-700'
    },
    {
      id: 'services',
      tag: 'Módulo 06',
      name: "Planes de Gobierno & Asesoría Estratégica",
      desc: "Estructuración programática basada en las brechas socioeconómicas y generación de informes ejecutivos en PDF.",
      details: ["Propuestas sustentadas en NBI", "Documentos ejecutivos descargables", "Gobernabilidad y viabilidad fiscal"],
      tab: 'services' as const,
      color: 'from-slate-700 to-slate-900'
    }
  ];

  const handleNextModule = () => {
    setCarouselIndex((prev) => (prev + 1) % CAROUSEL_MODULES.length);
  };

  const handlePrevModule = () => {
    setCarouselIndex((prev) => (prev - 1 + CAROUSEL_MODULES.length) % CAROUSEL_MODULES.length);
  };

  const handleSave = () => {
    setIsSaved(prev => !prev);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Barra superior de estado */}
      <div className="bg-gradient-to-r from-[#0F1535] via-[#1B234F] to-[#0A0E27] text-white rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-blue-900/60">
        <div className="flex items-center gap-3.5 text-left w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-1.5 flex items-center justify-center shrink-0 shadow-md border border-white/20">
            <CmtIsotipo size={34} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                Página de Inicio
              </span>
              <span className="text-[10px] text-yellow-300 font-semibold">
                Esquema Estratégico Dinámico
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
              Proteus 2.0: Qué es y cómo transforma campañas políticas
            </h2>
            <p className="text-xs text-blue-200 line-clamp-1">
              Las respuestas ordenadas paso a paso según el esquema de demostración de resultados electorales.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={onNavigateToBio}
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-blue-500 hover:bg-blue-400 text-white shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Ir a Biografía</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contenedor principal con fondo amarillo claro */}
      <div className="bg-[#FDF3A7] border-2 border-slate-900/15 rounded-[32px] p-4 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden transition-all space-y-6 sm:space-y-8">
        
        {/* Titular principal */}
        <div className="text-center pt-2 pb-2">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-slate-950 tracking-tight flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span>Esto es lo que hacemos:</span>
            <span className="bg-[#FACC15] text-slate-950 px-4 py-1 rounded-sm inline-block shadow-xs border-b-2 border-slate-900/30">
              esto es lo que hace Proteus
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 font-semibold max-w-2xl mx-auto mt-2.5">
            Estructura maestra aplicada a Proteus 2.0: responde qué es la plataforma, qué dolores resuelve en territorio, su metodología en 3 fases y los resultados tangibles que entrega en Colombia.
          </p>
        </div>

        {/* ========================================================
            RECUADRO 1: ¿Qué es Proteus 2.0? (Esquema: Caja visual a la izquierda + Texto a la derecha)
            ======================================================== */}
        <div className="rounded-2xl overflow-hidden border-2 border-slate-900/20 shadow-lg hover:shadow-xl transition-all">
          {/* Cabecera Azul Marino */}
          <div className="bg-[#151B38] text-white px-5 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#FACC15] text-slate-950 text-xs font-black inline-flex items-center justify-center shrink-0 shadow-sm">
                1
              </span>
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
                ¿Qué es Proteus 2.0?
              </h2>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-300 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 px-3 py-1 rounded-full border border-white/10">
              Razón de ser y propuesta de valor
            </span>
          </div>

          {/* Cuerpo Blanco con estructura dividida (Caja visual izquierda + Texto derecha) */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 sm:p-7">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Recuadro visual izquierdo (como en el wireframe superior) */}
              <div className="md:col-span-5 bg-gradient-to-br from-[#101835] to-[#1E295D] rounded-2xl p-5 text-white shadow-md border border-blue-900/40 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-1 rounded-lg shadow-xs">
                      <CmtIsotipo size={20} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-wider text-blue-200">
                      CMT PROTEUS v2.0
                    </span>
                  </div>
                  <span className="text-[10px] bg-[#FACC15] text-slate-950 font-extrabold px-2 py-0.5 rounded-full">
                    COLOMBIA
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 rounded-xl p-3 border border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">Cobertura Nacional</span>
                      <span className="font-bold text-yellow-300">32 Departamentos</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">1.122 municipios mapeados</div>
                  </div>

                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 rounded-xl p-3 border border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">Inteligencia Artificial</span>
                      <span className="font-bold text-emerald-300">Gemini 3.8</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Motor multimodal con calibración fisonómica</div>
                  </div>

                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 rounded-xl p-3 border border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300">Fuentes Oficiales</span>
                      <span className="font-bold text-blue-300">DANE & Registraduría</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Censo electoral y Necesidades Básicas Insatisfechas</div>
                  </div>
                </div>
              </div>

              {/* Contenido explicativo derecho */}
              <div className="md:col-span-7 space-y-3">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Plataforma Integral de Analítica Electoral y Estrategia Territorial</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <strong>Proteus Nacional</strong> es una plataforma de inteligencia estratégica diseñada específicamente para campañas políticas en Colombia. Centraliza los datos oficiales de los 32 departamentos y más de 1.100 municipios (censo electoral de la Registraduría, Necesidades Básicas Insatisfechas del DANE, variables de orden público y seguridad), integrándolos con un motor de Inteligencia Artificial multimodal (Gemini 3.8) y análisis fisonómico para diseñar campañas políticas ganadoras y basadas en evidencia.
                </p>
                
                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <div className="flex items-start gap-2 text-xs text-slate-200">
                    <span className="text-indigo-600 font-black">•</span>
                    <span><strong>Cero improvisación:</strong> Cada discurso y propuesta se sustenta en los dolores específicos del territorio.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-200">
                    <span className="text-indigo-600 font-black">•</span>
                    <span><strong>Paleta fisonómica dual:</strong> 4 colores adaptados al rostro del candidato para vestuario y publicidad.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-200">
                    <span className="text-indigo-600 font-black">•</span>
                    <span><strong>Modelado electoral:</strong> Umbral, cifra repartidora y puestos clave calculados al instante.</span>
                  </div>
                </div>

                {onNavigateToTab && (
                  <div className="pt-2">
                    <button
                      onClick={() => onNavigateToTab('regions')}
                      className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5 cursor-pointer underline decoration-blue-300 underline-offset-4"
                    >
                      <span>Explorar cobertura territorial de los 32 departamentos</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================
            RECUADRO 2: ¿Qué es lo que el cliente falla y nosotros arreglamos? 
            (Esquema: Cabecera centrada y 3 columnas con dolores)
            ======================================================== */}
        <div className="rounded-2xl overflow-hidden border-2 border-slate-900/20 shadow-lg hover:shadow-xl transition-all">
          <div className="bg-[#151B38] text-white px-5 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#FACC15] text-slate-950 text-xs font-black inline-flex items-center justify-center shrink-0 shadow-sm">
                2
              </span>
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
                ¿Qué es lo que el cliente falla y nosotros arreglamos?
              </h2>
            </div>
            <span className="text-[10px] uppercase font-bold text-red-300 bg-red-950/80 px-3 py-1 rounded-full border border-red-500/30">
              Dolores críticos de las campañas
            </span>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 sm:p-7 space-y-4">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-base sm:text-lg font-black text-white">
                La Crisis de la Improvisación y Falta de Datos en Territorio
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Las campañas políticas tradicionales en Colombia suelen operar a ciegas, enfrentando tres fallas críticas que conducen a derrotas evitables:
              </p>
            </div>

            {/* 3 Columnas dinámicas según el esquema */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-red-100 text-red-700 flex items-center justify-center font-black text-xs">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                    Falla 01
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-red-950">
                  Decisiones por 'Corazonadas'
                </h4>
                <p className="text-[11px] sm:text-xs text-red-900/80 leading-relaxed">
                  <strong>El error:</strong> Inversión masiva de recursos y visitas a ciegas guiadas por intuición de allegados, sin sustento estadístico ni análisis de votos históricos.
                </p>
                <div className="pt-2 border-t border-red-200/60 text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Proteus lo arregla con analítica electoral y priorización de mesas.</span>
                </div>
              </div>

              <div className="bg-amber-500/10/70 border border-amber-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 text-amber-700 flex items-center justify-center font-black text-xs">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-amber-700 bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
                    Falla 02
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-amber-950">
                  Discursos Genéricos y Desconectados
                </h4>
                <p className="text-[11px] sm:text-xs text-amber-900/80 leading-relaxed">
                  <strong>El error:</strong> Repetir las mismas promesas en cada municipio sin conocer las brechas reales de agua potable, desempleo, salud y NBI que angustian a la comunidad.
                </p>
                <div className="pt-2 border-t border-amber-200/60 text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Proteus lo arregla con diagnósticos NBI del DANE y discursos con IA.</span>
                </div>
              </div>

              <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    Falla 03
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-black text-purple-950">
                  Imagen e Identidad Desarticulada
                </h4>
                <p className="text-[11px] sm:text-xs text-purple-900/80 leading-relaxed">
                  <strong>El error:</strong> Candidatos que usan colores que no armonizan con su fototipo facial, proyectando debilidad, lejanía o incoherencia en afiches y debates.
                </p>
                <div className="pt-2 border-t border-purple-200/60 text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Proteus lo arregla con informe fisonómico y paleta dual de 4 colores.</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================
            RECUADRO 3: ¿Qué hizo tu cliente? 
            (Esquema: Avatar circular a la izquierda + Frase / Clamor a la derecha)
            ======================================================== */}
        <div className="rounded-2xl overflow-hidden border-2 border-slate-900/20 shadow-lg hover:shadow-xl transition-all">
          <div className="bg-[#151B38] text-white px-5 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#FACC15] text-slate-950 text-xs font-black inline-flex items-center justify-center shrink-0 shadow-sm">
                3
              </span>
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
                ¿Qué hizo tu cliente?
              </h2>
            </div>
            <span className="text-[10px] uppercase font-bold text-yellow-300 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 px-3 py-1 rounded-full border border-white/10">
              «¡Ayuda! ¡Esto no puede seguir así!»
            </span>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              
              {/* Avatar circular según el esquema */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center text-2xl sm:text-3xl font-black shrink-0 shadow-lg border-2 border-white ring-4 ring-yellow-400/30">
                🗣️
              </div>

              {/* Clamor y cita */}
              <div className="space-y-3 text-center sm:text-left flex-1">
                <div className="inline-block bg-amber-500/20 text-amber-300 border border-amber-300 text-amber-950 text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full">
                  El clamor de directores y candidatos
                </div>
                <blockquote className="text-base sm:text-lg font-serif italic font-bold text-white leading-snug">
                  «¡Ayuda! ¡Esto no puede seguir así! Basta de perder elecciones a ciegas, basta de discursos vacíos y encuestas tardías que solo confirman la derrota.»
                </blockquote>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Candidatos a alcaldías, concejos, asambleas y gobernaciones, junto a sus equipos estratégicos, decidieron dar un paso al frente y buscaron en <strong>Proteus Nacional</strong> un centro de comando unificado que les entregue certezas numéricas, diagnósticos certeros y una narrativa ganadora e irrebatible para cada visita en territorio.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[11px] font-bold bg-slate-100 text-white px-2.5 py-1 rounded-lg">
                    ✓ Certeza estadística
                  </span>
                  <span className="text-[11px] font-bold bg-slate-100 text-white px-2.5 py-1 rounded-lg">
                    ✓ Discurso calibrado
                  </span>
                  <span className="text-[11px] font-bold bg-slate-100 text-white px-2.5 py-1 rounded-lg">
                    ✓ Identidad visual impecable
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================
            RECUADRO 4: ¿Cómo trabajas? 
            (Esquema: 3 Rombos horizontales conectados ◇ > ◇ > ◇)
            ======================================================== */}
        <div className="rounded-2xl overflow-hidden border-2 border-slate-900/20 shadow-lg hover:shadow-xl transition-all">
          <div className="bg-[#151B38] text-white px-5 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#FACC15] text-slate-950 text-xs font-black inline-flex items-center justify-center shrink-0 shadow-sm">
                4
              </span>
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
                ¿Cómo trabajas?
              </h2>
            </div>
            <span className="text-[10px] uppercase font-bold text-blue-300 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 px-3 py-1 rounded-full border border-white/10">
              Metodología en 3 Fases
            </span>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 sm:p-7 space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-base sm:text-lg font-black text-white">
                Flujo Metodológico: Fisonomía, Territorio y Discurso
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Tres fases interconectadas y sincronizadas para construir una campaña invencible:
              </p>
            </div>

            {/* Diagrama de 3 Rombos del esquema */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              
              {/* Rombo 1: Fisonomía */}
              <div 
                onClick={() => setActivePhase(1)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
                  activePhase === 1 
                    ? 'border-blue-600 bg-sky-500/10/50 shadow-md ring-2 ring-blue-400/20' 
                    : 'border-white/10 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:border-slate-400'
                }`}
              >
                <div className="w-12 h-12 rotate-45 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md mb-4 -mt-1">
                  <span className="-rotate-45 font-black text-sm">1</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-sky-500/20 text-sky-300 px-2.5 py-0.5 rounded-full mb-1">
                  Fase 1
                </span>
                <h4 className="text-sm font-black text-white">
                  Identidad & Fisonomía
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Carga fotográfica con Gemini 3.8 para extraer fototipo, subtono de piel y la paleta de 4 colores fisonómicos adaptada a vestuario y gráfica.
                </p>
              </div>

              {/* Rombo 2: Territorio */}
              <div 
                onClick={() => setActivePhase(2)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
                  activePhase === 2 
                    ? 'border-emerald-600 bg-emerald-500/10/50 shadow-md ring-2 ring-emerald-400/20' 
                    : 'border-white/10 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:border-slate-400'
                }`}
              >
                <div className="w-12 h-12 rotate-45 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md mb-4 -mt-1">
                  <span className="-rotate-45 font-black text-sm">2</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full mb-1">
                  Fase 2
                </span>
                <h4 className="text-sm font-black text-white">
                  Diagnóstico Territorial & NBI
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Cruce de datos de los 32 departamentos y 1.122 municipios: censo electoral, histórico de abstención y mapa de Necesidades Básicas Insatisfechas.
                </p>
              </div>

              {/* Rombo 3: IA & Discurso */}
              <div 
                onClick={() => setActivePhase(3)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center ${
                  activePhase === 3 
                    ? 'border-purple-600 bg-purple-50/50 shadow-md ring-2 ring-purple-400/20' 
                    : 'border-white/10 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl hover:border-slate-400'
                }`}
              >
                <div className="w-12 h-12 rotate-45 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-800 text-white flex items-center justify-center shadow-md mb-4 -mt-1">
                  <span className="-rotate-45 font-black text-sm">3</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full mb-1">
                  Fase 3
                </span>
                <h4 className="text-sm font-black text-white">
                  IA & Estrategia Discursiva
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Generación de discursos para plaza pública con mensaje-fuerza, simulador de debates con Gemini 3.8 y cálculo matemático de cifra repartidora.
                </p>
              </div>

            </div>

            {/* Detalle interactivo de la fase seleccionada */}
            <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>
                  {activePhase === 1 && "Fase 1 activa: Calibración estética y fisonómica en el Módulo de Biografía."}
                  {activePhase === 2 && "Fase 2 activa: Análisis censal y brechas sociales en el Módulo de Departamentos."}
                  {activePhase === 3 && "Fase 3 activa: Formulación narrativa y modelado en el Analista IA y Proyector."}
                </span>
              </div>
              <button
                onClick={onNavigateToBio}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>Configurar en Biografía</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================
            RECUADRO 5: ¿Qué creaste? 
            (Esquema: Carrusel horizontal con flechas ‹ [Elemento Activo] ›)
            ======================================================== */}
        <div className="rounded-2xl overflow-hidden border-2 border-slate-900/20 shadow-lg hover:shadow-xl transition-all">
          <div className="bg-[#151B38] text-white px-5 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#FACC15] text-slate-950 text-xs font-black inline-flex items-center justify-center shrink-0 shadow-sm">
                5
              </span>
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
                ¿Qué creaste?
              </h2>
            </div>
            <span className="text-[10px] uppercase font-bold text-yellow-300 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 px-3 py-1 rounded-full border border-white/10">
              Suite de 6 Módulos Estratégicos
            </span>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 sm:p-7 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">
                  Galería Interactiva de Módulos
                </h3>
                <p className="text-xs text-slate-400">
                  Navega por las herramientas especializadas que componen Proteus 2.0:
                </p>
              </div>

              {/* Controles de navegación del carrusel */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevModule}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-white flex items-center justify-center cursor-pointer transition-all active:scale-95"
                  title="Módulo anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-bold text-slate-300 px-2">
                  {carouselIndex + 1} / {CAROUSEL_MODULES.length}
                </span>
                <button
                  onClick={handleNextModule}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-white flex items-center justify-center cursor-pointer transition-all active:scale-95"
                  title="Módulo siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Módulo activo en el carrusel */}
            {(() => {
              const currentModule = CAROUSEL_MODULES[carouselIndex];
              return (
                <div className="bg-gradient-to-r from-slate-900 via-[#151B38] to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden transition-all">
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-3 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#FACC15] text-slate-950">
                          {currentModule.tag}
                        </span>
                        <span className="text-xs text-blue-200 font-semibold">
                          Proteus Suite
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                        {currentModule.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {currentModule.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                        {currentModule.details.map((detail, idx) => (
                          <div key={idx} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 rounded-lg p-2 text-[11px] text-blue-100 flex items-center gap-1.5 border border-white/5">
                            <span className="text-[#FACC15] font-black">•</span>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-full md:w-auto flex flex-col items-center justify-center shrink-0">
                      {onNavigateToTab && (
                        <button
                          onClick={() => onNavigateToTab(currentModule.tab)}
                          className="w-full md:w-auto px-6 py-3 bg-[#FACC15] hover:bg-yellow-300 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-95"
                        >
                          <span>Abrir {currentModule.name.split(' ')[0]}</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Indicadores de bolitas */}
            <div className="flex justify-center items-center gap-1.5 pt-2">
              {CAROUSEL_MODULES.map((mod, idx) => (
                <button
                  key={mod.id}
                  onClick={() => setCarouselIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    carouselIndex === idx ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Ver ${mod.name}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            RECUADRO 6: ¿Qué recibió tu cliente? 
            (Esquema: Sección dividida con texto a la izquierda + Tarjeta destacada a la derecha)
            ======================================================== */}
        <div className="rounded-2xl overflow-hidden border-2 border-slate-900/20 shadow-lg hover:shadow-xl transition-all">
          <div className="bg-[#151B38] text-white px-5 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#FACC15] text-slate-950 text-xs font-black inline-flex items-center justify-center shrink-0 shadow-sm">
                6
              </span>
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
                ¿Qué recibió tu cliente?
              </h2>
            </div>
            <span className="text-[10px] uppercase font-bold text-emerald-300 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 px-3 py-1 rounded-full border border-white/10">
              Resultados. Cifras y Emociones
            </span>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 sm:p-7">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Lado izquierdo: Cifras y métricas detalladas */}
              <div className="md:col-span-8 space-y-3">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Cifras Verificadas y Confianza Inquebrantable en Tarima</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  El candidato y su comité directivo reciben un impacto doble y contundente: números matemáticamente calculados y la seguridad de subir a tarima conociendo a fondo el territorio.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-emerald-500/10/70 border border-emerald-200/80 rounded-xl p-3 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-800">Métrica Electoral</span>
                    <h4 className="text-sm font-black text-emerald-950">Votos Proyectados por Puesto</h4>
                    <p className="text-[11px] text-emerald-800/90 leading-tight">
                      Cálculo de umbral y meta electoral con cifra repartidora en tiempo real.
                    </p>
                  </div>

                  <div className="bg-sky-500/10/70 border border-blue-200/80 rounded-xl p-3 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-blue-800">Métrica Social</span>
                    <h4 className="text-sm font-black text-blue-950">100% de Municipios con NBI</h4>
                    <p className="text-[11px] text-blue-800/90 leading-tight">
                      Datos oficiales del DANE mapeados por acueducto, vivienda y empleo.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-xs text-slate-300">
                  <span className="font-bold text-white">Emoción resultante:</span>
                  <span>Tranquilidad, empatía comunitaria y serenidad absoluta en debates.</span>
                </div>
              </div>

              {/* Lado derecho: Tarjeta de alto impacto visual (según el recuadro blanco en el wireframe) */}
              <div className="md:col-span-4 bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-800 text-white rounded-2xl p-6 text-center shadow-lg border border-emerald-500/30 flex flex-col items-center justify-center">
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-200">
                  Certeza Estadística
                </span>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white my-2">
                  99.8%
                </div>
                <p className="text-xs text-emerald-100 font-semibold">
                  Precisión en asignación de puestos y cobertura de datos en Colombia.
                </p>
                <div className="mt-4 pt-3 border-t border-emerald-500/30 w-full text-[11px] text-emerald-200 font-bold">
                  Sin especulaciones • Datos DANE & Registraduría
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================
            RECUADRO 7: ¿Qué hace tu cliente ahora? 
            (Esquema: Avatar circular a la izquierda + Testimonio triunfal a la derecha)
            ======================================================== */}
        <div className="rounded-2xl overflow-hidden border-2 border-slate-900/20 shadow-lg hover:shadow-xl transition-all">
          <div className="bg-[#151B38] text-white px-5 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#FACC15] text-slate-950 text-xs font-black inline-flex items-center justify-center shrink-0 shadow-sm">
                7
              </span>
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
                ¿Qué hace tu cliente ahora?
              </h2>
            </div>
            <span className="text-[10px] uppercase font-bold text-emerald-300 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 px-3 py-1 rounded-full border border-white/10">
              «¡Vaya! ¡Ahora todo marcha bien!»
            </span>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              
              {/* Avatar circular con destellos según el esquema */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-emerald-400 via-teal-500 to-emerald-300 text-slate-950 flex items-center justify-center text-2xl sm:text-3xl font-black shrink-0 shadow-lg border-2 border-white ring-4 ring-emerald-400/30">
                ✨
              </div>

              {/* Cita de alivio y control total */}
              <div className="space-y-3 text-center sm:text-left flex-1">
                <div className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full">
                  Control absoluto en el día a día
                </div>
                <blockquote className="text-base sm:text-lg font-serif italic font-bold text-white leading-snug">
                  «¡Vaya! ¡Ahora tenemos el control total y sabemos con exactitud milimétrica qué proponer en cada plaza, qué responder en los debates y dónde están nuestros votos!»
                </blockquote>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl p-2.5 text-xs text-slate-200">
                    <strong className="block text-white mb-0.5">El Candidato:</strong>
                    Debate con solidez técnica frente a rivales y medios.
                  </div>
                  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl p-2.5 text-xs text-slate-200">
                    <strong className="block text-white mb-0.5">Comunicaciones:</strong>
                    Redacta comunicados y copys calibrados en minutos.
                  </div>
                  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl p-2.5 text-xs text-slate-200">
                    <strong className="block text-white mb-0.5">Diseñadores:</strong>
                    Usan los 4 colores fisonómicos sin dudas de estilo.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================
            RECUADRO 8: ¿Cuál es la transformación y legado a largo plazo?
            (Esquema: Banner ancho superior + 2 columnas de texto abajo)
            ======================================================== */}
        <div className="rounded-2xl overflow-hidden border-2 border-slate-900/20 shadow-lg hover:shadow-xl transition-all">
          <div className="bg-[#151B38] text-white px-5 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#FACC15] text-slate-950 text-xs font-black inline-flex items-center justify-center shrink-0 shadow-sm">
                8
              </span>
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
                ¿Cuál es la transformación y legado a largo plazo?
              </h2>
            </div>
            <span className="text-[10px] uppercase font-bold text-purple-300 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 px-3 py-1 rounded-full border border-white/10">
              Resultados permanentes y gobierno viable
            </span>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 sm:p-7 space-y-4">
            {/* Banner ancho superior del esquema */}
            <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white p-5 sm:p-6 rounded-2xl shadow-md border border-purple-800 text-center relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left flex-1">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-[#FACC15]">
                    Impacto Institucional y Democrático
                  </span>
                  <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white mt-1">
                    Una Ventaja Competitiva Sostenible y un Plan de Gobierno Viable
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-200 max-w-2xl mt-1">
                    La transformación supera el día de elecciones: consolida gobernabilidad y ejecución de políticas públicas reales.
                  </p>
                </div>
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 p-2.5 rounded-2xl border border-white/10 shrink-0 hidden sm:flex items-center justify-center">
                  <CmtIsologo width={135} height={68} variant="white" />
                </div>
              </div>
            </div>

            {/* 2 Columnas abajo según el esquema del wireframe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              
              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10/80 rounded-2xl p-5 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-black text-white">
                  Optimización Total de Recursos Electorales
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cero desperdicio presupuestal en publicidad dispersa. Cada peso invertido en pauta, transporte y movilización se dirige con precisión quirúrgica a las mesas con mayor rendimiento y probabilidad de voto.
                </p>
                <div className="pt-2 text-[11px] font-bold text-purple-700">
                  • Retorno de inversión electoral multiplicado por 4.
                </div>
              </div>

              <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10/80 rounded-2xl p-5 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs">
                  <Award className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-black text-white">
                  Movilización del Voto de Opinión e Indecisos
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Conexión directa con la ciudadanía independiente gracias a propuestas rigurosas sustentadas en las Necesidades Básicas Insatisfechas (NBI), asegurando un mandato popular legítimo y realizable.
                </p>
                <div className="pt-2 text-[11px] font-bold text-indigo-700">
                  • Plan de Desarrollo alineado a los indicadores del DANE.
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================
            RECUADRO 9: ¿Qué debo hacer ahora? 
            (Esquema: Botón grande dorado/amarillo para actuar)
            ======================================================== */}
        <div className="rounded-2xl overflow-hidden border-2 border-slate-900/20 shadow-lg hover:shadow-xl transition-all">
          <div className="bg-[#151B38] text-white px-5 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#FACC15] text-slate-950 text-xs font-black inline-flex items-center justify-center shrink-0 shadow-sm">
                9
              </span>
              <h2 className="text-sm sm:text-base font-black tracking-tight text-white">
                ¿Qué debo hacer ahora?
              </h2>
            </div>
            <span className="text-[10px] uppercase font-bold text-yellow-300 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 px-3 py-1 rounded-full border border-white/10">
              Llamado a la Acción Inmediato
            </span>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-6 sm:p-8 text-center space-y-5">
            <div className="max-w-xl mx-auto space-y-2">
              <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                Comienza Ahora: Ingresa a Biografía y Calibra tu Perfil
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Inicia la Fase 1 configurando tu perfil, conectando tu cuenta de Google Drive para almacenamiento privado y extrayendo tu colorimetría fisonómica con Gemini 3.8.
              </p>
            </div>

            {/* 3 Pasos rápidos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-left">
              <div className="p-3.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10">
                <span className="text-xs font-black text-blue-600">Paso 01</span>
                <h4 className="text-xs font-bold text-white mt-1">Conecta Google Drive</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Almacenamiento privado y seguro para tus documentos.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10">
                <span className="text-xs font-black text-emerald-600">Paso 02</span>
                <h4 className="text-xs font-bold text-white mt-1">Sube tus Fotografías</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Gemini 3.8 extraerá tu paleta dual de 4 colores.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10">
                <span className="text-xs font-black text-purple-600">Paso 03</span>
                <h4 className="text-xs font-bold text-white mt-1">Domina tu Territorio</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Proyecta votos y simula discursos ganadores.</p>
              </div>
            </div>

            {/* Gran botón dorado de acción */}
            <div className="pt-2">
              <button
                onClick={onNavigateToBio}
                className="w-full sm:w-auto px-8 py-4 bg-[#FACC15] hover:bg-yellow-300 text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer mx-auto transform active:scale-95"
              >
                <UserCheck className="w-5 h-5 text-slate-950" />
                <span>Entrar a Biografía y Colorimetría</span>
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </button>
            </div>
          </div>
        </div>

        {/* Barra inferior del póster */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t-2 border-slate-900/10 pt-4 mt-6 gap-3 text-xs font-black text-white tracking-wider">
          <button 
            onClick={handleSave}
            className={`border-2 border-slate-900 px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer uppercase text-xs font-black ${
              isSaved ? 'bg-slate-900 text-yellow-400' : 'bg-transparent text-white hover:bg-slate-900 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>¿Te sirvió? {isSaved ? 'GUARDADO ✓' : 'GUARDAR O COMPARTIR'}</span>
          </button>

          <div className="flex items-center gap-2 uppercase tracking-widest text-[11px] sm:text-xs font-extrabold text-white text-center">
            <CmtIsotipo size={20} />
            <span>CMT PROTEUS • CONSULTORÍA ESTRATÉGICA Y VISIÓN DE FUTURO</span>
          </div>

          <button 
            onClick={onNavigateToBio}
            className="border-2 border-slate-900 px-4 py-2 rounded-xl bg-transparent text-white hover:bg-slate-900 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer uppercase text-xs font-black"
          >
            <span>CONTINUAR A BIOGRAFÍA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};

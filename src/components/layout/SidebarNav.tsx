import React from 'react';
import { 
  Globe, 
  Users, 
  Target, 
  ShieldCheck, 
  Layers, 
  MapPin, 
  Bot, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  Map,
  Database,
  Brain,
  Megaphone,
  Video,
  HardDrive,
  Network,
  Scale
} from 'lucide-react';
import { CmtIsotipo } from '../CmtProteusLogo';

export type NavViewId = 
  | 'national-overview'
  | 'national-candidates'
  | 'national-tools'
  | 'territorial-zoom'
  | 'municipal-repository'
  | 'voter-segmentation'
  | 'content-director'
  | 'targeted-advertising'
  | 'multimedia-studio'
  | 'agent-team'
  | 'political-houses-graph'
  | 'electoral-audit-forensics'
  | 'antioquia-gobernacion'
  | 'antioquia-subregiones'
  | 'antioquia-municipios'
  | 'antigravity-console'
  | 'brand-manual';

interface SidebarNavProps {
  currentView: NavViewId;
  onSelectView: (view: NavViewId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenDriveModal?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  currentView,
  onSelectView,
  collapsed,
  onToggleCollapse,
  onOpenDriveModal
}) => {
  return (
    <aside
      className={`bg-slate-950/35 backdrop-blur-3xl border-r border-white/20 transition-all duration-300 flex flex-col z-20 shadow-[inset_-1px_0_1px_0_rgba(255,255,255,0.25),10px_0_30px_rgba(0,0,0,0.5)] ${
        collapsed ? 'w-16' : 'w-72'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-3 flex items-center justify-between border-b border-white/15">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-8 h-8 shrink-0 flex items-center justify-center p-1 rounded-xl bg-gradient-to-br from-white/20 to-white/05 backdrop-blur-xl border border-white/30 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4)]">
            <CmtIsotipo className="w-6 h-6" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-white leading-tight">
                PROTEUS 1.2
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                Centro Estratégico
              </span>
            </div>
          )}
        </div>
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 transition"
          title={collapsed ? 'Expandir barra lateral' : 'Colapsar barra lateral'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
        {/* GROUP 1: AMBITO NACIONAL & PERSONALIZACIÓN */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-1.5 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-amber-400 font-extrabold">
              <span>Personalización & Territorio</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[8px] font-mono">
                Núcleo
              </span>
            </div>
          )}
          <div className="space-y-1">
            <button
              onClick={() => onSelectView('national-candidates')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'national-candidates'
                  ? 'bg-gradient-to-r from-amber-500/40 via-sky-500/30 to-blue-600/40 border border-amber-400/70 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(251,191,36,0.35)]'
                  : 'text-amber-200/90 hover:text-white hover:bg-white/10 border border-amber-400/20'
              }`}
              title="Centro de Personalización del Candidato"
            >
              <Users className="w-4 h-4 shrink-0 text-amber-400" />
              {!collapsed && (
                <div className="flex flex-col text-left">
                  <span className="text-white font-black">Candidato & Perfil</span>
                  <span className="text-[9px] text-amber-300/80 font-mono">Personalización Central</span>
                </div>
              )}
            </button>

            <button
              onClick={() => onSelectView('national-overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'national-overview'
                  ? 'bg-gradient-to-r from-sky-400/35 to-blue-600/40 border border-sky-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(14,165,233,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Presidencia & 32 Departamentos"
            >
              <Globe className="w-4 h-4 shrink-0 text-sky-400" />
              {!collapsed && <span>Presidencia & Territorio</span>}
            </button>

            <button
              onClick={() => onSelectView('national-tools')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'national-tools'
                  ? 'bg-gradient-to-r from-sky-400/35 to-blue-600/40 border border-sky-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(14,165,233,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Herramientas y Análisis Estratégico"
            >
              <Target className="w-4 h-4 shrink-0 text-emerald-400" />
              {!collapsed && <span>Herramientas de Campaña</span>}
            </button>
          </div>
        </div>

        {/* GROUP 2: TRIPLE PROPÓSITO & INTELIGENCIA IA */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-1.5 text-[9px] font-mono uppercase tracking-widest text-amber-400 font-extrabold flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Triple Propósito & Analítica
            </div>
          )}
          <div className="space-y-1">
            <button
              onClick={() => onSelectView('territorial-zoom')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'territorial-zoom'
                  ? 'bg-gradient-to-r from-sky-500/40 via-blue-600/40 to-indigo-600/40 border border-sky-300/70 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_25px_rgba(56,189,248,0.5)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Zoom Territorial Continuo (5 Escalas GeoJSON)"
            >
              <Compass className="w-4 h-4 shrink-0 text-amber-400 animate-pulse" />
              {!collapsed && (
                <div className="flex flex-col text-left">
                  <span>Zoom Territorial (5 Escalas)</span>
                  <span className="text-[9px] text-sky-300 font-mono">Colombia ➔ Barrios</span>
                </div>
              )}
            </button>

            <button
              onClick={() => onSelectView('municipal-repository')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'municipal-repository'
                  ? 'bg-gradient-to-r from-sky-400/35 to-blue-600/40 border border-sky-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(14,165,233,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Propósito 1: Repositorio Municipal Universal"
            >
              <Database className="w-4 h-4 shrink-0 text-sky-400" />
              {!collapsed && <span>1. Repositorio Municipal</span>}
            </button>

            <button
              onClick={() => onSelectView('voter-segmentation')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'voter-segmentation'
                  ? 'bg-gradient-to-r from-indigo-500/35 to-purple-600/40 border border-indigo-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(99,102,241,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Propósito 2: Analista y Segmentación de Votantes"
            >
              <Brain className="w-4 h-4 shrink-0 text-indigo-400" />
              {!collapsed && <span>2. Segmentación & Votantes</span>}
            </button>

            <button
              onClick={() => onSelectView('content-director')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'content-director'
                  ? 'bg-gradient-to-r from-amber-500/35 to-orange-600/40 border border-amber-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(251,191,36,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Propósito 3: Director de Contenido & Briefs"
            >
              <Megaphone className="w-4 h-4 shrink-0 text-amber-400" />
              {!collapsed && <span>3. Director de Contenido</span>}
            </button>

            <button
              onClick={() => onSelectView('targeted-advertising')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'targeted-advertising'
                  ? 'bg-gradient-to-r from-amber-500/35 to-rose-600/40 border border-amber-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(245,158,11,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Propósito Supremo: Publicidad Electoral Segmentada"
            >
              <Target className="w-4 h-4 shrink-0 text-amber-400" />
              {!collapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>Publicidad Segmentada</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                    PA-010
                  </span>
                </div>
              )}
            </button>

            <button
              onClick={() => onSelectView('multimedia-studio')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'multimedia-studio'
                  ? 'bg-gradient-to-r from-pink-500/35 to-rose-600/40 border border-pink-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(244,114,182,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Analista Multimedia: Imagen & Video del Candidato"
            >
              <Video className="w-4 h-4 shrink-0 text-pink-400" />
              {!collapsed && <span>Analista Multimedia</span>}
            </button>

            <button
              onClick={() => onSelectView('agent-team')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'agent-team'
                  ? 'bg-gradient-to-r from-emerald-500/35 to-teal-600/40 border border-emerald-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(52,211,153,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Cuadrilla de 5 Agentes IA Especializados"
            >
              <Bot className="w-4 h-4 shrink-0 text-emerald-400" />
              {!collapsed && <span>Cuadrilla de 5 Agentes</span>}
            </button>
          </div>
        </div>

        {/* GROUP 3: COMMAND CENTER ANTIOQUIA */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-1.5 text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-extrabold">
              Command Center Antioquia
            </div>
          )}
          <div className="space-y-1">
            <button
              onClick={() => onSelectView('antioquia-gobernacion')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'antioquia-gobernacion'
                  ? 'bg-gradient-to-r from-emerald-500/35 to-teal-600/40 border border-emerald-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(52,211,153,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Sala de Gobernación de Antioquia"
            >
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              {!collapsed && <span>Sala Gobernación</span>}
            </button>

            <button
              onClick={() => onSelectView('antioquia-subregiones')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'antioquia-subregiones'
                  ? 'bg-gradient-to-r from-emerald-500/35 to-teal-600/40 border border-emerald-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(52,211,153,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="9 Subregiones Estratégicas"
            >
              <Layers className="w-4 h-4 shrink-0 text-sky-400" />
              {!collapsed && <span>9 Subregiones</span>}
            </button>

            <button
              onClick={() => onSelectView('antioquia-municipios')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'antioquia-municipios'
                  ? 'bg-gradient-to-r from-emerald-500/35 to-teal-600/40 border border-emerald-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(52,211,153,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Directorio de 125 Municipios"
            >
              <MapPin className="w-4 h-4 shrink-0 text-amber-400" />
              {!collapsed && <span>125 Municipios</span>}
            </button>

            <button
              onClick={() => onSelectView('political-houses-graph')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'political-houses-graph'
                  ? 'bg-gradient-to-r from-sky-500/35 to-indigo-600/40 border border-sky-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(56,189,248,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Observatorio Electoral: Redes de Poder y Casas Políticas (Grafos 2D/3D)"
            >
              <Network className="w-4 h-4 shrink-0 text-sky-400" />
              {!collapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>Casas Políticas</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono font-bold">
                    2D/3D
                  </span>
                </div>
              )}
            </button>

            <button
              onClick={() => onSelectView('electoral-audit-forensics')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'electoral-audit-forensics'
                  ? 'bg-gradient-to-r from-rose-500/35 to-amber-600/40 border border-rose-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(244,63,94,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Auditoría Electoral: Escrutinios E-14 vs E-24 y reclamaciones"
            >
              <Scale className="w-4 h-4 shrink-0 text-amber-400" />
              {!collapsed && (
                <div className="flex items-center justify-between w-full">
                  <span>Auditoría E-14/E-24</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 font-mono font-bold">
                    E-14
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* GROUP 4: SISTEMA & ENLACE DRIVE */}
        <div>
          {!collapsed && (
            <div className="px-3 mb-1.5 text-[9px] font-mono uppercase tracking-widest text-slate-400 font-extrabold">
              Sistema & Persistencia
            </div>
          )}
          <div className="space-y-1">
            {onOpenDriveModal && (
              <button
                onClick={onOpenDriveModal}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-sky-300 hover:text-white hover:bg-sky-500/20 border border-sky-400/30 transition-all duration-200"
                title="Enlace y Respaldo en Google Drive"
              >
                <HardDrive className="w-4 h-4 shrink-0 text-sky-400" />
                {!collapsed && <span>Enlace Google Drive</span>}
              </button>
            )}

            <button
              onClick={() => onSelectView('brand-manual')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                currentView === 'brand-manual'
                  ? 'bg-gradient-to-r from-sky-400/35 to-blue-600/40 border border-sky-300/60 text-white shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_4px_20px_rgba(14,165,233,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
              title="Manual de Marca CMT Proteus"
            >
              <Sparkles className="w-4 h-4 shrink-0 text-purple-400" />
              {!collapsed && <span>Identidad Institucional</span>}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

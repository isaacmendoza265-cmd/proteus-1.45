import React, { useState } from 'react';
import { 
  Users, 
  Sparkles, 
  UserCheck, 
  Compass, 
  Megaphone, 
  Target, 
  Building2, 
  ArrowRight,
  Shield,
  Palette,
  Camera,
  Activity,
  Layers,
  Network,
  Scale
} from 'lucide-react';
import { 
  CandidateProfileManager, 
  CandidateProfile 
} from '../../components/CandidateProfileManager';
import { CandidateProfileModal } from '../../components/CandidateProfileModal';
import { Button } from '../../components/ui/Button';
import { NavViewId } from '../../components/layout/SidebarNav';

interface CandidateProfilesViewProps {
  candidateProfile: CandidateProfile;
  onSaveProfile: (profile: CandidateProfile) => void;
  onNavigateToView?: (view: NavViewId) => void;
}

export const CandidateProfilesView: React.FC<CandidateProfilesViewProps> = ({
  candidateProfile,
  onSaveProfile,
  onNavigateToView
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* 1. HERO INSTITUCIONAL: PROTEUS 1.2 - CENTRO ESTRATÉGICO DE PERSONALIZACIÓN */}
      <div className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-slate-950/40 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.4)]">
        {/* Ambient Glowing Aurora Background Orbs */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-sky-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-gradient-to-r from-amber-400/25 via-sky-400/25 to-purple-500/30 text-amber-300 border border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.35)] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Centro Estratégico Proteus 1.2 • Núcleo de Personalización de Campaña
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                Punto de Entrada Primario
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              PERFIL & PERSONALIZACIÓN DEL CANDIDATO
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              El propósito supremo de Proteus es la <strong className="text-amber-300">personalización absoluta</strong>. Toda la inteligencia artificial de Gemini, los briefs de discurso, los modelos demográficos y el Zoom GIS se ajustan a la identidad discursiva, colorimetría y prioridades de este candidato.
            </p>
          </div>

          {/* Action Button */}
          <div className="shrink-0 flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setModalOpen(true)}
              leftIcon={<Sparkles className="w-4 h-4 text-amber-300" />}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(14,165,233,0.4)] transition transform hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Editar Perfil Rápido
            </Button>
          </div>
        </div>

        {/* Active Candidate Snapshot Card */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-3.5 rounded-2xl bg-white/05 border border-white/10 backdrop-blur-xl">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              Candidato Activo
            </div>
            <div className="text-sm font-black text-white mt-1 truncate">
              {candidateProfile.nombre}
            </div>
            <div className="text-[11px] text-amber-300/90 font-medium truncate">
              {candidateProfile.afiliacionPartidista || 'Proyecto Político'}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/05 border border-white/10 backdrop-blur-xl">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-sky-400" />
              Tono Discursivo Calibrado
            </div>
            <div className="text-sm font-black text-sky-300 mt-1 truncate">
              {candidateProfile.tonoNarrativo || 'Firmeza y Transparencia'}
            </div>
            <div className="text-[11px] text-slate-400 font-mono truncate">
              Estilo: {candidateProfile.estiloComunicacion || 'Asertivo y directo'}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/05 border border-white/10 backdrop-blur-xl">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              Colorimetría & Fototipo
            </div>
            <div className="text-sm font-black text-purple-300 mt-1 truncate">
              {candidateProfile.colorimetryData?.estacionCromatica || 'Contraste Alto'}
            </div>
            <div className="text-[11px] text-slate-400 font-mono truncate">
              Piel: {candidateProfile.colorimetryData?.fototipoPiel || 'Fototipo III'}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/05 border border-white/10 backdrop-blur-xl">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              Eje Temático Prioritario
            </div>
            <div className="text-sm font-black text-emerald-300 mt-1 truncate">
              {candidateProfile.ejeTematicoComodo || 'Seguridad y Empleo'}
            </div>
            <div className="text-[11px] text-slate-400 font-mono truncate">
              Alcance: Departamental & Nacional
            </div>
          </div>
        </div>

        {/* 2. CAMPAIGN LAUNCHPAD: ACCESOS DIRECTOS A MÓDULOS */}
        {onNavigateToView && (
          <div className="relative z-10 mt-6 pt-5 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-sky-400" />
                Launchpad Táctico de Campaña (Navegación Instantánea)
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Lanza cualquier herramienta con la identidad de {candidateProfile.nombre} ya inyectada
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
              <button
                type="button"
                onClick={() => onNavigateToView('territorial-zoom')}
                className="p-3 rounded-2xl bg-white/05 hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/50 text-left transition transform hover:scale-[1.02] active:scale-95 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-sky-400 mb-1.5">
                  <Compass className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="text-xs font-black text-white group-hover:text-sky-200">
                  Zoom Territorial GIS
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  5 Escalas continuas DANE
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToView('content-director')}
                className="p-3 rounded-2xl bg-white/05 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/50 text-left transition transform hover:scale-[1.02] active:scale-95 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-amber-400 mb-1.5">
                  <Megaphone className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="text-xs font-black text-white group-hover:text-amber-200">
                  Director de Contenido
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Briefs y discursos con IA
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToView('voter-segmentation')}
                className="p-3 rounded-2xl bg-white/05 hover:bg-purple-500/20 border border-white/10 hover:border-purple-400/50 text-left transition transform hover:scale-[1.02] active:scale-95 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-purple-400 mb-1.5">
                  <Users className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="text-xs font-black text-white group-hover:text-purple-200">
                  Segmentación 4D
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  54 cohortes y arquetipos
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToView('national-tools')}
                className="p-3 rounded-2xl bg-white/05 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-400/50 text-left transition transform hover:scale-[1.02] active:scale-95 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-emerald-400 mb-1.5">
                  <Target className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="text-xs font-black text-white group-hover:text-emerald-200">
                  Simulador D'Hondt
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Curul marginal y umbral 3%
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToView('antioquia-gobernacion')}
                className="p-3 rounded-2xl bg-white/05 hover:bg-teal-500/20 border border-white/10 hover:border-teal-400/50 text-left transition transform hover:scale-[1.02] active:scale-95 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-teal-400 mb-1.5">
                  <Building2 className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="text-xs font-black text-white group-hover:text-teal-200">
                  Sala Gobernación
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  28 actores y 7 ejes
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToView('political-houses-graph')}
                className="p-3 rounded-2xl bg-white/05 hover:bg-rose-500/20 border border-white/10 hover:border-rose-400/50 text-left transition transform hover:scale-[1.02] active:scale-95 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-rose-400 mb-1.5">
                  <Network className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="text-xs font-black text-white group-hover:text-rose-200">
                  Casas Políticas
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Grafos de Poder 2D/3D
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToView('targeted-advertising')}
                className="p-3 rounded-2xl bg-white/05 hover:bg-amber-500/20 border border-white/10 hover:border-amber-400/50 text-left transition transform hover:scale-[1.02] active:scale-95 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-amber-400 mb-1.5">
                  <Target className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="text-xs font-black text-white group-hover:text-amber-200">
                  Publicidad Segmentada
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Creatividades y Pauta IA
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. GESTOR INTEGRAL DE PERFILES Y PERSONALIZACIÓN */}
      <CandidateProfileManager
        candidateProfile={candidateProfile}
        onSaveProfile={onSaveProfile}
        onSelectCandidateProfile={(prof) => onSaveProfile(prof)}
      />

      {/* Quick Modal Editor */}
      {modalOpen && (
        <CandidateProfileModal
          isOpen={modalOpen}
          candidateProfile={candidateProfile}
          onSaveProfile={(prof) => {
            onSaveProfile(prof);
            setModalOpen(false);
          }}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

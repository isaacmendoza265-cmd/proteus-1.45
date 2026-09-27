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
import { googleDriveService } from '../../services/googleDriveService';

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
  const [driveAccount, setDriveAccount] = useState(() => googleDriveService.getAccount());

  return (
    <div className="proteus-civico space-y-6 pb-12">
      {/* 1. HERO INSTITUCIONAL: PROTEUS 1.2 - CENTRO ESTRATÉGICO DE PERSONALIZACIÓN */}
      <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Centro Estratégico Proteus 1.2 • Núcleo de Personalización de Campaña
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[var(--c-border)] text-[var(--c-muted)]">
                Punto de Entrada Primario
              </span>
            </div>

            <h1 className="font-titulo m-0 text-2xl sm:text-3xl lg:text-4xl leading-tight font-medium">
              Perfil del candidato
            </h1>

            <p className="m-0 text-xs sm:text-sm text-[var(--c-muted)] max-w-3xl leading-relaxed">
              El propósito supremo de Proteus es la <strong className="text-[var(--c-ink)]">personalización absoluta</strong>. Toda la inteligencia artificial de Gemini, los briefs de discurso, los modelos demográficos y el Zoom GIS se ajustan a la identidad discursiva, colorimetría y prioridades de este candidato.
            </p>
          </div>

          {/* Action Button */}
          <div className="shrink-0 flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setModalOpen(true)}
              leftIcon={<Sparkles className="w-4 h-4" />}
              className="min-h-9 px-4 rounded-lg bg-[var(--c-accent)] text-white font-semibold text-xs"
            >
              Editar Perfil Rápido
            </Button>
          </div>
        </div>

        {/* Active Candidate Snapshot Card */}
        <div className="mt-6 pt-5 border-t border-[var(--c-border)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-3.5 rounded-xl bg-[var(--c-sunken)] border border-[var(--c-border)]">
            <div className="text-xs text-[var(--c-muted)] font-bold flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[var(--c-accent)]" />
              Candidato Activo
            </div>
            <div className="text-sm font-bold mt-1 truncate">
              {candidateProfile.nombre}
            </div>
            <div className="text-xs text-[var(--c-muted)] font-medium truncate">
              {candidateProfile.afiliacionPartidista || 'Proyecto Político'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--c-sunken)] border border-[var(--c-border)]">
            <div className="text-xs text-[var(--c-muted)] font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[var(--c-accent)]" />
              Tono Discursivo Calibrado
            </div>
            <div className="text-sm font-bold mt-1 truncate">
              {candidateProfile.tonoNarrativo || 'Firmeza y Transparencia'}
            </div>
            <div className="text-xs text-[var(--c-muted)] truncate">
              Estilo: {candidateProfile.estiloComunicacion || 'Asertivo y directo'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--c-sunken)] border border-[var(--c-border)]">
            <div className="text-xs text-[var(--c-muted)] font-bold flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-[var(--c-accent)]" />
              Colorimetría &amp; Fototipo
            </div>
            <div className="text-sm font-bold mt-1 truncate">
              {candidateProfile.colorimetryData?.estacionCromatica || 'Contraste Alto'}
            </div>
            <div className="text-xs text-[var(--c-muted)] truncate">
              Piel: {candidateProfile.colorimetryData?.fototipoPiel || 'Fototipo III'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--c-sunken)] border border-[var(--c-border)]">
            <div className="text-xs text-[var(--c-muted)] font-bold flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[var(--c-accent)]" />
              Eje Temático Prioritario
            </div>
            <div className="text-sm font-bold mt-1 truncate">
              {candidateProfile.ejeTematicoComodo || 'Seguridad y Empleo'}
            </div>
            <div className="text-xs text-[var(--c-muted)] truncate">
              Alcance: Departamental &amp; Nacional
            </div>
          </div>
        </div>

        {/* 2. CAMPAIGN LAUNCHPAD: ACCESOS DIRECTOS A MÓDULOS */}
        {onNavigateToView && (
          <div className="mt-6 pt-5 border-t border-[var(--c-border)]">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <span className="text-xs font-bold flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[var(--c-accent)]" />
                Launchpad Táctico de Campaña (Navegación Instantánea)
              </span>
              <span className="text-xs text-[var(--c-muted)]">
                Lanza cualquier herramienta con la identidad de {candidateProfile.nombre} ya inyectada
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
              <button
                type="button"
                onClick={() => onNavigateToView('territorial-zoom')}
                className="p-3 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] hover:border-[var(--c-accent)] text-left group"
              >
                <div className="flex items-center justify-between text-[var(--c-muted)] mb-1.5">
                  <Compass className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="text-xs font-bold">
                  Zoom Territorial GIS
                </div>
                <div className="text-xs text-[var(--c-muted)] mt-0.5">
                  5 Escalas continuas DANE
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToView('content-director')}
                className="p-3 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] hover:border-[var(--c-accent)] text-left group"
              >
                <div className="flex items-center justify-between text-[var(--c-muted)] mb-1.5">
                  <Megaphone className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="text-xs font-bold">
                  Director de Contenido
                </div>
                <div className="text-xs text-[var(--c-muted)] mt-0.5">
                  Briefs y discursos con IA
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToView('voter-segmentation')}
                className="p-3 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] hover:border-[var(--c-accent)] text-left group"
              >
                <div className="flex items-center justify-between text-[var(--c-muted)] mb-1.5">
                  <Users className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="text-xs font-bold">
                  Segmentación 4D
                </div>
                <div className="text-xs text-[var(--c-muted)] mt-0.5">
                  54 cohortes y arquetipos
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToView('national-tools')}
                className="p-3 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] hover:border-[var(--c-accent)] text-left group"
              >
                <div className="flex items-center justify-between text-[var(--c-muted)] mb-1.5">
                  <Target className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="text-xs font-bold">
                  Simulador D'Hondt
                </div>
                <div className="text-xs text-[var(--c-muted)] mt-0.5">
                  Curul marginal y umbral (Art. 263)
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToView('antioquia-gobernacion')}
                className="p-3 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] hover:border-[var(--c-accent)] text-left group"
              >
                <div className="flex items-center justify-between text-[var(--c-muted)] mb-1.5">
                  <Building2 className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="text-xs font-bold">
                  Sala Gobernación
                </div>
                <div className="text-xs text-[var(--c-muted)] mt-0.5">
                  28 actores y 7 ejes
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToView('political-houses-graph')}
                className="p-3 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] hover:border-[var(--c-accent)] text-left group"
              >
                <div className="flex items-center justify-between text-[var(--c-muted)] mb-1.5">
                  <Network className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="text-xs font-bold">
                  Casas Políticas
                </div>
                <div className="text-xs text-[var(--c-muted)] mt-0.5">
                  Grafos de Poder 2D/3D
                </div>
              </button>

              <button
                type="button"
                onClick={() => onNavigateToView('targeted-advertising')}
                className="p-3 rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] hover:border-[var(--c-accent)] text-left group"
              >
                <div className="flex items-center justify-between text-[var(--c-muted)] mb-1.5">
                  <Target className="w-4 h-4" />
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                </div>
                <div className="text-xs font-bold">
                  Publicidad Segmentada
                </div>
                <div className="text-xs text-[var(--c-muted)] mt-0.5">
                  Creatividades y Pauta IA
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. GESTOR INTEGRAL DE PERFILES Y PERSONALIZACIÓN */}
      <CandidateProfileManager
        currentEmail={driveAccount.isConnected ? driveAccount.email : null}
        onConnectGoogleDrive={(email) => {
          googleDriveService.connectAccount(email);
          setDriveAccount(googleDriveService.getAccount());
        }}
        onDisconnectGoogleDrive={() => {
          googleDriveService.disconnectAccount();
          setDriveAccount(googleDriveService.getAccount());
        }}
        activeProfile={candidateProfile}
        onSaveActiveProfile={onSaveProfile}
        allSavedProfiles={{ [candidateProfile.id || candidateProfile.email || candidateProfile.nombre]: candidateProfile }}
        onSelectSavedProfile={onSaveProfile}
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

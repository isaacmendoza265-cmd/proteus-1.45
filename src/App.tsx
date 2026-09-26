/**
 * PROTEUS 1.2 & COMMAND CENTER ANTIOQUIA
 * Modular Architecture Root
 */

import React, { useState, lazy, Suspense } from 'react';
import { AppShell } from './components/layout/AppShell';
import type { NavViewId } from './components/layout/navigation';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

const InicioView = lazy(() => import('./modules/inicio/InicioView').then((m) => ({ default: m.InicioView })));

// National Views
const NationalDashboardView = lazy(() => import('./modules/national/NationalDashboardView').then((m) => ({ default: m.NationalDashboardView })));
import { CandidateProfilesView } from './modules/national/CandidateProfilesView';
const CampaignToolsView = lazy(() => import('./modules/national/CampaignToolsView').then((m) => ({ default: m.CampaignToolsView })));

// Multi-Scale Territorial Zoom (GIS Continuo 5 Escalas)
const TerritorialZoomHubView = lazy(() => import('./modules/territorial/TerritorialZoomHubView').then((m) => ({ default: m.TerritorialZoomHubView })));

// Triple Purpose & Intelligence Modules
const MunicipalRepositoryExplorerView = lazy(() => import('./modules/repository/MunicipalRepositoryExplorerView').then((m) => ({ default: m.MunicipalRepositoryExplorerView })));
const VoterSegmentationEngine = lazy(() => import('./modules/analytics/VoterSegmentationEngine').then((m) => ({ default: m.VoterSegmentationEngine })));
const CampaignContentDirectorView = lazy(() => import('./modules/content/CampaignContentDirectorView').then((m) => ({ default: m.CampaignContentDirectorView })));
const TargetedAdvertisingOptimizerView = lazy(() => import('./modules/advertising/TargetedAdvertisingOptimizerView').then((m) => ({ default: m.TargetedAdvertisingOptimizerView })));
const CandidateMultimediaStudioView = lazy(() => import('./modules/multimedia/CandidateMultimediaStudioView').then((m) => ({ default: m.CandidateMultimediaStudioView })));
const AgentTeamConsoleView = lazy(() => import('./modules/agents/AgentTeamConsoleView').then((m) => ({ default: m.AgentTeamConsoleView })));

// Antioquia Views (Special 3-Tier Hierarchy)
const GobernacionExecutiveView = lazy(() => import('./modules/antioquia/departamental/GobernacionExecutiveView').then((m) => ({ default: m.GobernacionExecutiveView })));
const SubregionesView = lazy(() => import('./modules/antioquia/subregiones/SubregionesView').then((m) => ({ default: m.SubregionesView })));
const AntioquiaExplorerView = lazy(() => import('./modules/antioquia/municipios/AntioquiaExplorerView').then((m) => ({ default: m.AntioquiaExplorerView })));
const PoliticalHousesGraphView = lazy(() => import('./modules/observatorio/PoliticalHousesGraphView').then((m) => ({ default: m.PoliticalHousesGraphView })));
const ElectoralForensicsAuditView = lazy(() => import('./modules/audit/ElectoralForensicsAuditView').then((m) => ({ default: m.ElectoralForensicsAuditView })));

// System & Agent Views
const AntigravityAgentConsole = lazy(() => import('./components/AntigravityAgentConsole').then((m) => ({ default: m.AntigravityAgentConsole })));
const BrandIdentityView = lazy(() => import('./modules/system/BrandIdentityView').then((m) => ({ default: m.BrandIdentityView })));

// Candidate Profile Types & Defaults
import { 
  CandidateProfile, 
  DEFAULT_ISAAC_MENDOZA_PROFILE 
} from './components/CandidateProfileManager';
import { CandidateProfileModal } from './components/CandidateProfileModal';

// Google Drive Service
import { googleDriveService } from './services/googleDriveService';

const STORAGE_PROFILE_KEY = "cmt_proteus_active_profile";

export default function App() {
  const [currentView, setCurrentView] = useState<NavViewId>('inicio');
  const [candidateModalOpen, setCandidateModalOpen] = useState(false);
  
  // Manage candidate profile state
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PROFILE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("No se pudo cargar el perfil desde localStorage:", e);
    }
    return DEFAULT_ISAAC_MENDOZA_PROFILE;
  });

  const handleSaveProfile = (newProfile: CandidateProfile) => {
    setCandidateProfile(newProfile);
    try {
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(newProfile));
    } catch (e) {
      console.warn("No se pudo guardar el perfil en localStorage:", e);
    }
  };

  const handleSaveToDrive = (title: string, data: any) => {
    let category: any = 'analisis_territorial';
    if (title.toLowerCase().includes('brief')) category = 'brief_contenido';
    else if (title.toLowerCase().includes('segmento')) category = 'segmentacion_votantes';
    else if (title.toLowerCase().includes('video') || title.toLowerCase().includes('color')) category = 'multimedia';

    googleDriveService.saveItem({
      name: title,
      category,
      format: 'json',
      data,
      candidateName: candidateProfile.nombre
    });
  };

  return (
    <AppShell 
      currentView={currentView} 
      onSelectView={setCurrentView}
      candidateName={candidateProfile.nombre}
      onOpenCandidateModal={() => setCandidateModalOpen(true)}
    >
      {/* Cada módulo se descarga solo cuando se abre (carga diferida) */}
      <ErrorBoundary resetKey={currentView}>
      <Suspense fallback={<ViewLoading />}>
      {currentView === 'inicio' && <InicioView onNavigate={setCurrentView} />}

      {/* 1. ÁMBITO NACIONAL */}
      {currentView === 'national-overview' && (
        <NationalDashboardView />
      )}

      {currentView === 'national-candidates' && (
        <CandidateProfilesView
          candidateProfile={candidateProfile}
          onSaveProfile={handleSaveProfile}
          onNavigateToView={(view) => setCurrentView(view)}
        />
      )}

      {currentView === 'national-tools' && (
        <CampaignToolsView />
      )}

      {/* 1.5. ARQUITECTURA DE ZOOM MULTI-ESCALA (GIS CONTINUO) */}
      {currentView === 'territorial-zoom' && (
        <TerritorialZoomHubView 
          onNavigateToContentDirector={() => setCurrentView('content-director')}
          onNavigateToVoterSegmentation={() => setCurrentView('voter-segmentation')}
        />
      )}

      {/* 2. TRIPLE PROPÓSITO & ANALÍTICA INTEGRADA */}
      {currentView === 'municipal-repository' && (
        <MunicipalRepositoryExplorerView />
      )}

      {currentView === 'voter-segmentation' && (
        <VoterSegmentationEngine
          candidateProfile={candidateProfile}
          onSaveToDrive={handleSaveToDrive}
          onNavigateToZoom={() => setCurrentView('territorial-zoom')}
        />
      )}

      {currentView === 'content-director' && (
        <CampaignContentDirectorView
          candidateProfile={candidateProfile}
          onSaveToDrive={handleSaveToDrive}
          onNavigateToZoom={() => setCurrentView('territorial-zoom')}
        />
      )}

      {currentView === 'targeted-advertising' && (
        <TargetedAdvertisingOptimizerView
          candidateProfile={candidateProfile}
          onNavigateToView={(view) => setCurrentView(view as NavViewId)}
        />
      )}

      {currentView === 'multimedia-studio' && (
        <CandidateMultimediaStudioView
          candidateProfile={candidateProfile}
          onSaveProfile={handleSaveProfile}
          onSaveToDrive={handleSaveToDrive}
        />
      )}

      {currentView === 'agent-team' && (
        <AgentTeamConsoleView
          candidateProfile={candidateProfile}
        />
      )}

      {/* 3. COMMAND CENTER ANTIOQUIA (Trato Especial) */}
      {currentView === 'antioquia-gobernacion' && (
        <GobernacionExecutiveView
          candidateProfile={candidateProfile}
          onSaveProfile={handleSaveProfile}
        />
      )}

      {currentView === 'antioquia-subregiones' && (
        <SubregionesView
          candidateProfile={candidateProfile}
          onNavigateToBio={() => setCurrentView('national-candidates')}
        />
      )}

      {currentView === 'antioquia-municipios' && (
        <AntioquiaExplorerView
          candidateProfile={candidateProfile}
          onNavigateToBio={() => setCurrentView('national-candidates')}
          onNavigateToContentDirector={() => setCurrentView('content-director')}
        />
      )}

      {currentView === 'political-houses-graph' && (
        <PoliticalHousesGraphView
          candidateProfile={candidateProfile}
          onNavigateToContentDirector={() => setCurrentView('content-director')}
        />
      )}

      {currentView === 'electoral-audit-forensics' && (
        <ElectoralForensicsAuditView
          candidateProfile={candidateProfile}
          onNavigateToView={(view) => setCurrentView(view as NavViewId)}
        />
      )}

      {/* 4. SISTEMA & CONSOLAS */}
      {currentView === 'antigravity-console' && (
        <AntigravityAgentConsole />
      )}

      {currentView === 'brand-manual' && (
        <BrandIdentityView />
      )}

      {/* Global Candidate Customization Modal */}
      {candidateModalOpen && (
        <CandidateProfileModal
          isOpen={candidateModalOpen}
          candidateProfile={candidateProfile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setCandidateModalOpen(false)}
        />
      )}
      </Suspense>
      </ErrorBoundary>
    </AppShell>
  );
}

function ViewLoading() {
  return (
    <div className="flex items-center justify-center py-24 text-sm text-[var(--c-muted)]">
      Cargando módulo…
    </div>
  );
}

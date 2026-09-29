/**
 * PROTEUS 1.2 & COMMAND CENTER ANTIOQUIA
 * Modular Architecture Root
 */

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { AppShell } from './components/layout/AppShell';
import type { NavViewId } from './components/layout/navigation';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import type { SeleccionEncuestas } from './components/encuestas/VotoCorrelaciones';

const InicioView = lazy(() => import('./modules/inicio/InicioView').then((m) => ({ default: m.InicioView })));

// National Views
const NationalDashboardView = lazy(() => import('./modules/national/NationalDashboardView').then((m) => ({ default: m.NationalDashboardView })));
const IdentidadCandidatoView = lazy(() => import('./modules/identidad/IdentidadCandidatoView').then((m) => ({ default: m.IdentidadCandidatoView })));
const Encuestas2026View = lazy(() => import('./modules/electorado/Encuestas2026View').then((m) => ({ default: m.Encuestas2026View })));
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
const MarcoMetodologicoView = lazy(() => import('./modules/marco/MarcoMetodologicoView').then((m) => ({ default: m.MarcoMetodologicoView })));
const UsuariosView = lazy(() => import('./modules/system/UsuariosView').then((m) => ({ default: m.UsuariosView })));

// Candidate Profile Types & Defaults
import { 
  CandidateProfile, 
  DEFAULT_ISAAC_MENDOZA_PROFILE 
} from './components/CandidateProfileManager';

import { api, borrarLocal, leerLocal, obtenerUsuario, type UsuarioSesion } from './services/sesionCliente';
import { categoriaDeTitulo, guardarArchivo } from './services/archivosService';

// Clave con la que el perfil vivía en el navegador antes de guardarse en la base (se migra una vez)
const STORAGE_PROFILE_KEY = "cmt_proteus_active_profile";

export default function App() {
  const [currentView, setCurrentView] = useState<NavViewId>('inicio');
  // Encuestas 2026 abiertas desde el mapa, ya situadas en un territorio
  const [seleccionEncuestas, setSeleccionEncuestas] = useState<SeleccionEncuestas | null>(null);
  
  const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);
  useEffect(() => {
    obtenerUsuario().then(setUsuario).catch((e) => console.warn('No se pudo leer la sesión:', e));
  }, []);

  // Perfil del candidato: vive en la base y lo comparte todo el equipo
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(DEFAULT_ISAAC_MENDOZA_PROFILE);
  useEffect(() => {
    api<{ perfil: CandidateProfile | null }>('/api/datos/perfil')
      .then(async ({ perfil }) => {
        if (perfil) return setCandidateProfile(perfil);
        // Base vacía: se sube el perfil que este navegador tenía guardado, si lo hay
        const local = leerLocal<CandidateProfile>(STORAGE_PROFILE_KEY);
        if (local) {
          await api('/api/datos/perfil', { method: 'PUT', json: { perfil: local } });
          setCandidateProfile(local);
        }
        borrarLocal(STORAGE_PROFILE_KEY);
      })
      .catch((e) => console.warn('No se pudo cargar el perfil del candidato:', e));
  }, []);

  const handleSaveProfile = (newProfile: CandidateProfile) => {
    setCandidateProfile(newProfile);
    api('/api/datos/perfil', { method: 'PUT', json: { perfil: newProfile } })
      .catch((e) => window.alert(`No se pudo guardar el perfil: ${e.message}`));
  };

  const handleSaveToDrive = (title: string, data: any) => {
    guardarArchivo({ nombre: title, categoria: categoriaDeTitulo(title), candidato: candidateProfile.nombre, datos: data })
      .catch((e) => window.alert(`No se pudo guardar «${title}»: ${e.message}`));
  };

  return (
    <AppShell 
      currentView={currentView} 
      onSelectView={setCurrentView}
      candidateName={candidateProfile.nombre}
      onOpenCandidateModal={() => setCurrentView('national-candidates')}
      usuario={usuario}
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
        <IdentidadCandidatoView candidateProfile={candidateProfile} onSaveProfile={handleSaveProfile} />
      )}

      {currentView === 'encuestas-2026' && (
        <Encuestas2026View seleccion={seleccionEncuestas} onVolverAlMapa={() => setCurrentView('territorial-zoom')} />
      )}

      {currentView === 'national-tools' && (
        <CampaignToolsView />
      )}

      {/* 1.5. ARQUITECTURA DE ZOOM MULTI-ESCALA (GIS CONTINUO) */}
      {currentView === 'territorial-zoom' && (
        <TerritorialZoomHubView 
          onNavigateToContentDirector={() => setCurrentView('content-director')}
          onNavigateToVoterSegmentation={() => setCurrentView('voter-segmentation')}
          onAbrirEncuestas={(sel) => { setSeleccionEncuestas(sel); setCurrentView('encuestas-2026'); }}
          candidato={candidateProfile}
        />
      )}

      {/* 2. TRIPLE PROPÓSITO & ANALÍTICA INTEGRADA */}
      {currentView === 'municipal-repository' && (
        <MunicipalRepositoryExplorerView esAdmin={usuario?.rol === 'ADMIN'} />
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

      {currentView === 'marco-metodologico' && (
        <MarcoMetodologicoView />
      )}

      {currentView === 'usuarios' && <UsuariosView usuario={usuario} />}

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

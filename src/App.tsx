/**
 * PROTEUS 1.2 & COMMAND CENTER ANTIOQUIA
 * Modular Architecture Root
 */

import React, { useState, useEffect } from 'react';
import { AppShell } from './components/layout/AppShell';
import { NavViewId } from './components/layout/SidebarNav';

// National Views
import { NationalDashboardView } from './modules/national/NationalDashboardView';
import { CandidateProfilesView } from './modules/national/CandidateProfilesView';
import { CampaignToolsView } from './modules/national/CampaignToolsView';

// Multi-Scale Territorial Zoom (GIS Continuo 5 Escalas)
import { TerritorialZoomHubView } from './modules/territorial/TerritorialZoomHubView';

// Triple Purpose & Intelligence Modules
import { MunicipalRepositoryExplorerView } from './modules/repository/MunicipalRepositoryExplorerView';
import { VoterSegmentationEngine } from './modules/analytics/VoterSegmentationEngine';
import { CampaignContentDirectorView } from './modules/content/CampaignContentDirectorView';
import { CandidateMultimediaStudioView } from './modules/multimedia/CandidateMultimediaStudioView';
import { AgentTeamConsoleView } from './modules/agents/AgentTeamConsoleView';

// Antioquia Views (Special 3-Tier Hierarchy)
import { GobernacionExecutiveView } from './modules/antioquia/departamental/GobernacionExecutiveView';
import { SubregionesView } from './modules/antioquia/subregiones/SubregionesView';
import { AntioquiaExplorerView } from './modules/antioquia/municipios/AntioquiaExplorerView';
import { PoliticalHousesGraphView } from './modules/observatorio/PoliticalHousesGraphView';

// System & Agent Views
import { AntigravityAgentConsole } from './components/AntigravityAgentConsole';
import { BrandIdentityView } from './modules/system/BrandIdentityView';

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
  const [currentView, setCurrentView] = useState<NavViewId>('national-candidates');
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
    </AppShell>
  );
}

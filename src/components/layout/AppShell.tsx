import React, { useState } from 'react';
import { TopStatusBar } from './TopStatusBar';
import { SidebarNav, NavViewId } from './SidebarNav';
import { GoogleDriveSyncModal } from '../drive/GoogleDriveSyncModal';

interface AppShellProps {
  currentView: NavViewId;
  onSelectView: (view: NavViewId) => void;
  candidateName?: string;
  onOpenCandidateModal?: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentView,
  onSelectView,
  candidateName,
  onOpenCandidateModal,
  children
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [driveModalOpen, setDriveModalOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#030712] text-slate-100 overflow-hidden font-sans relative">
      {/* Background Cybernetic Subtle Grid */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Ambient Bioluminescent Aurora Orbs (Calibrados con la Presentación Oficial) */}
      <div className="fixed -top-24 -left-20 w-[42rem] h-[42rem] bg-sky-500/30 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="fixed top-1/4 right-0 w-[48rem] h-[48rem] bg-indigo-600/25 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed -bottom-32 left-1/4 w-[42rem] h-[42rem] bg-emerald-500/20 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="fixed bottom-10 right-1/4 w-[38rem] h-[38rem] bg-amber-500/20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Frosted Acrylic Collapsible Sidebar */}
      <SidebarNav
        currentView={currentView}
        onSelectView={onSelectView}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onOpenDriveModal={() => setDriveModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <TopStatusBar
          onOpenDriveModal={() => setDriveModalOpen(true)}
          candidateName={candidateName}
          onOpenCandidateModal={onOpenCandidateModal}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Google Drive Integration Modal */}
      <GoogleDriveSyncModal
        isOpen={driveModalOpen}
        onClose={() => setDriveModalOpen(false)}
      />
    </div>
  );
};

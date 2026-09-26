import React, { useState } from 'react';
import { MapPin, Search, Moon, Sun, HardDrive } from 'lucide-react';
import { useActiveTerritory } from '../../services/activeTerritoryContextService';
import { googleDriveService } from '../../services/googleDriveService';

interface TopStatusBarProps {
  onOpenDriveModal?: () => void;
  onGoTerritorio?: () => void;
  onOpenSearch?: () => void;
  tema: 'claro' | 'oscuro';
  onToggleTema: () => void;
}

/** Barra superior: el territorio activo (común a todos los módulos), búsqueda global y tema */
export const TopStatusBar: React.FC<TopStatusBarProps> = ({ onOpenDriveModal, onGoTerritorio, onOpenSearch, tema, onToggleTema }) => {
  const { activeTerritory: territory } = useActiveTerritory();
  const [drive] = useState(() => googleDriveService.getAccount());
  return (
    <header className="proteus-civico h-16 shrink-0 px-6 md:px-8 flex items-center gap-3 border-b border-[var(--c-border)] bg-[var(--c-surface)] z-30">
      <span className="hidden md:inline text-xs font-semibold text-[var(--c-muted)]">Territorio activo</span>
      <button onClick={onGoTerritorio} className="flex items-center gap-2 min-h-9 px-3 rounded-lg border border-[var(--c-border)] bg-[var(--c-bg)] text-sm font-semibold max-w-[320px]" title="Cambiar el territorio activo en el mapa">
        <MapPin className="w-4 h-4 shrink-0" strokeWidth={1.7} />
        <span className="truncate">{territory.fullName || territory.name}</span>
      </button>
      <span className="hidden xl:inline text-xs text-[var(--c-muted)]">Todos los módulos trabajan sobre este territorio.</span>
      <span className="grow" />
      <button onClick={onOpenSearch} className="hidden sm:flex items-center gap-2 min-h-10 w-72 px-3 rounded-lg border border-[var(--c-border)] bg-[var(--c-bg)] text-sm text-[var(--c-muted)]" aria-label="Buscar (Ctrl K)">
        <Search className="w-4 h-4" strokeWidth={1.7} />
        <span className="grow text-left">Buscar módulo o vista</span>
        <kbd className="font-mono text-xs px-1.5 py-0.5 border border-[var(--c-border)] rounded">Ctrl K</kbd>
      </button>
      {onOpenDriveModal && (
        <button onClick={onOpenDriveModal} className="w-10 h-10 rounded-lg border border-[var(--c-border)] bg-[var(--c-bg)] flex items-center justify-center" aria-label={drive.isConnected ? 'Google Drive conectado' : 'Conectar Google Drive'} title={drive.isConnected ? 'Google Drive conectado' : 'Google Drive: sin conectar'}>
          <HardDrive className={`w-4 h-4 ${drive.isConnected ? 'text-[var(--c-ok)]' : ''}`} strokeWidth={1.7} />
        </button>
      )}
      <button onClick={onToggleTema} className="w-10 h-10 rounded-lg border border-[var(--c-border)] bg-[var(--c-bg)] flex items-center justify-center" aria-label={tema === 'claro' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'}>
        {tema === 'claro' ? <Moon className="w-4 h-4" strokeWidth={1.7} /> : <Sun className="w-4 h-4" strokeWidth={1.7} />}
      </button>
    </header>
  );
};

import React from 'react';
import { MapPin, Search, Moon, Sun, FolderOpen, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useActiveTerritory } from '../../services/activeTerritoryContextService';

interface TopStatusBarProps {
  onOpenArchivos?: () => void;
  onGoTerritorio?: () => void;
  onOpenSearch?: () => void;
  tema: 'claro' | 'oscuro';
  onToggleTema: () => void;
  /** Mostrar u ocultar el menú lateral (solo en pantallas grandes; en teléfono está la barra inferior) */
  menuOculto?: boolean;
  onToggleMenu?: () => void;
}

/** Barra superior: el territorio activo (común a todos los módulos), búsqueda global y tema */
export const TopStatusBar: React.FC<TopStatusBarProps> = ({ onOpenArchivos, onGoTerritorio, onOpenSearch, tema, onToggleTema, menuOculto, onToggleMenu }) => {
  const { activeTerritory: territory } = useActiveTerritory();
  return (
    <header className="proteus-civico h-16 shrink-0 px-4 md:px-8 flex items-center gap-3 border-b border-[var(--c-border)] bg-[var(--c-surface)] z-30">
      {onToggleMenu && (
        <button onClick={onToggleMenu} className="hidden lg:flex w-10 h-10 -ml-2 rounded-lg items-center justify-center text-[var(--c-muted)] hover:text-[var(--c-ink)] hover:bg-[var(--c-bg)]"
          aria-label={menuOculto ? 'Mostrar el menú' : 'Ocultar el menú'} title={`${menuOculto ? 'Mostrar' : 'Ocultar'} el menú (Ctrl B)`}>
          {menuOculto ? <PanelLeftOpen className="w-5 h-5" strokeWidth={1.7} /> : <PanelLeftClose className="w-5 h-5" strokeWidth={1.7} />}
        </button>
      )}
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
      {onOpenArchivos && (
        <button onClick={onOpenArchivos} className="w-10 h-10 rounded-lg border border-[var(--c-border)] bg-[var(--c-bg)] flex items-center justify-center" aria-label="Archivos guardados" title="Archivos guardados">
          <FolderOpen className="w-4 h-4" strokeWidth={1.7} />
        </button>
      )}
      <button onClick={onToggleTema} className="w-10 h-10 rounded-lg border border-[var(--c-border)] bg-[var(--c-bg)] flex items-center justify-center" aria-label={tema === 'claro' ? 'Cambiar a tema oscuro' : 'Cambiar a tema claro'}>
        {tema === 'claro' ? <Moon className="w-4 h-4" strokeWidth={1.7} /> : <Sun className="w-4 h-4" strokeWidth={1.7} />}
      </button>
    </header>
  );
};

import React from 'react';
import { ChevronLeft, ChevronRight, LogOut, PanelLeftClose } from 'lucide-react';
import { cerrarSesion, type UsuarioSesion } from '../../services/sesionCliente';
import { MODULES, moduloDeVista, type NavViewId } from './navigation';

export type { NavViewId } from './navigation';

interface SidebarNavProps {
  currentView: NavViewId;
  onSelectView: (view: NavViewId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  /** Oculta el menú del todo (se vuelve a mostrar desde la barra superior o con Ctrl B) */
  onHide?: () => void;
  candidateName?: string;
  onOpenCandidateModal?: () => void;
  usuario?: UsuarioSesion | null;
}

const iniciales = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');

export const SidebarNav: React.FC<SidebarNavProps> = ({ currentView, onSelectView, collapsed, onToggleCollapse, onHide, candidateName = 'Isaac Mendoza', onOpenCandidateModal, usuario }) => {
  const actual = moduloDeVista(currentView).id;
  const principales = MODULES.filter((m) => m.id !== 'ajustes');
  const ajustes = MODULES.find((m) => m.id === 'ajustes')!;

  const Item: React.FC<{ m: (typeof MODULES)[number] }> = ({ m }) => {
    const on = actual === m.id;
    const Icon = m.icon;
    return (
      <button
        onClick={() => onSelectView(m.vistas[0].id)}
        aria-current={on ? 'page' : undefined}
        title={collapsed ? m.label : undefined}
        className={`w-full flex items-center gap-3 min-h-11 px-3 rounded-lg text-left text-sm transition-colors ${
          on ? 'bg-[var(--c-surface)] text-[var(--c-accent-text)] font-bold shadow-[0_1px_2px_rgba(0,0,0,0.06)]' : 'text-[var(--c-ink)] font-medium hover:bg-[var(--c-surface)]/60'
        }`}
      >
        <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.7} />
        {!collapsed && <span className="grow">{m.label}</span>}
      </button>
    );
  };

  return (
    <aside className={`proteus-civico shrink-0 hidden lg:flex flex-col gap-1 border-r border-[var(--c-border)] bg-[var(--c-side)] transition-[width] duration-200 ${collapsed ? 'w-16 px-2' : 'w-60 px-3.5'} py-4`} aria-label="Módulos">
      <div className={`flex items-center gap-2.5 pb-5 ${collapsed ? 'justify-center' : 'px-2'}`}>
        <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true" className="shrink-0">
          <rect width="30" height="30" rx="7" fill="#85172C" />
          <path d="M10 22V8h6.2a4.3 4.3 0 0 1 0 8.6H10" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {!collapsed && (
          <div className="flex flex-col leading-tight">
            <span className="font-titulo text-xl font-semibold tracking-tight">Proteus</span>
            <span className="text-xs text-[var(--c-muted)]">Centro de estrategia</span>
          </div>
        )}
      </div>
      <nav className="flex flex-col gap-1">
        {principales.map((m) => <Item key={m.id} m={m} />)}
      </nav>
      <div className="grow" />
      <Item m={ajustes} />
      <button onClick={onToggleCollapse} className="flex items-center gap-3 min-h-10 px-3 rounded-lg text-sm text-[var(--c-muted)] hover:text-[var(--c-ink)]" aria-label={collapsed ? 'Expandir menú' : 'Contraer menú'}>
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        {!collapsed && <span>Contraer</span>}
      </button>
      {onHide && (
        <button onClick={onHide} className="flex items-center gap-3 min-h-10 px-3 rounded-lg text-sm text-[var(--c-muted)] hover:text-[var(--c-ink)]" aria-label="Ocultar el menú" title="Ocultar el menú (Ctrl B)">
          <PanelLeftClose className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Ocultar menú</span>}
        </button>
      )}
      <button onClick={cerrarSesion} className="flex items-center gap-3 min-h-10 px-3 rounded-lg text-sm text-[var(--c-muted)] hover:text-[var(--c-ink)] text-left" title={usuario ? `Sesión de ${usuario.email}` : undefined} aria-label="Cerrar sesión">
        <LogOut className="w-4 h-4 shrink-0" />
        {!collapsed && <span className="min-w-0 truncate">Cerrar sesión{usuario ? ` · ${usuario.nombre}` : ''}</span>}
      </button>
      <button onClick={onOpenCandidateModal} className={`flex items-center gap-2.5 pt-3 mt-1 border-t border-[var(--c-border)] text-left ${collapsed ? 'justify-center' : 'px-2'}`} title="Identidad del candidato">
        <span className="w-8 h-8 shrink-0 rounded-full bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] flex items-center justify-center text-xs font-bold">{iniciales(candidateName)}</span>
        {!collapsed && (
          <span className="flex flex-col min-w-0">
            <span className="text-sm font-semibold truncate">{candidateName}</span>
            <span className="text-xs text-[var(--c-muted)]">Candidato</span>
          </span>
        )}
      </button>
    </aside>
  );
};

/**
 * En teléfono y tableta (< 1024 px) el menú lateral se oculta y los módulos pasan a una barra inferior, al alcance del
 * pulgar. Con el menú lateral, un teléfono de 390 px dejaba 150 px para el contenido (auditoría 29-sep-2026).
 */
export const BarraModulos: React.FC<{ currentView: NavViewId; onSelectView: (view: NavViewId) => void }> = ({ currentView, onSelectView }) => {
  const actual = moduloDeVista(currentView).id;
  return (
    <nav aria-label="Módulos" className="proteus-civico lg:hidden fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-[var(--c-border)] bg-[var(--c-surface)] px-0.5 pt-1 pb-[calc(0.25rem+env(safe-area-inset-bottom,0px))]">
      {MODULES.map((m) => {
        const on = actual === m.id;
        const Icon = m.icon;
        return (
          <button key={m.id} onClick={() => onSelectView(m.vistas[0].id)} aria-current={on ? 'page' : undefined}
            className={`min-h-14 flex flex-col items-center justify-center gap-1 rounded-lg text-xs font-semibold tracking-tight ${on ? 'text-[var(--c-accent-text)] bg-[var(--c-accent-soft)]' : 'text-[var(--c-muted)]'}`}>
            <Icon className="w-5 h-5" strokeWidth={1.7} aria-hidden="true" />
            <span className="max-w-full truncate">{m.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

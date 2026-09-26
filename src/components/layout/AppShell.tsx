import React, { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { TopStatusBar } from './TopStatusBar';
import { SidebarNav } from './SidebarNav';
import { MODULES, moduloDeVista, type NavViewId } from './navigation';
import { GoogleDriveSyncModal } from '../drive/GoogleDriveSyncModal';

interface AppShellProps {
  currentView: NavViewId;
  onSelectView: (view: NavViewId) => void;
  candidateName?: string;
  onOpenCandidateModal?: () => void;
  children: React.ReactNode;
}

type Tema = 'claro' | 'oscuro';
const CLAVE_TEMA = 'proteus_tema';

function leerTema(): Tema {
  try {
    const t = localStorage.getItem(CLAVE_TEMA);
    if (t === 'claro' || t === 'oscuro') return t;
  } catch { /* sin almacenamiento */ }
  return 'claro';
}

/**
 * Estructura común: menú de 5 módulos + Ajustes, barra con el territorio activo y, dentro de cada
 * módulo, pestañas para sus vistas. Estilo "sobrio cívico" (claro u oscuro).
 */
export const AppShell: React.FC<AppShellProps> = ({ currentView, onSelectView, candidateName, onOpenCandidateModal, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [driveModalOpen, setDriveModalOpen] = useState(false);
  const [tema, setTema] = useState<Tema>(leerTema);
  const [buscador, setBuscador] = useState(false);
  const [q, setQ] = useState('');

  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    try { localStorage.setItem(CLAVE_TEMA, tema); } catch { /* sin almacenamiento */ }
  }, [tema]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setBuscador(true);
      } else if (e.key === 'Escape') setBuscador(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const modulo = moduloDeVista(currentView);
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const resultados = useMemo(() => {
    const todas = MODULES.flatMap((m) => m.vistas.map((v) => ({ id: v.id, label: v.label, modulo: m.label })));
    const k = norm(q.trim());
    return (k ? todas.filter((r) => norm(`${r.label} ${r.modulo}`).includes(k)) : todas).slice(0, 10);
  }, [q]);

  const ir = (v: NavViewId) => {
    onSelectView(v);
    setBuscador(false);
    setQ('');
  };

  return (
    <div className="proteus-app flex h-screen overflow-hidden bg-[var(--c-bg)] text-[var(--c-ink)]">
      <SidebarNav
        currentView={currentView}
        onSelectView={onSelectView}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        candidateName={candidateName}
        onOpenCandidateModal={onOpenCandidateModal}
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopStatusBar
          onOpenDriveModal={() => setDriveModalOpen(true)}
          onGoTerritorio={() => onSelectView('territorial-zoom')}
          onOpenSearch={() => setBuscador(true)}
          tema={tema}
          onToggleTema={() => setTema(tema === 'claro' ? 'oscuro' : 'claro')}
        />
        <main className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
          <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-5">
            {modulo.id !== 'inicio' && (
              <div className="proteus-civico flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <h1 className="font-titulo m-0 text-[34px] leading-tight font-medium tracking-tight">{modulo.label}</h1>
                  <p className="m-0 text-[15px] text-[var(--c-muted)]">{modulo.descripcion}</p>
                </div>
                {modulo.vistas.length > 1 && (
                  <div role="tablist" aria-label={`Vistas de ${modulo.label}`} className="flex gap-1 border-b border-[var(--c-border)] overflow-x-auto">
                    {modulo.vistas.map((v) => {
                      const on = v.id === currentView;
                      return (
                        <button key={v.id} role="tab" aria-selected={on} onClick={() => onSelectView(v.id)}
                          className={`min-h-11 px-3 -mb-px whitespace-nowrap text-sm font-semibold border-b-2 ${on ? 'border-[var(--c-accent)] text-[var(--c-ink)]' : 'border-transparent text-[var(--c-muted)] hover:text-[var(--c-ink)]'}`}>
                          {v.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            <div className="proteus-contenido">{children}</div>
          </div>
        </main>
      </div>

      {buscador && (
        <div className="proteus-civico fixed inset-0 z-[100] flex items-start justify-center pt-28 bg-[var(--c-scrim)]" onClick={() => setBuscador(false)}>
          <div role="dialog" aria-label="Buscar" className="w-[560px] max-w-[92vw] rounded-2xl bg-[var(--c-surface)] border border-[var(--c-border)] shadow-[0_24px_60px_rgba(0,0,0,0.25)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2.5 px-4 border-b border-[var(--c-border)]">
              <Search className="w-4 h-4 text-[var(--c-muted)]" strokeWidth={1.7} />
              <label htmlFor="buscador-global" className="sr-only">Buscar módulo o vista</label>
              <input id="buscador-global" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar módulo o vista"
                onKeyDown={(e) => { if (e.key === 'Enter' && resultados[0]) ir(resultados[0].id); }}
                className="grow min-h-14 !border-0 !bg-transparent !shadow-none text-base outline-none" />
            </div>
            <ul className="m-0 p-1.5 list-none max-h-[360px] overflow-y-auto">
              {resultados.map((r) => (
                <li key={r.id}>
                  <button onClick={() => ir(r.id)} className="w-full flex items-center gap-3 min-h-11 px-3 rounded-lg text-left hover:bg-[var(--c-sunken)]">
                    <span className="text-xs font-bold uppercase tracking-wide text-[var(--c-accent-text)] w-24 shrink-0">{r.modulo}</span>
                    <span className="grow text-sm font-semibold">{r.label}</span>
                  </button>
                </li>
              ))}
              {!resultados.length && <li className="px-3 py-4 text-sm text-[var(--c-muted)]">Nada coincide con «{q}».</li>}
            </ul>
          </div>
        </div>
      )}

      <GoogleDriveSyncModal isOpen={driveModalOpen} onClose={() => setDriveModalOpen(false)} />
    </div>
  );
};

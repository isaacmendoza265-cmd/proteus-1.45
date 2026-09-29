import React, { useEffect, useState } from 'react';
import { Download, FileText, FolderOpen, Trash2, X } from 'lucide-react';
import { borrarArchivo, listarArchivos, urlDescarga, type ArchivoGuardado } from '../../services/archivosService';

const CATEGORIAS: Record<string, string> = {
  analisis_territorial: 'Análisis territorial',
  brief_contenido: 'Brief de contenido',
  segmentacion_votantes: 'Segmentación',
  multimedia: 'Multimedia',
  candidato: 'Candidato',
};

/** Briefs, análisis y reportes guardados con "Guardar" en los módulos. Viven en la base de Proteus y los ve todo el equipo. */
export const ArchivosModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [archivos, setArchivos] = useState<ArchivoGuardado[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setArchivos(null);
    setError(null);
    listarArchivos().then(setArchivos).catch((e) => setError(e.message));
  }, [isOpen]);

  if (!isOpen) return null;

  const borrar = async (a: ArchivoGuardado) => {
    if (!window.confirm(`¿Borrar «${a.nombre}»? No se puede deshacer.`)) return;
    try {
      await borrarArchivo(a.id);
      setArchivos((l) => l?.filter((x) => x.id !== a.id) ?? null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="proteus-civico fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-[var(--c-scrim)]" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="archivos-titulo" onClick={(e) => e.stopPropagation()}
        className="w-[640px] max-w-full max-h-[75vh] flex flex-col rounded-2xl bg-[var(--c-surface)] border border-[var(--c-border)] shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--c-border)]">
          <FolderOpen className="w-5 h-5 text-[var(--c-accent-text)]" strokeWidth={1.7} />
          <div className="grow">
            <h2 id="archivos-titulo" className="m-0 font-titulo text-2xl font-medium">Archivos guardados</h2>
            <p className="m-0 text-sm text-[var(--c-muted)]">Guardados en Proteus con el botón «Guardar» de cada módulo. Los ve todo el equipo.</p>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[var(--c-sunken)]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-3">
          {error && <p role="alert" className="m-2 text-sm text-[var(--c-accent-text)]">{error}</p>}
          {!archivos && !error && <p className="m-2 text-sm text-[var(--c-muted)]">Cargando…</p>}
          {archivos?.length === 0 && (
            <p className="m-2 text-sm text-[var(--c-muted)]">Aún no hay archivos. Usa «Guardar» en Segmentos, Redactar o Multimedia.</p>
          )}
          <ul className="m-0 p-0 list-none flex flex-col gap-1">
            {archivos?.map((a) => (
              <li key={a.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--c-sunken)]">
                <FileText className="w-4 h-4 shrink-0 text-[var(--c-muted)]" strokeWidth={1.7} />
                <div className="grow min-w-0">
                  <div className="text-sm font-semibold truncate">{a.nombre}</div>
                  <div className="text-xs text-[var(--c-muted)] truncate">
                    {CATEGORIAS[a.categoria] ?? a.categoria} · {a.candidato} · {(a.bytes / 1024).toFixed(1)} KB ·{' '}
                    {new Date(a.creadoEn).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' })}
                    {a.creadoPor ? ` · ${a.creadoPor}` : ''}
                  </div>
                </div>
                <a href={urlDescarga(a.id)} download aria-label={`Descargar ${a.nombre}`} title="Descargar"
                  className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center hover:bg-[var(--c-bg)]">
                  <Download className="w-4 h-4" strokeWidth={1.7} />
                </a>
                <button onClick={() => borrar(a)} aria-label={`Borrar ${a.nombre}`} title="Borrar"
                  className="w-10 h-10 shrink-0 rounded-lg flex items-center justify-center hover:bg-[var(--c-bg)] text-[var(--c-muted)] hover:text-[var(--c-accent-text)]">
                  <Trash2 className="w-4 h-4" strokeWidth={1.7} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/**
 * Envoltorio React del Web Component <voto-correlaciones> (módulo de encuestas CNE 2026).
 * - Carga el script una sola vez desde public/modulos/voto-correlaciones/.
 * - Traduce la estética de Proteus (tokens --c-*, claro/oscuro con html[data-tema]) a las variables --vc-*.
 * - Permite abrir el módulo ya situado en un territorio (Evolución territorial de un municipio o de Antioquia).
 * No modifica el módulo: usa su API pública (seleccionar) y, para el territorio, su método set(), que es el mismo
 * que usan sus propios selectores.
 */
import React, { useEffect, useRef, useState } from 'react';
import { URL_AGREGADOS, URL_MODULO_ENCUESTAS } from '../../services/encuestasService';

export type VistaEncuestas = 'explorar' | 'comparar' | 'evolucion' | 'cruce' | 'catalogo';

export interface SeleccionEncuestas {
  vista?: VistaEncuestas;
  pregunta?: 'voto_1v' | 'voto_2v' | 'voto_senado' | 'aprobacion' | 'evaluacion';
  /** Territorio para Evolución territorial */
  nivel?: 'departamento' | 'municipio';
  /** Nombre como lo trae el módulo: "Antioquia" o "Medellín (Antioquia)" */
  territorio?: string;
  /** Fuente de la línea de tiempo: encuestas sueltas o acumulados */
  fuente?: 'individuales' | 'mensual' | 'fase';
}

export interface CambioEncuestas {
  vista?: string;
  nivel?: string;
  territorio?: string | null;
  codigo?: string | null;
  encuesta?: string;
  pregunta?: string;
}

interface ElementoVC extends HTMLElement {
  seleccionar?: (s: Record<string, unknown>) => void;
  set?: (k: string, v: unknown) => void;
  state?: Record<string, unknown>;
  data?: unknown;
}

let scriptCargado: Promise<void> | null = null;
function cargarScript(): Promise<void> {
  if (customElements.get('voto-correlaciones')) return Promise.resolve();
  if (!scriptCargado) {
    scriptCargado = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = `${URL_MODULO_ENCUESTAS}voto-correlaciones.js`;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => { scriptCargado = null; reject(new Error('No se pudo cargar el módulo de encuestas')); };
      document.head.appendChild(s);
    });
  }
  return scriptCargado;
}

const temaActual = () => (document.documentElement.dataset.tema === 'oscuro' ? 'dark' : 'light');

/** Estilo del anfitrión: la paleta neutra del módulo toma los tokens de Proteus */
const ESTILO: React.CSSProperties & Record<string, string> = {
  display: 'block',
  fontFamily: "'Public Sans', system-ui, sans-serif",
  '--vc-plane': 'transparent',
  '--vc-surface': 'var(--c-surface)',
  '--vc-ink': 'var(--c-ink)',
  '--vc-ink-2': 'var(--c-muted)',
  '--vc-muted': 'var(--c-muted)',
  '--vc-border': 'var(--c-border)',
  '--vc-grid': 'var(--c-border)',
  '--vc-accent': 'var(--c-accent)',
};

interface Props {
  seleccion?: SeleccionEncuestas;
  vistas?: VistaEncuestas[];
  sinEncabezado?: boolean;
  onCambio?: (c: CambioEncuestas) => void;
  onListo?: () => void;
}

export const VotoCorrelaciones: React.FC<Props> = ({ seleccion, vistas, sinEncabezado, onCambio, onListo }) => {
  const ref = useRef<ElementoVC>(null);
  const [error, setError] = useState<string | null>(null);
  const [listo, setListo] = useState(false);
  const [tema, setTema] = useState(temaActual);

  useEffect(() => { cargarScript().catch((e) => setError(e.message)); }, []);

  // Seguir el tema claro/oscuro de Proteus
  useEffect(() => {
    const obs = new MutationObserver(() => setTema(temaActual()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-tema'] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const alListo = () => { setListo(true); onListo?.(); };
    const alError = (e: Event) => setError((e as CustomEvent<{ mensaje: string }>).detail?.mensaje ?? 'Error del módulo de encuestas');
    const alCambio = (e: Event) => onCambio?.((e as CustomEvent<CambioEncuestas>).detail);
    el.addEventListener('vc-ready', alListo);
    el.addEventListener('vc-error', alError);
    el.addEventListener('vc-change', alCambio);
    return () => { el.removeEventListener('vc-ready', alListo); el.removeEventListener('vc-error', alError); el.removeEventListener('vc-change', alCambio); };
  }, [onCambio, onListo]);

  // Aplicar la selección pedida por Proteus (al cargar y cada vez que cambie)
  const clave = JSON.stringify(seleccion ?? {});
  useEffect(() => {
    const el = ref.current;
    if (!el || !listo || !seleccion) return;
    if (seleccion.vista) el.seleccionar?.({ vista: seleccion.vista });
    if (seleccion.vista === 'evolucion' && el.set && el.state) {
      if (seleccion.fuente) el.set('evFuente', seleccion.fuente);
      if (seleccion.pregunta) el.set('evPregunta', seleccion.pregunta);
      if (seleccion.nivel) {
        el.set('evNivel', seleccion.nivel);
        if (seleccion.territorio) el.set('evTerr', seleccion.territorio);
      }
    } else if (seleccion.pregunta) {
      el.seleccionar?.({ pregunta: seleccion.pregunta });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave, listo]);

  if (error) {
    return (
      <p className="m-0 px-3 py-2 rounded-xl bg-[var(--c-warn-soft)] text-sm text-[var(--c-warn)]">
        {error}. Revisa que exista public/modulos/voto-correlaciones/ (scripts/importar_voto_correlaciones.py).
      </p>
    );
  }

  return (
    <>
      {!listo && <p className="m-0 text-sm text-[var(--c-muted)]">Cargando encuestas…</p>}
      {React.createElement('voto-correlaciones', {
        ref,
        src: URL_AGREGADOS,
        theme: tema,
        vistas: vistas?.join(','),
        'sin-encabezado': sinEncabezado ? '' : undefined,
        style: ESTILO,
      })}
    </>
  );
};

/**
 * Análisis del territorio activo en el mapa (municipio, comuna, corregimiento, zona, barrio o vereda de los 125
 * municipios de Antioquia): contexto político, social, panorama 2027, áreas clave y tonos. Cada oración lleva su
 * verbo epistémico del Reglamento (observa/deduce/hipotetiza/apuesta/no afirma), ver `municipioNarrativeService.ts`.
 *
 * Dos capas (decisión de Isaac, 2-oct-2026):
 *  - Las cifras y lecturas se calculan siempre sin IA y se muestran para revisarlas.
 *  - "Redactar con Gemini" las convierte en un texto corrido con las tres macrofuentes (datos, perfil, marco).
 *    Si Gemini falla, queda la versión calculada.
 */
import React, { useEffect, useState } from 'react';
import { BookOpenText, Sparkles } from 'lucide-react';
import {
  analisisComoTexto,
  analizarMunicipio,
  analizarUnidad,
  esMunicipioDelAnalisis,
  type AnalisisNarrativo,
  type Oracion,
  type Verbo,
} from '../../services/municipioNarrativeService';
import { callGeminiApi, formatAiError } from '../../services/geminiService';
import type { SeleccionDossier } from '../../services/dossierTerritorialService';

interface AnalisisNarrativoMunicipioProps {
  /** Código DANE del municipio activo en el mapa (null si no hay ninguno abierto) */
  dane: string | null;
  /** Unidad dentro del municipio (id de la ficha: comuna, zona, barrio o vereda); null = todo el municipio */
  territorioId?: string | null;
  /** Unidad para las macrofuentes de la redacción con Gemini (la misma del mapa) */
  seleccion?: SeleccionDossier;
}

const ESTILO_VERBO: Record<Verbo, string> = {
  observa: 'bg-[var(--c-sunken)] text-[var(--c-muted)]',
  deduce: 'bg-[var(--c-accent-soft)] text-[var(--c-accent-text)]',
  hipotetiza: 'bg-[var(--c-warn-soft)] text-[var(--c-warn)]',
  apuesta: 'bg-[var(--c-ok-soft)] text-[var(--c-ok)]',
  'no afirma': 'bg-[var(--c-border)] text-[var(--c-muted)]',
};

const Linea: React.FC<{ s: Oracion }> = ({ s }) => (
  <p className="m-0 flex items-baseline gap-2 text-sm leading-relaxed">
    <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${ESTILO_VERBO[s.verbo]}`}>{s.verbo}</span>
    <span>{s.texto}</span>
  </p>
);

const Seccion: React.FC<{ titulo: string; oraciones: Oracion[]; abierta?: boolean }> = ({ titulo, oraciones, abierta }) => (
  <details className="group rounded-xl border border-[var(--c-border)] px-3" open={abierta}>
    <summary className="flex items-center gap-2 py-2.5 cursor-pointer list-none text-sm font-bold">
      <span className="text-[var(--c-muted)] transition-transform group-open:rotate-90" aria-hidden>▸</span>
      {titulo}
    </summary>
    <div className="pb-3 flex flex-col gap-2">
      {oraciones.map((s, i) => <Linea key={i} s={s} />)}
    </div>
  </details>
);

const INSTRUCCION = [
  'Eres el analista territorial de Proteus. Convierte el análisis calculado que sigue en un texto corrido y claro, en español de Colombia, para el equipo de campaña.',
  'Reglas: usa solo las cifras del análisis calculado y de los datos del aplicativo; no agregues cifras. Conserva el verbo epistémico de cada afirmación (observa, deduce, hipotetiza, apuesta, no afirma) en la redacción: lo que es hipótesis se dice como hipótesis, y lo que el análisis no afirma no se afirma.',
  'Recuerda que los votos se cuentan donde está el puesto, no donde vive el votante. Las recomendaciones son para el candidato del perfil, con su postura y su voz.',
  'Estructura: los mismos 5 apartados, cada uno en uno o dos párrafos. Sin Markdown de títulos: usa el número y el nombre del apartado como primera línea.',
].join('\n');

// Redacciones de esta sesión (cada una cuesta una llamada a Gemini)
const redacciones = new Map<string, string>();

export const AnalisisNarrativoMunicipio: React.FC<AnalisisNarrativoMunicipioProps> = ({ dane, territorioId = null, seleccion }) => {
  const [analisis, setAnalisis] = useState<AnalisisNarrativo | null>(null);
  const [cargando, setCargando] = useState(false);
  const [redaccion, setRedaccion] = useState<string | null>(null);
  const [redactando, setRedactando] = useState(false);
  const [errorIa, setErrorIa] = useState<string | null>(null);

  useEffect(() => {
    setAnalisis(null); setRedaccion(null); setErrorIa(null);
    if (!dane || !esMunicipioDelAnalisis(dane)) return;
    let activo = true;
    setCargando(true);
    (territorioId ? analizarUnidad(territorioId) : analizarMunicipio(dane))
      .then((a) => { if (activo) { setAnalisis(a); setRedaccion(redacciones.get(a.id) ?? null); } })
      .catch((e) => console.error('[Proteus] Análisis narrativo:', e))
      .finally(() => { if (activo) setCargando(false); });
    return () => { activo = false; };
  }, [dane, territorioId]);

  const redactar = async () => {
    if (!analisis) return;
    setRedactando(true); setErrorIa(null);
    try {
      const texto = await callGeminiApi({
        promptText: analisisComoTexto(analisis),
        systemInstruction: INSTRUCCION,
        proteus: { tarea: 'analizar', ...(seleccion ? { seleccion } : {}) },
      });
      const limpio = texto.replace(/^#+\s*/gm, '').replace(/\*\*(.+?)\*\*/g, '$1').trim();
      if (!limpio) throw new Error('Gemini no devolvió texto.');
      redacciones.set(analisis.id, limpio);
      setRedaccion(limpio);
    } catch (e) {
      setErrorIa(formatAiError(e));
    } finally {
      setRedactando(false);
    }
  };

  if (!dane) return null;
  if (!esMunicipioDelAnalisis(dane)) {
    return (
      <p className="m-0 px-3 py-2 rounded-xl bg-[var(--c-sunken)] text-xs text-[var(--c-muted)]">
        El análisis del territorio cubre los 125 municipios de Antioquia; este municipio no tiene ficha territorial.
      </p>
    );
  }

  return (
    <section className="proteus-civico p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] flex flex-col gap-3" aria-label="Análisis narrativo del territorio">
      <header className="flex items-center gap-2 flex-wrap">
        <BookOpenText className="w-5 h-5 text-[var(--c-accent)]" strokeWidth={1.7} />
        <h2 className="m-0 text-base font-bold grow">Análisis del territorio</h2>
        <span className="text-xs text-[var(--c-muted)]">{cargando ? 'Calculando…' : analisis?.nombre}</span>
      </header>
      {!analisis ? (
        <p className="m-0 text-sm text-[var(--c-muted)]">Cargando los datos de la unidad…</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={redactar} disabled={redactando}
              className="min-h-9 px-3.5 rounded-lg bg-[var(--c-accent)] text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50">
              <Sparkles className="w-3.5 h-3.5" />{redactando ? 'Redactando con Gemini…' : redaccion ? 'Redactar de nuevo' : 'Redactar con Gemini'}
            </button>
            <span className="text-xs text-[var(--c-muted)]">Convierte las cifras de abajo en texto, con los datos, el perfil del candidato y el marco. Las cifras siguen visibles para revisarlas.</span>
          </div>
          {errorIa && <p className="m-0 text-xs text-[var(--c-warn)]">No se pudo redactar: {errorIa.replace(/\.?$/, ".")} Queda el análisis calculado.</p>}
          {redaccion && (
            <div className="rounded-xl border border-[var(--c-border)] p-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded-md font-bold bg-[var(--c-warn-soft)] text-[var(--c-warn)]">Redacción de Gemini</span>
                <span className="text-[var(--c-muted)]">A partir de las cifras calculadas de abajo; si algo no coincide, prevalecen ellas.</span>
              </div>
              <div className="text-sm whitespace-pre-wrap leading-relaxed">{redaccion}</div>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2 py-0.5 rounded-md font-bold bg-[var(--c-ok-soft)] text-[var(--c-ok)]">Cifras y lecturas calculadas</span>
            <span className="text-[var(--c-muted)]">Sin IA: Registraduría y DANE, con el reglamento de interpretación.</span>
          </div>
          <Seccion titulo="1. Contexto político e historial electoral" oraciones={analisis.contextoPolitico} abierta={!redaccion} />
          <Seccion titulo="2. Contexto social y económico" oraciones={analisis.contextoSocial} />
          <Seccion titulo="3. Panorama para las elecciones territoriales de 2027" oraciones={analisis.panorama2027} abierta={!redaccion} />
          <Seccion titulo="4. Áreas clave" oraciones={analisis.areasClave} />
          <Seccion titulo="5. Tonos narrativos generales" oraciones={analisis.tonos} />
          <p className="m-0 text-[10px] text-[var(--c-muted)] leading-snug">
            Lo calculado sale de los datos que ya tiene Proteus, siguiendo el reglamento de interpretación vigente (Ajustes › Marco metodológico). Lo que no está calculado se marca "no afirma", nunca se inventa.
          </p>
        </>
      )}
    </section>
  );
};

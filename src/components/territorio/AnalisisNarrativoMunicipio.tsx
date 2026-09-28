/**
 * Análisis narrativo del municipio (o de la comuna, en Medellín) activo en el mapa: contexto
 * político e historial electoral, contexto social y económico, panorama 2027, áreas clave y tonos
 * narrativos. Cada oración lleva su verbo epistémico del Reglamento (observa/deduce/hipotetiza/
 * apuesta/no afirma) — ver `municipioNarrativeService.ts`. Va debajo del mapa: cambia con lo que el
 * usuario seleccione en él.
 */
import React, { useEffect, useState } from 'react';
import { BookOpenText } from 'lucide-react';
import {
  analizarComunaMedellin,
  analizarMunicipio,
  esMedellin,
  esMunicipioDelAnalisis,
  type AnalisisNarrativo,
  type Oracion,
  type Verbo,
} from '../../services/municipioNarrativeService';

interface AnalisisNarrativoMunicipioProps {
  /** Código DANE del municipio activo en el mapa (null si no hay ninguno abierto) */
  dane: string | null;
  /** En Medellín: id de la comuna o corregimiento abierto (null = análisis de todo el municipio) */
  comunaId?: string | null;
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

export const AnalisisNarrativoMunicipio: React.FC<AnalisisNarrativoMunicipioProps> = ({ dane, comunaId = null }) => {
  const [analisis, setAnalisis] = useState<AnalisisNarrativo | null>(null);
  const [cargando, setCargando] = useState(false);

  const claveMedellin = dane && esMedellin(dane) ? comunaId ?? '' : null;
  useEffect(() => {
    setAnalisis(null);
    if (!dane || !esMunicipioDelAnalisis(dane)) return;
    let activo = true;
    setCargando(true);
    const promesa = dane && esMedellin(dane) && comunaId ? analizarComunaMedellin(comunaId) : analizarMunicipio(dane);
    promesa
      .then((a) => { if (activo) setAnalisis(a); })
      .catch((e) => console.error('[Proteus] Análisis narrativo:', e))
      .finally(() => { if (activo) setCargando(false); });
    return () => { activo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dane, claveMedellin]);

  if (!dane) return null;

  if (!esMunicipioDelAnalisis(dane)) {
    return (
      <p className="m-0 px-3 py-2 rounded-xl bg-[var(--c-sunken)] text-xs text-[var(--c-muted)]">
        El análisis narrativo por ahora cubre el Valle de Aburrá y los 30 municipios de Antioquia con mayor censo electoral; este municipio no está en esa lista todavía.
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
        <p className="m-0 text-sm text-[var(--c-muted)]">Cargando datos del municipio…</p>
      ) : (
        <>
          <Seccion titulo="1. Contexto político e historial electoral" oraciones={analisis.contextoPolitico} abierta />
          <Seccion titulo="2. Contexto social y económico" oraciones={analisis.contextoSocial} />
          <Seccion titulo="3. Panorama para las elecciones territoriales de 2027" oraciones={analisis.panorama2027} abierta />
          <Seccion titulo="4. Áreas clave" oraciones={analisis.areasClave} />
          <Seccion titulo="5. Tonos narrativos generales" oraciones={analisis.tonos} />
          <p className="m-0 text-[10px] text-[var(--c-muted)] leading-snug">
            Análisis generado con los datos que ya tiene Proteus (Registraduría, DANE), siguiendo el reglamento de interpretación vigente (Ajustes › Marco metodológico). No usa Gemini ni encuestas: lo que no está calculado se marca "no afirma", nunca se inventa.
          </p>
        </>
      )}
    </section>
  );
};

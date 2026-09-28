/**
 * "Encuestas y urnas" debajo del mapa: lo que decían las encuestas registradas ante el CNE sobre el municipio
 * activo (o sobre Antioquia) frente a lo que salió en el escrutinio oficial. Sigue al mapa, como el resto de
 * herramientas (decisión de Isaac del 27-sep: "el mapa es el filtro de todo").
 *
 * Encuesta = acumulado de la fase previa a cada elección (Estimado, con IC 95 %); resultado = Registraduría
 * (Oficial). Reglamento v1.2: los microdatos CNE calibran a municipio o departamento, nunca a barrio.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { ClipboardList, ArrowUpRight } from 'lucide-react';
import {
  COMPARACIONES,
  DANES_ANTIOQUIA_2026,
  cargarAgregados,
  compararOpciones,
  estimarTerritorio,
  resultadoOficial,
  type Agregados,
  type Comparacion,
  type EstimacionTerritorio,
  type FilaComparada,
  type ResultadoOficial,
} from '../../services/encuestasService';
import type { SeleccionEncuestas } from '../encuestas/VotoCorrelaciones';

interface Props {
  /** Municipio activo en el mapa (código DANE) o null para Antioquia */
  dane: string | null;
  nombreMunicipio?: string;
  /** El usuario está mirando una comuna o un barrio (las encuestas no bajan a ese nivel) */
  bajoMunicipio?: boolean;
  onAbrirEncuestas?: (s: SeleccionEncuestas) => void;
}

const pct = (x: number | null | undefined, d = 1) => (x == null ? '—' : `${(100 * x).toFixed(d).replace('.', ',')} %`);
const pts = (x: number | null) => (x == null ? '—' : `${x > 0 ? '+' : x < 0 ? '−' : ''}${Math.abs(x).toFixed(1).replace('.', ',')}`);
const fmt = (n: number) => n.toLocaleString('es-CO');

/** Barra de 0 a `max`: IC de la encuesta (banda), su estimación (punto) y el resultado oficial (rombo) */
const Escala: React.FC<{ f: FilaComparada; max: number }> = ({ f, max }) => {
  const x = (v: number) => `${Math.min(100, (100 * v) / max)}%`;
  return (
    <div className="relative h-4 w-full min-w-[120px]" aria-hidden>
      <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--c-border)]" />
      {f.encuesta && (
        <>
          <div className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-[var(--c-info-soft)] border border-[var(--c-info)]/40"
            style={{ left: x(f.encuesta.lo), width: `calc(${x(f.encuesta.hi)} - ${x(f.encuesta.lo)})` }} />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[var(--c-info)]" style={{ left: x(f.encuesta.p) }} />
        </>
      )}
      {f.resultado != null && (
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[var(--c-ink)]" style={{ left: x(f.resultado) }} />
      )}
    </div>
  );
};

interface Estado {
  est: EstimacionTerritorio | null;
  /** true si el municipio no alcanzó el n mínimo y se muestra Antioquia */
  respaldo: boolean;
  oficial: ResultadoOficial | null;
}

export const EncuestasTerritorio: React.FC<Props> = ({ dane, nombreMunicipio, bajoMunicipio, onAbrirEncuestas }) => {
  const [ag, setAg] = useState<Agregados | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [comp, setComp] = useState<Comparacion>(COMPARACIONES[1]);
  const [estado, setEstado] = useState<Estado | null>(null);

  useEffect(() => { cargarAgregados().then(setAg).catch((e) => setError(e.message)); }, []);

  useEffect(() => {
    if (!ag) return;
    let activo = true;
    setEstado(null);
    const deMuni = dane ? estimarTerritorio(ag, comp.acumulado, comp.pregunta, 'municipio', dane) : null;
    const est = deMuni ?? estimarTerritorio(ag, comp.acumulado, comp.pregunta, 'departamento', '05');
    const respaldo = !!dane && !deMuni;
    const danes = deMuni ? [dane!] : DANES_ANTIOQUIA_2026;
    resultadoOficial(danes, comp.eleccionId, deMuni ? est!.territorio : 'Antioquia')
      .then((oficial) => { if (activo) setEstado({ est, respaldo, oficial }); })
      .catch(() => { if (activo) setEstado({ est, respaldo, oficial: null }); });
    return () => { activo = false; };
  }, [ag, dane, comp]);

  const filas = useMemo(() => (estado?.est ? compararOpciones(estado.est, estado.oficial) : []), [estado]);
  const max = useMemo(() => Math.max(0.1, ...filas.map((f) => Math.max(f.encuesta?.hi ?? 0, f.resultado ?? 0))) * 1.05, [filas]);

  if (error) {
    return <p className="m-0 px-3 py-2 rounded-xl bg-[var(--c-sunken)] text-xs text-[var(--c-muted)]">Encuestas: {error}.</p>;
  }

  const est = estado?.est;
  const aciertos = filas.filter((f) => f.dentroIC != null);
  const territorio = est?.nivel === 'municipio' ? est.territorio : 'Antioquia';
  const nombreModulo = est?.nivel === 'municipio' ? `${est.territorio} (Antioquia)` : 'Antioquia';

  return (
    <section className="proteus-civico p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] flex flex-col gap-3" aria-label="Encuestas y resultado oficial">
      <header className="flex items-center gap-2 flex-wrap">
        <ClipboardList className="w-5 h-5 text-[var(--c-accent)]" strokeWidth={1.7} />
        <h2 className="m-0 text-base font-bold grow">Encuestas y urnas · {estado ? territorio : '…'}</h2>
        <div className="flex gap-1 p-0.5 rounded-lg bg-[var(--c-sunken)]" role="tablist" aria-label="Elección">
          {COMPARACIONES.map((c) => (
            <button key={c.eleccionId} type="button" role="tab" aria-selected={c === comp} onClick={() => setComp(c)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold ${c === comp ? 'bg-[var(--c-surface)] text-[var(--c-ink)] shadow-sm' : 'text-[var(--c-muted)] hover:text-[var(--c-ink)]'}`}>
              {c.titulo.replace('Presidencia · ', '')}
            </button>
          ))}
        </div>
      </header>

      {(estado?.respaldo || bajoMunicipio) && (
        <p className="m-0 px-3 py-2 rounded-xl bg-[var(--c-sunken)] text-xs text-[var(--c-muted)] leading-snug">
          {estado?.respaldo
            ? `Las encuestas no tienen muestra suficiente en ${nombreMunicipio ?? 'este municipio'} para ${comp.titulo} (n efectivo menor que 30): se muestra Antioquia.`
            : 'Las encuestas no bajan a comuna ni a barrio (reglamento v1.2): se muestra el municipio.'}
        </p>
      )}

      {!estado ? (
        <p className="m-0 text-sm text-[var(--c-muted)]">Cargando encuestas y resultados…</p>
      ) : !est ? (
        <p className="m-0 text-sm text-[var(--c-muted)]">No hay encuestas publicables para esta elección en Antioquia.</p>
      ) : (
        <>
          <p className="m-0 text-sm leading-relaxed">
            {comp.titulo} ({comp.fechaEleccion}): acumulado de {est.componentes} encuestas ({comp.ventana}),{' '}
            {fmt(est.n)} casos en {territorio}, n efectivo {fmt(est.nEfectivo)}.
            {aciertos.length > 0 && ` El resultado oficial cayó dentro del intervalo de la encuesta en ${aciertos.filter((f) => f.dentroIC).length} de ${aciertos.length} opciones.`}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-xs text-[var(--c-muted)]">
                  <th className="py-1 pr-3 font-semibold">Opción</th>
                  <th className="py-1 pr-3 font-semibold text-right whitespace-nowrap">Encuesta <span className="font-normal">(IC 95 %)</span></th>
                  <th className="py-1 pr-3 font-semibold text-right">Resultado</th>
                  <th className="py-1 pr-3 font-semibold text-right whitespace-nowrap">Dif. (pts)</th>
                  <th className="py-1 font-semibold w-2/5"><span className="sr-only">Escala</span></th>
                </tr>
              </thead>
              <tbody>
                {filas.map((f) => (
                  <tr key={f.opcion} className="border-t border-[var(--c-border)]">
                    <td className="py-1.5 pr-3">{f.opcion}</td>
                    <td className="py-1.5 pr-3 text-right tabular-nums whitespace-nowrap">
                      {f.encuesta ? <>{pct(f.encuesta.p)} <span className="text-xs text-[var(--c-muted)]">{pct(f.encuesta.lo, 0)}–{pct(f.encuesta.hi, 0)}</span></> : <span className="text-xs text-[var(--c-muted)]">sin dato</span>}
                    </td>
                    <td className="py-1.5 pr-3 text-right tabular-nums font-semibold">{pct(f.resultado)}</td>
                    <td className={`py-1.5 pr-3 text-right tabular-nums ${f.dentroIC === false ? 'text-[var(--c-warn)] font-semibold' : 'text-[var(--c-muted)]'}`}>{pts(f.diferencia)}</td>
                    <td className="py-1.5"><Escala f={f} max={max} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--c-muted)]">
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--c-info)]" /> Encuesta <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-[var(--c-warn-soft)] text-[var(--c-warn)]">Estimado</span></span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-4 h-2 rounded-full bg-[var(--c-info-soft)] border border-[var(--c-info)]/40" /> IC 95 %</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rotate-45 bg-[var(--c-ink)]" /> Resultado <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-[var(--c-ok-soft)] text-[var(--c-ok)]">Oficial</span></span>
            <span className="flex items-center gap-1.5"><span className="font-semibold text-[var(--c-warn)]">Dif.</span> fuera del intervalo</span>
          </div>

          <p className="m-0 text-[10px] text-[var(--c-muted)] leading-snug">
            {comp.base} Encuestas: microdatos del Registro Nacional de Encuestas del CNE (Ley 2494 de 2025, art. 12), acumulados con el peso del n efectivo de Kish de cada encuesta; celdas con n menor que 30 suprimidas.
            Mezcla firmas con métodos distintos y supone opinión estable dentro de la ventana. Resultado: {estado.oficial ? `${estado.oficial.fuente}${estado.oficial.municipios > 1 ? `, suma de ${estado.oficial.municipios} municipios` : ''}` : 'sin resultado cargado para este territorio'}.
            Una diferencia grande puede ser error de las encuestas o un cambio de voto al final de la campaña: este cuadro no distingue entre las dos.
          </p>

          {onAbrirEncuestas && (
            <div>
              <button type="button"
                onClick={() => onAbrirEncuestas({ vista: 'evolucion', pregunta: comp.pregunta, nivel: est.nivel, territorio: nombreModulo, fuente: 'individuales' })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--c-border)] text-sm font-semibold hover:bg-[var(--c-sunken)]">
                Ver la evolución de {territorio} en Encuestas 2026 <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

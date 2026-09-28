/**
 * ANÁLISIS DE PIEZAS: depende de la identidad del candidato. Mide (sin IA) color, tonalidad, composición y ritmo
 * de edición, y, si se pide, interpreta con Gemini aplicando el libro de reglas. Todo se compara con la identidad.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, FileText, Film, Image as ImageIcon, Link2, Loader2, Sparkles, Trash2, Upload } from 'lucide-react';
import { REDES, paletaDefinida, type IdentidadCandidato } from '../../services/identidad/identidad';
import { medirImagen, medirVideo, type MedicionPieza } from '../../services/analisisPiezas/pieza';
import { metricasOratoria } from '../../services/analisisPiezas/medicion';
import { analizarConGemini, borrarPieza, guardarPieza, leerPiezas, tipoDeArchivo, type FuentePieza, type PiezaAnalizada } from '../../services/analisisPiezas/analisis';
import { DIMENSIONES, puntajeDimension, type RespuestaAnalisis, type TipoPieza } from '../../data/analisisPiezas/libroDeReglas';

const n1 = (x: number) => x.toLocaleString('es-CO', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const pct = (x: number) => `${Math.round(x * 100)} %`;
const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const aSeg = (m?: string) => { if (!m) return null; const p = m.split(':').map(Number); return p.some(isNaN) ? null : p.reduce((a, b) => a * 60 + b, 0); };

const Tarjeta: React.FC<{ titulo: string; sello?: 'medido' | 'estimado'; children: React.ReactNode; className?: string }> = ({ titulo, sello, children, className = '' }) => (
  <section className={`rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] p-5 flex flex-col gap-4 ${className}`}>
    <div className="flex items-center justify-between gap-3">
      <h3 className="m-0 text-[15px] font-semibold">{titulo}</h3>
      {sello && (
        <span className={`text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${sello === 'medido' ? 'bg-[var(--c-ok-soft)] text-[var(--c-ok)]' : 'bg-[var(--c-warn-soft)] text-[var(--c-warn)]'}`}>
          {sello === 'medido' ? 'Medido' : 'Estimado por IA'}
        </span>
      )}
    </div>
    {children}
  </section>
);

const Dato: React.FC<{ n: string; v: string; nota?: string }> = ({ n, v, nota }) => (
  <div className="flex flex-col gap-0.5 p-3 rounded-lg bg-[var(--c-sunken)]">
    <span className="text-xs text-[var(--c-muted)]">{n}</span>
    <span className="font-titulo text-[22px] leading-tight tabular-nums">{v}</span>
    {nota && <span className="text-xs text-[var(--c-muted)]">{nota}</span>}
  </div>
);

function PanelMedido({ m, identidad }: { m: MedicionPieza; identidad: IdentidadCandidato }) {
  const t = m.tonalidad, c = m.composicion;
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <Tarjeta titulo="Paleta dominante" sello="medido">
        <div className="flex h-16 rounded-lg overflow-hidden border border-[var(--c-border)]" role="img" aria-label={`Paleta: ${m.paleta.map((p) => `${p.hex} ${pct(p.peso)}`).join(', ')}`}>
          {m.paleta.filter((p) => p.peso >= 0.005).map((p) => <div key={p.hex} style={{ background: p.hex, width: `${p.peso * 100}%` }} title={`${p.hex} · ${pct(p.peso)}`} />)}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {m.paleta.filter((p) => p.peso >= 0.005).map((p) => (
            <span key={p.hex} className="inline-flex items-center gap-1.5 text-xs font-mono">
              <span className="w-3.5 h-3.5 rounded-sm border border-[var(--c-border)]" style={{ background: p.hex }} />{p.hex} · {pct(p.peso)}
            </span>
          ))}
        </div>
      </Tarjeta>

      <Tarjeta titulo="Adherencia a la paleta de marca" sello="medido">
        {m.adherencia ? (
          <>
            <div className="flex items-baseline gap-2">
              <span className="font-titulo text-[40px] leading-none tabular-nums">{pct(m.adherencia.cobertura)}</span>
              <span className="text-sm text-[var(--c-muted)]">de la pieza en colores de marca (ΔE ≤ {identidad.imagen.toleranciaColor})</span>
            </div>
            <div className="flex flex-col gap-2">
              {m.adherencia.porColorMarca.map((x) => (
                <div key={x.rol} className="grid grid-cols-[90px_minmax(0,1fr)_110px] gap-3 items-center text-sm">
                  <span className="inline-flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded-sm border border-[var(--c-border)]" style={{ background: x.hex }} />{x.rol}</span>
                  <span className="h-2.5 rounded-full bg-[var(--c-sunken)] overflow-hidden border border-[var(--c-border)]"><span className="block h-full" style={{ width: `${Math.min(100, x.presencia * 100)}%`, background: x.hex }} /></span>
                  <span className="text-xs text-[var(--c-muted)] tabular-nums text-right">{pct(x.presencia)} · ΔE {x.dEMin?.toFixed(1) ?? '—'}</span>
                </div>
              ))}
            </div>
            {m.adherencia.ajenos.length > 0 && (
              <p className="m-0 text-xs text-[var(--c-muted)]">Colores ajenos dominantes: {m.adherencia.ajenos.map((a) => `${a.hex} (${pct(a.peso)}, ΔE ${a.dEMarca.toFixed(0)})`).join(', ')}.</p>
            )}
          </>
        ) : <p className="m-0 text-sm text-[var(--c-muted)]">Define al menos un color en Imagen › Paleta de marca para medir la adherencia.</p>}
      </Tarjeta>

      <Tarjeta titulo="Luz y tonalidad" sello="medido">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Dato n="Brillo medio" v={pct(t.brilloMedio)} nota={`Clave ${t.clave}`} />
          <Dato n="Contraste" v={t.contrasteRms.toFixed(0)} nota="RMS de L* (0-100)" />
          <Dato n="Saturación" v={pct(t.saturacionMedia)} />
          <Dato n="Temperatura" v={t.temperaturaK ? `${Math.round(t.temperaturaK / 100) * 100} K` : '—'} nota={t.temperaturaK ? (t.temperaturaK < 4500 ? 'cálida' : t.temperaturaK > 6500 ? 'fría' : 'neutra') : undefined} />
        </div>
        <p className="m-0 text-xs text-[var(--c-muted)]">Sombras recortadas {pct(t.sombrasRecortadas)} · luces recortadas {pct(t.lucesRecortadas)} · mayor contraste entre colores dominantes {m.contrasteMaximo.toFixed(1)}:1 {m.contrasteMaximo >= 4.5 ? '(sirve para texto normal)' : m.contrasteMaximo >= 3 ? '(solo texto grande)' : '(insuficiente para texto)'}.</p>
      </Tarjeta>

      <Tarjeta titulo="Composición" sello="medido">
        <div className="flex gap-5 items-center">
          <div className="relative shrink-0 w-40 rounded-md overflow-hidden border border-[var(--c-border)]" style={{ aspectRatio: `${m.ancho} / ${m.alto}`, maxHeight: 180 }} role="img" aria-label="Energía visual por tercios y centro de masa">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              {c.tercios.map((e, k) => <div key={k} className="border border-[var(--c-border)]/60" style={{ background: `rgba(133, 23, 44, ${Math.min(0.85, e * 4)})` }} />)}
            </div>
            <span className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full bg-[#F0CE8C] ring-2 ring-[var(--c-ink)]" style={{ left: `${c.centro[0] * 100}%`, top: `${c.centro[1] * 100}%` }} />
          </div>
          <div className="flex flex-col gap-1.5 text-sm">
            <span><strong>{m.proporcion}</strong> · {m.ancho}×{m.alto}{m.duracionSeg ? ` · ${mmss(m.duracionSeg)}` : ''}</span>
            <span>Centro de masa visual a {c.distanciaPuntoFuerte.toFixed(2)} del punto fuerte más cercano{c.distanciaPuntoFuerte < 0.1 ? ' (sobre los tercios)' : Math.hypot(c.centro[0] - 0.5, c.centro[1] - 0.5) < 0.08 ? ' (composición centrada)' : ''}.</span>
            <span>Balance horizontal {c.balanceHorizontal > 0.15 ? 'cargado a la derecha' : c.balanceHorizontal < -0.15 ? 'cargado a la izquierda' : 'equilibrado'} ({(Math.abs(c.balanceHorizontal) < 0.005 ? 0 : c.balanceHorizontal).toFixed(2)}).</span>
            <span>Espacio negativo {pct(c.espacioNegativo)}.</span>
          </div>
        </div>
      </Tarjeta>

      {m.ritmo && m.lineaColor && m.duracionSeg && (
        <Tarjeta titulo="Ritmo de edición y color en el tiempo" sello="medido" className="xl:col-span-2">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Dato n="Duración" v={mmss(m.duracionSeg)} nota={`Objetivo de la identidad: ${identidad.canales.duracionVideoSeg} s`} />
            <Dato n="Planos" v={String(m.ritmo.planos)} />
            <Dato n="Cortes por minuto" v={m.ritmo.cortesPorMinuto.toFixed(1)} />
            <Dato n="Plano medio" v={`${m.ritmo.duracionMediaPlano.toFixed(1)} s`} />
          </div>
          <div className="relative">
            <div className="flex h-10 rounded-md overflow-hidden border border-[var(--c-border)]" role="img" aria-label="Color dominante a lo largo del video">
              {m.lineaColor.map((x) => <div key={x.t} className="grow" style={{ background: x.hex }} />)}
            </div>
            {m.ritmo.cortes.map((s) => <span key={s} aria-hidden className="absolute -top-1 -bottom-1 w-0.5 bg-[var(--c-ink)]" style={{ left: `${(s / m.duracionSeg!) * 100}%` }} />)}
          </div>
          <div className="flex justify-between text-xs text-[var(--c-muted)] tabular-nums"><span>00:00</span><span>Líneas: cortes detectados</span><span>{mmss(m.duracionSeg)}</span></div>
          {m.miniaturas && m.miniaturas.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {m.miniaturas.map((x) => (
                <figure key={x.t} className="m-0 shrink-0 flex flex-col gap-1">
                  <img src={x.url} alt={`Fotograma en ${mmss(x.t)}`} className="h-20 rounded border border-[var(--c-border)]" />
                  <figcaption className="text-[11px] text-[var(--c-muted)] tabular-nums">{mmss(x.t)}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </Tarjeta>
      )}
    </div>
  );
}

const colorPuntaje = (p: number | null) => (p == null ? 'var(--c-muted)' : p >= 4 ? 'var(--c-ok)' : p >= 3 ? 'var(--c-warn-solid)' : 'var(--c-accent)');

function PanelInterpretado({ ia, identidad, medicion }: { ia: NonNullable<PiezaAnalizada['ia']>; identidad: IdentidadCandidato; medicion: MedicionPieza | null }) {
  const a: RespuestaAnalisis = ia.analisis;
  const oratoria = useMemo(() => {
    if (!a.transcripcion?.length) return null;
    const texto = a.transcripcion.map((x) => x.texto).join(' ');
    const fin = medicion?.duracionSeg ?? Math.max(...a.transcripcion.map((x) => aSeg(x.momento) ?? 0)) + 5;
    return metricasOratoria(texto, fin, identidad.voz.muletillas, identidad.voz.palabrasProhibidas);
  }, [a.transcripcion, medicion, identidad.voz]);
  return (
    <div className="flex flex-col gap-4">
      <Tarjeta titulo="Lectura de la pieza" sello="estimado">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="shrink-0 flex flex-col items-start gap-1">
            <span className="text-xs text-[var(--c-muted)]">Puntaje global (calculado por Proteus)</span>
            <span className="font-titulo text-[56px] leading-none tabular-nums" style={{ color: colorPuntaje(ia.global) }}>{ia.global != null ? n1(ia.global) : '—'}</span>
            <span className="text-xs text-[var(--c-muted)]">de 5 · {ia.modelo}{ia.tokens ? ` · ${ia.tokens.toLocaleString('es-CO')} tokens` : ''}</span>
          </div>
          <div className="grow flex flex-col gap-3">
            <p className="m-0 text-[15px] leading-relaxed">{a.resumen}</p>
            <div className="flex flex-col gap-1.5">
              {a.dimensiones.map((d) => {
                const def = DIMENSIONES.find((x) => x.id === d.id);
                const p = puntajeDimension(d);
                return (
                  <div key={d.id} className="grid grid-cols-[150px_minmax(0,1fr)_36px] gap-3 items-center text-sm">
                    <span>{def?.nombre ?? d.id}</span>
                    <span className="h-2.5 rounded-full bg-[var(--c-sunken)] overflow-hidden"><span className="block h-full" style={{ width: `${((p ?? 0) / 5) * 100}%`, background: colorPuntaje(p) }} /></span>
                    <span className="tabular-nums text-right font-semibold">{p != null ? n1(p) : '—'}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Tarjeta>

      {(a.alertasCumplimiento.length > 0) && (
        <section className="rounded-xl border border-[var(--c-accent)] bg-[var(--c-accent-soft)] p-4 flex flex-col gap-2" role="alert">
          <span className="inline-flex items-center gap-2 font-semibold text-[var(--c-accent-text)]"><AlertTriangle className="w-4 h-4" /> Alertas de cumplimiento</span>
          {a.alertasCumplimiento.map((x, k) => <span key={k} className="text-sm"><strong>{x.tipo}</strong>{x.momento ? ` (${x.momento})` : ''}: {x.detalle}</span>)}
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Tarjeta titulo="Qué mejorar" sello="estimado">
          <ol className="m-0 pl-5 flex flex-col gap-2 text-sm">
            {a.mejoras.map((x, k) => (
              <li key={k}><span className={`mr-2 text-[11px] font-bold uppercase px-1.5 py-0.5 rounded ${x.prioridad === 'alta' ? 'bg-[var(--c-accent-soft)] text-[var(--c-accent-text)]' : 'bg-[var(--c-sunken)] text-[var(--c-muted)]'}`}>{x.prioridad}</span>{x.accion}</li>
            ))}
          </ol>
          {a.fortalezas.length > 0 && (
            <>
              <span className="text-sm font-semibold">Fortalezas</span>
              <ul className="m-0 pl-5 flex flex-col gap-1 text-sm">{a.fortalezas.map((x, k) => <li key={k}>{x}</li>)}</ul>
            </>
          )}
        </Tarjeta>
        <Tarjeta titulo="Cifras y hechos para verificar">
          {a.cifrasParaVerificar.length ? (
            <ul className="m-0 pl-5 flex flex-col gap-1.5 text-sm">{a.cifrasParaVerificar.map((x, k) => <li key={k}>{x.momento && <span className="font-mono text-xs text-[var(--c-muted)] mr-1.5">{x.momento}</span>}{x.afirmacion}</li>)}</ul>
          ) : <p className="m-0 text-sm text-[var(--c-muted)]">La pieza no afirma cifras ni hechos verificables.</p>}
          {oratoria && (
            <div className="flex flex-col gap-2 pt-3 border-t border-[var(--c-border)]">
              <span className="text-sm font-semibold">Oratoria sobre la transcripción <span className="text-xs font-normal text-[var(--c-muted)]">(conteo de Proteus sobre el texto de Gemini)</span></span>
              <div className="grid grid-cols-2 gap-2">
                <Dato n="Palabras por minuto" v={oratoria.palabrasPorMinuto.toFixed(0)} nota={`Objetivo ${identidad.voz.ritmoMin}-${identidad.voz.ritmoMax}`} />
                <Dato n="Palabras" v={String(oratoria.palabras)} />
              </div>
              {oratoria.muletillas.length > 0 && <span className="text-sm">Muletillas: {oratoria.muletillas.map((x) => `${x.termino} (${x.veces})`).join(', ')}</span>}
              {oratoria.prohibidas.length > 0 && <span className="text-sm text-[var(--c-accent-text)] font-semibold">Palabras que no usa: {oratoria.prohibidas.map((x) => `${x.termino} (${x.veces})`).join(', ')}</span>}
            </div>
          )}
        </Tarjeta>
      </div>

      <Tarjeta titulo="Criterio por criterio" sello="estimado">
        <div className="flex flex-col divide-y divide-[var(--c-border)]">
          {a.dimensiones.map((d) => {
            const def = DIMENSIONES.find((x) => x.id === d.id);
            return (
              <details key={d.id} className="py-2 group">
                <summary className="cursor-pointer min-h-11 flex items-center justify-between gap-3 font-semibold">
                  <span>{def?.nombre ?? d.id}</span>
                  <span className="tabular-nums" style={{ color: colorPuntaje(puntajeDimension(d)) }}>{(() => { const x = puntajeDimension(d); return x != null ? n1(x) : '—'; })()}</span>
                </summary>
                <div className="flex flex-col gap-3 pt-2 pb-3">
                  {d.criterios.map((c) => (
                    <div key={c.id} className="grid grid-cols-[36px_minmax(0,1fr)] gap-3">
                      <span className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white" style={{ background: colorPuntaje(c.puntaje) }}>{c.puntaje ?? '—'}</span>
                      <div className="flex flex-col gap-1 text-sm">
                        <span className="font-semibold">{def?.criterios.find((x) => x.id === c.id)?.nombre ?? c.id} <span className="font-normal text-xs text-[var(--c-muted)]">· confianza {c.confianza}</span></span>
                        <span><span className="text-[var(--c-muted)]">Se ve: </span>{c.observacion}</span>
                        <span><span className="text-[var(--c-muted)]">Significa: </span>{c.lectura}</span>
                        {c.evidencia.length > 0 && <span className="flex flex-wrap gap-1.5">{c.evidencia.map((e, k) => <span key={k} className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-[var(--c-sunken)] border border-[var(--c-border)]">{[e.momento, e.zona].filter(Boolean).join(' · ')}</span>)}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </Tarjeta>
    </div>
  );
}

type Modo = 'archivo' | 'youtube' | 'texto';

export const AnalisisPiezas: React.FC<{ identidad: IdentidadCandidato; onIrABloque: (b: 'imagen' | 'privacidad' | 'canales') => void }> = ({ identidad, onIrABloque }) => {
  const [modo, setModo] = useState<Modo>('archivo');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);
  const [url, setUrl] = useState('');
  const [texto, setTexto] = useState('');
  const [canal, setCanal] = useState<string>(identidad.canales.principal || '');
  const [propia, setPropia] = useState(true);
  const [contexto, setContexto] = useState('');
  const [medicion, setMedicion] = useState<MedicionPieza | null>(null);
  const [midiendo, setMidiendo] = useState<number | null>(null);
  const [analizando, setAnalizando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actual, setActual] = useState<PiezaAnalizada | null>(null);
  const [historial, setHistorial] = useState<PiezaAnalizada[]>(() => leerPiezas());
  const entrada = useRef<HTMLInputElement>(null);

  const marca = paletaDefinida(identidad).map((c) => ({ hex: c.hex, rol: c.rol }));
  const tipo: TipoPieza | null = modo === 'archivo' ? (archivo ? tipoDeArchivo(archivo) : null) : modo === 'youtube' ? 'video' : 'texto';

  useEffect(() => () => { if (vistaPrevia) URL.revokeObjectURL(vistaPrevia); }, [vistaPrevia]);

  const elegir = async (f: File | null) => {
    setError(null); setActual(null); setMedicion(null);
    setArchivo(f);
    setVistaPrevia(f ? URL.createObjectURL(f) : null);
    if (!f) return;
    const t = tipoDeArchivo(f);
    if (!t) { setError('Formato no reconocido: sube una imagen, un video o un audio.'); return; }
    if (t === 'audio') return;
    try {
      setMidiendo(0);
      const m = t === 'imagen' ? await medirImagen(f, marca, identidad.imagen.toleranciaColor) : await medirVideo(f, marca, identidad.imagen.toleranciaColor, setMidiendo);
      setMedicion(m);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo medir la pieza.');
    } finally { setMidiendo(null); }
  };

  const fuente: FuentePieza | null = modo === 'archivo' ? (archivo ? { clase: 'archivo', archivo } : null) : modo === 'youtube' ? (url.trim() ? { clase: 'youtube', url: url.trim() } : null) : texto.trim() ? { clase: 'texto', texto } : null;
  const bloqueo = !fuente || !tipo ? 'Elige una pieza.'
    : fuente.clase === 'archivo' && tipo === 'imagen' && !identidad.privacidad.enviarFotosAIA ? 'La identidad no permite enviar imágenes a la IA.'
    : fuente.clase === 'archivo' && (tipo === 'video' || tipo === 'audio') && !identidad.privacidad.enviarVideosAIA ? 'La identidad no permite enviar videos ni audios a la IA.' : null;
  const tokensAprox = tipo === 'video' ? (medicion?.duracionSeg ? Math.round(medicion.duracionSeg * 300) : null) : null;

  const analizar = async () => {
    if (!fuente || !tipo) return;
    setAnalizando(true); setError(null);
    try {
      const ia = await analizarConGemini({ identidad, tipo, canal, propia, contexto, fuente, medicion });
      const pieza: PiezaAnalizada = {
        id: `p${Date.now()}`, fecha: new Date().toISOString(), nombre: fuente.clase === 'archivo' ? fuente.archivo.name : fuente.clase === 'youtube' ? fuente.url : texto.slice(0, 60),
        tipo, canal, propia, origen: fuente.clase === 'archivo' ? fuente.archivo.name : fuente.clase === 'youtube' ? fuente.url : 'texto', medicion, ia,
      };
      setActual(pieza);
      if (identidad.privacidad.guardarAnalisis) setHistorial(guardarPieza(pieza));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo analizar.');
    } finally { setAnalizando(false); }
  };

  const guardarSoloMedicion = () => {
    if (!medicion || !archivo || !tipo) return;
    const pieza: PiezaAnalizada = { id: `p${Date.now()}`, fecha: new Date().toISOString(), nombre: archivo.name, tipo, canal, propia, origen: archivo.name, medicion, ia: null };
    setActual(pieza);
    if (identidad.privacidad.guardarAnalisis) setHistorial(guardarPieza(pieza));
  };

  const modos: { id: Modo; t: string; icono: React.ReactNode }[] = [
    { id: 'archivo', t: 'Archivo', icono: <Upload className="w-4 h-4" /> },
    { id: 'youtube', t: 'YouTube', icono: <Link2 className="w-4 h-4" /> },
    { id: 'texto', t: 'Texto', icono: <FileText className="w-4 h-4" /> },
  ];
  const mostrarMedicion = actual?.medicion ?? medicion;

  return (
    <div className="flex flex-col gap-6">
      {marca.length === 0 && (
        <div className="rounded-xl border border-[var(--c-border)] bg-[var(--c-warn-soft)] p-4 text-sm flex flex-wrap items-center gap-3">
          <span className="grow">Sin paleta de marca, el análisis no puede medir la adherencia de color.</span>
          <button type="button" onClick={() => onIrABloque('imagen')} className="min-h-11 px-4 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] font-semibold">Definir la paleta</button>
        </div>
      )}

      <section className="rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] p-5 flex flex-col gap-5">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Tipo de entrada">
          {modos.map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={modo === m.id} onClick={() => { setModo(m.id); setError(null); setActual(null); }}
              className={`inline-flex items-center gap-2 min-h-11 px-4 rounded-lg border text-sm font-semibold ${modo === m.id ? 'border-[var(--c-accent)] bg-[var(--c-accent-soft)] text-[var(--c-accent-text)]' : 'border-[var(--c-border)] hover:border-[var(--c-accent)]'}`}>
              {m.icono}{m.t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-5">
          <div className="flex flex-col gap-3">
            {modo === 'archivo' && (
              <>
                <button type="button" onClick={() => entrada.current?.click()}
                  onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); void elegir(e.dataTransfer.files?.[0] ?? null); }}
                  className="min-h-[180px] rounded-xl border-2 border-dashed border-[var(--c-border)] hover:border-[var(--c-accent)] bg-[var(--c-sunken)] flex flex-col items-center justify-center gap-2 p-6 text-center">
                  {vistaPrevia && tipo === 'imagen' ? <img src={vistaPrevia} alt="Pieza elegida" className="max-h-56 rounded-lg" />
                    : vistaPrevia && tipo === 'video' ? <video src={vistaPrevia} controls className="max-h-56 rounded-lg" />
                    : vistaPrevia && tipo === 'audio' ? <audio src={vistaPrevia} controls />
                    : <>
                      <span className="flex gap-2 text-[var(--c-muted)]"><ImageIcon className="w-6 h-6" /><Film className="w-6 h-6" /></span>
                      <span className="font-semibold">Arrastra una imagen, un video o un audio, o haz clic para elegir</span>
                      <span className="text-xs text-[var(--c-muted)]">La medición de color, composición y ritmo se hace aquí, sin enviar nada.</span>
                    </>}
                  {archivo && <span className="text-xs text-[var(--c-muted)]">{archivo.name} · {(archivo.size / 1e6).toFixed(1)} MB</span>}
                </button>
                <input ref={entrada} type="file" accept="image/*,video/*,audio/*" className="sr-only" aria-label="Elegir archivo" onChange={(e) => void elegir(e.target.files?.[0] ?? null)} />
              </>
            )}
            {modo === 'youtube' && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pieza-url" className="text-sm font-semibold">Enlace público de YouTube</label>
                <input id="pieza-url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=…" className="h-11 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] px-3" />
                <span className="text-xs text-[var(--c-muted)]">Gemini abre el video directamente. El navegador no puede leer sus píxeles, así que no hay medición de color ni de cortes: solo el análisis interpretado. Para medirlo, descarga el video propio y súbelo como archivo.</span>
              </div>
            )}
            {modo === 'texto' && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pieza-texto" className="text-sm font-semibold">Texto de la pieza</label>
                <textarea id="pieza-texto" rows={8} value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Discurso, publicación, guion…" className="rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] p-3 leading-relaxed" />
              </div>
            )}
            {midiendo != null && <span className="inline-flex items-center gap-2 text-sm text-[var(--c-muted)]"><Loader2 className="w-4 h-4 animate-spin" /> Midiendo {tipo === 'video' ? `el video (${Math.round(midiendo * 100)} %)` : 'la imagen'}…</span>}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pieza-canal" className="text-sm font-semibold">Canal</label>
              <select id="pieza-canal" value={canal} onChange={(e) => setCanal(e.target.value)} className="h-11 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] px-3">
                <option value="">Sin especificar</option>
                {(identidad.canales.activos.length ? identidad.canales.activos : REDES).map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <fieldset className="m-0 p-0 border-0 flex flex-col gap-1.5">
              <legend className="text-sm font-semibold mb-1.5">De quién es</legend>
              <div className="grid grid-cols-2 gap-2">
                {[{ v: true, t: 'Propia' }, { v: false, t: 'De otro actor' }].map((o) => (
                  <button key={o.t} type="button" aria-pressed={propia === o.v} onClick={() => setPropia(o.v)} className={`min-h-11 rounded-lg border text-sm font-semibold ${propia === o.v ? 'border-[var(--c-accent)] bg-[var(--c-accent-soft)] text-[var(--c-accent-text)]' : 'border-[var(--c-border)]'}`}>{o.t}</button>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pieza-contexto" className="text-sm font-semibold">Contexto para el análisis</label>
              <textarea id="pieza-contexto" rows={3} value={contexto} onChange={(e) => setContexto(e.target.value)} placeholder="Objetivo de la pieza, público, dónde se grabó…" className="rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] p-3 text-sm" />
            </div>
            <button type="button" disabled={!!bloqueo || analizando} onClick={() => void analizar()}
              className="inline-flex items-center justify-center gap-2 min-h-12 px-5 rounded-lg bg-[var(--c-accent)] text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
              {analizando ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}{analizando ? 'Analizando con Gemini…' : 'Analizar con Gemini'}
            </button>
            {bloqueo && fuente && <button type="button" onClick={() => onIrABloque('privacidad')} className="text-xs text-left underline text-[var(--c-muted)]">{bloqueo} Cambiarlo en Privacidad.</button>}
            {tokensAprox && <span className="text-xs text-[var(--c-muted)]">Consumo aproximado del video: {tokensAprox.toLocaleString('es-CO')} tokens (unos 300 por segundo).</span>}
            {medicion && !actual && <button type="button" onClick={guardarSoloMedicion} className="min-h-11 rounded-lg border border-[var(--c-border)] text-sm font-semibold hover:border-[var(--c-accent)]">Guardar solo la medición</button>}
          </div>
        </div>
        {error && <p role="alert" className="m-0 text-sm text-[var(--c-accent-text)] font-semibold">{error}</p>}
      </section>

      {mostrarMedicion && <PanelMedido m={mostrarMedicion} identidad={identidad} />}
      {actual?.ia && <PanelInterpretado ia={actual.ia} identidad={identidad} medicion={actual.medicion} />}

      {historial.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="m-0 font-titulo text-[22px] font-medium">Piezas analizadas</h3>
          <div className="rounded-xl border border-[var(--c-border)] bg-[var(--c-surface)] divide-y divide-[var(--c-border)]">
            {historial.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-4 min-h-14">
                <button type="button" onClick={() => { setActual(p); window.scrollTo?.({ top: 0, behavior: 'smooth' }); }} className="grow min-w-0 text-left flex items-center gap-3 py-2">
                  <span className="w-10 text-center font-titulo text-xl tabular-nums" style={{ color: colorPuntaje(p.ia?.global ?? null) }}>{p.ia?.global != null ? n1(p.ia.global) : '—'}</span>
                  <span className="min-w-0 flex flex-col">
                    <span className="truncate text-sm font-semibold">{p.nombre}</span>
                    <span className="text-xs text-[var(--c-muted)]">{new Date(p.fecha).toLocaleDateString('es-CO')} · {p.tipo}{p.canal ? ` · ${p.canal}` : ''} · {p.propia ? 'propia' : 'de otro actor'}{p.medicion?.adherencia ? ` · marca ${pct(p.medicion.adherencia.cobertura)}` : ''}{p.ia ? '' : ' · solo medición'}</span>
                  </span>
                </button>
                <button type="button" onClick={() => { setHistorial(borrarPieza(p.id)); if (actual?.id === p.id) setActual(null); }} aria-label={`Borrar ${p.nombre}`} className="w-11 h-11 shrink-0 inline-flex items-center justify-center rounded-lg hover:bg-[var(--c-sunken)]"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

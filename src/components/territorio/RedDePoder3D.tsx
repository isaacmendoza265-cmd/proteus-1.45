/**
 * Red de poder en 3D: actores políticos y sus relaciones, desagregables por partido, casa (grupo
 * político), cargo, municipio y tipo de relación. Se gira arrastrando o sola.
 * Datos: base curada del desarrollador (sin verificar) + enlaces web cuando existan.
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ACTORES_RED, RELACIONES_RED, TIPOS_RELACION, COLORES_CARGO, COLORES_PARTIDO, COLORES_CASA, FUENTE_RED,
  disposicion3D, type ActorRed,
} from '../../services/powerNetworkService';
import type { RelationType } from '../../data/politicalHouses/types';

type ColorPor = 'partido' | 'casa' | 'cargo';
const TODOS = 'todos';
const RADIO: Record<number, number> = { 1: 11, 2: 8.5, 3: 7, 4: 5.5, 5: 4.5 };

const fmt = (n: number) => Math.round(n).toLocaleString('es-CO');
const corto = (n: string) => {
  const w = n.split(/\s+/);
  return w.length <= 2 ? n : `${w[0]} ${w[w.length >= 4 ? w.length - 2 : 1]}`;
};

const Selector: React.FC<{ label: string; value: string; onChange: (v: string) => void; opts: { v: string; l: string }[] }> = ({ label, value, onChange, opts }) => (
  <label className="flex flex-col gap-1 text-xs font-semibold text-[var(--c-muted)]">
    {label}
    <select value={value} onChange={(e) => onChange(e.target.value)} className="min-h-9 px-2 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-ink)] text-sm">
      <option value={TODOS}>Todos</option>
      {opts.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </label>
);

interface Props {
  /** Municipio inicial del filtro (p. ej. 'Bello') */
  municipioInicial?: string;
  onVerMunicipio?: (municipio: string) => void;
}

export const RedDePoder3D: React.FC<Props> = ({ municipioInicial, onVerMunicipio }) => {
  const pos = useMemo(() => disposicion3D(), []);
  const porId = useMemo(() => new Map(ACTORES_RED.map((a) => [a.id, a])), []);
  const [partido, setPartido] = useState(TODOS);
  const [casa, setCasa] = useState(TODOS);
  const [cargo, setCargo] = useState(TODOS);
  const [municipio, setMunicipio] = useState(municipioInicial ?? TODOS);
  const [relOff, setRelOff] = useState<Partial<Record<RelationType, boolean>>>({});
  const [colorPor, setColorPor] = useState<ColorPor>('partido');
  const [ocultar, setOcultar] = useState(false);
  const [yaw, setYaw] = useState(0.6);
  const [pitch, setPitch] = useState(-0.3);
  const [auto, setAuto] = useState(true);
  const [sel, setSel] = useState<string | null>(null);
  const [hov, setHov] = useState<string | null>(null);
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number; movido: boolean } | null>(null);
  const [arrastrando, setArrastrando] = useState(false);

  useEffect(() => { if (municipioInicial) setMunicipio(municipioInicial); }, [municipioInicial]);

  // Giro automático (se detiene al pasar el cursor por un nodo o al arrastrar)
  useEffect(() => {
    if (!auto || hov || arrastrando) return;
    let id = 0;
    let t0 = performance.now();
    const paso = (t: number) => {
      setYaw((y) => y + (t - t0) * 0.00018);
      t0 = t;
      id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [auto, hov, arrastrando]);

  const coincide = (a: ActorRed) =>
    (partido === TODOS || a.partidoId === partido) && (casa === TODOS || a.casaId === casa) &&
    (cargo === TODOS || a.grupoCargo === cargo) && (municipio === TODOS || a.municipio === municipio);
  const colorDe = (a: ActorRed) =>
    colorPor === 'casa' ? COLORES_CASA[a.casaId] ?? '#8A8F94' : colorPor === 'cargo' ? COLORES_CARGO[a.grupoCargo] ?? '#8A8F94' : COLORES_PARTIDO[a.partidoId] ?? '#8A8F94';

  const contar = (fn: (a: ActorRed) => string) => {
    const o = new Map<string, number>();
    for (const a of ACTORES_RED) o.set(fn(a), (o.get(fn(a)) ?? 0) + 1);
    return [...o.entries()].sort((x, y) => y[1] - x[1]);
  };
  const nombrePartido = useMemo(() => new Map(ACTORES_RED.map((a) => [a.partidoId, a.partido])), []);
  const nombreCasa = useMemo(() => new Map(ACTORES_RED.map((a) => [a.casaId, a.casa])), []);
  const opciones = {
    partido: contar((a) => a.partidoId).map(([k, c]) => ({ v: k, l: `${nombrePartido.get(k)} (${c})` })),
    casa: contar((a) => a.casaId).map(([k, c]) => ({ v: k, l: `${nombreCasa.get(k)} (${c})` })),
    cargo: contar((a) => a.grupoCargo).map(([k, c]) => ({ v: k, l: `${k} (${c})` })),
    municipio: contar((a) => a.municipio).map(([k, c]) => ({ v: k, l: `${k} (${c})` })),
  };

  // Proyección
  const ca = Math.cos(yaw), sa = Math.sin(yaw), cb = Math.cos(pitch), sb = Math.sin(pitch);
  const proyectar = (v: [number, number, number]) => {
    const x1 = v[0] * ca + v[2] * sa, z1 = -v[0] * sa + v[2] * ca;
    const y2 = v[1] * cb - z1 * sb, z2 = v[1] * sb + z1 * cb;
    const s = 3.4 / (3.4 - z2);
    return { X: 300 + 235 * x1 * s, Y: 310 + 235 * y2 * s, s, z: z2 };
  };
  const pr = new Map(ACTORES_RED.map((a) => [a.id, proyectar(pos[a.id])]));
  const tenue = (z: number) => 0.5 + 0.5 * Math.max(0, Math.min(1, (z + 1) / 2));

  const relVis = RELACIONES_RED.filter((r) => !relOff[r.tipo]);
  const vecinos = new Map<string, typeof relVis>();
  for (const r of relVis) {
    (vecinos.get(r.origen) ?? vecinos.set(r.origen, []).get(r.origen)!).push(r);
    (vecinos.get(r.destino) ?? vecinos.set(r.destino, []).get(r.destino)!).push(r);
  }
  const visible = (a: ActorRed) => !ocultar || coincide(a);
  const cerca = sel ? new Set([sel, ...(vecinos.get(sel) ?? []).map((r) => (r.origen === sel ? r.destino : r.origen))]) : null;

  const aristas = relVis
    .filter((r) => visible(porId.get(r.origen)!) && visible(porId.get(r.destino)!))
    .map((r) => {
      const a = pr.get(r.origen)!, b = pr.get(r.destino)!;
      const ambos = coincide(porId.get(r.origen)!) && coincide(porId.get(r.destino)!);
      const toca = !!sel && (r.origen === sel || r.destino === sel);
      let op = ambos ? 0.7 : 0.08;
      if (sel) op = toca ? 0.95 : op * 0.3;
      return { r, a, b, toca, op: op * tenue((a.z + b.z) / 2), z: (a.z + b.z) / 2 };
    })
    .sort((x, y) => x.z - y.z);
  const nodos = ACTORES_RED.filter(visible).sort((x, y) => pr.get(x.id)!.z - pr.get(y.id)!.z);

  const nCoinciden = ACTORES_RED.filter(coincide).length;
  const nRel = relVis.filter((r) => coincide(porId.get(r.origen)!) && coincide(porId.get(r.destino)!)).length;
  const grado = new Map<string, number>();
  for (const r of relVis) {
    if (coincide(porId.get(r.origen)!) && coincide(porId.get(r.destino)!)) {
      grado.set(r.origen, (grado.get(r.origen) ?? 0) + 1);
      grado.set(r.destino, (grado.get(r.destino) ?? 0) + 1);
    }
  }
  const top = [...grado.entries()].sort((x, y) => y[1] - x[1]).slice(0, 7);
  const filtros = [
    partido !== TODOS && nombrePartido.get(partido), casa !== TODOS && nombreCasa.get(casa), cargo !== TODOS && cargo, municipio !== TODOS && municipio,
  ].filter(Boolean) as string[];

  const leyenda =
    colorPor === 'casa' ? opciones.casa.map((o) => ({ k: o.v, l: nombreCasa.get(o.v)!, c: COLORES_CASA[o.v], n: ACTORES_RED.filter((a) => a.casaId === o.v).length, on: casa === o.v, pick: () => setCasa(casa === o.v ? TODOS : o.v) }))
      : colorPor === 'cargo' ? opciones.cargo.map((o) => ({ k: o.v, l: o.v, c: COLORES_CARGO[o.v], n: ACTORES_RED.filter((a) => a.grupoCargo === o.v).length, on: cargo === o.v, pick: () => setCargo(cargo === o.v ? TODOS : o.v) }))
        : opciones.partido.map((o) => ({ k: o.v, l: nombrePartido.get(o.v)!, c: COLORES_PARTIDO[o.v] ?? '#8A8F94', n: ACTORES_RED.filter((a) => a.partidoId === o.v).length, on: partido === o.v, pick: () => setPartido(partido === o.v ? TODOS : o.v) }));

  const actorSel = sel ? porId.get(sel) : undefined;
  const actorHov = hov ? porId.get(hov) : undefined;

  const onDown = (e: React.MouseEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, yaw, pitch, movido: false };
    setArrastrando(true);
  };
  const onMove = (e: React.MouseEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) d.movido = true;
    if (d.movido) {
      setAuto(false);
      setYaw(d.yaw + dx * 0.01);
      setPitch(Math.max(-1.4, Math.min(1.4, d.pitch - dy * 0.01)));
    }
  };
  const movidoRef = useRef(false);
  const onUp = () => {
    if (drag.current) movidoRef.current = drag.current.movido;
    drag.current = null;
    setArrastrando(false);
  };
  const clicNodo = (id: string) => {
    if (movidoRef.current) { movidoRef.current = false; return; }
    setSel(sel === id ? null : id);
  };


  return (
    <div className="proteus-civico grid grid-cols-1 xl:grid-cols-[250px_minmax(0,1fr)_300px] gap-4">
      {/* Filtros */}
      <aside className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-4 flex flex-col gap-3">
        <span className="text-sm font-semibold">Desagregar la red</span>
        <Selector label="Partido" value={partido} onChange={(v) => { setPartido(v); setSel(null); }} opts={opciones.partido} />
        <Selector label="Grupo político (casa)" value={casa} onChange={(v) => { setCasa(v); setSel(null); }} opts={opciones.casa} />
        <Selector label="Cargo" value={cargo} onChange={(v) => { setCargo(v); setSel(null); }} opts={opciones.cargo} />
        <Selector label="Municipio" value={municipio} onChange={(v) => { setMunicipio(v); setSel(null); }} opts={opciones.municipio} />
        <span className="text-xs font-semibold text-[var(--c-muted)]">Tipo de relación</span>
        <div className="flex flex-wrap gap-1">
          {(Object.keys(TIPOS_RELACION) as RelationType[]).map((k) => {
            const on = !relOff[k];
            return (
              <button key={k} aria-pressed={on} onClick={() => setRelOff({ ...relOff, [k]: on })}
                className={`min-h-8 px-2 rounded-md border text-xs font-semibold flex items-center gap-1.5 ${on ? 'bg-[var(--c-surface)] border-[var(--c-border)]' : 'bg-[var(--c-sunken)] border-transparent text-[var(--c-muted)]'}`}>
                <span className="w-3 h-[3px] rounded" style={{ background: TIPOS_RELACION[k].color }} />{TIPOS_RELACION[k].corto}
              </button>
            );
          })}
        </div>
        <span className="text-xs font-semibold text-[var(--c-muted)]">Colorear por</span>
        <div role="group" className="flex p-0.5 gap-0.5 rounded-lg bg-[var(--c-sunken)] border border-[var(--c-border)]">
          {(['partido', 'casa', 'cargo'] as ColorPor[]).map((k) => (
            <button key={k} aria-pressed={colorPor === k} onClick={() => setColorPor(k)}
              className={`grow min-h-7 rounded-md text-xs font-semibold capitalize ${colorPor === k ? 'bg-[var(--c-surface)] text-[var(--c-ink)]' : 'text-[var(--c-muted)]'}`}>{k}</button>
          ))}
        </div>
        <button aria-pressed={ocultar} onClick={() => setOcultar(!ocultar)}
          className={`min-h-8 px-2.5 rounded-md border text-xs font-semibold text-left ${ocultar ? 'bg-[var(--c-accent-soft)] border-[var(--c-accent)] text-[var(--c-accent)]' : 'border-[var(--c-border)]'}`}>
          {ocultar ? 'Mostrando solo lo filtrado' : 'Atenuar lo que no coincide'}
        </button>
        <div className="flex flex-col gap-0.5 border-t border-[var(--c-border)] pt-2">
          {leyenda.map((l) => (
            <button key={l.k} onClick={() => { l.pick(); setSel(null); }} className={`flex items-center gap-2 min-h-7 px-1 rounded text-xs text-left ${l.on ? 'bg-[var(--c-accent-soft)]' : ''}`}>
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: l.c }} />
              <span className="grow">{l.l}</span>
              <span className="text-[var(--c-muted)] tabular-nums">{l.n}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Grafo */}
      <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-3 flex flex-col gap-2 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm font-semibold">{nCoinciden} actores · {nRel} relaciones{filtros.length ? ' en el filtro' : ''}</span>
          <span className="grow" />
          <span className="text-xs text-[var(--c-muted)]">Arrastra para girar</span>
          {([['⟲', 'Girar a la izquierda', () => setYaw(yaw - 0.35)], ['⟳', 'Girar a la derecha', () => setYaw(yaw + 0.35)], ['↑', 'Inclinar hacia arriba', () => setPitch(Math.max(-1.4, pitch - 0.3))], ['↓', 'Inclinar hacia abajo', () => setPitch(Math.min(1.4, pitch + 0.3))]] as [string, string, () => void][]).map(([t, aria, fn]) => (
            <button key={aria} aria-label={aria} title={aria} onClick={() => { setAuto(false); fn(); }} className="w-8 h-8 rounded-md border border-[var(--c-border)] bg-[var(--c-surface)] text-sm">{t}</button>
          ))}
          <button aria-pressed={auto} onClick={() => setAuto(!auto)} className={`min-h-8 px-2.5 rounded-md border text-xs font-semibold ${auto ? 'bg-[var(--c-accent-soft)] border-[var(--c-accent)] text-[var(--c-accent)]' : 'border-[var(--c-border)]'}`}>Girar solo</button>
        </div>
        <div className="relative rounded-xl bg-[var(--c-sunken)] overflow-hidden" style={{ cursor: arrastrando ? 'grabbing' : 'grab' }}>
          <svg viewBox="0 0 600 620" className="block w-full h-auto max-h-[640px] select-none" role="img" aria-label="Grafo tridimensional de la red de poder"
            onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}>
            <rect x={0} y={0} width={600} height={620} fill="transparent" onClick={() => { if (movidoRef.current) { movidoRef.current = false; return; } setSel(null); }} />
            {([[[-0.9, 0, 0], [0.9, 0, 0]], [[0, -0.9, 0], [0, 0.9, 0]], [[0, 0, -0.9], [0, 0, 0.9]]] as [number, number, number][][]).map(([u, v], i) => {
              const a = proyectar(u), b = proyectar(v);
              return <line key={i} x1={a.X} y1={a.Y} x2={b.X} y2={b.Y} stroke="var(--c-border)" strokeDasharray="2 4" />;
            })}
            {aristas.map(({ r, a, b, toca, op }) => (
              <line key={r.id} x1={a.X} y1={a.Y} x2={b.X} y2={b.Y} stroke={TIPOS_RELACION[r.tipo].color} strokeWidth={toca ? 2.4 : 1.1 + r.fuerza * 0.12}
                strokeOpacity={op} strokeDasharray={r.tipo === 'tension_disputa' ? '5 4' : undefined} strokeLinecap="round" pointerEvents="none" />
            ))}
            {nodos.map((a) => {
              const p = pr.get(a.id)!;
              let op = coincide(a) ? 1 : 0.14;
              if (cerca && !cerca.has(a.id)) op *= 0.35;
              op *= tenue(p.z);
              const esSel = a.id === sel, esHov = a.id === hov;
              return (
                <circle key={a.id} cx={p.X} cy={p.Y} r={(RADIO[a.nivel] ?? 5.5) * p.s * (esSel ? 1.25 : 1)} fill={colorDe(a)} fillOpacity={op}
                  stroke={esSel ? 'var(--c-ink)' : esHov ? 'var(--c-accent)' : '#FFFFFF'} strokeWidth={esSel ? 2.6 : esHov ? 2.2 : 1.1} strokeOpacity={op}
                  onClick={() => clicNodo(a.id)} onMouseEnter={() => setHov(a.id)} onMouseLeave={() => setHov(null)} style={{ cursor: 'pointer' }}>
                  <title>{a.nombre}</title>
                </circle>
              );
            })}
            {nodos.filter((a) => a.id === sel || a.id === hov || (cerca ? cerca.has(a.id) : coincide(a) && a.nivel <= 2)).map((a) => {
              const p = pr.get(a.id)!;
              return (
                <text key={`t-${a.id}`} x={p.X} y={p.Y - (RADIO[a.nivel] ?? 5.5) * p.s - 5} textAnchor="middle" fontSize={a.id === sel ? 13 : 11 * Math.min(1.15, p.s)} fontWeight={700}
                  fill="var(--c-ink)" fillOpacity={a.id === sel || a.id === hov ? 1 : tenue(p.z)} stroke="var(--c-sunken)" strokeWidth={3.5} paintOrder="stroke" pointerEvents="none">
                  {corto(a.nombre)}
                </text>
              );
            })}
          </svg>
          <div className="absolute left-2.5 top-2.5 px-2.5 py-1.5 rounded-lg bg-[var(--c-surface)] border border-[var(--c-border)] text-sm pointer-events-none max-w-[460px]">
            {actorHov ? (<><strong>{actorHov.nombre}</strong> <span className="text-[var(--c-muted)]">· {actorHov.partido} · {actorHov.municipio} · {(vecinos.get(actorHov.id) ?? []).length} relaciones</span></>) : <strong>Pasa el cursor sobre un nodo</strong>}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap text-xs text-[var(--c-muted)]">
          <span>Tamaño del nodo: nivel del cargo</span>
          <span>Los nodos lejanos se ven más pequeños y tenues</span>
          <span className="grow" />
          <span>Datos: desarrollador (sin verificar) · web: {ACTORES_RED.filter((a) => a.enlacesWeb > 0).length} actores con enlace</span>
        </div>
      </div>

      {/* Detalle */}
      <aside className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-4 flex flex-col gap-3">
        {actorSel ? (
          <>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold tracking-wide uppercase text-[var(--c-accent)]">{actorSel.grupoCargo}</span>
              <h2 className="font-titulo m-0 text-[23px] leading-tight font-medium">{actorSel.nombre}</h2>
              <span className="text-sm text-[var(--c-muted)]">{actorSel.cargo}</span>
            </div>
            <dl className="m-0 grid grid-cols-[92px_1fr] gap-x-2 gap-y-1.5 text-sm">
              <dt className="text-xs font-semibold text-[var(--c-muted)]">Partido</dt>
              <dd className="m-0 font-semibold flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORES_PARTIDO[actorSel.partidoId] ?? '#8A8F94' }} />{actorSel.partido}</dd>
              <dt className="text-xs font-semibold text-[var(--c-muted)]">Grupo político</dt>
              <dd className="m-0 font-semibold flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORES_CASA[actorSel.casaId] }} />{actorSel.casa}</dd>
              <dt className="text-xs font-semibold text-[var(--c-muted)]">Municipio</dt>
              <dd className="m-0 font-semibold">{actorSel.municipio}</dd>
              <dt className="text-xs font-semibold text-[var(--c-muted)]">Votos</dt>
              <dd className="m-0 font-semibold">{actorSel.votos ? `${fmt(actorSel.votos)} (según la base)` : 'Sin dato'}</dd>
            </dl>
            <div className="px-3 py-2.5 rounded-xl bg-[var(--c-sunken)] flex flex-col gap-1.5 text-xs">
              <span className="font-bold text-sm">De dónde sale este dato</span>
              <div className="flex items-center gap-1.5"><span className="px-2 py-0.5 rounded-md bg-[var(--c-warn-soft)] text-[var(--c-warn)] font-bold">Desarrollador</span><span className="text-[var(--c-muted)]">Base curada · sin verificar</span></div>
              <div className="flex items-center gap-1.5"><span className="px-2 py-0.5 rounded-md bg-[var(--c-border)] text-[var(--c-muted)] font-bold">Web</span><span className="text-[var(--c-muted)]">{actorSel.enlacesWeb ? `${actorSel.enlacesWeb} enlaces verificables` : 'Ningún enlace verificable todavía'}</span></div>
              {actorSel.notasSinFuente > 0 && <span className="text-[var(--c-muted)]">Tiene {actorSel.notasSinFuente} anotación(es) internas sin fuente. No se muestran hasta verificarlas.</span>}
            </div>
            <span className="text-sm font-semibold">Relaciones ({(vecinos.get(actorSel.id) ?? []).length})</span>
            <ul className="m-0 p-0 list-none flex flex-col">
              {(vecinos.get(actorSel.id) ?? []).map((r) => {
                const otro = porId.get(r.origen === actorSel.id ? r.destino : r.origen)!;
                let tipo = TIPOS_RELACION[r.tipo].label;
                if (r.tipo === 'jerarquia_directa') tipo += r.origen === actorSel.id ? ' · depende de este actor' : ' · jefe de este actor';
                return (
                  <li key={r.id}>
                    <button onClick={() => setSel(otro.id)} className="w-full flex items-center gap-2 min-h-9 px-1.5 border-t border-[var(--c-border)] text-left text-sm">
                      <span className="w-3 h-[3px] rounded shrink-0" style={{ background: TIPOS_RELACION[r.tipo].color }} />
                      <span className="flex flex-col grow min-w-0"><span className="font-semibold">{otro.nombre}</span><span className="text-xs text-[var(--c-muted)]">{tipo} · {otro.municipio}</span></span>
                    </button>
                  </li>
                );
              })}
            </ul>
            {onVerMunicipio && <button onClick={() => onVerMunicipio(actorSel.municipio)} className="min-h-9 px-3 rounded-lg border border-[var(--c-border)] text-sm font-semibold">Ver {actorSel.municipio} en el mapa</button>}
          </>
        ) : (
          <>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold tracking-wide uppercase text-[var(--c-accent)]">Redes de poder</span>
              <h2 className="font-titulo m-0 text-[23px] font-medium">{filtros.length ? filtros.join(' · ') : 'Toda la red'}</h2>
              <span className="text-sm text-[var(--c-muted)]">Clic en un nodo para ver el actor, sus relaciones y su fuente.</span>
            </div>
            <span className="text-sm font-semibold">Más conectados</span>
            <ul className="m-0 p-0 list-none flex flex-col">
              {top.map(([id, k]) => {
                const a = porId.get(id)!;
                return (
                  <li key={id}>
                    <button onClick={() => setSel(id)} className="w-full flex items-center gap-2 min-h-8 px-1.5 border-t border-[var(--c-border)] text-left text-sm">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: colorDe(a) }} />
                      <span className="grow font-semibold truncate">{a.nombre}</span>
                      <span className="text-xs text-[var(--c-muted)] tabular-nums">{k} rel.</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="px-3 py-2.5 rounded-xl bg-[var(--c-sunken)] flex flex-col gap-1.5 text-xs">
              <span className="font-bold text-sm">Cómo se alimenta</span>
              <div className="flex gap-1.5"><span className="px-2 py-0.5 h-fit rounded-md bg-[var(--c-warn-soft)] text-[var(--c-warn)] font-bold shrink-0">Desarrollador</span><span className="text-[var(--c-muted)]">{FUENTE_RED.desarrollador}</span></div>
              <div className="flex gap-1.5"><span className="px-2 py-0.5 h-fit rounded-md bg-[var(--c-border)] text-[var(--c-muted)] font-bold shrink-0">Web</span><span className="text-[var(--c-muted)]">{FUENTE_RED.web} Cada actor mostrará sus fuentes (Registraduría, Cuentas Claras, prensa); nada entra al grafo sin tu aprobación.</span></div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

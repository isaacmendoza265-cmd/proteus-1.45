/**
 * Ficha de un territorio (municipio, comuna, barrio o vereda) en cuatro secciones:
 * Política · Demografía · Censo electoral · Grupos.
 * Cada dato lleva su etiqueta: Oficial, Estimado o Sin información.
 */
import React, { useEffect, useMemo, useState } from 'react';
import {
  type TerritorioFicha, type EstadoDato, ETIQUETA_ESTADO,
  demografia, censoElectoral, grupos, politica, fmt, pct,
  cargarDemografia, cargarEconomia, economia, piramide2026 } from '../../services/territoryProfileService';
import { cargarElecciones, sumarEleccion, tipoEleccion, ELECCIONES_PENDIENTES, type EleccionPuestos } from '../../services/electionResultsService';
import type { PuestoVotacion } from '../../services/pollingStationsService';

type Seccion = 'politica' | 'demografia' | 'censo' | 'grupos';
const SECCIONES: [Seccion, string][] = [
  ['politica', 'Política'],
  ['demografia', 'Demografía'],
  ['censo', 'Censo electoral'],
  ['grupos', 'Grupos'],
];

const ESTILO_ESTADO: Record<EstadoDato, string> = {
  oficial: 'bg-[var(--c-ok-soft)] text-[var(--c-ok)]',
  estimado: 'bg-[var(--c-warn-soft)] text-[var(--c-warn)]',
  'sin-informacion': 'bg-[var(--c-border)] text-[var(--c-muted)]',
};

const Etiqueta: React.FC<{ estado: EstadoDato; texto?: string }> = ({ estado, texto }) => (
  <span className={`shrink-0 px-2 py-0.5 rounded-md text-xs font-bold ${ESTILO_ESTADO[estado]}`}>{texto ?? ETIQUETA_ESTADO[estado]}</span>
);

const Cifra: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="px-2.5 py-1.5 rounded-lg bg-[var(--c-sunken)] flex flex-col min-w-0">
    <span className="text-xs font-semibold text-[var(--c-muted)] truncate">{label}</span>
    <span className="text-base font-semibold tabular-nums">{value}</span>
  </div>
);

const Cabecera: React.FC<{ titulo: string; estado: EstadoDato; fuente?: string; etiqueta?: string }> = ({ titulo, estado, fuente, etiqueta }) => (
  <div className="flex flex-col gap-0.5">
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold grow">{titulo}</span>
      <Etiqueta estado={estado} texto={etiqueta} />
    </div>
    {fuente && <span className="text-xs text-[var(--c-muted)]">{fuente}</span>}
  </div>
);

const Aviso: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="m-0 text-sm text-[var(--c-muted)] px-3 py-2.5 rounded-xl bg-[var(--c-sunken)]">{children}</p>
);

interface FichaTerritorioProps {
  territorio: TerritorioFicha;
  /** Puestos cuyo punto cae dentro del territorio */
  puestosDentro: PuestoVotacion[];
  /** Códigos 2023 de los puestos con resultados ubicados dentro */
  codigosResultados?: string[];
  /** Puestos sin coordenadas del municipio */
  sinUbicar?: PuestoVotacion[];
  cargandoPuestos?: boolean;
  onVerRed?: () => void;
  onEntrar?: () => void;
  entrarLabel?: string;
  onUsarComoActivo?: () => void;
}

export const FichaTerritorio: React.FC<FichaTerritorioProps> = ({
  territorio: t, puestosDentro, codigosResultados = [], sinUbicar = [], cargandoPuestos, onVerRed, onEntrar, entrarLabel, onUsarComoActivo,
}) => {
  const [seccion, setSeccion] = useState<Seccion>('politica');
  const [eleccion, setEleccion] = useState<string>('alcaldia-2023');
  const [elecciones, setElecciones] = useState<EleccionPuestos[] | null>(null);
  useEffect(() => {
    let activo = true;
    setElecciones(null);
    cargarElecciones(t.dane).then((e) => { if (activo) setElecciones(e); });
    return () => { activo = false; };
  }, [t.dane]);
  const eleccionSel = elecciones?.find((x) => x.id === eleccion) ?? null;
  // Las pendientes solo se muestran si el municipio no tiene esa elección cargada
  const pendientes = ELECCIONES_PENDIENTES.filter((p) => elecciones !== null && !elecciones.some((e) => e.id === p.id));
  const pendiente = pendientes.find((x) => x.id === eleccion);
  /** Códigos de los puestos del territorio en la elección (2023 y 2026 usan códigos distintos) */
  const codigosDe = (e: EleccionPuestos): string[] | 'todos' =>
    t.tipo === 'municipio' ? 'todos'
      : e.codigos === '2026' ? puestosDentro.map((p) => p.codPuesto)
        : codigosResultados.filter((k) => k.startsWith(`${e.codigos}|`)).map((k) => k.slice(e.codigos.length + 1));
  const resultado = useMemo(() => (eleccionSel ? sumarEleccion(eleccionSel, codigosDe(eleccionSel)) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [eleccionSel, t.tipo, codigosResultados, puestosDentro]);
  // Años con elecciones cargadas (la más reciente primero) y la misma elección en otros años
  const anioSel = eleccionSel?.anio ?? Number(/(\d{4})/.exec(eleccion)?.[1] ?? 2023);
  const anios = useMemo(() => [...new Set([...(elecciones ?? []).map((e) => e.anio), ...(pendientes.length ? [2026] : [])])].sort((a, b) => b - a),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [elecciones]);
  const elegirAnio = (y: number) => {
    const delAnio = (elecciones ?? []).filter((e) => e.anio === y);
    const mismo = delAnio.find((e) => tipoEleccion(e.id) === tipoEleccion(eleccion));
    setEleccion((mismo ?? delAnio[0])?.id ?? pendientes[0]?.id ?? eleccion);
    setPuestoAbierto(null);
  };
  const comparacion = useMemo(() => {
    if (!eleccionSel || !elecciones) return [];
    return elecciones
      .filter((e) => tipoEleccion(e.id) === tipoEleccion(eleccionSel.id))
      .map((e) => {
        const r = sumarEleccion(e, codigosDe(e));
        const lider = r ? (e.porCandidato ? r.candidatos[0] : r.partidos[0]) : undefined;
        return { id: e.id, anio: e.anio, votantes: r?.votantes ?? 0, puestos: r?.puestos ?? 0, lider: lider?.nombre, detalle: lider && 'partido' in lider ? String(lider.partido) : undefined, pct: lider?.pct ?? 0 };
      })
      .sort((a, b) => b.anio - a.anio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eleccionSel, elecciones, t.tipo, codigosResultados, puestosDentro]);
  const [verTodosPuestos, setVerTodosPuestos] = useState(false);
  const [puestoAbierto, setPuestoAbierto] = useState<string | null>(null);
  // Resultados de cada puesto del territorio en la elección elegida
  const porPuesto = useMemo(() => {
    if (!eleccionSel) return [];
    const nombres2026 = new Map(puestosDentro.map((p) => [p.codPuesto, p.puesto]));
    const cods = codigosDe(eleccionSel);
    const lista = cods === 'todos' ? Object.keys(eleccionSel.puestos) : cods;
    const conCandidatos = eleccionSel.porCandidato;
    return lista.map((c) => {
      const r = sumarEleccion(eleccionSel, [c]);
      if (!r) return null;
      const top = conCandidatos
        ? r.candidatos.slice(0, 5).map((x) => ({ nombre: x.nombre, detalle: x.partido, pct: x.pct }))
        : r.partidos.slice(0, 5).map((x) => ({ nombre: x.nombre, detalle: 'Partido o lista', pct: x.pct }));
      return { codigo: c, nombre: titulo(eleccionSel.nombres[c] ?? nombres2026.get(c) ?? `Puesto ${c}`), votantes: r.votantes, habilitados: r.habilitados, top };
    }).filter((x): x is NonNullable<typeof x> => x !== null).sort((a, b) => b.votantes - a.votantes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eleccionSel, t.tipo, codigosResultados, puestosDentro]);
  const [demLista, setDemLista] = useState(0);
  useEffect(() => {
    let activo = true;
    cargarDemografia(t.dane).then((ok) => { if (activo && ok) setDemLista((n) => n + 1); });
    cargarEconomia(t.dane).then((ok) => { if (activo && ok) setDemLista((n) => n + 1); });
    return () => { activo = false; };
  }, [t.dane]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dem = useMemo(() => demografia(t), [t, demLista]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const eco = useMemo(() => economia(t), [t, demLista]);
  const pir = useMemo(() => piramide2026(t), [t]);
  const cen = useMemo(() => censoElectoral(t, puestosDentro, sinUbicar), [t, puestosDentro, sinUbicar]);
  const gru = useMemo(() => grupos(dem, cen), [dem, cen]);
  const pol = useMemo(() => politica(t), [t]);

  const tipoLabel = t.tipo === 'municipio' ? `Municipio · ${t.municipio}` : `${t.clase ?? ''} · ${t.municipio}`;
  const d = dem.datos;
  const maxEdad = d ? Math.max(1, ...d.edades) : 1;
  const totSexo = d ? d.hombres + d.mujeres : 0;

  return (
    <section className="proteus-civico rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-4 flex flex-col gap-3" aria-label={`Ficha de ${t.nombre}`}>
      <header className="flex flex-col gap-0.5">
        <span className="text-xs font-bold tracking-wide uppercase text-[var(--c-accent)]">{tipoLabel}</span>
        <h2 className="font-titulo m-0 text-[26px] leading-tight font-medium">{t.nombre}</h2>
      </header>

      <div className="grid grid-cols-2 gap-1.5">
        <Cifra label="Censo 2026" value={cargandoPuestos ? '…' : fmt(cen.censo)} />
        <Cifra label="Población 2018" value={fmt(d?.personas)} />
        <Cifra label="Puestos" value={cargandoPuestos ? '…' : fmt(cen.puestos.length + cen.sinUbicar.length)} />
        <Cifra label="Mesas" value={cargandoPuestos ? '…' : fmt(cen.mesas)} />
      </div>

      {(onEntrar || onUsarComoActivo) && (
        <div className="flex gap-1.5 flex-wrap">
          {onEntrar && (
            <button onClick={onEntrar} className="min-h-9 px-3 rounded-lg bg-[var(--c-accent)] text-white text-sm font-semibold">{entrarLabel ?? 'Entrar'}</button>
          )}
          {onUsarComoActivo && (
            <button onClick={onUsarComoActivo} className="min-h-9 px-3 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-sm font-semibold">Usar como territorio activo</button>
          )}
        </div>
      )}

      <div role="tablist" aria-label="Información del territorio" className="flex gap-0.5 border-b border-[var(--c-border)] overflow-x-auto">
        {SECCIONES.map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={seccion === id}
            onClick={() => setSeccion(id)}
            className={`min-h-9 px-1.5 -mb-px whitespace-nowrap text-[13px] font-semibold border-b-2 ${seccion === id ? 'border-[var(--c-accent)] text-[var(--c-ink)]' : 'border-transparent text-[var(--c-muted)] hover:text-[var(--c-ink)]'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {seccion === 'politica' && (
        <div className="flex flex-col gap-3" role="tabpanel">
          {anios.length > 1 && (
            <div role="group" aria-label="Año" className="flex flex-wrap gap-1">
              {anios.map((y) => (
                <button key={y} aria-pressed={anioSel === y} onClick={() => elegirAnio(y)}
                  className={`min-h-8 px-2.5 rounded-md text-xs font-bold tabular-nums border ${anioSel === y ? 'bg-[var(--c-accent)] border-[var(--c-accent)] text-white' : 'border-[var(--c-border)] bg-[var(--c-surface)]'}`}>
                  {y}
                </button>
              ))}
            </div>
          )}
          <div role="group" aria-label="Elección" className="flex flex-wrap gap-1">
            {[...(elecciones ?? []).filter((e) => e.anio === anioSel).map((e) => ({ id: e.id, nombre: e.nombre, disponible: true })),
              ...pendientes.filter(() => anioSel === 2026).map((e) => ({ id: e.id, nombre: e.nombre, disponible: false }))].map((o) => (
              <button key={o.id} aria-pressed={eleccion === o.id} onClick={() => { setEleccion(o.id); setPuestoAbierto(null); }} title={o.disponible ? undefined : 'Pendiente'}
                className={`min-h-8 px-2.5 rounded-md border text-xs font-semibold ${eleccion === o.id ? 'bg-[var(--c-accent-soft)] border-[var(--c-accent)] text-[var(--c-accent-text)]' : 'border-[var(--c-border)] bg-[var(--c-surface)]'} ${o.disponible ? '' : 'text-[var(--c-muted)] border-dashed'}`}>
                {o.nombre}
              </button>
            ))}
          </div>
          {elecciones === null && <Aviso>Cargando resultados…</Aviso>}
          {elecciones !== null && !elecciones.length && !pendiente && (
            <div className="flex flex-col gap-2 px-3 py-2.5 rounded-xl bg-[var(--c-sunken)]">
              <Cabecera titulo="Resultados por puesto" estado="sin-informacion" />
              <span className="text-sm text-[var(--c-muted)]">Proteus aún no tiene resultados por puesto de votación para {t.municipio}.</span>
            </div>
          )}
          {pendiente && (
            <Aviso><strong className="text-[var(--c-ink)]">{pendiente.nombre}: sin información.</strong> {pendiente.motivo}</Aviso>
          )}
          {eleccionSel && (resultado ? (
            <div className="flex flex-col gap-2 px-3 py-2.5 rounded-xl bg-[var(--c-sunken)]">
              <Cabecera titulo={t.tipo === 'municipio' ? eleccionSel.nombre : `${eleccionSel.nombre} en sus puestos`} estado="oficial" fuente={eleccionSel.tipo === 'escrutinio' ? `Registraduría, escrutinio oficial ${eleccionSel.fecha}, mesa a mesa` : `Registraduría, preconteo ${eleccionSel.fecha} · puede diferir del escrutinio`} />
              <span className="text-xs text-[var(--c-muted)]">{resultado.habilitados > 0
                ? `${fmt(resultado.votantes)} votantes de ${fmt(resultado.habilitados)} habilitados (${pct((100 * resultado.votantes) / Math.max(1, resultado.habilitados))})`
                : `${fmt(resultado.votantes)} votantes (el archivo de ${eleccionSel.anio} no trae habilitados)`} · {fmt(resultado.puestos)} puesto(s)</span>
              {eleccionSel.porCandidato ? (
                resultado.candidatos.slice(0, 6).map((c, i) => (
                  <div key={c.nombre} className="flex items-center gap-2 text-sm">
                    <span className="w-44 truncate font-semibold" title={c.partido}>{c.nombre}</span>
                    <span className="grow h-2 rounded bg-[var(--c-border)] overflow-hidden"><span className="block h-2" style={{ width: `${(100 * c.pct) / Math.max(0.01, resultado.candidatos[0].pct)}%`, background: i === 0 ? 'var(--c-accent)' : 'var(--c-muted)' }} /></span>
                    <span className="w-14 text-right tabular-nums">{pct(c.pct)}</span>
                  </div>
                ))
              ) : (<>
                <span className="text-xs font-bold text-[var(--c-muted)] mt-1">Partidos y listas</span>
                {resultado.partidos.slice(0, 8).map((c, i) => (
                  <div key={c.nombre} className="flex items-center gap-2 text-sm">
                    <span className="w-44 truncate font-semibold" title={c.nombre}>{c.nombre}</span>
                    <span className="grow h-2 rounded bg-[var(--c-border)] overflow-hidden"><span className="block h-2" style={{ width: `${(100 * c.pct) / Math.max(0.01, resultado.partidos[0].pct)}%`, background: i === 0 ? 'var(--c-accent)' : '#3E5C8A' }} /></span>
                    <span className="w-14 text-right tabular-nums">{pct(c.pct)}</span>
                  </div>
                ))}
                {resultado.candidatos.length > 0 && (<>
                  <span className="text-xs font-bold text-[var(--c-muted)] mt-1">Candidatos con más voto preferente</span>
                  {resultado.candidatos.slice(0, 8).map((c) => (
                    <div key={c.nombre + c.partido} className="flex items-center gap-2 text-sm">
                      <span className="flex flex-col grow min-w-0"><span className="font-semibold truncate">{c.nombre}</span><span className="text-xs text-[var(--c-muted)] truncate">{c.partido}</span></span>
                      <span className="w-16 text-right tabular-nums font-semibold">{fmt(c.votos)}</span>
                    </div>
                  ))}
                </>)}
              </>)}
              {t.tipo === 'municipio' && eleccionSel.id === 'alcaldia-2023' && pol.resultados.alcaldia && (
                <span className="text-xs text-[var(--c-muted)]">Escrutinio oficial: ganó {pol.resultados.alcaldia.candidatos[0]?.nombre} con {pct(pol.resultados.alcaldia.candidatos[0]?.pctValidos)}; participación {pct(pol.resultados.alcaldia.participacion)}.</span>
              )}
              <span className="text-xs text-[var(--c-muted)]">{t.tipo === 'municipio' ? (eleccionSel.tipo === 'escrutinio' ? 'Total municipal del escrutinio (suma de sus mesas). Habilitados: censo electoral 2026 de los puestos.' : 'Total municipal del preconteo.') : pol.resultados.texto}{eleccionSel.codigos === '2026' && !eleccionSel.porCandidato && t.tipo !== 'municipio' && resultado.candidatos.length ? ' En cada puesto se guardan los candidatos que suman el 97 % del voto preferente, así que sus cifras aquí son aproximadas por abajo.' : ''}</span>
            </div>
          ) : (
            <Aviso>No hay puestos de votación de esta elección dentro del territorio: sus residentes votan en puestos vecinos. No se reparte ni se estima.</Aviso>
          ))}
          {comparacion.length > 1 && (
            <div className="flex flex-col gap-1 px-3 py-2.5 rounded-xl border border-[var(--c-border)]">
              <Cabecera titulo="La misma elección en otros años" estado="oficial" fuente="Registraduría: escrutinio mesa a mesa (2015-2022, Presidencia 2026) y preconteo (2023, Congreso 2026)" />
              <div className="grid grid-cols-[3rem_1fr_auto] gap-x-2 gap-y-1 text-sm">
                {comparacion.map((c) => (
                  <React.Fragment key={c.id}>
                    <button onClick={() => { setEleccion(c.id); setPuestoAbierto(null); }} className={`text-left tabular-nums font-bold ${c.id === eleccionSel?.id ? 'text-[var(--c-accent)]' : ''}`}>{c.anio}</button>
                    <span className="min-w-0 flex flex-col"><span className="truncate font-semibold">{c.lider ?? 'Sin puestos en el territorio'}</span>{c.detalle && <span className="text-xs text-[var(--c-muted)] truncate">{c.detalle}</span>}</span>
                    <span className="text-right tabular-nums">{c.lider ? pct(c.pct) : '—'}<span className="block text-xs text-[var(--c-muted)]">{fmt(c.votantes)} votos</span></span>
                  </React.Fragment>
                ))}
              </div>
              {t.tipo !== 'municipio' && <span className="text-xs text-[var(--c-muted)]">Cada año se suman los puestos que ese año quedaban dentro del territorio (ubicados por su nombre). Los que no se pudieron ubicar cuentan solo en el total del municipio.</span>}
            </div>
          )}
          {!eleccionSel && !pendiente && elecciones !== null && elecciones.length === 0 && pol.resultados.alcaldia && t.tipo === 'municipio' && (
            <div className="flex flex-col gap-1 px-3 py-2.5 rounded-xl border border-[var(--c-border)]">
              <Cabecera titulo="Alcaldía 2023 (escrutinio municipal)" estado="oficial" />
              {pol.resultados.alcaldia.candidatos.slice(0, 5).map((c, i) => (
                <div key={c.nombre} className="flex items-center gap-2 text-sm">
                  <span className="w-44 truncate font-semibold" title={c.partido}>{c.nombre}</span>
                  <span className="grow h-2 rounded bg-[var(--c-border)] overflow-hidden"><span className="block h-2" style={{ width: `${c.pctValidos}%`, background: i === 0 ? 'var(--c-accent)' : 'var(--c-muted)' }} /></span>
                  <span className="w-14 text-right tabular-nums">{pct(c.pctValidos)}</span>
                </div>
              ))}
            </div>
          )}
          {porPuesto.length > 0 && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold grow">Resultados por puesto de votación ({fmt(porPuesto.length)})</span>
                <span className="text-xs text-[var(--c-muted)]">Clic para ver el detalle</span>
              </div>
              {(verTodosPuestos ? porPuesto : porPuesto.slice(0, 10)).map((f) => {
                const abierto = puestoAbierto === f.codigo;
                const lider = f.top[0];
                return (
                  <div key={f.codigo} className="border-t border-[var(--c-border)]">
                    <button onClick={() => setPuestoAbierto(abierto ? null : f.codigo)} aria-expanded={abierto} className="w-full flex items-center gap-2 py-1.5 text-left">
                      <span className="flex flex-col grow min-w-0">
                        <span className="text-sm font-semibold truncate">{f.nombre}</span>
                        <span className="text-xs text-[var(--c-muted)] truncate">{lider ? `Gana ${lider.nombre} (${pct(lider.pct)})` : 'Sin votos'}</span>
                      </span>
                      <span className="text-right shrink-0">
                        <span className="block text-sm tabular-nums font-semibold">{fmt(f.votantes)}</span>
                        {f.habilitados > 0 && <span className="block text-xs text-[var(--c-muted)]">{pct((100 * f.votantes) / Math.max(1, f.habilitados))} particip.</span>}
                      </span>
                    </button>
                    {abierto && (
                      <div className="flex flex-col gap-1 pb-2 pl-1">
                        {f.top.map((c, i) => (
                          <div key={c.nombre} className="flex items-center gap-2 text-xs">
                            <span className="w-40 truncate font-semibold" title={c.detalle}>{c.nombre}</span>
                            <span className="grow h-1.5 rounded bg-[var(--c-border)] overflow-hidden"><span className="block h-1.5" style={{ width: `${(100 * c.pct) / Math.max(0.01, f.top[0].pct)}%`, background: i === 0 ? 'var(--c-accent)' : 'var(--c-muted)' }} /></span>
                            <span className="w-12 text-right tabular-nums">{pct(c.pct)}</span>
                          </div>
                        ))}
                        <span className="text-xs text-[var(--c-muted)]">{fmt(f.votantes)} votantes{f.habilitados > 0 ? ` de ${fmt(f.habilitados)} habilitados` : ''}.</span>
                      </div>
                    )}
                  </div>
                );
              })}
              {porPuesto.length > 10 && (
                <button onClick={() => setVerTodosPuestos(!verTodosPuestos)} className="self-start min-h-8 px-2.5 rounded-md border border-[var(--c-border)] text-xs font-semibold">
                  {verTodosPuestos ? 'Ver menos' : `Ver los ${fmt(porPuesto.length)} puestos`}
                </button>
              )}
            </div>
          )}
          <Cabecera titulo="Actores con presencia declarada" estado="estimado" etiqueta="Sin verificar" fuente={pol.fuenteActores} />
          {pol.actores.length ? (
            <ul className="m-0 p-0 list-none flex flex-col">
              {pol.actores.map((a) => (
                <li key={a.id} className="py-1.5 border-t border-[var(--c-border)] flex flex-col">
                  <span className="text-sm font-semibold">{a.nombre}</span>
                  <span className="text-xs text-[var(--c-muted)]">{a.cargo} · {a.casa}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-sm text-[var(--c-muted)]">La base curada no asocia actores a este territorio.</span>
          )}
          {onVerRed && (
            <button onClick={onVerRed} className="self-start min-h-9 px-3 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-sm font-semibold">Ver la red de poder de {t.municipio}</button>
          )}
        </div>
      )}

      {seccion === 'demografia' && (
        <div className="flex flex-col gap-3" role="tabpanel">
          {d && dem.conDetalle ? (
            <>
              <Cabecera titulo="Población 2018" estado="oficial" fuente="DANE, CNPV 2018 · personas censadas por manzana" />
              <div className="grid grid-cols-3 gap-1.5">
                <Cifra label="Personas" value={fmt(d.personas)} />
                <Cifra label="Mujeres" value={fmt(d.mujeres)} />
                <Cifra label="Hombres" value={fmt(d.hombres)} />
                <Cifra label="Viviendas" value={fmt(d.viviendas)} />
                <Cifra label="Hogares" value={fmt(d.hogares)} />
                <Cifra label="Unid. económicas" value={fmt(d.unidadesEconomicas)} />
              </div>
              <div className="flex h-4 rounded overflow-hidden text-xs font-bold text-white">
                <div className="flex items-center pl-1.5 bg-[#3E5C8A]" style={{ width: `${(100 * d.hombres) / totSexo}%` }}>Hombres {Math.round((100 * d.hombres) / totSexo)} %</div>
                <div className="flex items-center justify-end pr-1.5 bg-[#A84A5E]" style={{ width: `${(100 * d.mujeres) / totSexo}%` }}>Mujeres {Math.round((100 * d.mujeres) / totSexo)} %</div>
              </div>
              <span className="text-xs font-bold text-[var(--c-muted)]">Población por edad (2018)</span>
              <div className="flex flex-col gap-0.5">
                {d.edades.map((v, i) => (
                  <div key={d.etiquetasEdad[i]} className="flex items-center gap-1.5 text-xs">
                    <span className="w-14 text-[var(--c-muted)] tabular-nums">{d.etiquetasEdad[i]}</span>
                    <span className="grow h-2 rounded-sm bg-[var(--c-sunken)] overflow-hidden"><span className="block h-2 bg-[#A84A5E]" style={{ width: `${(100 * v) / maxEdad}%` }} /></span>
                    <span className="w-14 text-right tabular-nums">{fmt(v)}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Aviso>
              <strong className="text-[var(--c-ink)]">Población: sin información por sexo y edad.</strong> {dem.motivo}
            </Aviso>
          )}
          {eco && eco.estado === 'oficial' && (
            <div className="flex flex-col gap-2 px-3 py-2.5 rounded-xl bg-[var(--c-sunken)]">
              <Cabecera titulo="Condiciones económicas (2018)" estado="oficial" fuente={eco.fuente} />
              <div className="grid grid-cols-3 gap-1.5">
                <Cifra label="Estrato típico" value={String(eco.estratoModa)} />
                <Cifra label="Estrato prom." value={eco.estratoPromedio!.toLocaleString('es-CO', { maximumFractionDigits: 1 })} />
                <Cifra label="IPM" value={eco.ipm == null ? '—' : pct(eco.ipm)} />
              </div>
              <span className="text-xs font-bold text-[var(--c-muted)]">Viviendas por estrato</span>
              <div className="flex h-5 rounded overflow-hidden text-[11px] font-bold text-white">
                {eco.estratos.slice(0, 6).map((v, i) => {
                  const tot = eco.estratos.slice(0, 6).reduce((a, b) => a + b, 0) || 1;
                  const w = (100 * v) / tot;
                  return w > 0 ? <div key={i} title={`Estrato ${i + 1}: ${fmt(v)} viviendas`} className="flex items-center justify-center" style={{ width: `${w}%`, background: ['#9B2C2C', '#C05621', '#B7791F', '#2F855A', '#2B6CB0', '#553C9A'][i] }}>{w >= 7 ? `E${i + 1} ${Math.round(w)} %` : ''}</div> : null;
                })}
              </div>
              {eco.vulnerabilidad && (
                <>
                  <span className="text-xs font-bold text-[var(--c-muted)] mt-1">Vulnerabilidad (personas)</span>
                  <div className="flex h-5 rounded overflow-hidden text-[11px] font-bold text-white">
                    {eco.vulnerabilidad.map((x, i) => (
                      x.pct > 0 ? <div key={x.nombre} title={`${x.nombre}: ${pct(x.pct)}`} className="flex items-center justify-center" style={{ width: `${x.pct}%`, background: ['#2F855A', '#68A063', '#B7791F', '#C05621', '#9B2C2C'][i] }}>{x.pct >= 10 ? `${Math.round(x.pct)} %` : ''}</div> : null
                    ))}
                  </div>
                </>
              )}
              <span className="text-xs font-bold text-[var(--c-muted)] mt-1">Servicios en la vivienda</span>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs">
                {eco.servicios.map((x) => <div key={x.nombre} className="flex justify-between"><span className="text-[var(--c-muted)]">{x.nombre}</span><span className="tabular-nums font-semibold">{pct(x.pct)}</span></div>)}
              </div>
              <span className="text-xs font-bold text-[var(--c-muted)] mt-1">Nivel educativo alcanzado (personas)</span>
              <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs">
                {eco.educacion.map((x) => <div key={x.nombre} className="flex justify-between"><span className="text-[var(--c-muted)]">{x.nombre}</span><span className="tabular-nums font-semibold">{pct(x.pct)}</span></div>)}
              </div>
              <span className="text-xs text-[var(--c-muted)]">Unidades económicas: {fmt(eco.unidadesEconomicas.total)} ({fmt(eco.unidadesEconomicas.comercio)} de comercio, {fmt(eco.unidadesEconomicas.servicios)} de servicios, {fmt(eco.unidadesEconomicas.industria)} de industria).</span>
              <span className="text-xs text-[var(--c-muted)]">{eco.nota}</span>
            </div>
          )}
          {pir && (() => {
            const max = Math.max(1, ...pir.hombres, ...pir.mujeres);
            const alcance = pir.alcance === 'municipio' ? 'todo el municipio' : pir.alcance === 'cabecera' ? 'la cabecera municipal' : 'el resto rural (centros poblados y rural disperso)';
            return (
              <div className="flex flex-col gap-1.5 px-3 py-2.5 rounded-xl border border-[var(--c-border)]">
                <Cabecera titulo="Sexo y edad 2026" estado="oficial" fuente={`${pir.fuente} · ${alcance}`} />
                <span className="text-xs text-[var(--c-muted)]">{fmt(pir.total)} personas; {fmt(pir.mayores18)} de 18 años o más ({pct((100 * pir.mayores18) / Math.max(1, pir.total))}).</span>
                <div className="flex justify-between text-xs font-bold text-[var(--c-muted)]"><span>Hombres</span><span>Mujeres</span></div>
                <div className="flex flex-col gap-px">
                  {[...pir.grupos].reverse().map((g, k) => {
                    const i = pir.grupos.length - 1 - k;
                    return (
                      <div key={g} className="grid grid-cols-[1fr_3rem_1fr] items-center gap-1 text-[11px]" title={`${g}: ${fmt(pir.hombres[i])} hombres, ${fmt(pir.mujeres[i])} mujeres`}>
                        <span className="flex justify-end"><span className="block h-2 rounded-l-sm bg-[#3E5C8A]" style={{ width: `${(100 * pir.hombres[i]) / max}%` }} /></span>
                        <span className="text-center tabular-nums text-[var(--c-muted)]">{g}</span>
                        <span><span className="block h-2 rounded-r-sm bg-[#A84A5E]" style={{ width: `${(100 * pir.mujeres[i]) / max}%` }} /></span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
          <div className="flex flex-col gap-1 px-3 py-2.5 rounded-xl border border-[var(--c-border)]">
            <Cabecera titulo="Proyección 2026" estado={dem.proyeccion.estado} />
            <span className="text-sm text-[var(--c-muted)]">{dem.proyeccion.texto}</span>
          </div>
          <span className="text-xs text-[var(--c-muted)]">Serie histórica: el Censo 2005 por comuna no está cargado en Proteus.</span>
        </div>
      )}

      {seccion === 'censo' && (
        <div className="flex flex-col gap-3" role="tabpanel">
          <Cabecera titulo="Censo electoral 2026" estado={cargandoPuestos ? 'sin-informacion' : cen.estado} etiqueta={cargandoPuestos ? 'Cargando' : undefined} fuente="Registraduría, censo 30-abr-2026 · suma de los puestos ubicados dentro" />
          <div className="grid grid-cols-3 gap-1.5">
            <Cifra label="Habilitados" value={fmt(cen.censo)} />
            <Cifra label="Mujeres" value={fmt(cen.mujeres)} />
            <Cifra label="Hombres" value={fmt(cen.hombres)} />
          </div>
          {cen.puestos.length > 0 && (
            <ul className="m-0 p-0 list-none flex flex-col">
              {cen.puestos.slice(0, 10).map((p) => (
                <li key={p.codPuesto} className="flex items-center gap-2 py-1.5 border-t border-[var(--c-border)] text-sm">
                  <span className="grow font-semibold truncate" title={p.divipole2023?.direccion ?? undefined}>{nombrePuesto(p)}</span>
                  <span className="tabular-nums font-semibold">{fmt(p.total)}</span>
                  <span className="w-16 text-right text-[var(--c-muted)]">{fmt(p.mesas)} mesas</span>
                </li>
              ))}
            </ul>
          )}
          <span className="text-xs text-[var(--c-muted)]">{cen.nota}</span>
        </div>
      )}

      {seccion === 'grupos' && (
        <div className="flex flex-col gap-3" role="tabpanel">
          <Cabecera titulo="Composición de la población de 18 años o más" estado={gru.estado} />
          {gru.filas.length > 0 && (
            <>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="text-[var(--c-muted)]">
                    <th className="text-left font-bold py-1">Edad</th>
                    <th className="text-right font-bold">%</th>
                    <th className="text-right font-bold">Mujeres</th>
                    <th className="text-right font-bold">Hombres</th>
                    <th className="text-right font-bold">Votantes</th>
                  </tr>
                </thead>
                <tbody>
                  {gru.filas.map((f) => (
                    <tr key={f.grupo} className="border-t border-[var(--c-border)] tabular-nums">
                      <td className="py-1 font-semibold">{f.grupo}</td>
                      <td className="text-right">{Math.round(f.pct)} %</td>
                      <td className="text-right">{fmt(f.votantesMujeres ?? f.mujeresPoblacion)}</td>
                      <td className="text-right">{fmt(f.votantesHombres ?? f.hombresPoblacion)}</td>
                      <td className="text-right font-semibold">{f.votantesMujeres == null ? '—' : fmt((f.votantesMujeres ?? 0) + (f.votantesHombres ?? 0))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <span className="text-xs font-bold text-[var(--c-muted)]">Segmentos cruzados (sexo × edad)</span>
              <div className="grid grid-cols-2 gap-1.5">
                {gru.segmentos.map((s) => (
                  <Cifra key={s.etiqueta} label={s.etiqueta} value={`${fmt(s.valor)}${s.unidad === 'habitantes' ? ' hab.' : ''}`} />
                ))}
              </div>
            </>
          )}
          <span className="text-xs text-[var(--c-muted)]">{gru.nota}</span>
        </div>
      )}
    </section>
  );
};

const titulo = (s: string) => s.toLowerCase().replace(/(^|[\s(.-])(\S)/g, (_m, a: string, b: string) => a + b.toUpperCase());
const nombrePuesto = (p: PuestoVotacion) => titulo(p.puesto);

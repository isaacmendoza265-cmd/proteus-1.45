/**
 * Ficha de un territorio (municipio, comuna, barrio o vereda) en cuatro secciones:
 * Política · Demografía · Censo electoral · Grupos.
 * Cada dato lleva su etiqueta: Oficial, Estimado o Sin información.
 */
import React, { useEffect, useMemo, useState } from 'react';
import {
  type TerritorioFicha, type EstadoDato, ETIQUETA_ESTADO, EDADES_DANE,
  demografia, censoElectoral, grupos, politica, fmt, pct,
  cargarElecciones2026, sumarEleccion, ELECCIONES_PENDIENTES, type EleccionPuestos,
  puestosConResultados, sumarResultadosPuestos,
} from '../../services/territoryProfileService';
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
  const [eleccion, setEleccion] = useState<string>('local-2023');
  const [elecciones2026, setElecciones2026] = useState<EleccionPuestos[]>([]);
  useEffect(() => {
    let activo = true;
    cargarElecciones2026(t.dane).then((e) => { if (activo) setElecciones2026(e); });
    return () => { activo = false; };
  }, [t.dane]);
  const res2026 = useMemo(() => {
    const e = elecciones2026.find((x) => x.id === eleccion);
    if (!e) return null;
    return sumarEleccion(e, t.tipo === 'municipio' ? 'todos' : puestosDentro.map((p) => p.codPuesto));
  }, [elecciones2026, eleccion, t.tipo, puestosDentro]);
  const pendiente = ELECCIONES_PENDIENTES.find((x) => x.id === eleccion);
  const [verTodosPuestos, setVerTodosPuestos] = useState(false);
  const [puestoAbierto, setPuestoAbierto] = useState<string | null>(null);
  // Resultados de cada puesto del territorio en la elección elegida
  const porPuesto = useMemo(() => {
    type Fila = { codigo: string; nombre: string; votantes: number; habilitados: number; top: { nombre: string; detalle: string; pct: number }[] };
    const filas: Fila[] = [];
    if (eleccion === 'local-2023') {
      const lista = puestosConResultados(t.dane);
      const dentro = new Set(codigosResultados);
      for (const p of lista) {
        if (t.tipo !== 'municipio' && !dentro.has(p.codigo)) continue;
        const r = sumarResultadosPuestos(t.dane, [p.codigo]);
        if (r) filas.push({ codigo: p.codigo, nombre: p.nombre, votantes: r.votantes, habilitados: r.habilitados, top: r.alcaldia.slice(0, 5).map((c) => ({ nombre: c.nombre, detalle: c.partido, pct: c.pct })) });
      }
    } else {
      const e = elecciones2026.find((x) => x.id === eleccion);
      if (e) {
        const nombres = new Map(puestosDentro.map((p) => [p.codPuesto, p.puesto]));
        const codigos = t.tipo === 'municipio' ? Object.keys(e.puestos) : puestosDentro.map((p) => p.codPuesto);
        for (const c of codigos) {
          const r = sumarEleccion(e, [c]);
          if (r) filas.push({ codigo: c, nombre: titulo(nombres.get(c) ?? `Puesto ${c}`), votantes: r.votantes, habilitados: r.habilitados, top: r.partidos.slice(0, 5).map((x) => ({ nombre: x.nombre, detalle: 'Partido o lista', pct: x.pct })) });
        }
      }
    }
    return filas.sort((a, b) => b.votantes - a.votantes);
  }, [eleccion, t, codigosResultados, elecciones2026, puestosDentro]);
  const dem = useMemo(() => demografia(t), [t]);
  const cen = useMemo(() => censoElectoral(t, puestosDentro, sinUbicar), [t, puestosDentro, sinUbicar]);
  const gru = useMemo(() => grupos(dem, cen), [dem, cen]);
  const pol = useMemo(() => politica(t, codigosResultados), [t, codigosResultados]);

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
          <div role="group" aria-label="Elección" className="flex flex-wrap gap-1">
            {[{ id: 'local-2023', nombre: 'Alcaldía y Concejo 2023', disponible: true },
              ...elecciones2026.map((e) => ({ id: e.id, nombre: e.nombre, disponible: true })),
              ...ELECCIONES_PENDIENTES.map((e) => ({ id: e.id, nombre: e.nombre, disponible: false }))].map((o) => (
              <button key={o.id} aria-pressed={eleccion === o.id} onClick={() => setEleccion(o.id)} title={o.disponible ? undefined : 'Pendiente'}
                className={`min-h-8 px-2.5 rounded-md border text-xs font-semibold ${eleccion === o.id ? 'bg-[var(--c-accent-soft)] border-[var(--c-accent)] text-[var(--c-accent-text)]' : 'border-[var(--c-border)] bg-[var(--c-surface)]'} ${o.disponible ? '' : 'text-[var(--c-muted)] border-dashed'}`}>
                {o.nombre}
              </button>
            ))}
          </div>
          {eleccion === 'local-2023' && (<>
          <div className="flex flex-col gap-2 px-3 py-2.5 rounded-xl bg-[var(--c-sunken)]">
            <Cabecera titulo={pol.resultados.ambito === 'municipio' ? 'Alcaldía 2023' : pol.porPuestos ? 'Alcaldía 2023 en sus puestos' : 'Resultados electorales históricos'} estado={pol.resultados.estado} />
            <span className="text-sm text-[var(--c-muted)]">{pol.resultados.texto}</span>
            {pol.resultados.ambito === 'municipio' && pol.resultados.alcaldia && (
              <div className="flex flex-col gap-1">
                {pol.resultados.alcaldia.candidatos.slice(0, 5).map((c, i) => (
                  <div key={c.nombre} className="flex items-center gap-2 text-sm">
                    <span className="w-44 truncate font-semibold" title={c.partido}>{c.nombre}</span>
                    <span className="grow h-2 rounded bg-[var(--c-border)] overflow-hidden">
                      <span className="block h-2" style={{ width: `${c.pctValidos}%`, background: i === 0 ? 'var(--c-accent)' : 'var(--c-muted)' }} />
                    </span>
                    <span className="w-14 text-right tabular-nums">{pct(c.pctValidos)}</span>
                  </div>
                ))}
              </div>
            )}
            {pol.porPuestos && pol.resultados.ambito === 'territorio' && (
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[var(--c-muted)]">Alcaldía 2023 · {fmt(pol.porPuestos.votantes)} votantes de {fmt(pol.porPuestos.habilitados)} habilitados ({pct((100 * pol.porPuestos.votantes) / Math.max(1, pol.porPuestos.habilitados))})</span>
                {pol.porPuestos.alcaldia.slice(0, 5).map((c, i) => (
                  <div key={c.nombre} className="flex items-center gap-2 text-sm">
                    <span className="w-44 truncate font-semibold" title={c.partido}>{c.nombre}</span>
                    <span className="grow h-2 rounded bg-[var(--c-border)] overflow-hidden">
                      <span className="block h-2" style={{ width: `${c.pct}%`, background: i === 0 ? 'var(--c-accent)' : 'var(--c-muted)' }} />
                    </span>
                    <span className="w-14 text-right tabular-nums">{pct(c.pct)}</span>
                  </div>
                ))}
              </div>
            )}
            {pol.resultados.ambito === 'territorio' && pol.resultados.alcaldia && !pol.porPuestos && (
              <span className="text-xs text-[var(--c-muted)]">
                Referencia municipal: ganó {pol.resultados.alcaldia.candidatos[0]?.nombre} ({pol.resultados.alcaldia.candidatos[0]?.partido}) con {pct(pol.resultados.alcaldia.candidatos[0]?.pctValidos)}; participación {pct(pol.resultados.alcaldia.participacion)}.
              </span>
            )}
          </div>
          {pol.porPuestos && (
            <div className="flex flex-col gap-1.5 px-3 py-2.5 rounded-xl border border-[var(--c-border)]">
              <Cabecera titulo={pol.resultados.ambito === 'municipio' ? 'Concejo 2023 por partido (preconteo)' : 'Concejo 2023 en sus puestos'} estado="oficial" fuente="Registraduría, preconteo 29-oct-2023 · puede diferir levemente del escrutinio" />
              {pol.porPuestos.concejo.slice(0, 6).map((c) => (
                <div key={c.partido} className="flex items-center gap-2 text-sm">
                  <span className="w-44 truncate font-semibold" title={c.partido}>{c.partido}</span>
                  <span className="grow h-2 rounded bg-[var(--c-sunken)] overflow-hidden"><span className="block h-2 bg-[#3E5C8A]" style={{ width: `${c.pct}%` }} /></span>
                  <span className="w-14 text-right tabular-nums">{pct(c.pct)}</span>
                </div>
              ))}
            </div>
          )}
          </>)}
          {pendiente && (
            <Aviso><strong className="text-[var(--c-ink)]">{pendiente.nombre}: sin información.</strong> {pendiente.motivo}</Aviso>
          )}
          {!pendiente && eleccion !== 'local-2023' && (res2026 ? (
            <div className="flex flex-col gap-2 px-3 py-2.5 rounded-xl bg-[var(--c-sunken)]">
              <Cabecera titulo={t.tipo === 'municipio' ? res2026.nombre : `${res2026.nombre} en sus puestos`} estado="oficial" fuente="Registraduría, preconteo 8-mar-2026 · puede diferir del escrutinio" />
              <span className="text-xs text-[var(--c-muted)]">{fmt(res2026.votantes)} votantes de {fmt(res2026.habilitados)} habilitados ({pct((100 * res2026.votantes) / Math.max(1, res2026.habilitados))}) · {fmt(res2026.puestos)} puesto(s)</span>
              <span className="text-xs font-bold text-[var(--c-muted)] mt-1">Partidos y listas</span>
              {res2026.partidos.slice(0, 8).map((c, i) => (
                <div key={c.nombre} className="flex items-center gap-2 text-sm">
                  <span className="w-44 truncate font-semibold" title={c.nombre}>{c.nombre}</span>
                  <span className="grow h-2 rounded bg-[var(--c-border)] overflow-hidden"><span className="block h-2" style={{ width: `${(100 * c.pct) / Math.max(0.01, res2026.partidos[0].pct)}%`, background: i === 0 ? 'var(--c-accent)' : '#3E5C8A' }} /></span>
                  <span className="w-14 text-right tabular-nums">{pct(c.pct)}</span>
                </div>
              ))}
              {res2026.candidatos.length > 0 && (<>
                <span className="text-xs font-bold text-[var(--c-muted)] mt-1">Candidatos con más voto preferente</span>
                {res2026.candidatos.slice(0, 8).map((c) => (
                  <div key={c.nombre + c.partido} className="flex items-center gap-2 text-sm">
                    <span className="flex flex-col grow min-w-0"><span className="font-semibold truncate">{c.nombre}</span><span className="text-xs text-[var(--c-muted)] truncate">{c.partido}</span></span>
                    <span className="w-16 text-right tabular-nums font-semibold">{fmt(c.votos)}</span>
                  </div>
                ))}
              </>)}
              <span className="text-xs text-[var(--c-muted)]">{t.tipo === 'municipio' ? 'Total municipal del preconteo.' : 'Suma de los puestos ubicados dentro; en cada puesto se guardan los candidatos que suman el 97 % del voto preferente, así que las cifras de candidatos son aproximadas por abajo. Los puestos sin coordenadas solo cuentan en el total municipal.'}</span>
            </div>
          ) : (
            <Aviso>{elecciones2026.length ? 'No hay puestos de votación de 2026 dentro de este territorio: sus residentes votan en puestos vecinos.' : 'Cargando…'}</Aviso>
          ))}
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
                        <span className="block text-xs text-[var(--c-muted)]">{pct((100 * f.votantes) / Math.max(1, f.habilitados))} particip.</span>
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
                        <span className="text-xs text-[var(--c-muted)]">{fmt(f.votantes)} votantes de {fmt(f.habilitados)} habilitados.</span>
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
                  <div key={EDADES_DANE[i]} className="flex items-center gap-1.5 text-xs">
                    <span className="w-14 text-[var(--c-muted)] tabular-nums">{EDADES_DANE[i]}</span>
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

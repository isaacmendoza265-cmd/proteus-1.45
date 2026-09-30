/**
 * Concejo 2023 por partido y candidato (nivel municipal), dentro de la ficha del municipio.
 * Datos: concejo2023Service (escrutinio E-24/E-26 en 13 municipios, preconteo ≥ 98 % de mesas en 86;
 * 26 sin datos sólidos, que se muestran como "Sin información" sin ninguna cifra).
 */
import React, { useEffect, useMemo, useState } from 'react';
import { cargarConcejo2023, type Concejo2023 } from '../../services/concejo2023Service';
import { ETIQUETA_ESTADO, type EstadoDato, fmt, pct } from '../../services/territoryProfileService';

const ESTILO: Record<EstadoDato, string> = {
  oficial: 'bg-[var(--c-ok-soft)] text-[var(--c-ok)]',
  estimado: 'bg-[var(--c-warn-soft)] text-[var(--c-warn)]',
  'sin-informacion': 'bg-[var(--c-border)] text-[var(--c-muted)]',
};

const Sello: React.FC<{ estado: EstadoDato; texto?: string }> = ({ estado, texto }) => (
  <span className={`shrink-0 px-2 py-0.5 rounded-md text-xs font-bold ${ESTILO[estado]}`}>{texto ?? ETIQUETA_ESTADO[estado]}</span>
);

const Cifra: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="px-2 py-1 rounded-lg bg-[var(--c-sunken)] flex flex-col min-w-0">
    <span className="text-xs font-semibold text-[var(--c-muted)] truncate">{label}</span>
    <span className="text-sm font-semibold tabular-nums">{value}</span>
  </div>
);

const pctMesasTxt = (n: number | null) => (n == null ? '—' : `${n.toLocaleString('es-CO', { maximumFractionDigits: 2 })} %`);

function fuenteTexto(c: Concejo2023): string {
  if (c.tipo === 'escrutinio') return `Registraduría, escrutinio oficial (${/E-26/.test(c.fuente ?? '') ? 'E-26 CON' : 'E-24 CON'}), transcrito y verificado`;
  return `Registraduría, preconteo oficial al ${pctMesasTxt(c.pctMesas)} de las mesas · puede diferir del escrutinio`;
}

export const Concejo2023Candidatos: React.FC<{ dane: string; municipio: string }> = ({ dane, municipio }) => {
  const [datos, setDatos] = useState<Concejo2023 | null | undefined>(undefined);
  const [busqueda, setBusqueda] = useState('');
  useEffect(() => {
    let activo = true;
    setDatos(undefined);
    setBusqueda('');
    cargarConcejo2023(dane).then((d) => { if (activo) setDatos(d); });
    return () => { activo = false; };
  }, [dane]);

  const q = busqueda.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const partidos = useMemo(() => {
    if (!datos) return [];
    if (!q) return datos.partidos;
    const hay = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(q);
    return datos.partidos
      .map((p) => ({ ...p, candidatos: hay(p.nombre) ? p.candidatos : p.candidatos.filter((c) => hay(c.nombre)) }))
      .filter((p) => p.candidatos.length > 0 || hay(p.nombre));
  }, [datos, q]);

  if (datos === undefined) return <p className="m-0 text-sm text-[var(--c-muted)]">Cargando el Concejo 2023 por candidato…</p>;
  if (datos === null) return null;

  if (datos.estado === 'sin-datos') {
    return (
      <div className="flex flex-col gap-1 px-3 py-2.5 rounded-xl border border-[var(--c-border)]">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold grow">Concejo 2023 por candidato</span>
          <Sello estado="sin-informacion" />
        </div>
        <span className="text-sm text-[var(--c-muted)]">
          No se han publicado datos electorales sólidos de {municipio}: el preconteo llegó al {pctMesasTxt(datos.pctMesas)} de las
          mesas (se exige al menos el 98 %) y el escrutinio E-24 aún no se ha transcrito. Proteus no muestra ni estima votos por candidato.
        </span>
      </div>
    );
  }

  const nCandidatos = datos.partidos.reduce((s, p) => s + p.candidatos.length, 0);
  const incompleto = datos.estado === 'incompleto';
  return (
    <div className="flex flex-col gap-2 px-3 py-2.5 rounded-xl border border-[var(--c-border)]">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold grow">Concejo 2023 por candidato</span>
          <Sello estado="oficial" texto={incompleto ? 'Oficial · incompleto' : undefined} />
        </div>
        <span className="text-xs text-[var(--c-muted)]">{fuenteTexto(datos)}</span>
      </div>
      {incompleto && datos.nota && (
        <p className="m-0 text-sm px-3 py-2 rounded-lg bg-[var(--c-warn-soft)] text-[var(--c-ink)]"><strong>Atención:</strong> {datos.nota}</p>
      )}
      <div className="grid grid-cols-2 gap-1.5">
        <Cifra label="Votos por listas" value={fmt(datos.votosPartidos)} />
        <Cifra label="En blanco" value={`${fmt(datos.blanco)} (${pct((100 * datos.blanco) / Math.max(1, datos.validos))})`} />
        <Cifra label="Nulos" value={fmt(datos.nulos)} />
        <Cifra label="No marcados" value={fmt(datos.noMarcados)} />
      </div>
      <span className="text-xs text-[var(--c-muted)]">
        {fmt(datos.partidos.length)} listas y {fmt(nCandidatos)} candidatos
        {datos.totalCurules != null ? ` · ${fmt(datos.totalCurules)} curules para listas (escrutinio)` : ' · curules sin publicar'}.
        Porcentajes de lista sobre votos válidos (listas + blanco); de candidato, sobre el total de su lista.
      </span>
      {nCandidatos > 40 && (
        <input type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar candidato o partido"
          aria-label="Buscar candidato o partido del Concejo 2023"
          className="min-h-9 px-2.5 rounded-lg border border-[var(--c-border-campo)] bg-[var(--c-surface)] text-sm" />
      )}
      <div className="flex flex-col">
        {partidos.map((p, i) => (
          <details key={p.nombre} open={!!q} className="group border-t border-[var(--c-border)] first:border-t-0">
            <summary className="flex items-center gap-2 py-1.5 cursor-pointer list-none">
              <span className="text-[var(--c-muted)] transition-transform group-open:rotate-90" aria-hidden>▸</span>
              <span className="flex flex-col grow min-w-0">
                <span className="text-sm font-semibold leading-snug line-clamp-2" title={p.nombre}>{p.nombre}</span>
                <span className="h-1.5 rounded bg-[var(--c-border)] overflow-hidden mt-0.5">
                  <span className="block h-1.5" style={{ width: `${(100 * p.total) / Math.max(1, datos.partidos[0].total)}%`, background: i === 0 && !q ? 'var(--c-accent)' : '#3E5C8A' }} />
                </span>
              </span>
              {p.curules != null && p.curules > 0 && (
                <span className="shrink-0 px-1.5 py-0.5 rounded-md text-xs font-bold bg-[var(--c-accent-soft)] text-[var(--c-accent-text)]">{p.curules} {p.curules === 1 ? 'curul' : 'curules'}</span>
              )}
              <span className="shrink-0 text-right">
                <span className="block text-sm tabular-nums font-semibold whitespace-nowrap">{pct(p.pctValidos)}</span>
                <span className="block text-xs text-[var(--c-muted)] tabular-nums">{fmt(p.total)}</span>
              </span>
            </summary>
            <div className="flex flex-col gap-1 pb-2 pl-4">
              {p.soloLista > 0 && !q && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="grow italic text-[var(--c-muted)]">Voto solo por la lista</span>
                  <span className="w-16 shrink-0 text-right tabular-nums">{fmt(p.soloLista)}</span>
                  <span className="w-14 shrink-0 whitespace-nowrap text-right tabular-nums text-xs text-[var(--c-muted)]">{pct((100 * p.soloLista) / Math.max(1, p.total))}</span>
                </div>
              )}
              {p.candidatos.map((c) => (
                <div key={c.codigo} className="flex items-center gap-2 text-sm">
                  <span className="w-6 shrink-0 tabular-nums text-xs text-[var(--c-muted)]" title="Número en el tarjetón">{c.codigo}</span>
                  <span className="grow min-w-0 font-semibold leading-snug">{c.nombre}</span>
                  <span className="w-16 shrink-0 text-right tabular-nums">{fmt(c.votos)}</span>
                  <span className="w-14 shrink-0 whitespace-nowrap text-right tabular-nums text-xs text-[var(--c-muted)]">{pct(c.pctLista)}</span>
                </div>
              ))}
              {!p.candidatos.length && <span className="text-xs text-[var(--c-muted)]">Lista sin voto preferente registrado.</span>}
            </div>
          </details>
        ))}
        {q && !partidos.length && <span className="text-sm text-[var(--c-muted)] py-1">Ningún candidato o partido coincide con «{busqueda}».</span>}
      </div>
      <span className="text-xs text-[var(--c-muted)]">
        {datos.tipo === 'preconteo'
          ? 'El preconteo al 100 % difiere del escrutinio en 1 a 3 votos por candidato en promedio; el total municipal puede variar hasta ±5 % porque el escrutinio reclasifica votos.'
          : 'Escrutinio: votos por candidato y por lista del formulario oficial de la comisión escrutadora.'}
        {' '}Las curules salen del escrutinio municipal; aquí no se marca quién resultó electo.
      </span>
    </div>
  );
};

export default Concejo2023Candidatos;

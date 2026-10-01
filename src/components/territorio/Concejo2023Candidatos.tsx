/**
 * Concejo por partido y candidato, dentro de la ficha.
 * - 2023 (nivel municipal): concejo2023Service (escrutinio E-24/E-26 en 13 municipios, preconteo ≥ 98 % de
 *   mesas en 86; 26 sin datos sólidos, que se muestran como "Sin información" sin ninguna cifra).
 * - 2019 y 2015: escrutinio mesa a mesa (MMV) por puesto, ya cargado en electionResultsService; se suma el
 *   municipio o los puestos que quedan dentro del territorio.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { cargarConcejo2023, concejoDesdeEleccion, type Concejo2023 } from '../../services/concejo2023Service';
import type { EleccionPuestos } from '../../services/electionResultsService';
import { curulesConcejo } from '../../services/perfilMunicipalService';
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

const sinTildes = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

interface VistaProps {
  datos: Concejo2023;
  titulo: string;
  fuente: string;
  /** Texto de curules cuando no hay (p. ej. años sin curules cargadas) */
  sinCurules: string;
  pie: string;
  aviso?: React.ReactNode;
  /** Curules a proveer según la Registraduría (incluye la del Estatuto de la Oposición) */
  curulesAProveer?: number;
}

/** Vista común: listas desplegables con su voto solo por la lista y cada candidato */
export const VistaConcejo: React.FC<VistaProps> = ({ datos, titulo, fuente, sinCurules, pie, aviso, curulesAProveer }) => {
  const [busqueda, setBusqueda] = useState('');
  const q = sinTildes(busqueda.trim());
  const partidos = useMemo(() => {
    if (!q) return datos.partidos;
    const hay = (s: string) => sinTildes(s).includes(q);
    return datos.partidos
      .map((p) => ({ ...p, candidatos: hay(p.nombre) ? p.candidatos : p.candidatos.filter((c) => hay(c.nombre)) }))
      .filter((p) => p.candidatos.length > 0 || hay(p.nombre));
  }, [datos, q]);
  const nCandidatos = datos.partidos.reduce((s, p) => s + p.candidatos.length, 0);
  const incompleto = datos.estado === 'incompleto';
  const conCodigo = datos.partidos.some((p) => p.candidatos.some((c) => c.codigo));
  return (
    <div className="flex flex-col gap-2 px-3 py-2.5 rounded-xl border border-[var(--c-border)]">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold grow">{titulo}</span>
          <Sello estado="oficial" texto={incompleto ? 'Oficial · incompleto' : undefined} />
        </div>
        <span className="text-xs text-[var(--c-muted)]">{fuente}</span>
        {datos.candidatosParciales && (
          <span className="text-xs text-[var(--c-muted)]">Totales de lista exactos. Por candidato, mínimos: en cada puesto se guardan los que suman el 97 % del voto preferente (hasta 25); el total exacto está en la ficha del municipio.</span>
        )}
      </div>
      {aviso}
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
        {curulesAProveer != null && ` · ${fmt(curulesAProveer)} curules a proveer (Registraduría)`}
        {datos.totalCurules != null ? ` · ${fmt(datos.totalCurules)} repartidas a listas (escrutinio)` : curulesAProveer == null ? ` · ${sinCurules}` : ''}.
        Porcentajes de lista sobre votos válidos (listas + blanco); de candidato, sobre el total de su lista.
      </span>
      {nCandidatos > 40 && (
        <input type="search" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar candidato o partido"
          aria-label={`Buscar candidato o partido: ${titulo}`}
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
              {p.candidatos.map((c, j) => (
                <div key={c.codigo || `${j}-${c.nombre}`} className="flex items-center gap-2 text-sm">
                  {conCodigo && <span className="w-6 shrink-0 tabular-nums text-xs text-[var(--c-muted)]" title="Número en el tarjetón">{c.codigo}</span>}
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
      <span className="text-xs text-[var(--c-muted)]">{pie}</span>
    </div>
  );
};

/** Concejo 2023 por candidato (nivel municipal) */
export const Concejo2023Candidatos: React.FC<{ dane: string; municipio: string }> = ({ dane, municipio }) => {
  const [datos, setDatos] = useState<Concejo2023 | null | undefined>(undefined);
  useEffect(() => {
    let activo = true;
    setDatos(undefined);
    cargarConcejo2023(dane).then((d) => { if (activo) setDatos(d); });
    return () => { activo = false; };
  }, [dane]);

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
  return (
    <VistaConcejo key={dane} datos={datos} titulo="Concejo 2023 por candidato" curulesAProveer={curulesConcejo(dane, '2023')?.curules} fuente={fuenteTexto(datos)} sinCurules="curules sin publicar"
      pie={`${datos.tipo === 'preconteo'
        ? 'El preconteo al 100 % difiere del escrutinio en 1 a 3 votos por candidato en promedio; el total municipal puede variar hasta ±5 % porque el escrutinio reclasifica votos.'
        : 'Escrutinio: votos por candidato y por lista del formulario oficial de la comisión escrutadora.'} Las curules salen del escrutinio municipal; aquí no se marca quién resultó electo.`} />
  );
};

/** Corporación con voto preferente por candidato (Concejo y Asamblea 2019-2015, Cámara 2026-2022): suma del
 *  municipio o de los puestos que quedan dentro del territorio */
export const ConcejoHistoricoCandidatos: React.FC<{ eleccion: EleccionPuestos; codigos: string[] | 'todos'; municipio: string; territorio?: string }> = ({ eleccion, codigos, municipio, territorio }) => {
  // Clave estable: la ficha crea la lista de códigos en cada render
  const clave = `${eleccion.id}|${codigos === 'todos' ? 'todos' : codigos.join(',')}`;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const datos = useMemo(() => concejoDesdeEleccion(eleccion, codigos, municipio), [eleccion, clave, municipio]);
  if (!datos || !datos.partidos.some((p) => p.candidatos.length)) return null;
  const enPuestos = codigos !== 'todos';
  const departamental = /^(asamblea|camara)-/.test(eleccion.id);
  const corporacion = eleccion.id.startsWith('asamblea') ? 'la Asamblea' : 'la Cámara';
  const fuente = eleccion.tipo === 'preconteo'
    ? `Registraduría, preconteo del ${eleccion.fecha} · puede diferir del escrutinio`
    : `Registraduría, escrutinio oficial mesa a mesa (MMV) del ${eleccion.fecha}`;
  return (
    <VistaConcejo key={clave} datos={datos}
      titulo={`${eleccion.nombre} por candidato${enPuestos ? ` en los puestos de ${territorio ?? 'este territorio'}` : ` en ${municipio}`}`}
      fuente={`${fuente}${enPuestos ? ` · ${fmt(codigos.length)} puesto(s)` : ''}`}
      sinCurules={departamental ? `las curules de ${corporacion} se reparten con los votos de todo Antioquia, no por municipio` : 'Proteus todavía no tiene las curules de ese año'}
      pie={`${departamental ? `Votos depositados en este territorio; ${corporacion} se elige en todo Antioquia. ` : ''}${enPuestos
        ? 'Suma de los puestos que ese año quedaban dentro del territorio (ubicados por su nombre); los que no se pudieron ubicar cuentan solo en el municipio. '
        : ''}El voto solo por la lista es el total de la lista menos el voto preferente de sus candidatos. Aquí no se marca quién resultó electo.`} />
  );
};

export default Concejo2023Candidatos;

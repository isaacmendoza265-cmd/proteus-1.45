/**
 * Marco metodológico de Proteus: las 4 capas y los bloques ingestados de cada una.
 * Capa 1 (bloque 1): reglamento de interpretación v1.2 y dossier de fuentes de la Familia 4 (arrastre).
 * Las capas 2, 3 y 4 quedan listas para recibir sus bloques (scripts/ingestar_marco.mjs).
 */
import React, { useMemo, useState } from 'react';
import { BookOpen, FileText, CircleDashed, CheckCircle2 } from 'lucide-react';
import { NOMBRE_MARCO, type IdCapa } from '../../data/marco/capas';
import {
  CAPAS,
  bloquesDeCapa,
  leerDossier,
  leerReglamento,
  textoBloque,
  type BloqueMarco,
  type Dossier,
  type Reglamento,
} from '../../services/marcoService';

const ESTADO_BLOQUE: Record<BloqueMarco['estado'], string> = {
  bruto: 'bg-[var(--c-border)] text-[var(--c-muted)]',
  revisado: 'bg-[var(--c-warn-soft)] text-[var(--c-warn)]',
  publicado: 'bg-[var(--c-ok-soft)] text-[var(--c-ok)]',
};

const Tarjeta: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <section className={`p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] flex flex-col gap-3 ${className}`}>{children}</section>
);

const Desplegable: React.FC<{ titulo: React.ReactNode; children: React.ReactNode; abierto?: boolean }> = ({ titulo, children, abierto }) => (
  <details className="group rounded-lg border border-[var(--c-border)] px-3" open={abierto}>
    <summary className="flex items-center gap-2 py-2 cursor-pointer list-none text-sm font-semibold">
      <span className="text-[var(--c-muted)] transition-transform group-open:rotate-90" aria-hidden>▸</span>
      <span className="grow">{titulo}</span>
    </summary>
    <div className="pb-3 flex flex-col gap-1.5 text-sm">{children}</div>
  </details>
);

const MetaBloque: React.FC<{ b: BloqueMarco }> = ({ b }) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--c-muted)]">
    <span className={`px-2 py-0.5 rounded-md font-bold ${ESTADO_BLOQUE[b.estado]}`}>{b.estado}</span>
    {b.version && <span>Versión {b.version}</span>}
    <span>Archivo: {b.archivo}</span>
    <span>Ingestado el {b.ingestado}</span>
    <span title={b.sha256}>sha256 {b.sha256.slice(0, 12)}</span>
  </div>
);

const TextoCompleto: React.FC<{ b: BloqueMarco }> = ({ b }) => (
  <Desplegable titulo="Texto completo del bloque (fuente)">
    <pre className="m-0 whitespace-pre-wrap font-sans text-xs leading-relaxed max-h-[32rem] overflow-y-auto">{textoBloque(b)}</pre>
  </Desplegable>
);

const VistaReglamento: React.FC<{ r: Reglamento }> = ({ r }) => {
  const seccion = (n: number) => r.secciones.find((s) => s.numero === n);
  const principio = seccion(0);
  return (
    <Tarjeta>
      <header className="flex flex-col gap-1">
        <h3 className="m-0 text-base font-bold flex items-center gap-2"><FileText className="w-4 h-4" strokeWidth={1.7} />{r.bloque.titulo}</h3>
        <MetaBloque b={r.bloque} />
      </header>
      {principio && (
        <div className="flex flex-col gap-1 p-3 rounded-xl bg-[var(--c-sunken)] text-sm">
          <span className="font-bold">{principio.numero}. {principio.titulo}</span>
          {principio.lineas.map((l, i) => <p key={i} className="m-0">{l}</p>)}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold">Verbos epistémicos</span>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr className="text-left text-xs text-[var(--c-muted)]"><th className="py-1 pr-3">Verbo</th><th className="py-1 pr-3">Oficio</th><th className="py-1">Ejemplo</th></tr></thead>
            <tbody>
              {r.verbos.map((v) => (
                <tr key={v.verbo} className="border-t border-[var(--c-border)] align-top">
                  <td className="py-1.5 pr-3 font-bold whitespace-nowrap">{v.verbo}</td>
                  <td className="py-1.5 pr-3">{v.oficio}</td>
                  <td className="py-1.5 text-[var(--c-muted)]">{v.ejemplo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Desplegable titulo={`Las ${r.reglas.length} reglas`}>
        {r.reglas.map((x) => (
          <Desplegable key={x.numero} titulo={`Regla ${x.numero} — ${x.titulo}`}>
            {x.texto.map((l, i) => <p key={i} className="m-0">{l}</p>)}
          </Desplegable>
        ))}
      </Desplegable>
      <div className="grid md:grid-cols-2 gap-2">
        <Desplegable titulo={`Frases prohibidas en piso 3 (${r.frasesProhibidas.length})`}>
          {r.frasesProhibidas.map((f, i) => <p key={i} className="m-0">✕ {f}</p>)}
        </Desplegable>
        <Desplegable titulo={`Frases permitidas en piso 2 (${r.frasesPermitidas.length})`}>
          {r.frasesPermitidas.map((f, i) => <p key={i} className="m-0">✓ {f}</p>)}
        </Desplegable>
      </div>
      {r.secciones.filter((s) => ![0, 5, 8].includes(s.numero)).map((s) => (
        <Desplegable key={s.numero} titulo={`${s.numero}. ${s.titulo}`}>
          {s.lineas.filter((l) => !l.startsWith('|')).map((l, i) => <p key={i} className="m-0">{l}</p>)}
        </Desplegable>
      ))}
      <TextoCompleto b={r.bloque} />
    </Tarjeta>
  );
};

const VistaDossier: React.FC<{ d: Dossier }> = ({ d }) => (
  <Tarjeta>
    <header className="flex flex-col gap-1">
      <h3 className="m-0 text-base font-bold flex items-center gap-2"><FileText className="w-4 h-4" strokeWidth={1.7} />{d.bloque.titulo}</h3>
      <MetaBloque b={d.bloque} />
    </header>
    {d.alcance && <p className="m-0 text-sm"><strong>Alcance:</strong> {d.alcance}</p>}
    {d.advertencia && <p className="m-0 text-sm px-3 py-2 rounded-xl bg-[var(--c-warn-soft)]"><strong>Advertencia estructural:</strong> {d.advertencia}</p>}
    <Desplegable titulo={`Fichas de fuentes (${d.fichas.length})`}>
      {d.fichas.map((f) => (
        <Desplegable key={f.numero} titulo={<span className="flex items-center gap-2"><span>{f.numero}. {f.titulo}</span>{f.debil && <span className="px-1.5 py-0.5 rounded bg-[var(--c-warn-soft)] text-[var(--c-warn)] text-xs font-bold">débil o sin verificar</span>}</span>}>
          <p className="m-0"><strong>Referencia:</strong> {f.referencia}</p>
          <p className="m-0"><strong>Escala:</strong> {f.escala}</p>
          <p className="m-0"><strong>Qué afirma:</strong> {f.afirma}</p>
          <p className="m-0"><strong>Dato:</strong> {f.dato}</p>
          <p className="m-0"><strong>Variable que ayuda a leer:</strong> {f.variable}</p>
          <p className="m-0"><strong>Límite:</strong> {f.limite}</p>
        </Desplegable>
      ))}
    </Desplegable>
    <div className="grid md:grid-cols-3 gap-2">
      <Desplegable titulo={`Enunciados portables (${d.portables.length})`} abierto>{d.portables.map((l, i) => <p key={i} className="m-0">{l}</p>)}</Desplegable>
      <Desplegable titulo={`Enunciados locales (${d.locales.length})`}>{d.locales.map((l, i) => <p key={i} className="m-0">{l}</p>)}</Desplegable>
      <Desplegable titulo={`Debates abiertos (${d.debates.length})`}>{d.debates.map((l, i) => <p key={i} className="m-0">{l}</p>)}</Desplegable>
    </div>
    {d.vacios && <p className="m-0 text-sm text-[var(--c-muted)]"><strong>Vacíos:</strong> {d.vacios}</p>}
    <TextoCompleto b={d.bloque} />
  </Tarjeta>
);

export const MarcoMetodologicoView: React.FC = () => {
  const [capaSel, setCapaSel] = useState<IdCapa>(1);
  const capa = CAPAS.find((c) => c.id === capaSel)!;
  // El reglamento va primero; después los dossiers y demás bloques
  const bloques = useMemo(
    () => [...bloquesDeCapa(capaSel)].sort((a, b) => Number(b.id.startsWith('reglamento')) - Number(a.id.startsWith('reglamento')) || a.id.localeCompare(b.id)),
    [capaSel],
  );
  const diagrama = bloquesDeCapa(0)[0];

  return (
    <div className="proteus-civico flex flex-col gap-5 pb-12">
      <header className="flex flex-col gap-1">
        <h1 className="m-0 text-2xl font-bold flex items-center gap-2"><BookOpen className="w-6 h-6 text-[var(--c-accent)]" strokeWidth={1.7} />Marco metodológico</h1>
        <p className="m-0 text-sm text-[var(--c-muted)] max-w-3xl">
          Reglas y literatura con las que Proteus interpreta los datos y plantea la publicidad. Se organiza en 4 capas y se sube por bloques: cada documento se ingesta con <code>scripts/ingestar_marco.mjs</code> y queda aquí con su archivo, fecha y huella. Si una salida de la aplicación contradice el reglamento vigente, prevalece el reglamento.
        </p>
      </header>

      {/* Diagrama: 2 marcos × 2 ámbitos */}
      <div className="grid md:grid-cols-2 gap-3">
        {(['interpretacion', 'publicidad'] as const).map((marco) => (
          <div key={marco} className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-[var(--c-muted)]">{NOMBRE_MARCO[marco]}</span>
            {CAPAS.filter((c) => c.marco === marco).map((c) => {
              const n = bloquesDeCapa(c.id).length;
              const activa = c.id === capaSel;
              return (
                <button key={c.id} onClick={() => setCapaSel(c.id)} aria-pressed={activa}
                  className={`text-left p-3 rounded-xl border flex flex-col gap-1 ${activa ? 'border-[var(--c-accent)] bg-[var(--c-accent-soft)]' : 'border-[var(--c-border)] bg-[var(--c-surface)] hover:bg-[var(--c-sunken)]'}`}>
                  <span className="flex items-center gap-2 text-sm font-bold">
                    {n ? <CheckCircle2 className="w-4 h-4 text-[var(--c-ok)]" /> : <CircleDashed className="w-4 h-4 text-[var(--c-muted)]" />}
                    {c.nombre}
                    <span className="ml-auto text-xs font-semibold text-[var(--c-muted)]">{n ? `${n} bloque${n > 1 ? 's' : ''}` : 'Pendiente'}</span>
                  </span>
                  <span className="text-xs text-[var(--c-muted)] line-clamp-2">{c.descripcion}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <Tarjeta>
        <h2 className="m-0 text-lg font-bold">{capa.nombre} · {NOMBRE_MARCO[capa.marco]}</h2>
        <p className="m-0 text-sm">{capa.descripcion}</p>
        <p className="m-0 text-xs text-[var(--c-muted)]">Recopilan y sintetizan: {capa.recopilan} · Aplican: {capa.aplican}</p>
        {!bloques.length && (
          <p className="m-0 text-sm px-3 py-2.5 rounded-xl bg-[var(--c-sunken)]">
            Esta capa todavía no tiene bloques. Para cargar uno: <code>node scripts/ingestar_marco.mjs --capa {capa.id} --bloque &lt;id&gt; --titulo "&lt;título&gt;" &lt;archivo.docx&gt;</code>. Luego un agente estructura el bloque (reglas, fichas o normas) según docs/marco/README.md.
          </p>
        )}
      </Tarjeta>

      {bloques.map((b) =>
        b.id.startsWith('reglamento') ? <VistaReglamento key={b.id} r={leerReglamento(b)} />
          : b.id.startsWith('dossier') ? <VistaDossier key={b.id} d={leerDossier(b)} />
            : (
              <Tarjeta key={b.id}>
                <h3 className="m-0 text-base font-bold">{b.titulo}</h3>
                <MetaBloque b={b} />
                <TextoCompleto b={b} />
              </Tarjeta>
            ),
      )}

      {diagrama && (
        <Tarjeta>
          <h3 className="m-0 text-base font-bold">{diagrama.titulo}</h3>
          <MetaBloque b={diagrama} />
          <TextoCompleto b={diagrama} />
        </Tarjeta>
      )}
    </div>
  );
};

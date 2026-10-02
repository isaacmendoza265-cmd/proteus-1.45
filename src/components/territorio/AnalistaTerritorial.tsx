/**
 * Analista territorial (Gemini 3.8 Flash): preguntas generales o específicas sobre el barrio, la comuna, el municipio o
 * la subregión elegidos en el mapa. Antes de responder lee el dossier completo de esa unidad (todo lo que Proteus
 * tiene de ella); el dossier se puede revisar aquí mismo. Va debajo del generador de contenido.
 */
import React, { useEffect, useRef, useState } from 'react';
import { MessagesSquare, Send, Trash2 } from 'lucide-react';
import { dossierComoTexto, dossierTerritorio, type DossierTerritorial } from '../../services/dossierTerritorialService';
import { preguntarAnalista, preguntasSugeridas, type TurnoAnalista } from '../../services/analistaTerritorialService';
import type { SeleccionTerritorio } from '../../services/contentGeneratorService';
import { EstadoMotorIA } from '../ia/EstadoMotorIA';

export const AnalistaTerritorial: React.FC<{ seleccion: SeleccionTerritorio }> = ({ seleccion }) => {
  const clave = JSON.stringify(seleccion);
  const [dossier, setDossier] = useState<DossierTerritorial | null>(null);
  const [errorDossier, setErrorDossier] = useState('');
  const [turnos, setTurnos] = useState<TurnoAnalista[]>([]);
  const [pregunta, setPregunta] = useState('');
  const [pensando, setPensando] = useState(false);
  const [error, setError] = useState('');
  const fin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let activo = true;
    setDossier(null); setErrorDossier(''); setTurnos([]); setError('');
    dossierTerritorio(seleccion)
      .then((d) => { if (activo) setDossier(d); })
      .catch((e) => { if (activo) setErrorDossier(e instanceof Error ? e.message : String(e)); });
    return () => { activo = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave]);

  useEffect(() => { fin.current?.scrollIntoView({ block: 'nearest' }); }, [turnos, pensando]);

  const texto = dossier ? dossierComoTexto(dossier) : '';
  const lineas = dossier ? dossier.secciones.reduce((s, x) => s + x.lineas.length, 0) : 0;

  const preguntar = async (q: string) => {
    const limpia = q.trim();
    if (!limpia || !dossier || pensando) return;
    setPregunta(''); setError(''); setPensando(true);
    const previos = turnos;
    setTurnos([...previos, { rol: 'usuario', texto: limpia }]);
    try {
      const r = await preguntarAnalista(texto, previos, limpia, seleccion);
      setTurnos((t) => [...t, { rol: 'analista', texto: r }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setTurnos(previos);
      setPregunta(limpia);
    } finally {
      setPensando(false);
    }
  };

  return (
    <section className="proteus-civico p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] flex flex-col gap-3" aria-label="Analista territorial">
      <header className="flex items-center gap-2 flex-wrap">
        <MessagesSquare className="w-5 h-5 text-[var(--c-accent)]" strokeWidth={1.7} />
        <h2 className="m-0 text-base font-bold grow">Analista territorial</h2>
        <span className="text-xs text-[var(--c-muted)]">Gemini 3.8 Flash · {dossier?.territorio ?? 'cargando…'}</span>
      </header>
      <p className="m-0 text-sm text-[var(--c-muted)]">
        Pregunta lo que quieras sobre {dossier ? <strong className="text-[var(--c-ink)]">{dossier.territorio}</strong> : 'el territorio elegido en el mapa'}.
        Antes de responder lee todo lo que Proteus tiene de esta unidad y solo usa esos datos. Cambia de territorio en el mapa para cambiar de analista.
      </p>

      <details className="text-xs">
        <summary className="cursor-pointer font-semibold text-[var(--c-muted)]">
          Lo que lee el analista {dossier ? `(${dossier.secciones.length} secciones, ${lineas} datos, ${Math.round(texto.length / 1000)} mil caracteres)` : errorDossier ? '(error)' : '(cargando…)'}
        </summary>
        {errorDossier && <p className="m-0 mt-1 text-[var(--c-warn)]">No se pudo armar el dossier: {errorDossier}</p>}
        {dossier && (
          <div className="mt-1 max-h-80 overflow-y-auto flex flex-col gap-2 pr-1">
            {dossier.secciones.map((s) => (
              <div key={s.titulo}>
                <span className="font-bold text-[var(--c-ink)]">{s.titulo}</span>
                <ul className="m-0 pl-4 flex flex-col gap-0.5 text-[var(--c-ink)]">{s.lineas.map((l, i) => <li key={i} className="whitespace-pre-wrap">{l.trim()}</li>)}</ul>
              </div>
            ))}
          </div>
        )}
      </details>
      <EstadoMotorIA cobertura={dossier?.cobertura} />

      {turnos.length > 0 && (
        <div className="flex flex-col gap-2 max-h-[32rem] overflow-y-auto pr-1" aria-live="polite">
          {turnos.map((t, i) => (
            <div key={i} className={`px-3 py-2 rounded-xl text-sm whitespace-pre-wrap leading-relaxed ${t.rol === 'usuario' ? 'self-end max-w-[85%] bg-[var(--c-accent-soft)] text-[var(--c-ink)]' : 'bg-[var(--c-sunken)]'}`}>
              {t.texto}
            </div>
          ))}
          {pensando && <div className="px-3 py-2 rounded-xl text-sm bg-[var(--c-sunken)] text-[var(--c-muted)]">Leyendo el dossier y analizando…</div>}
          <div ref={fin} />
        </div>
      )}

      {dossier && turnos.length === 0 && (
        <div className="flex flex-wrap gap-1.5">
          {preguntasSugeridas(dossier.nivel).map((q) => (
            <button key={q} onClick={() => preguntar(q)} disabled={pensando}
              className="min-h-8 px-2.5 rounded-lg border border-[var(--c-border)] text-xs font-semibold text-left disabled:opacity-60">{q}</button>
          ))}
        </div>
      )}

      {error && <p className="m-0 text-sm px-3 py-2 rounded-lg bg-[var(--c-warn-soft)] text-[var(--c-warn)]">No se pudo responder: {error}</p>}

      <form className="flex items-end gap-2" onSubmit={(e) => { e.preventDefault(); preguntar(pregunta); }}>
        <label className="grow flex flex-col gap-1 min-w-0">
          <span className="sr-only">Pregunta al analista</span>
          <textarea value={pregunta} onChange={(e) => setPregunta(e.target.value)} rows={2} maxLength={2000}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); preguntar(pregunta); } }}
            placeholder="Ej.: ¿qué tan competida fue la Alcaldía aquí y qué cambió desde 2019?"
            className="min-h-9 px-2.5 py-2 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-sm resize-y" />
        </label>
        <button type="submit" disabled={!dossier || pensando || !pregunta.trim()}
          className="min-h-9 px-4 rounded-lg bg-[var(--c-accent)] text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-60">
          <Send className="w-4 h-4" strokeWidth={1.8} />Preguntar
        </button>
        {turnos.length > 0 && (
          <button type="button" onClick={() => { setTurnos([]); setError(''); }} title="Borrar la conversación"
            className="min-h-9 px-3 rounded-lg border border-[var(--c-border)] text-sm flex items-center"><Trash2 className="w-4 h-4" /></button>
        )}
      </form>
    </section>
  );
};

export default AnalistaTerritorial;

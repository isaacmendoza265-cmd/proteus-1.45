/**
 * Noticias de la unidad elegida en el mapa (búsqueda de Google desde Gemini, bajo demanda). Reglas en
 * src/services/noticias/noticias.ts: municipio, comuna, subregión o Antioquia (un barrio usa su comuna), solo enlaces
 * que devolvió Google, sin nombres de particulares en el resumen, fuente auxiliar. Lo encontrado se guarda y entra a
 * todos los análisis del aplicativo. Google exige mostrar sus sugerencias de búsqueda junto al resultado.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Newspaper, RefreshCw, Search } from 'lucide-react';
import { buscarNoticias, cargarNoticias, objetivoDeSeleccion } from '../../services/noticias/noticiasCliente';
import { DIAS_VENTANA, fechaCorta, type RegistroNoticias } from '../../services/noticias/noticias';
import type { SeleccionDossier } from '../../services/dossierTerritorialService';

export const NoticiasUnidad: React.FC<{ seleccion: SeleccionDossier }> = ({ seleccion }) => {
  const objetivo = useMemo(() => objetivoDeSeleccion(seleccion), [seleccion]);
  const [registro, setRegistro] = useState<RegistroNoticias | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;
    setRegistro(null); setError(null);
    cargarNoticias([objetivo.unidadId]).then((r) => { if (activo) setRegistro(r[objetivo.unidadId] ?? null); });
    return () => { activo = false; };
  }, [objetivo.unidadId]);

  const buscar = async (forzar: boolean) => {
    setBuscando(true); setError(null);
    try {
      const { registro: r } = await buscarNoticias(objetivo, forzar);
      setRegistro(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBuscando(false);
    }
  };

  const deHoy = registro && new Date(registro.buscadoEn).toDateString() === new Date().toDateString();

  return (
    <section id="noticias-unidad" className="proteus-civico scroll-mt-4 p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] flex flex-col gap-3" aria-label="Noticias de la unidad">
      <header className="flex items-center gap-2 flex-wrap">
        <Newspaper className="w-5 h-5 text-[var(--c-accent)]" strokeWidth={1.7} />
        <h2 className="m-0 text-base font-bold grow">Noticias de {objetivo.nombre}</h2>
        <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-[var(--c-warn-soft)] text-[var(--c-warn)]">Auxiliar</span>
      </header>
      {objetivo.heredadaDe && (
        <p className="m-0 text-xs text-[var(--c-muted)]">{objetivo.heredadaDe} no se busca por separado (casi no hay noticias por barrio y los nombres se repiten): estas son las de su comuna.</p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => buscar(Boolean(deHoy))} disabled={buscando}
          className="min-h-9 px-3.5 rounded-lg bg-[var(--c-accent)] text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50">
          {registro ? <RefreshCw className="w-3.5 h-3.5" /> : <Search className="w-3.5 h-3.5" />}
          {buscando ? 'Buscando en Google…' : registro ? 'Buscar de nuevo' : 'Buscar noticias'}
        </button>
        <span className="text-xs text-[var(--c-muted)]">
          {registro ? `Búsqueda del ${fechaCorta(registro.buscadoEn)}. ` : ''}
          Noticias de los últimos {DIAS_VENTANA} días con la búsqueda de Google. Lo encontrado entra como fuente auxiliar a todos los análisis.
        </span>
      </div>
      {error && <p className="m-0 text-xs text-[var(--c-warn)]">No se pudo buscar: {error}</p>}
      {registro && (
        registro.noticias.length ? (
          <ul className="m-0 p-0 list-none flex flex-col gap-2">
            {registro.noticias.map((n) => (
              <li key={n.enlace + n.titular} className="rounded-xl border border-[var(--c-border)] p-3 flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--c-muted)]">
                  <span>{fechaCorta(n.fecha)}</span><span aria-hidden>·</span><span className="font-semibold">{n.medio}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[var(--c-sunken)] text-[var(--c-muted)]">{n.tema}</span>
                </div>
                <a href={n.enlace} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold leading-snug text-[var(--c-text)] hover:underline inline-flex items-start gap-1">
                  {n.titular}<ExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[var(--c-muted)]" aria-label="(abre el medio)" />
                </a>
                {n.resumen && <p className="m-0 text-xs leading-relaxed">{n.resumen}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="m-0 text-sm text-[var(--c-muted)]">Google no encontró noticias de esta unidad en los últimos {DIAS_VENTANA} días.</p>
        )
      )}
      {registro?.sugerenciasHtml && (
        <iframe title="Sugerencias de búsqueda de Google" sandbox="allow-popups allow-popups-to-escape-sandbox"
          srcDoc={`<base target="_blank">${registro.sugerenciasHtml}`} className="w-full h-16 border-0 rounded-lg" />
      )}
      {registro && (
        <p className="m-0 text-[10px] text-[var(--c-muted)] leading-snug">
          Solo se muestran noticias con un enlace que devolvió Google{registro.descartadas === 1 ? ' (1 noticia sin enlace verificado se descartó)' : registro.descartadas ? ` (${registro.descartadas} noticias sin enlace verificado se descartaron)` : ''}. Son noticias, no datos verificados: el resumen no nombra a particulares. Búsqueda hecha con {registro.modelo}.
        </p>
      )}
    </section>
  );
};

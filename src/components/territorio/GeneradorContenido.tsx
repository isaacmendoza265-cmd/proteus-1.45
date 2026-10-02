/**
 * Generador de contenido enlazado al mapa (Gemini 3.8 vía el servidor).
 * Territorio: Subregión › Municipio › Comuna › Barrio, rellenado con lo elegido en el mapa ("General"
 * si no hay selección). Medio (redes y medios tradicionales) y tipo de pieza según el medio.
 * Antes de generar se ven los datos que se le pasan a Gemini (solo datos con fuente).
 */
import React, { useEffect, useMemo, useState } from 'react';
import { Copy, Check, Megaphone, RefreshCw } from 'lucide-react';
import {
  MEDIOS,
  SISTEMA_CONTENIDO,
  SUBREGIONES,
  armarInstruccion,
  barriosDe,
  comunasDe,
  contextoTerritorio,
  generarContenido,
  municipiosDe,
  nombreSeleccion,
  tieneComunas,
  type PerfilCandidato,
  type PuestosDeFicha,
  type SeleccionTerritorio,
} from '../../services/contentGeneratorService';

interface GeneradorContenidoProps {
  /** Territorio elegido en el mapa */
  seleccionMapa: SeleccionTerritorio;
  /** Elección elegida en el mapa y la ficha */
  eleccionId: string;
  nombreEleccion?: string;
  /** Puestos de la ficha abierta (para dar resultados de una comuna o barrio) */
  ficha?: PuestosDeFicha | null;
  candidato?: PerfilCandidato | null;
}

const Campo: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="flex flex-col gap-1 min-w-0">
    <span className="text-xs font-semibold text-[var(--c-muted)]">{label}</span>
    {children}
  </label>
);
const claseSelect = 'min-h-9 px-2 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-sm disabled:opacity-50';

export const GeneradorContenido: React.FC<GeneradorContenidoProps> = ({ seleccionMapa, eleccionId, nombreEleccion, ficha, candidato }) => {
  // La selección del mapa rellena el formulario; el usuario la puede cambiar después
  const [sel, setSel] = useState<SeleccionTerritorio>(seleccionMapa);
  const claveMapa = JSON.stringify(seleccionMapa);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setSel(seleccionMapa), [claveMapa]);

  const [medioId, setMedioId] = useState(MEDIOS[0].id);
  const medio = MEDIOS.find((m) => m.id === medioId)!;
  const [tipoId, setTipoId] = useState(medio.tipos[0].id);
  const tipo = medio.tipos.find((t) => t.id === tipoId) ?? medio.tipos[0];
  const [tema, setTema] = useState('');

  const municipios = useMemo(() => municipiosDe(sel.subregion), [sel.subregion]);
  const comunas = useMemo(() => comunasDe(sel.muniId), [sel.muniId]);
  const barrios = useMemo(() => barriosDe(sel.muniId, sel.comunaId), [sel.muniId, sel.comunaId]);

  // Datos que se le pasan a Gemini (se muestran antes de generar)
  const [datos, setDatos] = useState<string[] | null>(null);
  useEffect(() => {
    let activo = true;
    setDatos(null);
    contextoTerritorio(sel, eleccionId, ficha)
      .then((d) => { if (activo) setDatos(d); })
      .catch(() => { if (activo) setDatos(['No se pudieron cargar los datos del territorio.']); });
    return () => { activo = false; };
  }, [sel, eleccionId, ficha]);

  const [estado, setEstado] = useState<'listo' | 'generando' | 'error'>('listo');
  const [error, setError] = useState('');
  const [texto, setTexto] = useState('');
  const [copiado, setCopiado] = useState(false);

  const generar = async () => {
    if (!datos) return;
    setEstado('generando');
    setError('');
    setCopiado(false);
    try {
      const instruccion = armarInstruccion({ sel, medio, tipo, tema, datos, candidato });
      setTexto(await generarContenido(SISTEMA_CONTENIDO, instruccion, sel));
      setEstado('listo');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setEstado('error');
    }
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
    } catch { /* sin permiso de portapapeles */ }
  };

  return (
    <section className="proteus-civico p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] flex flex-col gap-3" aria-label="Generador de contenido">
      <header className="flex items-center gap-2 flex-wrap">
        <Megaphone className="w-5 h-5 text-[var(--c-accent)]" strokeWidth={1.7} />
        <h2 className="m-0 text-base font-bold grow">Generar contenido</h2>
        <span className="text-xs text-[var(--c-muted)]">Gemini 3.8 · {nombreSeleccion(sel)}{nombreEleccion ? ` · ${nombreEleccion}` : ''}</span>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <Campo label="Subregión">
          <select className={claseSelect} value={sel.subregion ?? ''} onChange={(e) => setSel({ subregion: e.target.value || null, muniId: null, comunaId: null, barrioId: null })}>
            <option value="">General (Antioquia)</option>
            {SUBREGIONES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Campo>
        <Campo label="Municipio">
          <select className={claseSelect} value={sel.muniId ?? ''} onChange={(e) => {
            const m = municipios.find((x) => x.muniId === e.target.value);
            setSel({ subregion: m?.subregion ?? sel.subregion, muniId: m?.muniId ?? null, comunaId: null, barrioId: null });
          }}>
            <option value="">General</option>
            {municipios.map((m) => <option key={m.muniId} value={m.muniId}>{m.nombre}</option>)}
          </select>
        </Campo>
        <Campo label="Comuna">
          <select className={claseSelect} value={sel.comunaId ?? ''} disabled={!tieneComunas(sel.muniId)} onChange={(e) => setSel({ ...sel, comunaId: e.target.value || null, barrioId: null })}
            title={sel.muniId && !tieneComunas(sel.muniId) ? 'Este municipio no tiene comunas: se elige el barrio o la vereda directamente' : undefined}>
            <option value="">{sel.muniId && !tieneComunas(sel.muniId) ? 'Sin comunas' : 'General'}</option>
            {comunas.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
        </Campo>
        <Campo label="Barrio o vereda">
          <select className={claseSelect} value={sel.barrioId ?? ''} disabled={!sel.muniId} onChange={(e) => setSel({ ...sel, barrioId: e.target.value || null })}>
            <option value="">General</option>
            {barrios.map((b) => <option key={b.id} value={b.id}>{b.nombre}{b.tipo && b.tipo !== 'Barrio' ? ` (${b.tipo.toLowerCase()})` : ''}</option>)}
          </select>
        </Campo>
        <Campo label="Red social o medio">
          <select className={claseSelect} value={medioId} onChange={(e) => { const m = MEDIOS.find((x) => x.id === e.target.value)!; setMedioId(m.id); setTipoId(m.tipos[0].id); }}>
            {(['Redes sociales', 'Medios de comunicación'] as const).map((g) => (
              <optgroup key={g} label={g}>
                {MEDIOS.filter((m) => m.grupo === g).map((m) => <option key={m.id} value={m.id}>{m.nombre}</option>)}
              </optgroup>
            ))}
          </select>
        </Campo>
        <Campo label="Tipo de contenido">
          <select className={claseSelect} value={tipo.id} onChange={(e) => setTipoId(e.target.value)}>
            {medio.tipos.map((t) => <option key={t.id} value={t.id}>{t.nombre}</option>)}
          </select>
        </Campo>
        <div className="col-span-2">
          <Campo label="Tema o mensaje (opcional)">
            <input className={claseSelect} value={tema} onChange={(e) => setTema(e.target.value)} maxLength={400} placeholder="Ej.: seguridad en los barrios, empleo para jóvenes…" />
          </Campo>
        </div>
      </div>

      <p className="m-0 text-xs text-[var(--c-muted)]">Formato: {tipo.formato}</p>

      <details className="text-xs">
        <summary className="cursor-pointer font-semibold text-[var(--c-muted)]">Datos que se le pasan a Gemini {datos ? `(${datos.length})` : '(cargando…)'}</summary>
        <ul className="mt-1 mb-0 pl-4 flex flex-col gap-0.5 text-[var(--c-ink)]">
          {(datos ?? []).map((d, i) => <li key={i} className="whitespace-pre-wrap">{d}</li>)}
        </ul>
        <p className="mt-1 mb-0 text-[var(--c-muted)]">Gemini recibe la orden de no usar otras cifras. Revisa la pieza antes de publicarla.</p>
      </details>

      <div className="flex items-center gap-2">
        <button onClick={generar} disabled={!datos || estado === 'generando'}
          className="min-h-9 px-4 rounded-lg bg-[var(--c-accent)] text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-60">
          <RefreshCw className={`w-4 h-4 ${estado === 'generando' ? 'animate-spin' : ''}`} strokeWidth={1.8} />
          {estado === 'generando' ? 'Generando…' : texto ? 'Generar de nuevo' : 'Generar'}
        </button>
        {texto && (
          <button onClick={copiar} className="min-h-9 px-3 rounded-lg border border-[var(--c-border)] text-sm font-semibold flex items-center gap-2">
            {copiado ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copiado ? 'Copiado' : 'Copiar'}
          </button>
        )}
      </div>

      {estado === 'error' && (
        <p className="m-0 text-sm px-3 py-2 rounded-lg bg-[var(--c-warn-soft)] text-[var(--c-warn)]">No se pudo generar: {error}</p>
      )}
      {texto && (
        <div className="p-3 rounded-xl bg-[var(--c-sunken)] text-sm whitespace-pre-wrap leading-relaxed">{texto}</div>
      )}
    </section>
  );
};

/**
 * SEGMENTOS DE POBLACIÓN (Electorado › Segmentos)
 *
 * Cruce de sexo × edad × estrato × nivel educativo de la unidad territorial activa (la de la barra superior y el
 * mapa), con datos del DANE. Reescrito en oct-2026: antes repartía el censo electoral con pesos fijos y mostraba
 * "votos en urnas", "participación esperada" y "afinidad con el candidato" por cohorte, sin fuente. Ver
 * voterDemographicsService.ts para el método.
 *
 * Gemini solo se llama al pulsar el botón, con las tres macrofuentes (datos, perfil, marco) y la tarea 'analizar'.
 */
import React, { useEffect, useMemo, useState } from 'react';
import { Brain, Filter, MapPin, Save, Search, Users } from 'lucide-react';
import type { CandidateProfile } from '../../components/CandidateProfileManager';
import { callGeminiApi, formatAiError } from '../../services/geminiService';
import {
  EDADES, EDUCACIONES, ESTRATOS, ETIQUETAS, SEXOS, segmentacionComoTexto, segmentarTerritorio,
  type AgeGroupType, type DemographicCohort, type EconomicLevelType, type EducationLevelType, type GenderType,
  type SegmentacionTerritorio,
} from '../../services/voterDemographicsService';
import { seleccionDeEstado, useActiveTerritory } from '../../services/activeTerritoryContextService';
import { ETIQUETA_ESTADO, fmt, pct, type EstadoDato } from '../../services/territoryProfileService';

interface VoterSegmentationEngineProps {
  candidateProfile: CandidateProfile;
  onSaveToDrive?: (title: string, data: unknown) => void;
  onNavigateToZoom?: () => void;
}

const ESTILO: Record<EstadoDato, string> = {
  oficial: 'bg-[var(--c-ok-soft)] text-[var(--c-ok)]',
  estimado: 'bg-[var(--c-warn-soft)] text-[var(--c-warn)]',
  'sin-informacion': 'bg-[var(--c-border)] text-[var(--c-muted)]',
};
const Sello: React.FC<{ estado: EstadoDato; texto?: string }> = ({ estado, texto }) => (
  <span className={`shrink-0 px-2 py-0.5 rounded-md text-xs font-bold ${ESTILO[estado]}`}>{texto ?? ETIQUETA_ESTADO[estado]}</span>
);

type Filtro<T extends string> = T | 'all';

function Selector<T extends string>({ titulo, valor, opciones, etiquetas, alCambiar, pesos }: {
  titulo: string; valor: Filtro<T>; opciones: T[]; etiquetas: Record<T, string>; alCambiar: (v: Filtro<T>) => void; pesos?: Record<T, number> | null;
}) {
  return (
    <fieldset className="space-y-1.5">
      <legend className="text-xs uppercase font-bold text-[var(--c-muted)]">{titulo}</legend>
      <div className="flex flex-wrap gap-1.5">
        {(['all', ...opciones] as Filtro<T>[]).map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={valor === o}
            onClick={() => alCambiar(o)}
            className={`min-h-9 px-2.5 rounded-lg border text-xs font-semibold ${valor === o ? 'border-[var(--c-accent)] bg-[var(--c-accent-soft)] text-[var(--c-accent-text)]' : 'border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-ink)]'}`}
          >
            {o === 'all' ? 'Todos' : etiquetas[o as T]}
            {o !== 'all' && pesos ? <span className="ml-1 text-[var(--c-muted)] font-normal">{pct(100 * pesos[o as T])}</span> : null}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export const VoterSegmentationEngine: React.FC<VoterSegmentationEngineProps> = ({ candidateProfile, onSaveToDrive, onNavigateToZoom }) => {
  const { activeTerritory } = useActiveTerritory();
  const seleccion = useMemo(() => seleccionDeEstado(activeTerritory), [activeTerritory]);
  const [seg, setSeg] = useState<SegmentacionTerritorio | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const [sexo, setSexo] = useState<Filtro<GenderType>>('all');
  const [edad, setEdad] = useState<Filtro<AgeGroupType>>('all');
  const [estrato, setEstrato] = useState<Filtro<EconomicLevelType>>('all');
  const [educacion, setEducacion] = useState<Filtro<EducationLevelType>>('all');
  const [buscar, setBuscar] = useState('');
  const [focoId, setFocoId] = useState<string | null>(null);

  const [generando, setGenerando] = useState(false);
  const [analisis, setAnalisis] = useState<string | null>(null);
  const [errorIa, setErrorIa] = useState<string | null>(null);

  useEffect(() => {
    let vivo = true;
    setCargando(true); setError(''); setAnalisis(null); setErrorIa(null); setFocoId(null);
    segmentarTerritorio(seleccion)
      .then((s) => { if (vivo) setSeg(s); })
      .catch((e) => { if (vivo) setError(e instanceof Error ? e.message : String(e)); })
      .finally(() => { if (vivo) setCargando(false); });
    return () => { vivo = false; };
  }, [seleccion]);

  const filtrados = useMemo(() => (seg?.cohortes ?? []).filter((c) =>
    (sexo === 'all' || c.gender === sexo) && (edad === 'all' || c.ageGroup === edad)
    && (estrato === 'all' || c.economicLevel === estrato) && (educacion === 'all' || c.educationLevel === educacion)), [seg, sexo, edad, estrato, educacion]);

  const resumen = useMemo(() => {
    const personas = filtrados.reduce((a, c) => a + c.personas, 0);
    return { n: filtrados.length, personas, pct: seg?.adultos ? (100 * personas) / seg.adultos : null };
  }, [filtrados, seg]);

  const foco: DemographicCohort | undefined = useMemo(
    () => (focoId && seg?.cohortes.find((c) => c.id === focoId)) || filtrados[0], [focoId, seg, filtrados]);

  const tabla = useMemo(() => {
    const q = buscar.trim().toLowerCase();
    return q ? filtrados.filter((c) => c.fullTitle.toLowerCase().includes(q)) : filtrados;
  }, [filtrados, buscar]);

  const repartoSexoEdad = useMemo(() => {
    if (!seg?.sexoEdad.reparto || !seg.adultos) return null;
    const r = seg.sexoEdad.reparto;
    return {
      sexo: Object.fromEntries(SEXOS.map((g) => [g, EDADES.reduce((s, a) => s + r[g][a], 0) / seg.adultos!])) as Record<GenderType, number>,
      edad: Object.fromEntries(EDADES.map((a) => [a, SEXOS.reduce((s, g) => s + r[g][a], 0) / seg.adultos!])) as Record<AgeGroupType, number>,
    };
  }, [seg]);

  const limpiar = () => { setSexo('all'); setEdad('all'); setEstrato('all'); setEducacion('all'); setFocoId(null); };

  const analizarSegmento = async () => {
    if (!seg || !foco) return;
    setGenerando(true); setErrorIa(null);
    try {
      const promptText = [
        'Lee este segmento de población del territorio y propón cómo puede hablarle el candidato del perfil.',
        '',
        segmentacionComoTexto(seg, foco),
        '',
        `Guía general de referencia para este cruce (texto fijo del aplicativo, NO es un dato del territorio): ${foco.guia.tagline} Temas: ${foco.guia.temas.join(', ')}. Canales: ${foco.guia.canales.join(', ')}.`,
        '',
        'Responde en 4 apartados breves:',
        '1. Qué dicen los datos de este segmento en este territorio (solo cifras de los datos, con su rótulo Oficial/Estimado).',
        '2. Preocupaciones probables: márcalas como HIPÓTESIS y di en qué dato del territorio se apoya cada una (o que no hay dato).',
        '3. Cómo le habla el candidato: con su voz, ejes y postura del perfil, y las reglas del marco.',
        '4. Canales y qué dato faltaría para confirmarlo (encuesta, grupo focal, datos de pauta).',
        'No estimes votos, participación ni intención de voto del segmento: no hay datos para eso.',
      ].join('\n');
      const res = await callGeminiApi({
        promptText,
        systemInstruction: 'Eres el analista de segmentos de Proteus. Escribe en español de Colombia, sobrio y concreto.',
        proteus: { tarea: 'analizar', seleccion },
      });
      setAnalisis(res);
    } catch (e) {
      setErrorIa(formatAiError(e));
    } finally {
      setGenerando(false);
    }
  };

  const tarjeta = 'rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-4';

  return (
    <div className="proteus-civico space-y-4 pb-12">
      {/* Cabecera */}
      <div className={`${tarjeta} flex flex-col lg:flex-row lg:items-center justify-between gap-3`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--c-accent)] font-bold">
            <Users className="w-4 h-4" /><span>Electorado</span>
          </div>
          <h1 className="font-titulo text-xl sm:text-2xl font-medium">Segmentos de población</h1>
          <p className="text-xs sm:text-sm text-[var(--c-muted)] max-w-3xl">
            Personas de 18 años o más de <strong className="text-[var(--c-ink)]">{seg?.territorio ?? activeTerritory.name}</strong> por sexo, edad, estrato y nivel educativo, con datos del DANE.
            Los 54 cruces son un estimado; no hay votos ni participación por segmento.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {onNavigateToZoom && (
            <button type="button" onClick={onNavigateToZoom} className="min-h-9 px-3 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-xs font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />Cambiar territorio en el mapa
            </button>
          )}
        </div>
      </div>

      {cargando && <div className={`${tarjeta} text-xs text-[var(--c-muted)]`}>Cargando los datos del DANE del territorio…</div>}
      {error && <div className={`${tarjeta} text-xs text-[var(--c-warn)]`}>No se pudieron cargar los datos: {error}</div>}

      {seg && !cargando && (
        <>
          {/* Datos de base */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className={tarjeta}>
              <div className="flex items-center justify-between gap-2"><span className="text-xs uppercase font-bold text-[var(--c-muted)]">Personas de 18 años o más</span><Sello estado={seg.sexoEdad.estado} /></div>
              <div className="text-2xl font-titulo mt-1">{fmt(seg.adultos)}</div>
              <p className="text-xs text-[var(--c-muted)] mt-1">{seg.sexoEdad.fuente}</p>
            </div>
            <div className={tarjeta}>
              <div className="flex items-center justify-between gap-2"><span className="text-xs uppercase font-bold text-[var(--c-muted)]">Censo electoral</span><Sello estado={seg.electoral.censo ? 'oficial' : 'sin-informacion'} /></div>
              <div className="text-2xl font-titulo mt-1">{fmt(seg.electoral.censo)}</div>
              <p className="text-xs text-[var(--c-muted)] mt-1">
                {seg.electoral.alcance}{seg.electoral.mujeres ? ` · ${fmt(seg.electoral.mujeres)} mujeres y ${fmt(seg.electoral.hombres)} hombres` : ''}. No trae edad, estrato ni educación.
              </p>
            </div>
            <div className={tarjeta}>
              <div className="flex items-center justify-between gap-2"><span className="text-xs uppercase font-bold text-[var(--c-muted)]">Participación Alcaldía 2023</span><Sello estado={seg.electoral.participacionAlcaldia2023 != null ? 'oficial' : 'sin-informacion'} /></div>
              <div className="text-2xl font-titulo mt-1">{pct(seg.electoral.participacionAlcaldia2023)}</div>
              <p className="text-xs text-[var(--c-muted)] mt-1">{seg.electoral.fuente}. Es del territorio entero: no se reparte por segmento.</p>
            </div>
          </div>

          {seg.faltantes.length > 0 && (
            <div className={`${tarjeta} text-xs`}>
              <Sello estado="sin-informacion" /> <span className="ml-1">Falta {seg.faltantes.join(', ')} para {seg.territorio}: no se pueden armar los cruces.</span>
            </div>
          )}

          {/* Filtros */}
          <div className={`${tarjeta} space-y-3`}>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-[var(--c-muted)] flex items-center gap-1.5"><Filter className="w-4 h-4 text-[var(--c-accent)]" />Filtrar segmentos</span>
              <button type="button" onClick={limpiar} className="min-h-9 px-3 rounded-lg border border-[var(--c-border)] text-xs font-semibold">Quitar filtros</button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <Selector titulo="Sexo" valor={sexo} opciones={SEXOS} etiquetas={ETIQUETAS.sexo} alCambiar={setSexo} pesos={repartoSexoEdad?.sexo} />
              <Selector titulo="Edad" valor={edad} opciones={EDADES} etiquetas={ETIQUETAS.edad} alCambiar={setEdad} pesos={repartoSexoEdad?.edad} />
              <Selector titulo="Estrato (viviendas)" valor={estrato} opciones={ESTRATOS} etiquetas={ETIQUETAS.estrato} alCambiar={setEstrato} pesos={seg.estrato.reparto} />
              <Selector titulo="Nivel educativo" valor={educacion} opciones={EDUCACIONES} etiquetas={ETIQUETAS.educacion} alCambiar={setEducacion} pesos={seg.educacion.reparto} />
            </div>
            <p className="text-xs text-[var(--c-muted)]">
              Estrato: {seg.estrato.fuente}{seg.estrato.sinEstratoPct != null ? ` (${pct(seg.estrato.sinEstratoPct)} de las viviendas sin estrato, fuera del reparto)` : ''}. Educación: {seg.educacion.fuente}.
            </p>
            {seg.cohortes.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Sello estado="estimado" />
                <span><strong>{resumen.n}</strong> segmentos · <strong>{fmt(resumen.personas)}</strong> personas de 18 años o más · {pct(resumen.pct)} de los adultos del territorio</span>
              </div>
            )}
          </div>

          {/* Segmento elegido */}
          {foco && (
            <div className={`${tarjeta} space-y-3`}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                <div>
                  <span className="text-xs uppercase font-bold text-[var(--c-muted)]">Segmento elegido</span>
                  <h2 className="font-titulo text-lg font-medium">{foco.fullTitle}</h2>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end"><Sello estado="estimado" /><span className="text-xl font-titulo">{fmt(foco.personas)}</span></div>
                  <div className="text-xs text-[var(--c-muted)]">personas de 18 años o más · {pct(foco.pctAdultos)} de los adultos</div>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--c-border)] bg-[var(--c-sunken)] p-3 text-xs space-y-1.5">
                <div className="font-bold text-[var(--c-muted)] uppercase">Guía general (texto fijo, no medido en el territorio)</div>
                <p>{foco.guia.tagline}</p>
                <p><strong>Temas de referencia:</strong> {foco.guia.temas.join(' · ')}</p>
                <p><strong>Canales de referencia:</strong> {foco.guia.canales.join(' · ')}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button type="button" onClick={analizarSegmento} disabled={generando} className="min-h-9 px-3.5 rounded-lg bg-[var(--c-accent)] text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50">
                  <Brain className="w-3.5 h-3.5" />{generando ? 'Analizando con Gemini…' : analisis ? 'Analizar de nuevo' : 'Analizar este segmento con IA'}
                </button>
                {onSaveToDrive && (
                  <button
                    type="button"
                    onClick={() => onSaveToDrive(`Segmento: ${foco.fullTitle} · ${seg.territorio}`, { territorio: seg.territorio, segmento: foco, metodo: seg.metodo, fuentes: { sexoEdad: seg.sexoEdad.fuente, estrato: seg.estrato.fuente, educacion: seg.educacion.fuente }, analisis })}
                    className="min-h-9 px-3 rounded-lg border border-[var(--c-border)] text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />Guardar en Archivos
                  </button>
                )}
                <span className="text-xs text-[var(--c-muted)]">Gemini lee los datos del territorio, el perfil de {candidateProfile.nombre || 'el candidato'} y el marco completo.</span>
              </div>
              {errorIa && <p className="text-xs text-[var(--c-warn)]">No se pudo analizar: {errorIa}</p>}
              {analisis && <div className="rounded-xl border border-[var(--c-border)] p-3 text-sm whitespace-pre-wrap leading-relaxed">{analisis}</div>}
            </div>
          )}

          {/* Tabla de segmentos */}
          {seg.cohortes.length > 0 && (
            <div className={`${tarjeta} space-y-3`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-titulo text-base font-medium">Segmentos ({tabla.length})</h3>
                <label className="flex items-center gap-1.5 text-xs">
                  <Search className="w-3.5 h-3.5 text-[var(--c-muted)]" />
                  <input value={buscar} onChange={(e) => setBuscar(e.target.value)} placeholder="Buscar segmento" className="min-h-9 px-2.5 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-xs w-full sm:w-56" />
                </label>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-[var(--c-muted)] border-b border-[var(--c-border)]">
                      <th className="py-2 pr-2">Segmento</th>
                      <th className="py-2 px-2 text-right">Personas (estimado)</th>
                      <th className="py-2 pl-2 text-right">% de los adultos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabla.map((c) => (
                      <tr key={c.id} className={`border-b border-[var(--c-border)] ${foco?.id === c.id ? 'bg-[var(--c-accent-soft)]' : ''}`}>
                        <td className="py-1.5 pr-2">
                          <button type="button" onClick={() => { setFocoId(c.id); setAnalisis(null); }} className="text-left underline-offset-2 hover:underline">{c.fullTitle}</button>
                        </td>
                        <td className="py-1.5 px-2 text-right tabular-nums">{fmt(c.personas)}</td>
                        <td className="py-1.5 pl-2 text-right tabular-nums">{pct(c.pctAdultos)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-[var(--c-muted)]">{seg.metodo}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

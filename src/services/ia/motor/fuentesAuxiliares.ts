/**
 * FUENTES AUXILIARES del motor: tablas internas escritas a mano que tienen una fuente identificable pero NO están
 * verificadas contra el archivo original (veredicto B de docs/AUDITORIA_DATOS_AUXILIARES.md). Entran rotuladas
 * "AUXILIAR" y con su fuente declarada; sirven para series de tiempo y para vacíos que lo oficial no cubre. Lo que la
 * auditoría marcó como plantilla o supuesto (C) no se registra aquí.
 */
import { registrarFuente, type ContextoFuente } from './registro';
import { POPULATION_BY_YEAR } from '../../../data/observatorioComunas/populationData';
import { HOUSING_BY_YEAR } from '../../../data/observatorioComunas/housingData';
import { IPM_DATA } from '../../../data/observatorioComunas/ipmData';
import { CRIMINALITY_DATA } from '../../../data/observatorioComunas/criminalityData';
import { COMMUNES } from '../../../data/observatorioComunas/communeList';
import { ANTIOQUIA_SUBREGIONS_DATA } from '../../../data/antioquiaSubregionesData';
import { MUNICIPALITY_DETAILS } from '../../../data/antioquiaData';
import { RIONEGRO_ECV_2020, RIONEGRO_COMMUNE_DETAILED_PROFILES } from '../../../data/rionegroECV2020Data';
import { GRAPH_NODES_DATA, GRAPH_EDGES_DATA } from '../../../data/politicalHouses/politicalHousesMasterData';
import { MEDELLIN_COMUNAS } from '../../../data/observatorioAntioquia/analystMedellinData';
import { BELLO_COMUNAS } from '../../../data/observatorioAntioquia/analystOtherMunisData';
import { ITAGUI_COMUNAS } from '../../../data/observatorioAntioquia/analystRemainingMunisData';
import { ENVIGADO_COMUNAS } from '../../../data/observatorioAntioquia/analystEnvigadoAndOthersData';
import { territorioFicha, type TerritorioFicha } from '../../territoryProfileService';

const n = (v: number) => Math.round(v).toLocaleString('es-CO');
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

/** Comuna o corregimiento de Medellín (número de la tabla del Distrito) del territorio, o null */
const CORREG: Record<string, number> = { 'med-correg-palmitas': 50, 'med-correg-san-cristobal': 60, 'med-correg-altavista': 70, 'med-correg-san-antonio-de-prado': 80, 'med-correg-santa-elena': 90 };
function comunaMedellin(t: TerritorioFicha | null): { numero: number; propia: boolean } | null {
  if (!t || t.dane !== '05001' || t.tipo === 'municipio') return null;
  const id = t.tipo === 'subdivision' ? t.padreId ?? '' : t.id;
  const m = /^comuna-(\d+)$/.exec(id);
  const numero = m ? Number(m[1]) : CORREG[id];
  return numero ? { numero, propia: t.tipo === 'division' } : null;
}
/** Número de comuna en municipios con comunas ("Comuna 6 - Bellavista", "Comuna 01") */
function numeroComuna(t: TerritorioFicha | null): number | null {
  if (!t || t.tipo === 'municipio') return null;
  const d = t.tipo === 'subdivision' && t.padreId ? territorioFicha(t.padreId) : t;
  const m = /comuna\s*0*(\d+)/i.exec(d?.nombre ?? '');
  return m ? Number(m[1]) : null;
}
const nombreComunaMed = (k: number) => COMMUNES.find((c) => c.id === k)?.name ?? `comuna ${k}`;
const deSu = (c: { propia: boolean }, k: number) => (c.propia ? '' : ` (de su comuna: ${nombreComunaMed(k)})`);
const AÑOS = [2018, 2020, 2022, 2023, 2024, 2025, 2026, 2028, 2030];

// 1. Proyección de población y vivienda de Medellín por comuna, 2018-2030
registrarFuente({
  id: 'aux-medellin-proyeccion', titulo: 'Proyección de población y vivienda del Distrito por comuna (2018-2030)', categoria: 'población', nivel: 'auxiliar',
  fuente: 'tabla interna coherente con las proyecciones del Departamento Administrativo de Planeación de Medellín (sin verificar contra el archivo original); NO es la proyección del DANE',
  aplica: ({ t }) => t?.dane === '05001',
  lineas: ({ t }) => {
    const c = comunaMedellin(t);
    const k = c ? c.numero : 0;
    const p = (POPULATION_BY_YEAR as Record<number, Record<number, { total: number; hombres: number; mujeres: number }>>)[k];
    const v = (HOUSING_BY_YEAR as Record<number, Record<number, { total: number }>>)[k];
    if (!p) return [];
    const quien = k === 0 ? 'Medellín (total del Distrito)' : `${nombreComunaMed(k)}${c ? deSu(c, k) : ''}`;
    const out = [`${quien}, población proyectada: ${AÑOS.filter((y) => p[y]).map((y) => `${y} ${n(p[y].total)}`).join('; ')}. En 2026: ${n(p[2026]?.hombres ?? 0)} hombres y ${n(p[2026]?.mujeres ?? 0)} mujeres.`];
    if (v) out.push(`${quien}, viviendas proyectadas: ${AÑOS.filter((y) => v[y]).map((y) => `${y} ${n(v[y].total)}`).join('; ')}.`);
    if (k === 0) out.push(`Por comuna en 2026: ${Object.entries(POPULATION_BY_YEAR as Record<string, Record<number, { total: number }>>).filter(([x]) => x !== '0').map(([x, s]) => `${nombreComunaMed(Number(x))} ${n(s[2026]?.total ?? 0)}`).join('; ')}.`);
    return out;
  },
});

// 2. IPM de Medellín por comuna (Encuesta de Calidad de Vida), 2010-2025
registrarFuente({
  id: 'aux-medellin-ipm-ecv', titulo: 'Índice multidimensional de pobreza de Medellín por comuna (2010-2025)', categoria: 'economía', nivel: 'auxiliar',
  fuente: 'tabla interna del IPM de Medellín (Encuesta de Calidad de Vida, según el informe que la originó); es un índice distinto del IPM DANE por manzana del censo 2018: no se mezclan',
  aplica: ({ t }) => t?.dane === '05001',
  lineas: ({ t }) => {
    const c = comunaMedellin(t);
    if (!c) {
      return [`IPM por comuna, último año disponible: ${Object.entries(IPM_DATA).map(([k, l]) => `${nombreComunaMed(Number(k))} ${l.at(-1)?.ipmGlobal ?? '—'} (${l.at(-1)?.year ?? ''})`).join('; ')}.`];
    }
    const l = IPM_DATA[c.numero];
    if (!l?.length) return [];
    const u = l.at(-1)!;
    const dims = Object.entries(u).filter(([k, v]) => k !== 'year' && k !== 'ipmGlobal' && typeof v === 'number').sort((a, b) => (b[1] as number) - (a[1] as number)).slice(0, 5);
    return [
      `${nombreComunaMed(c.numero)}${deSu(c, c.numero)}: IPM ${l.map((r) => `${r.year} ${r.ipmGlobal}`).join('; ')}.`,
      `Privaciones más altas en ${u.year} (% de hogares): ${dims.map(([k, v]) => `${k} ${v}`).join(', ')}.`,
    ];
  },
});

// 3. Extorsión y gobernanza criminal por comuna de Medellín
registrarFuente({
  id: 'aux-medellin-gobernanza-criminal', titulo: 'Extorsión y gobernanza criminal por comuna de Medellín', categoria: 'seguridad', nivel: 'auxiliar',
  fuente: 'tabla interna con fuentes declaradas: Encuesta de Gobierno Criminal (CIEF EAFIT, U. de Chicago, IPA, 2020), Blattman et al. (APSR 2023), SISC de la Alcaldía y prensa; sin verificar contra el original',
  aplica: ({ t }) => t?.dane === '05001',
  lineas: ({ t }) => {
    const c = comunaMedellin(t);
    if (!c) return [`Nivel de extorsión por comuna: ${Object.values(CRIMINALITY_DATA).map((r) => `${r.communeName} ${r.extorsionLevel} (negocios ${r.extorsionNegociosPct} %)`).join('; ')}.`];
    const r = CRIMINALITY_DATA[c.numero];
    if (!r) return [];
    return [
      `${r.communeName}${deSu(c, c.numero)}: extorsión a hogares ${r.extorsionHogaresPct} %, a negocios ${r.extorsionNegociosPct} %, denuncia ${r.extorsionDenunciasPct} %; nivel ${r.extorsionLevel}. Índice de gobierno del combo ${r.indiceGobiernoCombo} frente al del Estado ${r.indiceGobiernoEstado}; combos estimados ${r.combosCountEst}.`,
      `Estructuras mencionadas: ${(r.bandasDominantes ?? []).join(', ')}. Funciones de gobierno que ejercen: ${(r.funcionesGobiernoEjercidas ?? []).join('; ')}.`,
    ];
  },
});

// 4. Perfiles por comuna "obtenidos de la web" (observatorio), sin el bloque electoral (que no tiene fuente)
type PerfilComuna = { numero: number; nombre: string; demografia?: Record<string, unknown>; economia?: Record<string, unknown>; social?: Record<string, unknown>; criminalidad?: Record<string, unknown> };
const PERFILES: Record<string, PerfilComuna[]> = { '05001': MEDELLIN_COMUNAS as unknown as PerfilComuna[], '05088': BELLO_COMUNAS as unknown as PerfilComuna[], '05360': ITAGUI_COMUNAS as unknown as PerfilComuna[], '05266': ENVIGADO_COMUNAS as unknown as PerfilComuna[] };
const plano = (o: unknown, pre = ''): string[] => {
  if (o == null || o === '') return [];
  if (typeof o !== 'object') return [`${pre}: ${String(o)}`];
  if (Array.isArray(o)) return o.length ? [`${pre}: ${o.map((x) => (typeof x === 'object' ? JSON.stringify(x) : String(x))).join('; ')}`] : [];
  return Object.entries(o).filter(([k]) => !/fuente|color/i.test(k)).flatMap(([k, v]) => plano(v, pre ? `${pre}.${k}` : k));
};
registrarFuente({
  id: 'aux-observatorio-comunas', titulo: 'Perfil de la comuna del observatorio (demografía, economía, social, criminalidad)', categoria: 'diagnóstico', nivel: 'auxiliar',
  fuente: 'tabla interna rotulada "información obtenida de la web" (y EAFIT para criminalidad); sin verificar. Su bloque electoral por comuna no tiene fuente y no se usa',
  aplica: ({ t }) => !!t && !!PERFILES[t.dane] && numeroComuna(t) != null,
  lineas: ({ t }) => {
    const k = numeroComuna(t)!;
    const p = PERFILES[t!.dane].find((x) => Number(x.numero) === k);
    if (!p) return [];
    return [`Comuna ${k} ${p.nombre}${t!.tipo === 'subdivision' ? ' (comuna del barrio)' : ''}:`, ...(['demografia', 'economia', 'social', 'criminalidad'] as const).flatMap((s) => plano(p[s], s)).map((l) => `  ${l}`)];
  },
});

// 5. Diagnóstico subregional (textos)
registrarFuente({
  id: 'aux-diagnostico-subregional', titulo: 'Diagnóstico de la subregión (problemas transversales y perfil estratégico)', categoria: 'diagnóstico', nivel: 'auxiliar',
  fuente: 'tabla interna de textos de diagnóstico; dice basarse en DANE, Gobernación y SGP, sin citas verificables. Sus cifras no se usan (las oficiales están en los datos)',
  aplica: ({ subregion }) => !!subregion,
  lineas: ({ subregion }) => {
    const s = Object.values(ANTIOQUIA_SUBREGIONS_DATA).find((x) => norm(x.name).startsWith(norm(subregion ?? '')) || norm(subregion ?? '').startsWith(norm(x.name)));
    if (!s) return [];
    return [
      `Subregión ${s.name}: ${s.synthesisStrategicProfile ?? ''}`,
      ...Object.entries(s.transversalPains ?? {}).map(([k, v]) => `  ${k}: ${v}`),
    ];
  },
});

// 6. Descripción municipal (textos; la población "~" no se usa)
registrarFuente({
  id: 'aux-descripcion-municipal', titulo: 'Descripción del municipio (etnia, desplazamiento, empleo, servicios, salud, seguridad)', categoria: 'diagnóstico', nivel: 'auxiliar',
  fuente: 'tabla interna de descripciones municipales sin fuente citada; sus poblaciones aproximadas difieren del DANE (mediana 10 %) y no se usan',
  aplica: ({ t }) => !!t && !!MUNICIPALITY_DETAILS[t.municipio],
  lineas: ({ t }) => {
    const d = MUNICIPALITY_DETAILS[t!.municipio] as unknown as { demographics?: Record<string, unknown>; socioeconomic?: Record<string, unknown>; security?: Record<string, unknown> };
    const txt = (o: Record<string, unknown> | undefined) => Object.entries(o ?? {}).filter(([k, v]) => typeof v === 'string' && !/^~|^\d/.test(v as string) && k !== 'total').map(([k, v]) => `  ${k}: ${v}`);
    return [`Municipio de ${t!.municipio}:`, ...txt(d.demographics), ...txt(d.socioeconomic), ...txt(d.security)];
  },
});

// 7. Rionegro: Encuesta de Calidad de Vida 2020 (OPP)
registrarFuente({
  id: 'aux-rionegro-ecv-2020', titulo: 'Encuesta de Calidad de Vida 2020 de Rionegro', categoria: 'población', nivel: 'auxiliar',
  fuente: 'Observatorio de Políticas Públicas de Rionegro y Alcaldía (ECV 2020), transcrita a una tabla interna; sin verificar contra el informe',
  aplica: ({ t }) => t?.dane === '05615',
  lineas: ({ t }) => {
    const m = RIONEGRO_ECV_2020.metadata as unknown as Record<string, unknown>;
    const out = [`Rionegro, ECV 2020: población ${n(Number(m.totalPopulation))}, jóvenes ${n(Number(m.youthPopulation))}, urbana ${m.urbanDistributionPct} %, rural ${m.ruralDistributionPct} %.`,
      ...plano(m.laborIndicatorsMunicipal, 'mercado laboral').map((l) => `  ${l}`)];
    const k = numeroComuna(t);
    const p = k ? Object.values(RIONEGRO_COMMUNE_DETAILED_PROFILES).find((x) => new RegExp(`c${k}\\b`).test(x.id)) : null;
    if (p) out.push(`Comuna ${k} (${p.name}): ${[p.populationText, p.householdsShareText, p.youthShareText, p.strataText, (p as unknown as { specificMetrics?: { unemploymentNote?: string } }).specificMetrics?.unemploymentNote].filter(Boolean).join(' · ')}`);
    return out;
  },
});

// 8. Casas políticas: actores del municipio con su trayectoria y relaciones (base curada)
registrarFuente({
  id: 'aux-casas-politicas', titulo: 'Casas políticas y actores del municipio (trayectoria y relaciones)', categoria: 'actores políticos', nivel: 'auxiliar',
  fuente: 'base curada del desarrollador; las relaciones citan medios (El Colombiano, La Silla Vacía, El Espectador) sin URL ni fecha: SIN VERIFICAR',
  aplica: ({ t }) => !!t && GRAPH_NODES_DATA.some((a) => a.municipality === t.municipio),
  lineas: ({ t }) => {
    const actores = GRAPH_NODES_DATA.filter((a) => a.municipality === t!.municipio);
    const ids = new Set(actores.map((a) => a.id));
    const nombre = new Map(GRAPH_NODES_DATA.map((a) => [a.id, a.name]));
    const rel = GRAPH_EDGES_DATA.filter((e) => ids.has(e.source) || ids.has(e.target));
    return [
      ...actores.map((a) => `${a.name} (${a.roleLabel ?? a.role}; ${a.partyName ?? 'sin partido'}; ${a.houseName ?? 'sin casa'}; ${a.status ?? ''}): ${a.bio ?? ''}`.trim()),
      ...rel.slice(0, 30).map((e) => `Relación: ${nombre.get(e.source) ?? e.source} → ${nombre.get(e.target) ?? e.target}: ${e.label} (${e.type}, fuerza ${e.strength}/5). ${e.description}`),
    ];
  },
});

export const AUXILIARES_CARGADAS = true;
export type { ContextoFuente };

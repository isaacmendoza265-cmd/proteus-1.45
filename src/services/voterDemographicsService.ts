// =============================================================================
// SEGMENTOS DE POBLACIÓN: Sexo × Grupo de edad × Estrato × Nivel educativo (54 cruces)
//
// Antes (hasta oct-2026) este servicio repartía el CENSO ELECTORAL con pesos fijos, iguales para todos los municipios
// (48,8 % hombres, 26 % jóvenes…), derivaba el estrato del NBI con una fórmula sin fuente, la educación del "% urbano"
// y le ponía a cada cruce una "participación esperada" y unos votos "en urnas" inventados. Nada de eso se medía.
//
// Ahora cada cruce sale de los datos del territorio:
//   - Sexo × edad (18 años o más): proyección DANE 2026 por sexo y edad (municipio, cabecera o resto rural). Donde no
//     la hay (comunas, barrios, veredas) se usa el CNPV 2018 por manzana, que trae sexo y edad por separado.
//   - Estrato: viviendas por estrato del CNPV 2018 por manzana (sumadas en el territorio).
//   - Nivel educativo: % de personas por nivel alcanzado, CNPV 2018 por manzana.
// El cruce de las cuatro variables es un ESTIMADO: supone que son independientes dentro del territorio (no lo son del
// todo: el estrato y la educación van juntos), y aplica a las personas el reparto de VIVIENDAS por estrato.
//
// No hay votos ni participación por cruce: el censo electoral no trae edad, estrato ni educación, y la participación
// solo se conoce por mesa o puesto, no por grupo. Se muestran aparte, con su fuente, para el territorio entero.
// Los textos de temas y canales de cada cruce son una guía general fija, no un dato del territorio.
// =============================================================================

import { ANTIOQUIA_125_MUNICIPIOS_GEOJSON } from '../data/geojson';
import type { SeleccionDossier } from './dossierTerritorialService';
import { getResultado2023 } from './electoralResults2023Service';
import { CENSUS_SOURCE_LABEL, getMedellinComunaCensus, getMedellinCorregimientoCensus, getMunicipalCensus } from './electoralCensusService';
import {
  cargarDemografia, cargarEconomia, demografia, economia, municipioFichaPorDane, piramide2026, territorioFicha,
  type EstadoDato, type TerritorioFicha,
} from './territoryProfileService';

export type GenderType = 'hombre' | 'mujer';
export type AgeGroupType = 'joven' | 'adulto' | 'adulto_mayor';
export type EconomicLevelType = 'bajo' | 'medio' | 'alto';
export type EducationLevelType = 'primaria' | 'secundaria' | 'superior';

export const SEXOS: GenderType[] = ['mujer', 'hombre'];
export const EDADES: AgeGroupType[] = ['joven', 'adulto', 'adulto_mayor'];
export const ESTRATOS: EconomicLevelType[] = ['bajo', 'medio', 'alto'];
export const EDUCACIONES: EducationLevelType[] = ['primaria', 'secundaria', 'superior'];

export const ETIQUETAS = {
  sexo: { hombre: 'Hombres', mujer: 'Mujeres' } as Record<GenderType, string>,
  edad: { joven: 'Jóvenes (18 a 29)', adulto: 'Adultos (30 a 59)', adulto_mayor: 'Adultos mayores (60 o más)' } as Record<AgeGroupType, string>,
  estrato: { bajo: 'Estratos 1 y 2', medio: 'Estratos 3 y 4', alto: 'Estratos 5 y 6' } as Record<EconomicLevelType, string>,
  educacion: { primaria: 'Primaria o ninguno', secundaria: 'Secundaria', superior: 'Técnica, universitaria o posgrado' } as Record<EducationLevelType, string>,
};

export interface DemographicCohort {
  id: string;
  gender: GenderType;
  ageGroup: AgeGroupType;
  economicLevel: EconomicLevelType;
  educationLevel: EducationLevelType;
  genderLabel: string;
  ageGroupLabel: string;
  economicLevelLabel: string;
  educationLevelLabel: string;
  fullTitle: string;
  /** Personas de 18 años o más estimadas en el cruce (supone independencia de las 4 variables) */
  personas: number;
  /** % de las personas de 18 años o más del territorio */
  pctAdultos: number;
  /** Guía general de referencia (texto fijo, no medido en el territorio) */
  guia: { tagline: string; temas: string[]; canales: string[] };
}

type Reparto<K extends string> = Record<K, number>;

export interface SegmentacionTerritorio {
  territorio: string;
  nivel: 'municipio' | 'división' | 'subdivisión' | 'subregión' | 'departamento';
  /** Personas de 18 años o más (base de los cruces); null si no hay sexo y edad para el territorio */
  adultos: number | null;
  sexoEdad: { estado: EstadoDato; fuente: string; reparto: Record<GenderType, Reparto<AgeGroupType>> | null };
  estrato: { estado: EstadoDato; fuente: string; reparto: Reparto<EconomicLevelType> | null; sinEstratoPct: number | null };
  educacion: { estado: EstadoDato; fuente: string; reparto: Reparto<EducationLevelType> | null };
  /** Contexto electoral del territorio entero (no por cruce) */
  electoral: {
    censo: number | null; mujeres: number | null; hombres: number | null; alcance: string;
    participacionAlcaldia2023: number | null; fuente: string;
  };
  /** 54 cruces; vacío si falta alguna de las cuatro variables */
  cohortes: DemographicCohort[];
  faltantes: string[];
  metodo: string;
}

export const METODO_SEGMENTOS = 'Estimado: cada cruce multiplica las personas de 18 años o más por sexo y edad por el reparto del estrato (viviendas) y del nivel educativo (personas) del mismo territorio, suponiendo que esas variables son independientes. No es un conteo: el DANE no publica el cruce de las cuatro. No hay votos ni participación por cruce.';

// --- Sexo × edad ---------------------------------------------------------------------------------------

const vacioEdad = (): Reparto<AgeGroupType> => ({ joven: 0, adulto: 0, adulto_mayor: 0 });

/** Grupos quinquenales (0-4 … 80+): 18 y 19 años son 2/5 del grupo 15-19 */
function edadesQuinquenales(v: number[]): Reparto<AgeGroupType> {
  const s = (a: number, b: number) => v.slice(a, b + 1).reduce((x, y) => x + (y ?? 0), 0);
  return { joven: 0.4 * (v[3] ?? 0) + s(4, 5), adulto: s(6, 11), adulto_mayor: s(12, 16) };
}
/** Grupos decenales (0-9 … 80+): 18 y 19 años son 2/10 del grupo 10-19 */
function edadesDecenales(v: number[]): Reparto<AgeGroupType> {
  const s = (a: number, b: number) => v.slice(a, b + 1).reduce((x, y) => x + (y ?? 0), 0);
  return { joven: 0.2 * (v[1] ?? 0) + (v[2] ?? 0), adulto: s(3, 5), adulto_mayor: s(6, 8) };
}

interface SexoEdadT { estado: EstadoDato; fuente: string; reparto: Record<GenderType, Reparto<AgeGroupType>> | null }

function sexoEdadDe(t: TerritorioFicha): SexoEdadT {
  const p = piramide2026(t);
  if (p) {
    const alcance = p.alcance === 'municipio' ? 'municipio' : p.alcance === 'cabecera' ? 'cabecera' : 'resto rural';
    return { estado: 'oficial', fuente: `${p.fuente} (${alcance})`, reparto: { hombre: edadesQuinquenales(p.hombres), mujer: edadesQuinquenales(p.mujeres) } };
  }
  const d = demografia(t);
  if (!d.datos || !d.conDetalle) return { estado: 'sin-informacion', fuente: d.fuente, reparto: null };
  const edades = d.datos.etiquetasEdad.length === 9 ? edadesDecenales(d.datos.edades) : edadesQuinquenales(d.datos.edades);
  const conSexo = d.datos.hombres + d.datos.mujeres;
  const ph = d.datos.hombres / conSexo;
  const rep = (f: number) => ({ joven: edades.joven * f, adulto: edades.adulto * f, adulto_mayor: edades.adulto_mayor * f });
  return {
    estado: 'estimado',
    fuente: `${d.fuente} (CNPV 2018; trae sexo y edad por separado: el cruce supone la misma proporción de hombres en cada edad)`,
    reparto: { hombre: rep(ph), mujer: rep(1 - ph) },
  };
}

// --- Estrato y educación -------------------------------------------------------------------------------

interface EcoT { estratos: number[]; educacionPct: number[] /* 5 niveles */; peso: number }

function ecoDe(t: TerritorioFicha): EcoT | null {
  const e = economia(t);
  if (!e) return null;
  return { estratos: e.estratos, educacionPct: e.educacion.map((x) => x.pct), peso: 1 };
}

function repartoEstrato(estratos: number[]): { reparto: Reparto<EconomicLevelType>; sinEstratoPct: number } | null {
  const con = estratos.slice(0, 6).reduce((a, b) => a + b, 0);
  if (!con) return null;
  const total = con + (estratos[6] ?? 0);
  return {
    reparto: { bajo: (estratos[0] + estratos[1]) / con, medio: (estratos[2] + estratos[3]) / con, alto: (estratos[4] + estratos[5]) / con },
    sinEstratoPct: total ? (100 * (estratos[6] ?? 0)) / total : 0,
  };
}

function repartoEducacion(pct: number[]): Reparto<EducationLevelType> | null {
  const tot = pct.reduce((a, b) => a + b, 0);
  if (!tot) return null;
  return { primaria: (pct[0] + pct[1]) / tot, secundaria: pct[2] / tot, superior: (pct[3] + pct[4]) / tot };
}

// --- Guía general por cruce (texto fijo) -----------------------------------------------------------------

function guiaGeneral(g: GenderType, a: AgeGroupType, e: EconomicLevelType): DemographicCohort['guia'] {
  if (a === 'joven') {
    if (e === 'bajo') return { tagline: 'Jóvenes de sectores populares: empleo, estudio y seguridad del barrio.', temas: ['Primer empleo', 'Transporte', 'Seguridad barrial y reclutamiento', 'Formación técnica'], canales: ['TikTok y Reels', 'WhatsApp barrial', 'Canchas y parques'] };
    if (e === 'medio') return { tagline: 'Jóvenes de clase media: estudio, empleo calificado y vivienda.', temas: ['Empleo en servicios y tecnología', 'Becas', 'Salud mental', 'Vivienda joven'], canales: ['Instagram', 'TikTok', 'Comunidades universitarias'] };
    return { tagline: 'Jóvenes de estratos altos: emprendimiento, ambiente e instituciones.', temas: ['Emprendimiento e inversión', 'Ambiente', 'Transparencia'], canales: ['Instagram', 'LinkedIn', 'Pódcasts'] };
  }
  if (a === 'adulto') {
    if (e === 'bajo') return g === 'mujer'
      ? { tagline: 'Mujeres de sectores populares, muchas jefas de hogar: ingreso, cuidado y seguridad.', temas: ['Cuidado infantil', 'Extorsión y "gota a gota"', 'Costo de la canasta', 'Crédito productivo'], canales: ['WhatsApp barrial', 'Juntas de acción comunal', 'Puerta a puerta', 'Emisoras locales'] }
      : { tagline: 'Hombres de sectores populares: empleo formal y seguridad.', temas: ['Extorsión y microtráfico', 'Empleo formal', 'Crédito sin usura'], canales: ['WhatsApp', 'Lugares de trabajo', 'Torneos barriales', 'Radio local'] };
    if (e === 'medio') return { tagline: 'Adultos de clase media: costo de vida, educación de los hijos y seguridad.', temas: ['Costo de vida y tarifas', 'Educación de los hijos', 'Seguridad en la calle y el transporte', 'Salud'], canales: ['Facebook e Instagram', 'WhatsApp de padres de familia', 'Comercio local', 'Prensa local'] };
    return { tagline: 'Adultos de estratos altos: impuestos, gestión pública e inversión.', temas: ['Impuestos', 'Trámites', 'Infraestructura', 'Seguridad jurídica'], canales: ['LinkedIn', 'Gremios', 'Prensa de opinión y económica'] };
  }
  if (e === 'bajo') return { tagline: 'Adultos mayores de sectores populares: salud, subsidios y compañía.', temas: ['Medicamentos y citas', 'Subsidio al adulto mayor', 'Comedores comunitarios', 'Seguridad en el espacio público'], canales: ['Radio comunitaria', 'Parroquias y centros de salud', 'Puerta a puerta'] };
  return { tagline: 'Adultos mayores de clase media y alta: pensión, salud y seguridad.', temas: ['Pensión', 'Salud', 'Estafas', 'Espacio público seguro'], canales: ['WhatsApp familiar', 'Radio', 'Prensa impresa', 'Asociaciones de pensionados'] };
}

// --- Armado ------------------------------------------------------------------------------------------------

function cruzar(se: Record<GenderType, Reparto<AgeGroupType>>, es: Reparto<EconomicLevelType>, ed: Reparto<EducationLevelType>, adultos: number): DemographicCohort[] {
  const out: DemographicCohort[] = [];
  for (const g of SEXOS) for (const a of EDADES) for (const e of ESTRATOS) for (const u of EDUCACIONES) {
    const personas = se[g][a] * es[e] * ed[u];
    out.push({
      id: `cohorte-${g}-${a}-${e}-${u}`,
      gender: g, ageGroup: a, economicLevel: e, educationLevel: u,
      genderLabel: ETIQUETAS.sexo[g], ageGroupLabel: ETIQUETAS.edad[a], economicLevelLabel: ETIQUETAS.estrato[e], educationLevelLabel: ETIQUETAS.educacion[u],
      fullTitle: `${ETIQUETAS.sexo[g]} · ${ETIQUETAS.edad[a].toLowerCase()} · ${ETIQUETAS.estrato[e].toLowerCase()} · ${ETIQUETAS.educacion[u].toLowerCase()}`,
      personas: Math.round(personas),
      pctAdultos: adultos ? (100 * personas) / adultos : 0,
      guia: guiaGeneral(g, a, e),
    });
  }
  return out.sort((x, y) => y.personas - x.personas);
}

const fichaDeDane = (dane: string) => { const id = municipioFichaPorDane(dane); return id ? territorioFicha(id) : null; };

function municipiosDe(subregion: string | null): string[] {
  return ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features
    .filter((f) => !subregion || String(f.properties.subregion ?? '') === subregion)
    .map((f) => String((f.properties as { daneCode?: string }).daneCode));
}

/** Censo y participación del territorio entero (Registraduría). Debajo del municipio, el de la comuna de Medellín o el del municipio. */
function electoralDe(daneList: string[], t: TerritorioFicha | null): SegmentacionTerritorio['electoral'] {
  let censo = 0, mujeres = 0, hombres = 0, votantes = 0, censoAlc = 0, alcance = daneList.length > 1 ? `${daneList.length} municipios` : 'municipio';
  const div = t && t.dane === '05001' ? (t.tipo === 'division' ? t.id : null) : null;
  const comuna = div ? /^comuna-(\d+)$/.exec(div)?.[1] : null;
  const cm = comuna ? getMedellinComunaCensus(Number(comuna)) : div?.startsWith('med-correg-') ? getMedellinCorregimientoCensus(div) : undefined;
  if (cm) { censo = cm.total; mujeres = cm.mujeres; hombres = cm.hombres; alcance = t!.nombre; }
  else {
    for (const d of daneList) { const c = getMunicipalCensus(d); if (c) { censo += c.total; mujeres += c.mujeres; hombres += c.hombres; } }
    if (t && t.tipo !== 'municipio') alcance = `municipio de ${t.municipio} (no hay censo cargado para ${t.nombre})`;
  }
  for (const d of daneList) { const r = getResultado2023(d); if (r) { votantes += r.alcaldia.votantes; censoAlc += r.alcaldia.censo; } }
  return {
    censo: censo || null, mujeres: mujeres || null, hombres: hombres || null, alcance,
    participacionAlcaldia2023: censoAlc ? (100 * votantes) / censoAlc : null,
    fuente: `${CENSUS_SOURCE_LABEL} · Registraduría, escrutinio de Alcaldía 2023 (participación de ${daneList.length > 1 ? 'los municipios' : 'todo el municipio'})`,
  };
}

const cache = new Map<string, Promise<SegmentacionTerritorio>>();

/** Segmentos de la unidad territorial (la del territorio activo, por defecto en la vista) */
export function segmentarTerritorio(sel: SeleccionDossier): Promise<SegmentacionTerritorio> {
  const clave = JSON.stringify(sel);
  if (!cache.has(clave)) {
    const p = armar(sel);
    p.catch(() => cache.delete(clave));
    cache.set(clave, p);
  }
  return cache.get(clave)!;
}

async function armar(sel: SeleccionDossier): Promise<SegmentacionTerritorio> {
  const id = sel.barrioId ?? sel.comunaId ?? sel.muniId;
  const t = id ? territorioFicha(id) : null;
  const daneList = t ? [t.dane] : municipiosDe(sel.subregion);
  await Promise.all(daneList.flatMap((d) => [cargarDemografia(d), cargarEconomia(d)]));

  let se: SexoEdadT; let eco: EcoT | null; let territorio: string; let nivel: SegmentacionTerritorio['nivel'];
  if (t) {
    se = sexoEdadDe(t); eco = ecoDe(t); territorio = t.tipo === 'municipio' ? t.nombre : `${t.nombre} (${t.municipio})`;
    nivel = t.tipo === 'municipio' ? 'municipio' : t.tipo === 'division' ? 'división' : 'subdivisión';
  } else {
    // Subregión o departamento: suma de los municipios (proyección DANE 2026 por municipio y CNPV 2018 por manzana)
    territorio = sel.subregion ? `Subregión ${sel.subregion}` : 'Antioquia';
    nivel = sel.subregion ? 'subregión' : 'departamento';
    const fichas = daneList.map(fichaDeDane).filter((x): x is TerritorioFicha => !!x);
    const partes = fichas.map((f) => ({ se: sexoEdadDe(f), eco: ecoDe(f) }));
    const completo = partes.length > 0 && partes.every((x) => x.se.reparto);
    const rep = { hombre: vacioEdad(), mujer: vacioEdad() };
    if (completo) for (const x of partes) for (const g of SEXOS) for (const a of EDADES) rep[g][a] += x.se.reparto![g][a];
    se = completo ? { estado: 'oficial', fuente: `${partes[0].se.fuente.replace(/ \(municipio\)$/, '')}, suma de ${partes.length} municipios`, reparto: rep } : { estado: 'sin-informacion', fuente: 'DANE', reparto: null };
    // Estrato: suma de viviendas. Educación: promedio de los % municipales ponderado por sus personas de 18 años o más.
    const conEco = partes.filter((x) => x.eco && x.se.reparto);
    if (conEco.length === partes.length && conEco.length) {
      const estratos = new Array(7).fill(0) as number[]; const edu = new Array(5).fill(0) as number[];
      for (const x of conEco) {
        const w = SEXOS.reduce((s, g) => s + EDADES.reduce((s2, a) => s2 + x.se.reparto![g][a], 0), 0);
        x.eco!.estratos.forEach((v, i) => { estratos[i] += v; });
        x.eco!.educacionPct.forEach((v, i) => { edu[i] += v * w; });
      }
      eco = { estratos, educacionPct: edu, peso: 1 };
    } else eco = null;
  }

  const adultos = se.reparto ? SEXOS.reduce((s, g) => s + EDADES.reduce((s2, a) => s2 + se.reparto![g][a], 0), 0) : null;
  const est = eco ? repartoEstrato(eco.estratos) : null;
  const edu = eco ? repartoEducacion(eco.educacionPct) : null;
  const fuenteEco = 'DANE, CNPV 2018 por manzana (sumado en el territorio)';
  const faltantes = [
    !se.reparto && 'sexo y edad',
    !est && 'estrato',
    !edu && 'nivel educativo',
  ].filter(Boolean) as string[];

  return {
    territorio, nivel, adultos: adultos != null ? Math.round(adultos) : null,
    sexoEdad: se,
    estrato: { estado: est ? 'oficial' : 'sin-informacion', fuente: `${fuenteEco}: viviendas por estrato`, reparto: est?.reparto ?? null, sinEstratoPct: est?.sinEstratoPct ?? null },
    educacion: { estado: edu ? 'oficial' : 'sin-informacion', fuente: `${fuenteEco}: personas por nivel educativo alcanzado (todas las edades)${t ? '' : ', ponderado por las personas de 18 años o más de cada municipio'}`, reparto: edu },
    electoral: electoralDe(daneList, t),
    cohortes: se.reparto && est && edu && adultos ? cruzar(se.reparto, est.reparto, edu, adultos) : [],
    faltantes,
    metodo: METODO_SEGMENTOS,
  };
}

/** Texto de los segmentos para la instrucción de Gemini (solo cifras de los datos, con su rótulo) */
export function segmentacionComoTexto(s: SegmentacionTerritorio, foco?: DemographicCohort): string {
  const n = (x: number | null | undefined) => (x == null ? 'sin información' : Math.round(x).toLocaleString('es-CO'));
  const p = (x: number | null | undefined) => (x == null ? 'sin información' : `${x.toFixed(1).replace('.', ',')} %`);
  const lineas = [
    `Segmentos de población de ${s.territorio} (${s.nivel}).`,
    `Personas de 18 años o más: ${n(s.adultos)} (${s.sexoEdad.fuente}).`,
    s.estrato.reparto ? `Estrato (viviendas): bajo ${p(100 * s.estrato.reparto.bajo)}, medio ${p(100 * s.estrato.reparto.medio)}, alto ${p(100 * s.estrato.reparto.alto)}. ${s.estrato.fuente}.` : 'Estrato: sin información.',
    s.educacion.reparto ? `Nivel educativo (personas): primaria o ninguno ${p(100 * s.educacion.reparto.primaria)}, secundaria ${p(100 * s.educacion.reparto.secundaria)}, superior ${p(100 * s.educacion.reparto.superior)}. ${s.educacion.fuente}.` : 'Nivel educativo: sin información.',
    `Censo electoral (${s.electoral.alcance}): ${n(s.electoral.censo)}; participación en Alcaldía 2023: ${p(s.electoral.participacionAlcaldia2023)} (${s.electoral.fuente}). El censo no trae edad, estrato ni educación: no hay votos ni participación por segmento.`,
    `Método de los cruces: ${s.metodo}`,
  ];
  if (foco) lineas.push(`Segmento elegido: ${foco.fullTitle}: ${n(foco.personas)} personas de 18 años o más estimadas (${p(foco.pctAdultos)} de los adultos del territorio). Estimado, no conteo.`);
  return lineas.join('\n');
}

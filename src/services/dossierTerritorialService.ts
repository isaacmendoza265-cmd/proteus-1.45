/**
 * DOSSIER TERRITORIAL: todo lo que Proteus sabe de una unidad territorial, en texto, para Gemini.
 *
 * Una sola fuente para el analista territorial y para el generador de contenido: los dos leen el mismo dossier antes
 * de responder o redactar. Unidad: municipio, comuna/corregimiento o barrio/vereda (o subregión y Antioquia, con un
 * resumen por municipio). Cada línea dice su fuente y si es oficial o estimado; lo que no hay se dice.
 *
 * Secciones (en este orden): identificación · población · condiciones económicas · estratificación o valor del suelo ·
 * la alcaldía en cifras · censo electoral (2026 y serie) · resultados de TODAS las elecciones cargadas (serie
 * 2015-2026, en el territorio y, si es un territorio menor, también en el municipio) · corporaciones por candidato ·
 * actores políticos (base curada, sin verificar) · lectura de Proteus (análisis narrativo, si existe).
 */
import rawIndice from '../data/territorio/indiceTerritorios.json';
import { ANTIOQUIA_125_MUNICIPIOS_GEOJSON } from '../data/geojson';
import { getDaneMunicipio } from './daneMunicipalService';
import { cargarElecciones, sumarEleccion, type EleccionPuestos } from './electionResultsService';
import { cargarGanadores } from './winnersService';
import { indicadoresDerivados } from './ia/indicadoresDerivados';
import {
  actoresDeTerritorio, cargarDemografia, cargarEconomia, censoElectoral, demografia, economia, piramide2026,
  territorioFicha, municipioFichaPorDane, type TerritorioFicha,
} from './territoryProfileService';
import { estratificacionOficial } from './estratificacionService';
import { valorSuelo } from './valoresSueloService';
import { CATEGORIA_TEXTO, categoriaMunicipio, curulesConcejo, pesos, presupuestoMunicipio } from './perfilMunicipalService';
import { serieCenso } from './censoHistoricoService';
import { concejoDesdeEleccion, cargarConcejo2023, LISTAS_POR_CANDIDATO } from './concejo2023Service';
import { getResultado2023 } from './electoralResults2023Service';
import { analizarUnidad, esMunicipioDelAnalisis, type AnalisisNarrativo } from './municipioNarrativeService';
import { cargarPuestosTerritorio, codigosResultadosDe, puestosDe } from '../components/territorio/usePuestosTerritorio';
import { fuentesRegistradas, versionFuentes, type CoberturaFuente, type CategoriaFuente, type ContextoFuente } from './ia/motor/registro';
// Fuentes que se registran solas (auxiliares por código y archivos de src/data/motor/)
import './ia/motor/fuentesAuxiliares';
import './ia/motor/fuentesDeclarativas';
import './ia/motor/fuenteNoticias';

export interface SeccionDossier { titulo: string; lineas: string[]; nivel?: 'oficial' | 'auxiliar'; categoria?: CategoriaFuente; id?: string }
export interface DossierTerritorial {
  /** Nombre completo de la unidad ("Comuna 14 - El Poblado, Medellín") */
  territorio: string;
  nivel: 'barrio o vereda' | 'comuna o corregimiento' | 'municipio' | 'subregión' | 'departamento';
  secciones: SeccionDossier[];
  /** Qué fuentes del motor tuvieron datos para esta unidad (para auditar la cobertura) */
  cobertura: CoberturaFuente[];
}

/** Selección en el mapa o el formulario: la más fina que no sea null manda */
export interface SeleccionDossier { subregion: string | null; muniId: string | null; comunaId: string | null; barrioId: string | null }

interface IndiceMunicipio { dane: string; nombre: string }
const INDICE = rawIndice as unknown as Record<string, IndiceMunicipio>;

const n = (v: number) => Math.round(v).toLocaleString('es-CO');
const p = (v: number | null | undefined) => (v == null || !Number.isFinite(v) ? 'sin dato' : `${v.toFixed(1).replace('.', ',')} %`);

// --- Resultados -----------------------------------------------------------------------------------

/** Una elección en un alcance: totales, participación (si el censo está completo) y los primeros */
function lineasEleccion(e: EleccionPuestos, codigos: string[] | 'todos', alcance: string, cuantos: number): string[] {
  const r = sumarEleccion(e, codigos);
  if (!r) return [`${e.nombre} en ${alcance}: sin puestos de esa elección dentro del territorio.`];
  const part = r.habilitados && !r.sinHabilitados ? `, participación ${p((100 * r.votantes) / r.habilitados)} de ${n(r.habilitados)} habilitados` : '';
  const validos = r.partidos.reduce((s, x) => s + x.votos, 0) + r.blanco;
  const out = [`${e.nombre} (${e.fecha}) en ${alcance} — Registraduría, ${e.tipo}; ${n(r.puestos)} puestos: ${n(r.votantes)} votantes${part}; voto en blanco ${p(validos ? (100 * r.blanco) / validos : 0)}; nulos ${n(r.nulos)}.`];
  const lista = e.porCandidato ? r.candidatos : r.partidos;
  out.push(`  ${e.porCandidato ? 'Candidatos' : 'Partidos y listas'}: ${lista.slice(0, cuantos).map((x) => `${x.nombre}${'partido' in x && x.partido && x.partido !== x.nombre ? ` (${x.partido})` : ''} ${p(x.pct)} [${n(x.votos)}]`).join('; ')}.`);
  return out;
}

/** Corporaciones con voto preferente: los candidatos más votados del alcance */
function lineasCandidatos(e: EleccionPuestos, codigos: string[] | 'todos', municipio: string, dane: string): string[] {
  const c = concejoDesdeEleccion(e, codigos, municipio, dane);
  if (!c || !c.partidos.some((x) => x.candidatos.length)) return [];
  const todos = c.partidos.flatMap((x) => x.candidatos.map((k) => ({ ...k, partido: x.nombre }))).sort((a, b) => b.votos - a.votos).slice(0, 12);
  const curules = c.partidos.filter((x) => x.curules).map((x) => `${x.nombre} ${x.curules}`).join(', ');
  return [
    `  Candidatos más votados (voto preferente${c.candidatosParciales ? '; en cada puesto solo se guardaron los que suman el 97 %, así que son mínimos' : ''}): ${todos.map((k) => `${k.nombre} (${k.partido}) ${n(k.votos)}`).join('; ')}.`,
    ...(curules ? [`  Curules por lista (escrutinio municipal): ${curules}.`] : []),
  ];
}

// --- Fuentes registradas en el motor (auxiliares y declarativas) --------------------------------------

/** Categoría de las secciones fijas (todas oficiales salvo actores y lectura de Proteus) */
const CATEGORIA_FIJA: Record<string, CategoriaFuente> = {
  'Identificación': 'identificación', 'Población': 'población', 'Condiciones económicas (2018)': 'economía',
  'Estratificación vigente o valor del suelo': 'estratificación', 'Censo electoral': 'censo electoral',
  'Resultados electorales (serie 2015-2026)': 'resultados electorales',
  'Indicadores derivados (Modelo Proteus): márgenes, variaciones y brechas': 'resultados electorales', 'Municipios (DANE, Contaduría, CUIPO, Registraduría)': 'institucional',
};
const sinDato = (l: string) => /^(sin |ninguno registrado|sin información)/i.test(l.trim());

async function completarConMotor(secciones: SeccionDossier[], ctx: ContextoFuente): Promise<CoberturaFuente[]> {
  const cobertura: CoberturaFuente[] = secciones.map((x) => {
    const auxiliar = /SIN VERIFICAR|hipótesis/i.test(x.titulo);
    const datos = x.lineas.filter((l) => !sinDato(l)).length;
    x.nivel = x.nivel ?? (auxiliar ? 'auxiliar' : 'oficial');
    x.categoria = x.categoria ?? CATEGORIA_FIJA[x.titulo] ?? (/alcaldía/i.test(x.titulo) ? 'institucional' : /actores/i.test(x.titulo) ? 'actores políticos' : /lectura/i.test(x.titulo) ? 'lectura de Proteus' : 'otra');
    return { id: `fija:${x.titulo}`, titulo: x.titulo, categoria: x.categoria, nivel: x.nivel, estado: datos ? 'con datos' : 'sin datos', datos };
  });
  for (const f of fuentesRegistradas()) {
    if (!f.aplica(ctx)) { cobertura.push({ id: f.id, titulo: f.titulo, categoria: f.categoria, nivel: f.nivel, estado: 'no aplica', datos: 0 }); continue; }
    let lineas: string[] = [];
    try { lineas = (await f.lineas(ctx)).filter((l) => l && l.trim()); } catch (e) { console.warn(`Fuente ${f.id} falló:`, e); }
    cobertura.push({ id: f.id, titulo: f.titulo, categoria: f.categoria, nivel: f.nivel, estado: lineas.length ? 'con datos' : 'sin datos', datos: lineas.length });
    if (lineas.length) {
      secciones.push({
        id: f.id, nivel: f.nivel, categoria: f.categoria,
        titulo: `${f.nivel === 'auxiliar' ? 'AUXILIAR (sin verificar) · ' : ''}${f.titulo}`,
        lineas: [`Fuente: ${f.fuente}.`, ...lineas],
      });
    }
  }
  return cobertura;
}

// --- Construcción ---------------------------------------------------------------------------------

async function dossierLocal(t: TerritorioFicha): Promise<DossierTerritorial> {
  const muniId = municipioFichaPorDane(t.dane)!;
  const secciones: SeccionDossier[] = [];
  const nivel: DossierTerritorial['nivel'] = t.tipo === 'municipio' ? 'municipio' : t.tipo === 'division' ? 'comuna o corregimiento' : 'barrio o vereda';
  const nombre = t.tipo === 'municipio' ? t.nombre : `${t.nombre}, ${t.municipio}`;
  const [, , elecciones, puestos] = await Promise.all([
    cargarDemografia(t.dane), cargarEconomia(t.dane), cargarElecciones(t.dane), cargarPuestosTerritorio(muniId, t.municipio),
  ]);
  const geo = ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features.find((f) => (f.properties as { daneCode?: string }).daneCode === t.dane);
  const padre = t.padreId ? territorioFicha(t.padreId)?.nombre : undefined;

  // 1. Identificación
  secciones.push({ titulo: 'Identificación', lineas: [
    `${nombre}: ${t.tipo === 'municipio' ? 'municipio' : (t.clase ?? nivel).toLowerCase()}${padre ? ` de ${padre}` : ''}${t.tipo !== 'municipio' ? ` (municipio de ${t.municipio})` : ''}, subregión ${String(geo?.properties.subregion ?? 'sin dato')}, Antioquia. Código DANE del municipio ${t.dane}.`,
  ] });

  // 2. Población
  const pob: string[] = [];
  const dm = getDaneMunicipio(t.dane);
  if (dm) pob.push(`Municipio de ${t.municipio}: ${n(dm.poblacion)} habitantes proyectados 2026 (DANE), ${n(dm.poblacionCabecera)} en la cabecera y ${n(dm.poblacionRural)} rurales. NBI 2018 ${p(dm.nbi2018)}, miseria ${p(dm.miseria2018)} (DANE, CNPV 2018).`);
  const pir = piramide2026(t);
  if (pir) pob.push(`Proyección 2026 (${pir.fuente}, ${pir.alcance}): ${n(pir.total)} personas, ${n(pir.mayores18)} de 18 años o más; por edad (hombres/mujeres): ${pir.grupos.map((g, i) => `${g} ${n(pir.hombres[i])}/${n(pir.mujeres[i])}`).join(', ')}.`);
  const dem = demografia(t);
  if (dem.datos) {
    const d = dem.datos;
    pob.push(`Censo 2018 (DANE, CNPV por manzana) en ${t.nombre}: ${n(d.personas)} personas (${n(d.mujeres)} mujeres, ${n(d.hombres)} hombres), ${n(d.viviendas)} viviendas, ${n(d.hogares)} hogares, ${n(d.unidadesEconomicas)} unidades económicas.`);
    if (dem.conDetalle && d.personas) pob.push(`  Edad 2018: ${d.etiquetasEdad.map((g, i) => `${g} ${p((100 * d.edades[i]) / Math.max(1, d.personas - d.personasAnonimizadas))}`).join(', ')}.`);
  } else pob.push(`Censo 2018 en ${t.nombre}: sin información (${dem.motivo ?? 'el DANE no lo publica aquí'}).`);
  secciones.push({ titulo: 'Población', lineas: pob });

  // 3. Condiciones económicas (CNPV 2018)
  const eco = economia(t);
  const ecoL: string[] = [];
  if (eco && eco.estado === 'oficial') {
    const tot = eco.estratos.slice(0, 6).reduce((a, b) => a + b, 0) || 1;
    ecoL.push(`Viviendas por estrato declarado (factura de energía, CNPV 2018; no es la estratificación vigente): ${eco.estratos.slice(0, 6).map((v, i) => `E${i + 1} ${p((100 * v) / tot)}`).join(', ')}; estrato típico ${eco.estratoModa}, promedio ${eco.estratoPromedio!.toFixed(1).replace('.', ',')}.`);
    if (eco.ipm != null) ecoL.push(`Pobreza multidimensional (IPM, DANE por manzana): ${p(eco.ipm)}.`);
    if (eco.vulnerabilidad) ecoL.push(`Vulnerabilidad DANE (personas): ${eco.vulnerabilidad.map((x) => `${x.nombre} ${p(x.pct)}`).join(', ')}.`);
    ecoL.push(`Servicios en la vivienda: ${eco.servicios.map((x) => `${x.nombre} ${p(x.pct)}`).join(', ')}.`);
    ecoL.push(`Nivel educativo alcanzado: ${eco.educacion.map((x) => `${x.nombre} ${p(x.pct)}`).join(', ')}.`);
    ecoL.push(`Unidades económicas: ${n(eco.unidadesEconomicas.total)} (${n(eco.unidadesEconomicas.comercio)} de comercio, ${n(eco.unidadesEconomicas.servicios)} de servicios, ${n(eco.unidadesEconomicas.industria)} de industria).`);
  } else ecoL.push('Sin datos económicos del censo 2018 para este territorio.');
  secciones.push({ titulo: 'Condiciones económicas (2018)', lineas: ecoL });

  // 4. Estratificación oficial o valor del suelo
  const est = estratificacionOficial(t, muniId);
  const suelo = est ? null : valorSuelo(t, muniId);
  const estL: string[] = [];
  if (est) estL.push(`Estratificación oficial vigente (${est.fuente}; ${est.unidad}): ${est.estratos.map((v, i) => `E${i + 1} ${p((100 * v) / est.total)}`).join(', ')} de ${n(est.total)} ${est.unidad}; estrato más común ${est.estratoModa}.${t.tipo === 'subdivision' ? ` ${est.nota}` : ''}`);
  else if (suelo) {
    estL.push(`El municipio no publica su estratificación oficial. Sustituto: valor ${suelo.tipo} del suelo (${suelo.fuente}): ${'$'}${n(suelo.valorM2)} por m² en promedio ponderado por área${suelo.cobertura != null ? `, con zonas de valor en el ${p(suelo.cobertura)} del área` : ''}.`);
    if (suelo.urbano != null && suelo.rural != null) estL.push(`  Promedio de los barrios ${'$'}${n(suelo.urbano)} por m²; de las veredas ${'$'}${n(suelo.rural)}.`);
    if (suelo.ranking.length > 1) estL.push(`  Por barrio o vereda (de mayor a menor): ${suelo.ranking.map((r) => `${territorioFicha(r.id)?.nombre ?? r.id} ${'$'}${n(r.valorM2)}`).join('; ')}.`);
  } else estL.push('Sin estratificación oficial ni valor del suelo cargados para este municipio.');
  secciones.push({ titulo: 'Estratificación vigente o valor del suelo', lineas: estL });

  // 5. La alcaldía en cifras (siempre del municipio)
  const alc: string[] = [];
  const cat = categoriaMunicipio(t.dane);
  if (cat) {
    // Tramos de vigencias con la misma categoría: "2004-2026 Especial"
    const tramos: { desde: string; hasta: string; cat: string }[] = [];
    for (const c of [...cat.lista].reverse()) {
      const u = tramos[tramos.length - 1];
      if (u && u.cat === c.categoria) u.hasta = c.vigencia; else tramos.push({ desde: c.vigencia, hasta: c.vigencia, cat: c.categoria });
    }
    alc.push(`Categoría del municipio (${cat.fuente}): ${tramos.reverse().map((x) => `${x.desde === x.hasta ? x.desde : `${x.desde}-${x.hasta}`} ${CATEGORIA_TEXTO[x.cat] ?? x.cat}`).join(', ')}.`);
  }
  const pres = presupuestoMunicipio(t.dane);
  if (pres) alc.push(...pres.anios.map(({ anio, datos: d }) => `Presupuesto de gastos ${anio} (${pres.fuente}; corte ${d.corte}): inicial ${pesos(d.inicial)}, definitivo ${pesos(d.definitivo)} (${pesos(d.porHabitante)} por habitante), compromisos ${pesos(d.compromisos)}, pagos ${pesos(d.pagos)}.${d.alerta ? ` Alerta: ${d.alerta}` : ''}`));
  for (const y of ['2023', '2019', '2015']) {
    const c = curulesConcejo(t.dane, y);
    if (c) alc.push(`Concejo ${y}: ${n(c.curules)} curules a proveer${c.aListas != null ? ` (${n(c.aListas)} repartidas a listas)` : ''} (${c.fuente}).`);
  }
  const r23 = getResultado2023(t.dane);
  if (r23) alc.push(`Alcaldía 2023, escrutinio oficial del municipio (prevalece sobre el preconteo por puesto de la sección de resultados): ${r23.alcaldia.candidatos.slice(0, 4).map((c) => `${c.nombre} (${c.partido}) ${p(c.pctValidos)}`).join('; ')}; participación ${p(r23.alcaldia.participacion)} de ${n(r23.alcaldia.censo)} habilitados.`);
  if (alc.length) secciones.push({ titulo: `La alcaldía de ${t.municipio} en cifras`, lineas: alc });

  // 6. Censo electoral
  const enTerr = t.tipo === 'municipio' ? null : puestosDe(puestos, t.tipo, t.id);
  const cen = censoElectoral(t, enTerr ?? puestosDe(puestos, 'municipio', t.id), t.tipo === 'municipio' ? puestos.sinUbicar : []);
  const cenL: string[] = [];
  if (cen.censo) {
    cenL.push(`Censo electoral 2026 (Registraduría, corte 30-abr-2026) ${t.tipo === 'municipio' ? 'del municipio' : 'de los puestos ubicados dentro'}: ${n(cen.censo)} habilitados (${n(cen.mujeres)} mujeres, ${n(cen.hombres)} hombres), ${n(cen.mesas)} mesas, ${n(cen.puestos.length)} puestos. ${cen.nota}`);
    if (cen.puestos.length) cenL.push(`  Puestos 2026 por censo: ${cen.puestos.slice(0, 25).map((x) => `${x.puesto} ${n(x.total)}`).join('; ')}${cen.puestos.length > 25 ? `; y ${n(cen.puestos.length - 25)} más` : ''}.`);
  } else cenL.push(`Censo electoral 2026: ${cen.nota}`);
  const serie = serieCenso(t.dane);
  if (serie.length) cenL.push(`Serie del censo electoral del municipio (habilitados de cada jornada): ${serie.map((x) => `${x.etiqueta} ${n(x.censo)}`).join('; ')}.`);
  // Sin segmentos sexo × edad de votantes: el censo electoral no trae edad y el reglamento (sección 3) prohíbe
  // "las mujeres de 30-49 habilitadas"; la edad de la población está en la sección Población (DANE).
  secciones.push({ titulo: 'Censo electoral', lineas: cenL });

  // 7. Resultados: todas las elecciones, de la más reciente a la más antigua
  const codigosDe = (e: EleccionPuestos): string[] | 'todos' => {
    if (t.tipo === 'municipio') return 'todos';
    if (e.codigos === '2026') return (enTerr ?? []).map((x) => x.codPuesto);
    return codigosResultadosDe(puestos, t.tipo, t.id).filter((k) => k.startsWith(`${e.codigos}|`)).map((k) => k.slice(e.codigos.length + 1));
  };
  const orden = [...elecciones].sort((a, b) => b.anio - a.anio || a.id.localeCompare(b.id));
  const res: string[] = [];
  for (const e of orden) {
    const cods = codigosDe(e);
    res.push(...lineasEleccion(e, cods, t.nombre, e.porCandidato ? 6 : 8));
    if (LISTAS_POR_CANDIDATO.includes(e.id)) res.push(...lineasCandidatos(e, cods, t.municipio, t.dane));
    if (t.tipo !== 'municipio') res.push(...lineasEleccion(e, 'todos', `todo ${t.municipio} (comparación)`, 3));
  }
  if (!orden.length) res.push('Sin resultados por puesto cargados para este municipio.');
  if (t.tipo !== 'municipio') res.unshift('Los votos se cuentan donde está el puesto, no donde vive el votante; cada año se suman los puestos que ese año quedaban dentro del territorio.');
  // Concejo 2023 por candidato del libro municipal, donde no hay escrutinio mesa a mesa
  if (t.tipo === 'municipio' && !elecciones.find((e) => e.id === 'concejo-2023')?.candidatosCompletos) {
    const c = await cargarConcejo2023(t.dane);
    if (c && c.estado !== 'sin-datos' && c.partidos.length) {
      res.push(`Concejo 2023 por candidato (${c.fuente ?? 'Registraduría'}, ${c.tipo ?? ''}): ${c.partidos.slice(0, 8).map((x) => `${x.nombre} ${p(x.pctValidos)}${x.curules ? `, ${x.curules} curules` : ''} (más votados: ${x.candidatos.slice(0, 3).map((k) => `${k.nombre} ${n(k.votos)}`).join(', ')})`).join('; ')}.${c.nota ? ` ${c.nota}` : ''}`);
    }
  }
  secciones.push({ titulo: 'Resultados electorales (serie 2015-2026)', lineas: res });
  const derivados = indicadoresDerivados({ elecciones: orden, codigosDe, subMunicipal: t.tipo !== 'municipio', alcance: t.nombre, municipio: t.municipio });
  if (derivados.length) secciones.push({ titulo: 'Indicadores derivados (Modelo Proteus): márgenes, variaciones y brechas', lineas: derivados });

  // 8. Actores políticos (base curada)
  const act = actoresDeTerritorio(t);
  secciones.push({ titulo: 'Actores políticos con presencia declarada (base curada del desarrollador, SIN VERIFICAR)', lineas: act.length
    ? act.map((a) => `SIN VERIFICAR (base curada, sin fuente ni fecha): ${a.nombre}: ${a.cargo}${a.partido ? `, ${a.partido}` : ''}${a.casa ? `, casa ${a.casa}` : ''}.`)
    : ['Ninguno registrado.'] });

  // 9. Lectura de Proteus (reglas del marco, Capa 1)
  let narr: AnalisisNarrativo | null = null;
  // Lectura calculada para cualquier unidad de los 125 municipios (municipio, comuna, zona, barrio o vereda)
  if (esMunicipioDelAnalisis(t.dane)) narr = await analizarUnidad(t.id).catch(() => null);
  if (narr) {
    const bloques: [string, AnalisisNarrativo['contextoPolitico']][] = [['Contexto político', narr.contextoPolitico], ['Contexto social', narr.contextoSocial], ['Panorama 2027', narr.panorama2027], ['Áreas clave', narr.areasClave], ['Tonos', narr.tonos]];
    secciones.push({ titulo: 'Lectura de Proteus (análisis narrativo con las reglas del marco; hipótesis, no hechos)', lineas: bloques.flatMap(([tit, os]) => os.map((o) => `${tit} · ${o.verbo.toUpperCase()}: ${o.texto}`)) });
  }
  const cobertura = await completarConMotor(secciones, { t, subregion: String(geo?.properties.subregion ?? '') || null });
  return { territorio: nombre, nivel, secciones, cobertura };
}

async function dossierRegional(subregion: string | null): Promise<DossierTerritorial> {
  const munis = ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features
    .map((f) => ({ dane: String((f.properties as { daneCode?: string }).daneCode), nombre: f.properties.name, subregion: String(f.properties.subregion ?? '') }))
    .filter((m) => !subregion || m.subregion === subregion)
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  const indice = await cargarGanadores();
  const poblacion = munis.reduce((s, m) => s + (getDaneMunicipio(m.dane)?.poblacion ?? 0), 0);
  const lineas = munis.map((m) => {
    const d = getDaneMunicipio(m.dane);
    const r = getResultado2023(m.dane);
    const c = categoriaMunicipio(m.dane)?.lista[0];
    const pr = presupuestoMunicipio(m.dane)?.anios[0];
    const ga = indice.ganadores['alcaldia-2023']?.[m.dane];
    const gp = indice.ganadores['presidente-2026-2']?.[m.dane] ?? indice.ganadores['presidente-2026-1']?.[m.dane];
    return `${m.nombre}: ${d ? `${n(d.poblacion)} hab. 2026, NBI ${p(d.nbi2018)}` : 'sin DANE'}${c ? `, categoría ${CATEGORIA_TEXTO[c.categoria] ?? c.categoria}` : ''}${pr ? `, presupuesto ${pr.anio} ${pesos(pr.datos.porHabitante)}/hab.` : ''}${ga ? `; Alcaldía 2023: ${ga[0]} (${ga[1]})` : ''}${r ? `, participación ${p(r.alcaldia.participacion)}` : ''}${gp ? `; Presidencia 2026: ganó ${gp[0]}` : ''}.`;
  });
  const secciones: SeccionDossier[] = [
    { titulo: 'Identificación', lineas: [`${subregion ? `Subregión ${subregion}` : 'Antioquia'}: ${munis.length} municipios, ${n(poblacion)} habitantes proyectados 2026 (DANE).`] },
    { titulo: 'Municipios (DANE, Contaduría, CUIPO, Registraduría)', lineas },
  ];
  const cobertura = await completarConMotor(secciones, { t: null, subregion });
  return { territorio: subregion ? `Subregión ${subregion}, Antioquia` : 'Antioquia', nivel: subregion ? 'subregión' : 'departamento', secciones, cobertura };
}

const cache = new Map<string, Promise<DossierTerritorial>>();

/** Dossier de la selección (con caché por unidad) */
export function dossierTerritorio(sel: SeleccionDossier): Promise<DossierTerritorial> {
  const id = sel.barrioId ?? sel.comunaId ?? sel.muniId;
  const clave = `${id ?? `sub:${sel.subregion ?? ''}`}|v${versionFuentes()}`;
  if (!cache.has(clave)) {
    const t = id ? territorioFicha(id) : null;
    const prom = t ? dossierLocal(t) : dossierRegional(sel.subregion);
    prom.catch(() => cache.delete(clave));
    cache.set(clave, prom);
  }
  return cache.get(clave)!;
}

export function dossierComoTexto(d: DossierTerritorial): string {
  return [`UNIDAD TERRITORIAL: ${d.territorio} (${d.nivel}).`, ...d.secciones.map((s) => `\n## ${s.titulo}\n${s.lineas.map((l) => `- ${l}`).join('\n')}`)].join('\n');
}

/** Nombre del municipio en el índice (para la interfaz) */
export const nombreMunicipio = (muniId: string) => INDICE[muniId]?.nombre ?? muniId;

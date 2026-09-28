/**
 * GENERADOR DE CONTENIDO DESDE EL MAPA (Gemini 3.8, vía el servidor)
 *
 * Arma la instrucción para Gemini con:
 * - el territorio elegido (subregión, municipio, comuna, barrio o "General" = Antioquia),
 * - el medio y el tipo de pieza,
 * - SOLO datos con fuente que Proteus ya tiene (resultados de la elección elegida, población y NBI
 *   del DANE, CNPV 2018 por manzana). Lo que no hay se dice "sin información"; Gemini recibe la
 *   orden de no inventar cifras.
 * La llamada va a /api/contenido/generar (server.ts): la clave de Gemini no sale del servidor.
 * No se envían datos personales del candidato (correo, fotos), solo su nombre y estilo.
 */
import rawIndice from '../data/territorio/indiceTerritorios.json';
import { ANTIOQUIA_125_MUNICIPIOS_GEOJSON } from '../data/geojson';
import { MUNICIPAL_DIVISIONS_REGISTRY } from '../data/geojson/municipalDivisions';
import { getDaneMunicipio } from './daneMunicipalService';
import { cargarElecciones, sumarEleccion, tipoEleccion, type EleccionPuestos } from './electionResultsService';
import { cargarGanadores } from './winnersService';
import {
  cargarDemografia,
  cargarEconomia,
  demografia,
  economia,
  territorioFicha,
  type TerritorioFicha,
} from './territoryProfileService';
import { valorDemografico } from './mapColorService';
import { reglasPiso3 } from './marcoService';
import { identidadParaIA, type IdentidadCandidato } from './identidad/identidad';

// --- Medios y tipos de pieza ------------------------------------------------------------------

export interface MedioContenido {
  id: string;
  nombre: string;
  grupo: 'Redes sociales' | 'Medios de comunicación';
  tipos: { id: string; nombre: string; formato: string }[];
}

export const MEDIOS: MedioContenido[] = [
  { id: 'facebook', nombre: 'Facebook', grupo: 'Redes sociales', tipos: [
    { id: 'post', nombre: 'Publicación', formato: 'Texto de 80 a 250 palabras, con llamado a la acción.' },
    { id: 'post-imagen', nombre: 'Publicación con imagen', formato: 'Texto corto para la imagen (máx. 12 palabras), descripción de la imagen y texto de la publicación.' },
    { id: 'video', nombre: 'Guion de video', formato: 'Guion de 60 a 90 segundos con escenas, texto en pantalla y voz.' },
    { id: 'vivo', nombre: 'Transmisión en vivo', formato: 'Escaleta de 15 minutos: saludo, 3 temas, preguntas del público y cierre.' },
    { id: 'anuncio', nombre: 'Anuncio pagado', formato: 'Titular (máx. 40 caracteres), texto principal (máx. 125) y descripción (máx. 30). Tres variantes.' },
  ] },
  { id: 'instagram', nombre: 'Instagram', grupo: 'Redes sociales', tipos: [
    { id: 'post', nombre: 'Publicación (foto)', formato: 'Pie de foto de hasta 150 palabras y 5 a 8 hashtags.' },
    { id: 'carrusel', nombre: 'Carrusel', formato: '5 a 7 diapositivas con título y texto corto cada una, y pie de foto.' },
    { id: 'reel', nombre: 'Reel', formato: 'Guion de 30 a 45 segundos: gancho en los primeros 3 segundos, escenas, texto en pantalla y audio.' },
    { id: 'historia', nombre: 'Historias', formato: 'Secuencia de 3 a 5 historias con texto, sticker sugerido (encuesta o pregunta) y enlace.' },
  ] },
  { id: 'tiktok', nombre: 'TikTok', grupo: 'Redes sociales', tipos: [
    { id: 'video', nombre: 'Video corto', formato: 'Guion de 20 a 45 segundos: gancho, desarrollo y cierre; texto en pantalla y descripción con hashtags.' },
    { id: 'tendencia', nombre: 'Video sobre una tendencia', formato: 'Idea de formato popular adaptada al mensaje, guion de hasta 30 segundos y descripción.' },
  ] },
  { id: 'whatsapp', nombre: 'WhatsApp', grupo: 'Redes sociales', tipos: [
    { id: 'difusion', nombre: 'Mensaje de difusión', formato: 'Mensaje de máximo 80 palabras, cercano, que se pueda reenviar.' },
    { id: 'estado', nombre: 'Estado', formato: 'Texto de máximo 20 palabras para imagen o video de estado, y 3 variantes.' },
    { id: 'audio', nombre: 'Nota de voz', formato: 'Guion de 45 a 60 segundos, en tono conversacional.' },
  ] },
  { id: 'youtube', nombre: 'YouTube', grupo: 'Redes sociales', tipos: [
    { id: 'video', nombre: 'Video largo', formato: 'Guion de 3 a 5 minutos con secciones, título (máx. 70 caracteres) y descripción.' },
    { id: 'short', nombre: 'Short', formato: 'Guion de 30 a 60 segundos en formato vertical.' },
  ] },
  { id: 'x', nombre: 'X (Twitter)', grupo: 'Redes sociales', tipos: [
    { id: 'post', nombre: 'Publicación', formato: 'Máximo 280 caracteres. Tres variantes.' },
    { id: 'hilo', nombre: 'Hilo', formato: 'Hilo de 5 a 8 publicaciones de máximo 280 caracteres cada una.' },
  ] },
  { id: 'tv', nombre: 'Televisión', grupo: 'Medios de comunicación', tipos: [
    { id: 'comercial', nombre: 'Comercial de 30 segundos', formato: 'Guion en dos columnas (imagen / audio) de 30 segundos, con el cierre legal de publicidad política.' },
    { id: 'entrevista', nombre: 'Preparación de entrevista', formato: '5 mensajes clave, 5 preguntas probables con respuesta de 30 segundos y frases para titular.' },
    { id: 'debate', nombre: 'Intervención en debate', formato: 'Apertura de 1 minuto, 3 bloques de argumentos y cierre de 1 minuto.' },
  ] },
  { id: 'radio', nombre: 'Radio', grupo: 'Medios de comunicación', tipos: [
    { id: 'cuna', nombre: 'Cuña de 30 segundos', formato: 'Guion de 30 segundos con locución, efectos y música sugeridos, y el cierre legal de publicidad política.' },
    { id: 'entrevista', nombre: 'Entrevista', formato: '5 mensajes clave y respuestas de 30 segundos en lenguaje hablado.' },
    { id: 'perifoneo', nombre: 'Perifoneo', formato: 'Texto de 20 segundos para altoparlante, repetible.' },
  ] },
  { id: 'periodico', nombre: 'Periódico', grupo: 'Medios de comunicación', tipos: [
    { id: 'columna', nombre: 'Columna de opinión', formato: 'Columna de 500 a 700 palabras con título.' },
    { id: 'comunicado', nombre: 'Comunicado de prensa', formato: 'Titular, entradilla, cuerpo de 300 a 400 palabras, cita del candidato y datos de contacto a completar.' },
    { id: 'aviso', nombre: 'Aviso impreso', formato: 'Titular, texto de máximo 40 palabras, llamado a la acción y la leyenda legal de publicidad política.' },
  ] },
];

// --- Territorios --------------------------------------------------------------------------------

interface IndiceMunicipio {
  dane: string;
  nombre: string;
  divisiones: Record<string, { nombre: string; tipo: string }>;
  subdivisiones: Record<string, { nombre: string; tipo: string; padre: string }>;
}
const INDICE = rawIndice as unknown as Record<string, IndiceMunicipio>;

export interface SeleccionTerritorio {
  subregion: string | null;
  /** id del municipio en el registro ('medellin', 'bello'...) */
  muniId: string | null;
  /** Comuna o corregimiento (solo municipios con nivel de comunas) */
  comunaId: string | null;
  /** Barrio o vereda */
  barrioId: string | null;
}
export const SELECCION_GENERAL: SeleccionTerritorio = { subregion: null, muniId: null, comunaId: null, barrioId: null };

const MUNICIPIOS = ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features.map((f) => {
  const dane = String((f.properties as { daneCode?: string }).daneCode);
  const muniId = Object.entries(INDICE).find(([, m]) => m.dane === dane)?.[0] ?? null;
  return { dane, muniId, nombre: f.properties.name, subregion: String(f.properties.subregion ?? '') };
}).filter((m): m is { dane: string; muniId: string; nombre: string; subregion: string } => !!m.muniId);

export const SUBREGIONES = [...new Set(MUNICIPIOS.map((m) => m.subregion))].filter(Boolean).sort((a, b) => a.localeCompare(b, 'es'));

export const municipiosDe = (subregion: string | null) =>
  MUNICIPIOS.filter((m) => !subregion || m.subregion === subregion).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));

/** ¿El municipio tiene nivel de comunas? (regla de niveles de municipalDivisions.ts) */
export const tieneComunas = (muniId: string | null) => !!muniId && !!MUNICIPAL_DIVISIONS_REGISTRY[muniId]?.nivelComunas;

export const comunasDe = (muniId: string | null) =>
  muniId && tieneComunas(muniId)
    ? Object.entries(INDICE[muniId]?.divisiones ?? {}).map(([id, d]) => ({ id, nombre: d.nombre })).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { numeric: true }))
    : [];

export const barriosDe = (muniId: string | null, comunaId: string | null) =>
  muniId
    ? Object.entries(INDICE[muniId]?.subdivisiones ?? {})
      .filter(([, s]) => !comunaId || s.padre === comunaId)
      .map(([id, s]) => ({ id, nombre: s.nombre, tipo: s.tipo }))
      .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { numeric: true }))
    : [];

/** Selección del generador a partir de lo elegido en el mapa (id de municipio, comuna o barrio) */
export function seleccionDesdeMapa(opts: { featureId?: string | null; featureName?: string | null; muniId?: string | null; dane?: string | null }): SeleccionTerritorio {
  const t = opts.featureId ? territorioFicha(opts.featureId) : null;
  const muniPorDane = opts.dane ? MUNICIPIOS.find((m) => m.dane === opts.dane)?.muniId ?? null : null;
  const candidato = (t && Object.entries(INDICE).find(([, m]) => m.dane === t.dane)?.[0]) ?? muniPorDane ?? opts.muniId ?? null;
  // Solo municipios de Antioquia (los del índice territorial); otro departamento queda en "General"
  const muniId = candidato && INDICE[candidato] ? candidato : null;
  if (!muniId) {
    // Una subregión elegida en el mapa (vista de subregiones)
    const sub = SUBREGIONES.find((s) => s.toLowerCase() === (opts.featureName ?? '').toLowerCase());
    return { ...SELECCION_GENERAL, subregion: sub ?? null };
  }
  const subregion = MUNICIPIOS.find((m) => m.muniId === muniId)?.subregion ?? null;
  if (!t || t.tipo === 'municipio') return { subregion, muniId, comunaId: null, barrioId: null };
  if (t.tipo === 'division') return { subregion, muniId, comunaId: tieneComunas(muniId) ? t.id : null, barrioId: null };
  return { subregion, muniId, comunaId: tieneComunas(muniId) ? t.padreId ?? null : null, barrioId: t.id };
}

/** Nombre legible de la selección, del nivel más fino al más amplio */
export function nombreSeleccion(sel: SeleccionTerritorio): string {
  const partes: string[] = [];
  if (sel.barrioId) partes.push(territorioFicha(sel.barrioId)?.nombre ?? sel.barrioId);
  if (sel.comunaId) partes.push(territorioFicha(sel.comunaId)?.nombre ?? sel.comunaId);
  if (sel.muniId) partes.push(INDICE[sel.muniId]?.nombre ?? sel.muniId);
  if (sel.subregion) partes.push(`subregión ${sel.subregion}`);
  partes.push('Antioquia');
  return partes.join(', ');
}

// --- Contexto con datos -------------------------------------------------------------------------

const fPct = (v: number) => `${v.toFixed(1).replace('.', ',')} %`;
const fNum = (v: number) => Math.round(v).toLocaleString('es-CO');

/** Códigos de los puestos del territorio que ya calculó la ficha del mapa (si coincide con la selección) */
export interface PuestosDeFicha { territorioId: string; codigosResultados: string[]; codigos2026: string[] }

function lineasResultado(e: EleccionPuestos, codigos: string[] | 'todos', alcance: string): string[] {
  const r = sumarEleccion(e, codigos);
  if (!r) return [`${e.nombre}: sin resultados por puesto en ${alcance}.`];
  const top = (e.porCandidato ? r.candidatos : r.partidos).slice(0, 4);
  const participacion = r.habilitados ? (100 * r.votantes) / r.habilitados : null;
  return [
    `${e.nombre} en ${alcance} (Registraduría, ${e.tipo}; ${r.puestos} puestos): ${fNum(r.votantes)} votantes de ${fNum(r.habilitados)} habilitados${participacion !== null ? ` (participación ${fPct(participacion)})` : ''}.`,
    ...top.map((x, i) => `  ${i + 1}. ${x.nombre}${'partido' in x && x.partido ? ` (${x.partido})` : ''}: ${fPct(x.pct)} de los votos válidos`),
  ];
}

function lineasPerfil(t: TerritorioFicha): string[] {
  const out: string[] = [];
  const d = demografia(t);
  if (d.datos && d.conDetalle) {
    const m = valorDemografico(d.datos, 'mujeres');
    const j = valorDemografico(d.datos, 'jovenes');
    const may = valorDemografico(d.datos, 'mayores');
    out.push(`Población censada en 2018 (DANE, CNPV por manzana): ${fNum(d.datos.personas)} personas${m !== null ? `; ${fPct(m)} mujeres` : ''}${j !== null ? `; ${fPct(j)} de 20 a 29 años` : ''}${may !== null ? `; ${fPct(may)} de 60 o más` : ''}.`);
  } else {
    out.push('Sexo y edad: sin información para este territorio (el DANE no los publica aquí).');
  }
  const e = economia(t);
  if (e) {
    if (e.estratoModa) out.push(`Estrato típico de las viviendas: ${e.estratoModa} (factura de energía, Censo 2018; no es la estratificación vigente).`);
    if (e.ipm !== null) out.push(`Pobreza multidimensional (IPM, DANE por manzana): ${fPct(e.ipm)}.`);
    const sup = e.educacion.filter((x) => x.nombre === 'Técnica o universitaria' || x.nombre === 'Posgrado').reduce((a, x) => a + x.pct, 0);
    if (e.educacion.some((x) => x.pct > 0)) out.push(`Personas con educación técnica o universitaria: ${fPct(sup)} (Censo 2018).`);
  }
  return out;
}

/**
 * Datos del territorio elegido para el contexto de Gemini. Resultados: la elección elegida en el
 * mapa. Para comuna o barrio solo se dan resultados si coinciden con la ficha abierta (sus puestos
 * ya están ubicados); si no, se usa el total del municipio y se dice.
 */
export async function contextoTerritorio(sel: SeleccionTerritorio, eleccionId: string, ficha?: PuestosDeFicha | null): Promise<string[]> {
  const lineas: string[] = [];
  const idFino = sel.barrioId ?? sel.comunaId;

  if (sel.muniId) {
    const muni = INDICE[sel.muniId];
    const dane = muni.dane;
    const dm = getDaneMunicipio(dane);
    if (dm) lineas.push(`${muni.nombre}: ${fNum(dm.poblacion)} habitantes proyectados para 2026 (DANE), ${fNum(dm.poblacionCabecera)} en la cabecera y ${fNum(dm.poblacionRural)} en la zona rural. NBI 2018: ${fPct(dm.nbi2018)} (DANE).`);
    await Promise.all([cargarDemografia(dane), cargarEconomia(dane)]);
    const t = territorioFicha(idFino ?? sel.muniId);
    if (t) lineas.push(...lineasPerfil(t).map((l) => (idFino ? `${t.nombre}: ${l}` : l)));

    const es = await cargarElecciones(dane);
    const e = es.find((x) => x.id === eleccionId) ?? es.find((x) => tipoEleccion(x.id) === tipoEleccion(eleccionId));
    if (!e) lineas.push('Resultados por puesto: sin información para esta elección.');
    else if (idFino && ficha?.territorioId === idFino) {
      const cods = e.codigos === '2026' ? ficha.codigos2026 : ficha.codigosResultados.filter((k) => k.startsWith(`${e.codigos}|`)).map((k) => k.slice(e.codigos.length + 1));
      lineas.push(...lineasResultado(e, cods, t?.nombre ?? 'el territorio'));
      lineas.push(...lineasResultado(e, 'todos', `todo ${muni.nombre}`));
    } else {
      if (idFino) lineas.push(`(No hay resultados calculados por puesto para ${t?.nombre ?? 'este territorio'}: se da el total del municipio.)`);
      lineas.push(...lineasResultado(e, 'todos', muni.nombre));
    }
    return lineas;
  }

  // Subregión o Antioquia: municipios y ganador de la elección en cada uno (índice oficial)
  const munis = municipiosDe(sel.subregion);
  const poblacion = munis.reduce((a, m) => a + (getDaneMunicipio(m.dane)?.poblacion ?? 0), 0);
  lineas.push(`${sel.subregion ? `Subregión ${sel.subregion}` : 'Antioquia'}: ${munis.length} municipios y ${fNum(poblacion)} habitantes proyectados para 2026 (DANE).`);
  const indice = await cargarGanadores();
  const ganadores = indice.ganadores[eleccionId];
  const nombreE = indice.elecciones.find((x) => x.id === eleccionId)?.nombre ?? eleccionId;
  if (ganadores) {
    const conteo = new Map<string, number>();
    for (const m of munis) {
      const g = ganadores[m.dane];
      if (g) conteo.set(`${g[0]}${g[1] && g[1] !== g[0] ? ` (${g[1]})` : ''}`, (conteo.get(`${g[0]}${g[1] && g[1] !== g[0] ? ` (${g[1]})` : ''}`) ?? 0) + 1);
    }
    lineas.push(`${nombreE}: ganador por municipio (Registraduría):`);
    lineas.push(...[...conteo.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([n, c]) => `  ${n}: ${c} municipios`));
  } else {
    lineas.push(`${nombreE}: sin ganadores por municipio cargados.`);
  }
  const nbis = munis.map((m) => getDaneMunicipio(m.dane)?.nbi2018).filter((v): v is number => v != null);
  if (nbis.length) lineas.push(`NBI 2018 de sus municipios (DANE): entre ${fPct(Math.min(...nbis))} y ${fPct(Math.max(...nbis))}.`);
  return lineas;
}

// --- Instrucción y llamada ----------------------------------------------------------------------

export interface PerfilCandidato {
  nombre: string;
  afiliacionPartidista?: string;
  tonoNarrativo?: string;
  estiloComunicacion?: string;
  ejeTematicoComodo?: string;
  quEvitar?: string;
  /** Identidad completa: si está, reemplaza los campos sueltos de arriba */
  identidad?: IdentidadCandidato;
}

export const SISTEMA_CONTENIDO = [
  'Eres redactor de comunicación política para una campaña en Antioquia (Colombia). Escribes en español de Colombia, claro y cercano.',
  'Reglas obligatorias:',
  '- Usa solo las cifras de la sección DATOS. No inventes cifras, encuestas, hechos ni citas. Si un dato no está, no lo menciones o di que no hay información.',
  '- No difundas información falsa ni engañosa, no ataques la vida privada de nadie y no uses lenguaje discriminatorio.',
  '- Respeta las normas de publicidad política de Colombia (Ley 130 de 1994, Ley 1475 de 2011 y reglas del CNE): en piezas pagadas indica que es publicidad política pagada y deja un espacio para el responsable.',
  '- No prometas lo que un cargo no puede hacer. Habla de propuestas, no de dádivas.',
  '- Entrega solo la pieza pedida, lista para usar, en el formato indicado. Al final, en una línea, di qué datos de la sección DATOS usaste.',
  // Reglamento de interpretación vigente (marco metodológico, Capa 1): reglas del piso 3
  reglasPiso3(),
].filter(Boolean).join('\n');

export function armarInstruccion(args: {
  sel: SeleccionTerritorio;
  medio: MedioContenido;
  tipo: MedioContenido['tipos'][number];
  tema: string;
  datos: string[];
  candidato?: PerfilCandidato | null;
}): string {
  const c = args.candidato;
  return [
    `PIEZA: ${args.tipo.nombre} para ${args.medio.nombre}.`,
    `FORMATO: ${args.tipo.formato}`,
    `TERRITORIO: ${nombreSeleccion(args.sel)}.`,
    c?.identidad ? `IDENTIDAD DEL CANDIDATO (ajusta la voz, el léxico y los límites a esto):\n${identidadParaIA(c.identidad)}` : c ? `CANDIDATO: ${c.nombre}${c.afiliacionPartidista ? ` (${c.afiliacionPartidista})` : ''}.${c.tonoNarrativo ? ` Tono: ${c.tonoNarrativo}.` : ''}${c.estiloComunicacion ? ` Estilo: ${c.estiloComunicacion}.` : ''}${c.ejeTematicoComodo ? ` Temas fuertes: ${c.ejeTematicoComodo}.` : ''}${c.quEvitar ? ` Evitar: ${c.quEvitar}.` : ''}` : 'CANDIDATO: sin perfil cargado; escribe en primera persona del plural ("proponemos").',
    `TEMA O MENSAJE: ${args.tema.trim() || 'libre: elige el más pertinente para este territorio según los datos.'}`,
    'DATOS (con su fuente):',
    ...args.datos.map((d) => `- ${d}`),
  ].join('\n');
}

export async function generarContenido(sistema: string, instruccion: string): Promise<string> {
  const r = await fetch('/api/contenido/generar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sistema, instruccion }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || `El servidor respondió ${r.status}.`);
  return String(j.texto ?? '');
}

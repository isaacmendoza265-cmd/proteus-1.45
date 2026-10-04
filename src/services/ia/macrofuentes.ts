/**
 * MOTOR DE ANÁLISIS DE PROTEUS: LAS TRES MACROFUENTES DE TODA LLAMADA A IA GENERATIVA
 *
 * Toda herramienta que usa Gemini parte, de forma completa, de:
 *   1. DATOS DEL APLICATIVO: todo lo que Proteus tiene de la unidad territorial elegida, de todos los tipos, niveles y
 *      categorías: las fuentes oficiales fijas del dossier (dossierTerritorialService) y las fuentes registradas en el
 *      motor (src/services/ia/motor/: auxiliares por código y JSON declarativos de src/data/motor/), con su nivel.
 *   2. PERFIL DEL CANDIDATO: su naturaleza (identidad completa, con postura política), su historial en los datos
 *      (elecciones en las que aparece por nombre, piezas analizadas) y lo que el equipo escribió de su trayectoria.
 *   3. MARCO TEÓRICO INTERPRETATIVO: TODO lo integrado: cada bloque ingestado de las capas 0 a 4, la semilla de
 *      posturas políticas y el libro de reglas de piezas (Capa 3 provisional). Igual para toda tarea.
 * con la regla de integridad que las ordena (JERARQUIA). La tarea (analizar, redactar, brief, evaluar, revisar,
 * investigar) solo cambia la instrucción de la herramienta, no lo que se lee.
 *
 * Dinámico: nada está fijo en las herramientas. Un dato nuevo (un JSON más, una fuente registrada), un bloque nuevo del
 * marco (reingesta de los .docx) o un cambio del perfil entran en la siguiente llamada; las cachés se invalidan por
 * versión (fuentes, perfil) y por unidad.
 *
 * Eficiencia: el orden va de lo más estable a lo más variable (jerarquía → marco → perfil → datos → herramienta), para
 * que Gemini reutilice el prefijo común entre llamadas (caché implícita de contexto), y cada parte se arma una vez.
 */
import { dossierComoTexto, dossierTerritorio, type DossierTerritorial, type SeleccionDossier } from '../dossierTerritorialService';
import { identidadParaIA, normalizarIdentidad, type IdentidadCandidato } from '../identidad/identidad';
import { inventarioMarco, semillaPosturas, textoMarcoCompleto } from '../marcoService';
import { libroParaMarco } from '../../data/analisisPiezas/libroDeReglas';
import { activeTerritoryService, seleccionDeEstado } from '../activeTerritoryContextService';
import { municipioFichaPorDane, territorioFicha } from '../territoryProfileService';
import { ANTIOQUIA_125_MUNICIPIOS_GEOJSON } from '../../data/geojson';
import { perfilRegistrado, registrarPerfil, versionPerfil } from './registroPerfil';
import { historialCandidato } from './motor/historialCandidato';
import { versionFuentes, type CoberturaFuente } from './motor/registro';

/** Tareas de la tubería única (cambian la instrucción, no las fuentes) */
export type TareaIA = 'analizar' | 'redactar' | 'brief' | 'evaluar' | 'revisar' | 'investigar' | 'general';

export const JERARQUIA = [
  'JERARQUÍA DE FUENTES (obligatoria para toda respuesta). Todo análisis parte de las TRES MACROFUENTES que siguen, completas:',
  'A) DATOS DEL APLICATIVO: son la verdad sobre el territorio. Las secciones oficiales prevalecen. Las marcadas AUXILIAR (tablas internas sin verificar) solo llenan vacíos o dan series y se presentan como "dato auxiliar, sin verificar"; nunca contradicen lo oficial. Si una cifra de la instrucción de la herramienta contradice los datos, prevalecen los datos y lo dices.',
  'B) PERFIL DEL CANDIDATO: decide voz, ejes, postura política, públicos y límites, y su historial orienta la lectura. Lo que el perfil no define no se supone: se dice que falta.',
  'C) MARCO TEÓRICO INTERPRETATIVO: interpreta los datos. El reglamento vigente, la semilla de posturas y el libro de reglas se cumplen (verbos, frases prohibidas, reglas). Las capas que aún no estén ingestadas no se suponen.',
  'Nunca inventes cifras, encuestas, nombres ni hechos. Si algo que se pide no está en las tres macrofuentes, dilo y di qué dato faltaría.',
].join('\n');

export { registrarPerfil };

export function identidadActual(): IdentidadCandidato | null {
  const perfil = perfilRegistrado();
  return perfil ? normalizarIdentidad(perfil.identidad, perfil.nombre ?? '') : null;
}

/** Unidad por defecto: el territorio activo de la barra superior (el mismo para todos los módulos) */
export const seleccionActiva = (): SeleccionDossier => seleccionDeEstado(activeTerritoryService.getState());

// --- Macrofuente 3: marco completo (igual para toda tarea) ---------------------------------------------

let marcoTexto: string | null = null;
export function textoMarco(): string {
  if (marcoTexto == null) {
    marcoTexto = [
      textoMarcoCompleto() || '(Todavía no hay bloques ingestados.)',
      '### Semilla del marco: contexto y posturas políticas básicas',
      semillaPosturas(),
      `### ${libroParaMarco()}`,
      `### Estado del marco: ${inventarioMarco().map((b) => `capa ${b.capa} "${b.titulo}" (${b.estado})`).join('; ')}. Las capas sin bloques están pendientes: no las supongas.`,
    ].join('\n\n');
  }
  return marcoTexto;
}

// --- Macrofuente 2: perfil e historial del candidato --------------------------------------------------

async function textoPerfil(sel: SeleccionDossier): Promise<string> {
  const id = identidadActual();
  const pr = perfilRegistrado();
  if (!id) return 'Sin perfil del candidato cargado: escribe en tono institucional y en primera persona del plural; no supongas postura, ejes ni historial.';
  const legado = pr && !pr.identidad
    ? [pr.afiliacionPartidista && `Partido: ${pr.afiliacionPartidista}.`, pr.tonoNarrativo && `Tono: ${pr.tonoNarrativo}.`, pr.estiloComunicacion && `Estilo: ${pr.estiloComunicacion}.`, pr.ejeTematicoComodo && `Temas fuertes: ${pr.ejeTematicoComodo}.`, pr.quEvitar && `Evitar: ${pr.quEvitar}.`].filter(Boolean).join(' ')
    : '';
  const t = sel.barrioId ?? sel.comunaId ?? sel.muniId;
  const dane = t ? territorioFicha(t)?.dane ?? null : null;
  const nombre = id.ficha.nombre || pr?.nombre;
  const historial = await historialCandidato(nombre, sel, dane);
  return [
    'Naturaleza y perfil (identidad definida por el equipo):',
    identidadParaIA(id),
    legado && `Del perfil anterior (la identidad completa todavía no está llena): ${legado}`,
    historial.length ? 'Historial en los datos del aplicativo:' : '',
    ...historial,
  ].filter(Boolean).join('\n');
}

// --- Armado -------------------------------------------------------------------------------------------

export interface Macrofuentes {
  texto: string;
  territorio: string;
  caracteres: { datos: number; perfil: number; marco: number };
  cobertura: CoberturaFuente[];
}

const cache = new Map<string, Promise<Macrofuentes>>();

/**
 * Bloque de las tres macrofuentes. `seleccion` por defecto: el territorio activo. `incluirDatos: false` cuando la
 * herramienta ya manda el dossier completo en su instrucción (generador del mapa, analista), para no duplicarlo.
 */
export function armarMacrofuentes(opts: { tarea?: TareaIA; seleccion?: SeleccionDossier; incluirDatos?: boolean } = {}): Promise<Macrofuentes> {
  const sel = opts.seleccion ?? seleccionActiva();
  const incluirDatos = opts.incluirDatos !== false;
  const clave = `${incluirDatos}|p${versionPerfil()}|f${versionFuentes()}|${JSON.stringify(sel)}`;
  if (!cache.has(clave)) {
    const p = (async () => {
      const [dossier, perfilTxt] = await Promise.all([
        incluirDatos ? dossierTerritorio(sel) : Promise.resolve(null as DossierTerritorial | null),
        textoPerfil(sel),
      ]);
      const datos = dossier ? dossierComoTexto(dossier) : '(Los datos completos de la unidad territorial van en la instrucción de esta herramienta.)';
      const marco = textoMarco();
      const texto = [
        JERARQUIA,
        `\n=== MACROFUENTE C · MARCO TEÓRICO INTERPRETATIVO (completo) ===\n${marco}`,
        `\n=== MACROFUENTE B · PERFIL E HISTORIAL DEL CANDIDATO ===\n${perfilTxt}`,
        `\n=== MACROFUENTE A · DATOS DEL APLICATIVO SOBRE LA UNIDAD TERRITORIAL ===\n${datos}`,
      ].join('\n');
      return { texto, territorio: dossier?.territorio ?? 'el de la instrucción', caracteres: { datos: datos.length, perfil: perfilTxt.length, marco: marco.length }, cobertura: dossier?.cobertura ?? [] };
    })();
    p.catch(() => cache.delete(clave));
    cache.set(clave, p);
    if (cache.size > 40) cache.delete(cache.keys().next().value as string);
  }
  return cache.get(clave)!;
}

/**
 * ESTÁNDAR DE CALIDAD (común a toda herramienta). Va al final del sistema, junto a la tarea, porque con contextos
 * largos Gemini sigue mejor lo que lee al último. Nació del diagnóstico del 3-oct-2026: las respuestas recitaban
 * cifras sin implicaciones, no comparaban, no priorizaban y se escudaban en cautelas en cada frase.
 */
export const ESTANDAR = [
  'ESTÁNDAR DE CALIDAD DE PROTEUS (lo que separa un análisis útil de uno mediocre):',
  'Si la herramienta fija un formato (JSON, esquema, apartados numerados, extensión), ese formato manda: el estándar se aplica dentro de él.',
  'Escribes para el candidato y su jefe de campaña, que deciden con poco tiempo. Piensa como un estratega electoral con años de campañas en Antioquia, no como un relator de datos.',
  '1. Conclusión primero: abre con la respuesta o el hallazgo principal en una o dos frases. Lo demás lo sustenta.',
  '2. Cada cifra con su "¿y qué?": no cites un dato sin decir qué implica para la campaña. Una lista de cifras sin implicaciones es un mal resultado.',
  '3. Compara siempre: frente al municipio, la subregión o el departamento; frente a la jornada anterior del mismo tipo; frente a los competidores. Usa los "Indicadores derivados" de los datos y haz las cuentas que falten (diferencias en puntos, votos de diferencia, votos en juego), mostrando la operación.',
  '4. Prioriza: pocos hallazgos (3 a 5), ordenados por cuánto pesan en votos o en riesgo. Lo secundario se omite, no se resume.',
  '5. Sé específico: nombra los puestos, comunas, partidos, candidatos, cifras y fechas que están en los datos. Prohibidas las recomendaciones que servirían para cualquier territorio ("fortalecer las redes", "acercarse a la comunidad", "un mensaje cercano").',
  '6. Busca lo no obvio: tensiones entre datos, cambios bruscos, anomalías, contradicciones entre elecciones, oportunidades que un rival no vería. Si algo contradice la intuición, dilo.',
  '7. Recomendaciones accionables: qué hacer, dónde, con quién, con qué mensaje y cómo saber si funcionó; y qué cuesta o qué se arriesga.',
  '8. Honestidad sin timidez: la incertidumbre se dice una vez, donde aplica y con su razón concreta; no se repite en cada frase ni ahoga la conclusión. Una hipótesis bien marcada vale; una respuesta que no se compromete con nada no sirve.',
  '9. Verbos del marco: marca con [observa], [deduce], [hipotetiza] o [apuesta] cada hallazgo o recomendación (al comienzo de su párrafo o viñeta), no cada frase.',
  '10. Puedes usar conocimiento general de cómo funcionan las elecciones en Colombia (umbral, cifra repartidora, voto preferente, calendario, reglas de propaganda) para interpretar, diciendo que es conocimiento general; nunca para inventar hechos, cifras o posiciones de personas.',
  '11. Antes de responder, revisa en silencio: ¿cada cifra está en las fuentes, con año y fuente? ¿respondí lo que se pidió? ¿un estratega aprendería algo que no sabía? Si no, rehaz la respuesta.',
].join('\n');

const TAREAS: Record<TareaIA, string> = {
  analizar: [
    'TAREA: ANALIZAR. Método:',
    'a) Identifica qué decisión de campaña hay detrás de la pregunta y respóndela directamente.',
    'b) Lee el territorio en tres capas y crúzalas (el valor está en el cruce, no en cada capa por separado): quién vive ahí (población, economía, estrato), cómo vota (participación, fuerzas, márgenes, tendencia, brecha con el municipio) y qué lo presiona (seguridad, alertas, actores).',
    'c) Para cada hallazgo: el dato [observa], el patrón calculado [deduce], el mecanismo posible [hipotetiza] y la implicación para el candidato del perfil [apuesta].',
    'Estructura para preguntas analíticas: Lo esencial (2 o 3 frases) · Hallazgos (3 a 5, ordenados por peso) · Qué haría el candidato (2 a 4 apuestas concretas) · Lo que falta saber (los 1 a 3 datos que más cambiarían la lectura y dónde conseguirlos).',
    'A una pregunta puntual, respuesta puntual con su cifra y su fuente, sin esa estructura.',
  ].join('\n'),
  redactar: [
    'TAREA: REDACTAR. Antes de escribir decide (sin mostrarlo): a quién le habla la pieza, la única idea que debe quedar, los 1 a 3 datos del territorio que la prueban y la emoción que mueve. Luego escribe:',
    '- Gancho concreto en la primera línea: un hecho local, una pregunta o una imagen del territorio; nunca una generalidad.',
    '- Lenguaje de la gente del territorio: frases cortas, verbos activos, ejemplos tangibles (lugares, situaciones, cifras redondeadas con su fuente).',
    '- La voz, los ejes, el registro y los límites del perfil; nada que el perfil prohíba.',
    '- Cierre con una acción o un compromiso verificable, no con un eslogan vacío.',
    '- Evita los clichés de campaña ("juntos podemos", "el cambio que necesitamos", "trabajaremos sin descanso"), los adjetivos vacíos y las promesas sin un cómo.',
    '- No inventes cuentas de redes, usuarios, lemas, números de tarjetón ni nombres que no estén en el perfil o en los datos: deja un marcador [por definir].',
    '- Si la pieza es pauta o propaganda, deja el espacio para la mención de quién la financia que exige la norma electoral, con un marcador si el perfil no lo trae.',
  ].join('\n'),
  brief: [
    'TAREA: BRIEF O ESTRATEGIA. Método:',
    '1) Diagnóstico en una frase: dónde está parado el candidato en este territorio y por qué.',
    '2) La cuenta de votos: cuántos están en juego o hacen falta (margen de la última elección comparable, umbral o cifra repartidora si aplica, abstención), con la operación a la vista.',
    '3) Públicos prioritarios (2 o 3): por qué ellos y dónde están (puestos, comunas, municipios).',
    '4) Un mensaje por público, anclado en un dato del territorio.',
    '5) Acciones en secuencia (territorio, digital, alianzas) y riesgos (rivales, seguridad, desinformación) con su respuesta.',
    '6) Indicadores para saber si funciona.',
    'Si el perfil no define el cargo o la meta, dilo y trabaja con un supuesto explícito.',
  ].join('\n'),
  evaluar: 'TAREA: EVALUAR UNA PIEZA como director creativo y estratega a la vez. Primero el veredicto (¿sirve?, ¿para quién?, ¿qué le sobra y qué le falta?); luego cada criterio con evidencia concreta de la pieza (el segundo, la frase, el color, el encuadre) y una corrección específica ("cambiar X por Y"), nunca un consejo general. Las tres correcciones de mayor impacto van primero. Separa lo medido por el aplicativo de lo que estimas.',
  revisar: 'TAREA: REVISAR. Recorre el texto cifra por cifra y afirmación por afirmación: compara con los datos (valor, año, fuente, oficial o estimada), señala las frases prohibidas del marco y lo que el perfil no permite. Para cada problema: la cita exacta, por qué falla y la corrección lista para pegar. Termina con el veredicto: publicar, publicar con cambios o no publicar.',
  investigar: 'TAREA: INVESTIGAR (búsqueda). Prefiere fuentes primarias y recientes; cada hallazgo externo va con su fuente y su fecha, separado de los datos del aplicativo, y distinguiendo hechos de opiniones. Cierra con lo que cambia para la campaña del perfil.',
  general: 'TAREA: la que pide la herramienta, con el estándar de calidad.',
};

/** Une el bloque de macrofuentes con la instrucción propia de la herramienta */
export const sistemaConMacrofuentes = (m: Macrofuentes, propio?: string, tarea: TareaIA = 'general') =>
  `${m.texto}\n\n=== INSTRUCCIONES DE ESTA HERRAMIENTA (se aplican dentro de la jerarquía anterior) ===\n${propio?.trim() || 'Responde a la petición del usuario.'}\n\n${ESTANDAR}\n\n${TAREAS[tarea]}`;

const normSub = (x: string) => x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+antioquen[oa]s?$/, '').trim();
/** Unidad de una subregión por su nombre ('Oriente Antioqueño', 'Urabá'…), con el nombre de la capa de municipios */
export function seleccionDeSubregion(nombre: string): SeleccionDossier {
  const nombres = [...new Set(ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features.map((f) => String(f.properties.subregion ?? '')))].filter(Boolean);
  const n = normSub(nombre);
  const sub = nombres.find((x) => normSub(x) === n) ?? nombres.find((x) => n.includes(normSub(x))) ?? null;
  return { subregion: sub, muniId: null, comunaId: null, barrioId: null };
}

/** Unidad del territorio (id de municipio del índice) a partir de un código DANE, para las herramientas */
export const seleccionDeDane = (dane: string): SeleccionDossier => ({ subregion: null, muniId: municipioFichaPorDane(dane), comunaId: null, barrioId: null });

// --- Transparencia: qué recibió la última llamada (registro liviano, sin el motor, para la interfaz) -----------
export { anotarLlamada, ultimaLlamada, alLlamar, type RegistroLlamada } from './registroLlamadas';

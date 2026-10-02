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

const TAREAS: Record<TareaIA, string> = {
  analizar: 'TAREA: analizar. Separa lo que el dato muestra, lo que se deduce, lo que es hipótesis y lo que recomiendas.',
  redactar: 'TAREA: redactar una pieza de comunicación con la voz del perfil, usando los 2 o 3 datos más pertinentes.',
  brief: 'TAREA: preparar un brief o una estrategia para el candidato del perfil en esta unidad territorial.',
  evaluar: 'TAREA: evaluar una pieza contra el perfil y el libro de reglas.',
  revisar: 'TAREA: revisar un texto o una pieza: verificar cifras contra los datos y cumplimiento del marco.',
  investigar: 'TAREA: investigar (búsqueda). Lo que encuentres fuera de las macrofuentes se presenta como hallazgo externo con su fuente, no como dato del aplicativo.',
  general: 'TAREA: la que pide la herramienta.',
};

/** Une el bloque de macrofuentes con la instrucción propia de la herramienta */
export const sistemaConMacrofuentes = (m: Macrofuentes, propio?: string, tarea: TareaIA = 'general') =>
  `${m.texto}\n\n=== INSTRUCCIONES DE ESTA HERRAMIENTA (se aplican dentro de la jerarquía anterior) ===\n${TAREAS[tarea]}\n${propio?.trim() || 'Responde a la petición del usuario.'}`;

/** Unidad del territorio (id de municipio del índice) a partir de un código DANE, para las herramientas */
export const seleccionDeDane = (dane: string): SeleccionDossier => ({ subregion: null, muniId: municipioFichaPorDane(dane), comunaId: null, barrioId: null });

// --- Transparencia: qué recibió la última llamada --------------------------------------------------

export interface RegistroLlamada { tarea: TareaIA; territorio: string; caracteres: Macrofuentes['caracteres']; cuando: string; cobertura?: CoberturaFuente[] }
let ultima: RegistroLlamada | null = null;
const oyentes = new Set<(r: RegistroLlamada) => void>();
export function anotarLlamada(r: RegistroLlamada) { ultima = r; oyentes.forEach((f) => f(r)); }
export const ultimaLlamada = () => ultima;
export function alLlamar(f: (r: RegistroLlamada) => void) { oyentes.add(f); return () => { oyentes.delete(f); }; }

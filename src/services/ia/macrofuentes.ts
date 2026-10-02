/**
 * LAS TRES MACROFUENTES DE TODO ANÁLISIS DE PROTEUS
 *
 * Toda llamada a Gemini parte de la combinación de:
 *   1. DATOS DEL APLICATIVO: el dossier de la unidad territorial activa (dossierTerritorialService), con fuente.
 *   2. PERFIL DEL CANDIDATO: la identidad (identidadParaIA), incluida su postura política.
 *   3. MARCO TEÓRICO INTERPRETATIVO: el reglamento vigente completo (Capa 1), la semilla de posturas políticas y, según
 *      la tarea, los dossiers de fuentes de la Capa 1 y las capas 2-4 ingestadas.
 * y la regla de integridad que las ordena (JERARQUIA). `armarMacrofuentes` arma ese bloque; geminiService lo antepone a
 * la instrucción de sistema de cada herramienta, así que ninguna llamada sale sin él (salvo opt-out explícito).
 *
 * Eficiencia: el dossier y el texto del marco se arman una vez por unidad y versión del perfil (caché); el reglamento
 * se manda completo porque es la regla que interpreta (≈24 mil caracteres, ≈6 mil tokens).
 */
import { dossierComoTexto, dossierTerritorio, type SeleccionDossier } from '../dossierTerritorialService';
import { identidadParaIA, normalizarIdentidad, type IdentidadCandidato } from '../identidad/identidad';
import { semillaPosturas, textoCapas234, textoDossiersCapa1, textoReglamentoVigente } from '../marcoService';
import { activeTerritoryService, seleccionDeEstado } from '../activeTerritoryContextService';
import { perfilRegistrado, registrarPerfil, versionPerfil } from './registroPerfil';

/** Tareas de la tubería única: cada una declara qué parte del marco necesita */
export type TareaIA = 'analizar' | 'redactar' | 'brief' | 'evaluar' | 'revisar' | 'investigar' | 'general';

export const JERARQUIA = [
  'JERARQUÍA DE FUENTES (obligatoria para toda respuesta):',
  '1) DATOS DEL APLICATIVO (sección 1, con su fuente): son la verdad sobre el territorio. Si una cifra de la instrucción o de una tabla interna contradice el dossier, prevalece el dossier y lo dices.',
  '2) PERFIL DEL CANDIDATO (sección 2): decide voz, ejes, postura política, públicos y límites. Lo que el perfil no define no se supone: se dice que falta.',
  '3) MARCO TEÓRICO (sección 3): interpreta los datos (reglamento y semilla de posturas). Sus frases prohibidas y sus verbos se cumplen.',
  'Las cifras que vengan marcadas AUXILIAR (tablas internas sin verificar, usadas para llenar vacíos) solo se usan si el dossier no trae ese dato, y se presentan como "dato auxiliar, sin verificar". Nunca inventes cifras, encuestas, nombres ni hechos.',
].join('\n');

// --- Registro del perfil y del territorio activos --------------------------------------------------

/** El perfil lo registra App (registroPerfil.ts); aquí solo se lee */
export { registrarPerfil };

export function identidadActual(): IdentidadCandidato | null {
  const perfil = perfilRegistrado();
  return perfil ? normalizarIdentidad(perfil.identidad, perfil.nombre ?? '') : null;
}

/** Unidad por defecto: el territorio activo de la barra superior (el mismo para todos los módulos) */
export const seleccionActiva = (): SeleccionDossier => seleccionDeEstado(activeTerritoryService.getState());

// --- Armado -------------------------------------------------------------------------------------------

export interface Macrofuentes {
  texto: string;
  territorio: string;
  caracteres: { datos: number; perfil: number; marco: number };
}

const cacheMarco = new Map<TareaIA, string>();
function textoMarco(tarea: TareaIA): string {
  if (!cacheMarco.has(tarea)) {
    const partes = [
      '### Reglamento de interpretación vigente (Capa 1, completo)',
      textoReglamentoVigente() || '(sin reglamento ingestado)',
      '### Semilla del marco: contexto y posturas políticas básicas',
      semillaPosturas(),
    ];
    // La literatura de fuentes (dossiers de la Capa 1) solo para analizar, hacer un brief o investigar
    if (tarea === 'analizar' || tarea === 'brief' || tarea === 'investigar') partes.push('### Dossiers de fuentes de la Capa 1', textoDossiersCapa1());
    const capas = textoCapas234();
    partes.push(capas ? `### Capas 2, 3 y 4\n${capas}` : '### Capas 2, 3 y 4\n(Todavía vacías: no hay reglas locales ni de publicidad ingestadas; no las supongas.)');
    cacheMarco.set(tarea, partes.filter(Boolean).join('\n\n'));
  }
  return cacheMarco.get(tarea)!;
}

const cache = new Map<string, Promise<Macrofuentes>>();

/**
 * Bloque de macrofuentes para una tarea. `seleccion` por defecto: el territorio activo. `incluirDatos: false` cuando la
 * herramienta ya manda el dossier en su instrucción (generador del mapa, analista), para no duplicarlo.
 */
export function armarMacrofuentes(opts: { tarea?: TareaIA; seleccion?: SeleccionDossier; incluirDatos?: boolean } = {}): Promise<Macrofuentes> {
  const tarea = opts.tarea ?? 'general';
  const sel = opts.seleccion ?? seleccionActiva();
  const incluirDatos = opts.incluirDatos !== false;
  const clave = `${tarea}|${incluirDatos}|${versionPerfil()}|${JSON.stringify(sel)}`;
  if (!cache.has(clave)) {
    const p = (async () => {
      const dossier = incluirDatos ? await dossierTerritorio(sel) : null;
      const datos = dossier ? dossierComoTexto(dossier) : '(El dossier de la unidad territorial va en la instrucción de esta herramienta.)';
      const id = identidadActual();
      const pr = perfilRegistrado();
      const legado = pr && !pr.identidad
        ? [pr.afiliacionPartidista && `Partido: ${pr.afiliacionPartidista}.`, pr.tonoNarrativo && `Tono: ${pr.tonoNarrativo}.`, pr.estiloComunicacion && `Estilo: ${pr.estiloComunicacion}.`, pr.ejeTematicoComodo && `Temas fuertes: ${pr.ejeTematicoComodo}.`, pr.quEvitar && `Evitar: ${pr.quEvitar}.`].filter(Boolean).join(' ')
        : '';
      const perfilTxt = id
        ? `${identidadParaIA(id)}${legado ? `\nDel perfil anterior (la identidad completa todavía no está llena): ${legado}` : ''}`
        : 'Sin perfil del candidato cargado: escribe en tono institucional y en primera persona del plural; no supongas postura ni ejes.';
      const marco = textoMarco(tarea);
      const texto = [
        JERARQUIA,
        `\n=== 1. DATOS DEL APLICATIVO ===\n${datos}`,
        `\n=== 2. PERFIL DEL CANDIDATO ===\n${perfilTxt}`,
        `\n=== 3. MARCO TEÓRICO INTERPRETATIVO ===\n${marco}`,
      ].join('\n');
      return { texto, territorio: dossier?.territorio ?? 'el de la instrucción', caracteres: { datos: datos.length, perfil: perfilTxt.length, marco: marco.length } };
    })();
    p.catch(() => cache.delete(clave));
    cache.set(clave, p);
    // Caché acotada: las unidades cambian a menudo en el mapa
    if (cache.size > 40) cache.delete(cache.keys().next().value as string);
  }
  return cache.get(clave)!;
}

/** Une el bloque de macrofuentes con la instrucción propia de la herramienta */
export const sistemaConMacrofuentes = (m: Macrofuentes, propio?: string) =>
  `${m.texto}\n\n=== INSTRUCCIONES DE ESTA HERRAMIENTA (se aplican dentro de la jerarquía anterior) ===\n${propio?.trim() || 'Responde a la petición del usuario.'}`;

// --- Transparencia: qué recibió la última llamada --------------------------------------------------

export interface RegistroLlamada { tarea: TareaIA; territorio: string; caracteres: Macrofuentes['caracteres']; cuando: string }
let ultima: RegistroLlamada | null = null;
const oyentes = new Set<(r: RegistroLlamada) => void>();
export function anotarLlamada(r: RegistroLlamada) { ultima = r; oyentes.forEach((f) => f(r)); }
export const ultimaLlamada = () => ultima;
export function alLlamar(f: (r: RegistroLlamada) => void) { oyentes.add(f); return () => { oyentes.delete(f); }; }

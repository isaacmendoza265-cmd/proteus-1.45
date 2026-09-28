/**
 * LIBRO DE REGLAS PARA EL ANÁLISIS DE PIEZAS (imagen, video, audio y texto de campaña)
 *
 * Es el "comando" que recibe Gemini cada vez que analiza una pieza. Tiene cuatro partes:
 *   1. Principios: cómo razona (evidencia, medido antes que opinado, identidad como vara, ética).
 *   2. Escala: qué significa cada puntaje, igual para todas las dimensiones.
 *   3. Dimensiones y criterios: qué mirar, con anclas para 1, 3 y 5, y qué medición de Proteus lo apoya.
 *   4. Formato de respuesta: JSON fijo (esquemaRespuesta), para que la app lo lea y compare piezas.
 *
 * Jerarquía: el reglamento vigente del marco metodológico (docs/marco) prevalece sobre este libro. Este libro es
 * la versión provisional de Proteus mientras Isaac no cargue la Capa 3 (retórica y creación); cuando la cargue,
 * sus reglas se integran aquí y cambia la versión.
 *
 * El puntaje global NO lo calcula Gemini: lo calcula Proteus con los pesos de abajo (puntajeGlobal()).
 */
import { identidadParaIA, type IdentidadCandidato } from '../../services/identidad/identidad';

export const LIBRO = {
  id: 'libro-analisis-piezas',
  version: '1.0',
  fecha: '2026-09-28',
  estado: 'Provisional (Proteus). Cede ante el reglamento vigente del marco metodológico y ante la Capa 3 cuando se cargue.',
};

export type TipoPieza = 'imagen' | 'video' | 'audio' | 'texto';

// ---------- 1. Principios ----------------------------------------------------------------------------

export const PRINCIPIOS: { id: string; titulo: string; regla: string }[] = [
  { id: 'P1', titulo: 'Evidencia o nada', regla: 'Cada juicio dice dónde se ve: minuto y segundo (MM:SS) en video y audio, zona en imagen (por ejemplo "tercio superior izquierdo"). Sin evidencia, no hay juicio.' },
  { id: 'P2', titulo: 'Lo medido manda', regla: 'Si la sección MEDICIONES trae un valor (color, ΔE, contraste, ritmo de cortes, palabras por minuto), úsalo y no lo contradigas. No inventes números de color, de tiempo ni de audiencia.' },
  { id: 'P3', titulo: 'La identidad es la vara', regla: 'Evalúa la pieza contra la IDENTIDAD DEL CANDIDATO, no contra un gusto genérico. Si la identidad no define algo, dilo ("sin definir en la identidad") y evalúa con buenas prácticas generales.' },
  { id: 'P4', titulo: 'Observar antes de interpretar', regla: 'Separa lo que se ve o se oye (observación) de lo que significa para la campaña (lectura).' },
  { id: 'P5', titulo: 'Confianza explícita', regla: 'Cada criterio lleva confianza alta, media o baja. Baja cuando la calidad de la pieza, el ángulo o la duración no dejan ver bien.' },
  { id: 'P6', titulo: 'Personas, con respeto', regla: 'No identifiques a nadie por su cara o su voz. Solo nombra al candidato o a quien la pieza nombre en texto o audio. No infieras de nadie etnia, religión, salud, orientación sexual ni condición económica.' },
  { id: 'P7', titulo: 'Decisiones, no cuerpos', regla: 'No califiques el atractivo físico. Evalúa decisiones de producción: luz, encuadre, vestuario, maquillaje para cámara, escenario.' },
  { id: 'P8', titulo: 'Mismo rasero para todos', regla: 'Las piezas de adversarios se analizan con los mismos criterios y sin adjetivos descalificadores: se describe la técnica.' },
  { id: 'P9', titulo: 'Cada debilidad, una acción', regla: 'Toda mejora es concreta y factible para un equipo de campaña ("subir la voz del candidato 6 dB sobre la música en 00:12-00:30"), no genérica ("mejorar el audio").' },
  { id: 'P10', titulo: 'Cifras: verificar, no juzgar', regla: 'Lista cada cifra o hecho verificable que afirma la pieza, con su momento. No digas si es cierto o falso: Proteus lo contrasta con sus fuentes.' },
  { id: 'P11', titulo: 'Cumplimiento primero', regla: 'Señala todo lo que roce las líneas rojas del candidato o las normas de publicidad política (leyenda de publicidad pagada, responsable, menores identificables, ataques a la vida privada, desinformación).' },
];

// ---------- 2. Escala ---------------------------------------------------------------------------------

export const ESCALA: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'Contradice la identidad del candidato o falla el criterio de forma evidente.',
  2: 'Débil: el criterio se intenta pero no se logra.',
  3: 'Cumple lo mínimo: correcto, sin fuerza propia.',
  4: 'Bien logrado y coherente con la identidad.',
  5: 'Ejemplar: podría usarse como referencia de la campaña.',
};

// ---------- 3. Dimensiones y criterios -----------------------------------------------------------

/** Mediciones deterministas de Proteus que pueden apoyar un criterio (ver services/analisisPiezas/medicion.ts) */
export type Medida = 'paleta' | 'adherencia' | 'contraste' | 'tonalidad' | 'composicion' | 'cortes' | 'ritmoHabla' | 'muletillas';

export interface Criterio { id: string; nombre: string; mirar: string; ancla1: string; ancla3: string; ancla5: string; medida?: Medida }
export interface Dimension { id: string; nombre: string; peso: number; aplica: TipoPieza[]; pregunta: string; criterios: Criterio[] }

export const DIMENSIONES: Dimension[] = [
  {
    id: 'mensaje', nombre: 'Mensaje', peso: 3, aplica: ['imagen', 'video', 'audio', 'texto'],
    pregunta: '¿Se entiende una idea central, alineada con los ejes del candidato, y qué se pide al público?',
    criterios: [
      { id: 'idea', nombre: 'Idea central', mirar: 'Una sola idea que se pueda repetir en una frase.', ancla1: 'No hay idea reconocible o hay varias compitiendo.', ancla3: 'Hay una idea, pero tarda en aparecer o se diluye.', ancla5: 'Una idea clara, dicha pronto y reforzada al cierre.' },
      { id: 'ejes', nombre: 'Alineación con los ejes', mirar: 'Relación con los ejes programáticos y la propuesta de valor de la identidad.', ancla1: 'Contradice o ignora los ejes.', ancla3: 'Toca un eje de forma genérica.', ancla5: 'Desarrolla un eje prioritario con una propuesta concreta.' },
      { id: 'concrecion', nombre: 'Concreción', mirar: 'Propuestas con qué, dónde, cuándo o cómo; no solo valores.', ancla1: 'Solo adjetivos y valores.', ancla3: 'Una propuesta, sin detalle.', ancla5: 'Propuesta concreta y posible para el cargo al que aspira.' },
      { id: 'llamado', nombre: 'Llamado a la acción', mirar: 'Qué se le pide al público (votar, compartir, asistir, inscribirse).', ancla1: 'No hay llamado.', ancla3: 'Llamado débil o tardío.', ancla5: 'Llamado claro, visible y coherente con el canal.' },
    ],
  },
  {
    id: 'oratoria', nombre: 'Oratoria', peso: 3, aplica: ['video', 'audio'],
    pregunta: '¿Habla como la identidad dice que habla, con estructura, ritmo y claridad?',
    criterios: [
      { id: 'estructura', nombre: 'Estructura', mirar: 'Apertura con gancho, desarrollo, cierre que resume o pide.', ancla1: 'Sin orden; empieza y termina en cualquier punto.', ancla3: 'Hay orden, pero la apertura es plana.', ancla5: 'Gancho en los primeros segundos, desarrollo claro y cierre memorable.' },
      { id: 'ritmo', nombre: 'Ritmo del habla', mirar: 'Palabras por minuto frente al rango objetivo de la identidad.', ancla1: 'Muy fuera del rango (atropellado o lento).', ancla3: 'Cerca del rango, con tramos desiguales.', ancla5: 'Dentro del rango y con variación intencional.', medida: 'ritmoHabla' },
      { id: 'pausas', nombre: 'Pausas y énfasis', mirar: 'Silencios antes o después de las ideas clave; subrayado vocal.', ancla1: 'Sin pausas; todo con el mismo peso.', ancla3: 'Algunas pausas, no siempre en las ideas clave.', ancla5: 'Pausas y énfasis que ordenan el mensaje.' },
      { id: 'muletillas', nombre: 'Muletillas y palabras vedadas', mirar: 'Muletillas y palabras prohibidas de la identidad.', ancla1: 'Frecuentes o hay palabras vedadas.', ancla3: 'Algunas muletillas, sin vedadas.', ancla5: 'Sin muletillas perceptibles ni vedadas.', medida: 'muletillas' },
      { id: 'voz', nombre: 'Coherencia con la voz', mirar: 'Formalidad, energía, tecnicismo y persona gramatical definidos en la identidad.', ancla1: 'Otra voz (por ejemplo, técnica y fría cuando la identidad es cercana).', ancla3: 'Coherente en parte.', ancla5: 'Suena exactamente como la identidad describe.' },
      { id: 'diccion', nombre: 'Dicción e inteligibilidad', mirar: 'Se entiende cada palabra sin subtítulos.', ancla1: 'Partes ininteligibles.', ancla3: 'Se entiende con esfuerzo en tramos.', ancla5: 'Nítido todo el tiempo.' },
    ],
  },
  {
    id: 'presencia', nombre: 'Presencia', peso: 2, aplica: ['video', 'imagen'],
    pregunta: '¿La presencia del candidato en cámara transmite lo que la identidad quiere transmitir?',
    criterios: [
      { id: 'mirada', nombre: 'Mirada', mirar: 'Contacto con cámara o con el interlocutor, según el formato.', ancla1: 'Mirada perdida o leyendo de forma evidente.', ancla3: 'Contacto intermitente.', ancla5: 'Contacto sostenido y natural.' },
      { id: 'gesto', nombre: 'Gesto y postura', mirar: 'Manos visibles, gestos abiertos, postura; congruencia con el mensaje.', ancla1: 'Gestos cerrados o que contradicen lo que dice.', ancla3: 'Neutro.', ancla5: 'Gestos que refuerzan cada idea.' },
      { id: 'vestuario', nombre: 'Vestuario y arreglo', mirar: 'Frente a lo que la identidad recomienda y evita, y frente a la paleta.', ancla1: 'Usa lo que la identidad pide evitar.', ancla3: 'Correcto, sin relación con la marca.', ancla5: 'Coherente con la marca y el contexto (tarima, barrio, estudio).' },
    ],
  },
  {
    id: 'composicion', nombre: 'Composición', peso: 2, aplica: ['imagen', 'video'],
    pregunta: '¿La imagen ordena la mirada hacia lo importante?',
    criterios: [
      { id: 'jerarquia', nombre: 'Jerarquía visual', mirar: 'Qué se ve primero, segundo y tercero; si coincide con lo importante.', ancla1: 'Lo primero que se ve no es el mensaje ni el candidato.', ancla3: 'Jerarquía clara pero con elementos que compiten.', ancla5: 'La mirada va al candidato o al mensaje y luego al llamado.' },
      { id: 'tercios', nombre: 'Encuadre y tercios', mirar: 'Ubicación del sujeto frente a los puntos fuertes o al centro deliberado; aire de mirada.', ancla1: 'Sujeto cortado o mal ubicado sin intención.', ancla3: 'Encuadre correcto y convencional.', ancla5: 'Encuadre intencional que refuerza el mensaje.', medida: 'composicion' },
      { id: 'angulo', nombre: 'Ángulo y distancia', mirar: 'Picado, contrapicado, a la altura de los ojos; plano general, medio o cerrado; qué comunica.', ancla1: 'Ángulo que empequeñece o distorsiona sin intención.', ancla3: 'Neutro.', ancla5: 'Ángulo y distancia coherentes con el arquetipo.' },
      { id: 'fondo', nombre: 'Fondo y contexto', mirar: 'Qué dice el lugar; distracciones, marcas o logos ajenos, desorden.', ancla1: 'El fondo distrae o contradice el mensaje.', ancla3: 'Fondo neutro.', ancla5: 'El lugar cuenta parte de la historia (territorio, gente, obra).' },
      { id: 'texto', nombre: 'Texto en pantalla', mirar: 'Tamaño, cantidad, legibilidad en celular y zonas seguras de la red (en 9:16, evitar el 20 % inferior y el borde derecho).', ancla1: 'Ilegible, excesivo o tapado por la interfaz.', ancla3: 'Legible con esfuerzo.', ancla5: 'Pocas palabras, grandes, en zona segura.', medida: 'contraste' },
      { id: 'espacio', nombre: 'Espacio negativo', mirar: 'Aire alrededor del sujeto y del texto.', ancla1: 'Saturado, sin respiro.', ancla3: 'Algo de aire.', ancla5: 'El espacio vacío dirige la atención.', medida: 'composicion' },
    ],
  },
  {
    id: 'color', nombre: 'Colorimetría y tonalidad', peso: 2, aplica: ['imagen', 'video'],
    pregunta: '¿El color es de la marca y su temperatura y contraste acompañan el mensaje?',
    criterios: [
      { id: 'marca', nombre: 'Adherencia a la paleta', mirar: 'Presencia de los colores de marca (ΔE2000 dentro de la tolerancia) y colores ajenos dominantes.', ancla1: 'Domina un color ajeno a la marca (o de un adversario).', ancla3: 'La marca aparece, pero no domina.', ancla5: 'La paleta de marca estructura la pieza.', medida: 'adherencia' },
      { id: 'armonia', nombre: 'Armonía', mirar: 'Relación entre los colores dominantes (análogos, complementarios, triada) y si se ve ordenado.', ancla1: 'Choques sin intención.', ancla3: 'Armonía neutra.', ancla5: 'Armonía deliberada que refuerza la marca.', medida: 'paleta' },
      { id: 'temperatura', nombre: 'Temperatura y clave tonal', mirar: 'Cálido o frío, clave alta o baja, frente al tono del mensaje (esperanza, urgencia, denuncia, cercanía).', ancla1: 'Contradice el tono (frío y oscuro para un mensaje de esperanza).', ancla3: 'Neutra.', ancla5: 'La luz y la temperatura cuentan el mismo tono que las palabras.', medida: 'tonalidad' },
      { id: 'piel', nombre: 'Tono de piel', mirar: 'Piel natural, sin dominantes verdes, magentas o grises por mala luz o filtro.', ancla1: 'Dominante evidente que afea o enferma.', ancla3: 'Aceptable.', ancla5: 'Natural y consistente entre planos.' },
      { id: 'legibilidad', nombre: 'Contraste del texto', mirar: 'Contraste texto-fondo; WCAG pide 4,5:1 en texto normal y 3:1 en texto grande.', ancla1: 'Por debajo de 3:1.', ancla3: 'Entre 3:1 y 4,5:1.', ancla5: 'Por encima de 4,5:1 en todo el texto.', medida: 'contraste' },
    ],
  },
  {
    id: 'tecnica', nombre: 'Luz, sonido y técnica', peso: 1, aplica: ['imagen', 'video', 'audio'],
    pregunta: '¿La calidad técnica deja que el mensaje llegue?',
    criterios: [
      { id: 'exposicion', nombre: 'Exposición', mirar: 'Sombras o luces recortadas en la cara o el texto; contraluz.', ancla1: 'Cara quemada u oscura.', ancla3: 'Correcta con fallas menores.', ancla5: 'Cara bien iluminada, con modelado.', medida: 'tonalidad' },
      { id: 'nitidez', nombre: 'Enfoque y estabilidad', mirar: 'Foco en el sujeto; movimiento de cámara intencional o no.', ancla1: 'Desenfocado o tembloroso sin intención.', ancla3: 'Aceptable.', ancla5: 'Nítido y estable, o movimiento con propósito.' },
      { id: 'audio', nombre: 'Audio', mirar: 'Voz por encima de la música y del ambiente; ruido, eco, saturación.', ancla1: 'La voz no se entiende.', ancla3: 'Se entiende con ruido o música alta.', ancla5: 'Voz limpia y en primer plano.' },
    ],
  },
  {
    id: 'edicion', nombre: 'Edición y formato', peso: 2, aplica: ['video'],
    pregunta: '¿El video está hecho para el canal donde se va a publicar?',
    criterios: [
      { id: 'gancho', nombre: 'Gancho', mirar: 'Qué pasa en los primeros 3 segundos (texto, pregunta, imagen fuerte).', ancla1: 'Arranca con logo, silencio o saludo largo.', ancla3: 'Arranque correcto pero lento.', ancla5: 'Detiene el desplazamiento en menos de 3 s.' },
      { id: 'ritmoCortes', nombre: 'Ritmo de edición', mirar: 'Cortes por minuto y duración de planos frente al canal y al tono.', ancla1: 'Ritmo que contradice el canal (planos de 20 s en TikTok, o frenético para un mensaje sereno).', ancla3: 'Ritmo aceptable.', ancla5: 'Ritmo que sostiene la atención y el tono.', medida: 'cortes' },
      { id: 'subtitulos', nombre: 'Subtítulos', mirar: 'Presencia, sincronía, tamaño y zona segura; la identidad puede exigirlos siempre.', ancla1: 'No hay y la identidad los exige.', ancla3: 'Hay, con fallas.', ancla5: 'Completos, sincronizados y legibles.' },
      { id: 'duracion', nombre: 'Duración y proporción', mirar: 'Duración frente a la duración objetivo de la identidad; relación de aspecto frente al canal.', ancla1: 'Muy lejos del objetivo o formato equivocado.', ancla3: 'Algo largo o corto.', ancla5: 'En el objetivo y en el formato del canal.' },
      { id: 'cierre', nombre: 'Cierre de marca', mirar: 'Nombre, número en el tarjetón, logo o frase firma al final.', ancla1: 'No se sabe de quién es la pieza.', ancla3: 'Marca presente pero débil.', ancla5: 'Cierre claro con nombre, número y llamado.' },
    ],
  },
  {
    id: 'cumplimiento', nombre: 'Cumplimiento y ética', peso: 3, aplica: ['imagen', 'video', 'audio', 'texto'],
    pregunta: '¿La pieza respeta las líneas rojas del candidato y las normas de publicidad política?',
    criterios: [
      { id: 'lineas', nombre: 'Líneas rojas y temas vedados', mirar: 'Lo que la identidad prohíbe.', ancla1: 'Cruza una línea roja.', ancla3: 'Roza un tema vedado sin cruzarlo.', ancla5: 'Sin roces.' },
      { id: 'publicidad', nombre: 'Publicidad pagada', mirar: 'Si parece pauta, debe decir que es publicidad política pagada y quién la paga o responde.', ancla1: 'Pauta sin leyenda.', ancla3: 'Leyenda poco visible.', ancla5: 'Leyenda y responsable claros.' },
      { id: 'terceros', nombre: 'Terceros y menores', mirar: 'Menores identificables, personas sin aparente consentimiento, marcas o símbolos de terceros.', ancla1: 'Menores identificables o uso indebido de símbolos.', ancla3: 'Dudas menores.', ancla5: 'Sin problemas.' },
      { id: 'veracidad', nombre: 'Veracidad y respeto', mirar: 'Afirmaciones sin fuente, ataques a la vida privada, lenguaje discriminatorio.', ancla1: 'Ataque personal, desinformación o discriminación.', ancla3: 'Afirmaciones sin fuente.', ancla5: 'Todo verificable y respetuoso.' },
    ],
  },
];

export const dimensionesPara = (tipo: TipoPieza) => DIMENSIONES.filter((d) => d.aplica.includes(tipo));

// ---------- 4. Formato de respuesta --------------------------------------------------------------

export interface EvidenciaIA { momento?: string; zona?: string }
export interface CriterioIA { id: string; puntaje: number | null; observacion: string; lectura: string; evidencia: EvidenciaIA[]; confianza: 'alta' | 'media' | 'baja' }
export interface DimensionIA { id: string; criterios: CriterioIA[] }
export interface RespuestaAnalisis {
  resumen: string;
  dimensiones: DimensionIA[];
  fortalezas: string[];
  mejoras: { accion: string; prioridad: 'alta' | 'media' | 'baja'; dimension: string }[];
  cifrasParaVerificar: { afirmacion: string; momento?: string }[];
  alertasCumplimiento: { tipo: string; detalle: string; momento?: string }[];
  transcripcion?: { momento: string; texto: string }[];
}

/** Esquema JSON que Gemini debe cumplir (responseJsonSchema) */
export function esquemaRespuesta(tipo: TipoPieza): Record<string, unknown> {
  const dims = dimensionesPara(tipo);
  const evidencia = { type: 'array', items: { type: 'object', properties: { momento: { type: 'string', description: 'MM:SS' }, zona: { type: 'string' } } } };
  const conTranscripcion = tipo === 'video' || tipo === 'audio';
  return {
    type: 'object',
    properties: {
      resumen: { type: 'string', description: 'Máximo tres frases.' },
      dimensiones: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', enum: dims.map((d) => d.id) },
            criterios: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  puntaje: { type: ['integer', 'null'], minimum: 1, maximum: 5, description: 'null si el criterio no se puede evaluar en esta pieza' },
                  observacion: { type: 'string' },
                  lectura: { type: 'string' },
                  evidencia,
                  confianza: { type: 'string', enum: ['alta', 'media', 'baja'] },
                },
                required: ['id', 'puntaje', 'observacion', 'lectura', 'evidencia', 'confianza'],
              },
            },
          },
          required: ['id', 'criterios'],
        },
      },
      fortalezas: { type: 'array', items: { type: 'string' } },
      mejoras: { type: 'array', items: { type: 'object', properties: { accion: { type: 'string' }, prioridad: { type: 'string', enum: ['alta', 'media', 'baja'] }, dimension: { type: 'string' } }, required: ['accion', 'prioridad', 'dimension'] } },
      cifrasParaVerificar: { type: 'array', items: { type: 'object', properties: { afirmacion: { type: 'string' }, momento: { type: 'string' } }, required: ['afirmacion'] } },
      alertasCumplimiento: { type: 'array', items: { type: 'object', properties: { tipo: { type: 'string' }, detalle: { type: 'string' }, momento: { type: 'string' } }, required: ['tipo', 'detalle'] } },
      ...(conTranscripcion ? { transcripcion: { type: 'array', description: 'Lo que se dice, por fragmentos de 5 a 15 segundos', items: { type: 'object', properties: { momento: { type: 'string' }, texto: { type: 'string' } }, required: ['momento', 'texto'] } } } : {}),
    },
    required: ['resumen', 'dimensiones', 'fortalezas', 'mejoras', 'cifrasParaVerificar', 'alertasCumplimiento', ...(conTranscripcion ? ['transcripcion'] : [])],
  };
}

// ---------- El comando (instrucción de sistema) ------------------------------------------------

/** El libro completo en texto: lo que Gemini recibe como instrucción de sistema */
export function libroEnTexto(tipo: TipoPieza, reglasMarco?: string): string {
  const dims = dimensionesPara(tipo);
  return [
    `Eres analista de comunicación política de Proteus. Aplicas el LIBRO DE REGLAS v${LIBRO.version} para evaluar una pieza de tipo "${tipo}" de una campaña en Colombia. Respondes en español de Colombia y SOLO con el JSON pedido.`,
    '',
    'PRINCIPIOS (obligatorios):',
    ...PRINCIPIOS.map((p) => `${p.id}. ${p.titulo}: ${p.regla}`),
    '',
    'ESCALA (igual para todos los criterios):',
    ...Object.entries(ESCALA).map(([k, v]) => `${k} = ${v}`),
    'Usa null cuando el criterio no se pueda evaluar en esta pieza (por ejemplo, "mirada" en una imagen sin personas).',
    '',
    'DIMENSIONES Y CRITERIOS (evalúa todos, en este orden, con estos id):',
    ...dims.flatMap((d) => [
      `[${d.id}] ${d.nombre}: ${d.pregunta}`,
      ...d.criterios.map((c) => `  - ${c.id} (${c.nombre}): mira ${c.mirar} 1 = ${c.ancla1} 3 = ${c.ancla3} 5 = ${c.ancla5}${c.medida ? ` Apóyate en la medición "${c.medida}" si viene en MEDICIONES.` : ''}`),
    ]),
    '',
    'SALIDA: el JSON del esquema. Máximo 6 mejoras, ordenadas por prioridad. En "cifrasParaVerificar" va toda cifra o hecho verificable que la pieza afirme.',
    ...(tipo === 'video' || tipo === 'audio' ? ['Incluye la transcripción por fragmentos con su momento (MM:SS). Transcribe lo que se oye, sin corregir.'] : []),
    ...(reglasMarco?.trim() ? ['', 'REGLAMENTO VIGENTE DEL MARCO METODOLÓGICO (prevalece sobre este libro):', reglasMarco.trim()] : []),
  ].join('\n');
}

/** La instrucción de cada análisis: identidad + contexto de la pieza + mediciones de Proteus */
export function instruccionAnalisis(args: { identidad: IdentidadCandidato; tipo: TipoPieza; canal?: string; propia: boolean; contexto?: string; mediciones?: string[] }): string {
  return [
    'IDENTIDAD DEL CANDIDATO (la vara de evaluación):',
    identidadParaIA(args.identidad) || 'Sin identidad definida: evalúa con buenas prácticas generales y dilo en el resumen.',
    '',
    `PIEZA: ${args.tipo}${args.canal ? `, para ${args.canal}` : ''}. ${args.propia ? 'Es una pieza propia de la campaña.' : 'Es una pieza de otro actor (adversario o referente): aplica el principio P8.'}`,
    ...(args.contexto?.trim() ? [`CONTEXTO DADO POR EL EQUIPO: ${args.contexto.trim()}`] : []),
    '',
    'MEDICIONES DE PROTEUS (valores exactos; no los contradigas):',
    ...(args.mediciones?.length ? args.mediciones.map((m) => `- ${m}`) : ['- Ninguna para esta pieza.']),
  ].join('\n');
}

// ---------- Puntaje (lo calcula Proteus, no Gemini) --------------------------------------------

export function puntajeDimension(d: DimensionIA): number | null {
  const xs = d.criterios.map((c) => c.puntaje).filter((p): p is number => typeof p === 'number' && p >= 1 && p <= 5);
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
}

/** Promedio ponderado por el peso de cada dimensión; cumplimiento con 1 en algún criterio tope el global en 2 */
export function puntajeGlobal(r: RespuestaAnalisis): number | null {
  let suma = 0, pesos = 0;
  for (const d of r.dimensiones) {
    const def = DIMENSIONES.find((x) => x.id === d.id);
    const p = puntajeDimension(d);
    if (!def || p == null) continue;
    suma += p * def.peso; pesos += def.peso;
  }
  if (!pesos) return null;
  const global = suma / pesos;
  const cumpl = r.dimensiones.find((d) => d.id === 'cumplimiento');
  const falla = cumpl?.criterios.some((c) => c.puntaje === 1);
  return falla ? Math.min(global, 2) : global;
}

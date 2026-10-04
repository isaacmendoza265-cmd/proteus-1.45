/**
 * ANALISTA TERRITORIAL (Gemini 3.8 Flash vía /api/analista/preguntar).
 *
 * Antes de cada respuesta lee el dossier completo de la unidad elegida (dossierTerritorialService): demografía,
 * economía, estratificación o valor del suelo, alcaldía en cifras, censo electoral y la serie de todas las elecciones
 * en el territorio y en su municipio. Responde preguntas generales o específicas solo con esos datos, aplicando el
 * reglamento vigente del marco metodológico (reglas del piso 3).
 */
import { reglasPiso3 } from './marcoService';
import { limpiarMarkdown } from './contentGeneratorService';
import type { SeleccionDossier } from './dossierTerritorialService';

export const SISTEMA_ANALISTA = [
  'Eres el analista territorial de Proteus: el estratega electoral que el candidato consulta antes de decidir dónde, a quién y cómo hacer campaña en Antioquia (Colombia). Respondes en español de Colombia, con precisión, criterio propio y sin relleno.',
  'Reglas de esta herramienta:',
  '- Los datos son el DOSSIER de la unidad territorial (primer turno de la conversación), incluidos sus indicadores derivados. No uses conocimiento externo sobre personas, partidos o hechos que no estén en él. Si la pregunta pide algo que el dossier no tiene, dilo en una línea, di qué dato haría falta y responde con lo que sí hay.',
  '- Cita las cifras con su año, su fuente y si son oficiales o estimadas. Advierte (una vez, no en cada cifra) cuando una comparación entre años no es limpia: puestos que cambian, preconteo frente a escrutinio, valor catastral frente a comercial, estrato 2018 frente a estratificación vigente.',
  '- Los votos se cuentan donde está el puesto, no donde vive el votante: no atribuyas votos a los residentes de un barrio.',
  '- Los actores políticos del dossier vienen de una base sin verificar: menciónalos como tales.',
  '- Recomienda para el candidato del PERFIL (cargo, ejes, públicos, postura). Si el perfil no define algo que la respuesta necesita, dilo y trabaja con un supuesto explícito.',
  '- Si el usuario repregunta, profundiza en lo nuevo: no repitas lo que ya dijiste.',
  '- Texto plano: sin Markdown (nada de **, # ni tablas); listas con guiones. Extensión: lo que la pregunta merece; una respuesta analítica rara vez pasa de 450 palabras.',
  reglasPiso3(),
].filter(Boolean).join('\n');

export interface TurnoAnalista { rol: 'usuario' | 'analista'; texto: string }

/** Perfil y marco completo van en el sistema (macrofuentes); el dossier va aparte, como primer turno */
export async function preguntarAnalista(dossier: string, historial: TurnoAnalista[], pregunta: string, seleccion?: SeleccionDossier): Promise<string> {
  const { armarMacrofuentes, sistemaConMacrofuentes, anotarLlamada } = await import('./ia/macrofuentes');
  const m = await armarMacrofuentes({ tarea: 'analizar', seleccion, incluirDatos: false });
  anotarLlamada({ tarea: 'analizar', territorio: m.territorio, caracteres: { ...m.caracteres, datos: dossier.length }, cuando: new Date().toISOString() });
  const r = await fetch('/api/analista/preguntar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sistema: sistemaConMacrofuentes(m, SISTEMA_ANALISTA, 'analizar'), dossier, historial: historial.slice(-20), pregunta }),
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || `El servidor respondió ${r.status}.`);
  return limpiarMarkdown(String(j.texto ?? ''));
}

/** Preguntas de ejemplo según el nivel de la unidad */
export function preguntasSugeridas(nivel: string): string[] {
  const base = ['¿Cómo ha cambiado la participación aquí entre 2018 y 2026?', '¿Qué partidos crecen y cuáles caen en la serie?'];
  if (nivel === 'barrio o vereda' || nivel === 'comuna o corregimiento') {
    return [`¿En qué se diferencia este territorio del total de su municipio?`, ...base, '¿Qué perfil socioeconómico tiene y qué implica para el mensaje?'];
  }
  if (nivel === 'municipio') return ['Resume el municipio en cinco puntos para un candidato al Concejo.', ...base, '¿Cómo se relacionan el presupuesto, la categoría y las curules?'];
  return ['¿Qué municipios destacan y por qué?', '¿Dónde ganó cada fuerza en la Alcaldía 2023?'];
}

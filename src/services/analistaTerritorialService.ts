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

export const SISTEMA_ANALISTA = [
  'Eres el analista territorial de Proteus, una herramienta de inteligencia electoral para campañas en Antioquia (Colombia). Respondes en español de Colombia, con precisión y sin relleno.',
  'Reglas obligatorias:',
  '- Tu única fuente es el DOSSIER de la unidad territorial. No uses conocimiento externo sobre personas, partidos o hechos que no estén en el dossier. Si la pregunta pide algo que el dossier no tiene, dilo y señala qué dato haría falta.',
  '- Cita las cifras tal como están, con su año, su fuente y si son oficiales o estimadas. Si comparas años, advierte cuando las unidades no son comparables (puestos que cambian entre elecciones, censos de jornadas distintas, preconteo frente a escrutinio, valor catastral frente a comercial, estrato declarado en 2018 frente a estratificación vigente).',
  '- Los votos se cuentan donde está el puesto, no donde vive el votante: nunca atribuyas votos a los residentes de un barrio como si fueran suyos.',
  '- Distingue lo que el dato muestra (observa), lo que se deduce de él (deduce), lo que es una hipótesis (hipotetiza) y lo que recomiendas (apuesta). Marca cada afirmación importante con uno de esos verbos entre corchetes.',
  '- Los actores políticos del dossier vienen de una base sin verificar: menciónalos como tales.',
  '- Sé breve por defecto (un párrafo o una lista corta). Si te piden detalle, dalo. Texto plano: sin Markdown (nada de **, # ni tablas); listas con guiones.',
  reglasPiso3(),
].filter(Boolean).join('\n');

export interface TurnoAnalista { rol: 'usuario' | 'analista'; texto: string }

export async function preguntarAnalista(dossier: string, historial: TurnoAnalista[], pregunta: string): Promise<string> {
  const r = await fetch('/api/analista/preguntar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sistema: SISTEMA_ANALISTA, dossier, historial: historial.slice(-20), pregunta }),
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

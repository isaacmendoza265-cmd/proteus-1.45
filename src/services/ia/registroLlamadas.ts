/**
 * Registro de la última llamada a Gemini (tarea, unidad, tamaño de cada macrofuente y cobertura de fuentes).
 * Módulo liviano: la interfaz lo importa sin cargar el motor ni el marco (macrofuentes.ts lo re-exporta).
 */
import type { TareaIA } from './macrofuentes';
import type { CoberturaFuente } from './motor/registro';

export interface RegistroLlamada {
  tarea: TareaIA;
  territorio: string;
  caracteres: { datos: number; perfil: number; marco: number };
  cuando: string;
  cobertura?: CoberturaFuente[];
}

let ultima: RegistroLlamada | null = null;
const oyentes = new Set<(r: RegistroLlamada) => void>();
export function anotarLlamada(r: RegistroLlamada) { ultima = r; oyentes.forEach((f) => f(r)); }
export const ultimaLlamada = () => ultima;
export function alLlamar(f: (r: RegistroLlamada) => void) { oyentes.add(f); return () => { oyentes.delete(f); }; }

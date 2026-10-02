/** Perfil del candidato activo para las llamadas a Gemini (macrofuente 2). Módulo liviano: App lo importa sin arrastrar
 *  el dossier ni el marco (que se cargan bajo demanda en macrofuentes.ts). */
import type { IdentidadCandidato } from '../identidad/identidad';

export interface PerfilRegistrado {
  nombre?: string;
  identidad?: IdentidadCandidato;
  /** Campos del perfil anterior (si el perfil todavía no tiene identidad completa) */
  afiliacionPartidista?: string;
  tonoNarrativo?: string;
  estiloComunicacion?: string;
  ejeTematicoComodo?: string;
  quEvitar?: string;
}
let perfil: PerfilRegistrado | null = null;
let version = 0;

export function registrarPerfil(p: PerfilRegistrado | null) { perfil = p; version += 1; }
export const perfilRegistrado = () => perfil;
export const versionPerfil = () => version;

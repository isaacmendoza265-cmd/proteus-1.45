/**
 * MOTOR DE ANÁLISIS: registro de fuentes de datos por unidad territorial.
 *
 * Cada fuente declara qué es (categoría), qué tan confiable es (oficial o auxiliar), de dónde sale, a qué unidades
 * aplica y cómo se escribe para Gemini. El dossier recorre TODAS las fuentes registradas para la unidad elegida, así
 * que una fuente nueva entra al análisis sin tocar el dossier ni las herramientas:
 *   - por código: un módulo que llama registrarFuente() (ver fuentesAuxiliares.ts), o
 *   - sin código: un JSON en src/data/motor/ con el contrato de fuentesDeclarativas.ts.
 * Las fuentes oficiales fijas (DANE, Registraduría, CUIPO...) siguen en dossierTerritorialService y se reportan igual.
 */
import type { TerritorioFicha } from '../../territoryProfileService';

export type NivelFuente = 'oficial' | 'auxiliar';
export type CategoriaFuente =
  | 'identificación' | 'población' | 'economía' | 'estratificación' | 'institucional' | 'censo electoral'
  | 'resultados electorales' | 'seguridad' | 'actores políticos' | 'diagnóstico' | 'lectura de Proteus' | 'otra';

export interface ContextoFuente {
  /** Unidad (barrio, comuna, municipio) o null en subregión y departamento */
  t: TerritorioFicha | null;
  /** Subregión de la unidad (o la elegida) */
  subregion: string | null;
}

export interface FuenteMotor {
  id: string;
  titulo: string;
  categoria: CategoriaFuente;
  nivel: NivelFuente;
  /** Fuente declarada (y, si es auxiliar, por qué no está verificada) */
  fuente: string;
  aplica: (ctx: ContextoFuente) => boolean;
  lineas: (ctx: ContextoFuente) => string[] | Promise<string[]>;
}

const FUENTES = new Map<string, FuenteMotor>();
let version = 0;

export function registrarFuente(f: FuenteMotor) {
  FUENTES.set(f.id, f);
  version += 1;
}
export const fuentesRegistradas = () => [...FUENTES.values()];
/** Cambia cada vez que se registra una fuente: invalida las cachés del dossier */
export const versionFuentes = () => version;

export interface CoberturaFuente {
  id: string;
  titulo: string;
  categoria: CategoriaFuente;
  nivel: NivelFuente;
  estado: 'con datos' | 'sin datos' | 'no aplica';
  datos: number;
}

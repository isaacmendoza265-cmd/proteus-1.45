/**
 * PERFIL INSTITUCIONAL DEL MUNICIPIO: presupuesto de la alcaldía, categoría y curules del concejo.
 *
 * Archivos de src/data/municipal/ (pequeños, uno por fuente; cada uno lo genera su script):
 *  - presupuestoMunicipal.json: scripts/build_presupuesto_municipal.py (Contraloría General de la República, CUIPO).
 *  - curulesConcejo.json:       scripts/build_curules_concejo.py (Registraduría, curules a proveer por elección).
 *  - categoriaMunicipal.json:   scripts/build_categoria_municipal.py (Contaduría General de la Nación).
 * Se leen con import.meta.glob para que la app funcione aunque alguno todavía no exista.
 */

export interface PresupuestoAnio {
  /** Periodo CUIPO (AAAAMMDD) del corte */
  corte: string;
  inicial: number;
  definitivo: number;
  compromisos: number | null;
  pagos: number | null;
  /** Presupuesto definitivo / población DANE 2026 */
  porHabitante: number;
  alerta?: string;
}

export interface PresupuestoMunicipio {
  entidad: string;
  anios: { anio: string; datos: PresupuestoAnio }[];
  fuente: string;
  que: string;
  porHabitanteNota: string;
}

export interface CurulesConcejo {
  anio: string;
  curules: number;
  /** Curules repartidas a listas en el escrutinio (si Proteus las tiene) */
  aListas?: number;
  fuente: string;
}

export interface CategoriaMunicipio {
  vigencia: string;
  categoria: string;
}

type Archivo = { meta: Record<string, unknown>; municipios: Record<string, Record<string, unknown>> };
const ARCHIVOS = import.meta.glob<Archivo>('../data/municipal/*.json', { eager: true, import: 'default' });
const archivo = (nombre: string): Archivo | undefined => ARCHIVOS[`../data/municipal/${nombre}.json`];

const daneDe = (daneOrId: string) => /(\d{5})$/.exec(daneOrId)?.[1];

/** Presupuesto de gastos de la alcaldía por año (el más reciente primero) */
export function presupuestoMunicipio(daneOrId: string): PresupuestoMunicipio | null {
  const a = archivo('presupuestoMunicipal');
  const dane = daneDe(daneOrId);
  const m = dane ? a?.municipios[dane] : undefined;
  if (!a || !m) return null;
  const anios = Object.entries(m)
    .filter(([k]) => /^\d{4}$/.test(k))
    .map(([anio, datos]) => ({ anio, datos: datos as PresupuestoAnio }))
    .sort((x, y) => y.anio.localeCompare(x.anio));
  return { entidad: String(m.entidad ?? ''), anios, fuente: String(a.meta.fuente), que: String(a.meta.que), porHabitanteNota: String(a.meta.porHabitante) };
}

/** Curules a proveer en el concejo en una elección ('2023', '2019', '2015') */
export function curulesConcejo(daneOrId: string, anio: string): CurulesConcejo | null {
  const a = archivo('curulesConcejo');
  const dane = daneDe(daneOrId);
  const r = dane ? (a?.municipios[dane]?.[anio] as { curules: number; aListas?: number } | undefined) : undefined;
  if (!a || !r) return null;
  const fuentes = (a.meta.fuentes ?? {}) as Record<string, string>;
  return { anio, curules: r.curules, aListas: r.aListas, fuente: fuentes[anio] ?? '' };
}

/** Categoría del municipio por vigencia (la más reciente primero) */
export function categoriaMunicipio(daneOrId: string): { lista: CategoriaMunicipio[]; fuente: string } | null {
  const a = archivo('categoriaMunicipal');
  const dane = daneDe(daneOrId);
  const m = dane ? a?.municipios[dane] : undefined;
  if (!a || !m) return null;
  const lista = Object.entries(m)
    .filter(([k]) => /^\d{4}$/.test(k))
    .map(([vigencia, categoria]) => ({ vigencia, categoria: String(categoria) }))
    .sort((x, y) => y.vigencia.localeCompare(x.vigencia));
  return { lista, fuente: String(a.meta.fuente) };
}

export const CATEGORIA_TEXTO: Record<string, string> = {
  E: 'Especial', '1': 'Primera', '2': 'Segunda', '3': 'Tercera', '4': 'Cuarta', '5': 'Quinta', '6': 'Sexta',
};

/** Pesos en texto corto: 11,64 billones · 593,5 mil millones · 850 millones */
export function pesos(n: number | null | undefined): string {
  if (n == null) return '—';
  const f = (x: number, d: number) => x.toLocaleString('es-CO', { maximumFractionDigits: d, minimumFractionDigits: 0 });
  if (Math.abs(n) >= 1e12) return `${f(n / 1e12, 2)} billones`;
  if (Math.abs(n) >= 1e9) return `${f(n / 1e9, 1)} mil millones`;
  if (Math.abs(n) >= 1e6) return `${f(n / 1e6, 1)} millones`;
  return `$${f(n, 0)}`;
}

/** Periodo CUIPO (20260601) → "jun-2026" */
export function corteTexto(periodo: string): string {
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const m = /^(\d{4})(\d{2})/.exec(periodo);
  return m ? `${meses[Number(m[2]) - 1]}-${m[1]}` : periodo;
}

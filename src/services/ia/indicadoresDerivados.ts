/**
 * INDICADORES DERIVADOS (Modelo Proteus) para el dossier de una unidad territorial.
 *
 * Gemini analizaba mal porque recibía la serie de resultados en bruto y tenía que hacer las cuentas de memoria:
 * terminaba recitando cifras sueltas. Aquí se calculan, sobre los mismos resultados de la Registraduría, las
 * comparaciones que un estratega haría primero:
 *   - variación de la participación entre dos jornadas del mismo tipo (puntos porcentuales),
 *   - quién gana y quién pierde peso entre esas jornadas (por partido, en puntos),
 *   - margen entre el primero y el segundo en la última jornada de cada tipo,
 *   - votos en juego (habilitados que no votaron),
 *   - en comunas, barrios y veredas: la brecha frente al total del municipio (participación y peso de cada fuerza).
 * Son derivados: se firman "Modelo Proteus, con insumos de la Registraduría" y llevan la advertencia de comparabilidad.
 */
import { sumarEleccion, tipoEleccion, type EleccionPuestos, type ResultadoEleccion } from '../electionResultsService';

const n = (v: number) => Math.round(v).toLocaleString('es-CO');
const pct = (v: number) => `${v.toFixed(1).replace('.', ',')} %`;
const pp = (v: number) => `${v > 0 ? '+' : v < 0 ? '−' : '±'}${Math.abs(v).toFixed(1).replace('.', ',')} pp`;

/** Participación, solo si todos los puestos traen habilitados */
const participacion = (r: ResultadoEleccion) => (r.habilitados && !r.sinHabilitados ? (100 * r.votantes) / r.habilitados : null);

/** Peso de cada fuerza (partido) sobre los válidos: en elecciones por candidato se suma por el partido del candidato */
export function pesoPorFuerza(e: EleccionPuestos, r: ResultadoEleccion): Map<string, number> {
  const m = new Map<string, number>();
  if (e.porCandidato) for (const c of r.candidatos) m.set(c.partido || c.nombre, (m.get(c.partido || c.nombre) ?? 0) + c.pct);
  else for (const x of r.partidos) m.set(x.nombre, x.pct);
  return m;
}

const clave = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** Cambios de peso entre dos jornadas, emparejando fuerzas por nombre normalizado */
export function cambiosDePeso(antes: Map<string, number>, despues: Map<string, number>): { nombre: string; delta: number; antes: number; despues: number }[] {
  const previo = new Map([...antes].map(([k, v]) => [clave(k), v]));
  const out: { nombre: string; delta: number; antes: number; despues: number }[] = [];
  for (const [nombre, v] of despues) {
    const a = previo.get(clave(nombre));
    if (a == null) continue;
    out.push({ nombre, delta: v - a, antes: a, despues: v });
  }
  return out.sort((x, y) => Math.abs(y.delta) - Math.abs(x.delta));
}

/** Margen entre el primero y el segundo */
function margen(e: EleccionPuestos, r: ResultadoEleccion): string | null {
  const lista = e.porCandidato ? r.candidatos : r.partidos;
  if (lista.length < 2) return null;
  const [a, b] = lista;
  return `${a.nombre} saca ${pp(a.pct - b.pct).replace(/^\+/, '')} y ${n(a.votos - b.votos)} votos a ${b.nombre}`;
}

export interface EntradaIndicadores {
  elecciones: EleccionPuestos[];
  /** Códigos de puesto de la unidad en cada elección ('todos' = el municipio entero) */
  codigosDe: (e: EleccionPuestos) => string[] | 'todos';
  /** true si la unidad es más fina que el municipio (se compara contra el municipio) */
  subMunicipal: boolean;
  alcance: string;
  municipio: string;
}

export function indicadoresDerivados({ elecciones, codigosDe, subMunicipal, alcance, municipio }: EntradaIndicadores): string[] {
  const porTipo = new Map<string, EleccionPuestos[]>();
  for (const e of elecciones) {
    const t = tipoEleccion(e.id);
    porTipo.set(t, [...(porTipo.get(t) ?? []), e]);
  }
  const lineas: string[] = [];
  const tipos = [...porTipo.values()].map((l) => [...l].sort((a, b) => b.anio - a.anio)).sort((a, b) => b[0].anio - a[0].anio);
  for (const serie of tipos) {
    const ult = serie[0];
    const r = sumarEleccion(ult, codigosDe(ult));
    if (!r) continue;
    const partes: string[] = [];
    const m = margen(ult, r);
    if (m) partes.push(`margen: ${m}`);
    const pa = participacion(r);
    if (pa != null) partes.push(`participación ${pct(pa)}; votos en juego (habilitados que no votaron): ${n(r.habilitados - r.votantes)}`);
    // Contra la jornada anterior del mismo tipo
    const prev = serie[1];
    const rp = prev ? sumarEleccion(prev, codigosDe(prev)) : null;
    if (prev && rp) {
      const pa0 = participacion(rp);
      if (pa != null && pa0 != null) partes.push(`participación frente a ${prev.nombre}: ${pp(pa - pa0)}`);
      const cambios = cambiosDePeso(pesoPorFuerza(prev, rp), pesoPorFuerza(ult, r)).filter((c) => Math.abs(c.delta) >= 0.5);
      const suben = cambios.filter((c) => c.delta > 0).slice(0, 3);
      const bajan = cambios.filter((c) => c.delta < 0).slice(0, 3);
      if (suben.length) partes.push(`ganan peso: ${suben.map((c) => `${c.nombre} ${pp(c.delta)} (${pct(c.antes)} → ${pct(c.despues)})`).join('; ')}`);
      if (bajan.length) partes.push(`pierden peso: ${bajan.map((c) => `${c.nombre} ${pp(c.delta)} (${pct(c.antes)} → ${pct(c.despues)})`).join('; ')}`);
    }
    // Contra el municipio entero
    if (subMunicipal) {
      const rm = sumarEleccion(ult, 'todos');
      if (rm) {
        const pm = participacion(rm);
        if (pa != null && pm != null) partes.push(`participación frente a todo ${municipio}: ${pp(pa - pm)}`);
        const pesoM = pesoPorFuerza(ult, rm);
        const brechas = cambiosDePeso(pesoM, pesoPorFuerza(ult, r)).filter((c) => Math.abs(c.delta) >= 2).slice(0, 4);
        if (brechas.length) partes.push(`sobre o subrepresentadas frente a ${municipio}: ${brechas.map((c) => `${c.nombre} ${pp(c.delta)} (aquí ${pct(c.despues)}, municipio ${pct(c.antes)})`).join('; ')}`);
      }
    }
    if (partes.length) lineas.push(`${ult.nombre} en ${alcance}${prev ? ` (comparada con ${prev.nombre})` : ''}: ${partes.join(' · ')}.`);
  }
  if (!lineas.length) return [];
  return [
    'Cálculos del Modelo Proteus sobre los resultados de la Registraduría de la sección anterior (derivados: se firman "Modelo Proteus con datos de la Registraduría" y el año). pp = puntos porcentuales sobre votos válidos; la participación, sobre habilitados.',
    ...(subMunicipal ? ['Entre años cambia el conjunto de puestos dentro de la unidad: las variaciones entre jornadas son orientativas; las brechas frente al municipio (misma jornada) son más firmes.'] : []),
    'Entre jornadas de distinto tipo (Congreso frente a Presidencia o territoriales) no se compara participación: son electorados movilizados de forma distinta.',
    ...lineas,
  ];
}

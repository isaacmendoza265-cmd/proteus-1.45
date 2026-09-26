/**
 * RED DE PODER: datos y disposición 3D para el grafo de Territorio.
 *
 * Toma la base curada de casas políticas (src/data/politicalHouses) y expone solo lo que se puede
 * mostrar sin fuente: nombre, cargo, partido, casa, municipio, votos y relaciones. No expone cédulas,
 * apodos, biografías ni notas: la base es del desarrollador y no está verificada.
 */
import { GRAPH_NODES_DATA, GRAPH_EDGES_DATA, POLITICAL_HOUSES_DATA } from '../data/politicalHouses/politicalHousesMasterData';
import type { RelationType } from '../data/politicalHouses/types';

export interface ActorRed {
  id: string;
  nombre: string;
  cargo: string;
  /** Grupo de cargo para filtrar (Congreso, Alcaldías, Concejos...) */
  grupoCargo: string;
  nivel: number;
  partidoId: string;
  partido: string;
  casaId: string;
  casa: string;
  municipio: string;
  votos: number | null;
  /** Enlaces web con URL que respaldan al actor */
  enlacesWeb: number;
  /** Anotaciones del desarrollador sin enlace (no se muestran) */
  notasSinFuente: number;
}

export interface RelacionRed {
  id: string;
  origen: string;
  destino: string;
  tipo: RelationType;
  fuerza: number;
}

export const TIPOS_RELACION: Record<RelationType, { label: string; corto: string; color: string }> = {
  jerarquia_directa: { label: 'Jerarquía directa', corto: 'Jerarquía', color: '#8A8F94' },
  alianza_electoral: { label: 'Alianza electoral', corto: 'Alianza', color: '#2E8B57' },
  pacto_bancada: { label: 'Pacto de bancada', corto: 'Bancada', color: '#3E5C8A' },
  tension_disputa: { label: 'Tensión o disputa', corto: 'Tensión', color: '#C0392B' },
};

const GRUPO_CARGO: Record<string, string> = {
  senador: 'Congreso', senadora: 'Congreso', representante: 'Congreso',
  gobernador: 'Gobernación y Asamblea', diputado: 'Gobernación y Asamblea',
  alcalde: 'Alcaldías', alcaldesa: 'Alcaldías', concejal: 'Concejos',
  patriarca: 'Jefes de casa y líderes', lider_politico: 'Jefes de casa y líderes',
};

export const COLORES_CARGO: Record<string, string> = {
  Congreso: '#85172C', 'Gobernación y Asamblea': '#B7791F', Alcaldías: '#2F6A5F', Concejos: '#3E5C8A', 'Jefes de casa y líderes': '#7A4E8A', Otros: '#8A8F94',
};

export const COLORES_PARTIDO: Record<string, string> = {
  conservador: '#2B4C8C', 'centro-democratico': '#4A90C2', liberal: '#B8322A', creemos: '#6F9A1F',
  'pacto-historico': '#7A3E9D', verde: '#2E8B57', sin: '#8A8F94',
};

const PALETA_CASAS = ['#1F5FA8', '#C0392B', '#2E8B57', '#8E44AD', '#D68910', '#17A2B8', '#A04000', '#6C7A89', '#E84393', '#556B2F', '#34495E', '#B7791F', '#5E7D2E'];

const nombreCasa = new Map(POLITICAL_HOUSES_DATA.map((h) => [h.id, h.name]));

export const ACTORES_RED: ActorRed[] = GRAPH_NODES_DATA.map((n) => ({
  id: n.id,
  nombre: n.name,
  cargo: n.roleLabel || n.role,
  grupoCargo: GRUPO_CARGO[n.role] ?? 'Otros',
  nivel: n.level,
  partidoId: n.partyId || 'sin',
  partido: n.partyName || 'Sin partido',
  casaId: n.houseId,
  casa: nombreCasa.get(n.houseId) || n.houseName || 'Sin casa',
  municipio: n.municipality,
  votos: n.votes2023 ?? null,
  enlacesWeb: (n.newsLinks || []).filter((x) => !!x.url).length,
  notasSinFuente: (n.newsLinks || []).filter((x) => !x.url).length,
}));

const ids = new Set(ACTORES_RED.map((a) => a.id));
export const RELACIONES_RED: RelacionRed[] = GRAPH_EDGES_DATA.filter((e) => ids.has(e.source) && ids.has(e.target)).map((e) => ({
  id: e.id, origen: e.source, destino: e.target, tipo: e.type, fuerza: e.strength,
}));

/** Color estable por casa (por número de actores, de mayor a menor) */
export const COLORES_CASA: Record<string, string> = (() => {
  const cuenta = new Map<string, number>();
  for (const a of ACTORES_RED) cuenta.set(a.casaId, (cuenta.get(a.casaId) ?? 0) + 1);
  const orden = [...cuenta.keys()].sort((x, y) => (cuenta.get(y)! - cuenta.get(x)!) || x.localeCompare(y));
  return Object.fromEntries(orden.map((id, i) => [id, PALETA_CASAS[i % PALETA_CASAS.length]]));
})();

export const FUENTE_RED = {
  desarrollador: `${ACTORES_RED.length} actores y ${RELACIONES_RED.length} relaciones de la base curada de casas políticas. Sin verificar.`,
  web: `${ACTORES_RED.filter((a) => a.enlacesWeb > 0).length} actores con enlace web verificable.`,
};

/** Generador pseudoaleatorio con semilla (disposición estable entre recargas) */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/**
 * Disposición 3D por fuerzas (Fruchterman-Reingold): las relaciones atraen, todos se repelen y los
 * actores de una misma casa se atraen levemente para que cada casa forme un grupo.
 * Devuelve posiciones dentro de una esfera de radio 1.
 */
export function disposicion3D(actores: ActorRed[] = ACTORES_RED, relaciones: RelacionRed[] = RELACIONES_RED, iteraciones = 220): Record<string, [number, number, number]> {
  const r = rng(20260925);
  const n = actores.length;
  const idx = new Map(actores.map((a, i) => [a.id, i]));
  const casas = [...new Set(actores.map((a) => a.casaId))];
  // Centro inicial de cada casa sobre una espiral de Fibonacci
  const centro = new Map(casas.map((c, i) => {
    const y = 1 - (2 * (i + 0.5)) / casas.length;
    const rad = Math.sqrt(1 - y * y);
    const th = i * 2.399963;
    return [c, [rad * Math.cos(th), y, rad * Math.sin(th)] as [number, number, number]];
  }));
  const p = actores.map((a) => {
    const c = centro.get(a.casaId)!;
    return [c[0] + (r() - 0.5) * 0.4, c[1] + (r() - 0.5) * 0.4, c[2] + (r() - 0.5) * 0.4];
  });
  const pares: [number, number, number][] = [];
  for (const e of relaciones) {
    const a = idx.get(e.origen), b = idx.get(e.destino);
    if (a != null && b != null) pares.push([a, b, 1 + e.fuerza * 0.15]);
  }
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (actores[i].casaId === actores[j].casaId) pares.push([i, j, 0.25]);
  const k = 0.32;
  let temp = 0.12;
  for (let it = 0; it < iteraciones; it++) {
    const d = p.map(() => [0, 0, 0]);
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = p[i][0] - p[j][0], dy = p[i][1] - p[j][1], dz = p[i][2] - p[j][2];
        const dist = Math.max(0.01, Math.hypot(dx, dy, dz));
        const f = (k * k) / dist;
        const fx = (dx / dist) * f, fy = (dy / dist) * f, fz = (dz / dist) * f;
        d[i][0] += fx; d[i][1] += fy; d[i][2] += fz;
        d[j][0] -= fx; d[j][1] -= fy; d[j][2] -= fz;
      }
    }
    for (const [a, b, w] of pares) {
      const dx = p[a][0] - p[b][0], dy = p[a][1] - p[b][1], dz = p[a][2] - p[b][2];
      const dist = Math.max(0.01, Math.hypot(dx, dy, dz));
      const f = ((dist * dist) / k) * w;
      const fx = (dx / dist) * f, fy = (dy / dist) * f, fz = (dz / dist) * f;
      d[a][0] -= fx; d[a][1] -= fy; d[a][2] -= fz;
      d[b][0] += fx; d[b][1] += fy; d[b][2] += fz;
    }
    for (let i = 0; i < n; i++) {
      const len = Math.max(0.0001, Math.hypot(d[i][0], d[i][1], d[i][2]));
      const m = Math.min(len, temp);
      for (let c = 0; c < 3; c++) p[i][c] += (d[i][c] / len) * m - p[i][c] * 0.01;
    }
    temp *= 0.985;
  }
  const cx = p.reduce((s, v) => s + v[0], 0) / n, cy = p.reduce((s, v) => s + v[1], 0) / n, cz = p.reduce((s, v) => s + v[2], 0) / n;
  const R = Math.max(...p.map((v) => Math.hypot(v[0] - cx, v[1] - cy, v[2] - cz))) || 1;
  return Object.fromEntries(actores.map((a, i) => [a.id, [(p[i][0] - cx) / R, (p[i][1] - cy) / R, (p[i][2] - cz) / R]]));
}

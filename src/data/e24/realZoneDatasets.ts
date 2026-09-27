/**
 * Visor E-24 de Medellín con resultados REALES por zona electoral.
 *
 * Datos: src/data/e24/medellinZonasReales.json (scripts/build_e24_medellin_zonas.py), sumados por
 * zona desde los resultados por puesto de la app: escrutinio mesa a mesa (2015, 2019, Presidencia
 * 2022) y preconteo (2023). Reemplaza el modelo anterior, que repartía los totales municipales entre
 * zonas con el peso del censo y "afinidades" ideológicas inventadas por zona.
 * En Concejo y Asamblea solo hay votos por partido (sin desglose por candidato); en Senado y Cámara
 * 2022, votos solo por la lista y por cada candidato, del archivo mesa a mesa completo.
 */
import raw from './medellinZonasReales.json';
import { COMUNAS_INFO } from './comunasData';
import { colorDePartido, COLOR_COALICION_LOCAL } from '../electoral/partidoColors';
import type { Candidate, ComunaPartySummary, ComunaVotesAggregation, MunicipalSummary, Party, ZoneId, ZoneVotes } from './types';

interface Lista { id: string; name: string; shortName: string; party: string }
/** p: votos por lista; po: solo por la lista; c: por candidato ("<lista>-<n>"), solo en Senado/Cámara 2022 */
interface Zona { p: Record<string, number>; po?: Record<string, number>; c?: Record<string, number>; b: number; n: number; m: number; mesas: number }
interface Registro {
  fuente: string; tipo: 'escrutinio' | 'preconteo'; uninominal: boolean; listas: Lista[]; zonas: Record<string, Zona>;
  candidatos?: { id: string; partyId: string; name: string }[];
}
const DATOS = raw as unknown as Record<string, Registro>;

export const CLAVES_ZONAS_REALES = Object.keys(DATOS);
export const fuenteZonasReales = (clave: string) => DATOS[clave]?.fuente ?? '';

const PALETA = ['#0284c7', '#a855f7', '#f59e0b', '#10b981', '#ef4444', '#14b8a6', '#ec4899', '#84cc16', '#64748b'];

export function buildRealZoneDataset(clave: string) {
  const d = DATOS[clave];
  if (!d) throw new Error(`Sin datos reales por zona para ${clave}`);
  const totalPorLista: Record<string, number> = {};
  for (const z of Object.values(d.zonas)) for (const [k, v] of Object.entries(z.p)) totalPorLista[k] = (totalPorLista[k] ?? 0) + v;
  const listas = [...d.listas].sort((a, b) => (totalPorLista[b.id] ?? 0) - (totalPorLista[a.id] ?? 0));
  // Color: el del partido si es un partido nacional reconocible; si no, uno de la paleta por orden de votos
  const color: Record<string, string> = {};
  listas.forEach((l, i) => {
    const c = colorDePartido(l.party).color;
    color[l.id] = c === COLOR_COALICION_LOCAL.color || d.uninominal ? PALETA[Math.min(i, PALETA.length - 1)] : c;
  });

  const zoneVotes = {} as Record<ZoneId, ZoneVotes>;
  for (const [zid, z] of Object.entries(d.zonas)) {
    const parties: ZoneVotes['parties'] = {};
    let validos = 0;
    for (const l of listas) {
      const v = z.p[l.id] ?? 0;
      const cand: Record<string, number> = {};
      for (const [cid, cv] of Object.entries(z.c ?? {})) if (cid.startsWith(`${l.id}-`)) cand[cid.slice(l.id.length + 1)] = cv;
      parties[l.id] = { partyOnly: d.uninominal ? 0 : (z.po ? z.po[l.id] ?? 0 : v), candidateVotes: d.uninominal ? { '1': v } : cand, totalPartyVotes: v };
      validos += v;
    }
    zoneVotes[zid as ZoneId] = { zone: zid as ZoneId, parties, votosBlanco: z.b, votosNulos: z.n, votosNoMarcados: z.m, votosValidos: validos + z.b, totalVotos: validos + z.b + z.n + z.m };
  }

  const totalValidosCiudad = Object.values(totalPorLista).reduce((a, b) => a + b, 0) + Object.values(d.zonas).reduce((a, z) => a + z.b, 0);
  const resumen = (l: Lista, votos: number, partyOnly: number, cand: Record<string, number>, base: number): ComunaPartySummary => ({
    partyId: l.id, partyName: l.name, shortName: l.shortName, color: color[l.id], partyOnly, candidateVotes: cand, totalPartyVotes: votos,
    percentageValidos: base > 0 ? (100 * votos) / base : 0,
    municipalPercentage: totalValidosCiudad > 0 ? (100 * (totalPorLista[l.id] ?? 0)) / totalValidosCiudad : 0,
  });

  const comunaAggregations: Record<number, ComunaVotesAggregation> = {};
  for (const comuna of COMUNAS_INFO) {
    const zs = comuna.zones.map((z) => zoneVotes[z]).filter(Boolean);
    const b = zs.reduce((a, z) => a + z.votosBlanco, 0), n = zs.reduce((a, z) => a + z.votosNulos, 0), m = zs.reduce((a, z) => a + z.votosNoMarcados, 0);
    const votos = (id: string) => zs.reduce((a, z) => a + (z.parties[id]?.totalPartyVotes ?? 0), 0);
    const soloLista = (id: string) => zs.reduce((a, z) => a + (z.parties[id]?.partyOnly ?? 0), 0);
    const porCandidato = (id: string) => {
      const out: Record<string, number> = {};
      for (const z of zs) for (const [c, v] of Object.entries(z.parties[id]?.candidateVotes ?? {})) out[c] = (out[c] ?? 0) + v;
      return out;
    };
    const validos = listas.reduce((a, l) => a + votos(l.id), 0) + b;
    const sorted = listas.map((l) => resumen(l, votos(l.id), soloLista(l.id), porCandidato(l.id), validos))
      .sort((x, y) => y.totalPartyVotes - x.totalPartyVotes);
    const [w, r] = sorted;
    comunaAggregations[comuna.id] = {
      comunaId: comuna.id, comunaName: comuna.comunaName, officialName: comuna.officialName, zones: comuna.zones,
      parties: Object.fromEntries(sorted.map((s) => [s.partyId, s])), sortedParties: sorted,
      votosBlanco: b, votosNulos: n, votosNoMarcados: m, votosValidos: validos, totalVotos: validos + n + m,
      winnerPartyId: w?.partyId ?? '', winnerPartyName: w?.shortName ?? 'N/A', winnerPartyVotes: w?.totalPartyVotes ?? 0, winnerPartyPercentage: w?.percentageValidos ?? 0,
      runnerUpPartyId: r?.partyId ?? '', runnerUpPartyName: r?.shortName ?? 'N/A', runnerUpPartyVotes: r?.totalPartyVotes ?? 0, runnerUpPartyPercentage: r?.percentageValidos ?? 0,
    };
  }

  const zonas = Object.values(d.zonas);
  const nulos = zonas.reduce((a, z) => a + z.n, 0), noMarcados = zonas.reduce((a, z) => a + z.m, 0), blanco = zonas.reduce((a, z) => a + z.b, 0);
  const mesas = zonas.reduce((a, z) => a + z.mesas, 0);
  const sortedMun = listas.map((l) => {
    const v = totalPorLista[l.id] ?? 0;
    const cand: Record<string, number> = {};
    let po = 0;
    for (const z of Object.values(zoneVotes)) {
      po += z.parties[l.id]?.partyOnly ?? 0;
      for (const [c, cv] of Object.entries(z.parties[l.id]?.candidateVotes ?? {})) cand[c] = (cand[c] ?? 0) + cv;
    }
    const s = resumen(l, v, po, cand, totalValidosCiudad);
    return { partyId: s.partyId, partyName: s.partyName, shortName: s.shortName, color: s.color, partyOnly: s.partyOnly, candidateVotes: s.candidateVotes, totalPartyVotes: s.totalPartyVotes, percentageValidos: s.percentageValidos };
  });
  const municipalSummary: MunicipalSummary = {
    totalMesas: mesas, mesasEscrutadas: mesas, porcentajeEscrutado: 100,
    parties: Object.fromEntries(sortedMun.map((s) => [s.partyId, s])), sortedParties: sortedMun,
    totalPorPartidos: totalValidosCiudad - blanco, votosBlanco: blanco, votosNulos: nulos, votosNoMarcados: noMarcados,
    votosValidos: totalValidosCiudad, totalVotos: totalValidosCiudad + nulos + noMarcados,
  };

  const anio = Number(/(\d{4})/.exec(clave)?.[1]);
  const parties: Party[] = listas.map((l) => ({
    id: l.id, code: l.id, name: l.name, partyName: l.party, shortName: l.shortName, preferential: !d.uninominal, isPreferential: !d.uninominal,
    color: color[l.id], logoText: l.shortName.slice(0, 3).toUpperCase(), formula: d.uninominal ? l.shortName : undefined,
  }));
  const candidates: Record<string, Candidate[]> = d.uninominal
    ? Object.fromEntries(listas.map((l) => [l.id, [{ id: '1', number: '1', name: l.shortName, partyId: l.id, partyName: l.party, color: color[l.id], bio: `${l.party} (${anio})` }]]))
    : {};
  for (const c of d.candidatos ?? []) {
    const l = listas.find((x) => x.id === c.partyId);
    if (!l) continue;
    const n = c.id.slice(c.partyId.length + 1);
    (candidates[c.partyId] ??= []).push({ id: n, number: n.padStart(3, '0'), name: c.name, partyId: c.partyId, partyName: l.name, color: color[l.id], bio: `${l.name} (${anio})` });
  }
  return { parties, candidates, comunaAggregations, zoneVotes, municipalSummary };
}

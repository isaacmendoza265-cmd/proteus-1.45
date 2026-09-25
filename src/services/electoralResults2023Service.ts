/**
 * RESULTADOS OFICIALES 2023 (Alcaldía y Concejo) — 125 municipios de Antioquia
 * Registraduría Nacional del Estado Civil, Consulta Histórico de Resultados Electorales.
 * Se generan con `node scripts/build_resultados_2023.mjs` desde _originales/registraduria/.
 */
import raw from '../data/electoral/resultados2023Antioquia.json';

export interface CandidatoAlcaldia2023 {
  nombre: string;
  partido: string;
  votos: number;
  /** % sobre votos válidos (candidatos + voto en blanco) */
  pctValidos: number;
}

export interface Resultado2023 {
  municipio: string;
  codigoRegistraduria: string;
  alcaldia: {
    censo: number;
    votantes: number;
    participacion: number;
    mesas: number;
    votosValidos: number;
    votosBlanco: number;
    votosNulos: number;
    votosNoMarcados: number;
    candidatos: CandidatoAlcaldia2023[];
  };
  /** null si la Registraduría no publica el concejo de ese municipio (Pueblorrico) */
  concejo: {
    curulesPorLista: { partido: string; curules: number }[];
    totalCurulesListas: number;
    partidoMasVotado: string | null;
  } | null;
}

const DATA = raw as unknown as { meta: Record<string, string>; municipios: Record<string, Resultado2023> };

export const RESULTADOS_2023_META = DATA.meta;

/** Por código DANE ('05001') o id 'mpio-05001' */
export function getResultado2023(daneOrId: string): Resultado2023 | undefined {
  const code = /(\d{5})$/.exec(daneOrId)?.[1];
  return code ? DATA.municipios[code] : undefined;
}

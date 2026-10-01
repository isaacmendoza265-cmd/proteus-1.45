/**
 * SERIE DEL CENSO ELECTORAL (habilitados) POR MUNICIPIO: 2018, 2019, 2022, 2023 y 2026.
 *
 * src/data/electoral/censoHistorico.json, generado con `python3 scripts/build_censo_historico.py` desde la Consulta
 * Histórico de Resultados Electorales de la Registraduría (censo de cada jornada) y el censo 2026 (corte 30-abr).
 * Sirve para que la participación de 2018-2022 (archivos mesa a mesa sin habilitados) sea comparable con la de
 * 2023 y 2026. Cada elección usa el censo de SU jornada; 2015 y la 2.ª vuelta presidencial no están en la fuente.
 */
import raw from '../data/electoral/censoHistorico.json';

interface FilaCenso { censo: number; mujeres: number | null; hombres: number | null; mesas: number | null }
interface Archivo {
  meta: { fuente: string; jornadas: Record<string, string>; elecciones: Record<string, string[]>; nota: string };
  municipios: Record<string, Record<string, FilaCenso>>;
}
const A = raw as unknown as Archivo;

/** Jornada de la fuente que corresponde a cada elección de Proteus ('concejo-2019' → 'alcaldia-2019') */
const JORNADA_DE = new Map(Object.entries(A.meta.elecciones).flatMap(([j, ids]) => ids.map((id) => [id, j] as const)));

/** Orden cronológico de las jornadas (Congreso en marzo, Presidencia en mayo) */
const ORDEN = ['presidente-1v-2018', 'alcaldia-2019', 'senado-2022', 'presidente-1v-2022', 'alcaldia-2023', 'censo-2026'];

const daneDe = (daneOrId: string) => /(\d{5})$/.exec(daneOrId)?.[1];

/** Habilitados del municipio en la jornada de esa elección; null si la fuente no la tiene (2015, 2.ª vuelta) */
export function censoDeEleccion(daneOrId: string, eleccionId: string): number | null {
  const j = JORNADA_DE.get(eleccionId);
  const d = daneDe(daneOrId);
  return (j && d && A.municipios[d]?.[j]?.censo) || null;
}

export interface PuntoCenso { jornada: string; etiqueta: string; anio: number; censo: number; mujeres: number | null; hombres: number | null; mesas: number | null }

/** Serie del censo electoral del municipio, de la más antigua a la más reciente */
export function serieCenso(daneOrId: string): PuntoCenso[] {
  const d = daneDe(daneOrId);
  const m = d ? A.municipios[d] : undefined;
  if (!m) return [];
  return Object.entries(m)
    .map(([jornada, f]) => ({ jornada, etiqueta: A.meta.jornadas[jornada] ?? jornada, anio: Number(/(\d{4})/.exec(jornada)?.[1]), ...f }))
    .sort((a, b) => ORDEN.indexOf(a.jornada) - ORDEN.indexOf(b.jornada));
}

export const FUENTE_CENSO_HISTORICO = A.meta.fuente;
export const NOTA_CENSO_HISTORICO = A.meta.nota;

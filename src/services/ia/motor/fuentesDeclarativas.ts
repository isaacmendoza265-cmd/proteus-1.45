/**
 * FUENTES DECLARATIVAS: datos nuevos que entran al motor SIN escribir código.
 *
 * Basta con dejar un JSON en src/data/motor/<nombre>.json con este contrato (ver src/data/motor/README.md):
 * {
 *   "meta": { "titulo": "...", "fuente": "...", "nivel": "oficial" | "auxiliar", "categoria": "población" | ...,
 *             "corte": "2026-09-30", "nota": "..." },
 *   "municipios":  { "05001": { "lineas": ["..."], "valores": { "campo": 12.3 } } },   // por código DANE
 *   "territorios": { "comuna-14": { ... }, "bello-div-6": { ... } },                  // por id de Proteus
 *   "subregiones": { "Valle de Aburrá": { ... } },
 *   "departamento": { ... }
 * }
 * Al volver a construir la app, el motor la incluye en el dossier de cada unidad a la que aplique; un barrio también
 * recibe lo de su comuna y de su municipio (rotulado). Las pruebas validan el contrato.
 */
import { registrarFuente, type CategoriaFuente, type NivelFuente } from './registro';
import { territorioFicha } from '../../territoryProfileService';

export interface BloqueDeclarativo { lineas?: string[]; valores?: Record<string, string | number | null> }
export interface ArchivoDeclarativo {
  meta: { titulo: string; fuente: string; nivel: NivelFuente; categoria: CategoriaFuente; corte?: string; nota?: string };
  municipios?: Record<string, BloqueDeclarativo>;
  territorios?: Record<string, BloqueDeclarativo>;
  subregiones?: Record<string, BloqueDeclarativo>;
  departamento?: BloqueDeclarativo;
}

const ARCHIVOS = import.meta.glob<ArchivoDeclarativo>('../../../data/motor/*.json', { eager: true, import: 'default' });

const texto = (b: BloqueDeclarativo | undefined, prefijo = ''): string[] => b ? [
  ...(b.lineas ?? []).map((l) => `${prefijo}${l}`),
  ...Object.entries(b.valores ?? {}).map(([k, v]) => `${prefijo}${k}: ${v ?? 'sin dato'}`),
] : [];

/** Errores del contrato (vacío = válido); lo usan las pruebas */
export function validarDeclarativo(a: ArchivoDeclarativo): string[] {
  const e: string[] = [];
  if (!a?.meta?.titulo) e.push('falta meta.titulo');
  if (!a?.meta?.fuente) e.push('falta meta.fuente');
  if (a?.meta?.nivel !== 'oficial' && a?.meta?.nivel !== 'auxiliar') e.push('meta.nivel debe ser "oficial" o "auxiliar"');
  if (!a.municipios && !a.territorios && !a.subregiones && !a.departamento) e.push('no trae municipios, territorios, subregiones ni departamento');
  return e;
}

for (const [ruta, a] of Object.entries(ARCHIVOS)) {
  if (validarDeclarativo(a).length) { console.warn(`Fuente declarativa inválida (${ruta}):`, validarDeclarativo(a)); continue; }
  const id = `decl-${ruta.split('/').pop()!.replace(/\.json$/, '')}`;
  registrarFuente({
    id, titulo: a.meta.titulo, categoria: a.meta.categoria ?? 'otra', nivel: a.meta.nivel,
    fuente: `${a.meta.fuente}${a.meta.corte ? `, corte ${a.meta.corte}` : ''}${a.meta.nota ? `. ${a.meta.nota}` : ''}`,
    aplica: () => true,
    lineas: ({ t, subregion }) => {
      if (!t) return subregion ? texto(a.subregiones?.[subregion]) : texto(a.departamento);
      const out = [...texto(a.territorios?.[t.id])];
      if (t.tipo === 'subdivision' && t.padreId) out.push(...texto(a.territorios?.[t.padreId], `(de ${territorioFicha(t.padreId)?.nombre ?? 'su comuna'}) `));
      out.push(...texto(a.municipios?.[t.dane], t.tipo === 'municipio' ? '' : `(del municipio de ${t.municipio}) `));
      return out;
    },
  });
}

export const DECLARATIVAS = Object.keys(ARCHIVOS).length;

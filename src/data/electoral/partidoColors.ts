/**
 * Color por partido para la capa "Resultado electoral" del mapa.
 * La mayoría de alcaldías de Antioquia 2023 las ganó una coalición o movimiento cívico local
 * (p. ej. "Bello Nos Une", "Itagüí Somos Todos"), no un partido nacional: esos casos se agrupan
 * en un solo color neutro ("Movimiento o coalición local") en vez de inventarles un color propio.
 */
export interface PartidoColor {
  color: string;
  etiqueta: string;
}

/** Color neutro para coaliciones y movimientos cívicos sin partido nacional dominante */
export const COLOR_COALICION_LOCAL: PartidoColor = { color: '#6366f1', etiqueta: 'Movimiento o coalición local' };
/** Sin dato de partido para este territorio (se pinta con el color de su agrupación territorial) */
export const COLOR_SIN_DATO = '#94a3b8';

const PARTIDOS: [RegExp, PartidoColor][] = [
  [/creemos/i, { color: '#38bdf8', etiqueta: 'Creemos' }],
  [/centro democr[aá]tico/i, { color: '#0284c7', etiqueta: 'Centro Democrático' }],
  [/\bliberal\b/i, { color: '#f43f5e', etiqueta: 'Partido Liberal' }],
  [/conservador/i, { color: '#3b82f6', etiqueta: 'Partido Conservador' }],
  [/pacto hist[oó]rico|colombia humana/i, { color: '#a855f7', etiqueta: 'Pacto Histórico' }],
  [/alianza verde|\bverde\b/i, { color: '#10b981', etiqueta: 'Alianza Verde' }],
  [/de la u\b/i, { color: '#f59e0b', etiqueta: 'Partido de la U' }],
  [/cambio radical/i, { color: '#ef4444', etiqueta: 'Cambio Radical' }],
];

/**
 * Color para un nombre de partido o coalición (tal como viene del maestro de municipios o de
 * `resultados2023Antioquia.json`). Si no coincide con un partido nacional reconocible, usa el
 * color neutro de coalición/movimiento local: NO inventa un color distinto por cada nombre.
 */
export function colorDePartido(nombre: string | null | undefined): PartidoColor {
  if (!nombre) return COLOR_COALICION_LOCAL;
  for (const [re, c] of PARTIDOS) {
    if (re.test(nombre)) return c;
  }
  return COLOR_COALICION_LOCAL;
}

/** Leyenda completa, en el orden en que se muestra */
export const LEYENDA_PARTIDOS: PartidoColor[] = [...PARTIDOS.map(([, c]) => c), COLOR_COALICION_LOCAL];

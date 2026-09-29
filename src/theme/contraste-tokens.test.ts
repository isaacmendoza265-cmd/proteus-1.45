/**
 * Contraste WCAG de los tokens --c-* de Proteus, leído del CSS real (src/index.css).
 *
 * Parsea el CSS en vez de copiar los hex: una copia seguiría en verde después de cambiar un token, que es
 * justo el fallo que este test existe para atrapar. Plantilla: skill redisenando-interfaces-en-produccion.
 *
 * Umbrales, distintos a propósito:
 *   - 4.5:1  texto normal sobre su fondo (WCAG 1.4.3 AA).
 *   - 3:1    contorno de algo accionable: un campo, un botón outline, el anillo de foco (WCAG 1.4.11).
 * Los divisores decorativos (--c-border entre filas) NO llevan umbral: exigirles 3:1 los vuelve rayas. Por eso los campos
 * tienen su propio token, --c-border-campo. Con un solo token para los dos trabajos, los campos daban 1,24-1,38:1
 * (auditoría del 29-sep-2026, docs/ESTADO_PROYECTO.md).
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const css = readFileSync(join(__dirname, '../index.css'), 'utf8');

const TEMAS: [string, string][] = [
  ['claro', ':root {'],
  ['oscuro', 'html[data-tema="oscuro"] {'],
];

/** Colores literales que el producto usa sobre tokens (el texto de los botones sólidos es blanco). */
const LITERALES: Record<string, string> = { blanco: '#FFFFFF' };

/** [primer plano, fondo, mínimo, para qué sirve] */
const PARES: [string, string, number, string][] = [
  // Texto sobre cada superficie
  ['--c-ink', '--c-bg', 4.5, 'texto principal sobre el lienzo'],
  ['--c-ink', '--c-surface', 4.5, 'texto principal sobre tarjeta'],
  ['--c-muted', '--c-surface', 4.5, 'texto secundario sobre tarjeta'],
  ['--c-muted', '--c-bg', 4.5, 'texto secundario sobre el lienzo'],
  ['--c-muted', '--c-side', 4.5, 'texto secundario en el menú lateral'],
  ['--c-muted', '--c-sunken', 4.5, 'texto secundario sobre fila hundida (hover)'],

  // El botón que se pulsa todo el día
  ['blanco', '--c-accent', 4.5, 'texto del botón primario'],
  ['--c-accent-text', '--c-surface', 4.5, 'acento como texto (enlaces, pestaña activa)'],
  ['--c-accent-text', '--c-accent-soft', 4.5, 'acento sobre su fondo suave (chip activo)'],

  // Estados: codifican significado (Oficial / Estimado / Sin información)
  ['--c-ok', '--c-surface', 4.5, 'éxito como texto'],
  ['--c-ok', '--c-ok-soft', 4.5, 'éxito sobre su fondo'],
  ['--c-warn', '--c-surface', 4.5, 'atención como texto'],
  ['--c-warn', '--c-warn-soft', 4.5, 'atención sobre su fondo'],
  ['--c-info', '--c-surface', 4.5, 'información como texto'],
  ['--c-info', '--c-info-soft', 4.5, 'información sobre su fondo'],

  // Contornos de controles: 3:1 (inputs, selects y textareas usan --c-border-campo en index.css)
  ['--c-border-campo', '--c-surface', 3, 'borde de campo sobre tarjeta'],
  ['--c-border-campo', '--c-bg', 3, 'borde de campo sobre el lienzo'],
  ['--c-border-campo', '--c-sunken', 3, 'borde de campo sobre fila hundida'],
  ['--c-border-campo', '--c-side', 3, 'borde de campo en el menú lateral'],
  ['--c-foco', '--c-bg', 3, 'anillo de foco sobre el lienzo'],
  ['--c-foco', '--c-surface', 3, 'anillo de foco sobre tarjeta'],
];

/** Extrae los `--token: #hex;` del bloque de un selector. */
function tokensDe(selector: string): Record<string, string> {
  const inicio = css.indexOf(selector);
  if (inicio === -1) throw new Error(`No se encontró el selector ${selector}`);
  const abre = css.indexOf('{', inicio);
  const cierra = css.indexOf('\n}', abre);
  const tokens: Record<string, string> = { ...LITERALES };
  for (const m of css.slice(abre, cierra).matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) tokens[m[1]] = m[2];
  return tokens;
}

function luminancia(hex: string): number {
  const canal = (v: number) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const n = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
}

export function contraste(a: string, b: string): number {
  const [x, y] = [luminancia(a), luminancia(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

describe.each(TEMAS)('contraste AA — tema %s', (_tema, selector) => {
  const tokens = tokensDe(selector);
  it.each(PARES)('%s sobre %s ≥ %s:1 (%s)', (fg, bg, minimo) => {
    const a = tokens[fg];
    const b = tokens[bg];
    expect(a, `falta el token ${fg} en ${selector}`).toBeDefined();
    expect(b, `falta el token ${bg} en ${selector}`).toBeDefined();
    const ratio = contraste(a, b);
    expect(Number(ratio.toFixed(2)), `${fg} (${a}) sobre ${bg} (${b}) da ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(minimo);
  });
});

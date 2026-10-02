/**
 * Guardia de la tubería única: toda llamada a Gemini del cliente declara qué hace (proteus.tarea) o por qué va sin
 * las tres macrofuentes (proteus.sinMacrofuentes, solo para extraer o capturar el perfil). Una llamada nueva sin
 * declararlo recibiría las macrofuentes con la tarea 'general' y el territorio activo, que puede no ser el suyo.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const RAIZ = join(__dirname, '..', '..');

function archivos(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return n === '__tests__' || n === 'data' ? [] : archivos(p);
    return /\.(ts|tsx)$/.test(n) && !/\.test\.tsx?$/.test(n) ? [p] : [];
  });
}

/** Texto del objeto de opciones de cada llamada `fn({ … })` (paréntesis balanceados) */
function llamadas(src: string, fn: string): string[] {
  const out: string[] = [];
  const re = new RegExp(`\\b${fn}\\(\\{`, 'g');
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    let i = m.index + fn.length, nivel = 0;
    for (; i < src.length; i++) {
      if (src[i] === '(') nivel++;
      else if (src[i] === ')' && --nivel === 0) break;
    }
    out.push(src.slice(m.index, i + 1));
  }
  return out;
}

describe('tubería única de IA', () => {
  const fuentes = archivos(RAIZ).filter((f) => !f.endsWith(join('services', 'geminiService.ts')));

  it('cada llamada a generateContent o callGeminiApi declara proteus (tarea o sinMacrofuentes)', () => {
    const faltan: string[] = [];
    for (const f of fuentes) {
      const src = readFileSync(f, 'utf8');
      for (const fn of ['generateContent', 'callGeminiApi']) {
        for (const c of llamadas(src, fn)) {
          if (!/proteus\s*:/.test(c)) faltan.push(`${f.replace(RAIZ, 'src')}: ${c.slice(0, 80).replace(/\s+/g, ' ')}…`);
        }
      }
    }
    expect(faltan).toEqual([]);
  });

  it('ninguna herramienta pide "votos reales" ni "miedos no declarados" a Gemini', () => {
    const malos = fuentes.filter((f) => /votos reales en urnas|MIEDOS NO DECLARADOS/i.test(readFileSync(f, 'utf8')));
    expect(malos).toEqual([]);
  });
});

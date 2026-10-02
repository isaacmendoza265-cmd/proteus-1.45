import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// AGENTS.md: nada de cédulas en el repositorio (ni en datos ni en lo que llega a Gemini)
const archivos = (d: string): string[] => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? archivos(p) : /\.(ts|json)$/.test(f) ? [p] : []; });

describe('sin cédulas en los datos', () => {
  it('ningún archivo de src/data guarda una cédula', () => {
    const con = archivos('src/data').filter((f) => /cedula\s*['"]?\s*:\s*['"][\d.]{6,}/i.test(readFileSync(f, 'utf8')));
    expect(con).toEqual([]);
  });
});

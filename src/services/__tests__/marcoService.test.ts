import { describe, expect, it } from 'vitest';
import { BLOQUES, CAPAS, bloquesDeCapa, dossiersCapa1, reglamentoVigente, reglasPiso3, textoBloque } from '../marcoService';

describe('marco metodológico (bloque 1)', () => {
  it('4 capas y los bloques ingestados con su texto', () => {
    expect(CAPAS.map((c) => c.id)).toEqual([1, 2, 3, 4]);
    expect(bloquesDeCapa(0).map((b) => b.id)).toContain('diagrama-capas');
    expect(bloquesDeCapa(1).length).toBeGreaterThanOrEqual(2);
    for (const b of BLOQUES) expect(textoBloque(b).length).toBeGreaterThan(500);
  });

  it('reglamento v1.2: 11 secciones, 17 reglas, 5 verbos, frases prohibidas e instrucción para IAs', () => {
    const r = reglamentoVigente()!;
    expect(r.bloque.version).toBe('1.2');
    expect(r.secciones.map((s) => s.numero)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(r.reglas.map((x) => x.numero)).toEqual(Array.from({ length: 17 }, (_, i) => i + 1));
    expect(r.reglas.every((x) => x.texto.length > 0)).toBe(true);
    expect(r.verbos.map((v) => v.verbo)).toEqual(['observa', 'deduce', 'hipotetiza', 'apuesta', 'no afirma']);
    expect(r.frasesProhibidas.length).toBe(10);
    expect(r.frasesProhibidas.some((f) => f.includes('habitantes habilitados'))).toBe(true);
    expect(r.frasesPermitidas.length).toBe(4);
    expect(r.instruccionFinal.length).toBeGreaterThanOrEqual(6);
    // El diagrama de capas del final del documento no se mezcla con la sección 10
    expect(r.instruccionFinal.join(' ')).not.toMatch(/Capa 1\. General/);
  });

  it('dossier de la Familia 4 (arrastre): 15 fichas completas, cierre y vacíos', () => {
    const [d] = dossiersCapa1();
    expect(d.bloque.familia).toContain('Familia 4');
    expect(d.fichas.map((f) => f.numero)).toEqual(Array.from({ length: 15 }, (_, i) => i + 1));
    for (const f of d.fichas) {
      expect(f.referencia).not.toBe('');
      expect(f.afirma).not.toBe('');
      expect(f.limite).not.toBe('');
    }
    expect(d.fichas.filter((f) => f.debil).map((f) => f.numero)).toEqual(expect.arrayContaining([6, 13, 14, 15]));
    expect(d.portables).toHaveLength(5);
    expect(d.locales).toHaveLength(3);
    expect(d.debates).toHaveLength(3);
    expect(d.vacios).toContain('gobernación');
    expect(d.advertencia).toContain('Colombia elige autoridades locales');
  });

  it('las reglas del piso 3 salen para las IAs que redactan piezas', () => {
    const t = reglasPiso3();
    expect(t).toContain('Regla 9');
    expect(t).toContain('habitantes habilitados');
    expect(t).toContain('apuesta');
  });
});

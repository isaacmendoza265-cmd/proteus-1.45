import { describe, it, expect } from 'vitest';
import { categoriaMunicipio, corteTexto, curulesConcejo, pesos, presupuestoMunicipio } from '../perfilMunicipalService';
import { MUNICIPIOS_CON_RESULTADOS } from '../electionResultsService';

const ANTIOQUIA = MUNICIPIOS_CON_RESULTADOS.filter((d) => d.startsWith('05'));
const LEY_136 = [7, 9, 11, 13, 15, 17, 19, 21];

describe('perfil institucional del municipio', () => {
  it('los 125 municipios tienen presupuesto 2025 y 2026, categoría y curules 2023', () => {
    expect(ANTIOQUIA.length).toBe(125);
    for (const d of ANTIOQUIA) {
      const p = presupuestoMunicipio(d)!;
      expect(p.anios.map((a) => a.anio), d).toEqual(['2026', '2025']);
      for (const a of p.anios) {
        expect(a.datos.definitivo).toBeGreaterThan(0);
        expect(a.datos.porHabitante).toBeGreaterThan(0);
      }
      expect(categoriaMunicipio(d)!.lista[0]).toMatchObject({ vigencia: '2026' });
      expect(LEY_136).toContain(curulesConcejo(d, '2023')!.curules);
    }
  });

  it('Medellín: especial, 21 curules y ~11,6 billones de presupuesto 2025 (CUIPO)', () => {
    expect(categoriaMunicipio('mpio-05001')!.lista[0].categoria).toBe('E');
    expect(curulesConcejo('05001', '2023')!.curules).toBe(21);
    const p2025 = presupuestoMunicipio('05001')!.anios.find((a) => a.anio === '2025')!.datos;
    expect(p2025.definitivo).toBeGreaterThan(11e12);
    expect(p2025.definitivo).toBeLessThan(12e12);
    expect(p2025.corte).toBe('20251201');
  });

  it('las curules no siguen la categoría: Sabaneta es de primera y tiene 13, como Abejorral, de sexta', () => {
    expect(categoriaMunicipio('05631')!.lista[0].categoria).toBe('1');
    expect(curulesConcejo('05631', '2023')!.curules).toBe(13);
    expect(categoriaMunicipio('05002')!.lista[0].categoria).toBe('6');
    expect(curulesConcejo('05002', '2023')!.curules).toBe(13);
  });

  it('curules 2023: la Registraduría da las repartidas a listas o una más', () => {
    for (const d of ANTIOQUIA) {
      const c = curulesConcejo(d, '2023')!;
      if (c.aListas != null) expect([0, 1], d).toContain(c.curules - c.aListas);
    }
  });

  it('vigencia 2025: 100 municipios de sexta (como el listado del IDEA)', () => {
    const sexta = ANTIOQUIA.filter((d) => categoriaMunicipio(d)!.lista.find((x) => x.vigencia === '2025')?.categoria === '6');
    expect(sexta.length).toBe(100);
  });

  it('formatos', () => {
    expect(pesos(11_638_304_044_266)).toBe('11,64 billones');
    expect(pesos(593_466_311_000)).toBe('593,5 mil millones');
    expect(pesos(4_605_955)).toBe('4,6 millones');
    expect(pesos(null)).toBe('—');
    expect(corteTexto('20260601')).toBe('jun-2026');
  });
});

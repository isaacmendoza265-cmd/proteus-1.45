import { describe, it, expect } from 'vitest';
import { estratificacionOficial } from '../estratificacionService';
import { territorioFicha } from '../territoryProfileService';
import { valorSuelo } from '../valoresSueloService';
import raw from '../../data/estratificacion/sabaneta.json';
import med from '../../data/estratificacion/medellin.json';

describe('estratificación oficial (Sabaneta)', () => {
  it('el municipio trae los 42.210 predios residenciales de la capa de la alcaldía', () => {
    const e = estratificacionOficial(territorioFicha('sabaneta')!, 'sabaneta')!;
    expect(e.total).toBe(42210);
    expect(e.estratos).toEqual([376, 9595, 16450, 15709, 75, 5]);
    expect(e.estratoModa).toBe(3);
  });

  it('barrios y veredas + sin ubicar = total del municipio; cabecera + rural = suma de barrios y veredas', () => {
    const suma = Object.values(raw.porTerritorio).reduce((s, f) => s + f.reduce((a, b) => a + b, 0), 0);
    expect(suma + raw.sinUbicar).toBe(42210);
    const u = estratificacionOficial(territorioFicha('sabaneta-div-U')!, 'sabaneta');
    const r = estratificacionOficial(territorioFicha('sabaneta-div-R')!, 'sabaneta');
    expect((u?.total ?? 0) + (r?.total ?? 0)).toBe(suma);
  });

  it('un municipio sin capa oficial no tiene bloque (nada se estima)', () => {
    expect(estratificacionOficial(territorioFicha('bello')!, 'bello')).toBeNull();
  });
});

describe('estratificación oficial (Medellín, manzanas)', () => {
  it('32.384 manzanas; las comunas y corregimientos suman el municipio', () => {
    const m = estratificacionOficial(territorioFicha('medellin')!, 'medellin')!;
    expect(m.total).toBe(32384);
    expect(m.unidad).toBe('manzanas');
    expect(m.estratos).toEqual([7004, 10909, 9329, 2848, 1438, 856]);
    const divs = Object.values(med.porDivision).reduce((s, f) => s + f.reduce((a, b) => a + b, 0), 0);
    expect(divs).toBe(32384);
  });
  it('El Poblado es de estrato 6 y Popular de estrato 1-2', () => {
    expect(estratificacionOficial(territorioFicha('comuna-14')!, 'medellin')!.estratoModa).toBe(6);
    expect([1, 2]).toContain(estratificacionOficial(territorioFicha('comuna-1')!, 'medellin')!.estratoModa);
    expect(estratificacionOficial(territorioFicha('barrio-1411')!, 'medellin')!.estratoModa).toBe(6);
  });
});

describe('valor del suelo (AMVA) en los otros 8 municipios', () => {
  it('8 municipios con dato; Medellín y Sabaneta no (usan su estratificación)', () => {
    for (const s of ['bello', 'itagui', 'envigado', 'la_estrella', 'caldas', 'copacabana', 'girardota', 'barbosa']) {
      const v = valorSuelo(territorioFicha(s)!, s);
      expect(v, s).not.toBeNull();
      expect(v!.valorM2).toBeGreaterThan(0);
    }
    expect(valorSuelo(territorioFicha('medellin')!, 'medellin')).toBeNull();
    expect(valorSuelo(territorioFicha('sabaneta')!, 'sabaneta')).toBeNull();
  });
  it('tipo por municipio: Copacabana y La Estrella comercial, los demás catastral; urbano más caro que rural', () => {
    expect(valorSuelo(territorioFicha('copacabana')!, 'copacabana')!.tipo).toBe('comercial');
    expect(valorSuelo(territorioFicha('la_estrella')!, 'la_estrella')!.tipo).toBe('comercial');
    const e = valorSuelo(territorioFicha('envigado')!, 'envigado')!;
    expect(e.tipo).toBe('catastral');
    expect(e.urbano!).toBeGreaterThan(e.rural!);
    expect(e.ranking[0].valorM2).toBeGreaterThan(e.ranking[e.ranking.length - 1].valorM2);
  });
});

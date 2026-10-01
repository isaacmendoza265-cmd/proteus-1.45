import { describe, it, expect } from 'vitest';
import { estratificacionOficial } from '../estratificacionService';
import { territorioFicha } from '../territoryProfileService';
import raw from '../../data/estratificacion/sabaneta.json';

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

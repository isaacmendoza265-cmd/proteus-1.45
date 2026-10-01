import { describe, it, expect } from 'vitest';
import { censoDeEleccion, serieCenso } from '../censoHistoricoService';
import { MUNICIPIOS_CON_RESULTADOS, cargarElecciones } from '../electionResultsService';

const ANTIOQUIA = MUNICIPIOS_CON_RESULTADOS.filter((d) => d.startsWith('05'));

describe('serie del censo electoral por municipio', () => {
  it('125 municipios con 6 jornadas; Antioquia cuadra con los totales de la fuente', () => {
    const suma = (j: string) => ANTIOQUIA.reduce((s, d) => s + (serieCenso(d).find((p) => p.jornada === j)?.censo ?? 0), 0);
    for (const d of ANTIOQUIA) expect(serieCenso(d).length, d).toBe(6);
    expect(suma('presidente-1v-2018')).toBe(4_726_629);
    expect(suma('alcaldia-2019')).toBe(4_867_105);
    expect(suma('presidente-1v-2022')).toBe(5_115_071);
    expect(suma('alcaldia-2023')).toBe(5_246_344);
    expect(suma('censo-2026')).toBe(5_448_240);
  });

  it('cada elección usa el censo de su jornada; 2015 y la 2.ª vuelta quedan sin censo', () => {
    expect(censoDeEleccion('05001', 'concejo-2019')).toBe(1_662_854);
    expect(censoDeEleccion('05001', 'senado-2022')).toBe(censoDeEleccion('05001', 'camara-2022'));
    expect(censoDeEleccion('05001', 'senado-2022')).not.toBe(censoDeEleccion('05001', 'presidente-2022-1'));
    expect(censoDeEleccion('05001', 'concejo-2015')).toBeNull();
    expect(censoDeEleccion('05001', 'presidente-2022-2')).toBeNull();
  });

  it('el censo 2023 de la fuente es el mismo que el preconteo por puesto de Proteus', async () => {
    for (const d of ANTIOQUIA) {
      const al = (await cargarElecciones(d)).find((e) => e.id === 'alcaldia-2023');
      if (al) expect(al.municipio.habilitados, d).toBe(censoDeEleccion(d, 'alcaldia-2023'));
    }
  });

  it('las elecciones mesa a mesa 2018-2022 ya traen habilitados en el total municipal (participación comparable)', async () => {
    const els = await cargarElecciones('05001');
    const al19 = els.find((e) => e.id === 'alcaldia-2019')!;
    expect(al19.municipio.habilitados).toBe(1_662_854);
    const part = al19.municipio.votantes / al19.municipio.habilitados;
    expect(part).toBeGreaterThan(0.4);
    expect(part).toBeLessThan(0.6);
    expect(els.find((e) => e.id === 'concejo-2015')!.municipio.habilitados).toBe(0);
  });
});

describe('orden de la serie', () => {
  it('cronológico: Congreso 2022 (marzo) antes que Presidencia 2022 (mayo)', () => {
    expect(serieCenso('05001').map((p) => p.jornada)).toEqual(['presidente-1v-2018', 'alcaldia-2019', 'senado-2022', 'presidente-1v-2022', 'alcaldia-2023', 'censo-2026']);
  });
});

import { describe, expect, it } from 'vitest';
import { getMunicipalitiesCensus } from '../electoralCensusService';
import {
  MUNICIPIOS_20K,
  asignarPuestosATerritorios,
  getMunicipio20k,
  getMunicipios20kDepartamento,
  loadPuestosDepartamento,
  loadPuestosMunicipio,
  tieneCoordenadas,
  MUNICIPIOS_FASE_C,
  getMunicipioConPuestos,
  getMunicipiosConPuestosDepartamento,
} from '../pollingStationsService';
import { MUNICIPAL_DIVISIONS_REGISTRY } from '../../data/geojson/municipalDivisions';

describe('Puestos de los municipios con más de 20.000 votantes', () => {
  it('incluye exactamente los municipios con censo > 20.000', () => {
    const esperados = getMunicipalitiesCensus().filter((m) => m.total > 20_000);
    expect(MUNICIPIOS_20K).toHaveLength(esperados.length);
    expect(getMunicipio20k('Abriaquí')).toBeUndefined(); // 2.029 votantes
    expect(getMunicipio20k('Bello')?.censo).toBe(getMunicipalitiesCensus('antioquia').find((m) => m.nombre === 'BELLO')!.total);
    expect(getMunicipios20kDepartamento('Antioquia')).toHaveLength(46);
  });

  it('los puestos de cada departamento cuadran con el censo municipal', async () => {
    for (const dep of new Set(MUNICIPIOS_20K.map((m) => m.departamento))) {
      const puestos = await loadPuestosDepartamento(dep);
      for (const m of MUNICIPIOS_20K.filter((x) => x.departamento === dep)) {
        const lista = puestos.filter((p) => p.codMunicipio === m.codMunicipio);
        expect(lista).toHaveLength(m.puestos);
        expect(lista.reduce((s, p) => s + p.total, 0)).toBe(m.censo);
        expect(lista.filter(tieneCoordenadas)).toHaveLength(m.puestosConCoordenadas);
      }
      for (const p of puestos.filter(tieneCoordenadas)) {
        expect(p.divipole2023.lat).toBeGreaterThan(-4.3);
        expect(p.divipole2023.lat).toBeLessThan(13.6);
      }
    }
  });

  it('Bello: los puestos ubicados caen en sus comunas y veredas', async () => {
    const puestos = await loadPuestosMunicipio(getMunicipio20k('Bello')!);
    const div = await MUNICIPAL_DIVISIONS_REGISTRY.bello.loadDivisions!();
    const a = asignarPuestosATerritorios(puestos, div.features);
    const ubicados = Object.values(a.porTerritorio).reduce((s, t) => s + t.puestos, 0);
    expect(ubicados + a.sinCoordenadas.length + a.fueraDeLaCapa.length).toBe(puestos.length);
    expect(a.fueraDeLaCapa.length).toBeLessThanOrEqual(2);
    // Divipole 2023: I.E. Navarra está en la comuna 9 (Guasimalito)
    const navarra = puestos.find((p) => p.puesto === 'I.E. NAVARRA')!;
    expect(a.territorioDePuesto[navarra.codPuesto]).toBe('bello-div-9');
  });
});

describe('Puestos de los 79 municipios de Antioquia con 20.000 votantes o menos (fase C)', () => {
  it('están los 79, cuadran con el censo municipal y la mayoría queda ubicada', async () => {
    expect(MUNICIPIOS_FASE_C).toHaveLength(79);
    expect(getMunicipiosConPuestosDepartamento('Antioquia')).toHaveLength(125);
    expect(getMunicipio20k('Abriaquí')).toBeUndefined();
    expect(getMunicipioConPuestos('Abriaquí')?.censo).toBe(getMunicipalitiesCensus('antioquia').find((m) => m.nombre === 'ABRIAQUI')!.total);
    let total = 0, ubicados = 0;
    for (const m of MUNICIPIOS_FASE_C) {
      const lista = await loadPuestosMunicipio(m);
      expect(lista).toHaveLength(m.puestos);
      expect(lista.reduce((s, p) => s + p.total, 0)).toBe(m.censo);
      total += lista.length;
      ubicados += lista.filter(tieneCoordenadas).length;
    }
    expect(ubicados / total).toBeGreaterThan(0.75);
  });

  it('Abejorral: solo cabecera y veredas; los puestos ubicados caen en ellas', async () => {
    const m = getMunicipioConPuestos('Abejorral')!;
    const puestos = await loadPuestosMunicipio(m);
    const sub = await MUNICIPAL_DIVISIONS_REGISTRY.abejorral.loadSubdivisions!();
    expect(new Set(sub.features.map((f) => f.properties.tipo))).toEqual(new Set(['Cabecera', 'Vereda']));
    const a = asignarPuestosATerritorios(puestos, sub.features);
    expect(a.fueraDeLaCapa).toEqual([]);
    const cab = puestos.find((p) => p.zona === '00')!;
    expect(a.territorioDePuesto[cab.codPuesto]).toBe('abejorral-sub-CAB');
  });
});

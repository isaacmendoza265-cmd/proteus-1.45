import { describe, it, expect } from 'vitest';
import {
  TOTAL_CENSUS,
  NATIONAL_CENSUS,
  ABROAD_CENSUS,
  CENSUS_META,
  getAllDepartmentCensus,
  getDepartmentCensus,
  getMunicipalCensus,
  getMunicipalitiesCensus,
  getMedellinComunaCensus,
  getMedellinZoneCensus,
  getMedellinCorregimientoCensus,
  MEDELLIN_CORREGIMIENTOS_SIN_ASIGNAR,
  formatCensusShort,
} from '../electoralCensusService';
import { ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA } from '../../data/antioquia125MunicipalitiesMasterData';
import { METROPOLITAN_MUNICIPALITIES_DATA, MEDELLIN_COMUNAS_DATA } from '../../data/metropolitanAndMedellinData';
import { ANTIOQUIA_125_MUNICIPIOS_GEOJSON } from '../../data/geojson/antioquia125MunicipiosGeoJson';
import { ZONE_POPULATION_WEIGHTS } from '../../data/e24/territorialData';
import { COMUNAS_INFO } from '../../data/e24/comunasData';

const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

describe('Censo electoral oficial (Registraduría, corte 30-abr-2026)', () => {
  it('cuadra con el total publicado por la Registraduría', () => {
    expect(CENSUS_META.corte).toBe('2026-04-30');
    expect(TOTAL_CENSUS.total).toBe(41_421_973);
    expect(NATIONAL_CENSUS.total + ABROAD_CENSUS.total).toBe(TOTAL_CENSUS.total);
    expect(sum(getAllDepartmentCensus().map((d) => d.total))).toBe(NATIONAL_CENSUS.total);
    expect(sum(getMunicipalitiesCensus().map((m) => m.total))).toBe(NATIONAL_CENSUS.total);
    expect(getAllDepartmentCensus()).toHaveLength(33);
    expect(getMunicipalitiesCensus()).toHaveLength(1122);
  });

  it('mujeres + hombres = total en cada municipio', () => {
    for (const m of getMunicipalitiesCensus()) expect(m.mujeres + m.hombres).toBe(m.total);
  });

  it('resuelve nombres con tildes, alias y códigos', () => {
    expect(getMunicipalCensus('Medellín')?.total).toBe(1_891_862);
    expect(getMunicipalCensus('05001')?.total).toBe(1_891_862);
    expect(getMunicipalCensus('mpio-05001')?.total).toBe(1_891_862);
    expect(getMunicipalCensus('Itagüí')?.total).toBe(267_999);
    expect(getMunicipalCensus('El Carmen de Viboral')?.nombre).toBe('CARMEN DE VIBORAL');
    expect(getMunicipalCensus('Santa Fe de Antioquia')?.dane).toBe('05042');
    expect(getMunicipalCensus('la_estrella')?.dane).toBe('05380');
    expect(getDepartmentCensus('Bogotá D.C.')?.total).toBe(6_076_599);
    expect(getDepartmentCensus('Norte de Santander')?.id).toBe('nortedesantander');
    expect(getDepartmentCensus('valle_del_cauca')?.id).toBe('valle_del_cauca');
  });

  it('no confunde municipios homónimos de distinto departamento', () => {
    expect(getMunicipalCensus('Rionegro')?.total).toBe(135_018);
    expect(getMunicipalCensus('Rionegro', 'Santander')?.total).toBe(24_677);
    expect(getMunicipalCensus('Rionegro', 'Santander')?.dane).toBeNull();
  });

  it('formatea cifras cortas en español', () => {
    expect(formatCensusShort(41_421_973)).toBe('41,4M');
    expect(formatCensusShort(267_999)).toBe('268K');
  });
});

describe('Maestro de los 125 municipios de Antioquia', () => {
  it('todos tienen el censo oficial y ninguno está duplicado', () => {
    const data = ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA;
    expect(data).toHaveLength(125);
    expect(new Set(data.map((m) => m.daneCode)).size).toBe(125);
    expect(new Set(data.map((m) => m.name)).size).toBe(125);
    for (const m of data) {
      expect(m.electoralCensusSource).toBe('oficial');
      expect(m.electoralCensus).toBe(getMunicipalCensus(m.daneCode)?.total);
    }
    expect(sum(data.map((m) => m.electoralCensus))).toBe(getDepartmentCensus('antioquia')?.total);
  });

  it('corrige los tres registros que tenían el nombre del vecino', () => {
    const by = (dane: string) => ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA.find((m) => m.daneCode === dane)!;
    expect(by('05138').name).toBe('Cañasgordas');
    expect(by('05321').name).toBe('Guadalupe');
    expect(by('05321').subregionId).toBe('norte');
    expect(by('05674').name).toBe('San Vicente Ferrer');
    for (const d of ['05138', '05321', '05674']) expect(by(d).dataWarning).toBeTruthy();
  });

  it('las subregiones tienen el número oficial de municipios', () => {
    const count: Record<string, number> = {};
    for (const m of ANTIOQUIA_125_MUNICIPALITIES_MASTER_DATA) count[m.subregionId] = (count[m.subregionId] ?? 0) + 1;
    expect(count).toEqual({
      'valle-de-aburra': 10, oriente: 23, norte: 17, occidente: 19, suroeste: 23,
      nordeste: 10, uraba: 11, 'bajo-cauca': 6, 'magdalena-medio': 6,
    });
  });

  it('el mapa de municipios usa los nombres corregidos', () => {
    const names = ANTIOQUIA_125_MUNICIPIOS_GEOJSON.features.map((f) => f.properties.name);
    expect(new Set(names).size).toBe(125);
    expect(names).toContain('Cañasgordas');
  });
});

describe('Medellín por comuna y corregimiento', () => {
  it('comunas 1-16 + zonas 90, 98 y 99 suman el total del distrito', () => {
    const comunas = sum(Array.from({ length: 16 }, (_, i) => getMedellinComunaCensus(i + 1)!.total));
    const otras = sum(['90', '98', '99'].map((z) => getMedellinZoneCensus(z)!.total));
    expect(comunas + otras).toBe(getMunicipalCensus('Medellín')!.total);
  });

  it('el reparto de la zona 99 entre corregimientos no pierde votantes', () => {
    const asignados = sum(['san-antonio', 'san-cristobal', 'santa-elena'].map((c) => getMedellinCorregimientoCensus(c)!.total));
    expect(asignados + MEDELLIN_CORREGIMIENTOS_SIN_ASIGNAR.total).toBe(getMedellinZoneCensus('99')!.total);
    expect(getMedellinCorregimientoCensus('med-correg-altavista')).toBeUndefined();
    expect(getMedellinCorregimientoCensus('med-correg-palmitas')).toBeUndefined();
  });

  it('los datos del Valle de Aburrá y de las comunas usan el censo oficial', () => {
    for (const m of Object.values(METROPOLITAN_MUNICIPALITIES_DATA)) {
      expect(m.electoralCensusSource).toBe('oficial');
      expect(m.electoralCensus).toBe(getMunicipalCensus(m.name)!.total);
    }
    for (const c of Object.values(MEDELLIN_COMUNAS_DATA)) {
      if (c.zone === 'Urbana') expect(c.electoralCensus).toBe(getMedellinComunaCensus(c.number)!.total);
    }
    expect(MEDELLIN_COMUNAS_DATA['med-correg-palmitas'].electoralCensusSource).toBe('estimado');
  });

  it('zona 99 = corregimientos y zona 90 = puesto censo; los pesos por zona suman 1', () => {
    expect(COMUNAS_INFO.find((c) => c.id === 99)?.type).toBe('rural');
    expect(COMUNAS_INFO.find((c) => c.id === 90)?.type).toBe('censo');
    expect(sum(Object.values(ZONE_POPULATION_WEIGHTS))).toBeCloseTo(1, 10);
  });
});

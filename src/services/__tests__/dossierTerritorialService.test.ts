import { describe, it, expect } from 'vitest';
import { writeFileSync } from 'node:fs';
import { dossierTerritorio, dossierComoTexto } from '../dossierTerritorialService';

const SALIDA = process.env.DOSSIER_SALIDA;
const sel = (muniId: string | null, comunaId: string | null = null, barrioId: string | null = null, subregion: string | null = null) => ({ subregion, muniId, comunaId, barrioId });

describe('dossier territorial', () => {
  it('Medellín (municipio): todas las secciones y la serie completa de elecciones', async () => {
    const d = await dossierTerritorio(sel('medellin'));
    const txt = dossierComoTexto(d);
    if (SALIDA) writeFileSync(`${SALIDA}/medellin.txt`, txt);
    const titulos = d.secciones.map((s) => s.titulo);
    for (const t of ['Identificación', 'Población', 'Condiciones económicas (2018)', 'Estratificación vigente o valor del suelo', 'Censo electoral', 'Resultados electorales (serie 2015-2026)']) expect(titulos).toContain(t);
    for (const e of ['Alcaldía 2023', 'Concejo 2019', 'Senado 2022', 'Alcaldía 2015', 'Presidencia 2018']) expect(txt).toContain(e);
    expect(txt).toMatch(/Estratificación oficial vigente/);
    expect(txt).toMatch(/Presupuesto de gastos 2025/);
    expect(txt.length).toBeLessThan(150_000);
  }, 60_000);

  it('Comuna 14 (El Poblado): resultados de sus puestos y del municipio para comparar', async () => {
    const d = await dossierTerritorio(sel('medellin', 'comuna-14'));
    const txt = dossierComoTexto(d);
    if (SALIDA) writeFileSync(`${SALIDA}/poblado.txt`, txt);
    expect(d.nivel).toBe('comuna o corregimiento');
    expect(txt).toMatch(/Alcaldía 2019 \(27-oct-2019\) en Comuna 14/);
    expect(txt).toMatch(/todo Medellín \(comparación\)/);
    expect(txt).toMatch(/estrato más común 6/);
  }, 60_000);

  it('Barrio de Envigado: valor del suelo en lugar de estratificación', async () => {
    const d = await dossierTerritorio(sel('envigado', null, 'envigado-sub-B022'));
    const txt = dossierComoTexto(d);
    if (SALIDA) writeFileSync(`${SALIDA}/envigado_b022.txt`, txt);
    expect(d.nivel).toBe('barrio o vereda');
    expect(txt).toMatch(/valor catastral del suelo/);
  }, 60_000);

  it('Subregión: un renglón por municipio', async () => {
    const d = await dossierTerritorio(sel(null, null, null, 'Valle de Aburrá'));
    expect(d.secciones[1].lineas.length).toBe(10);
  }, 60_000);
});

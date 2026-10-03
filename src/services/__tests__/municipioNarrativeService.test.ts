import { describe, expect, it } from 'vitest';
import {
  TOP30_ANTIOQUIA,
  ZONAS_MEDELLIN,
  analizarComunaMedellin,
  analizarMunicipio,
  esMunicipioDelAnalisis,
  analizarUnidad,
  analisisComoTexto,
} from '../municipioNarrativeService';
import { reglamentoVigente } from '../marcoService';

/** Frases prohibidas del reglamento vigente: fragmentos cortos y estables para buscarlos en el texto generado */
const FRAGMENTOS_PROHIBIDOS = ['habitantes habilitados', 'es de izquierda', 'es de derecha', 'demuestra desconfianza', 'va a pasar lo mismo'];

const todasLasOraciones = (a: Awaited<ReturnType<typeof analizarMunicipio>>) =>
  [...a.contextoPolitico, ...a.contextoSocial, ...a.panorama2027, ...a.areasClave, ...a.tonos];

describe('análisis narrativo por municipio', () => {
  it('30 municipios: los 10 del Valle de Aburrá están incluidos', () => {
    expect(TOP30_ANTIOQUIA).toHaveLength(30);
    for (const m of ['05001', '05088', '05360', '05266', '05631', '05129', '05380', '05212', '05308', '05079']) {
      expect(esMunicipioDelAnalisis(m)).toBe(true);
    }
    // Desde el 2-oct-2026 cubre los 125 municipios (Abriaquí estaba fuera de los 30)
    expect(esMunicipioDelAnalisis('05004')).toBe(true);
  });

  it('los 125 municipios y cualquier unidad dentro: municipio pequeño (Abriaquí) y comuna de Bello', async () => {
    const a = await analizarMunicipio('05004');
    expect(a.contextoPolitico.length).toBeGreaterThan(0);
    const b = await analizarUnidad('bello-div-4');
    expect(b.nombre).toMatch(/^Bello, /);
    expect(['comuna', 'zona', 'corregimiento']).toContain(b.ambito);
    expect(analisisComoTexto(b)).toMatch(/\[(observa|no afirma)\]/);
    for (const s of todasLasOraciones(b)) for (const f of FRAGMENTOS_PROHIBIDOS) expect(s.texto.toLowerCase()).not.toContain(f);
  });

  it('Medellín: 21 zonas (16 comunas + 5 corregimientos)', () => {
    expect(ZONAS_MEDELLIN).toHaveLength(21);
    expect(ZONAS_MEDELLIN.filter((z) => z.esCorregimiento)).toHaveLength(5);
  });

  it('Medellín (municipio): 5 secciones con oraciones y verbo válido, cifras con fuente, sin frases prohibidas', async () => {
    const a = await analizarMunicipio('05001');
    for (const seccion of [a.contextoPolitico, a.contextoSocial, a.panorama2027, a.areasClave, a.tonos]) {
      expect(seccion.length).toBeGreaterThan(0);
      for (const s of seccion) expect(['observa', 'deduce', 'hipotetiza', 'apuesta', 'no afirma']).toContain(s.verbo);
    }
    const texto = todasLasOraciones(a).map((s) => s.texto).join(' ');
    expect(texto).toMatch(/DANE|Registraduría/);
    for (const f of FRAGMENTOS_PROHIBIDOS) expect(texto.toLowerCase()).not.toContain(f);
    // El arrastre mismo-ciclo (Alcaldía-Concejo 2023) debe salir con un número real
    expect(texto).toMatch(/r = -?\d\.\d\d/);
  });

  it('Bello: análisis completo (municipio con comunas y casas políticas curadas)', async () => {
    const a = await analizarMunicipio('05088');
    expect(a.contextoPolitico.some((s) => s.texto.includes('2023'))).toBe(true);
    expect(a.contextoSocial.some((s) => /NBI/.test(s.texto))).toBe(true);
  });

  it('todos los 30 municipios generan un análisis sin lanzar error', async () => {
    for (const m of TOP30_ANTIOQUIA) {
      const a = await analizarMunicipio(m.dane);
      expect(a.nombre).toBeTruthy();
      expect(todasLasOraciones(a).length).toBeGreaterThan(3);
    }
  }, 30_000);

  it('las 21 zonas de Medellín generan un análisis propio sin lanzar error', async () => {
    for (const z of ZONAS_MEDELLIN) {
      const a = await analizarComunaMedellin(z.id);
      expect(a.nombre).toContain(z.nombre);
      expect(todasLasOraciones(a).length).toBeGreaterThan(3);
    }
  }, 30_000);

  it('una comuna de estrato bajo y una de estrato alto reciben tonos distintos', async () => {
    // Comuna 1 - Popular (estrato bajo) vs Comuna 14 - El Poblado (estrato alto)
    const popular = await analizarComunaMedellin('comuna-1');
    const poblado = await analizarComunaMedellin('comuna-14');
    const tonoPopular = popular.tonos.map((s) => s.texto).join(' ');
    const tonoPoblado = poblado.tonos.map((s) => s.texto).join(' ');
    expect(tonoPopular).not.toBe(tonoPoblado);
  });

  it('el generador respeta el reglamento vigente (mismo set de verbos)', () => {
    const r = reglamentoVigente();
    expect(r).not.toBeNull();
    expect(r!.verbos.map((v) => v.verbo)).toEqual(['observa', 'deduce', 'hipotetiza', 'apuesta', 'no afirma']);
  });
});

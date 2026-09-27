import { describe, expect, it } from 'vitest';
import {
  MEDIOS,
  SELECCION_GENERAL,
  SUBREGIONES,
  armarInstruccion,
  barriosDe,
  comunasDe,
  contextoTerritorio,
  municipiosDe,
  nombreSeleccion,
  seleccionDesdeMapa,
  tieneComunas,
} from '../contentGeneratorService';

describe('generador de contenido', () => {
  it('medios con tipos de pieza, redes y medios tradicionales', () => {
    expect(MEDIOS.every((m) => m.tipos.length > 0)).toBe(true);
    const ids = MEDIOS.map((m) => m.id);
    for (const id of ['facebook', 'instagram', 'tiktok', 'whatsapp', 'tv', 'radio', 'periodico']) expect(ids).toContain(id);
  });

  it('jerarquía de Antioquia: 9 subregiones, 125 municipios, comunas solo donde hay', () => {
    expect(SUBREGIONES).toHaveLength(9);
    expect(municipiosDe(null)).toHaveLength(125);
    expect(municipiosDe('Valle de Aburrá')).toHaveLength(10);
    expect(tieneComunas('bello')).toBe(true);
    expect(comunasDe('bello').length).toBeGreaterThan(10);
    expect(tieneComunas('rionegro')).toBe(false);
    expect(comunasDe('rionegro')).toEqual([]);
    expect(barriosDe('rionegro', null).length).toBeGreaterThan(0);
    const c6 = barriosDe('bello', 'bello-div-6');
    expect(c6.length).toBeGreaterThan(0);
    expect(c6.length).toBeLessThan(barriosDe('bello', null).length);
  });

  it('la selección del mapa rellena subregión, municipio, comuna y barrio', () => {
    expect(seleccionDesdeMapa({})).toEqual(SELECCION_GENERAL);
    expect(seleccionDesdeMapa({ featureName: 'Urabá' }).subregion).toBe('Urabá');
    expect(seleccionDesdeMapa({ muniId: 'bello' })).toEqual({ subregion: 'Valle de Aburrá', muniId: 'bello', comunaId: null, barrioId: null });
    expect(seleccionDesdeMapa({ featureId: 'bello-div-6' }).comunaId).toBe('bello-div-6');
    const b = seleccionDesdeMapa({ featureId: 'bello-sub-B001' });
    expect(b).toMatchObject({ muniId: 'bello', comunaId: 'bello-div-6', barrioId: 'bello-sub-B001' });
    expect(nombreSeleccion(b)).toContain('Bello');
    // Municipio de fuera de Antioquia: queda en General
    expect(seleccionDesdeMapa({ muniId: 'bogota' })).toEqual(SELECCION_GENERAL);
  });

  it('el contexto solo trae datos con fuente y la instrucción prohíbe inventar', async () => {
    const d = await contextoTerritorio({ subregion: 'Valle de Aburrá', muniId: 'bello', comunaId: null, barrioId: null }, 'gobernacion-2023');
    expect(d.some((l) => l.includes('DANE'))).toBe(true);
    expect(d.some((l) => l.includes('Gobernación 2023'))).toBe(true);
    const g = await contextoTerritorio(SELECCION_GENERAL, 'gobernacion-2023');
    expect(g[0]).toContain('125 municipios');
    const txt = armarInstruccion({ sel: SELECCION_GENERAL, medio: MEDIOS[0], tipo: MEDIOS[0].tipos[0], tema: '', datos: d });
    expect(txt).toContain('DATOS');
    expect(txt).toContain(MEDIOS[0].tipos[0].formato);
  });
});

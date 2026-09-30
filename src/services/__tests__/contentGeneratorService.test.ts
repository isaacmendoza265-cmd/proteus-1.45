import { describe, expect, it } from 'vitest';
import {
  MEDIOS,
  SELECCION_GENERAL,
  SISTEMA_CONTENIDO,
  SUBREGIONES,
  armarInstruccion,
  barriosDe,
  comunasDe,
  contextoTerritorio,
  limpiarMarkdown,
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

  it('las instrucciones a Gemini incluyen el piso 3 del reglamento del marco', () => {
    expect(SISTEMA_CONTENIDO).toContain('MARCO DE PROTEUS');
    expect(SISTEMA_CONTENIDO).toContain('habitantes habilitados');
  });
});

describe('limpiarMarkdown: la pieza queda en texto plano', () => {
  it('quita negritas, títulos, separadores, viñetas con asterisco, código y enlaces', () => {
    const md = [
      '## Propuesta para Bello',
      '',
      '**Seguridad** primero: *juntos* lo logramos.',
      '---',
      '* Más luz en los parques',
      '* 3.200 jóvenes con empleo',
      '',
      '',
      '',
      'Más en [nuestra página](https://ejemplo.co/plan) y `#Bello`.',
    ].join('\n');
    expect(limpiarMarkdown(md)).toBe([
      'Propuesta para Bello',
      '',
      'Seguridad primero: juntos lo logramos.',
      '• Más luz en los parques',
      '• 3.200 jóvenes con empleo',
      '',
      'Más en nuestra página (https://ejemplo.co/plan) y #Bello.',
    ].join('\n'));
  });

  it('conserva hashtags, usuarios con guion bajo, guiones de lista, cifras y multiplicaciones', () => {
    const plano = '#Antioquia #Bello2027\n- Primera idea\n- Segunda idea\nEscríbenos a @juan_perez_oficial.\nSon 2*3 = 6 barrios y el 45,3 % del censo.';
    expect(limpiarMarkdown(plano)).toBe(plano);
  });

  it('el sistema del generador pide texto plano', () => {
    expect(SISTEMA_CONTENIDO).toMatch(/sin Markdown/);
  });
});


import { describe, expect, it } from 'vitest';
import { activeTerritoryService, seleccionDeEstado } from '../activeTerritoryContextService';

describe('el mapa es la consola: la unidad elegida pasa a ser el territorio activo', () => {
  it('una comuna de Bello queda como unidad exacta (antes se convertía en una comuna de Medellín)', () => {
    const s = activeTerritoryService.setFromMapa({ subregion: 'Valle de Aburrá', muniId: 'bello', comunaId: 'bello-div-4', barrioId: null });
    expect(seleccionDeEstado(s)).toEqual({ subregion: 'Valle de Aburrá', muniId: 'bello', comunaId: 'bello-div-4', barrioId: null });
    expect(s.muniId).toBe('mpio-05088');
    expect(s.scale).toBe('comuna-barrio');
    expect(s.fullName).toMatch(/Bello/);
    // Los textos del municipio no se le atribuyen a la comuna
    expect(s.keyProblems).toEqual([]);
  });

  it('un municipio trae las cifras oficiales; una subregión, la suma del DANE', () => {
    const m = activeTerritoryService.setFromMapa({ subregion: 'Oriente', muniId: 'rionegro', comunaId: null, barrioId: null });
    expect(m.scale).toBe('municipal');
    expect(m.fuentesOficiales).toMatch(/DANE/);
    const s = activeTerritoryService.setFromMapa({ subregion: 'Oriente', muniId: null, comunaId: null, barrioId: null });
    expect(s.scale).toBe('subregional');
    expect(s.population).toBe(763096);
  });

  it('si otra herramienta cambia el lugar con sus selectores, la unidad del mapa deja de valer', () => {
    activeTerritoryService.setFromMapa({ subregion: 'Valle de Aburrá', muniId: 'bello', comunaId: null, barrioId: null });
    activeTerritoryService.setState({ scale: 'municipal', muniId: 'mpio-05360', name: 'Itagüí' });
    expect(activeTerritoryService.getState().unidad).toBeUndefined();
    expect(seleccionDeEstado(activeTerritoryService.getState()).muniId).toBe('itagui');
    // Cambiar solo textos no borra la unidad
    activeTerritoryService.setFromMapa({ subregion: 'Valle de Aburrá', muniId: 'bello', comunaId: null, barrioId: null });
    activeTerritoryService.setState({ keyProblems: ['x'] });
    expect(activeTerritoryService.getState().unidad?.muniId).toBe('bello');
  });
});

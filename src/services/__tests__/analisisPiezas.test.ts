import { describe, expect, it } from 'vitest';
import {
  adherenciaPaleta, composicion, contrasteWcag, deltaE2000, detectarCortes, hexARgb, histograma, metricasOratoria, paletaDominante, rgbALab, temperaturaK, tonalidad,
  type RGB,
} from '../analisisPiezas/medicion';
import { identidadVacia, identidadParaIA, completitudTotal, normalizarIdentidad, sincronizarLegado, identidadDesdeLegado } from '../identidad/identidad';
import { DIMENSIONES, dimensionesPara, esquemaRespuesta, libroEnTexto, instruccionAnalisis, puntajeGlobal, type RespuestaAnalisis } from '../../data/analisisPiezas/libroDeReglas';

describe('Medición de color', () => {
  it('ΔE2000 coincide con los pares de referencia de Sharma, Wu y Dalal (2005)', () => {
    expect(deltaE2000([50, 2.6772, -79.7751], [50, 0, -82.7485])).toBeCloseTo(2.0425, 3);
    expect(deltaE2000([50, -1.3802, -84.2814], [50, 0, -82.7485])).toBeCloseTo(1.0, 3);
    expect(deltaE2000([50, 2.5, 0], [73, 25, -18])).toBeCloseTo(27.1492, 3);
    expect(deltaE2000([60.2574, -34.0099, 36.2677], [60.4626, -34.1751, 39.4387])).toBeCloseTo(1.2644, 3);
  });
  it('blanco y negro: contraste WCAG 21:1 y Lab de los extremos', () => {
    expect(contrasteWcag([255, 255, 255], [0, 0, 0])).toBeCloseTo(21, 5);
    expect(rgbALab([255, 255, 255])[0]).toBeCloseTo(100, 1);
    expect(rgbALab([0, 0, 0])[0]).toBeCloseTo(0, 5);
  });
  it('temperatura: el blanco D65 ronda 6.500 K y un naranja es cálido', () => {
    expect(temperaturaK([255, 255, 255])!).toBeGreaterThan(6300);
    expect(temperaturaK([255, 255, 255])!).toBeLessThan(6700);
    expect(temperaturaK([255, 160, 60])!).toBeLessThan(4000);
  });
  it('la paleta dominante es estable y encuentra las proporciones', () => {
    const px: RGB[] = [...Array(700).fill([133, 23, 44]), ...Array(300).fill([246, 244, 239])];
    const a = paletaDominante(px, 4), b = paletaDominante(px, 4);
    expect(a).toEqual(b);
    expect(a[0].hex).toBe('#85172C');
    expect(a[0].peso).toBeCloseTo(0.7, 2);
  });
  it('la adherencia cuenta lo que está dentro de la tolerancia y señala lo ajeno', () => {
    const px: RGB[] = [...Array(600).fill([134, 25, 46]), ...Array(400).fill([30, 120, 200])];
    const ad = adherenciaPaleta(paletaDominante(px, 3), [{ hex: '#85172C', rol: 'Primario' }], 10);
    expect(ad.cobertura).toBeCloseTo(0.6, 2);
    expect(ad.ajenos[0].peso).toBeCloseTo(0.4, 2);
    expect(hexARgb('#zzz')).toBeNull();
  });
  it('tonalidad: una imagen negra es de clave baja con sombras recortadas', () => {
    const t = tonalidad(Array(100).fill([0, 0, 0]));
    expect(t.clave).toBe('baja');
    expect(t.sombrasRecortadas).toBe(1);
  });
});

describe('Composición y ritmo', () => {
  it('un objeto en el punto fuerte superior izquierdo lleva ahí el centro de masa', () => {
    const w = 90, h = 90, g = new Float32Array(w * h);
    for (let y = 25; y < 35; y++) for (let x = 25; x < 35; x++) g[y * w + x] = 255;
    const c = composicion(g, w, h);
    expect(c.distanciaPuntoFuerte).toBeLessThan(0.05);
    expect(c.balanceHorizontal).toBeLessThan(-0.9);
    expect(c.tercios[0] + c.tercios[1] + c.tercios[3] + c.tercios[4]).toBeGreaterThan(0.99);
  });
  it('los cortes aparecen donde cambia el histograma', () => {
    const rojo = histograma(Array(50).fill([250, 0, 0])), azul = histograma(Array(50).fill([0, 0, 250]));
    const r = detectarCortes([{ t: 0, h: rojo }, { t: 1, h: rojo }, { t: 2, h: azul }, { t: 3, h: azul }, { t: 4, h: rojo }]);
    expect(r.cortes).toEqual([2, 4]);
    expect(r.planos).toBe(3);
  });
  it('oratoria: palabras por minuto, muletillas y vedadas sin tildes ni mayúsculas', () => {
    const m = metricasOratoria('Eh, vamos a cambiar Antioquia, o sea, eh… cambiarla de verdad. Castrochavismo no.', 30, ['eh', 'o sea'], ['castrochavismo']);
    expect(m.palabras).toBe(13);
    expect(m.palabrasPorMinuto).toBeCloseTo(26, 5);
    expect(m.muletillas).toEqual([{ termino: 'eh', veces: 2 }, { termino: 'o sea', veces: 1 }]);
    expect(m.prohibidas[0].veces).toBe(1);
  });
});

describe('Identidad del candidato', () => {
  it('lo vacío no entra en la instrucción de la IA y nunca el correo', () => {
    const i = identidadVacia('Ana Pérez');
    const t = identidadParaIA(i);
    expect(t).toContain('Ana Pérez');
    expect(t).not.toMatch(/Paleta|Temas vedados|Frases firma|@/);
    i.voz.frasesFirma = ['Antioquia primero'];
    i.imagen.paleta[0].hex = '#85172C';
    expect(identidadParaIA(i)).toMatch(/Frases firma: Antioquia primero/);
    expect(identidadParaIA(i)).toMatch(/Primario #85172C/);
  });
  it('se normaliza una identidad vieja o incompleta y sube la completitud al llenarla', () => {
    const n = normalizarIdentidad({ ficha: { nombre: 'X' } });
    expect(n.imagen.paleta).toHaveLength(4);
    expect(completitudTotal(n)).toBeLessThan(0.2);
    n.ficha = { ...n.ficha, cargo: 'Alcaldía', circunscripcion: 'Medellín', partido: 'P', trayectoria: 't' };
    n.posicionamiento = { ...n.posicionamiento, propuestaValor: 'v', arquetipo: 'gestor', ejes: [{ tema: 'Seguridad', propuesta: '' }], publicos: ['Jóvenes'] };
    expect(completitudTotal(n)).toBeGreaterThan(0.25);
  });
  it('sincroniza los campos que leen los módulos anteriores y se recupera desde ellos', () => {
    const i = identidadVacia('Ana');
    i.ficha.partido = 'Movimiento X';
    i.posicionamiento.ejes = [{ tema: 'Seguridad', propuesta: '' }, { tema: 'Empleo', propuesta: '' }];
    const p = sincronizarLegado({ nombre: 'viejo' }, i);
    expect(p.nombre).toBe('Ana');
    expect(p.afiliacionPartidista).toBe('Movimiento X');
    expect(p.ejeTematicoComodo).toBe('Seguridad, Empleo');
    expect(identidadDesdeLegado(p).posicionamiento.ejes).toHaveLength(2);
    expect(identidadDesdeLegado({ nombre: 'B', ejeTematicoComodo: 'Agua; Vías' }).posicionamiento.ejes.map((e) => e.tema)).toEqual(['Agua', 'Vías']);
  });
});

describe('Libro de reglas', () => {
  it('cada tipo de pieza recibe solo sus dimensiones y el esquema las exige', () => {
    expect(dimensionesPara('texto').map((d) => d.id)).toEqual(['mensaje', 'cumplimiento']);
    expect(dimensionesPara('video').length).toBe(DIMENSIONES.length);
    const e = esquemaRespuesta('imagen') as { properties: { dimensiones: { items: { properties: { id: { enum: string[] } } } } }; required: string[] };
    expect(e.properties.dimensiones.items.properties.id.enum).not.toContain('oratoria');
    expect(e.required).not.toContain('transcripcion');
    expect((esquemaRespuesta('video') as { required: string[] }).required).toContain('transcripcion');
  });
  it('el comando incluye principios, anclas, el reglamento del marco y las mediciones', () => {
    const t = libroEnTexto('imagen', 'REGLA 9 DEL MARCO');
    expect(t).toMatch(/P1\. Evidencia o nada/);
    expect(t).toMatch(/\[color\] Colorimetría/);
    expect(t).not.toMatch(/\[oratoria\]/);
    expect(t).toMatch(/prevalece sobre este libro\):\nREGLA 9 DEL MARCO/);
    const ins = instruccionAnalisis({ identidad: identidadVacia('Ana'), tipo: 'imagen', propia: false, mediciones: ['Paleta dominante (medida): #85172C 70 %'] });
    expect(ins).toMatch(/P8/);
    expect(ins).toMatch(/#85172C 70 %/);
  });
  it('el puntaje global es ponderado y un 1 en cumplimiento lo deja en 2 como máximo', () => {
    const r: RespuestaAnalisis = {
      resumen: '', fortalezas: [], mejoras: [], cifrasParaVerificar: [], alertasCumplimiento: [],
      dimensiones: [
        { id: 'mensaje', criterios: [{ id: 'idea', puntaje: 5, observacion: '', lectura: '', evidencia: [], confianza: 'alta' }] },
        { id: 'cumplimiento', criterios: [{ id: 'lineas', puntaje: 5, observacion: '', lectura: '', evidencia: [], confianza: 'alta' }, { id: 'publicidad', puntaje: null, observacion: '', lectura: '', evidencia: [], confianza: 'baja' }] },
      ],
    };
    expect(puntajeGlobal(r)).toBe(5);
    r.dimensiones[1].criterios[1].puntaje = 1;
    expect(puntajeGlobal(r)).toBe(2);
  });
});

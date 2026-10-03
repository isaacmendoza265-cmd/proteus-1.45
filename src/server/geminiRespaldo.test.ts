import { describe, it, expect } from 'vitest';
import { CADENA_GEMINI, cadenaDesde, generarConRespaldo, statusGemini } from './geminiRespaldo';

const errorGoogle = (code: number, status: string) =>
  Object.assign(new Error(JSON.stringify({ error: { code, status, message: `${status} de prueba` } })), { status: code });

const sinEspera = { dormir: async () => undefined };

describe('cadena de modelos de Gemini', () => {
  it('va de 3.8 a 3.5, en orden', () => {
    expect(CADENA_GEMINI).toEqual(['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.5-flash']);
    expect(cadenaDesde('gemini-3.6-flash')).toEqual(['gemini-3.6-flash', 'gemini-3.5-flash']);
    expect(cadenaDesde(undefined)).toEqual(CADENA_GEMINI);
  });

  it('lee el código de Google del mensaje JSON del SDK', () => {
    expect(statusGemini(errorGoogle(503, 'UNAVAILABLE'))).toBe(503);
    expect(statusGemini(Object.assign(new Error('texto plano'), { status: 429 }))).toBe(429);
    expect(statusGemini(new Error('sin código'))).toBe(500);
  });

  it('si el primer modelo responde, no toca los demás', async () => {
    const llamados: string[] = [];
    const r = await generarConRespaldo(async (m) => { llamados.push(m); return 'ok'; }, sinEspera);
    expect(r).toEqual({ respuesta: 'ok', modelo: 'gemini-3.8-flash' });
    expect(llamados).toEqual(['gemini-3.8-flash']);
  });

  it('ante saturación reintenta una vez el mismo modelo y luego baja al siguiente', async () => {
    const llamados: string[] = [];
    const r = await generarConRespaldo(async (m) => {
      llamados.push(m);
      if (m === 'gemini-3.8-flash') throw errorGoogle(503, 'UNAVAILABLE');
      return `texto de ${m}`;
    }, sinEspera);
    expect(llamados).toEqual(['gemini-3.8-flash', 'gemini-3.8-flash', 'gemini-3.7-flash']);
    expect(r).toEqual({ respuesta: 'texto de gemini-3.7-flash', modelo: 'gemini-3.7-flash' });
  });

  it('un reintento que funciona se queda en el mismo modelo', async () => {
    let n = 0;
    const r = await generarConRespaldo(async (m) => { if (n++ === 0) throw errorGoogle(503, 'UNAVAILABLE'); return m; }, sinEspera);
    expect(r.modelo).toBe('gemini-3.8-flash');
  });

  it('un modelo que no existe (404) se salta sin reintentar', async () => {
    const llamados: string[] = [];
    const r = await generarConRespaldo(async (m) => {
      llamados.push(m);
      if (m === 'gemini-3.8-flash') throw errorGoogle(503, 'UNAVAILABLE');
      if (m === 'gemini-3.7-flash') throw errorGoogle(404, 'NOT_FOUND');
      return m;
    }, sinEspera);
    expect(llamados).toEqual(['gemini-3.8-flash', 'gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash']);
    expect(r.modelo).toBe('gemini-3.6-flash');
  });

  it('la cuota agotada (429) también baja al siguiente modelo', async () => {
    const r = await generarConRespaldo(async (m) => { if (m !== 'gemini-3.5-flash') throw errorGoogle(429, 'RESOURCE_EXHAUSTED'); return m; }, sinEspera);
    expect(r.modelo).toBe('gemini-3.5-flash');
  });

  it('una clave rechazada o una petición mal hecha cortan la cadena de inmediato', async () => {
    for (const [code, status] of [[403, 'PERMISSION_DENIED'], [401, 'UNAUTHENTICATED'], [400, 'INVALID_ARGUMENT']] as const) {
      const llamados: string[] = [];
      await expect(generarConRespaldo(async (m) => { llamados.push(m); throw errorGoogle(code, status); }, sinEspera))
        .rejects.toMatchObject({ status: code });
      expect(llamados).toEqual(['gemini-3.8-flash']);
    }
  });

  it('si todos fallan, entrega el último error marcado como saturación', async () => {
    const llamados: string[] = [];
    const err = await generarConRespaldo(async (m) => { llamados.push(m); throw errorGoogle(503, 'UNAVAILABLE'); }, sinEspera)
      .catch((e) => e);
    expect(llamados).toHaveLength(8);
    expect(statusGemini(err)).toBe(503);
    expect(err.modelosIntentados).toEqual(CADENA_GEMINI);
  });

  it('espera entre reintentos', async () => {
    const esperas: number[] = [];
    await generarConRespaldo(async (m) => { if (m === 'gemini-3.8-flash') throw errorGoogle(503, 'UNAVAILABLE'); return m; },
      { dormir: async (ms) => { esperas.push(ms); } });
    expect(esperas).toEqual([1500]);
  });
});

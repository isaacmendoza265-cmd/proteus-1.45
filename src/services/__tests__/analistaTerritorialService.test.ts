import { describe, it, expect, vi, afterEach } from 'vitest';
import { SISTEMA_ANALISTA, preguntarAnalista, preguntasSugeridas } from '../analistaTerritorialService';

afterEach(() => vi.unstubAllGlobals());

describe('analista territorial', () => {
  it('las reglas exigen usar solo el dossier y separar observa/deduce/hipotetiza/apuesta', () => {
    expect(SISTEMA_ANALISTA).toMatch(/única fuente es el DOSSIER/);
    expect(SISTEMA_ANALISTA).toMatch(/observa.*deduce.*hipotetiza.*apuesta/s);
    expect(SISTEMA_ANALISTA).toMatch(/donde está el puesto/);
  });

  it('manda el dossier, la conversación (máx. 20 turnos) y la pregunta; limpia el Markdown de la respuesta', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ texto: '**Sí**: la participación subió.' }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const historial = Array.from({ length: 25 }, (_, i) => ({ rol: (i % 2 ? 'analista' : 'usuario') as 'analista' | 'usuario', texto: `t${i}` }));
    const r = await preguntarAnalista('DOSSIER X', historial, '¿Subió?');
    expect(r).toBe('Sí: la participación subió.');
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe('/api/analista/preguntar');
    const body = JSON.parse(String(init.body));
    expect(body.dossier).toBe('DOSSIER X');
    expect(body.historial).toHaveLength(20);
    expect(body.pregunta).toBe('¿Subió?');
  });

  it('el error del servidor llega legible', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ error: 'Se agotó la cuota de Gemini.' }), { status: 429 })));
    await expect(preguntarAnalista('D', [], 'q')).rejects.toThrow(/cuota/);
  });

  it('preguntas sugeridas por nivel', () => {
    expect(preguntasSugeridas('barrio o vereda')[0]).toMatch(/municipio/);
    expect(preguntasSugeridas('municipio').length).toBeGreaterThan(2);
  });
});

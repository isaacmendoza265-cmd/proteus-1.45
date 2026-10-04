import { describe, it, expect, vi, afterEach } from 'vitest';
import { armarMacrofuentes, sistemaConMacrofuentes, JERARQUIA } from '../ia/macrofuentes';
import { registrarPerfil } from '../ia/registroPerfil';
import { generateContent, callGeminiApi } from '../geminiService';
import { identidadVacia } from '../identidad/identidad';
import { textoReglamentoVigente, semillaPosturas, inventarioMarco } from '../marcoService';
import { activeTerritoryService, oficializar, seleccionDeEstado, DEFAULT_ACTIVE_TERRITORY } from '../activeTerritoryContextService';

afterEach(() => vi.unstubAllGlobals());

const identidad = () => {
  const i = identidadVacia('Ana Prueba');
  i.ficha.cargo = 'Concejo';
  i.posicionamiento.posturaNacional = 'independiente';
  i.posicionamiento.posturaDepartamental = 'aliado';
  return i;
};

describe('tres macrofuentes', () => {
  it('el bloque trae datos del territorio, perfil (con postura) y el reglamento completo + la semilla de posturas', async () => {
    registrarPerfil({ nombre: 'Ana Prueba', identidad: identidad() });
    const m = await armarMacrofuentes({ tarea: 'analizar', seleccion: { subregion: null, muniId: 'envigado', comunaId: null, barrioId: null } });
    expect(m.texto.startsWith(JERARQUIA)).toBe(true);
    expect(m.texto).toContain('=== MACROFUENTE A · DATOS DEL APLICATIVO SOBRE LA UNIDAD TERRITORIAL ===');
    expect(m.texto.indexOf('MACROFUENTE C')).toBeLessThan(m.texto.indexOf('MACROFUENTE A')); // lo estable primero (caché de prefijo)
    expect(m.texto).toMatch(/UNIDAD TERRITORIAL: Envigado/);
    expect(m.texto).toContain('Ana Prueba');
    expect(m.texto).toMatch(/Postura frente al Gobierno Nacional: independiente; frente a la Gobernación de Antioquia: aliado/);
    expect(textoReglamentoVigente().length).toBeGreaterThan(20_000);
    expect(m.texto).toContain(textoReglamentoVigente().slice(0, 2000));
    expect(m.texto).toContain(semillaPosturas().slice(0, 300));
    // TODO el marco: cada bloque ingestado, la semilla y el libro de reglas (antes llegaba el 3 %)
    for (const b of inventarioMarco()) expect(m.texto, b.id).toContain(b.titulo);
    expect(m.texto).toMatch(/LIBRO DE REGLAS DE PIEZAS/);
    expect(m.caracteres.marco).toBeGreaterThan(45_000);
    // Fuentes del motor: cobertura reportada, auxiliares rotuladas
    expect(m.cobertura.some((c) => c.nivel === 'auxiliar' && c.estado === 'con datos')).toBe(true);
    expect(m.texto).toMatch(/AUXILIAR \(sin verificar\)/);
  }, 60_000);

  it('toda llamada genérica a Gemini sale con las macrofuentes antepuestas a su propia instrucción', async () => {
    registrarPerfil({ nombre: 'Ana Prueba', identidad: identidad() });
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ text: 'ok' }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    await callGeminiApi({ promptText: 'Hazme un brief', systemInstruction: 'Eres estratega.', proteus: { tarea: 'brief', seleccion: { subregion: null, muniId: 'bello', comunaId: null, barrioId: null } } });
    const body = JSON.parse(String((fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].body));
    const sis = String(body.config.systemInstruction);
    expect(sis).toContain('JERARQUÍA DE FUENTES');
    expect(sis).toMatch(/UNIDAD TERRITORIAL: Bello/);
    expect(sis).toContain('Ana Prueba');
    expect(sis).toMatch(/INSTRUCCIONES DE ESTA HERRAMIENTA[\s\S]*Eres estratega\./);
    expect(body.proteus).toBeUndefined(); // la opción local no viaja al servidor
  }, 60_000);

  it('opt-out explícito (herramientas técnicas): sin macrofuentes', async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ text: 'ok' }), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    await generateContent({ contents: 'x', config: { systemInstruction: 'solo esto' }, proteus: { sinMacrofuentes: true } });
    const body = JSON.parse(String((fetchMock.mock.calls[0] as unknown as [string, RequestInit])[1].body));
    expect(body.config.systemInstruction).toBe('solo esto');
  });

  it('sin perfil: no supone postura ni ejes', async () => {
    registrarPerfil(null);
    const m = await armarMacrofuentes({ tarea: 'redactar', incluirDatos: false });
    expect(m.texto).toMatch(/Sin perfil del candidato cargado/);
    // La instrucción de la herramienta, luego el estándar de calidad y al final la tarea (Gemini sigue mejor lo último)
    expect(sistemaConMacrofuentes(m, 'X', 'analizar')).toMatch(/INSTRUCCIONES DE ESTA HERRAMIENTA[^\n]*\nX\n\nESTÁNDAR DE CALIDAD[\s\S]*Conclusión primero[\s\S]*TAREA: ANALIZAR[\s\S]*Lo esencial/);
  });
});

describe('territorio activo con cifras oficiales', () => {
  it('Medellín por defecto: DANE 2026 (no 2.650.000) y concejo del escrutinio 2023', () => {
    const s = oficializar(DEFAULT_ACTIVE_TERRITORY);
    expect(s.population).toBe(2_526_795);
    expect(s.population).not.toBe(2_650_000);
    expect(s.councilSummary).toMatch(/CREEMOS \(7\)/i);
    expect(s.auxiliares).toContain('keyProblems');
    expect(s.fuentesOficiales).toMatch(/DANE/);
  });
  it('la unidad del dossier sale del territorio activo', () => {
    expect(seleccionDeEstado(oficializar(DEFAULT_ACTIVE_TERRITORY))).toMatchObject({ muniId: 'medellin', comunaId: null });
    expect(seleccionDeEstado({ ...DEFAULT_ACTIVE_TERRITORY, scale: 'comuna-barrio', comunaId: 'comuna-14', barrioId: 'all-comuna' })).toMatchObject({ muniId: 'medellin', comunaId: 'comuna-14' });
    expect(activeTerritoryService.getState().population).not.toBe(2_650_000);
  });
});

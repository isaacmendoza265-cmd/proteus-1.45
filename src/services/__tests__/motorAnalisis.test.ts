import { describe, it, expect } from 'vitest';
import { writeFileSync } from 'node:fs';
import { dossierTerritorio, dossierComoTexto } from '../dossierTerritorialService';
import { fuentesRegistradas, registrarFuente, versionFuentes } from '../ia/motor/registro';
import { validarDeclarativo } from '../ia/motor/fuentesDeclarativas';
import { _fijarNoticias } from '../noticias/noticiasCliente';
import { coincideNombre, historialCandidato } from '../ia/motor/historialCandidato';
import { armarMacrofuentes, seleccionDeDane } from '../ia/macrofuentes';
import { registrarPerfil } from '../ia/registroPerfil';
import { identidadVacia } from '../identidad/identidad';

const sel = (muniId: string | null, comunaId: string | null = null, barrioId: string | null = null) => ({ subregion: null, muniId, comunaId, barrioId });

describe('motor de análisis: fuentes por unidad', () => {
  it('El Poblado: fuentes oficiales y auxiliares (proyección del Distrito, IPM ECV, extorsión), rotuladas y con fuente', async () => {
    const d = await dossierTerritorio(sel('medellin', 'comuna-14'));
    const txt = dossierComoTexto(d);
    // Población: la proyección oficial del Distrito (2018-2030, igual al DANE); la serie vieja solo aporta viviendas
    expect(txt).toMatch(/## Proyección de población del Distrito de Medellín 2018-2030/);
    expect(txt).toMatch(/Población proyectada 2026: 116\.445 .*2030: 118\.381/);
    expect(txt).toMatch(/AUXILIAR \(sin verificar\) · Proyección de viviendas del Distrito/);
    expect(txt).not.toMatch(/2030\.\./);
    expect(txt).toMatch(/IPM 2010/);
    expect(txt).toMatch(/extorsión a hogares/);
    const cob = Object.fromEntries(d.cobertura.map((c) => [c.id, c.estado]));
    expect(cob['aux-medellin-proyeccion']).toBe('con datos');
    expect(cob['decl-medellin-proyecciones-distrito']).toBe('con datos');
    expect(cob['aux-rionegro-ecv-2020']).toBe('no aplica');
    expect(txt).not.toMatch(/cedula|\d{1,3}\.\d{3}\.\d{3}\.\d{3}/i);
  }, 60_000);

  it('un barrio recibe las series de su comuna, rotuladas como de su comuna', async () => {
    const txt = dossierComoTexto(await dossierTerritorio(sel('medellin', null, 'barrio-1411')));
    expect(txt).toMatch(/de su comuna: El Poblado/);
  }, 60_000);

  it('el bloque electoral "por comuna" del observatorio (sin fuente) no entra', async () => {
    const txt = dossierComoTexto(await dossierTerritorio(sel('medellin', 'comuna-1')));
    expect(txt).toMatch(/Perfil de la comuna del observatorio/);
    expect(txt).not.toMatch(/electoral\.locales2023/);
  }, 60_000);

  it('una fuente nueva registrada entra sola en el siguiente dossier (motor dinámico)', async () => {
    const v = versionFuentes();
    registrarFuente({ id: 'prueba-nueva', titulo: 'Fuente de prueba', categoria: 'otra', nivel: 'oficial', fuente: 'prueba', aplica: ({ t }) => t?.dane === '05088', lineas: () => ['Dato nuevo de prueba 123.'] });
    expect(versionFuentes()).toBe(v + 1);
    const d = await dossierTerritorio(sel('bello'));
    expect(dossierComoTexto(d)).toContain('Dato nuevo de prueba 123.');
    expect(fuentesRegistradas().some((f) => f.id === 'prueba-nueva')).toBe(true);
  }, 60_000);

  it('seguridad: delitos de la Policía y alertas de la Defensoría por municipio, subregión y Antioquia, rotulados oficiales', async () => {
    const caceres = dossierComoTexto(await dossierTerritorio(sel('caceres')));
    expect(caceres).toMatch(/## Seguridad: delitos registrados por la Policía \(2018-2026\)/);
    expect(caceres).toMatch(/Tasa de homicidio 2025: [\d,]+ por 100\.000 habitantes, por encima de la de Antioquia/);
    expect(caceres).toMatch(/## Alertas tempranas de la Defensoría del Pueblo/);
    expect(caceres).toMatch(/Alerta 045-20 \(estructural, 31-ago-2020\).*Grupos que nombra la Defensoría/);
    expect(caceres).toMatch(/alertas generales, de alcance nacional o departamental/);
    // una comuna recibe lo del municipio, rotulado, y la advertencia de no atribuirlo al barrio
    const poblado = dossierComoTexto(await dossierTerritorio(sel('medellin', 'comuna-14')));
    expect(poblado).toMatch(/no se atribuye a un barrio/);
    expect(poblado).toMatch(/\(del municipio de Medell[ií]n\) Homicidios: 2018 625/);
    const ant = dossierComoTexto(await dossierTerritorio({ subregion: null, muniId: null, comunaId: null, barrioId: null }));
    expect(ant).toMatch(/Municipios con más homicidios en 2025: Medellín 333/);
  }, 60_000);

  it('noticias guardadas: entran como fuente auxiliar; el barrio recibe las de su comuna y las del municipio, rotuladas', async () => {
    const reg = (unidadId: string, nombre: string, titular: string) => ({
      unidadId, nombre, buscadoEn: '2026-10-02T15:00:00Z', descartadas: 0, consultas: [], sugerenciasHtml: null, modelo: 'm',
      noticias: [{ fecha: '2026-09-30', medio: 'El Colombiano', titular, tema: 'seguridad' as const, resumen: 'Resumen.', enlace: 'https://medio.co/1' }],
    });
    _fijarNoticias('comuna-14', reg('comuna-14', 'Comuna 14 - El Poblado', 'Operativo en la comuna 14'));
    _fijarNoticias('muni:05001', reg('muni:05001', 'Medellín', 'Concejo aprueba presupuesto'));
    const d = await dossierTerritorio(sel('medellin', 'comuna-14', 'barrio-1411'));
    const txt = dossierComoTexto(d);
    expect(txt).toMatch(/AUXILIAR \(sin verificar\) · Noticias recientes de la unidad/);
    expect(txt).toMatch(/\(de Comuna 14 - El Poblado\) 30-sep-2026 · El Colombiano · \[seguridad\] Operativo en la comuna 14/);
    expect(txt).toMatch(/\(del municipio de Medellín\) 30-sep-2026 · El Colombiano · \[seguridad\] Concejo aprueba presupuesto/);
    expect(d.cobertura.find((c) => c.id === 'aux-noticias-google')?.estado).toBe('con datos');
    // y llega a las macrofuentes de cualquier herramienta
    const m = await armarMacrofuentes({ tarea: 'analizar', seleccion: sel('medellin', 'comuna-14') });
    expect(JSON.stringify(m)).toMatch(/Operativo en la comuna 14/);
    _fijarNoticias('comuna-14', null);
    _fijarNoticias('muni:05001', null);
    expect(dossierComoTexto(await dossierTerritorio(sel('medellin', 'comuna-14')))).not.toMatch(/Operativo en la comuna 14/);
  }, 60_000);

  it('estudios académicos (auxiliar, con cita y página) y Fiscalía (denuncias) entran al dossier', async () => {
    const carmen = dossierComoTexto(await dossierTerritorio(seleccionDeDane('05148')));
    expect(carmen).toMatch(/AUXILIAR \(sin verificar\) · Estudios sobre violencia y gobernanza criminal/);
    expect(carmen).toMatch(/Indepaz.*p\. 16: El Carmen de Viboral registró 2 masacres en 2025/);
    const ant = dossierComoTexto(await dossierTerritorio({ subregion: null, muniId: null, comunaId: null, barrioId: null }));
    expect(ant).toMatch(/p\. 8: Antioquia fue en 2025 el segundo departamento con más asesinatos de líderes/);
    expect(ant).toMatch(/## Fiscalía: denuncias por delitos electorales/);
    expect(ant).toMatch(/Delitos electorales denunciados .*2023 [\d.]+/);
    const med = dossierComoTexto(await dossierTerritorio(sel('medellin')));
    expect(med).toMatch(/entre 150 y 300 "combos"/);
    expect(med).toMatch(/Víctimas defensoras de DD\. HH\. o líderes/);
  }, 60_000);

  it('contrato de los JSON declarativos de src/data/motor/', () => {
    expect(validarDeclarativo({ meta: { titulo: 'X', fuente: 'Y', nivel: 'oficial', categoria: 'seguridad' }, municipios: { '05001': { lineas: ['a'] } } })).toEqual([]);
    expect(validarDeclarativo({ meta: { titulo: '', fuente: '', nivel: 'otro' as never, categoria: 'otra' } })).toHaveLength(4);
  });
});

describe('motor de análisis: historial del candidato', () => {
  it('cruce por nombre (todas las palabras, sin tildes)', () => {
    expect(coincideNombre('Federico Gutiérrez Zuluaga', 'FEDERICO ANDRES GUTIERREZ ZULUAGA')).toBe(true);
    expect(coincideNombre('Federico Gutiérrez', 'Juan Gutiérrez')).toBe(false);
    expect(coincideNombre('Federico', 'Federico Gutiérrez')).toBe(false); // un solo nombre no basta
  });
  it('encuentra al candidato en las elecciones cargadas del municipio', async () => {
    const h = await historialCandidato('Federico Gutiérrez Zuluaga', sel('medellin'), '05001');
    expect(h[0]).toMatch(/Alcaldía 2023: Federico Andres Gutierrez Zuluaga/i);
    expect(h[0]).toMatch(/Alcaldía 2015/);
    expect(h[0]).not.toMatch(/Gobernación 2023/); // la lista de 2023 es común: sin votos en esa elección no cuenta
  }, 60_000);
  it('el bloque del perfil trae naturaleza e historial', async () => {
    const i = identidadVacia('Federico Gutiérrez Zuluaga'); i.ficha.nombre = 'Federico Gutiérrez Zuluaga'; i.ficha.cargo = 'Alcaldía';
    registrarPerfil({ nombre: 'Federico Gutiérrez Zuluaga', identidad: i });
    const m = await armarMacrofuentes({ tarea: 'analizar', seleccion: sel('medellin', 'comuna-14') });
    expect(m.texto).toMatch(/MACROFUENTE B · PERFIL E HISTORIAL[\s\S]*Historial electoral en los datos del aplicativo/);
    if (process.env.MOTOR_SALIDA) writeFileSync(process.env.MOTOR_SALIDA, m.texto);
    // Tamaño real de lo que recibe Gemini para una comuna (para vigilar el costo)
    expect(m.texto.length).toBeLessThan(250_000);
    console.log('macrofuentes El Poblado:', m.caracteres, 'total', m.texto.length);
  }, 60_000);
});

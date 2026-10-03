import { describe, expect, it } from 'vitest';
import { extraerNoticias, lineasNoticias, objetivoNoticias, promptNoticias, type RespuestaBusqueda } from '../noticias/noticias';

const respuesta: RespuestaBusqueda = {
  text: [
    'NOTICIA | 2026-09-28 | El Colombiano | Capturan a dos personas por extorsión en Cáceres | seguridad | La Policía capturó a dos presuntos extorsionistas en la cabecera.',
    'NOTICIA | 2026-09-30 | Teleantioquia | Inicia la pavimentación de la vía Cáceres - Guarumo | Obras e infraestructura | La Gobernación anunció el inicio de la obra.',
    'NOTICIA | 2026-09-15 | Medio X | Titular que Gemini no respaldó con Google | política | Sin fuente.',
    'Texto suelto que no es noticia',
  ].join('\n'),
  candidates: [{
    groundingMetadata: {
      webSearchQueries: ['noticias Cáceres Antioquia'],
      groundingChunks: [
        { web: { uri: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AAA', title: 'elcolombiano.com' } },
        { web: { uri: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/BBB', title: 'teleantioquia.co' } },
      ],
      groundingSupports: [
        { segment: { text: 'Capturan a dos personas por extorsión en Cáceres' }, groundingChunkIndices: [0] },
        { segment: { text: 'Inicia la pavimentación de la vía Cáceres - Guarumo' }, groundingChunkIndices: [1] },
      ],
      searchEntryPoint: { renderedContent: '<div class="container">sugerencias</div>' },
    },
  }],
};

describe('noticias por unidad territorial', () => {
  it('solo conserva noticias con enlace de Google y cuenta las descartadas', () => {
    const r = extraerNoticias(respuesta);
    expect(r.noticias.map((n) => n.medio)).toEqual(['Teleantioquia', 'El Colombiano']); // más reciente primero
    expect(r.noticias[0].tema).toBe('obras e infraestructura');
    expect(r.noticias[1].enlace).toMatch(/grounding-api-redirect\/AAA/);
    expect(r.descartadas).toBe(1);
    expect(r.consultas).toEqual(['noticias Cáceres Antioquia']);
    expect(r.sugerenciasHtml).toMatch(/sugerencias/);
  });

  it('sin metadatos de búsqueda no hay noticias (nunca enlaces escritos por Gemini)', () => {
    const r = extraerNoticias({ text: respuesta.text, candidates: [{}] });
    expect(r.noticias).toEqual([]);
    expect(r.descartadas).toBe(3);
  });

  it('el barrio hereda la búsqueda de su comuna; el municipio y la subregión tienen la suya', () => {
    const comuna = { tipo: 'division', id: 'comuna-14', nombre: 'Comuna 14 - El Poblado', dane: '05001', municipio: 'Medellín' };
    const barrio = { tipo: 'subdivision', id: 'barrio-1411', nombre: 'Manila', dane: '05001', municipio: 'Medellín', padreId: 'comuna-14' };
    expect(objetivoNoticias(comuna, null).consulta).toBe('comuna 14 (El Poblado) de Medellín, Antioquia, Colombia');
    const b = objetivoNoticias(barrio, null, comuna);
    expect(b.unidadId).toBe('comuna-14');
    expect(b.heredadaDe).toBe('Manila');
    expect(objetivoNoticias({ tipo: 'municipio', id: 'caceres', nombre: 'Cáceres', dane: '05120', municipio: 'Cáceres' }, null).unidadId).toBe('muni:05120');
    expect(objetivoNoticias(null, 'Oriente').unidadId).toBe('sub:Oriente');
    expect(objetivoNoticias(null, null).unidadId).toBe('antioquia');
  });

  it('el prompt pide el formato, la ventana y no nombrar particulares', () => {
    const p = promptNoticias('municipio de Cáceres, Antioquia', '2026-10-02');
    expect(p).toMatch(/NOTICIA \| AAAA-MM-DD/);
    expect(p).toMatch(/60 días/);
    expect(p).toMatch(/personas particulares/);
  });

  it('las líneas del motor llevan fecha de búsqueda, medio, tema y enlace', () => {
    const r = extraerNoticias(respuesta);
    const l = lineasNoticias({ unidadId: 'muni:05120', nombre: 'Cáceres', buscadoEn: '2026-10-02T15:00:00Z', modelo: 'm', ...r });
    expect(l[0]).toMatch(/Búsqueda de Google del 2-oct-2026 sobre Cáceres: 2 noticia/);
    expect(l[1]).toMatch(/30-sep-2026 · Teleantioquia · \[obras e infraestructura\]/);
    // la hora de búsqueda se lee en Colombia: 01:30 UTC del 3-oct es el 2-oct en Bogotá
    expect(lineasNoticias({ unidadId: 'x', nombre: 'X', buscadoEn: '2026-10-03T01:30:00Z', modelo: 'm', ...r })[0]).toMatch(/del 2-oct-2026/);
  });
});

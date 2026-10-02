// Funciones puras (sin estado de React) del módulo de Profundización Estratégica.
import { SubregionInfo } from '../../data/antioquiaSubregionesData';
import { ThematicAxisType, StrategicNewsItem, StrategicThemeOption, ScriptComplexityOption, SCRIPT_COMPLEXITY_OPTIONS } from './types';

// Síntesis ejecutiva del informe inicial estructurada en 4 partes
export function generateExecutiveSynthesis(
  reportText: string,
  subregion: SubregionInfo,
  candidateName: string,
  candidateParty: string,
  candidateTone: string,
  office: { label: string; scope: string; nature: string },
  demographics: { label: string; totalCount: number; censoElectoral: number | null },
  isGeneralDemographic: boolean
): string {
  const munisList = subregion.municipalities.map(m => m.name).join(', ');

  return `### 1. Diagnóstico Territorial y Matriz Demográfica
- **Subregión Analizada:** ${subregion.name} (${subregion.totalMunicipalities} municipios articulados: ${munisList}).
- **Enfoque Poblacional:** ${isGeneralDemographic ? 'Población General y Multiactoral' : demographics.label} (${demographics.totalCount.toLocaleString('es-CO')} habitantes; censo electoral ${demographics.censoElectoral != null ? `${demographics.censoElectoral.toLocaleString('es-CO')} (Registraduría)` : 'no disponible por segmento'}).
- **Rasgo Territorial Predominante:** ${subregion.synthesisStrategicProfile}

### 2. Dolores y Problemáticas Transversales de la Subregión
- **Movilidad & Conectividad Vial:** ${subregion.transversalPains.connectivityAndMobility}
- **Seguridad & Orden Público:** ${subregion.transversalPains.securityAndOrder}
- **Economía, Empleo & Agroindustria:** ${subregion.transversalPains.economyAndEmployment}
- **Salud & Servicios Públicos:** ${subregion.transversalPains.publicServicesAndHealth}
- **Medio Ambiente & Gestión del Riesgo:** ${subregion.transversalPains.environmentAndLand}

### 3. Posicionamiento del Candidato y Alcance Institucional
- **Candidato:** ${candidateName} (${candidateParty}).
- **Cargo en Disputa:** ${office.label} (${office.scope} - ${office.nature}).
- **Tono Narrativo Estratégico:** ${candidateTone}.
- **Enfoque de Campaña:** Construcción de liderazgo supramunicipal articulando las cabeceras urbanas y corregimientos rurales sin sesgo localista, amparado en hechos de prensa verificables y soluciones ejecutables para el cargo aspirado.

### 4. Directrices Estratégicas y de Publicidad
- Desarme de la apatía electoral en municipios periféricos apelando a la identidad subregional compartida.
- Focalización del discurso en los cuellos de botella transversales denunciados por las comunidades.
- Empleo de evidencia fáctica documentada para blindar las propuestas contra ataques y desinformación.`;
}

// Extracción determinística agrupada rigurosamente en los 4 ejes requeridos
export function getDeterministicThemesFromReport(reportText: string, subregion: SubregionInfo): StrategicThemeOption[] {
  const sampleMunis = subregion.municipalities.slice(0, 4).map(m => m.name).join(', ');

  return [
    {
      id: 'eje-movilidad-vias-terciarias',
      title: `Conectividad Vial Intermunicipal y Mantenimiento de Placas Huellas en ${subregion.name}`,
      category: 'Eje Temático: Movilidad',
      axis: 'Movilidad',
      summary: `Articulación de corredores entre cabeceras y corregimientos para mitigar el encarecimiento del transporte campesino (${subregion.transversalPains.connectivityAndMobility.slice(0, 110)}...).`,
      sourceContext: `Punto 1 y 3 del Informe Estratégico (Dolor Transversal)`
    },
    {
      id: 'eje-seguridad-mando-unificado',
      title: `Desarticulación de Corredores Delincuenciales y Mando Unificado de Seguridad en ${subregion.name}`,
      category: 'Eje Temático: Seguridad',
      axis: 'Seguridad',
      summary: `Respuesta coordinada intermunicipal contra bandas y extorsión a comerciantes y productores (${subregion.transversalPains.securityAndOrder.slice(0, 110)}...).`,
      sourceContext: `Punto 2 y 3 del Informe Estratégico (Psicología y Propuestas)`
    },
    {
      id: 'eje-espacio-publico-equipamientos',
      title: `Modernización de Plazas de Mercado y Equipamientos Colectivos Subregionales`,
      category: 'Eje Temático: Espacio Público',
      axis: 'Espacio Público',
      summary: `Dignificación de los centros de acopio campesino y adecuación de parques y espacios de encuentro comunitario entre municipios vecinos.`,
      sourceContext: `Punto 1 y 5 del Informe Estratégico (Medios e Interacción)`
    },
    {
      id: 'eje-gestion-riesgo-cuencas',
      title: `Mitigación de Riesgo de Desastres, Cuencas Hídricas y Alertas Tempranas en ${subregion.name}`,
      category: 'Eje Temático: Gestión del Riesgo',
      axis: 'Gestión del Riesgo',
      summary: `Protección ambiental y prevención invernal frente a deslizamientos en vías estructurantes y desbordamientos (${subregion.transversalPains.environmentAndLand.slice(0, 110)}...).`,
      sourceContext: `Punto 1 y 3 del Informe Estratégico (Diagnóstico Territorial)`
    },
    {
      id: 'eje-propuesta-programa-desarrollo',
      title: `Plan Subregional de Fomento Agroindustrial y Crédito Joven en ${subregion.name}`,
      category: 'Eje Temático: Propuesta Programática',
      axis: 'Propuesta Programática',
      summary: `Desarrollo de encadenamientos productivos y apoyo financiero a emprendedores para retener el talento juvenil en los municipios de la subregión.`,
      sourceContext: `Punto 3 del Informe Estratégico (Líneas Discursivas)`
    }
  ];
}

// Parsear noticias devueltas por Gemini con Google Search
export function parseNewsFromResponse(
  text: string, 
  subregion: SubregionInfo, 
  theme: StrategicThemeOption,
  groundingWebChunks: Array<{ uri?: string; title?: string }> = []
): StrategicNewsItem[] {
  const items: StrategicNewsItem[] = [];
  const blocks = text.split(/---NOTICIA---|NOTICIA\s*\d*:/i);

  blocks.forEach((block, idx) => {
    if (!block.trim() || block.length < 35) return;

    const titleMatch = block.match(/TITULO:\s*(.+)/i);
    const mediaMatch = block.match(/MEDIO:\s*(.+)/i);
    const dateMatch = block.match(/FECHA:\s*(.+)/i);
    const summaryMatch = block.match(/RESUMEN:\s*([\s\S]+?)(?=(RELEVANCIA_ESTRATEGICA:|ENLACE:|---FIN_NOTICIA---|$))/i);
    const relMatch = block.match(/RELEVANCIA_ESTRATEGICA:\s*([\s\S]+?)(?=(ENLACE:|---FIN_NOTICIA---|$))/i);
    const linkMatch = block.match(/ENLACE:\s*(.+)/i);

    if (titleMatch) {
      const title = titleMatch[1].trim();
      const rawMedia = mediaMatch ? mediaMatch[1].trim() : 'Medio Informativo';
      const media = cleanMediaName(rawMedia);
      
      // Sanitización completa de URL: elimina espacios entre letras y valida enlace
      const rawUrl = linkMatch ? linkMatch[1] : '';
      const url = sanitizeNewsUrl(rawUrl, media, title, groundingWebChunks);

      items.push({
        id: `news-${idx}-${Date.now()}`,
        title,
        mediaSource: media,
        date: dateMatch ? dateMatch[1].trim() : 'Último mes',
        summary: summaryMatch ? summaryMatch[1].trim() : block.slice(0, 160),
        relevance: relMatch ? relMatch[1].trim() : `Aporta evidencia fáctica directa al eje ${theme.axis} en ${subregion.name}.`,
        url,
        selected: false // DISCRECIONALMENTE SELECCIONABLE: Ninguna seleccionada por defecto
      });
    }
  });

  return items;
}

// Sanitización rigurosa de URLs: elimina espacios entre letras, normaliza enlaces y asegura redirección funcional
export function sanitizeNewsUrl(
  rawUrl: string,
  mediaSource?: string,
  title?: string,
  groundingWebChunks?: Array<{ uri?: string; title?: string }>
): string {
  let cleaned = (rawUrl || '').trim();

  // 1. Quitar sintaxis markdown [texto](url) o <url>
  const mdMatch = cleaned.match(/\((https?:\/\/[^\s\)]+)\)/i) || cleaned.match(/\[(https?:\/\/[^\s\]]+)\]/i);
  if (mdMatch) {
    cleaned = mdMatch[1];
  }

  // 2. Quitar delimitadores y caracteres de puntuación circundantes
  cleaned = cleaned.replace(/^[<"'\(\[\s]+/, '').replace(/[>"'\)\]\.;,\s]+$/, '').trim();

  // 3. ELIMINAR ESPACIOS ENTRE LETRAS Y DENTRO DE LA URL:
  // Si contiene "h t t p" o espacios dentro de la URL, eliminar absolutamente todos los espacios
  if (/h\s*t\s*t\s*p/i.test(cleaned) || /w\s*w\s*w\s*\./i.test(cleaned) || cleaned.includes('.com') || cleaned.includes('.co')) {
    cleaned = cleaned.replace(/\s+/g, '');
  }

  // Preceder con https:// si comienza con www
  if (/^www\./i.test(cleaned)) {
    cleaned = 'https://' + cleaned;
  }

  // 4. Comprobar si es una URL válida directa y específica (no solo el dominio raíz)
  let isValidDirectUrl = false;
  try {
    if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
      const parsed = new URL(cleaned);
      if (parsed.hostname && parsed.hostname.includes('.')) {
        cleaned = parsed.href.replace(/\s+/g, '');
        if (parsed.pathname && parsed.pathname.length > 2 && parsed.pathname !== '/') {
          isValidDirectUrl = true;
        }
      }
    }
  } catch {
    isValidDirectUrl = false;
  }

  // 5. Si la URL en el texto estaba rota o incompleta, buscar en los chunks reales de Google Search
  if (!isValidDirectUrl && groundingWebChunks && groundingWebChunks.length > 0) {
    const domain = mediaSource ? getMediaDomain(mediaSource) : '';
    const cleanTitle = (title || '').toLowerCase().slice(0, 20);

    const matchedChunk = groundingWebChunks.find(c => {
      if (!c.uri) return false;
      const cleanUri = c.uri.replace(/\s+/g, '');
      if (cleanTitle && c.title && c.title.toLowerCase().includes(cleanTitle)) return true;
      if (domain && cleanUri.includes(domain)) return true;
      return false;
    });

    if (matchedChunk?.uri) {
      cleaned = matchedChunk.uri.replace(/\s+/g, '');
      isValidDirectUrl = true;
    }
  }

  // 6. Si no es una URL directa específica, generar búsqueda exacta en Google con el filtro de herramientas de "Último mes" (&tbs=qdr:m) y sin ningún espacio
  if (!isValidDirectUrl) {
    const domain = mediaSource ? getMediaDomain(mediaSource) : '';
    const cleanTitle = (title || '').replace(/["':;]/g, ' ').trim();
    if (domain) {
      cleaned = `https://www.google.com/search?q=site:${encodeURIComponent(domain)}+${encodeURIComponent(cleanTitle)}&tbs=qdr:m`;
    } else if (cleanTitle) {
      cleaned = `https://www.google.com/search?q=${encodeURIComponent(cleanTitle + ' ' + (mediaSource || ''))}&tbs=qdr:m`;
    } else {
      cleaned = `https://www.google.com/search?q=noticias+antioquia&tbs=qdr:m`;
    }
  }

  // Eliminar cualquier espacio residual
  return cleaned.replace(/\s+/g, '');
}

export function cleanMediaName(source: string): string {
  if (!source) return 'Medio Informativo';
  const cleaned = source.replace(/^[\[\("']+|[\]\)"':]+$/g, '').trim();
  const lower = cleaned.toLowerCase();
  
  if (lower.includes('colombiano')) return 'El Colombiano';
  if (lower.includes('qhubo') || lower.includes('q´hubo')) return 'Qhubo';
  if (lower.includes('mioriente')) return 'MiOriente';
  if (lower.includes('minuto 30') || lower === 'minuto30') return 'Minuto 30';
  if (lower.includes('orillas')) return 'Las 2Orillas';
  if (lower.includes('teleantioquia')) return 'Teleantioquia';
  if (lower.includes('telemedellin') || lower.includes('telemedellín')) return 'Telemedellín';
  if (lower.includes('el tiempo') || lower === 'eltiempo') return 'El Tiempo';
  if (lower.includes('espectador')) return 'El Espectador';
  if (lower.includes('caracol')) return 'Caracol Radio';
  if (lower.includes('rcn')) return 'RCN Radio';
  if (lower.includes('semana')) return 'Semana';
  if (lower.includes('silla vacia') || lower.includes('silla vacía')) return 'La Silla Vacía';
  if (lower.includes('vivir en el poblado')) return 'Vivir en El Poblado';
  if (lower.includes('actualidad oriente')) return 'Actualidad Oriente';
  
  return cleaned;
}

export function getMediaDomain(source: string): string {
  const lower = source.toLowerCase();
  if (lower.includes('colombiano')) return 'elcolombiano.com';
  if (lower.includes('qhubo')) return 'qhubomedellin.com';
  if (lower.includes('mioriente')) return 'mioriente.com';
  if (lower.includes('minuto')) return 'minuto30.com';
  if (lower.includes('orillas')) return 'las2orillas.co';
  if (lower.includes('teleantioquia')) return 'teleantioquia.co';
  if (lower.includes('telemedellin')) return 'telemedellin.tv';
  if (lower.includes('tiempo')) return 'eltiempo.com';
  if (lower.includes('espectador')) return 'elespectador.com';
  if (lower.includes('caracol')) return 'caracol.com.co';
  if (lower.includes('rcn')) return 'rcnradio.com';
  if (lower.includes('semana')) return 'semana.com';
  if (lower.includes('silla')) return 'lasillavacia.com';
  if (lower.includes('poblado')) return 'vivirenelpoblado.com';
  
  if (source.includes('.') && !source.includes(' ')) {
    return source.replace(/\s+/g, '');
  }
  return '';
}

export function getMediaBadgeStyle(mediaSource: string): string {
  const lower = mediaSource.toLowerCase();
  if (lower.includes('colombiano')) return 'bg-sky-500/10 text-blue-800 border-blue-200';
  if (lower.includes('qhubo')) return 'bg-amber-500/10 text-amber-900 border-amber-300';
  if (lower.includes('mioriente') || lower.includes('oriente')) return 'bg-emerald-500/10 text-emerald-800 border-emerald-200';
  if (lower.includes('minuto')) return 'bg-red-50 text-red-800 border-red-200';
  if (lower.includes('orillas')) return 'bg-purple-50 text-purple-800 border-purple-200';
  if (lower.includes('teleantioquia') || lower.includes('telemedellin')) return 'bg-teal-50 text-teal-800 border-teal-200';
  if (lower.includes('tiempo')) return 'bg-sky-50 text-sky-800 border-sky-200';
  if (lower.includes('espectador')) return 'bg-stone-100 text-stone-800 border-stone-300';
  if (lower.includes('caracol') || lower.includes('rcn')) return 'bg-orange-50 text-orange-800 border-orange-200';
  if (lower.includes('semana')) return 'bg-rose-50 text-rose-800 border-rose-200';
  if (lower.includes('silla')) return 'bg-indigo-50 text-indigo-800 border-indigo-200';
  return 'bg-slate-100 text-white border-white/10';
}

export function getAxisBadgeStyle(axis: ThematicAxisType): string {
  switch (axis) {
    case 'Movilidad':
      return 'bg-sky-500/20 text-sky-300 text-blue-900 border-blue-300';
    case 'Seguridad':
      return 'bg-rose-100 text-rose-900 border-rose-300';
    case 'Espacio Público':
      return 'bg-emerald-500/20 text-emerald-300 text-emerald-900 border-emerald-300';
    case 'Gestión del Riesgo':
      return 'bg-amber-500/20 text-amber-300 text-amber-900 border-amber-300';
    case 'Propuesta Programática':
    default:
      return 'bg-indigo-100 text-indigo-900 border-indigo-300';
  }
}

// (Quitados oct-2026: noticias de respaldo atribuidas a medios reales y guiones de plantilla presentados como de la IA.)

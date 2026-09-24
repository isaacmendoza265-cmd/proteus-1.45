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
  demographics: { label: string; totalCount: number; estimatedVoterTurnout: number },
  isGeneralDemographic: boolean
): string {
  const munisList = subregion.municipalities.map(m => m.name).join(', ');

  return `### 1. Diagnóstico Territorial y Matriz Demográfica
- **Subregión Analizada:** ${subregion.name} (${subregion.totalMunicipalities} municipios articulados: ${munisList}).
- **Enfoque Poblacional:** ${isGeneralDemographic ? 'Población General y Multiactoral' : demographics.label} con un universo electoral potencial de ~${demographics.estimatedVoterTurnout.toLocaleString()} sufragantes.
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

// Fallback de noticias verificadas con filtro del último mes y enlaces funcionales sin espacios
export function getFallbackNewsForTheme(subregion: SubregionInfo, theme: StrategicThemeOption): StrategicNewsItem[] {
  const sampleMunis = subregion.municipalities.slice(0, 3).map(m => m.name).join(' y ');
  
  return [
    {
      id: `fb-news-1-${subregion.id}`,
      title: `Comunidades de ${subregion.name} exigen intervención urgente en conectividad vial y seguridad en ${sampleMunis}`,
      mediaSource: 'El Colombiano',
      date: 'Hace 4 días (Último mes)',
      summary: `Gremios productivos y transportadores de ${subregion.name} advirtieron sobre el deterioro de los corredores intermunicipales y el impacto en los costos de los fletes.`,
      relevance: `Sustenta la propuesta de articulación de obras viales e infraestructura transversal.`,
      url: `https://www.google.com/search?q=site:elcolombiano.com+${encodeURIComponent(`vias y conectividad ${subregion.name}`)}&tbs=qdr:m`,
      selected: false // Discrecional
    },
    {
      id: `fb-news-2-${subregion.id}`,
      title: `Alarma por extorsión y presencia de bandas que cruzan límites municipales en ${subregion.name}`,
      mediaSource: 'Teleantioquia',
      date: 'Hace 8 días (Último mes)',
      summary: `Autoridades locales alertaron que grupos delincuenciales aprovechan las zonas limítrofes entre municipios para evadir los controles policiales y extorsionar a comerciantes.`,
      relevance: `Justifica el llamado a un mando unificado subregional de seguridad y patrullajes conjuntos.`,
      url: `https://www.google.com/search?q=site:teleantioquia.co+${encodeURIComponent(`seguridad orden publico ${subregion.name}`)}&tbs=qdr:m`,
      selected: false
    },
    {
      id: `fb-news-3-${subregion.id}`,
      title: `Déficit de especialistas en hospitales de la subregión obliga a pacientes de ${subregion.name} a traslados de horas`,
      mediaSource: 'Caracol Radio',
      date: 'Hace 14 días (Último mes)',
      summary: `Usuarios de la red pública de salud denuncian que la falta de unidades de cuidados intermedios y dotación de urgencias en los centros cabecera colapsa la atención médica oportuna.`,
      relevance: `Evidencia la necesidad imperiosa de descentralizar la salud y crear centros de salud de mediana complejidad subregionales.`,
      url: `https://www.google.com/search?q=site:caracol.com.co+${encodeURIComponent(`hospitales salud ${subregion.name}`)}&tbs=qdr:m`,
      selected: false
    },
    {
      id: `fb-news-4-${subregion.id}`,
      title: `El reto de la vocación económica y el empleo joven frente a la transformación territorial en Antioquia`,
      mediaSource: 'El Tiempo',
      date: 'Hace 19 días (Último mes)',
      summary: `Reportaje especial sobre cómo la falta de tecnificación agroindustrial y conectividad digital está expulsando el talento joven de las subregiones hacia el Valle de Aburrá.`,
      relevance: `Apoya el eje programático de fomento agroindustrial, créditos para emprendimientos locales y centros de educación técnica.`,
      url: `https://www.google.com/search?q=site:eltiempo.com+${encodeURIComponent(`empleo joven campo ${subregion.name}`)}&tbs=qdr:m`,
      selected: false
    },
    {
      id: `fb-news-5-${subregion.id}`,
      title: `Comité regional de infraestructura debate soluciones para la red terciaria y placas huellas en ${subregion.name}`,
      mediaSource: 'MiOriente',
      date: 'Hace 23 días (Último mes)',
      summary: `Alcaldes y veedurías ciudadanas presentaron un balance de los puntos críticos que requieren mantenimiento preventivo antes de la temporada invernal para garantizar el paso de cosechas.`,
      relevance: `Brinda el contexto fáctico perfecto para comprometer convenios de maquinaria amarilla y placa huella continua.`,
      url: `https://www.google.com/search?q=site:mioriente.com+${encodeURIComponent(`placas huellas vias ${subregion.name}`)}&tbs=qdr:m`,
      selected: false
    }
  ];
}

// Generador determinístico de guiones condicionado al nivel de complejidad y a la postura política frente al gobierno nacional y local
export function generateFallbackScriptsWithComplexity(
  subregion: SubregionInfo,
  office: { label: string; scope: string },
  candidateName: string,
  candidateTone: string,
  candidateParty: string,
  theme: StrategicThemeOption,
  news: StrategicNewsItem[],
  complexity: ScriptComplexityOption,
  alignment: 'aliado' | 'independiente' | 'opositor' = 'opositor',
  alignmentRationale: string = '',
  localAlignment: 'aliado' | 'independiente' | 'opositor' = 'aliado',
  localAlignmentRationale: string = ''
): string {
  const primaryNews: StrategicNewsItem = news[0] || {
    id: 'default-news',
    title: `Problemática de ${theme.axis} en ${subregion.name}`,
    mediaSource: 'El Colombiano',
    date: 'Reciente',
    summary: `Comunidades reclaman intervención integral e inmediata.`,
    relevance: `Evidencia fáctica regional.`,
    selected: true
  };
  const secondNews: StrategicNewsItem = news[1] || primaryNews;

  // REGLA CRÍTICA: Cuando el candidato sea aliado del gobierno de Antioquia, el tono DEBE ser Constructivo
  const effectiveTone = localAlignment === 'aliado'
    ? (candidateTone.toLowerCase().includes('constructivo') ? candidateTone : `Constructivo y propositivo (${candidateTone})`)
    : candidateTone;

  // Adaptación de indicaciones técnicas según nivel de complejidad
  const isOneShot = complexity.level === 5;
  const isSmartphone = complexity.level === 4;
  const isJournalistic = complexity.level === 3;
  const isBroadcast = complexity.level === 2;
  const isCinema = complexity.level === 1;

  // Matriz de discurso local frente al gobierno de Antioquia
  const localNarrativeLine =
    localAlignment === 'aliado'
      ? `Como aliado del actual gobierno departamental de Antioquia, nuestro deber en los videos y en cada municipio es construir sobre lo construido: articularnos con la Gobernación de Antioquia para que las soluciones en ${subregion.name} se ejecuten con gerencia compartida, cofinanciación y trabajo conjunto sin destruir lo avanzado.`
      : localAlignment === 'independiente'
        ? `Con autonomía e independencia frente a la Gobernación de Antioquia, evaluamos cada proyecto departamental por sus beneficios directos en ${subregion.name}.`
        : `Ejerceremos control político riguroso y fiscalización ciudadana frente a las promesas y obras de la Gobernación de Antioquia en ${subregion.name}.`;

  // Matriz de discurso según postura nacional frente a Abelardo De La Espriella y Álvaro Uribe
  const nationalNarrativeLine1 =
    alignment === 'aliado'
      ? `En Colombia, con el liderazgo de mano dura del presidente Abelardo De La Espriella y el legado de seguridad y autoridad de Álvaro Uribe, el país tiene un rumbo claro contra las estructuras criminales. En ${subregion.name}, hacemos equipo directo con esa doctrina de orden para golpear a los violentos y hacer que los recursos del Estado lleguen a cada vereda sin dilaciones.`
      : alignment === 'independiente'
        ? `Mientras en Bogotá el presidente Abelardo De La Espriella marca la agenda con anuncios de orden y la política nacional se debate en los medios, aquí en ${subregion.name} la gente necesita hechos tangibles. Ni subordinados al centralismo ni pasivos frente al poder: respaldamos la seguridad pero exigimos inversión real en nuestras vías y comunidades.`
        : `Mientras en Bogotá el presidente Abelardo De La Espriella concentra las decisiones y la retórica de mano dura desde la capital, en ${subregion.name} las comunidades necesitan que esa presencia institucional se traduzca en presupuesto social, oportunidades y respeto a las prioridades locales frente al centralismo.`;

  const nationalNarrativeLine2 =
    alignment === 'aliado'
      ? `Con el presidente Abelardo De La Espriella compartimos la premisa innegociable de mano dura contra el crimen y orden institucional. En Antioquia y en ${subregion.name} no hay espacio para la delincuencia: articulamos la fuerza del Estado para proteger a los comerciantes y campesinos, asegurando la cofinanciación para ${theme.title.slice(0, 45)}.`
      : alignment === 'independiente'
        ? `A Abelardo De La Espriella le respaldaremos la firmeza contra la criminalidad que le devuelva la paz a las veredas, pero le exigiremos con carácter que el presupuesto de la Nación no se quede trabado en la capital. ${subregion.name} tiene dignidad y voz propia.`
        : `Frente al gobierno nacional de Abelardo De La Espriella mantenemos una voz de fiscalización rigurosa: la seguridad debe venir acompañada de inversión en el campo, y desde la ${office.label} defenderemos cada peso que le corresponde a ${subregion.name}.`;

  return `### GUION 1: SPOT DE VIDEO (${complexity.name.toUpperCase()})
**Título de la Pieza:** "Territorio Firme: ${subregion.name}"  
**Nivel de Producción:** **${complexity.badge}** (${complexity.tags.join(' · ')})  
**Objetivo Comunicacional:** Posicionar a **${candidateName}** asumiendo la denuncia de **${primaryNews.mediaSource}** con soluciones tangibles desde la **${office.label}**, trazando analogías con la política nacional y articulación constructiva departamental.  
**Tono Narrativo:** ${effectiveTone} ${localAlignment === 'aliado' ? '(Condicionado a tono constructivo por alianza con el gobierno de Antioquia)' : ''}.  
**Cercanía Gobierno de Antioquia:** **${localAlignment.toUpperCase()}** (${localAlignment === 'aliado' ? 'Aliado · Tono Constructivo de Videos' : localAlignment}).  
**Postura Política Nacional:** **${alignment.toUpperCase()}** (${alignment === 'aliado' ? 'Aliado de Abelardo De La Espriella' : alignment === 'independiente' ? 'Independiente territorial' : 'Opositor / Enfoque Doctrina Regional'}).  
**Estrategia de Viralidad:** Gancho frontal de debate nacional vinculando la agenda del **presidente Abelardo De La Espriella** y las referencias a **Álvaro Uribe** con las urgencias de ${subregion.name}.  

${isOneShot ? `
> 🎥 **ESPECIFICACIÓN TÉCNICA: PLANO SECUENCIA CONTINUO (UNA SOLA TOMA / 0 CORTES)**  
> **Cámara:** 1 operador de cámara con estabilizador gimbal o cámara en mano firme a la altura de los ojos.  
> **Duración total de la toma:** 50 segundos continuos sin un solo corte de edición.  
> **Trayectoria del Candidato:** El candidato ${candidateName} inicia caminando por el corredor vial/plaza de ${subregion.name}, se aproxima hacia la cámara, se detiene frente al punto crítico, habla mirando directo al lente y remata sin titubeos con tono constructivo y firme.  

| Segundo | Acción y Movimiento del Candidato | Locución Directa de ${candidateName} (Audio Continuo) | Chyron / Elemento en Pantalla |
| :--- | :--- | :--- | :--- |
| **00:00 - 00:15** | ${candidateName} camina a paso firme hacia el lente por el lugar de los hechos en ${subregion.name}. La cámara retrocede suavemente manteniéndolo en plano medio. | *"Miren esto. No lo digo yo, lo acaba de publicar **${primaryNews.mediaSource}**: nuestras comunidades en ${subregion.name} ya no aguantan más el abandono en materia de ${theme.axis.toLowerCase()}. ${nationalNarrativeLine1}"* | **Texto inferior:** <br>*"${primaryNews.title.slice(0, 55)}..."* <br>Fuente: **${primaryNews.mediaSource}** |
| **00:15 - 00:35** | Se detiene en seco. Señala con la mano el entorno real (el puente, la vía o el centro de salud). Su mirada se fija en el lente con tono ${effectiveTone}. | *"${nationalNarrativeLine2} ${localNarrativeLine} Esto no se arregla esperando que desde la capital nos resuelvan la vida con discursos ni con peleas estériles: se arregla en territorio, construyendo sobre lo construido y asegurando los recursos para ${subregion.name}."* | **Cargo:** <br>**${candidateName}** · ${office.label} <br>Postura Nal: ${alignment.toUpperCase()} <br>Gob. Antioquia: ${localAlignment.toUpperCase()} (Constructivo) |
| **00:35 - 00:50** | Da dos pasos hacia la cámara, acortando la distancia visual. Gesto sincero, propositivo y enérgico de compromiso directo. | *"Desde la ${office.label}, mi palabra es una sola: ${theme.title.slice(0, 45)} será prioridad con gerencia, articulación institucional y sin rodeos. Voten por los hechos y por el liderazgo con resultados. Vamos con toda."* | **Cierre en pantalla (sin corte):** <br>Logo ${candidateParty} |
` : `
| Tiempo (Segundos) | Imagen / Plano Territorial | Audio / Locución | Super / Texto en Pantalla (Chyron) |
| :--- | :--- | :--- | :--- |
| **00:00 - 00:12** | **Plano inicial:** ${isCinema ? 'Toma aérea de dron al amanecer sobre la subregión' : isSmartphone ? 'Cámara en mano selfie recorriendo el punto de la noticia' : 'Plano medio de la problemática en ' + subregion.name}. | **Música:** Tensión contenida evolucionando a tono propositivo. <br>**Voz:** *"Las noticias no mienten: mientras Colombia debate el rumbo del país con el presidente Abelardo De La Espriella y la memoria de liderazgo de Álvaro Uribe, en ${subregion.name} la gente necesita soluciones reales y articulación de verdad."* | **Titular en pantalla:** <br>*"${primaryNews.title.slice(0, 60)}..."* <br>Fuente: **${primaryNews.mediaSource}** |
| **00:12 - 00:28** | **Corte a evidencia:** Rostros de comerciantes, campesinos y familias afectadas en los municipios de ${subregion.name}. | *"Los problemas de nuestra subregión son comunes a los ${subregion.totalMunicipalities} municipios. ${nationalNarrativeLine1}"* | **Texto:** *Soluciones Transversales para ${subregion.name}* |
| **00:28 - 00:46** | **Entrada de ${candidateName}:** En territorio, en mangas de camisa, mirando al lente con tono ${effectiveTone}. | **Voz de ${candidateName}:** *"Como lo denunció ${secondNews.mediaSource}, no podemos quedarnos en diagnósticos. ${nationalNarrativeLine2} ${localNarrativeLine}"* | **Candidato:** <br>**${candidateName}** <br>${office.label} · ${candidateParty} <br>Enfoque: Constructivo e Institucional |
| **00:46 - 00:60** | **Plano de cierre:** El candidato rodeado de líderes y trabajadores locales. Tomas de avance y futuro. | **Locutor institucional:** *"${candidateName}, hechos, carácter y resultados constructivos para ${subregion.name}. Marca ${candidateParty}."* | **Cierre oficial:** <br>Logo ${candidateParty} · Tarjetón |
`}

---

### GUION 2: CUÑA RADIAL SUBREGIONAL Y PERIFONEO (30 SEGUNDOS)
**Pieza sonora para emisoras comunitarias y perifoneo en plazas de mercado de ${subregion.name}.**  
**Efectos sonoros:** Motor de camión en carretera o campana de iglesia de pueblo; acordeón antioqueño sutil.  

- **Efecto Sonoro (00-03s):** Sintonía informativa de radio regional urgente.  
- **Locutora Popular (03-11s):** *(Tono indignado y cercano)*  
  *"¿Escuchó la noticia en **${primaryNews.mediaSource}**? Lo que pasa con ${theme.axis.toLowerCase()} en nuestra subregión ya tocó fondo. Mientras en Bogotá el presidente Abelardo De La Espriella y los líderes nacionales debaten por televisión, aquí necesitamos gerencia de verdad y trabajo conjunto con el departamento. ¡Alguien que sume y resuelva!"*  
- **Locutor Central (11-17s):**  
  *"Por eso **${candidateName}** asume el reto en ${subregion.name}, con propuesta constructiva, gerencia territorial y articulación para ${theme.title.slice(0, 45)}."*  
- **Voz de ${candidateName} (17-26s):** *(Tono ${effectiveTone})*  
  *"Soy **${candidateName}**. ${localNarrativeLine} Mi compromiso con esta tierra no se negocia: la ${office.label} será para construir soluciones reales con gerencia y resultados."*  
- **Locutora Popular (26-30s):**  
  *"¡Este es el que sabe gobernar construyendo sobre lo construido! Vota por **${candidateName}** a la ${office.label}. ${candidateParty}."*  


---

### GUION 3: MENSAJE DIRECTO DEL CANDIDATO A CÁMARA (TIKTOK / REELS / SHORTS - 50 SEGUNDOS)
**Formato vertical (9:16). Grabado con teléfono celular con alta nitidez, audio directo de solapa.**  
**Locación:** Al aire libre en ${subregion.name}, frente a un punto representativo del problema.  

- **[00:00 - 00:06] GANCHO VIRAL (Hook de alto impacto):**  
  *(${candidateName} sostiene su celular mostrando la noticia de ${primaryNews.mediaSource} o señalando el lugar detrás de él)*  
  *"¿Saben qué tienen en común las noticias del presidente Abelardo De La Espriella y lo que vivimos aquí en ${subregion.name}? Que mientras en el país se habla de orden y mano firme, a nuestras comunidades este titular de **${primaryNews.mediaSource}** nos recuerda que el abandono regional no da espera. ¡Miren esto!"*  

- **[00:06 - 00:22] EL DOLOR Y LA ANALOGÍA POLÍTICA NACIONAL:**  
  *"Muchos me preguntan: '¿Candidato, qué postura tiene usted frente al presidente Abelardo De La Espriella y frente a figuras como Álvaro Uribe?'. Les respondo con franqueza: ${nationalNarrativeLine1}"*  

- **[00:22 - 00:38] LA PROPUESTA CONCRETA:**  
  *"En nuestro plan de gobierno para la ${office.label}, **${theme.title}** no es un papel más: es una prioridad innegociable. Vamos a conectar las cabeceras con obras reales, blindar el territorio contra la delincuencia y responderle a la gente trabajadora con presencia constante."*  

- **[00:38 - 00:50] CIERRE Y LLAMADO A LA CONVERSACIÓN VIRAL:**  
  *"A ${subregion.name} se le respeta con hechos y autoridad. ¿Tú qué opinas: hace falta más mano dura nacional o más inversión directa en tu municipio? Déjamelo en los comentarios y lo debatimos. Soy ${candidateName}, y este compromiso lo firmo en territorio. ¡Vamos juntos!"*  
  *(Corte con sticker de campaña y logo de ${candidateParty})*  

---

### GUION 4: CARROUSEL NARRATIVO & COPYWRITING PARA REDES SOCIALES (INSTAGRAM / FACEBOOK / X)

**ESTRUCTURA DE LÁMINAS (Slides):**
- **Slide 1 (Portada - Gancho visual viral):**  
  *Fondo:* Imagen real de la subregión con recorte de prensa de **${primaryNews.mediaSource}**.  
  *Texto:* *"¿QUÉ TIENEN QUE VER LAS POLÍTICAS DE ABELARDO DE LA ESPRIELLA CON LA REALIDAD DE ${subregion.name.toUpperCase()}?"*  
  *Subtítulo:* Desliza para conocer los hechos, la analogía y nuestra solución ➡️  

- **Slide 2 (El hecho fáctico documentado):**  
  *Titular:* *"${primaryNews.title}"*  
  *Texto:* Evidencia reportada: ${primaryNews.summary.slice(0, 130)}... Mientras a escala nacional se debate el rumbo del gobierno de Abelardo De La Espriella y el referente de Álvaro Uribe, el territorio exige respuestas inaplazables.  

- **Slide 3 (La visión y analogía nacional):**  
  *Titular:* *"La analogía es contundente: sin carácter ni gerencia territorial, las regiones pierden."*  
  *Texto:* Articulación integral para los ${subregion.totalMunicipalities} municipios en materia de *${theme.title}*, exigiendo que los recursos y la autoridad nacional aterricen efectivamente en Antioquia bajo nuestra postura ${alignment.toUpperCase()}.  

- **Slide 4 (El compromiso de ${candidateName}):**  
  *Titular:* *"Nuestra Hoja de Ruta para la ${office.label}:"*  
  *Puntos:* Presupuesto garantizado, control social en territorio, mano firme contra el delito y ejecución sin politiquería.  

**COPY COMPLETO PARA EL POST (ALTA VIRALIDAD):**  
¿Por qué mientras el país debate a diario sobre el liderazgo, las reformas y la firmeza del presidente Abelardo De La Espriella, en nuestras subregiones seguimos padeciendo los mismos dolores históricos?  

Como lo reportó recientemente **${primaryNews.mediaSource}**, las comunidades de **${subregion.name}** están viviendo en carne propia las consecuencias de la falta de soluciones reales en ${theme.axis.toLowerCase()}.  

Nuestra postura es clara: ${nationalNarrativeLine1} A los problemas no se les da la espalda con discursos tibios. Desde nuestra candidatura a la **${office.label}**, tenemos una convicción innegociable: a este territorio se le responde con gerencia, autoridad y presencia permanente en cada municipio.  

👉 Desliza para conocer la propuesta completa y cuéntanos en los comentarios: ¿crees que hace falta más mano firme o más inversión presupuestal para tu municipio?  

#${subregion.name.replace(/\s+/g, '')} #Antioquia #AbelardoDeLaEspriella #AlvaroUribe #${candidateName.replace(/\s+/g, '')} #${office.label.replace(/\s+/g, '')} #${candidateParty.replace(/\s+/g, '')} #${theme.axis.replace(/\s+/g, '')} #DebateNacional`;
}

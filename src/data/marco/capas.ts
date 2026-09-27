/**
 * Las 4 capas del marco teórico de Proteus (diagrama de organización por capas de complejidad,
 * src/data/marco/capa0/diagrama-capas.md). Dos marcos × dos ámbitos:
 *   Interpretación y análisis de datos → Capa 1 (general) y Capa 2 (local)
 *   Oportunidades publicitarias        → Capa 3 (general) y Capa 4 (local)
 * Los bloques de cada capa se ingestan con scripts/ingestar_marco.mjs (ver docs/marco/README.md).
 */
export type IdCapa = 1 | 2 | 3 | 4;

export interface CapaMarco {
  id: IdCapa;
  nombre: string;
  marco: 'interpretacion' | 'publicidad';
  ambito: 'General' | 'Local';
  descripcion: string;
  recopilan: string;
  aplican: string;
}

export const NOMBRE_MARCO: Record<CapaMarco['marco'], string> = {
  interpretacion: 'Marco para interpretación y análisis de datos',
  publicidad: 'Marco para oportunidades publicitarias, retórica y creación de publicidad segmentada',
};

export const CAPAS: CapaMarco[] = [
  {
    id: 1, nombre: 'Capa 1 · General', marco: 'interpretacion', ambito: 'General',
    descripcion: 'Literatura especializada (ciencia política aplicada, estadística, psicología cultural y conductual) que, leída de forma holística, permite comprender qué significan los datos que ya están en Proteus.',
    recopilan: 'Perplexity y Grok', aplican: 'Claude y Gemini',
  },
  {
    id: 2, nombre: 'Capa 2 · Local', marco: 'interpretacion', ambito: 'Local',
    descripcion: 'Información contextual y local que complementa la Capa 1: análisis de prensa y análisis especializados de municipios o subregiones; más adelante, entrevistas y encuestas.',
    recopilan: 'Por definir', aplican: 'Por definir',
  },
  {
    id: 3, nombre: 'Capa 3 · General', marco: 'publicidad', ambito: 'General',
    descripcion: 'Literatura especializada para usar los datos y los análisis de las capas 1 y 2 con el fin de maximizar el efecto de la publicidad en el votante: colorimetría, retórica, economía conductual, identidad de marca, redes sociales, psicología del enganche. Se expresa como un manual de normas que una IA aplicará al pie de la letra.',
    recopilan: 'Por definir', aplican: 'Por definir',
  },
  {
    id: 4, nombre: 'Capa 4 · Local', marco: 'publicidad', ambito: 'Local',
    descripcion: 'Aplicación de las normas de la Capa 3 a un contexto concreto, según las características de los sujetos a quienes irán dirigidas las piezas.',
    recopilan: 'Por definir', aplican: 'Por definir',
  },
];

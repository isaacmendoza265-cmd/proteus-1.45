// Tipos y opciones del módulo de Profundización Estratégica de Subregiones.

export type ThematicAxisType = 
  | 'Movilidad'
  | 'Seguridad'
  | 'Espacio Público'
  | 'Gestión del Riesgo'
  | 'Propuesta Programática';

export interface StrategicNewsItem {
  id: string;
  title: string;
  mediaSource: 'El Colombiano' | 'Qhubo' | 'MiOriente' | 'Minuto 30' | 'Las 2Orillas' | string;
  date: string;
  summary: string;
  url?: string;
  relevance: string;
  selected: boolean;
}

export interface StrategicThemeOption {
  id: string;
  title: string;
  category: string;
  axis: ThematicAxisType;
  summary: string;
  sourceContext: string;
}

export interface ScriptComplexityOption {
  level: number;
  id: string;
  name: string;
  shortName: string;
  badge: string;
  description: string;
  tags: string[];
}

export const SCRIPT_COMPLEXITY_OPTIONS: ScriptComplexityOption[] = [
  {
    level: 1,
    id: 'nivel-1-cinematografico',
    name: 'Nivel 1: Producción Cinematográfica / Muy Elaborado',
    shortName: '1. Cinematográfico',
    badge: 'Máxima Elaboración',
    description: 'Múltiples locaciones en la subregión, tomas aéreas de dron, iluminación cinematográfica, banda sonora orquestal, montaje multicámara y postproducción de gráficos 3D.',
    tags: ['Multi-locación', 'Tomas con Dron', 'Postproducción 3D', 'Banda Sonora']
  },
  {
    level: 2,
    id: 'nivel-2-broadcast-pro',
    name: 'Nivel 2: Producción de Campaña Estándar (TV & Pauta Pro)',
    shortName: '2. Broadcast Pro',
    badge: 'Televisión & Pauta',
    description: 'Formato televisivo y pauta digital profesional: 3 a 4 planos en terreno, testimonios reales intercalados, locución institucional en off combinada con el candidato y chyrons con titulares de prensa.',
    tags: ['3-4 Planos', 'Testimonios', 'Voz en Off + Candidato', 'Chyrons de Prensa']
  },
  {
    level: 3,
    id: 'nivel-3-reporteria-terreno',
    name: 'Nivel 3: Producción Intermedia (Reportería en Terreno)',
    shortName: '3. Reportería Ágil',
    badge: 'Periodístico / Ágil',
    description: 'Estilo periodístico ágil: el candidato con micrófono de mano en el lugar exacto de la noticia, 1 o 2 planos de apoyo con transeúntes, ritmo dinámico y edición rápida para redes.',
    tags: ['Micrófono en Mano', 'Cámara al Hombro', 'Lugar de los Hechos', 'Edición Rápida']
  },
  {
    level: 4,
    id: 'nivel-4-smartphone-ligero',
    name: 'Nivel 4: Producción Ligera (Formato Smartphone / Espontáneo)',
    shortName: '4. Celular Espontáneo',
    badge: 'Smartphone / Cercano',
    description: 'Grabación con celular en estabilizador o mano alzada, lenguaje cotidiano y cercano, audio directo con corbatero inalámbrico, edición mínima de 1 o 2 cortes, pensado para TikTok e Instagram.',
    tags: ['Formato Vertical (9:16)', 'Grabación Smartphone', 'Audio Corbatero', '1-2 Cortes']
  },
  {
    level: 5,
    id: 'nivel-5-una-sola-toma',
    name: 'Nivel 5: Una Sola Toma (One-Shot / Plano Secuencia)',
    shortName: '5. Una Sola Toma',
    badge: 'One-Shot / 0 Cortes',
    description: 'Video grabado en una sola toma continua de principio a fin, sin ningún corte de edición. El candidato camina y habla de frente a la cámara en el lugar de los hechos con naturalidad total, gestualidad sincera y remate directo.',
    tags: ['0 Cortes de Edición', 'Plano Secuencia Continuo', 'Máxima Credibilidad', 'Toma Única']
  }
];

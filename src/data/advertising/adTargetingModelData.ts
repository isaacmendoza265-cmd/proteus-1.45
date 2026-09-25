/**
 * MODELO DE DATOS: RESONANCIA PUBLICITARIA Y SEGMENTACIÓN DE AUDIENCIAS (PA-010)
 * Proyecto Proteus - Unidad de Automejora
 */

export type AdvertisingChannel = 
  | 'TIKTOK_REELS' 
  | 'META_ADS_FEED' 
  | 'WHATSAPP_DIRECT' 
  | 'OUTDOOR_BILLBOARD' 
  | 'COMMUNITY_RADIO';

export interface AdvertisingResonanceProfile {
  id: string;
  name: string;
  category: 'Joven' | 'Popular' | 'Productivo' | 'Tradicional' | 'Rural';
  description: string;
  primaryChannel: AdvertisingChannel;
  secondaryChannel: AdvertisingChannel;
  optimalFormat: string; // ej. "Video 9:16 de 15 segundos", "Carrusel de 3 láminas", "Nota de voz + texto"
  emotionalHook: string;
  gainFramingAngle: string;
  lossFramingAngle: string;
  cognitiveBiases: string[];
  toxicWordsToAvoid: string[];
  powerKeywords: string[];
  callToAction: string;
  expectedCTR: number; // Porcentaje (ej. 3.4%)
  estimatedCPM: number; // COP por 1.000 impresiones
  sampleCopyVariantA: string; // Ganancia
  sampleCopyVariantB: string; // Pérdida/Protección
}

export const ADVERTISING_ARCHETYPES_DATA: AdvertisingResonanceProfile[] = [
  {
    id: 'arch-jovenes-digitales',
    name: 'Jóvenes Universitarios & Digitales (18-28 años)',
    category: 'Joven',
    description: 'Nativos digitales, alta sensibilidad al empleo juvenil, tecnología, cultura, medio ambiente y rechazo a la política acartonada.',
    primaryChannel: 'TIKTOK_REELS',
    secondaryChannel: 'META_ADS_FEED',
    optimalFormat: 'Video vertical 9:16 (15s) con hook visual de 2 segundos, subtítulos dinámicos de alto contraste y música en tendencia.',
    emotionalHook: '¿Estudiaste 5 años para que te pidan experiencia que nadie te da?',
    gainFramingAngle: 'Acceso directo a capital semilla tech, pasantías remuneradas y conectividad total sin palancas políticas.',
    lossFramingAngle: 'Si no apoyas una voz joven e independiente, las mismas maquinarias de siempre seguirán repartiéndose las oportunidades.',
    cognitiveBiases: ['Aversión a la futilidad', 'Efecto arrastre generacional (Bandwagon)', 'Sesgo de novedad'],
    toxicWordsToAvoid: ['Plataforma programática', 'Bancada institucional', 'Jerarquía tradicional', 'Correligionarios'],
    powerKeywords: ['Emprender', 'Sin palancas', 'Futuro real', 'Tu voz', 'Innovación digital', 'Independencia'],
    callToAction: 'Guarda este video, compártelo en tu grupo y sumemos fuerzas para renovar la Cámara por Antioquia.',
    expectedCTR: 4.8,
    estimatedCPM: 8500,
    sampleCopyVariantA: 'Tu talento no necesita favores políticos. Proponemos cero trabas para tu primera empresa y empleo digital con sueldos dignos en Antioquia. Es ahora.',
    sampleCopyVariantB: 'Nos están dejando sin futuro mientras ellos se reparten los contratos. No te resignes a migrar o a depender de un padrino: blindemos las oportunidades para los jóvenes.'
  },
  {
    id: 'arch-madres-populares',
    name: 'Madres Cabeza de Familia & Cuidadoras Populares (Estratos 1-3)',
    category: 'Popular',
    description: 'Eje de la economía barrial, hiper-sensibles al costo de la canasta familiar, guarderías, comedores comunitarios y salud infantil.',
    primaryChannel: 'WHATSAPP_DIRECT',
    secondaryChannel: 'META_ADS_FEED',
    optimalFormat: 'Micro-mensaje conversacional en WhatsApp con formato testimonio cercano y audio de 30 segundos de alta empatía.',
    emotionalHook: 'Madre que madruga a luchar por sus hijos merece un Estado que no le dé la espalda.',
    gainFramingAngle: 'Ampliación de centros de cuidado infantil nocturnos, créditos populares sin gota a gota y subsidio nutricional directo.',
    lossFramingAngle: 'El costo de vida se está comiendo lo que ganas y el gota a gota amenaza tu tranquilidad familiar.',
    cognitiveBiases: ['Aversión a la pérdida inmediata', 'Sesgo de empatía maternal', 'Prueba social comunitaria'],
    toxicWordsToAvoid: ['Ajuste macroeconómico', 'Cifra repartidora', 'Indicadores DANE', 'Convergencia fiscal'],
    powerKeywords: ['Tus hijos', 'Tranquilidad', 'Sin gota a gota', 'Cuidado', 'Familia primero', 'Apoyo real'],
    callToAction: 'Reenvía este mensaje a las madres de tu cuadra y acompáñanos este domingo para proteger a nuestras familias.',
    expectedCTR: 3.9,
    estimatedCPM: 6200,
    sampleCopyVariantA: 'Para que ninguna madre tenga que elegir entre trabajar o cuidar a sus hijos: centros de cuidado comunitarios y apoyo directo a las jefas de hogar.',
    sampleCopyVariantB: 'No permitas que el gota a gota siga asfixiando tu hogar. Vamos a erradicar la usura con microcréditos públicos protegidos para las madres trabajadoras.'
  },
  {
    id: 'arch-comerciantes-independientes',
    name: 'Comerciantes, Tenderos & Microempresarios (Estratos 2-4)',
    category: 'Productivo',
    description: 'Generadores del empleo popular, cansados de impuestos excesivos, trámites asfixiantes, inseguridad y vacunas en territorio.',
    primaryChannel: 'META_ADS_FEED',
    secondaryChannel: 'OUTDOOR_BILLBOARD',
    optimalFormat: 'Carrusel de 3 imágenes de alto impacto con datos de ahorro tributario y volante entregado mano a mano en zona comercial.',
    emotionalHook: 'Tú abres la reja a las 6 a.m. a trabajar, no para mantener la burocracia ni la delincuencia.',
    gainFramingAngle: 'Alivios tributarios para microempresas, ventanilla única sin sobornos y líneas de crédito blando con el IDEA.',
    lossFramingAngle: 'Cada negocio que cierra por la extorsión o el impuesto absurdo es una familia antioqueña que cae en la ruina.',
    cognitiveBiases: ['Aversión al riesgo patrimonial', 'Sesgo del esfuerzo propio (Just World)', 'Indignación por injusticia'],
    toxicWordsToAvoid: ['Solidaridad impositiva', 'Gasto público expansivo', 'Regulación estatal estricta'],
    powerKeywords: ['Seguridad jurídica', 'Menos impuestos', 'Protección a tenderos', 'Respeto al que trabaja', 'Libertad'],
    callToAction: 'Ponte la camiseta del comercio antioqueño. Escribe "COMERCIO" al WhatsApp y conoce la propuesta de Isaac Mendoza.',
    expectedCTR: 3.2,
    estimatedCPM: 9800,
    sampleCopyVariantA: 'Menos impuestos y cero vacunas: defendemos a los comerciantes que madrugan a mover a Antioquia. Isaac Mendoza: la voz del comercio real.',
    sampleCopyVariantB: '¿Hasta cuándo vamos a tolerar que te cobren impuestos como suizo y te den seguridad de selva? Blindemos tu negocio de la delincuencia.'
  },
  {
    id: 'arch-adultos-mayores',
    name: 'Adultos Mayores & Pensionados de Tradición (Estratos 2-5)',
    category: 'Tradicional',
    description: 'Votantes de alta disciplina cívica, preocupados por la salud (citas médicas, medicamentos), la seguridad barrial y los valores éticos.',
    primaryChannel: 'COMMUNITY_RADIO',
    secondaryChannel: 'META_ADS_FEED',
    optimalFormat: 'Cuña radial de 25 segundos con locución pausada, clara e institucional, y posts en Facebook con texto grande y legible.',
    emotionalHook: 'Toda una vida de trabajo honesto merece respeto, salud digna y tranquilidad en el barrio.',
    gainFramingAngle: 'Entrega oportuna de medicamentos a domicilio, citas especializadas en menos de 5 días y espacios de recreación digna.',
    lossFramingAngle: 'No permitamos que destruyan el sistema de salud ni que los abuelos hagan filas interminables por una medicina.',
    cognitiveBiases: ['Sesgo del statu quo', 'Aversión a la incertidumbre', 'Respeto a la trayectoria'],
    toxicWordsToAvoid: ['Disrupción total', 'Revolución estructural', 'Desmonte de instituciones'],
    powerKeywords: ['Respeto', 'Salud a tiempo', 'Tranquilidad', 'Valores', 'Experiencia', 'Seguridad'],
    callToAction: 'Hable con sus hijos y nietos. Este domingo votemos por la experiencia y el compromiso con nuestros mayores.',
    expectedCTR: 2.7,
    estimatedCPM: 5400,
    sampleCopyVariantA: 'La salud no puede ser una limosna. Citas médicas a tiempo y medicinas en la puerta de su casa para nuestros adultos mayores. Isaac Mendoza cumple.',
    sampleCopyVariantB: 'Su tranquilidad y su pensión se respetan. Digamos NO al caos y a las filas infames en los hospitales. Defendamos a quienes construyeron a Antioquia.'
  },
  {
    id: 'arch-rural-campesino',
    name: 'Productores Agropecuarios & Comunidad Rural (Subregiones)',
    category: 'Rural',
    description: 'Habitantes de corregimientos y veredas, demandan vías terciarias transitables, precios justos para cosechas, abonos y apoyo técnico.',
    primaryChannel: 'COMMUNITY_RADIO',
    secondaryChannel: 'WHATSAPP_DIRECT',
    optimalFormat: 'Micro-cápsula radial local de 30s transmitida en la madrugada y volantes rústicos mano a mano en días de mercado.',
    emotionalHook: 'Sin campo no hay ciudad: el campesino antioqueño es quien llena la mesa de todos.',
    gainFramingAngle: 'Placas huellas veredales prioritarias, subsidio al fertilizante e intermediación comercial directa sin agiotistas.',
    lossFramingAngle: 'Las vías destruidas pudren las cosechas en las fincas mientras los insumos suben sin control. ¡Basta de abandono rural!',
    cognitiveBiases: ['Identidad de arraigo territorial', 'Desconfianza del político de capital', 'Pragmatismo utilitario'],
    toxicWordsToAvoid: ['Economía digital 4.0', 'Blockchain agrícola', 'Smart cities', 'Gentrification'],
    powerKeywords: ['Placas huellas', 'Precios justos', 'Vereda', 'El campo primero', 'Abonos baratos', 'Honradez'],
    callToAction: 'Nos vemos este domingo en la plaza de mercado. Pregunte por la lista de Isaac Mendoza.',
    expectedCTR: 4.1,
    estimatedCPM: 4200,
    sampleCopyVariantA: 'Vías veredales transitables para sacar sus cosechas y abonos a precio justo. Isaac Mendoza: el corazón en el campo antioqueño.',
    sampleCopyVariantB: 'No más cosechas perdidas en el lodo. Exigimos presupuesto real para las placas huellas de nuestras veredas. El campo se hace respetar.'
  }
];

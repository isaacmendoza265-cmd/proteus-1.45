import { Commune } from './types';

export const ZONES = [
  'Zona Nororiental',
  'Zona Noroccidental',
  'Zona Centro Oriental',
  'Zona Centro Occidental',
  'Zona Suroriental',
  'Zona Suroccidental',
  'Corregimientos'
];

export const COMMUNES: Commune[] = [
  {
    id: 1,
    code: '01',
    name: 'Popular',
    type: 'comuna',
    zone: 'Zona Nororiental',
    description: 'Ubicada en la ladera nororiental de Medellín. Caracterizada por una alta densidad urbana, historia de resiliencia comunitaria y transporte por Metrocable Línea K.',
    estratoPredominante: 'Estrato 1 y 2',
    barriosCount: 8,
    areaKm2: 3.11
  },
  {
    id: 2,
    code: '02',
    name: 'Santa Cruz',
    type: 'comuna',
    zone: 'Zona Nororiental',
    description: 'Comuna ribereña en el costado oriental del río Medellín. Destacada por su actividad barrial, comercio local y procesos de integración sociocultural.',
    estratoPredominante: 'Estrato 2',
    barriosCount: 11,
    areaKm2: 2.20
  },
  {
    id: 3,
    code: '03',
    name: 'Manrique',
    type: 'comuna',
    zone: 'Zona Nororiental',
    description: 'Una de las comunas más pobladas y de gran arraigo tanguero y cultural. Conectada por el Metroplús y proyectos de urbanismo social en laderas.',
    estratoPredominante: 'Estrato 1, 2 y 3',
    barriosCount: 10,
    areaKm2: 5.48
  },
  {
    id: 4,
    code: '04',
    name: 'Aranjuez',
    type: 'comuna',
    zone: 'Zona Nororiental',
    description: 'Referente de patrimonio, educación y ciencia: sede del Jardín Botánico, Parque Explora, Planetario y la Casa Museo Pedro Nel Gómez.',
    estratoPredominante: 'Estrato 2 y 3',
    barriosCount: 14,
    areaKm2: 4.87
  },
  {
    id: 5,
    code: '05',
    name: 'Castilla',
    type: 'comuna',
    zone: 'Zona Noroccidental',
    description: 'Tradicional comuna obrera y residencial del noroccidente con gran dinámica comercial, deportiva (bulevares y canchas) y asociativa.',
    estratoPredominante: 'Estrato 2 y 3',
    barriosCount: 14,
    areaKm2: 6.09
  },
  {
    id: 6,
    code: '06',
    name: 'Doce de Octubre',
    type: 'comuna',
    zone: 'Zona Noroccidental',
    description: 'Comuna de ladera occidental con gran concentración demográfica, vistas panorámicas sobre el valle y dinámicas juveniles.',
    estratoPredominante: 'Estrato 2 y 3',
    barriosCount: 12,
    areaKm2: 3.82
  },
  {
    id: 7,
    code: '07',
    name: 'Robledo',
    type: 'comuna',
    zone: 'Zona Noroccidental',
    description: 'Ciudadela universitaria del noroccidente (UdeA, Pascual Bravo, ITM, Colegio Mayor), con expansión residencial vertiginosa y el Cerro El Volador.',
    estratoPredominante: 'Estrato 2, 3 y 4',
    barriosCount: 25,
    areaKm2: 9.38
  },
  {
    id: 8,
    code: '08',
    name: 'Villa Hermosa',
    type: 'comuna',
    zone: 'Zona Centro Oriental',
    description: 'Zona de laderas centro-orientales conocida por el Parque de la Vida, el Teatro al Aire Libre Pedregal y el Cerro Pan de Azúcar.',
    estratoPredominante: 'Estrato 1, 2 y 3',
    barriosCount: 18,
    areaKm2: 5.78
  },
  {
    id: 9,
    code: '09',
    name: 'Buenos Aires',
    type: 'comuna',
    zone: 'Zona Centro Oriental',
    description: 'Comuna atravesada por el Tranvía de Ayacucho y Metrocables Líneas H y M, centro de articulación de memoria y desarrollo urbano.',
    estratoPredominante: 'Estrato 2 y 3',
    barriosCount: 17,
    areaKm2: 7.08
  },
  {
    id: 10,
    code: '10',
    name: 'La Candelaria (Centro)',
    type: 'comuna',
    zone: 'Zona Centro Oriental',
    description: 'Corazón administrativo, comercial, histórico y de servicios de Medellín. Concentra la mayor población flotante diaria de la ciudad.',
    estratoPredominante: 'Estrato 3 y 4',
    barriosCount: 16,
    areaKm2: 7.37
  },
  {
    id: 11,
    code: '11',
    name: 'Laureles - Estadio',
    type: 'comuna',
    zone: 'Zona Centro Occidental',
    description: 'Polo deportivo y gastronómico que alberga la Unidad Deportiva Atanasio Girardot, la Universidad Pontificia Bolivariana y corredores verdes.',
    estratoPredominante: 'Estrato 4 y 5',
    barriosCount: 14,
    areaKm2: 7.42
  },
  {
    id: 12,
    code: '12',
    name: 'La América',
    type: 'comuna',
    zone: 'Zona Centro Occidental',
    description: 'Comuna residencial tradicional con alta calidad de vida, comercio de barrio, plazas y cercanía al corredor de la Avenida San Juan.',
    estratoPredominante: 'Estrato 3 y 4',
    barriosCount: 13,
    areaKm2: 3.98
  },
  {
    id: 13,
    code: '13',
    name: 'San Javier',
    type: 'comuna',
    zone: 'Zona Centro Occidental',
    description: 'Ícono mundial de transformación social a través del arte urbano, escaleras eléctricas públicas, Metrocable Línea J y Casas de Cultura.',
    estratoPredominante: 'Estrato 1, 2 y 3',
    barriosCount: 20,
    areaKm2: 7.01
  },
  {
    id: 14,
    code: '14',
    name: 'El Poblado',
    type: 'comuna',
    zone: 'Zona Suroriental',
    description: 'Principal centro financiero, hotelero, gastronómico y empresarial de Medellín, con la mayor renta per cápita y baja densidad residencial.',
    estratoPredominante: 'Estrato 5 y 6',
    barriosCount: 22,
    areaKm2: 23.00
  },
  {
    id: 15,
    code: '15',
    name: 'Guayabal',
    type: 'comuna',
    zone: 'Zona Suroccidental',
    description: 'Sector industrial y residencial estratégico que aloja el Aeropuerto Olaya Herrera, el Parque Zoológico Santa Fe y el Parque Comfenalco.',
    estratoPredominante: 'Estrato 3',
    barriosCount: 7,
    areaKm2: 7.57
  },
  {
    id: 16,
    code: '16',
    name: 'Belén',
    type: 'comuna',
    zone: 'Zona Suroccidental',
    description: 'La comuna más extensa y poblada de Medellín, con centros de recreación (Unidad Deportiva de Belén), Cerro Nutibara y gran desarrollo.',
    estratoPredominante: 'Estrato 3, 4 y 5',
    barriosCount: 21,
    areaKm2: 8.83
  },
  {
    id: 50,
    code: '50',
    name: 'San Sebastián de Palmitas',
    type: 'corregimiento',
    zone: 'Corregimientos',
    description: 'Corregimiento rural al occidente con vocación agropecuaria (café, caña y plátano), ecosistemas de montaña y teleférico veredal.',
    estratoPredominante: 'Estrato 1 y 2 Rural',
    barriosCount: 8,
    areaKm2: 57.48
  },
  {
    id: 60,
    code: '60',
    name: 'San Cristóbal',
    type: 'corregimiento',
    zone: 'Corregimientos',
    description: 'El mayor productor de hortalizas y flores del valle, con rápido crecimiento urbano y conexión directa a través del Túnel de Occidente.',
    estratoPredominante: 'Estrato 1, 2 y 3',
    barriosCount: 17,
    areaKm2: 48.60
  },
  {
    id: 70,
    code: '70',
    name: 'Altavista',
    type: 'corregimiento',
    zone: 'Corregimientos',
    description: 'Territorio de transición rural-urbana al suroccidente con tradición alfarera y ladrillera, cuencas hídricas y biodiversidad.',
    estratoPredominante: 'Estrato 1 y 2',
    barriosCount: 8,
    areaKm2: 27.41
  },
  {
    id: 80,
    code: '80',
    name: 'San Antonio de Prado',
    type: 'corregimiento',
    zone: 'Corregimientos',
    description: 'El corregimiento más poblado de Colombia, con alta densidad residencial, patrimonio campesino y proyectos de movilidad conectiva.',
    estratoPredominante: 'Estrato 2 y 3',
    barriosCount: 8,
    areaKm2: 50.75
  },
  {
    id: 90,
    code: '90',
    name: 'Santa Elena',
    type: 'corregimiento',
    zone: 'Corregimientos',
    description: 'Cuna de la tradición Silletera y Feria de las Flores. Gran reserva forestal y ecoturística que alberga el Parque Arví.',
    estratoPredominante: 'Estrato 2 y 3 Rural',
    barriosCount: 11,
    areaKm2: 70.36
  }
];

export const COMMUNES_LIST = COMMUNES;

import { ComunaInfo } from './types';

export const COMUNAS_INFO: ComunaInfo[] = [
  { id: 1, comunaName: 'Comuna 1', officialName: 'Popular', zones: ['01', '02'], type: 'comuna', description: 'Zona Nororiental (Barrios Santo Domingo Savio, Popular, Granizal, Carpinelo)', coordinates: { x: 3, y: 1 } },
  { id: 2, comunaName: 'Comuna 2', officialName: 'Santa Cruz', zones: ['03', '04'], type: 'comuna', description: 'Zona Nororiental (Barrios La Francia, Andalucía, Santa Cruz, Playón)', coordinates: { x: 2, y: 1 } },
  { id: 3, comunaName: 'Comuna 3', officialName: 'Manrique', zones: ['05', '06'], type: 'comuna', description: 'Zona Nororiental (Barrios La Salle, El Pomar, Manrique Central, Versalles)', coordinates: { x: 3, y: 2 } },
  { id: 4, comunaName: 'Comuna 4', officialName: 'Aranjuez', zones: ['07', '08'], type: 'comuna', description: 'Zona Nororiental (Barrios Berlín, San Isidro, Campo Valdés, Aranjuez)', coordinates: { x: 2, y: 2 } },
  { id: 5, comunaName: 'Comuna 5', officialName: 'Castilla', zones: ['09', '10'], type: 'comuna', description: 'Zona Noroccidental (Barrios Castilla, Las Grisas, Pedregal, Tricentenario)', coordinates: { x: 1, y: 2 } },
  { id: 6, comunaName: 'Comuna 6', officialName: 'Doce de Octubre', zones: ['11', '12'], type: 'comuna', description: 'Zona Noroccidental (Barrios Picacho, Doce de Octubre, Kennedy, Mirador)', coordinates: { x: 1, y: 1 } },
  { id: 7, comunaName: 'Comuna 7', officialName: 'Robledo', zones: ['13', '14'], type: 'comuna', description: 'Zona Noroccidental (Barrios Robledo, Pilarica, Miramar, Aures, Bosques)', coordinates: { x: 1, y: 3 } },
  { id: 8, comunaName: 'Comuna 8', officialName: 'Villa Hermosa', zones: ['15', '16'], type: 'comuna', description: 'Zona Centro Oriental (Barrios Villatina, La Libertad, Boston, Enciso)', coordinates: { x: 3, y: 3 } },
  { id: 9, comunaName: 'Comuna 9', officialName: 'Buenos Aires', zones: ['17', '18'], type: 'comuna', description: 'Zona Centro Oriental (Barrios Buenos Aires, Loreto, Miraflores, Caicedo)', coordinates: { x: 3, y: 4 } },
  { id: 10, comunaName: 'Comuna 10', officialName: 'La Candelaria (Centro)', zones: ['19', '20'], type: 'comuna', description: 'Zona Centro (Barrios El Centro, San Diego, Prado, Guayaquil, Boston)', coordinates: { x: 2, y: 3 } },
  { id: 11, comunaName: 'Comuna 11', officialName: 'Laureles - Estadio', zones: ['21', '22'], type: 'comuna', description: 'Zona Centro Occidental (Barrios Laureles, Estadio, San Joaquín, Florida)', coordinates: { x: 1, y: 4 } },
  { id: 12, comunaName: 'Comuna 12', officialName: 'La América', zones: ['23', '24'], type: 'comuna', description: 'Zona Centro Occidental (Barrios La América, Calasanz, Santa Lucía, Ferrini)', coordinates: { x: 1, y: 5 } },
  { id: 13, comunaName: 'Comuna 13', officialName: 'San Javier', zones: ['25', '26'], type: 'comuna', description: 'Zona Centro Occidental (Barrios San Javier, Las Independencias, El Salado, 20 de Julio)', coordinates: { x: 0, y: 4 } },
  { id: 14, comunaName: 'Comuna 14', officialName: 'El Poblado', zones: ['27', '28'], type: 'comuna', description: 'Zona Suroriental (Barrios El Poblado, Milla de Oro, Las Lomas, Castropol, Patio Bonito)', coordinates: { x: 3, y: 5 } },
  { id: 15, comunaName: 'Comuna 15', officialName: 'Guayabal', zones: ['29', '30'], type: 'comuna', description: 'Zona Suroccidental (Barrios Guayabal, Cristo Rey, Santa Fe, Campo Amor)', coordinates: { x: 2, y: 5 } },
  { id: 16, comunaName: 'Comuna 16', officialName: 'Belén', zones: ['31', '32'], type: 'comuna', description: 'Zona Suroccidental (Barrios Belén, San Bernardo, Los Alpes, Rosales, La Gloria)', coordinates: { x: 1, y: 6 } },
  { id: 90, comunaName: 'Zona 90', officialName: 'Área Rural (Corregimientos)', zones: ['90'], type: 'rural', description: 'San Cristóbal, San Antonio de Prado, Altavista, Santa Elena, San Sebastián de Palmitas' },
  { id: 98, comunaName: 'Zona 98', officialName: 'Centros Carcelarios', zones: ['98'], type: 'carcelario', description: 'Establecimientos penitenciarios y carcelarios de Medellín (Bellavista, Pedregal)' },
  { id: 99, comunaName: 'Zona 99', officialName: 'Puesto Censo', zones: ['99'], type: 'censo', description: 'Puesto único de censo electoral en Plaza Mayor y Centro Administrativo La Alpujarra' },
];

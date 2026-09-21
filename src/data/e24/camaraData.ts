import { Party, Candidate, ZoneId, ZoneVotes, MunicipalSummary, ComunaVotesAggregation, ComunaPartySummary } from './types';
import { ALL_ZONES } from './e24RawData';
import { COMUNAS_INFO } from './comunasData';
import {
  ALL_CAMARA_RAW_PARTIES,
  RAW_CAMARA_BLANCOS,
  RAW_CAMARA_NOMARCADOS,
  RAW_CAMARA_NULOS
} from './camaraRawData';

export const CAMARA_PARTIES: Party[] = [
  {
    id: '0011',
    code: '0011',
    name: 'PARTIDO CENTRO DEMOCRÁTICO',
    partyName: 'PARTIDO CENTRO DEMOCRÁTICO',
    shortName: 'Centro Democrático',
    preferential: true,
    isPreferential: true,
    color: '#2563eb', // Blue
    logoText: 'CD'
  },
  {
    id: '3055',
    code: '3055',
    name: 'PACTO HISTÓRICO ANTIOQUIA',
    partyName: 'COALICIÓN PACTO HISTÓRICO',
    shortName: 'Pacto Histórico',
    preferential: false,
    isPreferential: false,
    color: '#db2777', // Pink/Magenta
    logoText: 'PH'
  },
  {
    id: '1067',
    code: '1067',
    name: 'CREEMOS',
    partyName: 'PARTIDO CREEMOS',
    shortName: 'Creemos',
    preferential: true,
    isPreferential: true,
    color: '#8b5cf6', // Violet
    logoText: 'CREEMOS'
  },
  {
    id: '0002',
    code: '0002',
    name: 'PARTIDO CONSERVADOR COLOMBIANO',
    partyName: 'PARTIDO CONSERVADOR COLOMBIANO',
    shortName: 'Conservador',
    preferential: true,
    isPreferential: true,
    color: '#0284c7', // Sky Blue
    logoText: 'C'
  },
  {
    id: '0001',
    code: '0001',
    name: 'PARTIDO LIBERAL COLOMBIANO',
    partyName: 'PARTIDO LIBERAL COLOMBIANO',
    shortName: 'Liberal',
    preferential: true,
    isPreferential: true,
    color: '#dc2626', // Red
    logoText: 'L'
  },
  {
    id: '3049',
    code: '3049',
    name: 'COALICIÓN CAMBIO RADICAL - LA U - MSN - OXI',
    partyName: 'CR - LA U - MSN - OXI',
    shortName: 'CR - La U - MSN',
    preferential: true,
    isPreferential: true,
    color: '#0891b2', // Cyan
    logoText: 'CR-U'
  },
  {
    id: '3091',
    code: '3091',
    name: 'COALICIÓN ALIANZA VERDE, EN MARCHA, ASI',
    partyName: 'VERDE - EN MARCHA - ASI',
    shortName: 'Verde - En Marcha',
    preferential: true,
    isPreferential: true,
    color: '#059669', // Emerald
    logoText: 'VERDE'
  },
  {
    id: '3015',
    code: '3015',
    name: 'COALICIÓN AHORA COLOMBIA',
    partyName: 'COALICIÓN AHORA COLOMBIA',
    shortName: 'Ahora Colombia',
    preferential: true,
    isPreferential: true,
    color: '#d97706', // Amber
    logoText: 'AHORA'
  },
  {
    id: '3068',
    code: '3068',
    name: 'COALICIÓN ALMA',
    partyName: 'COALICIÓN ALMA',
    shortName: 'Alma',
    preferential: true,
    isPreferential: true,
    color: '#6366f1', // Indigo
    logoText: 'ALMA'
  },
  {
    id: '3119',
    code: '3119',
    name: 'FRENTE AMPLIO UNITARIO',
    partyName: 'FRENTE AMPLIO UNITARIO',
    shortName: 'Frente Amplio Unitario',
    preferential: true,
    isPreferential: true,
    color: '#ea580c', // Orange
    logoText: 'FAU'
  },
  {
    id: '3135',
    code: '3135',
    name: 'COALICIÓN FUERZA CIUDADANA',
    partyName: 'COALICIÓN FUERZA CIUDADANA',
    shortName: 'Fuerza Ciudadana',
    preferential: false,
    isPreferential: false,
    color: '#f43f5e', // Coral
    logoText: 'FC'
  }
];

export const CAMARA_CANDIDATES: Record<string, Candidate[]> = {
  // Centro Democrático Cámara 2026 (0011)
  '0011': [
    { id: '101', number: '101', name: 'ANDRES FELIPE GUERRA HOYOS', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '102', number: '102', name: 'OSCAR DARIO PEREZ PINEDA', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '103', number: '103', name: 'LINA MARCELA MENA CORDOBA', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '104', number: '104', name: 'FEDERICO EDUARDO HOYOS SALAZAR', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '105', number: '105', name: 'MARIA TERESA MONTOYA ALVAREZ', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '106', number: '106', name: 'ANDRES FELIPE GAVIRIA CANO', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '107', number: '107', name: 'JUAN DAVID ZULUAGA ZULUAGA', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '108', number: '108', name: 'YULIETH ANDREA SANCHEZ CARREÑO', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '109', number: '109', name: 'JULIAN FERNANDO LOPERA GARZON', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '110', number: '110', name: 'JHON JAIRO BERRIO LOPEZ', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '111', number: '111', name: 'LIGIA ESTELA GIL PEREZ', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '112', number: '112', name: 'SERGIO OSVALDO MOLINA PEREZ', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '113', number: '113', name: 'MELISSA ORREGO EUSSE', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '114', number: '114', name: 'OSBALDO ANGULO DE LA ROSA', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '115', number: '115', name: 'JOSE GREGORIO ORJUELA PEREZ', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '116', number: '116', name: 'DAVID TOLEDO OSPINA', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' },
    { id: '117', number: '117', name: 'ANA LIGIA MORA MARTINEZ', partyId: '0011', partyName: 'Centro Democrático', color: '#2563eb' }
  ],

  // Creemos Cámara 2026 (1067)
  '1067': [
    { id: '101', number: '101', name: 'LUIS GUILLERMO PATIÑO ARISTIZABAL', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '102', number: '102', name: 'SIMON MOLINA GOMEZ', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '103', number: '103', name: 'CLAUDIA PATRICIA HOYOS ARISMENDI', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '104', number: '104', name: 'IVAN ALONSO MONTOYA URREGO', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '105', number: '105', name: 'HECTOR JAIME RENDON OSORIO', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '106', number: '106', name: 'CAMILA OSPINA ZAPATA', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '107', number: '107', name: 'EDWIN ANGOLA MENA', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '108', number: '108', name: 'JOSE MIGUEL ZULUAGA MORA', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '109', number: '109', name: 'VIVIANA MUÑOZ GIRALDO', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '110', number: '110', name: 'CARLOS IGNACIO CUERVO VALENCIA', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '111', number: '111', name: 'RODRIGO PATIÑO CORREA', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '112', number: '112', name: 'CAROLINA VARGAS GOMEZ', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '113', number: '113', name: 'JUAN DAVID GUZMAN CANO', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '114', number: '114', name: 'CAMILA JARAMILLO CANO', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '115', number: '115', name: 'INGRI EMIR HOLGUIN RENDON', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '116', number: '116', name: 'FABIO ALONSO NARANJO VILLADA', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' },
    { id: '117', number: '117', name: 'GERMAN DARIO HOYOS GIRALDO', partyId: '1067', partyName: 'Creemos', color: '#8b5cf6' }
  ],

  // Conservador Cámara 2026 (0002)
  '0002': [
    { id: '101', number: '101', name: 'LUIS MIGUEL LOPEZ ARISTIZABAL', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '102', number: '102', name: 'YAN MARCILY ZULUAGA SUAREZ', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '103', number: '103', name: 'MARIANA CARVAJAL LOPEZ', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '104', number: '104', name: 'JAIME ALONSO CANO MARTINEZ', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '105', number: '105', name: 'JUAN CAMILO CALLEJAS TAMAYO', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '106', number: '106', name: 'DARIO AUGUSTO ALZATE RAMIREZ', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '107', number: '107', name: 'ENRIQUE HUMBERTO HENAO GRANJA', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '108', number: '108', name: 'NICOLAS ALBEIRO ECHEVERRY ALVARAN', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '109', number: '109', name: 'MANUELA ARANGO URIBE', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '110', number: '110', name: 'LUISA FERNANDA OCHOA VILLEGAS', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '111', number: '111', name: 'ERIKA JOHANNA VILLA MARIN', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '112', number: '112', name: 'ADRIANA MARIA GUERRA GRACIANO', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '114', number: '114', name: 'CARLOS ALBERTO LOAIZA GIRALDO', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '115', number: '115', name: 'LEONARDO ALVAREZ MARIN', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '116', number: '116', name: 'YANETH CRISTINA BEDOYA PIEDRAHITA', partyId: '0002', partyName: 'Conservador', color: '#0284c7' },
    { id: '117', number: '117', name: 'FRAY DANIEL SEPULVEDA RIVILLAS', partyId: '0002', partyName: 'Conservador', color: '#0284c7' }
  ],

  // Liberal Cámara 2026 (0001)
  '0001': [
    { id: '101', number: '101', name: 'LUIS CARLOS OCHOA TOBON', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '102', number: '102', name: 'PAOLA ANDREA PINEDA MONTOYA', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '103', number: '103', name: 'SHEILA LIZEHT RODRIGUEZ VALBUENA', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '104', number: '104', name: 'MARTHA EDY AGUIRRE ROJO', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '105', number: '105', name: 'YUCELLY RINCON TORRADO', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '106', number: '106', name: 'NELIDA MARIN CHICA', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '107', number: '107', name: 'NESTOR DAVID RESTREPO BONNETT', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '108', number: '108', name: 'HERNAN DARIO ECHEVERRI ARBOLEDA', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '109', number: '109', name: 'MARCO AURELIO RESTREPO GIRALDO', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '110', number: '110', name: 'EICER JHONSON HOYOS OCAMPO', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '111', number: '111', name: 'CAMILO ANDRES GOMEZ MOSQUERA', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '112', number: '112', name: 'ISABEL DEL SOCORRO MUÑOZ PALACIO', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '113', number: '113', name: 'JORGE IVAN GIRALDO FLOREZ', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '114', number: '114', name: 'LUCAS MUÑOZ ALVAREZ', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '115', number: '115', name: 'JOHN RICARDO LONDOÑO PIEDRAHITA', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '116', number: '116', name: 'DANIELA DUCUARA QUESADA', partyId: '0001', partyName: 'Liberal', color: '#dc2626' },
    { id: '117', number: '117', name: 'DIVER NEY FRANCO TEJADA', partyId: '0001', partyName: 'Liberal', color: '#dc2626' }
  ],

  // CR-LAU-MSN-OXI Cámara 2026 (3049)
  '3049': [
    { id: '101', number: '101', name: 'MAURICIO PARODI DIAZ', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '102', number: '102', name: 'NATALY VELEZ LOPERA', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '103', number: '103', name: 'LUISA DEL RIO SAAVEDRA', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '104', number: '104', name: 'RICARDO ROJAS ESCOBAR', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '105', number: '105', name: 'WILSON CORDOBA MENA', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '106', number: '106', name: 'LAURA GALLEGO SOLIS', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '107', number: '107', name: 'KATHERINE VELASQUEZ SILVA', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '108', number: '108', name: 'MARIA MANUELA CUARTAS BUITRAGO', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '109', number: '109', name: 'DIEGO ALEXANDER VALENCIA CORREA', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '110', number: '110', name: 'JUAN FELIPE RESTREPO TAMAYO', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '111', number: '111', name: 'MARIELA HENAO FLOREZ', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '112', number: '112', name: 'JOHN JAIME URREA CHICA', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '113', number: '113', name: 'ELIECER VILLA GIRALDO', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '114', number: '114', name: 'JUAN DAVID BALLESTEROS PINEDA', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '115', number: '115', name: 'ARIES WEST ROWE MATEUS', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '116', number: '116', name: 'JOHN FREDY VILLADA MORALES', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' },
    { id: '117', number: '117', name: 'LINA MARCELA GARCIA GAÑAN', partyId: '3049', partyName: 'CR - La U - MSN', color: '#0891b2' }
  ],

  // Verde - En Marcha - ASI Cámara 2026 (3091)
  '3091': [
    { id: '101', number: '101', name: 'JUAN CAMILO LONDOÑO BARRERA', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '102', number: '102', name: 'MARCOS JAVIER MADERA CAMERO', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '103', number: '103', name: 'JUAN DAVID ROLDAN ALVAREZ', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '104', number: '104', name: 'MARCELA RESTREPO BARRERA', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '105', number: '105', name: 'MARLA URIBE VELASQUEZ', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '106', number: '106', name: 'DAMIAN GARCES RESTREPO', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '107', number: '107', name: 'ERIKA ROOTS RENTERIA', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '108', number: '108', name: 'GUSTAVO ADOLFO GARCIA PINEDA', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '110', number: '110', name: 'ALEJANDRA GONZALEZ VARGAS', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '111', number: '111', name: 'LUIS BERNARDO VELEZ MONTOYA', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '112', number: '112', name: 'MARIA ISABEL MUÑOZ TOBON', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '113', number: '113', name: 'HUGO RAMIRO ARBELAEZ OSORIO', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '114', number: '114', name: 'SANTIAGO JARAMILLO BOTERO', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '115', number: '115', name: 'CAMILO ANDRES AGUILAR ALVAREZ', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '116', number: '116', name: 'LUISA FERNANDA PALACIO MESA', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' },
    { id: '117', number: '117', name: 'JUAN DAVID FLOREZ CANO', partyId: '3091', partyName: 'Verde - En Marcha', color: '#059669' }
  ],

  // Ahora Colombia Cámara 2026 (3015)
  '3015': [
    { id: '101', number: '101', name: 'RAFAEL ANDRES NANCLARES OSPINA', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '102', number: '102', name: 'HANNA DIMELSA ESCOBAR CORREA', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '103', number: '103', name: 'YURI MARCELA EUSSE TOBON', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '104', number: '104', name: 'FABIAN MARCELO BETANCUR RIVERA', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '105', number: '105', name: 'EBERTO SMITH SAEZ MERCADO', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '106', number: '106', name: 'GILBERTO ANTONIO TORRES ESPITIA', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '107', number: '107', name: 'NELSON FERNANDO CARMONA LOPERA', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '108', number: '108', name: 'DANIEL OSPINA AYALA', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '109', number: '109', name: 'CINTHIA LIZETH FOLLECO AGUILAR', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '110', number: '110', name: 'ALEJANDRO ARCILA JIMENEZ', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '111', number: '111', name: 'CRISTIAN CAMILO QUINTERO GIRALDO', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '112', number: '112', name: 'JUAN CAMILO SALAZAR MARTINEZ', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '113', number: '113', name: 'VLADIMIR DE JESUS RAMIREZ RODRIGUEZ', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '114', number: '114', name: 'JHOANA DE JESUS BUSTAMANTE TORRES', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '115', number: '115', name: 'VICTOR JAVIER CORREA VELEZ', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '116', number: '116', name: 'YERLIN TATIANA HIDALGO NARVAEZ', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' },
    { id: '117', number: '117', name: 'ALEJANDRA SANCHEZ ZULUAGA', partyId: '3015', partyName: 'Ahora Colombia', color: '#d97706' }
  ],

  // Alma Cámara 2026 (3068)
  '3068': [
    { id: '101', number: '101', name: 'MARLY LICETH HERRERA DUQUE', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '102', number: '102', name: 'LUIS ALBERTO MESA RUIZ', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '103', number: '103', name: 'JAVIER ANIBAL AREIZA LONDOÑO', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '104', number: '104', name: 'AURA NELLY MOSQUERA PALACIOS', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '105', number: '105', name: 'CALIXTO ENRIQUE MANOTAS MARTINEZ', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '106', number: '106', name: 'DEYRA DEL ROSARIO MARTINEZ MOLINA', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '107', number: '107', name: 'CARLOS MARIO OSORIO FRANCO', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '108', number: '108', name: 'LUIS GONZALO GIRALDO AGUIRRE', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '109', number: '109', name: 'REBECA MARIA CONTRERAS ABAD', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '110', number: '110', name: 'YANITH ALFREDO SEGURA ARRIETA', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '111', number: '111', name: 'JESUS ANTONIO FORONDA DIAZ', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '112', number: '112', name: 'JUAN GUILLERMO ALDANA GALLEGO', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '113', number: '113', name: 'ABRAHAM ROBLEDO LAGAREJO', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '114', number: '114', name: 'LUCINA AMPARO GONZALEZ', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '115', number: '115', name: 'OSCAR ALONSO VELEZ ROJAS', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '116', number: '116', name: 'GLADYS PATRICIA GALLEGO CASTAÑEDA', partyId: '3068', partyName: 'Alma', color: '#6366f1' },
    { id: '117', number: '117', name: 'EVER DARIO ECHAVARRIA TABORDA', partyId: '3068', partyName: 'Alma', color: '#6366f1' }
  ],

  // Frente Amplio Unitario Cámara 2026 (3119)
  '3119': [
    { id: '101', number: '101', name: 'ANTONIO JOSE MONTOYA ACEVEDO', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '102', number: '102', name: 'JULIO CESAR BONILLA MOSQUERA', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '103', number: '103', name: 'LUIS ALBERTO VELEZ CALDERON', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '104', number: '104', name: 'TERESA DE JESUS MAZO HIGUITA', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '105', number: '105', name: 'CARLOS SEGUNDO OLIVEROS PERALTA', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '107', number: '107', name: 'CLAUDIA ISABELINA PEREZ ALCARAZ', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '108', number: '108', name: 'ALBA MAGALY VASQUEZ AGUIRRE', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '109', number: '109', name: 'LUZ ADRIANA ARANZAZU VARGAS', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '110', number: '110', name: 'EDGAR RAUL MEDINA VALBUENA', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '111', number: '111', name: 'JHONY RUFINO LOZANO BERROCAL', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '112', number: '112', name: 'NORA ELENA ADARVE CASTAÑEDA', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '113', number: '113', name: 'ALEJANDRO CARMONA HURTADO', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '114', number: '114', name: 'SALOMON HENAO TAMAYO', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '115', number: '115', name: 'DARUIN WISNEY GUISADO TORRES', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '116', number: '116', name: 'DORA IRENE LEZCANO MEDINA', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' },
    { id: '117', number: '117', name: 'BENJAMIN ROJAS', partyId: '3119', partyName: 'Frente Amplio Unitario', color: '#ea580c' }
  ]
};

// Compute RAW_ZONE_VOTES_CAMARA from real E-24 arrays
export const RAW_ZONE_VOTES_CAMARA: Record<ZoneId, ZoneVotes> = (() => {
  const result = {} as Record<ZoneId, ZoneVotes>;

  ALL_ZONES.forEach((zone, idx) => {
    const partiesMap: ZoneVotes['parties'] = {};
    let totalPartyVotesSum = 0;

    CAMARA_PARTIES.forEach(party => {
      const rawParty = ALL_CAMARA_RAW_PARTIES[party.id];
      if (rawParty) {
        const partyOnly = rawParty.partyOnlyVotes[idx] || 0;
        const totalPartyVotes = rawParty.totalVotes[idx] || 0;
        const candidateVotes: Record<string, number> = {};

        Object.entries(rawParty.candidates).forEach(([candId, candArr]) => {
          candidateVotes[candId] = candArr[idx] || 0;
        });

        partiesMap[party.id] = {
          partyOnly,
          candidateVotes,
          totalPartyVotes
        };
        totalPartyVotesSum += totalPartyVotes;
      } else {
        partiesMap[party.id] = {
          partyOnly: 0,
          candidateVotes: {},
          totalPartyVotes: 0
        };
      }
    });

    const votosBlanco = RAW_CAMARA_BLANCOS[idx] || 0;
    const votosNoMarcados = RAW_CAMARA_NOMARCADOS[idx] || 0;
    const votosNulos = RAW_CAMARA_NULOS[idx] || 0;
    const votosValidos = totalPartyVotesSum + votosBlanco;
    const totalVotos = votosValidos + votosNulos + votosNoMarcados;

    result[zone] = {
      zone,
      parties: partiesMap,
      votosBlanco,
      votosNulos,
      votosNoMarcados,
      votosValidos,
      totalVotos
    };
  });

  return result;
})();

// Calculate Municipal Summary for Cámara
export const MUNICIPAL_SUMMARY_CAMARA: MunicipalSummary = (() => {
  let votosValidos = 0;
  let votosBlanco = 0;
  let votosNulos = 0;
  let votosNoMarcados = 0;
  let totalVotos = 0;

  const partyTotals: Record<string, { partyOnly: number; candidateVotes: Record<string, number>; totalPartyVotes: number }> = {};
  CAMARA_PARTIES.forEach(party => {
    partyTotals[party.id] = { partyOnly: 0, candidateVotes: {}, totalPartyVotes: 0 };
  });

  Object.values(RAW_ZONE_VOTES_CAMARA).forEach(zv => {
    votosValidos += zv.votosValidos;
    votosBlanco += zv.votosBlanco;
    votosNulos += zv.votosNulos;
    votosNoMarcados += zv.votosNoMarcados;
    totalVotos += zv.totalVotos;

    CAMARA_PARTIES.forEach(party => {
      const zp = zv.parties[party.id];
      if (zp) {
        partyTotals[party.id].partyOnly += zp.partyOnly;
        partyTotals[party.id].totalPartyVotes += zp.totalPartyVotes;
        Object.entries(zp.candidateVotes).forEach(([cId, v]) => {
          partyTotals[party.id].candidateVotes[cId] = (partyTotals[party.id].candidateVotes[cId] || 0) + v;
        });
      }
    });
  });

  const partiesMap: Record<string, {
    partyId: string;
    partyName: string;
    shortName: string;
    color: string;
    partyOnly: number;
    candidateVotes: Record<string, number>;
    totalPartyVotes: number;
    percentageValidos: number;
  }> = {};

  CAMARA_PARTIES.forEach(party => {
    const p = partyTotals[party.id];
    partiesMap[party.id] = {
      partyId: party.id,
      partyName: party.name,
      shortName: party.shortName,
      color: party.color,
      partyOnly: p.partyOnly,
      candidateVotes: p.candidateVotes,
      totalPartyVotes: p.totalPartyVotes,
      percentageValidos: votosValidos > 0 ? (p.totalPartyVotes / votosValidos) * 100 : 0
    };
  });

  const sortedParties = Object.values(partiesMap).sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

  return {
    totalMesas: 5499,
    mesasEscrutadas: 5499,
    porcentajeEscrutado: 100.0,
    parties: partiesMap,
    sortedParties,
    totalPorPartidos: votosValidos - votosBlanco,
    votosBlanco,
    votosNulos,
    votosNoMarcados,
    votosValidos,
    totalVotos
  };
})();

// Calculate Comuna Aggregations for Cámara
export const COMUNA_AGGREGATIONS_CAMARA: Record<number, ComunaVotesAggregation> = (() => {
  const result: Record<number, ComunaVotesAggregation> = {};

  COMUNAS_INFO.forEach(comuna => {
    let votosBlanco = 0;
    let votosNulos = 0;
    let votosNoMarcados = 0;
    let votosValidos = 0;
    let totalVotos = 0;

    const partiesMap: Record<string, ComunaPartySummary> = {};
    CAMARA_PARTIES.forEach(party => {
      partiesMap[party.id] = {
        partyId: party.id,
        partyName: party.name,
        shortName: party.shortName,
        color: party.color,
        partyOnly: 0,
        candidateVotes: {},
        totalPartyVotes: 0,
        percentageValidos: 0,
        municipalPercentage: 0
      };
    });

    comuna.zones.forEach(zone => {
      const zv = RAW_ZONE_VOTES_CAMARA[zone];
      if (!zv) return;

      votosBlanco += zv.votosBlanco;
      votosNulos += zv.votosNulos;
      votosNoMarcados += zv.votosNoMarcados;
      votosValidos += zv.votosValidos;
      totalVotos += zv.totalVotos;

      CAMARA_PARTIES.forEach(party => {
        const zp = zv.parties[party.id];
        if (zp) {
          partiesMap[party.id].partyOnly += zp.partyOnly;
          partiesMap[party.id].totalPartyVotes += zp.totalPartyVotes;
          Object.entries(zp.candidateVotes).forEach(([candId, count]) => {
            partiesMap[party.id].candidateVotes[candId] = (partiesMap[party.id].candidateVotes[candId] || 0) + count;
          });
        }
      });
    });

    Object.values(partiesMap).forEach(p => {
      p.percentageValidos = votosValidos > 0 ? (p.totalPartyVotes / votosValidos) * 100 : 0;
      p.municipalPercentage = MUNICIPAL_SUMMARY_CAMARA.votosValidos > 0 ? (p.totalPartyVotes / MUNICIPAL_SUMMARY_CAMARA.votosValidos) * 100 : 0;
    });

    const sorted = Object.values(partiesMap).sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);
    const winner = sorted[0];
    const runnerUp = sorted[1] || sorted[0];

    result[comuna.id] = {
      comunaId: comuna.id,
      comunaName: comuna.comunaName,
      officialName: comuna.officialName,
      zones: comuna.zones,
      parties: partiesMap,
      sortedParties: sorted,
      votosBlanco,
      votosNulos,
      votosNoMarcados,
      votosValidos,
      totalVotos,
      winnerPartyId: winner.partyId,
      winnerPartyName: winner.shortName,
      winnerPartyVotes: winner.totalPartyVotes,
      winnerPartyPercentage: winner.percentageValidos,
      runnerUpPartyId: runnerUp.partyId,
      runnerUpPartyName: runnerUp.shortName,
      runnerUpPartyVotes: runnerUp.totalPartyVotes,
      runnerUpPartyPercentage: runnerUp.percentageValidos
    };
  });

  return result;
})();

export function getZonePartySummaryCamara(zoneId: ZoneId): {
  zone: ZoneId;
  parties: ComunaPartySummary[];
  votosBlanco: number;
  votosNulos: number;
  votosNoMarcados: number;
  votosValidos: number;
  totalVotos: number;
  winnerParty: ComunaPartySummary;
} {
  const zv = RAW_ZONE_VOTES_CAMARA[zoneId];
  const list: ComunaPartySummary[] = CAMARA_PARTIES.map(party => {
    const zp = zv.parties[party.id] || { partyOnly: 0, candidateVotes: {}, totalPartyVotes: 0 };
    return {
      partyId: party.id,
      partyName: party.name,
      shortName: party.shortName,
      color: party.color,
      partyOnly: zp.partyOnly,
      candidateVotes: zp.candidateVotes,
      totalPartyVotes: zp.totalPartyVotes,
      percentageValidos: zv.votosValidos > 0 ? (zp.totalPartyVotes / zv.votosValidos) * 100 : 0,
      municipalPercentage: MUNICIPAL_SUMMARY_CAMARA.votosValidos > 0 ? (zp.totalPartyVotes / MUNICIPAL_SUMMARY_CAMARA.votosValidos) * 100 : 0
    };
  }).sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

  return {
    zone: zoneId,
    parties: list,
    votosBlanco: zv.votosBlanco,
    votosNulos: zv.votosNulos,
    votosNoMarcados: zv.votosNoMarcados,
    votosValidos: zv.votosValidos,
    totalVotos: zv.totalVotos,
    winnerParty: list[0]
  };
}

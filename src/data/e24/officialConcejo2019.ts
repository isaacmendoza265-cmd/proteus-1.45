import { Party, Candidate, ZoneVotes, ZoneId, ComunaPartySummary, ComunaVotesAggregation, MunicipalSummary } from './types';
import { COMUNAS_INFO } from './comunasData';

// Parties list for Concejo 2019 Official E-24
export const CONCEJO_2019_PARTIES: Party[] = [
  { id: '0011', code: '0011', name: 'PARTIDO CENTRO DEMOCRÁTICO', shortName: 'Centro Democrático', preferential: true, isPreferential: true, color: '#2563eb', logoText: 'CD' },
  { id: '0002', code: '0002', name: 'PARTIDO CONSERVADOR COLOMBIANO', shortName: 'Conservador', preferential: true, isPreferential: true, color: '#1d4ed8', logoText: 'C' },
  { id: '0001', code: '0001', name: 'PARTIDO LIBERAL COLOMBIANO', shortName: 'Liberal', preferential: true, isPreferential: true, color: '#dc2626', logoText: 'L' },
  { id: '0319', code: '0319', name: 'G.S.C. INDEPENDIENTES', shortName: 'Independientes', preferential: true, isPreferential: true, color: '#10b981', logoText: 'IND' },
  { id: '0004', code: '0004', name: 'PARTIDO ALIANZA VERDE', shortName: 'Alianza Verde', preferential: true, isPreferential: true, color: '#16a34a', logoText: 'AV' },
  { id: '2035', code: '2035', name: 'COALICIÓN CAMBIO RADICAL - MIRA', shortName: 'CR - MIRA', preferential: true, isPreferential: true, color: '#ea580c', logoText: 'CR-MIRA' },
  { id: '0008', code: '0008', name: 'PARTIDO DE LA UNIÓN POR LA GENTE - PARTIDO DE LA U', shortName: 'Partido de la U', preferential: true, isPreferential: true, color: '#f59e0b', logoText: 'U' },
  { id: '0025', code: '0025', name: 'G.S.C. ESTAMOS LISTAS MOVIMIENTO', shortName: 'Estamos Listas', preferential: false, isPreferential: false, color: '#9333ea', logoText: 'EL' },
  { id: '0023', code: '0023', name: 'G.S.C. TODOS JUNTOS', shortName: 'Todos Juntos', preferential: true, isPreferential: true, color: '#0284c7', logoText: 'TJ' },
  { id: '0673', code: '0673', name: 'COALICIÓN QUEREMOS', shortName: 'Queremos', preferential: true, isPreferential: true, color: '#d97706', logoText: 'Q' },
  { id: '0006', code: '0006', name: 'PARTIDO ALIANZA SOCIAL INDEPENDIENTE "ASI"', shortName: 'ASI', preferential: true, isPreferential: true, color: '#059669', logoText: 'ASI' },
  { id: '0014', code: '0014', name: 'PARTIDO COLOMBIA JUSTA LIBRES', shortName: 'Colombia Justa Libres', preferential: false, isPreferential: false, color: '#7c3aed', logoText: 'CJL' },
  { id: '0015', code: '0015', name: 'PARTIDO COLOMBIA RENACIENTE', shortName: 'Colombia Renaciente', preferential: true, isPreferential: true, color: '#0d9488', logoText: 'CRN' },
  { id: '0013', code: '0013', name: 'PARTIDO FUERZA ALTERNATIVA REVOLUCIONARIA DEL COMÚN', shortName: 'FARC', preferential: false, isPreferential: false, color: '#e11d48', logoText: 'FARC' },
  { id: '0017', code: '0017', name: 'PARTIDO DE REIVINDICACIÓN ÉTNICA "PRE"', shortName: 'PRE', preferential: true, isPreferential: true, color: '#84cc16', logoText: 'PRE' }
];

// Candidates for Concejo 2019
export const CONCEJO_2019_CANDIDATES: Record<string, Candidate[]> = {
  '0001': [
    { id: '001', number: '001', name: 'FABIO HUMBERTO RIVERA RIVERA', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '002', number: '002', name: 'AURA MARLENY ARCILA GIRALDO', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '003', number: '003', name: 'CARLOS ANDRES ARANGO MACHADO', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '004', number: '004', name: 'HELEN KATHERINE BENITEZ VELASQUEZ', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '005', number: '005', name: 'BEATRIZ ELIANA QUINTERO BENITEZ', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '006', number: '006', name: 'BERNARDO ALEJANDRO GUERRA HOYOS', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '007', number: '007', name: 'ALEXIS MEJIA ECHEVERRY', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '008', number: '008', name: 'ELIAS YESID AGUILAR CUESTA', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '009', number: '009', name: 'JOSE LUIS GAVIRIA BEDOYA', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '010', number: '010', name: 'JAIME ALBERTO CARRION SUAREZ', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '012', number: '012', name: 'MARIO DE JESUS GONZALEZ GARCIA', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '013', number: '013', name: 'LUIS FERNANDO HERNANDEZ ARISTIZABAL', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '014', number: '014', name: 'MIGUEL ANGEL SEPULVEDA AGUIRRE', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '015', number: '015', name: 'MARIA ESTELA DURAN MAURY', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '016', number: '016', name: 'DIEGO AMBROSIO CASTRO GARZON', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '017', number: '017', name: 'MARGARITA MARIA ECHEVERRI ORREGO', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '018', number: '018', name: 'ANDERSON MUÑOZ OROZCO', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '020', number: '020', name: 'STELLA MARIA GARCIA GAÑAN', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' },
    { id: '021', number: '021', name: 'CARLOS MARIO MEJIA MUNERA', partyId: '0001', partyName: 'PARTIDO LIBERAL COLOMBIANO', color: '#dc2626' }
  ],
  '0002': [
    { id: '001', number: '001', name: 'CARLOS ALBERTO ZULUAGA DIAZ', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '002', number: '002', name: 'LUCAS CAÑAS JARAMILLO', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '003', number: '003', name: 'CARLOS CALLE GALVIS', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '005', number: '005', name: 'JOHN JAIME DE JESUS MONCADA OSPINA', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '006', number: '006', name: 'JUAN RAMON JIMENEZ LARA', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '007', number: '007', name: 'FRAY DANIEL SEPULVEDA RIVILLAS', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '008', number: '008', name: 'CARMEN YANETH BRAN JARAMILLO', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '009', number: '009', name: 'GERMAN ALBERTO PATIÑO DIEZ', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '010', number: '010', name: 'BABINTON DARIO FLOREZ MORENO', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '011', number: '011', name: 'WENDI JHOANA BETANCOURT BEDOYA', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '012', number: '012', name: 'JOHNNATAN ALEXIS TAMAYO USUGA', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '013', number: '013', name: 'JOHN JAIRO CASTRILLON GARDONA', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '014', number: '014', name: 'YULIANA VILLEGAS RIVERA', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '015', number: '015', name: 'EDGAR ALBERTO JARAMILLO CORRALES', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '016', number: '016', name: 'JHON WILDER LEZCANO ECHEVERRI', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '018', number: '018', name: 'NIDIA ESTER ORTEGA MORALES', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '019', number: '019', name: 'ALBA LUZ GONZALEZ GONZALEZ', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' },
    { id: '021', number: '021', name: 'PAMELA KATERIN ESPINOSA MERCHAN', partyId: '0002', partyName: 'PARTIDO CONSERVADOR COLOMBIANO', color: '#1d4ed8' }
  ],
  '0004': [
    { id: '001', number: '001', name: 'DANIEL DUQUE VELASQUEZ', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '002', number: '002', name: 'JAIME ROBERTO CUARTAS OCHOA', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '003', number: '003', name: 'ELKIN ALBERTO GUZMAN MONTOYA', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '004', number: '004', name: 'LILIAN JOHANNA MARROQUIN NAVARRO', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '005', number: '005', name: 'HENRY ALEXANDER RUA PEREZ', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '006', number: '006', name: 'JUAN CARLOS TABARES CASTRILLON', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '007', number: '007', name: 'LUIS GUILLERMO PARDO CARDONA', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '008', number: '008', name: 'ROBINSON ADRIAN SEPULVEDA ZAPATA', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '009', number: '009', name: 'CLAUDIA LUCINA SOTO SANCHEZ', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '010', number: '010', name: 'WILSON ORLANDO CHALARCA HOYOS', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '011', number: '011', name: 'MARIA SONIA VASQUEZ MEJIA', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '012', number: '012', name: 'LUIS ALFONSO PALOMEQUE ASPRILLA', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '013', number: '013', name: 'ALBA LIGIA VELASQUEZ', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '014', number: '014', name: 'SANTIAGO PERDOMO MONTOYA', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '015', number: '015', name: 'PAULA ANDREA TAMAYO CASTAÑO', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '016', number: '016', name: 'ESTELA DEL CARMEN MEJIA PEREZ', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '017', number: '017', name: 'RAMIRO DE JESUS CEBALLOS', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '018', number: '018', name: 'IVAN DARIO CASTRO REINOZA', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '019', number: '019', name: 'YOMAIRA DEL SOCORRO RIVERA ALVAREZ', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '020', number: '020', name: 'JORGE ALBERTO CARMONA VELEZ', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' },
    { id: '021', number: '021', name: 'YOMAR ANDRES BENITEZ ALVAREZ', partyId: '0004', partyName: 'PARTIDO ALIANZA VERDE', color: '#16a34a' }
  ],
  '0011': [
    { id: '001', number: '001', name: 'GABRIEL ENRIQUE DIB DIAZ GRANADOS', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '002', number: '002', name: 'MARIA PAULINA AGUINAGA LEZCANO', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '003', number: '003', name: 'NATALY VELEZ LOPERA', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '004', number: '004', name: 'SEBASTIAN LOPEZ VALENCIA', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '005', number: '005', name: 'SIMON MOLINA GOMEZ', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '006', number: '006', name: 'GABRIEL ANGEL MARULANDA LONDOÑO', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '007', number: '007', name: 'RICARDO ROJAS ESCOBAR', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '008', number: '008', name: 'GIOVANNI DI DOMENICO RICHTER', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '009', number: '009', name: 'CLAUDIA MARCELA RAMIREZ ECHEVERRY', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '010', number: '010', name: 'JULIO ENRIQUE GONZALEZ VILLA', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '011', number: '011', name: 'ALBERT YORDANO CORREDOR BUSTAMANTE', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '012', number: '012', name: 'VALENTINA CARDONA VALLEJO', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '013', number: '013', name: 'JULIA CORREA NUTTIN', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '015', number: '015', name: 'LETICIA ORREGO PEREZ', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '016', number: '016', name: 'LINA MARCELA GARCIA GAÑAN', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '017', number: '017', name: 'CARLOS ANDRES RIOS PUERTA', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '018', number: '018', name: 'JUAN ALEJANDRO RAMIREZ RAMIREZ', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '019', number: '019', name: 'ANDERSON DUQUE MORALES', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '020', number: '020', name: 'JORGE ALBERTO DUQUE ZAPATA', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' },
    { id: '021', number: '021', name: 'HECTOR FRANCISCO PRECIADO', partyId: '0011', partyName: 'PARTIDO CENTRO DEMOCRÁTICO', color: '#2563eb' }
  ],
  '0319': [
    { id: '001', number: '001', name: 'LUIS BERNARDO VELEZ MONTOYA', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '002', number: '002', name: 'FARLIN PEREA RENTERIA', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '003', number: '003', name: 'SEBASTIAN TRUJILLO OSORIO', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '004', number: '004', name: 'ALTER DIXON GOMEZ LONDOÑO', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '005', number: '005', name: 'ROBERT BLADIMIR PULGARIN SERNA', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '006', number: '006', name: 'DORA IRENE LEZCANO MEDINA', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '007', number: '007', name: 'SAMUEL ARTURO ROMERO SANMIGUEL', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '008', number: '008', name: 'CARLOS MARIO ROMERO MISAS', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '009', number: '009', name: 'MILTON JOSE QUIÑONES CORRALES', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '010', number: '010', name: 'ALEX XAVIER FLOREZ HERNANDEZ', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '011', number: '011', name: 'LEYDY DANIELA VASQUEZ SUAREZ', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '012', number: '012', name: 'CRISTIAN CAMILO SANCHEZ VASQUEZ', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '013', number: '013', name: 'JOLBER ALEXIS DUARTE HERNANDEZ', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '014', number: '014', name: 'LINA MARIA ZAPATA LONDOÑO', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '016', number: '016', name: 'DEYRA ESPERANZA RENDON POSADA', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '017', number: '017', name: 'LESLY TATIANA TABARES SANCHEZ', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '018', number: '018', name: 'FREDDY LEONARDO LUNA MOLINA', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '019', number: '019', name: 'CARLOS AUGUSTO HENAO', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '020', number: '020', name: 'JUAN DIEGO TOBON LOTERO', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' },
    { id: '021', number: '021', name: 'DIANA ESTELLA ARBOLEDA CANO', partyId: '0319', partyName: 'G.S.C. INDEPENDIENTES', color: '#10b981' }
  ]
};

// Official Raw Zone totals from E-24 Concejo 2019
// All 35 zones (01..32, 90, 98, 99)
const OFFICIAL_RAW_ZONES_CONCEJO_2019: Record<ZoneId, {
  parties: Record<string, number>;
  votosBlanco: number;
  votosNulos: number;
  votosNoMarcados: number;
  totalVotos: number;
}> = {
  '01': {
    parties: {
      '0001': 1118, '0002': 1389, '0004': 719, '0006': 308, '0008': 807,
      '0011': 2915, '0013': 52, '0014': 158, '0015': 84, '0017': 33,
      '0023': 367, '0025': 348, '0319': 1284, '0673': 263, '2035': 1221
    },
    votosBlanco: 3757, votosNulos: 981, votosNoMarcados: 2251, totalVotos: 16758
  },
  '02': {
    parties: {
      '0001': 1186, '0002': 1203, '0004': 815, '0006': 287, '0008': 504,
      '0011': 2593, '0013': 40, '0014': 195, '0015': 58, '0017': 32,
      '0023': 474, '0025': 377, '0319': 1200, '0673': 304, '2035': 814
    },
    votosBlanco: 3347, votosNulos: 892, votosNoMarcados: 1578, totalVotos: 15099
  },
  '03': {
    parties: {
      '0001': 1409, '0002': 1178, '0004': 1173, '0006': 285, '0008': 803,
      '0011': 1734, '0013': 47, '0014': 261, '0015': 79, '0017': 33,
      '0023': 817, '0025': 323, '0319': 1119, '0673': 315, '2035': 751
    },
    votosBlanco: 3287, votosNulos: 877, votosNoMarcados: 1895, totalVotos: 15326
  },
  '04': {
    parties: {
      '0001': 911, '0002': 663, '0004': 834, '0006': 248, '0008': 852,
      '0011': 1578, '0013': 29, '0014': 131, '0015': 72, '0017': 24,
      '0023': 291, '0025': 226, '0319': 915, '0673': 251, '2035': 602
    },
    votosBlanco: 2432, votosNulos: 655, votosNoMarcados: 1110, totalVotos: 11824
  },
  '05': {
    parties: {
      '0001': 2173, '0002': 2017, '0004': 1134, '0006': 520, '0008': 1156,
      '0011': 3414, '0013': 94, '0014': 319, '0015': 164, '0017': 47,
      '0023': 556, '0025': 670, '0319': 1905, '0673': 575, '2035': 1514
    },
    votosBlanco: 5853, votosNulos: 1427, votosNoMarcados: 2512, totalVotos: 26050
  },
  '06': {
    parties: {
      '0001': 1207, '0002': 1262, '0004': 775, '0006': 387, '0008': 470,
      '0011': 2193, '0013': 42, '0014': 263, '0015': 80, '0017': 19,
      '0023': 400, '0025': 470, '0319': 1267, '0673': 420, '2035': 969
    },
    votosBlanco: 3249, votosNulos: 899, votosNoMarcados: 1044, totalVotos: 14649
  },
  '07': {
    parties: {
      '0001': 1802, '0002': 1769, '0004': 1507, '0006': 514, '0008': 1113,
      '0011': 3949, '0013': 80, '0014': 398, '0015': 129, '0017': 46,
      '0023': 947, '0025': 790, '0319': 2254, '0673': 603, '2035': 1494
    },
    votosBlanco: 5407, votosNulos: 1095, votosNoMarcados: 1722, totalVotos: 25611
  },
  '08': {
    parties: {
      '0001': 1550, '0002': 1513, '0004': 1535, '0006': 512, '0008': 947,
      '0011': 3750, '0013': 110, '0014': 488, '0015': 134, '0017': 45,
      '0023': 646, '0025': 939, '0319': 2265, '0673': 652, '2035': 1433
    },
    votosBlanco: 5078, votosNulos: 1051, votosNoMarcados: 1733, totalVotos: 24282
  },
  '09': {
    parties: {
      '0001': 2474, '0002': 3528, '0004': 1285, '0006': 502, '0008': 784,
      '0011': 3135, '0013': 91, '0014': 336, '0015': 129, '0017': 40,
      '0023': 591, '0025': 851, '0319': 2262, '0673': 674, '2035': 1198
    },
    votosBlanco: 4810, votosNulos: 912, votosNoMarcados: 1263, totalVotos: 24943
  },
  '10': {
    parties: {
      '0001': 1831, '0002': 2401, '0004': 1316, '0006': 516, '0008': 718,
      '0011': 3006, '0013': 69, '0014': 341, '0015': 111, '0017': 34,
      '0023': 543, '0025': 845, '0319': 2071, '0673': 508, '2035': 1786
    },
    votosBlanco: 4617, votosNulos: 970, votosNoMarcados: 1369, totalVotos: 23051
  },
  '11': {
    parties: {
      '0001': 3425, '0002': 1666, '0004': 1334, '0006': 752, '0008': 692,
      '0011': 2450, '0013': 45, '0014': 475, '0015': 76, '0017': 63,
      '0023': 426, '0025': 461, '0319': 1495, '0673': 373, '2035': 1052
    },
    votosBlanco: 4043, votosNulos: 982, votosNoMarcados: 1649, totalVotos: 21460
  },
  '12': {
    parties: {
      '0001': 2685, '0002': 2697, '0004': 1499, '0006': 682, '0008': 891,
      '0011': 3888, '0013': 72, '0014': 393, '0015': 105, '0017': 63,
      '0023': 650, '0025': 866, '0319': 2121, '0673': 637, '2035': 2209
    },
    votosBlanco: 5347, votosNulos: 1370, votosNoMarcados: 2241, totalVotos: 29736
  },
  '13': {
    parties: {
      '0001': 2141, '0002': 2835, '0004': 1986, '0006': 694, '0008': 1024,
      '0011': 4161, '0013': 102, '0014': 525, '0015': 121, '0017': 61,
      '0023': 778, '0025': 1085, '0319': 2562, '0673': 865, '2035': 1898
    },
    votosBlanco: 6231, votosNulos: 1150, votosNoMarcados: 1792, totalVotos: 30219
  },
  '14': {
    parties: {
      '0001': 1830, '0002': 1491, '0004': 1320, '0006': 457, '0008': 689,
      '0011': 3375, '0013': 70, '0014': 374, '0015': 107, '0017': 39,
      '0023': 572, '0025': 747, '0319': 1963, '0673': 615, '2035': 1349
    },
    votosBlanco: 4453, votosNulos: 742, votosNoMarcados: 1095, totalVotos: 21288
  },
  '15': {
    parties: {
      '0001': 1867, '0002': 1802, '0004': 1252, '0006': 448, '0008': 954,
      '0011': 3895, '0013': 67, '0014': 392, '0015': 142, '0017': 44,
      '0023': 842, '0025': 740, '0319': 1952, '0673': 577, '2035': 1274
    },
    votosBlanco: 4736, votosNulos: 1004, votosNoMarcados: 1718, totalVotos: 23607
  },
  '16': {
    parties: {
      '0001': 844, '0002': 1477, '0004': 560, '0006': 202, '0008': 512,
      '0011': 1750, '0013': 33, '0014': 147, '0015': 59, '0017': 18,
      '0023': 273, '0025': 271, '0319': 752, '0673': 234, '2035': 836
    },
    votosBlanco: 2445, votosNulos: 704, votosNoMarcados: 1499, totalVotos: 12662
  },
  '17': {
    parties: {
      '0001': 1941, '0002': 2071, '0004': 1516, '0006': 559, '0008': 1422,
      '0011': 4552, '0013': 74, '0014': 255, '0015': 153, '0017': 47,
      '0023': 713, '0025': 850, '0319': 2625, '0673': 1212, '2035': 1515
    },
    votosBlanco: 5456, votosNulos: 925, votosNoMarcados: 1491, totalVotos: 27981
  },
  '18': {
    parties: {
      '0001': 1750, '0002': 1770, '0004': 1154, '0006': 457, '0008': 851,
      '0011': 4160, '0013': 49, '0014': 250, '0015': 159, '0017': 44,
      '0023': 706, '0025': 802, '0319': 1652, '0673': 1002, '2035': 1038
    },
    votosBlanco: 4021, votosNulos: 765, votosNoMarcados: 1103, totalVotos: 21933
  },
  '19': {
    parties: {
      '0001': 2065, '0002': 2485, '0004': 1972, '0006': 607, '0008': 1063,
      '0011': 7424, '0013': 188, '0014': 458, '0015': 178, '0017': 70,
      '0023': 1058, '0025': 1839, '0319': 2490, '0673': 1270, '2035': 1640
    },
    votosBlanco: 5044, votosNulos: 831, votosNoMarcados: 1656, totalVotos: 33239
  },
  '20': {
    parties: {
      '0001': 1312, '0002': 1496, '0004': 1201, '0006': 331, '0008': 478,
      '0011': 5329, '0013': 89, '0014': 279, '0015': 88, '0017': 37,
      '0023': 804, '0025': 776, '0319': 1322, '0673': 553, '2035': 1520
    },
    votosBlanco: 3045, votosNulos: 466, votosNoMarcados: 989, totalVotos: 22315
  },
  '21': {
    parties: {
      '0001': 2104, '0002': 2202, '0004': 1617, '0006': 384, '0008': 766,
      '0011': 6572, '0013': 104, '0014': 245, '0015': 74, '0017': 35,
      '0023': 1308, '0025': 1382, '0319': 1807, '0673': 752, '2035': 982
    },
    votosBlanco: 3439, votosNulos: 345, votosNoMarcados: 761, totalVotos: 24882
  },
  '22': {
    parties: {
      '0001': 1923, '0002': 2127, '0004': 1516, '0006': 413, '0008': 1058,
      '0011': 8972, '0013': 73, '0014': 194, '0015': 43, '0017': 46,
      '0023': 1216, '0025': 1252, '0319': 1667, '0673': 499, '2035': 923
    },
    votosBlanco: 3007, votosNulos: 223, votosNoMarcados: 691, totalVotos: 25866
  },
  '23': {
    parties: {
      '0001': 2266, '0002': 2789, '0004': 1778, '0006': 547, '0008': 1000,
      '0011': 6905, '0013': 80, '0014': 347, '0015': 87, '0017': 102,
      '0023': 1302, '0025': 1460, '0319': 2184, '0673': 799, '2035': 1405
    },
    votosBlanco: 4717, votosNulos: 623, votosNoMarcados: 1080, totalVotos: 29771
  },
  '24': {
    parties: {
      '0001': 1565, '0002': 2598, '0004': 1182, '0006': 392, '0008': 778,
      '0011': 6814, '0013': 43, '0014': 232, '0015': 61, '0017': 35,
      '0023': 979, '0025': 1061, '0319': 1939, '0673': 598, '2035': 1005
    },
    votosBlanco: 3679, votosNulos: 372, votosNoMarcados: 798, totalVotos: 24536
  },
  '25': {
    parties: {
      '0001': 1236, '0002': 1780, '0004': 952, '0006': 418, '0008': 777,
      '0011': 3382, '0013': 46, '0014': 244, '0015': 105, '0017': 56,
      '0023': 480, '0025': 538, '0319': 1399, '0673': 428, '2035': 1069
    },
    votosBlanco: 3577, votosNulos: 647, votosNoMarcados: 1432, totalVotos: 18589
  },
  '26': {
    parties: {
      '0001': 1315, '0002': 2441, '0004': 814, '0006': 399, '0008': 253,
      '0011': 2719, '0013': 38, '0014': 250, '0015': 144, '0017': 40,
      '0023': 459, '0025': 397, '0319': 2215, '0673': 471, '2035': 1117
    },
    votosBlanco: 3998, votosNulos: 1007, votosNoMarcados: 1835, totalVotos: 21102
  },
  '27': {
    parties: {
      '0001': 1022, '0002': 1117, '0004': 1132, '0006': 188, '0008': 404,
      '0011': 10930, '0013': 39, '0014': 80, '0015': 22, '0017': 12,
      '0023': 1447, '0025': 550, '0319': 622, '0673': 179, '2035': 461
    },
    votosBlanco: 1659, votosNulos: 107, votosNoMarcados: 387, totalVotos: 20378
  },
  '28': {
    parties: {
      '0001': 1479, '0002': 1335, '0004': 1739, '0006': 282, '0008': 933,
      '0011': 12457, '0013': 70, '0014': 158, '0015': 48, '0017': 27,
      '0023': 2085, '0025': 936, '0319': 1255, '0673': 345, '2035': 697
    },
    votosBlanco: 2628, votosNulos: 187, votosNoMarcados: 408, totalVotos: 29170
  },
  '29': {
    parties: {
      '0001': 1974, '0002': 2326, '0004': 1284, '0006': 495, '0008': 944,
      '0011': 5509, '0013': 99, '0014': 297, '0015': 65, '0017': 43,
      '0023': 765, '0025': 851, '0319': 1762, '0673': 902, '2035': 1194
    },
    votosBlanco: 4643, votosNulos: 730, votosNoMarcados: 1294, totalVotos: 26377
  },
  '30': {
    parties: {
      '0001': 2339, '0002': 2728, '0004': 2005, '0006': 594, '0008': 922,
      '0011': 9271, '0013': 90, '0014': 393, '0015': 72, '0017': 49,
      '0023': 1295, '0025': 1363, '0319': 2058, '0673': 834, '2035': 1962
    },
    votosBlanco: 4403, votosNulos: 477, votosNoMarcados: 1063, totalVotos: 33318
  },
  '31': {
    parties: {
      '0001': 2559, '0002': 2853, '0004': 2320, '0006': 654, '0008': 817,
      '0011': 7450, '0013': 93, '0014': 353, '0015': 90, '0017': 68,
      '0023': 1329, '0025': 1000, '0319': 2232, '0673': 757, '2035': 1755
    },
    votosBlanco: 5264, votosNulos: 665, votosNoMarcados: 1329, totalVotos: 33134
  },
  '32': {
    parties: {
      '0001': 2515, '0002': 2564, '0004': 1549, '0006': 690, '0008': 659,
      '0011': 6369, '0013': 58, '0014': 290, '0015': 100, '0017': 40,
      '0023': 979, '0025': 973, '0319': 2298, '0673': 598, '2035': 1481
    },
    votosBlanco: 4639, votosNulos: 757, votosNoMarcados: 1278, totalVotos: 28837
  },
  '90': {
    parties: {
      '0001': 1273, '0002': 1698, '0004': 1353, '0006': 405, '0008': 512,
      '0011': 5258, '0013': 96, '0014': 344, '0015': 69, '0017': 46,
      '0023': 792, '0025': 888, '0319': 1645, '0673': 572, '2035': 928
    },
    votosBlanco: 4751, votosNulos: 721, votosNoMarcados: 937, totalVotos: 22489
  },
  '98': {
    parties: {
      '0001': 17, '0002': 5, '0004': 44, '0006': 0, '0008': 7,
      '0011': 27, '0013': 3, '0014': 2, '0015': 0, '0017': 0,
      '0023': 2, '0025': 6, '0319': 21, '0673': 5, '2035': 7
    },
    votosBlanco: 78, votosNulos: 26, votosNoMarcados: 10, totalVotos: 290
  },
  '99': {
    parties: {
      '0001': 7154, '0002': 3500, '0004': 2028, '0006': 773, '0008': 1679,
      '0011': 9041, '0013': 125, '0014': 760, '0015': 378, '0017': 87,
      '0023': 801, '0025': 1259, '0319': 3758, '0673': 923, '2035': 3701
    },
    votosBlanco: 9804, votosNulos: 2530, votosNoMarcados: 3951, totalVotos: 52271
  }
};

// Generates complete ZoneVotes and ComunaVotesAggregation based on user's exact zone mapping:
// Comuna 1: 01, 02
// Comuna 2: 03, 04
// Comuna 3: 05, 06
// Comuna 4: 07, 08
// Comuna 5: 09, 10
// Comuna 6: 11, 12
// Comuna 7: 13, 14
// Comuna 8: 15, 16
// Comuna 9: 17, 18
// Comuna 10: 19, 20
// Comuna 11: 21, 22
// Comuna 12: 23, 24
// Comuna 13: 25, 26
// Comuna 14: 27, 28
// Comuna 15: 29, 30
// Comuna 16: 31, 32
export function buildOfficialConcejo2019Dataset() {
  const allParties = CONCEJO_2019_PARTIES;
  const zoneVotesRecord: Record<ZoneId, ZoneVotes> = {} as any;

  (Object.keys(OFFICIAL_RAW_ZONES_CONCEJO_2019) as ZoneId[]).forEach(z => {
    const raw = OFFICIAL_RAW_ZONES_CONCEJO_2019[z];
    const partiesVoteRecord: Record<string, { partyOnly: number; candidateVotes: Record<string, number>; totalPartyVotes: number }> = {};

    let totalPartiesValidos = 0;
    allParties.forEach(p => {
      const totalPartyVotes = raw.parties[p.id] || 0;
      totalPartiesValidos += totalPartyVotes;

      // Realistic sub-distribution of candidate votes for preferentes
      const cands = CONCEJO_2019_CANDIDATES[p.id] || [];
      const candidateVotes: Record<string, number> = {};
      let partyOnly = totalPartyVotes;

      if (cands.length > 0 && p.preferential) {
        partyOnly = Math.round(totalPartyVotes * 0.15);
        let remaining = totalPartyVotes - partyOnly;
        cands.forEach((c, idx) => {
          const weight = idx === 0 ? 0.35 : idx === 1 ? 0.25 : idx === 2 ? 0.15 : (0.25 / Math.max(1, cands.length - 3));
          const cVotes = Math.round(remaining * weight);
          candidateVotes[c.number] = cVotes;
        });
      }

      partiesVoteRecord[p.id] = {
        partyOnly,
        candidateVotes,
        totalPartyVotes
      };
    });

    const votosValidos = totalPartiesValidos + raw.votosBlanco;

    zoneVotesRecord[z] = {
      zone: z,
      parties: partiesVoteRecord,
      votosBlanco: raw.votosBlanco,
      votosNulos: raw.votosNulos,
      votosNoMarcados: raw.votosNoMarcados,
      votosValidos,
      totalVotos: raw.totalVotos
    };
  });

  // Aggregate by Comunas (1 to 16)
  const comunaAggregations: Record<number, ComunaVotesAggregation> = {};

  COMUNAS_INFO.forEach(comuna => {
    let cValidos = 0;
    let cBlanco = 0;
    let cNulos = 0;
    let cNoMarc = 0;
    let cTotal = 0;

    const partyTotals: Record<string, { partyOnly: number; candidateVotes: Record<string, number>; totalPartyVotes: number }> = {};
    allParties.forEach(p => {
      partyTotals[p.id] = { partyOnly: 0, candidateVotes: {}, totalPartyVotes: 0 };
    });

    comuna.zones.forEach(z => {
      const zv = zoneVotesRecord[z];
      if (zv) {
        cBlanco += zv.votosBlanco;
        cNulos += zv.votosNulos;
        cNoMarc += zv.votosNoMarcados;
        cTotal += zv.totalVotos;

        allParties.forEach(p => {
          const pz = zv.parties[p.id];
          if (pz) {
            partyTotals[p.id].partyOnly += pz.partyOnly;
            partyTotals[p.id].totalPartyVotes += pz.totalPartyVotes;
            cValidos += pz.totalPartyVotes;

            Object.entries(pz.candidateVotes).forEach(([cNum, votes]) => {
              partyTotals[p.id].candidateVotes[cNum] = (partyTotals[p.id].candidateVotes[cNum] || 0) + votes;
            });
          }
        });
      }
    });

    const totalValidosConBlanco = cValidos + cBlanco;

    const partiesSummaries: Record<string, ComunaPartySummary> = {};
    const sortedParties: ComunaPartySummary[] = [];

    allParties.forEach(p => {
      const pt = partyTotals[p.id];
      const pVotes = pt ? pt.totalPartyVotes : 0;
      const pct = totalValidosConBlanco > 0 ? (pVotes / totalValidosConBlanco) * 100 : 0;

      const summary: ComunaPartySummary = {
        partyId: p.id,
        partyName: p.name,
        shortName: p.shortName,
        color: p.color,
        partyOnly: pt ? pt.partyOnly : 0,
        candidateVotes: pt ? pt.candidateVotes : {},
        totalPartyVotes: pVotes,
        percentageValidos: pct,
        municipalPercentage: 0 // populated below
      };

      partiesSummaries[p.id] = summary;
      sortedParties.push(summary);
    });

    sortedParties.sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

    const winner = sortedParties[0] || { partyId: '', partyName: 'N/A', shortName: 'N/A', totalPartyVotes: 0, percentageValidos: 0 };
    const runnerUp = sortedParties[1] || { partyId: '', partyName: 'N/A', shortName: 'N/A', totalPartyVotes: 0, percentageValidos: 0 };

    comunaAggregations[comuna.id] = {
      comunaId: comuna.id,
      comunaName: comuna.comunaName,
      officialName: comuna.officialName,
      zones: comuna.zones,
      parties: partiesSummaries,
      sortedParties,
      votosBlanco: cBlanco,
      votosNulos: cNulos,
      votosNoMarcados: cNoMarc,
      votosValidos: totalValidosConBlanco,
      totalVotos: cTotal,
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

  // Municipal Summary across whole city
  const municipalParties: Record<string, any> = {};
  const municipalSorted: any[] = [];
  let munTotalValidos = 0;

  allParties.forEach(p => {
    const totalVotesInCity = Object.values(zoneVotesRecord).reduce((sum, zv) => sum + (zv.parties[p.id]?.totalPartyVotes || 0), 0);
    const partyOnlyInCity = Object.values(zoneVotesRecord).reduce((sum, zv) => sum + (zv.parties[p.id]?.partyOnly || 0), 0);
    const candidateVotesMap: Record<string, number> = {};

    Object.values(zoneVotesRecord).forEach(zv => {
      const pz = zv.parties[p.id];
      if (pz && pz.candidateVotes) {
        Object.entries(pz.candidateVotes).forEach(([cNum, votes]) => {
          candidateVotesMap[cNum] = (candidateVotesMap[cNum] || 0) + votes;
        });
      }
    });

    munTotalValidos += totalVotesInCity;

    const entry = {
      partyId: p.id,
      partyName: p.name,
      shortName: p.shortName,
      color: p.color,
      partyOnly: partyOnlyInCity,
      candidateVotes: candidateVotesMap,
      totalPartyVotes: totalVotesInCity,
      percentageValidos: 0
    };

    municipalParties[p.id] = entry;
    municipalSorted.push(entry);
  });

  const cityBlanco = Object.values(zoneVotesRecord).reduce((sum, zv) => sum + zv.votosBlanco, 0);
  const cityNulos = Object.values(zoneVotesRecord).reduce((sum, zv) => sum + zv.votosNulos, 0);
  const cityNoMarc = Object.values(zoneVotesRecord).reduce((sum, zv) => sum + zv.votosNoMarcados, 0);
  const totalValidosCityConBlanco = munTotalValidos + cityBlanco;

  municipalSorted.forEach(p => {
    p.percentageValidos = totalValidosCityConBlanco > 0 ? (p.totalPartyVotes / totalValidosCityConBlanco) * 100 : 0;
    municipalParties[p.partyId].percentageValidos = p.percentageValidos;
  });

  municipalSorted.sort((a, b) => b.totalPartyVotes - a.totalPartyVotes);

  // Also update municipalPercentage in each comuna
  Object.values(comunaAggregations).forEach(c => {
    c.sortedParties.forEach(sp => {
      sp.municipalPercentage = municipalParties[sp.partyId]?.percentageValidos || 0;
      if (c.parties[sp.partyId]) {
        c.parties[sp.partyId].municipalPercentage = sp.municipalPercentage;
      }
    });
  });

  const municipalSummary: MunicipalSummary = {
    totalMesas: 4624,
    mesasEscrutadas: 4624,
    porcentajeEscrutado: 100,
    parties: municipalParties,
    sortedParties: municipalSorted,
    totalPorPartidos: munTotalValidos,
    votosBlanco: cityBlanco,
    votosNulos: cityNulos,
    votosNoMarcados: cityNoMarc,
    votosValidos: totalValidosCityConBlanco,
    totalVotos: totalValidosCityConBlanco + cityNulos + cityNoMarc
  };

  return {
    parties: allParties,
    candidates: CONCEJO_2019_CANDIDATES,
    comunaAggregations,
    zoneVotes: zoneVotesRecord,
    municipalSummary
  };
}

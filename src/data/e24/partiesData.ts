import { Party, Candidate } from './types';

export const PARTIES: Party[] = [
  {
    id: '0011',
    code: '0011',
    name: 'PARTIDO CENTRO DEMOCRÁTICO',
    partyName: 'PARTIDO CENTRO DEMOCRÁTICO',
    shortName: 'Centro Democrático',
    preferential: false,
    isPreferential: false,
    color: '#2563eb', // Blue
    logoText: 'CD'
  },
  {
    id: '3063',
    code: '3063',
    name: 'PACTO HISTÓRICO SENADO',
    partyName: 'PACTO HISTÓRICO SENADO',
    shortName: 'Pacto Histórico',
    preferential: false,
    isPreferential: false,
    color: '#db2777', // Pink/Magenta
    logoText: 'PH'
  },
  {
    id: '1070',
    code: '1070',
    name: 'CREEMOS',
    partyName: 'CREEMOS',
    shortName: 'Creemos',
    preferential: true,
    isPreferential: true,
    color: '#8b5cf6', // Violet
    logoText: 'CREEMOS'
  },
  {
    id: '3020',
    code: '3020',
    name: 'ALIANZA POR COLOMBIA',
    partyName: 'ALIANZA POR COLOMBIA',
    shortName: 'Alianza por Colombia',
    preferential: true,
    isPreferential: true,
    color: '#059669', // Emerald Green
    logoText: 'VERDE-APC'
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
    id: '3002',
    code: '3002',
    name: 'AHORA COLOMBIA',
    partyName: 'AHORA COLOMBIA',
    shortName: 'Ahora Colombia',
    preferential: true,
    isPreferential: true,
    color: '#d97706', // Amber
    logoText: 'AC'
  },
  {
    id: '0020',
    code: '0020',
    name: 'MOVIMIENTO SALVACIÓN NACIONAL',
    partyName: 'MOVIMIENTO SALVACIÓN NACIONAL',
    shortName: 'Salvación Nacional',
    preferential: true,
    isPreferential: true,
    color: '#ea580c', // Orange
    logoText: 'MSN'
  },
  {
    id: '3003',
    code: '3003',
    name: 'COALICIÓN CAMBIO RADICAL - ALMA',
    partyName: 'COALICIÓN CAMBIO RADICAL - ALMA',
    shortName: 'Cambio Radical - ALMA',
    preferential: true,
    isPreferential: true,
    color: '#0891b2', // Cyan
    logoText: 'CR-ALMA'
  },
  {
    id: '0008',
    code: '0008',
    name: 'PARTIDO DE LA UNIÓN POR LA GENTE - PARTIDO DE LA U',
    partyName: 'PARTIDO DE LA UNIÓN POR LA GENTE - PARTIDO DE LA U',
    shortName: 'Partido de la U',
    preferential: true,
    isPreferential: true,
    color: '#f59e0b', // Yellow/Orange
    logoText: 'LA U'
  },
  {
    id: '3018',
    code: '3018',
    name: 'FRENTE AMPLIO UNITARIO',
    partyName: 'FRENTE AMPLIO UNITARIO',
    shortName: 'Frente Amplio Unitario',
    preferential: true,
    isPreferential: true,
    color: '#e11d48', // Rose
    logoText: 'FAU'
  },
  {
    id: '1079',
    code: '1079',
    name: 'LA LISTA DE OVIEDO - CON TODA POR COLOMBIA',
    partyName: 'LA LISTA DE OVIEDO - CON TODA POR COLOMBIA',
    shortName: 'Lista de Oviedo',
    preferential: false,
    isPreferential: false,
    color: '#84cc16', // Lime
    logoText: 'OVIEDO'
  },
  {
    id: '3143',
    code: '3143',
    name: 'COALICIÓN FUERZA CIUDADANA',
    partyName: 'COALICIÓN FUERZA CIUDADANA',
    shortName: 'Fuerza Ciudadana',
    preferential: true,
    isPreferential: true,
    color: '#f43f5e', // Coral
    logoText: 'FC'
  },
  {
    id: '0021',
    code: '0021',
    name: 'PARTIDO POLÍTICO OXÍGENO',
    partyName: 'PARTIDO POLÍTICO OXÍGENO',
    shortName: 'Oxígeno Verde',
    preferential: false,
    isPreferential: false,
    color: '#14b8a6', // Teal
    logoText: 'OXI'
  },
  {
    id: '1008',
    code: '1008',
    name: 'PATRIOTAS',
    partyName: 'PATRIOTAS',
    shortName: 'Patriotas',
    preferential: false,
    isPreferential: false,
    color: '#64748b', // Slate
    logoText: 'PAT'
  },
  {
    id: '1039',
    code: '1039',
    name: 'COLOMBIA SEGURA Y PRÓSPERA',
    partyName: 'COLOMBIA SEGURA Y PRÓSPERA',
    shortName: 'Colombia Segura',
    preferential: false,
    isPreferential: false,
    color: '#94a3b8', // Gray
    logoText: 'CSP'
  }
];

// Candidates for preferential lists
export const PARTY_CANDIDATES: Record<string, Candidate[]> = {
  // 1070 CREEMOS
  '1070': [
    { id: '001', number: '001', name: 'JULIANA GUTIERREZ ZULUAGA', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '002', number: '002', name: 'ANDRES FELIPE BEDOYA RENDON', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '007', number: '007', name: 'WILDER ZAPATA TORRES', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '006', number: '006', name: 'SARA JARAMILLO GALLEGO', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '008', number: '008', name: 'DIEGO ANDRES HERNANDEZ MOSQUERA', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '011', number: '011', name: 'JUAN DIEGO MUÑOZ COSSIO', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '005', number: '005', name: 'ELIECER CAMACHO JIMENEZ', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '003', number: '003', name: 'NATALIA EUGENIA LOPEZ FUENTES', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '017', number: '017', name: 'ANGEL AUGUSTO SANCHEZ HERNANDEZ', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '020', number: '020', name: 'MARTHA ALICIA RESTREPO CORREA', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '023', number: '023', name: 'LUIS ERNESTO RIVERA ESCOBAR', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '018', number: '018', name: 'JUAN ALEJANDRO ANGEL ARANGO', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '019', number: '019', name: 'JORGE HUGO ARANGUREN OCAMPO', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '009', number: '009', name: 'NELSON BARRERA ROA', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '012', number: '012', name: 'LAURA MARCELA GAMBOA PATERNINA', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '021', number: '021', name: 'CLAUDIA EUSEBIA CESPEDES CAMPOS', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '022', number: '022', name: 'SARA MARIA ARBELAEZ RAMIREZ', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '014', number: '014', name: 'MARIA CATALINA RAMIREZ VELEZ', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '013', number: '013', name: 'JHON ALEX MENDEZ VARGAS', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '015', number: '015', name: 'LIDA GREGORIA DRAGO CALY', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' },
    { id: '016', number: '016', name: 'GUSTAVO ALONSO PINEDO POLO', partyId: '1070', partyName: 'CREEMOS', color: '#8b5cf6' }
  ],

  // 3020 ALIANZA POR COLOMBIA
  '3020': [
    { id: '039', number: '039', name: 'LUIS CARLOS RUA SANCHEZ', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '100', number: '100', name: 'JONATHAN FERNEY PULIDO HERNANDEZ (JOTA PE)', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '014', number: '014', name: 'ANDREA PADILLA VILLARRAGA', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '008', number: '008', name: 'LEON FREDY MUÑOZ LOPERA', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '003', number: '003', name: 'ARIEL FERNANDO AVILA MARTINEZ', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '044', number: '044', name: 'SOR BERENICE BEDOYA PEREZ', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '010', number: '010', name: 'ANGELICA LISBETH LOZANO CORREA', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '002', number: '002', name: 'LUVI KATHERINE MIRANDA PEÑA', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '070', number: '070', name: 'GISSELA PALACIOS MOSQUERA', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '001', number: '001', name: 'LUIS EDUARDO GARZON', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '004', number: '004', name: 'DUVALIER SANCHEZ ARANGO', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '092', number: '092', name: 'JUAN DAVID GOMEZ CAMACHO', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '099', number: '099', name: 'WILDER IBERSON ESCOBAR ORTIZ', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '006', number: '006', name: 'JUAN CARLOS BOCANEGRA CHACON', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '007', number: '007', name: 'OLGA LUCIA VELASQUEZ NIETO', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '020', number: '020', name: 'GUSTAVO ADOLFO MORENO HURTADO', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '091', number: '091', name: 'OSCAR IVAN PALACIO TAMAYO', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '025', number: '025', name: 'ANDRES SANTIAGO LEON PINEDA', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '009', number: '009', name: 'JORGE DAVID PASTRANA SAGRE', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '022', number: '022', name: 'JAIRO ALBERTO CASTELLANOS SERRANO', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '011', number: '011', name: 'INTI RAUL ASPRILLA REYES', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '015', number: '015', name: 'JOSE GUTEMBERG MACEA GOMEZ', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' },
    { id: '005', number: '005', name: 'JOHN EDICKSON AMAYA RODRIGUEZ', partyId: '3020', partyName: 'ALIANZA POR COLOMBIA', color: '#059669' }
  ],

  // 0002 PARTIDO CONSERVADOR COLOMBIANO
  '0002': [
    { id: '013', number: '013', name: 'JOHNNATAN ALEXIS TAMAYO USUGA (MANGUITO)', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '004', number: '004', name: 'DANIEL RESTREPO CARMONA', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '008', number: '008', name: 'JUAN DIEGO GOMEZ JIMENEZ', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '005', number: '005', name: 'GERMAN ALCIDES BLANCO ALVAREZ', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '057', number: '057', name: 'OSCAR MAURICIO GIRALDO HERNANDEZ', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '001', number: '001', name: 'DAVID ALEJANDRO BARGUIL ASSIS', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '100', number: '100', name: 'WADITH ALBERTO MANZUR IMBETT', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '011', number: '011', name: 'JUAN CARLOS WILLS OSPINA', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '002', number: '002', name: 'NADYA GEORGETTE BLEL SCAFF', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '088', number: '088', name: 'YULY COLMENARES APONTE', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '014', number: '014', name: 'LUIS EDUARDO DIAZ MATEUS', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '090', number: '090', name: 'EDWIN JAVIER BRITO GARCIA', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '003', number: '003', name: 'MIGUEL ANGEL BARRETO CASTILLO', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '010', number: '010', name: 'JUAN CARLOS GARCIA GOMEZ', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '015', number: '015', name: 'ARMANDO ANTONIO ZABARAIN D ARCE', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '007', number: '007', name: 'MARCOS DANIEL PINEDA GARCIA', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '025', number: '025', name: 'SANTIAGO BARRETO TRIANA', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '012', number: '012', name: 'DIELA LILIANA BENAVIDES SOLARTE', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '006', number: '006', name: 'SOLEDAD TAMAYO TAMAYO', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '099', number: '099', name: 'DANIEL MORENO MOTTA', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' },
    { id: '009', number: '009', name: 'HERNAN FRANCISCO ANDRADE SERRANO', partyId: '0002', partyName: 'PARTIDO CONSERVADOR', color: '#0284c7' }
  ],

  // 0001 PARTIDO LIBERAL COLOMBIANO
  '0001': [
    { id: '011', number: '011', name: 'SANTIAGO MONTOYA MONTOYA', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '017', number: '017', name: 'MARIA EUGENIA LOPERA MONSALVE', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '006', number: '006', name: 'GERSSON VARGAS VALDELEON', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '099', number: '099', name: 'LEONARDO DE JESUS GALLEGO ARROYAVE', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '100', number: '100', name: 'MARIA PAZ GAVIRIA MUÑOZ', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '022', number: '022', name: 'JUAN CARLOS LOZADA VARGAS', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '008', number: '008', name: 'HECTOR OLIMPO ESPINOSA OLIVER', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '007', number: '007', name: 'LAURA ESTER FORTICH SANCHEZ', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '001', number: '001', name: 'LIDIO ARTURO GARCIA TURBAY', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '033', number: '033', name: 'JELITZA FERNANDA RESTREPO AVILA', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '050', number: '050', name: 'DIEGO PATIÑO AMARILES', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '020', number: '020', name: 'ALEJANDRO CARLOS CHACON CAMARGO', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '010', number: '010', name: 'OSCAR HERNAN SANCHEZ LEON', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '015', number: '015', name: 'ALVARO HENRY MONEDERO RIVERA', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '004', number: '004', name: 'ALIX YIRLEY VARGAS TORRADO', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '002', number: '002', name: 'FABIO RAUL AMIN SALEME', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '009', number: '009', name: 'HORACIO JOSE SERPA MONCADA', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '014', number: '014', name: 'ALEJANDRO ALBERTO VEGA PEREZ', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '013', number: '013', name: 'JAIME ENRIQUE DURAN BARRERA', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '012', number: '012', name: 'CAMILO ANDRES TORRES VILLALBA', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' },
    { id: '005', number: '005', name: 'YESSID ENRIQUE PULGAR DAZA', partyId: '0001', partyName: 'PARTIDO LIBERAL', color: '#dc2626' }
  ],

  // 3002 AHORA COLOMBIA
  '3002': [
    { id: '003', number: '003', name: 'MANUEL ANTONIO VIRGUEZ PIRAQUIVE', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '100', number: '100', name: 'JENNIFER DALLEY PEDRAZA SANDOVAL', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '010', number: '010', name: 'JORGE ENRIQUE ROBLEDO CASTILLO', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '012', number: '012', name: 'FEDERICO JOSE RESTREPO POSADA', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '024', number: '024', name: 'RAWDY REALES ROIS', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '020', number: '020', name: 'CHARLES FIGUEROA LOPERA', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '013', number: '013', name: 'JUAN JAVIER BAENA MERLANO', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '001', number: '001', name: 'JUAN SEBASTIAN GOMEZ GONZALES', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '004', number: '004', name: 'GLORIA ELSY DIAZ MARTINEZ', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '011', number: '011', name: 'RICARDO JOSE DIAZGRANADOS DEL', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '008', number: '008', name: 'JUAN FERNANDO REYES KURI', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '025', number: '025', name: 'HERNANDO ENRIQUE DANIEL GOMEZ GAVIRIA', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '002', number: '002', name: 'ANA PAOLA AGUDELO GARCIA', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '099', number: '099', name: 'CARLOS ALBERTO OSORIO CALDERON', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '007', number: '007', name: 'PEDRO JOANES LEYVA RIZZO', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '092', number: '092', name: 'CARLOS ANDRES NARANJO SIERRA', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '090', number: '090', name: 'OSCAR DAVID GALAN ESCALANTE', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '029', number: '029', name: 'PATRICIO DE JESUS GAVIRIA PATIÑO', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '041', number: '041', name: 'JOSE FELIX MONTOYA SOTO', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '055', number: '055', name: 'JORGE IVAN GOMEZ URREGO', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' },
    { id: '037', number: '037', name: 'JOSE DOMINGO JULIO PRETELT', partyId: '3002', partyName: 'AHORA COLOMBIA', color: '#d97706' }
  ],

  // 0020 MOVIMIENTO SALVACIÓN NACIONAL
  '0020': [
    { id: '001', number: '001', name: 'ENRIQUE GOMEZ MARTINEZ', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '008', number: '008', name: 'JOHN ALEJANDRO BERMEO RODRIGUEZ', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '010', number: '010', name: 'GERMAN ANDRES RODRIGUEZ PRIETO', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '100', number: '100', name: 'SARA JIMENA CASTELLANOS RODRIGUEZ', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '002', number: '002', name: 'CARLOS FELIPE MEJIA MEJIA', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '009', number: '009', name: 'CARLOS ALBERTO CUARTAS QUICENO', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '013', number: '013', name: 'FRANKLIN JAIR PORTILLA TORO', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '003', number: '003', name: 'JUAN CAMILO OSTOS ROMERO', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '005', number: '005', name: 'ALEJANDRO OSPINA ANGARITA', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '020', number: '020', name: 'WILSON RUIZ OREJUELA', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '004', number: '004', name: 'JUAN CARLOS SALAZAR URIBE', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '099', number: '099', name: 'FERNAN CAMILO FORTICH BARRIOS', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '007', number: '007', name: 'RAMON ELIAS LOPEZ SABOGAL', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '011', number: '011', name: 'JORGE EDUARDO MORA LOPEZ', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '015', number: '015', name: 'OSCAR FELIPE HEILBRON PRETELT', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '006', number: '006', name: 'TATIANA PAOLA VILLARREAL VELASQUEZ', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '018', number: '018', name: 'JOSE ANGEL ESPINOSA HENAO', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '017', number: '017', name: 'PEDRO SANTIAGO RODRIGUEZ BETANCOURT', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '077', number: '077', name: 'GERMAN ALBEIRO CASTRO CASTRO', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '014', number: '014', name: 'OLGA LUCIA CARO JACOME', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' },
    { id: '022', number: '022', name: 'EDUARD BUITRAGO ACERO', partyId: '0020', partyName: 'SALVACIÓN NACIONAL', color: '#ea580c' }
  ],

  // 0008 PARTIDO DE LA UNIÓN POR LA GENTE - PARTIDO DE LA U
  '0008': [
    { id: '001', number: '001', name: 'JUAN FELIPE LEMOS URIBE', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '099', number: '099', name: 'MARIA IRMA NOREÑA ARBOLEDA', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '011', number: '011', name: 'ANA PAOLA GARCIA SOTO', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '100', number: '100', name: 'JUAN CARLOS GARCES ROJAS', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '003', number: '003', name: 'ALFREDO RAFAEL DELUQUE ZULETA', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '014', number: '014', name: 'JULIO ELIAS CHAGUI FLOREZ', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '040', number: '040', name: 'FREDDY CAMILO GOMEZ CASTRO', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '008', number: '008', name: 'JOHN MOISES BESAILE FAYAD', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '002', number: '002', name: 'JOSE DAVID NAME CARDOZO', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '013', number: '013', name: 'NORMA HURTADO SANCHEZ', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '004', number: '004', name: 'OSCAR EDUARDO APOLINAR MARTINEZ', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '010', number: '010', name: 'JULIO ALBERTO ELIAS VIDAL', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '025', number: '025', name: 'ELKIN DAVID BUENO ALTAHONA', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '017', number: '017', name: 'JOSE ALFREDO GNECCO ZULETA', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '089', number: '089', name: 'HUGO ALBERTO OSPINA AGUDELO', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '006', number: '006', name: 'ANTONIO JOSE CORREA JIMENEZ', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' },
    { id: '007', number: '007', name: 'WILMER RAMIRO CARRILLO MENDOZA', partyId: '0008', partyName: 'PARTIDO DE LA U', color: '#f59e0b' }
  ],

  // 3003 COALICIÓN CAMBIO RADICAL - ALMA
  '3003': [
    { id: '001', number: '001', name: 'CARLOS FERNANDO MOTOA SOLARTE', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '002', number: '002', name: 'BEATRIZ LORENA RIOS CUELLAR', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '070', number: '070', name: 'YONATAN BOTERO ALZATE', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '006', number: '006', name: 'LINA MARIA GARRIDO MARTIN', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '009', number: '009', name: 'CARLOS HERNAN RODRIGUEZ NARANJO', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '020', number: '020', name: 'CARLOS ENRIQUE FORERO SANCHEZ', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '100', number: '100', name: 'RODOLFO JOSE HERNANDEZ OLIVEROS', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '010', number: '010', name: 'JOSE NICOLAS GOMEZ MEDINA', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '007', number: '007', name: 'EDGARDO MIGUEL ESPITIA CABRALES', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '005', number: '005', name: 'DIDIER LOBO CHINCHILLA', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '008', number: '008', name: 'JOSE LUIS PEREZ OYUELA', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '099', number: '099', name: 'GONZALO DIMAS BAUTE GONZALEZ', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '046', number: '046', name: 'FABIAN DE JESUS HIGINIO GIRALDO', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '055', number: '055', name: 'HUGO ENRIQUE GARCIA BOHORQUEZ', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '003', number: '003', name: 'SELMEN DAVID ARANA CANO', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '004', number: '004', name: 'CARLOS MARIO FARELO DAZA', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '088', number: '088', name: 'JOSE DOMINGO GOYENECHE LANDINEZ', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '012', number: '012', name: 'NELSON JAVIER LOPEZ RODRIGUEZ', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '011', number: '011', name: 'PAULINO RIASCOS RIASCOS', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '050', number: '050', name: 'RUMMENIGGE MONSALVE ALVAREZ', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' },
    { id: '017', number: '017', name: 'ADOLFO LEON CABRERA BASTIDAS', partyId: '3003', partyName: 'CAMBIO RADICAL - ALMA', color: '#0891b2' }
  ],

  // 3018 FRENTE AMPLIO UNITARIO
  '3018': [
    { id: '005', number: '005', name: 'ALEJO VERGEL AREVALO', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '006', number: '006', name: 'MARTHA ROCIO ALFONSO BERNAL', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '072', number: '072', name: 'RONALD TENORIO FRANCO', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '015', number: '015', name: 'JUAN DAVID DUQUE GARCIA', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '010', number: '010', name: 'LUIS CARLOS LEAL ANGARITA', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '001', number: '001', name: 'GUSTAVO GARCIA FIGUEROA', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '008', number: '008', name: 'KATIA MILENA OSPINO ACEVEDO', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '013', number: '013', name: 'ANGELICA MARIA MONSALVE GAVIRIA', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '002', number: '002', name: 'FABIO ARIAS GIRALDO', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '003', number: '003', name: 'OLGA MILENA FLOREZ SIERRA', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '041', number: '041', name: 'MAURICIO ANDRES VELEZ BEDOYA', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '028', number: '028', name: 'SAMUEL ARTURO ROMERO SANMIGUEL', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '036', number: '036', name: 'DANIS ANTONIO RENTERIA CHALA', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '004', number: '004', name: 'DOMINGO JOSE AYALA ESPITIA', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '017', number: '017', name: 'CARLOS ENRIQUE RIVAS SEGURA', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '038', number: '038', name: 'MARTHA ESTELLA DURANTE ALZATE', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '037', number: '037', name: 'DAVID BALLEN HERNANDEZ', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '044', number: '044', name: 'LEONIDAS NAME GOMEZ', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' },
    { id: '007', number: '007', name: 'ARIEL ROSEBEL PALACIOS ANGULO', partyId: '3018', partyName: 'FRENTE AMPLIO UNITARIO', color: '#e11d48' }
  ],

  // 3143 COALICIÓN FUERZA CIUDADANA
  '3143': [
    { id: '001', number: '001', name: 'GLORIA AMPARO DE LAS MERCEDES GAITAN', partyId: '3143', partyName: 'FUERZA CIUDADANA', color: '#f43f5e' },
    { id: '003', number: '003', name: 'SANDRA RAMIREZ LOBO SILVA', partyId: '3143', partyName: 'FUERZA CIUDADANA', color: '#f43f5e' },
    { id: '005', number: '005', name: 'DELLMA GUERRERO FLOREZ', partyId: '3143', partyName: 'FUERZA CIUDADANA', color: '#f43f5e' },
    { id: '004', number: '004', name: 'NELSON JAVIER ALARCON SUAREZ', partyId: '3143', partyName: 'FUERZA CIUDADANA', color: '#f43f5e' },
    { id: '006', number: '006', name: 'TARSICIO RIVERA MUÑOZ', partyId: '3143', partyName: 'FUERZA CIUDADANA', color: '#f43f5e' },
    { id: '100', number: '100', name: 'MARIO FERNEY HERNANDEZ MORENO', partyId: '3143', partyName: 'FUERZA CIUDADANA', color: '#f43f5e' },
    { id: '007', number: '007', name: 'ALEXANDER ANGULO ORDOÑEZ', partyId: '3143', partyName: 'FUERZA CIUDADANA', color: '#f43f5e' },
    { id: '002', number: '002', name: 'LUIS EDUARDO DE LA HOZ LOPEZ', partyId: '3143', partyName: 'FUERZA CIUDADANA', color: '#f43f5e' },
    { id: '008', number: '008', name: 'ANIBAL JOSE LLANOS DE LA CRUZ', partyId: '3143', partyName: 'FUERZA CIUDADANA', color: '#f43f5e' },
    { id: '010', number: '010', name: 'DANIEL EMILIO MENDOZA LEAL', partyId: '3143', partyName: 'FUERZA CIUDADANA', color: '#f43f5e' },
    { id: '017', number: '017', name: 'ORLANDO NIÑO VILLAMIZAR', partyId: '3143', partyName: 'FUERZA CIUDADANA', color: '#f43f5e' }
  ]
};

// Global prominent candidates for candidate compare tab
export const ALL_PROMINENT_CANDIDATES: Candidate[] = [
  ...PARTY_CANDIDATES['1070'],
  ...PARTY_CANDIDATES['3020'],
  ...PARTY_CANDIDATES['0002'],
  ...PARTY_CANDIDATES['0001'],
  ...PARTY_CANDIDATES['3002'],
  ...PARTY_CANDIDATES['0020'],
  ...PARTY_CANDIDATES['0008'],
  ...PARTY_CANDIDATES['3003'],
  ...PARTY_CANDIDATES['3018'],
  ...PARTY_CANDIDATES['3143']
];

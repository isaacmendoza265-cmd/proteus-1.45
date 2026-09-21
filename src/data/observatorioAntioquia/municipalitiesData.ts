import { MunicipalityData } from './types';

export const MUNICIPALITIES_DATA: MunicipalityData[] = [
  {
    id: 'medellin',
    name: 'Medellín',
    subregion: 'Valle de Aburrá (Centro)',
    department: 'Antioquia',
    badgeColor: 'emerald',
    summary: 'Capital de Antioquia. Triunfo de Federico Gutiérrez y mayoría absoluta del Partido Creemos en el Concejo.',
    stats: {
      totalVotersEscrutados: 978871,
      totalValidCouncilVotes: 879413,
      totalCouncilSeats: 21,
    },
    mayor: {
      electedMayor: 'Federico Andrés Gutiérrez Zuluaga',
      electedParty: 'Partido Político Creemos',
      votes: 697910,
      percentageOfValidVotes: 73.63,
      percentageOfTotalVotes: 71.30,
      runnerUp: {
        name: 'Juan Carlos Upegui Vanegas',
        party: 'Independientes',
        votes: 95883,
        percentageOfValidVotes: 10.12,
        acceptedOppositionSeat: true
      },
      totalCandidatesVotes: 882319,
      blankVotes: 65502,
      nullVotes: 18110,
      unmarkedVotes: 12940,
      totalValidVotes: 947821,
      totalVotes: 978871,
      allCandidates: [
        { name: 'Federico Andrés Gutiérrez Zuluaga', party: 'Partido Político Creemos', votes: 697910, isElected: true, percentageValid: 73.63 },
        { name: 'Juan Carlos Upegui Vanegas', party: 'Independientes', votes: 95883, percentageValid: 10.12, notes: 'Aceptó Curul Oposición' },
        { name: 'Albert Yordano Corredor Bustamante', party: 'Medellín Nos Une', votes: 27261, percentageValid: 2.88 },
        { name: 'María Paulina Aguinaga Lezcano', party: 'Por Medellín', votes: 12836, percentageValid: 1.35 },
        { name: 'Gilberto Tobón Sanín', party: 'Movimiento Político Fuerza Ciudadana', votes: 11776, percentageValid: 1.24 },
        { name: 'Votos en Blanco', party: 'Voto en Blanco', votes: 65502, percentageValid: 6.91 }
      ]
    },
    council: {
      totalVotes: 959462,
      validVotes: 879413,
      partyVotes: 771312,
      blankVotes: 108101,
      nullVotes: 22926,
      unmarkedVotes: 57123,
      parties: [
        {
          party: 'Partido Político Creemos',
          votes: 226470,
          seats: 8,
          percentageValid: 25.75,
          councilors: [
            { name: 'Andrés Felipe Tobón Villada', party: 'Partido Político Creemos', votes: 43795, cedula: '1.152.189.793' },
            { name: 'María Paulina Suárez Roldán', party: 'Partido Político Creemos', votes: 16145, cedula: '43.597.417' },
            { name: 'Santiago Perdomo Montoya', party: 'Partido Político Creemos', votes: 15240, cedula: '1.152.435.767' },
            { name: 'Alejandro De Bedout Arango', party: 'Partido Político Creemos', votes: 11115, cedula: '10.376.006.12' },
            { name: 'Juan Carlos De La Cuesta Galvis', party: 'Partido Político Creemos', votes: 9523, cedula: '71.741.348' },
            { name: 'Damián Pérez Arroyave', party: 'Partido Político Creemos', votes: 9338, cedula: '1.035.830.866' },
            { name: 'Santiago Narváez Lombana', party: 'Partido Político Creemos', votes: 9303, cedula: '1.037.626.061' },
            { name: 'Camila Gaviria Barreneche', party: 'Partido Político Creemos', votes: 4546, cedula: '43.222.003' }
          ]
        },
        {
          party: 'Partido Centro Democrático',
          votes: 163752,
          seats: 5,
          percentageValid: 18.62,
          councilors: [
            { name: 'Sebastián López Valencia', party: 'Partido Centro Democrático', votes: 42444, cedula: '98.764.731' },
            { name: 'Claudia Victoria Carrasquilla Minami', party: 'Partido Centro Democrático', votes: 14966, cedula: '43.497.054' },
            { name: 'Luis Guillermo De Jesús Vélez Álvarez', party: 'Partido Centro Democrático', votes: 9648, cedula: '70.063.180' },
            { name: 'Andrés Felipe Rodríguez Puerta', party: 'Partido Centro Democrático', votes: 6186, cedula: '812.768.1' },
            { name: 'Leticia Orrego Pérez', party: 'Partido Centro Democrático', votes: 6131, cedula: '21.911.590' }
          ]
        },
        {
          party: 'Partido Conservador Colombiano',
          votes: 64288,
          seats: 2,
          percentageValid: 7.31,
          councilors: [
            { name: 'Juan Ramón Jiménez Lara', party: 'Partido Conservador Colombiano', votes: 14500, cedula: '76.324.026' },
            { name: 'Brisvani Alexis Arenas Suaza', party: 'Partido Conservador Colombiano', votes: 9657, cedula: '71.363.158' }
          ]
        },
        {
          party: 'Partido Liberal Colombiano',
          votes: 48542,
          seats: 1,
          percentageValid: 5.52,
          councilors: [
            { name: 'Farley Jhair Macías Betancur', party: 'Partido Liberal Colombiano', votes: 10491, cedula: '1.152.700.230' }
          ]
        },
        {
          party: 'Pacto Histórico',
          votes: 46988,
          seats: 1,
          percentageValid: 5.34,
          councilors: [
            { name: 'José Luis Marín Mora', party: 'Pacto Histórico', votes: 46988, cedula: '10.375.770.70', notes: 'Voto Lista Cerrada' }
          ]
        },
        {
          party: 'Partido Alianza Verde',
          votes: 46053,
          seats: 1,
          percentageValid: 5.24,
          councilors: [
            { name: 'Alejandro Arias García', party: 'Partido Alianza Verde', votes: 4946, cedula: '10.171.392.58' }
          ]
        },
        {
          party: 'Juntos',
          votes: 43504,
          seats: 1,
          percentageValid: 4.95,
          councilors: [
            { name: 'Miguel Ángel Iguarán Osorio', party: 'Juntos', votes: 10271, cedula: '10.375.715.77' }
          ]
        },
        {
          party: 'Partido Alianza Social Independiente "ASI"',
          votes: 37996,
          seats: 1,
          percentageValid: 4.32,
          councilors: [
            { name: 'Janeth Hurtado Betancur', party: 'Partido Alianza Social Independiente "ASI"', votes: 6099, cedula: '1.128.448.452' }
          ]
        },
        {
          party: 'Independientes',
          votes: 33633,
          seats: 2,
          percentageValid: 3.82,
          councilors: [
            { name: 'Carlos Alberto Gutiérrez Bustamante', party: 'Independientes', votes: 3105, cedula: '71.227.585' },
            { name: 'Juan Carlos Upegui Vanegas', party: 'Independientes', votes: 95883, cedula: '1.020.421.384', isOppositionSeat: true, notes: 'Curul Ley 1909 Estatuto de Oposición (2.º lugar Alcaldía)' }
          ]
        }
      ],
      allElectedCouncilors: [
        { name: 'Andrés Felipe Tobón Villada', party: 'Partido Político Creemos', votes: 43795, cedula: '1.152.189.793' },
        { name: 'María Paulina Suárez Roldán', party: 'Partido Político Creemos', votes: 16145, cedula: '43.597.417' },
        { name: 'Santiago Perdomo Montoya', party: 'Partido Político Creemos', votes: 15240, cedula: '1.152.435.767' },
        { name: 'Alejandro De Bedout Arango', party: 'Partido Político Creemos', votes: 11115, cedula: '10.376.006.12' },
        { name: 'Juan Carlos De La Cuesta Galvis', party: 'Partido Político Creemos', votes: 9523, cedula: '71.741.348' },
        { name: 'Damián Pérez Arroyave', party: 'Partido Político Creemos', votes: 9338, cedula: '1.035.830.866' },
        { name: 'Santiago Narváez Lombana', party: 'Partido Político Creemos', votes: 9303, cedula: '1.037.626.061' },
        { name: 'Camila Gaviria Barreneche', party: 'Partido Político Creemos', votes: 4546, cedula: '43.222.003' },
        { name: 'Sebastián López Valencia', party: 'Partido Centro Democrático', votes: 42444, cedula: '98.764.731' },
        { name: 'Claudia Victoria Carrasquilla Minami', party: 'Partido Centro Democrático', votes: 14966, cedula: '43.497.054' },
        { name: 'Luis Guillermo De Jesús Vélez Álvarez', party: 'Partido Centro Democrático', votes: 9648, cedula: '70.063.180' },
        { name: 'Andrés Felipe Rodríguez Puerta', party: 'Partido Centro Democrático', votes: 6186, cedula: '812.768.1' },
        { name: 'Leticia Orrego Pérez', party: 'Partido Centro Democrático', votes: 6131, cedula: '21.911.590' },
        { name: 'Juan Ramón Jiménez Lara', party: 'Partido Conservador Colombiano', votes: 14500, cedula: '76.324.026' },
        { name: 'Brisvani Alexis Arenas Suaza', party: 'Partido Conservador Colombiano', votes: 9657, cedula: '71.363.158' },
        { name: 'Farley Jhair Macías Betancur', party: 'Partido Liberal Colombiano', votes: 10491, cedula: '1.152.700.230' },
        { name: 'Alejandro Arias García', party: 'Partido Alianza Verde', votes: 4946, cedula: '10.171.392.58' },
        { name: 'Miguel Ángel Iguarán Osorio', party: 'Juntos', votes: 10271, cedula: '10.375.715.77' },
        { name: 'Janeth Hurtado Betancur', party: 'Partido Alianza Social Independiente "ASI"', votes: 6099, cedula: '1.128.448.452' },
        { name: 'José Luis Marín Mora', party: 'Pacto Histórico', votes: 46988, cedula: '10.375.770.70', notes: 'Lista Cerrada' },
        { name: 'Carlos Alberto Gutiérrez Bustamante', party: 'Independientes', votes: 3105, cedula: '71.227.585' },
        { name: 'Juan Carlos Upegui Vanegas', party: 'Independientes', votes: 95883, cedula: '1.020.421.384', isOppositionSeat: true, notes: 'Estatuto de Oposición (2.º lugar Alcaldía)' }
      ]
    },
    governor: {
      totalVotes: 973317,
      totalValidVotes: 917512,
      blankVotes: 94777,
      topCandidates: [
        { name: 'Andrés Julián Rendón Cardona', party: 'Por Antioquia Firme', votes: 429286 },
        { name: 'Luis Emilio Pérez Gutiérrez', party: 'Piensa en Grande', votes: 135481 },
        { name: 'Luis Fernando Suárez Vélez', party: 'Unidos por Antioquia', votes: 130014 },
        { name: 'Esteban Restrepo Taborda', party: 'Independientes', votes: 83295 },
        { name: 'Mauricio Tobón Franco', party: 'El Parche', votes: 18044 }
      ]
    },
    assembly: {
      totalVotes: 952926,
      totalValidVotes: 858722,
      blankVotes: 139865,
      topParties: [
        { party: 'Partido Político Creemos', votes: 236462 },
        { party: 'Partido Centro Democrático', votes: 164951 },
        { party: 'Partido Conservador Colombiano', votes: 63178 },
        { party: 'Pacto Histórico', votes: 51482 },
        { party: 'Partido Alianza Verde', votes: 43867 },
        { party: 'Partido Liberal Colombiano', votes: 42169 },
        { party: 'Juntos', votes: 30352 },
        { party: 'Independientes', votes: 29737 },
        { party: 'RENACE', votes: 21690 },
        { party: 'Partido Alianza Social Independiente "ASI"', votes: 16940 }
      ]
    }
  },
  {
    id: 'bello',
    name: 'Bello',
    subregion: 'Valle de Aburrá (Norte)',
    department: 'Antioquia',
    badgeColor: 'blue',
    summary: 'Segundo municipio más poblado del área metropolitana. Elección de Yulieth Lorena González Ospina.',
    stats: {
      totalVotersEscrutados: 177616,
      totalValidCouncilVotes: 161219,
      totalCouncilSeats: 19,
    },
    mayor: {
      electedMayor: 'Yulieth Lorena González Ospina',
      electedParty: 'Coalición Bello Nos Une',
      votes: 64022,
      percentageOfValidVotes: 38.34,
      percentageOfTotalVotes: 36.04,
      runnerUp: {
        name: 'Néstor David Restrepo Bonnett',
        party: 'Movimiento Bello En Serio',
        votes: 56635,
        percentageOfValidVotes: 33.92,
        acceptedOppositionSeat: false
      },
      totalCandidatesVotes: 148408,
      blankVotes: 18572,
      nullVotes: 4834,
      unmarkedVotes: 5802,
      totalValidVotes: 166980,
      totalVotes: 177616,
      allCandidates: [
        { name: 'Yulieth Lorena González Ospina', party: 'Coalición Bello Nos Une', votes: 64022, isElected: true, percentageValid: 38.34 },
        { name: 'Néstor David Restrepo Bonnett', party: 'Movimiento Bello En Serio', votes: 56635, percentageValid: 33.92 },
        { name: 'Juan Felipe Restrepo Tamayo', party: 'Movimiento Político Colombia Humana', votes: 11226, percentageValid: 6.72 },
        { name: 'Hugo Alexander Díaz Marín', party: 'Movimiento Bello Despierta', votes: 7457, percentageValid: 4.47 },
        { name: 'Isabel Daniela Ortega Pérez', party: 'Partido Polo Democrático Alternativo', votes: 4439, percentageValid: 2.66 },
        { name: 'Votos en Blanco', party: 'Voto en Blanco', votes: 18572, percentageValid: 11.12 }
      ]
    },
    council: {
      totalVotes: 174858,
      validVotes: 161219,
      partyVotes: 140835,
      blankVotes: 20384,
      nullVotes: 5502,
      unmarkedVotes: 8137,
      parties: [
        {
          party: 'Partido Centro Democrático',
          votes: 29454,
          seats: 5,
          percentageValid: 18.27,
          councilors: [
            { name: 'Bedoya García Duván Alberto', party: 'Partido Centro Democrático', votes: 4590 },
            { name: 'Villa Maldonado Daniel Rodrigo', party: 'Partido Centro Democrático', votes: 3951 },
            { name: 'Arango Palacio Jorge Armando', party: 'Partido Centro Democrático', votes: 2604 },
            { name: 'Gálvez Sánchez Víctor Hugo', party: 'Partido Centro Democrático', votes: 1748 },
            { name: 'Martínez Villa Herika Janneth', party: 'Partido Centro Democrático', votes: 1626 }
          ]
        },
        {
          party: 'Partido Liberal Colombiano',
          votes: 16489,
          seats: 3,
          percentageValid: 10.23,
          councilors: [
            { name: 'Mosquera Gómez Carlos Augusto', party: 'Partido Liberal Colombiano', votes: 2529 },
            { name: 'Giraldo Jaramillo Giovanni', party: 'Partido Liberal Colombiano', votes: 1922 },
            { name: 'Hernández Giraldo Luis Carlos', party: 'Partido Liberal Colombiano', votes: 1899 }
          ]
        },
        {
          party: 'Partido Alianza Social Independiente "ASI"',
          votes: 14137,
          seats: 2,
          percentageValid: 8.77,
          councilors: [
            { name: 'Llano Cañas Jaime', party: 'Partido Alianza Social Independiente "ASI"', votes: 2468 },
            { name: 'Castrillón Zapata Andrée Jovany', party: 'Partido Alianza Social Independiente "ASI"', votes: 2038 }
          ]
        },
        {
          party: 'Juntos Bello',
          votes: 13489,
          seats: 2,
          percentageValid: 8.37,
          councilors: [
            { name: 'Bedoya Gutiérrez Laura Catalina', party: 'Juntos Bello', votes: 2567 },
            { name: 'Velásquez Arango Juan Camilo', party: 'Juntos Bello', votes: 2560 }
          ]
        },
        {
          party: 'Unidos por Bello',
          votes: 9934,
          seats: 2,
          percentageValid: 6.16,
          councilors: [
            { name: 'Gómez Suárez Gustavo Adolfo', party: 'Unidos por Bello', votes: 1901 },
            { name: 'Herrera Ramírez Dorian Mauricio', party: 'Unidos por Bello', votes: 1111 }
          ]
        },
        {
          party: 'Partido Alianza Verde',
          votes: 9254,
          seats: 1,
          percentageValid: 5.74,
          councilors: [
            { name: 'Heron Mesa Laura', party: 'Partido Alianza Verde', votes: 1100 }
          ]
        },
        {
          party: 'Coalición Concejo Unidos',
          votes: 7455,
          seats: 1,
          percentageValid: 4.62,
          councilors: [
            { name: 'Arango Arboleda Jhon Anderson', party: 'Coalición Concejo Unidos', votes: 2288 }
          ]
        },
        {
          party: 'Independientes',
          votes: 7432,
          seats: 1,
          percentageValid: 4.61,
          councilors: [
            { name: 'Arango Velásquez Isabel Cristina', party: 'Independientes', votes: 1735 }
          ]
        },
        {
          party: 'Partido Político La Fuerza de la Paz',
          votes: 7065,
          seats: 1,
          percentageValid: 4.38,
          councilors: [
            { name: 'Pérez Arboleda Nolver Andrés', party: 'Partido Político La Fuerza de la Paz', votes: 1817 }
          ]
        },
        {
          party: 'Pacto Histórico Bello',
          votes: 6124,
          seats: 1,
          percentageValid: 3.80,
          councilors: [
            { name: 'Quintero Espitia Daniel', party: 'Pacto Histórico Bello', votes: 6124, notes: 'Voto Lista Cerrada' }
          ]
        }
      ],
      allElectedCouncilors: [
        { name: 'Bedoya García Duván Alberto', party: 'Partido Centro Democrático', votes: 4590 },
        { name: 'Villa Maldonado Daniel Rodrigo', party: 'Partido Centro Democrático', votes: 3951 },
        { name: 'Arango Palacio Jorge Armando', party: 'Partido Centro Democrático', votes: 2604 },
        { name: 'Gálvez Sánchez Víctor Hugo', party: 'Partido Centro Democrático', votes: 1748 },
        { name: 'Martínez Villa Herika Janneth', party: 'Partido Centro Democrático', votes: 1626 },
        { name: 'Mosquera Gómez Carlos Augusto', party: 'Partido Liberal Colombiano', votes: 2529 },
        { name: 'Giraldo Jaramillo Giovanni', party: 'Partido Liberal Colombiano', votes: 1922 },
        { name: 'Hernández Giraldo Luis Carlos', party: 'Partido Liberal Colombiano', votes: 1899 },
        { name: 'Llano Cañas Jaime', party: 'Partido Alianza Social Independiente "ASI"', votes: 2468 },
        { name: 'Castrillón Zapata Andrée Jovany', party: 'Partido Alianza Social Independiente "ASI"', votes: 2038 },
        { name: 'Bedoya Gutiérrez Laura Catalina', party: 'Juntos Bello', votes: 2567 },
        { name: 'Velásquez Arango Juan Camilo', party: 'Juntos Bello', votes: 2560 },
        { name: 'Gómez Suárez Gustavo Adolfo', party: 'Unidos por Bello', votes: 1901 },
        { name: 'Herrera Ramírez Dorian Mauricio', party: 'Unidos por Bello', votes: 1111 },
        { name: 'Heron Mesa Laura', party: 'Partido Alianza Verde', votes: 1100 },
        { name: 'Arango Arboleda Jhon Anderson', party: 'Coalición Concejo Unidos', votes: 2288 },
        { name: 'Arango Velásquez Isabel Cristina', party: 'Independientes', votes: 1735 },
        { name: 'Pérez Arboleda Nolver Andrés', party: 'Partido Político La Fuerza de la Paz', votes: 1817 },
        { name: 'Quintero Espitia Daniel', party: 'Pacto Histórico Bello', votes: 6124, notes: 'Lista Cerrada' }
      ]
    },
    governor: {
      totalVotes: 174218,
      totalValidVotes: 158610,
      blankVotes: 21398,
      topCandidates: [
        { name: 'Andrés Julián Rendón Cardona', party: 'Por Antioquia Firme', votes: 58024 },
        { name: 'Luis Emilio Pérez Gutiérrez', party: 'Piensa en Grande', votes: 31503 },
        { name: 'Luis Fernando Suárez Vélez', party: 'Unidos por Antioquia', votes: 19946 },
        { name: 'Esteban Restrepo Taborda', party: 'Independientes', votes: 18364 },
        { name: 'Mauricio Tobón Franco', party: 'El Parche', votes: 4293 }
      ]
    },
    assembly: {
      totalVotes: 171110,
      totalValidVotes: 115414,
      blankVotes: 34863,
      topParties: [
        { party: 'Partido Centro Democrático', votes: 33342 },
        { party: 'Partido Liberal Colombiano', votes: 15545 },
        { party: 'Partido Alianza Verde', votes: 11968 },
        { party: 'Partido Conservador Colombiano', votes: 8248 },
        { party: 'Pacto Histórico', votes: 8136 },
        { party: 'Juntos', votes: 8051 },
        { party: 'Independientes', votes: 5168 },
        { party: 'Partido Alianza Social Independiente "ASI"', votes: 4263 },
        { party: 'Partido Político Creemos', votes: 3532 },
        { party: 'Renace', votes: 2117 }
      ]
    }
  },
  {
    id: 'itagui',
    name: 'Itagüí',
    subregion: 'Valle de Aburrá (Sur)',
    department: 'Antioquia',
    badgeColor: 'indigo',
    summary: 'Fuerte bastión Conservador. Diego León Torres Sánchez elegido Alcalde y el Partido Conservador logra 6 curules.',
    stats: {
      totalVotersEscrutados: 138566,
      totalValidCouncilVotes: 128164,
      totalCouncilSeats: 17,
    },
    mayor: {
      electedMayor: 'Diego León Torres Sánchez',
      electedParty: 'Itagüí Somos Todos - Partido Conservador',
      votes: 45874,
      percentageOfValidVotes: 34.46,
      percentageOfTotalVotes: 33.11,
      runnerUp: {
        name: 'León Mario Bedoya López',
        party: 'Partido Alianza Social Independiente "ASI"',
        votes: 33894,
        percentageOfValidVotes: 25.46,
        acceptedOppositionSeat: true
      },
      totalCandidatesVotes: 122894,
      blankVotes: 10221,
      nullVotes: 2607,
      unmarkedVotes: 2844,
      totalValidVotes: 133115,
      totalVotes: 138566,
      allCandidates: [
        { name: 'Diego León Torres Sánchez', party: 'Itagüí Somos Todos - Partido Conservador', votes: 45874, isElected: true, percentageValid: 34.46 },
        { name: 'León Mario Bedoya López', party: 'Partido Alianza Social Independiente "ASI"', votes: 33894, percentageValid: 25.46, notes: 'Aceptó Curul Oposición' },
        { name: 'Rosa María Acevedo Jaramillo', party: 'Coalición Itagüí en Orden', votes: 32304, percentageValid: 24.27 },
        { name: 'Andrés Mauricio Bedoya Montoya', party: 'Mauro Renovación a lo Legal', votes: 4758, percentageValid: 3.57 },
        { name: 'Nelson Acevedo Vargas', party: 'Movimiento Político Fuerza Ciudadana', votes: 3030, percentageValid: 2.28 },
        { name: 'Votos en Blanco', party: 'Voto en Blanco', votes: 10221, percentageValid: 7.68 }
      ]
    },
    council: {
      totalVotes: 128164,
      validVotes: 128164,
      partyVotes: 116841,
      blankVotes: 11323,
      nullVotes: 0,
      unmarkedVotes: 0,
      parties: [
        {
          party: 'Partido Conservador Colombiano',
          votes: 32419,
          seats: 6,
          percentageValid: 25.30,
          councilors: [
            { name: 'Andrés Camilo Arcila Pérez', party: 'Partido Conservador Colombiano', votes: 3431 },
            { name: 'Jorge Iván Restrepo Arias', party: 'Partido Conservador Colombiano', votes: 3392 },
            { name: 'Bayron de Jesús Caro Luján', party: 'Partido Conservador Colombiano', votes: 3064 },
            { name: 'María Angélica Gaviria Londoño', party: 'Partido Conservador Colombiano', votes: 2647 },
            { name: 'Daniel Esteban González Giraldo', party: 'Partido Conservador Colombiano', votes: 2601 },
            { name: 'Juan Pablo Martínez Cano', party: 'Partido Conservador Colombiano', votes: 2565 }
          ]
        },
        {
          party: 'MAIS - AICO',
          votes: 15320,
          seats: 3,
          percentageValid: 11.95,
          councilors: [
            { name: 'Shirley Natalia Ortiz Ossa', party: 'MAIS - AICO', votes: 2044 },
            { name: 'Jhon Alejandro Otálvaro Arenas', party: 'MAIS - AICO', votes: 2021 },
            { name: 'Cristian David Osorio Agudelo', party: 'MAIS - AICO', votes: 1994 }
          ]
        },
        {
          party: 'Itagüí Somos Todos',
          votes: 14416,
          seats: 2,
          percentageValid: 11.25,
          councilors: [
            { name: 'Gloria Cecilia Herrera Ospina', party: 'Itagüí Somos Todos', votes: 1582 },
            { name: 'Luisa María Zapata Bernal', party: 'Itagüí Somos Todos', votes: 1483 }
          ]
        },
        {
          party: 'Partido Alianza Social Independiente "ASI"',
          votes: 10069,
          seats: 3,
          percentageValid: 7.86,
          councilors: [
            { name: 'Camilo Andrés Valencia Dávila', party: 'Partido Alianza Social Independiente "ASI"', votes: 1681 },
            { name: 'Orlando de Jesús Ramírez Arango', party: 'Partido Alianza Social Independiente "ASI"', votes: 1465 },
            { name: 'León Mario Bedoya López', party: 'Partido Alianza Social Independiente "ASI"', votes: 33894, isOppositionSeat: true, notes: 'Curul Ley 1909 Estatuto de Oposición (2.º lugar Alcaldía)' }
          ]
        },
        {
          party: 'Partido Centro Democrático',
          votes: 8411,
          seats: 1,
          percentageValid: 6.56,
          councilors: [
            { name: 'Walter Esneider Betancur Montoya', party: 'Partido Centro Democrático', votes: 8411, notes: 'Voto por Lista Cerrada' }
          ]
        },
        {
          party: 'Partido Político Gente en Movimiento',
          votes: 7658,
          seats: 1,
          percentageValid: 5.98,
          councilors: [
            { name: 'Sebastián García Rojas', party: 'Partido Político Gente en Movimiento', votes: 1732 }
          ]
        },
        {
          party: 'Partido Liberal Colombiano',
          votes: 4946,
          seats: 1,
          percentageValid: 3.86,
          councilors: [
            { name: 'Elkin de Jesús Zuleta Estrada', party: 'Partido Liberal Colombiano', votes: 2398 }
          ]
        }
      ],
      allElectedCouncilors: [
        { name: 'Andrés Camilo Arcila Pérez', party: 'Partido Conservador Colombiano', votes: 3431 },
        { name: 'Jorge Iván Restrepo Arias', party: 'Partido Conservador Colombiano', votes: 3392 },
        { name: 'Bayron de Jesús Caro Luján', party: 'Partido Conservador Colombiano', votes: 3064 },
        { name: 'María Angélica Gaviria Londoño', party: 'Partido Conservador Colombiano', votes: 2647 },
        { name: 'Daniel Esteban González Giraldo', party: 'Partido Conservador Colombiano', votes: 2601 },
        { name: 'Juan Pablo Martínez Cano', party: 'Partido Conservador Colombiano', votes: 2565 },
        { name: 'Shirley Natalia Ortiz Ossa', party: 'MAIS - AICO', votes: 2044 },
        { name: 'Jhon Alejandro Otálvaro Arenas', party: 'MAIS - AICO', votes: 2021 },
        { name: 'Cristian David Osorio Agudelo', party: 'MAIS - AICO', votes: 1994 },
        { name: 'Gloria Cecilia Herrera Ospina', party: 'Itagüí Somos Todos', votes: 1582 },
        { name: 'Luisa María Zapata Bernal', party: 'Itagüí Somos Todos', votes: 1483 },
        { name: 'Camilo Andrés Valencia Dávila', party: 'Partido Alianza Social Independiente "ASI"', votes: 1681 },
        { name: 'Orlando de Jesús Ramírez Arango', party: 'Partido Alianza Social Independiente "ASI"', votes: 1465 },
        { name: 'Walter Esneider Betancur Montoya', party: 'Partido Centro Democrático', votes: 8411, notes: 'Lista Cerrada' },
        { name: 'Sebastián García Rojas', party: 'Partido Político Gente en Movimiento', votes: 1732 },
        { name: 'Elkin de Jesús Zuleta Estrada', party: 'Partido Liberal Colombiano', votes: 2398 },
        { name: 'León Mario Bedoya López', party: 'Partido Alianza Social Independiente "ASI"', votes: 33894, isOppositionSeat: true, notes: 'Estatuto de Oposición (2.º lugar Alcaldía)' }
      ]
    },
    governor: {
      totalVotes: 132312,
      totalValidVotes: 120791,
      blankVotes: 14840,
      topCandidates: [
        { name: 'Andrés Julián Rendón Cardona', party: 'Por Antioquia Firme', votes: 38603 },
        { name: 'Luis Emilio Pérez Gutiérrez', party: 'Piensa en Grande', votes: 23820 },
        { name: 'Luis Fernando Suárez Vélez', party: 'Unidos por Antioquia', votes: 19558 },
        { name: 'Esteban Restrepo Taborda', party: 'Independientes', votes: 16421 },
        { name: 'Mauricio Tobón Franco', party: 'El Parche', votes: 2845 }
      ]
    },
    assembly: {
      totalVotes: 109896,
      totalValidVotes: 109896,
      blankVotes: 22860,
      topParties: [
        { party: 'Partido Conservador Colombiano', votes: 26293 },
        { party: 'Partido Centro Democrático', votes: 15910 },
        { party: 'Partido Alianza Social Independiente "ASI"', votes: 9641 },
        { party: 'Partido Político Creemos', votes: 8771 },
        { party: 'Partido Alianza Verde', votes: 6545 },
        { party: 'Pacto Histórico', votes: 5501 },
        { party: 'Partido Liberal Colombiano', votes: 4763 },
        { party: 'Juntos', votes: 3722 }
      ]
    }
  },
  {
    id: 'envigado',
    name: 'Envigado',
    subregion: 'Valle de Aburrá (Sur)',
    department: 'Antioquia',
    badgeColor: 'rose',
    summary: 'Victoria de Raúl Eduardo Cardona. Histórica paridad entre el Partido Liberal (6 curules) y Centro Democrático (6 curules inc. Oposición).',
    stats: {
      totalVotersEscrutados: 122098,
      totalValidCouncilVotes: 117270,
      totalCouncilSeats: 18,
    },
    mayor: {
      electedMayor: 'Raúl Eduardo Cardona González',
      electedParty: 'Envigado, Vamos Adelante',
      votes: 46865,
      percentageOfValidVotes: 39.92,
      percentageOfTotalVotes: 38.38,
      runnerUp: {
        name: 'Jhony Oswaldo Vélez Quintero',
        party: 'Partido Centro Democrático',
        votes: 27702,
        percentageOfValidVotes: 23.59,
        acceptedOppositionSeat: true
      },
      totalCandidatesVotes: 101798,
      blankVotes: 15611,
      nullVotes: 2503,
      unmarkedVotes: 2281,
      totalValidVotes: 117409,
      totalVotes: 122098,
      allCandidates: [
        { name: 'Raúl Eduardo Cardona González', party: 'Envigado, Vamos Adelante', votes: 46865, isElected: true, percentageValid: 39.92 },
        { name: 'Jhony Oswaldo Vélez Quintero', party: 'Partido Centro Democrático', votes: 27702, percentageValid: 23.59, notes: 'Aceptó Curul Oposición' },
        { name: 'Sergio Osvaldo Molina Pérez', party: 'Nueva Fuerza Democrática', votes: 15288, percentageValid: 13.02 },
        { name: 'Andrés David Torres Gómez', party: 'Envigado Merece Más', votes: 11943, percentageValid: 10.17 },
        { name: 'Votos en Blanco', party: 'Voto en Blanco', votes: 15611, percentageValid: 13.29 }
      ]
    },
    council: {
      totalVotes: 122054,
      validVotes: 117270,
      partyVotes: 105219,
      blankVotes: 12051,
      nullVotes: 2503,
      unmarkedVotes: 2281,
      parties: [
        {
          party: 'Partido Liberal Colombiano',
          votes: 31644,
          seats: 6,
          percentageValid: 26.98,
          councilors: [
            { name: 'Pablo Andrés Restrepo Garcés', party: 'Partido Liberal Colombiano', votes: 5310 },
            { name: 'David Alfonso Londoño Arroyave', party: 'Partido Liberal Colombiano', votes: 4890 },
            { name: 'Camilo Andrés Gómez Mosquera', party: 'Partido Liberal Colombiano', votes: 4520 },
            { name: 'María Teresa Álvarez Muñoz', party: 'Partido Liberal Colombiano', votes: 4110 },
            { name: 'Juan Pablo Montoya Castañeda', party: 'Partido Liberal Colombiano', votes: 3870 },
            { name: 'José Efraín Echeverry Gil', party: 'Partido Liberal Colombiano', votes: 3450 }
          ]
        },
        {
          party: 'Partido Centro Democrático',
          votes: 25750,
          seats: 6,
          percentageValid: 21.96,
          councilors: [
            { name: 'Juan Fernando Uribe Restrepo', party: 'Partido Centro Democrático', votes: 4120 },
            { name: 'Carlos Manuel Uribe Mesa', party: 'Partido Centro Democrático', votes: 3810 },
            { name: 'Sara Katherine Rincón Ruiz', party: 'Partido Centro Democrático', votes: 3420 },
            { name: 'Juan Carlos Vélez Mesa', party: 'Partido Centro Democrático', votes: 3110 },
            { name: 'Alejandro Sánchez Grajales', party: 'Partido Centro Democrático', votes: 2980 },
            { name: 'Jhony Oswaldo Vélez Quintero', party: 'Partido Centro Democrático', votes: 27702, isOppositionSeat: true, notes: 'Curul Ley 1909 Estatuto de Oposición (2.º lugar Alcaldía)' }
          ]
        },
        {
          party: 'Partido Conservador Colombiano',
          votes: 11966,
          seats: 2,
          percentageValid: 10.20,
          councilors: [
            { name: 'Gonzalo de Jesús Mesa Ochoa', party: 'Partido Conservador Colombiano', votes: 3120 },
            { name: 'Lucas Gaviria Henao', party: 'Partido Conservador Colombiano', votes: 2840 }
          ]
        },
        {
          party: 'Partido Político Creemos',
          votes: 8596,
          seats: 1,
          percentageValid: 7.33,
          councilors: [
            { name: 'Luz Marina López Peña', party: 'Partido Político Creemos', votes: 2450 }
          ]
        },
        {
          party: 'Todos Somos Envigado',
          votes: 7126,
          seats: 1,
          percentageValid: 6.08,
          councilors: [
            { name: 'Juan Diego Álvarez Upegui', party: 'Todos Somos Envigado', votes: 1980 }
          ]
        },
        {
          party: 'Siempre Adelante',
          votes: 5760,
          seats: 1,
          percentageValid: 4.91,
          councilors: [
            { name: 'Leo Alexander Alzate Suárez', party: 'Siempre Adelante', votes: 1750 }
          ]
        },
        {
          party: 'Partido Cambio Radical',
          votes: 5023,
          seats: 1,
          percentageValid: 4.28,
          councilors: [
            { name: 'Carlos Augusto Ossa Betancur', party: 'Partido Cambio Radical', votes: 1620 }
          ]
        }
      ],
      allElectedCouncilors: [
        { name: 'Pablo Andrés Restrepo Garcés', party: 'Partido Liberal Colombiano', votes: 5310 },
        { name: 'David Alfonso Londoño Arroyave', party: 'Partido Liberal Colombiano', votes: 4890 },
        { name: 'Camilo Andrés Gómez Mosquera', party: 'Partido Liberal Colombiano', votes: 4520 },
        { name: 'María Teresa Álvarez Muñoz', party: 'Partido Liberal Colombiano', votes: 4110 },
        { name: 'Juan Pablo Montoya Castañeda', party: 'Partido Liberal Colombiano', votes: 3870 },
        { name: 'José Efraín Echeverry Gil', party: 'Partido Liberal Colombiano', votes: 3450 },
        { name: 'Juan Fernando Uribe Restrepo', party: 'Partido Centro Democrático', votes: 4120 },
        { name: 'Carlos Manuel Uribe Mesa', party: 'Partido Centro Democrático', votes: 3810 },
        { name: 'Sara Katherine Rincón Ruiz', party: 'Partido Centro Democrático', votes: 3420 },
        { name: 'Juan Carlos Vélez Mesa', party: 'Partido Centro Democrático', votes: 3110 },
        { name: 'Alejandro Sánchez Grajales', party: 'Partido Centro Democrático', votes: 2980 },
        { name: 'Jhony Oswaldo Vélez Quintero', party: 'Partido Centro Democrático', votes: 27702, isOppositionSeat: true, notes: 'Estatuto de Oposición (2.º lugar Alcaldía)' },
        { name: 'Gonzalo de Jesús Mesa Ochoa', party: 'Partido Conservador Colombiano', votes: 3120 },
        { name: 'Lucas Gaviria Henao', party: 'Partido Conservador Colombiano', votes: 2840 },
        { name: 'Carlos Augusto Ossa Betancur', party: 'Partido Cambio Radical', votes: 1620 },
        { name: 'Luz Marina López Peña', party: 'Partido Político Creemos', votes: 2450 },
        { name: 'Juan Diego Álvarez Upegui', party: 'Todos Somos Envigado', votes: 1980 },
        { name: 'Leo Alexander Alzate Suárez', party: 'Siempre Adelante', votes: 1750 }
      ]
    },
    governor: {
      totalVotes: 122374,
      totalValidVotes: 117320,
      blankVotes: 10517,
      topCandidates: [
        { name: 'Andrés Julián Rendón Cardona', party: 'Por Antioquia Firme', votes: 63777 },
        { name: 'Luis Fernando Suárez Vélez', party: 'Unidos por Antioquia', votes: 20060 },
        { name: 'Luis Emilio Pérez Gutiérrez', party: 'Piensa en Grande', votes: 12059 },
        { name: 'Esteban Restrepo Taborda', party: 'Independientes', votes: 5558 },
        { name: 'Mauricio Tobón Franco', party: 'El Parche', votes: 1644 }
      ]
    },
    assembly: {
      totalVotes: 121899,
      totalValidVotes: 113533,
      blankVotes: 18509,
      topParties: [
        { party: 'Partido Centro Democrático', votes: 27212 },
        { party: 'Partido Liberal Colombiano', votes: 20755 },
        { party: 'Partido Político Creemos', votes: 14686 },
        { party: 'Partido Conservador Colombiano', votes: 11529 },
        { party: 'Partido Alianza Verde', votes: 7737 },
        { party: 'Pacto Histórico', votes: 4205 },
        { party: 'Juntos', votes: 3314 },
        { party: 'Renace', votes: 1670 },
        { party: 'Partido Alianza Social Independiente "ASI"', votes: 1335 },
        { party: 'Independientes', votes: 1107 }
      ]
    }
  },
  {
    id: 'sabaneta',
    name: 'Sabaneta',
    subregion: 'Valle de Aburrá (Sur)',
    department: 'Antioquia',
    badgeColor: 'teal',
    summary: 'Alder James Cruz Ocampo elegido Alcalde con 19.940 votos. Alta votación de Partido Liberal, Alianza Verde y Centro Democrático.',
    stats: {
      totalVotersEscrutados: 56212,
      totalValidCouncilVotes: 54245,
      totalCouncilSeats: 13,
    },
    mayor: {
      electedMayor: 'Alder James Cruz Ocampo',
      electedParty: 'Alder Cruz Alcalde',
      votes: 19940,
      percentageOfValidVotes: 36.52,
      percentageOfTotalVotes: 35.47,
      runnerUp: {
        name: 'Iván Alonso Montoya Urrego',
        party: 'Partido Político Creemos',
        votes: 13836,
        percentageOfValidVotes: 25.34,
        acceptedOppositionSeat: true
      },
      totalCandidatesVotes: 51399,
      blankVotes: 3209,
      nullVotes: 591,
      unmarkedVotes: 1013,
      totalValidVotes: 54608,
      totalVotes: 56212,
      allCandidates: [
        { name: 'Alder James Cruz Ocampo', party: 'Alder Cruz Alcalde', votes: 19940, isElected: true, percentageValid: 36.52 },
        { name: 'Iván Alonso Montoya Urrego', party: 'Partido Político Creemos', votes: 13836, percentageValid: 25.34, notes: 'Aceptó Curul Oposición' },
        { name: 'Juan Carlos Bustamante Agudelo', party: 'Coalición La Sabaneta que Queremos', votes: 10217, percentageValid: 18.71 },
        { name: 'Yuly Paola Quintero Londoño', party: 'La Nueva Sabaneta', votes: 2685, percentageValid: 4.92 },
        { name: 'Oscar Daniel Galeano Tamayo', party: 'Partido Centro Democrático', votes: 1952, percentageValid: 3.57 },
        { name: 'Votos en Blanco', party: 'Voto en Blanco', votes: 3209, percentageValid: 5.88 }
      ]
    },
    council: {
      totalVotes: 54245,
      validVotes: 54245,
      partyVotes: 49635,
      blankVotes: 4610,
      nullVotes: 0,
      unmarkedVotes: 0,
      parties: [
        {
          party: 'Partido Liberal Colombiano',
          votes: 9593,
          seats: 3,
          percentageValid: 17.68,
          councilors: [
            { name: 'Ángel Fabricio Henao', party: 'Partido Liberal Colombiano', votes: 2514 },
            { name: 'John Fredy González Montoya', party: 'Partido Liberal Colombiano', votes: 1609 },
            { name: 'Víctor Hugo Gil Salazar', party: 'Partido Liberal Colombiano', votes: 1096 }
          ]
        },
        {
          party: 'Partido Alianza Verde',
          votes: 9207,
          seats: 3,
          percentageValid: 16.97,
          councilors: [
            { name: 'Juliana Andrea Villegas Orozco', party: 'Partido Alianza Verde', votes: 2323 },
            { name: 'Wilmar Oquendo Cardona', party: 'Partido Alianza Verde', votes: 1672 },
            { name: 'Lucas Restrepo Jiménez', party: 'Partido Alianza Verde', votes: 1337 }
          ]
        },
        {
          party: 'Partido Centro Democrático',
          votes: 6728,
          seats: 2,
          percentageValid: 12.40,
          councilors: [
            { name: 'José Daniel Restrepo Montoya', party: 'Partido Centro Democrático', votes: 2324 },
            { name: 'Julián David Ceballos Montoya', party: 'Partido Centro Democrático', votes: 764 }
          ]
        },
        {
          party: 'Partido Cambio Radical',
          votes: 5662,
          seats: 2,
          percentageValid: 10.44,
          councilors: [
            { name: 'Juan David Montoya Vásquez', party: 'Partido Cambio Radical', votes: 2005 },
            { name: 'José Julián Cano Castro', party: 'Partido Cambio Radical', votes: 1364, notes: 'Asignado por recálculo' }
          ]
        },
        {
          party: 'Partido Político Creemos',
          votes: 4952,
          seats: 2,
          percentageValid: 9.13,
          councilors: [
            { name: 'Alliday Tobón Henao', party: 'Partido Político Creemos', votes: 850 },
            { name: 'Iván Alonso Montoya Urrego', party: 'Partido Político Creemos', votes: 13836, isOppositionSeat: true, notes: 'Curul Ley 1909 Estatuto de Oposición (2.º lugar Alcaldía)' }
          ]
        },
        {
          party: 'Partido Conservador Colombiano',
          votes: 3910,
          seats: 1,
          percentageValid: 7.21,
          councilors: [
            { name: 'Deifer Alexander Morales Castaño', party: 'Partido Conservador Colombiano', votes: 1592 }
          ]
        },
        {
          party: 'La Sabaneta que Queremos',
          votes: 3628,
          seats: 1,
          percentageValid: 6.69,
          councilors: [
            { name: 'Elisa Carolina Tobón Ospina', party: 'La Sabaneta que Queremos', votes: 750 }
          ]
        }
      ],
      allElectedCouncilors: [
        { name: 'Ángel Fabricio Henao', party: 'Partido Liberal Colombiano', votes: 2514 },
        { name: 'John Fredy González Montoya', party: 'Partido Liberal Colombiano', votes: 1609 },
        { name: 'Víctor Hugo Gil Salazar', party: 'Partido Liberal Colombiano', votes: 1096 },
        { name: 'Juliana Andrea Villegas Orozco', party: 'Partido Alianza Verde', votes: 2323 },
        { name: 'Wilmar Oquendo Cardona', party: 'Partido Alianza Verde', votes: 1672 },
        { name: 'Lucas Restrepo Jiménez', party: 'Partido Alianza Verde', votes: 1337 },
        { name: 'José Daniel Restrepo Montoya', party: 'Partido Centro Democrático', votes: 2324 },
        { name: 'Julián David Ceballos Montoya', party: 'Partido Centro Democrático', votes: 764 },
        { name: 'Juan David Montoya Vásquez', party: 'Partido Cambio Radical', votes: 2005 },
        { name: 'José Julián Cano Castro', party: 'Partido Cambio Radical', votes: 1364, notes: 'Asignado por recálculo' },
        { name: 'Alliday Tobón Henao', party: 'Partido Político Creemos', votes: 850 },
        { name: 'Deifer Alexander Morales Castaño', party: 'Partido Conservador Colombiano', votes: 1592 },
        { name: 'Elisa Carolina Tobón Ospina', party: 'La Sabaneta que Queremos', votes: 750 },
        { name: 'Iván Alonso Montoya Urrego', party: 'Partido Político Creemos', votes: 13836, isOppositionSeat: true, notes: 'Estatuto de Oposición (2.º lugar Alcaldía)' }
      ]
    },
    governor: {
      totalVotes: 55888,
      totalValidVotes: 53378,
      blankVotes: 5445,
      topCandidates: [
        { name: 'Andrés Julián Rendón Cardona', party: 'Por Antioquia Firme', votes: 21504 },
        { name: 'Luis Fernando Suárez Vélez', party: 'Unidos por Antioquia', votes: 13718 },
        { name: 'Luis Emilio Pérez Gutiérrez', party: 'Piensa en Grande', votes: 6995 },
        { name: 'Esteban Restrepo Taborda', party: 'Independientes', votes: 3022 },
        { name: 'Mauricio Tobón Franco', party: 'El Parche', votes: 921 }
      ]
    },
    assembly: {
      totalVotes: 50437,
      totalValidVotes: 50437,
      blankVotes: 9681,
      topParties: [
        { party: 'Partido Centro Democrático', votes: 9555 },
        { party: 'Partido Político Creemos', votes: 8566 },
        { party: 'Partido Alianza Verde', votes: 7856 },
        { party: 'Partido Conservador Colombiano', votes: 4278 },
        { party: 'Partido Liberal Colombiano', votes: 3693 },
        { party: 'Pacto Histórico', votes: 2143 },
        { party: 'Juntos', votes: 1321 },
        { party: 'Partido Alianza Social Independiente "ASI"', votes: 1106 },
        { party: 'RENACE', votes: 721 },
        { party: 'Coalición Antioquia Te Pertenece', votes: 597 }
      ]
    }
  },
  {
    id: 'girardota',
    name: 'Girardota',
    subregion: 'Valle de Aburrá (Norte)',
    department: 'Antioquia',
    badgeColor: 'amber',
    summary: 'Kevin René Bernal Morales elegido Alcalde (Decencia en lo Público) con 13.197 votos.',
    stats: {
      totalVotersEscrutados: 30401,
      totalValidCouncilVotes: 28376,
      totalCouncilSeats: 13,
    },
    mayor: {
      electedMayor: 'Kevin René Bernal Morales',
      electedParty: 'Decencia en lo Público',
      votes: 13197,
      percentageOfValidVotes: 44.96,
      percentageOfTotalVotes: 43.41,
      runnerUp: {
        name: 'Juan Ignacio Torres Gómez',
        party: 'Girardota Territorio de Vida',
        votes: 11393,
        percentageOfValidVotes: 38.81,
        acceptedOppositionSeat: true
      },
      totalCandidatesVotes: 27996,
      blankVotes: 1359,
      nullVotes: 568,
      unmarkedVotes: 478,
      totalValidVotes: 29355,
      totalVotes: 30401,
      allCandidates: [
        { name: 'Kevin René Bernal Morales', party: 'Decencia en lo Público', votes: 13197, isElected: true, percentageValid: 44.96 },
        { name: 'Juan Ignacio Torres Gómez', party: 'Girardota Territorio de Vida', votes: 11393, percentageValid: 38.81, notes: 'Aceptó Curul Oposición' },
        { name: 'Alejandro Posada Jiménez', party: 'Partido Cambio Radical', votes: 2803, percentageValid: 9.55 },
        { name: 'Olga Lucía Mazo Jaramillo', party: 'Partido Centro Democrático', votes: 400, percentageValid: 1.36 },
        { name: 'Jorge Raúl Córdoba Cadavid', party: 'Nueva Fuerza Democrática', votes: 112, percentageValid: 0.38 },
        { name: 'Votos en Blanco', party: 'Voto en Blanco', votes: 1359, percentageValid: 4.63 }
      ]
    },
    council: {
      totalVotes: 30357,
      validVotes: 28376,
      partyVotes: 26109,
      blankVotes: 2267,
      nullVotes: 947,
      unmarkedVotes: 1034,
      parties: [
        {
          party: 'Partido Liberal Colombiano',
          votes: 6985,
          seats: 4,
          percentageValid: 24.62,
          councilors: [
            { name: 'Diego Armando Congote Lopera', party: 'Partido Liberal Colombiano', votes: 1184, cedula: '70.329.690' },
            { name: 'Daniel Orozco Córdoba', party: 'Partido Liberal Colombiano', votes: 1146, cedula: '1.035.880.269' },
            { name: 'Sebastián Madrigal Cadavid', party: 'Partido Liberal Colombiano', votes: 1044, cedula: '1.035.854.973' },
            { name: 'Camilo Alzate Jaramillo', party: 'Partido Liberal Colombiano', votes: 1012, cedula: '1.128.434.938' }
          ]
        },
        {
          party: 'Partido Conservador Colombiano',
          votes: 6518,
          seats: 4,
          percentageValid: 22.97,
          councilors: [
            { name: 'María Berenice Álzate Castro', party: 'Partido Conservador Colombiano', votes: 1006, cedula: '39.353.402' },
            { name: 'Juan David Bustamante Bustamante', party: 'Partido Conservador Colombiano', votes: 960, cedula: '70.330.344' },
            { name: 'Sergio Andrés Orlas Jiménez', party: 'Partido Conservador Colombiano', votes: 922, cedula: '70.326.327' },
            { name: 'Reinaldo Zapata Sánchez', party: 'Partido Conservador Colombiano', votes: 872, cedula: '1.035.853.159' }
          ]
        },
        {
          party: 'Movimiento Alianza Democrática Amplia (ADA)',
          votes: 3782,
          seats: 2,
          percentageValid: 13.33,
          councilors: [
            { name: 'Jaime de Jesús Montoya Ospina', party: 'Movimiento Alianza Democrática Amplia (ADA)', votes: 942, cedula: '70.328.621' },
            { name: 'Robert David Marulanda Rúa', party: 'Movimiento Alianza Democrática Amplia (ADA)', votes: 556, cedula: '1.035.870.014' }
          ]
        },
        {
          party: 'Primero Girardota',
          votes: 3763,
          seats: 2,
          percentageValid: 13.26,
          councilors: [
            { name: 'Sebastián Zapata Arias', party: 'Primero Girardota', votes: 1220, cedula: '1.035.867.624' },
            { name: 'Mary Sol Henao Bustamante', party: 'Primero Girardota', votes: 772, cedula: '39.356.906' }
          ]
        },
        {
          party: 'ASI Verde',
          votes: 2220,
          seats: 1,
          percentageValid: 7.82,
          councilors: [
            { name: 'Tulio César Osorio Zapata', party: 'ASI Verde', votes: 533, cedula: '70.323.860' }
          ]
        },
        {
          party: 'Girardota Territorio de Vida',
          votes: 11393,
          seats: 1,
          percentageValid: 0,
          councilors: [
            { name: 'Juan Ignacio Torres Gómez', party: 'Girardota Territorio de Vida', votes: 11393, cedula: '70.330.056', isOppositionSeat: true, notes: 'Curul Ley 1909 Estatuto de Oposición (2.º lugar Alcaldía)' }
          ]
        }
      ],
      allElectedCouncilors: [
        { name: 'Diego Armando Congote Lopera', party: 'Partido Liberal Colombiano', votes: 1184, cedula: '70.329.690' },
        { name: 'Daniel Orozco Córdoba', party: 'Partido Liberal Colombiano', votes: 1146, cedula: '1.035.880.269' },
        { name: 'Sebastián Madrigal Cadavid', party: 'Partido Liberal Colombiano', votes: 1044, cedula: '1.035.854.973' },
        { name: 'Camilo Alzate Jaramillo', party: 'Partido Liberal Colombiano', votes: 1012, cedula: '1.128.434.938' },
        { name: 'María Berenice Álzate Castro', party: 'Partido Conservador Colombiano', votes: 1006, cedula: '39.353.402' },
        { name: 'Juan David Bustamante Bustamante', party: 'Partido Conservador Colombiano', votes: 960, cedula: '70.330.344' },
        { name: 'Sergio Andrés Orlas Jiménez', party: 'Partido Conservador Colombiano', votes: 922, cedula: '70.326.327' },
        { name: 'Reinaldo Zapata Sánchez', party: 'Partido Conservador Colombiano', votes: 872, cedula: '1.035.853.159' },
        { name: 'Sebastián Zapata Arias', party: 'Primero Girardota', votes: 1220, cedula: '1.035.867.624' },
        { name: 'Mary Sol Henao Bustamante', party: 'Primero Girardota', votes: 772, cedula: '39.356.906' },
        { name: 'Jaime de Jesús Montoya Ospina', party: 'Movimiento Alianza Democrática Amplia (ADA)', votes: 942, cedula: '70.328.621' },
        { name: 'Robert David Marulanda Rúa', party: 'Movimiento Alianza Democrática Amplia (ADA)', votes: 556, cedula: '1.035.870.014' },
        { name: 'Tulio César Osorio Zapata', party: 'ASI Verde', votes: 533, cedula: '70.323.860' },
        { name: 'Juan Ignacio Torres Gómez', party: 'Girardota Territorio de Vida', votes: 11393, cedula: '70.330.056', isOppositionSeat: true, notes: 'Estatuto de Oposición (2.º lugar Alcaldía)' }
      ]
    },
    governor: {
      totalVotes: 30274,
      totalValidVotes: 27442,
      blankVotes: 3195,
      topCandidates: [
        { name: 'Luis Emilio Pérez Gutiérrez', party: 'Piensa en Grande', votes: 9324 },
        { name: 'Andrés Julián Rendón Cardona', party: 'Por Antioquia Firme', votes: 6490 },
        { name: 'Luis Fernando Suárez Vélez', party: 'Unidos por Antioquia', votes: 4070 },
        { name: 'Esteban Restrepo Taborda', party: 'Independientes', votes: 2497 },
        { name: 'Mauricio Tobón Franco', party: 'El Parche', votes: 650 }
      ]
    },
    assembly: {
      totalVotes: 29964,
      totalValidVotes: 24928,
      blankVotes: 5944,
      topParties: [
        { party: 'Partido Conservador Colombiano', votes: 5594 },
        { party: 'Partido Liberal Colombiano', votes: 4518 },
        { party: 'Partido Centro Democrático', votes: 2533 },
        { party: 'Partido Alianza Verde', votes: 1306 },
        { party: 'Pacto Histórico', votes: 1184 },
        { party: 'Partido Político Creemos', votes: 1018 },
        { party: 'Juntos', votes: 995 },
        { party: 'Partido Alianza Social Independiente "ASI"', votes: 711 },
        { party: 'RENACE', votes: 386 },
        { party: 'Independientes', votes: 309 }
      ],
      topCandidates: [
        { name: 'Jaime Alonso Cano Martínez', party: 'Partido Conservador Colombiano', votes: 3313, notes: 'Preferente (051)' },
        { name: 'Hernán Darío Torres Alzate', party: 'Partido Liberal Colombiano', votes: 1657, notes: 'Preferente (076)' },
        { name: 'Jonathan Andrés Roldán Jiménez', party: 'Partido Liberal Colombiano', votes: 1211, notes: 'Preferente (051)' },
        { name: 'Pacto Histórico (Lista Cerrada)', party: 'Pacto Histórico', votes: 1184, notes: 'Sin Preferencia' },
        { name: 'Verónica Arango García', party: 'Partido Centro Democrático', votes: 740, notes: 'Preferente (051)' },
        { name: 'Juan Esteban Villegas Aristizábal', party: 'Partido Conservador Colombiano', votes: 355, notes: 'Preferente (052)' },
        { name: 'Julio César Restrepo Escobar', party: 'Partido Alianza Social Independiente "ASI"', votes: 352, notes: 'Preferente (051)' },
        { name: 'Walter Adier Arias Tobón', party: 'Partido Conservador Colombiano', votes: 340, notes: 'Preferente (057)' },
        { name: 'Andrés Felipe Bedoya Rendón', party: 'Partido Político Creemos', votes: 275, notes: 'Preferente (051)' },
        { name: 'Rodrigo Alberto Mendoza Vega', party: 'Juntos', votes: 268, notes: 'Preferente (051)' },
        { name: 'Jorge Alonso Correa Betancur', party: 'Partido Conservador Colombiano', votes: 230, notes: 'Preferente (055)' },
        { name: 'Rubén Darío Callejas Gómez', party: 'Partido Liberal Colombiano', votes: 222, notes: 'Preferente (057)' },
        { name: 'Juliana Andrea Álvarez Salazar', party: 'Partido Alianza Verde', votes: 206, notes: 'Preferente (065)' },
        { name: 'Luis Gabriel Gómez Grisales', party: 'Partido Centro Democrático', votes: 171, notes: 'Preferente (052)' },
        { name: 'Camilo Andrés Calle Ochoa', party: 'Partido Alianza Verde', votes: 170, notes: 'Preferente (051)' }
      ]
    }
  },
  {
    id: 'caldas',
    name: 'Caldas',
    subregion: 'Valle de Aburrá (Sur)',
    department: 'Antioquia',
    badgeColor: 'cyan',
    summary: 'Elección de Jorge Mario Rendón Vélez (Coalición Profe Piolo Cremos) con 12.927 votos.',
    stats: {
      totalVotersEscrutados: 42461,
      totalValidCouncilVotes: 38905,
      totalCouncilSeats: 15,
    },
    mayor: {
      electedMayor: 'Jorge Mario Rendón Vélez',
      electedParty: 'Coalición Profe Piolo Cremos',
      votes: 12927,
      percentageOfValidVotes: 31.71,
      percentageOfTotalVotes: 30.44,
      runnerUp: {
        name: 'Raúl Alejandro Mesa Correa',
        party: 'Partido Político Creemos',
        votes: 10982,
        percentageOfValidVotes: 26.94,
        acceptedOppositionSeat: true
      },
      totalCandidatesVotes: 38938,
      blankVotes: 1832,
      nullVotes: 1006,
      unmarkedVotes: 685,
      totalValidVotes: 40770,
      totalVotes: 42461,
      allCandidates: [
        { name: 'Jorge Mario Rendón Vélez', party: 'Coalición Profe Piolo Cremos', votes: 12927, isElected: true, percentageValid: 31.71 },
        { name: 'Raúl Alejandro Mesa Correa', party: 'Partido Político Creemos', votes: 10982, percentageValid: 26.94, notes: 'Aceptó Curul Oposición' },
        { name: 'María Alejandra Giraldo Vélez', party: 'Partido Alianza Social Independiente "ASI"', votes: 8502, percentageValid: 20.85 },
        { name: 'Daniel Felipe Castaño Mesa', party: 'Diálogo Ciudadano', votes: 5768, percentageValid: 14.15 },
        { name: 'Albeiro de Jesús Vera Vergara', party: 'Pacto Histórico', votes: 523, percentageValid: 1.28 },
        { name: 'Votos en Blanco', party: 'Voto en Blanco', votes: 1832, percentageValid: 4.49 }
      ]
    },
    council: {
      totalVotes: 42289,
      validVotes: 38905,
      partyVotes: 35616,
      blankVotes: 3289,
      nullVotes: 1501,
      unmarkedVotes: 1883,
      parties: [
        {
          party: 'Profe Piolo Cremos',
          votes: 4091,
          seats: 2,
          percentageValid: 10.52,
          councilors: [
            { name: 'Jaime Bedoya Castaño', party: 'Profe Piolo Cremos', votes: 619, cedula: '1.026.160.607' },
            { name: 'Yenifer Restrepo Henao', party: 'Profe Piolo Cremos', votes: 611, cedula: '1.026.153.730' }
          ]
        },
        {
          party: 'Partido Político Creemos',
          votes: 4087,
          seats: 3,
          percentageValid: 10.50,
          councilors: [
            { name: 'Luis Aníbal Vergara Ochoa', party: 'Partido Político Creemos', votes: 720, cedula: '71.394.549' },
            { name: 'Fabio de Jesús Guzmán Echeverri', party: 'Partido Político Creemos', votes: 636, cedula: '71.391.232' },
            { name: 'Raúl Alejandro Mesa Correa', party: 'Partido Político Creemos', votes: 10982, cedula: '71.399.771', isOppositionSeat: true, notes: 'Curul Ley 1909 Estatuto de Oposición (2.º lugar Alcaldía)' }
          ]
        },
        {
          party: 'Diálogo Ciudadano',
          votes: 3926,
          seats: 2,
          percentageValid: 10.09,
          councilors: [
            { name: 'Jonathan Hurtado Betancur', party: 'Diálogo Ciudadano', votes: 921, cedula: '1.026.138.418' },
            { name: 'Jose David Rodríguez Molina', party: 'Diálogo Ciudadano', votes: 704, cedula: '1.026.146.796' }
          ]
        },
        {
          party: 'Partido Liberal Colombiano',
          votes: 3663,
          seats: 2,
          percentageValid: 9.42,
          councilors: [
            { name: 'Juan Camilo Baena Ramírez', party: 'Partido Liberal Colombiano', votes: 1475, cedula: '1.026.137.298' },
            { name: 'Juliana Sepúlveda Arredondo', party: 'Partido Liberal Colombiano', votes: 996, cedula: '1.026.149.983' }
          ]
        },
        {
          party: 'Partido Cambio Radical',
          votes: 3620,
          seats: 1,
          percentageValid: 9.30,
          councilors: [
            { name: 'Luis Hernando Yepes Torres', party: 'Partido Cambio Radical', votes: 742, cedula: '70.519.981' }
          ]
        },
        {
          party: 'Partido de la Unión por la Gente - Partido de la U',
          votes: 2603,
          seats: 1,
          percentageValid: 6.69,
          councilors: [
            { name: 'Astrid Janneth Quirós Colorado', party: 'Partido de la Unión por la Gente - Partido de la U', votes: 976, cedula: '43.687.504' }
          ]
        },
        {
          party: 'Partido Conservador Colombiano',
          votes: 2515,
          seats: 1,
          percentageValid: 6.46,
          councilors: [
            { name: 'Sebastián Querubín Loaiza', party: 'Partido Conservador Colombiano', votes: 553, cedula: '1.036.641.498' }
          ]
        },
        {
          party: 'Partido Alianza Social Independiente "ASI"',
          votes: 2214,
          seats: 1,
          percentageValid: 5.69,
          councilors: [
            { name: 'John Jairo Velásquez Ortiz', party: 'Partido Alianza Social Independiente "ASI"', votes: 560, cedula: '98.524.240' }
          ]
        },
        {
          party: 'Centro Democrático - MIRA',
          votes: 2142,
          seats: 1,
          percentageValid: 5.51,
          councilors: [
            { name: 'Angela María Espinosa Castro', party: 'Centro Democrático - MIRA', votes: 732, cedula: '43.681.300' }
          ]
        },
        {
          party: 'Partido Alianza Verde',
          votes: 1975,
          seats: 1,
          percentageValid: 5.08,
          councilors: [
            { name: 'John Fredy Jiménez Granados', party: 'Partido Alianza Verde', votes: 694, cedula: '1.026.132.890' }
          ]
        },
        {
          party: 'Partido Nuevo Liberalismo',
          votes: 1890,
          seats: 1,
          percentageValid: 4.86,
          councilors: [
            { name: 'James Andrés Arango Valencia', party: 'Partido Nuevo Liberalismo', votes: 396, cedula: '3.402.409' }
          ]
        }
      ],
      allElectedCouncilors: [
        { name: 'Juan Camilo Baena Ramírez', party: 'Partido Liberal Colombiano', votes: 1475, cedula: '1.026.137.298' },
        { name: 'Juliana Sepúlveda Arredondo', party: 'Partido Liberal Colombiano', votes: 996, cedula: '1.026.149.983' },
        { name: 'Astrid Janneth Quirós Colorado', party: 'Partido de la Unión por la Gente - Partido de la U', votes: 976, cedula: '43.687.504' },
        { name: 'Jonathan Hurtado Betancur', party: 'Diálogo Ciudadano', votes: 921, cedula: '1.026.138.418' },
        { name: 'Luis Hernando Yepes Torres', party: 'Partido Cambio Radical', votes: 742, cedula: '70.519.981' },
        { name: 'Angela María Espinosa Castro', party: 'Centro Democrático - MIRA', votes: 732, cedula: '43.681.300' },
        { name: 'Luis Aníbal Vergara Ochoa', party: 'Partido Político Creemos', votes: 720, cedula: '71.394.549' },
        { name: 'Jose David Rodríguez Molina', party: 'Diálogo Ciudadano', votes: 704, cedula: '1.026.146.796' },
        { name: 'John Fredy Jiménez Granados', party: 'Partido Alianza Verde', votes: 694, cedula: '1.026.132.890' },
        { name: 'Fabio de Jesús Guzmán Echeverri', party: 'Partido Político Creemos', votes: 636, cedula: '71.391.232' },
        { name: 'Jaime Bedoya Castaño', party: 'Profe Piolo Cremos', votes: 619, cedula: '1.026.160.607' },
        { name: 'Yenifer Restrepo Henao', party: 'Profe Piolo Cremos', votes: 611, cedula: '1.026.153.730' },
        { name: 'John Jairo Velásquez Ortiz', party: 'Partido Alianza Social Independiente "ASI"', votes: 560, cedula: '98.524.240' },
        { name: 'Sebastián Querubín Loaiza', party: 'Partido Conservador Colombiano', votes: 553, cedula: '1.036.641.498' },
        { name: 'James Andrés Arango Valencia', party: 'Partido Nuevo Liberalismo', votes: 396, cedula: '3.402.409' },
        { name: 'Raúl Alejandro Mesa Correa', party: 'Partido Político Creemos', votes: 10982, cedula: '71.399.771', isOppositionSeat: true, notes: 'Estatuto de Oposición (2.º lugar Alcaldía)' }
      ]
    },
    governor: {
      totalVotes: 41821,
      totalValidVotes: 36665,
      blankVotes: 5187,
      topCandidates: [
        { name: 'Andrés Julián Rendón Cardona', party: 'Por Antioquia Firme', votes: 11441 },
        { name: 'Luis Emilio Pérez Gutiérrez', party: 'Piensa en Grande', votes: 8335 },
        { name: 'Luis Fernando Suárez Vélez', party: 'Unidos por Antioquia', votes: 5639 },
        { name: 'Esteban Restrepo Taborda', party: 'Independientes', votes: 3901 },
        { name: 'Mauricio Tobón Franco', party: 'El Parche', votes: 1141 }
      ]
    },
    assembly: {
      totalVotes: 41461,
      totalValidVotes: 33497,
      blankVotes: 9183,
      topParties: [
        { party: 'Partido Político Creemos', votes: 5081 },
        { party: 'Partido Alianza Verde', votes: 4217 },
        { party: 'Partido Centro Democrático', votes: 3885 },
        { party: 'Partido Liberal Colombiano', votes: 2712 },
        { party: 'Partido Conservador Colombiano', votes: 2689 },
        { party: 'Juntos', votes: 1570 },
        { party: 'Pacto Histórico', votes: 1552 },
        { party: 'Partido Alianza Social Independiente "ASI"', votes: 1231 },
        { party: 'Independientes', votes: 403 },
        { party: 'Coalición Antioquia Te Pertenece', votes: 368 }
      ]
    }
  },
  {
    id: 'barbosa',
    name: 'Barbosa',
    subregion: 'Valle de Aburrá (Norte)',
    department: 'Antioquia',
    badgeColor: 'emerald',
    summary: 'Juan David Rojas Agudelo (¡Barbosa Nos Une!) electo Alcalde. Concejo diverso liderado por Conservadores y Liberales.',
    stats: {
      totalVotersEscrutados: 23837,
      totalValidCouncilVotes: 21392,
      totalCouncilSeats: 13,
    },
    mayor: {
      electedMayor: 'Juan David Rojas Agudelo',
      electedParty: '¡Barbosa Nos Une!',
      votes: 8029,
      percentageOfValidVotes: 35.06,
      percentageOfTotalVotes: 33.68,
      runnerUp: {
        name: 'Víctor Antonio Graciano Ramírez',
        party: 'Partido Cambio Radical',
        votes: 7718,
        percentageOfValidVotes: 33.70,
        acceptedOppositionSeat: true
      },
      totalCandidatesVotes: 22002,
      blankVotes: 901,
      nullVotes: 470,
      unmarkedVotes: 464,
      totalValidVotes: 22903,
      totalVotes: 23837,
      allCandidates: [
        { name: 'Juan David Rojas Agudelo', party: '¡Barbosa Nos Une!', votes: 8029, isElected: true, percentageValid: 35.06 },
        { name: 'Víctor Antonio Graciano Ramírez', party: 'Partido Cambio Radical', votes: 7718, percentageValid: 33.70, notes: 'Aceptó Curul Oposición' },
        { name: 'Jaime León Vanegas Vélez', party: 'Partido Alianza Social Independiente "ASI"', votes: 2874, percentageValid: 12.55 },
        { name: 'Fredy Alberto Correa Cardona', party: 'Barbosa de Primera', votes: 1542, percentageValid: 6.73 },
        { name: 'Alina Marcela Restrepo Rodríguez', party: 'Agrupación Política En Marcha', votes: 677, percentageValid: 2.96 },
        { name: 'Votos en Blanco', party: 'Voto en Blanco', votes: 901, percentageValid: 3.93 }
      ]
    },
    council: {
      totalVotes: 23814,
      validVotes: 21392,
      partyVotes: 19822,
      blankVotes: 1570,
      nullVotes: 701,
      unmarkedVotes: 1721,
      parties: [
        {
          party: 'Partido Conservador Colombiano',
          votes: 3284,
          seats: 3,
          percentageValid: 15.35,
          councilors: [
            { name: 'Jeisson Alexander Castaño Jaramillo', party: 'Partido Conservador Colombiano', votes: 550, cedula: '1.035.852.292' },
            { name: 'Diego Alejandro Castaño', party: 'Partido Conservador Colombiano', votes: 516, cedula: '70.879.220' },
            { name: 'Mónica Yanet Henao Zuleta', party: 'Partido Conservador Colombiano', votes: 373, cedula: '39.214.609' }
          ]
        },
        {
          party: 'Partido Liberal Colombiano',
          votes: 3274,
          seats: 3,
          percentageValid: 15.30,
          councilors: [
            { name: 'Mauricio Antonio Marín Marín', party: 'Partido Liberal Colombiano', votes: 600, cedula: '70.142.871' },
            { name: 'Beatriz Elena Rodríguez Madrid', party: 'Partido Liberal Colombiano', votes: 459, cedula: '39.206.347' },
            { name: 'Mauricio de Jesús Cuartas Agudelo', party: 'Partido Liberal Colombiano', votes: 406, cedula: '70.137.664' }
          ]
        },
        {
          party: 'Partido Político Gente en Movimiento',
          votes: 2307,
          seats: 2,
          percentageValid: 10.78,
          councilors: [
            { name: 'Juan Felipe Agudelo Carmona', party: 'Partido Político Gente en Movimiento', votes: 620, cedula: '1.035.227.537' },
            { name: 'Álvaro Rinaldi Martínez', party: 'Partido Político Gente en Movimiento', votes: 415, cedula: '73.103.829' }
          ]
        },
        {
          party: 'Partido de la Unión por la Gente - Partido de la U',
          votes: 1742,
          seats: 1,
          percentageValid: 8.14,
          councilors: [
            { name: 'Fran Esteban García Gaviria', party: 'Partido de la Unión por la Gente - Partido de la U', votes: 428, cedula: '70.140.773' }
          ]
        },
        {
          party: 'Partido Centro Democrático',
          votes: 1611,
          seats: 1,
          percentageValid: 7.53,
          councilors: [
            { name: 'Carlos Andrés Zapata Chaverra', party: 'Partido Centro Democrático', votes: 511, cedula: '1.035.233.703' }
          ]
        },
        {
          party: 'Partido Alianza Verde',
          votes: 1385,
          seats: 1,
          percentageValid: 6.47,
          councilors: [
            { name: 'Johnny Enrique Agudelo Franco', party: 'Partido Alianza Verde', votes: 512, cedula: '1.035.225.480' }
          ]
        },
        {
          party: 'Movimiento Autoridades Indígenas de Colombia "AICO"',
          votes: 1124,
          seats: 1,
          percentageValid: 5.25,
          councilors: [
            { name: 'Reinaldo de Jesús Zapata Marín', party: 'Movimiento Autoridades Indígenas de Colombia "AICO"', votes: 221, cedula: '70.135.168' }
          ]
        },
        {
          party: 'Partido Alianza Social Independiente "ASI"',
          votes: 1102,
          seats: 1,
          percentageValid: 5.15,
          councilors: [
            { name: 'Jesús Ernesto García Sierra', party: 'Partido Alianza Social Independiente "ASI"', votes: 154, cedula: '72.144.284' }
          ]
        },
        {
          party: 'Partido Cambio Radical',
          votes: 1067,
          seats: 1,
          percentageValid: 4.99,
          councilors: [
            { name: 'Víctor Antonio Graciano Ramírez', party: 'Partido Cambio Radical', votes: 7718, cedula: '71.625.467', isOppositionSeat: true, notes: 'Curul Ley 1909 Estatuto de Oposición (2.º lugar Alcaldía)' }
          ]
        }
      ],
      allElectedCouncilors: [
        { name: 'Juan Felipe Agudelo Carmona', party: 'Partido Político Gente en Movimiento', votes: 620, cedula: '1.035.227.537' },
        { name: 'Mauricio Antonio Marín Marín', party: 'Partido Liberal Colombiano', votes: 600, cedula: '70.142.871' },
        { name: 'Jeisson Alexander Castaño Jaramillo', party: 'Partido Conservador Colombiano', votes: 550, cedula: '1.035.852.292' },
        { name: 'Diego Alejandro Castaño', party: 'Partido Conservador Colombiano', votes: 516, cedula: '70.879.220' },
        { name: 'Johnny Enrique Agudelo Franco', party: 'Partido Alianza Verde', votes: 512, cedula: '1.035.225.480' },
        { name: 'Carlos Andrés Zapata Chaverra', party: 'Partido Centro Democrático', votes: 511, cedula: '1.035.233.703' },
        { name: 'Beatriz Elena Rodríguez Madrid', party: 'Partido Liberal Colombiano', votes: 459, cedula: '39.206.347' },
        { name: 'Fran Esteban García Gaviria', party: 'Partido de la Unión por la Gente - Partido de la U', votes: 428, cedula: '70.140.773' },
        { name: 'Álvaro Rinaldi Martínez', party: 'Partido Político Gente en Movimiento', votes: 415, cedula: '73.103.829' },
        { name: 'Mauricio de Jesús Cuartas Agudelo', party: 'Partido Liberal Colombiano', votes: 406, cedula: '70.137.664' },
        { name: 'Mónica Yanet Henao Zuleta', party: 'Partido Conservador Colombiano', votes: 373, cedula: '39.214.609' },
        { name: 'Reinaldo de Jesús Zapata Marín', party: 'Movimiento Autoridades Indígenas de Colombia "AICO"', votes: 221, cedula: '70.135.168' },
        { name: 'Jesús Ernesto García Sierra', party: 'Partido Alianza Social Independiente "ASI"', votes: 154, cedula: '72.144.284' },
        { name: 'Víctor Antonio Graciano Ramírez', party: 'Partido Cambio Radical', votes: 7718, cedula: '71.625.467', isOppositionSeat: true, notes: 'Estatuto de Oposición (2.º lugar Alcaldía)' }
      ]
    },
    governor: {
      totalVotes: 23401,
      totalValidVotes: 20051,
      blankVotes: 2392,
      topCandidates: [
        { name: 'Luis Emilio Pérez Gutiérrez', party: 'Piensa en Grande', votes: 6153 },
        { name: 'Andrés Julián Rendón Cardona', party: 'Por Antioquia Firme', votes: 5174 },
        { name: 'Esteban Restrepo Taborda', party: 'Independientes', votes: 2571 },
        { name: 'Luis Fernando Suárez Vélez', party: 'Unidos por Antioquia', votes: 2380 },
        { name: 'Mauricio Tobón Franco', party: 'El Parche', votes: 458 }
      ]
    },
    assembly: {
      totalVotes: 22120,
      totalValidVotes: 17397,
      blankVotes: 4417,
      topParties: [
        { party: 'Partido Conservador Colombiano', votes: 2766 },
        { party: 'Partido Centro Democrático', votes: 2367 },
        { party: 'Partido Liberal Colombiano', votes: 2147 },
        { party: 'Partido Alianza Verde', votes: 1808 },
        { party: 'Pacto Histórico', votes: 805 },
        { party: 'Partido Político Creemos', votes: 800 },
        { party: 'Juntos', votes: 762 },
        { party: 'RENACE', votes: 543 },
        { party: 'Partido Alianza Social Independiente "ASI"', votes: 443 },
        { party: 'Coalición Antioquia Te Pertenece', votes: 246 }
      ]
    }
  },
  {
    id: 'la-estrella',
    name: 'La Estrella',
    subregion: 'Valle de Aburrá (Sur)',
    department: 'Antioquia',
    badgeColor: 'sky',
    summary: 'Elección de Carlos Mario Gutiérrez Arrubla (Coalición Por el Camino Correcto) con 11.538 votos. Concejo de 15 curules distribuido entre 11 fuerzas políticas.',
    stats: {
      totalVotersEscrutados: 36261,
      totalValidCouncilVotes: 34296,
      totalCouncilSeats: 15,
    },
    mayor: {
      electedMayor: 'Carlos Mario Gutiérrez Arrubla',
      electedParty: 'Coalición Por el Camino Correcto',
      votes: 11538,
      percentageOfValidVotes: 33.36,
      percentageOfTotalVotes: 31.82,
      runnerUp: {
        name: 'Liliana María Ramírez Quintero',
        party: 'Una Estrella Para Todos',
        votes: 11512,
        percentageOfValidVotes: 33.29,
        acceptedOppositionSeat: false
      },
      totalCandidatesVotes: 32191,
      blankVotes: 2392,
      nullVotes: 663,
      unmarkedVotes: 1015,
      totalValidVotes: 34583,
      totalVotes: 36261,
      allCandidates: [
        { name: 'Carlos Mario Gutiérrez Arrubla', party: 'Coalición Por el Camino Correcto', votes: 11538, isElected: true, percentageValid: 33.36 },
        { name: 'Liliana María Ramírez Quintero', party: 'Una Estrella Para Todos', votes: 11512, percentageValid: 33.29, notes: 'No aceptó curul de oposición dentro de término legal' },
        { name: 'Deimer Esneider Flórez Ocampo', party: 'Alianza CREO', votes: 6203, percentageValid: 17.94 },
        { name: 'Juan Camilo Ortiz Mejía', party: 'Partido Político Creemos', votes: 1485, percentageValid: 4.29 },
        { name: 'Andrés Felipe Villa Rodríguez', party: 'Movimiento Autoridades Indígenas de Colombia "AICO"', votes: 1143, percentageValid: 3.30 },
        { name: 'María Cecilia Jaramillo Echavarría', party: 'Partido Polo Democrático Alternativo', votes: 310, percentageValid: 0.90 },
        { name: 'Pablo Andrés Mesa Álvarez', party: 'Movimiento Salvación Nacional', votes: 0, percentageValid: 0.0 },
        { name: 'Votos en Blanco', party: 'Voto en Blanco', votes: 2392, percentageValid: 6.92 }
      ]
    },
    council: {
      totalVotes: 36048,
      validVotes: 34296,
      partyVotes: 31958,
      blankVotes: 2338,
      nullVotes: 812,
      unmarkedVotes: 940,
      parties: [
        {
          party: 'Partido Liberal Colombiano',
          votes: 4508,
          seats: 3,
          percentageValid: 13.14,
          councilors: [
            { name: 'Juan Pablo Arteaga Cano', party: 'Partido Liberal Colombiano', votes: 1242, cedula: '1.040.733.333' },
            { name: 'Estiben Orleit Moncada Castañeda', party: 'Partido Liberal Colombiano', votes: 758, cedula: '1.040.739.420' },
            { name: 'Dahyana Pabón Jiménez', party: 'Partido Liberal Colombiano', votes: 660, cedula: '1.010.056.825' }
          ]
        },
        {
          party: 'Imparables',
          votes: 2941,
          seats: 2,
          percentageValid: 8.58,
          councilors: [
            { name: 'Walter Alexis Londoño Agudelo', party: 'Imparables', votes: 546, cedula: '1.036.611.549' },
            { name: 'Nathacha Gil Escobar', party: 'Imparables', votes: 127, cedula: '1.040.745.181' }
          ]
        },
        {
          party: 'Partido Centro Democrático',
          votes: 2907,
          seats: 2,
          percentageValid: 8.48,
          councilors: [
            { name: 'Willington Herrera Arroyave', party: 'Partido Centro Democrático', votes: 533, cedula: '98.658.912' },
            { name: 'John Edison Ocampo Mejía', party: 'Partido Centro Democrático', votes: 380, cedula: '1.040.732.698' }
          ]
        },
        {
          party: 'Alianza CREO',
          votes: 2520,
          seats: 1,
          percentageValid: 7.35,
          councilors: [
            { name: 'Gustavo Aguilar Pérez', party: 'Alianza CREO', votes: 399, cedula: '70.084.774' }
          ]
        },
        {
          party: 'Movimiento Político Fuerza Ciudadana',
          votes: 2358,
          seats: 1,
          percentageValid: 6.88,
          councilors: [
            { name: 'Jhon Mauricio Oquendo Cadavid', party: 'Movimiento Político Fuerza Ciudadana', votes: 942, cedula: '1.040.738.219' }
          ]
        },
        {
          party: 'Partido de la Unión por la Gente - Partido de la U',
          votes: 2229,
          seats: 1,
          percentageValid: 6.50,
          councilors: [
            { name: 'Natalia Alejandra Londoño Parra', party: 'Partido de la Unión por la Gente - Partido de la U', votes: 698, cedula: '32.351.806' }
          ]
        },
        {
          party: 'Partido Conservador Colombiano',
          votes: 2005,
          seats: 1,
          percentageValid: 5.85,
          councilors: [
            { name: 'Andrés Camilo Cano Londoño', party: 'Partido Conservador Colombiano', votes: 646, cedula: '1.040.737.013' }
          ]
        },
        {
          party: 'Partido Político Creemos',
          votes: 1740,
          seats: 1,
          percentageValid: 5.07,
          councilors: [
            { name: 'Fernando de Jesús Moreno Moreno', party: 'Partido Político Creemos', votes: 337, cedula: '7.158.322.1' }
          ]
        },
        {
          party: 'Una Estrella Para Todos',
          votes: 1689,
          seats: 1,
          percentageValid: 4.92,
          councilors: [
            { name: 'Juan David Barco Aguirre', party: 'Una Estrella Para Todos', votes: 518, cedula: '1.036.613.256' }
          ]
        },
        {
          party: 'Hacemos Conciencia',
          votes: 1501,
          seats: 1,
          percentageValid: 4.38,
          councilors: [
            { name: 'Sebastián Tapias Madrigal', party: 'Hacemos Conciencia', votes: 366, cedula: '1.026.156.607' }
          ]
        },
        {
          party: 'Partido Demócrata Colombiano',
          votes: 1405,
          seats: 1,
          percentageValid: 4.10,
          councilors: [
            { name: 'Daniel Garcés Flórez', party: 'Partido Demócrata Colombiano', votes: 801, cedula: '1.040.742.162' }
          ]
        }
      ],
      allElectedCouncilors: [
        { name: 'Juan Pablo Arteaga Cano', party: 'Partido Liberal Colombiano', votes: 1242, cedula: '1.040.733.333' },
        { name: 'Jhon Mauricio Oquendo Cadavid', party: 'Movimiento Político Fuerza Ciudadana', votes: 942, cedula: '1.040.738.219' },
        { name: 'Daniel Garcés Flórez', party: 'Partido Demócrata Colombiano', votes: 801, cedula: '1.040.742.162' },
        { name: 'Estiben Orleit Moncada Castañeda', party: 'Partido Liberal Colombiano', votes: 758, cedula: '1.040.739.420' },
        { name: 'Natalia Alejandra Londoño Parra', party: 'Partido de la Unión por la Gente - Partido de la U', votes: 698, cedula: '32.351.806' },
        { name: 'Dahyana Pabón Jiménez', party: 'Partido Liberal Colombiano', votes: 660, cedula: '1.010.056.825' },
        { name: 'Andrés Camilo Cano Londoño', party: 'Partido Conservador Colombiano', votes: 646, cedula: '1.040.737.013' },
        { name: 'Walter Alexis Londoño Agudelo', party: 'Imparables', votes: 546, cedula: '1.036.611.549' },
        { name: 'Willington Herrera Arroyave', party: 'Partido Centro Democrático', votes: 533, cedula: '98.658.912' },
        { name: 'Juan David Barco Aguirre', party: 'Una Estrella Para Todos', votes: 518, cedula: '1.036.613.256' },
        { name: 'Gustavo Aguilar Pérez', party: 'Alianza CREO', votes: 399, cedula: '70.084.774' },
        { name: 'John Edison Ocampo Mejía', party: 'Partido Centro Democrático', votes: 380, cedula: '1.040.732.698' },
        { name: 'Sebastián Tapias Madrigal', party: 'Hacemos Conciencia', votes: 366, cedula: '1.026.156.607' },
        { name: 'Fernando de Jesús Moreno Moreno', party: 'Partido Político Creemos', votes: 337, cedula: '7.158.322.1' },
        { name: 'Nathacha Gil Escobar', party: 'Imparables', votes: 127, cedula: '1.040.745.181' }
      ]
    },
    governor: {
      totalVotes: 34494,
      totalValidVotes: 30550,
      blankVotes: 3968,
      topCandidates: [
        { name: 'Andrés Julián Rendón Cardona', party: 'Por Antioquia Firme', votes: 11593 },
        { name: 'Luis Emilio Pérez Gutiérrez', party: 'Piensa en Grande', votes: 5635 },
        { name: 'Luis Fernando Suárez Vélez', party: 'Unidos por Antioquia', votes: 4858 },
        { name: 'Esteban Restrepo Taborda', party: 'Independientes', votes: 3198 },
        { name: 'Mauricio Tobón Franco', party: 'El Parche', votes: 709 }
      ]
    },
    assembly: {
      totalVotes: 33306,
      totalValidVotes: 27939,
      blankVotes: 6967,
      topParties: [
        { party: 'Partido Centro Democrático', votes: 4640 },
        { party: 'Partido Liberal Colombiano', votes: 3432 },
        { party: 'Partido Político Creemos', votes: 3359 },
        { party: 'Partido Alianza Verde', votes: 2245 },
        { party: 'Partido Conservador Colombiano', votes: 2028 },
        { party: 'Pacto Histórico', votes: 1433 },
        { party: 'Juntos', votes: 1164 },
        { party: 'Partido Alianza Social Independiente "ASI"', votes: 724 },
        { party: 'Movimiento Político Fuerza Ciudadana', votes: 537 },
        { party: 'Coalición Antioquia Te Pertenece', votes: 506 }
      ],
      topCandidates: [
        { name: 'Pacto Histórico (Lista Cerrada)', party: 'Pacto Histórico', votes: 1433, notes: 'Sin Preferencia' },
        { name: 'Verónica Arango García', party: 'Partido Centro Democrático', votes: 1093, notes: 'Preferente (051)' },
        { name: 'Hernán Darío Torres Alzate', party: 'Partido Liberal Colombiano', votes: 1074, notes: 'Preferente (076)' },
        { name: 'Mateo Escobar Valencia', party: 'Partido Político Creemos', votes: 608, notes: 'Preferente (052)' },
        { name: 'Luis Gabriel Gómez Grisales', party: 'Partido Centro Democrático', votes: 574, notes: 'Preferente (052)' },
        { name: 'Andrés Felipe Bedoya Rendón', party: 'Partido Político Creemos', votes: 560, notes: 'Preferente (051)' },
        { name: 'Jaime Alonso Cano Martínez', party: 'Partido Conservador Colombiano', votes: 408, notes: 'Preferente (051)' },
        { name: 'Walter Adier Arias Tobón', party: 'Partido Conservador Colombiano', votes: 404, notes: 'Preferente (057)' },
        { name: 'Julio César Restrepo Escobar', party: 'Partido Alianza Social Independiente "ASI"', votes: 323, notes: 'Preferente (051)' },
        { name: 'Hugo Andrés Díaz Villa', party: 'Partido Alianza Verde', votes: 316, notes: 'Preferente (053)' },
        { name: 'José Gregorio Orjuela Pérez', party: 'Partido Centro Democrático', votes: 291, notes: 'Preferente (053)' },
        { name: 'Jonathan Andrés Roldán Jiménez', party: 'Partido Liberal Colombiano', votes: 289, notes: 'Preferente (051)' },
        { name: 'Jhon Enrique Ríos García', party: 'Partido Alianza Verde', votes: 262, notes: 'Preferente (067)' },
        { name: 'Nestor Mauricio Caly Padilla', party: 'Juntos', votes: 253, notes: 'Preferente (055)' },
        { name: 'Luis Javier Montoya Vargas', party: 'Movimiento Político Fuerza Ciudadana', votes: 145, notes: 'Preferente (051)' }
      ]
    }
  },
  {
    id: 'copacabana',
    name: 'Copacabana',
    subregion: 'Valle de Aburrá (Norte)',
    department: 'Antioquia',
    badgeColor: 'blue',
    summary: 'Victoria de Johnnatan Andrés Pineda Agudelo (Partido Político Creemos) a la Alcaldía con 13.421 votos. Concejo de 15 curules liderado por Creemos y Alianza Verde (3 curules cada uno), Cambio Radical (2), Liberal (2), Centro Democrático (1), Partido de la U (1), Conservador (1), Nuevo Liberalismo (1) y ASI-MIRA (1).',
    stats: {
      totalVotersEscrutados: 40541,
      totalValidCouncilVotes: 38051,
      totalCouncilSeats: 15,
    },
    mayor: {
      electedMayor: 'Johnnatan Andrés Pineda Agudelo',
      electedParty: 'Partido Político Creemos',
      votes: 13421,
      percentageOfValidVotes: 34.26,
      percentageOfTotalVotes: 33.10,
      runnerUp: {
        name: 'Jesús Aníbal Díaz Montoya',
        party: 'Gana Copacabana',
        votes: 11363,
        percentageOfValidVotes: 29.00,
        acceptedOppositionSeat: false
      },
      totalCandidatesVotes: 36808,
      blankVotes: 2370,
      nullVotes: 676,
      unmarkedVotes: 687,
      totalValidVotes: 39178,
      totalVotes: 40541,
      allCandidates: [
        { name: 'Johnnatan Andrés Pineda Agudelo', party: 'Partido Político Creemos', votes: 13421, isElected: true, percentageValid: 34.26 },
        { name: 'Jesús Aníbal Díaz Montoya', party: 'Gana Copacabana', votes: 11363, percentageValid: 29.00, notes: 'Manifestó por escrito su decisión de NO aceptar curul de oposición (Ley 1909)' },
        { name: 'Didier Onid Rosero Moreno', party: 'Copacabana Primero', votes: 4745, percentageValid: 12.11 },
        { name: 'Hernando de Jesús González Gómez', party: 'Movimiento Salvación Nacional', votes: 2687, percentageValid: 6.86 },
        { name: 'Ramón Diego Echeverri Hincapié', party: 'Juntos Podemos', votes: 2433, percentageValid: 6.21 },
        { name: 'Diana Georgina Correa Rodríguez', party: 'Pacto Histórico Colombia Puede', votes: 1520, percentageValid: 3.88 },
        { name: 'Víctor Julián Monsalve Rincón', party: 'Partido Político Todos Somos Colombia', votes: 637, percentageValid: 1.63 },
        { name: 'Fabio León Quintero Velásquez', party: 'Movimiento Político Fuerza Ciudadana', votes: 2, percentageValid: 0.01 },
        { name: 'Votos en Blanco', party: 'Voto en Blanco', votes: 2370, percentageValid: 6.05 }
      ]
    },
    council: {
      totalVotes: 40514,
      validVotes: 38051,
      partyVotes: 34417,
      blankVotes: 3634,
      nullVotes: 1007,
      unmarkedVotes: 1456,
      parties: [
        {
          party: 'Partido Político Creemos',
          votes: 5219,
          seats: 3,
          percentageValid: 13.72,
          councilors: [
            { name: 'Carlos Alberto Gómez Yarce', party: 'Partido Político Creemos', votes: 1018, cedula: '1.035.425.982' },
            { name: 'Julián Andrés Tobón Martínez', party: 'Partido Político Creemos', votes: 647, cedula: '1.035.424.146' },
            { name: 'Yilber Andrés Montoya Bernal', party: 'Partido Político Creemos', votes: 576, cedula: '10.376.310.16' }
          ]
        },
        {
          party: 'Partido Alianza Verde',
          votes: 5110,
          seats: 3,
          percentageValid: 13.43,
          councilors: [
            { name: 'Jonathan Eduardo Chaverra Ortiz', party: 'Partido Alianza Verde', votes: 885, cedula: '1.035.420.271' },
            { name: 'Juan Camilo Ramírez Gallón', party: 'Partido Alianza Verde', votes: 705, cedula: '71.364.638' },
            { name: 'Carolina Díaz González', party: 'Partido Alianza Verde', votes: 582, cedula: '10.354.375.21' }
          ]
        },
        {
          party: 'Partido Cambio Radical',
          votes: 4474,
          seats: 2,
          percentageValid: 11.76,
          councilors: [
            { name: 'Robinson Higinio Giraldo', party: 'Partido Cambio Radical', votes: 1303, cedula: '10.375.813.99' },
            { name: 'Juan Sebastian Hernández Foronda', party: 'Partido Cambio Radical', votes: 847, cedula: '10.354.298.77' }
          ]
        },
        {
          party: 'Partido Liberal Colombiano',
          votes: 4354,
          seats: 2,
          percentageValid: 11.44,
          councilors: [
            { name: 'Julián Marcelo Machado Cadavid', party: 'Partido Liberal Colombiano', votes: 737, cedula: '15.515.272' },
            { name: 'Nelson Camilo Quiceno Hernández', party: 'Partido Liberal Colombiano', votes: 621, cedula: '10.354.230.06' }
          ]
        },
        {
          party: 'Partido Centro Democrático',
          votes: 2664,
          seats: 1,
          percentageValid: 7.00,
          councilors: [
            { name: 'Margarita María Muñoz Giraldo', party: 'Partido Centro Democrático', votes: 377, cedula: '42.687.560' }
          ]
        },
        {
          party: 'Partido de la Unión por la Gente - Partido de la U',
          votes: 2184,
          seats: 1,
          percentageValid: 5.74,
          councilors: [
            { name: 'Juan David Quintero Arango', party: 'Partido de la Unión por la Gente - Partido de la U', votes: 785, cedula: '10.354.311.52' }
          ]
        },
        {
          party: 'Partido Conservador Colombiano',
          votes: 2097,
          seats: 1,
          percentageValid: 5.51,
          councilors: [
            { name: 'Edwin Ramírez Lopera', party: 'Partido Conservador Colombiano', votes: 677, cedula: '15.519.017' }
          ]
        },
        {
          party: 'Partido Nuevo Liberalismo',
          votes: 2090,
          seats: 1,
          percentageValid: 5.49,
          councilors: [
            { name: 'Edwin Alexander Gómez', party: 'Partido Nuevo Liberalismo', votes: 590, cedula: '15.516.361' }
          ]
        },
        {
          party: 'ASI - MIRA',
          votes: 1574,
          seats: 1,
          percentageValid: 4.14,
          councilors: [
            { name: 'Deisy Yurany Suárez Acevedo', party: 'ASI - MIRA', votes: 374, cedula: '10.376.291.33' }
          ]
        }
      ],
      allElectedCouncilors: [
        { name: 'Robinson Higinio Giraldo', party: 'Partido Cambio Radical', votes: 1303, cedula: '10.375.813.99' },
        { name: 'Carlos Alberto Gómez Yarce', party: 'Partido Político Creemos', votes: 1018, cedula: '1.035.425.982' },
        { name: 'Jonathan Eduardo Chaverra Ortiz', party: 'Partido Alianza Verde', votes: 885, cedula: '1.035.420.271' },
        { name: 'Juan Sebastian Hernández Foronda', party: 'Partido Cambio Radical', votes: 847, cedula: '10.354.298.77' },
        { name: 'Juan David Quintero Arango', party: 'Partido de la Unión por la Gente - Partido de la U', votes: 785, cedula: '10.354.311.52' },
        { name: 'Julián Marcelo Machado Cadavid', party: 'Partido Liberal Colombiano', votes: 737, cedula: '15.515.272' },
        { name: 'Juan Camilo Ramírez Gallón', party: 'Partido Alianza Verde', votes: 705, cedula: '71.364.638' },
        { name: 'Edwin Ramírez Lopera', party: 'Partido Conservador Colombiano', votes: 677, cedula: '15.519.017' },
        { name: 'Julián Andrés Tobón Martínez', party: 'Partido Político Creemos', votes: 647, cedula: '1.035.424.146' },
        { name: 'Nelson Camilo Quiceno Hernández', party: 'Partido Liberal Colombiano', votes: 621, cedula: '10.354.230.06' },
        { name: 'Edwin Alexander Gómez', party: 'Partido Nuevo Liberalismo', votes: 590, cedula: '15.516.361' },
        { name: 'Carolina Díaz González', party: 'Partido Alianza Verde', votes: 582, cedula: '10.354.375.21' },
        { name: 'Yilber Andrés Montoya Bernal', party: 'Partido Político Creemos', votes: 576, cedula: '10.376.310.16' },
        { name: 'Margarita María Muñoz Giraldo', party: 'Partido Centro Democrático', votes: 377, cedula: '42.687.560' },
        { name: 'Deisy Yurany Suárez Acevedo', party: 'ASI - MIRA', votes: 374, cedula: '10.376.291.33' }
      ]
    },
    governor: {
      totalVotes: 40477,
      totalValidVotes: 36758,
      blankVotes: 4448,
      topCandidates: [
        { name: 'Andrés Julián Rendón Cardona', party: 'Por Antioquia Firme', votes: 11870 },
        { name: 'Luis Emilio Pérez Gutiérrez', party: 'Piensa en Grande', votes: 8306 },
        { name: 'Luis Fernando Suárez Vélez', party: 'Unidos por Antioquia', votes: 6053 },
        { name: 'Esteban Restrepo Taborda', party: 'Independientes', votes: 4524 },
        { name: 'Mauricio Tobón Franco', party: 'El Parche', votes: 937 }
      ]
    },
    assembly: {
      totalVotes: 40382,
      totalValidVotes: 34346,
      blankVotes: 8305,
      topParties: [
        { party: 'Partido Centro Democrático', votes: 4999 },
        { party: 'Partido Político Creemos', votes: 4279 },
        { party: 'Partido Liberal Colombiano', votes: 3614 },
        { party: 'Partido Alianza Verde', votes: 3252 },
        { party: 'Partido Conservador Colombiano', votes: 3042 },
        { party: 'Pacto Histórico', votes: 1992 },
        { party: 'Juntos', votes: 1746 },
        { party: 'Coalición Antioquia Te Pertenece', votes: 1046 },
        { party: 'Independientes', votes: 805 },
        { party: 'Partido Alianza Social Independiente "ASI"', votes: 657 }
      ],
      topCandidates: [
        { name: 'Pacto Histórico (Lista Cerrada)', party: 'Pacto Histórico', votes: 1992, notes: 'Sin Preferencia' },
        { name: 'Jonathan Andrés Roldán Jiménez', party: 'Partido Liberal Colombiano', votes: 1460, notes: 'Preferente (051)' },
        { name: 'Verónica Arango García', party: 'Partido Centro Democrático', votes: 831, notes: 'Preferente (051)' },
        { name: 'Jaime Alonso Cano Martínez', party: 'Partido Conservador Colombiano', votes: 762, notes: 'Preferente (051)' },
        { name: 'Gabriel Jaime Giraldo Bustamante', party: 'Partido Centro Democrático', votes: 762, notes: 'Preferente (055)' },
        { name: 'Julieth Zulema Zapata Cardona', party: 'Partido Político Creemos', votes: 678, notes: 'Preferente (061)' },
        { name: 'Jorge Alonso Correa Betancur', party: 'Partido Conservador Colombiano', votes: 622, notes: 'Preferente (055)' },
        { name: 'César de Jesús Curi Curi', party: 'Partido Alianza Verde', votes: 589, notes: 'Preferente (062)' },
        { name: 'John Edison Molina Ortiz', party: 'Partido Conservador Colombiano', votes: 573, notes: 'Preferente (056)' },
        { name: 'Andrés Felipe Bedoya Rendón', party: 'Partido Político Creemos', votes: 523, notes: 'Preferente (051)' },
        { name: 'John Alexander Osorio Osorio', party: 'Juntos', votes: 439, notes: 'Preferente (076)' },
        { name: 'Juan Carlos Palacio Fernández', party: 'Partido Liberal Colombiano', votes: 437, notes: 'Preferente (055)' },
        { name: 'Edison Antonio Restrepo Ruiz', party: 'Partido Centro Democrático', votes: 426, notes: 'Preferente (076)' },
        { name: 'Nestor Mauricio Caly Padilla', party: 'Juntos', votes: 387, notes: 'Preferente (055)' },
        { name: 'Luis Gabriel Gómez Grisales', party: 'Partido Centro Democrático', votes: 370, notes: 'Preferente (052)' }
      ]
    }
  }
];

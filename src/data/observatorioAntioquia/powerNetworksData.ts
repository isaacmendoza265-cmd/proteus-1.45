import { PartyPowerNetwork, PowerHouseNode, PowerActor } from './types';
import { MUNICIPALITIES_DATA } from './municipalitiesData';
import { getPowerHousesForParty } from './powerHousesData';

const RAW_TOP_15_PARTIES: Omit<PartyPowerNetwork, 'powerHouses'>[] = [
  {
    id: 'creemos',
    name: 'Partido Político Creemos',
    shortName: 'Creemos',
    color: '#84cc16',
    logoInitial: 'C',
    rank: 1,
    totalCouncilVotes: 260573,
    totalCouncilSeats: 18,
    municipalitiesWithSeats: 6,
    mayorsWonCount: 2,
    presenceByMunicipality: [
      {
        municipalityId: 'medellin',
        municipalityName: 'Medellín',
        councilVotes: 226470,
        councilSeats: 8,
        isMayorParty: true,
        mayorName: 'Federico Andrés Gutiérrez Zuluaga (697.910 votos - 73.63%)',
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
        municipalityId: 'copacabana',
        municipalityName: 'Copacabana',
        councilVotes: 5219,
        councilSeats: 3,
        isMayorParty: true,
        mayorName: 'Johnnatan Andrés Pineda Agudelo (13.421 votos)',
        councilors: [
          { name: 'Carlos Alberto Gómez Yarce', party: 'Partido Político Creemos', votes: 1018, cedula: '1.035.425.982' },
          { name: 'Julián Andrés Tobón Martínez', party: 'Partido Político Creemos', votes: 647, cedula: '1.035.424.146' },
          { name: 'Yilber Andrés Montoya Bernal', party: 'Partido Político Creemos', votes: 576, cedula: '10.376.310.16' }
        ]
      },
      {
        municipalityId: 'sabaneta',
        municipalityName: 'Sabaneta',
        councilVotes: 4952,
        councilSeats: 2,
        councilors: [
          { name: 'Alliday Tobón Henao', party: 'Partido Político Creemos', votes: 850 },
          { name: 'Iván Alonso Montoya Urrego', party: 'Partido Político Creemos', votes: 13836, isOppositionSeat: true, notes: 'Curul Ley 1909 Estatuto de Oposición (2.º lugar Alcaldía)' }
        ]
      },
      {
        municipalityId: 'envigado',
        municipalityName: 'Envigado',
        councilVotes: 8596,
        councilSeats: 1,
        councilors: [
          { name: 'Luz Marina López Peña', party: 'Partido Político Creemos', votes: 2450 }
        ]
      },
      {
        municipalityId: 'caldas',
        municipalityName: 'Caldas',
        councilVotes: 4087,
        councilSeats: 3,
        councilors: [
          { name: 'Luis Aníbal Vergara Ochoa', party: 'Partido Político Creemos', votes: 720, cedula: '71.394.549' },
          { name: 'Fabio de Jesús Guzmán Echeverri', party: 'Partido Político Creemos', votes: 636, cedula: '71.391.232' },
          { name: 'Raúl Alejandro Mesa Correa', party: 'Partido Político Creemos', votes: 10982, cedula: '71.399.771', isOppositionSeat: true, notes: 'Curul Ley 1909 Estatuto de Oposición (2.º lugar Alcaldía)' }
        ]
      },
      {
        municipalityId: 'la-estrella',
        municipalityName: 'La Estrella',
        councilVotes: 1740,
        councilSeats: 1,
        councilors: [
          { name: 'Fernando de Jesús Moreno Moreno', party: 'Partido Político Creemos', votes: 337, cedula: '7.158.322.1' }
        ]
      }
    ]
  },
  {
    id: 'centro-democratico',
    name: 'Partido Centro Democrático',
    shortName: 'Centro Democrático',
    color: '#0284c7',
    logoInitial: 'CD',
    rank: 2,
    totalCouncilVotes: 244588,
    totalCouncilSeats: 23,
    municipalitiesWithSeats: 9,
    mayorsWonCount: 0,
    presenceByMunicipality: [
      {
        municipalityId: 'medellin',
        municipalityName: 'Medellín',
        councilVotes: 163752,
        councilSeats: 5,
        councilors: [
          { name: 'Sebastián López Valencia', party: 'Partido Centro Democrático', votes: 42444, cedula: '98.764.731' },
          { name: 'Claudia Victoria Carrasquilla Minami', party: 'Partido Centro Democrático', votes: 14966, cedula: '43.497.054' },
          { name: 'Luis Guillermo De Jesús Vélez Álvarez', party: 'Partido Centro Democrático', votes: 9648, cedula: '70.063.180' },
          { name: 'Andrés Felipe Rodríguez Puerta', party: 'Partido Centro Democrático', votes: 6186, cedula: '812.768.1' },
          { name: 'Leticia Orrego Pérez', party: 'Partido Centro Democrático', votes: 6131, cedula: '21.911.590' }
        ]
      },
      {
        municipalityId: 'bello',
        municipalityName: 'Bello',
        councilVotes: 29454,
        councilSeats: 5,
        councilors: [
          { name: 'Bedoya García Duván Alberto', party: 'Partido Centro Democrático', votes: 4590 },
          { name: 'Villa Maldonado Daniel Rodrigo', party: 'Partido Centro Democrático', votes: 3951 },
          { name: 'Arango Palacio Jorge Armando', party: 'Partido Centro Democrático', votes: 2604 },
          { name: 'Gálvez Sánchez Víctor Hugo', party: 'Partido Centro Democrático', votes: 1748 },
          { name: 'Martínez Villa Herika Janneth', party: 'Partido Centro Democrático', votes: 1626 }
        ]
      },
      {
        municipalityId: 'envigado',
        municipalityName: 'Envigado',
        councilVotes: 25750,
        councilSeats: 6,
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
        municipalityId: 'sabaneta',
        municipalityName: 'Sabaneta',
        councilVotes: 6728,
        councilSeats: 2,
        councilors: [
          { name: 'José Daniel Restrepo Montoya', party: 'Partido Centro Democrático', votes: 2324 },
          { name: 'Julián David Ceballos Montoya', party: 'Partido Centro Democrático', votes: 764 }
        ]
      },
      {
        municipalityId: 'itagui',
        municipalityName: 'Itagüí',
        councilVotes: 8411,
        councilSeats: 1,
        councilors: [
          { name: 'Walter Esneider Betancur Montoya', party: 'Partido Centro Democrático', votes: 8411, notes: 'Voto Lista Cerrada' }
        ]
      },
      {
        municipalityId: 'la-estrella',
        municipalityName: 'La Estrella',
        councilVotes: 2907,
        councilSeats: 2,
        councilors: [
          { name: 'Willington Herrera Arroyave', party: 'Partido Centro Democrático', votes: 533, cedula: '98.658.912' },
          { name: 'John Edison Ocampo Mejía', party: 'Partido Centro Democrático', votes: 380, cedula: '1.040.732.698' }
        ]
      },
      {
        municipalityId: 'copacabana',
        municipalityName: 'Copacabana',
        councilVotes: 2664,
        councilSeats: 1,
        councilors: [
          { name: 'Margarita María Muñoz Giraldo', party: 'Partido Centro Democrático', votes: 377, cedula: '42.687.560' }
        ]
      },
      {
        municipalityId: 'caldas',
        municipalityName: 'Caldas',
        councilVotes: 2142,
        councilSeats: 1,
        councilors: [
          { name: 'Angela María Espinosa Castro', party: 'Centro Democrático - MIRA', votes: 732, cedula: '43.681.300' }
        ]
      },
      {
        municipalityId: 'barbosa',
        municipalityName: 'Barbosa',
        councilVotes: 1611,
        councilSeats: 1,
        councilors: [
          { name: 'Carlos Andrés Zapata Chaverra', party: 'Partido Centro Democrático', votes: 511, cedula: '1.035.233.703' }
        ]
      }
    ]
  },
  {
    id: 'partido-liberal',
    name: 'Partido Liberal Colombiano',
    shortName: 'Partido Liberal',
    color: '#dc2626',
    logoInitial: 'L',
    rank: 3,
    totalCouncilVotes: 133998,
    totalCouncilSeats: 25,
    municipalitiesWithSeats: 9,
    mayorsWonCount: 0,
    presenceByMunicipality: [
      {
        municipalityId: 'envigado',
        municipalityName: 'Envigado',
        councilVotes: 31644,
        councilSeats: 6,
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
        municipalityId: 'medellin',
        municipalityName: 'Medellín',
        councilVotes: 48542,
        councilSeats: 1,
        councilors: [
          { name: 'Farley Jhair Macías Betancur', party: 'Partido Liberal Colombiano', votes: 10491, cedula: '1.152.700.230' }
        ]
      },
      {
        municipalityId: 'bello',
        municipalityName: 'Bello',
        councilVotes: 16489,
        councilSeats: 3,
        councilors: [
          { name: 'Mosquera Gómez Carlos Augusto', party: 'Partido Liberal Colombiano', votes: 2529 },
          { name: 'Giraldo Jaramillo Giovanni', party: 'Partido Liberal Colombiano', votes: 1922 },
          { name: 'Hernández Giraldo Luis Carlos', party: 'Partido Liberal Colombiano', votes: 1899 }
        ]
      },
      {
        municipalityId: 'sabaneta',
        municipalityName: 'Sabaneta',
        councilVotes: 9593,
        councilSeats: 3,
        councilors: [
          { name: 'Ángel Fabricio Henao', party: 'Partido Liberal Colombiano', votes: 2514 },
          { name: 'John Fredy González Montoya', party: 'Partido Liberal Colombiano', votes: 1609 },
          { name: 'Víctor Hugo Gil Salazar', party: 'Partido Liberal Colombiano', votes: 1096 }
        ]
      },
      {
        municipalityId: 'girardota',
        municipalityName: 'Girardota',
        councilVotes: 6985,
        councilSeats: 4,
        councilors: [
          { name: 'Diego Armando Congote Lopera', party: 'Partido Liberal Colombiano', votes: 1184, cedula: '70.329.690' },
          { name: 'Daniel Orozco Córdoba', party: 'Partido Liberal Colombiano', votes: 1146, cedula: '1.035.880.269' },
          { name: 'Sebastián Madrigal Cadavid', party: 'Partido Liberal Colombiano', votes: 1044, cedula: '1.035.854.973' },
          { name: 'Camilo Alzate Jaramillo', party: 'Partido Liberal Colombiano', votes: 1012, cedula: '1.128.434.938' }
        ]
      },
      {
        municipalityId: 'la-estrella',
        municipalityName: 'La Estrella',
        councilVotes: 4508,
        councilSeats: 3,
        councilors: [
          { name: 'Juan Pablo Arteaga Cano', party: 'Partido Liberal Colombiano', votes: 1242, cedula: '1.040.733.333' },
          { name: 'Estiben Orleit Moncada Castañeda', party: 'Partido Liberal Colombiano', votes: 758, cedula: '1.040.739.420' },
          { name: 'Dahyana Pabón Jiménez', party: 'Partido Liberal Colombiano', votes: 660, cedula: '1.010.056.825' }
        ]
      },
      {
        municipalityId: 'copacabana',
        municipalityName: 'Copacabana',
        councilVotes: 4354,
        councilSeats: 2,
        councilors: [
          { name: 'Julián Marcelo Machado Cadavid', party: 'Partido Liberal Colombiano', votes: 737, cedula: '15.515.272' },
          { name: 'Nelson Camilo Quiceno Hernández', party: 'Partido Liberal Colombiano', votes: 621, cedula: '10.354.230.06' }
        ]
      },
      {
        municipalityId: 'caldas',
        municipalityName: 'Caldas',
        councilVotes: 3663,
        councilSeats: 2,
        councilors: [
          { name: 'Juan Camilo Baena Ramírez', party: 'Partido Liberal Colombiano', votes: 1475, cedula: '1.026.137.298' },
          { name: 'Juliana Sepúlveda Arredondo', party: 'Partido Liberal Colombiano', votes: 996, cedula: '1.026.149.983' }
        ]
      },
      {
        municipalityId: 'barbosa',
        municipalityName: 'Barbosa',
        councilVotes: 3274,
        councilSeats: 3,
        councilors: [
          { name: 'Mauricio Antonio Marín Marín', party: 'Partido Liberal Colombiano', votes: 600, cedula: '70.142.871' },
          { name: 'Beatriz Elena Rodríguez Madrid', party: 'Partido Liberal Colombiano', votes: 459, cedula: '39.206.347' },
          { name: 'Mauricio de Jesús Cuartas Agudelo', party: 'Partido Liberal Colombiano', votes: 406, cedula: '70.137.664' }
        ]
      },
      {
        municipalityId: 'itagui',
        municipalityName: 'Itagüí',
        councilVotes: 4946,
        councilSeats: 1,
        councilors: [
          { name: 'Elkin de Jesús Zuleta Estrada', party: 'Partido Liberal Colombiano', votes: 2398 }
        ]
      }
    ]
  },
  {
    id: 'partido-conservador',
    name: 'Partido Conservador Colombiano',
    shortName: 'Conservador',
    color: '#2563eb',
    logoInitial: 'C',
    rank: 4,
    totalCouncilVotes: 129002,
    totalCouncilSeats: 20,
    municipalitiesWithSeats: 9,
    mayorsWonCount: 1,
    presenceByMunicipality: [
      {
        municipalityId: 'itagui',
        municipalityName: 'Itagüí',
        councilVotes: 32419,
        councilSeats: 6,
        isMayorParty: true,
        mayorName: 'Diego León Torres Sánchez (Itagüí Somos Todos - Conservador)',
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
        municipalityId: 'medellin',
        municipalityName: 'Medellín',
        councilVotes: 64288,
        councilSeats: 2,
        councilors: [
          { name: 'Juan Ramón Jiménez Lara', party: 'Partido Conservador Colombiano', votes: 14500, cedula: '76.324.026' },
          { name: 'Brisvani Alexis Arenas Suaza', party: 'Partido Conservador Colombiano', votes: 9657, cedula: '71.363.158' }
        ]
      },
      {
        municipalityId: 'girardota',
        municipalityName: 'Girardota',
        councilVotes: 6518,
        councilSeats: 4,
        councilors: [
          { name: 'María Berenice Álzate Castro', party: 'Partido Conservador Colombiano', votes: 1006, cedula: '39.353.402' },
          { name: 'Juan David Bustamante Bustamante', party: 'Partido Conservador Colombiano', votes: 960, cedula: '70.330.344' },
          { name: 'Sergio Andrés Orlas Jiménez', party: 'Partido Conservador Colombiano', votes: 922, cedula: '70.326.327' },
          { name: 'Reinaldo Zapata Sánchez', party: 'Partido Conservador Colombiano', votes: 872, cedula: '1.035.853.159' }
        ]
      },
      {
        municipalityId: 'envigado',
        municipalityName: 'Envigado',
        councilVotes: 11966,
        councilSeats: 2,
        councilors: [
          { name: 'Gonzalo de Jesús Mesa Ochoa', party: 'Partido Conservador Colombiano', votes: 3120 },
          { name: 'Lucas Gaviria Henao', party: 'Partido Conservador Colombiano', votes: 2840 }
        ]
      },
      {
        municipalityId: 'la-estrella',
        municipalityName: 'La Estrella',
        councilVotes: 2005,
        councilSeats: 1,
        councilors: [
          { name: 'Andrés Camilo Cano Londoño', party: 'Partido Conservador Colombiano', votes: 646, cedula: '1.040.737.013' }
        ]
      },
      {
        municipalityId: 'copacabana',
        municipalityName: 'Copacabana',
        councilVotes: 2097,
        councilSeats: 1,
        councilors: [
          { name: 'Edwin Ramírez Lopera', party: 'Partido Conservador Colombiano', votes: 677, cedula: '15.519.017' }
        ]
      },
      {
        municipalityId: 'barbosa',
        municipalityName: 'Barbosa',
        councilVotes: 3284,
        councilSeats: 3,
        councilors: [
          { name: 'Jeisson Alexander Castaño Jaramillo', party: 'Partido Conservador Colombiano', votes: 550, cedula: '1.035.852.292' },
          { name: 'Diego Alejandro Castaño', party: 'Partido Conservador Colombiano', votes: 516, cedula: '70.879.220' },
          { name: 'Mónica Yanet Henao Zuleta', party: 'Partido Conservador Colombiano', votes: 373, cedula: '39.214.609' }
        ]
      },
      {
        municipalityId: 'sabaneta',
        municipalityName: 'Sabaneta',
        councilVotes: 3910,
        councilSeats: 1,
        councilors: [
          { name: 'Deifer Alexander Morales Castaño', party: 'Partido Conservador Colombiano', votes: 1592 }
        ]
      },
      {
        municipalityId: 'caldas',
        municipalityName: 'Caldas',
        councilVotes: 2515,
        councilSeats: 1,
        councilors: [
          { name: 'Sebastián Querubín Loaiza', party: 'Partido Conservador Colombiano', votes: 553, cedula: '1.036.641.498' }
        ]
      }
    ]
  },
  {
    id: 'alianza-verde',
    name: 'Partido Alianza Verde',
    shortName: 'Alianza Verde',
    color: '#16a34a',
    logoInitial: 'V',
    rank: 5,
    totalCouncilVotes: 75204,
    totalCouncilSeats: 10,
    municipalitiesWithSeats: 7,
    mayorsWonCount: 0,
    presenceByMunicipality: [
      {
        municipalityId: 'medellin',
        municipalityName: 'Medellín',
        councilVotes: 46053,
        councilSeats: 1,
        councilors: [
          { name: 'Alejandro Arias García', party: 'Partido Alianza Verde', votes: 4946, cedula: '10.171.392.58' }
        ]
      },
      {
        municipalityId: 'sabaneta',
        municipalityName: 'Sabaneta',
        councilVotes: 9207,
        councilSeats: 3,
        councilors: [
          { name: 'Juliana Andrea Villegas Orozco', party: 'Partido Alianza Verde', votes: 2323 },
          { name: 'Wilmar Oquendo Cardona', party: 'Partido Alianza Verde', votes: 1672 },
          { name: 'Lucas Restrepo Jiménez', party: 'Partido Alianza Verde', votes: 1337 }
        ]
      },
      {
        municipalityId: 'bello',
        municipalityName: 'Bello',
        councilVotes: 9254,
        councilSeats: 1,
        councilors: [
          { name: 'Heron Mesa Laura', party: 'Partido Alianza Verde', votes: 1100 }
        ]
      },
      {
        municipalityId: 'copacabana',
        municipalityName: 'Copacabana',
        councilVotes: 5110,
        councilSeats: 3,
        councilors: [
          { name: 'Jonathan Eduardo Chaverra Ortiz', party: 'Partido Alianza Verde', votes: 885, cedula: '1.035.420.271' },
          { name: 'Juan Camilo Ramírez Gallón', party: 'Partido Alianza Verde', votes: 705, cedula: '71.364.638' },
          { name: 'Carolina Díaz González', party: 'Partido Alianza Verde', votes: 582, cedula: '10.354.375.21' }
        ]
      },
      {
        municipalityId: 'girardota',
        municipalityName: 'Girardota',
        councilVotes: 2220,
        councilSeats: 1,
        councilors: [
          { name: 'Tulio César Osorio Zapata', party: 'ASI Verde', votes: 533, cedula: '70.323.860' }
        ]
      },
      {
        municipalityId: 'caldas',
        municipalityName: 'Caldas',
        councilVotes: 1975,
        councilSeats: 1,
        councilors: [
          { name: 'John Fredy Jiménez Granados', party: 'Partido Alianza Verde', votes: 694, cedula: '1.026.132.890' }
        ]
      },
      {
        municipalityId: 'barbosa',
        municipalityName: 'Barbosa',
        councilVotes: 1385,
        councilSeats: 1,
        councilors: [
          { name: 'Johnny Enrique Agudelo Franco', party: 'Partido Alianza Verde', votes: 512, cedula: '1.035.225.480' }
        ]
      }
    ]
  },
  {
    id: 'asi',
    name: 'Partido Alianza Social Independiente "ASI"',
    shortName: 'ASI',
    color: '#d97706',
    logoInitial: 'ASI',
    rank: 6,
    totalCouncilVotes: 70518,
    totalCouncilSeats: 10,
    municipalitiesWithSeats: 7,
    mayorsWonCount: 0,
    presenceByMunicipality: [
      {
        municipalityId: 'medellin',
        municipalityName: 'Medellín',
        councilVotes: 37996,
        councilSeats: 1,
        councilors: [
          { name: 'Janeth Hurtado Betancur', party: 'Partido Alianza Social Independiente "ASI"', votes: 6099, cedula: '1.128.448.452' }
        ]
      },
      {
        municipalityId: 'bello',
        municipalityName: 'Bello',
        councilVotes: 14137,
        councilSeats: 2,
        councilors: [
          { name: 'Llano Cañas Jaime', party: 'Partido Alianza Social Independiente "ASI"', votes: 2468 },
          { name: 'Castrillón Zapata Andrée Jovany', party: 'Partido Alianza Social Independiente "ASI"', votes: 2038 }
        ]
      },
      {
        municipalityId: 'itagui',
        municipalityName: 'Itagüí',
        councilVotes: 10069,
        councilSeats: 3,
        councilors: [
          { name: 'Camilo Andrés Valencia Dávila', party: 'Partido Alianza Social Independiente "ASI"', votes: 1681 },
          { name: 'Orlando de Jesús Ramírez Arango', party: 'Partido Alianza Social Independiente "ASI"', votes: 1465 },
          { name: 'León Mario Bedoya López', party: 'Partido Alianza Social Independiente "ASI"', votes: 33894, isOppositionSeat: true, notes: 'Curul Ley 1909 Estatuto de Oposición (2.º lugar Alcaldía)' }
        ]
      },
      {
        municipalityId: 'copacabana',
        municipalityName: 'Copacabana',
        councilVotes: 1574,
        councilSeats: 1,
        councilors: [
          { name: 'Deisy Yurany Suárez Acevedo', party: 'ASI - MIRA', votes: 374, cedula: '10.376.291.33' }
        ]
      },
      {
        municipalityId: 'caldas',
        municipalityName: 'Caldas',
        councilVotes: 2214,
        councilSeats: 1,
        councilors: [
          { name: 'John Jairo Velásquez Ortiz', party: 'Partido Alianza Social Independiente "ASI"', votes: 560, cedula: '98.524.240' }
        ]
      },
      {
        municipalityId: 'barbosa',
        municipalityName: 'Barbosa',
        councilVotes: 1102,
        councilSeats: 1,
        councilors: [
          { name: 'Jesús Ernesto García Sierra', party: 'Partido Alianza Social Independiente "ASI"', votes: 154, cedula: '72.144.284' }
        ]
      },
      {
        municipalityId: 'girardota',
        municipalityName: 'Girardota',
        councilVotes: 2220,
        councilSeats: 1,
        councilors: [
          { name: 'Tulio César Osorio Zapata', party: 'ASI Verde', votes: 533, cedula: '70.323.860' }
        ]
      }
    ]
  },
  {
    id: 'pacto-historico',
    name: 'Pacto Histórico',
    shortName: 'Pacto Histórico',
    color: '#9333ea',
    logoInitial: 'PH',
    rank: 7,
    totalCouncilVotes: 63326,
    totalCouncilSeats: 2,
    municipalitiesWithSeats: 2,
    mayorsWonCount: 0,
    presenceByMunicipality: [
      {
        municipalityId: 'medellin',
        municipalityName: 'Medellín',
        councilVotes: 46988,
        councilSeats: 1,
        councilors: [
          { name: 'José Luis Marín Mora', party: 'Pacto Histórico', votes: 46988, cedula: '10.375.770.70', notes: 'Lista Cerrada' }
        ]
      },
      {
        municipalityId: 'bello',
        municipalityName: 'Bello',
        councilVotes: 6124,
        councilSeats: 1,
        councilors: [
          { name: 'Quintero Espitia Daniel', party: 'Pacto Histórico Bello', votes: 6124, notes: 'Lista Cerrada' }
        ]
      }
    ]
  },
  {
    id: 'juntos',
    name: 'Juntos / Juntos Bello',
    shortName: 'Juntos',
    color: '#ea580c',
    logoInitial: 'J',
    rank: 8,
    totalCouncilVotes: 60915,
    totalCouncilSeats: 3,
    municipalitiesWithSeats: 2,
    mayorsWonCount: 0,
    presenceByMunicipality: [
      {
        municipalityId: 'medellin',
        municipalityName: 'Medellín',
        councilVotes: 43504,
        councilSeats: 1,
        councilors: [
          { name: 'Miguel Ángel Iguarán Osorio', party: 'Juntos', votes: 10271, cedula: '10.375.715.77' }
        ]
      },
      {
        municipalityId: 'bello',
        municipalityName: 'Bello',
        councilVotes: 13489,
        councilSeats: 2,
        councilors: [
          { name: 'Bedoya Gutiérrez Laura Catalina', party: 'Juntos Bello', votes: 2567 },
          { name: 'Velásquez Arango Juan Camilo', party: 'Juntos Bello', votes: 2560 }
        ]
      }
    ]
  },
  {
    id: 'independientes',
    name: 'Independientes',
    shortName: 'Independientes',
    color: '#06b6d4',
    logoInitial: 'IND',
    rank: 9,
    totalCouncilVotes: 42086,
    totalCouncilSeats: 3,
    municipalitiesWithSeats: 2,
    mayorsWonCount: 0,
    presenceByMunicipality: [
      {
        municipalityId: 'medellin',
        municipalityName: 'Medellín',
        councilVotes: 33633,
        councilSeats: 2,
        councilors: [
          { name: 'Carlos Alberto Gutiérrez Bustamante', party: 'Independientes', votes: 3105, cedula: '71.227.585' },
          { name: 'Juan Carlos Upegui Vanegas', party: 'Independientes', votes: 95883, cedula: '1.020.421.384', isOppositionSeat: true, notes: 'Curul Ley 1909 Estatuto de Oposición (2.º lugar Alcaldía)' }
        ]
      },
      {
        municipalityId: 'bello',
        municipalityName: 'Bello',
        councilVotes: 7432,
        councilSeats: 1,
        councilors: [
          { name: 'Arango Velásquez Isabel Cristina', party: 'Independientes', votes: 1735 }
        ]
      }
    ]
  },
  {
    id: 'cambio-radical',
    name: 'Partido Cambio Radical',
    shortName: 'Cambio Radical',
    color: '#e11d48',
    logoInitial: 'CR',
    rank: 10,
    totalCouncilVotes: 20386,
    totalCouncilSeats: 7,
    municipalitiesWithSeats: 5,
    mayorsWonCount: 0,
    presenceByMunicipality: [
      {
        municipalityId: 'sabaneta',
        municipalityName: 'Sabaneta',
        councilVotes: 5662,
        councilSeats: 2,
        councilors: [
          { name: 'Juan David Montoya Vásquez', party: 'Partido Cambio Radical', votes: 2005 },
          { name: 'José Julián Cano Castro', party: 'Partido Cambio Radical', votes: 1364, notes: 'Asignado por recálculo' }
        ]
      },
      {
        municipalityId: 'copacabana',
        municipalityName: 'Copacabana',
        councilVotes: 4474,
        councilSeats: 2,
        councilors: [
          { name: 'Robinson Higinio Giraldo', party: 'Partido Cambio Radical', votes: 1303, cedula: '10.375.813.99' },
          { name: 'Juan Sebastian Hernández Foronda', party: 'Partido Cambio Radical', votes: 847, cedula: '10.354.298.77' }
        ]
      },
      {
        municipalityId: 'envigado',
        municipalityName: 'Envigado',
        councilVotes: 5023,
        councilSeats: 1,
        councilors: [
          { name: 'Carlos Augusto Ossa Betancur', party: 'Partido Cambio Radical', votes: 1620 }
        ]
      },
      {
        municipalityId: 'caldas',
        municipalityName: 'Caldas',
        councilVotes: 3620,
        councilSeats: 1,
        councilors: [
          { name: 'Luis Hernando Yepes Torres', party: 'Partido Cambio Radical', votes: 742, cedula: '70.519.981' }
        ]
      },
      {
        municipalityId: 'barbosa',
        municipalityName: 'Barbosa',
        councilVotes: 1067,
        councilSeats: 1,
        councilors: [
          { name: 'Víctor Antonio Graciano Ramírez', party: 'Partido Cambio Radical', votes: 7718, cedula: '71.625.467', isOppositionSeat: true, notes: 'Curul Ley 1909 Estatuto de Oposición (2.º lugar Alcaldía)' }
        ]
      }
    ]
  },
  {
    id: 'mais-aico',
    name: 'MAIS - AICO / Autoridades Indígenas',
    shortName: 'MAIS - AICO',
    color: '#b45309',
    logoInitial: 'AI',
    rank: 11,
    totalCouncilVotes: 18232,
    totalCouncilSeats: 4,
    municipalitiesWithSeats: 2,
    mayorsWonCount: 0,
    presenceByMunicipality: [
      {
        municipalityId: 'itagui',
        municipalityName: 'Itagüí',
        councilVotes: 15320,
        councilSeats: 3,
        councilors: [
          { name: 'Shirley Natalia Ortiz Ossa', party: 'MAIS - AICO', votes: 2044 },
          { name: 'Jhon Alejandro Otálvaro Arenas', party: 'MAIS - AICO', votes: 2021 },
          { name: 'Cristian David Osorio Agudelo', party: 'MAIS - AICO', votes: 1994 }
        ]
      },
      {
        municipalityId: 'barbosa',
        municipalityName: 'Barbosa',
        councilVotes: 1124,
        councilSeats: 1,
        councilors: [
          { name: 'Reinaldo de Jesús Zapata Marín', party: 'Movimiento Autoridades Indígenas de Colombia "AICO"', votes: 221, cedula: '70.135.168' }
        ]
      }
    ]
  },
  {
    id: 'gente-en-movimiento',
    name: 'Partido Político Gente en Movimiento',
    shortName: 'Gente en Movimiento',
    color: '#0d9488',
    logoInitial: 'GM',
    rank: 12,
    totalCouncilVotes: 14832,
    totalCouncilSeats: 3,
    municipalitiesWithSeats: 2,
    mayorsWonCount: 0,
    presenceByMunicipality: [
      {
        municipalityId: 'itagui',
        municipalityName: 'Itagüí',
        councilVotes: 7658,
        councilSeats: 1,
        councilors: [
          { name: 'Sebastián García Rojas', party: 'Partido Político Gente en Movimiento', votes: 1732 }
        ]
      },
      {
        municipalityId: 'barbosa',
        municipalityName: 'Barbosa',
        councilVotes: 2307,
        councilSeats: 2,
        councilors: [
          { name: 'Juan Felipe Agudelo Carmona', party: 'Partido Político Gente en Movimiento', votes: 620, cedula: '1.035.227.537' },
          { name: 'Álvaro Rinaldi Martínez', party: 'Partido Político Gente en Movimiento', votes: 415, cedula: '73.103.829' }
        ]
      }
    ]
  },
  {
    id: 'partido-de-la-u',
    name: 'Partido de la Unión por la Gente (La U)',
    shortName: 'Partido de la U',
    color: '#f97316',
    logoInitial: 'U',
    rank: 13,
    totalCouncilVotes: 16198,
    totalCouncilSeats: 4,
    municipalitiesWithSeats: 4,
    mayorsWonCount: 0,
    presenceByMunicipality: [
      {
        municipalityId: 'copacabana',
        municipalityName: 'Copacabana',
        councilVotes: 2184,
        councilSeats: 1,
        councilors: [
          { name: 'Juan David Quintero Arango', party: 'Partido de la Unión por la Gente - Partido de la U', votes: 785, cedula: '10.354.311.52' }
        ]
      },
      {
        municipalityId: 'caldas',
        municipalityName: 'Caldas',
        councilVotes: 2603,
        councilSeats: 1,
        councilors: [
          { name: 'Astrid Janneth Quirós Colorado', party: 'Partido de la Unión por la Gente - Partido de la U', votes: 976, cedula: '43.687.504' }
        ]
      },
      {
        municipalityId: 'la-estrella',
        municipalityName: 'La Estrella',
        councilVotes: 2229,
        councilSeats: 1,
        councilors: [
          { name: 'Natalia Alejandra Londoño Parra', party: 'Partido de la Unión por la Gente - Partido de la U', votes: 698, cedula: '32.351.806' }
        ]
      },
      {
        municipalityId: 'barbosa',
        municipalityName: 'Barbosa',
        councilVotes: 1742,
        councilSeats: 1,
        councilors: [
          { name: 'Fran Esteban García Gaviria', party: 'Partido de la Unión por la Gente - Partido de la U', votes: 428, cedula: '70.140.773' }
        ]
      }
    ]
  },
  {
    id: 'unidos-por-bello',
    name: 'Unidos por Bello',
    shortName: 'Unidos por Bello',
    color: '#0891b2',
    logoInitial: 'UB',
    rank: 14,
    totalCouncilVotes: 9934,
    totalCouncilSeats: 2,
    municipalitiesWithSeats: 1,
    mayorsWonCount: 0,
    presenceByMunicipality: [
      {
        municipalityId: 'bello',
        municipalityName: 'Bello',
        councilVotes: 9934,
        councilSeats: 2,
        councilors: [
          { name: 'Gómez Suárez Gustavo Adolfo', party: 'Unidos por Bello', votes: 1901 },
          { name: 'Herrera Ramírez Dorian Mauricio', party: 'Unidos por Bello', votes: 1111 }
        ]
      }
    ]
  },
  {
    id: 'movimientos-locales',
    name: 'Movimientos Ciudadanos y Coaliciones',
    shortName: 'Movimientos Ciudadanos',
    color: '#4f46e5',
    logoInitial: 'MC',
    rank: 15,
    totalCouncilVotes: 49090,
    totalCouncilSeats: 19,
    municipalitiesWithSeats: 7,
    mayorsWonCount: 6,
    presenceByMunicipality: [
      {
        municipalityId: 'copacabana',
        municipalityName: 'Copacabana',
        councilVotes: 2090,
        councilSeats: 1,
        councilors: [
          { name: 'Edwin Alexander Gómez', party: 'Partido Nuevo Liberalismo', votes: 590, cedula: '15.516.361' }
        ]
      },
      {
        municipalityId: 'envigado',
        municipalityName: 'Envigado',
        councilVotes: 12886,
        councilSeats: 2,
        isMayorParty: true,
        mayorName: 'Raúl Eduardo Cardona González (Envigado, Vamos Adelante - 46.865 votos)',
        councilors: [
          { name: 'Juan Diego Álvarez Upegui', party: 'Todos Somos Envigado', votes: 1980 },
          { name: 'Leo Alexander Alzate Suárez', party: 'Siempre Adelante', votes: 1750 }
        ]
      },
      {
        municipalityId: 'girardota',
        municipalityName: 'Girardota',
        councilVotes: 18938,
        councilSeats: 5,
        isMayorParty: true,
        mayorName: 'Kevin René Bernal Morales (Decencia en lo Público - 13.197 votos)',
        councilors: [
          { name: 'Sebastián Zapata Arias', party: 'Primero Girardota', votes: 1220, cedula: '1.035.867.624' },
          { name: 'Mary Sol Henao Bustamante', party: 'Primero Girardota', votes: 772, cedula: '39.356.906' },
          { name: 'Jaime de Jesús Montoya Ospina', party: 'Movimiento Alianza Democrática Amplia (ADA)', votes: 942, cedula: '70.328.621' },
          { name: 'Robert David Marulanda Rúa', party: 'Movimiento Alianza Democrática Amplia (ADA)', votes: 556, cedula: '1.035.870.014' },
          { name: 'Juan Ignacio Torres Gómez', party: 'Girardota Territorio de Vida', votes: 11393, cedula: '70.330.056', isOppositionSeat: true, notes: 'Curul Ley 1909 Oposición' }
        ]
      },
      {
        municipalityId: 'la-estrella',
        municipalityName: 'La Estrella',
        councilVotes: 12414,
        councilSeats: 7,
        isMayorParty: true,
        mayorName: 'Carlos Mario Gutiérrez Arrubla (Coalición Por el Camino Correcto - 11.538 votos)',
        councilors: [
          { name: 'Walter Alexis Londoño Agudelo', party: 'Imparables', votes: 546, cedula: '1.036.611.549' },
          { name: 'Nathacha Gil Escobar', party: 'Imparables', votes: 127, cedula: '1.040.745.181' },
          { name: 'Jhon Mauricio Oquendo Cadavid', party: 'Movimiento Político Fuerza Ciudadana', votes: 942, cedula: '1.040.738.219' },
          { name: 'Daniel Garcés Flórez', party: 'Partido Demócrata Colombiano', votes: 801, cedula: '1.040.742.162' },
          { name: 'Juan David Barco Aguirre', party: 'Una Estrella Para Todos', votes: 518, cedula: '1.036.613.256' },
          { name: 'Gustavo Aguilar Pérez', party: 'Alianza CREO', votes: 399, cedula: '70.084.774' },
          { name: 'Sebastián Tapias Madrigal', party: 'Hacemos Conciencia', votes: 366, cedula: '1.026.156.607' }
        ]
      },
      {
        municipalityId: 'caldas',
        municipalityName: 'Caldas',
        councilVotes: 9907,
        councilSeats: 5,
        isMayorParty: true,
        mayorName: 'Jorge Mario Rendón Vélez (Coalición Profe Piolo Cremos - 12.927 votos)',
        councilors: [
          { name: 'Jaime Bedoya Castaño', party: 'Profe Piolo Cremos', votes: 619, cedula: '1.026.160.607' },
          { name: 'Yenifer Restrepo Henao', party: 'Profe Piolo Cremos', votes: 611, cedula: '1.026.153.730' },
          { name: 'Jonathan Hurtado Betancur', party: 'Diálogo Ciudadano', votes: 921, cedula: '1.026.138.418' },
          { name: 'Jose David Rodríguez Molina', party: 'Diálogo Ciudadano', votes: 704, cedula: '1.026.146.796' },
          { name: 'James Andrés Arango Valencia', party: 'Partido Nuevo Liberalismo', votes: 396, cedula: '3.402.409' }
        ]
      },
      {
        municipalityId: 'itagui',
        municipalityName: 'Itagüí',
        councilVotes: 14416,
        councilSeats: 2,
        councilors: [
          { name: 'Gloria Cecilia Herrera Ospina', party: 'Itagüí Somos Todos', votes: 1582 },
          { name: 'Luisa María Zapata Bernal', party: 'Itagüí Somos Todos', votes: 1483 }
        ]
      },
      {
        municipalityId: 'sabaneta',
        municipalityName: 'Sabaneta',
        councilVotes: 3628,
        councilSeats: 1,
        isMayorParty: true,
        mayorName: 'Alder James Cruz Ocampo (Alder Cruz Alcalde - 19.940 votos)',
        councilors: [
          { name: 'Elisa Carolina Tobón Ospina', party: 'La Sabaneta que Queremos', votes: 750 }
        ]
      }
    ]
  }
];

function buildDefaultHouseForParty(p: Omit<PartyPowerNetwork, 'powerHouses'>): PowerHouseNode[] {
  const actors: PowerActor[] = [];

  p.presenceByMunicipality.forEach((m) => {
    if (m.isMayorParty && m.mayorName) {
      actors.push({
        id: `${p.id}-mayor-${m.municipalityId}`,
        name: m.mayorName.split('(')[0].trim(),
        role: 'alcalde',
        roleLabel: `Alcalde de ${m.municipalityName}`,
        municipality: m.municipalityName,
        status: 'Alcalde Electo 2024-2027',
        notes: m.mayorName
      });
    }
    m.councilors.forEach((c, idx) => {
      actors.push({
        id: `${p.id}-c-${m.municipalityId}-${idx}`,
        name: c.name,
        role: 'concejal',
        roleLabel: `Concejal de ${m.municipalityName}`,
        municipality: m.municipalityName,
        status: c.isOppositionSeat ? 'Curul Estatuto de Oposición' : 'En funciones',
        votes: c.votes,
        cedula: c.cedula,
        notes: c.notes || `Concejal electo por ${p.name}`
      });
    });
  });

  return [
    {
      id: `${p.id}-house-desconocido`,
      number: 1,
      name: 'Desconocido',
      description: 'Concejales y mandatarios electos agrupados bajo la estructura general del partido (Casas o nodos de poder internos no determinados).',
      color: p.color,
      leader: `Estructura Oficial de ${p.shortName}`,
      actors: actors
    }
  ];
}

export const TOP_15_PARTIES: PartyPowerNetwork[] = RAW_TOP_15_PARTIES.map((p) => {
  const predefinedHouses = getPowerHousesForParty(p.id);
  return {
    ...p,
    powerHouses: predefinedHouses.length > 0 ? predefinedHouses : buildDefaultHouseForParty(p)
  };
});

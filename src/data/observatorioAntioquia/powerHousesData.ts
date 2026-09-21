import { PowerHouseNode } from './types';

export const CENTRO_DEMOCRATICO_HOUSES: PowerHouseNode[] = [
  {
    id: 'valencia-berrio',
    number: 1,
    name: 'Valencia-Berrío',
    description: 'Casa política orientada por el líder histórico Fabio Valencia Cossio y el Representante Jhon Jairo Berrío.',
    color: '#0284c7',
    leader: 'Fabio Valencia Cossio & Jhon Jairo Berrío',
    actors: [
      {
        id: 'cd-1-1',
        name: 'Fabio Valencia Cossio',
        role: 'lider_historico',
        roleLabel: 'Líder Histórico',
        municipality: 'Nacional / Antioquia',
        status: 'Líder Histórico del Partido',
        notes: 'Exministro y cofundador del Centro Democrático'
      },
      {
        id: 'cd-1-2',
        name: 'Sebastián López Valencia',
        role: 'concejal',
        roleLabel: 'Concejal Electo',
        municipality: 'Medellín',
        status: 'Concejal electo (42.444 votos) - Futuro candidato a la Alcaldía de Medellín',
        votes: 42444,
        cedula: '98.764.731',
        notes: 'Cabeza de lista al Concejo de Medellín 2023. Renunció para aspiración a Alcaldía.'
      },
      {
        id: 'cd-1-3',
        name: 'Jhon Jairo Berrío López',
        role: 'representante',
        roleLabel: 'Representante a la Cámara',
        municipality: 'Antioquia',
        status: 'En funciones (Congreso de la República)',
        notes: 'Representante a la Cámara por Antioquia'
      },
      {
        id: 'cd-1-4',
        name: 'Juan Carlos Vélez Mesa',
        role: 'concejal',
        roleLabel: 'Concejal de Envigado',
        municipality: 'Envigado',
        status: 'En funciones',
        votes: 3110,
        notes: 'Concejal del Centro Democrático en Envigado'
      }
    ]
  },
  {
    id: 'oriente-rionegro',
    number: 2,
    name: 'Oriente-Rionegro',
    description: 'Nodo de poder del Oriente Antioqueño liderado por el Gobernador Andrés Julián Rendón y el Senador Esteban Quintero.',
    color: '#0369a1',
    leader: 'Andrés Julián Rendón & Esteban Quintero',
    actors: [
      {
        id: 'cd-2-1',
        name: 'Andrés Julián Rendón Cardona',
        role: 'gobernador',
        roleLabel: 'Gobernador de Antioquia',
        municipality: 'Antioquia',
        status: 'Gobernador Electo 2024-2027 (944.859 votos en el Dpto.)',
        votes: 944859,
        notes: 'Gobernador de Antioquia por la coalición Por Antioquia Firme'
      },
      {
        id: 'cd-2-2',
        name: 'Rubén Darío Quintero Villada',
        role: 'lider_historico',
        roleLabel: 'Líder Histórico',
        municipality: 'Rionegro / Oriente',
        status: 'Líder Histórico del Oriente Antioqueño',
        notes: 'Exalcalde de Rionegro y exsenador'
      },
      {
        id: 'cd-2-3',
        name: 'Esteban Quintero Cardona',
        role: 'senador',
        roleLabel: 'Senador de la República',
        municipality: 'Nacional / Antioquia',
        status: 'En funciones (Senado de la República)',
        notes: 'Senador del Centro Democrático'
      },
      {
        id: 'cd-2-4',
        name: 'Gregorio Orjuela Pérez',
        role: 'representante',
        roleLabel: 'Representante a la Cámara',
        municipality: 'Antioquia',
        status: 'Representante a la Cámara por Antioquia',
        notes: 'Exdiputado de Antioquia'
      },
      {
        id: 'cd-2-5',
        name: 'Pedro Juan Arango',
        role: 'excandidato',
        roleLabel: 'Excandidato al Concejo',
        municipality: 'Medellín',
        status: 'Excandidato al Concejo de Medellín 2023',
        notes: 'Dirigente juvenil y miembro del equipo Oriente-Rionegro'
      },
      {
        id: 'cd-2-6',
        name: 'Luis Gabriel Gómez',
        role: 'diputado',
        roleLabel: 'Diputado de Antioquia',
        municipality: 'Antioquia',
        status: 'En funciones (Asamblea Departamental)',
        notes: 'Diputado del Centro Democrático en la Asamblea de Antioquia'
      }
    ]
  },
  {
    id: 'equipo-oscar-dario',
    number: 3,
    name: 'Equipo Óscar Darío',
    description: 'Estructura política orientada por el experimentado congresista Óscar Darío Pérez.',
    color: '#0891b2',
    leader: 'Óscar Darío Pérez Pineda',
    actors: [
      {
        id: 'cd-3-1',
        name: 'Óscar Darío Pérez Pineda',
        role: 'representante',
        roleLabel: 'Representante a la Cámara',
        municipality: 'Antioquia',
        status: 'En funciones (Congreso de la República)',
        notes: 'Decano de los Representantes por Antioquia y referente económico'
      },
      {
        id: 'cd-3-2',
        name: 'Leticia Orrego Pérez',
        role: 'concejal',
        roleLabel: 'Concejal de Medellín',
        municipality: 'Medellín',
        status: 'En funciones (6.131 votos)',
        votes: 6131,
        cedula: '21.911.590',
        notes: 'Concejal reelecta de Medellín'
      }
    ]
  },
  {
    id: 'equipo-hernan-cadavid',
    number: 4,
    name: 'Equipo de Hernán Cadavid',
    description: 'Estructura legislativa y territorial liderada por Hernán Cadavid y Ana Ligia Mora.',
    color: '#2563eb',
    leader: 'Hernán Cadavid Márquez',
    actors: [
      {
        id: 'cd-4-1',
        name: 'Hernán Darío Cadavid Márquez',
        role: 'senador',
        roleLabel: 'Senador de la República',
        municipality: 'Nacional / Antioquia',
        status: 'Senador de la República',
        notes: 'Líder del equipo legislativo Cadavid'
      },
      {
        id: 'cd-4-2',
        name: 'Ana Ligia Mora Martínez',
        role: 'representante',
        roleLabel: 'Representante a la Cámara',
        municipality: 'Antioquia',
        status: 'Representante a la Cámara por Antioquia',
        notes: 'Exdirectora de Corantioquia y congresista'
      },
      {
        id: 'cd-4-3',
        name: 'Edison Restrepo',
        role: 'diputado',
        roleLabel: 'Diputado de Antioquia',
        municipality: 'Antioquia',
        status: 'En funciones (Asamblea Departamental)',
        notes: 'Diputado en la Asamblea de Antioquia'
      }
    ]
  },
  {
    id: 'los-paolos',
    number: 5,
    name: 'Paolos',
    description: 'Nodo fundado alrededor del liderazgo de Paola Holguín y el Senador Juan Espinal.',
    color: '#7c3aed',
    leader: 'Paola Holguín & Juan Espinal',
    actors: [
      {
        id: 'cd-5-1',
        name: 'Paola Andrea Holguín Moreno',
        role: 'senador',
        roleLabel: 'Exsenadora / Ministra de Cultura',
        municipality: 'Nacional',
        status: 'Estatus: Ministra de Cultura (Se fue del Centro Democrático)',
        notes: 'Fundadora histórica del movimiento Los Paolos'
      },
      {
        id: 'cd-5-2',
        name: 'Juan Fernando Espinal Ramírez',
        role: 'senador',
        roleLabel: 'Senador de la República',
        municipality: 'Nacional / Antioquia',
        status: 'En funciones (Senado de la República)',
        notes: 'Senador del Centro Democrático'
      },
      {
        id: 'cd-5-3',
        name: 'Verónica Arango García',
        role: 'diputado',
        roleLabel: 'Diputada de Antioquia',
        municipality: 'Antioquia',
        status: 'En funciones (Asamblea Departamental)',
        notes: 'Diputada de Antioquia por el Centro Democrático'
      },
      {
        id: 'cd-5-4',
        name: 'Milton Darío Vasco Vasco',
        role: 'concejal_reemplazo',
        roleLabel: 'Concejal de Medellín',
        municipality: 'Medellín',
        status: 'Concejal posesionado tras la renuncia de Sebastián López',
        notes: 'Ingresó al Concejo de Medellín en la curul del Centro Democrático'
      },
      {
        id: 'cd-5-5',
        name: 'Juliana Hernández',
        role: 'excandidato',
        roleLabel: 'Excandidata al Concejo',
        municipality: 'Medellín',
        status: 'Excandidata al Concejo de Medellín 2023',
        notes: 'Miembro del movimiento Los Paolos'
      },
      {
        id: 'cd-5-6',
        name: 'Alejandro Sánchez Grajales',
        role: 'concejal',
        roleLabel: 'Concejal de Envigado',
        municipality: 'Envigado',
        status: 'En funciones (2.980 votos)',
        votes: 2980,
        notes: 'Concejal de Envigado adscrito a Los Paolos'
      }
    ]
  },
  {
    id: 'la-siembra',
    number: 6,
    name: 'La Siembra',
    description: 'Movimiento político y territorial orientado por Andrés Guerra Hoyos.',
    color: '#059669',
    leader: 'Andrés Felipe Guerra Hoyos',
    actors: [
      {
        id: 'cd-6-1',
        name: 'Andrés Felipe Guerra Hoyos',
        role: 'representante',
        roleLabel: 'Representante a la Cámara / Congresista',
        municipality: 'Antioquia',
        status: 'En funciones (Congreso de la República)',
        notes: 'Líder del movimiento "La Siembra", excandidato a la Gobernación'
      },
      {
        id: 'cd-6-2',
        name: 'Rosa Acevedo Jaramillo',
        role: 'excandidato',
        roleLabel: 'Excandidata a la Alcaldía de Itagüí',
        municipality: 'Itagüí',
        status: 'Líder política en Itagüí',
        notes: 'Excandidata a la Alcaldía de Itagüí por el Centro Democrático'
      },
      {
        id: 'cd-6-3',
        name: 'Claudia Victoria Carrasquilla Minami',
        role: 'concejal',
        roleLabel: 'Concejal Electa de Medellín',
        municipality: 'Medellín',
        status: 'Concejal electa (14.966 votos) - Renunció para ser viceministra de defensa',
        votes: 14966,
        cedula: '43.497.054',
        notes: 'Concejal de Medellín 2024. Recientemente renunció para asumir viceministerio.'
      },
      {
        id: 'cd-6-4',
        name: 'Camilo Salazar',
        role: 'excandidato',
        roleLabel: 'Excandidato al Concejo',
        municipality: 'Medellín',
        status: 'Excandidato al Concejo de Medellín 2023',
        notes: 'Integrante de La Siembra en Medellín'
      },
      {
        id: 'cd-6-5',
        name: 'Carlos Manuel Uribe Mesa',
        role: 'concejal',
        roleLabel: 'Concejal de Envigado',
        municipality: 'Envigado',
        status: 'En funciones (3.810 votos)',
        votes: 3810,
        notes: 'Concejal de Envigado'
      }
    ]
  },
  {
    id: 'ramos',
    number: 7,
    name: 'Ramos',
    description: 'Estructura política tradicional vinculada al liderazgo del exgobernador Luis Alfredo Ramos y el congresista Juan David Zuluaga.',
    color: '#d97706',
    leader: 'Juan David Zuluaga & Casa Ramos',
    actors: [
      {
        id: 'cd-7-1',
        name: 'Juan David Zuluaga',
        role: 'representante',
        roleLabel: 'Representante a la Cámara',
        municipality: 'Antioquia',
        status: 'En funciones (Congreso de la República)',
        notes: 'Representante a la Cámara por Antioquia, línea Ramos'
      }
    ]
  },
  {
    id: 'bello',
    number: 8,
    name: 'Bello',
    description: 'Casa política municipal de Bello liderada por la alcaldesa Lorena González y el exalcalde Óscar Andrés Pérez.',
    color: '#0d9488',
    leader: 'Lorena González & Óscar Andrés Pérez',
    actors: [
      {
        id: 'cd-8-1',
        name: 'Melissa Orrego Eusse',
        role: 'representante',
        roleLabel: 'Representante a la Cámara',
        municipality: 'Antioquia / Bello',
        status: 'Representante a la Cámara por Antioquia',
        notes: 'Congresista con base electoral en Bello'
      },
      {
        id: 'cd-8-2',
        name: 'Lorena González Ospina',
        role: 'alcalde',
        roleLabel: 'Alcaldesa de Bello',
        municipality: 'Bello',
        status: 'Alcaldesa Electa 2024-2027 (65.856 votos)',
        votes: 65856,
        notes: 'Mandataria municipal de Bello (Coalición Bello Nos Une / CD)'
      },
      {
        id: 'cd-8-3',
        name: 'Óscar Andrés Pérez Muñoz',
        role: 'exalcalde',
        roleLabel: 'Exalcalde de Bello',
        municipality: 'Bello',
        status: 'Exalcalde de Bello y líder político municipal',
        notes: 'Exalcalde de Bello (períodos 2008-2011 y 2020-2023)'
      },
      {
        id: 'cd-8-4',
        name: 'Gabriel Jaime Giraldo',
        role: 'diputado',
        roleLabel: 'Diputado de Antioquia',
        municipality: 'Antioquia / Bello',
        status: 'En funciones (Asamblea Departamental)',
        notes: 'Diputado del Centro Democrático'
      },
      {
        id: 'cd-8-5',
        name: 'Bedoya García Duván Alberto',
        role: 'concejal',
        roleLabel: 'Concejal de Bello',
        municipality: 'Bello',
        status: 'En funciones (4.590 votos)',
        votes: 4590,
        notes: 'Concejal de Bello - Bancada Centro Democrático'
      },
      {
        id: 'cd-8-6',
        name: 'Villa Maldonado Daniel Rodrigo',
        role: 'concejal',
        roleLabel: 'Concejal de Bello',
        municipality: 'Bello',
        status: 'En funciones (3.951 votos)',
        votes: 3951,
        notes: 'Concejal de Bello - Bancada Centro Democrático'
      },
      {
        id: 'cd-8-7',
        name: 'Arango Palacio Jorge Armando',
        role: 'concejal',
        roleLabel: 'Concejal de Bello',
        municipality: 'Bello',
        status: 'En funciones (2.604 votos)',
        votes: 2604,
        notes: 'Concejal de Bello - Bancada Centro Democrático'
      },
      {
        id: 'cd-8-8',
        name: 'Gálvez Sánchez Víctor Hugo',
        role: 'concejal',
        roleLabel: 'Concejal de Bello',
        municipality: 'Bello',
        status: 'En funciones (1.748 votos)',
        votes: 1748,
        notes: 'Concejal de Bello - Bancada Centro Democrático'
      },
      {
        id: 'cd-8-9',
        name: 'Martínez Villa Herika Janneth',
        role: 'concejal',
        roleLabel: 'Concejal de Bello',
        municipality: 'Bello',
        status: 'En funciones (1.626 votos)',
        votes: 1626,
        notes: 'Concejal de Bello - Bancada Centro Democrático'
      }
    ]
  },
  {
    id: 'del-bate',
    number: 9,
    name: 'Del Bate',
    description: 'Nodo caracterizado por el activismo político ciudadano y el concejal Andrés Rodríguez ("Gury").',
    color: '#e11d48',
    leader: 'David Toledo Ospina & Andrés Rodríguez',
    actors: [
      {
        id: 'cd-9-1',
        name: 'David Toledo Ospina',
        role: 'excandidato',
        roleLabel: 'Excandidato a la Cámara',
        municipality: 'Antioquia',
        status: 'Excandidato a la Cámara de Representantes',
        notes: 'Líder del equipo Del Bate'
      },
      {
        id: 'cd-9-2',
        name: 'Andrés Felipe Rodríguez Puerta',
        role: 'concejal',
        roleLabel: 'Concejal de Medellín',
        municipality: 'Medellín',
        status: 'En funciones (6.186 votos)',
        votes: 6186,
        cedula: '812.768.1',
        notes: 'Concejal de Medellín ("Gury Rodríguez")'
      }
    ]
  },
  {
    id: 'senadores-no-alineados',
    number: 10,
    name: 'Senadores No Alineados',
    description: 'Senadoras de la República del Centro Democrático con agenda parlamentaria independiente.',
    color: '#6366f1',
    leader: 'María Clara Posada & Julia Correa',
    actors: [
      {
        id: 'cd-10-1',
        name: 'María Clara Posada',
        role: 'senador',
        roleLabel: 'Senadora de la República',
        municipality: 'Nacional / Antioquia',
        status: 'Senadora de la República no alineada',
        notes: 'Congresista del Centro Democrático'
      },
      {
        id: 'cd-10-2',
        name: 'Julia Correa',
        role: 'senador',
        roleLabel: 'Senadora de la República',
        municipality: 'Nacional / Antioquia',
        status: 'Senadora de la República no alineada',
        notes: 'Congresista del Centro Democrático'
      }
    ]
  }
];

export const CREEMOS_HOUSES: PowerHouseNode[] = [
  {
    id: 'equipo-creemos-fico',
    number: 1,
    name: 'Equipo Creemos - Federico Gutiérrez',
    description: 'Estructura central liderada por el Alcalde de Medellín Federico Gutiérrez y sus principales cuadros de gobierno y concejo.',
    color: '#84cc16',
    leader: 'Federico Andrés Gutiérrez Zuluaga',
    actors: [
      {
        id: 'cr-1-1',
        name: 'Federico Andrés Gutiérrez Zuluaga',
        role: 'alcalde',
        roleLabel: 'Alcalde de Medellín',
        municipality: 'Medellín',
        status: 'Alcalde Electo 2024-2027 (697.910 votos - 73.63%)',
        votes: 697910,
        notes: 'Líder fundador de Creemos y Alcalde de Medellín'
      },
      {
        id: 'cr-1-2',
        name: 'Andrés Felipe Tobón Villada',
        role: 'concejal',
        roleLabel: 'Concejal de Medellín (Presidente)',
        municipality: 'Medellín',
        status: 'En funciones (43.795 votos)',
        votes: 43795,
        cedula: '1.152.189.793',
        notes: 'Mayor votación al Concejo de Medellín'
      },
      {
        id: 'cr-1-3',
        name: 'María Paulina Suárez Roldán',
        role: 'concejal',
        roleLabel: 'Concejal de Medellín',
        municipality: 'Medellín',
        status: 'En funciones (16.145 votos)',
        votes: 16145,
        cedula: '43.597.417'
      },
      {
        id: 'cr-1-4',
        name: 'Santiago Perdomo Montoya',
        role: 'concejal',
        roleLabel: 'Concejal de Medellín',
        municipality: 'Medellín',
        status: 'En funciones (15.240 votos)',
        votes: 15240,
        cedula: '1.152.435.767'
      },
      {
        id: 'cr-1-5',
        name: 'Alejandro De Bedout Arango',
        role: 'concejal',
        roleLabel: 'Concejal de Medellín',
        municipality: 'Medellín',
        status: 'En funciones (11.115 votos)',
        votes: 11115,
        cedula: '10.376.006.12'
      },
      {
        id: 'cr-1-6',
        name: 'Juan Carlos De La Cuesta Galvis',
        role: 'concejal',
        roleLabel: 'Concejal de Medellín',
        municipality: 'Medellín',
        status: 'En funciones (9.523 votos)',
        votes: 9523,
        cedula: '71.741.348'
      },
      {
        id: 'cr-1-7',
        name: 'Damián Pérez Arroyave',
        role: 'concejal',
        roleLabel: 'Concejal de Medellín',
        municipality: 'Medellín',
        status: 'En funciones (9.338 votos)',
        votes: 9338,
        cedula: '1.035.830.866'
      },
      {
        id: 'cr-1-8',
        name: 'Santiago Narváez Lombana',
        role: 'concejal',
        roleLabel: 'Concejal de Medellín',
        municipality: 'Medellín',
        status: 'En funciones (9.303 votos)',
        votes: 9303,
        cedula: '1.037.626.061'
      },
      {
        id: 'cr-1-9',
        name: 'Camila Gaviria Barreneche',
        role: 'concejal',
        roleLabel: 'Concejal de Medellín',
        municipality: 'Medellín',
        status: 'En funciones (4.546 votos)',
        votes: 4546,
        cedula: '43.222.003'
      },
      {
        id: 'cr-1-10',
        name: 'Alliday Tobón Henao',
        role: 'concejal',
        roleLabel: 'Concejal de Sabaneta',
        municipality: 'Sabaneta',
        status: 'En funciones (850 votos)',
        votes: 850
      },
      {
        id: 'cr-1-11',
        name: 'Iván Alonso Montoya Urrego',
        role: 'concejal',
        roleLabel: 'Concejal de Sabaneta (Oposición)',
        municipality: 'Sabaneta',
        status: 'En funciones (13.836 votos en Alcaldía)',
        votes: 13836,
        notes: 'Curul Ley 1909 Estatuto de Oposición'
      },
      {
        id: 'cr-1-12',
        name: 'Luz Marina López Peña',
        role: 'concejal',
        roleLabel: 'Concejal de Envigado',
        municipality: 'Envigado',
        status: 'En funciones (2.450 votos)',
        votes: 2450
      },
      {
        id: 'cr-1-13',
        name: 'Luis Aníbal Vergara Ochoa',
        role: 'concejal',
        roleLabel: 'Concejal de Caldas',
        municipality: 'Caldas',
        status: 'En funciones (720 votos)',
        votes: 720,
        cedula: '71.394.549'
      },
      {
        id: 'cr-1-14',
        name: 'Fabio de Jesús Guzmán Echeverri',
        role: 'concejal',
        roleLabel: 'Concejal de Caldas',
        municipality: 'Caldas',
        status: 'En funciones (636 votos)',
        votes: 636,
        cedula: '71.391.232'
      },
      {
        id: 'cr-1-15',
        name: 'Raúl Alejandro Mesa Correa',
        role: 'concejal',
        roleLabel: 'Concejal de Caldas (Oposición)',
        municipality: 'Caldas',
        status: 'En funciones (10.982 votos en Alcaldía)',
        votes: 10982,
        cedula: '71.399.771',
        notes: 'Curul Ley 1909 Estatuto de Oposición'
      }
    ]
  }
];

export const CONSERVADOR_HOUSES: PowerHouseNode[] = [
  {
    id: 'equipo-trujillo',
    number: 1,
    name: 'Equipo de Antioquia (Trujillismo)',
    description: 'Poderosa estructura del Partido Conservador liderada por el Senador Carlos Andrés Trujillo y la Alcaldía de Itagüí.',
    color: '#1e3a8a',
    leader: 'Carlos Andrés Trujillo González',
    actors: [
      {
        id: 'con-1-1',
        name: 'Carlos Andrés Trujillo González',
        role: 'senador',
        roleLabel: 'Senador de la República',
        municipality: 'Nacional / Itagüí',
        status: 'Senador de la República (Jefe Político)',
        notes: 'Exalcalde de Itagüí y principal elector conservador del departamento'
      },
      {
        id: 'con-1-2',
        name: 'Diego Alejandro Torres Sánchez',
        role: 'alcalde',
        roleLabel: 'Alcalde de Itagüí',
        municipality: 'Itagüí',
        status: 'Alcalde Electo 2024-2027 (59.074 votos)',
        votes: 59074,
        notes: 'Alcalde de Itagüí por el Equipo de Antioquia'
      },
      {
        id: 'con-1-3',
        name: 'Daniel Restrepo Carmona',
        role: 'representante',
        roleLabel: 'Representante a la Cámara',
        municipality: 'Antioquia',
        status: 'Representante a la Cámara',
        notes: 'Congresista del Equipo de Antioquia'
      },
      {
        id: 'con-1-4',
        name: 'Jaime Cano Martínez',
        role: 'diputado',
        roleLabel: 'Diputado de Antioquia',
        municipality: 'Antioquia',
        status: 'Diputado de la Asamblea de Antioquia',
        notes: 'Asamblea Departamental'
      },
      {
        id: 'con-1-5',
        name: 'Bancada de Concejales de Itagüí',
        role: 'concejal',
        roleLabel: 'Concejales de Itagüí',
        municipality: 'Itagüí',
        status: '6 Curules en el Concejo de Itagüí',
        notes: 'Andrés Camilo Maya, Bayron de Jesús Chavarriaga, Juan Fernando Zapata, etc.'
      },
      {
        id: 'con-1-6',
        name: 'Brisvani Alexis Arenas Suaza',
        role: 'concejal',
        roleLabel: 'Concejal de Medellín',
        municipality: 'Medellín',
        status: 'En funciones (15.556 votos)',
        votes: 15556,
        cedula: '1.037.601.785'
      }
    ]
  },
  {
    id: 'conservatismo-tradicional',
    number: 2,
    name: 'Conservatismo Regional / No Alineados',
    description: 'Concejales y dirigentes conservadores de Bello, Caldas, Barbosa y Sabaneta.',
    color: '#2563eb',
    leader: 'Dirigencia Municipal',
    actors: [
      {
        id: 'con-2-1',
        name: 'Zapata Ortiz Alexander',
        role: 'concejal',
        roleLabel: 'Concejal de Bello',
        municipality: 'Bello',
        status: 'En funciones (4.269 votos)',
        votes: 4269
      },
      {
        id: 'con-2-2',
        name: 'Berrío Arboleda Jhon Fredy',
        role: 'concejal',
        roleLabel: 'Concejal de Bello',
        municipality: 'Bello',
        status: 'En funciones (2.730 votos)',
        votes: 2730
      },
      {
        id: 'con-2-3',
        name: 'Juan Martín Rodríguez',
        role: 'concejal',
        roleLabel: 'Concejal de Sabaneta',
        municipality: 'Sabaneta',
        status: 'En funciones (1.920 votos)',
        votes: 1920
      },
      {
        id: 'con-2-4',
        name: 'Carlos Mario Álvarez Castaño',
        role: 'concejal',
        roleLabel: 'Concejal de Caldas',
        municipality: 'Caldas',
        status: 'En funciones (1.105 votos)',
        votes: 1105,
        cedula: '71.745.399'
      }
    ]
  }
];

export const LIBERAL_HOUSES: PowerHouseNode[] = [
  {
    id: 'equipo-envigado',
    number: 1,
    name: 'Equipo Envigado (Héctor Londoño - Braulio Espinosa)',
    description: 'Hegemonía política liberal en Envigado con la Alcaldía y mayoría absoluta en el Concejo.',
    color: '#dc2626',
    leader: 'Héctor Londoño & Braulio Espinosa',
    actors: [
      {
        id: 'lib-1-1',
        name: 'Héctor Londoño Restrepo',
        role: 'lider_historico',
        roleLabel: 'Líder Histórico',
        municipality: 'Envigado',
        status: 'Jefe histórico del liberalismo envigadeño (4 veces Alcalde)',
        notes: 'Patriarca del Partido Liberal en el sur del Valle de Aburrá'
      },
      {
        id: 'lib-1-2',
        name: 'Braulio Alonso Espinosa Márquez',
        role: 'exalcalde',
        roleLabel: 'Exalcalde de Envigado',
        municipality: 'Envigado',
        status: 'Exalcalde de Envigado 2020-2023',
        notes: 'Líder ejecutivo del movimiento'
      },
      {
        id: 'lib-1-3',
        name: 'Raúl Eduardo Cardona González',
        role: 'alcalde',
        roleLabel: 'Alcalde de Envigado',
        municipality: 'Envigado',
        status: 'Alcalde Electo 2024-2027 (46.068 votos)',
        votes: 46068,
        notes: 'Alcalde en funciones de Envigado'
      },
      {
        id: 'lib-1-4',
        name: 'Pablo Andrés Restrepo Garcés',
        role: 'concejal',
        roleLabel: 'Concejal de Envigado',
        municipality: 'Envigado',
        status: 'En funciones (5.310 votos)',
        votes: 5310
      },
      {
        id: 'lib-1-5',
        name: 'David Alfonso Londoño Arroyave',
        role: 'concejal',
        roleLabel: 'Concejal de Envigado',
        municipality: 'Envigado',
        status: 'En funciones (4.890 votos)',
        votes: 4890
      },
      {
        id: 'lib-1-6',
        name: 'Camilo Andrés Gómez Mosquera',
        role: 'concejal',
        roleLabel: 'Concejal de Envigado',
        municipality: 'Envigado',
        status: 'En funciones (4.520 votos)',
        votes: 4520
      },
      {
        id: 'lib-1-7',
        name: 'María Teresa Álvarez Muñoz',
        role: 'concejal',
        roleLabel: 'Concejal de Envigado',
        municipality: 'Envigado',
        status: 'En funciones (4.110 votos)',
        votes: 4110
      },
      {
        id: 'lib-1-8',
        name: 'Juan Pablo Montoya Castañeda',
        role: 'concejal',
        roleLabel: 'Concejal de Envigado',
        municipality: 'Envigado',
        status: 'En funciones (3.870 votos)',
        votes: 3870
      },
      {
        id: 'lib-1-9',
        name: 'Bernardo de Jesús Moras Carvajal',
        role: 'concejal',
        roleLabel: 'Concejal de Envigado',
        municipality: 'Envigado',
        status: 'En funciones (3.450 votos)',
        votes: 3450
      }
    ]
  },
  {
    id: 'liberales-antioquia-roldan-lopera',
    number: 2,
    name: 'Sector María Eugenia Lopera & John Jairo Roldán',
    description: 'Estructura congresional liberal con presencia en el norte del Valle de Aburrá y Medellín.',
    color: '#b91c1c',
    leader: 'María Eugenia Lopera & John Jairo Roldán',
    actors: [
      {
        id: 'lib-2-1',
        name: 'John Jairo Roldán Avendaño',
        role: 'senador',
        roleLabel: 'Senador de la República',
        municipality: 'Nacional / Bello',
        status: 'Senador de la República',
        notes: 'Exalcalde de Yarumal y congresista'
      },
      {
        id: 'lib-2-2',
        name: 'María Eugenia Lopera Monsalve',
        role: 'representante',
        roleLabel: 'Representante a la Cámara',
        municipality: 'Antioquia',
        status: 'Representante a la Cámara por Antioquia',
        notes: 'Congresista'
      },
      {
        id: 'lib-2-3',
        name: 'Farley Jhoan Macías Betancur',
        role: 'concejal',
        roleLabel: 'Concejal de Medellín',
        municipality: 'Medellín',
        status: 'En funciones (10.984 votos)',
        votes: 10984,
        cedula: '1.037.575.876'
      },
      {
        id: 'lib-2-4',
        name: 'Cardona Levis Alberto',
        role: 'concejal',
        roleLabel: 'Concejal de Bello',
        municipality: 'Bello',
        status: 'En funciones (3.677 votos)',
        votes: 3677
      },
      {
        id: 'lib-2-5',
        name: 'Echeverri Peña Rafael Leonardo',
        role: 'concejal',
        roleLabel: 'Concejal de Bello',
        municipality: 'Bello',
        status: 'En funciones (3.441 votos)',
        votes: 3441
      }
    ]
  }
];

export function getPowerHousesForParty(partyId: string): PowerHouseNode[] {
  switch (partyId) {
    case 'centro-democratico':
      return CENTRO_DEMOCRATICO_HOUSES;
    case 'creemos':
      return CREEMOS_HOUSES;
    case 'partido-conservador':
      return CONSERVADOR_HOUSES;
    case 'partido-liberal':
      return LIBERAL_HOUSES;
    default:
      return [];
  }
}

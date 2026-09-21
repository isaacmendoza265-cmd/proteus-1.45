export interface PresidentialCandidateVote {
  name: string;
  votes: number;
}

export interface MunicipalPresidentialResult {
  code: string;
  municipality: string;
  department: string;
  candidates: PresidentialCandidateVote[];
  nulos: number;
  noMarcados: number;
  validos: number;
  votantes: number;
}

export const PRESIDENTIAL_ELECTION_2026: Record<string, MunicipalPresidentialResult> = {
  "EL ENCANTO": {
    "code": "60010",
    "municipality": "EL ENCANTO",
    "department": "Amazonas",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 216
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 37
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 8
      },
      {
        "name": "Claudia López",
        "votes": 3
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 2
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 1
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 1
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 1
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 0
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 0
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      },
      {
        "name": "Voto en Blanco",
        "votes": 0
      }
    ],
    "nulos": 0,
    "noMarcados": 1,
    "validos": 270,
    "votantes": 271
  },
  "LA CHORRERA": {
    "code": "60013",
    "municipality": "LA CHORRERA",
    "department": "Amazonas",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 544
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 25
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 12
      },
      {
        "name": "Voto en Blanco",
        "votes": 2
      },
      {
        "name": "Claudia López",
        "votes": 1
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 0
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 0
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 0
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 0
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 0
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 0
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 2,
    "noMarcados": 0,
    "validos": 585,
    "votantes": 587
  },
  "LA PEDRERA": {
    "code": "60016",
    "municipality": "LA PEDRERA",
    "department": "Amazonas",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 327
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 49
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 7
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 3
      },
      {
        "name": "Claudia López",
        "votes": 3
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 3
      },
      {
        "name": "Voto en Blanco",
        "votes": 3
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 2
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 1
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 1
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 0
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 3,
    "noMarcados": 2,
    "validos": 400,
    "votantes": 405
  },
  "LA VICTORIA": {
    "code": "60017",
    "municipality": "LA VICTORIA",
    "department": "Amazonas",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 28
      },
      {
        "name": "Voto en Blanco",
        "votes": 1
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 0
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 0
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 0
      },
      {
        "name": "Claudia López",
        "votes": 0
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 0
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 0
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 0
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 0
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 0
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 0
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 0,
    "noMarcados": 0,
    "validos": 29,
    "votantes": 29
  },
  "LETICIA": {
    "code": "60001",
    "municipality": "LETICIA",
    "department": "Amazonas",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 10415
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 7328
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1414
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 476
      },
      {
        "name": "Voto en Blanco",
        "votes": 401
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 303
      },
      {
        "name": "Claudia López",
        "votes": 187
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 54
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 39
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 25
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 25
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 21
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 20
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 7
      }
    ],
    "nulos": 203,
    "noMarcados": 73,
    "validos": 20715,
    "votantes": 20991
  },
  "MIRITI PARANA": {
    "code": "60019",
    "municipality": "MIRITI PARANA",
    "department": "Amazonas",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 89
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 4
      },
      {
        "name": "Voto en Blanco",
        "votes": 2
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 0
      },
      {
        "name": "Claudia López",
        "votes": 0
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 0
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 0
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 0
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 0
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 0
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 0
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 0,
    "noMarcados": 0,
    "validos": 96,
    "votantes": 96
  },
  "PUERTO ALEGRIA": {
    "code": "60030",
    "municipality": "PUERTO ALEGRIA",
    "department": "Amazonas",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 94
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 14
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 3
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 1
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 0
      },
      {
        "name": "Claudia López",
        "votes": 0
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 0
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 0
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 0
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 0
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 0
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      },
      {
        "name": "Voto en Blanco",
        "votes": 0
      }
    ],
    "nulos": 0,
    "noMarcados": 0,
    "validos": 112,
    "votantes": 112
  },
  "PUERTO ARICA": {
    "code": "60040",
    "municipality": "PUERTO ARICA",
    "department": "Amazonas",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 163
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 15
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 9
      },
      {
        "name": "Claudia López",
        "votes": 1
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 1
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 1
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 0
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 0
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 0
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 0
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 0
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 0
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 0
      },
      {
        "name": "Voto en Blanco",
        "votes": 0
      }
    ],
    "nulos": 0,
    "noMarcados": 0,
    "validos": 190,
    "votantes": 190
  },
  "PUERTO NARIÑO": {
    "code": "60007",
    "municipality": "PUERTO NARIÑO",
    "department": "Amazonas",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 1629
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 327
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 112
      },
      {
        "name": "Voto en Blanco",
        "votes": 43
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 24
      },
      {
        "name": "Claudia López",
        "votes": 19
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 9
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 9
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 8
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 7
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 5
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 4
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 4
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 15,
    "noMarcados": 24,
    "validos": 2204,
    "votantes": 2243
  },
  "PUERTO SANTANDER": {
    "code": "60021",
    "municipality": "PUERTO SANTANDER",
    "department": "Amazonas",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 93
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 19
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 14
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 2
      },
      {
        "name": "Claudia López",
        "votes": 2
      },
      {
        "name": "Voto en Blanco",
        "votes": 2
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 0
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 0
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 0
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 0
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 0
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 0
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 1,
    "noMarcados": 0,
    "validos": 132,
    "votantes": 133
  },
  "TARAPACA": {
    "code": "60022",
    "municipality": "TARAPACA",
    "department": "Amazonas",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 356
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 69
      },
      {
        "name": "Voto en Blanco",
        "votes": 25
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 16
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 12
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 4
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 3
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 3
      },
      {
        "name": "Claudia López",
        "votes": 2
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 2
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 1
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 1
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 5,
    "noMarcados": 1,
    "validos": 494,
    "votantes": 500
  },
  "ABEJORRAL": {
    "code": "01004",
    "municipality": "ABEJORRAL",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 4191
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1635
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 924
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 343
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 132
      },
      {
        "name": "Voto en Blanco",
        "votes": 113
      },
      {
        "name": "Claudia López",
        "votes": 45
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 29
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 22
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 15
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 11
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 6
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 3
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 3
      }
    ],
    "nulos": 65,
    "noMarcados": 53,
    "validos": 7472,
    "votantes": 7590
  },
  "ABRIAQUI": {
    "code": "01007",
    "municipality": "ABRIAQUI",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 592
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 319
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 102
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 26
      },
      {
        "name": "Voto en Blanco",
        "votes": 16
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 8
      },
      {
        "name": "Claudia López",
        "votes": 4
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 3
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 3
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 2
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 1
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 1
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 18,
    "noMarcados": 2,
    "validos": 1077,
    "votantes": 1097
  },
  "ALEJANDRIA": {
    "code": "01010",
    "municipality": "ALEJANDRIA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1811
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 389
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 312
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 114
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 48
      },
      {
        "name": "Voto en Blanco",
        "votes": 30
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 8
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 3
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 3
      },
      {
        "name": "Claudia López",
        "votes": 2
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 2
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 1
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 1
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 14,
    "noMarcados": 22,
    "validos": 2724,
    "votantes": 2760
  },
  "AMAGA": {
    "code": "01013",
    "municipality": "AMAGA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 6531
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 3882
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1067
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 659
      },
      {
        "name": "Voto en Blanco",
        "votes": 331
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 325
      },
      {
        "name": "Claudia López",
        "votes": 52
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 40
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 21
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 18
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 14
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 14
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 10
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      }
    ],
    "nulos": 211,
    "noMarcados": 52,
    "validos": 12966,
    "votantes": 13229
  },
  "AMALFI": {
    "code": "01016",
    "municipality": "AMALFI",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 4087
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 1140
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 572
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 327
      },
      {
        "name": "Voto en Blanco",
        "votes": 232
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 153
      },
      {
        "name": "Claudia López",
        "votes": 41
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 27
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 27
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 19
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 14
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 11
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 4
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 66,
    "noMarcados": 37,
    "validos": 6657,
    "votantes": 6760
  },
  "ANDES": {
    "code": "01019",
    "municipality": "ANDES",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 10148
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 3583
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 2566
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 584
      },
      {
        "name": "Voto en Blanco",
        "votes": 246
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 243
      },
      {
        "name": "Claudia López",
        "votes": 52
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 45
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 19
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 17
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 13
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 13
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 13
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 9
      }
    ],
    "nulos": 117,
    "noMarcados": 51,
    "validos": 17551,
    "votantes": 17719
  },
  "ANGELOPOLIS": {
    "code": "01022",
    "municipality": "ANGELOPOLIS",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1619
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 544
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 410
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 131
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 85
      },
      {
        "name": "Voto en Blanco",
        "votes": 65
      },
      {
        "name": "Claudia López",
        "votes": 19
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 7
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 6
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 5
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 4
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 3
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 1
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 39,
    "noMarcados": 17,
    "validos": 2899,
    "votantes": 2955
  },
  "ANGOSTURA": {
    "code": "01025",
    "municipality": "ANGOSTURA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1816
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 600
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 559
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 178
      },
      {
        "name": "Voto en Blanco",
        "votes": 128
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 76
      },
      {
        "name": "Claudia López",
        "votes": 33
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 31
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 21
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 20
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 11
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 3
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 0
      }
    ],
    "nulos": 116,
    "noMarcados": 73,
    "validos": 3478,
    "votantes": 3667
  },
  "ANORI": {
    "code": "01028",
    "municipality": "ANORI",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1811
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 1275
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 215
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 152
      },
      {
        "name": "Voto en Blanco",
        "votes": 143
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 99
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 14
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 14
      },
      {
        "name": "Claudia López",
        "votes": 10
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 10
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 8
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 5
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 0
      }
    ],
    "nulos": 26,
    "noMarcados": 29,
    "validos": 3758,
    "votantes": 3813
  },
  "ANTIOQUIA": {
    "code": "01031",
    "municipality": "ANTIOQUIA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 5907
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 3261
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1673
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 574
      },
      {
        "name": "Voto en Blanco",
        "votes": 318
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 174
      },
      {
        "name": "Claudia López",
        "votes": 57
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 38
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 19
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 14
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 9
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 9
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 5
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      }
    ],
    "nulos": 160,
    "noMarcados": 70,
    "validos": 12060,
    "votantes": 12290
  },
  "ANZA": {
    "code": "01034",
    "municipality": "ANZA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1811
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 463
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 400
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 65
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 60
      },
      {
        "name": "Voto en Blanco",
        "votes": 47
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 12
      },
      {
        "name": "Claudia López",
        "votes": 11
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 10
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 9
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 7
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 5
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 1
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 23,
    "noMarcados": 29,
    "validos": 2901,
    "votantes": 2953
  },
  "APARTADO": {
    "code": "01035",
    "municipality": "APARTADO",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 32102
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 16661
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2067
      },
      {
        "name": "Voto en Blanco",
        "votes": 1389
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1385
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 340
      },
      {
        "name": "Claudia López",
        "votes": 164
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 101
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 43
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 38
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 32
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 26
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 25
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 7
      }
    ],
    "nulos": 403,
    "noMarcados": 133,
    "validos": 54380,
    "votantes": 54916
  },
  "ARBOLETES": {
    "code": "01037",
    "municipality": "ARBOLETES",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 4837
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 4120
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 414
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 157
      },
      {
        "name": "Voto en Blanco",
        "votes": 93
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 59
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 27
      },
      {
        "name": "Claudia López",
        "votes": 18
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 13
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 11
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 9
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 6
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 6
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 3
      }
    ],
    "nulos": 42,
    "noMarcados": 37,
    "validos": 9773,
    "votantes": 9852
  },
  "ARGELIA": {
    "code": "01039",
    "municipality": "ARGELIA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1946
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 670
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 334
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 56
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 52
      },
      {
        "name": "Voto en Blanco",
        "votes": 41
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 15
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 11
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 10
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 9
      },
      {
        "name": "Claudia López",
        "votes": 8
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 8
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 2
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      }
    ],
    "nulos": 18,
    "noMarcados": 20,
    "validos": 3164,
    "votantes": 3202
  },
  "ARMENIA": {
    "code": "26001",
    "municipality": "ARMENIA",
    "department": "Quindío",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 84364
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 53484
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 14209
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 10696
      },
      {
        "name": "Voto en Blanco",
        "votes": 3008
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1678
      },
      {
        "name": "Claudia López",
        "votes": 1382
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 261
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 173
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 115
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 96
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 87
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 57
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 27
      }
    ],
    "nulos": 2089,
    "noMarcados": 244,
    "validos": 169637,
    "votantes": 171970
  },
  "BARBOSA": {
    "code": "01043",
    "municipality": "BARBOSA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 11617
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 6929
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2731
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1365
      },
      {
        "name": "Voto en Blanco",
        "votes": 684
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 332
      },
      {
        "name": "Claudia López",
        "votes": 141
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 51
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 36
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 36
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 28
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 15
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 10
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 8
      }
    ],
    "nulos": 467,
    "noMarcados": 105,
    "validos": 23983,
    "votantes": 24555
  },
  "BELLO": {
    "code": "01049",
    "municipality": "BELLO",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 116690
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 63055
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 18571
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 18325
      },
      {
        "name": "Voto en Blanco",
        "votes": 4627
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 2176
      },
      {
        "name": "Claudia López",
        "votes": 1154
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 293
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 270
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 145
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 119
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 93
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 77
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 31
      }
    ],
    "nulos": 2323,
    "noMarcados": 345,
    "validos": 225626,
    "votantes": 228294
  },
  "BELMIRA": {
    "code": "01046",
    "municipality": "BELMIRA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1611
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 448
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 351
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 159
      },
      {
        "name": "Voto en Blanco",
        "votes": 69
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 34
      },
      {
        "name": "Claudia López",
        "votes": 25
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 16
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 6
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 4
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 3
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 2
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 1
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 26,
    "noMarcados": 16,
    "validos": 2729,
    "votantes": 2771
  },
  "BETANIA": {
    "code": "01052",
    "municipality": "BETANIA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 2365
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 494
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 477
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 117
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 70
      },
      {
        "name": "Voto en Blanco",
        "votes": 53
      },
      {
        "name": "Claudia López",
        "votes": 10
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 10
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 7
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 5
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 3
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 3
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 1
      }
    ],
    "nulos": 26,
    "noMarcados": 18,
    "validos": 3617,
    "votantes": 3661
  },
  "BETULIA": {
    "code": "01055",
    "municipality": "BETULIA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 3581
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 960
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 605
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 147
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 132
      },
      {
        "name": "Voto en Blanco",
        "votes": 90
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 17
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 16
      },
      {
        "name": "Claudia López",
        "votes": 12
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 12
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 10
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 4
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 3
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      }
    ],
    "nulos": 60,
    "noMarcados": 52,
    "validos": 5591,
    "votantes": 5703
  },
  "BOLIVAR": {
    "code": "01058",
    "municipality": "BOLIVAR",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 7523
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1791
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 1642
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 333
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 179
      },
      {
        "name": "Voto en Blanco",
        "votes": 179
      },
      {
        "name": "Claudia López",
        "votes": 31
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 18
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 16
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 13
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 8
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 7
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 7
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      }
    ],
    "nulos": 111,
    "noMarcados": 48,
    "validos": 11749,
    "votantes": 11908
  },
  "BRICEÑO": {
    "code": "01062",
    "municipality": "BRICEÑO",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1022
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 437
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 131
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 62
      },
      {
        "name": "Voto en Blanco",
        "votes": 58
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 52
      },
      {
        "name": "Claudia López",
        "votes": 16
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 11
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 10
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 6
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 4
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 2
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 1
      }
    ],
    "nulos": 50,
    "noMarcados": 22,
    "validos": 1816,
    "votantes": 1888
  },
  "BURITICA": {
    "code": "01061",
    "municipality": "BURITICA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1749
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 1075
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 360
      },
      {
        "name": "Voto en Blanco",
        "votes": 107
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 97
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 53
      },
      {
        "name": "Claudia López",
        "votes": 13
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 7
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 3
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 2
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 2
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 1
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 1
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 35,
    "noMarcados": 22,
    "validos": 3470,
    "votantes": 3527
  },
  "CACERES": {
    "code": "01064",
    "municipality": "CACERES",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 3635
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 2099
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 197
      },
      {
        "name": "Voto en Blanco",
        "votes": 152
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 95
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 68
      },
      {
        "name": "Claudia López",
        "votes": 42
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 21
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 15
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 14
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 12
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 8
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 7
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 89,
    "noMarcados": 37,
    "validos": 6365,
    "votantes": 6491
  },
  "CAICEDO": {
    "code": "01067",
    "municipality": "CAICEDO",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1363
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 832
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 493
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 133
      },
      {
        "name": "Voto en Blanco",
        "votes": 71
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 59
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 21
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 15
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 6
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 5
      },
      {
        "name": "Claudia López",
        "votes": 4
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 4
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 2
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 58,
    "noMarcados": 30,
    "validos": 3008,
    "votantes": 3096
  },
  "CALDAS": {
    "code": "01070",
    "municipality": "CALDAS",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 22385
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 13435
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 4339
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 4322
      },
      {
        "name": "Voto en Blanco",
        "votes": 1124
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 512
      },
      {
        "name": "Claudia López",
        "votes": 228
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 71
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 55
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 34
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 34
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 29
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 19
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 8
      }
    ],
    "nulos": 812,
    "noMarcados": 121,
    "validos": 46595,
    "votantes": 47528
  },
  "CAMPAMENTO": {
    "code": "01073",
    "municipality": "CAMPAMENTO",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1131
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 426
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 220
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 91
      },
      {
        "name": "Voto en Blanco",
        "votes": 64
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 45
      },
      {
        "name": "Claudia López",
        "votes": 20
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 9
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 8
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 7
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 4
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 2
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 1
      }
    ],
    "nulos": 29,
    "noMarcados": 14,
    "validos": 2031,
    "votantes": 2074
  },
  "CAÑASGORDAS": {
    "code": "01076",
    "municipality": "CAÑASGORDAS",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 4258
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1777
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 1044
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 168
      },
      {
        "name": "Voto en Blanco",
        "votes": 110
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 86
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 13
      },
      {
        "name": "Claudia López",
        "votes": 12
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 8
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 6
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 5
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 4
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 3
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 50,
    "noMarcados": 39,
    "validos": 7497,
    "votantes": 7586
  },
  "CARACOLI": {
    "code": "01078",
    "municipality": "CARACOLI",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1129
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 445
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 248
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 43
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 41
      },
      {
        "name": "Voto en Blanco",
        "votes": 29
      },
      {
        "name": "Claudia López",
        "votes": 13
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 6
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 4
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 3
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 2
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 1
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 1
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 15,
    "noMarcados": 11,
    "validos": 1965,
    "votantes": 1991
  },
  "CARAMANTA": {
    "code": "01079",
    "municipality": "CARAMANTA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1168
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 659
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 387
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 92
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 33
      },
      {
        "name": "Voto en Blanco",
        "votes": 28
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 5
      },
      {
        "name": "Claudia López",
        "votes": 4
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 4
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 2
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 2
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 1
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 26,
    "noMarcados": 9,
    "validos": 2385,
    "votantes": 2420
  },
  "CAREPA": {
    "code": "01080",
    "municipality": "CAREPA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 12538
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 7089
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1009
      },
      {
        "name": "Voto en Blanco",
        "votes": 582
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 502
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 199
      },
      {
        "name": "Claudia López",
        "votes": 67
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 47
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 23
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 18
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 13
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 9
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 7
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 196,
    "noMarcados": 87,
    "validos": 22103,
    "votantes": 22386
  },
  "CARMEN DE VIBORAL": {
    "code": "01082",
    "municipality": "CARMEN DE VIBORAL",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 19259
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 7719
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 3180
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 2804
      },
      {
        "name": "Voto en Blanco",
        "votes": 574
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 364
      },
      {
        "name": "Claudia López",
        "votes": 167
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 62
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 51
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 39
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 23
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 12
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 11
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 378,
    "noMarcados": 78,
    "validos": 34268,
    "votantes": 34724
  },
  "CAROLINA": {
    "code": "01085",
    "municipality": "CAROLINA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1350
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 483
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 322
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 120
      },
      {
        "name": "Voto en Blanco",
        "votes": 43
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 12
      },
      {
        "name": "Claudia López",
        "votes": 10
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 7
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 5
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 5
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 4
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 2
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 2
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 25,
    "noMarcados": 12,
    "validos": 2365,
    "votantes": 2402
  },
  "CAUCASIA": {
    "code": "01088",
    "municipality": "CAUCASIA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 18877
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 14390
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1065
      },
      {
        "name": "Voto en Blanco",
        "votes": 972
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 771
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 395
      },
      {
        "name": "Claudia López",
        "votes": 276
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 76
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 55
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 47
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 39
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 29
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 13
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 10
      }
    ],
    "nulos": 477,
    "noMarcados": 140,
    "validos": 37015,
    "votantes": 37632
  },
  "CHIGORODO": {
    "code": "01106",
    "municipality": "CHIGORODO",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 13171
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 8393
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 965
      },
      {
        "name": "Voto en Blanco",
        "votes": 637
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 614
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 296
      },
      {
        "name": "Claudia López",
        "votes": 93
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 57
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 32
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 25
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 24
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 20
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 11
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 6
      }
    ],
    "nulos": 244,
    "noMarcados": 101,
    "validos": 24344,
    "votantes": 24689
  },
  "CISNEROS": {
    "code": "01091",
    "municipality": "CISNEROS",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 3523
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 1639
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 758
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 306
      },
      {
        "name": "Voto en Blanco",
        "votes": 157
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 140
      },
      {
        "name": "Claudia López",
        "votes": 24
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 8
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 7
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 5
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 5
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 4
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 0
      }
    ],
    "nulos": 86,
    "noMarcados": 28,
    "validos": 6579,
    "votantes": 6693
  },
  "COCORNA": {
    "code": "01094",
    "municipality": "COCORNA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 5912
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1115
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 1017
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 251
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 127
      },
      {
        "name": "Voto en Blanco",
        "votes": 105
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 30
      },
      {
        "name": "Claudia López",
        "votes": 28
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 28
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 24
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 12
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 8
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 6
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 6
      }
    ],
    "nulos": 68,
    "noMarcados": 74,
    "validos": 8669,
    "votantes": 8811
  },
  "CONCEPCION": {
    "code": "01097",
    "municipality": "CONCEPCION",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1902
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 342
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 278
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 101
      },
      {
        "name": "Voto en Blanco",
        "votes": 42
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 17
      },
      {
        "name": "Claudia López",
        "votes": 16
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 5
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 5
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 4
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 4
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 3
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 1
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 0
      }
    ],
    "nulos": 24,
    "noMarcados": 17,
    "validos": 2720,
    "votantes": 2761
  },
  "CONCORDIA": {
    "code": "01100",
    "municipality": "CONCORDIA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 4234
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1054
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 901
      },
      {
        "name": "Voto en Blanco",
        "votes": 163
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 154
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 133
      },
      {
        "name": "Claudia López",
        "votes": 30
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 29
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 26
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 14
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 14
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 5
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 4
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 66,
    "noMarcados": 42,
    "validos": 6764,
    "votantes": 6872
  },
  "COPACABANA": {
    "code": "01103",
    "municipality": "COPACABANA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 23129
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 13240
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 3929
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 3660
      },
      {
        "name": "Voto en Blanco",
        "votes": 958
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 430
      },
      {
        "name": "Claudia López",
        "votes": 202
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 61
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 46
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 37
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 20
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 13
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 13
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 9
      }
    ],
    "nulos": 557,
    "noMarcados": 69,
    "validos": 45747,
    "votantes": 46373
  },
  "DABEIBA": {
    "code": "01109",
    "municipality": "DABEIBA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 3711
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 2923
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 511
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 187
      },
      {
        "name": "Voto en Blanco",
        "votes": 144
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 135
      },
      {
        "name": "Claudia López",
        "votes": 25
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 17
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 14
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 14
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 9
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 5
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 4
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 88,
    "noMarcados": 52,
    "validos": 7702,
    "votantes": 7842
  },
  "DON MATIAS": {
    "code": "01112",
    "municipality": "DON MATIAS",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 6501
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 1263
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 999
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 496
      },
      {
        "name": "Voto en Blanco",
        "votes": 230
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 127
      },
      {
        "name": "Claudia López",
        "votes": 41
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 24
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 19
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 13
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 8
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 7
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 5
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 115,
    "noMarcados": 42,
    "validos": 9737,
    "votantes": 9894
  },
  "EBEJICO": {
    "code": "01115",
    "municipality": "EBEJICO",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 3233
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 946
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 932
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 155
      },
      {
        "name": "Voto en Blanco",
        "votes": 92
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 88
      },
      {
        "name": "Claudia López",
        "votes": 24
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 21
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 15
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 11
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 10
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 8
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 4
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 64,
    "noMarcados": 34,
    "validos": 5542,
    "votantes": 5640
  },
  "EL BAGRE": {
    "code": "01117",
    "municipality": "EL BAGRE",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 6230
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 5608
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 507
      },
      {
        "name": "Voto en Blanco",
        "votes": 414
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 292
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 248
      },
      {
        "name": "Claudia López",
        "votes": 49
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 41
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 39
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 21
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 20
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 12
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 9
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 6
      }
    ],
    "nulos": 293,
    "noMarcados": 130,
    "validos": 13496,
    "votantes": 13919
  },
  "ENTRERRIOS": {
    "code": "01118",
    "municipality": "ENTRERRIOS",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 3765
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 775
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 542
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 436
      },
      {
        "name": "Voto en Blanco",
        "votes": 144
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 59
      },
      {
        "name": "Claudia López",
        "votes": 21
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 8
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 8
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 7
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 4
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 1
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 1
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 57,
    "noMarcados": 14,
    "validos": 5771,
    "votantes": 5842
  },
  "ENVIGADO": {
    "code": "01121",
    "municipality": "ENVIGADO",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 106750
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 23934
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 14875
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 14177
      },
      {
        "name": "Voto en Blanco",
        "votes": 1857
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 617
      },
      {
        "name": "Claudia López",
        "votes": 552
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 116
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 111
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 67
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 56
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 48
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 35
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 28
      }
    ],
    "nulos": 903,
    "noMarcados": 169,
    "validos": 163223,
    "votantes": 164295
  },
  "FREDONIA": {
    "code": "01124",
    "municipality": "FREDONIA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 4536
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 2065
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1355
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 300
      },
      {
        "name": "Voto en Blanco",
        "votes": 170
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 144
      },
      {
        "name": "Claudia López",
        "votes": 37
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 22
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 20
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 19
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 10
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 8
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 6
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 2
      }
    ],
    "nulos": 117,
    "noMarcados": 53,
    "validos": 8694,
    "votantes": 8864
  },
  "FRONTINO": {
    "code": "01127",
    "municipality": "FRONTINO",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 3173
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 2033
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 762
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 239
      },
      {
        "name": "Voto en Blanco",
        "votes": 148
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 93
      },
      {
        "name": "Claudia López",
        "votes": 29
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 17
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 16
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 16
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 11
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 5
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 3
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      }
    ],
    "nulos": 86,
    "noMarcados": 36,
    "validos": 6547,
    "votantes": 6669
  },
  "GIRALDO": {
    "code": "01130",
    "municipality": "GIRALDO",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1446
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 876
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 305
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 102
      },
      {
        "name": "Voto en Blanco",
        "votes": 63
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 29
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 6
      },
      {
        "name": "Claudia López",
        "votes": 5
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 2
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 1
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 1
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 0
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 25,
    "noMarcados": 8,
    "validos": 2836,
    "votantes": 2869
  },
  "GIRARDOTA": {
    "code": "01133",
    "municipality": "GIRARDOTA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 16081
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 8511
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2840
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 2631
      },
      {
        "name": "Voto en Blanco",
        "votes": 756
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 393
      },
      {
        "name": "Claudia López",
        "votes": 143
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 131
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 50
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 37
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 18
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 17
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 16
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 5
      }
    ],
    "nulos": 505,
    "noMarcados": 68,
    "validos": 31629,
    "votantes": 32202
  },
  "GOMEZ PLATA": {
    "code": "01136",
    "municipality": "GOMEZ PLATA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 2944
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 691
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 520
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 241
      },
      {
        "name": "Voto en Blanco",
        "votes": 118
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 70
      },
      {
        "name": "Claudia López",
        "votes": 24
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 15
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 12
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 11
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 4
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 2
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 2
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 1
      }
    ],
    "nulos": 66,
    "noMarcados": 20,
    "validos": 4655,
    "votantes": 4741
  },
  "GRANADA": {
    "code": "52035",
    "municipality": "GRANADA",
    "department": "Meta",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 19393
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 11123
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2036
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 924
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 871
      },
      {
        "name": "Voto en Blanco",
        "votes": 703
      },
      {
        "name": "Claudia López",
        "votes": 200
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 51
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 47
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 40
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 27
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 25
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 22
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 6
      }
    ],
    "nulos": 647,
    "noMarcados": 77,
    "validos": 35468,
    "votantes": 36192
  },
  "GUADALUPE": {
    "code": "01140",
    "municipality": "GUADALUPE",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1028
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 823
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 168
      },
      {
        "name": "Voto en Blanco",
        "votes": 95
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 77
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 20
      },
      {
        "name": "Claudia López",
        "votes": 14
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 9
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 7
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 6
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 2
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 1
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 1
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 1
      }
    ],
    "nulos": 40,
    "noMarcados": 11,
    "validos": 2252,
    "votantes": 2303
  },
  "GUARNE": {
    "code": "01142",
    "municipality": "GUARNE",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 18974
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 6465
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2980
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 2315
      },
      {
        "name": "Voto en Blanco",
        "votes": 597
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 271
      },
      {
        "name": "Claudia López",
        "votes": 166
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 53
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 37
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 32
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 22
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 14
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 12
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 12
      }
    ],
    "nulos": 344,
    "noMarcados": 74,
    "validos": 31950,
    "votantes": 32368
  },
  "GUATAPE": {
    "code": "01145",
    "municipality": "GUATAPE",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 3883
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 799
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 794
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 312
      },
      {
        "name": "Voto en Blanco",
        "votes": 67
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 39
      },
      {
        "name": "Claudia López",
        "votes": 22
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 10
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 4
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 3
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 3
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 3
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 2
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 28,
    "noMarcados": 13,
    "validos": 5941,
    "votantes": 5982
  },
  "HELICONIA": {
    "code": "01148",
    "municipality": "HELICONIA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1471
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 588
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 565
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 90
      },
      {
        "name": "Voto en Blanco",
        "votes": 64
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 45
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 10
      },
      {
        "name": "Claudia López",
        "votes": 7
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 6
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 5
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 5
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 4
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 4
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 35,
    "noMarcados": 22,
    "validos": 2867,
    "votantes": 2924
  },
  "HISPANIA": {
    "code": "01150",
    "municipality": "HISPANIA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1620
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 476
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 267
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 114
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 42
      },
      {
        "name": "Voto en Blanco",
        "votes": 33
      },
      {
        "name": "Claudia López",
        "votes": 14
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 11
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 8
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 3
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 2
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 1
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 1
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 1
      }
    ],
    "nulos": 12,
    "noMarcados": 15,
    "validos": 2593,
    "votantes": 2620
  },
  "ITAGUI": {
    "code": "01151",
    "municipality": "ITAGUI",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 90656
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 39461
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 13637
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 12156
      },
      {
        "name": "Voto en Blanco",
        "votes": 2912
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1432
      },
      {
        "name": "Claudia López",
        "votes": 697
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 194
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 178
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 112
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 98
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 75
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 48
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 40
      }
    ],
    "nulos": 1695,
    "noMarcados": 205,
    "validos": 161696,
    "votantes": 163596
  },
  "ITUANGO": {
    "code": "01154",
    "municipality": "ITUANGO",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 2001
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 1547
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 474
      },
      {
        "name": "Voto en Blanco",
        "votes": 238
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 181
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 128
      },
      {
        "name": "Claudia López",
        "votes": 55
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 29
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 20
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 17
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 13
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 12
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 11
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 10
      }
    ],
    "nulos": 115,
    "noMarcados": 77,
    "validos": 4736,
    "votantes": 4928
  },
  "JARDIN": {
    "code": "01157",
    "municipality": "JARDIN",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 4799
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 1918
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1129
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 405
      },
      {
        "name": "Voto en Blanco",
        "votes": 129
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 83
      },
      {
        "name": "Claudia López",
        "votes": 26
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 12
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 10
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 9
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 8
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 2
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 49,
    "noMarcados": 22,
    "validos": 8530,
    "votantes": 8601
  },
  "JERICO": {
    "code": "01160",
    "municipality": "JERICO",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 4143
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 1228
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 978
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 255
      },
      {
        "name": "Voto en Blanco",
        "votes": 131
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 76
      },
      {
        "name": "Claudia López",
        "votes": 19
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 14
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 13
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 12
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 9
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 8
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 5
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 83,
    "noMarcados": 24,
    "validos": 6894,
    "votantes": 7001
  },
  "LA CEJA": {
    "code": "01163",
    "municipality": "LA CEJA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 27398
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 8622
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 4425
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 4224
      },
      {
        "name": "Voto en Blanco",
        "votes": 688
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 387
      },
      {
        "name": "Claudia López",
        "votes": 240
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 70
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 68
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 34
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 26
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 20
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 16
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 10
      }
    ],
    "nulos": 483,
    "noMarcados": 118,
    "validos": 46228,
    "votantes": 46829
  },
  "LA ESTRELLA": {
    "code": "01166",
    "municipality": "LA ESTRELLA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 22579
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 10269
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 4111
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 3600
      },
      {
        "name": "Voto en Blanco",
        "votes": 789
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 401
      },
      {
        "name": "Claudia López",
        "votes": 140
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 43
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 42
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 19
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 18
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 16
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 14
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 12
      }
    ],
    "nulos": 459,
    "noMarcados": 50,
    "validos": 42053,
    "votantes": 42562
  },
  "LA PINTADA": {
    "code": "01170",
    "municipality": "LA PINTADA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 1908
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 1191
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 347
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 89
      },
      {
        "name": "Voto en Blanco",
        "votes": 82
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 59
      },
      {
        "name": "Claudia López",
        "votes": 9
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 7
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 6
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 5
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 4
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 1
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 1
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 53,
    "noMarcados": 17,
    "validos": 3709,
    "votantes": 3779
  },
  "LA UNION": {
    "code": "23079",
    "municipality": "LA UNION",
    "department": "Nariño",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 6754
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 4651
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1229
      },
      {
        "name": "Voto en Blanco",
        "votes": 402
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 221
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 96
      },
      {
        "name": "Claudia López",
        "votes": 78
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 23
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 22
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 19
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 16
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 6
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 3
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      }
    ],
    "nulos": 328,
    "noMarcados": 50,
    "validos": 13522,
    "votantes": 13900
  },
  "LIBORINA": {
    "code": "01172",
    "municipality": "LIBORINA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 3029
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 735
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 700
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 170
      },
      {
        "name": "Voto en Blanco",
        "votes": 59
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 58
      },
      {
        "name": "Claudia López",
        "votes": 21
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 14
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 10
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 5
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 4
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 3
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 33,
    "noMarcados": 20,
    "validos": 4808,
    "votantes": 4861
  },
  "TARAZA": {
    "code": "01270",
    "municipality": "TARAZA",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 3594
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 2214
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 278
      },
      {
        "name": "Voto en Blanco",
        "votes": 188
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 148
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 136
      },
      {
        "name": "Claudia López",
        "votes": 40
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 33
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 19
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 10
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 9
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 4
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 3
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 102,
    "noMarcados": 31,
    "validos": 6679,
    "votantes": 6812
  },
  "TURBO": {
    "code": "01280",
    "municipality": "TURBO",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 26437
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 13435
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1683
      },
      {
        "name": "Voto en Blanco",
        "votes": 1113
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 554
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 296
      },
      {
        "name": "Claudia López",
        "votes": 165
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 103
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 43
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 34
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 31
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 26
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 22
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 16
      }
    ],
    "nulos": 478,
    "noMarcados": 162,
    "validos": 43958,
    "votantes": 44598
  },
  "YARUMAL": {
    "code": "01295",
    "municipality": "YARUMAL",
    "department": "Antioquia",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 9119
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 3096
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1732
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1239
      },
      {
        "name": "Voto en Blanco",
        "votes": 496
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 221
      },
      {
        "name": "Claudia López",
        "votes": 109
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 40
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 34
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 26
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 16
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 13
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 9
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 6
      }
    ],
    "nulos": 279,
    "noMarcados": 83,
    "validos": 16156,
    "votantes": 16518
  },
  "ARAUCA": {
    "code": "40001",
    "municipality": "ARAUCA",
    "department": "Arauna",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 22710
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 7194
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2745
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1044
      },
      {
        "name": "Voto en Blanco",
        "votes": 680
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 567
      },
      {
        "name": "Claudia López",
        "votes": 143
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 86
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 83
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 38
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 25
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 23
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 22
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 11
      }
    ],
    "nulos": 419,
    "noMarcados": 65,
    "validos": 35371,
    "votantes": 35855
  },
  "ARAUQUITA": {
    "code": "40010",
    "municipality": "ARAUQUITA",
    "department": "Arauca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 7671
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 4931
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 501
      },
      {
        "name": "Voto en Blanco",
        "votes": 485
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 271
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 198
      },
      {
        "name": "Claudia López",
        "votes": 79
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 36
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 36
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 21
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 15
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 10
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 10
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 6
      }
    ],
    "nulos": 331,
    "noMarcados": 83,
    "validos": 14270,
    "votantes": 14684
  },
  "BARRANQUILLA": {
    "code": "03001",
    "municipality": "BARRANQUILLA",
    "department": "Atlántico",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 281123
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 272331
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 20320
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 11466
      },
      {
        "name": "Voto en Blanco",
        "votes": 7248
      },
      {
        "name": "Claudia López",
        "votes": 1625
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1566
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 1061
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 359
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 267
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 256
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 179
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 139
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 124
      }
    ],
    "nulos": 2643,
    "noMarcados": 889,
    "validos": 598064,
    "votantes": 601596
  },
  "BARANOA": {
    "code": "03004",
    "municipality": "BARANOA",
    "department": "Atlántico",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 17979
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 9686
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 477
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 462
      },
      {
        "name": "Voto en Blanco",
        "votes": 363
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 84
      },
      {
        "name": "Claudia López",
        "votes": 63
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 52
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 21
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 18
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 14
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 13
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 12
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 11
      }
    ],
    "nulos": 82,
    "noMarcados": 51,
    "validos": 29255,
    "votantes": 29388
  },
  "MALAMBO": {
    "code": "03022",
    "municipality": "MALAMBO",
    "department": "Atlántico",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 29475
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 11621
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 565
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 546
      },
      {
        "name": "Voto en Blanco",
        "votes": 445
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 199
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 105
      },
      {
        "name": "Claudia López",
        "votes": 75
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 27
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 21
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 15
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 12
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 9
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 232,
    "noMarcados": 68,
    "validos": 43119,
    "votantes": 43419
  },
  "SOLEDAD": {
    "code": "03052",
    "municipality": "SOLEDAD",
    "department": "Atlántico",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 104590
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 54568
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 3265
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2486
      },
      {
        "name": "Voto en Blanco",
        "votes": 2059
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 636
      },
      {
        "name": "Claudia López",
        "votes": 323
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 251
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 103
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 92
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 67
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 46
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 35
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 28
      }
    ],
    "nulos": 801,
    "noMarcados": 203,
    "validos": 168549,
    "votantes": 169553
  },
  "BOGOTA. D.C.": {
    "code": "16001",
    "municipality": "BOGOTA. D.C.",
    "department": "Bogotá D.C.",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 1706249
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 1543517
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 372142
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 258410
      },
      {
        "name": "Claudia López",
        "votes": 102440
      },
      {
        "name": "Voto en Blanco",
        "votes": 70144
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 22090
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 6449
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 4007
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 2679
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 2488
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 1815
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 1251
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 827
      }
    ],
    "nulos": 33279,
    "noMarcados": 2297,
    "validos": 4094508,
    "votantes": 4130084
  },
  "CARTAGENA": {
    "code": "05001",
    "municipality": "CARTAGENA",
    "department": "Bolívar",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 239504
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 142674
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 11612
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 10912
      },
      {
        "name": "Voto en Blanco",
        "votes": 7905
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 1789
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1335
      },
      {
        "name": "Claudia López",
        "votes": 1268
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 277
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 276
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 170
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 164
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 143
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 81
      }
    ],
    "nulos": 1944,
    "noMarcados": 545,
    "validos": 418110,
    "votantes": 420599
  },
  "EL CARMEN DE BOLIVAR": {
    "code": "05022",
    "municipality": "EL CARMEN DE BOLIVAR",
    "department": "Bolívar",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 14641
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 10555
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1390
      },
      {
        "name": "Voto en Blanco",
        "votes": 390
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 228
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 131
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 48
      },
      {
        "name": "Claudia López",
        "votes": 44
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 43
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 41
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 32
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 17
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 13
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 13
      }
    ],
    "nulos": 244,
    "noMarcados": 73,
    "validos": 27586,
    "votantes": 27903
  },
  "MAGANGUE": {
    "code": "05028",
    "municipality": "MAGANGUE",
    "department": "Bolívar",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 27393
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 15168
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1185
      },
      {
        "name": "Voto en Blanco",
        "votes": 539
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 468
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 287
      },
      {
        "name": "Claudia López",
        "votes": 110
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 83
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 56
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 33
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 26
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 25
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 15
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 7
      }
    ],
    "nulos": 267,
    "noMarcados": 117,
    "validos": 45395,
    "votantes": 45779
  },
  "TURBACO": {
    "code": "05118",
    "municipality": "TURBACO",
    "department": "Bolívar",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 22333
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 12311
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1060
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 932
      },
      {
        "name": "Voto en Blanco",
        "votes": 693
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 146
      },
      {
        "name": "Claudia López",
        "votes": 116
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 57
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 33
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 23
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 16
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 14
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 14
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 7
      }
    ],
    "nulos": 196,
    "noMarcados": 72,
    "validos": 37755,
    "votantes": 38023
  },
  "TUNJA": {
    "code": "07001",
    "municipality": "TUNJA",
    "department": "Boyacá",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 44172
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 37018
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 8612
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 7867
      },
      {
        "name": "Voto en Blanco",
        "votes": 1866
      },
      {
        "name": "Claudia López",
        "votes": 1721
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 659
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 175
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 96
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 76
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 66
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 46
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 43
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 16
      }
    ],
    "nulos": 1124,
    "noMarcados": 78,
    "validos": 102433,
    "votantes": 103635
  },
  "CHIQUINQUIRA": {
    "code": "07067",
    "municipality": "CHIQUINQUIRA",
    "department": "Boyacá",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 15041
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 9233
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2278
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1263
      },
      {
        "name": "Voto en Blanco",
        "votes": 452
      },
      {
        "name": "Claudia López",
        "votes": 324
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 297
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 38
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 27
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 25
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 12
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 11
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 10
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 7
      }
    ],
    "nulos": 359,
    "noMarcados": 22,
    "validos": 29018,
    "votantes": 29399
  },
  "DUITAMA": {
    "code": "07079",
    "municipality": "DUITAMA",
    "department": "Boyacá",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 29238
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 27239
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 5477
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 4134
      },
      {
        "name": "Claudia López",
        "votes": 1180
      },
      {
        "name": "Voto en Blanco",
        "votes": 1116
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 599
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 113
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 73
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 37
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 37
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 35
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 24
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 10
      }
    ],
    "nulos": 680,
    "noMarcados": 37,
    "validos": 69312,
    "votantes": 70029
  },
  "SOGAMOSO": {
    "code": "07277",
    "municipality": "SOGAMOSO",
    "department": "Boyacá",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 29674
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 27481
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 6297
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 3867
      },
      {
        "name": "Voto en Blanco",
        "votes": 1167
      },
      {
        "name": "Claudia López",
        "votes": 1111
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 500
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 115
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 72
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 45
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 30
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 30
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 19
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 15
      }
    ],
    "nulos": 772,
    "noMarcados": 76,
    "validos": 70423,
    "votantes": 71271
  },
  "MANIZALES": {
    "code": "09001",
    "municipality": "MANIZALES",
    "department": "Caldas",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 98540
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 73993
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 25176
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 18129
      },
      {
        "name": "Voto en Blanco",
        "votes": 4530
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 3994
      },
      {
        "name": "Claudia López",
        "votes": 2928
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 2145
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 407
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 170
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 163
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 138
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 109
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 66
      }
    ],
    "nulos": 3800,
    "noMarcados": 469,
    "validos": 230488,
    "votantes": 234757
  },
  "LA DORADA": {
    "code": "09049",
    "municipality": "LA DORADA",
    "department": "Caldas",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 13888
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 11685
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2119
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 800
      },
      {
        "name": "Voto en Blanco",
        "votes": 595
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 586
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 577
      },
      {
        "name": "Claudia López",
        "votes": 158
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 45
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 41
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 32
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 20
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 18
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 7
      }
    ],
    "nulos": 898,
    "noMarcados": 108,
    "validos": 30571,
    "votantes": 31577
  },
  "RIOSUCIO": {
    "code": "09103",
    "municipality": "RIOSUCIO",
    "department": "Caldas",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 9843
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 9331
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2041
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 714
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 586
      },
      {
        "name": "Voto en Blanco",
        "votes": 515
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 236
      },
      {
        "name": "Claudia López",
        "votes": 152
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 44
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 29
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 23
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 11
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 7
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 5
      }
    ],
    "nulos": 475,
    "noMarcados": 131,
    "validos": 23537,
    "votantes": 24143
  },
  "FLORENCIA": {
    "code": "44001",
    "municipality": "FLORENCIA",
    "department": "Caquetá",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 41108
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 26756
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 4237
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 2590
      },
      {
        "name": "Voto en Blanco",
        "votes": 1525
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1290
      },
      {
        "name": "Claudia López",
        "votes": 352
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 126
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 90
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 71
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 67
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 43
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 31
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 22
      }
    ],
    "nulos": 877,
    "noMarcados": 144,
    "validos": 78308,
    "votantes": 79329
  },
  "SAN VICENTE DEL CAGUAN": {
    "code": "44010",
    "municipality": "SAN VICENTE DEL CAGUAN",
    "department": "Caquetá",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 11114
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 9241
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1017
      },
      {
        "name": "Voto en Blanco",
        "votes": 996
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 514
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 370
      },
      {
        "name": "Claudia López",
        "votes": 147
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 95
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 83
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 48
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 48
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 39
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 22
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 8
      }
    ],
    "nulos": 509,
    "noMarcados": 196,
    "validos": 23742,
    "votantes": 24447
  },
  "YOPAL": {
    "code": "46001",
    "municipality": "YOPAL",
    "department": "Casanare",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 54089
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 25755
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 5948
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 3579
      },
      {
        "name": "Voto en Blanco",
        "votes": 1671
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1332
      },
      {
        "name": "Claudia López",
        "votes": 555
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 124
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 97
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 79
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 67
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 51
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 32
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 11
      }
    ],
    "nulos": 1074,
    "noMarcados": 145,
    "validos": 93390,
    "votantes": 94609
  },
  "LA SALINA": {
    "code": "46480",
    "municipality": "LA SALINA",
    "department": "Casanare",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 229
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 109
      },
      {
        "name": "Voto en Blanco",
        "votes": 19
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 11
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 3
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 3
      },
      {
        "name": "Claudia López",
        "votes": 2
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 1
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 1
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 0
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 0
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 0
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 0
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 0
      }
    ],
    "nulos": 8,
    "noMarcados": 3,
    "validos": 378,
    "votantes": 389
  },
  "TAURAMENA": {
    "code": "46850",
    "municipality": "TAURAMENA",
    "department": "Casanare",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 9652
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 3174
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 664
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 332
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 288
      },
      {
        "name": "Voto en Blanco",
        "votes": 261
      },
      {
        "name": "Claudia López",
        "votes": 62
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 28
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 17
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 12
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 10
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 6
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 5
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 215,
    "noMarcados": 28,
    "validos": 14514,
    "votantes": 14757
  },
  "POPAYAN": {
    "code": "11001",
    "municipality": "POPAYAN",
    "department": "Cauca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 104468
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 49238
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 16694
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 6763
      },
      {
        "name": "Voto en Blanco",
        "votes": 3522
      },
      {
        "name": "Claudia López",
        "votes": 1302
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1174
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 236
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 174
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 128
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 124
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 93
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 73
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 33
      }
    ],
    "nulos": 2626,
    "noMarcados": 356,
    "validos": 184022,
    "votantes": 187004
  },
  "SANTANDER DE QUILICHAO": {
    "code": "11076",
    "municipality": "SANTANDER DE QUILICHAO",
    "department": "Cauca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 36828
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 12819
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2257
      },
      {
        "name": "Voto en Blanco",
        "votes": 1328
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1147
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 475
      },
      {
        "name": "Claudia López",
        "votes": 304
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 108
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 87
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 63
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 59
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 59
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 28
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 22
      }
    ],
    "nulos": 1249,
    "noMarcados": 201,
    "validos": 55584,
    "votantes": 57034
  },
  "VALLEDUPAR": {
    "code": "12001",
    "municipality": "VALLEDUPAR",
    "department": "Cesar",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 89773
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 84650
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 4668
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 4237
      },
      {
        "name": "Voto en Blanco",
        "votes": 3033
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 784
      },
      {
        "name": "Claudia López",
        "votes": 460
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 329
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 153
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 107
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 55
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 53
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 31
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 25
      }
    ],
    "nulos": 1686,
    "noMarcados": 221,
    "validos": 188358,
    "votantes": 190265
  },
  "AGUACHICA": {
    "code": "12075",
    "municipality": "AGUACHICA",
    "department": "Cesar",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 27327
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 14388
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1461
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1074
      },
      {
        "name": "Voto en Blanco",
        "votes": 732
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 555
      },
      {
        "name": "Claudia López",
        "votes": 84
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 71
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 52
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 30
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 20
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 15
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 14
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 7
      }
    ],
    "nulos": 621,
    "noMarcados": 79,
    "validos": 45830,
    "votantes": 46530
  },
  "AGUSTIN CODAZZI": {
    "code": "12150",
    "municipality": "AGUSTIN CODAZZI",
    "department": "Cesar",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 13803
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 9641
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 674
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 366
      },
      {
        "name": "Voto en Blanco",
        "votes": 304
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 126
      },
      {
        "name": "Claudia López",
        "votes": 69
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 38
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 32
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 13
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 12
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 8
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 6
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 5
      }
    ],
    "nulos": 241,
    "noMarcados": 61,
    "validos": 25097,
    "votantes": 25399
  },
  "BOSCONIA": {
    "code": "12200",
    "municipality": "BOSCONIA",
    "department": "Cesar",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 9008
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 6307
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 310
      },
      {
        "name": "Voto en Blanco",
        "votes": 196
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 174
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 116
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 41
      },
      {
        "name": "Claudia López",
        "votes": 28
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 12
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 11
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 11
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 10
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 4
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 146,
    "noMarcados": 172,
    "validos": 16232,
    "votantes": 16550
  },
  "LA JAGUA DE IBIRICO": {
    "code": "12608",
    "municipality": "LA JAGUA DE IBIRICO",
    "department": "Cesar",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 9472
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 5998
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 296
      },
      {
        "name": "Voto en Blanco",
        "votes": 292
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 215
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 153
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 36
      },
      {
        "name": "Claudia López",
        "votes": 26
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 10
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 6
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 5
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 4
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 2
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      }
    ],
    "nulos": 233,
    "noMarcados": 33,
    "validos": 16517,
    "votantes": 16783
  },
  "QUIBDO": {
    "code": "17001",
    "municipality": "QUIBDO",
    "department": "Chocó",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 29900
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 5914
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2266
      },
      {
        "name": "Voto en Blanco",
        "votes": 789
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 459
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 241
      },
      {
        "name": "Claudia López",
        "votes": 167
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 104
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 83
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 65
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 57
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 41
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 31
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 21
      }
    ],
    "nulos": 857,
    "noMarcados": 150,
    "validos": 40138,
    "votantes": 41145
  },
  "MONTERIA": {
    "code": "13001",
    "municipality": "MONTERIA",
    "department": "Córdoba",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 104497
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 87885
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 5611
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 4080
      },
      {
        "name": "Voto en Blanco",
        "votes": 3075
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 705
      },
      {
        "name": "Claudia López",
        "votes": 445
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 262
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 138
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 91
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 78
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 70
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 53
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 18
      }
    ],
    "nulos": 1263,
    "noMarcados": 314,
    "validos": 207008,
    "votantes": 208585
  },
  "CERETE": {
    "code": "13010",
    "municipality": "CERETE",
    "department": "Córdoba",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 26771
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 14984
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 991
      },
      {
        "name": "Voto en Blanco",
        "votes": 689
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 618
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 152
      },
      {
        "name": "Claudia López",
        "votes": 115
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 63
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 25
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 24
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 14
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 11
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 10
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 9
      }
    ],
    "nulos": 320,
    "noMarcados": 89,
    "validos": 44476,
    "votantes": 44885
  },
  "LORICA": {
    "code": "13022",
    "municipality": "LORICA",
    "department": "Córdoba",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 26216
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 15938
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1184
      },
      {
        "name": "Voto en Blanco",
        "votes": 554
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 385
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 164
      },
      {
        "name": "Claudia López",
        "votes": 89
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 49
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 35
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 32
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 27
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 15
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 14
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 5
      }
    ],
    "nulos": 228,
    "noMarcados": 79,
    "validos": 44707,
    "votantes": 45014
  },
  "MONTELIBANO": {
    "code": "13025",
    "municipality": "MONTELIBANO",
    "department": "Córdoba",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 22618
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 7546
      },
      {
        "name": "Voto en Blanco",
        "votes": 522
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 378
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 312
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 153
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 82
      },
      {
        "name": "Claudia López",
        "votes": 77
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 20
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 18
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 17
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 11
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 11
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 11
      }
    ],
    "nulos": 217,
    "noMarcados": 57,
    "validos": 31776,
    "votantes": 32050
  },
  "TIERRALTA": {
    "code": "13058",
    "municipality": "TIERRALTA",
    "department": "Córdoba",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 17296
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 9331
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 629
      },
      {
        "name": "Voto en Blanco",
        "votes": 455
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 237
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 160
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 156
      },
      {
        "name": "Claudia López",
        "votes": 67
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 31
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 23
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 12
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 9
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 8
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 6
      }
    ],
    "nulos": 236,
    "noMarcados": 87,
    "validos": 28420,
    "votantes": 28743
  },
  "VALENCIA": {
    "code": "13061",
    "municipality": "VALENCIA",
    "department": "Córdoba",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 6175
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 5561
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 339
      },
      {
        "name": "Voto en Blanco",
        "votes": 185
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 88
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 58
      },
      {
        "name": "Claudia López",
        "votes": 31
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 29
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 15
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 12
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 12
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 6
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 3
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 1
      }
    ],
    "nulos": 67,
    "noMarcados": 34,
    "validos": 12515,
    "votantes": 12616
  },
  "CAJICA": {
    "code": "15031",
    "municipality": "CAJICA",
    "department": "Cundinamarca",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 25420
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 16176
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 5160
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 3878
      },
      {
        "name": "Claudia López",
        "votes": 1141
      },
      {
        "name": "Voto en Blanco",
        "votes": 908
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 330
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 96
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 59
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 45
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 35
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 20
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 15
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 508,
    "noMarcados": 23,
    "validos": 53287,
    "votantes": 53818
  },
  "COTA": {
    "code": "15046",
    "municipality": "COTA",
    "department": "Cundinamarca",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 11715
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 6260
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2119
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1460
      },
      {
        "name": "Voto en Blanco",
        "votes": 389
      },
      {
        "name": "Claudia López",
        "votes": 361
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 140
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 37
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 22
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 10
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 10
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 10
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 3
      }
    ],
    "nulos": 174,
    "noMarcados": 12,
    "validos": 22540,
    "votantes": 22726
  },
  "CHIA": {
    "code": "15055",
    "municipality": "CHIA",
    "department": "Cundinamarca",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 47983
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 26293
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 8934
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 7246
      },
      {
        "name": "Claudia López",
        "votes": 1761
      },
      {
        "name": "Voto en Blanco",
        "votes": 1584
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 626
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 113
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 90
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 60
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 40
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 38
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 20
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 20
      }
    ],
    "nulos": 687,
    "noMarcados": 49,
    "validos": 94808,
    "votantes": 95544
  },
  "FACATATIVA": {
    "code": "15076",
    "municipality": "FACATATIVA",
    "department": "Cundinamarca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 34701
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 24970
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 5110
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 3592
      },
      {
        "name": "Voto en Blanco",
        "votes": 1623
      },
      {
        "name": "Claudia López",
        "votes": 1385
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 845
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 160
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 98
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 52
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 48
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 46
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 25
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 17
      }
    ],
    "nulos": 1874,
    "noMarcados": 81,
    "validos": 72672,
    "votantes": 74627
  },
  "FUSAGASUGA": {
    "code": "15094",
    "municipality": "FUSAGASUGA",
    "department": "Cundinamarca",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 41650
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 27302
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 6593
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 3475
      },
      {
        "name": "Voto en Blanco",
        "votes": 1309
      },
      {
        "name": "Claudia López",
        "votes": 1113
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 784
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 129
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 95
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 59
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 58
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 53
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 29
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 10
      }
    ],
    "nulos": 908,
    "noMarcados": 74,
    "validos": 82659,
    "votantes": 83641
  },
  "GIRARDOT": {
    "code": "15109",
    "municipality": "GIRARDOT",
    "department": "Cundinamarca",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 26476
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 21283
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 3470
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1620
      },
      {
        "name": "Voto en Blanco",
        "votes": 841
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 639
      },
      {
        "name": "Claudia López",
        "votes": 598
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 95
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 61
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 34
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 32
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 31
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 26
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 16
      }
    ],
    "nulos": 726,
    "noMarcados": 59,
    "validos": 55222,
    "votantes": 56007
  },
  "MADRID": {
    "code": "15160",
    "municipality": "MADRID",
    "department": "Cundinamarca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 31763
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 24614
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 4202
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 3549
      },
      {
        "name": "Voto en Blanco",
        "votes": 1491
      },
      {
        "name": "Claudia López",
        "votes": 1477
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 599
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 129
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 105
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 43
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 43
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 23
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 21
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 16
      }
    ],
    "nulos": 1322,
    "noMarcados": 78,
    "validos": 68075,
    "votantes": 69475
  },
  "MOSQUERA": {
    "code": "15169",
    "municipality": "MOSQUERA",
    "department": "Cundinamarca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 31194
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 29147
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 4988
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 4563
      },
      {
        "name": "Voto en Blanco",
        "votes": 1540
      },
      {
        "name": "Claudia López",
        "votes": 1409
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 610
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 149
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 84
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 55
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 42
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 42
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 23
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 9
      }
    ],
    "nulos": 936,
    "noMarcados": 48,
    "validos": 73855,
    "votantes": 74839
  },
  "SOACHA": {
    "code": "15247",
    "municipality": "SOACHA",
    "department": "Cundinamarca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 139603
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 72682
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 17093
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 10616
      },
      {
        "name": "Claudia López",
        "votes": 5782
      },
      {
        "name": "Voto en Blanco",
        "votes": 5239
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 2362
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 542
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 409
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 221
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 186
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 144
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 132
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 69
      }
    ],
    "nulos": 3895,
    "noMarcados": 222,
    "validos": 255080,
    "votantes": 259197
  },
  "SOPO": {
    "code": "15250",
    "municipality": "SOPO",
    "department": "Cundinamarca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 7099
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 5829
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1267
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1021
      },
      {
        "name": "Voto en Blanco",
        "votes": 367
      },
      {
        "name": "Claudia López",
        "votes": 366
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 156
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 28
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 23
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 9
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 9
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 7
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 6
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 210,
    "noMarcados": 17,
    "validos": 16190,
    "votantes": 16417
  },
  "UBATE": {
    "code": "15304",
    "municipality": "UBATE",
    "department": "Cundinamarca",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 13478
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 6787
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2520
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1342
      },
      {
        "name": "Voto en Blanco",
        "votes": 623
      },
      {
        "name": "Claudia López",
        "votes": 449
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 280
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 49
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 39
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 19
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 16
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 13
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 5
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 5
      }
    ],
    "nulos": 440,
    "noMarcados": 47,
    "validos": 25625,
    "votantes": 26112
  },
  "ZIPAQUIRA": {
    "code": "15340",
    "municipality": "ZIPAQUIRA",
    "department": "Cundinamarca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 39011
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 29209
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 5821
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 4983
      },
      {
        "name": "Claudia López",
        "votes": 1782
      },
      {
        "name": "Voto en Blanco",
        "votes": 1781
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 680
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 169
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 114
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 78
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 44
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 36
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 33
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 28
      }
    ],
    "nulos": 1318,
    "noMarcados": 73,
    "validos": 83769,
    "votantes": 85160
  },
  "INIRIDA": {
    "code": "50001",
    "municipality": "INIRIDA",
    "department": "Guainía",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 4926
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 3351
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 598
      },
      {
        "name": "Voto en Blanco",
        "votes": 200
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 164
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 113
      },
      {
        "name": "Claudia López",
        "votes": 88
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 26
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 19
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 13
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 11
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 8
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 6
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 1
      }
    ],
    "nulos": 71,
    "noMarcados": 28,
    "validos": 9524,
    "votantes": 9623
  },
  "SAN JOSE DEL GUAVIARE": {
    "code": "54001",
    "municipality": "SAN JOSE DEL GUAVIARE",
    "department": "Guaviare",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 12040
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 9150
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1588
      },
      {
        "name": "Voto en Blanco",
        "votes": 835
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 676
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 544
      },
      {
        "name": "Claudia López",
        "votes": 217
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 65
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 55
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 32
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 28
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 15
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 15
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 11
      }
    ],
    "nulos": 554,
    "noMarcados": 102,
    "validos": 25271,
    "votantes": 25927
  },
  "NEIVA": {
    "code": "19001",
    "municipality": "NEIVA",
    "department": "Huila",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 85998
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 71549
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 11552
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 7149
      },
      {
        "name": "Voto en Blanco",
        "votes": 3098
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1951
      },
      {
        "name": "Claudia López",
        "votes": 1447
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 416
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 162
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 161
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 141
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 89
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 83
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 33
      }
    ],
    "nulos": 1919,
    "noMarcados": 200,
    "validos": 183829,
    "votantes": 185948
  },
  "LA PLATA": {
    "code": "19049",
    "municipality": "LA PLATA",
    "department": "Huila",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 14671
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 7829
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2122
      },
      {
        "name": "Voto en Blanco",
        "votes": 554
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 524
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 366
      },
      {
        "name": "Claudia López",
        "votes": 160
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 60
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 50
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 41
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 26
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 20
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 9
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 344,
    "noMarcados": 108,
    "validos": 26435,
    "votantes": 26887
  },
  "PITALITO": {
    "code": "19061",
    "municipality": "PITALITO",
    "department": "Huila",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 34502
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 21913
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 3611
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1865
      },
      {
        "name": "Voto en Blanco",
        "votes": 1264
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 823
      },
      {
        "name": "Claudia López",
        "votes": 321
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 102
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 94
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 85
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 40
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 34
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 29
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 27
      }
    ],
    "nulos": 628,
    "noMarcados": 124,
    "validos": 64710,
    "votantes": 65462
  },
  "SAN AGUSTIN": {
    "code": "19070",
    "municipality": "SAN AGUSTIN",
    "department": "Huila",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 8483
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 5217
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 996
      },
      {
        "name": "Voto en Blanco",
        "votes": 296
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 241
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 144
      },
      {
        "name": "Claudia López",
        "votes": 108
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 38
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 31
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 20
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 15
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 11
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 6
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 135,
    "noMarcados": 51,
    "validos": 15610,
    "votantes": 15796
  },
  "RIOHACHA": {
    "code": "48001",
    "municipality": "RIOHACHA",
    "department": "La Guajira",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 37453
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 26917
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2147
      },
      {
        "name": "Voto en Blanco",
        "votes": 1277
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1172
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 391
      },
      {
        "name": "Claudia López",
        "votes": 193
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 116
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 69
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 48
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 44
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 29
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 27
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 17
      }
    ],
    "nulos": 717,
    "noMarcados": 162,
    "validos": 69900,
    "votantes": 70779
  },
  "MAICAO": {
    "code": "48010",
    "municipality": "MAICAO",
    "department": "La Guajira",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 25692
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 20966
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1048
      },
      {
        "name": "Voto en Blanco",
        "votes": 836
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 599
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 308
      },
      {
        "name": "Claudia López",
        "votes": 148
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 125
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 58
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 55
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 51
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 48
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 24
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 20
      }
    ],
    "nulos": 455,
    "noMarcados": 115,
    "validos": 49978,
    "votantes": 50548
  },
  "URIBIA": {
    "code": "48016",
    "municipality": "URIBIA",
    "department": "La Guajira",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 12551
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 8026
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 521
      },
      {
        "name": "Voto en Blanco",
        "votes": 295
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 217
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 175
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 148
      },
      {
        "name": "Claudia López",
        "votes": 94
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 67
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 45
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 44
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 35
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 30
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 21
      }
    ],
    "nulos": 445,
    "noMarcados": 172,
    "validos": 22269,
    "votantes": 22886
  },
  "SANTA MARTA": {
    "code": "21001",
    "municipality": "SANTA MARTA",
    "department": "Magdalena",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 112812
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 79356
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 10064
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 5749
      },
      {
        "name": "Voto en Blanco",
        "votes": 3898
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1004
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 933
      },
      {
        "name": "Claudia López",
        "votes": 654
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 320
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 142
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 126
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 88
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 73
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 43
      }
    ],
    "nulos": 1708,
    "noMarcados": 251,
    "validos": 215262,
    "votantes": 217221
  },
  "CIENAGA": {
    "code": "21016",
    "municipality": "CIENAGA",
    "department": "Magdalena",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 25967
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 14136
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1104
      },
      {
        "name": "Voto en Blanco",
        "votes": 789
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 583
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 243
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 226
      },
      {
        "name": "Claudia López",
        "votes": 75
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 74
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 35
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 31
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 19
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 18
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 13
      }
    ],
    "nulos": 449,
    "noMarcados": 70,
    "validos": 43313,
    "votantes": 43832
  },
  "EL BANCO": {
    "code": "21025",
    "municipality": "EL BANCO",
    "department": "Magdalena",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 11876
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 9117
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 610
      },
      {
        "name": "Voto en Blanco",
        "votes": 229
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 150
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 123
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 97
      },
      {
        "name": "Claudia López",
        "votes": 55
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 36
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 19
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 18
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 13
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 12
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 1
      }
    ],
    "nulos": 150,
    "noMarcados": 65,
    "validos": 22356,
    "votantes": 22571
  },
  "FUNDACION": {
    "code": "21031",
    "municipality": "FUNDACION",
    "department": "Magdalena",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 11518
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 11406
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 577
      },
      {
        "name": "Voto en Blanco",
        "votes": 356
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 221
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 163
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 102
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 39
      },
      {
        "name": "Claudia López",
        "votes": 37
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 21
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 16
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 8
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 6
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 4
      }
    ],
    "nulos": 219,
    "noMarcados": 52,
    "validos": 24474,
    "votantes": 24745
  },
  "PLATO": {
    "code": "21052",
    "municipality": "PLATO",
    "department": "Magdalena",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 10745
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 7773
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 352
      },
      {
        "name": "Voto en Blanco",
        "votes": 203
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 134
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 123
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 79
      },
      {
        "name": "Claudia López",
        "votes": 41
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 37
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 17
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 12
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 11
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 6
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 116,
    "noMarcados": 60,
    "validos": 19537,
    "votantes": 19713
  },
  "ZONA BANANERA (SEVILLA)": {
    "code": "21095",
    "municipality": "ZONA BANANERA (SEVILLA)",
    "department": "Magdalena",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 14635
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 4436
      },
      {
        "name": "Voto en Blanco",
        "votes": 311
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 291
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 179
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 151
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 139
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 58
      },
      {
        "name": "Claudia López",
        "votes": 38
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 24
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 20
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 12
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 8
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 7
      }
    ],
    "nulos": 236,
    "noMarcados": 73,
    "validos": 20309,
    "votantes": 20618
  },
  "VILLAVICENCIO": {
    "code": "52001",
    "municipality": "VILLAVICENCIO",
    "department": "Meta",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 136730
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 78547
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 20462
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 11253
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 4433
      },
      {
        "name": "Voto en Blanco",
        "votes": 3746
      },
      {
        "name": "Claudia López",
        "votes": 1691
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 346
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 255
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 164
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 150
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 115
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 64
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 62
      }
    ],
    "nulos": 2703,
    "noMarcados": 200,
    "validos": 258018,
    "votantes": 260921
  },
  "ACACIAS": {
    "code": "52005",
    "municipality": "ACACIAS",
    "department": "Meta",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 30711
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 17424
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 3765
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 2025
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1613
      },
      {
        "name": "Voto en Blanco",
        "votes": 1128
      },
      {
        "name": "Claudia López",
        "votes": 434
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 108
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 61
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 51
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 49
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 34
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 25
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 19
      }
    ],
    "nulos": 1629,
    "noMarcados": 82,
    "validos": 57447,
    "votantes": 59158
  },
  "PUERTO GAITAN": {
    "code": "52043",
    "municipality": "PUERTO GAITAN",
    "department": "Meta",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 15043
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 14580
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1586
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1030
      },
      {
        "name": "Voto en Blanco",
        "votes": 1021
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 697
      },
      {
        "name": "Claudia López",
        "votes": 185
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 81
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 50
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 43
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 37
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 36
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 27
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 14
      }
    ],
    "nulos": 1342,
    "noMarcados": 123,
    "validos": 34430,
    "votantes": 35895
  },
  "PASTO": {
    "code": "23001",
    "municipality": "PASTO",
    "department": "Nariño",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 140876
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 49473
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 9410
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 6816
      },
      {
        "name": "Voto en Blanco",
        "votes": 3508
      },
      {
        "name": "Claudia López",
        "votes": 1630
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 756
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 360
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 174
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 108
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 79
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 77
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 61
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 40
      }
    ],
    "nulos": 2287,
    "noMarcados": 287,
    "validos": 213368,
    "votantes": 215942
  },
  "IPIALES": {
    "code": "23067",
    "municipality": "IPIALES",
    "department": "Nariño",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 35198
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 14914
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2499
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1572
      },
      {
        "name": "Voto en Blanco",
        "votes": 1015
      },
      {
        "name": "Claudia López",
        "votes": 384
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 309
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 139
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 58
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 53
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 31
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 30
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 29
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 12
      }
    ],
    "nulos": 834,
    "noMarcados": 206,
    "validos": 56243,
    "votantes": 57283
  },
  "TUMACO": {
    "code": "23139",
    "municipality": "TUMACO",
    "department": "Nariño",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 41334
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 7156
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 3245
      },
      {
        "name": "Voto en Blanco",
        "votes": 922
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 480
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 315
      },
      {
        "name": "Claudia López",
        "votes": 262
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 125
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 122
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 107
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 55
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 47
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 45
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 35
      }
    ],
    "nulos": 756,
    "noMarcados": 214,
    "validos": 54250,
    "votantes": 55220
  },
  "TUQUERRES": {
    "code": "23142",
    "municipality": "TUQUERRES",
    "department": "Nariño",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 15394
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 3078
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 930
      },
      {
        "name": "Voto en Blanco",
        "votes": 362
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 276
      },
      {
        "name": "Claudia López",
        "votes": 94
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 51
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 28
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 22
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 15
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 14
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 9
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 9
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 345,
    "noMarcados": 82,
    "validos": 20286,
    "votantes": 20713
  },
  "CUCUTA": {
    "code": "25001",
    "municipality": "CUCUTA",
    "department": "Norte de Santander",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 267412
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 56294
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 17339
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 17133
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 5887
      },
      {
        "name": "Voto en Blanco",
        "votes": 3915
      },
      {
        "name": "Claudia López",
        "votes": 1234
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 433
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 352
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 222
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 171
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 158
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 127
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 67
      }
    ],
    "nulos": 2523,
    "noMarcados": 369,
    "validos": 370744,
    "votantes": 373636
  },
  "ABREGO": {
    "code": "25004",
    "municipality": "ABREGO",
    "department": "Norte de Santander",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 10215
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 1963
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 510
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 302
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 178
      },
      {
        "name": "Voto en Blanco",
        "votes": 151
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 22
      },
      {
        "name": "Claudia López",
        "votes": 20
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 16
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 11
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 10
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 9
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 3
      }
    ],
    "nulos": 85,
    "noMarcados": 30,
    "validos": 13414,
    "votantes": 13529
  },
  "LOS PATIOS": {
    "code": "25054",
    "municipality": "LOS PATIOS",
    "department": "Norte de Santander",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 33470
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 6987
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 2123
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2122
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 663
      },
      {
        "name": "Voto en Blanco",
        "votes": 478
      },
      {
        "name": "Claudia López",
        "votes": 182
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 51
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 30
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 21
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 14
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 11
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 9
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 7
      }
    ],
    "nulos": 266,
    "noMarcados": 26,
    "validos": 46168,
    "votantes": 46460
  },
  "OCAÑA": {
    "code": "25061",
    "municipality": "OCAÑA",
    "department": "Norte de Santander",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 37018
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 13256
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 2219
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1630
      },
      {
        "name": "Voto en Blanco",
        "votes": 776
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 483
      },
      {
        "name": "Claudia López",
        "votes": 126
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 65
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 52
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 35
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 30
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 12
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 12
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 7
      }
    ],
    "nulos": 460,
    "noMarcados": 70,
    "validos": 55721,
    "votantes": 56251
  },
  "PAMPLONA": {
    "code": "25064",
    "municipality": "PAMPLONA",
    "department": "Norte de Santander",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 16850
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 7507
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1975
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1717
      },
      {
        "name": "Voto en Blanco",
        "votes": 594
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 273
      },
      {
        "name": "Claudia López",
        "votes": 197
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 40
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 34
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 17
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 14
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 14
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 13
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 335,
    "noMarcados": 43,
    "validos": 29249,
    "votantes": 29627
  },
  "VILLA DEL ROSARIO": {
    "code": "25100",
    "municipality": "VILLA DEL ROSARIO",
    "department": "Norte de Santander",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 36138
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 5353
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2111
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1711
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 661
      },
      {
        "name": "Voto en Blanco",
        "votes": 446
      },
      {
        "name": "Claudia López",
        "votes": 155
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 53
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 49
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 34
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 26
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 22
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 13
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 285,
    "noMarcados": 42,
    "validos": 46776,
    "votantes": 47103
  },
  "MOCOA": {
    "code": "64001",
    "municipality": "MOCOA",
    "department": "Putumayo",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 17187
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 5426
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1099
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 493
      },
      {
        "name": "Voto en Blanco",
        "votes": 406
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 213
      },
      {
        "name": "Claudia López",
        "votes": 86
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 21
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 18
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 18
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 17
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 6
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 6
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 5
      }
    ],
    "nulos": 214,
    "noMarcados": 37,
    "validos": 25001,
    "votantes": 25252
  },
  "PUERTO ASIS": {
    "code": "64002",
    "municipality": "PUERTO ASIS",
    "department": "Putumayo",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 18004
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 5145
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 855
      },
      {
        "name": "Voto en Blanco",
        "votes": 837
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 501
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 483
      },
      {
        "name": "Claudia López",
        "votes": 152
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 56
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 55
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 40
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 27
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 19
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 14
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 9
      }
    ],
    "nulos": 535,
    "noMarcados": 131,
    "validos": 26197,
    "votantes": 26863
  },
  "CALARCA": {
    "code": "26010",
    "municipality": "CALARCA",
    "department": "Quindío",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 17276
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 11800
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 3976
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1659
      },
      {
        "name": "Voto en Blanco",
        "votes": 773
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 526
      },
      {
        "name": "Claudia López",
        "votes": 332
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 78
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 67
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 39
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 28
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 22
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 14
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 13
      }
    ],
    "nulos": 746,
    "noMarcados": 69,
    "validos": 36603,
    "votantes": 37418
  },
  "CIRCASIA": {
    "code": "26020",
    "municipality": "CIRCASIA",
    "department": "Quindío",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 7608
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 4582
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1591
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 634
      },
      {
        "name": "Voto en Blanco",
        "votes": 284
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 184
      },
      {
        "name": "Claudia López",
        "votes": 117
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 33
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 32
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 20
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 19
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 10
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 4
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 219,
    "noMarcados": 49,
    "validos": 15121,
    "votantes": 15389
  },
  "MONTENEGRO": {
    "code": "26060",
    "municipality": "MONTENEGRO",
    "department": "Quindío",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 8369
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 5814
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2121
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 655
      },
      {
        "name": "Voto en Blanco",
        "votes": 450
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 318
      },
      {
        "name": "Claudia López",
        "votes": 142
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 54
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 41
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 31
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 29
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 23
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 9
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 537,
    "noMarcados": 81,
    "validos": 18060,
    "votantes": 18678
  },
  "QUIMBAYA": {
    "code": "26080",
    "municipality": "QUIMBAYA",
    "department": "Quindío",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 7320
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 5521
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1684
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 606
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 335
      },
      {
        "name": "Voto en Blanco",
        "votes": 333
      },
      {
        "name": "Claudia López",
        "votes": 104
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 49
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 42
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 28
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 17
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 8
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 7
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 329,
    "noMarcados": 80,
    "validos": 16057,
    "votantes": 16466
  },
  "PEREIRA": {
    "code": "24001",
    "municipality": "PEREIRA",
    "department": "Risaralda",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 124834
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 96694
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 23342
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 15624
      },
      {
        "name": "Voto en Blanco",
        "votes": 5308
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 3181
      },
      {
        "name": "Claudia López",
        "votes": 2816
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 656
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 368
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 240
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 210
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 155
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 108
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 63
      }
    ],
    "nulos": 3847,
    "noMarcados": 620,
    "validos": 273599,
    "votantes": 278066
  },
  "DOSQUEBRADAS": {
    "code": "24025",
    "municipality": "DOSQUEBRADAS",
    "department": "Risaralda",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 46881
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 40698
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 8388
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 6245
      },
      {
        "name": "Voto en Blanco",
        "votes": 2221
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1493
      },
      {
        "name": "Claudia López",
        "votes": 1230
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 294
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 154
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 98
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 74
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 62
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 48
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 22
      }
    ],
    "nulos": 1765,
    "noMarcados": 219,
    "validos": 107908,
    "votantes": 109892
  },
  "SANTA ROSA DE CABAL": {
    "code": "24086",
    "municipality": "SANTA ROSA DE CABAL",
    "department": "Risaralda",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 20631
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 13099
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 3702
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 2388
      },
      {
        "name": "Voto en Blanco",
        "votes": 966
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 657
      },
      {
        "name": "Claudia López",
        "votes": 387
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 113
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 73
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 53
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 37
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 33
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 27
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 18
      }
    ],
    "nulos": 826,
    "noMarcados": 141,
    "validos": 42184,
    "votantes": 43151
  },
  "SAN ANDRES": {
    "code": "56001",
    "municipality": "SAN ANDRES",
    "department": "San Andrés",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 7404
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 7346
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 694
      },
      {
        "name": "Voto en Blanco",
        "votes": 618
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 511
      },
      {
        "name": "Claudia López",
        "votes": 64
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 48
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 29
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 20
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 18
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 15
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 10
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 9
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 1
      }
    ],
    "nulos": 79,
    "noMarcados": 30,
    "validos": 16787,
    "votantes": 16896
  },
  "BUCARAMANGA": {
    "code": "27001",
    "municipality": "BUCARAMANGA",
    "department": "Santander",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 198332
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 91324
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 19709
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 19051
      },
      {
        "name": "Voto en Blanco",
        "votes": 5025
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 4575
      },
      {
        "name": "Claudia López",
        "votes": 2045
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 428
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 259
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 191
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 117
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 112
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 87
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 68
      }
    ],
    "nulos": 2024,
    "noMarcados": 192,
    "validos": 341323,
    "votantes": 343539
  },
  "BARRANCABERMEJA": {
    "code": "27019",
    "municipality": "BARRANCABERMEJA",
    "department": "Santander",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 69511
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 38355
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 3546
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 2927
      },
      {
        "name": "Voto en Blanco",
        "votes": 2205
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1682
      },
      {
        "name": "Claudia López",
        "votes": 587
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 183
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 107
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 71
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 70
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 70
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 64
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 29
      }
    ],
    "nulos": 1788,
    "noMarcados": 183,
    "validos": 119407,
    "votantes": 121378
  },
  "FLORIDABLANCA": {
    "code": "27082",
    "municipality": "FLORIDABLANCA",
    "department": "Santander",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 90033
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 42163
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 9691
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 8763
      },
      {
        "name": "Voto en Blanco",
        "votes": 2252
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1947
      },
      {
        "name": "Claudia López",
        "votes": 1065
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 148
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 142
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 87
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 58
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 38
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 37
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 19
      }
    ],
    "nulos": 1018,
    "noMarcados": 102,
    "validos": 156443,
    "votantes": 157563
  },
  "GIRON": {
    "code": "27091",
    "municipality": "GIRON",
    "department": "Santander",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 48682
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 25499
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 4036
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 3561
      },
      {
        "name": "Voto en Blanco",
        "votes": 1648
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1503
      },
      {
        "name": "Claudia López",
        "votes": 479
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 108
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 107
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 56
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 55
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 50
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 34
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 8
      }
    ],
    "nulos": 733,
    "noMarcados": 75,
    "validos": 85826,
    "votantes": 86634
  },
  "PIEDECUESTA": {
    "code": "27160",
    "municipality": "PIEDECUESTA",
    "department": "Santander",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 54278
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 26051
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 4710
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 4198
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1615
      },
      {
        "name": "Voto en Blanco",
        "votes": 1565
      },
      {
        "name": "Claudia López",
        "votes": 568
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 123
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 120
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 57
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 38
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 35
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 26
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 13
      }
    ],
    "nulos": 831,
    "noMarcados": 98,
    "validos": 93397,
    "votantes": 94326
  },
  "SAN GIL": {
    "code": "27181",
    "municipality": "SAN GIL",
    "department": "Santander",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 19168
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 8703
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2288
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1436
      },
      {
        "name": "Voto en Blanco",
        "votes": 448
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 299
      },
      {
        "name": "Claudia López",
        "votes": 218
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 39
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 22
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 18
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 13
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 12
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 9
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 220,
    "noMarcados": 23,
    "validos": 32677,
    "votantes": 32920
  },
  "SAN VICENTE DE CHUCURI": {
    "code": "27193",
    "municipality": "SAN VICENTE DE CHUCURI",
    "department": "Santander",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 10055
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 2998
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 826
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 310
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 288
      },
      {
        "name": "Voto en Blanco",
        "votes": 219
      },
      {
        "name": "Claudia López",
        "votes": 40
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 23
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 14
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 10
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 10
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 5
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 5
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 1
      }
    ],
    "nulos": 187,
    "noMarcados": 40,
    "validos": 14804,
    "votantes": 15031
  },
  "SOCORRO": {
    "code": "27199",
    "municipality": "SOCORRO",
    "department": "Santander",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 10882
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 3380
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1804
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 558
      },
      {
        "name": "Voto en Blanco",
        "votes": 181
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 170
      },
      {
        "name": "Claudia López",
        "votes": 72
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 19
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 15
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 11
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 6
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 5
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 2
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 2
      }
    ],
    "nulos": 97,
    "noMarcados": 10,
    "validos": 17107,
    "votantes": 17214
  },
  "SINCELEJO": {
    "code": "28001",
    "municipality": "SINCELEJO",
    "department": "Sucre",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 71183
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 45664
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 3264
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 2258
      },
      {
        "name": "Voto en Blanco",
        "votes": 1888
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 383
      },
      {
        "name": "Claudia López",
        "votes": 232
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 148
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 79
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 67
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 61
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 48
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 38
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 16
      }
    ],
    "nulos": 1106,
    "noMarcados": 266,
    "validos": 125329,
    "votantes": 126701
  },
  "COROZAL": {
    "code": "28040",
    "municipality": "COROZAL",
    "department": "Sucre",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 17816
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 11441
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 649
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 459
      },
      {
        "name": "Voto en Blanco",
        "votes": 327
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 115
      },
      {
        "name": "Claudia López",
        "votes": 48
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 25
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 16
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 15
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 11
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 9
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 9
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      }
    ],
    "nulos": 184,
    "noMarcados": 51,
    "validos": 30942,
    "votantes": 31177
  },
  "IBAGUE": {
    "code": "29001",
    "municipality": "IBAGUE",
    "department": "Tolima",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 141360
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 109574
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 27755
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 13631
      },
      {
        "name": "Voto en Blanco",
        "votes": 5363
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 3042
      },
      {
        "name": "Claudia López",
        "votes": 2410
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 618
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 429
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 207
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 168
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 148
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 130
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 74
      }
    ],
    "nulos": 3928,
    "noMarcados": 376,
    "validos": 304909,
    "votantes": 309213
  },
  "ESPINAL": {
    "code": "29046",
    "municipality": "ESPINAL",
    "department": "Tolima",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 17320
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 13830
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 4686
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 943
      },
      {
        "name": "Voto en Blanco",
        "votes": 735
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 580
      },
      {
        "name": "Claudia López",
        "votes": 360
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 154
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 78
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 38
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 38
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 37
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 30
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 9
      }
    ],
    "nulos": 631,
    "noMarcados": 99,
    "validos": 38838,
    "votantes": 39568
  },
  "LIBANO": {
    "code": "29073",
    "municipality": "LIBANO",
    "department": "Tolima",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 8501
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 6087
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2012
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 418
      },
      {
        "name": "Voto en Blanco",
        "votes": 340
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 250
      },
      {
        "name": "Claudia López",
        "votes": 124
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 41
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 39
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 30
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 21
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 17
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 13
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 428,
    "noMarcados": 56,
    "validos": 17897,
    "votantes": 18381
  },
  "MARIQUITA": {
    "code": "29076",
    "municipality": "MARIQUITA",
    "department": "Tolima",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 7507
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 6437
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1325
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 442
      },
      {
        "name": "Voto en Blanco",
        "votes": 394
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 358
      },
      {
        "name": "Claudia López",
        "votes": 135
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 44
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 37
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 27
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 17
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 11
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 10
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      }
    ],
    "nulos": 398,
    "noMarcados": 64,
    "validos": 16746,
    "votantes": 17208
  },
  "MELGAR": {
    "code": "29079",
    "municipality": "MELGAR",
    "department": "Tolima",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 11627
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 5201
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1460
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 444
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 329
      },
      {
        "name": "Voto en Blanco",
        "votes": 322
      },
      {
        "name": "Claudia López",
        "votes": 143
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 31
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 28
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 25
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 18
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 17
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 8
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 4
      }
    ],
    "nulos": 245,
    "noMarcados": 23,
    "validos": 19657,
    "votantes": 19925
  },
  "CALI": {
    "code": "31001",
    "municipality": "CALI",
    "department": "Valle del Cauca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 541270
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 371718
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 56344
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 45989
      },
      {
        "name": "Voto en Blanco",
        "votes": 20282
      },
      {
        "name": "Claudia López",
        "votes": 6970
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 5180
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 1569
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 821
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 775
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 756
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 713
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 363
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 260
      }
    ],
    "nulos": 9087,
    "noMarcados": 1321,
    "validos": 1053010,
    "votantes": 1063418
  },
  "BUGA": {
    "code": "31022",
    "municipality": "BUGA",
    "department": "Valle del Cauca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 36630
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 20612
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2694
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 2508
      },
      {
        "name": "Voto en Blanco",
        "votes": 1188
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 475
      },
      {
        "name": "Claudia López",
        "votes": 349
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 78
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 60
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 36
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 35
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 32
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 19
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 13
      }
    ],
    "nulos": 695,
    "noMarcados": 96,
    "validos": 64729,
    "votantes": 65520
  },
  "CAICEDONIA": {
    "code": "31028",
    "municipality": "CAICEDONIA",
    "department": "Valle del Cauca",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 6695
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 4478
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1681
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 406
      },
      {
        "name": "Voto en Blanco",
        "votes": 267
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 163
      },
      {
        "name": "Claudia López",
        "votes": 107
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 32
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 30
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 24
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 17
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 16
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 14
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 297,
    "noMarcados": 56,
    "validos": 13933,
    "votantes": 14286
  },
  "CARTAGO": {
    "code": "31034",
    "municipality": "CARTAGO",
    "department": "Valle del Cauca",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 30265
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 24806
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 4669
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 2887
      },
      {
        "name": "Voto en Blanco",
        "votes": 1346
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 849
      },
      {
        "name": "Claudia López",
        "votes": 477
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 102
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 96
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 74
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 60
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 42
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 34
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 31
      }
    ],
    "nulos": 1040,
    "noMarcados": 162,
    "validos": 65738,
    "votantes": 66940
  },
  "PALMIRA": {
    "code": "31079",
    "municipality": "PALMIRA",
    "department": "Valle del Cauca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 90115
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 52511
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 8081
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 6511
      },
      {
        "name": "Voto en Blanco",
        "votes": 3436
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1138
      },
      {
        "name": "Claudia López",
        "votes": 1081
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 282
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 208
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 157
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 126
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 90
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 56
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 38
      }
    ],
    "nulos": 1780,
    "noMarcados": 271,
    "validos": 163830,
    "votantes": 165881
  },
  "TULUA": {
    "code": "31106",
    "municipality": "TULUA",
    "department": "Valle del Cauca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 43107
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 41369
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 5371
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 4064
      },
      {
        "name": "Voto en Blanco",
        "votes": 1960
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 1068
      },
      {
        "name": "Claudia López",
        "votes": 579
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 132
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 121
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 87
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 85
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 79
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 38
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 27
      }
    ],
    "nulos": 1404,
    "noMarcados": 169,
    "validos": 98087,
    "votantes": 99660
  },
  "YUMBO": {
    "code": "31121",
    "municipality": "YUMBO",
    "department": "Valle del Cauca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 44723
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 14169
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 2963
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 1531
      },
      {
        "name": "Voto en Blanco",
        "votes": 1035
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 434
      },
      {
        "name": "Claudia López",
        "votes": 288
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 77
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 42
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 38
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 35
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 34
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 19
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 17
      }
    ],
    "nulos": 536,
    "noMarcados": 105,
    "validos": 65405,
    "votantes": 66046
  },
  "ZARZAL": {
    "code": "31124",
    "municipality": "ZARZAL",
    "department": "Valle del Cauca",
    "candidates": [
      {
        "name": "Iván Cepeda Castro",
        "votes": 13457
      },
      {
        "name": "Abelardo de la Espriella",
        "votes": 6356
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 1193
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 570
      },
      {
        "name": "Voto en Blanco",
        "votes": 336
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 229
      },
      {
        "name": "Claudia López",
        "votes": 82
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 25
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 20
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 17
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 11
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 10
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 8
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 2
      }
    ],
    "nulos": 248,
    "noMarcados": 37,
    "validos": 22316,
    "votantes": 22601
  },
  "PUERTO CARREÑO": {
    "code": "72001",
    "municipality": "PUERTO CARREÑO",
    "department": "Vichada",
    "candidates": [
      {
        "name": "Abelardo de la Espriella",
        "votes": 4399
      },
      {
        "name": "Iván Cepeda Castro",
        "votes": 2767
      },
      {
        "name": "Paloma Valencia Laserna",
        "votes": 614
      },
      {
        "name": "Voto en Blanco",
        "votes": 190
      },
      {
        "name": "Sergio Fajardo Valderrama",
        "votes": 176
      },
      {
        "name": "Raúl Santiago Botero Jaramillo",
        "votes": 158
      },
      {
        "name": "Claudia López",
        "votes": 48
      },
      {
        "name": "Óscar Mauricio Lizcano Arango",
        "votes": 28
      },
      {
        "name": "Miguel Uribe Londoño",
        "votes": 19
      },
      {
        "name": "Carlos Eduardo Caicedo Omar",
        "votes": 13
      },
      {
        "name": "Roy Leonardo Barreras Montealegre",
        "votes": 10
      },
      {
        "name": "Luis Gilberto Murillo Urrutia",
        "votes": 10
      },
      {
        "name": "Sondra Macollins Garvin Pinto",
        "votes": 8
      },
      {
        "name": "Gustavo Matamoros Camacho",
        "votes": 3
      }
    ],
    "nulos": 92,
    "noMarcados": 33,
    "validos": 8443,
    "votantes": 8568
  }
};

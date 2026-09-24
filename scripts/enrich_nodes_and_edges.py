# -*- coding: utf-8 -*-
"""
Script que enriquece GRAPH_NODES_DATA y GRAPH_EDGES_DATA en politicalHousesMasterData.ts
con todos los concejales y agentes políticos locales por partido.
"""

new_concejales_nodes = """
  // ==========================================
  // CONCEJALES Y AGENTES MUNICIPALES POR PARTIDO (PA-009 EXTENDIDO)
  // ==========================================
  
  // --- CONCEJALES CENTRO DEMOCRÁTICO ---
  {
    id: 'actor-cd-concejal-claudia-carrasquilla',
    name: 'Claudia Carrasquilla Minami',
    alias: 'La Fiscal de Hierro',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático (Álvaro Uribe Vélez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 18250,
    cedula: '43.201.884',
    status: 'En funciones (Concejal)',
    bio: 'Abogada penalista y exfiscal nacional contra el crimen organizado. Una de las figuras de mayor visibilidad en seguridad y control político del Concejo de Medellín.',
    extramunicipalConnection: 'Articulada con la bancada nacional del Centro Democrático en el Congreso.',
    municipalAnchor: 'Concejo de Medellín, comisiones de seguridad ciudadana y justicia.',
    socialProfiles: {
      xTwitter: '@FiscalHierro',
      instagram: '@claudiacarrasquillam',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Claudia Carrasquilla lidera debate de control a redes criminales en Medellín',
        source: 'El Colombiano',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-cd-concejal-luis-velez',
    name: 'Luis Guillermo Vélez Álvarez',
    alias: 'Luis Guillermo Vélez',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático (Álvaro Uribe Vélez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 14890,
    status: 'En funciones (Concejal)',
    bio: 'Economista y profesor universitario. Vocero técnico del Centro Democrático en temas presupuestales, finanzas de EPM y viabilidad fiscal.',
    extramunicipalConnection: 'Vínculo académico con centros de pensamiento del uribismo y gremios de Antioquia.',
    municipalAnchor: 'Concejo de Medellín, Comisión Segunda de Presupuesto.',
    socialProfiles: {
      xTwitter: '@LuisGVelez',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Luis Guillermo Vélez advierte sobre el déficit financiero de empresas públicas',
        source: 'Teleantioquia Noticias',
        year: 2024,
        sentiment: 'critico'
      }
    ]
  },
  {
    id: 'actor-cd-concejal-andres-rodriguez',
    name: 'Andrés Rodríguez',
    alias: 'Gury Rodríguez',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático (Álvaro Uribe Vélez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 12110,
    status: 'En funciones (Concejal)',
    bio: 'Empresario y activista ciudadano. Lideró la revocatoria a Daniel Quintero. Representa el voto de opinión duro y confrontacional del Centro Democrático.',
    extramunicipalConnection: 'Coordinación con colectivos cívicos y veedurías de oposición a nivel nacional.',
    municipalAnchor: 'Concejo de Medellín y redes digitales de activismo de derecha.',
    socialProfiles: {
      xTwitter: '@GuryRodriguez',
      instagram: '@andresguryrodriguez',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Andrés Gury Rodríguez impulsa veedurías ciudadanas contra la corrupción',
        source: 'Revista Semana',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-cd-concejal-leticia-orrego',
    name: 'Leticia Orrego Pérez',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático (Álvaro Uribe Vélez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 11450,
    status: 'En funciones (Concejal)',
    bio: 'Abogada con amplia trayectoria en derecho administrativo y control de gestión. Defensora de las familias populares y juntas de acción comunal.',
    extramunicipalConnection: 'Articulada con el Directorio Departamental del Centro Democrático en Antioquia.',
    municipalAnchor: 'Comunas nororientales y Comuna 13 (San Javier).',
    socialProfiles: {
      xTwitter: '@LeticiaOrregoP',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Leticia Orrego destaca inversión social comunitaria en Medellín',
        source: 'Minuto30',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },

  // --- CONCEJALES PARTIDO CREEMOS ---
  {
    id: 'actor-creemos-concejal-andres-tobon',
    name: 'Andrés Felipe Tobón Villada',
    alias: 'Andrés Tobón',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín - Más Votado (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-gutierrez',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 43795,
    cedula: '1.152.189.793',
    status: 'En funciones (Presidente Concejo 2024)',
    bio: 'Politólogo, exsecretario de Seguridad de Federico Gutiérrez. Fue la votación más alta al Concejo de Medellín en la historia de la ciudad.',
    extramunicipalConnection: 'Líder del comité de expansión nacional de Creemos y estratega clave de Fico.',
    municipalAnchor: 'Concejo de Medellín, redes comunitarias de seguridad y juventud.',
    socialProfiles: {
      xTwitter: '@tobonvillada',
      instagram: '@andrestobonv',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Andrés Tobón es elegido presidente del Concejo de Medellín con votación histórica',
        source: 'El Colombiano',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-creemos-concejal-paulina-suarez',
    name: 'María Paulina Suárez Roldán',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-gutierrez',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 16145,
    cedula: '43.597.417',
    status: 'En funciones (Concejal)',
    bio: 'Exsecretaria de Inclusión Social y Familia en el primer mandato de Fico. Especialista en infancia, adulto mayor y programas de nutrición.',
    extramunicipalConnection: 'Vínculo con fundaciones y organismos internacionales de desarrollo social.',
    municipalAnchor: 'Redes de madres comunitarias y programas de comedores en comunas populares.',
    socialProfiles: {
      xTwitter: '@suarezpaulina',
      instagram: '@mariapaulinasuarezr',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Paulina Suárez lidera política integral de atención a primera infancia en Medellín',
        source: 'Caracol Radio Medellín',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-creemos-concejal-santiago-perdomo',
    name: 'Santiago Perdomo Montoya',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-gutierrez',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 15240,
    cedula: '1.152.435.767',
    status: 'En funciones (Concejal)',
    bio: 'Líder juvenil de Creemos. Enfoque en innovación tecnológica, industrias creativas y empleo para jóvenes en el Valle del Software.',
    extramunicipalConnection: 'Articulación con ecosistemas de emprendimiento e innovación nacional.',
    municipalAnchor: 'Universidades de Medellín, Comuna 7 (Robledo) y Comuna 11 (Laureles).',
    socialProfiles: {
      xTwitter: '@SantiPerdomoM',
      instagram: '@santiagoperdomom',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Santiago Perdomo impulsa fondo distrital para becas de tecnología',
        source: 'Telemedellín',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-creemos-concejal-alejandro-bedout',
    name: 'Alejandro De Bedout Arango',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-gutierrez',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 11115,
    cedula: '10.376.006.12',
    status: 'En funciones (Concejal)',
    bio: 'Administrador de negocios, exsubsecretario de Creación y Fortalecimiento Empresarial. Enlace clave entre la bancada y los gremios de Fenalco y la ANDI.',
    extramunicipalConnection: 'Articulación con cámaras de comercio y gremios exportadores del país.',
    municipalAnchor: 'El Poblado, Laureles y corredores comerciales del centro de Medellín.',
    socialProfiles: {
      xTwitter: '@AlejoDeBedout',
      instagram: '@alejodebedout',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Alejandro De Bedout presenta plan de reactivación para comerciantes del centro',
        source: 'El Colombiano',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-creemos-concejal-sabaneta-ivan',
    name: 'Iván Alonso Montoya Urrego',
    role: 'concejal',
    roleLabel: 'Concejal de Sabaneta (Oposición / Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-gutierrez',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Sabaneta',
    department: 'Antioquia',
    votes2023: 13836,
    status: 'En funciones (Concejal Oposición)',
    bio: 'Exalcalde de Sabaneta (2016-2019). Obtuvo el segundo lugar para la Alcaldía en 2023 y asumió curul bajo el Estatuto de Oposición (Ley 1909).',
    extramunicipalConnection: 'Vínculo directo con Federico Gutiérrez y el comité metropolitano de Creemos.',
    municipalAnchor: 'Concejo de Sabaneta y barrios de Prados de Sabaneta y Calle Larga.',
    socialProfiles: {
      xTwitter: '@IvanMontoyaSaba',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Iván Montoya ejerce control estricto al plan de ordenamiento de Sabaneta',
        source: 'Periódico El Mundo',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },

  // --- CONCEJALES PARTIDO CONSERVADOR ---
  {
    id: 'actor-conservador-concejal-itagui-bancada',
    name: 'Bancada Conservadora de Itagüí',
    role: 'concejal',
    roleLabel: 'Bancada Mayoritaria de Concejales (Itagüí)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Itagüí',
    department: 'Antioquia',
    votes2023: 58900,
    status: 'En funciones (Bancada de 11 concejales)',
    bio: 'Mayoría absoluta en el Concejo de Itagüí. Bloque disciplinado bajo las directrices del senador Carlos Andrés Trujillo y el alcalde Diego León Torres.',
    extramunicipalConnection: 'Respaldo del Directorio Nacional Conservador y comisiones del Senado.',
    municipalAnchor: 'Concejo de Itagüí, contratación municipal, comunas Ditaires, San Pío y Calatrava.',
    socialProfiles: {
      xTwitter: '@ConcejoItagui',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Concejo de Itagüí aprueba presupuesto histórico para seguridad y megaobras',
        source: 'Antioquia Crítica',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },

  // --- CONCEJALES PARTIDO LIBERAL ---
  {
    id: 'actor-liberal-concejal-envigado-bancada',
    name: 'Bancada Liberal de Envigado',
    role: 'concejal',
    roleLabel: 'Bancada Mayoritaria de Concejales (Envigado)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-envigado-londono',
    houseName: 'Casa Héctor Londoño / Liberales de Envigado',
    level: 4,
    sphere: 'municipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    votes2023: 42100,
    status: 'En funciones (Bancada de 9 concejales)',
    bio: 'Hegemonía histórica en el Concejo de Envigado liderada por el exalcalde Braulio Espinosa, Pablo Restrepo y el alcalde Raúl Cardona.',
    extramunicipalConnection: 'Articulada con el expresidente César Gaviria y la bancada liberal de Antioquia en la Cámara.',
    municipalAnchor: 'Concejo de Envigado, zonas El Dorado, San Marcos y Las Vegas.',
    socialProfiles: {
      xTwitter: '@ConcejoEnvigado',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Bancada Liberal de Envigado consolida modelo de educación superior gratuita',
        source: 'El Espectador',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },

  // --- CONCEJALES PACTO HISTÓRICO / INDEPENDIENTES ---
  {
    id: 'actor-pacto-concejal-jose-marin',
    name: 'José Luis Marín',
    alias: 'Aquineto',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Pacto Histórico)',
    partyId: 'pacto-historico',
    partyName: 'Pacto Histórico',
    houseId: 'casa-pacto-independientes-quintero',
    houseName: 'Casa Pacto Histórico / Independientes (Daniel Quintero)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 28410,
    status: 'En funciones (Concejal)',
    bio: 'Abogado y líder juvenil alternativo. Asumió la vocería de la oposición al gobierno distrital de Federico Gutiérrez en el Concejo de Medellín.',
    extramunicipalConnection: 'Vínculo estrecho con la bancada nacional del Pacto Histórico y el Gobierno Nacional.',
    municipalAnchor: 'Concejo de Medellín, colectivos estudiantiles y de derechos humanos.',
    socialProfiles: {
      xTwitter: '@Aquineto',
      instagram: '@aquinetomarin',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'José Luis Marín asume la curul de oposición del Pacto Histórico en Medellín',
        source: 'RCN Radio',
        year: 2024,
        sentiment: 'neutro'
      }
    ]
  },

  // --- CONCEJALES ALIANZA VERDE ---
  {
    id: 'actor-verde-concejal-camilo-londono',
    name: 'Camilo Londoño Rodríguez',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Alianza Verde)',
    partyId: 'verde',
    partyName: 'Partido Alianza Verde',
    houseId: 'casa-creemos-gutierrez',
    houseName: 'Independientes / Centro Alternativo',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 13950,
    status: 'En funciones (Concejal)',
    bio: 'Ambientalista y urbanista. Vocero verde en el Concejo de Medellín con agenda centrada en sostenibilidad, movilidad limpia y protección de quebradas.',
    extramunicipalConnection: 'Articulado con congresistas verdes y el movimiento ambiental nacional.',
    municipalAnchor: 'Concejo de Medellín, colectivos ciclistas y redes ecologistas.',
    socialProfiles: {
      xTwitter: '@CamiloLondonoR',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Camilo Londoño lidera debate sobre calidad del aire y árboles urbanos en Medellín',
        source: 'Telemedellín',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  }
"""

new_concejales_edges = """
  // ==========================================
  // CONEXIONES DE JERARQUÍA Y BANCADA DE CONCEJALES (PA-009 EXTENDIDO)
  // ==========================================
  
  // Conexiones Centro Democrático
  {
    id: 'edge-cd-uribe-carrasquilla',
    source: 'actor-uribe-alvaro',
    target: 'actor-cd-concejal-claudia-carrasquilla',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Aval y Dirección Doctrinaria',
    description: 'Claudia Carrasquilla cuenta con el respaldo personal directo de Álvaro Uribe Vélez en el Concejo de Medellín.'
  },
  {
    id: 'edge-cd-uribe-velez',
    source: 'actor-uribe-alvaro',
    target: 'actor-cd-concejal-luis-velez',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Liderazgo Económico en Bancada',
    description: 'Luis Guillermo Vélez es el portavoz financiero del uribismo en temas de hacienda pública.'
  },
  {
    id: 'edge-cd-uribe-rodriguez',
    source: 'actor-uribe-alvaro',
    target: 'actor-cd-concejal-andres-rodriguez',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Articulación de Oposición Ciudadana',
    description: 'Andrés Gury Rodríguez coordina movilizaciones cívicas en Medellín con el respaldo de Uribe.'
  },
  {
    id: 'edge-cd-uribe-orrego',
    source: 'actor-uribe-alvaro',
    target: 'actor-cd-concejal-leticia-orrego',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Voz Comunal de Bancada',
    description: 'Leticia Orrego articula las juntas comunitarias con la bancada del Centro Democrático.'
  },
  {
    id: 'edge-cd-lopez-carrasquilla',
    source: 'actor-lopez-sebastian',
    target: 'actor-cd-concejal-claudia-carrasquilla',
    type: 'pacto_bancada',
    strength: 5,
    label: 'Coordinación de Bancada CD',
    description: 'Sebastián López y Claudia Carrasquilla lideran la bancada de concejales del Centro Democrático.'
  },

  // Conexiones Creemos
  {
    id: 'edge-fico-tobon',
    source: 'actor-gutierrez-federico',
    target: 'actor-creemos-concejal-andres-tobon',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Fórmula de Gobierno / Presidente Concejo',
    description: 'Andrés Tobón es el principal alfil de Federico Gutiérrez en la corporación municipal de Medellín.'
  },
  {
    id: 'edge-fico-suarez',
    source: 'actor-gutierrez-federico',
    target: 'actor-creemos-concejal-paulina-suarez',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Alfil Social de Bancada',
    description: 'Paulina Suárez canaliza las metas sociales del Plan de Desarrollo de Fico en el Concejo.'
  },
  {
    id: 'edge-fico-perdomo',
    source: 'actor-gutierrez-federico',
    target: 'actor-creemos-concejal-santiago-perdomo',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Enlace Juvenil y Tecnológico',
    description: 'Santiago Perdomo lidera las iniciativas para jóvenes y emprendedores de Creemos.'
  },
  {
    id: 'edge-fico-bedout',
    source: 'actor-gutierrez-federico',
    target: 'actor-creemos-concejal-alejandro-bedout',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Enlace Gremial y Empresarial',
    description: 'Alejandro De Bedout articula las relaciones del gobierno de Creemos con el sector privado.'
  },
  {
    id: 'edge-fico-sabaneta-montoya',
    source: 'actor-gutierrez-federico',
    target: 'actor-creemos-concejal-sabaneta-ivan',
    type: 'alianza_electoral',
    strength: 4,
    label: 'Expansión de Creemos en Sabaneta',
    description: 'Iván Alonso Montoya defiende las banderas de Creemos en el sur del Valle de Aburrá.'
  },

  // Conexiones Conservador
  {
    id: 'edge-trujillo-concejales-itagui',
    source: 'actor-trujillo-carlos',
    target: 'actor-conservador-concejal-itagui-bancada',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Control Hegemónico de Bancada',
    description: 'La bancada conservadora de Itagüí responde con lealtad cerrada a las directrices de Trujillo.'
  },

  // Conexiones Liberal
  {
    id: 'edge-londono-concejales-envigado',
    source: 'actor-londono-hector',
    target: 'actor-liberal-concejal-envigado-bancada',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Hegemonía Liberal Tradicional',
    description: 'La bancada liberal en Envigado mantiene la gobernabilidad ininterrumpida desde hace décadas.'
  },

  // Conexiones Pacto Histórico
  {
    id: 'edge-quintero-marin',
    source: 'actor-quintero-daniel',
    target: 'actor-pacto-concejal-jose-marin',
    type: 'alianza_electoral',
    strength: 4,
    label: 'Articulación de Oposición en Medellín',
    description: 'José Luis Marín coordina la oposición distrital frente a la administración de Creemos.'
  }
"""

with open('src/data/politicalHouses/politicalHousesMasterData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update partyId in existing nodes
replacements = [
    ("id: 'actor-uribe-alvaro',", "id: 'actor-uribe-alvaro',\n    partyId: 'centro-democratico',\n    partyName: 'Centro Democrático',"),
    ("id: 'actor-rendon-andres-julian',", "id: 'actor-rendon-andres-julian',\n    partyId: 'centro-democratico',\n    partyName: 'Centro Democrático',"),
    ("id: 'actor-quintero-esteban',", "id: 'actor-quintero-esteban',\n    partyId: 'centro-democratico',\n    partyName: 'Centro Democrático',"),
    ("id: 'actor-cadavid-hernan',", "id: 'actor-cadavid-hernan',\n    partyId: 'centro-democratico',\n    partyName: 'Centro Democrático',"),
    ("id: 'actor-lopez-sebastian',", "id: 'actor-lopez-sebastian',\n    partyId: 'centro-democratico',\n    partyName: 'Centro Democrático',"),

    ("id: 'actor-gutierrez-federico',", "id: 'actor-gutierrez-federico',\n    partyId: 'creemos',\n    partyName: 'Partido Político Creemos',"),
    ("id: 'actor-restrepo-daniel',", "id: 'actor-restrepo-daniel',\n    partyId: 'creemos',\n    partyName: 'Partido Político Creemos',"),
    ("id: 'actor-pineda-johnnatan',", "id: 'actor-pineda-johnnatan',\n    partyId: 'creemos',\n    partyName: 'Partido Político Creemos',"),

    ("id: 'actor-trujillo-carlos',", "id: 'actor-trujillo-carlos',\n    partyId: 'conservador',\n    partyName: 'Partido Conservador Colombiano',"),
    ("id: 'actor-suarez-oscar',", "id: 'actor-suarez-oscar',\n    partyId: 'conservador',\n    partyName: 'Partido Conservador Colombiano',"),
    ("id: 'actor-suarez-olga',", "id: 'actor-suarez-olga',\n    partyId: 'conservador',\n    partyName: 'Partido Conservador Colombiano',"),
    ("id: 'actor-soto-daniel',", "id: 'actor-soto-daniel',\n    partyId: 'conservador',\n    partyName: 'Partido Conservador Colombiano',"),
    ("id: 'actor-alonso-jaime',", "id: 'actor-alonso-jaime',\n    partyId: 'conservador',\n    partyName: 'Partido Conservador Colombiano',"),
    ("id: 'actor-gonzalez-lorena',", "id: 'actor-gonzalez-lorena',\n    partyId: 'conservador',\n    partyName: 'Partido Conservador Colombiano',"),
    ("id: 'actor-torres-diego',", "id: 'actor-torres-diego',\n    partyId: 'conservador',\n    partyName: 'Partido Conservador Colombiano',"),
    ("id: 'actor-gutierrez-carlos',", "id: 'actor-gutierrez-carlos',\n    partyId: 'conservador',\n    partyName: 'Partido Conservador Colombiano',"),
    ("id: 'actor-fernando-daniel',", "id: 'actor-fernando-daniel',\n    partyId: 'conservador',\n    partyName: 'Partido Conservador Colombiano',"),

    ("id: 'actor-londono-hector',", "id: 'actor-londono-hector',\n    partyId: 'liberal',\n    partyName: 'Partido Liberal Colombiano',"),
    ("id: 'actor-espinosa-braulio',", "id: 'actor-espinosa-braulio',\n    partyId: 'liberal',\n    partyName: 'Partido Liberal Colombiano',"),
    ("id: 'actor-cardona-raul',", "id: 'actor-cardona-raul',\n    partyId: 'liberal',\n    partyName: 'Partido Liberal Colombiano',"),
    ("id: 'actor-peinado-julian',", "id: 'actor-peinado-julian',\n    partyId: 'liberal',\n    partyName: 'Partido Liberal Colombiano',"),
    ("id: 'actor-bedoya-julian',", "id: 'actor-bedoya-julian',\n    partyId: 'liberal',\n    partyName: 'Partido Liberal Colombiano',"),
    ("id: 'actor-lopera-maria-eugenia',", "id: 'actor-lopera-maria-eugenia',\n    partyId: 'liberal',\n    partyName: 'Partido Liberal Colombiano',"),

    ("id: 'actor-quintero-daniel',", "id: 'actor-quintero-daniel',\n    partyId: 'pacto-historico',\n    partyName: 'Pacto Histórico / Independientes',"),
    ("id: 'actor-florez-alex',", "id: 'actor-florez-alex',\n    partyId: 'pacto-historico',\n    partyName: 'Pacto Histórico',"),
    ("id: 'actor-upegui-juan-carlos',", "id: 'actor-upegui-juan-carlos',\n    partyId: 'pacto-historico',\n    partyName: 'Pacto Histórico / Independientes',")
]

for old, new in replacements:
    if old in text:
        text = text.replace(old, new, 1)

# 2. Insert new concejales nodes before `export const GRAPH_EDGES_DATA`
edges_marker = 'export const GRAPH_EDGES_DATA: GraphEdgeRelation[] ='
idx_edges = text.find(edges_marker)
if idx_edges != -1:
    last_bracket_nodes = text.rfind('];', 0, idx_edges)
    text = text[:last_bracket_nodes] + ',\n' + new_concejales_nodes + '\n];\n\n' + text[idx_edges:]

# 3. Insert new concejales edges before `export const MASTER_POLITICAL_GRAPH`
master_marker = 'export const MASTER_POLITICAL_GRAPH: PoliticalGraphData ='
idx_master = text.find(master_marker)
if idx_master != -1:
    last_bracket_edges = text.rfind('];', 0, idx_master)
    text = text[:last_bracket_edges] + ',\n' + new_concejales_edges + '\n];\n\n' + text[idx_master:]

with open('src/data/politicalHouses/politicalHousesMasterData.ts', 'w', encoding='utf-8') as f:
    f.write(text)

print("politicalHousesMasterData.ts enriched successfully with concejales and edges by party!")

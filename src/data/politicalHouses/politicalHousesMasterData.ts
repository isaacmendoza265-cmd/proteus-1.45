/**
 * BASE DE DATOS MAESTRA DE CASAS POLÍTICAS Y REDES DE PODER
 * ÁREA METROPOLITANA DEL VALLE DE ABURRÁ Y ANTIOQUIA
 * Proyecto Proteus - Protocolo PA-009
 */

import { PoliticalGraphData, PoliticalHouse, GraphNodeActor, GraphEdgeRelation } from './types';

export const POLITICAL_HOUSES_DATA: PoliticalHouse[] = [
  {
    id: 'casa-trujillo',
    name: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    leader: 'Carlos Andrés Trujillo González (Senador)',
    color: '#0284c7', // Azul conservador moderno
    secondaryColor: '#38bdf8',
    headquarters: 'Itagüí',
    municipalitiesUnderInfluence: ['Itagüí', 'La Estrella', 'Caldas', 'Sabaneta', 'Envigado', 'Apartadó', 'Guarne'],
    totalVotes2023: 215400,
    dominantParties: ['Partido Conservador Colombiano', 'Coaliciones locales'],
    coreIdeology: 'Conservatismo pragmático / Maquinaria territorial transaccional',
    description: 'La estructura electoral más disciplinada y hegemónica del sur del Valle de Aburrá. Ostenta el control absoluto de la Alcaldía y Concejo de Itagüí desde hace más de 12 años, con extensión directa sobre La Estrella y Caldas. Trujillo fue el senador conservador más votado de Colombia (159.810 votos en 2022).',
    dialecticalSummary: {
      thesis: 'Gobernanza con estabilidad administrativa, alta inversión en seguridad ciudadana y programas sociales locales en Itagüí.',
      antithesis: 'Control absoluto del presupuesto municipal, nómina paralela de contratistas forzados a endosar votos, y tensiones en el Partido Conservador nacional por sus acercamientos al Gobierno Nacional.',
      synthesis: 'Poder extramunicipal decisivo en el Senado que garantiza cupos presupuestales a cambio de lealtad electoral cerrada en el sur metropolitano.'
    },
    keyInstitutionsControlled: ['Alcaldía de Itagüí', 'Concejo de Itagüí', 'Hospital San Rafael de Itagüí', 'Adelí (Agencia de Desarrollo Local)']
  },
  {
    id: 'casa-suarez-mira',
    name: 'Casa Suárez Mira (Feudo Bellanita)',
    leader: 'Óscar Suárez Mira & Olga Suárez Mira',
    color: '#1d4ed8', // Azul profundo conservador
    secondaryColor: '#60a5fa',
    headquarters: 'Bello',
    municipalitiesUnderInfluence: ['Bello', 'Copacabana', 'Girardota', 'Barbosa', 'San Jerónimo'],
    totalVotes2023: 135800,
    dominantParties: ['Partido Conservador', 'Centro Democrático', 'Bello Nos Une'],
    coreIdeology: 'Conservatismo tradicional / Feudo del norte metropolitano',
    description: 'Estructura política que ha gobernado el municipio de Bello durante casi tres décadas. Pese a fallos judiciales contra sus fundadores, conservan el control de la Alcaldía de Bello con Lorena González (2024-2027) y una sólida bancada en el Concejo Municipal.',
    dialecticalSummary: {
      thesis: 'Arraigo popular en comunas de ladera, continuidad institucional en obras públicas y presencia comunitaria permanente.',
      antithesis: 'Severo desgaste por cuestionamientos judiciales del patriarca Óscar Suárez Mira y una oposición creciente liderada por sectores liberales y alternativos.',
      synthesis: 'Supervivencia política mediante coaliciones amplias (Bello Nos Une) y pactos de gobernabilidad con el Centro Democrático y Cambio Radical.'
    },
    keyInstitutionsControlled: ['Alcaldía de Bello', 'Concejo de Bello', 'Bello Aseo', 'E.S.E. Hospital Rosalpi']
  },
  {
    id: 'casa-envigado-londono',
    name: 'Casa Héctor Londoño / Liberales de Envigado',
    leader: 'Héctor Londoño Restrepo & Braulio Espinosa Márquez',
    color: '#dc2626', // Rojo liberal intenso
    secondaryColor: '#f87171',
    headquarters: 'Envigado',
    municipalitiesUnderInfluence: ['Envigado', 'Sabaneta', 'El Retiro'],
    totalVotes2023: 88500,
    dominantParties: ['Partido Liberal Colombiano'],
    coreIdeology: 'Socialdemocracia institucional / Modelo de bienestar envigadeño',
    description: 'La hegemonía monocolor más longeva del país. El Partido Liberal ha gobernado Envigado ininterrumpidamente desde 1976. Liderada por el cuatro veces alcalde Héctor Londoño, el exalcalde Braulio Espinosa y el actual mandatario Raúl Cardona.',
    dialecticalSummary: {
      thesis: 'Excelente calidad de vida (el municipio con menor NBI de Colombia), urbanismo impecable y alta satisfacción ciudadana que legitima la reelección sucesiva.',
      antithesis: 'Cierre hermético del acceso al poder para partidos no liberales y concentración de la contratación pública en clanes familiares locales.',
      synthesis: 'Unidad monolítica local que proyecta el liderazgo de Braulio Espinosa hacia el Senado de la República y la Gobernación de Antioquia en 2026-2027.'
    },
    keyInstitutionsControlled: ['Alcaldía de Envigado', 'Concejo de Envigado', 'Enviaseo', 'Hospital Manuel Uribe Ángel']
  },
  {
    id: 'casa-creemos-fico',
    name: 'Casa Creemos (Federico Gutiérrez)',
    leader: 'Federico Andrés Gutiérrez Zuluaga (Alcalde de Medellín)',
    color: '#84cc16', // Verde lima Creemos
    secondaryColor: '#bef264',
    headquarters: 'Medellín',
    municipalitiesUnderInfluence: ['Medellín', 'Copacabana', 'Sabaneta', 'Envigado', 'Caldas', 'Rionegro'],
    totalVotes2023: 785000,
    dominantParties: ['Partido Político Creemos'],
    coreIdeology: 'Centroderecha cívica / Seguridad y confianza inversionista',
    description: 'Fuerza hegemónica emergente en el Valle de Aburrá. Tras la aplastante victoria de Federico Gutiérrez a la Alcaldía de Medellín (697.910 votos), Creemos obtuvo 8 concejales en Medellín, 5 diputados en Antioquia y la Alcaldía de Copacabana con Johnnatan Pineda.',
    dialecticalSummary: {
      thesis: 'Mandato de restauración institucional tras la administración Quintero, defensa de EPM y reactivación económica del empresariado.',
      antithesis: 'Hipercentralización en la figura personal de Federico Gutiérrez y el reto de cohesionar bancadas de concejales y diputados jóvenes con poca trayectoria orgánica.',
      synthesis: 'Plataforma con aspiración de consolidarse como partido nacional y bancada mayoritaria en el Congreso de la República para las elecciones legislativas 2026.'
    },
    keyInstitutionsControlled: ['Alcaldía de Medellín', 'EPM (Empresas Públicas de Medellín)', 'Ruta N', 'Alcaldía de Copacabana']
  },
  {
    id: 'casa-cd-oriente-rendon',
    name: 'Casa Centro Democrático / Paico - Uribe - Rendón',
    leader: 'Álvaro Uribe Vélez, Fabio Valencia Cossio & Andrés Julián Rendón',
    color: '#0369a1', // Azul Uribe
    secondaryColor: '#38bdf8',
    headquarters: 'Rionegro / Medellín',
    municipalitiesUnderInfluence: ['Rionegro', 'Medellín', 'Marinilla', 'El Carmen de Viboral', 'La Ceja', 'Caucasia', 'Santa Fe de Antioquia'],
    totalVotes2023: 980000,
    dominantParties: ['Partido Centro Democrático', 'Coalición Por Antioquia Firme'],
    coreIdeology: 'Uribismo puro / Seguridad Democrática, Cohesión Social y Estado Comunitario',
    description: 'Estructura departamental mayoritaria que ostenta la Gobernación de Antioquia con Andrés Julián Rendón (944.859 votos) y la vocería nacional del expresidente Álvaro Uribe. Su epicentro de poder municipal radica en el Oriente Antioqueño (Rionegro).',
    dialecticalSummary: {
      thesis: 'Defensa de las regiones frente al centralismo de Bogotá, autonomía fiscal para Antioquia, orden público y lucha frontal contra grupos armados.',
      antithesis: 'Disputas internas por avales en Medellín y tensiones entre el ala radical de oposición y sectores pragmáticos de la gobernación.',
      synthesis: 'Fuerza rectora de la política departamental que busca articular las cámaras de comercio y el empresariado antioqueño en un bloque anti-Petro en 2026.'
    },
    keyInstitutionsControlled: ['Gobernación de Antioquia', 'IDEA (Instituto para el Desarrollo de Antioquia)', 'Fábrica de Licores de Antioquia (FLA)', 'Alcaldía de Rionegro']
  },
  {
    id: 'casa-bedoya-renovacion',
    name: 'Casa Julián Bedoya / Renovación Liberal',
    leader: 'Julián Bedoya Pulgarín & María Eugenia Lopera',
    color: '#b91c1c', // Rojo bermellón
    secondaryColor: '#fca5a5',
    headquarters: 'Bello / Medellín',
    municipalitiesUnderInfluence: ['Bello', 'Medellín', 'La Estrella', 'Yarumal', 'Caucasia', 'Apartadó'],
    totalVotes2023: 168000,
    dominantParties: ['Partido Liberal Colombiano'],
    coreIdeology: 'Liberalismo transaccional / Operación burocrática y congresional',
    description: 'Red política de alto calibre legislativo liderada por el exsenador Julián Bedoya, la Representante a la Cámara María Eugenia Lopera y el Senador Juan Diego Echavarría. Su característica primordial es el pragmatismo burocrático y su peso en las comisiones de salud y presupuesto en Bogotá.',
    dialecticalSummary: {
      thesis: 'Capacidad comprobada de canalización de recursos del Presupuesto General de la Nación para municipios intermedios y periféricos.',
      antithesis: 'Constantes controversias públicas y acusaciones de transaccionalismo con el Gobierno Nacional a cambio de cuotas en el Fondo Nacional del Ahorro y ministerios.',
      synthesis: 'Poder bisagra fundamental en el Congreso de la República con estructura de alcaldes y concejales dependientes de transferencias nacionales.'
    },
    keyInstitutionsControlled: ['Cuotas en entidades nacionales', 'Bancadas en Concejos municipales del norte y Bajo Cauca']
  },
  {
    id: 'casa-independientes-quintero',
    name: 'Casa Daniel Quintero / Independientes',
    leader: 'Daniel Quintero Calle & Juan Carlos Upegui',
    color: '#8b5cf6', // Violeta Independientes
    secondaryColor: '#c4b5fd',
    headquarters: 'Medellín',
    municipalitiesUnderInfluence: ['Medellín', 'Bello', 'Itagüí'],
    totalVotes2023: 175000,
    dominantParties: ['Partido Político Independientes', 'Pacto Histórico'],
    coreIdeology: 'Populismo progresista urbano / Discurso anti-GEA',
    description: 'Movimiento político que gobernó Medellín (2020-2023) enfrentado al empresariado tradicional. Conserva la curul de oposición en el Concejo de Medellín (obtenida por Juan Carlos Upegui) y cuadros en el Gobierno Nacional.',
    dialecticalSummary: {
      thesis: 'Ruptura con las élites tradicionales, apoyo masivo en comunas periféricas (Comuna 1, 2 y 3) y banderas tecnológicas.',
      antithesis: 'Graves investigaciones disciplinarias y fiscales por presunta corrupción en la administración municipal y polarización extrema.',
      synthesis: 'Estructura en resistencia que busca capitalizar el voto de izquierda y alternativo en el Valle de Aburrá para la consulta del Pacto Histórico 2026.'
    },
    keyInstitutionsControlled: ['Curul de Estatuto de Oposición en Concejo de Medellín', 'Cuotas en entidades del Gobierno Petro']
  },
  {
    id: 'casa-prieto-institucional',
    name: 'Casa Eugenio Prieto / Liberalismo Institucional',
    leader: 'Eugenio Prieto Soto (Secretario de Hacienda de Antioquia)',
    color: '#f59e0b', // Ámbar liberal
    secondaryColor: '#fcd34d',
    headquarters: 'Medellín / AMVA',
    municipalitiesUnderInfluence: ['Medellín', 'Envigado', 'La Ceja', 'Rionegro'],
    totalVotes2023: 125000,
    dominantParties: ['Partido Liberal / Coalición Una Antioquia Viva'],
    coreIdeology: 'Liberalismo técnico / Planificación metropolitana',
    description: 'Liderada por el exdirector del Área Metropolitana del Valle de Aburrá y exsenador Eugenio Prieto Soto. Es el puente técnico y financiero entre la Gobernación de Rendón y sectores liberales tradicionales.',
    dialecticalSummary: {
      thesis: 'Enfoque en descentralización fiscal, gerencia pública técnica e integración metropolitana de infraestructura.',
      antithesis: 'Dificultad para mantener una base electoral propia masiva sin depender de acuerdos institucionales de gobierno.',
      synthesis: 'Articulador de la gestión financiera departamental y pieza clave en la conformación de listas mixtas al Congreso 2026.'
    },
    keyInstitutionsControlled: ['Secretaría de Hacienda de Antioquia', 'Dirección del IDEA']
  },
  {
    id: 'casa-roldan-norte',
    name: 'Casa John Jairo Roldán / Liberales del Norte',
    leader: 'John Jairo Roldán Avendaño (Senador)',
    color: '#e11d48', // Carmín
    secondaryColor: '#fda4af',
    headquarters: 'Yarumal / Bello',
    municipalitiesUnderInfluence: ['Yarumal', 'Bello', 'Medellín', 'Santa Rosa de Osos'],
    totalVotes2023: 94000,
    dominantParties: ['Partido Liberal Colombiano'],
    coreIdeology: 'Liberalismo de base municipal y parlamentaria',
    description: 'Estructura orientada por el senador John Jairo Roldán, con origen en el Norte de Antioquia (exalcalde de Yarumal) y arraigo en Bello. Cuenta con curules propias en el Concejo de Medellín y el Concejo de Bello.',
    dialecticalSummary: {
      thesis: 'Defensa de las vías campesinas y conectividad en subregiones del Norte y Bajo Cauca.',
      antithesis: 'Rivalidad histórica en Bello con la Casa Suárez Mira y disputa de votos liberales con Julián Bedoya.',
      synthesis: 'Curul estable en el Senado con capacidad de disputar concejos y asamblea de manera autónoma.'
    },
    keyInstitutionsControlled: ['Concejo de Medellín (Curul Farley Macías)', 'Concejo de Bello']
  },
  {
    id: 'casa-blanco-conservadora',
    name: 'Casa Germán Blanco / Conservatismo Institucional',
    leader: 'Germán Alcides Blanco Álvarez (Senador)',
    color: '#0284c7',
    secondaryColor: '#bae6fd',
    headquarters: 'Támesis / Suroeste',
    municipalitiesUnderInfluence: ['Támesis', 'Jericó', 'Medellín', 'Concordia'],
    totalVotes2023: 88200,
    dominantParties: ['Partido Conservador Colombiano'],
    coreIdeology: 'Conservatismo institucional / Representación regional',
    description: 'Orientada por el expresidente de la Cámara y actual Senador Germán Blanco. Representa el contrapeso conservador institucional a Carlos Andrés Trujillo en Antioquia.',
    dialecticalSummary: {
      thesis: 'Liderazgo legislativo riguroso, institucionalidad y representación del suroeste cafetero.',
      antithesis: 'Menor volumen de contratación municipal en comparación con el aparato de Itagüí.',
      synthesis: 'Voz conservadora de prestigio en el Congreso con presencia en la Asamblea de Antioquia.'
    },
    keyInstitutionsControlled: ['Curul en Senado de la República', 'Asamblea de Antioquia (Jorge Jiménez)']
  }
];

export const GRAPH_NODES_DATA: GraphNodeActor[] = [
  // ==========================================
  // CASA TRUJILLO (ITAGÜÍ)
  // ==========================================
  {
    id: 'actor-trujillo-carlos',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    name: 'Carlos Andrés Trujillo González',
    alias: 'El Barón de Itagüí',
    role: 'senador',
    roleLabel: 'Senador de la República (Partido Conservador)',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 1,
    sphere: 'extramunicipal',
    municipality: 'Itagüí',
    department: 'Antioquia',
    votes2023: 159810,
    cedula: '71.229.458',
    status: 'En funciones (Senador 2022-2026)',
    bio: 'Exalcalde de Itagüí (2012-2015), exrepresentante a la Cámara y actual Senador. El líder con la maquinaria electoral más disciplinada de Antioquia. Fue presidente del Partido Conservador y es el interlocutor primordial del sur metropolitano en Bogotá.',
    extramunicipalConnection: 'Miembro de la Comisión Primera del Senado. Gestión directa de partidas presupuestales y articulación con entidades del orden nacional.',
    municipalAnchor: 'Control total de la administración de Itagüí, contratación municipal y coalición hegemónica en Caldas y La Estrella.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/SenadorTrujillo',
      facebook: 'https://facebook.com/CarlosAndresTrujilloG',
      instagram: 'https://instagram.com/carlosandrestrujillog',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'El poder electoral de Carlos Andrés Trujillo en Antioquia',
        source: 'La Silla Vacía',
        snippet: 'Trujillo consolidó su hegemonía en el sur del Valle de Aburrá al ganar de nuevo la Alcaldía de Itagüí.',
        year: 2023,
        sentiment: 'neutro'
      },
      {
        title: 'La maquinaria conservadora que manda en Itagüí',
        source: 'El Colombiano',
        snippet: 'Equipo de Antioquia revalida su dominio territorial con Diego Torres.',
        year: 2023,
        sentiment: 'positivo'
      }
    ],
    dialecticalNotes: 'Tensión constante entre su lealtad partidista conservadora y su pragmatismo legislativo con las reformas del Gobierno Nacional.'
  },
  {
    id: 'actor-restrepo-daniel',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    name: 'Daniel Restrepo Carmona',
    role: 'representante',
    roleLabel: 'Representante a la Cámara por Antioquia',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 2,
    sphere: 'extramunicipal',
    municipality: 'Itagüí',
    department: 'Antioquia',
    votes2023: 78540,
    status: 'En funciones (Cámara 2022-2026)',
    bio: 'Fórmula directa de Carlos Andrés Trujillo a la Cámara de Representantes. Exconcejal de Itagüí y exdiputado. Defiende la agenda legislativa de la casa en el Capitolio Nacional.',
    extramunicipalConnection: 'Comisión Cuarta de la Cámara (Presupuesto). Clave en la asignación de recursos para obras metropolitanas.',
    municipalAnchor: 'Estructuras de base en Itagüí y municipios aliados de Urabá y Oriente.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/DanielRestrepoC',
      facebook: 'https://facebook.com/DanielRestrepoCarmona',
      instagram: 'https://instagram.com/danielrestrepocarmona',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Daniel Restrepo y el control presupuestal conservador',
        source: 'El Espectador',
        snippet: 'El representante itagüiseño lidera debates de transferencias regionales.',
        year: 2024,
        sentiment: 'neutro'
      }
    ]
  },
  {
    id: 'actor-torres-diego',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    name: 'Diego León Torres Sánchez',
    role: 'alcalde',
    roleLabel: 'Alcalde de Itagüí (2024-2027)',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Itagüí',
    department: 'Antioquia',
    votes2023: 65480,
    status: 'En funciones (Alcalde)',
    bio: 'Abogado y exfiscal. Exsecretario de Seguridad de Itagüí. Electo alcalde con el respaldo absoluto de Carlos Andrés Trujillo y la coalición Itagüí Somos Todos.',
    extramunicipalConnection: 'Coordinación con el Ministerio del Interior y Policía Nacional para convenios de seguridad.',
    municipalAnchor: 'Ejecutor del Plan de Desarrollo de Itagüí y ordenador del gasto municipal.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/DiegoTorresItag',
      facebook: 'https://facebook.com/DiegoTorresAlcalde',
      instagram: 'https://instagram.com/diegotorresitagui',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Diego Torres asume la Alcaldía de Itagüí con foco en seguridad',
        source: 'El Colombiano',
        snippet: 'El mandatario promete mantener a Itagüí como modelo de contención criminal.',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-cano-jaime',
    name: 'Jaime Alonso Cano Martínez',
    role: 'diputado',
    roleLabel: 'Diputado de la Asamblea de Antioquia',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 3,
    sphere: 'extramunicipal',
    municipality: 'Itagüí',
    department: 'Antioquia',
    votes2023: 42100,
    status: 'En funciones (Asamblea)',
    bio: 'Exconcejal de Itagüí y veterano diputado conservador. Representa la voz y el poder del Equipo de Antioquia ante la Gobernación.',
    extramunicipalConnection: 'Comisión de Presupuesto y Hacienda de la Asamblea Departamental.',
    municipalAnchor: 'Articulación de diputados con los concejales del sur metropolitano.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/JaimeCanoAsamblea',
      verifiedOfficial: false
    },
    newsLinks: []
  },
  {
    id: 'actor-vallejo-mario',
    name: 'Carlos Mario Morales',
    role: 'alcalde',
    roleLabel: 'Líder Político / Exalcalde de La Estrella',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 4,
    sphere: 'municipal',
    municipality: 'La Estrella',
    department: 'Antioquia',
    votes2023: 21500,
    status: 'Aliado Territorial',
    bio: 'Cuadro político fundamental para mantener la conurbación sur bajo la influencia de Trujillo.',
    extramunicipalConnection: 'Articulación con el Área Metropolitana del Valle de Aburrá.',
    municipalAnchor: 'Concejo y juntas comunales de La Estrella.',
    socialProfiles: {},
    newsLinks: []
  },

  // ==========================================
  // CASA SUÁREZ MIRA (BELLO)
  // ==========================================
  {
    id: 'actor-suarez-oscar',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    name: 'Óscar de Jesús Suárez Mira',
    alias: 'El Patriarca de Bello',
    role: 'patriarca',
    roleLabel: 'Líder Histórico y Fundador de la Casa Suárez Mira',
    houseId: 'casa-suarez-mira',
    houseName: 'Casa Suárez Mira (Feudo Bellanita)',
    level: 1,
    sphere: 'mixto',
    municipality: 'Bello',
    department: 'Antioquia',
    status: 'Líder en la sombra / Inhabilitado judicialmente',
    bio: 'Exalcalde de Bello (1995-1997), exrepresentante y exsenador. Considerado el arquitecto de la maquinaria política de Bello que ha vencido en casi todas las elecciones locales desde 1995.',
    extramunicipalConnection: 'Red histórica de relaciones en Bogotá y directorios conservadores nacionales.',
    municipalAnchor: 'Fidelidad de bases comunales, líderes barriales y operadores electorales de Bello.',
    socialProfiles: {
      xTwitter: null,
      facebook: null
    },
    newsLinks: [
      {
        title: 'El clan Suárez Mira y su resistencia política en Bello',
        source: 'La Silla Vacía',
        snippet: 'A pesar de condenas, el apellido Suárez Mira sigue definiendo quién manda en Bello.',
        year: 2023,
        sentiment: 'critico'
      }
    ],
    dialecticalNotes: 'Pese a no poder ostentar cargos públicos por fallos de la Corte Suprema, las decisiones de avales y candidaturas se consultan en su despacho.'
  },
  {
    id: 'actor-suarez-olga',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    name: 'Olga Lucía Suárez Mira',
    role: 'senadora',
    roleLabel: 'Exsenadora de la República / Jefa Política Activa',
    houseId: 'casa-suarez-mira',
    houseName: 'Casa Suárez Mira (Feudo Bellanita)',
    level: 2,
    sphere: 'extramunicipal',
    municipality: 'Bello',
    department: 'Antioquia',
    status: 'Dirigente Política Activa',
    bio: 'Exalcaldesa de Bello (2004-2007) y exsenadora del Partido Conservador. Ha sido la cara visible de la familia ante el Congreso y la política nacional.',
    extramunicipalConnection: 'Relaciones con la bancada conservadora nacional y dirigentes del Centro Democrático.',
    municipalAnchor: 'Estructuras parroquiales, comités de mujeres y clubes de adultos mayores en Bello.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/OlgaSuarezMira',
      facebook: 'https://facebook.com/OlgaSuarezMiraOficial'
    },
    newsLinks: [
      {
        title: 'Olga Suárez Mira lidera el acuerdo de coalición en Bello',
        source: 'El Colombiano',
        snippet: 'La exsenadora logró unir a conservadores y liberales detrás de Lorena González.',
        year: 2023,
        sentiment: 'neutro'
      }
    ]
  },
  {
    id: 'actor-gonzalez-lorena',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    name: 'Yulieth Lorena González Ospina',
    role: 'alcaldesa',
    roleLabel: 'Alcaldesa de Bello (2024-2027)',
    houseId: 'casa-suarez-mira',
    houseName: 'Casa Suárez Mira (Feudo Bellanita)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Bello',
    department: 'Antioquia',
    votes2023: 65120,
    status: 'En funciones (Alcaldesa)',
    bio: 'Exconcejala y exsecretaria del Adulto Mayor de Bello. Venció en las elecciones 2023 con la coalición Bello Nos Une, garantizando la continuidad de la casa conservadora.',
    extramunicipalConnection: 'Articulación con la Gobernación de Antioquia y el Área Metropolitana.',
    municipalAnchor: 'Alcaldía de Bello, secretarías de despacho y contratación pública local.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/LorenaGonzalezB',
      facebook: 'https://facebook.com/LorenaGonzalezAlcaldesa',
      instagram: 'https://instagram.com/lorenagonzalezbello',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Lorena González triunfa en Bello con la coalición oficialista',
        source: 'Caracol Radio',
        snippet: 'La candidata de la administración saliente supera a los candidatos de oposición.',
        year: 2023,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-morales-daniel',
    name: 'Daniel Fernando Villa Morales',
    role: 'concejal',
    roleLabel: 'Concejal de Bello (Partido Conservador)',
    houseId: 'casa-suarez-mira',
    houseName: 'Casa Suárez Mira (Feudo Bellanita)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Bello',
    department: 'Antioquia',
    votes2023: 3890,
    status: 'En funciones (Concejal)',
    bio: 'Cuadro joven de la bancada mayoritaria en el Concejo de Bello, garantizador de mayorías para los proyectos de acuerdo de la Alcaldesa.',
    extramunicipalConnection: 'Enlace con directores conservadores de juventudes.',
    municipalAnchor: 'Comuna 4 y 6 de Bello.',
    socialProfiles: {},
    newsLinks: []
  },

  // ==========================================
  // CASA LIBERALES DE ENVIGADO (HÉCTOR LONDOÑO)
  // ==========================================
  {
    id: 'actor-londono-hector',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    name: 'Héctor de Jesús Londoño Restrepo',
    alias: 'El Cacique de Envigado',
    role: 'patriarca',
    roleLabel: 'Líder Histórico / Cuatro Veces Alcalde de Envigado',
    houseId: 'casa-envigado-londono',
    houseName: 'Casa Héctor Londoño / Liberales de Envigado',
    level: 1,
    sphere: 'municipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    status: 'Líder Natural y Mentor Político',
    bio: 'Ha ejercido la Alcaldía de Envigado en 4 periodos distintos (1995-1997, 2001-2003, 2008-2011, 2012-2015). Artífice del modelo de servicios públicos y finanzas de Envigado.',
    extramunicipalConnection: 'Interlocución con la Dirección Nacional Liberal (César Gaviria).',
    municipalAnchor: 'Lealtad irrestricta de las juntas de acción comunal y directivos del sector salud y educación en Envigado.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/HectorLondonoR'
    },
    newsLinks: [
      {
        title: 'El secreto del liberalismo para no soltar a Envigado en casi 50 años',
        source: 'La Silla Vacía',
        snippet: 'Héctor Londoño ha sabido consolidar un modelo que combina gestión impecable con cierre de espacios políticos.',
        year: 2023,
        sentiment: 'neutro'
      }
    ]
  },
  {
    id: 'actor-espinosa-braulio',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    name: 'Braulio Alonso Espinosa Márquez',
    role: 'lider_politico',
    roleLabel: 'Exalcalde de Envigado (2020-2023) / Precandidato Senado',
    houseId: 'casa-envigado-londono',
    houseName: 'Casa Héctor Londoño / Liberales de Envigado',
    level: 2,
    sphere: 'mixto',
    municipality: 'Envigado',
    department: 'Antioquia',
    status: 'Proyección Nacional 2026',
    bio: 'Exdiputado de Antioquia y exalcalde de Envigado con una de las más altas calificaciones de gestión del país. Lidera la renovación generacional del liberalismo envigadeño con miras al Congreso 2026.',
    extramunicipalConnection: 'Articulación con alcaldes del Valle de Aburrá y Oriente para conformar una lista propia al Senado de la República.',
    municipalAnchor: 'Altísima favorabilidad ciudadana en Envigado y respaldo del empresariado local.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/BraulioEspinosa',
      facebook: 'https://facebook.com/BraulioEspinosaMarquez',
      instagram: 'https://instagram.com/braulioespinosam',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Braulio Espinosa se posiciona como una de las cartas liberales fuertes para 2026',
        source: 'Semana',
        snippet: 'El exmandatario de Envigado alista su salto a la arena nacional tras dejar una gestión récord.',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-cardona-raul',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    name: 'Raúl Eduardo Cardona González',
    role: 'alcalde',
    roleLabel: 'Alcalde de Envigado (2024-2027)',
    houseId: 'casa-envigado-londono',
    houseName: 'Casa Héctor Londoño / Liberales de Envigado',
    level: 4,
    sphere: 'municipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    votes2023: 45720,
    status: 'En funciones (Alcalde)',
    bio: 'Ingeniero civil, exsecretario de Obras Públicas y alcalde por segunda ocasión (ya lo había sido en 2016-2018). Ratifica la continuidad del Partido Liberal.',
    extramunicipalConnection: 'Convenios con el AMVA para megaproyectos viales y Metroplús.',
    municipalAnchor: 'Presupuesto y ejecución de infraestructura en Envigado.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/RaulCardonaEnv',
      facebook: 'https://facebook.com/RaulCardonaAlcalde',
      instagram: 'https://instagram.com/raulcardonaenvigado',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Raúl Cardona regresa a la Alcaldía de Envigado con amplio respaldo',
        source: 'El Colombiano',
        snippet: 'La maquinaria liberal gana con holgura frente a los candidatos de oposición.',
        year: 2023,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-peinado-julian',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    name: 'Julián Peinado Ramírez',
    role: 'representante',
    roleLabel: 'Representante a la Cámara por Antioquia',
    houseId: 'casa-envigado-londono',
    houseName: 'Casa Héctor Londoño / Liberales de Envigado',
    level: 2,
    sphere: 'extramunicipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    votes2023: 63200,
    status: 'En funciones (Cámara 2022-2026)',
    bio: 'Exconcejal de Envigado. Es el vocero y operador legislativo del liberalismo de Envigado en la Comisión Primera de la Cámara de Representantes.',
    extramunicipalConnection: 'Comisión Primera de la Cámara. Debates de reformas constitucionales y justicia.',
    municipalAnchor: 'Votación masiva en Envigado y Sabaneta.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/JulianPeinadoR',
      instagram: 'https://instagram.com/julianpeinador',
      verifiedOfficial: true
    },
    newsLinks: []
  },

  // ==========================================
  // CASA CREEMOS (FEDERICO GUTIÉRREZ)
  // ==========================================
  {
    id: 'actor-gutierrez-federico',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    name: 'Federico Andrés Gutiérrez Zuluaga',
    alias: 'Fico',
    role: 'alcalde',
    roleLabel: 'Alcalde de Medellín (2024-2027) / Presidente de Creemos',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 1,
    sphere: 'mixto',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 697910,
    cedula: '71.745.892',
    status: 'En funciones (Alcalde)',
    bio: 'Ingeniero civil, exconcejal (2004-2011), alcalde de Medellín en dos mandatos (2016-2019 y 2024-2027), excandidato presidencial en 2022 (más de 5 millones de votos). Máxima figura de la oposición nacional al gobierno de Gustavo Petro.',
    extramunicipalConnection: 'Liderazgo nacional de Creemos, interlocución con gremios económicos (ANDI, Proantioquia) y bancadas del Congreso.',
    municipalAnchor: 'Alcaldía de Medellín, presupuesto de 8 billones de pesos, control de EPM y coalición de 16 concejales.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/FicoGutierrez',
      facebook: 'https://facebook.com/FicoGutierrez',
      instagram: 'https://instagram.com/ficogutierrez',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Fico Gutiérrez arrasa en Medellín y consolida a Creemos como partido',
        source: 'El Tiempo',
        snippet: 'Con más del 73% de los votos, Gutiérrez obtiene la victoria más contundente de la historia de la ciudad.',
        year: 2023,
        sentiment: 'positivo'
      }
    ],
    dialecticalNotes: 'Su desafío es no desgastarse en la confrontación con Petro mientras administra una ciudad con enormes retos de infraestructura y seguridad.'
  },
  {
    id: 'actor-pineda-johnnatan',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    name: 'Johnnatan Andrés Pineda Agudelo',
    role: 'alcalde',
    roleLabel: 'Alcalde de Copacabana (2024-2027)',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Copacabana',
    department: 'Antioquia',
    votes2023: 13421,
    status: 'En funciones (Alcalde)',
    bio: 'Electo por Creemos en Copacabana, rompiendo la hegemonía tradicional del Partido Conservador en el norte.',
    extramunicipalConnection: 'Sinergia directa con Medellín en temas de movilidad por la Autopista Norte.',
    municipalAnchor: 'Alcaldía de Copacabana.',
    socialProfiles: {
      instagram: 'https://instagram.com/johnnatanpineda'
    },
    newsLinks: []
  },

  // ==========================================
  // CASA CENTRO DEMOCRÁTICO (ORIENTE / RENDÓN / URIBE)
  // ==========================================
  {
    id: 'actor-uribe-alvaro',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    name: 'Álvaro Uribe Vélez',
    alias: 'El Expresidente',
    role: 'patriarca',
    roleLabel: 'Fundador y Líder Natural del Centro Democrático',
    houseId: 'casa-cd-oriente-rendon',
    houseName: 'Casa Centro Democrático / Paico - Uribe - Rendón',
    level: 1,
    sphere: 'extramunicipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    status: 'Líder Natural Nacional',
    bio: 'Expresidente de la República (2002-2010), exgobernador de Antioquia (1995-1997) y exsenador. La figura más influyente de la política colombiana de los últimos 30 años. Reside en Rionegro.',
    extramunicipalConnection: 'Dirección nacional del Centro Democrático y relaciones internacionales.',
    municipalAnchor: 'Fidelidad doctrinaria masiva en municipios del Oriente, Suroeste y Norte de Antioquia.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/AlvaroUribeVel',
      facebook: 'https://facebook.com/AlvaroUribeV',
      instagram: 'https://instagram.com/alvarouribevelez',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Álvaro Uribe y el mapa de poder que recuperó el Centro Democrático en Antioquia',
        source: 'La Silla Vacía',
        snippet: 'La victoria de Rendón en la Gobernación devolvió al uribismo el control del departamento.',
        year: 2023,
        sentiment: 'neutro'
      }
    ]
  },
  {
    id: 'actor-rendon-andres-julian',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    name: 'Andrés Julián Rendón Cardona',
    role: 'gobernador',
    roleLabel: 'Gobernador de Antioquia (2024-2027)',
    houseId: 'casa-cd-oriente-rendon',
    houseName: 'Casa Centro Democrático / Paico - Uribe - Rendón',
    level: 2,
    sphere: 'extramunicipal',
    municipality: 'Rionegro',
    department: 'Antioquia',
    votes2023: 944859,
    status: 'En funciones (Gobernador)',
    bio: 'Economista de EAFIT, exalcalde de Rionegro (2016-2019) y exsecretario de Gobierno de Antioquia. Ganó la Gobernación con la coalición Por Antioquia Firme con un discurso de orden y austeridad.',
    extramunicipalConnection: 'Lidera la iniciativa de Referendo por la Autonomía Fiscal para los Departamentos.',
    municipalAnchor: 'Gobernación de Antioquia, red de hospitales departamentales y vías 4G.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/AndresJRendonC',
      facebook: 'https://facebook.com/AndresJulianRendonC',
      instagram: 'https://instagram.com/andresjulianrendonc',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Andrés Julián Rendón y su cruzada por la autonomía fiscal de las regiones',
        source: 'Semana',
        snippet: 'El gobernador antioqueño lidera a los mandatarios seccionales frente a la Casa de Nariño.',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-quintero-esteban',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    name: 'Esteban Quintero Cardona',
    role: 'senador',
    roleLabel: 'Senador de la República (Centro Democrático)',
    houseId: 'casa-cd-oriente-rendon',
    houseName: 'Casa Centro Democrático / Paico - Uribe - Rendón',
    level: 2,
    sphere: 'extramunicipal',
    municipality: 'Rionegro',
    department: 'Antioquia',
    votes2023: 69400,
    status: 'En funciones (Senador)',
    bio: 'Abogado, exdiputado y exrepresentante a la Cámara. Hijo del líder histórico Rubén Darío Quintero. Es el congresista de cabecera del Oriente Antioqueño.',
    extramunicipalConnection: 'Comisión Sexta del Senado (Transporte, Comunicaciones, Obras Públicas).',
    municipalAnchor: 'Base electoral en Rionegro, Marinilla, La Ceja y El Carmen de Viboral.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/EstebanQuintero',
      instagram: 'https://instagram.com/estebanquinteroc'
    },
    newsLinks: []
  },
  {
    id: 'actor-lopez-sebastian',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    name: 'Sebastián López Valencia',
    role: 'concejal',
    roleLabel: 'Exconcejal de Medellín (Renunció 2026) / Jefatura Campaña Presidencial',
    houseId: 'casa-cd-oriente-rendon',
    houseName: 'Casa Centro Democrático / Paico - Uribe - Rendón',
    level: 4,
    sphere: 'extramunicipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 42444,
    cedula: '98.764.731',
    status: 'Renunció al Concejo (Mayo 2026) - Jefatura Campaña Paloma Valencia / Harvard / Proyección Alcaldía 2027',
    bio: 'Sobrino de Fabio Valencia Cossio. Fue el concejal más votado del Centro Democrático en Medellín en 2023 (42.444 votos). Renunció a su curul en mayo de 2026 para coordinar el debate nacional de Paloma Valencia a la Presidencia, realizar estudios de posgrado en Harvard y preparar su precandidatura a la Alcaldía de Medellín 2027. Reemplazado en la curul por Milton Darío Vasco Restrepo.',
    extramunicipalConnection: 'Conexión con el clan Valencia Cossio, directiva nacional del CD y comité central de campaña presidencial en Bogotá.',
    municipalAnchor: 'Comunas de clase media y alta de Medellín (El Poblado, Laureles, Belén).',
    socialProfiles: {
      xTwitter: 'https://twitter.com/SebastianLopezV',
      instagram: 'https://instagram.com/sebastianlopezv',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Sebastián López renuncia al Concejo de Medellín para sumarse a la campaña presidencial de Paloma Valencia',
        source: 'El Colombiano',
        year: 2026,
        sentiment: 'positivo'
      }
    ]
  },

  // ==========================================
  // CASA JULIÁN BEDOYA / RENOVACIÓN LIBERAL
  // ==========================================
  {
    id: 'actor-bedoya-julian',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    name: 'Julián Bedoya Pulgarín',
    alias: 'El Alfil de la Salud',
    role: 'patriarca',
    roleLabel: 'Exsenador de la República / Jefe de Renovación Liberal',
    houseId: 'casa-bedoya-renovacion',
    houseName: 'Casa Julián Bedoya / Renovación Liberal',
    level: 1,
    sphere: 'mixto',
    municipality: 'Bello',
    department: 'Antioquia',
    status: 'Dirigente Nacional y Operador de Coalición',
    bio: 'Exdiputado, exrepresentante y exsenador liberal. Conocido por su astucia legislativa y su capacidad de colocar curules a través de maquinaria territorial en municipios del Bajo Cauca y Urabá.',
    extramunicipalConnection: 'Articulador de votos decisivos con el Gobierno Nacional y ministerios en Bogotá.',
    municipalAnchor: 'Redes de concejales y alcaldes en más de 25 municipios de Antioquia.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/JulianBedoyaP'
    },
    newsLinks: [
      {
        title: 'Julián Bedoya y las piezas que mueve en el Congreso',
        source: 'Cuestión Pública',
        snippet: 'El grupo de Bedoya se mantiene como pieza bisagra en las votaciones de la reforma a la salud.',
        year: 2023,
        sentiment: 'critico'
      }
    ]
  },
  {
    id: 'actor-lopera-maria-eugenia',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    name: 'María Eugenia Lopera Monsalve',
    role: 'representante',
    roleLabel: 'Representante a la Cámara por Antioquia',
    houseId: 'casa-bedoya-renovacion',
    houseName: 'Casa Julián Bedoya / Renovación Liberal',
    level: 2,
    sphere: 'extramunicipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 87400,
    status: 'En funciones (Cámara 2022-2026)',
    bio: 'Elegida con la estructura de Julián Bedoya. Famosa por romper la disciplina del Partido Liberal para salvar el trámite de la reforma a la salud en la Comisión Séptima.',
    extramunicipalConnection: 'Comisión Séptima de la Cámara de Representantes.',
    municipalAnchor: 'Estructuras de salud y líderes de Bello y Medellín.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/MELoperaM',
      instagram: 'https://instagram.com/mariaeugenialopera'
    },
    newsLinks: [
      {
        title: 'María Eugenia Lopera, el voto liberal que desafió a Gaviria',
        source: 'El Espectador',
        snippet: 'La congresista antioqueña explicó sus motivos para respaldar las reformas sociales.',
        year: 2023,
        sentiment: 'neutro'
      }
    ]
  },

  // ==========================================
  // CASA INDEPENDIENTES (DANIEL QUINTERO)
  // ==========================================
  {
    id: 'actor-quintero-daniel',
    partyId: 'pacto-historico',
    partyName: 'Pacto Histórico / Independientes',
    name: 'Daniel Quintero Calle',
    alias: 'Pinturita',
    role: 'lider_politico',
    roleLabel: 'Exalcalde de Medellín (2020-2023) / Precandidato 2026',
    houseId: 'casa-independientes-quintero',
    houseName: 'Casa Daniel Quintero / Independientes',
    level: 1,
    sphere: 'mixto',
    municipality: 'Medellín',
    department: 'Antioquia',
    status: 'Líder de Oposición / Precandidato Presidencial',
    bio: 'Exviceministro de las TIC y alcalde de Medellín (renunció a su cargo en 2023). Encabezó una confrontación histórica con el Grupo Empresarial Antioqueño (GEA) y el uribismo.',
    extramunicipalConnection: 'Cercanía estrecha con el presidente Gustavo Petro y sectores del Pacto Histórico nacional.',
    municipalAnchor: 'Comunas populares de Medellín y colectivos juveniles alternativos.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/QuinteroCalle',
      facebook: 'https://facebook.com/QuinteroCalleD',
      instagram: 'https://instagram.com/quinterocalle',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Daniel Quintero y el futuro del movimiento Independientes',
        source: 'La Silla Vacía',
        snippet: 'El exalcalde busca reagrupar fuerzas tras los resultados adversos de las elecciones regionales de 2023.',
        year: 2024,
        sentiment: 'critico'
      }
    ]
  },
  {
    id: 'actor-upegui-juan-carlos',
    partyId: 'pacto-historico',
    partyName: 'Pacto Histórico / Independientes',
    name: 'Juan Carlos Upegui Vanegas',
    role: 'concejal',
    roleLabel: 'Excandidato a la Alcaldía de Medellín / Dirigente de Independientes',
    houseId: 'casa-independientes-quintero',
    houseName: 'Casa Daniel Quintero / Independientes',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 95340,
    status: 'Dirigente de Oposición',
    bio: 'Primo de la ex primera dama Diana Osorio. Obtuvo el segundo lugar en las elecciones a la Alcaldía de Medellín en 2023.',
    extramunicipalConnection: 'Relaciones con juventudes de partidos de izquierda a nivel nacional.',
    municipalAnchor: 'Votación de opinión alternativa en Medellín.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/JuanKaUpegui',
      instagram: 'https://instagram.com/juankaupegui'
    },
    newsLinks: []
  }
,

  // ==========================================
  // CONCEJALES Y AGENTES MUNICIPALES POR PARTIDO (PA-009 EXTENDIDO)
  // ==========================================
  
  // --- CONCEJALES CENTRO DEMOCRÁTICO (MEDELLÍN Y SUBREGIONES) ---
  {
    id: 'actor-cd-concejal-claudia-carrasquilla',
    name: 'Claudia Carrasquilla Minami',
    alias: 'La Fiscal de Hierro',
    role: 'concejal',
    roleLabel: 'Exconcejal de Medellín (Renunció 2026) / Viceministra de Defensa',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático (Álvaro Uribe Vélez)',
    level: 4,
    sphere: 'extramunicipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 14966,
    cedula: '43.497.054',
    status: 'Renunció al Concejo (Agosto 2026) - Viceministra de Defensa Nacional',
    bio: 'Abogada penalista y exfiscal nacional contra el crimen organizado. Elegida concejal con 14.966 votos. Renunció a su curul en agosto de 2026 tras ser designada Viceministra de Defensa Nacional para coordinar las políticas de seguridad ciudadana y convivencia en el Gobierno. Su curul en el Concejo de Medellín fue asumida por el médico y exrector del CES, Jorge Julián Osorio Gómez.',
    extramunicipalConnection: 'Ministerio de Defensa Nacional, Fuerzas Militares, cúpula judicial y bancada nacional del Centro Democrático.',
    municipalAnchor: 'Concejo de Medellín (2024-2026), comisiones de seguridad y justicia.',
    socialProfiles: {
      xTwitter: '@FiscalHierro',
      instagram: '@claudiacarrasquillam',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Claudia Carrasquilla renuncia al Concejo de Medellín para asumir como Viceministra de Defensa',
        source: 'El Colombiano',
        year: 2026,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-cd-concejal-milton-vasco',
    name: 'Milton Darío Vasco Restrepo',
    alias: 'Milton Vasco',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín en funciones (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático (Álvaro Uribe Vélez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 6120,
    status: 'En funciones (Asumió curul en mayo 2026 en reemplazo de Sebastián López)',
    bio: 'Administrador y dirigente uribista con trayectoria en la administración pública distrital. Exdirector general de Metroparques. Asumió la curul del Centro Democrático en el Concejo de Medellín en mayo de 2026 luego de que Sebastián López renunciara formalmente para coordinar la campaña presidencial de Paloma Valencia.',
    extramunicipalConnection: 'Vínculo directo con el Directorio Departamental y la Dirección Nacional del Centro Democrático.',
    municipalAnchor: 'Concejo de Medellín, Comisión Primera del Plan y Comisión de Presupuesto.',
    socialProfiles: {
      xTwitter: '@MiltonVascoR',
      verifiedOfficial: false
    },
    newsLinks: [
      {
        title: 'Milton Vasco se posesiona como nuevo concejal de Medellín por el Centro Democrático',
        source: 'Telemedellín',
        year: 2026,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-cd-concejal-jorge-osorio',
    name: 'Jorge Julián Osorio Gómez',
    alias: 'Dr. Jorge Osorio',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín en funciones (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático (Álvaro Uribe Vélez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 6080,
    status: 'En funciones (Asumió curul en agosto 2026 en reemplazo de Claudia Carrasquilla)',
    bio: 'Médico cirujano, salubrista y académico de alto reconocimiento. Exrector de la Universidad CES. Asumió la curul en el Concejo de Medellín en agosto de 2026 tras la renuncia de la exfiscal Claudia Carrasquilla. Su labor legislativa enfoca la solvencia financiera de Metrosalud, hospitales públicos y educación superior.',
    extramunicipalConnection: 'Comité técnico nacional de salud del Centro Democrático, Asociación Colombiana de Facultades de Medicina (ASCOFAME).',
    municipalAnchor: 'Concejo de Medellín, Comisión de Asuntos Sociales y Salud, campus universitarios y red hospitalaria distrital.',
    socialProfiles: {
      xTwitter: '@JorgeOsorioCES',
      verifiedOfficial: false
    },
    newsLinks: [
      {
        title: 'El médico y exrector del CES Jorge Julián Osorio asume como concejal de Medellín',
        source: 'El Colombiano',
        year: 2026,
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
  {
    id: 'actor-cd-concejal-bello-duvan-bedoya',
    name: 'Duván Alberto Bedoya García',
    role: 'concejal',
    roleLabel: 'Concejal de Bello (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / Bello',
    level: 4,
    sphere: 'municipal',
    municipality: 'Bello',
    department: 'Antioquia',
    votes2023: 4590,
    status: 'En funciones (Concejal)',
    bio: 'Concejal más votado del Centro Democrático en Bello en las elecciones de 2023. Líder en fiscalización de contratación pública y desarrollo barrial en comunas de Bello.',
    extramunicipalConnection: 'Articulación con congresistas uribistas en la Cámara por Antioquia.',
    municipalAnchor: 'Concejo de Bello, comunas Niquía, Altos de Niquía y El Trapiche.',
    socialProfiles: { xTwitter: '@DuvanBedoyaBello', verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-bello-daniel-villa',
    name: 'Daniel Rodrigo Villa Maldonado',
    role: 'concejal',
    roleLabel: 'Concejal de Bello (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / Bello',
    level: 4,
    sphere: 'municipal',
    municipality: 'Bello',
    department: 'Antioquia',
    votes2023: 3951,
    status: 'En funciones (Concejal)',
    bio: 'Segundo en votación del CD en Bello. Enfocado en seguridad comunitaria, gestión vial y apoyo a microempresarios locales.',
    extramunicipalConnection: 'Directorio Departamental del Centro Democrático.',
    municipalAnchor: 'Concejo de Bello, Comuna 4 (Suárez) y Comuna 5 (La Cumbre).',
    socialProfiles: { xTwitter: '@DanielVillaBello', verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-bello-jorge-arango',
    name: 'Jorge Armando Arango Palacio',
    role: 'concejal',
    roleLabel: 'Concejal de Bello (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / Bello',
    level: 4,
    sphere: 'municipal',
    municipality: 'Bello',
    department: 'Antioquia',
    votes2023: 2604,
    status: 'En funciones (Concejal)',
    bio: 'Concejal de Bello con trabajo comunitario consolidado en el sector central y zonas industriales del norte.',
    extramunicipalConnection: 'Articulación con redes empresariales del Valle de Aburrá Norte.',
    municipalAnchor: 'Concejo de Bello y sector centro.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-itagui-walter-betancur',
    name: 'Walter Esneider Betancur Montoya',
    role: 'concejal',
    roleLabel: 'Concejal de Itagüí (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / Itagüí',
    level: 4,
    sphere: 'municipal',
    municipality: 'Itagüí',
    department: 'Antioquia',
    votes2023: 8411,
    status: 'En funciones (Lista Cerrada CD)',
    bio: 'Cabeza de lista del Centro Democrático en Itagüí. Ejerce control político autónomo frente a la coalición hegemónica conservadora.',
    extramunicipalConnection: 'Articulación con Álvaro Uribe Vélez y senadores del Centro Democrático.',
    municipalAnchor: 'Concejo de Itagüí, comunas San Fernando y Ditaires.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-envigado-juan-uribe',
    name: 'Juan Fernando Uribe Restrepo',
    role: 'concejal',
    roleLabel: 'Concejal de Envigado (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / Envigado',
    level: 4,
    sphere: 'municipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    votes2023: 4120,
    status: 'En funciones (Concejal)',
    bio: 'Concejal del Centro Democrático en Envigado. Vocero de la bancada uribista en temas de ordenamiento territorial, finanzas y control ambiental.',
    extramunicipalConnection: 'Bancada del CD en la Asamblea de Antioquia y el Congreso.',
    municipalAnchor: 'Concejo de Envigado, zonas El Atravesado y Las Antillas.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-envigado-carlos-uribe',
    name: 'Carlos Manuel Uribe Mesa',
    role: 'concejal',
    roleLabel: 'Concejal de Envigado (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / Envigado',
    level: 4,
    sphere: 'municipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    votes2023: 3810,
    status: 'En funciones (Concejal)',
    bio: 'Concejal de Envigado con enfoque en fomento del emprendimiento, protección patrimonial y movilidad.',
    extramunicipalConnection: 'Redes gremiales del sur del Valle de Aburrá.',
    municipalAnchor: 'Concejo de Envigado y barrio San Marcos.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-envigado-jhony-velez',
    name: 'Jhony Oswaldo Vélez Quintero',
    alias: 'Jhony Vélez',
    role: 'concejal',
    roleLabel: 'Concejal de Envigado (Oposición / CD)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / Envigado',
    level: 4,
    sphere: 'municipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    votes2023: 27702,
    status: 'En funciones (Curul Estatuto Oposición Ley 1909)',
    bio: 'Exdirector de Planeación y excandidato a la Alcaldía de Envigado en 2023 (segunda votación con más de 27.000 sufragios). Asumió curul de oposición bajo la Ley 1909.',
    extramunicipalConnection: 'Conexión directa con Álvaro Uribe Vélez y la jefatura del Centro Democrático.',
    municipalAnchor: 'Concejo de Envigado y coalición ciudadana de oposición en Envigado.',
    socialProfiles: { xTwitter: '@JhonyVelezEnv', verifiedOfficial: true },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-sabaneta-jose-restrepo',
    name: 'José Daniel Restrepo Montoya',
    role: 'concejal',
    roleLabel: 'Concejal de Sabaneta (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / Sabaneta',
    level: 4,
    sphere: 'municipal',
    municipality: 'Sabaneta',
    department: 'Antioquia',
    votes2023: 2324,
    status: 'En funciones (Concejal)',
    bio: 'Concejal más votado del Centro Democrático en Sabaneta. Líder de debates sobre desarrollo urbano vertical, movilidad y espacio público.',
    extramunicipalConnection: 'Articulación con el Directorio Departamental de Antioquia.',
    municipalAnchor: 'Concejo de Sabaneta, veredas Las Lomitas y Cañaveralejo.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-sabaneta-julian-ceballos',
    name: 'Julián David Ceballos Montoya',
    role: 'concejal',
    roleLabel: 'Concejal de Sabaneta (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / Sabaneta',
    level: 4,
    sphere: 'municipal',
    municipality: 'Sabaneta',
    department: 'Antioquia',
    votes2023: 764,
    status: 'En funciones (Concejal)',
    bio: 'Joven dirigente del Centro Democrático en Sabaneta. Trabaja en juventud, cultura y fomento del deporte barrial.',
    extramunicipalConnection: 'Red nacional de juventudes del Centro Democrático.',
    municipalAnchor: 'Concejo de Sabaneta y barrios centrales.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-copacabana-margarita-munoz',
    name: 'Margarita María Muñoz Giraldo',
    role: 'concejal',
    roleLabel: 'Concejal de Copacabana (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / Copacabana',
    level: 4,
    sphere: 'municipal',
    municipality: 'Copacabana',
    department: 'Antioquia',
    votes2023: 377,
    cedula: '42.687.560',
    status: 'En funciones (Concejal)',
    bio: 'Concejal uribista en Copacabana. Defensora de las mujeres rurales y de las juntas de acción comunal.',
    extramunicipalConnection: 'Red de mujeres líderes del Centro Democrático en Antioquia.',
    municipalAnchor: 'Concejo de Copacabana y veredas del norte metropolitano.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-caldas-angela-espinosa',
    name: 'Angela María Espinosa Castro',
    role: 'concejal',
    roleLabel: 'Concejal de Caldas (Coalición CD - MIRA)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / Caldas',
    level: 4,
    sphere: 'municipal',
    municipality: 'Caldas',
    department: 'Antioquia',
    votes2023: 732,
    cedula: '43.681.300',
    status: 'En funciones (Concejal)',
    bio: 'Concejal electa por la coalición Centro Democrático - Partido MIRA en el sur del Valle de Aburrá.',
    extramunicipalConnection: 'Articulación institucional con la bancada departamental en la Asamblea.',
    municipalAnchor: 'Concejo de Caldas y sector La Valeria.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-laestrella-willington-herrera',
    name: 'Willington Herrera Arroyave',
    role: 'concejal',
    roleLabel: 'Concejal de La Estrella (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / La Estrella',
    level: 4,
    sphere: 'municipal',
    municipality: 'La Estrella',
    department: 'Antioquia',
    votes2023: 533,
    cedula: '98.658.912',
    status: 'En funciones (Concejal)',
    bio: 'Concejal del Centro Democrático en La Estrella. Control político al presupuesto y vigilancia a licitaciones de infraestructura.',
    extramunicipalConnection: 'Directorio departamental del CD.',
    municipalAnchor: 'Concejo de La Estrella y sectores populares.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-laestrella-john-ocampo',
    name: 'John Edison Ocampo Mejía',
    role: 'concejal',
    roleLabel: 'Concejal de La Estrella (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / La Estrella',
    level: 4,
    sphere: 'municipal',
    municipality: 'La Estrella',
    department: 'Antioquia',
    votes2023: 380,
    cedula: '1.040.732.698',
    status: 'En funciones (Concejal)',
    bio: 'Líder social y concejal uribista en La Estrella. Enfocado en programas de juventud y empleo local.',
    extramunicipalConnection: 'Redes juveniles del uribismo en el sur metropolitano.',
    municipalAnchor: 'Concejo de La Estrella y barrio Ancón.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-barbosa-carlos-zapata',
    name: 'Carlos Andrés Zapata Chaverra',
    role: 'concejal',
    roleLabel: 'Concejal de Barbosa (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-centro-democratico-uribe',
    houseName: 'Casa Centro Democrático / Barbosa',
    level: 4,
    sphere: 'municipal',
    municipality: 'Barbosa',
    department: 'Antioquia',
    votes2023: 511,
    cedula: '1.035.233.703',
    status: 'En funciones (Concejal)',
    bio: 'Representante del Centro Democrático en el Concejo de Barbosa, extremo norte metropolitano. Líder en temas de vías veredales y defensa agropecuaria.',
    extramunicipalConnection: 'Articulación con comités del Norte de Antioquia y Gobernación.',
    municipalAnchor: 'Concejo de Barbosa y sector El Hatillo.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-rionegro-lina-ciro',
    name: 'Lina Marcela Ciro',
    role: 'concejal',
    roleLabel: 'Concejal de Rionegro (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-cd-oriente-rendon',
    houseName: 'Casa Centro Democrático / Paico - Uribe - Rendón',
    level: 4,
    sphere: 'municipal',
    municipality: 'Rionegro',
    department: 'Antioquia',
    votes2023: 2850,
    status: 'En funciones (Concejal)',
    bio: 'Líder del uribismo en Rionegro, bastión del Gobernador Andrés Julián Rendón y el senador Esteban Quintero. Coordinadora de la bancada del CD en el Oriente.',
    extramunicipalConnection: 'Enlace estrecho con el despacho del Gobernador Andrés Julián Rendón.',
    municipalAnchor: 'Concejo de Rionegro y sectores comerciales de San Antonio de Pereira.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-cd-concejal-rionegro-oscar-garcia',
    name: 'Oscar Johao García-Casarrubios',
    role: 'concejal',
    roleLabel: 'Concejal de Rionegro (Centro Democrático)',
    partyId: 'centro-democratico',
    partyName: 'Centro Democrático',
    houseId: 'casa-cd-oriente-rendon',
    houseName: 'Casa Centro Democrático / Paico - Uribe - Rendón',
    level: 4,
    sphere: 'municipal',
    municipality: 'Rionegro',
    department: 'Antioquia',
    votes2023: 2410,
    status: 'En funciones (Concejal)',
    bio: 'Concejal uribista en Rionegro. Impulsor del desarrollo agroindustrial y tecnológico del Oriente Antioqueño.',
    extramunicipalConnection: 'Articulación con la bancada del CD en la Cámara por Antioquia.',
    municipalAnchor: 'Concejo de Rionegro y veredas orientales.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },

  // --- CONCEJALES PARTIDO CREEMOS (MEDELLÍN Y METROPOLITANO) ---
  {
    id: 'actor-creemos-concejal-andres-tobon',
    name: 'Andrés Felipe Tobón Villada',
    alias: 'Andrés Tobón',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín - Más Votado (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-fico',
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
    houseId: 'casa-creemos-fico',
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
    houseId: 'casa-creemos-fico',
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
    houseId: 'casa-creemos-fico',
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
    id: 'actor-creemos-concejal-juan-delacuesta',
    name: 'Juan Carlos De La Cuesta Galvis',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 9523,
    cedula: '71.741.348',
    status: 'En funciones (Concejal)',
    bio: 'Exitoso expresidente del Club Atlético Nacional (campeón de Copa Libertadores 2016). Dirige la agenda deportiva, recreativa y de grandes eventos internacionales en el Concejo.',
    extramunicipalConnection: 'Vínculos con federaciones deportivas nacionales y Conmebol.',
    municipalAnchor: 'Concejo de Medellín, INDER y sector deportivo distrital.',
    socialProfiles: { verifiedOfficial: true },
    newsLinks: []
  },
  {
    id: 'actor-creemos-concejal-damian-perez',
    name: 'Damián Pérez Arroyave',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 9338,
    cedula: '1.035.830.866',
    status: 'En funciones (Concejal)',
    bio: 'Concejal de Medellín por Creemos. Enfoque en control a la contratación pública, transparencia y gobierno abierto.',
    extramunicipalConnection: 'Redes ciudadanas anticorrupción y veedurías.',
    municipalAnchor: 'Concejo de Medellín y comunas occidentales.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-creemos-concejal-envigado-luz-lopez',
    name: 'Luz Marina López Peña',
    role: 'concejal',
    roleLabel: 'Concejal de Envigado (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    votes2023: 2450,
    status: 'En funciones (Concejal)',
    bio: 'Concejal de Creemos en Envigado. Representa la expansión del movimiento de Federico Gutiérrez en el sur del Valle de Aburrá.',
    extramunicipalConnection: 'Articulación directa con el directorio metropolitano de Creemos.',
    municipalAnchor: 'Concejo de Envigado y sectores residenciales del sur.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-creemos-concejal-sabaneta-ivan',
    name: 'Iván Alonso Montoya Urrego',
    role: 'concejal',
    roleLabel: 'Concejal de Sabaneta (Oposición / Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Sabaneta',
    department: 'Antioquia',
    votes2023: 13836,
    status: 'En funciones (Concejal Oposición Ley 1909)',
    bio: 'Exalcalde de Sabaneta (2016-2019). Obtuvo el segundo lugar para la Alcaldía en 2023 (13.836 votos) y asumió curul bajo el Estatuto de Oposición (Ley 1909).',
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
  {
    id: 'actor-creemos-concejal-sabaneta-alliday',
    name: 'Alliday Tobón Henao',
    role: 'concejal',
    roleLabel: 'Concejal de Sabaneta (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Sabaneta',
    department: 'Antioquia',
    votes2023: 850,
    status: 'En funciones (Concejal)',
    bio: 'Concejal de Creemos en Sabaneta. Defensora del medio ambiente, la cultura ciudadana y la inclusión comunitaria.',
    extramunicipalConnection: 'Comité de bancada metropolitana de Creemos.',
    municipalAnchor: 'Concejo de Sabaneta y sector Playas de María.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-creemos-concejal-copacabana-carlos-gomez',
    name: 'Carlos Alberto Gómez Yarce',
    role: 'concejal',
    roleLabel: 'Concejal de Copacabana (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Copacabana',
    department: 'Antioquia',
    votes2023: 1018,
    cedula: '1.035.425.982',
    status: 'En funciones (Concejal)',
    bio: 'Concejal más votado de Creemos en Copacabana. Respaldo clave para el alcalde Johnnatan Pineda en la corporación municipal.',
    extramunicipalConnection: 'Coordinación con el despacho del Alcalde de Medellín en temas de movilidad metropolitana.',
    municipalAnchor: 'Concejo de Copacabana y barrios de la zona urbana.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-creemos-concejal-copacabana-julian-tobon',
    name: 'Julián Andrés Tobón Martínez',
    role: 'concejal',
    roleLabel: 'Concejal de Copacabana (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Copacabana',
    department: 'Antioquia',
    votes2023: 647,
    cedula: '1.035.424.146',
    status: 'En funciones (Concejal)',
    bio: 'Concejal de la bancada de gobierno en Copacabana, impulsor de obras viales y saneamiento.',
    extramunicipalConnection: 'Área Metropolitana del Valle de Aburrá.',
    municipalAnchor: 'Concejo de Copacabana.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-creemos-concejal-caldas-luis-vergara',
    name: 'Luis Aníbal Vergara Ochoa',
    role: 'concejal',
    roleLabel: 'Concejal de Caldas (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Caldas',
    department: 'Antioquia',
    votes2023: 720,
    cedula: '71.394.549',
    status: 'En funciones (Concejal)',
    bio: 'Concejal de Creemos en Caldas. Lidera iniciativas de protección a la cuenca alta del río Medellín y desarrollo comercial.',
    extramunicipalConnection: 'Articulación con directivas de Creemos Antioquia.',
    municipalAnchor: 'Concejo de Caldas y vereda La Miel.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-creemos-concejal-caldas-raul-mesa',
    name: 'Raúl Alejandro Mesa Correa',
    role: 'concejal',
    roleLabel: 'Concejal de Caldas (Oposición / Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Caldas',
    department: 'Antioquia',
    votes2023: 10982,
    cedula: '71.399.771',
    status: 'En funciones (Curul Oposición Ley 1909)',
    bio: 'Excandidato a la Alcaldía de Caldas con casi 11.000 votos en 2023. Asumió curul de oposición bajo la Ley 1909.',
    extramunicipalConnection: 'Vínculo directo con Federico Gutiérrez.',
    municipalAnchor: 'Concejo de Caldas y líderes comunitarios del sur.',
    socialProfiles: { verifiedOfficial: true },
    newsLinks: []
  },
  {
    id: 'actor-creemos-concejal-laestrella-fernando-moreno',
    name: 'Fernando de Jesús Moreno Moreno',
    role: 'concejal',
    roleLabel: 'Concejal de La Estrella (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'La Estrella',
    department: 'Antioquia',
    votes2023: 337,
    cedula: '7.158.322.1',
    status: 'En funciones (Concejal)',
    bio: 'Concejal de Creemos en La Estrella. Enlace metropolitano en el sur.',
    extramunicipalConnection: 'Bancada metropolitana de Creemos.',
    municipalAnchor: 'Concejo de La Estrella.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-creemos-concejal-rionegro-victor-barreto',
    name: 'Víctor Alfonso Barreto',
    role: 'concejal',
    roleLabel: 'Concejal de Rionegro (Creemos)',
    partyId: 'creemos',
    partyName: 'Partido Político Creemos',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Rionegro',
    department: 'Antioquia',
    votes2023: 2120,
    status: 'En funciones (Concejal)',
    bio: 'Concejal de Creemos en el Oriente Antioqueño. Vocero de la innovación y articulación empresarial en Rionegro.',
    extramunicipalConnection: 'Comité central de expansión regional de Creemos.',
    municipalAnchor: 'Concejo de Rionegro y sectores urbanos.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },

  // --- CONCEJALES PARTIDO CONSERVADOR (CASA TRUJILLO, SUÁREZ MIRA Y GERMÁN BLANCO) ---
  {
    id: 'actor-conservador-concejal-itagui-andres-arcila',
    name: 'Andrés Camilo Arcila Pérez',
    role: 'concejal',
    roleLabel: 'Concejal de Itagüí (Conservador - Equipo de Antioquia)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Itagüí',
    department: 'Antioquia',
    votes2023: 3431,
    status: 'En funciones (Concejal)',
    bio: 'Concejal más votado del Partido Conservador en Itagüí en 2023. Uno de los alfiles más leales de la estructura de Carlos Andrés Trujillo.',
    extramunicipalConnection: 'Coordinación directa con el despacho del Senador Carlos Andrés Trujillo.',
    municipalAnchor: 'Concejo de Itagüí y Comuna 3.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-conservador-concejal-itagui-jorge-restrepo',
    name: 'Jorge Iván Restrepo Arias',
    role: 'concejal',
    roleLabel: 'Concejal de Itagüí (Conservador - Equipo de Antioquia)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Itagüí',
    department: 'Antioquia',
    votes2023: 3392,
    status: 'En funciones (Concejal)',
    bio: 'Veterano dirigente conservador del Equipo de Antioquia. Miembro clave de la mesa directiva del Concejo de Itagüí.',
    extramunicipalConnection: 'Vínculos con la bancada conservadora en el Congreso.',
    municipalAnchor: 'Concejo de Itagüí y barrios San Pío y Calatrava.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-conservador-concejal-itagui-bayron-caro',
    name: 'Bayron de Jesús Caro Luján',
    role: 'concejal',
    roleLabel: 'Concejal de Itagüí (Conservador - Equipo de Antioquia)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Itagüí',
    department: 'Antioquia',
    votes2023: 3064,
    status: 'En funciones (Concejal)',
    bio: 'Concejal de amplia experiencia comunitaria en Itagüí, operador clave en la disciplina de votación del Equipo de Antioquia.',
    extramunicipalConnection: 'Estructura electoral departamental conservadora.',
    municipalAnchor: 'Concejo de Itagüí y Comuna 1.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-conservador-concejal-itagui-maria-gaviria',
    name: 'María Angélica Gaviria Londoño',
    role: 'concejal',
    roleLabel: 'Concejal de Itagüí (Conservador - Equipo de Antioquia)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Itagüí',
    department: 'Antioquia',
    votes2023: 2647,
    status: 'En funciones (Concejal)',
    bio: 'Lideresa conservadora en Itagüí, defensora de programas sociales, equidad de género y adulto mayor.',
    extramunicipalConnection: 'Red de mujeres conservadoras de Colombia.',
    municipalAnchor: 'Concejo de Itagüí y juntas comunitarias.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-conservador-concejal-itagui-juan-martinez',
    name: 'Juan Pablo Martínez Cano',
    role: 'concejal',
    roleLabel: 'Concejal de Itagüí (Conservador - Equipo de Antioquia)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Itagüí',
    department: 'Antioquia',
    votes2023: 2565,
    status: 'En funciones (Concejal)',
    bio: 'Concejal conservador de la bancada hegemónica de Itagüí. Sobresale en temas de seguridad y movilidad metropolitana.',
    extramunicipalConnection: 'Equipo de Antioquia en el sur del Valle de Aburrá.',
    municipalAnchor: 'Concejo de Itagüí y Ditaires.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-conservador-concejal-medellin-ramon-jimenez',
    name: 'Juan Ramón Jiménez Lara',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Partido Conservador)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-blanco-conservadora',
    houseName: 'Casa Germán Blanco / Conservatismo Institucional',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 14500,
    cedula: '76.324.026',
    status: 'En funciones (Concejal)',
    bio: 'Concejal conservador más votado en Medellín. Reconocido activista por el bienestar animal, medio ambiente y políticas de protección ecológica.',
    extramunicipalConnection: 'Vínculo con el senador Germán Blanco y redes ambientalistas nacionales.',
    municipalAnchor: 'Concejo de Medellín, colectivos animalistas y ecologistas.',
    socialProfiles: { xTwitter: '@JuanRamonJimenezL', verifiedOfficial: true },
    newsLinks: []
  },
  {
    id: 'actor-conservador-concejal-medellin-brisvani-arenas',
    name: 'Brisvani Alexis Arenas Suaza',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Partido Conservador)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 9657,
    cedula: '71.363.158',
    status: 'En funciones (Concejal)',
    bio: 'Concejal conservador de Medellín avalado con el respaldo del Equipo de Antioquia (Trujillo). Experto en planeación comunitaria y obras públicas.',
    extramunicipalConnection: 'Articulación directa con Carlos Andrés Trujillo y la bancada conservadora en el Congreso.',
    municipalAnchor: 'Concejo de Medellín y Comuna 5 (Castilla).',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-conservador-concejal-bello-gustavo-gomez',
    name: 'Gustavo Adolfo Gómez Suárez',
    role: 'concejal',
    roleLabel: 'Concejal de Bello (Partido Conservador - Suárez Mira)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-suarez-mira',
    houseName: 'Casa Suárez Mira (Bello)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Bello',
    department: 'Antioquia',
    votes2023: 3410,
    status: 'En funciones (Concejal)',
    bio: 'Concejal del feudo conservador de Bello. Alfil de la alcaldesa Lorena González y de la histórica Casa Suárez Mira.',
    extramunicipalConnection: 'Articulación con Olga Suárez Mira y redes conservadoras del norte.',
    municipalAnchor: 'Concejo de Bello y sectores de Bello centro.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-conservador-concejal-envigado-gonzalo-mesa',
    name: 'Gonzalo de Jesús Mesa Ochoa',
    role: 'concejal',
    roleLabel: 'Concejal de Envigado (Partido Conservador)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-blanco-conservadora',
    houseName: 'Casa Germán Blanco / Conservatismo Institucional',
    level: 4,
    sphere: 'municipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    votes2023: 3120,
    status: 'En funciones (Concejal)',
    bio: 'Veterano concejal conservador en Envigado. Baluarte del conservatismo tradicional en el sur metropolitano.',
    extramunicipalConnection: 'Directorio Departamental Conservador de Antioquia.',
    municipalAnchor: 'Concejo de Envigado y barrio Zuñiga.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-conservador-concejal-envigado-lucas-gaviria',
    name: 'Lucas Gaviria Henao',
    role: 'concejal',
    roleLabel: 'Concejal de Envigado (Partido Conservador)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-blanco-conservadora',
    houseName: 'Casa Germán Blanco / Conservatismo Institucional',
    level: 4,
    sphere: 'municipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    votes2023: 2840,
    status: 'En funciones (Concejal)',
    bio: 'Concejal conservador con agenda de modernización institucional y desarrollo de infraestructura barrial en Envigado.',
    extramunicipalConnection: 'Redes conservadoras del sur metropolitano.',
    municipalAnchor: 'Concejo de Envigado.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-conservador-concejal-sabaneta-deifer',
    name: 'Deifer Alexander Morales Castaño',
    role: 'concejal',
    roleLabel: 'Concejal de Sabaneta (Partido Conservador)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Sabaneta',
    department: 'Antioquia',
    votes2023: 1592,
    status: 'En funciones (Concejal)',
    bio: 'Concejal conservador de Sabaneta afín a la red del Equipo de Antioquia.',
    extramunicipalConnection: 'Equipo de Antioquia en el sur del Valle de Aburrá.',
    municipalAnchor: 'Concejo de Sabaneta.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-conservador-concejal-caldas-sebastian-querubin',
    name: 'Sebastián Querubín Loaiza',
    role: 'concejal',
    roleLabel: 'Concejal de Caldas (Partido Conservador)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Caldas',
    department: 'Antioquia',
    votes2023: 553,
    cedula: '1.036.641.498',
    status: 'En funciones (Concejal)',
    bio: 'Concejal conservador en Caldas, clave en las votaciones de apoyo a proyectos de infraestructura regional.',
    extramunicipalConnection: 'Liderazgo conservador del sur metropolitano.',
    municipalAnchor: 'Concejo de Caldas.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-conservador-concejal-laestrella-camilo-cano',
    name: 'Andrés Camilo Cano Londoño',
    role: 'concejal',
    roleLabel: 'Concejal de La Estrella (Partido Conservador)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-trujillo',
    houseName: 'Casa Carlos Andrés Trujillo (Equipo de Antioquia)',
    level: 4,
    sphere: 'municipal',
    municipality: 'La Estrella',
    department: 'Antioquia',
    votes2023: 646,
    cedula: '1.040.737.013',
    status: 'En funciones (Concejal)',
    bio: 'Concejal conservador de La Estrella, aliado de la administración local y del Equipo de Antioquia.',
    extramunicipalConnection: 'Casa Trujillo y Equipo de Antioquia.',
    municipalAnchor: 'Concejo de La Estrella y veredas bajas.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-conservador-girardota-berenice-alzate',
    name: 'María Berenice Álzate Castro',
    role: 'concejal',
    roleLabel: 'Concejal de Girardota (Partido Conservador)',
    partyId: 'conservador',
    partyName: 'Partido Conservador Colombiano',
    houseId: 'casa-suarez-mira',
    houseName: 'Casa Conservadora del Norte',
    level: 4,
    sphere: 'municipal',
    municipality: 'Girardota',
    department: 'Antioquia',
    votes2023: 1006,
    cedula: '39.353.402',
    status: 'En funciones (Concejal)',
    bio: 'Concejal conservadora más votada en Girardota. Defensora del patrimonio campesino y de las vías rurales.',
    extramunicipalConnection: 'Redes conservadoras del Norte y Valle de Aburrá.',
    municipalAnchor: 'Concejo de Girardota y veredas La Palma y San Andrés.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },

  // --- CONCEJALES PARTIDO LIBERAL (CASA LONDOÑO/ESPINOSA, BEDOYA Y ROLDÁN) ---
  {
    id: 'actor-liberal-concejal-envigado-pablo-restrepo',
    name: 'Pablo Andrés Restrepo Garcés',
    alias: 'Pablo Restrepo',
    role: 'concejal',
    roleLabel: 'Concejal de Envigado - Más Votado (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-envigado-londono',
    houseName: 'Casa Héctor Londoño / Liberales de Envigado',
    level: 4,
    sphere: 'municipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    votes2023: 5310,
    status: 'En funciones (Presidente Concejo Envigado)',
    bio: 'Concejal más votado del Partido Liberal en Envigado. Figura estelar de la hegemonía liberal envigadeña articulada con Braulio Espinosa y Héctor Londoño.',
    extramunicipalConnection: 'Articulación con congresistas liberales de Antioquia como Julián Peinado.',
    municipalAnchor: 'Concejo de Envigado, zonas El Dorado y San Marcos.',
    socialProfiles: { xTwitter: '@PabloRestrepoEnv', verifiedOfficial: true },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-envigado-david-londono',
    name: 'David Alfonso Londoño Arroyave',
    role: 'concejal',
    roleLabel: 'Concejal de Envigado (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-envigado-londono',
    houseName: 'Casa Héctor Londoño / Liberales de Envigado',
    level: 4,
    sphere: 'municipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    votes2023: 4890,
    status: 'En funciones (Concejal)',
    bio: 'Miembro de la dinastía Londoño en Envigado. Defiende el modelo de gestión social y cobertura educativa del municipio.',
    extramunicipalConnection: 'Red de dirigentes liberales del sur del Valle de Aburrá.',
    municipalAnchor: 'Concejo de Envigado y zona centro.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-envigado-camilo-gomez',
    name: 'Camilo Andrés Gómez Mosquera',
    role: 'concejal',
    roleLabel: 'Concejal de Envigado (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-envigado-londono',
    houseName: 'Casa Héctor Londoño / Liberales de Envigado',
    level: 4,
    sphere: 'municipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    votes2023: 4520,
    status: 'En funciones (Concejal)',
    bio: 'Concejal de la bancada mayoritaria liberal de Envigado. Enfocado en medio ambiente urbano y deportes.',
    extramunicipalConnection: 'Directorio Liberal de Antioquia.',
    municipalAnchor: 'Concejo de Envigado.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-envigado-maria-alvarez',
    name: 'María Teresa Álvarez Muñoz',
    role: 'concejal',
    roleLabel: 'Concejal de Envigado (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-envigado-londono',
    houseName: 'Casa Héctor Londoño / Liberales de Envigado',
    level: 4,
    sphere: 'municipal',
    municipality: 'Envigado',
    department: 'Antioquia',
    votes2023: 4110,
    status: 'En funciones (Concejal)',
    bio: 'Lideresa de la bancada liberal en Envigado. Abogada con dedicación al fomento de la mujer y programas de salud preventiva.',
    extramunicipalConnection: 'Bancada de mujeres liberales en corporaciones públicas.',
    municipalAnchor: 'Concejo de Envigado.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-medellin-farley',
    name: 'Farley Jhair Macías Betancur',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-roldan-norte',
    houseName: 'Casa John Jairo Roldán / Liberales del Norte',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 10491,
    cedula: '1.152.700.230',
    status: 'En funciones (Única Curul Liberal Medellín)',
    bio: 'Concejal de Medellín por el Partido Liberal Colombiano. Respaldo directo del senador John Jairo Roldán. Coordina la vocería del liberalismo en los debates presupuestales del Distrito.',
    extramunicipalConnection: 'Senador John Jairo Roldán y Dirección Nacional del Partido Liberal.',
    municipalAnchor: 'Concejo de Medellín, Comuna 2 (Santa Cruz) y Comuna 4 (Aranjuez).',
    socialProfiles: { xTwitter: '@FarleyMacias', verifiedOfficial: true },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-bello-carlos-mosquera',
    name: 'Carlos Augusto Mosquera Gómez',
    role: 'concejal',
    roleLabel: 'Concejal de Bello (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-roldan-norte',
    houseName: 'Casa John Jairo Roldán / Liberales del Norte',
    level: 4,
    sphere: 'municipal',
    municipality: 'Bello',
    department: 'Antioquia',
    votes2023: 2529,
    status: 'En funciones (Concejal)',
    bio: 'Concejal más votado del Partido Liberal en Bello. Estructura territorial aliada al senador John Jairo Roldán.',
    extramunicipalConnection: 'Articulación legislativa con el Congreso Nacional.',
    municipalAnchor: 'Concejo de Bello y sector Niquía.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-bello-giovanni-giraldo',
    name: 'Giovanni Giraldo Jaramillo',
    role: 'concejal',
    roleLabel: 'Concejal de Bello (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-bedoya-renovacion',
    houseName: 'Casa Julián Bedoya / Renovación Liberal',
    level: 4,
    sphere: 'municipal',
    municipality: 'Bello',
    department: 'Antioquia',
    votes2023: 1922,
    status: 'En funciones (Concejal)',
    bio: 'Concejal de la bancada liberal en Bello, vinculado a las redes de Renovación Liberal de Julián Bedoya.',
    extramunicipalConnection: 'Red política de Julián Bedoya y María Eugenia Lopera.',
    municipalAnchor: 'Concejo de Bello y Comuna 6 (Bellavista).',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-bello-luis-hernandez',
    name: 'Luis Carlos Hernández Giraldo',
    role: 'concejal',
    roleLabel: 'Concejal de Bello (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-roldan-norte',
    houseName: 'Casa John Jairo Roldán / Liberales del Norte',
    level: 4,
    sphere: 'municipal',
    municipality: 'Bello',
    department: 'Antioquia',
    votes2023: 1899,
    status: 'En funciones (Concejal)',
    bio: 'Concejal de Bello por el Partido Liberal Colombiano. Líder en debates de equipamiento barrial y educación técnica.',
    extramunicipalConnection: 'Directorio Departamental Liberal.',
    municipalAnchor: 'Concejo de Bello.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-itagui-elkin-zuleta',
    name: 'Elkin de Jesús Zuleta Estrada',
    role: 'concejal',
    roleLabel: 'Concejal de Itagüí (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-bedoya-renovacion',
    houseName: 'Casa Julián Bedoya / Renovación Liberal',
    level: 4,
    sphere: 'municipal',
    municipality: 'Itagüí',
    department: 'Antioquia',
    votes2023: 2398,
    status: 'En funciones (Concejal)',
    bio: 'Único concejal liberal electo en Itagüí en 2023. Articulador de la bancada alternativa en el sur metropolitano.',
    extramunicipalConnection: 'Articulación con parlamentarios liberales de Antioquia.',
    municipalAnchor: 'Concejo de Itagüí y Comuna 4.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-sabaneta-fabricio',
    name: 'Ángel Fabricio Henao',
    role: 'concejal',
    roleLabel: 'Concejal de Sabaneta (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-prieto-liberal',
    houseName: 'Casa Eugenio Prieto / Liberales Institucionales',
    level: 4,
    sphere: 'municipal',
    municipality: 'Sabaneta',
    department: 'Antioquia',
    votes2023: 2514,
    status: 'En funciones (Concejal)',
    bio: 'Concejal más votado del Partido Liberal en Sabaneta. Líder de debates sobre movilidad y sostenibilidad fiscal en el sur.',
    extramunicipalConnection: 'Eugenio Prieto Soto y Secretaría de Hacienda Departamental.',
    municipalAnchor: 'Concejo de Sabaneta y sector céntrico.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-sabaneta-john-gonzalez',
    name: 'John Fredy González Montoya',
    role: 'concejal',
    roleLabel: 'Concejal de Sabaneta (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-envigado-londono',
    houseName: 'Casa Liberales del Sur',
    level: 4,
    sphere: 'municipal',
    municipality: 'Sabaneta',
    department: 'Antioquia',
    votes2023: 1609,
    status: 'En funciones (Concejal)',
    bio: 'Concejal de Sabaneta con amplia labor de fomento a clubes deportivos y microempresarios.',
    extramunicipalConnection: 'Redes liberales metropolitanas.',
    municipalAnchor: 'Concejo de Sabaneta.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-copacabana-julian-machado',
    name: 'Julián Marcelo Machado Cadavid',
    role: 'concejal',
    roleLabel: 'Concejal de Copacabana (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-roldan-norte',
    houseName: 'Casa John Jairo Roldán / Liberales del Norte',
    level: 4,
    sphere: 'municipal',
    municipality: 'Copacabana',
    department: 'Antioquia',
    votes2023: 737,
    cedula: '15.515.272',
    status: 'En funciones (Concejal)',
    bio: 'Concejal del Partido Liberal en Copacabana, representante de las organizaciones comunitarias del norte.',
    extramunicipalConnection: 'Bancada liberal en la Asamblea de Antioquia.',
    municipalAnchor: 'Concejo de Copacabana.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-laestrella-juan-arteaga',
    name: 'Juan Pablo Arteaga Cano',
    role: 'concejal',
    roleLabel: 'Concejal de La Estrella (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-bedoya-renovacion',
    houseName: 'Casa Julián Bedoya / Renovación Liberal',
    level: 4,
    sphere: 'municipal',
    municipality: 'La Estrella',
    department: 'Antioquia',
    votes2023: 1242,
    cedula: '1.040.733.333',
    status: 'En funciones (Concejal)',
    bio: 'Concejal liberal más votado en La Estrella. Enlace territorial con redes hospitalarias y comunitarias del sur.',
    extramunicipalConnection: 'Estructura política de Julián Bedoya.',
    municipalAnchor: 'Concejo de La Estrella y sectores de La Tablaza.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-girardota-diego-congote',
    name: 'Diego Armando Congote Lopera',
    role: 'concejal',
    roleLabel: 'Concejal de Girardota (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-roldan-norte',
    houseName: 'Casa John Jairo Roldán / Liberales del Norte',
    level: 4,
    sphere: 'municipal',
    municipality: 'Girardota',
    department: 'Antioquia',
    votes2023: 1184,
    cedula: '70.329.690',
    status: 'En funciones (Concejal)',
    bio: 'Concejal más votado del Partido Liberal en Girardota.',
    extramunicipalConnection: 'Liderazgo parlamentario liberal del Norte.',
    municipalAnchor: 'Concejo de Girardota.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
  },
  {
    id: 'actor-liberal-concejal-barbosa-mauricio-marin',
    name: 'Mauricio Antonio Marín Marín',
    role: 'concejal',
    roleLabel: 'Concejal de Barbosa (Partido Liberal)',
    partyId: 'liberal',
    partyName: 'Partido Liberal Colombiano',
    houseId: 'casa-roldan-norte',
    houseName: 'Casa John Jairo Roldán / Liberales del Norte',
    level: 4,
    sphere: 'municipal',
    municipality: 'Barbosa',
    department: 'Antioquia',
    votes2023: 600,
    cedula: '70.142.871',
    status: 'En funciones (Concejal)',
    bio: 'Concejal del Partido Liberal en Barbosa, enfocado en el desarrollo agrícola y transporte intermunicipal.',
    extramunicipalConnection: 'Directorio liberal departamental.',
    municipalAnchor: 'Concejo de Barbosa.',
    socialProfiles: { verifiedOfficial: false },
    newsLinks: []
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
];

export const GRAPH_EDGES_DATA: GraphEdgeRelation[] = [
  // ==========================================
  // RELACIONES CASA TRUJILLO
  // ==========================================
  {
    id: 'edge-trujillo-restrepo',
    source: 'actor-trujillo-carlos',
    target: 'actor-restrepo-daniel',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Jefe Político Directo (Fórmula Senado-Cámara)',
    description: 'Daniel Restrepo es la fórmula incondicional de Trujillo en la Cámara de Representantes por Antioquia.'
  },
  {
    id: 'edge-trujillo-torres',
    source: 'actor-trujillo-carlos',
    target: 'actor-torres-diego',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Mentor y Patrón de Gobernanza',
    description: 'Diego Torres fue designado y respaldado unánimemente por Trujillo para retener la Alcaldía de Itagüí.'
  },
  {
    id: 'edge-trujillo-cano',
    source: 'actor-trujillo-carlos',
    target: 'actor-cano-jaime',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Línea de Mando en la Asamblea',
    description: 'Jaime Cano defiende las directrices del Equipo de Antioquia ante el Gobierno Departamental.'
  },
  {
    id: 'edge-trujillo-vallejo',
    source: 'actor-trujillo-carlos',
    target: 'actor-vallejo-mario',
    type: 'alianza_electoral',
    strength: 4,
    label: 'Pacto de Conurbación Sur',
    description: 'Acuerdo de cogobierno y respaldo presupuestal entre Itagüí y La Estrella.'
  },

  // ==========================================
  // RELACIONES CASA SUÁREZ MIRA
  // ==========================================
  {
    id: 'edge-oscar-olga',
    source: 'actor-suarez-oscar',
    target: 'actor-suarez-olga',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Núcleo Familiar / Conducción Bicéfala',
    description: 'Coordinación política y electoral de la dinastía Suárez Mira en el norte del Valle de Aburrá.'
  },
  {
    id: 'edge-suarez-gonzalez',
    source: 'actor-suarez-olga',
    target: 'actor-gonzalez-lorena',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Aval y Maquinaria Municipal',
    description: 'Lorena González fue electa con el aparato territorial y los comités barriales de los Suárez Mira.'
  },
  {
    id: 'edge-gonzalez-morales',
    source: 'actor-gonzalez-lorena',
    target: 'actor-morales-daniel',
    type: 'pacto_bancada',
    strength: 4,
    label: 'Bancada Mayoritaria de Gobierno',
    description: 'Aprobación de facultades tributarias y presupuesto municipal en el Concejo de Bello.'
  },

  // ==========================================
  // RELACIONES CASA ENVIGADO (LONDOÑO / ESPINOSA)
  // ==========================================
  {
    id: 'edge-londono-espinosa',
    source: 'actor-londono-hector',
    target: 'actor-espinosa-braulio',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Sucesión y Liderazgo Político',
    description: 'Héctor Londoño promovió a Braulio Espinosa como el nuevo líder visible de la estructura liberal.'
  },
  {
    id: 'edge-espinosa-cardona',
    source: 'actor-espinosa-braulio',
    target: 'actor-cardona-raul',
    type: 'alianza_electoral',
    strength: 5,
    label: 'Continuidad Administrativa en Envigado',
    description: 'Entrega del mando municipal y sincronización de equipos técnicos en el municipio.'
  },
  {
    id: 'edge-espinosa-peinado',
    source: 'actor-espinosa-braulio',
    target: 'actor-peinado-julian',
    type: 'pacto_bancada',
    strength: 4,
    label: 'Alianza Legislativa Liberal',
    description: 'Coordinación de iniciativas y recursos para el Valle de Aburrá en la Cámara de Representantes.'
  },

  // ==========================================
  // RELACIONES CASA CREEMOS (FICO)
  // ==========================================
  {
    id: 'edge-fico-pineda',
    source: 'actor-gutierrez-federico',
    target: 'actor-pineda-johnnatan',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Expansión Metropolitana en Copacabana',
    description: 'Triunfo histórico de Creemos en el norte metropolitano con el aval y acompañamiento de Fico.'
  },

  // ==========================================
  // RELACIONES CASA CENTRO DEMOCRÁTICO
  // ==========================================
  {
    id: 'edge-uribe-rendon',
    source: 'actor-uribe-alvaro',
    target: 'actor-rendon-andres-julian',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Respaldo Doctrinario y Aval de Gobernador',
    description: 'Rendón fue el candidato de las entrañas del uribismo para recuperar la Gobernación de Antioquia.'
  },
  {
    id: 'edge-uribe-quintero',
    source: 'actor-uribe-alvaro',
    target: 'actor-quintero-esteban',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Senador de Confianza del Expresidente',
    description: 'Esteban Quintero representa los intereses del uribismo del Oriente en el Congreso.'
  },
  {
    id: 'edge-rendon-lopez',
    source: 'actor-rendon-andres-julian',
    target: 'actor-lopez-sebastian',
    type: 'alianza_electoral',
    strength: 4,
    label: 'Cohesión Gobernación - Concejo de Medellín',
    description: 'Sinergia entre la bancada del Centro Democrático en Medellín y la administración departamental.'
  },

  // ==========================================
  // RELACIONES CASA JULIÁN BEDOYA
  // ==========================================
  {
    id: 'edge-bedoya-lopera',
    source: 'actor-bedoya-julian',
    target: 'actor-lopera-maria-eugenia',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Jefe Político / Enlace en la Cámara',
    description: 'María Eugenia Lopera actúa en estrecha coordinación estratégica con Julián Bedoya.'
  },

  // ==========================================
  // RELACIONES CASA INDEPENDIENTES
  // ==========================================
  {
    id: 'edge-quintero-upegui',
    source: 'actor-quintero-daniel',
    target: 'actor-upegui-juan-carlos',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Liderazgo Orgánico y Familiar',
    description: 'Upegui fue el candidato ungido por Quintero para defender su legado en Medellín.'
  },

  // ==========================================
  // RELACIONES INTER-CASAS (ALIANZAS Y TENSIONES DIALÉCTICAS)
  // ==========================================
  {
    id: 'edge-fico-rendon',
    source: 'actor-gutierrez-federico',
    target: 'actor-rendon-andres-julian',
    type: 'alianza_electoral',
    strength: 5,
    label: 'Pacto Institucional Medellín - Antioquia',
    description: 'Alianza estratégica entre la Alcaldía de Medellín y la Gobernación de Antioquia para proyectos conjuntos (Metro de la 80, túnel de Oriente, Hidroituango).'
  },
  {
    id: 'edge-trujillo-bedoya',
    source: 'actor-trujillo-carlos',
    target: 'actor-bedoya-julian',
    type: 'alianza_electoral',
    strength: 4,
    label: 'Pacto Transaccional de Comisiones en Bogotá',
    description: 'Coordinación táctica entre el bloque de Trujillo y el bloque de Bedoya en las comisiones económicas del Congreso.'
  },
  {
    id: 'edge-fico-quintero-tension',
    source: 'actor-gutierrez-federico',
    target: 'actor-quintero-daniel',
    type: 'tension_disputa',
    strength: 5,
    label: 'Fricción y Polarización Antagónica',
    description: 'Enfrentamiento irreconciliable entre el modelo empresarial de Fico y la narrativa de Independientes.'
  },
  {
    id: 'edge-suarez-trujillo-tension',
    source: 'actor-suarez-oscar',
    target: 'actor-trujillo-carlos',
    type: 'tension_disputa',
    strength: 4,
    label: 'Disputa por la Hegemonía Conservadora',
    description: 'Rivalidad histórica entre el conservatismo del norte (Bello) y el conservatismo del sur (Itagüí) por el control del Directorio Departamental.'
  },
  {
    id: 'edge-suarez-fico-alianza',
    source: 'actor-gonzalez-lorena',
    target: 'actor-gutierrez-federico',
    type: 'pacto_bancada',
    strength: 3,
    label: 'Acuerdo Metropolitano de Conurbación Norte',
    description: 'Pacto administrativo para solucionar el nudo de movilidad en la glorieta de Niquía y seguridad compartida.'
  }
,

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
    // Relevo de curules por renuncia en el Concejo de Medellín (Centro Democrático)
  {
    id: 'edge-cd-relevo-lopez-vasco',
    source: 'actor-lopez-sebastian',
    target: 'actor-cd-concejal-milton-vasco',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Relevo de Curul en Concejo (Mayo 2026)',
    description: 'Milton Darío Vasco Restrepo asumió la curul del Centro Democrático tras la renuncia de Sebastián López para liderar la campaña de Paloma Valencia.'
  },
  {
    id: 'edge-cd-relevo-carrasquilla-osorio',
    source: 'actor-cd-concejal-claudia-carrasquilla',
    target: 'actor-cd-concejal-jorge-osorio',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Relevo de Curul en Concejo (Agosto 2026)',
    description: 'Dr. Jorge Julián Osorio Gómez asumió la curul del Centro Democrático tras la renuncia de Claudia Carrasquilla para asumir como Viceministra de Defensa.'
  },
  {
    id: 'edge-uribe-vasco',
    source: 'actor-uribe-alvaro',
    target: 'actor-cd-concejal-milton-vasco',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Línea de Mando CD Medellín',
    description: 'Milton Vasco integra la bancada disciplinada del expresidente Álvaro Uribe en la corporación distrital.'
  },
  {
    id: 'edge-uribe-osorio',
    source: 'actor-uribe-alvaro',
    target: 'actor-cd-concejal-jorge-osorio',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Vocería Técnica y de Salud',
    description: 'Jorge Julián Osorio representa el ala académica y técnica del uribismo en el Concejo de Medellín.'
  },
  {
    id: 'edge-rendon-concejales-rionegro',
    source: 'actor-rendon-andres-julian',
    target: 'actor-cd-concejal-rionegro-lina-ciro',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Bastión del Gobernador en Oriente',
    description: 'Lina Marcela Ciro lidera la bancada leal a Andrés Julián Rendón en su feudo de Rionegro.'
  },
  {
    id: 'edge-rendon-concejales-rionegro-garcia',
    source: 'actor-rendon-andres-julian',
    target: 'actor-cd-concejal-rionegro-oscar-garcia',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Articulación Territorial CD Oriente',
    description: 'Oscar García respalda las prioridades de desarrollo vial del Gobernador Rendón en Rionegro.'
  },

  // Bancadas CD Valle de Aburrá
  {
    id: 'edge-uribe-cd-bello-duvan',
    source: 'actor-uribe-alvaro',
    target: 'actor-cd-concejal-bello-duvan-bedoya',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Bancada CD Bello',
    description: 'Duván Bedoya encabeza el bloque de concejales del Centro Democrático en Bello.'
  },
  {
    id: 'edge-uribe-cd-itagui-walter',
    source: 'actor-uribe-alvaro',
    target: 'actor-cd-concejal-itagui-walter-betancur',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Curul CD Itagüí',
    description: 'Walter Betancur representa la curul de opinión del Centro Democrático en el bastión conservador de Itagüí.'
  },
  {
    id: 'edge-uribe-cd-envigado-jhony',
    source: 'actor-uribe-alvaro',
    target: 'actor-cd-concejal-envigado-jhony-velez',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Liderazgo Oposición en Envigado',
    description: 'Jhony Vélez ejerce la vocería de más de 27.000 ciudadanos en el Concejo de Envigado.'
  },
  {
    id: 'edge-uribe-cd-sabaneta-restrepo',
    source: 'actor-uribe-alvaro',
    target: 'actor-cd-concejal-sabaneta-jose-restrepo',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Bancada CD Sabaneta',
    description: 'José Daniel Restrepo ejerce control a la densificación urbana en Sabaneta.'
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
    id: 'edge-fico-delacuesta',
    source: 'actor-gutierrez-federico',
    target: 'actor-creemos-concejal-juan-delacuesta',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Liderazgo Deportivo y Cívico',
    description: 'Juan Carlos De La Cuesta lidera los proyectos de infraestructura deportiva distrital.'
  },
  {
    id: 'edge-fico-sabaneta-montoya',
    source: 'actor-gutierrez-federico',
    target: 'actor-creemos-concejal-sabaneta-ivan',
    type: 'alianza_electoral',
    strength: 5,
    label: 'Expansión de Creemos en Sabaneta',
    description: 'Iván Alonso Montoya defiende las banderas de Creemos en el sur del Valle de Aburrá.'
  },
  {
    id: 'edge-fico-copacabana-gomez',
    source: 'actor-gutierrez-federico',
    target: 'actor-creemos-concejal-copacabana-carlos-gomez',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Bancada Creemos Copacabana',
    description: 'Carlos Alberto Gómez respalda al alcalde Johnnatan Pineda en Copacabana.'
  },
  {
    id: 'edge-fico-caldas-mesa',
    source: 'actor-gutierrez-federico',
    target: 'actor-creemos-concejal-caldas-raul-mesa',
    type: 'alianza_electoral',
    strength: 4,
    label: 'Líder Oposición en Caldas',
    description: 'Raúl Alejandro Mesa encabeza la oposición institucional de Creemos en Caldas.'
  },

  // Conexiones Conservador (Casa Trujillo y Casa Blanco)
  {
    id: 'edge-trujillo-concejales-itagui-arcila',
    source: 'actor-trujillo-carlos',
    target: 'actor-conservador-concejal-itagui-andres-arcila',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Control Hegemónico Equipo de Antioquia',
    description: 'Andrés Camilo Arcila responde con lealtad cerrada a las directrices de Trujillo en Itagüí.'
  },
  {
    id: 'edge-trujillo-concejales-itagui-restrepo',
    source: 'actor-trujillo-carlos',
    target: 'actor-conservador-concejal-itagui-jorge-restrepo',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Mesa Directiva Itagüí',
    description: 'Jorge Iván Restrepo coordina las iniciativas de gobierno en el Concejo de Itagüí.'
  },
  {
    id: 'edge-trujillo-concejales-medellin-arenas',
    source: 'actor-trujillo-carlos',
    target: 'actor-conservador-concejal-medellin-brisvani-arenas',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Curul de Trujillo en Medellín',
    description: 'Brisvani Arenas coordina la presencia del Equipo de Antioquia en la capital del departamento.'
  },
  {
    id: 'edge-blanco-concejales-medellin-jimenez',
    source: 'actor-blanco-conservadora',
    target: 'actor-conservador-concejal-medellin-ramon-jimenez',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Curul Conservatismo Institucional',
    description: 'Juan Ramón Jiménez articula la agenda ambiental con el senador Germán Blanco.'
  },
  {
    id: 'edge-suarez-concejales-bello-gomez',
    source: 'actor-gonzalez-lorena',
    target: 'actor-conservador-concejal-bello-gustavo-gomez',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Bancada de Gobierno en Bello',
    description: 'Gustavo Gómez apoya los proyectos estratégicos de la alcaldesa Lorena González.'
  },

  // Conexiones Liberal (Casa Londoño/Espinosa, Roldán y Bedoya)
  {
    id: 'edge-londono-concejales-envigado-restrepo',
    source: 'actor-londono-hector',
    target: 'actor-liberal-concejal-envigado-pablo-restrepo',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Hegemonía Liberal de Envigado',
    description: 'Pablo Restrepo preside la corporación y asegura la continuidad de los planes liberales.'
  },
  {
    id: 'edge-espinosa-concejales-envigado-david',
    source: 'actor-espinosa-braulio',
    target: 'actor-liberal-concejal-envigado-david-londono',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Gobernabilidad Liberal Envigado',
    description: 'David Londoño garantiza la disciplina de bancada del liberalismo en Envigado.'
  },
  {
    id: 'edge-roldan-concejal-medellin-farley',
    source: 'actor-roldan-norte',
    target: 'actor-liberal-concejal-medellin-farley',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Curul del Senador Roldán en Medellín',
    description: 'Farley Macías es el vocero exclusivo de la Casa John Jairo Roldán en el Concejo de Medellín.'
  },
  {
    id: 'edge-roldan-concejal-bello-mosquera',
    source: 'actor-roldan-norte',
    target: 'actor-liberal-concejal-bello-carlos-mosquera',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Bancada Liberal en Bello',
    description: 'Carlos Mosquera articula las bases liberales de Bello con el Congreso.'
  },
  {
    id: 'edge-bedoya-concejal-itagui-zuleta',
    source: 'actor-bedoya-julian',
    target: 'actor-liberal-concejal-itagui-elkin-zuleta',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Representación Liberal en Itagüí',
    description: 'Elkin Zuleta mantiene el enlace electoral con Renovación Liberal en el sur.'
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
];

export const MASTER_POLITICAL_GRAPH: PoliticalGraphData = {
  houses: POLITICAL_HOUSES_DATA,
  nodes: GRAPH_NODES_DATA,
  edges: GRAPH_EDGES_DATA
};

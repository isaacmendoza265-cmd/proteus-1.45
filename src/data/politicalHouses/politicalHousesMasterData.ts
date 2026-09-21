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
    id: 'actor-tobon-andres',
    name: 'Andrés Felipe Tobón Villada',
    role: 'concejal',
    roleLabel: 'Presidente del Concejo de Medellín / Vocero de Creemos',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 43795,
    cedula: '1.152.189.793',
    status: 'En funciones (Concejal)',
    bio: 'Politólogo, exsecretario de Seguridad de Medellín durante el primer mandato de Fico. Fue el concejal más votado de Medellín en las elecciones de 2023.',
    extramunicipalConnection: 'Articulación con centros de pensamiento de seguridad urbana en Colombia y Latinoamérica.',
    municipalAnchor: 'Concejo de Medellín, comités locales de seguridad y vigilancia barrial.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/AndresFelipeTV',
      instagram: 'https://instagram.com/andrestobonv',
      verifiedOfficial: true
    },
    newsLinks: [
      {
        title: 'Andrés Tobón, el hombre fuerte de Fico en el Concejo de Medellín',
        source: 'El Colombiano',
        snippet: 'Tobón lidera la aprobación del Plan de Desarrollo de Medellín.',
        year: 2024,
        sentiment: 'positivo'
      }
    ]
  },
  {
    id: 'actor-pineda-johnnatan',
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
  {
    id: 'actor-bedout-alejandro',
    name: 'Alejandro De Bedout Arango',
    role: 'concejal',
    roleLabel: 'Concejal de Medellín (Creemos)',
    houseId: 'casa-creemos-fico',
    houseName: 'Casa Creemos (Federico Gutiérrez)',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 11115,
    cedula: '10.376.006.12',
    status: 'En funciones (Concejal)',
    bio: 'Exsecretario de la Juventud. Representa el ala de desarrollo económico y emprendimiento joven dentro de Creemos.',
    extramunicipalConnection: 'Redes de jóvenes y clústeres empresariales.',
    municipalAnchor: 'Comunas 11 (Laureles), 14 (Poblado) y 16 (Belén).',
    socialProfiles: {
      xTwitter: 'https://twitter.com/AlejoDeBedout'
    },
    newsLinks: []
  },

  // ==========================================
  // CASA CENTRO DEMOCRÁTICO (ORIENTE / RENDÓN / URIBE)
  // ==========================================
  {
    id: 'actor-uribe-alvaro',
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
    name: 'Sebastián López Valencia',
    role: 'concejal',
    roleLabel: 'Líder del Centro Democrático / Concejal de Medellín',
    houseId: 'casa-cd-oriente-rendon',
    houseName: 'Casa Centro Democrático / Paico - Uribe - Rendón',
    level: 4,
    sphere: 'municipal',
    municipality: 'Medellín',
    department: 'Antioquia',
    votes2023: 42444,
    cedula: '98.764.731',
    status: 'En funciones (Cabeza de lista CD 2023)',
    bio: 'Sobrino de Fabio Valencia Cossio. Fue el concejal más votado del Centro Democrático en Medellín, destacándose por su oposición férrea a Daniel Quintero.',
    extramunicipalConnection: 'Conexión con el clan Valencia Cossio y directiva nacional del CD.',
    municipalAnchor: 'Comunas de clase media y alta de Medellín.',
    socialProfiles: {
      xTwitter: 'https://twitter.com/SebastianLopezV',
      instagram: 'https://instagram.com/sebastianlopezv'
    },
    newsLinks: []
  },

  // ==========================================
  // CASA JULIÁN BEDOYA / RENOVACIÓN LIBERAL
  // ==========================================
  {
    id: 'actor-bedoya-julian',
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
    id: 'edge-fico-tobon',
    source: 'actor-gutierrez-federico',
    target: 'actor-tobon-andres',
    type: 'jerarquia_directa',
    strength: 5,
    label: 'Jefe Político / Presidencia del Concejo',
    description: 'Andrés Tobón es el principal lugarteniente de Federico Gutiérrez en el Concejo de Medellín.'
  },
  {
    id: 'edge-fico-pineda',
    source: 'actor-gutierrez-federico',
    target: 'actor-pineda-johnnatan',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Expansión Metropolitana en Copacabana',
    description: 'Triunfo histórico de Creemos en el norte metropolitano con el aval y acompañamiento de Fico.'
  },
  {
    id: 'edge-fico-bedout',
    source: 'actor-gutierrez-federico',
    target: 'actor-bedout-alejandro',
    type: 'jerarquia_directa',
    strength: 4,
    label: 'Bancada Creemos Medellín',
    description: 'Voto disciplinado de la bancada mayoritaria en el Concejo de Medellín.'
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
];

export const MASTER_POLITICAL_GRAPH: PoliticalGraphData = {
  houses: POLITICAL_HOUSES_DATA,
  nodes: GRAPH_NODES_DATA,
  edges: GRAPH_EDGES_DATA
};

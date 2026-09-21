import { CriminalityRecord } from './types';

export const CRIMINALITY_DATA: Record<number, CriminalityRecord> = {
  1: {
    communeId: 1,
    communeName: 'Popular',
    extorsionHogaresPct: 10,
    extorsionNegociosPct: 37,
    extorsionAlcaldiaPct: 3,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Alto',
    indiceGobiernoCombo: 0.42,
    indiceGobiernoEstado: 0.38,
    indiceGobiernoRelativo: -0.04,
    combosCountEst: 25,
    bandasDominantes: ['Los Triana', 'San Pablo', 'La 38', 'La Galera'],
    funcionesGobiernoEjercidas: [
      'Cobro de vacunas a pequeños comercios y transporte',
      'Resolución de disputas entre vecinos y violencia intrafamiliar',
      'Cobro de deudas personales y fiados en tiendas',
      'Regulación de ruido y convivencia comunitaria',
      'Préstamos gota a gota y control de plazas de vicio',
      'Monopolio de productos básicos (arepas, huevos, gas)'
    ],
    governanceLevel: 'Dominante',
    summaryPDF: 'Según la Encuesta sobre Gobierno Criminal (CIEF EAFIT-Chicago-IPA, 2020), en la Comuna 1 Popular el 37% de los negocios y el 10% de los hogares pagan extorsión ("vacuna"). Existe una brecha masiva frente a las encuestas oficiales de la Alcaldía (3%) y las denuncias formales (0.00%). Los combos ejercen funciones estatales activas en más de 25 sectores barriales.',
    summaryPeerReviewed: 'Estudios de Blattman, Duncan, Lessing y Tobón (APSR 2023) identifican a la Comuna Popular como un bastión histórico de gobernanza criminal paralela, donde los combos imponen reglas de comportamiento y resuelven conflictos por la proximidad constante (24/7) y el uso disuasivo de la fuerza.',
    summaryPressAndOfficial: 'Informes del Sistema de Información para la Seguridad y Convivencia (SISC) y notas de prensa de El Colombiano registran disputas históricas por corredores de microtráfico y extorsión al transporte público informal en sectores como Santo Domingo, Granizal y Carpinelo.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2 e Índices de Gobierno Criminal (EAFIT / U. Chicago / IPA).',
      peerReviewed: 'Blattman et al. (2023) "Gang Rule: Understanding and Countering Criminal Governance", APSR; Lessing (2020).',
      press: 'El Colombiano / Análisis Urbano — Informes de orden público y estructuras del nororiente.',
      official: 'SISC Alcaldía de Medellín & SPOA Fiscalía General de la Nación (2018-2024).'
    }
  },
  2: {
    communeId: 2,
    communeName: 'Santa Cruz',
    extorsionHogaresPct: 41,
    extorsionNegociosPct: 69,
    extorsionAlcaldiaPct: 8,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Muy Alto',
    indiceGobiernoCombo: 0.48,
    indiceGobiernoEstado: 0.35,
    indiceGobiernoRelativo: -0.13,
    combosCountEst: 18,
    bandasDominantes: ['Los Triana', 'Aranjuez/La 38', 'La Silla', 'Mano de Dios'],
    funcionesGobiernoEjercidas: [
      'Cobro sistemático de vacuna a 69% de comercios de barrio',
      'Extorsión directa a 41% de hogares residenciales',
      'Control y monopolio de distribución de insumos básicos',
      'Resolución obligatoria de querellas e impagos entre vecinos',
      'Vigilancia y patrullaje armado en fronteras barriales',
      'Regulación estricta de préstamos gota a gota'
    ],
    governanceLevel: 'Dominante',
    summaryPDF: 'Santa Cruz registra los niveles de extorsión y gobierno criminal más altos de todo Medellín según el PDF CIEF (2020): el 69% de los negocios y el 41% de los hogares pagan vacuna. La hegemonía territorial de la banda Los Triana suprime las denuncias formales (0.00%) y supera la intervención efectiva del Estado.',
    summaryPeerReviewed: 'Investigaciones de Barrientos, Gallón & Tobón (2015) y Lessing (2020) destacan a Santa Cruz como el ejemplo supremo de extracción de rentas y captura del orden social barrial, donde la extorsión funciona como un impuesto no oficial universal.',
    summaryPressAndOfficial: 'Fiscalía General de la Nación y SISC reportan un subregistro absoluto de denuncias por temor a represalias de Los Triana en barrios como La Francia, Andalucia y Sinaí.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2 (Incidencia de Extorsión) y Mapa 2 (Gobierno Relativo).',
      peerReviewed: 'Barrientos, Gallón & Tobón (2015); Lessing (2020) "Legitimacy in Criminal Governance", APSR.',
      press: 'El Colombiano / La Silla Vacía — Reportajes sobre el imperio de Los Triana en el río.',
      official: 'SISC Alcaldía de Medellín / Fiscalía DECOC (Dirección contra Crimen Organizado).'
    }
  },
  3: {
    communeId: 3,
    communeName: 'Manrique',
    extorsionHogaresPct: 5,
    extorsionNegociosPct: 9,
    extorsionAlcaldiaPct: 1,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Moderado',
    indiceGobiernoCombo: 0.38,
    indiceGobiernoEstado: 0.41,
    indiceGobiernoRelativo: +0.03,
    combosCountEst: 22,
    bandasDominantes: ['La Terraza', 'San Pablo', 'Los Triana', 'La Viña'],
    funcionesGobiernoEjercidas: [
      'Cobro de vacuna a rutas de transporte y acopios',
      'Control de plazas de vicio en laderas altas',
      'Intermediación en conflictos entre vecinos y robos locales',
      'Financiación mediante préstamos gota a gota',
      'Regulación de piques ilegales y ruido nocturno en zonas específicas'
    ],
    governanceLevel: 'Alto',
    summaryPDF: 'En Manrique, el CIEF (2020) reporta que el 9% de negocios y el 5% de hogares pagan extorsión. Pese a una mayor presencia institucional por el corredor del Metroplús, bandas históricas como La Terraza y La Viña mantienen células territoriales muy activas.',
    summaryPeerReviewed: 'Giraldo, Rendón & Duncan (2014) documentan cómo en Manrique la delincuencia migró de la confrontación abierta hacia la captación silenciosa de rentas e intermediación social.',
    summaryPressAndOfficial: 'SISC y Fiscalía señalan operativos constantes contra cabecillas de La Viña dedicados al fogueo de hurtos de alta gama en la ciudad y extorsión a buses de Manrique Guadalupe.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2.',
      peerReviewed: 'Giraldo, Rendón & Duncan (2014) "Nuevas modalidades de captación de rentas ilegales".',
      press: 'El Colombiano / Análisis Urbano.',
      official: 'SISC Alcaldía de Medellín (2019-2025).'
    }
  },
  4: {
    communeId: 4,
    communeName: 'Aranjuez',
    extorsionHogaresPct: 6,
    extorsionNegociosPct: 17,
    extorsionAlcaldiaPct: 3,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Moderado',
    indiceGobiernoCombo: 0.36,
    indiceGobiernoEstado: 0.42,
    indiceGobiernoRelativo: +0.06,
    combosCountEst: 20,
    bandasDominantes: ['La 38', 'Aranjuez', 'La Terraza', 'Los del Rayo'],
    funcionesGobiernoEjercidas: [
      'Cobro de vacuna a comerciantes del corredor de la 92',
      'Control de microtráfico y plazas de vicio barriales',
      'Resolución de disputas por linderos y arrendamientos',
      'Prevención de robos no autorizados por el combo',
      'Cobro de cartera e impagos informales'
    ],
    governanceLevel: 'Moderado',
    summaryPDF: 'El CIEF (2020) señala que el 17% de los comercios y el 6% de los hogares pagan vacuna en Aranjuez. El índice de gobierno del Estado (0.42) supera ligeramente al del combo (0.36), influenciado por equipamientos culturales y universitarios cercanos.',
    summaryPeerReviewed: 'Martin (2012) analiza la trayectoria de la banda La 38 en Aranjuez como uno de los actores con mayor continuidad histórica desde los años 90 en el nororiente de la ciudad.',
    summaryPressAndOfficial: 'Informes del SISC destacan intervenciones policiales alrededor del Parque de Aranjuez y la carrera 45 contra estructuras de microtráfico y cobro de cuotas semanales.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2.',
      peerReviewed: 'Martin, G. (2012) "Medellín: Tragedia y resurrección"; Blattman et al. (2020).',
      press: 'El Colombiano / Minuto30.',
      official: 'SISC / Policía Metropolitana del Valle de Aburrá (MEVAL).'
    }
  },
  5: {
    communeId: 5,
    communeName: 'Castilla',
    extorsionHogaresPct: 13,
    extorsionNegociosPct: 26,
    extorsionAlcaldiaPct: 2,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Alto',
    indiceGobiernoCombo: 0.41,
    indiceGobiernoEstado: 0.39,
    indiceGobiernoRelativo: -0.02,
    combosCountEst: 28,
    bandasDominantes: ['Los Machacos', 'Los Mondongueros', 'Picacho', 'El Astar'],
    funcionesGobiernoEjercidas: [
      'Extorsión a 26% de los comercios y 13% de hogares',
      'Vigilancia y seguridad informales de calles y bulevares',
      'Sanción y castigo por violencias o hurtos no permitidos',
      'Regulación del mercado de drogas al detal (plazas de vicio)',
      'Monopolio en la distribución de huevos y pollo en ferias',
      'Redes de préstamos gota a gota'
    ],
    governanceLevel: 'Dominante',
    summaryPDF: 'Castilla presenta una de las tasas de extorsión a negocios más elevadas del noroccidente (26% en comercios, 13% en hogares). El CIEF (2020) muestra que combos como Los Machacos y Los Mondongueros disputan la autoridad territorial directa al Estado.',
    summaryPeerReviewed: 'Investigaciones de Duncan (2014) y Tobón et al. (2020) citan a Castilla como un epicentro de "conspires" o monopolios comerciales criminales impuestos a distribuidores de alimentos.',
    summaryPressAndOfficial: 'SISC y Fiscalía registran capturas frecuentes de coordinadores de zona de Los Mondongueros dedicados al cobro extorsivo en los corredores comerciales de la 68 y Bulevar de la 65.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2 y Sección 3.1.',
      peerReviewed: 'Duncan, G. (2014); Tobón & Valencia (2015); Blattman et al. (2023).',
      press: 'El Colombiano / El Tiempo — Crónicas sobre Los Mondongueros y Los Machacos.',
      official: 'SISC Alcaldía de Medellín & Fiscalía General de la Nación.'
    }
  },
  6: {
    communeId: 6,
    communeName: 'Doce de Octubre',
    extorsionHogaresPct: 8,
    extorsionNegociosPct: 21,
    extorsionAlcaldiaPct: 4,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Alto',
    indiceGobiernoCombo: 0.43,
    indiceGobiernoEstado: 0.37,
    indiceGobiernoRelativo: -0.06,
    combosCountEst: 24,
    bandasDominantes: ['Picacho', 'Picachito', 'Los Triana', 'La Cordillera'],
    funcionesGobiernoEjercidas: [
      'Cobro de cuotas de seguridad a 21% de comerciantes',
      'Justicia por mano propia y arbitraje en altercados domésticos',
      'Control de fronteras invisibles entre sectores altos',
      'Regulación de expendios de estupefacientes',
      'Cobro de deudas y préstamos usureros'
    ],
    governanceLevel: 'Dominante',
    summaryPDF: 'En la Comuna 6, el 21% de los negocios paga vacuna y el índice de gobierno del combo (0.43) supera al del Estado (0.37). Las laderas del Picacho concentran sectores donde las comunidades acuden antes a los combos que a la Policía para resolver problemas cotidianos.',
    summaryPeerReviewed: 'Blattman & Lessing (2020) documentan la estructura jerárquica de la banda El Picacho, la cual coordina más de 20 combos subordinados en el noroccidente de la ciudad.',
    summaryPressAndOfficial: 'SISC ubica al Doce de Octubre entre las comunas con mayor presencia de fronteras invisibles históricas y operativos contra redes de extorsión a buses urbanos.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2 y Mapa 2.',
      peerReviewed: 'Blattman & Lessing (2020) "Legitimacy in Criminal Governance", APSR.',
      press: 'El Colombiano / Q\'hubo.',
      official: 'SISC Alcaldía de Medellín / Policía Nacional.'
    }
  },
  7: {
    communeId: 7,
    communeName: 'Robledo',
    extorsionHogaresPct: 6,
    extorsionNegociosPct: 19,
    extorsionAlcaldiaPct: 4,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Alto',
    indiceGobiernoCombo: 0.40,
    indiceGobiernoEstado: 0.38,
    indiceGobiernoRelativo: -0.02,
    combosCountEst: 35,
    bandasDominantes: ['Robledo (Los Triana)', 'El Astar', 'Los Curvitos', 'Los Pesebreros'],
    funcionesGobiernoEjercidas: [
      'Cobro de vacuna a 19% de comercios y transporte público',
      'Control de parcelaciones e invasiones de lotes (loteo ilegal)',
      'Resolución de disputas entre residentes de nuevas urbanizaciones',
      'Monopolio de venta de gas propano y productos básicos',
      'Patrullajes de vigilancia en sectores periféricos'
    ],
    governanceLevel: 'Dominante',
    summaryPDF: 'Robledo es la comuna con el mayor número absoluto de combos estimados (~35 combos). El CIEF (2020) muestra un 19% de extorsión a negocios y un fenómeno extendido de loteo ilegal e imposición de "impuestos" sobre la construcción informal.',
    summaryPeerReviewed: 'Investigaciones de EAFIT destacan la fragmentación interna de la articulación "Robledo" y su poder coercitivo sobre proyectos de vivienda de interés social y transporte.',
    summaryPressAndOfficial: 'Informes de la Fiscalía DECOC resaltan la desarticulación periódica de cabecillas de Los Pesebreros y Los Curvitos dedicados al despojo de tierras y extorsión.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2 y Sección 2.',
      peerReviewed: 'Giraldo-Ramírez & Preciado-Restrepo (2015); Blattman et al. (2023).',
      press: 'El Colombiano / Telemedellín.',
      official: 'SISC Alcaldía de Medellín & Fiscalía General de la Nación.'
    }
  },
  8: {
    communeId: 8,
    communeName: 'Villa Hermosa',
    extorsionHogaresPct: 6,
    extorsionNegociosPct: 7,
    extorsionAlcaldiaPct: 3,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Moderado',
    indiceGobiernoCombo: 0.39,
    indiceGobiernoEstado: 0.40,
    indiceGobiernoRelativo: +0.01,
    combosCountEst: 20,
    bandasDominantes: ['La Sierra', 'Caicedo', 'Los Julio', 'El Pan de Azúcar'],
    funcionesGobiernoEjercidas: [
      'Extorsión focalizada a 7% de comercios y rutas de transporte',
      'Regulación de asentamientos informales en la parte alta',
      'Cobro por parqueo e invasión de vías públicas',
      'Intermediación en riñas callejeras y cobro de deudas',
      'Redes de microtráfico en laderas'
    ],
    governanceLevel: 'Alto',
    summaryPDF: 'El CIEF (2020) registra que el 7% de negocios y 6% de hogares pagan vacuna en Villa Hermosa. En la parte alta (La Sierra, Golondrinas), la presencia de combos histórica otorga un peso determinante a la autoridad criminal local.',
    summaryPeerReviewed: 'Estudios del Centro Nacional de Memoria Histórica (2017) y Arias (2006) analizan la transformación del control armado en La Sierra desde milicias hasta combos organizados.',
    summaryPressAndOfficial: 'SISC reporta monitoreo constante de las fronteras entre Villa Hermosa y Buenos Aires por la influencia histórica de la estructura criminal Caicedo.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2.',
      peerReviewed: 'CNMH (2017) "Medellín: memorias de una guerra urbana"; Lessing (2017).',
      press: 'El Colombiano / Análisis Urbano.',
      official: 'SISC Alcaldía de Medellín.'
    }
  },
  9: {
    communeId: 9,
    communeName: 'Buenos Aires',
    extorsionHogaresPct: 3,
    extorsionNegociosPct: 9,
    extorsionAlcaldiaPct: 3,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Moderado',
    indiceGobiernoCombo: 0.35,
    indiceGobiernoEstado: 0.43,
    indiceGobiernoRelativo: +0.08,
    combosCountEst: 18,
    bandasDominantes: ['Caicedo', 'La Milagrosa', 'Los Chamizos', 'El Vergel'],
    funcionesGobiernoEjercidas: [
      'Cobro de vacuna a 9% de comercios de barrio y vendedores',
      'Control de microtráfico y plazas de vicio',
      'Sanción selectiva de hurtos no autorizados en el sector',
      'Prestamos usureros gota a gota'
    ],
    governanceLevel: 'Moderado',
    summaryPDF: 'En Buenos Aires, la encuesta CIEF (2020) ubica la extorsión a negocios en 9% y a hogares en 3%. El desarrollo del sistema Tranvía de Ayacucho ha fortalecido la gobernanza estatal (0.43 vs 0.35 del combo).',
    summaryPeerReviewed: 'Tobón & Valencia (2015) analizan la estructura rentable de la organización Caicedo en la zona centro-oriental como proveedora mayorista de drogas y servicios de cobro.',
    summaryPressAndOfficial: 'Informes del SISC muestran estabilidad relativa en homicidios e intervenciones en el corredor de Ayacucho.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2.',
      peerReviewed: 'Barrientos, Gallón & Tobón (2015).',
      press: 'El Colombiano.',
      official: 'SISC Alcaldía de Medellín.'
    }
  },
  10: {
    communeId: 10,
    communeName: 'La Candelaria (Centro)',
    extorsionHogaresPct: 11,
    extorsionNegociosPct: 23,
    extorsionAlcaldiaPct: 1,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Alto',
    indiceGobiernoCombo: 0.40,
    indiceGobiernoEstado: 0.41,
    indiceGobiernoRelativo: +0.01,
    combosCountEst: 30,
    bandasDominantes: ['La Terraza', 'Los Caicedo', 'Los Triana', 'Convividores / La 38'],
    funcionesGobiernoEjercidas: [
      'Cobro extorsivo sistemático a 23% de comercios y 11% de inquilinatos/hogares',
      'Cobro de "vigilancia" a miles de vendedores informales y venteros ambulantes',
      'Regulación del espacio público no oficial y parqueaderos',
      'Manejo de redes masivas de microtráfico y prostíbulos',
      'Solución coercitiva de disputas comerciales y deudas en el centro'
    ],
    governanceLevel: 'Alto',
    summaryPDF: 'La Candelaria (Centro) registra un 23% de extorsión comercial y 11% en hogares/inquilinatos en el CIEF (2020). La presencia masiva de población flotante genera un modelo de gobernanza criminal enfocado en cobro de pisos a vendedores informales y plazas de vicio.',
    summaryPeerReviewed: 'Giraldo et al. (2014) y Durán-Martínez (2015) estudian el centro de Medellín como el mercado criminal más denso en rentas ilegales y extorsión al comercio formal e informal.',
    summaryPressAndOfficial: 'SISC y Fiscalía informan capturas continuas de integrantes de "Convividores" e hilos de La Terraza operando en sectores como El Hueco, Guayaquil y Pradito.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2 y Sección 2.',
      peerReviewed: 'Durán-Martínez, A. (2015) "Drugs around the corner"; Giraldo et al. (2014).',
      press: 'El Colombiano / La Silla Vacía — Informes sobre la mafia del centro.',
      official: 'SISC Alcaldía de Medellín & Fiscalía General de la Nación.'
    }
  },
  11: {
    communeId: 11,
    communeName: 'Laureles - Estadio',
    extorsionHogaresPct: 0,
    extorsionNegociosPct: 14,
    extorsionAlcaldiaPct: 1,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Moderado',
    indiceGobiernoCombo: 0.15,
    indiceGobiernoEstado: 0.58,
    indiceGobiernoRelativo: +0.43,
    combosCountEst: 5,
    bandasDominantes: ['La Agonía', 'San Pablo (Rentas sofisticadas)', 'La 38'],
    funcionesGobiernoEjercidas: [
      'Extorsión selectiva a 14% de locales comerciales y restaurantes',
      'Lavadito de activos y rentas en negocios gastronómicos',
      'Hurto focalizado de fogueo (motos/relojes) por bandas externas',
      'Nulo ejercicio de gobernanza social o resolución de disputas residenciales'
    ],
    governanceLevel: 'Focalizado/Bajo',
    summaryPDF: 'En Laureles - Estadio no existe gobierno criminal residencial (0% extorsión a hogares; índice combo 0.15 vs 0.58 del Estado). Sin embargo, el CIEF (2020) detecta que el 14% de establecimientos comerciales paga cuotas extorsivas bajo modalidades de mayor sofisticación.',
    summaryPeerReviewed: 'Blattman et al. (2020, 2023) aclaran que en comunas de estratos 4-5 el crimen organizado opera como predador de rentas comerciales y financiero, sin ejercer autoridad comunitaria.',
    summaryPressAndOfficial: 'Informes del SISC destacan que Laureles presenta la mayor presencia estatal institucional y patrullajes, enfocado en contener fogueos de fleteo y hurto a comercios.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2 y Mapa 1.',
      peerReviewed: 'Blattman et al. (2023) "Gang Rule", APSR.',
      press: 'El Colombiano.',
      official: 'SISC Alcaldía de Medellín / Policía Nacional.'
    }
  },
  12: {
    communeId: 12,
    communeName: 'La América',
    extorsionHogaresPct: 0,
    extorsionNegociosPct: 8,
    extorsionAlcaldiaPct: 1,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Bajo',
    indiceGobiernoCombo: 0.22,
    indiceGobiernoEstado: 0.52,
    indiceGobiernoRelativo: +0.30,
    combosCountEst: 8,
    bandasDominantes: ['San Javier / La Agonía', 'Robledo', 'Los Pesebreros'],
    funcionesGobiernoEjercidas: [
      'Cobro de vacuna a 8% de comercios de corredores limítrofes',
      'Microtráfico en puntos limítrofes con San Javier',
      'Sin gobernanza comunitaria sobre residentes urbanos'
    ],
    governanceLevel: 'Focalizado/Bajo',
    summaryPDF: 'La América registra 0% de extorsión a hogares y un 8% en comercios según el CIEF (2020). La gobernanza del Estado (0.52) prevalece ampliamente sobre las estructuras ilegales.',
    summaryPeerReviewed: 'Investigaciones de EAFIT señalan que La América funciona como zona de amortiguación entre el centro-occidente y las laderas de San Javier, con incursiones externas de combos colindantes.',
    summaryPressAndOfficial: 'SISC reporta bajos índices comparativos de criminalidad violenta e indicadores de seguridad estables.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2.',
      peerReviewed: 'Blattman et al. (2020); Giraldo & Preciado (2015).',
      press: 'El Colombiano.',
      official: 'SISC Alcaldía de Medellín.'
    }
  },
  13: {
    communeId: 13,
    communeName: 'San Javier',
    extorsionHogaresPct: 4,
    extorsionNegociosPct: 30,
    extorsionAlcaldiaPct: 5,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Alto',
    indiceGobiernoCombo: 0.42,
    indiceGobiernoEstado: 0.36,
    indiceGobiernoRelativo: -0.06,
    combosCountEst: 28,
    bandasDominantes: ['La Agonía', 'El Salado', 'La Divisa', 'Los de la 115', 'Betania'],
    funcionesGobiernoEjercidas: [
      'Cobro de vacuna a 30% de comerciantes y rutas de transporte',
      'Extorsión a operadores turísticos y guías informales de las escaleras',
      'Regulación de conflictos entre vecinos y desacuerdos familiares',
      'Imposición de fronteras invisibles y vigilancia barrial',
      'Control de rutas de distribución de estupefacientes'
    ],
    governanceLevel: 'Dominante',
    summaryPDF: 'San Javier (Comuna 13) tiene una extorsión del 30% en negocios y 4% en hogares en la Encuesta CIEF (2020). A pesar de la visibilidad internacional del urbanismo social (escaleras eléctricas y turismo), los combos (La Agonía, El Salado) mantienen un índice de gobierno (0.42) superior al estatal (0.36).',
    summaryPeerReviewed: 'Martin (2012) y Blattman et al. (2023) abordan la paradoja de la Comuna 13: innovación urbana mundial coexistiendo con una sofisticada estructura de gobierno criminal no ostentoso pero omnipresente.',
    summaryPressAndOfficial: 'SISC y Fiscalía DECOC registran capturas de cabecillas dedicados a la extorsión del transporte público y cobros a comercios del corredor del Metrocable.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2 y Mapa 2.',
      peerReviewed: 'Martin (2012); Blattman et al. (2023) "Gang Rule", APSR.',
      press: 'El Colombiano / Telemedellín — Coberturas sobre seguridad en la Comuna 13.',
      official: 'SISC Alcaldía de Medellín & Fiscalía General de la Nación.'
    }
  },
  14: {
    communeId: 14,
    communeName: 'El Poblado',
    extorsionHogaresPct: 5,
    extorsionNegociosPct: 0,
    extorsionAlcaldiaPct: 0,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Bajo',
    indiceGobiernoCombo: 0.08,
    indiceGobiernoEstado: 0.65,
    indiceGobiernoRelativo: +0.57,
    combosCountEst: 3,
    bandasDominantes: ['La Oficina (Redes financieras)', 'San Pablo (Lavado)'],
    funcionesGobiernoEjercidas: [
      'Extorsión sofisticada / cobro de protección a grandes hoteles/discotecas',
      'Tráfico de estupefacientes de alto perfil y prostitución en zonas rosas',
      'Nula gobernanza o control comunitario en barrios residenciales'
    ],
    governanceLevel: 'Mínimo/Residual',
    summaryPDF: 'El Poblado presenta el menor nivel de gobierno criminal de Medellín (índice combo 0.08 vs 0.65 del Estado). El CIEF (2020) no registra control territorial ni resolución de conflictos por combos en vecindarios residenciales.',
    summaryPeerReviewed: 'Lessing (2020) señala que en zonas de altos ingresos como El Poblado las bandas actúan exclusivamente como inversionistas o redes de lavado de activos y microtráfico especializado.',
    summaryPressAndOfficial: 'SISC ubica a El Poblado como la comuna con mayor presencia policial preventiva y menores tasas de extorsión de barrio, enfocada en contener el hurto a personas y vehículos.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2 y Mapa 1.',
      peerReviewed: 'Lessing, B. (2020) "Legitimacy in Criminal Governance", APSR.',
      press: 'El Colombiano.',
      official: 'SISC Alcaldía de Medellín.'
    }
  },
  15: {
    communeId: 15,
    communeName: 'Guayabal',
    extorsionHogaresPct: 0,
    extorsionNegociosPct: 3,
    extorsionAlcaldiaPct: 1,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Bajo',
    indiceGobiernoCombo: 0.25,
    indiceGobiernoEstado: 0.50,
    indiceGobiernoRelativo: +0.25,
    combosCountEst: 10,
    bandasDominantes: ['La 24', 'Raya', 'El Cristo'],
    funcionesGobiernoEjercidas: [
      'Cobro de vacuna a 3% de industrias y bodegas locales',
      'Microtráfico en zonas de ocio e industriales',
      'Control limitado en barrios residenciales como La Colina'
    ],
    governanceLevel: 'Focalizado/Bajo',
    summaryPDF: 'En Guayabal el CIEF (2020) reporta 0% extorsión a hogares y 3% a negocios. Predomina la gobernanza estatal (0.50) sobre la injerencia delictiva (0.25).',
    summaryPeerReviewed: 'Estudios de la U. de A. destacan la configuración industrial de Guayabal, donde las rentas criminales se enfocan en parqueaderos e insumos más que en la población residencial.',
    summaryPressAndOfficial: 'SISC registra estabilidad en homicidios e indicadores de convivencia en Guayabal.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2.',
      peerReviewed: 'Barrientos, Gallón & Tobón (2015).',
      press: 'El Colombiano.',
      official: 'SISC Alcaldía de Medellín.'
    }
  },
  16: {
    communeId: 16,
    communeName: 'Belén',
    extorsionHogaresPct: 3,
    extorsionNegociosPct: 4,
    extorsionAlcaldiaPct: 3,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Moderado',
    indiceGobiernoCombo: 0.28,
    indiceGobiernoEstado: 0.51,
    indiceGobiernoRelativo: +0.23,
    combosCountEst: 22,
    bandasDominantes: ['Belén Rincón', 'Los Alpinos', 'Altavista (Incursiones)', 'La Esquina'],
    funcionesGobiernoEjercidas: [
      'Cobro de vacuna a 4% de comercios y 3% de hogares en sectores periféricos (Rincón, Zafra)',
      'Control de microtráfico en parques barriales',
      'Intermediación en conflictos en la zona suroccidental alta'
    ],
    governanceLevel: 'Moderado',
    summaryPDF: 'En Belén, la encuesta CIEF (2020) refleja un 4% de extorsión a comercios y 3% en hogares. La gobernanza del Estado (0.51) supera significativamente a los combos (0.28), aunque sectores de ladera como Belén Rincón o Zafra sufren mayor presión.',
    summaryPeerReviewed: 'Blattman et al. (2020) utilizan a Belén como contraste frente a comunas de alto gobierno criminal como Santa Cruz, destacando que en Belén la medición de extorsión de la Alcaldía (3%) coincide casi con la del estudio CIEF (3%).',
    summaryPressAndOfficial: 'SISC y Policía Nacional registran patrullajes continuos en los límites entre Belén y el corregimiento de Altavista.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Tabla 2 y Sección 3.3.',
      peerReviewed: 'Blattman et al. (2020) "Gobierno criminal en Medellín".',
      press: 'El Colombiano / Q\'hubo.',
      official: 'SISC Alcaldía de Medellín.'
    }
  },
  50: {
    communeId: 50,
    communeName: 'San Sebastián de Palmitas',
    extorsionHogaresPct: 1,
    extorsionNegociosPct: 2,
    extorsionAlcaldiaPct: 1,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Mínimo',
    indiceGobiernoCombo: 0.05,
    indiceGobiernoEstado: 0.60,
    indiceGobiernoRelativo: +0.55,
    combosCountEst: 2,
    bandasDominantes: ['Estructuras externas rurales / Microtráfico'],
    funcionesGobiernoEjercidas: [
      'Tráfico local menor de estupefacientes',
      'Sin control ni gobernanza armada sobre la comunidad campesina'
    ],
    governanceLevel: 'Mínimo/Residual',
    summaryPDF: 'San Sebastián de Palmitas no presenta registro de control territorial efectivo ni gobernanza criminal por combos según el estudio CIEF (2020), manteniéndose como el corregimiento más seguro de Medellín.',
    summaryPeerReviewed: 'Análisis territoriales de EAFIT destacan que la baja densidad y economía campesina de Palmitas desincentivan la formación de combos urbanos.',
    summaryPressAndOfficial: 'SISC registra las menores tasas de delitos violentos y extorsión del municipio.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Mapa 1.',
      peerReviewed: 'Giraldo-Ramírez & Preciado-Restrepo (2015).',
      press: 'El Colombiano.',
      official: 'SISC Alcaldía de Medellín.'
    }
  },
  60: {
    communeId: 60,
    communeName: 'San Cristóbal',
    extorsionHogaresPct: 5,
    extorsionNegociosPct: 15,
    extorsionAlcaldiaPct: 3,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Moderado',
    indiceGobiernoCombo: 0.38,
    indiceGobiernoEstado: 0.39,
    indiceGobiernoRelativo: +0.01,
    combosCountEst: 12,
    bandasDominantes: ['Robledo (Incursiones)', 'La Loma', 'Los Triana'],
    funcionesGobiernoEjercidas: [
      'Cobro de vacuna a 15% de comerciantes y rutas intermunicipales',
      'Extorsión a distribuidores de hortalizas y carga agrícola',
      'Resolución ilegal de disputas de tierras y linderos veredales',
      'Cobro de peajes informales en trochas rurales'
    ],
    governanceLevel: 'Alto',
    summaryPDF: 'En San Cristóbal, el CIEF (2020) ubica la extorsión comercial en 15% y la de hogares en 5%. Combos articulados con Robledo ejercen presión sobre los sectores en proceso de urbanización rápida y rutas de transporte hacia el occidente.',
    summaryPeerReviewed: 'Tobón et al. (2020) estudian la expansión de la gobernanza criminal desde Robledo hacia las veredas del corregimiento de San Cristóbal.',
    summaryPressAndOfficial: 'SISC e informes de la Fiscalía señalan capturas periódicas de cobradores extorsivos en la centralidad de San Cristóbal y el sector La Loma.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Mapa 1.',
      peerReviewed: 'Tobón & Valencia (2015); Blattman et al. (2023).',
      press: 'El Colombiano / Minuto30.',
      official: 'SISC Alcaldía de Medellín / Fiscalía DECOC.'
    }
  },
  70: {
    communeId: 70,
    communeName: 'Altavista',
    extorsionHogaresPct: 12,
    extorsionNegociosPct: 28,
    extorsionAlcaldiaPct: 4,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Alto',
    indiceGobiernoCombo: 0.45,
    indiceGobiernoEstado: 0.34,
    indiceGobiernoRelativo: -0.11,
    combosCountEst: 10,
    bandasDominantes: ['Los Chivos', 'Los Pájaros', 'Mano de Dios', 'Altavista'],
    funcionesGobiernoEjercidas: [
      'Extorsión a 28% de ladrilleras, acopios y comercios locales',
      'Imposición de fronteras invisibles entre veredas y sectores',
      'Control y peajes a la extracción de materiales de cantera',
      'Resolución violenta de pleitos veredales y cobro de deudas',
      'Imposición de reglas de conducta y confinamiento veredal'
    ],
    governanceLevel: 'Dominante',
    summaryPDF: 'Altavista es el corregimiento con mayor injerencia criminal de Medellín (índice combo 0.45 vs 0.34 del Estado, con 28% de extorsión a comercios y 12% a hogares). La disputa histórica entre Los Chivos y Los Pájaros ha configurado una severa gobernanza armada perimetral.',
    summaryPeerReviewed: 'Duncan (2014) y Martin (2012) analizan el caso de Altavista como un feudo criminal caracterizado por la captura de rentas de la industria alfarera y ladrillera tradicional.',
    summaryPressAndOfficial: 'SISC y la Secretaría de Seguridad han priorizado intervenciones de la fuerza pública en Altavista debido a picos históricos de violencia armadas y desplazamiento intraurbano.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Mapa 1 y Mapa 2.',
      peerReviewed: 'Duncan, G. (2014); Martin, G. (2012); Blattman et al. (2020).',
      press: 'El Colombiano / Análisis Urbano — Crónicas del conflicto en Altavista.',
      official: 'SISC Alcaldía de Medellín & Policía Nacional MEVAL.'
    }
  },
  80: {
    communeId: 80,
    communeName: 'San Antonio de Prado',
    extorsionHogaresPct: 6,
    extorsionNegociosPct: 18,
    extorsionAlcaldiaPct: 3,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Alto',
    indiceGobiernoCombo: 0.37,
    indiceGobiernoEstado: 0.40,
    indiceGobiernoRelativo: +0.03,
    combosCountEst: 14,
    bandasDominantes: ['El Limonar', 'La 24', 'Los del Prado'],
    funcionesGobiernoEjercidas: [
      'Cobro de vacuna a 18% de comercios y transporte colectivo',
      'Sanción de conductas en urbanizaciones de gran escala (El Limonar)',
      'Préstamos gota a gota y control de expendios de drogas',
      'Resolución de disputas comunitarias en zonas de alta densidad'
    ],
    governanceLevel: 'Alto',
    summaryPDF: 'En San Antonio de Prado, el CIEF (2020) estima un 18% de extorsión en comercios y 6% en hogares. Por su dimensión urbana masiva, combos locales como El Limonar ejercen funciones de control social y cobro de vacuna al transporte público.',
    summaryPeerReviewed: 'Investigaciones de EAFIT documentan cómo la densificación acelerada de San Antonio de Prado sobrepasó la infraestructura estatal, facilitando el afianzamiento de combos del suroccidente.',
    summaryPressAndOfficial: 'SISC y Fiscalía informan sobre operativos frecuentes contra la banda El Limonar por extorsión a buses y comerciantes.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Mapa 1.',
      peerReviewed: 'Giraldo et al. (2014); Blattman et al. (2023).',
      press: 'El Colombiano / Minuto30.',
      official: 'SISC Alcaldía de Medellín.'
    }
  },
  90: {
    communeId: 90,
    communeName: 'Santa Elena',
    extorsionHogaresPct: 1,
    extorsionNegociosPct: 3,
    extorsionAlcaldiaPct: 1,
    extorsionDenunciasPct: 0.0,
    extorsionLevel: 'Mínimo',
    indiceGobiernoCombo: 0.08,
    indiceGobiernoEstado: 0.58,
    indiceGobiernoRelativo: +0.50,
    combosCountEst: 3,
    bandasDominantes: ['La Sierra (Incursiones limítrofes)'],
    funcionesGobiernoEjercidas: [
      'Microtráfico en zonas turísticas o festivales',
      'Sin control territorial sobre la comunidad silletera'
    ],
    governanceLevel: 'Mínimo/Residual',
    summaryPDF: 'Santa Elena no registra control territorial ni ejercicio de gobierno criminal por combos sobre la población residente según el estudio CIEF (2020), preservando la institucionalidad estatal y la tradición campesina.',
    summaryPeerReviewed: 'Análisis de la U. de Antioquia resaltan la alta cohesión comunitaria y capital social de Santa Elena como barrera natural contra el asentamiento de combos armados.',
    summaryPressAndOfficial: 'SISC reporta baja incidencia delictiva general y atención enfocada en la temporada turística y la Feria de las Flores.',
    sourcesHierarchy: {
      pdf: 'Nota de Política CIEF N°01 (2020), Mapa 1.',
      peerReviewed: 'Barrientos, Gallón & Tobón (2015).',
      press: 'El Colombiano.',
      official: 'SISC Alcaldía de Medellín.'
    }
  }
};

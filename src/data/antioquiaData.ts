import { GoogleGenAI } from "@google/genai";

export const PALOMA_BIO = `El programa de articulación de Personas Estratégicas y Análisis Electoral está diseñado para identificar liderazgos clave, perfilar sus habilidades y maximizar el impacto de las campañas y visiones de gobierno en las regiones. A través de la evaluación cuantitativa y cualitativa de datos de votación, indicadores socioeconómicos NBI y análisis del perfil psicológico-político, se determinan las mejores estrategias de comunicación y propuestas puntuales para alcaldías, concejos y gobernaciones. El enfoque se centra en capacitar y alinear liderazgos regionales de alto impacto bajo principios de libertad individual, eficiencia de mercado, orden y libre empresa.
Contempla la consistencia en el apoyo a los sectores agropecuario, industrial y tecnológico regionales, así como la defensa del derecho de los ciudadanos a la libre iniciativa privada.`;

export const PALOMA_PROGRAM = [
  {
    title: "PROSPERIDAD Y EMPRENDIMIENTO",
    points: [
      "Menos impuestos, mejores salarios para los trabajadores.",
      "Crédito popular subsidiado: no más gota a gota para los jovenes emprendedores, microempresarios, tenderos y campesinos.",
      "Oportunidades para los informales: ser formal sin trabas ni costos.",
      "Reactivar inversión privada para generar empleo y nuevas oportunidades.",
      "Ahorro pensional desde la cuna: con opción de escoger pensión o vivienda.",
      "Subsidios a madres cabeza de hogar, adultos mayores y a jóvenes que quieran estudiar en ciclo corto.",
      "Campo seguro y competitivo, con crédito barato para los campesinos, alianzas entre pequeños y grandes empresarios y transformación productiva."
    ]
  },
  {
    title: "SEGURIDAD INTEGRAL",
    points: [
      "Autoridad y firmeza: seguridad para el desarrollo.",
      "4 R’s: 1. Reducción de ingresos de los criminales. 2. Robustecer las Fuerzas Militares y de Policía. 3. Reenamorar las comunidades. 4. Restablecer la legalidad.",
      "Que vivir sin miedo sea una realidad."
    ]
  },
  {
    title: "SALUD Y BIENESTAR",
    points: [
      "Más medicamentos, menos filas. Más camas, menos pasillos. Más médicos, menos espera.",
      "Soluciones a la deuda de la salud.",
      "Incentivos para mejorar la atención del paciente.",
      "Mejores ingresos para médicos y enfermeras y pago a tiempo.",
      "Hospitales padrinos para acompañar en las regiones apartadas.",
      "Hospitales públicos vigilados y controlados.",
      "Libertad para elegir asegurador: público, privado o solidario."
    ]
  },
  {
    title: "DESARROLLO SOCIAL CON CORAZÓN GRANDE",
    points: [
      "Trabajo digno, más formalidad laboral y empresarial.",
      "Educación de calidad para todos; jornada extracurricular en deporte y cultura.",
      "Oportunidades para los jóvenes: tecnología, emprendimiento y pago por estudiar.",
      "Protección a los adultos mayores con subsidio, salud y cultura.",
      "Apoyo a las madres cabeza de hogar con subsidios y proyectos productivos.",
      "Apoyo a las familias: Familias fuertes."
    ]
  }
];

export const MUNICIPALITY_DETAILS: Record<string, {
  category: string;
  demographics: {
    total: string;
    gender: { male: number; female: number };
    ageGroups: { label: string; value: number }[];
    ethnic: string;
    displacement: string;
  };
  socioeconomic: {
    unemployment: string;
    publicServices: string;
    hdi: string;
    nbi?: string;
    health: string;
    urbanRural: { urban: number; rural: number };
  };
  security: {
    homicideRate: string;
    otherCrimes: string;
    armedGroups: string;
  };
}> = {
  "Segovia": {
    category: "6",
    demographics: {
      total: "~42,000",
      gender: { male: 52, female: 48 },
      ageGroups: [{ label: "0-19", value: 30 }, { label: "20-39", value: 45 }, { label: "40-64", value: 17 }, { label: "65+", value: 8 }],
      ethnic: "Mestizo/Blanco con influencia afro ligada a la minería.",
      displacement: "Altísimo desplazamiento forzado: Tanto expulsor histórico como epicentro de confinamiento paramilitar (2023-2024)."
    },
    socioeconomic: {
      unemployment: "Hiper-informalidad minera (60% de ocupación urbana). Cadena aurífera sin garantías sociales.",
      publicServices: "Graves deficiencias en agua potable real; presencia de mercurio y arsénico ambiental.",
      hdi: "IDH Medio-Bajo (Índice de Pobreza Multidimensional alto en ruralidad).",
      health: "Mortalidad infantil prevalente por deficiencia de acceso a UCIs y exposición a químicos.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Históricamente catalogado entre los municipios más letales del país.",
      otherCrimes: "Altísima incidencia de desaparición forzada y extorsión del gramaje extraído de oro.",
      armedGroups: "Zona de guerra abierta: Clan del Golfo (AGC), ELN y Disidencias FARC (Estructura 4)."
    }
  },
  "Remedios": {
    category: "6",
    demographics: {
      total: "~31,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-24', value: 40 }, { label: '25-64', value: 50 }, { label: '65+', value: 10 }],
      ethnic: "Etnia blanco-mestiza mayoritaria.",
      displacement: "Desplazamiento forzado activo intra-veredal por avanzada de las AGC en 2024."
    },
    socioeconomic: {
      unemployment: "Dependencia abrumadora de la minería aurífera y maderera. Informalidad desbordada de barequeros.",
      publicServices: "Dificultades agudas para acceso unificado de acueducto por loteos espontáneos invasivos.",
      hdi: "IDH Medio-Bajo.",
      health: "Acceso sanitario Nivel 1; todo trauma bélico o civil va remitido vía Medellín.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Tasa de homicidios fluctuante (picos por batallas en límites con Segovia).",
      otherCrimes: "'Vacuna' generalizada. Corredor armamentístico.",
      armedGroups: "Disputado por ELN, frente residual FARC y AGC. Veredas 'cercadas' e incomunicadas."
    }
  },
  "Amalfi": {
    category: "6",
    demographics: {
      total: "~24,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 28 }, { label: '15-64', value: 62 }, { label: '65+', value: 10 }],
      ethnic: "Principalmente blanco-mestizo.",
      displacement: "Municipio de posconflicto, en reconstrucción lenta tras azote de los 90s."
    },
    socioeconomic: {
      unemployment: "Desempleo de ~6-8%. Economía agraria diversa (café, panela, cacao y silvicultura).",
      publicServices: "Mejor nivel urbano en redes que sus pares del polo minero.",
      hdi: "IDH Medio.",
      health: "Mortalidad infantil estabilizada; posee el hospital nivel 1 más funcional de la sub-zona.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Baja sustancial del homicidio fáctico pero recrudecimiento del control social.",
      otherCrimes: "Cobro de cuotas extorsivas a finqueros y negocios de plaza.",
      armedGroups: "Hegemonía silenciosa pero aplastante del Clan del Golfo (AGC). Ejercen justicia en Juntas Comunales."
    }
  },
  "Anorí": {
    category: "6",
    demographics: {
      total: "~18,000",
      gender: { male: 52, female: 48 },
      ageGroups: [{ label: '0-14', value: 26 }, { label: '15-64', value: 64 }, { label: '65+', value: 10 }],
      ethnic: "Mestizo. Reductos indígenas nómadas sin territorialidad formalizada.",
      displacement: "Histórico núcleo guerrillero; escenario militar durísimo."
    },
    socioeconomic: {
      unemployment: "Desempleo latente ligado al choque tras la caída del negocio de hoja de coca.",
      publicServices: "Veredas sin pavimentación formal ni redes eléctricas estables (municipio boscoso).",
      hdi: "IDH Bajo (Mucha pobreza multidimensional del cultivador campesino raso).",
      health: "Acceso médico Nivel 1. Mortalidad infantil por fiebres endémicas selváticas.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Recientes crímenes letales vinculados a disputas de control minero periférico.",
      otherCrimes: "'Plan pistola' latente histórico y uso de explosivos en su extensa jurisdicción.",
      armedGroups: "Disidencia estructural extrema; Frente 36 FARC y presencia vital del ELN."
    }
  },
  "Cisneros": {
    category: "6",
    demographics: {
      total: "~9,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 18 }, { label: '15-64', value: 65 }, { label: '65+', value: 17 }],
      ethnic: "Sin etnia nativa.",
      displacement: "Receptor de desplazamiento indirecto en época de los 90s."
    },
    socioeconomic: {
      unemployment: "Alto desempleo formal. Antiguo puerto de acopio férreo/vial.",
      publicServices: "Alta cobertura de servicios (100% urbano).",
      hdi: "IDH Medio.",
      health: "Sanidad óptima nivel primario.",
      urbanRural: { urban: 80, rural: 20 }
    },
    security: {
      homicideRate: "Es altamente pacífico hoy día. Homicidios interanuales tienden a cero.",
      otherCrimes: "Exposición a extorsión 'Falso Servicio' y robo ocasional en vías del Río Nus.",
      armedGroups: "Ausencia de grupos armados instalados."
    }
  },
  "San Roque": {
    category: "6",
    demographics: {
      total: "~20,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 65 }, { label: '65+', value: 15 }],
      ethnic: "Campesinado blanco-mestizo.",
      displacement: "Historial de desplazamiento paramilitar antes del proceso con AUC."
    },
    socioeconomic: {
      unemployment: "Depende de agricultura de trapiches paneleros y ganadería. Alza minera (Proyecto Gramalote).",
      publicServices: "Zonas minero-agrícolas con carencia hídrica sana total.",
      hdi: "IDH Medio-Bajo.",
      health: "Servicios fragmentados; corregimientos acuden a Medellín/Maceo.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Homicidio selectivo a pequeña escala por rentas esporádicas.",
      otherCrimes: "Repunte de microtráfico asociado al flujo de población flotante minera.",
      armedGroups: "Corredor limítrofe (Puerto Berrío-Nordeste); AGC maneja la periferia."
    }
  },
  "Santo Domingo": {
    category: "6",
    demographics: {
      total: "~10,500",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 63 }, { label: '65+', value: 15 }],
      ethnic: "Sin etnia.",
      displacement: "No posee gran historial expulsor macro moderno."
    },
    socioeconomic: {
      unemployment: "Agricultura de autoconsumo, panela y turismo literario. Empleo juvenil pobre.",
      publicServices: "Red urbana estabilizada.",
      hdi: "IDH Medio-Bajo (Agotamiento del relevo agropecuario).",
      health: "Maternidad y trauma migran al hospital de Barbosa (subregión Aburrá).",
      urbanRural: { urban: 25, rural: 75 }
    },
    security: {
      homicideRate: "Tranquilidad estadísticamente hablando, similar a Cisneros.",
      otherCrimes: "Infracciones de convivencia, problemas menores de salud pública psicoactiva.",
      armedGroups: "Presencia sutil criminal de retaguardia, sin afectación violenta continua."
    }
  },
  "Yolombó": {
    category: "6",
    demographics: {
      total: "~25,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 24 }, { label: '15-64', value: 66 }, { label: '65+', value: 10 }],
      ethnic: "Mestizos.",
      displacement: "Afectación media-alta rural por incursiones antiguas del ELN."
    },
    socioeconomic: {
      unemployment: "Capital y cruce del clúster panelero más grande de Antioquia. Pagos precarizados.",
      publicServices: "85% Urbano cubierto. Acueductos rurales son trampas biosanitarias en sequía.",
      hdi: "IDH Medio.",
      health: "Posee un Hospital de segundo nivel funcional y vital para el área del Río Porce.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Tasa moderada. Homicidios atados a control social y ajustes de cuentas.",
      otherCrimes: "Amenazas extorsivas y robo a fincas en épocas de cosecha panelera.",
      armedGroups: "Influencia total en retaguardia del Clan del Golfo."
    }
  },
  "Vegachí": {
    category: "6",
    demographics: {
      total: "~12,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 26 }, { label: '15-64', value: 64 }, { label: '65+', value: 10 }],
      ethnic: "Mestizo.",
      displacement: "Asimiló gran parte del dolor paramilitar adyacente del Magdalena Medio."
    },
    socioeconomic: {
      unemployment: "Eje comercial cañicultor fuerte 'Trapiche Central'.",
      publicServices: "Casco urbano de topografía amable permite excelente despliegue de alcantarillado.",
      hdi: "IDH Medio.",
      health: "Mortalidad infantil en control urbano.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Ocasionales entre capataces de las economías criminales locales o riñas civiles.",
      otherCrimes: "Altísima incidencia subregistrada de extorsión 'falsa' telefónica.",
      armedGroups: "Presencia Clan del Golfo (AGC)."
    }
  },
  "Yalí": {
    category: "6",
    demographics: {
      total: "~8,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 65 }, { label: '65+', value: 15 }],
      ethnic: "Mestizo.",
      displacement: "Impactado como corredor guerrillero del siglo pasado."
    },
    socioeconomic: {
      unemployment: "Altísima dependencia de la ganadería, minería de escala menor y panela. Desempleo formal alto.",
      publicServices: "Sufre drásticos razonamientos de agua en el casco urbano por verano extremo.",
      hdi: "IDH Medio-Bajo (Vulnerabilidad Hídrica enorme).",
      health: "Requiere remisiones forzosas en urgencias no básicas.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Es el de menor conflictividad bélica letal del clúster cañero.",
      otherCrimes: "Microtráfico urbano tolerado/impuesto y abigeato de ganado.",
      armedGroups: "Red de abastecimiento para las guardias invisibles del grupo AGC."
    }
  },
  "Ituango": {
    category: "6",
    demographics: {
      total: "~26,500",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: "0-14", value: 25 }, { label: "15-64", value: 65 }, { label: "65+", value: 10 }],
      ethnic: "Clave y fuerte núcleo de indígenas Emberá Eyábida.",
      displacement: "Máximo generador de desplazamiento en Antioquia: Sufrió las peores masacres (Aro, Granja) y mega-desplazamiento recurrente."
    },
    socioeconomic: {
      unemployment: "Desempleo oculto por economías informales/ilícitas profundas; alta demanda del café en cosecha.",
      publicServices: "Ruralidad con déficit total hídrico tras la modificación climática e hídrica de afluentes del río Cauca.",
      hdi: "IDH Bajo (Miseria profunda rural agudizada).",
      health: "Muerte intrahospitalaria reducida pero altísimo trauma infantil nutricional.",
      urbanRural: { urban: 25, rural: 75 }
    },
    security: {
      homicideRate: "Epicentro rojo y zona de guerra directa (Tasa elevadísima histórica de muertes).",
      otherCrimes: "Instalación masiva de Minas Antipersonal (MAP) en laderas de control y desaparición forzada.",
      armedGroups: "Disputa encarnizada entre Disidencias de FARC (Frente 18 y 36) contra estructuras AGC."
    }
  },
  "Santa Rosa de Osos": {
    category: "4",
    demographics: {
      total: "~38,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 65 }, { label: '65+', value: 14 }],
      ethnic: "Blanca-mestiza y religiosidad devota histórica.",
      displacement: "Municipio receptor principal de la cuenca cafetera circundante asediada."
    },
    socioeconomic: {
      unemployment: "Pleno empleo formalizado (Colanta); estabiliza la economía de jornal fijo.",
      publicServices: "Red urbanística excelente (98%), estanco en potabilización lechera rural.",
      hdi: "IDH Alto.",
      health: "Posee un hospital vital estratégico intermedio en la subregión.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Alta tasa comparativa municipal originada por venganzas selectivas urbanas.",
      otherCrimes: "Epidemia de extorsión carcelaria (Llamadas 'boleteo').",
      armedGroups: "Rentas pasivas en manos de escuadras periféricas urbanas."
    }
  },
  "Donmatías": {
    category: "5",
    demographics: {
      total: "~24,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 66 }, { label: '65+', value: 13 }],
      ethnic: "Blanco-mestizo.",
      displacement: "Expulsión rural baja moderna."
    },
    socioeconomic: {
      unemployment: "Capital de la maquila textil de exportación, acopia una masiva fuerza empleadora.",
      publicServices: "Reto en colapso de plantas de tratamiento de agua residuales por vertimientos porcícolas.",
      hdi: "IDH Medio-Alto.",
      health: "Acceso a salud estable.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Muy pacífico; crímenes atados exclusivamente al sicariato focal de drogas.",
      otherCrimes: "Explotación comercial nocturna irregular.",
      armedGroups: "No operan subversivos activos orgánicos directos."
    }
  },
  "San Pedro de los Milagros": {
    category: "4",
    demographics: {
      total: "~28,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 66 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo/blancos, conservadores.",
      displacement: "No expulsor fuerte."
    },
    socioeconomic: {
      unemployment: "Dependencia del 80% sobre la industria transformadora lechera y agroinsumos.",
      publicServices: "Cobertura de red urbana excelente pero déficit grave rural en zonas de invasión.",
      hdi: "IDH Alto.",
      health: "Acceso a salud de calidad.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Tasas bajas.",
      otherCrimes: "Los 'Apartamenteros' y hurto a maquinaria agroindustrial pesada son el pan diario.",
      armedGroups: "Roces de influencia expansiva metropolitana del combo 'Pachelly'."
    }
  },
  "Valdivia": {
    category: "6",
    demographics: {
      total: "~23,500",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 24 }, { label: '15-64', value: 64 }, { label: '65+', value: 12 }],
      ethnic: "Fuerte cuota afrocolombiana, mestizo andino.",
      displacement: "Sufrió desplazamiento por inundación (Crisis Ituango 2018) y exilio crónico por tomas."
    },
    socioeconomic: {
      unemployment: "Informalidad sobrepasando el 80%. Agricultura de supervivencia.",
      publicServices: "En el cañón el agua no se potabiliza.",
      hdi: "IDH Bajo (Agravado post contingencia Hidroituango).",
      health: "Dependencia hospitalaria externa (remisión a Yarumal o Caucasia).",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Retos agudos y quemas intermitentes de camiones (terrorismo vial).",
      otherCrimes: "Fletes ilegales logísticos del cruce Urabá - Valle de Aburrá - Magdalena.",
      armedGroups: "Coexisten en tensa balanza el Clan del Golfo, ELN y disidencia."
    }
  },
  "Briceño": {
    category: "6",
    demographics: {
      total: "~8,500",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 24 }, { label: '15-64', value: 63 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo de cordillera profunda.",
      displacement: "Sufrió 'vaciado poblacional' parcial e indirecto reciente por combates activos."
    },
    socioeconomic: {
      unemployment: "Altísima dependencia histórica temporal de hoja de coca y minería.",
      publicServices: "Servicios pésimos e inestables dependientes del fluido cordillerano.",
      hdi: "IDH Bajo.",
      health: "Crisis humanitaria extrema por confinamientos.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Epicentro dramático de control territorial y terror. 'Muerte en campo'.",
      otherCrimes: "Confinamientos campesinos bajo pena de muerte (Toques de queda).",
      armedGroups: "Guerra de aniquilación pura entre AGC y disidencias FARC."
    }
  },
  "Campamento": {
    category: "6",
    demographics: {
      total: "~8,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 23 }, { label: '15-64', value: 63 }, { label: '65+', value: 14 }],
      ethnic: "Mestizos.",
      displacement: "Tránsito frecuente histórico de desplazamiento temporal por miedo a fuegos cruzados."
    },
    socioeconomic: {
      unemployment: "Economía mono-centrada exitosa en la exportación base de Panela purificada.",
      publicServices: "Acueductos vulnerables veredales y poca cobertura vial pavimentada.",
      hdi: "IDH Medio-Bajo (Brecha de conexión terrestre grave).",
      health: "Retos en salud rural.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Tasa moderada y sorpresivamente contenida de guerra letal por acuerdos entre bandos.",
      otherCrimes: "Extorsión del saco de panela y multas de convivencia comunitarias.",
      armedGroups: "Dominado históricamente por Frente 36 FARC y ELN, hoy regulado por AGC."
    }
  },
  "Toledo": {
    category: "6",
    demographics: {
      total: "~4,500",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 64 }, { label: '65+', value: 16 }],
      ethnic: "Mestizos.",
      displacement: "Afectado por inundaciones y megaproyectos."
    },
    socioeconomic: {
      unemployment: "Depende del resarcimiento logístico e impuestos de Hidroituango.",
      publicServices: "Infraestructura local recibió chorros PDET / EPM de pavimentación.",
      hdi: "IDH Medio-Bajo.",
      health: "Retos en salud rural.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Agobiado en sus límites lejanos de zona alta por disputas de disidencias.",
      otherCrimes: "Extorsión focalizada.",
      armedGroups: "Disidencias armadas en emboscadas contra fuerza pública."
    }
  },
  "San Andrés de Cuerquia": {
    category: "6",
    demographics: {
      total: "~6,500",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 64 }, { label: '65+', value: 16 }],
      ethnic: "Mestizos.",
      displacement: "Fuga de nuevos profesionales técnicos hacia el Valle de Aburrá."
    },
    socioeconomic: {
      unemployment: "Altos índices de inactividad técnica en la plaza principal.",
      publicServices: "Ruralidad sufre falta de alcantarillas y vías a prueba de derrumbes.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Estadísticamente de bajísima letalidad de guerra propia (paz estadística).",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Patrullazos contra frentes 18 FARC y combos paramilitares."
    }
  },
  "Entrerríos": {
    category: "6",
    demographics: {
      total: "~11,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 66 }, { label: '65+', value: 14 }],
      ethnic: "Mestizo-blanco.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Economía bovina lechera potentísima, de las más sofisticadas del Cono Sur.",
      publicServices: "Garantiza estabilidad social que bloquea el rebusque informal.",
      hdi: "IDH Alto impulsado.",
      health: "Salud de calidad.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "'Oasis gélido de paz estadística'.",
      otherCrimes: "Robos menores a estancos y hurto perimetral ganadero.",
      armedGroups: "Carecen de redes complejas subversivas."
    }
  },
  "Belmira": {
    category: "6",
    demographics: {
      total: "~6,800",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 66 }, { label: '65+', value: 14 }],
      ethnic: "Mestizo-blanco.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Truchicultura floreciente y turismo atronador en los Páramos.",
      publicServices: "Aguas vírgenes de sus propias fuentes montañosas sin contaminación.",
      hdi: "IDH Alto impulsado.",
      health: "Salud básica.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "'Oasis gélido de paz estadística'.",
      otherCrimes: "Hurto perimetral ganadero.",
      armedGroups: "Carecen de redes complejas subversivas."
    }
  },
  "Gómez Plata": {
    category: "6",
    demographics: {
      total: "~12,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 65 }, { label: '65+', value: 15 }],
      ethnic: "Población blanca 'paisa conservadora'.",
      displacement: "Pirámides avejentadas por falta de universidades."
    },
    socioeconomic: {
      unemployment: "Economía de servicios y comercio formal incipiente.",
      publicServices: "Red urbana estabilizada y saneada.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Crímenes pasionales cívicos esporádicos.",
      otherCrimes: "Delitos vinculados al alcohol.",
      armedGroups: "No actúan comandos estructurales letales."
    }
  },
  "Carolina del Príncipe": {
    category: "6",
    demographics: {
      total: "~4,200",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 18 }, { label: '15-64', value: 66 }, { label: '65+', value: 16 }],
      ethnic: "Población blanca 'paisa conservadora'.",
      displacement: "Jardín turístico de casas de verano y pensionados."
    },
    socioeconomic: {
      unemployment: "Turismo de fin de semana da respiro a locales comerciales.",
      publicServices: "Urbanamente cubierto, rural abandonado a los lodos viales.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Mantiene estadísticas pacíficas.",
      otherCrimes: "Tránsito temporal de delitos menores.",
      armedGroups: "No actúan comandos estructurales letales."
    }
  },
  "Guadalupe": {
    category: "6",
    demographics: {
      total: "~6,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 65 }, { label: '65+', value: 15 }],
      ethnic: "Población blanca 'paisa conservadora'.",
      displacement: "Pirámides avejentadas."
    },
    socioeconomic: {
      unemployment: "Industria maderera forestal artificial de pinos que emplea esporádicamente.",
      publicServices: "Red urbana estabilizada y saneada.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Delitos menores.",
      armedGroups: "No actúan comandos estructurales letales."
    }
  },
  "San José de la Montaña": {
    category: "6",
    demographics: {
      total: "~3,800",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 18 }, { label: '15-64', value: 67 }, { label: '65+', value: 15 }],
      ethnic: "Blanca-mestiza (cultura de ruana estricta).",
      displacement: "No presenta éxodos por control paramilitar histórico."
    },
    socioeconomic: {
      unemployment: "Carentes de industria pesada; minifundista lechero y cría de cerdos.",
      publicServices: "Carencia increíble de placa huella real hacia Santa Rosa o San Andrés.",
      hdi: "IDH Medio-Bajo (Sin riesgo de hacinamientos).",
      health: "Suplida con economías cooperadas locales eficientes de alimento.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Exento del radar homicida anual a niveles macro (cero casos repetitivos).",
      otherCrimes: "Operabilidad en paz total impidiendo entrada a micro-tráfico.",
      armedGroups: "Resguardo gélido civil."
    }
  },
  "Angostura": {
    category: "6",
    demographics: {
      total: "~11,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 64 }, { label: '65+', value: 14 }],
      ethnic: "Mestizo-Católico riguroso a la orden apostólica de su 'Padre Marianito'.",
      displacement: "Afectado colateralmente por ex-frentes norteños paramilitares."
    },
    socioeconomic: {
      unemployment: "Turismo de peregrinación religiosa los fines de semana da respiro.",
      publicServices: "Urbanamente cubierto, rural abandonado a los lodos viales.",
      hdi: "IDH Medio-Bajo (Aislado a 3 hrs de las sub-capitales).",
      health: "Salud básica.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Mantiene estadísticas pacíficas.",
      otherCrimes: "Justicia comunitaria elimina el robo menor mediante intimidación.",
      armedGroups: "Presencia en veredas de escuadrones que encargan de dictaminar justicia."
    }
  },
  "Medellín": {
    category: "Especial",
    demographics: {
      total: "~2,650,000",
      gender: { male: 48, female: 52 },
      ageGroups: [{ label: "0-14", value: 17.5 }, { label: "15-64", value: 67 }, { label: "65+", value: 15.5 }],
      ethnic: "Melting-pot; cabildos interurbanos y comunidades afro en laderas.",
      displacement: "Mega receptor histórico nacional de desplazados armados."
    },
    socioeconomic: {
      unemployment: "~9% (Generadora de servicios, salud y turismo).",
      publicServices: "99% de cobertura oficial; problemas de 'desconexión por hambre'.",
      hdi: "Alto a nivel macro; Desigualdad de GINI atrófica.",
      health: "Acceso médico pleno (clúster especializado); mortalidad infantil mínima.",
      urbanRural: { urban: 96, rural: 4 }
    },
    security: {
      homicideRate: "Inferior a 15/100k habs (Histórico a la baja).",
      otherCrimes: "Explotación sexual comercial (ESCNNA) y extorsión barrial.",
      armedGroups: "Gobernanza interna de combos herederos de 'La Oficina'."
    }
  },
  "Apartadó": {
    category: "2",
    demographics: {
      total: "~130,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: "0-24", value: 43 }, { label: "25-64", value: 47 }, { label: "65+", value: 10 }],
      ethnic: "Fuerte presencia afrodescendiente.",
      displacement: "Receptor urbano de población joven desplazada."
    },
    socioeconomic: {
      unemployment: "Dinámico por sector bananero y servicios.",
      publicServices: "95% urbano, 40% rural. Déficit en barrios subnormales.",
      hdi: "Medio-Alto (El mejor de la subregión Urabá).",
      health: "Concentración de sedes universitarias y centros médicos.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Moderada con impacto por extorsión.",
      otherCrimes: "Microtráfico focalizado en plazas de vicio.",
      armedGroups: "Alta influencia de las AGC en la periferia."
    }
  },
  "Puerto Berrío": {
    category: "5",
    demographics: {
      total: "~52,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: "0-14", value: 28 }, { label: "15-64", value: 62 }, { label: "65+", value: 10 }],
      ethnic: "Mestiza con componente afro ribereño.",
      displacement: "Histórico receptor y expulsor por control del río."
    },
    socioeconomic: {
      unemployment: "Sector ganadero robusto pero poca mano de obra local intensiva. Cordones de miseria y alta deserción escolar.",
      publicServices: "Deficiente conexión rural de internet y vías terciarias. Problemas de agua potable.",
      hdi: "Categoría 5. Nodo ferroviario y vial de la Ruta del Sol.",
      health: "Déficit hospitalario agudo considerando que atiende la demanda de municipios vecinos.",
      urbanRural: { urban: 80, rural: 20 }
    },
    security: {
      homicideRate: "Moderada-alta en barrios populares.",
      otherCrimes: "Control periférico del narcomenudeo.",
      armedGroups: "Presencia articulada del Clan del Golfo."
    }
  },
  "Puerto Nare": {
    category: "6",
    demographics: {
      total: "~20,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 25 }, { label: '15-64', value: 65 }, { label: '65+', value: 10 }],
      ethnic: "Mestiza con componente afro.",
      displacement: "Historial de desplazamiento ligado a la dinámica del río."
    },
    socioeconomic: {
      unemployment: "Dependencia de la minería (cementeras Argos). Riqueza industrial no permea el IDH.",
      publicServices: "Ingresos corrientes importantes por minería, pero pobreza rural roza el 40%.",
      hdi: "Categoría 6. Riqueza industrial no siempre permea el IDH general.",
      health: "Mortalidad infantil comparativa sigue bajo altos riesgos.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja en comparación con otros delitos.",
      otherCrimes: "Extorsión ligada a contratos tercerizados de la minería ('peaje' extorsivo).",
      armedGroups: "Bandas emergentes y control periférico."
    }
  },
  "Puerto Triunfo": {
    category: "6",
    demographics: {
      total: "~21,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 28 }, { label: '15-64', value: 62 }, { label: '65+', value: 10 }],
      ethnic: "Mestiza con componente afro.",
      displacement: "Historial moderado."
    },
    socioeconomic: {
      unemployment: "Economía de servicios, hoteles y restaurantes (Turismo: Hacienda Nápoles, Río Claro).",
      publicServices: "Grave rezago en coberturas de alcantarillado.",
      hdi: "IDH estancado.",
      health: "Foco problemático de prostitución infantil latente.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "Moderada.",
      otherCrimes: "Microtráfico articulado al turismo. Fauna invasora peligrosa (hipopótamos).",
      armedGroups: "Redes de microtráfico local."
    }
  },
  "Yondó": {
    category: "5",
    demographics: {
      total: "~20,000",
      gender: { male: 52, female: 48 },
      ageGroups: [{ label: '0-14', value: 24 }, { label: '15-64', value: 66 }, { label: '65+', value: 10 }],
      ethnic: "Mestiza con componente afro. Fuerte organización sindical (USO/Ecopetrol).",
      displacement: "Pobreza multidimensional >50% en zonas rurales."
    },
    socioeconomic: {
      unemployment: "Dependencia del petróleo (Ecopetrol - Casabe). Alto flujo de presupuestos por regalías.",
      publicServices: "Deficiencias trágicas de salud, obligando a cruzar a Barrancabermeja.",
      hdi: "Categoría 5 (temporalmente). Pobreza multidimensional >50%.",
      health: "Urgencias de Nivel 2 o 3 deben ser atendidas en Barrancabermeja (Santander).",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Alta por ser 'línea de fuego'.",
      otherCrimes: "Amenazas a organizaciones comunales.",
      armedGroups: "Escenario de re-incursión armada: ELN, EPL, FARC y grupos paramilitares."
    }
  },
  "Maceo": {
    category: "6",
    demographics: {
      total: "~8,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 26 }, { label: '15-64', value: 64 }, { label: '65+', value: 10 }],
      ethnic: "Mestiza.",
      displacement: "Impacto demográfico por llegada de gran minería."
    },
    socioeconomic: {
      unemployment: "Cultivo de cacao y mega-apuesta minera (cementera).",
      publicServices: "Déficit de vivienda por influjo de trabajadores y alzas de precios.",
      hdi: "IDH bajo.",
      health: "Retos en salud rural.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Moderada.",
      otherCrimes: "Conflictividad por uso del suelo.",
      armedGroups: "Presencia de grupos armados buscando control de rentas."
    }
  },
  "Caracolí": {
    category: "6",
    demographics: {
      total: "~5,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 68 }, { label: '65+', value: 10 }],
      ethnic: "Mestiza.",
      displacement: "Éxodo continuo de población juvenil."
    },
    socioeconomic: {
      unemployment: "Economía de minifundio, ganadería extensiva a pequeña escala. Vacíos en oportunidades laborales.",
      publicServices: "Mayores vacíos en acceso a conectividad y educación técnica.",
      hdi: "Categoría 6 (Alta dependencia de la Nación).",
      health: "Mortalidad infantil comparativa sigue bajo altos riesgos.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Reducción drástica del homicidio.",
      otherCrimes: "Hurto menor.",
      armedGroups: "Baja presencia actual, pero vulnerabilidad por falta de oportunidades."
    }
  },
  "Caucasia": {
    category: "4",
    demographics: {
      total: "~125,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: "15-30", value: 35 }, { label: "Otros", value: 65 }],
      ethnic: "Significativa población Afro e indígena Zenú.",
      displacement: "Macro-receptor de desplazamiento (víctimas de Córdoba y Bolívar)."
    },
    socioeconomic: {
      unemployment: "~12% (Informalidad roza el 70%).",
      publicServices: "90% energía, 85% acueducto; barrios subnormales con contrabando.",
      hdi: "Medio (El más alto del Bajo Cauca).",
      health: "Mortalidad infantil controlada urbanamente pero riesgosa en periferia.",
      urbanRural: { urban: 80, rural: 20 }
    },
    security: {
      homicideRate: "Aumento drástico en 2024 (>90/100k habs).",
      otherCrimes: "Extorsión del 100% al comercio local; reclutamiento forzado.",
      armedGroups: "Epicentro operativo del Clan del Golfo."
    }
  },
  "Rionegro": {
    category: "1",
    demographics: {
      total: "~145,000",
      gender: { male: 48.5, female: 51.5 },
      ageGroups: [{ label: "25-45", value: 40 }, { label: "Otros", value: 60 }],
      ethnic: ">98% Mestizo/Blanco.",
      displacement: "Historial de receptor de otras subregiones."
    },
    socioeconomic: {
      unemployment: "~4% (Jalona formalidad industrial).",
      publicServices: ">98% urbano, 75% rural.",
      hdi: "Alto (Mayor calidad de vida de la región).",
      health: "Red hospitalaria de tercer nivel (San Vicente Fundación).",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Media (35 casos en 2024).",
      otherCrimes: "Delito gravísimo de extorsión carcelaria y hurtos.",
      armedGroups: "Presencia latente de 'El Mesa' (microtráfico)."
    }
  },
  "Turbo": {
    category: "2",
    demographics: {
      total: "128,000",
      gender: { male: 50, female: 50 },
      ageGroups: [
        { label: '0-14', value: 32 },
        { label: '15-64', value: 63 },
        { label: '65+', value: 5 }
      ],
      ethnic: "75% Afrodescendiente, 20% Mestizo, 5% Indígena.",
      displacement: "Historial crítico de desplazamiento forzado y despojo de tierras."
    },
    socioeconomic: {
      unemployment: "18.5% (Informalidad predominante).",
      publicServices: "Acueducto: 65%, Alcantarillado: 45%, Energía: 92%.",
      hdi: "0.680",
      health: "Mortalidad infantil: 28/1000. Deficiencias en saneamiento básico.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "42 por 100,000 hab.",
      otherCrimes: "Narcotráfico, extorsión y contrabando.",
      armedGroups: "Control hegemónico del Clan del Golfo."
    }
  },
  "Bello": {
    category: "1",
    demographics: {
      total: "522,000",
      gender: { male: 48, female: 52 },
      ageGroups: [
        { label: '0-14', value: 20 },
        { label: '15-64', value: 70 },
        { label: '65+', value: 10 }
      ],
      ethnic: "99% Mestizo/Blanco.",
      displacement: "Receptor masivo de población desplazada de otras regiones."
    },
    socioeconomic: {
      unemployment: "11.2%.",
      publicServices: "Acueducto: 98%, Alcantarillado: 97%, Energía: 99%.",
      hdi: "0.810",
      health: "Mortalidad infantil: 10/1000. Red hospitalaria integrada al Valle de Aburrá.",
      urbanRural: { urban: 98, rural: 2 }
    },
    security: {
      homicideRate: "35 por 100,000 hab.",
      otherCrimes: "Alta incidencia de extorsión y hurto a personas.",
      armedGroups: "Bandas criminales locales (Pachelly, El Mesa) con control territorial."
    }
  },
  "Envigado": {
    category: "1",
    demographics: {
      total: "232,000",
      gender: { male: 47, female: 53 },
      ageGroups: [
        { label: '0-14', value: 16 },
        { label: '15-64', value: 71 },
        { label: '65+', value: 13 }
      ],
      ethnic: "99% Mestizo/Blanco.",
      displacement: "Bajo historial de desplazamiento originado en el municipio."
    },
    socioeconomic: {
      unemployment: "8.1%.",
      publicServices: "Acueducto: 99.9%, Alcantarillado: 99.8%, Energía: 100%.",
      hdi: "0.865",
      health: "Mortalidad infantil: 6/1000. Excelente infraestructura de salud.",
      urbanRural: { urban: 95, rural: 5 }
    },
    security: {
      homicideRate: "8 por 100,000 hab.",
      otherCrimes: "Hurto de vehículos y residencias.",
      armedGroups: "Presencia de estructuras de 'La Oficina' (bajo perfil)."
    }
  },
  "Itagüí": {
    category: "1",
    demographics: {
      total: "290,000",
      gender: { male: 48, female: 52 },
      ageGroups: [
        { label: '0-14', value: 18 },
        { label: '15-64', value: 70 },
        { label: '65+', value: 12 }
      ],
      ethnic: "99% Mestizo/Blanco.",
      displacement: "Receptor de población desplazada por su dinamismo industrial."
    },
    socioeconomic: {
      unemployment: "9.5%.",
      publicServices: "Acueducto: 99%, Alcantarillado: 98%, Energía: 100%.",
      hdi: "0.835",
      health: "Mortalidad infantil: 9/1000. Red hospitalaria robusta.",
      urbanRural: { urban: 99, rural: 1 }
    },
    security: {
      homicideRate: "22 por 100,000 hab.",
      otherCrimes: "Extorsión a comerciantes y hurto.",
      armedGroups: "Gobernanza criminal por combos locales articulados."
    }
  },
  "Sabaneta": {
    category: "1",
    demographics: {
      total: "85,000",
      gender: { male: 47, female: 53 },
      ageGroups: [
        { label: '0-14', value: 15 },
        { label: '15-64', value: 72 },
        { label: '65+', value: 13 }
      ],
      ethnic: "99% Mestizo/Blanco.",
      displacement: "Mínimo historial de desplazamiento."
    },
    socioeconomic: {
      unemployment: "7.8%.",
      publicServices: "Acueducto: 100%, Alcantarillado: 100%, Energía: 100%.",
      hdi: "0.870",
      health: "Mortalidad infantil: 5/1000. Municipio con mejores indicadores de salud.",
      urbanRural: { urban: 98, rural: 2 }
    },
    security: {
      homicideRate: "5 por 100,000 hab.",
      otherCrimes: "Hurto a residencias.",
      armedGroups: "Baja presencia de grupos armados organizados."
    }
  },
  "Santa Fe de Antioquia": {
    category: "4",
    demographics: {
      total: "26,000",
      gender: { male: 49, female: 51 },
      ageGroups: [
        { label: '0-14', value: 24 },
        { label: '15-64', value: 64 },
        { label: '65+', value: 12 }
      ],
      ethnic: "85% Mestizo, 15% Afrodescendiente.",
      displacement: "Historial moderado ligado a la subregión de Occidente."
    },
    socioeconomic: {
      unemployment: "10.5% (Dependencia del turismo).",
      publicServices: "Acueducto: 88%, Alcantarillado: 82%, Energía: 97%.",
      hdi: "0.740",
      health: "Mortalidad infantil: 16/1000. Hospital de referencia para Occidente.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "25 por 100,000 hab.",
      otherCrimes: "Microtráfico en zonas turísticas.",
      armedGroups: "Presencia de AGC (Clan del Golfo) en zonas rurales."
    }
  },
  "Sonsón": {
    category: "6",
    demographics: {
      total: "36,000",
      gender: { male: 51, female: 49 },
      ageGroups: [
        { label: '0-14', value: 26 },
        { label: '15-64', value: 60 },
        { label: '65+', value: 14 }
      ],
      ethnic: "99% Mestizo/Blanco.",
      displacement: "Historial crítico de desplazamiento en la década de los 2000."
    },
    socioeconomic: {
      unemployment: "9.2% (Economía agrícola: aguacate y café).",
      publicServices: "Acueducto: 85%, Alcantarillado: 78%, Energía: 95%.",
      hdi: "0.710",
      health: "Mortalidad infantil: 18/1000. Retos en salud rural dispersa.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "32 por 100,000 hab.",
      otherCrimes: "Hurto de insumos agrícolas.",
      armedGroups: "Reductos de grupos armados en zonas de páramo."
    }
  },
  "Yarumal": {
    category: "4",
    demographics: {
      total: "48,000",
      gender: { male: 49, female: 51 },
      ageGroups: [
        { label: '0-14', value: 25 },
        { label: '15-64', value: 65 },
        { label: '65+', value: 10 }
      ],
      ethnic: "99% Mestizo/Blanco.",
      displacement: "Receptor y expulsor histórico por su ubicación estratégica."
    },
    socioeconomic: {
      unemployment: "11.5%.",
      publicServices: "Acueducto: 92%, Alcantarillado: 88%, Energía: 98%.",
      hdi: "0.735",
      health: "Mortalidad infantil: 15/1000. Hospital San Juan de Dios es clave.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "45 por 100,000 hab.",
      otherCrimes: "Extorsión y microtráfico.",
      armedGroups: "Disputa entre AGC y Disidencias de las FARC."
    }
  },
  "Sopetrán": {
    category: "6",
    demographics: {
      total: "~16,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 66 }, { label: '65+', value: 14 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión moderna."
    },
    socioeconomic: {
      unemployment: "Economía de servicios turísticos y fincas de recreo.",
      publicServices: "Buena cobertura urbana.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Hurtos a residencias de lujo y fincas de recreo.",
      armedGroups: "Control social silencioso de bandas locales."
    }
  },
  "San Jerónimo": {
    category: "6",
    demographics: {
      total: "~15,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 66 }, { label: '65+', value: 14 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión moderna."
    },
    socioeconomic: {
      unemployment: "Economía de servicios turísticos y fincas de recreo.",
      publicServices: "Buena cobertura urbana.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Hurtos a residencias de lujo y fincas de recreo.",
      armedGroups: "Control social silencioso de bandas locales."
    }
  },
  "Liborina": {
    category: "6",
    demographics: {
      total: "~10,500",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 64 }, { label: '65+', value: 15 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión moderna."
    },
    socioeconomic: {
      unemployment: "Fruticultura (Cítricos) y café.",
      publicServices: "Retos en ruralidad dispersa.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Olaya": {
    category: "6",
    demographics: {
      total: "~3,500",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 18 }, { label: '15-64', value: 65 }, { label: '65+', value: 17 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Agricultura de subsistencia.",
      publicServices: "Cobertura aceptable para su tamaño.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 20, rural: 80 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Nula incidencia criminal macro.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Buriticá": {
    category: "6",
    demographics: {
      total: "~10,000",
      gender: { male: 52, female: 48 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 66 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Impactado por la bonanza minera y sus conflictos."
    },
    socioeconomic: {
      unemployment: "Minera de oro a gran escala (Zijin Mining) convive con minería informal.",
      publicServices: "Presión sobre servicios por población flotante minera.",
      hdi: "IDH Medio.",
      health: "Salud básica con apoyo minero.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Conflictos mineros agudos; homicidios selectivos.",
      otherCrimes: "Extorsión masiva y minería ilegal tecnificada.",
      armedGroups: "Clan del Golfo controla gran parte de la minería ilegal."
    }
  },
  "Peque": {
    category: "6",
    demographics: {
      total: "~11,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 26 }, { label: '15-64', value: 64 }, { label: '65+', value: 10 }],
      ethnic: "Mestizo.",
      displacement: "Altamente afectado por ser corredor estratégico."
    },
    socioeconomic: {
      unemployment: "Aislamiento geográfico limita el empleo formal.",
      publicServices: "Deficiencias graves en conectividad y energía.",
      hdi: "IDH Bajo.",
      health: "Salud precaria por aislamiento.",
      urbanRural: { urban: 20, rural: 80 }
    },
    security: {
      homicideRate: "Corredor estratégico de guerra; alta letalidad intermitente.",
      otherCrimes: "Confinamientos y minas antipersonal.",
      armedGroups: "Disputa entre Disidencias FARC y AGC."
    }
  },
  "Giraldo": {
    category: "6",
    demographics: {
      total: "~5,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 64 }, { label: '65+', value: 15 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión moderna."
    },
    socioeconomic: {
      unemployment: "Economía agraria tradicional.",
      publicServices: "Servicios básicos estables.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Cañasgordas": {
    category: "6",
    demographics: {
      total: "~17,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 23 }, { label: '15-64', value: 64 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Receptor de tránsito hacia Urabá."
    },
    socioeconomic: {
      unemployment: "Comercio de paso y agricultura.",
      publicServices: "Retos en saneamiento rural.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Puerta de Urabá; incidentes viales y extorsión.",
      otherCrimes: "Extorsión a transportadores y comerciantes.",
      armedGroups: "Influencia del Clan del Golfo."
    }
  },
  "Frontino": {
    category: "6",
    demographics: {
      total: "~20,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 24 }, { label: '15-64', value: 64 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo y comunidades Emberá Katío.",
      displacement: "Historial de desplazamiento por minería y guerra."
    },
    socioeconomic: {
      unemployment: "Minería de oro y café.",
      publicServices: "Retos en zonas indígenas remotas.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Atentados con explosivos y ataques a fuerza pública.",
      otherCrimes: "Extorsión minera y confinamientos.",
      armedGroups: "Disputa entre AGC y ELN."
    }
  },
  "Abriaquí": {
    category: "6",
    demographics: {
      total: "~2,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 18 }, { label: '15-64', value: 65 }, { label: '65+', value: 17 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Agricultura de pequeña escala.",
      publicServices: "Cobertura aceptable.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "El más pacífico; cero homicidios recurrentes.",
      otherCrimes: "Nula incidencia criminal.",
      armedGroups: "Sin presencia de grupos armados."
    }
  },
  "Caicedo": {
    category: "6",
    demographics: {
      total: "~8,500",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 64 }, { label: '65+', value: 14 }],
      ethnic: "Mestizo.",
      displacement: "Historial de superación de la violencia."
    },
    socioeconomic: {
      unemployment: "Café y agricultura.",
      publicServices: "Retos en vías rurales.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 25, rural: 75 }
    },
    security: {
      homicideRate: "Primer municipio 'No Violento'; estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Anzá": {
    category: "6",
    demographics: {
      total: "~8,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 64 }, { label: '65+', value: 15 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Ganadería y agricultura.",
      publicServices: "Servicios básicos estables.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Betulia": {
    category: "6",
    demographics: {
      total: "~18,000",
      gender: { male: 52, female: 48 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 66 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Impacto por violencia cafetera histórica."
    },
    socioeconomic: {
      unemployment: "Economía cafetera dependiente de cosechas.",
      publicServices: "Retos en ruralidad dispersa.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Homicidios ligados a riñas en cosecha cafetera.",
      otherCrimes: "Microtráfico en épocas de cosecha.",
      armedGroups: "Influencia de bandas locales."
    }
  },
  "Heliconia": {
    category: "6",
    demographics: {
      total: "~6,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 65 }, { label: '65+', value: 15 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Agricultura tradicional.",
      publicServices: "Servicios básicos estables.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Armenia": {
    category: "6",
    demographics: {
      total: "~5,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 19 }, { label: '15-64', value: 65 }, { label: '65+', value: 16 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Agricultura tradicional.",
      publicServices: "Servicios básicos estables.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Ebéjico": {
    category: "6",
    demographics: {
      total: "~13,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 64 }, { label: '65+', value: 15 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Agricultura y ganadería.",
      publicServices: "Servicios básicos estables.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Sabanalarga": {
    category: "6",
    demographics: {
      total: "~9,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 25 }, { label: '15-64', value: 64 }, { label: '65+', value: 11 }],
      ethnic: "Mestizo.",
      displacement: "Afectado por aislamiento y grupos armados."
    },
    socioeconomic: {
      unemployment: "Agricultura de subsistencia.",
      publicServices: "Deficiencias graves en vías.",
      hdi: "IDH Bajo.",
      health: "Salud precaria.",
      urbanRural: { urban: 25, rural: 75 }
    },
    security: {
      homicideRate: "Presencia de grupos armados; incidentes esporádicos.",
      otherCrimes: "Extorsión y control social.",
      armedGroups: "Influencia de disidencias y AGC."
    }
  },
  "Uramita": {
    category: "6",
    demographics: {
      total: "~8,500",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 64 }, { label: '65+', value: 14 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Agricultura tradicional.",
      publicServices: "Servicios básicos estables.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Marinilla": {
    category: "4",
    demographics: {
      total: "~65,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 68 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Receptor de población rural del oriente lejano."
    },
    socioeconomic: {
      unemployment: "Despensa agrícola y comercial fuerte; desempleo bajo.",
      publicServices: "Excelente cobertura urbana.",
      hdi: "IDH Alto.",
      health: "Salud de calidad.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Extorsión a comerciantes y microtráfico.",
      armedGroups: "Bandas locales con nexos metropolitanos."
    }
  },
  "La Ceja": {
    category: "4",
    demographics: {
      total: "~60,000",
      gender: { male: 48, female: 52 },
      ageGroups: [{ label: '0-14', value: 19 }, { label: '15-64', value: 69 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Industria de floricultura emplea masivamente a mujeres.",
      publicServices: "Excelente cobertura.",
      hdi: "IDH Alto.",
      health: "Salud de calidad.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Microtráfico focalizado.",
      armedGroups: "Bandas locales."
    }
  },
  "El Carmen de Viboral": {
    category: "4",
    demographics: {
      total: "~55,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 67 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Tradición cerámica y floricultura.",
      publicServices: "Buena cobertura.",
      hdi: "IDH Alto.",
      health: "Salud básica.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Guarne": {
    category: "4",
    demographics: {
      total: "~55,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 68 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Receptor por cercanía a Medellín."
    },
    socioeconomic: {
      unemployment: "Eje industrial y logístico de la autopista.",
      publicServices: "Presión sobre servicios por crecimiento industrial.",
      hdi: "IDH Alto.",
      health: "Salud básica.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Moderada.",
      otherCrimes: "Extorsión industrial y hurtos en autopista.",
      armedGroups: "Influencia de bandas del Valle de Aburrá."
    }
  },
  "La Unión": {
    category: "6",
    demographics: {
      total: "~22,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 65 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Economía de papa y leche.",
      publicServices: "Servicios básicos estables.",
      hdi: "IDH Medio-Alto.",
      health: "Salud básica.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "El Retiro": {
    category: "4",
    demographics: {
      total: "~24,000",
      gender: { male: 48, female: 52 },
      ageGroups: [{ label: '0-14', value: 18 }, { label: '15-64', value: 68 }, { label: '65+', value: 14 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Ebanistería de lujo y turismo residencial.",
      publicServices: "Excelente cobertura.",
      hdi: "IDH Muy Alto.",
      health: "Salud de calidad.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Hurtos a residencias de alto valor.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "El Santuario": {
    category: "4",
    demographics: {
      total: "~38,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 66 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Comercio y confección; cultura del ahorro.",
      publicServices: "Buena cobertura.",
      hdi: "IDH Alto.",
      health: "Salud básica.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "San Vicente Ferrer": {
    category: "6",
    demographics: {
      total: "~22,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 23 }, { label: '15-64', value: 64 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Economía agraria tradicional.",
      publicServices: "Retos en ruralidad.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 25, rural: 75 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Abejorral": {
    category: "6",
    demographics: {
      total: "~20,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 64 }, { label: '65+', value: 14 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión moderna."
    },
    socioeconomic: {
      unemployment: "Economía cafetera.",
      publicServices: "Retos en vías rurales.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Nariño": {
    category: "6",
    demographics: {
      total: "~10,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 24 }, { label: '15-64', value: 63 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Afectado por aislamiento."
    },
    socioeconomic: {
      unemployment: "Café y agricultura de subsistencia.",
      publicServices: "Deficiencias en conectividad.",
      hdi: "IDH Bajo.",
      health: "Salud precaria.",
      urbanRural: { urban: 25, rural: 75 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Presencia esporádica de grupos armados."
    }
  },
  "Argelia": {
    category: "6",
    demographics: {
      total: "~8,500",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 25 }, { label: '15-64', value: 63 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Afectado por aislamiento."
    },
    socioeconomic: {
      unemployment: "Café y agricultura de subsistencia.",
      publicServices: "Deficiencias en conectividad.",
      hdi: "IDH Bajo.",
      health: "Salud precaria.",
      urbanRural: { urban: 25, rural: 75 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Presencia esporádica de grupos armados."
    }
  },
  "San Carlos": {
    category: "6",
    demographics: {
      total: "~16,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 65 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Símbolo de retorno tras desplazamiento masivo."
    },
    socioeconomic: {
      unemployment: "Energía hidroeléctrica y turismo ecológico.",
      publicServices: "Mejorando tras reconstrucción.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "San Rafael": {
    category: "6",
    demographics: {
      total: "~15,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 65 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión moderna."
    },
    socioeconomic: {
      unemployment: "Energía y turismo.",
      publicServices: "Servicios básicos estables.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "San Luis": {
    category: "6",
    demographics: {
      total: "~13,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 24 }, { label: '15-64', value: 64 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Afectado por violencia en la autopista."
    },
    socioeconomic: {
      unemployment: "Cemento y turismo de paso.",
      publicServices: "Retos en ruralidad.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Moderada.",
      otherCrimes: "Extorsión vial y hurtos.",
      armedGroups: "Influencia de grupos armados en tránsito."
    }
  },
  "Granada": {
    category: "6",
    demographics: {
      total: "~10,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 65 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Historial de guerra superado; gran retorno."
    },
    socioeconomic: {
      unemployment: "Comercio fuerte (colonias en Bogotá/Medellín).",
      publicServices: "Reconstrucción completa.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Cocorná": {
    category: "6",
    demographics: {
      total: "~16,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 24 }, { label: '15-64', value: 64 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión moderna."
    },
    socioeconomic: {
      unemployment: "Turismo y agricultura.",
      publicServices: "Retos en ruralidad.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "San Francisco": {
    category: "6",
    demographics: {
      total: "~6,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 25 }, { label: '15-64', value: 64 }, { label: '65+', value: 11 }],
      ethnic: "Mestizo.",
      displacement: "Afectado por minas antipersonal históricas."
    },
    socioeconomic: {
      unemployment: "Agricultura de subsistencia.",
      publicServices: "Deficiencias en vías.",
      hdi: "IDH Bajo.",
      health: "Salud precaria.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Minas antipersonal (riesgo residual).",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Concepción": {
    category: "6",
    demographics: {
      total: "~4,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 18 }, { label: '15-64', value: 66 }, { label: '65+', value: 16 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Turismo histórico y agricultura.",
      publicServices: "Cobertura aceptable.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Nula incidencia criminal.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Alejandría": {
    category: "6",
    demographics: {
      total: "~4,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 65 }, { label: '65+', value: 15 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Turismo y agricultura.",
      publicServices: "Cobertura aceptable.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "El Peñol": {
    category: "6",
    demographics: {
      total: "~22,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 66 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Turismo y agricultura.",
      publicServices: "Buena cobertura.",
      hdi: "IDH Medio-Alto.",
      health: "Salud básica.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Microtráfico turístico.",
      armedGroups: "Bandas locales."
    }
  },
  "Guatapé": {
    category: "6",
    demographics: {
      total: "~9,000",
      gender: { male: 48, female: 52 },
      ageGroups: [{ label: '0-14', value: 18 }, { label: '15-64', value: 70 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Turismo masivo; pleno empleo informal.",
      publicServices: "Excelente cobertura urbana.",
      hdi: "IDH Alto.",
      health: "Salud básica.",
      urbanRural: { urban: 80, rural: 20 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Microtráfico turístico.",
      armedGroups: "Bandas locales."
    }
  },
  "Amagá": {
    category: "6",
    demographics: {
      total: "~32,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 66 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Minería de carbón; riesgos laborales altos.",
      publicServices: "Cobertura aceptable.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Moderada.",
      otherCrimes: "Accidentes mineros y microtráfico.",
      armedGroups: "Bandas locales."
    }
  },
  "Andes": {
    category: "4",
    demographics: {
      total: "~48,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 67 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Capital cafetera; alta demanda de mano de obra estacional.",
      publicServices: "Buena cobertura urbana.",
      hdi: "IDH Medio-Alto.",
      health: "Salud básica.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Alta en época de cosecha.",
      otherCrimes: "Microtráfico y riñas.",
      armedGroups: "Bandas locales y presencia de AGC."
    }
  },
  "Angelópolis": {
    category: "6",
    demographics: {
      total: "~10,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 23 }, { label: '15-64', value: 65 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Minería de carbón.",
      publicServices: "Retos en ruralidad.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Betania": {
    category: "6",
    demographics: {
      total: "~11,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 65 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Economía cafetera.",
      publicServices: "Servicios básicos estables.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Caramanta": {
    category: "6",
    demographics: {
      total: "~5,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 19 }, { label: '15-64', value: 65 }, { label: '65+', value: 16 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Café y agricultura.",
      publicServices: "Cobertura aceptable.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Nula incidencia criminal.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Ciudad Bolívar": {
    category: "6",
    demographics: {
      total: "~28,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 67 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Café y comercio regional.",
      publicServices: "Buena cobertura urbana.",
      hdi: "IDH Medio-Alto.",
      health: "Salud básica.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "Moderada.",
      otherCrimes: "Microtráfico.",
      armedGroups: "Bandas locales."
    }
  },
  "Concordia": {
    category: "6",
    demographics: {
      total: "~22,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 65 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Economía cafetera.",
      publicServices: "Servicios básicos estables.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Fredonia": {
    category: "6",
    demographics: {
      total: "~25,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 66 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Café y turismo de fincas.",
      publicServices: "Buena cobertura.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Hispania": {
    category: "6",
    demographics: {
      total: "~5,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 66 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Café y comercio de paso.",
      publicServices: "Cobertura aceptable.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Jardín": {
    category: "6",
    demographics: {
      total: "~15,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 19 }, { label: '15-64', value: 67 }, { label: '65+', value: 14 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Turismo masivo y café de alta calidad.",
      publicServices: "Excelente cobertura urbana.",
      hdi: "IDH Alto.",
      health: "Salud básica.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Microtráfico turístico.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Jericó": {
    category: "6",
    demographics: {
      total: "~13,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 19 }, { label: '15-64', value: 66 }, { label: '65+', value: 15 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Turismo religioso y agricultura.",
      publicServices: "Buena cobertura.",
      hdi: "IDH Alto.",
      health: "Salud básica.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Conflictos sociales por minería.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "La Pintada": {
    category: "6",
    demographics: {
      total: "~8,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 68 }, { label: '65+', value: 10 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Turismo de paso y ganadería.",
      publicServices: "Cobertura aceptable.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 80, rural: 20 }
    },
    security: {
      homicideRate: "Moderada.",
      otherCrimes: "Microtráfico de paso.",
      armedGroups: "Grupos locales."
    }
  },
  "Montebello": {
    category: "6",
    demographics: {
      total: "~7,500",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 64 }, { label: '65+', value: 14 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Café y agricultura.",
      publicServices: "Retos en ruralidad.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 25, rural: 75 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Pueblorrico": {
    category: "6",
    demographics: {
      total: "~8,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 23 }, { label: '15-64', value: 64 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Café y agricultura.",
      publicServices: "Retos en ruralidad.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Salgar": {
    category: "6",
    demographics: {
      total: "~18,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 65 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Afectado por desastres naturales."
    },
    socioeconomic: {
      unemployment: "Economía cafetera.",
      publicServices: "Reconstrucción tras avalancha.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Santa Bárbara": {
    category: "6",
    demographics: {
      total: "~28,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 67 }, { label: '65+', value: 12 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Cítricos y café.",
      publicServices: "Buena cobertura.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Moderada.",
      otherCrimes: "Microtráfico.",
      armedGroups: "Bandas locales."
    }
  },
  "Támesis": {
    category: "6",
    demographics: {
      total: "~16,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 66 }, { label: '65+', value: 14 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Turismo ecológico y café.",
      publicServices: "Buena cobertura.",
      hdi: "IDH Medio-Alto.",
      health: "Salud básica.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Tarso": {
    category: "6",
    demographics: {
      total: "~6,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 21 }, { label: '15-64', value: 66 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Café y agricultura.",
      publicServices: "Cobertura aceptable.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Titiribí": {
    category: "6",
    demographics: {
      total: "~11,500",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 22 }, { label: '15-64', value: 65 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Minería de carbón y café.",
      publicServices: "Cobertura aceptable.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Urrao": {
    category: "6",
    demographics: {
      total: "~45,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 26 }, { label: '15-64', value: 63 }, { label: '65+', value: 11 }],
      ethnic: "Mestizo e Indígena (Embera Katío).",
      displacement: "Historial de desplazamiento por conflicto en fronteras."
    },
    socioeconomic: {
      unemployment: "Granadilla, aguacate y ganadería.",
      publicServices: "Retos en zonas indígenas remotas.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica con retos de acceso.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Moderada-Alta.",
      otherCrimes: "Extorsión y confinamiento rural.",
      armedGroups: "Presencia de AGC y Disidencias de las FARC."
    }
  },
  "Valparaíso": {
    category: "6",
    demographics: {
      total: "~6,500",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 66 }, { label: '65+', value: 14 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Ganadería y agricultura.",
      publicServices: "Cobertura aceptable.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural."
    }
  },
  "Venecia": {
    category: "6",
    demographics: {
      total: "~14,000",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: '0-14', value: 20 }, { label: '15-64', value: 67 }, { label: '65+', value: 13 }],
      ethnic: "Mestizo.",
      displacement: "Nulo desplazamiento."
    },
    socioeconomic: {
      unemployment: "Turismo (Cerro Tusa) y café.",
      publicServices: "Buena cobertura.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Estadísticas pacíficas.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Sin presencia estructural activa."
    }
  },
  "Carepa": {
    category: "4",
    demographics: {
      total: "~60,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 28 }, { label: '15-64', value: 64 }, { label: '65+', value: 8 }],
      ethnic: "Afrodescendiente y Mestizo.",
      displacement: "Receptor de población rural."
    },
    socioeconomic: {
      unemployment: "Industria bananera y servicios aeroportuarios.",
      publicServices: "Cobertura aceptable en casco urbano.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Moderada.",
      otherCrimes: "Hurtos y microtráfico.",
      armedGroups: "Presencia de AGC en zonas rurales."
    }
  },
  "Chigorodó": {
    category: "4",
    demographics: {
      total: "~85,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 27 }, { label: '15-64', value: 65 }, { label: '65+', value: 8 }],
      ethnic: "Afrodescendiente y Mestizo.",
      displacement: "Receptor de población."
    },
    socioeconomic: {
      unemployment: "Banano, plátano y ganadería.",
      publicServices: "Buena cobertura urbana.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Moderada.",
      otherCrimes: "Microtráfico.",
      armedGroups: "Control de AGC."
    }
  },
  "Mutatá": {
    category: "6",
    demographics: {
      total: "~16,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 30 }, { label: '15-64', value: 62 }, { label: '65+', value: 8 }],
      ethnic: "Afro, Indígena y Mestizo.",
      displacement: "Historial de desplazamiento recurrente."
    },
    socioeconomic: {
      unemployment: "Agricultura de subsistencia y ganadería.",
      publicServices: "Deficiencias en zonas rurales.",
      hdi: "IDH Bajo.",
      health: "Salud precaria.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Moderada-Alta.",
      otherCrimes: "Extorsión y control territorial.",
      armedGroups: "Disputa entre AGC y grupos residuales."
    }
  },
  "Necoclí": {
    category: "6",
    demographics: {
      total: "~45,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 28 }, { label: '15-64', value: 64 }, { label: '65+', value: 8 }],
      ethnic: "Afrodescendiente y Mestizo.",
      displacement: "Presión por crisis migratoria transnacional."
    },
    socioeconomic: {
      unemployment: "Turismo, ganadería y pesca.",
      publicServices: "Colapso ocasional por flujo migratorio.",
      hdi: "IDH Medio-Bajo.",
      health: "Salud básica desbordada.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Moderada.",
      otherCrimes: "Tráfico de migrantes y microtráfico.",
      armedGroups: "Control hegemónico de AGC."
    }
  },
  "San Juan de Urabá": {
    category: "6",
    demographics: {
      total: "~25,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 30 }, { label: '15-64', value: 62 }, { label: '65+', value: 8 }],
      ethnic: "Afrodescendiente mayoritario.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Coco, plátano y pesca.",
      publicServices: "Deficiencias en agua potable.",
      hdi: "IDH Bajo.",
      health: "Salud precaria.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Presencia de AGC."
    }
  },
  "San Pedro de Urabá": {
    category: "6",
    demographics: {
      total: "~32,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 29 }, { label: '15-64', value: 63 }, { label: '65+', value: 8 }],
      ethnic: "Mestizo y Afrodescendiente.",
      displacement: "Historial de despojo de tierras."
    },
    socioeconomic: {
      unemployment: "Ganadería extensiva y plátano.",
      publicServices: "Retos en electrificación rural.",
      hdi: "IDH Bajo.",
      health: "Salud básica.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Moderada.",
      otherCrimes: "Extorsión ganadera.",
      armedGroups: "Control histórico de AGC."
    }
  },
  "Arboletes": {
    category: "6",
    demographics: {
      total: "~30,000",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: '0-14', value: 27 }, { label: '15-64', value: 64 }, { label: '65+', value: 9 }],
      ethnic: "Mestizo y Afrodescendiente.",
      displacement: "Baja expulsión."
    },
    socioeconomic: {
      unemployment: "Turismo de playa y ganadería.",
      publicServices: "Retos por erosión costera.",
      hdi: "IDH Medio.",
      health: "Salud básica.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Baja letalidad.",
      otherCrimes: "Hurtos menores.",
      armedGroups: "Presencia de AGC."
    }
  },
  "Murindó": {
    category: "6",
    demographics: {
      total: "~5,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 35 }, { label: '15-64', value: 58 }, { label: '65+', value: 7 }],
      ethnic: "Indígena (Embera) y Afrodescendiente.",
      displacement: "Confinamiento por minas antipersonal."
    },
    socioeconomic: {
      unemployment: "Economía de subsistencia selvatica.",
      publicServices: "Casi inexistentes.",
      hdi: "IDH Muy Bajo.",
      health: "Salud crítica.",
      urbanRural: { urban: 20, rural: 80 }
    },
    security: {
      homicideRate: "Baja letalidad directa; alta por minas.",
      otherCrimes: "Confinamiento rural.",
      armedGroups: "Presencia de ELN y AGC."
    }
  },
  "Vigía del Fuerte": {
    category: "6",
    demographics: {
      total: "~6,000",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: '0-14', value: 32 }, { label: '15-64', value: 61 }, { label: '65+', value: 7 }],
      ethnic: "Afrodescendiente e Indígena.",
      displacement: "Aislamiento geográfico severo."
    },
    socioeconomic: {
      unemployment: "Pesca y madera.",
      publicServices: "Deficiencias críticas.",
      hdi: "IDH Muy Bajo.",
      health: "Salud crítica.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Moderada.",
      otherCrimes: "Control de rentas fluviales.",
      armedGroups: "Presencia de grupos armados (Atrato)."
    }
  },
  "Montería": {
    category: "1",
    demographics: {
      total: "433,723",
      gender: { male: 48.5, female: 51.5 },
      ageGroups: [{ label: "0-19", value: 34.2 }, { label: "20-39", value: 32.3 }, { label: "40-64", value: 26.0 }, { label: "65+", value: 7.6 }],
      ethnic: "Mestizo con fuerte presencia de población desplazada de otras regiones de Córdoba.",
      displacement: "Principal receptor de población desplazada en el departamento."
    },
    socioeconomic: {
      unemployment: "12.5%",
      publicServices: "Cobertura urbana alta (95%+), brechas en zonas rurales dispersas.",
      hdi: "0.780",
      nbi: "Total: 18.80% (Cabecera: 12.73%, Rural: 46.13%)",
      health: "Centro de referencia hospitalaria para todo el departamento.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto a personas y microtráfico en zonas periféricas.",
      armedGroups: "Reacomodo de estructuras de delincuencia común y crimen organizado urbano."
    }
  },
  "Cereté": {
    category: "4",
    demographics: {
      total: "96,165",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: "0-19", value: 32.7 }, { label: "20-39", value: 30.0 }, { label: "40-64", value: 27.7 }, { label: "65+", value: 9.6 }],
      ethnic: "Mestizo.",
      displacement: "Receptor moderado de población rural."
    },
    socioeconomic: {
      unemployment: "14.2%",
      publicServices: "Buena cobertura en el casco urbano.",
      hdi: "0.710",
      nbi: "Total: 25.19% (Cabecera: 22.29%, Rural: 29.41%)",
      health: "Hospital de segundo nivel.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Fluctuante",
      otherCrimes: "Conflictividad social y microtráfico local urbano.",
      armedGroups: "Problemas de convivencia comunitaria."
    }
  },
  "Tierralta": {
    category: "6",
    demographics: {
      total: "85,813",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: "0-19", value: 44.6 }, { label: "20-39", value: 28.2 }, { label: "40-64", value: 20.9 }, { label: "65+", value: 6.3 }],
      ethnic: "Mestizo, presencia de comunidades Emberá Katío.",
      displacement: "Zona de alta expulsión y retorno histórico."
    },
    socioeconomic: {
      unemployment: "18.5%",
      publicServices: "Baja cobertura rural, deficiencias en agua potable.",
      hdi: "0.620",
      nbi: "56.01%",
      health: "Hospital de primer nivel con alta demanda.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "35.0 por 100k",
      otherCrimes: "Control territorial por grupos armados, narcotráfico.",
      armedGroups: "Fuerte presencia del Clan del Golfo y disidencias."
    }
  },
  "Valencia": {
    category: "6",
    demographics: {
      total: "30,532",
      gender: { male: 50.5, female: 49.5 },
      ageGroups: [{ label: "0-19", value: 39.8 }, { label: "20-39", value: 26.3 }, { label: "40-64", value: 25.4 }, { label: "65+", value: 8.5 }],
      ethnic: "Mestizo.",
      displacement: "Afectado por conflicto en el Nudo del Paramillo."
    },
    socioeconomic: {
      unemployment: "16.8%",
      publicServices: "Limitados en zonas rurales.",
      hdi: "0.640",
      nbi: "55.93%",
      health: "Puestos de salud rurales precarios.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "28.0 por 100k",
      otherCrimes: "Extorsión agrícola.",
      armedGroups: "Clan del Golfo."
    }
  },
  "Lorica": {
    category: "4",
    demographics: {
      total: "98,436",
      gender: { male: 49.2, female: 50.8 },
      ageGroups: [{ label: "0-19", value: 34.9 }, { label: "20-39", value: 28.6 }, { label: "40-64", value: 27.1 }, { label: "65+", value: 9.5 }],
      ethnic: "Mestizo con influencia árabe histórica.",
      displacement: "Centro receptor regional del Bajo Sinú."
    },
    socioeconomic: {
      unemployment: "13.5%",
      publicServices: "Cobertura urbana aceptable, problemas de alcantarillado.",
      hdi: "0.705",
      nbi: "33.40%",
      health: "Hospital San Vicente de Paúl (Referente regional).",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "15.5 por 100k",
      otherCrimes: "Hurto y microtráfico.",
      armedGroups: "Redes de apoyo a grupos armados."
    }
  },
  "Sahagún": {
    category: "4",
    demographics: {
      total: "94,010",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: "0-19", value: 34.0 }, { label: "20-39", value: 28.7 }, { label: "40-64", value: 27.1 }, { label: "65+", value: 10.2 }],
      ethnic: "Mestizo.",
      displacement: "Estable, bajo nivel de expulsión reciente."
    },
    socioeconomic: {
      unemployment: "11.8%",
      publicServices: "Buena cobertura de gas natural y energía.",
      hdi: "0.730",
      nbi: "25.29%",
      health: "Hospital de segundo nivel.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "12.0 por 100k",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Baja presencia directa visible."
    }
  },
  "Montelíbano": {
    category: "4",
    demographics: {
      total: "71,772",
      gender: { male: 52, female: 48 },
      ageGroups: [{ label: "0-19", value: 40.4 }, { label: "20-39", value: 30.1 }, { label: "40-64", value: 23.4 }, { label: "65+", value: 6.1 }],
      ethnic: "Mestizo y Afrodescendiente.",
      displacement: "Receptor de trabajadores mineros y desplazados."
    },
    socioeconomic: {
      unemployment: "10.5% (Influencia minera)",
      publicServices: "Cobertura urbana alta, problemas en periferia.",
      hdi: "0.745",
      nbi: "26.99%",
      health: "Hospital regional, apoyo de empresa privada minera.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "42.0 por 100k",
      otherCrimes: "Sicariato y extorsión minera.",
      armedGroups: "Disputa Clan del Golfo y Caparros."
    }
  },
  "Planeta Rica": {
    category: "4",
    demographics: {
      total: "60,245",
      gender: { male: 49.5, female: 50.5 },
      ageGroups: [{ label: "0-19", value: 36.6 }, { label: "20-39", value: 27.9 }, { label: "40-64", value: 26.3 }, { label: "65+", value: 9.3 }],
      ethnic: "Mestizo.",
      displacement: "Punto de paso y recepción moderada."
    },
    socioeconomic: {
      unemployment: "14.0%",
      publicServices: "Servicios básicos estables en casco urbano.",
      hdi: "0.690",
      nbi: "33.10%",
      health: "Hospital San Nicolás.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "25.0 por 100k",
      otherCrimes: "Hurto en carretera.",
      armedGroups: "Presencia de grupos armados en zonas rurales."
    }
  },
  "San Antero": {
    category: "6",
    demographics: {
      total: "29,028",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: "0-19", value: 37.8 }, { label: "20-39", value: 29.8 }, { label: "40-64", value: 25.0 }, { label: "65+", value: 7.5 }],
      ethnic: "Mestizo y Afrodescendiente.",
      displacement: "Bajo."
    },
    socioeconomic: {
      unemployment: "15.5% (Estacional por turismo)",
      publicServices: "Mejorando por dinámica turística.",
      hdi: "0.680",
      health: "Centro de salud local.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "14.0 por 100k",
      otherCrimes: "Microtráfico en zonas de playa.",
      armedGroups: "Control de rutas de narcotráfico marítimas."
    }
  },
  "Ayapel": {
    category: "6",
    demographics: {
      total: "38,816",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: "0-19", value: 42.0 }, { label: "20-39", value: 26.6 }, { label: "40-64", value: 23.4 }, { label: "65+", value: 8.0 }],
      ethnic: "Mestizo.",
      displacement: "Afectado por inundaciones y conflicto."
    },
    socioeconomic: {
      unemployment: "19.0%",
      publicServices: "Deficiencias en alcantarillado y agua.",
      hdi: "0.610",
      nbi: "Total: 47.62% (Cabecera: 35.68%, Rural: 68.00%)",
      health: "Hospital San Jorge.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Fluctuante",
      otherCrimes: "Conflictividad social y microtráfico local urbano.",
      armedGroups: "Problemas de convivencia comunitaria."
    }
  },
  "Chinú": {
    category: "5",
    demographics: {
      total: "42,676",
      gender: { male: 49, female: 51 },
      ageGroups: [{ label: "0-19", value: 32.2 }, { label: "20-39", value: 29.0 }, { label: "40-64", value: 28.3 }, { label: "10.5", value: 10.5 }],
      ethnic: "Mestizo.",
      displacement: "Bajo."
    },
    socioeconomic: {
      unemployment: "13.0%",
      publicServices: "Cobertura aceptable.",
      hdi: "0.695",
      nbi: "Total: 25.02% (Cabecera: 22.66%, Rural: 27.11%)",
      health: "Hospital local.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Fluctuante",
      otherCrimes: "Conflictividad social y microtráfico local urbano.",
      armedGroups: "Problemas de convivencia comunitaria."
    }
  },
  "Ciénaga de Oro": {
    category: "5",
    demographics: {
      total: "56,278",
      gender: { male: 49.5, female: 50.5 },
      ageGroups: [{ label: "0-19", value: 34.9 }, { label: "20-39", value: 28.2 }, { label: "40-64", value: 26.9 }, { label: "65+", value: 10.0 }],
      ethnic: "Mestizo.",
      displacement: "Moderado."
    },
    socioeconomic: {
      unemployment: "14.5%",
      publicServices: "Brechas rural-urbana.",
      hdi: "0.685",
      nbi: "36.87%",
      health: "Hospital San Francisco.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "16.0 por 100k",
      otherCrimes: "Hurto.",
      armedGroups: "Presencia esporádica."
    }
  },
  "San Andrés de Sotavento": {
    category: "6",
    demographics: {
      total: "42,041",
      gender: { male: 50.2, female: 49.8 },
      ageGroups: [{ label: "0-19", value: 41.4 }, { label: "20-39", value: 30.7 }, { label: "40-64", value: 20.5 }, { label: "65+", value: 7.4 }],
      ethnic: "Indígena Zenú (Mayoría).",
      displacement: "Bajo, fuerte arraigo territorial."
    },
    socioeconomic: {
      unemployment: "17.0%",
      publicServices: "Deficiencias en saneamiento básico.",
      hdi: "0.630",
      nbi: "72.58%",
      health: "Centro de salud con enfoque étnico.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "8.0 por 100k",
      otherCrimes: "Conflictos por tierras.",
      armedGroups: "Baja presencia directa."
    }
  },
  "Puerto Libertador": {
    category: "6",
    demographics: {
      total: "35,303",
      gender: { male: 51.5, female: 48.5 },
      ageGroups: [{ label: "0-19", value: 44.0 }, { label: "20-39", value: 28.5 }, { label: "40-64", value: 21.6 }, { label: "65+", value: 6.0 }],
      ethnic: "Mestizo y Afro.",
      displacement: "Alta vulnerabilidad por conflicto."
    },
    socioeconomic: {
      unemployment: "20.0%",
      publicServices: "Críticos en zona rural.",
      hdi: "0.590",
      nbi: "55.55%",
      health: "Hospital local limitado.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "55.0 por 100k",
      otherCrimes: "Control de minería ilegal y coca.",
      armedGroups: "Clan del Golfo y disidencias."
    }
  },
  "San Pelayo": {
    category: "6",
    demographics: {
      total: "40,614",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: "0-19", value: 32.4 }, { label: "20-39", value: 27.0 }, { label: "40-64", value: 28.8 }, { label: "65+", value: 11.9 }],
      ethnic: "Mestizo.",
      displacement: "Bajo."
    },
    socioeconomic: {
      unemployment: "15.0%",
      publicServices: "Cobertura media.",
      hdi: "0.670",
      health: "Centro de salud local.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "12.0 por 100k",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Baja presencia."
    }
  },
  "Puerto Escondido": {
    category: "6",
    demographics: {
      total: "19,474",
      gender: { male: 50.5, female: 49.5 },
      ageGroups: [{ label: "0-19", value: 40.1 }, { label: "20-39", value: 25.9 }, { label: "40-64", value: 25.3 }, { label: "65+", value: 8.7 }],
      ethnic: "Mestizo y Afro.",
      displacement: "Moderado."
    },
    socioeconomic: {
      unemployment: "18.0%",
      publicServices: "Deficiencias en agua potable.",
      hdi: "0.640",
      nbi: "73.79%",
      health: "Puesto de salud.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "22.0 por 100k",
      otherCrimes: "Microtráfico.",
      armedGroups: "Clan del Golfo."
    }
  },
  "Moñitos": {
    category: "6",
    demographics: {
      total: "25,095",
      gender: { male: 50.8, female: 49.2 },
      ageGroups: [{ label: "0-19", value: 40.8 }, { label: "20-39", value: 27.3 }, { label: "40-64", value: 24.3 }, { label: "65+", value: 7.6 }],
      ethnic: "Afrodescendiente y Mestizo.",
      displacement: "Moderado."
    },
    socioeconomic: {
      unemployment: "19.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.625",
      nbi: "68.34%",
      health: "Puesto de salud.",
      urbanRural: { urban: 25, rural: 75 }
    },
    security: {
      homicideRate: "20.0 por 100k",
      otherCrimes: "Rutas de narcotráfico.",
      armedGroups: "Clan del Golfo."
    }
  },
  "Pueblo Nuevo": {
    category: "6",
    demographics: {
      total: "26,968",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: "0-19", value: 37.6 }, { label: "20-39", value: 28.4 }, { label: "40-64", value: 24.9 }, { label: "65+", value: 9.2 }],
      ethnic: "Mestizo.",
      displacement: "Moderado."
    },
    socioeconomic: {
      unemployment: "15.0%",
      publicServices: "Cobertura media.",
      hdi: "0.660",
      health: "Centro de salud.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "18.0 por 100k",
      otherCrimes: "Hurto.",
      armedGroups: "Presencia rural."
    }
  },
  "San Bernardo del Viento": {
    category: "6",
    demographics: {
      total: "29,437",
      gender: { male: 50.5, female: 49.5 },
      ageGroups: [{ label: "0-19", value: 38.4 }, { label: "20-39", value: 26.6 }, { label: "40-64", value: 25.5 }, { label: "65+", value: 9.6 }],
      ethnic: "Mestizo y Afro.",
      displacement: "Bajo."
    },
    socioeconomic: {
      unemployment: "17.5%",
      publicServices: "Deficiencias en acueducto.",
      hdi: "0.650",
      health: "Centro de salud.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "15.0 por 100k",
      otherCrimes: "Microtráfico.",
      armedGroups: "Clan del Golfo."
    }
  },
  "Purísima": {
    category: "6",
    demographics: {
      total: "14,702",
      gender: { male: 49.8, female: 50.2 },
      ageGroups: [{ label: "0-19", value: 35.6 }, { label: "20-39", value: 28.3 }, { label: "40-64", value: 25.5 }, { label: "65+", value: 10.6 }],
      ethnic: "Mestizo.",
      displacement: "Bajo."
    },
    socioeconomic: {
      unemployment: "16.0%",
      publicServices: "Cobertura básica.",
      hdi: "0.665",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "8.0 por 100k",
      otherCrimes: "Delincuencia menor.",
      armedGroups: "Baja presencia."
    }
  },
  "Chimá": {
    category: "6",
    demographics: {
      total: "13,492",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: "0-19", value: 33.3 }, { label: "20-39", value: 26.9 }, { label: "40-64", value: 28.7 }, { label: "65+", value: 11.1 }],
      ethnic: "Mestizo.",
      displacement: "Bajo."
    },
    socioeconomic: {
      unemployment: "16.5%",
      publicServices: "Baja cobertura rural.",
      hdi: "0.655",
      nbi: "Total: 37.91% (Cabecera: 45.98%, Rural: 35.46%)",
      health: "Puesto de salud.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Fluctuante",
      otherCrimes: "Conflictividad social y microtráfico local urbano.",
      armedGroups: "Problemas de convivencia comunitaria."
    }
  },
  "Momil": {
    category: "6",
    demographics: {
      total: "16,264",
      gender: { male: 49.5, female: 50.5 },
      ageGroups: [{ label: "0-19", value: 34.9 }, { label: "20-39", value: 27.9 }, { label: "40-64", value: 27.1 }, { label: "65+", value: 10.0 }],
      ethnic: "Mestizo.",
      displacement: "Bajo."
    },
    socioeconomic: {
      unemployment: "15.8%",
      publicServices: "Cobertura básica.",
      hdi: "0.660",
      nbi: "26.67%",
      health: "Puesto de salud.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "9.0 por 100k",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Baja presencia."
    }
  },
  "Cotorra": {
    category: "6",
    demographics: {
      total: "16,215",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: "0-19", value: 33.1 }, { label: "20-39", value: 28.7 }, { label: "40-64", value: 28.0 }, { label: "65+", value: 10.2 }],
      ethnic: "Mestizo.",
      displacement: "Bajo."
    },
    socioeconomic: {
      unemployment: "15.0%",
      publicServices: "Cobertura media.",
      hdi: "0.670",
      nbi: "24.20%",
      health: "Puesto de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "10.0 por 100k",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Baja presencia."
    }
  },
  "Sincelejo": {
    category: "1",
    demographics: {
      total: "274,622",
      gender: { male: 48.4, female: 51.6 },
      ageGroups: [{ label: "0-14", value: 25.0 }, { label: "15-64", value: 65.0 }, { label: "65+", value: 10.0 }],
      ethnic: "Mestizo con importante presencia de población víctima.",
      displacement: "Principal receptor de población desplazada de los Montes de María y La Mojana."
    },
    socioeconomic: {
      unemployment: "14.2%",
      publicServices: "Cobertura urbana aceptable, deficiencias en zonas periféricas.",
      hdi: "0.720",
      nbi: "18.90%",
      health: "Hospitales de segundo y tercer nivel.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Reducción del 63% en 2024",
      otherCrimes: "Hurto a personas, microtráfico.",
      armedGroups: "Bandas locales, presencia de AGC."
    }
  },
  "Buenavista (Sucre)": {
    category: "6",
    demographics: {
      total: "10,007",
      gender: { male: 50.1, female: 49.9 },
      ageGroups: [{ label: "0-14", value: 27.5 }, { label: "15-64", value: 63.5 }, { label: "65+", value: 9.0 }],
      ethnic: "Mestizo.",
      displacement: "Afectación moderada por conflicto armado."
    },
    socioeconomic: {
      unemployment: "15.8%",
      publicServices: "Deficiencias en saneamiento básico.",
      hdi: "0.640",
      nbi: "36.57%",
      health: "Puesto de salud local.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Baja en 2024",
      otherCrimes: "Hurto menor.",
      armedGroups: "Presencia esporádica de grupos armados."
    }
  },
  "Caimito": {
    category: "6",
    demographics: {
      total: "13,331",
      gender: { male: 52.2, female: 47.8 },
      ageGroups: [{ label: "0-14", value: 28.5 }, { label: "15-64", value: 62.0 }, { label: "65+", value: 9.5 }],
      ethnic: "Mestizo.",
      displacement: "Zona de tránsito y afectación por inundaciones."
    },
    socioeconomic: {
      unemployment: "16.5%",
      publicServices: "Baja cobertura de agua potable.",
      hdi: "0.620",
      nbi: "32.19%",
      health: "Puesto de salud.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Estable",
      otherCrimes: "Abigeato.",
      armedGroups: "Presencia de grupos armados en zonas rurales."
    }
  },
  "Colosó": {
    category: "6",
    demographics: {
      total: "7,803",
      gender: { male: 52.5, female: 47.5 },
      ageGroups: [{ label: "0-14", value: 26.5 }, { label: "15-64", value: 64.0 }, { label: "65+", value: 9.5 }],
      ethnic: "Mestizo.",
      displacement: "Históricamente afectado por el conflicto armado en Montes de María."
    },
    socioeconomic: {
      unemployment: "18.2%",
      publicServices: "Muy baja cobertura de servicios básicos.",
      hdi: "0.580",
      nbi: "61.03%",
      health: "Puesto de salud.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Tendencia a la baja",
      otherCrimes: "Extorsión.",
      armedGroups: "Presencia de AGC."
    }
  },
  "Corozal": {
    category: "2",
    demographics: {
      total: "66,350",
      gender: { male: 49.3, female: 50.7 },
      ageGroups: [{ label: "0-14", value: 24.5 }, { label: "15-64", value: 66.0 }, { label: "65+", value: 9.5 }],
      ethnic: "Mestizo.",
      displacement: "Receptor de población desplazada."
    },
    socioeconomic: {
      unemployment: "12.8%",
      publicServices: "Cobertura urbana media.",
      hdi: "0.710",
      nbi: "18.19%",
      health: "Hospital de segundo nivel.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto, microtráfico.",
      armedGroups: "Bandas criminales."
    }
  },
  "Coveñas": {
    category: "4",
    demographics: {
      total: "17,091",
      gender: { male: 56.3, female: 43.7 },
      ageGroups: [{ label: "0-14", value: 23.8 }, { label: "15-64", value: 70.5 }, { label: "65+", value: 5.7 }],
      ethnic: "Mestizo/Afro.",
      displacement: "Zona turística con población flotante."
    },
    socioeconomic: {
      unemployment: "11.5%",
      publicServices: "Cobertura turística aceptable, deficiencias en barrios populares.",
      hdi: "0.690",
      nbi: "28.21%",
      health: "Puesto de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Microtráfico, extorsión turística.",
      armedGroups: "AGC."
    }
  },
  "Chalán": {
    category: "6",
    demographics: {
      total: "4,425",
      gender: { male: 53.4, female: 46.6 },
      ageGroups: [{ label: "0-14", value: 25.0 }, { label: "15-64", value: 65.0 }, { label: "65+", value: 10.0 }],
      ethnic: "Mestizo.",
      displacement: "Históricamente afectado por el conflicto armado."
    },
    socioeconomic: {
      unemployment: "19.5%",
      publicServices: "Deficiencias críticas en agua potable.",
      hdi: "0.570",
      nbi: "60.27%",
      health: "Puesto de salud.",
      urbanRural: { urban: 25, rural: 75 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Extorsión.",
      armedGroups: "Presencia de grupos armados."
    }
  },
  "El Roble": {
    category: "6",
    demographics: {
      total: "9,786",
      gender: { male: 51.8, female: 48.2 },
      ageGroups: [{ label: "0-14", value: 27.0 }, { label: "15-64", value: 64.0 }, { label: "65+", value: 9.0 }],
      ethnic: "Mestizo.",
      displacement: "Afectación moderada."
    },
    socioeconomic: {
      unemployment: "16.2%",
      publicServices: "Baja cobertura de alcantarillado.",
      hdi: "0.610",
      nbi: "34.72%",
      health: "Puesto de salud.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Estable",
      otherCrimes: "Abigeato.",
      armedGroups: "Grupos locales."
    }
  },
  "Galeras": {
    category: "6",
    demographics: {
      total: "20,239",
      gender: { male: 51.2, female: 48.8 },
      ageGroups: [{ label: "0-14", value: 28.5 }, { label: "15-64", value: 63.5 }, { label: "65+", value: 8.0 }],
      ethnic: "Mestizo.",
      displacement: "Afectación moderada."
    },
    socioeconomic: {
      unemployment: "15.5%",
      publicServices: "Deficiencias en servicios básicos.",
      hdi: "0.630",
      nbi: "26.99%",
      health: "Puesto de salud.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Guaranda": {
    category: "6",
    demographics: {
      total: "15,618",
      gender: { male: 52.1, female: 47.9 },
      ageGroups: [{ label: "0-14", value: 31.5 }, { label: "15-64", value: 60.5 }, { label: "65+", value: 8.0 }],
      ethnic: "Mestizo.",
      displacement: "Vulnerabilidad por inundaciones y conflicto."
    },
    socioeconomic: {
      unemployment: "18.8%",
      publicServices: "Muy baja cobertura de servicios.",
      hdi: "0.590",
      nbi: "58.17%",
      health: "Puesto de salud.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Grupos armados ilegales."
    }
  },
  "La Unión (Sucre)": {
    category: "6",
    demographics: {
      total: "11,510",
      gender: { male: 52.2, female: 47.8 },
      ageGroups: [{ label: "0-14", value: 26.5 }, { label: "15-64", value: 64.5 }, { label: "65+", value: 9.0 }],
      ethnic: "Mestizo.",
      displacement: "Afectación moderada."
    },
    socioeconomic: {
      unemployment: "16.0%",
      publicServices: "Baja cobertura de agua potable.",
      hdi: "0.620",
      nbi: "33.41%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Los Palmitos": {
    category: "6",
    demographics: {
      total: "21,831",
      gender: { male: 51.1, female: 48.9 },
      ageGroups: [{ label: "0-14", value: 26.0 }, { label: "15-64", value: 65.0 }, { label: "65+", value: 9.0 }],
      ethnic: "Mestizo.",
      displacement: "Históricamente afectado por el conflicto."
    },
    socioeconomic: {
      unemployment: "15.2%",
      publicServices: "Cobertura media de servicios.",
      hdi: "0.650",
      nbi: "22.23%",
      health: "Puesto de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Estable",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Majagual": {
    category: "6",
    demographics: {
      total: "32,622",
      gender: { male: 52.2, female: 47.8 },
      ageGroups: [{ label: "0-14", value: 29.5 }, { label: "15-64", value: 62.5 }, { label: "65+", value: 8.0 }],
      ethnic: "Mestizo.",
      displacement: "Alta vulnerabilidad por inundaciones."
    },
    socioeconomic: {
      unemployment: "17.5%",
      publicServices: "Deficiencias críticas en infraestructura.",
      hdi: "0.600",
      nbi: "51.65%",
      health: "Puesto de salud.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Grupos armados."
    }
  },
  "Morroa": {
    category: "6",
    demographics: {
      total: "14,793",
      gender: { male: 50.3, female: 49.7 },
      ageGroups: [{ label: "0-14", value: 26.0 }, { label: "15-64", value: 65.0 }, { label: "65+", value: 9.0 }],
      ethnic: "Mestizo.",
      displacement: "Afectación moderada."
    },
    socioeconomic: {
      unemployment: "15.8%",
      publicServices: "Baja cobertura de servicios.",
      hdi: "0.640",
      nbi: "28.51%",
      health: "Puesto de salud.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Ovejas": {
    category: "6",
    demographics: {
      total: "22,384",
      gender: { male: 51.5, female: 48.5 },
      ageGroups: [{ label: "0-14", value: 25.5 }, { label: "15-64", value: 65.5 }, { label: "65+", value: 9.0 }],
      ethnic: "Mestizo.",
      displacement: "Epicentro histórico del conflicto y retorno."
    },
    socioeconomic: {
      unemployment: "16.5%",
      publicServices: "Cobertura media, deficiencias rurales.",
      hdi: "0.630",
      nbi: "29.28%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Estable",
      otherCrimes: "Extorsión.",
      armedGroups: "Presencia de AGC."
    }
  },
  "Palmito": {
    category: "6",
    demographics: {
      total: "12,534",
      gender: { male: 51.8, female: 48.2 },
      ageGroups: [{ label: "0-14", value: 30.2 }, { label: "15-64", value: 61.8 }, { label: "65+", value: 8.0 }],
      ethnic: "Mestizo/Indígena.",
      displacement: "Afectación moderada."
    },
    socioeconomic: {
      unemployment: "17.2%",
      publicServices: "Baja cobertura rural.",
      hdi: "0.610",
      nbi: "45.15%",
      health: "Puesto de salud.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Sampués": {
    category: "4",
    demographics: {
      total: "44,617",
      gender: { male: 50.8, female: 49.2 },
      ageGroups: [{ label: "0-14", value: 28.3 }, { label: "15-64", value: 63.7 }, { label: "65+", value: 8.0 }],
      ethnic: "Mestizo/Indígena Zenú.",
      displacement: "Receptor de población desplazada."
    },
    socioeconomic: {
      unemployment: "14.5%",
      publicServices: "Cobertura media, importante sector artesanal.",
      hdi: "0.660",
      nbi: "41.50%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto, microtráfico.",
      armedGroups: "Bandas locales."
    }
  },
  "San Benito Abad": {
    category: "6",
    demographics: {
      total: "25,511",
      gender: { male: 52.6, female: 47.4 },
      ageGroups: [{ label: "0-14", value: 28.9 }, { label: "15-64", value: 62.1 }, { label: "65+", value: 9.0 }],
      ethnic: "Mestizo.",
      displacement: "Afectación por conflicto y desastres naturales."
    },
    socioeconomic: {
      unemployment: "18.0%",
      publicServices: "Baja cobertura de servicios básicos.",
      hdi: "0.600",
      nbi: "36.23%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Abigeato.",
      armedGroups: "Presencia de grupos armados."
    }
  },
  "San Juan de Betulia": {
    category: "6",
    demographics: {
      total: "13,437",
      gender: { male: 51.3, female: 48.7 },
      ageGroups: [{ label: "0-14", value: 23.8 }, { label: "15-64", value: 67.2 }, { label: "65+", value: 9.0 }],
      ethnic: "Mestizo.",
      displacement: "Baja afectación."
    },
    socioeconomic: {
      unemployment: "15.0%",
      publicServices: "Cobertura aceptable.",
      hdi: "0.650",
      nbi: "25.40%",
      health: "Puesto de salud.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "San Marcos": {
    category: "4",
    demographics: {
      total: "53,340",
      gender: { male: 49.9, female: 50.1 },
      ageGroups: [{ label: "0-14", value: 29.5 }, { label: "15-64", value: 62.5 }, { label: "65+", value: 8.0 }],
      ethnic: "Mestizo.",
      displacement: "Centro regional receptor."
    },
    socioeconomic: {
      unemployment: "13.5%",
      publicServices: "Cobertura media-alta urbana.",
      hdi: "0.680",
      nbi: "30.15%",
      health: "Hospital de segundo nivel.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto, microtráfico.",
      armedGroups: "Presencia de AGC."
    }
  },
  "San Onofre": {
    category: "4",
    demographics: {
      total: "47,952",
      gender: { male: 51.0, female: 49.0 },
      ageGroups: [{ label: "0-14", value: 31.8 }, { label: "15-64", value: 60.2 }, { label: "65+", value: 8.0 }],
      ethnic: "Mestizo/Afrodescendiente.",
      displacement: "Históricamente muy afectado por el conflicto."
    },
    socioeconomic: {
      unemployment: "17.8%",
      publicServices: "Deficiencias en agua potable y saneamiento.",
      hdi: "0.620",
      nbi: "41.91%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión, narcotráfico.",
      armedGroups: "Fuerte presencia de AGC."
    }
  },
  "San Pedro (Sucre)": {
    category: "6",
    demographics: {
      total: "18,029",
      gender: { male: 50.6, female: 49.4 },
      ageGroups: [{ label: "0-14", value: 26.5 }, { label: "15-64", value: 64.5 }, { label: "65+", value: 9.0 }],
      ethnic: "Mestizo.",
      displacement: "Afectación moderada."
    },
    socioeconomic: {
      unemployment: "15.5%",
      publicServices: "Cobertura aceptable.",
      hdi: "0.660",
      nbi: "30.08%",
      health: "Puesto de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "San Luis de Sincé": {
    category: "4",
    demographics: {
      total: "30,188",
      gender: { male: 50.5, female: 49.5 },
      ageGroups: [{ label: "0-14", value: 25.0 }, { label: "15-64", value: 66.0 }, { label: "65+", value: 9.0 }],
      ethnic: "Mestizo.",
      displacement: "Baja afectación."
    },
    socioeconomic: {
      unemployment: "14.0%",
      publicServices: "Cobertura media-alta.",
      hdi: "0.690",
      nbi: "30.72%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Sucre (Sucre)": {
    category: "6",
    demographics: {
      total: "23,971",
      gender: { male: 54.0, female: 46.0 },
      ageGroups: [{ label: "0-14", value: 27.8 }, { label: "15-64", value: 63.2 }, { label: "65+", value: 9.0 }],
      ethnic: "Mestizo.",
      displacement: "Vulnerabilidad por aislamiento e inundaciones."
    },
    socioeconomic: {
      unemployment: "18.5%",
      publicServices: "Muy baja cobertura de servicios.",
      hdi: "0.580",
      nbi: "48.30%",
      health: "Puesto de salud.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Grupos armados ilegales."
    }
  },
  "Santiago de Tolú": {
    category: "4",
    demographics: {
      total: "32,012",
      gender: { male: 49.4, female: 50.6 },
      ageGroups: [{ label: "0-14", value: 28.5 }, { label: "15-64", value: 63.5 }, { label: "65+", value: 8.0 }],
      ethnic: "Mestizo/Afro.",
      displacement: "Zona turística."
    },
    socioeconomic: {
      unemployment: "12.5%",
      publicServices: "Cobertura turística aceptable.",
      hdi: "0.700",
      nbi: "23.75%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Microtráfico, extorsión.",
      armedGroups: "AGC."
    }
  },
  "Tolú Viejo": {
    category: "6",
    demographics: {
      total: "20,033",
      gender: { male: 51.0, female: 49.0 },
      ageGroups: [{ label: "0-14", value: 26.8 }, { label: "15-64", value: 64.2 }, { label: "9.0", value: 9.0 }],
      ethnic: "Mestizo.",
      displacement: "Afectación moderada."
    },
    socioeconomic: {
      unemployment: "16.8%",
      publicServices: "Baja cobertura rural.",
      hdi: "0.630",
      nbi: "30.65%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Presencia de AGC."
    }
  },
  "Cartagena": {
    category: "Especial",
    demographics: {
      total: "887,946",
      gender: { male: 48.1, female: 51.9 },
      ageGroups: [
        { label: "0 a 4", value: 70287 }, { label: "5 a 9", value: 72940 }, { label: "10 a 14", value: 72396 },
        { label: "15 a 19", value: 77443 }, { label: "20 a 24", value: 79998 }, { label: "25 a 29", value: 77652 },
        { label: "30 a 34", value: 69439 }, { label: "35 a 39", value: 65513 }, { label: "40 a 44", value: 53938 },
        { label: "45 a 49", value: 50357 }, { label: "50 a 54", value: 50213 }, { label: "55 a 59", value: 43123 },
        { label: "60 a 64", value: 34180 }, { label: "65 a 69", value: 25073 }, { label: "70 a 74", value: 17253 },
        { label: "75 a 79", value: 11802 }, { label: "80 a 84", value: 8049 }, { label: "85 y más", value: 8290 }
      ],
      ethnic: "Mestizo con fuerte presencia Afrodescendiente.",
      displacement: "Principal receptor de población desplazada del departamento."
    },
    socioeconomic: {
      unemployment: "10.5%",
      publicServices: "Cobertura urbana alta, deficiencias en zonas periféricas e insulares.",
      hdi: "0.780",
      nbi: "12.49%",
      health: "Red hospitalaria de alta complejidad.",
      urbanRural: { urban: 95, rural: 5 }
    },
    security: {
      homicideRate: "Retos en zonas periféricas",
      otherCrimes: "Microtráfico, hurto.",
      armedGroups: "Bandas locales, presencia de AGC."
    }
  },
  "Achí": {
    category: "6",
    demographics: {
      total: "18,879",
      gender: { male: 52.8, female: 47.2 },
      ageGroups: [
        { label: "0 a 4", value: 1774 }, { label: "5 a 9", value: 2072 }, { label: "10 a 14", value: 2055 },
        { label: "15 a 19", value: 1846 }, { label: "20 a 24", value: 1482 }, { label: "25 a 29", value: 1375 },
        { label: "30 a 34", value: 1254 }, { label: "35 a 39", value: 1086 }, { label: "40 a 44", value: 1028 },
        { label: "45 a 49", value: 1070 }, { label: "50 a 54", value: 896 }, { label: "55 a 59", value: 736 },
        { label: "60 a 64", value: 560 }, { label: "65 a 69", value: 532 }, { label: "70 a 74", value: 396 },
        { label: "75 a 79", value: 348 }, { label: "80 a 84", value: 196 }, { label: "85 y más", value: 173 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación por conflicto y desastres naturales."
    },
    socioeconomic: {
      unemployment: "18.5%",
      publicServices: "Deficiencias críticas en zonas rurales.",
      hdi: "0.590",
      nbi: "55.92%",
      health: "Puesto de salud local.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Situación focalizada",
      otherCrimes: "Extorsión.",
      armedGroups: "Grupos armados ilegales."
    }
  },
  "Altos del Rosario": {
    category: "6",
    demographics: {
      total: "9,009",
      gender: { male: 52.2, female: 47.8 },
      ageGroups: [
        { label: "0 a 4", value: 984 }, { label: "5 a 9", value: 1024 }, { label: "10 a 14", value: 1126 },
        { label: "15 a 19", value: 978 }, { label: "20 a 24", value: 764 }, { label: "25 a 29", value: 609 },
        { label: "30 a 34", value: 499 }, { label: "35 a 39", value: 474 }, { label: "40 a 44", value: 485 },
        { label: "45 a 49", value: 482 }, { label: "50 a 54", value: 384 }, { label: "55 a 59", value: 314 },
        { label: "60 a 64", value: 250 }, { label: "65 a 69", value: 190 }, { label: "70 a 74", value: 158 },
        { label: "75 a 79", value: 143 }, { label: "80 a 84", value: 73 }, { label: "85 y más", value: 72 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación moderada."
    },
    socioeconomic: {
      unemployment: "17.2%",
      publicServices: "Baja cobertura rural.",
      hdi: "0.610",
      nbi: "58.45%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Estable",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Arenal": {
    category: "6",
    demographics: {
      total: "7,169",
      gender: { male: 51.8, female: 48.2 },
      ageGroups: [
        { label: "0 a 4", value: 676 }, { label: "5 a 9", value: 770 }, { label: "10 a 14", value: 824 },
        { label: "15 a 19", value: 786 }, { label: "20 a 24", value: 526 }, { label: "25 a 29", value: 478 },
        { label: "30 a 34", value: 389 }, { label: "35 a 39", value: 452 }, { label: "40 a 44", value: 413 },
        { label: "45 a 49", value: 400 }, { label: "50 a 54", value: 376 }, { label: "55 a 59", value: 272 },
        { label: "60 a 64", value: 216 }, { label: "65 a 69", value: 183 }, { label: "70 a 74", value: 125 },
        { label: "75 a 79", value: 104 }, { label: "80 a 84", value: 106 }, { label: "85 y más", value: 73 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona de transición."
    },
    socioeconomic: {
      unemployment: "16.8%",
      publicServices: "Deficiencias en saneamiento.",
      hdi: "0.620",
      nbi: "36.27%",
      health: "Puesto de salud.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Grupos locales."
    }
  },
  "Arjona": {
    category: "4",
    demographics: {
      total: "67,118",
      gender: { male: 49.5, female: 50.5 },
      ageGroups: [
        { label: "0 a 4", value: 5822 }, { label: "5 a 9", value: 6045 }, { label: "10 a 14", value: 6345 },
        { label: "15 a 19", value: 6324 }, { label: "20 a 24", value: 5911 }, { label: "25 a 29", value: 5423 },
        { label: "30 a 34", value: 4793 }, { label: "35 a 39", value: 4539 }, { label: "40 a 44", value: 3790 },
        { label: "45 a 49", value: 3775 }, { label: "50 a 54", value: 3558 }, { label: "55 a 59", value: 3077 },
        { label: "60 a 64", value: 2435 }, { label: "65 a 69", value: 1823 }, { label: "70 a 74", value: 1352 },
        { label: "75 a 79", value: 968 }, { label: "80 a 84", value: 630 }, { label: "85 y más", value: 508 }
      ],
      ethnic: "Mestizo.",
      displacement: "Receptor moderado."
    },
    socioeconomic: {
      unemployment: "12.5%",
      publicServices: "Cobertura urbana media.",
      hdi: "0.710",
      nbi: "26.98%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Bandas locales."
    }
  },
  "Arroyohondo": {
    category: "6",
    demographics: {
      total: "8,058",
      gender: { male: 50.7, female: 49.3 },
      ageGroups: [
        { label: "0 a 4", value: 733 }, { label: "5 a 9", value: 757 }, { label: "10 a 14", value: 754 },
        { label: "15 a 19", value: 773 }, { label: "20 a 24", value: 706 }, { label: "25 a 29", value: 636 },
        { label: "30 a 34", value: 518 }, { label: "35 a 39", value: 444 }, { label: "40 a 44", value: 445 },
        { label: "45 a 49", value: 476 }, { label: "50 a 54", value: 459 }, { label: "55 a 59", value: 351 },
        { label: "60 a 64", value: 272 }, { label: "65 a 69", value: 182 }, { label: "70 a 74", value: 157 },
        { label: "75 a 79", value: 168 }, { label: "80 a 84", value: 111 }, { label: "85 y más", value: 116 }
      ],
      ethnic: "Mestizo.",
      displacement: "Baja afectación."
    },
    socioeconomic: {
      unemployment: "15.0%",
      publicServices: "Baja cobertura.",
      hdi: "0.640",
      nbi: "41.87%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto menor.",
      armedGroups: "Baja presencia."
    }
  },
  "Barranco de Loba": {
    category: "6",
    demographics: {
      total: "14,435",
      gender: { male: 51.6, female: 48.4 },
      ageGroups: [
        { label: "0 a 4", value: 1482 }, { label: "5 a 9", value: 1791 }, { label: "10 a 14", value: 1689 },
        { label: "15 a 19", value: 1568 }, { label: "20 a 24", value: 1142 }, { label: "25 a 29", value: 961 },
        { label: "30 a 34", value: 870 }, { label: "35 a 39", value: 810 }, { label: "40 a 44", value: 780 },
        { label: "45 a 49", value: 706 }, { label: "50 a 54", value: 661 }, { label: "55 a 59", value: 561 },
        { label: "60 a 64", value: 387 }, { label: "65 a 69", value: 320 }, { label: "70 a 74", value: 254 },
        { label: "75 a 79", value: 206 }, { label: "80 a 84", value: 141 }, { label: "85 y más", value: 106 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación por minería."
    },
    socioeconomic: {
      unemployment: "16.5%",
      publicServices: "Deficiencias en agua potable.",
      hdi: "0.630",
      nbi: "47.01%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Grupos ligados a minería."
    }
  },
  "Calamar": {
    category: "6",
    demographics: {
      total: "22,202",
      gender: { male: 50.7, female: 49.3 },
      ageGroups: [
        { label: "0 a 4", value: 1870 }, { label: "5 a 9", value: 2359 }, { label: "10 a 14", value: 2290 },
        { label: "15 a 19", value: 2179 }, { label: "20 a 24", value: 1806 }, { label: "25 a 29", value: 1618 },
        { label: "30 a 34", value: 1443 }, { label: "35 a 39", value: 1345 }, { label: "40 a 44", value: 1259 },
        { label: "45 a 49", value: 1227 }, { label: "50 a 54", value: 1112 }, { label: "55 a 59", value: 983 },
        { label: "60 a 64", value: 816 }, { label: "65 a 69", value: 558 }, { label: "70 a 74", value: 448 },
        { label: "75 a 79", value: 385 }, { label: "80 a 84", value: 270 }, { label: "85 y más", value: 234 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación moderada."
    },
    socioeconomic: {
      unemployment: "15.8%",
      publicServices: "Cobertura media.",
      hdi: "0.660",
      nbi: "40.80%",
      health: "Puesto de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Cantagallo": {
    category: "6",
    demographics: {
      total: "6,874",
      gender: { male: 52.8, female: 47.2 },
      ageGroups: [
        { label: "0 a 4", value: 575 }, { label: "5 a 9", value: 745 }, { label: "10 a 14", value: 790 },
        { label: "15 a 19", value: 631 }, { label: "20 a 24", value: 524 }, { label: "25 a 29", value: 513 },
        { label: "30 a 34", value: 505 }, { label: "35 a 39", value: 458 }, { label: "40 a 44", value: 444 },
        { label: "45 a 49", value: 426 }, { label: "50 a 54", value: 339 }, { label: "55 a 59", value: 297 },
        { label: "60 a 64", value: 211 }, { label: "65 a 69", value: 154 }, { label: "70 a 74", value: 96 },
        { label: "75 a 79", value: 85 }, { label: "80 a 84", value: 35 }, { label: "85 y más", value: 46 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona de frontera agrícola."
    },
    socioeconomic: {
      unemployment: "19.2%",
      publicServices: "Baja cobertura rural.",
      hdi: "0.580",
      nbi: "39.35%",
      health: "Puesto de salud.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Presencia de grupos armados."
    }
  },
  "Cicuco": {
    category: "6",
    demographics: {
      total: "13,120",
      gender: { male: 50.5, female: 49.5 },
      ageGroups: [
        { label: "0 a 4", value: 1272 }, { label: "5 a 9", value: 1443 }, { label: "10 a 14", value: 1553 },
        { label: "15 a 19", value: 1311 }, { label: "20 a 24", value: 1016 }, { label: "25 a 29", value: 923 },
        { label: "30 a 34", value: 825 }, { label: "35 a 39", value: 787 }, { label: "40 a 44", value: 741 },
        { label: "45 a 49", value: 705 }, { label: "50 a 54", value: 608 }, { label: "55 a 59", value: 530 },
        { label: "60 a 64", value: 381 }, { label: "65 a 69", value: 326 }, { label: "70 a 74", value: 221 },
        { label: "75 a 79", value: 265 }, { label: "80 a 84", value: 113 }, { label: "85 y más", value: 100 }
      ],
      ethnic: "Mestizo.",
      displacement: "Baja afectación."
    },
    socioeconomic: {
      unemployment: "15.5%",
      publicServices: "Cobertura aceptable.",
      hdi: "0.650",
      nbi: "33.94%",
      health: "Puesto de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Córdoba (Bolívar)": {
    category: "6",
    demographics: {
      total: "15,012",
      gender: { male: 53.1, female: 46.9 },
      ageGroups: [
        { label: "0 a 4", value: 1192 }, { label: "5 a 9", value: 1677 }, { label: "10 a 14", value: 1506 },
        { label: "15 a 19", value: 1470 }, { label: "20 a 24", value: 1167 }, { label: "25 a 29", value: 1112 },
        { label: "30 a 34", value: 968 }, { label: "35 a 39", value: 861 }, { label: "40 a 44", value: 854 },
        { label: "45 a 49", value: 832 }, { label: "50 a 54", value: 729 }, { label: "55 a 59", value: 667 },
        { label: "60 a 64", value: 569 }, { label: "65 a 69", value: 489 }, { label: "70 a 74", value: 345 },
        { label: "75 a 79", value: 256 }, { label: "80 a 84", value: 175 }, { label: "85 y más", value: 143 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación moderada."
    },
    socioeconomic: {
      unemployment: "17.0%",
      publicServices: "Baja cobertura rural.",
      hdi: "0.620",
      nbi: "29.95%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Estable",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Clemencia": {
    category: "6",
    demographics: {
      total: "13,821",
      gender: { male: 50.6, female: 49.4 },
      ageGroups: [
        { label: "0 a 4", value: 1378 }, { label: "5 a 9", value: 1378 }, { label: "10 a 14", value: 1329 },
        { label: "15 a 19", value: 1418 }, { label: "20 a 24", value: 1229 }, { label: "25 a 29", value: 1180 },
        { label: "30 a 34", value: 960 }, { label: "35 a 39", value: 823 }, { label: "40 a 44", value: 727 },
        { label: "45 a 49", value: 723 }, { label: "50 a 54", value: 711 }, { label: "55 a 59", value: 589 },
        { label: "60 a 64", value: 416 }, { label: "65 a 69", value: 347 }, { label: "70 a 74", value: 249 },
        { label: "75 a 79", value: 150 }, { label: "80 a 84", value: 106 }, { label: "85 y más", value: 108 }
      ],
      ethnic: "Mestizo.",
      displacement: "Baja afectación."
    },
    socioeconomic: {
      unemployment: "16.2%",
      publicServices: "Deficiencias en agua potable.",
      hdi: "0.630",
      nbi: "84.94%",
      health: "Puesto de salud.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "El Carmen de Bolívar": {
    category: "4",
    demographics: {
      total: "67,461",
      gender: { male: 51.5, female: 48.5 },
      ageGroups: [
        { label: "0 a 4", value: 5922 }, { label: "5 a 9", value: 6616 }, { label: "10 a 14", value: 6623 },
        { label: "15 a 19", value: 6387 }, { label: "20 a 24", value: 5710 }, { label: "25 a 29", value: 5285 },
        { label: "30 a 34", value: 4480 }, { label: "35 a 39", value: 4211 }, { label: "40 a 44", value: 3675 },
        { label: "45 a 49", value: 3782 }, { label: "50 a 54", value: 3359 }, { label: "55 a 59", value: 2914 },
        { label: "60 a 64", value: 2487 }, { label: "65 a 69", value: 2017 }, { label: "70 a 74", value: 1417 },
        { label: "75 a 79", value: 1003 }, { label: "80 a 84", value: 837 }, { label: "85 y más", value: 736 }
      ],
      ethnic: "Mestizo.",
      displacement: "Epicentro histórico del conflicto y retorno."
    },
    socioeconomic: {
      unemployment: "14.8%",
      publicServices: "Cobertura media, deficiencias rurales.",
      hdi: "0.680",
      nbi: "41.55%",
      health: "Hospital de segundo nivel.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Presencia de AGC."
    }
  },
  "El Guamo": {
    category: "6",
    demographics: {
      total: "7,861",
      gender: { male: 53.1, female: 46.9 },
      ageGroups: [
        { label: "0 a 4", value: 555 }, { label: "5 a 9", value: 692 }, { label: "10 a 14", value: 702 },
        { label: "15 a 19", value: 679 }, { label: "20 a 24", value: 592 }, { label: "25 a 29", value: 545 },
        { label: "30 a 34", value: 521 }, { label: "35 a 39", value: 514 }, { label: "40 a 44", value: 438 },
        { label: "45 a 49", value: 442 }, { label: "50 a 54", value: 476 }, { label: "55 a 59", value: 372 },
        { label: "60 a 64", value: 356 }, { label: "65 a 69", value: 313 }, { label: "70 a 74", value: 232 },
        { label: "75 a 79", value: 206 }, { label: "80 a 84", value: 122 }, { label: "85 y más", value: 104 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación moderada."
    },
    socioeconomic: {
      unemployment: "15.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.640",
      nbi: "29.40%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "El Peñón": {
    category: "6",
    demographics: {
      total: "7,234",
      gender: { male: 52.7, female: 47.3 },
      ageGroups: [
        { label: "0 a 4", value: 709 }, { label: "5 a 9", value: 795 }, { label: "10 a 14", value: 899 },
        { label: "15 a 19", value: 756 }, { label: "20 a 24", value: 503 }, { label: "25 a 29", value: 433 },
        { label: "30 a 34", value: 419 }, { label: "35 a 39", value: 403 }, { label: "40 a 44", value: 388 },
        { label: "45 a 49", value: 352 }, { label: "50 a 54", value: 333 }, { label: "55 a 59", value: 311 },
        { label: "60 a 64", value: 246 }, { label: "65 a 69", value: 203 }, { label: "70 a 74", value: 159 },
        { label: "75 a 79", value: 144 }, { label: "80 a 84", value: 104 }, { label: "85 y más", value: 77 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación por minería."
    },
    socioeconomic: {
      unemployment: "17.8%",
      publicServices: "Baja cobertura.",
      hdi: "0.610",
      nbi: "47.87%",
      health: "Puesto de salud.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Grupos locales."
    }
  },
  "Hatillo de Loba": {
    category: "6",
    demographics: {
      total: "11,770",
      gender: { male: 51.4, female: 48.6 },
      ageGroups: [
        { label: "0 a 4", value: 1184 }, { label: "5 a 9", value: 1359 }, { label: "10 a 14", value: 1460 },
        { label: "15 a 19", value: 1281 }, { label: "20 a 24", value: 904 }, { label: "25 a 29", value: 780 },
        { label: "30 a 34", value: 688 }, { label: "35 a 39", value: 638 }, { label: "40 a 44", value: 552 },
        { label: "45 a 49", value: 550 }, { label: "50 a 54", value: 531 }, { label: "55 a 59", value: 459 },
        { label: "60 a 64", value: 356 }, { label: "65 a 69", value: 291 }, { label: "70 a 74", value: 249 },
        { label: "75 a 79", value: 232 }, { label: "80 a 84", value: 129 }, { label: "85 y más", value: 127 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona ribereña."
    },
    socioeconomic: {
      unemployment: "16.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.630",
      nbi: "50.45%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Magangué": {
    category: "2",
    demographics: {
      total: "123,831",
      gender: { male: 49.8, female: 50.2 },
      ageGroups: [
        { label: "0 a 4", value: 10822 }, { label: "5 a 9", value: 11456 }, { label: "10 a 14", value: 11623 },
        { label: "15 a 19", value: 11387 }, { label: "20 a 24", value: 10710 }, { label: "25 a 29", value: 10285 },
        { label: "30 a 34", value: 9480 }, { label: "35 a 39", value: 9211 }, { label: "40 a 44", value: 8675 },
        { label: "45 a 49", value: 8782 }, { label: "50 a 54", value: 7359 }, { label: "55 a 59", value: 6914 },
        { label: "60 a 64", value: 5487 }, { label: "65 a 69", value: 4017 }, { label: "70 a 74", value: 3417 },
        { label: "75 a 79", value: 2003 }, { label: "80 a 84", value: 1237 }, { label: "85 y más", value: 966 }
      ],
      ethnic: "Mestizo.",
      displacement: "Centro regional de servicios y recepción de población."
    },
    socioeconomic: {
      unemployment: "13.5%",
      publicServices: "Cobertura urbana aceptable.",
      hdi: "0.740",
      nbi: "33.15%",
      health: "Hospital de segundo y tercer nivel.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto, microtráfico.",
      armedGroups: "Presencia de AGC."
    }
  },
  "Mahates": {
    category: "6",
    demographics: {
      total: "25,112",
      gender: { male: 51.2, female: 48.8 },
      ageGroups: [
        { label: "0 a 4", value: 2470 }, { label: "5 a 9", value: 2659 }, { label: "10 a 14", value: 2590 },
        { label: "15 a 19", value: 2479 }, { label: "20 a 24", value: 2106 }, { label: "25 a 29", value: 1918 },
        { label: "30 a 34", value: 1743 }, { label: "35 a 39", value: 1645 }, { label: "40 a 44", value: 1559 },
        { label: "45 a 49", value: 1527 }, { label: "50 a 54", value: 1412 }, { label: "55 a 59", value: 1283 },
        { label: "60 a 64", value: 1016 }, { label: "65 a 69", value: 858 }, { label: "70 a 74", value: 648 },
        { label: "75 a 79", value: 585 }, { label: "80 a 84", value: 370 }, { label: "85 y más", value: 244 }
      ],
      ethnic: "Mestizo y Afrodescendiente (Palenque).",
      displacement: "Afectación histórica."
    },
    socioeconomic: {
      unemployment: "15.2%",
      publicServices: "Deficiencias en saneamiento.",
      hdi: "0.650",
      nbi: "45.80%",
      health: "Puesto de salud.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Margarita": {
    category: "6",
    demographics: {
      total: "9,871",
      gender: { male: 52.1, female: 47.9 },
      ageGroups: [
        { label: "0 a 4", value: 984 }, { label: "5 a 9", value: 1124 }, { label: "10 a 14", value: 1226 },
        { label: "15 a 19", value: 1078 }, { label: "20 a 24", value: 864 }, { label: "25 a 29", value: 709 },
        { label: "30 a 34", value: 599 }, { label: "35 a 39", value: 574 }, { label: "40 a 44", value: 585 },
        { label: "45 a 49", value: 582 }, { label: "50 a 54", value: 484 }, { label: "55 a 59", value: 414 },
        { label: "60 a 64", value: 350 }, { label: "65 a 69", value: 290 }, { label: "70 a 74", value: 258 },
        { label: "75 a 79", value: 243 }, { label: "80 a 84", value: 173 }, { label: "85 y más", value: 138 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona ribereña."
    },
    socioeconomic: {
      unemployment: "16.8%",
      publicServices: "Baja cobertura.",
      hdi: "0.620",
      nbi: "48.45%",
      health: "Puesto de salud.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "María La Baja": {
    category: "6",
    demographics: {
      total: "48,123",
      gender: { male: 51.8, female: 48.2 },
      ageGroups: [
        { label: "0 a 4", value: 4676 }, { label: "5 a 9", value: 4770 }, { label: "10 a 14", value: 4824 },
        { label: "15 a 19", value: 4786 }, { label: "20 a 24", value: 4526 }, { label: "25 a 29", value: 4478 },
        { label: "30 a 34", value: 3389 }, { label: "35 a 39", value: 3452 }, { label: "40 a 44", value: 3413 },
        { label: "45 a 49", value: 3400 }, { label: "50 a 54", value: 2376 }, { label: "55 a 59", value: 2272 },
        { label: "60 a 64", value: 1216 }, { label: "65 a 69", value: 1183 }, { label: "70 a 74", value: 1125 },
        { label: "75 a 79", value: 1104 }, { label: "80 a 84", value: 1106 }, { label: "85 y más", value: 1073 }
      ],
      ethnic: "Fuerte presencia Afrodescendiente.",
      displacement: "Zona de alta afectación histórica por conflicto."
    },
    socioeconomic: {
      unemployment: "17.5%",
      publicServices: "Deficiencias en saneamiento y agua.",
      hdi: "0.640",
      nbi: "56.27%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Presencia de AGC."
    }
  },
  "Montecristo": {
    category: "6",
    demographics: {
      total: "12,118",
      gender: { male: 53.5, female: 46.5 },
      ageGroups: [
        { label: "0 a 4", value: 1122 }, { label: "5 a 9", value: 1316 }, { label: "10 a 14", value: 1323 },
        { label: "15 a 19", value: 1287 }, { label: "20 a 24", value: 1110 }, { label: "25 a 29", value: 1085 },
        { label: "30 a 34", value: 980 }, { label: "35 a 39", value: 911 }, { label: "40 a 44", value: 875 },
        { label: "45 a 49", value: 882 }, { label: "50 a 54", value: 759 }, { label: "55 a 59", value: 614 },
        { label: "60 a 64", value: 487 }, { label: "65 a 69", value: 317 }, { label: "70 a 74", value: 217 },
        { label: "75 a 79", value: 103 }, { label: "80 a 84", value: 87 }, { label: "85 y más", value: 66 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación por minería ilegal y conflicto."
    },
    socioeconomic: {
      unemployment: "19.5%",
      publicServices: "Muy baja cobertura.",
      hdi: "0.570",
      nbi: "61.55%",
      health: "Puesto de salud.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión, minería ilegal.",
      armedGroups: "ELN, AGC."
    }
  },
  "Morales": {
    category: "6",
    demographics: {
      total: "19,861",
      gender: { male: 52.1, female: 47.9 },
      ageGroups: [
        { label: "0 a 4", value: 1855 }, { label: "5 a 9", value: 1992 }, { label: "10 a 14", value: 2002 },
        { label: "15 a 19", value: 1979 }, { label: "20 a 24", value: 1792 }, { label: "25 a 29", value: 1645 },
        { label: "30 a 34", value: 1521 }, { label: "35 a 39", value: 1414 }, { label: "40 a 44", value: 1338 },
        { label: "45 a 49", value: 1342 }, { label: "50 a 54", value: 1176 }, { label: "55 a 59", value: 1072 },
        { label: "60 a 64", value: 856 }, { label: "65 a 69", value: 713 }, { label: "70 a 74", value: 532 },
        { label: "75 a 79", value: 406 }, { label: "80 a 84", value: 222 }, { label: "85 y más", value: 104 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona de conflicto activo."
    },
    socioeconomic: {
      unemployment: "18.2%",
      publicServices: "Baja cobertura.",
      hdi: "0.590",
      nbi: "49.40%",
      health: "Puesto de salud.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión.",
      armedGroups: "ELN, AGC."
    }
  },
  "Norosí": {
    category: "6",
    demographics: {
      total: "8,234",
      gender: { male: 53.7, female: 46.3 },
      ageGroups: [
        { label: "0 a 4", value: 809 }, { label: "5 a 9", value: 895 }, { label: "10 a 14", value: 999 },
        { label: "15 a 19", value: 856 }, { label: "20 a 24", value: 703 }, { label: "25 a 29", value: 633 },
        { label: "30 a 34", value: 619 }, { label: "35 a 39", value: 603 }, { label: "40 a 44", value: 588 },
        { label: "45 a 49", value: 552 }, { label: "50 a 54", value: 533 }, { label: "55 a 59", value: 411 },
        { label: "60 a 64", value: 346 }, { label: "65 a 69", value: 203 }, { label: "70 a 74", value: 159 },
        { label: "75 a 79", value: 144 }, { label: "80 a 84", value: 104 }, { label: "85 y más", value: 77 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación por minería."
    },
    socioeconomic: {
      unemployment: "18.8%",
      publicServices: "Baja cobertura.",
      hdi: "0.580",
      nbi: "57.87%",
      health: "Puesto de salud.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión.",
      armedGroups: "Grupos armados ilegales."
    }
  },
  "Pinillos": {
    category: "6",
    demographics: {
      total: "22,770",
      gender: { male: 52.4, female: 47.6 },
      ageGroups: [
        { label: "0 a 4", value: 2184 }, { label: "5 a 9", value: 2359 }, { label: "10 a 14", value: 2460 },
        { label: "15 a 19", value: 2281 }, { label: "20 a 24", value: 1904 }, { label: "25 a 29", value: 1780 },
        { label: "30 a 34", value: 1688 }, { label: "35 a 39", value: 1638 }, { label: "40 a 44", value: 1552 },
        { label: "45 a 49", value: 1550 }, { label: "50 a 54", value: 1431 }, { label: "55 a 59", value: 1259 },
        { label: "60 a 64", value: 1056 }, { label: "65 a 69", value: 891 }, { label: "70 a 74", value: 749 },
        { label: "75 a 79", value: 632 }, { label: "80 a 84", value: 429 }, { label: "85 y más", value: 327 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona ribereña con alta vulnerabilidad."
    },
    socioeconomic: {
      unemployment: "17.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.600",
      nbi: "60.45%",
      health: "Puesto de salud.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Presencia de grupos armados."
    }
  },
  "Regidor": {
    category: "6",
    demographics: {
      total: "10,123",
      gender: { male: 51.5, female: 48.5 },
      ageGroups: [
        { label: "0 a 4", value: 1022 }, { label: "5 a 9", value: 1116 }, { label: "10 a 14", value: 1123 },
        { label: "15 a 19", value: 1087 }, { label: "20 a 24", value: 910 }, { label: "25 a 29", value: 885 },
        { label: "30 a 34", value: 780 }, { label: "35 a 39", value: 711 }, { label: "40 a 44", value: 675 },
        { label: "45 a 49", value: 682 }, { label: "50 a 54", value: 559 }, { label: "55 a 59", value: 414 },
        { label: "60 a 64", value: 387 }, { label: "65 a 69", value: 217 }, { label: "70 a 74", value: 187 },
        { label: "75 a 79", value: 153 }, { label: "80 a 84", value: 107 }, { label: "85 y más", value: 106 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona ribereña."
    },
    socioeconomic: {
      unemployment: "16.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.620",
      nbi: "52.15%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Río Viejo": {
    category: "6",
    demographics: {
      total: "9,861",
      gender: { male: 52.1, female: 47.9 },
      ageGroups: [
        { label: "0 a 4", value: 955 }, { label: "5 a 9", value: 1092 }, { label: "10 a 14", value: 1102 },
        { label: "15 a 19", value: 1079 }, { label: "20 a 24", value: 892 }, { label: "25 a 29", value: 845 },
        { label: "30 a 34", value: 721 }, { label: "35 a 39", value: 714 }, { label: "40 a 44", value: 638 },
        { label: "45 a 49", value: 642 }, { label: "50 a 54", value: 576 }, { label: "55 a 59", value: 472 },
        { label: "60 a 64", value: 356 }, { label: "65 a 69", value: 313 }, { label: "70 a 74", value: 232 },
        { label: "75 a 79", value: 106 }, { label: "80 a 84", value: 62 }, { label: "85 y más", value: 64 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación por minería."
    },
    socioeconomic: {
      unemployment: "17.2%",
      publicServices: "Baja cobertura.",
      hdi: "0.610",
      nbi: "54.40%",
      health: "Puesto de salud.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Grupos locales."
    }
  },
  "San Cristóbal": {
    category: "6",
    demographics: {
      total: "6,234",
      gender: { male: 50.7, female: 49.3 },
      ageGroups: [
        { label: "0 a 4", value: 609 }, { label: "5 a 9", value: 695 }, { label: "10 a 14", value: 799 },
        { label: "15 a 19", value: 656 }, { label: "20 a 24", value: 503 }, { label: "25 a 29", value: 433 },
        { label: "30 a 34", value: 419 }, { label: "35 a 39", value: 403 }, { label: "40 a 44", value: 388 },
        { label: "45 a 49", value: 352 }, { label: "50 a 54", value: 333 }, { label: "55 a 59", value: 211 },
        { label: "60 a 64", value: 146 }, { label: "65 a 69", value: 103 }, { label: "70 a 74", value: 79 },
        { label: "75 a 79", value: 44 }, { label: "80 a 84", value: 34 }, { label: "85 y más", value: 27 }
      ],
      ethnic: "Mestizo.",
      displacement: "Baja afectación."
    },
    socioeconomic: {
      unemployment: "15.8%",
      publicServices: "Baja cobertura.",
      hdi: "0.630",
      nbi: "37.87%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "San Estanislao": {
    category: "6",
    demographics: {
      total: "15,770",
      gender: { male: 50.4, female: 49.6 },
      ageGroups: [
        { label: "0 a 4", value: 1584 }, { label: "5 a 9", value: 1659 }, { label: "10 a 14", value: 1760 },
        { label: "15 a 19", value: 1581 }, { label: "20 a 24", value: 1304 }, { label: "25 a 29", value: 1280 },
        { label: "30 a 34", value: 1188 }, { label: "35 a 39", value: 1038 }, { label: "40 a 44", value: 952 },
        { label: "45 a 49", value: 850 }, { label: "50 a 54", value: 731 }, { label: "55 a 59", value: 659 },
        { label: "60 a 64", value: 456 }, { label: "65 a 69", value: 321 }, { label: "70 a 74", value: 189 },
        { label: "75 a 79", value: 102 }, { label: "80 a 84", value: 79 }, { label: "85 y más", value: 57 }
      ],
      ethnic: "Mestizo.",
      displacement: "Baja afectación."
    },
    socioeconomic: {
      unemployment: "14.5%",
      publicServices: "Cobertura media.",
      hdi: "0.670",
      nbi: "30.45%",
      health: "Puesto de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "San Fernando": {
    category: "6",
    demographics: {
      total: "13,123",
      gender: { male: 51.8, female: 48.2 },
      ageGroups: [
        { label: "0 a 4", value: 1322 }, { label: "5 a 9", value: 1416 }, { label: "10 a 14", value: 1423 },
        { label: "15 a 19", value: 1387 }, { label: "20 a 24", value: 1110 }, { label: "25 a 29", value: 1085 },
        { label: "30 a 34", value: 980 }, { label: "35 a 39", value: 911 }, { label: "40 a 44", value: 875 },
        { label: "45 a 49", value: 882 }, { label: "50 a 54", value: 659 }, { label: "55 a 59", value: 414 },
        { label: "60 a 64", value: 287 }, { label: "65 a 69", value: 187 }, { label: "70 a 74", value: 117 },
        { label: "75 a 79", value: 83 }, { label: "80 a 84", value: 47 }, { label: "85 y más", value: 38 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona ribereña."
    },
    socioeconomic: {
      unemployment: "16.8%",
      publicServices: "Baja cobertura.",
      hdi: "0.620",
      nbi: "42.15%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "San Jacinto": {
    category: "6",
    demographics: {
      total: "28,861",
      gender: { male: 50.1, female: 49.9 },
      ageGroups: [
        { label: "0 a 4", value: 2655 }, { label: "5 a 9", value: 2892 }, { label: "10 a 14", value: 2902 },
        { label: "15 a 19", value: 2879 }, { label: "20 a 24", value: 2592 }, { label: "25 a 29", value: 2445 },
        { label: "30 a 34", value: 2221 }, { label: "35 a 39", value: 2114 }, { label: "40 a 44", value: 1938 },
        { label: "45 a 49", value: 1842 }, { label: "50 a 54", value: 1476 }, { label: "55 a 59", value: 1172 },
        { label: "60 a 64", value: 856 }, { label: "65 a 69", value: 413 }, { label: "70 a 74", value: 232 },
        { label: "75 a 79", value: 106 }, { label: "80 a 84", value: 72 }, { label: "85 y más", value: 54 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación histórica por conflicto en Montes de María."
    },
    socioeconomic: {
      unemployment: "15.2%",
      publicServices: "Cobertura media.",
      hdi: "0.680",
      nbi: "39.40%",
      health: "Puesto de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Presencia de AGC."
    }
  },
  "San Jacinto del Cauca": {
    category: "6",
    demographics: {
      total: "10,234",
      gender: { male: 52.7, female: 47.3 },
      ageGroups: [
        { label: "0 a 4", value: 1009 }, { label: "5 a 9", value: 1195 }, { label: "10 a 14", value: 1299 },
        { label: "15 a 19", value: 1056 }, { label: "20 a 24", value: 803 }, { label: "25 a 29", value: 733 },
        { label: "30 a 34", value: 619 }, { label: "35 a 39", value: 503 }, { label: "40 a 44", value: 488 },
        { label: "45 a 49", value: 452 }, { label: "50 a 54", value: 433 }, { label: "55 a 59", value: 311 },
        { label: "60 a 64", value: 246 }, { label: "65 a 69", value: 203 }, { label: "70 a 74", value: 159 },
        { label: "75 a 79", value: 144 }, { label: "80 a 84", value: 104 }, { label: "85 y más", value: 77 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona ribereña con alta vulnerabilidad."
    },
    socioeconomic: {
      unemployment: "18.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.590",
      nbi: "57.87%",
      health: "Puesto de salud.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Grupos armados ilegales."
    }
  },
  "San Juan Nepomuceno": {
    category: "4",
    demographics: {
      total: "33,770",
      gender: { male: 50.4, female: 49.6 },
      ageGroups: [
        { label: "0 a 4", value: 3184 }, { label: "5 a 9", value: 3359 }, { label: "10 a 14", value: 3460 },
        { label: "15 a 19", value: 3281 }, { label: "20 a 24", value: 2904 }, { label: "25 a 29", value: 2780 },
        { label: "30 a 34", value: 2688 }, { label: "35 a 39", value: 2638 }, { label: "40 a 44", value: 2552 },
        { label: "45 a 49", value: 2550 }, { label: "50 a 54", value: 2131 }, { label: "55 a 59", value: 1959 },
        { label: "60 a 64", value: 1456 }, { label: "65 a 69", value: 1091 }, { label: "70 a 74", value: 849 },
        { label: "75 a 79", value: 632 }, { label: "80 a 84", value: 429 }, { label: "85 y más", value: 327 }
      ],
      ethnic: "Mestizo.",
      displacement: "Centro importante en Montes de María."
    },
    socioeconomic: {
      unemployment: "14.5%",
      publicServices: "Cobertura media.",
      hdi: "0.690",
      nbi: "30.45%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Presencia de AGC."
    }
  },
  "San Martín de Loba": {
    category: "6",
    demographics: {
      total: "14,123",
      gender: { male: 51.5, female: 48.5 },
      ageGroups: [
        { label: "0 a 4", value: 1422 }, { label: "5 a 9", value: 1516 }, { label: "10 a 14", value: 1523 },
        { label: "15 a 19", value: 1487 }, { label: "20 a 24", value: 1210 }, { label: "25 a 29", value: 1185 },
        { label: "30 a 34", value: 1080 }, { label: "35 a 39", value: 911 }, { label: "40 a 44", value: 875 },
        { label: "45 a 49", value: 882 }, { label: "50 a 54", value: 759 }, { label: "55 a 59", value: 614 },
        { label: "60 a 64", value: 487 }, { label: "65 a 69", value: 317 }, { label: "70 a 74", value: 217 },
        { label: "75 a 79", value: 153 }, { label: "80 a 84", value: 107 }, { label: "85 y más", value: 106 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación por minería ilegal."
    },
    socioeconomic: {
      unemployment: "17.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.610",
      nbi: "58.15%",
      health: "Puesto de salud.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión, minería ilegal.",
      armedGroups: "ELN, AGC."
    }
  },
  "San Pablo": {
    category: "6",
    demographics: {
      total: "28,861",
      gender: { male: 52.1, female: 47.9 },
      ageGroups: [
        { label: "0 a 4", value: 2655 }, { label: "5 a 9", value: 2892 }, { label: "10 a 14", value: 2902 },
        { label: "15 a 19", value: 2879 }, { label: "20 a 24", value: 2592 }, { label: "25 a 29", value: 2445 },
        { label: "30 a 34", value: 2221 }, { label: "35 a 39", value: 2114 }, { label: "40 a 44", value: 1938 },
        { label: "45 a 49", value: 1842 }, { label: "50 a 54", value: 1476 }, { label: "55 a 59", value: 1172 },
        { label: "60 a 64", value: 856 }, { label: "65 a 69", value: 413 }, { label: "70 a 74", value: 232 },
        { label: "75 a 79", value: 106 }, { label: "80 a 84", value: 72 }, { label: "85 y más", value: 54 }
      ],
      ethnic: "Mestizo.",
      displacement: "Alta afectación por conflicto en el Sur de Bolívar."
    },
    socioeconomic: {
      unemployment: "18.2%",
      publicServices: "Baja cobertura.",
      hdi: "0.600",
      nbi: "54.40%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión.",
      armedGroups: "ELN, AGC."
    }
  },
  "Santa Catalina": {
    category: "6",
    demographics: {
      total: "12,234",
      gender: { male: 50.7, female: 49.3 },
      ageGroups: [
        { label: "0 a 4", value: 1209 }, { label: "5 a 9", value: 1395 }, { label: "10 a 14", value: 1499 },
        { label: "15 a 19", value: 1256 }, { label: "20 a 24", value: 1003 }, { label: "25 a 29", value: 933 },
        { label: "30 a 34", value: 819 }, { label: "35 a 39", value: 703 }, { label: "40 a 44", value: 688 },
        { label: "45 a 49", value: 652 }, { label: "50 a 54", value: 533 }, { label: "55 a 59", value: 411 },
        { label: "60 a 64", value: 346 }, { label: "65 a 69", value: 203 }, { label: "70 a 74", value: 159 },
        { label: "75 a 79", value: 144 }, { label: "80 a 84", value: 104 }, { label: "85 y más", value: 77 }
      ],
      ethnic: "Mestizo.",
      displacement: "Baja afectación."
    },
    socioeconomic: {
      unemployment: "15.8%",
      publicServices: "Cobertura media.",
      hdi: "0.660",
      nbi: "37.87%",
      health: "Puesto de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Santa Rosa": {
    category: "6",
    demographics: {
      total: "20,770",
      gender: { male: 50.4, female: 49.6 },
      ageGroups: [
        { label: "0 a 4", value: 2084 }, { label: "5 a 9", value: 2159 }, { label: "10 a 14", value: 2260 },
        { label: "15 a 19", value: 2081 }, { label: "20 a 24", value: 1804 }, { label: "25 a 29", value: 1780 },
        { label: "30 a 34", value: 1688 }, { label: "35 a 39", value: 1538 }, { label: "40 a 44", value: 1452 },
        { label: "45 a 49", value: 1350 }, { label: "50 a 54", value: 1231 }, { label: "55 a 59", value: 1159 },
        { label: "60 a 64", value: 956 }, { label: "65 a 69", value: 721 }, { label: "70 a 74", value: 589 },
        { label: "75 a 79", value: 402 }, { label: "80 a 84", value: 279 }, { label: "85 y más", value: 157 }
      ],
      ethnic: "Mestizo.",
      displacement: "Baja afectación."
    },
    socioeconomic: {
      unemployment: "14.5%",
      publicServices: "Cobertura media.",
      hdi: "0.680",
      nbi: "30.45%",
      health: "Puesto de salud.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Santa Rosa del Sur": {
    category: "4",
    demographics: {
      total: "42,123",
      gender: { male: 52.8, female: 47.2 },
      ageGroups: [
        { label: "0 a 4", value: 4122 }, { label: "5 a 9", value: 4316 }, { label: "10 a 14", value: 4423 },
        { label: "15 a 19", value: 4287 }, { label: "20 a 24", value: 3910 }, { label: "25 a 29", value: 3785 },
        { label: "30 a 34", value: 3480 }, { label: "35 a 39", value: 3211 }, { label: "40 a 44", value: 3075 },
        { label: "45 a 49", value: 2982 }, { label: "50 a 54", value: 2559 }, { label: "55 a 59", value: 2114 },
        { label: "60 a 64", value: 1587 }, { label: "65 a 69", value: 1017 }, { label: "70 a 74", value: 817 },
        { label: "75 a 79", value: 603 }, { label: "80 a 84", value: 487 }, { label: "85 y más", value: 366 }
      ],
      ethnic: "Mestizo.",
      displacement: "Centro regional y receptor de población."
    },
    socioeconomic: {
      unemployment: "13.8%",
      publicServices: "Cobertura urbana aceptable.",
      hdi: "0.710",
      nbi: "35.15%",
      health: "Hospital de segundo nivel.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión, minería ilegal.",
      armedGroups: "ELN, AGC."
    }
  },
  "Simití": {
    category: "6",
    demographics: {
      total: "19,861",
      gender: { male: 52.1, female: 47.9 },
      ageGroups: [
        { label: "0 a 4", value: 1855 }, { label: "5 a 9", value: 1992 }, { label: "10 a 14", value: 2002 },
        { label: "15 a 19", value: 1979 }, { label: "20 a 24", value: 1792 }, { label: "25 a 29", value: 1645 },
        { label: "30 a 34", value: 1521 }, { label: "35 a 39", value: 1414 }, { label: "40 a 44", value: 1338 },
        { label: "45 a 49", value: 1342 }, { label: "50 a 54", value: 1176 }, { label: "55 a 59", value: 1072 },
        { label: "60 a 64", value: 856 }, { label: "65 a 69", value: 413 }, { label: "70 a 74", value: 232 },
        { label: "75 a 79", value: 106 }, { label: "80 a 84", value: 72 }, { label: "85 y más", value: 54 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación histórica por conflicto."
    },
    socioeconomic: {
      unemployment: "17.2%",
      publicServices: "Baja cobertura.",
      hdi: "0.620",
      nbi: "49.40%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión.",
      armedGroups: "ELN, AGC."
    }
  },
  "Soplaviento": {
    category: "6",
    demographics: {
      total: "8,234",
      gender: { male: 51.7, female: 48.3 },
      ageGroups: [
        { label: "0 a 4", value: 809 }, { label: "5 a 9", value: 895 }, { label: "10 a 14", value: 999 },
        { label: "15 a 19", value: 856 }, { label: "20 a 24", value: 703 }, { label: "25 a 29", value: 633 },
        { label: "30 a 34", value: 619 }, { label: "35 a 39", value: 503 }, { label: "40 a 44", value: 488 },
        { label: "45 a 49", value: 452 }, { label: "50 a 54", value: 433 }, { label: "55 a 59", value: 311 },
        { label: "60 a 64", value: 246 }, { label: "65 a 69", value: 203 }, { label: "70 a 74", value: 159 },
        { label: "75 a 79", value: 144 }, { label: "80 a 84", value: 104 }, { label: "85 y más", value: 77 }
      ],
      ethnic: "Mestizo.",
      displacement: "Baja afectación."
    },
    socioeconomic: {
      unemployment: "16.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.640",
      nbi: "37.87%",
      health: "Puesto de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Talaigua Nuevo": {
    category: "6",
    demographics: {
      total: "11,770",
      gender: { male: 50.4, female: 49.6 },
      ageGroups: [
        { label: "0 a 4", value: 1184 }, { label: "5 a 9", value: 1259 }, { label: "10 a 14", value: 1360 },
        { label: "15 a 19", value: 1181 }, { label: "20 a 24", value: 1004 }, { label: "25 a 29", value: 980 },
        { label: "30 a 34", value: 888 }, { label: "35 a 39", value: 738 }, { label: "40 a 44", value: 652 },
        { label: "45 a 49", value: 550 }, { label: "50 a 54", value: 531 }, { label: "55 a 59", value: 459 },
        { label: "60 a 64", value: 356 }, { label: "65 a 69", value: 291 }, { label: "70 a 74", value: 249 },
        { label: "75 a 79", value: 232 }, { label: "80 a 84", value: 129 }, { label: "85 y más", value: 127 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona ribereña."
    },
    socioeconomic: {
      unemployment: "15.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.650",
      nbi: "40.45%",
      health: "Puesto de salud.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Tiquisio": {
    category: "6",
    demographics: {
      total: "22,123",
      gender: { male: 52.5, female: 47.5 },
      ageGroups: [
        { label: "0 a 4", value: 2122 }, { label: "5 a 9", value: 2316 }, { label: "10 a 14", value: 2423 },
        { label: "15 a 19", value: 2287 }, { label: "20 a 24", value: 1910 }, { label: "25 a 29", value: 1885 },
        { label: "30 a 34", value: 1680 }, { label: "35 a 39", value: 1511 }, { label: "40 a 44", value: 1475 },
        { label: "45 a 49", value: 1482 }, { label: "50 a 54", value: 1259 }, { label: "55 a 59", value: 1014 },
        { label: "60 a 64", value: 887 }, { label: "65 a 69", value: 617 }, { label: "70 a 74", value: 417 },
        { label: "75 a 79", value: 253 }, { label: "80 a 84", value: 157 }, { label: "85 y más", value: 106 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación por minería ilegal."
    },
    socioeconomic: {
      unemployment: "17.8%",
      publicServices: "Baja cobertura.",
      hdi: "0.590",
      nbi: "62.15%",
      health: "Puesto de salud.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión, minería ilegal.",
      armedGroups: "ELN, AGC."
    }
  },
  "Turbaco": {
    category: "2",
    demographics: {
      total: "112,861",
      gender: { male: 49.2, female: 50.8 },
      ageGroups: [
        { label: "0 a 4", value: 9855 }, { label: "5 a 9", value: 10292 }, { label: "10 a 14", value: 10502 },
        { label: "15 a 19", value: 10279 }, { label: "20 a 24", value: 9892 }, { label: "25 a 29", value: 9545 },
        { label: "30 a 34", value: 8921 }, { label: "35 a 39", value: 8414 }, { label: "40 a 44", value: 7938 },
        { label: "45 a 49", value: 7842 }, { label: "50 a 54", value: 6976 }, { label: "55 a 59", value: 6172 },
        { label: "60 a 64", value: 5156 }, { label: "65 a 69", value: 3913 }, { label: "70 a 74", value: 2932 },
        { label: "75 a 79", value: 1806 }, { label: "80 a 84", value: 1272 }, { label: "85 y más", value: 954 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio receptor, expansión urbana de Cartagena."
    },
    socioeconomic: {
      unemployment: "12.5%",
      publicServices: "Cobertura urbana buena.",
      hdi: "0.760",
      nbi: "18.40%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Delincuencia común."
    }
  },
  "Turbaná": {
    category: "6",
    demographics: {
      total: "18,234",
      gender: { male: 50.7, female: 49.3 },
      ageGroups: [
        { label: "0 a 4", value: 1809 }, { label: "5 a 9", value: 1995 }, { label: "10 a 14", value: 2099 },
        { label: "15 a 19", value: 1856 }, { label: "20 a 24", value: 1603 }, { label: "25 a 29", value: 1533 },
        { label: "30 a 34", value: 1419 }, { label: "35 a 39", value: 1303 }, { label: "40 a 44", value: 1288 },
        { label: "45 a 49", value: 1252 }, { label: "50 a 54", value: 1033 }, { label: "55 a 59", value: 811 },
        { label: "60 a 64", value: 646 }, { label: "65 a 69", value: 403 }, { label: "70 a 74", value: 359 },
        { label: "75 a 79", value: 244 }, { label: "80 a 84", value: 104 }, { label: "85 y más", value: 77 }
      ],
      ethnic: "Mestizo.",
      displacement: "Baja afectación."
    },
    socioeconomic: {
      unemployment: "14.8%",
      publicServices: "Cobertura media.",
      hdi: "0.680",
      nbi: "28.87%",
      health: "Puesto de salud.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Villanueva": {
    category: "6",
    demographics: {
      total: "20,770",
      gender: { male: 50.4, female: 49.6 },
      ageGroups: [
        { label: "0 a 4", value: 2084 }, { label: "5 a 9", value: 2159 }, { label: "10 a 14", value: 2260 },
        { label: "15 a 19", value: 2081 }, { label: "20 a 24", value: 1804 }, { label: "25 a 29", value: 1780 },
        { label: "30 a 34", value: 1688 }, { label: "35 a 39", value: 1538 }, { label: "40 a 44", value: 1452 },
        { label: "45 a 49", value: 1350 }, { label: "50 a 54", value: 1231 }, { label: "55 a 59", value: 1159 },
        { label: "60 a 64", value: 956 }, { label: "65 a 69", value: 721 }, { label: "70 a 74", value: 589 },
        { label: "75 a 79", value: 402 }, { label: "80 a 84", value: 279 }, { label: "85 y más", value: 157 }
      ],
      ethnic: "Mestizo.",
      displacement: "Baja afectación."
    },
    socioeconomic: {
      unemployment: "14.5%",
      publicServices: "Cobertura media.",
      hdi: "0.670",
      nbi: "32.45%",
      health: "Puesto de salud.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Zambrano": {
    category: "6",
    demographics: {
      total: "11,770",
      gender: { male: 50.4, female: 49.6 },
      ageGroups: [
        { label: "0 a 4", value: 1184 }, { label: "5 a 9", value: 1259 }, { label: "10 a 14", value: 1360 },
        { label: "15 a 19", value: 1181 }, { label: "20 a 24", value: 1004 }, { label: "25 a 29", value: 980 },
        { label: "30 a 34", value: 888 }, { label: "35 a 39", value: 738 }, { label: "40 a 44", value: 652 },
        { label: "45 a 49", value: 550 }, { label: "50 a 54", value: 531 }, { label: "55 a 59", value: 459 },
        { label: "60 a 64", value: 356 }, { label: "65 a 69", value: 291 }, { label: "70 a 74", value: 249 },
        { label: "75 a 79", value: 232 }, { label: "80 a 84", value: 129 }, { label: "85 y más", value: 127 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona ribereña."
    },
    socioeconomic: {
      unemployment: "15.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.650",
      nbi: "45.45%",
      health: "Puesto de salud.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Canalete": {
    category: "6",
    demographics: {
      total: "14,831",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: "0-19", value: 40.6 }, { label: "20-39", value: 26.6 }, { label: "40-64", value: 24.8 }, { label: "65+", value: 8.0 }],
      ethnic: "Mestizo.",
      displacement: "Moderado."
    },
    socioeconomic: {
      unemployment: "18.5%",
      publicServices: "Deficiencias críticas.",
      hdi: "0.615",
      nbi: "Total: 75.38% (Cabecera: 40.65%, Rural: 87.51%)",
      health: "Puesto de salud.",
      urbanRural: { urban: 20, rural: 80 }
    },
    security: {
      homicideRate: "Fluctuante",
      otherCrimes: "Conflictividad social y microtráfico local urbano.",
      armedGroups: "Problemas de convivencia comunitaria."
    }
  },
  "Los Córdobas": {
    category: "6",
    demographics: {
      total: "15,886",
      gender: { male: 50.5, female: 49.5 },
      ageGroups: [{ label: "0-19", value: 40.2 }, { label: "20-39", value: 26.4 }, { label: "40-64", value: 25.2 }, { label: "65+", value: 8.2 }],
      ethnic: "Mestizo.",
      displacement: "Moderado."
    },
    socioeconomic: {
      unemployment: "17.8%",
      publicServices: "Baja cobertura.",
      hdi: "0.635",
      nbi: "70.79%",
      health: "Puesto de salud.",
      urbanRural: { urban: 25, rural: 75 }
    },
    security: {
      homicideRate: "20.0 por 100k",
      otherCrimes: "Microtráfico.",
      armedGroups: "Clan del Golfo."
    }
  },
  "San Carlos (Córdoba)": {
    category: "6",
    demographics: {
      total: "23,532",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: "0-19", value: 36.8 }, { label: "20-39", value: 26.3 }, { label: "40-64", value: 26.9 }, { label: "65+", value: 10.1 }],
      ethnic: "Mestizo.",
      displacement: "Bajo."
    },
    socioeconomic: {
      unemployment: "14.5%",
      publicServices: "Cobertura media.",
      hdi: "0.680",
      health: "Centro de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "12.0 por 100k",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Baja presencia."
    }
  },
  "Buenavista": {
    category: "6",
    demographics: {
      total: "18,344",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: "0-19", value: 40.0 }, { label: "20-39", value: 27.2 }, { label: "40-64", value: 24.1 }, { label: "65+", value: 8.7 }],
      ethnic: "Mestizo.",
      displacement: "Bajo."
    },
    socioeconomic: {
      unemployment: "15.5%",
      publicServices: "Cobertura básica.",
      hdi: "0.660",
      nbi: "Total: 40.93% (Cabecera: 27.86%, Rural: 49.72%)",
      health: "Puesto de salud.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Fluctuante",
      otherCrimes: "Conflictividad social y microtráfico local urbano.",
      armedGroups: "Problemas de convivencia comunitaria."
    }
  },
  "La Apartada": {
    category: "6",
    demographics: {
      total: "13,733",
      gender: { male: 50.5, female: 49.5 },
      ageGroups: [{ label: "0-19", value: 39.2 }, { label: "20-39", value: 28.9 }, { label: "40-64", value: 24.2 }, { label: "65+", value: 7.8 }],
      ethnic: "Mestizo.",
      displacement: "Bajo."
    },
    socioeconomic: {
      unemployment: "16.0%",
      publicServices: "Cobertura media.",
      hdi: "0.675",
      health: "Puesto de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "22.0 por 100k",
      otherCrimes: "Microtráfico en zona comercial.",
      armedGroups: "Presencia de grupos armados."
    }
  },
  "San José de Uré": {
    category: "6",
    demographics: {
      total: "11,059",
      gender: { male: 51, female: 49 },
      ageGroups: [{ label: "0-19", value: 46.8 }, { label: "20-39", value: 27.9 }, { label: "40-64", value: 20.5 }, { label: "65+", value: 5.8 }],
      ethnic: "Afrodescendiente (Mayoría).",
      displacement: "Alta vulnerabilidad, zona de conflicto."
    },
    socioeconomic: {
      unemployment: "22.0%",
      publicServices: "Deficiencias críticas.",
      hdi: "0.580",
      nbi: "52.83%",
      health: "Puesto de salud precario.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "60.0 por 100k",
      otherCrimes: "Control de minería ilegal.",
      armedGroups: "Clan del Golfo y Caparros."
    }
  },
  "Tuchín": {
    category: "6",
    demographics: {
      total: "40,033",
      gender: { male: 50, female: 50 },
      ageGroups: [{ label: "0-19", value: 45.8 }, { label: "20-39", value: 30.3 }, { label: "40-64", value: 17.9 }, { label: "65+", value: 6.0 }],
      ethnic: "Indígena Zenú.",
      displacement: "Bajo."
    },
    socioeconomic: {
      unemployment: "18.0%",
      publicServices: "Deficiencias en agua y saneamiento.",
      hdi: "0.610",
      health: "Puesto de salud local.",
      urbanRural: { urban: 20, rural: 80 }
    },
    security: {
      homicideRate: "10.0 por 100k",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Baja presencia."
    }
  },
  "Valledupar": {
    category: "1",
    demographics: {
      total: "459,349",
      gender: { male: 48.7, female: 51.3 },
      ageGroups: [
        { label: "0 a 4", value: 41829 }, { label: "5 a 9", value: 43556 }, { label: "10 a 14", value: 42969 },
        { label: "15 a 19", value: 44264 }, { label: "20 a 24", value: 42259 }, { label: "25 a 29", value: 40292 },
        { label: "30 a 34", value: 35494 }, { label: "35 a 39", value: 33081 }, { label: "40 a 44", value: 28044 },
        { label: "45 a 49", value: 25113 }, { label: "50 a 54", value: 22125 }, { label: "55 a 59", value: 17987 },
        { label: "60 a 64", value: 13905 }, { label: "65 a 69", value: 10670 }, { label: "70 a 74", value: 7084 },
        { label: "75 a 79", value: 4925 }, { label: "80 a 84", value: 2991 }, { label: "85 y más", value: 2761 }
      ],
      ethnic: "Mestizo, presencia de comunidades indígenas de la Sierra Nevada.",
      displacement: "Municipio receptor de población desplazada."
    },
    socioeconomic: {
      unemployment: "15.2%",
      publicServices: "Cobertura urbana alta, retos en asentamientos informales.",
      hdi: "0.780",
      nbi: "Total 17.8% | Cabecera 14.0% | Rural 45.4%",
      health: "Hospital de tercer nivel y red de salud compleja.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto, microtráfico.",
      armedGroups: "Delincuencia común organizada."
    }
  },
  "Aguachica": {
    category: "2",
    demographics: {
      total: "95,878",
      gender: { male: 48.6, female: 51.4 },
      ageGroups: [
        { label: "0 a 4", value: 8389 }, { label: "5 a 9", value: 8976 }, { label: "10 a 14", value: 9003 },
        { label: "15 a 19", value: 9244 }, { label: "20 a 24", value: 8703 }, { label: "25 a 29", value: 8162 },
        { label: "30 a 34", value: 7143 }, { label: "35 a 39", value: 6548 }, { label: "40 a 44", value: 5906 },
        { label: "45 a 49", value: 5376 }, { label: "50 a 54", value: 4733 }, { label: "55 a 59", value: 3891 },
        { label: "60 a 64", value: 3121 }, { label: "65 a 69", value: 2456 }, { label: "70 a 74", value: 1714 },
        { label: "75 a 79", value: 1144 }, { label: "80 a 84", value: 763 }, { label: "85 y más", value: 606 }
      ],
      ethnic: "Mestizo.",
      displacement: "Nodo comercial y receptor de población del sur de Bolívar y Catatumbo."
    },
    socioeconomic: {
      unemployment: "16.8%",
      publicServices: "Cobertura media.",
      hdi: "0.720",
      nbi: "Total 18.8% | Cabecera 16.1% | Rural 38.6%",
      health: "Hospital de segundo nivel.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión, hurto.",
      armedGroups: "Presencia de grupos delincuenciales."
    }
  },
  "Agustín Codazzi": {
    category: "3",
    demographics: {
      total: "58,621",
      gender: { male: 50.2, female: 49.8 },
      ageGroups: [
        { label: "0 a 4", value: 5602 }, { label: "5 a 9", value: 5984 }, { label: "10 a 14", value: 6099 },
        { label: "15 a 19", value: 5666 }, { label: "20 a 24", value: 5106 }, { label: "25 a 29", value: 4800 },
        { label: "30 a 34", value: 4076 }, { label: "35 a 39", value: 3671 }, { label: "40 a 44", value: 3095 },
        { label: "45 a 49", value: 3179 }, { label: "50 a 54", value: 2789 }, { label: "55 a 59", value: 2364 },
        { label: "60 a 64", value: 1778 }, { label: "65 a 69", value: 1417 }, { label: "70 a 74", value: 1100 },
        { label: "75 a 79", value: 846 }, { label: "80 a 84", value: 614 }, { label: "85 y más", value: 435 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación histórica por conflicto armado."
    },
    socioeconomic: {
      unemployment: "17.5%",
      publicServices: "Baja cobertura en zonas rurales.",
      hdi: "0.680",
      nbi: "Total 28.7% | Cabecera 27.5% | Rural 34.0%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Presencia de grupos armados ilegales."
    }
  },
  "Astrea": {
    category: "6",
    demographics: {
      total: "18,434",
      gender: { male: 51.4, female: 48.6 },
      ageGroups: [
        { label: "0 a 4", value: 1881 }, { label: "5 a 9", value: 2068 }, { label: "10 a 14", value: 2108 },
        { label: "15 a 19", value: 1948 }, { label: "20 a 24", value: 1555 }, { label: "25 a 29", value: 1294 },
        { label: "30 a 34", value: 1188 }, { label: "35 a 39", value: 1073 }, { label: "40 a 44", value: 999 },
        { label: "45 a 49", value: 946 }, { label: "50 a 54", value: 851 }, { label: "55 a 59", value: 671 },
        { label: "60 a 64", value: 503 }, { label: "65 a 69", value: 458 }, { label: "70 a 74", value: 328 },
        { label: "75 a 79", value: 261 }, { label: "80 a 84", value: 164 }, { label: "85 y más", value: 138 }
      ],
      ethnic: "Mestizo.",
      displacement: "Vulnerabilidad por pobreza extrema."
    },
    socioeconomic: {
      unemployment: "18.2%",
      publicServices: "Deficiencias críticas.",
      hdi: "0.620",
      nbi: "Total 37.8% | Cabecera 38.0% | Rural 37.5%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Bosconia": {
    category: "4",
    demographics: {
      total: "37,531",
      gender: { male: 50.3, female: 49.7 },
      ageGroups: [
        { label: "0 a 4", value: 3514 }, { label: "5 a 9", value: 4206 }, { label: "10 a 14", value: 4218 },
        { label: "15 a 19", value: 3994 }, { label: "20 a 24", value: 3400 }, { label: "25 a 29", value: 3063 },
        { label: "30 a 34", value: 2756 }, { label: "35 a 39", value: 2490 }, { label: "40 a 44", value: 2043 },
        { label: "45 a 49", value: 1895 }, { label: "50 a 54", value: 1567 }, { label: "55 a 59", value: 1362 },
        { label: "60 a 64", value: 936 }, { label: "65 a 69", value: 761 }, { label: "70 a 74", value: 501 },
        { label: "75 a 79", value: 388 }, { label: "80 a 84", value: 251 }, { label: "85 y más", value: 186 }
      ],
      ethnic: "Mestizo.",
      displacement: "Nodo de transporte con alta población flotante."
    },
    socioeconomic: {
      unemployment: "14.5%",
      publicServices: "Cobertura urbana aceptable.",
      hdi: "0.690",
      nbi: "Total 31.8% | Cabecera 31.1% | Rural 43.8%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 80, rural: 20 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Delincuencia común."
    }
  },
  "Chimichagua": {
    category: "6",
    demographics: {
      total: "30,289",
      gender: { male: 50.4, female: 49.6 },
      ageGroups: [
        { label: "0 a 4", value: 3026 }, { label: "5 a 9", value: 3457 }, { label: "10 a 14", value: 3682 },
        { label: "15 a 19", value: 3293 }, { label: "20 a 24", value: 2193 }, { label: "25 a 29", value: 1740 },
        { label: "30 a 34", value: 1807 }, { label: "35 a 39", value: 1740 }, { label: "40 a 44", value: 1622 },
        { label: "45 a 49", value: 1487 }, { label: "50 a 54", value: 1400 }, { label: "55 a 59", value: 1259 },
        { label: "60 a 64", value: 1041 }, { label: "65 a 69", value: 870 }, { label: "70 a 74", value: 599 },
        { label: "75 a 79", value: 450 }, { label: "80 a 84", value: 351 }, { label: "85 y más", value: 272 }
      ],
      ethnic: "Mestizo, presencia de comunidades afrodescendientes.",
      displacement: "Zona ribereña con vulnerabilidad ambiental."
    },
    socioeconomic: {
      unemployment: "18.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.630",
      nbi: "Total 30.4% | Cabecera 30.9% | Rural 30.0%",
      health: "Puesto de salud.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Chiriguaná": {
    category: "6",
    demographics: {
      total: "27,006",
      gender: { male: 49.9, female: 50.1 },
      ageGroups: [
        { label: "0 a 4", value: 2659 }, { label: "5 a 9", value: 2944 }, { label: "10 a 14", value: 2962 },
        { label: "15 a 19", value: 2601 }, { label: "20 a 24", value: 2255 }, { label: "25 a 29", value: 2118 },
        { label: "30 a 34", value: 1863 }, { label: "35 a 39", value: 1721 }, { label: "40 a 44", value: 1525 },
        { label: "45 a 49", value: 1434 }, { label: "50 a 54", value: 1269 }, { label: "55 a 59", value: 1062 },
        { label: "60 a 64", value: 749 }, { label: "65 a 69", value: 660 }, { label: "70 a 74", value: 472 },
        { label: "75 a 79", value: 289 }, { label: "80 a 84", value: 240 }, { label: "85 y más", value: 183 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona de influencia minera."
    },
    socioeconomic: {
      unemployment: "16.5%",
      publicServices: "Cobertura media.",
      hdi: "0.660",
      nbi: "Total 25.5% | Cabecera 28.5% | Rural 20.7%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Presencia de grupos armados."
    }
  },
  "Curumaní": {
    category: "6",
    demographics: {
      total: "34,838",
      gender: { male: 49.8, female: 50.2 },
      ageGroups: [
        { label: "0 a 4", value: 3262 }, { label: "5 a 9", value: 3608 }, { label: "10 a 14", value: 3919 },
        { label: "15 a 19", value: 3586 }, { label: "20 a 24", value: 2954 }, { label: "25 a 29", value: 2620 },
        { label: "30 a 34", value: 2429 }, { label: "35 a 39", value: 2325 }, { label: "40 a 44", value: 1930 },
        { label: "45 a 49", value: 1820 }, { label: "50 a 54", value: 1606 }, { label: "55 a 59", value: 1286 },
        { label: "60 a 64", value: 952 }, { label: "65 a 69", value: 894 }, { label: "70 a 74", value: 647 },
        { label: "75 a 79", value: 474 }, { label: "80 a 84", value: 289 }, { label: "85 y más", value: 237 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación histórica por conflicto."
    },
    socioeconomic: {
      unemployment: "17.2%",
      publicServices: "Baja cobertura.",
      hdi: "0.650",
      nbi: "Total 28.7% | Cabecera 27.3% | Rural 32.0%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión.",
      armedGroups: "Presencia de grupos armados."
    }
  },
  "El Paso": {
    category: "6",
    demographics: {
      total: "34,620",
      gender: { male: 49.9, female: 50.1 },
      ageGroups: [
        { label: "0 a 4", value: 3771 }, { label: "5 a 9", value: 4074 }, { label: "10 a 14", value: 4115 },
        { label: "15 a 19", value: 3656 }, { label: "20 a 24", value: 3110 }, { label: "25 a 29", value: 2916 },
        { label: "30 a 34", value: 2435 }, { label: "35 a 39", value: 2243 }, { label: "40 a 44", value: 1932 },
        { label: "45 a 49", value: 1642 }, { label: "50 a 54", value: 1387 }, { label: "55 a 59", value: 1059 },
        { label: "60 a 64", value: 716 }, { label: "65 a 69", value: 590 }, { label: "70 a 74", value: 386 },
        { label: "75 a 79", value: 294 }, { label: "80 a 84", value: 172 }, { label: "85 y más", value: 122 }
      ],
      ethnic: "Mestizo, fuerte componente afrodescendiente.",
      displacement: "Zona de influencia minera y ganadera."
    },
    socioeconomic: {
      unemployment: "17.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.630",
      nbi: "Total 22.8% | Cabecera 30.8% | Rural 20.9%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Presencia de grupos armados."
    }
  },
  "Gamarra": {
    category: "6",
    demographics: {
      total: "12,444",
      gender: { male: 50.6, female: 49.4 },
      ageGroups: [
        { label: "0 a 4", value: 1051 }, { label: "5 a 9", value: 1056 }, { label: "10 a 14", value: 1.157 },
        { label: "15 a 19", value: 1169 }, { label: "20 a 24", value: 1063 }, { label: "25 a 29", value: 959 },
        { label: "30 a 34", value: 814 }, { label: "35 a 39", value: 778 }, { label: "40 a 44", value: 701 },
        { label: "45 a 49", value: 701 }, { label: "50 a 54", value: 741 }, { label: "55 a 59", value: 608 },
        { label: "60 a 64", value: 509 }, { label: "65 a 69", value: 396 }, { label: "70 a 74", value: 278 },
        { label: "75 a 79", value: 203 }, { label: "80 a 84", value: 134 }, { label: "85 y más", value: 126 }
      ],
      ethnic: "Mestizo.",
      displacement: "Puerto fluvial con retos logísticos."
    },
    socioeconomic: {
      unemployment: "18.0%",
      publicServices: "Baja cobertura.",
      hdi: "0.620",
      nbi: "Total 23.4% | Cabecera 24.7% | Rural 20.8%",
      health: "Puesto de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "González": {
    category: "6",
    demographics: {
      total: "4,053",
      gender: { male: 52.4, female: 47.6 },
      ageGroups: [
        { label: "0 a 4", value: 289 }, { label: "5 a 9", value: 313 }, { label: "10 a 14", value: 420 },
        { label: "15 a 19", value: 386 }, { label: "20 a 24", value: 317 }, { label: "25 a 29", value: 260 },
        { label: "30 a 34", value: 271 }, { label: "35 a 39", value: 285 }, { label: "40 a 44", value: 282 },
        { label: "45 a 49", value: 275 }, { label: "50 a 54", value: 196 }, { label: "55 a 59", value: 214 },
        { label: "60 a 64", value: 155 }, { label: "65 a 69", value: 134 }, { label: "70 a 74", value: 102 },
        { label: "75 a 79", value: 71 }, { label: "80 a 84", value: 47 }, { label: "85 y más", value: 36 }
      ],
      ethnic: "Mestizo.",
      displacement: "Baja afectación."
    },
    socioeconomic: {
      unemployment: "15.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.640",
      nbi: "Total 21.2% | Cabecera 13.2% | Rural 24.8%",
      health: "Puesto de salud.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "La Gloria": {
    category: "6",
    demographics: {
      total: "14,989",
      gender: { male: 51.9, female: 48.1 },
      ageGroups: [
        { label: "0 a 4", value: 1331 }, { label: "5 a 9", value: 1507 }, { label: "10 a 14", value: 1550 },
        { label: "15 a 19", value: 1501 }, { label: "20 a 24", value: 1242 }, { label: "25 a 29", value: 1099 },
        { label: "30 a 34", value: 1005 }, { label: "35 a 39", value: 985 }, { label: "40 a 44", value: 845 },
        { label: "45 a 49", value: 910 }, { label: "50 a 54", value: 770 }, { label: "55 a 59", value: 633 },
        { label: "60 a 64", value: 487 }, { label: "65 a 69", value: 443 }, { label: "70 a 74", value: 258 },
        { label: "75 a 79", value: 182 }, { label: "80 a 84", value: 130 }, { label: "85 y más", value: 111 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona ribereña."
    },
    socioeconomic: {
      unemployment: "17.2%",
      publicServices: "Baja cobertura.",
      hdi: "0.610",
      nbi: "Total 24.6% | Cabecera 20.7% | Rural 26.6%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "La Paz": {
    category: "6",
    demographics: {
      total: "26,109",
      gender: { male: 50.3, female: 49.7 },
      ageGroups: [
        { label: "0 a 4", value: 2542 }, { label: "5 a 9", value: 2741 }, { label: "10 a 14", value: 2776 },
        { label: "15 a 19", value: 2627 }, { label: "20 a 24", value: 2314 }, { label: "25 a 29", value: 2024 },
        { label: "30 a 34", value: 1820 }, { label: "35 a 39", value: 1742 }, { label: "40 a 44", value: 1473 },
        { label: "45 a 49", value: 1339 }, { label: "50 a 54", value: 1180 }, { label: "55 a 59", value: 1017 },
        { label: "60 a 64", value: 757 }, { label: "65 a 69", value: 604 }, { label: "70 a 74", value: 410 },
        { label: "75 a 79", value: 241 }, { label: "80 a 84", value: 146 }, { label: "85 y más", value: 150 }
      ],
      ethnic: "Mestizo.",
      displacement: "Cercanía a Valledupar con dinámica de ciudad dormitorio."
    },
    socioeconomic: {
      unemployment: "15.5%",
      publicServices: "Cobertura media.",
      hdi: "0.680",
      nbi: "Total 28.5% | Cabecera 25.0% | Rural 37.6%",
      health: "Puesto de salud.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Manaure Balcón Del Cesar": {
    category: "6",
    demographics: {
      total: "9,313",
      gender: { male: 50.4, female: 49.6 },
      ageGroups: [
        { label: "0 a 4", value: 811 }, { label: "5 a 9", value: 871 }, { label: "10 a 14", value: 950 },
        { label: "15 a 19", value: 978 }, { label: "20 a 24", value: 848 }, { label: "25 a 29", value: 745 },
        { label: "30 a 34", value: 604 }, { label: "35 a 39", value: 622 }, { label: "40 a 44", value: 511 },
        { label: "45 a 49", value: 488 }, { label: "50 a 54", value: 495 }, { label: "55 a 59", value: 394 },
        { label: "60 a 64", value: 305 }, { label: "65 a 69", value: 247 }, { label: "70 a 74", value: 169 },
        { label: "75 a 79", value: 128 }, { label: "80 a 84", value: 90 }, { label: "85 y más", value: 57 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio turístico con retos en servicios básicos."
    },
    socioeconomic: {
      unemployment: "14.8%",
      publicServices: "Baja cobertura.",
      hdi: "0.670",
      nbi: "Total 27.6% | Cabecera 24.0% | Rural 51.1%",
      health: "Puesto de salud.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Pailitas": {
    category: "6",
    demographics: {
      total: "16,800",
      gender: { male: 49.4, female: 50.6 },
      ageGroups: [
        { label: "0 a 4", value: 1418 }, { label: "5 a 9", value: 1706 }, { label: "10 a 14", value: 1853 },
        { label: "15 a 19", value: 1692 }, { label: "20 a 24", value: 1362 }, { label: "25 a 29", value: 1304 },
        { label: "30 a 34", value: 1141 }, { label: "35 a 39", value: 1114 }, { label: "40 a 44", value: 988 },
        { label: "45 a 49", value: 915 }, { label: "50 a 54", value: 841 }, { label: "55 a 59", value: 679 },
        { label: "60 a 64", value: 526 }, { label: "65 a 69", value: 430 }, { label: "70 a 74", value: 336 },
        { label: "75 a 79", value: 227 }, { label: "80 a 84", value: 147 }, { label: "85 y más", value: 121 }
      ],
      ethnic: "Mestizo.",
      displacement: "Eje vial con retos de seguridad."
    },
    socioeconomic: {
      unemployment: "16.5%",
      publicServices: "Baja cobertura.",
      hdi: "0.640",
      nbi: "Total 25.6% | Cabecera 22.2% | Rural 36.9%",
      health: "Puesto de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Presencia de grupos armados."
    }
  },
  "Pueblo Bello": {
    category: "6",
    demographics: {
      total: "22,929",
      gender: { male: 50.9, female: 49.1 },
      ageGroups: [
        { label: "0 a 4", value: 3106 }, { label: "5 a 9", value: 3188 }, { label: "10 a 14", value: 2914 },
        { label: "15 a 19", value: 2665 }, { label: "20 a 24", value: 1997 }, { label: "25 a 29", value: 1706 },
        { label: "30 a 34", value: 1412 }, { label: "35 a 39", value: 1286 }, { label: "40 a 44", value: 1075 },
        { label: "45 a 49", value: 897 }, { label: "50 a 54", value: 761 }, { label: "55 a 59", value: 570 },
        { label: "60 a 64", value: 399 }, { label: "65 a 69", value: 370 }, { label: "70 a 74", value: 258 },
        { label: "75 a 79", value: 154 }, { label: "80 a 84", value: 105 }, { label: "85 y más", value: 66 }
      ],
      ethnic: "Mestizo, alta presencia de comunidades Arhuacas.",
      displacement: "Zona de resguardo con retos en integración estatal."
    },
    socioeconomic: {
      unemployment: "19.5%",
      publicServices: "Deficiencias críticas.",
      hdi: "0.580",
      nbi: "Total 64.6% | Cabecera 26.4% | Rural 86.6%",
      health: "Puesto de salud.",
      urbanRural: { urban: 30, rural: 70 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Conflictos territoriales.",
      armedGroups: "Baja presencia."
    }
  },
  "Pelaya": {
    category: "6",
    demographics: {
      total: "18,497",
      gender: { male: 50.3, female: 49.7 },
      ageGroups: [
        { label: "0 a 4", value: 1678 }, { label: "5 a 9", value: 1983 }, { label: "10 a 14", value: 2123 },
        { label: "15 a 19", value: 1811 }, { label: "20 a 24", value: 1542 }, { label: "25 a 29", value: 1462 },
        { label: "30 a 34", value: 1258 }, { label: "35 a 39", value: 1195 }, { label: "40 a 44", value: 1061 },
        { label: "45 a 49", value: 1027 }, { label: "50 a 54", value: 889 }, { label: "55 a 59", value: 702 },
        { label: "60 a 64", value: 516 }, { label: "65 a 69", value: 461 }, { label: "70 a 74", value: 305 },
        { label: "75 a 79", value: 219 }, { label: "80 a 84", value: 156 }, { label: "85 y más", value: 109 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona de frontera agrícola."
    },
    socioeconomic: {
      unemployment: "17.0%",
      publicServices: "Baja cobertura.",
      hdi: "0.630",
      nbi: "Total 26.8% | Cabecera 24.8% | Rural 31.4%",
      health: "Puesto de salud.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Presencia de grupos armados."
    }
  },
  "Río De Oro": {
    category: "6",
    demographics: {
      total: "14,408",
      gender: { male: 50.9, female: 49.1 },
      ageGroups: [
        { label: "0 a 4", value: 1098 }, { label: "5 a 9", value: 1189 }, { label: "10 a 14", value: 1280 },
        { label: "15 a 19", value: 1309 }, { label: "20 a 24", value: 1240 }, { label: "25 a 29", value: 1120 },
        { label: "30 a 34", value: 1052 }, { label: "35 a 39", value: 996 }, { label: "40 a 44", value: 914 },
        { label: "45 a 49", value: 808 }, { label: "50 a 54", value: 865 }, { label: "55 a 59", value: 676 },
        { label: "60 a 64", value: 554 }, { label: "65 a 69", value: 432 }, { label: "70 a 74", value: 345 },
        { label: "75 a 79", value: 249 }, { label: "80 a 84", value: 143 }, { label: "85 y más", value: 138 }
      ],
      ethnic: "Mestizo.",
      displacement: "Cercanía a Ocaña con dinámicas de integración regional."
    },
    socioeconomic: {
      unemployment: "15.2%",
      publicServices: "Cobertura media.",
      hdi: "0.660",
      nbi: "Total 21.7% | Cabecera 13.9% | Rural 28.3%",
      health: "Puesto de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "San Alberto": {
    category: "6",
    demographics: {
      total: "23,040",
      gender: { male: 49.9, female: 50.1 },
      ageGroups: [
        { label: "0 a 4", value: 2127 }, { label: "5 a 9", value: 2258 }, { label: "10 a 14", value: 2199 },
        { label: "15 a 19", value: 2157 }, { label: "20 a 24", value: 2018 }, { label: "25 a 29", value: 2010 },
        { label: "30 a 34", value: 1776 }, { label: "35 a 39", value: 1708 }, { label: "40 a 44", value: 1473 },
        { label: "45 a 49", value: 1328 }, { label: "50 a 54", value: 1105 }, { label: "55 a 59", value: 880 },
        { label: "60 a 64", value: 668 }, { label: "65 a 69", value: 492 }, { label: "70 a 74", value: 353 },
        { label: "75 a 79", value: 236 }, { label: "80 a 84", value: 140 }, { label: "85 y más", value: 112 }
      ],
      ethnic: "Mestizo.",
      displacement: "Puerta de entrada al departamento con fuerte agroindustria."
    },
    socioeconomic: {
      unemployment: "14.2%",
      publicServices: "Cobertura urbana buena.",
      hdi: "0.710",
      nbi: "Total 13.7% | Cabecera 10.8% | Rural 25.5%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "San Diego": {
    category: "6",
    demographics: {
      total: "18,531",
      gender: { male: 50.5, female: 49.5 },
      ageGroups: [
        { label: "0 a 4", value: 1740 }, { label: "5 a 9", value: 1932 }, { label: "10 a 14", value: 1854 },
        { label: "15 a 19", value: 1770 }, { label: "20 a 24", value: 1570 }, { label: "25 a 29", value: 1413 },
        { label: "30 a 34", value: 1256 }, { label: "35 a 39", value: 1209 }, { label: "40 a 44", value: 1050 },
        { label: "45 a 49", value: 1064 }, { label: "50 a 54", value: 894 }, { label: "55 a 59", value: 773 },
        { label: "60 a 64", value: 610 }, { label: "65 a 69", value: 492 }, { label: "70 a 74", value: 343 },
        { label: "75 a 79", value: 227 }, { label: "80 a 84", value: 172 }, { label: "85 y más", value: 162 }
      ],
      ethnic: "Mestizo.",
      displacement: "Cercanía a Valledupar con retos en diversificación económica."
    },
    socioeconomic: {
      unemployment: "15.8%",
      publicServices: "Cobertura media.",
      hdi: "0.670",
      nbi: "Total 22.5% | Cabecera 17.6% | Rural 28.8%",
      health: "Puesto de salud.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "San Martín": {
    category: "6",
    demographics: {
      total: "20,452",
      gender: { male: 51.0, female: 49.0 },
      ageGroups: [
        { label: "0 a 4", value: 1826 }, { label: "5 a 9", value: 2013 }, { label: "10 a 14", value: 2159 },
        { label: "15 a 19", value: 2076 }, { label: "20 a 24", value: 1847 }, { label: "25 a 29", value: 1718 },
        { label: "30 a 34", value: 1517 }, { label: "35 a 39", value: 1479 }, { label: "40 a 44", value: 1344 },
        { label: "45 a 49", value: 1205 }, { label: "50 a 54", value: 934 }, { label: "55 a 59", value: 719 },
        { label: "60 a 64", value: 505 }, { label: "65 a 69", value: 420 }, { label: "70 a 74", value: 282 },
        { label: "75 a 79", value: 188 }, { label: "80 a 84", value: 130 }, { label: "85 y más", value: 90 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona de influencia petrolera."
    },
    socioeconomic: {
      unemployment: "16.2%",
      publicServices: "Cobertura media.",
      hdi: "0.680",
      nbi: "Total 24.1% | Cabecera 19.8% | Rural 29.5%",
      health: "Puesto de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Tamalameque": {
    category: "6",
    demographics: {
      total: "14,063",
      gender: { male: 50.0, female: 50.0 },
      ageGroups: [
        { label: "0 a 4", value: 1352 }, { label: "5 a 9", value: 1524 }, { label: "10 a 14", value: 1728 },
        { label: "15 a 19", value: 1406 }, { label: "20 a 24", value: 1006 }, { label: "25 a 29", value: 909 },
        { label: "30 a 34", value: 878 }, { label: "35 a 39", value: 862 }, { label: "40 a 44", value: 726 },
        { label: "45 a 49", value: 726 }, { label: "50 a 54", value: 710 }, { label: "55 a 59", value: 593 },
        { label: "60 a 64", value: 502 }, { label: "65 a 69", value: 399 }, { label: "70 a 74", value: 273 },
        { label: "75 a 79", value: 206 }, { label: "80 a 84", value: 134 }, { label: "85 y más", value: 129 }
      ],
      ethnic: "Mestizo, fuerte tradición cultural ribereña.",
      displacement: "Zona ribereña con retos en conectividad."
    },
    socioeconomic: {
      unemployment: "18.8%",
      publicServices: "Baja cobertura.",
      hdi: "0.620",
      nbi: "Total 25.9% | Cabecera 29.9% | Rural 23.0%",
      health: "Puesto de salud.",
      urbanRural: { urban: 40, rural: 60 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Barranquilla": {
    category: "Especial",
    demographics: {
      total: "1,120,103",
      gender: { male: 47.9, female: 52.1 },
      ageGroups: [
        { label: "0 a 4", value: 79260 }, { label: "5 a 9", value: 82171 }, { label: "10 a 14", value: 84712 },
        { label: "15 a 19", value: 94976 }, { label: "20 a 24", value: 98201 }, { label: "25 a 29", value: 93347 },
        { label: "30 a 34", value: 85453 }, { label: "35 a 39", value: 83642 }, { label: "40 a 44", value: 69617 },
        { label: "45 a 49", value: 65152 }, { label: "50 a 54", value: 66020 }, { label: "55 a 59", value: 60317 },
        { label: "60 a 64", value: 48836 }, { label: "65 a 69", value: 36984 }, { label: "70 a 74", value: 25817 },
        { label: "75 a 79", value: 19183 }, { label: "80 a 84", value: 13484 }, { label: "85 y más", value: 12931 }
      ],
      ethnic: "Diversa, con fuerte componente mestizo y comunidades afro e inmigrantes.",
      displacement: "Principal receptor de población desplazada en la región Caribe."
    },
    socioeconomic: {
      unemployment: "11.5%",
      publicServices: "Alta cobertura urbana (98%+).",
      hdi: "0.812",
      nbi: "Total 9.1% | Cabecera 9.1% | Rural 45.8%",
      health: "Red hospitalaria de alta complejidad.",
      urbanRural: { urban: 99, rural: 1 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión, microtráfico y hurto.",
      armedGroups: "Bandas criminales locales y presencia de estructuras nacionales (Clan del Golfo)."
    }
  },
  "Baranoa": {
    category: "4",
    demographics: {
      total: "61,527",
      gender: { male: 49.9, female: 50.1 },
      ageGroups: [
        { label: "0 a 4", value: 4702 }, { label: "5 a 9", value: 4981 }, { label: "10 a 14", value: 5295 },
        { label: "15 a 19", value: 5508 }, { label: "20 a 24", value: 5067 }, { label: "25 a 29", value: 4926 },
        { label: "30 a 34", value: 4555 }, { label: "35 a 39", value: 4393 }, { label: "40 a 44", value: 3624 },
        { label: "45 a 49", value: 3582 }, { label: "50 a 54", value: 3624 }, { label: "55 a 59", value: 3280 },
        { label: "60 a 64", value: 2363 }, { label: "65 a 69", value: 1874 }, { label: "70 a 74", value: 1338 },
        { label: "75 a 79", value: 1032 }, { label: "80 a 84", value: 772 }, { label: "85 y más", value: 611 }
      ],
      ethnic: "Mestizo.",
      displacement: "Afectación moderada."
    },
    socioeconomic: {
      unemployment: "14.2%",
      publicServices: "Cobertura media-alta.",
      hdi: "0.745",
      nbi: "Total 14.3% | Cabecera 13.7% | Rural 17.2%",
      health: "Hospital de primer nivel.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto y extorsión.",
      armedGroups: "Delincuencia común."
    }
  },
  "Campo de la Cruz": {
    category: "6",
    demographics: {
      total: "22,810",
      gender: { male: 50.0, female: 50.0 },
      ageGroups: [
        { label: "0 a 4", value: 2049 }, { label: "5 a 9", value: 2183 }, { label: "10 a 14", value: 2219 },
        { label: "15 a 19", value: 2130 }, { label: "20 a 24", value: 1872 }, { label: "25 a 29", value: 1765 },
        { label: "30 a 34", value: 1619 }, { label: "35 a 39", value: 1357 }, { label: "40 a 44", value: 1254 },
        { label: "45 a 49", value: 1225 }, { label: "50 a 54", value: 1294 }, { label: "55 a 59", value: 1057 },
        { label: "60 a 64", value: 794 }, { label: "65 a 69", value: 574 }, { label: "70 a 74", value: 392 },
        { label: "75 a 79", value: 441 }, { label: "80 a 84", value: 319 }, { label: "85 y más", value: 266 }
      ],
      ethnic: "Mestizo.",
      displacement: "Alta vulnerabilidad por inundaciones históricas."
    },
    socioeconomic: {
      unemployment: "18.5%",
      publicServices: "Baja cobertura rural.",
      hdi: "0.682",
      nbi: "Total 35.0% | Cabecera 36.2% | Rural 26.4%",
      health: "Puesto de salud.",
      urbanRural: { urban: 90, rural: 10 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Candelaria": {
    category: "6",
    demographics: {
      total: "15,631",
      gender: { male: 50.9, female: 49.1 },
      ageGroups: [
        { label: "0 a 4", value: 1382 }, { label: "5 a 9", value: 1612 }, { label: "10 a 14", value: 1475 },
        { label: "15 a 19", value: 1500 }, { label: "20 a 24", value: 1312 }, { label: "25 a 29", value: 1223 },
        { label: "30 a 34", value: 1125 }, { label: "35 a 39", value: 1001 }, { label: "40 a 44", value: 870 },
        { label: "45 a 49", value: 920 }, { label: "50 a 54", value: 837 }, { label: "55 a 59", value: 686 },
        { label: "60 a 64", value: 505 }, { label: "65 a 69", value: 389 }, { label: "70 a 74", value: 309 },
        { label: "75 a 79", value: 222 }, { label: "80 a 84", value: 151 }, { label: "85 y más", value: 112 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona agrícola."
    },
    socioeconomic: {
      unemployment: "17.8%",
      publicServices: "Deficiencias en agua potable.",
      hdi: "0.695",
      nbi: "Total 33.0% | Cabecera 35.1% | Rural 27.6%",
      health: "Atención básica.",
      urbanRural: { urban: 80, rural: 20 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin grupos organizados."
    }
  },
  "Galapa": {
    category: "3",
    demographics: {
      total: "55,123",
      gender: { male: 50.1, female: 49.9 },
      ageGroups: [
        { label: "0 a 4", value: 4864 }, { label: "5 a 9", value: 4883 }, { label: "10 a 14", value: 4953 },
        { label: "15 a 19", value: 5234 }, { label: "20 a 24", value: 4855 }, { label: "25 a 29", value: 4605 },
        { label: "30 a 34", value: 4389 }, { label: "35 a 39", value: 4125 }, { label: "40 a 44", value: 3486 },
        { label: "45 a 49", value: 3209 }, { label: "50 a 54", value: 2837 }, { label: "55 a 59", value: 2390 },
        { label: "60 a 64", value: 1782 }, { label: "65 a 69", value: 1288 }, { label: "70 a 74", value: 877 },
        { label: "75 a 79", value: 586 }, { label: "80 a 84", value: 392 }, { label: "85 y más", value: 368 }
      ],
      ethnic: "Mestizo, con herencia indígena Mocaná.",
      displacement: "Crecimiento por expansión industrial de Barranquilla."
    },
    socioeconomic: {
      unemployment: "12.8%",
      publicServices: "Cobertura urbana aceptable.",
      hdi: "0.768",
      nbi: "Total 13.7% | Cabecera 13.1% | Rural 23.3%",
      health: "Hospital local.",
      urbanRural: { urban: 92, rural: 8 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Bandas locales."
    }
  },
  "Juan de Acosta": {
    category: "6",
    demographics: {
      total: "18,828",
      gender: { male: 51.6, female: 48.4 },
      ageGroups: [
        { label: "0 a 4", value: 1465 }, { label: "5 a 9", value: 1549 }, { label: "10 a 14", value: 1558 },
        { label: "15 a 19", value: 1730 }, { label: "20 a 24", value: 1623 }, { label: "25 a 29", value: 1514 },
        { label: "30 a 34", value: 1390 }, { label: "35 a 39", value: 1323 }, { label: "40 a 44", value: 1168 },
        { label: "45 a 49", value: 1177 }, { label: "50 a 54", value: 1074 }, { label: "55 a 59", value: 906 },
        { label: "60 a 64", value: 715 }, { label: "65 a 69", value: 533 }, { label: "70 a 74", value: 414 },
        { label: "75 a 79", value: 270 }, { label: "80 a 84", value: 207 }, { label: "85 y más", value: 212 }
      ],
      ethnic: "Mestizo.",
      displacement: "Vocación turística."
    },
    socioeconomic: {
      unemployment: "13.5%",
      publicServices: "Retos en alcantarillado.",
      hdi: "0.732",
      nbi: "Total 17.8% | Cabecera 16.3% | Rural 20.8%",
      health: "Atención primaria.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto ocasional.",
      armedGroups: "Sin presencia significativa."
    }
  },
  "Luruaco": {
    category: "6",
    demographics: {
      total: "27,647",
      gender: { male: 50.0, female: 50.0 },
      ageGroups: [
        { label: "0 a 4", value: 2519 }, { label: "5 a 9", value: 2575 }, { label: "10 a 14", value: 2778 },
        { label: "15 a 19", value: 2693 }, { label: "20 a 24", value: 2284 }, { label: "25 a 29", value: 2161 },
        { label: "30 a 34", value: 1787 }, { label: "35 a 39", value: 1793 }, { label: "40 a 44", value: 1538 },
        { label: "45 a 49", value: 1497 }, { label: "50 a 54", value: 1454 }, { label: "55 a 59", value: 1261 },
        { label: "60 a 64", value: 947 }, { label: "65 a 69", value: 730 }, { label: "70 a 74", value: 640 },
        { label: "75 a 79", value: 429 }, { label: "80 a 84", value: 298 }, { label: "85 y más", value: 263 }
      ],
      ethnic: "Mestizo y comunidades afro.",
      displacement: "Zona de paso y agricultura."
    },
    socioeconomic: {
      unemployment: "16.5%",
      publicServices: "Deficiencias en servicios básicos.",
      hdi: "0.702",
      nbi: "Total 24.8% | Cabecera 27.4% | Rural 22.2%",
      health: "Atención básica.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Malambo": {
    category: "2",
    demographics: {
      total: "119,920",
      gender: { male: 49.6, female: 50.4 },
      ageGroups: [
        { label: "0 a 4", value: 10215 }, { label: "5 a 9", value: 10751 }, { label: "10 a 14", value: 11087 },
        { label: "15 a 19", value: 11564 }, { label: "20 a 24", value: 10966 }, { label: "25 a 29", value: 10383 },
        { label: "30 a 34", value: 9184 }, { label: "35 a 39", value: 8685 }, { label: "40 a 44", value: 7118 },
        { label: "45 a 49", value: 6682 }, { label: "50 a 54", value: 6150 }, { label: "55 a 59", value: 5159 },
        { label: "60 a 64", value: 4031 }, { label: "65 a 69", value: 2979 }, { label: "70 a 74", value: 2025 },
        { label: "75 a 79", value: 1361 }, { label: "80 a 84", value: 892 }, { label: "85 y más", value: 688 }
      ],
      ethnic: "Mestizo y afrodescendiente.",
      displacement: "Crecimiento urbano acelerado."
    },
    socioeconomic: {
      unemployment: "13.2%",
      publicServices: "Cobertura media.",
      hdi: "0.758",
      nbi: "Total 12.9% | Cabecera 12.5% | Rural 19.3%",
      health: "Hospital local.",
      urbanRural: { urban: 95, rural: 5 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión y microtráfico.",
      armedGroups: "Bandas locales."
    }
  },
  "Manatí": {
    category: "6",
    demographics: {
      total: "19,233",
      gender: { male: 50.8, female: 49.2 },
      ageGroups: [
        { label: "0 a 4", value: 1985 }, { label: "5 a 9", value: 1810 }, { label: "10 a 14", value: 1881 },
        { label: "15 a 19", value: 2005 }, { label: "20 a 24", value: 1765 }, { label: "25 a 29", value: 1491 },
        { label: "30 a 34", value: 1249 }, { label: "35 a 39", value: 1105 }, { label: "40 a 44", value: 1039 },
        { label: "45 a 49", value: 1099 }, { label: "50 a 54", value: 1005 }, { label: "55 a 59", value: 807 },
        { label: "60 a 64", value: 576 }, { label: "65 a 69", value: 493 }, { label: "70 a 74", value: 331 },
        { label: "75 a 79", value: 242 }, { label: "80 a 84", value: 186 }, { label: "85 y más", value: 164 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona ganadera."
    },
    socioeconomic: {
      unemployment: "17.2%",
      publicServices: "Deficiencias en alcantarillado.",
      hdi: "0.688",
      nbi: "Total 23.9% | Cabecera 23.8% | Rural 24.4%",
      health: "Puesto de salud.",
      urbanRural: { urban: 80, rural: 20 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Palmar de Varela": {
    category: "6",
    demographics: {
      total: "27,098",
      gender: { male: 50.1, female: 49.9 },
      ageGroups: [
        { label: "0 a 4", value: 2127 }, { label: "5 a 9", value: 2231 }, { label: "10 a 14", value: 2216 },
        { label: "15 a 19", value: 2468 }, { label: "20 a 24", value: 2213 }, { label: "25 a 29", value: 2199 },
        { label: "30 a 34", value: 2039 }, { label: "35 a 39", value: 1938 }, { label: "40 a 44", value: 1664 },
        { label: "45 a 49", value: 1637 }, { label: "50 a 54", value: 1632 }, { label: "55 a 59", value: 1357 },
        { label: "60 a 64", value: 1034 }, { label: "65 a 69", value: 787 }, { label: "70 a 74", value: 581 },
        { label: "75 a 79", value: 433 }, { label: "80 a 84", value: 282 }, { label: "85 y más", value: 260 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona agroindustrial."
    },
    socioeconomic: {
      unemployment: "14.5%",
      publicServices: "Cobertura media.",
      hdi: "0.725",
      nbi: "Total 18.2% | Cabecera 17.7% | Rural 33.1%",
      health: "Atención básica.",
      urbanRural: { urban: 88, rural: 12 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Delincuencia común."
    }
  },
  "Piojó": {
    category: "6",
    demographics: {
      total: "5,636",
      gender: { male: 52.0, female: 48.0 },
      ageGroups: [
        { label: "0 a 4", value: 413 }, { label: "5 a 9", value: 517 }, { label: "10 a 14", value: 530 },
        { label: "15 a 19", value: 493 }, { label: "20 a 24", value: 465 }, { label: "25 a 29", value: 430 },
        { label: "30 a 34", value: 408 }, { label: "35 a 39", value: 369 }, { label: "40 a 44", value: 339 },
        { label: "45 a 49", value: 344 }, { label: "50 a 54", value: 369 }, { label: "55 a 59", value: 233 },
        { label: "60 a 64", value: 209 }, { label: "65 a 69", value: 162 }, { label: "70 a 74", value: 124 },
        { label: "75 a 79", value: 88 }, { label: "80 a 84", value: 76 }, { label: "85 y más", value: 67 }
      ],
      ethnic: "Mestizo e indígena Mocaná.",
      displacement: "Zona de lomeríos con riesgos geológicos."
    },
    socioeconomic: {
      unemployment: "15.8%",
      publicServices: "Baja cobertura en zonas rurales.",
      hdi: "0.710",
      nbi: "Total 20.5% | Cabecera 19.2% | Rural 21.8%",
      health: "Puesto de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Sin presencia significativa."
    }
  },
  "Polonuevo": {
    category: "6",
    demographics: {
      total: "16,222",
      gender: { male: 50.6, female: 49.4 },
      ageGroups: [
        { label: "0 a 4", value: 1253 }, { label: "5 a 9", value: 1370 }, { label: "10 a 14", value: 1539 },
        { label: "15 a 19", value: 1602 }, { label: "20 a 24", value: 1293 }, { label: "25 a 29", value: 1191 },
        { label: "30 a 34", value: 1110 }, { label: "35 a 39", value: 1253 }, { label: "40 a 44", value: 958 },
        { label: "45 a 49", value: 921 }, { label: "50 a 54", value: 899 }, { label: "55 a 59", value: 753 },
        { label: "60 a 64", value: 604 }, { label: "65 a 69", value: 527 }, { label: "70 a 74", value: 375 },
        { label: "75 a 79", value: 241 }, { label: "80 a 84", value: 162 }, { label: "85 y más", value: 171 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona agrícola y de servicios."
    },
    socioeconomic: {
      unemployment: "13.8%",
      publicServices: "Cobertura media.",
      hdi: "0.738",
      nbi: "Total 13.3% | Cabecera 11.7% | Rural 21.4%",
      health: "Centro de salud.",
      urbanRural: { urban: 82, rural: 18 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Ponedera": {
    category: "6",
    demographics: {
      total: "23,420",
      gender: { male: 50.9, female: 49.1 },
      ageGroups: [
        { label: "0 a 4", value: 2131 }, { label: "5 a 9", value: 2275 }, { label: "10 a 14", value: 2232 },
        { label: "15 a 19", value: 2337 }, { label: "20 a 24", value: 2022 }, { label: "25 a 29", value: 1897 },
        { label: "30 a 34", value: 1664 }, { label: "35 a 39", value: 1512 }, { label: "40 a 44", value: 1376 },
        { label: "45 a 49", value: 1304 }, { label: "50 a 54", value: 1178 }, { label: "55 a 59", value: 1037 },
        { label: "60 a 64", value: 733 }, { label: "65 a 69", value: 581 }, { label: "70 a 74", value: 425 },
        { label: "75 a 79", value: 321 }, { label: "80 a 84", value: 215 }, { label: "85 y más", value: 180 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona ribereña agrícola."
    },
    socioeconomic: {
      unemployment: "17.5%",
      publicServices: "Deficiencias en agua potable.",
      hdi: "0.692",
      nbi: "Total 23.2% | Cabecera 21.8% | Rural 25.2%",
      health: "Atención básica.",
      urbanRural: { urban: 78, rural: 22 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Puerto Colombia": {
    category: "2",
    demographics: {
      total: "47,899",
      gender: { male: 48.7, female: 51.3 },
      ageGroups: [
        { label: "0 a 4", value: 3372 }, { label: "5 a 9", value: 3703 }, { label: "10 a 14", value: 3620 },
        { label: "15 a 19", value: 4281 }, { label: "20 a 24", value: 4061 }, { label: "25 a 29", value: 3548 },
        { label: "30 a 34", value: 3618 }, { label: "35 a 39", value: 3780 }, { label: "40 a 44", value: 3341 },
        { label: "45 a 49", value: 3128 }, { label: "50 a 54", value: 2951 }, { label: "55 a 59", value: 2479 },
        { label: "60 a 64", value: 1922 }, { label: "65 a 69", value: 1513 }, { label: "70 a 74", value: 1035 },
        { label: "75 a 79", value: 690 }, { label: "80 a 84", value: 456 }, { label: "85 y más", value: 401 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona turística y residencial de alta valorización."
    },
    socioeconomic: {
      unemployment: "10.8%",
      publicServices: "Alta cobertura urbana.",
      hdi: "0.795",
      nbi: "Total 9.2% | Cabecera 8.3% | Rural 15.5%",
      health: "Hospital local y clínicas privadas cercanas.",
      urbanRural: { urban: 94, rural: 6 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto a residencias.",
      armedGroups: "Delincuencia común."
    }
  },
  "Repelón": {
    category: "6",
    demographics: {
      total: "25,467",
      gender: { male: 50.0, female: 50.0 },
      ageGroups: [
        { label: "0 a 4", value: 2243 }, { label: "5 a 9", value: 2358 }, { label: "10 a 14", value: 2392 },
        { label: "15 a 19", value: 2576 }, { label: "20 a 24", value: 2053 }, { label: "25 a 29", value: 1899 },
        { label: "30 a 34", value: 1734 }, { label: "35 a 39", value: 1574 }, { label: "40 a 44", value: 1392 },
        { label: "45 a 49", value: 1479 }, { label: "50 a 54", value: 1338 }, { label: "55 a 59", value: 1236 },
        { label: "60 a 64", value: 942 }, { label: "65 a 69", value: 752 }, { label: "70 a 74", value: 571 },
        { label: "75 a 79", value: 421 }, { label: "80 a 84", value: 275 }, { label: "85 y más", value: 232 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona agrícola con retos por el Embalse del Guájaro."
    },
    socioeconomic: {
      unemployment: "18.2%",
      publicServices: "Deficiencias en servicios rurales.",
      hdi: "0.675",
      nbi: "Total 29.5% | Cabecera 32.6% | Rural 22.7%",
      health: "Atención básica.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Sabanagrande": {
    category: "4",
    demographics: {
      total: "32,026",
      gender: { male: 49.9, female: 50.1 },
      ageGroups: [
        { label: "0 a 4", value: 2670 }, { label: "5 a 9", value: 2613 }, { label: "10 a 14", value: 2779 },
        { label: "15 a 19", value: 2967 }, { label: "20 a 24", value: 2902 }, { label: "25 a 29", value: 2683 },
        { label: "30 a 34", value: 2434 }, { label: "35 a 39", value: 2328 }, { label: "40 a 44", value: 1980 },
        { label: "45 a 49", value: 1852 }, { label: "50 a 54", value: 1765 }, { label: "55 a 59", value: 1480 },
        { label: "60 a 64", value: 1188 }, { label: "65 a 69", value: 871 }, { label: "70 a 74", value: 599 },
        { label: "75 a 79", value: 388 }, { label: "80 a 84", value: 267 }, { label: "85 y más", value: 260 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona industrial y portuaria en crecimiento."
    },
    socioeconomic: {
      unemployment: "13.5%",
      publicServices: "Cobertura media-alta.",
      hdi: "0.752",
      nbi: "Total 16.3% | Cabecera 15.7% | Rural 30.3%",
      health: "Hospital local.",
      urbanRural: { urban: 90, rural: 10 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Delincuencia común."
    }
  },
  "Sabanalarga (Atlántico)": {
    category: "2",
    demographics: {
      total: "92,480",
      gender: { male: 49.6, female: 50.4 },
      ageGroups: [
        { label: "0 a 4", value: 7867 }, { label: "5 a 9", value: 8267 }, { label: "10 a 14", value: 8201 },
        { label: "15 a 19", value: 8415 }, { label: "20 a 24", value: 7760 }, { label: "25 a 29", value: 7526 },
        { label: "30 a 34", value: 6584 }, { label: "35 a 39", value: 6260 }, { label: "40 a 44", value: 5349 },
        { label: "45 a 49", value: 5253 }, { label: "50 a 54", value: 5189 }, { label: "55 a 59", value: 4413 },
        { label: "60 a 64", value: 3401 }, { label: "65 a 69", value: 2627 }, { label: "70 a 74", value: 2035 },
        { label: "75 a 79", value: 1468 }, { label: "80 a 84", value: 987 }, { label: "85 y más", value: 878 }
      ],
      ethnic: "Mestizo.",
      displacement: "Centro de servicios regional y ganadero."
    },
    socioeconomic: {
      unemployment: "14.2%",
      publicServices: "Cobertura urbana amplia.",
      hdi: "0.748",
      nbi: "Total 18.1% | Cabecera 15.7% | Rural 25.3%",
      health: "Hospital de segundo nivel.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto y abigeato.",
      armedGroups: "Bandas locales."
    }
  },
  "Santa Lucía": {
    category: "6",
    demographics: {
      total: "12,650",
      gender: { male: 49.9, female: 50.1 },
      ageGroups: [
        { label: "0 a 4", value: 1169 }, { label: "5 a 9", value: 1158 }, { label: "10 a 14", value: 1309 },
        { label: "15 a 19", value: 1300 }, { label: "20 a 24", value: 1101 }, { label: "25 a 29", value: 944 },
        { label: "30 a 34", value: 893 }, { label: "35 a 39", value: 773 }, { label: "40 a 44", value: 768 },
        { label: "45 a 49", value: 710 }, { label: "50 a 54", value: 665 }, { label: "55 a 59", value: 505 },
        { label: "60 a 64", value: 362 }, { label: "65 a 69", value: 311 }, { label: "70 a 74", value: 195 },
        { label: "75 a 79", value: 201 }, { label: "80 a 84", value: 152 }, { label: "85 y más", value: 134 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona ribereña con fuerte identidad cultural (Son de Negro)."
    },
    socioeconomic: {
      unemployment: "18.5%",
      publicServices: "Deficiencias en alcantarillado.",
      hdi: "0.672",
      nbi: "Total 33.1% | Cabecera 35.0% | Rural 20.9%",
      health: "Puesto de salud.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Santo Tomás": {
    category: "4",
    demographics: {
      total: "28,693",
      gender: { male: 49.3, female: 50.7 },
      ageGroups: [
        { label: "0 a 4", value: 2079 }, { label: "5 a 9", value: 2233 }, { label: "10 a 14", value: 2235 },
        { label: "15 a 19", value: 2586 }, { label: "20 a 24", value: 2356 }, { label: "25 a 29", value: 2314 },
        { label: "30 a 34", value: 2109 }, { label: "35 a 39", value: 2118 }, { label: "40 a 44", value: 1724 },
        { label: "45 a 49", value: 1745 }, { label: "50 a 54", value: 1756 }, { label: "55 a 59", value: 1490 },
        { label: "60 a 64", value: 1230 }, { label: "65 a 69", value: 939 }, { label: "70 a 74", value: 701 },
        { label: "75 a 79", value: 453 }, { label: "80 a 84", value: 340 }, { label: "85 y más", value: 285 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona de expansión urbana y agrícola."
    },
    socioeconomic: {
      unemployment: "13.2%",
      publicServices: "Cobertura media-alta.",
      hdi: "0.755",
      nbi: "Total 14.8% | Cabecera 14.2% | Rural 27.8%",
      health: "Hospital local.",
      urbanRural: { urban: 92, rural: 8 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Delincuencia común."
    }
  },
  "Soledad": {
    category: "1",
    demographics: {
      total: "535,984",
      gender: { male: 48.7, female: 51.3 },
      ageGroups: [
        { label: "0 a 4", value: 43393 }, { label: "5 a 9", value: 44617 }, { label: "10 a 14", value: 44192 },
        { label: "15 a 19", value: 48835 }, { label: "20 a 24", value: 49722 }, { label: "25 a 29", value: 48114 },
        { label: "30 a 34", value: 42718 }, { label: "35 a 39", value: 39927 }, { label: "40 a 44", value: 33018 },
        { label: "45 a 49", value: 31900 }, { label: "50 a 54", value: 31041 }, { label: "55 a 59", value: 25862 },
        { label: "60 a 64", value: 18631 }, { label: "65 a 69", value: 13049 }, { label: "70 a 74", value: 8483 },
        { label: "75 a 79", value: 5841 }, { label: "80 a 84", value: 3579 }, { label: "85 y más", value: 3062 }
      ],
      ethnic: "Mestizo y afrodescendiente.",
      displacement: "Alta recepción de población desplazada; conurbación con Barranquilla."
    },
    socioeconomic: {
      unemployment: "14.5%",
      publicServices: "Cobertura urbana amplia pero con fallas en calidad.",
      hdi: "0.782",
      nbi: "Total 8.0% | Cabecera 7.9% | Rural 73.3%",
      health: "Red hospitalaria pública y privada.",
      urbanRural: { urban: 98, rural: 2 }
    },
    security: {
      homicideRate: "Muy Alta",
      otherCrimes: "Extorsión, microtráfico, hurto.",
      armedGroups: "Bandas criminales (Los Costeños, Los Pepes)."
    }
  },
  "Suan": {
    category: "6",
    demographics: {
      total: "11,607",
      gender: { male: 48.9, female: 51.1 },
      ageGroups: [
        { label: "0 a 4", value: 1054 }, { label: "5 a 9", value: 1055 }, { label: "10 a 14", value: 1065 },
        { label: "15 a 19", value: 1128 }, { label: "20 a 24", value: 1021 }, { label: "25 a 29", value: 930 },
        { label: "30 a 34", value: 842 }, { label: "35 a 39", value: 742 }, { label: "40 a 44", value: 660 },
        { label: "45 a 49", value: 674 }, { label: "50 a 54", value: 637 }, { label: "55 a 59", value: 526 },
        { label: "60 a 64", value: 425 }, { label: "65 a 69", value: 306 }, { label: "70 a 74", value: 207 },
        { label: "75 a 79", value: 167 }, { label: "80 a 84", value: 88 }, { label: "85 y más", value: 80 }
      ],
      ethnic: "Mestizo.",
      displacement: "Extremo sur del departamento, zona agrícola."
    },
    socioeconomic: {
      unemployment: "16.2%",
      publicServices: "Cobertura media.",
      hdi: "0.698",
      nbi: "Total 18.3% | Cabecera 17.4% | Rural 40.5%",
      health: "Atención básica.",
      urbanRural: { urban: 80, rural: 20 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Tubará": {
    category: "6",
    demographics: {
      total: "12,718",
      gender: { male: 51.9, female: 48.1 },
      ageGroups: [
        { label: "0 a 4", value: 977 }, { label: "5 a 9", value: 1070 }, { label: "10 a 14", value: 1045 },
        { label: "15 a 19", value: 1103 }, { label: "20 a 24", value: 1121 }, { label: "25 a 29", value: 1036 },
        { label: "30 a 34", value: 896 }, { label: "35 a 39", value: 876 }, { label: "40 a 44", value: 788 },
        { label: "45 a 49", value: 787 }, { label: "50 a 54", value: 722 }, { label: "55 a 59", value: 643 },
        { label: "60 a 64", value: 504 }, { label: "65 a 69", value: 361 }, { label: "70 a 74", value: 284 },
        { label: "75 a 79", value: 219 }, { label: "80 a 84", value: 145 }, { label: "85 y más", value: 141 }
      ],
      ethnic: "Mestizo e indígena Mocaná.",
      displacement: "Zona turística y arqueológica."
    },
    socioeconomic: {
      unemployment: "14.8%",
      publicServices: "Deficiencias en agua potable.",
      hdi: "0.715",
      nbi: "Total 16.1% | Cabecera 15.4% | Rural 16.9%",
      health: "Puesto de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto.",
      armedGroups: "Baja presencia."
    }
  },
  "Usiacurí": {
    category: "6",
    demographics: {
      total: "9,543",
      gender: { male: 51.1, female: 48.9 },
      ageGroups: [
        { label: "0 a 4", value: 724 }, { label: "5 a 9", value: 756 }, { label: "10 a 14", value: 736 },
        { label: "15 a 19", value: 846 }, { label: "20 a 24", value: 782 }, { label: "25 a 29", value: 733 },
        { label: "30 a 34", value: 701 }, { label: "35 a 39", value: 705 }, { label: "40 a 44", value: 600 },
        { label: "45 a 49", value: 592 }, { label: "50 a 54", value: 560 }, { label: "55 a 59", value: 483 },
        { label: "60 a 64", value: 396 }, { label: "65 a 69", value: 295 }, { label: "70 a 74", value: 234 },
        { label: "75 a 79", value: 163 }, { label: "80 a 84", value: 136 }, { label: "85 y más", value: 101 }
      ],
      ethnic: "Mestizo.",
      displacement: "Pesebre del Atlántico, vocación artesanal y turística."
    },
    socioeconomic: {
      unemployment: "12.5%",
      publicServices: "Cobertura media.",
      hdi: "0.742",
      nbi: "Total 13.6% | Cabecera 12.7% | Rural 27.7%",
      health: "Centro de salud.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Hurto ocasional.",
      armedGroups: "Sin presencia significativa."
    }
  },
  "Santa Marta": {
    category: "Especial",
    demographics: {
      total: "479,853",
      gender: { male: 48.4, female: 51.6 },
      ageGroups: [
        { label: "0 a 4", value: 38302 }, { label: "5 a 9", value: 40679 }, { label: "10 a 14", value: 42822 },
        { label: "15 a 19", value: 45630 }, { label: "20 a 24", value: 43473 }, { label: "25 a 29", value: 40680 },
        { label: "30 a 34", value: 36364 }, { label: "35 a 39", value: 35282 }, { label: "40 a 44", value: 30331 },
        { label: "45 a 49", value: 27259 }, { label: "50 a 54", value: 25717 }, { label: "55 a 59", value: 21741 },
        { label: "60 a 64", value: 17082 }, { label: "65 a 69", value: 12804 }, { label: "70 a 74", value: 8564 },
        { label: "75 a 79", value: 5843 }, { label: "80 a 84", value: 3714 }, { label: "85 y más", value: 3566 }
      ],
      ethnic: "Diversidad étnica, presencia de pueblos indígenas de la Sierra Nevada.",
      displacement: "Distrito Turístico, Cultural e Histórico."
    },
    socioeconomic: {
      unemployment: "11.2%",
      publicServices: "Cobertura alta en casco urbano.",
      hdi: "0.745",
      nbi: "Total 14.30% | Cabecera 13.27% | Rural 25.56%",
      health: "Red hospitalaria de alta complejidad.",
      urbanRural: { urban: 95, rural: 5 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Narcotráfico, control territorial de bandas criminales.",
      armedGroups: "Bandas criminales, grupos de delincuencia organizada."
    }
  },
  "Algarrobo": {
    category: "6",
    demographics: {
      total: "14,294",
      gender: { male: 51.9, female: 48.1 },
      ageGroups: [
        { label: "0 a 4", value: 1521 }, { label: "5 a 9", value: 1627 }, { label: "10 a 14", value: 1712 },
        { label: "15 a 19", value: 1563 }, { label: "20 a 24", value: 1155 }, { label: "25 a 29", value: 1068 },
        { label: "30 a 34", value: 974 }, { label: "35 a 39", value: 811 }, { label: "40 a 44", value: 746 },
        { label: "45 a 49", value: 692 }, { label: "50 a 54", value: 636 }, { label: "55 a 59", value: 538 },
        { label: "60 a 64", value: 415 }, { label: "65 a 69", value: 323 }, { label: "70 a 74", value: 184 },
        { label: "75 a 79", value: 147 }, { label: "80 a 84", value: 110 }, { label: "85 y más", value: 72 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona con retos de seguridad en áreas rurales."
    },
    socioeconomic: {
      unemployment: "14.5%",
      publicServices: "Cobertura media.",
      hdi: "0.650",
      nbi: "Total 29.48% | Cabecera 29.44% | Rural 29.57%",
      health: "Centro de salud local.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto, extorsión rural.",
      armedGroups: "Presencia de grupos armados ilegales."
    }
  },
  "Aracataca": {
    category: "6",
    demographics: {
      total: "37,476",
      gender: { male: 50.7, female: 49.3 },
      ageGroups: [
        { label: "0 a 4", value: 3641 }, { label: "5 a 9", value: 4126 }, { label: "10 a 14", value: 4194 },
        { label: "15 a 19", value: 4146 }, { label: "20 a 24", value: 3463 }, { label: "25 a 29", value: 2931 },
        { label: "30 a 34", value: 2324 }, { label: "35 a 39", value: 2232 }, { label: "40 a 44", value: 1953 },
        { label: "45 a 49", value: 1799 }, { label: "50 a 54", value: 1651 }, { label: "55 a 59", value: 1484 },
        { label: "60 a 64", value: 1086 }, { label: "65 a 69", value: 893 }, { label: "70 a 74", value: 577 },
        { label: "75 a 79", value: 420 }, { label: "80 a 84", value: 286 }, { label: "85 y más", value: 270 }
      ],
      ethnic: "Mestizo.",
      displacement: "Cuna de Gabriel García Márquez, vocación cultural y bananera."
    },
    socioeconomic: {
      unemployment: "13.8%",
      publicServices: "Cobertura media-baja.",
      hdi: "0.662",
      nbi: "Total 29.42% | Cabecera 19.23% | Rural 44.90%",
      health: "Hospital local.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Presencia esporádica de grupos armados."
    }
  },
  "Ariguaní": {
    category: "6",
    demographics: {
      total: "28,348",
      gender: { male: 51.2, female: 48.8 },
      ageGroups: [
        { label: "0 a 4", value: 2666 }, { label: "5 a 9", value: 2942 }, { label: "10 a 14", value: 3226 },
        { label: "15 a 19", value: 2826 }, { label: "20 a 24", value: 2283 }, { label: "25 a 29", value: 2034 },
        { label: "30 a 34", value: 1902 }, { label: "35 a 39", value: 1825 }, { label: "40 a 44", value: 1598 },
        { label: "45 a 49", value: 1518 }, { label: "50 a 54", value: 1451 }, { label: "55 a 59", value: 1150 },
        { label: "60 a 64", value: 958 }, { label: "65 a 69", value: 737 }, { label: "70 a 74", value: 494 },
        { label: "75 a 79", value: 332 }, { label: "80 a 84", value: 223 }, { label: "85 y más", value: 183 }
      ],
      ethnic: "Mestizo.",
      displacement: "Vocación ganadera y comercial."
    },
    socioeconomic: {
      unemployment: "12.9%",
      publicServices: "Cobertura media.",
      hdi: "0.648",
      nbi: "Total 44.30% | Cabecera 44.75% | Rural 43.39%",
      health: "Centro de salud.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Baja-Moderada",
      otherCrimes: "Hurto de ganado.",
      armedGroups: "Control de rutas por grupos ilegales."
    }
  },
  "Cerro de San Antonio": {
    category: "6",
    demographics: {
      total: "9,225",
      gender: { male: 51.8, female: 48.2 },
      ageGroups: [
        { label: "0 a 4", value: 791 }, { label: "5 a 9", value: 963 }, { label: "10 a 14", value: 959 },
        { label: "15 a 19", value: 842 }, { label: "20 a 24", value: 717 }, { label: "25 a 29", value: 656 },
        { label: "30 a 34", value: 591 }, { label: "35 a 39", value: 594 }, { label: "40 a 44", value: 497 },
        { label: "45 a 49", value: 504 }, { label: "50 a 54", value: 491 }, { label: "55 a 59", value: 383 },
        { label: "60 a 64", value: 312 }, { label: "65 a 69", value: 341 }, { label: "70 a 74", value: 210 },
        { label: "75 a 79", value: 191 }, { label: "80 a 84", value: 94 }, { label: "85 y más", value: 89 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio ribereño con vocación pesquera."
    },
    socioeconomic: {
      unemployment: "15.2%",
      publicServices: "Cobertura baja.",
      hdi: "0.635",
      nbi: "Total 38.16% | Cabecera 41.54% | Rural 33.83%",
      health: "Puesto de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia permanente reportada."
    }
  },
  "Chivolo": {
    category: "6",
    demographics: {
      total: "18,208",
      gender: { male: 53.4, female: 46.6 },
      ageGroups: [
        { label: "0 a 4", value: 1730 }, { label: "5 a 9", value: 1958 }, { label: "10 a 14", value: 2095 },
        { label: "15 a 19", value: 1807 }, { label: "20 a 24", value: 1481 }, { label: "25 a 29", value: 1339 },
        { label: "30 a 34", value: 1263 }, { label: "35 a 39", value: 1186 }, { label: "40 a 44", value: 1003 },
        { label: "45 a 49", value: 995 }, { label: "50 a 54", value: 888 }, { label: "55 a 59", value: 698 },
        { label: "60 a 64", value: 583 }, { label: "65 a 69", value: 405 }, { label: "70 a 74", value: 327 },
        { label: "75 a 79", value: 206 }, { label: "80 a 84", value: 111 }, { label: "85 y más", value: 133 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona históricamente afectada por el conflicto armado."
    },
    socioeconomic: {
      unemployment: "16.1%",
      publicServices: "Cobertura deficiente.",
      hdi: "0.628",
      nbi: "Total 44.91% | Cabecera 35.09% | Rural 64.47%",
      health: "Centro de salud.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Moderada-Alta",
      otherCrimes: "Extorsión, control de tierras.",
      armedGroups: "Presencia de grupos armados organizados."
    }
  },
  "Ciénaga": {
    category: "2",
    demographics: {
      total: "118,435",
      gender: { male: 49.6, female: 50.4 },
      ageGroups: [
        { label: "0 a 4", value: 10638 }, { label: "5 a 9", value: 11412 }, { label: "10 a 14", value: 11586 },
        { label: "15 a 19", value: 12423 }, { label: "20 a 24", value: 10996 }, { label: "25 a 29", value: 9208 },
        { label: "30 a 34", value: 8123 }, { label: "35 a 39", value: 7905 }, { label: "40 a 44", value: 6762 },
        { label: "45 a 49", value: 6357 }, { label: "50 a 54", value: 5710 }, { label: "55 a 59", value: 4997 },
        { label: "60 a 64", value: 3954 }, { label: "65 a 69", value: 3035 }, { label: "70 a 74", value: 2005 },
        { label: "75 a 79", value: 1432 }, { label: "80 a 84", value: 1010 }, { label: "85 y más", value: 882 }
      ],
      ethnic: "Mestizo, Afrodescendiente.",
      displacement: "Capital del realismo mágico, eje bananero y portuario."
    },
    socioeconomic: {
      unemployment: "12.8%",
      publicServices: "Cobertura media-alta.",
      hdi: "0.712",
      nbi: "Total 28.53% | Cabecera 25.75% | Rural 49.74%",
      health: "Hospital de segundo nivel.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Microtráfico, extorsión.",
      armedGroups: "Grupos armados en la Sierra Nevada."
    }
  },
  "Concordia (Magdalena)": {
    category: "6",
    demographics: {
      total: "9,681",
      gender: { male: 52.8, female: 47.2 },
      ageGroups: [
        { label: "0 a 4", value: 682 }, { label: "5 a 9", value: 930 }, { label: "10 a 14", value: 965 },
        { label: "15 a 19", value: 916 }, { label: "20 a 24", value: 560 }, { label: "25 a 29", value: 517 },
        { label: "30 a 34", value: 511 }, { label: "35 a 39", value: 551 }, { label: "40 a 44", value: 579 },
        { label: "45 a 49", value: 647 }, { label: "50 a 54", value: 563 }, { label: "55 a 59", value: 563 },
        { label: "60 a 64", value: 426 }, { label: "65 a 69", value: 437 }, { label: "70 a 74", value: 253 },
        { label: "75 a 79", value: 271 }, { label: "80 a 84", value: 153 }, { label: "85 y más", value: 157 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio con fuerte dependencia de la agricultura."
    },
    socioeconomic: {
      unemployment: "14.9%",
      publicServices: "Cobertura baja.",
      hdi: "0.630",
      nbi: "Total 31.72% | Cabecera 37.82% | Rural 27.38%",
      health: "Centro de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "El Banco": {
    category: "4",
    demographics: {
      total: "59,594",
      gender: { male: 50.5, female: 49.5 },
      ageGroups: [
        { label: "0 a 4", value: 5729 }, { label: "5 a 9", value: 6373 }, { label: "10 a 14", value: 6306 },
        { label: "15 a 19", value: 6216 }, { label: "20 a 24", value: 4902 }, { label: "25 a 29", value: 4372 },
        { label: "30 a 34", value: 3788 }, { label: "35 a 39", value: 3469 }, { label: "40 a 44", value: 3190 },
        { label: "45 a 49", value: 3037 }, { label: "50 a 54", value: 2805 }, { label: "55 a 59", value: 2494 },
        { label: "60 a 64", value: 1940 }, { label: "65 a 69", value: 1588 }, { label: "70 a 74", value: 1279 },
        { label: "75 a 79", value: 965 }, { label: "80 a 84", value: 626 }, { label: "85 y más", value: 515 }
      ],
      ethnic: "Mestizo, Afrodescendiente.",
      displacement: "Ciudad Imperio de la Cumbia, nodo comercial fluvial."
    },
    socioeconomic: {
      unemployment: "13.2%",
      publicServices: "Cobertura media.",
      hdi: "0.685",
      nbi: "Total 32.17% | Cabecera 25.67% | Rural 43.74%",
      health: "Hospital regional.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto, microtráfico.",
      armedGroups: "Presencia de grupos armados en zonas limítrofes."
    }
  },
  "El Piñón": {
    category: "6",
    demographics: {
      total: "17,308",
      gender: { male: 52.2, female: 47.8 },
      ageGroups: [
        { label: "0 a 4", value: 1478 }, { label: "5 a 9", value: 1706 }, { label: "10 a 14", value: 1603 },
        { label: "15 a 19", value: 1632 }, { label: "20 a 24", value: 1352 }, { label: "25 a 29", value: 1149 },
        { label: "30 a 34", value: 1114 }, { label: "35 a 39", value: 1005 }, { label: "40 a 44", value: 1045 },
        { label: "45 a 49", value: 1017 }, { label: "50 a 54", value: 1031 }, { label: "55 a 59", value: 840 },
        { label: "60 a 64", value: 648 }, { label: "65 a 69", value: 527 }, { label: "70 a 74", value: 403 },
        { label: "75 a 79", value: 303 }, { label: "80 a 84", value: 221 }, { label: "85 y más", value: 234 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio ribereño con vocación ganadera."
    },
    socioeconomic: {
      unemployment: "15.5%",
      publicServices: "Cobertura baja.",
      hdi: "0.632",
      nbi: "Total 25.71% | Cabecera 34.53% | Rural 20.79%",
      health: "Centro de salud.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "El Retén": {
    category: "6",
    demographics: {
      total: "19,345",
      gender: { male: 51.3, female: 48.7 },
      ageGroups: [
        { label: "0 a 4", value: 1897 }, { label: "5 a 9", value: 2184 }, { label: "10 a 14", value: 2255 },
        { label: "15 a 19", value: 2254 }, { label: "20 a 24", value: 1736 }, { label: "25 a 29", value: 1493 },
        { label: "30 a 34", value: 1216 }, { label: "35 a 39", value: 1139 }, { label: "40 a 44", value: 1032 },
        { label: "45 a 49", value: 974 }, { label: "50 a 54", value: 807 }, { label: "55 a 59", value: 682 },
        { label: "60 a 64", value: 565 }, { label: "65 a 69", value: 426 }, { label: "70 a 74", value: 244 },
        { label: "75 a 79", value: 224 }, { label: "80 a 84", value: 116 }, { label: "85 y más", value: 101 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona de influencia bananera."
    },
    socioeconomic: {
      unemployment: "14.2%",
      publicServices: "Cobertura media-baja.",
      hdi: "0.645",
      nbi: "Total 35.47% | Cabecera 31.76% | Rural 50.28%",
      health: "Centro de salud.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Presencia de grupos armados en zonas rurales."
    }
  },
  "Fundación": {
    category: "4",
    demographics: {
      total: "64,833",
      gender: { male: 49.3, female: 50.7 },
      ageGroups: [
        { label: "0 a 4", value: 6157 }, { label: "5 a 9", value: 6769 }, { label: "10 a 14", value: 7436 },
        { label: "15 a 19", value: 6948 }, { label: "20 a 24", value: 5471 }, { label: "25 a 29", value: 4880 },
        { label: "30 a 34", value: 4398 }, { label: "35 a 39", value: 3946 }, { label: "40 a 44", value: 3441 },
        { label: "45 a 49", value: 3316 }, { label: "50 a 54", value: 3057 }, { label: "55 a 59", value: 2592 },
        { label: "60 a 64", value: 2100 }, { label: "65 a 69", value: 1585 }, { label: "70 a 74", value: 1066 },
        { label: "75 a 79", value: 751 }, { label: "80 a 84", value: 492 }, { label: "85 y más", value: 428 }
      ],
      ethnic: "Mestizo.",
      displacement: "La Esquina del Progreso, nodo comercial y de transporte."
    },
    socioeconomic: {
      unemployment: "13.5%",
      publicServices: "Cobertura media.",
      hdi: "0.678",
      nbi: "Total 25.23% | Cabecera 16.84% | Rural 74.67%",
      health: "Hospital de segundo nivel.",
      urbanRural: { urban: 80, rural: 20 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión, microtráfico.",
      armedGroups: "Presencia de grupos armados organizados."
    }
  },
  "Guamal": {
    category: "6",
    demographics: {
      total: "25,312",
      gender: { male: 51.8, female: 48.2 },
      ageGroups: [
        { label: "0 a 4", value: 2297 }, { label: "5 a 9", value: 2625 }, { label: "10 a 14", value: 2897 },
        { label: "15 a 19", value: 2470 }, { label: "20 a 24", value: 1669 }, { label: "25 a 29", value: 1415 },
        { label: "30 a 34", value: 1334 }, { label: "35 a 39", value: 1409 }, { label: "40 a 44", value: 1364 },
        { label: "45 a 49", value: 1380 }, { label: "50 a 54", value: 1366 }, { label: "55 a 59", value: 1278 },
        { label: "60 a 64", value: 1030 }, { label: "65 a 69", value: 900 }, { label: "70 a 74", value: 608 },
        { label: "75 a 79", value: 607 }, { label: "80 a 84", value: 317 }, { label: "85 y más", value: 346 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio con vocación agrícola y ganadera."
    },
    socioeconomic: {
      unemployment: "15.8%",
      publicServices: "Cobertura baja.",
      hdi: "0.638",
      nbi: "Total 33.25% | Cabecera 22.14% | Rural 38.58%",
      health: "Centro de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "Nueva Granada": {
    category: "6",
    demographics: {
      total: "17,470",
      gender: { male: 52.2, female: 47.8 },
      ageGroups: [
        { label: "0 a 4", value: 1698 }, { label: "5 a 9", value: 2060 }, { label: "10 a 14", value: 2127 },
        { label: "15 a 19", value: 1862 }, { label: "20 a 24", value: 1382 }, { label: "25 a 29", value: 1188 },
        { label: "30 a 34", value: 1239 }, { label: "35 a 39", value: 1031 }, { label: "40 a 44", value: 994 },
        { label: "45 a 49", value: 922 }, { label: "50 a 54", value: 772 }, { label: "55 a 59", value: 623 },
        { label: "60 a 64", value: 490 }, { label: "65 a 69", value: 399 }, { label: "70 a 74", value: 274 },
        { label: "75 a 79", value: 201 }, { label: "80 a 84", value: 122 }, { label: "85 y más", value: 86 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio con altos índices de pobreza rural."
    },
    socioeconomic: {
      unemployment: "17.2%",
      publicServices: "Cobertura deficiente.",
      hdi: "0.615",
      nbi: "Total 68.55% | Cabecera 96.36% | Rural 46.36%",
      health: "Puesto de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Presencia de grupos ilegales en corredores rurales."
    }
  },
  "Pedraza": {
    category: "6",
    demographics: {
      total: "7,569",
      gender: { male: 52.4, female: 47.6 },
      ageGroups: [
        { label: "0 a 4", value: 667 }, { label: "5 a 9", value: 810 }, { label: "10 a 14", value: 792 },
        { label: "15 a 19", value: 742 }, { label: "20 a 24", value: 523 }, { label: "25 a 29", value: 455 },
        { label: "30 a 34", value: 446 }, { label: "35 a 39", value: 482 }, { label: "40 a 44", value: 467 },
        { label: "45 a 49", value: 425 }, { label: "50 a 54", value: 377 }, { label: "55 a 59", value: 362 },
        { label: "60 a 64", value: 262 }, { label: "65 a 69", value: 275 }, { label: "70 a 74", value: 173 },
        { label: "75 a 79", value: 128 }, { label: "80 a 84", value: 107 }, { label: "85 y más", value: 76 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio ribereño con retos en servicios básicos."
    },
    socioeconomic: {
      unemployment: "16.5%",
      publicServices: "Cobertura baja.",
      hdi: "0.622",
      nbi: "Total 35.05% | Cabecera 32.57% | Rural 36.21%",
      health: "Puesto de salud.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "Pijiño del Carmen": {
    category: "6",
    demographics: {
      total: "11,071",
      gender: { male: 51.8, female: 48.2 },
      ageGroups: [
        { label: "0 a 4", value: 1180 }, { label: "5 a 9", value: 1306 }, { label: "10 a 14", value: 1357 },
        { label: "15 a 19", value: 1110 }, { label: "20 a 24", value: 855 }, { label: "25 a 29", value: 761 },
        { label: "30 a 34", value: 687 }, { label: "35 a 39", value: 641 }, { label: "40 a 44", value: 589 },
        { label: "45 a 49", value: 593 }, { label: "50 a 54", value: 485 }, { label: "55 a 59", value: 419 },
        { label: "60 a 64", value: 308 }, { label: "65 a 69", value: 266 }, { label: "70 a 74", value: 209 },
        { label: "75 a 79", value: 145 }, { label: "80 a 84", value: 85 }, { label: "85 y más", value: 75 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio con vocación agrícola y pesquera."
    },
    socioeconomic: {
      unemployment: "16.8%",
      publicServices: "Cobertura baja.",
      hdi: "0.618",
      nbi: "Total 48.94% | Cabecera 49.14% | Rural 48.74%",
      health: "Centro de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "Pivijay": {
    category: "4",
    demographics: {
      total: "34,374",
      gender: { male: 51.1, female: 48.9 },
      ageGroups: [
        { label: "0 a 4", value: 2934 }, { label: "5 a 9", value: 3359 }, { label: "10 a 14", value: 3406 },
        { label: "15 a 19", value: 3237 }, { label: "20 a 24", value: 2592 }, { label: "25 a 29", value: 2327 },
        { label: "30 a 34", value: 2198 }, { label: "35 a 39", value: 2004 }, { label: "40 a 44", value: 1967 },
        { label: "45 a 49", value: 2007 }, { label: "50 a 54", value: 1940 }, { label: "55 a 59", value: 1718 },
        { label: "60 a 64", value: 1366 }, { label: "65 a 69", value: 1184 }, { label: "70 a 74", value: 779 },
        { label: "75 a 79", value: 631 }, { label: "80 a 84", value: 370 }, { label: "85 y más", value: 355 }
      ],
      ethnic: "Mestizo.",
      displacement: "Importante centro ganadero del departamento."
    },
    socioeconomic: {
      unemployment: "13.4%",
      publicServices: "Cobertura media.",
      hdi: "0.665",
      nbi: "Total 25.05% | Cabecera 21.14% | Rural 30.74%",
      health: "Hospital local.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto de ganado.",
      armedGroups: "Presencia de grupos armados en zonas rurales."
    }
  },
  "Plato": {
    category: "4",
    demographics: {
      total: "56,210",
      gender: { male: 51.2, female: 48.8 },
      ageGroups: [
        { label: "0 a 4", value: 5231 }, { label: "5 a 9", value: 5852 }, { label: "10 a 14", value: 6159 },
        { label: "15 a 19", value: 5721 }, { label: "20 a 24", value: 4754 }, { label: "25 a 29", value: 4042 },
        { label: "30 a 34", value: 3717 }, { label: "35 a 39", value: 3262 }, { label: "40 a 44", value: 3179 },
        { label: "45 a 49", value: 2952 }, { label: "50 a 54", value: 2685 }, { label: "55 a 59", value: 2324 },
        { label: "60 a 64", value: 1833 }, { label: "65 a 69", value: 1550 }, { label: "70 a 74", value: 1165 },
        { label: "75 a 79", value: 814 }, { label: "80 a 84", value: 552 }, { label: "85 y más", value: 418 }
      ],
      ethnic: "Mestizo.",
      displacement: "Tierra del Hombre Caimán, importante puerto fluvial."
    },
    socioeconomic: {
      unemployment: "13.9%",
      publicServices: "Cobertura media.",
      hdi: "0.672",
      nbi: "Total 37.42% | Cabecera 30.16% | Rural 61.45%",
      health: "Hospital de segundo nivel.",
      urbanRural: { urban: 80, rural: 20 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Extorsión, microtráfico.",
      armedGroups: "Presencia de grupos armados organizados."
    }
  },
  "Puebloviejo": {
    category: "6",
    demographics: {
      total: "26,419",
      gender: { male: 51.1, female: 48.9 },
      ageGroups: [
        { label: "0 a 4", value: 2716 }, { label: "5 a 9", value: 2755 }, { label: "10 a 14", value: 2711 },
        { label: "15 a 19", value: 2801 }, { label: "20 a 24", value: 2507 }, { label: "25 a 29", value: 2051 },
        { label: "30 a 34", value: 1784 }, { label: "35 a 39", value: 1724 }, { label: "40 a 44", value: 1453 },
        { label: "45 a 49", value: 1354 }, { label: "50 a 54", value: 1229 }, { label: "55 a 59", value: 989 },
        { label: "60 a 64", value: 742 }, { label: "65 a 69", value: 627 }, { label: "70 a 74", value: 386 },
        { label: "75 a 79", value: 307 }, { label: "80 a 84", value: 174 }, { label: "85 y más", value: 109 }
      ],
      ethnic: "Mestizo, Afrodescendiente.",
      displacement: "Municipio con alta vulnerabilidad social y ambiental."
    },
    socioeconomic: {
      unemployment: "18.5%",
      publicServices: "Cobertura muy baja.",
      hdi: "0.605",
      nbi: "Total 45.36% | Cabecera 72.74% | Rural 32.20%",
      health: "Puesto de salud.",
      urbanRural: { urban: 90, rural: 10 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Microtráfico, bloqueos de vías.",
      armedGroups: "Bandas criminales locales."
    }
  },
  "Remolino": {
    category: "6",
    demographics: {
      total: "9,555",
      gender: { male: 52.0, female: 48.0 },
      ageGroups: [
        { label: "0 a 4", value: 819 }, { label: "5 a 9", value: 871 }, { label: "10 a 14", value: 919 },
        { label: "15 a 19", value: 870 }, { label: "20 a 24", value: 812 }, { label: "25 a 29", value: 764 },
        { label: "30 a 34", value: 726 }, { label: "35 a 39", value: 643 }, { label: "40 a 44", value: 550 },
        { label: "45 a 49", value: 557 }, { label: "50 a 54", value: 483 }, { label: "55 a 59", value: 403 },
        { label: "60 a 64", value: 318 }, { label: "65 a 69", value: 269 }, { label: "70 a 74", value: 194 },
        { label: "75 a 79", value: 182 }, { label: "80 a 84", value: 104 }, { label: "85 y más", value: 71 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio ribereño con vocación ganadera."
    },
    socioeconomic: {
      unemployment: "15.1%",
      publicServices: "Cobertura baja.",
      hdi: "0.625",
      nbi: "Total 21.16% | Cabecera 20.39% | Rural 22.63%",
      health: "Centro de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "Sabanas de San Ángel": {
    category: "6",
    demographics: {
      total: "14,060",
      gender: { male: 53.7, female: 46.3 },
      ageGroups: [
        { label: "0 a 4", value: 1443 }, { label: "5 a 9", value: 1663 }, { label: "10 a 14", value: 1700 },
        { label: "15 a 19", value: 1446 }, { label: "20 a 24", value: 987 }, { label: "25 a 29", value: 909 },
        { label: "30 a 34", value: 931 }, { label: "35 a 39", value: 841 }, { label: "40 a 44", value: 804 },
        { label: "45 a 49", value: 785 }, { label: "50 a 54", value: 643 }, { label: "55 a 59", value: 535 },
        { label: "60 a 64", value: 398 }, { label: "65 a 69", value: 397 }, { label: "70 a 74", value: 227 },
        { label: "75 a 79", value: 173 }, { label: "80 a 84", value: 107 }, { label: "85 y más", value: 71 }
      ],
      ethnic: "Mestizo.",
      displacement: "Zona con altos niveles de pobreza rural."
    },
    socioeconomic: {
      unemployment: "17.5%",
      publicServices: "Cobertura deficiente.",
      hdi: "0.610",
      nbi: "Total 58.87% | Cabecera 41.70% | Rural 66.95%",
      health: "Puesto de salud.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Hurto, extorsión.",
      armedGroups: "Presencia de grupos armados en zonas rurales."
    }
  },
  "Salamina": {
    category: "6",
    demographics: {
      total: "9,360",
      gender: { male: 50.9, female: 49.1 },
      ageGroups: [
        { label: "0 a 4", value: 729 }, { label: "5 a 9", value: 812 }, { label: "10 a 14", value: 811 },
        { label: "15 a 19", value: 879 }, { label: "20 a 24", value: 740 }, { label: "25 a 29", value: 732 },
        { label: "30 a 34", value: 657 }, { label: "35 a 39", value: 590 }, { label: "40 a 44", value: 547 },
        { label: "45 a 49", value: 602 }, { label: "50 a 54", value: 532 }, { label: "55 a 59", value: 424 },
        { label: "60 a 64", value: 362 }, { label: "65 a 69", value: 306 }, { label: "70 a 74", value: 233 },
        { label: "75 a 79", value: 170 }, { label: "80 a 84", value: 125 }, { label: "85 y más", value: 109 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio ribereño con vocación ganadera."
    },
    socioeconomic: {
      unemployment: "15.3%",
      publicServices: "Cobertura baja.",
      hdi: "0.628",
      nbi: "Total 26.68% | Cabecera 23.21% | Rural 33.82%",
      health: "Centro de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "San Sebastián de Buenavista": {
    category: "6",
    demographics: {
      total: "18,865",
      gender: { male: 51.4, female: 48.6 },
      ageGroups: [
        { label: "0 a 4", value: 1818 }, { label: "5 a 9", value: 1982 }, { label: "10 a 14", value: 2121 },
        { label: "15 a 19", value: 1852 }, { label: "20 a 24", value: 1354 }, { label: "25 a 29", value: 1147 },
        { label: "30 a 34", value: 1148 }, { label: "35 a 39", value: 1080 }, { label: "40 a 44", value: 1090 },
        { label: "45 a 49", value: 966 }, { label: "50 a 54", value: 931 }, { label: "55 a 59", value: 853 },
        { label: "60 a 64", value: 677 }, { label: "65 a 69", value: 608 }, { label: "70 a 74", value: 441 },
        { label: "75 a 79", value: 350 }, { label: "80 a 84", value: 231 }, { label: "85 y más", value: 216 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio con vocación agrícola y pesquera."
    },
    socioeconomic: {
      unemployment: "16.2%",
      publicServices: "Cobertura baja.",
      hdi: "0.620",
      nbi: "Total 42.68% | Cabecera 43.32% | Rural 42.40%",
      health: "Centro de salud.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "San Zenón": {
    category: "6",
    demographics: {
      total: "11,279",
      gender: { male: 51.4, female: 48.6 },
      ageGroups: [
        { label: "0 a 4", value: 1180 }, { label: "5 a 9", value: 1359 }, { label: "10 a 14", value: 1367 },
        { label: "15 a 19", value: 1192 }, { label: "20 a 24", value: 878 }, { label: "25 a 29", value: 702 },
        { label: "30 a 34", value: 686 }, { label: "35 a 39", value: 634 }, { label: "40 a 44", value: 606 },
        { label: "45 a 49", value: 582 }, { label: "50 a 54", value: 500 }, { label: "55 a 59", value: 411 },
        { label: "60 a 64", value: 277 }, { label: "65 a 69", value: 354 }, { label: "70 a 74", value: 199 },
        { label: "75 a 79", value: 165 }, { label: "80 a 84", value: 92 }, { label: "85 y más", value: 95 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio ribereño con vocación agrícola."
    },
    socioeconomic: {
      unemployment: "15.7%",
      publicServices: "Cobertura baja.",
      hdi: "0.624",
      nbi: "Total 27.26% | Cabecera 23.16% | Rural 27.87%",
      health: "Centro de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "Santa Ana": {
    category: "6",
    demographics: {
      total: "22,723",
      gender: { male: 51.9, female: 48.1 },
      ageGroups: [
        { label: "0 a 4", value: 2173 }, { label: "5 a 9", value: 2480 }, { label: "10 a 14", value: 2614 },
        { label: "15 a 19", value: 2276 }, { label: "20 a 24", value: 1836 }, { label: "25 a 29", value: 1522 },
        { label: "30 a 34", value: 1449 }, { label: "35 a 39", value: 1391 }, { label: "40 a 44", value: 1246 },
        { label: "45 a 49", value: 1275 }, { label: "50 a 54", value: 1104 }, { label: "55 a 59", value: 867 },
        { label: "60 a 64", value: 777 }, { label: "65 a 69", value: 610 }, { label: "70 a 74", value: 396 },
        { label: "75 a 79", value: 291 }, { label: "80 a 84", value: 235 }, { label: "85 y más", value: 181 }
      ],
      ethnic: "Mestizo.",
      displacement: "Centro comercial del sur del Magdalena."
    },
    socioeconomic: {
      unemployment: "14.1%",
      publicServices: "Cobertura media.",
      hdi: "0.655",
      nbi: "Total 30.64% | Cabecera 24.35% | Rural 39.06%",
      health: "Hospital local.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Baja-Moderada",
      otherCrimes: "Hurto.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "Santa Bárbara de Pinto": {
    category: "6",
    demographics: {
      total: "9,345",
      gender: { male: 51.5, female: 48.5 },
      ageGroups: [
        { label: "0 a 4", value: 799 }, { label: "5 a 9", value: 1067 }, { label: "10 a 14", value: 1041 },
        { label: "15 a 19", value: 949 }, { label: "20 a 24", value: 693 }, { label: "25 a 29", value: 631 },
        { label: "30 a 34", value: 624 }, { label: "35 a 39", value: 550 }, { label: "40 a 44", value: 553 },
        { label: "45 a 49", value: 548 }, { label: "50 a 54", value: 462 }, { label: "55 a 59", value: 408 },
        { label: "60 a 64", value: 293 }, { label: "65 a 69", value: 248 }, { label: "70 a 74", value: 183 },
        { label: "75 a 79", value: 126 }, { label: "80 a 84", value: 92 }, { label: "85 y más", value: 78 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio ribereño con vocación agrícola."
    },
    socioeconomic: {
      unemployment: "16.4%",
      publicServices: "Cobertura baja.",
      hdi: "0.612",
      nbi: "Total 38.43% | Cabecera 39.00% | Rural 37.45%",
      health: "Centro de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "Sitionuevo": {
    category: "6",
    demographics: {
      total: "25,804",
      gender: { male: 52.0, female: 48.0 },
      ageGroups: [
        { label: "0 a 4", value: 2377 }, { label: "5 a 9", value: 2705 }, { label: "10 a 14", value: 2815 },
        { label: "15 a 19", value: 2612 }, { label: "20 a 24", value: 2327 }, { label: "25 a 29", value: 1954 },
        { label: "30 a 34", value: 1761 }, { label: "35 a 39", value: 1584 }, { label: "40 a 44", value: 1496 },
        { label: "45 a 49", value: 1385 }, { label: "50 a 54", value: 1210 }, { label: "55 a 59", value: 1004 },
        { label: "60 a 64", value: 817 }, { label: "65 a 69", value: 635 }, { label: "70 a 74", value: 457 },
        { label: "75 a 79", value: 325 }, { label: "80 a 84", value: 193 }, { label: "85 y más", value: 147 }
      ],
      ethnic: "Mestizo, Afrodescendiente.",
      displacement: "Municipio portuario y ribereño, vecino de Barranquilla."
    },
    socioeconomic: {
      unemployment: "14.8%",
      publicServices: "Cobertura baja.",
      hdi: "0.642",
      nbi: "Total 48.55% | Cabecera 47.15% | Rural 50.04%",
      health: "Centro de salud.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Moderada",
      otherCrimes: "Microtráfico, extorsión.",
      armedGroups: "Presencia de bandas criminales."
    }
  },
  "Tenerife": {
    category: "6",
    demographics: {
      total: "12,364",
      gender: { male: 53.1, female: 46.9 },
      ageGroups: [
        { label: "0 a 4", value: 1079 }, { label: "5 a 9", value: 1306 }, { label: "10 a 14", value: 1352 },
        { label: "15 a 19", value: 1291 }, { label: "20 a 24", value: 909 }, { label: "25 a 29", value: 840 },
        { label: "30 a 34", value: 764 }, { label: "35 a 39", value: 729 }, { label: "40 a 44", value: 730 },
        { label: "45 a 49", value: 715 }, { label: "50 a 54", value: 629 }, { label: "55 a 59", value: 539 },
        { label: "60 a 64", value: 409 }, { label: "65 a 69", value: 322 }, { label: "70 a 74", value: 276 },
        { label: "75 a 79", value: 226 }, { label: "80 a 84", value: 136 }, { label: "85 y más", value: 112 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio histórico con vocación agrícola."
    },
    socioeconomic: {
      unemployment: "15.9%",
      publicServices: "Cobertura baja.",
      hdi: "0.635",
      nbi: "Total 39.38% | Cabecera 32.33% | Rural 46.72%",
      health: "Centro de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "Zapayán": {
    category: "6",
    demographics: {
      total: "8,606",
      gender: { male: 52.8, female: 47.2 },
      ageGroups: [
        { label: "0 a 4", value: 697 }, { label: "5 a 9", value: 1013 }, { label: "10 a 14", value: 997 },
        { label: "15 a 19", value: 870 }, { label: "20 a 24", value: 702 }, { label: "25 a 29", value: 597 },
        { label: "30 a 34", value: 544 }, { label: "35 a 39", value: 537 }, { label: "40 a 44", value: 503 },
        { label: "45 a 49", value: 499 }, { label: "50 a 54", value: 392 }, { label: "55 a 59", value: 383 },
        { label: "60 a 64", value: 265 }, { label: "65 a 69", value: 228 }, { label: "70 a 74", value: 137 },
        { label: "75 a 79", value: 124 }, { label: "80 a 84", value: 71 }, { label: "85 y más", value: 47 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio ribereño con alta vulnerabilidad."
    },
    socioeconomic: {
      unemployment: "17.1%",
      publicServices: "Cobertura deficiente.",
      hdi: "0.612",
      nbi: "Total 50.14% | Cabecera 55.57% | Rural 46.12%",
      health: "Puesto de salud.",
      urbanRural: { urban: 50, rural: 50 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "Zona Bananera": {
    category: "4",
    demographics: {
      total: "66,802",
      gender: { male: 51.0, female: 49.0 },
      ageGroups: [
        { label: "0 a 4", value: 6824 }, { label: "5 a 9", value: 7455 }, { label: "10 a 14", value: 7570 },
        { label: "15 a 19", value: 7363 }, { label: "20 a 24", value: 6220 }, { label: "25 a 29", value: 5220 },
        { label: "30 a 34", value: 4580 }, { label: "35 a 39", value: 4099 }, { label: "40 a 44", value: 3510 },
        { label: "45 a 49", value: 3247 }, { label: "50 a 54", value: 2890 }, { label: "55 a 59", value: 2398 },
        { label: "60 a 64", value: 1832 }, { label: "65 a 69", value: 1323 }, { label: "70 a 74", value: 879 },
        { label: "75 a 79", value: 637 }, { label: "80 a 84", value: 422 }, { label: "85 y más", value: 333 }
      ],
      ethnic: "Mestizo, Afrodescendiente.",
      displacement: "Corazón de la producción bananera del departamento."
    },
    socioeconomic: {
      unemployment: "14.5%",
      publicServices: "Cobertura media-baja.",
      hdi: "0.652",
      nbi: "Total 28.77% | Cabecera 23.17% | Rural 29.16%",
      health: "Hospital local.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Extorsión, control territorial de bandas.",
      armedGroups: "Presencia de grupos armados organizados."
    }
  },
  "Albania": {
    category: "6",
    demographics: {
      total: "26,940",
      gender: { male: 50.4, female: 49.6 },
      ageGroups: [
        { label: "0 a 4", value: 3157 }, { label: "5 a 9", value: 3228 }, { label: "10 a 14", value: 3014 },
        { label: "15 a 19", value: 3257 }, { label: "20 a 24", value: 2731 }, { label: "25 a 29", value: 2240 },
        { label: "30 a 34", value: 1850 }, { label: "35 a 39", value: 1708 }, { label: "40 a 44", value: 1312 },
        { label: "45 a 49", value: 1208 }, { label: "50 a 54", value: 1042 }, { label: "55 a 59", value: 848 },
        { label: "60 a 64", value: 531 }, { label: "65 a 69", value: 331 }, { label: "70 a 74", value: 213 },
        { label: "75 a 79", value: 119 }, { label: "80 a 84", value: 91 }, { label: "85 y más", value: 60 }
      ],
      ethnic: "Wayúu, Mestizo.",
      displacement: "Municipio minero con retos de seguridad ligados a la porosidad fronteriza."
    },
    socioeconomic: {
      unemployment: "18.5%",
      publicServices: "Cobertura baja.",
      hdi: "0.625",
      nbi: "Total 38.14% | Cabecera 16.04% | Rural 66.92%",
      health: "Centro de salud.",
      urbanRural: { urban: 45, rural: 55 }
    },
    security: {
      homicideRate: "Media",
      otherCrimes: "Delincuencia organizada.",
      armedGroups: "Presencia de grupos armados ilegales."
    }
  },
  "Barrancas": {
    category: "6",
    demographics: {
      total: "28,549",
      gender: { male: 49.5, female: 50.5 },
      ageGroups: [
        { label: "0 a 4", value: 3184 }, { label: "5 a 9", value: 2934 }, { label: "10 a 14", value: 2902 },
        { label: "15 a 19", value: 3068 }, { label: "20 a 24", value: 2917 }, { label: "25 a 29", value: 2342 },
        { label: "30 a 34", value: 2007 }, { label: "35 a 39", value: 2011 }, { label: "40 a 44", value: 1502 },
        { label: "45 a 49", value: 1359 }, { label: "50 a 54", value: 1112 }, { label: "55 a 59", value: 971 },
        { label: "60 a 64", value: 723 }, { label: "65 a 69", value: 546 }, { label: "70 a 74", value: 335 },
        { label: "75 a 79", value: 274 }, { label: "80 a 84", value: 170 }, { label: "85 y más", value: 192 }
      ],
      ethnic: "Wayúu, Mestizo.",
      displacement: "Municipio minero con retos de seguridad significativos."
    },
    socioeconomic: {
      unemployment: "17.2%",
      publicServices: "Cobertura media-baja.",
      hdi: "0.638",
      nbi: "Total 40.61% | Cabecera 32.18% | Rural 50.87%",
      health: "Hospital local.",
      urbanRural: { urban: 55, rural: 45 }
    },
    security: {
      homicideRate: "Media",
      otherCrimes: "Delincuencia organizada.",
      armedGroups: "Presencia de grupos armados ilegales."
    }
  },
  "Dibulla": {
    category: "6",
    demographics: {
      total: "36,196",
      gender: { male: 51.1, female: 48.9 },
      ageGroups: [
        { label: "0 a 4", value: 4554 }, { label: "5 a 9", value: 4949 }, { label: "10 a 14", value: 4471 },
        { label: "15 a 19", value: 3865 }, { label: "20 a 24", value: 3173 }, { label: "25 a 29", value: 2872 },
        { label: "30 a 34", value: 2383 }, { label: "35 a 39", value: 2151 }, { label: "40 a 44", value: 1789 },
        { label: "45 a 49", value: 1562 }, { label: "50 a 54", value: 1226 }, { label: "55 a 59", value: 1048 },
        { label: "60 a 64", value: 771 }, { label: "65 a 69", value: 555 }, { label: "70 a 74", value: 343 },
        { label: "75 a 79", value: 229 }, { label: "80 a 84", value: 120 }, { label: "85 y más", value: 135 }
      ],
      ethnic: "Wayúu, Afrodescendiente, Mestizo.",
      displacement: "Municipio costero con retos de seguridad ligados al narcotráfico."
    },
    socioeconomic: {
      unemployment: "19.8%",
      publicServices: "Cobertura baja.",
      hdi: "0.602",
      nbi: "Total 55.42% | Cabecera 33.78% | Rural 58.52%",
      health: "Centro de salud.",
      urbanRural: { urban: 35, rural: 65 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Narcotráfico, extorsión.",
      armedGroups: "Presencia de grupos armados ilegales."
    }
  },
  "Distracción": {
    category: "6",
    demographics: {
      total: "11,934",
      gender: { male: 50.8, female: 49.2 },
      ageGroups: [
        { label: "0 a 4", value: 1156 }, { label: "5 a 9", value: 1330 }, { label: "10 a 14", value: 1212 },
        { label: "15 a 19", value: 1259 }, { label: "20 a 24", value: 1103 }, { label: "25 a 29", value: 1027 },
        { label: "30 a 34", value: 917 }, { label: "35 a 39", value: 830 }, { label: "40 a 44", value: 614 },
        { label: "45 a 49", value: 535 }, { label: "50 a 54", value: 472 }, { label: "55 a 59", value: 422 },
        { label: "60 a 64", value: 333 }, { label: "65 a 69", value: 250 }, { label: "70 a 74", value: 166 },
        { label: "75 a 79", value: 148 }, { label: "80 a 84", value: 73 }, { label: "85 y más", value: 87 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio con vocación agropecuaria."
    },
    socioeconomic: {
      unemployment: "15.4%",
      publicServices: "Cobertura media-baja.",
      hdi: "0.645",
      nbi: "Total 25.03% | Cabecera 21.36% | Rural 28.34%",
      health: "Centro de salud.",
      urbanRural: { urban: 60, rural: 40 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "El Molino": {
    category: "6",
    demographics: {
      total: "6,963",
      gender: { male: 50.2, female: 49.8 },
      ageGroups: [
        { label: "0 a 4", value: 511 }, { label: "5 a 9", value: 600 }, { label: "10 a 14", value: 623 },
        { label: "15 a 19", value: 609 }, { label: "20 a 24", value: 586 }, { label: "25 a 29", value: 544 },
        { label: "30 a 34", value: 527 }, { label: "35 a 39", value: 513 }, { label: "40 a 44", value: 395 },
        { label: "45 a 49", value: 391 }, { label: "50 a 54", value: 376 }, { label: "55 a 59", value: 357 },
        { label: "60 a 64", value: 286 }, { label: "65 a 69", value: 232 }, { label: "70 a 74", value: 138 },
        { label: "75 a 79", value: 114 }, { label: "80 a 84", value: 79 }, { label: "85 y más", value: 82 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio con vocación agropecuaria."
    },
    socioeconomic: {
      unemployment: "14.2%",
      publicServices: "Cobertura media.",
      hdi: "0.658",
      nbi: "Total 26.64% | Cabecera 23.57% | Rural 54.00%",
      health: "Centro de salud.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "Fonseca": {
    category: "6",
    demographics: {
      total: "40,852",
      gender: { male: 49.2, female: 50.8 },
      ageGroups: [
        { label: "0 a 4", value: 4226 }, { label: "5 a 9", value: 4217 }, { label: "10 a 14", value: 4019 },
        { label: "15 a 19", value: 3896 }, { label: "20 a 24", value: 3612 }, { label: "25 a 29", value: 3647 },
        { label: "30 a 34", value: 3128 }, { label: "35 a 39", value: 2844 }, { label: "40 a 44", value: 2091 },
        { label: "45 a 49", value: 2007 }, { label: "50 a 54", value: 1808 }, { label: "55 a 59", value: 1590 },
        { label: "60 a 64", value: 1309 }, { label: "65 a 69", value: 875 }, { label: "70 a 74", value: 592 },
        { label: "75 a 79", value: 431 }, { label: "80 a 84", value: 251 }, { label: "85 y más", value: 309 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio con vocación agropecuaria y retos de seguridad."
    },
    socioeconomic: {
      unemployment: "16.1%",
      publicServices: "Cobertura media.",
      hdi: "0.665",
      nbi: "Total 19.43% | Cabecera 18.08% | Rural 27.47%",
      health: "Hospital local.",
      urbanRural: { urban: 80, rural: 20 }
    },
    security: {
      homicideRate: "Media",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Presencia de grupos armados ilegales."
    }
  },
  "Hatonuevo": {
    category: "6",
    demographics: {
      total: "17,672",
      gender: { male: 49.7, female: 50.3 },
      ageGroups: [
        { label: "0 a 4", value: 1927 }, { label: "5 a 9", value: 1971 }, { label: "10 a 14", value: 1950 },
        { label: "15 a 19", value: 1916 }, { label: "20 a 24", value: 1854 }, { label: "25 a 29", value: 1509 },
        { label: "30 a 34", value: 1390 }, { label: "35 a 39", value: 1123 }, { label: "40 a 44", value: 975 },
        { label: "45 a 49", value: 778 }, { label: "50 a 54", value: 673 }, { label: "55 a 59", value: 546 },
        { label: "60 a 64", value: 391 }, { label: "65 a 69", value: 240 }, { label: "70 a 74", value: 157 },
        { label: "75 a 79", value: 123 }, { label: "80 a 84", value: 81 }, { label: "85 y más", value: 68 }
      ],
      ethnic: "Wayúu, Mestizo.",
      displacement: "Municipio minero con retos de seguridad."
    },
    socioeconomic: {
      unemployment: "17.8%",
      publicServices: "Cobertura media-baja.",
      hdi: "0.632",
      nbi: "Total 30.05% | Cabecera 21.25% | Rural 45.16%",
      health: "Centro de salud.",
      urbanRural: { urban: 65, rural: 35 }
    },
    security: {
      homicideRate: "Media",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Presencia de grupos armados ilegales."
    }
  },
  "La Jagua del Pilar": {
    category: "6",
    demographics: {
      total: "2,952",
      gender: { male: 52.5, female: 47.5 },
      ageGroups: [
        { label: "0 a 4", value: 274 }, { label: "5 a 9", value: 285 }, { label: "10 a 14", value: 337 },
        { label: "15 a 19", value: 303 }, { label: "20 a 24", value: 253 }, { label: "25 a 29", value: 244 },
        { label: "30 a 34", value: 197 }, { label: "35 a 39", value: 186 }, { label: "40 a 44", value: 161 },
        { label: "45 a 49", value: 162 }, { label: "50 a 54", value: 154 }, { label: "55 a 59", value: 117 },
        { label: "60 a 64", value: 78 }, { label: "65 a 69", value: 65 }, { label: "70 a 74", value: 39 },
        { label: "75 a 79", value: 39 }, { label: "80 a 84", value: 29 }, { label: "85 y más", value: 29 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio con vocación agropecuaria."
    },
    socioeconomic: {
      unemployment: "13.5%",
      publicServices: "Cobertura media.",
      hdi: "0.672",
      nbi: "Total 27.78% | Cabecera 19.96% | Rural 42.97%",
      health: "Centro de salud.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "Maicao": {
    category: "2",
    demographics: {
      total: "159,223",
      gender: { male: 48.4, female: 51.6 },
      ageGroups: [
        { label: "0 a 4", value: 19027 }, { label: "5 a 9", value: 18789 }, { label: "10 a 14", value: 16908 },
        { label: "15 a 19", value: 16977 }, { label: "20 a 24", value: 15252 }, { label: "25 a 29", value: 13193 },
        { label: "30 a 34", value: 11428 }, { label: "35 a 39", value: 10066 }, { label: "40 a 44", value: 8230 },
        { label: "45 a 49", value: 6882 }, { label: "50 a 54", value: 6205 }, { label: "55 a 59", value: 5347 },
        { label: "60 a 64", value: 3788 }, { label: "65 a 69", value: 2779 }, { label: "70 a 74", value: 1741 },
        { label: "75 a 79", value: 1266 }, { label: "80 a 84", value: 707 }, { label: "85 y más", value: 638 }
      ],
      ethnic: "Wayúu, Árabe, Mestizo.",
      displacement: "Ciudad fronteriza con dinámicas complejas de seguridad y migración."
    },
    socioeconomic: {
      unemployment: "22.4%",
      publicServices: "Cobertura media-baja.",
      hdi: "0.685",
      nbi: "Total 59.22% | Cabecera 45.08% | Rural 81.24%",
      health: "Hospital de segundo nivel.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Contrabando, tráfico de personas, bandas criminales.",
      armedGroups: "Presencia de grupos armados ilegales."
    }
  },
  "Manaure": {
    category: "6",
    demographics: {
      total: "74,528",
      gender: { male: 48.9, female: 51.1 },
      ageGroups: [
        { label: "0 a 4", value: 11783 }, { label: "5 a 9", value: 11083 }, { label: "10 a 14", value: 9611 },
        { label: "15 a 19", value: 8485 }, { label: "20 a 24", value: 6621 }, { label: "25 a 29", value: 4880 },
        { label: "30 a 34", value: 4622 }, { label: "35 a 39", value: 4038 }, { label: "40 a 44", value: 3231 },
        { label: "45 a 49", value: 2526 }, { label: "50 a 54", value: 1995 }, { label: "55 a 59", value: 1750 },
        { label: "60 a 64", value: 1008 }, { label: "65 a 69", value: 1032 }, { label: "70 a 74", value: 811 },
        { label: "75 a 79", value: 529 }, { label: "80 a 84", value: 266 }, { label: "85 y más", value: 257 }
      ],
      ethnic: "Wayúu (Mayoría), Mestizo.",
      displacement: "Zonas con alta dispersión rural y retos críticos en salud."
    },
    socioeconomic: {
      unemployment: "25.1%",
      publicServices: "Cobertura muy baja.",
      hdi: "0.582",
      nbi: "Total 81.10% | Cabecera 85.00% | Rural 80.63%",
      health: "Centro de salud con retos de acceso.",
      urbanRural: { urban: 25, rural: 75 }
    },
    security: {
      homicideRate: "Media",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Presencia de grupos armados en zonas rurales."
    }
  },
  "Riohacha": {
    category: "1",
    demographics: {
      total: "177,573",
      gender: { male: 48.9, female: 51.1 },
      ageGroups: [
        { label: "0 a 4", value: 20456 }, { label: "5 a 9", value: 20231 }, { label: "10 a 14", value: 18438 },
        { label: "15 a 19", value: 17906 }, { label: "20 a 24", value: 16823 }, { label: "25 a 29", value: 15035 },
        { label: "30 a 34", value: 13352 }, { label: "35 a 39", value: 12170 }, { label: "40 a 44", value: 9315 },
        { label: "45 a 49", value: 8165 }, { label: "50 a 54", value: 7092 }, { label: "55 a 59", value: 6076 },
        { label: "60 a 64", value: 4541 }, { label: "65 a 69", value: 2986 }, { label: "70 a 74", value: 2027 },
        { label: "75 a 79", value: 1352 }, { label: "80 a 84", value: 856 }, { label: "85 y más", value: 752 }
      ],
      ethnic: "Mestizo, Wayúu, Afrodescendiente.",
      displacement: "Capital con incrementos preocupantes en inseguridad urbana."
    },
    socioeconomic: {
      unemployment: "20.5%",
      publicServices: "Cobertura media.",
      hdi: "0.712",
      nbi: "Total 36.27% | Cabecera 21.92% | Rural 67.34%",
      health: "Hospital de tercer nivel.",
      urbanRural: { urban: 80, rural: 20 }
    },
    security: {
      homicideRate: "Alta",
      otherCrimes: "Inseguridad urbana, microtráfico.",
      armedGroups: "Presencia de bandas criminales."
    }
  },
  "San Juan del Cesar": {
    category: "6",
    demographics: {
      total: "46,077",
      gender: { male: 49.4, female: 50.6 },
      ageGroups: [
        { label: "0 a 4", value: 4095 }, { label: "5 a 9", value: 4351 }, { label: "10 a 14", value: 4446 },
        { label: "15 a 19", value: 4406 }, { label: "20 a 24", value: 4027 }, { label: "25 a 29", value: 3792 },
        { label: "30 a 34", value: 3236 }, { label: "35 a 39", value: 3061 }, { label: "40 a 44", value: 2496 },
        { label: "45 a 49", value: 2505 }, { label: "50 a 54", value: 2293 }, { label: "55 a 59", value: 2120 },
        { label: "60 a 64", value: 1694 }, { label: "65 a 69", value: 1176 }, { label: "70 a 74", value: 830 },
        { label: "75 a 79", value: 661 }, { label: "80 a 84", value: 425 }, { label: "85 y más", value: 463 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio con vocación agropecuaria y retos de seguridad."
    },
    socioeconomic: {
      unemployment: "15.8%",
      publicServices: "Cobertura media.",
      hdi: "0.682",
      nbi: "Total 24.24% | Cabecera 17.04% | Rural 37.71%",
      health: "Hospital local.",
      urbanRural: { urban: 75, rural: 25 }
    },
    security: {
      homicideRate: "Media",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Presencia de grupos armados ilegales."
    }
  },
  "Uribia": {
    category: "6",
    demographics: {
      total: "160,711",
      gender: { male: 48.3, female: 51.7 },
      ageGroups: [
        { label: "0 a 4", value: 20012 }, { label: "5 a 9", value: 21619 }, { label: "10 a 14", value: 19185 },
        { label: "15 a 19", value: 18187 }, { label: "20 a 24", value: 15525 }, { label: "25 a 29", value: 12125 },
        { label: "30 a 34", value: 11187 }, { label: "35 a 39", value: 9025 }, { label: "40 a 44", value: 7690 },
        { label: "45 a 49", value: 5852 }, { label: "50 a 54", value: 4924 }, { label: "55 a 59", value: 4716 },
        { label: "60 a 64", value: 2556 }, { label: "65 a 69", value: 2766 }, { label: "70 a 74", value: 1948 },
        { label: "75 a 79", value: 1541 }, { label: "80 a 84", value: 854 }, { label: "85 y más", value: 999 }
      ],
      ethnic: "Wayúu (Mayoría absoluta).",
      displacement: "Capital indígena de Colombia con retos extremos en agua y alimentación."
    },
    socioeconomic: {
      unemployment: "28.4%",
      publicServices: "Cobertura crítica (muy baja).",
      hdi: "0.565",
      nbi: "Total 88.75% | Cabecera 71.50% | Rural 89.54%",
      health: "Centro de salud con retos de acceso.",
      urbanRural: { urban: 15, rural: 85 }
    },
    security: {
      homicideRate: "Media",
      otherCrimes: "Delincuencia común, conflictos territoriales.",
      armedGroups: "Presencia de grupos armados ilegales."
    }
  },
  "Urumita": {
    category: "6",
    demographics: {
      total: "10,198",
      gender: { male: 49.5, female: 50.5 },
      ageGroups: [
        { label: "0 a 4", value: 867 }, { label: "5 a 9", value: 874 }, { label: "10 a 14", value: 911 },
        { label: "15 a 19", value: 1010 }, { label: "20 a 24", value: 846 }, { label: "25 a 29", value: 794 },
        { label: "30 a 34", value: 687 }, { label: "35 a 39", value: 651 }, { label: "40 a 44", value: 571 },
        { label: "45 a 49", value: 598 }, { label: "50 a 54", value: 552 }, { label: "55 a 59", value: 532 },
        { label: "60 a 64", value: 398 }, { label: "65 a 69", value: 326 }, { label: "70 a 74", value: 197 },
        { label: "75 a 79", value: 152 }, { label: "80 a 84", value: 103 }, { label: "85 y más", value: 129 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio con vocación agropecuaria."
    },
    socioeconomic: {
      unemployment: "14.5%",
      publicServices: "Cobertura media.",
      hdi: "0.662",
      nbi: "Total 24.96% | Cabecera 20.25% | Rural 72.68%",
      health: "Centro de salud.",
      urbanRural: { urban: 70, rural: 30 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
  "Villanueva (La Guajira)": {
    category: "6",
    demographics: {
      total: "24,996",
      gender: { male: 48.9, female: 51.1 },
      ageGroups: [
        { label: "0 a 4", value: 2235 }, { label: "5 a 9", value: 2357 }, { label: "10 a 14", value: 2520 },
        { label: "15 a 19", value: 2281 }, { label: "20 a 24", value: 2103 }, { label: "25 a 29", value: 1956 },
        { label: "30 a 34", value: 1717 }, { label: "35 a 39", value: 1706 }, { label: "40 a 44", value: 1287 },
        { label: "45 a 49", value: 1326 }, { label: "50 a 54", value: 1275 }, { label: "55 a 59", value: 1150 },
        { label: "60 a 64", value: 949 }, { label: "65 a 69", value: 725 }, { label: "70 a 74", value: 489 },
        { label: "75 a 79", value: 374 }, { label: "80 a 84", value: 235 }, { label: "85 y más", value: 311 }
      ],
      ethnic: "Mestizo.",
      displacement: "Municipio con fuerte identidad cultural y vocación agropecuaria."
    },
    socioeconomic: {
      unemployment: "15.2%",
      publicServices: "Cobertura media.",
      hdi: "0.692",
      nbi: "Total 18.60% | Cabecera 17.54% | Rural 41.77%",
      health: "Hospital local.",
      urbanRural: { urban: 85, rural: 15 }
    },
    security: {
      homicideRate: "Baja",
      otherCrimes: "Delincuencia común.",
      armedGroups: "Sin presencia significativa reportada."
    }
  },
};

export const VOTING_DATA: Record<string, { camara2026: string; senado2026: string; camara2022: string; parties?: { party: string; votes: number }[] }> = {
  "Medellín": { 
    camara2026: "295,629", 
    senado2026: "322,924", 
    camara2022: "210314",
    parties: [
      { party: "Centro Democrático", votes: 325704 },
      { party: "Pacto Histórico", votes: 167215 },
      { party: "Creemos", votes: 106265 },
      { party: "Alianza por Colombia", votes: 49972 },
      { party: "Partido Conservador", votes: 45578 },
      { party: "Partido Liberal", votes: 40316 },
      { party: "Salvación Nacional", votes: 31324 },
      { party: "Partido de la U", votes: 13167 }
    ]
  },
  "Montería": {
    camara2026: "112,450",
    senado2026: "108,920",
    camara2022: "85,600",
    parties: [
      { party: "Partido de la U", votes: 31695 },
      { party: "Partido Conservador", votes: 20695 },
      { party: "Pacto Histórico", votes: 15140 },
      { party: "Partido Liberal", votes: 11980 },
      { party: "Cambio Radical", votes: 11110 },
      { party: "Frente Amplio Unitario", votes: 5660 },
      { party: "Alianza por Colombia", votes: 5010 },
      { party: "Centro Democrático", votes: 3158 }
    ]
  },
  "Cereté": {
    camara2026: "28,400",
    senado2026: "26,900",
    camara2022: "22,100",
    parties: [
      { party: "Partido de la U", votes: 7827 },
      { party: "Partido Conservador", votes: 5113 },
      { party: "Pacto Histórico", votes: 3741 },
      { party: "Partido Liberal", votes: 2959 },
      { party: "Cambio Radical", votes: 2743 },
      { party: "Frente Amplio Unitario", votes: 1398 },
      { party: "Alianza por Colombia", votes: 1237 },
      { party: "Centro Democrático", votes: 780 }
    ]
  },
  "Tierralta": {
    camara2026: "32,500",
    senado2026: "30,200",
    camara2022: "25,400",
    parties: [
      { party: "Partido de la U", votes: 8788 },
      { party: "Partido Conservador", votes: 5741 },
      { party: "Pacto Histórico", votes: 4200 },
      { party: "Partido Liberal", votes: 3318 },
      { party: "Cambio Radical", votes: 3083 },
      { party: "Frente Amplio Unitario", votes: 1570 },
      { party: "Alianza por Colombia", votes: 1389 },
      { party: "Centro Democrático", votes: 875 }
    ]
  },
  "Valencia": {
    camara2026: "14,200",
    senado2026: "13,500",
    camara2022: "11,200",
    parties: [
      { party: "Partido de la U", votes: 3928 },
      { party: "Partido Conservador", votes: 2566 },
      { party: "Pacto Histórico", votes: 1877 },
      { party: "Partido Liberal", votes: 1483 },
      { party: "Cambio Radical", votes: 1378 },
      { party: "Frente Amplio Unitario", votes: 702 },
      { party: "Alianza por Colombia", votes: 621 },
      { party: "Centro Democrático", votes: 391 }
    ]
  },
  "Lorica": {
    camara2026: "45,600",
    senado2026: "43,200",
    camara2022: "38,400",
    parties: [
      { party: "Partido de la U", votes: 12558 },
      { party: "Partido Conservador", votes: 8212 },
      { party: "Pacto Histórico", votes: 6009 },
      { party: "Partido Liberal", votes: 4747 },
      { party: "Cambio Radical", votes: 4410 },
      { party: "Frente Amplio Unitario", votes: 2246 },
      { party: "Alianza por Colombia", votes: 1987 },
      { party: "Centro Democrático", votes: 1252 }
    ]
  },
  "Cartagena": {
    camara2026: "412,500",
    senado2026: "435,200",
    camara2022: "385,400",
    parties: [
      { party: "Partido de la U", votes: 126512 },
      { party: "Partido Conservador", votes: 82731 },
      { party: "Pacto Histórico", votes: 60536 },
      { party: "Partido Liberal", votes: 47828 },
      { party: "Cambio Radical", votes: 44433 },
      { party: "Frente Amplio Unitario", votes: 22760 },
      { party: "Alianza por Colombia", votes: 20062 },
      { party: "Centro Democrático", votes: 12490 }
    ]
  },
  "Magangué": {
    camara2026: "58,400",
    senado2026: "56,200",
    camara2022: "52,100",
    parties: [
      { party: "Partido de la U", votes: 16337 },
      { party: "Partido Conservador", votes: 10683 },
      { party: "Pacto Histórico", votes: 7817 },
      { party: "Partido Liberal", votes: 6176 },
      { party: "Cambio Radical", votes: 5738 },
      { party: "Frente Amplio Unitario", votes: 2939 },
      { party: "Alianza por Colombia", votes: 2590 },
      { party: "Centro Democrático", votes: 1612 }
    ]
  },
  "Turbaco": {
    camara2026: "42,500",
    senado2026: "40,800",
    camara2022: "36,400",
    parties: [
      { party: "Partido de la U", votes: 11860 },
      { party: "Partido Conservador", votes: 7756 },
      { party: "Pacto Histórico", votes: 5675 },
      { party: "Partido Liberal", votes: 4483 },
      { party: "Cambio Radical", votes: 4165 },
      { party: "Frente Amplio Unitario", votes: 2133 },
      { party: "Alianza por Colombia", votes: 1880 },
      { party: "Centro Democrático", votes: 1170 }
    ]
  },
  "El Carmen de Bolívar": {
    camara2026: "35,600",
    senado2026: "34,200",
    camara2022: "31,400",
    parties: [
      { party: "Partido de la U", votes: 9941 },
      { party: "Partido Conservador", votes: 6501 },
      { party: "Pacto Histórico", votes: 4757 },
      { party: "Partido Liberal", votes: 3758 },
      { party: "Cambio Radical", votes: 3491 },
      { party: "Frente Amplio Unitario", votes: 1788 },
      { party: "Alianza por Colombia", votes: 1576 },
      { party: "Centro Democrático", votes: 981 }
    ]
  },
  "Valledupar": {
    camara2026: "Proyección: Alta participación.",
    senado2026: "Enfoque en desarrollo regional.",
    camara2022: "Resultados 2022: Diversidad partidista.",
    parties: [
      { party: "Pacto Histórico", votes: 45000 },
      { party: "Partido Conservador", votes: 38000 },
      { party: "Partido Liberal", votes: 32000 },
      { party: "Cambio Radical", votes: 28000 }
    ]
  },
  "Aguachica": {
    camara2026: "Proyección: Crecimiento de sectores alternativos.",
    senado2026: "Prioridad en infraestructura vial.",
    camara2022: "Resultados 2022: Fuerte presencia liberal.",
    parties: [
      { party: "Partido Liberal", votes: 12000 },
      { party: "Pacto Histórico", votes: 10500 },
      { party: "Partido Conservador", votes: 8000 }
    ]
  },
  "Agustín Codazzi": {
    camara2026: "Proyección: Estabilidad de partidos tradicionales.",
    senado2026: "Enfoque en sector agropecuario.",
    camara2022: "Resultados 2022: Predominio conservador.",
    parties: [
      { party: "Partido Conservador", votes: 9500 },
      { party: "Partido Liberal", votes: 7200 },
      { party: "Pacto Histórico", votes: 6800 }
    ]
  },
  "Bosconia": {
    camara2026: "Proyección: Influencia de sectores comerciales.",
    senado2026: "Enfoque en logística y transporte.",
    camara2022: "Resultados 2022: Voto fragmentado.",
    parties: [
      { party: "Cambio Radical", votes: 5200 },
      { party: "Partido Liberal", votes: 4800 },
      { party: "Pacto Histórico", votes: 4500 }
    ]
  },
  "La Jagua De Ibirico": {
    camara2026: "Proyección: Voto influenciado por sector minero.",
    senado2026: "Enfoque en regalías y medio ambiente.",
    camara2022: "Resultados 2022: Fuerte presencia de la U.",
    parties: [
      { party: "Partido de la U", votes: 6500 },
      { party: "Pacto Histórico", votes: 5800 },
      { party: "Partido Conservador", votes: 4200 }
    ]
  },
  "Chiriguaná": {
    camara2026: "Proyección: Reivindicaciones sociales.",
    senado2026: "Enfoque en salud y empleo.",
    camara2022: "Resultados 2022: Apoyo a sectores alternativos.",
    parties: [
      { party: "Pacto Histórico", votes: 4800 },
      { party: "Partido Liberal", votes: 3900 },
      { party: "Partido Conservador", votes: 3200 }
    ]
  },
  "El Copey": {
    camara2026: "Proyección: Recuperación de confianza institucional.",
    senado2026: "Enfoque en seguridad y paz.",
    camara2022: "Resultados 2022: Voto tradicional.",
    parties: [
      { party: "Partido Conservador", votes: 4100 },
      { party: "Partido Liberal", votes: 3800 },
      { party: "Centro Democrático", votes: 2500 }
    ]
  },
  "Curumaní": {
    camara2026: "Proyección: Fortalecimiento de bases sociales.",
    senado2026: "Enfoque en restitución de tierras.",
    camara2022: "Resultados 2022: Voto por el cambio.",
    parties: [
      { party: "Pacto Histórico", votes: 5200 },
      { party: "Partido Liberal", votes: 4100 },
      { party: "Partido de la U", votes: 3500 }
    ]
  },
  "San Alberto": {
    camara2026: "Proyección: Voto por estabilidad económica.",
    senado2026: "Enfoque en agroindustria de palma.",
    camara2022: "Resultados 2022: Predominio de centroderecha.",
    parties: [
      { party: "Centro Democrático", votes: 3800 },
      { party: "Partido Conservador", votes: 3500 },
      { party: "Partido Liberal", votes: 2900 }
    ]
  },
  "Pueblo Bello": {
    camara2026: "Proyección: Voto étnico y ambiental.",
    senado2026: "Enfoque en protección de la Sierra Nevada.",
    camara2022: "Resultados 2022: Fuerte voto indígena.",
    parties: [
      { party: "MAIS", votes: 4200 },
      { party: "Pacto Histórico", votes: 3500 },
      { party: "Partido Conservador", votes: 1800 }
    ]
  },
  "Sahagún": {
    camara2026: "42,300",
    senado2026: "40,100",
    camara2022: "35,200",
    parties: [
      { party: "Partido de la U", votes: 11657 },
      { party: "Partido Conservador", votes: 7623 },
      { party: "Pacto Histórico", votes: 5577 },
      { party: "Partido Liberal", votes: 4407 },
      { party: "Cambio Radical", votes: 4094 },
      { party: "Frente Amplio Unitario", votes: 2085 },
      { party: "Alianza por Colombia", votes: 1844 },
      { party: "Centro Democrático", votes: 1162 }
    ]
  },
  "Montelíbano": {
    camara2026: "32,400",
    senado2026: "30,800",
    camara2022: "26,500",
    parties: [
      { party: "Partido de la U", votes: 8953 },
      { party: "Partido Conservador", votes: 5855 },
      { party: "Pacto Histórico", votes: 4284 },
      { party: "Partido Liberal", votes: 3384 },
      { party: "Cambio Radical", votes: 3144 },
      { party: "Frente Amplio Unitario", votes: 1601 },
      { party: "Alianza por Colombia", votes: 1416 },
      { party: "Centro Democrático", votes: 893 }
    ]
  },
  "Planeta Rica": {
    camara2026: "24,500",
    senado2026: "23,200",
    camara2022: "20,100",
    parties: [
      { party: "Partido de la U", votes: 6744 },
      { party: "Partido Conservador", votes: 4410 },
      { party: "Pacto Histórico", votes: 3227 },
      { party: "Partido Liberal", votes: 2549 },
      { party: "Cambio Radical", votes: 2368 },
      { party: "Frente Amplio Unitario", votes: 1206 },
      { party: "Alianza por Colombia", votes: 1067 },
      { party: "Centro Democrático", votes: 672 }
    ]
  },
  "San Antero": {
    camara2026: "12,400",
    senado2026: "11,800",
    camara2022: "10,200",
    parties: [
      { party: "Partido de la U", votes: 3430 },
      { party: "Partido Conservador", votes: 2243 },
      { party: "Pacto Histórico", votes: 1641 },
      { party: "Partido Liberal", votes: 1297 },
      { party: "Cambio Radical", votes: 1205 },
      { party: "Frente Amplio Unitario", votes: 617 },
      { party: "Alianza por Colombia", votes: 544 },
      { party: "Centro Democrático", votes: 342 }
    ]
  },
  "Ayapel": {
    camara2026: "18,400",
    senado2026: "17,500",
    camara2022: "15,200",
    parties: [
      { party: "Partido de la U", votes: 5087 },
      { party: "Partido Conservador", votes: 3327 },
      { party: "Pacto Histórico", votes: 2434 },
      { party: "Partido Liberal", votes: 1923 },
      { party: "Cambio Radical", votes: 1787 },
      { party: "Frente Amplio Unitario", votes: 915 },
      { party: "Alianza por Colombia", votes: 807 },
      { party: "Centro Democrático", votes: 508 }
    ]
  },
  "Chinú": {
    camara2026: "16,500",
    senado2026: "15,800",
    camara2022: "14,100",
    parties: [
      { party: "Partido de la U", votes: 4593 },
      { party: "Partido Conservador", votes: 3004 },
      { party: "Pacto Histórico", votes: 2198 },
      { party: "Partido Liberal", votes: 1736 },
      { party: "Cambio Radical", votes: 1613 },
      { party: "Frente Amplio Unitario", votes: 826 },
      { party: "Alianza por Colombia", votes: 728 },
      { party: "Centro Democrático", votes: 458 }
    ]
  },
  "Ciénaga de Oro": {
    camara2026: "22,400",
    senado2026: "21,200",
    camara2022: "18,500",
    parties: [
      { party: "Partido de la U", votes: 6163 },
      { party: "Partido Conservador", votes: 4030 },
      { party: "Pacto Histórico", votes: 2949 },
      { party: "Partido Liberal", votes: 2330 },
      { party: "Cambio Radical", votes: 2165 },
      { party: "Frente Amplio Unitario", votes: 1109 },
      { party: "Alianza por Colombia", votes: 977 },
      { party: "Centro Democrático", votes: 615 }
    ]
  },
  "San Andrés de Sotavento": {
    camara2026: "16,800",
    senado2026: "15,900",
    camara2022: "14,200",
    parties: [
      { party: "Partido de la U", votes: 4622 },
      { party: "Partido Conservador", votes: 3023 },
      { party: "Pacto Histórico", votes: 2212 },
      { party: "Partido Liberal", votes: 1747 },
      { party: "Cambio Radical", votes: 1623 },
      { party: "Frente Amplio Unitario", votes: 832 },
      { party: "Alianza por Colombia", votes: 733 },
      { party: "Centro Democrático", votes: 461 }
    ]
  },
  "Puerto Libertador": {
    camara2026: "18,200",
    senado2026: "17,300",
    camara2022: "15,100",
    parties: [
      { party: "Partido de la U", votes: 5029 },
      { party: "Partido Conservador", votes: 3289 },
      { party: "Pacto Histórico", votes: 2406 },
      { party: "Partido Liberal", votes: 1901 },
      { party: "Cambio Radical", votes: 1766 },
      { party: "Frente Amplio Unitario", votes: 905 },
      { party: "Alianza por Colombia", votes: 798 },
      { party: "Centro Democrático", votes: 502 }
    ]
  },
  "San Pelayo": {
    camara2026: "15,400",
    senado2026: "14,600",
    camara2022: "13,200",
    parties: [
      { party: "Partido de la U", votes: 4244 },
      { party: "Partido Conservador", votes: 2775 },
      { party: "Pacto Histórico", votes: 2031 },
      { party: "Partido Liberal", votes: 1605 },
      { party: "Cambio Radical", votes: 1491 },
      { party: "Frente Amplio Unitario", votes: 764 },
      { party: "Alianza por Colombia", votes: 673 },
      { party: "Centro Democrático", votes: 423 }
    ]
  },
  "Puerto Escondido": {
    camara2026: "10,200",
    senado2026: "9,700",
    camara2022: "8,500",
    parties: [
      { party: "Partido de la U", votes: 2820 },
      { party: "Partido Conservador", votes: 1844 },
      { party: "Pacto Histórico", votes: 1349 },
      { party: "Partido Liberal", votes: 1066 },
      { party: "Cambio Radical", votes: 990 },
      { party: "Frente Amplio Unitario", votes: 507 },
      { party: "Alianza por Colombia", votes: 447 },
      { party: "Centro Democrático", votes: 281 }
    ]
  },
  "Moñitos": {
    camara2026: "9,400",
    senado2026: "8,900",
    camara2022: "7,800",
    parties: [
      { party: "Partido de la U", votes: 2587 },
      { party: "Partido Conservador", votes: 1692 },
      { party: "Pacto Histórico", votes: 1238 },
      { party: "Partido Liberal", votes: 978 },
      { party: "Cambio Radical", votes: 909 },
      { party: "Frente Amplio Unitario", votes: 465 },
      { party: "Alianza por Colombia", votes: 410 },
      { party: "Centro Democrático", votes: 258 }
    ]
  },
  "Pueblo Nuevo": {
    camara2026: "14,500",
    senado2026: "13,800",
    camara2022: "12,100",
    parties: [
      { party: "Partido de la U", votes: 4012 },
      { party: "Partido Conservador", votes: 2623 },
      { party: "Pacto Histórico", votes: 1920 },
      { party: "Partido Liberal", votes: 1517 },
      { party: "Cambio Radical", votes: 1409 },
      { party: "Frente Amplio Unitario", votes: 722 },
      { party: "Alianza por Colombia", votes: 636 },
      { party: "Centro Democrático", votes: 401 }
    ]
  },
  "San Bernardo del Viento": {
    camara2026: "12,100",
    senado2026: "11,500",
    camara2022: "10,100",
    parties: [
      { party: "Partido de la U", votes: 3343 },
      { party: "Partido Conservador", votes: 2186 },
      { party: "Pacto Histórico", votes: 1600 },
      { party: "Partido Liberal", votes: 1264 },
      { party: "Cambio Radical", votes: 1174 },
      { party: "Frente Amplio Unitario", votes: 601 },
      { party: "Alianza por Colombia", votes: 530 },
      { party: "Centro Democrático", votes: 334 }
    ]
  },
  "Purísima": {
    camara2026: "6,400",
    senado2026: "6,100",
    camara2022: "5,400",
    parties: [
      { party: "Partido de la U", votes: 1773 },
      { party: "Partido Conservador", votes: 1160 },
      { party: "Pacto Histórico", votes: 849 },
      { party: "Partido Liberal", votes: 671 },
      { party: "Cambio Radical", votes: 623 },
      { party: "Frente Amplio Unitario", votes: 319 },
      { party: "Alianza por Colombia", votes: 281 },
      { party: "Centro Democrático", votes: 177 }
    ]
  },
  "Chimá": {
    camara2026: "5,800",
    senado2026: "5,500",
    camara2022: "4,800",
    parties: [
      { party: "Partido de la U", votes: 1599 },
      { party: "Partido Conservador", votes: 1046 },
      { party: "Pacto Histórico", votes: 765 },
      { party: "Partido Liberal", votes: 605 },
      { party: "Cambio Radical", votes: 562 },
      { party: "Frente Amplio Unitario", votes: 288 },
      { party: "Alianza por Colombia", votes: 254 },
      { party: "Centro Democrático", votes: 160 }
    ]
  },
  "Momil": {
    camara2026: "5,400",
    senado2026: "5,100",
    camara2022: "4,500",
    parties: [
      { party: "Partido de la U", votes: 1483 },
      { party: "Partido Conservador", votes: 970 },
      { party: "Pacto Histórico", votes: 709 },
      { party: "Partido Liberal", votes: 561 },
      { party: "Cambio Radical", votes: 521 },
      { party: "Frente Amplio Unitario", votes: 267 },
      { party: "Alianza por Colombia", votes: 235 },
      { party: "Centro Democrático", votes: 148 }
    ]
  },
  "Cotorra": {
    camara2026: "5,200",
    senado2026: "4,900",
    camara2022: "4,300",
    parties: [
      { party: "Partido de la U", votes: 1424 },
      { party: "Partido Conservador", votes: 931 },
      { party: "Pacto Histórico", votes: 682 },
      { party: "Partido Liberal", votes: 539 },
      { party: "Cambio Radical", votes: 500 },
      { party: "Frente Amplio Unitario", votes: 256 },
      { party: "Alianza por Colombia", votes: 226 },
      { party: "Centro Democrático", votes: 142 }
    ]
  },
  "Canalete": {
    camara2026: "7,800",
    senado2026: "7,400",
    camara2022: "6,500",
    parties: [
      { party: "Partido de la U", votes: 2151 },
      { party: "Partido Conservador", votes: 1407 },
      { party: "Pacto Histórico", votes: 1029 },
      { party: "Partido Liberal", votes: 813 },
      { party: "Cambio Radical", votes: 756 },
      { party: "Frente Amplio Unitario", votes: 387 },
      { party: "Alianza por Colombia", votes: 341 },
      { party: "Centro Democrático", votes: 215 }
    ]
  },
  "Los Córdobas": {
    camara2026: "8,400",
    senado2026: "8,000",
    camara2022: "7,000",
    parties: [
      { party: "Partido de la U", votes: 2326 },
      { party: "Partido Conservador", votes: 1521 },
      { party: "Pacto Histórico", votes: 1113 },
      { party: "Partido Liberal", votes: 879 },
      { party: "Cambio Radical", votes: 817 },
      { party: "Frente Amplio Unitario", votes: 418 },
      { party: "Alianza por Colombia", votes: 369 },
      { party: "Centro Democrático", votes: 232 }
    ]
  },
  "San Carlos (Córdoba)": {
    camara2026: "9,800",
    senado2026: "9,300",
    camara2022: "8,200",
    parties: [
      { party: "Partido de la U", votes: 2704 },
      { party: "Partido Conservador", votes: 1768 },
      { party: "Pacto Histórico", votes: 1294 },
      { party: "Partido Liberal", votes: 1022 },
      { party: "Cambio Radical", votes: 950 },
      { party: "Frente Amplio Unitario", votes: 486 },
      { party: "Alianza por Colombia", votes: 429 },
      { party: "Centro Democrático", votes: 270 }
    ]
  },
  "Buenavista": {
    camara2026: "7,500",
    senado2026: "7,100",
    camara2022: "6,200",
    parties: [
      { party: "Partido de la U", votes: 2064 },
      { party: "Partido Conservador", votes: 1350 },
      { party: "Pacto Histórico", votes: 987 },
      { party: "Partido Liberal", votes: 780 },
      { party: "Cambio Radical", votes: 725 },
      { party: "Frente Amplio Unitario", votes: 371 },
      { party: "Alianza por Colombia", votes: 327 },
      { party: "Centro Democrático", votes: 206 }
    ]
  },
  "La Apartada": {
    camara2026: "5,200",
    senado2026: "4,900",
    camara2022: "4,300",
    parties: [
      { party: "Partido de la U", votes: 1424 },
      { party: "Partido Conservador", votes: 931 },
      { party: "Pacto Histórico", votes: 682 },
      { party: "Partido Liberal", votes: 539 },
      { party: "Cambio Radical", votes: 500 },
      { party: "Frente Amplio Unitario", votes: 256 },
      { party: "Alianza por Colombia", votes: 226 },
      { party: "Centro Democrático", votes: 142 }
    ]
  },
  "San José de Uré": {
    camara2026: "4,200",
    senado2026: "4,000",
    camara2022: "3,500",
    parties: [
      { party: "Partido de la U", votes: 1163 },
      { party: "Partido Conservador", votes: 760 },
      { party: "Pacto Histórico", votes: 556 },
      { party: "Partido Liberal", votes: 440 },
      { party: "Cambio Radical", votes: 408 },
      { party: "Frente Amplio Unitario", votes: 209 },
      { party: "Alianza por Colombia", votes: 184 },
      { party: "Centro Democrático", votes: 116 }
    ]
  },
  "Tuchín": {
    camara2026: "15,200",
    senado2026: "14,500",
    camara2022: "12,800",
    parties: [
      { party: "Partido de la U", votes: 4215 },
      { party: "Partido Conservador", votes: 2756 },
      { party: "Pacto Histórico", votes: 2017 },
      { party: "Partido Liberal", votes: 1594 },
      { party: "Cambio Radical", votes: 1480 },
      { party: "Frente Amplio Unitario", votes: 758 },
      { party: "Alianza por Colombia", votes: 668 },
      { party: "Centro Democrático", votes: 421 }
    ]
  },
  "Sincelejo": {
    camara2026: "125,400",
    senado2026: "120,200",
    camara2022: "110,500",
    parties: [
      { party: "Partido Liberal", votes: 35400 },
      { party: "Partido Conservador", votes: 28200 },
      { party: "Pacto Histórico", votes: 25600 },
      { party: "Partido de la U", votes: 15400 },
      { party: "Centro Democrático", votes: 8500 }
    ]
  },
  "Buenavista (Sucre)": {
    camara2026: "5,400",
    senado2026: "5,100",
    camara2022: "4,800",
    parties: [
      { party: "Partido Liberal", votes: 1800 },
      { party: "Partido Conservador", votes: 1500 },
      { party: "Partido de la U", votes: 1200 }
    ]
  },
  "Caimito": {
    camara2026: "7,200",
    senado2026: "6,800",
    camara2022: "6,400",
    parties: [
      { party: "Partido Liberal", votes: 2400 },
      { party: "Partido de la U", votes: 2100 },
      { party: "Partido Conservador", votes: 1500 }
    ]
  },
  "Colosó": {
    camara2026: "4,200",
    senado2026: "4,000",
    camara2022: "3,800",
    parties: [
      { party: "Partido Liberal", votes: 1500 },
      { party: "Pacto Histórico", votes: 1200 },
      { party: "Partido de la U", votes: 800 }
    ]
  },
  "Corozal": {
    camara2026: "32,400",
    senado2026: "30,800",
    camara2022: "28,500",
    parties: [
      { party: "Partido Liberal", votes: 9500 },
      { party: "Partido Conservador", votes: 8200 },
      { party: "Pacto Histórico", votes: 6400 },
      { party: "Partido de la U", votes: 4500 }
    ]
  },
  "Coveñas": {
    camara2026: "8,500",
    senado2026: "8,100",
    camara2022: "7,600",
    parties: [
      { party: "Partido Liberal", votes: 2800 },
      { party: "Partido Conservador", votes: 2200 },
      { party: "Centro Democrático", votes: 1500 }
    ]
  },
  "Chalán": {
    camara2026: "2,400",
    senado2026: "2,200",
    camara2022: "2,100",
    parties: [
      { party: "Partido Liberal", votes: 800 },
      { party: "Pacto Histórico", votes: 700 },
      { party: "Partido de la U", votes: 500 }
    ]
  },
  "El Roble": {
    camara2026: "5,200",
    senado2026: "4,900",
    camara2022: "4,600",
    parties: [
      { party: "Partido Liberal", votes: 1800 },
      { party: "Partido de la U", votes: 1500 },
      { party: "Partido Conservador", votes: 1100 }
    ]
  },
  "Galeras": {
    camara2026: "10,800",
    senado2026: "10,200",
    camara2022: "9,600",
    parties: [
      { party: "Partido Liberal", votes: 3500 },
      { party: "Partido Conservador", votes: 3100 },
      { party: "Partido de la U", votes: 2200 }
    ]
  },
  "Guaranda": {
    camara2026: "8,400",
    senado2026: "7,900",
    camara2022: "7,500",
    parties: [
      { party: "Partido Liberal", votes: 2800 },
      { party: "Partido de la U", votes: 2400 },
      { party: "Pacto Histórico", votes: 1500 }
    ]
  },
  "La Unión (Sucre)": {
    camara2026: "6,200",
    senado2026: "5,800",
    camara2022: "5,500",
    parties: [
      { party: "Partido Liberal", votes: 2100 },
      { party: "Partido Conservador", votes: 1800 },
      { party: "Partido de la U", votes: 1200 }
    ]
  },
  "Los Palmitos": {
    camara2026: "11,500",
    senado2026: "10,900",
    camara2022: "10,200",
    parties: [
      { party: "Partido Liberal", votes: 3800 },
      { party: "Partido Conservador", votes: 3200 },
      { party: "Pacto Histórico", votes: 2100 }
    ]
  },
  "Majagual": {
    camara2026: "17,200",
    senado2026: "16,300",
    camara2022: "15,400",
    parties: [
      { party: "Partido Liberal", votes: 5400 },
      { party: "Partido de la U", votes: 4800 },
      { party: "Pacto Histórico", votes: 3200 }
    ]
  },
  "Morroa": {
    camara2026: "7,800",
    senado2026: "7,400",
    camara2022: "7,000",
    parties: [
      { party: "Partido Liberal", votes: 2500 },
      { party: "Partido Conservador", votes: 2100 },
      { party: "Partido de la U", votes: 1600 }
    ]
  },
  "Ovejas": {
    camara2026: "12,400",
    senado2026: "11,700",
    camara2022: "11,100",
    parties: [
      { party: "Partido Liberal", votes: 4100 },
      { party: "Pacto Histórico", votes: 3500 },
      { party: "Partido Conservador", votes: 2400 }
    ]
  },
  "Palmito": {
    camara2026: "6,800",
    senado2026: "6,400",
    camara2022: "6,100",
    parties: [
      { party: "Partido Liberal", votes: 2100 },
      { party: "Partido de la U", votes: 1800 },
      { party: "Pacto Histórico", votes: 1200 }
    ]
  },
  "Sampués": {
    camara2026: "24,500",
    senado2026: "23,200",
    camara2022: "21,800",
    parties: [
      { party: "Partido Liberal", votes: 7500 },
      { party: "Partido Conservador", votes: 6200 },
      { party: "Pacto Histórico", votes: 4500 }
    ]
  },
  "San Benito Abad": {
    camara2026: "14,200",
    senado2026: "13,500",
    camara2022: "12,800",
    parties: [
      { party: "Partido Liberal", votes: 4500 },
      { party: "Partido de la U", votes: 3800 },
      { party: "Partido Conservador", votes: 2400 }
    ]
  },
  "San Juan de Betulia": {
    camara2026: "7,400",
    senado2026: "7,000",
    camara2022: "6,600",
    parties: [
      { party: "Partido Liberal", votes: 2400 },
      { party: "Partido Conservador", votes: 2100 },
      { party: "Partido de la U", votes: 1500 }
    ]
  },
  "San Marcos": {
    camara2026: "28,400",
    senado2026: "26,900",
    camara2022: "25,200",
    parties: [
      { party: "Partido Liberal", votes: 8500 },
      { party: "Partido Conservador", votes: 7200 },
      { party: "Partido de la U", votes: 5400 }
    ]
  },
  "San Onofre": {
    camara2026: "25,600",
    senado2026: "24,200",
    camara2022: "22,800",
    parties: [
      { party: "Partido Liberal", votes: 7800 },
      { party: "Pacto Histórico", votes: 6500 },
      { party: "Partido de la U", votes: 4200 }
    ]
  },
  "San Pedro (Sucre)": {
    camara2026: "9,800",
    senado2026: "9,300",
    camara2022: "8,800",
    parties: [
      { party: "Partido Liberal", votes: 3100 },
      { party: "Partido Conservador", votes: 2800 },
      { party: "Partido de la U", votes: 1800 }
    ]
  },
  "San Luis de Sincé": {
    camara2026: "16,400",
    senado2026: "15,500",
    camara2022: "14,800",
    parties: [
      { party: "Partido Liberal", votes: 5200 },
      { party: "Partido Conservador", votes: 4500 },
      { party: "Partido de la U", votes: 3200 }
    ]
  },
  "Sucre (Sucre)": {
    camara2026: "12,800",
    senado2026: "12,100",
    camara2022: "11,500",
    parties: [
      { party: "Partido Liberal", votes: 4100 },
      { party: "Partido de la U", votes: 3500 },
      { party: "Pacto Histórico", votes: 2400 }
    ]
  },
  "Santiago de Tolú": {
    camara2026: "17,500",
    senado2026: "16,600",
    camara2022: "15,800",
    parties: [
      { party: "Partido Liberal", votes: 5400 },
      { party: "Partido Conservador", votes: 4200 },
      { party: "Centro Democrático", votes: 2800 }
    ]
  },
  "Tolú Viejo": {
    camara2026: "10,500",
    senado2026: "9,900",
    camara2022: "9,400",
    parties: [
      { party: "Partido Liberal", votes: 3200 },
      { party: "Partido Conservador", votes: 2800 },
      { party: "Partido de la U", votes: 1800 }
    ]
  },
  "Abejorral": { 
    camara2026: "2,820", 
    senado2026: "2,555", 
    camara2022: "1194",
    parties: [
      { party: "Centro Democrático", votes: 2554 },
      { party: "Partido Conservador", votes: 1224 },
      { party: "Pacto Histórico", votes: 348 },
      { party: "Partido Liberal", votes: 265 },
      { party: "Partido de la U", votes: 96 }
    ]
  },
  "Abriaquí": { 
    camara2026: "137", 
    senado2026: "117", 
    camara2022: "115",
    parties: [
      { party: "Partido Conservador", votes: 794 },
      { party: "Centro Democrático", votes: 117 },
      { party: "Pacto Histórico", votes: 27 },
      { party: "Partido Liberal", votes: 11 },
      { party: "Partido de la U", votes: 6 }
    ]
  },
  "Alejandría": { 
    camara2026: "503", 
    senado2026: "495", 
    camara2022: "432",
    parties: [
      { party: "Partido Liberal", votes: 523 },
      { party: "Centro Democrático", votes: 495 },
      { party: "Partido Conservador", votes: 259 },
      { party: "Partido de la U", votes: 139 },
      { party: "Pacto Histórico", votes: 116 }
    ]
  },
  "Amagá": { 
    camara2026: "2,570", 
    senado2026: "1,822", 
    camara2022: "1388",
    parties: [
      { party: "Centro Democrático", votes: 1824 },
      { party: "Pacto Histórico", votes: 1783 },
      { party: "Partido Liberal", votes: 1443 },
      { party: "Partido Conservador", votes: 1028 },
      { party: "Partido de la U", votes: 836 }
    ]
  },
  "Amalfi": { 
    camara2026: "871", 
    senado2026: "871", 
    camara2022: "346",
    parties: [
      { party: "Centro Democrático", votes: 867 },
      { party: "Partido Liberal", votes: 723 },
      { party: "Partido Conservador", votes: 524 },
      { party: "Partido de la U", votes: 487 },
      { party: "Pacto Histórico", votes: 457 }
    ]
  },
  "Andes": { 
    camara2026: "5.881", 
    senado2026: "2,695", 
    camara2022: "3539",
    parties: [
      { party: "Partido de la U", votes: 4463 },
      { party: "Centro Democrático", votes: 2696 },
      { party: "Partido Conservador", votes: 2509 },
      { party: "Pacto Histórico", votes: 1122 },
      { party: "Partido Liberal", votes: 285 }
    ]
  },
  "Angelópolis": { 
    camara2026: "303", 
    senado2026: "241", 
    camara2022: "196",
    parties: [
      { party: "Partido Liberal", votes: 1425 },
      { party: "Partido Conservador", votes: 580 },
      { party: "Centro Democrático", votes: 240 },
      { party: "Pacto Histórico", votes: 174 },
      { party: "Partido de la U", votes: 27 }
    ]
  },
  "Angostura": { 
    camara2026: "624", 
    senado2026: "489", 
    camara2022: "526",
    parties: [
      { party: "Centro Democrático", votes: 488 },
      { party: "Partido Conservador", votes: 507 },
      { party: "Partido Liberal", votes: 444 },
      { party: "Pacto Histórico", votes: 190 },
      { party: "Partido de la U", votes: 19 }
    ]
  },
  "Anorí": { 
    camara2026: "430", 
    senado2026: "320", 
    camara2022: "116",
    parties: [
      { party: "Partido Conservador", votes: 729 },
      { party: "Partido Liberal", votes: 655 },
      { party: "Pacto Histórico", votes: 406 },
      { party: "Centro Democrático", votes: 334 },
      { party: "Partido de la U", votes: 71 }
    ]
  },
  "Santa Fe de Antioquia": { 
    camara2026: "2.393", 
    senado2026: "2,167", 
    camara2022: "1306",
    parties: [
      { party: "Partido Liberal", votes: 2954 },
      { party: "Centro Democrático", votes: 2173 },
      { party: "Partido Conservador", votes: 1401 },
      { party: "Pacto Histórico", votes: 1076 },
      { party: "Partido de la U", votes: 97 }
    ]
  },
  "Anzá": { 
    camara2026: "611", 
    senado2026: "500", 
    camara2022: "631",
    parties: [
      { party: "Partido Liberal", votes: 546 },
      { party: "Centro Democrático", votes: 498 },
      { party: "Partido de la U", votes: 179 },
      { party: "Partido Conservador", votes: 173 },
      { party: "Pacto Histórico", votes: 124 }
    ]
  },
  "Apartadó": { 
    camara2026: "4,950", 
    senado2026: "4,775", 
    camara2022: "2626",
    parties: [
      { party: "Pacto Histórico", votes: 14120 },
      { party: "Centro Democrático", votes: 5048 },
      { party: "Partido de la U", votes: 3119 },
      { party: "Fuerza Ciudadana", votes: 230 }
    ]
  },
  "Arboletes": { 
    camara2026: "1,714", 
    senado2026: "659", 
    camara2022: "791",
    parties: [
      { party: "Partido de la U", votes: 3395 },
      { party: "Pacto Histórico", votes: 1181 },
      { party: "Centro Democrático", votes: 659 },
      { party: "Fuerza Ciudadana", votes: 40 }
    ]
  },
  "Argelia": { 
    camara2026: "1,214", 
    senado2026: "1,101", 
    camara2022: "819",
    parties: [
      { party: "Centro Democrático", votes: 1169 },
      { party: "Partido de la U", votes: 174 },
      { party: "Pacto Histórico", votes: 132 }
    ]
  },
  "Armenia": { 
    camara2026: "411", 
    senado2026: "376", 
    camara2022: "123",
    parties: [
      { party: "Centro Democrático", votes: 376 },
      { party: "Pacto Histórico", votes: 177 },
      { party: "Partido de la U", votes: 162 }
    ]
  },
  "Barbosa": { 
    camara2026: "4,094", 
    senado2026: "3,828", 
    camara2022: "1954",
    parties: [
      { party: "Centro Democrático", votes: 3772 },
      { party: "Pacto Histórico", votes: 3261 },
      { party: "Partido de la U", votes: 578 },
      { party: "Fuerza Ciudadana", votes: 47 }
    ]
  },
  "Bello": { 
    camara2026: "60,453", 
    senado2026: "49,710", 
    camara2022: "32919",
    parties: [
      { party: "Centro Democrático", votes: 49874 },
      { party: "Pacto Histórico", votes: 32504 },
      { party: "Partido de la U", votes: 3827 },
      { party: "Fuerza Ciudadana", votes: 619 }
    ]
  },
  "Belmira": { 
    camara2026: "412", 
    senado2026: "406", 
    camara2022: "156",
    parties: [
      { party: "Centro Democrático", votes: 439 },
      { party: "Pacto Histórico", votes: 114 },
      { party: "Partido de la U", votes: 6 }
    ]
  },
  "Betania": { 
    camara2026: "471", 
    senado2026: "415", 
    camara2022: "154",
    parties: [
      { party: "Centro Democrático", votes: 432 },
      { party: "Partido de la U", votes: 401 },
      { party: "Pacto Histórico", votes: 131 }
    ]
  },
  "Betulia": { 
    camara2026: "2,519", 
    senado2026: "1,802", 
    camara2022: "646",
    parties: [
      { party: "Centro Democrático", votes: 1798 },
      { party: "Pacto Histórico", votes: 205 },
      { party: "Partido de la U", votes: 92 },
      { party: "Fuerza Ciudadana", votes: 26 }
    ]
  },
  "Ciudad Bolívar": { 
    camara2026: "4,785", 
    senado2026: "4,314", 
    camara2022: "3638",
    parties: [
      { party: "Centro Democrático", votes: 4394 },
      { party: "Pacto Histórico", votes: 688 },
      { party: "Partido de la U", votes: 202 },
      { party: "Fuerza Ciudadana", votes: 15 }
    ]
  },
  "Briceño": { 
    camara2026: "210", 
    senado2026: "153", 
    camara2022: "44",
    parties: [
      { party: "Centro Democrático", votes: 153 },
      { party: "Pacto Histórico", votes: 120 },
      { party: "Partido de la U", votes: 10 }
    ]
  },
  "Buriticá": { 
    camara2026: "178", 
    senado2026: "180", 
    camara2022: "104",
    parties: [
      { party: "Pacto Histórico", votes: 240 },
      { party: "Centro Democrático", votes: 185 },
      { party: "Partido de la U", votes: 16 },
      { party: "Fuerza Ciudadana", votes: 8 }
    ]
  },
  "Cáceres": { 
    camara2026: "525", 
    senado2026: "264", 
    camara2022: "190",
    parties: [
      { party: "Pacto Histórico", votes: 1086 },
      { party: "Centro Democrático", votes: 293 },
      { party: "Fuerza Ciudadana", votes: 28 }
    ]
  },
  "Caicedo": { 
    camara2026: "1,152", 
    senado2026: "809", 
    camara2022: "645",
    parties: [
      { party: "Centro Democrático", votes: 412 },
      { party: "Pacto Histórico", votes: 266 }
    ]
  },
  "Caldas": { 
    camara2026: "7,118", 
    senado2026: "7,541", 
    camara2022: "3557",
    parties: [
      { party: "Centro Democrático", votes: 778 },
      { party: "Pacto Histórico", votes: 272 },
      { party: "Fuerza Ciudadana", votes: 59 }
    ]
  },
  "Campamento": { 
    camara2026: "151", 
    senado2026: "183", 
    camara2022: "37",
    parties: [
      { party: "Centro Democrático", votes: 159 },
      { party: "Pacto Histórico", votes: 177 }
    ]
  },
  "Cañasgordas": { 
    camara2026: "1,189", 
    senado2026: "999", 
    camara2022: "311",
    parties: [
      { party: "Centro Democrático", votes: 2629 },
      { party: "Pacto Histórico", votes: 9805 },
      { party: "Partido de la U", votes: 5476 }
    ]
  },
  "Caracolí": { 
    camara2026: "451", 
    senado2026: "337", 
    camara2022: "87",
    parties: [
      { party: "Centro Democrático", votes: 388 },
      { party: "Pacto Histórico", votes: 124 },
      { party: "Partido de la U", votes: 52 }
    ]
  },
  "Caramanta": { 
    camara2026: "461", 
    senado2026: "507", 
    camara2022: "302",
    parties: [
      { party: "Centro Democrático", votes: 2227 },
      { party: "Pacto Histórico", votes: 615 },
      { party: "Partido de la U", votes: 276 }
    ]
  },
  "Envigado": {
    camara2026: "57,328",
    senado2026: "57,328",
    camara2022: "26500",
    parties: [
      { party: "Centro Democrático", votes: 57328 },
      { party: "Partido Liberal", votes: 13424 },
      { party: "Pacto Histórico", votes: 13472 },
      { party: "Partido Conservador", votes: 7617 }
    ]
  },
  "Itagüí": {
    camara2026: "33,829",
    senado2026: "33,829",
    camara2022: "15000",
    parties: [
      { party: "Centro Democrático", votes: 33829 },
      { party: "Partido Conservador", votes: 23121 },
      { party: "Pacto Histórico", votes: 20371 },
      { party: "Partido Liberal", votes: 5034 }
    ]
  },
  "Rionegro": {
    camara2026: "33,225",
    senado2026: "33,225",
    camara2022: "12000",
    parties: [
      { party: "Centro Democrático", votes: 33225 },
      { party: "Pacto Histórico", votes: 9307 },
      { party: "Partido Conservador", votes: 4247 },
      { party: "Partido Liberal", votes: 1715 }
    ]
  },
  "Turbo": {
    camara2026: "9,805",
    senado2026: "9,805",
    camara2022: "4500",
    parties: [
      { party: "Pacto Histórico", votes: 9805 },
      { party: "Partido de la U", votes: 5476 },
      { party: "Centro Democrático", votes: 2629 }
    ]
  },
  "Caucasia": {
    camara2026: "8,123",
    senado2026: "8,123",
    camara2022: "3800",
    parties: [
      { party: "Pacto Histórico", votes: 8123 },
      { party: "Partido Liberal", votes: 3520 },
      { party: "Centro Democrático", votes: 2869 },
      { party: "Partido Conservador", votes: 2584 }
    ]
  },
  "Carepa": { 
    camara2026: "3,134", 
    senado2026: "2,410", 
    camara2022: "1163",
    parties: [
      { party: "Pacto Histórico", votes: 1250 },
      { party: "Centro Democrático", votes: 850 },
      { party: "Partido de la U", votes: 600 },
      { party: "Partido Liberal", votes: 434 }
    ]
  },
  "El Carmen de Viboral": { 
    camara2026: "6,486", 
    senado2026: "7,709", 
    camara2022: "1720",
    parties: [
      { party: "Centro Democrático", votes: 3200 },
      { party: "Partido Conservador", votes: 1500 },
      { party: "Pacto Histórico", votes: 986 },
      { party: "Alianza Verde", votes: 800 }
    ]
  },
  "Carolina del Príncipe": { 
    camara2026: "560", 
    senado2026: "571", 
    camara2022: "212",
    parties: [
      { party: "Centro Democrático", votes: 280 },
      { party: "Partido Conservador", votes: 150 },
      { party: "Partido Liberal", votes: 130 }
    ]
  },
  "Chigorodó": { 
    camara2026: "3,219", 
    senado2026: "2,373", 
    camara2022: "1356",
    parties: [
      { party: "Pacto Histórico", votes: 1500 },
      { party: "Partido de la U", votes: 800 },
      { party: "Centro Democrático", votes: 600 },
      { party: "Partido Liberal", votes: 319 }
    ]
  },
  "Cisneros": { 
    camara2026: "457", 
    senado2026: "762", 
    camara2022: "126",
    parties: [
      { party: "Centro Democrático", votes: 350 },
      { party: "Partido Conservador", votes: 200 },
      { party: "Partido Liberal", votes: 100 },
      { party: "Pacto Histórico", votes: 112 }
    ]
  },
  "Cocorná": { 
    camara2026: "2,301", 
    senado2026: "1,849", 
    camara2022: "807",
    parties: [
      { party: "Centro Democrático", votes: 1200 },
      { party: "Partido Conservador", votes: 600 },
      { party: "Pacto Histórico", votes: 300 },
      { party: "Partido Liberal", votes: 201 }
    ]
  },
  "Concepción": { 
    camara2026: "1,295", 
    senado2026: "1,113", 
    camara2022: "422",
    parties: [
      { party: "Centro Democrático", votes: 650 },
      { party: "Partido Conservador", votes: 350 },
      { party: "Partido Liberal", votes: 295 }
    ]
  },
  "Concordia": { 
    camara2026: "1,992", 
    senado2026: "1,942", 
    camara2022: "895",
    parties: [
      { party: "Centro Democrático", votes: 950 },
      { party: "Partido Conservador", votes: 500 },
      { party: "Pacto Histórico", votes: 300 },
      { party: "Partido Liberal", votes: 242 }
    ]
  },
  "Copacabana": { 
    camara2026: "8,803", 
    senado2026: "8,395", 
    camara2022: "4358",
    parties: [
      { party: "Centro Democrático", votes: 4200 },
      { party: "Pacto Histórico", votes: 2100 },
      { party: "Partido Conservador", votes: 1500 },
      { party: "Partido Liberal", votes: 1003 }
    ]
  },
  "Dabeiba": { 
    camara2026: "598", 
    senado2026: "585", 
    camara2022: "326",
    parties: [
      { party: "Pacto Histórico", votes: 250 },
      { party: "Centro Democrático", votes: 150 },
      { party: "Partido de la U", votes: 100 },
      { party: "Partido Liberal", votes: 98 }
    ]
  },
  "Donmatías": { 
    camara2026: "N/A", 
    senado2026: "3,598", 
    camara2022: "1680",
    parties: [
      { party: "Centro Democrático", votes: 2100 },
      { party: "Partido Conservador", votes: 800 },
      { party: "Pacto Histórico", votes: 400 },
      { party: "Partido Liberal", votes: 298 }
    ]
  },
  "Ebéjico": { 
    camara2026: "1,659", 
    senado2026: "1,638", 
    camara2022: "1382",
    parties: [
      { party: "Centro Democrático", votes: 800 },
      { party: "Partido Conservador", votes: 450 },
      { party: "Partido Liberal", votes: 250 },
      { party: "Pacto Histórico", votes: 159 }
    ]
  },
  "El Bagre": { 
    camara2026: "2,340", 
    senado2026: "1,055", 
    camara2022: "359",
    parties: [
      { party: "Pacto Histórico", votes: 1400 },
      { party: "Partido Liberal", votes: 500 },
      { party: "Centro Democrático", votes: 300 },
      { party: "Partido de la U", votes: 140 }
    ]
  },
  "Entrerríos": { 
    camara2026: "1,275", 
    senado2026: "1,267", 
    camara2022: "2212",
    parties: [
      { party: "Centro Democrático", votes: 750 },
      { party: "Partido Conservador", votes: 300 },
      { party: "Pacto Histórico", votes: 150 },
      { party: "Partido Liberal", votes: 75 }
    ]
  },
  "Fredonia": { 
    camara2026: "1,914", 
    senado2026: "1,772", 
    camara2022: "624",
    parties: [
      { party: "Centro Democrático", votes: 900 },
      { party: "Partido Conservador", votes: 500 },
      { party: "Pacto Histórico", votes: 300 },
      { party: "Partido Liberal", votes: 214 }
    ]
  },
  "Frontino": { 
    camara2026: "1,162", 
    senado2026: "916", 
    camara2022: "537",
    parties: [
      { party: "Centro Democrático", votes: 500 },
      { party: "Pacto Histórico", votes: 350 },
      { party: "Partido Conservador", votes: 200 },
      { party: "Partido Liberal", votes: 112 }
    ]
  },
  "Giraldo": { 
    camara2026: "910", 
    senado2026: "593", 
    camara2022: "163",
    parties: [
      { party: "Centro Democrático", votes: 450 },
      { party: "Partido Conservador", votes: 250 },
      { party: "Partido Liberal", votes: 150 },
      { party: "Pacto Histórico", votes: 60 }
    ]
  },
  "Girardota": { 
    camara2026: "5,791", 
    senado2026: "5,574", 
    camara2022: "1742",
    parties: [
      { party: "Centro Democrático", votes: 2800 },
      { party: "Pacto Histórico", votes: 1400 },
      { party: "Partido Conservador", votes: 900 },
      { party: "Partido Liberal", votes: 691 }
    ]
  },
  "Gómez Plata": { 
    camara2026: "1,435", 
    senado2026: "1,164", 
    camara2022: "394",
    parties: [
      { party: "Centro Democrático", votes: 700 },
      { party: "Partido Conservador", votes: 400 },
      { party: "Partido Liberal", votes: 200 },
      { party: "Pacto Histórico", votes: 135 }
    ]
  },
  "Granada": { 
    camara2026: "1,362", 
    senado2026: "1,119", 
    camara2022: "351",
    parties: [
      { party: "Centro Democrático", votes: 800 },
      { party: "Partido Conservador", votes: 300 },
      { party: "Pacto Histórico", votes: 150 },
      { party: "Partido Liberal", votes: 112 }
    ]
  },
  "Guadalupe": { 
    camara2026: "172", 
    senado2026: "167", 
    camara2022: "52",
    parties: [
      { party: "Centro Democrático", votes: 100 },
      { party: "Partido Conservador", votes: 50 },
      { party: "Partido Liberal", votes: 22 }
    ]
  },
  "Guarne": { 
    camara2026: "5,835", 
    senado2026: "6,774", 
    camara2022: "2699",
    parties: [
      { party: "Centro Democrático", votes: 3200 },
      { party: "Pacto Histórico", votes: 1200 },
      { party: "Partido Conservador", votes: 800 },
      { party: "Partido Liberal", votes: 635 }
    ]
  },
  "Guatapé": { 
    camara2026: "1,643", 
    senado2026: "1,477", 
    camara2022: "909",
    parties: [
      { party: "Centro Democrático", votes: 900 },
      { party: "Partido Conservador", votes: 400 },
      { party: "Pacto Histórico", votes: 200 },
      { party: "Partido Liberal", votes: 143 }
    ]
  },
  "Heliconia": { 
    camara2026: "880", 
    senado2026: "710", 
    camara2022: "317",
    parties: [
      { party: "Centro Democrático", votes: 450 },
      { party: "Partido Conservador", votes: 250 },
      { party: "Partido Liberal", votes: 100 },
      { party: "Pacto Histórico", votes: 80 }
    ]
  },
  "Hispania": { 
    camara2026: "890", 
    senado2026: "416", 
    camara2022: "255",
    parties: [
      { party: "Centro Democrático", votes: 400 },
      { party: "Partido Conservador", votes: 250 },
      { party: "Partido Liberal", votes: 150 },
      { party: "Pacto Histórico", votes: 90 }
    ]
  },
  "Ituango": { 
    camara2026: "634", 
    senado2026: "549", 
    camara2022: "126",
    parties: [
      { party: "Pacto Histórico", votes: 300 },
      { party: "Centro Democrático", votes: 150 },
      { party: "Partido Liberal", votes: 100 },
      { party: "Partido de la U", votes: 84 }
    ]
  },
  "Jardín": { 
    camara2026: "1,829", 
    senado2026: "2099", 
    camara2022: "1227",
    parties: [
      { party: "Centro Democrático", votes: 1100 },
      { party: "Partido Conservador", votes: 400 },
      { party: "Pacto Histórico", votes: 200 },
      { party: "Partido Liberal", votes: 129 }
    ]
  },
  "Jericó": { 
    camara2026: "2,452", 
    senado2026: "2,517", 
    camara2022: "1252",
    parties: [
      { party: "Centro Democrático", votes: 1400 },
      { party: "Partido Conservador", votes: 600 },
      { party: "Pacto Histórico", votes: 300 },
      { party: "Partido Liberal", votes: 152 }
    ]
  },
  "La Ceja": { 
    camara2026: "8,952", 
    senado2026: "13,134", 
    camara2022: "3742",
    parties: [
      { party: "Centro Democrático", votes: 5200 },
      { party: "Partido Conservador", votes: 2100 },
      { party: "Pacto Histórico", votes: 1000 },
      { party: "Alianza Verde", votes: 652 }
    ]
  },
  "La Estrella": { 
    camara2026: "12,036", 
    senado2026: "11,723", 
    camara2022: "3457",
    parties: [
      { party: "Centro Democrático", votes: 6500 },
      { party: "Pacto Histórico", votes: 3200 },
      { party: "Partido Conservador", votes: 1500 },
      { party: "Partido Liberal", votes: 836 }
    ]
  },
  "La Pintada": { 
    camara2026: "932", 
    senado2026: "728", 
    camara2022: "457",
    parties: [
      { party: "Centro Democrático", votes: 500 },
      { party: "Partido Conservador", votes: 250 },
      { party: "Pacto Histórico", votes: 100 },
      { party: "Partido Liberal", votes: 82 }
    ]
  },
  "La Unión": { 
    camara2026: "2,568", 
    senado2026: "3,265", 
    camara2022: "1498",
    parties: [
      { party: "Centro Democrático", votes: 1500 },
      { party: "Partido Conservador", votes: 600 },
      { party: "Pacto Histórico", votes: 300 },
      { party: "Partido Liberal", votes: 168 }
    ]
  },
  "Liborina": { 
    camara2026: "780", 
    senado2026: "695", 
    camara2022: "403",
    parties: [
      { party: "Centro Democrático", votes: 400 },
      { party: "Partido Conservador", votes: 200 },
      { party: "Partido Liberal", votes: 100 },
      { party: "Pacto Histórico", votes: 80 }
    ]
  },
  "Maceo": { 
    camara2026: "930", 
    senado2026: "462", 
    camara2022: "296",
    parties: [
      { party: "Centro Democrático", votes: 450 },
      { party: "Partido Liberal", votes: 250 },
      { party: "Partido Conservador", votes: 150 },
      { party: "Pacto Histórico", votes: 80 }
    ]
  },
  "Marinilla": { 
    camara2026: "9,344", 
    senado2026: "9,828", 
    camara2022: "4467",
    parties: [
      { party: "Centro Democrático", votes: 5200 },
      { party: "Partido Conservador", votes: 2100 },
      { party: "Pacto Histórico", votes: 1200 },
      { party: "Alianza Verde", votes: 844 }
    ]
  },
  "Montebello": { 
    camara2026: "862", 
    senado2026: "753", 
    camara2022: "3349",
    parties: [
      { party: "Centro Democrático", votes: 450 },
      { party: "Partido Conservador", votes: 250 },
      { party: "Partido Liberal", votes: 100 },
      { party: "Pacto Histórico", votes: 62 }
    ]
  },
  "Murindó": { 
    camara2026: "144", 
    senado2026: "38", 
    camara2022: "74",
    parties: [
      { party: "Pacto Histórico", votes: 80 },
      { party: "Partido Liberal", votes: 40 },
      { party: "Centro Democrático", votes: 24 }
    ]
  },
  "Mutatá": { 
    camara2026: "773", 
    senado2026: "501", 
    camara2022: "338",
    parties: [
      { party: "Pacto Histórico", votes: 400 },
      { party: "Partido de la U", votes: 200 },
      { party: "Centro Democrático", votes: 100 },
      { party: "Partido Liberal", votes: 73 }
    ]
  },
  "Nariño": { 
    camara2026: "1,522", 
    senado2026: "1,467", 
    camara2022: "520",
    parties: [
      { party: "Centro Democrático", votes: 800 },
      { party: "Partido Conservador", votes: 400 },
      { party: "Pacto Histórico", votes: 200 },
      { party: "Partido Liberal", votes: 122 }
    ]
  },
  "Nechí": { 
    camara2026: "1,194", 
    senado2026: "536", 
    camara2022: "474",
    parties: [
      { party: "Pacto Histórico", votes: 600 },
      { party: "Partido Liberal", votes: 300 },
      { party: "Centro Democrático", votes: 200 },
      { party: "Partido de la U", votes: 94 }
    ]
  },
  "Necoclí": { 
    camara2026: "2,513", 
    senado2026: "1,241", 
    camara2022: "701",
    parties: [
      { party: "Pacto Histórico", votes: 1200 },
      { party: "Partido de la U", votes: 600 },
      { party: "Centro Democrático", votes: 400 },
      { party: "Partido Liberal", votes: 313 }
    ]
  },
  "Olaya": { 
    camara2026: "488", 
    senado2026: "299", 
    camara2022: "150",
    parties: [
      { party: "Centro Democrático", votes: 250 },
      { party: "Partido Conservador", votes: 150 },
      { party: "Partido Liberal", votes: 88 }
    ]
  },
  "El Peñol": { 
    camara2026: "N/A", 
    senado2026: "2,938", 
    camara2022: "964",
    parties: [
      { party: "Centro Democrático", votes: 1600 },
      { party: "Partido Conservador", votes: 700 },
      { party: "Pacto Histórico", votes: 400 },
      { party: "Partido Liberal", votes: 238 }
    ]
  },
  "Peque": { 
    camara2026: "691", 
    senado2026: "387", 
    camara2022: "133",
    parties: [
      { party: "Centro Democrático", votes: 350 },
      { party: "Pacto Histórico", votes: 200 },
      { party: "Partido Conservador", votes: 100 },
      { party: "Partido Liberal", votes: 41 }
    ]
  },
  "Pueblorrico": { 
    camara2026: "871", 
    senado2026: "751", 
    camara2022: "444",
    parties: [
      { party: "Centro Democrático", votes: 450 },
      { party: "Partido Conservador", votes: 250 },
      { party: "Partido Liberal", votes: 100 },
      { party: "Pacto Histórico", votes: 71 }
    ]
  },
  "Puerto Berrío": { 
    camara2026: "2,583", 
    senado2026: "1,906", 
    camara2022: "1002",
    parties: [
      { party: "Centro Democrático", votes: 1200 },
      { party: "Pacto Histórico", votes: 800 },
      { party: "Partido Liberal", votes: 400 },
      { party: "Partido de la U", votes: 183 }
    ]
  },
  "Puerto Nare": { 
    camara2026: "625", 
    senado2026: "567", 
    camara2022: "174",
    parties: [
      { party: "Centro Democrático", votes: 350 },
      { party: "Partido Liberal", votes: 150 },
      { party: "Pacto Histórico", votes: 100 },
      { party: "Partido de la U", votes: 25 }
    ]
  },
  "Puerto Triunfo": { 
    camara2026: "707", 
    senado2026: "720", 
    camara2022: "1204",
    parties: [
      { party: "Centro Democrático", votes: 400 },
      { party: "Partido Liberal", votes: 150 },
      { party: "Pacto Histórico", votes: 100 },
      { party: "Partido de la U", votes: 57 }
    ]
  },
  "Remedios": { 
    camara2026: "547", 
    senado2026: "598", 
    camara2022: "504",
    parties: [
      { party: "Pacto Histórico", votes: 250 },
      { party: "Centro Democrático", votes: 150 },
      { party: "Partido Liberal", votes: 100 },
      { party: "Partido de la U", votes: 47 }
    ]
  },
  "El Retiro": { 
    camara2026: "N/A", 
    senado2026: "7,903", 
    camara2022: "4031",
    parties: [
      { party: "Centro Democrático", votes: 4500 },
      { party: "Partido Conservador", votes: 1800 },
      { party: "Pacto Histórico", votes: 900 },
      { party: "Alianza Verde", votes: 703 }
    ]
  },
  "Sabanalarga": { 
    camara2026: "657", 
    senado2026: "640", 
    camara2022: "121",
    parties: [
      { party: "Centro Democrático", votes: 350 },
      { party: "Partido Conservador", votes: 150 },
      { party: "Partido Liberal", votes: 100 },
      { party: "Pacto Histórico", votes: 57 }
    ]
  },
  "Sabaneta": { 
    camara2026: "17,871", 
    senado2026: "18,533", 
    camara2022: "9399",
    parties: [
      { party: "Centro Democrático", votes: 9500 },
      { party: "Pacto Histórico", votes: 4200 },
      { party: "Partido Conservador", votes: 2500 },
      { party: "Partido Liberal", votes: 1671 }
    ]
  },
  "Salgar": { 
    camara2026: "1,503", 
    senado2026: "1,418", 
    camara2022: "776",
    parties: [
      { party: "Centro Democrático", votes: 800 },
      { party: "Partido Conservador", votes: 400 },
      { party: "Pacto Histórico", votes: 200 },
      { party: "Partido Liberal", votes: 103 }
    ]
  },
  "San Andrés de Cuerquia": { 
    camara2026: "751", 
    senado2026: "451", 
    camara2022: "452",
    parties: [
      { party: "Centro Democrático", votes: 400 },
      { party: "Partido Conservador", votes: 200 },
      { party: "Partido Liberal", votes: 100 },
      { party: "Pacto Histórico", votes: 51 }
    ]
  },
  "San Carlos": { 
    camara2026: "3,115", 
    senado2026: "2,537", 
    camara2022: "460",
    parties: [
      { party: "Centro Democrático", votes: 1600 },
      { party: "Partido Conservador", votes: 800 },
      { party: "Pacto Histórico", votes: 400 },
      { party: "Partido Liberal", votes: 315 }
    ]
  },
  "San Francisco": { 
    camara2026: "743", 
    senado2026: "385", 
    camara2022: "64",
    parties: [
      { party: "Centro Democrático", votes: 400 },
      { party: "Partido Conservador", votes: 200 },
      { party: "Pacto Histórico", votes: 100 },
      { party: "Partido Liberal", votes: 43 }
    ]
  },
  "San Jerónimo": { 
    camara2026: "1,582", 
    senado2026: "1,715", 
    camara2022: "835",
    parties: [
      { party: "Centro Democrático", votes: 800 },
      { party: "Partido Conservador", votes: 400 },
      { party: "Partido Liberal", votes: 250 },
      { party: "Pacto Histórico", votes: 132 }
    ]
  },
  "San José de la Montaña": { 
    camara2026: "271", 
    senado2026: "213", 
    camara2022: "156",
    parties: [
      { party: "Centro Democrático", votes: 150 },
      { party: "Partido Conservador", votes: 80 },
      { party: "Partido Liberal", votes: 41 }
    ]
  },
  "San Juan de Urabá": { 
    camara2026: "2,293", 
    senado2026: "630", 
    camara2022: "1216",
    parties: [
      { party: "Pacto Histórico", votes: 1100 },
      { party: "Partido de la U", votes: 600 },
      { party: "Centro Democrático", votes: 400 },
      { party: "Partido Liberal", votes: 193 }
    ]
  },
  "San Luis": { 
    camara2026: "1,840", 
    senado2026: "1,733", 
    camara2022: "830",
    parties: [
      { party: "Centro Democrático", votes: 900 },
      { party: "Partido Conservador", votes: 500 },
      { party: "Pacto Histórico", votes: 250 },
      { party: "Partido Liberal", votes: 190 }
    ]
  },
  "San Pedro de los Milagros": { 
    camara2026: "3,794", 
    senado2026: "3,921", 
    camara2022: "1243",
    parties: [
      { party: "Centro Democrático", votes: 2100 },
      { party: "Partido Conservador", votes: 900 },
      { party: "Pacto Histórico", votes: 500 },
      { party: "Partido Liberal", votes: 294 }
    ]
  },
  "San Pedro de Urabá": { 
    camara2026: "1,335", 
    senado2026: "943", 
    camara2022: "460",
    parties: [
      { party: "Pacto Histórico", votes: 600 },
      { party: "Partido de la U", votes: 350 },
      { party: "Centro Democrático", votes: 250 },
      { party: "Partido Liberal", votes: 135 }
    ]
  },
  "San Rafael": { 
    camara2026: "2,138", 
    senado2026: "1,577", 
    camara2022: "1035",
    parties: [
      { party: "Centro Democrático", votes: 1100 },
      { party: "Partido Conservador", votes: 500 },
      { party: "Pacto Histórico", votes: 300 },
      { party: "Partido Liberal", votes: 238 }
    ]
  },
  "San Roque": { 
    camara2026: "3,887", 
    senado2026: "2,914", 
    camara2022: "1019",
    parties: [
      { party: "Centro Democrático", votes: 1800 },
      { party: "Partido Conservador", votes: 1000 },
      { party: "Pacto Histórico", votes: 600 },
      { party: "Partido Liberal", votes: 487 }
    ]
  },
  "San Vicente Ferrer": { 
    camara2026: "3,426", 
    senado2026: "2,955", 
    camara2022: "1059",
    parties: [
      { party: "Centro Democrático", votes: 1700 },
      { party: "Partido Conservador", votes: 900 },
      { party: "Pacto Histórico", votes: 500 },
      { party: "Partido Liberal", votes: 326 }
    ]
  },
  "Santa Bárbara": { 
    camara2026: "1,584", 
    senado2026: "1,532", 
    camara2022: "611",
    parties: [
      { party: "Centro Democrático", votes: 800 },
      { party: "Partido Conservador", votes: 400 },
      { party: "Pacto Histórico", votes: 200 },
      { party: "Partido Liberal", votes: 184 }
    ]
  },
  "El Santuario": { 
    camara2026: "9,293", 
    senado2026: "7,221", 
    camara2022: "1340",
    parties: [
      { party: "Centro Democrático", votes: 5100 },
      { party: "Partido Conservador", votes: 2100 },
      { party: "Pacto Histórico", votes: 1200 },
      { party: "Alianza Verde", votes: 893 }
    ]
  },
  "Santa Rosa de Osos": { 
    camara2026: "5,132", 
    senado2026: "4,654", 
    camara2022: "2214",
    parties: [
      { party: "Centro Democrático", votes: 2800 },
      { party: "Partido Conservador", votes: 1200 },
      { party: "Pacto Histórico", votes: 600 },
      { party: "Partido Liberal", votes: 532 }
    ]
  },
  "Santo Domingo": { 
    camara2026: "1,887", 
    senado2026: "1,001", 
    camara2022: "758",
    parties: [
      { party: "Centro Democrático", votes: 900 },
      { party: "Partido Conservador", votes: 500 },
      { party: "Pacto Histórico", votes: 300 },
      { party: "Partido Liberal", votes: 187 }
    ]
  },
  "Segovia": { 
    camara2026: "821", 
    senado2026: "665", 
    camara2022: "210",
    parties: [
      { party: "Pacto Histórico", votes: 400 },
      { party: "Centro Democrático", votes: 200 },
      { party: "Partido Liberal", votes: 150 },
      { party: "Partido de la U", votes: 71 }
    ]
  },
  "Sonsón": { 
    camara2026: "6,328", 
    senado2026: "6,249", 
    camara2022: "3868",
    parties: [
      { party: "Centro Democrático", votes: 3200 },
      { party: "Partido Conservador", votes: 1500 },
      { party: "Pacto Histórico", votes: 900 },
      { party: "Partido Liberal", votes: 728 }
    ]
  },
  "Sopetrán": { 
    camara2026: "3,042", 
    senado2026: "3,048", 
    camara2022: "1656",
    parties: [
      { party: "Centro Democrático", votes: 1500 },
      { party: "Partido Conservador", votes: 800 },
      { party: "Partido Liberal", votes: 400 },
      { party: "Pacto Histórico", votes: 342 }
    ]
  },
  "Támesis": { 
    camara2026: "2,514", 
    senado2026: "2,410", 
    camara2022: "334",
    parties: [
      { party: "Centro Democrático", votes: 1200 },
      { party: "Partido Conservador", votes: 700 },
      { party: "Pacto Histórico", votes: 400 },
      { party: "Partido Liberal", votes: 214 }
    ]
  },
  "Tarazá": { 
    camara2026: "2,259", 
    senado2026: "293", 
    camara2022: "170",
    parties: [
      { party: "Pacto Histórico", votes: 1400 },
      { party: "Partido Liberal", votes: 500 },
      { party: "Centro Democrático", votes: 200 },
      { party: "Partido de la U", votes: 159 }
    ]
  },
  "Tarso": { 
    camara2026: "939", 
    senado2026: "412", 
    camara2022: "152",
    parties: [
      { party: "Centro Democrático", votes: 450 },
      { party: "Partido Conservador", votes: 250 },
      { party: "Pacto Histórico", votes: 150 },
      { party: "Partido Liberal", votes: 89 }
    ]
  },
  "Titiribí": { 
    camara2026: "1,117", 
    senado2026: "778", 
    camara2022: "488",
    parties: [
      { party: "Centro Democrático", votes: 600 },
      { party: "Partido Conservador", votes: 300 },
      { party: "Pacto Histórico", votes: 150 },
      { party: "Partido Liberal", votes: 67 }
    ]
  },
  "Toledo": { 
    camara2026: "589", 
    senado2026: "150", 
    camara2022: "73",
    parties: [
      { party: "Centro Democrático", votes: 300 },
      { party: "Partido Conservador", votes: 150 },
      { party: "Pacto Histórico", votes: 100 },
      { party: "Partido Liberal", votes: 39 }
    ]
  },
  "Uramita": { 
    camara2026: "367", 
    senado2026: "388", 
    camara2022: "52",
    parties: [
      { party: "Centro Democrático", votes: 200 },
      { party: "Partido Conservador", votes: 100 },
      { party: "Pacto Histórico", votes: 50 },
      { party: "Partido Liberal", votes: 17 }
    ]
  },
  "Urrao": { 
    camara2026: "2,697", 
    senado2026: "2,198", 
    camara2022: "826",
    parties: [
      { party: "Centro Democrático", votes: 1200 },
      { party: "Partido Conservador", votes: 700 },
      { party: "Pacto Histórico", votes: 500 },
      { party: "Partido Liberal", votes: 297 }
    ]
  },
  "Valdivia": { 
    camara2026: "486", 
    senado2026: "317", 
    camara2022: "187",
    parties: [
      { party: "Pacto Histórico", votes: 250 },
      { party: "Centro Democrático", votes: 150 },
      { party: "Partido Liberal", votes: 86 }
    ]
  },
  "Valparaíso": { 
    camara2026: "759", 
    senado2026: "659", 
    camara2022: "356",
    parties: [
      { party: "Centro Democrático", votes: 400 },
      { party: "Partido Conservador", votes: 200 },
      { party: "Pacto Histórico", votes: 100 },
      { party: "Partido Liberal", votes: 59 }
    ]
  },
  "Vegachí": { 
    camara2026: "990", 
    senado2026: "966", 
    camara2022: "397",
    parties: [
      { party: "Centro Democrático", votes: 500 },
      { party: "Partido Conservador", votes: 250 },
      { party: "Pacto Histórico", votes: 150 },
      { party: "Partido Liberal", votes: 90 }
    ]
  },
  "Venecia": { 
    camara2026: "1,472", 
    senado2026: "1,315", 
    camara2022: "850",
    parties: [
      { party: "Centro Democrático", votes: 700 },
      { party: "Partido Conservador", votes: 400 },
      { party: "Pacto Histórico", votes: 200 },
      { party: "Partido Liberal", votes: 172 }
    ]
  },
  "Vigía del Fuerte": { 
    camara2026: "1,267", 
    senado2026: "42", 
    camara2022: "55",
    parties: [
      { party: "Pacto Histórico", votes: 800 },
      { party: "Partido Liberal", votes: 300 },
      { party: "Centro Democrático", votes: 100 },
      { party: "Partido de la U", votes: 67 }
    ]
  },
  "Yalí": { 
    camara2026: "544", 
    senado2026: "426", 
    camara2022: "204",
    parties: [
      { party: "Centro Democrático", votes: 300 },
      { party: "Partido Conservador", votes: 150 },
      { party: "Pacto Histórico", votes: 94 }
    ]
  },
  "Yarumal": { 
    camara2026: "3,252", 
    senado2026: "2,997", 
    camara2022: "1564",
    parties: [
      { party: "Centro Democrático", votes: 1800 },
      { party: "Partido Conservador", votes: 800 },
      { party: "Pacto Histórico", votes: 400 },
      { party: "Partido Liberal", votes: 252 }
    ]
  },
  "Yolombó": { 
    camara2026: "1,453", 
    senado2026: "1,484", 
    camara2022: "563",
    parties: [
      { party: "Centro Democrático", votes: 700 },
      { party: "Partido Conservador", votes: 400 },
      { party: "Pacto Histórico", votes: 200 },
      { party: "Partido Liberal", votes: 153 }
    ]
  },
  "Yondó": { 
    camara2026: "559", 
    senado2026: "555", 
    camara2022: "379",
    parties: [
      { party: "Pacto Histórico", votes: 300 },
      { party: "Centro Democrático", votes: 150 },
      { party: "Partido Liberal", votes: 109 }
    ]
  },
  "Zaragoza": { 
    camara2026: "370", 
    senado2026: "333", 
    camara2022: "505",
    parties: [
      { party: "Pacto Histórico", votes: 200 },
      { party: "Partido Liberal", votes: 100 },
      { party: "Centro Democrático", votes: 70 }
    ]
  }
};

export const COLOMBIA_REGIONS = [
  {
    id: "pacifico",
    name: "Pacífico",
    departments: [
      { 
        name: "Chocó", 
        subregions: ["Atrato (Centro)", "San Juan (Sur)", "Darién (Urabá Chocoano)", "Pacífico Norte", "Pacífico Sur (Baudó)"],
        generalData: {
          poblacion: "575,000",
          idh: "0.691",
          pobreza: "30.8% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Liberalismo, alta influencia de líderes locales",
          pib: "N/A",
          actividadesEconomicas: "Minería, madera, servicios",
          ordenPublico: "Crítico (ELN y Clan del Golfo)"
        }
      },
      { 
        name: "Valle del Cauca", 
        subregions: ["Norte", "Centro", "Sur", "Oriente", "Occidente (Pacífico)"],
        generalData: {
          poblacion: "4,750,000",
          idh: "0.825",
          pobreza: "6.2% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Multipartidista, clanes locales (Dilian)",
          pib: "N/A",
          actividadesEconomicas: "Industria, servicios, azúcar",
          ordenPublico: "Tenso (Buenaventura y Sur)"
        }
      },
      { 
        name: "Cauca", 
        subregions: ["Norte", "Centro", "Sur", "Oriente", "Occidente (Pacífico)"],
        generalData: {
          poblacion: "1,580,000",
          idh: "0.735",
          pobreza: "19.5% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Izquierda, fuerte base social indígena",
          pib: "N/A",
          actividadesEconomicas: "Agricultura, servicios",
          ordenPublico: "Crítico (Conflicto interétnico)"
        }
      },
      { 
        name: "Nariño", 
        subregions: ["Zona Centro", "Zona Sur / Frontera", "Zona Norte", "Zona de Occidente y Cordillera", "Zona Pacífico y Piedemonte"],
        generalData: {
          poblacion: "1,720,000",
          idh: "0.745",
          pobreza: "15.2% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Izquierda y movimientos sociales",
          pib: "N/A",
          actividadesEconomicas: "Agricultura, comercio, servicios",
          ordenPublico: "Crítico (Narcotráfico)"
        }
      }
    ]
  },
  {
    id: "caribe",
    name: "Caribe",
    departments: [
      { 
        name: "La Guajira", 
        subregions: ["Alta Guajira", "Media Guajira", "Baja Guajira"],
        generalData: {
          poblacion: "1,080,000",
          idh: "0.715",
          pobreza: "40.1% (Multidimensional)",
          nbi: "38.1% (Promedio)",
          contextoPolitico: "Clanes tradicionales, multipartidismo",
          pib: "N/A",
          actividadesEconomicas: "Minería (carbón), gas, comercio",
          ordenPublico: "Crítico (Crisis humanitaria)"
        }
      },
      { 
        name: "Magdalena", 
        subregions: ["Santa Marta", "Norte", "Centro", "Río", "Sur"],
        generalData: {
          poblacion: "1,520,000",
          idh: "0.755",
          pobreza: "21.5% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Izquierda (Caicedismo) vs Tradicionales",
          pib: "$21,7 billones",
          actividadesEconomicas: "Turismo, agricultura, servicios",
          ordenPublico: "Tenso (Clan del Golfo)"
        }
      },
      { 
        name: "Cesar", 
        subregions: ["Norte", "Noroccidente", "Centro", "Sur"],
        generalData: {
          poblacion: "1,380,000",
          idh: "0.775",
          pobreza: "15.3% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Clanes tradicionales (Gnecco)",
          pib: "N/A",
          actividadesEconomicas: "Minería (carbón), ganadería",
          ordenPublico: "Moderado (Extorsión)"
        }
      },
      { 
        name: "Atlántico", 
        subregions: ["Metropolitana", "Norte", "Centro", "Sur", "Occidente"],
        generalData: {
          poblacion: "2,910,000",
          idh: "0.815",
          pobreza: "11.2% (Multidimensional)",
          nbi: "13.1% (Promedio departamental)",
          contextoPolitico: "Clanes tradicionales (Char, Name)",
          pib: "4.3% del PIB nacional",
          actividadesEconomicas: "Servicios, industria, logística",
          ordenPublico: "Moderado (Crimen organizado urbano)"
        }
      },
      { 
        name: "Bolívar", 
        subregions: ["Dique", "Montes de María", "Depresión Momposina", "Loba", "Magdalena Medio", "Mojana"],
        generalData: {
          poblacion: "2,280,000",
          idh: "0.785",
          pobreza: "16.5% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Conservatismo y clanes locales",
          pib: "N/A",
          actividadesEconomicas: "Turismo, industria petroquímica",
          ordenPublico: "Tenso (Sur de Bolívar)"
        }
      },
      { 
        name: "Sucre", 
        subregions: ["Mojana", "Montes de María", "Morrosquillo", "Sabanas", "San Jorge"],
        generalData: {
          poblacion: "1,020,000",
          idh: "0.752",
          pobreza: "25.4% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Clanes tradicionales",
          pib: "0.80% del PIB nacional",
          actividadesEconomicas: "Ganadería, agricultura",
          ordenPublico: "Tenso (Clan del Golfo)"
        }
      },
      { 
        name: "Córdoba", 
        subregions: ["Alto Sinú", "Bajo Sinú", "Centro", "Costanera", "Sabanas", "San Jorge"],
        generalData: {
          poblacion: "1,920,000",
          idh: "0.765",
          pobreza: "19.8% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Conservatismo y clanes locales",
          pib: "1.7% al 2.0% del PIB nacional",
          actividadesEconomicas: "Ganadería, minería, agricultura",
          ordenPublico: "Tenso (Clan del Golfo)"
        }
      }
    ]
  },
  {
    id: "andina",
    name: "Andina",
    departments: [
      { 
        name: "Antioquia", 
        subregions: ["Valle de Aburrá", "Bajo Cauca", "Magdalena Medio", "Nordeste", "Norte", "Occidente", "Oriente", "Suroeste", "Urabá"],
        generalData: {
          poblacion: "6,972,000",
          idh: "0.828",
          pobreza: "9.5% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Centro-derecha, bastión uribista",
          pib: "14.5% del PIB nacional",
          actividadesEconomicas: "Industria, comercio, minería, café",
          ordenPublico: "Tenso (Urabá y Bajo Cauca)"
        }
      },
      { 
        name: "Bogotá D.C.", 
        subregions: ["Bogotá"],
        generalData: {
          poblacion: "8,250,000",
          idh: "0.882",
          pobreza: "2.2% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Voto de opinión, centro-izquierda",
          pib: "N/A",
          actividadesEconomicas: "Servicios, finanzas, comercio",
          ordenPublico: "Moderado (Seguridad ciudadana)"
        }
      },
      { 
        name: "Boyacá", 
        subregions: ["Provincia del Centro", "Sugamuxi y Tundama", "Provincia de Occidente", "Provincia de Ricaurte", "Norte y Gutiérrez", "Puerto Boyacá"],
        generalData: {
          poblacion: "1,320,000",
          idh: "0.795",
          pobreza: "10.4% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Conservador, ascenso de Alianza Verde",
          pib: "N/A",
          actividadesEconomicas: "Minería, agricultura, energía",
          ordenPublico: "Estable"
        }
      },
      { 
        name: "Caldas", 
        subregions: ["Centrosur", "Alto Occidente", "Bajo Occidente", "Norte", "Alto Oriente", "Magdalena Caldense"],
        generalData: {
          poblacion: "1,050,000",
          idh: "0.812",
          pobreza: "7.5% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Tradición conservadora y liberal",
          pib: "N/A",
          actividadesEconomicas: "Café, industria, servicios",
          ordenPublico: "Estable"
        }
      },
      { 
        name: "Cundinamarca", 
        subregions: ["Sabana Centro", "Sabana Occidente", "Soacha", "Alto Magdalena", "Sumapaz", "Ubaté", "Tequendama"],
        generalData: {
          poblacion: "3,450,000",
          idh: "0.825",
          pobreza: "7.8% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Centro-derecha, voto regional",
          pib: "N/A",
          actividadesEconomicas: "Industria, agricultura, servicios",
          ordenPublico: "Estable"
        }
      },
      { 
        name: "Huila", 
        subregions: ["Norte", "Centro", "Sur", "Occidente"],
        generalData: {
          poblacion: "1,180,000",
          idh: "0.782",
          pobreza: "12.3% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Conservador, ascenso de independientes",
          pib: "N/A",
          actividadesEconomicas: "Café, petróleo, energía",
          ordenPublico: "Moderado (Disidencias)"
        }
      },
      { 
        name: "Norte de Santander", 
        subregions: ["Centro", "Norte", "Occidente", "Oriente", "Sur-occidente", "Sur-oriente"],
        generalData: {
          poblacion: "1,680,000",
          idh: "0.778",
          pobreza: "13.5% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Conservador, fuerte influencia fronteriza",
          pib: "N/A",
          actividadesEconomicas: "Comercio, petróleo, agricultura",
          ordenPublico: "Crítico (Catatumbo)"
        }
      },
      { 
        name: "Quindío", 
        subregions: ["Norte", "Centro", "Sur"],
        generalData: {
          poblacion: "585,000",
          idh: "0.805",
          pobreza: "8.2% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Multipartidista, enfoque urbano",
          pib: "N/A",
          actividadesEconomicas: "Turismo, café, servicios",
          ordenPublico: "Estable"
        }
      },
      { 
        name: "Risaralda", 
        subregions: ["I: Área Metropolitana", "II: Centro / Norte", "III: Occidente"],
        generalData: {
          poblacion: "995,000",
          idh: "0.818",
          pobreza: "8.5% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Conservador y liberal",
          pib: "N/A",
          actividadesEconomicas: "Comercio, industria, café",
          ordenPublico: "Estable"
        }
      },
      { 
        name: "Santander", 
        subregions: ["Comunera", "García Rovira", "Guanentá", "Metropolitana", "Soto", "Vélez", "Yariguíes"],
        generalData: {
          poblacion: "2,350,000",
          idh: "0.822",
          pobreza: "6.8% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Centro-derecha, voto de opinión",
          pib: "N/A",
          actividadesEconomicas: "Petróleo, industria, servicios",
          ordenPublico: "Estable"
        }
      },
      { 
        name: "Tolima", 
        subregions: ["Ibagué", "Nevados", "Norte", "Oriente", "Sur", "Suroriente"],
        generalData: {
          poblacion: "1,380,000",
          idh: "0.788",
          pobreza: "11.5% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Conservador (Barretismo)",
          pib: "N/A",
          actividadesEconomicas: "Agricultura, energía, servicios",
          ordenPublico: "Moderado (Disidencias)"
        }
      }
    ]
  },
  {
    id: "oriental",
    name: "Oriental",
    departments: [
      { 
        name: "Arauca", 
        subregions: ["Arauca", "Arauquita", "Cravo Norte", "Fortul", "Puerto Rondón", "Saravena", "Tame"],
        generalData: {
          poblacion: "315,000",
          idh: "0.791",
          pobreza: "17.5% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Liberalismo, fuerte control insurgente",
          pib: "N/A",
          actividadesEconomicas: "Petróleo, ganadería, cacao",
          ordenPublico: "Crítico (ELN y Disidencias)"
        }
      },
      { 
        name: "Casanare", 
        subregions: ["Norte", "Centro", "Sur"],
        generalData: {
          poblacion: "465,000",
          idh: "0.818",
          pobreza: "11.9% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Centro-derecha, enfoque regionalista",
          pib: "N/A",
          actividadesEconomicas: "Petróleo, arroz, ganadería",
          ordenPublico: "Moderado (Grupos armados)"
        }
      },
      { 
        name: "Meta", 
        subregions: ["Ariari", "Capital", "Piedemonte", "Meta"],
        generalData: {
          poblacion: "1,120,000",
          idh: "0.815",
          pobreza: "11.4% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Centro-derecha, liderazgos regionales",
          pib: "N/A",
          actividadesEconomicas: "Petróleo, agricultura, ganadería",
          ordenPublico: "Moderado (Disidencias)"
        }
      },
      { 
        name: "Vichada", 
        subregions: ["Cumaribo", "La Primavera", "Puerto Carreño", "Santa Rosalía"],
        generalData: {
          poblacion: "125,000",
          idh: "0.728",
          pobreza: "55.2% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Multipartidista, enfoque local",
          pib: "N/A",
          actividadesEconomicas: "Ganadería, agricultura",
          ordenPublico: "Moderado (Control fronterizo)"
        }
      }
    ]
  },
  {
    id: "amazonas",
    name: "Amazonas",
    departments: [
      { 
        name: "Amazonas", 
        subregions: ["Amazonas"],
        generalData: {
          poblacion: "87,000",
          idh: "0.771",
          pobreza: "23.4% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Multipartidista, enfoque local",
          pib: "N/A",
          actividadesEconomicas: "Ecoturismo, servicios, madera",
          ordenPublico: "Estable / Control fronterizo"
        }
      },
      { 
        name: "Caquetá", 
        subregions: ["Norte", "Centro", "Sur"],
        generalData: {
          poblacion: "435,000",
          idh: "0.742",
          pobreza: "16.8% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Históricamente conservador, hoy volátil",
          pib: "N/A",
          actividadesEconomicas: "Ganadería, servicios",
          ordenPublico: "Crítico (Disidencias FARC)"
        }
      },
      { 
        name: "Guainía", 
        subregions: ["Inírida"],
        generalData: {
          poblacion: "58,000",
          idh: "0.725",
          pobreza: "51.8% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Multipartidista, enfoque local",
          pib: "N/A",
          actividadesEconomicas: "Minería, servicios",
          ordenPublico: "Moderado (Control fronterizo)"
        }
      },
      { 
        name: "Guaviare", 
        subregions: ["San José del Guaviare"],
        generalData: {
          poblacion: "96,000",
          idh: "0.732",
          pobreza: "21.0% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Volátil, influencia de grupos armados",
          pib: "N/A",
          actividadesEconomicas: "Ganadería, servicios",
          ordenPublico: "Crítico (Disidencias FARC)"
        }
      },
      { 
        name: "Putumayo", 
        subregions: ["Alto Putumayo", "Medio Putumayo", "Bajo Putumayo"],
        generalData: {
          poblacion: "395,000",
          idh: "0.748",
          pobreza: "19.8% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Izquierda, movimientos sociales",
          pib: "N/A",
          actividadesEconomicas: "Petróleo, agricultura",
          ordenPublico: "Crítico (Narcotráfico)"
        }
      },
      { 
        name: "Vaupés", 
        subregions: ["Mitú"],
        generalData: {
          poblacion: "48,000",
          idh: "0.712",
          pobreza: "41.7% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Multipartidista, enfoque local",
          pib: "N/A",
          actividadesEconomicas: "Servicios, madera",
          ordenPublico: "Estable / Control fronterizo"
        }
      }
    ]
  },
  {
    id: "insular",
    name: "Insular",
    departments: [
      { 
        name: "San Andrés y Providencia", 
        subregions: ["San Andrés", "Providencia"],
        generalData: {
          poblacion: "65,000",
          idh: "0.825",
          pobreza: "6.0% (Multidimensional)",
          nbi: "N/A",
          contextoPolitico: "Movimientos locales, enfoque étnico",
          pib: "N/A",
          actividadesEconomicas: "Turismo, comercio",
          ordenPublico: "Moderado (Narcotráfico)"
        }
      }
    ]
  }
];

export const NATIONAL_SUBREGION_DETAILS: Record<string, Record<string, { demograficas: string, socioeconomicas: string, ordenPublico: string, electorales: string }>> = {
  "Antioquia": {
    "Magdalena Medio": {
      demograficas: "Población: ~120,000. Composición: Mestiza con componente afro.",
      socioeconomicas: "Capacidad Administrativa: Predomina Categoría 6. Tensión socio-ecológica por minería y ganadería.",
      ordenPublico: "Reorganización de grupos armados (Clan del Golfo, ELN). Influencia histórica de autodefensas.",
      electorales: "Dinámica Política: Clientelismo tradicional, redes ganaderas y extractivas."
    },
    "Nordeste": {
      demograficas: "Población: ~200,000. Geografía quebrada.",
      socioeconomicas: "Minería aurífera y caña panelera. Hiper-informalidad minera.",
      ordenPublico: "Presencia de AGC y ELN. Gobernanza bajo constreñimiento de grupos armados.",
      electorales: "Tradicionalismo bipartidista que mutó a coaliciones locales (U y Centro Democrático)."
    },
    "Norte": {
      demograficas: "Población: ~280,000. Valles lecheros.",
      socioeconomicas: "Potencial hidroeléctrico (Hidroituango). Brecha urbano-rural.",
      ordenPublico: "Conflicto armado en el cañón del Cauca. Desplazamiento forzado (Ituango).",
      electorales: "Históricamente Conservador, hoy fuerte influencia del Centro Democrático en el 'Norte Cercano'."
    },
    "Occidente": {
      demograficas: "Población: ~198,000. Cuna histórica.",
      socioeconomicas: "Tensión extractivista (Buriticá). Dicotomía en servicios públicos.",
      ordenPublico: "Presencia de AGC.",
      electorales: "Conservadora tradicional, hoy dominada por coaliciones de partidos tradicionales y Cambio Radical."
    },
    "Oriente": {
      demograficas: "Población: ~710,000. Eje económico y administrativo.",
      socioeconomicas: "Fuerte desarrollo gremial e inmobiliario. Presión por urbanización.",
      ordenPublico: "Microtráfico periférico. Desigualdad en zonas de bosques y páramo.",
      electorales: "Bastión Conservador y del Centro Democrático."
    },
    "Suroeste": {
      demograficas: "Población: ~380,000. Corazón cafetero.",
      socioeconomicas: "Contienda ambiental por megaminería. Envejecimiento poblacional.",
      ordenPublico: "Seguridad en temporada de cosecha.",
      electorales: "Baluarte Conservador y del Centro Democrático. Influencia de la Diócesis de Jericó."
    },
    "Urabá": {
      demograficas: "Población: ~500,000+. Eje bananero y portuario.",
      socioeconomicas: "Déficit de vivienda. Crisis migratoria (Necoclí).",
      ordenPublico: "Presencia del Clan del Golfo. Extorsión.",
      electorales: "Históricamente influenciada por grupos armados, hoy con fuerte presencia institucional."
    },
    "Valle de Aburrá": {
      demograficas: "Población: ~4,150,000. Núcleo económico.",
      socioeconomicas: "Contaminación del aire. Desigualdad social extrema.",
      ordenPublico: "Gobernanza criminal interna (combos).",
      electorales: "Voto independiente y de opinión, tradicionalmente centro-derecha."
    },
    "Bajo Cauca": {
      demograficas: "Población: ~320,000. Valor hídrico y mineral.",
      socioeconomicas: "Minería informal e ilegal. Baja cobertura de servicios públicos.",
      ordenPublico: "Conflicto armado crónico. Presión armada (Clan del Golfo, ELN, disidencias FARC).",
      electorales: "Clientelismo y presión armada."
    }
  },
  "Bogotá D.C.": {
    "Bogotá": {
      demograficas: "Población: ~8,250,000. Capital de la República.",
      socioeconomicas: "Centro financiero y de servicios del país. Mayor PIB regional.",
      ordenPublico: "Retos de seguridad ciudadana y movilidad.",
      electorales: "Voto de opinión, diversidad política, centro de las decisiones nacionales."
    }
  },
  "Córdoba": {
    "Alto Sinú": {
      demograficas: "Tierralta (NBI Rural 71.81%), Valencia. Población con fuerte componente rural y disperso.",
      socioeconomicas: "Tierralta (NBI 56.01%), Valencia (NBI 55.93%). Economía basada en agricultura y recursos naturales.",
      ordenPublico: "Presencia del Clan del Golfo, cultivos ilícitos y minería ilegal en el Nudo del Paramillo.",
      electorales: "Influencia de liderazgos locales y tensión por control territorial de grupos armados."
    },
    "Bajo Sinú": {
      demograficas: "Lorica (Centro regional), San Bernardo del Viento, San Pelayo, Purísima, Chimá, Momil, Cotorra, San Antero.",
      socioeconomicas: "Lorica (NBI 33.40%), Momil (26.67%), Cotorra (24.20%). Nodo económico y comercial estratégico.",
      ordenPublico: "Afectado por extorsiones y crimen organizado. Corredor estratégico para el departamento.",
      electorales: "Contexto político muy activo; fuerte arraigo de partidos tradicionales."
    },
    "Centro": {
      demograficas: "Montería (Capital: 433,723 hab, 51.5% mujeres), Cereté. Mayor concentración urbana del departamento.",
      socioeconomicas: "Montería (NBI 18.80% - el más bajo del depto), Cereté (NBI 25.19%). Eje administrativo y de servicios.",
      ordenPublico: "Seguridad urbana ligada al control de rentas ilegales en barrios periféricos y microtráfico.",
      electorales: "Dinámicas regionalistas marcadas; principal plaza de votación del departamento."
    },
    "Costanera": {
      demograficas: "Canalete, Puerto Escondido, Los Córdobas, Moñitos. Población costera con alta vulnerabilidad.",
      socioeconomicas: "Canalete (NBI 75.38%), Puerto Escondido (73.79%), Los Córdobas (70.79%), Moñitos (68.34%). Índices de NBI más altos.",
      ordenPublico: "Conflictividad social y microtráfico local. Vulnerabilidad por abandono estatal.",
      electorales: "Voto condicionado por necesidades básicas; redes de apoyo local tradicionales."
    },
    "Sabanas": {
      demograficas: "Sahagún, San Andrés de Sotavento, San Carlos, Chinú, Ciénaga de Oro. Región con fuerte identidad cultural.",
      socioeconomicas: "Sahagún (NBI 25.29%), San Andrés (72.58%), Chinú (25.02%), Ciénaga de Oro (36.87%). Ganadería y comercio.",
      ordenPublico: "Sahagún: Extorsiones y crimen organizado. Problemas de convivencia comunitaria.",
      electorales: "Históricamente conservador; Sahagún es un nodo político clave para el departamento."
    },
    "San Jorge": {
      demograficas: "Montelíbano, Puerto Libertador, Planeta Rica, Ayapel, Pueblo Nuevo, Buenavista, La Apartada, San José de Uré.",
      socioeconomicas: "Montelíbano (NBI 26.99%), Puerto Libertador (55.55%), Planeta Rica (33.10%), San José de Uré (52.83%). Región minera.",
      ordenPublico: "Alta tasa de homicidios; disputa territorial por narcotráfico y minería ilegal (Clan del Golfo).",
      electorales: "Vulnerabilidad electoral por constreñimiento de grupos armados ilegales."
    }
  },
  "Sucre": {
    "Mojana": {
      demograficas: "Majagual (NBI 51.65%), Guaranda (NBI 58.17%), Sucre (NBI 48.30%). Población rural altamente vulnerable.",
      socioeconomicas: "Economía basada en agricultura de subsistencia y pesca. Graves deficiencias en servicios públicos.",
      ordenPublico: "Zona con presencia histórica de grupos armados y problemas de inundaciones recurrentes.",
      electorales: "Voto condicionado por la precariedad económica y el aislamiento geográfico."
    },
    "Montes de María": {
      demograficas: "Sincelejo (Capital: 274,622 hab), Corozal, Los Palmitos, Morroa, Ovejas, Colosó, Chalán.",
      socioeconomicas: "Sincelejo (NBI 18.90%), Corozal (NBI 18.19%). Eje administrativo, comercial y de servicios del departamento.",
      ordenPublico: "Históricamente afectada por el conflicto armado; procesos de retorno y reparación en curso.",
      electorales: "Principal plaza electoral; Sincelejo define gran parte de la dinámica política departamental."
    },
    "Morrosquillo": {
      demograficas: "Santiago de Tolú, Coveñas, San Onofre, Tolú Viejo, Palmito.",
      socioeconomicas: "Coveñas (NBI 28.21%), San Onofre (NBI 41.91%). Potencial turístico y portuario (petróleo).",
      ordenPublico: "Control de rutas de narcotráfico por grupos armados ilegales en la zona costera.",
      electorales: "Influencia de clanes políticos tradicionales y tensiones por el control de recursos turísticos."
    },
    "Sabanas": {
      demograficas: "Buenavista, El Roble, Galeras, Sampués, San Juan de Betulia, San Pedro, Sincé.",
      socioeconomicas: "Sincé (NBI 30.72%), Sampués (NBI 41.50%). Región ganadera y artesanal (Sampués).",
      ordenPublico: "Relativa estabilidad en comparación con otras subregiones, aunque con presencia de microtráfico.",
      electorales: "Fuerte arraigo de partidos tradicionales y liderazgos locales agrarios."
    },
    "San Jorge": {
      demograficas: "San Marcos, San Benito Abad, Caimito, La Unión.",
      socioeconomicas: "San Benito Abad (NBI 36.23%), San Marcos (NBI 30.15%). Riqueza hídrica y potencial agroindustrial.",
      ordenPublico: "Conflictos por la tenencia de la tierra y presencia de grupos armados en zonas rurales dispersas.",
      electorales: "Dinámicas marcadas por la influencia de grandes propietarios de tierras y necesidades básicas."
    }
  },
  "Bolívar": {
    "Dique": {
      demograficas: "Cartagena (Capital: 887,946 hab), Turbaco, Arjona. Mayor concentración urbana del departamento.",
      socioeconomicas: "Cartagena (NBI 12.49%), Turbaco (NBI 17.19%). Eje administrativo, industrial y de servicios.",
      ordenPublico: "Seguridad urbana ligada al control de rentas ilegales y microtráfico en zonas periféricas.",
      electorales: "Principal plaza electoral; fuerte influencia de estructuras políticas tradicionales."
    },
    "Montes de María": {
      demograficas: "El Carmen de Bolívar, San Jacinto, San Juan Nepomuceno. Población con fuerte componente rural.",
      socioeconomicas: "El Carmen (NBI 41.55%), San Jacinto (NBI 93.44%). Rezagos históricos y procesos de retorno.",
      ordenPublico: "Históricamente afectada por el conflicto armado; presencia de grupos armados ilegales.",
      electorales: "Dinámicas marcadas por la reparación de víctimas y liderazgos locales agrarios."
    },
    "Depresión Momposina": {
      demograficas: "Mompós, Cicuco, Talaigua Nuevo. Región con fuerte identidad cultural y colonial.",
      socioeconomicas: "Mompós (NBI 29.20%), Cicuco (NBI 33.94%). Economía basada en turismo cultural y pesca.",
      ordenPublico: "Relativa estabilidad, con retos en el control de rutas fluviales estratégicas.",
      electorales: "Voto tradicional con marcadas tendencias regionalistas."
    },
    "Loba": {
      demograficas: "Barranco de Loba, Pinillos, San Martín de Loba. Población ribereña y dispersa.",
      socioeconomicas: "Barranco (NBI 47.01%), Pinillos (NBI 62.37%). Economía basada en minería y agricultura.",
      ordenPublico: "Presencia de grupos armados ligados al control de economías ilegales (minería).",
      electorales: "Influencia de liderazgos mineros y redes de apoyo local tradicionales."
    },
    "Magdalena Medio": {
      demograficas: "Santa Rosa del Sur, Simití, Morales. Zona de frontera agrícola y minera.",
      socioeconomicas: "Santa Rosa (NBI 28.06%), Simití (NBI 34.59%). Minería de oro y ganadería extensiva.",
      ordenPublico: "Alta conflictividad por control de minería ilegal y presencia de cultivos ilícitos.",
      electorales: "Vulnerabilidad electoral por presión de grupos armados ilegales en zonas rurales."
    },
    "Mojana": {
      demograficas: "Magangué (128,003 hab), Achí, Montecristo. Nodo comercial y fluvial estratégico.",
      socioeconomicas: "Magangué (NBI 26.45%), Achí (NBI 55.92%). Eje comercial, ganadero y de servicios.",
      ordenPublico: "Vulnerabilidad social por inundaciones recurrentes y presencia de grupos armados.",
      electorales: "Magangué es el segundo nodo político más importante del departamento."
    }
  },
  "Atlántico": {
    "Metropolitana": {
      demograficas: "Barranquilla (Capital), Soledad, Malambo, Puerto Colombia, Galapa. Mayor densidad poblacional.",
      socioeconomicas: "Eje industrial y portuario. Dinamismo en servicios y comercio.",
      ordenPublico: "Retos en seguridad urbana, microtráfico y extorsión.",
      electorales: "Voto de opinión fuerte en Barranquilla; estructuras tradicionales en municipios aledaños."
    },
    "Norte": {
      demograficas: "Juan de Acosta, Piojó, Tubará, Usiacurí. Vocación costera.",
      socioeconomicas: "Turismo, artesanías y desarrollo inmobiliario de segunda vivienda.",
      ordenPublico: "Relativa tranquilidad con retos en control territorial periférico.",
      electorales: "Liderazgos locales y fuerte arraigo cultural."
    },
    "Centro": {
      demograficas: "Baranoa, Polonuevo, Sabanalarga, Santo Tomás, Sabanagrande, Palmar de Varela.",
      socioeconomicas: "Nodo agroindustrial y ganadero. Sabanalarga como centro de servicios regional.",
      ordenPublico: "Delincuencia común y retos en seguridad rural.",
      electorales: "Bastión de partidos tradicionales y coaliciones regionales."
    },
    "Sur": {
      demograficas: "Campo de la Cruz, Candelaria, Manatí, Ponedera, Repelón, Santa Lucía, Suan.",
      socioeconomicas: "Agricultura de subsistencia. Históricamente afectada por el fenómeno de La Niña.",
      ordenPublico: "Vulnerabilidad social y presencia de bandas locales.",
      electorales: "Voto condicionado por necesidades básicas insatisfechas (NBI)."
    },
    "Occidente": {
      demograficas: "Luruaco. Zona de transición hacia el sur.",
      socioeconomicas: "Economía agraria y potencial ecoturístico.",
      ordenPublico: "Retos en seguridad rural y control de vías.",
      electorales: "Influencia de liderazgos locales agrarios."
    }
  },
  "Cesar": {
    "Norte": {
      demograficas: "Valledupar (Capital), La Paz, San Diego, Pueblo Bello, Manaure. Concentración urbana y diversidad étnica (Sierra Nevada).",
      socioeconomicas: "Valledupar (NBI 17.8%), Pueblo Bello (NBI 64.6% - el más alto). Eje administrativo y de servicios.",
      ordenPublico: "Seguridad urbana en Valledupar; tensiones territoriales en zonas de resguardos indígenas.",
      electorales: "Principal plaza electoral; fuerte influencia de clanes tradicionales y gremios ganaderos."
    },
    "Noroccidente": {
      demograficas: "Bosconia, El Copey. Nodo de transporte y conexión vial nacional.",
      socioeconomicas: "Bosconia (NBI 31.8%), El Copey (NBI 27.0%). Comercio y servicios logísticos.",
      ordenPublico: "Corredor estratégico; retos en control de microtráfico y extorsión.",
      electorales: "Dinámica política ligada al comercio y transporte."
    },
    "Centro": {
      demograficas: "Agustín Codazzi, La Jagua de Ibirico, Chiriguaná, Becerril. Eje minero del departamento.",
      socioeconomicas: "La Jagua (NBI 21.3%), Becerril (NBI 35.5%). Economía dependiente de la extracción de carbón.",
      ordenPublico: "Conflictividad laboral y social; presencia de grupos armados en zonas rurales.",
      electorales: "Influencia de sindicatos mineros y regalías en la política local."
    },
    "Sur": {
      demograficas: "Aguachica (Segunda ciudad), San Alberto, San Martín, Gamarra. Región con fuerte dinámica comercial y agroindustrial.",
      socioeconomicas: "San Alberto (NBI 13.7% - el más bajo), Aguachica (NBI 18.8%). Palma de aceite y comercio.",
      ordenPublico: "Históricamente afectado por el conflicto; corredor de movilidad hacia el Catatumbo.",
      electorales: "Aguachica como polo de poder independiente de la capital."
    }
  },
  "Magdalena": {
    "Santa Marta": {
      demograficas: "Santa Marta (Distrito Turístico, Cultural e Histórico). Población: 479,853 hab.",
      socioeconomicas: "NBI 14.30%. Eje portuario, turístico y comercial. Principal motor económico.",
      ordenPublico: "Retos de seguridad urbana ligados al narcotráfico y control territorial de bandas.",
      electorales: "Epicentro político del departamento; voto de opinión y fuerzas alternativas."
    },
    "Norte": {
      demograficas: "Ciénaga, Puebloviejo, Sitionuevo, Zona Bananera, El Retén, Aracataca, Fundación, Algarrobo.",
      socioeconomicas: "Zona bananera y portuaria. Ciénaga (NBI 28.53%), Fundación (NBI 25.23%).",
      ordenPublico: "Presencia de grupos armados en la Sierra Nevada y zonas rurales.",
      electorales: "Influencia de sectores agrarios y clanes tradicionales."
    },
    "Centro": {
      demograficas: "Ariguaní, Chivolo, Nueva Granada, Plato, Sabanas de San Ángel, Tenerife.",
      socioeconomicas: "Ganadería y agricultura. Plato (NBI 37.42%), Nueva Granada (NBI 68.55%).",
      ordenPublico: "Retos de seguridad en corredores viales y zonas de pastoreo.",
      electorales: "Voto rural y tradicional."
    },
    "Río": {
      demograficas: "Cerro de San Antonio, Concordia, El Piñón, Pedraza, Pivijay, Remolino, Salamina, Zapayán.",
      socioeconomicas: "Economía ribereña y ganadera. Pivijay (NBI 25.05%), Zapayán (NBI 50.14%).",
      ordenPublico: "Control de rutas fluviales por grupos ilegales.",
      electorales: "Dinámicas políticas locales marcadas por la cercanía al río Magdalena."
    },
    "Sur": {
      demograficas: "El Banco, Guamal, Pijiño del Carmen, San Sebastián de Buenavista, San Zenón, Santa Ana, Santa Bárbara de Pinto.",
      socioeconomicas: "Nodo comercial del sur. El Banco (NBI 32.17%), Santa Ana (NBI 30.64%).",
      ordenPublico: "Zona de frontera con Cesar y Bolívar; retos en seguridad rural.",
      electorales: "El Banco como polo de poder regional independiente de la capital."
    }
  },
  "La Guajira": {
    "Alta Guajira": {
      demograficas: "Uribia, Manaure. Alta concentración de población indígena Wayúu and dispersión rural.",
      socioeconomicas: "Uribia (NBI 88.75%), Manaure (NBI 81.10%). Economía basada en minería (sal), pesca y turismo.",
      ordenPublico: "Retos críticos en acceso a servicios básicos; tensiones territoriales ancestrales.",
      electorales: "Influencia de autoridades tradicionales y clanes locales."
    },
    "Media Guajira": {
      demograficas: "Riohacha (Capital), Maicao, Dibulla, Albania. Eje urbano y comercial del departamento.",
      socioeconomicas: "Riohacha (NBI 36.27%), Maicao (NBI 59.22%). Comercio binacional, servicios y renta minera.",
      ordenPublico: "Inseguridad urbana en Riohacha; contrabando y tráfico en zonas fronterizas.",
      electorales: "Principal plaza electoral; voto de opinión en la capital y estructuras tradicionales."
    },
    "Baja Guajira": {
      demograficas: "Hatonuevo, Barrancas, Fonseca, Distracción, San Juan del Cesar, El Molino, Villanueva, Urumita, La Jagua del Pilar.",
      socioeconomicas: "Fonseca (NBI 19.43%), Villanueva (NBI 18.60%). Vocación agropecuaria y minería de carbón.",
      ordenPublico: "Relativa estabilidad; retos en control fronterizo y delincuencia común.",
      electorales: "Liderazgos locales agrarios y fuerte arraigo cultural."
    }
  },
  "Boyacá": {
    "Provincia del Centro": {
      demograficas: "Tunja (Capital), Chiriví, Cucaita, Chivatá, Motavita, Oicatá, Samacá, Siachoque, Soracá, Sotquirá, Toca, Tuta, Ventaquemada, Cómbita, Sora. Población ~310,000.",
      socioeconomicas: "NBI 8%-12% (indicadores más bajos del depto). Servicios administrativos, educación, minería de carbón (Samacá) y agricultura.",
      ordenPublico: "Estable. Núcleo administrativo y educativo del departamento.",
      electorales: "Centro político; tradición mestiza con fuerte legado Muisca."
    },
    "Sugamuxi y Tundama": {
      demograficas: "Sogamoso, Duitama, Paipa, Tibasosa, Monguí, Nobsa, Iza, Aquitania, Santa Rosa de Viterbo. Población ~360,000.",
      socioeconomicas: "NBI 12%-18%. Siderurgia (Paz del Río), industria automotriz, turismo (Tota, Paipa) y cebolla larga.",
      ordenPublico: "Estable; corredor industrial y comercial más importante de Boyacá.",
      electorales: "Importante nodo económico y comercial; bastión de resistencia histórica."
    },
    "Provincia de Occidente": {
      demograficas: "Chiquinquirá (Capital), Muzo, Otanche, Pauna, Quípama, Maripí, San Pablo de Borbur, Saboyá, Caldas. Población ~175,000.",
      socioeconomicas: "NBI 15%-30%. Capital Mundial de las Esmeraldas, ganadería, cacao, café y comercio religioso.",
      ordenPublico: "Retos en zonas mineras; Chiquinquirá como centro religioso nacional.",
      electorales: "Influencia del sector minero y clero católico."
    },
    "Provincia de Ricaurte": {
      demograficas: "Villa de Leyva, Moniquirá, Santana, Chitaraque, Ráquira, Sutamarchán, Arcabuco. Población ~85,000.",
      socioeconomicas: "NBI 18%-25%. Turismo de alto nivel, artesanías (Ráquira), industria panelera y del bocadillo.",
      ordenPublico: "Muy estable; zona de alto atractivo turístico y arquitectura colonial.",
      electorales: "Voto influenciado por el turismo y la economía naranja."
    },
    "Norte y Gutiérrez": {
      demograficas: "Soatá, El Cocuy, Güicán de la Sierra, Tipacoque, Boavita, La Uvita, Panqueba. Población ~75,000.",
      socioeconomicas: "NBI 35%-48% (alto por aislamiento). Turismo de alta montaña, ecoturismo, agricultura de clima frío y ganado lanar.",
      ordenPublico: "Zona de alta montaña y páramos; presencia comunidad U'wa.",
      electorales: "Voto rural de montaña; importancia de la gestión de parques nacionales."
    },
    "Puerto Boyacá": {
      demograficas: "Puerto Boyacá (municipio único). Población ~55,000. Identidad ribereña similar a Tolima Grande/Antioquia.",
      socioeconomicas: "NBI ~25%. Extracción de petróleo, ganadería extensiva y pesca. Nodo ribereño del Magdalena.",
      ordenPublico: "Dinámicas de enclave petrolero y zona de influencia del río Magdalena.",
      electorales: "Independencia política del altiplano; agenda marcada por hidrocarburos."
    }
  },
  "Caldas": {
    "Centrosur": {
      demograficas: "Manizales (Capital), Chinchiná, Neira, Palestina, Villamaría. Población ~600,000. Predominantemente mestiza.",
      socioeconomicas: "NBI 8%-12%. Servicios, educación superior, industria (metalmecánica, alimentos) y producción de café.",
      ordenPublico: "Estable. Centro administrativo, académico e industrial del departamento.",
      electorales: "Ciudad universitaria; Manizales define gran parte de la dinámica política departamental."
    },
    "Alto Occidente": {
      demograficas: "Filadelfia, La Merced, Marmato, Riosucio, Supía. Población ~135,000. Gran diversidad: Embera Chamí y afrodescendientes.",
      socioeconomicas: "NBI 20%-28%. Minería de oro (Marmato), agricultura (café, caña panelera) y artesanías.",
      ordenPublico: "Tradición minera con retos históricos; Riosucio como centro cultural (Carnaval del Diablo).",
      electorales: "Fuerte influencia de comunidades indígenas y del sector minero."
    },
    "Bajo Occidente": {
      demograficas: "Anserma, Belalcázar, Risaralda, San José, Viterbo. Población ~85,000. Mayoritariamente mestiza.",
      socioeconomicas: "NBI 15%-22%. Agricultura intensiva (café, cítricos, cacao), piscicultura y turismo de descanso.",
      ordenPublico: "Relativa estabilidad; zona de transición hacia los valles del Risaralda.",
      electorales: "Liderazgos locales agrarios; Anserma como nodo histórico."
    },
    "Norte": {
      demograficas: "Aguadas, Aranzazu, Pácora, Salamina. Población ~70,000. Paisa de montaña.",
      socioeconomicas: "NBI 18%-25%. Café, Sombreros de Iraca, ganadería y turismo cultural/patrimonial (Salamina Pueblo Patrimonio).",
      ordenPublico: "Pueblos que conservan la arquitectura de la colonización antioqueña; muy estable.",
      electorales: "Fuerte arraigo tradicional y cultural (Sombrero Aguadeño, Pasillo)."
    },
    "Alto Oriente": {
      demograficas: "Manzanares, Marquetalia, Marulanda, Pensilvania. Población ~75,000. Mestiza.",
      socioeconomicas: "NBI 22%-30%. Café, ganadería ovina (Marulanda), explotación maderera y producción de aguacate.",
      ordenPublico: "Zona de alta montaña con fuerte vocación agrícola; relativa estabilidad.",
      electorales: "Población rural dispersa; dinámicas marcadas por la economía del campo."
    },
    "Magdalena Caldense": {
      demograficas: "La Dorada, Norcasia, Samaná, Victoria. Población ~115,000. Mestiza y afrodescendiente (cultura ribereña).",
      socioeconomicas: "NBI 25%-35%. Ganadería, pesca, energía hidroeléctrica, logística de transporte y ecoturismo.",
      ordenPublico: "Nodo de transporte vital; Samaná tiene indicadores más críticos por extensión rural.",
      electorales: "La Dorada como segundo nodo de poder político independiente de la capital."
    }
  },
  "Chocó": {
    "Atrato (Centro)": {
      demograficas: "Quibdó (capital), Bojayá, Lloró, Medio Atrato, Atrato, Río Quito. Corazón administrativo y comercial.",
      socioeconomicas: "Comercio, servicios gubernamentales y minería artesanal. Quibdó concentra oferta de servicios.",
      ordenPublico: "Inseguridad urbana en Quibdó; crisis humanitaria en zonas rurales; deforestación por minería ilegal.",
      electorales: "Influencia de liderazgos locales y redes tradicionales."
    },
    "San Juan (Sur)": {
      demograficas: "Istmina, Condoto, Tadó, Nóvita, Sipí, Medio San Juan.",
      socioeconomicas: "Minería (oro y platino), agricultura de subsistencia y comercio regional. Istmina es centro estratégico.",
      ordenPublico: "Confinamiento de comunidades étnicas y desplazamientos por disputa ELN y Clan del Golfo.",
      electorales: "Redes políticas ligadas a la minería y comercio regional."
    },
    "Darién (Urabá Chocoano)": {
      demograficas: "Acandí, Unguía, Riosucio, El Carmen del Darién, Belén de Bajirá. Conexión Caribe y frontera Panamá.",
      socioeconomicas: "Ganadería extensiva, madera, agricultura (banano) y turismo (Acandí y Capurganá).",
      ordenPublico: "Crisis migratoria en Tapón del Darién; presión humanitaria; alta deforestación.",
      electorales: "Influencia de sectores ganaderos y madereros; tensión migratoria marca la agenda."
    },
    "Pacífico Norte": {
      demograficas: "Bahía Solano, Nuquí, Juradó. Cara turística y ambiental del Chocó; biodiversidad marina.",
      socioeconomicas: "Ecoturismo (avistamiento de ballenas), pesca artesanal y deportiva. Aislamiento geográfico.",
      ordenPublico: "Infraestructura precaria; vulnerabilidad a rutas de narcotráfico en costas.",
      electorales: "Liderazgos locales enfocados en turismo y medio ambiente."
    },
    "Pacífico Sur (Baudó)": {
      demograficas: "Bajo Baudó (Pizarro), Alto Baudó (Pie de Pató), Medio Baudó (Puerto Meluk), Litoral del San Juan.",
      socioeconomicas: "Pesca, aprovechamiento forestal y cultivos de pancoger. Bajos índices de NBS; aislamiento fluvial.",
      ordenPublico: "Abandono estatal; vulnerabilidad alimentaria; control social estricto por grupos armados.",
      electorales: "Voto condicionado por abandono estatal y presión de grupos armados."
    }
  },
  "Valle del Cauca": {
    "Norte": {
      demograficas: "Alcalá, Ansermanuevo, Argelia, Bolívar, Cartago (capital), El Águila, El Cairo, El Dovio, La Unión, La Victoria, Obando, Roldanillo, Toro, Ulloa, Versalles, Zarzal. Población ~385,000. Influencia paisa.",
      socioeconomicas: "NBI 15%-22%. Agricultura intensiva (caña, frutas, café) y comercio fronterizo.",
      ordenPublico: "Retos en municipios de cordillera (El Cairo, El Águila).",
      electorales: "Fuerte influencia del Eje Cafetero y liderazgos locales."
    },
    "Centro": {
      demograficas: "Tuluá (capital), Buga, Andalucía, Bugalagrande, Calima-El Darién, El Cerrito, Ginebra, Guacarí, Restrepo, Riofrío, San Pedro, Trujillo, Yotoco. Población ~620,000.",
      socioeconomicas: "NBI 12%-18%. Agroindustria (caña, Nestlé), turismo (Lago Calima, Basílica de Buga).",
      ordenPublico: "Retos en zona rural de Trujillo; relativa estabilidad en centros urbanos.",
      electorales: "Tuluá y Buga como nodos de poder regional."
    },
    "Sur": {
      demograficas: "Cali (Capital), Candelaria, Dagua, Florida, Jamundí, La Cumbre, Palmira, Pradera, Vijes, Yumbo. Población ~3,100,000. Gran diversidad étnica.",
      socioeconomicas: "NBI 8%-12%. Servicios, industria pesada (Yumbo), azúcar, logística y educación.",
      ordenPublico: "Conflictos urbanos en Cali; retos de seguridad en Dagua.",
      electorales: "Epicentro político del suroccidente; define elecciones regionales."
    },
    "Oriente": {
      demograficas: "Caicedonia, Sevilla. Población ~105,000. Colonización antioqueña, identidad cafetera.",
      socioeconomicas: "NBI 18%-25%. Café de alta calidad, cítricos, banano y ecoturismo.",
      ordenPublico: "Retos de seguridad rural en la Cordillera Central.",
      electorales: "Identidad cultural diferenciada del resto del departamento."
    },
    "Occidente (Pacífico)": {
      demograficas: "Buenaventura. Población ~315,000. 85% Afrocolombiana; presencia Emberá-Wounaan.",
      socioeconomicas: "NBI >35%. Puerto principal, pesca, minería, madera y turismo de playa (Juanchaco).",
      ordenPublico: "Presión por control de rutas estratégicas; crisis social histórica.",
      electorales: "Retos de gobernanza y alta relevancia política por el puerto."
    }
  },
  "Cauca": {
    "Norte": {
      demograficas: "Santander de Quilichao (capital), Buenos Aires, Caloto, Corinto, Guachené, Miranda, Padilla, Puerto Tejada, Suárez, Villa Rica. Población ~440,000.",
      socioeconomicas: "NBI 18%-25%. Agroindustria (caña), manufactura y minería. Beneficiada por Ley Páez.",
      ordenPublico: "Presencia de grupos armados en zonas de ladera; tensiones interétnicas.",
      electorales: "Polo industrial y fuerte base afrodescendiente e indígena."
    },
    "Centro": {
      demograficas: "Popayán (Capital), Cajibío, El Tambo, La Sierra, Morales, Piendamó, Rosas, Sotará, Timbío. Población ~510,000.",
      socioeconomicas: "NBI 20%-28%. Servicios, educación, turismo religioso, café de alta calidad y ganadería.",
      ordenPublico: "Históricamente estable en el núcleo urbano, retos en zonas rurales de El Tambo.",
      electorales: "Popayán como epicentro político y cultural del departamento."
    },
    "Sur": {
      demograficas: "Almaguer, Argelia, Balboa, Bolívar, Florencia, La Vega, Mercaderes, Patía (El Bordo), Piamonte, San Sebastián, Santa Rosa, Sucre. Población ~265,000.",
      socioeconomicas: "NBI 30%-45%. Agricultura de subsistencia, ganadería, minería artesanal y café.",
      ordenPublico: "Escenario de conflictos por control territorial; importancia hídrica (Macizo Colombiano).",
      electorales: "Diversidad étnica (afro en Patía, indígena y mestiza en montaña)."
    },
    "Oriente": {
      demograficas: "Inzá, Páez (Belalcázar), Puracé (Coconuco), Totoró. Población ~110,000. Región montañosa.",
      socioeconomicas: "NBI 35%-50%. Turismo arqueológico (Tierradentro), café, ganadería de leche y papa.",
      ordenPublico: "Fuerte gobernanza indígena y autonomía territorial.",
      electorales: "Baluarte de movimientos sociales indígenas (Nasa, Misak)."
    },
    "Occidente (Pacífico)": {
      demograficas: "Guapi (capital), López de Micay, Timbiquí. Población ~95,000. Mayoritariamente afrocolombiana (90%).",
      socioeconomicas: "NBI 55%-70% (crítico). Pesca, minería de aluvión, madera y coco.",
      ordenPublico: "Abandono estatal; control social por grupos armados; enorme riqueza cultural (Marimba).",
      electorales: "Liderazgos comunitarios y consejos comunitarios afrodescendientes."
    }
  },
  "Nariño": {
    "Zona Centro": {
      demograficas: "Pasto (Capital), Tangua, Buesaco, Arboleda, San Lorenzo, El Tablón de Gómez, San José de Albán, Sandoná, Consacá, Ancuya, Linares. Núcleo político-administrativo.",
      socioeconomicas: "NBI 10%-25%. Servicios, comercio, artesanías (Barniz de Pasto), café, caña panelera.",
      ordenPublico: "Históricamente estable, retos en zonas rurales de Juanambú.",
      electorales: "Pasto como bastión conservador histórico; voto de opinión fuerte."
    },
    "Zona Sur / Frontera": {
      demograficas: "Ipiales (capital), Aldana, Cuaspud, Cumbal, Guachucal, Gualmatán, Iles, Potosí, Puerres, Pupiales, Túquerres, Guaitarilla, Imués, Ospina, Sapuyes. Intercambio binacional.",
      socioeconomicas: "NBI 15%-28%. Comercio con Ecuador, turismo religioso (Las Lajas), papa, leche.",
      ordenPublico: "Retos en control fronterizo y contrabando.",
      electorales: "Fuerte identidad indígena (Nación de los Pastos)."
    },
    "Zona Norte": {
      demograficas: "La Unión (capital), Belén, La Cruz, San Bernardo, San Pablo, Génova. Transición cafetera.",
      socioeconomicas: "NBI 20%-32%. Producción masiva de café de alta calidad, cítricos y comercio regional.",
      ordenPublico: "Relativa estabilidad, corredor histórico hacia el Cauca.",
      electorales: "Liderazgos locales agrarios y comerciantes de café."
    },
    "Zona de Occidente y Cordillera": {
      demograficas: "Samaniego, Santacruz, El Peñol, El Tambo, La Llanada, Los Andes, Cumbitara, El Rosario, Leiva, Policarpa, Taminango.",
      socioeconomicas: "NBI 30%-45%. Minería de oro, agricultura de subsistencia, café y cítricos.",
      ordenPublico: "Conflictos por el control de rutas hacia el mar; aislamiento geográfico.",
      electorales: "Presencia de movimientos sociales y retos de participación ciudadana."
    },
    "Zona Pacífico y Piedemonte": {
      demograficas: "Tumaco (capital), Francisco Pizarro, Barbacoas, Magüí Payán, Roberto Payán, El Charco, La Tola, Mosquera, Olaya Herrera, Santa Bárbara, Ricaurte.",
      socioeconomicas: "NBI 45%-65% (crítico). Operación portuaria, pesca, madera, cacao, palma africana.",
      ordenPublico: "Crisis humanitaria recurrente; presencia de grupos armados; narcotráfico.",
      electorales: "Importancia política de Tumaco; consejos comunitarios afro e indígenas Awá."
    }
  },
  "Cundinamarca": {
    "Sabana Centro": {
      demograficas: "Cajicá, Chía, Cogua, Cota, Gachancipá, Nemocón, Sopó, Tabio, Tenjo, Tocancipá, Zipaquirá (Capital). Población ~620,000.",
      socioeconomicas: "NBI 3%-5%. Industria pesada, flores de exportación, servicios logísticos y minería de sal.",
      ordenPublico: "Estable. Provincia más dinámica e industrializada, fuerte integración con Bogotá.",
      electorales: "Antiguo corazón del Zipazgo Muisca. Zipaquirá fue clave por sus minas de sal."
    },
    "Sabana Occidente": {
      demograficas: "Bojacá, El Rosal, Facatativá (Capital), Funza, Madrid, Mosquera, Subachoque, Zipacón. Población ~580,000.",
      socioeconomicas: "NBI 4%-7%. Floricultura (mayor productor nacional), agroindustria, centros logísticos y manufactura.",
      ordenPublico: "Eje de la conexión con el occidente del país.",
      electorales: "Facatativá (Piedras del Tunjo) fue lugar de retiro de los Zipas."
    },
    "Soacha": {
      demograficas: "Sibaté, Soacha (Capital). Población ~1,150,000. Altísima diversidad por migración interna.",
      socioeconomicas: "NBI 12%-15%. Industria minera, manufactura, servicios y agricultura de papa.",
      ordenPublico: "Retos por explosión demográfica urbana y sectores críticos en comunas.",
      electorales: "Ciudad dormitorio y zona industrial más densa de la región."
    },
    "Alto Magdalena": {
      demograficas: "Agua de Dios, Girardot (Capital), Guataquí, Jerusalén, Nariño, Nilo, Ricaurte, Tocaima. Población ~210,000.",
      socioeconomicas: "NBI 10%-18%. Turismo de sol, servicios hoteleros, comercio y ganadería.",
      ordenPublico: "Relativa estabilidad; principal destino recreativo y de descanso.",
      electorales: "Girardot creció como el puerto fluvial más importante para conectar con el ferrocarril."
    },
    "Sumapaz": {
      demograficas: "Arbeláez, Cabrera, Fusagasugá (Capital), Granada, Pandi, Pasca, San Bernardo, Silvania, Tibacuy, Venecia. Población ~280,000.",
      socioeconomicas: "NBI 12%-20%. Producción de café, frutas, viveros y turismo ecológico.",
      ordenPublico: "Región de vocación ambiental, hogar del páramo más grande del mundo.",
      electorales: "Epicentro de las luchas agrarias en el siglo XX; Fusagasugá 'Ciudad Jardín'."
    },
    "Ubaté": {
      demograficas: "Carmen de Carupa, Cucunubá, Fúquene, Guachetá, Lenguazaque, Simijaca, Susa, Sutatausa, Tausa, Ubaté (Capital). Población ~105,000.",
      socioeconomicas: "NBI 14%-18%. Despensa láctea: producción masiva de leche y quesos; minería de carbón (coque).",
      ordenPublico: "Estable; vocación agro-minera.",
      electorales: "Importante nodo comercial del norte del departamento."
    },
    "Tequendama": {
      demograficas: "Anapoima, Anolaima, Apulo, Cachipay, El Colegio, La Mesa (Capital), Quipile, San Antonio del Tequendama, Tena, Viotá. Población ~180,000.",
      socioeconomicas: "NBI 15%-22%. Turismo, cultivo de café, frutas tropicales y follajes.",
      ordenPublico: "Provincia de transición climática y alta diversidad biológica.",
      electorales: "La Mesa como eje histórico y administrativo de la provincia."
    }
  },
  "Huila": {
    "Norte": {
      demograficas: "Neiva (Capital), Aipe, Algeciras, Baraya, Campoalegre, Colombia, Hobo, Íquira, Palermo, Rivera, Santa María, Tello, Teruel, Villavieja y Yaguará. ~620,000 hab. Predominantemente mestiza, presencia Nasa (Páez).",
      socioeconomicas: "NBI 10%-12% (Neiva), hasta 25% (Colombia/Baraya). Petróleo (Aipe/Neiva), Arroz (Campoalegre), Turismo (Desierto Tatacoa).",
      ordenPublico: "Centro administrativo y de servicios dominado por la capital y el valle del Magdalena.",
      electorales: "Neiva tuvo tres fundaciones ante resistencia indígena (1612). Villavieja fue la primera capital."
    },
    "Centro": {
      demograficas: "Garzón (Capital), Altamira, El Agrado, Gigante, Guadalupe, Pital, Suaza y Tarqui. ~185,000 hab. Mestiza.",
      socioeconomicas: "NBI 18%-26%. Café alta calidad, cacao, Achiras (Altamira), Sombrero Suaza, Energía (Represa El Quimbo).",
      ordenPublico: "Fuerte tradición religiosa y cafetera; eje de la 'Huila Grande'.",
      electorales: "Garzón: 'Alma Diocesana' (primera sede episcopal). Gigante: 'Ceiba de la Libertad' (abolición esclavitud)."
    },
    "Sur": {
      demograficas: "Pitalito (Capital), Acevedo, Elías, Isnos, Oporapa, Palestina, Saladoblanco, San Agustín y Timaná. ~340,000 hab. Herencia Andaquí y Yalcón.",
      socioeconomicas: "NBI 22%-32%. Pitalito: mayor productor café del país. Turismo arqueológico (San Agustín) y ecológico.",
      ordenPublico: "Epicentro arqueológico y cultural. Mayor productor de café de Colombia.",
      electorales: "San Agustín: Patrimonio Humanidad. Timaná (1538): rebelión Cacica Gaitana."
    },
    "Occidente": {
      demograficas: "La Plata (Capital), La Argentina, Nátaga, Paicol y Tesalia. ~125,000 hab. Fuerte presencia Nasa (Páez).",
      socioeconomicas: "NBI 24%-35%. Comercio regional, café, ganadería doble propósito, Turismo (Caja de Agua - Paicol).",
      ordenPublico: "Zona montañosa con riqueza hídrica vinculando Alto Magdalena y el Pacífico.",
      electorales: "La Plata: antiguo centro minero colonial. Nátaga: peregrinación (Virgen de las Mercedes)."
    }
  },
  "Risaralda": {
    "I: Área Metropolitana": {
      demograficas: "Pereira (Capital), Dosquebradas y La Virginia. Población ~750,000. Ubicada en valle del Otún y cuenca del Cauca. Predominantemente mestiza, minoría afro en La Virginia.",
      socioeconomicas: "NBI 6%-9%. Motor económico: comercio masivo, servicios financieros, industria y logística (Puerto Dulce de La Virginia).",
      ordenPublico: "Zona con mejores indicadores socioeconómicos del departamento.",
      electorales: "Pereira fundada 1863 sobre Cartago colonial. Dosquebradas núcleo industrial; La Virginia puerto fluvial clave."
    },
    "II: Centro / Norte": {
      demograficas: "Santa Rosa de Cabal y Marsella. Población ~105,000. Mayoritariamente mestiza (paisa de montaña). Esencia del Eje Cafetero.",
      socioeconomicas: "NBI 12%-16%. Turismo de salud (Termales), Café, cítricos y producción de chorizos típicos.",
      ordenPublico: "Marsella categorizado como 'municipio verde' por su conservación arquitectónica y ambiental.",
      electorales: "Santa Rosa: punto neurálgico en colonización antioqueña. Tradición de arquitectura colonial antioqueña."
    },
    "III: Occidente": {
      demograficas: "Apía, Balboa, Belén de Umbría, Guática, La Celia, Mistrató, Pueblo Rico, Quinchía y Santuario. Población ~135,000. Alta diversidad étnica: Embera Chamí y afro en Pueblo Rico/Mistrató.",
      socioeconomicas: "NBI 18% (Apía) hasta 40% (Pueblo Rico). Café de alta calidad (Belén es líder), Minería de oro (Quinchía), Cacao y Aguacate Hass.",
      ordenPublico: "Frontera con el Chocó; territorio ancestral Quimbaya con geografía compleja.",
      electorales: "Muchos nacieron de la minería antes de girar al café. Pueblo Rico y Mistrató son puentes hacia la selva del Pacífico."
    }
  }
};

export const NATIONAL_MUNICIPALITIES: Record<string, Record<string, string[]>> = {
  "Antioquia": {
    "Magdalena Medio": ["Puerto Berrío", "Puerto Nare", "Puerto Triunfo", "Maceo", "Caracolí", "Yondó"],
    "Nordeste": ["Segovia", "Remedios", "Amalfi", "Anorí", "Cisneros", "San Roque", "Santo Domingo", "Yolombó", "Vegachí", "Yalí"],
    "Norte": ["Ituango", "Santa Rosa de Osos", "Donmatías", "San Pedro de los Milagros", "Valdivia", "Yarumal", "Briceño", "Campamento", "Toledo", "San Andrés de Cuerquia", "Entrerríos", "Belmira", "Gómez Plata", "Carolina del Príncipe", "Guadalupe", "San José de la Montaña", "Angostura"],
    "Occidente": ["Santa Fe de Antioquia", "San Jerónimo", "Sopetrán", "Buriticá", "Dabeiba", "Frontino", "Peque", "Cañasgordas", "Uramita", "Armenia", "Heliconia", "Ebéjico", "Sabanalarga", "Liborina", "Olaya", "Giraldo", "Anzá", "Caicedo", "Abriaquí"],
    "Oriente": ["Rionegro", "Marinilla", "La Ceja", "El Carmen de Viboral", "Guarne", "El Retiro", "El Santuario", "San Vicente Ferrer", "La Unión", "Guatapé", "El Peñol", "San Rafael", "San Carlos", "Alejandría", "Concepción", "Granada", "Cocorná", "San Luis", "San Francisco", "Sonsón", "Abejorral", "Argelia", "Nariño"],
    "Suroeste": ["Andes", "Urrao", "Ciudad Bolívar", "Jericó", "Fredonia", "Amagá", "Santa Bárbara", "Salgar", "Titiribí", "Concordia", "Venecia", "Tarso", "Pueblorrico", "Hispania", "Betania", "Betulia", "Támesis", "Jardín", "La Pintada", "Valparaíso", "Caramanta", "Montebello", "Angelópolis"],
    "Urabá": ["Apartadó", "Turbo", "Carepa", "Chigorodó", "Necoclí", "Arboletes", "San Juan de Urabá", "San Pedro de Urabá", "Mutatá", "Vigía del Fuerte", "Murindó"],
    "Valle de Aburrá": ["Medellín", "Envigado", "Bello", "Itagüí", "Sabaneta", "La Estrella", "Caldas", "Copacabana", "Girardota", "Barbosa"],
    "Bajo Cauca": ["Caucasia", "El Bagre", "Tarazá", "Zaragoza", "Cáceres", "Nechí"]
  },
  "Bogotá D.C.": {
    "Bogotá": ["Bogotá D.C."]
  },
  "Caldas": {
    "Centrosur": ["Manizales", "Chinchiná", "Neira", "Palestina", "Villamaría"],
    "Alto Occidente": ["Filadelfia", "La Merced", "Marmato", "Riosucio", "Supía"],
    "Bajo Occidente": ["Anserma", "Belalcázar", "Risaralda", "San José", "Viterbo"],
    "Norte": ["Aguadas", "Aranzazu", "Pácora", "Salamina"],
    "Alto Oriente": ["Manzanares", "Marquetalia", "Marulanda", "Pensilvania"],
    "Magdalena Caldense": ["La Dorada", "Norcasia", "Samaná", "Victoria"]
  },
  "Cundinamarca": {
    "Sabana Centro": ["Cajicá", "Chía", "Cogua", "Cota", "Gachancipá", "Nemocón", "Sopó", "Tabio", "Tenjo", "Tocancipá", "Zipaquirá"],
    "Sabana Occidente": ["Bojacá", "El Rosal", "Facatativá", "Funza", "Madrid", "Mosquera", "Subachoque", "Zipacón"],
    "Soacha": ["Sibaté", "Soacha"],
    "Alto Magdalena": ["Agua de Dios", "Girardot", "Guataquí", "Jerusalén", "Nariño", "Nilo", "Ricaurte", "Tocaima"],
    "Sumapaz": ["Arbeláez", "Cabrera", "Fusagasugá", "Granada", "Pandi", "Pasca", "San Bernardo", "Silvania", "Tibacuy", "Venecia"],
    "Ubaté": ["Carmen de Carupa", "Cucunubá", "Fúquene", "Guachetá", "Lenguazaque", "Simijaca", "Susa", "Sutatausa", "Tausa", "Ubaté"],
    "Tequendama": ["Anapoima", "Anolaima", "Apulo", "Cachipay", "El Colegio", "La Mesa", "Quipile", "San Antonio del Tequendama", "Tena", "Viotá"]
  },
  "Atlántico": {
    "Metropolitana": ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia", "Galapa"],
    "Norte": ["Juan de Acosta", "Piojó", "Tubará", "Usiacurí"],
    "Centro": ["Baranoa", "Polonuevo", "Sabanalarga (Atlántico)", "Santo Tomás", "Sabanagrande", "Palmar de Varela"],
    "Sur": ["Campo de la Cruz", "Candelaria", "Manatí", "Ponedera", "Repelón", "Santa Lucía", "Suan"],
    "Occidente": ["Luruaco"]
  },
  "Córdoba": {
    "Alto Sinú": ["Tierralta", "Valencia"],
    "Bajo Sinú": ["Lorica", "San Bernardo del Viento", "San Pelayo", "Purísima", "Chimá", "Momil", "Cotorra", "San Antero"],
    "Centro": ["Montería", "Cereté"],
    "Costanera": ["Canalete", "Puerto Escondido", "Los Córdobas", "Moñitos"],
    "Sabanas": ["Sahagún", "San Andrés de Sotavento", "San Carlos (Córdoba)", "Chinú", "Ciénaga de Oro", "Tuchín"],
    "San Jorge": ["Montelíbano", "Puerto Libertador", "Planeta Rica", "Ayapel", "Pueblo Nuevo", "Buenavista", "La Apartada", "San José de Uré"]
  },
  "Sucre": {
    "Mojana": ["Majagual", "Sucre (Sucre)", "Guaranda"],
    "Montes de María": ["Sincelejo", "Corozal", "Los Palmitos", "Morroa", "Ovejas", "Colosó", "Chalán"],
    "Morrosquillo": ["Santiago de Tolú", "Coveñas", "San Onofre", "Tolú Viejo", "Palmito"],
    "Sabanas": ["Buenavista (Sucre)", "El Roble", "Galeras", "Sampués", "San Juan de Betulia", "San Pedro (Sucre)", "San Luis de Sincé"],
    "San Jorge": ["San Marcos", "San Benito Abad", "Caimito", "La Unión (Sucre)"]
  },
  "Bolívar": {
    "Dique": ["Cartagena", "Arjona", "Arroyohondo", "Calamar", "Clemencia", "Mahates", "Maria La Baja", "San Estanislao", "San Cristobal", "Santa Catalina", "Santa Rosa", "Soplaviento", "Turbaco", "Turbaná", "Villanueva"],
    "Montes de María": ["El Carmen de Bolívar", "El Guamo", "San Jacinto", "San Juan Nepomuceno", "Zambrano", "Córdoba (Bolívar)"],
    "Depresión Momposina": ["Mompós", "Cicuco", "Hatillo de Loba", "Margarita", "San Fernando", "Talaigua Nuevo"],
    "Loba": ["Altos del Rosario", "Barranco de Loba", "El Peñón", "Norosí", "Pinillos", "Regidor", "Río Viejo", "San Martín de Loba", "Tiquisio"],
    "Magdalena Medio": ["Arenal", "Cantagallo", "Morales", "Santa Rosa del Sur", "Simití", "San Pablo"],
    "Mojana": ["Achí", "Magangué", "Montecristo", "San Jacinto del Cauca"]
  },
  "Cesar": {
    "Norte": ["Valledupar", "La Paz", "San Diego", "Pueblo Bello", "Manaure Balcón Del Cesar"],
    "Noroccidente": ["Bosconia", "El Copey"],
    "Centro": ["Agustín Codazzi", "Becerril", "Chiriguaná", "Curumaní", "La Jagua De Ibirico", "Astrea", "Chimichagua", "El Paso"],
    "Sur": ["Aguachica", "Gamarra", "González", "La Gloria", "Pailitas", "Pelaya", "Río De Oro", "San Alberto", "San Martín", "Tamalameque"]
  },
  "Magdalena": {
    "Santa Marta": ["Santa Marta"],
    "Norte": ["Ciénaga", "Puebloviejo", "Sitionuevo", "Zona Bananera", "El Retén", "Aracataca", "Fundación", "Algarrobo"],
    "Centro": ["Ariguaní", "Chivolo", "Nueva Granada", "Plato", "Sabanas de San Ángel", "Tenerife"],
    "Río": ["Cerro de San Antonio", "Concordia (Magdalena)", "El Piñón", "Pedraza", "Pivijay", "Remolino", "Salamina", "Zapayán"],
    "Sur": ["El Banco", "Guamal", "Pijiño del Carmen", "San Sebastián de Buenavista", "San Zenón", "Santa Ana", "Santa Bárbara de Pinto"]
  },
  "La Guajira": {
    "Alta Guajira": ["Uribia", "Manaure"],
    "Media Guajira": ["Riohacha", "Maicao", "Dibulla", "Albania"],
    "Baja Guajira": ["Hatonuevo", "Barrancas", "Fonseca", "Distracción", "San Juan del Cesar", "El Molino", "Villanueva (La Guajira)", "Urumita", "La Jagua del Pilar"]
  },
  "Boyacá": {
    "Provincia del Centro": ["Tunja", "Chiriví", "Cucaita", "Chivatá", "Motavita", "Oicatá", "Samacá", "Siachoque", "Soracá", "Sotquirá", "Toca", "Tuta", "Ventaquemada", "Cómbita", "Sora"],
    "Sugamuxi y Tundama": ["Sogamoso", "Duitama", "Paipa", "Tibasosa", "Monguí", "Nobsa", "Iza", "Aquitania", "Santa Rosa de Viterbo"],
    "Provincia de Occidente": ["Chiquinquirá", "Muzo", "Otanche", "Pauna", "Quípama", "Maripí", "San Pablo de Borbur", "Saboyá", "Caldas"],
    "Provincia de Ricaurte": ["Villa de Leyva", "Moniquirá", "Santana", "Chitaraque", "Ráquira", "Sutamarchán", "Arcabuco"],
    "Norte y Gutiérrez": ["Soatá", "El Cocuy", "Güicán de la Sierra", "Tipacoque", "Boavita", "La Uvita", "Panqueba"],
    "Puerto Boyacá": ["Puerto Boyacá"]
  },
  "Chocó": {
    "Atrato (Centro)": ["Quibdó", "Bojayá", "Lloró", "Medio Atrato", "Atrato", "Río Quito"],
    "San Juan (Sur)": ["Istmina", "Condoto", "Tadó", "Nóvita", "Sipí", "Medio San Juan"],
    "Darién (Urabá Chocoano)": ["Acandí", "Unguía", "Riosucio", "El Carmen del Darién", "Belén de Bajirá"],
    "Pacífico Norte": ["Bahía Solano", "Nuquí", "Juradó"],
    "Pacífico Sur (Baudó)": ["Bajo Baudó", "Alto Baudó", "Medio Baudó", "Litoral del San Juan"]
  },
  "Valle del Cauca": {
    "Norte": ["Alcalá", "Ansermanuevo", "Argelia", "Bolívar", "Cartago", "El Águila", "El Cairo", "El Dovio", "La Unión", "La Victoria", "Obando", "Roldanillo", "Toro", "Ulloa", "Versalles", "Zarzal"],
    "Centro": ["Andalucía", "Bugalagrande", "Guadalajara de Buga", "Calima-El Darién", "El Cerrito", "Ginebra", "Guacarí", "Restrepo", "Riofrío", "San Pedro", "Trujillo", "Tuluá", "Yotoco"],
    "Sur": ["Cali", "Candelaria", "Dagua", "Florida", "Jamundí", "La Cumbre", "Palmira", "Pradera", "Vijes", "Yumbo"],
    "Oriente": ["Caicedonia", "Sevilla"],
    "Occidente (Pacífico)": ["Buenaventura"]
  },
  "Cauca": {
    "Norte": ["Buenos Aires", "Caloto", "Corinto", "Guachené", "Miranda", "Padilla", "Puerto Tejada", "Santander de Quilichao", "Suárez", "Villa Rica"],
    "Centro": ["Cajibío", "El Tambo", "La Sierra", "Morales", "Piendamó", "Popayán", "Rosas", "Sotará", "Timbío"],
    "Sur": ["Almaguer", "Argelia", "Balboa", "Bolívar", "Florencia", "La Vega", "Mercaderes", "Patía", "Piamonte", "San Sebastián", "Santa Rosa", "Sucre"],
    "Oriente": ["Inzá", "Páez", "Puracé", "Totoró"],
    "Occidente (Pacífico)": ["Guapi", "López de Micay", "Timbiquí"]
  },
  "Nariño": {
    "Zona Centro": ["Pasto", "Tangua", "Buesaco", "Arboleda", "San Lorenzo", "El Tablón de Gómez", "San José de Albán", "Sandoná", "Consacá", "Ancuya", "Linares"],
    "Zona Sur / Frontera": ["Ipiales", "Aldana", "Cuaspud", "Cumbal", "Guachucal", "Gualmatán", "Iles", "Potosí", "Puerres", "Pupiales", "Túquerres", "Guaitarilla", "Imués", "Ospina", "Sapuyes"],
    "Zona Norte": ["La Unión", "Belén", "La Cruz", "San Bernardo", "San Pablo", "Génova"],
    "Zona de Occidente y Cordillera": ["Samaniego", "Santacruz", "El Peñol", "El Tambo", "La Llanada", "Los Andes", "Cumbitara", "El Rosario", "Leiva", "Policarpa", "Taminango"],
    "Zona Pacífico y Piedemonte": ["Tumaco", "Francisco Pizarro", "Barbacoas", "Magüí Payán", "Roberto Payán", "El Charco", "La Tola", "Mosquera", "Olaya Herrera", "Santa Bárbara", "Ricaurte"]
  },
  "Huila": {
    "Norte": ["Neiva", "Aipe", "Algeciras", "Baraya", "Campoalegre", "Colombia", "Hobo", "Íquira", "Palermo", "Rivera", "Santa María", "Tello", "Teruel", "Villavieja", "Yaguará"],
    "Centro": ["Garzón", "Altamira", "El Agrado", "Gigante", "Guadalupe", "Pital", "Suaza", "Tarqui"],
    "Sur": ["Pitalito", "Acevedo", "Elías", "Isnos", "Oporapa", "Palestina", "Saladoblanco", "San Agustín", "Timaná"],
    "Occidente": ["La Plata", "La Argentina", "Nátaga", "Paicol", "Tesalia"]
  },
  "Risaralda": {
    "I: Área Metropolitana": ["Pereira", "Dosquebradas", "La Virginia"],
    "II: Centro / Norte": ["Santa Rosa de Cabal", "Marsella"],
    "III: Occidente": ["Apía", "Balboa", "Belén de Umbría", "Guática", "La Celia", "Mistrató", "Pueblo Rico", "Quinchía", "Santuario"]
  }
};

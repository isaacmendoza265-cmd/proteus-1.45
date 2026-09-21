/**
 * PROYECTO PROTEUS 1.2
 * Catálogo Exhaustivo de Segmentación de Votantes & Audiencias Estratégicas
 * Taxonomía Completa Multidimensional (Demográfica, Socioeconómica, Gremial, Psicológica y Comunitaria)
 */

export interface VoterAudienceGroup {
  id: string;
  name: string;
  category: VoterAudienceCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  shareEstimatedNational: number; // Porcentaje del censo estimado (%)
  priority: 'Pivotal' | 'Alta' | 'Media' | 'Blanda';
  dominantPains: string[];
  effectiveChannels: string[];
  psychologicalTrigger: string;
  winningArgument: string;
  counterObjection: string;
}

export type VoterAudienceCategory = 
  | 'generacional'
  | 'genero-familia'
  | 'estrato-habitat'
  | 'ocupacional-gremial'
  | 'comportamiento-electoral'
  | 'comunitario-fe'
  | 'cohortes-proteus';

export const VOTER_AUDIENCE_CATEGORIES: { id: VoterAudienceCategory; label: string; icon: string; description: string }[] = [
  {
    id: 'generacional',
    label: '1. Ciclo de Vida & Generaciones',
    icon: 'GraduationCap',
    description: 'Segmentos por tramo de edad, aspiraciones de formación, primer empleo y pensiones.'
  },
  {
    id: 'genero-familia',
    label: '2. Género, Cuidado y Familia',
    icon: 'Users',
    description: 'Madres cabeza de hogar, mujeres trabajadoras, padres proveedores y dinámicas del hogar.'
  },
  {
    id: 'estrato-habitat',
    label: '3. Estratos Socioeconómicos & Hábitat',
    icon: 'Home',
    description: 'Desde asentamientos de estrato 1 hasta estratos 5-6 urbanos y comunidades rurales.'
  },
  {
    id: 'ocupacional-gremial',
    label: '4. Sectores Productivos, Ocupaciones & Gremios',
    icon: 'Briefcase',
    description: 'Comerciantes, informales, transportadores, educadores, salud, agro y construcción.'
  },
  {
    id: 'comportamiento-electoral',
    label: '5. Psicología & Comportamiento de Voto',
    icon: 'Brain',
    description: 'Voto indeciso, voto de opinión, abstencionistas a movilizar, voto duro y descontentos.'
  },
  {
    id: 'comunitario-fe',
    label: '6. Fe, Identidad & Tejido Comunitario',
    icon: 'HeartHandshake',
    description: 'Comunidades cristianas y católicas, juntas JAC, colectivos étnicos y sociales.'
  },
  {
    id: 'cohortes-proteus',
    label: '7. Cohortes Cuatridimensionales DANE',
    icon: 'Layers',
    description: 'Cruces analíticos exactos del modelo: Sexo x Edad x Estrato x Educación.'
  }
];

export const VOTER_AUDIENCE_CATALOG: VoterAudienceGroup[] = [
  // =========================================================================
  // 1. CICLO DE VIDA & GENERACIONES
  // =========================================================================
  {
    id: 'gen-jovenes-primerizos',
    name: 'Jóvenes Primerizos y Universitarios (18-24 años)',
    category: 'generacional',
    categoryLabel: 'Ciclo de Vida & Generaciones',
    tagline: 'Votantes digitales primerizos que desconfían de la política tradicional',
    description: 'Estudiantes de educación superior, técnica o bachilleres recién graduados. Buscan su primera oportunidad laboral, gratuidad/créditos justos en educación y libertad de expresión.',
    shareEstimatedNational: 14.2,
    priority: 'Pivotal',
    dominantPains: [
      'Falta de experiencia exigida para el primer empleo',
      'Costos de transporte y matrículas universitarias',
      'Sensación de estancamiento y deseo de emigrar del país',
      'Desconexión con la oratoria política tradicional y acartonada'
    ],
    effectiveChannels: ['TikTok', 'Instagram Reels', 'Memes y Humor Político', 'Activismo Digital', 'Encuentros Universitarios'],
    psychologicalTrigger: 'Esperanza de no tener que irse del país para triunfar; autenticidad radical y rechazo al libreto predecible.',
    winningArgument: 'No te vengo a prometer subsidios eternos; vengo a eliminar las trabas burocráticas para que tu talento sea contratado o fundes tu propia empresa sin que el Estado te asfixie.',
    counterObjection: 'Objeción: "¿Todos los políticos son iguales?". Respuesta: "Precisamente por eso no te hablo con discursos de plaza de hace 30 años, sino con números claros y soluciones que tú mismo puedes auditar."'
  },
  {
    id: 'gen-adultos-jovenes',
    name: 'Adultos Jóvenes y Emprendedores (25-39 años)',
    category: 'generacional',
    categoryLabel: 'Ciclo de Vida & Generaciones',
    tagline: 'Fuerza productiva activa en consolidación de vivienda y familia',
    description: 'Profesionales, empleados medios y emprendedores con proyectos de vida en marcha. Preocupados por créditos hipotecarios, tasas de interés, impuestos e inflación.',
    shareEstimatedNational: 25.8,
    priority: 'Alta',
    dominantPains: [
      'Altas tasas de interés para compra de primera vivienda',
      'Carga tributaria que asfixia a la clase trabajadora independiente',
      'Inseguridad urbana y atracos en transporte o ciclorrutas',
      'Incertidumbre laboral y falta de estabilidad contractual'
    ],
    effectiveChannels: ['LinkedIn', 'Instagram', 'Podcasts de Economía/Política', 'WhatsApp de Grupos de Amigos', 'Prensa Digital'],
    psychologicalTrigger: 'Seguridad patrimonial y certeza de que el esfuerzo propio rinde frutos en lugar de diluirse en impuestos.',
    winningArgument: 'Representamos a los que madrugan y sostienen este país. Mi compromiso es bajar el costo de producir, defender tu propiedad y asegurar que tu esfuerzo construya patrimonio familiar.',
    counterObjection: 'Objeción: "No creo en promesas económicas". Respuesta: "Hablemos de métricas concretas: simplificación de 40 trámites inútiles y alivio directo en tasas para créditos productivos."'
  },
  {
    id: 'gen-adultos-maduros',
    name: 'Adultos Maduros y Jefes de Hogar (40-59 años)',
    category: 'generacional',
    categoryLabel: 'Ciclo de Vida & Generaciones',
    tagline: 'Pilar del sostenimiento familiar y educación de los hijos',
    description: 'Padres y madres con hijos en edad escolar o universitaria. Muy sensibles a los costos de la canasta básica, la seguridad del barrio y la continuidad laboral después de los 40 años.',
    shareEstimatedNational: 28.5,
    priority: 'Alta',
    dominantPains: [
      'Discriminación laboral por edad (difícil conseguir empleo a los 45+)',
      'Preocupación por el futuro y la seguridad de sus hijos frente a las drogas',
      'Agotamiento por el costo de alimentos, servicios públicos y matrículas',
      'Temor a perder la estabilidad lograda con años de trabajo'
    ],
    effectiveChannels: ['Radio Local / Emisoras', 'Facebook', 'WhatsApp Familiar', 'Reuniones de Barrio / Plazas', 'Periódicos'],
    psychologicalTrigger: 'Aversión a la pérdida: proteger lo conseguido con esfuerzo y garantizar un país con orden para sus hijos.',
    winningArgument: 'Sé lo que cuesta levantar una familia en Colombia. Defendemos el orden, la autoridad legítima y el empleo formal para que los padres de familia vivan con dignidad y sin miedo.',
    counterObjection: 'Objeción: "¿Qué pasará con mi pensión?". Respuesta: "Blindaremos los ahorros pensionales de toda la vida contra cualquier intento de expropiación o malgasto gubernamental."'
  },
  {
    id: 'gen-pensionados-mayores',
    name: 'Adultos Mayores y Pensionados (60+ años)',
    category: 'generacional',
    categoryLabel: 'Ciclo de Vida & Generaciones',
    tagline: 'Voto disciplinado, de alta fidelidad cívica y memoria histórica',
    description: 'Población jubilada o adultos mayores vulnerables. Tienen la tasa de participación en urnas más alta (>62%). Valoran el respeto institucional, la salud oportuna y la seguridad en las calles.',
    shareEstimatedNational: 18.6,
    priority: 'Alta',
    dominantPains: [
      'Demoras en citas médicas especializadas y entrega de medicamentos',
      'Pérdida del poder adquisitivo de las mesadas pensionales por inflación',
      'Inseguridad en parques y transporte público (temor al atraco)',
      'Sensación de soledad y desamparo estatal en la vejez'
    ],
    effectiveChannels: ['Radio AM / FM', 'Televisión Abierta', 'Misas / Templos', 'Grupos de la Tercera Edad', 'Volantes Físicos'],
    psychologicalTrigger: 'Respeto, gratitud y tranquilidad: un líder firme que preserve la paz, la institucionalidad y garantice su medicina.',
    winningArgument: 'Ustedes construyeron este país y merecen una vejez en paz y con respeto. Garantizaremos entrega inmediata de medicamentos y mano dura contra quienes amenazan la tranquilidad en los barrios.',
    counterObjection: 'Objeción: "¿Nos van a quitar las ayudas?". Respuesta: "Al contrario: auditaremos cada peso para que el subsidio llegue íntegro al adulto mayor sin intermediarios corruptos."'
  },

  // =========================================================================
  // 2. GÉNERO, CUIDADO Y FAMILIA
  // =========================================================================
  {
    id: 'fam-madres-cabeza',
    name: 'Madres Cabeza de Hogar y Cuidadoras Populares',
    category: 'genero-familia',
    categoryLabel: 'Género, Cuidado y Familia',
    tagline: 'Heroínas cotidianas que sostienen el hogar solas bajo doble jornada',
    description: 'Mujeres jefas de hogar solteras, separadas o viudas con hijos a cargo. Viven con ingresos limitados del rebusque o empleos no formales, requiriendo redes de cuidado y alivio en la canasta.',
    shareEstimatedNational: 16.4,
    priority: 'Pivotal',
    dominantPains: [
      'Falta de guarderías o centros infantiles seguros para dejar a los hijos mientras trabajan',
      'Costo asfixiante de la comida y el arriendo',
      'Violencia intrafamiliar y desamparo jurídico en demandas de alimentos',
      'Acoso y microtráfico que acecha a los jóvenes a la salida del colegio'
    ],
    effectiveChannels: ['WhatsApp Comunitario', 'Líderes Barriales / Madres Comunitarias', 'Facebook Grupos Locales', 'Megáfonos Barriales'],
    psychologicalTrigger: 'Protección para sus hijos y alivio económico inmediato: saber que el candidato cuidará lo que a ellas les duele.',
    winningArgument: 'Para una madre soltera cada día es una batalla. Implementaremos centros de cuidado infantil nocturnos y de jornada extendida, microcréditos sin fiador para sus emprendimientos y entornos escolares blindados.',
    counterObjection: 'Objeción: "Siempre prometen y no cumplen a las mujeres". Respuesta: "No vengo con discursos de género abstractos, sino con guarderías abiertas, becas técnicas para sus hijos y crédito directo a su cuenta."'
  },
  {
    id: 'fam-mujeres-profesionales',
    name: 'Mujeres Trabajadoras, Profesionales y Líderes',
    category: 'genero-familia',
    categoryLabel: 'Género, Cuidado y Familia',
    tagline: 'Mujeres autónomas, educadas y con fuerte decisión de voto de opinión',
    description: 'Empresarias, ejecutivas, profesoras y líderes sociales con estudios superiores. Exigen meritocracia, seguridad en el espacio público y cero tolerancia con la impunidad en violencia de género.',
    shareEstimatedNational: 15.1,
    priority: 'Alta',
    dominantPains: [
      'Brecha salarial y techos de cristal en cargos directivos',
      'Acoso y sensación de inseguridad en transporte público y calles oscuras',
      'Sobrecarga de trabajo no remunerado de cuidado en el hogar',
      'Impunidad en casos de agresiones físicas y psicológicas'
    ],
    effectiveChannels: ['LinkedIn', 'Instagram', 'Twitter / X', 'Eventos Empresariales y Foros', 'Prensa de Opinión'],
    psychologicalTrigger: 'Meritocracia, dignidad, seguridad efectiva y erradicación del machismo político paternalista.',
    winningArgument: 'Las mujeres no necesitan tutela estatal; necesitan cancha nivelada, seguridad en cada calle y respeto a su liderazgo. Fortaleceremos la justicia rápida contra agresores y el crédito empresarial femenino.',
    counterObjection: 'Objeción: "¿El candidato apoya realmente la igualdad?". Respuesta: "Con hechos: gabinete 50% paritario por estricto mérito y botón de pánico conectado con reacción policial en menos de 4 minutos."'
  },
  {
    id: 'fam-padres-proveedores',
    name: 'Padres de Familia y Trabajadores Proveedores',
    category: 'genero-familia',
    categoryLabel: 'Género, Cuidado y Familia',
    tagline: 'Hombres trabajadores centrados en la manutención y honor de su hogar',
    description: 'Hombres asalariados o independientes que cargan con la responsabilidad del sustento de su esposa e hijos. Valoran la disciplina, el trabajo honrado y el orden social.',
    shareEstimatedNational: 19.8,
    priority: 'Media',
    dominantPains: [
      'Inestabilidad en el trabajo y sueldos que no alcanzan para el fin de mes',
      'Preocupación por la descomposición social y delincuencia juvenil',
      'Desprotección frente a despidos o quiebras de negocios'
    ],
    effectiveChannels: ['WhatsApp de Trabajo', 'Radio Deportiva / Transmisiones de Fútbol', 'Talleres y Centros de Trabajo'],
    psychologicalTrigger: 'Orgullo de proveer honradamente; defensa de la dignidad del trabajador frente al asistencialismo degradante.',
    winningArgument: 'El trabajo duro debe premiarse, no castigarse con más impuestos. Defendemos el empleo formal, la industria nacional y la autoridad para que los hombres honestos saquen adelante a sus familias.',
    counterObjection: 'Objeción: "¿Habrá más empleo?". Respuesta: "Reduciendo el impuesto al empleo formal e incentivando a las empresas que contraten mano de obra local."'
  },

  // =========================================================================
  // 3. ESTRATOS SOCIOECONÓMICOS & HÁBITAT
  // =========================================================================
  {
    id: 'est-vulnerables-1-2',
    name: 'Estratos 1 y 2: Asentamientos y Familias Populares',
    category: 'estrato-habitat',
    categoryLabel: 'Estratos Socioeconómicos & Hábitat',
    tagline: 'Sectores populares en la lucha diaria por servicios básicos y dignidad',
    description: 'Comunidades de laderas, barrios periféricos y asentamientos informales. Afectados por precariedad en acueducto, riesgo de deslizamientos y falta de alcantarillado.',
    shareEstimatedNational: 46.2,
    priority: 'Pivotal',
    dominantPains: [
      'Falta de agua potable continua y cobros excesivos en servicios públicos',
      'Presencia de combos y bandas que cobran vacuna y reclutan menores',
      'Viviendas sin legalización ni títulos de propiedad',
      'Hambre y nutrición deficiente en la primera infancia'
    ],
    effectiveChannels: ['Volanteo Puerta a Puerta', 'Reuniones en Canchas Barriales', 'Megafonía', 'WhatsApp Comunitario'],
    psychologicalTrigger: 'Esperanza real de progreso palpable; cercanía humana del candidato y obras que se vean en el barrio.',
    winningArgument: 'La dignidad no se promete, se construye: titulación gratuita de predios populares, agua potable garantizada y mano firme para sacar a las bandas que extorsionan la tienda del barrio.',
    counterObjection: 'Objeción: "Los ricos no entienden a los pobres". Respuesta: "Isaac Mendoza camina sus calles, come en sus comedores y conoce el valor del esfuerzo de los barrios que no se rinden."'
  },
  {
    id: 'est-clase-media-3-4',
    name: 'Estratos 3 y 4: Clase Media Trabajadora Urbana',
    category: 'estrato-habitat',
    categoryLabel: 'Estratos Socioeconómicos & Hábitat',
    tagline: 'El motor tributario del país que paga todo y no recibe nada',
    description: 'Familias de barrios consolidados con profesionales, comerciantes y empleados formales. Sienten que el Estado los exprime a impuestos sin darles seguridad ni vías decentes.',
    shareEstimatedNational: 34.7,
    priority: 'Pivotal',
    dominantPains: [
      'Alzas desmedidas en el impuesto predial y tarifas de servicios',
      'Tráfico insoportable, trancones y deterioro del transporte masivo',
      'Inseguridad: hurto de celulares, vehículos y robos a mano armada',
      'Falta de cupos escolares de calidad y endeudamiento educativo'
    ],
    effectiveChannels: ['Instagram', 'LinkedIn', 'Portales Web de Noticias', 'Grupos Vecinales de WhatsApp', 'Foros Ciudadanos'],
    psychologicalTrigger: 'Indignación justiciera: exigir que el Estado devuelva en seguridad e infraestructura lo que cobra en impuestos.',
    winningArgument: 'La clase media no aguanta más que la traten como un cajero automático del gobierno. Frenaremos el alza del predial, combatiremos el hurto urbano con cámaras de IA y arreglaremos las vías.',
    counterObjection: 'Objeción: "¿Bajarán los impuestos?". Respuesta: "Congelaremos el avalúo catastral desmedido y recortaremos el gasto burocrático inútil para aliviar a los hogares de estratos 3 y 4."'
  },
  {
    id: 'est-altos-ingresos-5-6',
    name: 'Estratos 5 y 6: Empresarios, Inversionistas y Contribuyentes',
    category: 'estrato-habitat',
    categoryLabel: 'Estratos Socioeconómicos & Hábitat',
    tagline: 'Generadores de inversión, capital y empleo calificado',
    description: 'Sectores residenciales de alta renta (ej. El Poblado, Envigado lomas, Rionegro campestre). Buscan certidumbre jurídica, defensa del libre mercado y freno al populismo estatista.',
    shareEstimatedNational: 6.8,
    priority: 'Alta',
    dominantPains: [
      'Fuga de capitales e incertidumbre regulatoria y tributaria',
      'Deterioro del orden público que frena la inversión',
      'Corrupción y clientelismo en las compras estatales',
      'Ataques ideológicos a la empresa privada y a la iniciativa individual'
    ],
    effectiveChannels: ['Prensa Económica (La República, Portafolio)', 'Gremios y Cámaras de Comercio', 'LinkedIn', 'Eventos Privados'],
    psychologicalTrigger: 'Defensa de las libertades individuales, de la propiedad privada y de la democracia frente a modelos autoritarios.',
    winningArgument: 'El enemigo de Colombia no es quien genera riqueza, sino la corrupción y el populismo. Blindaremos la institucionalidad, bajaremos cargas a la inversión y garantizaremos seguridad de clase mundial.',
    counterObjection: 'Objeción: "¿Es un candidato confiable?". Respuesta: "Trayectoria intachable, visión técnica respaldada en datos duros y firmeza innegociable con el Estado de Derecho."'
  },
  {
    id: 'est-campesinos-rurales',
    name: 'Campesinos, Veredas y Productores Agropecuarios',
    category: 'estrato-habitat',
    categoryLabel: 'Estratos Socioeconómicos & Hábitat',
    tagline: 'Los guardianes de la tierra y la soberanía alimentaria en la montaña',
    description: 'Habitantes de corregimientos y veredas rurales (cafeteros, lecheros, horticultores, plataneros). Su vida gira en torno al estado de los caminos y el precio justo de sus cosechas.',
    shareEstimatedNational: 12.3,
    priority: 'Alta',
    dominantPains: [
      'Vías terciarias intransitables que pudren las cosechas en invierno',
      'Altísimo costo de abonos, concentrados y fertilizantes',
      'Intermediarios abusivos que se quedan con la ganancia del productor',
      'Falta de internet rural y escuelas veredales en mal estado'
    ],
    effectiveChannels: ['Radio Comunitaria', 'Reuniones en Plazas de Mercado y Veredas', 'WhatsApp Rural', 'Visitas Finca a Finca'],
    psychologicalTrigger: 'Respeto al campesino, vías transitables para sacar productos y subsidio directo al costo de insumos.',
    winningArgument: 'El campo es el corazón de Antioquia y Colombia. Duplicaremos los combos de maquinaria para placas huella veredales y subsidiaremos fertilizantes para que sembrar vuelva a ser rentable.',
    counterObjection: 'Objeción: "Los políticos solo vienen en elecciones a la vereda". Respuesta: "No vengo a tomarme fotos; firmo el compromiso de los primeros 100 kilómetros de placa huella con las JAC veredales."'
  },

  // =========================================================================
  // 4. SECTORES PRODUCTIVOS, OCUPACIONES & GREMIOS
  // =========================================================================
  {
    id: 'grem-comerciantes-pymes',
    name: 'Comerciantes Formales y Pequeñas Pymes',
    category: 'ocupacional-gremial',
    categoryLabel: 'Sectores Productivos, Ocupaciones & Gremios',
    tagline: 'Dueños de tiendas, ferreterías, panaderías y talleres asediados por la extorsión',
    description: 'Microempresarios de barrio y zonas comerciales. Viven bajo la amenaza del boleteo, vacunas extorsivas y la asfixia del impuesto de Industria y Comercio (ICA).',
    shareEstimatedNational: 11.8,
    priority: 'Pivotal',
    dominantPains: [
      'Cobro sistemático de extorsión ("vacunas" semanales) por combos ilegales',
      'Trámites engorrosos de Sayco, bomberos, secretaría de salud y DIAN',
      'Competencia desleal del contrabando y lavado de dinero',
      'Crédito bancario denegado que los empuja al peligroso "gota a gota"'
    ],
    effectiveChannels: ['Asociaciones de Comerciantes / Asoguabales / Fenalco', 'WhatsApp de Comercios', 'Recorridos Peatonales'],
    psychologicalTrigger: 'Liberación de la extorsión criminal y respeto a su condición de generadores de riqueza local.',
    winningArgument: 'Basta de que un delincuente cobre la renta del negocio que usted levantó con sudor. Crearemos el Escuadrón Antiextorsión Élite con denuncia digital anónima y cámaras de reconocimiento facial.',
    counterObjection: 'Objeción: "Si denuncio me matan". Respuesta: "La denuncia será 100% blindada por inteligencia militar y captura preventiva inmediata de cabecillas."'
  },
  {
    id: 'grem-informales-rebusque',
    name: 'Trabajadores Informales y Ventas del Rebusque',
    category: 'ocupacional-gremial',
    categoryLabel: 'Sectores Productivos, Ocupaciones & Gremios',
    tagline: 'Vendedores ambulantes, coteros y rebuscadores del día a día',
    description: 'Personas que viven de la venta callejera o changas diarias. Se sienten perseguidos por el espacio público y esclavizados por los prestamistas del "gota a gota".',
    shareEstimatedNational: 18.2,
    priority: 'Alta',
    dominantPains: [
      'Decomiso de mercancías y persecución policial sin alternativas',
      'Intereses usureros del 20% mensual del prestamista "gota a gota"',
      'Falta absoluta de pensión, cesantías o seguro de accidentes',
      'Incertidumbre de no saber si hoy habrá para la comida de la noche'
    ],
    effectiveChannels: ['Radio Popular', 'Megafonía Móvil', 'Líderes de Ventas Ambulantes', 'Puerta a Puerta'],
    psychologicalTrigger: 'Dignidad sin persecución: alternativas de crédito legal de bajo monto y formalización voluntaria con beneficios.',
    winningArgument: 'El rebusque no es un delito, es la respuesta honrada de quien no se deja morir de hambre. Crearemos el Banco de la Oportunidad para prestar sin fiador a tasa cero y derrotar al gota a gota.',
    counterObjection: 'Objeción: "Nos van a quitar de la calle". Respuesta: "Primero va la reubicación en módulos dignos y el crédito productivo antes de cualquier intervención en espacio público."'
  },
  {
    id: 'grem-transportadores-taxistas',
    name: 'Transportadores, Taxistas y Conductores de Apps',
    category: 'ocupacional-gremial',
    categoryLabel: 'Sectores Productivos, Ocupaciones & Gremios',
    tagline: 'Gremio del volante en lucha por seguridad vial, combustibles y fotomultas',
    description: 'Taxistas, conductores de Uber/Didi, camioneros de carga y mototaxistas. Pasan 12 a 16 horas al volante. Tienen una enorme capacidad de replicar mensajes boca a boca con pasajeros.',
    shareEstimatedNational: 8.5,
    priority: 'Pivotal',
    dominantPains: [
      'Alza continua en el precio de la gasolina y el ACPM',
      'Fotomultas trampa escondidas con fines recaudatorios y no preventivos',
      'Atracos y asesinatos de conductores en zonas periféricas en la noche',
      'Conflictos de regulación entre taxis tradicionales y aplicaciones'
    ],
    effectiveChannels: ['Canales de Radio de Taxis', 'Grupos de WhatsApp y Zello de Conductores', 'Lavaderos de Autos'],
    psychologicalTrigger: 'Solidaridad de gremio: alguien que defienda al conductor contra el abuso de las fotomultas y el precio del galón.',
    winningArgument: 'El conductor mueve la economía y no puede seguir siendo la caja menor de los municipios. Auditaremos y desmontaremos las cámaras de fotomultas abusivas y blindaremos la seguridad en turnos nocturnos.',
    counterObjection: 'Objeción: "¿Y el conflicto apps vs taxi?". Respuesta: "Piso parejo: reducción de costos de cupos para taxistas y regulación justa de aportes para apps, protegiendo el trabajo de todos."'
  },
  {
    id: 'grem-salud-medicos',
    name: 'Sector Salud: Médicos, Enfermeros y Personal Clínico',
    category: 'ocupacional-gremial',
    categoryLabel: 'Sectores Productivos, Ocupaciones & Gremios',
    tagline: 'La primera línea asistencial agotada por atrasos de sueldos y politiquería',
    description: 'Profesionales y técnicos de hospitales públicos y clínicas privadas. Denuncian precarización por órdenes de prestación de servicios (OPS) y retrasos en pagos por crisis de EPS.',
    shareEstimatedNational: 4.8,
    priority: 'Media',
    dominantPains: [
      'Contratos basura por prestación de servicios sin estabilidad',
      'Falta de insumos, medicamentos y camillas en urgencias',
      'Atrasos de 3 a 6 meses en el pago de salarios por colapso hospitalario',
      'Sobrecarga laboral extrema con turnos de 24 y 36 horas'
    ],
    effectiveChannels: ['Sociedades Médicas', 'Twitter / X', 'LinkedIn', 'WhatsApp de Turnos'],
    psychologicalTrigger: 'Dignificación del acto médico: pago puntual sagrado y hospitales dotados sin politiquería en las gerencias.',
    winningArgument: 'Quien cuida la vida merece dignidad. Garantizaremos giro directo de recursos a las nóminas hospitalarias para que nunca más se demore el sueldo de un médico o enfermera, y formalización laboral progresiva.',
    counterObjection: 'Objeción: "¿Cómo financiarlo?". Respuesta: "Eliminando la intermediación corrupta en los contratos hospitalarios y priorizando el presupuesto de salud."'
  },
  {
    id: 'grem-docentes-magisterio',
    name: 'Docentes, Maestros y Trabajadores Educativos',
    category: 'ocupacional-gremial',
    categoryLabel: 'Sectores Productivos, Ocupaciones & Gremios',
    tagline: 'Educadores que forman a las nuevas generaciones en colegios y universidades',
    description: 'Profesores de colegios públicos y privados. Valoran el escalafón docente, la calidad de la salud magisterial y el estado de la infraestructura en las aulas.',
    shareEstimatedNational: 5.2,
    priority: 'Media',
    dominantPains: [
      'Pésimo servicio de salud y demoras en atención para los maestros',
      'Colegios con techos rotos, sin computadores ni internet para enseñar',
      'Riesgos de seguridad y amenazas de bandas en zonas de conflicto escolar',
      'Estancamiento en la homologación y ascensos en el escalafón'
    ],
    effectiveChannels: ['Asociaciones de Educadores (Adida / Fecode)', 'Redes Pedagógicas', 'Facebook Grupos Docentes'],
    psychologicalTrigger: 'Reconocimiento social y condiciones dignas: que la educación sea prioridad de Estado y no botín burocrático.',
    winningArgument: 'Un país es tan grande como sean respetados sus maestros. Modernizaremos los colegios con laboratorios STEM, arreglaremos el modelo de salud docente y premiaremos la innovación pedagógica en el aula.',
    counterObjection: 'Objeción: "¿Habrá confrontación con el magisterio?". Respuesta: "El diálogo y el respeto a los derechos adquiridos son la base; trabajaremos de la mano con los educadores."'
  },

  // =========================================================================
  // 5. PSICOLOGÍA & COMPORTAMIENTO DE VOTO
  // =========================================================================
  {
    id: 'psic-indecisos-pragmaticos',
    name: 'Votantes Indecisos y Desencantados (Swing Voters)',
    category: 'comportamiento-electoral',
    categoryLabel: 'Psicología & Comportamiento de Voto',
    tagline: 'El 25-30% que decide las elecciones a última hora según sensatez',
    description: 'Ciudadanos moderados que no militan en ningún partido. Rechazan el fanatismo de extremos, escrutan la hoja de vida del candidato y buscan a alguien preparado y con serenidad para gobernar.',
    shareEstimatedNational: 26.5,
    priority: 'Pivotal',
    dominantPains: [
      'Fatiga por la polarización y peleas de odio entre políticos',
      'Miedo a votar por alguien que resulte ser un corrupto o un incompetente',
      'Promesas absurdas que violan las leyes de la economía',
      'Falta de propuestas claras y medibles'
    ],
    effectiveChannels: ['Debates Televisados', 'Entrevistas a Fondo en Medios Serios', 'Prensa Independiente', 'Boca a Boca de Expertos'],
    psychologicalTrigger: 'Tranquilidad, preparación técnica, equilibrio y certeza de que el candidato sabe exactamente qué hacer desde el primer día.',
    winningArgument: 'Ni odio ni improvisación. Proyecto Proteus no es un eslogan, es un plan milimétrico con metas, presupuesto auditado y equipo de primer nivel para poner a funcionar las cosas sin peleas estériles.',
    counterObjection: 'Objeción: "¿Por qué creerle a Isaac Mendoza?". Respuesta: "Mire el plan técnico, compare las hojas de vida y juzgue por los resultados demostrados, no por las promesas vacías."'
  },
  {
    id: 'psic-voto-duro-institucional',
    name: 'Voto Duro de Centro-Derecha / Orden Institucional',
    category: 'comportamiento-electoral',
    categoryLabel: 'Psicología & Comportamiento de Voto',
    tagline: 'Base firme que exige ley, orden, respeto a la Fuerza Pública y libre empresa',
    description: 'Votantes tradicionales y de centro-derecha convencidos. Defienden la patria, los símbolos patrios, la policía y el ejército, y el modelo de economía de mercado.',
    shareEstimatedNational: 22.0,
    priority: 'Alta',
    dominantPains: [
      'Debilitamiento de la moral de la Policía y las Fuerzas Militares',
      'Avance de grupos guerrilleros y bandas con impunidad territorial',
      'Discursos de odio contra la propiedad privada y la empresa libre',
      'Desorden urbano, vandalismo y permisividad con el microtráfico'
    ],
    effectiveChannels: ['Grupos de WhatsApp de Reserva Activa', 'Twitter / X', 'Columnas de Opinión', 'Foros de Seguridad'],
    psychologicalTrigger: 'Firmeza inquebrantable, orgullo patrio y determinación para restaurar el principio de autoridad.',
    winningArgument: 'La ley se cumple, el orden se respeta y la Fuerza Pública se defiende sin vacilaciones. Con nosotros la delincuencia retrocede y la ciudadanía honesta vuelve a caminar tranquila.',
    counterObjection: 'Objeción: "¿Tendrá el carácter para enfrentar a los violentos?". Respuesta: "Carácter demostrado sin titubeos ni pactos oscuros con el crimen; la autoridad legítima del Estado prevalecerá."'
  },
  {
    id: 'psic-voto-bronco-descontento',
    name: 'Voto Bronco Anti-Establecimiento y de Protesta',
    category: 'comportamiento-electoral',
    categoryLabel: 'Psicología & Comportamiento de Voto',
    tagline: 'Ciudadanos furiosos con el despilfarro, la corrupción y los privilegios',
    description: 'Votantes indignados que quieren "castigar" a los mismos de siempre. Su voto es emocional, impulsado por el hartazgo frente al robo de recursos públicos y la arrogancia política.',
    shareEstimatedNational: 17.5,
    priority: 'Alta',
    dominantPains: [
      'Robo descarado del presupuesto público sin castigo judicial',
      'Sueldos astronómicos y camionetas blindadas de la clase política',
      'Obras públicas inconclusas (elefantes blancos) que costaron fortunas',
      'Sienten que el sistema está arreglado en contra del ciudadano de a pie'
    ],
    effectiveChannels: ['Videos Virales de Denuncia (TikTok / Reels)', 'Redes Sociales Frontales', 'Discursos de Confrontación Directa'],
    psychologicalTrigger: 'Catarsis de indignación y deseo de un líder justiciero que corte privilegios y meta a los corruptos a la cárcel.',
    winningArgument: 'Se les acabó la fiesta a los que se enriquecieron con la plata del pueblo. Eliminaremos camionetas y contratos a dedo; cada peso robado será perseguido con extinción de dominio express.',
    counterObjection: 'Objeción: "¿Usted es de los mismos?". Respuesta: "Mi independencia se demuestra en que no le debo un solo favor a ningún cacique ni contratista de este país."'
  },
  {
    id: 'psic-abstencionistas-cronicos',
    name: 'Abstencionistas Crónicos a Movilizar (Voto Silencioso)',
    category: 'comportamiento-electoral',
    categoryLabel: 'Psicología & Comportamiento de Voto',
    tagline: 'El 45-50% que nunca vota porque siente que nada cambia',
    description: 'El mayor "partido" de Colombia: la abstención. Piensan que la política es un circo inútil. Solo se movilizan si sienten un llamado de urgencia vital o un beneficio personal directo e incuestionable.',
    shareEstimatedNational: 48.0,
    priority: 'Pivotal',
    dominantPains: [
      'Sensación de inutilidad del voto: "Gane quien gane, mañana tengo que madrugar igual"',
      'Colas en los puestos de votación bajo el sol para nada',
      'Decepción acumulada tras décadas de promesas rotas'
    ],
    effectiveChannels: ['Boca a Boca de Familiares Cercanos', 'WhatsApp Directo Persona a Persona', 'Humor y Sátira Política Desmitificadora'],
    psychologicalTrigger: 'Demostrarles que su abstención es el voto que los corruptos usan para perpetuarse: "Si no decides tú, deciden los que te roban".',
    winningArgument: 'Si usted no vota, ellos ganan automáticamente. Quedarse en la casa es votar por los que le subieron el mercado. Salga y rompa el juego de los que quieren que usted no cuente.',
    counterObjection: 'Objeción: "A mí la política no me da de comer". Respuesta: "Pero una mala política sí le quita el pan de la mesa con más impuestos y menos empleo. Defienda lo suyo en 10 minutos."'
  },

  // =========================================================================
  // 6. FE, IDENTIDAD & TEJIDO COMUNITARIO
  // =========================================================================
  {
    id: 'com-cristianos-evangelicos',
    name: 'Comunidades Religiosas Cristianas y Evangélicas',
    category: 'comunitario-fe',
    categoryLabel: 'Fe, Identidad & Tejido Comunitario',
    tagline: 'Congregaciones con altísima cohesión social, principios éticos y valores',
    description: 'Fieles de iglesias cristianas, pastores y líderes juveniles. Tienen redes de apoyo comunitario extraordinarias, rehabilitación de adictos y defensa de la familia tradicional.',
    shareEstimatedNational: 18.0,
    priority: 'Alta',
    dominantPains: [
      'Ataques a la libertad religiosa y de conciencia',
      'Descomposición del tejido familiar y drogadicción en los jóvenes',
      'Imposición de ideologías forzadas en los planes escolares de sus hijos',
      'Falta de reconocimiento a la labor social y de rehabilitación que hacen las iglesias'
    ],
    effectiveChannels: ['Canales de Pastores y Líderes', 'Medios y Radios Cristianas', 'Eventos en Auditorios de Fe', 'WhatsApp Pastoral'],
    psychologicalTrigger: 'Coherencia moral, defensa de la libertad de culto, protección de los niños y respaldo a su labor social.',
    winningArgument: 'Reconocemos y protegemos el valor sagrado de la familia y la libertad de fe. Las iglesias hacen la labor social que el Estado no alcanza a hacer; trabajaremos en alianza para sanar el tejido social.',
    counterObjection: 'Objeción: "¿El candidato respeta nuestros principios?". Respuesta: "Defendemos con convicción inquebrantable el derecho de los padres a educar a sus hijos según sus principios y valores morales."'
  },
  {
    id: 'com-jac-lideres-barriales',
    name: 'Líderes de Juntas de Acción Comunal (JAC) y Ediles',
    category: 'comunitario-fe',
    categoryLabel: 'Fe, Identidad & Tejido Comunitario',
    tagline: 'La estructura capilar del liderazgo comunitario en cada cuadra y vereda',
    description: 'Dignatarios de JAC, Asojuntas y JAL. Son quienes conocen cada hueco, cada lámpara dañada y cada necesidad de los vecinos. Son los grandes movilizadores del voto barrial.',
    shareEstimatedNational: 4.5,
    priority: 'Alta',
    dominantPains: [
      'Presupuesto participativo secuestrado por politiqueros y mafias',
      'Falta de salones comunales y recursos para eventos del barrio',
      'Falta de protección a líderes comunitarios amenazados por combos',
      'Desidia de las alcaldías que nunca contestan los derechos de petición'
    ],
    effectiveChannels: ['Asambleas de Asojuntas', 'WhatsApp de Dignatarios', 'Mesas de Trabajo Barriales'],
    psychologicalTrigger: 'Poder real para ejecutar obras comunitarias y respeto al liderazgo comunal sin intermediarios clientelistas.',
    winningArgument: 'La plata de las obras la deben contratar las propias Juntas de Acción Comunal con mano de obra del barrio, no contratistas forasteros. Descentralizaremos los convenios solidarios comunales.',
    counterObjection: 'Objeción: "¿Nos darán presupuesto directo?". Respuesta: "Convenios solidarios directos por ley hasta el tope máximo para que la JAC ejecute la placa huella o el parque."'
  },
  {
    id: 'com-afro-indigenas',
    name: 'Comunidades Étnicas: Afrocolombianas e Indígenas',
    category: 'comunitario-fe',
    categoryLabel: 'Fe, Identidad & Tejido Comunitario',
    tagline: 'Poblaciones ancestrales en defensa de sus territorios y cultura',
    description: 'Habitantes de consejos comunitarios afro (ej. Urabá, Chocó, Valle) y resguardos indígenas. Exigen cumplimiento de acuerdos, titulación de tierras, salud con enfoque propio y proyectos productivos.',
    shareEstimatedNational: 10.5,
    priority: 'Media',
    dominantPains: [
      'Violencia y desplazamiento forzado por actores armados en sus territorios',
      'Pobreza extrema, falta de hospitales de nivel y escuelas abandonadas',
      'Destrucción ambiental por minería ilegal y narcotráfico',
      'Políticas asistencialistas que no respetan su autonomía ancestral'
    ],
    effectiveChannels: ['Asambleas Comunitarias de Consejos Mayores', 'Emisoras Étnicas', 'Encuentros de Sabedores'],
    psychologicalTrigger: 'Respeto a la dignidad ancestral, protección de la vida en el territorio y proyectos productivos sostenibles.',
    winningArgument: 'El desarrollo de las comunidades étnicas no se impone desde Bogotá; se acuerda con sus autoridades legítimas con inversión real en vías, agua potable y cadenas productivas propias.',
    counterObjection: 'Objeción: "Siempre nos usan para la foto". Respuesta: "Acuerdos vinculantes de inversión con veeduría de los propios consejos comunitarios y resguardos."'
  }
];

export class VoterAudienceService {
  public static getAll(): VoterAudienceGroup[] {
    return VOTER_AUDIENCE_CATALOG;
  }

  public static getByCategory(category: VoterAudienceCategory): VoterAudienceGroup[] {
    return VOTER_AUDIENCE_CATALOG.filter(a => a.category === category);
  }

  public static getById(id: string): VoterAudienceGroup | undefined {
    return VOTER_AUDIENCE_CATALOG.find(a => a.id === id);
  }

  public static search(query: string): VoterAudienceGroup[] {
    const q = query.toLowerCase();
    return VOTER_AUDIENCE_CATALOG.filter(a => 
      a.name.toLowerCase().includes(q) ||
      a.categoryLabel.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.dominantPains.some(p => p.toLowerCase().includes(q))
    );
  }
}

/**
 * Base de Conocimiento Oficial de las 9 Subregiones de Antioquia
 * Extraída de los registros territoriales del aplicativo, DANE (Censo Nacional),
 * Gobernación de Antioquia y consolidados del Sistema General de Participaciones.
 */

export interface SubregionDemographics {
  totalPopulation: number;
  gender: {
    female: number; // porcentaje (ej. 52.8)
    male: number;   // porcentaje (ej. 47.2)
  };
  ageGroups: {
    jovenes18_28: number;   // porcentaje
    adultos29_45: number;   // porcentaje
    adultos46_64: number;   // porcentaje
    mayores65: number;      // porcentaje
  };
  socioeconomicStrata: {
    bajo1_2: number;        // porcentaje
    medio3_4: number;       // porcentaje
    alto5_6: number;        // porcentaje
  };
  educationLevels: {
    primariaSecundaria: number; // porcentaje
    tecnicoTecnologico: number; // porcentaje
    universitario: number;      // porcentaje
    posgrado: number;           // porcentaje
  };
  nbiAverage: number;           // NBI promedio subregional (%)
  informalityRate: number;      // Tasa de informalidad laboral estimada (%)
  averageIncomeSmmlv: number;   // Ingreso promedio en SMMLV
}

export interface SubregionInfo {
  id: string;
  name: string;
  capitalNode: string;
  totalMunicipalities: number;
  municipalities: {
    name: string;
    category: string;
    populationApprox: number;
  }[];
  demographics: SubregionDemographics;
  transversalPains: {
    connectivityAndMobility: string;
    securityAndOrder: string;
    economyAndEmployment: string;
    publicServicesAndHealth: string;
    environmentAndLand: string;
  };
  synthesisStrategicProfile: string;
  colorAccent: string;
}

export const ANTIOQUIA_SUBREGIONS_DATA: Record<string, SubregionInfo> = {
  'valle-de-aburra': {
    id: 'valle-de-aburra',
    name: 'Valle de Aburrá',
    capitalNode: 'Medellín',
    totalMunicipalities: 10,
    colorAccent: 'blue',
    municipalities: [
      { name: 'Medellín', category: 'Especial', populationApprox: 2650000 },
      { name: 'Bello', category: '1', populationApprox: 560000 },
      { name: 'Itagüí', category: '1', populationApprox: 295000 },
      { name: 'Envigado', category: '1', populationApprox: 245000 },
      { name: 'Sabaneta', category: '1', populationApprox: 92000 },
      { name: 'Caldas', category: '2', populationApprox: 85000 },
      { name: 'La Estrella', category: '2', populationApprox: 78000 },
      { name: 'Copacabana', category: '2', populationApprox: 75000 },
      { name: 'Girardota', category: '3', populationApprox: 62000 },
      { name: 'Barbosa', category: '4', populationApprox: 54000 }
    ],
    demographics: {
      totalPopulation: 4196000,
      gender: { female: 52.8, male: 47.2 },
      ageGroups: {
        jovenes18_28: 24.2,
        adultos29_45: 28.5,
        adultos46_64: 28.1,
        mayores65: 19.2
      },
      socioeconomicStrata: {
        bajo1_2: 44.5,
        medio3_4: 44.8,
        alto5_6: 10.7
      },
      educationLevels: {
        primariaSecundaria: 41.2,
        tecnicoTecnologico: 27.6,
        universitario: 24.1,
        posgrado: 7.1
      },
      nbiAverage: 5.1,
      informalityRate: 38.2,
      averageIncomeSmmlv: 1.65
    },
    transversalPains: {
      connectivityAndMobility: 'Saturación vial crítica en el eje longitudinal Norte-Sur (Autopista Norte, Regional y Av. Las Vegas); desarticulación del transporte alimentador intermunicipal y costo elevado del transporte público metropolitano.',
      securityAndOrder: 'Articulación criminal de bandas trans-municipales y combos herederos de "La Oficina"; extorsión generalizada al comercio de barrio y transporte público; plazas de microtráfico en límites intermunicipales (Bello-Medellín, Itagüí-San Antonio de Prado).',
      economyAndEmployment: 'Encarecimiento drástico del costo de vida, gentrificación y crisis de acceso a vivienda digna; subempleo juvenil y barreras para la inserción laboral calificada fuera del centro metropolitano.',
      publicServicesAndHealth: 'Crisis inminente en la disposición final de residuos sólidos (colapso del vaso Altaír en relleno La Pradera); congestión de urgencias en la red hospitalaria de tercer nivel por atención a pacientes remitidos de todo el departamento.',
      environmentAndLand: 'Deterioro recurrente de la calidad del aire (contingencias ambientales por material particulado PM2.5 en marzo y octubre); pérdida de zonas verdes y presión sobre cuencas afluentes del Río Medellín / Aburrá.'
    },
    synthesisStrategicProfile: 'Epicentro metropolitano industrial, financiero y de servicios de Antioquia. Concentra el 60% del PIB departamental. Su electorado se caracteriza por voto de opinión informado, alta demanda de eficiencia en movilidad, seguridad ciudadana y contención de la carestía de vida.'
  },

  'oriente': {
    id: 'oriente',
    name: 'Oriente Antioqueño',
    capitalNode: 'Rionegro',
    totalMunicipalities: 23,
    colorAccent: 'emerald',
    municipalities: [
      { name: 'Rionegro', category: '1', populationApprox: 145000 },
      { name: 'Marinilla', category: '2', populationApprox: 68000 },
      { name: 'La Ceja', category: '2', populationApprox: 65000 },
      { name: 'El Carmen de Viboral', category: '3', populationApprox: 62000 },
      { name: 'Guarne', category: '3', populationApprox: 58000 },
      { name: 'El Retiro', category: '3', populationApprox: 26000 },
      { name: 'El Santuario', category: '3', populationApprox: 38000 },
      { name: 'San Vicente Ferrer', category: '6', populationApprox: 22000 },
      { name: 'La Unión', category: '5', populationApprox: 24000 },
      { name: 'Guatapé', category: '6', populationApprox: 9500 },
      { name: 'El Peñol', category: '5', populationApprox: 20000 },
      { name: 'San Rafael', category: '6', populationApprox: 16000 },
      { name: 'San Carlos', category: '6', populationApprox: 18000 },
      { name: 'Alejandría', category: '6', populationApprox: 4800 },
      { name: 'Concepción', category: '6', populationApprox: 4500 },
      { name: 'Granada', category: '6', populationApprox: 11000 },
      { name: 'Cocorná', category: '6', populationApprox: 17000 },
      { name: 'San Luis', category: '6', populationApprox: 13500 },
      { name: 'San Francisco', category: '6', populationApprox: 6500 },
      { name: 'Sonsón', category: '5', populationApprox: 38000 },
      { name: 'Abejorral', category: '6', populationApprox: 20000 },
      { name: 'Argelia', category: '6', populationApprox: 9800 },
      { name: 'Nariño', category: '6', populationApprox: 11500 }
    ],
    demographics: {
      totalPopulation: 726000,
      gender: { female: 50.8, male: 49.2 },
      ageGroups: {
        jovenes18_28: 21.8,
        adultos29_45: 26.9,
        adultos46_64: 29.5,
        mayores65: 21.8
      },
      socioeconomicStrata: {
        bajo1_2: 56.8,
        medio3_4: 36.4,
        alto5_6: 6.8
      },
      educationLevels: {
        primariaSecundaria: 54.3,
        tecnicoTecnologico: 24.5,
        universitario: 16.8,
        posgrado: 4.4
      },
      nbiAverage: 13.8,
      informalityRate: 46.5,
      averageIncomeSmmlv: 1.35
    },
    transversalPains: {
      connectivityAndMobility: 'Colapso de las arterias viales estructurantes (Autopista Medellín-Bogotá en tramo Guarne-Marinilla y Túnel de Oriente saturado en horas valle y fines de semana); desconexión vial crítica de las subzonas de Páramo (Sonsón-Nariño-Argelia) y Bosques.',
      securityAndOrder: 'Expansión de redes de microtráfico y disputas armadas entre estructuras del Valle de Aburrá (Pachelly, Mesa) que colonizan cabeceras del Altiplano; incremento de hurtos a fincas y residencias campestres.',
      economyAndEmployment: 'Presión inmobiliaria desmedida y gentrificación acelerada que expulsa a las familias campesinas y encarece la canasta familiar; brecha entre el dinamismo industrial/aeroportuario del Altiplano y la pobreza rural en Embalses y Páramo.',
      publicServicesAndHealth: 'Saturación del Hospital San Juan de Dios de Rionegro y clínicas regionales por falta de capacidad resolutiva en los hospitales locales de categorías 5 y 6; déficit de redes de acueducto y alcantarillado en loteos suburbanos.',
      environmentAndLand: 'Amenaza sobre fuentes hídricas y páramos por parcelaciones desreguladas; tensiones entre comunidades campesinas, turismo masivo desordenado (Guatapé/Peñol) y megaproyectos energéticos.'
    },
    synthesisStrategicProfile: 'Segunda subregión más poblada y de mayor dinamismo económico. Combina una zona aeroportuaria e industrial de clase mundial (Altiplano) con zonas de vocación agrícola, hídrica y turística. Bastión histórico de valores tradicionales, familia, propiedad privada y defensa del agro.'
  },

  'suroeste': {
    id: 'suroeste',
    name: 'Suroeste Antioqueño',
    capitalNode: 'Andes / Ciudad Bolívar',
    totalMunicipalities: 23,
    colorAccent: 'amber',
    municipalities: [
      { name: 'Andes', category: '4', populationApprox: 48000 },
      { name: 'Urrao', category: '5', populationApprox: 45000 },
      { name: 'Ciudad Bolívar', category: '5', populationApprox: 29000 },
      { name: 'Jericó', category: '6', populationApprox: 13500 },
      { name: 'Fredonia', category: '6', populationApprox: 23000 },
      { name: 'Amagá', category: '5', populationApprox: 32000 },
      { name: 'Santa Bárbara', category: '5', populationApprox: 24000 },
      { name: 'Salgar', category: '6', populationApprox: 19000 },
      { name: 'Titiribí', category: '6', populationApprox: 13000 },
      { name: 'Concordia', category: '6', populationApprox: 22000 },
      { name: 'Venecia', category: '6', populationApprox: 14500 },
      { name: 'Tarso', category: '6', populationApprox: 8200 },
      { name: 'Pueblorrico', category: '6', populationApprox: 9100 },
      { name: 'Hispania', category: '6', populationApprox: 5400 },
      { name: 'Betania', category: '6', populationApprox: 11000 },
      { name: 'Betulia', category: '6', populationApprox: 17500 },
      { name: 'Támesis', category: '6', populationApprox: 16500 },
      { name: 'Jardín', category: '6', populationApprox: 15500 },
      { name: 'La Pintada', category: '6', populationApprox: 8500 },
      { name: 'Valparaíso', category: '6', populationApprox: 7200 },
      { name: 'Caramanta', category: '6', populationApprox: 5800 },
      { name: 'Montebello', category: '6', populationApprox: 8000 },
      { name: 'Angelópolis', category: '6', populationApprox: 9800 }
    ],
    demographics: {
      totalPopulation: 388000,
      gender: { female: 49.6, male: 50.4 },
      ageGroups: {
        jovenes18_28: 19.5,
        adultos29_45: 24.1,
        adultos46_64: 31.8,
        mayores65: 24.6
      },
      socioeconomicStrata: {
        bajo1_2: 74.2,
        medio3_4: 23.9,
        alto5_6: 1.9
      },
      educationLevels: {
        primariaSecundaria: 68.2,
        tecnicoTecnologico: 18.4,
        universitario: 11.2,
        posgrado: 2.2
      },
      nbiAverage: 19.4,
      informalityRate: 58.6,
      averageIncomeSmmlv: 1.15
    },
    transversalPains: {
      connectivityAndMobility: 'Fallas geológicas recurrentes en la Troncal del Café (sector Sinifaná / Bolombolo); deterioro extremo de la red terciaria veredal que encarece y pudre la cosecha cafetera y frutícola.',
      securityAndOrder: 'Incremento del sicariato y microtráfico rural durante los meses de cosecha cafetera (octubre a diciembre); presencia de estructuras criminales que controlan hospedajes y plazas de vicio veredales.',
      economyAndEmployment: 'Alta dependencia económica del monocultivo del café y vulnerabilidad ante precios internacionales y alza de fertilizantes; envejecimiento acelerado de la fuerza laboral rural y falta de relevo generacional.',
      publicServicesAndHealth: 'Hospitales locales de primer nivel desfinanciados; pacientes crónicos obligados a costosos traslados a Medellín por falta de especialistas y salas de partos en municipios pequeños.',
      environmentAndLand: 'Tensión socio-ambiental aguda entre la vocación agro-turística y patrimonial frente a megaproyectos de minería metálica (cobre en Quebradona / Jericó); riesgo de desabastecimiento hídrico en cuencas altas.'
    },
    synthesisStrategicProfile: 'Cuna del civismo y la cultura cafetera paisa. Población con marcado arraigo comunitario, alta devoción religiosa y apego a la institucionalidad. Prioriza el apoyo al caficultor, el mantenimiento de vías terciarias y la protección del paisaje cultural.'
  },

  'occidente': {
    id: 'occidente',
    name: 'Occidente Antioqueño',
    capitalNode: 'Santa Fe de Antioquia',
    totalMunicipalities: 19,
    colorAccent: 'amber',
    municipalities: [
      { name: 'Santa Fe de Antioquia', category: '4', populationApprox: 27500 },
      { name: 'San Jerónimo', category: '5', populationApprox: 16000 },
      { name: 'Sopetrán', category: '5', populationApprox: 17500 },
      { name: 'Buriticá', category: '6', populationApprox: 10500 },
      { name: 'Dabeiba', category: '6', populationApprox: 26000 },
      { name: 'Frontino', category: '6', populationApprox: 21000 },
      { name: 'Peque', category: '6', populationApprox: 9200 },
      { name: 'Cañasgordas', category: '6', populationApprox: 19000 },
      { name: 'Uramita', category: '6', populationApprox: 8800 },
      { name: 'Armenia Mantequilla', category: '6', populationApprox: 6200 },
      { name: 'Heliconia', category: '6', populationApprox: 6500 },
      { name: 'Ebéjico', category: '6', populationApprox: 13000 },
      { name: 'Sabanalarga', category: '6', populationApprox: 9800 },
      { name: 'Liborina', category: '6', populationApprox: 10200 },
      { name: 'Olaya', category: '6', populationApprox: 3600 },
      { name: 'Giraldo', category: '6', populationApprox: 4500 },
      { name: 'Anzá', category: '6', populationApprox: 8200 },
      { name: 'Caicedo', category: '6', populationApprox: 8800 },
      { name: 'Abriaquí', category: '6', populationApprox: 2700 }
    ],
    demographics: {
      totalPopulation: 209000,
      gender: { female: 49.3, male: 50.7 },
      ageGroups: {
        jovenes18_28: 22.1,
        adultos29_45: 25.8,
        adultos46_64: 28.6,
        mayores65: 23.5
      },
      socioeconomicStrata: {
        bajo1_2: 82.1,
        medio3_4: 16.4,
        alto5_6: 1.5
      },
      educationLevels: {
        primariaSecundaria: 72.8,
        tecnicoTecnologico: 16.2,
        universitario: 9.5,
        posgrado: 1.5
      },
      nbiAverage: 27.2,
      informalityRate: 64.2,
      averageIncomeSmmlv: 1.08
    },
    transversalPains: {
      connectivityAndMobility: 'Aislamiento de municipios de cordillera (Peque, Abriaquí, Giraldo) frente al corredor principal de la vía Mar 1; pérdida de bancada constante en época de invierno y falta de placa huellas.',
      securityAndOrder: 'Control territorial del Clan del Golfo / AGC en corredores intermunicipales hacia Urabá y el Cañón de La Llorona; tensiones y extorsión ligadas a la minería subterránea en Buriticá.',
      economyAndEmployment: 'Economía dual no integrada: enclaves de turismo de sol y condominios en la ribera del Cauca frente a profunda pobreza campesina en municipios de montaña; falta de tecnificación agrícola en frutales y café.',
      publicServicesAndHealth: 'Crónico déficit de agua potable tratada en veredas; precariedad en el manejo de aguas residuales en municipios turísticos de alta afluencia (Santa Fe, Sopetrán, San Jerónimo).',
      environmentAndLand: 'Minería informal y uso de sustancias químicas en cuencas que tributan al río Cauca; desertificación progresiva en el valle seco y desabastecimiento en temporadas de sequía.'
    },
    synthesisStrategicProfile: 'Cuna de la antioqueñidad y patrimonio histórico departamental. Zona de transición estratégica entre el Valle de Aburrá y el mar de Urabá a través de los túneles viales 4G. Exige obras de agua potable rural, apoyo a productores campesinos y mano dura frente a las rentas ilegales.'
  },

  'uraba': {
    id: 'uraba',
    name: 'Urabá Antioqueño',
    capitalNode: 'Apartadó / Turbo',
    totalMunicipalities: 11,
    colorAccent: 'teal',
    municipalities: [
      { name: 'Apartadó', category: '2', populationApprox: 135000 },
      { name: 'Turbo', category: 'Distrito / 2', populationApprox: 130000 },
      { name: 'Carepa', category: '4', populationApprox: 62000 },
      { name: 'Chigorodó', category: '4', populationApprox: 68000 },
      { name: 'Necoclí', category: '5', populationApprox: 48000 },
      { name: 'Arboletes', category: '6', populationApprox: 32000 },
      { name: 'San Juan de Urabá', category: '6', populationApprox: 29000 },
      { name: 'San Pedro de Urabá', category: '6', populationApprox: 34000 },
      { name: 'Mutatá', category: '6', populationApprox: 24000 },
      { name: 'Vigía del Fuerte', category: '6', populationApprox: 8500 },
      { name: 'Murindó', category: '6', populationApprox: 5200 }
    ],
    demographics: {
      totalPopulation: 585700,
      gender: { female: 49.9, male: 50.1 },
      ageGroups: {
        jovenes18_28: 26.5,
        adultos29_45: 28.4,
        adultos46_64: 25.1,
        mayores65: 20.0
      },
      socioeconomicStrata: {
        bajo1_2: 84.6,
        medio3_4: 14.2,
        alto5_6: 1.2
      },
      educationLevels: {
        primariaSecundaria: 69.4,
        tecnicoTecnologico: 19.8,
        universitario: 9.3,
        posgrado: 1.5
      },
      nbiAverage: 33.5,
      informalityRate: 61.8,
      averageIncomeSmmlv: 1.18
    },
    transversalPains: {
      connectivityAndMobility: 'Falta de conexión vial terrestre en el Atrato Medio (Vigía del Fuerte y Murindó incomunicados por carretera); retrasos en vías de acceso y conexiones logísticas para los puertos en construcción (Puerto Antioquia y Puerto Pisisí).',
      securityAndOrder: 'Hegemonía histórica armada del Clan del Golfo (AGC); cobro sistemático de extorsiones a contratistas, transportadores y comerciantes; presión humanitaria extrema por flujos migratorios irregulares en Necoclí hacia el Darién.',
      economyAndEmployment: 'Brecha monumental entre la gran agroindustria bananera/platanera y la precaria economía familiar campesina y pesquera; necesidad urgente de diversificación productiva e industrialización de derivados.',
      publicServicesAndHealth: 'Crisis crónica de cobertura y continuidad en acueducto potable en Turbo, Carepa y corregimientos de Apartadó; alcantarillado deficiente que genera inundaciones fétidas en épocas de lluvia.',
      environmentAndLand: 'Erosión costera severa en Arboletes y San Juan de Urabá; deforestación en la serranía de Abibe y despojo histórico de tierras con procesos lentos de restitución.'
    },
    synthesisStrategicProfile: 'Esquina marítima y salida oceánica de Antioquia. Región con la mayor diversidad étnica (afrodescendientes, indígenas Embera-Katío y mestizos) y con el bono demográfico más joven del departamento. El discurso debe centrarse en empleo portuario local, acueducto digno y seguridad sin vacilaciones.'
  },

  'norte': {
    id: 'norte',
    name: 'Norte Antioqueño',
    capitalNode: 'Santa Rosa de Osos / Yarumal',
    totalMunicipalities: 17,
    colorAccent: 'blue',
    municipalities: [
      { name: 'Santa Rosa de Osos', category: '4', populationApprox: 39000 },
      { name: 'Yarumal', category: '4', populationApprox: 46000 },
      { name: 'Donmatías', category: '5', populationApprox: 24000 },
      { name: 'San Pedro de los Milagros', category: '5', populationApprox: 29000 },
      { name: 'Entrerríos', category: '6', populationApprox: 11000 },
      { name: 'Belmira', category: '6', populationApprox: 7200 },
      { name: 'Ituango', category: '6', populationApprox: 26500 },
      { name: 'Valdivia', category: '6', populationApprox: 21000 },
      { name: 'Briceño', category: '6', populationApprox: 9800 },
      { name: 'Campamento', category: '6', populationApprox: 10200 },
      { name: 'Toledo', category: '6', populationApprox: 6800 },
      { name: 'San Andrés de Cuerquia', category: '6', populationApprox: 7500 },
      { name: 'San José de la Montaña', category: '6', populationApprox: 3800 },
      { name: 'Angostura', category: '6', populationApprox: 12500 },
      { name: 'Carolina del Príncipe', category: '6', populationApprox: 4200 },
      { name: 'Gómez Plata', category: '6', populationApprox: 13500 },
      { name: 'Guadalupe', category: '6', populationApprox: 6800 }
    ],
    demographics: {
      totalPopulation: 279800,
      gender: { female: 49.8, male: 50.2 },
      ageGroups: {
        jovenes18_28: 22.4,
        adultos29_45: 25.6,
        adultos46_64: 29.2,
        mayores65: 22.8
      },
      socioeconomicStrata: {
        bajo1_2: 76.5,
        medio3_4: 21.8,
        alto5_6: 1.7
      },
      educationLevels: {
        primariaSecundaria: 70.1,
        tecnicoTecnologico: 18.2,
        universitario: 10.1,
        posgrado: 1.6
      },
      nbiAverage: 23.8,
      informalityRate: 54.2,
      averageIncomeSmmlv: 1.22
    },
    transversalPains: {
      connectivityAndMobility: 'Bloqueos recurrentes e inestabilidad en la Troncal a la Costa (tramo Yarumal-Valdivia-Puerto Valdivia); vías veredales destruidas en el Cañón del Río Cauca que aíslan a comunidades de Ituango y Briceño.',
      securityAndOrder: 'Violencia endémica en el bajo norte: disputas a sangre y fuego entre Disidencias de las FARC (Frente 36), Clan del Golfo y ELN; confinamiento campesino forzado y uso de minas antipersonal en Ituango y Briceño.',
      economyAndEmployment: 'Crisis de rentabilidad del sector lechero por importaciones de leche en polvo y encarecimiento de concentrados; brecha entre el norte lechero próspero y el norte conflictivo del cañón.',
      publicServicesAndHealth: 'Falta de inversión real y retorno equitativo de los beneficios de la hidroeléctrica Hidroituango hacia los municipios del área de influencia directa; puestos de salud rurales desabastecidos de medicamentos.',
      environmentAndLand: 'Deterioro de la cuenca del Río Cauca; necesidad de preservación estricta de páramos estratégicos como el Páramo de Santa Inés en Belmira frente a la expansión ganadera.'
    },
    synthesisStrategicProfile: 'Despensa lechera, cárnica y energética de Colombia. Caracterizada por la laboriosidad campesina y empresarial del altiplano y la resiliencia en zonas de cordillera. Demanda protección a la producción láctea nacional, orden público contundente y obras viales de placa huella.'
  },

  'bajo-cauca': {
    id: 'bajo-cauca',
    name: 'Bajo Cauca Antioqueño',
    capitalNode: 'Caucasia',
    totalMunicipalities: 6,
    colorAccent: 'amber',
    municipalities: [
      { name: 'Caucasia', category: '3', populationApprox: 125000 },
      { name: 'El Bagre', category: '5', populationApprox: 58000 },
      { name: 'Tarazá', category: '6', populationApprox: 45000 },
      { name: 'Zaragoza', category: '6', populationApprox: 34000 },
      { name: 'Cáceres', category: '6', populationApprox: 38000 },
      { name: 'Nechí', category: '6', populationApprox: 29000 }
    ],
    demographics: {
      totalPopulation: 329000,
      gender: { female: 49.4, male: 50.6 },
      ageGroups: {
        jovenes18_28: 26.2,
        adultos29_45: 27.9,
        adultos46_64: 25.8,
        mayores65: 20.1
      },
      socioeconomicStrata: {
        bajo1_2: 88.7,
        medio3_4: 10.6,
        alto5_6: 0.7
      },
      educationLevels: {
        primariaSecundaria: 75.6,
        tecnicoTecnologico: 15.1,
        universitario: 8.1,
        posgrado: 1.2
      },
      nbiAverage: 42.3,
      informalityRate: 72.5,
      averageIncomeSmmlv: 1.05
    },
    transversalPains: {
      connectivityAndMobility: 'Inundaciones catastróficas que cortan vías en Nechí y Cáceres; desconexión fluvial y carreteras secundarias deterioradas para transportar ganado y productos agropecuarios.',
      securityAndOrder: 'Conflicto armado crónico y violento por el control de dragas auríferas y rutas de coca; presencia hostil de Los Caparros/Virgilios, AGC y ELN; paros mineros violentos con quema de peajes y vehículos.',
      economyAndEmployment: 'Hiper-dependencia de la minería de aluvión no formalizada; falta de bancarización y criminalización del pequeño barequero sin alternativas productivas reales de empleo digno.',
      publicServicesAndHealth: 'Contaminación severa por mercurio en agua y peces que provoca daños neurológicos en niños; acueductos veredales inexistentes y hospitales sumidos en déficits financieros.',
      environmentAndLand: 'Devastación de la llanura aluvial del río Nechí y río Cauca por dragas y motobombas; erosión de riberas e inundaciones recurrentes de las cabeceras urbanas.'
    },
    synthesisStrategicProfile: 'Capital minera y ganadera del norte del departamento, con clima cálido y cultura ribereña fusionada con la costa Caribe. Su ciudadanía exige seguridad efectiva, formalización minera sin persecución al campesino tradicional, empleo juvenil y descontaminación de fuentes hídricas.'
  },

  'magdalena-medio': {
    id: 'magdalena-medio',
    name: 'Magdalena Medio Antioqueño',
    capitalNode: 'Puerto Berrío',
    totalMunicipalities: 6,
    colorAccent: 'indigo',
    municipalities: [
      { name: 'Puerto Berrío', category: '4', populationApprox: 48000 },
      { name: 'Puerto Nare', category: '6', populationApprox: 19500 },
      { name: 'Puerto Triunfo', category: '6', populationApprox: 22000 },
      { name: 'Yondó', category: '6', populationApprox: 21500 },
      { name: 'Maceo', category: '6', populationApprox: 8500 },
      { name: 'Caracolí', category: '6', populationApprox: 5200 }
    ],
    demographics: {
      totalPopulation: 124700,
      gender: { female: 49.2, male: 50.8 },
      ageGroups: {
        jovenes18_28: 23.8,
        adultos29_45: 26.5,
        adultos46_64: 28.4,
        mayores65: 21.3
      },
      socioeconomicStrata: {
        bajo1_2: 81.5,
        medio3_4: 17.3,
        alto5_6: 1.2
      },
      educationLevels: {
        primariaSecundaria: 71.3,
        tecnicoTecnologico: 17.6,
        universitario: 9.6,
        posgrado: 1.5
      },
      nbiAverage: 28.6,
      informalityRate: 59.8,
      averageIncomeSmmlv: 1.12
    },
    transversalPains: {
      connectivityAndMobility: 'Demoras en la reactivación del tren del Magdalena y abandono de la infraestructura portuaria fluvial del río Magdalena; peajes costosos que aíslan comercialmente a los corregimientos de la autopista.',
      securityAndOrder: 'Disputas territoriales entre el Clan del Golfo y bandas locales por el control del tráfico de estupefacientes en Puerto Berrío y Yondó; extorsión silenciosa a ganaderos y comerciantes fluviales.',
      economyAndEmployment: 'Monocultivo de ganadería extensiva con baja generación de empleo formal por hectárea; declive de las regalías petroleras en Yondó sin diversificación agroindustrial sostenible.',
      publicServicesAndHealth: 'Hospitales de primer nivel sin capacidad para cirugías básicas; pacientes con politraumatismos deben ser remitidos a Barrancabermeja o Medellín con graves riesgos en la ruta.',
      environmentAndLand: 'Conflictos por la presencia de hipopótamos invasores en Puerto Triunfo que destruyen cultivos y amenazan pescadores; contaminación de ciénagas y tala indiscriminada en serranías.'
    },
    synthesisStrategicProfile: 'Corredor fluvial, logístico y ganadero estratégico que articula el corazón de Antioquia con el río Magdalena y el interior del país. Electorado pragmático, que reclama reactivación ferroviaria, seguridad rural, inversión en salud local y estímulos para el turismo ecológico.'
  },

  'nordeste': {
    id: 'nordeste',
    name: 'Nordeste Antioqueño',
    capitalNode: 'Segovia / Amalfi',
    totalMunicipalities: 10,
    colorAccent: 'amber',
    municipalities: [
      { name: 'Segovia', category: '4', populationApprox: 43000 },
      { name: 'Remedios', category: '5', populationApprox: 32000 },
      { name: 'Amalfi', category: '5', populationApprox: 26000 },
      { name: 'Anorí', category: '6', populationApprox: 18500 },
      { name: 'Cisneros', category: '6', populationApprox: 10500 },
      { name: 'San Roque', category: '6', populationApprox: 19000 },
      { name: 'Santo Domingo', category: '6', populationApprox: 12000 },
      { name: 'Yolombó', category: '6', populationApprox: 25000 },
      { name: 'Vegachí', category: '6', populationApprox: 14000 },
      { name: 'Yalí', category: '6', populationApprox: 8500 }
    ],
    demographics: {
      totalPopulation: 208500,
      gender: { female: 49.5, male: 50.5 },
      ageGroups: {
        jovenes18_28: 24.1,
        adultos29_45: 26.7,
        adultos46_64: 28.2,
        mayores65: 21.0
      },
      socioeconomicStrata: {
        bajo1_2: 83.9,
        medio3_4: 15.2,
        alto5_6: 0.9
      },
      educationLevels: {
        primariaSecundaria: 73.5,
        tecnicoTecnologico: 16.4,
        universitario: 8.8,
        posgrado: 1.3
      },
      nbiAverage: 34.1,
      informalityRate: 67.4,
      averageIncomeSmmlv: 1.10
    },
    transversalPains: {
      connectivityAndMobility: 'Vías no pavimentadas intransitables entre Remedios, Segovia y Zaragoza; desprendimientos constantes de banca en la vía Porce-Cisneros y falta de mantenimiento en los ramales de la panela.',
      securityAndOrder: 'Confrontación violenta y sistemática entre el Clan del Golfo, el ELN y disidencias de las FARC en la zona rural de Segovia y Remedios; confinamiento de comunidades veredales y paro minero con bloqueos.',
      economyAndEmployment: 'Choque constante entre la minería artesanal/ancestral y los títulos de multinacionales mineras; informalidad generalizada en la cadena del oro y desatención a la cadena cañera y panelera tradicional.',
      publicServicesAndHealth: 'Contaminación de fuentes de agua por vertimiento de cianuro y mercurio; puestos de salud veredales abandonados en zonas de alto riesgo de combate.',
      environmentAndLand: 'Deforestación acelerada de bosques húmedos tropicales en límites con el sur de Bolívar; erosión severa de suelos de ladera por excavaciones mineras.'
    },
    synthesisStrategicProfile: 'Tierras de oro, caña panelera y valentía montañera. Región golpeada históricamente por el conflicto armado pero con inmensa riqueza mineral y agrícola. Sus votantes exigen formalización minera concertada, vías pavimentadas que los integren al Valle de Aburrá y seguridad que devuelva la tranquilidad al campo.'
  }
};

export const OFFICES_OF_INTEREST = [
  { id: 'gobernacion', label: 'Gobernación de Antioquia', scope: 'Departamental Ejecutivo', nature: 'Plan departamental de desarrollo, presupuesto de inversiones, seguridad regional y obras públicas mayores.' },
  { id: 'asamblea', label: 'Asamblea Departamental', scope: 'Departamental Normativo / Control', nature: 'Ordenanzas, aprobación presupuestal, control político a secretarías y defensa de los intereses subregionales.' },
  { id: 'camara', label: 'Cámara de Representantes (Antioquia)', scope: 'Nacional Legislativo', nature: 'Leyes nacionales, gestión de recursos de la Nación hacia Antioquia y control al gobierno central.' },
  { id: 'alcaldia', label: 'Alcaldías de la Subregión', scope: 'Municipal Ejecutivo', nature: 'Gobierno local, POT, seguridad ciudadana, servicios públicos y atención directa a la comunidad.' },
  { id: 'concejo', label: 'Concejos Municipales de la Subregión', scope: 'Municipal Normativo / Control', nature: 'Acuerdos municipales, aprobación de planes de desarrollo local y vigilancia comunitaria.' },
  { id: 'senado', label: 'Senado de la República', scope: 'Nacional Circunscripción Nacional', nature: 'Reformas constitucionales, política macroeconómica, seguridad nacional y presupuesto general.' }
];

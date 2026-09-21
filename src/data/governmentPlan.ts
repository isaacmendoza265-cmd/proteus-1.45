export interface Proposal {
  title: string;
  description?: string;
  items?: string[];
}

export interface SubAxis {
  title: string;
  proposals: Proposal[];
}

export interface Axis {
  id: number;
  title: string;
  description: string;
  subAxes: SubAxis[];
}

export const PALOMA_GOVERNMENT_PLAN: Axis[] = [
  {
    id: 0,
    title: "Visión General: Colombia Más Grande",
    description: "Nuestra visión se fundamenta en la unión entre todos los colombianos, celebrando nuestra diversidad y construyendo un destino común. Es el paso de la polarización a la colaboración.",
    subAxes: [
      {
        title: "Pilares de Nuestra Visión",
        proposals: [
          {
            title: "Un Hogar Seguro y en Paz",
            description: "La seguridad es el primer pilar. Queremos una Colombia donde la vida sea sagrada y el imperio de la ley llegue a cada rincón, permitiendo que la libertad florezca sin amenazas."
          },
          {
            title: "Bienestar: Salud, Educación y Prosperidad",
            description: "Una prosperidad que no deja a nadie atrás. Salud humana y eficiente con tecnología, y educación como el gran nivelador social que fomenta el pensamiento crítico."
          },
          {
            title: "Un Campo que Alimenta",
            description: "El campo como nuestra despensa y motor económico. Productivo, tecnificado y con propiedad garantizada como base de nuestra soberanía."
          },
          {
            title: "Transformación y Energía",
            description: "Evolución hacia una economía del conocimiento, turismo sostenible e industria de valor agregado, con seguridad energética robusta y limpia."
          },
          {
            title: "Un Estado que Impulsa",
            description: "Un Estado pequeño, eficaz y facilitador. Menos burocracia y más eficiencia; un aliado que simplifica procesos y combate la corrupción."
          }
        ]
      }
    ]
  },
  {
    id: 1,
    title: "Recuperar la seguridad, el respeto a la autoridad y a la legalidad, para vivir sin miedo (las 4R)",
    description: "Visualizamos una Nación donde el miedo es sustituido por la confianza y el potencial se transforma en realidad. La estrategia se estructura en cuatro ejes (las 4R), con objetivos claros y propuestas concretas.",
    subAxes: [
      {
        title: "1.1 Reducir los ingresos de los ilegales",
        proposals: [
          {
            title: "Privar del oxígeno financiero al crimen organizado",
            items: [
              "Extinción de Dominio Exprés: liquidación inmediata de bienes incautados, invirtiendo la carga de la prueba.",
              "Golpe estructural al narcotráfico y la minería ilegal, con control de insumos, maquinaria y rutas.",
              "Fortalecimiento de la inteligencia financiera (UIAF) con tecnología avanzada para rastrear lavado y micro-transferencias.",
              "Traslado de la SAE a la Rama Judicial, para despolitizar y garantizar uso transparente de los recursos.",
              "Alianzas internacionales para rastrear flujos ilícitos y redes transnacionales.",
              "Control fronterizo y migratorio reforzado, enfocado en economías criminales y contrabando."
            ]
          }
        ]
      },
      {
        title: "1.2 Robustecer la Fuerza Pública",
        proposals: [
          {
            title: "Recuperar la superioridad estratégica del Estado",
            items: [
              "Fortalecimiento del pie de fuerza: Implementación del plan 30-30 (30 mil soldados y 30 mil policías nuevos).",
              "Nuevo Plan Nacional de Inteligencia, integrado y orientado a amenazas reales.",
              "Inversión prioritaria en tecnología, movilidad, vigilancia aérea y ciberinteligencia (al menos 3,4% del PIB).",
              "Reestructuración de la carrera policial y militar, con meritocracia, profesionalización y bienestar.",
              "Respaldo jurídico claro y legítimo para los miembros de la Fuerza Pública.",
              "Actualización permanente del mapa criminal, con datos verificables.",
              "Negociación de un Plan Colombia 2.0, adaptado a las amenazas del siglo XXI."
            ]
          }
        ]
      },
      {
        title: "1.3 Re-enamorar a las comunidades",
        proposals: [
          {
            title: "Seguridad con legitimidad y presencia permanente del Estado",
            items: [
              "Presencia institucional sostenida, evitando el error de 'entrar y salir' de los territorios.",
              "Acciones cívico-militares visibles: Ingenieros militares llevando desarrollo a sitios apartados, brigadas médicas, etc.",
              "Redes de cooperación ciudadana protegidas, con incentivos y garantías.",
              "Modelos de ocupación territorial sostenida en municipios críticos.",
              "Zonas de Control del Territorio, con coordinación entre Fuerza Pública, Justicia y autoridades locales.",
              "Reactivación de programas de turismo seguro como 'Vive Colombia, viaja por ella'.",
              "Oferta social real y articulada, complementaria a la acción de seguridad."
            ]
          }
        ]
      },
      {
        title: "1.4 Restablecer la legalidad",
        proposals: [
          {
            title: "Cerrar el ciclo de impunidad",
            items: [
              "Reforma profunda al sistema penal, con fiscales especializados por estructuras criminales.",
              "Judicialización efectiva de las redes criminales, no sólo de eslabones bajos.",
              "Reforma integral al sistema penitenciario: Fin al mando criminal desde las cárceles y bloqueo total de comunicaciones.",
              "Trabajo y educación obligatoria en cárceles, para disciplina y resocialización.",
              "Judicialización de las redes de corrupción como asunto de seguridad nacional.",
              "Endurecimiento de penas para reincidentes ('ley de los tres strikes').",
              "Uso de inteligencia artificial en investigación criminal (triage digital).",
              "Seguridad jurídica para la Fuerza Pública, con protocolos claros."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Recuperar la confianza en Colombia",
    description: "Un Estado austero, íntegro, con vocación de servicio a la gente y que ayude (no impida) a progresar.",
    subAxes: [
      {
        title: "2.1 Balancear las finanzas públicas y estimular el crecimiento",
        proposals: [
          {
            title: "Responsabilidad Fiscal",
            items: [
              "Nadie puede gastar más de lo que le ingresa: Respetar la regla fiscal.",
              "Recuperar la calificación del riesgo país y la inversión (meta del 23% del PIB).",
              "Eliminar impuestos sin fundamento técnico (reducir el impuesto de renta hacia el promedio OCDE 23,9%)."
            ]
          },
          {
            title: "Crecimiento Económico",
            items: [
              "Meta de crecimiento del 5% anual para alcanzar niveles prepandemia en 2030.",
              "Impulso a sectores estratégicos: Minería (crecimiento 4,9% anual) y Construcción (6% anual).",
              "Generación de ingresos fiscales adicionales de hasta 100 billones de pesos hacia 2030 vía crecimiento."
            ]
          },
          {
            title: "Estado Austero",
            items: [
              "Reducción de la burocracia: Reducir 25% gastos de funcionamiento y congelar 30% de OPS.",
              "Pasar de 19 a 12 ministerios, eliminando o fusionando entidades que se superponen.",
              "Ahorro estimado entre $15 y $20 billones de pesos."
            ]
          },
          {
            title: "Reforma Pensional y Economía Plateada",
            items: [
              "Aportes blandos y flexibles para trabajadores informales (58% de la fuerza laboral).",
              "De pensionado a propietario: Usar ahorro pensional para adquirir vivienda.",
              "Ahorro desde la cuna: Capital semilla de $500.000 para niños en pobreza.",
              "Subsidio al adulto mayor: Aumento gradual según Ley 100.",
              "Economía Plateada: Programas de 'Mentores de País' para profesionales jubilados.",
              "Rentabilización de activos: Impulso a la hipoteca inversa."
            ]
          }
        ]
      },
      {
        title: "2.2 Reconstruir un Estado al Servicio de la Gente",
        proposals: [
          {
            title: "Planeación y Anticorrupción",
            items: [
              "DNP como 'Faro del Desarrollo': Direccionamiento estratégico y evaluación de calidad del gasto.",
              "Estrategia anticorrupción integral: Uso de ciencia y tecnología (Blockchain, IA).",
              "Oficiales de Integridad y Cláusulas de Consciencia para proteger funcionarios honestos."
            ]
          },
          {
            title: "Estado Digital y Ágil",
            items: [
              "Digitalización Radical (Modelo Estonia): Interoperabilidad X-Road y principio 'Once Only'.",
              "IA Transversal: Analítica de grafos en Justicia, Deep Learning en Hacienda, Auditoría forense en Salud.",
              "Identidad Digital Única y Carpeta Ciudadana: La llave universal contra filas y fraude.",
              "Regulación de Plataforma (Agilismo Regulatorio): Sandboxes para nuevos modelos de negocio.",
              "Ventanilla Única de Inversión y Exportación (VUE) unificada."
            ]
          }
        ]
      },
      {
        title: "2.3 Justicia Creíble",
        proposals: [
          {
            title: "Gestión y Celeridad Judicial",
            items: [
              "Meritocracia en nominaciones presidenciales a altos cargos y Cortes.",
              "Justicia Abierta: Portal de datos abiertos y trazabilidad pública de casos.",
              "Celeridad con IA: Actos de trámite e impulso procesal apoyados por IA para liberar tiempo judicial.",
              "Descongestión Judicial: Equipos de emergencia y procedimientos abreviados para pequeñas causas.",
              "Modelo 'Una familia, un juez' para atención judicial integrada en violencia intrafamiliar.",
              "Casas de Justicia transformadas en centros integrados de resolución de conflictos."
            ]
          }
        ]
      },
      {
        title: "2.4 Relaciones Internacionales",
        proposals: [
          {
            title: "Colombia como Nación segura, próspera y confiable",
            items: [
              "Reconstruir apoyo bipartidista de E.E.U.U. para el sector defensa.",
              "Diplomacia con Oriente Medio orientada a resultados e inversión.",
              "Ratificar compromiso con la OTAN y participación en el Consejo de Seguridad.",
              "Consolidar política de fronteras con Gabinetes Binacionales.",
              "Demandar plena transición a la democracia en Venezuela.",
              "Posicionar a Colombia como hub de nearshoring y powershoring."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Más ingresos para el bolsillo de los colombianos",
    description: "Desarrollo económico, competitividad, revolución energética e infraestructura para un campo productivo.",
    subAxes: [
      {
        title: "3.1 Desarrollo Económico y Competitividad",
        proposals: [
          {
            title: "Nearshoring y Formalización",
            items: [
              "Política de nearshoring: Paquete de inversiones de US$3.000-4.000 millones en 24 meses.",
              "Generación de 50.000 a 80.000 nuevos empleos formales en manufactura y tecnología.",
              "Cuenta Social del Hogar: Transparencia total en subsidios directos e indirectos.",
              "Escalera de la Formalidad 2.0: Proceso gradual para que microempresas se formalicen.",
              "Regulación laboral de plataformas digitales: Trabajo digital con dignidad e ingresos justos.",
              "Inclusión Productiva: Pasar del microcrédito de subsistencia a la inversión productiva."
            ]
          },
          {
            title: "Productividad y Exportación",
            items: [
              "Shock nacional de productividad: Incrementar PTF en +2% e impulsar TLCs.",
              "Triplicar exportaciones al 2035 con ventanilla digital y diplomacia comercial.",
              "Plan Turismo 12M: Meta de 12 millones de visitantes en 2030 y US$20.000 millones en divisas.",
              "Política de cielos abiertos y redistribución del turismo hacia destinos emergentes."
            ]
          }
        ]
      },
      {
        title: "3.2 Revolución Energética",
        proposals: [
          {
            title: "Seguridad y Transición Energética",
            items: [
              "Plan de choque para evitar apagón (2026-2027): Acelerar entrada de proyectos viabilizados.",
              "Fortalecer red de transmisión eléctrica, especialmente en el Caribe.",
              "Diversificar matriz con énfasis en energía firme: Hidroelectricidad, gas y carbón estratégico.",
              "Recuperar abastecimiento de gas: Términos de referencia para yacimientos no convencionales.",
              "Saneamiento financiero del sistema: Cancelar deuda de opción tarifaria y titularización.",
              "Formalización minera: Diferenciar minería de subsistencia de la ilegal ligada al crimen."
            ]
          }
        ]
      },
      {
        title: "3.3 Infraestructura para la Competitividad",
        proposals: [
          {
            title: "Transporte Intermodal",
            items: [
              "Especialización técnica: ANI (productiva), INVIAS (obra pública nacional/regional), Aerocivil (regulación tipo FAA).",
              "Consolidar red vial 4G y 5G: Terminar 100% de obras contratadas.",
              "Modo Férreo: Priorizar financiación de dos corredores férreos.",
              "Modo Fluvial: Navegabilidad del Río Magdalena y Canal del Dique.",
              "Plan Vías Terciarias: Intervenir 4 km por municipio por año (10.000 km en el cuatrienio)."
            ]
          }
        ]
      },
      {
        title: "3.4 Campo Competitivo",
        proposals: [
          {
            title: "Seguridad y Productividad Rural",
            items: [
              "Seguridad Física: Escuadrones antiextorsión y contra el abigeato con drones y analítica.",
              "Seguridad Jurídica: Derogación de APPAS y Decreto 033; creación de jueces agrarios.",
              "Agricultura por Contrato ('Siembre a la fija'): Modelos asociativos y acuerdos de compra.",
              "Crédito Rural: Instrumentos de reducción de riesgo y securitización de títulos de producción.",
              "Distritos de Riego: Culminar Ranchería (Guajira), Triángulo del Tolima, Tesalia (Huila) y Marialabaja (Bolívar).",
              "Agricultura de Precisión: IVA 0% a equipos tecnológicos y AgroData para toma de decisiones.",
              "Ganadería Regenerativa y Potencia Forestal: Reforestación comercial sostenible."
            ]
          }
        ]
      },
      {
        title: "3.5 Medio Ambiente y Desarrollo Sostenible",
        proposals: [
          {
            title: "Protección del Capital Natural",
            items: [
              "Seguridad Total Ambiental: Protección de parques nacionales y resguardos (42% del territorio).",
              "Revivir Familias Guardabosques para apoyo a comunidades locales.",
              "Turismo de Naturaleza como motor de desarrollo regional.",
              "Agua Dulce: Planear ordenamiento territorial alrededor del agua y proteger la Amazonía.",
              "Finanzas Verdes: Cuenta satélite ambiental y seguros paramétricos para San Andrés."
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Desarrollo Incluyente y Sostenible",
    description: "Salud, educación, vivienda y servicios básicos para cerrar las brechas sociales.",
    subAxes: [
      {
        title: "4.1 Recuperación del Sistema de Salud",
        proposals: [
          {
            title: "Sostenibilidad y Calidad",
            items: [
              "Sistema Mixto y Solidario: Titularización de deuda de ADRES y blindaje de recursos corrientes.",
              "Nueva Gobernanza de la UPC: Consejo Nacional de Salud técnico e independiente.",
              "UPC Diferenciada: Ajustadores de riesgo por perfil epidemiológico y premios a la calidad.",
              "Hospitales Padrinos: Transferencia de capacidad de centros de alta complejidad a hospitales rurales.",
              "Salud Digital: Historia Clínica Electrónica Nacional interoperable y telemedicina con IA.",
              "Reforma al INVIMA: Automatización, virtualización y homologación automática (Reliance)."
            ]
          }
        ]
      },
      {
        title: "4.2 Revolución Educativa",
        proposals: [
          {
            title: "Calidad y Equidad Territorial",
            items: [
              "Bono Educativo focalizado en hogares SISBÉN A y B.",
              "Expansión de colegios en concesión (meta 170 colegios para 187.000 estudiantes).",
              "Programa Todos a Aprender (PTA 4.0) y Jornada Única con énfasis en STEM.",
              "Red de 25 súper-colegios públicos de excelencia en principales ciudades.",
              "Reforma a la carrera docente basada en mérito y desarrollo profesional continuo.",
              "Educación para la Empleabilidad: Reorientar el SENA hacia formación dual y resultados.",
              "Reforma al ICETEX: Pago contingente al ingreso y subsidio de acceso.",
              "Atención integral a la primera infancia en articulación con el ICBF."
            ]
          }
        ]
      },
      {
        title: "4.3 Enfoque Familia, Mujer, Niñez y Jóvenes",
        proposals: [
          {
            title: "Empoderamiento y Oportunidades",
            items: [
              "Empoderamiento Femenino: Centros de emprendimiento y vocaciones STEM para niñas.",
              "Sistema de Cuidado: Centros de cuidado infantil universal y profesionalización de cuidadoras.",
              "Participación Juvenil: Plan T para fortalecimiento operativo de Consejos de Juventud.",
              "Ruta E (Economía Productiva Juvenil): Subsidios al primer empleo y aceleradora equity-free.",
              "Salud Mental Joven: Bono de salud mental y Red Nacional de Jóvenes para el Bienestar Emocional.",
              "Colombia Joven en Datos: Sistema nacional de información juvenil."
            ]
          }
        ]
      },
      {
        title: "4.4 Vivienda para Todos",
        proposals: [
          {
            title: "Vivienda Urbana y Rural",
            items: [
              "Mi Casa Ya 2.0: Rediseño de subsidios con coberturas planas a la tasa de interés.",
              "Camino hacia mi Casa Propia: Apoyo al arriendo condicionado al ahorro programado.",
              "Recuperar Cuentas AFC y estímulos tributarios al ahorro VIS.",
              "Habilitación de suelo y supresión de trámites: Ventanillas únicas para la construcción.",
              "Legalización de asentamientos informales con apoyo técnico y financiero.",
              "Casa Semilla: Modelo de autoconstrucción asistida y ecosostenible para el campo."
            ]
          }
        ]
      },
      {
        title: "4.5 Agua Potable y Saneamiento Básico",
        proposals: [
          {
            title: "Agua Limpia para Todos",
            items: [
              "Meta: Cobertura universal (100%) en la próxima década.",
              "Gerencia de proyectos con enfoque en resultados y seguimiento en tiempo real.",
              "Plan de choque en municipios con coberturas críticas.",
              "Soluciones rurales de bajo costo y rápida ejecución (Agua rural básica).",
              "Fortalecimiento de Empresas de Servicios Públicos (ESP) municipales."
            ]
          }
        ]
      }
    ]
  }
];

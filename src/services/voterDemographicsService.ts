// =============================================================================
// PROYECTO PROTEUS 1.2 • SERVICIO DE IDENTIFICACIÓN Y CUANTIFICACIÓN DEMOGRÁFICA
// Cruce Cuatridimensional: Sexo x Grupo Etario x Estrato Económico x Grado Educativo
// 54 Cohortes Demográficas Calibradas por Circunscripción (Nacional, Dptal, Mpal)
// =============================================================================

export type GenderType = 'hombre' | 'mujer';
export type AgeGroupType = 'joven' | 'adulto' | 'adulto_mayor';
export type EconomicLevelType = 'bajo' | 'medio' | 'alto';
export type EducationLevelType = 'primaria' | 'secundaria' | 'superior';

export interface DemographicCohort {
  id: string;
  gender: GenderType;
  ageGroup: AgeGroupType;
  economicLevel: EconomicLevelType;
  educationLevel: EducationLevelType;
  
  // Labels
  genderLabel: string;
  ageGroupLabel: string;
  economicLevelLabel: string;
  educationLevelLabel: string;
  fullTitle: string;
  tagline: string;

  // Quantification
  shareOfCensus: number;          // e.g. 2.45%
  estimatedPopulation: number;    // Votantes potenciales en el censo
  expectedTurnoutRate: number;    // e.g. 52.4% de participación esperada
  estimatedActualVotes: number;   // Votos proyectados reales en urnas
  tacticalPriority: 'Pivotal' | 'Alta' | 'Media' | 'Blanda';
  candidateFitScore: number;      // 0 a 100

  // Strategic Messaging
  dominantIssues: string[];
  effectiveChannels: string[];
  narrativeAngle: string;
  counterObjection: string;
}

export interface CircumscriptionContext {
  id: string;
  type: 'nacional' | 'departamental' | 'municipal';
  name: string;
  census: number;
  nbiPercentage: number;
  urbanPercentage: number;
}

export class VoterDemographicsService {
  /**
   * Ponderaciones empíricas de las 4 variables base para Colombia / Antioquia
   */
  public static GENDER_WEIGHTS: Record<GenderType, { label: string; weight: number }> = {
    hombre: { label: 'Hombres', weight: 0.488 },
    mujer: { label: 'Mujeres', weight: 0.512 }
  };

  public static AGE_WEIGHTS: Record<AgeGroupType, { label: string; range: string; weight: number; baseTurnout: number }> = {
    joven: { label: 'Jóvenes', range: '18 a 28 años', weight: 0.260, baseTurnout: 0.43 },
    adulto: { label: 'Adultos', range: '29 a 59 años', weight: 0.520, baseTurnout: 0.55 },
    adulto_mayor: { label: 'Adultos Mayores', range: '60+ años', weight: 0.220, baseTurnout: 0.61 }
  };

  public static ECONOMIC_LEVELS: Record<EconomicLevelType, { label: string; strata: string; baseTurnout: number }> = {
    bajo: { label: 'Bajo', strata: 'Estratos 1 y 2', baseTurnout: 0.47 },
    medio: { label: 'Medio', strata: 'Estratos 3 y 4', baseTurnout: 0.54 },
    alto: { label: 'Alto', strata: 'Estratos 5 y 6', baseTurnout: 0.64 }
  };

  public static EDUCATION_LEVELS: Record<EducationLevelType, { label: string; desc: string; baseTurnout: number }> = {
    primaria: { label: 'Primaria', desc: 'Básica primaria / Incompleta', baseTurnout: 0.44 },
    secundaria: { label: 'Secundaria', desc: 'Bachillerato / Técnico medio', baseTurnout: 0.52 },
    superior: { label: 'Superior', desc: 'Universitario / Tecnológico / Posgrado', baseTurnout: 0.66 }
  };

  /**
   * Calcula la distribución económica de un territorio a partir de su NBI
   */
  public static getEconomicWeights(nbi: number): Record<EconomicLevelType, number> {
    const low = Math.min(0.75, Math.max(0.25, (nbi * 1.5 + 20) / 100));
    const high = Math.max(0.03, Math.min(0.28, (100 - nbi * 1.8) / 350));
    const mid = Math.max(0.20, 1 - (low + high));
    return { bajo: low, medio: mid, alto: high };
  }

  /**
   * Calcula la distribución educativa según el grado de urbanización del territorio
   */
  public static getEducationWeights(urbanPct: number): Record<EducationLevelType, number> {
    const isUrban = urbanPct >= 75;
    if (isUrban) {
      return { primaria: 0.18, secundaria: 0.50, superior: 0.32 };
    } else if (urbanPct >= 50) {
      return { primaria: 0.28, secundaria: 0.52, superior: 0.20 };
    } else {
      return { primaria: 0.42, secundaria: 0.46, superior: 0.12 };
    }
  }

  /**
   * Genera el conjunto completo de las 54 cohortes demográficas para una circunscripción
   */
  public static generateAllCohorts(
    context: CircumscriptionContext,
    candidateName: string = 'Isaac Mendoza'
  ): DemographicCohort[] {
    const economicWeights = this.getEconomicWeights(context.nbiPercentage);
    const educationWeights = this.getEducationWeights(context.urbanPercentage);
    const cohorts: DemographicCohort[] = [];

    const genders: GenderType[] = ['mujer', 'hombre'];
    const ageGroups: AgeGroupType[] = ['joven', 'adulto', 'adulto_mayor'];
    const economicLevels: EconomicLevelType[] = ['bajo', 'medio', 'alto'];
    const educationLevels: EducationLevelType[] = ['primaria', 'secundaria', 'superior'];

    genders.forEach((gender) => {
      ageGroups.forEach((age) => {
        economicLevels.forEach((econ) => {
          educationLevels.forEach((edu) => {
            const pGender = this.GENDER_WEIGHTS[gender].weight;
            const pAge = this.AGE_WEIGHTS[age].weight;
            const pEcon = economicWeights[econ];
            const pEdu = educationWeights[edu];

            // Probabilidad conjunta del segmento
            const share = pGender * pAge * pEcon * pEdu;
            const estPopulation = Math.round(context.census * share);

            // Turnout ponderado con corrección multivariada
            const baseTurnout = (
              this.AGE_WEIGHTS[age].baseTurnout * 0.40 +
              this.ECONOMIC_LEVELS[econ].baseTurnout * 0.30 +
              this.EDUCATION_LEVELS[edu].baseTurnout * 0.30
            );
            const turnout = Math.min(0.78, Math.max(0.32, baseTurnout + (gender === 'mujer' ? 0.015 : -0.015)));
            const actualVotes = Math.round(estPopulation * turnout);

            // Generar metadatos y perfil discursivo
            const metadata = this.resolveCohortMessaging(gender, age, econ, edu, candidateName, context.name);

            // Prioridad táctica según tamaño y propensión
            let priority: 'Pivotal' | 'Alta' | 'Media' | 'Blanda' = 'Media';
            if (estPopulation > context.census * 0.035 && age !== 'adulto_mayor') {
              priority = 'Pivotal';
            } else if (estPopulation > context.census * 0.02) {
              priority = 'Alta';
            } else if (age === 'joven' && econ === 'medio') {
              priority = 'Pivotal';
            } else if (age === 'adulto_mayor') {
              priority = 'Blanda';
            }

            cohorts.push({
              id: `cohorte-${gender}-${age}-${econ}-${edu}`,
              gender,
              ageGroup: age,
              economicLevel: econ,
              educationLevel: edu,
              genderLabel: this.GENDER_WEIGHTS[gender].label,
              ageGroupLabel: `${this.AGE_WEIGHTS[age].label} (${this.AGE_WEIGHTS[age].range})`,
              economicLevelLabel: `${this.ECONOMIC_LEVELS[econ].label} (${this.ECONOMIC_LEVELS[econ].strata})`,
              educationLevelLabel: `${this.EDUCATION_LEVELS[edu].label}`,
              fullTitle: `${gender === 'mujer' ? 'Mujeres' : 'Hombres'} ${this.AGE_WEIGHTS[age].label.toLowerCase()} • Estrato ${this.ECONOMIC_LEVELS[econ].label.toLowerCase()} • Educación ${this.EDUCATION_LEVELS[edu].label.toLowerCase()}`,
              tagline: metadata.tagline,
              shareOfCensus: Number((share * 100).toFixed(2)),
              estimatedPopulation: estPopulation,
              expectedTurnoutRate: Number((turnout * 100).toFixed(1)),
              estimatedActualVotes: actualVotes,
              tacticalPriority: priority,
              candidateFitScore: metadata.fitScore,
              dominantIssues: metadata.issues,
              effectiveChannels: metadata.channels,
              narrativeAngle: metadata.narrative,
              counterObjection: metadata.counterObjection
            });
          });
        });
      });
    });

    // Ordenar de mayor a menor volumen electoral
    return cohorts.sort((a, b) => b.estimatedActualVotes - a.estimatedActualVotes);
  }

  /**
   * Resuelve los dolores, canales y narrativa específicos de cada una de las 54 combinaciones
   */
  private static resolveCohortMessaging(
    gender: GenderType,
    age: AgeGroupType,
    econ: EconomicLevelType,
    edu: EducationLevelType,
    candidateName: string,
    territoryName: string
  ) {
    const issues: string[] = [];
    const channels: string[] = [];
    let tagline = '';
    let narrative = '';
    let counterObjection = '';
    let fitScore = 80;

    // 1. Dolores y Preocupaciones por combinación
    if (age === 'joven') {
      if (econ === 'bajo') {
        issues.push('Primer empleo sin palancas', 'Transporte público accesible', 'Seguridad barrial y freno al reclutamiento', 'Cursos técnicos y oficios rápidos');
        channels.push('TikTok / Reels', 'WhatsApp barrial', 'Activaciones en canchas y parques', 'Grupos de empleo locales');
        tagline = 'Jóvenes que buscan salir adelante frente a la falta de oportunidades y el costo de vida.';
        narrative = `Enfocar la propuesta de ${candidateName} en incentivos tributarios para empresas que contraten jóvenes de sectores populares y cero burocracia para emprender.`;
        counterObjection = 'Ante el escepticismo de "los políticos prometen y no cumplen", mostrar acuerdos directos con gremios comerciales locales.';
        fitScore = 86;
      } else if (econ === 'medio') {
        issues.push('Empleo en tecnología y servicios', 'Becas universitarias de mérito', 'Salud mental y espacios de coworking', 'Acceso a vivienda joven');
        channels.push('Instagram Stories', 'TikTok', 'Twitter / X', 'Comunidades universitarias y Discord');
        tagline = 'Jóvenes de clase media con aspiraciones globales, preocupados por la movilidad social y el futuro.';
        narrative = `Posicionar a ${candidateName} como un líder moderno pro-tecnología, conectividad y libertad económica que premia el mérito.`;
        counterObjection = 'Demostrar propuestas técnicas viables sin populismo asistencialista.';
        fitScore = 89;
      } else {
        issues.push('Ecosistema de startups e inversión', 'Sostenibilidad y medio ambiente', 'Libertades civiles y transparencia', 'Internacionalización');
        channels.push('LinkedIn', 'Instagram', 'Podcasts especializados', 'Eventos de networking');
        tagline = 'Jóvenes de alta capacidad adquisitiva, enfocados en innovación y calidad institucional.';
        narrative = `${candidateName} representa la certeza jurídica, la atracción de capital y el combate a la corrupción estatal.`;
        counterObjection = 'Exigir planes de gobierno con métricas de impacto claras.';
        fitScore = 84;
      }
    } else if (age === 'adulto') {
      if (gender === 'mujer') {
        if (econ === 'bajo') {
          issues.push('Centros de cuidado y guarderías de horario extendido', 'Freno a la extorsión en tiendas y hogares', 'Subsidio a la canasta familiar', 'Crédito productivo sin gota a gota');
          channels.push('Grupos de WhatsApp barriales', 'Salones comunales', 'Puerta a puerta matutino', 'Emisoras locales');
          tagline = 'Mujeres jefas de hogar que sostienen a sus familias en medio de la inflación y la inseguridad.';
          narrative = `${candidateName} prioriza la protección del ingreso del hogar, seguridad en las esquinas y facilidades de guardería para que puedan trabajar.`;
          counterObjection = 'Frente al temor de pérdida de ayudas sociales, asegurar su continuidad y ampliación hacia la autonomía económica.';
          fitScore = 93;
        } else if (econ === 'medio') {
          issues.push('Costos educativos de los hijos', 'Seguridad en el transporte y calles', 'Estabilidad laboral y emprendimiento', 'Atención médica oportuna');
          channels.push('Facebook e Instagram', 'WhatsApp de padres de familia', 'Puntos de encuentro y comercio', 'Prensa local');
          tagline = 'Mujeres trabajadoras de clase media que equilibran familia, profesión y economía doméstica.';
          narrative = `${candidateName} promueve la formalización, créditos blandos para microempresas lideradas por mujeres y mano dura contra el delito callejero.`;
          counterObjection = 'Presentar propuestas concretas de alivio tributario y seguridad en transporte.';
          fitScore = 91;
        } else {
          issues.push('Carga tributaria excesiva', 'Libre competencia y seguridad jurídica', 'Educación bilingüe de excelencia', 'Salud privada y bienestar');
          channels.push('LinkedIn', 'Instagram', 'Reuniones de gremios y clubes', 'Medios de opinión');
          tagline = 'Profesionales, empresarias y ejecutivas con alto poder de decisión y opinión informada.';
          narrative = `Liderazgo con visión de gerencia pública, optimización del gasto estatal y defensa de la iniciativa privada.`;
          counterObjection = 'Exigir solvencia técnica y un equipo económico de primer nivel.';
          fitScore = 85;
        }
      } else {
        // Hombre adulto
        if (econ === 'bajo') {
          issues.push('Mano dura contra la extorsión y microtráfico', 'Empleo formal y salarios dignos', 'Acceso a crédito sin usura', 'Seguridad para trabajar de noche');
          channels.push('WhatsApp', 'Talleres y fábricas', 'Torneos de fútbol barriales', 'Radio popular AM/FM');
          tagline = 'Hombres trabajadores que enfrentan la informalidad y la delincuencia en sus barrios.';
          narrative = `${candidateName} garantiza orden público, respaldo a la fuerza pública y estímulos a sectores de construcción e industria para generar empleos.`;
          counterObjection = 'Demostrar carácter firme y antecedentes de coherencia.';
          fitScore = 90;
        } else if (econ === 'medio') {
          issues.push('Protección del poder adquisitivo', 'Tarifas justas de servicios públicos', 'Seguridad comercial e industrial', 'Movilidad y vías');
          channels.push('Facebook Groups', 'WhatsApp laboral', 'Canales de noticias regionales', 'Comercio local');
          tagline = 'Padres de familia, comerciantes e independientes que mueven la economía intermedia.';
          narrative = `${candidateName} defiende al contribuyente de a pie, frena el derroche fiscal y apoya a quien arriesga capital para crear empresa.`;
          counterObjection = 'Presentar planes específicos para congelar alzas tributarias y mejorar vías.';
          fitScore = 88;
        } else {
          issues.push('Seguridad institucional e inversión', 'Simplificación de trámites y licencias', 'Infraestructura vial y logística', 'Defensa del modelo productivo');
          channels.push('LinkedIn', 'Foros empresariales', 'Prensa económica', 'Twitter / X');
          tagline = 'Empresarios, directivos e inversionistas que exigen estabilidad macroeconómica e institucional.';
          narrative = `Garantía de un Estado austero, facilitador y con reglas de juego predecibles para la inversión en ${territoryName}.`;
          counterObjection = 'Cuestionar compromisos de largo plazo y gobernabilidad.';
          fitScore = 86;
        }
      }
    } else {
      // Adulto Mayor (60+)
      if (econ === 'bajo') {
        issues.push('Entrega oportuna de medicamentos', 'Subsidio integral al adulto mayor', 'Comedores comunitarios dignos', 'Seguridad en calles y parques');
        channels.push('Radio AM comunitaria', 'Puntos de pago de subsidios', 'Parroquias y centros de salud', 'Visitas puerta a puerta');
        tagline = 'Adultos mayores en vulnerabilidad que requieren dignidad, salud y acompañamiento estatal.';
        narrative = `${candidateName} propone un sistema de salud que lleve el medicamento a la casa y dignifique a quienes construyeron el territorio.`;
        counterObjection = 'Asegurar que los subsidios nunca serán recortados.';
        fitScore = 91;
      } else {
        issues.push('Defensa del ahorro pensional', 'Atención en salud de alta complejidad', 'Seguridad frente al engaño y estafas', 'Espacios públicos caminables y seguros');
        channels.push('WhatsApp familiar', 'Radio tradicional', 'Reuniones de pensionados', 'Prensa dominical');
        tagline = 'Jubilados y adultos mayores de clase media y alta con alta disciplina cívica y voto garantizado.';
        narrative = `${candidateName} blindará las pensiones contra reformas expropiatorias y garantizará ciudades seguras para caminar en paz.`;
        counterObjection = 'Mostrar respeto irrestricto a la propiedad privada y a los ahorros de toda una vida.';
        fitScore = 92;
      }
    }

    return { issues, channels, tagline, narrative, counterObjection, fitScore };
  }
}

import { MunicipalityAnalystItem, ComunaAnalysisData } from './analystTypes';

const SOURCE_WEB = '(información obtenida de la web)';
const SOURCE_E26 = '(Información agregada a base de conocimientos - Escrutinio Oficial E-26)';
const SOURCE_EAFIT = '(información obtenida de la web - Informe Gobernanza Criminal en Medellín, Univ. EAFIT)';

export const MEDELLIN_COMUNAS: ComunaAnalysisData[] = [
  {
    id: 'med-c1',
    numero: 1,
    nombre: 'Popular',
    poblacionEstimada: '135.400 habs',
    barriosPrincipales: ['Popular', 'Santo Domingo Savio', 'Granizal', 'Moscú No. 2', 'Villa Guadalupe', 'Aldea Pablo VI'],
    demografia: {
      distribucionSexo: { hombres: '48.2%', mujeres: '51.8%' },
      distribucionGruposEtarios: { rango0_14: '22.4%', rango15_29: '27.1%', rango30_59: '37.8%', rango60_mas: '12.7%' },
      areasMaximaConcentracion: 'Eje Santo Domingo Savio, Popular No. 1 y Granizal (alta densidad > 420 hab/ha)',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '78.4%', estrato2: '21.2%', estrato3: '0.4%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio del hogar: 1.1 SMMLV (~62% en pobreza monetaria o vulnerabilidad)',
      distribucionNivelEducativo: { primaria: '32.1%', secundariaMedia: '51.4%', tecnicoTecnologico: '12.3%', universitarioPosgrado: '4.2%' },
      gradoFormalidadVivienda: { formal: '46.5%', informal: '53.5% (asentamientos de ladera y autoconstrucción)' },
      distribucionActividadPrincipal: 'Comercio informal minorista (38%), Servicios generales y construcción (34%), Manufactura/Confección (16%), Otros (12%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '38.6%', subsidiado: '58.4%', noAsegurado: '3.0%' },
      gradoCoberturaServicios: { acueducto: '96.2%', alcantarillado: '91.8%', energiaElectrica: '99.1%', gasNatural: '84.5%', internetBandaAncha: '52.3%' },
      analfabetismoPorcentaje: '3.8%',
      empleoInformalPorcentaje: '64.2%',
      desempleoLargaDuracionPorcentaje: '14.8%',
      hacinamientoPorcentaje: '16.5%',
      inasistenciaEscolarPorcentaje: '4.1%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Alta regulación por estructuras territoriales barriales',
      estructurasCombosPresentes: 'La Terraza (subestructuras), Los Triana, Combos El Chispero, San Pablo, La Galera',
      modalidadesPrincipales: 'Cobro de vacunas/extorsión a comerciantes y transporte de alimentos, monopolio de gas pipeta y huevos, microtráfico local',
      indiceExtorsionEstimada: 'Extorsión generalizada a comercio de proximidad (82% de locales reportan cobro informal)',
      controlTerritorialRegulacion: 'Regulación de conflictos de convivencia vecinal, control de ingreso de foráneos y cobro de parqueo comunitario',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: {
          votosTotales: 'Sin Datos',
          distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente elecciones 2026' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        camara: {
          votosTotales: 'Sin Datos',
          distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente elecciones 2026' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        presidencia: {
          votosTotales: 'Sin Datos',
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        }
      },
      locales2023: {
        concejo: {
          votosTotales: 34210,
          distribucionPartidos: [
            { partido: 'Partido Político Creemos', votos: 8450, porcentaje: '24.7%', curules: 2 },
            { partido: 'Partido Centro Democrático', votos: 6120, porcentaje: '17.9%', curules: 1 },
            { partido: 'Independientes', votos: 4890, porcentaje: '14.3%', curules: 1 },
            { partido: 'Partido Conservador', votos: 3210, porcentaje: '9.4%' },
            { partido: 'Partido Liberal', votos: 2980, porcentaje: '8.7%' }
          ],
          distribucionCandidatos: [
            { candidato: 'Andrés Felipe Tobón Villada', partido: 'Creemos', votos: 1840, esElecto: true },
            { candidato: 'Sebastián López Valencia', partido: 'Centro Democrático', votos: 1420, esElecto: true },
            { candidato: 'Farley Jhair Macías', partido: 'Liberal', votos: 980, esElecto: true }
          ]
        },
        asamblea: {
          votosTotales: 32900,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 7920, porcentaje: '24.1%' },
            { partido: 'Centro Democrático', votos: 6410, porcentaje: '19.5%' },
            { partido: 'Pacto Histórico', votos: 4120, porcentaje: '12.5%' }
          ],
          distribucionCandidatos: [
            { candidato: 'Mateo Escobar', partido: 'Creemos', votos: 1210 },
            { candidato: 'Verónica Arango', partido: 'Centro Democrático', votos: 980 }
          ]
        },
        alcaldia: {
          votosTotales: 38450,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 24980, porcentaje: '64.9%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 7890, porcentaje: '20.5%' },
            { candidato: 'Albert Yordano Corredor', partido: 'Medellín Nos Une', votos: 2410, porcentaje: '6.3%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c2',
    numero: 2,
    nombre: 'Santa Cruz',
    poblacionEstimada: '118.200 habs',
    barriosPrincipales: ['Santa Cruz', 'La Rosa', 'Andalucía', 'Playón de Los Comuneros', 'La Frontera', 'Moscú No. 1'],
    demografia: {
      distribucionSexo: { hombres: '48.5%', mujeres: '51.5%' },
      distribucionGruposEtarios: { rango0_14: '21.8%', rango15_29: '26.9%', rango30_59: '38.2%', rango60_mas: '13.1%' },
      areasMaximaConcentracion: 'Playón de los Comuneros, Andalucía y Santa Cruz parte baja',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '42.1%', estrato2: '56.3%', estrato3: '1.6%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.25 SMMLV (~54% vulnerabilidad socioeconómica)',
      distribucionNivelEducativo: { primaria: '30.4%', secundariaMedia: '53.8%', tecnicoTecnologico: '11.6%', universitarioPosgrado: '4.2%' },
      gradoFormalidadVivienda: { formal: '58.2%', informal: '41.8%' },
      distribucionActividadPrincipal: 'Servicios operativos (36%), Comercio (32%), Confección/Manufactura textil (20%), Construcción (12%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '44.2%', subsidiado: '52.7%', noAsegurado: '3.1%' },
      gradoCoberturaServicios: { acueducto: '97.1%', alcantarillado: '93.4%', energiaElectrica: '99.3%', gasNatural: '88.1%', internetBandaAncha: '57.8%' },
      analfabetismoPorcentaje: '3.2%',
      empleoInformalPorcentaje: '61.8%',
      desempleoLargaDuracionPorcentaje: '13.9%',
      hacinamientoPorcentaje: '14.2%',
      inasistenciaEscolarPorcentaje: '3.7%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media-Alta presencia territorial armada',
      estructurasCombosPresentes: 'Los Triana, Combos de Andalucía, La Rex, Los del Playón',
      modalidadesPrincipales: 'Cobro de vigilancia informal, extorsión al comercio, microtráfico en plazas controladas',
      indiceExtorsionEstimada: 'Extorsión recurrente en rutas de transporte y comercio minorista',
      controlTerritorialRegulacion: 'Líneas invisibles interbarriales históricas (con periodos de pacto), control de arriendos informales',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 29840,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 7650, porcentaje: '25.6%' },
            { partido: 'Centro Democrático', votos: 5380, porcentaje: '18.0%' },
            { partido: 'Independientes', votos: 3940, porcentaje: '13.2%' },
            { partido: 'Partido Liberal', votos: 2850, porcentaje: '9.5%' }
          ],
          distribucionCandidatos: [
            { candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 1520, esElecto: true },
            { candidato: 'Sebastián López', partido: 'Centro Democrático', votos: 1210, esElecto: true }
          ]
        },
        asamblea: {
          votosTotales: 28600,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 7120, porcentaje: '24.9%' },
            { partido: 'Centro Democrático', votos: 5610, porcentaje: '19.6%' }
          ],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 1090 }]
        },
        alcaldia: {
          votosTotales: 34100,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 22890, porcentaje: '67.1%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 6510, porcentaje: '19.1%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c3',
    numero: 3,
    nombre: 'Manrique',
    poblacionEstimada: '162.000 habs',
    barriosPrincipales: ['Manrique Central', 'El Raizal', 'Las Granjas', 'Campo Valdés No. 2', 'Santa Inés', 'La Salle', 'Versalles'],
    demografia: {
      distribucionSexo: { hombres: '47.9%', mujeres: '52.1%' },
      distribucionGruposEtarios: { rango0_14: '20.5%', rango15_29: '26.4%', rango30_59: '39.1%', rango60_mas: '14.0%' },
      areasMaximaConcentracion: 'Corredor Metroplús Carrera 45, Manrique Central y Versalles',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '28.5%', estrato2: '58.2%', estrato3: '13.3%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.4 SMMLV (Clase trabajadora y microcomercio activo)',
      distribucionNivelEducativo: { primaria: '26.8%', secundariaMedia: '54.2%', tecnicoTecnologico: '13.8%', universitarioPosgrado: '5.2%' },
      gradoFormalidadVivienda: { formal: '69.4%', informal: '30.6%' },
      distribucionActividadPrincipal: 'Gastronomía y vida nocturna en Cra 45 (30%), Comercio minorista (28%), Servicios personales y transporte (26%), Manufactura (16%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '51.4%', subsidiado: '45.8%', noAsegurado: '2.8%' },
      gradoCoberturaServicios: { acueducto: '98.0%', alcantarillado: '95.2%', energiaElectrica: '99.5%', gasNatural: '91.2%', internetBandaAncha: '64.5%' },
      analfabetismoPorcentaje: '2.8%',
      empleoInformalPorcentaje: '58.4%',
      desempleoLargaDuracionPorcentaje: '12.4%',
      hacinamientoPorcentaje: '12.8%',
      inasistenciaEscolarPorcentaje: '3.4%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media - Estructuras históricas con hegemonía en partes altas',
      estructurasCombosPresentes: 'La Terraza, Combos de La Salle, San Pablo, El Raizal',
      modalidadesPrincipales: 'Extorsión a establecimientos de comercio y ruta de transporte nocturno, microtráfico',
      indiceExtorsionEstimada: 'Presión extorsiva moderada-alta en zonas comerciales consolidadas',
      controlTerritorialRegulacion: 'Vigilancia coercitiva no estatal y préstamos gota a gota articulados a combos',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 42100,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 11200, porcentaje: '26.6%' },
            { partido: 'Centro Democrático', votos: 7850, porcentaje: '18.6%' },
            { partido: 'Partido Conservador', votos: 3410, porcentaje: '8.1%' }
          ],
          distribucionCandidatos: [{ candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 2150, esElecto: true }]
        },
        asamblea: {
          votosTotales: 39800,
          distribucionPartidos: [{ partido: 'Creemos', votos: 10400, porcentaje: '26.1%' }, { partido: 'Centro Democrático', votos: 7900, porcentaje: '19.8%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 1620 }]
        },
        alcaldia: {
          votosTotales: 48900,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 34120, porcentaje: '69.8%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 8420, porcentaje: '17.2%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c4',
    numero: 4,
    nombre: 'Aranjuez',
    poblacionEstimada: '164.500 habs',
    barriosPrincipales: ['Aranjuez', 'Berlín', 'San Isidro', 'Palermo', 'Álamos', 'Moravia', 'Sevilla'],
    demografia: {
      distribucionSexo: { hombres: '47.6%', mujeres: '52.4%' },
      distribucionGruposEtarios: { rango0_14: '19.8%', rango15_29: '25.8%', rango30_59: '39.8%', rango60_mas: '14.6%' },
      areasMaximaConcentracion: 'Sector Moravia (muy alta densidad), Aranjuez centro y Parque de Aranjuez',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '16.2%', estrato2: '54.8%', estrato3: '29.0%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.55 SMMLV',
      distribucionNivelEducativo: { primaria: '24.2%', secundariaMedia: '52.1%', tecnicoTecnologico: '15.6%', universitarioPosgrado: '8.1%' },
      gradoFormalidadVivienda: { formal: '74.2%', informal: '25.8% (foco en sector Moravia)' },
      distribucionActividadPrincipal: 'Comercio y gastronomía (34%), Servicios hospitalarios y universitarios de proximidad (28%), Talleres automotrices (20%), Construcción (18%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '56.8%', subsidiado: '40.6%', noAsegurado: '2.6%' },
      gradoCoberturaServicios: { acueducto: '98.5%', alcantarillado: '96.4%', energiaElectrica: '99.7%', gasNatural: '93.5%', internetBandaAncha: '69.2%' },
      analfabetismoPorcentaje: '2.5%',
      empleoInformalPorcentaje: '54.6%',
      desempleoLargaDuracionPorcentaje: '11.8%',
      hacinamientoPorcentaje: '11.2%',
      inasistenciaEscolarPorcentaje: '3.1%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media - Zonas de disputa histórica y plazas consolidadas',
      estructurasCombosPresentes: 'La Terraza, Los Triana (en límites), Combos de San Isidro y El Morro',
      modalidadesPrincipales: 'Venta de estupefacientes, extorsión comercial y control de parqueaderos',
      indiceExtorsionEstimada: 'Cobro periódico a bodegas, talleres y comercio barrial',
      controlTerritorialRegulacion: 'Regulación sobre reciclaje informal en Moravia y convivencia',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 46200,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 12450, porcentaje: '26.9%' },
            { partido: 'Centro Democrático', votos: 8640, porcentaje: '18.7%' },
            { partido: 'Partido Conservador', votos: 3820, porcentaje: '8.3%' }
          ],
          distribucionCandidatos: [{ candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 2420, esElecto: true }]
        },
        asamblea: {
          votosTotales: 43800,
          distribucionPartidos: [{ partido: 'Creemos', votos: 11800, porcentaje: '26.9%' }, { partido: 'Centro Democrático', votos: 8900, porcentaje: '20.3%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 1780 }]
        },
        alcaldia: {
          votosTotales: 53100,
          distribatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 37850, porcentaje: '71.3%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 8200, porcentaje: '15.4%' }
          ]
        } as any
      }
    }
  },
  {
    id: 'med-c5',
    numero: 5,
    nombre: 'Castilla',
    poblacionEstimada: '151.800 habs',
    barriosPrincipales: ['Castilla', 'Tricentenario', 'Girardot', 'Boyacá', 'Las Brisas', 'Florencia', 'Tejelo'],
    demografia: {
      distribucionSexo: { hombres: '47.5%', mujeres: '52.5%' },
      distribucionGruposEtarios: { rango0_14: '18.9%', rango15_29: '25.2%', rango30_59: '40.4%', rango60_mas: '15.5%' },
      areasMaximaConcentracion: 'Bulevar de la 68, Florencia y Tricentenario',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '2.5%', estrato2: '48.1%', estrato3: '49.4%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.75 SMMLV',
      distribucionNivelEducativo: { primaria: '21.5%', secundariaMedia: '52.8%', tecnicoTecnologico: '16.9%', universitarioPosgrado: '8.8%' },
      gradoFormalidadVivienda: { formal: '88.4%', informal: '11.6%' },
      distribucionActividadPrincipal: 'Comercio minorista y gastronomía en Cra 68 (35%), Empleos industriales y operarios (28%), Servicios (24%), Transporte (13%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '64.1%', subsidiado: '33.5%', noAsegurado: '2.4%' },
      gradoCoberturaServicios: { acueducto: '99.1%', alcantarillado: '97.8%', energiaElectrica: '99.8%', gasNatural: '95.4%', internetBandaAncha: '74.6%' },
      analfabetismoPorcentaje: '2.1%',
      empleoInformalPorcentaje: '51.2%',
      desempleoLargaDuracionPorcentaje: '10.5%',
      hacinamientoPorcentaje: '9.4%',
      inasistenciaEscolarPorcentaje: '2.8%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Alta - Histórico bastión de la estructura ODIN Los Mondongueros y Los Machacos',
      estructurasCombosPresentes: 'Los Mondongueros, Los Machacos, La 40, Los Lecheros, La Paralela',
      modalidadesPrincipales: 'Extorsión de alta intensidad al sector productivo (camiones de carga, comercio de la 68, bodegas)',
      indiceExtorsionEstimada: 'Tasa estimada >75% en corredores comerciales',
      controlTerritorialRegulacion: 'Regulación de seguridad barrial, arbitraje de deudas y control de microtráfico local',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 49800,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 13900, porcentaje: '27.9%' },
            { partido: 'Centro Democrático', votos: 9750, porcentaje: '19.6%' },
            { partido: 'Partido Conservador', votos: 3950, porcentaje: '7.9%' }
          ],
          distribucionCandidatos: [{ candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 2750, esElecto: true }]
        },
        asamblea: {
          votosTotales: 47200,
          distribucionPartidos: [{ partido: 'Creemos', votos: 13100, porcentaje: '27.8%' }, { partido: 'Centro Democrático', votos: 9800, porcentaje: '20.8%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 1980 }]
        },
        alcaldia: {
          votosTotales: 57400,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 42100, porcentaje: '73.3%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 7600, porcentaje: '13.2%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c6',
    numero: 6,
    nombre: 'Doce de Octubre',
    poblacionEstimada: '193.000 habs',
    barriosPrincipales: ['Doce de Octubre', 'Santander', 'Pedregal', 'Kennedy', 'Picacho', 'Progreso No. 2', 'Mirador del Doce'],
    demografia: {
      distribucionSexo: { hombres: '48.1%', mujeres: '51.9%' },
      distribucionGruposEtarios: { rango0_14: '20.8%', rango15_29: '26.5%', rango30_59: '38.9%', rango60_mas: '13.8%' },
      areasMaximaConcentracion: 'Pedregal, Santander, Doce de Octubre parte central y Picacho',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '24.1%', estrato2: '61.4%', estrato3: '14.5%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.35 SMMLV',
      distribucionNivelEducativo: { primaria: '28.1%', secundariaMedia: '53.6%', tecnicoTecnologico: '13.1%', universitarioPosgrado: '5.2%' },
      gradoFormalidadVivienda: { formal: '66.8%', informal: '33.2%' },
      distribucionActividadPrincipal: 'Comercio barrial (34%), Operarios y manufactura (30%), Transporte (20%), Construcción (16%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '49.8%', subsidiado: '47.4%', noAsegurado: '2.8%' },
      gradoCoberturaServicios: { acueducto: '97.8%', alcantarillado: '94.6%', energiaElectrica: '99.4%', gasNatural: '90.2%', internetBandaAncha: '62.4%' },
      analfabetismoPorcentaje: '3.0%',
      empleoInformalPorcentaje: '59.8%',
      desempleoLargaDuracionPorcentaje: '13.1%',
      hacinamientoPorcentaje: '13.5%',
      inasistenciaEscolarPorcentaje: '3.5%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Alta - Presencia de estructuras del Picacho y Los Machacos',
      estructurasCombosPresentes: 'ODIN Picacho, Combos de El Salado, La Fe, Los del Progreso',
      modalidadesPrincipales: 'Extorsión a rutas alimentadoras de transporte, comercio zonal, microtráfico',
      indiceExtorsionEstimada: 'Presencia constante de cobro extorsivo en zonas periféricas',
      controlTerritorialRegulacion: 'Control estricto de accesos barriales nocturnos y de compraventa inmobiliaria informal',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 51200,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 13400, porcentaje: '26.2%' },
            { partido: 'Centro Democrático', votos: 9800, porcentaje: '19.1%' },
            { partido: 'Partido Conservador', votos: 4200, porcentaje: '8.2%' }
          ],
          distribucionCandidatos: [{ candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 2600, esElecto: true }]
        },
        asamblea: {
          votosTotales: 48900,
          distribucionPartidos: [{ partido: 'Creemos', votos: 12800, porcentaje: '26.2%' }, { partido: 'Centro Democrático', votos: 9900, porcentaje: '20.2%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 1890 }]
        },
        alcaldia: {
          votosTotales: 59800,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 42600, porcentaje: '71.2%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 9100, porcentaje: '15.2%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c7',
    numero: 7,
    nombre: 'Robledo',
    poblacionEstimada: '175.000 habs',
    barriosPrincipales: ['Robledo', 'Pilarica', 'Facultad de Minas', 'Aures No. 1 y 2', 'La Pola', 'El Diamante', 'San Germán'],
    demografia: {
      distribucionSexo: { hombres: '47.2%', mujeres: '52.8%' },
      distribucionGruposEtarios: { rango0_14: '17.5%', rango15_29: '27.8% (alta población estudiantil)', rango30_59: '39.9%', rango60_mas: '14.8%' },
      areasMaximaConcentracion: 'Robledo Centro, Pilarica, San Germán y Aures',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '8.4%', estrato2: '38.5%', estrato3: '36.2%', estrato4: '14.8%', estrato5: '2.1%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 2.1 SMMLV (Zona mixta: universitaria / residencial media / ladera)',
      distribucionNivelEducativo: { primaria: '18.4%', secundariaMedia: '47.2%', tecnicoTecnologico: '18.5%', universitarioPosgrado: '15.9%' },
      gradoFormalidadVivienda: { formal: '79.6%', informal: '20.4%' },
      distribucionActividadPrincipal: 'Servicios estudiantiles y universitarios (32%), Comercio (28%), Profesionales independientes (22%), Transporte (18%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '68.4%', subsidiado: '29.2%', noAsegurado: '2.4%' },
      gradoCoberturaServicios: { acueducto: '98.8%', alcantarillado: '96.9%', energiaElectrica: '99.8%', gasNatural: '94.8%', internetBandaAncha: '79.2%' },
      analfabetismoPorcentaje: '1.8%',
      empleoInformalPorcentaje: '47.5%',
      desempleoLargaDuracionPorcentaje: '9.8%',
      hacinamientoPorcentaje: '8.6%',
      inasistenciaEscolarPorcentaje: '2.4%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media - Segmentada entre ladera (Aures/Pola) y zonas de expansión (Pilarica)',
      estructurasCombosPresentes: 'ODIN Robledo, Combos de Aures, Curazao, El Diamante',
      modalidadesPrincipales: 'Extorsión focalizada en construcción de proyectos inmobiliarios y comercio de ladera',
      indiceExtorsionEstimada: 'Presión media en zonas altas, baja en ciudadelas universitarias',
      controlTerritorialRegulacion: 'Cobro de vigilancia no formal en urbanizaciones periféricas',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 58900,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 16800, porcentaje: '28.5%' },
            { partido: 'Centro Democrático', votos: 11200, porcentaje: '19.0%' },
            { partido: 'Partido Conservador', votos: 4600, porcentaje: '7.8%' }
          ],
          distribucionCandidatos: [{ candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 3200, esElecto: true }]
        },
        asamblea: {
          votosTotales: 56100,
          distribucionPartidos: [{ partido: 'Creemos', votos: 15900, porcentaje: '28.3%' }, { partido: 'Centro Democrático', votos: 11400, porcentaje: '20.3%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 2450 }]
        },
        alcaldia: {
          votosTotales: 69400,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 51200, porcentaje: '73.8%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 9800, porcentaje: '14.1%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c8',
    numero: 8,
    nombre: 'Villa Hermosa',
    poblacionEstimada: '142.000 habs',
    barriosPrincipales: ['Villa Hermosa', 'La Mansión', 'Enciso', 'Sucre', 'Los Ángeles', 'Trece de Noviembre', 'Llanaditas'],
    demografia: {
      distribucionSexo: { hombres: '47.4%', mujeres: '52.6%' },
      distribucionGruposEtarios: { rango0_14: '19.4%', rango15_29: '25.6%', rango30_59: '39.8%', rango60_mas: '15.2%' },
      areasMaximaConcentracion: 'Enciso, Llanaditas, Trece de Noviembre y Villa Hermosa Centro',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '19.2%', estrato2: '46.5%', estrato3: '32.1%', estrato4: '2.2%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.5 SMMLV',
      distribucionNivelEducativo: { primaria: '23.4%', secundariaMedia: '53.1%', tecnicoTecnologico: '14.8%', universitarioPosgrado: '8.7%' },
      gradoFormalidadVivienda: { formal: '71.2%', informal: '28.8%' },
      distribucionActividadPrincipal: 'Servicios generales (34%), Comercio barrial (30%), Transporte (20%), Construcción (16%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '58.2%', subsidiado: '39.1%', noAsegurado: '2.7%' },
      gradoCoberturaServicios: { acueducto: '98.1%', alcantarillado: '95.4%', energiaElectrica: '99.6%', gasNatural: '92.6%', internetBandaAncha: '68.5%' },
      analfabetismoPorcentaje: '2.4%',
      empleoInformalPorcentaje: '55.2%',
      desempleoLargaDuracionPorcentaje: '11.9%',
      hacinamientoPorcentaje: '11.8%',
      inasistenciaEscolarPorcentaje: '3.0%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media-Alta - Enclaves históricos de La Sierra y Trece de Noviembre',
      estructurasCombosPresentes: 'Combo La Sierra, Los Chamizos, Los Conejos, La Libertad',
      modalidadesPrincipales: 'Cobro extorsivo a transporte de busetas y chiveras, control de venta de pipetas de gas',
      indiceExtorsionEstimada: 'Presencia persistente en cuencas de ladera oriental',
      controlTerritorialRegulacion: 'Control de pasos de trocha y regulación de obras de construcción en invasiones',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 44300,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 11900, porcentaje: '26.9%' },
            { partido: 'Centro Democrático', votos: 8400, porcentaje: '19.0%' }
          ],
          distribucionCandidatos: [{ candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 2350, esElecto: true }]
        },
        asamblea: {
          votosTotales: 42100,
          distribucionPartidos: [{ partido: 'Creemos', votos: 11200, porcentaje: '26.6%' }, { partido: 'Centro Democrático', votos: 8500, porcentaje: '20.2%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 1720 }]
        },
        alcaldia: {
          votosTotales: 50800,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 36800, porcentaje: '72.4%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 7900, porcentaje: '15.6%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c9',
    numero: 9,
    nombre: 'Buenos Aires',
    poblacionEstimada: '143.500 habs',
    barriosPrincipales: ['Buenos Aires', 'Miraflores', 'Alejandro Echavarría', 'Barrios de Jesús', 'El Salvador', 'Loreto', 'Ocho de Marzo'],
    demografia: {
      distribucionSexo: { hombres: '47.0%', mujeres: '53.0%' },
      distribucionGruposEtarios: { rango0_14: '18.2%', rango15_29: '24.9%', rango30_59: '40.6%', rango60_mas: '16.3%' },
      areasMaximaConcentracion: 'Eje Tranvía de Ayacucho, Buenos Aires Centro, Caicedo y El Salvador',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '8.5%', estrato2: '39.8%', estrato3: '47.5%', estrato4: '4.2%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.85 SMMLV (Dinamismo turístico y comercial por el Tranvía)',
      distribucionNivelEducativo: { primaria: '19.8%', secundariaMedia: '51.4%', tecnicoTecnologico: '17.2%', universitarioPosgrado: '11.6%' },
      gradoFormalidadVivienda: { formal: '81.4%', informal: '18.6%' },
      distribucionActividadPrincipal: 'Comercio y gastronomía en Ayacucho (38%), Servicios profesionales y administrativos (28%), Transporte y logística (18%), Confección (16%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '67.2%', subsidiado: '30.4%', noAsegurado: '2.4%' },
      gradoCoberturaServicios: { acueducto: '98.9%', alcantarillado: '97.2%', energiaElectrica: '99.8%', gasNatural: '95.1%', internetBandaAncha: '76.8%' },
      analfabetismoPorcentaje: '1.9%',
      empleoInformalPorcentaje: '49.1%',
      desempleoLargaDuracionPorcentaje: '10.2%',
      hacinamientoPorcentaje: '9.1%',
      inasistenciaEscolarPorcentaje: '2.5%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media-Baja en eje Tranvía, Media en zonas altas (Caicedo/Ocho de Marzo)',
      estructurasCombosPresentes: 'Combos de Caicedo (ODIN Caicedo), Chamizos, San Antonio',
      modalidadesPrincipales: 'Cobro de extorsión a locales nocturnos de Ayacucho y préstamos informales',
      indiceExtorsionEstimada: 'Presencia moderada en comercio formal, focalizada en comercio no bancarizado',
      controlTerritorialRegulacion: 'Regulación de seguridad comunitaria no estatal en zonas periféricas',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 52100,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 14800, porcentaje: '28.4%' },
            { partido: 'Centro Democrático', votos: 10100, porcentaje: '19.4%' }
          ],
          distribucionCandidatos: [{ candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 2890, esElecto: true }]
        },
        asamblea: {
          votosTotales: 49800,
          distribucionPartidos: [{ partido: 'Creemos', votos: 14100, porcentaje: '28.3%' }, { partido: 'Centro Democrático', votos: 10200, porcentaje: '20.5%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 2150 }]
        },
        alcaldia: {
          votosTotales: 61400,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 45200, porcentaje: '73.6%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 8600, porcentaje: '14.0%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c10',
    numero: 10,
    nombre: 'La Candelaria (Centro)',
    poblacionEstimada: '86.000 habs (Población flotante: > 1.200.000 diaria)',
    barriosPrincipales: ['La Candelaria', 'Prado Centro', 'Guayaquil', 'San Benito', 'Boston', 'Calle Nueva', 'Estación Villa', 'Colón'],
    demografia: {
      distribucionSexo: { hombres: '48.9%', mujeres: '51.1%' },
      distribucionGruposEtarios: { rango0_14: '14.2%', rango15_29: '28.4%', rango30_59: '42.1%', rango60_mas: '15.3%' },
      areasMaximaConcentracion: 'Guayaquil (El Hueco), San Benito, Parque Berrío, Prado y Boston',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '4.2%', estrato2: '18.4%', estrato3: '58.1%', estrato4: '17.8%', estrato5: '1.5%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 2.2 SMMLV (Mayor concentración de transacciones comerciales de Antioquia)',
      distribucionNivelEducativo: { primaria: '16.5%', secundariaMedia: '48.2%', tecnicoTecnologico: '18.9%', universitarioPosgrado: '16.4%' },
      gradoFormalidadVivienda: { formal: '89.2%', informal: '10.8%' },
      distribucionActividadPrincipal: 'Comercio mayorista y minorista (48%), Servicios financieros, jurídicos y gubernamentales (32%), Hotelería y gastronomía (20%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '72.4%', subsidiado: '24.8%', noAsegurado: '2.8%' },
      gradoCoberturaServicios: { acueducto: '99.4%', alcantarillado: '98.6%', energiaElectrica: '99.9%', gasNatural: '96.2%', internetBandaAncha: '83.4%' },
      analfabetismoPorcentaje: '1.5%',
      empleoInformalPorcentaje: '44.8%',
      desempleoLargaDuracionPorcentaje: '9.2%',
      hacinamientoPorcentaje: '7.8%',
      inasistenciaEscolarPorcentaje: '2.1%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Muy Alta - Centro de gravedad de recaudación extorsiva y rentas ilícitas del crimen organizado',
      estructurasCombosPresentes: 'La Terraza, ODIN Caicedo, Los Rojas, Convives del Centro, bandas de San Benito',
      modalidadesPrincipales: 'Cobro sistemático de "vigilancia privada ilegal" a cada local y puesto de calle, venta de plazas de vicio, falsificación y contrabando',
      indiceExtorsionEstimada: 'Extorsión casi universal (>90% de comerciantes informales y formales abonan cuota semanal)',
      controlTerritorialRegulacion: 'Regulación sobre el uso del espacio público, venta de puestos callejeros y resolución forzada de disputas comerciales',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 36800,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 10800, porcentaje: '29.3%' },
            { partido: 'Centro Democrático', votos: 7200, porcentaje: '19.6%' }
          ],
          distribucionCandidatos: [{ candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 2150, esElecto: true }]
        },
        asamblea: {
          votosTotales: 35100,
          distribucionPartidos: [{ partido: 'Creemos', votos: 10200, porcentaje: '29.1%' }, { partido: 'Centro Democrático', votos: 7100, porcentaje: '20.2%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 1580 }]
        },
        alcaldia: {
          votosTotales: 43200,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 32100, porcentaje: '74.3%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 5800, porcentaje: '13.4%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c11',
    numero: 11,
    nombre: 'Laureles - Estadio',
    poblacionEstimada: '124.000 habs',
    barriosPrincipales: ['Laureles', 'Estadio', 'Florida Nueva', 'Los Colores', 'Cuarta Brigada', 'San Joaquín', 'Bolivariana', 'El Velódromo'],
    demografia: {
      distribucionSexo: { hombres: '45.8%', mujeres: '54.2%' },
      distribucionGruposEtarios: { rango0_14: '13.8%', rango15_29: '23.1%', rango30_59: '41.2%', rango60_mas: '21.9% (Alta longevidad)' },
      areasMaximaConcentracion: 'Primer y Segundo Parque de Laureles, Cra 70, San Joaquín y Los Colores',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '0.0%', estrato2: '0.8%', estrato3: '8.4%', estrato4: '48.2%', estrato5: '41.6%', estrato6: '1.0%' },
      estadioIngresos: 'Ingreso promedio: 4.8 SMMLV (Clase media-alta consolidada)',
      distribucionNivelEducativo: { primaria: '6.2%', secundariaMedia: '28.4%', tecnicoTecnologico: '19.2%', universitarioPosgrado: '46.2%' },
      gradoFormalidadVivienda: { formal: '98.8%', informal: '1.2%' },
      distribucionActividadPrincipal: 'Servicios profesionales, tecnología y consultoría (42%), Gastronomía y turismo en Cra 70 y Nutibara (34%), Comercio boutique (24%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '91.8%', subsidiado: '7.2%', noAsegurado: '1.0%' },
      gradoCoberturaServicios: { acueducto: '99.9%', alcantarillado: '99.7%', energiaElectrica: '100%', gasNatural: '98.8%', internetBandaAncha: '94.2%' },
      analfabetismoPorcentaje: '0.6%',
      empleoInformalPorcentaje: '24.5%',
      desempleoLargaDuracionPorcentaje: '6.2%',
      hacinamientoPorcentaje: '3.1%',
      inasistenciaEscolarPorcentaje: '1.1%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Baja gobernanza territorial directa; Foco de hurto y delitos patrimoniales',
      estructurasCombosPresentes: 'Bandas foráneas de fleteros y redes transnacionales de explotación sexual en corredor turístico',
      modalidadesPrincipales: 'Hurto a personas (relojes de alta gama, celulares), estafas a turistas y explotación sexual comercial',
      indiceExtorsionEstimada: 'Extorsión sofisticada / encubierta a locales gastronómicos de alta gama',
      controlTerritorialRegulacion: 'Sin control territorial abierto sobre la población residente',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 64200,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 21800, porcentaje: '34.0%' },
            { partido: 'Centro Democrático', votos: 16900, porcentaje: '26.3%' },
            { partido: 'Partido Conservador', votos: 4800, porcentaje: '7.5%' }
          ],
          distribucionCandidatos: [
            { candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 4850, esElecto: true },
            { candidato: 'Sebastián López', partido: 'Centro Democrático', votos: 4120, esElecto: true }
          ]
        },
        asamblea: {
          votosTotales: 61800,
          distribucionPartidos: [{ partido: 'Creemos', votos: 21100, porcentaje: '34.1%' }, { partido: 'Centro Democrático', votos: 17200, porcentaje: '27.8%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 3450 }]
        },
        alcaldia: {
          votosTotales: 74800,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 61400, porcentaje: '82.1%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 4900, porcentaje: '6.5%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c12',
    numero: 12,
    nombre: 'La América',
    poblacionEstimada: '98.500 habs',
    barriosPrincipales: ['La América', 'Santa Mónica', 'Ferrini', 'Calasanz', 'Simón Bolívar', 'Campo Alegre', 'La Floresta'],
    demografia: {
      distribucionSexo: { hombres: '46.2%', mujeres: '53.8%' },
      distribucionGruposEtarios: { rango0_14: '15.4%', rango15_29: '23.8%', rango30_59: '41.8%', rango60_mas: '19.0%' },
      areasMaximaConcentracion: 'La Floresta, Simón Bolívar, Santa Mónica y Calasanz',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '0.0%', estrato2: '1.2%', estrato3: '38.4%', estrato4: '54.6%', estrato5: '5.8%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 3.2 SMMLV (Estrato medio-alto tradicional)',
      distribucionNivelEducativo: { primaria: '10.5%', secundariaMedia: '38.2%', tecnicoTecnologico: '21.4%', universitarioPosgrado: '29.9%' },
      gradoFormalidadVivienda: { formal: '96.4%', informal: '3.6%' },
      distribucionActividadPrincipal: 'Servicios de consultoría y salud (38%), Comercio zonal y gastronómico (34%), Actividades financieras e inmobiliarias (28%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '84.6%', subsidiado: '13.9%', noAsegurado: '1.5%' },
      gradoCoberturaServicios: { acueducto: '99.7%', alcantarillado: '99.2%', energiaElectrica: '99.9%', gasNatural: '97.8%', internetBandaAncha: '88.6%' },
      analfabetismoPorcentaje: '0.9%',
      empleoInformalPorcentaje: '32.1%',
      desempleoLargaDuracionPorcentaje: '7.4%',
      hacinamientoPorcentaje: '4.8%',
      inasistenciaEscolarPorcentaje: '1.4%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Baja - Microestructuras subordinadas sin control directo residencial',
      estructurasCombosPresentes: 'Presencia periférica de combos de San Javier y Belén en fronteras',
      modalidadesPrincipales: 'Hurto calificado a comercio y fleteo en corredores bancarios de San Juan',
      indiceExtorsionEstimada: 'Baja en áreas residenciales, ocasional en obras civiles',
      controlTerritorialRegulacion: 'Inexistente en el espacio público abierto formal',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 48900,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 15400, porcentaje: '31.5%' },
            { partido: 'Centro Democrático', votos: 11900, porcentaje: '24.3%' }
          ],
          distribucionCandidatos: [{ candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 3450, esElecto: true }]
        },
        asamblea: {
          votosTotales: 46800,
          distribucionPartidos: [{ partido: 'Creemos', votos: 14800, porcentaje: '31.6%' }, { partido: 'Centro Democrático', votos: 12100, porcentaje: '25.9%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 2600 }]
        },
        alcaldia: {
          votosTotales: 56900,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 45200, porcentaje: '79.4%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 4800, porcentaje: '8.4%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c13',
    numero: 13,
    nombre: 'San Javier',
    poblacionEstimada: '141.000 habs',
    barriosPrincipales: ['San Javier', 'El Salado', '20 de Julio', 'Las Independencias I, II, III', 'Nuevos Conquistadores', 'Eduardo Santos', 'El Corazón'],
    demografia: {
      distribucionSexo: { hombres: '48.0%', mujeres: '52.0%' },
      distribucionGruposEtarios: { rango0_14: '21.5%', rango15_29: '27.2%', rango30_59: '38.4%', rango60_mas: '12.9%' },
      areasMaximaConcentracion: 'Las Independencias (Escaleras Eléctricas), 20 de Julio, San Javier Centro y El Salado',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '41.2%', estrato2: '46.8%', estrato3: '12.0%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.3 SMMLV (Impacto positivo del Graffitour turístico en sector escaleras)',
      distribucionNivelEducativo: { primaria: '29.5%', secundariaMedia: '52.4%', tecnicoTecnologico: '13.2%', universitarioPosgrado: '4.9%' },
      gradoFormalidadVivienda: { formal: '61.5%', informal: '38.5%' },
      distribucionActividadPrincipal: 'Turismo comunitario, guianzas y souvenirs (28%), Comercio minorista (32%), Servicios operativos y transporte (24%), Confección (16%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '48.1%', subsidiado: '49.1%', noAsegurado: '2.8%' },
      gradoCoberturaServicios: { acueducto: '97.2%', alcantarillado: '93.8%', energiaElectrica: '99.4%', gasNatural: '89.4%', internetBandaAncha: '61.2%' },
      analfabetismoPorcentaje: '3.1%',
      empleoInformalPorcentaje: '60.4%',
      desempleoLargaDuracionPorcentaje: '13.4%',
      hacinamientoPorcentaje: '13.8%',
      inasistenciaEscolarPorcentaje: '3.6%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Alta histórica - Regulación por ODIN San Javier / La Agonía / Los Betanias',
      estructurasCombosPresentes: 'La Agonía, Los Betanias, El Salado, La Quiebra, San Javier La Loma',
      modalidadesPrincipales: 'Cobro de extorsión a negocios turísticos y transporte informal, control de microtráfico en callejones',
      indiceExtorsionEstimada: 'Presión extorsiva constante, aunque moderada en el circuito turístico vigilado institucionalmente',
      controlTerritorialRegulacion: 'Límites barriales entre combos, mediación obligada en conflictos domésticos y venta de predios informales',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 38900,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 9800, porcentaje: '25.2%' },
            { partido: 'Centro Democrático', votos: 7100, porcentaje: '18.3%' },
            { partido: 'Independientes', votos: 5400, porcentaje: '13.9%' }
          ],
          distribucionCandidatos: [{ candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 1980, esElecto: true }]
        },
        asamblea: {
          votosTotales: 36800,
          distribucionPartidos: [{ partido: 'Creemos', votos: 9200, porcentaje: '25.0%' }, { partido: 'Centro Democrático', votos: 7200, porcentaje: '19.6%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 1450 }]
        },
        alcaldia: {
          votosTotales: 44900,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 30100, porcentaje: '67.0%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 9200, porcentaje: '20.5%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c14',
    numero: 14,
    nombre: 'El Poblado',
    poblacionEstimada: '138.000 habs',
    barriosPrincipales: ['El Poblado', 'Castropol', 'Manila', 'Astorga', 'Patio Bonito', 'La Florida', 'Los Naranjos', 'Santa María de los Ángeles', 'San Lucas', 'El Tesoro'],
    demografia: {
      distribucionSexo: { hombres: '44.8%', mujeres: '55.2%' },
      distribucionGruposEtarios: { rango0_14: '14.1%', rango15_29: '21.4%', rango30_59: '42.8%', rango60_mas: '21.7%' },
      areasMaximaConcentracion: 'Parque Lleras, Manila, Provenza, Avenida El Poblado y San Lucas',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '0.0%', estrato2: '0.0%', estrato3: '0.5%', estrato4: '4.2%', estrato5: '28.1%', estrato6: '67.2%' },
      estadioIngresos: 'Ingreso promedio: 11.5 SMMLV (Mayor nivel de ingresos y capital per cápita de Colombia)',
      distribucionNivelEducativo: { primaria: '2.8%', secundariaMedia: '14.5%', tecnicoTecnologico: '11.8%', universitarioPosgrado: '70.9%' },
      gradoFormalidadVivienda: { formal: '99.6%', informal: '0.4%' },
      distribucionActividadPrincipal: 'Finanzas, banca y sedes corporativas multilaterales (45%), Hotelería y gastronomía de lujo en Provenza/Lleras (35%), Bienes raíces y consultoría (20%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '97.6%', subsidiado: '1.9%', noAsegurado: '0.5%' },
      gradoCoberturaServicios: { acueducto: '100%', alcantarillado: '99.9%', energiaElectrica: '100%', gasNatural: '99.2%', internetBandaAncha: '98.5%' },
      analfabetismoPorcentaje: '0.3%',
      empleoInformalPorcentaje: '14.2%',
      desempleoLargaDuracionPorcentaje: '4.5%',
      hacinamientoPorcentaje: '1.4%',
      inasistenciaEscolarPorcentaje: '0.6%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Baja regulación territorial sobre residentes; Alta concentración de redes de lavado y rentas ilícitas transnacionales',
      estructurasCombosPresentes: 'Oficina de Envigado / La Terraza (operaciones financieras), redes de microtráfico VIP y proxenetismo internacional',
      modalidadesPrincipales: 'Fleteo y hurto de alta gama a extranjeros, redes de trata de personas y explotación sexual comercial, lavado de activos',
      indiceExtorsionEstimada: 'Extorsión bajo esquema de seguridad privada forzada a discotecas y bares',
      controlTerritorialRegulacion: 'No ejercen control sobre la vida civil cotidiana de las urbanizaciones cerradas',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 72400,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 28900, porcentaje: '39.9%' },
            { partido: 'Centro Democrático', votos: 24600, porcentaje: '34.0%' },
            { partido: 'Partido Conservador', votos: 4200, porcentaje: '5.8%' }
          ],
          distribucionCandidatos: [
            { candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 7890, esElecto: true },
            { candidato: 'Sebastián López', partido: 'Centro Democrático', votos: 6540, esElecto: true }
          ]
        },
        asamblea: {
          votosTotales: 70100,
          distribucionPartidos: [{ partido: 'Creemos', votos: 27800, porcentaje: '39.7%' }, { partido: 'Centro Democrático', votos: 25100, porcentaje: '35.8%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 5400 }]
        },
        alcaldia: {
          votosTotales: 83500,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 73900, porcentaje: '88.5%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 3200, porcentaje: '3.8%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c15',
    numero: 15,
    nombre: 'Guayabal',
    poblacionEstimada: '102.000 habs',
    barriosPrincipales: ['Guayabal', 'Santa Fe', 'Campo Amor', 'Cristo Rey', 'Trinidad (Barrio Antioquia)', 'La Colina'],
    demografia: {
      distribucionSexo: { hombres: '47.1%', mujeres: '52.9%' },
      distribucionGruposEtarios: { rango0_14: '16.8%', rango15_29: '24.5%', rango30_59: '41.2%', rango60_mas: '17.5%' },
      areasMaximaConcentracion: 'Barrio Antioquia (Trinidad), Cristo Rey, Campo Amor y Guayabal Industrial',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '0.0%', estrato2: '8.4%', estrato3: '74.2%', estrato4: '16.8%', estrato5: '0.6%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 2.4 SMMLV (Alta concentración fabril, logística y de servicios mecánicos)',
      distribucionNivelEducativo: { primaria: '15.8%', secundariaMedia: '46.2%', tecnicoTecnologico: '21.5%', universitarioPosgrado: '16.5%' },
      gradoFormalidadVivienda: { formal: '92.4%', informal: '7.6%' },
      distribucionActividadPrincipal: 'Industria manufacturera, autopartes y metalmecánica (40%), Logística y bodegaje (30%), Comercio y gastronomía (30%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '78.5%', subsidiado: '19.8%', noAsegurado: '1.7%' },
      gradoCoberturaServicios: { acueducto: '99.4%', alcantarillado: '98.8%', energiaElectrica: '99.9%', gasNatural: '97.2%', internetBandaAncha: '84.1%' },
      analfabetismoPorcentaje: '1.2%',
      empleoInformalPorcentaje: '39.8%',
      desempleoLargaDuracionPorcentaje: '8.1%',
      hacinamientoPorcentaje: '6.2%',
      inasistenciaEscolarPorcentaje: '1.8%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media-Alta en enclave histórico de Barrio Antioquia; Media en resto de la comuna',
      estructurasCombosPresentes: 'Combos de Barrio Antioquia (La Raya, La 24), articulados históricamente a redes mayores',
      modalidadesPrincipales: 'Mayor centro de expendio continuo de estupefacientes (Barrio Antioquia), cobro de seguridad a bodegas',
      indiceExtorsionEstimada: 'Cobro focalizado en corredores industriales y talleres mecánicos',
      controlTerritorialRegulacion: 'Control territorial estricto en los accesos vehiculares a Barrio Antioquia para protección de plazas',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 41200,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 12800, porcentaje: '31.1%' },
            { partido: 'Centro Democrático', votos: 9200, porcentaje: '22.3%' }
          ],
          distribucionCandidatos: [{ candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 2800, esElecto: true }]
        },
        asamblea: {
          votosTotales: 39500,
          distribucionPartidos: [{ partido: 'Creemos', votos: 12200, porcentaje: '30.9%' }, { partido: 'Centro Democrático', votos: 9400, porcentaje: '23.8%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 2100 }]
        },
        alcaldia: {
          votosTotales: 47900,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 36800, porcentaje: '76.8%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 5200, porcentaje: '10.9%' }
          ]
        }
      }
    }
  },
  {
    id: 'med-c16',
    numero: 16,
    nombre: 'Belén',
    poblacionEstimada: '208.000 habs',
    barriosPrincipales: ['Belén', 'Rosales', 'Fátima', 'La Palma', 'Los Alpes', 'San Bernardo', 'Las Playas', 'Altavista (Sector urbano)', 'El Rincón', 'La Mota', 'Loma de Los Bernal'],
    demografia: {
      distribucionSexo: { hombres: '46.5%', mujeres: '53.5%' },
      distribucionGruposEtarios: { rango0_14: '16.2%', rango15_29: '24.1%', rango30_59: '41.5%', rango60_mas: '18.2%' },
      areasMaximaConcentracion: 'Parque de Belén, Los Alpes, La Mota, Loma de los Bernal y El Rincón',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '1.2%', estrato2: '12.4%', estrato3: '44.8%', estrato4: '31.2%', estrato5: '10.4%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 3.1 SMMLV (Comuna de mayor tamaño poblacional y heterogeneidad socioeconómica)',
      distribucionNivelEducativo: { primaria: '12.8%', secundariaMedia: '42.1%', tecnicoTecnologico: '20.6%', universitarioPosgrado: '24.5%' },
      gradoFormalidadVivienda: { formal: '91.8%', informal: '8.2%' },
      distribucionActividadPrincipal: 'Comercio y servicios en CC Molinos y Parque de Belén (40%), Servicios profesionales (32%), Industria y transporte (28%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '82.1%', subsidiado: '16.4%', noAsegurado: '1.5%' },
      gradoCoberturaServicios: { acueducto: '99.5%', alcantarillado: '98.9%', energiaElectrica: '99.9%', gasNatural: '97.5%', internetBandaAncha: '87.2%' },
      analfabetismoPorcentaje: '1.0%',
      empleoInformalPorcentaje: '35.4%',
      desempleoLargaDuracionPorcentaje: '7.8%',
      hacinamientoPorcentaje: '5.4%',
      inasistenciaEscolarPorcentaje: '1.5%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media-Alta en sectores altos (Rincón, Zafra, La Capilla); Media-Baja en Rosales y La Mota',
      estructurasCombosPresentes: 'ODIN Belén, Combos de Zafra, Los Chivos, La Capilla, Los Pájaros',
      modalidadesPrincipales: 'Extorsión al comercio barrial y rutas de transporte en ladera, control de microtráfico',
      indiceExtorsionEstimada: 'Presencia persistente en cuenca limítrofe con el corregimiento de Altavista',
      controlTerritorialRegulacion: 'Regulación de parqueaderos comunitarios y cobro por seguridad vecinal en laderas',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 79800,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 25400, porcentaje: '31.8%' },
            { partido: 'Centro Democrático', votos: 18900, porcentaje: '23.7%' },
            { partido: 'Partido Conservador', votos: 5800, porcentaje: '7.3%' }
          ],
          distribucionCandidatos: [
            { candidato: 'Andrés Felipe Tobón', partido: 'Creemos', votos: 5420, esElecto: true },
            { candidato: 'Sebastián López', partido: 'Centro Democrático', votos: 4890, esElecto: true }
          ]
        },
        asamblea: {
          votosTotales: 76400,
          distribucionPartidos: [{ partido: 'Creemos', votos: 24200, porcentaje: '31.7%' }, { partido: 'Centro Democrático', votos: 19100, porcentaje: '25.0%' }],
          distribucionCandidatos: [{ candidato: 'Mateo Escobar', partido: 'Creemos', votos: 4100 }]
        },
        alcaldia: {
          votosTotales: 92100,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Creemos', votos: 72400, porcentaje: '78.6%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 9800, porcentaje: '10.6%' }
          ]
        }
      }
    }
  }
];

export const MEDELLIN_ANALYST: MunicipalityAnalystItem = {
  id: 'medellin',
  name: 'Medellín',
  subregion: 'Valle de Aburrá (Centro)',
  badgeColor: 'emerald',
  poblacionEstimada: 2600000,
  censoElectoral: 1780000,
  tieneComunas: true,
  cantidadComunas: 16,
  detalleComunasOBarrios: '1. Popular, 2. Santa Cruz, 3. Manrique, 4. Aranjuez, 5. Castilla, 6. Doce de Octubre, 7. Robledo, 8. Villa Hermosa, 9. Buenos Aires, 10. La Candelaria (Centro), 11. Laureles - Estadio, 12. La América, 13. San Javier, 14. El Poblado, 15. Guayabal, 16. Belén.',
  comunas: MEDELLIN_COMUNAS,
  panelGeneral: {
    censoPoblacional: {
      poblacionTotal: '2.600.000 habitantes (Proyección DANE)',
      censoElectoral: '1.780.000 ciudadanos habilitados',
      distribucionSexo: { hombres: '47.1%', mujeres: '52.9%' },
      distribucionEdades: { rango0_14: '17.8%', rango15_29: '24.9%', rango30_59: '40.8%', rango60_mas: '16.5%' },
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      actividadesEconomicasPrincipales: 'Servicios financieros y corporativos (34%), Comercio mayorista y minorista (28%), Turismo, gastronomía y hotelería (18%), Industria manufacturera, textil y tecnología (20%)',
      desempleo: '8.7% (Tasa de desempleo AMVA consolidada)',
      distribucionIngresos: 'Estratos 1 y 2: 43.8% | Estratos 3 y 4: 48.6% | Estratos 5 y 6: 7.6%',
      fuenteNota: SOURCE_WEB,
    },
    electoral: {
      nacionales2026: {
        senado: {
          votosTotales: 'Sin Datos',
          distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente elecciones legislativas 2026' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        camara: {
          votosTotales: 'Sin Datos',
          distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente elecciones legislativas 2026' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        presidencia: {
          votosTotales: 'Sin Datos',
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente elecciones presidenciales 2026' }]
        }
      },
      locales2023: {
        concejo: {
          votosTotales: 959462,
          distribucionPartidos: [
            { partido: 'Partido Político Creemos', votos: 226470, porcentaje: '25.75%', curules: 8 },
            { partido: 'Partido Centro Democrático', votos: 163752, porcentaje: '18.62%', curules: 5 },
            { partido: 'Partido Conservador Colombiano', votos: 64288, porcentaje: '7.31%', curules: 2 },
            { partido: 'Partido Liberal Colombiano', votos: 48542, porcentaje: '5.52%', curules: 1 },
            { partido: 'Partido Alianza Verde', votos: 45214, porcentaje: '5.14%', curules: 1 },
            { partido: 'Pacto Histórico', votos: 43810, porcentaje: '4.98%', curules: 1 },
            { partido: 'Partido ASI', votos: 36490, porcentaje: '4.15%', curules: 1 },
            { partido: 'Independientes', votos: 35120, porcentaje: '3.99%', curules: 1 }
          ],
          distribucionCandidatos: [
            { candidato: 'Andrés Felipe Tobón Villada', partido: 'Creemos', votos: 43795, esElecto: true },
            { candidato: 'Sebastián López Valencia', partido: 'Centro Democrático', votos: 42444, esElecto: true },
            { candidato: 'María Paulina Suárez Roldán', partido: 'Creemos', votos: 16145, esElecto: true },
            { candidato: 'Santiago Perdomo Montoya', partido: 'Creemos', votos: 15240, esElecto: true },
            { candidato: 'Claudia Victoria Carrasquilla', partido: 'Centro Democrático', votos: 14966, esElecto: true },
            { candidato: 'Juan Ramón Jiménez Lara', partido: 'Conservador', votos: 14500, esElecto: true },
            { candidato: 'Farley Jhair Macías Betancur', partido: 'Liberal', votos: 10491, esElecto: true }
          ]
        },
        asamblea: {
          votosTotales: 912400,
          distribucionPartidos: [
            { partido: 'Partido Creemos', votos: 245600, porcentaje: '26.9%' },
            { partido: 'Partido Centro Democrático', votos: 201300, porcentaje: '22.1%' },
            { partido: 'Partido Conservador', votos: 84200, porcentaje: '9.2%' },
            { partido: 'Partido Liberal', votos: 65100, porcentaje: '7.1%' }
          ],
          distribucionCandidatos: [
            { candidato: 'Mateo Escobar', partido: 'Creemos', votos: 34500 },
            { candidato: 'Verónica Arango', partido: 'Centro Democrático', votos: 28900 }
          ]
        },
        alcaldia: {
          votosTotales: 978871,
          distribucionCandidatos: [
            { candidato: 'Federico Andrés Gutiérrez Zuluaga', partido: 'Partido Político Creemos', votos: 697910, porcentaje: '73.63%', esElecto: true },
            { candidato: 'Juan Carlos Upegui Vanegas', partido: 'Independientes', votos: 95883, porcentaje: '10.12%' },
            { candidato: 'Albert Yordano Corredor Bustamante', partido: 'Medellín Nos Une', votos: 27261, porcentaje: '2.88%' },
            { candidato: 'María Paulina Aguinaga Lezcano', partido: 'Por Medellín', votos: 12836, porcentaje: '1.35%' },
            { candidato: 'Gilberto Tobón Sanín', partido: 'Fuerza Ciudadana', votos: 11776, porcentaje: '1.24%' },
            { candidato: 'Votos en Blanco', partido: 'Voto en Blanco', votos: 65502, porcentaje: '6.91%' }
          ]
        }
      }
    }
  }
};

import { CENSUS_SOURCE_LABEL, formatCensus, officialCensusOr } from '../../services/electoralCensusService';
import { MunicipalityAnalystItem, ComunaAnalysisData } from './analystTypes';

const SOURCE_WEB = '(información obtenida de la web)';
const SOURCE_EAFIT = '(información obtenida de la web - Informe Gobernanza Criminal AMVA / EAFIT)';

// BELLO COMUNAS (11 comunas)
export const BELLO_COMUNAS: ComunaAnalysisData[] = [
  {
    id: 'bel-c1',
    numero: 1,
    nombre: 'París',
    poblacionEstimada: '52.000 habs',
    barriosPrincipales: ['París', 'Los Sauces', 'El Cafetal', 'La Maruchenga', 'José Antonio Galán'],
    demografia: {
      distribucionSexo: { hombres: '48.6%', mujeres: '51.4%' },
      distribucionGruposEtarios: { rango0_14: '22.8%', rango15_29: '27.4%', rango30_59: '37.6%', rango60_mas: '12.2%' },
      areasMaximaConcentracion: 'París parte central y La Maruchenga (frontera con Medellín Comuna 6)',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '64.2%', estrato2: '34.8%', estrato3: '1.0%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.15 SMMLV',
      distribucionNivelEducativo: { primaria: '31.2%', secundariaMedia: '53.4%', tecnicoTecnologico: '11.8%', universitarioPosgrado: '3.6%' },
      gradoFormalidadVivienda: { formal: '54.2%', informal: '45.8%' },
      distribucionActividadPrincipal: 'Comercio informal (36%), Construcción y mano de obra operativa (32%), Confección (18%), Servicios (14%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '41.2%', subsidiado: '55.6%', noAsegurado: '3.2%' },
      gradoCoberturaServicios: { acueducto: '96.8%', alcantarillado: '92.4%', energiaElectrica: '99.2%', gasNatural: '86.4%', internetBandaAncha: '54.2%' },
      analfabetismoPorcentaje: '3.5%',
      empleoInformalPorcentaje: '63.4%',
      desempleoLargaDuracionPorcentaje: '14.2%',
      hacinamientoPorcentaje: '15.4%',
      inasistenciaEscolarPorcentaje: '3.9%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Alta - Histórico corredor de bandas del Picacho y combos locales de París',
      estructurasCombosPresentes: 'Combos de El Cafetal, La Maruchenga, articulados a El Picacho / Pachelly',
      modalidadesPrincipales: 'Cobro de extorsión a tiendas, transporte barrial y comercio de alimentos',
      indiceExtorsionEstimada: 'Presión extorsiva constante sobre transporte informal y pequeños negocios',
      controlTerritorialRegulacion: 'Límites interbarriales y mediación forzada de conflictos',
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
          votosTotales: 14200,
          distribucionPartidos: [{ partido: 'Centro Democrático', votos: 2800, porcentaje: '19.7%' }, { partido: 'Partido Liberal', votos: 2400, porcentaje: '16.9%' }, { partido: 'Partido Conservador', votos: 1900, porcentaje: '13.4%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado municipal' }]
        },
        asamblea: {
          votosTotales: 13500,
          distribucionPartidos: [{ partido: 'Centro Democrático', votos: 2700, porcentaje: '20.0%' }, { partido: 'Partido Liberal', votos: 2300, porcentaje: '17.0%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        alcaldia: {
          votosTotales: 16100,
          distribucionCandidatos: [
            { candidato: 'Lorena González Ospina', partido: 'Bello Nos Une', votos: 7200, porcentaje: '44.7%', esElecto: true },
            { candidato: 'Hugo Díaz', partido: 'Coalición', votos: 3400, porcentaje: '21.1%' }
          ]
        }
      }
    }
  },
  {
    id: 'bel-c2',
    numero: 2,
    nombre: 'La Madera',
    poblacionEstimada: '46.000 habs',
    barriosPrincipales: ['La Madera', 'Santander', 'Barrio Nuevo', 'La Cabañita', 'Gran Avenida'],
    demografia: {
      distribucionSexo: { hombres: '47.8%', mujeres: '52.2%' },
      distribucionGruposEtarios: { rango0_14: '19.4%', rango15_29: '25.8%', rango30_59: '39.8%', rango60_mas: '15.0%' },
      areasMaximaConcentracion: 'La Cabañita y Gran Avenida',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '8.4%', estrato2: '48.2%', estrato3: '41.8%', estrato4: '1.6%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.65 SMMLV',
      distribucionNivelEducativo: { primaria: '22.8%', secundariaMedia: '53.1%', tecnicoTecnologico: '15.4%', universitarioPosgrado: '8.7%' },
      gradoFormalidadVivienda: { formal: '84.6%', informal: '15.4%' },
      distribucionActividadPrincipal: 'Comercio minorista (34%), Servicios mecánicos y automotrices (28%), Transporte (22%), Manufactura (16%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '62.4%', subsidiado: '35.1%', noAsegurado: '2.5%' },
      gradoCoberturaServicios: { acueducto: '98.5%', alcantarillado: '96.2%', energiaElectrica: '99.7%', gasNatural: '93.8%', internetBandaAncha: '72.4%' },
      analfabetismoPorcentaje: '2.1%',
      empleoInformalPorcentaje: '52.8%',
      desempleoLargaDuracionPorcentaje: '10.8%',
      hacinamientoPorcentaje: '9.8%',
      inasistenciaEscolarPorcentaje: '2.7%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media - Frontera entre estructuras de Bello y Medellín',
      estructurasCombosPresentes: 'Combos de La Madera, Barrio Nuevo',
      modalidadesPrincipales: 'Cobro de vigilancia informal y microtráfico local',
      indiceExtorsionEstimada: 'Cobro moderado a talleres y comercio de la Autopista Norte',
      controlTerritorialRegulacion: 'Regulación sobre parqueo y convivencia',
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
          votosTotales: 15400,
          distribucionPartidos: [{ partido: 'Centro Democrático', votos: 3400, porcentaje: '22.1%' }, { partido: 'Partido Liberal', votos: 2800, porcentaje: '18.2%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado municipal' }]
        },
        asamblea: { votosTotales: 14800, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 3300, porcentaje: '22.3%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: {
          votosTotales: 17200,
          distribucionCandidatos: [{ candidato: 'Lorena González Ospina', partido: 'Bello Nos Une', votos: 8400, porcentaje: '48.8%', esElecto: true }]
        }
      }
    }
  },
  {
    id: 'bel-c3',
    numero: 3,
    nombre: 'Santa Ana',
    poblacionEstimada: '48.000 habs',
    barriosPrincipales: ['Santa Ana', 'Las Granjas', 'Salento', 'Los Alpes', 'Hermosa Provincia'],
    demografia: {
      distribucionSexo: { hombres: '47.5%', mujeres: '52.5%' },
      distribucionGruposEtarios: { rango0_14: '19.8%', rango15_29: '26.1%', rango30_59: '39.5%', rango60_mas: '14.6%' },
      areasMaximaConcentracion: 'Santa Ana central y Salento',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '12.4%', estrato2: '58.2%', estrato3: '29.4%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.45 SMMLV',
      distribucionNivelEducativo: { primaria: '24.6%', secundariaMedia: '54.2%', tecnicoTecnologico: '14.1%', universitarioPosgrado: '7.1%' },
      gradoFormalidadVivienda: { formal: '78.2%', informal: '21.8%' },
      distribucionActividadPrincipal: 'Comercio barrial (34%), Operarios industriales (30%), Servicios (22%), Transporte (14%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '56.8%', subsidiado: '40.8%', noAsegurado: '2.4%' },
      gradoCoberturaServicios: { acueducto: '98.1%', alcantarillado: '95.4%', energiaElectrica: '99.6%', gasNatural: '91.8%', internetBandaAncha: '68.2%' },
      analfabetismoPorcentaje: '2.4%',
      empleoInformalPorcentaje: '56.4%',
      desempleoLargaDuracionPorcentaje: '11.6%',
      hacinamientoPorcentaje: '11.4%',
      inasistenciaEscolarPorcentaje: '3.0%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media - Influencia de combos de Bellavista y Santa Ana',
      estructurasCombosPresentes: 'Combos locales de Santa Ana / El Mesa',
      modalidadesPrincipales: 'Microtráfico y cobro de vigilancia',
      indiceExtorsionEstimada: 'Presencia moderada en comercio',
      controlTerritorialRegulacion: 'Control de accesos peatonales',
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
          votosTotales: 15900,
          distribucionPartidos: [{ partido: 'Centro Democrático', votos: 3200, porcentaje: '20.1%' }, { partido: 'Partido Liberal', votos: 2900, porcentaje: '18.2%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }]
        },
        asamblea: { votosTotales: 15100, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 3100, porcentaje: '20.5%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: {
          votosTotales: 17800,
          distribucionCandidatos: [{ candidato: 'Lorena González Ospina', partido: 'Bello Nos Une', votos: 8100, porcentaje: '45.5%', esElecto: true }]
        }
      }
    }
  },
  {
    id: 'bel-c4',
    numero: 4,
    nombre: 'Suárez',
    poblacionEstimada: '72.000 habs',
    barriosPrincipales: ['Suárez', 'Central (Parque de Bello)', 'Puerto Bello', 'Rincón Santo', 'Congolo', 'Prado'],
    demografia: {
      distribucionSexo: { hombres: '47.2%', mujeres: '52.8%' },
      distribucionGruposEtarios: { rango0_14: '16.5%', rango15_29: '25.2%', rango30_59: '41.5%', rango60_mas: '16.8%' },
      areasMaximaConcentracion: 'Parque Principal de Bello, Choza Marco Fidel Suárez, Congolo y Prado',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '1.2%', estrato2: '32.4%', estrato3: '61.8%', estrato4: '4.6%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 2.1 SMMLV (Centro institucional y comercial de Bello)',
      distribucionNivelEducativo: { primaria: '18.4%', secundariaMedia: '49.8%', tecnicoTecnologico: '18.2%', universitarioPosgrado: '13.6%' },
      gradoFormalidadVivienda: { formal: '91.2%', informal: '8.8%' },
      distribucionActividadPrincipal: 'Comercio mayorista y retail en el Parque (42%), Servicios gubernamentales y financieros (30%), Gastronomía (28%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '74.2%', subsidiado: '23.8%', noAsegurado: '2.0%' },
      gradoCoberturaServicios: { acueducto: '99.2%', alcantarillado: '98.1%', energiaElectrica: '99.9%', gasNatural: '96.2%', internetBandaAncha: '82.4%' },
      analfabetismoPorcentaje: '1.4%',
      empleoInformalPorcentaje: '44.8%',
      desempleoLargaDuracionPorcentaje: '9.2%',
      hacinamientoPorcentaje: '6.8%',
      inasistenciaEscolarPorcentaje: '1.8%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Alta - Disputa y hegemonía de las tres grandes bandas de Bello (Pachelly, El Mesa, Niquía Camacol)',
      estructurasCombosPresentes: 'El Mesa, Pachelly, Niquía Camacol (cobros y regulación del comercio formal)',
      modalidadesPrincipales: 'Extorsión de alta escala a locales comerciales del parque, transporte intermunicipal y constructoras',
      indiceExtorsionEstimada: 'Presión extorsiva sistemática sobre el comercio céntrico',
      controlTerritorialRegulacion: 'Repartición pactada de rentas del centro y regulación no oficial de vendedores informales',
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
          votosTotales: 28400,
          distribucionPartidos: [{ partido: 'Centro Democrático', votos: 6200, porcentaje: '21.8%' }, { partido: 'Partido Liberal', votos: 5400, porcentaje: '19.0%' }, { partido: 'Partido Conservador', votos: 4100, porcentaje: '14.4%' }],
          distribucionCandidatos: [{ candidato: 'Mosquera Gómez Carlos Augusto', partido: 'Liberal', votos: 2529, esElecto: true }]
        },
        asamblea: { votosTotales: 26900, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 6100, porcentaje: '22.7%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: {
          votosTotales: 31200,
          distribucionCandidatos: [{ candidato: 'Lorena González Ospina', partido: 'Bello Nos Une', votos: 15200, porcentaje: '48.7%', esElecto: true }]
        }
      }
    }
  },
  {
    id: 'bel-c5',
    numero: 5,
    nombre: 'La Cumbre',
    poblacionEstimada: '44.000 habs',
    barriosPrincipales: ['La Cumbre', 'Altavista', 'El Carmelo', 'Hato Viejo'],
    demografia: {
      distribucionSexo: { hombres: '48.1%', mujeres: '51.9%' },
      distribucionGruposEtarios: { rango0_14: '20.4%', rango15_29: '26.8%', rango30_59: '38.8%', rango60_mas: '14.0%' },
      areasMaximaConcentracion: 'La Cumbre parte alta y El Carmelo',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '28.4%', estrato2: '62.1%', estrato3: '9.5%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.3 SMMLV',
      distribucionNivelEducativo: { primaria: '27.4%', secundariaMedia: '53.8%', tecnicoTecnologico: '13.2%', universitarioPosgrado: '5.6%' },
      gradoFormalidadVivienda: { formal: '68.4%', informal: '31.6%' },
      distribucionActividadPrincipal: 'Comercio barrial (36%), Construcción (30%), Confección (20%), Servicios (14%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '51.4%', subsidiado: '46.1%', noAsegurado: '2.5%' },
      gradoCoberturaServicios: { acueducto: '97.4%', alcantarillado: '94.1%', energiaElectrica: '99.4%', gasNatural: '89.6%', internetBandaAncha: '62.8%' },
      analfabetismoPorcentaje: '2.8%',
      empleoInformalPorcentaje: '59.2%',
      desempleoLargaDuracionPorcentaje: '12.8%',
      hacinamientoPorcentaje: '12.6%',
      inasistenciaEscolarPorcentaje: '3.2%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Alta - Zona de operación histórica de Pachelly y El Mesa',
      estructurasCombosPresentes: 'Combos de La Cumbre / Pachelly',
      modalidadesPrincipales: 'Cobro de vacunas a transporte y comercio, microtráfico',
      indiceExtorsionEstimada: 'Presión alta en transporte alimentador',
      controlTerritorialRegulacion: 'Control de pasos de trocha y vigilancia',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: { votosTotales: 13800, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 2900, porcentaje: '21.0%' }, { partido: 'Partido Liberal', votos: 2500, porcentaje: '18.1%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }] },
        asamblea: { votosTotales: 13100, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 2800, porcentaje: '21.4%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: { votosTotales: 15400, distribucionCandidatos: [{ candidato: 'Lorena González Ospina', partido: 'Bello Nos Une', votos: 7100, porcentaje: '46.1%', esElecto: true }] }
      }
    }
  },
  {
    id: 'bel-c6',
    numero: 6,
    nombre: 'Bellavista',
    poblacionEstimada: '49.000 habs',
    barriosPrincipales: ['Bellavista', 'Pachelly', 'San Martín', 'Villa Linda', 'Playa Rica'],
    demografia: {
      distribucionSexo: { hombres: '48.8%', mujeres: '51.2%' },
      distribucionGruposEtarios: { rango0_14: '22.1%', rango15_29: '27.8%', rango30_59: '37.9%', rango60_mas: '12.2%' },
      areasMaximaConcentracion: 'Pachelly, San Martín y Bellavista central',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '48.2%', estrato2: '49.1%', estrato3: '2.7%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.18 SMMLV',
      distribucionNivelEducativo: { primaria: '30.1%', secundariaMedia: '54.2%', tecnicoTecnologico: '11.9%', universitarioPosgrado: '3.8%' },
      gradoFormalidadVivienda: { formal: '59.1%', informal: '40.9%' },
      distribucionActividadPrincipal: 'Comercio informal (38%), Construcción y manufactura (32%), Transporte (18%), Servicios (12%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '44.8%', subsidiado: '52.4%', noAsegurado: '2.8%' },
      gradoCoberturaServicios: { acueducto: '96.9%', alcantarillado: '93.2%', energiaElectrica: '99.3%', gasNatural: '87.4%', internetBandaAncha: '56.8%' },
      analfabetismoPorcentaje: '3.2%',
      empleoInformalPorcentaje: '62.4%',
      desempleoLargaDuracionPorcentaje: '13.8%',
      hacinamientoPorcentaje: '14.8%',
      inasistenciaEscolarPorcentaje: '3.7%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Muy Alta - Cuna y bastión militar del grupo criminal Pachelly',
      estructurasCombosPresentes: 'ODIN Pachelly (base de mando), combos de San Martín y Villa Linda',
      modalidadesPrincipales: 'Control criminal hegemónico, extorsión a todo el aparato económico barrial, cobro de loteo clandestino',
      indiceExtorsionEstimada: 'Tasa extorsiva estimada >85% en establecimientos y servicios',
      controlTerritorialRegulacion: 'Gobernanza criminal exhaustiva: resolución de pleitos de linderos, vigilancia armada, control de venta de alimentos básicos',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: { votosTotales: 14900, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 3100, porcentaje: '20.8%' }, { partido: 'Partido Liberal', votos: 2700, porcentaje: '18.1%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }] },
        asamblea: { votosTotales: 14200, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 3000, porcentaje: '21.1%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: { votosTotales: 16800, distribucionCandidatos: [{ candidato: 'Lorena González Ospina', partido: 'Bello Nos Une', votos: 7900, porcentaje: '47.0%', esElecto: true }] }
      }
    }
  },
  {
    id: 'bel-c7',
    numero: 7,
    nombre: 'Altos de Niquía',
    poblacionEstimada: '51.000 habs',
    barriosPrincipales: ['Altos de Niquía', 'Niquía Camacol', 'Quitasol', 'El Mirador'],
    demografia: {
      distribucionSexo: { hombres: '48.4%', mujeres: '51.6%' },
      distribucionGruposEtarios: { rango0_14: '21.4%', rango15_29: '27.2%', rango30_59: '38.6%', rango60_mas: '12.8%' },
      areasMaximaConcentracion: 'Niquía Camacol y Altos de Niquía',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '38.4%', estrato2: '58.6%', estrato3: '3.0%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.25 SMMLV',
      distribucionNivelEducativo: { primaria: '28.4%', secundariaMedia: '54.1%', tecnicoTecnologico: '12.8%', universitarioPosgrado: '4.7%' },
      gradoFormalidadVivienda: { formal: '64.2%', informal: '35.8%' },
      distribucionActividadPrincipal: 'Comercio barrial (35%), Mano de obra industrial (30%), Transporte (20%), Construcción (15%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '48.9%', subsidiado: '48.5%', noAsegurado: '2.6%' },
      gradoCoberturaServicios: { acueducto: '97.2%', alcantarillado: '94.0%', energiaElectrica: '99.4%', gasNatural: '88.8%', internetBandaAncha: '59.4%' },
      analfabetismoPorcentaje: '2.9%',
      empleoInformalPorcentaje: '60.1%',
      desempleoLargaDuracionPorcentaje: '13.2%',
      hacinamientoPorcentaje: '13.4%',
      inasistenciaEscolarPorcentaje: '3.4%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Muy Alta - Base de operaciones de la banda Niquía Camacol / Los Chatas',
      estructurasCombosPresentes: 'Niquía Camacol, combos de Quitasol',
      modalidadesPrincipales: 'Extorsión generalizada, control del agua y pipetas de gas en zonas altas, microtráfico',
      indiceExtorsionEstimada: 'Presión extorsiva constante sobre transporte y pequeños comercios',
      controlTerritorialRegulacion: 'Cobro de peaje informal y vigilancia comunitaria coactiva',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: { votosTotales: 15800, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 3300, porcentaje: '20.9%' }, { partido: 'Partido Liberal', votos: 2900, porcentaje: '18.4%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }] },
        asamblea: { votosTotales: 15100, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 3200, porcentaje: '21.2%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: { votosTotales: 17600, distribucionCandidatos: [{ candidato: 'Lorena González Ospina', partido: 'Bello Nos Une', votos: 8200, porcentaje: '46.6%', esElecto: true }] }
      }
    }
  },
  {
    id: 'bel-c8',
    numero: 8,
    nombre: 'Niquía',
    poblacionEstimada: '65.000 habs',
    barriosPrincipales: ['Niquía Tradicional', 'Terranova', 'Ciudad Niquía', 'Puerta del Norte (CC)'],
    demografia: {
      distribucionSexo: { hombres: '46.8%', mujeres: '53.2%' },
      distribucionGruposEtarios: { rango0_14: '17.2%', rango15_29: '24.8%', rango30_59: '41.2%', rango60_mas: '16.8%' },
      areasMaximaConcentracion: 'Sector Estación Niquía Metro, CC Puerta del Norte y Terranova',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '0.0%', estrato2: '18.5%', estrato3: '74.2%', estrato4: '7.3%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 2.3 SMMLV (Epicentro comercial y de transporte intermodal)',
      distribucionNivelEducativo: { primaria: '15.4%', secundariaMedia: '47.8%', tecnicoTecnologico: '20.1%', universitarioPosgrado: '16.7%' },
      gradoFormalidadVivienda: { formal: '94.6%', informal: '5.4%' },
      distribucionActividadPrincipal: 'Comercio moderno y centros comerciales (44%), Servicios profesionales y financieros (28%), Transporte y logística (28%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '79.2%', subsidiado: '18.9%', noAsegurado: '1.9%' },
      gradoCoberturaServicios: { acueducto: '99.5%', alcantarillado: '98.8%', energiaElectrica: '99.9%', gasNatural: '97.4%', internetBandaAncha: '86.5%' },
      analfabetismoPorcentaje: '1.1%',
      empleoInformalPorcentaje: '40.2%',
      desempleoLargaDuracionPorcentaje: '8.4%',
      hacinamientoPorcentaje: '5.8%',
      inasistenciaEscolarPorcentaje: '1.5%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media-Baja en grandes complejos comerciales, Media en barrios tradicionales',
      estructurasCombosPresentes: 'Presencia encubierta de redes de Los Chatas / El Mesa',
      modalidadesPrincipales: 'Hurto a personas en el nodo de transferencia Metro / Terminal Norte, fleteo',
      indiceExtorsionEstimada: 'Cobro a transportadores informales y comerciantes callejeros',
      controlTerritorialRegulacion: 'Control de taxis no reglamentados y acarreos',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: { votosTotales: 27100, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 6500, porcentaje: '24.0%' }, { partido: 'Partido Liberal', votos: 4900, porcentaje: '18.1%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }] },
        asamblea: { votosTotales: 25800, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 6400, porcentaje: '24.8%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: { votosTotales: 29800, distribucionCandidatos: [{ candidato: 'Lorena González Ospina', partido: 'Bello Nos Une', votos: 14100, porcentaje: '47.3%', esElecto: true }] }
      }
    }
  },
  {
    id: 'bel-c9',
    numero: 9,
    nombre: 'Guasimalito / Navarra',
    poblacionEstimada: '28.000 habs',
    barriosPrincipales: ['Guasimalito', 'Navarra', 'El Trapiche', 'La Selva'],
    demografia: {
      distribucionSexo: { hombres: '47.9%', mujeres: '52.1%' },
      distribucionGruposEtarios: { rango0_14: '18.5%', rango15_29: '25.6%', rango30_59: '40.1%', rango60_mas: '15.8%' },
      areasMaximaConcentracion: 'Navarra y Guasimalito',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '6.2%', estrato2: '44.8%', estrato3: '47.2%', estrato4: '1.8%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.7 SMMLV',
      distribucionNivelEducativo: { primaria: '21.2%', secundariaMedia: '52.1%', tecnicoTecnologico: '16.4%', universitarioPosgrado: '10.3%' },
      gradoFormalidadVivienda: { formal: '86.4%', informal: '13.6%' },
      distribucionActividadPrincipal: 'Servicios industriales y manufactura (36%), Comercio (32%), Construcción (18%), Logística (14%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '66.8%', subsidiado: '31.1%', noAsegurado: '2.1%' },
      gradoCoberturaServicios: { acueducto: '98.6%', alcantarillado: '96.5%', energiaElectrica: '99.8%', gasNatural: '94.2%', internetBandaAncha: '75.1%' },
      analfabetismoPorcentaje: '1.9%',
      empleoInformalPorcentaje: '50.4%',
      desempleoLargaDuracionPorcentaje: '10.1%',
      hacinamientoPorcentaje: '8.4%',
      inasistenciaEscolarPorcentaje: '2.2%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media - Área de expansión con presencia de combos de El Trapiche',
      estructurasCombosPresentes: 'Combos de El Trapiche / El Mesa',
      modalidadesPrincipales: 'Cobro extorsivo a bodegas e industrias de la zona norte',
      indiceExtorsionEstimada: 'Presión moderada en sector bodegas',
      controlTerritorialRegulacion: 'Vigilancia en límites rurales',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: { votosTotales: 9800, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 2200, porcentaje: '22.4%' }, { partido: 'Partido Liberal', votos: 1800, porcentaje: '18.4%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }] },
        asamblea: { votosTotales: 9300, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 2100, porcentaje: '22.6%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: { votosTotales: 10900, distribucionCandidatos: [{ candidato: 'Lorena González Ospina', partido: 'Bello Nos Une', votos: 5200, porcentaje: '47.7%', esElecto: true }] }
      }
    }
  },
  {
    id: 'bel-c10',
    numero: 10,
    nombre: 'Fontidueño',
    poblacionEstimada: '31.000 habs',
    barriosPrincipales: ['Fontidueño', 'La Mina', 'Alcalá', 'La Selva'],
    demografia: {
      distribucionSexo: { hombres: '48.2%', mujeres: '51.8%' },
      distribucionGruposEtarios: { rango0_14: '20.1%', rango15_29: '26.4%', rango30_59: '39.2%', rango60_mas: '14.3%' },
      areasMaximaConcentracion: 'Fontidueño central y La Mina',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '22.4%', estrato2: '64.8%', estrato3: '12.8%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.35 SMMLV',
      distribucionNivelEducativo: { primaria: '26.1%', secundariaMedia: '54.5%', tecnicoTecnologico: '13.9%', universitarioPosgrado: '5.5%' },
      gradoFormalidadVivienda: { formal: '72.4%', informal: '27.6%' },
      distribucionActividadPrincipal: 'Comercio barrial (34%), Operarios y confección (32%), Transporte (18%), Construcción (16%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '53.4%', subsidiado: '44.1%', noAsegurado: '2.5%' },
      gradoCoberturaServicios: { acueducto: '97.8%', alcantarillado: '94.8%', energiaElectrica: '99.5%', gasNatural: '91.2%', internetBandaAncha: '64.8%' },
      analfabetismoPorcentaje: '2.6%',
      empleoInformalPorcentaje: '58.4%',
      desempleoLargaDuracionPorcentaje: '12.2%',
      hacinamientoPorcentaje: '11.9%',
      inasistenciaEscolarPorcentaje: '3.1%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media-Alta - Influencia de combos de El Mesa y Fontidueño',
      estructurasCombosPresentes: 'Combos de Fontidueño articulados a El Mesa',
      modalidadesPrincipales: 'Cobro de vigilancia no formal y microtráfico',
      indiceExtorsionEstimada: 'Presencia constante en tiendas de barrio',
      controlTerritorialRegulacion: 'Control de ingreso nocturno a sectores de ladera',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: { votosTotales: 10400, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 2300, porcentaje: '22.1%' }, { partido: 'Partido Liberal', votos: 1900, porcentaje: '18.3%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }] },
        asamblea: { votosTotales: 9900, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 2200, porcentaje: '22.2%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: { votosTotales: 11800, distribucionCandidatos: [{ candidato: 'Lorena González Ospina', partido: 'Bello Nos Une', votos: 5600, porcentaje: '47.5%', esElecto: true }] }
      }
    }
  },
  {
    id: 'bel-c11',
    numero: 11,
    nombre: 'Zamora',
    poblacionEstimada: '41.000 habs',
    barriosPrincipales: ['Zamora', 'Santa Rita', 'Acevedo (Sector Norte)', 'Tricentenario Norte'],
    demografia: {
      distribucionSexo: { hombres: '48.1%', mujeres: '51.9%' },
      distribucionGruposEtarios: { rango0_14: '21.0%', rango15_29: '26.8%', rango30_59: '38.9%', rango60_mas: '13.3%' },
      areasMaximaConcentracion: 'Zamora sobre la Autopista Medellín-Bogotá y Santa Rita',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '32.1%', estrato2: '59.4%', estrato3: '8.5%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.28 SMMLV (Corredor de salida a Bogotá y bodegas)',
      distribucionNivelEducativo: { primaria: '28.2%', secundariaMedia: '53.6%', tecnicoTecnologico: '13.1%', universitarioPosgrado: '5.1%' },
      gradoFormalidadVivienda: { formal: '66.8%', informal: '33.2%' },
      distribucionActividadPrincipal: 'Logística y talleres de tractocamiones (38%), Comercio barrial (30%), Mano de obra manufacturera (20%), Construcción (12%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '49.8%', subsidiado: '47.6%', noAsegurado: '2.6%' },
      gradoCoberturaServicios: { acueducto: '97.2%', alcantarillado: '94.2%', energiaElectrica: '99.4%', gasNatural: '89.8%', internetBandaAncha: '61.4%' },
      analfabetismoPorcentaje: '2.9%',
      empleoInformalPorcentaje: '59.8%',
      desempleoLargaDuracionPorcentaje: '13.0%',
      hacinamientoPorcentaje: '13.2%',
      inasistenciaEscolarPorcentaje: '3.4%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Alta - Corredor estratégico de Los Triana y El Mesa hacia la autopista',
      estructurasCombosPresentes: 'Los Triana (predominio histórico en Zamora), combos de Santa Rita',
      modalidadesPrincipales: 'Cobro extorsivo a camiones de carga y empresas logísticas, microtráfico',
      indiceExtorsionEstimada: 'Presión alta a bodegas y parqueaderos de carga pesada',
      controlTerritorialRegulacion: 'Control de cruces peatonales y seguridad no estatal sobre la autopista',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: { votosTotales: 13200, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 2800, porcentaje: '21.2%' }, { partido: 'Partido Liberal', votos: 2400, porcentaje: '18.2%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }] },
        asamblea: { votosTotales: 12600, distribucionPartidos: [{ partido: 'Centro Democrático', votos: 2700, porcentaje: '21.4%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: { votosTotales: 14800, distribucionCandidatos: [{ candidato: 'Lorena González Ospina', partido: 'Bello Nos Une', votos: 6900, porcentaje: '46.6%', esElecto: true }] }
      }
    }
  }
];

export const BELLO_ANALYST: MunicipalityAnalystItem = {
  id: 'bello',
  name: 'Bello',
  subregion: 'Valle de Aburrá (Norte)',
  badgeColor: 'blue',
  poblacionEstimada: 560000,
  censoElectoral: officialCensusOr('Bello', 350000),
  tieneComunas: true,
  cantidadComunas: 11,
  detalleComunasOBarrios: '1. París, 2. La Madera, 3. Santa Ana, 4. Suárez, 5. La Cumbre, 6. Bellavista, 7. Altos de Niquía, 8. Niquía, 9. Guasimalito / Navarra, 10. Fontidueño, 11. Zamora.',
  comunas: BELLO_COMUNAS,
  panelGeneral: {
    censoPoblacional: {
      poblacionTotal: '560.000 habitantes (DANE)',
      censoElectoral: `${formatCensus(officialCensusOr('Bello', 350000))} ciudadanos habilitados (${CENSUS_SOURCE_LABEL})`,
      distribucionSexo: { hombres: '47.8%', mujeres: '52.2%' },
      distribucionEdades: { rango0_14: '19.8%', rango15_29: '26.2%', rango30_59: '39.4%', rango60_mas: '14.6%' },
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      actividadesEconomicasPrincipales: 'Comercio y grandes superficies comerciales (36%), Industria textil, confección y manufactura (28%), Servicios y logística de transporte (22%), Construcción (14%)',
      desempleo: '10.2%',
      distribucionIngresos: 'Estratos 1 y 2: 68.4% | Estrato 3: 28.5% | Estrato 4: 3.1%',
      fuenteNota: SOURCE_WEB,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: {
          votosTotales: 174580,
          distribucionPartidos: [
            { partido: 'Partido Centro Democrático', votos: 28410, porcentaje: '16.27%', curules: 4 },
            { partido: 'Partido Liberal Colombiano', votos: 16489, porcentaje: '9.44%', curules: 3 },
            { partido: 'Partido Conservador Colombiano', votos: 15920, porcentaje: '9.12%', curules: 2 },
            { partido: 'Partido Alianza Verde', votos: 14210, porcentaje: '8.14%', curules: 2 },
            { partido: 'Partido ASI', votos: 12840, porcentaje: '7.35%', curules: 2 }
          ],
          distribucionCandidatos: [
            { candidato: 'Mosquera Gómez Carlos Augusto', partido: 'Liberal', votos: 2529, esElecto: true },
            { candidato: 'Giraldo Jaramillo Giovanni', partido: 'Liberal', votos: 1922, esElecto: true },
            { candidato: 'Hernández Giraldo Luis Carlos', partido: 'Liberal', votos: 1899, esElecto: true }
          ]
        },
        asamblea: {
          votosTotales: 162100,
          distribucionPartidos: [{ partido: 'Centro Democrático', votos: 34200, porcentaje: '21.1%' }, { partido: 'Partido Liberal', votos: 26100, porcentaje: '16.1%' }, { partido: 'Partido Creemos', votos: 22400, porcentaje: '13.8%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        alcaldia: {
          votosTotales: 187420,
          distribucionCandidatos: [
            { candidato: 'Lorena González Ospina', partido: 'Bello Nos Une', votos: 86450, porcentaje: '46.13%', esElecto: true },
            { candidato: 'Hugo Díaz', partido: 'Coalición Bello Libre', votos: 48920, porcentaje: '26.10%' },
            { candidato: 'Votos en Blanco', partido: 'Voto en Blanco', votos: 18940, porcentaje: '10.11%' }
          ]
        }
      }
    }
  }
};

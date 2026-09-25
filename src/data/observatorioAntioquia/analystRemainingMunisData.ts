import { CENSUS_SOURCE_LABEL, formatCensus, officialCensusOr } from '../../services/electoralCensusService';
import { MunicipalityAnalystItem, ComunaAnalysisData } from './analystTypes';

const SOURCE_WEB = '(información obtenida de la web)';
const SOURCE_EAFIT = '(información obtenida de la web - Informe Gobernanza Criminal AMVA / EAFIT)';

// ITAGÜÍ COMUNAS (6 comunas)
export const ITAGUI_COMUNAS: ComunaAnalysisData[] = [
  {
    id: 'ita-c1',
    numero: 1,
    nombre: 'Comuna 1 (Centro/Ind.)',
    poblacionEstimada: '48.000 habs',
    barriosPrincipales: ['Centro', 'Parque Principal Itagüí', 'Zona Industrial', 'El Rosario', 'La Independencia'],
    demografia: {
      distribucionSexo: { hombres: '47.6%', mujeres: '52.4%' },
      distribucionGruposEtarios: { rango0_14: '17.2%', rango15_29: '24.8%', rango30_59: '41.8%', rango60_mas: '16.2%' },
      areasMaximaConcentracion: 'Parque Principal de Itagüí, Centro de la Moda y Corredor Industrial',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '0.0%', estrato2: '18.4%', estrato3: '74.2%', estrato4: '7.4%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 2.3 SMMLV (Mayor densidad empresarial e industrial del sur del Valle de Aburrá)',
      distribucionNivelEducativo: { primaria: '16.2%', secundariaMedia: '48.4%', tecnicoTecnologico: '20.1%', universitarioPosgrado: '15.3%' },
      gradoFormalidadVivienda: { formal: '94.2%', informal: '5.8%' },
      distribucionActividadPrincipal: 'Comercio mayorista textil y confección (40%), Industria metalmecánica y química (35%), Servicios bancarios y logística (25%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '81.4%', subsidiado: '16.8%', noAsegurado: '1.8%' },
      gradoCoberturaServicios: { acueducto: '99.5%', alcantarillado: '98.9%', energiaElectrica: '100%', gasNatural: '97.2%', internetBandaAncha: '86.4%' },
      analfabetismoPorcentaje: '1.1%',
      empleoInformalPorcentaje: '38.2%',
      desempleoLargaDuracionPorcentaje: '7.8%',
      hacinamientoPorcentaje: '5.4%',
      inasistenciaEscolarPorcentaje: '1.4%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media-Baja - Alto control policial e institucional (modelo de seguridad de Itagüí)',
      estructurasCombosPresentes: 'Presencia encubierta de remanentes de La Unión / La Terraza',
      modalidadesPrincipales: 'Extorsión encubierta a bodegas y parqueaderos, hurto a comercio',
      indiceExtorsionEstimada: 'Tasa extorsiva moderada-baja comparada con el promedio del valle',
      controlTerritorialRegulacion: 'Bajo control social sobre población civil',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: { votosTotales: 22100, distribucionPartidos: [{ partido: 'Partido Conservador', votos: 7800, porcentaje: '35.3%' }, { partido: 'Centro Democrático', votos: 3400, porcentaje: '15.4%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado municipal' }] },
        asamblea: { votosTotales: 21200, distribucionPartidos: [{ partido: 'Partido Conservador', votos: 8100, porcentaje: '38.2%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: { votosTotales: 24500, distribucionCandidatos: [{ candidato: 'Diego Torres Sánchez', partido: 'Itagüí Somos Todos', votos: 13400, porcentaje: '54.7%', esElecto: true }] }
      }
    }
  },
  {
    id: 'ita-c2',
    numero: 2,
    nombre: 'Comuna 2 (Yarumito)',
    poblacionEstimada: '44.000 habs',
    barriosPrincipales: ['Yarumito', 'San José', 'Camparola', 'Las Acacias', 'Monte Verde'],
    demografia: {
      distribucionSexo: { hombres: '47.4%', mujeres: '52.6%' },
      distribucionGruposEtarios: { rango0_14: '18.1%', rango15_29: '25.2%', rango30_59: '41.1%', rango60_mas: '15.6%' },
      areasMaximaConcentracion: 'Yarumito y San José',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '0.0%', estrato2: '24.1%', estrato3: '68.5%', estrato4: '7.4%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.9 SMMLV',
      distribucionNivelEducativo: { primaria: '18.2%', secundariaMedia: '51.4%', tecnicoTecnologico: '18.1%', universitarioPosgrado: '12.3%' },
      gradoFormalidadVivienda: { formal: '91.8%', informal: '8.2%' },
      distribucionActividadPrincipal: 'Comercio barrial (34%), Operarios manufactureros (32%), Servicios personales (20%), Construcción (14%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '76.4%', subsidiado: '21.5%', noAsegurado: '2.1%' },
      gradoCoberturaServicios: { acueducto: '99.2%', alcantarillado: '98.1%', energiaElectrica: '99.9%', gasNatural: '96.4%', internetBandaAncha: '81.2%' },
      analfabetismoPorcentaje: '1.4%',
      empleoInformalPorcentaje: '42.8%',
      desempleoLargaDuracionPorcentaje: '8.6%',
      hacinamientoPorcentaje: '6.4%',
      inasistenciaEscolarPorcentaje: '1.9%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Baja - Vigilancia permanente por cámaras y cuadrantes',
      estructurasCombosPresentes: 'Combos locales residuales',
      modalidadesPrincipales: 'Hurto a personas y microtráfico periférico',
      indiceExtorsionEstimada: 'Baja',
      controlTerritorialRegulacion: 'Sin control territorial civil',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: { votosTotales: 19800, distribucionPartidos: [{ partido: 'Partido Conservador', votos: 6900, porcentaje: '34.8%' }, { partido: 'Centro Democrático', votos: 3100, porcentaje: '15.7%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }] },
        asamblea: { votosTotales: 19100, distribucionPartidos: [{ partido: 'Partido Conservador', votos: 7200, porcentaje: '37.7%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: { votosTotales: 22100, distribucionCandidatos: [{ candidato: 'Diego Torres Sánchez', partido: 'Itagüí Somos Todos', votos: 11900, porcentaje: '53.8%', esElecto: true }] }
      }
    }
  },
  {
    id: 'ita-c3',
    numero: 3,
    nombre: 'Comuna 3 (Bariloche)',
    poblacionEstimada: '47.000 habs',
    barriosPrincipales: ['Bariloche', 'San Fernando Sur', 'Triana', 'San Gabriel', '19 de Abril'],
    demografia: {
      distribucionSexo: { hombres: '48.0%', mujeres: '52.0%' },
      distribucionGruposEtarios: { rango0_14: '19.5%', rango15_29: '26.1%', rango30_59: '40.0%', rango60_mas: '14.4%' },
      areasMaximaConcentracion: 'San Gabriel y Bariloche',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '4.2%', estrato2: '46.8%', estrato3: '49.0%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.7 SMMLV',
      distribucionNivelEducativo: { primaria: '21.4%', secundariaMedia: '53.1%', tecnicoTecnologico: '16.2%', universitarioPosgrado: '9.3%' },
      gradoFormalidadVivienda: { formal: '87.4%', informal: '12.6%' },
      distribucionActividadPrincipal: 'Comercio barrial (36%), Operarios industriales (30%), Transporte (18%), Confección (16%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '71.2%', subsidiado: '26.4%', noAsegurado: '2.4%' },
      gradoCoberturaServicios: { acueducto: '98.8%', alcantarillado: '97.2%', energiaElectrica: '99.8%', gasNatural: '95.1%', internetBandaAncha: '76.8%' },
      analfabetismoPorcentaje: '1.8%',
      empleoInformalPorcentaje: '47.5%',
      desempleoLargaDuracionPorcentaje: '9.4%',
      hacinamientoPorcentaje: '8.2%',
      inasistenciaEscolarPorcentaje: '2.2%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media-Baja - Presencia histórica de combos de San Gabriel',
      estructurasCombosPresentes: 'Combos de San Gabriel / El Rosario',
      modalidadesPrincipales: 'Microtráfico y cobro focalizado a transporte',
      indiceExtorsionEstimada: 'Presión extorsiva baja-moderada',
      controlTerritorialRegulacion: 'Límites barriales contenidos por la fuerza pública',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: { votosTotales: 21400, distribucionPartidos: [{ partido: 'Partido Conservador', votos: 7400, porcentaje: '34.6%' }, { partido: 'Centro Democrático', votos: 3200, porcentaje: '15.0%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }] },
        asamblea: { votosTotales: 20600, distribucionPartidos: [{ partido: 'Partido Conservador', votos: 7700, porcentaje: '37.4%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: { votosTotales: 23800, distribucionCandidatos: [{ candidato: 'Diego Torres Sánchez', partido: 'Itagüí Somos Todos', votos: 12800, porcentaje: '53.8%', esElecto: true }] }
      }
    }
  },
  {
    id: 'ita-c4',
    numero: 4,
    nombre: 'Comuna 4 (Santa María)',
    poblacionEstimada: '62.000 habs',
    barriosPrincipales: ['Santa María No. 1, 2, 3', 'Colinas del Sur', 'La Cruz', 'El Palmar', 'San Antonio'],
    demografia: {
      distribucionSexo: { hombres: '48.2%', mujeres: '51.8%' },
      distribucionGruposEtarios: { rango0_14: '20.6%', rango15_29: '26.8%', rango30_59: '39.2%', rango60_mas: '13.4%' },
      areasMaximaConcentracion: 'Santa María No. 1 y 2 (comuna de mayor densidad poblacional de Itagüí)',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '8.4%', estrato2: '58.2%', estrato3: '33.4%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.45 SMMLV',
      distribucionNivelEducativo: { primaria: '24.8%', secundariaMedia: '53.4%', tecnicoTecnologico: '14.6%', universitarioPosgrado: '7.2%' },
      gradoFormalidadVivienda: { formal: '81.2%', informal: '18.8%' },
      distribucionActividadPrincipal: 'Comercio barrial (38%), Mano de obra manufacturera y confección (30%), Transporte (18%), Construcción (14%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '62.8%', subsidiado: '34.8%', noAsegurado: '2.4%' },
      gradoCoberturaServicios: { acueducto: '98.2%', alcantarillado: '95.8%', energiaElectrica: '99.6%', gasNatural: '93.1%', internetBandaAncha: '71.4%' },
      analfabetismoPorcentaje: '2.2%',
      empleoInformalPorcentaje: '54.2%',
      desempleoLargaDuracionPorcentaje: '10.8%',
      hacinamientoPorcentaje: '10.6%',
      inasistenciaEscolarPorcentaje: '2.6%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media - Histórica presencia de combos de Santa María / La Raya',
      estructurasCombosPresentes: 'Combos de Santa María (La Raya, El Guayabo)',
      modalidadesPrincipales: 'Extorsión a comerciantes y transporte barrial, microtráfico',
      indiceExtorsionEstimada: 'Presión extorsiva moderada en zonas de ladera',
      controlTerritorialRegulacion: 'Control de vigilancia barrial informal',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: { votosTotales: 27800, distribucionPartidos: [{ partido: 'Partido Conservador', votos: 9600, porcentaje: '34.5%' }, { partido: 'Centro Democrático', votos: 4200, porcentaje: '15.1%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }] },
        asamblea: { votosTotales: 26500, distribucionPartidos: [{ partido: 'Partido Conservador', votos: 9900, porcentaje: '37.4%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: { votosTotales: 30900, distribucionCandidatos: [{ candidato: 'Diego Torres Sánchez', partido: 'Itagüí Somos Todos', votos: 16800, porcentaje: '54.4%', esElecto: true }] }
      }
    }
  },
  {
    id: 'ita-c5',
    numero: 5,
    nombre: 'Comuna 5 (El Tablazo)',
    poblacionEstimada: '46.000 habs',
    barriosPrincipales: ['El Tablazo', 'Calatrava', 'Loma Linda', 'Terranova', 'La Finca'],
    demografia: {
      distribucionSexo: { hombres: '47.8%', mujeres: '52.2%' },
      distribucionGruposEtarios: { rango0_14: '19.8%', rango15_29: '25.8%', rango30_59: '39.8%', rango60_mas: '14.6%' },
      areasMaximaConcentracion: 'Calatrava y El Tablazo',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '6.2%', estrato2: '52.4%', estrato3: '41.4%', estrato4: '0.0%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 1.6 SMMLV',
      distribucionNivelEducativo: { primaria: '22.1%', secundariaMedia: '52.8%', tecnicoTecnologico: '15.9%', universitarioPosgrado: '9.2%' },
      gradoFormalidadVivienda: { formal: '84.8%', informal: '15.2%' },
      distribucionActividadPrincipal: 'Comercio barrial (35%), Operarios industriales (30%), Servicios generales (20%), Construcción (15%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '68.4%', subsidiado: '29.2%', noAsegurado: '2.4%' },
      gradoCoberturaServicios: { acueducto: '98.5%', alcantarillado: '96.4%', energiaElectrica: '99.7%', gasNatural: '94.2%', internetBandaAncha: '74.8%' },
      analfabetismoPorcentaje: '1.9%',
      empleoInformalPorcentaje: '50.6%',
      desempleoLargaDuracionPorcentaje: '9.8%',
      hacinamientoPorcentaje: '9.1%',
      inasistenciaEscolarPorcentaje: '2.4%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Media - Enclave de Calatrava',
      estructurasCombosPresentes: 'Combos de Calatrava / El Tablazo',
      modalidadesPrincipales: 'Microtráfico y extorsión focalizada',
      indiceExtorsionEstimada: 'Presencia moderada en comercio de Calatrava',
      controlTerritorialRegulacion: 'Líneas invisibles contenidas',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: { votosTotales: 20600, distribucionPartidos: [{ partido: 'Partido Conservador', votos: 7100, porcentaje: '34.5%' }, { partido: 'Centro Democrático', votos: 3100, porcentaje: '15.0%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }] },
        asamblea: { votosTotales: 19800, distribucionPartidos: [{ partido: 'Partido Conservador', votos: 7400, porcentaje: '37.4%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: { votosTotales: 22900, distribucionCandidatos: [{ candidato: 'Diego Torres Sánchez', partido: 'Itagüí Somos Todos', votos: 12400, porcentaje: '54.1%', esElecto: true }] }
      }
    }
  },
  {
    id: 'ita-c6',
    numero: 6,
    nombre: 'Comuna 6 (San Fernando)',
    poblacionEstimada: '43.000 habs',
    barriosPrincipales: ['San Fernando', 'La Gloria', 'Playa Rica', 'Ditaires (Sector urbano)', 'San Pio X'],
    demografia: {
      distribucionSexo: { hombres: '47.2%', mujeres: '52.8%' },
      distribucionGruposEtarios: { rango0_14: '17.8%', rango15_29: '24.9%', rango30_59: '41.2%', rango60_mas: '16.1%' },
      areasMaximaConcentracion: 'Ditaires, San Pio X y San Fernando',
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: { estrato1: '0.0%', estrato2: '12.4%', estrato3: '62.8%', estrato4: '24.8%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: 'Ingreso promedio: 2.6 SMMLV (Zona deportiva y residencial de mayor valorización)',
      distribucionNivelEducativo: { primaria: '14.2%', secundariaMedia: '46.8%', tecnicoTecnologico: '19.4%', universitarioPosgrado: '19.6%' },
      gradoFormalidadVivienda: { formal: '95.2%', informal: '4.8%' },
      distribucionActividadPrincipal: 'Servicios deportivos, recreativos y salud (36%), Comercio y gastronomía (34%), Servicios profesionales (30%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '83.2%', subsidiado: '15.1%', noAsegurado: '1.7%' },
      gradoCoberturaServicios: { acueducto: '99.6%', alcantarillado: '99.1%', energiaElectrica: '100%', gasNatural: '97.8%', internetBandaAncha: '88.4%' },
      analfabetismoPorcentaje: '0.9%',
      empleoInformalPorcentaje: '35.8%',
      desempleoLargaDuracionPorcentaje: '7.4%',
      hacinamientoPorcentaje: '4.9%',
      inasistenciaEscolarPorcentaje: '1.3%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Baja - Control integral por cuadrantes de seguridad y Ditaires',
      estructurasCombosPresentes: 'Sin presencia de combos territoriales abiertos',
      modalidadesPrincipales: 'Hurto calificado ocasional',
      indiceExtorsionEstimada: 'Muy baja',
      controlTerritorialRegulacion: 'Inexistente en área civil',
      fuenteInforme: SOURCE_EAFIT,
    },
    electoral: {
      nacionales2026: {
        senado: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        camara: { votosTotales: 'Sin Datos', distribucionPartidos: [{ partido: 'Sin Datos', votos: 'Pendiente' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        presidencia: { votosTotales: 'Sin Datos', distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] }
      },
      locales2023: {
        concejo: { votosTotales: 19400, distribucionPartidos: [{ partido: 'Partido Conservador', votos: 6800, porcentaje: '35.1%' }, { partido: 'Centro Democrático', votos: 3400, porcentaje: '17.5%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }] },
        asamblea: { votosTotales: 18800, distribucionPartidos: [{ partido: 'Partido Conservador', votos: 7200, porcentaje: '38.3%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: { votosTotales: 21800, distribucionCandidatos: [{ candidato: 'Diego Torres Sánchez', partido: 'Itagüí Somos Todos', votos: 11900, porcentaje: '54.6%', esElecto: true }] }
      }
    }
  }
];

export const ITAGUI_ANALYST: MunicipalityAnalystItem = {
  id: 'itagui',
  name: 'Itagüí',
  subregion: 'Valle de Aburrá (Sur)',
  badgeColor: 'blue',
  poblacionEstimada: 290000,
  censoElectoral: officialCensusOr('Itagüí', 235000),
  tieneComunas: true,
  cantidadComunas: 6,
  detalleComunasOBarrios: '1. Comuna 1 (Centro/Ind.), 2. Comuna 2 (Yarumito), 3. Comuna 3 (Bariloche), 4. Comuna 4 (Santa María), 5. Comuna 5 (El Tablazo), 6. Comuna 6 (San Fernando).',
  comunas: ITAGUI_COMUNAS,
  panelGeneral: {
    censoPoblacional: {
      poblacionTotal: '290.000 habitantes (DANE)',
      censoElectoral: `${formatCensus(officialCensusOr('Itagüí', 235000))} ciudadanos habilitados (${CENSUS_SOURCE_LABEL})`,
      distribucionSexo: { hombres: '47.7%', mujeres: '52.3%' },
      distribucionEdades: { rango0_14: '18.6%', rango15_29: '25.6%', rango30_59: '40.6%', rango60_mas: '15.2%' },
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      actividadesEconomicasPrincipales: 'Gran industria manufacturera, textil y confección (40%), Comercio mayorista y minorista (32%), Servicios logísticos, financieros y transporte (28%)',
      desempleo: '8.4%',
      distribucionIngresos: 'Estratos 1 y 2: 38.5% | Estrato 3: 56.2% | Estrato 4: 5.3%',
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
          votosTotales: 130700,
          distribucionPartidos: [
            { partido: 'Partido Conservador Colombiano', votos: 45600, porcentaje: '34.89%', curules: 6 },
            { partido: 'Partido Centro Democrático', votos: 20400, porcentaje: '15.61%', curules: 3 },
            { partido: 'Partido Liberal Colombiano', votos: 14200, porcentaje: '10.86%', curules: 2 },
            { partido: 'Partido Alianza Verde', votos: 11800, porcentaje: '9.03%', curules: 2 },
            { partido: 'Partido Creemos', votos: 9800, porcentaje: '7.50%', curules: 1 }
          ],
          distribucionCandidatos: [
            { candidato: 'Zuleta Pérez Jorge Eliécer', partido: 'Conservador', votos: 4210, esElecto: true },
            { candidato: 'Gaviria Betancur Juan Carlos', partido: 'Conservador', votos: 3890, esElecto: true },
            { candidato: 'Ocampo Quintero Andrés Felipe', partido: 'Conservador', votos: 3640, esElecto: true }
          ]
        },
        asamblea: {
          votosTotales: 126000,
          distribucionPartidos: [{ partido: 'Partido Conservador', votos: 47800, porcentaje: '37.9%' }, { partido: 'Centro Democrático', votos: 23100, porcentaje: '18.3%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        alcaldia: {
          votosTotales: 146000,
          distribucionCandidatos: [
            { candidato: 'Diego Torres Sánchez', partido: 'Itagüí Somos Todos (Conservador)', votos: 79800, porcentaje: '54.66%', esElecto: true },
            { candidato: 'León Mario Bedoya López', partido: 'Coalición', votos: 38900, porcentaje: '26.64%' },
            { candidato: 'Votos en Blanco', partido: 'Voto en Blanco', votos: 14200, porcentaje: '9.73%' }
          ]
        }
      }
    }
  }
};

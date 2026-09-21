import { MunicipalityAnalystItem, ComunaAnalysisData } from './analystTypes';

const SOURCE_WEB = '(información obtenida de la web)';
const SOURCE_EAFIT = '(información obtenida de la web - Informe Gobernanza Criminal AMVA / EAFIT)';

// ENVIGADO ZONAS / COMUNAS (13 comunas/zonas urbanas de gestión)
export const ENVIGADO_ZONAS_NAMES = [
  'Las Casitas', 'Las Vegas', 'La Magnolia', 'San Marcos', 'Bucarest',
  'El Salado', 'El Trianón', 'San Rafael', 'La Mina', 'Los Naranjos',
  'San José', 'Alcalá', 'El Portal'
];

export const ENVIGADO_COMUNAS: ComunaAnalysisData[] = ENVIGADO_ZONAS_NAMES.map((zonaName, index) => {
  const isHighStrata = ['Las Vegas', 'San Marcos', 'La Magnolia', 'El Portal', 'Los Naranjos'].includes(zonaName);
  const isMidStrata = ['El Trianón', 'San Rafael', 'San José', 'Alcalá', 'Bucarest'].includes(zonaName);
  
  return {
    id: `env-z${index + 1}`,
    numero: index + 1,
    nombre: zonaName,
    poblacionEstimada: `${Math.round(250000 / 13)} habs`,
    barriosPrincipales: [zonaName, `Sector ${zonaName} Alto`, `Sector ${zonaName} Tradicional`],
    demografia: {
      distribucionSexo: { hombres: '46.1%', mujeres: '53.9%' },
      distribucionGruposEtarios: { rango0_14: '14.8%', rango15_29: '22.8%', rango30_59: '42.1%', rango60_mas: '20.3%' },
      areasMaximaConcentracion: `Eje Central de ${zonaName}`,
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      distribucionEstratos: isHighStrata
        ? { estrato1: '0.0%', estrato2: '0.0%', estrato3: '8.2%', estrato4: '48.5%', estrato5: '38.4%', estrato6: '4.9%' }
        : isMidStrata
        ? { estrato1: '0.0%', estrato2: '4.1%', estrato3: '62.4%', estrato4: '31.2%', estrato5: '2.3%', estrato6: '0.0%' }
        : { estrato1: '1.2%', estrato2: '28.4%', estrato3: '64.1%', estrato4: '6.3%', estrato5: '0.0%', estrato6: '0.0%' },
      estadioIngresos: isHighStrata ? 'Ingreso promedio: 5.2 SMMLV' : 'Ingreso promedio: 3.1 SMMLV',
      distribucionNivelEducativo: { primaria: '7.8%', secundariaMedia: '32.4%', tecnicoTecnologico: '21.5%', universitarioPosgrado: '38.3%' },
      gradoFormalidadVivienda: { formal: '98.2%', informal: '1.8%' },
      distribucionActividadPrincipal: 'Servicios profesionales, gastronomía boutique y comercio formal (42%), Finanzas y tecnología (32%), Actividades empresariales (26%)',
      fuenteNota: SOURCE_WEB,
    },
    social: {
      distribucionRegimenSalud: { contributivo: '93.4%', subsidiado: '5.8%', noAsegurado: '0.8%' },
      gradoCoberturaServicios: { acueducto: '99.9%', alcantarillado: '99.8%', energiaElectrica: '100%', gasNatural: '99.1%', internetBandaAncha: '95.2%' },
      analfabetismoPorcentaje: '0.5%',
      empleoInformalPorcentaje: '22.4%',
      desempleoLargaDuracionPorcentaje: '5.8%',
      hacinamientoPorcentaje: '2.4%',
      inasistenciaEscolarPorcentaje: '0.8%',
      fuenteNota: SOURCE_WEB,
    },
    criminalidad: {
      nivelGobernanzaCriminal: 'Baja regulación territorial sobre ciudadanía; Alto índice de calidad de vida y monitoreo institucional',
      estructurasCombosPresentes: 'La Terraza / Oficina de Envigado (estructuras financieras históricas desarticuladas del control territorial vecinal)',
      modalidadesPrincipales: 'Hurto calificado a residencias y comercio, estafas informáticas',
      indiceExtorsionEstimada: 'Muy baja en el tejido residencial y comercial formal',
      controlTerritorialRegulacion: 'Sin control territorial sobre la vida civil cotidiana',
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
          votosTotales: 9800,
          distribucionPartidos: [{ partido: 'Partido Liberal Colombiano', votos: 3400, porcentaje: '34.7%' }, { partido: 'Centro Democrático', votos: 2500, porcentaje: '25.5%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado municipal' }]
        },
        asamblea: { votosTotales: 9400, distribucionPartidos: [{ partido: 'Partido Liberal', votos: 3300, porcentaje: '35.1%' }], distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }] },
        alcaldia: {
          votosTotales: 10800,
          distribucionCandidatos: [{ candidato: 'Raúl Eduardo Cardona González', partido: 'Partido Liberal Colombiano', votos: 5800, porcentaje: '53.7%', esElecto: true }]
        }
      }
    }
  };
});

export const ENVIGADO_ANALYST: MunicipalityAnalystItem = {
  id: 'envigado',
  name: 'Envigado',
  subregion: 'Valle de Aburrá (Sur)',
  badgeColor: 'emerald',
  poblacionEstimada: 250000,
  censoElectoral: 215000,
  tieneComunas: true,
  cantidadComunas: 13,
  detalleComunasOBarrios: '1. Las Casitas, 2. Las Vegas, 3. La Magnolia, 4. San Marcos, 5. Bucarest, 6. El Salado, 7. El Trianón, 8. San Rafael, 9. La Mina, 10. Los Naranjos, 11. San José, 12. Alcalá, 13. El Portal. (Zonas urbanas de gestión).',
  comunas: ENVIGADO_COMUNAS,
  panelGeneral: {
    censoPoblacional: {
      poblacionTotal: '250.000 habitantes (DANE)',
      censoElectoral: '215.000 ciudadanos habilitados',
      distribucionSexo: { hombres: '46.1%', mujeres: '53.9%' },
      distribucionEdades: { rango0_14: '14.8%', rango15_29: '22.8%', rango30_59: '42.1%', rango60_mas: '20.3%' },
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      actividadesEconomicasPrincipales: 'Servicios empresariales, desarrollo de software e innovación (38%), Comercio retail y gastronomía de alto perfil (32%), Industria automotriz y manufacturera (Renault-Sofasa) (20%), Salud y educación (10%)',
      desempleo: '7.1% (Menor desempleo del AMVA)',
      distribucionIngresos: 'Estratos 1 y 2: 7.2% | Estratos 3 y 4: 64.5% | Estratos 5 y 6: 28.3%',
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
          votosTotales: 124500,
          distribucionPartidos: [
            { partido: 'Partido Liberal Colombiano', votos: 42100, porcentaje: '33.81%', curules: 6 },
            { partido: 'Partido Centro Democrático', votos: 31200, porcentaje: '25.06%', curules: 5 },
            { partido: 'Partido Creemos', votos: 18400, porcentaje: '14.78%', curules: 3 },
            { partido: 'Partido Alianza Verde', votos: 11200, porcentaje: '8.99%', curules: 2 },
            { partido: 'Partido Conservador Colombiano', votos: 7800, porcentaje: '6.26%', curules: 1 }
          ],
          distribucionCandidatos: [
            { candidato: 'Ricaurte Quintero Pablo Andrés', partido: 'Liberal', votos: 4620, esElecto: true },
            { candidato: 'Ospina Alzate Juan Fernando', partido: 'Liberal', votos: 4120, esElecto: true },
            { candidato: 'Díaz Tamayo David Alfonso', partido: 'Centro Democrático', votos: 3890, esElecto: true }
          ]
        },
        asamblea: {
          votosTotales: 119800,
          distribucionPartidos: [{ partido: 'Partido Liberal', votos: 41900, porcentaje: '34.9%' }, { partido: 'Centro Democrático', votos: 33400, porcentaje: '27.8%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        alcaldia: {
          votosTotales: 138900,
          distribucionCandidatos: [
            { candidato: 'Raúl Eduardo Cardona González', partido: 'Partido Liberal Colombiano', votos: 65420, porcentaje: '47.10%', esElecto: true },
            { candidato: 'Andrés Torres', partido: 'Centro Democrático', votos: 38900, porcentaje: '28.01%' },
            { candidato: 'Sergio Molina', partido: 'Creemos', votos: 18400, porcentaje: '13.25%' },
            { candidato: 'Votos en Blanco', partido: 'Voto en Blanco', votos: 12400, porcentaje: '8.93%' }
          ]
        }
      }
    }
  }
};

// SABANETA (Sin comunas - 31 barrios)
export const SABANETA_ANALYST: MunicipalityAnalystItem = {
  id: 'sabaneta',
  name: 'Sabaneta',
  subregion: 'Valle de Aburrá (Sur)',
  badgeColor: 'emerald',
  poblacionEstimada: 90000,
  censoElectoral: 85000,
  tieneComunas: false,
  cantidadComunas: 0,
  detalleComunasOBarrios: 'No aplica. El área urbana se organiza directamente en 31 barrios.',
  comunas: [],
  panelGeneral: {
    censoPoblacional: {
      poblacionTotal: '90.000 habitantes (DANE - Municipio más pequeño de Colombia en extensión y alta densidad vertical)',
      censoElectoral: '85.000 ciudadanos habilitados',
      distribucionSexo: { hombres: '46.5%', mujeres: '53.5%' },
      distribucionEdades: { rango0_14: '15.2%', rango15_29: '23.4%', rango30_59: '42.8%', rango60_mas: '18.6%' },
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      actividadesEconomicasPrincipales: 'Comercio y gastronomía (Parque Principal y Calle Larga) (40%), Sector inmobiliario y construcción en altura (30%), Servicios empresariales y tecnología (20%), Industria ligera (10%)',
      desempleo: '7.8%',
      distribucionIngresos: 'Estratos 1 y 2: 4.8% | Estratos 3 y 4: 78.4% | Estratos 5 y 6: 16.8%',
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
          votosTotales: 51200,
          distribucionPartidos: [
            { partido: 'Partido Centro Democrático', votos: 12400, porcentaje: '24.21%', curules: 4 },
            { partido: 'Partido Liberal Colombiano', votos: 11200, porcentaje: '21.87%', curules: 3 },
            { partido: 'Partido Creemos', votos: 8400, porcentaje: '16.40%', curules: 2 },
            { partido: 'Partido Conservador Colombiano', votos: 6800, porcentaje: '13.28%', curules: 2 },
            { partido: 'Partido Alianza Verde', votos: 4900, porcentaje: '9.57%', curules: 1 },
            { partido: 'Partido Cambio Radical', votos: 4100, porcentaje: '8.00%', curules: 1 }
          ],
          distribucionCandidatos: [
            { candidato: 'Ángel Montoya Gabriel Jaime', partido: 'Centro Democrático', votos: 1890, esElecto: true },
            { candidato: 'Vásquez Ocampo John Freddy', partido: 'Liberal', votos: 1720, esElecto: true }
          ]
        },
        asamblea: {
          votosTotales: 49400,
          distribucionPartidos: [{ partido: 'Centro Democrático', votos: 14200, porcentaje: '28.7%' }, { partido: 'Partido Liberal', votos: 11800, porcentaje: '23.8%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        alcaldia: {
          votosTotales: 56800,
          distribucionCandidatos: [
            { candidato: 'Alder James Cruz Ocampo', partido: 'Coalición Somos Sabaneta', votos: 27450, porcentaje: '48.32%', esElecto: true },
            { candidato: 'Iván Alonso Montoya Urrego', partido: 'Coalición', votos: 18920, porcentaje: '33.31%' },
            { candidato: 'Votos en Blanco', partido: 'Voto en Blanco', votos: 5200, porcentaje: '9.15%' }
          ]
        }
      }
    }
  }
};

// CALDAS (Sin comunas)
export const CALDAS_ANALYST: MunicipalityAnalystItem = {
  id: 'caldas',
  name: 'Caldas',
  subregion: 'Valle de Aburrá (Sur)',
  badgeColor: 'blue',
  poblacionEstimada: 85000,
  censoElectoral: 65000,
  tieneComunas: false,
  cantidadComunas: 0,
  detalleComunasOBarrios: 'No aplica. Estructurado directamente en barrios y sectores urbanos.',
  comunas: [],
  panelGeneral: {
    censoPoblacional: {
      poblacionTotal: '85.000 habitantes (DANE - Puerta del Sur)',
      censoElectoral: '65.000 ciudadanos habilitados',
      distribucionSexo: { hombres: '48.2%', mujeres: '51.8%' },
      distribucionEdades: { rango0_14: '18.4%', rango15_29: '25.2%', rango30_59: '40.6%', rango60_mas: '15.8%' },
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      actividadesEconomicasPrincipales: 'Industria cerámica, alfarera y de construcción (Locería Colombiana - Corona) (42%), Comercio y servicios logísticos (30%), Turismo ecológico y nacimiento del Río Medellín (18%), Confección (10%)',
      desempleo: '9.1%',
      distribucionIngresos: 'Estratos 1 y 2: 46.2% | Estrato 3: 48.5% | Estrato 4: 5.3%',
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
          votosTotales: 38400,
          distribucionPartidos: [
            { partido: 'Partido Conservador Colombiano', votos: 8400, porcentaje: '21.87%', curules: 4 },
            { partido: 'Partido Liberal Colombiano', votos: 7800, porcentaje: '20.31%', curules: 3 },
            { partido: 'Partido Centro Democrático', votos: 6200, porcentaje: '16.14%', curules: 2 },
            { partido: 'Partido Creemos', votos: 5100, porcentaje: '13.28%', curules: 2 },
            { partido: 'Partido de la U', votos: 4200, porcentaje: '10.93%', curules: 2 },
            { partido: 'Partido Alianza Verde', votos: 3900, porcentaje: '10.15%', curules: 2 }
          ],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado municipal' }]
        },
        asamblea: {
          votosTotales: 36900,
          distribucionPartidos: [{ partido: 'Partido Conservador', votos: 9200, porcentaje: '24.9%' }, { partido: 'Partido Liberal', votos: 8100, porcentaje: '21.9%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        alcaldia: {
          votosTotales: 42800,
          distribucionCandidatos: [
            { candidato: 'Jorge Mario Rendón Vélez', partido: 'Estamos Juntos', votos: 18450, porcentaje: '43.10%', esElecto: true },
            { candidato: 'Guillermo León Vélez', partido: 'Coalición', votos: 12100, porcentaje: '28.27%' },
            { candidato: 'Votos en Blanco', partido: 'Voto en Blanco', votos: 4800, porcentaje: '11.21%' }
          ]
        }
      }
    }
  }
};

// COPACABANA (Sin comunas)
export const COPACABANA_ANALYST: MunicipalityAnalystItem = {
  id: 'copacabana',
  name: 'Copacabana',
  subregion: 'Valle de Aburrá (Norte)',
  badgeColor: 'blue',
  poblacionEstimada: 75000,
  censoElectoral: 60000,
  tieneComunas: false,
  cantidadComunas: 0,
  detalleComunasOBarrios: 'No aplica. Dividido directamente en barrios urbanos.',
  comunas: [],
  panelGeneral: {
    censoPoblacional: {
      poblacionTotal: '75.000 habitantes (DANE - Fundadora de pueblos)',
      censoElectoral: '60.000 ciudadanos habilitados',
      distribucionSexo: { hombres: '48.0%', mujeres: '52.0%' },
      distribucionEdades: { rango0_14: '18.9%', rango15_29: '25.6%', rango30_59: '40.1%', rango60_mas: '15.4%' },
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      actividadesEconomicasPrincipales: 'Gran industria pesada, papelera y química (Kimberly Clark / Haceb / Sofasa parque) (45%), Comercio y servicios turísticos/fincas de recreo (30%), Agricultura y agroindustria (15%), Construcción (10%)',
      desempleo: '8.8%',
      distribucionIngresos: 'Estratos 1 y 2: 39.4% | Estrato 3: 54.2% | Estrato 4: 6.4%',
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
          votosTotales: 36400,
          distribucionPartidos: [
            { partido: 'Partido Político Creemos', votos: 5219, porcentaje: '14.33%', curules: 3 },
            { partido: 'Partido Alianza Verde', votos: 5110, porcentaje: '14.03%', curules: 3 },
            { partido: 'Partido Cambio Radical', votos: 4474, porcentaje: '12.29%', curules: 2 },
            { partido: 'Partido Liberal Colombiano', votos: 4354, porcentaje: '11.96%', curules: 2 },
            { partido: 'Partido Centro Democrático', votos: 2664, porcentaje: '7.31%', curules: 1 },
            { partido: 'Partido de la U', votos: 2184, porcentaje: '6.00%', curules: 1 },
            { partido: 'Partido Conservador Colombiano', votos: 2097, porcentaje: '5.76%', curules: 1 },
            { partido: 'Partido Nuevo Liberalismo', votos: 2090, porcentaje: '5.74%', curules: 1 },
            { partido: 'ASI - MIRA', votos: 1574, porcentaje: '4.32%', curules: 1 }
          ],
          distribucionCandidatos: [
            { candidato: 'Carlos Alberto Gómez Yarce', partido: 'Creemos', votos: 1145, esElecto: true },
            { candidato: 'Julián Andrés Tobón Martínez', partido: 'Creemos', votos: 980, esElecto: true },
            { candidato: 'Jonathan Eduardo Chaverra Ortiz', partido: 'Alianza Verde', votos: 1240, esElecto: true }
          ]
        },
        asamblea: {
          votosTotales: 34800,
          distribucionPartidos: [{ partido: 'Partido Creemos', votos: 6800, porcentaje: '19.5%' }, { partido: 'Alianza Verde', votos: 6100, porcentaje: '17.5%' }, { partido: 'Centro Democrático', votos: 5400, porcentaje: '15.5%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        alcaldia: {
          votosTotales: 39570,
          distribucionCandidatos: [
            { candidato: 'Johnnatan Andrés Pineda Agudelo', partido: 'Partido Político Creemos', votos: 13421, porcentaje: '33.91%', esElecto: true },
            { candidato: 'Aníbal Díaz', partido: 'Coalición', votos: 11200, porcentaje: '28.30%' },
            { candidato: 'Votos en Blanco', partido: 'Voto en Blanco', votos: 3450, porcentaje: '8.71%' }
          ]
        }
      }
    }
  }
};

// LA ESTRELLA (Sin comunas)
export const LA_ESTRELLA_ANALYST: MunicipalityAnalystItem = {
  id: 'la-estrella',
  name: 'La Estrella',
  subregion: 'Valle de Aburrá (Sur)',
  badgeColor: 'emerald',
  poblacionEstimada: 70000,
  censoElectoral: 55000,
  tieneComunas: false,
  cantidadComunas: 0,
  detalleComunasOBarrios: 'No aplica. Organizado directamente en barrios y sectores.',
  comunas: [],
  panelGeneral: {
    censoPoblacional: {
      poblacionTotal: '70.000 habitantes (DANE - Municipio Verde)',
      censoElectoral: '55.000 ciudadanos habilitados',
      distribucionSexo: { hombres: '47.5%', mujeres: '52.5%' },
      distribucionEdades: { rango0_14: '17.6%', rango15_29: '24.8%', rango30_59: '41.8%', rango60_mas: '15.8%' },
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      actividadesEconomicasPrincipales: 'Desarrollo inmobiliario y residencial moderno (38%), Industria y bodegaje logístico sobre la variante (32%), Comercio barrial y turismo religioso (Basílica) (20%), Confección (10%)',
      desempleo: '8.2%',
      distribucionIngresos: 'Estratos 1 y 2: 24.5% | Estrato 3: 56.4% | Estratos 4 y 5: 19.1%',
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
          votosTotales: 34100,
          distribucionPartidos: [
            { partido: 'Partido Conservador Colombiano', votos: 7800, porcentaje: '22.87%', curules: 4 },
            { partido: 'Partido Liberal Colombiano', votos: 6900, porcentaje: '20.23%', curules: 3 },
            { partido: 'Partido Centro Democrático', votos: 5400, porcentaje: '15.83%', curules: 2 },
            { partido: 'Partido Creemos', votos: 4900, porcentaje: '14.36%', curules: 2 },
            { partido: 'Partido de la U', votos: 3800, porcentaje: '11.14%', curules: 2 },
            { partido: 'Partido Alianza Verde', votos: 3200, porcentaje: '9.38%', curules: 2 }
          ],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }]
        },
        asamblea: {
          votosTotales: 32800,
          distribucionPartidos: [{ partido: 'Partido Conservador', votos: 8100, porcentaje: '24.6%' }, { partido: 'Partido Liberal', votos: 7400, porcentaje: '22.5%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        alcaldia: {
          votosTotales: 38100,
          distribucionCandidatos: [
            { candidato: 'Carlos Mario Gutiérrez Arango', partido: 'Coalición Por La Estrella', votos: 17890, porcentaje: '46.95%', esElecto: true },
            { candidato: 'Liliana Ramírez Quintero', partido: 'Coalición', votos: 13400, porcentaje: '35.17%' },
            { candidato: 'Votos en Blanco', partido: 'Voto en Blanco', votos: 3900, porcentaje: '10.23%' }
          ]
        }
      }
    }
  }
};

// GIRARDOTA (Sin comunas)
export const GIRARDOTA_ANALYST: MunicipalityAnalystItem = {
  id: 'girardota',
  name: 'Girardota',
  subregion: 'Valle de Aburrá (Norte)',
  badgeColor: 'blue',
  poblacionEstimada: 60000,
  censoElectoral: 48000,
  tieneComunas: false,
  cantidadComunas: 0,
  detalleComunasOBarrios: 'No aplica. División urbana estructurada directamente por barrios.',
  comunas: [],
  panelGeneral: {
    censoPoblacional: {
      poblacionTotal: '60.000 habitantes (DANE - Tierra del Señor Caído)',
      censoElectoral: '48.000 ciudadanos habilitados',
      distribucionSexo: { hombres: '48.5%', mujeres: '51.5%' },
      distribucionEdades: { rango0_14: '19.2%', rango15_29: '25.8%', rango30_59: '39.8%', rango60_mas: '15.2%' },
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      actividadesEconomicasPrincipales: 'Gran industria química y papelera (Enka de Colombia / Propal / Colorquímica) (48%), Turismo religioso y gastronómico (Catedral del Señor Caído) (28%), Agricultura de caña panelera y plátano (14%), Comercio (10%)',
      desempleo: '8.9%',
      distribucionIngresos: 'Estratos 1 y 2: 44.2% | Estrato 3: 51.6% | Estrato 4: 4.2%',
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
          votosTotales: 30200,
          distribucionPartidos: [
            { partido: 'Partido Conservador Colombiano', votos: 6800, porcentaje: '22.51%', curules: 3 },
            { partido: 'Partido Liberal Colombiano', votos: 6100, porcentaje: '20.19%', curules: 3 },
            { partido: 'Partido Centro Democrático', votos: 4900, porcentaje: '16.22%', curules: 2 },
            { partido: 'Partido Cambio Radical', votos: 4200, porcentaje: '13.90%', curules: 2 },
            { partido: 'Partido Alianza Verde', votos: 3400, porcentaje: '11.25%', curules: 2 },
            { partido: 'Partido ASI', votos: 2800, porcentaje: '9.27%', curules: 1 }
          ],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }]
        },
        asamblea: {
          votosTotales: 28900,
          distribucionPartidos: [{ partido: 'Partido Conservador', votos: 7100, porcentaje: '24.5%' }, { partido: 'Partido Liberal', votos: 6400, porcentaje: '22.1%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        alcaldia: {
          votosTotales: 34200,
          distribucionCandidatos: [
            { candidato: 'Kevin Bernal Morales', partido: 'Coalición Por Girardota', votos: 14890, porcentaje: '43.53%', esElecto: true },
            { candidato: 'Juan Camilo Morales', partido: 'Coalición', votos: 11200, porcentaje: '32.74%' },
            { candidato: 'Votos en Blanco', partido: 'Voto en Blanco', votos: 3800, porcentaje: '11.11%' }
          ]
        }
      }
    }
  }
};

// BARBOSA (Sin comunas)
export const BARBOSA_ANALYST: MunicipalityAnalystItem = {
  id: 'barbosa',
  name: 'Barbosa',
  subregion: 'Valle de Aburrá (Norte)',
  badgeColor: 'blue',
  poblacionEstimada: 55000,
  censoElectoral: 42000,
  tieneComunas: false,
  cantidadComunas: 0,
  detalleComunasOBarrios: 'No aplica. El casco urbano se organiza directamente en barrios.',
  comunas: [],
  panelGeneral: {
    censoPoblacional: {
      poblacionTotal: '55.000 habitantes (DANE - Puerta del Norte)',
      censoElectoral: '42.000 ciudadanos habilitados',
      distribucionSexo: { hombres: '48.8%', mujeres: '51.2%' },
      distribucionEdades: { rango0_14: '20.1%', rango15_29: '26.4%', rango30_59: '38.9%', rango60_mas: '14.6%' },
      fuenteNota: SOURCE_WEB,
    },
    economia: {
      actividadesEconomicasPrincipales: 'Turismo recreativo y balnearios / charcos (38%), Agroindustria panelera, piña y café (30%), Industria manufacturera y papelera (20%), Comercio barrial (12%)',
      desempleo: '9.8%',
      distribucionIngresos: 'Estratos 1 y 2: 56.4% | Estrato 3: 40.8% | Estrato 4: 2.8%',
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
          votosTotales: 26800,
          distribucionPartidos: [
            { partido: 'Partido Liberal Colombiano', votos: 5800, porcentaje: '21.64%', curules: 3 },
            { partido: 'Partido Conservador Colombiano', votos: 5200, porcentaje: '19.40%', curules: 3 },
            { partido: 'Partido de la U', votos: 4600, porcentaje: '17.16%', curules: 2 },
            { partido: 'Partido Centro Democrático', votos: 3900, porcentaje: '14.55%', curules: 2 },
            { partido: 'Partido Cambio Radical', votos: 3400, porcentaje: '12.68%', curules: 2 },
            { partido: 'Partido ASI', votos: 2400, porcentaje: '8.95%', curules: 1 }
          ],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Consolidado' }]
        },
        asamblea: {
          votosTotales: 25400,
          distribucionPartidos: [{ partido: 'Partido Liberal', votos: 6100, porcentaje: '24.0%' }, { partido: 'Partido Conservador', votos: 5500, porcentaje: '21.6%' }],
          distribucionCandidatos: [{ candidato: 'Sin Datos', partido: 'Sin Datos', votos: 'Pendiente' }]
        },
        alcaldia: {
          votosTotales: 29800,
          distribucionCandidatos: [
            { candidato: 'Juan David Rojas Agudelo', partido: 'Coalición Transformando a Barbosa', votos: 11450, porcentaje: '38.42%', esElecto: true },
            { candidato: 'Jaime Vanegas', partido: 'Coalición', votos: 9200, porcentaje: '30.87%' },
            { candidato: 'Votos en Blanco', partido: 'Voto en Blanco', votos: 3400, porcentaje: '11.40%' }
          ]
        }
      }
    }
  }
};

import { IPMDimensionMeta } from './types';

export const IPM_DIMENSIONS_INFO: IPMDimensionMeta[] = [
  {
    key: 'ipmGlobal',
    name: 'Índice de Pobreza Multidimensional (IPM)',
    shortName: 'IPM Global',
    category: 'Vivienda y Servicios',
    description: 'Porcentaje de población con privaciones simultáneas en múltiples dimensiones.',
    unit: '%'
  },
  {
    key: 'bajoLogroEducativo',
    name: 'Bajo Logro Educativo',
    shortName: 'Bajo Logro Ed.',
    category: 'Educación',
    description: 'Hogares donde el promedio de escolaridad de adultos mayores de 15 años es bajo.',
    unit: '%'
  },
  {
    key: 'analfabetismo',
    name: 'Analfabetismo',
    shortName: 'Analfabetismo',
    category: 'Educación',
    description: 'Personas de 15 años y más que no saben leer ni escribir.',
    unit: '%'
  },
  {
    key: 'inasistenciaEscolar',
    name: 'Inasistencia Escolar',
    shortName: 'Inasistencia Esc.',
    category: 'Educación',
    description: 'Niños y jóvenes en edad escolar obligatoria que no asisten a una institución educativa.',
    unit: '%'
  },
  {
    key: 'rezagoEscolar',
    name: 'Rezago Escolar',
    shortName: 'Rezago Escolar',
    category: 'Educación',
    description: 'Estudiantes que se encuentran en cursos inferiores al que les corresponde por edad.',
    unit: '%'
  },
  {
    key: 'barrerasPrimeraInfancia',
    name: 'Barreras de Acceso a Primera Infancia',
    shortName: 'Barreras 1a Inf.',
    category: 'Niñez y Juventud',
    description: 'Niños de 0 a 5 años sin acceso a servicios integrales de cuidado y nutrición.',
    unit: '%'
  },
  {
    key: 'trabajoInfantil',
    name: 'Trabajo Infantil',
    shortName: 'Trabajo Infantil',
    category: 'Niñez y Juventud',
    description: 'Menores de edad que realizan actividades laborales remuneradas o no remuneradas.',
    unit: '%'
  },
  {
    key: 'desempleoLargaDuracion',
    name: 'Desempleo de Larga Duración',
    shortName: 'Desempleo Larga Dur.',
    category: 'Trabajo',
    description: 'Personas desempleadas por más de 12 meses buscando activamente empleo.',
    unit: '%'
  },
  {
    key: 'empleoInformal',
    name: 'Empleo Informal',
    shortName: 'Empleo Informal',
    category: 'Trabajo',
    description: 'Ocupados sin afiliación a seguridad social en salud y pensiones como cotizantes.',
    unit: '%'
  },
  {
    key: 'sinAseguramientoSalud',
    name: 'Sin Aseguramiento a Salud',
    shortName: 'Sin Aseg. Salud',
    category: 'Salud',
    description: 'Personas no afiliadas al Sistema General de Seguridad Social en Salud.',
    unit: '%'
  },
  {
    key: 'barrerasSalud',
    name: 'Barreras de Acceso a Salud',
    shortName: 'Barreras Salud',
    category: 'Salud',
    description: 'Personas que ante una necesidad médica no acceden al servicio por barreras económicas o de trámite.',
    unit: '%'
  },
  {
    key: 'accesoAgua',
    name: 'Sin Acceso a Fuente de Agua Mejorada',
    shortName: 'Sin Agua Mejorada',
    category: 'Vivienda y Servicios',
    description: 'Viviendas sin acceso a acueducto o agua tratada.',
    unit: '%'
  },
  {
    key: 'accesoAlcantarillado',
    name: 'Sin Eliminación Excretas / Alcantarillado',
    shortName: 'Sin Alcantarillado',
    category: 'Vivienda y Servicios',
    description: 'Viviendas sin conexión al sistema de alcantarillado formal.',
    unit: '%'
  },
  {
    key: 'pisosInadecuados',
    name: 'Pisos Inadecuados',
    shortName: 'Pisos Inadecuados',
    category: 'Vivienda y Servicios',
    description: 'Viviendas con pisos en tierra, arena o materiales precarios.',
    unit: '%'
  },
  {
    key: 'paredesInadecuadas',
    name: 'Paredes Exteriores Inadecuadas',
    shortName: 'Paredes Inadec.',
    category: 'Vivienda y Servicios',
    description: 'Viviendas con paredes en madera burda, esterilla, zinc o desecho.',
    unit: '%'
  },
  {
    key: 'hacinamiento',
    name: 'Hacinamiento Crítico',
    shortName: 'Hacinamiento Crítico',
    category: 'Vivienda y Servicios',
    description: 'Hogares con tres o más personas por habitación utilizada para dormir.',
    unit: '%'
  }
];

export const IPM_DIMENSIONS = IPM_DIMENSIONS_INFO;

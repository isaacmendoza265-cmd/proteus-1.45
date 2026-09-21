import { MunicipalityAnalystItem } from './analystTypes';
import { MEDELLIN_ANALYST } from './analystMedellinData';
import { BELLO_ANALYST } from './analystOtherMunisData';
import { ITAGUI_ANALYST } from './analystRemainingMunisData';
import {
  ENVIGADO_ANALYST,
  SABANETA_ANALYST,
  CALDAS_ANALYST,
  COPACABANA_ANALYST,
  LA_ESTRELLA_ANALYST,
  GIRARDOTA_ANALYST,
  BARBOSA_ANALYST
} from './analystEnvigadoAndOthersData';

export * from './analystTypes';

export const ALL_ANALYST_MUNICIPALITIES: MunicipalityAnalystItem[] = [
  MEDELLIN_ANALYST,
  BELLO_ANALYST,
  ITAGUI_ANALYST,
  ENVIGADO_ANALYST,
  SABANETA_ANALYST,
  CALDAS_ANALYST,
  COPACABANA_ANALYST,
  LA_ESTRELLA_ANALYST,
  GIRARDOTA_ANALYST,
  BARBOSA_ANALYST
];

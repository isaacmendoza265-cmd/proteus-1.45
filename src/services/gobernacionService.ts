import { ExtractedPdfStructure } from '../components/PdfScriptGenerator';

export interface GobernacionStatus {
  success: boolean;
  connected: boolean;
  gobernacionDir: string;
  dbExists: boolean;
  informesDirExists: boolean;
  totalNoticias: number;
  totalInformes: number;
  totalObjetivos: number;
  ultimoInformeFecha?: string;
  ultimoInformeCreadoEn?: string;
  ultimoInformeMdSize?: number;
  ultimoInformePdfSize?: number;
  error?: string;
}

export interface GobernacionObjective {
  id: number;
  nombre: string;
  cargo_actual: string;
  entidad_o_sector: string;
  cuadrante: number;
  cuenta_x?: string;
  subregion_enfoque?: string;
  temas_interes?: string[];
  estado_activo: number;
  fecha_verificacion?: string;
  notas_politicas?: string;
}

export interface RunCycleResponse {
  success: boolean;
  returncode?: number;
  stdout?: string;
  stderr?: string;
  latestReport?: ExtractedPdfStructure;
  error?: string;
}

/**
 * Consulta el estado de conexión del Subproyecto Gobernación y la base de datos de inteligencia.
 */
export async function getGobernacionStatus(): Promise<GobernacionStatus> {
  try {
    const res = await fetch('/api/gobernacion/status');
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();
  } catch (err: any) {
    return {
      success: false,
      connected: false,
      gobernacionDir: 'c:\\Users\\isaac\\OneDrive\\Documentos\\Poryecto independencia',
      dbExists: false,
      informesDirExists: false,
      totalNoticias: 0,
      totalInformes: 0,
      totalObjetivos: 0,
      error: err.message || 'No se pudo conectar con el servicio de Gobernación.'
    };
  }
}

/**
 * Obtiene el último informe auditado de Gobernación estructurado para el generador de guiones.
 */
export async function getLatestGobernacionReport(): Promise<ExtractedPdfStructure> {
  const res = await fetch('/api/gobernacion/latest-report');
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'No se pudo obtener el último informe de Gobernación.');
  }
  return data.report;
}

/**
 * Obtiene la lista de líderes y actores del padrón oficial monitoreado de Antioquia.
 */
export async function getGobernacionObjectives(): Promise<GobernacionObjective[]> {
  const res = await fetch('/api/gobernacion/objectives');
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'No se pudo obtener el listado de objetivos de monitoreo.');
  }
  return data.objectives;
}

/**
 * Dispara la ejecución del ciclo de 7 agentes de Gobernación en segundo plano.
 */
export async function runGobernacionCycle(): Promise<RunCycleResponse> {
  const res = await fetch('/api/gobernacion/run-cycle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Error al ejecutar el ciclo departamental de Gobernación.');
  }
  return data;
}

export const gobernacionService = {
  getStatus: async () => {
    const status = await getGobernacionStatus();
    return {
      status: status.connected ? 'online' : 'offline',
      database: {
        total_news: status.totalNoticias
      },
      ...status
    };
  },
  getLatestReport: getLatestGobernacionReport,
  getObjectives: getGobernacionObjectives,
  runCycle: runGobernacionCycle,
};

// Archivos guardados (briefs, análisis y reportes de los módulos) en la base de Proteus.
// Sustituye al antiguo "Google Drive", que era simulado: guardaba en el navegador y generaba enlaces
// de Drive que no existían.
import { api } from './sesionCliente';

export type CategoriaArchivo = 'analisis_territorial' | 'brief_contenido' | 'segmentacion_votantes' | 'multimedia' | 'candidato';

export interface ArchivoGuardado {
  id: string;
  nombre: string;
  categoria: CategoriaArchivo;
  candidato: string;
  creadoEn: string;
  creadoPor: string | null;
  bytes: number;
  vistaPrevia: string;
}

export const listarArchivos = () => api<{ archivos: ArchivoGuardado[] }>('/api/datos/archivos').then((r) => r.archivos);

export const guardarArchivo = (a: { nombre: string; categoria: CategoriaArchivo; candidato: string; datos: unknown }) =>
  api<{ archivo: { id: string } }>('/api/datos/archivos', { method: 'POST', json: a });

export const borrarArchivo = (id: string) => api(`/api/datos/archivos/${id}`, { method: 'DELETE' });

export const urlDescarga = (id: string) => `/api/datos/archivos/${id}`;

/** Categoría a partir del título que ponen los módulos al guardar. */
export function categoriaDeTitulo(titulo: string): CategoriaArchivo {
  const t = titulo.toLowerCase();
  if (t.includes('brief')) return 'brief_contenido';
  if (t.includes('segmento') || t.includes('demografia')) return 'segmentacion_votantes';
  if (t.includes('video') || t.includes('color')) return 'multimedia';
  return 'analisis_territorial';
}

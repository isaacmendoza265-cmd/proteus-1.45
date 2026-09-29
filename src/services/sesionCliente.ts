// Cliente de la sesión y de la API de datos del equipo (server: src/server/sesion.ts, usuarios.ts, datos.ts).
// Las cookies de sesión son httpOnly: el navegador las manda solo, aquí no se tocan.

export type Rol = 'ADMIN' | 'EQUIPO';
export interface UsuarioSesion { id: string; email: string; nombre: string; rol: Rol }
export interface UsuarioAdmin extends UsuarioSesion { activo: boolean; ultimoIngreso: string | null; creadoEn: string }

/** Si una llamada a /api responde 401 (sesión vencida o cerrada), se recarga y el servidor muestra el login. */
export function instalarGuardiaSesion() {
  const original = window.fetch.bind(window);
  let recargando = false;
  window.fetch = async (entrada, init) => {
    const r = await original(entrada, init);
    const url = typeof entrada === 'string' ? entrada : entrada instanceof URL ? entrada.pathname : entrada.url;
    if (r.status === 401 && /^(\/|https?:\/\/[^/]+\/)api\//.test(url) && !url.includes('/api/auth/') && !recargando) {
      recargando = true;
      window.location.reload();
    }
    return r;
  };
}

export async function api<T>(ruta: string, init: RequestInit & { json?: unknown } = {}): Promise<T> {
  const { json, ...resto } = init;
  const r = await fetch(ruta, {
    ...resto,
    headers: json !== undefined ? { 'Content-Type': 'application/json', ...resto.headers } : resto.headers,
    body: json !== undefined ? JSON.stringify(json) : resto.body,
  });
  const cuerpo = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(cuerpo.error || `El servidor respondió ${r.status}.`);
  return cuerpo as T;
}

export const obtenerUsuario = () => api<{ usuario: UsuarioSesion }>('/api/auth/yo').then((r) => r.usuario);

export async function cerrarSesion() {
  await api('/api/auth/logout', { method: 'POST' }).catch(() => undefined);
  window.location.reload();
}

export const cambiarMiClave = (actual: string, nueva: string) => api('/api/auth/clave', { method: 'POST', json: { actual, nueva } });

export const listarUsuarios = () => api<{ usuarios: UsuarioAdmin[] }>('/api/usuarios').then((r) => r.usuarios);
export const crearUsuario = (u: { email: string; nombre: string; rol: Rol; clave: string }) =>
  api<{ usuario: UsuarioAdmin }>('/api/usuarios', { method: 'POST', json: u }).then((r) => r.usuario);
export const editarUsuario = (id: string, cambios: Partial<{ nombre: string; rol: Rol; activo: boolean; clave: string }>) =>
  api<{ usuario: UsuarioAdmin }>(`/api/usuarios/${id}`, { method: 'PATCH', json: cambios }).then((r) => r.usuario);

/**
 * Lo que antes vivía solo en el localStorage de un navegador se sube a la base la primera vez que ese
 * navegador entra y la base aún no tiene nada; después se borra la copia local.
 */
export function leerLocal<T>(clave: string): T | null {
  try {
    const v = localStorage.getItem(clave);
    return v ? (JSON.parse(v) as T) : null;
  } catch {
    return null;
  }
}
export function borrarLocal(clave: string) {
  try { localStorage.removeItem(clave); } catch { /* sin almacenamiento */ }
}

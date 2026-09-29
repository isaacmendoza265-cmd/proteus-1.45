// Acceso con usuario y clave (HTTP Basic) para el servidor publicado. Sin él, cualquiera en internet
// podría usar /api/gemini/generar y /api/piezas/subir con la clave de Gemini del servidor.
// Se activa solo si PROTEUS_USUARIO y PROTEUS_CLAVE están definidas; en local no cambia nada.
import { timingSafeEqual } from 'crypto';
import type { RequestHandler } from 'express';

const iguales = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export function credencialesValidas(cabecera: string | undefined, usuario: string, clave: string): boolean {
  if (!cabecera?.startsWith('Basic ')) return false;
  const texto = Buffer.from(cabecera.slice(6), 'base64').toString('utf-8');
  const i = texto.indexOf(':');
  if (i < 0) return false;
  // Se evalúan las dos comparaciones siempre para no revelar cuál falló por el tiempo de respuesta
  const okUsuario = iguales(texto.slice(0, i), usuario);
  const okClave = iguales(texto.slice(i + 1), clave);
  return okUsuario && okClave;
}

export function exigirAcceso(usuario?: string, clave?: string): RequestHandler | null {
  if (!usuario || !clave) return null;
  return (req, res, next) => {
    // El healthcheck de Coolify entra sin credenciales
    if (req.path === '/api/health' || credencialesValidas(req.headers.authorization, usuario, clave)) {
      next();
      return;
    }
    res.set('WWW-Authenticate', 'Basic realm="Proteus", charset="UTF-8"').status(401).send('Acceso restringido.');
  };
}

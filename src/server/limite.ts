// Límite de peticiones por cliente para las rutas que gastan cuota de Gemini.
// ponytail: ventana fija en memoria (se reinicia con el proceso y no se comparte entre réplicas);
// basta con una sola réplica en Coolify. Pasar a Redis si algún día hay varias.
import type { RequestHandler } from 'express';

export function limitarPeticiones(maximo: number, ventanaMs: number, ahora = () => Date.now()): RequestHandler {
  const cuentas = new Map<string, { inicio: number; n: number }>();
  return (req, res, next) => {
    // Detrás de Cloudflare la IP real llega en cf-connecting-ip; el origen solo es alcanzable por el túnel
    const cliente = String(req.headers['cf-connecting-ip'] || req.ip || 'desconocido');
    const t = ahora();
    let c = cuentas.get(cliente);
    if (!c || t - c.inicio >= ventanaMs) {
      c = { inicio: t, n: 0 };
      cuentas.set(cliente, c);
      if (cuentas.size > 10_000) for (const [k, v] of cuentas) if (t - v.inicio >= ventanaMs) cuentas.delete(k);
    }
    if (++c.n > maximo) {
      res.set('Retry-After', String(Math.ceil((c.inicio + ventanaMs - t) / 1000)));
      res.status(429).json({ error: 'Demasiadas solicitudes a la IA. Espera un momento e inténtalo de nuevo.' });
      return;
    }
    next();
  };
}

// Modelos que el servidor acepta: el cliente no puede elegir uno más caro por su cuenta.
export const MODELOS_PERMITIDOS = new Set(['gemini-3.8-flash']);

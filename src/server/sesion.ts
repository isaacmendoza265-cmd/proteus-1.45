// Sesiones: JWT de acceso (15 min) + refresh opaco (7 días, rotado, solo su hash en la base), ambos en
// cookies httpOnly. Mismo esquema que Casa Korea y Marjhower. El refresco es transparente: cualquier
// petición con el acceso vencido y un refresh válido renueva las cookies en el propio servidor.
import { createHash, randomBytes } from 'crypto';
import path from 'path';
import express, { Router, type Request, type RequestHandler, type Response } from 'express';
import { SignJWT, jwtVerify } from 'jose';
import type { PrismaClient, Rol } from '@prisma/client';
import { hashClave, verificarClave } from './claves';
import { limitarPeticiones } from './limite';

export interface UsuarioSesion { id: string; email: string; nombre: string; rol: Rol }

const COOKIE_ACCESO = 'proteus_acceso';
const COOKIE_REFRESH = 'proteus_refresh';
const MS_ACCESO = 15 * 60_000;
const MS_REFRESH = 7 * 24 * 3_600_000;
const MS_GRACIA = 30_000;
const MAX_INTENTOS = 5;
const MS_BLOQUEO = 15 * 60_000;
export const CLAVE_MINIMA = 8;

const RUTAS_PUBLICAS = new Set(['/api/health', '/api/health/ready', '/api/auth/login']);

export function leerCookies(cabecera?: string): Record<string, string> {
  const r: Record<string, string> = {};
  for (const parte of (cabecera ?? '').split(';')) {
    const i = parte.indexOf('=');
    if (i > 0) r[parte.slice(0, i).trim()] = decodeURIComponent(parte.slice(i + 1).trim());
  }
  return r;
}

const sha256 = (t: string) => createHash('sha256').update(t).digest('hex');
const publico = (u: UsuarioSesion): UsuarioSesion => ({ id: u.id, email: u.email, nombre: u.nombre, rol: u.rol });
export const usuarioDe = (res: Response) => res.locals.usuario as UsuarioSesion;

export function crearSesiones(prisma: PrismaClient, secreto: string, opciones: { cookiesSeguras: boolean }) {
  if (secreto.length < 32) throw new Error('JWT_SECRET debe tener al menos 32 caracteres.');
  const llave = new TextEncoder().encode(secreto);
  // Hash de relleno: sin él, un correo inexistente respondería más rápido y delataría qué correos existen
  const hashRelleno = hashClave(randomBytes(16).toString('hex'));

  const ponerCookie = (res: Response, nombre: string, valor: string, maxAge: number) =>
    res.cookie(nombre, valor, { httpOnly: true, sameSite: 'lax', secure: opciones.cookiesSeguras, path: '/', maxAge });

  async function emitirAcceso(res: Response, u: UsuarioSesion) {
    const jwt = await new SignJWT({ email: u.email, nombre: u.nombre, rol: u.rol })
      .setProtectedHeader({ alg: 'HS256' }).setSubject(u.id).setIssuedAt().setExpirationTime(`${MS_ACCESO / 1000}s`).sign(llave);
    ponerCookie(res, COOKIE_ACCESO, jwt, MS_ACCESO);
  }

  async function emitirRefresh(res: Response, usuarioId: string) {
    const token = randomBytes(32).toString('base64url');
    await prisma.sesion.create({ data: { usuarioId, tokenHash: sha256(token), expira: new Date(Date.now() + MS_REFRESH) } });
    ponerCookie(res, COOKIE_REFRESH, token, MS_REFRESH);
  }

  async function resolver(req: Request, res: Response): Promise<UsuarioSesion | null> {
    const cookies = leerCookies(req.headers.cookie);
    if (cookies[COOKIE_ACCESO]) {
      try {
        const { payload } = await jwtVerify(cookies[COOKIE_ACCESO], llave, { algorithms: ['HS256'] });
        return { id: String(payload.sub), email: String(payload.email), nombre: String(payload.nombre), rol: payload.rol as Rol };
      } catch { /* vencido o manipulado: se intenta con el refresh */ }
    }
    if (!cookies[COOKIE_REFRESH]) return null;
    const s = await prisma.sesion.findUnique({ where: { tokenHash: sha256(cookies[COOKIE_REFRESH]) }, include: { usuario: true } });
    if (!s || s.expira < new Date() || !s.usuario.activo) return null;
    const u = publico(s.usuario);
    // Rotación atómica: solo la primera petición que usa este refresh emite uno nuevo
    const { count } = await prisma.sesion.updateMany({
      where: { id: s.id, reemplazada: false },
      data: { reemplazada: true, expira: new Date(Date.now() + MS_GRACIA) },
    });
    if (count === 1) await emitirRefresh(res, u.id);
    await emitirAcceso(res, u);
    return u;
  }

  /** Todo exige sesión salvo el healthcheck y el login. Sin sesión, una navegación recibe la pantalla de login. */
  const exigirSesion: RequestHandler = async (req, res, next) => {
    if (RUTAS_PUBLICAS.has(req.path)) return next();
    try {
      const u = await resolver(req, res);
      if (u) {
        res.locals.usuario = u;
        return next();
      }
    } catch (e) {
      return next(e);
    }
    if (req.path.startsWith('/api/')) {
      res.status(401).json({ error: 'Tu sesión venció. Vuelve a iniciar sesión.' });
    } else if (req.method === 'GET' && !path.extname(req.path)) {
      res.status(200).set('Cache-Control', 'no-store').type('html').send(PAGINA_LOGIN);
    } else {
      res.status(401).end();
    }
  };

  const router = Router();
  router.use(express.json());

  router.post('/login', limitarPeticiones(10, 60_000), async (req, res) => {
    const email = String(req.body?.email ?? '').trim().toLowerCase();
    const clave = String(req.body?.clave ?? '');
    const u = email ? await prisma.usuario.findUnique({ where: { email } }) : null;
    const ahora = new Date();
    if (u?.bloqueadoHasta && u.bloqueadoHasta > ahora) {
      res.status(423).json({ error: 'Cuenta bloqueada por intentos fallidos. Intenta de nuevo en 15 minutos.' });
      return;
    }
    const valida = await verificarClave(clave, u?.claveHash ?? (await hashRelleno));
    if (!u || !u.activo || !valida) {
      if (u) {
        const n = u.intentosFallidos + 1;
        await prisma.usuario.update({
          where: { id: u.id },
          data: n >= MAX_INTENTOS ? { intentosFallidos: 0, bloqueadoHasta: new Date(ahora.getTime() + MS_BLOQUEO) } : { intentosFallidos: n },
        });
      }
      res.status(401).json({ error: 'Correo o clave incorrectos.' });
      return;
    }
    await prisma.usuario.update({ where: { id: u.id }, data: { intentosFallidos: 0, bloqueadoHasta: null, ultimoIngreso: ahora } });
    await prisma.sesion.deleteMany({ where: { usuarioId: u.id, expira: { lt: ahora } } });
    await emitirRefresh(res, u.id);
    await emitirAcceso(res, publico(u));
    res.json({ usuario: publico(u) });
  });

  router.post('/logout', async (req, res) => {
    const token = leerCookies(req.headers.cookie)[COOKIE_REFRESH];
    if (token) await prisma.sesion.deleteMany({ where: { tokenHash: sha256(token) } });
    res.clearCookie(COOKIE_ACCESO, { path: '/' }).clearCookie(COOKIE_REFRESH, { path: '/' }).json({ ok: true });
  });

  router.get('/yo', (_req, res) => {
    res.json({ usuario: usuarioDe(res) });
  });

  router.post('/clave', async (req, res) => {
    const { actual, nueva } = req.body ?? {};
    if (typeof nueva !== 'string' || nueva.length < CLAVE_MINIMA) {
      res.status(400).json({ error: `La clave nueva debe tener al menos ${CLAVE_MINIMA} caracteres.` });
      return;
    }
    const u = await prisma.usuario.findUniqueOrThrow({ where: { id: usuarioDe(res).id } });
    if (!(await verificarClave(String(actual ?? ''), u.claveHash))) {
      res.status(401).json({ error: 'La clave actual no es correcta.' });
      return;
    }
    await prisma.usuario.update({ where: { id: u.id }, data: { claveHash: await hashClave(nueva) } });
    // Cierra las sesiones de los demás dispositivos; esta sigue viva con un refresh nuevo
    await prisma.sesion.deleteMany({ where: { usuarioId: u.id } });
    await emitirRefresh(res, u.id);
    res.json({ ok: true });
  });

  return { exigirSesion, router };
}

export const exigirRol = (rol: Rol): RequestHandler => (_req, res, next) => {
  if (usuarioDe(res)?.rol === rol) return next();
  res.status(403).json({ error: 'No tienes permiso para esta acción.' });
};

/** Crea el primer administrador si la base no tiene usuarios (ADMIN_EMAIL / ADMIN_CLAVE). */
export async function asegurarAdmin(prisma: PrismaClient, email?: string, clave?: string) {
  if ((await prisma.usuario.count()) > 0) return false;
  if (!email || !clave) {
    console.warn('[auth] No hay usuarios y faltan ADMIN_EMAIL / ADMIN_CLAVE: nadie podrá iniciar sesión.');
    return false;
  }
  await prisma.usuario.create({
    data: { email: email.trim().toLowerCase(), nombre: email.trim().split('@')[0], claveHash: await hashClave(clave), rol: 'ADMIN' },
  });
  console.log(`[auth] Administrador inicial creado: ${email}`);
  return true;
}

const PAGINA_LOGIN = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Proteus · Iniciar sesión</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500&family=Public+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{--c-bg:#F6F4EF;--c-surface:#fff;--c-ink:#17191C;--c-muted:#50565C;--c-border:#E0DBD1;--c-accent:#85172C;--c-err:#9B1C1C}
@media (prefers-color-scheme:dark){:root{--c-bg:#121416;--c-surface:#1B1E21;--c-ink:#ECE9E3;--c-muted:#A9AFB5;--c-border:#2B2F34;--c-accent:#A3243A;--c-err:#F08A9A}}
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:16px;background:var(--c-bg);color:var(--c-ink);font:16px/1.5 'Public Sans',system-ui,sans-serif}
main{width:100%;max-width:380px;background:var(--c-surface);border:1px solid var(--c-border);border-radius:16px;padding:32px}
.marca{display:flex;align-items:center;gap:10px;margin-bottom:24px}.logo{width:36px;height:36px;border-radius:9px;background:var(--c-accent);color:#fff;display:grid;place-items:center;font-weight:700}
h1{font:500 28px/1.2 Newsreader,Georgia,serif;margin:0}p{margin:0 0 20px;color:var(--c-muted);font-size:15px}
label{display:block;font-size:14px;font-weight:600;margin:14px 0 6px}input{width:100%;min-height:44px;padding:0 12px;border:1px solid var(--c-border);border-radius:10px;background:var(--c-bg);color:var(--c-ink);font:inherit}
input:focus{outline:2px solid var(--c-accent);outline-offset:1px}button{width:100%;min-height:46px;margin-top:22px;border:0;border-radius:10px;background:var(--c-accent);color:#fff;font:700 15px 'Public Sans',system-ui,sans-serif;cursor:pointer}
button:disabled{opacity:.6;cursor:wait}#error{min-height:22px;margin-top:14px;color:var(--c-err);font-size:14px}
</style></head><body><main>
<div class="marca"><div class="logo" aria-hidden="true">P</div><div><h1>Proteus</h1></div></div>
<p>Centro de estrategia electoral. Inicia sesión para continuar.</p>
<form id="f" novalidate>
<label for="email">Correo</label><input id="email" name="email" type="email" autocomplete="username" required autofocus>
<label for="clave">Clave</label><input id="clave" name="clave" type="password" autocomplete="current-password" required>
<button id="b" type="submit">Entrar</button><div id="error" role="alert"></div>
</form></main>
<script>
document.getElementById('f').addEventListener('submit', async function (e) {
  e.preventDefault(); var b = document.getElementById('b'), err = document.getElementById('error');
  b.disabled = true; err.textContent = '';
  try {
    var r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.email.value, clave: this.clave.value }) });
    if (r.ok) { location.reload(); return; }
    var j = await r.json().catch(function () { return {}; });
    err.textContent = j.error || (r.status === 429 ? 'Demasiados intentos. Espera un minuto.' : 'No se pudo iniciar sesión.');
  } catch (x) { err.textContent = 'Sin conexión con el servidor.'; }
  b.disabled = false;
});
</script></body></html>`;

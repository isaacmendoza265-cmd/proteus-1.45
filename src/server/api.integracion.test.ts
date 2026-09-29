// Pruebas de sesión, usuarios y datos contra PostgreSQL real (TEST_DATABASE_URL, datos desechables).
// Sin TEST_DATABASE_URL se omiten. En local: postgresql://matriarca@localhost:55433/proteus_test
import { execSync } from 'child_process';
import type { AddressInfo } from 'net';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { hashClave } from './claves';
import { asegurarAdmin, crearSesiones } from './sesion';
import { rutasUsuarios } from './usuarios';
import { rutasDatos } from './datos';

const URL_BD = process.env.TEST_DATABASE_URL;

describe.skipIf(!URL_BD)('API con PostgreSQL', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    execSync('npx prisma migrate deploy', { env: { ...process.env, DATABASE_URL: URL_BD }, stdio: 'ignore' });
    prisma = new PrismaClient({ datasourceUrl: URL_BD });
  }, 60_000);
  afterAll(async () => prisma?.$disconnect());
  beforeEach(async () => {
    await prisma.$executeRawUnsafe('TRUNCATE "Sesion", "Usuario", "PerfilCandidato", "PiezaAnalizada", "ArchivoGuardado" CASCADE');
  });

  /** Levanta la misma composición que server.ts en un puerto libre y devuelve un cliente con cookies. */
  async function servidor() {
    const app = express();
    const sesiones = crearSesiones(prisma, 'x'.repeat(32), { cookiesSeguras: false });
    app.get('/api/health', (_req, res) => { res.json({ status: 'ok' }); });
    app.use(sesiones.exigirSesion);
    app.use('/api/auth', sesiones.router);
    app.use('/api/usuarios', rutasUsuarios(prisma));
    app.use('/api/datos', rutasDatos(prisma));
    app.get('/', (_req, res) => { res.send('APP'); });
    const srv = app.listen(0);
    const base = `http://127.0.0.1:${(srv.address() as AddressInfo).port}`;
    const cliente = () => {
      const jar = new Map<string, string>();
      const pedir = async (ruta: string, init: RequestInit & { json?: unknown } = {}) => {
        const headers: Record<string, string> = { cookie: [...jar].map(([k, v]) => `${k}=${v}`).join('; ') };
        if (init.json !== undefined) headers['content-type'] = 'application/json';
        const r = await fetch(base + ruta, { ...init, headers, body: init.json !== undefined ? JSON.stringify(init.json) : init.body });
        for (const c of r.headers.getSetCookie()) {
          const [par, ...attrs] = c.split(';');
          const [k, v] = par.split('=');
          if (attrs.some((a) => /max-age=0|expires=thu, 01 jan 1970/i.test(a.trim())) || !v) jar.delete(k);
          else jar.set(k, v);
        }
        return r;
      };
      const entrar = (email: string, clave: string) => pedir('/api/auth/login', { method: 'POST', json: { email, clave } });
      return { pedir, entrar, jar };
    };
    return { cliente, cerrar: () => srv.close() };
  }

  const crearUsuario = async (email: string, clave: string, rol: 'ADMIN' | 'EQUIPO' = 'EQUIPO') =>
    prisma.usuario.create({ data: { email, nombre: email.split('@')[0], claveHash: await hashClave(clave), rol } });

  it('sin sesión: la API da 401, una navegación recibe el login y el healthcheck queda abierto', async () => {
    const s = await servidor();
    const c = s.cliente();
    expect((await c.pedir('/api/datos/perfil')).status).toBe(401);
    const html = await c.pedir('/');
    expect(html.status).toBe(200);
    expect(await html.text()).toContain('Iniciar sesión');
    expect((await c.pedir('/assets/app.js')).status).toBe(401);
    expect((await c.pedir('/api/health')).status).toBe(200);
    s.cerrar();
  });

  it('login: clave mala 401 sin revelar el motivo; buena abre sesión y /yo devuelve el usuario', async () => {
    await crearUsuario('ana@x.co', 'clave-correcta');
    const s = await servidor();
    const c = s.cliente();
    const mala = await c.entrar('ana@x.co', 'otra');
    expect(mala.status).toBe(401);
    expect((await c.entrar('nadie@x.co', 'otra')).status).toBe(401);
    expect((await c.entrar('ANA@x.co ', 'clave-correcta')).status).toBe(200);
    expect(c.jar.has('proteus_acceso') && c.jar.has('proteus_refresh')).toBe(true);
    const yo = await (await c.pedir('/api/auth/yo')).json();
    expect(yo.usuario).toMatchObject({ email: 'ana@x.co', rol: 'EQUIPO' });
    expect((await c.pedir('/')).status).toBe(200);
    expect(await (await c.pedir('/')).text()).toBe('APP');
    s.cerrar();
  });

  it('5 intentos fallidos bloquean la cuenta aunque luego llegue la clave buena', async () => {
    await crearUsuario('beto@x.co', 'clave-correcta');
    const s = await servidor();
    const c = s.cliente();
    for (let i = 0; i < 5; i++) expect((await c.entrar('beto@x.co', 'mal')).status).toBe(401);
    expect((await c.entrar('beto@x.co', 'clave-correcta')).status).toBe(423);
    s.cerrar();
  });

  it('refresh: renueva el acceso, rota una sola vez, tolera la carrera y caduca tras la gracia', async () => {
    await crearUsuario('caro@x.co', 'clave-correcta');
    const s = await servidor();
    const c = s.cliente();
    await c.entrar('caro@x.co', 'clave-correcta');
    const refreshViejo = c.jar.get('proteus_refresh')!;
    c.jar.delete('proteus_acceso'); // acceso vencido

    const [a, b] = await Promise.all([c.pedir('/api/auth/yo'), c.pedir('/api/auth/yo')]);
    expect([a.status, b.status]).toEqual([200, 200]);
    expect(c.jar.get('proteus_refresh')).not.toBe(refreshViejo);
    expect(await prisma.sesion.count({ where: { reemplazada: false } })).toBe(1);

    // Pasada la gracia, el refresh viejo ya no sirve
    await prisma.sesion.updateMany({ where: { reemplazada: true }, data: { expira: new Date(Date.now() - 1000) } });
    const otro = s.cliente();
    otro.jar.set('proteus_refresh', refreshViejo);
    expect((await otro.pedir('/api/auth/yo')).status).toBe(401);
    // El nuevo sí
    c.jar.delete('proteus_acceso');
    expect((await c.pedir('/api/auth/yo')).status).toBe(200);
    s.cerrar();
  });

  it('logout borra la sesión; desactivar a un usuario corta su refresh', async () => {
    await crearUsuario('admin@x.co', 'clave-admin', 'ADMIN');
    const dani = await crearUsuario('dani@x.co', 'clave-dani');
    const s = await servidor();
    const admin = s.cliente();
    const d = s.cliente();
    await admin.entrar('admin@x.co', 'clave-admin');
    await d.entrar('dani@x.co', 'clave-dani');

    expect((await admin.pedir(`/api/usuarios/${dani.id}`, { method: 'PATCH', json: { activo: false } })).status).toBe(200);
    d.jar.delete('proteus_acceso');
    expect((await d.pedir('/api/auth/yo')).status).toBe(401);

    await admin.pedir('/api/auth/logout', { method: 'POST' });
    expect((await admin.pedir('/api/auth/yo')).status).toBe(401);
    s.cerrar();
  });

  it('usuarios: EQUIPO no entra; ADMIN crea y no puede dejar el sistema sin administrador', async () => {
    const admin = await crearUsuario('admin@x.co', 'clave-admin', 'ADMIN');
    await crearUsuario('eva@x.co', 'clave-eva');
    const s = await servidor();
    const e = s.cliente();
    await e.entrar('eva@x.co', 'clave-eva');
    expect((await e.pedir('/api/usuarios')).status).toBe(403);

    const a = s.cliente();
    await a.entrar('admin@x.co', 'clave-admin');
    expect((await a.pedir('/api/usuarios', { method: 'POST', json: { email: 'f@x.co', nombre: 'F', clave: 'corta' } })).status).toBe(400);
    expect((await a.pedir('/api/usuarios', { method: 'POST', json: { email: 'f@x.co', nombre: 'F', clave: 'clave-larga-f' } })).status).toBe(201);
    expect((await a.pedir('/api/usuarios', { method: 'POST', json: { email: 'f@x.co', nombre: 'F', clave: 'clave-larga-f' } })).status).toBe(409);
    expect((await a.pedir(`/api/usuarios/${admin.id}`, { method: 'PATCH', json: { rol: 'EQUIPO' } })).status).toBe(409);
    const lista = await (await a.pedir('/api/usuarios')).json();
    expect(lista.usuarios.map((u: any) => u.email)).toEqual(['admin@x.co', 'eva@x.co', 'f@x.co']);
    expect(JSON.stringify(lista)).not.toContain('claveHash');
    s.cerrar();
  });

  it('datos: perfil, piezas y archivos se guardan en la base y los ve todo el equipo', async () => {
    await crearUsuario('g@x.co', 'clave-g');
    await crearUsuario('h@x.co', 'clave-h');
    const s = await servidor();
    const g = s.cliente();
    const h = s.cliente();
    await g.entrar('g@x.co', 'clave-g');
    await h.entrar('h@x.co', 'clave-h');

    expect((await (await g.pedir('/api/datos/perfil')).json()).perfil).toBeNull();
    await g.pedir('/api/datos/perfil', { method: 'PUT', json: { perfil: { nombre: 'Isaac', identidad: { lema: 'ñ' } } } });
    const perfil = await (await h.pedir('/api/datos/perfil')).json();
    expect(perfil).toMatchObject({ perfil: { nombre: 'Isaac', identidad: { lema: 'ñ' } }, actualizadoPor: 'g@x.co' });

    await g.pedir('/api/datos/piezas', { method: 'POST', json: { pieza: { id: 'p1', nombre: 'Spot' } } });
    await g.pedir('/api/datos/piezas', { method: 'POST', json: { pieza: { id: 'p1', nombre: 'Spot v2' } } });
    expect((await (await h.pedir('/api/datos/piezas')).json()).piezas).toEqual([{ id: 'p1', nombre: 'Spot v2' }]);
    await h.pedir('/api/datos/piezas/p1', { method: 'DELETE' });
    expect((await (await g.pedir('/api/datos/piezas')).json()).piezas).toEqual([]);

    const creado = await (await g.pedir('/api/datos/archivos', { method: 'POST', json: { nombre: 'Brief Medellín', categoria: 'brief_contenido', candidato: 'Isaac', datos: { a: 1 } } })).json();
    const lista = await (await h.pedir('/api/datos/archivos')).json();
    expect(lista.archivos[0]).toMatchObject({ nombre: 'Brief Medellín', creadoPor: 'g@x.co' });
    expect(lista.archivos[0].contenido).toBeUndefined();
    const descarga = await h.pedir(`/api/datos/archivos/${creado.archivo.id}`);
    expect(JSON.parse(await descarga.text())).toEqual({ a: 1 });
    expect(descarga.headers.get('content-disposition')).toContain('Brief_Medell');
    s.cerrar();
  });

  it('asegurarAdmin crea el primer administrador una sola vez', async () => {
    expect(await asegurarAdmin(prisma, 'Jefe@x.co', 'clave-jefe')).toBe(true);
    expect(await asegurarAdmin(prisma, 'otro@x.co', 'clave-otro')).toBe(false);
    expect(await prisma.usuario.findMany({ select: { email: true, rol: true } })).toEqual([{ email: 'jefe@x.co', rol: 'ADMIN' }]);
  });
});

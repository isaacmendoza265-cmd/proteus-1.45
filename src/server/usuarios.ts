// Gestión de usuarios (solo ADMIN): listar, crear, editar rol/nombre, desactivar y reponer clave.
import express, { Router } from 'express';
import type { PrismaClient, Rol } from '@prisma/client';
import { hashClave } from './claves';
import { CLAVE_MINIMA, exigirRol, usuarioDe } from './sesion';

const ROLES: Rol[] = ['ADMIN', 'EQUIPO'];
const CAMPOS = { id: true, email: true, nombre: true, rol: true, activo: true, ultimoIngreso: true, creadoEn: true } as const;

export function rutasUsuarios(prisma: PrismaClient) {
  const router = Router();
  router.use(express.json(), exigirRol('ADMIN'));

  router.get('/', async (_req, res) => {
    res.json({ usuarios: await prisma.usuario.findMany({ select: CAMPOS, orderBy: { creadoEn: 'asc' } }) });
  });

  router.post('/', async (req, res) => {
    const email = String(req.body?.email ?? '').trim().toLowerCase();
    const nombre = String(req.body?.nombre ?? '').trim();
    const clave = String(req.body?.clave ?? '');
    const rol = (req.body?.rol ?? 'EQUIPO') as Rol;
    if (!/^[^@\s]+@[^@\s]+$/.test(email) || !nombre) {
      res.status(400).json({ error: 'Faltan un correo válido y el nombre.' });
      return;
    }
    if (clave.length < CLAVE_MINIMA || !ROLES.includes(rol)) {
      res.status(400).json({ error: `La clave debe tener al menos ${CLAVE_MINIMA} caracteres y el rol ser ADMIN o EQUIPO.` });
      return;
    }
    if (await prisma.usuario.findUnique({ where: { email } })) {
      res.status(409).json({ error: 'Ya existe un usuario con ese correo.' });
      return;
    }
    const usuario = await prisma.usuario.create({ data: { email, nombre, rol, claveHash: await hashClave(clave) }, select: CAMPOS });
    res.status(201).json({ usuario });
  });

  router.patch('/:id', async (req, res) => {
    const { nombre, rol, activo, clave } = req.body ?? {};
    const yo = usuarioDe(res);
    const objetivo = await prisma.usuario.findUnique({ where: { id: req.params.id } });
    if (!objetivo) {
      res.status(404).json({ error: 'Usuario no encontrado.' });
      return;
    }
    if (rol !== undefined && !ROLES.includes(rol)) {
      res.status(400).json({ error: 'El rol debe ser ADMIN o EQUIPO.' });
      return;
    }
    if (clave !== undefined && (typeof clave !== 'string' || clave.length < CLAVE_MINIMA)) {
      res.status(400).json({ error: `La clave debe tener al menos ${CLAVE_MINIMA} caracteres.` });
      return;
    }
    // Nunca dejar el sistema sin un administrador activo
    const pierdeAdmin = objetivo.rol === 'ADMIN' && objetivo.activo && ((rol && rol !== 'ADMIN') || activo === false);
    if (pierdeAdmin && (await prisma.usuario.count({ where: { rol: 'ADMIN', activo: true } })) <= 1) {
      res.status(409).json({ error: 'Debe quedar al menos un administrador activo.' });
      return;
    }
    if (objetivo.id === yo.id && activo === false) {
      res.status(409).json({ error: 'No puedes desactivar tu propia cuenta.' });
      return;
    }
    const usuario = await prisma.usuario.update({
      where: { id: objetivo.id },
      data: {
        ...(typeof nombre === 'string' && nombre.trim() ? { nombre: nombre.trim() } : {}),
        ...(rol ? { rol } : {}),
        ...(typeof activo === 'boolean' ? { activo } : {}),
        ...(clave ? { claveHash: await hashClave(clave), intentosFallidos: 0, bloqueadoHasta: null } : {}),
      },
      select: CAMPOS,
    });
    // Desactivar o reponer la clave cierra sus sesiones abiertas
    if (activo === false || clave) await prisma.sesion.deleteMany({ where: { usuarioId: objetivo.id } });
    res.json({ usuario });
  });

  return router;
}

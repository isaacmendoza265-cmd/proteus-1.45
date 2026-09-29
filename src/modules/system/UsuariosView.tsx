import React, { useEffect, useState } from 'react';
import {
  cambiarMiClave, crearUsuario, editarUsuario, listarUsuarios,
  type Rol, type UsuarioAdmin, type UsuarioSesion,
} from '../../services/sesionCliente';

const CLAVE_MINIMA = 8;
const campo = 'w-full min-h-11 px-3 rounded-lg border border-[var(--c-border)] bg-[var(--c-bg)] text-[var(--c-ink)] text-sm';
const boton = 'min-h-11 px-4 rounded-lg text-sm font-semibold';
const tarjeta = 'rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-5';
const fecha = (f: string | null) => (f ? new Date(f).toLocaleString('es-CO', { dateStyle: 'medium', timeStyle: 'short' }) : '—');

/** Ajustes › Usuarios y acceso: cambiar la propia clave y, si eres ADMIN, gestionar el equipo. */
export const UsuariosView: React.FC<{ usuario: UsuarioSesion | null }> = ({ usuario }) => {
  if (!usuario) return <p className="text-sm text-[var(--c-muted)]">Cargando…</p>;
  return (
    <div className="proteus-civico flex flex-col gap-5 max-w-4xl">
      <MiCuenta usuario={usuario} />
      {usuario.rol === 'ADMIN' && <Equipo yo={usuario} />}
    </div>
  );
};

const MiCuenta: React.FC<{ usuario: UsuarioSesion }> = ({ usuario }) => {
  const [actual, setActual] = useState('');
  const [nueva, setNueva] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; texto: string } | null>(null);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    try {
      await cambiarMiClave(actual, nueva);
      setActual('');
      setNueva('');
      setMsg({ ok: true, texto: 'Clave cambiada. Se cerraron tus sesiones en otros dispositivos.' });
    } catch (err: any) {
      setMsg({ ok: false, texto: err.message });
    }
  };

  return (
    <section className={tarjeta} aria-labelledby="mi-cuenta">
      <h2 id="mi-cuenta" className="m-0 font-titulo text-2xl font-medium">Mi cuenta</h2>
      <p className="mt-1 mb-4 text-sm text-[var(--c-muted)]">
        {usuario.nombre} · {usuario.email} · {usuario.rol === 'ADMIN' ? 'Administrador' : 'Equipo'}
      </p>
      <form onSubmit={enviar} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] items-end">
        <label className="text-sm font-semibold">Clave actual
          <input type="password" autoComplete="current-password" required value={actual} onChange={(e) => setActual(e.target.value)} className={`${campo} mt-1.5`} />
        </label>
        <label className="text-sm font-semibold">Clave nueva (mín. {CLAVE_MINIMA})
          <input type="password" autoComplete="new-password" required minLength={CLAVE_MINIMA} value={nueva} onChange={(e) => setNueva(e.target.value)} className={`${campo} mt-1.5`} />
        </label>
        <button type="submit" className={`${boton} bg-[var(--c-accent)] text-white`}>Cambiar clave</button>
      </form>
      {msg && <p role="status" className={`mt-3 mb-0 text-sm ${msg.ok ? 'text-[var(--c-ok)]' : 'text-[var(--c-accent-text)]'}`}>{msg.texto}</p>}
    </section>
  );
};

const Equipo: React.FC<{ yo: UsuarioSesion }> = ({ yo }) => {
  const [usuarios, setUsuarios] = useState<UsuarioAdmin[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nuevo, setNuevo] = useState({ email: '', nombre: '', rol: 'EQUIPO' as Rol, clave: '' });

  useEffect(() => {
    listarUsuarios().then(setUsuarios).catch((e) => setError(e.message));
  }, []);

  const aplicar = async (u: UsuarioAdmin, cambios: Parameters<typeof editarUsuario>[1]) => {
    setError(null);
    try {
      const actualizado = await editarUsuario(u.id, cambios);
      setUsuarios((l) => l?.map((x) => (x.id === u.id ? actualizado : x)) ?? null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const reponerClave = (u: UsuarioAdmin) => {
    const clave = window.prompt(`Clave nueva para ${u.email} (mínimo ${CLAVE_MINIMA} caracteres):`);
    if (clave) aplicar(u, { clave });
  };

  const crear = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const u = await crearUsuario(nuevo);
      setUsuarios((l) => [...(l ?? []), u]);
      setNuevo({ email: '', nombre: '', rol: 'EQUIPO', clave: '' });
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <section className={tarjeta} aria-labelledby="equipo">
      <h2 id="equipo" className="m-0 font-titulo text-2xl font-medium">Equipo</h2>
      <p className="mt-1 mb-4 text-sm text-[var(--c-muted)]">
        Quién puede entrar a Proteus. Los administradores gestionan usuarios; el resto del equipo usa todos los módulos.
      </p>
      {error && <p role="alert" className="mb-3 text-sm text-[var(--c-accent-text)]">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-[var(--c-muted)] border-b border-[var(--c-border)]">
              <th className="py-2 pr-3 font-semibold">Usuario</th>
              <th className="py-2 pr-3 font-semibold">Rol</th>
              <th className="py-2 pr-3 font-semibold">Último ingreso</th>
              <th className="py-2 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios?.map((u) => (
              <tr key={u.id} className={`border-b border-[var(--c-border)] ${u.activo ? '' : 'opacity-60'}`}>
                <td className="py-2.5 pr-3">
                  <div className="font-semibold">{u.nombre}{u.id === yo.id ? ' (tú)' : ''}</div>
                  <div className="text-xs text-[var(--c-muted)]">{u.email}{u.activo ? '' : ' · desactivado'}</div>
                </td>
                <td className="py-2.5 pr-3">
                  <select aria-label={`Rol de ${u.email}`} value={u.rol} onChange={(e) => aplicar(u, { rol: e.target.value as Rol })} className={`${campo} w-auto`}>
                    <option value="EQUIPO">Equipo</option>
                    <option value="ADMIN">Administrador</option>
                  </select>
                </td>
                <td className="py-2.5 pr-3 text-[var(--c-muted)]">{fecha(u.ultimoIngreso)}</td>
                <td className="py-2.5">
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => reponerClave(u)} className={`${boton} border border-[var(--c-border)]`}>Reponer clave</button>
                    {u.id !== yo.id && (
                      <button onClick={() => aplicar(u, { activo: !u.activo })} className={`${boton} border border-[var(--c-border)]`}>
                        {u.activo ? 'Desactivar' : 'Activar'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!usuarios && !error && <p className="text-sm text-[var(--c-muted)]">Cargando…</p>}
      </div>

      <form onSubmit={crear} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_auto_1fr_auto] items-end">
        <label className="text-sm font-semibold">Correo
          <input type="email" required value={nuevo.email} onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })} className={`${campo} mt-1.5`} />
        </label>
        <label className="text-sm font-semibold">Nombre
          <input required value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} className={`${campo} mt-1.5`} />
        </label>
        <label className="text-sm font-semibold">Rol
          <select value={nuevo.rol} onChange={(e) => setNuevo({ ...nuevo, rol: e.target.value as Rol })} className={`${campo} mt-1.5`}>
            <option value="EQUIPO">Equipo</option>
            <option value="ADMIN">Administrador</option>
          </select>
        </label>
        <label className="text-sm font-semibold">Clave inicial
          <input type="password" autoComplete="new-password" required minLength={CLAVE_MINIMA} value={nuevo.clave} onChange={(e) => setNuevo({ ...nuevo, clave: e.target.value })} className={`${campo} mt-1.5`} />
        </label>
        <button type="submit" className={`${boton} bg-[var(--c-accent)] text-white`}>Agregar</button>
      </form>
    </section>
  );
};

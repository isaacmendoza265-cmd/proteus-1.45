import { describe, expect, it, vi } from 'vitest';
import { credencialesValidas, exigirAcceso } from './acceso';

const basic = (u: string, c: string) => `Basic ${Buffer.from(`${u}:${c}`).toString('base64')}`;

describe('acceso', () => {
  it('valida usuario y clave exactos, incluso con ":" en la clave', () => {
    expect(credencialesValidas(basic('isaac', 'a:b'), 'isaac', 'a:b')).toBe(true);
    expect(credencialesValidas(basic('isaac', 'mal'), 'isaac', 'a:b')).toBe(false);
    expect(credencialesValidas(basic('otro', 'a:b'), 'isaac', 'a:b')).toBe(false);
    expect(credencialesValidas(undefined, 'isaac', 'a:b')).toBe(false);
    expect(credencialesValidas('Bearer x', 'isaac', 'a:b')).toBe(false);
  });

  it('sin variables no se activa', () => {
    expect(exigirAcceso(undefined, 'x')).toBeNull();
    expect(exigirAcceso('x', '')).toBeNull();
  });

  it('responde 401 sin credenciales y deja pasar /api/health', () => {
    const mw = exigirAcceso('isaac', 'clave')!;
    const res: any = { set: vi.fn(() => res), status: vi.fn(() => res), send: vi.fn() };
    const next = vi.fn();

    mw({ path: '/api/gemini/generar', headers: {} } as any, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();

    mw({ path: '/api/health', headers: {} } as any, res, next);
    mw({ path: '/', headers: { authorization: basic('isaac', 'clave') } } as any, res, next);
    expect(next).toHaveBeenCalledTimes(2);
  });
});

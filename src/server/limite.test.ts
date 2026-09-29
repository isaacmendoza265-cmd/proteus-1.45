import { describe, expect, it, vi } from 'vitest';
import { limitarPeticiones } from './limite';

const respuesta = () => {
  const res: any = { set: vi.fn(() => res), status: vi.fn(() => res), json: vi.fn() };
  return res;
};

describe('limitarPeticiones', () => {
  it('corta por cliente al pasar el máximo y se reabre con la ventana siguiente', () => {
    let t = 0;
    const mw = limitarPeticiones(2, 60_000, () => t);
    const a = { headers: { 'cf-connecting-ip': '1.1.1.1' } } as any;
    const b = { headers: { 'cf-connecting-ip': '2.2.2.2' } } as any;
    const next = vi.fn();

    mw(a, respuesta(), next);
    mw(a, respuesta(), next);
    const bloqueada = respuesta();
    mw(a, bloqueada, next);
    expect(bloqueada.status).toHaveBeenCalledWith(429);
    expect(next).toHaveBeenCalledTimes(2);

    mw(b, respuesta(), next); // otro cliente no se ve afectado
    expect(next).toHaveBeenCalledTimes(3);

    t = 60_000;
    mw(a, respuesta(), next);
    expect(next).toHaveBeenCalledTimes(4);
  });
});

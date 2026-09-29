import { describe, expect, it } from 'vitest';
import { hashClave, verificarClave } from './claves';

describe('claves', () => {
  it('verifica la clave correcta y rechaza las demás', async () => {
    const h = await hashClave('una clave larga ñ');
    expect(h.startsWith('scrypt$')).toBe(true);
    expect(await verificarClave('una clave larga ñ', h)).toBe(true);
    expect(await verificarClave('una clave larga n', h)).toBe(false);
    expect(await verificarClave('x', 'formato-invalido')).toBe(false);
  });

  it('dos hashes de la misma clave son distintos (sal aleatoria)', async () => {
    expect(await hashClave('abc')).not.toBe(await hashClave('abc'));
  });
});

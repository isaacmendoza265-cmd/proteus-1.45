// Hash de contraseñas con scrypt (librería estándar de Node: sin módulos nativos que compilar en Alpine).
// Formato guardado: scrypt$N$r$p$sal$hash (base64url), para poder subir el coste sin romper las claves viejas.
import { randomBytes, scrypt as scryptCb, timingSafeEqual, type ScryptOptions } from 'crypto';

const scrypt = (clave: string, sal: Buffer, largo: number, opciones: ScryptOptions) =>
  new Promise<Buffer>((ok, mal) => scryptCb(clave, sal, largo, opciones, (e, k) => (e ? mal(e) : ok(k))));

const N = 2 ** 15;
const R = 8;
const P = 1;
const MEMORIA = 64 * 1024 * 1024; // scrypt necesita 128·N·r bytes = 32 MB

export async function hashClave(clave: string): Promise<string> {
  const sal = randomBytes(16);
  const hash = await scrypt(clave, sal, 32, { N, r: R, p: P, maxmem: MEMORIA });
  return ['scrypt', N, R, P, sal.toString('base64url'), hash.toString('base64url')].join('$');
}

export async function verificarClave(clave: string, guardado: string): Promise<boolean> {
  const [alg, n, r, p, sal, hash] = guardado.split('$');
  if (alg !== 'scrypt' || !sal || !hash) return false;
  const esperado = Buffer.from(hash, 'base64url');
  const calculado = await scrypt(clave, Buffer.from(sal, 'base64url'), esperado.length, {
    N: Number(n), r: Number(r), p: Number(p), maxmem: MEMORIA,
  });
  return timingSafeEqual(calculado, esperado);
}

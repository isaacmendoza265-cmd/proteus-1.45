/**
 * CI en local: los mismos pasos que .github/workflows/ci.yml, pero en paralelo y con caché, para no
 * esperar a GitHub en cada push.
 *
 * Uso:   npm run ci:local
 *
 * Base de pruebas: TEST_DATABASE_URL o, si no está, el cluster desechable del NVMe
 * (postgresql://matriarca@localhost:55433/proteus_test). Nunca apuntarlo a una base con datos reales:
 * las pruebas hacen TRUNCATE.
 *
 * Pasos: 1) migraciones (aplicar + comprobar que el esquema no tiene cambios sin migrar);
 *        2) en paralelo: tipos (tsc incremental), lint (eslint con caché), pruebas y build.
 * Medido el 2026-09-29 (Ryzen 5 3600): en serie y sin caché ~81 s, igual que GitHub (76-117 s).
 */
import { spawn } from 'node:child_process';

const BD = process.env.TEST_DATABASE_URL || 'postgresql://matriarca@localhost:55433/proteus_test';
const entorno = { ...process.env, DATABASE_URL: BD, TEST_DATABASE_URL: BD, FORCE_COLOR: '0' };

function paso(nombre, comando) {
  const inicio = Date.now();
  return new Promise((ok) => {
    // shell: true para que npx resuelva en Windows; los comandos son fijos, sin entrada externa
    const p = spawn(comando, { shell: true, env: entorno });
    let salida = '';
    p.stdout.on('data', (d) => (salida += d));
    p.stderr.on('data', (d) => (salida += d));
    p.on('close', (codigo) => {
      const s = ((Date.now() - inicio) / 1000).toFixed(1);
      console.log(`${codigo === 0 ? 'OK   ' : 'FALLO'} ${nombre.padEnd(12)} ${s.padStart(5)} s`);
      ok({ nombre, codigo, salida });
    });
  });
}

const inicio = Date.now();
const resultados = [
  await paso('migraciones', `npx prisma migrate deploy && npx prisma migrate diff --from-url "${BD}" --to-schema-datamodel prisma/schema.prisma --exit-code`),
];
if (resultados[0].codigo === 0) {
  resultados.push(...(await Promise.all([
    paso('tipos', 'npx tsc --noEmit -p . --incremental --tsBuildInfoFile node_modules/.cache/tsc.tsbuildinfo'),
    paso('lint', 'npx eslint . --cache --cache-location node_modules/.cache/eslint'),
    paso('pruebas', 'npx vitest run'),
    paso('build', 'npm run build'),
  ])));
}

const fallos = resultados.filter((r) => r.codigo !== 0);
for (const f of fallos) {
  const lineas = f.salida.replace(/\x1b\[[0-9;]*m/g, '').trim().split('\n');
  // Primero las líneas que dicen QUÉ falló (en una salida larga suelen quedar lejos del final), luego la cola
  const claves = lineas.filter((l) => /FAIL|×|✗|Error|error TS|timed out|Timeout|AssertionError|expected/.test(l)).slice(0, 40);
  console.log(`\n──── ${f.nombre} ────\n${claves.length ? `${claves.join('\n')}\n…\n` : ''}${lineas.slice(-25).join('\n')}`);
}
console.log(`\n${fallos.length ? `✗ ${fallos.length} paso(s) fallaron` : '✓ CI local en verde'} · ${((Date.now() - inicio) / 1000).toFixed(1)} s en total`);
process.exit(fallos.length ? 1 : 0);

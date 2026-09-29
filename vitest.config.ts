import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

// Pruebas de la lógica de servicios (sin navegador). Carga TEST_DATABASE_URL del .env: sin ella, las pruebas
// de integración con PostgreSQL (src/server/api.integracion.test.ts) se omiten en silencio.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
    env: loadEnv('test', process.cwd(), 'TEST_'),
    // Las pruebas de datos cargan la cartografía y los resultados completos (faseB, electionResults: 3-5 s solas). Con
    // `npm run ci:local` corren junto a tsc, eslint y el build, y el límite por defecto de 5 s las tumbaba al azar
    // (2 de 4 corridas el 29-sep-2026). 20 s sigue atrapando un bucle colgado.
    testTimeout: 20_000,
  },
});

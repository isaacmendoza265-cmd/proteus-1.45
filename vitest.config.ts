import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

// Pruebas de la lógica de servicios (sin navegador). Carga TEST_DATABASE_URL del .env: sin ella, las pruebas
// de integración con PostgreSQL (src/server/api.integracion.test.ts) se omiten en silencio.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
    env: loadEnv('test', process.cwd(), 'TEST_'),
  },
});

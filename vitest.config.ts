import { defineConfig } from 'vitest/config';

// Pruebas de la lógica de servicios (sin navegador).
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});

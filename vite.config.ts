import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // GEMINI_API_KEY ya no se inyecta en el bundle del cliente: todas las llamadas a Gemini pasan por
  // el proxy del servidor (server.ts), que lee la clave de sus propias variables de entorno. Nunca
  // definir aquí una clave de API para que no termine visible en el JS servido al navegador.
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});

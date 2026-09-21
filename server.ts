import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '15mb' }));

  // Helper para inicialización perezosa de GoogleGenAI
  let cachedAi: GoogleGenAI | null = null;
  function getGenAI(customApiKey?: string): GoogleGenAI {
    const key = customApiKey || process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY no está configurada en las variables de entorno del servidor.');
    }
    if (!customApiKey && cachedAi) {
      return cachedAi;
    }
    const client = new GoogleGenAI({
      apiKey: key,
    });
    if (!customApiKey) {
      cachedAi = client;
    }
    return client;
  }

  // Helper para ejecutar el bridge de Python del Subproyecto Gobernación
  const BRIDGE_SCRIPT = path.join(process.cwd(), 'scripts', 'gobernacion_bridge.py');
  async function runBridgeCommand(arg: string): Promise<any> {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);
    const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
    const { stdout, stderr } = await execAsync(`"${pythonCmd}" "${BRIDGE_SCRIPT}" ${arg}`, {
      maxBuffer: 15 * 1024 * 1024,
      encoding: 'utf-8'
    });
    if (stderr && stderr.trim()) {
      console.warn(`[Gobernación Bridge]: ${stderr.trim()}`);
    }
    return JSON.parse(stdout);
  }

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // ==========================================
  // RUTAS DEL SUBPROYECTO GOBERNACIÓN
  // ==========================================
  app.get('/api/gobernacion/status', async (_req, res) => {
    try {
      const status = await runBridgeCommand('--status');
      res.json({ success: true, ...status });
    } catch (err: any) {
      console.error('Error en /api/gobernacion/status:', err);
      res.status(500).json({ success: false, error: err.message || 'Error al obtener estado de Gobernación' });
    }
  });

  app.get('/api/gobernacion/latest-report', async (_req, res) => {
    try {
      const report = await runBridgeCommand('--get-latest');
      res.json({ success: true, report });
    } catch (err: any) {
      console.error('Error en /api/gobernacion/latest-report:', err);
      res.status(500).json({ success: false, error: err.message || 'Error al obtener último informe de Gobernación' });
    }
  });

  app.get('/api/gobernacion/objectives', async (_req, res) => {
    try {
      const objectives = await runBridgeCommand('--get-objectives');
      res.json({ success: true, objectives });
    } catch (err: any) {
      console.error('Error en /api/gobernacion/objectives:', err);
      res.status(500).json({ success: false, error: err.message || 'Error al obtener objetivos de monitoreo' });
    }
  });

  app.post('/api/gobernacion/run-cycle', async (_req, res) => {
    try {
      const result = await runBridgeCommand('--run-cycle');
      res.json(result);
    } catch (err: any) {
      console.error('Error en /api/gobernacion/run-cycle:', err);
      res.status(500).json({ success: false, error: err.message || 'Error al ejecutar ciclo de Gobernación' });
    }
  });

  // Antigravity Agent status
  app.get('/api/antigravity/status', (_req, res) => {
    const hasKey = !!process.env.GEMINI_API_KEY;
    res.json({
      ready: hasKey,
      hasKey,
      agent: 'antigravity-preview-05-2026',
      supportedAgents: ['antigravity-preview-05-2026', 'deep-research-preview-04-2026'],
      message: hasKey
        ? 'Servicio Antigravity Agent en línea y autenticado con API Key del servidor.'
        : 'Falta configurar GEMINI_API_KEY en las variables del entorno.',
    });
  });

  // Crear interacción con Antigravity (soporta Server-Sent Events o respuesta JSON síncrona)
  app.post('/api/antigravity/interactions', async (req, res) => {
    try {
      const {
        input,
        background,
        environment,
        stream = false,
        agent = 'antigravity-preview-05-2026',
      } = req.body;
      const customKey = req.headers['x-gemini-api-key'] as string | undefined;

      if (!input || typeof input !== 'string' || !input.trim()) {
        res.status(400).json({ error: "El campo 'input' es obligatorio." });
        return;
      }

      const ai = getGenAI(customKey);
      const effectiveEnvironment = environment || { type: 'remote' };
      const fullInput =
        background && typeof background === 'string' && background.trim()
          ? `[CONTEXTO TÉCNICO]:\n${background.trim()}\n\n[INSTRUCCIÓN/TAREA]:\n${input.trim()}`
          : input.trim();

      if (stream) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        if (typeof (res as any).flushHeaders === 'function') {
          (res as any).flushHeaders();
        }

        const interactionStream = await ai.interactions.create({
          agent,
          input: fullInput,
          environment: effectiveEnvironment,
          stream: true,
        });

        for await (const chunk of interactionStream) {
          res.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }
        res.write('data: [DONE]\n\n');
        res.end();
      } else {
        const interaction = await ai.interactions.create({
          agent,
          input: fullInput,
          environment: effectiveEnvironment,
          stream: false,
        });

        res.json({ success: true, interaction });
      }
    } catch (err: any) {
      console.error('Error en /api/antigravity/interactions:', err);
      const statusCode = err.status || err.statusCode || 500;
      if (!res.headersSent) {
        res.status(statusCode).json({
          error: err.message || 'Error al ejecutar el agente Antigravity.',
        });
      } else {
        res.write(`data: ${JSON.stringify({ error: err.message || 'Error durante el streaming.' })}\n\n`);
        res.end();
      }
    }
  });

  // Obtener estado / progreso de interacción Antigravity
  app.get('/api/antigravity/interactions/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const customKey = req.headers['x-gemini-api-key'] as string | undefined;
      const ai = getGenAI(customKey);

      const interaction = await ai.interactions.get(id);
      res.json({ success: true, interaction });
    } catch (err: any) {
      console.error('Error en GET /api/antigravity/interactions/:id:', err);
      res.status(err.status || 500).json({
        error: err.message || 'No se pudo obtener el estado de la interacción.',
      });
    }
  });

  // Cancelar interacción Antigravity
  app.post('/api/antigravity/interactions/:id/cancel', async (req, res) => {
    try {
      const { id } = req.params;
      const customKey = req.headers['x-gemini-api-key'] as string | undefined;
      const ai = getGenAI(customKey);

      await ai.interactions.cancel(id);
      res.json({ success: true, message: `Interacción ${id} cancelada exitosamente.` });
    } catch (err: any) {
      console.error('Error en POST /api/antigravity/interactions/:id/cancel:', err);
      res.status(err.status || 500).json({
        error: err.message || 'No se pudo cancelar la interacción.',
      });
    }
  });

  // Vite middleware para entorno de desarrollo
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

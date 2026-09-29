import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import fs from 'fs';
import os from 'os';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

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

  // Helper para ejecutar el bridge de Python del Subproyecto Gobernación.
  // Usa execFile (sin shell) con una lista cerrada de comandos, tiempo límite
  // y mensajes claros si Python no está instalado o la salida no es JSON.
  const BRIDGE_SCRIPT = path.join(process.cwd(), 'scripts', 'gobernacion_bridge.py');
  type BridgeCommand = '--status' | '--get-latest' | '--get-objectives' | '--run-cycle';
  async function runBridgeCommand(arg: BridgeCommand): Promise<any> {
    const { execFile } = await import('child_process');
    const { promisify } = await import('util');
    const execFileAsync = promisify(execFile);
    const pythonCmd = process.env.PYTHON_PATH || (process.platform === 'win32' ? 'python' : 'python3');
    const timeout = arg === '--run-cycle' ? 15 * 60_000 : 60_000;

    let stdout: string;
    let stderr: string;
    try {
      ({ stdout, stderr } = await execFileAsync(pythonCmd, [BRIDGE_SCRIPT, arg], {
        maxBuffer: 15 * 1024 * 1024,
        encoding: 'utf-8',
        timeout,
        windowsHide: true,
      }));
    } catch (err: any) {
      if (err?.code === 'ENOENT') {
        throw new Error(`No se encontró Python ("${pythonCmd}"). Instálalo o define PYTHON_PATH en .env.`);
      }
      if (err?.killed) {
        throw new Error(`El bridge de Gobernación superó el tiempo límite (${timeout / 1000} s) en ${arg}.`);
      }
      const detail = String(err?.stderr || err?.message || '').trim().slice(0, 500);
      throw new Error(`El bridge de Gobernación falló (${arg}): ${detail}`);
    }

    if (stderr && stderr.trim()) {
      console.warn(`[Gobernación Bridge]: ${stderr.trim()}`);
    }
    try {
      return JSON.parse(stdout);
    } catch {
      throw new Error(`El bridge de Gobernación devolvió una respuesta que no es JSON (${arg}).`);
    }
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

  // Generador de contenido del mapa (src/services/contentGeneratorService.ts). La clave de Gemini se
  // queda en el servidor; el cliente manda la instrucción y los datos del territorio.
  const MODELO_CONTENIDO = 'gemini-3.8-flash';
  app.post('/api/contenido/generar', async (req, res) => {
    try {
      const { sistema, instruccion } = req.body ?? {};
      if (typeof instruccion !== 'string' || !instruccion.trim()) {
        res.status(400).json({ error: "Falta la instrucción ('instruccion')." });
        return;
      }
      // El sistema incluye las reglas del piso 3 del marco metodológico (varios miles de caracteres)
      if (instruccion.length > 20_000 || (typeof sistema === 'string' && sistema.length > 15_000)) {
        res.status(400).json({ error: 'La instrucción es demasiado larga.' });
        return;
      }
      const ai = getGenAI(req.headers['x-gemini-api-key'] as string | undefined);
      const respuesta = await ai.models.generateContent({
        model: MODELO_CONTENIDO,
        contents: instruccion,
        config: typeof sistema === 'string' && sistema.trim() ? { systemInstruction: sistema } : undefined,
      });
      res.json({ texto: respuesta.text ?? '', modelo: MODELO_CONTENIDO });
    } catch (err: any) {
      console.error('Error en /api/contenido/generar:', err);
      // El SDK entrega el error de Google como JSON dentro del mensaje: se traduce a algo legible
      let status = Number(err.status) || 500;
      let detalle = String(err.message || '');
      try {
        const g = JSON.parse(detalle)?.error;
        if (g) { status = Number(g.code) || status; detalle = `${g.status ?? ''} ${g.message ?? ''}`.trim(); }
      } catch { /* el mensaje no era JSON */ }
      const motivo =
        status === 401 || status === 403
          ? 'Google rechazó la clave de Gemini del servidor (sin permiso). Revisa GEMINI_API_KEY en .env y que el proyecto de Google AI Studio tenga acceso a la API.'
          : status === 429
            ? 'Se agotó la cuota de Gemini. Intenta más tarde.'
            : 'No se pudo generar el contenido.';
      res.status(status).json({ error: `${motivo} (${status}${detalle ? `: ${detalle}` : ''})` });
    }
  });

  // Análisis de piezas (Ajustes › Identidad del candidato › Análisis de piezas). El cliente manda el libro de
  // reglas (sistema), la instrucción con la identidad y las mediciones, el esquema JSON y la pieza: un enlace
  // público de YouTube, un archivo pequeño en base64 o un archivo ya subido con /api/piezas/subir.
  const MODELO_PIEZAS = 'gemini-3.8-flash';
  const errorGemini = (err: any, contexto: string) => {
    let status = Number(err?.status) || 500;
    let detalle = String(err?.message || '');
    try {
      const g = JSON.parse(detalle)?.error;
      if (g) { status = Number(g.code) || status; detalle = `${g.status ?? ''} ${g.message ?? ''}`.trim(); }
    } catch { /* el mensaje no era JSON */ }
    const motivo =
      status === 401 || status === 403
        ? 'Google rechazó la clave de Gemini del servidor (sin permiso). Revisa GEMINI_API_KEY en .env y que el proyecto de Google AI Studio tenga acceso a la API.'
        : status === 429 ? 'Se agotó la cuota de Gemini. Intenta más tarde.' : contexto;
    return { status, error: `${motivo} (${status}${detalle ? `: ${detalle}` : ''})` };
  };

  // Archivos grandes (video): se reciben en binario y se suben a la Files API de Gemini
  app.post('/api/piezas/subir', express.raw({ type: 'application/octet-stream', limit: '2gb' }), async (req, res) => {
    const mimeType = String(req.headers['x-mime-type'] || '');
    if (!/^(video|audio|image)\//.test(mimeType) || !Buffer.isBuffer(req.body) || !req.body.length) {
      res.status(400).json({ error: 'Falta el archivo o su tipo (video, audio o imagen).' });
      return;
    }
    const tmp = path.join(os.tmpdir(), `proteus-pieza-${Date.now()}`);
    try {
      fs.writeFileSync(tmp, req.body);
      const ai = getGenAI(req.headers['x-gemini-api-key'] as string | undefined);
      let f = await ai.files.upload({ file: tmp, config: { mimeType } });
      // Gemini procesa el video antes de poder usarlo
      for (let i = 0; i < 90 && f.state === 'PROCESSING' && f.name; i++) {
        await new Promise((r) => setTimeout(r, 2000));
        f = await ai.files.get({ name: f.name });
      }
      if (f.state !== 'ACTIVE') throw Object.assign(new Error(`El archivo quedó en estado ${f.state}.`), { status: 502 });
      res.json({ uri: f.uri, mimeType: f.mimeType ?? mimeType, nombre: f.name });
    } catch (err: any) {
      console.error('Error en /api/piezas/subir:', err);
      const e = errorGemini(err, 'No se pudo subir el archivo a Gemini.');
      res.status(e.status).json({ error: e.error });
    } finally {
      fs.rm(tmp, { force: true }, () => undefined);
    }
  });

  app.post('/api/piezas/analizar', async (req, res) => {
    try {
      const { sistema, instruccion, esquema, youtubeUrl, archivo, subido } = req.body ?? {};
      if (typeof sistema !== 'string' || typeof instruccion !== 'string' || !esquema || typeof esquema !== 'object') {
        res.status(400).json({ error: 'Faltan el libro de reglas, la instrucción o el esquema.' });
        return;
      }
      if (sistema.length > 40_000 || instruccion.length > 20_000) {
        res.status(400).json({ error: 'La instrucción es demasiado larga.' });
        return;
      }
      const partes: any[] = [];
      if (typeof youtubeUrl === 'string' && youtubeUrl.trim()) {
        if (!/^https:\/\/(www\.|m\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/)[\w-]{6,}/.test(youtubeUrl.trim())) {
          res.status(400).json({ error: 'El enlace debe ser un video público de YouTube.' });
          return;
        }
        partes.push({ fileData: { fileUri: youtubeUrl.trim(), mimeType: 'video/*' } });
      } else if (subido && typeof subido.uri === 'string') {
        partes.push({ fileData: { fileUri: subido.uri, mimeType: String(subido.mimeType || 'video/mp4') } });
      } else if (archivo && typeof archivo.base64 === 'string' && /^(image|video|audio)\//.test(String(archivo.mimeType))) {
        partes.push({ inlineData: { data: archivo.base64, mimeType: archivo.mimeType } });
      } else if (!instruccion.includes('TEXTO DE LA PIEZA')) {
        res.status(400).json({ error: 'Falta la pieza: enlace de YouTube, archivo o texto.' });
        return;
      }
      partes.push({ text: instruccion });
      const ai = getGenAI(req.headers['x-gemini-api-key'] as string | undefined);
      const r = await ai.models.generateContent({
        model: MODELO_PIEZAS,
        contents: [{ role: 'user', parts: partes }],
        config: { systemInstruction: sistema, responseMimeType: 'application/json', responseJsonSchema: esquema, temperature: 0.2 },
      });
      const texto = r.text ?? '';
      let analisis: unknown;
      try { analisis = JSON.parse(texto); } catch {
        res.status(502).json({ error: 'Gemini no devolvió un JSON válido.', texto });
        return;
      }
      res.json({ analisis, modelo: MODELO_PIEZAS, uso: r.usageMetadata ?? null });
    } catch (err: any) {
      console.error('Error en /api/piezas/analizar:', err);
      const e = errorGemini(err, 'No se pudo analizar la pieza.');
      res.status(e.status).json({ error: e.error });
    }
  });

  // Generador genérico de Gemini para el cliente (municipios, subregiones, perfiles de candidato,
  // análisis de video, PDFs, etc.). Sustituye las instanciaciones de GoogleGenAI que antes vivían en
  // el navegador con la clave incrustada en el bundle: ahora el cliente solo manda model/contents/config
  // y la clave nunca sale del servidor.
  const MODELO_GENERICO = 'gemini-3.8-flash';
  app.post('/api/gemini/generar', async (req, res) => {
    try {
      const { model, contents, config } = req.body ?? {};
      if (!contents) {
        res.status(400).json({ error: "Falta 'contents'." });
        return;
      }
      if (JSON.stringify(req.body).length > 14_000_000) {
        res.status(400).json({ error: 'La solicitud es demasiado grande (máx. ~14 MB; para video usa /api/piezas/subir).' });
        return;
      }
      const ai = getGenAI(req.headers['x-gemini-api-key'] as string | undefined);
      const respuesta = await ai.models.generateContent({
        model: typeof model === 'string' && model ? model : MODELO_GENERICO,
        contents,
        config,
      });
      res.json({
        text: respuesta.text ?? '',
        candidates: respuesta.candidates ?? null,
        usageMetadata: respuesta.usageMetadata ?? null,
      });
    } catch (err: any) {
      console.error('Error en /api/gemini/generar:', err);
      const e = errorGemini(err, 'No se pudo generar contenido con Gemini.');
      res.status(e.status).json({ error: e.error });
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

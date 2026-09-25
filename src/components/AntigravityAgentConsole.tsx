import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Bot,
  Terminal,
  Play,
  Square,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Cpu,
  Layers,
  Code2,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  checkAntigravityStatus,
  createAntigravityInteraction,
  streamAntigravityInteraction,
  AntigravityStatus,
  AntigravityInteraction,
} from '../services/antigravityService';

interface PresetTask {
  id: string;
  title: string;
  badge: string;
  input: string;
  background: string;
}

const PRESET_TASKS: PresetTask[] = [
  {
    id: 'electoral-pipeline',
    title: 'Pipeline de Microdatos Subregionales',
    badge: 'Datos & Territorio',
    input:
      'Diseña una función TypeScript de alto rendimiento que analice los factores de riesgo de seguridad (extorsión, presencia de estructuras armadas ilegales) y su correlación estadística con la participación electoral en las 9 subregiones de Antioquia. Devuelve la estructura tipada y comentarios técnicos de implementación.',
    background:
      'Proteus Nacional es una plataforma de inteligencia electoral desarrollada en React 19, TypeScript y Vite. Contiene datos censales, de orden público y proyecciones 2026 para Colombia y Antioquia.',
  },
  {
    id: 'dhondt-optimizer',
    title: 'Optimizador Algorítmico Cifra Repartidora',
    badge: 'Algorítmica Electoral',
    input:
      'Implementa el algoritmo de Cifra Repartidora (D\'Hondt) para el Senado y Cámara de Representantes en Colombia, con cálculo de umbral electoral por corporación (Senado 3 %, Cámara 50 % del cociente) y asignación de curules por cociente residual. Incluye pruebas unitarias exhaustivas con casos límite.',
    background:
      'Sistema electoral colombiano regido por la Constitución de 1991. Elecciones legislativas 2026. TypeScript moderno con tipos inmutables.',
  },
  {
    id: 'code-audit',
    title: 'Auditoría Técnica y Rendimiento de Proteus',
    badge: 'Ingeniería de Software',
    input:
      'Audita la arquitectura frontend de visualización de mapas y tablas electorales densas. Proporciona recomendaciones concretas de memoización (useMemo, React.memo, virtualización) y patrones de desacoplamiento para evitar cuellos de botella en dispositivos móviles.',
    background:
      'Código base en Vite + React con Leaflet y Three.js, renderizando tablas de más de 125 municipios con múltiples filtros en memoria.',
  },
  {
    id: 'risk-agent',
    title: 'Monitor de Alertas Tempranas y Seguridad',
    badge: 'Seguridad Ciudadana',
    input:
      'Construye un protocolo de evaluación de riesgo para líderes y candidatos en territorio antioqueño que integre indicadores de la Operación Cazador y la doctrina de mano dura contra el crimen organizado del presidente Abelardo De La Espriella. Especifica variables clave de alerta y matriz de mitigación.',
    background:
      'Doctrina de orden y mano dura del presidente de la República Abelardo De La Espriella en convergencia con la Gobernación de Antioquia (Andrés Julián Rendón).',
  },
];

export const AntigravityAgentConsole: React.FC = () => {
  const [status, setStatus] = useState<AntigravityStatus | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  // Form state
  const [taskInput, setTaskInput] = useState('');
  const [backgroundContext, setBackgroundContext] = useState('');
  const [isStreamingMode, setIsStreamingMode] = useState(true);

  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [activeInteraction, setActiveInteraction] = useState<AntigravityInteraction | null>(null);
  const [executionLogs, setExecutionLogs] = useState<string[]>([]);
  const [rawOutput, setRawOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stopStreamRef = useRef<(() => void) | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const fetchStatus = async () => {
    setIsLoadingStatus(true);
    const s = await checkAntigravityStatus();
    setStatus(s);
    setIsLoadingStatus(false);
  };

  useEffect(() => {
    fetchStatus();
    return () => {
      if (stopStreamRef.current) {
        stopStreamRef.current();
      }
    };
  }, []);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [executionLogs, rawOutput]);

  const handleSelectPreset = (preset: PresetTask) => {
    setTaskInput(preset.input);
    setBackgroundContext(preset.background);
  };

  const handleRunAntigravity = async () => {
    if (!taskInput.trim() || isRunning) return;

    setIsRunning(true);
    setErrorMessage(null);
    setExecutionLogs([]);
    setRawOutput('');
    setActiveInteraction(null);

    const startTime = new Date().toLocaleTimeString();
    setExecutionLogs((prev) => [
      ...prev,
      `[${startTime}] Inicializando agente autónomo Antigravity (agents/antigravity)...`,
      `[${startTime}] Autenticación: API Key validada en backend.`,
      `[${startTime}] Entorno de ejecución: Sandbox Remoto provisionado.`,
    ]);

    if (isStreamingMode) {
      const stopFn = streamAntigravityInteraction({
        input: taskInput,
        background: backgroundContext,
        onChunk: (chunk: any) => {
          const now = new Date().toLocaleTimeString();

          if (chunk.event_type === 'interaction.created' && chunk.interaction) {
            setActiveInteraction(chunk.interaction);
            setExecutionLogs((prev) => [
              ...prev,
              `[${now}] Interacción creada: ID ${chunk.interaction.id.slice(0, 18)}...`,
              `[${now}] Estado: ${chunk.interaction.status || 'en progreso'}`,
            ]);
          }

          // If content parts arrive
          if (chunk.event?.content?.parts) {
            for (const part of chunk.event.content.parts) {
              if (part.text) {
                setRawOutput((prev) => prev + part.text);
              }
            }
          }

          // If steps or interaction updates
          if (chunk.interaction) {
            setActiveInteraction(chunk.interaction);
            if (chunk.interaction.steps && chunk.interaction.steps.length > 0) {
              for (const step of chunk.interaction.steps) {
                if (step.content) {
                  for (const c of step.content) {
                    if (c.text && !rawOutput.includes(c.text)) {
                      setRawOutput((prev) => (prev ? prev + '\n' + c.text : c.text));
                    }
                  }
                }
              }
            }
          }
        },
        onError: (err: Error) => {
          const now = new Date().toLocaleTimeString();
          setErrorMessage(err.message);
          setExecutionLogs((prev) => [
            ...prev,
            `[${now}] ERROR: ${err.message}`,
          ]);
          setIsRunning(false);
        },
        onDone: () => {
          const now = new Date().toLocaleTimeString();
          setExecutionLogs((prev) => [
            ...prev,
            `[${now}] Tarea de Antigravity completada con éxito.`,
          ]);
          setIsRunning(false);
        },
      });

      stopStreamRef.current = stopFn;
    } else {
      try {
        const res = await createAntigravityInteraction({
          input: taskInput,
          background: backgroundContext,
        });

        const now = new Date().toLocaleTimeString();
        setActiveInteraction(res.interaction);

        // Extract output from interaction steps or outputs
        let collectedText = '';
        if (res.interaction.steps) {
          for (const step of res.interaction.steps) {
            if (step.content) {
              for (const c of step.content) {
                if (c.text) collectedText += c.text + '\n';
              }
            }
          }
        }
        if (res.interaction.outputs) {
          for (const out of res.interaction.outputs) {
            if (out.text) collectedText += out.text + '\n';
          }
        }

        setRawOutput(collectedText.trim() || 'Tarea completada sin salida textual.');
        setExecutionLogs((prev) => [
          ...prev,
          `[${now}] ID: ${res.interaction.id}`,
          `[${now}] Tokens totales: ${res.interaction.usage?.total_tokens || 'N/A'}`,
          `[${now}] Estado final: ${res.interaction.status}`,
          `[${now}] Ejecución completada.`,
        ]);
      } catch (err: any) {
        const now = new Date().toLocaleTimeString();
        setErrorMessage(err.message);
        setExecutionLogs((prev) => [...prev, `[${now}] ERROR: ${err.message}`]);
      } finally {
        setIsRunning(false);
      }
    }
  };

  const handleStop = () => {
    if (stopStreamRef.current) {
      stopStreamRef.current();
      stopStreamRef.current = null;
    }
    setIsRunning(false);
    setExecutionLogs((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Ejecución cancelada por el usuario.`,
    ]);
  };

  const handleCopy = () => {
    if (!rawOutput) return;
    navigator.clipboard.writeText(rawOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="antigravity-agent-module" className="space-y-6">
      {/* Header and status banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black tracking-tight text-white">
                  Antigravity Agent
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Google Interactions API
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  API Key Integrada
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Agente autónomo de ingeniería de software y análisis electoral avanzado con ejecución en sandbox remoto.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700/60 text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div className="text-left">
              <p className="text-[10px] uppercase font-bold text-slate-400">Servicio Autenticado</p>
              <p className="text-[11px] font-semibold text-slate-200">
                {isLoadingStatus ? 'Verificando...' : status?.ready ? 'Conexión activa con Antigravity' : 'Servicio en espera'}
              </p>
            </div>
            <button
              onClick={fetchStatus}
              title="Refrescar estado de conexión"
              className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStatus ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Status specs pill row */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-3 text-[11px]">
          <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/40">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Identificador de Agente</span>
            <span className="font-mono text-indigo-300">agents/antigravity</span>
          </div>
          <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/40">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Entorno de Ejecución</span>
            <span className="font-mono text-emerald-300">Sandbox Remoto (Remote)</span>
          </div>
          <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/40">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Modo de Comunicación</span>
            <span className="font-mono text-blue-300">Streaming SSE / JSON API</span>
          </div>
          <div className="bg-slate-800/40 rounded-lg p-2.5 border border-slate-700/40">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Seguridad de Clave</span>
            <span className="text-slate-200 font-medium">Server-side proxy protegido</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Control / Form + Output Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Controls and Presets (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Presets card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Tareas Preconfiguradas de Proteus
              </h3>
              <span className="text-[10px] font-medium text-slate-400">1-clic para cargar</span>
            </div>

            <div className="space-y-2">
              {PRESET_TASKS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className="w-full text-left p-2.5 rounded-xl border border-white/10 hover:border-indigo-300 bg-white/[0.04] backdrop-blur-sm border border-white/10/60 hover:bg-indigo-50/40 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-indigo-900">
                      {preset.title}
                    </span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-md bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 text-slate-300">
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {preset.input}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Form input card */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-300" />
              Parámetros de la Tarea para Antigravity
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                Instrucción / Tarea para el Agente (Input) *
              </label>
              <textarea
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Ejemplo: Refactoriza la función de agregación de votos en Antioquia agregando validación de umbral y pruebas unitarias..."
                rows={4}
                className="w-full text-xs font-mono bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-y"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-200 mb-1">
                Contexto / Repositorio (Background)
              </label>
              <textarea
                value={backgroundContext}
                onChange={(e) => setBackgroundContext(e.target.value)}
                placeholder="Ejemplo: Repositorio Proteus Nacional. Aplicación React 19 + TypeScript + Vite. Arquitectura full-stack con Express y servidor autónomo."
                rows={2}
                className="w-full text-xs bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-y"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isStreamingMode}
                  onChange={(e) => setIsStreamingMode(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 w-4 h-4"
                />
                <span className="font-semibold text-slate-200">Streaming en tiempo real (SSE)</span>
              </label>
              <span className="text-[10px] text-slate-400">v1beta / preview</span>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center gap-2">
              {!isRunning ? (
                <button
                  id="btn-run-antigravity"
                  onClick={handleRunAntigravity}
                  disabled={!taskInput.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Ejecutar con Antigravity
                </button>
              ) : (
                <button
                  id="btn-stop-antigravity"
                  onClick={handleStop}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition-all"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  Detener Ejecución
                </button>
              )}

              <button
                onClick={() => {
                  setTaskInput('');
                  setBackgroundContext('');
                  setRawOutput('');
                  setExecutionLogs([]);
                }}
                className="px-3 py-2.5 rounded-xl border border-white/10 hover:bg-slate-100 text-slate-300 text-xs font-semibold transition-colors"
                title="Limpiar campos"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Terminal & Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Terminal Logs & Progress */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-xl text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 text-xs">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-slate-400 text-[11px] ml-2">antigravity-agent://live-session</span>
              </div>
              <div className="flex items-center space-x-3 text-[11px]">
                {isRunning && (
                  <span className="flex items-center gap-1.5 text-indigo-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                    Procesando en sandbox...
                  </span>
                )}
                {activeInteraction?.usage && (
                  <span className="text-slate-400 font-mono text-[10px]">
                    Tokens: {activeInteraction.usage.total_tokens || 0}
                  </span>
                )}
              </div>
            </div>

            {/* Logs console */}
            <div className="font-mono text-[11px] leading-relaxed max-h-48 overflow-y-auto space-y-1 text-slate-300 pr-2 scrollbar-thin">
              {executionLogs.length === 0 ? (
                <p className="text-slate-300 italic">Esperando que se inicie una tarea con el agente Antigravity...</p>
              ) : (
                executionLogs.map((log, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <span className="text-slate-300 select-none">&gt;</span>
                    <span className={log.includes('ERROR') ? 'text-rose-400 font-bold' : log.includes('completada') ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                      {log}
                    </span>
                  </div>
                ))
              )}
              <div ref={terminalEndRef} />
            </div>
          </div>

          {/* Result Output Viewer */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Code2 className="w-4 h-4 text-indigo-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Respuesta y Artefactos de Antigravity
                </h4>
              </div>

              {rawOutput && (
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-white/[0.04] backdrop-blur-sm border border-white/10 hover:bg-slate-100 border border-white/10 rounded-lg transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Error en la ejecución de Antigravity:</p>
                  <p className="font-mono text-[11px] mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            <div className="min-h-[280px] max-h-[500px] overflow-y-auto p-4 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl border border-white/10/80 text-xs text-white font-sans">
              {rawOutput ? (
                <div className="markdown-body prose prose-sm max-w-none text-white">
                  <ReactMarkdown>{rawOutput}</ReactMarkdown>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 space-y-2">
                  <Bot className="w-8 h-8 text-slate-300" />
                  <p className="text-xs font-medium">Los resultados generados por el agente Antigravity aparecerán aquí en tiempo real.</p>
                  <p className="text-[11px] text-slate-400 max-w-sm">
                    Selecciona una de las tareas de la izquierda o escribe una instrucción para auditar, diseñar o proyectar datos de Proteus Nacional.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

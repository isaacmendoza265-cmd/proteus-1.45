import React, { useEffect, useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Terminal, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Search, 
  Brain, 
  Megaphone, 
  Video, 
  HardDrive,
  CheckCircle2,
  Layers,
  Send,
  RefreshCw,
  Clock,
  Radio
} from 'lucide-react';
import { PROTEUS_AGENT_TEAM, ProteusAgentDefinition } from '../../data/agentic/proteusAgentTeam';
import { municipalRepository } from '../../services/municipalRepositoryService';
import { callGeminiApi, formatAiError } from '../../services/geminiService';
import { seleccionDeDane } from '../../services/ia/macrofuentes';
import { getMunicipalCensus } from '../../services/electoralCensusService';
import { seleccionDeEstado, useActiveTerritory } from '../../services/activeTerritoryContextService';
import { territorioFicha } from '../../services/territoryProfileService';
import { CandidateProfile } from '../../types/candidateProfile';

interface AgentTeamConsoleViewProps {
  candidateProfile: CandidateProfile;
}

export const AgentTeamConsoleView: React.FC<AgentTeamConsoleViewProps> = ({
  candidateProfile
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(PROTEUS_AGENT_TEAM[0].id);
  // El municipio sale del territorio activo (lo elegido en el mapa) y se puede cambiar aquí
  const { activeTerritory } = useActiveTerritory();
  const municipioActivo = () => {
    const id = seleccionDeEstado(activeTerritory).muniId;
    return id ? territorioFicha(id)?.nombre ?? null : null;
  };
  const [targetMuniQuery, setTargetMuniQuery] = useState(() => municipioActivo() ?? 'Medellín');
  useEffect(() => {
    const m = municipioActivo();
    if (m) setTargetMuniQuery(m);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTerritory.updatedAt]);
  const [agentTaskPrompt, setAgentTaskPrompt] = useState('Analiza los 3 principales dolores comunitarios y genera una propuesta prioritaria.');
  const [isRunningTask, setIsRunningTask] = useState(false);
  const [agentExecutionLog, setAgentExecutionLog] = useState<string | null>(null);

  const activeAgent = PROTEUS_AGENT_TEAM.find((a) => a.id === selectedAgentId) || PROTEUS_AGENT_TEAM[0];

  const handleExecuteAgentTask = async () => {
    setIsRunningTask(true);
    setAgentExecutionLog(null);

    try {
      const muniContext = municipalRepository.buildContextPrompt(targetMuniQuery);
      const dane = getMunicipalCensus(targetMuniQuery)?.dane ?? null;
      // Tarea según el rol: redacción para el director creativo, evaluación para multimedia, análisis para el resto
      const tarea = activeAgent.category === 'Creación de Contenido' ? 'redactar' : activeAgent.category === 'Analítica Multimedia' ? 'evaluar' : activeAgent.category === 'Sincronización & Search' ? 'investigar' : 'analizar';

      const systemInstruction = `Eres ${activeAgent.name} (${activeAgent.codeName}), integrante de la cuadrilla de agentes autónomos de Proyecto Proteus.
Misión asignada: ${activeAgent.mission}
${muniContext}

Candidato activo: ${candidateProfile.nombre} (${candidateProfile.afiliacionPartidista || 'partido sin definir en el perfil'}). Su perfil completo está en la macrofuente B.`;

      const response = await callGeminiApi({
        promptText: `[MISIÓN OPERATIVA SOLICITADA POR EL USUARIO]:\n${agentTaskPrompt}\n\nEjecuta tu rol de ${activeAgent.name} entregando un resultado ejecutivo y estructurado. Usa solo cifras de los datos (macrofuente A) o de la búsqueda con su fuente; no inventes.`,
        systemInstruction,
        useSearch: true,
        proteus: { tarea, ...(dane ? { seleccion: seleccionDeDane(dane) } : {}) },
      });

      setAgentExecutionLog(response);
    } catch (e: any) {
      setAgentExecutionLog(`No se pudo ejecutar ${activeAgent.codeName}: ${formatAiError(e)}`);
    } finally {
      setIsRunningTask(false);
    }
  };

  return (
    <div className="proteus-civico space-y-4 pb-12">
      {/* Cabecera */}
      <div className="p-5 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5" />
                Cuadrilla de Agentes IA Especializados
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[var(--c-border)] text-[var(--c-muted)]">
                5 roles
              </span>
            </div>
            <h1 className="font-titulo text-2xl lg:text-[28px] leading-tight font-medium flex items-center gap-3">
              <span>Revisores: equipo de agentes</span>
            </h1>
            <p className="text-[var(--c-muted)] text-xs sm:text-sm mt-1 max-w-3xl">
              Equipo de agentes autónomos para investigar, filtrar e interpretar información territorial, segmentar votantes, redactar discursos y auditar la semiótica del candidato.
            </p>
          </div>

          {/* Métricas rápidas */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-[var(--c-sunken)] text-right">
              <div className="text-xs uppercase text-[var(--c-muted)] font-bold">Cómo funciona</div>
              <div className="text-sm font-bold mt-0.5">5 roles para Gemini</div>
              <div className="text-xs text-[var(--c-muted)]">Cada rol es una instrucción; no son procesos en marcha</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cuadrícula de los 5 agentes */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {PROTEUS_AGENT_TEAM.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setSelectedAgentId(agent.id)}
            aria-pressed={selectedAgentId === agent.id}
            className={`p-3 rounded-xl text-left flex flex-col justify-between space-y-3 border ${
              selectedAgentId === agent.id
                ? 'bg-[var(--c-accent-soft)] border-[var(--c-accent)]'
                : 'bg-[var(--c-surface)] border-[var(--c-border)]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-[var(--c-accent)] flex items-center justify-center text-white">
                  {agent.id === 'agent-sentinel-territory' && <Search className="w-4 h-4" />}
                  {agent.id === 'agent-strat-segment' && <Brain className="w-4 h-4" />}
                  {agent.id === 'agent-creative-director' && <Megaphone className="w-4 h-4" />}
                  {agent.id === 'agent-media-vision' && <Video className="w-4 h-4" />}
                  {agent.id === 'agent-sync-nexus' && <HardDrive className="w-4 h-4" />}
                </div>
              </div>
              <div className="mt-3">
                <div className="text-xs text-[var(--c-accent)] font-bold uppercase truncate">
                  {agent.codeName}
                </div>
                <div className="text-xs font-bold text-[var(--c-ink)] mt-0.5 leading-tight line-clamp-2">
                  {agent.name}
                </div>
              </div>
            </div>
            <div className="text-xs text-[var(--c-muted)] font-medium line-clamp-2 pt-2 border-t border-[var(--c-border)]">
              {agent.category}
            </div>
          </button>
        ))}
      </div>

      {/* Espacio de trabajo del agente seleccionado */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Perfil y configuración del agente */}
        <div className="lg:col-span-4 p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] space-y-4">
          <div className="flex items-center gap-3 border-b border-[var(--c-border)] pb-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--c-accent)] flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase text-[var(--c-accent)] font-bold">
                {activeAgent.codeName}
              </div>
              <h3 className="text-sm font-bold text-[var(--c-ink)]">
                {activeAgent.name}
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="text-xs uppercase text-[var(--c-muted)] font-bold">Misión Principal:</div>
              <p className="text-[var(--c-ink)] mt-1 leading-relaxed">
                {activeAgent.mission}
              </p>
            </div>

            <div>
              <div className="text-xs uppercase text-[var(--c-muted)] font-bold">Responsabilidades:</div>
              <ul className="list-disc pl-4 space-y-1 text-[var(--c-muted)] mt-1 text-xs">
                {activeAgent.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase text-[var(--c-muted)] font-bold">Dominios Asignados:</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {activeAgent.assignedDataDomains.map((d, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-[var(--c-sunken)] text-xs text-[var(--c-muted)]">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase text-[var(--c-muted)] font-bold">Herramientas descritas (rol de referencia; la ejecución es una sola llamada a Gemini con búsqueda):</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {activeAgent.toolsAndAPIs.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-[var(--c-info-soft)] text-xs text-[var(--c-info)] font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Consola de ejecución del agente */}
        <div className="lg:col-span-8 p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--c-border)] pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[var(--c-accent)]" />
                <h3 className="text-xs uppercase text-[var(--c-ink)] font-bold tracking-wide">
                  Consola de Ejecución · {activeAgent.codeName}
                </h3>
              </div>
              <span className="text-xs text-[var(--c-ok)] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--c-ok)]" />
                Pronto para Ejecutar
              </span>
            </div>

            {/* Entradas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--c-muted)]">Municipio de Referencia:</label>
                <input
                  type="text"
                  value={targetMuniQuery}
                  onChange={(e) => setTargetMuniQuery(e.target.value)}
                  placeholder="Ej. Rionegro, Apartadó, Medellín..."
                  className="w-full px-3 py-2 text-xs font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[var(--c-muted)]">Candidato Vinculado:</label>
                <div className="px-3 py-2 rounded-lg bg-[var(--c-sunken)] text-[var(--c-ink)] text-xs font-bold">
                  {candidateProfile.nombre} ({candidateProfile.afiliacionPartidista || 'Independiente'})
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--c-muted)]">Instrucción / Misión Específica:</label>
              <textarea
                value={agentTaskPrompt}
                onChange={(e) => setAgentTaskPrompt(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-xs font-medium resize-none"
              />
            </div>

            <button
              onClick={handleExecuteAgentTask}
              disabled={isRunningTask}
              className="w-full min-h-9 px-3 rounded-lg bg-[var(--c-accent)] text-white font-semibold text-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isRunningTask ? 'animate-spin' : ''}`} />
              <span>{isRunningTask ? 'Agente Procesando Misión...' : `Ejecutar Misión con ${activeAgent.codeName}`}</span>
            </button>

            {/* Registro del resultado de ejecución */}
            <div className="mt-4">
              <div className="text-xs uppercase text-[var(--c-muted)] font-bold mb-1">
                Salida de la Ejecución:
              </div>
              <div className="p-4 rounded-xl bg-[var(--c-sunken)] min-h-[220px] max-h-[350px] overflow-y-auto text-xs text-[var(--c-ink)] leading-relaxed font-mono whitespace-pre-line">
                {isRunningTask ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-2 text-center text-[var(--c-muted)]">
                    <RefreshCw className="w-6 h-6 text-[var(--c-accent)] animate-spin" />
                    <span>El agente {activeAgent.codeName} está consultando el Repositorio Proteus y cruzando fuentes con Gemini...</span>
                  </div>
                ) : agentExecutionLog ? (
                  agentExecutionLog
                ) : (
                  <div className="text-[var(--c-muted)] py-12 text-center">
                    Selecciona un agente y haz clic en "Ejecutar Misión" para ver su análisis especializado.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-xs text-[var(--c-muted)] border-t border-[var(--c-border)] pt-2 flex items-center justify-between">
            <span>Arquitectura Multi-Agente Autónoma Proteus</span>
            <span>Grounding: DANE + Registraduría + CIEF + Gemini Vision</span>
          </div>
        </div>
      </div>
    </div>
  );
};

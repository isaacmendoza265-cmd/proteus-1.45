import React, { useState } from 'react';
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
import { callGeminiApi } from '../../services/geminiService';
import { CandidateProfile } from '../../components/CandidateProfileManager';

interface AgentTeamConsoleViewProps {
  candidateProfile: CandidateProfile;
}

export const AgentTeamConsoleView: React.FC<AgentTeamConsoleViewProps> = ({
  candidateProfile
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(PROTEUS_AGENT_TEAM[0].id);
  const [targetMuniQuery, setTargetMuniQuery] = useState('Medellín');
  const [agentTaskPrompt, setAgentTaskPrompt] = useState('Analiza los 3 principales dolores comunitarios y genera una propuesta prioritaria.');
  const [isRunningTask, setIsRunningTask] = useState(false);
  const [agentExecutionLog, setAgentExecutionLog] = useState<string | null>(null);

  const activeAgent = PROTEUS_AGENT_TEAM.find((a) => a.id === selectedAgentId) || PROTEUS_AGENT_TEAM[0];

  const handleExecuteAgentTask = async () => {
    setIsRunningTask(true);
    setAgentExecutionLog(null);

    try {
      const muniContext = municipalRepository.buildContextPrompt(targetMuniQuery);

      const systemInstruction = `Eres ${activeAgent.name} (${activeAgent.codeName}), integrante de la cuadrilla de agentes autónomos de Proyecto Proteus.
Misión asignada: ${activeAgent.mission}
${muniContext}

Candidato Activo: ${candidateProfile.nombre} (${candidateProfile.afiliacionPartidista || 'Candidato Líder'}).
Enfoque Narrativo: ${candidateProfile.tonoNarrativo || 'Firmeza y honestidad'}.`;

      const response = await callGeminiApi({
        promptText: `[MISIÓN OPERATIVA SOLICITADA POR EL USUARIO]:\n${agentTaskPrompt}\n\nEjecuta tu rol de ${activeAgent.name} entregando un resultado ejecutivo, estructurado y con cifras locales concretas.`,
        systemInstruction,
        useSearch: true
      });

      setAgentExecutionLog(response);
    } catch (e: any) {
      setAgentExecutionLog(`Error en la ejecución del agente ${activeAgent.codeName}. Por favor verifica la conexión.`);
    } finally {
      setIsRunningTask(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-950/40 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.4)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-gradient-to-r from-emerald-400/20 via-sky-400/20 to-purple-500/30 text-emerald-300 border border-emerald-400/50 shadow-[0_0_12px_rgba(52,211,153,0.3)] flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
                Cuadrilla de Agentes IA Especializados
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                5 Agentes Autónomos
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Revisores: equipo de agentes</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
              Equipo de agentes autónomos para investigar, filtrar e interpretar información territorial, segmentar votantes, redactar discursos y auditar la semiótica del candidato.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-2xl bg-white/05 border border-white/15 backdrop-blur-xl text-right">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Estado de Cuadrilla</div>
              <div className="text-sm font-black text-emerald-400 mt-0.5 flex items-center gap-1.5 justify-end">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                5 Agentes Operativos
              </div>
              <div className="text-[10px] text-slate-400 font-mono">Consola Proteus 1.2</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 5 Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {PROTEUS_AGENT_TEAM.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setSelectedAgentId(agent.id)}
            className={`p-4 rounded-3xl text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between space-y-3 ${
              selectedAgentId === agent.id
                ? 'bg-gradient-to-br from-white/15 to-white/05 border-2 border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] scale-[1.02]'
                : 'bg-slate-950/30 hover:bg-white/10 border border-white/15'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${agent.avatarColor} flex items-center justify-center text-white shadow-md`}>
                  {agent.id === 'agent-sentinel-territory' && <Search className="w-4 h-4" />}
                  {agent.id === 'agent-strat-segment' && <Brain className="w-4 h-4" />}
                  {agent.id === 'agent-creative-director' && <Megaphone className="w-4 h-4" />}
                  {agent.id === 'agent-media-vision' && <Video className="w-4 h-4" />}
                  {agent.id === 'agent-sync-nexus' && <HardDrive className="w-4 h-4" />}
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-bold">
                  v{agent.version}
                </span>
              </div>
              <div className="mt-3">
                <div className="text-[10px] font-mono text-sky-400 font-bold uppercase truncate">
                  {agent.codeName}
                </div>
                <div className="text-xs font-black text-white mt-0.5 leading-tight line-clamp-2">
                  {agent.name}
                </div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-medium line-clamp-2 pt-2 border-t border-white/10">
              {agent.category}
            </div>
          </button>
        ))}
      </div>

      {/* 3. Selected Agent Detailed Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Agent Profile & Config */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.4)] space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${activeAgent.avatarColor} flex items-center justify-center text-white shadow-lg`}>
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-sky-400 font-bold">
                {activeAgent.codeName}
              </div>
              <h3 className="text-sm font-black text-white">
                {activeAgent.name}
              </h3>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Misión Principal:</div>
              <p className="text-slate-200 mt-1 leading-relaxed">
                {activeAgent.mission}
              </p>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Responsabilidades:</div>
              <ul className="list-disc pl-4 space-y-1 text-slate-300 mt-1 text-[11px]">
                {activeAgent.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Dominios Asignados:</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {activeAgent.assignedDataDomains.map((d, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-white/05 border border-white/10 text-[10px] text-slate-300">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Herramientas & APIs:</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {activeAgent.toolsAndAPIs.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-sky-500/15 border border-sky-400/30 text-[10px] text-sky-300 font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Agent Execution Console */}
        <div className="lg:col-span-8 p-5 rounded-3xl bg-slate-950/45 backdrop-blur-3xl border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-mono uppercase text-white font-bold tracking-wider">
                  Consola de Ejecución • {activeAgent.codeName}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Pronto para Ejecutar
              </span>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Municipio de Referencia:</label>
                <input
                  type="text"
                  value={targetMuniQuery}
                  onChange={(e) => setTargetMuniQuery(e.target.value)}
                  placeholder="Ej. Rionegro, Apartadó, Medellín..."
                  className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-medium focus:outline-none focus:border-sky-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Candidato Vinculado:</label>
                <div className="px-3 py-2 rounded-xl bg-black/30 border border-white/10 text-amber-300 text-xs font-bold">
                  {candidateProfile.nombre} ({candidateProfile.afiliacionPartidista || 'Independiente'})
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Instrucción / Misión Específica:</label>
              <textarea
                value={agentTaskPrompt}
                onChange={(e) => setAgentTaskPrompt(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-medium focus:outline-none focus:border-sky-400 resize-none"
              />
            </div>

            <button
              onClick={handleExecuteAgentTask}
              disabled={isRunningTask}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-600 hover:from-emerald-400 hover:to-sky-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(52,211,153,0.3)] transition disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 text-emerald-200 ${isRunningTask ? 'animate-spin' : ''}`} />
              <span>{isRunningTask ? 'Agente Procesando Misión...' : `Ejecutar Misión con ${activeAgent.codeName}`}</span>
            </button>

            {/* Execution Result Log */}
            <div className="mt-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">
                Salida de la Ejecución:
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 min-h-[220px] max-h-[350px] overflow-y-auto text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-line">
                {isRunningTask ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-2 text-center text-slate-400">
                    <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin" />
                    <span>El agente {activeAgent.codeName} está consultando el Repositorio Proteus y cruzando fuentes con Gemini...</span>
                  </div>
                ) : agentExecutionLog ? (
                  agentExecutionLog
                ) : (
                  <div className="text-slate-500 py-12 text-center">
                    Selecciona un agente y haz clic en "Ejecutar Misión" para ver su análisis especializado.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 border-t border-white/10 pt-2 flex items-center justify-between">
            <span>Arquitectura Multi-Agente Autónoma Proteus</span>
            <span>Grounding: DANE + Registraduría + CIEF + Gemini Vision</span>
          </div>
        </div>
      </div>
    </div>
  );
};

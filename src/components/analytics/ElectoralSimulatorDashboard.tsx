import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  Sliders, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  HelpCircle,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  ArrowRight,
  MapPin,
  Target,
  Copy,
  Check,
  BrainCircuit,
  Compass,
  FileDown,
  Loader2,
  Zap
} from 'lucide-react';
import { 
  ElectoralSimulatorService, 
  ANTIOQUIA_CAMARA_2026_BASELINE, 
  SimulatorParty 
} from '../../services/electoralSimulatorService';
import { callGeminiApi, formatAiError } from '../../services/geminiService';
import { TOTAL_CENSUS, formatCensusShort } from '../../services/electoralCensusService';

export const ElectoralSimulatorDashboard: React.FC = () => {
  const [turnoutPercent, setTurnoutPercent] = useState<number>(53.5);
  const [blankVotesPercent, setBlankVotesPercent] = useState<number>(6.5);
  const [parties, setParties] = useState<SimulatorParty[]>(ANTIOQUIA_CAMARA_2026_BASELINE.parties);
  const [activeCircumscription, setActiveCircumscription] = useState<'antioquia-camara' | 'nacional-senado'>('antioquia-camara');

  // AI Tactical Plan State
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [tacticalPlan, setTacticalPlan] = useState<string | null>(null);
  const [copiedPlan, setCopiedPlan] = useState<boolean>(false);
  const [tacticalError, setTacticalError] = useState<string | null>(null);

  const totalSeats = activeCircumscription === 'antioquia-camara' ? 17 : 100;
  // Censo oficial: Cámara = Antioquia; Senado = nacional + exterior (los votos del exterior cuentan para Senado)
  const census = activeCircumscription === 'antioquia-camara' ? ANTIOQUIA_CAMARA_2026_BASELINE.census : TOTAL_CENSUS.total;

  const simulation = useMemo(() => {
    return ElectoralSimulatorService.runSimulation(
      census,
      turnoutPercent,
      blankVotesPercent,
      parties,
      totalSeats,
      activeCircumscription === 'antioquia-camara' ? 'camara' : 'senado'
    );
  }, [census, turnoutPercent, blankVotesPercent, parties, totalSeats, activeCircumscription]);

  // Subregional Target Allocation Breakdown
  const subregionalBreakdown = useMemo(() => {
    const deficit = simulation.marginalSeatInfo.votesNeededForRunnerUp;
    if (activeCircumscription === 'antioquia-camara') {
      return [
        {
          id: 'aburra',
          name: 'Valle de Aburrá',
          share: 48,
          targetVotes: Math.max(50, Math.round(deficit * 0.48)),
          keyMunis: 'Medellín, Bello, Itagüí, Envigado',
          focus: 'Voto urbano, clases medias, jóvenes y comerciantes contra la extorsión',
          badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/30'
        },
        {
          id: 'oriente',
          name: 'Oriente Antioqueño',
          share: 24,
          targetVotes: Math.max(30, Math.round(deficit * 0.24)),
          keyMunis: 'Rionegro, Marinilla, Carmen de Viboral, La Ceja',
          focus: 'Agroindustria, microempresas, defensa del orden y familias',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
        },
        {
          id: 'uraba',
          name: 'Urabá Antioqueño',
          share: 15,
          targetVotes: Math.max(20, Math.round(deficit * 0.15)),
          keyMunis: 'Apartadó, Turbo, Carepa, Chigorodó',
          focus: 'Comunidades portuarias, agroplataneras, empleo y seguridad territorial',
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30'
        },
        {
          id: 'norte-occidente',
          name: 'Norte y Occidente',
          share: 8,
          targetVotes: Math.max(10, Math.round(deficit * 0.08)),
          keyMunis: 'Santa Fe de Antioquia, Yarumal, Santa Rosa de Osos',
          focus: 'Cuenca lechera, comercio tradicional y turismo regional',
          badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30'
        },
        {
          id: 'suroeste',
          name: 'Suroeste Antioqueño',
          share: 5,
          targetVotes: Math.max(10, Math.round(deficit * 0.05)),
          keyMunis: 'Andes, Ciudad Bolívar, Jericó, Fredonia',
          focus: 'Caficultores, cooperativas agrícolas y arraigo municipal',
          badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/30'
        }
      ];
    } else {
      return [
        {
          id: 'bogota',
          name: 'Bogotá D.C. & Cundinamarca',
          share: 26,
          targetVotes: Math.max(100, Math.round(deficit * 0.26)),
          keyMunis: 'Bogotá D.C., Soacha, Chía, Zipaquirá',
          focus: 'Voto de opinión, clases medias, seguridad y movilidad',
          badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-400/30'
        },
        {
          id: 'antioquia',
          name: 'Antioquia & Eje Cafetero',
          share: 22,
          targetVotes: Math.max(80, Math.round(deficit * 0.22)),
          keyMunis: 'Medellín, Manizales, Pereira, Armenia',
          focus: 'Base institucional, defensa productiva y reactivación económica',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
        },
        {
          id: 'caribe',
          name: 'Región Caribe',
          share: 20,
          targetVotes: Math.max(80, Math.round(deficit * 0.20)),
          keyMunis: 'Barranquilla, Cartagena, Santa Marta, Montería',
          focus: 'Costos de energía, servicios públicos y liderazgos cívicos',
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30'
        },
        {
          id: 'pacifico',
          name: 'Valle del Cauca & Pacífico',
          share: 16,
          targetVotes: Math.max(60, Math.round(deficit * 0.16)),
          keyMunis: 'Cali, Buenaventura, Palmira, Buga',
          focus: 'Seguridad ciudadana, empleo juvenil e inclusión productiva',
          badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30'
        },
        {
          id: 'santanderes',
          name: 'Santanderes & Llanos',
          share: 16,
          targetVotes: Math.max(60, Math.round(deficit * 0.16)),
          keyMunis: 'Bucaramanga, Cúcuta, Villavicencio, Yopal',
          focus: 'Frontera, hidrocarburos, agroindustria y orden público',
          badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/30'
        }
      ];
    }
  }, [simulation.marginalSeatInfo.votesNeededForRunnerUp, activeCircumscription]);

  const handlePartyVoteChange = (id: string, newVotes: number) => {
    setParties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, baseVotes: Math.max(0, newVotes) } : p))
    );
  };

  const handleResetDefaults = () => {
    setTurnoutPercent(53.5);
    setBlankVotesPercent(6.5);
    setParties(ANTIOQUIA_CAMARA_2026_BASELINE.parties);
    setTacticalPlan(null);
    setTacticalError(null);
  };

  const handleGenerateTacticalPlan = async () => {
    setIsGeneratingPlan(true);
    setTacticalError(null);
    setCopiedPlan(false);

    try {
      const territoryName = activeCircumscription === 'antioquia-camara' 
        ? 'Cámara de Antioquia (17 Curules en Disputa)' 
        : 'Senado Nacional (100 Curules en Disputa)';
      
      const subregionsSummary = subregionalBreakdown
        .map((s) => `- ${s.name}: Meta de ${s.targetVotes.toLocaleString()} votos (${s.share}%). Focos: ${s.keyMunis}. Perfil: ${s.focus}`)
        .join('\n');

      const prompt = `Actúa como Director General de Estrategia Electoral y Operaciones Territoriales de Proyecto Proteus.

[PARÁMETROS MATEMÁTICOS DE LA SIMULACIÓN ELECTORAL D'HONDT]:
- Circunscripción: ${territoryName}
- Censo Electoral: ${census.toLocaleString()} ciudadanos
- Participación Proyectada: ${simulation.turnoutPercentage}% (${simulation.totalVotesCast.toLocaleString()} sufragantes)
- Umbral Legal Constitucional (${simulation.thresholdRule}): ${simulation.thresholdVotes.toLocaleString()} votos válidos
- Cifra Repartidora Proyectada: ${simulation.cifraRepartidora.toLocaleString()} votos
- Último Escaño Asignado (Curul #${totalSeats}): Retenido por "${simulation.marginalSeatInfo.lastSeatPartyName}" (Cociente: ${simulation.marginalSeatInfo.lastSeatQuotient.toLocaleString()})
- Perseguidor Inmediato: "${simulation.marginalSeatInfo.runnerUpPartyName}"
- DÉFICIT CRÍTICO PARA ARREBATAR O BLINDAR LA CURUL: ${simulation.marginalSeatInfo.votesNeededForRunnerUp.toLocaleString()} VOTOS EXACTOS

[DISTRIBUCIÓN SUBREGIONAL DE LA META DE VOTOS]:
${subregionsSummary}

[CANDIDATO Y EQUIPO]:
- Candidato Líder: Isaac Mendoza
- Aplicativo: Proyecto Proteus 1.2 (Inteligencia Territorial y Micro-segmentación)

Diseña un PLAN DE ACCIÓN ELECTORAL DE CHOQUE PARA CONQUISTAR LA CURUL MARGINAL estructurado en 4 secciones concretas y accionables:
1. TERRITORIALIZACIÓN DE METAS Y PUESTOS CLAVE:
   Cómo capturar los ${simulation.marginalSeatInfo.votesNeededForRunnerUp.toLocaleString()} votos adicionales desglosados en las subregiones clave, identificando dónde está la menor resistencia.
2. ESTRATEGIA DE CAPTACIÓN DE VOTO BLANDO E INDECISOS:
   Tácticas de contacto directo persona a persona, redes barriales y liderazgo comunal para convertir indecisos en votos marcados efectivos.
3. MATRIZ DE MENSAJE SEGÚN SUBREGIÓN (PERSUASIÓN COGNITIVA PA-003):
   Diferenciación del mensaje por subregión (Seguridad y extorsión vs Oportunidades y empleo vs Apoyo al campo).
4. CRONOGRAMA DE CHOQUE PARA LOS ÚLTIMOS 21 DÍAS Y DÍA D:
   Plan semanal hasta el Día D con despliegue de testigos electorales para blindar el conteo en mesas y formularios E-14.`;

      const response = await callGeminiApi({
        promptText: prompt,
        systemInstruction: 'Eres el Director de Estrategia Electoral de Proteus. Redacta planes tácticos rigurosos, matemáticamente anclados, ejecutables en territorio y sin generalidades vacías.',
        useSearch: true
      });

      setTacticalPlan(response);
    } catch (err: any) {
      setTacticalError(formatAiError(err));
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const handleCopyPlan = () => {
    if (!tacticalPlan) return;
    navigator.clipboard.writeText(tacticalPlan);
    setCopiedPlan(true);
    setTimeout(() => setCopiedPlan(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn text-white">
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-950/40 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.4)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-gradient-to-r from-blue-500/20 via-sky-400/20 to-emerald-400/20 text-sky-300 border border-sky-400/50 shadow-[0_0_12px_rgba(56,189,248,0.3)] flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-sky-400" />
                Motor D'Hondt
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                {totalSeats} Curules en Disputa
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>Simulador D'Hondt, umbral y curul marginal</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
              Cálculo matemático de asignación de escaños (Art. 263 C.P.). Proyecta umbrales legales, cifra repartidora y la cantidad exacta de votos adicionales requeridos para ganar o blindar una curul.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleResetDefaults}
              className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Base</span>
            </button>
          </div>
        </div>

        {/* Circunscription Selector */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveCircumscription('antioquia-camara')}
            className={`px-4 py-2 rounded-2xl transition flex items-center gap-2 ${
              activeCircumscription === 'antioquia-camara'
                ? 'bg-sky-500/30 text-white border border-sky-400/60 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'text-slate-400 hover:text-white bg-white/05 hover:bg-white/10'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Cámara de Antioquia (17 Curules • Censo: {formatCensusShort(ANTIOQUIA_CAMARA_2026_BASELINE.census)})</span>
          </button>
          <button
            onClick={() => setActiveCircumscription('nacional-senado')}
            className={`px-4 py-2 rounded-2xl transition flex items-center gap-2 ${
              activeCircumscription === 'nacional-senado'
                ? 'bg-sky-500/30 text-white border border-sky-400/60 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                : 'text-slate-400 hover:text-white bg-white/05 hover:bg-white/10'
            }`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Senado Nacional (100 Curules • Censo: {formatCensusShort(TOTAL_CENSUS.total)})</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Votantes Proyectados</div>
          <div className="text-xl font-black text-sky-300 font-mono mt-1">
            {simulation.totalVotesCast.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
            Participación: {simulation.turnoutPercentage}%
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15">
          <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Votos Válidos Reales</div>
          <div className="text-xl font-black text-emerald-300 font-mono mt-1">
            {simulation.totalValidVotes.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
            Blanco: {simulation.blankVotes.toLocaleString()} ({blankVotesPercent}%)
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-amber-400/30">
          <div className="text-[10px] font-mono text-amber-400 uppercase font-bold">Umbral Electoral ({simulation.thresholdPercentage.toLocaleString('es-CO', { maximumFractionDigits: 2 })}%)</div>
          <div className="text-xl font-black text-amber-300 font-mono mt-1">
            {simulation.thresholdVotes.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
            {simulation.thresholdRule}
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-purple-400/30">
          <div className="text-[10px] font-mono text-purple-400 uppercase font-bold">Cifra Repartidora</div>
          <div className="text-xl font-black text-purple-300 font-mono mt-1">
            {simulation.cifraRepartidora.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
            Cociente de la Curul #{totalSeats}
          </div>
        </div>
      </div>

      {/* 3. Tactical Marginal Seat Alert Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/15 via-slate-950/70 to-sky-500/15 border border-amber-400/40 backdrop-blur-3xl shadow-[0_10px_30px_rgba(245,158,11,0.15)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/40 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                Inteligencia Táctica • La Curul Marginal #{totalSeats}
              </div>
              <h3 className="text-sm font-black text-white mt-0.5">
                La última curul la tiene actualmente: <span className="text-sky-300">{simulation.marginalSeatInfo.lastSeatPartyName}</span> (Cociente: {simulation.marginalSeatInfo.lastSeatQuotient.toLocaleString()})
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                El perseguidor más cercano es <strong className="text-white">{simulation.marginalSeatInfo.runnerUpPartyName}</strong>. Requiere exactamente <span className="px-2 py-0.5 rounded-lg bg-amber-500/30 text-amber-200 font-mono font-bold">+{simulation.marginalSeatInfo.votesNeededForRunnerUp.toLocaleString()} votos adicionales</span> para arrebatar ese último escaño.
              </p>
            </div>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-black/40 border border-white/15 text-right shrink-0">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Diferencia Crítica</div>
            <div className="text-lg font-black text-amber-300 font-mono">
              {simulation.marginalSeatInfo.votesNeededForRunnerUp.toLocaleString()} votos
            </div>
          </div>
        </div>
      </div>

      {/* 3.1 Subregional Target Allocation Matrix (Protocolo PA-001) */}
      <div className="p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-sky-400" />
              Territorialización del déficit marginal
            </span>
            <h3 className="text-sm font-black text-white mt-0.5">
              Matriz de Asignación de Cuotas de Voto por Subregión
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-300 bg-white/05 px-3 py-1 rounded-xl border border-white/10">
            Meta Global: <strong className="text-amber-300">+{simulation.marginalSeatInfo.votesNeededForRunnerUp.toLocaleString()} votos</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {subregionalBreakdown.map((sub) => (
            <div
              key={sub.id}
              className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 transition space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-white truncate">{sub.name}</span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border ${sub.badgeColor}`}>
                    {sub.share}%
                  </span>
                </div>
                <div className="text-lg font-mono font-black text-amber-300 mt-1">
                  +{sub.targetVotes.toLocaleString()}
                  <span className="text-[10px] font-normal text-slate-400 ml-1">votos</span>
                </div>
                <div className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                  <span className="text-slate-400 font-semibold">Focos:</span> {sub.keyMunis}
                </div>
              </div>
              <div className="text-[10px] text-slate-400 border-t border-white/10 pt-1.5 leading-tight">
                {sub.focus}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3.2 AI Tactical Plan Generator (Powered by Gemini 3.8 Flash) */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-950/60 to-purple-950/40 backdrop-blur-3xl border border-indigo-400/30 shadow-[0_15px_40px_rgba(99,102,241,0.15)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 shrink-0">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                <span>Motor de Inteligencia Táctica • Gemini 3.8 Flash</span>
                <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] border border-emerald-400/30 font-mono">Activo</span>
              </div>
              <h3 className="text-base font-black text-white mt-0.5">
                Plan Operativo de Conquista Territorial para Isaac Mendoza
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl mt-0.5">
                Genera al instante un plan de choque con micro-metas de votación, argumentos de persuasión cognitiva y cronograma de despliegue territorial para conquistar los <strong className="text-amber-300">+{simulation.marginalSeatInfo.votesNeededForRunnerUp.toLocaleString()} votos</strong> faltantes.
              </p>
            </div>
          </div>

          <button
            onClick={handleGenerateTacticalPlan}
            disabled={isGeneratingPlan}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 hover:from-indigo-400 hover:to-emerald-400 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-all transform hover:scale-[1.02] active:scale-98 disabled:opacity-50 shrink-0"
          >
            {isGeneratingPlan ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Analizando Simulación con IA...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>Generar Plan Táctico con IA</span>
              </>
            )}
          </button>
        </div>

        {tacticalError && (
          <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-400/30 text-rose-200 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{tacticalError}</span>
          </div>
        )}

        {tacticalPlan && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                Plan Operativo Desplegable Generado
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyPlan}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 hover:text-white transition flex items-center gap-1.5 text-xs font-bold"
                >
                  {copiedPlan ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPlan ? 'Copiado' : 'Copiar Plan'}</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/15 text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed max-h-[450px] overflow-y-auto font-sans">
              {tacticalPlan}
            </div>
          </div>
        )}
      </div>

      {/* 4. Visual Seat Distribution Bar */}
      <div className="p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            Distribución Visual de las {totalSeats} Curules
          </span>
          <span className="text-slate-400 font-mono text-[11px]">
            {simulation.results.filter((r) => r.seatsWon > 0).length} Listas con Representación
          </span>
        </div>

        {/* Color segmented bar */}
        <div className="w-full h-8 rounded-2xl bg-black/50 p-1 flex overflow-hidden border border-white/20 gap-0.5">
          {simulation.results
            .filter((r) => r.seatsWon > 0)
            .map((r) => (
              <div
                key={r.partyId}
                style={{
                  width: `${(r.seatsWon / totalSeats) * 100}%`,
                  backgroundColor: r.color
                }}
                className="h-full rounded-lg flex items-center justify-center text-[10px] font-mono font-black text-white shadow-sm transition-all hover:opacity-90"
                title={`${r.partyName}: ${r.seatsWon} curules (${((r.seatsWon / totalSeats) * 100).toFixed(1)}%)`}
              >
                {r.seatsWon > 0 && `${r.shortName} (${r.seatsWon})`}
              </div>
            ))}
        </div>
      </div>

      {/* 5. Sliders & Interactive Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Sliders: Macro Variables */}
        <div className="lg:col-span-5 p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15 space-y-5">
          <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            Variables de Participación y Voto Blanco
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-300">Participación Electoral Estimada:</span>
              <span className="text-sky-300 font-mono font-black">{turnoutPercent}%</span>
            </div>
            <input
              type="range"
              min={40}
              max={65}
              step={0.5}
              value={turnoutPercent}
              onChange={(e) => setTurnoutPercent(parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg bg-white/20 accent-sky-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Baja (40%)</span>
              <span>Histórica (53.5%)</span>
              <span>Alta (65%)</span>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-300">Voto en Blanco Proyectado:</span>
              <span className="text-amber-300 font-mono font-black">{blankVotesPercent}%</span>
            </div>
            <input
              type="range"
              min={2}
              max={15}
              step={0.5}
              value={blankVotesPercent}
              onChange={(e) => setBlankVotesPercent(parseFloat(e.target.value))}
              className="w-full h-2 rounded-lg bg-white/20 accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>Mínimo (2%)</span>
              <span>Promedio (6.5%)</span>
              <span>Pico de Protesta (15%)</span>
            </div>
          </div>

          {/* Party vote custom adjustment sliders */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Ajuste de Votación Estimada por Lista:
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {parties.map((p) => (
                <div key={p.id} className="p-2.5 rounded-2xl bg-white/05 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200 flex items-center gap-1.5 truncate">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                      <span className="truncate">{p.name}</span>
                    </span>
                    <span className="font-mono text-slate-300 text-[11px] font-black shrink-0">
                      {p.baseVotes.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20000}
                    max={600000}
                    step={5000}
                    value={p.baseVotes}
                    onChange={(e) => handlePartyVoteChange(p.id, parseInt(e.target.value))}
                    className="w-full h-1.5 rounded-lg bg-white/20 accent-sky-400 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Matrix Table */}
        <div className="lg:col-span-7 p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              Matriz de Resultados Oficiales Proyectados
            </h3>
            <span className="text-[10px] font-mono text-slate-400">
              Cifra Repartidora: {simulation.cifraRepartidora.toLocaleString()}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/15 text-[10px] font-mono uppercase text-slate-400 font-bold">
                  <th className="py-2.5 px-3">Partido / Lista</th>
                  <th className="py-2.5 px-2 text-right">Votos Est.</th>
                  <th className="py-2.5 px-2 text-right">%</th>
                  <th className="py-2.5 px-2 text-center">Umbral</th>
                  <th className="py-2.5 px-3 text-right">Curules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 font-medium">
                {simulation.results.map((r) => (
                  <tr
                    key={r.partyId}
                    className={`hover:bg-white/05 transition ${
                      r.seatsWon > 0 ? 'bg-white/[0.02]' : 'opacity-60'
                    }`}
                  >
                    <td className="py-2.5 px-3 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                      <div className="truncate">
                        <div className="font-bold text-white truncate">{r.partyName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{r.shortName}</div>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-200">
                      {r.totalVotes.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-300">
                      {r.votePercentage}%
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      {r.aboveThreshold ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-400/30">
                          <CheckCircle2 className="w-3 h-3" /> Pasa
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold border border-rose-400/30">
                          <XCircle className="w-3 h-3" /> No
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {r.seatsWon > 0 ? (
                        <span className="px-2.5 py-1 rounded-xl bg-sky-500/30 text-white font-mono font-black text-sm border border-sky-400/50 shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                          {r.seatsWon}
                        </span>
                      ) : (
                        <span className="text-slate-500 font-mono">0</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

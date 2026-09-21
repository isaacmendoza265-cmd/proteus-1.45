import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Sparkles, 
  Send, 
  Download, 
  Copy, 
  Check, 
  Share2, 
  Video, 
  Radio, 
  Megaphone, 
  MapPin, 
  Users, 
  Palette, 
  Save, 
  HelpCircle,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { municipalRepository } from '../../services/municipalRepositoryService';
import { CandidateProfile } from '../../components/CandidateProfileManager';
import { callGeminiApi } from '../../services/geminiService';

interface CampaignContentDirectorViewProps {
  candidateProfile: CandidateProfile;
  onSaveToDrive?: (title: string, data: any) => void;
}

type ContentFormat = 
  | 'video-short'
  | 'speech-plaza'
  | 'whatsapp-community'
  | 'press-statement'
  | 'debate-rebuttal';

export type CognitiveFraming = 'gain-hope' | 'loss-protection' | 'balanced';

export const CampaignContentDirectorView: React.FC<CampaignContentDirectorViewProps> = ({
  candidateProfile,
  onSaveToDrive
}) => {
  const allMunicipalities = useMemo(() => municipalRepository.getAll(), []);
  const [selectedMuniId, setSelectedMuniId] = useState<string>('mpio-05001'); // Medellín default
  const [targetAudience, setTargetAudience] = useState<string>('Jóvenes y Nuevos Votantes (18-28)');
  const [contentFormat, setContentFormat] = useState<ContentFormat>('video-short');
  const [toneOfVoice, setToneOfVoice] = useState<string>('Firmeza, Autoridad y Esperanza');
  const [cognitiveFraming, setCognitiveFraming] = useState<CognitiveFraming>('gain-hope');
  const [keyTopic, setKeyTopic] = useState<string>('Seguridad, empleo y freno a la extorsión');
  
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedBrief, setGeneratedBrief] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const currentMuni = useMemo(() => {
    return municipalRepository.getMunicipality(selectedMuniId) || allMunicipalities[0];
  }, [selectedMuniId, allMunicipalities]);

  const handleGenerateBrief = async () => {
    setIsGenerating(true);
    setCopied(false);
    setSavedSuccess(false);

    try {
      const muniContext = municipalRepository.buildContextPrompt(currentMuni.id);

      const framingDescription = 
        cognitiveFraming === 'gain-hope'
          ? 'ENFOQUE DE GANANCIA Y ESPERANZA (Prospect Theory - Gain Framing): Centrado en oportunidades de futuro, crecimiento económico, bienestar familiar, optimismo movilizador y conquistas colectivas.'
          : cognitiveFraming === 'loss-protection'
          ? 'ENFOQUE DE PÉRDIDA Y PROTECCIÓN (Prospect Theory - Loss Aversion Framing): Centrado en lo que las familias pueden perder si gana la improvisación (seguridad, empleo, libertad, patrimonio), apelando a la necesidad de blindaje y defensa firme.'
          : 'ENFOQUE DE EQUILIBRIO PROSPECTIVO (Diagnóstico de Riesgo + Vía de Esperanza): Contraste cognitivo inmediato entre el costo de la inacción (pérdida) y la certeza del alivio y la victoria con Isaac Mendoza (ganancia).';

      const prompt = `Actúa como Director Creativo y Estratega de Campaña Principal de Proyecto Proteus.
${muniContext}

[PERFIL DEL CANDIDATO]:
- Nombre: ${candidateProfile.nombre}
- Cargo de aspiración: ${candidateProfile.afiliacionPartidista || 'Candidato Líder'}
- Tono narrativo de base: ${candidateProfile.tonoNarrativo || 'Firme y transparente'}
- Estilo comunicativo: ${candidateProfile.estiloComunicacion || 'Asertivo y directo'}
- Fototipo y Colorimetría sugerida: ${candidateProfile.colorimetryData?.estacionCromatica || 'Contraste Alto'}

[REQUERIMIENTO DEL BRIEF]:
- Territorio: ${currentMuni.name} (${currentMuni.subregion}, Antioquia)
- Formato: ${contentFormat}
- Audiencia Objetivo: ${targetAudience}
- Tono Solicitado: ${toneOfVoice}
- Eje Temático: ${keyTopic}
- [PROTOCOLO PA-003 • ENFOQUE DE PERSUASIÓN COGNITIVA]: ${framingDescription}

Diseña un BRIEF ESTRATÉGICO DE ALTO IMPACTO estructurado exactamente en los siguientes puntos:
1. OBJETIVO DE LA PIEZA: Qué queremos que el votante piense, sienta y haga tras escucharla (calibrado según el sesgo cognitivo seleccionado: ${cognitiveFraming}).
2. EL GANCHO (HOOK DE LOS PRIMEROS 3-5 SEGUNDOS): Frase demoledora e irresistible que active el encuadre cognitivo.
3. DATOS TERRITORIALES CONCRETOS: Cita al menos 2 cifras reales del municipio (población, censo, NBI o problemáticas locales de acueducto/seguridad) para demostrar arraigo.
4. NÚCLEO DEL MENSAJE / PROPUESTA VALOR: La solución clara que ${candidateProfile.nombre} propone sin rodeos.
5. LLAMADO A LA ACCIÓN (CTA): Convocatoria específica (unirse al equipo de WhatsApp, asistir al evento o compartir el video).
6. RECOMENDACIONES DE PUESTA EN ESCENA & SEMIÓTICA:
   - Vestuario y color sugerido (acorde a su colorimetría).
   - Lenguaje corporal y encuadre recomendado.
7. PREGUNTA INCÓMODA DE PRENSA / OPOSICIÓN Y CÓMO NOQUEARLA: Una objeción dura y la respuesta perfecta en 20 segundos.`;

      const response = await callGeminiApi({
        promptText: prompt,
        systemInstruction: 'Eres el Director de Creación de Contenido de Proteus. Redacta briefs estratégicos accionables, profesionales, sin lugares comunes y con estricto anclaje territorial.',
        useSearch: true
      });

      setGeneratedBrief(response);
    } catch (err: any) {
      setGeneratedBrief('Error al generar el brief con la inteligencia de Gemini. Por favor verifica la conexión e intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedBrief) return;
    navigator.clipboard.writeText(generatedBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleExportPdf = () => {
    if (!generatedBrief) return;
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Header Background
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, 210, 32, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PROTEUS • DIRECTOR DE CONTENIDO & BRIEFS', 14, 15);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`CANDIDATO: ${candidateProfile.nombre.toUpperCase()} | MUNICIPIO: ${currentMuni.name.toUpperCase()} | FECHA: ${new Date().toLocaleDateString()}`, 14, 23);

    doc.setTextColor(30, 41, 59);
    doc.setFontSize(10);
    const splitText = doc.splitTextToSize(generatedBrief, 182);
    doc.text(splitText, 14, 42);

    doc.save(`Brief_${candidateProfile.nombre.replace(/\s+/g, '_')}_${currentMuni.name}_${Date.now()}.pdf`);
  };

  const handleSaveDrive = () => {
    if (!generatedBrief || !onSaveToDrive) return;
    onSaveToDrive(`Brief_${candidateProfile.nombre}_${currentMuni.name}_${contentFormat}`, {
      candidato: candidateProfile.nombre,
      municipio: currentMuni.name,
      formato: contentFormat,
      audiencia: targetAudience,
      contenido: generatedBrief,
      fecha: new Date().toISOString()
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-950/40 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.4)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-gradient-to-r from-amber-400/20 via-sky-400/20 to-purple-500/30 text-amber-300 border border-amber-400/50 shadow-[0_0_12px_rgba(251,191,36,0.3)] flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                Propósito 3: Director de Creación de Contenido
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                Briefs Estratégicos Personalizados
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>DIRECTOR DE CONTENIDO & DISCURSOS DE CAMPAÑA</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
              Genera briefs estratégicos, discursos de plaza, guiones para TikTok y respuestas a crisis. Cruza la información del <strong className="text-sky-300">Repositorio Municipal</strong> con los pilares del candidato <strong className="text-amber-300">{candidateProfile.nombre}</strong>.
            </p>
          </div>

          {/* Active Candidate Badge */}
          <div className="shrink-0 p-3 rounded-2xl bg-white/05 border border-white/15 backdrop-blur-xl">
            <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Candidato Activo</div>
            <div className="text-sm font-black text-amber-300 mt-0.5">{candidateProfile.nombre}</div>
            <div className="text-[10px] text-slate-400">{candidateProfile.afiliacionPartidista || 'Proyecto Político'}</div>
          </div>
        </div>
      </div>

      {/* 2. Control Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.4)] space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Parámetros del Brief Estratégico
            </h2>

            {/* Territory Selector */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                Municipio o Territorio Objetivo:
              </label>
              <select
                value={selectedMuniId}
                onChange={(e) => setSelectedMuniId(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/20 text-white text-xs font-bold focus:outline-none focus:border-sky-400 backdrop-blur-xl"
              >
                {allMunicipalities.map((m) => (
                  <option key={m.id} value={m.id} className="bg-slate-900 text-white">
                    {m.name} ({m.subregion}) - Censo: {m.electoralCensus?.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Content Format Selector */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                Formato del Contenido:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setContentFormat('video-short')}
                  className={`p-2 rounded-xl text-left border transition ${contentFormat === 'video-short' ? 'bg-amber-500/25 border-amber-400 text-white font-bold' : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'}`}
                >
                  <Video className="w-3.5 h-3.5 text-amber-300 mb-1" />
                  Video Corto (Reels / TikTok)
                </button>
                <button
                  type="button"
                  onClick={() => setContentFormat('speech-plaza')}
                  className={`p-2 rounded-xl text-left border transition ${contentFormat === 'speech-plaza' ? 'bg-amber-500/25 border-amber-400 text-white font-bold' : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'}`}
                >
                  <Megaphone className="w-3.5 h-3.5 text-sky-300 mb-1" />
                  Discurso de Plaza Pública
                </button>
                <button
                  type="button"
                  onClick={() => setContentFormat('whatsapp-community')}
                  className={`p-2 rounded-xl text-left border transition ${contentFormat === 'whatsapp-community' ? 'bg-amber-500/25 border-amber-400 text-white font-bold' : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'}`}
                >
                  <Radio className="w-3.5 h-3.5 text-emerald-300 mb-1" />
                  WhatsApp / Redes Barriales
                </button>
                <button
                  type="button"
                  onClick={() => setContentFormat('debate-rebuttal')}
                  className={`p-2 rounded-xl text-left border transition ${contentFormat === 'debate-rebuttal' ? 'bg-amber-500/25 border-amber-400 text-white font-bold' : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'}`}
                >
                  <AlertCircle className="w-3.5 h-3.5 text-rose-300 mb-1" />
                  Debate & Respuesta a Ataques
                </button>
              </div>
            </div>

            {/* Target Audience */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                Segmento / Audiencia Específica:
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/20 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
              >
                <option value="Jóvenes y Nuevos Votantes (18-28)" className="bg-slate-900">Jóvenes y Nuevos Votantes (18-28)</option>
                <option value="Madres Cabeza de Hogar y Familias Populares (E1-2)" className="bg-slate-900">Madres Cabeza de Hogar y Familias Populares (E1-2)</option>
                <option value="Comerciantes y Pequeños Empresarios Afectados por Extorsión" className="bg-slate-900">Comerciantes y Pequeños Empresarios Afectados por Extorsión</option>
                <option value="Comunidades Rurales, Veredas y Campesinos" className="bg-slate-900">Comunidades Rurales, Veredas y Campesinos</option>
                <option value="Clases Medias Urbanas, Profesionales y Voto de Opinión" className="bg-slate-900">Clases Medias Urbanas, Profesionales y Voto de Opinión</option>
              </select>
            </div>

            {/* Tone of Voice */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Tono de Comunicación:</label>
              <select
                value={toneOfVoice}
                onChange={(e) => setToneOfVoice(e.target.value)}
                className="w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/20 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
              >
                <option value="Firmeza, Autoridad y Esperanza" className="bg-slate-900">Firmeza, Autoridad y Esperanza</option>
                <option value="Cercano, Empático y Protector" className="bg-slate-900">Cercano, Empático y Protector</option>
                <option value="Técnico, Resolutivo y Sin Carreta" className="bg-slate-900">Técnico, Resolutivo y Sin Carreta</option>
                <option value="Disruptivo, Frontal y Denunciante" className="bg-slate-900">Disruptivo, Frontal y Denunciante</option>
              </select>
            </div>

            {/* Cognitive Framing Selector (Protocolo PA-003) */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <label className="text-xs text-slate-300 font-semibold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Persuasión Cognitiva (Protocolo PA-003):
                </span>
                <span className="text-[10px] font-mono text-sky-400">Prospect Theory</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCognitiveFraming('gain-hope')}
                  className={`p-2 rounded-xl text-center border text-xs transition ${
                    cognitiveFraming === 'gain-hope'
                      ? 'bg-emerald-500/25 border-emerald-400 text-white font-bold shadow-[0_0_10px_rgba(16,185,129,0.25)]'
                      : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-[11px] font-bold text-emerald-300">Ganancia</div>
                  <div className="text-[9px] text-slate-400">Esperanza & Futuro</div>
                </button>
                <button
                  type="button"
                  onClick={() => setCognitiveFraming('loss-protection')}
                  className={`p-2 rounded-xl text-center border text-xs transition ${
                    cognitiveFraming === 'loss-protection'
                      ? 'bg-amber-500/25 border-amber-400 text-white font-bold shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                      : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-[11px] font-bold text-amber-300">Pérdida</div>
                  <div className="text-[9px] text-slate-400">Defensa & Blindaje</div>
                </button>
                <button
                  type="button"
                  onClick={() => setCognitiveFraming('balanced')}
                  className={`p-2 rounded-xl text-center border text-xs transition ${
                    cognitiveFraming === 'balanced'
                      ? 'bg-sky-500/25 border-sky-400 text-white font-bold shadow-[0_0_10px_rgba(56,189,248,0.25)]'
                      : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-[11px] font-bold text-sky-300">Equilibrio</div>
                  <div className="text-[9px] text-slate-400">Riesgo + Victoria</div>
                </button>
              </div>
            </div>

            {/* Key Topic */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300 font-semibold">Eje Temático Principal:</label>
              <input
                type="text"
                value={keyTopic}
                onChange={(e) => setKeyTopic(e.target.value)}
                placeholder="Ej. Empleo joven, vías terciarias, extorsión..."
                className="w-full px-3 py-2 rounded-2xl bg-white/10 border border-white/20 text-white text-xs font-medium focus:outline-none focus:border-sky-400"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateBrief}
              disabled={isGenerating}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-sky-500 to-blue-600 hover:from-amber-400 hover:to-blue-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(251,191,36,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-all transform hover:scale-[1.01] active:scale-95 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 text-amber-200 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Generando Brief Territorial...' : 'Generar Brief con IA Gemini'}</span>
            </button>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7">
          <div className="p-5 rounded-3xl bg-slate-950/45 backdrop-blur-3xl border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.5)] min-h-[500px] flex flex-col justify-between space-y-4">
            <div>
              {/* Results Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Brief Generado • {currentMuni.name}
                  </span>
                </div>
                {generatedBrief && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-300 hover:text-white transition flex items-center gap-1 text-[11px]"
                      title="Copiar texto"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copiado' : 'Copiar'}</span>
                    </button>
                    <button
                      onClick={handleExportPdf}
                      className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-300 hover:text-white transition flex items-center gap-1 text-[11px]"
                      title="Descargar en PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-400" />
                      <span>PDF</span>
                    </button>
                    {onSaveToDrive && (
                      <button
                        onClick={handleSaveDrive}
                        className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-300 hover:text-white transition flex items-center gap-1 text-[11px]"
                        title="Guardar en Google Drive"
                      >
                        <Save className="w-3.5 h-3.5 text-amber-400" />
                        <span>{savedSuccess ? 'Guardado en Drive' : 'Drive'}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Brief Content Body */}
              <div className="mt-4">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center py-24 space-y-3 text-center">
                    <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
                    <div className="text-sm font-bold text-white">
                      Consultando Repositorio Proteus & Gemini...
                    </div>
                    <p className="text-xs text-slate-400 max-w-sm">
                      Cruzando las estadísticas de {currentMuni.name} con el perfil discursivo de {candidateProfile.nombre} para crear un brief ganador.
                    </p>
                  </div>
                ) : generatedBrief ? (
                  <div className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed bg-black/25 p-4 rounded-2xl border border-white/10 max-h-[550px] overflow-y-auto">
                    {generatedBrief}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 space-y-2 text-center text-slate-400">
                    <Megaphone className="w-10 h-10 text-white/20 stroke-1" />
                    <div className="text-sm font-bold text-slate-300">
                      Ningún Brief Generado Aún
                    </div>
                    <p className="text-xs max-w-sm text-slate-400">
                      Selecciona un municipio, formato y audiencia en el panel izquierdo y haz clic en "Generar Brief con IA Gemini" para obtener una pieza estratégica hiper-local.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Notice */}
            <div className="text-[10px] text-slate-400 pt-2 border-t border-white/10 flex items-center justify-between">
              <span>Basado en el Repositorio de Información Municipal de Proteus 1.2</span>
              <span>Motor IA: Gemini 3.8 Flash / Google Search Grounding</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

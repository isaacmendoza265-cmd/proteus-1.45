import React, { useState } from 'react';
import { 
  Video, 
  Camera, 
  Palette, 
  Sparkles, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  Eye, 
  Mic, 
  Volume2, 
  Film,
  Download,
  Share2
} from 'lucide-react';
import { CandidateProfile } from '../../components/CandidateProfileManager';
import { CandidateVideoAnalyzer } from '../../components/CandidateVideoAnalyzer';
import { callGeminiApi } from '../../services/geminiService';

interface CandidateMultimediaStudioViewProps {
  candidateProfile: CandidateProfile;
  onSaveProfile: (profile: CandidateProfile) => void;
  onSaveToDrive?: (title: string, data: any) => void;
}

type StudioTab = 'video-analysis' | 'image-colorimetry' | 'semiotic-audit';

export const CandidateMultimediaStudioView: React.FC<CandidateMultimediaStudioViewProps> = ({
  candidateProfile,
  onSaveProfile,
  onSaveToDrive
}) => {
  const [activeTab, setActiveTab] = useState<StudioTab>('video-analysis');
  const [analyzingImage, setAnalyzingImage] = useState(false);
  const [imageAnalysisResult, setImageAnalysisResult] = useState<string | null>(candidateProfile.colorimetryReport || null);

  const handleAnalyzePhotoWithGemini = async () => {
    setAnalyzingImage(true);
    try {
      const prompt = `Actúa como Consultor Senior de Semiótica Visual, Colorimetría e Imagen Pública Política de Proyecto Proteus.
Candidato: ${candidateProfile.nombre}, Edad: ${candidateProfile.rangoEdad || '35-50 años'}, Tono narrativo: ${candidateProfile.tonoNarrativo || 'Firme y moderno'}.

Realiza una AUDITORÍA INTEGRAL DE IMAGEN POLÍTICA Y COLORIMETRÍA para este candidato:
1. ESTACIÓN CROMÁTICA & FOTOTIPO: Determina si pertenece a estación Fría (Invierno/Verano) o Cálida (Otoño/Primavera) y el nivel de contraste recomendado.
2. PALETA DE COLORES DE PODER Y CERCANÍA:
   - 3 Colores de Autoridad / Formales (con códigos HEX y cómo combinarlos en trajes/camisas).
   - 2 Colores de Cercanía / Territorio (para visitas comunitarias y camisetas polo/chalecos).
3. QUÉ COLORES Y TELAS EVITAR ABSOLUTAMENTE: Explicar por qué ciertos tonos lavan el rostro o proyectan debilidad/frialdad.
4. LENGUAJE CORPORAL ANTE CÁMARAS: Postura de hombros, posición de manos (cúpula de poder de Merkel vs brazos abiertos), microexpresiones faciales y contacto visual con el lente.
5. ESQUEMA DE ILUMINACIÓN ÓPTIMO: Iluminación de 3 puntos (key light, fill light, rim light) para resaltar facciones y evitar sombras duras en la mirada.`;

      const result = await callGeminiApi({
        promptText: prompt,
        systemInstruction: 'Eres el Analista Multimedia y Consultor de Imagen Política de Proteus. Entrega informes ejecutivos detallados con códigos de color exactos y consejos prácticos de vestuario.',
        useSearch: true
      });

      setImageAnalysisResult(result);
      // Update candidate profile
      onSaveProfile({
        ...candidateProfile,
        colorimetryReport: result
      });
    } catch (e: any) {
      setImageAnalysisResult('Error al generar la auditoría de imagen con Gemini.');
    } finally {
      setAnalyzingImage(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-slate-950/40 backdrop-blur-3xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1.5px_2px_rgba(255,255,255,0.4)] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-sky-500/30 text-pink-300 border border-pink-400/50 shadow-[0_0_12px_rgba(244,114,182,0.3)] flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-pink-400" />
                Estudio de Analítica Multimedia • Semiótica Política
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                Imagen & Video con Visión IA
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>ESTUDIO DE IMAGEN & ANALISTA MULTIMEDIA</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
              Auditoría multimodal de video (oratoria, dicción, pausas, encuadre, muletillas) y fotografía política (colorimetría, fototipo, vestuario e iluminación) para <strong className="text-amber-300">{candidateProfile.nombre}</strong>.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-2xl bg-white/05 border border-white/15 backdrop-blur-xl text-right">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Diagnóstico Activo</div>
              <div className="text-sm font-black text-white mt-0.5">{candidateProfile.nombre}</div>
              <div className="text-[10px] text-pink-400 font-mono">Multimodal Ready</div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('video-analysis')}
            className={`px-4 py-2 rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'video-analysis'
                ? 'bg-gradient-to-r from-pink-500/35 to-purple-600/40 border border-pink-400/60 text-white shadow-[0_0_20px_rgba(244,114,182,0.3)]'
                : 'text-slate-400 hover:text-white bg-white/05 hover:bg-white/10'
            }`}
          >
            <Video className="w-4 h-4 text-pink-400" />
            <span>1. Analista de Video (Oratoria & Dicción)</span>
          </button>

          <button
            onClick={() => setActiveTab('image-colorimetry')}
            className={`px-4 py-2 rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'image-colorimetry'
                ? 'bg-gradient-to-r from-amber-500/35 to-orange-600/40 border border-amber-400/60 text-white shadow-[0_0_20px_rgba(251,191,36,0.3)]'
                : 'text-slate-400 hover:text-white bg-white/05 hover:bg-white/10'
            }`}
          >
            <Palette className="w-4 h-4 text-amber-400" />
            <span>2. Analista de Imagen (Colorimetría & Vestuario)</span>
          </button>

          <button
            onClick={() => setActiveTab('semiotic-audit')}
            className={`px-4 py-2 rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'semiotic-audit'
                ? 'bg-gradient-to-r from-sky-500/35 to-blue-600/40 border border-sky-400/60 text-white shadow-[0_0_20px_rgba(56,189,248,0.3)]'
                : 'text-slate-400 hover:text-white bg-white/05 hover:bg-white/10'
            }`}
          >
            <Award className="w-4 h-4 text-sky-400" />
            <span>3. Matriz Semiótica & Impacto Público</span>
          </button>
        </div>
      </div>

      {/* TAB 1: VIDEO ANALYSIS */}
      {activeTab === 'video-analysis' && (
        <div className="space-y-4">
          <CandidateVideoAnalyzer
            candidateName={candidateProfile.nombre}
            existingAnalysis={candidateProfile.videoAnalysisData ?? null}
            onApplyToProfile={({ videoAnalysisResult, ...profileUpdates }) => {
              onSaveProfile({
                ...candidateProfile,
                ...profileUpdates,
                videoAnalysisData: videoAnalysisResult
              });
              if (onSaveToDrive) {
                onSaveToDrive(`VideoAnalysis_${candidateProfile.nombre}`, videoAnalysisResult);
              }
            }}
          />
        </div>
      )}

      {/* TAB 2: IMAGE & COLORIMETRY ANALYSIS */}
      {activeTab === 'image-colorimetry' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Action Card */}
            <div className="lg:col-span-4 p-5 rounded-3xl bg-slate-950/40 backdrop-blur-2xl border border-white/15 space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Camera className="w-4 h-4" />
                Fotometría & Colorimetría
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Analiza las características morfológicas, tono de piel, contraste y presencia fotográfica del candidato para construir su paleta de colorimetría institucional.
              </p>

              {candidateProfile.photoBase64 ? (
                <div className="relative rounded-2xl overflow-hidden border border-white/20 aspect-square max-w-[200px] mx-auto shadow-2xl">
                  <img
                    src={candidateProfile.photoBase64}
                    alt={candidateProfile.nombre}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-2 bg-black/60 backdrop-blur-sm text-center text-[10px] text-white font-bold">
                    Foto de Campaña Cargada
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-black/30 border border-white/10 text-center text-slate-400 space-y-2">
                  <User className="w-12 h-12 text-white/20 mx-auto" />
                  <div className="text-xs font-bold text-slate-300">Sin fotografía específica cargada</div>
                  <div className="text-[10px]">Carga una foto en el perfil del candidato o ejecuta la auditoría directa con IA.</div>
                </div>
              )}

              <button
                onClick={handleAnalyzePhotoWithGemini}
                disabled={analyzingImage}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(251,191,36,0.3)] transition disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${analyzingImage ? 'animate-spin' : ''}`} />
                <span>{analyzingImage ? 'Analizando Colorimetría...' : 'Auditar Colorimetría & Vestuario con IA'}</span>
              </button>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-8 p-5 rounded-3xl bg-slate-950/45 backdrop-blur-3xl border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.5)] min-h-[450px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    Informe de Colorimetría, Vestuario e Iluminación
                  </h3>
                </div>
                {imageAnalysisResult && onSaveToDrive && (
                  <button
                    onClick={() => onSaveToDrive(`Colorimetria_${candidateProfile.nombre}`, { report: imageAnalysisResult })}
                    className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-sky-300 hover:text-white font-bold text-xs transition"
                  >
                    Guardar en Drive
                  </button>
                )}
              </div>

              <div className="mt-4">
                {analyzingImage ? (
                  <div className="flex flex-col items-center justify-center py-24 space-y-3 text-center">
                    <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
                    <div className="text-sm font-bold text-white">Evaluando Estación Cromática con Gemini Vision...</div>
                    <p className="text-xs text-slate-400 max-w-sm">
                      Determinando contraste de piel, paleta de códigos HEX recomendados y errores de vestuario a evitar.
                    </p>
                  </div>
                ) : imageAnalysisResult ? (
                  <div className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed bg-black/25 p-4 rounded-2xl border border-white/10 max-h-[500px] overflow-y-auto">
                    {imageAnalysisResult}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 space-y-2 text-center text-slate-400">
                    <Palette className="w-10 h-10 text-white/20 stroke-1" />
                    <div className="text-sm font-bold text-slate-300">Auditoría Cromática Pendiente</div>
                    <p className="text-xs max-w-sm text-slate-400">
                      Haz clic en el botón de la izquierda para que Gemini analice el fototipo del candidato y genere los códigos de color de poder y cercanía para sus piezas gráficas y vestuario.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SEMIOTIC AUDIT & 4-WEEK ROADMAP */}
      {activeTab === 'semiotic-audit' && (
        <div className="p-6 rounded-3xl bg-slate-950/45 backdrop-blur-3xl border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.5)] space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div>
              <div className="text-[10px] font-mono text-sky-400 font-bold uppercase">Plan Maestro de Desempeño</div>
              <h3 className="text-base font-black text-white mt-0.5">
                Ruta de Fortalecimiento Mediático y Presencia Escénica (4 Semanas)
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold">
              Calibrado para {candidateProfile.nombre}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/05 border border-white/10 space-y-2">
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">Semana 1: Voz & Dicción</div>
              <div className="text-xs font-bold text-white">Eliminación de Muletillas & Pausas de Poder</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Prácticas de respiración diafragmática. Reemplazo de muletillas ("ehhh", "o sea", "digamos") por silencios intencionales de 1.5 segundos que proyectan liderazgo.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/05 border border-white/10 space-y-2">
              <div className="text-[10px] font-mono text-pink-400 font-bold uppercase">Semana 2: Lenguaje Corporal</div>
              <div className="text-xs font-bold text-white">Postura de Tarima & Anclaje de Mirada</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Manos a la altura del plexo solar con palmas abiertas o cúpula. Enfoque directo a la pupila del interlocutor o al lente de cámara en primeros planos.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/05 border border-white/10 space-y-2">
              <div className="text-[10px] font-mono text-sky-400 font-bold uppercase">Semana 3: Vestuario & Semiótica</div>
              <div className="text-xs font-bold text-white">Aplicación de Paleta Institucional</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Uso riguroso de los colores de poder (trajes y chalecos) en entrevistas de televisión y colores de cercanía en plazas de mercado y veredas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/05 border border-white/10 space-y-2">
              <div className="text-[10px] font-mono text-purple-400 font-bold uppercase">Semana 4: Manejo de Crisis</div>
              <div className="text-xs font-bold text-white">Técnica de Puente en Debates</div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Estructura de respuesta en 3 pasos: Reconocer la pregunta sin validar el ataque ➔ Conectar con el puente ("Lo verdaderamente importante para el municipio es...") ➔ Cerrar con la propuesta del candidato.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
    <div className="proteus-civico space-y-4 pb-12">
      {/* Cabecera */}
      <div className="p-5 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" />
                Estudio de Analítica Multimedia · Semiótica Política
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[var(--c-border)] text-[var(--c-muted)]">
                Imagen & Video con Visión IA
              </span>
            </div>
            <h1 className="font-titulo text-2xl lg:text-[28px] leading-tight font-medium flex items-center gap-3">
              <span>Estudio de imagen y video</span>
            </h1>
            <p className="text-[var(--c-muted)] text-xs sm:text-sm mt-1 max-w-3xl">
              Auditoría multimodal de video (oratoria, dicción, pausas, encuadre, muletillas) y fotografía política (colorimetría, fototipo, vestuario e iluminación) para <strong className="text-[var(--c-ink)]">{candidateProfile.nombre}</strong>.
            </p>
          </div>

          {/* Insignia de métricas rápidas */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 rounded-xl bg-[var(--c-sunken)] text-right">
              <div className="text-xs uppercase text-[var(--c-muted)] font-bold">Diagnóstico Activo</div>
              <div className="text-sm font-bold text-[var(--c-ink)] mt-0.5">{candidateProfile.nombre}</div>
              <div className="text-xs text-[var(--c-accent)]">Multimodal Ready</div>
            </div>
          </div>
        </div>

        {/* Pestañas */}
        <div role="tablist" aria-label="Secciones del estudio multimedia" className="flex items-center gap-0.5 mt-5 pt-3 border-t border-[var(--c-border)] overflow-x-auto text-xs font-semibold">
          <button
            role="tab"
            aria-selected={activeTab === 'video-analysis'}
            onClick={() => setActiveTab('video-analysis')}
            className={`min-h-9 px-3 -mb-px whitespace-nowrap flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'video-analysis'
                ? 'border-[var(--c-accent)] text-[var(--c-ink)]'
                : 'border-transparent text-[var(--c-muted)] hover:text-[var(--c-ink)]'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>1. Analista de Video (Oratoria & Dicción)</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'image-colorimetry'}
            onClick={() => setActiveTab('image-colorimetry')}
            className={`min-h-9 px-3 -mb-px whitespace-nowrap flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'image-colorimetry'
                ? 'border-[var(--c-accent)] text-[var(--c-ink)]'
                : 'border-transparent text-[var(--c-muted)] hover:text-[var(--c-ink)]'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>2. Analista de Imagen (Colorimetría & Vestuario)</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'semiotic-audit'}
            onClick={() => setActiveTab('semiotic-audit')}
            className={`min-h-9 px-3 -mb-px whitespace-nowrap flex items-center gap-2 shrink-0 border-b-2 ${
              activeTab === 'semiotic-audit'
                ? 'border-[var(--c-accent)] text-[var(--c-ink)]'
                : 'border-transparent text-[var(--c-muted)] hover:text-[var(--c-ink)]'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>3. Matriz Semiótica & Impacto Público</span>
          </button>
        </div>
      </div>

      {/* PESTAÑA 1: ANÁLISIS DE VIDEO */}
      {activeTab === 'video-analysis' && (
        <div className="space-y-4" role="tabpanel">
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

      {/* PESTAÑA 2: ANÁLISIS DE IMAGEN Y COLORIMETRÍA */}
      {activeTab === 'image-colorimetry' && (
        <div className="space-y-4" role="tabpanel">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Tarjeta de acción */}
            <div className="lg:col-span-4 p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] space-y-4">
              <div className="flex items-center gap-2 text-[var(--c-accent)] text-xs font-bold uppercase tracking-wide">
                <Camera className="w-4 h-4" />
                Fotometría & Colorimetría
              </div>
              <p className="text-xs text-[var(--c-muted)] leading-relaxed">
                Analiza las características morfológicas, tono de piel, contraste y presencia fotográfica del candidato para construir su paleta de colorimetría institucional.
              </p>

              {candidateProfile.photoBase64 ? (
                <div className="relative rounded-xl overflow-hidden border border-[var(--c-border)] aspect-square max-w-[200px] mx-auto">
                  <img
                    src={candidateProfile.photoBase64}
                    alt={candidateProfile.nombre}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-2 bg-[var(--c-scrim)] text-center text-xs text-white font-bold">
                    Foto de Campaña Cargada
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-[var(--c-sunken)] text-center text-[var(--c-muted)] space-y-2">
                  <User className="w-12 h-12 mx-auto opacity-40" />
                  <div className="text-xs font-bold text-[var(--c-ink)]">Sin fotografía específica cargada</div>
                  <div className="text-xs">Carga una foto en el perfil del candidato o ejecuta la auditoría directa con IA.</div>
                </div>
              )}

              <button
                onClick={handleAnalyzePhotoWithGemini}
                disabled={analyzingImage}
                className="w-full min-h-9 px-3 rounded-lg bg-[var(--c-accent)] text-white font-semibold text-xs flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${analyzingImage ? 'animate-spin' : ''}`} />
                <span>{analyzingImage ? 'Analizando Colorimetría...' : 'Auditar Colorimetría & Vestuario con IA'}</span>
              </button>
            </div>

            {/* Resultados */}
            <div className="lg:col-span-8 p-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] min-h-[450px]">
              <div className="flex items-center justify-between border-b border-[var(--c-border)] pb-3">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[var(--c-accent)]" />
                  <h3 className="text-xs font-bold uppercase tracking-wide">
                    Informe de Colorimetría, Vestuario e Iluminación
                  </h3>
                </div>
                {imageAnalysisResult && onSaveToDrive && (
                  <button
                    onClick={() => onSaveToDrive(`Colorimetria_${candidateProfile.nombre}`, { report: imageAnalysisResult })}
                    className="min-h-8 px-3 rounded-md border border-[var(--c-border)] bg-[var(--c-surface)] font-semibold text-xs"
                  >
                    Guardar
                  </button>
                )}
              </div>

              <div className="mt-4">
                {analyzingImage ? (
                  <div className="flex flex-col items-center justify-center py-24 space-y-3 text-center">
                    <Sparkles className="w-8 h-8 text-[var(--c-accent)] animate-spin" />
                    <div className="text-sm font-bold">Evaluando Estación Cromática con Gemini Vision...</div>
                    <p className="text-xs text-[var(--c-muted)] max-w-sm">
                      Determinando contraste de piel, paleta de códigos HEX recomendados y errores de vestuario a evitar.
                    </p>
                  </div>
                ) : imageAnalysisResult ? (
                  <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed bg-[var(--c-sunken)] p-4 rounded-xl max-h-[500px] overflow-y-auto">
                    {imageAnalysisResult}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 space-y-2 text-center text-[var(--c-muted)]">
                    <Palette className="w-10 h-10 opacity-40 stroke-1" />
                    <div className="text-sm font-bold text-[var(--c-ink)]">Auditoría Cromática Pendiente</div>
                    <p className="text-xs max-w-sm">
                      Haz clic en el botón de la izquierda para que Gemini analice el fototipo del candidato y genere los códigos de color de poder y cercanía para sus piezas gráficas y vestuario.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 3: AUDITORÍA SEMIÓTICA Y HOJA DE RUTA DE 4 SEMANAS */}
      {activeTab === 'semiotic-audit' && (
        <div className="p-5 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] space-y-4" role="tabpanel">
          <div className="flex items-center justify-between border-b border-[var(--c-border)] pb-3">
            <div>
              <div className="text-xs text-[var(--c-muted)] font-bold uppercase">Plan Maestro de Desempeño</div>
              <h3 className="font-titulo text-base font-medium mt-0.5">
                Ruta de Fortalecimiento Mediático y Presencia Escénica (4 Semanas)
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-md bg-[var(--c-ok-soft)] text-[var(--c-ok)] text-xs font-bold">
              Calibrado para {candidateProfile.nombre}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-[var(--c-sunken)] space-y-2">
              <div className="text-xs text-[var(--c-accent)] font-bold uppercase">Semana 1: Voz & Dicción</div>
              <div className="text-xs font-bold">Eliminación de Muletillas & Pausas de Poder</div>
              <p className="text-xs text-[var(--c-muted)] leading-relaxed">
                Prácticas de respiración diafragmática. Reemplazo de muletillas ("ehhh", "o sea", "digamos") por silencios intencionales de 1.5 segundos que proyectan liderazgo.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[var(--c-sunken)] space-y-2">
              <div className="text-xs text-[var(--c-accent)] font-bold uppercase">Semana 2: Lenguaje Corporal</div>
              <div className="text-xs font-bold">Postura de Tarima & Anclaje de Mirada</div>
              <p className="text-xs text-[var(--c-muted)] leading-relaxed">
                Manos a la altura del plexo solar con palmas abiertas o cúpula. Enfoque directo a la pupila del interlocutor o al lente de cámara en primeros planos.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[var(--c-sunken)] space-y-2">
              <div className="text-xs text-[var(--c-accent)] font-bold uppercase">Semana 3: Vestuario & Semiótica</div>
              <div className="text-xs font-bold">Aplicación de Paleta Institucional</div>
              <p className="text-xs text-[var(--c-muted)] leading-relaxed">
                Uso riguroso de los colores de poder (trajes y chalecos) en entrevistas de televisión y colores de cercanía en plazas de mercado y veredas.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[var(--c-sunken)] space-y-2">
              <div className="text-xs text-[var(--c-accent)] font-bold uppercase">Semana 4: Manejo de Crisis</div>
              <div className="text-xs font-bold">Técnica de Puente en Debates</div>
              <p className="text-xs text-[var(--c-muted)] leading-relaxed">
                Estructura de respuesta en 3 pasos: Reconocer la pregunta sin validar el ataque ➔ Conectar con el puente ("Lo verdaderamente importante para el municipio es...") ➔ Cerrar con la propuesta del candidato.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

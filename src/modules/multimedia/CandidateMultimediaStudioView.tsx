import React, { useMemo, useState } from 'react';
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
import { formatAiError, generateContent } from '../../services/geminiService';
import { normalizarIdentidad, paletaDefinida } from '../../services/identidad/identidad';
import { medicionesEnTexto, medirImagen, type MedicionPieza } from '../../services/analisisPiezas/pieza';

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

  // Colorimetría (revisado oct-2026): antes pedía a Gemini fototipo, estación cromática y códigos HEX SIN enviarle la
  // foto (respondía de memoria, igual para cualquier candidato). Ahora exige la foto del perfil, mide en el navegador
  // la paleta, tonalidad y composición (medirImagen, igual que el análisis de piezas) y envía la imagen solo si la
  // identidad lo permite (Privacidad › Enviar imágenes a Gemini). Sin permiso, Gemini recibe solo las mediciones y no
  // opina sobre el rostro. La llamada lleva las tres macrofuentes con la tarea 'evaluar'.
  const identidad = useMemo(() => normalizarIdentidad(candidateProfile.identidad, candidateProfile.nombre), [candidateProfile.identidad, candidateProfile.nombre]);
  const foto = candidateProfile.photoBase64;
  const [medicionFoto, setMedicionFoto] = useState<MedicionPieza | null>(null);
  const [errorImagen, setErrorImagen] = useState('');
  const conPermiso = identidad.privacidad.enviarFotosAIA;

  const handleAnalyzePhotoWithGemini = async () => {
    if (!foto) return;
    setAnalyzingImage(true);
    setErrorImagen('');
    try {
      const blob = await (await fetch(foto)).blob();
      const marca = paletaDefinida(identidad).map((c) => ({ hex: c.hex, rol: c.rol }));
      const m = await medirImagen(blob, marca, identidad.imagen.toleranciaColor);
      setMedicionFoto(m);
      const prompt = [
        `Evalúa la foto de campaña de ${candidateProfile.nombre || 'el candidato del perfil'} para su imagen pública: color, vestuario, encuadre e iluminación.`,
        '',
        'MEDICIONES DE LA FOTO (hechas en el navegador sobre los píxeles; son datos):',
        ...medicionesEnTexto(m),
        '',
        conPermiso
          ? 'Tienes la foto adjunta. Separa lo que ves en ella de lo que interpretas.'
          : 'NO tienes la foto: la identidad no permite enviar imágenes a la IA. Trabaja solo con las mediciones; no opines sobre el rostro, la piel ni la expresión, y dilo al principio.',
        '',
        'Responde en 5 apartados breves:',
        '1. Qué muestran las mediciones (paleta, contraste, temperatura, composición) y su adherencia a la paleta de marca del perfil, si la hay.',
        '2. Colores que favorecen y que conviene evitar, con códigos HEX, contrastados con la paleta y las reglas de vestuario de la identidad (si no están definidas, dilo).',
        '3. Vestuario para entrevista y para territorio, según el perfil.',
        '4. Encuadre e iluminación: qué corregir en esta foto.',
        '5. Qué falta para una auditoría completa (más fotos, video, la paleta de marca si no está definida).',
        'Lo que no se mida en la foto ni esté en el perfil es recomendación general: rotúlalo así.',
      ].join('\n');
      const parts: Record<string, unknown>[] = [{ text: prompt }];
      if (conPermiso) parts.push({ inlineData: { mimeType: blob.type || 'image/jpeg', data: foto.split(',')[1] ?? '' } });
      const r = await generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts }],
        config: { systemInstruction: 'Eres el analista de imagen de Proteus. Escribe en español de Colombia, concreto y sin adornos.' },
        proteus: { tarea: 'evaluar' },
      });
      const result = r.text;
      setImageAnalysisResult(result);
      onSaveProfile({ ...candidateProfile, colorimetryReport: result });
    } catch (e) {
      setErrorImagen(formatAiError(e));
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
                Mide en la foto del perfil la paleta, la tonalidad y la composición, y las compara con la paleta de marca. Gemini las interpreta con el perfil y el marco; ve la foto solo si la identidad lo permite.
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
                  <div className="text-xs font-bold text-[var(--c-ink)]">Sin foto del candidato</div>
                  <div className="text-xs">Carga una foto en el perfil del candidato: sin foto no hay nada que medir ni auditar.</div>
                </div>
              )}

              <button
                onClick={handleAnalyzePhotoWithGemini}
                disabled={analyzingImage || !foto}
                className="w-full min-h-9 px-3 rounded-lg bg-[var(--c-accent)] text-white font-semibold text-xs flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${analyzingImage ? 'animate-spin' : ''}`} />
                <span>{analyzingImage ? 'Analizando…' : 'Medir la foto y auditarla con IA'}</span>
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
                    <div className="text-sm font-bold">Midiendo la foto y consultando a Gemini…</div>
                    <p className="text-xs text-[var(--c-muted)] max-w-sm">
                      Determinando contraste de piel, paleta de códigos HEX recomendados y errores de vestuario a evitar.
                    </p>
                  </div>
                ) : imageAnalysisResult || medicionFoto || errorImagen ? (
                  <div className="space-y-3">
                    {errorImagen && <p className="text-xs text-[var(--c-warn)]">No se pudo completar: {errorImagen}</p>}
                    {medicionFoto && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs"><span className="px-2 py-0.5 rounded-md font-bold bg-[var(--c-ok-soft)] text-[var(--c-ok)]">Medido en la foto</span><span className="text-[var(--c-muted)]">Paleta dominante (píxeles)</span></div>
                        <div className="flex flex-wrap gap-1.5">
                          {medicionFoto.paleta.map((c) => (
                            <span key={c.hex} className="flex items-center gap-1 text-xs"><span className="w-5 h-5 rounded border border-[var(--c-border)]" style={{ background: c.hex }} />{c.hex} · {Math.round(100 * c.peso)} %</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {imageAnalysisResult && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs"><span className="px-2 py-0.5 rounded-md font-bold bg-[var(--c-warn-soft)] text-[var(--c-warn)]">Interpretación de la IA</span><span className="text-[var(--c-muted)]">{conPermiso ? 'Gemini vio la foto y las mediciones' : 'Gemini recibió solo las mediciones (la identidad no permite enviar fotos)'}</span></div>
                        <div className="text-xs sm:text-sm whitespace-pre-line leading-relaxed bg-[var(--c-sunken)] p-4 rounded-xl max-h-[500px] overflow-y-auto">
                          {imageAnalysisResult}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 space-y-2 text-center text-[var(--c-muted)]">
                    <Palette className="w-10 h-10 opacity-40 stroke-1" />
                    <div className="text-sm font-bold text-[var(--c-ink)]">Auditoría de imagen pendiente</div>
                    <p className="text-xs max-w-sm">
                      Con la foto del perfil, Proteus mide su paleta, tonalidad y composición; Gemini las interpreta con el perfil y el marco. Solo ve la foto si la identidad lo permite (Privacidad).
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
              Guía general · texto fijo
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

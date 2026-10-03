import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, 
  Play, 
  Volume2, 
  Mic, 
  Palette, 
  Eye, 
  Film, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  ThumbsUp, 
  ThumbsDown, 
  Award, 
  RotateCcw, 
  Download, 
  ExternalLink, 
  Scissors, 
  FileText, 
  Activity, 
  Zap, 
  Check, 
  Loader2,
  Upload,
  Info,
  ChevronRight,
  ShieldAlert,
  Sliders,
  Layers
} from 'lucide-react';
import { formatAiError, generateContent } from '../services/geminiService';
import { identidadActual } from '../services/ia/macrofuentes';
import { paletaDefinida } from '../services/identidad/identidad';
import { medicionesEnTexto, medirVideo, type MedicionPieza } from '../services/analisisPiezas/pieza';
import { INLINE_MAX, SUBIDA_MAX, mensajeSubidaMax } from '../services/analisisPiezas/analisis';
import { jsPDF } from 'jspdf';
import { motion, AnimatePresence } from 'motion/react';

/** Puntajes que asigna Gemini (0 a 100). No son mediciones; null si la IA no los dio. */
export interface VideoMetricScores {
  dominioEscenico: number | null;
  claridadDiccion: number | null;
  conexionEmocional: number | null;
  calidadVisualComposicion: number | null;
  ritmoEdicion: number | null;
  controlMuletillas: number | null;
}

export interface VideoAnalysisResult {
  videoUrl: string;
  platform: 'youtube' | 'instagram' | 'tiktok' | 'upload' | 'otro';
  videoTitle?: string;
  analyzedAt: string;
  
  // 1. Tono Comunicacional
  tonoComunicacional: {
    registroDominante: string;
    descripcion: string;
    nivelAsertividad: string;
    conexionEmocional: string;
    proyeccionLiderazgo: string;
  };
  
  // 2. Expresión Oral y Verbal
  expresionOral: {
    diccionVocalizacion: string;
    cadenciaRitmo: string;
    manejoPausasSilencios: string;
    modulacionTono: string;
    muletillasDetectadas: string[];
    recursosRetoricos: string;
    diagnosticoVocal: string;
  };
  
  // 3. Coloración e Iluminación
  coloracionIluminacion: {
    temperaturaColor: string;
    tipoIluminacion: string;
    armoniaColorimetrica: string;
    etalonajeSaturacion: string;
    paletaDominanteHex: string[];
  };
  
  // 4. Composición y Encuadre Visual
  composicionEncuadre: {
    tipoPlano: string;
    anguloCamara: string;
    estabilidadCamara: string;
    fondoEntorno: string;
    contactoVisualLenguaje: string;
  };
  
  // 5. Grado y Calidad de Edición
  gradoEdicion: {
    nivelProduccion: string;
    ritmoCortes: string;
    recursosGraficosSubtitulos: string;
    calidadAudioMicrofonia: string;
    elementosDinamicos: string;
  };
  
  // 6. Fortalezas y Debilidades
  fortalezas: string[];
  debilidades: string[];
  
  // 7. Métricas
  metricasScore: VideoMetricScores;
  
  // 8. Recomendaciones
  recomendacionesOratoria: string[];
  recomendacionesProduccion: string[];
  
  // 9. Síntesis y Markdown
  informeMarkdown?: string;
  /** Qué vio Gemini: el video completo (YouTube o archivo, con audio) */
  fuenteIA?: string;
  /** Mediciones locales del archivo (paleta, tonalidad, cortes), en texto; solo para archivos subidos */
  medicionLocal?: string[];
}

interface CandidateVideoAnalyzerProps {
  candidateName?: string;
  existingAnalysis?: VideoAnalysisResult | null;
  onApplyToProfile?: (updatedData: {
    tonoNarrativo?: string;
    estiloComunicacion?: string;
    quEvitar?: string;
    videoAnalysisResult: VideoAnalysisResult;
  }) => void;
  className?: string;
}

export const CandidateVideoAnalyzer: React.FC<CandidateVideoAnalyzerProps> = ({
  candidateName = 'Candidato',
  existingAnalysis = null,
  onApplyToProfile,
  className = ''
}) => {
  // Input states
  const [videoSourceType, setVideoSourceType] = useState<'url' | 'file'>('url');
  const [videoUrl, setVideoUrl] = useState<string>(existingAnalysis?.videoUrl || '');
  const [videoContextNotes, setVideoContextNotes] = useState<string>('');
  const [uploadedVideoFile, setUploadedVideoFile] = useState<File | null>(null);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
  const [capturedFrames, setCapturedFrames] = useState<string[]>([]);

  // Processing states
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStatus, setAnalysisStatus] = useState<string>('');
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<VideoAnalysisResult | null>(existingAnalysis);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<'resumen' | 'oratoria' | 'visual' | 'edicion' | 'balance'>('resumen');
  const [isAppliedSuccessfully, setIsAppliedSuccessfully] = useState<boolean>(false);

  // Hidden video element ref for frame capture
  const hiddenVideoRef = useRef<HTMLVideoElement | null>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Synchronize when existingAnalysis changes
  useEffect(() => {
    if (existingAnalysis) {
      setAnalysisResult(existingAnalysis);
      if (existingAnalysis.videoUrl) setVideoUrl(existingAnalysis.videoUrl);
    }
  }, [existingAnalysis]);

  // Extract YouTube ID helper
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i);
    return match ? match[1] : null;
  };

  // Extract Instagram ID helper
  const getInstagramPostId = (url: string): string | null => {
    if (!url) return null;
    const match = url.match(/(?:instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+))/i);
    return match ? match[1] : null;
  };

  const detectedPlatform = (): 'youtube' | 'instagram' | 'tiktok' | 'upload' | 'otro' => {
    if (videoSourceType === 'file' && videoBlobUrl) return 'upload';
    if (getYouTubeId(videoUrl)) return 'youtube';
    if (getInstagramPostId(videoUrl) || videoUrl.includes('instagram.com')) return 'instagram';
    if (videoUrl.includes('tiktok.com')) return 'tiktok';
    return 'otro';
  };

  const youtubeId = getYouTubeId(videoUrl);
  const instagramId = getInstagramPostId(videoUrl);

  // Handle local video file upload and frame extraction
  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Por favor selecciona un archivo de video válido (.mp4, .webm, .mov).');
      return;
    }

    setUploadedVideoFile(file);
    const blobUrl = URL.createObjectURL(file);
    setVideoBlobUrl(blobUrl);
    setAnalysisError(null);
    setCapturedFrames([]);

    // Extract key frames automatically
    setTimeout(() => {
      extractFramesFromVideo(blobUrl);
    }, 500);
  };

  const extractFramesFromVideo = (srcUrl: string) => {
    const vid = document.createElement('video');
    vid.src = srcUrl;
    vid.crossOrigin = 'anonymous';
    vid.muted = true;

    vid.onloadedmetadata = async () => {
      const duration = vid.duration || 10;
      const timestamps = [duration * 0.15, duration * 0.45, duration * 0.75];
      const frames: string[] = [];

      const captureAt = (time: number): Promise<string> => {
        return new Promise((resolve) => {
          vid.currentTime = time;
          vid.onseeked = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 640;
            canvas.height = 360;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(vid, 0, 0, canvas.width, canvas.height);
              resolve(canvas.toDataURL('image/jpeg', 0.85));
            } else {
              resolve('');
            }
          };
        });
      };

      try {
        for (const t of timestamps) {
          const frameBase64 = await captureAt(t);
          if (frameBase64) frames.push(frameBase64);
        }
        setCapturedFrames(frames);
      } catch (err) {
        console.warn('Error extracting frames:', err);
      }
    };
  };

  // Main Analysis execution with Gemini 3.8 Flash
  const handleExecuteVideoAnalysis = async () => {
    const activeUrl = videoUrl.trim();
    if (videoSourceType === 'url' && !activeUrl) {
      alert('Por favor introduce un enlace de video (YouTube o Instagram) o sube un archivo de video.');
      return;
    }
    if (videoSourceType === 'file' && !uploadedVideoFile && !videoBlobUrl) {
      alert('Por favor sube un archivo de video.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);
    setIsAppliedSuccessfully(false);
    setAnalysisStatus('Iniciando calibración y decodificación audiovisual...');

    try {
      const platformDetected = detectedPlatform();
      // Revisado oct-2026: antes Gemini recibía solo el ENLACE como texto (no veía ni oía el video) o 3 fotogramas sin
      // audio, y aun así se le pedían dicción, muletillas y palabras por minuto; si faltaba un campo se rellenaba con
      // valores inventados (puntajes 84/87…, muletillas "ehh, digamos"). Ahora Gemini recibe el VIDEO COMPLETO, con
      // audio (YouTube por enlace o el archivo subido, si la identidad lo permite), el archivo se mide en el
      // navegador (paleta, tonalidad, cortes) y lo que la IA no devuelva queda "Sin dato".
      const identidad = identidadActual();
      const partes: Record<string, unknown>[] = [];
      let fuenteIA = '';
      let medicion: MedicionPieza | null = null;
      if (videoSourceType === 'url') {
        if (platformDetected !== 'youtube') {
          throw new Error('Gemini solo puede ver por enlace los videos públicos de YouTube. Para Instagram, TikTok u otros, descarga el video y súbelo como archivo.');
        }
        partes.push({ fileData: { fileUri: activeUrl, mimeType: 'video/*' } });
        fuenteIA = 'Gemini vio el video completo de YouTube (imagen y audio).';
      } else {
        if (!uploadedVideoFile) throw new Error('Sube un archivo de video.');
        if (!identidad?.privacidad.enviarVideosAIA) {
          throw new Error('La identidad del candidato no permite enviar videos a la IA (Identidad › Privacidad › Enviar videos a Gemini).');
        }
        setAnalysisStatus('Midiendo el video en el navegador (paleta, tonalidad, cortes)…');
        const marca = identidad ? paletaDefinida(identidad).map((c) => ({ hex: c.hex, rol: c.rol })) : [];
        medicion = await medirVideo(uploadedVideoFile, marca, identidad?.imagen.toleranciaColor ?? 10).catch(() => null);
        setAnalysisStatus('Enviando el video a Gemini…');
        if (uploadedVideoFile.size <= INLINE_MAX) {
          const base64 = await new Promise<string>((ok, mal) => {
            const r = new FileReader();
            r.onload = () => ok(String(r.result).split(',')[1] ?? '');
            r.onerror = () => mal(new Error('No se pudo leer el archivo.'));
            r.readAsDataURL(uploadedVideoFile);
          });
          partes.push({ inlineData: { mimeType: uploadedVideoFile.type || 'video/mp4', data: base64 } });
        } else {
          if (uploadedVideoFile.size > SUBIDA_MAX) throw new Error(mensajeSubidaMax(uploadedVideoFile.size));
          const r = await fetch('/api/piezas/subir', { method: 'POST', headers: { 'Content-Type': 'application/octet-stream', 'x-mime-type': uploadedVideoFile.type || 'video/mp4' }, body: uploadedVideoFile });
          const j = await r.json().catch(() => ({}));
          if (!r.ok) throw new Error(j.error || `No se pudo subir el video (${r.status}).`);
          partes.push({ fileData: { fileUri: j.uri, mimeType: j.mimeType || uploadedVideoFile.type || 'video/mp4' } });
        }
        fuenteIA = 'Gemini vio el archivo de video completo (imagen y audio).';
      }

      setAnalysisStatus('Gemini está viendo el video…');
      const promptText = `Audita este video de ${candidateName || 'el candidato del perfil'}: tono, expresión oral, color e iluminación, encuadre y edición.
${videoContextNotes ? `Contexto que dio el equipo: "${videoContextNotes}"` : ''}
${medicion ? `\nMEDICIONES DEL ARCHIVO (hechas en el navegador sobre los píxeles; son datos, úsalas para color, tonalidad y ritmo de cortes):\n${medicionesEnTexto(medicion).join('\n')}` : ''}

REGLAS:
- Describe solo lo que ves y oyes en el video. Si algo no se puede juzgar (por ejemplo, no hay voz, el audio es malo o no aparece el candidato), escribe "Sin dato" en ese campo.
- Las palabras por minuto, las muletillas y las pausas se cuentan en el audio; si no las contaste, no las estimes.
- Los puntajes (0 a 100) son tu juicio, no una medición: dalos solo si puedes justificarlos; si no, null.
- Las recomendaciones siguen la voz, la imagen y los límites de la identidad del candidato y el marco.

Responde ÚNICAMENTE con un objeto JSON válido con esta estructura (sin texto fuera del JSON):
{
  "videoTitle": "", "tonoComunicacional": { "registroDominante": "", "descripcion": "", "nivelAsertividad": "", "conexionEmocional": "", "proyeccionLiderazgo": "" },
  "expresionOral": { "diccionVocalizacion": "", "cadenciaRitmo": "", "manejoPausasSilencios": "", "modulacionTono": "", "muletillasDetectadas": [], "recursosRetoricos": "", "diagnosticoVocal": "" },
  "coloracionIluminacion": { "temperaturaColor": "", "tipoIluminacion": "", "armoniaColorimetrica": "", "etalonajeSaturacion": "", "paletaDominanteHex": [] },
  "composicionEncuadre": { "tipoPlano": "", "anguloCamara": "", "estabilidadCamara": "", "fondoEntorno": "", "contactoVisualLenguaje": "" },
  "gradoEdicion": { "nivelProduccion": "Amateur / Orgánico | Intermedio / Creador Digital | Alta Producción / Agencia", "ritmoCortes": "", "recursosGraficosSubtitulos": "", "calidadAudioMicrofonia": "", "elementosDinamicos": "" },
  "fortalezas": [], "debilidades": [],
  "metricasScore": { "dominioEscenico": null, "claridadDiccion": null, "conexionEmocional": null, "calidadVisualComposicion": null, "ritmoEdicion": null, "controlMuletillas": null },
  "recomendacionesOratoria": [], "recomendacionesProduccion": [],
  "informeMarkdown": "dictamen completo en markdown"
}`;
      partes.push({ text: promptText });

      const response = await generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: partes }],
        config: { systemInstruction: 'Eres el analista audiovisual de Proteus. Escribe en español de Colombia, concreto y sin adornos.' },
        proteus: { tarea: 'evaluar' },
      });

      const rawText = response.text || '';
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('Gemini no devolvió el análisis en el formato esperado. Intenta de nuevo.');
      const parsed = JSON.parse(jsonMatch[0]);
      const SD = 'Sin dato';
      const txt = (o: Record<string, unknown> | undefined, k: string) => { const v = o?.[k]; return typeof v === 'string' && v.trim() ? v.trim() : SD; };
      const lista = (v: unknown) => (Array.isArray(v) ? v.filter((x) => typeof x === 'string' && x.trim()) : []) as string[];
      const num = (o: Record<string, unknown> | undefined, k: string) => { const v = o?.[k]; return typeof v === 'number' && Number.isFinite(v) ? Math.max(0, Math.min(100, Math.round(v))) : null; };
      const campos = <K extends string>(o: unknown, ks: K[]) => Object.fromEntries(ks.map((k) => [k, txt(o as Record<string, unknown>, k)])) as Record<K, string>;
      const ms = parsed.metricasScore as Record<string, unknown> | undefined;
      const fullResult: VideoAnalysisResult = {
        videoUrl: activeUrl || uploadedVideoFile?.name || 'Archivo local',
        platform: platformDetected,
        videoTitle: typeof parsed.videoTitle === 'string' && parsed.videoTitle.trim() ? parsed.videoTitle : (youtubeId ? `Video de YouTube ${youtubeId}` : uploadedVideoFile?.name ?? 'Video'),
        analyzedAt: new Date().toISOString(),
        tonoComunicacional: campos(parsed.tonoComunicacional, ['registroDominante', 'descripcion', 'nivelAsertividad', 'conexionEmocional', 'proyeccionLiderazgo']),
        expresionOral: { ...campos(parsed.expresionOral, ['diccionVocalizacion', 'cadenciaRitmo', 'manejoPausasSilencios', 'modulacionTono', 'recursosRetoricos', 'diagnosticoVocal']), muletillasDetectadas: lista(parsed.expresionOral?.muletillasDetectadas) },
        coloracionIluminacion: {
          ...campos(parsed.coloracionIluminacion, ['temperaturaColor', 'tipoIluminacion', 'armoniaColorimetrica', 'etalonajeSaturacion']),
          // Con archivo, la paleta es la MEDIDA; con YouTube, la que describe Gemini
          paletaDominanteHex: medicion ? medicion.paleta.map((c) => c.hex) : lista(parsed.coloracionIluminacion?.paletaDominanteHex).filter((h) => /^#[0-9a-f]{6}$/i.test(h)),
        },
        composicionEncuadre: campos(parsed.composicionEncuadre, ['tipoPlano', 'anguloCamara', 'estabilidadCamara', 'fondoEntorno', 'contactoVisualLenguaje']),
        gradoEdicion: campos(parsed.gradoEdicion, ['nivelProduccion', 'ritmoCortes', 'recursosGraficosSubtitulos', 'calidadAudioMicrofonia', 'elementosDinamicos']),
        fortalezas: lista(parsed.fortalezas),
        debilidades: lista(parsed.debilidades),
        metricasScore: {
          dominioEscenico: num(ms, 'dominioEscenico'), claridadDiccion: num(ms, 'claridadDiccion'), conexionEmocional: num(ms, 'conexionEmocional'),
          calidadVisualComposicion: num(ms, 'calidadVisualComposicion'), ritmoEdicion: num(ms, 'ritmoEdicion'), controlMuletillas: num(ms, 'controlMuletillas'),
        },
        recomendacionesOratoria: lista(parsed.recomendacionesOratoria),
        recomendacionesProduccion: lista(parsed.recomendacionesProduccion),
        informeMarkdown: typeof parsed.informeMarkdown === 'string' ? parsed.informeMarkdown : rawText,
        fuenteIA,
        medicionLocal: medicion ? medicionesEnTexto(medicion) : undefined,
      };
      setAnalysisResult(fullResult);
      setAnalysisStatus('Análisis terminado.');
    } catch (err: unknown) {
      console.warn('Error in video analysis with Gemini:', err);
      const errMsg = err instanceof Error ? err.message : String(err);
      setAnalysisError(/429|quota|RESOURCE_EXHAUSTED/i.test(errMsg) ? formatAiError(err) : errMsg);
      setAnalysisStatus('');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Sync / Apply findings into Candidate Profile
  const handleApplyFindingsToProfile = () => {
    if (!analysisResult) return;

    const suggestedNarrative = `${analysisResult.tonoComunicacional.registroDominante} — ${analysisResult.tonoComunicacional.descripcion.slice(0, 140)}`;
    const suggestedStyle = `Oratoria: ${analysisResult.expresionOral.diccionVocalizacion.slice(0, 100)}. Cadencia: ${analysisResult.expresionOral.cadenciaRitmo.slice(0, 80)}. Nivel de Producción: ${analysisResult.gradoEdicion.nivelProduccion}.`;
    const suggestedAvoid = `En cámara y oratoria: Evitar muletillas detectadas (${analysisResult.expresionOral.muletillasDetectadas.join(', ') || 'ninguna detectada'}). Corregir: ${analysisResult.debilidades.slice(0, 2).join('; ')}.`;

    if (onApplyToProfile) {
      onApplyToProfile({
        tonoNarrativo: suggestedNarrative,
        estiloComunicacion: suggestedStyle,
        quEvitar: suggestedAvoid,
        videoAnalysisResult: analysisResult
      });
    }

    setIsAppliedSuccessfully(true);
    setTimeout(() => setIsAppliedSuccessfully(false), 6000);
  };

  // Export Auditoría Audiovisual as formal PDF
  const handleDownloadVideoAuditPDF = () => {
    if (!analysisResult) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const primaryColor = [15, 23, 42]; // #0F172A
    const accentColor = [225, 29, 72]; // #E11D48
    const blueColor = [37, 99, 235]; // #2563EB

    // Header Background
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 36, 'F');

    // Header Accent Line
    doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
    doc.rect(0, 36, 210, 2, 'F');

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('PROTEUS NACIONAL — CMT CONSULTORA', 14, 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.text('DICTAMEN DE ANÁLISIS AUDIOVISUAL, EXPRESIÓN ORAL Y MEDIA-TRAINING', 14, 23);
    doc.text(`Candidato: ${candidateName} | Plataforma: ${analysisResult.platform.toUpperCase()} | Fecha: ${new Date().toLocaleDateString('es-CO')}`, 14, 30);

    let currentY = 44;

    // Video Meta Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, currentY, 182, 24, 3, 3, 'FD');

    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(`Video Evaluado: ${analysisResult.videoTitle || 'Pieza Audiovisual'}`, 18, currentY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Fuente: ${analysisResult.videoUrl.slice(0, 85)}`, 18, currentY + 14);
    doc.text(`Nivel de Producción: ${analysisResult.gradoEdicion.nivelProduccion} | Registro Dominante: ${analysisResult.tonoComunicacional.registroDominante}`, 18, currentY + 19);

    currentY += 30;

    // Scorecards Summary
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('1. PUNTAJES DE LA IA (0 a 100; juicio de Gemini, no medición)', 14, currentY);

    currentY += 6;
    const scores = [
      { label: 'Dominio Escénico', val: analysisResult.metricasScore.dominioEscenico },
      { label: 'Claridad & Dicción', val: analysisResult.metricasScore.claridadDiccion },
      { label: 'Conexión Emocional', val: analysisResult.metricasScore.conexionEmocional },
      { label: 'Composición Visual', val: analysisResult.metricasScore.calidadVisualComposicion },
      { label: 'Ritmo & Edición', val: analysisResult.metricasScore.ritmoEdicion },
      { label: 'Control Muletillas', val: analysisResult.metricasScore.controlMuletillas }
    ];

    scores.forEach((s, idx) => {
      const col = idx % 2;
      const row = Math.floor(idx / 2);
      const x = 14 + col * 92;
      const y = currentY + row * 10;

      doc.setFillColor(241, 245, 249);
      doc.roundedRect(x, y, 88, 8, 2, 2, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      doc.text(`${s.label}:`, x + 3, y + 5.5);

      doc.setFont('helvetica', 'bold');
      const ok = s.val != null && s.val >= 80;
      doc.setTextColor(ok ? 37 : 225, ok ? 99 : 29, ok ? 235 : 72);
      doc.text(s.val == null ? 'Sin dato' : `${s.val}`, x + 68, y + 5.5);
    });

    currentY += 36;

    // Fortalezas y Debilidades Dual Column
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('2. BALANCE CRÍTICO: FORTALEZAS VS. DEBILIDADES DE ORATORIA', 14, currentY);

    currentY += 6;

    // Fortalezas Column
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(187, 247, 208);
    doc.roundedRect(14, currentY, 88, 54, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(22, 101, 52);
    doc.text('Fortalezas Destacadas (+)', 18, currentY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(21, 128, 61);
    let fY = currentY + 14;
    analysisResult.fortalezas.slice(0, 4).forEach((f) => {
      const wrapped = doc.splitTextToSize(`• ${f}`, 80);
      doc.text(wrapped, 18, fY);
      fY += wrapped.length * 4;
    });

    // Debilidades Column
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(254, 202, 202);
    doc.roundedRect(108, currentY, 88, 54, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(153, 27, 27);
    doc.text('Debilidades & Riesgos (-)', 112, currentY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(185, 28, 28);
    let dY = currentY + 14;
    analysisResult.debilidades.slice(0, 4).forEach((d) => {
      const wrapped = doc.splitTextToSize(`• ${d}`, 80);
      doc.text(wrapped, 112, dY);
      dY += wrapped.length * 4;
    });

    currentY += 60;

    // Tono, Expresión Oral y Producción
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('3. DESGLOSE TÉCNICO Y COMUNICACIONAL', 14, currentY);

    currentY += 6;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, currentY, 182, 60, 3, 3, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Tono Comunicacional & Asertividad:', 18, currentY + 8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`${analysisResult.tonoComunicacional.registroDominante} — ${analysisResult.tonoComunicacional.descripcion.slice(0, 100)}`, 18, currentY + 13);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Expresion Oral, Diccion y Cadencia:', 18, currentY + 22);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`${analysisResult.expresionOral.diccionVocalizacion.slice(0, 110)} | Cadencia: ${analysisResult.expresionOral.cadenciaRitmo.slice(0, 60)}`, 18, currentY + 27);
    doc.text(`Muletillas detectadas: ${analysisResult.expresionOral.muletillasDetectadas.join(', ') || 'Ninguna predominante'}`, 18, currentY + 32);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text('Coloracion, Iluminacion y Composicion:', 18, currentY + 41);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(71, 85, 105);
    doc.text(`Iluminacion: ${analysisResult.coloracionIluminacion.tipoIluminacion.slice(0, 60)} | Plano: ${analysisResult.composicionEncuadre.tipoPlano}`, 18, currentY + 46);
    doc.text(`Edicion: ${analysisResult.gradoEdicion.ritmoCortes.slice(0, 70)} | Calidad Sonora: ${analysisResult.gradoEdicion.calidadAudioMicrofonia.slice(0, 50)}`, 18, currentY + 51);

    currentY += 66;

    // Footer
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Proteus Nacional — Módulo de Inteligencia Audiovisual & Media Training. Documento de uso estratégico interno de campaña.', 14, 288);

    doc.save(`Auditoria_Audiovisual_${candidateName.replace(/\s+/g, '_')}_Proteus.pdf`);
  };

  return (
    <div className={`bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-rose-200/80 ring-2 ring-rose-500/10 transition-all ${className}`}>
      
      {/* Header with Sub-Tool Identity */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-gradient-to-br from-rose-600 to-red-700 text-white rounded-2xl shadow-md shadow-rose-200">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">
                Subherramienta: Auditoría Audiovisual & Expresión Oral en Video Externo
              </h3>
              <span className="bg-rose-100 text-rose-700 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-rose-200">
                YouTube & Instagram
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Procesa videos externos para extraer tono comunicacional, expresión oral, coloración, composición, grado de edición y balance de fortalezas/debilidades.
            </p>
          </div>
        </div>

        {analysisResult && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadVideoAuditPDF}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Descargar dictamen audiovisual membretado"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar PDF</span>
            </button>
            <button
              onClick={handleApplyFindingsToProfile}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-200"
              title="Inyectar hallazgos directamente al Perfil del Candidato"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Sincronizar con Perfil</span>
            </button>
          </div>
        )}
      </div>

      {/* Input Control Center */}
      <div className="mt-6 space-y-5">
        
        {/* Source Switcher: URL vs File Upload */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white/[0.04] backdrop-blur-sm border border-white/10 p-2 rounded-2xl border border-white/10">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setVideoSourceType('url')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                videoSourceType === 'url'
                  ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-rose-700 shadow-sm border border-white/10'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Enlace Externo (YouTube / Instagram / TikTok)</span>
            </button>

            <button
              type="button"
              onClick={() => setVideoSourceType('file')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                videoSourceType === 'file'
                  ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-rose-700 shadow-sm border border-white/10'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Cargar Archivo Local (.mp4 / .webm)</span>
            </button>
          </div>

        </div>

        {/* Input Fields depending on Mode */}
        {videoSourceType === 'url' ? (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Enlace público de YouTube (https://www.youtube.com/watch?v=…). Instagram y TikTok: sube el archivo."
                  className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-slate-300 rounded-2xl px-4 py-3 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-rose-500 pr-10"
                />
                {videoUrl && (
                  <button
                    type="button"
                    onClick={() => setVideoUrl('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 text-xs font-bold p-1 cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={handleExecuteVideoAnalysis}
                disabled={isAnalyzing || !videoUrl.trim()}
                className="bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 disabled:opacity-50 text-white text-xs font-bold px-7 py-3 rounded-2xl transition-all shadow-md shadow-rose-200 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Auditando Video...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Auditar Video con IA</span>
                  </>
                )}
              </button>
            </div>

            {/* Context & Notes Accordion */}
            <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-3.5 rounded-2xl border border-white/10/80">
              <label className="text-[11px] font-bold text-slate-300 uppercase flex items-center gap-1.5 mb-1">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                Notas de contexto, minuto clave o transcripción opcional (Recomendado):
              </label>
              <textarea
                value={videoContextNotes}
                onChange={(e) => setVideoContextNotes(e.target.value)}
                rows={2}
                placeholder="Ej: Intervención en el debate televisivo a partir del minuto 02:15, tema de seguridad ciudadana y empleo juvenil en Antioquia..."
                className="w-full bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="border-2 border-dashed border-rose-200 rounded-2xl p-6 text-center bg-rose-50/30 hover:bg-rose-50/60 transition-all relative">
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleVideoFileChange}
                disabled={isAnalyzing}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shadow-inner">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">
                    {uploadedVideoFile ? uploadedVideoFile.name : 'Haz clic o arrastra un archivo de video (.mp4, .webm, .mov)'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Se mide en el navegador (paleta, tonalidad, cortes) y Gemini ve el video completo con audio, si la identidad lo permite.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                {capturedFrames.length > 0 ? `✓ ${capturedFrames.length} fotogramas extraídos listos para análisis multimodal.` : 'Esperando selección de archivo.'}
              </span>

              <button
                type="button"
                onClick={handleExecuteVideoAnalysis}
                disabled={isAnalyzing || (!uploadedVideoFile && !videoBlobUrl)}
                className="bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 disabled:opacity-50 text-white text-xs font-bold px-7 py-3 rounded-2xl transition-all shadow-md shadow-rose-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Auditando Video...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Auditar Video Local con IA</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Video Player & Frame Preview Section */}
        {(youtubeId || instagramId || videoBlobUrl || capturedFrames.length > 0) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
            
            {/* Embedded Player */}
            <div className="lg:col-span-2 bg-slate-900 rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center shadow-md">
              {youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
                  title="Reproductor de Video de YouTube"
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : videoBlobUrl ? (
                <video
                  src={videoBlobUrl}
                  controls
                  className="w-full h-full object-contain bg-black"
                />
              ) : instagramId ? (
                <div className="p-6 text-center text-white space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center mx-auto shadow-lg">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Video / Reel de Instagram Detectado</h5>
                    <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                      Identificador: <strong>{instagramId}</strong>. Puedes visualizarlo en Instagram o iniciar la auditoría con IA.
                    </p>
                  </div>
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 hover:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/20 text-white rounded-xl text-xs font-semibold backdrop-blur-sm transition-all"
                  >
                    <span>Abrir en Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ) : (
                <div className="text-slate-400 text-xs flex items-center gap-2">
                  <Film className="w-5 h-5" />
                  <span>Enlace de video listo para ser auditado</span>
                </div>
              )}
            </div>

            {/* Visual Specs / Frame Thumbnails */}
            <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-rose-600" />
                  <span className="text-xs font-bold text-white uppercase tracking-wide">
                    Encuadre & Captura
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Gemini analiza simultáneamente la cadencia acústica, microfonía, relación de aspecto, temperatura cromática y microgestos faciales.
                </p>

                {capturedFrames.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-1.5">
                    {capturedFrames.map((f, i) => (
                      <div key={i} className="aspect-video rounded-lg overflow-hidden border border-slate-300 shadow-xs">
                        <img src={f} alt={`Frame ${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-3 rounded-xl border border-white/10 text-[11px] space-y-1 text-slate-300">
                <div className="flex justify-between font-semibold">
                  <span>Plataforma:</span>
                  <span className="text-white capitalize">{detectedPlatform()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Estado de Calibración:</span>
                  <span className={analysisResult ? 'text-emerald-600 font-bold' : 'text-amber-600'}>
                    {analysisResult ? 'Auditado con Éxito' : 'Pendiente de Auditoría'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Status Alerts */}
        {analysisStatus && (
          <div className="bg-sky-500/10 text-blue-900 border border-blue-200 p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{analysisStatus}</span>
          </div>
        )}

        {analysisError && (
          <div className="bg-red-50 text-red-800 border border-red-200 p-4 rounded-2xl text-xs font-semibold flex items-start gap-2.5 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span>{analysisError}</span>
          </div>
        )}

        {isAppliedSuccessfully && (
          <div className="bg-emerald-500/10 text-emerald-900 border border-emerald-300 p-4 rounded-2xl text-xs font-bold flex items-center gap-2.5 animate-in fade-in shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              ¡Hallazgos audiovisuales sincronizados con éxito en el Perfil del Candidato! Se calibraron el tono narrativo, estilo discursivo y directivas de oratoria.
            </span>
          </div>
        )}

      </div>

      {/* Complete Analysis Visualizer Dashboard */}
      {analysisResult && (
        <div className="mt-8 pt-6 border-t border-white/10 space-y-6 animate-in fade-in duration-300">
          
          {/* Top Scorecard Metrics */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-rose-600" />
                Puntajes de la IA (juicio de Gemini, no medición)
              </h4>
              <span className="text-[11px] text-slate-400">{analysisResult.fuenteIA ?? 'Análisis anterior: no consta qué vio Gemini'}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Dominio Escénico', score: analysisResult.metricasScore.dominioEscenico, icon: Award, color: 'text-amber-600 bg-amber-500/10 border-amber-200' },
                { label: 'Claridad & Dicción', score: analysisResult.metricasScore.claridadDiccion, icon: Mic, color: 'text-blue-600 bg-sky-500/10 border-blue-200' },
                { label: 'Conexión Emocional', score: analysisResult.metricasScore.conexionEmocional, icon: HeartPulseIcon, color: 'text-rose-600 bg-rose-50 border-rose-200' },
                { label: 'Composición Visual', score: analysisResult.metricasScore.calidadVisualComposicion, icon: Eye, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
                { label: 'Ritmo & Edición', score: analysisResult.metricasScore.ritmoEdicion, icon: Scissors, color: 'text-purple-600 bg-purple-50 border-purple-200' },
                { label: 'Control Muletillas', score: analysisResult.metricasScore.controlMuletillas, icon: ShieldAlert, color: 'text-emerald-600 bg-emerald-500/10 border-emerald-200' }
              ].map((m, idx) => {
                const IconComp = m.icon;
                return (
                  <div key={idx} className={`p-3.5 rounded-2xl border ${m.color} flex flex-col justify-between space-y-2`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 line-clamp-1">{m.label}</span>
                      <IconComp className="w-4 h-4 shrink-0" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-white">{m.score ?? '—'}</span>
                      <span className="text-[10px] font-bold text-slate-400">{m.score == null ? 'Sin dato' : '/ 100'}</span>
                    </div>
                    <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-current h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(0, m.score ?? 0))}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Tabs for Deep Inspection */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto border border-white/10">
            {[
              { id: 'resumen', label: 'Resumen Ejecutivo & Dictamen' },
              { id: 'oratoria', label: 'Tono & Expresión Oral' },
              { id: 'visual', label: 'Coloración & Composición' },
              { id: 'edicion', label: 'Grado de Edición & Ritmo' },
              { id: 'balance', label: 'Fortalezas & Debilidades' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveAnalysisTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeAnalysisTab === tab.id
                    ? 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl text-white shadow-sm border border-white/10'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Resumen Ejecutivo & Dictamen */}
          {activeAnalysisTab === 'resumen' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-wider">Registro Dominante</span>
                  </div>
                  <h5 className="text-base font-black text-white">
                    {analysisResult.tonoComunicacional.registroDominante}
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {analysisResult.tonoComunicacional.descripcion}
                  </p>
                </div>

                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Mic className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-wider">Vocalización & Dicción</span>
                  </div>
                  <h5 className="text-base font-black text-white">
                    {analysisResult.expresionOral.cadenciaRitmo}
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {analysisResult.expresionOral.diccionVocalizacion}
                  </p>
                </div>

                <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-purple-700">
                    <Film className="w-4 h-4" />
                    <span className="text-xs font-black uppercase tracking-wider">Puesta en Escena</span>
                  </div>
                  <h5 className="text-base font-black text-white">
                    {analysisResult.gradoEdicion.nivelProduccion}
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {analysisResult.composicionEncuadre.tipoPlano} • {analysisResult.composicionEncuadre.anguloCamara} • {analysisResult.coloracionIluminacion.temperaturaColor}.
                  </p>
                </div>

              </div>

              {/* Actionable Recommendations Quick Banner */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-3xl space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h5 className="text-sm font-bold tracking-tight">Plan de Acción Inmediato de Media-Training</h5>
                  </div>
                  <span className="text-[10px] bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/10 px-2.5 py-1 rounded-full text-slate-300 font-medium">
                    Recomendaciones Específicas
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/5 p-4 rounded-2xl border border-white/10 space-y-2">
                    <span className="text-[10px] font-black uppercase text-amber-300 block">
                      Para el Candidato (Oratoria & Presencia):
                    </span>
                    <ul className="space-y-1.5 text-slate-200">
                      {analysisResult.recomendacionesOratoria.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/5 p-4 rounded-2xl border border-white/10 space-y-2">
                    <span className="text-[10px] font-black uppercase text-blue-300 block">
                      Para el Equipo Audiovisual (Cámara & Postproducción):
                    </span>
                    <ul className="space-y-1.5 text-slate-200">
                      {analysisResult.recomendacionesProduccion.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Tono & Expresión Oral */}
          {activeAnalysisTab === 'oratoria' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 rounded-2xl border border-white/10 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-rose-700">
                    <Mic className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-wider text-[11px]">Tono y Conexión Emocional</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Nivel de Asertividad</span>
                      <p className="font-semibold text-white text-sm">{analysisResult.tonoComunicacional.nivelAsertividad}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Conexión Emocional con el Elector</span>
                      <p className="font-semibold text-white text-sm">{analysisResult.tonoComunicacional.conexionEmocional}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Proyección de Liderazgo</span>
                      <p className="font-medium text-slate-200">{analysisResult.tonoComunicacional.proyeccionLiderazgo}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 rounded-2xl border border-white/10 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Volume2 className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-wider text-[11px]">Dicción, Cadencia & Modulación</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Manejo de Pausas y Silencios</span>
                      <p className="font-medium text-slate-200">{analysisResult.expresionOral.manejoPausasSilencios}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Modulación y Tono de Voz</span>
                      <p className="font-medium text-slate-200">{analysisResult.expresionOral.modulacionTono}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Recursos Retóricos Empleados</span>
                      <p className="font-medium text-slate-200">{analysisResult.expresionOral.recursosRetoricos}</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Muletillas & Vicios Alert Box */}
              <div className="bg-amber-500/10/80 border border-amber-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold text-amber-950 block">Detección de Muletillas y Vicios del Habla:</span>
                    <span className="text-amber-800">
                      {analysisResult.expresionOral.muletillasDetectadas && analysisResult.expresionOral.muletillasDetectadas.length > 0
                        ? `Muletillas registradas en el discurso: ${analysisResult.expresionOral.muletillasDetectadas.map(m => `"${m}"`).join(', ')}.`
                        : 'No se detectaron muletillas críticas de alta frecuencia.'}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 font-bold text-[11px] bg-amber-500/20 text-amber-300 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-300">
                  Puntaje IA: {analysisResult.metricasScore.controlMuletillas ?? 'Sin dato'}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Coloración & Composición */}
          {activeAnalysisTab === 'visual' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* Coloración e Iluminación */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 rounded-2xl border border-white/10 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-indigo-700">
                    <Palette className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-wider text-[11px]">Coloración & Etalonaje</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Temperatura de Color</span>
                      <p className="font-semibold text-white">{analysisResult.coloracionIluminacion.temperaturaColor}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Tipo y Calidad de Iluminación</span>
                      <p className="font-medium text-slate-200">{analysisResult.coloracionIluminacion.tipoIluminacion}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Armonía Colorimétrica</span>
                      <p className="font-medium text-slate-200">{analysisResult.coloracionIluminacion.armoniaColorimetrica}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Etalonaje y Saturación</span>
                      <p className="font-medium text-slate-200">{analysisResult.coloracionIluminacion.etalonajeSaturacion}</p>
                    </div>
                  </div>

                  {/* Dominant Palette Swatches in Video */}
                  {analysisResult.coloracionIluminacion.paletaDominanteHex && analysisResult.coloracionIluminacion.paletaDominanteHex.length > 0 && (
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">
                        Paleta dominante · {analysisResult.medicionLocal ? 'medida en el archivo' : 'descrita por la IA (no medida)'}:
                      </span>
                      <div className="flex items-center gap-2">
                        {analysisResult.coloracionIluminacion.paletaDominanteHex.map((hex, i) => (
                          <div key={i} className="flex items-center gap-1.5 bg-white/[0.04] backdrop-blur-sm border border-white/10 border border-white/10 rounded-lg p-1 pr-2">
                            <div className="w-4 h-4 rounded-md shadow-xs" style={{ backgroundColor: hex }} />
                            <span className="font-mono text-[10px] font-bold text-slate-200">{hex}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Composición y Encuadre */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-5 rounded-2xl border border-white/10 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-rose-700">
                    <Eye className="w-4 h-4" />
                    <span className="font-bold uppercase tracking-wider text-[11px]">Composición & Lenguaje Visual</span>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Tipo de Plano</span>
                      <p className="font-semibold text-white">{analysisResult.composicionEncuadre.tipoPlano}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Ángulo de Cámara & Perspectiva</span>
                      <p className="font-medium text-slate-200">{analysisResult.composicionEncuadre.anguloCamara}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Estabilidad y Soporte de Cámara</span>
                      <p className="font-medium text-slate-200">{analysisResult.composicionEncuadre.estabilidadCamara}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Fondo y Escenografía</span>
                      <p className="font-medium text-slate-200">{analysisResult.composicionEncuadre.fondoEntorno}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Contacto Visual y Gestos</span>
                      <p className="font-medium text-slate-200">{analysisResult.composicionEncuadre.contactoVisualLenguaje}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 4: Grado de Edición & Ritmo */}
          {activeAnalysisTab === 'edicion' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <Scissors className="w-5 h-5 text-purple-600" />
                    <div>
                      <h5 className="font-bold text-sm text-white">Diagnóstico de Postproducción Audiovisual</h5>
                      <span className="text-xs text-slate-400">Evaluación de cortes, ritmo, grafismos y sonorización</span>
                    </div>
                  </div>

                  <span className="self-start sm:self-auto px-3 py-1 bg-purple-100 text-purple-800 font-bold text-xs rounded-xl border border-purple-200">
                    Nivel: {analysisResult.gradoEdicion.nivelProduccion}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-xl border border-white/10/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Ritmo de Cortes & Montaje</span>
                    <p className="font-medium text-white">{analysisResult.gradoEdicion.ritmoCortes}</p>
                  </div>

                  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-xl border border-white/10/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Recursos Gráficos & Subtítulos Dinámicos</span>
                    <p className="font-medium text-white">{analysisResult.gradoEdicion.recursosGraficosSubtitulos}</p>
                  </div>

                  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-xl border border-white/10/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Calidad de Audio & Microfonía</span>
                    <p className="font-medium text-white">{analysisResult.gradoEdicion.calidadAudioMicrofonia}</p>
                  </div>

                  <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-xl border border-white/10/80 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Elementos Dinámicos (B-roll, Zooms, Música)</span>
                    <p className="font-medium text-white">{analysisResult.gradoEdicion.elementosDinamicos}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Balance de Fortalezas & Debilidades */}
          {activeAnalysisTab === 'balance' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Fortalezas Card */}
                <div className="bg-emerald-500/10/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <ThumbsUp className="w-5 h-5 text-emerald-600" />
                    <h5 className="font-bold text-sm">Fortalezas de la Expresión Oral y Comunicacional</h5>
                  </div>
                  <ul className="space-y-2 text-xs text-emerald-950 font-medium">
                    {analysisResult.fortalezas.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/80 p-2.5 rounded-xl border border-emerald-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Debilidades Card */}
                <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800">
                    <ThumbsDown className="w-5 h-5 text-rose-600" />
                    <h5 className="font-bold text-sm">Debilidades & Áreas Críticas de Mejora</h5>
                  </div>
                  <ul className="space-y-2 text-xs text-rose-950 font-medium">
                    {analysisResult.debilidades.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/80 p-2.5 rounded-xl border border-rose-100">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          )}

          {/* Footer Call to Action Bar */}
          <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 p-4 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Auditoría lista. Puedes sincronizarla con el perfil o recalibrar ingresando un nuevo video.
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleApplyFindingsToProfile}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Aplicar al Perfil de {candidateName}</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Hidden elements for canvas frame processing */}
      <video ref={hiddenVideoRef} className="hidden" />
      <canvas ref={hiddenCanvasRef} className="hidden" />
    </div>
  );
};

// Simple HeartPulse alternative icon if not imported
function HeartPulseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5v14" />
      <path d="M9 12h6" />
    </svg>
  );
}

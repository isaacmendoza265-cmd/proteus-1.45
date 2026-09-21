import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  UserCheck, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  User,
  Shield,
  Palette,
  Briefcase,
  Megaphone,
  RefreshCw,
  Search,
  Globe,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { CandidateProfile, DEFAULT_ISAAC_MENDOZA_PROFILE } from './CandidateProfileManager';
import { ai, callGeminiApi, formatAiError } from '../services/geminiService';

export type { CandidateProfile };

interface CandidateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateProfile: CandidateProfile | null;
  onSaveProfile: (profile: CandidateProfile) => void;
}

type ModalTab = 'google-search' | 'manual-edit' | 'pdf-upload';

export const CandidateProfileModal: React.FC<CandidateProfileModalProps> = ({
  isOpen,
  onClose,
  candidateProfile,
  onSaveProfile,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>('google-search');
  
  // Local form state initialized from candidateProfile
  const [formData, setFormData] = useState<CandidateProfile>(() => {
    return candidateProfile || DEFAULT_ISAAC_MENDOZA_PROFILE;
  });

  // Search input state
  const [searchCandidateName, setSearchCandidateName] = useState(candidateProfile?.nombre || '');
  const [isSearchingGoogle, setIsSearchingGoogle] = useState(false);

  // PDF upload state
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  if (!isOpen) return null;

  // 1. Google Search Auto-Discovery Tool
  const handleSearchWithGoogle = async () => {
    const query = searchCandidateName.trim();
    if (!query) {
      setIsError(true);
      setStatusMessage("Por favor ingresa el nombre y apellido del candidato a localizar.");
      return;
    }

    setIsSearchingGoogle(true);
    setIsError(false);
    setStatusMessage(`Localizando y analizando perfil público de "${query}" con Google Search y Gemini 3.8 Flash...`);

    try {
      const promptText = `Actúa como un analista senior de inteligencia electoral y consultor político.
Investiga en la web mediante Google Search el perfil público, trayectoria política, partido, ocupación, formación y postura pública de: **${query}** en Colombia o su respectiva circunscripción.

Debes responder ÚNICAMENTE en formato JSON plano con los siguientes campos exactos (sin marcas markdown adicionales fuera del bloque JSON):
{
  "nombre": "${query}",
  "afiliacionPartidista": "Partido político, movimiento o coalición visible",
  "experienciaPrevia": "Síntesis de cargos públicos previos, elecciones anteriores o activismo",
  "formacionOcupacion": "Formación académica y profesión principal",
  "tonoNarrativo": "Tono discursivo dominante (ej: Firme e institucional / Técnico y pragmático / Cercano y comunitario)",
  "estiloComunicacion": "Estilo comunicativo principal (ej: Asertivo y pedagógico / Confrontacional)",
  "ejeTematicoComodo": "Ejes temáticos en los que demuestra mayor soltura y credibilidad",
  "reconocimientoNombre": "Grado de reconocimiento público (Departamental / Municipal / En consolidación)",
  "relacionEstructurasLocales": "Relación con líderes barriales, gremios o estructuras territoriales",
  "resumenEstrategico": "Síntesis estratégica de valor electoral para conectar con los electores"
}`;

      let rawResponse = "";
      try {
        const geminiRes = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
          config: {
            tools: [{ googleSearch: {} }]
          }
        });
        rawResponse = geminiRes.text || "";
      } catch (searchErr) {
        // Fallback to callGeminiApi with search flag
        rawResponse = await callGeminiApi({
          promptText,
          useSearch: true,
          systemInstruction: "Extrae el perfil político del candidato investigando en Google Search y devuelve únicamente un JSON válido."
        });
      }

      const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        const updated: CandidateProfile = {
          ...formData,
          ...parsed,
          nombre: parsed.nombre || query,
          updatedAt: new Date().toISOString()
        };
        setFormData(updated);
        setIsError(false);
        setStatusMessage(`¡Perfil de "${updated.nombre}" autocompletado con éxito desde Google Search! Puedes revisar los datos en la pestaña de Edición Manual.`);
        // Switch to manual edit so user can review and refine
        setActiveTab('manual-edit');
      } else {
        setIsError(true);
        setStatusMessage(`Se consultó Google Search pero no se obtuvo una estructura clara. Se actualizó el nombre a "${query}".`);
        setFormData(prev => ({ ...prev, nombre: query }));
      }
    } catch (err: any) {
      setIsError(true);
      setStatusMessage(formatAiError(err));
    } finally {
      setIsSearchingGoogle(false);
    }
  };

  // 2. Handle PDF file extraction
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setIsError(true);
      setStatusMessage("Por favor selecciona un archivo en formato PDF (.pdf).");
      return;
    }

    setIsUploadingPdf(true);
    setIsError(false);
    setStatusMessage(`Leyendo "${file.name}" con Inteligencia Artificial multimodal...`);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const resultStr = reader.result as string;
          const base64Data = resultStr.split(',')[1];

          const promptText = `Analiza este documento PDF que contiene el perfil o propuesta de un candidato político.
Extrae la información estratégica y responde estrictamente en formato JSON plano:
{
  "nombre": "Nombre completo del candidato",
  "rangoEdad": "Rango de edad aproximado",
  "sexo": "Hombre / Mujer",
  "tonoNarrativo": "Tono discursivo y estilo",
  "lugarResidencia": "Municipio o departamento de residencia",
  "experienciaPrevia": "Cargos públicos o trayectoria",
  "afiliacionPartidista": "Partido político o movimiento",
  "formacionOcupacion": "Profesión y estudios",
  "estiloComunicacion": "Estilo de comunicación",
  "ejeTematicoComodo": "Temas fuertes o propuestas centrales",
  "resumenEstrategico": "Síntesis del perfil de campaña"
}`;

          const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    inlineData: {
                      data: base64Data,
                      mimeType: 'application/pdf'
                    }
                  },
                  { text: promptText }
                ]
              }
            ]
          });

          const rawText = response.text || "";
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            const updated: CandidateProfile = {
              ...formData,
              ...parsed,
              uploadedFileName: file.name,
              updatedAt: new Date().toISOString()
            };
            setFormData(updated);
            setIsError(false);
            setStatusMessage(`¡Perfil extraído exitosamente desde "${file.name}"!`);
            setActiveTab('manual-edit');
          } else {
            setFormData(prev => ({
              ...prev,
              nombre: file.name.replace(/\.[^/.]+$/, ""),
              uploadedFileName: file.name
            }));
            setIsError(false);
            setStatusMessage(`Archivo procesado. Revisa los campos en Edición Manual.`);
          }
        } catch (innerErr: any) {
          setIsError(true);
          setStatusMessage(formatAiError(innerErr));
        } finally {
          setIsUploadingPdf(false);
        }
      };
    } catch (err: any) {
      setIsError(true);
      setStatusMessage("Error al abrir el archivo PDF.");
      setIsUploadingPdf(false);
    }
  };

  // 3. Reset to Blank (New Profile)
  const handleResetToBlank = () => {
    const blankProfile: CandidateProfile = {
      id: `profile_${Date.now()}`,
      email: "candidato@campana.com",
      nombre: "Nuevo Candidato",
      afiliacionPartidista: "Independiente",
      tonoNarrativo: "Firme, cercano y transparente",
      estiloComunicacion: "Asertivo y directo",
      ejeTematicoComodo: "Seguridad, empleo y buen gobierno",
      experienciaPrevia: "",
      relacionEstructurasLocales: "",
      formacionOcupacion: "",
      presenciaRedes: "",
      reconocimientoNombre: "En consolidación",
      accesoMedios: "",
      resumenEstrategico: "Liderazgo renovador enfocado en soluciones ciudadanas concretas.",
      lugarResidencia: "Antioquia, Colombia",
      updatedAt: new Date().toISOString()
    };
    setFormData(blankProfile);
    setSearchCandidateName("Nuevo Candidato");
    setStatusMessage("Perfil restablecido a formulario en blanco. Puedes editar todos sus datos.");
    setIsError(false);
  };

  // 4. Reset to Isaac Mendoza Default
  const handleLoadIsaacMendoza = () => {
    setFormData(DEFAULT_ISAAC_MENDOZA_PROFILE);
    setSearchCandidateName(DEFAULT_ISAAC_MENDOZA_PROFILE.nombre);
    setStatusMessage("Perfil de muestra de Isaac Mendoza cargado.");
    setIsError(false);
  };

  // 5. Save and propagate across all Proteus
  const handleSaveAndApply = () => {
    if (!formData.nombre.trim()) {
      setIsError(true);
      setStatusMessage("El nombre del candidato no puede estar vacío.");
      return;
    }
    const finalProfile: CandidateProfile = {
      ...formData,
      updatedAt: new Date().toISOString()
    };
    onSaveProfile(finalProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900/90 backdrop-blur-3xl border border-white/20 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1.5px_2px_rgba(255,255,255,0.4)] w-full max-w-4xl overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Header with Glassmorphism */}
        <div className="bg-gradient-to-r from-sky-950/80 via-indigo-950/80 to-slate-950/90 p-6 border-b border-white/15 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400/20 to-sky-500/20 border border-amber-400/40 flex items-center justify-center p-2 shadow-lg shadow-amber-500/10">
              <UserCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-amber-400 uppercase bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  Principio de Personalización Total
                </span>
                <span className="text-[10px] font-mono text-slate-300">
                  Cualquier Candidato / Circunscripción
                </span>
              </div>
              <h2 className="text-xl lg:text-2xl font-black text-white tracking-tight mt-0.5">
                Personalización del Candidato
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 transition cursor-pointer"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/15 bg-slate-950/50 px-6 gap-2 pt-3">
          <button
            onClick={() => setActiveTab('google-search')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs font-bold transition border-t border-x ${
              activeTab === 'google-search'
                ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]'
                : 'text-slate-400 hover:text-white border-transparent hover:bg-white/05'
            }`}
          >
            <Globe className="w-4 h-4 text-sky-400" />
            <span>1. Localizar con Google Search</span>
          </button>

          <button
            onClick={() => setActiveTab('manual-edit')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs font-bold transition border-t border-x ${
              activeTab === 'manual-edit'
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]'
                : 'text-slate-400 hover:text-white border-transparent hover:bg-white/05'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-400" />
            <span>2. Edición Manual de Parámetros</span>
          </button>

          <button
            onClick={() => setActiveTab('pdf-upload')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs font-bold transition border-t border-x ${
              activeTab === 'pdf-upload'
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]'
                : 'text-slate-400 hover:text-white border-transparent hover:bg-white/05'
            }`}
          >
            <Upload className="w-4 h-4 text-indigo-400" />
            <span>3. Importar desde PDF</span>
          </button>
        </div>

        {/* Notification / Status Message */}
        {statusMessage && (
          <div className={`mx-6 mt-4 p-3.5 rounded-2xl text-xs flex items-start gap-2.5 border ${
            isError 
              ? 'bg-red-500/15 text-red-200 border-red-400/40' 
              : 'bg-emerald-500/15 text-emerald-200 border-emerald-400/40'
          }`}>
            {isError ? (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <span className="font-medium leading-relaxed">{statusMessage}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* TAB 1: GOOGLE SEARCH AUTO-DISCOVERY */}
          {activeTab === 'google-search' && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-400/30">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-bold text-white">
                    Herramienta de Localización y Autoperfilado con Google Search
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ingresa el nombre de <strong>cualquier persona, candidato o líder público</strong>. Proteus consultará Google Search mediante Gemini 3.8 Flash para rastrear su trayectoria política, partido, ocupación y posturas, rellenando automáticamente el perfil completo.
                </p>

                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchCandidateName}
                      onChange={(e) => setSearchCandidateName(e.target.value)}
                      placeholder="Escribe aquí el nombre del candidato (ej: Federico Gutiérrez, Isaac Mendoza, Claudia López...)"
                      className="w-full bg-slate-950/80 border border-white/20 rounded-xl px-4 py-3 text-sm font-bold text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearchWithGoogle();
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSearchWithGoogle}
                    disabled={isSearchingGoogle || !searchCandidateName.trim()}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 disabled:opacity-50 text-white text-xs font-extrabold transition shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  >
                    {isSearchingGoogle ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Buscando en Google...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        <span>Localizar y Autoperfilar con Google</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Current Candidate Summary Preview */}
              <div className="p-5 rounded-2xl bg-white/05 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-slate-400 font-bold">
                    Datos Actuales del Candidato Activo
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-400/30 font-bold">
                    {formData.nombre}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/40 border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">Partido / Movimiento:</span>
                    <span className="font-bold text-white">{formData.afiliacionPartidista || 'Por definir'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/40 border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">Tono Narrativo:</span>
                    <span className="font-bold text-sky-300">{formData.tonoNarrativo || 'Firme y transparente'}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/40 border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">Estilo de Comunicación:</span>
                    <span className="font-bold text-amber-300">{formData.estiloComunicacion || 'Asertivo'}</span>
                  </div>
                </div>
                {formData.resumenEstrategico && (
                  <div className="p-3 rounded-xl bg-slate-950/40 border border-white/10 text-xs">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1">Síntesis Estratégica:</span>
                    <p className="text-slate-300 leading-relaxed">{formData.resumenEstrategico}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MANUAL PARAMETER EDITING */}
          {activeTab === 'manual-edit' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Nombre */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-300 font-bold block mb-1">
                    Nombre Completo del Candidato *
                  </label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="ej: Isaac Mendoza"
                    className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3.5 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Afiliación Partidista */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-300 font-bold block mb-1">
                    Afiliación Partidista o Coalición
                  </label>
                  <input
                    type="text"
                    value={formData.afiliacionPartidista || ''}
                    onChange={(e) => setFormData({ ...formData, afiliacionPartidista: e.target.value })}
                    placeholder="ej: Centro Democrático / Movimiento Independiente"
                    className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Tono Narrativo */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-300 font-bold block mb-1">
                    Tono Narrativo Preferido
                  </label>
                  <input
                    type="text"
                    value={formData.tonoNarrativo || ''}
                    onChange={(e) => setFormData({ ...formData, tonoNarrativo: e.target.value })}
                    placeholder="ej: Firmeza, autoridad y transparencia"
                    className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Estilo de Comunicación */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-300 font-bold block mb-1">
                    Estilo de Comunicación Dominante
                  </label>
                  <input
                    type="text"
                    value={formData.estiloComunicacion || ''}
                    onChange={(e) => setFormData({ ...formData, estiloComunicacion: e.target.value })}
                    placeholder="ej: Asertivo, directo y pedagógico"
                    className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Formación y Ocupación */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-300 font-bold block mb-1">
                    Formación Académica / Ocupación
                  </label>
                  <input
                    type="text"
                    value={formData.formacionOcupacion || ''}
                    onChange={(e) => setFormData({ ...formData, formacionOcupacion: e.target.value })}
                    placeholder="ej: Abogado, Economista, Ingeniero..."
                    className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Reconocimiento de Nombre */}
                <div>
                  <label className="text-[11px] font-mono uppercase text-slate-300 font-bold block mb-1">
                    Grado de Reconocimiento
                  </label>
                  <input
                    type="text"
                    value={formData.reconocimientoNombre || ''}
                    onChange={(e) => setFormData({ ...formData, reconocimientoNombre: e.target.value })}
                    placeholder="ej: Departamental alto / En consolidación municipal"
                    className="w-full bg-slate-950/80 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

              </div>

              {/* Eje Temático Cómodo */}
              <div>
                <label className="text-[11px] font-mono uppercase text-slate-300 font-bold block mb-1">
                  Ejes Temáticos de Mayor Comodidad Discursiva
                </label>
                <textarea
                  value={formData.ejeTematicoComodo || ''}
                  onChange={(e) => setFormData({ ...formData, ejeTematicoComodo: e.target.value })}
                  placeholder="ej: Seguridad territorial, estímulo al empleo joven, freno a la extorsión y eficiencia en el gasto público."
                  rows={2}
                  className="w-full bg-slate-950/80 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Experiencia Previa */}
              <div>
                <label className="text-[11px] font-mono uppercase text-slate-300 font-bold block mb-1">
                  Experiencia Previa y Cargos Públicos
                </label>
                <textarea
                  value={formData.experienciaPrevia || ''}
                  onChange={(e) => setFormData({ ...formData, experienciaPrevia: e.target.value })}
                  placeholder="Candidaturas previas, cargos en el sector público o privado, activismo o liderazgo gremial..."
                  rows={2}
                  className="w-full bg-slate-950/80 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Resumen Estratégico */}
              <div>
                <label className="text-[11px] font-mono uppercase text-slate-300 font-bold block mb-1">
                  Resumen Estratégico de Campaña (Inyectado a Gemini)
                </label>
                <textarea
                  value={formData.resumenEstrategico || ''}
                  onChange={(e) => setFormData({ ...formData, resumenEstrategico: e.target.value })}
                  placeholder="Propuesta central de valor y narrativa para conectar con los electores..."
                  rows={3}
                  className="w-full bg-slate-950/80 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {/* TAB 3: PDF UPLOAD */}
          {activeTab === 'pdf-upload' && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-sky-400/50 transition relative bg-slate-950/40">
                <input 
                  type="file" 
                  accept=".pdf,application/pdf"
                  onChange={handleFileUpload}
                  disabled={isUploadingPdf}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                  <div className="p-3.5 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 text-indigo-300">
                    {isUploadingPdf ? (
                      <Loader2 className="w-8 h-8 animate-spin" />
                    ) : (
                      <Upload className="w-8 h-8" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      {isUploadingPdf ? "Analizando documento PDF..." : "Haz clic o arrastra un PDF de Perfil / Plan de Gobierno"}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Gemini 3.8 Flash extraerá los ejes, el tono y la experiencia del archivo.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-white/15 bg-slate-950/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleResetToBlank}
              className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-white/05 hover:bg-white/10 border border-white/15 text-xs text-slate-300 hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
              title="Limpiar campos para registrar un nuevo candidato"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Nuevo en Blanco</span>
            </button>
            <button
              type="button"
              onClick={handleLoadIsaacMendoza}
              className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-xs text-amber-300 transition flex items-center justify-center gap-1.5 cursor-pointer"
              title="Cargar valores de muestra de Isaac Mendoza"
            >
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Cargar Isaac Mendoza</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSaveAndApply}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-xs font-extrabold text-white shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Guardar y Aplicar a Todo Proteus</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

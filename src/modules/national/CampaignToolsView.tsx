import React, { useState } from 'react';
import { 
  Projector, 
  Layers, 
  Upload, 
  FileText, 
  X, 
  Search, 
  Map as MapIcon, 
  TrendingUp, 
  Loader2,
  Sparkles, 
  BarChart3,
  Calculator
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ai, formatAiError } from '../../services/geminiService';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ElectoralSimulatorDashboard } from '../../components/analytics/ElectoralSimulatorDashboard';

export const CampaignToolsView: React.FC = () => {
  const [selectedProyectorTool, setSelectedProyectorTool] = useState<'procesador' | 'comparador' | 'simulador-dhondt'>('simulador-dhondt');
  const [surveyText, setSurveyText] = useState("");
  const [surveyFiles, setSurveyFiles] = useState<File[]>([]);
  const [multiSurveyResults, setMultiSurveyResults] = useState<any[]>([]);
  const [isProcessingSurveys, setIsProcessingSurveys] = useState(false);
  const [comparisonAnalysis, setComparisonAnalysis] = useState<{type: string, text: string} | null>(null);
  const [isGeneratingComparison, setIsGeneratingComparison] = useState(false);

  const handleRemoveSurveyFile = (index: number) => {
    setSurveyFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcessSurveys = async () => {
    if (surveyFiles.length === 0 && !surveyText.trim()) return;
    
    setIsProcessingSurveys(true);
    setMultiSurveyResults([]);

    try {
      const results: any[] = [];
      
      if (surveyText.trim()) {
        const textPrompt = `Actúa como un experto en demoscopia. Procesa este texto de una encuesta y extrae los datos en JSON:
        
        TEXTO: ${surveyText}
        
        JSON: {
          "nombre": "Encuesta de Texto",
          "data": {
            "primera_vuelta": { "cepeda": "string", "espriella": "string", "valencia": "string" },
            "segunda_vuelta": { "cepeda_vs_espriella": "string", "cepeda_vs_valencia": "string" },
            "preferencia_region": "string",
            "preferencia_sexo": "string",
            "metodologia": { "muestra": "string", "modo": "string" }
          }
        }`;
        
        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: [{ role: 'user', parts: [{ text: textPrompt }] }]
        });
        
        try {
          const jsonStr = (response.text || "").replace(/```json/g, '').replace(/```/g, '').trim();
          results.push(JSON.parse(jsonStr));
        } catch {
          results.push({
            nombre: "Encuesta Manual (Resumen)",
            data: { notas: response.text }
          });
        }
      }

      setMultiSurveyResults(results);
    } catch (err) {
      alert(formatAiError(err));
    } finally {
      setIsProcessingSurveys(false);
    }
  };

  const handleComparisonAction = async (type: 'politico' | 'regional' | 'dinamico') => {
    setIsGeneratingComparison(true);
    setComparisonAnalysis(null);

    const prompts = {
      politico: "Realiza una búsqueda profunda en la web sobre el contexto político actual de Colombia en 2025-2026. Identifica vientos electorales, coaliciones emergentes y temas de debate nacional. Presenta un reporte estratégico.",
      regional: "Realiza una búsqueda detallada y actualizada sobre el clima político y social en las principales regiones y departamentos de Colombia. Identifica preocupaciones locales, líderes barriales y tendencias de voto.",
      dinamico: `Basado en los resultados de las encuestas procesadas: ${JSON.stringify(multiSurveyResults)}, realiza un análisis DAFO (SWOT) dinámico. Identifica puntos débiles y fuertes de cada opción y recomienda ajustes discursivos.`
    };

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [{ role: 'user', parts: [{ text: prompts[type] }] }]
      });

      setComparisonAnalysis({
        type,
        text: response.text || "No se obtuvo respuesta del análisis."
      });
    } catch (err) {
      alert(formatAiError(err));
    } finally {
      setIsGeneratingComparison(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Glass Header */}
      <div className="bg-slate-900/50 backdrop-blur-2xl border border-sky-400/30 rounded-3xl p-6 shadow-2xl shadow-[inset_0_1px_1px_0_rgba(56,189,248,0.25),0_20px_40px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-sky-950/50 border border-sky-400/50 text-sky-300 text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                Ámbito Nacional
              </span>
              <span className="text-xs text-slate-300 font-mono">
                Inteligencia Demoscópica & Proyecciones
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Proyector y Comparador de Encuestas
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Procesa fichas técnicas de encuestas (PDF/Texto), compara tendencias entre firmas encuestadoras y genera diagnósticos DAFO de balance electoral.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedProyectorTool('simulador-dhondt')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedProyectorTool === 'simulador-dhondt'
                  ? 'bg-gradient-to-r from-amber-500/40 via-sky-500/40 to-blue-600/40 border border-amber-400/60 text-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_4px_15px_rgba(245,158,11,0.3)]'
                  : 'bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              Simulador D'Hondt & Umbral
            </button>
            <button
              onClick={() => setSelectedProyectorTool('procesador')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedProyectorTool === 'procesador'
                  ? 'bg-gradient-to-r from-sky-500/40 to-blue-600/40 border border-sky-400/60 text-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_4px_15px_rgba(14,165,233,0.3)]'
                  : 'bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Projector className="w-3.5 h-3.5" />
              Procesador
            </button>
            <button
              onClick={() => setSelectedProyectorTool('comparador')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedProyectorTool === 'comparador'
                  ? 'bg-gradient-to-r from-sky-500/40 to-blue-600/40 border border-sky-400/60 text-white shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_4px_15px_rgba(14,165,233,0.3)]'
                  : 'bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Comparador
            </button>
          </div>
        </div>
      </div>

      {/* View Switcher */}
      {selectedProyectorTool === 'simulador-dhondt' && (
        <ElectoralSimulatorDashboard />
      )}

      {selectedProyectorTool === 'procesador' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-1 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-5 space-y-4 shadow-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Carga de Encuestas
            </h2>
            <p className="text-xs text-slate-400">
              Pega fragmentos de fichas técnicas o sube archivos PDF para que la IA extraiga los valores.
            </p>

            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/15 rounded-2xl cursor-pointer bg-white/[0.02] hover:bg-white/[0.06] hover:border-sky-400/50 transition-all backdrop-blur-sm">
              <Upload className="w-6 h-6 text-sky-400 mb-1" />
              <span className="text-xs font-bold text-slate-200">Subir PDFs de Encuestas</span>
              <span className="text-[10px] text-slate-500">Archivos .pdf</span>
              <input
                type="file"
                className="hidden"
                multiple
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  if (e.target.files) {
                    setSurveyFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                  }
                }}
              />
            </label>

            {/* File List */}
            {surveyFiles.length > 0 && (
              <div className="space-y-2">
                {surveyFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between px-3 py-2 bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/10 text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate text-slate-200">{file.name}</span>
                    </div>
                    <button onClick={() => handleRemoveSurveyFile(idx)} className="text-slate-400 hover:text-rose-400 p-1">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">O ingresa texto / porcentajes:</label>
              <textarea
                value={surveyText}
                onChange={(e) => setSurveyText(e.target.value)}
                placeholder="Ejemplo: Invamer Marzo 2026: Candidato A 34%, Candidato B 28%..."
                className="w-full h-28 bg-slate-950/60 backdrop-blur-sm border border-white/15 rounded-2xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-400 resize-none font-mono"
              />
            </div>

            <Button
              onClick={handleProcessSurveys}
              isLoading={isProcessingSurveys}
              className="w-full"
              variant="primary"
            >
              Procesar Encuestas con IA
            </Button>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Consolidado Demoscópico
              </h2>
              {multiSurveyResults.length > 0 && (
                <button
                  onClick={() => setMultiSurveyResults([])}
                  className="text-xs text-rose-400 hover:underline font-mono"
                >
                  Limpiar
                </button>
              )}
            </div>

            {multiSurveyResults.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center text-slate-500 p-6 border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-sm">
                <BarChart3 className="w-10 h-10 text-slate-600 mb-2" />
                <p className="text-xs text-slate-400">No hay encuestas procesadas aún.</p>
                <p className="text-[11px] text-slate-500 mt-1">Carga un archivo o escribe datos en el panel izquierdo.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {multiSurveyResults.map((item, idx) => (
                  <div key={idx} className="p-4 bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-2xl">
                    <span className="font-bold text-emerald-400 text-xs font-mono block mb-2">
                      {item.nombre || `Muestra #${idx + 1}`}
                    </span>
                    <pre className="text-xs text-slate-300 font-mono overflow-x-auto bg-black/40 p-3 rounded-xl border border-white/5">
                      {JSON.stringify(item.data, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedProyectorTool === 'comparador' && (
        /* Comparison Tool */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleComparisonAction('politico')}
              disabled={isGeneratingComparison}
              className="p-5 bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-sky-400/50 rounded-3xl text-left transition group shadow-xl hover:-translate-y-1"
            >
              <Search className="w-6 h-6 text-sky-400 mb-2 group-hover:scale-110 transition" />
              <h3 className="text-sm font-bold text-white">Contexto Político Nacional</h3>
              <p className="text-xs text-slate-400 mt-1">Búsqueda web en vivo de alianzas, vientos electorales y coyuntura.</p>
            </button>

            <button
              onClick={() => handleComparisonAction('regional')}
              disabled={isGeneratingComparison}
              className="p-5 bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-emerald-400/50 rounded-3xl text-left transition group shadow-xl hover:-translate-y-1"
            >
              <MapIcon className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition" />
              <h3 className="text-sm font-bold text-white">Medición Regional</h3>
              <p className="text-xs text-slate-400 mt-1">Clima electoral por departamentos clave y zonas urbanas/rurales.</p>
            </button>

            <button
              onClick={() => handleComparisonAction('dinamico')}
              disabled={isGeneratingComparison}
              className="p-5 bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-amber-400/50 rounded-3xl text-left transition group shadow-xl hover:-translate-y-1"
            >
              <TrendingUp className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition" />
              <h3 className="text-sm font-bold text-white">Análisis DAFO Dinámico</h3>
              <p className="text-xs text-slate-400 mt-1">Cruce de encuestas procesadas y recomendaciones discursivas.</p>
            </button>
          </div>

          {/* Comparison Output */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            {isGeneratingComparison ? (
              <div className="h-64 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-sky-400 animate-spin" />
                <span className="text-xs font-mono text-slate-300">Generando reporte estratégico con Gemini...</span>
              </div>
            ) : comparisonAnalysis ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <Badge variant="primary">
                    {comparisonAnalysis.type.toUpperCase()}
                  </Badge>
                  <span className="text-xs font-mono text-slate-400">Reporte Generado</span>
                </div>
                <div className="prose prose-invert max-w-none text-xs leading-relaxed font-sans text-slate-200 bg-white/[0.03] p-5 rounded-2xl border border-white/10">
                  <ReactMarkdown>{comparisonAnalysis.text}</ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center text-slate-500 text-xs font-mono">
                Selecciona una de las tres opciones superiores para generar un informe comparativo.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

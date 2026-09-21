import React from 'react';
import {
  X,
  Printer,
  FileText,
  Building2,
  Users,
  Home,
  ShieldAlert,
  BarChart2,
  Calendar,
  CheckCircle2,
  MapPin,
  TrendingDown,
  TrendingUp,
  Download,
  BookOpen
} from 'lucide-react';
import { Commune } from '../../data/observatorioComunas/types';
import {
  POPULATION_DATA,
  getAgeDistribution,
  getDemographicIndicators,
  getDemographicPyramid
} from '../../data/observatorioComunas/populationData';
import { HOUSING_DATA } from '../../data/observatorioComunas/housingData';
import { IPM_DATA } from '../../data/observatorioComunas/ipmData';
import { IPM_DIMENSIONS_INFO } from '../../data/observatorioComunas/ipmDimensionsInfo';
import { CRIMINALITY_DATA } from '../../data/observatorioComunas/criminalityData';
import { DemographicPyramid } from './DemographicPyramid';

interface CommuneReportModalProps {
  commune: Commune;
  selectedYear?: number;
  onClose: () => void;
}

export const CommuneReportModal: React.FC<CommuneReportModalProps> = ({
  commune,
  selectedYear = 2026,
  onClose
}) => {
  const popHistory = POPULATION_DATA[commune.id] || [];
  const housingHistory = HOUSING_DATA[commune.id] || [];
  const ipmHistory = IPM_DATA[commune.id] || [];
  const crimRecord = CRIMINALITY_DATA[commune.id];

  const currentPop = popHistory.find((p) => p.year === selectedYear) || popHistory[popHistory.length - 1];
  const currentHousing = housingHistory.find((h) => h.year === selectedYear) || housingHistory[housingHistory.length - 1];
  const currentIpm = ipmHistory.find((i) => i.year === selectedYear) || ipmHistory[ipmHistory.length - 1];

  const ageDist = getAgeDistribution(commune.id, currentPop?.total ?? 100000, selectedYear);
  const demoIndicators = getDemographicIndicators(commune.id, selectedYear);
  const pyramidCohorts = getDemographicPyramid(commune.id, selectedYear);

  const handlePrint = () => {
    try {
      window.focus();
      window.print();
    } catch (e) {
      console.warn('Native window.print() blocked, fallback to printable window', e);
    }

    const reportElem = document.getElementById(`printable-report-content-${commune.id}`);
    if (!reportElem) return;

    const printWin = window.open('', '_blank', 'width=1000,height=900');
    if (printWin) {
      printWin.document.write(`
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="utf-8" />
            <title>Informe Diagnóstico Territorial - ${commune.name}</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              @media print {
                .no-print { display: none !important; }
              }
              body { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; background: #ffffff; color: #0f172a; padding: 24px; }
            </style>
          </head>
          <body>
            <div class="no-print" style="margin-bottom: 20px; display: flex; justify-content: flex-end; gap: 10px;">
              <button onclick="window.print()" style="padding: 10px 20px; background: #0284c7; color: white; border: none; border-radius: 10px; font-weight: bold; cursor: pointer; font-size: 14px;">
                🖨️ Imprimir / Guardar en PDF
              </button>
            </div>
            ${reportElem.outerHTML}
            <script>
              setTimeout(() => {
                window.focus();
                window.print();
              }, 600);
            </script>
          </body>
        </html>
      `);
      printWin.document.close();
    }
  };

  const handleDownloadReport = () => {
    const reportElem = document.getElementById(`printable-report-content-${commune.id}`);
    if (!reportElem) return;

    const fullHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Informe Diagnóstico Territorial - ${commune.name} (${selectedYear})</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; background: #ffffff; color: #0f172a; padding: 32px; max-width: 1000px; margin: 0 auto; }
  </style>
</head>
<body>
  ${reportElem.outerHTML}
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Informe_Diagnostico_${commune.name.replace(/\s+/g, '_')}_${selectedYear}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-slate-950 w-full max-w-5xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-white/20 overflow-hidden my-auto flex flex-col max-h-[92vh] text-white">
        {/* Top Action Bar */}
        <div className="p-4 border-b border-white/15 flex items-center justify-between bg-gradient-to-r from-sky-500/20 via-indigo-500/10 to-transparent">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-400/40">
              <FileText className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-sm font-black text-white">
                Informe Diagnóstico Territorial Exhaustivo
              </h3>
              <p className="text-xs text-sky-300 font-mono">
                {commune.name} ({commune.zone}) • Base DANE, IPM y CIEF ({selectedYear})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadReport}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/15 border border-white/20 text-slate-200 text-xs font-semibold rounded-2xl transition flex items-center gap-1.5 cursor-pointer"
              title="Descargar informe como archivo HTML independiente"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Descargar HTML</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold rounded-2xl transition flex items-center gap-1.5 shadow-[0_0_15px_rgba(2,132,199,0.5)] cursor-pointer"
              title="Imprimir informe o guardar en PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Content Body */}
        <div
          id={`printable-report-content-${commune.id}`}
          className="overflow-y-auto p-5 sm:p-7 space-y-6 text-slate-200"
        >
          {/* Header Strip */}
          <div className="p-5 rounded-3xl bg-white/05 border border-white/15 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold tracking-wider">
                  Ficha Técnica Territorial DANE & Registraduría
                </span>
                <h2 className="text-2xl font-black text-white mt-0.5">
                  Comuna {commune.code}: {commune.name}
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  {commune.description}
                </p>
              </div>

              <div className="shrink-0 p-3 rounded-2xl bg-black/40 border border-white/15 text-center">
                <div className="text-[9px] font-mono text-slate-400 uppercase font-bold">Población {selectedYear}</div>
                <div className="text-xl font-black font-mono text-white mt-0.5">
                  {currentPop?.total.toLocaleString('es-CO')}
                </div>
                <div className="text-[10px] text-sky-300 font-mono">
                  {((currentPop?.women || 0) / (currentPop?.total || 1) * 100).toFixed(1)}% Mujeres • {((currentPop?.men || 0) / (currentPop?.total || 1) * 100).toFixed(1)}% Hombres
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10 text-xs">
              <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Estrato Predominante</span>
                <span className="font-bold text-amber-300 mt-0.5 block">{commune.estratoPredominante}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Barrios Oficiales</span>
                <span className="font-bold text-white mt-0.5 block">{commune.barriosCount} barrios</span>
              </div>
              <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Área Territorial</span>
                <span className="font-bold text-white mt-0.5 block">{commune.areaKm2} km²</span>
              </div>
              <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Densidad Urbana</span>
                <span className="font-bold text-sky-300 mt-0.5 block">
                  {Math.round((currentPop?.total || 100000) / commune.areaKm2).toLocaleString()} hab/km²
                </span>
              </div>
            </div>
          </div>

          {/* Demographic Pyramid Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-400" />
              <span>1. Estructura Poblacional & Pirámide Demográfica</span>
            </h3>
            <DemographicPyramid
              communeId={commune.id}
              communeName={commune.name}
              initialYear={selectedYear}
            />
          </div>

          {/* Poverty IPM Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              <span>2. Índice de Pobreza Multidimensional (IPM) & Privaciones</span>
            </h3>
            {currentIpm && (
              <div className="p-4 rounded-3xl bg-white/05 border border-white/15 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-xs text-slate-300">Índice Global de Pobreza Multidimensional:</span>
                  <span className="text-lg font-mono font-black text-emerald-300">{currentIpm.ipmGlobal}%</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                    <span className="text-[9px] text-slate-400 block">Bajo Logro Educativo</span>
                    <span className="font-mono font-bold text-amber-300">{currentIpm.bajoLogroEducativo}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                    <span className="text-[9px] text-slate-400 block">Empleo Informal</span>
                    <span className="font-mono font-bold text-rose-300">{currentIpm.empleoInformal}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                    <span className="text-[9px] text-slate-400 block">Sin Aseguramiento Salud</span>
                    <span className="font-mono font-bold text-sky-300">{currentIpm.sinAseguramientoSalud}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                    <span className="text-[9px] text-slate-400 block">Desempleo Larga Duración</span>
                    <span className="font-mono font-bold text-indigo-300">{currentIpm.desempleoLargaDuracion}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                    <span className="text-[9px] text-slate-400 block">Hacinamiento Crítico</span>
                    <span className="font-mono font-bold text-emerald-300">{currentIpm.hacinamiento}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                    <span className="text-[9px] text-slate-400 block">Inasistencia Escolar</span>
                    <span className="font-mono font-bold text-purple-300">{currentIpm.inasistenciaEscolar}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Criminality & Extortion Section */}
          {crimRecord && (
            <div className="space-y-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>3. Diagnóstico de Seguridad & Extorsión (CIEF EAFIT / Chicago)</span>
              </h3>
              <div className="p-4 rounded-3xl bg-white/05 border border-white/15 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                    <span className="text-[9px] text-slate-400 block">Extorsión a Negocios</span>
                    <span className="font-mono font-bold text-rose-400 text-sm">{crimRecord.extorsionNegociosPct}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                    <span className="text-[9px] text-slate-400 block">Extorsión a Hogares</span>
                    <span className="font-mono font-bold text-amber-300 text-sm">{crimRecord.extorsionHogaresPct}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                    <span className="text-[9px] text-slate-400 block">Nivel de Extorsión</span>
                    <span className="font-mono font-bold text-white text-sm">{crimRecord.extorsionLevel}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/05 border border-white/10">
                    <span className="text-[9px] text-slate-400 block">Combos Estimados</span>
                    <span className="font-mono font-bold text-sky-300 text-sm">{crimRecord.combosCountEst}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-300 pt-1 border-t border-white/10">
                  <strong className="text-white">Bandas Dominantes: </strong>
                  <span>{crimRecord.bandasDominantes.join(', ')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

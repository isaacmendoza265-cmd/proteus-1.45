import React from 'react';
import { ShieldCheck, Database, FileText, Cpu, CheckCircle } from 'lucide-react';
import { PdfScriptGenerator } from '../../../components/PdfScriptGenerator';
import { CandidateProfile } from '../../../components/CandidateProfileManager';

interface GobernacionExecutiveViewProps {
  candidateProfile: CandidateProfile;
  onSaveProfile: (profile: CandidateProfile) => void;
}

export const GobernacionExecutiveView: React.FC<GobernacionExecutiveViewProps> = ({
  candidateProfile,
  onSaveProfile
}) => {
  return (
    <div className="space-y-6">
      {/* Executive Glass Header */}
      <div className="bg-slate-900/50 backdrop-blur-2xl border border-emerald-400/35 rounded-3xl p-6 shadow-2xl shadow-[inset_0_1px_1px_0_rgba(110,231,183,0.25),0_20px_40px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                Nivel 1: Departamental
              </span>
              <span className="text-xs text-slate-300 font-mono">
                Consejo de Inteligencia y Estrategia
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Gobernación de Antioquia & 7 Agentes
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Monitoreo permanente de los 28 actores políticos departamentales, auditoría de medios regionales (≤48h) y generación estratégica de guiones alineados a los 7 ejes de gobierno.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <div className="px-3.5 py-2 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-200">independencia.db</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-slate-200">7 Agentes Activos</span>
            </div>
          </div>
        </div>

        {/* 7 Strategic Axes Pills */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-2">
          <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase self-center mr-1">
            7 Ejes:
          </span>
          {[
            '1. Seguridad y Orden',
            '2. Infraestructura Vial',
            '3. Salud & Hospitales',
            '4. Educación & Universidad',
            '5. Competitividad Económica',
            '6. Sostenibilidad & Agua',
            '7. Transparencia & Gobernanza'
          ].map((axis, i) => (
            <span
              key={i}
              className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/10 text-slate-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:border-emerald-400/50 hover:text-emerald-300 transition"
            >
              {axis}
            </span>
          ))}
        </div>
      </div>

      {/* Main Core Component: PdfScriptGenerator */}
      <PdfScriptGenerator
        candidateProfile={candidateProfile}
        onSaveProfile={onSaveProfile}
      />
    </div>
  );
};

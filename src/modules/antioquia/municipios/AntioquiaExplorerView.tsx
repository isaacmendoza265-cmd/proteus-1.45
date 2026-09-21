import React from 'react';
import { MapPin, Box, Compass, FileSpreadsheet } from 'lucide-react';
import { AntioquiaMunicipiosManager } from '../../../components/AntioquiaMunicipiosManager';
import { CandidateProfile } from '../../../components/CandidateProfileManager';

interface AntioquiaExplorerViewProps {
  candidateProfile: CandidateProfile;
  onNavigateToBio?: () => void;
  onNavigateToContentDirector?: () => void;
}

export const AntioquiaExplorerView: React.FC<AntioquiaExplorerViewProps> = ({
  candidateProfile,
  onNavigateToBio,
  onNavigateToContentDirector
}) => {
  return (
    <div className="space-y-6">
      {/* Municipal Glass Header */}
      <div className="bg-slate-900/50 backdrop-blur-2xl border border-emerald-400/35 rounded-3xl p-6 shadow-2xl shadow-[inset_0_1px_1px_0_rgba(110,231,183,0.25),0_20px_40px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-emerald-950/50 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                Nivel 3: Quirúrgico Municipal
              </span>
              <span className="text-xs text-slate-300 font-mono">
                125 Municipios • Modelado 3D • Comunas • ECV
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Explorador Territorial de Municipios
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Análisis a nivel de barrio, comuna y vereda. Incluye dioramas 3D interactivos, mapas cartográficos vectoriales y encuestas de calidad de vida (ECV).
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-3.5 py-2 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 text-emerald-300 flex items-center gap-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
              <Box className="w-3.5 h-3.5 text-emerald-400" /> Dioramas 3D
            </span>
            <span className="px-3.5 py-2 rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 text-emerald-300 flex items-center gap-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]">
              <Compass className="w-3.5 h-3.5 text-emerald-400" /> 125 Municipios
            </span>
          </div>
        </div>
      </div>

      {/* Municipios Manager Core (Preserving 3D Dioramas, Maps and ECV) */}
      <AntioquiaMunicipiosManager
        candidateProfile={candidateProfile}
        onNavigateToBio={onNavigateToBio}
        onNavigateToContentDirector={onNavigateToContentDirector}
      />
    </div>
  );
};

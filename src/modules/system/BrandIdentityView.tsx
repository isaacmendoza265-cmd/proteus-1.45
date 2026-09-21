import React from 'react';
import { Sparkles, Shield, Palette } from 'lucide-react';
import { 
  CmtBrandManualCard, 
  CmtIsotipo, 
  CmtLogotipo, 
  CmtImagotipo 
} from '../../components/CmtProteusLogo';

export const BrandIdentityView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/20 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 text-xs font-mono font-bold uppercase tracking-wider">
                Sistema & Marca
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Manual de Identidad Visual Institucional
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Identidad de Marca CMT PROTEUS
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">
              Especificaciones formales del Isotipo tridente, combinaciones cromáticas institucionales, zonas de exclusión y lineamientos de aplicación gráfica.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-purple-400 font-semibold flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" /> Manual v1.2
            </span>
          </div>
        </div>
      </div>

      {/* Brand Manual Card */}
      <CmtBrandManualCard />
    </div>
  );
};

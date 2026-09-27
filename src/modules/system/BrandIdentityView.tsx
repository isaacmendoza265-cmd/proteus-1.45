import React from 'react';
import { Palette } from 'lucide-react';
import { 
  CmtBrandManualCard, 
  CmtIsotipo, 
  CmtLogotipo, 
  CmtImagotipo 
} from '../../components/CmtProteusLogo';

export const BrandIdentityView: React.FC = () => {
  return (
    <div className="proteus-civico space-y-4">
      {/* Cabecera */}
      <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-5 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] text-xs font-bold uppercase tracking-wide">
            Sistema y marca
          </span>
          <span className="text-xs text-[var(--c-muted)]">Manual de identidad visual institucional</span>
        </div>
        <h1 className="font-titulo m-0 text-2xl md:text-[28px] leading-tight font-medium">Identidad de marca Proteus</h1>
        <p className="m-0 text-sm text-[var(--c-muted)] max-w-3xl">
          Especificaciones del isotipo tridente, combinaciones cromáticas institucionales, zonas de exclusión y lineamientos de aplicación gráfica.
        </p>
        <span className="self-start mt-1 px-2.5 py-1 rounded-lg border border-[var(--c-border)] bg-[var(--c-sunken)] text-xs font-semibold text-[var(--c-muted)] flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5" /> Manual v1.2
        </span>
      </div>

      {/* Manual de marca */}
      <CmtBrandManualCard />
    </div>
  );
};

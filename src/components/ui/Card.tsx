import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'surface' | 'glass' | 'accent' | 'antioquia';
  hoverable?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  hoverable = false,
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    // Standard translucent frosted acrylic panel
    default: 'bg-gradient-to-br from-white/[0.16] to-white/[0.03] bg-slate-950/25 backdrop-blur-2xl border border-white/30 text-slate-100 shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.5),0_20px_45px_-10px_rgba(0,0,0,0.55)]',
    
    // Elevated deep glass with higher specular highlight
    surface: 'bg-gradient-to-br from-sky-400/[0.16] to-indigo-500/[0.04] bg-slate-950/30 backdrop-blur-3xl border border-sky-300/40 text-slate-100 shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.6),0_25px_50px_-10px_rgba(14,165,233,0.3)]',
    
    // Translucent ultra-frost layer
    glass: 'bg-gradient-to-br from-white/[0.22] to-white/[0.04] bg-slate-950/20 backdrop-blur-3xl border border-white/40 text-slate-100 shadow-[inset_0_2px_2px_0_rgba(255,255,255,0.7),0_25px_50px_rgba(0,0,0,0.5)]',
    
    // Electric blue / cyan frosted accent for National scope
    accent: 'bg-gradient-to-br from-sky-400/[0.20] to-blue-600/[0.05] bg-sky-950/25 backdrop-blur-2xl border border-sky-300/50 text-slate-100 shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.6),0_20px_45px_-10px_rgba(14,165,233,0.35)]',
    
    // Emerald frosted accent for Antioquia Command Center
    antioquia: 'bg-gradient-to-br from-emerald-400/[0.20] to-teal-600/[0.05] bg-emerald-950/25 backdrop-blur-2xl border border-emerald-300/50 text-slate-100 shadow-[inset_0_1.5px_2px_0_rgba(255,255,255,0.6),0_20px_45px_-10px_rgba(16,185,129,0.35)]'
  };

  const hoverStyles = hoverable
    ? 'transition-all duration-300 hover:-translate-y-1 hover:border-white/50 hover:shadow-[inset_0_2px_3px_0_rgba(255,255,255,0.7),0_30px_60px_-12px_rgba(0,0,0,0.75)]'
    : '';

  return (
    <div
      className={`rounded-2xl p-5 ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

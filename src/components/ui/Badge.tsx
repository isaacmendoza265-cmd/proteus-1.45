import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'antioquia' | 'outline';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    // Glass frost cyan/blue
    primary: 'bg-sky-950/40 backdrop-blur-md border-sky-400/40 text-sky-300 shadow-[inset_0_1px_0_0_rgba(56,189,248,0.25)]',
    
    // Glass frost emerald
    success: 'bg-emerald-950/40 backdrop-blur-md border-emerald-400/40 text-emerald-300 shadow-[inset_0_1px_0_0_rgba(52,211,153,0.25)]',
    
    // Glass frost amber
    warning: 'bg-amber-950/40 backdrop-blur-md border-amber-400/40 text-amber-300 shadow-[inset_0_1px_0_0_rgba(251,191,36,0.25)]',
    
    // Glass frost red
    danger: 'bg-rose-950/40 backdrop-blur-md border-rose-400/40 text-rose-300 shadow-[inset_0_1px_0_0_rgba(244,63,94,0.25)]',
    
    // Glass frost cyan
    info: 'bg-cyan-950/40 backdrop-blur-md border-cyan-400/40 text-cyan-300 shadow-[inset_0_1px_0_0_rgba(34,211,238,0.25)]',
    
    // Antioquia special frosted chip
    antioquia: 'bg-emerald-900/40 backdrop-blur-md border-emerald-400/60 text-emerald-200 font-semibold shadow-[inset_0_1px_0_0_rgba(110,231,183,0.35),0_0_15px_-3px_rgba(16,185,129,0.3)]',
    
    // Outline translucent
    outline: 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/[0.05] backdrop-blur-md border-white/20 text-slate-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]'
  };

  const sizeStyles = {
    sm: 'text-[10px] px-2.5 py-0.5 tracking-wider uppercase',
    md: 'text-xs px-3 py-1'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-medium transition-all ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

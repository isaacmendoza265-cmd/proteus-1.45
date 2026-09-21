import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'antioquia' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const variantStyles = {
    // Frosted Cyan / Electric Blue (Primary)
    primary: 'bg-gradient-to-r from-sky-600/90 to-blue-600/90 hover:from-sky-500 hover:to-blue-500 text-white backdrop-blur-md border border-sky-300/30 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3),0_8px_20px_-4px_rgba(14,165,233,0.35)] hover:shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.4),0_12px_25px_-4px_rgba(14,165,233,0.5)]',
    
    // Frosted Slate (Secondary)
    secondary: 'bg-slate-800/60 hover:bg-slate-700/70 text-slate-100 backdrop-blur-md border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_4px_12px_rgba(0,0,0,0.3)] hover:border-white/25',
    
    // Frosted Emerald (Antioquia Special)
    antioquia: 'bg-gradient-to-r from-emerald-600/90 to-teal-600/90 hover:from-emerald-500 hover:to-teal-500 text-white backdrop-blur-md border border-emerald-300/40 font-semibold shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3),0_8px_20px_-4px_rgba(16,185,129,0.35)] hover:shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.4),0_12px_25px_-4px_rgba(16,185,129,0.5)]',
    
    // Outline Glass
    outline: 'bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/[0.04] hover:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/[0.1] text-slate-200 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] hover:border-white/35',
    
    // Ghost Glass
    ghost: 'bg-transparent hover:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl/[0.06] text-slate-300 backdrop-blur-sm',
    
    // Danger Frosted Rose
    danger: 'bg-gradient-to-r from-rose-600/90 to-red-600/90 hover:from-rose-500 hover:to-red-500 text-white backdrop-blur-md border border-rose-400/30 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.3),0_8px_20px_-4px_rgba(244,63,94,0.35)]'
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-xl gap-1.5',
    md: 'text-sm px-4 py-2 rounded-xl gap-2',
    lg: 'text-base px-5 py-2.5 rounded-2xl gap-2.5'
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin mr-2" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};

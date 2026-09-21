import React from 'react';

export interface CmtLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'standard' | 'white' | 'dark' | 'yellow' | 'monochrome';
}

/**
 * ISOTIPO (Símbolo puro)
 * El tridente fisonómico de 3 flechas ascendentes con base de canales estratégicos.
 * Representa visión de futuro, dirección política y convergencia de datos.
 */
export const CmtIsotipo: React.FC<CmtLogoProps> = ({
  className = '',
  size = 40,
  variant = 'standard'
}) => {
  // Paletas según variante
  const burgundy = variant === 'white' ? '#FFFFFF' : variant === 'yellow' ? '#FACC15' : '#85172C';
  const grey = variant === 'white' ? '#E2E8F0' : variant === 'yellow' ? '#FEF08A' : '#737B80';
  const accent = variant === 'white' ? '#CBD5E1' : variant === 'yellow' ? '#FDE047' : '#5A101E';

  return (
    <svg
      viewBox="0 0 160 170"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none shrink-0 ${className}`}
      aria-label="CMT Proteus Isotipo"
    >
      <g transform="translate(80, 85)">
        {/* FLECHAS GRISES (Visión de Futuro) */}
        
        {/* Flecha Central (Vertical) */}
        <g id="center-arrow">
          {/* Vástago central */}
          <path
            d="M -7 -10 L 7 -10 L 6 -52 L -6 -52 Z"
            fill={grey}
          />
          {/* Cabeza de flecha central */}
          <path
            d="M 0 -80 L 19 -46 L 6 -48 L 6 -50 L -6 -50 L -6 -48 L -19 -46 Z"
            fill={grey}
          />
        </g>

        {/* Flecha Izquierda (Inclinada ~25°) */}
        <g id="left-arrow" transform="rotate(-23, -28, -25)">
          {/* Vástago */}
          <path
            d="M -33 -10 L -21 -10 L -23 -52 L -31 -52 Z"
            fill={grey}
          />
          {/* Cabeza */}
          <path
            d="M -27 -76 L -10 -45 L -21 -47 L -21 -49 L -33 -49 L -33 -47 L -44 -45 Z"
            fill={grey}
          />
        </g>

        {/* Flecha Derecha (Inclinada ~25°) */}
        <g id="right-arrow" transform="rotate(23, 28, -25)">
          {/* Vástago */}
          <path
            d="M 21 -10 L 33 -10 L 31 -52 L 23 -52 Z"
            fill={grey}
          />
          {/* Cabeza */}
          <path
            d="M 27 -76 L 44 -45 L 33 -47 L 33 -49 L 21 -49 L 21 -47 L 10 -45 Z"
            fill={grey}
          />
        </g>

        {/* BASE DEL TRIDENTE (Cáliz y Canales en Burdeos/Vino Tinto #85172C) */}
        
        {/* Brazo Exterior Izquierdo del Cáliz */}
        <path
          d="M -54 -12 
             L -44 -12 
             L -44 14 
             L -28 26 
             L -34 33 
             L -54 18 
             Z"
          fill={burgundy}
        />

        {/* Brazo Exterior Derecho del Cáliz */}
        <path
          d="M 54 -12 
             L 54 18 
             L 34 33 
             L 28 26 
             L 44 14 
             L 44 -12 
             Z"
          fill={burgundy}
        />

        {/* Canaleta Curva Dinámica Central (La 'S' o flujo convergente) */}
        <path
          d="M -18 72 
             L -7 72 
             C -7 55, -2 42, 6 32 
             C 14 22, 22 14, 25 -4 
             L 14 -4 
             C 12 10, 4 17, -3 25 
             C -11 34, -18 47, -18 72 
             Z"
          fill={burgundy}
        />

        {/* Pilar Vertical Base Central-Derecho */}
        <path
          d="M 0 72 
             L 11 72 
             C 11 58, 16 46, 23 37 
             L 14 30 
             C 6 40, 0 52, 0 72 
             Z"
          fill={accent}
        />

        {/* Pilar Vertical Base Exterior Derecho */}
        <path
          d="M 18 72 
             L 29 72 
             L 29 46 
             L 18 46 
             Z"
          fill={burgundy}
        />

        {/* Cuenco de ensamble inferior del cáliz */}
        <path
          d="M -44 12 
             L -26 25 
             C -18 18, -12 10, -8 -4 
             L -18 -4 
             C -21 5, -26 12, -32 17 
             L -44 8 
             Z"
          fill={burgundy}
        />
      </g>
    </svg>
  );
};

/**
 * LOGOTIPO (Tipográfico Puro)
 * Tipografía geométrica robusta "CMT" con subtítulo espaciado "PROTEUS".
 */
export const CmtLogotipo: React.FC<{
  className?: string;
  variant?: 'standard' | 'white' | 'dark' | 'yellow';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}> = ({
  className = '',
  variant = 'standard',
  size = 'md'
}) => {
  const textColor = variant === 'white' 
    ? 'text-white' 
    : variant === 'yellow' 
    ? 'text-[#FACC15]' 
    : variant === 'dark' 
    ? 'text-white' 
    : 'text-[#85172C]';

  const subColor = variant === 'white' 
    ? 'text-slate-200' 
    : variant === 'yellow' 
    ? 'text-yellow-200' 
    : variant === 'dark' 
    ? 'text-slate-200' 
    : 'text-[#85172C]';

  const scaleClasses = {
    sm: { title: 'text-lg', sub: 'text-[9px] tracking-[0.25em]' },
    md: { title: 'text-2xl', sub: 'text-xs tracking-[0.3em]' },
    lg: { title: 'text-3xl', sub: 'text-sm tracking-[0.35em]' },
    xl: { title: 'text-4xl sm:text-5xl', sub: 'text-base tracking-[0.4em]' }
  }[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center leading-none select-none ${className}`}>
      <span className={`font-black ${scaleClasses.title} ${textColor} font-sans tracking-tight`}>
        CMT
      </span>
      <span className={`font-bold uppercase ${scaleClasses.sub} ${subColor} mt-1`}>
        PROTEUS
      </span>
    </div>
  );
};

/**
 * IMAGOTIPO (Símbolo y Texto separables)
 * El Isotipo tridente ubicado arriba del Logotipo "CMT PROTEUS".
 * Puede renderizarse en orientación vertical o en barra horizontal.
 */
export const CmtImagotipo: React.FC<{
  className?: string;
  layout?: 'vertical' | 'horizontal';
  variant?: 'standard' | 'white' | 'dark' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  withTagline?: boolean;
}> = ({
  className = '',
  layout = 'vertical',
  variant = 'standard',
  size = 'md',
  withTagline = false
}) => {
  const iconSizes = {
    sm: layout === 'vertical' ? 38 : 28,
    md: layout === 'vertical' ? 52 : 36,
    lg: layout === 'vertical' ? 70 : 48
  }[size];

  if (layout === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        <CmtIsotipo size={iconSizes} variant={variant} />
        <div className="flex flex-col text-left">
          <CmtLogotipo variant={variant} size={size === 'lg' ? 'md' : 'sm'} />
          {withTagline && (
            <span className={`text-[8px] sm:text-[9px] font-semibold tracking-wider uppercase mt-0.5 ${variant === 'white' ? 'text-blue-200' : 'text-slate-400'}`}>
              Consultoría Estratégica y Visión de Futuro
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center justify-center text-center select-none ${className}`}>
      <CmtIsotipo size={iconSizes} variant={variant} />
      <div className="mt-2">
        <CmtLogotipo variant={variant} size={size} />
      </div>
      {withTagline && (
        <span className={`text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase mt-1 max-w-[220px] ${variant === 'white' ? 'text-blue-200' : 'text-slate-300'}`}>
          Consultoría Estratégica y Visión de Futuro
        </span>
      )}
    </div>
  );
};

/**
 * ISOLOGO (Emblema Combinado)
 * El emblema integrado: Las flechas del tridente emergen del contorno de una placa heráldica
 * que contiene en su interior el monograma "CMT" y el marco "PROTEUS".
 */
export const CmtIsologo: React.FC<{
  className?: string;
  width?: number | string;
  height?: number | string;
  variant?: 'standard' | 'white' | 'dark';
}> = ({
  className = '',
  width = 170,
  height = 95,
  variant = 'standard'
}) => {
  const mainBg = variant === 'white' ? '#FFFFFF' : '#85172C';
  const innerBg = variant === 'white' ? '#F1F5F9' : '#5A101E';
  const textFill = variant === 'white' ? '#85172C' : '#FFFFFF';
  const arrowColor = variant === 'white' ? '#64748B' : '#9CA3AF';
  const frameBorder = variant === 'white' ? '#CBD5E1' : '#B91C1C';

  return (
    <svg
      viewBox="0 0 240 135"
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none shrink-0 ${className}`}
      aria-label="CMT Proteus Isologo"
    >
      {/* FLECHAS QUE EMERGEN SUPERIORES */}
      <g id="isologo-arrows">
        {/* Flecha Izquierda */}
        <g transform="translate(48, 48) rotate(-23)">
          <path d="M -4 10 L 4 10 L 4 -28 L -4 -28 Z" fill={arrowColor} />
          <path d="M 0 -48 L 13 -26 L 4 -27 L 4 -28 L -4 -28 L -4 -27 L -13 -26 Z" fill={arrowColor} />
        </g>
        {/* Flecha Central */}
        <g transform="translate(78, 38)">
          <path d="M -4 12 L 4 12 L 4 -28 L -4 -28 Z" fill={arrowColor} />
          <path d="M 0 -50 L 14 -26 L 4 -27 L 4 -28 L -4 -28 L -4 -27 L -14 -26 Z" fill={arrowColor} />
        </g>
        {/* Flecha Derecha */}
        <g transform="translate(108, 48) rotate(23)">
          <path d="M -4 10 L 4 10 L 4 -28 L -4 -28 Z" fill={arrowColor} />
          <path d="M 0 -48 L 13 -26 L 4 -27 L 4 -28 L -4 -28 L -4 -27 L -13 -26 Z" fill={arrowColor} />
        </g>
      </g>

      {/* PLACA / EMBLEMA HERÁLDICO */}
      {/* Silueta exterior con corona de tres puntas conectada */}
      <path
        d="M 32 38 
           L 44 38 
           L 44 70 
           C 44 82, 54 94, 66 94 
           L 204 94 
           C 214 94, 222 86, 222 76 
           L 222 46 
           C 222 36, 214 28, 204 28 
           L 172 28 
           L 165 14 
           L 156 28 
           L 142 12 
           L 134 26 
           L 126 38 
           L 96 38 
           L 84 56 
           C 76 68, 62 76, 52 76 
           L 32 76 
           Z"
        fill={mainBg}
      />

      {/* Contenedor interior oscuro para alto contraste */}
      <rect
        x="98"
        y="36"
        width="116"
        height="50"
        rx="10"
        fill={innerBg}
        fillOpacity="0.85"
      />

      {/* Borde / marco interior estilo heráldico */}
      <rect
        x="102"
        y="40"
        width="108"
        height="42"
        rx="8"
        stroke={frameBorder}
        strokeWidth="1.5"
        strokeDasharray="140 10"
      />

      {/* Tipografía CMT integrada */}
      <text
        x="156"
        y="60"
        fill={textFill}
        fontSize="22"
        fontWeight="900"
        fontFamily="sans-serif"
        textAnchor="middle"
        letterSpacing="2"
      >
        CMT
      </text>

      {/* Tipografía PROTEUS con caja de contorno */}
      <text
        x="156"
        y="75"
        fill={textFill}
        fontSize="9"
        fontWeight="700"
        fontFamily="sans-serif"
        textAnchor="middle"
        letterSpacing="4"
      >
        PROTEUS
      </text>
    </svg>
  );
};

/**
 * Visualizador y Selector de Marca (Modal o Panel de Consulta)
 * Muestra las 4 variantes de identidad institucional con sus nombres técnicos:
 * - LOGO (Logotipo puro)
 * - ISOLOGO (Emblema combinado)
 * - IMAGOTIPO (Símbolo y texto separables)
 * - ISOTIPO (Símbolo puro)
 */
export const CmtBrandManualCard: React.FC<{
  className?: string;
  compact?: boolean;
}> = ({
  className = '',
  compact = false
}) => {
  return (
    <div className={`bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl border border-white/10/90 shadow-sm p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <CmtIsotipo size={22} />
          <div>
            <h4 className="text-xs font-black text-white tracking-tight">
              Identidad Visual Oficial: CMT PROTEUS
            </h4>
            <p className="text-[10px] text-slate-400">
              Consultoría Estratégica y Visión de Futuro
            </p>
          </div>
        </div>
        <span className="text-[9px] font-bold uppercase tracking-wider bg-red-50 text-[#85172C] px-2 py-0.5 rounded-full border border-red-100">
          Manual de Marca
        </span>
      </div>

      <div className={`grid ${compact ? 'grid-cols-2 gap-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'}`}>
        
        {/* 1. LOGOTIPO PURO */}
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-3.5 border border-white/10 flex flex-col items-center justify-between text-center min-h-[120px]">
          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
            1. Logotipo (Puro)
          </span>
          <div className="my-auto py-2">
            <CmtLogotipo size="md" />
          </div>
          <span className="text-[9px] text-slate-400 font-medium">Tipografía corporativa</span>
        </div>

        {/* 2. ISOLOGO COMBINADO */}
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-3.5 border border-white/10 flex flex-col items-center justify-between text-center min-h-[120px]">
          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
            2. Isologo (Emblema)
          </span>
          <div className="my-auto py-1">
            <CmtIsologo width={130} height={60} />
          </div>
          <span className="text-[9px] text-slate-400 font-medium">Emblema integrado</span>
        </div>

        {/* 3. IMAGOTIPO */}
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-3.5 border border-white/10 flex flex-col items-center justify-between text-center min-h-[120px]">
          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
            3. Imagotipo
          </span>
          <div className="my-auto py-1">
            <CmtImagotipo size="sm" />
          </div>
          <span className="text-[9px] text-slate-400 font-medium">Símbolo + Texto</span>
        </div>

        {/* 4. ISOTIPO PURO */}
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-xl p-3.5 border border-white/10 flex flex-col items-center justify-between text-center min-h-[120px]">
          <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
            4. Isotipo (Símbolo)
          </span>
          <div className="my-auto py-1">
            <CmtIsotipo size={48} />
          </div>
          <span className="text-[9px] text-slate-400 font-medium">Símbolo de 3 flechas</span>
        </div>

      </div>
    </div>
  );
};

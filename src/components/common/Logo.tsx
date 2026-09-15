import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'dark', 
  size = 'md',
  className = '',
  onClick
}) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-[#16382E]';
  const subtextColor = isLight ? 'text-white/80' : 'text-[#222222]/80';
  const templeStroke = isLight ? '#E5C378' : '#B68A3C';

  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.25 : 1;

  return (
    <div 
      onClick={onClick}
      className={`flex items-center gap-3 cursor-pointer select-none ${className}`}
      id="vdpd-brand-logo"
    >
      {/* VDPD Temple Shikhara & Peacock Feather Icon */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg 
          width={48 * scale} 
          height={48 * scale} 
          viewBox="0 0 64 64" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm transition-transform hover:scale-105"
        >
          {/* Base platform */}
          <rect x="10" y="52" width="44" height="4" rx="1.5" fill={templeStroke} />
          <rect x="14" y="48" width="36" height="3" rx="1" fill={templeStroke} />

          {/* Central Temple Shikhara (Sanctum tower) */}
          <path 
            d="M32 10L42 46H22L32 10Z" 
            stroke={templeStroke} 
            strokeWidth="2.2" 
            strokeLinejoin="round" 
            fill={isLight ? 'rgba(182, 138, 60, 0.2)' : 'rgba(248, 246, 241, 0.8)'}
          />
          {/* Fluted tiers of central shikhara */}
          <line x1="25" y1="36" x2="39" y2="36" stroke={templeStroke} strokeWidth="1.5" />
          <line x1="28" y1="26" x2="36" y2="26" stroke={templeStroke} strokeWidth="1.5" />
          <line x1="30" y1="18" x2="34" y2="18" stroke={templeStroke} strokeWidth="1.5" />
          
          {/* Kalash & Dhwaja (Spire finial) */}
          <circle cx="32" cy="8" r="2" fill={templeStroke} />
          <path d="M32 6V3L37 4.5L32 6Z" fill="#B68A3C" />

          {/* Left subsidiary shikhara */}
          <path 
            d="M20 24L26 46H14L20 24Z" 
            stroke={templeStroke} 
            strokeWidth="1.8" 
            strokeLinejoin="round" 
            fill={isLight ? 'rgba(182, 138, 60, 0.15)' : 'rgba(248, 246, 241, 0.5)'}
          />
          <circle cx="20" cy="22" r="1.5" fill={templeStroke} />

          {/* Right subsidiary shikhara */}
          <path 
            d="M44 24L50 46H38L44 24Z" 
            stroke={templeStroke} 
            strokeWidth="1.8" 
            strokeLinejoin="round" 
            fill={isLight ? 'rgba(182, 138, 60, 0.15)' : 'rgba(248, 246, 241, 0.5)'}
          />
          <circle cx="44" cy="22" r="1.5" fill={templeStroke} />

          {/* Arched Sanctum Doorway */}
          <path d="M28 48C28 43.5 36 43.5 36 48V52H28V48Z" fill={templeStroke} />

          {/* Peacock Feather (Mor Pankh) rising from the right */}
          <g transform="translate(38, 2) rotate(18) scale(0.65)">
            {/* Feather spine */}
            <path d="M12 36C12 24 14 12 16 0" stroke="#0D5C3A" strokeWidth="1.8" strokeLinecap="round" />
            {/* Outer feather eye */}
            <ellipse cx="16" cy="10" rx="9" ry="12" fill="#14532D" />
            {/* Cyan / Blue iridescent layer */}
            <ellipse cx="16" cy="11" rx="6" ry="8" fill="#0284C7" />
            {/* Gold highlight */}
            <ellipse cx="16" cy="12" rx="4" ry="5.5" fill="#EAB308" />
            {/* Dark inner center */}
            <circle cx="16" cy="13" r="2.5" fill="#1E1B4B" />
          </g>
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className={`font-playfair font-bold tracking-tight text-2xl md:text-3xl leading-none ${textColor}`}>
            VDPD
          </span>
        </div>
        <span className={`text-[9px] md:text-[10px] uppercase font-medium tracking-wider leading-tight ${subtextColor}`}>
          Vrindavan Dham Property & Developers
        </span>
      </div>
    </div>
  );
};

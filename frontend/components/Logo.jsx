export default function Logo({ variant = 'color', className = '' }) {
  const sunColor = variant === 'white' ? '#ffffff' : '#FFC72C';
  const textColor = variant === 'white' ? '#ffffff' : '#1E2A38';
  const subtextColor = variant === 'white' ? 'rgba(255,255,255,0.8)' : '#2B7DBF';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Sun SVG mark */}
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Rays */}
        <line x1="19" y1="2" x2="19" y2="7" stroke={sunColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="19" y1="31" x2="19" y2="36" stroke={sunColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="2" y1="19" x2="7" y2="19" stroke={sunColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="31" y1="19" x2="36" y2="19" stroke={sunColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="6.1" y1="6.1" x2="9.6" y2="9.6" stroke={sunColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="28.4" y1="28.4" x2="31.9" y2="31.9" stroke={sunColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="31.9" y1="6.1" x2="28.4" y2="9.6" stroke={sunColor} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="9.6" y1="28.4" x2="6.1" y2="31.9" stroke={sunColor} strokeWidth="2.5" strokeLinecap="round" />
        {/* Sun circle */}
        <circle cx="19" cy="19" r="8" fill={sunColor} />
        {/* Horizon wave (bottom arc suggesting sunrise) */}
        <path
          d="M9 23 Q14 26 19 23 Q24 20 29 23"
          stroke={subtextColor}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span
          className="font-bold text-base tracking-tight"
          style={{ color: textColor, fontSize: '15px', lineHeight: '1.1' }}
        >
          Sunshine
        </span>
        <span
          className="font-medium text-xs tracking-wide uppercase"
          style={{ color: subtextColor, fontSize: '9px', letterSpacing: '0.08em', lineHeight: '1.3' }}
        >
          Clinical Laboratory
        </span>
      </div>
    </div>
  );
}

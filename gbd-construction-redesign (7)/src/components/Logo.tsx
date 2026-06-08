export const LogoIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 400 400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer Roof Line */}
    <path d="M 40 180 L 200 100 L 360 180 L 360 160 L 200 80 L 40 160 Z" />
    {/* Inner Roof Line */}
    <path d="M 60 180 L 200 110 L 340 180 L 340 165 L 200 95 L 60 165 Z" />
    
    {/* GBD Custom Text Path for precision */}
    <text x="200" y="260" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="900" fontSize="120" letterSpacing="-2">GBD</text>
    
    {/* Double underline */}
    <rect x="40" y="275" width="320" height="8" />
    <rect x="40" y="295" width="320" height="8" />
    
    {/* Construction Text */}
    <text x="200" y="350" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="900" fontSize="56" letterSpacing="0">Construction</text>
  </svg>
);

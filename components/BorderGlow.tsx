import { useRef, useCallback, useState, useEffect, type ReactNode } from 'react';

interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  animated?: boolean;
  colors?: string[];
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = '',
  glowColor = '142 70 45',
  backgroundColor = '#030712',
  borderRadius = 16,
  glowRadius = 50,
  glowIntensity = 1,
  colors = ['#22c55e', '#10b981', '#4ade80'],
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={`relative p-px overflow-hidden ${className}`}
      style={{ 
        borderRadius: `${borderRadius}px`,
        background: isHovered ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'
      }}
    >
      {/* Dynamic Glow Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? glowIntensity : 0,
          background: `radial-gradient(${glowRadius}px circle at ${position.x}px ${position.y}px, ${colors[0]}, transparent)`,
        }}
      />

      {/* Content Container */}
      <div 
        className="relative z-10 w-full h-full rounded-[inherit]"
        style={{ background: backgroundColor }}
      >
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
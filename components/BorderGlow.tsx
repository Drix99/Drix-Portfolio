'use client'

import { useRef, useState, type ReactNode } from 'react';

interface BorderGlowProps {
  children?: ReactNode;
  className?: string;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  animated?: boolean; // Now defined!
  animationDuration?: number; // Now defined!
  colors?: string[];
}

const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  className = '',
  backgroundColor = '#030712',
  borderRadius = 16,
  glowRadius = 150,
  glowIntensity = 1,
  animated = false,
  animationDuration = 4,
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
      className={`relative p-[1.5px] overflow-hidden group ${className}`}
      style={{ 
        borderRadius: `${borderRadius}px`,
      }}
    >
      {/* 1. MOVING NEON ANIMATION LAYER */}
      {animated && (
        <div
          className="absolute inset-[-200%] z-0 animate-[spin_var(--duration)_linear_infinite] opacity-100"
          style={{
            ['--duration' as string]: `${animationDuration}s`,
            background: `conic-gradient(from 0deg, transparent 60%, ${colors[0]}, ${colors[1]}, ${colors[2]}, transparent 100%)`,
          }}
        />
      )}

      {/* 2. MOUSE FOLLOW GLOW LAYER (Radial) */}
      <div
        className="absolute inset-0 z-1 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? glowIntensity : 0,
          background: `radial-gradient(${glowRadius}px circle at ${position.x}px ${position.y}px, ${colors[1]}44, transparent 80%)`,
        }}
      />

      {/* 3. CONTENT CONTAINER */}
      <div 
        className="relative z-10 w-full h-full rounded-[calc(inherit-1px)]"
        style={{ background: backgroundColor }}
      >
        {children}
      </div>

      {/* Internal CSS for the spin animation if not in tailwind config */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default BorderGlow;
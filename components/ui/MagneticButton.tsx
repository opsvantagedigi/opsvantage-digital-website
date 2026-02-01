import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

// GOVERNANCE: Micro-Interaction Logic
// This component adds "soul" to the UI by responding to user intent (cursor movement).
// It maintains accessibility while providing a premium feel.

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  className = ''
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    
    const x = (clientX - (left + width / 2)) * 0.35; // Magnet strength
    const y = (clientY - (top + height / 2)) * 0.35;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-8 py-3 rounded-full font-medium transition-colors duration-300 ease-out overflow-hidden group";
  const variants = {
    primary: "bg-titan-50 text-titan-950 hover:bg-white border border-transparent",
    secondary: "bg-transparent text-titan-50 border border-titan-800 hover:border-titan-accent"
  };

  return (
    <button
      ref={btnRef}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.1s linear',
      }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Hover Fill Effect */}
      <div className="absolute inset-0 bg-titan-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    </button>
  );
};
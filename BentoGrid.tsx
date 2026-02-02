import React from 'react';

// GOVERNANCE: Information Architecture
// The Bento Grid allows for scanning complex information quickly. 
// It adheres to the "No Walls of Text" doctrine.

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  );
};

export const BentoItem: React.FC<BentoItemProps> = ({ children, className = '', colSpan = 1 }) => {
  const colSpanClass = colSpan === 2 ? 'md:col-span-2' : colSpan === 3 ? 'md:col-span-3' : 'md:col-span-1';
  
  return (
    <div className={`
      bg-titan-900/50 border border-titan-800 rounded-2xl p-6 md:p-8 
      hover:border-titan-accent/50 transition-colors duration-500
      backdrop-blur-sm relative overflow-hidden group
      ${colSpanClass} ${className}
    `}>
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-titan-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
};
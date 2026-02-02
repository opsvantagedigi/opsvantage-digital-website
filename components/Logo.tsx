import React from 'react';
import { Icon } from './Icon';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Icon className="text-titan-accent" />
      <span className="text-2xl font-serif font-bold tracking-tight text-slate-900 dark:text-white">OpsVantage Digital</span>
    </div>
  );
};
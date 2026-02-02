import React from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', variant = 'primary', ...props }) => {
  const baseClasses = 'px-6 py-3 rounded-md font-medium transition-all duration-300 inline-flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-titan-accent text-titan-950 hover:bg-white',
    secondary: 'bg-transparent border border-titan-700 text-slate-300 hover:bg-titan-800 hover:text-white'
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
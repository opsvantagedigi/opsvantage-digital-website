import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const Icon: React.FC<IconProps> = (props) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16C3 8.8203 8.8203 3 16 3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M16 3C23.1797 3 29 8.8203 29 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 20L16 12L21 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
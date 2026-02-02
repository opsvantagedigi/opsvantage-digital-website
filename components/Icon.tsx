import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const Icon: React.FC<IconProps> = (props) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 3C8.8203 3 3 8.8203 3 16C3 23.1797 8.8203 29 16 29C23.1797 29 29 23.1797 29 16C29 8.8203 23.1797 3 16 3Z" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5"/>
      <path d="M11 20L16 12L21 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
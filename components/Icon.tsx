import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const Icon: React.FC<IconProps> = (props) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
          <stop offset="90%" stopColor="currentColor" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#orbGradient)"/>
      <path d="M11 20L16 12L21 20" stroke="rgba(0,0,0,0.2)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0.5, 0.5)"/>
      <path d="M11 20L16 12L21 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};
import React from 'react';
import { BRAND_NAME, TAGLINE, NAV_ITEMS, Link } from '../constants';
import { Github, Linkedin, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-titan-950/80 backdrop-blur-md border-t border-titan-800 py-4 z-[998]">
        {/* Subtle Background Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-titan-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. All Rights Reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
              <a href="#" aria-label="Follow on X" className="text-slate-400 hover:text-white transition-colors"><Twitter size={16} /></a>
              <a href="#" aria-label="Connect on LinkedIn" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={16} /></a>
              <a href="#" aria-label="View on GitHub" className="text-slate-400 hover:text-white transition-colors"><Github size={16} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
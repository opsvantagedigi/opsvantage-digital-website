import React from 'react';
import { BRAND_NAME, TAGLINE, NAV_ITEMS, Link } from '../constants';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-titan-950 border-t border-slate-200 dark:border-titan-800 pt-24 pb-12 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-titan-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-6 mb-6">
              {TAGLINE}.<br/>
              Building digital infrastructure for the next generation of industry leaders.
            </p>
            <div className="flex gap-4">
              <a href="#" aria-label="Follow on X" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" aria-label="Connect on LinkedIn" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" aria-label="View on GitHub" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"><Github size={20} /></a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-medium mb-6">Explore</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map(item => (
                <li key={item.path}>
                    <Link to={item.path} className="text-slate-500 dark:text-slate-400 hover:text-titan-accent text-sm transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-medium mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors">Stewardship Pledge</a></li>
            </ul>
          </div>

          {/* Column 4: Office */}
          <div>
            <h3 className="text-slate-900 dark:text-white font-medium mb-6">Office</h3>
            <address className="text-slate-500 dark:text-slate-400 text-sm not-italic leading-relaxed">
              100 Innovation Drive<br />
              Suite 404<br />
              San Francisco, CA 94103<br />
              <br />
              <a href="mailto:hello@opsvantage.com" className="hover:text-slate-900 dark:hover:text-white transition-colors">hello@opsvantage.com</a>
            </address>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-titan-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Legacy Grade Engineering.</p>
        </div>
      </div>
    </footer>
  );
};
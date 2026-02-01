import React from 'react';
import { BRAND_NAME, TAGLINE, NAV_ITEMS, Link } from '../constants';
import { Github, Linkedin, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-titan-950 border-t border-titan-800 pt-24 pb-12 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-titan-accent/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-serif font-bold text-white mb-4">{BRAND_NAME}</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {TAGLINE}.<br/>
              Building digital infrastructure for the next generation of industry leaders.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-medium mb-6">Explore</h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map(item => (
                <li key={item.path}>
                    <Link to={item.path} className="text-slate-400 hover:text-titan-accent text-sm transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors">Stewardship Pledge</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-6">Office</h3>
            <address className="text-slate-400 text-sm not-italic leading-relaxed">
              100 Innovation Drive<br />
              Suite 404<br />
              San Francisco, CA 94103<br />
              <br />
              <a href="mailto:hello@opsvantage.com" className="hover:text-white transition-colors">hello@opsvantage.com</a>
            </address>
          </div>
        </div>

        <div className="border-t border-titan-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. All Rights Reserved.</p>
          <p className="mt-2 md:mt-0">Legacy Grade Engineering.</p>
        </div>
      </div>
    </footer>
  );
};
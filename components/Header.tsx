import React, { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/Icons';

const navLinks = [
  { href: '/Services', label: 'Services' },
  { href: '/Work', label: 'Work' },
  { href: '/Process', label: 'Process' },
  { href: '/Insights', label: 'Insights' },
  { href: '/Pricing', label: 'Pricing' },
  { href: '/Contact', label: 'Contact' },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-titan-950/80 backdrop-blur-sm border-b border-titan-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <span>OpsVantage</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-slate-300 hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
            <Link href="/AILab" className="hidden md:inline-block bg-green-500 text-titan-950 font-bold py-2 px-4 rounded-md hover:bg-green-400 transition-colors">
                AI Builder
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white p-2">
                <Icon name="menu" />
            </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-titan-900">
          <nav className="flex flex-col items-center gap-4 py-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-slate-300 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from '../constants';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { Logo } from './Logo';
import { ThemeToggle } from './ui/ThemeToggle';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[999] transition-all duration-300 py-4 bg-titan-950/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Brand */}
        <NavLink to="/" className="cursor-pointer z-[1000]">
          <Logo />
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer ${isActive ? 'text-titan-accent' : 'text-slate-400 hover:text-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle />
          <NavLink to="/contact" className="ml-2 px-5 py-2 text-sm font-medium bg-white text-titan-950 rounded-full hover:bg-slate-200 transition-colors cursor-pointer">
            Start Project
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white cursor-pointer z-[1000]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-titan-950 border-b border-titan-800 p-6 flex flex-col gap-4 animate-slide-up shadow-2xl max-h-[85vh] overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="text-lg font-medium text-slate-300 hover:text-white py-2 border-b border-titan-900 cursor-pointer"
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-4 pb-8">
             <NavLink to="/contact" className="w-full flex justify-between items-center px-5 py-3 text-center font-medium bg-titan-accent/10 text-titan-accent border border-titan-accent/20 rounded-lg cursor-pointer">
                Start Project <ArrowRight size={16} />
             </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};
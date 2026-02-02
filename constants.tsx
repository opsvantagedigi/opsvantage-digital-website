'use client';

import { NavItem } from './types';
import React from 'react';
import { Link as RouterLink, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { ShieldCheck, BarChart3, Globe2, Cpu, Users, Layers } from 'lucide-react';

// GOVERNANCE: Centralized Configuration
export const BRAND_NAME = "OpsVantage";
export const TAGLINE = "Digital Stewardship for the Modern Era";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/work' },
  { label: 'Insights', path: '/insights' },
  { label: 'AI Lab', path: '/ai-lab' },
  { label: 'Process', path: '/process' },
  { label: 'Contact', path: '/contact' },
];

export const SERVICES_DATA = [
  {
    id: 's1',
    title: 'Digital Transformation',
    description: 'Re-engineering legacy systems into agile, future-proof platforms without disrupting core business continuity.',
    icon: <Globe2 className="w-6 h-6" />,
    tags: ['Architecture', 'Cloud', 'Migration'],
  },
  {
    id: 's2',
    title: 'Data Stewardship',
    description: 'Transforming raw data into governed, actionable assets. We treat data with the ethical weight it deserves.',
    icon: <BarChart3 className="w-6 h-6" />,
    tags: ['Analytics', 'Governance', 'BI'],
  },
  {
    id: 's3',
    title: 'Cyber Resilience',
    description: 'Proactive defense mechanisms designed not just for security, but for enduring trust and reliability.',
    icon: <ShieldCheck className="w-6 h-6" />,
    tags: ['Security', 'Audit', 'Compliance'],
  },
  {
    id: 's4',
    title: 'AI Integration',
    description: 'Deploying Sentient Titan-class AI solutions that amplify human potential rather than replacing it.',
    icon: <Cpu className="w-6 h-6" />,
    tags: ['LLMs', 'Automation', 'Ethics'],
  },
  {
    id: 's5',
    title: 'Human-Centric UX',
    description: 'Designing interfaces that respect user attention and cognitive load. Cinematic, not chaotic.',
    icon: <Users className="w-6 h-6" />,
    tags: ['UI/UX', 'Accessibility', 'Motion'],
  },
  {
    id: 's6',
    title: 'Scalable Infrastructure',
    description: 'Building the bedrock for the next decade of your growth. Robust, documented, and modular.',
    icon: <Layers className="w-6 h-6" />,
    tags: ['DevOps', 'SRE', 'Scale'],
  },
];

// Abstraction for Link components
export const Link: React.FC<{ href: string; className?: string; children: React.ReactNode }> = ({ href, className, children }) => (
  <RouterLink to={href} className={className}>
    {children}
  </RouterLink>
);

export const NavLink: React.FC<{ href: string; className?: string | ((props: { isActive: boolean }) => string); children: React.ReactNode }> = ({ href, className, children }) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  const computedClassName = typeof className === 'function' ? className({ isActive }) : className;

  return (
    <RouterNavLink to={href} className={computedClassName}>
      {children}
    </RouterNavLink>
  );
};
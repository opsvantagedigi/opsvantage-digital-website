'use client';

import React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, BarChart3, Globe2, Cpu, Users, Layers } from 'lucide-react';

// GOVERNANCE: Centralized Configuration
export const BRAND_NAME = "OpsVantage";
export const TAGLINE = "Digital Stewardship for the Modern Era";

export interface NavItem {
  label: string;
  path: string;
}

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

// GOVERNANCE: Abstracting router components allows for easier migration.
export const Link = NextLink;

interface NavLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'> {
  href: string;
  className?: string | ((props: { isActive: boolean }) => string);
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({ href, className, children, ...props }) => {
  const pathname = usePathname();

  // Strict Active Matching
  const normalize = (p: string) => p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : p;
  const isActive = normalize(pathname) === normalize(href);

  const computedClassName = typeof className === 'function' ? className({ isActive }) : className;

  return (
    <Link href={href} className={computedClassName} {...props}>
      {children}
    </Link>
  );
};
import React from 'react';
import { Code, Briefcase, BarChart } from 'lucide-react';

export const SERVICES_DATA = [
  {
    id: 'strategy',
    icon: <Briefcase size={32} />,
    title: 'Digital Strategy & Governance',
    description: 'We align your digital infrastructure with executive intent, establishing robust governance models for long-term resilience and growth.',
    tags: ['Roadmapping', 'System Architecture', 'Compliance', 'Risk Audit'],
  },
  {
    id: 'dev',
    icon: <Code size={32} />,
    title: 'Legacy-Grade Web Engineering',
    description: 'Building pixel-perfect, high-performance websites and applications that serve as a lasting digital asset for your enterprise.',
    tags: ['Next.js', 'Vercel', 'Headless CMS', 'Performance'],
  },
  {
    id: 'performance',
    icon: <BarChart size={32} />,
    title: 'Performance & Security Audits',
    description: 'Our technical audits identify and resolve performance bottlenecks and security vulnerabilities to protect your brand and user experience.',
    tags: ['Lighthouse', 'Core Web Vitals', 'Penetration Testing', 'CI/CD'],
  },
];
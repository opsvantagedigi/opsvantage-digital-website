import { NavItem } from '@/types/index';
import { Code, BarChart, Shield } from 'lucide-react';
import React from 'react';

export const BRAND_NAME = "OpsVantage Digital";
export const TAGLINE = "Digital Stewardship for the Modern Era";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Services', path: '/services' },
  { label: 'Work', path: '/work' },
  { label: 'Insights', path: '/insights' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'AI Lab', path: '/ai-lab' },
  { label: 'Process', path: '/process' },
];

export interface ServiceDataItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
}

export const SERVICES_DATA: ServiceDataItem[] = [
    {
        id: 'web-dev',
        icon: React.createElement(Code, { size: 32 }),
        title: 'Legacy-Grade Web Engineering',
        description: 'We build pixel-perfect, resilient digital ecosystems designed for the 10-year horizon. Our focus is on teachable, maintainable code that your team can inherit with confidence.',
        tags: ['Next.js', 'React', 'Vercel', 'Headless CMS', 'Performance'],
    },
    {
        id: 'analytics',
        icon: React.createElement(BarChart, { size: 32 }),
        title: 'Autonomous Analytics & Insights',
        description: 'Go beyond vanity metrics. We implement self-correcting analytics loops that provide actionable intelligence, ensuring your digital strategy is always aligned with real-world performance.',
        tags: ['Data Science', 'BI Dashboards', 'Conversion Funnels', 'A/B Testing'],
    },
    {
        id: 'governance',
        icon: React.createElement(Shield, { size: 32 }),
        title: 'Digital Stewardship & Governance',
        description: 'Your digital presence is an asset. We provide the governance frameworks to protect it, ensuring security, compliance, and operational integrity without sacrificing agility.',
        tags: ['Security Audits', 'Compliance', 'Infrastructure', 'Maintenance Protocols'],
    },
];
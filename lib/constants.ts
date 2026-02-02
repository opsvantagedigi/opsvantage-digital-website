import { NavItem } from '@/types';
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
        icon: <Code size={32} />,
        title: 'Legacy-Grade Web Engineering',
        description: 'We build pixel-perfect, resilient digital ecosystems designed for the 10-year horizon. Our focus is on teachable, maintainable code that your team can inherit with confidence.',
        tags: ['Next.js', 'React', 'Vercel', 'Headless CMS', 'Performance'],
    },
    // ... other services from the old constants file would go here
];
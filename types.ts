// GOVERNANCE: Centralized Type Definitions
// This file acts as the single source of truth for shared types across the application.

export type AppView = 'landing' | 'auth' | 'dashboard' | 'builder' | 'preview';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface WebsiteSection {
  id: string;
  type: 'hero' | 'features' | 'cta' | 'testimonials' | 'gallery' | 'faq';
  content: {
    title?: string;
    text?: string;
    image?: string;
    items?: { title: string; text: string }[];
  };
}

export interface Website {
  id: string;
  name: string;
  niche: string;
  sections: WebsiteSection[];
  themeColor: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface ProjectCase {
    id: string;
    client: string;
    title: string;
    metric: string;
    imageUrl: string;
}

export interface InsightPost {
    id: string;
    title: string;
    summary: string;
    date: string;
    category: string;
    readTime: string;
}
// GOVERNANCE: Centralized Type Definitions
// This file acts as the single source of truth for shared types across the application.

export interface NavItem {
  label: string;
  path: string;
}

export interface Project {
  id:string;
  created_at: string;
  name: string;
  status: 'active' | 'inactive' | 'archived';
  user_id: string;
  description?: string;
  imageUrl?: string;
  liveUrl?: string;
  repoUrl?: string;
  tags?: string[];
}

export type AppView = 'landing' | 'auth' | 'dashboard' | 'builder' | 'preview';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface WebsiteSection {
  id: string;
  type: 'hero' | 'features' | 'cta' | 'testimonials' | 'gallery' | 'faq' | 'pricing';
  content: {
    title?: string;
    text?: string;
    image?: string;
    items?: { title: string; text: string }[];
    testimonials?: { quote: string; author: string; role: string; }[];
  };
}

export interface Website {
  id: string;
  name: string;
  niche: string;
  sections: WebsiteSection[];
  themeColor: string;
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

export interface Plan {
  plan: string;
  price: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
  priceId?: string;
  billingCycle?: 'monthly' | 'yearly';
}
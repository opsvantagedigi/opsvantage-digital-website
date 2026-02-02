export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
  status: 'active' | 'inactive' | 'archived';
  created_at: string;
}

export interface WebsiteSection {
  id: string;
  type: 'hero' | 'features' | 'cta';
  content: {
    title: string;
    text: string;
    items?: { title: string; text: string }[];
    image?: string;
  };
}

export type AppView = 'landing' | 'auth' | 'dashboard' | 'builder' | 'preview';

export interface Website {
  id: string;
  name: string;
  niche: string;
  description: string;
  sections: WebsiteSection[];
  themeColor: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface InsightPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  readTime: string;
}


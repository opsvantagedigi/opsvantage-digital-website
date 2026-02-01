import React from 'react';

// GOVERNANCE: Type Safety Protocol
// All interfaces must be explicit to ensure future maintainers understand the data structures.

export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

export interface InsightPost {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: "Stewardship" | "Tech" | "Strategy";
  readTime: string;
}

export interface ProjectCase {
  id: string;
  client: string;
  title: string;
  metric: string;
  imageUrl: string;
}
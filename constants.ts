import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import { NavItem } from './types';

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

// GOVERNANCE: Abstracting router components allows for easier migration
// from HashRouter to BrowserRouter if needed in the future.
export const Link = RouterLink;
export const NavLink = RouterNavLink;

// Re-exporting from react-router-dom to maintain a single point of truth for routing components.
export { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
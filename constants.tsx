import { NavItem } from './types';
import React, { useState, useEffect, createContext, useContext, isValidElement, useMemo, useCallback } from 'react';
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

// --- ACTIVE COMMAND ROUTER ---
// Replaces passive hash listening with active state control for guaranteed navigation.

const sanitizePath = (hash: string) => {
  if (!hash) return '/';
  const path = hash.replace(/^#/, '').split('?')[0];
  // Ensure path starts with / and handle empty path after hash removal
  if (path === '' || path === '/') return '/';
  return path.startsWith('/') ? path : '/' + path;
};

interface RouterContextType {
  pathname: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType>({ 
  pathname: '/', 
  navigate: () => {} 
});

export const useLocation = () => useContext(RouterContext);
export const useNavigate = () => useContext(RouterContext).navigate;

export const HashRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathname, setPathname] = useState(sanitizePath(window.location.hash));

  const navigate = useCallback((to: string) => {
    // 1. Update Browser URL
    window.location.hash = to;
    // 2. Force React State Update (Instant Feedback)
    setPathname(sanitizePath(to));
    // 3. Scroll to top on navigation
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const newPath = sanitizePath(window.location.hash);
      setPathname(newPath);
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Safety: ensure we are in sync on mount
    if (sanitizePath(window.location.hash) !== pathname) {
       setPathname(sanitizePath(window.location.hash));
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [pathname]);

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }> = ({ to, children, className, onClick, ...props }) => {
  const { navigate } = useContext(RouterContext);
  const href = `#${to.startsWith('/') ? to : '/' + to}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Stop browser default
    navigate(to);       // Trigger active navigation
    if (onClick) onClick(e);
  };

  return (
    <a href={href} onClick={handleClick} className={`cursor-pointer ${className || ''}`} {...props}>
      {children}
    </a>
  );
};

interface NavLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  to: string;
  className?: string | ((props: { isActive: boolean }) => string);
}

export const NavLink: React.FC<NavLinkProps> = ({ to, className, children, onClick, ...props }) => {
  const { pathname, navigate } = useContext(RouterContext);
  
  // Strict Active Matching
  const normalize = (p: string) => p.endsWith('/') && p.length > 1 ? p.slice(0, -1) : p;
  const current = normalize(pathname);
  const target = normalize(to.startsWith('/') ? to : '/' + to);
  
  // Matches exact path or subpaths (except root which must be exact)
  const isActive = target === '/' ? current === '/' : current.startsWith(target);

  const computedClassName = typeof className === 'function' ? className({ isActive }) : className;
  const href = `#${target}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
    if (onClick) onClick(e);
  };
  
  return (
    <a href={href} onClick={handleClick} className={`cursor-pointer ${computedClassName || ''}`} {...props}>
      {children}
    </a>
  );
};

export const Routes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  
  let match: React.ReactElement | null = null;
  let fallback: React.ReactElement | null = null;

  React.Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    
    const { path } = child.props as { path: string };
    
    // Strict match
    if (path === pathname) {
      match = child;
    }
    // Catch-all
    if (path === '*') {
      fallback = child;
    }
  });

  const activeRoute = match || fallback;

  // Direct render of the element prop to avoid component wrapping issues
  return activeRoute ? (activeRoute.props as any).element : null;
};

// Route is now just a data carrier, it doesn't need to render anything itself in this pattern
export const Route: React.FC<{ path: string; element: React.ReactNode }> = ({ element }) => {
  return <>{element}</>;
};
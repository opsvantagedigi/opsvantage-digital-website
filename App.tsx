import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from './constants';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTopButton } from './components/ui/ScrollToTopButton';

// GOVERNANCE: Static Imports for Stability
// Switching to static imports ensures all modules are loaded immediately, preventing runtime fetch errors.
import Home from './pages/Home';
import Services from './pages/Services';
import Work from './pages/Work';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import Process from './pages/Process';
import AILab from './pages/AIWebBuilder';

// GOVERNANCE: Error Boundary for Resilience
interface TitanErrorBoundaryProps {
  children: React.ReactNode;
}

interface TitanErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class TitanErrorBoundary extends React.Component<TitanErrorBoundaryProps, TitanErrorBoundaryState> {
  state: TitanErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Titan System Failure:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-titan-950 flex flex-col items-center justify-center p-6 text-center">
          <div className="text-red-500 font-mono mb-4 text-4xl">SYSTEM CRITICAL</div>
          <p className="text-slate-400 mb-6 max-w-lg">
            The Sentient Titan protocol encountered an unrecoverable error in this sector.
          </p>
          <div className="bg-black border border-red-900/50 p-4 rounded text-left overflow-auto max-w-2xl w-full text-xs text-red-400 font-mono">
             {this.state.error?.toString()}
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-8 px-6 py-2 bg-titan-800 text-white rounded hover:bg-titan-700 transition-colors"
          >
            Reboot System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const LayoutWrapper: React.FC = () => {
  const location = useLocation();
  const isAILabPage = location.pathname.startsWith('/ai-lab');

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 dark:bg-titan-950 dark:text-slate-200 pb-16">
      {!isAILabPage && <Navbar />}
      <main className="flex-grow relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ai-lab" element={<AILab />} />
          <Route path="*" element={<Home />} /> 
        </Routes>
      </main>
      {!isAILabPage && <Footer />}
      {!isAILabPage && <ScrollToTopButton />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TitanErrorBoundary>
      <Router>
        <ScrollToTop />
        <LayoutWrapper />
      </Router>
    </TitanErrorBoundary>
  );
};

export default App;
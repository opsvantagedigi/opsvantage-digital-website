import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { BentoGrid, BentoItem } from '@/BentoGrid';
import { Sparkles } from '@/Sparkles';
import { SERVICES_DATA } from '@/constants';
import Link from 'next/link';
import { Icon } from '@/Icons';

const Home: React.FC = () => {
  return (
    <>
      {/* SECTION: Hero */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-left p-8">
      <div className="max-w-4xl w-full">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-widest text-gray-400">System Override: Active</p>
          <h1 className="text-6xl font-bold text-white">Build for Legacy.</h1>
          <h2 className="text-6xl font-light text-gray-400">Scale with Integrity.</h2>
        </div>

        <p className="text-lg text-gray-300 mb-8 max-w-2xl">
          OpsVantage is the digital stewardship platform for forward-thinking enterprises. We engineer pixel-perfect, resilient digital ecosystems.
        </p>

        <div className="flex items-center space-x-4 mb-16">
          <a href="/work" className="text-white hover:text-gray-300 flex items-center">
            View Our Work <Icon name="arrowRight" className="ml-2" />
          </a>
          <a href="/contact" className="text-white hover:text-gray-300">Schedule Audit</a>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Cinematic Stewardship</h3>
            <p className="text-gray-400">We don't just write code; we uphold a doctrine of care. Every pixel is audited, every interaction is intentional. This is "Legacy Grade" engineering.</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">The Autonomous Matrix</h3>
            <div className="flex items-start">
              <Icon name="checkCircle" className="text-green-500 mr-4 mt-1" size={24} />
              <p className="text-gray-400">Our systems self-correct. We implement automated governance (Loop A, B, C) to ensure your digital infrastructure never decays.</p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Visual Doctrine</h3>
            <p className="text-gray-400">Aggressive whitespace. Motion that guides, not distracts. Aesthetics that command authority.</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Teachable Code</h3>
            <p className="text-gray-400">We build so you can inherit. Clean, documented, modular architectures that your internal teams can own.</p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-2">Performance as a Feature</h3>
            <p className="text-gray-400 mb-4">Lighthouse scores are not vanity metrics; they are indicators of user respect. We target 100/100 across the board.</p>
            <div className="flex space-x-8 text-white">
              <div>
                <p className="text-4xl font-bold">100</p>
                <p className="text-sm text-gray-400">Performance</p>
              </div>
              <div>
                <p className="text-4xl font-bold">100</p>
                <p className="text-sm text-gray-400">Accessibility</p>
              </div>
              <div>
                <p className="text-4xl font-bold">0s</p>
                <p className="text-sm text-gray-400">Downtime</p>
              </div>
            </div>
          </div>

          <div className="pt-16">
            <h3 className="text-2xl font-semibold text-white mb-2">Core Capabilities</h3>
            <p className="text-gray-400 mb-4">The engine room of OpsVantage. Where strategy meets execution.</p>
            <a href="/services" className="text-white hover:text-gray-300 flex items-center mb-8">
              View All Services <Icon name="arrowRight" className="ml-2" />
            </a>
            <div className="flex items-start space-x-4">
              <Icon name="briefcase" className="text-white mt-1" size={24} />
              <h4 className="text-xl font-semibold text-white">Digital Strategy & Governance</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Home;

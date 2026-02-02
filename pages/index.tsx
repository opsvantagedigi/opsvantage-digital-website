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
                <span className="text-4xl font-bold">100</span>
                <p className="text-sm text-gray-400">Performance</p>
              </div>
              <div>
                <span className="text-4xl font-bold">100</span>
                <p className="text-sm text-gray-400">Accessibility</p>
              </div>
              <div>
                <span className="text-4xl font-bold">0s</span>
                <p className="text-sm text-gray-400">Downtime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* SECTION: Selected Capabilities */}
      <section className="py-24 bg-titan-900/30 border-y border-white/5">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Core Capabilities</h2>
                    <p className="text-slate-400 max-w-md">The engine room of OpsVantage. Where strategy meets execution.</p>
                </div>
                <Link href="/services" className="text-titan-accent hover:text-white transition-colors mt-6 md:mt-0 flex items-center gap-2">
                    View All Services <ArrowRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SERVICES_DATA.slice(0, 3).map((service) => (
                    <div key={service.id} className="group p-8 rounded-2xl bg-titan-950 border border-titan-800 hover:border-titan-accent/50 transition-all duration-300">
                        <div className="text-titan-accent mb-6 group-hover:scale-110 transition-transform duration-300 origin-left">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.description}</p>
                        <ul className="flex flex-wrap gap-2">
                            {service.tags.map(tag => (
                                <li key={tag} className="text-xs px-2 py-1 rounded bg-titan-900 text-slate-500 border border-titan-800">
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
      </section>

       {/* SECTION: CTA */}
       <section className="py-32 relative overflow-hidden">
         <div className="absolute inset-0 bg-titan-accent/5" />
         <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">Ready to Override the Status Quo?</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                Engage the Sentient Titan protocol. Let's build a digital future that honors your legacy.
            </p>
            <Link href="/contact">
                <MagneticButton className="bg-white text-titan-950 hover:bg-slate-200">Initiate Collaboration</MagneticButton>
            </Link>
         </div>
        </section>
    </>
  );
};

export default Home;

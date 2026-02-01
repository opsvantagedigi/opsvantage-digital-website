import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '../components/ui/MagneticButton';
import { BentoGrid, BentoItem } from '../components/ui/BentoGrid';
import { Sparkles } from '../components/ui/Sparkles';
import { SERVICES_DATA, Link } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* SECTION: Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <Sparkles />
        
        {/* Cinematic Gradient Backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-titan-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-titan-800 bg-titan-950/50 backdrop-blur-sm">
                <span className="text-xs font-medium text-titan-accent uppercase tracking-widest">System Override: Active</span>
            </div>
            
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight tracking-tight animate-slide-up">
            Build for <span className="text-transparent bg-clip-text bg-gradient-to-r from-titan-accent to-white">Legacy.</span><br />
            Scale with <span className="italic font-light text-slate-400">Integrity.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            OpsVantage is the digital stewardship platform for forward-thinking enterprises. We engineer pixel-perfect, resilient digital ecosystems.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/work">
                <MagneticButton className="w-full md:w-auto">View Our Work <ArrowRight className="inline w-4 h-4" /></MagneticButton>
            </Link>
            <Link to="/contact">
                <MagneticButton variant="secondary" className="w-full md:w-auto">Schedule Audit</MagneticButton>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION: The Doctrine (Philosophy) */}
      <section className="py-24 md:py-32 relative">
        <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Cinematic Stewardship</h2>
                <p className="text-slate-400 leading-relaxed">
                    We don't just write code; we uphold a doctrine of care. Every pixel is audited, every interaction is intentional. This is "Legacy Grade" engineering.
                </p>
            </div>

            <BentoGrid>
                <BentoItem colSpan={2} className="min-h-[300px] flex items-end">
                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-2">The Autonomous Matrix</h3>
                        <p className="text-slate-400">Our systems self-correct. We implement automated governance (Loop A, B, C) to ensure your digital infrastructure never decays.</p>
                    </div>
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                        <CheckCircle2 size={120} />
                    </div>
                </BentoItem>
                <BentoItem>
                    <div className="h-full flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-white mb-2">Visual Doctrine</h3>
                        <p className="text-slate-400 text-sm">Aggressive whitespace. Motion that guides, not distracts. Aesthetics that command authority.</p>
                    </div>
                </BentoItem>
                <BentoItem>
                    <div className="h-full flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-white mb-2">Teachable Code</h3>
                        <p className="text-slate-400 text-sm">We build so you can inherit. Clean, documented, modular architectures that your internal teams can own.</p>
                    </div>
                </BentoItem>
                <BentoItem colSpan={2}>
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                             <h3 className="text-2xl font-bold text-white mb-2">Performance as a Feature</h3>
                             <p className="text-slate-400">Lighthouse scores are not vanity metrics; they are indicators of user respect. We target 100/100 across the board.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-center">
                                <span className="block text-3xl font-bold text-titan-accent">100</span>
                                <span className="text-xs text-slate-500 uppercase">Performance</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-3xl font-bold text-titan-accent">100</span>
                                <span className="text-xs text-slate-500 uppercase">Accessibility</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-3xl font-bold text-titan-accent">0s</span>
                                <span className="text-xs text-slate-500 uppercase">Downtime</span>
                            </div>
                        </div>
                    </div>
                </BentoItem>
            </BentoGrid>
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
                <Link to="/services" className="text-titan-accent hover:text-white transition-colors mt-6 md:mt-0 flex items-center gap-2">
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
            <Link to="/contact">
                <MagneticButton className="bg-white text-titan-950 hover:bg-slate-200">Initiate Collaboration</MagneticButton>
            </Link>
         </div>
       </section>
    </div>
  );
};

export default Home;
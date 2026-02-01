import React from 'react';
import { BentoGrid, BentoItem } from '../components/ui/BentoGrid';

const Process: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-16">The Operations Matrix</h1>
        
        <div className="relative border-l border-titan-800 ml-4 md:ml-12 space-y-24">
            {/* Step 1 */}
            <div className="relative pl-12 md:pl-24">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-titan-accent rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
                <span className="text-titan-accent font-medium tracking-widest text-sm mb-2 block uppercase">Phase 01</span>
                <h2 className="text-3xl font-bold text-white mb-6">Discovery & Mapping</h2>
                <BentoGrid className="mb-8">
                    <BentoItem>
                        <h3 className="text-lg font-bold text-white mb-2">Legacy Audit</h3>
                        <p className="text-slate-400 text-sm">We analyze your existing infrastructure to identify technical debt and stewardship gaps.</p>
                    </BentoItem>
                    <BentoItem colSpan={2}>
                        <h3 className="text-lg font-bold text-white mb-2">The Blueprint</h3>
                        <p className="text-slate-400 text-sm">We create a comprehensive architectural roadmap. No black boxes. Complete transparency.</p>
                    </BentoItem>
                </BentoGrid>
            </div>

            {/* Step 2 */}
            <div className="relative pl-12 md:pl-24">
                 <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-titan-accent rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
                 <span className="text-titan-accent font-medium tracking-widest text-sm mb-2 block uppercase">Phase 02</span>
                <h2 className="text-3xl font-bold text-white mb-6">Execution (The Build)</h2>
                <p className="text-slate-400 max-w-2xl mb-8 text-lg">
                    This is where the Sentient Titan protocol engages. We build using modular, atomic design principles. Every line of code is reviewed for longevity and readability.
                </p>
            </div>

             {/* Step 3 */}
             <div className="relative pl-12 md:pl-24">
                 <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-titan-accent rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
                 <span className="text-titan-accent font-medium tracking-widest text-sm mb-2 block uppercase">Phase 03</span>
                <h2 className="text-3xl font-bold text-white mb-6">Stewardship Handoff</h2>
                <div className="bg-titan-900/50 p-8 rounded-2xl border border-titan-800">
                    <h3 className="text-xl font-bold text-white mb-4">The "Bus Factor" Elimination</h3>
                    <p className="text-slate-400">
                        We don't just hand over keys; we hand over a manual. Your team receives extensive training, documentation, and a clean codebase that welcomes new developers rather than scaring them away.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
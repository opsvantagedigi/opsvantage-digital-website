import React from 'react';
import { RenderSection, WebsiteSection } from '../WebsiteSection';
import { BentoGrid, BentoItem } from '../BentoGrid';

const insightsHeroSection: WebsiteSection = {
  type: 'hero',
  content: {
    title: 'Insights & Perspectives',
    text: 'Our thoughts on strategy, design, and technology in the digital age.',
  },
};

const Insights = () => {
  return (
    <>
      <RenderSection section={insightsHeroSection} accentColor="#00F5B3" />
      <section className="py-20 md:py-24 px-6 container mx-auto">
        <BentoGrid className="auto-rows-[20rem]">
          <BentoItem colSpan={2}>
            <h3 className="text-2xl font-bold font-serif mb-4">The Future of Web is AI-Native</h3>
            <p className="text-slate-400 mb-4">Exploring how artificial intelligence is fundamentally reshaping the way we build and interact with websites.</p>
            <div className="mt-auto pt-4 border-t border-titan-800 text-slate-500 text-sm">
              <span>Technology &middot; 5 min read</span>
            </div>
          </BentoItem>
          <BentoItem>
            <h3 className="text-2xl font-bold font-serif mb-4">Beyond the Pixels</h3>
            <p className="text-slate-400">Why a successful digital strategy goes deeper than just a beautiful design.</p>
            <div className="mt-auto pt-4 border-t border-titan-800 text-slate-500 text-sm">
              <span>Strategy &middot; 8 min read</span>
            </div>
          </BentoItem>
          <BentoItem>
            <h3 className="text-2xl font-bold font-serif mb-4">Core Web Vitals Explained</h3>
            <p className="text-slate-400">A non-technical guide to understanding and improving Google's Core Web Vitals.</p>
            <div className="mt-auto pt-4 border-t border-titan-800 text-slate-500 text-sm">
              <span>SEO &middot; 10 min read</span>
            </div>
          </BentoItem>
        </BentoGrid>
      </section>
    </>
  );
};

export default Insights;

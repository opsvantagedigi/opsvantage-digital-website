import React from 'react';
import { RenderSection, WebsiteSection } from '../WebsiteSection';
import { BentoGrid, BentoItem } from '../BentoGrid';

const workHeroSection: WebsiteSection = {
  type: 'hero',
  content: {
    title: 'Our Work',
    text: 'We take pride in the solutions we build. Here are some of our featured projects.',
  },
};

const Work = () => {
  return (
    <>
      <RenderSection section={workHeroSection} accentColor="#00F5B3" />
      <section className="py-20 md:py-24 px-6 container mx-auto">
        <BentoGrid className="auto-rows-[24rem]">
          <BentoItem colSpan={2}>
            <h3 className="text-2xl font-bold font-serif mb-4">Project Alpha</h3>
            <p className="text-slate-400 mb-4">A complete digital transformation for a leading e-commerce brand, resulting in a 40% increase in conversions.</p>
            <div className="mt-auto pt-4 border-t border-titan-800 text-slate-500 text-sm">
              <span>Next.js, Shopify, Vercel</span>
            </div>
          </BentoItem>
          <BentoItem>
            <h3 className="text-2xl font-bold font-serif mb-4">Project Beta</h3>
            <p className="text-slate-400">A high-performance marketing site for a SaaS startup.</p>
            <div className="mt-auto pt-4 border-t border-titan-800 text-slate-500 text-sm">
              <span>Astro, Tailwind CSS</span>
            </div>
          </BentoItem>
          <BentoItem>
            <h3 className="text-2xl font-bold font-serif mb-4">Project Gamma</h3>
            <p className="text-slate-400">AI-powered analytics dashboard.</p>
            <div className="mt-auto pt-4 border-t border-titan-800 text-slate-500 text-sm">
              <span>React, Supabase</span>
            </div>
          </BentoItem>
          <BentoItem colSpan={2}>
            <h3 className="text-2xl font-bold font-serif mb-4">Project Delta</h3>
            <p className="text-slate-400">A headless CMS implementation for a major media publication, improving content delivery speed by 200%.</p>
            <div className="mt-auto pt-4 border-t border-titan-800 text-slate-500 text-sm">
              <span>Sanity.io, Next.js</span>
            </div>
          </BentoItem>
        </BentoGrid>
      </section>
    </>
  );
};

export default Work;

import React from 'react';
import { RenderSection, WebsiteSection } from '../WebsiteSection';
import { BentoGrid, BentoItem } from '../BentoGrid';
import { CheckCircle2 } from 'lucide-react';

const pricingHeroSection: WebsiteSection = {
  type: 'hero',
  content: {
    title: 'Simple, Transparent Pricing',
    text: 'Choose the plan that\'s right for you. No hidden fees, no surprises.',
  },
};

const Pricing = () => {
  return (
    <div className="min-h-screen bg-titan-950 text-white">
      <main>
        <RenderSection section={pricingHeroSection} accentColor="#00F5B3" />
        <section className="py-20 md:py-24 px-6 container mx-auto">
          <BentoGrid>
            <BentoItem>
              <h3 className="text-2xl font-bold font-serif mb-2">Standard</h3>
              <p className="text-4xl font-bold mb-4">$5,000</p>
              <p className="text-slate-400 mb-6">For small businesses and startups.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-400" /> 5-Page Website</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-400" /> CMS Integration</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-400" /> Basic SEO</li>
              </ul>
            </BentoItem>
            <BentoItem className="border-green-400/50">
              <h3 className="text-2xl font-bold font-serif mb-2">Professional</h3>
              <p className="text-4xl font-bold mb-4">$15,000</p>
              <p className="text-slate-400 mb-6">For growing businesses needing more power.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-400" /> Up to 15 Pages</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-400" /> Headless CMS</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-400" /> Advanced SEO & Analytics</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-400" /> E-commerce Integration</li>
              </ul>
            </BentoItem>
            <BentoItem>
              <h3 className="text-2xl font-bold font-serif mb-2">Enterprise</h3>
              <p className="text-4xl font-bold mb-4">Custom</p>
              <p className="text-slate-400 mb-6">For large organizations with unique needs.</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-400" /> Unlimited Pages</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-400" /> Custom Integrations</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-400" /> Dedicated Support</li>
              </ul>
            </BentoItem>
          </BentoGrid>
        </section>
      </main>
    </div>
  );
};

export default Pricing;

import React from 'react';
import { RenderSection, WebsiteSection } from '../WebsiteSection';
import { BentoGrid, BentoItem } from '../BentoGrid';
import { Sparkles } from '../Sparkles';

const homeSections: WebsiteSection[] = [
  {
    type: 'hero',
    content: {
      title: 'Digital Excellence, Forged in Strategy',
      text: 'We are a digital-native consultancy and agency. We combine strategic thinking, cinematic design, and technical rigour to build websites that deliver measurable results.',
    },
  },
  {
    type: 'features',
    content: {
      title: 'Our Core Services',
      items: [
        {
          title: 'Strategic Consulting',
          text: 'We help you define your digital strategy to ensure your online presence aligns with your business goals.',
        },
        {
          title: 'Website Design & Development',
          text: 'From concept to launch, we create beautiful, high-performance websites that captivate and convert.',
        },
        {
          title: 'Performance Audits',
          text: 'Our technical audits identify and resolve performance bottlenecks to improve user experience and SEO.',
        },
      ],
    },
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-titan-950 text-white">
      <Sparkles />
      <main className="relative z-10">
        {homeSections.map((section, index) => (
          <RenderSection key={index} section={section} accentColor="#00F5B3" />
        ))}

        <section className="py-20 md:py-24 px-6 container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white text-center mb-12">
            Why OpsVantage?
          </h2>
          <BentoGrid>
            <BentoItem colSpan={2}>
              <h3 className="text-2xl font-bold font-serif mb-4">Cinematic Design Doctrine</h3>
              <p className="text-slate-400">We don't just write code; we uphold a doctrine of care. Every pixel is audited, every line of code is purposeful, and every interaction is designed to be memorable.</p>
            </BentoItem>
            <BentoItem>
              <h3 className="text-2xl font-bold font-serif mb-4">Data-Driven</h3>
              <p className="text-slate-400">Our strategies are rooted in data. We use analytics to inform our decisions and drive continuous improvement.</p>
            </BentoItem>
            <BentoItem>
              <h3 className="text-2xl font-bold font-serif mb-4">AI-Powered</h3>
              <p className="text-slate-400">Leveraging the latest in AI to accelerate development and unlock new possibilities for your digital presence.</p>
            </BentoItem>
            <BentoItem colSpan={2}>
              <h3 className="text-2xl font-bold font-serif mb-4">Technical Rigour</h3>
              <p className="text-slate-400">We build robust, scalable, and secure websites that stand the test of time. Our commitment to quality is unwavering.</p>
            </BentoItem>
          </BentoGrid>
        </section>
      </main>
    </div>
  );
};

export default Home;

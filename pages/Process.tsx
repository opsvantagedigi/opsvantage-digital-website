import React from 'react';
import { RenderSection, WebsiteSection } from '../WebsiteSection';

const processSections: WebsiteSection[] = [
  {
    type: 'hero',
    content: {
      title: 'Our Process',
      text: 'A transparent and collaborative process to ensure we deliver on our promises.',
    },
  },
  {
    type: 'features',
    content: {
      title: 'From Vision to Reality',
      items: [
        {
          title: '1. Discovery & Strategy',
          text: 'We start by understanding your business, goals, and audience to create a comprehensive digital strategy.',
        },
        {
          title: '2. Design & Prototyping',
          text: 'We design intuitive and beautiful user interfaces, creating interactive prototypes for your feedback.',
        },
        {
          title: '3. Development & a_i_integration',
          text: 'Our team builds your website with clean, efficient code, integrating AI where it adds the most value.',
        },
        {
          title: '4. Testing & Quality Assurance',
          text: 'We rigorously test every aspect of the site to ensure it\'s fast, secure, and bug-free across all devices.',
        },
        {
          title: '5. Launch & Deployment',
          text: 'We manage the entire deployment process for a smooth and seamless launch on world-class infrastructure.',
        },
        {
          title: '6. Analysis & Iteration',
          text: 'Post-launch, we analyze performance data to identify opportunities for ongoing improvement and growth.',
        },
      ],
    },
  },
];

const Process = () => {
  return (
    <div className="min-h-screen bg-titan-950 text-white">
      <main>
        {processSections.map((section, index) => (
          <RenderSection key={index} section={section} accentColor="#00F5B3" />
        ))}
      </main>
    </div>
  );
};

export default Process;

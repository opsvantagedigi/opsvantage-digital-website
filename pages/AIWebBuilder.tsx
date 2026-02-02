import React from 'react';
import { RenderSection, WebsiteSection } from '../WebsiteSection';

const aiBuilderSections: WebsiteSection[] = [
  {
    type: 'hero',
    content: {
      title: 'The AI Web Builder',
      text: 'An experimental lab for generating and editing website content with the power of AI.',
    },
  },
  {
    type: 'features',
    content: {
      title: 'Capabilities',
      items: [
        {
          title: 'Generative Content',
          text: 'Create entire website sections from a simple prompt. Define the tone, style, and content you need.',
        },
        {
          title: 'Iterative Editing',
          text: 'Refine and edit generated content with natural language commands. Change text, update styles, and more.',
        },
        {
          title: 'Component-Based Architecture',
          text: 'The AI understands your component library and generates valid, structured content that fits your design system.',
        },
      ],
    },
  },
];

const AIWebBuilder = () => {
  return (
    <>
      {aiBuilderSections.map((section, index) => (
        <RenderSection key={index} section={section} accentColor="#00F5B3" />
      ))}
      <div className="container mx-auto text-center py-16">
        <p className="text-slate-400">The AI Web Builder is currently in a private beta.</p>
      </div>
    </>
  );
};

export default AIWebBuilder;

import React from 'react';
import { RenderSection, WebsiteSection } from '../WebsiteSection';

const servicesSections: WebsiteSection[] = [
  {
    type: 'hero',
    content: {
      title: 'Our Services',
      text: 'A suite of services designed to elevate your digital presence, from strategy to execution.',
    },
  },
  {
    type: 'features',
    content: {
      title: 'What We Offer',
      items: [
        {
          title: 'Web Design & Development',
          text: 'Crafting visually stunning and highly functional websites tailored to your brand.',
        },
        {
          title: 'Digital Strategy Consulting',
          text: 'Aligning your digital initiatives with your core business objectives for maximum impact.',
        },
        {
          title: 'SEO & Performance Optimization',
          text: 'Improving your search engine ranking and website speed to attract and retain more visitors.',
        },
        {
          title: 'E-commerce Solutions',
          text: 'Building robust online stores that provide a seamless shopping experience.',
        },
        {
          title: 'AI Integration',
          text: 'Leveraging artificial intelligence to automate processes and create intelligent user experiences.',
        },
        {
          title: 'Content Management Systems',
          text: 'Implementing flexible and powerful CMS solutions for easy content updates.',
        },
      ],
    },
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-titan-950 text-white">
      <main>
        {servicesSections.map((section, index) => (
          <RenderSection key={index} section={section} accentColor="#00F5B3" />
        ))}
      </main>
    </div>
  );
};

export default Services;

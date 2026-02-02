import React from 'react';
import { SERVICES_DATA } from '../constants';

const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-titan-950 text-white py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            Core Capabilities
          </h1>
          <p className="text-slate-400 leading-relaxed text-lg">
            The engine room of OpsVantage. We provide a suite of services designed to build, scale, and govern your digital presence with integrity and precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className="group p-8 rounded-2xl bg-titan-950 border border-titan-800 hover:border-titan-accent/50 transition-all duration-300 flex flex-col">
              <div className="text-titan-accent mb-6 group-hover:scale-110 transition-transform duration-300 origin-left">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>
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
    </div>
  );
};

export default ServicesPage;
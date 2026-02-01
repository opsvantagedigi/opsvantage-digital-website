import React from 'react';
import { SERVICES_DATA, Link } from '../constants';
import { ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mb-24">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-8">
                Technical Mastery.<br />
                <span className="text-titan-accent">Stewardship Driven.</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                We do not sell features; we engineer outcomes. Our capabilities are designed to create resilient, scalable, and high-impact digital ecosystems.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {SERVICES_DATA.map((service, index) => (
                <div key={service.id} className={`group ${index % 2 !== 0 ? 'md:mt-24' : ''}`}>
                    <div className="h-px w-full bg-titan-800 mb-8 group-hover:bg-titan-accent transition-colors duration-500 origin-left" />
                    <div className="mb-6 text-titan-accent">
                        {service.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{service.title}</h2>
                    <p className="text-slate-400 leading-relaxed mb-6 text-lg">
                        {service.description}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-8">
                         {service.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 text-xs font-medium uppercase tracking-wider text-slate-300 bg-titan-900 rounded-full border border-titan-800">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <Link to="/contact" className="inline-flex items-center text-white font-medium hover:text-titan-accent transition-colors">
                        Consult on this <ArrowRight size={16} className="ml-2" />
                    </Link>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
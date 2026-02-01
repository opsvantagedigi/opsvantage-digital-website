import React from 'react';
import { ProjectCase } from '../types';

const PROJECTS: ProjectCase[] = [
  {
    id: 'p1',
    client: 'Apex Global',
    title: 'Enterprise Cloud Migration',
    metric: '40% Reduction in OpEx',
    imageUrl: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: 'p2',
    client: 'Lumina Health',
    title: 'Patient Data Stewardship Platform',
    metric: '100% HIPAA Compliance Score',
    imageUrl: 'https://picsum.photos/800/600?random=2'
  },
  {
    id: 'p3',
    client: 'Ventus Energy',
    title: 'IoT Real-Time Dashboard',
    metric: '200ms Latency',
    imageUrl: 'https://picsum.photos/800/600?random=3'
  },
  {
    id: 'p4',
    client: 'Stratum Finance',
    title: 'High-Frequency Trading UI',
    metric: 'Award Winning UX',
    imageUrl: 'https://picsum.photos/800/600?random=4'
  }
];

const Work: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-16">Selected Work</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PROJECTS.map((project) => (
                <div key={project.id} className="group cursor-pointer">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-8 relative">
                         {/* Overlay */}
                        <div className="absolute inset-0 bg-titan-950/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                        <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-titan-accent text-sm font-medium tracking-wide uppercase mb-2 block">{project.client}</span>
                            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        </div>
                        <div className="text-right hidden md:block">
                             <span className="text-slate-400 text-sm">Key Metric</span>
                             <p className="text-white font-medium">{project.metric}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
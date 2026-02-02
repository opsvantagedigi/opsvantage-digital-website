import React from 'react';
import { WebsiteSection } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface RenderSectionProps {
  section: WebsiteSection;
  isEditing?: boolean;
  onEdit?: () => void;
  accentColor?: string;
}

// This component now acts as a router to render different section types.
export const RenderSection: React.FC<RenderSectionProps> = (props) => {
  const { section } = props;

  switch (section.type) {
    case 'hero':
      return (
        <section className="bg-titan-950 text-white text-center py-20 md:py-32 px-6">
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4" style={{ color: props.accentColor }}>
            {section.content.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            {section.content.text}
          </p>
        </section>
      );
    
    case 'features':
      return (
        <section className="bg-titan-900 py-20 md:py-24 px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-white text-center mb-12">
              {section.content.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.content.items?.map((item, index) => (
                <div key={index} className="bg-titan-800 p-8 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <CheckCircle2 className="w-6 h-6" style={{ color: props.accentColor }} />
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    // Default fallback for unknown section types
    default:
      return (
        <div className="p-8 border-b border-titan-800 bg-titan-900 text-slate-200">
          <h2 className="text-2xl font-bold font-serif">{section.content.title || `Unknown Section: ${section.type}`}</h2>
          <p>{section.content.text}</p>
          {props.isEditing && (
            <button onClick={props.onEdit} className="mt-4 bg-titan-700 px-4 py-2 rounded">
              Edit
            </button>
          )}
        </div>
      );
  }
};
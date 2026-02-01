import React from 'react';
import { WebsiteSection } from '../types';

interface RenderSectionProps {
  section: WebsiteSection;
  isEditing?: boolean;
  onEdit?: () => void;
  accentColor?: string;
}

// Placeholder component for rendering website sections
export const RenderSection: React.FC<RenderSectionProps> = ({ section, isEditing, onEdit }) => {
  return (
    <div className="p-8 border-b bg-white text-slate-800">
      <h2 className="text-2xl font-bold">{section.content.title}</h2>
      <p>{section.content.text}</p>
      {isEditing && (
        <button onClick={onEdit} className="mt-4 bg-gray-200 px-4 py-2 rounded">
          Edit
        </button>
      )}
    </div>
  );
};
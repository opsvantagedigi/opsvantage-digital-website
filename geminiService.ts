import { Website, WebsiteSection } from './types';

export const generateWebsite = async (niche: string, description: string): Promise<Website> => {
  console.log(`Generating website for niche: ${niche}, description: ${description}`);
  
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ niche, description }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to generate website from API.');
  }

  const websiteData: Website = await response.json();
  return websiteData;
};

export const regenerateSection = async (section: WebsiteSection, prompt: string): Promise<WebsiteSection> => {
  console.log(`Regenerating section ${section.id} with prompt: ${prompt}`);
  // TODO: Implement a '/api/regenerate' endpoint similar to the generate one.
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    ...section,
    content: {
      ...section.content,
      title: (section.content.title || '') + ' (Updated)',
      text: `Updated based on prompt: "${prompt}"`,
    }
  };
};
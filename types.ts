export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
}

export interface WebsiteSection {
  type: 'hero' | 'features' | 'cta';
  content: {
    title: string;
    text: string;
    items?: { title: string; text: string }[];
  };
}

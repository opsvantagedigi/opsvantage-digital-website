import React from 'react';
import { InsightPost } from '../types';

const INSIGHTS: InsightPost[] = [
  {
    id: '1',
    title: "The Death of 'Move Fast and Break Things'",
    summary: "Why the next decade of tech belongs to the stewards, not the disruptors. A case for sustainable engineering.",
    date: "Oct 12, 2023",
    category: "Stewardship",
    readTime: "5 min read"
  },
  {
    id: '2',
    title: "React 18 & The Future of Concurrent Rendering",
    summary: "A technical deep dive into how we leverage concurrent features to create 'cinematic' user experiences.",
    date: "Nov 03, 2023",
    category: "Tech",
    readTime: "8 min read"
  },
  {
    id: '3',
    title: "Data Sovereignty in the Age of AI",
    summary: "Navigating the ethical and legal complexities of training LLMs on enterprise data.",
    date: "Dec 15, 2023",
    category: "Strategy",
    readTime: "6 min read"
  }
];

const Insights: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">OpsVantage <span className="italic text-slate-500">Log</span></h1>
        <p className="text-xl text-slate-400 mb-20 max-w-2xl">
            Thoughts on engineering, stewardship, and the future of digital infrastructure.
            Written for humans, by humans (mostly).
        </p>

        <div className="space-y-16">
            {INSIGHTS.map((post) => (
                <article key={post.id} className="group border-b border-titan-800 pb-16 last:border-0 hover:border-titan-accent/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-2 md:mb-0">
                            <span className="text-titan-accent font-medium">{post.category}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                        </div>
                        <span className="text-slate-600 text-sm">{post.readTime}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-titan-accent transition-colors cursor-pointer">
                        {post.title}
                    </h2>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-3xl">
                        {post.summary}
                    </p>
                </article>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;
import React from 'react';
import { RenderSection, WebsiteSection } from '../WebsiteSection';

const contactHeroSection: WebsiteSection = {
  type: 'hero',
  content: {
    title: 'Let\'s Build Together',
    text: 'Have a project in mind? We\'d love to hear about it.',
  },
};

const Contact = () => {
  return (
    <>
      <RenderSection section={contactHeroSection} accentColor="#00F5B3" />
      <section className="py-20 md:py-24 px-6 container mx-auto">
        <div className="max-w-2xl mx-auto bg-titan-900 p-8 rounded-lg">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-slate-400 mb-2">Name</label>
                <input type="text" id="name" className="w-full bg-titan-800 border border-titan-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
              <div>
                <label htmlFor="email" className="block text-slate-400 mb-2">Email</label>
                <input type="email" id="email" className="w-full bg-titan-800 border border-titan-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-400" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-slate-400 mb-2">Message</label>
              <textarea id="message" rows={5} className="w-full bg-titan-800 border border-titan-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-green-400"></textarea>
            </div>
            <div>
              <button type="submit" className="bg-green-500 text-titan-950 font-bold py-3 px-8 rounded-md hover:bg-green-400 transition-colors">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;

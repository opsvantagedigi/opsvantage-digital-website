import React, { useState } from 'react';
import { MagneticButton } from '../components/ui/MagneticButton';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of form submission
    alert(`Thank you, ${formData.name}. The Sentient Titan has received your transmission.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Left: Info */}
            <div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">Let's Talk Strategy.</h1>
                <p className="text-xl text-slate-400 mb-12">
                    We engage with partners who are ready to build for the long term. No pressure tactics, just honest engineering assessments.
                </p>

                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-titan-900 p-3 rounded-lg text-titan-accent">
                            <Mail />
                        </div>
                        <div>
                            <h3 className="text-white font-medium mb-1">Email Us</h3>
                            <p className="text-slate-400">hello@opsvantage.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-titan-900 p-3 rounded-lg text-titan-accent">
                            <Phone />
                        </div>
                        <div>
                            <h3 className="text-white font-medium mb-1">Call Us</h3>
                            <p className="text-slate-400">+1 (415) 555-0123</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-titan-900 p-3 rounded-lg text-titan-accent">
                            <MapPin />
                        </div>
                        <div>
                            <h3 className="text-white font-medium mb-1">HQ</h3>
                            <p className="text-slate-400">100 Innovation Drive, San Francisco, CA</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Form */}
            <div className="bg-titan-900/30 p-8 md:p-12 rounded-3xl border border-titan-800">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                        <input 
                            type="text" 
                            id="name"
                            name="name"
                            required
                            className="w-full bg-titan-950 border border-titan-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-titan-accent transition-colors"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email"
                            required
                            className="w-full bg-titan-950 border border-titan-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-titan-accent transition-colors"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Mission Brief</label>
                        <textarea 
                            id="message"
                            name="message"
                            rows={4}
                            required
                            className="w-full bg-titan-950 border border-titan-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-titan-accent transition-colors resize-none"
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                        />
                    </div>
                    <MagneticButton className="w-full justify-center">Transmit</MagneticButton>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
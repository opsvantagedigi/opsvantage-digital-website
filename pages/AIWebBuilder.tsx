import React, { useState, useEffect, useRef } from 'react';
import { User, Website, AppView, WebsiteSection } from '../types';
import { generateWebsite, regenerateSection } from '../geminiService.ts';
import { RenderSection } from '../components/WebsiteSection.tsx';
import { Plus, Settings, Eye, Magic, Trash, ChevronRight, User as UserIcon, Layout, Globe } from '../components/Icons.tsx';

export default function AILab() {
  const [view, setView] = useState<AppView>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [activeSite, setActiveSite] = useState<Website | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [editPrompt, setEditPrompt] = useState('');
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);

  // Generation Form State
  const [genForm, setGenForm] = useState({ name: '', niche: 'SaaS', desc: '' });

  // Load state from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('gensite_user');
    const savedSites = localStorage.getItem('gensite_websites');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setView('dashboard');
    }
    if (savedSites) {
      setWebsites(JSON.parse(savedSites));
    }
  }, []);

  // Persist websites
  useEffect(() => {
    if (websites.length > 0) {
      localStorage.setItem('gensite_websites', JSON.stringify(websites));
    }
  }, [websites]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser = { id: 'user_' + Date.now(), email: 'hello@world.com', name: 'New Builder' };
    setUser(mockUser);
    localStorage.setItem('gensite_user', JSON.stringify(mockUser));
    setView('dashboard');
  };

  const logout = () => {
    localStorage.removeItem('gensite_user');
    setUser(null);
    setView('landing');
  };

  const startGeneration = async () => {
    if (!genForm.name || !genForm.desc) {
      alert("Please fill in your business name and description.");
      return;
    }

    setIsGenerating(true);
    setGenerationStep(0);
    
    // UI steps simulation
    const steps = ["Analyzing niche...", "Planning structure...", "Writing copy...", "Choosing assets...", "Applying styles..."];
    const interval = setInterval(() => {
      setGenerationStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1000);

    try {
      const fullSite = await generateWebsite(genForm.niche, `${genForm.name}: ${genForm.desc}`);
      setWebsites(prev => [fullSite, ...prev]);
      setActiveSite(fullSite);
      clearInterval(interval);
      setView('builder');
    } catch (err) {
      alert("AI was unable to generate your site. Please check your API key and try again.");
    } finally {
      setIsGenerating(false);
      clearInterval(interval);
    }
  };

  const handleRegenerateSection = async () => {
    if (!activeSite || !editingSectionId || !editPrompt) return;
    
    setIsGenerating(true);
    try {
      const sectionIndex = activeSite.sections.findIndex(s => s.id === editingSectionId);
      const updatedSection = await regenerateSection(activeSite.sections[sectionIndex], editPrompt);
      
      const updatedSections = [...activeSite.sections];
      updatedSections[sectionIndex] = { ...updatedSection, id: editingSectionId };
      
      const updatedSite = { ...activeSite, sections: updatedSections };
      setActiveSite(updatedSite);
      setWebsites(prev => prev.map(s => s.id === updatedSite.id ? updatedSite : s));
      setEditingSectionId(null);
      setEditPrompt('');
    } catch (err) {
      console.error(err);
      alert("Error regenerating section.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (view === 'landing') {
    return (
      <div className="min-h-screen bg-titan-950 text-white">
        <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-bold font-serif text-2xl text-titan-accent">
            <Globe />
            <span>OpsVantage Digital</span>
          </div>
          <button onClick={() => setView('auth')} className="bg-titan-accent text-white px-6 py-2 rounded-full font-medium hover:bg-blue-500 transition">
            Get Started
          </button>
        </nav>
        
        <main className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="inline-block bg-titan-accent/10 text-titan-accent px-4 py-2 rounded-full text-sm font-bold mb-6">
            THE FUTURE OF WEB DESIGN
          </div>
          <h1 className="text-6xl md:text-8xl font-black font-serif text-white mb-8 tracking-tighter">
            Websites that <br /><span className="text-titan-accent">build themselves.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop struggling with drag-and-drop. Describe your business, and our AI constructs a fully functional, high-converting landing page in seconds.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button onClick={() => setView('auth')} className="bg-titan-accent text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-500 transition shadow-2xl">
              Start Free Trial
            </button>
            <button className="bg-titan-800 border-2 border-titan-700 text-slate-200 px-10 py-5 rounded-2xl text-xl font-bold hover:border-titan-600 transition">
              Watch Demo
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (view === 'auth') {
    return (
      <div className="min-h-screen bg-titan-950 flex items-center justify-center p-6">
        <div className="bg-titan-900 p-8 md:p-12 rounded-3xl shadow-2xl max-w-md w-full border border-titan-800 animate-in fade-in zoom-in duration-300">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4 text-titan-accent"><Globe /></div>
            <h2 className="text-3xl font-bold font-serif text-white">Create Account</h2>
            <p className="text-slate-400 mt-2">Join thousands of businesses using OpsVantage Digital.</p>
          </div>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
              <input type="text" required className="w-full p-4 rounded-xl border bg-titan-800 border-titan-700 text-white focus:ring-2 focus:ring-titan-accent outline-none transition" placeholder="Alex Morgan" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
              <input type="email" required className="w-full p-4 rounded-xl border bg-titan-800 border-titan-700 text-white focus:ring-2 focus:ring-titan-accent outline-none transition" placeholder="alex@company.com" />
            </div>
            <button type="submit" className="w-full bg-titan-accent text-white p-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition mt-4 shadow-lg shadow-titan-accent/20">
              Get Started Free
            </button>
          </form>
          <div className="mt-8 text-center text-sm text-slate-500">
            By signing up, you agree to our <span className="underline cursor-pointer">Terms of Service</span>.
          </div>
        </div>
      </div>
    );
  }

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-titan-950 flex">
        <aside className="w-72 bg-titan-900 border-r border-titan-800 p-8 hidden lg:flex flex-col">
          <div className="flex items-center gap-2 font-bold font-serif text-2xl text-titan-accent mb-12">
            <Globe />
            <span>OpsVantage</span>
          </div>
          <nav className="space-y-2 flex-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-titan-accent/10 text-titan-accent rounded-xl font-bold transition">
              <Layout /> My Websites
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-titan-800 rounded-xl transition font-medium">
              <UserIcon /> Account
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-titan-800 rounded-xl transition font-medium">
              <Settings /> Billing
            </button>
          </nav>
          <button onClick={logout} className="text-slate-400 hover:text-white text-sm font-bold flex items-center gap-2 mt-auto">
             Sign Out
          </button>
        </aside>

        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black font-serif text-white tracking-tight">Project Dashboard</h1>
              <p className="text-slate-400 text-lg mt-1">Design, manage and scale your web presence.</p>
            </div>
            <button 
              onClick={() => { setActiveSite(null); setGenForm({name:'', niche:'SaaS', desc:''}); setView('builder'); }}
              className="bg-titan-accent text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-500 transition shadow-xl shadow-titan-accent/20 active:scale-95"
            >
              <Plus /> New Site
            </button>
          </header>

          {websites.length === 0 ? (
            <div className="bg-titan-900 border-2 border-dashed border-titan-800 rounded-[40px] p-24 text-center animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-titan-accent/10 text-titan-accent rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Layout />
              </div>
              <h3 className="text-2xl font-bold font-serif mb-3 text-white">Your portfolio is empty</h3>
              <p className="text-slate-400 mb-10 max-w-sm mx-auto text-lg">Launch your first AI-generated website in under 2 minutes.</p>
              <button 
                onClick={() => setView('builder')}
                className="bg-titan-800 text-white px-10 py-4 rounded-xl font-bold transition-all hover:bg-titan-700"
              >
                Create Website
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
              {websites.map(site => (
                <div key={site.id} className="bg-titan-900 rounded-[32px] border border-titan-800 overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="h-56 bg-titan-800 relative overflow-hidden">
                    <img src={`https://picsum.photos/seed/${site.sections[0].content.image}/800/600`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-titan-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-6">
                       <button onClick={() => { setActiveSite(site); setView('builder'); }} className="bg-titan-50 text-titan-950 px-4 py-3 rounded-xl font-bold flex-1 text-sm shadow-xl active:scale-95 transition">Edit Design</button>
                       <button onClick={() => { setActiveSite(site); setView('preview'); }} className="bg-titan-accent text-white px-4 py-3 rounded-xl font-bold flex-1 text-sm shadow-xl active:scale-95 transition">Preview Site</button>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white">{site.name}</h3>
                      <button onClick={() => setWebsites(prev => prev.filter(s => s.id !== site.id))} className="text-slate-500 hover:text-red-500 transition-colors p-1">
                        <Trash />
                      </button>
                    </div>
                    <p className="text-slate-400 mb-6 font-medium">{site.niche}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-bold uppercase tracking-widest">
                       <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Published
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  if (view === 'builder') {
    return (
      <div className="min-h-screen bg-titan-950 flex flex-col">
        {/* Builder Header */}
        <header className="h-20 glass-sidebar border-b border-white/5 px-8 flex items-center justify-between z-50">
          <div className="flex items-center gap-6">
            <button onClick={() => setView('dashboard')} className="text-white/60 hover:text-white transition flex items-center gap-2 font-bold text-sm">
              <ChevronRight /> Dashboard
            </button>
            <div className="h-6 w-px bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-white font-black text-lg tracking-tight">{activeSite?.name || 'Designing New Site'}</span>
              <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Editing Live</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => activeSite && setView('preview')} disabled={!activeSite} className="px-6 py-2.5 rounded-xl bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition disabled:opacity-20">
                Preview
             </button>
             <button className="px-6 py-2.5 rounded-xl bg-titan-accent text-white text-sm font-bold hover:bg-blue-500 transition shadow-lg shadow-titan-accent/20 active:scale-95">
                Publish Site
             </button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Editor Tools */}
          <aside className="w-96 glass-sidebar border-r border-white/5 flex flex-col relative overflow-y-auto">
             {!activeSite ? (
               <div className="p-10 flex-1 flex flex-col">
                  <div className="mb-12 text-white">
                    <div className="w-20 h-20 bg-titan-accent rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-titan-accent/40">
                      <Magic />
                    </div>
                    <h2 className="text-3xl font-black font-serif text-white mb-3">Build with AI</h2>
                    <p className="text-slate-400 leading-relaxed">Describe your vision and watch our AI craft a professional website for you instantly.</p>
                  </div>
                  
                  <div className="space-y-8 flex-1">
                    <div className="group">
                      <label className="block text-xs font-black text-titan-accent uppercase tracking-[0.2em] mb-3">Business Name</label>
                      <input 
                        value={genForm.name}
                        onChange={e => setGenForm({...genForm, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-titan-accent outline-none transition group-focus-within:border-titan-accent/50" 
                        placeholder="e.g. Pixel Pulse Studio" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-titan-accent uppercase tracking-[0.2em] mb-3">Niche</label>
                      <select 
                        value={genForm.niche}
                        onChange={e => setGenForm({...genForm, niche: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-titan-accent outline-none transition"
                      >
                        <option value="SaaS" className="bg-titan-900">SaaS Platform</option>
                        <option value="Agency" className="bg-titan-900">Creative Agency</option>
                        <option value="Portfolio" className="bg-titan-900">Personal Portfolio</option>
                        <option value="Product" className="bg-titan-900">Physical Product</option>
                        <option value="Services" className="bg-titan-900">Professional Services</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-titan-accent uppercase tracking-[0.2em] mb-3">Description</label>
                      <textarea 
                        value={genForm.desc}
                        onChange={e => setGenForm({...genForm, desc: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-titan-accent outline-none min-h-[140px] transition resize-none" 
                        placeholder="What do you do? Who is it for? Why should people care?"
                      ></textarea>
                    </div>
                    <button 
                      onClick={startGeneration}
                      disabled={isGenerating}
                      className="w-full bg-titan-accent text-white p-5 rounded-2xl font-black text-lg hover:bg-blue-500 transition flex items-center justify-center gap-3 shadow-2xl shadow-titan-accent/30 active:scale-[0.98] disabled:opacity-50"
                    >
                      {isGenerating ? "Crafting Magic..." : <><Magic /> Generate Design</>}
                    </button>
                  </div>
               </div>
             ) : (
               <div className="flex flex-col h-full">
                 <div className="p-8 border-b border-white/5">
                    <h3 className="text-white font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                       <Layout /> Page Components
                    </h3>
                    <div className="space-y-3">
                       {activeSite.sections.map((section, idx) => (
                         <div 
                           key={section.id} 
                           onClick={() => setEditingSectionId(section.id)}
                           className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${editingSectionId === section.id ? 'bg-titan-accent/10 border-titan-accent/50' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-[10px] font-black text-titan-accent bg-titan-accent/10 w-6 h-6 flex items-center justify-center rounded-lg">{idx + 1}</span>
                              <span className="text-sm font-bold text-white/80 capitalize">{section.type}</span>
                            </div>
                            <Magic />
                         </div>
                       ))}
                    </div>
                 </div>
                 
                 {editingSectionId && (
                   <div className="p-8 animate-in slide-in-from-bottom duration-500">
                      <div className="bg-titan-accent p-8 rounded-[32px] shadow-2xl">
                        <h4 className="text-white font-black text-lg mb-2 flex items-center gap-2">
                          <Magic /> AI Edit
                        </h4>
                        <p className="text-blue-200 text-sm mb-6">Instruction our AI to refine this {activeSite.sections.find(s => s.id === editingSectionId)?.type} section.</p>
                        <textarea 
                          value={editPrompt}
                          onChange={e => setEditPrompt(e.target.value)}
                          className="w-full bg-white/10 border border-white/10 rounded-2xl p-4 text-white text-sm focus:ring-2 focus:ring-white/30 outline-none mb-6 placeholder:text-white/40 resize-none h-32" 
                          placeholder="e.g. 'Make it more exciting', 'Add more focus on our AI features', 'Change the alignment to center'..."
                        ></textarea>
                        <div className="flex flex-col gap-3">
                           <button 
                            onClick={handleRegenerateSection} 
                            disabled={isGenerating}
                            className="w-full bg-white text-titan-accent py-4 rounded-xl text-sm font-black shadow-xl active:scale-95 transition disabled:opacity-50"
                           >
                              {isGenerating ? "Rewriting..." : "Update Section"}
                           </button>
                           <button onClick={() => setEditingSectionId(null)} className="w-full text-white/60 hover:text-white font-bold text-xs transition">Cancel</button>
                        </div>
                      </div>
                   </div>
                 )}
                 
                 <div className="p-8 mt-auto">
                    <div className="p-6 rounded-[32px] border border-dashed border-white/10 text-center hover:border-white/20 transition cursor-pointer group">
                       <div className="text-white/20 group-hover:text-titan-accent transition mb-2 flex justify-center"><Plus /></div>
                       <span className="text-white/40 text-xs font-black uppercase tracking-widest">Add Custom Block</span>
                    </div>
                 </div>
               </div>
             )}
          </aside>

          {/* Builder Canvas */}
          <main className="flex-1 bg-titan-900 p-12 overflow-y-auto scroll-smooth">
             {isGenerating && !activeSite ? (
               <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
                  <div className="w-32 h-32 mb-10 relative">
                    <div className="absolute inset-0 border-[6px] border-titan-accent/10 rounded-[40px]"></div>
                    <div className="absolute inset-0 border-[6px] border-t-titan-accent rounded-[40px] animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-titan-accent scale-[2]">
                       <Magic />
                    </div>
                  </div>
                  <h2 className="text-4xl font-black font-serif text-white mb-4 tracking-tighter">Building Your Digital Empire</h2>
                  <p className="text-slate-400 text-lg max-w-sm mx-auto animate-pulse">{["Analyzing niche...", "Planning structure...", "Writing copy...", "Choosing assets...", "Applying styles..."][generationStep]}</p>
               </div>
             ) : activeSite ? (
               <div className="max-w-5xl mx-auto shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[40px] overflow-hidden border border-white/5 bg-titan-950 ring-8 ring-white/5 relative">
                  {activeSite.sections.map(section => (
                    <div key={section.id} className={`${editingSectionId === section.id ? 'ring-4 ring-titan-accent ring-inset' : ''} transition-all`}>
                      <RenderSection 
                        section={section} 
                        isEditing={true} 
                        onEdit={() => setEditingSectionId(section.id)} 
                        accentColor={activeSite.themeColor}
                      />
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="absolute inset-0 bg-titan-950/40 backdrop-blur-sm z-50 flex items-center justify-center">
                       <div className="bg-titan-900 p-8 rounded-3xl shadow-2xl flex items-center gap-4">
                          <div className="w-6 h-6 border-4 border-t-titan-accent border-titan-800 rounded-full animate-spin"></div>
                          <span className="font-bold text-white">AI is updating your site...</span>
                       </div>
                    </div>
                  )}
               </div>
             ) : (
               <div className="h-full flex items-center justify-center">
                  <div className="text-center opacity-10">
                    <div className="mb-8 flex justify-center scale-[5] text-white">
                       <Layout />
                    </div>
                    <p className="text-white text-2xl font-black uppercase tracking-[0.5em]">Workspace Ready</p>
                  </div>
               </div>
             )}
          </main>
        </div>
      </div>
    );
  }

  if (view === 'preview') {
    return (
      <div className="min-h-screen bg-titan-950">
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top duration-500">
           <button 
             onClick={() => setView('builder')} 
             className="bg-slate-950 text-white px-8 py-4 rounded-full font-black shadow-2xl border border-white/20 hover:scale-105 active:scale-95 transition flex items-center gap-3"
           >
              <Layout /> Exit Preview Mode
           </button>
        </div>
        {activeSite?.sections.map(section => (
          <RenderSection key={section.id} section={section} accentColor={activeSite.themeColor} />
        ))}
      </div>
    );
  }

  return null;
}

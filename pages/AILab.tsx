import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { MagneticButton } from '../components/ui/MagneticButton';
import { 
  Rocket, 
  Layers, 
  Palette, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Loader2, 
  Eye, 
  Code as CodeIcon, 
  Monitor, 
  Smartphone, 
  Target,
  Sparkles,
  Zap,
  ShieldCheck,
  Building2,
  User,
  Activity,
  XCircle,
  ChevronRight,
  Brain
} from 'lucide-react';

// --- TYPES ---

type Industry = 'SaaS/Tech' | 'Professional Services' | 'E-commerce' | 'Personal Brand' | 'Healthcare' | 'Real Estate';
type Aesthetic = 'Cinematic' | 'Hyper-Minimalist' | 'Brutalist' | 'Corporate Authority';

interface SiteDraft {
  name: string;
  industry: Industry;
  aesthetic: Aesthetic;
  goal: string;
  usp: string;
  audience: string;
}

interface GenerationOutput {
  brandStrategy: {
    voice: string;
    hook: string;
    monetization: string;
  };
  structure: Array<{ section: string; purpose: string }>;
  heroHtml: string;
  featureHtml: string;
}

// --- CONSTANTS ---

const INDUSTRIES: { id: Industry; label: string; icon: any; desc: string }[] = [
  { id: 'SaaS/Tech', label: 'SaaS & Tech', icon: Zap, desc: 'High-growth platforms and software solutions.' },
  { id: 'Professional Services', label: 'Consultancy/Law', icon: Building2, desc: 'Authority-driven service firms.' },
  { id: 'Personal Brand', label: 'Creator/Brand', icon: User, desc: 'Influence and digital presence.' },
  { id: 'Healthcare', label: 'Modern Health', icon: Activity, desc: 'Clinics, apps, and health tech.' },
  { id: 'E-commerce', label: 'E-commerce', icon: Target, desc: 'Revenue-first retail experiences.' },
  { id: 'Real Estate', label: 'Real Estate', icon: Building2, desc: 'Luxury listings and development.' },
];

const AESTHETICS: { id: Aesthetic; label: string; preview: string }[] = [
  { id: 'Cinematic', label: 'Cinematic Dark', preview: 'slate-950 text-white blue-accent' },
  { id: 'Hyper-Minimalist', label: 'Swiss Minimalist', preview: 'white text-black aggressive-space' },
  { id: 'Brutalist', label: 'Neo-Brutalist', preview: 'yellow-bg bold-borders contrast' },
  { id: 'Corporate Authority', label: 'Global Enterprise', preview: 'deep-navy precise-grid' },
];

// --- COMPONENTS ---

export default function AILab() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<SiteDraft>({
    name: '',
    industry: 'SaaS/Tech',
    aesthetic: 'Cinematic',
    goal: '',
    usp: '',
    audience: ''
  });
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<GenerationOutput | null>(null);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [notif, setNotif] = useState<{ msg: string; type: 'success' | 'error' | 'info' } | null>(null);

  const notify = (msg: string, type: 'success' | 'error' | 'info' = 'info') => {
    setNotif({ msg, type });
    setTimeout(() => setNotif(null), 4000);
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  // GOVERNANCE: GenAI Orchestration
  const handleBuild = async () => {
    setLoading(true);
    notify("Sentient Architect Engaging...", "info");

    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
    const prompt = `Act as a world-class Conversion Rate Optimization expert and Senior Frontend Architect. 
    Build a strategic blueprint and full-page code sections for this site:
    Brand Name: ${draft.name}
    Industry: ${draft.industry}
    Style: ${draft.aesthetic}
    Main Goal: ${draft.goal}
    USP: ${draft.usp}
    Target Audience: ${draft.audience}

    Requirement: 
    - Use Tailwind CSS.
    - Provide a Brand Strategy analysis (voice, hook, monetization).
    - Provide a full site structure blueprint (at least 5 sections).
    - Provide production-ready HTML for a HERO section and a FEATURE section.
    - Hero should be immersive, conversion-optimized, and match the ${draft.aesthetic} style.

    Return ONLY JSON.`;

    const config = {
      responseMimeType: "application/json",
      maxOutputTokens: 8192,
      responseSchema: {
        type: Type.OBJECT,
        required: ["brandStrategy", "structure", "heroHtml", "featureHtml"],
        properties: {
          brandStrategy: {
            type: Type.OBJECT,
            required: ["voice", "hook", "monetization"],
            properties: {
              voice: { type: Type.STRING },
              hook: { type: Type.STRING },
              monetization: { type: Type.STRING }
            }
          },
          structure: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["section", "purpose"],
              properties: {
                section: { type: Type.STRING },
                purpose: { type: Type.STRING }
              }
            }
          },
          heroHtml: { type: Type.STRING },
          featureHtml: { type: Type.STRING }
        }
      }
    };

    try {
      let response;
      try {
        response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: prompt,
          config
        });
      } catch (e: any) {
        if (e.message?.includes('429') || e.message?.includes('Quota')) {
          notify("Pro Tier Congested. Switching to Flash Engine...", "info");
          response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config
          });
        } else {
          throw e;
        }
      }

      if (response?.text) {
        setOutput(JSON.parse(response.text));
        setStep(5);
        notify("Synthesis Complete.", "success");
      }
    } catch (err: any) {
      console.error(err);
      notify(`Architecture Failed: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center flex-1 last:flex-none">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step >= s ? 'border-titan-accent bg-titan-accent text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-titan-800 bg-titan-950 text-slate-500'}`}>
            {step > s ? <CheckCircle2 size={18} /> : s}
          </div>
          {s < 4 && <div className={`h-0.5 flex-grow mx-4 transition-all duration-700 ${step > s ? 'bg-titan-accent' : 'bg-titan-800'}`} />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-titan-950 pt-24 pb-12 text-slate-200">
      {/* Notifications */}
      {notif && (
        <div className={`fixed bottom-6 right-6 z-[1000] p-4 rounded-lg border flex items-center gap-3 animate-slide-up bg-titan-950 shadow-2xl ${notif.type === 'error' ? 'border-red-500/50 text-red-200' : 'border-titan-accent/50 text-blue-200'}`}>
          {notif.type === 'error' ? <XCircle size={18} /> : <Sparkles size={18} />}
          <span className="text-sm font-medium">{notif.msg}</span>
        </div>
      )}

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4">Titan Architect <span className="text-titan-accent">3.0</span></h1>
          <p className="text-slate-400 max-w-xl mx-auto uppercase tracking-widest text-[10px] font-bold">Autonomous Revenue Engine Builder</p>
        </div>

        {step < 5 && <StepIndicator />}

        <div className="bg-titan-900/40 border border-titan-800 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl overflow-hidden relative min-h-[500px] flex flex-col">
          {/* Step 1: Industry Selection */}
          {step === 1 && (
            <div className="animate-fade-in space-y-8 flex-grow">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-titan-accent/20 p-3 rounded-xl text-titan-accent"><Building2 /></div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Select Your Vector</h2>
                  <p className="text-slate-400 text-sm">Every industry has its own "Conversion DNA".</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {INDUSTRIES.map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => { setDraft({ ...draft, industry: ind.id }); nextStep(); }}
                    className={`text-left p-6 rounded-2xl border transition-all duration-300 group ${draft.industry === ind.id ? 'bg-titan-accent/10 border-titan-accent border-2 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-titan-950/50 border-titan-800 hover:border-titan-accent/50'}`}
                  >
                    <ind.icon className={`mb-4 transition-colors ${draft.industry === ind.id ? 'text-titan-accent' : 'text-slate-500 group-hover:text-titan-accent'}`} />
                    <h3 className="text-white font-bold mb-1">{ind.label}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{ind.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Business Intel */}
          {step === 2 && (
            <div className="animate-fade-in space-y-8 flex-grow">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-titan-accent/20 p-3 rounded-xl text-titan-accent"><Target /></div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Business Intelligence</h2>
                  <p className="text-slate-400 text-sm">Tell the Titan what you are building.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">Brand Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g., NexaFlow AI"
                    value={draft.name}
                    onChange={e => setDraft({...draft, name: e.target.value})}
                    className="w-full bg-titan-950 border border-titan-800 rounded-xl px-4 py-3 text-white outline-none focus:border-titan-accent"
                  />
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">Primary Goal</label>
                  <input 
                    type="text" 
                    placeholder="e.g., Book demo calls, Sell subscription"
                    value={draft.goal}
                    onChange={e => setDraft({...draft, goal: e.target.value})}
                    className="w-full bg-titan-950 border border-titan-800 rounded-xl px-4 py-3 text-white outline-none focus:border-titan-accent"
                  />
                </div>
                <div className="space-y-4">
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">Core USP</label>
                  <textarea 
                    placeholder="What makes you superior?"
                    value={draft.usp}
                    onChange={e => setDraft({...draft, usp: e.target.value})}
                    className="w-full bg-titan-950 border border-titan-800 rounded-xl px-4 py-3 text-white outline-none focus:border-titan-accent h-32 resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-between pt-8">
                <MagneticButton variant="secondary" onClick={prevStep}><ArrowLeft size={16} /> Back</MagneticButton>
                <MagneticButton onClick={nextStep}>Next: Visual DNA <ArrowRight size={16} /></MagneticButton>
              </div>
            </div>
          )}

          {/* Step 3: Aesthetic DNA */}
          {step === 3 && (
            <div className="animate-fade-in space-y-8 flex-grow">
               <div className="flex items-center gap-4 mb-8">
                <div className="bg-titan-accent/20 p-3 rounded-xl text-titan-accent"><Palette /></div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Visual Synthesis</h2>
                  <p className="text-slate-400 text-sm">Define the soul of the interface.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {AESTHETICS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => { setDraft({ ...draft, aesthetic: a.id }); nextStep(); }}
                    className={`text-left p-6 rounded-2xl border transition-all duration-300 ${draft.aesthetic === a.id ? 'bg-titan-accent/10 border-titan-accent border-2 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-titan-950/50 border-titan-800 hover:border-titan-accent/50'}`}
                  >
                    <div className={`h-24 w-full rounded-lg mb-4 bg-gradient-to-br border border-titan-800 ${a.id === 'Cinematic' ? 'from-slate-900 to-blue-900' : a.id === 'Hyper-Minimalist' ? 'from-white to-slate-200' : a.id === 'Brutalist' ? 'from-yellow-400 to-red-500' : 'from-navy-900 to-slate-700'}`} />
                    <h3 className="text-white font-bold">{a.label}</h3>
                  </button>
                ))}
              </div>
              <div className="flex justify-between pt-8">
                <MagneticButton variant="secondary" onClick={prevStep}><ArrowLeft size={16} /> Back</MagneticButton>
              </div>
            </div>
          )}

          {/* Step 4: Final Clearance */}
          {step === 4 && (
            <div className="animate-fade-in flex flex-col items-center justify-center py-12 text-center flex-grow">
              <div className="w-20 h-20 bg-titan-accent/10 rounded-full flex items-center justify-center text-titan-accent mb-6 animate-pulse">
                <Rocket size={40} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Architectural Synthesis Ready</h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">The Titan will now analyze your market data and generate a high-converting revenue engine.</p>
              
              <div className="bg-titan-950/50 p-6 rounded-2xl border border-titan-800 text-left mb-10 w-full max-w-md">
                 <div className="flex items-center gap-2 mb-4 text-xs font-bold text-titan-accent uppercase tracking-widest"><ShieldCheck size={14} /> Brief Audit</div>
                 <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500">Name:</span> <span className="text-white">{draft.name}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Vector:</span> <span className="text-white">{draft.industry}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">DNA:</span> <span className="text-white">{draft.aesthetic}</span></div>
                 </div>
              </div>

              <div className="flex gap-4">
                <MagneticButton variant="secondary" onClick={prevStep}>Edit Brief</MagneticButton>
                <MagneticButton onClick={handleBuild} className="min-w-[200px] justify-center">
                  {loading ? <Loader2 className="animate-spin" /> : 'Initiate Build Sequence'}
                </MagneticButton>
              </div>
            </div>
          )}

          {/* Step 5: The Build Canvas */}
          {step === 5 && output && (
            <div className="animate-fade-in flex-grow flex flex-col">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                 <div className="flex items-center gap-4">
                    <div className="bg-titan-accent/20 p-2 rounded-lg text-titan-accent"><Monitor size={20} /></div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Live Blueprint</h2>
                        <p className="text-slate-500 text-xs">Architected for {draft.industry} dominance.</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 bg-titan-950 p-1 rounded-xl border border-titan-800">
                    <button onClick={() => setViewMode('preview')} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${viewMode === 'preview' ? 'bg-titan-accent text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}><Eye size={14} /> Preview</button>
                    <button onClick={() => setViewMode('code')} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${viewMode === 'code' ? 'bg-titan-accent text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}><CodeIcon size={14} /> Source</button>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
                {/* Strategy Panel */}
                <div className="lg:col-span-1 space-y-6 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                    <div className="p-4 rounded-xl bg-titan-950 border border-titan-800">
                        <h4 className="text-titan-gold font-bold text-xs uppercase mb-3 tracking-widest flex items-center gap-2"><Sparkles size={12} /> Titan Logic</h4>
                        <div className="space-y-4 text-xs">
                            <div>
                                <span className="text-slate-500 block mb-1">Brand Voice:</span>
                                <p className="text-slate-200 leading-relaxed italic">"{output.brandStrategy.voice}"</p>
                            </div>
                            <div>
                                <span className="text-slate-500 block mb-1">Conversion Hook:</span>
                                <p className="text-slate-200 leading-relaxed">{output.brandStrategy.hook}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-titan-950 border border-titan-800">
                        <h4 className="text-slate-400 font-bold text-xs uppercase mb-4 tracking-widest">Site Architecture</h4>
                        <div className="space-y-3">
                            {output.structure.map((s, idx) => (
                                <div key={idx} className="flex gap-3 group">
                                    <div className="w-5 h-5 rounded-full bg-titan-900 border border-titan-800 flex items-center justify-center text-[10px] text-titan-accent group-hover:border-titan-accent transition-colors">{idx + 1}</div>
                                    <div>
                                        <p className="text-white text-[11px] font-bold">{s.section}</p>
                                        <p className="text-slate-500 text-[10px]">{s.purpose}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <MagneticButton className="w-full text-xs py-2 h-10" onClick={() => setStep(1)}>Reset Architect</MagneticButton>
                </div>

                {/* Main Content View */}
                <div className="lg:col-span-3 flex flex-col h-[600px]">
                    {viewMode === 'preview' ? (
                        <div className="flex-grow bg-slate-100 rounded-2xl overflow-hidden border border-titan-800 relative shadow-2xl">
                             <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur shadow-sm h-12 flex items-center justify-between px-6 z-10 border-b">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="bg-slate-200 px-4 py-1 rounded text-[10px] text-slate-500 font-mono select-none">https://titan.engine/{draft.name.toLowerCase().replace(/\s+/g, '-')}</div>
                                <div className="flex gap-2">
                                    <button onClick={() => setPreviewDevice('desktop')} className={`p-1.5 rounded ${previewDevice === 'desktop' ? 'bg-titan-accent text-white' : 'text-slate-400'}`}><Monitor size={14}/></button>
                                    <button onClick={() => setPreviewDevice('mobile')} className={`p-1.5 rounded ${previewDevice === 'mobile' ? 'bg-titan-accent text-white' : 'text-slate-400'}`}><Smartphone size={14}/></button>
                                </div>
                             </div>
                             <div className="pt-12 h-full bg-white overflow-hidden transition-all duration-500" style={{ width: previewDevice === 'mobile' ? '375px' : '100%', margin: previewDevice === 'mobile' ? '0 auto' : '0' }}>
                                <iframe 
                                    srcDoc={`
                                        <!DOCTYPE html>
                                        <html lang="en">
                                        <head>
                                            <script src="https://cdn.tailwindcss.com"></script>
                                            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
                                            <style>
                                                body { font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
                                                h1, h2, h3 { font-family: 'Playfair Display', serif; }
                                            </style>
                                        </head>
                                        <body>
                                            ${output.heroHtml}
                                            ${output.featureHtml}
                                            <footer style="padding: 3rem; background: #f8fafc; text-align: center; color: #94a3b8; font-size: 0.75rem;">Generated by OpsVantage Titan Architect</footer>
                                        </body>
                                        </html>
                                    `}
                                    className="w-full h-full border-0"
                                    title="Site Preview"
                                />
                             </div>
                        </div>
                    ) : (
                        <div className="flex-grow bg-black rounded-2xl border border-titan-800 p-6 font-mono text-xs overflow-auto relative">
                            <button 
                                onClick={() => { navigator.clipboard.writeText(`${output.heroHtml}\n${output.featureHtml}`); notify("Code Transmitted to Clipboard", "success"); }}
                                className="absolute top-4 right-4 bg-titan-800 hover:bg-titan-accent text-white p-2 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <CodeIcon size={14} /> Copy Source
                            </button>
                            <pre className="text-blue-400">{`<!-- TITAN ARCHITECT 3.0: ${draft.name.toUpperCase()} SOURCE -->\n`}</pre>
                            <pre className="text-slate-400 whitespace-pre-wrap mt-4">{`${output.heroHtml}\n\n${output.featureHtml}`}</pre>
                        </div>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Overlay */}
        {step < 5 && (
            <div className="mt-8 flex justify-center items-center gap-4 text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
                <ShieldCheck size={14} /> Secure Link
                <span className="w-1 h-1 rounded-full bg-slate-800" />
                <Layers size={14} /> {draft.industry} DNA
                <span className="w-1 h-1 rounded-full bg-slate-800" />
                <Zap size={14} /> GPU Optimized
            </div>
        )}
      </div>
    </div>
  );
}
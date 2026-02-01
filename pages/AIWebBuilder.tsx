import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type } from '@google/genai';
import { MagneticButton } from '../components/ui/MagneticButton';
import { BentoGrid, BentoItem } from '../components/ui/BentoGrid';
import { Mic, Video, Image as ImageIcon, Brain, Loader2, Play, PenTool, Key, Eye, EyeOff, AlertCircle, CheckCircle2, XCircle, Activity, Layout, Code, DollarSign, Terminal } from 'lucide-react';

// --- TYPES ---

interface GenAIBlob {
  data: string;
  mimeType: string;
}

interface Notification {
  message: string;
  type: 'info' | 'error' | 'success';
  id: number;
}

interface ModuleProps {
  apiKey: string;
  notify: (msg: string, type?: 'info' | 'error' | 'success') => void;
}

// --- UTILS ---

async function fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve({
        inlineData: {
          data: base64String,
          mimeType: file.type,
        },
      });
    };
    reader.readAsDataURL(file);
  });
}

function createBlob(data: Float32Array): GenAIBlob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: btoa(String.fromCharCode(...new Uint8Array(int16.buffer))),
    mimeType: 'audio/pcm;rate=16000',
  };
}

function decodeAudio(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number = 24000, numChannels: number = 1): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- MODULES ---

const VoiceModule: React.FC<ModuleProps> = ({ apiKey, notify }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState('Standby');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionRef = useRef<any>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const outputContextRef = useRef<AudioContext | null>(null);

  const startSession = async () => {
    if (!apiKey) {
        notify("Neural Key Required for Voice Protocol.", 'error');
        return;
    }
    
    try {
      setStatus('Initializing Protocol...');
      notify("Establishing secure link to Gemini...", 'info');
      
      const ai = new GoogleGenAI({ apiKey });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      inputContextRef.current = inputCtx;
      outputContextRef.current = outputCtx;

      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination);
      let nextStartTime = 0;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      const source = inputCtx.createMediaStreamSource(stream);
      const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
      
      source.connect(scriptProcessor);
      scriptProcessor.connect(inputCtx.destination);

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: "You are Sentient Titan, a helpful and legacy-grade AI assistant. Your voice is calm, authoritative, and warm."
        },
        callbacks: {
          onopen: () => {
            setStatus('Titan Online');
            notify("Voice Link Active.", 'success');
            setIsConnected(true);
          },
          onmessage: async (msg: LiveServerMessage) => {
              const base64Audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
              if (base64Audio) {
                 try {
                     nextStartTime = Math.max(nextStartTime, outputCtx.currentTime);
                     const audioBuffer = await decodeAudioData(decodeAudio(base64Audio), outputCtx);
                     const bufSource = outputCtx.createBufferSource();
                     bufSource.buffer = audioBuffer;
                     bufSource.connect(outputNode);
                     bufSource.start(nextStartTime);
                     nextStartTime += audioBuffer.duration;
                 } catch (e) {
                     console.error("Audio decode error", e);
                 }
              }
          },
          onclose: () => {
            setStatus('Session Terminated');
            setIsConnected(false);
          },
          onerror: (e) => {
            console.error(e);
            setStatus('Connection Error');
            notify("Voice stream interrupted.", 'error');
          }
        }
      });

      sessionRef.current = sessionPromise;

      scriptProcessor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const blob = createBlob(inputData);
        sessionPromise.then(session => session.sendRealtimeInput({ media: blob }));
      };

      const videoInterval = setInterval(async () => {
          if (!canvasRef.current || !videoRef.current) return;
          const ctx = canvasRef.current.getContext('2d');
          if (!ctx) return;
          
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;
          ctx.drawImage(videoRef.current, 0, 0);
          
          const base64 = canvasRef.current.toDataURL('image/jpeg', 0.5).split(',')[1];
          sessionPromise.then(session => session.sendRealtimeInput({ 
              media: { mimeType: 'image/jpeg', data: base64 } 
          }));
      }, 1000);

      (sessionRef.current as any)._cleanup = () => {
          clearInterval(videoInterval);
          scriptProcessor.disconnect();
          source.disconnect();
          stream.getTracks().forEach(t => t.stop());
          inputCtx.close();
          outputCtx.close();
      };
    } catch (err) {
      console.error(err);
      setStatus('System Failure');
      notify('Hardware Access Denied. Check Permissions.', 'error');
    }
  };

  const stopSession = async () => {
      if (sessionRef.current) {
          const session = await sessionRef.current;
          if ((sessionRef.current as any)._cleanup) (sessionRef.current as any)._cleanup();
          session.close();
          sessionRef.current = null;
          setIsConnected(false);
          setStatus('Standby');
          notify("Session Terminated.", 'info');
      }
  };

  return (
    <div className="p-6 bg-titan-900/50 rounded-2xl border border-titan-800 h-full flex flex-col relative overflow-hidden">
      {/* Activity Indicator Overlay */}
      {isConnected && (
         <div className="absolute top-4 right-4 flex items-center gap-2">
             <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
             <span className="text-xs text-red-400 font-mono">LIVE FEED</span>
         </div>
      )}

      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Mic className="text-titan-accent" /> Titan Voice (Live)</h3>
      <p className="text-slate-400 mb-6 text-sm">Real-time multimodal conversation channel.</p>
      
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6 border border-titan-800 flex-grow group">
        <video ref={videoRef} className="w-full h-full object-cover opacity-50 transition-opacity duration-700 group-hover:opacity-80" muted playsInline />
        <canvas ref={canvasRef} className="hidden" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="text-titan-accent font-mono text-xs px-3 py-1 bg-black/50 rounded backdrop-blur-sm border border-titan-800 uppercase tracking-widest flex items-center gap-2">
                <Activity size={12} className={isConnected ? "animate-pulse" : ""} />
                {status}
             </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-auto">
        {!isConnected ? (
             <MagneticButton onClick={startSession} className={!apiKey ? 'opacity-50 cursor-not-allowed' : ''}>Connect Link</MagneticButton>
        ) : (
             <MagneticButton variant="secondary" onClick={stopSession}>Terminate</MagneticButton>
        )}
      </div>
    </div>
  );
};

const VisionModule: React.FC<ModuleProps> = ({ apiKey, notify }) => {
  const [activeSubTab, setActiveSubTab] = useState<'gen' | 'edit' | 'analyze'>('gen');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [size, setSize] = useState('1K');

  const handleAction = async () => {
    if (!apiKey) { notify("Neural Key Required.", 'error'); return; }
    
    setLoading(true);
    setResult(null);
    try {
        const ai = new GoogleGenAI({ apiKey });

        if (activeSubTab === 'gen') {
            const response = await ai.models.generateContent({
                model: 'gemini-3-pro-image-preview',
                contents: { parts: [{ text: prompt }] },
                config: {
                    imageConfig: { aspectRatio: aspectRatio as any, imageSize: size as any }
                }
            });
            const imgData = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
            if (imgData) {
                setResult(`data:image/png;base64,${imgData}`);
                notify("Visual Generated Successfully.", 'success');
            }
        } else if (activeSubTab === 'edit') {
            if (!uploadedFile) { notify("Source Image Required.", 'error'); setLoading(false); return; }
            const imgPart = await fileToGenerativePart(uploadedFile);
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [imgPart, { text: prompt }] }
            });
            const imgData = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
            if (imgData) {
                setResult(`data:image/png;base64,${imgData}`);
                notify("Edit Complete.", 'success');
            }
        } else if (activeSubTab === 'analyze') {
             if (!uploadedFile) { notify("Source Image Required.", 'error'); setLoading(false); return; }
             const imgPart = await fileToGenerativePart(uploadedFile);
             const response = await ai.models.generateContent({
                 model: 'gemini-3-pro-preview',
                 contents: { parts: [imgPart, { text: prompt || "Analyze this image." }] }
             });
             setResult(response.text || "No analysis generated.");
             notify("Analysis Complete.", 'success');
        }
    } catch (e: any) {
        console.error(e);
        notify(`Visual Operation Failed: ${e.message}`, 'error');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-titan-900/50 rounded-2xl border border-titan-800">
         <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><ImageIcon className="text-titan-accent" /> Visual Forge</h3>
         
         <div className="flex gap-4 mb-6 border-b border-titan-800 pb-2 overflow-x-auto scrollbar-hide">
            {['gen', 'edit', 'analyze'].map(t => (
                <button key={t} onClick={() => { setActiveSubTab(t as any); setResult(null); }} className={`uppercase text-xs font-bold tracking-wider pb-2 transition-colors ${activeSubTab === t ? 'text-titan-accent border-b-2 border-titan-accent' : 'text-slate-500 hover:text-slate-300'}`}>
                    {t === 'gen' ? 'Generate' : t === 'edit' ? 'Edit' : 'Analyze'}
                </button>
            ))}
         </div>

         <div className="space-y-4">
             {activeSubTab !== 'gen' && (
                 <input 
                    type="file" 
                    id="vision-file-upload"
                    name="visionFile"
                    onChange={e => setUploadedFile(e.target.files?.[0] || null)} 
                    className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-titan-800 file:text-titan-accent hover:file:bg-titan-700" 
                    accept="image/*" 
                 />
             )}
             
             {activeSubTab === 'gen' && (
                 <div className="flex gap-2">
                     <select 
                        id="vision-aspect"
                        name="visionAspectRatio"
                        value={aspectRatio} 
                        onChange={e => setAspectRatio(e.target.value)} 
                        className="bg-titan-950 border border-titan-800 text-white rounded px-3 py-2 text-xs focus:border-titan-accent outline-none"
                    >
                         {['1:1', '16:9', '9:16', '4:3', '3:4'].map(r => <option key={r} value={r}>{r}</option>)}
                     </select>
                     <select 
                        id="vision-size"
                        name="visionSize"
                        value={size} 
                        onChange={e => setSize(e.target.value)} 
                        className="bg-titan-950 border border-titan-800 text-white rounded px-3 py-2 text-xs focus:border-titan-accent outline-none"
                    >
                         {['1K', '2K', '4K'].map(s => <option key={s} value={s}>{s}</option>)}
                     </select>
                 </div>
             )}

             <textarea 
                id="vision-prompt"
                name="visionPrompt"
                value={prompt} 
                onChange={e => setPrompt(e.target.value)} 
                placeholder={activeSubTab === 'edit' ? "e.g., 'Add a retro filter'" : "Describe your vision..."}
                className="w-full bg-titan-950 border border-titan-800 rounded-lg p-3 text-white focus:border-titan-accent outline-none text-sm h-24 resize-none"
             />
             
             <MagneticButton onClick={handleAction} className={`w-full justify-center ${!apiKey ? 'opacity-50 cursor-not-allowed' : ''}`}>
                 {loading ? <Loader2 className="animate-spin" /> : <Play size={16} />} Execute
             </MagneticButton>
         </div>

         {result && (
             <div className="mt-6 p-4 bg-black rounded-lg border border-titan-800 animate-fade-in">
                 {activeSubTab === 'analyze' ? (
                     <p className="text-slate-300 text-sm whitespace-pre-wrap">{result}</p>
                 ) : (
                     <img src={result} alt="Generated" className="w-full rounded" />
                 )}
             </div>
         )}
    </div>
  );
};

const MotionModule: React.FC<ModuleProps> = ({ apiKey, notify }) => {
    const [prompt, setPrompt] = useState('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [aspectRatio, setAspectRatio] = useState('16:9');
    const [mode, setMode] = useState<'gen' | 'animate' | 'analyze'>('gen');
    const [file, setFile] = useState<File | null>(null);

    const handleVeo = async () => {
        if (!apiKey) { notify("Neural Key Required.", 'error'); return; }
        
        try {
            const ai = new GoogleGenAI({ apiKey });

            if (mode === 'analyze') {
                 setLoading(true);
                 if (!file) { notify("Upload video/image first.", 'error'); setLoading(false); return; }
                 const part = await fileToGenerativePart(file); 
                 const response = await ai.models.generateContent({
                     model: 'gemini-3-pro-preview',
                     contents: { parts: [part, { text: prompt || "Analyze this video." }] }
                 });
                 setVideoUrl(null);
                 notify("Analysis Complete.", 'success');
                 alert(response.text); // Using alert here for large text, could be improved but keeping simple for now
                 setLoading(false);
                 return;
            }

            setLoading(true);
            setVideoUrl(null);
            notify("Engaging Veo Engine...", 'info');

            let operation;
            if (mode === 'gen') {
                 operation = await ai.models.generateVideos({
                    model: 'veo-3.1-fast-generate-preview',
                    prompt: prompt,
                    config: { numberOfVideos: 1, resolution: '720p', aspectRatio: aspectRatio as any }
                });
            } else {
                if (!file) { notify('Upload source image first', 'error'); setLoading(false); return; }
                const imgPart = await fileToGenerativePart(file);
                operation = await ai.models.generateVideos({
                    model: 'veo-3.1-fast-generate-preview',
                    prompt: prompt,
                    image: { imageBytes: imgPart.inlineData.data, mimeType: imgPart.inlineData.mimeType },
                    config: { numberOfVideos: 1, resolution: '720p', aspectRatio: aspectRatio as any }
                });
            }

            while (!operation.done) {
                await new Promise(r => setTimeout(r, 5000));
                operation = await ai.operations.getVideosOperation({ operation });
            }

            const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
            if (uri) {
                const vidRes = await fetch(`${uri}&key=${apiKey}`);
                if (!vidRes.ok) throw new Error("Failed to fetch generated video.");
                const vidBlob = await vidRes.blob();
                setVideoUrl(URL.createObjectURL(vidBlob));
                notify("Motion Generated.", 'success');
            }
        } catch (e: any) {
            console.error(e);
            notify(`Veo Process Failed: ${e.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-titan-900/50 rounded-2xl border border-titan-800">
             <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Video className="text-titan-accent" /> Motion Engine (Veo)</h3>
             
             <div className="flex gap-4 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                 <button onClick={() => setMode('gen')} className={`text-xs uppercase font-bold transition-colors ${mode==='gen' ? 'text-titan-accent' : 'text-slate-500 hover:text-slate-300'}`}>Gen</button>
                 <button onClick={() => setMode('animate')} className={`text-xs uppercase font-bold transition-colors ${mode==='animate' ? 'text-titan-accent' : 'text-slate-500 hover:text-slate-300'}`}>Animate</button>
                 <button onClick={() => setMode('analyze')} className={`text-xs uppercase font-bold transition-colors ${mode==='analyze' ? 'text-titan-accent' : 'text-slate-500 hover:text-slate-300'}`}>Analyze</button>
             </div>

             <div className="space-y-4">
                {mode !== 'gen' && (
                    <input 
                        type="file" 
                        id="motion-file-upload"
                        name="motionFile"
                        onChange={e => setFile(e.target.files?.[0] || null)} 
                        className="text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-titan-800 file:text-titan-accent hover:file:bg-titan-700" 
                    />
                )}
                
                {mode !== 'analyze' && (
                    <select 
                        id="motion-aspect"
                        name="motionAspectRatio"
                        value={aspectRatio} 
                        onChange={e => setAspectRatio(e.target.value)} 
                        className="bg-titan-950 border border-titan-800 text-white rounded px-3 py-2 text-xs w-full focus:border-titan-accent outline-none"
                    >
                         <option value="16:9">Landscape (16:9)</option>
                         <option value="9:16">Portrait (9:16)</option>
                    </select>
                )}

                <textarea 
                    id="motion-prompt"
                    name="motionPrompt"
                    value={prompt} 
                    onChange={e => setPrompt(e.target.value)} 
                    placeholder="Enter motion prompt..." 
                    className="w-full bg-titan-950 border border-titan-800 rounded-lg p-3 text-white text-sm focus:border-titan-accent outline-none h-24 resize-none" 
                />
                
                <MagneticButton onClick={handleVeo} className={`w-full justify-center ${!apiKey ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {loading ? <Loader2 className="animate-spin" /> : 'Engage Engine'}
                </MagneticButton>
             </div>

             {videoUrl && (
                 <div className="mt-6">
                     <video src={videoUrl} controls className="w-full rounded-lg border border-titan-800 shadow-2xl" />
                 </div>
             )}
        </div>
    );
};

const WriterModule: React.FC<ModuleProps> = ({ apiKey, notify }) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Cinematic');
  const [format, setFormat] = useState('Blog Post');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!apiKey) { notify("Neural Key Required.", 'error'); return; }
    if (!topic.trim()) { notify("Please enter a topic.", 'error'); return; }
    
    setLoading(true);
    notify("Drafting content...", 'info');
    try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `Topic: ${topic}\n\nTask: Write a ${tone} ${format}.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                systemInstruction: "You are the 'Titan Scribe', an expert copywriter for OpsVantage Digital. You write authoritative, cinematic, and high-converting B2B content. Your tone is confident and precise. Avoid corporate jargon where possible, focusing on legacy and stewardship."
            }
        });

        setOutput(response.text || "No content generated.");
        notify("Content Generated.", 'success');
    } catch (e: any) {
        console.error(e);
        setOutput("Generation failed. Please check API Key.");
        notify(`Generation failed: ${e.message}`, 'error');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-titan-900/50 rounded-2xl border border-titan-800 h-full">
         <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><PenTool className="text-titan-accent" /> Titan Scribe</h3>
         
         <div className="grid grid-cols-2 gap-4 mb-4">
             <div>
                 <label htmlFor="writer-format" className="block text-xs text-slate-500 mb-1 uppercase font-bold tracking-wider">Format</label>
                 <select 
                    id="writer-format"
                    name="writerFormat"
                    value={format} 
                    onChange={e => setFormat(e.target.value)} 
                    className="w-full bg-titan-950 border border-titan-800 text-white rounded px-3 py-2 text-sm focus:border-titan-accent outline-none"
                 >
                     {['Blog Post', 'LinkedIn Post', 'Twitter Thread', 'Email Newsletter', 'Ad Copy', 'Press Release'].map(f => <option key={f} value={f}>{f}</option>)}
                 </select>
             </div>
             <div>
                 <label htmlFor="writer-tone" className="block text-xs text-slate-500 mb-1 uppercase font-bold tracking-wider">Tone</label>
                 <select 
                    id="writer-tone"
                    name="writerTone"
                    value={tone} 
                    onChange={e => setTone(e.target.value)} 
                    className="w-full bg-titan-950 border border-titan-800 text-white rounded px-3 py-2 text-sm focus:border-titan-accent outline-none"
                 >
                     {['Cinematic', 'Professional', 'Urgent', 'Empathetic', 'Witty', 'Technical'].map(t => <option key={t} value={t}>{t}</option>)}
                 </select>
             </div>
         </div>

         <div className="space-y-4">
             <textarea 
                id="writer-topic"
                name="writerTopic"
                value={topic} 
                onChange={e => setTopic(e.target.value)} 
                placeholder="Enter topic, key points, or raw ideas..." 
                className="w-full bg-titan-950 border border-titan-800 rounded-lg p-3 text-white focus:border-titan-accent outline-none text-sm h-32 resize-none"
             />
             
             <MagneticButton onClick={handleGenerate} className={`w-full justify-center ${!apiKey ? 'opacity-50 cursor-not-allowed' : ''}`}>
                 {loading ? <Loader2 className="animate-spin" /> : 'Generate Copy'}
             </MagneticButton>
         </div>

         {output && (
             <div className="mt-6 p-4 bg-black rounded-lg border border-titan-800 animate-fade-in">
                 <h4 className="text-xs uppercase text-titan-accent mb-3 font-bold tracking-widest">Draft Output</h4>
                 <div className="text-slate-300 text-sm whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                     {output}
                 </div>
             </div>
         )}
    </div>
  );
};

// --- NEW BUILDER MODULE ---
interface BuilderData {
    analysis: {
        monetizationVector: string;
        targetAudience: string;
        hook: string;
    };
    structure: Array<{ section: string; purpose: string }>;
    heroCode: string;
}

const BuilderModule: React.FC<ModuleProps> = ({ apiKey, notify }) => {
    const [businessIdea, setBusinessIdea] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<BuilderData | null>(null);
    const [view, setView] = useState<'blueprint' | 'code' | 'preview'>('blueprint');

    const handleArchitect = async () => {
        if (!apiKey) { notify("Neural Key Required.", 'error'); return; }
        if (!businessIdea) { notify("Input business concept.", 'error'); return; }

        setLoading(true);
        notify("Titan Architect: Analyzing Market Vectors...", 'info');

        const ai = new GoogleGenAI({ apiKey });
        
        const promptText = `Act as a world-class Conversion Rate Optimization expert and Senior Frontend Architect. 
        Analyze this business idea: "${businessIdea}".
        
        1. Identify the single best monetization vector (e.g., SaaS subscription, High-ticket service, Digital Product).
        2. Define the Target Audience and the "Hook".
        3. Outline a 5-section landing page structure optimized for this specific revenue model.
        4. Generate valid, production-ready HTML/Tailwind CSS for the HERO SECTION only.
           - Use a dark, modern "Titan" aesthetic (slate-950 bg, white text, accent colors).
           - Ensure it is responsive.
           - Do NOT use external CSS links other than Tailwind CDN (assume it is present).
        
        Return JSON only.`;

        // Configuration reusable for both tiers
        const generationConfig: any = {
            responseMimeType: "application/json",
            maxOutputTokens: 8192,
            responseSchema: {
                type: Type.OBJECT,
                required: ["analysis", "structure", "heroCode"],
                properties: {
                    analysis: {
                        type: Type.OBJECT,
                        required: ["monetizationVector", "targetAudience", "hook"],
                        properties: {
                            monetizationVector: { type: Type.STRING },
                            targetAudience: { type: Type.STRING },
                            hook: { type: Type.STRING }
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
                    heroCode: { type: Type.STRING }
                }
            }
        };

        try {
            let response;
            try {
                // ATTEMPT 1: High-Intelligence Model (Gemini 3 Pro)
                // This model is smarter but has stricter rate limits.
                response = await ai.models.generateContent({
                    model: 'gemini-3-pro-preview',
                    contents: promptText,
                    config: generationConfig
                });
            } catch (err: any) {
                // Check for Quota/Rate Limit errors (429)
                const errorMsg = err.message || JSON.stringify(err);
                if (errorMsg.includes('429') || errorMsg.includes('RESOURCE_EXHAUSTED') || errorMsg.includes('Quota')) {
                    notify("Titan Pro busy. Rerouting to Flash Tier (High Speed)...", 'info');
                    
                    // ATTEMPT 2: High-Speed Model (Gemini 2.5 Flash)
                    // More generous rate limits, still very capable of JSON/Code generation.
                    response = await ai.models.generateContent({
                        model: 'gemini-2.5-flash',
                        contents: promptText,
                        config: generationConfig
                    });
                } else {
                    throw err; // Re-throw other errors (auth, bad request, etc)
                }
            }

            if (response?.text) {
                const parsed = JSON.parse(response.text) as BuilderData;
                setData(parsed);
                notify("Blueprint Architected.", 'success');
            }
        } catch (e: any) {
            console.error(e);
            notify(`Architecture Failed: ${e.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-titan-900/50 rounded-2xl border border-titan-800 h-full flex flex-col">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Layout className="text-titan-accent" /> Titan Architect <span className="text-xs bg-titan-accent/10 text-titan-accent px-2 py-0.5 rounded border border-titan-accent/20">SENTIENT</span>
            </h3>
            
            <div className="mb-6 space-y-4">
                <textarea 
                    id="builder-input"
                    name="builderInput"
                    value={businessIdea}
                    onChange={(e) => setBusinessIdea(e.target.value)}
                    placeholder="Describe your business concept (e.g., 'A premium dog walking service for busy tech executives')..."
                    className="w-full bg-titan-950 border border-titan-800 rounded-lg p-4 text-white focus:border-titan-accent outline-none text-sm h-24 resize-none placeholder-slate-600"
                />
                <MagneticButton onClick={handleArchitect} className={`w-full justify-center ${!apiKey ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {loading ? <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Analyzing Revenue Models...</span> : <span className="flex items-center gap-2"><Brain size={16} /> Architect & Build</span>}
                </MagneticButton>
            </div>

            {data && (
                <div className="flex-grow flex flex-col animate-slide-up">
                    <div className="flex border-b border-titan-800 mb-4">
                        <button onClick={() => setView('blueprint')} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${view === 'blueprint' ? 'border-titan-accent text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Blueprint</button>
                        <button onClick={() => setView('code')} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${view === 'code' ? 'border-titan-accent text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Code</button>
                        <button onClick={() => setView('preview')} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${view === 'preview' ? 'border-titan-accent text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>Live Preview</button>
                    </div>

                    <div className="flex-grow bg-titan-950 rounded-lg border border-titan-800 p-4 overflow-auto custom-scrollbar h-[400px]">
                        {view === 'blueprint' && (
                            <div className="space-y-6">
                                <div className="bg-titan-900/50 p-4 rounded border border-titan-800">
                                    <h4 className="flex items-center gap-2 text-titan-gold font-bold mb-2"><DollarSign size={16} /> Monetization Strategy</h4>
                                    <p className="text-xl text-white font-serif mb-2">{data.analysis.monetizationVector}</p>
                                    <p className="text-slate-400 text-sm">{data.analysis.hook}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs uppercase text-slate-500 font-bold tracking-widest mb-3">Site Architecture</h4>
                                    <div className="space-y-3">
                                        {data.structure.map((s, i) => (
                                            <div key={i} className="flex gap-4 items-start">
                                                <div className="w-6 h-6 rounded-full bg-titan-800 flex items-center justify-center text-xs font-mono text-titan-accent flex-shrink-0">{i + 1}</div>
                                                <div>
                                                    <p className="text-white font-medium">{s.section}</p>
                                                    <p className="text-slate-500 text-xs">{s.purpose}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {view === 'code' && (
                            <div className="relative font-mono text-xs">
                                <pre className="text-slate-300 whitespace-pre-wrap">{data.heroCode}</pre>
                                <button 
                                    onClick={() => { navigator.clipboard.writeText(data.heroCode); notify("Code copied.", "success"); }}
                                    className="absolute top-0 right-0 p-2 text-slate-500 hover:text-white bg-titan-900 rounded"
                                >
                                    <Code size={16} />
                                </button>
                            </div>
                        )}

                        {view === 'preview' && (
                            <div className="w-full h-full bg-white rounded overflow-hidden">
                                <iframe 
                                    srcDoc={`
                                        <!DOCTYPE html>
                                        <html>
                                        <head>
                                            <script src="https://cdn.tailwindcss.com"></script>
                                        </head>
                                        <body>${data.heroCode}</body>
                                        </html>
                                    `}
                                    className="w-full h-full border-0"
                                    title="Preview"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const IntelModule: React.FC<ModuleProps> = ({ apiKey, notify }) => {
    const [mode, setMode] = useState<'chat' | 'maps' | 'transcribe' | 'tts'>('chat');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [thinking, setThinking] = useState(false);
    const [useSearch, setUseSearch] = useState(false);
    const [fastMode, setFastMode] = useState(false);
    const [groundingUrls, setGroundingUrls] = useState<any[]>([]);

    const handleExecute = async () => {
        if (!apiKey) { notify("Neural Key Required.", 'error'); return; }
        
        const ai = new GoogleGenAI({ apiKey });
        setOutput('');
        setGroundingUrls([]);
        try {
            if (mode === 'chat') {
                const modelName = fastMode ? 'gemini-flash-lite-latest' : 'gemini-3-pro-preview';
                const tools = useSearch ? [{ googleSearch: {} }] : [];
                const config: any = { tools };
                if (thinking && !fastMode && !useSearch) {
                    config.thinkingConfig = { thinkingBudget: 32768 };
                }

                notify("Processing...", 'info');
                const response = await ai.models.generateContent({
                    model: modelName,
                    contents: input,
                    config
                });
                
                setOutput(response.text || "No response.");
                if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
                    setGroundingUrls(response.candidates[0].groundingMetadata.groundingChunks);
                }
                notify("Data received.", 'success');

            } else if (mode === 'maps') {
                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: input,
                    config: { tools: [{ googleMaps: {} }] }
                });
                setOutput(response.text || '');
                 if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
                    setGroundingUrls(response.candidates[0].groundingMetadata.groundingChunks);
                }
                notify("Location data received.", 'success');

            } else if (mode === 'transcribe') {
                notify("Recording Audio (5s)...", 'info');
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const mediaRecorder = new MediaRecorder(stream);
                const chunks: any[] = [];
                mediaRecorder.ondataavailable = e => chunks.push(e.data);
                mediaRecorder.start();
                setTimeout(() => {
                    mediaRecorder.stop();
                    notify("Processing Audio...", 'info');
                }, 5000);
                
                mediaRecorder.onstop = async () => {
                    const blob = new Blob(chunks, { type: 'audio/webm' });
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = async () => {
                         const b64 = (reader.result as string).split(',')[1];
                         const response = await ai.models.generateContent({
                             model: 'gemini-3-flash-preview',
                             contents: { parts: [{ inlineData: { mimeType: 'audio/webm', data: b64 } }, { text: "Transcribe this audio." }] }
                         });
                         setOutput(response.text || "Transcription failed.");
                         notify("Transcription Complete.", 'success');
                         stream.getTracks().forEach(t => t.stop());
                    };
                };

            } else if (mode === 'tts') {
                 notify("Synthesizing Audio...", 'info');
                 const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-preview-tts',
                    contents: { parts: [{ text: input }] },
                    config: {
                        responseModalities: [Modality.AUDIO],
                        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
                    }
                 });
                 const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
                 if (audioData) {
                    const ctx = new AudioContext();
                    const buf = await decodeAudioData(decodeAudio(audioData), ctx);
                    const source = ctx.createBufferSource();
                    source.buffer = buf;
                    source.connect(ctx.destination);
                    source.start();
                    setOutput("Playing audio...");
                    notify("Playback started.", 'success');
                 }
            }
        } catch (e: any) { 
            console.error(e); 
            setOutput("Error executing. Check API Key."); 
            notify(`Module Error: ${e.message}`, 'error');
        }
    };

    return (
        <div className="p-6 bg-titan-900/50 rounded-2xl border border-titan-800">
             <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Brain className="text-titan-accent" /> Neural Link</h3>
             
             <div className="flex flex-wrap gap-2 mb-4">
                 {['chat', 'maps', 'transcribe', 'tts'].map(m => (
                     <button key={m} onClick={() => setMode(m as any)} className={`px-3 py-1 rounded text-xs uppercase font-bold border transition-colors ${mode === m ? 'bg-titan-800 border-titan-accent text-white' : 'border-titan-800 text-slate-500 hover:text-slate-300'}`}>{m}</button>
                 ))}
             </div>

             {mode === 'chat' && (
                 <div className="flex gap-4 mb-4 text-xs">
                     <label htmlFor="chk-search" className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer">
                        <input id="chk-search" name="chkSearch" type="checkbox" checked={useSearch} onChange={e => setUseSearch(e.target.checked)} /> Google Search
                     </label>
                     <label htmlFor="chk-thinking" className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer">
                        <input id="chk-thinking" name="chkThinking" type="checkbox" checked={thinking} onChange={e => setThinking(e.target.checked)} disabled={fastMode} /> Thinking Mode
                     </label>
                     <label htmlFor="chk-fast" className="flex items-center gap-2 text-slate-400 hover:text-white cursor-pointer">
                        <input id="chk-fast" name="chkFast" type="checkbox" checked={fastMode} onChange={e => setFastMode(e.target.checked)} /> Fast
                     </label>
                 </div>
             )}

             <div className="space-y-4">
                 {mode !== 'transcribe' && (
                    <textarea 
                        id="intel-input"
                        name="intelInput"
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        placeholder="Input query or text..." 
                        className="w-full bg-titan-950 border border-titan-800 rounded-lg p-3 text-white text-sm focus:border-titan-accent outline-none" 
                    />
                 )}
                 <MagneticButton onClick={handleExecute} className={`w-full justify-center ${!apiKey ? 'opacity-50 cursor-not-allowed' : ''}`}>Processing Unit: Engage</MagneticButton>
             </div>

             {output && (
                 <div className="mt-6 p-4 bg-black rounded-lg border border-titan-800 text-sm text-slate-300 whitespace-pre-wrap animate-fade-in">
                     {output}
                     {groundingUrls.length > 0 && (
                         <div className="mt-4 pt-4 border-t border-titan-900">
                             <h4 className="text-titan-accent text-xs uppercase mb-2 font-bold tracking-widest">Sources</h4>
                             <ul className="space-y-2">
                                 {groundingUrls.map((g, i) => {
                                     const uri = g.web?.uri || g.maps?.webUri;
                                     const title = g.web?.title || g.maps?.title || uri;
                                     if (!uri) return null;
                                     return (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="text-titan-accent">•</span>
                                            <a href={uri} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-titan-accent underline truncate block transition-colors">{title}</a>
                                        </li>
                                     );
                                 })}
                             </ul>
                         </div>
                     )}
                 </div>
             )}
        </div>
    );
};

// --- MAIN PAGE ---

export default function AILab() {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // NOTIFICATION SYSTEM
  const notify = (message: string, type: 'info' | 'error' | 'success' = 'info') => {
      const id = Date.now();
      setNotifications(prev => [...prev, { message, type, id }]);
      setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== id));
      }, 4000);
  };

  useEffect(() => {
    // Initialize with environment variable if present, to support legacy/demo modes
    if (typeof process !== 'undefined' && process.env?.API_KEY) {
        setApiKey(process.env.API_KEY);
    }
    // DIAGNOSTIC LOG
    console.log("OpsVantage Sentient Titan Lab: Initialized.");
    console.log("Mode: Autonomous. AI Studio Helper: Disabled (Security Protocol).");
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen relative">
        {/* NOTIFICATION TOAST CONTAINER */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
            {notifications.map(n => (
                <div key={n.id} className={`pointer-events-auto px-4 py-3 rounded-lg border shadow-lg flex items-center gap-3 min-w-[300px] animate-slide-up bg-titan-950 ${
                    n.type === 'error' ? 'border-red-500/50 text-red-200' : 
                    n.type === 'success' ? 'border-green-500/50 text-green-200' : 
                    'border-titan-accent/50 text-blue-200'
                }`}>
                    {n.type === 'error' ? <XCircle size={18} /> : n.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    <span className="text-sm font-medium">{n.message}</span>
                </div>
            ))}
        </div>

      <div className="container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">Sentient Titan <span className="text-titan-accent">Lab</span></h1>
        <p className="text-xl text-slate-400 mb-10 max-w-3xl">
            Direct interface to the Gemini constellation. This facility allows for raw interaction with our most advanced cognitive models. 
            <span className="block mt-2 text-sm text-titan-gold/80 italic">Warning: Authorized Personnel Only. API Usage Metered.</span>
        </p>

        {/* SECURITY CLEARANCE: API KEY INPUT */}
        <div className="max-w-xl mb-12 p-1 bg-gradient-to-r from-titan-800 to-transparent rounded-lg animate-fade-in">
            <div className="bg-titan-950 rounded-md p-4 flex items-center gap-4 border border-titan-800 relative overflow-hidden">
                <div className="bg-titan-900 p-2 rounded text-titan-accent z-10"><Key className="w-5 h-5" /></div>
                <div className="flex-grow z-10">
                    <label htmlFor="api-key-input" className="block text-xs text-slate-500 uppercase font-bold tracking-widest mb-1 flex justify-between">
                        <span>Titan Neural Key</span>
                        {!apiKey && <span className="text-titan-gold flex items-center gap-1"><AlertCircle size={10} /> Required</span>}
                    </label>
                    <div className="flex items-center gap-2">
                        <input 
                            id="api-key-input"
                            name="apiKey"
                            type={showKey ? "text" : "password"} 
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Enter Google GenAI API Key..."
                            className="bg-transparent border-none outline-none text-white w-full text-sm placeholder-slate-700 font-mono"
                        />
                    </div>
                </div>
                <button onClick={() => setShowKey(!showKey)} className="text-slate-500 hover:text-white transition-colors z-10">
                    {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                
                {/* Visual Feedback for Valid Key Entry */}
                {apiKey && <div className="absolute right-0 top-0 bottom-0 w-1 bg-titan-accent shadow-[0_0_15px_rgba(59,130,246,0.5)]" />}
            </div>
            <p className="mt-2 text-xs text-slate-600 pl-1">
                Security Protocol: Keys are processed locally in your browser memory. No external storage.
            </p>
        </div>

        <BentoGrid className="grid-cols-1 lg:grid-cols-2 gap-8">
            <BentoItem colSpan={2}><BuilderModule apiKey={apiKey} notify={notify} /></BentoItem>
            <BentoItem colSpan={2}><VoiceModule apiKey={apiKey} notify={notify} /></BentoItem>
            <BentoItem><VisionModule apiKey={apiKey} notify={notify} /></BentoItem>
            <BentoItem><MotionModule apiKey={apiKey} notify={notify} /></BentoItem>
            <BentoItem colSpan={2}><WriterModule apiKey={apiKey} notify={notify} /></BentoItem>
            <BentoItem colSpan={2}><IntelModule apiKey={apiKey} notify={notify} /></BentoItem>
        </BentoGrid>
      </div>
    </div>
  );
}
import React, { useState, useEffect, useCallback, useRef } from 'react';
import TerminalHero from './components/TerminalHero';
import CareerDiagram from './components/CareerDiagram';
import EnduranceDashboard from './components/EnduranceDashboard';
import MultimodalAgent from './components/MultimodalAgent';
import ReadmeSection from './components/ReadmeSection';
import ContactJSON from './components/ContactJSON';
import LifeBoard from './components/LifeBoard';
import ThemeStamper from './components/ThemeStamper';

type GeminiAction = 'SUMMARIZE' | 'AUDIO' | 'IMAGE' | null;
type AppTheme = 'modern' | 'classic' | 'weather' | 'disney';

const knativeYaml = `# Website created using https://aistudio.google.com/. Prompted and tweaked with love.
# Deployed to directly to  Cloud Run with a single click and being paid for by Google Cloud credits as per the AI benefits of Google Pro Tier https://developers.google.com/program/my-benefits

apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: neillock-co-uk
  namespace: 'sdf'
  selfLink: /apis/serving.knative.dev/v1/namespaces/sdgsd
  uid: asfasg
  resourceVersion: sdf
  generation: 24
  creationTimestamp: '2026-02-02T17:41:29.260246Z'
  labels:
    managed-by: google-ai-studio
    cloud.googleapis.com/location: us-west1
  annotations:
    serving.knative.dev/creator: nothingtoseehere@google
    serving.knative.dev/lastModifier: nothingtoseehere@google
    generativelanguage.googleapis.com/type: applet
    run.googleapis.com/client-name: cloud-console
    run.googleapis.com/ingress: all
    run.googleapis.com/operation-id: gjh
    run.googleapis.com/ingress-status: all
    run.googleapis.com/invoker-iam-disabled: 'true'
    run.googleapis.com/maxScale: '20'
    run.googleapis.com/build-source-location: gs://bucket
    run.googleapis.com/build-enable-automatic-updates: 'false'
    run.googleapis.com/urls: '["foo-bar","foo-bar"]'
spec:
  template:
    metadata:
      labels:
        run.googleapis.com/startupProbeType: Default
      annotations:
        run.googleapis.com/sessionAffinity: 'false'
        autoscaling.knative.dev/minScale: '0'
        autoscaling.knative.dev/maxScale: '3'
        run.googleapis.com/base-images: '{"":"us-central1-docker.pkg.dev/serverless-runtimes/google-22/runtimes/nodejs22"}'
        run.googleapis.com/cpu-throttling: 'true'
    spec:
      containerConcurrency: 80
      timeoutSeconds: 300
      serviceAccountName: uhuhuh@developer.gserviceaccount.com
      containers:
      - image: us-docker.pkg.dev/cloudrun/container/aistudio/applet-proxy
        ports:
        - name: http1
          containerPort: 8080
        env:
        - name: API_KEY
          value: go_get_your_own_here https://aistudio.google.com/
        resources:
          limits:
            cpu: 1000m
            memory: 512Mi
        volumeMounts:
        - name: applet
          mountPath: /app/dist
        startupProbe:
          timeoutSeconds: 240
          periodSeconds: 240
          failureThreshold: 1
          tcpSocket:
            port: 8080
      volumes:
      - name: applet
        csi:
          driver: gcsfuse.run.googleapis.com
          readOnly: true
          volumeAttributes:
            bucketName: 
            mountOptions: only-dir=services/neillock-co-uk
      runtimeClassName: run.googleapis.com/linux-base-image-update
  traffic:
  - percent: 100
    latestRevision: true
status:
  observedGeneration: 24
  conditions:
  - type: Ready
    status: 'True'
    lastTransitionTime: '2026-02-03T09:14:26.591921Z'
  - type: BaseImageValidated
    status: 'True'
    severity: Info
  - type: ConfigurationsReady
    status: 'True'
    lastTransitionTime: '2026-02-03T09:14:21.626648Z'
  - type: RoutesReady
    status: 'True'
    lastTransitionTime: '2026-02-03T09:14:26.556361Z'
  latestReadyRevisionName: xxxxxx
  latestCreatedRevisionName: xxxxxx
  traffic:
  - revisionName: xxxxxx
    percent: 100
    latestRevision: true
  url: xxxxx
  address:
    url: xxxxxx`;

const MagicWandTrail: React.FC = () => {
  const [trails, setTrails] = useState<{ x: number; y: number; id: number; color: string }[]>([]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const colors = ['#fde047', '#fefce8', '#818cf8', '#f472b6'];
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setTrails(prev => [...prev.slice(-15), newTrail]);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {trails.map(t => (
        <div 
          key={t.id}
          className="absolute w-2 h-2 rounded-full animate-magic-sparkle"
          style={{ 
            left: t.x, 
            top: t.y, 
            backgroundColor: t.color,
            boxShadow: `0 0 10px ${t.color}`
          }}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [hoveringOn, setHoveringOn] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [geminiMenuOpen, setGeminiMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [activeAction, setActiveAction] = useState<GeminiAction>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResult, setAiResult] = useState<{text?: string, imageUrl?: string} | null>(null);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [isYamlOpen, setIsYamlOpen] = useState(false);
  const [isYamlWrapped, setIsYamlWrapped] = useState(false);
  const [theme, setTheme] = useState<AppTheme>('modern');
  const [isJurassicLocked, setIsJurassicLocked] = useState(false);
  const [hasTriggeredJurassic, setHasTriggeredJurassic] = useState(false);

  const isGeekMode = theme === 'classic';
  const isWeatherMode = theme === 'weather';
  const isDisneyMode = theme === 'disney';

  const handleHover = useCallback((id: string | null) => {
    setHoveringOn(id);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.innerHeight + window.scrollY;
      const totalHeight = document.body.offsetHeight;
      const isAtBottom = scrollPos >= totalHeight - 40;
      
      if (isAtBottom) {
        setGeminiMenuOpen(true);
      } else if (scrollPos < totalHeight - 150) {
        setGeminiMenuOpen(false);
      }

      if (isGeekMode && !hasTriggeredJurassic && window.scrollY > 400) {
        setIsJurassicLocked(true);
        setHasTriggeredJurassic(true);
      }

      const sections = ['career', 'endurance', 'life', 'readme', 'lab', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight * 0.4) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isGeekMode, hasTriggeredJurassic]);

  const closeAiModal = () => {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
      setAudioPlayer(null);
    }
    setActiveAction(null);
  };

  const handleThemeSelect = (newTheme: AppTheme) => {
    setTheme(newTheme);
    setThemeMenuOpen(false);
    if (newTheme !== 'classic') setHasTriggeredJurassic(false);
  };

  const runGeminiAction = async (action: GeminiAction) => {
    setGeminiMenuOpen(false);
    setIsProcessing(true);
    setActiveAction(action);
    setAiResult(null);
    await new Promise(resolve => setTimeout(resolve, 1800));
    try {
      if (action === 'SUMMARIZE') {
        setAiResult({ text: `Welcome to the system architecture of Neil Lock...` });
      } else if (action === 'IMAGE') {
        setAiResult({ imageUrl: "images/gemini_disney.png" });
      } else if (action === 'AUDIO') {
        const audio = new Audio('Life_of_the_Builder.mp3');
        audio.play().catch(e => console.error("Audio playback blocked:", e));
        setAudioPlayer(audio);
        setAiResult({}); 
      }
    } catch (err) {
      console.error("Gemini Action Failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const navLinks = [
    { id: 'career', label: 'Career', hoverId: 'NAV_CAREER' },
    { id: 'endurance', label: 'Dashboard', hoverId: 'NAV_DASHBOARD' },
    { id: 'life', label: 'Life', hoverId: 'NAV_LIFE' },
    { id: 'readme', label: 'Readme', hoverId: 'NAV_README' },
    { id: 'lab', label: 'Lab', hoverId: 'NAV_LAB' },
    { id: 'contact', label: 'API', hoverId: 'NAV_API' },
  ];

  const renderYamlLine = (line: string, i: number) => {
    if (line.trim().startsWith('#')) return <span key={i} className="text-white block w-full">{line}</span>;
    if (!line.trim()) return <div key={i} className="min-h-[1.25rem] w-full">&nbsp;</div>;
    const parts = line.split(':');
    if (parts.length > 1) {
      return (
        <div key={i} className="w-full">
          <span className="text-[#9cdcfe]">{parts[0]}</span>:<span className="text-[#ce9178]">{parts.slice(1).join(':')}</span>
        </div>
      );
    }
    return <div key={i} className="w-full">{line}</div>;
  };

  return (
    <div className={`min-h-screen transition-all duration-700 relative 
      ${isGeekMode ? 'geek-mode bg-black text-green-500 font-mono' : ''} 
      ${isWeatherMode ? 'weather-mode bg-slate-900 text-slate-300' : ''}
      ${isDisneyMode ? 'disney-mode bg-indigo-950 text-indigo-100 cursor-magic' : ''}
      ${theme === 'modern' ? 'dot-grid bg-white text-black' : ''}`}>
      
      <ThemeStamper onApplyWeather={() => handleThemeSelect('weather')} />

      {isDisneyMode && <MagicWandTrail />}

      {isWeatherMode && (
        <div className="rain-container pointer-events-none fixed inset-0 z-0">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="rain-drop" 
              style={{ 
                left: `${Math.random() * 100}%`, 
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`
              }} 
            />
          ))}
        </div>
      )}

      {isDisneyMode && (
        <>
          <div className="stardust-container pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {[...Array(80)].map((_, i) => (
              <div 
                key={i} 
                className="sparkle-v2" 
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`
                }} 
              />
            ))}
          </div>
          <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="mickey-bubble" style={{ left: `${5 + i * 8}%`, animationDelay: `${i * 1.5}s`, animationDuration: `${15 + Math.random() * 10}s` }}>
                <svg viewBox="0 0 24 24" className="w-12 h-12 fill-indigo-400/20 blur-[1px] drop-shadow-[0_0_5px_rgba(253,224,71,0.2)]">
                  <circle cx="12" cy="14" r="7" />
                  <circle cx="6" cy="6" r="4" />
                  <circle cx="18" cy="6" r="4" />
                </svg>
              </div>
            ))}
          </div>
        </>
      )}

      {isJurassicLocked && (
        <div 
          className="fixed inset-0 z-[10000] bg-[#0000ff] flex items-center justify-center p-0 md:p-8 cursor-pointer overflow-hidden"
          onClick={() => setIsJurassicLocked(false)}
        >
          <div className="w-full h-full max-w-6xl flex flex-col md:flex-row gap-0 bg-[#cccccc] border-[4px] border-[#999999] shadow-[inset_-4px_-4px_#333333,inset_4px_4px_#ffffff] p-1 font-mono">
            <div className="flex-grow flex flex-col bg-[#0000ff] p-4 text-white text-[12px] md:text-[14px] overflow-hidden">
               <div className="flex gap-2 mb-2">
                 <div className="bg-[#cccccc] px-2 text-black text-[10px] font-bold">Central Park Console</div>
                 <div className="bg-[#999999] px-2 text-[#333333] text-[10px]">Laboratory Manager</div>
               </div>
               <div className="mb-4">
                 Jurassic Sparc, System Security Interface<br/>
                 Version 4.0.5, Alpha E<br/>
                 Ready...<br/>
                 &gt; access security<br/>
                 access: PERMISSION DENIED.<br/>
                 &gt; access security grid<br/>
                 access: PERMISSION DENIED.<br/>
                 &gt; access main security grid<br/>
                 access: PERMISSION DENIED....and...
               </div>
               <div className="text-white animate-[blink_0.3s_step-end_infinite]">
                 {[...Array(50)].map((_, i) => (
                   <div key={i}>YOU DIDN'T SAY THE MAGIC WORD!</div>
                 ))}
               </div>
            </div>

            <div className="w-full md:w-48 bg-[#cccccc] p-4 flex flex-col gap-4 items-center shrink-0">
               <div className="w-20 h-20 rounded-full bg-red-600 border-[3px] border-black flex items-center justify-center mb-4 shadow-[2px_2px_#000000]">
                  <svg viewBox="0 0 24 24" className="w-16 h-16 fill-black"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
               </div>
               {['Settings', 'About', 'Reboot', 'Replay', 'Close'].map(btn => (
                 <button key={btn} className="w-full bg-[#cccccc] border-[2px] border-white shadow-[1px_1px_#000000,2px_2px_#666666] py-1 text-[11px] hover:bg-[#bbbbbb] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">{btn}</button>
               ))}
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[600px] bg-[#cccccc] border-[3px] border-white shadow-[2px_2px_#000000,5px_5px_rgba(0,0,0,0.5)] flex flex-col z-50 animate-[jiggle_0.8s_ease-in-out_infinite]">
               <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center text-[12px] font-bold">
                 <span>Warning</span>
                 <button className="bg-[#cccccc] text-black w-4 h-4 flex items-center justify-center border border-white shadow-[1px_1px_#000000] text-[10px]">×</button>
               </div>
               <div className="p-4 flex flex-col items-center gap-4">
                 <img 
                   src="images/jurassicpark.jpg" 
                   alt="Nedry Finger Wag" 
                   className="w-full h-auto border-2 border-black"
                   onError={(e) => {
                     e.currentTarget.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3ZndXVreXNqenF6dmhicWZ6ZndxNHo0bDJueWR1c2U1dm80cXhxdnE5OCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vB5jiVv1Tr2tW/giphy.gif";
                   }}
                 />
                 <div className="text-black font-bold text-center text-xl md:text-2xl tracking-tight uppercase leading-none py-2">
                   YOU DIDN'T SAY THE MAGIC WORD!
                 </div>
                 <button className="px-8 py-1 bg-[#cccccc] border-[2px] border-white shadow-[1px_1px_#000000] text-[12px] font-bold">OK</button>
               </div>
            </div>
          </div>
        </div>
      )}

      <nav className={`fixed top-0 left-0 right-0 h-20 border-b z-[1000] backdrop-blur-md shadow-sm transition-all duration-500 
        ${isGeekMode ? 'bg-black border-green-500/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' : ''} 
        ${isWeatherMode ? 'bg-slate-900/80 border-slate-700/50' : ''}
        ${isDisneyMode ? 'bg-indigo-900/80 border-indigo-400/30 shadow-[0_4px_30px_rgba(253,224,71,0.2)]' : ''}
        ${theme === 'modern' ? 'bg-white/95 border-slate-200' : ''}`}>
        <div className="flex h-full items-center px-6 justify-between max-w-7xl mx-auto font-mono text-xs uppercase tracking-widest text-slate-500">
          <div className="flex items-center gap-6">
            <a href="#" onClick={scrollToTop} className={`font-bold text-sm tracking-tighter transition-colors 
              ${isGeekMode ? 'text-green-400' : ''} 
              ${isWeatherMode ? 'text-slate-100' : ''}
              ${isDisneyMode ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(253,224,71,0.8)] disney-font text-lg flex items-center gap-2' : ''}
              ${theme === 'modern' ? 'text-black hover:text-blue-600' : ''}`}>
                {isDisneyMode && (
                   <svg viewBox="0 0 24 24" className="w-5 h-5 fill-yellow-400 animate-pulse">
                     <circle cx="12" cy="14" r="7" />
                     <circle cx="6" cy="6" r="4" />
                     <circle cx="18" cy="6" r="4" />
                   </svg>
                )}
                neillock.co.uk
              </a>
            <span className={`hidden lg:inline border-l pl-6 text-[10px] opacity-60 
              ${isGeekMode ? 'border-green-500/20 text-green-600' : ''} 
              ${isWeatherMode ? 'border-slate-700 text-slate-500' : ''}
              ${isDisneyMode ? 'border-indigo-400/20 text-indigo-300' : ''}
              ${theme === 'modern' ? 'border-slate-200' : ''}`}>v4.0.0-human</span>
          </div>
          <div className="flex items-center h-full gap-4">
            <div className="hidden md:flex h-full items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} className={`transition-all 
                  ${activeSection === link.id ? 
                    (isGeekMode ? 'text-green-400 font-bold underline underline-offset-4' : 
                     isWeatherMode ? 'text-slate-100 font-bold border-b border-slate-100' : 
                     isDisneyMode ? 'text-yellow-300 font-bold drop-shadow-[0_0_8px_rgba(253,224,71,0.5)] scale-110' :
                     'text-blue-600 font-bold') : 
                    (isGeekMode ? 'text-green-800 hover:text-green-400' : 
                     isWeatherMode ? 'text-slate-500 hover:text-slate-300' : 
                     isDisneyMode ? 'text-indigo-400 hover:text-yellow-400 disney-font hover:scale-105' :
                     'text-slate-500 hover:text-black')}`} onMouseEnter={() => handleHover(link.hoverId)}>
                  {link.label}
                </a>
              ))}
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden p-2 z-[1010] 
              ${isGeekMode ? 'text-green-500' : ''} 
              ${isWeatherMode ? 'text-slate-300' : ''}
              ${isDisneyMode ? 'text-yellow-400' : ''}
              ${theme === 'modern' ? 'text-slate-600 hover:text-black' : ''}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className={`fixed inset-0 z-[999] pt-24 px-8 md:hidden animate-in fade-in slide-in-from-top-4 transition-colors duration-500 
          ${isGeekMode ? 'bg-black text-green-500' : ''} 
          ${isWeatherMode ? 'bg-slate-900 text-slate-100' : ''}
          ${isDisneyMode ? 'bg-indigo-950 text-indigo-100' : ''}
          ${theme === 'modern' ? 'bg-white' : ''}`}>
          <div className="flex flex-col gap-8 text-2xl font-bold tracking-tighter">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={() => setIsMenuOpen(false)} className={activeSection === link.id ? (isGeekMode ? 'text-green-400' : isWeatherMode ? 'text-slate-100' : isDisneyMode ? 'text-yellow-400 disney-font' : 'text-blue-600') : ''}>{link.label}</a>
            ))}
          </div>
        </div>
      )}

      {isDisneyMode && (
        <div className="fixed top-20 left-0 right-0 h-1 z-[100] overflow-hidden pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-magic-arc shadow-[0_0_20px_#fde047]" />
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-12 transition-all">
        <TerminalHero onHover={handleHover} />
        <div id="career" className="pt-8 md:pt-12 scroll-mt-20"><CareerDiagram onHover={handleHover} /></div>
        <div id="endurance" className="pt-8 md:pt-12 scroll-mt-20"><EnduranceDashboard onHover={handleHover} /></div>
        <div id="life" className="pt-8 md:pt-12 scroll-mt-20"><LifeBoard onHover={handleHover} /></div>
        <div id="readme" className="pt-8 md:pt-12 scroll-mt-20"><ReadmeSection onHover={handleHover} /></div>
       
        <div id="contact" className="pt-8 md:pt-12 pb-0 scroll-mt-20">
          <ContactJSON onHover={handleHover} />
        </div>
      </main>

      <footer className={`fixed bottom-0 left-0 right-0 h-12 flex items-center px-4 md:px-6 font-mono text-[11px] z-[1500] border-t shadow-[0_-10px_20px_rgba(0,0,0,0.5)] transition-all duration-500 
        ${isGeekMode ? 'bg-black text-green-500 border-green-500/30' : ''} 
        ${isWeatherMode ? 'bg-slate-900 text-slate-400 border-slate-800' : ''}
        ${isDisneyMode ? 'bg-indigo-950 text-indigo-400 border-indigo-900 shadow-[0_-4px_30px_rgba(79,70,229,0.3)]' : ''}
        ${theme === 'modern' ? 'bg-black text-white border-white/5' : ''}`}>
        <div className="flex items-center justify-between opacity-90 w-full relative h-full">
          <div className="flex items-center gap-2 md:gap-4 cursor-pointer group/status h-full" onClick={() => setIsYamlOpen(true)}>
            <span className={isGeekMode ? 'text-green-400' : isWeatherMode ? 'text-slate-500' : isDisneyMode ? 'text-yellow-500' : 'text-green-400'}>●</span>
            <span className={`font-bold tracking-widest whitespace-nowrap flex items-center gap-1 uppercase transition-colors 
              ${isGeekMode ? 'text-green-500 hover:text-green-300' : ''} 
              ${isWeatherMode ? 'text-slate-400 hover:text-slate-200' : ''}
              ${isDisneyMode ? 'text-indigo-300 hover:text-yellow-400 disney-font' : ''}
              ${theme === 'modern' ? 'group-hover:text-blue-400' : ''}`}>
              YAML <span className="inline-block animate-wrench-spin">🔧</span>
            </span>
          </div>

          <div className="flex items-center gap-4 h-full">
            <div className="relative h-full flex items-center justify-center">
              <div 
                className={`absolute bottom-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-64 border rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.9)] p-2 z-[1600] transition-all duration-1000 transform origin-bottom ${geminiMenuOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-12 scale-95 pointer-events-none'} 
                  ${isGeekMode ? 'bg-black border-green-500' : ''} 
                  ${isWeatherMode ? 'bg-slate-800 border-slate-600' : ''}
                  ${isDisneyMode ? 'bg-indigo-900 border-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.5)]' : ''}
                  ${theme === 'modern' ? 'bg-slate-900 border-blue-500' : ''}`} 
                style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                <div className={`absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] z-10 
                  ${isGeekMode ? 'border-t-green-500' : ''} 
                  ${isWeatherMode ? 'border-t-slate-600' : ''}
                  ${isDisneyMode ? 'border-t-indigo-400' : ''}
                  ${theme === 'modern' ? 'border-t-blue-500' : ''}`} />
                <div className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest border-b mb-1 
                  ${isGeekMode ? 'text-green-400 border-green-500/20' : ''} 
                  ${isWeatherMode ? 'text-slate-300 border-slate-700' : ''}
                  ${isDisneyMode ? 'text-yellow-400 border-indigo-800 disney-font' : ''}
                  ${theme === 'modern' ? 'text-blue-400 border-white/5' : ''}`}>Intelligence Options</div>
                {[
                  { id: 'SUMMARIZE', label: 'Summarise Page' },
                  { id: 'AUDIO', label: 'Get as Audiobook' },
                  { id: 'IMAGE', label: '🍌 Create Image' }
                ].map(item => (
                  <button key={item.id} onClick={() => runGeminiAction(item.id as GeminiAction)} className={`w-full text-left px-3 py-2.5 text-[11px] rounded flex items-center gap-3 transition-all 
                    ${isGeekMode ? 'text-green-600 hover:bg-green-500/20 hover:text-green-300' : ''} 
                    ${isWeatherMode ? 'text-slate-400 hover:bg-slate-700 hover:text-slate-100' : ''}
                    ${isDisneyMode ? 'text-indigo-200 hover:bg-indigo-800 hover:text-yellow-300 disney-font' : ''}
                    ${theme === 'modern' ? 'text-slate-300 hover:bg-blue-600 hover:text-white' : ''}`}>
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="relative flex items-center h-full">
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 transition-all duration-1000 transform origin-bottom ${geminiMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-0'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                  <div className={`w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] 
                    ${isGeekMode ? 'border-b-green-500' : ''} 
                    ${isWeatherMode ? 'border-b-slate-600' : ''}
                    ${isDisneyMode ? 'border-b-indigo-400' : ''}
                    ${theme === 'modern' ? 'border-b-blue-500' : ''}`} />
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setGeminiMenuOpen(!geminiMenuOpen); setThemeMenuOpen(false); }}
                  className={`flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full transition-all border duration-500 relative z-20 whitespace-nowrap 
                    ${geminiMenuOpen ? (isGeekMode ? 'bg-green-900 border-green-400 text-green-200' : isWeatherMode ? 'bg-slate-700 border-slate-500 text-slate-100' : isDisneyMode ? 'bg-indigo-800 border-indigo-400 text-yellow-200' : 'bg-blue-600 border-blue-400 text-white') : 
                                    (isGeekMode ? 'bg-black border-green-800 text-green-800 hover:border-green-400' : isWeatherMode ? 'bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500' : isDisneyMode ? 'bg-indigo-950 border-indigo-800 text-indigo-600 hover:border-indigo-400' : 'bg-slate-900 border-slate-700 hover:border-blue-500')}`}
                >
                  <svg className={`w-3.5 h-3.5 ${geminiMenuOpen ? (isGeekMode ? 'text-green-400' : isWeatherMode ? 'text-slate-300' : isDisneyMode ? 'text-yellow-300' : 'text-white') : (isGeekMode ? 'text-green-900' : isWeatherMode ? 'text-slate-700' : isDisneyMode ? 'text-indigo-800' : 'text-blue-400 animate-pulse')}`} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9L21.5 11.5L14.5 14L12 21L9.5 14L2.5 11.5L9.5 9L12 2Z" /></svg>
                  <span className="text-[10px] font-bold tracking-widest uppercase">AI Mode</span>
                </button>
              </div>
            </div>

            <div className="relative h-full flex items-center justify-center">
              <div 
                className={`absolute bottom-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-64 border rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.9)] p-2 z-[1600] transition-all duration-1000 transform origin-bottom ${themeMenuOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-12 scale-95 pointer-events-none'} 
                  ${isGeekMode ? 'bg-black border-green-500' : ''} 
                  ${isWeatherMode ? 'bg-slate-800 border-slate-600' : ''}
                  ${isDisneyMode ? 'bg-indigo-900 border-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.5)]' : ''}
                  ${theme === 'modern' ? 'bg-slate-900 border-blue-500' : ''}`} 
                style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
              >
                <div className={`absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] z-10 
                  ${isGeekMode ? 'border-t-green-500' : ''} 
                  ${isWeatherMode ? 'border-t-slate-600' : ''}
                  ${isDisneyMode ? 'border-t-indigo-400' : ''}
                  ${theme === 'modern' ? 'border-t-blue-500' : ''}`} />
                <div className={`px-3 py-2 text-[10px] font-bold uppercase tracking-widest border-b mb-1 
                  ${isGeekMode ? 'text-green-400 border-green-500/20' : ''} 
                  ${isWeatherMode ? 'text-slate-300 border-slate-700' : ''}
                  ${isDisneyMode ? 'text-yellow-400 border-indigo-800 disney-font' : ''}
                  ${theme === 'modern' ? 'text-blue-400 border-white/5' : ''}`}>Select Visual Protocol</div>
                {[
                  { id: 'modern', label: '✨ Modern Mode', icon: '✨' },
                  { id: 'classic', label: '🦖 Classic Mode', icon: '🦖' },
                  { id: 'weather', label: '🌧️ Rubbish Weather', icon: '🌧️' },
                  { id: 'disney', label: '🏰 Disney Mode', icon: '🏰' }
                ].map(item => (
                  <button key={item.id} onClick={() => handleThemeSelect(item.id as AppTheme)} className={`w-full text-left px-3 py-2.5 text-[11px] rounded flex items-center justify-between transition-all 
                    ${theme === item.id ? (isGeekMode ? 'bg-green-500/20 text-green-300' : isWeatherMode ? 'bg-slate-700 text-slate-100' : isDisneyMode ? 'bg-indigo-700 text-yellow-300 disney-font' : 'bg-blue-600 text-white') : 
                                       (isGeekMode ? 'text-green-600 hover:bg-green-500/10 hover:text-green-300' : isWeatherMode ? 'text-slate-400 hover:bg-slate-700 hover:text-slate-100' : isDisneyMode ? 'text-indigo-400 hover:bg-indigo-800 hover:text-yellow-400 disney-font' : 'text-slate-300 hover:bg-blue-600 hover:text-white')}`}>
                    <span>{item.label}</span>
                    {theme === item.id && <span className="text-[10px]">●</span>}
                  </button>
                ))}
              </div>

              <div className="relative flex items-center h-full">
                <div className={`absolute bottom-full left-1/2 -translate-x-1/2 transition-all duration-1000 transform origin-bottom ${themeMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-0'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                  <div className={`w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] 
                    ${isGeekMode ? 'border-b-green-500' : ''} 
                    ${isWeatherMode ? 'border-b-slate-600' : ''}
                    ${isDisneyMode ? 'border-b-indigo-400' : ''}
                    ${theme === 'modern' ? 'border-b-blue-500' : ''}`} />
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setThemeMenuOpen(!themeMenuOpen); setGeminiMenuOpen(false); }}
                  className={`font-bold border px-3 py-1.5 rounded text-[10px] whitespace-nowrap uppercase tracking-widest transition-all duration-500 relative
                    ${isGeekMode ? 'bg-green-500 text-black border-green-400 shadow-[0_0_15px_#00ff00]' : ''} 
                    ${isWeatherMode ? 'bg-slate-800 text-slate-300 border-slate-600' : ''}
                    ${isDisneyMode ? 'bg-indigo-800 text-yellow-300 border-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.4)] disney-font' : ''}
                    ${theme === 'modern' ? 'text-blue-500 border-blue-500/30 hover:bg-blue-500/10' : ''}`}
                >
                  {isDisneyMode && (
                    <div className="absolute -top-3 -left-2 scale-[0.6] pointer-events-none opacity-80">
                      <svg viewBox="0 0 24 24" className="w-10 h-10 fill-yellow-400 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]">
                        <circle cx="12" cy="14" r="7" /><circle cx="6" cy="6" r="4" /><circle cx="18" cy="6" r="4" />
                      </svg>
                    </div>
                  )}
                  {theme === 'modern' ? '✨ Modern' : theme === 'classic' ? '🦖 Classic' : theme === 'weather' ? '🌧️ Weather' : '🏰 Disney'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {isYamlOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsYamlOpen(false)} />
          <div className={`relative w-full max-w-4xl border shadow-2xl rounded-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 
            ${isGeekMode ? 'bg-black border-green-500 shadow-[0_0_30px_rgba(0,255,0,0.2)]' : ''} 
            ${isWeatherMode ? 'bg-slate-900 border-slate-700 shadow-xl' : ''}
            ${isDisneyMode ? 'bg-indigo-950 border-indigo-500 shadow-[0_0_40px_rgba(253,224,71,0.2)]' : ''}
            ${theme === 'modern' ? 'bg-[#1e1e1e] border-slate-800' : ''}`}>
            <div className={`flex justify-between items-center px-6 py-3 border-b 
              ${isGeekMode ? 'bg-black border-green-500/30' : ''} 
              ${isWeatherMode ? 'bg-slate-800 border-slate-700' : ''}
              ${isDisneyMode ? 'bg-indigo-900 border-indigo-500/20' : ''}
              ${theme === 'modern' ? 'bg-[#2d2d2d] border-black/20' : ''}`}>
              <div className="flex items-center gap-3"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ff5f57]" /><div className="w-3 h-3 rounded-full bg-[#febc2e]" /><div className="w-3 h-3 rounded-full bg-[#28c840]" /></div><span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest ml-4">service.yaml</span></div>
              <button onClick={() => setIsYamlOpen(false)} className={`text-slate-500 hover:text-white text-xl ${isGeekMode ? 'text-green-500' : ''}`}>×</button>
            </div>
            <div className={`p-0 overflow-y-auto custom-scrollbar flex-grow max-h-[75vh] 
              ${isGeekMode ? 'bg-black' : ''} 
              ${isWeatherMode ? 'bg-slate-900' : ''}
              ${isDisneyMode ? 'bg-indigo-950' : ''}
              ${theme === 'modern' ? 'bg-[#1e1e1e]' : ''}`}>
              <table className={`w-full font-mono text-[13px] 
                ${isGeekMode ? 'text-green-500' : ''} 
                ${isWeatherMode ? 'text-slate-400' : ''}
                ${isDisneyMode ? 'text-indigo-200' : ''}
                ${theme === 'modern' ? 'text-[#d4d4d4]' : ''}`}><tbody>{knativeYaml.split('\n').map((line, i) => (<tr key={i}><td className={`w-12 text-right pr-4 select-none border-r opacity-50 sticky left-0 py-0.5 
                  ${isGeekMode ? 'bg-black text-green-900 border-green-900' : ''} 
                  ${isWeatherMode ? 'bg-slate-900 border-slate-800 text-slate-600' : ''}
                  ${isDisneyMode ? 'bg-indigo-950 border-indigo-800 text-indigo-700' : ''}
                  ${theme === 'modern' ? 'text-[#858585] border-white/5 bg-[#1e1e1e]' : ''}`}>{i + 1}</td><td className={`pl-4 py-0.5 ${isYamlWrapped ? 'whitespace-pre-wrap' : 'whitespace-pre'} 
                    ${isGeekMode ? 'shadow-[inset_0_0_5px_rgba(0,255,0,0.1)]' : ''}
                    ${isWeatherMode ? 'text-slate-300' : ''}
                    ${isDisneyMode ? 'text-indigo-100 drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]' : ''}`}>{renderYamlLine(line, i)}</td></tr>))}</tbody></table>
            </div>
          </div>
        </div>
      )}

      {activeAction && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={closeAiModal} />
          <div className={`relative w-full max-w-2xl border shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-500 
            ${isGeekMode ? 'bg-black border-green-500' : ''} 
            ${isWeatherMode ? 'bg-slate-900 border-slate-700 text-slate-300' : ''}
            ${isDisneyMode ? 'bg-indigo-950 border-indigo-400 text-indigo-100 shadow-[0_0_50px_rgba(253,224,71,0.3)]' : ''}
            ${theme === 'modern' ? 'bg-slate-900 border-slate-800' : ''}`}>
            {isProcessing ? (
              <div className="p-12 flex flex-col items-center gap-6"><div className={`w-16 h-16 border-4 rounded-full animate-spin 
                ${isGeekMode ? 'border-green-900 border-t-green-500' : ''} 
                ${isWeatherMode ? 'border-slate-700 border-t-slate-300' : ''}
                ${isDisneyMode ? 'border-indigo-400 border-t-yellow-300' : ''}
                ${theme === 'modern' ? 'border-blue-500/20 border-t-blue-500' : ''}`} /><div className={`font-mono text-xs uppercase animate-pulse 
                  ${isGeekMode ? 'text-green-400' : ''} 
                  ${isWeatherMode ? 'text-slate-500' : ''}
                  ${isDisneyMode ? 'text-yellow-400' : ''}
                  ${theme === 'modern' ? 'text-blue-400' : ''}`}>Processing Stream...</div></div>
            ) : (
              <div className="p-0">
                <div className={`flex justify-between items-center p-6 border-b 
                  ${isGeekMode ? 'border-green-500/20' : ''} 
                  ${isWeatherMode ? 'border-slate-800' : ''}
                  ${isDisneyMode ? 'border-indigo-900' : ''}
                  ${theme === 'modern' ? 'border-white/5' : ''}`}><div className="flex items-center gap-3"><span className={`font-mono text-[10px] uppercase tracking-widest 
                    ${isGeekMode ? 'text-green-500' : ''} 
                    ${isWeatherMode ? 'text-slate-500' : ''}
                    ${isDisneyMode ? 'text-yellow-500 disney-font' : ''}
                    ${theme === 'modern' ? 'text-slate-400' : ''}`}>Modality: {activeAction}</span></div><button onClick={closeAiModal} className={`font-mono text-xl 
                      ${isGeekMode ? 'text-green-500' : ''} 
                      ${isWeatherMode ? 'text-slate-500' : ''}
                      ${isDisneyMode ? 'text-indigo-400 hover:text-yellow-400' : ''}
                      ${theme === 'modern' ? 'text-slate-500 hover:text-white' : ''}`}>×</button></div>
                <div className="p-8">
                  {activeAction === 'SUMMARIZE' && <div className={`font-mono text-sm leading-relaxed whitespace-pre-wrap animate-in fade-in duration-1000 
                    ${isGeekMode ? 'text-green-400' : ''} 
                    ${isWeatherMode ? 'text-slate-400' : ''}
                    ${isDisneyMode ? 'text-indigo-100' : ''}
                    ${theme === 'modern' ? 'text-slate-300' : ''}`}>{aiResult?.text}</div>}
                  {activeAction === 'IMAGE' && aiResult?.imageUrl && <img src={aiResult.imageUrl} className={`w-full rounded-lg shadow-xl animate-in zoom-in duration-1000 
                    ${isGeekMode ? 'grayscale contrast-125 sepia brightness-75' : ''}
                    ${isWeatherMode ? 'grayscale brightness-50' : ''}
                    ${isDisneyMode ? 'brightness-110 saturate-125 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]' : ''}`} />}
                  {activeAction === 'AUDIO' && <div className={`text-center font-mono animate-pulse uppercase tracking-widest 
                    ${isGeekMode ? 'text-green-400' : ''} 
                    ${isWeatherMode ? 'text-slate-500' : ''}
                    ${isDisneyMode ? 'text-yellow-400' : ''}
                    ${theme === 'modern' ? 'text-blue-400' : ''}`}>Streaming Audiobook Protocol...</div>}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes wrench-spin { 0% { transform: rotate(0deg); } 10% { transform: rotate(360deg); } 100% { transform: rotate(360deg); } }
        .animate-wrench-spin { animation: wrench-spin 6s ease-in-out infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .dot-grid {
          background-image: radial-gradient(#E2E8F0 1px, transparent 1px);
          background-size: 24px 24px;
        }

        @keyframes rain {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        .rain-drop {
          position: absolute;
          width: 1px;
          height: 100px;
          background: linear-gradient(transparent, rgba(255, 255, 255, 0.2));
          animation: rain 0.7s linear infinite;
        }
        .weather-mode {
          background: #1a202c !important;
          color: #a0aec0 !important;
        }
        .weather-mode .bg-white, .weather-mode .bg-slate-50 {
          background-color: rgba(45, 55, 72, 0.7) !important;
          backdrop-filter: blur(8px) !important;
          border-color: rgba(74, 85, 104, 0.5) !important;
        }
        .weather-mode .text-black, .weather-mode .text-slate-900, .weather-mode .text-slate-800 {
          color: #e2e8f0 !important;
        }
        .weather-mode img {
          filter: grayscale(0.8) brightness(0.6) contrast(1.1) !important;
        }

        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');
        
        .disney-font {
          font-family: 'Caveat', cursive !important;
        }

        .cursor-magic {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='%23fde047' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.21 1.21 0 0 0 1.72 0L21.64 5.36a1.21 1.21 0 0 0 0-1.72Z'/%3E%3Cpath d='M14 7l3 3'/%3E%3Cpath d='M5 3v4'/%3E%3Cpath d='M19 17v4'/%3E%3Cpath d='M3 5h4'/%3E%3Cpath d='M17 19h4'/%3E%3C/svg%3E"), auto !important;
        }

        @keyframes sparkle-v2 {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.5) rotate(180deg); }
        }
        .sparkle-v2 {
          position: absolute;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px white, 0 0 20px #818cf8;
          animation: sparkle-v2 4s infinite;
        }

        @keyframes magic-sparkle {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.1); opacity: 0; }
        }
        .animate-magic-sparkle {
          animation: magic-sparkle 0.8s ease-out forwards;
        }

        @keyframes magic-arc {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-magic-arc {
          animation: magic-arc 3s ease-in-out infinite;
        }

        @keyframes float-mickey {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(10deg); }
        }
        .mickey-bubble {
          position: absolute;
          bottom: -100px;
          animation: float-mickey 15s ease-in-out infinite, rise 20s linear infinite;
        }
        @keyframes rise {
          from { bottom: -100px; opacity: 0.1; }
          to { bottom: 120vh; opacity: 0; }
        }

        .disney-mode {
          background: radial-gradient(circle at top, #1e1b4b, #312e81, #1e1b4b) !important;
          color: #e0e7ff !important;
          --selection-bg: #818cf8;
        }
        .disney-mode .bg-white, .disney-mode .bg-slate-50 {
          background-color: rgba(49, 46, 129, 0.4) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(129, 140, 248, 0.4) !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(129, 140, 248, 0.1) !important;
          border-radius: 1.5rem !important;
        }
        .disney-mode .text-black, .disney-mode .text-slate-900, .disney-mode .text-slate-800, .disney-mode .text-slate-600 {
          color: #fefce8 !important;
          text-shadow: 0 0 8px rgba(254, 252, 232, 0.2) !important;
        }
        .disney-mode h1, .disney-mode h2, .disney-mode h3 {
          color: #fde047 !important;
          text-shadow: 0 0 15px rgba(253, 224, 71, 0.6) !important;
          font-family: 'Caveat', cursive !important;
        }
        .disney-mode .border-slate-200 {
          border-color: rgba(129, 140, 248, 0.3) !important;
        }
        .disney-mode img {
          filter: brightness(1.1) saturate(1.3) contrast(1.05) !important;
          border-radius: 1.5rem !important;
          box-shadow: 0 10px 40px rgba(0,0,0,0.6), 0 0 20px rgba(129, 140, 248, 0.4) !important;
        }

        .disney-mode .career-track {
          background-color: rgba(253, 224, 71, 0.2) !important;
        }
        .disney-mode .career-scan {
          background-image: linear-gradient(to right, transparent, #fde047, transparent) !important;
          box-shadow: 0 0 30px #fde047 !important;
        }

        @keyframes jiggle {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          25% { transform: translate(-50.5%, -49.5%) rotate(-0.5deg); }
          50% { transform: translate(-49.5%, -50.5%) rotate(0.5deg); }
          75% { transform: translate(-50.5%, -50.5%) rotate(-0.2deg); }
        }

        .geek-mode {
          --primary-green: #33ff33;
          --dark-green: #000000;
          color: var(--primary-green) !important;
          background-color: black !important;
          cursor: crosshair !important;
        }

        .geek-mode * {
          font-family: 'JetBrains Mono', 'Courier New', monospace !important;
        }

        .geek-mode .bg-white, 
        .geek-mode .bg-slate-50, 
        .geek-mode .bg-slate-100, 
        .geek-mode .bg-slate-200,
        .geek-mode .bg-white\/95,
        .geek-mode .bg-slate-950,
        .geek-mode .bg-slate-900,
        .geek-mode .bg-\\[\\#f8fafc\\],
        .geek-mode .bg-\\[\\#1e1e1e\\],
        .geek-mode .bg-\\[\\#2d2d2d\\],
        .geek-mode .cork-wall,
        .geek-mode .bg-transparent,
        .geek-mode .bg-white\/60 {
          background-color: black !important;
          background-image: none !important;
          opacity: 1 !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        .geek-mode div[class*="bg-white"]:not(.career-track):not(.multimodal-box),
        .geek-mode div[class*="bg-slate"]:not(.career-track):not(.multimodal-box),
        .geek-mode div[class*="bg-blue"]:not(.career-track):not(.multimodal-box),
        .geek-mode section[class*="bg-"]:not(.career-track):not(.multimodal-box) {
           background-color: black !important;
           background-image: none !important;
        }

        .geek-mode .backdrop-blur-md,
        .geek-mode .backdrop-blur-xl,
        .geek-mode .backdrop-blur-sm {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }

        .geek-mode .border,
        .geek-mode .border-slate-200,
        .geek-mode .border-slate-300,
        .geek-mode .border-slate-800,
        .geek-mode .border-white\/20,
        .geek-mode .border-white\/5,
        .geek-mode .border-white\/10 {
          border-color: rgba(51, 255, 51, 0.5) !important;
        }

        .geek-mode h1, .geek-mode h2, .geek-mode h3, .geek-mode h4, .geek-mode h5, .geek-mode h6, .geek-mode p, .geek-mode span, .geek-mode a, .geek-mode li {
          color: var(--primary-green) !important;
          text-shadow: 0 0 5px rgba(51, 255, 51, 0.4) !important;
        }

        .geek-mode .font-handwritten {
           font-family: 'JetBrains Mono', monospace !important;
           font-size: 10px !important;
           line-height: 1.2 !important;
        }
        
        .geek-mode .font-handwritten p, 
        .geek-mode .font-handwritten .text-slate-800 {
           color: var(--primary-green) !important;
           font-size: 10px !important;
        }

        .geek-mode .text-slate-400, .geek-mode .text-slate-500, .geek-mode .text-slate-600, .geek-mode .text-slate-300, .geek-mode .text-slate-800, .geek-mode .text-slate-900, .geek-mode .text-slate-700, .geek-mode .text-black {
          color: var(--primary-green) !important;
          text-shadow: none !important;
        }

        .geek-mode .text-blue-600, .geek-mode .text-blue-500, .geek-mode .text-green-600, .geek-mode .text-pink-600, .geek-mode .text-green-400 {
          color: var(--primary-green) !important;
        }

        .geek-mode img {
          filter: grayscale(1) sepia(1) hue-rotate(60deg) saturate(5) brightness(0.6) contrast(1.6) !important;
          border: 1px solid var(--primary-green);
        }

        .geek-mode .wood-trim, .geek-mode .wood-trim-bottom {
          background: black !important;
          border-color: var(--primary-green) !important;
        }

        .geek-mode .scanlines, .geek-mode::after, .geek-mode .board-overlay {
          display: none !important;
        }

        .geek-mode .dot-grid {
          background-image: none !important;
        }

        .geek-mode .shadow-2xl, .geek-mode .shadow-inner, .geek-mode .shadow-xl, .geek-mode .shadow-sm {
          box-shadow: 0 0 15px rgba(51, 255, 51, 0.15) !important;
        }

        .geek-mode button:hover {
          background-color: #052205 !important;
          color: white !important;
          box-shadow: 0 0 20px var(--primary-green) !important;
        }

        .geek-mode main #career .career-track {
           background-color: #ffffff !important;
           opacity: 1 !important;
           box-shadow: 0 0 10px rgba(255, 255, 255, 1) !important;
           z-index: 10 !important;
        }

        @media (min-width: 768px) {
          .geek-mode main #career .career-track.hidden.md\\:block {
             display: block !important;
             height: 1px !important;
             width: auto !important;
          }
        }

        @media (max-width: 767px) {
          .geek-mode main #career .career-track.md\\:hidden {
             display: block !important;
             width: 1px !important;
             height: auto !important;
             left: 50% !important;
             transform: translateX(-50%) !important;
          }
          .geek-mode main #career .flex-col {
             flex-direction: column !important;
             align-items: center !important;
          }
        }
        
        .geek-mode .multimodal-box {
           background-color: transparent !important;
           box-shadow: 0 0 10px rgba(51, 255, 51, 0.3) !important;
           border-color: var(--primary-green) !important;
        }

        .geek-mode .career-scan {
           background-image: linear-gradient(to right, transparent, var(--primary-green), transparent) !important;
           box-shadow: 0 0 20px var(--primary-green) !important;
        }
        
        .geek-mode .career-scan-vertical {
           background-image: linear-gradient(to bottom, transparent, var(--primary-green), transparent) !important;
           box-shadow: 0 0 15px var(--primary-green) !important;
        }

        .geek-mode [class*="text-slate-"], 
        .geek-mode [class*="text-black"],
        .geek-mode .text-slate-900,
        .geek-mode .text-slate-800 {
          color: var(--primary-green) !important;
        }
      `}</style>
    </div>
  );
};

export default App;
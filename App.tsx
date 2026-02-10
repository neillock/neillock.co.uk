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
type AppTheme = 'modern' | 'classic' | 'weather' | 'disney' | 'emily-zoo';

const ScrollingMonkey: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-[2500] overflow-hidden">
      <div className="absolute top-1/2 left-0 text-7xl animate-monkey-bounce-across select-none">
        🐒
      </div>
    </div>
  );
};

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

const EmilyZooAnimals: React.FC = () => {
  const animals = ['🐒', '🐆', '🐼', '🦦', '🦒', '🐘', '🦫', '🦥'];
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div 
          key={i} 
          className="absolute animate-zoo-float text-4xl select-none" 
          style={{ 
            left: `${Math.random() * 90}%`, 
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
            opacity: 0.1
          }}
        >
          {animals[Math.floor(Math.random() * animals.length)]}
        </div>
      ))}
    </div>
  );
};

const BananaReaction: React.FC = () => {
  const [bananas, setBananas] = useState<{ id: number; x: number; rotation: number; delay: number }[]>([]);
  const [isPoofing, setIsPoofing] = useState(false);
  
  const addBananas = () => {
    setIsPoofing(true);
    setTimeout(() => setIsPoofing(false), 300);
    
    const now = Date.now();
    const newBananas = [...Array(5)].map((_, i) => ({
      id: now + i,
      x: (Math.random() * 160) - 80, // Burst width
      rotation: (Math.random() * 360),
      delay: Math.random() * 0.2
    }));

    setBananas(prev => [...prev, ...newBananas]);
    
    // Cleanup
    setTimeout(() => {
      setBananas(prev => prev.filter(b => !newBananas.find(nb => nb.id === b.id)));
    }, 2000);
  };

  return (
    <div className="fixed bottom-20 right-6 z-[2000] flex flex-col items-center gap-2">
      {/* Visual Feedback Label */}
      <div className="bg-white/90 backdrop-blur px-2 py-0.5 rounded border border-slate-200 shadow-sm animate-bounce">
        <span className="text-[10px] font-black text-[#2D8CFF] uppercase tracking-widest">Reaction</span>
      </div>

      <div className="relative">
        {bananas.map(b => (
          <div 
            key={b.id} 
            className="absolute bottom-12 text-4xl animate-banana-pop pointer-events-none" 
            style={{ 
              left: `${b.x}px`,
              transform: `rotate(${b.rotation}deg)`,
              animationDelay: `${b.delay}s`
            }}
          >
            🍌
          </div>
        ))}
        
        <button 
          onClick={addBananas}
          className={`
            w-16 h-16 bg-yellow-400 rounded-full shadow-[0_8px_30px_rgba(251,191,36,0.4)] 
            flex items-center justify-center text-3xl hover:scale-110 active:scale-90 
            transition-all border-4 border-white relative z-10
            ${isPoofing ? 'animate-pulse' : ''}
          `}
          title="Send Banana Reaction!"
        >
          🍌
          {/* Subtle click indicator rings */}
          <div className="absolute inset-0 rounded-full border-2 border-yellow-200 animate-ping opacity-20" />
        </button>
      </div>
      
      <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter opacity-60">Click to Cheer!</p>
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
  const [theme, setTheme] = useState<AppTheme>('modern');
  const [isJurassicLocked, setIsJurassicLocked] = useState(false);
  const [hasTriggeredJurassic, setHasTriggeredJurassic] = useState(false);
  const [stamperForceDismissed, setStamperForceDismissed] = useState(false);
  const [showScrollMonkey, setShowScrollMonkey] = useState(false);

  const isGeekMode = theme === 'classic';
  const isWeatherMode = theme === 'weather';
  const isDisneyMode = theme === 'disney';
  const isZooMode = theme === 'emily-zoo';

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

      // Halfway Scroll Monkey Logic
      if (isZooMode && !showScrollMonkey && scrollPos >= totalHeight / 2) {
        setShowScrollMonkey(true);
        // Hide after animation duration
        setTimeout(() => setShowScrollMonkey(false), 4500);
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
  }, [isGeekMode, isZooMode, hasTriggeredJurassic, showScrollMonkey]);

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
    setStamperForceDismissed(true);
    if (newTheme !== 'classic') setHasTriggeredJurassic(false);
  };

  const toggleThemeMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setThemeMenuOpen(!themeMenuOpen);
    setGeminiMenuOpen(false);
    setStamperForceDismissed(true);
  };

  const toggleAiMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGeminiMenuOpen(!geminiMenuOpen);
    setThemeMenuOpen(false);
    setStamperForceDismissed(true);
  };

  const runGeminiAction = async (action: GeminiAction) => {
    setGeminiMenuOpen(false);
    setIsProcessing(true);
    setActiveAction(action);
    setAiResult(null);
    setStamperForceDismissed(true);
    
    await new Promise(resolve => setTimeout(resolve, 1800));
    try {
      if (action === 'SUMMARIZE') {
        setAiResult({ text: `Welcome to the system architecture of Neil Lock...` });
      } else if (action === 'IMAGE') {
        setAiResult({ imageUrl: "images/gemini_disney.png" });
      } else if (action === 'AUDIO') {
        const audio = new Audio('Life_of_the_Builder.mp3');
        audio.preload = 'auto';
        const playAudio = () => {
          audio.play().catch(e => console.warn("Audio blocked:", e));
        };
        if (audio.readyState >= 2) playAudio();
        else audio.addEventListener('canplaythrough', playAudio, { once: true });
        setAudioPlayer(audio);
        setAiResult({}); 
      }
    } catch (err) {
      console.error("Gemini Action Failed:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const navLinks = isZooMode ? [
    { id: 'career', label: 'Join a Jungle', hoverId: 'NAV_CAREER' },
    { id: 'endurance', label: 'Monitor Habitat', hoverId: 'NAV_DASHBOARD' },
    { id: 'life', label: 'Wildlife Gallery', hoverId: 'NAV_LIFE' },
    { id: 'readme', label: 'Survival Guide', hoverId: 'NAV_README' },
    { id: 'contact', label: 'Host a Habitat', hoverId: 'NAV_API' },
  ] : [
    { id: 'career', label: 'Career', hoverId: 'NAV_CAREER' },
    { id: 'endurance', label: 'Dashboard', hoverId: 'NAV_DASHBOARD' },
    { id: 'life', label: 'Life', hoverId: 'NAV_LIFE' },
    { id: 'readme', label: 'Readme', hoverId: 'NAV_README' },
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
      ${isZooMode ? 'zoo-mode bg-[#F4F4F7] text-slate-800' : ''}
      ${theme === 'modern' ? 'dot-grid bg-white text-black' : ''}`}>
      
      {!stamperForceDismissed && (
        <div className="transition-opacity duration-300">
           <ThemeStamper onApplyWeather={() => handleThemeSelect('weather')} />
        </div>
      )}

      {isDisneyMode && <MagicWandTrail />}
      {isZooMode && <EmilyZooAnimals />}
      {isZooMode && <BananaReaction />}
      {isZooMode && <ScrollingMonkey active={showScrollMonkey} />}

      {isWeatherMode && (
        <div className="rain-container pointer-events-none fixed inset-0 z-0">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="rain-drop" style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }} />
          ))}
        </div>
      )}

      <nav className={`fixed top-0 left-0 right-0 h-20 border-b z-[1000] backdrop-blur-md shadow-sm transition-all duration-500 
        ${isGeekMode ? 'bg-black border-green-500/30' : ''} 
        ${isWeatherMode ? 'bg-slate-900/80 border-slate-700/50' : ''}
        ${isDisneyMode ? 'bg-indigo-900/80 border-indigo-400/30 shadow-[0_4px_30_rgba(253,224,71,0.2)]' : ''}
        ${isZooMode ? 'bg-white border-slate-200 shadow-md px-10' : ''}
        ${theme === 'modern' ? 'bg-white/95 border-slate-200' : ''}`}>
        <div className="flex h-full items-center px-6 justify-between max-w-7xl mx-auto font-mono text-xs uppercase tracking-widest text-slate-500">
          <div className="flex items-center gap-6">
            <a href="#" onClick={scrollToTop} className={`font-bold transition-colors 
              ${isGeekMode ? 'text-green-400 text-sm tracking-tighter' : ''} 
              ${isDisneyMode ? 'text-yellow-400 disney-font text-lg' : ''}
              ${isZooMode ? 'text-[#2D8CFF] text-2xl font-black lowercase italic !font-sans flex items-center gap-2' : 'text-sm tracking-tighter font-bold'}
              ${theme === 'modern' ? 'text-black hover:text-blue-600' : ''}`}>
                {isZooMode && <span className="bg-[#2D8CFF] text-white p-1 rounded-lg not-italic">Zoo</span>}
                {isZooMode ? 'm' : 'neillock.co.uk'}
              </a>
          </div>
          <div className="flex items-center h-full gap-4">
            <div className="hidden md:flex h-full items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.id} href={`#${link.id}`} className={`transition-all 
                  ${activeSection === link.id ? 
                    (isGeekMode ? 'text-green-400 font-bold' : isZooMode ? 'text-[#2D8CFF] font-bold border-b-4 border-[#2D8CFF] pb-1' : 'text-blue-600 font-bold') : 
                    (isGeekMode ? 'text-green-800 hover:text-green-400' : isZooMode ? 'text-slate-500 hover:text-[#2D8CFF]' : 'text-slate-500 hover:text-black')}`} onMouseEnter={() => handleHover(link.hoverId)}>
                  {link.label}
                </a>
              ))}
            </div>
            {isZooMode && (
              <button className="bg-[#2D8CFF] text-white px-5 py-2 rounded-full font-bold text-sm hidden lg:block hover:bg-blue-600 transition-colors">
                Sign Up Free
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-12 transition-all relative z-10">
        <TerminalHero onHover={handleHover} />
        <div id="career" className="pt-8 md:pt-12 scroll-mt-20"><CareerDiagram onHover={handleHover} isZooMode={isZooMode} /></div>
        <div id="endurance" className="pt-8 md:pt-12 scroll-mt-20"><EnduranceDashboard onHover={handleHover} /></div>
        <div id="life" className="pt-8 md:pt-12 scroll-mt-20"><LifeBoard onHover={handleHover} /></div>
        <div id="readme" className="pt-8 md:pt-12 scroll-mt-20"><ReadmeSection onHover={handleHover} /></div>
        <div id="contact" className="pt-8 md:pt-12 scroll-mt-20"><ContactJSON onHover={handleHover} /></div>
      </main>

      <footer className={`fixed bottom-0 left-0 right-0 h-12 flex items-center px-4 md:px-6 font-mono text-[11px] z-[1500] border-t transition-all duration-500 
        ${isZooMode ? 'bg-[#1C1C1E] text-white border-transparent' : 'bg-black text-white border-white/5'}`}>
        <div className="flex items-center justify-between w-full h-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2 cursor-pointer h-full px-2 hover:bg-white/5 transition-colors" onClick={() => setIsYamlOpen(true)}>
            <span className="text-blue-500 animate-pulse">●</span>
            <span className="font-bold tracking-widest uppercase">System Protocol <span className="inline-block animate-wrench-spin">🔧</span></span>
          </div>

          <div className="flex items-center gap-3">
            {/* AI MODE BUTTON */}
            <div className="relative h-full flex items-center">
              <div className={`absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[280px] max-w-[90vw] border rounded-2xl shadow-2xl p-2 z-[1600] transition-all duration-500 transform origin-bottom ${geminiMenuOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-12 scale-90 pointer-events-none'} 
                ${isGeekMode ? 'bg-black border-green-500' : isZooMode ? 'bg-[#242426] border-slate-700' : 'bg-slate-900 border-blue-500'}`}>
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest border-b border-white/5 mb-1 text-blue-400 text-center">Gemini Intelligence HUD</div>
                {['SUMMARIZE', 'AUDIO', 'IMAGE'].map(id => (
                  <button key={id} onClick={() => runGeminiAction(id as GeminiAction)} className="w-full text-left px-3 py-2.5 text-[11px] rounded-lg text-slate-300 hover:bg-white/5 flex items-center gap-3 transition-colors">
                    {id === 'SUMMARIZE' ? '✨ Summarise Session' : id === 'AUDIO' ? '🎧 Voice Protocol' : '🍌 Generate Banana Visual'}
                  </button>
                ))}
                {/* Connector Triangle */}
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-r border-b z-[-1] ${isGeekMode ? 'bg-black border-green-500' : isZooMode ? 'bg-[#242426] border-slate-700' : 'bg-slate-900 border-blue-500'}`} />
              </div>
              
              <button 
                onClick={toggleAiMenu}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all border
                  ${geminiMenuOpen ? (isGeekMode ? 'bg-green-900 border-green-400 text-green-200' : 'bg-blue-600 border-blue-400 text-white') : 
                                  (isGeekMode ? 'bg-black border-green-800 text-green-800 hover:border-green-400' : isZooMode ? 'bg-transparent border-slate-700 text-blue-400 hover:border-[#2D8CFF]' : 'bg-slate-900 border-white/10 text-blue-400 hover:border-blue-500')}`}
              >
                <svg className={`w-3.5 h-3.5 ${geminiMenuOpen ? 'text-white' : 'text-blue-500 animate-pulse'}`} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9L21.5 11.5L14.5 14L12 21L9.5 14L2.5 11.5L9.5 9L12 2Z" />
                </svg>
                AI Mode
              </button>
            </div>

            {/* THEME SELECTOR BUTTON */}
            <div className="relative h-full flex items-center">
              <div className={`absolute bottom-[calc(100%+12px)] right-0 w-[280px] max-w-[90vw] border rounded-2xl shadow-2xl p-2 z-[1600] transition-all duration-500 transform origin-bottom-right ${themeMenuOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-12 scale-90 pointer-events-none'} 
                ${isGeekMode ? 'bg-black border-green-500' : isZooMode ? 'bg-[#242426] border-slate-700' : 'bg-slate-900 border-blue-500'}`}>
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest border-b border-white/5 mb-1 text-slate-400 text-center">Visual Engine Selector</div>
                {[
                  { id: 'modern', label: '✨ Modern Mode' },
                  { id: 'classic', label: '🦖 Classic Mode' },
                  { id: 'weather', label: '🌧️ Rubbish Weather' },
                  { id: 'disney', label: '🏰 Disney Mode' },
                  { id: 'emily-zoo', label: '🦒 Emily\'s Zoo-m Mode' }
                ].map(item => (
                  <button key={item.id} onClick={() => handleThemeSelect(item.id as AppTheme)} className={`w-full text-left px-3 py-2 text-[11px] rounded-lg transition-colors flex justify-between items-center ${theme === item.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                    <span>{item.label}</span>
                    {theme === item.id && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </button>
                ))}
                {/* Connector Triangle */}
                <div className={`absolute -bottom-2 right-8 w-4 h-4 rotate-45 border-r border-b z-[-1] ${isGeekMode ? 'bg-black border-green-500' : isZooMode ? 'bg-[#242426] border-slate-700' : 'bg-slate-900 border-blue-500'}`} />
              </div>
              
              <button onClick={toggleThemeMenu} className={`px-4 py-1.5 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all 
                ${isZooMode ? 'bg-[#2D8CFF] text-white hover:bg-blue-600' : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'}`}>
                {isZooMode ? '🦓 Change Theme' : 'Change Theme'}
              </button>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes wrench-spin { 0% { transform: rotate(0deg); } 10% { transform: rotate(360deg); } 100% { transform: rotate(360deg); } }
        .animate-wrench-spin { animation: wrench-spin 6s ease-in-out infinite; }
        
        .zoo-mode .bg-white, .zoo-mode .bg-slate-50 { 
          background: white !important; border: 1px solid #E2E8F0 !important; border-radius: 1rem !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          transition: all 0.3s ease;
        }
        .zoo-mode .bg-white:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important; border-color: #2D8CFF !important; }
        .zoo-mode h2, .zoo-mode h3 { color: #1C1C1E !important; }
        
        @keyframes banana-pop {
          0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-600px) scale(0) rotate(720deg); opacity: 0; }
        }
        .animate-banana-pop { animation: banana-pop 2s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        
        @keyframes zoo-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-zoo-float { animation: zoo-float 6s ease-in-out infinite; }

        @keyframes monkey-bounce-across {
          0% { transform: translateX(-200px) translateY(0) rotate(0deg); }
          10% { transform: translateX(10vw) translateY(-100px) rotate(20deg); }
          20% { transform: translateX(20vw) translateY(0) rotate(-10deg); }
          30% { transform: translateX(30vw) translateY(-150px) rotate(30deg); }
          40% { transform: translateX(40vw) translateY(0) rotate(-20deg); }
          50% { transform: translateX(50vw) translateY(-100px) rotate(10deg); }
          60% { transform: translateX(60vw) translateY(0) rotate(-30deg); }
          70% { transform: translateX(70vw) translateY(-200px) rotate(40deg); }
          80% { transform: translateX(80vw) translateY(0) rotate(-10deg); }
          90% { transform: translateX(90vw) translateY(-100px) rotate(20deg); }
          100% { transform: translateX(110vw) translateY(0) rotate(0deg); }
        }
        .animate-monkey-bounce-across {
          animation: monkey-bounce-across 4s cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }

        .cursor-magic { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23fde047' stroke='%23000' stroke-width='1'%3E%3Cpath d='M12 2L14.5 9L21.5 11.5L14.5 14L12 21L9.5 14L2.5 11.5L9.5 9L12 2Z'/%3E%3C/svg%3E"), auto; }
      `}</style>
    </div>
  );
};

export default App;
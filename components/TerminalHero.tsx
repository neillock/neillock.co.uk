import React, { useState, useEffect, useRef } from 'react';

const initLogs = [
  "[  OK  ] Initializing Life Support: Respiratory and Circulatory systems online.",
  "[  OK  ] Loading Module: brain.info (Crawling enabled).",
  "[  OK  ] Started Speech Synthesis Engine (Vocalizing: \"Dada\", \"Mama\").",
  "[  OK  ] Reached target: Toddler Growth Phase.",
  "[  OK  ] Mounting Primary Education... Success.",
  "[  OK  ] Detected Hardware: BBC.",
  "[  OK  ] Initializing first_computer.service.",
  "[  OK  ] Loading Environment: learning_to_code.sh",
  "[ INFO ] Executing: PRINT \"HELLO WORLD\"",
  "[  OK  ] Compiling logic: Loops, Variables, and Basic Logic.",
  "[  OK  ] Started Local Web Server (Port 80): Building first_website.html.",
  "[  OK  ] Deployment: GeoCities/Tripod integration complete.",
  "[  OK  ] Loading Financial_Algorithm: MoneySavingExpert (MSE).",
  "[  OK  ] Optimized Scraping: \"Finding the best deals...\"",
  "[  OK  ] Scaling Database: Userbase growing 10k -> 100k.",
  "[ WARN ] CPU usage at 95%: MoneySavingExpert under heavy load.",
  "[ ERROR ] Segfault in core_logic.c: Unexpected traffic spike.",
  "[  OK  ] Getting Married: Joining resources",
  "[ WARN ] Deprecated API: MoneySavingExpert endpoint is deprecated and will be removed on 2012-02-06. Plan to migrate to MoneySupermarket",
  "[ ERROR ] MoneySavingExpert endpoint is deprecated use MoneySuperMarket",
  "[  OK  ] Initializing Child: Emily",
  "[ CRIT ] KERNEL PANIC: System crashing out due to movement.",
  "[  OK  ] Initiating Recovery Mode...",
  "[  OK  ] Debugging: Refactoring mental health and code quality.",
  "[  OK  ] Initiating new features and products with LetsDoThis.com",
  "[  OK  ] Initializing Child: Daisy",
  "[  OK  ] Adding Mountain View Modules",
  "[  WARN  ] YC - Building things that don't scale",
  "[  OK  ] Migrating brain from building on to supporting with AWS.",
  "[  OK  ] Provisioning EC2 Instances: m5.large cluster active.",
  "[  OK  ] Setting up Auto-Scaling Groups (ASG).",
  "[  OK  ] Configuring S3 BWuckets for Global Asset Delivery.",
  "[  OK  ] Deploying Kubernetes (EKS): Containerization successful.",
  "[ ERROR ] 502 Bad Gateway: Improper IAM Role permissions.",
  "[ INFO ] Fixing Error: Re-applying Terraform scripts.",
  "[  OK  ] Scaling infrastructure to 1 million concurrent users.",
  "[  OK  ] Latency reduced to <50ms via CloudFront.",
  "[  OK  ] Incoming Handshake: recruitment_ping (Source: Mountain View).",
  "[  OK  ] Initiating Data Transfer: Moving assets to Google Cloud Platform.",
  "[  OK  ] Initializing Google Workspace Environment.",
  "[  OK  ] Loading BigQuery and Anthos modules.",
  "[  OK  ] Syncing professional_history.db with Google Engineering standards.",
  "[  OK  ] Started Global Search Infrastructure.",
  "[  OK  ] Machine Learning Models training... 50%... 100%.",
  "[  OK  ] Reached Target: Head of Startup engineers @ Google.",
  "[  OK  ] All services operational.",
];

interface Props {
  onHover: (id: string | null) => void;
}

const TerminalHero: React.FC<Props> = ({ onHover }) => {
  const [lastFocused, setLastFocused] = useState<'TERMINAL' | 'BADGE'>('BADGE');
  const [badgePos, setBadgePos] = useState({ x: 0, y: 0 });
  const [isBadgeDragging, setIsBadgeDragging] = useState(false);
  const [badgeDragOffset, setBadgeDragOffset] = useState({ x: 0, y: 0 });
  const [termPos, setTermPos] = useState<{ x: number | null, y: number | null }>({ x: null, y: null });
  const [termSize, setTermSize] = useState({ w: 0, h: 0 }); 
  const [isTermDragging, setIsTermDragging] = useState(false);
  const [isTermResizing, setIsTermResizing] = useState(false);
  const [termDragOffset, setTermDragOffset] = useState({ x: 0, y: 0 });
  const [termResizeStart, setTermResizeStart] = useState({ w: 0, h: 0, x: 0, y: 0 });
  const [containerHeight, setContainerHeight] = useState<number | string>('auto');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [showFinalPrompt, setShowFinalPrompt] = useState(false);
  
  const badgeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  const BADGE_WIDTH = 160;
  const BADGE_HEIGHT = 280;

  const isZooMode = document.body.classList.contains('zoo-mode');

  const resetToInitialLayout = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const terminalWidth = Math.min(containerWidth - 48, 920); 
      
      const initialBadgeX = terminalWidth - (BADGE_WIDTH * 0.7); 
      const initialBadgeY = 0; 
      
      setBadgePos({ x: Math.max(10, initialBadgeX), y: initialBadgeY });
      setTermPos({ x: null, y: null });
      setTermSize({ w: 0, h: 0 });
      setLastFocused('BADGE');
    }
  };

  useEffect(() => {
    resetToInitialLayout();
    window.addEventListener('resize', resetToInitialLayout);
    return () => window.removeEventListener('resize', resetToInitialLayout);
  }, []);

  useEffect(() => {
    let timeoutId: number;
    if (isFullScreen) {
      setDisplayedLogs([]);
      setShowFinalPrompt(false);
      let currentIdx = 0;
      const addNextLog = () => {
        if (currentIdx < initLogs.length) {
          const nextLog = initLogs[currentIdx];
          if (nextLog) setDisplayedLogs(prev => [...prev, nextLog]);
          currentIdx++;
          timeoutId = window.setTimeout(addNextLog, Math.random() * 80 + 10);
        } else {
          setShowFinalPrompt(true);
        }
      };
      timeoutId = window.setTimeout(addNextLog, 400);
    } else {
      setDisplayedLogs([]);
      setShowFinalPrompt(false);
    }
    return () => clearTimeout(timeoutId);
  }, [isFullScreen]);

  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [displayedLogs, showFinalPrompt]);

  const onBadgeMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setLastFocused('BADGE');
    if (badgeRef.current) {
      const rect = badgeRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
      setBadgeDragOffset({ x: clientX - rect.left, y: clientY - rect.top });
      setIsBadgeDragging(true);
      if ('preventDefault' in e) (e as any).preventDefault();
    }
  };

  const onTermMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setLastFocused('TERMINAL');
    if (terminalRef.current && containerRef.current && !isFullScreen) {
      const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
      const containerRect = containerRef.current.getBoundingClientRect();
      const terminalRect = terminalRef.current.getBoundingClientRect();
      if (containerHeight === 'auto') setContainerHeight(terminalRect.height);
      const currentRelX = terminalRect.left - containerRect.left;
      const currentRelY = terminalRect.top - containerRect.top;
      setTermPos({ x: currentRelX, y: currentRelY });
      if (termSize.w === 0) setTermSize({ w: terminalRect.width, h: terminalRect.height });
      setTermDragOffset({ x: clientX - currentRelX, y: clientY - currentRelY });
      setIsTermDragging(true);
    }
  };

  const onResizeMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setLastFocused('TERMINAL');
    if (terminalRef.current && !isFullScreen) {
      e.stopPropagation();
      const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
      const clientY = 'touches' in e ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
      setTermResizeStart({ w: terminalRef.current.offsetWidth, h: terminalRef.current.offsetHeight, x: clientX, y: clientY });
      setIsTermResizing(true);
      if ('preventDefault' in e) (e as any).preventDefault();
    }
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

      if (isBadgeDragging && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rawX = clientX - containerRect.left - badgeDragOffset.x;
        const rawY = clientY - containerRect.top - badgeDragOffset.y;
        setBadgePos({ 
          x: Math.max(-50, Math.min(containerRect.width - (BADGE_WIDTH * 0.3), rawX)), 
          y: Math.max(-100, Math.min(containerRect.height - 100, rawY)) 
        });
      }

      if (isTermDragging && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        setTermPos({ x: clientX - termDragOffset.x, y: Math.max(80 - containerRect.top, clientY - termDragOffset.y) });
      }

      if (isTermResizing) {
        setTermSize({
          w: Math.min(containerRef.current?.offsetWidth || window.innerWidth, Math.max(300, termResizeStart.w + (clientX - termResizeStart.x))),
          h: Math.min(800, Math.max(isMinimized ? 32 : 100, termResizeStart.h + (clientY - termResizeStart.y)))
        });
      }
    };

    const onUp = () => { setIsBadgeDragging(false); setIsTermDragging(false); setIsTermResizing(false); };
    if (isBadgeDragging || isTermDragging || isTermResizing) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onUp);
    };
  }, [isBadgeDragging, isTermDragging, isTermResizing, badgeDragOffset, termDragOffset, termResizeStart, isMinimized]);

  const terminalStyle: React.CSSProperties = isFullScreen 
    ? { position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 4000 } 
    : {
        position: termPos.x !== null ? 'absolute' : 'relative',
        left: termPos.x !== null ? `${termPos.x}px` : undefined,
        top: termPos.y !== null ? `${termPos.y}px` : undefined,
        width: termSize.w !== 0 ? `${termSize.w}px` : undefined, 
        height: isMinimized ? '32px' : (termSize.h !== 0 ? `${termSize.h}px` : 'auto'),
        transition: isTermDragging || isTermResizing ? 'none' : 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
        zIndex: isTermDragging || isTermResizing ? 9999 : (lastFocused === 'TERMINAL' ? 150 : (termPos.x !== null ? 100 : 10)),
      };

  const badgeStyle: React.CSSProperties = {
    left: `${badgePos.x}px`,
    top: `${badgePos.y}px`,
    zIndex: isBadgeDragging ? 9999 : (lastFocused === 'BADGE' ? 150 : 100),
    transition: isBadgeDragging ? 'none' : 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
  };

  if (isZooMode) {
    return (
      <section className="mb-20">
        <div className="bg-slate-900 rounded-3xl overflow-hidden border-8 border-slate-800 shadow-2xl aspect-video md:aspect-[21/9] flex flex-col">
          <div className="p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center px-8">
            <div className="flex items-center gap-3">
              <span className="text-[#2D8CFF] font-black italic">Zoo-m</span>
              <span className="text-white font-bold text-sm">Meeting with Neil Lock</span>
            </div>
            <div className="flex items-center gap-4 text-slate-300 font-mono text-xs">
              <span>REC 🔴</span>
              <span>12:34 PM</span>
            </div>
          </div>
          
          <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-2 p-2 bg-[#1C1C1E]">
            {/* Participant 1: Red Panda */}
            <div className="bg-[#2C2C2E] rounded-xl relative overflow-hidden flex items-center justify-center border-2 border-transparent hover:border-[#2D8CFF] transition-all group">
              <span className="text-6xl group-hover:scale-110 transition-transform">🐼</span>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 text-white text-[10px] rounded backdrop-blur-md">
                Red Panda (Co-Host)
              </div>
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-[#2C2C2E]" />
            </div>

            {/* Participant 2: Monkey */}
            <div className="bg-[#2C2C2E] rounded-xl relative overflow-hidden flex items-center justify-center border-2 border-[#2D8CFF] shadow-[0_0_15px_rgba(45,140,255,0.4)] group">
              <span className="text-6xl group-hover:scale-110 transition-transform">🐒</span>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 text-white text-[10px] rounded backdrop-blur-md">
                Monkey (Active Speaker)
              </div>
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-green-500 border-2 border-[#2C2C2E]" />
            </div>

            {/* Participant 3: Neil */}
            <div className="bg-[#2C2C2E] rounded-xl relative overflow-hidden flex items-center justify-center border-2 border-transparent hover:border-[#2D8CFF] transition-all group">
              <img src="images/me.jpg" alt="Neil" className="w-full h-full object-cover opacity-80" onError={e => e.currentTarget.src='https://picsum.photos/200'} />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 text-white text-[10px] rounded backdrop-blur-md">
                Neil Lock (Host)
              </div>
            </div>

            {/* Participant 4: Capybara (Waiting Room) */}
            <div className="bg-[#2C2C2E] rounded-xl relative overflow-hidden flex items-center justify-center border-2 border-transparent hover:border-[#2D8CFF] transition-all group">
              <div className="flex flex-col items-center gap-2">
                <span className="text-6xl animate-bounce">🦦</span>
                <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest">In Waiting Room</span>
              </div>
              <div className="absolute inset-0 bg-blue-500/10 opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 text-white text-[10px] rounded backdrop-blur-md">
                Zen Capybara
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-800 flex justify-center gap-6">
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-10 h-10 rounded-xl bg-[#3C3C3E] flex items-center justify-center group-hover:bg-[#4C4C4E] transition-colors">
                🔇
              </div>
              <span className="text-[9px] text-slate-400 uppercase font-bold">Mute</span>
            </button>
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-10 h-10 rounded-xl bg-[#3C3C3E] flex items-center justify-center group-hover:bg-[#4C4C4E] transition-colors">
                🎥
              </div>
              <span className="text-[9px] text-slate-400 uppercase font-bold">Stop Video</span>
            </button>
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center hover:bg-green-500 transition-colors">
                🐒
              </div>
              <span className="text-[9px] text-slate-400 uppercase font-bold">Share Screen</span>
            </button>
            <button className="flex flex-col items-center gap-1 group">
              <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center hover:bg-red-500 transition-colors">
                🚪
              </div>
              <span className="text-[9px] text-slate-400 uppercase font-bold">Leave</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} style={{ height: containerHeight }} className={`relative min-h-[140px] mb-0 pb-0 ${isFullScreen || isTermDragging || isTermResizing || isBadgeDragging ? 'z-[4000]' : 'z-10'}`} onMouseEnter={() => onHover('HERO_SECTION')} onMouseLeave={() => onHover(null)}>
      {isVisible ? (
        <div 
          ref={terminalRef} 
          style={terminalStyle} 
          onClick={() => isFullScreen && (setIsFullScreen(false), resetToInitialLayout())} 
          className={`border border-slate-200 shadow-2xl overflow-hidden flex flex-col ${isFullScreen ? 'rounded-none bg-slate-950 text-slate-100' : 'rounded-lg bg-white/95 shadow-inner backdrop-blur-md'} ${termSize.w === 0 && !isFullScreen ? 'w-full lg:w-[calc(100%-48px)]' : ''}`}
        >
          <div onMouseDown={onTermMouseDown} onTouchStart={onTermMouseDown} onClick={() => isMinimized && setIsMinimized(false)} className={`${isFullScreen ? 'bg-slate-900 border-slate-800' : 'bg-[#f8fafc] border-slate-200'} px-6 py-2 border-b flex items-center gap-4 select-none shrink-0 cursor-move z-50`}>
            <div className="flex gap-2">
              <button onClick={(e) => { e.stopPropagation(); setIsVisible(false); setTimeout(() => { setIsVisible(true); resetToInitialLayout(); }, 1500); }} onMouseDown={e => e.stopPropagation()} className="w-3 h-3 rounded-full bg-[#ff5f57] border border-black/5" />
              <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); isFullScreen && setIsFullScreen(false); }} onMouseDown={e => e.stopPropagation()} className="w-3 h-3 rounded-full bg-[#febc2e] border border-black/5" />
              <button onClick={(e) => { e.stopPropagation(); setIsFullScreen(!isFullScreen); isMinimized && setIsMinimized(false); !isFullScreen && resetToInitialLayout(); }} onMouseDown={e => e.stopPropagation()} className="w-3 h-3 rounded-full bg-[#28c840] border border-black/5" />
            </div>
            <span className="text-[10px] font-mono text-slate-400 flex-grow text-center uppercase opacity-80 pointer-events-none whitespace-nowrap overflow-hidden">neil@neil-macbookpro:~ {isMinimized ? '[MINIMIZED]' : ''}</span>
          </div>
          
          <div className={`flex-grow p-6 md:p-8 lg:p-10 font-mono relative transition-all duration-300 ${isMinimized ? 'opacity-0 h-0 pointer-events-none' : 'opacity-100'} ${isFullScreen ? 'h-[calc(100%-32px)] overflow-hidden flex flex-col bg-slate-950' : 'bg-transparent border-t border-white/20'}`}>
            <div className={`mx-auto w-full ${isFullScreen ? 'max-w-7xl h-full flex flex-col' : ''}`}>
              <div className={`${isFullScreen ? 'mb-4' : 'mb-8 lg:pr-40'}`}>
                <h1 className={`font-bold tracking-tight leading-none ${isFullScreen ? 'text-xl md:text-2xl' : 'text-xl md:text-2xl lg:text-3xl'} ${isFullScreen ? '' : 'cursor-blink'}`}>
                  <span className="text-blue-500 font-bold mr-4 inline-block drop-shadow-sm">~</span>
                  <span className={isFullScreen ? 'text-white' : 'text-slate-900'}>sudo init --human neil-lock</span>
                </h1>
              </div>
              
              {!isFullScreen && (
                <div className="relative lg:pr-40">
                  <p className="text-sm md:text-base lg:text-lg text-[#475569] max-w-[1000px] leading-relaxed font-medium">
                    Head of Startup Engineering @ Google. 20 years of building systems. Currently orchestrating <span className="text-blue-600 font-bold drop-shadow-none">Gemini-powered Agents</span> and scaling high-availability human/AI infrastructure. Previously built, <span className="text-[#334155] italic">from scratch</span>, <span className="text-[#0f172a] font-bold">MoneySavingExpert.com</span> and co-founder/CTO of <span className="text-[#0f172a] font-bold">LetsDoThis.com</span>
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4 items-center">
                    <div className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-mono uppercase font-bold tracking-wider">Role: Leader</div>
                    <div className="px-3 py-1 bg-[#0f172a] text-blue-400 text-[10px] font-mono uppercase font-bold tracking-wider">Kernel: Gemini 3 Pro</div>
                    <div className="px-3 py-1 bg-green-50 border border-green-200 text-green-600 text-[10px] font-mono uppercase font-bold tracking-wider">Status: Updating</div>
                  </div>
                </div>
              )}

              {isFullScreen && (
                <div className="flex-grow overflow-y-auto custom-scrollbar mt-2 text-[10px] md:text-xs pb-10">
                  {displayedLogs.map((log, idx) => {
                    const colorClass = log.includes("[  OK  ]") ? "text-green-500" : log.includes("[ INFO ]") ? "text-blue-400" : log.includes("[ WARN ]") ? "text-yellow-500" : log.includes("[ ERROR ]") ? "text-red-500" : log.includes("[ CRIT ]") ? "text-red-600 font-bold animate-pulse" : "text-slate-400";
                    const parts = log.split(']');
                    return (<div key={idx} className="mb-1 flex gap-3"><span className={`${colorClass} whitespace-nowrap`}>{parts[0]}]</span><span className="text-slate-300">{parts.slice(1).join(']')}</span></div>);
                  })}
                  {showFinalPrompt && <div className="mt-4"><span className="text-slate-300">neil@neil-macbookpro:~ $ </span><span className="cursor-blink" /></div>}
                  <div ref={logEndRef} />
                </div>
              )}
            </div>
          </div>

          {!isFullScreen && <div onMouseDown={onResizeMouseDown} onTouchStart={onResizeMouseDown} className="absolute bottom-0 right-0 w-6 h-6 cursor-nwse-resize group flex items-end justify-end p-1 z-50"><div className="w-2.5 h-2.5 border-r-2 border-b-2 border-slate-300 group-hover:border-blue-400 transition-colors" /></div>}
        </div>
      ) : <div className="h-32 flex items-center justify-center font-mono text-slate-400 border border-dashed border-slate-200 rounded-lg"><span className="animate-pulse uppercase tracking-widest text-[10px]">RELOADING_SYSTEM_TERMINAL...</span></div>}

      <div ref={badgeRef} className={`${isFullScreen ? 'hidden' : 'hidden lg:block'} absolute select-none [perspective:1000px] group ${isBadgeDragging ? 'cursor-grabbing' : 'cursor-grab'}`} style={badgeStyle} onMouseDown={onBadgeMouseDown} onTouchStart={onBadgeMouseDown} onMouseEnter={() => onHover('OPERATOR_WORK_PASS')} onMouseLeave={() => onHover(null)}>
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-800 rounded-full border-4 border-slate-300 shadow-lg z-0 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-slate-600 rounded-full" /></div>
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-slate-400/20 backdrop-blur-sm rounded-sm z-0" />
        
        <div className={`w-40 h-56 relative transition-transform duration-700 [transform-style:preserve-3d] ${!isBadgeDragging ? 'group-hover:[transform:rotateY(180deg)]' : ''}`}>
          <div className="absolute inset-0 w-full h-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden [backface-visibility:hidden] flex flex-col items-center pt-4 pb-3 px-3 text-center badge-disney-mask">
            <div className="absolute top-0 left-0 right-0 h-1 flex"><div className="flex-1 bg-[#4285F4]" /><div className="flex-1 bg-[#EA4335]" /><div className="flex-1 bg-[#FBBC05]" /><div className="flex-1 bg-[#34A853]" /></div>
            
            {/* Mickey Ears for the Badge in Disney Mode */}
            <div className="disney-ears-badge absolute -top-4 left-1/2 -translate-x-1/2 w-full h-8 pointer-events-none opacity-0 group-[.disney-mode]:opacity-100 transition-opacity">
               <div className="absolute left-6 top-0 w-8 h-8 bg-indigo-900 border-2 border-white rounded-full shadow-lg" />
               <div className="absolute right-6 top-0 w-8 h-8 bg-indigo-900 border-2 border-white rounded-full shadow-lg" />
            </div>

            <div className="mb-2"><h4 className="text-base font-bold tracking-tight text-slate-800 group-[.disney-mode]:disney-font group-[.disney-mode]:text-lg">Neil Lock</h4></div>
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full border-[4px] border-slate-50 overflow-hidden shadow-inner bg-slate-100">
                <img src="images/me.jpg" alt="Neil Lock" className="w-full h-full object-cover transition-all duration-500 scale-110" onError={(e) => { e.currentTarget.src = "https://picsum.photos/seed/neil/200/200"; }} />
              </div>
              <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-md animate-pulse" />
            </div>
            <div className="w-full flex justify-between items-end mt-auto px-1">
               <div className="bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-[7px] font-mono font-bold text-slate-500 uppercase tracking-tighter group-[.disney-mode]:bg-yellow-100 group-[.disney-mode]:text-indigo-900">Head of Startups</div>
               <div className="opacity-80 scale-90">
                  <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
               </div>
            </div>
          </div>
          <div className="absolute inset-0 w-full h-full bg-slate-950 rounded-xl shadow-2xl border border-white/5 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center p-4 text-center group-[.disney-mode]:bg-indigo-900">
            <div className="mb-4">
               {/* Mickey Ears overlay on GCP logo in Disney mode */}
               <div className="relative">
                  <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full opacity-0 group-[.disney-mode]:opacity-100" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full opacity-0 group-[.disney-mode]:opacity-100" />
                  <img src="https://www.gstatic.com/images/branding/product/2x/google_cloud_64dp.png" alt="Google Cloud" className="w-12 h-12 object-contain relative z-10" />
               </div>
            </div>
            <div className="space-y-2">
              <div><p className="text-[8px] font-mono text-blue-400 uppercase tracking-widest mb-1 group-[.disney-mode]:text-yellow-400">CURRENT ROLE</p><h5 className="text-white text-[11px] font-bold leading-tight tracking-tight group-[.disney-mode]:disney-font group-[.disney-mode]:text-sm">Head of Startup Engineers<br/>@ Google Cloud</h5></div>
              <div className="pt-2 border-t border-white/10"><p className="text-slate-300 text-[8px] leading-relaxed italic opacity-80 group-[.disney-mode]:text-white">Helping founders build with Google Tech!</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalHero;
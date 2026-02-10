import React, { useState, useRef, useEffect } from 'react';

interface File {
  id: string;
  name: string;
  icon: 'markdown' | 'shell' | 'log';
  content: string;
  summary: string;
}

const files: File[] = [
   {
    id: 'vacation',
    name: 'OperationalContract.md',
    icon: 'markdown',
    content: `# 🛡️ PERSONAL OPERATING MODEL

## THE NORTH STAR
"Everything for Laura, Emily, and Daisy."
Life is short and it isn't always fair. My parents didn't get to see this chapter - I am the bridge to their legacy. Make every second count. Enjoy it. Have as much fun as possible.

---------

## I. THE CORE TENETS
* Integrity is the only currency. Say it, do it, prove it.
* Make things people actually want. Solve real problems.
* No excuses. If it’s in my orbit, I own the outcome.
* Don’t stop when you’re tired. Stop when you’re done.

---------

## II. GROWTH & GRIT
Reject Comfort: You are in danger of living a life so soft you never realize your potential.
Mental Toughness: Gained only by doing the things you aren't happy doing.
Always Learning: Stay curious, try new things, and keep the "Disney" sense of fun alive.
Perspective: It’s not all sunshine and rainbows. Acknowledge the "cr*p" then get back to work.

---------

## III. THE DAILY GUTS
- If it were easy, everyone would do it.
- Don't assume everything is good—verify and lead.
- Work hard, play harder, and cherish the holidays.
- Make things people want

---------

## "Stop when you're done."`,
    summary: "This operating model is a high octane blend of relentless execution and profound personal perspective, driven by the memory of what was lost and the duty to what remains. It is anchored by the \"North Star\" of providing for Laura, Emily, and Daisy, transforming the pain of losing your parents young into a visceral urgency to maximize every moment. You operate with an Amazonian rigor—earning trust, obsessing over value, and refusing to stop until results are delivered—while maintaining a defiant growth mindset that rejects comfort in favor of mental toughness. By acknowledging that life isn't always \"sunshine and rainbows,\" you lead with a grounded authenticity that prioritizes what is real over what is easy, ensuring that every effort honors your legacy and builds a future defined by magic, learning, and grit."
  },
 {
    id: 'disney',
    name: 'Disney.md',
    icon: 'markdown',
    content: `# 🏰₊˚⊹♡ Disney Dad
I’m trading  my salary for a kingdom of dreams, mostly because my two daughters have decreed that I am the official Royal Snack Bearer. \"Adventure is out there!\" and usually, it involves me navigating a sea of bubbles while rocking a matching family t-shirt like it's high performance armour. We don't need space battles when we have the high-stakes drama of meeting a mermaid before bedtime. 

Our fate lives within us and currently, my fate is being the guy in the photo who knows all the tunes to every disney song! I might skip the princess dress , but I’ll wear the matching \"Best Day Ever\" shirt with pride because seeing their faces light up is my ultimate "core memory." While other dads are checking the score, I’m checking the app with my wife Laura to make sure my two princesses get their frontrow seat for the fireworks.
 
I’ve basically become a real life Maui, except my \"hook\" is just a backpack stuffed with snacks, Mickey Ears, sunblock, and enough magic wands to power a small city. "Just keep swimming" is the only way to survive the gift shop with two girls who have big dreams and even bigger imaginations. It’s a chaotic, glittery world, but as long as I’m the guy they’re holding onto, I’m the luckiest man in the park.

\"You've got a friend in me,\" and there’s nothing more manly than being the rock your daughters lean on when they’re tired from a day of chasing dreams. I’ve learned that a dad’s true superpower isn't strength or speed, it’s the ability to find a route from the front gate to It's A Small World in three minutes flat while humming a Pixar tune. Who needs a galaxy far, far away when I’ve got everything I need right here in this kingdom of girl dad chaos?`,

  summary: "Being a Disney dad to two young dreamers is about embracing the \"adventure is out there\" spirit. Trading space battles for matching family tees and bubble wants, you’re the \"un poco loco\" hero building core memories. It’s not about the gear—it’s about being the rock for your princesses in a glittery, Pixar fueled world."
  },
 {
    id: 'sports',
    name: 'sports.md',
    icon: 'markdown',
    content: `# 🏃‍➡️ Stupid Sports
I’ve realized there’s something pretty satisfying about being the "square peg" in a world of round holes. Most people who look the part of an athlete seem to have it a bit easier—their bodies just sort of cooperate with the task at hand. But when I’m out there grinding through marathons or huge open water swims without the "ideal" build, I feel like I’m running on manual transmission while everyone else is on cruise control. For me, it’s never been about the aesthetics of the sport; it’s just about that weird, internal itch to see if I can actually pull it off.

Rowing feels like a hilarious choice for my next move because it’s famously the sport of "giants with long levers." Choosing to hop in a boat when I don’t fit the prototype feels like the ultimate power move. It turns the whole thing into a massive mental game where I’m not just rowing—I’m basically out stubborning the water. I’ve traded the high impact pounding of the pavement for the rhythmic, lung burning torture of the erg, which feels like a classic evolution for someone who loves a challenge but absolutely hates being bored.

At the end of the day, I think being "unnatural" at sports is actually my secret weapon. I don’t have the ego of someone who was born fast; I just have the habit of showing up and refusing to be the first one to blink. It’s a scrappy way to live, and it makes the finish line taste a lot better knowing I had to work twice as hard just to get an invite to the party.`
,  summary: "I’m a self made athlete who thrives on \"stupid\" challenges. Without a natural physique, I rely on pure stubbornness to conquer marathons, swims, and now rowing—proving grit beats genetics every time."
  },
  {
    id: 'books',
    name: 'Book.log',
    icon: 'log',
    content: `[READING_LIST]
- Status: ACTIVE | Title: "Story teller" by Dave Grohl
- Status: ARCHIVED | Title: "Atomic Habits" by James Clear
- Status: ARCHIVED | Title: "The Hard Thing About Hard Things" by Ben Horowitz
- Status: QUEUED | Title: "generations" by Jean Twenge
- Status: ARCHIVED | Title: "The Pragmatic Programmer"
- Status: ARCHIVED | Title: "The Culture Map"
- Status: ACTIVE | Title: "Can't Hurt Me" by David Goggins

[INSIGHT]
Management is the act of increasing the leverage of the team's output. Every engineer should read Grove like it's their documentation.`,
    summary: "My continuous learning stack balances management strategy with technical discipline and mental toughness. Influenced heavily by  David Goggins' resilience, I view professional development as a systematic upgrade to my leadership kernel. Current focus is on increasing team leverage and mental endurance."
  },
];

interface Props {
  onHover: (id: string | null) => void;
}

const ReadmeSection: React.FC<Props> = ({ onHover }) => {
  const [activeFileId, setActiveFileId] = useState('vacation');
  const [isSummarized, setIsSummarized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showGeminiWidget, setShowGeminiWidget] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const activeFile = files.find(f => f.id === activeFileId) || files[0];

  const checkScroll = () => {
    if (tabContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < (scrollWidth - clientWidth - 10));
    }
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(checkScroll, 100);
    return () => clearTimeout(timer);
  }, [activeFileId]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabContainerRef.current) {
      const scrollAmount = 200;
      tabContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSummarize = () => {
    if (isSummarized) {
      setIsSummarized(false);
      setShowGeminiWidget(false);
      return;
    }
    setIsLoading(true);
    setShowGeminiWidget(false);
    // Simulate Gemini inference delay
    setTimeout(() => {
      setIsSummarized(true);
      setIsLoading(false);
    }, 1200);
  };

  const currentDisplayContent = (isSummarized ? activeFile.summary : activeFile.content) || '';
  const lineCount = currentDisplayContent.split('\n').length;
  const lines = Array.from({ length: Math.max(lineCount, 22) }, (_, i) => i + 1);

  return (
    <section className="w-full py-6 md:py-8">
      <div className="mb-6">
        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 mb-2">/workspace/operating_system</h2>
        <h3 className="text-3xl font-bold">IDE: Internal reasoning</h3>
      </div>

      <div 
        className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex h-[600px] font-mono text-sm text-[#d4d4d4]"
        onMouseEnter={() => onHover('README_IDE')}
        onMouseLeave={() => onHover(null)}
      >
        {/* Desktop Sidebar (Left Explorer) */}
        <div className="w-60 bg-[#252526] border-r border-[#333] flex flex-col shrink-0 overflow-hidden hidden md:flex">
          <div className="px-4 py-3 text-[10px] text-slate-500 uppercase tracking-widest border-b border-[#333] flex justify-between items-center bg-[#2d2d2d]">
            <span>Explorer</span>
            <span className="opacity-50">...</span>
          </div>
          
          <div className="p-2 space-y-1 overflow-y-auto flex-grow">
            <div className="flex items-center gap-2 px-2 py-1 text-slate-400 hover:text-white cursor-pointer group">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
              <span className="font-bold text-xs uppercase tracking-tight">NeilLock.co.uk</span>
            </div>
            <div className="pl-4 space-y-0.5">
              {files.map(file => (
                <div 
                  key={file.id}
                  onClick={() => {
                    setActiveFileId(file.id);
                    setIsSummarized(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-sm cursor-pointer transition-colors ${activeFileId === file.id ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e] text-slate-400 hover:text-slate-200'}`}
                >
                  {file.icon === 'markdown' && <span className="text-blue-400 text-[10px] font-bold">M↓</span>}
                  {file.icon === 'log' && <span className="text-yellow-500 text-[10px] font-bold">LOG</span>}
                  <span className="truncate text-[11px]">{file.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto p-4 border-t border-[#333] text-[9px] text-slate-600">
            IDE_STATUS: STABLE
          </div>
        </div>

        <div className="flex-grow flex flex-col relative bg-[#1e1e1e] min-w-0">
          {/* Top Tabs with Interactive Triangle Scroll Controls - Removed overflow-hidden to allow dropdown visibility */}
          <div className="h-10 bg-[#2d2d2d] flex items-center border-b border-[#111] relative">
            
            {/* Scroll Left Indicator */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center bg-[#2d2d2d] border-r border-[#3c3c3c] px-1">
                <button 
                  onClick={() => scrollTabs('left')}
                  className="w-5 h-5 flex items-center justify-center hover:bg-[#3c3c3c] text-white rounded transition-colors"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7v14z" /></svg>
                </button>
              </div>
            )}

            <div 
              ref={tabContainerRef}
              onScroll={checkScroll}
              className="flex-grow flex items-center overflow-x-auto no-scrollbar h-full scroll-smooth"
            >
              {files.map(file => (
                <div 
                  key={file.id}
                  onClick={() => {
                    setActiveFileId(file.id);
                    setIsSummarized(false);
                  }}
                  className={`
                    h-full px-4 flex items-center gap-2 border-r border-[#111] text-[11px] cursor-pointer transition-all shrink-0 whitespace-nowrap
                    ${activeFileId === file.id ? 'bg-[#1e1e1e] text-white border-t border-t-blue-500' : 'text-slate-500 hover:bg-[#2a2d2e] hover:text-slate-300'}
                  `}
                >
                   {file.icon === 'markdown' && <span className="text-blue-500 font-bold opacity-70">M↓</span>}
                   {file.icon === 'log' && <span className="text-yellow-500 font-bold opacity-70">LOG</span>}
                   <span>{file.name}</span>
                   {activeFileId === file.id && <span className="ml-1 text-[9px] opacity-40">×</span>}
                </div>
              ))}
            </div>

            {/* Scroll Right Indicator */}
            {canScrollRight && (
              <div className="absolute right-12 top-0 bottom-0 z-20 flex items-center bg-[#2d2d2d] border-l border-[#3c3c3c] px-1">
                <button 
                  onClick={() => scrollTabs('right')}
                  className="w-5 h-5 flex items-center justify-center hover:bg-[#3c3c3c] text-white rounded transition-colors"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7V5z" /></svg>
                </button>
              </div>
            )}
            
            {/* Gemini Actions Button (Fixed Right) */}
            <div className="relative h-full flex items-center px-3 bg-[#2d2d2d] border-l border-[#111] z-40">
               <button 
                onClick={() => setShowGeminiWidget(!showGeminiWidget)}
                className={`p-1.5 rounded-md transition-all ${isLoading ? 'animate-pulse bg-blue-500/30' : 'hover:bg-white/10'} ${isSummarized ? 'text-blue-400 bg-blue-400/10' : 'text-slate-400'}`}
                title="Gemini AI Tools"
               >
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L14.5 9L21.5 11.5L14.5 14L12 21L9.5 14L2.5 11.5L9.5 9L12 2Z" fill="currentColor" />
                 </svg>
               </button>

               {showGeminiWidget && (
                 <div className="absolute top-11 right-0 w-52 bg-[#252526] border border-[#454545] shadow-2xl rounded-md z-[100] p-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
                   <div className="px-3 py-1.5 text-[9px] text-blue-400 font-bold uppercase tracking-widest border-b border-[#333] mb-1">
                     Gemini_Synthesis
                   </div>
                   <button 
                    onClick={handleSummarize}
                    className="w-full text-left px-3 py-2 text-[11px] text-slate-200 hover:bg-[#094771] rounded flex items-center gap-2"
                   >
                     {isSummarized ? (
                       <>
                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 8.959 8.959 0 01-9 9 9 9 0 01-9-9z"/></svg>
                         Restore original source
                       </>
                     ) : (
                       <>
                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                         Turn into 50 words
                       </>
                     )}
                   </button>
                 </div>
               )}
            </div>
          </div>

          <div className="flex-grow flex overflow-hidden relative">
            {/* Inference Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-in fade-in duration-300">
                <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
                <div className="font-mono text-[10px] text-blue-400 tracking-[0.3em] uppercase animate-pulse">
                  Gemini_Inference_Processing...
                </div>
              </div>
            )}

            <div className="w-10 bg-[#1e1e1e] flex flex-col pt-4 items-end pr-3 text-[#858585] text-[12px] select-none border-r border-white/5 shrink-0">
              {lines.map(n => <div key={n} className="h-6 leading-6">{n}</div>)}
            </div>
            
            <div className="flex-grow pt-4 px-6 overflow-y-auto custom-scrollbar">
              <pre className="whitespace-pre-wrap break-words leading-6 text-[13px] font-mono">
                {isSummarized ? (
                  <div className="animate-in fade-in slide-in-from-left-2 duration-500">
                    <span className="text-blue-400 font-bold block mb-4 italic opacity-80 select-none">// GEMINI_SYNTHESIS: Deterministic cache loaded</span>
                    <span className="text-slate-200">{activeFile.summary}</span>
                  </div>
                ) : (
                  currentDisplayContent.split('\n').map((line, i) => {
                    if (line && line.startsWith('# ')) return <span key={i} className="text-[#569cd6] font-bold block mb-2">{line}</span>;
                    if (line && line.startsWith('## ')) return <span key={i} className="text-[#4ec9b0] block mt-4 mb-1">{line}</span>;
                    if (line && line.startsWith('- ')) return <span key={i} className="block mb-1"><span className="text-blue-500 mr-2">•</span>{line.substring(2)}</span>;
                    if (line && line.includes(': ')) {
                      const [key, ...rest] = line.split(': ');
                      return <span key={i} className="block mb-1"><span className="text-[#9cdcfe]">{key}</span>: <span className="text-[#ce9178]">{rest.join(': ')}</span></span>;
                    }
                    return <span key={i} className="block min-h-[1.5rem] leading-6 mb-1">{line || '\u00A0'}</span>;
                  })
                )}
              </pre>
            </div>
          </div>

          <div className="h-6 bg-[#007acc] text-white flex items-center px-4 justify-between text-[10px] tracking-wide shrink-0">
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.167a2.406 2.406 0 011.411-3.041 1.79 1.79 0 012.307 1.053l.346 1.062a1.76 1.76 0 003.417-.592V5.882z"/></svg>
                main*
              </div>
              <div className="hidden sm:block">UTF-8</div>
            </div>
            <div className="flex gap-4">
              <div className="hidden sm:block">Spaces: 2</div>
              <div>{isSummarized ? 'Gemini Synthesis' : activeFile.name.split('.').pop()?.toUpperCase()}</div>
              <div>Ln {lineCount}, Col 1</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e1e1e;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default ReadmeSection;
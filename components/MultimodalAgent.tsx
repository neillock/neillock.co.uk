import React, { useState, useEffect } from 'react';

const demoFeeds = [
  {
    id: 'lapland',
    url: 'images/lapland.jpeg',
    label: 'LAPLAND_NODE_01',
    analysis: {
      vision: ['Family unit detected', 'Thermal units: Grouped', 'Vibe: Peak Festive'],
      audio: '"Cold! But hot chocolate is pending..."',
      reasoning: 'System stability high. Emotional cache is at 100% capacity.',
      boxes: [
        { t: '20%', l: '30%', w: '40%', h: '60%', label: 'HUMAN_CLUSTER' },
        { t: '35%', l: '2%', w: '10%', h: '20%', label: 'REINDEER' }
      ]
    }
  },
  {
    id: 'rowing',
    url: 'images/rowing.jpeg',
    label: 'ROWING_NODE_01',
    analysis: {
      vision: ['Fluid dynamics: Stable', 'Erg mode: Active', 'Power: 250W sustained'],
      audio: '[Rhythmic heavy breathing]',
      reasoning: 'Endurance protocol executing. Monitoring for anaerobic threshold breaches.',
      boxes: [
        { t: '25%', l: '20%', w: '60%', h: '50%', label: 'CORE_PROCESSOR' },
        { t: '35%', l: '80%', w: '10%', h: '30%', label: 'COX' },
        { t: '65%', l: '5%', w: '90%', h: '30%', label: 'WATER' }
      ]
    }
  },
  {
    id: 'speaking',
    url: 'images/presentation.jpg',
    label: 'CONFERENCE_NODE_01',
    analysis: {
      vision: ['Audience detected', 'Stage lighting: Optimal', 'Keynote mode: active'],
      audio: '"...scaling AI agents requires robust kernel logic..."',
      reasoning: 'Information dispersal at max efficiency. Influence metrics climbing.',
      boxes: [
        { t: '55%', l: '30%', w: '20%', h: '30%', label: 'SPEAKER' }
      ]
    }
  },
  {
    id: 'google',
    url: 'images/running2.jpg',
    label: 'RUNNING_NODE_01',
    analysis: {
      vision: ['Location: San Francisco', 'Mode: Running', 'Focus: Locked in'],
      audio: '[Eye of the tiger]',
      reasoning: 'Sprint velocity stable. Legs tired.',
      boxes: [
        { t: '10%', l: '30%', w: '40%', h: '80%', label: 'PERFORMANCE_ATHLETE' }
      ]
    }
  }
];

interface Props {
  onHover: (id: string | null) => void;
}

const MultimodalAgent: React.FC<Props> = ({ onHover }) => {
  const [feedIndex, setFeedIndex] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imgSrc, setImgSrc] = useState(demoFeeds[0].url);
  const currentFeed = demoFeeds[feedIndex];

  useEffect(() => {
    setImgSrc(demoFeeds[feedIndex].url);
  }, [feedIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setFeedIndex((prev) => (prev + 1) % demoFeeds.length);
      }, 2500);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative"
      onMouseEnter={() => onHover('MULTIMODAL_PLAYGROUND')}
      onMouseLeave={() => onHover(null)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 relative aspect-video bg-black rounded-xl overflow-hidden border border-slate-800 shadow-2xl group">
          <img 
            src={imgSrc} 
            alt={currentFeed.label} 
            className={`w-full h-full object-cover transition-all duration-1000 ${isAnalyzing ? 'brightness-[0.3] saturate-50 blur-sm scale-110' : 'brightness-90 scale-100'}`}
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/seed/${currentFeed.id}/1200/800?grayscale`;
            }}
          />
          
          <div className="absolute inset-0 pointer-events-none z-10 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
          <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

          {isAnalyzing && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute font-mono text-blue-400 text-xs tracking-widest animate-pulse">
                PERFORMING_MULTIMODAL_INFERENCE...
              </div>
            </div>
          )}

          {!isAnalyzing && currentFeed.analysis.boxes.map((box, i) => (
            <div 
              key={i}
              className="multimodal-box absolute border border-blue-400/60 bg-blue-400/5 transition-all duration-700 animate-in fade-in zoom-in"
              style={{ top: box.t, left: box.l, width: box.w, height: box.h }}
            >
              <span className="absolute -top-5 left-0 font-mono text-[9px] text-blue-400 font-bold bg-slate-950/80 px-1 py-0.5 rounded backdrop-blur-sm border border-blue-400/20">
                {box.label}
              </span>
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-400" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-400" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-400" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-400" />
            </div>
          ))}

          {isAnalyzing && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/40 to-transparent h-24 w-full animate-[scanVertical_1.5s_linear_infinite] z-30" />
          )}

          <div className="absolute top-4 left-4 flex gap-4 z-40">
            <div className="px-3 py-1.5 bg-black/60 backdrop-blur-md rounded border border-white/10 font-mono text-[10px] text-white flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-red-500 animate-pulse' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]'}`} />
              SENSOR_SOURCE: {currentFeed.label}
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-40">
             <div className="font-mono text-[9px] text-blue-300/60 bg-black/60 backdrop-blur-md p-3 rounded border border-white/5">
                SIGNAL_KEY: {Math.random().toString(36).substring(7).toUpperCase()}<br/>
                MODALITY: VISION + AUDIO + REASONING
             </div>
             <div className="flex gap-1.5 p-2 bg-black/40 backdrop-blur-md rounded">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-1.5 h-10 bg-blue-500/20 rounded-full overflow-hidden flex flex-col justify-end">
                    <div 
                      className={`w-full bg-blue-400 ${isAnalyzing ? 'animate-none' : 'animate-[bounce_1s_infinite]'}`} 
                      style={{ height: isAnalyzing ? '100%' : `${30 + Math.random() * 70}%`, animationDelay: `${i * 0.15}s` }} 
                    />
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex-grow bg-slate-50 border border-slate-200 rounded-xl p-6 font-mono overflow-hidden shadow-inner">
            <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2 flex justify-between items-center">
              <span>multimodal_output</span>
              <span className="flex items-center gap-1.5 text-blue-500">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                GEMINI_3_PRO
              </span>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-blue-600 font-bold text-[11px] mb-2 uppercase tracking-tighter opacity-80">/vision/features</p>
                <ul className="space-y-1.5">
                  {currentFeed.analysis.vision.map((item, i) => (
                    <li key={i} className={`text-xs text-slate-600 transition-all duration-700 ${isAnalyzing ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}`}>
                      <span className="text-blue-400 mr-2">»</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-pink-600 font-bold text-[11px] mb-2 uppercase tracking-tighter opacity-80">/audio/stream</p>
                <p className={`text-xs text-slate-600 italic leading-relaxed transition-all duration-700 ${isAnalyzing ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}`}>
                  {currentFeed.analysis.audio}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-200">
                <p className="text-green-600 font-bold text-[11px] mb-2 uppercase tracking-tighter opacity-80">/agent/logic</p>
                <p className={`text-[11px] font-bold leading-relaxed text-slate-800 transition-all duration-700 ${isAnalyzing ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}`}>
                  {currentFeed.analysis.reasoning}
                </p>
              </div>
            </div>
          </div>

          <button 
            disabled={isAnalyzing}
            onClick={() => {
              setIsAnalyzing(true);
              setTimeout(() => {
                setFeedIndex((feedIndex + 1) % demoFeeds.length);
                setIsAnalyzing(false);
              }, 1200);
            }}
            className={`
              w-full py-5 text-white font-mono text-[11px] uppercase tracking-[0.2em] transition-all rounded-xl border border-slate-800 shadow-xl
              ${isAnalyzing ? 'bg-slate-700 cursor-not-allowed' : 'bg-slate-900 hover:bg-black active:scale-[0.98]'}
            `}
          >
            {isAnalyzing ? 'Synchronizing_Feed...' : 'Cycle_Sensor_Feed'}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes scanVertical {
          0% { top: -20%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 120%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default MultimodalAgent;
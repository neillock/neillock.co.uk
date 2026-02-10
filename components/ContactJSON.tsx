import React from 'react';

interface Props {
  onHover: (id: string | null) => void;
}

const ContactSection: React.FC<Props> = ({ onHover }) => {
  return (
    <section 
      className="relative w-screen left-1/2 -ml-[50vw] pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden bg-blue-600 mb-0"
      onMouseEnter={() => onHover('CONTACT_TERMINAL')}
      onMouseLeave={() => onHover(null)}
    >
      {/* Structural Accents - subtle borders for depth */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/20" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />

      {/* Cinematic Animation Layer (The Swirling Line) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <svg 
          viewBox="0 0 1440 600" 
          className="w-full h-full overflow-visible opacity-40"
          preserveAspectRatio="none"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Motion Path (The Dotted Line) - Now in white for contrast */}
          <path 
            id="swirlPath"
            d="M-200,400 C100,400 400,50 720,350 S1300,600 1700,150" 
            stroke="url(#swirlGradient)" 
            strokeWidth="3" 
            strokeDasharray="12 30" 
            strokeLinecap="round"
            className="animate-trail-flow"
          />
          
          <defs>
            <linearGradient id="swirlGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="80%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 text-center px-6 mb-16 max-w-7xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-blue-700/50 backdrop-blur-md border border-blue-400/30 shadow-xl">
           <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_12px_rgba(255,255,255,1)]" />
           <span className="text-[11px] font-mono font-bold text-white uppercase tracking-[0.3em]">v5.2_Sync_Steady</span>
        </div>
        <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8 drop-shadow-2xl">
          Let's Build.
        </h3>
        <p className="text-blue-100 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-medium">
          Whether you're looking for strategic advisory, technical orchestration, or 
          to discuss 'high-performance' human systems, the door is open.
        </p>
      </div>

      {/* Primary Interaction Layer */}
      <div className="relative z-30 flex flex-col items-center justify-center">
        <a 
          href="https://www.linkedin.com/in/neilwlock/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative flex items-center gap-4 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-xl md:text-2xl hover:bg-slate-50 transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:shadow-white/20 hover:-translate-y-2 active:scale-95 overflow-hidden"
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-transparent to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          
          <div className="bg-blue-600 rounded-full p-2 transition-all group-hover:rotate-[360deg] shadow-lg">
             <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </div>
          <span className="tracking-tight font-extrabold">Connect with Me</span>
          
          {/* Signal Indicator */}
          <span className="absolute -right-1 -top-1 w-6 h-6 bg-white/40 rounded-full animate-ping opacity-50" />
        </a>
        
        <div className="mt-12 text-center pb-4">
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.4em]">Protocol_Status: 0x882_Active</p>
        </div>
      </div>

      <style>{`
        .animate-trail-flow {
          stroke-dashoffset: 4000;
          stroke-dasharray: 4000;
          animation: trailFlow 12s linear infinite;
        }

        @keyframes trailFlow {
          0% { stroke-dashoffset: 4000; opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
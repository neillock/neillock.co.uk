import React, { useState, useEffect } from 'react';

interface Props {
  onApplyWeather: () => void;
}

const ThemeStamper: React.FC<Props> = ({ onApplyWeather }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleApply = () => {
    onApplyWeather();
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div 
      className={`fixed bottom-24 right-4 md:right-12 z-[2000] pointer-events-none transition-all duration-700 transform 
        ${isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-[200%] opacity-0 scale-150'}`}
    >
      <div className="relative group pointer-events-auto">
        {/* Close Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); setIsDismissed(true); }}
          className="absolute -top-3 -left-3 w-7 h-7 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm hover:bg-black transition-colors z-50 border border-white/20 shadow-lg"
          aria-label="Close notification"
        >
          ×
        </button>

        {/* Pointing Arrow - Adjusted for mobile */}
        <div className="absolute -bottom-14 right-2 md:right-4 w-10 md:w-12 h-14 md:h-16 animate-bounce pointer-events-none">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-red-600 drop-shadow-md" style={{ transform: 'rotate(10deg)' }}>
            <path d="M12 2C12 2 10 10 4 14M12 2C12 2 14 10 20 14M12 2V22M12 22L8 18M12 22L16 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute -right-12 md:-right-16 top-6 md:top-8 whitespace-nowrap font-handwritten text-red-600 font-bold text-xs md:text-sm -rotate-12 bg-white/40 px-1 rounded">
            Try here!
          </span>
        </div>

        {/* The Stamp Graphic */}
        <div 
          onClick={handleApply}
          className="cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          <div className={`
            relative p-3 md:p-4 border-[4px] md:border-[6px] border-red-600 rounded-xl bg-white/95 backdrop-blur-sm
            rotate-6 shadow-[8px_8px_0px_rgba(220,38,38,0.2)] md:shadow-[10px_10px_0px_rgba(220,38,38,0.2)]
            animate-[stamp_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards]
          `}>
            {/* Distressed ink effect overlay */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
            
            <div className="flex flex-col items-center gap-1">
              <span className="text-red-700 font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] leading-none mb-1">
                System Update
              </span>
              <p className="text-red-600 font-black text-base md:text-xl leading-tight text-center uppercase tracking-tight">
                New Feature:<br/>Global Themes
              </p>
              <div className="h-px w-full bg-red-600/30 my-1" />
              <p className="text-red-700 font-bold text-[10px] md:text-xs text-center max-w-[150px] md:max-w-[180px] leading-relaxed">
                Why not try today's theme for anyone in the UK:
                <span className="block text-red-600 font-black text-xs md:text-sm mt-1 underline decoration-double">"RUBBISH WEATHER"</span>
              </p>
            </div>

            {/* Stamp Handle Shadow in the ink */}
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-red-600/10 rounded-full blur-md" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes stamp {
          0% { transform: scale(3) rotate(0deg); opacity: 0; filter: blur(10px); }
          80% { transform: scale(0.9) rotate(10deg); opacity: 1; filter: blur(0); }
          100% { transform: scale(1) rotate(6deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ThemeStamper;
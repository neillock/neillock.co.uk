import React, { useState } from 'react';

const IdentityChip: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative ml-4 h-full flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The "Chip" visible in the nav bar */}
      <div className={`
        flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border transition-all duration-300 cursor-pointer
        ${isHovered ? 'bg-slate-100 border-slate-300 shadow-md' : 'bg-white border-slate-200'}
      `}>
        <div className="w-6 h-6 rounded-full overflow-hidden border border-slate-200 relative">
          <img 
            src="images/me.jpg" 
            alt="Neil Lock" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://picsum.photos/seed/neil/200/200";
            }}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-bold text-black leading-none tracking-tight">NEIL_LOCK</span>
          <div className="flex gap-0.5 mt-0.5">
            <div className="w-1 h-1 bg-[#4285F4] rounded-full" />
            <div className="w-1 h-1 bg-[#EA4335] rounded-full" />
            <div className="w-1 h-1 bg-[#FBBC05] rounded-full" />
            <div className="w-1 h-1 bg-[#34A853] rounded-full" />
          </div>
        </div>
      </div>

      {/* The 3D ID Card Dropdown */}
      <div className={`
        absolute top-full right-0 mt-4 transition-all duration-500 [perspective:1000px] pointer-events-none z-[110]
        ${isHovered ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4'}
      `}>
        {/* Connection Cord Effect */}
        <div className="absolute -top-4 right-8 w-0.5 h-4 bg-slate-300" />
        
        <div className={`w-48 h-72 relative transition-transform duration-700 [transform-style:preserve-3d] ${isHovered ? 'hover:[transform:rotateY(180deg)]' : ''}`}>
          {/* Front Side */}
          <div className="absolute inset-0 w-full h-full bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden [backface-visibility:hidden] flex flex-col items-center pt-6 pb-4 px-4 text-center">
            <div className="absolute top-0 left-0 right-0 h-1.5 flex">
               <div className="flex-1 bg-[#4285F4]" />
               <div className="flex-1 bg-[#EA4335]" />
               <div className="flex-1 bg-[#FBBC05]" />
               <div className="flex-1 bg-[#34A853]" />
            </div>
            
            <div className="mb-4">
              <h4 className="text-xl font-bold tracking-tight text-slate-800">Neil</h4>
              <h4 className="text-xl font-bold tracking-tight text-slate-800 -mt-1">Lock</h4>
            </div>

            <div className="relative mb-6">
              <div className="w-28 h-28 rounded-full border-[6px] border-slate-50 overflow-hidden shadow-inner bg-slate-100">
                <img 
                  src="images/me.jpg" 
                  alt="Neil Lock" 
                  className="w-full h-full object-cover transition-all duration-500 scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/neil/200/200";
                  }}
                />
              </div>
              <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-md animate-pulse" />
            </div>

            <div className="w-full flex justify-between items-end mt-auto px-1">
               <div className="bg-slate-100 border border-slate-200 px-2 py-1 rounded text-[8px] font-mono font-bold text-slate-500 tracking-tighter">
                 Head of Startups
               </div>
               <div className="opacity-80">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
               </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 w-full h-full bg-slate-950 rounded-xl shadow-2xl border border-white/5 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-6">
              <img 
                src="https://www.gstatic.com/images/branding/product/2x/google_cloud_64dp.png" 
                alt="Google Cloud" 
                className="w-16 h-16 object-contain"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-[9px] font-mono text-blue-400 uppercase tracking-widest mb-1">CURRENT ROLE</p>
                <h5 className="text-white text-[13px] font-bold leading-tight text-center">
                  Head of Startup Customer Engineers<br/>@ Google Cloud
                </h5>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-slate-300 text-[9px] leading-relaxed italic">
                  Helping founders and developers build with and on top of Google Tech!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityChip;
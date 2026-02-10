import React, { useState, useEffect } from 'react';

interface WidgetProps {
  label: string;
  value: string | React.ReactNode;
  status?: 'success' | 'warning' | 'danger';
  onHover: () => void;
  onClick: () => void;
  index: number;
}

const Widget: React.FC<WidgetProps> = ({ label, value, status = 'success', onHover, onClick, index }) => (
  <div 
    className="border border-slate-200 bg-white p-6 relative group hover:border-blue-400 transition-all cursor-pointer opacity-0 translate-y-4 animate-[fadeInUp_0.5s_ease-out_forwards]"
    style={{ animationDelay: `${index * 150}ms` }}
    onMouseEnter={onHover}
    onClick={onClick}
  >
    <div className="flex justify-between items-center mb-4">
      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">{label}</span>
      <div className={`w-2 h-2 rounded-full relative ${status === 'success' ? 'bg-green-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}>
        <div className={`absolute inset-0 rounded-full animate-ping opacity-75 ${status === 'success' ? 'bg-green-400' : status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'}`} />
      </div>
    </div>
    <div className="font-mono h-32 flex items-center justify-center text-center">
      {typeof value === 'string' ? <span className="text-2xl font-bold tracking-tighter">{value}</span> : value}
    </div>
    <div className="mt-4 text-[9px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
      Click for detailed metrics >>
    </div>
  </div>
);

const UptimeWidgetContent = () => {
  const [timeRemaining, setTimeRemaining] = useState({ years: 0, days: 0, hours: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const birthDate = new Date('1984-02-29T00:00:00');
      const now = new Date();
      
      // Calculate Years
      let years = now.getFullYear() - birthDate.getFullYear();
      const monthDiff = now.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
        years--;
      }

      // Calculate next update (Birthday)
      // For leaplings, anniversary is Feb 29 if leap year, else March 1
      let nextUpdate = new Date(now.getFullYear(), 1, 29);
      if (nextUpdate <= now) {
        nextUpdate = new Date(now.getFullYear() + 1, 1, 29);
      }

      const diff = nextUpdate.getTime() - now.getTime();
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      setTimeRemaining({ years, days: d, hours: h });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold tracking-tighter">{timeRemaining.years} Years</span>
      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mt-1">
        Update Due In: <span className="text-slate-600 lowercase">{timeRemaining.days}d {timeRemaining.hours}h</span>
      </div>
    </div>
  );
};

const MarathonLoader = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev >= 16 ? 0 : prev + 1));
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const isFlashing = count > 10;
  const flashActive = isFlashing ? count % 2 !== 0 : false;

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-0.5 mb-3">
        {[...Array(10)].map((_, i) => {
          const isActive = isFlashing ? flashActive : i < count;
          return (
            <div 
              key={i} 
              className={`w-3.5 h-6 rounded-sm transition-all duration-300 ${
                isActive 
                  ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)] scale-y-100' 
                  : 'bg-slate-100 scale-y-90 opacity-40'
              }`} 
            />
          );
        })}
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <div className="text-[11px] font-mono font-bold text-slate-900 tracking-tight uppercase">
          10 Marathons
        </div>
        <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
          PR: <span className="text-slate-600 lowercase">3h 42m</span>
        </div>
      </div>
    </div>
  );
};

const DependencyMatrix = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isHovering, setIsHovering] = useState(false);

  const deps = [
    { id: 'L', name: 'LAURA', role: 'KEY ORCHESTRATOR', status: 'PRIORITY_HIGH', color: '#ffc8dd', r: 18, dash: 80 },
    { id: 'E', name: 'EMILY', role: 'INTERRUPT HANDLER', status: 'PRIORITY_HIGH', color: '#4f772d', r: 14, dash: 60 },
    { id: 'D', name: 'DAISY', role: 'CREATIVE LOGIC', status: 'PRIORITY_HIGH', color: '#5a189a', r: 10, dash: 45 },
  ];

  useEffect(() => {
    if (isHovering) return;
    
    // Cycle every 5 seconds
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % deps.length);
    }, 5000);
    
    // Start with the first item
    if (activeIndex === -1) setActiveIndex(0);

    return () => clearInterval(interval);
  }, [isHovering, activeIndex, deps.length]);

  const active = activeIndex === -1 ? null : deps[activeIndex];

  return (
    <div 
      className="flex flex-row items-center justify-between w-full h-full gap-4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <style>{`
        @keyframes radar-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .radar-line {
          animation: radar-spin 15s linear infinite;
          transform-origin: 21px 21px;
        }
      `}</style>
      
      {/* Left Pane: Radial Chart */}
      <div className="relative w-24 h-24 shrink-0">
        <svg viewBox="0 0 42 42" className="w-full h-full overflow-visible">
          <circle cx="21" cy="21" r="20" fill="transparent" stroke="#f1f5f9" strokeWidth="0.5" />
          <line x1="21" y1="21" x2="21" y2="1" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" className="radar-line" />
          
          {deps.map((dep, idx) => (
            <g key={dep.id} className="cursor-pointer" onClick={() => setActiveIndex(idx)}>
              <circle cx="21" cy="21" r={dep.r} fill="transparent" stroke="#f8fafc" strokeWidth="2" />
              <circle 
                cx="21" cy="21" r={dep.r} 
                fill="transparent" 
                stroke={dep.color} 
                strokeWidth={activeIndex === idx ? "3.5" : "2"}
                strokeDasharray={`${dep.dash} 100`}
                strokeLinecap="round"
                className="transition-all duration-700 -rotate-90 origin-center"
                opacity={activeIndex !== -1 && activeIndex !== idx ? 0.2 : 1}
              />
              <text 
                x={21} y={21 - dep.r - 2.5} 
                className={`font-mono text-[3.5px] font-bold transition-all duration-300 ${activeIndex === idx ? 'fill-black' : 'fill-slate-300'}`}
                textAnchor="middle"
              >
                {dep.id}
              </text>
            </g>
          ))}
          <circle cx="21" cy="21" r="2" fill={active ? active.color : "#e2e8f0"} className="transition-colors duration-500 animate-pulse" />
        </svg>
      </div>

      {/* Right Pane: Status Readout */}
      <div className="flex-grow flex flex-col justify-center text-left border-l border-slate-100 pl-4 h-full relative">
        {active ? (
          <div className="animate-in fade-in slide-in-from-right-2 duration-500 h-full flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: active.color }} />
              <span className="text-xl font-black text-slate-900 tracking-tight leading-none">{active.name}</span>
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
              {active.role}
            </div>
            <div className="flex">
              <div className="px-2 py-1 bg-blue-50 text-blue-600 rounded-[3px] text-[8px] font-mono font-black tracking-widest border border-blue-100 shadow-sm">
                {active.status}
              </div>
            </div>
          </div>
        ) : (
          <div className="opacity-40 flex flex-col items-start transition-all duration-500">
             <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-slate-400 mb-2 uppercase">CORE_STANDBY</span>
             <div className="flex gap-2">
               <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
               <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
               <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface Props {
  onHover: (id: string | null) => void;
}

const EnduranceDashboard: React.FC<Props> = ({ onHover }) => {
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  const metricDetails: Record<string, { title: string, content: React.ReactNode, wide?: boolean }> = {
    'Uptime': {
      title: 'Human System Uptime',
      content: (
        <div className="space-y-4">
          <p>Started Feb 29, 1984. 41 years of high-availability operations across diverse technical and physical environments.</p>
          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            <div className="p-2 bg-slate-100 rounded">RELIABILITY: 99.999%</div>
            <div className="p-2 bg-slate-100 rounded">LAST_REBOOT: N/A</div>
            <div className="p-2 bg-slate-100 rounded">CYCLES: ~15,000 Days</div>
            <div className="p-2 bg-slate-100 rounded">VERSION: v4.1.0</div>
          </div>
        </div>
      )
    },
    'Marathon Commits': {
      title: 'Endurance_Ledger: Race_History',
      content: (
        <div className="space-y-4">
          <p className="text-sm">Total successful executions: 10 full marathons. Each finish is a validated entry in the global persistence layer.</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[11px] bg-slate-50 p-4 rounded border border-slate-200">
            {['LONDON', 'NYC', 'BERLIN', 'DUBLIN', 'VENICE', 'DISNEY_W'].map(race => (
              <div key={race} className="flex justify-between border-b border-slate-200 pb-1">
                <span className="text-slate-500">{race}</span>
                <span className="text-blue-600 font-bold">COMPLETE</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-slate-900 text-white rounded-lg flex items-center justify-between">
            <div>
              <p className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Personal_Best (PR)</p>
              <p className="text-2xl font-bold font-mono tracking-tighter">03h 42m 00s</p>
            </div>
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
        </div>
      )
    },
    'Current Process': {
      title: 'rowing.sh Lifecycle',
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">Active mid-life discipline acquisition. Currently logging heavy hours on the Concept 2.</p>
          <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
            <p className="text-[10px] font-mono font-bold text-yellow-700 mb-1">STDOUT_STREAM</p>
            <p className="text-xs italic text-yellow-800">"[WARN] Boredom threshold reached. Consistency protocol override enabled."</p>
          </div>
        </div>
      )
    },
    'Dependencies': {
      wide: true,
      title: 'System Lifecycle: dependency_graph.v4.2',
      content: (
        <div className="space-y-6 py-4">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-600 leading-relaxed">
            <p className="mb-4"><strong>Stability Protocol:</strong> The system relies on a high-availability link with <span className="text-pink-600 font-bold">Laura (System Foundation)</span>. This provides the power budget for all secondary operations.</p>
            <p><strong>Interrupt Handler:</strong> <span className="text-green-600 font-bold">Emily</span> and <span className="text-purple-600 font-bold">Daisy (Creative Logic)</span> trigger priority feedback loops that ensure perspective and balance are maintained across the engineering stack.</p>
          </div>
        </div>
      )
    }
  };

  return (
    <section className="pb-12">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <div className="mb-12">
        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 mb-2">metrics.monitoring.io</h2>
        <h3 className="text-3xl font-bold">Engineering x Endurance</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Widget 
          index={0} 
          label="Uptime" 
          value={<UptimeWidgetContent />} 
          onHover={() => onHover('DASHBOARD_UPTIME')} 
          onClick={() => setActiveMetric('Uptime')} 
        />
        <Widget 
          index={1} 
          label="Marathon Commits" 
          value={<MarathonLoader />} 
          onHover={() => onHover('DASHBOARD_MARATHONS')}
          onClick={() => setActiveMetric('Marathon Commits')}
        />
        <Widget index={2} label="Current Process" value="rowing.sh" status="warning" onHover={() => onHover('DASHBOARD_PROCESS')} onClick={() => setActiveMetric('Current Process')} />
        <Widget index={3} label="Dependencies" value={<DependencyMatrix />} onHover={() => onHover('DASHBOARD_DEPENDENCIES')} onClick={() => setActiveMetric('Dependencies')} />
      </div>

      {activeMetric && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-white/60 backdrop-blur-md" onClick={() => setActiveMetric(null)} />
          <div className={`relative bg-white border border-slate-200 shadow-2xl w-full p-8 rounded-lg animate-in fade-in zoom-in duration-200 ${metricDetails[activeMetric].wide ? 'max-w-4xl' : 'max-w-md'}`}>
            <button onClick={() => setActiveMetric(null)} className="absolute top-4 right-4 text-slate-400 hover:text-black font-mono text-xl">×</button>
            <div className="font-mono text-[10px] text-blue-500 mb-2 uppercase tracking-widest">Metric_Detail_View</div>
            <h4 className="text-2xl font-bold mb-6">{metricDetails[activeMetric].title}</h4>
            <div className="text-slate-600">{metricDetails[activeMetric].content}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EnduranceDashboard;
import React, { useState } from 'react';

interface CareerNode {
  id: string;
  label: string;
  role: string;
  period: string;
  logs: string[];
  zooIcon?: string;
}

const careerData: CareerNode[] = [
  { 
    id: 'foundation', 
    label: 'Southampton CS', 
    role: 'The Foundation', 
    period: '2000-2004',
    logs: ['BSc Computer Science', 'Distributed Systems theory'],
    zooIcon: '🦒'
  },
  { 
    id: 'mse', 
    label: 'MoneySavingExpert', 
    role: 'Founding Eng -> Head of Tech', 
    period: '2004-2015',
    logs: ['Scaled to 15m+ monthly users', 'Built core architecture', 'Managed engineering team growth'],
    zooIcon: '🐒'
  },
  { 
    id: 'msm', 
    label: 'MoneySupermarket', 
    role: 'Chief Architect', 
    period: '2015-2017',
    logs: ['Strategic technical oversight', 'Platform modernization', 'Enterprise-scale cloud strategy'],
    zooIcon: '🦓'
  },
  { 
    id: 'ldt', 
    label: 'LetsDoThis', 
    role: 'CTO & Co-founder', 
    period: '2017-2018',
    logs: ['Cofounded endurance marketplace', 'Built technical foundation', 'Team Scaling'],
    zooIcon: '🦦'
  },
  { 
    id: 'aws', 
    label: 'AWS Startups', 
    role: 'Solutions Architect -> SA Manager', 
    period: '2018-2022',
    logs: ['Advising top-tier startups', 'Cloud-native architecture'],
    zooIcon: '🐼'
  },
  { 
    id: 'google', 
    label: 'Google Engineering', 
    role: 'Head of Startup Customer Engineering', 
    period: '2022-Present',
    logs: [
      'Leading startup customer eng in UK & Ireland',
      'Strategic influence for Gemini API adoption',
      'Architecting Agentic Runtimes for global scale',
      'Building for the next billion users'
    ],
    zooIcon: '🦁'
  }
];

interface Props {
  onHover: (id: string | null) => void;
  isZooMode?: boolean;
}

const CareerDiagram: React.FC<Props> = ({ onHover, isZooMode }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section className={`relative ${isZooMode ? 'zoo-career' : ''}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 mb-2">{isZooMode ? '/jungle/migration/history' : '/usr/bin/history'}</h2>
          <h3 className="text-2xl md:text-3xl font-bold flex flex-wrap items-center gap-x-2">
            <span>{isZooMode ? 'Habitat Evolution : jungle.sh' : 'System Architecture : career.sh'}</span>
            <span className="text-slate-300 font-light">&lt;</span>
            <a 
              href="https://linkedin.com/in/neilwlock/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:text-blue-500 transition-colors no-underline font-mono text-lg md:text-2xl lowercase tracking-tighter"
            >
              linkedin.com/in/neilwlock/
            </a>
          </h3>
        </div>
      </div>

      <div className="relative pb-0 overflow-visible">
        <div className={`career-track absolute top-8 -left-[2000px] -right-[2000px] h-[2px] ${isZooMode ? 'bg-green-600/30' : 'bg-slate-100'} hidden md:block overflow-hidden z-0`}>
          <div className={`career-scan absolute top-0 h-full w-80 bg-gradient-to-r from-transparent ${isZooMode ? 'via-green-400 to-transparent' : 'via-blue-500 to-transparent'} animate-[scan_8s_linear_infinite] shadow-[0_0_15px_rgba(59,130,246,0.8)]`} />
        </div>

        <div className={`career-track absolute top-8 left-1/2 -translate-x-1/2 w-[2px] bottom-16 ${isZooMode ? 'bg-green-600/30' : 'bg-slate-100'} md:hidden overflow-hidden z-0 rounded-full`}>
          <div className="career-scan-vertical absolute w-full h-40 bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-[scanVertical_8s_linear_infinite] shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
        </div>

        <style>{`
          @keyframes scan {
            0% { transform: translateX(-150%); left: 0; }
            100% { transform: translateX(150%); left: 100%; }
          }
          
          @keyframes scanVertical {
            0% { transform: translateY(-150%); top: 0; }
            100% { transform: translateY(150%); top: 100%; }
          }
          
          .node-pulse {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
            100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
          }

          .disney-mode .mickey-node::before,
          .disney-mode .mickey-node::after {
             content: '';
             position: absolute;
             width: 32px;
             height: 32px;
             background-color: #fde047;
             border: 2px solid white;
             border-radius: 50%;
             top: -8px;
             z-index: -1;
             box-shadow: 0 0 10px #fde047;
             transition: all 0.3s ease;
          }
          .disney-mode .mickey-node::before { left: -12px; }
          .disney-mode .mickey-node::after { right: -12px; }
          
          .zoo-career .career-track {
            height: 4px !important;
            border-radius: 10px;
            background: #2d5a27 !important;
          }
        `}</style>

        <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-2 relative z-10">
          {careerData.map((node, index) => (
            <div 
              key={node.id} 
              className="relative flex flex-col items-center group cursor-help w-full md:w-auto"
              onMouseEnter={() => {
                setActiveNode(node.id);
                onHover(`CAREER_NODE_${node.id.toUpperCase()}`);
              }}
              onMouseLeave={() => {
                setActiveNode(null);
                onHover(null);
              }}
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
            >
              <div 
                className={`
                  w-16 h-16 rounded-full border-2 flex items-center justify-center bg-white transition-all duration-300 relative z-30 mickey-node
                  ${activeNode === node.id ? 'border-blue-500 scale-110 shadow-xl node-pulse bg-blue-50/50 active-mickey' : 'border-slate-200'}
                  ${isZooMode ? 'border-green-600 bg-white shadow-lg' : ''}
                `}
              >
                <span className={`text-[10px] font-mono font-bold transition-colors ${activeNode === node.id ? 'text-blue-600' : 'text-slate-400'}`}>
                  {isZooMode ? <span className="text-2xl">{node.zooIcon}</span> : `0${index + 1}`}
                </span>
              </div>

              <div className="mt-4 text-center px-2">
                <p className={`font-bold text-[13px] tracking-tight whitespace-nowrap transition-colors ${activeNode === node.id ? (isZooMode ? 'text-green-600' : 'text-blue-600') : 'text-black'}`}>
                  {node.label}
                </p>
                <p className="text-[9px] font-mono text-slate-400 uppercase mt-1 leading-tight max-w-[120px] mx-auto">
                  {node.role}
                </p>
              </div>

              <div className={`
                absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-slate-900 text-white p-5 z-[100] rounded-lg shadow-2xl font-mono text-[11px] transition-all duration-300 transform border border-slate-700
                ${isZooMode ? 'bg-[#1C1C1E] border-green-600/30' : ''}
                ${activeNode === node.id ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
              `}>
                <div className={`flex justify-between items-center mb-3 border-b pb-2 ${isZooMode ? 'border-green-600/30' : 'border-slate-700'}`}>
                  <span className={`${isZooMode ? 'text-green-400' : 'text-blue-400'} font-bold uppercase tracking-tighter`}>{isZooMode ? 'wildlife_log_v2' : 'syslog_v1'}</span>
                  <span className="text-slate-500">{node.period}</span>
                </div>
                <ul className="space-y-2.5">
                  {node.logs.map((log, i) => (
                    <li key={i} className="flex gap-2 leading-relaxed text-slate-300">
                      <span className={`${isZooMode ? 'text-green-400' : 'text-blue-400'} font-bold`}>{isZooMode ? '🌿' : '#'}</span> {log}
                    </li>
                  ))}
                </ul>
                <div className={`mt-4 pt-3 border-t text-[8px] text-slate-600 flex justify-between items-center ${isZooMode ? 'border-green-600/30' : 'border-slate-800'}`}>
                  <span>{isZooMode ? 'HABITAT_DATA_STABLE' : 'METADATA_EXTRACTED'}</span>
                  <span className={node.period?.includes('Present') ? 'text-green-500' : ''}>{node.period?.includes('Present') ? (isZooMode ? 'ALPHA' : 'RUNNING') : 'ARCHIVED'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerDiagram;

import React, { useState, useEffect } from 'react';

const agentSteps = [
  { label: 'PROMPT', color: 'text-slate-400' },
  { label: 'GEMINI_3_PRO', color: 'text-blue-500' },
  { label: 'REASONING', color: 'text-pink-500' },
  { label: 'TOOL_CALL', color: 'text-green-500' },
  { label: 'ACTION', color: 'text-yellow-500' },
];

interface Props {
  onHover: (id: string | null) => void;
}

const NeuralLab: React.FC<Props> = ({ onHover }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % agentSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative"
      onMouseEnter={() => onHover('NEURAL_INTERFACE')}
      onMouseLeave={() => onHover(null)}
    >
      <div className="mb-12">
        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 mb-2">/usr/bin/neural-orchestrator</h2>
        <h3 className="text-3xl font-bold">Gemini & Agentic Runtimes</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <p className="text-xl text-slate-600 leading-relaxed">
            Building the next generation of <span className="text-black font-bold">autonomous AI agents</span>. 
            Leveraging Gemini's multi-modal reasoning to move beyond simple chat to complex tool-augmented orchestration.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 border border-slate-200 bg-white rounded-lg">
              <h4 className="font-mono text-[10px] text-blue-500 uppercase tracking-widest mb-2">Capability_01</h4>
              <p className="font-bold text-lg">Reasoning Loops</p>
              <p className="text-xs text-slate-500 mt-2 font-mono">Chain-of-thought orchestration.</p>
            </div>
            <div className="p-6 border border-slate-200 bg-white rounded-lg">
              <h4 className="font-mono text-[10px] text-green-500 uppercase tracking-widest mb-2">Capability_02</h4>
              <p className="font-bold text-lg">Tool Integration</p>
              <p className="text-xs text-slate-500 mt-2 font-mono">Grounding AI in real-world APIs.</p>
            </div>
          </div>
        </div>

        <div className="relative p-8 bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden min-h-[400px] flex flex-col justify-center">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 flex flex-col gap-6">
            {agentSteps.map((step, i) => (
              <div 
                key={step.label}
                className={`flex items-center gap-6 transition-all duration-700 ${i === activeStep ? 'translate-x-4 opacity-100 scale-105' : 'opacity-30 scale-100'}`}
              >
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-mono text-[10px] font-bold ${i === activeStep ? 'border-blue-500 bg-blue-500/10 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'border-slate-800 text-slate-500'}`}>
                  0{i + 1}
                </div>
                <div>
                  <div className={`font-mono text-xs uppercase tracking-[0.2em] font-bold ${step.color}`}>{step.label}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">
                    {i === activeStep ? 'STATUS: PROCESSING_ACTIVE' : 'STATUS: IDLE'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          </div>

          <div className="absolute top-4 left-4 font-mono text-[8px] text-slate-700 uppercase tracking-widest">
            Neural_Telemetry_v4.2
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeuralLab;

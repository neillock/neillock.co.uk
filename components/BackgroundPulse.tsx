import React, { useState, useEffect } from 'react';

interface Pulse {
  id: number;
  x: number;
  y: number;
  color: string;
}

const COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
const GRID_SIZE = 24;

const BackgroundPulse: React.FC = () => {
  const [pulses, setPulses] = useState<Pulse[]>([]);

  useEffect(() => {
    const triggerPulse = () => {
      const cols = Math.floor(window.innerWidth / GRID_SIZE);
      const rows = Math.floor(window.innerHeight / GRID_SIZE);
      
      const newPulse: Pulse = {
        id: Date.now(),
        x: Math.floor(Math.random() * cols) * GRID_SIZE,
        y: Math.floor(Math.random() * rows) * GRID_SIZE,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      };

      setPulses(prev => [...prev, newPulse]);

      // Remove the pulse after animation finishes (2s)
      setTimeout(() => {
        setPulses(prev => prev.filter(p => p.id !== newPulse.id));
      }, 2000);

      // Schedule next pulse at a random interval (2s to 7s)
      const nextDelay = 2000 + Math.random() * 5000;
      return setTimeout(triggerPulse, nextDelay);
    };

    const timer = setTimeout(triggerPulse, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <style>{`
        @keyframes subtlePulse {
          0% { transform: scale(0.5); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .dot-pulse {
          animation: subtlePulse 2s ease-out forwards;
        }
      `}</style>
      {pulses.map(pulse => (
        <div 
          key={pulse.id}
          className="absolute dot-pulse w-[2px] h-[2px] rounded-full"
          style={{ 
            left: `${pulse.x}px`, 
            top: `${pulse.y}px`, 
            backgroundColor: pulse.color,
            boxShadow: `0 0 8px ${pulse.color}`
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundPulse;
import React, { useState, useRef, useEffect, useCallback } from 'react';

type ItemType = 'PHOTO' | 'NOTE';

interface BoardItem {
  id: string;
  type: ItemType;
  src?: string;
  text?: string;
  caption?: string;
  description?: string;
  rotation: string;
  x: number;
  y: number;
  zIndex: number;
  color?: string;
  underlined?: boolean;
}

interface ItemProps {
  item: BoardItem;
  onHover: () => void;
  onDragStart: (e: React.MouseEvent | React.TouchEvent, id: string) => void;
  isDragging: boolean;
}

const Polaroid: React.FC<ItemProps> = ({ item, onHover, onDragStart, isDragging }) => {
  return (
    <div 
      className={`absolute select-none group touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ 
        left: `${item.x}%`, 
        top: `${item.y}%`, 
        zIndex: item.zIndex,
        transform: `translate(-50%, -50%) rotate(${item.rotation})`,
        transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        width: 'var(--item-width-polaroid, 180px)'
      }}
      onMouseDown={(e) => onDragStart(e, item.id)}
      onTouchStart={(e) => onDragStart(e, item.id)}
      onMouseEnter={onHover}
    >
      {/* 3D Push Pin / Magic Pin */}
      <div className="board-pin absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none scale-75 md:scale-100">
        <div className="pin-shadow absolute top-7 left-3 w-4 h-4 bg-black/40 rounded-full blur-[4px] transform skew-x-[20deg]" />
        <div className="pin-head w-5 h-5 rounded-full bg-red-600 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.6),inset_2px_2px_5px_rgba(255,255,255,0.4),0_4px_10px_rgba(0,0,0,0.3)] relative flex items-center justify-center">
          <div className="absolute top-0.5 left-1 w-2 h-2 bg-white/40 rounded-full blur-[0.5px]" />
          <div className="w-1.5 h-1.5 bg-red-800/20 rounded-full border border-red-900/10" />
        </div>
        <div className="w-1.5 h-1 bg-red-800/80 -mt-0.5 rounded-sm shadow-sm" />
        <div className="w-[1.5px] h-3.5 bg-gradient-to-r from-slate-400 to-slate-200 shadow-[0.5px_0_1px_rgba(0,0,0,0.3)]" />
      </div>
      
      <div className={`polaroid-frame bg-[#fcfcfc] p-1.5 md:p-2.5 pb-4 md:pb-6 border border-slate-200/60 shadow-[4px_12px_25px_-10px_rgba(0,0,0,0.4)] ${isDragging ? 'shadow-[15px_40px_70px_-15px_rgba(0,0,0,0.5)] scale-105' : 'group-hover:shadow-[10px_25px_50px_-10px_rgba(0,0,0,0.45)]'} transition-all`}>
        <div className="relative aspect-square overflow-hidden bg-slate-200">
          <img 
            src={item.src} 
            alt={item.caption} 
            className="w-full h-full object-cover pointer-events-none"
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/seed/${item.id}/300/300?grayscale`;
            }}
          />
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2 md:p-4 text-center">
            <p className="font-handwritten text-white text-sm md:text-lg leading-tight">
              {item.description}
            </p>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
        <div className="pt-2 md:pt-3 flex flex-col items-center">
          <p className="font-handwritten text-[10px] md:text-base text-slate-800 tracking-tight leading-none text-center">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
};

const StickyNote: React.FC<ItemProps> = ({ item, onDragStart, isDragging }) => {
  return (
    <div 
      className={`absolute shadow-[2px_10px_25px_-8px_rgba(0,0,0,0.25)] p-3 md:p-6 font-handwritten leading-tight select-none touch-none ${isDragging ? 'cursor-grabbing z-50 scale-105 shadow-[15px_30px_50px_-15px_rgba(0,0,0,0.3)]' : 'cursor-grab hover:scale-105 transition-transform'}`}
      style={{ 
        backgroundColor: item.color, 
        left: `${item.x}%`, 
        top: `${item.y}%`, 
        zIndex: item.zIndex,
        transform: `translate(-50%, -50%) rotate(${item.rotation})`,
        transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        width: 'var(--item-width-note, 176px)',
        height: 'var(--item-width-note, 176px)',
        fontSize: 'var(--item-font-note, 18px)'
      }}
      onMouseDown={(e) => onDragStart(e, item.id)}
      onTouchStart={(e) => onDragStart(e, item.id)}
    >
      <div className="absolute top-0 left-0 right-0 h-2 md:h-4 bg-black/5" />
      <p className={`mt-1 md:mt-2 text-slate-800 ${item.underlined ? 'underline font-bold' : ''}`}>
        {item.text}
      </p>
      <div className="absolute bottom-0 right-0 w-4 md:w-8 h-4 md:h-8 bg-black/10 rounded-tl-full blur-[2px] md:blur-[4px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 md:w-6 h-3 md:h-6 bg-white/10" />
    </div>
  );
};

interface Props {
  onHover: (id: string | null) => void;
}

const LifeBoard: React.FC<Props> = ({ onHover }) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [maxZ, setMaxZ] = useState(100);
  
  const initialItems: BoardItem[] = [
    { id: 'me_01', type: 'PHOTO', src: 'images/google3.jpeg', caption: 'The Architect', description: 'Balancing the logic of Gemini with the chaos of startups.', rotation: '-2deg', x: 15, y: 25, zIndex: 1 },
    { id: 'lapland_01', type: 'PHOTO', src: 'images/lapland.jpeg', caption: 'Arctic Circle', description: 'Testing resilience at sub-zero temperatures.', rotation: '4deg', x: 35, y: 20, zIndex: 2 },
    { id: 'marathon_01', type: 'PHOTO', src: 'images/running.jpeg', caption: 'Persistence', description: 'Marathon #10: Validating the endurance kernel.', rotation: '-8deg', x: 55, y: 22, zIndex: 3 },
    { id: 'rowing_01', type: 'PHOTO', src: 'images/rowing.jpeg', caption: 'Steady State', description: 'Low-latency aquatic consistency training.', rotation: '2deg', x: 75, y: 18, zIndex: 4 },
    { id: 'family_01', type: 'PHOTO', src: 'images/family.jpeg', caption: 'The Core Stack', description: 'The absolute stability layer of the system.', rotation: '-3deg', x: 88, y: 35, zIndex: 5 },
    { id: 'office_01', type: 'PHOTO', src: 'images/google4.jpeg', caption: 'Google HQ', description: 'Building the next billion agentic workflows.', rotation: '6deg', x: 20, y: 65, zIndex: 6 },
    { id: 'speaking_01', type: 'PHOTO', src: 'images/presentation2.jpg', caption: 'Keynote', description: 'Dispersing knowledge on AI orchestration.', rotation: '1deg', x: 45, y: 62, zIndex: 7 },
    { id: 'london_01', type: 'PHOTO', src: 'images/no10.jpeg', caption: 'London Node', description: 'Operations in the capital node.', rotation: '3deg', x: 68, y: 60, zIndex: 8 },
    
    { id: 'note_01', type: 'NOTE', color: '#ffffa1', text: "Don't stop when you're tired. Stop when you're done.", rotation: '-3deg', x: 8, y: 40, zIndex: 21 },
    { id: 'note_02', type: 'NOTE', color: '#ffc0cb', text: "Burnout is unmanaged technical debt.", rotation: '5deg', x: 30, y: 42, zIndex: 22 },
    { id: 'note_03', type: 'NOTE', color: '#b0e0e6', text: "Tabs > Spaces (Accessibility Protocol).", rotation: '-2deg', x: 50, y: 45, zIndex: 23 },
    { id: 'note_04', type: 'NOTE', color: '#d1ffbd', text: "Hydration is Mandatory for Cognitive Uptime.", rotation: '4deg', x: 68, y: 38, zIndex: 24 },
    { id: 'note_05', type: 'NOTE', color: '#ffcc00', text: "It's times like these you learn to live again. It's times like these you give and give again", rotation: '2deg', x: 82, y: 55, zIndex: 25 },
    { id: 'note_06', type: 'NOTE', color: '#f3e5ab', text: "If you can dream it, you can do it", rotation: '-5deg', x: 92, y: 72, zIndex: 26 },
    { id: 'note_07', type: 'NOTE', color: '#ffd1dc', text: "Nobody cares what you did yesterday. What have you done today to better yourself?", rotation: '6deg', x: 40, y: 88, zIndex: 27 },
    { id: 'note_08', type: 'NOTE', color: '#e6e6fa', text: "There goes my hero, he's ordinary", rotation: '-4deg', x: 12, y: 85, zIndex: 28 },
    { id: 'note_10', type: 'NOTE', color: '#caffbf', text: "Consistency > Intensity", rotation: '-1deg', x: 62, y: 82, zIndex: 31 },
    { id: 'note_evil', type: 'NOTE', color: '#ff4d4d', text: "DON'T BE EVIL!!!!", rotation: '2deg', x: 92, y: 12, zIndex: 30, underlined: true },
  ];

  const [items, setItems] = useState<BoardItem[]>(initialItems);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const onDragStart = (e: React.MouseEvent | React.TouchEvent, id: string) => {
    const board = boardRef.current;
    if (!board) return;
    
    setDraggingId(id);
    const rect = board.getBoundingClientRect();
    const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
    
    const item = items.find(s => s.id === id);
    if (!item) return;

    const nextZ = maxZ + 1;
    setMaxZ(nextZ);
    setItems(prev => prev.map(s => s.id === id ? { ...s, zIndex: nextZ } : s));

    const currentXPercent = (clientX - rect.left) / rect.width * 100;
    const currentYPercent = (clientY - rect.top) / rect.height * 100;
    
    setDragOffset({
      x: currentXPercent - item.x,
      y: currentYPercent - item.y
    });
  };

  const onDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!draggingId || !boardRef.current) return;

    const board = boardRef.current;
    const rect = board.getBoundingClientRect();
    const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;

    const item = items.find(i => i.id === draggingId);
    if (!item) return;

    const newX = ((clientX - rect.left) / rect.width * 100) - dragOffset.x;
    const newY = ((clientY - rect.top) / rect.height * 100) - dragOffset.y;

    setItems(prev => prev.map(s => 
      s.id === draggingId ? { ...s, x: Math.max(-5, Math.min(105, newX)), y: Math.max(0, Math.min(100, newY)) } : s
    ));
  }, [draggingId, dragOffset, items]);

  const onDragEnd = useCallback(() => {
    setDraggingId(null);
  }, []);

  useEffect(() => {
    if (draggingId) {
      window.addEventListener('mousemove', onDragMove);
      window.addEventListener('mouseup', onDragEnd);
      window.addEventListener('touchmove', onDragMove, { passive: false });
      window.addEventListener('touchend', onDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchmove', onDragMove);
      window.removeEventListener('touchend', onDragEnd);
    };
  }, [draggingId, onDragMove, onDragEnd]);

  return (
    <section 
      className="relative overflow-visible" 
      onMouseEnter={() => onHover('LIFE_BOARD')}
      onMouseLeave={() => onHover(null)}
    >
      <div className="mb-6 max-w-7xl mx-auto px-6">
        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-slate-400 mb-2">/usr/bin/memories</h2>
        <h3 className="text-3xl font-bold">Physical Persistence Layer</h3>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500&display=swap');
        
        :root {
          --item-width-polaroid: 140px;
          --item-width-note: 140px;
          --item-font-note: 16px;
          --board-height: 700px;
          --trim-height: 24px;
        }

        @media (min-width: 768px) {
          :root {
            --item-width-polaroid: 220px;
            --item-width-note: 200px;
            --item-font-note: 20px;
            --board-height: 1000px;
            --trim-height: 36px;
          }
        }

        .font-handwritten {
          font-family: 'Caveat', cursive;
        }

        .cork-wall {
          background-color: #b59263;
          background-image: 
            radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 1.5px, transparent 1.5px),
            url('https://www.transparenttextures.com/patterns/dark-leather.png');
          background-size: 24px 24px, auto;
          box-shadow: inset 0 0 150px rgba(0,0,0,0.3);
          position: relative;
          width: 100vw;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
        }

        .wood-trim {
          height: var(--trim-height);
          background: linear-gradient(to bottom, #3d2b1e, #2d1f16);
          border-bottom: 2px solid rgba(255,255,255,0.05);
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }

        .wood-trim-bottom {
          height: var(--trim-height);
          background: linear-gradient(to top, #3d2b1e, #2d1f16);
          border-top: 2px solid rgba(255,255,255,0.1);
          box-shadow: 0 -4px 12px rgba(0,0,0,0.3);
        }

        .board-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          mix-blend-mode: multiply;
          opacity: 0.12;
          background-image: url('https://grainy-gradients.vercel.app/noise.svg');
        }

        /* Disney Mode Specific Overrides for LifeBoard */
        .disney-mode .cork-wall {
          background-color: #312e81 !important;
          background-image: radial-gradient(circle at 50% 50%, rgba(253, 224, 71, 0.1) 2px, transparent 2px) !important;
          box-shadow: inset 0 0 150px rgba(0,0,0,0.6) !important;
        }
        .disney-mode .wood-trim, .disney-mode .wood-trim-bottom {
          background: linear-gradient(to bottom, #fde047, #ca8a04) !important;
          border-color: #fefce8 !important;
        }
        .disney-mode .board-pin .pin-head {
          background-color: #fde047 !important;
          box-shadow: 0 0 15px #fde047 !important;
          border-radius: 0 !important;
          clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%) !important;
        }
        .disney-mode .polaroid-frame {
          border-color: #fde047 !important;
          border-radius: 1rem !important;
          box-shadow: 0 0 20px rgba(253, 224, 71, 0.3) !important;
        }
        .disney-mode .sticky-note {
          border-radius: 20px 4px 20px 4px !important;
        }
      `}</style>

      <div className="cork-wall shadow-2xl overflow-hidden" style={{ height: 'var(--board-height)' }}>
        <div className="wood-trim w-full relative z-20" />
        
        <div 
          ref={boardRef}
          className="relative w-full h-full overflow-hidden"
          style={{ height: 'calc(var(--board-height) - (var(--trim-height) * 2))' }}
        >
          <div className="board-overlay" />
          
          {items.map((item) => (
            item.type === 'PHOTO' ? (
              <Polaroid 
                key={item.id}
                item={item}
                onHover={() => onHover(`PHOTO_${item.id.toUpperCase()}`)}
                onDragStart={onDragStart}
                isDragging={draggingId === item.id}
              />
            ) : (
              <StickyNote 
                key={item.id}
                item={item}
                onHover={() => onHover(`NOTE_${item.id.toUpperCase()}`)}
                onDragStart={onDragStart}
                isDragging={draggingId === item.id}
              />
            )
          ))}

          <div className="absolute bottom-10 right-12 px-8 py-4 bg-black/90 backdrop-blur-md shadow-2xl rotate-2 border border-white/10 flex flex-col items-center justify-center font-mono text-[10px] text-white/90 uppercase tracking-[0.3em] z-0 pointer-events-none">
            <span className="text-blue-400 font-bold mb-1">Status: Persistent</span>
            <span>Human_Hardware_Gallery</span>
          </div>
        </div>

        <div className="wood-trim-bottom w-full relative z-20" />
      </div>
    </section>
  );
};

export default LifeBoard;
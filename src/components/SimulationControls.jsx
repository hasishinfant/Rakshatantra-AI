import React from 'react';
import { Smartphone, Zap, UserMinus, AlertCircle, ShieldOff } from 'lucide-react';
import { useBehaviorStore } from '../store/useBehaviorStore';

const SimulationControls = () => {
  const { isSimulating, setSimulationMode } = useBehaviorStore();

  const controls = [
    { id: 'phone', label: 'Phone Usage', icon: <Smartphone size={14} />, color: 'text-neon-red' },
    { id: 'noHelmet', label: 'No Helmet', icon: <ShieldOff size={14} />, color: 'text-neon-red' },
    { id: 'idle', label: 'Idle Behavior', icon: <UserMinus size={14} />, color: 'text-neon-yellow' },
    { id: 'fatigue', label: 'Fatigue Mode', icon: <Zap size={14} />, color: 'text-neon-red' },
  ];

  return (
    <div className="flex flex-col h-[220px] shrink-0 border-t border-white/5 bg-bg-deep/30">
      <div className="px-3 py-2 bg-bg-deep/80 border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2 font-hud text-[10px] text-neon-blue font-bold tracking-widest uppercase">
          <div className="w-0.5 h-3 bg-neon-blue" />
          Alert Simulation History
        </div>
        <span className="text-[8px] text-text-muted font-mono uppercase">Developer Override</span>
      </div>

      <div className="p-4 grid grid-cols-2 gap-2 flex-1">
        {controls.map((c) => (
          <button
            key={c.id}
            onClick={() => setSimulationMode(c.id, !isSimulating[c.id])}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 group ${
              isSimulating[c.id]
                ? 'bg-neon-red/10 border-neon-red/40 text-neon-red shadow-[0_0_15px_rgba(255,51,102,0.15)]'
                : 'bg-bg-elevated border-white/5 text-text-muted hover:border-white/20 hover:text-text-primary'
            }`}
          >
            <div className={`p-1.5 rounded-md ${isSimulating[c.id] ? 'bg-neon-red/20' : 'bg-white/5'}`}>
              {c.icon}
            </div>
            <div className="text-left">
              <div className="text-[9px] font-hud font-bold tracking-tighter uppercase leading-none">
                {c.label}
              </div>
              <div className="text-[7px] mt-1 font-mono uppercase tracking-widest opacity-40">
                {isSimulating[c.id] ? 'ACTIVE_TRG' : 'READY_TRG'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SimulationControls;

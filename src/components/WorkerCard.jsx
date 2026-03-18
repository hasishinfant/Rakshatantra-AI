import { useState } from 'react';
import { motion as Motion } from 'framer-motion';

const WorkerCard = ({ worker }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const getStatusStyle = (status) => {
    const s = status.toLowerCase();
    if (s.includes('safe')) return { color: 'var(--green)', bg: 'rgba(0,255,157,0.12)', label: 'SAFE' };
    if (s.includes('warning')) return { color: 'var(--amber)', bg: 'rgba(255,179,0,0.12)', label: 'WARNING' };
    return { color: 'var(--red)', bg: 'rgba(255,51,102,0.12)', label: 'AT RISK' };
  };

  const renderRiskFill = (risk) => {
    if (risk < 30) return 'linear-gradient(90deg,var(--green),rgba(0,255,157,0.4))';
    if (risk < 60) return 'linear-gradient(90deg,var(--amber),rgba(255,179,0,0.4))';
    return 'linear-gradient(90deg,var(--red),rgba(255,51,102,0.4))';
  };

  const ss = getStatusStyle(worker.status);

  return (
    <div 
      className="perspective-1000 w-full h-[180px] cursor-pointer" 
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <Motion.div
        className="relative w-full h-full transition-all duration-700 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* FRONT */}
        <div className={`absolute inset-0 backface-hidden bg-bg-card rounded-lg border border-white/10 p-4 overflow-hidden status-${worker.status.toLowerCase().includes('safe') ? 'safe' : worker.status.toLowerCase().includes('warning') ? 'warning' : 'risk'}`}>
          <div 
            className="absolute top-0 left-0 right-0 h-[3px] rounded-t-lg transition-all" 
            style={{ background: ss.color }}
          />
          
          {/* HUD Corners */}
          <div className="hud-corner hud-tl" />
          <div className="hud-corner hud-tr" />
          <div className="hud-corner hud-bl" />
          <div className="hud-corner hud-br" />

          <div className="flex gap-3 mb-2">
            <div 
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center font-hud text-xs font-bold shrink-0"
              style={{ borderColor: worker.color, color: worker.color, background: `${worker.color}18` }}
            >
              {worker.avatar}
            </div>
            <div className="min-w-0">
              <div className="font-hud text-[11px] font-bold text-text-primary whitespace-nowrap overflow-hidden text-ellipsis">{worker.name}</div>
              <div className="text-[9px] text-text-muted font-mono tracking-tighter">{worker.id} · {worker.role}</div>
              <div 
                className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-1.5 rounded-sm font-hud text-[8px] font-bold border border-white/10"
                style={{ backgroundColor: ss.bg, color: ss.color, borderColor: `${ss.color}40` }}
              >
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: ss.color }} />
                {ss.label}
              </div>
            </div>
          </div>

          <div className="mt-2">
            <div className="flex justify-between font-hud text-[8px] text-text-muted mb-1">
              <span>RISK SCORE</span>
              <span style={{ color: worker.riskScore > 60 ? 'var(--red)' : worker.riskScore > 30 ? 'var(--amber)' : 'var(--green)' }}>
                {worker.riskScore}%
              </span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <Motion.div 
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${worker.riskScore}%` }}
                style={{ background: renderRiskFill(worker.riskScore) }}
              />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between bg-black/30 rounded-md px-2 py-1.5 border border-white/5">
            <div>
              <div className="text-[7px] text-text-muted font-hud tracking-widest uppercase">Safety Credits</div>
              <div className="text-sm font-hud font-black leading-none mt-1" style={{ color: worker.color }}>
                {worker.creditScore}
              </div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={worker.color} strokeWidth="2.5" className="opacity-40">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 backface-hidden bg-bg-elevated rounded-lg border border-neon-blue/20 p-4 transform-[rotateY(180deg)]">
          <div className="hud-corner hud-tl" />
          <div className="hud-corner hud-tr" />
          <div className="hud-corner hud-bl" />
          <div className="hud-corner hud-br" />
          
          <div className="font-hud text-[9px] text-text-muted tracking-widest uppercase mb-3">{worker.id} · PROFILE</div>
          
          <div className="space-y-3">
            <div>
              <div className="text-[8px] text-text-muted font-hud uppercase tracking-tighter">Last Alert</div>
              <div className="text-[10px] text-neon-yellow font-bold mt-0.5 animate-pulse">{worker.lastAlert}</div>
            </div>
            
            <div>
              <div className="text-[8px] text-text-muted font-hud uppercase tracking-tighter">Behavior Insights</div>
              <div className="flex flex-wrap gap-1 mt-1">
                {worker.insights?.map((insight, idx) => (
                  <span 
                    key={idx}
                    className="px-1.5 py-0.5 rounded-sm border border-white/10 text-[7px] font-bold"
                    style={{ borderColor: `${worker.color}40`, color: worker.color, backgroundColor: `${worker.color}0d` }}
                  >
                    {insight}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[8px] text-text-muted font-hud uppercase tracking-tighter">Operating Zone</div>
              <div className="text-[10px] text-text-primary mt-0.5 font-bold">{worker.zone}</div>
            </div>
          </div>

          <div className="absolute bottom-2 left-0 right-0 text-[7px] text-text-muted text-center font-hud uppercase tracking-widest">
            Tap to flip back
          </div>
        </div>
      </Motion.div>
    </div>
  );
};

export default WorkerCard;

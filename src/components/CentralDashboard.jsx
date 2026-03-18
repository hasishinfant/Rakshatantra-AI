import React, { useEffect, useRef } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldCheck, AlertTriangle, TrendingUp, Zap, Clock, MapPin } from 'lucide-react';
import { useBehaviorStore } from '../store/useBehaviorStore';
import { useVoiceAlerts } from '../hooks/useVoiceAlerts';

const CentralDashboard = () => {
  const { currentUser, alerts, isSimulating } = useBehaviorStore();
  const { alertVoice } = useVoiceAlerts();
  const personalAlerts = alerts.filter(a => a.workerId === currentUser.id);
  const activeSimulation = Object.values(isSimulating).some(v => v);
  const lastSimState = useRef(false);

  useEffect(() => {
    if (activeSimulation && !lastSimState.current) {
      // Find the specific active simulation to play correct voice
      const type = Object.keys(isSimulating).find(k => isSimulating[k]);
      if (type) alertVoice(type);
    }
    lastSimState.current = activeSimulation;
  }, [activeSimulation, alertVoice, isSimulating]);

  return (
    <div className="flex-1 p-8 flex flex-col gap-6 overflow-hidden relative">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* BIG ALERT MESSAGE OVERLAY */}
      <AnimatePresence>
        {activeSimulation && (
          <Motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-x-8 top-8 z-50 bg-neon-red/10 border-2 border-neon-red backdrop-blur-xl rounded-2xl p-6 shadow-[0_0_50px_rgba(255,51,102,0.3)] flex items-center gap-6"
          >
             <div className="w-16 h-16 rounded-full bg-neon-red/20 flex items-center justify-center animate-pulse border-2 border-neon-red/40">
                <AlertTriangle size={36} className="text-neon-red" />
             </div>
             <div>
                <div className="font-hud text-xl font-black text-neon-red tracking-widest uppercase">CRITICAL SAFETY VIOLATION</div>
                <div className="font-hud text-[10px] text-text-primary mt-1 tracking-widest">IMMEDIATE ACTION REQUIRED // PERSONNEL {currentUser.id} // ZONE {currentUser.zone}</div>
             </div>
             <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-neon-red text-bg-void font-hud font-black text-xs rounded-lg tracking-widest uppercase">
                <Clock size={14} />
                SEC_INITIATED
             </div>
          </Motion.div>
        )}
      </AnimatePresence>

      {/* MAIN TOP METRICS ROW */}
      <div className="grid grid-cols-3 gap-6 h-40 shrink-0">
         <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col justify-between group hover:border-neon-blue/30 transition-all">
            <div className="flex justify-between items-start">
               <div className="p-2 bg-neon-blue/10 rounded-lg text-neon-blue">
                  <TrendingUp size={20} />
               </div>
               <div className="text-[10px] font-hud text-text-muted tracking-widest uppercase">Productivity Index</div>
            </div>
            <div className="flex items-baseline gap-2">
               <div className="text-4xl font-hud font-black text-text-primary">92.4</div>
               <div className="text-xs text-neon-green font-hud">▲ 4%</div>
            </div>
         </div>
         
         <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col justify-between group hover:border-neon-green/30 transition-all">
            <div className="flex justify-between items-start">
               <div className="p-2 bg-neon-green/10 rounded-lg text-neon-green">
                  <ShieldCheck size={20} />
               </div>
               <div className="text-[10px] font-hud text-text-muted tracking-widest uppercase">Compliance Level</div>
            </div>
            <div className="flex items-baseline gap-2">
               <div className="text-4xl font-hud font-black text-text-primary">98.1<span className="text-lg">%</span></div>
               <div className="text-xs text-neon-green font-hud">EXCELLENT</div>
            </div>
         </div>

         <div className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col justify-between group hover:border-neon-red/30 transition-all">
            <div className="flex justify-between items-start">
               <div className="p-2 bg-neon-red/10 rounded-lg text-neon-red">
                  <Activity size={20} />
               </div>
               <div className="text-[10px] font-hud text-text-muted tracking-widest uppercase">Energy Reserve</div>
            </div>
            <div className="flex items-baseline gap-2">
               <div className="text-4xl font-hud font-black text-text-primary">64<span className="text-lg">%</span></div>
               <div className="text-xs text-neon-yellow font-hud">MODERATE</div>
            </div>
         </div>
      </div>

      {/* MID SECTION: RECENT ACTIVITY & ZONE STATUS */}
      <div className="flex-1 grid grid-cols-[1fr_300px] gap-6 overflow-hidden">
         <div className="glass-panel rounded-3xl border border-white/5 flex flex-col overflow-hidden">
            <div className="p-4 bg-bg-deep/80 border-b border-white/5 flex justify-between items-center">
               <div className="font-hud text-[10px] text-neon-blue font-bold tracking-widest uppercase">Live Activity Timeline</div>
               <span className="text-[8px] text-text-muted font-mono uppercase tracking-widest">REAL-TIME DATA SYNC ACTIVE</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
               {personalAlerts.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center opacity-30 gap-4">
                    <Activity size={48} className="text-neon-blue" />
                    <p className="font-hud text-[10px] tracking-widest">NO ANOMALIES DETECTED IN TIMELINE</p>
                 </div>
               ) : (
                 personalAlerts.map((alert, i) => (
                   <div key={i} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                         <div className="w-2 h-2 rounded-full bg-neon-red shadow-[0_0_8px_rgba(255,51,102,0.6)]" />
                         <div className="w-0.5 flex-1 bg-white/5 my-1" />
                      </div>
                      <div className="flex-1 pb-4">
                         <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-hud font-bold text-neon-red uppercase">{alert.reason}</span>
                            <span className="text-[8px] font-mono text-text-muted">{alert.timestamp}</span>
                         </div>
                         <div className="text-[9px] text-text-muted bg-white/5 p-2 rounded border border-white/5">
                            Automated safety intervention recorded. Bonus points impact: -15.
                         </div>
                      </div>
                   </div>
                 ))
               )}
            </div>
         </div>

         <div className="glass-panel rounded-3xl border border-white/5 flex flex-col p-6 gap-6">
            <div>
               <div className="text-[10px] font-hud text-text-muted tracking-widest uppercase mb-4 flex items-center gap-2">
                  <MapPin size={12} className="text-neon-blue" />
                  Regional Zone Status
               </div>
               <div className="space-y-3">
                  {['Zone A', 'Zone B', 'Zone C', 'Zone D'].map(zone => (
                    <div key={zone} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
                       <span className="text-[10px] font-hud tracking-widest text-text-primary uppercase">{zone}</span>
                       <div className={`px-2 py-0.5 rounded text-[8px] font-bold ${zone === currentUser.zone ? 'bg-neon-blue/20 text-neon-blue' : 'bg-neon-green/10 text-neon-green'}`}>
                          {zone === currentUser.zone ? 'CURRENT' : 'STABLE'}
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="mt-auto bg-neon-blue/5 border border-neon-blue/20 rounded-2xl p-4">
               <div className="text-[9px] font-hud font-bold text-neon-blue tracking-widest uppercase mb-2">Safety Tip</div>
               <p className="text-[9px] leading-relaxed text-text-muted italic">"Maintaining proper hydration in Zone A increases productivity index by up to 12%."</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default CentralDashboard;

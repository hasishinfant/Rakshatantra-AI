import React, { useState, useEffect } from 'react';
import SimulationControls from './components/SimulationControls';
import WorkerCard from './components/WorkerCard';
import AIAssistant from './components/AIAssistant';
import CentralDashboard from './components/CentralDashboard';
import Login from './components/Login';
import { useBehaviorStore } from './store/useBehaviorStore';
import { ShieldCheck, LogOut, Bell, AlertTriangle, Zap, IndianRupee, Activity } from 'lucide-react';

function App() {
  const { 
    isAuthenticated, 
    currentUser, 
    logout, 
    alerts, 
    language 
  } = useBehaviorStore();
  
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-IN', { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-IN', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isAuthenticated) {
    return <Login />;
  }

  const bonus = (currentUser.creditScore * 0.5).toFixed(2);

  return (
    <div className="h-screen bg-bg-void text-text-primary font-body overflow-hidden flex flex-col">
      {/* ── PERSONAL HUD HEADER ── */}
      <header className="h-16 border-b border-border-bright bg-linear-to-b from-bg-deep to-bg-deep/95 px-6 flex items-center justify-between z-50 shadow-[0_0_30px_rgba(0,229,255,0.08)]">
        <div className="flex items-center gap-4">
          <div className="text-neon-blue drop-shadow-[0_0_8px_var(--cyan)]">
            <ShieldCheck size={32} />
          </div>
          <div>
            <div className="font-hud text-sm font-bold tracking-widest text-neon-blue uppercase">
              Raksha<span className="text-neon-green">Tantra</span> AI
            </div>
            <div className="text-[9px] text-text-muted tracking-widest uppercase font-hud">Official Personnel Dashboard</div>
          </div>
        </div>

        <div className="flex items-center gap-8">
           <div className="flex items-center gap-6 border-x border-white/5 px-8">
              <div className="flex flex-col items-center">
                 <div className="text-[8px] text-text-muted font-hud uppercase tracking-tighter mb-1">Live Identity</div>
                 <div className="text-xs font-hud font-bold text-text-primary">{currentUser.name}</div>
              </div>
              <div className="flex flex-col items-center">
                 <div className="text-[8px] text-text-muted font-hud uppercase tracking-tighter mb-1">Base ID</div>
                 <div className="text-xs font-hud font-bold text-neon-blue">{currentUser.id}</div>
              </div>
           </div>

           <div className="flex flex-col items-end">
              <div className="text-[10px] text-neon-blue font-hud tracking-widest">{time}</div>
              <div className="flex items-center gap-1.5 mt-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                 <span className="text-[8px] text-text-muted font-hud tracking-widest uppercase">Sync Active</span>
              </div>
           </div>

           <button 
             onClick={logout}
             className="p-2.5 rounded-xl border border-white/5 bg-white/5 hover:bg-neon-red/10 hover:border-neon-red/30 hover:text-neon-red transition-all group"
           >
             <LogOut size={18} />
           </button>
        </div>
      </header>

      {/* ── WORKER EXPERIENCE LAYOUT ── */}
      <main className="flex-1 w-full grid grid-cols-[380px_1fr_360px] overflow-hidden">
        
        {/* LEFT PANEL: PROFILE & METRICS */}
        <section className="border-r border-white/5 flex flex-col overflow-hidden bg-bg-panel/50">
           <div className="p-4 bg-bg-deep/80 border-b border-white/5 flex items-center gap-2">
              <Bell size={14} className="text-neon-blue" />
              <div className="font-hud text-[10px] text-neon-blue font-bold tracking-widest uppercase">Personnel Profile</div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 custom-scrollbar">
              <div className="mx-auto w-full max-w-[280px]">
                 <WorkerCard worker={currentUser} />
              </div>

              <div className="space-y-4">
                 <div className="bg-bg-card border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                       <Zap size={40} className="text-neon-yellow" />
                    </div>
                    <div className="text-[9px] text-text-muted font-hud tracking-widest uppercase mb-2">Performance Bonus</div>
                    <div className="flex items-baseline gap-2">
                       <span className="text-2xl font-hud font-black text-neon-green flex items-center gap-1">
                          <IndianRupee size={20} />
                          {bonus}
                       </span>
                       <span className="text-[10px] text-text-muted">Accumulated</span>
                    </div>
                    <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-neon-green w-[70%] shadow-[0_0_10px_rgba(0,255,157,0.3)]" />
                    </div>
                    <p className="text-[9px] text-text-muted mt-3">Next payout cycle: 12 days. Current compliance: 98%.</p>
                 </div>

                 <div className="bg-bg-card border border-white/5 rounded-2xl p-5">
                    <div className="text-[9px] text-text-muted font-hud tracking-widest uppercase mb-4">Hazards in Your Zone ({currentUser.zone})</div>
                    <div className="space-y-3">
                       {alerts.filter(a => a.workerId === currentUser.id).length === 0 ? (
                         <div className="text-[10px] text-text-muted italic flex items-center gap-2 bg-neon-green/5 p-3 rounded-lg border border-neon-green/10">
                            <ShieldCheck size={14} className="text-neon-green" />
                            No active hazards reported for your ID.
                         </div>
                       ) : (
                         alerts.filter(a => a.workerId === currentUser.id).map((alert, i) => (
                           <div key={i} className="bg-neon-red/5 border border-neon-red/20 p-3 rounded-lg flex gap-3 animate-in fade-in duration-300">
                              <AlertTriangle size={14} className="text-neon-red shrink-0 mt-0.5" />
                              <div>
                                 <div className="text-[10px] font-bold text-text-primary capitalize">{alert.reason}</div>
                                 <div className="text-[8px] text-text-muted mt-0.5">{alert.timestamp} · Action Required</div>
                              </div>
                           </div>
                         ))
                       )}
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* CENTER PANEL: ANALYTICS DASHBOARD */}
        <section className="flex flex-col overflow-hidden bg-bg-void relative">
           <div className="p-4 bg-bg-deep/80 border-b border-white/5 flex justify-between items-center shrink-0 z-20">
              <div className="flex items-center gap-2 font-hud text-[10px] text-neon-blue font-bold tracking-widest uppercase">
                 <Activity size={14} />
                 Safety Command Dashboard
              </div>
              <div className="text-[9px] text-text-muted font-mono uppercase tracking-[0.2em]">{currentUser.zone} — Node Active</div>
           </div>

           <CentralDashboard />
        </section>

        {/* RIGHT PANEL: AI ASSISTANT & SOS */}
        <section className="border-l border-white/5 flex flex-col overflow-hidden bg-bg-panel/50">
           <AIAssistant />
           
           <div className="p-4 mt-auto">
              <SimulationControls />
           </div>
        </section>

      </main>

    </div>
  );
}

export default App;

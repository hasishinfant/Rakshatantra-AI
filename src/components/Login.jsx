import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, User, Key, ArrowRight, Activity } from 'lucide-react';
import { useBehaviorStore } from '../store/useBehaviorStore';

const Login = () => {
  const [name, setName] = useState('');
  const [workerId, setWorkerId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useBehaviorStore((state) => state.login);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(name, workerId);
      if (!success) {
        setError('Invalid Identity. Please check Name and Worker ID.');
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-bg-void flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background HUD elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-neon-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-red/5 rounded-full blur-3xl" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel w-full max-w-md rounded-3xl p-8 relative z-10 border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="hud-corner hud-tl" />
        <div className="hud-corner hud-tr" />
        <div className="hud-corner hud-bl" />
        <div className="hud-corner hud-br" />

        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-neon-blue/20 to-purple-500/20 border-2 border-neon-blue/40 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
            <ShieldCheck size={40} className="text-neon-blue" />
          </div>
          <h1 className="font-hud text-2xl font-bold tracking-[0.2em] text-neon-blue text-center">
            RAKSHA<span className="text-neon-green">TANTRA</span>
          </h1>
          <p className="text-[10px] text-text-muted font-hud tracking-widest mt-2 uppercase">Worker Experience Portal v2.4.1</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-hud text-text-muted tracking-widest uppercase ml-1">Personnel Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rajesh Kumar"
                className="w-full bg-bg-elevated/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-text-primary outline-none focus:border-neon-blue/40 transition-all placeholder:text-text-muted/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-hud text-text-muted tracking-widest uppercase ml-1">Worker Identity ID</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input
                type="text"
                required
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
                placeholder="e.g. W001"
                className="w-full bg-bg-elevated/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-text-primary font-mono outline-none focus:border-neon-blue/40 transition-all placeholder:text-text-muted/50"
              />
            </div>
          </div>

          {error && (
             <motion.div 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-neon-red/10 border border-neon-red/30 rounded-lg p-3 text-[11px] text-neon-red flex items-center gap-2"
             >
               <Activity size={14} />
               {error}
             </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 bg-neon-blue/10 border border-neon-blue/30 rounded-xl relative group overflow-hidden transition-all hover:bg-neon-blue hover:text-black shadow-[0_0_20px_rgba(0,229,255,0.1)] active:scale-95 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <span className="relative font-hud font-bold tracking-widest flex items-center justify-center gap-2">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  INITIALIZE SESSION
                  <ArrowRight size={18} />
                </>
              )}
            </span>
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-[8px] font-hud text-text-muted tracking-[0.2em] uppercase">
          <div>Geo-sync: Active</div>
          <div>Sec-Level: 4A</div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

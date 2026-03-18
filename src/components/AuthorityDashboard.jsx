import React from 'react';
import { useBehaviorStore } from '../store/useBehaviorStore';
import { Shield, AlertCircle, Clock } from 'lucide-react';

const AuthorityDashboard = () => {
  const { workers, alerts } = useBehaviorStore();

  return (
    <div className="flex flex-col gap-6">
      <div className="glass-panel p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-mono text-neon-blue uppercase tracking-widest flex items-center gap-2">
            <Shield size={14} /> Active Workforce Monitoring
          </h3>
          <span className="text-[10px] font-mono text-white/40">Total Workers: {workers.length}</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[12px]">
            <thead>
              <tr className="border-b border-white/5 text-white/40">
                <th className="pb-3 font-medium uppercase tracking-tighter">Worker</th>
                <th className="pb-3 font-medium uppercase tracking-tighter">Status</th>
                <th className="pb-3 font-medium uppercase tracking-tighter text-right">Credit</th>
              </tr>
            </thead>
            <tbody>
              {workers.map((w) => (
                <tr key={w.id} className="border-b border-white/5 last:border-0">
                  <td className="py-3 font-bold">{w.name}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      w.status.includes('✅') ? 'bg-green-500/10 text-green-400' :
                      w.status.includes('⚠️') ? 'bg-yellow-500/10 text-yellow-400' : 'bg-neon-red/10 text-neon-red'
                    }`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="py-3 text-right font-mono text-neon-blue">{w.creditScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-xl overflow-hidden flex flex-col gap-4">
        <h3 className="text-[10px] font-mono text-neon-red uppercase tracking-widest flex items-center gap-2">
          <AlertCircle size={14} /> Intelligent Alert Log
        </h3>
        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2">
          {alerts.length === 0 ? (
            <div className="text-center py-10 text-white/20 text-xs italic">No high-risk alerts detected</div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="p-3 bg-white/5 border border-white/5 rounded-lg flex gap-4 animate-in slide-in-from-right duration-500">
                <div className="w-16 h-12 rounded bg-black border border-white/10 overflow-hidden shrink-0 relative">
                  {alert.snapshot ? (
                    <img src={alert.snapshot} alt="Snapshot" className="w-full h-full object-cover grayscale" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] text-white/20">NO IMG</div>
                  )}
                  <div className="absolute inset-0 border border-neon-red/30" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black">{alert.reason}</span>
                    <span className="text-[8px] font-mono text-white/40 flex items-center gap-1">
                      <Clock size={8} /> {alert.timestamp}
                    </span>
                  </div>
                  <div className="text-[10px] text-white/50 mt-1">{alert.workerName} - {alert.severity} Risk</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorityDashboard;

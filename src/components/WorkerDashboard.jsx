import React from 'react';
import { useBehaviorStore } from '../store/useBehaviorStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { calculateBonus } from '../utils/behaviorAnalysis';
import { CreditCard, Target, AlertTriangle } from 'lucide-react';

const WorkerDashboard = () => {
  const worker = useBehaviorStore((state) => state.workers[0]);

  const stats = [
    { label: 'Credit Points', value: worker.creditScore, icon: <CreditCard />, color: 'text-neon-blue', sub: `Est. Bonus: ₹${calculateBonus(worker.creditScore)}` },
    { label: 'Focus Score', value: `${worker.focusScore}%`, icon: <Target />, color: 'text-green-400', sub: worker.focusScore > 80 ? 'Excellent performance' : 'Try to minimize distractions' },
    { label: 'Risk Score', value: `${worker.riskScore}%`, icon: <AlertTriangle />, color: 'text-neon-red', sub: worker.riskScore > 50 ? 'High risk detected' : 'Safe status' },
  ];

  /* Mock mapping of history to chart data */
  const chartData = worker.history.focus.map((f, i) => ({
    name: i,
    focus: f,
    risk: worker.history.risk[i],
  }));

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-4 right-4 text-white/10 group-hover:text-white/20 transition-all duration-300">
              {stat.icon}
            </div>
            <div className="text-[10px] font-mono text-neon-blue uppercase tracking-widest mb-1">{stat.label}</div>
            <div className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-[10px] text-white/40 font-medium">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 rounded-xl h-[280px]">
        <div className="text-[10px] font-mono text-neon-blue uppercase tracking-widest mb-4">Behavioral Trend Analysis</div>
        <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" hide />
              <YAxis hide domain={[0, 100]} />
              <Tooltip 
                contentStyle={{ background: '#000', border: '1px solid rgba(0,242,255,0.2)', color: '#fff', fontSize: '10px' }}
                itemStyle={{ color: '#00f2ff' }}
               />
              <Line type="monotone" dataKey="focus" stroke="#00f2ff" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="risk" stroke="#ff0055" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;

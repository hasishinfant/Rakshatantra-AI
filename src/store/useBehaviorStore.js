import { create } from 'zustand';

export const useBehaviorStore = create((set, get) => ({
  workers: [
    {id:'W001',name:'Rajesh Kumar',role:'Welder',zone:'Zone A',avatar:'RK',color:'#00e5ff',creditScore:870,riskScore:8,status:'safe',lastActive:new Date().toISOString(),lastAlert:'—',insights:['Consistent PPE adherence','Active 6h today'], location: 'Section A', history: { focus: [80, 85, 90, 95, 100], patterns: "Consistent performance" }},
    {id:'W002',name:'Priya Devi',role:'Inspector',zone:'Zone B',avatar:'PD',color:'#00ff9d',creditScore:920,riskScore:5,status:'safe',lastActive:new Date().toISOString(),lastAlert:'—',insights:['Best safety record','Zero violations this week'], location: 'Section B', history: { focus: [90, 95, 100], patterns: "Leader in safety" }},
    {id:'W003',name:'Mahesh Rao',role:'Operator',zone:'Zone A',avatar:'MR',color:'#ffb300',creditScore:640,riskScore:52,status:'warning',lastActive:new Date().toISOString(),lastAlert:'Helmet missing 14:32',insights:['Fatigue patterns at 3PM','Needs PPE reminder'], location: 'Section A', history: { focus: [70, 60, 50], patterns: "Fatigue at 3PM" }},
    {id:'W004',name:'Suresh Naik',role:'Technician',zone:'Zone C',avatar:'SN',color:'#ff3366',creditScore:410,riskScore:78,status:'risk',lastActive:new Date().toISOString(),lastAlert:'High fatigue 13:55',insights:['Frequent inactivity','Fatigue risk after noon'], location: 'Section C', history: { focus: [40, 30, 20], patterns: "Noon fatigue risk" }},
  ],
  alerts: [],
  language: 'en', // 'en', 'hi', 'kn', 'ta'
  isAuthenticated: false,
  currentUser: null,
  isSimulating: {
    phone: false,
    idle: false,
    fatigue: false,
    noHelmet: false,
  },

  setLanguage: (lang) => set({ language: lang }),
  
  login: (name, id) => {
    const { workers } = get();
    const worker = workers.find(w => 
      w.name.toLowerCase() === name.toLowerCase() && 
      w.id.toLowerCase() === id.toLowerCase()
    );
    if (worker) {
      set({ currentUser: worker, isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => set({ currentUser: null, isAuthenticated: false }),

  updateWorkerScore: (workerId, scores) => set((state) => ({
    workers: state.workers.map((w) => 
      w.id === workerId ? { ...w, ...scores } : w
    )
  })),

  addAlert: (alert) => set((state) => ({
    alerts: [alert, ...state.alerts].slice(0, 50)
  })),

  setSimulationMode: (mode, value) => set((state) => ({
    isSimulating: { ...state.isSimulating, [mode]: value }
  })),

  updateWorkerStatus: (workerId, status, extra = {}) => set((state) => ({
    workers: state.workers.map((w) =>
      w.id === workerId ? { ...w, status, lastActive: new Date().toISOString(), ...extra } : w
    )
  })),
}));

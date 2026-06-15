import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Activity, Thermometer, Moon, ShieldCheck, Calendar, FileText, QrCode, Download, ChevronRight, FileCheck, Stethoscope } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import AppLayout from "@/components/AppLayout";
import { useGlobalSensorData } from "@/contexts/LiveSensorContext";

const mockScoreData = [
  { day: 'Mon', value: 85 }, { day: 'Tue', value: 88 }, { day: 'Wed', value: 82 },
  { day: 'Thu', value: 87 }, { day: 'Fri', value: 90 }, { day: 'Sat', value: 89 }, { day: 'Sun', value: 87 }
];

const mockTempData = [
  { day: 'Mon', value: 38.4 }, { day: 'Tue', value: 38.6 }, { day: 'Wed', value: 38.5 },
  { day: 'Thu', value: 38.3 }, { day: 'Fri', value: 38.5 }, { day: 'Sat', value: 38.7 }, { day: 'Sun', value: 38.5 }
];

const mockStepsData = [
  { day: 'Mon', value: 2100 }, { day: 'Tue', value: 2800 }, { day: 'Wed', value: 1800 },
  { day: 'Thu', value: 2500 }, { day: 'Fri', value: 3100 }, { day: 'Sat', value: 2900 }, { day: 'Sun', value: 2340 }
];

const mockSleepData = [
  { day: 'Mon', value: 8.2 }, { day: 'Tue', value: 7.5 }, { day: 'Wed', value: 8.5 },
  { day: 'Thu', value: 7.0 }, { day: 'Fri', value: 6.5 }, { day: 'Sat', value: 7.8 }, { day: 'Sun', value: 7.5 }
];

const CombineSense = () => {
  const sensorData = useGlobalSensorData();
  const [activeTab, setActiveTab] = useState<'score' | 'temp' | 'steps' | 'sleep'>('score');
  const [timeRange, setTimeRange] = useState('1w');
  
  // Live simulation states
  const [liveTemp, setLiveTemp] = useState(38.5);
  const [liveSteps, setLiveSteps] = useState(2340);
  const [liveSleep, setLiveSleep] = useState(7.5);
  const [liveScore, setLiveScore] = useState(87);

  const [dogName, setDogName] = useState("My Dog");
  const [dogBreed, setDogBreed] = useState("Mixed Breed");

  useEffect(() => {
    const dogs = JSON.parse(localStorage.getItem("dogs_profiles") || "[]");
    const activeDogId = localStorage.getItem("active_dog_id") || "1";
    const currentDog = dogs.find((d: any) => d.id === activeDogId) || dogs[0];
    if (currentDog) {
      setDogName(currentDog.name);
      setDogBreed(currentDog.breed);
    }
  }, []);

  useEffect(() => {
    if (!sensorData.connected) return;
    
    // Simulate live ticking values when connected
    const interval = setInterval(() => {
      setLiveTemp(prev => {
        const newTemp = prev + (Math.random() * 0.1 - 0.05);
        return Number(newTemp.toFixed(1));
      });
      setLiveSteps(prev => prev + Math.floor(Math.random() * 3));
      setLiveScore(prev => {
        const change = Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        return Math.min(100, Math.max(0, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [sensorData.connected]);

  // Score circular progress calculations
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (liveScore / 100) * circumference;

  return (
    <AppLayout title="Health Report" showBack>
      <div className="px-5 py-6 pb-24 space-y-6 max-w-2xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-900 tracking-tight">Health Report</h1>
            <p className="text-gray-500 font-medium text-sm flex items-center gap-1.5 mt-0.5">
              <span className="text-lg">🐾</span> {dogName} · {dogBreed} · May 2026
            </p>
          </div>
        </div>

        {/* Top Summary Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 relative overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none" />
          
          <div className="flex items-center gap-6 relative z-10">
            {/* Circular Progress */}
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                <circle 
                  cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round"
                  className="text-emerald-500 transition-all duration-1000 ease-out" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-[-2px]">Score</span>
                <span className="text-2xl font-display font-bold text-gray-900 leading-none">
                  {liveScore}
                </span>
                <span className="text-gray-400 text-[9px] font-medium mt-0.5">/100</span>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-900">Good</h3>
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 ${sensorData.connected ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${sensorData.connected ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                  {sensorData.connected ? 'Live' : 'Standby'}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Avg Temp</p>
                  <p className="text-sm font-bold text-gray-900">{liveTemp}°C</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Avg Steps</p>
                  <p className="text-sm font-bold text-gray-900">{liveSteps.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-medium">Sleep</p>
                  <p className="text-sm font-bold text-gray-900">{liveSleep}h</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs font-medium text-emerald-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> All sensors normal
            </p>
            <p className="text-[10px] text-gray-400 font-medium">May 16, 2026</p>
          </div>
        </motion.div>

        {/* Date Range Selector */}
        <div className="flex items-center justify-between bg-white rounded-full p-1 border border-gray-100 shadow-sm">
          {['1d', '1w', '1m', '3m', '6m', '4y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`flex-1 py-1.5 text-[11px] font-bold rounded-full transition-colors ${
                timeRange === range ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Sensor Data Charts */}
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-gray-900">Sensor Data</h2>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button onClick={() => setActiveTab('score')} className={`p-3 rounded-2xl text-left border transition-all ${activeTab === 'score' ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' : 'border-gray-100 bg-white'}`}>
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2"><Heart className="w-4 h-4" /></div>
              <p className="text-[11px] text-gray-500 font-medium">Health Score</p>
              <p className="text-sm font-bold text-gray-900">{liveScore} / 100</p>
            </button>
            <button onClick={() => setActiveTab('temp')} className={`p-3 rounded-2xl text-left border transition-all ${activeTab === 'temp' ? 'border-rose-500 bg-rose-50/50 shadow-sm' : 'border-gray-100 bg-white'}`}>
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-2"><Thermometer className="w-4 h-4" /></div>
              <p className="text-[11px] text-gray-500 font-medium">Temperature</p>
              <p className="text-sm font-bold text-gray-900">Avg {liveTemp}°C</p>
            </button>
            <button onClick={() => setActiveTab('steps')} className={`p-3 rounded-2xl text-left border transition-all ${activeTab === 'steps' ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-gray-100 bg-white'}`}>
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2"><Activity className="w-4 h-4" /></div>
              <p className="text-[11px] text-gray-500 font-medium">Activity Steps</p>
              <p className="text-sm font-bold text-gray-900">Avg {liveSteps.toLocaleString()}</p>
            </button>
            <button onClick={() => setActiveTab('sleep')} className={`p-3 rounded-2xl text-left border transition-all ${activeTab === 'sleep' ? 'border-indigo-500 bg-indigo-50/50 shadow-sm' : 'border-gray-100 bg-white'}`}>
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2"><Moon className="w-4 h-4" /></div>
              <p className="text-[11px] text-gray-500 font-medium">Sleep Pattern</p>
              <p className="text-sm font-bold text-gray-900">Avg {liveSleep}h</p>
            </button>
          </div>

          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 h-64"
          >
            <ResponsiveContainer width="100%" height="100%">
              {activeTab === 'score' || activeTab === 'temp' ? (
                <AreaChart data={activeTab === 'score' ? mockScoreData : mockTempData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={activeTab === 'score' ? '#10b981' : '#f43f5e'} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={activeTab === 'score' ? '#10b981' : '#f43f5e'} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={activeTab === 'score' ? [60, 100] : [37.5, 39.5]} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="value" stroke={activeTab === 'score' ? '#10b981' : '#f43f5e'} strokeWidth={3} fillOpacity={1} fill="url(#colorGradient)" />
                </AreaChart>
              ) : (
                <BarChart data={activeTab === 'steps' ? mockStepsData : mockSleepData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  <RechartsTooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="value" fill={activeTab === 'steps' ? '#3b82f6' : '#6366f1'} radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Health Records */}
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-gray-900">Health Records</h2>
          
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Vaccination Records</h3>
              <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">4 records</span>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Rabies', date: '2025/04/15', status: 'Current', color: 'emerald' },
                { name: 'Combination', date: '2025/03/02', status: 'Current', color: 'emerald' },
                { name: 'Heartworm', date: '2026/01/20', status: 'Current', color: 'emerald' },
                { name: 'Flea & Tick', date: 'Next: Jun 2026', status: 'Soon', color: 'amber' },
              ].map((record, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-${record.color}-50 flex items-center justify-center shrink-0`}>
                      <ShieldCheck className={`w-5 h-5 text-${record.color}-500`} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{record.name}</p>
                      <p className="text-[11px] text-gray-500 font-medium">{record.date}</p>
                    </div>
                  </div>
                  <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${record.status === 'Current' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {record.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between h-28 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-full blur-xl -mr-4 -mt-4" />
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 relative z-10">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] text-gray-500 font-medium mb-0.5">Last Vet Visit</p>
                <p className="font-bold text-gray-900 text-sm truncate">Apr 20, 2026</p>
                <p className="text-[10px] text-emerald-600 font-medium truncate mt-0.5">Health check: All clear ✓</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between h-28 relative overflow-hidden group hover:border-emerald-200 transition-colors cursor-pointer">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-full blur-xl -mr-4 -mt-4 transition-all group-hover:scale-150" />
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 relative z-10">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] text-gray-500 font-medium mb-0.5">Next Appointment</p>
                <p className="font-bold text-gray-900 text-sm truncate">Not scheduled</p>
                <p className="text-[11px] text-emerald-600 font-bold mt-0.5 flex items-center gap-0.5 group-hover:gap-1 transition-all">Book Now <ChevronRight className="w-3 h-3" /></p>
              </div>
            </div>
          </div>
        </div>

        {/* Reports */}
        <div className="space-y-4">
          <h2 className="text-lg font-display font-bold text-gray-900">Reports</h2>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-4 text-left shadow-md shadow-indigo-200 text-white relative overflow-hidden group h-32 flex flex-col justify-between">
              <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-x-8 translate-y-8" />
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-sm">Vet QR Code</p>
                <p className="text-[10px] text-indigo-100 font-medium mt-0.5">Generate</p>
              </div>
            </button>
            
            <button className="bg-gradient-to-br from-rose-400 to-red-500 rounded-2xl p-4 text-left shadow-md shadow-rose-200 text-white relative overflow-hidden group h-32 flex flex-col justify-between">
              <div className="absolute right-0 bottom-0 w-24 h-24 bg-white/10 rounded-full blur-2xl translate-x-8 translate-y-8" />
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-sm">PDF Export</p>
                <p className="text-[10px] text-rose-100 font-medium mt-0.5">Annual data</p>
              </div>
            </button>
          </div>
        </div>

      </div>
    </AppLayout>
  );
};

export default CombineSense;

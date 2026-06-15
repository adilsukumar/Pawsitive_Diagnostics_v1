import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, PawPrint, TrendingUp, ChevronRight, Activity, AudioLines, ScanEye, Wind, History, BookOpen, Sparkles, RefreshCw, Bluetooth, Radio, FlaskConical, Plus, X, Calendar, MapPin, Video, Star, Send, QrCode, Gauge, Sun, Layers, Brain, Microscope, Thermometer, Check, Battery, Signal, SignalHigh } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useDailyInsight } from "@/hooks/useDailyInsight";
import { useGlobalSensorData } from "@/contexts/LiveSensorContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const sensors = [
  {
    type: "bark",
    title: "BarkSense AI",
    shortDesc: "Bark Analysis",
    value: "Calm",
    icon: Brain,
    bgClass: "bg-[#f3eefe]",
    textClass: "text-[#8b5cf6]",
    borderClass: "bg-[#8b5cf6]",
    gradientClass: "from-[#8b5cf6] to-[#8b5cf6]/0",
    to: "/bark-sense",
  },
  {
    type: "skin",
    title: "SkinSense AI",
    shortDesc: "Skin Health",
    value: "Normal",
    icon: Microscope,
    bgClass: "bg-[#fdf2f8]",
    textClass: "text-[#f472b6]",
    borderClass: "bg-[#f472b6]",
    gradientClass: "from-[#f472b6] to-[#f472b6]/0",
    to: "/skin-sense",
  },
  {
    type: "motion",
    title: "MotionSense",
    shortDesc: "Activity Track",
    value: "2,340 steps",
    progress: 70,
    icon: Activity,
    bgClass: "bg-[#eff6ff]",
    textClass: "text-[#3b82f6]",
    borderClass: "bg-[#3b82f6]",
    gradientClass: "from-[#3b82f6] to-[#3b82f6]/0",
    to: "/motion-sense",
  },
  {
    type: "location",
    title: "LocationSense",
    shortDesc: "Live Tracking",
    value: "Home",
    icon: MapPin,
    bgClass: "bg-[#eef2ff]",
    textClass: "text-[#6366f1]",
    borderClass: "bg-[#6366f1]",
    gradientClass: "from-[#6366f1] to-[#6366f1]/0",
    to: "/location-sense",
  },
  {
    type: "pressure",
    title: "PressureSense",
    shortDesc: "Barometric",
    value: "1012 hPa",
    icon: Gauge,
    bgClass: "bg-[#f0fdf4]",
    textClass: "text-[#22c55e]",
    borderClass: "bg-[#22c55e]",
    gradientClass: "from-[#22c55e] to-[#22c55e]/0",
    to: "/pressure-sense",
  },
  {
    type: "light",
    title: "LightSense AI",
    shortDesc: "Ambient Light",
    value: "Optimal",
    icon: Sun,
    bgClass: "bg-[#fefce8]",
    textClass: "text-[#eab308]",
    borderClass: "bg-[#eab308]",
    gradientClass: "from-[#eab308] to-[#eab308]/0",
    to: "/light-sense",
  },
  {
    type: "vital",
    title: "VitalSense AI",
    shortDesc: "Heart & Breath",
    value: "Normal",
    icon: Heart,
    bgClass: "bg-[#fff1f2]",
    textClass: "text-[#f43f5e]",
    borderClass: "bg-[#f43f5e]",
    gradientClass: "from-[#f43f5e] to-[#f43f5e]/0",
    to: "/vital-sense",
  },
  {
    type: "temperature",
    title: "TemperatureSense AI",
    shortDesc: "Body Temp",
    value: "38.5°C",
    icon: Thermometer,
    bgClass: "bg-[#fff7ed]",
    textClass: "text-[#f97316]",
    borderClass: "bg-[#f97316]",
    gradientClass: "from-[#f97316] to-[#f97316]/0",
    to: "/temperature-sense",
  },
  {
    type: "combine",
    title: "CombineSense AI",
    shortDesc: "Health Report",
    value: "Active",
    icon: Layers,
    bgClass: "bg-[#ecfdf5]",
    textClass: "text-[#10b981]",
    borderClass: "bg-[#10b981]",
    gradientClass: "from-[#34d399] to-[#059669]",
    to: "/combine-sense",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const Dashboard = () => {
  const { insight, loading: insightLoading, refresh: refreshInsight } = useDailyInsight();
  const sensorData = useGlobalSensorData();
  const { toast } = useToast();
  
  // Get current active dog from dogs_profiles array
  const activeDogId = localStorage.getItem("active_dog_id") || "1";
  const dogs = JSON.parse(localStorage.getItem("dogs_profiles") || "[]");
  const activeDog = dogs.find((d: any) => d.id === activeDogId) || { name: "My Dog", breed: "Mixed", age: "2 years", photo: null };

  const [liveSteps, setLiveSteps] = useState(2340);
  const [liveTemp, setLiveTemp] = useState(38.5);

  useEffect(() => {
    if (!sensorData.connected) return;
    const interval = setInterval(() => {
      setLiveSteps(prev => prev + Math.floor(Math.random() * 3));
      setLiveTemp(prev => Number((prev + (Math.random() * 0.1 - 0.05)).toFixed(1)));
    }, 2000);
    return () => clearInterval(interval);
  }, [sensorData.connected]);

  const getLiveValue = (type: string, fallback: string) => {
    if (!sensorData.connected) return fallback;
    switch (type) {
      case "bark": return sensorData.latest?.bark_spike ? `${sensorData.latest.bark_spike}% Spike` : "Active";
      case "skin": return sensorData.latest?.skin_status || "Healthy";
      case "motion": return `${liveSteps.toLocaleString()} steps`;
      case "combine": return "Analyzing...";
      case "location": return "Tracking...";
      case "pressure": return "1012 hPa";
      case "light": return "Optimal";
      case "vital": return "Pulse: 82 bpm";
      case "temperature": return `${liveTemp}°C`;
      default: return fallback;
    }
  };
  // Auto-start all monitoring when BLE collar connects (but not if user manually stopped)
  const manuallyStoppedRef = useRef(false);
  useEffect(() => {
    if (sensorData.bleConnected && !sensorData.connected && !manuallyStoppedRef.current) {
      sensorData.startMonitoring();
      toast({ 
        title: "📡 All sensors activated", 
        description: "BLE collar connected - all monitoring started" 
      });
    }
  }, [sensorData.bleConnected, sensorData.connected, sensorData.startMonitoring, toast]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600); const m = Math.floor((s % 3600) / 60); const sec = s % 60;
    return h > 0 ? `${h}h ${m}m ${sec}s` : m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  const handleToggleAll = () => {
    if (sensorData.connected) {
      manuallyStoppedRef.current = true;
      sensorData.stopMonitoring();
      toast({ title: "⏹️ All monitoring stopped", description: `Monitored for ${formatTime(sensorData.secondsActive)}` });
    } else {
      manuallyStoppedRef.current = false;
      sensorData.startMonitoring();
      toast({ title: "📡 All sensors live", description: "Bark · Air · Motion · Skin — ESP32 collar active" });
    }
  };

  return (
    <AppLayout>
      <div className="px-4 py-6 space-y-5 min-h-full">
        {/* Active Dog Profile */}
        <Link to="/dog-profile">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            whileTap={{ scale: 0.97 }}
            className="glass rounded-2xl p-4 flex items-center gap-4 btn-squishy relative overflow-hidden"
          >
            {/* Subtle glow */}
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full opacity-40" style={{ background: "radial-gradient(circle, hsl(170 80% 45% / 0.2), transparent)" }} />

            <div className="w-14 h-14 rounded-xl ring-2 ring-primary/20 overflow-hidden shrink-0 bg-secondary flex items-center justify-center">
              {activeDog?.photo ? (
                <img src={activeDog.photo} alt={activeDog.name} className="w-full h-full object-cover" />
              ) : (
                <PawPrint className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
              )}
            </div>
            <div className="flex-1 min-w-0 relative z-10">
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider">Active Profile</p>
              <h1 className="text-lg font-display font-bold text-foreground truncate tracking-tight">
                {activeDog ? `${activeDog.name}'s Health` : "Pawsitive Diagnosis"}
              </h1>
              <p className="text-xs text-primary font-body font-medium flex items-center gap-1 mt-0.5">
                <Heart className="w-3 h-3" fill="currentColor" />
                {activeDog ? `${activeDog.age} • ${activeDog.breed}` : "Set up profile"}
                <ChevronRight className="w-3 h-3" />
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Daily Insight */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 24 }}
          className="glass rounded-2xl p-4 relative overflow-hidden"
        >
          <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent)" }} />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-glow-sm shrink-0">
                  {insightLoading ? (
                    <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse" strokeWidth={2} />
                  ) : (
                    <span className="text-sm">{insight?.emoji || "🐾"}</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" strokeWidth={2.5} />
                  <p className="text-[10px] text-primary font-body font-semibold uppercase tracking-widest">Daily Insight</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.85, rotate: 180 }}
                onClick={refreshInsight}
                disabled={insightLoading}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors disabled:opacity-40"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${insightLoading ? "animate-spin" : ""}`} strokeWidth={2} />
              </motion.button>
            </div>

            {insightLoading ? (
              <div className="space-y-2">
                <div className="h-4 w-2/3 rounded-lg bg-muted animate-pulse" />
                <div className="h-3 w-full rounded-lg bg-muted animate-pulse" />
                <div className="h-3 w-3/4 rounded-lg bg-muted animate-pulse" />
              </div>
            ) : (
              <>
                <h3 className="font-body font-semibold text-foreground text-base tracking-tight leading-tight mb-1.5">
                  {insight?.title || "Stay Active!"}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-body text-sm">
                  {insight?.fact || "Regular walks and a balanced diet keep your pup healthy."}
                </p>
              </>
            )}
          </div>
        </motion.div>

        {/* Breed Encyclopedia Quick Action */}
        <Link to="/breed-encyclopedia">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 24 }}
            whileTap={{ scale: 0.98 }}
            className="glass rounded-2xl p-4 flex items-center justify-between group relative overflow-hidden"
          >
            {/* Subtle glow */}
            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-20" style={{ background: "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent)" }} />

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0 shadow-glow-sm">
                <BookOpen className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground font-display mb-0.5 tracking-tight group-hover:text-primary transition-colors">Breed Encyclopedia</h3>
                <p className="text-xs text-muted-foreground font-body">Discover breed traits & facts</p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center relative z-10 group-hover:bg-primary/20 transition-colors">
              <ChevronRight className="w-4 h-4 text-primary" strokeWidth={2} />
            </div>
          </motion.div>
        </Link>

        {/* Overall Health Score & Collar Status */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
          
          {/* Overall Health Score */}
          <motion.div variants={item} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden flex items-center gap-4">
            <div className={`absolute left-0 top-0 bottom-0 w-2 rounded-l-2xl ${sensorData.connected ? 'bg-emerald-500' : 'bg-slate-300'}`} />
            
            <div className="relative w-16 h-16 ml-2 shrink-0">
              <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                <path className={sensorData.connected ? 'text-emerald-50' : 'text-slate-50'} strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className={sensorData.connected ? 'text-emerald-500' : 'text-slate-300'} strokeWidth="3" strokeDasharray={sensorData.connected ? '87, 100' : '0, 100'} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center pt-0.5">
                <span className="text-[17px] font-bold text-gray-800 leading-none font-display">{sensorData.connected ? '87' : '--'}</span>
                <span className="text-[7px] text-gray-400 font-bold mt-0.5">/100</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-[15px] font-bold text-gray-800 font-display mb-1.5 tracking-tight">Overall Health Score</h3>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${sensorData.connected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${sensorData.connected ? 'text-emerald-600' : 'text-slate-500'}`}>{sensorData.connected ? 'Live' : 'Offline'}</span>
                <span className="text-[10px] text-gray-400 font-medium">· {sensorData.connected ? 'All sensors active' : 'Waiting for connection'}</span>
              </div>
            </div>
          </motion.div>

          {/* Collar Status */}
          <motion.div variants={item} className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 rounded-l-[20px]" />
            
            <h3 className="font-bold text-gray-800 font-display mb-4 tracking-tight ml-2">Collar Status</h3>
            
            <div className="flex items-center gap-3 mb-5 ml-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${sensorData.bleConnected ? "bg-blue-50 text-blue-500" : "bg-gray-100 text-gray-400"}`}>
                <Check className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-[14px] font-bold text-gray-800">{sensorData.bleConnected ? "Connected" : "Disconnected"}</p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">{sensorData.bleConnected ? "Last sync: 2 minutes ago" : "Not synced recently"}</p>
              </div>
            </div>

            <div className="space-y-3.5 pt-4 border-t border-gray-50 ml-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <Battery className="w-4 h-4 text-gray-400" />
                  <span className="text-[12px] font-medium">Battery</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '87%' }} />
                  </div>
                  <span className="text-[12px] font-bold text-blue-500">87%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <Signal className="w-4 h-4 text-gray-400" />
                  <span className="text-[12px] font-medium">Signal Strength</span>
                </div>
                <div className="flex items-center gap-2">
                  <SignalHigh className={`w-4 h-4 ${sensorData.bleConnected ? "text-blue-500" : "text-gray-300"}`} />
                  <span className={`text-[12px] font-bold ${sensorData.bleConnected ? "text-blue-500" : "text-gray-400"}`}>{sensorData.bleConnected ? "Excellent" : "None"}</span>
                </div>
              </div>
            </div>

            {!sensorData.bleConnected && (
              <Link to="/collar" className="block mt-5 ml-2">
                <Button className="w-full bg-[#f0f6ff] hover:bg-blue-100 text-blue-600 font-bold h-11 rounded-xl transition-colors shadow-none border-0">
                  <Bluetooth className="w-4 h-4 mr-2" /> Connect Collar
                </Button>
              </Link>
            )}
          </motion.div>
        </motion.div>

        {/* Live Sensor Summary */}
        {sensorData.connected && sensorData.latest && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-2xl p-4 space-y-3 ring-1 ring-primary/20"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-xs font-display font-semibold text-primary uppercase tracking-widest">Live Readings</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-secondary/50 rounded-xl p-3 text-center">
                <AudioLines className="w-4 h-4 text-amber-500 mx-auto mb-1" strokeWidth={2} />
                <p className="text-lg font-display font-bold text-foreground">{sensorData.latest.bark_spike ?? "—"}</p>
                <p className="text-[10px] text-muted-foreground font-body">Bark Spike</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-3 text-center">
                <FlaskConical className="w-4 h-4 text-blue-500 mx-auto mb-1" strokeWidth={2} />
                <p className="text-lg font-display font-bold text-foreground">{sensorData.latest.methane_ppm?.toFixed(1) ?? "—"}</p>
                <p className="text-[10px] text-muted-foreground font-body">Methane ppm</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-3 text-center">
                <ScanEye className="w-4 h-4 text-pink-500 mx-auto mb-1" strokeWidth={2} />
                <p className="text-lg font-display font-bold text-foreground">{sensorData.latest.scratch_intensity?.toFixed(1) ?? "—"}</p>
                <p className="text-[10px] text-muted-foreground font-body">Scratch</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-secondary/50 rounded-xl p-2.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div>
                  <p className="text-xs font-display font-semibold text-foreground">{sensorData.latest.ammonia_ppm?.toFixed(1) ?? "—"} ppm</p>
                  <p className="text-[10px] text-muted-foreground font-body">Ammonia</p>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-xl p-2.5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <div>
                  <p className="text-xs font-display font-semibold text-foreground">{sensorData.latest.co2_ppm?.toFixed(1) ?? "—"} ppm</p>
                  <p className="text-[10px] text-muted-foreground font-body">CO₂</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}


        {/* Sensor Cards */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 gap-2.5">
          {sensors.map((s, i) => (
            <motion.div key={i} variants={item}>
              <Link to={s.to} className="block">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={`${s.bgClass} rounded-[18px] p-3 shadow-sm border-2 relative overflow-hidden flex flex-col items-center text-center gap-1.5 hover:shadow-md transition-shadow h-[124px]`}
                  style={{ borderColor: s.textClass.replace('text-[', '').replace(']', '') }}
                >
                  <div className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300 ${sensorData.connected ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-300 shadow-inner border border-slate-400/20'}`} />
                  <div className={`w-11 h-11 rounded-[14px] bg-white flex items-center justify-center shadow-sm shrink-0 ${s.textClass}`}>
                    <s.icon className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div className="w-full flex flex-col items-center mt-1">
                    <h3 className="font-display font-bold text-gray-800 text-[13px] tracking-tight truncate w-full px-1">{s.title}</h3>
                    <p className="text-[10px] text-gray-600 font-medium mt-px truncate w-full px-1">{s.shortDesc}</p>
                    {sensorData.connected && (
                      <p className={`text-[11px] font-bold truncate mt-1.5 ${s.textClass}`}>
                        {getLiveValue(s.type, s.value)}
                      </p>
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>





      </div>
    </AppLayout>
  );
};

export default Dashboard;

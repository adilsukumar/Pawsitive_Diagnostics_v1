import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import { useGlobalSensorData } from "@/contexts/LiveSensorContext";
import { AudioLines, ScanEye, Wind, Activity, MapPin, Gauge, Sun, Layers, Brain, Microscope, Sparkles, Heart, Thermometer } from "lucide-react";

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

const SenseAIDashboard = () => {
  const sensorData = useGlobalSensorData();

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

  return (
    <AppLayout title="All Sense AI">
      <div className="px-4 py-6 space-y-6">
        
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="bg-gradient-to-br from-fuchsia-600 to-pink-500 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl transform translate-x-10 -translate-y-10" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-fuchsia-200" />
              <h1 className="text-xl font-display font-bold">All Sense AI</h1>
            </div>
            <p className="text-sm font-medium text-fuchsia-100 opacity-90 leading-relaxed max-w-[240px]">
              Access and manage all specialized AI modules tailored for your pet's wellness.
            </p>
          </div>
        </motion.div>

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

export default SenseAIDashboard;

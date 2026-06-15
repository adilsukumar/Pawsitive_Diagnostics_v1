import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { Shield, AlertTriangle, History, Plus, Minus, Crosshair, ChevronRight, Satellite, Stethoscope } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

const LocationSense = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [safeZoneRadius, setSafeZoneRadius] = useState("200m");
  const [safeZoneActive, setSafeZoneActive] = useState(true);
  const [lostModeActive, setLostModeActive] = useState(false);
  const [mapMode, setMapMode] = useState<"map" | "satellite">("map");

  return (
    <AppLayout title="LocationSense AI" showBack>
      <div className="px-4 py-6 min-h-full space-y-4 max-w-2xl mx-auto pb-24 font-body">
        
        {/* Header - Live Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-sm border border-white/50 flex justify-between items-center"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 animate-pulse" />
              <h2 className="text-lg font-bold text-[#1f2937] tracking-tight font-display">Live Tracking</h2>
            </div>
            <p className="text-xs text-gray-400 font-medium">Last updated: Just now</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-400 font-semibold text-sm">
            <Satellite className="w-4 h-4" />
            <span>GPS ✓</span>
          </div>
        </motion.div>

        {/* Map View Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative h-[340px] rounded-3xl overflow-hidden shadow-sm border border-white/50 bg-[#e6edf2]"
        >
          {/* Map Grid Background (CSS mock) */}
          <div 
            className="absolute inset-0 opacity-40 pointer-events-none" 
            style={{
              backgroundImage: "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              backgroundPosition: "center center"
            }} 
          />
          {/* Abstract map shapes */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-200/40 rounded-2xl rotate-12" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-16 bg-blue-200/40 rounded-xl -rotate-12" />
          <div className="absolute top-1/2 left-1/2 w-96 h-16 bg-white/40 rounded-xl flex items-center rotate-45 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-emerald-200/50 rounded-xl" />

          {/* Top Overlays */}
          <div className="absolute top-4 left-4 space-y-2">
            <Badge variant="secondary" className="bg-white/95 text-emerald-600 font-bold shadow-sm hover:bg-white border-0 px-3 py-1">
              Collar GPS
            </Badge>
            <div className="flex bg-white/95 rounded-full shadow-sm p-1 max-w-fit">
              <button 
                onClick={() => setMapMode("map")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${mapMode === "map" ? "bg-pink-400 text-white" : "text-gray-500 hover:text-gray-700"}`}
              >
                Map
              </button>
              <button 
                onClick={() => setMapMode("satellite")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${mapMode === "satellite" ? "bg-pink-400 text-white" : "text-gray-500 hover:text-gray-700"}`}
              >
                Satellite
              </button>
            </div>
          </div>

          <div className="absolute top-4 right-4 bg-white/95 rounded-xl shadow-sm flex flex-col overflow-hidden">
            <button className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
              <Plus className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-3 hover:bg-gray-50 transition-colors">
              <Minus className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="absolute bottom-4 right-4 z-20">
            <button className="bg-white/95 p-3 rounded-full shadow-sm hover:bg-gray-50 transition-colors">
              <Crosshair className="w-5 h-5 text-blue-500" />
            </button>
          </div>
          
          <p className="absolute bottom-1 right-20 whitespace-nowrap text-[9px] text-gray-500 font-medium">
            © OpenStreetMap / 地図データ
          </p>

          {/* Safe Zone Radius */}
          <div className="absolute top-1/2 left-[48%] -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border-[2px] border-dashed border-emerald-400/80 pointer-events-none" />
          <Badge className="absolute top-[26%] left-[48%] -translate-x-1/2 bg-white/95 text-emerald-600 shadow-sm border border-emerald-100 px-3 py-0.5 hover:bg-white text-xs font-bold z-10">
            Safe Zone
          </Badge>

          {/* Markers */}
          {/* Pet Marker */}
          <div className="absolute top-[55%] left-[52%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center text-pink-500 font-bold text-xs shadow-sm border border-pink-100 mb-1 z-10 relative">
              gh
            </div>
            {/* Custom pin shape */}
            <div className="w-10 h-10 bg-pink-400/20 rounded-full flex items-center justify-center relative -mt-4">
               <div className="w-3.5 h-3.5 bg-pink-500 rounded-full shadow-md z-10 relative" />
               <div className="absolute w-8 h-8 rounded-full bg-pink-400/30 animate-ping" />
            </div>
          </div>

          {/* "You" Marker */}
          <div className="absolute bottom-[20%] left-[32%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <Badge className="bg-white/95 text-blue-500 border border-blue-100 shadow-sm mb-1 px-3 hover:bg-white text-xs font-bold z-10 relative">
              You
            </Badge>
            <div className="w-10 h-10 bg-blue-400/20 rounded-full flex flex-col items-center justify-center relative -mt-3">
               <div className="w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-md z-10 relative border-[2.5px] border-blue-500">
                 <div className="w-1 h-1 bg-blue-500 rounded-full" />
               </div>
            </div>
            <p className="text-[10px] text-gray-500 font-medium -mt-1">±5m</p>
          </div>

        </motion.div>

        {/* Safe Zone Control Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-white/50 relative overflow-hidden"
        >
          {/* Subtle accent border on left */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-emerald-500 rounded-l-3xl" />
          
          <div className="flex justify-between items-start mb-1 ml-2">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-[#1f2937] font-display">Safe Zone</h3>
            </div>
            <Switch checked={safeZoneActive} onCheckedChange={setSafeZoneActive} className="data-[state=checked]:bg-emerald-400" />
          </div>
          <div className="ml-2">
            <p className="text-[13px] text-gray-400 font-medium mb-3">Notify within {safeZoneRadius} radius</p>
            <div className="flex gap-2">
              {["100m", "200m", "500m", "1km"].map(radius => (
                <button
                  key={radius}
                  onClick={() => setSafeZoneRadius(radius)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    safeZoneRadius === radius 
                      ? "bg-[#65a38a] text-white shadow-sm" 
                      : "bg-[#f3f4f6] text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {radius}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Lost Mode Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-white/50 relative overflow-hidden flex justify-between items-center"
        >
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-gray-200 rounded-l-3xl" />
          
          <div className="ml-2">
            <div className="flex items-center gap-2 mb-0.5">
              <AlertTriangle className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
              <h3 className="font-bold text-[#1f2937] font-display">Lost Mode</h3>
            </div>
            <p className="text-[13px] text-gray-400 font-medium pl-7">Emergency tracking if lost</p>
          </div>
          <Switch checked={lostModeActive} onCheckedChange={setLostModeActive} className="data-[state=checked]:bg-amber-500" />
        </motion.div>

        {/* Location History Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 shadow-sm border border-white/50 relative overflow-hidden"
        >
          {/* Subtle accent border on left */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-indigo-500/80 rounded-l-3xl" />
          
          <div className="ml-2">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-indigo-900" strokeWidth={1.5} />
                <h3 className="font-bold text-[#1f2937] font-display">Location History</h3>
              </div>
              <Badge variant="secondary" className="bg-[#f2f1fa] text-indigo-500 hover:bg-indigo-100 border-0 text-xs font-bold">
                Today
              </Badge>
            </div>

            {/* Timeline */}
            <div className="space-y-4 relative pl-1.5 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
              
              <div className="relative flex items-center">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#dfb26b] z-10 shrink-0" />
                  <div className="flex items-center gap-3 w-full border-b border-gray-50 pb-4">
                    <span className="text-[13px] text-gray-400 font-medium w-10 shrink-0">14:30</span>
                    <span className="text-[13px] font-bold text-[#1f2937] flex-1">Yoyogi Park</span>
                    <span className="text-xs font-bold text-pink-400">+1.2km</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400 z-10 shrink-0" />
                  <div className="flex items-center gap-3 w-full border-b border-gray-50 pb-4">
                    <span className="text-[13px] text-gray-400 font-medium w-10 shrink-0">12:15</span>
                    <span className="text-[13px] font-bold text-[#1f2937] flex-1">Near Shibuya Stn</span>
                    <span className="text-xs font-bold text-pink-400">+0.5km</span>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 z-10 shrink-0" />
                  <div className="flex items-center gap-3 w-full pb-1">
                    <span className="text-[13px] text-gray-400 font-medium w-10 shrink-0">09:00</span>
                    <span className="text-[13px] font-bold text-[#1f2937] flex-1">Home</span>
                    <span className="text-xs font-bold text-pink-400">Start</span>
                  </div>
                </div>
              </div>

            </div>

            <button className="mt-4 pt-4 border-t border-gray-50 w-full flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-800 transition-colors">
              View Full History
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Nearest Animal Hospital Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#e9f2fb] rounded-3xl p-4 shadow-sm flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm shrink-0">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#1a365d] font-display text-sm truncate">Nearest Animal Hospital</h3>
            <p className="text-xs text-blue-500/80 font-medium truncate mt-0.5">
              Shibuya Animal Hosp. · 0.8km · 4.6 · 24H
            </p>
          </div>
          <button className="w-8 h-8 rounded-full bg-[#5293d2] flex items-center justify-center text-white shrink-0 hover:bg-blue-600 transition-colors shadow-sm">
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </AppLayout>
  );
};

export default LocationSense;

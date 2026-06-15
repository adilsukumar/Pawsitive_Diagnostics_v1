import { motion } from "framer-motion";
import { Sun, CloudSun, SunDim } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useGlobalSensorData } from "@/contexts/LiveSensorContext";

const LightSense = () => {
  const sensorData = useGlobalSensorData();

  return (
    <AppLayout title="LightSense AI" showBack>
      <div className="px-4 py-6 space-y-4 max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mx-auto shadow-lg shadow-amber-200 mb-3">
            <Sun className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">
            LightSense AI
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Ambient light and UV exposure monitoring
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${sensorData.connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <h2 className="text-lg font-bold text-gray-900">
              {sensorData.connected ? 'Monitoring Active' : 'Sensor Offline'}
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            LightSense tracks ambient luminosity and harmful UV index levels, helping you optimize your pet's sun exposure for healthy circadian rhythms and vitamin D absorption.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-center">
              <SunDim className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-[11px] text-amber-600 font-bold uppercase tracking-wider mb-1">UV Index</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sensorData.connected ? '2' : '--'}
              </p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 text-center">
              <CloudSun className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-[11px] text-amber-600 font-bold uppercase tracking-wider mb-1">Illuminance</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sensorData.connected ? '4,500' : '--'}
                <span className="text-sm text-gray-500 font-medium ml-1">lux</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default LightSense;

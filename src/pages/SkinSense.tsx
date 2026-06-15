import { motion } from "framer-motion";
import { Microscope, Droplets, Activity } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useGlobalSensorData } from "@/contexts/LiveSensorContext";

const SkinSense = () => {
  const sensorData = useGlobalSensorData();

  return (
    <AppLayout title="SkinSense AI" showBack>
      <div className="px-4 py-6 space-y-4 max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center mx-auto shadow-lg shadow-pink-200 mb-3">
            <Microscope className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">
            SkinSense AI
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Dermatological monitoring and hydration tracking
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${sensorData.connected ? 'bg-emerald-500 animate-pulse' : 'bg-pink-500'}`} />
            <h2 className="text-lg font-bold text-gray-900">
              {sensorData.connected ? 'Monitoring Active' : 'Sensor Offline'}
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            SkinSense uses capacitive sensing and micro-movement detection to monitor your pet's skin hydration levels and track abnormal scratching or grooming behaviors.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 text-center">
              <Droplets className="w-6 h-6 text-pink-500 mx-auto mb-2" />
              <p className="text-[11px] text-pink-600 font-bold uppercase tracking-wider mb-1">Hydration</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sensorData.connected ? '85' : '--'}
                <span className="text-sm text-gray-500 font-medium ml-1">%</span>
              </p>
            </div>
            <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 text-center">
              <Activity className="w-6 h-6 text-pink-500 mx-auto mb-2" />
              <p className="text-[11px] text-pink-600 font-bold uppercase tracking-wider mb-1">Scratch Intensity</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sensorData.connected ? (sensorData.latest?.scratch_intensity || 'Low') : '--'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default SkinSense;

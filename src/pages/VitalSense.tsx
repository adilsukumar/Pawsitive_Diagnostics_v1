import { motion } from "framer-motion";
import { Heart, Activity } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useGlobalSensorData } from "@/contexts/LiveSensorContext";

const VitalSense = () => {
  const sensorData = useGlobalSensorData();

  return (
    <AppLayout title="VitalSense AI" showBack>
      <div className="px-4 py-6 space-y-4 max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center mx-auto shadow-lg shadow-rose-200 mb-3">
            <Heart className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">
            VitalSense AI
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Advanced heart rate and respiratory monitoring
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${sensorData.connected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            <h2 className="text-lg font-bold text-gray-900">
              {sensorData.connected ? 'Monitoring Active' : 'Sensor Offline'}
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            VitalSense uses advanced micro-vibration sensors to track your pet's heart rate variability and breathing patterns in real-time, detecting early signs of stress or illness.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100 text-center">
              <Activity className="w-6 h-6 text-rose-500 mx-auto mb-2" />
              <p className="text-[11px] text-rose-600 font-bold uppercase tracking-wider mb-1">Heart Rate</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sensorData.connected ? '82' : '--'}
                <span className="text-sm text-gray-500 font-medium ml-1">bpm</span>
              </p>
            </div>
            <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100 text-center">
              <Wind className="w-6 h-6 text-rose-500 mx-auto mb-2" />
              <p className="text-[11px] text-rose-600 font-bold uppercase tracking-wider mb-1">Breathing</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sensorData.connected ? '24' : '--'}
                <span className="text-sm text-gray-500 font-medium ml-1">rpm</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

// Add Wind to imports since it's used
import { Wind } from "lucide-react";
export default VitalSense;

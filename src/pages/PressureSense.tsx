import { motion } from "framer-motion";
import { Gauge, Wind, Cloud } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useGlobalSensorData } from "@/contexts/LiveSensorContext";

const PressureSense = () => {
  const sensorData = useGlobalSensorData();

  return (
    <AppLayout title="PressureSense AI" showBack>
      <div className="px-4 py-6 space-y-4 max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto shadow-lg shadow-green-200 mb-3">
            <Gauge className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">
            PressureSense AI
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Barometric pressure and environmental monitoring
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${sensorData.connected ? 'bg-emerald-500 animate-pulse' : 'bg-green-500'}`} />
            <h2 className="text-lg font-bold text-gray-900">
              {sensorData.connected ? 'Monitoring Active' : 'Sensor Offline'}
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            PressureSense measures ambient air pressure and analyzes environmental gases to ensure your pet is breathing clean air, predicting weather changes that might affect their mood or joints.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl p-4 border border-green-100 text-center">
              <Wind className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-[11px] text-green-600 font-bold uppercase tracking-wider mb-1">Pressure</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sensorData.connected ? '1012' : '--'}
                <span className="text-sm text-gray-500 font-medium ml-1">hPa</span>
              </p>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 border border-green-100 text-center">
              <Cloud className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-[11px] text-green-600 font-bold uppercase tracking-wider mb-1">CO₂ Level</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sensorData.connected ? (sensorData.latest?.co2_ppm?.toFixed(0) || '420') : '--'}
                <span className="text-sm text-gray-500 font-medium ml-1">ppm</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default PressureSense;

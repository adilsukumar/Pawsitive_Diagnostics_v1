import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Footprints, Flame } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useGlobalSensorData } from "@/contexts/LiveSensorContext";

const MotionSense = () => {
  const sensorData = useGlobalSensorData();
  const [liveSteps, setLiveSteps] = useState(2340);

  useEffect(() => {
    if (!sensorData.connected) return;
    const interval = setInterval(() => {
      setLiveSteps(prev => prev + Math.floor(Math.random() * 3));
    }, 2000);
    return () => clearInterval(interval);
  }, [sensorData.connected]);

  return (
    <AppLayout title="MotionSense AI" showBack>
      <div className="px-4 py-6 space-y-4 max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-200 mb-3">
            <Activity className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">
            MotionSense AI
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Daily activity and caloric expenditure tracking
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${sensorData.connected ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
            <h2 className="text-lg font-bold text-gray-900">
              {sensorData.connected ? 'Monitoring Active' : 'Sensor Offline'}
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            MotionSense utilizes an embedded 6-axis accelerometer and gyroscope to accurately count your pet's steps, classify activity types, and calculate daily calorie burn.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 text-center">
              <Footprints className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-[11px] text-blue-600 font-bold uppercase tracking-wider mb-1">Steps Today</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sensorData.connected ? liveSteps.toLocaleString() : '--'}
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100 text-center">
              <Flame className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-[11px] text-blue-600 font-bold uppercase tracking-wider mb-1">Calories Burned</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sensorData.connected ? Math.floor(liveSteps * 0.15) : '--'}
                <span className="text-sm text-gray-500 font-medium ml-1">kcal</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default MotionSense;

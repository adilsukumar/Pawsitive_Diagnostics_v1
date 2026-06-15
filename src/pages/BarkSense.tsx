import { motion } from "framer-motion";
import { Brain, Volume2, Mic } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useGlobalSensorData } from "@/contexts/LiveSensorContext";

const BarkSense = () => {
  const sensorData = useGlobalSensorData();

  return (
    <AppLayout title="BarkSense AI" showBack>
      <div className="px-4 py-6 space-y-4 max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 16 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-center mb-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-purple-200 mb-3">
            <Brain className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-1">
            BarkSense AI
          </h1>
          <p className="text-gray-500 text-sm font-medium">
            Acoustic bark analysis and emotion translation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-3 h-3 rounded-full ${sensorData.connected ? 'bg-emerald-500 animate-pulse' : 'bg-purple-500'}`} />
            <h2 className="text-lg font-bold text-gray-900">
              {sensorData.connected ? 'Monitoring Active' : 'Sensor Offline'}
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            BarkSense AI uses advanced audio processing to analyze your dog's vocalizations. It can detect bark volume, frequency, and emotional context to help you understand what your pet is trying to say.
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 text-center">
              <Volume2 className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-[11px] text-purple-600 font-bold uppercase tracking-wider mb-1">Bark Spike</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sensorData.connected ? (sensorData.latest?.bark_spike || '12') : '--'}
                <span className="text-sm text-gray-500 font-medium ml-1">%</span>
              </p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 text-center">
              <Mic className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-[11px] text-purple-600 font-bold uppercase tracking-wider mb-1">Volume</p>
              <p className="text-2xl font-display font-bold text-gray-900">
                {sensorData.connected ? '45' : '--'}
                <span className="text-sm text-gray-500 font-medium ml-1">dB</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default BarkSense;

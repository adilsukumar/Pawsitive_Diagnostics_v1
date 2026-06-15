import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LiveSensorProvider } from "@/contexts/LiveSensorContext";
import Dashboard from "./pages/Dashboard";
import SenseAIDashboard from "./pages/SenseAIDashboard";
import BarkSense from "./pages/BarkSense";
import SkinSense from "./pages/SkinSense";
import SkinSenseEnhanced from "./pages/SkinSenseEnhanced";
import LocationSense from "./pages/LocationSense";
import PressureSense from "./pages/PressureSense";
import LightSense from "./pages/LightSense";
import VitalSense from "./pages/VitalSense";
import TemperatureSense from "./pages/TemperatureSense";
import CombineSense from "./pages/CombineSense";
import MotionSense from "./pages/MotionSense";
import DogProfile from "./pages/DogProfile";
import BreedEncyclopedia from "./pages/BreedEncyclopedia";
import FluorescenceGuide from "./pages/FluorescenceGuide";
import ScanHistory from "./pages/ScanHistory";
import CollarConnect from "./pages/CollarConnect";
import InstallApp from "./pages/InstallApp";

import VetView from "./pages/VetView";
import VetServices from "./pages/VetServices";
import PetChatbot from "./pages/PetChatbot";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LiveSensorProvider>
          <Toaster />
          <Sonner />
          <SplashScreen visible={showSplash} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/sense-ai" element={<SenseAIDashboard />} />
              <Route path="/bark-sense" element={<BarkSense />} />
              <Route path="/skin-sense" element={<SkinSenseEnhanced />} />
              <Route path="/skin-sense-old" element={<SkinSense />} />
              <Route path="/location-sense" element={<LocationSense />} />
              <Route path="/pressure-sense" element={<PressureSense />} />
              <Route path="/light-sense" element={<LightSense />} />
              <Route path="/vital-sense" element={<VitalSense />} />
              <Route path="/temperature-sense" element={<TemperatureSense />} />
              <Route path="/combine-sense" element={<CombineSense />} />
              <Route path="/motion-sense" element={<MotionSense />} />
              <Route path="/pet-chatbot" element={<PetChatbot />} />
              <Route path="/dog-profile" element={<DogProfile />} />
              <Route path="/breed-encyclopedia" element={<BreedEncyclopedia />} />
              <Route path="/scan-history" element={<ScanHistory />} />
              <Route path="/fluorescence-guide" element={<FluorescenceGuide />} />
              <Route path="/collar" element={<CollarConnect />} />
              <Route path="/install" element={<InstallApp />} />

              <Route path="/vet-services" element={<VetServices />} />
              <Route path="/vet/:id" element={<VetView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LiveSensorProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

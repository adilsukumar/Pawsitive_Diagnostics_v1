# 🐾 Pawsitive Diagnostics

**Next-Generation AI-Powered Pet Health Monitoring Web Application**

Welcome to the frontend web application repository for **Pawsitive Diagnostics**! This application serves as the intuitive, premium interface for our revolutionary smart collar system, shifting pet care from reactive to proactive through real-time telemetry and advanced AI diagnostics.

![Pawsitive Diagnostics Dashboard Preview](public/logo.png)

---

## 🌟 Overview

Pawsitive Diagnostics is a mobile-first, Progressive Web Application (PWA) built to seamlessly connect pet owners with their dog's vital health data. 

It acts as a comprehensive command center for a suite of **Sense AI** hardware modules, translating raw sensor data from the smart collar into beautiful, actionable insights, dynamic charts, and AI-driven diagnoses. 

---

## ✨ Core Features & The "Sense AI" Suite

The app features a unified, frosted-glass (`glassmorphism`) UI design across nine powerful diagnostic modules:

### 🎙️ BarkSense AI
Translates your dog's vocalizations using acoustic analysis. Tells you if a bark indicates joy, anxiety, alertness, or pain.

### 🔬 SkinSense AI
Integrates with UV-fluorescence cameras to analyze skin conditions. Detects early signs of fungal infections, hot spots, or ticks under the fur.

### 🏃 MotionSense AI
Tracks biomechanical movement, GAIT patterns, scratch intensity, and daily calorie burn. Essential for spotting joint pain or neurological anomalies.

### 📍 LocationSense AI
Real-time GPS tracking complete with a live map, custom safe-zone geofencing, lost-dog mode, and historical location timelines.

### 🌡️ TemperatureSense AI
Monitors both the pet's core body temperature and ambient environmental temperature to prevent heatstroke or hypothermia.

### ❤️ VitalSense AI
Tracks deep physiological metrics including resting heart rate and respiratory rate, crucial for detecting cardiovascular stress or fever.

### ☁️ PressureSense AI
Monitors atmospheric pressure changes which are clinically proven to affect joint pain and arthritis in older dogs.

### ☀️ LightSense AI
Measures UV index exposure and ambient light levels, helping regulate sleep cycles and prevent sun damage on sensitive skin.

### 📊 CombineSense AI (Health Report)
The ultimate grand dashboard! It aggregates data from all 8 sensors above into a single, comprehensive "Overall Health Score", complete with printable PDF reports for your veterinarian.

---

## 🤖 Integrated AI Pet Chatbot

Right at the center of the application's bottom navigation bar sits our **Floating AI Chatbot**. 
- **Context-Aware**: Ask questions about your pet's diet, strange behaviors, or symptoms.
- **Smart Replies**: Instant, intelligent advice powered by Google Gemini AI.
- **Perfectly Sized**: Custom-built chat interface that perfectly fits mobile screens without awkward scrolling.

---

## 📖 Breed Encyclopedia

Accessible directly from the Home Dashboard via a sleek quick-action card. 
- Browse over 350+ dog breeds.
- Learn about specific temperaments, dietary needs, exercise requirements, and breed-specific genetic health risks.

---

## 📱 Premium UI/UX Design

We believe healthcare applications shouldn't look sterile. Pawsitive Diagnostics uses a state-of-the-art design language:
- **Glassmorphism Aesthetic**: Beautiful frosted-glass cards, vibrant pastel gradients, and subtle drop-shadows.
- **Fluid Animations**: Every tap, page transition, and chart load is butter-smooth, powered by Framer Motion.
- **Dynamic Hardware States**: The UI reacts instantly to the collar's status. If the collar disconnects, the vibrant green "LIVE" health score gracefully fades to a grey "Offline" state.
- **One-Tap Emergency**: A dedicated SOS button (1962 - National Vet Care) is always accessible in the top header.

---

## 🛠️ Technology Stack

This application is built with modern web technologies for maximum speed, reliability, and cross-platform compatibility:

- **Frontend Framework**: React 18 (with TypeScript)
- **Build Tool**: Vite (Lightning-fast HMR and bundling)
- **Styling**: Tailwind CSS (Utility-first styling)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Integration**: Google Generative AI (Gemini 1.5 Pro)
- **Routing**: React Router DOM

---

## 🚀 Getting Started

Want to run the Pawsitive Diagnostics dashboard locally? 

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Pawsitive_Diagnostics.git
   cd Pawsitive_Diagnostics
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

5. **View the App:**
   Open `http://localhost:8080` (or the port specified by Vite) in your browser. For the best experience, toggle your browser's DevTools to mobile-view!

---

## 👨‍💻 Developed By
**Pawsitive Innovators** - *Bridging the gap between animals and technology.*

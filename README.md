# Pawsitive Diagnostics v1

An early-stage animal-health monitoring prototype that connects wearable-sensor concepts, a mobile-first dashboard, cloud data flow, and experimental machine-learning modules.

Pawsitive Diagnostics is being developed as a student startup by an interdisciplinary team. I lead the software and startup tracks: backend and cloud architecture, model experimentation, hardware-to-application integration, technical planning, team coordination, pitch development, and exploration of funding and intellectual-property pathways.

> **Research prototype:** This software is not a veterinary medical device. Its scores and classifications have not been clinically validated and must not be used to diagnose or treat an animal.

## What is in this repository

- **React/TypeScript application** for pet profiles, sensor dashboards, reports, maps, and owner-facing interactions
- **FastAPI prototype** defining interfaces for audio, image, motion, environmental, and combined-health analyses
- **Experimental ML modules** for feature extraction, anomaly detection, clustering, and multimodal score aggregation
- **Supabase integration** for application data
- **Hardware design files** including PCB schematics, fabrication outputs, and component documentation
- **Capacitor configuration** for packaging the web application for mobile platforms

## System view

```text
Wearable sensors / media
          |
          v
  ESP32 and telemetry layer
          |
          v
Cloud storage and FastAPI interfaces
          |
          v
Experimental signal / ML modules
          |
          v
React dashboard and shareable reports
```

The repository brings these layers together so that changes to a sensor or model can be traced through the backend and into the user interface. Some screens and API responses still use simulated data while hardware integration and dataset collection continue.

## Experimental analysis modules

| Module | Current engineering direction |
| --- | --- |
| BarkSense | Acoustic features and prototype vocalisation classification |
| SkinSense | Image-processing and transfer-learning experiments |
| MotionSense | IMU feature extraction and gait/activity analysis |
| LocationSense | Spatial clustering and safe-zone logic |
| TemperatureSense | Thermal trend and anomaly analysis |
| VitalSense | Filtering and peak detection for physiological signals |
| PressureSense | Barometric trend analysis |
| LightSense | Light/UV exposure estimation |
| CombineSense | Experimental aggregation of multiple signals |

These modules are engineering experiments. Model architecture files do not imply that a model is trained, calibrated, or ready for deployment; performance must be established on representative labelled datasets.

## Technology

React · TypeScript · Vite · Tailwind CSS · FastAPI · Python · PyTorch/TensorFlow experiments · Supabase · AWS · Docker · ESP32 · Capacitor

## Run the web application

### Prerequisites

- Node.js 18+
- npm

```bash
git clone https://github.com/AdilSukumar/Pawsitive_Diagnostics_v1.git
cd Pawsitive_Diagnostics_v1
npm install
cp .env.example .env
npm run dev
```

Review `.env.example` before enabling external services. Never commit API keys.

## Run the ML/API prototype

```bash
cd ml_backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn api.main:app --reload
```

## Validation status and next steps

- Replace simulated API outputs with versioned model artefacts.
- Build a consented, labelled dataset with veterinary guidance.
- Define subject-level train/validation/test splits and report uncertainty.
- Validate sensor reliability against reference instruments.
- Add integration tests from telemetry ingestion through report generation.
- Conduct usability and safety reviews before any real-world health use.

## Team and recognition

The project has been presented at national student innovation events, including a nationwide second-place ideathon result and a top-six national hackathon finish. The team is preparing an intellectual-property application and exploring institutional support. These milestones reflect product development; they are not evidence of clinical efficacy.

## License

See [LICENSE](LICENSE).

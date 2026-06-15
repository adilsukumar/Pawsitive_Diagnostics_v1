# Pawsitive Diagnostics - AI Backend

This repository contains the Machine Learning microservices powering the **Sense AI** suite. 

## Architecture

The backend exposes a highly scalable FastAPI server that routes incoming sensor telemetry and media to specialized deep learning models. 

### Supported Models
1. **BarkSense**: LSTM-based acoustic emotion classifier (PyTorch + Librosa)
2. **SkinSense**: Fine-tuned ResNet50 for dermatological lesion classification (TorchVision)
3. **MotionSense**: 1D-CNN for IMU GAIT analysis
4. **LocationSense**: DBSCAN spatial clustering for safe-zone anomaly detection
5. **PressureSense**: ARIMA/Prophet time-series forecasting for barometric trends
6. **LightSense**: Multi-variate regression for UV exposure limits
7. **VitalSense**: SciPy peak-detection and filtering for PPG/ECG signals
8. **TemperatureSense**: Autoencoder for thermal anomaly detection
9. **CombineSense**: XGBoost ensemble model calculating the Overall Health Score

## Getting Started

```bash
pip install -r requirements.txt
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

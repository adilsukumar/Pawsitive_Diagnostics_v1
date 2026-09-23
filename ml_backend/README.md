# Experimental ML and API layer

This directory contains the Python/FastAPI side of the Pawsitive Diagnostics research prototype. It provides interfaces and exploratory modules for working with wearable, audio, image, location, and environmental data.

## Current status

The API routes in `api/main.py` currently return representative responses so the end-to-end application can be integrated before trained model artefacts are available. Files under `src/` demonstrate candidate preprocessing and modelling approaches; they should not be interpreted as validated veterinary models.

| Area | Prototype approach |
| --- | --- |
| Vocalisation | Audio features and sequence-classification experiments |
| Skin imagery | Transfer-learning experiments for image classification |
| Motion | IMU feature extraction and temporal modelling |
| Location | DBSCAN-based spatial clustering |
| Environment | Trend, exposure, and anomaly analysis |
| Vital signals | Filtering and peak detection |
| Combined score | Experimental multimodal aggregation |

## Run locally

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

Open `http://localhost:8000/docs` for the generated API documentation.

## Responsible-use note

Outputs are for software integration and research experimentation only. No endpoint in this prototype is clinically validated, and none should be used for veterinary diagnosis or treatment decisions.

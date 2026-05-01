# GitOps Pipeline Dashboard

Cloud Computing Masters Project - GitOps CI/CD pipeline using Google Cloud Build and GKE.

## Project Overview

This project implements a GitOps-based CI/CD pipeline with a monitoring dashboard. The dashboard displays:
- Git repository branches
- Cloud Build status and logs
- GKE deployment status
- Container images in Artifact Registry

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  App Repo   │────▶│ Cloud Build │────▶│  Artifact   │
│  (GitHub)   │     │    (CI)     │     │  Registry   │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                          │                    │
                          ▼                    │
                   ┌─────────────┐             │
                   │  Env Repo   │◀────────────┘
                   │  (GitHub)   │
                   └──────┬──────┘
                          │
                          ▼
                   ┌─────────────┐     ┌─────────────┐
                   │ Cloud Build │────▶│    GKE      │
                   │    (CD)     │     │  Cluster    │
                   └─────────────┘     └──────┬──────┘
                                              │
                                              ▼
                                       ┌─────────────┐
                                       │ Dashboard   │
                                       │  (Pods)     │
                                       └─────────────┘
```

## Directory Structure

```
├── app/                    # Vite + Vue frontend
│   ├── src/
│   │   ├── components/     # Dashboard cards
│   │   ├── api.js         # API fetch functions
│   │   └── App.vue        # Main dashboard
│   └── package.json
├── server/                 # Express backend
│   ├── routes/            # API endpoints
│   └── index.js           # Server entry
├── Dockerfile             # Multi-stage build
├── cloudbuild-ci.yaml     # CI pipeline
└── TASK.md                # Implementation checklist
```

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- npm
- gcloud CLI (for GCP deployment)
- Docker Desktop

### Run Locally

```bash
# Frontend
cd app
npm install
npm run dev

# Backend (in another terminal)
cd server
npm install
node index.js

# Open http://localhost:8080
```

### Build Docker Image

```bash
docker build -t dashboard:test .
docker run -p 8080:8080 dashboard:test
```

## GCP Deployment Setup

### 1. Enable APIs

```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable container.googleapis.com
```

### 2. Create GKE Cluster

```bash
gcloud container clusters create dashboard-cluster \
  --zone us-central1-a \
  --num-nodes 1 \
  --machine-type e2-medium
```

### 3. Create Artifact Registry

```bash
gcloud artifacts repositories create docker-images \
  --repository-format=docker \
  --location=us-central1
```

### 4. Create Service Account

```bash
gcloud iam service-accounts create dashboard-viewer

gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:dashboard-viewer@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/cloudbuild.viewer"

gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:dashboard-viewer@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/container.viewer"

gcloud projects add-iam-policy-binding PROJECT_ID \
  --member="serviceAccount:dashboard-viewer@PROJECT_ID.iam.gserviceaccount.com" \
  --role="roles/artifactregistry.reader"

gcloud iam service-accounts keys create sa-key.json \
  --iam-account=dashboard-viewer@PROJECT_ID.iam.gserviceaccount.com
```

### 5. Connect GitHub to Cloud Build

1. Go to Cloud Build > Triggers
2. Connect your GitHub repositories
3. Create CI trigger for app-repo (push to main)
4. Create CD trigger for env-repo (push to main)

### 6. Create K8s Secret

```bash
kubectl create secret generic gcp-sa-key \
  --from-file=key.json=sa-key.json
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_CLOUD_PROJECT` | GCP Project ID | For GCP deployment |
| `GITHUB_REPO` | App repo URL | For branch listing |
| `GITHUB_TOKEN` | GitHub API token | Optional (for private repos) |
| `GKE_CLUSTER` | GKE cluster name | For deployment status |
| `GKE_LOCATION` | GKE cluster zone | For deployment status |

## Submission Checklist

See [TASK.md](TASK.md) for detailed implementation checklist.

## License

MIT# Test
test trigger
CI fix attempt
Re-trigger CI

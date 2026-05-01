# GitOps Pipeline Dashboard - Implementation Checklist

> Cloud Computing Masters Project - GitOps CI/CD Pipeline using Cloud Build and GKE
> **Status: Phase 1 COMPLETE - Dashboard Deployed!**

## Status Legend
- ✅ Complete
- 🔄 In Progress
- ⏳ Pending
- ❌ Blocked

---

## Phase 1: GCP Infrastructure Setup ✅

### Step 1.1: Enable Required APIs ✅
- [x] Cloud Build API
- [x] Artifact Registry API
- [x] Kubernetes Engine API
- [x] Compute Engine API

### Step 1.2: Create GKE Cluster ✅
- [x] Create zonal cluster (us-central1-a)
- [x] Configure node pool (1-2 nodes, e2-medium)
- [x] Get cluster credentials
- [x] Cluster RUNNING at 34.29.181.172

**Project ID:** gitops-dashboard-1777657343
**Cluster:** dashboard-cluster
**Billing Account:** 012FFD-ECA1BD-741139 (Education)

### Step 1.3: Create Artifact Registry ✅
- [x] Create docker-images repository
- [x] Configure location (us-central1)
- [x] Repository: us-central1-docker.pkg.dev/gitops-dashboard-1777657343/docker-images

### Step 1.4: Create Service Account ✅
- [x] Create `dashboard-viewer` SA
- [x] Grant viewer roles (cloudbuild, container, artifactregistry)
- [x] Download JSON key file (sa-key.json - KEEP SECURE!)

### Step 1.5: Create Cloud Build Triggers ⏳
- [ ] CI trigger (app-repo push to main) - Manual push completed
- [ ] CD trigger (env-repo push to main) - Manual deploy completed
- [ ] Connect GitHub repositories - PENDING

### Step 1.6: Create K8s Secret ✅
- [x] Create gcp-sa-key secret in cluster
- [x] Mount in deployment

---

## Phase 2: Dashboard Application ✅

### Step 2.1: Initialize Vite Frontend ✅
- [x] Create app/ directory
- [x] Initialize Vite + React project
- [x] Install Tailwind CSS
- [x] Configure Tailwind
- [x] Create 4 card components
- [x] Implement API fetch functions
- [x] Add polling refresh (30s interval)

### Step 2.2: Build Express Backend ✅
- [x] Create server/ directory
- [x] Install Express + GCP SDKs
- [x] Implement `/api/branches` endpoint
- [x] Implement `/api/builds` endpoint
- [x] Implement `/api/builds/:id` endpoint
- [x] Implement `/api/deployments` endpoint
- [x] Implement `/api/images` endpoint
- [x] Configure static file serving
- [x] Add error handling

### Step 2.3: Create Dockerfile ✅
- [x] Stage 1: Build frontend
- [x] Stage 2: Backend + static files
- [x] Test local Docker build

---

## Phase 3: Kubernetes Deployment ✅

### Step 3.1: deployment.yaml ✅
- [x] Define deployment spec (2 replicas)
- [x] Configure resource limits (256Mi, 100m CPU)
- [x] Mount SA secret volume
- [x] Add liveness/readiness probes

### Step 3.2: service.yaml ✅
- [x] Define LoadBalancer service
- [x] Expose port 80
- [x] External IP assigned: **35.193.222.155**

---

## Phase 4: Testing & Verification ✅

### Step 4.1: Deployment Verification ✅
- [x] Pods running (2/2 Ready)
- [x] Service accessible via LoadBalancer IP
- [x] All API endpoints working:
  - `/api/branches` ✓
  - `/api/builds` ✓
  - `/api/deployments` ✓
  - `/api/images` ✓
- [x] Dashboard HTML loads

### Step 4.2: Capture Screenshots ⏳
- [ ] Cloud Build logs (manual push used)
- [ ] GKE deployment status
- [ ] Dashboard running
- [ ] Artifact Registry images

---

## Phase 5: GitHub Integration ⏳

**NEXT STEPS REQUIRED:**

### Step 5.1: Create GitHub Repositories
1. Create app-repo on GitHub
2. Create env-config repo on GitHub
3. Push local code to app-repo

### Step 5.2: Connect Cloud Build
1. Connect GitHub repos to Cloud Build
2. Create CI trigger for app-repo
3. Create CD trigger for env-config repo
4. Create GitHub token secret in Secret Manager

### Step 5.3: Test GitOps Flow
1. Push change to app-repo
2. Verify CI trigger builds image
3. Verify env-config updated
4. Verify CD trigger deploys to GKE

---

## Live Deployment Info

**Dashboard URL:** http://35.193.222.155/

**GKE Cluster:**
- Name: dashboard-cluster
- Zone: us-central1-a
- Status: RUNNING
- Endpoint: 34.29.181.172

**Artifact Registry:**
- Repository: docker-images
- Location: us-central1
- Image: dashboard:latest

**Service Account:**
- Name: dashboard-viewer@gitops-dashboard-1777657343.iam.gserviceaccount.com
- Roles: cloudbuild.viewer, container.viewer, artifactregistry.reader
- Key file: sa-key.json (in project directory - DO NOT COMMIT!)

---

## Quick Reference Commands

### Check Deployment Status
```bash
kubectl get pods
kubectl get services
kubectl logs deployment/dashboard
```

### Access Dashboard
```bash
curl http://35.193.222.155/api/branches
# Open in browser: http://35.193.222.155
```

### Push New Image
```bash
docker build -t dashboard:new .
docker tag dashboard:new us-central1-docker.pkg.dev/gitops-dashboard-1777657343/docker-images/dashboard:new
docker push us-central1-docker.pkg.dev/gitops-dashboard-1777657343/docker-images/dashboard:new
kubectl set image deployment/dashboard dashboard=us-central1-docker.pkg.dev/gitops-dashboard-1777657343/docker-images/dashboard:new
```

---

## Notes

- **DO NOT commit sa-key.json to GitHub!** (Added to .gitignore)
- GitHub integration required for full GitOps workflow
- Manual deployment used for initial setup
- Dashboard currently shows mock data for builds (no Cloud Build triggers yet)
- Deployments endpoint shows real GKE cluster status

---

**Last Updated:** 2026-05-01
**Progress:** Phase 1-4 Complete | Phase 5 Pending (GitHub integration)
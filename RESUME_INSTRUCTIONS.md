# GitOps Pipeline Dashboard - Resume Instructions

**Project**: Cloud Computing Masters - GitOps CI/CD Pipeline
**Status**: Fully operational (paused to conserve credits)
**Last Updated**: 2026-05-02

---

## Quick Resume - 3 Steps

### 1. Verify GKE Deployment

```bash
# Check pods are running
kubectl get pods -l app=dashboard

# Expected output:
# NAME                         READY   STATUS    RESTARTS   AGE
# dashboard-xxxx-xxxx          1/1     Running   0          Xm

# Check service
kubectl get svc dashboard

# Expected: LoadBalancer with EXTERNAL-IP: 35.193.222.155
```

### 2. Access Dashboard

**Direct URL**: http://35.193.222.155

Dashboard shows:
- Git Branches (from GitHub)
- Cloud Build history
- GKE deployment status
- Container images in Artifact Registry

### 3. Verify Cloud Build Triggers

```bash
# List recent builds
gcloud builds list --limit=5 --project=gitops-dashboard-1777657343

# Check trigger status
gcloud builds triggers list --project=gitops-dashboard-1777657343
```

---

## GCP Resources (Already Created)

| Resource | Name | Status |
|----------|------|--------|
| GKE Cluster | dashboard-cluster | us-central1-a, 1 node |
| Artifact Registry | docker-images | us-central1 |
| Service Account | dashboard-viewer | Active |
| Cloud Build Trigger (CI) | gitops-dashboard-ci | Active |
| Secret | github-token | Version 3 (latest) |

---

## Trigger New Build (If Needed)

```bash
# Make a code change
git add .
git commit -m "Update feature"
git push origin master

# Cloud Build will automatically:
# 1. Build Docker image
# 2. Push to Artifact Registry
# 3. Update env-repo with new tag
# 4. Trigger CD deployment
```

---

## Manual Deployment Update (If CD Fails)

```bash
# Get latest image tag
gcloud artifacts docker images list \
  us-central1-docker.pkg.dev/gitops-dashboard-1777657343/docker-images/dashboard \
  --limit=1 --project=gitops-dashboard-1777657343

# Update deployment manually
kubectl set image deployment/dashboard dashboard=\
  us-central1-docker.pkg.dev/gitops-dashboard-1777657343/docker-images/dashboard:TAG

# Wait for rollout
kubectl rollout status deployment/dashboard --timeout=120s
```

---

## Troubleshooting

### Pods not running:
```bash
kubectl describe pod dashboard-xxxx-xxxx
kubectl logs dashboard-xxxx-xxxx
```

### Build failing:
```bash
gcloud builds describe BUILD_ID --project=gitops-dashboard-1777657343
gcloud builds log BUILD_ID --project=gitops-dashboard-1777657343
```

### Dashboard not loading:
```bash
# Check if pods are running
kubectl get pods -l app=dashboard

# Check service endpoint
kubectl get endpoints dashboard

# Test API directly
curl http://35.193.222.155/api/builds
```

---

## GitHub Repositories

- **App Repo**: https://github.com/dev-Danialw/gitops-dashboard
- **Env Repo**: https://github.com/dev-Danialw/gitops-dashboard-env

---

## Key Commands Reference

```bash
# GKE
kubectl get all -l app=dashboard
kubectl describe deployment dashboard
kubectl rollout history deployment/dashboard

# Cloud Build
gcloud builds list --project=gitops-dashboard-1777657343
gcloud builds triggers describe gitops-dashboard-ci --project=gitops-dashboard-1777657343

# Artifact Registry
gcloud artifacts docker images list us-central1-docker.pkg.dev/gitops-dashboard-1777657343/docker-images/dashboard

# Secrets
gcloud secrets versions list github-token --project=gitops-dashboard-1777657343
```

---

## Pause/Resume Credits

**To Pause** (minimize costs):
```bash
# Scale down deployment
kubectl scale deployment dashboard --replicas=0

# Stop GKE cluster (if needed)
gcloud container clusters resize dashboard-cluster \
  --size=0 --zone=us-central1-a --project=gitops-dashboard-1777657343
```

**To Resume**:
```bash
# Scale up deployment
kubectl scale deployment dashboard --replicas=2

# Resize GKE cluster (if stopped)
gcloud container clusters resize dashboard-cluster \
  --size=1 --zone=us-central1-a --project=gitops-dashboard-1777657343
```

---

## Project IDs Reference

- **GCP Project**: gitops-dashboard-1777657343
- **GitHub User**: dev-Danialw
- **Cluster**: dashboard-cluster
- **Zone**: us-central1-a
- **Region**: us-central1
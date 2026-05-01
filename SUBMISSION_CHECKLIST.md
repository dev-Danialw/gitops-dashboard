# Submission Checklist

**Project**: GitOps Pipeline using Cloud Build and GKE
**Group**: [Add group members names and Qalam IDs]
**Submission Date**: 2026-05-02

---

## ZIP File Structure

```
gitops-dashboard-submission.zip
│
├── Project Report.pdf (or .docx)
│   ├── Abstract
│   ├── Introduction
│   ├── Objectives
│   ├── System Architecture
│   ├── Methodology
│   ├── Results & Evaluation
│   ├── Conclusion
│   ├── References
│   └── Group Details (names + Qalam IDs on title page)
│
├── Architecture Diagram.png
│   └── Shows: CI/CD pipeline, Git repos, Cloud Build, GKE, Artifact Registry
│
├── app-code/ (copy of gitops-dashboard repo)
│   ├── app/
│   │   ├── src/
│   │   │   ├── components/ (BranchCard, BuildCard, DeployCard, ImageCard)
│   │   │   ├── App.jsx
│   │   │   ├── api.js
│   │   │   └── index.css
│   │   ├── package.json
│   │   └── vite.config.js
│   ├── server/
│   │   ├── routes/ (branches, builds, deployments, images)
│   │   ├── index.js
│   │   └── package.json
│   ├── Dockerfile
│   ├── cloudbuild-ci.yaml
│   ├── README.md
│   └── RESUME_INSTRUCTIONS.md
│
├── env-config/ (copy of gitops-dashboard-env repo)
│   ├── manifests/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── cloudbuild-cd.yaml
│   └── README.md
│
├── screenshots/
│   ├── dashboard-live.png
│   ├── cloud-build-history.png
│   ├── cloud-build-detail.png
│   ├── gke-workloads.png
│   ├── gke-services.png
│   ├── artifact-registry.png
│   ├── github-app-repo.png
│   └── github-env-repo.png
│
└── demo-link.txt (optional)
    └── YouTube/Google Drive link to demo video
```

---

## How to Create ZIP File

### Option 1: From GitHub Repos

```bash
# Clone both repos
git clone https://github.com/dev-Danialw/gitops-dashboard.git app-code
git clone https://github.com/dev-Danialw/gitops-dashboard-env.git env-config

# Create ZIP
zip -r gitops-dashboard-submission.zip \
  Project_Report.pdf \
  Architecture_Diagram.png \
  app-code/ \
  env-config/ \
  screenshots/ \
  demo-link.txt
```

### Option 2: Direct from local

```bash
cd C:\Users\Danial\Desktop\cloud_computing_semester_project

# Remove node_modules and git folders to reduce size
rm -rf app/node_modules app/.git server/node_modules env-config/.git

# Create ZIP
# Use Windows Explorer: Right-click folder → Send to → Compressed folder
# OR use PowerShell:
Compress-Archive -Path "app,server,env-config,screenshots,Dockerfile,cloudbuild-ci.yaml,README.md,RESUME_INSTRUCTIONS.md" -DestinationPath "gitops-dashboard-submission.zip"
```

---

## Files Already Complete ✅

| File | Location | Status |
|------|----------|--------|
| `Project Report` | Provided by user | ✅ Ready |
| `Architecture Diagram` | In report | ✅ Ready |
| `app-code` | https://github.com/dev-Danialw/gitops-dashboard | ✅ Ready |
| `env-config` | https://github.com/dev-Danialw/gitops-dashboard-env | ✅ Ready |
| `cloudbuild-ci.yaml` | app-code root | ✅ Ready |
| `screenshots` | screenshots/ folder | ✅ Ready (user added) |
| `RESUME_INSTRUCTIONS.md` | app-code root | ✅ Created |

---

## Still Needed ⏳

1. **Group Details** - Add names + Qalam IDs to report title page
2. **Demo Video** (optional) - 2-5 minutes showing pipeline workflow
3. **ZIP creation** - Package all files

---

## Verification Before Submission

```bash
# 1. Check dashboard is live
curl http://35.193.222.155
# Expected: HTML response

# 2. Check builds are working
gcloud builds list --limit=3 --project=gitops-dashboard-1777657343
# Expected: Recent SUCCESS builds

# 3. Check deployment
kubectl get pods -l app=dashboard
# Expected: 2/2 Running

# 4. Check all links work in dashboard
# Open http://35.193.222.155 and click each link
```

---

## Important Submission Rules

- ✅ Only ONE member submits
- ✅ Single ZIP file only
- ✅ All files open correctly (test before submit)
- ✅ Complete project (no missing files)
- ⚠️ Plagiarism = strict disciplinary action

---

## Console Links for Screenshots

| Screenshot | Console URL |
|------------|-------------|
| Cloud Build History | https://console.cloud.google.com/cloud-build/builds?project=gitops-dashboard-1777657343 |
| GKE Workloads | https://console.cloud.google.com/kubernetes/workload?project=gitops-dashboard-1777657343 |
| GKE Services | https://console.cloud.google.com/kubernetes/service?project=gitops-dashboard-1777657343 |
| LoadBalancer | https://console.cloud.google.com/net-services/loadbalancing/details/network/us-central1/a5af08df413a34eb795e20be3a5145f4?project=gitops-dashboard-1777657343 |
| Artifact Registry | https://console.cloud.google.com/artifacts?project=gitops-dashboard-1777657343 |
| GitHub App Repo | https://github.com/dev-Danialw/gitops-dashboard |
| GitHub Env Repo | https://github.com/dev-Danialw/gitops-dashboard-env |

---

## Final Checklist

- [ ] Project Report with group details
- [ ] Architecture diagram included
- [ ] All source code included (app + env repos)
- [ ] CI/CD config files included
- [ ] Screenshots included
- [ ] Demo video/link (optional)
- [ ] ZIP file created and tested
- [ ] Dashboard verified working
- [ ] Submitted by ONE group member
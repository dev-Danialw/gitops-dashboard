---
name: Fix Cloud Build Secret Injection for GitHub Token
description: Resolve Cloud Build substitution error when using Secret Manager tokens in git clone step
type: project
---

## Problem

Cloud Build CI pipeline fails with error:
```
"GITHUB_TOKEN" is not a valid built-in substitution
```

Root cause: Cloud Build parses `$GITHUB_TOKEN` as substitution variable before secret injection.

## Solution

Use `$$GITHUB_TOKEN` (double dollar sign) in bash args. Single `$` triggers Cloud Build substitution parser. `$$` tells parser "resolve from secretEnv at runtime."

## Implementation

**File**: `cloudbuild-ci.yaml`

**Change**: Replace `$GITHUB_TOKEN` with `$$GITHUB_TOKEN` in step 3 bash script.

```yaml
- name: 'ubuntu'
  entrypoint: 'bash'
  args:
    - '-c'
    - |
      apt-get update && apt-get install -y git
      if [ -z "$$GITHUB_TOKEN" ]; then
        echo "ERROR: GITHUB_TOKEN not set"
        exit 1
      fi
      git clone https://$$GITHUB_TOKEN@github.com/${_ENV_REPO_OWNER}/${_ENV_REPO_NAME}.git env-config
      cd env-config
      sed -i "s|image:.*dashboard.*|image: ${_REGION}-docker.pkg.dev/${PROJECT_ID}/${_REPO}/dashboard:${SHORT_SHA}|" manifests/deployment.yaml
      git config user.name "Cloud Build"
      git config user.email "cloudbuild@${PROJECT_ID}.iam.gserviceaccount.com"
      git add manifests/deployment.yaml
      git commit -m "Update dashboard image to ${SHORT_SHA}"
      git push origin master
  secretEnv: ['GITHUB_TOKEN']
```

## Constraints

- Branch: `master` (env-repo uses master, not main)
- Service account: `dashboard-viewer@gitops-dashboard-1777657343.iam.gserviceaccount.com`
- IAM: Already has `secretmanager.secretAccessor` role
- Secret: `projects/gitops-dashboard-1777657343/secrets/github-token/versions/latest`

## Verification

1. Push fix to app-repo
2. Trigger Cloud Build via push
3. Check build logs for step 3 success
4. Verify env-repo updated with new image tag
5. Confirm CD trigger deploys to GKE
const express = require('express')
const router = express.Router()
const { CloudBuildClient } = require('@google-cloud/cloudbuild')

// Cloud Build client - uses ADC (Application Default Credentials)
const cloudbuild = new CloudBuildClient()
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT

router.get('/', async (req, res) => {
  try {
    if (!PROJECT_ID) {
      // Mock data if no project ID
      return res.json([
        { id: 'build-001', status: 'SUCCESS', createTime: Date.now() - 3600000 },
        { id: 'build-002', status: 'FAILURE', createTime: Date.now() - 7200000 },
        { id: 'build-003', status: 'SUCCESS', createTime: Date.now() - 10800000 }
      ])
    }

    const [builds] = await cloudbuild.listBuilds({
      projectId: PROJECT_ID,
      pageSize: 10
    })

    const result = builds.map(b => ({
      id: b.id,
      status: b.status,
      createTime: b.createTime?.seconds * 1000 || Date.now(),
      triggerId: b.buildTriggerId,
      commitSha: b.source?.gitSource?.revision?.substring(0, 7) || b.substitutions?.SHORT_SHA,
      repoName: b.source?.gitSource?.url?.match(/github\.com\/([^/]+)\/([^/]+)/)?.slice(1, 3) || ['dev-Danialw', 'gitops-dashboard']
    }))

    res.json(result)
  } catch (error) {
    console.error('Error fetching builds:', error.message)
    res.json([
      { id: 'build-001', status: 'SUCCESS', createTime: Date.now() - 3600000 },
      { id: 'build-002', status: 'FAILURE', createTime: Date.now() - 7200000 }
    ])
  }
})

router.get('/:id', async (req, res) => {
  try {
    const buildId = req.params.id

    if (!PROJECT_ID) {
      return res.json({
        id: buildId,
        status: 'SUCCESS',
        createTime: Date.now(),
        steps: [
          { name: 'Build', status: 'SUCCESS' },
          { name: 'Push', status: 'SUCCESS' }
        ],
        logsUrl: `https://console.cloud.google.com/cloud-build/builds/${buildId}`
      })
    }

    const [build] = await cloudbuild.getBuild({
      projectId: PROJECT_ID,
      id: buildId
    })

    res.json({
      id: build.id,
      status: build.status,
      createTime: build.createTime?.seconds * 1000,
      steps: build.steps?.map(s => ({ name: s.name, status: s.status })),
      logsUrl: `https://console.cloud.google.com/cloud-build/builds/${build.id}?project=${PROJECT_ID}`
    })
  } catch (error) {
    console.error('Error fetching build details:', error.message)
    res.status(500).json({ error: error.message })
  }
})

module.exports = router
const express = require('express')
const router = express.Router()
const { ArtifactRegistryClient } = require('@google-cloud/artifact-registry')

// Artifact Registry client
const artifactRegistry = new ArtifactRegistryClient()
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT
const REPOSITORY = process.env.ARTIFACT_REPO || 'docker-images'
const LOCATION = process.env.ARTIFACT_LOCATION || 'us-central1'

router.get('/', async (req, res) => {
  try {
    if (!PROJECT_ID) {
      // Mock data
      return res.json([
        {
          name: 'dashboard',
          tags: ['latest', 'abc123', 'def456'],
          createTime: Date.now() - 86400000
        }
      ])
    }

    const parent = `projects/${PROJECT_ID}/locations/${LOCATION}/repositories/${REPOSITORY}`

    const [packages] = await artifactRegistry.listPackages({ parent })

    // Get docker images (packages in Artifact Registry)
    const result = await Promise.all(
      packages.slice(0, 10).map(async pkg => {
        try {
          const [versions] = await artifactRegistry.listVersions({
            parent: pkg.name,
            pageSize: 5
          })

          return {
            name: pkg.name.split('/').pop(),
            tags: versions.map(v => v.name.split('/').pop()).slice(0, 5),
            createTime: versions[0]?.createTime?.seconds * 1000 || Date.now()
          }
        } catch {
          return {
            name: pkg.name.split('/').pop(),
            tags: ['latest'],
            createTime: Date.now()
          }
        }
      })
    )

    res.json(result)
  } catch (error) {
    console.error('Error fetching images:', error.message)
    res.json([
      {
        name: 'dashboard',
        tags: ['latest'],
        createTime: Date.now()
      }
    ])
  }
})

module.exports = router
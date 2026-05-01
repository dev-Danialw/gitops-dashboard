const express = require('express')
const router = express.Router()
const { ClusterManagerClient } = require('@google-cloud/container')

// GKE client
const containerClient = new ClusterManagerClient()
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT
const CLUSTER_NAME = process.env.GKE_CLUSTER || 'dashboard-cluster'
const CLUSTER_LOCATION = process.env.GKE_LOCATION || 'us-central1-a'

router.get('/', async (req, res) => {
  try {
    if (!PROJECT_ID) {
      // Mock data
      return res.json({
        pods: { ready: 2, total: 2 },
        service: { type: 'LoadBalancer', externalIP: 'Pending' },
        deployment: { name: 'dashboard', replicas: 2 }
      })
    }

    // Get cluster info
    const [cluster] = await containerClient.getCluster({
      name: `projects/${PROJECT_ID}/locations/${CLUSTER_LOCATION}/clusters/${CLUSTER_NAME}`
    })

    // Note: For detailed pod/deployment info, we'd need kubectl or Kubernetes API
    // This simplified version returns cluster status

    res.json({
      pods: { ready: cluster.currentNodeCount || 1, total: cluster.currentNodeCount || 1 },
      service: { type: 'LoadBalancer', externalIP: 'Check via kubectl' },
      deployment: {
        name: 'dashboard',
        replicas: 2,
        cluster: cluster.name
      },
      clusterStatus: cluster.status
    })
  } catch (error) {
    console.error('Error fetching deployments:', error.message)
    res.json({
      pods: { ready: 0, total: 0 },
      service: { type: 'N/A' },
      deployment: { name: 'N/A' },
      error: error.message
    })
  }
})

module.exports = router
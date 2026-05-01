const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

// GitHub repo URL - can be configured via env
const GITHUB_REPO = process.env.GITHUB_REPO || 'https://github.com/YOUR_USERNAME/app-repo'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN // Optional for private repos

router.get('/', async (req, res) => {
  try {
    // Extract owner/repo from GitHub URL
    const match = GITHUB_REPO.match(/github\.com\/([^/]+)\/([^/]+)/)
    if (!match) {
      return res.json([
        { name: 'main', active: true, isMain: true },
        { name: 'develop', active: false, isMain: false }
      ])
    }

    const owner = match[1]
    const repo = match[2]

    const headers = {}
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches`, {
      headers
    })

    if (!response.ok) {
      // Fallback to mock data if GitHub API fails
      return res.json([
        { name: 'main', active: true, isMain: true },
        { name: 'develop', active: false, isMain: false }
      ])
    }

    const branches = await response.json()

    const result = branches.map(b => ({
      name: b.name,
      active: b.name === 'main',
      isMain: b.name === 'main'
    }))

    res.json(result)
  } catch (error) {
    console.error('Error fetching branches:', error.message)
    // Return mock data on error
    res.json([
      { name: 'main', active: true, isMain: true },
      { name: 'develop', active: false, isMain: false }
    ])
  }
})

module.exports = router
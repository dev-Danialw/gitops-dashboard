const API_BASE = '/api'

export async function fetchBranches() {
  const res = await fetch(`${API_BASE}/branches`)
  if (!res.ok) throw new Error(`Failed to fetch branches: ${res.statusText}`)
  return res.json()
}

export async function fetchBuilds() {
  const res = await fetch(`${API_BASE}/builds`)
  if (!res.ok) throw new Error(`Failed to fetch builds: ${res.statusText}`)
  return res.json()
}

export async function fetchBuildDetails(id) {
  const res = await fetch(`${API_BASE}/builds/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch build details: ${res.statusText}`)
  return res.json()
}

export async function fetchDeployments() {
  const res = await fetch(`${API_BASE}/deployments`)
  if (!res.ok) throw new Error(`Failed to fetch deployments: ${res.statusText}`)
  return res.json()
}

export async function fetchImages() {
  const res = await fetch(`${API_BASE}/images`)
  if (!res.ok) throw new Error(`Failed to fetch images: ${res.statusText}`)
  return res.json()
}
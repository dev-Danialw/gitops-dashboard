import { useState, useEffect } from 'react'
import BranchCard from './components/BranchCard'
import BuildCard from './components/BuildCard'
import DeployCard from './components/DeployCard'
import ImageCard from './components/ImageCard'
import { fetchBranches, fetchBuilds, fetchDeployments, fetchImages } from './api'
import './index.css'

function App() {
  const [branches, setBranches] = useState([])
  const [builds, setBuilds] = useState([])
  const [deployments, setDeployments] = useState({})
  const [images, setImages] = useState([])
  const [lastRefresh, setLastRefresh] = useState(new Date().toLocaleTimeString())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function refreshAll() {
    setLoading(true)
    setError(null)

    try {
      const [b, bu, d, i] = await Promise.all([
        fetchBranches(),
        fetchBuilds(),
        fetchDeployments(),
        fetchImages()
      ])

      setBranches(b)
      setBuilds(bu)
      setDeployments(d)
      setImages(i)
      setLastRefresh(new Date().toLocaleTimeString())
    } catch (e) {
      setError(e.message)
    }

    setLoading(false)
  }

  useEffect(() => {
    refreshAll()
    const interval = setInterval(refreshAll, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Global Nav - Apple Style */}
      <nav style={{
        background: '#000000',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px'
      }}>
        <span style={{
          fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif',
          fontSize: '12px',
          fontWeight: '400',
          letterSpacing: '-0.12px',
          color: '#ffffff'
        }}>
          GitOps Pipeline Dashboard
        </span>
      </nav>

      {/* Hero Tile - Light */}
      <section className="tile-light" style={{ textAlign: 'center' }}>
        <h1 className="headline-display" style={{ marginBottom: '8px' }}>
          Cloud Build Status
        </h1>
        <p style={{
          fontFamily: 'SF Pro Display, system-ui',
          fontSize: '28px',
          fontWeight: '400',
          letterSpacing: '0.196px',
          color: 'var(--color-body-muted)',
          marginBottom: '24px'
        }}>
          Real-time monitoring for your CI/CD pipeline
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={refreshAll} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Now'}
          </button>
          <span className="caption" style={{ display: 'flex', alignItems: 'center' }}>
            Last update: {lastRefresh}
          </span>
        </div>

        {/* Error Banner */}
        {error && (
          <div style={{
            marginTop: '24px',
            padding: '17px',
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '18px',
            color: '#ef4444'
          }}>
            Error: {error}
          </div>
        )}
      </section>

      {/* Dashboard Grid - Parchment Tile */}
      <section className="tile-parchment">
        <div style={{
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px'
        }}>
          <BranchCard branches={branches} loading={loading} />
          <BuildCard builds={builds} loading={loading} />
          <DeployCard deployments={deployments} loading={loading} />
          <ImageCard images={images} loading={loading} />
        </div>
      </section>

      {/* Footer - Parchment */}
      <footer style={{
        background: 'var(--color-parchment)',
        padding: '64px 24px',
        textAlign: 'center',
        borderTop: '1px solid var(--color-divider)'
      }}>
        <p className="caption">
          Auto-refresh every 30 seconds · Powered by Google Cloud
        </p>
      </footer>
    </div>
  )
}

export default App
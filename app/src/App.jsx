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
    <div style={{ minHeight: '100vh', background: 'var(--color-parchment)' }}>
      {/* Hero Section - Clean Apple Style */}
      <section className="tile-light" style={{
        textAlign: 'center',
        paddingTop: '100px',
        paddingBottom: '80px',
        background: 'var(--color-canvas)'
      }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '56px',
          fontWeight: '600',
          lineHeight: '1.07',
          letterSpacing: '-0.28px',
          color: 'var(--color-ink)',
          marginBottom: '16px'
        }}>
          GitOps Pipeline Dashboard
        </h1>

        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          fontWeight: '400',
          letterSpacing: '0.196px',
          color: 'var(--color-body-muted)',
          marginBottom: '12px'
        }}>
          Automated CI/CD with Google Cloud Build & Kubernetes
        </p>

        <p style={{
          fontFamily: 'var(--font-text)',
          fontSize: '17px',
          fontWeight: '400',
          lineHeight: '1.47',
          color: 'var(--color-body-muted)',
          marginBottom: '32px',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Real-time monitoring for your cloud-native deployment pipeline.
          Track builds, deployments, and container images in one unified interface.
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <button className="btn-primary" onClick={refreshAll} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Now'}
          </button>
          <span className="caption" style={{ color: 'var(--color-body-muted)' }}>
            Last update: {lastRefresh}
          </span>
        </div>

        {error && (
          <div style={{
            marginTop: '24px',
            padding: '17px',
            background: '#fff',
            border: '1px solid var(--color-hairline)',
            borderRadius: '18px',
            color: '#ef4444',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            ⚠️ Error: {error}
          </div>
        )}
      </section>

      {/* Stats Overview - Apple Utility Cards */}
      <section style={{
        background: 'var(--color-parchment)',
        padding: '48px 24px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px'
        }}>
          <div className="utility-card" style={{ textAlign: 'center' }}>
            <p className="caption-strong" style={{ marginBottom: '8px' }}>Active Builds</p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '40px',
              fontWeight: '600',
              color: 'var(--color-ink)',
              margin: 0
            }}>
              {builds.filter(b => b.status === 'SUCCESS').length}
            </p>
            <p className="caption">Successful builds</p>
          </div>

          <div className="utility-card" style={{ textAlign: 'center' }}>
            <p className="caption-strong" style={{ marginBottom: '8px' }}>K8s Pods</p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '40px',
              fontWeight: '600',
              color: 'var(--color-ink)',
              margin: 0
            }}>
              {deployments.pods?.ready || 0}/{deployments.pods?.total || 0}
            </p>
            <p className="caption">Running pods</p>
          </div>

          <div className="utility-card" style={{ textAlign: 'center' }}>
            <p className="caption-strong" style={{ marginBottom: '8px' }}>Container Images</p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '40px',
              fontWeight: '600',
              color: 'var(--color-ink)',
              margin: 0
            }}>
              {images.length}
            </p>
            <p className="caption">Published images</p>
          </div>

          <div className="utility-card" style={{ textAlign: 'center' }}>
            <p className="caption-strong" style={{ marginBottom: '8px' }}>Git Branches</p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '40px',
              fontWeight: '600',
              color: 'var(--color-ink)',
              margin: 0
            }}>
              {branches.length}
            </p>
            <p className="caption">Repository branches</p>
          </div>
        </div>
      </section>

      {/* Dashboard Grid - Apple Cards */}
      <section style={{
        background: 'var(--color-parchment)',
        padding: '48px 24px 80px'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '34px',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: '32px',
          color: 'var(--color-ink)'
        }}>
          Pipeline Status
        </h2>

        <div style={{
          maxWidth: '1200px',
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

      {/* Info Section */}
      <section style={{
        background: 'var(--color-tile-dark)',
        padding: '80px 24px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '40px',
          fontWeight: '600',
          color: '#ffffff',
          marginBottom: '16px'
        }}>
          Built for Cloud-Native Workflows
        </h2>

        <p style={{
          fontFamily: 'var(--font-text)',
          fontSize: '17px',
          fontWeight: '400',
          lineHeight: '1.47',
          color: 'var(--color-body-muted)',
          marginBottom: '48px',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          This dashboard demonstrates a complete GitOps pipeline architecture using
          Google Cloud Build, Artifact Registry, and GKE for automated deployments.
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <span className="btn-secondary" style={{ color: '#2997ff', borderColor: '#2997ff' }}>
            Cloud Build
          </span>
          <span className="btn-secondary" style={{ color: '#2997ff', borderColor: '#2997ff' }}>
            GKE Cluster
          </span>
          <span className="btn-secondary" style={{ color: '#2997ff', borderColor: '#2997ff' }}>
            Artifact Registry
          </span>
          <span className="btn-secondary" style={{ color: '#2997ff', borderColor: '#2997ff' }}>
            GitOps
          </span>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'var(--color-parchment)',
        padding: '48px 24px',
        textAlign: 'center',
        borderTop: '1px solid var(--color-divider)'
      }}>
        <p style={{
          fontFamily: 'var(--font-text)',
          fontSize: '14px',
          fontWeight: '400',
          color: 'var(--color-body-muted)',
          marginBottom: '8px'
        }}>
          GitOps Pipeline Dashboard · Cloud Computing Project
        </p>
        <p style={{
          fontFamily: 'var(--font-text)',
          fontSize: '12px',
          fontWeight: '400',
          color: 'var(--color-body-muted)'
        }}>
          Auto-refresh every 30 seconds · Powered by Google Cloud Platform
        </p>
      </footer>
    </div>
  )
}

export default App
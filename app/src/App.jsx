import { useState, useEffect } from 'react'
import BranchCard from './components/BranchCard'
import BuildCard from './components/BuildCard'
import DeployCard from './components/DeployCard'
import ImageCard from './components/ImageCard'
import { fetchBranches, fetchBuilds, fetchDeployments, fetchImages } from './api'
import './index.css'

const PROJECT_ID = 'gitops-dashboard-1777657343'

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

  const consoleLinks = [
    {
      name: 'Cloud Build',
      desc: 'CI/CD Triggers & Build History',
      url: `https://console.cloud.google.com/cloud-build/triggers?project=${PROJECT_ID}`
    },
    {
      name: 'GKE Cluster',
      desc: 'Kubernetes Workloads & Services',
      url: `https://console.cloud.google.com/kubernetes/workload?project=${PROJECT_ID}`
    },
    {
      name: 'Artifact Registry',
      desc: 'Container Images Repository',
      url: `https://console.cloud.google.com/artifacts?project=${PROJECT_ID}`
    },
    {
      name: 'IAM & Admin',
      desc: 'Service Accounts & Permissions',
      url: `https://console.cloud.google.com/iam-admin/serviceaccounts?project=${PROJECT_ID}`
    },
    {
      name: 'Secret Manager',
      desc: 'GitHub Token & Credentials',
      url: `https://console.cloud.google.com/security/secret-manager?project=${PROJECT_ID}`
    },
    {
      name: 'Compute Engine',
      desc: 'GKE Nodes & VMs',
      url: `https://console.cloud.google.com/compute?project=${PROJECT_ID}`
    }
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-parchment)' }}>
      {/* Hero Section */}
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

      {/* Stats Overview */}
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

      {/* Dashboard Grid */}
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

      {/* Console Links Section - For Presentation */}
      <section style={{
        background: 'var(--color-tile-dark)',
        padding: '80px 24px'
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '40px',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: '16px',
          color: '#ffffff'
        }}>
          Google Cloud Console Links
        </h2>

        <p style={{
          fontFamily: 'var(--font-text)',
          fontSize: '17px',
          fontWeight: '400',
          textAlign: 'center',
          lineHeight: '1.47',
          color: 'var(--color-body-muted)',
          marginBottom: '48px',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Quick access to all project resources for demonstration and presentation.
          Click any link to view the actual infrastructure in Google Cloud Console.
        </p>

        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}>
          {consoleLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#1d1d1f',
                borderRadius: '18px',
                padding: '24px',
                display: 'block',
                textDecoration: 'none',
                transition: 'transform 0.15s ease',
                border: '1px solid #333'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <h3 style={{
                fontFamily: 'var(--font-text)',
                fontSize: '21px',
                fontWeight: '600',
                color: '#2997ff',
                marginBottom: '8px',
                marginTop: 0
              }}>
                {link.name} →
              </h3>
              <p style={{
                fontFamily: 'var(--font-text)',
                fontSize: '14px',
                fontWeight: '400',
                color: '#888',
                margin: 0
              }}>
                {link.desc}
              </p>
            </a>
          ))}
        </div>

        {/* Dashboard Live Link */}
        <div style={{
          marginTop: '32px',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: 'var(--font-text)',
            fontSize: '17px',
            fontWeight: '400',
            color: '#888',
            marginBottom: '16px'
          }}>
            This Dashboard (Live Deployment)
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <a
              href="https://console.cloud.google.com/net-services/loadbalancing/details/network/us-central1/a5af08df413a34eb795e20be3a5145f4?project=gitops-dashboard-1777657343"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#1d1d1f',
                color: '#2997ff',
                fontSize: '18px',
                fontWeight: '300',
                padding: '14px 28px',
                borderRadius: '18px',
                textDecoration: 'none'
              }}
            >
              LoadBalancer Console →
            </a>
            <a
              href="http://35.193.222.155"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                display: 'inline-block',
                background: '#2997ff',
                fontSize: '18px',
                fontWeight: '300',
                padding: '14px 28px'
              }}
            >
              Open Dashboard →
            </a>
          </div>
        </div>
      </section>

      {/* Architecture Info */}
      <section className="tile-light" style={{ padding: '80px 24px' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '40px',
          fontWeight: '600',
          textAlign: 'center',
          marginBottom: '32px',
          color: 'var(--color-ink)'
        }}>
          Project Architecture
        </h2>

        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '48px'
        }}>
          <div style={{
            background: 'var(--color-canvas)',
            borderRadius: '18px',
            padding: '20px',
            textAlign: 'center',
            border: '1px solid var(--color-hairline)'
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '34px',
              fontWeight: '600',
              color: 'var(--color-ink)',
              margin: 0
            }}>2</p>
            <p className="caption">GitHub Repositories</p>
          </div>

          <div style={{
            background: 'var(--color-canvas)',
            borderRadius: '18px',
            padding: '20px',
            textAlign: 'center',
            border: '1px solid var(--color-hairline)'
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '34px',
              fontWeight: '600',
              color: 'var(--color-ink)',
              margin: 0
            }}>2</p>
            <p className="caption">Cloud Build Triggers</p>
          </div>

          <div style={{
            background: 'var(--color-canvas)',
            borderRadius: '18px',
            padding: '20px',
            textAlign: 'center',
            border: '1px solid var(--color-hairline)'
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '34px',
              fontWeight: '600',
              color: 'var(--color-ink)',
              margin: 0
            }}>1</p>
            <p className="caption">GKE Cluster</p>
          </div>

          <div style={{
            background: 'var(--color-canvas)',
            borderRadius: '18px',
            padding: '20px',
            textAlign: 'center',
            border: '1px solid var(--color-hairline)'
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '34px',
              fontWeight: '600',
              color: 'var(--color-ink)',
              margin: 0
            }}>1</p>
            <p className="caption">Service Account</p>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <span style={{
            padding: '11px 22px',
            background: 'var(--color-parchment)',
            borderRadius: '9999px',
            fontSize: '17px',
            fontWeight: '400',
            color: 'var(--color-ink)'
          }}>React + Vite</span>
          <span style={{
            padding: '11px 22px',
            background: 'var(--color-parchment)',
            borderRadius: '9999px',
            fontSize: '17px',
            fontWeight: '400',
            color: 'var(--color-ink)'
          }}>Express.js</span>
          <span style={{
            padding: '11px 22px',
            background: 'var(--color-parchment)',
            borderRadius: '9999px',
            fontSize: '17px',
            fontWeight: '400',
            color: 'var(--color-ink)'
          }}>Docker</span>
          <span style={{
            padding: '11px 22px',
            background: 'var(--color-parchment)',
            borderRadius: '9999px',
            fontSize: '17px',
            fontWeight: '400',
            color: 'var(--color-ink)'
          }}>Kubernetes</span>
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
          GitOps Pipeline Dashboard · Cloud Computing Project · CS 833
        </p>
        <p style={{
          fontFamily: 'var(--font-text)',
          fontSize: '12px',
          fontWeight: '400',
          color: 'var(--color-body-muted)'
        }}>
          Auto-refresh every 30 seconds · Powered by Google Cloud Platform
        </p>
        <p style={{
          fontFamily: 'var(--font-text)',
          fontSize: '12px',
          fontWeight: '600',
          color: 'var(--color-body-muted)',
          marginTop: '12px'
        }}>
          Project ID: {PROJECT_ID}
        </p>
      </footer>
    </div>
  )
}

export default App
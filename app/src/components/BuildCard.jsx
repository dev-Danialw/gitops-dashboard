function BuildCard({ builds, loading }) {
  const PROJECT_ID = 'gitops-dashboard-1777657343'
  const GITHUB_OWNER = 'dev-Danialw'
  const GITHUB_REPO = 'gitops-dashboard'

  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString()
  }

  function shortId(id) {
    return id.substring(0, 8)
  }

  return (
    <div className="utility-card">
      <h2 className="caption-strong" style={{ marginBottom: '12px', color: 'var(--color-ink)' }}>
        Cloud Build
      </h2>

      {loading && builds.length === 0 && (
        <p className="caption">Loading builds...</p>
      )}

      {builds.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '200px', overflowY: 'auto' }}>
          {builds.map(build => (
            <li key={build.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 0',
              borderBottom: '1px solid var(--color-divider)'
            }}>
              <span style={{
                color: build.status === 'SUCCESS' ? '#10b981' : '#ef4444',
                fontSize: '14px'
              }}>
                {build.status === 'SUCCESS' ? '●' : '○'}
              </span>
              <div style={{ flex: 1 }}>
                <a
                  href={`https://console.cloud.google.com/cloud-build/builds/${build.id}?project=${PROJECT_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-text)',
                    fontSize: '17px',
                    fontWeight: '600',
                    color: '#2997ff',
                    margin: 0,
                    textDecoration: 'none',
                    display: 'inline-block'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                >
                  Build {shortId(build.id)} →
                </a>
                {build.commitSha && (
                  <a
                    href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/commit/${build.commitSha}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'var(--font-text)',
                      fontSize: '14px',
                      fontWeight: '400',
                      color: '#2997ff',
                      marginLeft: '8px',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                    onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
                  >
                    Commit {build.commitSha} →
                  </a>
                )}
                <p className="caption" style={{ margin: 0 }}>
                  {formatDate(build.createTime)}
                </p>
              </div>
              <span style={{
                padding: '4px 8px',
                fontSize: '12px',
                borderRadius: '8px',
                background: build.status === 'SUCCESS' ? '#10b981' : '#ef4444',
                color: '#ffffff'
              }}>
                {build.status}
              </span>
            </li>
          ))}
        </ul>
      )}

      {!loading && builds.length === 0 && (
        <p className="caption">No builds found</p>
      )}
    </div>
  )
}

export default BuildCard
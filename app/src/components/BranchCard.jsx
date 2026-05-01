function BranchCard({ branches, loading }) {
  const GITHUB_OWNER = 'dev-Danialw'
  const GITHUB_REPO = 'gitops-dashboard'

  return (
    <div className="utility-card">
      <h2 className="caption-strong" style={{ marginBottom: '12px', color: 'var(--color-ink)' }}>
        Git Branches
      </h2>

      {loading && branches.length === 0 && (
        <p className="caption">Loading branches...</p>
      )}

      {branches.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {branches.map(branch => (
            <li key={branch.name} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 0',
              borderBottom: '1px solid var(--color-divider)'
            }}>
              <span style={{
                color: branch.active ? '#10b981' : 'var(--color-body-muted)',
                fontSize: '14px'
              }}>
                {branch.active ? '●' : '○'}
              </span>
              <a
                href={`https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/tree/${branch.name}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-text)',
                  fontSize: '17px',
                  fontWeight: '400',
                  color: '#2997ff',
                  textDecoration: 'none'
                }}
                onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                {branch.name} →
              </a>
              {branch.isMain && (
                <span style={{
                  marginLeft: '8px',
                  padding: '4px 8px',
                  background: 'var(--color-primary)',
                  color: '#ffffff',
                  fontSize: '12px',
                  borderRadius: '9999px'
                }}>
                  main
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {!loading && branches.length === 0 && (
        <p className="caption">No branches found</p>
      )}
    </div>
  )
}

export default BranchCard
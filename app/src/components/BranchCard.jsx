function BranchCard({ branches, loading }) {
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
              <span style={{
                fontFamily: 'var(--font-text)',
                fontSize: '17px',
                fontWeight: '400',
                color: 'var(--color-ink)'
              }}>
                {branch.name}
              </span>
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
function DeployCard({ deployments, loading }) {
  return (
    <div className="utility-card">
      <h2 className="caption-strong" style={{ marginBottom: '12px', color: 'var(--color-ink)' }}>
        GKE Status
      </h2>

      {loading && !deployments.pods && (
        <p className="caption">Loading deployments...</p>
      )}

      {deployments.pods && (
        <div style={{ display: 'grid', gap: '12px' }}>
          {/* Pods */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid var(--color-divider)'
          }}>
            <span className="caption">Pods</span>
            <span style={{
              fontFamily: 'var(--font-text)',
              fontSize: '17px',
              fontWeight: '600',
              color: 'var(--color-ink)'
            }}>
              {deployments.pods?.ready || 0}/{deployments.pods?.total || 0}
              {deployments.pods?.ready === deployments.pods?.total && (
                <span style={{ marginLeft: '8px', color: '#10b981' }}>●</span>
              )}
            </span>
          </div>

          {/* Service */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0',
            borderBottom: '1px solid var(--color-divider)'
          }}>
            <span className="caption">Service</span>
            <span style={{
              fontFamily: 'var(--font-text)',
              fontSize: '17px',
              fontWeight: '400',
              color: 'var(--color-ink)'
            }}>
              {deployments.service?.type || 'N/A'}
            </span>
          </div>

          {/* Deployment */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0'
          }}>
            <span className="caption">Deployment</span>
            <span style={{
              fontFamily: 'var(--font-text)',
              fontSize: '17px',
              fontWeight: '400',
              color: 'var(--color-ink)'
            }}>
              {deployments.deployment?.name || 'N/A'}
            </span>
          </div>

          {/* Cluster Status */}
          {deployments.clusterStatus && (
            <div style={{
              marginTop: '8px',
              padding: '8px 12px',
              background: deployments.clusterStatus === 'RUNNING' ? '#10b981' : 'var(--color-parchment)',
              borderRadius: '8px',
              color: '#ffffff',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              Cluster: {deployments.clusterStatus}
            </div>
          )}
        </div>
      )}

      {!loading && !deployments.pods && (
        <p className="caption">No deployment info found</p>
      )}
    </div>
  )
}

export default DeployCard
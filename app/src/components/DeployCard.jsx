function DeployCard({ deployments, loading }) {
  const PROJECT_ID = 'gitops-dashboard-1777657343'
  const CLUSTER_NAME = 'dashboard-cluster'
  const CLUSTER_LOCATION = 'us-central1-a'

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
            <a
              href={`https://console.cloud.google.com/kubernetes/pod?project=${PROJECT_ID}&clusters=${CLUSTER_LOCATION}/${CLUSTER_NAME}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-text)',
                fontSize: '17px',
                fontWeight: '600',
                color: '#2997ff',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              {deployments.pods?.ready || 0}/{deployments.pods?.total || 0} →
              {deployments.pods?.ready === deployments.pods?.total && (
                <span style={{ marginLeft: '8px', color: '#10b981' }}>●</span>
              )}
            </a>
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
            <a
              href={`https://console.cloud.google.com/kubernetes/service?project=${PROJECT_ID}&clusters=${CLUSTER_LOCATION}/${CLUSTER_NAME}`}
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
              {deployments.service?.type || 'LoadBalancer'} →
            </a>
          </div>

          {/* Deployment */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '8px 0'
          }}>
            <span className="caption">Deployment</span>
            <a
              href={`https://console.cloud.google.com/kubernetes/workload?project=${PROJECT_ID}&clusters=${CLUSTER_LOCATION}/${CLUSTER_NAME}`}
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
              {deployments.deployment?.name || 'dashboard'} →
            </a>
          </div>

          {/* Cluster Status */}
          {deployments.clusterStatus && (
            <a
              href={`https://console.cloud.google.com/kubernetes/clusters/details/${CLUSTER_LOCATION}/${CLUSTER_NAME}?project=${PROJECT_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginTop: '8px',
                padding: '8px 12px',
                background: deployments.clusterStatus === 'RUNNING' ? '#10b981' : '#ef4444',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'block'
              }}
            >
              Cluster: {deployments.clusterStatus} →
            </a>
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
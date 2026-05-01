function ImageCard({ images, loading }) {
  const PROJECT_ID = 'gitops-dashboard-1777657343'
  const REGION = 'us-central1'
  const REPO = 'docker-images'

  function shortTag(tag) {
    return tag.substring(0, 7)
  }

  return (
    <div className="utility-card">
      <h2 className="caption-strong" style={{ marginBottom: '12px', color: 'var(--color-ink)' }}>
        Container Images
      </h2>

      {loading && images.length === 0 && (
        <p className="caption">Loading images...</p>
      )}

      {images.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '200px', overflowY: 'auto' }}>
          {images.map(image => (
            <li key={image.name} style={{
              padding: '12px 0',
              borderBottom: '1px solid var(--color-divider)'
            }}>
              <a
                href={`https://console.cloud.google.com/artifacts/docker/${PROJECT_ID}/${REGION}/${REPO}/${image.name}?project=${PROJECT_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-text)',
                  fontSize: '17px',
                  fontWeight: '600',
                  color: '#2997ff',
                  textDecoration: 'none',
                  display: 'block',
                  marginBottom: '8px'
                }}
                onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                {image.name} →
              </a>
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '8px',
                flexWrap: 'wrap'
              }}>
                {image.tags.slice(0, 5).map(tag => (
                  <a
                    key={tag}
                    href={`https://console.cloud.google.com/artifacts/docker/${PROJECT_ID}/${REGION}/${REPO}/${image.name}/${tag}?project=${PROJECT_ID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '4px 8px',
                      background: 'var(--color-parchment)',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      color: '#2997ff',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#e8e8e8'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'var(--color-parchment)'}
                  >
                    {tag === 'latest' ? 'latest' : shortTag(tag)}
                  </a>
                ))}
              </div>
              {image.createTime && (
                <p className="caption" style={{ marginTop: '4px' }}>
                  {new Date(image.createTime).toLocaleDateString()}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      {!loading && images.length === 0 && (
        <p className="caption">No images found</p>
      )}
    </div>
  )
}

export default ImageCard
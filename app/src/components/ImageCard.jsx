function ImageCard({ images, loading }) {
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
              <p style={{
                fontFamily: 'var(--font-text)',
                fontSize: '17px',
                fontWeight: '600',
                color: 'var(--color-ink)',
                margin: 0
              }}>
                {image.name}
              </p>
              <div style={{
                display: 'flex',
                gap: '8px',
                marginTop: '8px',
                flexWrap: 'wrap'
              }}>
                {image.tags.slice(0, 5).map(tag => (
                  <span key={tag} style={{
                    padding: '4px 8px',
                    background: 'var(--color-parchment)',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    color: 'var(--color-ink)'
                  }}>
                    {tag === 'latest' ? 'latest' : shortTag(tag)}
                  </span>
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
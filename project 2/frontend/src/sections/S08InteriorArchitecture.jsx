import React from 'react';

export default function S08InteriorArchitecture({ architectureData }) {
  if (!architectureData) return null;

  return (
    <section
      id="architecture"
      style={{
        padding: 'var(--section-spacing) 0',
        backgroundColor: 'var(--color-rice-paper)',
      }}
    >
      <div className="zen-container">
        {/* Section Header */}
        <div style={{ maxWidth: '720px', marginBottom: '56px' }}>
          <div className="zen-eyebrow">
            {architectureData.eyebrow || 'ARCHITECTURAL PHILOSOPHY'}
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, var(--section-heading-size))', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
            {architectureData.title}
          </h2>
          {architectureData.japaneseSubtitle && (
            <div className="font-jp" style={{ fontSize: '15px', color: 'var(--color-moss)', marginBottom: '18px' }}>
              {architectureData.japaneseSubtitle}
            </div>
          )}
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'var(--color-charcoal)', opacity: 0.85 }}>
            {architectureData.description}
          </p>
        </div>

        {/* Spatial Statistics Row */}
        {architectureData.statistics && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginBottom: '64px',
            }}
          >
            {architectureData.statistics.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  padding: '28px 24px',
                  borderRadius: '2px',
                  borderBottom: '3px solid var(--color-bamboo)',
                }}
              >
                <div style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-charcoal)', fontFamily: 'var(--font-display)', marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-stone)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Material Palette Grid */}
        {architectureData.materials && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
              marginBottom: '56px',
            }}
          >
            {architectureData.materials.map((mat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  padding: '24px',
                  borderRadius: '2px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span className="zen-seal">材</span>
                  <h4 style={{ fontSize: '17px', color: 'var(--color-charcoal)', fontWeight: 600 }}>
                    {mat.name}
                  </h4>
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-charcoal)', opacity: 0.8 }}>
                  {mat.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Architectural Image Pair */}
        {architectureData.images && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {architectureData.images.map((imgUrl, idx) => (
              <div
                key={idx}
                style={{
                  height: '340px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                }}
              >
                <img
                  src={imgUrl}
                  alt="Architecture interior space"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

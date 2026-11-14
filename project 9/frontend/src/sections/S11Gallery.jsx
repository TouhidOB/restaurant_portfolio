import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S11Gallery() {
  const { content, setLightboxImage } = useCMS();
  const gallery = content?.gallery || {};
  const images = gallery.images || [];
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(images.map((img) => img.category).filter(Boolean))];
  const filteredImages = filter === 'All' ? images : images.filter((img) => img.category === filter);

  return (
    <section id="gallery" className="section-pad" style={{ backgroundColor: 'var(--color-midnight)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">{gallery.subtitle || 'Moments Captured in the Clouds'}</span>
          <h2 className="section-title">{gallery.title || 'Panoramic Visual Gallery'}</h2>
          <div className="horizon-divider horizon-divider-center" />
          <p className="section-subtitle">
            An editorial visual glimpse into our high-altitude architecture, vibrant twilight atmospheres, and culinary mastery.
          </p>
        </div>

        {/* Filter Pills */}
        {categories.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.65rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const isActive = cat === filter;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: '0.45rem 1.15rem',
                    borderRadius: '20px',
                    border: isActive ? '1px solid var(--color-champagne)' : '1px solid var(--color-border)',
                    background: isActive ? 'var(--color-champagne)' : 'transparent',
                    color: isActive ? 'var(--color-midnight-dark)' : 'var(--color-cloud-ivory)',
                    fontFamily: 'var(--font-accent)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Photo Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {filteredImages.map((img, i) => (
            <div
              key={i}
              onClick={() => setLightboxImage(img)}
              style={{
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid var(--color-border-subtle)',
                height: '280px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src={img.url}
                alt={img.title || 'Skyline Gallery'}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(16, 28, 44, 0.85) 0%, transparent 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.25rem',
                }}
              >
                {img.category && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-sunset-copper)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                    {img.category}
                  </span>
                )}
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-cloud-ivory)' }}>
                  {img.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

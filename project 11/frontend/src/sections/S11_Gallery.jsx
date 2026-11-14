import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S11_Gallery() {
  const { content, setLightboxImage } = useCMS();
  const gallery = content?.gallery || {};
  const images = gallery.images || [];

  const [activeFilter, setActiveFilter] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(['All']);
    images.forEach((img) => {
      if (img.category) cats.add(img.category);
    });
    return Array.from(cats);
  }, [images]);

  const filteredImages = useMemo(() => {
    if (activeFilter === 'All') return images;
    return images.filter((img) => img.category === activeFilter);
  }, [images, activeFilter]);

  return (
    <section
      id="gallery"
      aria-label="Visual Chronicles Gallery"
      style={{
        padding: '120px 0',
        backgroundColor: '#263F35',
        color: '#FAF7F0',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px auto' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-sage)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {gallery.subtitle || 'VISUAL CHRONICLES'}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '24px',
            }}
          >
            {gallery.title || 'Light, Foliage & Atmosphere'}
          </h2>

          {/* Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    padding: '8px 18px',
                    backgroundColor: isActive ? 'var(--color-copper, #A87958)' : 'rgba(26, 43, 36, 0.6)',
                    color: '#FFFFFF',
                    border: '1px solid rgba(166, 181, 160, 0.3)',
                    borderRadius: '2px',
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat === 'All' ? 'All Chronicles' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredImages.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxImage(item)}
              style={{
                position: 'relative',
                height: '280px',
                borderRadius: '2px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(166, 181, 160, 0.2)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
              }}
            >
              <img
                src={item.url}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(26, 43, 36, 0.85) 0%, transparent 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                  pointerEvents: 'none',
                }}
              >
                <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-sage)', fontWeight: 700, marginBottom: '4px' }}>
                  {item.category}
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: '#FAF7F0' }}>
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

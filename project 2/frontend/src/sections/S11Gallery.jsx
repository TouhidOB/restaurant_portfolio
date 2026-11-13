import React, { useState, useMemo } from 'react';
import { Eye } from 'lucide-react';

export default function S11Gallery({ gallery, onOpenLightbox }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'Food', 'Restaurant', 'Architecture', 'Kitchen', 'Details'];

  const filteredGallery = useMemo(() => {
    if (!gallery) return [];
    if (activeCategory === 'ALL') return gallery;
    return gallery.filter((item) => item.category === activeCategory);
  }, [gallery, activeCategory]);

  return (
    <section
      id="gallery"
      style={{
        padding: 'var(--section-spacing) 0',
        backgroundColor: 'var(--color-rice-paper)',
      }}
    >
      <div className="zen-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
          <div>
            <div className="zen-eyebrow">
              VISUAL REVELATION
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 5vw, var(--section-heading-size))', color: 'var(--color-charcoal)', marginBottom: '6px' }}>
              Restaurant &amp; Culinary Gallery
            </h2>
            <p className="font-jp" style={{ fontSize: '15px', color: 'var(--color-moss)' }}>
              静寂と美の記録
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '7px 14px',
                  backgroundColor: activeCategory === cat ? 'var(--color-charcoal)' : '#FFFFFF',
                  color: activeCategory === cat ? 'var(--color-rice-paper)' : 'var(--color-charcoal)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '2px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredGallery.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onOpenLightbox(filteredGallery, idx)}
              style={{
                position: 'relative',
                height: '280px',
                borderRadius: '2px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: '#1E201F',
                border: '1px solid var(--color-border)',
              }}
            >
              <img
                src={item.url}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(32, 35, 33, 0.4)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
              >
                <div style={{ fontSize: '11px', color: 'var(--color-bamboo)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {item.category}
                </div>
                <div style={{ fontSize: '16px', color: '#FFFFFF', fontWeight: 600 }}>
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

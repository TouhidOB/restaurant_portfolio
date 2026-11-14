import React, { useState, useMemo } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S11_Gallery() {
  const { content, t, lang, setLightboxImage } = useCMS();
  const gallery = content?.gallery || {};

  const subtitle = t(gallery.subtitle) || 'Visual Archives';
  const title = t(gallery.title) || 'Food, Craft & Atmosphere Gallery';
  const images = gallery.images || [];

  const [activeFilter, setActiveFilter] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(['All']);
    images.forEach(img => {
      if (img.category) cats.add(img.category);
    });
    return Array.from(cats);
  }, [images]);

  const filteredImages = useMemo(() => {
    if (activeFilter === 'All') return images;
    return images.filter(img => img.category === activeFilter);
  }, [images, activeFilter]);

  return (
    <section
      id="gallery"
      aria-label="Bengal Heritage Visual Gallery"
      style={{
        padding: '120px 0',
        backgroundColor: '#1E2838',
        color: '#F4EBDD',
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
              color: 'var(--color-brass, #B18A54)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {subtitle}
          </div>
          <h2
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '24px',
            }}
          >
            {title}
          </h2>

          {/* Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  style={{
                    padding: '8px 18px',
                    backgroundColor: isActive ? 'var(--color-terracotta, #A6533B)' : 'rgba(24, 33, 46, 0.6)',
                    color: isActive ? '#FFFFFF' : 'rgba(244, 235, 221, 0.75)',
                    border: '1px solid rgba(177, 138, 84, 0.35)',
                    borderRadius: '2px',
                    fontSize: '12px',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat === 'All' ? (lang === 'bn' ? 'সকল দৃশ্য' : 'All Archives') : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Image Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredImages.map((item, idx) => {
            const imgCaption = t(item.title);
            return (
              <div
                key={idx}
                onClick={() => setLightboxImage({ url: item.url, caption: imgCaption, category: item.category })}
                style={{
                  position: 'relative',
                  height: '280px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(177, 138, 84, 0.25)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                }}
              >
                <img
                  src={item.url}
                  alt={imgCaption}
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
                {/* Overlay on bottom */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(16, 22, 32, 0.85) 0%, transparent 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '20px',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-brass, #B18A54)',
                      fontWeight: 600,
                      marginBottom: '4px',
                    }}
                  >
                    {item.category}
                  </span>
                  <div
                    style={{
                      fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
                      fontSize: '17px',
                      fontWeight: 600,
                      color: '#F4EBDD',
                    }}
                  >
                    {imgCaption}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

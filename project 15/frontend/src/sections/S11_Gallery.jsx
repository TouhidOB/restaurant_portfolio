import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S11_Gallery() {
  const { data, setLightboxIndex } = useCMS();
  const gallery = data.gallery || [];

  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Food', 'Desserts', 'Drinks', 'Atmosphere', 'Kitchen'];

  const filteredItems = gallery.filter((item) => {
    if (activeFilter === 'All') return true;
    return item.category && item.category.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <section
      id="gallery"
      style={{
        backgroundColor: '#090A0E',
        padding: '110px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px', color: '#FF3366', borderColor: 'rgba(255, 51, 102, 0.25)' }}>
            CHAPTER 09 // VISUAL ARCHIVE
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              margin: '0 0 16px 0'
            }}
          >
            GOOD FOOD LOOKS GOOD.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 1.6,
              color: '#9FA5B7',
              margin: 0
            }}
          >
            High-contrast plates, neon-soaked dining booths, and culinary fireworks. Tap any snapshot to expand into full screen.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                backgroundColor: activeFilter === cat ? '#CCFF00' : 'rgba(255, 255, 255, 0.04)',
                color: activeFilter === cat ? '#0A0B0E' : '#9FA5B7',
                border: activeFilter === cat ? '1px solid #CCFF00' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '999px',
                padding: '6px 16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredItems.map((item, idx) => {
            const originalIndex = gallery.findIndex((g) => g.id === item.id);
            return (
              <div
                key={item.id || idx}
                onClick={() => setLightboxIndex(originalIndex !== -1 ? originalIndex : idx)}
                style={{
                  position: 'relative',
                  height: '280px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />

                {/* Dark Vignette Overlay with Title */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(9,10,14,0.9) 0%, transparent 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '20px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '9px',
                      fontWeight: 700,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(8px)',
                      color: '#CCFF00',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      display: 'inline-block',
                      width: 'fit-content',
                      marginBottom: '6px'
                    }}
                  >
                    {item.category}
                  </span>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#FFF',
                      lineHeight: 1.3
                    }}
                  >
                    {item.title}
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

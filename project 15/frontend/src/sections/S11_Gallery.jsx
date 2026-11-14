import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Eye, Sparkles } from 'lucide-react';

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
        backgroundColor: '#FFF5E6',
        padding: '100px 24px',
        borderBottom: '4px solid #171717',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#2455D6',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '6px 16px',
              borderRadius: '999px',
              border: '2px solid #171717',
              boxShadow: '3px 3px 0 #171717',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            CHAPTER 09 // VISUAL ARCHIVE
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              color: '#171717',
              margin: '0 0 16px 0',
              textShadow: '3px 3px 0 #FFD928'
            }}
          >
            GOOD FOOD LOOKS GOOD.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.15rem',
              lineHeight: 1.6,
              color: '#444',
              margin: 0
            }}
          >
            High-contrast plates, neon-soaked dining booths, and culinary fireworks. Tap any snapshot to view in full screen.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                backgroundColor: activeFilter === cat ? '#FFD928' : '#FFF',
                color: '#171717',
                border: '2px solid #171717',
                borderRadius: '8px',
                padding: '8px 16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: activeFilter === cat ? '3px 3px 0 #F04438' : '2px 2px 0 #171717',
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
            gap: '24px'
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
                  borderRadius: '16px',
                  border: '3px solid #171717',
                  overflow: 'hidden',
                  boxShadow: '6px 6px 0 #171717',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '10px 10px 0 #F04438';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '6px 6px 0 #171717';
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

                {/* Hover Caption Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(23,23,23,0.85) 0%, transparent 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '16px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      backgroundColor: '#FFD928',
                      color: '#171717',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      display: 'inline-block',
                      width: 'fit-content',
                      marginBottom: '4px'
                    }}
                  >
                    {item.category}
                  </span>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.15rem',
                      color: '#FFF',
                      lineHeight: 1.2
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

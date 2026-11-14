import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S11Gallery() {
  const { content, setLightboxImage } = useCMS();
  const gallery = content?.gallery || {};
  const images = gallery.images || [];

  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Interior', 'Food', 'Kitchen', 'Bar'];

  const filteredImages =
    activeTab === 'All'
      ? images
      : images.filter((img) => img.category?.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="gallery" className="py-section" style={{ backgroundColor: 'var(--color-black)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
          <span className="section-label">{gallery.subtitle || 'Raw Visual Moments'}</span>
          <h2 className="section-title">{gallery.title || 'Food, People & Atmosphere Gallery'}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            High-contrast visual documentary of our roaring wood hearth, aged meats, and industrial foundry hall.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                background: activeTab === cat ? 'var(--color-copper)' : 'transparent',
                color: activeTab === cat ? 'var(--color-black)' : 'var(--color-concrete)',
                border: activeTab === cat ? '1px solid var(--color-copper-light)' : '1px solid var(--color-border)',
                padding: '0.5rem 1.25rem',
                borderRadius: '2px',
                fontSize: '0.8rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxImage(img)}
              style={{
                position: 'relative',
                height: '300px',
                borderRadius: '2px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid var(--color-border)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src={img.url}
                alt={img.caption || 'Urban Table Gallery'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(17, 19, 20, 0.9) 0%, transparent 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.25rem',
                  opacity: 0.95,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <span style={{ color: 'var(--color-copper)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800 }}>
                  ✦ {img.category}
                </span>
                <p style={{ color: 'var(--color-offwhite)', fontFamily: 'var(--font-display)', fontSize: '1.15rem', textTransform: 'uppercase' }}>
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

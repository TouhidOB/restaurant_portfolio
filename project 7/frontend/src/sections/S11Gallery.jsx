import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S11Gallery() {
  const { content, setLightboxImage } = useCMS();
  const gallery = content?.gallery || {};
  const images = gallery.images || [];

  const [activeTab, setActiveTab] = useState('Tous');

  const categories = ['Tous', 'Atmosphère', 'Cuisine', 'Vins', 'Art de la Table'];

  const filteredImages =
    activeTab === 'Tous'
      ? images
      : images.filter((img) => img.category?.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="galerie" className="py-section" style={{ backgroundColor: '#202124', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 3rem' }}>
          <span className="section-label">{gallery.subtitle || 'Atmosphère & Détails Gastronomiques'}</span>
          <h2 className="section-title">{gallery.title || 'Galerie Photographique'}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Aperçu de la lumière feutrée, des dressages minutieux et des précieux flacons qui animent nos salons.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              style={{
                background: activeTab === cat ? 'var(--color-gold)' : 'transparent',
                color: activeTab === cat ? '#18120B' : 'var(--color-taupe)',
                border: activeTab === cat ? '1px solid var(--color-gold-light)' : '1px solid rgba(197, 164, 109, 0.25)',
                padding: '0.45rem 1.1rem',
                borderRadius: '20px',
                fontSize: '0.82rem',
                fontWeight: activeTab === cat ? '600' : '400',
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
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid rgba(197, 164, 109, 0.2)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={img.url}
                alt={img.caption || 'Galerie'}
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
                  background: 'linear-gradient(to top, rgba(18, 18, 20, 0.85) 0%, transparent 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.25rem',
                  opacity: 0.9,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <span style={{ color: 'var(--color-gold)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {img.category}
                </span>
                <p style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: '1.05rem' }}>
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

import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S11_Gallery() {
  const { content, openLightbox } = useCMS();
  const galleryData = content?.editorial_sections?.s11_gallery || {
    badge: "VISUAL RETROSPECTIVE",
    title: "Moments of Light & Architecture",
    description: "Explore the atmospheric nuances of Villa Riviera across daylight, golden hour, and twilight."
  };

  const images = content.gallery_images || [];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Architecture', 'Salon', 'Terrace', 'Culinary', 'Cellar'];

  const filteredImages = images.filter((img) => {
    if (selectedCategory === 'All') return true;
    return img.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <section id="gallery" className="editorial-section" style={{ backgroundColor: 'var(--c-ivory)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {galleryData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: 'var(--c-navy)',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {galleryData.title}
          </h2>
          <p style={{ color: '#595752', fontSize: '1rem', lineHeight: 1.7 }}>
            {galleryData.description}
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: isSelected ? 'var(--c-navy)' : 'transparent',
                  color: isSelected ? '#FFFFFF' : 'var(--c-charcoal)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--c-navy)' : 'var(--c-border)',
                  padding: '7px 18px',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => openLightbox(img)}
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                height: '280px',
                backgroundColor: '#DECDB8',
                boxShadow: '0 8px 24px rgba(38, 58, 72, 0.08)',
              }}
              onMouseEnter={(e) => {
                const imgEl = e.currentTarget.querySelector('img');
                const overlay = e.currentTarget.querySelector('.gallery-overlay');
                if (imgEl) imgEl.style.transform = 'scale(1.06)';
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const imgEl = e.currentTarget.querySelector('img');
                const overlay = e.currentTarget.querySelector('.gallery-overlay');
                if (imgEl) imgEl.style.transform = 'scale(1)';
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              <img
                src={img.image_url}
                alt={img.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Hover Overlay */}
              <div
                className="gallery-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(38, 58, 72, 0.72)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '24px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  color: '#FFFFFF',
                }}
              >
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFD2B8', fontWeight: 700, marginBottom: '4px' }}>
                  {img.category}
                </span>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: '#FFFFFF', lineHeight: 1.2 }}>
                  {img.title}
                </h4>
                {img.caption && (
                  <p style={{ fontSize: '0.82rem', color: '#E9DFCF', marginTop: '4px' }}>
                    {img.caption}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

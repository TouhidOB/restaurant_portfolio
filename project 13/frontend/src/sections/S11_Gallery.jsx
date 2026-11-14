import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function S11_Gallery() {
  const { content, openLightbox } = useCMS();
  const galleryData = content?.editorial_sections?.s11_gallery || {
    badge: "VISUAL CHRONICLE",
    title: "Seoul Nights & Sizzling Bites",
    description: "Glimpses of glowing neon signage, bubbling bowls, crispy golden chicken, and vibrant urban energy."
  };

  const items = content.gallery_items || [];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Food', 'Interior', 'Exterior', 'Kitchen', 'Events'];

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <section className="editorial-section" style={{ backgroundColor: 'var(--color-midnight)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {galleryData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: '#F6F4F0',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {galleryData.title}
          </h2>
          <p style={{ color: 'var(--color-silver)', fontSize: '1rem', lineHeight: 1.7 }}>
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
                  background: isSelected ? 'var(--color-magenta)' : 'transparent',
                  color: isSelected ? '#FFFFFF' : 'var(--color-silver)',
                  border: '1px solid',
                  borderColor: isSelected ? 'var(--color-magenta)' : 'var(--color-border)',
                  padding: '7px 18px',
                  borderRadius: '999px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  fontFamily: "'Barlow Condensed', sans-serif",
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

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
                height: '280px',
                backgroundColor: 'var(--color-charcoal)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
              }}
              onMouseEnter={(e) => {
                const imgEl = e.currentTarget.querySelector('img');
                const overlay = e.currentTarget.querySelector('.gallery-overlay');
                if (imgEl) imgEl.style.transform = 'scale(1.08)';
                if (overlay) overlay.style.opacity = '1';
                e.currentTarget.style.borderColor = 'var(--color-magenta)';
              }}
              onMouseLeave={(e) => {
                const imgEl = e.currentTarget.querySelector('img');
                const overlay = e.currentTarget.querySelector('.gallery-overlay');
                if (imgEl) imgEl.style.transform = 'scale(1)';
                if (overlay) overlay.style.opacity = '0';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <img
                src={item.image_url}
                alt={item.title}
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
                  backgroundColor: 'rgba(17, 19, 22, 0.78)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '24px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  color: '#FFFFFF',
                }}
              >
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-cyan)', fontWeight: 700, marginBottom: '4px', fontFamily: 'var(--font-condensed)' }}>
                  {item.category}
                </span>
                <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.35rem', color: '#FFFFFF', lineHeight: 1.2 }}>
                  {item.title}
                </h4>
                {item.caption && (
                  <p style={{ fontSize: '0.84rem', color: 'var(--color-silver)', marginTop: '4px' }}>
                    {item.caption}
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

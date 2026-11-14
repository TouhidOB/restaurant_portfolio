import React, { useState, useMemo } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function GallerySection() {
  const { content, openLightbox } = useCMS();
  const gallerySection = content?.sections?.gallery || {};
  const galleryItems = content?.gallery || [];

  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'FOOD', 'INTERIOR', 'EXTERIOR', 'DETAILS', 'DINING'];

  const filteredImages = useMemo(() => {
    if (filter === 'ALL') return galleryItems;
    return galleryItems.filter(
      (item) => item.category && item.category.toUpperCase() === filter
    );
  }, [galleryItems, filter]);

  return (
    <section id="gallery" className="section-shell">
      <div className="container-tropical">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ maxWidth: '780px' }}>
            <span className="section-tag">
              {gallerySection.eyebrow || 'VISUAL RECORD'}
            </span>
            <h2 className="section-heading">
              {gallerySection.title || 'BOTANICAL ARCHIVE.'}
            </h2>
            <p className="section-lead">
              {gallerySection.subtitle ||
                'A visual collection of food, architecture, palm gardens, and warm light.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              flexWrap: 'wrap',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.04em',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: filter === cat ? '1px solid var(--accent-terracotta)' : '1px solid var(--border-botanical)',
                  backgroundColor: filter === cat ? 'var(--accent-terracotta)' : 'var(--bg-surface)',
                  color: filter === cat ? '#FFFFFF' : 'var(--text-sand)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredImages.map((img) => (
            <div
              key={img.id || img.title}
              onClick={() => openLightbox(img)}
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                aspectRatio: '4/3',
                cursor: 'pointer',
                backgroundColor: '#15251D',
                border: '1px solid var(--border-botanical)',
              }}
            >
              <img
                src={img.image_url || img.resolved_image}
                alt={img.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(18, 32, 25, 0.92) 0%, rgba(18, 32, 25, 0.2) 50%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.25rem',
                  opacity: 0.95,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--accent-citrus)',
                    textTransform: 'uppercase',
                    marginBottom: '0.2rem',
                  }}
                >
                  {img.category}
                </span>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    color: 'var(--text-ivory)',
                    lineHeight: 1.2,
                  }}
                >
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

import React, { useState, useEffect, useMemo } from 'react';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function GallerySection({ categories, images, sectionData = {} }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const eyebrow = sectionData.eyebrow || 'VISUAL PORTFOLIO';
  const title = sectionData.title || 'A Closer Look at Our World.';
  const description =
    sectionData.description ||
    'Explore the culinary artistry, hand-cut stone masonry, and unforgettable celebratory moments that define our salon.';

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  const currentLightboxImg = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredImages]);

  return (
    <section
      id="gallery"
      className="section-padding"
      style={{
        backgroundColor: '#0E1716',
        position: 'relative',
        borderBottom: '1px solid var(--color-border-gold-subtle)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            {eyebrow}
          </div>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              color: 'var(--color-pearl)',
              marginBottom: '16px',
            }}
          >
            {title}
          </h2>
          <p
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              fontSize: '15px',
              color: 'var(--color-pearl-muted)',
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>

          <div className="gold-divider">
            <span className="deco-diamond" />
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '28px',
            }}
          >
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setLightboxIndex(null);
                  }}
                  style={{
                    padding: '8px 18px',
                    backgroundColor: isActive ? 'var(--color-gold)' : 'rgba(23, 25, 26, 0.7)',
                    color: isActive ? '#17191A' : 'var(--color-pearl)',
                    border: `1px solid ${isActive ? 'var(--color-gold)' : 'var(--color-border-gold-subtle)'}`,
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Masonry / Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredImages.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setLightboxIndex(idx)}
              className="deco-frame"
              style={{
                position: 'relative',
                height: img.aspect === 'tall' ? '380px' : img.aspect === 'wide' ? '240px' : '300px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: 'var(--color-obsidian-soft)',
              }}
            >
              <img
                src={img.image}
                alt={img.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                className="gallery-item-img"
              />

              {/* Hover Overlay */}
              <div
                className="gallery-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(18, 59, 53, 0.75)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '24px',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <span style={{ fontSize: '10px', color: 'var(--color-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>
                  {img.category}
                </span>
                <h4 style={{ fontSize: '18px', color: 'var(--color-pearl)', fontFamily: 'var(--font-display)', marginBottom: '8px' }}>
                  {img.title}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-gold-light)', fontSize: '11px', letterSpacing: '0.1em' }}>
                  <Eye size={14} /> <span>VIEW HIGH RESOLUTION</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {currentLightboxImg && (
        <dialog
          open
          aria-labelledby="lightbox-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            width: '100vw',
            height: '100vh',
            maxWidth: '100vw',
            maxHeight: '100vh',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxIndex(null);
          }}
        >
          {/* Backdrop */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(10, 20, 18, 0.95)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            onClick={() => setLightboxIndex(null)}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 100000,
              maxWidth: '1000px',
              width: '90%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Top Close Bar */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: 'var(--color-gold)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  {currentLightboxImg.category} • {lightboxIndex + 1} OF {filteredImages.length}
                </span>
                <h3 id="lightbox-title" style={{ fontSize: '20px', color: 'var(--color-pearl)', margin: '4px 0 0 0' }}>
                  {currentLightboxImg.title}
                </h3>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                aria-label="Close Gallery Lightbox"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(23, 25, 26, 0.8)',
                  border: '1px solid var(--color-gold)',
                  color: 'var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Main Lightbox Image Frame */}
            <div
              className="deco-frame"
              style={{
                position: 'relative',
                maxHeight: '72vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={currentLightboxImg.image}
                alt={currentLightboxImg.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '72vh',
                  objectFit: 'contain',
                }}
              />

              {/* Prev / Next Buttons */}
              <button
                onClick={handlePrev}
                aria-label="Previous Gallery Photo"
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '44px',
                  height: '44px',
                  backgroundColor: 'rgba(23, 25, 26, 0.85)',
                  border: '1px solid var(--color-gold)',
                  color: 'var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next Gallery Photo"
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '44px',
                  height: '44px',
                  backgroundColor: 'rgba(23, 25, 26, 0.85)',
                  border: '1px solid var(--color-gold)',
                  color: 'var(--color-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </dialog>
      )}

      <style>{`
        .deco-frame:hover .gallery-overlay {
          opacity: 1 !important;
        }
        .deco-frame:hover .gallery-item-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}

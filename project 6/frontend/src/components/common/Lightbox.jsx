import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Lightbox() {
  const { lightboxImage, closeLightbox } = useCMS();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };
    if (lightboxImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImage, closeLightbox]);

  if (!lightboxImage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(9, 15, 27, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '2rem',
      }}
      onClick={closeLightbox}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '1100px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeLightbox}
          aria-label="Close photo preview"
          style={{
            position: 'absolute',
            top: '-3rem',
            right: 0,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(25, 37, 59, 0.8)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-ivory)',
            fontSize: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        <div
          style={{
            width: '100%',
            maxHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-diner)',
            backgroundColor: '#090F1B',
          }}
        >
          <img
            src={lightboxImage.image_url || lightboxImage.resolved_image}
            alt={lightboxImage.title || 'Diner Gallery item'}
            style={{
              maxWidth: '100%',
              maxHeight: '75vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        <div
          style={{
            width: '100%',
            marginTop: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                color: '#FFFFFF',
                marginBottom: '0.25rem',
              }}
            >
              {lightboxImage.title}
            </h4>
            {lightboxImage.caption && (
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.9rem',
                  color: 'var(--text-cream)',
                }}
              >
                {lightboxImage.caption}
              </p>
            )}
          </div>
          {lightboxImage.category && (
            <span className="meta-chip" style={{ textTransform: 'uppercase' }}>
              {lightboxImage.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Lightbox() {
  const { lightboxItem, closeLightbox } = useCMS();

  if (!lightboxItem) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'rgba(17, 19, 22, 0.94)',
        backdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={closeLightbox}
    >
      <div
        style={{
          maxWidth: '920px',
          width: '100%',
          position: 'relative',
          textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeLightbox}
          style={{
            position: 'absolute',
            top: -45,
            right: 0,
            background: 'none',
            border: 'none',
            fontSize: '28px',
            color: '#F6F4F0',
            cursor: 'pointer',
          }}
          aria-label="Close lightbox"
        >
          ✕
        </button>

        <img
          src={lightboxItem.image_url}
          alt={lightboxItem.title}
          style={{
            width: '100%',
            maxHeight: '75vh',
            objectFit: 'cover',
            borderRadius: '10px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255, 46, 136, 0.4)',
          }}
        />

        <div style={{ marginTop: '16px', color: '#F6F4F0' }}>
          <span
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-magenta)',
              fontWeight: 700,
              display: 'block',
              marginBottom: '4px',
              fontFamily: 'var(--font-condensed)'
            }}
          >
            {lightboxItem.category}
          </span>
          <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '4px' }}>
            {lightboxItem.title}
          </h4>
          {lightboxItem.caption && (
            <p style={{ fontSize: '0.9rem', color: 'var(--color-silver)' }}>{lightboxItem.caption}</p>
          )}
        </div>
      </div>
    </div>
  );
}

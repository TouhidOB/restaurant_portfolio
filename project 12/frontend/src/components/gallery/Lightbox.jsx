import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Lightbox() {
  const { lightboxImage, closeLightbox } = useCMS();

  if (!lightboxImage) return null;

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
        backgroundColor: 'rgba(24, 37, 46, 0.92)',
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
            color: '#F7F3EA',
            cursor: 'pointer',
          }}
          aria-label="Close lightbox"
        >
          ✕
        </button>

        <img
          src={lightboxImage.image_url}
          alt={lightboxImage.title}
          style={{
            width: '100%',
            maxHeight: '75vh',
            objectFit: 'cover',
            borderRadius: '10px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(233, 223, 207, 0.2)',
          }}
        />

        <div style={{ marginTop: '16px', color: '#F7F3EA' }}>
          <span
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#B96F4F',
              fontWeight: 700,
              display: 'block',
              marginBottom: '4px',
            }}
          >
            {lightboxImage.category}
          </span>
          <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#FFFFFF', marginBottom: '4px' }}>
            {lightboxImage.title}
          </h4>
          {lightboxImage.caption && (
            <p style={{ fontSize: '0.9rem', color: '#A9BDB5' }}>{lightboxImage.caption}</p>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Lightbox() {
  const { lightboxImage, setLightboxImage } = useCMS();

  if (!lightboxImage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2200,
        backgroundColor: 'rgba(10, 11, 12, 0.95)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setLightboxImage(null);
      }}
    >
      <button
        onClick={() => setLightboxImage(null)}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2.5rem',
          background: 'transparent',
          border: 'none',
          color: 'var(--color-offwhite)',
          fontSize: '2rem',
          cursor: 'pointer',
        }}
        aria-label="Close"
      >
        ✕
      </button>

      <div style={{ maxWidth: '980px', width: '100%', textAlign: 'center' }}>
        <img
          src={lightboxImage.url}
          alt={lightboxImage.caption || 'Urban Table Gallery'}
          style={{
            maxWidth: '100%',
            maxHeight: '75vh',
            objectFit: 'contain',
            borderRadius: '2px',
            border: '2px solid var(--color-brick)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
          }}
        />
        {lightboxImage.caption && (
          <div
            style={{
              marginTop: '1.25rem',
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              color: 'var(--color-offwhite)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            {lightboxImage.caption}
          </div>
        )}
        {lightboxImage.category && (
          <span
            style={{
              display: 'inline-block',
              marginTop: '0.4rem',
              color: 'var(--color-copper)',
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 800,
            }}
          >
            ✦ {lightboxImage.category}
          </span>
        )}
      </div>
    </div>
  );
}

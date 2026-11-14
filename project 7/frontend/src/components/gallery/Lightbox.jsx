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
        backgroundColor: 'rgba(10, 10, 12, 0.94)',
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
          color: 'var(--color-ivory)',
          fontSize: '2rem',
          cursor: 'pointer',
        }}
        aria-label="Fermer"
      >
        ✕
      </button>

      <div style={{ maxWidth: '960px', width: '100%', textAlign: 'center' }}>
        <img
          src={lightboxImage.url}
          alt={lightboxImage.caption || 'Galerie L\'Étoile Royale'}
          style={{
            maxWidth: '100%',
            maxHeight: '75vh',
            objectFit: 'contain',
            borderRadius: '6px',
            border: '1px solid rgba(197, 164, 109, 0.35)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
          }}
        />
        {lightboxImage.caption && (
          <div
            style={{
              marginTop: '1.25rem',
              fontFamily: 'var(--font-editorial)',
              fontSize: '1.2rem',
              color: 'var(--color-ivory)',
              fontStyle: 'italic',
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
              color: 'var(--color-gold)',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            ✦ {lightboxImage.category}
          </span>
        )}
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Lightbox() {
  const { lightboxImage, setLightboxImage } = useCMS();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    if (lightboxImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxImage, setLightboxImage]);

  if (!lightboxImage) return null;

  const url = typeof lightboxImage === 'string' ? lightboxImage : lightboxImage.url;
  const title = typeof lightboxImage === 'object' ? lightboxImage.title : '';
  const category = typeof lightboxImage === 'object' ? lightboxImage.category : '';

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(16, 26, 21, 0.95)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 20px',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setLightboxImage(null);
      }}
    >
      <button
        onClick={() => setLightboxImage(null)}
        aria-label="Close Lightbox"
        style={{
          position: 'absolute',
          top: '24px',
          right: '28px',
          backgroundColor: 'transparent',
          border: '1px solid rgba(166, 181, 160, 0.4)',
          borderRadius: '50%',
          width: '42px',
          height: '42px',
          color: '#FAF7F0',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ✕
      </button>

      <div style={{ maxWidth: '1050px', maxHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src={url}
          alt={title || 'Botanical Glasshouse View'}
          style={{
            maxWidth: '100%',
            maxHeight: '74vh',
            objectFit: 'contain',
            borderRadius: '2px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(166, 181, 160, 0.3)',
          }}
        />

        {(title || category) && (
          <div style={{ marginTop: '16px', textAlign: 'center', color: '#FAF7F0' }}>
            {category && (
              <span style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-sage)', display: 'block', marginBottom: '4px' }}>
                {category}
              </span>
            )}
            {title && (
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontStyle: 'italic', margin: 0 }}>
                "{title}"
              </p>
            )}
          </div>
        )}
      </div>

      <div style={{ position: 'absolute', bottom: '20px', fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250, 247, 240, 0.4)' }}>
        Press ESC or click outside to dismiss
      </div>
    </div>
  );
}

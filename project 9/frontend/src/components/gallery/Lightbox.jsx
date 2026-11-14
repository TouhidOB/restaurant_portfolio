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
        zIndex: 99999,
        backgroundColor: 'rgba(10, 18, 29, 0.95)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
      onClick={() => setLightboxImage(null)}
    >
      <button
        onClick={() => setLightboxImage(null)}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          background: 'none',
          border: 'none',
          color: 'var(--color-cloud-ivory)',
          fontSize: '2.4rem',
          cursor: 'pointer',
          lineHeight: 1,
        }}
      >
        &times;
      </button>

      <div
        style={{
          maxWidth: '960px',
          maxHeight: '80vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={lightboxImage.url}
          alt={lightboxImage.title || 'Skyline Gallery Plate'}
          style={{
            maxWidth: '100%',
            maxHeight: '70vh',
            objectFit: 'contain',
            borderRadius: '3px',
            border: '1px solid var(--color-border)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          }}
        />

        {(lightboxImage.title || lightboxImage.category) && (
          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            {lightboxImage.category && (
              <span className="section-label" style={{ marginBottom: '0.2rem' }}>
                {lightboxImage.category}
              </span>
            )}
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-cloud-ivory)' }}>
              {lightboxImage.title}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

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
        zIndex: 3000,
        backgroundColor: 'rgba(15, 16, 14, 0.95)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
      onClick={closeLightbox}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeLightbox}
          style={{
            alignSelf: 'flex-end',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '2rem',
            cursor: 'pointer',
            padding: '0.5rem',
            lineHeight: 1,
          }}
        >
          &times;
        </button>

        <img
          src={lightboxImage.image_url}
          alt={lightboxImage.title}
          style={{
            width: '100%',
            maxHeight: '70vh',
            objectFit: 'contain',
            border: '1px solid var(--border-steel)',
            backgroundColor: '#1c1d1a',
          }}
        />

        <div
          style={{
            marginTop: '1rem',
            padding: '1rem 0',
            borderBottom: '1px solid var(--border-steel)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700 }}>
              {lightboxImage.title}
            </div>
            {lightboxImage.caption && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                {lightboxImage.caption}
              </div>
            )}
          </div>
          <span className="meta-chip">
            {lightboxImage.category?.toUpperCase() || 'ARCHIVE'}
          </span>
        </div>
      </div>
    </div>
  );
}

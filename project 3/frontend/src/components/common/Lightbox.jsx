import React from 'react';
import { X } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Lightbox() {
  const { lightboxImage, setLightboxImage } = useCMS();

  if (!lightboxImage) return null;

  return (
    <div className="modal-backdrop" onClick={() => setLightboxImage(null)} style={{ background: 'rgba(15, 49, 66, 0.88)' }}>
      <button
        onClick={() => setLightboxImage(null)}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          background: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FAF9F5',
          cursor: 'pointer',
          zIndex: 1100,
        }}
      >
        <X size={22} />
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '920px',
          width: '90%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src={lightboxImage.image_url || lightboxImage.image}
          alt={lightboxImage.title}
          style={{
            maxWidth: '100%',
            maxHeight: '70vh',
            objectFit: 'contain',
            borderRadius: '10px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        />
        <div style={{ marginTop: '16px', textAlign: 'center', color: '#FAF9F5' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#C9DDE0',
              display: 'inline-block',
              marginBottom: '4px',
            }}
          >
            {lightboxImage.category}
          </span>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FAF9F5' }}>
            {lightboxImage.title}
          </h4>
          {lightboxImage.caption && (
            <p style={{ fontSize: '0.9rem', color: '#D2DEE2', maxWidth: '600px', margin: '4px auto 0' }}>
              {lightboxImage.caption}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

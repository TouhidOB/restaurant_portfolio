import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function Lightbox() {
  const { lightboxImage, setLightboxImage } = useCMS();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setLightboxImage]);

  if (!lightboxImage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(16, 16, 16, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={() => setLightboxImage(null)}
    >
      <button
        onClick={() => setLightboxImage(null)}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          background: 'rgba(28, 27, 25, 0.8)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--color-ivory)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
      >
        <X size={20} />
      </button>

      <div
        style={{
          maxWidth: '90vw',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={lightboxImage.image || lightboxImage.image_url}
          alt={lightboxImage.alt_text || lightboxImage.title}
          style={{
            maxWidth: '100%',
            maxHeight: '75vh',
            objectFit: 'contain',
            borderRadius: '2px',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9)'
          }}
        />
        {lightboxImage.title && (
          <div style={{
            marginTop: '16px',
            textAlign: 'center',
            color: 'var(--color-champagne)',
            fontFamily: 'var(--font-display)',
            fontSize: '22px'
          }}>
            {lightboxImage.title}
          </div>
        )}
      </div>
    </div>
  );
}

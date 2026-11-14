import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Lightbox() {
  const { lightboxImage, setLightboxImage, t, lang } = useCMS();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
      }
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

  const imageUrl = typeof lightboxImage === 'string' ? lightboxImage : lightboxImage.url;
  const caption = typeof lightboxImage === 'object'
    ? (t(lightboxImage.caption) || lightboxImage.title || '')
    : '';
  const category = typeof lightboxImage === 'object'
    ? (t(lightboxImage.category) || '')
    : '';

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        backgroundColor: 'rgba(10, 8, 7, 0.94)',
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
      {/* Close button */}
      <button
        onClick={() => setLightboxImage(null)}
        aria-label="Close Lightbox"
        style={{
          position: 'absolute',
          top: '24px',
          right: '28px',
          backgroundColor: 'transparent',
          border: '1px solid rgba(177, 138, 84, 0.4)',
          borderRadius: '50%',
          width: '42px',
          height: '42px',
          color: 'var(--color-bg-ivory, #F4EBDD)',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-terracotta, #A6533B)';
          e.currentTarget.style.borderColor = 'var(--color-terracotta, #A6533B)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = 'rgba(177, 138, 84, 0.4)';
        }}
      >
        ✕
      </button>

      {/* Main Image Container */}
      <div
        style={{
          maxWidth: '1100px',
          maxHeight: '78vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <img
          src={imageUrl}
          alt={caption || 'Bengal Heritage Dining Gallery'}
          style={{
            maxWidth: '100%',
            maxHeight: '72vh',
            objectFit: 'contain',
            borderRadius: '2px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(177, 138, 84, 0.3)',
          }}
        />

        {(caption || category) && (
          <div
            style={{
              marginTop: '16px',
              textAlign: 'center',
              color: 'var(--color-bg-ivory, #F4EBDD)',
            }}
          >
            {category && (
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-brass, #B18A54)',
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                {category}
              </span>
            )}
            {caption && (
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontStyle: 'italic',
                  margin: 0,
                  maxWidth: '700px',
                }}
              >
                "{caption}"
              </p>
            )}
          </div>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(244, 235, 221, 0.45)',
        }}
      >
        {lang === 'bn' ? 'বন্ধ করতে ESC চাপুন অথবা বাইরে ক্লিক করুন' : 'Press ESC or click outside to dismiss'}
      </div>
    </div>
  );
}

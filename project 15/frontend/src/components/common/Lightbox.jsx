import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox() {
  const { lightboxIndex, setLightboxIndex, data } = useCMS();

  const galleryItems = data.gallery || [];
  const activeItem = lightboxIndex !== null ? galleryItems[lightboxIndex] : null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, galleryItems.length, setLightboxIndex]);

  if (lightboxIndex === null || !activeItem) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 6, 8, 0.94)',
        backdropFilter: 'blur(20px)',
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={() => setLightboxIndex(null)}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '1000px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            color: '#FFF'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#CCFF00',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '999px',
                border: '1px solid rgba(204, 255, 0, 0.25)'
              }}
            >
              {activeItem.category || 'GALLERY'}
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 700 }}>
              {activeItem.title}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#646A7E' }}>
              {lightboxIndex + 1} / {galleryItems.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFF',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Image Frame */}
        <div
          style={{
            position: 'relative',
            maxHeight: '75vh',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
            backgroundColor: '#090A0E'
          }}
        >
          <img
            src={activeItem.image_url}
            alt={activeItem.title}
            style={{
              maxHeight: '75vh',
              width: 'auto',
              maxWidth: '100%',
              display: 'block',
              objectFit: 'contain'
            }}
          />

          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(9, 10, 14, 0.8)',
              backdropFilter: 'blur(10px)',
              color: '#FFF',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(9, 10, 14, 0.8)',
              backdropFilter: 'blur(10px)',
              color: '#FFF',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

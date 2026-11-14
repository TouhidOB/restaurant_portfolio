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
        backgroundColor: 'rgba(23, 23, 23, 0.92)',
        backdropFilter: 'blur(10px)',
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={() => setLightboxIndex(null)}
    >
      {/* Container */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                backgroundColor: '#FFD928',
                color: '#171717',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '6px',
                border: '2px solid #171717'
              }}
            >
              {activeItem.category || 'GALLERY'}
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', letterSpacing: '0.5px' }}>
              {activeItem.title}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#FFD928' }}>
              {lightboxIndex + 1} / {galleryItems.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              style={{
                backgroundColor: '#F04438',
                color: '#FFF',
                border: '2px solid #FFF',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Image Frame */}
        <div
          style={{
            position: 'relative',
            maxHeight: '75vh',
            borderRadius: '16px',
            border: '4px solid #171717',
            overflow: 'hidden',
            boxShadow: '8px 8px 0px #FFD928',
            backgroundColor: '#000'
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

          {/* Nav arrows on image */}
          <button
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#FFD928',
              color: '#171717',
              border: '2px solid #171717',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '3px 3px 0 #171717'
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#FFD928',
              color: '#171717',
              border: '2px solid #171717',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '3px 3px 0 #171717'
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

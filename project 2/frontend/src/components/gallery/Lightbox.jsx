import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (currentIndex === null || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: 'rgba(18, 20, 19, 0.95)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close Lightbox"
        style={{
          position: 'absolute',
          top: '24px',
          right: '28px',
          background: 'none',
          border: 'none',
          color: '#FFFFFF',
          cursor: 'pointer',
        }}
      >
        <X size={28} />
      </button>

      {/* Prev button */}
      <button
        onClick={onPrev}
        aria-label="Previous Photo"
        style={{
          position: 'absolute',
          left: '24px',
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '46px',
          height: '46px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          cursor: 'pointer',
        }}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Main Image */}
      <div style={{ maxWidth: '85vw', maxHeight: '75vh', position: 'relative' }}>
        <img
          src={currentImage.url}
          alt={currentImage.title}
          style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '2px' }}
        />
        <div style={{ textAlign: 'center', marginTop: '16px', color: 'var(--color-rice-paper)' }}>
          <h4 style={{ fontSize: '18px', fontWeight: 500 }}>{currentImage.title}</h4>
          <span style={{ fontSize: '12px', color: 'var(--color-bamboo)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {currentImage.category} &bull; {currentIndex + 1} of {images.length}
          </span>
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        aria-label="Next Photo"
        style={{
          position: 'absolute',
          right: '24px',
          background: 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '50%',
          width: '46px',
          height: '46px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          cursor: 'pointer',
        }}
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}

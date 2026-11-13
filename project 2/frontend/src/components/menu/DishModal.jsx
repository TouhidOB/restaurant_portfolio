import React, { useEffect } from 'react';
import { X, Sparkles, Utensils } from 'lucide-react';

export default function DishModal({ dish, onClose, onReserve }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && dish) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dish, onClose]);

  if (!dish) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: 'rgba(20, 22, 21, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: '#FFFFFF',
          borderRadius: '2px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close dish details"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(32, 35, 33, 0.7)',
            border: 'none',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {dish.image && (
          <div style={{ width: '100%', height: '260px', overflow: 'hidden', position: 'relative' }}>
            <img
              src={dish.image}
              alt={dish.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '14px',
                right: '16px',
                padding: '4px 12px',
                backgroundColor: 'rgba(32, 35, 33, 0.9)',
                color: 'var(--color-bamboo)',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '2px',
              }}
            >
              {dish.price}
            </div>
          </div>
        )}

        <div style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-moss)', fontWeight: 600 }}>
              {dish.category}
            </span>
            {dish.japaneseName && (
              <span className="font-jp" style={{ fontSize: '13px', color: 'var(--color-stone)' }}>
                {dish.japaneseName}
              </span>
            )}
          </div>

          <h3 style={{ fontSize: '26px', color: 'var(--color-charcoal)', marginBottom: '12px' }}>
            {dish.name}
          </h3>

          <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-charcoal)', marginBottom: '18px' }}>
            {dish.description}
          </p>

          {dish.tastingNote && (
            <div
              style={{
                padding: '14px',
                backgroundColor: '#F9F7F2',
                borderLeft: '3px solid var(--color-bamboo)',
                fontSize: '13px',
                fontStyle: 'italic',
                color: 'var(--color-charcoal)',
                marginBottom: '20px',
              }}
            >
              <strong>Tasting Note:</strong> {dish.tastingNote}
            </div>
          )}

          {dish.tags && dish.tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {dish.tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '11px',
                    padding: '3px 9px',
                    backgroundColor: '#F0ECE4',
                    color: 'var(--color-charcoal)',
                    borderRadius: '2px',
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              onClose();
              if (onReserve) onReserve();
            }}
            className="btn-zen btn-zen-primary"
            style={{ width: '100%' }}
          >
            Inquire For Table Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

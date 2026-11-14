import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function DishModal() {
  const { selectedDish, setSelectedDish, openReservation } = useCMS();

  if (!selectedDish) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(10, 11, 12, 0.9)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedDish(null);
      }}
    >
      <div
        style={{
          backgroundColor: '#181A1C',
          border: '2px solid var(--color-brick)',
          borderRadius: '2px',
          maxWidth: '560px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.8)',
        }}
      >
        <button
          onClick={() => setSelectedDish(null)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(0, 0, 0, 0.7)',
            border: 'none',
            color: '#FFF',
            width: '32px',
            height: '32px',
            borderRadius: '2px',
            cursor: 'pointer',
            zIndex: 10,
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {selectedDish.image && (
          <div style={{ height: '260px', overflow: 'hidden' }}>
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        <div style={{ padding: '2rem' }}>
          {selectedDish.category && (
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(184, 115, 69, 0.2)',
                color: 'var(--color-copper)',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                padding: '0.25rem 0.65rem',
                borderRadius: '2px',
                marginBottom: '0.75rem',
                border: '1px solid var(--color-copper)',
                fontWeight: 700,
              }}
            >
              {selectedDish.category}
            </span>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.75rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-offwhite)', textTransform: 'uppercase' }}>
              {selectedDish.name}
            </h3>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-copper)', fontWeight: 700, marginLeft: '0.75rem' }}>
              {selectedDish.price}
            </span>
          </div>

          <p style={{ color: 'var(--color-concrete)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            {selectedDish.description}
          </p>

          {selectedDish.pairing && (
            <div
              style={{
                background: 'var(--color-graphite)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                padding: '0.9rem 1.25rem',
                marginBottom: '1.75rem',
              }}
            >
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-copper)', marginBottom: '0.2rem', fontWeight: 800 }}>
                ✦ Recommended Beverage Pairing
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-offwhite)', fontWeight: 600 }}>
                {selectedDish.pairing}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => {
                setSelectedDish(null);
                openReservation();
              }}
              className="btn-primary"
              style={{ flex: 1 }}
            >
              Reserve Table For This Dish
            </button>
            <button
              onClick={() => setSelectedDish(null)}
              className="btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

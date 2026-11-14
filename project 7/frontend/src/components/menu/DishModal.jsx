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
        backgroundColor: 'rgba(15, 15, 17, 0.88)',
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
          backgroundColor: '#242529',
          border: '1px solid rgba(197, 164, 109, 0.4)',
          borderRadius: '12px',
          maxWidth: '560px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.7)',
        }}
      >
        <button
          onClick={() => setSelectedDish(null)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(0, 0, 0, 0.6)',
            border: 'none',
            color: '#FFF',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: 10,
          }}
          aria-label="Fermer"
        >
          ✕
        </button>

        {selectedDish.image && (
          <div style={{ height: '240px', overflow: 'hidden' }}>
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        <div style={{ padding: '2rem' }}>
          {selectedDish.tag && (
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(197, 164, 109, 0.15)',
                color: 'var(--color-gold)',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                padding: '0.25rem 0.65rem',
                borderRadius: '4px',
                marginBottom: '0.75rem',
                border: '1px solid rgba(197, 164, 109, 0.3)',
              }}
            >
              {selectedDish.tag}
            </span>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-ivory)' }}>
              {selectedDish.name}
            </h3>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-gold)', fontWeight: 600 }}>
              {selectedDish.price}
            </span>
          </div>

          {selectedDish.french_name && (
            <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--color-taupe)', fontSize: '1rem', marginBottom: '1rem' }}>
              « {selectedDish.french_name} »
            </div>
          )}

          <p style={{ color: 'var(--color-ivory-dim)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            {selectedDish.description}
          </p>

          {selectedDish.wine_pairing && (
            <div
              style={{
                background: 'rgba(84, 37, 47, 0.25)',
                border: '1px solid rgba(197, 164, 109, 0.25)',
                borderRadius: '8px',
                padding: '1rem 1.25rem',
                marginBottom: '1.75rem',
              }}
            >
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-gold)', marginBottom: '0.25rem' }}>
                ✦ Accord Sommelier Conseillé
              </div>
              <div style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', color: 'var(--color-ivory)' }}>
                {selectedDish.wine_pairing}
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
              Réserver pour Déguster
            </button>
            <button
              onClick={() => setSelectedDish(null)}
              className="btn-secondary"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

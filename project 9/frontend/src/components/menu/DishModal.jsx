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
        zIndex: 9999,
        backgroundColor: 'rgba(10, 18, 29, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={() => setSelectedDish(null)}
    >
      <div
        style={{
          background: 'var(--color-midnight)',
          border: '1px solid var(--color-border)',
          borderRadius: '4px',
          maxWidth: '680px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.7)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setSelectedDish(null)}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            background: 'rgba(16, 28, 44, 0.7)',
            border: 'none',
            color: 'var(--color-cloud-ivory)',
            fontSize: '1.6rem',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          &times;
        </button>

        {selectedDish.image && (
          <div style={{ height: '280px', width: '100%', overflow: 'hidden', position: 'relative' }}>
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, var(--color-midnight) 0%, transparent 60%)',
              }}
            />
          </div>
        )}

        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
            <div>
              <span className="section-label" style={{ marginBottom: '0.3rem' }}>
                {selectedDish.category || 'CULINARY CREATION'}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.1rem', color: 'var(--color-cloud-ivory)' }}>
                {selectedDish.name}
              </h2>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-champagne)', fontWeight: 600 }}>
              {selectedDish.price}
            </span>
          </div>

          <p style={{ color: 'var(--color-cloud-ivory)', fontSize: '0.96rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            {selectedDish.description}
          </p>

          {selectedDish.ingredients && (
            <div style={{ marginBottom: '1.75rem' }}>
              <h4 style={{ fontFamily: 'var(--font-accent)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-champagne)', marginBottom: '0.6rem', fontWeight: 700 }}>
                Pristine Ingredients &amp; Terroir
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedDish.ingredients.map((ing) => (
                  <span
                    key={ing}
                    style={{
                      padding: '0.35rem 0.75rem',
                      background: 'var(--color-midnight-card)',
                      border: '1px solid var(--color-border-subtle)',
                      borderRadius: '2px',
                      fontSize: '0.82rem',
                      color: 'var(--color-cloud-ivory)',
                    }}
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1.25rem' }}>
            <button
              onClick={() => {
                setSelectedDish(null);
                openReservation();
              }}
              className="btn-skyline-primary"
              style={{ flex: 1, padding: '0.85rem' }}
            >
              Reserve Table For This Dish
            </button>
            <button
              onClick={() => setSelectedDish(null)}
              className="btn-skyline-outline"
              style={{ padding: '0.85rem 1.5rem' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

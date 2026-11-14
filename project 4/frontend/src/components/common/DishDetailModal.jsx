import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function DishDetailModal() {
  const { selectedDish, closeDish, openReservation } = useCMS();

  if (!selectedDish) return null;

  const handleInquire = () => {
    closeDish();
    openReservation();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        backgroundColor: 'rgba(15, 16, 14, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={closeDish}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '780px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-steel)',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Photography */}
        <div style={{ position: 'relative', minHeight: '340px', background: '#1c1d1a' }}>
          <img
            src={selectedDish.resolved_image || selectedDish.image_url}
            alt={selectedDish.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              background: 'var(--accent-orange)',
              color: '#000',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.2rem 0.5rem',
            }}
          >
            {selectedDish.currency_symbol || '$'}{selectedDish.price}
          </div>
        </div>

        {/* Right Side: Specifications */}
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span className="section-tag" style={{ marginBottom: 0 }}>
                CULINARY SPECIFICATION
              </span>
              <button
                type="button"
                onClick={closeDish}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  padding: '0.2rem',
                }}
              >
                &times;
              </button>
            </div>

            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{selectedDish.name}</h3>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-orange)', marginBottom: '1rem' }}>
              {selectedDish.short_description}
            </p>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              {selectedDish.full_description || selectedDish.short_description}
            </p>

            {/* Dietary Tags */}
            {selectedDish.dietary_information && selectedDish.dietary_information.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                  DIETARY ATTRIBUTES
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {selectedDish.dietary_information.map((tag) => (
                    <span key={tag} className="meta-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedDish.allergens && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                ALLERGEN PROFILE: <span style={{ color: 'var(--text-secondary)' }}>{selectedDish.allergens}</span>
              </div>
            )}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <button
              type="button"
              onClick={handleInquire}
              className="btn-orange"
              style={{ flex: 1, padding: '0.75rem 1rem', fontSize: '0.85rem' }}
            >
              RESERVE TABLE &rarr;
            </button>
            <button
              type="button"
              onClick={closeDish}
              className="btn-outline-brutal"
              style={{ padding: '0.75rem 1.25rem', fontSize: '0.85rem' }}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

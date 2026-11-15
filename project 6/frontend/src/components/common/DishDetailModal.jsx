import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function DishDetailModal() {
  const { selectedDish, closeDish, openReservation } = useCMS();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeDish();
    };
    if (selectedDish) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedDish, closeDish]);

  if (!selectedDish) return null;

  const handleReserve = () => {
    closeDish();
    openReservation();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backgroundColor: 'rgba(9, 15, 27, 0.88)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      onClick={closeDish}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeDish}
          aria-label="Close dish preview"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(9, 15, 27, 0.85)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-ivory)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--cherry-red)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(9, 15, 27, 0.85)')}
        >
          ✕
        </button>

        {/* Dish Image */}
        <div
          style={{
            position: 'relative',
            minHeight: '280px',
            overflow: 'hidden',
            backgroundColor: '#0D1422',
          }}
        >
          <img
            src={selectedDish.resolved_image || selectedDish.image_url || selectedDish.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80'}
            alt={selectedDish.name}
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80';
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(25, 37, 59, 0.8) 0%, transparent 50%)',
            }}
          />
          {selectedDish.is_featured && (
            <span
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                backgroundColor: 'var(--cherry-red)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-xs)',
                boxShadow: '0 0 10px rgba(216, 58, 69, 0.5)',
              }}
            >
              ★ DINER STAR
            </span>
          )}
        </div>

        {/* Dish Details */}
        <div
          style={{
            padding: '2.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'space-between',
                gap: '1rem',
                marginBottom: '0.75rem',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.9rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1.15,
                }}
              >
                {selectedDish.name}
              </h3>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.35rem',
                  color: 'var(--neon-cyan)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                }}
              >
                {selectedDish.currency_symbol || '$'}{selectedDish.price}
              </span>
            </div>

            {/* Dietary tags */}
            {selectedDish.dietary_information && selectedDish.dietary_information.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.25rem' }}>
                {selectedDish.dietary_information.map((diet) => (
                  <span
                    key={diet}
                    className="meta-chip"
                    style={{
                      backgroundColor: 'rgba(67, 217, 232, 0.15)',
                      borderColor: 'var(--neon-cyan)',
                      color: 'var(--neon-cyan)',
                    }}
                  >
                    {diet}
                  </span>
                ))}
              </div>
            )}

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: 'var(--text-cream)',
                lineHeight: 1.6,
                marginBottom: '1.25rem',
              }}
            >
              {selectedDish.full_description || selectedDish.short_description}
            </p>

            {selectedDish.allergens && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-xs)',
                  backgroundColor: 'rgba(216, 58, 69, 0.12)',
                  border: '1px solid rgba(216, 58, 69, 0.3)',
                  marginBottom: '1.75rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--cherry-red)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.2rem',
                  }}
                >
                  Allergen Notice
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    color: 'var(--text-ivory)',
                  }}
                >
                  Contains: {selectedDish.allergens}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleReserve}
            className="btn-cherry"
            style={{
              width: '100%',
              padding: '0.9rem',
              fontSize: '0.92rem',
            }}
          >
            <span>RESERVE TABLE FOR THIS DISH</span>
          </button>
        </div>
      </div>
    </div>
  );
}

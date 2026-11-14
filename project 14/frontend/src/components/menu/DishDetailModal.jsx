import React from 'react';
import { X, Flame, Award, Check } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function DishDetailModal() {
  const { selectedDish, setSelectedDish, openReservation } = useCMS();

  if (!selectedDish) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(16, 16, 16, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}
    onClick={() => setSelectedDish(null)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '820px',
          background: 'var(--color-charcoal)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '4px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          boxShadow: '0 30px 80px rgba(0,0,0,0.9)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedDish(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(28, 27, 25, 0.8)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--color-ivory)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={16} />
        </button>

        {/* Dish Photography */}
        <div style={{
          position: 'relative',
          height: '100%',
          minHeight: '380px',
          backgroundImage: `url(${selectedDish.image || selectedDish.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(28,27,25,0.85) 0%, transparent 60%)'
          }} />
          {selectedDish.is_featured && (
            <div style={{
              position: 'absolute',
              top: '18px',
              left: '18px',
              background: 'var(--color-bronze)',
              color: 'var(--color-obsidian)',
              fontFamily: 'var(--font-heading)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Award size={12} />
              Signature Cut
            </div>
          )}
        </div>

        {/* Dish Content Details */}
        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--color-champagne)',
              marginBottom: '6px'
            }}>
              {selectedDish.cut_type || selectedDish.category_name || 'Artisan Selection'}
            </div>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              color: 'var(--color-ivory)',
              marginBottom: '12px',
              lineHeight: 1.15
            }}>
              {selectedDish.name}
            </h2>

            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '12px',
              marginBottom: '18px'
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '28px',
                color: 'var(--color-champagne)',
                fontWeight: 600
              }}>
                {selectedDish.currency || '$'}{selectedDish.price}
              </span>
              {selectedDish.serving_size && (
                <span style={{ fontSize: '12px', color: 'var(--color-taupe)' }}>
                  ({selectedDish.serving_size})
                </span>
              )}
            </div>

            <p style={{
              fontSize: '14px',
              color: 'var(--color-taupe)',
              lineHeight: 1.7,
              marginBottom: '20px'
            }}>
              {selectedDish.description || selectedDish.short_description}
            </p>

            {/* Dietary Tags */}
            {selectedDish.dietary_tags && selectedDish.dietary_tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {selectedDish.dietary_tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(148, 115, 79, 0.12)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--color-champagne)',
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '2px',
                      fontFamily: 'var(--font-heading)',
                      letterSpacing: '0.8px'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
            <button
              onClick={() => {
                setSelectedDish(null);
                openReservation(`Table Reservation with ${selectedDish.name}`);
              }}
              className="btn-prime"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Reserve Table For This Dish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

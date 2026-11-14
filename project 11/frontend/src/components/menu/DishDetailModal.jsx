import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function DishDetailModal() {
  const { selectedDish, setSelectedDish, openReservation } = useCMS();

  if (!selectedDish) return null;

  const dishName = selectedDish.name;
  const price = selectedDish.price ? `${selectedDish.currency || '$'}${selectedDish.price}` : '';
  const dietary = Array.isArray(selectedDish.dietary_tags) ? selectedDish.dietary_tags : [];
  const ingredients = Array.isArray(selectedDish.ingredients)
    ? selectedDish.ingredients
    : typeof selectedDish.ingredients === 'string'
      ? selectedDish.ingredients.split(',').map((s) => s.trim())
      : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(26, 43, 36, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedDish(null);
      }}
    >
      <div
        style={{
          backgroundColor: '#FAF7F0',
          color: '#292D29',
          maxWidth: '780px',
          width: '100%',
          maxHeight: '90vh',
          borderRadius: '4px',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(168, 121, 88, 0.4)',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: selectedDish.image ? '1fr 1.2fr' : '1fr',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedDish(null)}
          aria-label="Close Preview"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(26, 43, 36, 0.8)',
            color: '#FAF7F0',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
          }}
        >
          ✕
        </button>

        {/* Dish Image */}
        {selectedDish.image && (
          <div style={{ position: 'relative', minHeight: '320px', backgroundColor: '#1A2B24' }}>
            <img
              src={selectedDish.image}
              alt={dishName}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {selectedDish.is_signature && (
              <span
                style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  backgroundColor: 'var(--color-copper, #A87958)',
                  color: '#FFFFFF',
                  padding: '4px 10px',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  borderRadius: '2px',
                }}
              >
                Signature Ritual
              </span>
            )}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '36px 30px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-olive)', fontWeight: 700, marginBottom: '6px' }}>
            {selectedDish.category_name || selectedDish.category || 'Botanical Offering'}
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--color-forest)', lineHeight: 1.2, margin: '0 0 6px 0' }}>
            {dishName}
          </h2>

          <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, color: 'var(--color-copper)', marginBottom: '16px' }}>
            {price}
          </div>

          <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(41, 45, 41, 0.85)', marginBottom: '20px' }}>
            {selectedDish.description}
          </p>

          {/* Botanical Notes */}
          {selectedDish.botanical_notes && (
            <div style={{ padding: '12px 14px', backgroundColor: 'rgba(166, 181, 160, 0.2)', borderLeft: '3px solid var(--color-forest)', borderRadius: '2px', marginBottom: '20px', fontSize: '13px', color: 'var(--color-forest)' }}>
              🌱 <strong>Botanical Profile:</strong> {selectedDish.botanical_notes}
            </div>
          )}

          {/* Dietary Tags */}
          {dietary.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
              {dietary.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '11px',
                    padding: '3px 8px',
                    backgroundColor: 'rgba(114, 124, 82, 0.15)',
                    color: 'var(--color-olive)',
                    border: '1px solid rgba(114, 124, 82, 0.3)',
                    borderRadius: '2px',
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Ingredients list if present */}
          {ingredients.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-forest)', fontWeight: 600, marginBottom: '8px' }}>
                Key Ingredients
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {ingredients.map((ing, i) => (
                  <span key={i} style={{ fontSize: '12px', padding: '3px 8px', backgroundColor: '#EDE8DC', borderRadius: '2px', color: '#292D29' }}>
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 'auto' }}>
            <button
              onClick={() => {
                setSelectedDish(null);
                openReservation(dishName);
              }}
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: 'var(--color-forest)',
                color: '#FAF7F0',
                border: 'none',
                borderRadius: '2px',
                fontSize: '12.5px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reserve Table to Taste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

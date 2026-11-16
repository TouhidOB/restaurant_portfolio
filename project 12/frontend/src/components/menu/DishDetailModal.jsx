import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function DishDetailModal() {
  const { selectedDish, closeDishModal, openReservationModal } = useCMS();

  if (!selectedDish) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(38, 58, 72, 0.78)',
        backdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={closeDishModal}
    >
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
          border: '1px solid #DECDB8',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeDishModal}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(255, 255, 255, 0.85)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#302F2B',
            zIndex: 10,
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {selectedDish.image && (
          <div style={{ height: '220px', width: '100%', overflow: 'hidden' }}>
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        )}

        <div style={{ padding: '28px 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          {selectedDish.is_signature && (
            <span className="badge-tag" style={{ background: '#FDE8CD', color: '#9D5B3E', borderColor: '#DECDB8' }}>
              ⭐ Chef's Signature
            </span>
          )}
          {selectedDish.dietary_tags && (
            <span className="badge-tag" style={{ background: 'var(--c-limestone)', color: 'var(--c-navy)' }}>
              {selectedDish.dietary_tags}
            </span>
          )}
        </div>

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '2rem',
            color: 'var(--c-navy)',
            lineHeight: 1.15,
            marginBottom: '4px',
          }}
        >
          {selectedDish.name}
        </h3>

        {selectedDish.subtitle && (
          <div style={{ fontSize: '0.92rem', color: '#B96F4F', fontWeight: 600, marginBottom: '16px' }}>
            {selectedDish.subtitle}
          </div>
        )}

        <div
          style={{
            fontSize: '1.6rem',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 700,
            color: 'var(--c-navy)',
            marginBottom: '18px',
          }}
        >
          {selectedDish.price}
        </div>

        <p style={{ color: '#4A4641', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '22px' }}>
          {selectedDish.description}
        </p>

        {selectedDish.pairing_notes && (
          <div
            style={{
              backgroundColor: 'var(--c-ivory)',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #E9DFCF',
              marginBottom: '26px',
            }}
          >
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#596448', fontWeight: 700, marginBottom: '4px' }}>
              🍷 Sommelier Pairing Recommendation
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--c-navy)', fontStyle: 'italic' }}>
              "{selectedDish.pairing_notes}"
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => {
              closeDishModal();
              openReservationModal();
            }}
            className="btn-primary"
            style={{ flex: 1 }}
          >
            Reserve Table For This Dish
          </button>
          <button onClick={closeDishModal} className="btn-secondary">
            Close
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

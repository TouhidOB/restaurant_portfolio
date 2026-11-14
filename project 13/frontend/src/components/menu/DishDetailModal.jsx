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
        backgroundColor: 'rgba(17, 19, 22, 0.88)',
        backdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={closeDishModal}
    >
      <div
        style={{
          backgroundColor: '#1B1D22',
          borderRadius: '14px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255, 46, 136, 0.4)',
          position: 'relative',
          padding: '36px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeDishModal}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'none',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer',
            color: 'var(--color-silver)',
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          {selectedDish.is_featured && (
            <span className="badge-tag" style={{ background: 'rgba(255, 46, 136, 0.2)', color: 'var(--color-magenta)', borderColor: 'var(--color-magenta)' }}>
              ★ Street Icon
            </span>
          )}
          {selectedDish.spicy_level > 0 && (
            <span className="badge-tag" style={{ background: 'rgba(255, 89, 77, 0.2)', color: 'var(--color-coral)', borderColor: 'var(--color-coral)' }}>
              {selectedDish.spicy_level === 3 ? '🔥🔥🔥 Fire Buldak' : selectedDish.spicy_level === 2 ? '🌶️🌶️ Hot' : '🌶️ Mild'}
            </span>
          )}
        </div>

        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.9rem',
            color: '#F6F4F0',
            lineHeight: 1.15,
            marginBottom: '4px',
          }}
        >
          {selectedDish.name}
        </h3>

        {selectedDish.korean_name && (
          <div style={{ fontSize: '1.1rem', color: 'var(--color-cyan)', fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, marginBottom: '14px' }}>
            {selectedDish.korean_name}
          </div>
        )}

        <div
          style={{
            fontSize: '1.6rem',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            color: 'var(--color-amber)',
            marginBottom: '18px',
          }}
        >
          {selectedDish.price}
        </div>

        <p style={{ color: 'var(--color-silver)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '22px' }}>
          {selectedDish.description || selectedDish.short_description}
        </p>

        {selectedDish.dietary_tags && (
          <div
            style={{
              backgroundColor: '#111316',
              padding: '14px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              marginBottom: '24px',
              fontSize: '0.85rem',
              color: 'var(--color-silver)',
            }}
          >
            <strong style={{ color: '#F6F4F0', display: 'block', marginBottom: '2px', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
              Dietary Profile & Serving
            </strong>
            {selectedDish.dietary_tags}
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
  );
}

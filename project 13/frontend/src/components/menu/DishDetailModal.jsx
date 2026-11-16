import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function DishDetailModal() {
  const { selectedDish, closeDishModal, openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;

  if (!selectedDish) return null;

  const photo = selectedDish.image || selectedDish.image_url;

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
        backgroundColor: 'rgba(17, 19, 22, 0.9)',
        backdropFilter: 'blur(10px)',
        animation: 'fadeIn 0.25s ease',
      }}
      onClick={closeDishModal}
    >
      <div
        style={{
          backgroundColor: '#1B1D22',
          borderRadius: '10px',
          maxWidth: '540px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 60px rgba(0,0,0,0.8), 0 0 20px rgba(255, 46, 136, 0.25)',
          border: '1px solid rgba(255, 46, 136, 0.4)',
          position: 'relative',
          padding: '0 0 2rem 0',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeDishModal}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            zIndex: 10,
            background: 'rgba(17, 19, 22, 0.75)',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#FFFFFF',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {photo && (
          <div style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
            <img
              src={photo}
              alt={selectedDish.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        <div style={{ padding: '1.75rem 2rem 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            {selectedDish.is_featured && (
              <span className="badge-tag" style={{ background: 'rgba(255, 46, 136, 0.2)', color: '#FF2E88', borderColor: '#FF2E88', border: '1px solid #FF2E88', padding: '3px 8px', borderRadius: '3px', fontSize: '0.75rem', fontWeight: 700 }}>
                ★ Street Icon
              </span>
            )}
            {selectedDish.spicy_level > 0 && (
              <span className="badge-tag" style={{ background: 'rgba(255, 89, 77, 0.2)', color: '#FF594D', borderColor: '#FF594D', border: '1px solid #FF594D', padding: '3px 8px', borderRadius: '3px', fontSize: '0.75rem', fontWeight: 700 }}>
                {selectedDish.spicy_level === 3 ? '🔥🔥🔥 Fire Buldak' : selectedDish.spicy_level === 2 ? '🌶️🌶️ Hot' : '🌶️ Mild'}
              </span>
            )}
          </div>

          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '1.8rem',
              color: '#F6F4F0',
              lineHeight: 1.15,
              marginBottom: '4px',
            }}
          >
            {selectedDish.name}
          </h3>

          {selectedDish.korean_name && (
            <div style={{ fontSize: '1.05rem', color: '#21D4E8', fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, marginBottom: '14px' }}>
              {selectedDish.korean_name}
            </div>
          )}

          <div
            style={{
              fontSize: '1.5rem',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              color: '#FFB347',
              marginBottom: '16px',
            }}
          >
            {selectedDish.price}
          </div>

          <p style={{ color: '#B6BAC2', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '20px' }}>
            {selectedDish.description || selectedDish.short_description}
          </p>

          {selectedDish.dietary_tags && (
            <div
              style={{
                backgroundColor: '#111316',
                padding: '12px 14px',
                borderRadius: '6px',
                border: '1px solid rgba(246, 244, 240, 0.12)',
                marginBottom: '24px',
                fontSize: '0.85rem',
                color: '#B6BAC2',
              }}
            >
              <strong style={{ color: '#F6F4F0', display: 'block', marginBottom: '2px', textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.08em' }}>
                Dietary Profile &amp; Serving Notes
              </strong>
              {selectedDish.dietary_tags}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => {
                closeDishModal();
                if (triggerReservation) triggerReservation();
              }}
              style={{
                flex: 1,
                backgroundColor: '#FF2E88',
                color: '#FFFFFF',
                border: 'none',
                padding: '12px',
                borderRadius: '4px',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Reserve Table For This Dish
            </button>
            <button
              onClick={closeDishModal}
              style={{
                backgroundColor: 'transparent',
                color: '#B6BAC2',
                border: '1px solid rgba(246, 244, 240, 0.2)',
                padding: '12px 18px',
                borderRadius: '4px',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

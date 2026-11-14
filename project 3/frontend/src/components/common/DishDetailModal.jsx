import React from 'react';
import { X, Sparkles, Wine, MapPin, CheckCircle } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';

export default function DishDetailModal() {
  const { selectedDish, setSelectedDish, setIsReservationModalOpen } = useCMS();

  if (!selectedDish) return null;

  const handleReserve = () => {
    setSelectedDish(null);
    setIsReservationModalOpen(true);
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedDish(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={() => setSelectedDish(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid #D8CCB8',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#174A63',
            zIndex: 10,
            cursor: 'pointer',
          }}
        >
          <X size={18} />
        </button>

        {/* Dish Image */}
        <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
          <img
            src={selectedDish.image_url || 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'}
            alt={selectedDish.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {selectedDish.is_signature && (
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '20px',
                background: '#174A63',
                color: '#FAF9F5',
                padding: '6px 14px',
                borderRadius: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                letterSpacing: '0.08em',
              }}
            >
              <Sparkles size={12} color="#D6A854" />
              <span>CHEF'S SIGNATURE</span>
            </div>
          )}
        </div>

        {/* Dish Body */}
        <div style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '1.8rem', color: '#174A63', lineHeight: 1.15 }}>
              {selectedDish.name}
            </h3>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                fontWeight: 600,
                color: '#174A63',
                marginLeft: '16px',
                whiteSpace: 'nowrap',
              }}
            >
              {selectedDish.currency_symbol || '€'}{selectedDish.price}
            </span>
          </div>

          <p style={{ fontSize: '1rem', fontStyle: 'italic', color: '#8C8981', marginBottom: '16px' }}>
            {selectedDish.english_name}
          </p>

          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#4A4E4D', marginBottom: '22px' }}>
            {selectedDish.description}
          </p>

          {/* Provenance & Wine Pairing Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '24px' }}>
            {selectedDish.origin && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#F7F4EC',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #E8D9C2',
                }}
              >
                <MapPin size={18} color="#367E94" />
                <div>
                  <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8C8981' }}>
                    Catch Provenance
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#174A63' }}>
                    {selectedDish.origin}
                  </span>
                </div>
              </div>
            )}

            {selectedDish.wine_pairing && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#F0F6F7',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: '1px solid #C9DDE0',
                }}
              >
                <Wine size={18} color="#B86E50" />
                <div>
                  <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8C8981' }}>
                    Sommelier Pairing
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#174A63' }}>
                    {selectedDish.wine_pairing}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Dietary Tags */}
          {selectedDish.dietary_tags && selectedDish.dietary_tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {selectedDish.dietary_tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    background: '#FAF9F5',
                    border: '1px solid #D8CCB8',
                    color: '#68765A',
                    padding: '4px 10px',
                    borderRadius: '12px',
                  }}
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid #EAE5D9' }}>
            <button
              onClick={() => setSelectedDish(null)}
              className="btn-secondary"
              style={{ padding: '10px 20px', fontSize: '0.85rem' }}
            >
              Close
            </button>
            <button
              onClick={handleReserve}
              className="btn-primary"
              style={{ padding: '10px 22px', fontSize: '0.85rem' }}
            >
              Reserve Table For This Dish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

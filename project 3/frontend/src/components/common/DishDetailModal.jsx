import React from 'react';
import { X, Sparkles, Wine, MapPin } from 'lucide-react';
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
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(197, 160, 89, 0.4)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#081721',
            zIndex: 10,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          }}
        >
          <X size={18} />
        </button>

        {/* Dish Image */}
        <div style={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
          <img
            src={selectedDish.image_url || 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'}
            alt={selectedDish.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {selectedDish.is_signature && (
            <div
              style={{
                position: 'absolute',
                bottom: '18px',
                left: '20px',
                background: 'rgba(8, 23, 33, 0.92)',
                backdropFilter: 'blur(8px)',
                color: '#DFBA73',
                border: '1px solid rgba(197, 160, 89, 0.5)',
                padding: '6px 16px',
                borderRadius: '30px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                letterSpacing: '0.1em',
                fontWeight: 600,
              }}
            >
              <Sparkles size={12} color="#C5A059" />
              <span>CHEF'S SIGNATURE</span>
            </div>
          )}
        </div>

        {/* Dish Body */}
        <div style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '1.95rem', color: '#081721', lineHeight: 1.15 }}>
              {selectedDish.name}
            </h3>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.95rem',
                fontWeight: 600,
                color: '#C5A059',
                marginLeft: '18px',
                whiteSpace: 'nowrap',
              }}
            >
              {selectedDish.currency_symbol || '€'}{selectedDish.price}
            </span>
          </div>

          <p style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#7A7E80', marginBottom: '18px' }}>
            {selectedDish.english_name}
          </p>

          <p style={{ fontSize: '1.02rem', lineHeight: 1.65, color: '#4A5255', marginBottom: '26px' }}>
            {selectedDish.description}
          </p>

          {/* Provenance & Wine Pairing Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px', marginBottom: '26px' }}>
            {selectedDish.origin && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  background: '#FAF8F4',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                }}
              >
                <MapPin size={20} color="#2A6F85" />
                <div>
                  <span style={{ display: 'block', fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7A7E80' }}>
                    Catch Provenance
                  </span>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#081721' }}>
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
                  gap: '14px',
                  background: '#F0F6F8',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1px solid #D5E5EB',
                }}
              >
                <Wine size={20} color="#B65A3D" />
                <div>
                  <span style={{ display: 'block', fontSize: '10px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7A7E80' }}>
                    Sommelier Pairing
                  </span>
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#081721' }}>
                    {selectedDish.wine_pairing}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Dietary Tags */}
          {selectedDish.dietary_tags && selectedDish.dietary_tags.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '26px' }}>
              {selectedDish.dietary_tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    background: '#FCFBF8',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    color: '#253B2F',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontWeight: 500,
                  }}
                >
                  ✓ {tag}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end', paddingTop: '18px', borderTop: '1px solid rgba(197, 160, 89, 0.25)' }}>
            <button
              onClick={() => setSelectedDish(null)}
              className="btn-ghost-luxe"
              style={{ padding: '12px 24px', fontSize: '0.85rem' }}
            >
              Close
            </button>
            <button
              onClick={handleReserve}
              className="btn-gold"
              style={{ padding: '12px 28px', fontSize: '0.85rem' }}
            >
              Reserve Table For This Dish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { X, Flame, Clock, Wine, Sparkles } from 'lucide-react';

export default function DishDetailModal() {
  const { selectedDish, setSelectedDish, setIsReservationModalOpen } = useCMS();

  if (!selectedDish) return null;

  const handleBookWithDish = () => {
    setSelectedDish(null);
    setIsReservationModalOpen(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 6, 8, 0.88)',
        backdropFilter: 'blur(16px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto'
      }}
      onClick={() => setSelectedDish(null)}
    >
      <div
        style={{
          backgroundColor: '#12141D',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '28px',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
          width: '100%',
          maxWidth: '680px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '90vh'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                color: '#CCFF00',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '999px',
                border: '1px solid rgba(204, 255, 0, 0.25)',
                textTransform: 'uppercase'
              }}
            >
              {selectedDish.category || 'POP SPECIAL'}
            </span>
            {selectedDish.is_featured && (
              <span
                style={{
                  backgroundColor: 'rgba(255, 51, 102, 0.12)',
                  color: '#FF6B8B',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255, 51, 102, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Sparkles size={11} /> CROWD PLEASER
              </span>
            )}
          </div>

          <button
            onClick={() => setSelectedDish(null)}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              color: '#9FA5B7',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ overflowY: 'auto', padding: '28px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Dish Image */}
          {(selectedDish.image_url || selectedDish.image) && (
            <div
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                maxHeight: '320px'
              }}
            >
              <img
                src={selectedDish.image_url || selectedDish.image}
                alt={selectedDish.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  backgroundColor: '#CCFF00',
                  color: '#0A0B0E',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '15px',
                  fontWeight: 800,
                  padding: '6px 14px',
                  borderRadius: '999px',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)'
                }}
              >
                ${typeof selectedDish.price === 'number' ? selectedDish.price.toFixed(2) : selectedDish.price}
              </div>
            </div>
          )}

          {/* Title & Tags */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '24px',
                fontWeight: 700,
                color: '#FFF',
                margin: 0,
                lineHeight: 1.2
              }}
            >
              {selectedDish.name}
            </h2>

            {selectedDish.dietary_tags && selectedDish.dietary_tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {selectedDish.dietary_tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      color: '#D4D4D8',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '999px',
                      padding: '3px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: 600
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14.5px',
              lineHeight: 1.65,
              color: '#9FA5B7',
              margin: 0
            }}
          >
            {selectedDish.description}
          </p>

          {/* Meta Specs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '16px',
              padding: '18px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ backgroundColor: 'rgba(255, 51, 102, 0.15)', color: '#FF3366', padding: '8px', borderRadius: '8px' }}>
                <Flame size={16} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#646A7E', textTransform: 'uppercase' }}>
                  Heat Scale
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', color: '#FFF' }}>
                  {selectedDish.spice_level ? `Level ${selectedDish.spice_level} of 3` : 'Mild / No Heat'}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ backgroundColor: 'rgba(0, 102, 255, 0.15)', color: '#0066FF', padding: '8px', borderRadius: '8px' }}>
                <Clock size={16} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#646A7E', textTransform: 'uppercase' }}>
                  Prep Speed
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', color: '#FFF' }}>
                  {selectedDish.prep_time || '8-12 mins'}
                </div>
              </div>
            </div>

            {selectedDish.pairing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', gridColumn: 'span 2' }}>
                <div style={{ backgroundColor: 'rgba(204, 255, 0, 0.15)', color: '#CCFF00', padding: '8px', borderRadius: '8px' }}>
                  <Wine size={16} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#646A7E', textTransform: 'uppercase' }}>
                    Recommended Beverage Pairing
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px', color: '#FFF' }}>
                    {selectedDish.pairing}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '18px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px'
          }}
        >
          <button
            onClick={() => setSelectedDish(null)}
            style={{
              padding: '10px 18px',
              backgroundColor: 'transparent',
              color: '#9FA5B7',
              borderRadius: '999px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            DISMISS
          </button>

          <button
            onClick={handleBookWithDish}
            style={{
              padding: '12px 24px',
              backgroundColor: '#CCFF00',
              color: '#0A0B0E',
              borderRadius: '999px',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(204, 255, 0, 0.35)'
            }}
          >
            BOOK TABLE FOR THIS DISH &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

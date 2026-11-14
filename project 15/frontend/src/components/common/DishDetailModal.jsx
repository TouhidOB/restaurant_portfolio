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
        backgroundColor: 'rgba(23, 23, 23, 0.85)',
        backdropFilter: 'blur(8px)',
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
          backgroundColor: '#FFF5E6',
          border: '4px solid #171717',
          borderRadius: '24px',
          boxShadow: '12px 12px 0px #171717',
          width: '100%',
          maxWidth: '720px',
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
            backgroundColor: '#FFD928',
            borderBottom: '4px solid #171717',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                backgroundColor: '#F04438',
                color: '#FFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '4px 8px',
                borderRadius: '6px',
                border: '2px solid #171717',
                textTransform: 'uppercase'
              }}
            >
              {selectedDish.category || 'POP SPECIAL'}
            </span>
            {selectedDish.is_featured && (
              <span
                style={{
                  backgroundColor: '#2455D6',
                  color: '#FFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '4px 8px',
                  borderRadius: '6px',
                  border: '2px solid #171717',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Sparkles size={12} /> CROWD FAVORITE
              </span>
            )}
          </div>

          <button
            onClick={() => setSelectedDish(null)}
            style={{
              backgroundColor: '#FFF',
              border: '2px solid #171717',
              borderRadius: '8px',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '2px 2px 0 #171717'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div style={{ overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Dish Image */}
          {selectedDish.image_url && (
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                border: '3px solid #171717',
                overflow: 'hidden',
                boxShadow: '6px 6px 0px #171717',
                maxHeight: '300px'
              }}
            >
              <img
                src={selectedDish.image_url}
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
                  bottom: '12px',
                  right: '12px',
                  backgroundColor: '#F04438',
                  color: '#FFF',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  border: '2px solid #171717',
                  boxShadow: '3px 3px 0 #171717'
                }}
              >
                ${typeof selectedDish.price === 'number' ? selectedDish.price.toFixed(2) : selectedDish.price}
              </div>
            </div>
          )}

          {/* Title and Tags */}
          <div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                color: '#171717',
                margin: 0,
                lineHeight: 1.2
              }}
            >
              {selectedDish.name}
            </h2>

            {selectedDish.dietary_tags && selectedDish.dietary_tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
                {selectedDish.dietary_tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: '#FFD928',
                      color: '#171717',
                      border: '2px solid #171717',
                      borderRadius: '999px',
                      padding: '3px 10px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700
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
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: '#333333',
              margin: 0
            }}
          >
            {selectedDish.description}
          </p>

          {/* Meta Specifications */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              backgroundColor: '#FFF',
              border: '2px solid #171717',
              borderRadius: '12px',
              padding: '16px',
              boxShadow: '3px 3px 0 #171717'
            }}
          >
            {/* Spice Level */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  backgroundColor: '#F04438',
                  color: '#FFF',
                  padding: '6px',
                  borderRadius: '6px',
                  border: '1px solid #171717'
                }}
              >
                <Flame size={16} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666', textTransform: 'uppercase' }}>
                  Heat Scale
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem' }}>
                  {selectedDish.spice_level ? `Level ${selectedDish.spice_level} of 3` : 'Mild / No Heat'}
                </div>
              </div>
            </div>

            {/* Prep Time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  backgroundColor: '#2455D6',
                  color: '#FFF',
                  padding: '6px',
                  borderRadius: '6px',
                  border: '1px solid #171717'
                }}
              >
                <Clock size={16} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666', textTransform: 'uppercase' }}>
                  Prep Speed
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem' }}>
                  {selectedDish.prep_time || '8-12 mins'}
                </div>
              </div>
            </div>

            {/* Pairing */}
            {selectedDish.pairing && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', gridColumn: 'span 2' }}>
                <div
                  style={{
                    backgroundColor: '#00C389',
                    color: '#FFF',
                    padding: '6px',
                    borderRadius: '6px',
                    border: '1px solid #171717'
                  }}
                >
                  <Wine size={16} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666', textTransform: 'uppercase' }}>
                    Recommended Sip
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9rem' }}>
                    {selectedDish.pairing}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer CTAs */}
        <div
          style={{
            backgroundColor: '#FFF5E6',
            borderTop: '3px solid #171717',
            padding: '16px 24px',
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
              backgroundColor: '#FFF',
              border: '2px solid #171717',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            BACK TO MENU
          </button>

          <button
            onClick={handleBookWithDish}
            style={{
              padding: '10px 24px',
              backgroundColor: '#F04438',
              color: '#FFF',
              border: '2px solid #171717',
              borderRadius: '8px',
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              boxShadow: '4px 4px 0 #171717',
              cursor: 'pointer',
              letterSpacing: '0.5px'
            }}
          >
            BOOK TABLE FOR THIS DISH!
          </button>
        </div>
      </div>
    </div>
  );
}

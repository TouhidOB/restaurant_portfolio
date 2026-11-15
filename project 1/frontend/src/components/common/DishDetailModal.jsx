import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { X, Calendar, Sparkles, Clock, Flame, Star, ShieldCheck } from 'lucide-react';

export default function DishDetailModal() {
  const { selectedDish, closeDish, openReservation, config } = useCMS();

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

  const currency = config?.currency || '৳';
  const itemImg =
    selectedDish.resolved_image ||
    selectedDish.image_url ||
    selectedDish.image ||
    'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop';

  const handleBookTable = () => {
    closeDish();
    openReservation(selectedDish.name);
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
        backgroundColor: 'rgba(18, 59, 53, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      onClick={closeDish}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '840px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#0D0F10',
          border: '1px solid #D6B879',
          borderRadius: '4px',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(214, 184, 121, 0.15)',
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
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(18, 59, 53, 0.9)',
            border: '1px solid #D6B879',
            color: '#D6B879',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#D6B879';
            e.currentTarget.style.color = '#123B35';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(18, 59, 53, 0.9)';
            e.currentTarget.style.color = '#D6B879';
          }}
        >
          <X size={18} />
        </button>

        {/* Dish Image */}
        <div
          style={{
            position: 'relative',
            minHeight: '320px',
            overflow: 'hidden',
            backgroundColor: '#123B35',
          }}
        >
          <img
            src={itemImg}
            alt={selectedDish.name}
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop';
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
              background: 'linear-gradient(to top, rgba(13, 15, 16, 0.85) 0%, transparent 50%)',
            }}
          />
          {selectedDish.tag && (
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                backgroundColor: 'rgba(18, 59, 53, 0.92)',
                border: '1px solid #D6B879',
                color: '#D6B879',
                padding: '4px 12px',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontWeight: 600,
              }}
            >
              ★ {selectedDish.tag}
            </div>
          )}
        </div>

        {/* Dish Information */}
        <div
          style={{
            padding: '2.5rem 2rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: '#F3EDE1',
          }}
        >
          <div>
            {/* Category & Dietary */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  color: '#D6B879',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {selectedDish.category || 'HAUTE CUISINE'}
              </span>
              {selectedDish.dietary && (
                <>
                  <span style={{ color: 'rgba(214, 184, 121, 0.5)' }}>•</span>
                  <span
                    style={{
                      fontSize: '11px',
                      backgroundColor: 'rgba(214, 184, 121, 0.12)',
                      border: '1px solid rgba(214, 184, 121, 0.3)',
                      color: '#E8D3A2',
                      padding: '2px 8px',
                      borderRadius: '2px',
                    }}
                  >
                    {selectedDish.dietary}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                color: '#D6B879',
                lineHeight: 1.2,
                marginBottom: '1rem',
              }}
            >
              {selectedDish.name}
            </h2>

            {/* Price */}
            <div
              style={{
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '1.25rem',
              }}
            >
              {currency}{Number(selectedDish.price || 0).toLocaleString()}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                color: 'rgba(243, 237, 225, 0.8)',
                marginBottom: '1.5rem',
              }}
            >
              {selectedDish.description}
            </p>

            {/* Dish Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                padding: '12px 14px',
                backgroundColor: 'rgba(18, 59, 53, 0.35)',
                border: '1px solid rgba(214, 184, 121, 0.25)',
                borderRadius: '2px',
                marginBottom: '2rem',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#D6B879', fontSize: '11px', marginBottom: '4px' }}>
                  <Star size={13} fill="#D6B879" /> RATING
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>
                  {selectedDish.rating || 5.0} / 5.0
                </div>
              </div>

              <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(214, 184, 121, 0.2)', borderRight: '1px solid rgba(214, 184, 121, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#D6B879', fontSize: '11px', marginBottom: '4px' }}>
                  <Clock size={13} /> PREP
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>
                  {selectedDish.prepTime || '18 mins'}
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#D6B879', fontSize: '11px', marginBottom: '4px' }}>
                  <Flame size={13} /> ENERGY
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>
                  {selectedDish.calories || '550 kcal'}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={handleBookTable}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: '#123B35',
                color: '#D6B879',
                border: '1px solid #D6B879',
                borderRadius: '2px',
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D6B879';
                e.currentTarget.style.color = '#123B35';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#123B35';
                e.currentTarget.style.color = '#D6B879';
              }}
            >
              <Calendar size={15} />
              RESERVE A TABLE FOR THIS DISH
            </button>

            <button
              onClick={closeDish}
              style={{
                width: '100%',
                padding: '10px',
                background: 'transparent',
                color: 'rgba(243, 237, 225, 0.6)',
                border: 'none',
                fontSize: '12px',
                letterSpacing: '0.08em',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D6B879')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(243, 237, 225, 0.6)')}
            >
              Back to Menu Repertoire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

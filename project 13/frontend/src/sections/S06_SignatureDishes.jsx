import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S06_SignatureDishes() {
  const { content, openDishModal, openReservationModal } = useCMS();
  const sigData = content?.editorial_sections?.s06_signature || {
    badge: "CROWD FAVORITES",
    title: "Seoul Street Food Icons",
    description: "The quintessential street dishes that define contemporary Korean night culture."
  };

  const signatureDishes = content.signature_dishes || [];

  return (
    <section id="signatures" className="editorial-section" style={{ backgroundColor: '#0C0E11' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {sigData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: '#F6F4F0',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {sigData.title}
          </h2>
          <p style={{ color: 'var(--color-silver)', fontSize: '1rem', lineHeight: 1.7 }}>
            {sigData.description}
          </p>
        </div>

        {/* Dishes Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
            marginBottom: '3.5rem',
          }}
        >
          {signatureDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => openDishModal(dish)}
              style={{
                backgroundColor: 'var(--color-charcoal)',
                borderRadius: '12px',
                padding: '32px 28px',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--color-magenta)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(255, 46, 136, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span className="badge-tag" style={{ background: 'rgba(255, 46, 136, 0.15)', color: 'var(--color-magenta)', borderColor: 'rgba(255, 46, 136, 0.4)' }}>
                    ★ Signature
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      color: 'var(--color-amber)',
                    }}
                  >
                    {dish.price}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.45rem',
                    color: '#FFFFFF',
                    marginBottom: '4px',
                    lineHeight: 1.2,
                  }}
                >
                  {dish.name}
                </h3>

                {dish.korean_name && (
                  <div style={{ fontSize: '0.95rem', color: 'var(--color-cyan)', fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700, marginBottom: '14px' }}>
                    {dish.korean_name}
                  </div>
                )}

                <p style={{ color: 'var(--color-silver)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '18px' }}>
                  {dish.short_description || dish.description}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-magenta)', fontWeight: 700, fontFamily: 'var(--font-condensed)' }}>
                    View Dish Profile &rarr;
                  </span>
                  {dish.spicy_level > 0 && (
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-coral)', fontWeight: 700 }}>
                      {dish.spicy_level === 3 ? '🔥🔥🔥 Fire' : dish.spicy_level === 2 ? '🌶️🌶️ Hot' : '🌶️ Mild'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center' }}>
          <button onClick={openReservationModal} className="btn-primary" style={{ padding: '1rem 2.8rem' }}>
            Book a Table For Tonight's Feast &rarr;
          </button>
        </div>

      </div>
    </section>
  );
}

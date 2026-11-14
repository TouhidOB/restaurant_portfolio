import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S06_SignatureDishes() {
  const { content, openDishModal, openReservationModal } = useCMS();
  const sigData = content?.editorial_sections?.s06_signature || {
    badge: "CHEF'S MASTERPIECES",
    title: "Signature Culinary Creations",
    description: "Iconic dishes conceived by Executive Chef Marco Valenti, embodying the raw essence and modern refinement of the Mediterranean."
  };

  const signatureDishes = content.signature_dishes || [];

  return (
    <section id="signatures" className="editorial-section" style={{ backgroundColor: 'var(--c-limestone-light)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {sigData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: 'var(--c-navy)',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {sigData.title}
          </h2>
          <p style={{ color: '#595752', fontSize: '1rem', lineHeight: 1.7 }}>
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
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '32px 28px',
                border: '1px solid var(--c-border)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 18px 45px rgba(38, 58, 72, 0.08)';
                e.currentTarget.style.borderColor = 'var(--c-terracotta)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--c-border)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span className="badge-tag" style={{ background: '#FDE8CD', color: '#9D5B3E', borderColor: '#DECDB8' }}>
                    ⭐ Signature
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.45rem',
                      fontWeight: 700,
                      color: 'var(--c-navy)',
                    }}
                  >
                    {dish.price}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.45rem',
                    color: 'var(--c-navy)',
                    marginBottom: '4px',
                    lineHeight: 1.2,
                  }}
                >
                  {dish.name}
                </h3>

                {dish.subtitle && (
                  <div style={{ fontSize: '0.82rem', color: 'var(--c-terracotta)', fontWeight: 600, marginBottom: '14px' }}>
                    {dish.subtitle}
                  </div>
                )}

                <p style={{ color: '#595752', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: '18px' }}>
                  {dish.description}
                </p>
              </div>

              <div>
                {dish.pairing_notes && (
                  <div style={{ fontSize: '0.8rem', color: '#596448', fontStyle: 'italic', borderTop: '1px solid var(--c-border-light)', paddingTop: '12px', marginBottom: '12px' }}>
                    🍷 {dish.pairing_notes}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px' }}>
                  <span style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-terracotta)', fontWeight: 700 }}>
                    View Dish Profile &rarr;
                  </span>
                  {dish.dietary_tags && (
                    <span style={{ fontSize: '0.75rem', color: '#8C847B' }}>
                      {dish.dietary_tags}
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
            Book a Signature Tasting Experience &rarr;
          </button>
        </div>

      </div>
    </section>
  );
}

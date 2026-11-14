import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S06SignatureDishes() {
  const { content, setSelectedDish } = useCMS();
  const sig = content?.signatureDishes || {};
  const dishes = sig.dishes || [];

  return (
    <section id="signatures" className="py-section" style={{ backgroundColor: 'var(--color-graphite)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="section-label">{sig.subtitle || 'Raw Flavor • Open Flame'}</span>
          <h2 className="section-title">{sig.title || 'Signature Dishes Showcase'}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Wood-smoked cuts, hearth-blistered sourdough, and cast-iron classics fired over kiln-dried hardwood embers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
          {dishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              style={{
                backgroundColor: 'var(--color-black-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.5)';
                e.currentTarget.style.borderColor = 'var(--color-copper)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              {dish.image && (
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                  />
                  {dish.dietary && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'rgba(17, 19, 20, 0.9)',
                        border: '1px solid var(--color-copper)',
                        color: 'var(--color-copper)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '2px',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontWeight: 800,
                      }}
                    >
                      {dish.dietary}
                    </span>
                  )}
                </div>
              )}

              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-offwhite)', textTransform: 'uppercase' }}>
                    {dish.name}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-copper)', fontWeight: 700, marginLeft: '0.5rem' }}>
                    {dish.price}
                  </span>
                </div>

                <p style={{ color: 'var(--color-concrete)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '1.25rem', flex: 1 }}>
                  {dish.description}
                </p>

                {dish.pairing && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem', fontSize: '0.8rem', color: 'var(--color-copper)' }}>
                    <span>🍺 {dish.pairing}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

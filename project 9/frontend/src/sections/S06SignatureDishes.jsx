import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S06SignatureDishes() {
  const { content, setSelectedDish } = useCMS();
  const sig = content?.signatureDishes || {};
  const dishes = sig.dishes || [];

  return (
    <section id="dishes" className="section-pad" style={{ backgroundColor: 'var(--color-midnight-dark)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">{sig.subtitle || 'Crafted By Master Chefs at 220 Meters'}</span>
          <h2 className="section-title">{sig.title || 'Signature Skyline Culinary Creations'}</h2>
          <div className="horizon-divider horizon-divider-center" />
          <p className="section-subtitle">
            Hover over any dish plate to explore the ingredients, culinary technique, and wine pairing recommendations.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {dishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              style={{
                background: 'var(--color-midnight)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Dish Photo */}
              <div style={{ height: '240px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(16, 28, 44, 0.85)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid var(--color-border)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '2px',
                    fontSize: '0.72rem',
                    color: 'var(--color-champagne)',
                    fontFamily: 'var(--font-accent)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {dish.badge || 'Signature'}
                </span>
              </div>

              {/* Dish Info */}
              <div style={{ padding: '1.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.65rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-cloud-ivory)' }}>
                    {dish.name}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-champagne)', fontWeight: 600 }}>
                    {dish.price}
                  </span>
                </div>

                <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  {dish.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-sunset-copper)', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    {dish.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-champagne)', fontWeight: 700 }}>
                    View Creation &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

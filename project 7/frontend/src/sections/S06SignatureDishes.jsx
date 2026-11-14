import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S06SignatureDishes() {
  const { content, setSelectedDish } = useCMS();
  const sig = content?.signature_dishes || {};
  const dishes = sig.dishes || [];

  return (
    <section id="signatures" className="py-section" style={{ backgroundColor: '#18191B', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="section-label">{sig.subtitle || 'Les Joyaux de la Carte'}</span>
          <h2 className="section-title">{sig.title || 'Créations Emblématiques'}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Des compositions d'auteur sculptées autour de produits d'exception, alliant rigueur des sauces et vivacité contemporaine.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
          {dishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              style={{
                backgroundColor: '#202124',
                border: '1px solid rgba(197, 164, 109, 0.28)',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.45)';
                e.currentTarget.style.borderColor = 'var(--color-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(197, 164, 109, 0.28)';
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
                  {dish.tag && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'rgba(32, 33, 36, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid var(--color-gold)',
                        color: 'var(--color-gold-light)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '3px',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      {dish.tag}
                    </span>
                  )}
                </div>
              )}

              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-ivory)', fontWeight: 500 }}>
                    {dish.name}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-gold)', fontWeight: 600, marginLeft: '0.5rem' }}>
                    {dish.price}
                  </span>
                </div>

                {dish.french_name && (
                  <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--color-taupe)', fontSize: '0.92rem', marginBottom: '0.85rem' }}>
                    {dish.french_name}
                  </div>
                )}

                <p style={{ color: 'var(--color-ivory-dim)', fontSize: '0.88rem', lineHeight: '1.65', marginBottom: '1.25rem', flex: 1 }}>
                  {dish.description}
                </p>

                {dish.wine_pairing && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.75rem', fontSize: '0.8rem', color: 'var(--color-gold)' }}>
                    <span>🍷 {dish.wine_pairing}</span>
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

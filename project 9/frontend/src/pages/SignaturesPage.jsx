import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SignaturesPage() {
  const { content, openReservation, setSelectedDish } = useCMS();
  const sig = content?.signatureDishes || {};
  const dishes = sig.dishes || [];

  return (
    <div style={{ backgroundColor: 'var(--color-midnight-dark, #0a121d)', color: 'var(--color-cloud-ivory, #F3F0E9)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 90, 0.45) 0%, var(--color-midnight-dark, #0a121d) 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">{sig.subtitle || 'Crafted By Master Chefs at 220 Meters'}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', letterSpacing: '0.04em', color: 'var(--color-champagne)', margin: '0.8rem 0 1.25rem' }}>
            {sig.title || 'Signature Skyline Culinary Creations'}
          </h1>
          <div className="horizon-divider horizon-divider-center" />
          <p style={{ color: 'var(--color-twilight-slate)', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            A showcase of culinary pinnacle: A5 Miyazaki Wagyu, Glacier Seabass, and Oscietra Caviar paired with vintage cellar selections.
          </p>
        </div>
      </div>

      {/* Grid of Signatures */}
      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {dishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              style={{
                backgroundColor: 'var(--color-midnight-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {dish.image && (
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(16, 28, 44, 0.95) 0%, transparent 60%)',
                    }}
                  />
                  {dish.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: 'rgba(16, 28, 44, 0.85)',
                        border: '1px solid var(--color-champagne)',
                        color: 'var(--color-champagne)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '20px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {dish.badge}
                    </span>
                  )}
                  {dish.price && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        backgroundColor: 'var(--color-champagne)',
                        color: 'var(--color-midnight-dark)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 800,
                        fontFamily: 'var(--font-accent)',
                      }}
                    >
                      {dish.price}
                    </span>
                  )}
                </div>
              )}

              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span className="section-label" style={{ fontSize: '0.72rem', marginBottom: '0.4rem' }}>
                  {dish.category || 'CHEF SELECTION'}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-cloud-ivory)', marginBottom: '0.75rem' }}>
                  {dish.name}
                </h3>
                <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.9rem', lineHeight: 1.6, flexGrow: 1, marginBottom: '1.25rem' }}>
                  {dish.description}
                </p>

                {dish.ingredients && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    {dish.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.2rem 0.5rem',
                          background: 'rgba(38, 63, 90, 0.3)',
                          border: '1px solid var(--color-border-subtle)',
                          borderRadius: '3px',
                          color: 'var(--color-champagne)',
                        }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-champagne)', fontWeight: 600 }}>
                    Click for Chef Notes &rarr;
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openReservation();
                    }}
                    className="btn-skyline-primary"
                    style={{ padding: '0.4rem 1rem', fontSize: '0.75rem' }}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <button onClick={() => openReservation()} className="btn-skyline-primary" style={{ padding: '0.9rem 2.5rem' }}>
            Experience All Signatures at Level 54 &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

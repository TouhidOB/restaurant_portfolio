import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SignaturesPage() {
  const { content, openReservation, setSelectedDish } = useCMS();
  const signatures = content?.signatureDishes || {};
  const dishes = signatures.dishes || [];

  return (
    <div style={{ backgroundColor: '#111314', color: 'var(--color-offwhite, #F1EEE7)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(145, 77, 55, 0.4) 0%, #111314 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '2px solid var(--color-brick, #914D37)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">{signatures.subtitle || 'Raw Flavor • Open Flame'}</span>
          <h1 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '3.5rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
            {signatures.title || 'Signature Dishes Showcase'}
          </h1>
          <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1.15rem', lineHeight: '1.7' }}>
            Four definitive expressions of smoke, cured wood, and screaming iron that have defined the culinary ethos of URBAN TABLE.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem' }}>
          {dishes.map((dish, idx) => (
            <div
              key={dish.id || idx}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '3.5rem',
                alignItems: 'center',
                backgroundColor: 'var(--color-black-card, #181A1C)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '2px',
                padding: '2.5rem',
              }}
            >
              <div style={{ order: idx % 2 === 1 ? 2 : 1 }}>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(184, 115, 69, 0.2)',
                    color: 'var(--color-copper, #B87345)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: 800,
                    padding: '0.3rem 0.75rem',
                    borderRadius: '2px',
                    border: '1px solid var(--color-copper, #B87345)',
                    marginBottom: '1rem',
                  }}
                >
                  {dish.category || 'Wood Hearth'}
                </span>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2rem', textTransform: 'uppercase', color: 'var(--color-offwhite, #F1EEE7)' }}>
                    {dish.name}
                  </h3>
                  <span style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2rem', color: 'var(--color-copper, #B87345)', fontWeight: 700, marginLeft: '1rem' }}>
                    {dish.price}
                  </span>
                </div>

                <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
                  {dish.description}
                </p>

                {dish.pairing && (
                  <div style={{ background: 'var(--color-graphite, #252729)', padding: '0.85rem 1.25rem', borderRadius: '2px', border: '1px solid var(--color-border, #3a3d40)', marginBottom: '1.5rem', fontSize: '0.88rem', color: 'var(--color-amber, #E9A24B)' }}>
                    🍺 <strong>Recommended Pairing:</strong> {dish.pairing}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <button
                    onClick={() => setSelectedDish(dish)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--color-copper, #B87345)',
                      color: 'var(--color-copper, #B87345)',
                      padding: '0.75rem 1.5rem',
                      fontFamily: 'var(--font-body, Manrope)',
                      fontWeight: 700,
                      borderRadius: '2px',
                      cursor: 'pointer',
                    }}
                  >
                    Inspect Dish Details
                  </button>
                  <button
                    onClick={() => openReservation(dish.name)}
                    className="btn-primary"
                    style={{ padding: '0.75rem 1.5rem' }}
                  >
                    Reserve To Taste
                  </button>
                </div>
              </div>

              <div style={{ order: idx % 2 === 1 ? 1 : 2 }}>
                <div
                  style={{
                    borderRadius: '2px',
                    overflow: 'hidden',
                    border: '2px solid var(--color-brick, #914D37)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedDish(dish)}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{ width: '100%', height: '380px', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

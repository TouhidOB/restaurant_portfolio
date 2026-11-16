import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SignaturesPage({ onNavigate }) {
  const { content, openReservation, setSelectedDish } = useCMS();
  const sig = content?.signature_drinks || {};
  const drinks = sig.drinks || [];

  return (
    <div style={{ backgroundColor: '#1A2B24', color: '#F4F0E6', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 53, 0.45) 0%, #1A2B24 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(166, 181, 160, 0.25)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#A87958',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {sig.subtitle || 'BOTANICAL CRAFT & SENSORY RITUALS'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: '3.5rem',
              letterSpacing: '0.04em',
              color: '#F4F0E6',
              margin: '0.8rem 0 1.25rem',
            }}
          >
            {sig.title || 'Signature Beverages & Coffee Creations'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#A87958', margin: '1rem auto' }} />
          <p style={{ color: '#D8D2C5', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            Artisanal single-origin espresso paired with in-house botanical distillations, wild elderflower mist, and smoked rosemary.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {drinks.map((dish, idx) => {
            const name = dish.name;
            const desc = dish.description;
            const price = dish.price || '$7.50';
            const img = dish.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85';

            return (
              <div
                key={dish.id || idx}
                onClick={() => setSelectedDish(dish)}
                style={{
                  backgroundColor: '#1E332B',
                  borderRadius: '4px',
                  border: '1px solid rgba(166, 181, 160, 0.25)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, border-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = '#A87958';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(166, 181, 160, 0.25)';
                }}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={img}
                    alt={name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {dish.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#A87958',
                        color: '#F4F0E6',
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        borderRadius: '2px',
                      }}
                    >
                      {dish.badge}
                    </span>
                  )}
                  {price && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '12px',
                        backgroundColor: 'rgba(26, 43, 36, 0.92)',
                        color: '#A6B5A0',
                        padding: '4px 12px',
                        fontSize: '0.88rem',
                        fontWeight: 800,
                        borderRadius: '2px',
                        border: '1px solid rgba(166, 181, 160, 0.3)',
                      }}
                    >
                      {price}
                    </span>
                  )}
                </div>

                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display, "Cormorant Garamond")',
                      fontSize: '1.45rem',
                      color: '#F4F0E6',
                      fontWeight: 600,
                      lineHeight: 1.25,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {name}
                  </h3>

                  <p style={{ color: '#D8D2C5', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem', flex: 1 }}>
                    {desc}
                  </p>

                  {dish.ingredients && Array.isArray(dish.ingredients) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(166, 181, 160, 0.15)' }}>
                      {dish.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.72rem',
                            padding: '2px 8px',
                            backgroundColor: 'rgba(38, 63, 53, 0.5)',
                            color: '#A6B5A0',
                            borderRadius: '2px',
                            border: '1px solid rgba(166, 181, 160, 0.2)',
                          }}
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div
          style={{
            margin: '5rem auto 2rem',
            textAlign: 'center',
            padding: '3rem 2rem',
            backgroundColor: '#1E332B',
            borderRadius: '4px',
            border: '1px solid rgba(166, 181, 160, 0.3)',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: '2.2rem',
              color: '#F4F0E6',
              marginBottom: '1rem',
            }}
          >
            Experience Our Botanical Glasshouse Cupping Rituals
          </h2>
          <p style={{ color: '#D8D2C5', maxWidth: '650px', margin: '0 auto 2rem', fontSize: '1.02rem', lineHeight: 1.7 }}>
            Reserve an unhurried table beneath towering royal palms or in our elevated Orangerie Mezzanine.
          </p>
          <button
            onClick={() => openReservation()}
            style={{
              backgroundColor: '#A87958',
              color: '#F4F0E6',
              border: 'none',
              padding: '1rem 2.5rem',
              fontSize: '0.9rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#8f6445')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#A87958')}
          >
            Reserve an Atrium Table
          </button>
        </div>
      </div>
    </div>
  );
}

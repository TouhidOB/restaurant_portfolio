import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S06_SignatureDrinks() {
  const { content, setSelectedDish } = useCMS();
  const sig = content?.signature_drinks || {};
  const drinks = sig.drinks || [];

  return (
    <section
      id="drinks"
      aria-label="Signature Botanical Drinks & Coffee Creations"
      style={{
        padding: '120px 0',
        backgroundColor: '#FAF7F0',
        color: '#292D29',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-copper, #A87958)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {sig.subtitle || 'BOTANICAL CRAFT'}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: 'var(--color-forest)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {sig.title || 'Signature Beverages & Coffee Creations'}
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
          }}
        >
          {drinks.map((drink, idx) => (
            <div
              key={drink.id || idx}
              onClick={() => setSelectedDish(drink)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '3px',
                border: '1px solid rgba(38, 63, 53, 0.15)',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                boxShadow: '0 6px 20px rgba(38, 63, 53, 0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 16px 35px rgba(38, 63, 53, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(38, 63, 53, 0.05)';
              }}
            >
              {/* Photo */}
              {drink.image && (
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={drink.image}
                    alt={drink.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                  {drink.badge && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: 'var(--color-copper)',
                        color: '#FFFFFF',
                        padding: '4px 10px',
                        fontSize: '10px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        borderRadius: '2px',
                      }}
                    >
                      {drink.badge}
                    </span>
                  )}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      backgroundColor: 'rgba(26, 43, 36, 0.88)',
                      color: '#FAF7F0',
                      padding: '4px 10px',
                      fontSize: '13px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                      borderRadius: '2px',
                    }}
                  >
                    {drink.price}
                  </span>
                </div>
              )}

              {/* Content */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-olive)',
                    fontWeight: 600,
                    marginBottom: '6px',
                  }}
                >
                  {drink.category}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '21px',
                    fontWeight: 600,
                    color: 'var(--color-forest)',
                    lineHeight: 1.25,
                    marginBottom: '10px',
                  }}
                >
                  {drink.name}
                </h3>

                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.65,
                    color: 'rgba(41, 45, 41, 0.8)',
                    marginBottom: '16px',
                    flex: 1,
                  }}
                >
                  {drink.description}
                </p>

                {drink.ingredients && drink.ingredients.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
                    {drink.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '10.5px',
                          padding: '2px 7px',
                          backgroundColor: 'rgba(166, 181, 160, 0.25)',
                          color: 'var(--color-forest)',
                          borderRadius: '2px',
                        }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(38, 63, 53, 0.12)',
                    paddingTop: '12px',
                    fontSize: '11.5px',
                    color: 'var(--color-copper)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  <span>Botanical Profile</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

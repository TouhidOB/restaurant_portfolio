import React from 'react';

export default function S05DiningPhilosophy({ pillars }) {
  if (!pillars || pillars.length === 0) return null;

  return (
    <section
      id="pillars"
      style={{
        padding: 'var(--section-spacing) 0',
        backgroundColor: '#EBE7DC',
      }}
    >
      <div className="zen-container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 64px' }}>
          <div className="zen-eyebrow" style={{ justifyContent: 'center' }}>
            CULINARY DISCIPLINE
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
            Three Core Principles of Dining
          </h2>
          <p className="font-jp" style={{ fontSize: '15px', color: 'var(--color-moss)' }}>
            調和を生み出す三つの柱
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                transition: 'all 0.3s ease',
              }}
            >
              {pillar.image && (
                <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                  />
                </div>
              )}

              <div style={{ padding: '32px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', letterSpacing: '0.2em', color: 'var(--color-bamboo)', fontWeight: 700 }}>
                    PILLAR {pillar.number}
                  </span>
                  {pillar.japaneseSubtitle && (
                    <span className="font-jp" style={{ fontSize: '13px', color: 'var(--color-stone)' }}>
                      {pillar.japaneseSubtitle}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '24px', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                  {pillar.title}
                </h3>

                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-moss)', marginBottom: '14px' }}>
                  {pillar.lead}
                </div>

                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-charcoal)', opacity: 0.85, marginTop: 'auto' }}>
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

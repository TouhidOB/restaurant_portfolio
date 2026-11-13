import React from 'react';

export default function S03Philosophy({ philosophyData, onOpenReservation }) {
  if (!philosophyData) return null;

  return (
    <section
      id="philosophy"
      style={{
        padding: 'var(--section-spacing) 0',
        backgroundColor: 'var(--color-rice-paper)',
      }}
    >
      <div className="zen-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Left Narrative Column */}
          <div>
            <div className="zen-eyebrow">
              {philosophyData.eyebrow}
            </div>

            <h2
              style={{
                fontSize: 'clamp(34px, 5vw, var(--section-heading-size))',
                color: 'var(--color-charcoal)',
                marginBottom: '10px',
                lineHeight: 1.15,
              }}
            >
              {philosophyData.title}
            </h2>

            {philosophyData.japaneseSubtitle && (
              <div
                className="font-jp"
                style={{
                  fontSize: '16px',
                  color: 'var(--color-moss)',
                  letterSpacing: '0.15em',
                  marginBottom: '28px',
                }}
              >
                {philosophyData.japaneseSubtitle}
              </div>
            )}

            <p
              style={{
                fontSize: '18px',
                lineHeight: 1.8,
                color: 'var(--color-charcoal)',
                fontWeight: 500,
                marginBottom: '20px',
              }}
            >
              {philosophyData.lead}
            </p>

            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.8,
                color: 'var(--color-charcoal)',
                opacity: 0.85,
                marginBottom: '28px',
              }}
            >
              {philosophyData.description}
            </p>

            {philosophyData.secondaryStatement && (
              <blockquote
                style={{
                  padding: '16px 20px',
                  backgroundColor: '#FFFFFF',
                  borderLeft: '3px solid var(--color-bamboo)',
                  fontStyle: 'italic',
                  fontSize: '14px',
                  color: 'var(--color-charcoal)',
                  marginBottom: '32px',
                }}
              >
                "{philosophyData.secondaryStatement}"
              </blockquote>
            )}

            <button
              onClick={onOpenReservation}
              className="btn-zen btn-zen-outline"
            >
              {philosophyData.cta || 'Reserve Your Table'}
            </button>
          </div>

          {/* Right Visual Frame Column */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '2px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(32, 35, 33, 0.1)',
                border: '1px solid var(--color-border)',
              }}
            >
              <img
                src={philosophyData.image}
                alt="Philosophy of Zen Simplicity"
                style={{
                  width: '100%',
                  height: '520px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Corner Decorative Vermilion Accent */}
            <div
              style={{
                position: 'absolute',
                bottom: '-16px',
                right: '-16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
              }}
            >
              <span className="zen-seal">間</span>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-charcoal)', fontWeight: 600 }}>
                Ma &bull; Negative Space
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

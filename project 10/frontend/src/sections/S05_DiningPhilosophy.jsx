import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S05_DiningPhilosophy() {
  const { content, t, lang } = useCMS();
  const dp = content?.diningPhilosophy || {};

  const subtitle = t(dp.subtitle) || 'The Bengali Dining Philosophy';
  const title = t(dp.title) || 'Respect for Terroir, Patience & Warmth';
  const pillars = dp.pillars || [];

  return (
    <section
      id="philosophy"
      aria-label="Bengali Dining Philosophy"
      style={{
        padding: '110px 0',
        backgroundColor: '#F9F5EE',
        color: 'var(--color-charcoal, #242321)',
        borderTop: '1px solid rgba(177, 138, 84, 0.25)',
        borderBottom: '1px solid rgba(177, 138, 84, 0.25)',
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
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-terracotta, #A6533B)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {subtitle}
          </div>
          <h2
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: 'var(--color-indigo, #26344A)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '30px',
          }}
        >
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                padding: '38px 30px',
                borderRadius: '3px',
                border: '1px solid rgba(177, 138, 84, 0.25)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.04)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '44px',
                  fontWeight: 700,
                  color: 'rgba(166, 83, 59, 0.2)',
                  lineHeight: 1,
                  marginBottom: '16px',
                }}
              >
                {pillar.number || `0${idx + 1}`}
              </div>
              <h3
                style={{
                  fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'var(--color-indigo, #26344A)',
                  marginBottom: '12px',
                }}
              >
                {t(pillar.title)}
              </h3>
              <p
                style={{
                  fontSize: '14.5px',
                  lineHeight: 1.7,
                  color: 'rgba(36, 35, 33, 0.8)',
                  margin: 0,
                }}
              >
                {t(pillar.desc)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

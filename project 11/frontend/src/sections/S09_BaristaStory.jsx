import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S09_BaristaStory() {
  const { content } = useCMS();
  const barista = content?.barista || {};
  const accolades = barista.accolades || [];

  return (
    <section
      id="barista"
      aria-label="Barista Leadership & Culinary Team"
      style={{
        padding: '120px 0',
        backgroundColor: '#263F35',
        color: '#FAF7F0',
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
        >
          {/* Portrait */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(166, 181, 160, 0.4)',
              }}
            >
              <img
                src={barista.image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85'}
                alt={barista.name || 'Julian Moore'}
                style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '20px',
                backgroundColor: 'var(--color-copper, #A87958)',
                color: '#FFFFFF',
                padding: '14px 24px',
                borderRadius: '2px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700 }}>
                10+ Years
              </div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Micro-Lot Coffee Alchemy
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <div
              style={{
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-sage)',
                fontWeight: 700,
                marginBottom: '10px',
              }}
            >
              Craft Leadership
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(34px, 4.5vw, 48px)',
                fontWeight: 600,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '6px',
              }}
            >
              {barista.name || 'Julian Moore & Chef Saffron Lin'}
            </h2>

            <div
              style={{
                fontSize: '15px',
                color: 'var(--color-copper-light, #C59370)',
                fontWeight: 500,
                marginBottom: '24px',
              }}
            >
              {barista.title || 'Head of Coffee & Botanical Culinary Director'}
            </div>

            <p
              style={{
                fontSize: '15.5px',
                lineHeight: 1.8,
                color: 'rgba(250, 247, 240, 0.85)',
                marginBottom: '28px',
              }}
            >
              {barista.bio}
            </p>

            {barista.quote && (
              <blockquote
                style={{
                  margin: '0 0 32px 0',
                  padding: '20px 24px',
                  backgroundColor: 'rgba(26, 43, 36, 0.7)',
                  borderLeft: '3px solid var(--color-copper)',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '17px',
                  fontStyle: 'italic',
                  color: '#FAF7F0',
                  lineHeight: 1.6,
                }}
              >
                "{barista.quote}"
              </blockquote>
            )}

            {accolades.length > 0 && (
              <div>
                <div
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-sage)',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}
                >
                  Honors & Recognitions
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {accolades.map((acc, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '13.5px',
                        color: 'rgba(250, 247, 240, 0.82)',
                      }}
                    >
                      <span style={{ color: 'var(--color-copper-light)' }}>✦</span>
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

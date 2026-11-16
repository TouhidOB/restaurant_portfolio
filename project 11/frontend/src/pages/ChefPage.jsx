import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ChefPage({ onNavigate }) {
  const { content, openReservation } = useCMS();
  const barista = content?.barista || {};
  const accolades = barista.accolades || [
    'National Cup Tasters Champion Finalist (2023)',
    'Sustainable Café Architecture Recognition',
    'Farm-to-Glass Beverage Innovation Award',
  ];

  return (
    <div style={{ backgroundColor: '#1A2B24', color: '#F4F0E6', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 53, 0.5) 0%, #1A2B24 100%)',
          padding: '4.5rem 1.5rem 3rem',
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
            MASTERY & ARTISANAL CRAFT
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              letterSpacing: '0.03em',
              color: '#F4F0E6',
              margin: '0.6rem 0 1rem',
            }}
          >
            {barista.name || 'Julian Moore & Chef Saffron Lin'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#A87958', margin: '1rem auto' }} />
          <p style={{ color: '#D8D2C5', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1rem' }}>
            {barista.title || 'Head of Coffee & Botanical Culinary Director'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '60px 24px 90px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '60px',
            alignItems: 'center',
            marginBottom: '70px',
          }}
        >
          {/* Portrait Image */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 30px 70px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(166, 181, 160, 0.35)',
              }}
            >
              <img
                src={barista.image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85'}
                alt={barista.name || 'Leadership Team'}
                style={{ width: '100%', height: '540px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '-20px',
                right: '20px',
                backgroundColor: '#263F35',
                border: '1px solid rgba(166, 181, 160, 0.4)',
                padding: '16px 24px',
                borderRadius: '3px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
              }}
            >
              <span style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A87958', fontWeight: 700, display: 'block' }}>
                DIRECT FROM SOURCE
              </span>
              <strong style={{ fontSize: '15px', color: '#FFFFFF' }}>Ethical Terroir & Micro-Lot Focus</strong>
            </div>
          </div>

          {/* Bio & Philosophy */}
          <div>
            <span style={{ color: '#A87958', fontSize: '12px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              BOTANICAL LEADERSHIP
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display, "Cormorant Garamond")',
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 600,
                color: '#FFFFFF',
                lineHeight: 1.25,
                margin: '12px 0 20px',
              }}
            >
              The Science of Extraction, The Poetry of Terroir
            </h2>

            <p style={{ color: '#D8D2C5', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '20px' }}>
              {barista.bio || 'Julian brings a decade of specialty coffee competition mastery, focusing on single-origin extraction and water mineral chemistry. Chef Saffron marries foraging traditions with contemporary greenhouse brunch, utilizing microgreens and botanicals harvested right from our atrium walls.'}
            </p>

            {/* Blockquote */}
            <div
              style={{
                borderLeft: '3px solid #A87958',
                paddingLeft: '20px',
                margin: '28px 0',
                fontStyle: 'italic',
                color: '#FAF7F0',
                fontSize: '1.15rem',
                lineHeight: 1.6,
                fontFamily: 'var(--font-display, "Cormorant Garamond")',
              }}
            >
              "{barista.quote || 'When you extract a light-roasted Gesha beneath a canopy of sunlit monstera leaves, the experience transcends taste—it becomes restorative.'}"
            </div>

            {/* Accolades */}
            <div style={{ marginTop: '30px' }}>
              <h4 style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A6B5A0', marginBottom: '14px' }}>
                DISTINCTIONS & CERTIFICATIONS
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {accolades.map((acc, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#F4F0E6', fontSize: '14px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#A87958', flexShrink: 0 }} />
                    <span>{acc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '35px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => openReservation()}
                style={{
                  padding: '14px 32px',
                  backgroundColor: '#A87958',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '3px',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Reserve A Tasting Table
              </button>
              <button
                onClick={() => onNavigate && onNavigate('/signatures')}
                style={{
                  padding: '14px 28px',
                  backgroundColor: 'transparent',
                  color: '#A6B5A0',
                  border: '1px solid rgba(166, 181, 160, 0.4)',
                  borderRadius: '3px',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Explore Signature Drinks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

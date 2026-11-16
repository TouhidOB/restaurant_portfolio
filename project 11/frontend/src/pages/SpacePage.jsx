import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SpacePage({ onNavigate }) {
  const { content, openReservation } = useCMS();
  const arch = content?.architecture || {};
  const features = arch.features || [
    {
      title: 'High-Efficiency Solar Glazing',
      desc: 'Double-layered thermally isolated glass units maximize visible daylight while maintaining comfortable year-round temperature.',
    },
    {
      title: 'Reclaimed European Oak Timber',
      desc: 'Salvaged century-old oak beams repurposed into hand-planed tables, coffee counters, and ceiling rafters.',
    },
    {
      title: 'Rainwater Harvesting Cistern',
      desc: 'Runoff from our 800m² glass roof is naturally filtered into underground storage to hydrate all café plants without municipal water.',
    },
    {
      title: 'Low-Carbon Travertine Stone',
      desc: 'Locally quarried honed stone flooring that absorbs solar warmth during the day and gently radiates it in the evening.',
    },
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
            {arch.subtitle || 'DESIGN & SUSTAINABILITY'}
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
            {arch.title || 'The Architecture of the Glass Conservatory'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#A87958', margin: '1rem auto' }} />
          <p style={{ color: '#D8D2C5', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1rem' }}>
            A harmonious synthesis of structural glass engineering, passive solar thermodynamics, and biophilic living systems.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '60px 24px 90px' }}>
        {/* Hero Architectural Image */}
        <div
          style={{
            position: 'relative',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(166, 181, 160, 0.3)',
            marginBottom: '60px',
          }}
        >
          <img
            src={arch.image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85'}
            alt="Conservatory Architecture"
            style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(0deg, rgba(26,43,36,0.95) 0%, transparent 100%)',
              padding: '40px 30px 24px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display, "Cormorant Garamond")',
                fontStyle: 'italic',
                fontSize: '1.25rem',
                color: '#FAF7F0',
                margin: 0,
                maxWidth: '800px',
              }}
            >
              "{arch.quote || 'We wanted to craft a temple of light where every steel truss and potted ficus tree speaks to harmony between mankind and nature.'}"
            </p>
            <span style={{ fontSize: '12px', color: '#A6B5A0', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginTop: '8px' }}>
              — {arch.quote_author || 'Marcus Sterling, Structural Glasshouse Engineer'}
            </span>
          </div>
        </div>

        {/* Features Grid */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <span style={{ color: '#A87958', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            ENGINEERING PRINCIPLES
          </span>
          <h2 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2.5rem', color: '#FFFFFF', marginTop: '8px' }}>
            Biophilic Building Systems
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            marginBottom: '70px',
          }}
        >
          {features.map((feat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#263F35',
                padding: '35px 28px',
                borderRadius: '4px',
                border: '1px solid rgba(166, 181, 160, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    color: '#A87958',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '12px',
                  }}
                >
                  SYSTEM 0{idx + 1}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '14px' }}>
                  {feat.title}
                </h3>
                <p style={{ color: '#D8D2C5', fontSize: '0.98rem', lineHeight: 1.7, margin: 0 }}>
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div
          style={{
            backgroundColor: '#1E332B',
            padding: '45px 30px',
            borderRadius: '4px',
            border: '1px solid rgba(166, 181, 160, 0.3)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-display, "Cormorant Garamond")', fontSize: '2rem', color: '#FFFFFF', marginBottom: '12px' }}>
            Experience the Atrium in Daylight or Dusk
          </h3>
          <p style={{ color: '#D8D2C5', fontSize: '1rem', maxWidth: '650px', margin: '0 auto 24px' }}>
            Book a table under the glass canopy for Daylight Brunch or Twilight Botanical Dining.
          </p>
          <button
            onClick={() => openReservation()}
            style={{
              padding: '14px 34px',
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
            Request Table Reservation
          </button>
        </div>
      </div>
    </div>
  );
}

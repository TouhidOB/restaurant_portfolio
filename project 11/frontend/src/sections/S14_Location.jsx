import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S14_Location() {
  const { content } = useCMS();
  const loc = content?.location || {};

  return (
    <section
      id="location"
      aria-label="Hours, Location & Visit Us"
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
            {loc.subtitle || 'FIND OUR SANCTUARY'}
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
            {loc.title || 'Hours, Location & Transportation'}
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'stretch',
          }}
        >
          {/* Details Card */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: '40px 36px',
              borderRadius: '3px',
              border: '1px solid rgba(38, 63, 53, 0.15)',
              boxShadow: '0 4px 20px rgba(38, 63, 53, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-copper)', fontWeight: 700, marginBottom: '6px' }}>
                Glasshouse Enclave Address
              </div>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#292D29', margin: 0, fontWeight: 500 }}>
                {loc.address || '42 Conservatory Lane, Botanical Arts District, CA 94107'}
              </p>
              <div style={{ fontSize: '12px', color: 'var(--color-olive)', marginTop: '4px' }}>
                {loc.coordinates || '37.7749° N, 122.4194° W • Botanical Arts District'}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-copper)', fontWeight: 700, marginBottom: '6px' }}>
                Hours of Operation
              </div>
              <p style={{ fontSize: '14.5px', lineHeight: 1.6, color: '#292D29', margin: 0 }}>
                {loc.hours || 'Monday – Sunday: 7:30 AM – 8:00 PM'}
              </p>
            </div>

            <div>
              <div style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-copper)', fontWeight: 700, marginBottom: '6px' }}>
                Bicycle & EV Parking
              </div>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: 'rgba(41, 45, 41, 0.85)', margin: 0 }}>
                {loc.arrival_notes || 'Complimentary bicycle parking and EV charging stations available beside the glasshouse entrance.'}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(38, 63, 53, 0.1)' }}>
              <a
                href={`tel:${loc.phone || '+14158904321'}`}
                style={{
                  flex: 1,
                  minWidth: '130px',
                  padding: '12px 18px',
                  backgroundColor: 'var(--color-forest)',
                  color: '#FAF7F0',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                📞 Call Concierge
              </a>
              <a
                href={`mailto:${loc.email || 'hello@verdantatrium.com'}`}
                style={{
                  flex: 1,
                  minWidth: '130px',
                  padding: '12px 18px',
                  backgroundColor: 'rgba(38, 63, 53, 0.08)',
                  border: '1px solid rgba(38, 63, 53, 0.25)',
                  color: 'var(--color-forest)',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                ✉ Email Desk
              </a>
            </div>
          </div>

          {/* Interactive Conservatory Beacon Card */}
          <div
            style={{
              backgroundColor: '#1A2B24',
              borderRadius: '3px',
              border: '1px solid rgba(166, 181, 160, 0.3)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              minHeight: '380px',
            }}
          >
            <div
              style={{
                flex: 1,
                background: 'radial-gradient(circle at 50% 50%, #263F35 0%, #15221C 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(166, 181, 160, 0.15)',
                  border: '2px solid var(--color-sage)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '30px',
                  marginBottom: '16px',
                  boxShadow: '0 0 35px rgba(166, 181, 160, 0.3)',
                }}
              >
                🌿
              </div>

              <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: '#FFFFFF', fontWeight: 600, marginBottom: '6px' }}>
                Verdant Atrium Conservatory
              </div>

              <div style={{ fontSize: '13px', color: 'var(--color-sage)', letterSpacing: '0.08em', marginBottom: '24px' }}>
                {loc.coordinates || '37.7749° N, 122.4194° W'}
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 22px',
                  backgroundColor: 'rgba(168, 121, 88, 0.25)',
                  border: '1px solid var(--color-copper)',
                  borderRadius: '2px',
                  color: '#FAF7F0',
                  textDecoration: 'none',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-copper)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(168, 121, 88, 0.25)')}
              >
                🗺️ Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

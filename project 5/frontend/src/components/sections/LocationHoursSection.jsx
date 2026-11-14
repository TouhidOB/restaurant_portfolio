import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function LocationHoursSection() {
  const { content } = useCMS();
  const locSection = content?.sections?.location_contact || {};
  const restaurant = content?.restaurant || {};

  return (
    <section id="location" className="section-shell">
      <div className="container-tropical">
        {/* Section Header */}
        <div className="section-header-block" style={{ maxWidth: '800px' }}>
          <span className="section-tag">
            {locSection.eyebrow || 'LOCATION & HOURS'}
          </span>
          <h2 className="section-heading">
            {locSection.title || 'FIND YOUR PLACE HERE.'}
          </h2>
          <p className="section-lead">
            {locSection.subtitle ||
              'Nestled in the lush Palm Grove corridor, surrounded by protected sub-tropical flora and cooling ocean trade winds.'}
          </p>
        </div>

        {/* 2-Column Content */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'stretch',
          }}
        >
          {/* Logistics Details */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            <div className="tropical-card">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--accent-citrus)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                PHYSICAL SANCTUARY
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.75rem',
                  color: 'var(--text-ivory)',
                  marginBottom: '0.35rem',
                }}
              >
                Palm Grove Corridor
              </h3>
              <p style={{ color: 'var(--text-sand)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                {restaurant.address || '840 Palm Grove Way, Tropical Corridor'}
                <br />
                {restaurant.city || 'Miami, FL 33139'}
              </p>
              <div className="meta-chip">
                {restaurant.coordinates_display || '25.7617° N, 80.1918° W — PALM GROVE'}
              </div>
            </div>

            <div className="tropical-card">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--accent-terracotta)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                ARRIVALS & VALET
              </span>
              <p style={{ color: 'var(--text-sand)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Complimentary white-glove valet parking is located at the <strong>North Bamboo Gate</strong>. Self-parking is available in the shaded native mahogany grove with 4 EV charging bays.
              </p>
            </div>

            <div className="tropical-card">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--sage-mist)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                WEEKLY SERVICE SCHEDULE
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-ivory)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Tuesday — Friday (Lunch & Dinner)</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-citrus)' }}>12:00 — 23:30</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Saturday — Sunday (All-Day Dining)</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-citrus)' }}>12:00 — 23:30</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-terracotta)' }}>
                  <span>Monday</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>Closed for Garden Care</span>
                </div>
              </div>
            </div>
          </div>

          {/* Botanical Map Visual Graphic */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--border-light)',
              backgroundColor: '#14251D',
              minHeight: '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2.5rem',
              backgroundImage: `
                radial-gradient(circle at 75% 25%, rgba(82, 116, 90, 0.35) 0%, transparent 60%),
                radial-gradient(circle at 20% 80%, rgba(188, 113, 83, 0.25) 0%, transparent 50%)
              `,
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.75rem',
                  backgroundColor: 'rgba(26, 47, 37, 0.9)',
                  border: '1px solid var(--border-botanical)',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--accent-citrus)',
                  marginBottom: '1.5rem',
                }}
              >
                <span>📍</span>
                <span>VERDANT BOTANICAL GROVE</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.2rem',
                  color: 'var(--text-ivory)',
                  marginBottom: '1rem',
                  lineHeight: 1.15,
                }}
              >
                Sub-Tropical Coastal Haven
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  color: 'var(--text-sand)',
                  lineHeight: 1.6,
                  maxWidth: '44ch',
                }}
              >
                12 minutes from Downtown Coastal Marina. Enter through the water reflection promenade.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(26, 47, 37, 0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-botanical)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--sage-mist)',
                    display: 'block',
                  }}
                >
                  GPS DESTINATION
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-ivory)' }}>
                  840 Palm Grove Way, Miami
                </span>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-terracotta"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.82rem' }}
              >
                <span>OPEN NAVIGATION ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function LocationContactSection() {
  const { content } = useCMS();
  const locSection = content?.sections?.location_contact || {};
  const restaurant = content?.restaurant || {};

  return (
    <section id="location" className="section-shell">
      <div className="container-diner">
        {/* Section Header */}
        <div className="section-header-block" style={{ maxWidth: '800px' }}>
          <span className="section-tag">
            {locSection.eyebrow || 'LOCATION & HOURS'}
          </span>
          <h2 className="section-heading">
            {locSection.title || 'FIND THE DINER.'}
          </h2>
          <p className="section-lead">
            {locSection.subtitle ||
              'Located at the corner of 550 Neon Boulevard in the vibrant Atomic District, illuminated day and night.'}
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
            <div className="diner-card">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--neon-cyan)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                PHYSICAL ADDRESS
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  color: '#FFFFFF',
                  marginBottom: '0.35rem',
                }}
              >
                Atomic District Corner
              </h3>
              <p style={{ color: 'var(--text-cream)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                {restaurant.address || '550 Neon Boulevard, Atomic District'}
                <br />
                {restaurant.city || 'Chicago, IL 60611'}
              </p>
              <div className="meta-chip">
                {restaurant.coordinates_display || '41.8781° N, 87.6298° W — ATOMIC DISTRICT'}
              </div>
            </div>

            <div className="diner-card">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--cherry-red)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                PARKING & TRANSIT
              </span>
              <p style={{ color: 'var(--text-cream)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Dedicated vintage car parking is located behind the diner with neon bays, charging docks for modern EVs, and curbside takeout pickup.
              </p>
            </div>

            <div className="diner-card">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--atomic-yellow)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}
              >
                SERVICE HOURS SCHEDULE
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#FFFFFF' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Monday — Thursday</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--neon-cyan)' }}>08:00 — 00:00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Friday — Sunday (Midnight Service)</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--cherry-red)' }}>08:00 — 02:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stylized Neon Map Graphic */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              border: '1px solid var(--border-light)',
              backgroundColor: '#090F1B',
              minHeight: '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '2.5rem',
              backgroundImage: `
                radial-gradient(circle at 75% 25%, rgba(67, 217, 232, 0.25) 0%, transparent 60%),
                radial-gradient(circle at 20% 80%, rgba(216, 58, 69, 0.25) 0%, transparent 50%)
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
                  backgroundColor: 'rgba(9, 15, 27, 0.9)',
                  border: '1px solid var(--border-diner)',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--neon-cyan)',
                  marginBottom: '1.5rem',
                }}
              >
                <span>📍</span>
                <span>ATOMIC DISTRICT BEACON</span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  color: '#FFFFFF',
                  marginBottom: '1rem',
                  lineHeight: 1.15,
                }}
              >
                Stardust Roadside Pavilion
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  color: 'var(--text-cream)',
                  lineHeight: 1.6,
                  maxWidth: '44ch',
                }}
              >
                Look for the 35-foot neon star sign on the corner of Neon Blvd and 5th.
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(9, 15, 27, 0.92)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-diner)',
                borderRadius: 'var(--radius-xs)',
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
                    color: 'var(--text-muted)',
                    display: 'block',
                  }}
                >
                  GPS DESTINATION
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#FFFFFF' }}>
                  550 Neon Blvd, Chicago
                </span>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cherry"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.82rem' }}
              >
                <span>GET DIRECTIONS ↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S14Location() {
  const { content } = useCMS();
  const loc = content?.location || {};

  return (
    <section id="location" className="py-section" style={{ backgroundColor: 'var(--color-graphite)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="section-label">{loc.subtitle || 'Heart of the Industrial Arts District'}</span>
          <h2 className="section-title">{loc.title || 'Location, Hours & Map'}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Housed inside the historic 1920s locomotive foundry at 420 Ironworks Avenue.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'stretch' }}>
          {/* Warehouse Access Card */}
          <div
            style={{
              backgroundColor: 'var(--color-black-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '2px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-copper)', display: 'block', marginBottom: '0.35rem', fontWeight: 800 }}>
                  Street Address
                </span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-offwhite)', textTransform: 'uppercase' }}>
                  {loc.address || '420 Ironworks Avenue, Warehouse District'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-copper)', display: 'block', marginBottom: '0.35rem', fontWeight: 800 }}>
                  Transit & Parking
                </span>
                <p style={{ color: 'var(--color-concrete)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {loc.transit || 'Foundry Station (Subway Lines B & D) • Free On-Site Parking Lot'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-copper)', display: 'block', marginBottom: '0.35rem', fontWeight: 800 }}>
                  Host Desk Telephone
                </span>
                <p style={{ color: 'var(--color-copper)', fontSize: '1.2rem', fontWeight: 700 }}>
                  {loc.phone || '+1 (555) 789-2044'}
                </p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-steel)', display: 'block', marginBottom: '0.5rem', fontWeight: 800 }}>
                Operating Schedule
              </span>
              {Array.isArray(loc.hours) ? (
                loc.hours.map((h, idx) => (
                  <div key={idx} style={{ fontSize: '0.88rem', color: 'var(--color-concrete)', display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span>{h.days} :</span>
                    <span style={{ color: 'var(--color-offwhite)', fontWeight: 600 }}>{h.hours}</span>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.88rem', color: 'var(--color-offwhite)', lineHeight: '1.6' }}>
                  {typeof loc.hours === 'string' ? loc.hours : 'Tuesday to Sunday: 12:00 PM – Midnight'}
                </div>
              )}
            </div>
          </div>

          {/* Industrial Map Location Graphic */}
          <div
            style={{
              borderRadius: '2px',
              overflow: 'hidden',
              border: '2px solid var(--color-brick)',
              position: 'relative',
              minHeight: '400px',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85"
              alt="Urban Table Location"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(17, 19, 20, 0.95) 0%, rgba(17, 19, 20, 0.35) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2.5rem',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '2px',
                  background: 'var(--color-copper)',
                  color: 'var(--color-black)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  marginBottom: '1rem',
                  boxShadow: '0 0 20px rgba(184, 115, 69, 0.6)',
                }}
              >
                UT
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', color: 'var(--color-offwhite)', marginBottom: '0.25rem', textTransform: 'uppercase' }}>
                420 Ironworks Avenue
              </h3>
              <p style={{ color: 'var(--color-concrete)', fontSize: '0.92rem' }}>
                Warehouse Arts District • Locomotive Foundry Building
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

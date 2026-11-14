import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function LocationHoursSection() {
  const { content } = useCMS();
  const s13 = content.sections?.location_contact || {};
  const r = content.restaurant || {};

  return (
    <section id="contact" className="section-shell">
      <div className="container-brutal">
        <div className="section-header-block">
          <div className="section-tag">
            SECTION 13 // {s13.eyebrow || 'LOCATION & HOURS'}
          </div>
          <h2 className="section-heading">
            {s13.title || 'FIND YOUR WAY HERE.'}
          </h2>
          <p className="section-lead">
            {s13.subtitle || 'Located at the western periphery of District 09 in a repurposed 1968 industrial concrete warehouse.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Left Column: Coordinates & Logistics */}
          <div className="brutalist-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-steel)', paddingBottom: '1rem' }}>
                <span className="section-tag" style={{ marginBottom: '0.4rem' }}>
                  PHYSICAL SPECIFICATIONS
                </span>
                <h3 style={{ fontSize: '1.35rem', marginTop: '0.2rem' }}>{r.address}</h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {r.city}, {r.country}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-orange)', marginTop: '0.4rem' }}>
                  {r.coordinates_display}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-steel)', paddingBottom: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  OPERATIONAL RUNTIME
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  {r.opening_hours_summary}<br />
                  KITCHEN LAST SEATING: 22:15<br />
                  STEEL BAR CLOSES: 01:00
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  TRANSIT &amp; VALET
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Subway: Line A/C/E to 14th St &bull; Line L to 8th Ave. Complimentary architectural valet parking available at the northern gate.
                </p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <a href={`tel:${r.phone}`} className="btn-outline-brutal" style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.75rem' }}>
                TEL: {r.phone}
              </a>
              <a href={`mailto:${r.email}`} className="btn-orange" style={{ padding: '0.65rem 1.25rem', fontSize: '0.75rem' }}>
                EMAIL &rarr;
              </a>
            </div>
          </div>

          {/* Right Column: Architectural Map & Elevation Canvas */}
          <div
            style={{
              background: '#1A1B19',
              border: '1px solid var(--border-steel)',
              position: 'relative',
              minHeight: '380px',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              overflow: 'hidden',
            }}
          >
            {/* Structural Blueprint Grid Lines */}
            <div className="arch-grid-lines" />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <span className="section-tag" style={{ background: 'rgba(32, 33, 31, 0.9)' }}>
                GRID MAP // SECTOR 09
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                SECTOR LAT: 40.7128° &bull; LON: -74.0060°
              </div>
            </div>

            {/* Schematic Monolith Floorplan Layout in Center */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '2rem 0',
              }}
            >
              <div
                style={{
                  border: '2px solid var(--border-steel)',
                  padding: '2rem',
                  backgroundColor: 'rgba(32, 33, 31, 0.75)',
                  textAlign: 'center',
                  width: '80%',
                  maxWidth: '340px',
                }}
              >
                <div style={{ width: '12px', height: '12px', background: 'var(--accent-orange)', margin: '0 auto 0.75rem' }} />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff' }}>
                  MONOLITH ATELIER
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--concrete-raw)', marginTop: '0.25rem' }}>
                  DISTRICT 09 INDUSTRIAL CORE
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                borderTop: '1px solid var(--border-steel)',
                paddingTop: '0.75rem',
              }}
            >
              <span>ACCESS: INDUSTRIAL AVENUE GATE A</span>
              <span style={{ color: 'var(--accent-orange)' }}>ELEVATION: 18M MSL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

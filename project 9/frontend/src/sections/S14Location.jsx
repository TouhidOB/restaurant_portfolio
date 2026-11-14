import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S14Location() {
  const { content, openReservation } = useCMS();
  const loc = content?.location || {};

  return (
    <section id="location" className="section-pad" style={{ backgroundColor: 'var(--color-midnight-dark)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">{loc.subtitle || 'Crown of Horizon Tower'}</span>
          <h2 className="section-title">{loc.title || 'Location, Arrival & Skyline Coordinates'}</h2>
          <div className="horizon-divider horizon-divider-center" />
          <p className="section-subtitle">
            Situated atop the metropolitan skyline, SKYLINE is accessed via dedicated high-speed elevators from the Horizon Tower South Porte-Cochère.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'stretch' }}>
          {/* Coordinates & Logistics Card */}
          <div
            style={{
              background: 'var(--color-midnight)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-sunset-copper)' }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--color-champagne)', fontFamily: 'var(--font-accent)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                  GPS Coordinates &bull; Elevation 220M
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-cloud-ivory)', marginBottom: '0.85rem' }}>
                {loc.address || 'Level 54, Horizon Tower, 800 Skyline Boulevard'}
              </h3>

              <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {loc.arrival_notes ||
                  'Complimentary VIP Valet at Horizon Tower South Porte-Cochère. Dedicated express high-speed elevators transport guests directly to Level 54 in 38 seconds.'}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1.5rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                    Concierge Hotline
                  </span>
                  <div style={{ fontSize: '1.1rem', color: 'var(--color-cloud-ivory)', fontFamily: 'var(--font-accent)', fontWeight: 600 }}>
                    {loc.phone || '+1 (555) 890-7599'}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                    Email Inquiries
                  </span>
                  <div style={{ fontSize: '0.92rem', color: 'var(--color-twilight-slate)' }}>
                    {loc.email || 'concierge@skyline-rooftop.com'}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                    Operating Hours
                  </span>
                  <div style={{ fontSize: '0.92rem', color: 'var(--color-cloud-ivory)' }}>
                    {loc.hours || 'Tuesday - Sunday: 5:00 PM - 1:00 AM'}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button onClick={() => openReservation()} className="btn-skyline-primary" style={{ width: '100%', padding: '0.85rem' }}>
                Book Table For Tonight
              </button>
            </div>
          </div>

          {/* Architectural Elevation Diagram & Map Card */}
          <div
            style={{
              background: 'var(--color-midnight-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div>
              <span className="section-label" style={{ marginBottom: '0.5rem' }}>
                TOWER ASCENT PROFILE
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-cloud-ivory)', marginBottom: '1.5rem' }}>
                Vertical Horizon Transit
              </h3>

              {/* Vertical Diagram */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '2px solid var(--color-champagne)', paddingLeft: '1.5rem', margin: '1rem 0 2rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-sunset-copper)', fontWeight: 700 }}>LEVEL 54 &bull; 220 METERS</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-cloud-ivory)' }}>SKYLINE Rooftop &amp; Cantilevered Terrace</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-twilight-slate)' }}>Sunset Terrace, Glasshouse Lounge, Onyx Bar, Horizon Suites</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-twilight-slate)', fontWeight: 700 }}>LEVEL 53</div>
                  <div style={{ fontSize: '1rem', color: 'var(--color-cloud-ivory)' }}>Grand Reserve Wine Vault &amp; Sommelier Cellar</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-twilight-slate)' }}>1,200 curated vintage bottles</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-twilight-slate)', fontWeight: 700 }}>GROUND LEVEL</div>
                  <div style={{ fontSize: '1rem', color: 'var(--color-cloud-ivory)' }}>Horizon Tower South Porte-Cochère</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-twilight-slate)' }}>Complimentary VIP Valet &amp; Express 38s Sky Lifts</div>
                </div>
              </div>
            </div>

            <div
              style={{
                background: 'rgba(16, 28, 44, 0.65)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '3px',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--color-champagne)' }}>
                GPS: {loc.coordinates || '40.7580° N, 73.9855° W'}
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: '0.76rem', color: 'var(--color-cloud-ivory)', textDecoration: 'none', borderBottom: '1px solid var(--color-champagne)', fontWeight: 700 }}
              >
                Open Navigation App &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

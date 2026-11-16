import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ContactPage() {
  const { content, openReservation } = useCMS();
  const loc = content?.location || {};

  return (
    <div style={{ backgroundColor: 'var(--color-midnight-dark, #0a121d)', color: 'var(--color-cloud-ivory, #F3F0E9)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 90, 0.45) 0%, var(--color-midnight-dark, #0a121d) 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">{loc.subtitle || 'Crown of Horizon Tower'}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', letterSpacing: '0.04em', color: 'var(--color-champagne)', margin: '0.8rem 0 1.25rem' }}>
            {loc.title || 'Location, Arrival & Skyline Coordinates'}
          </h1>
          <div className="horizon-divider horizon-divider-center" />
          <p style={{ color: 'var(--color-twilight-slate)', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            Situated atop the metropolitan skyline, SKYLINE is accessed via dedicated high-speed elevators from the Horizon Tower South Porte-Cochère.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'stretch', marginBottom: '5rem' }}>
          {/* Coordinates & Logistics Card */}
          <div
            style={{
              backgroundColor: 'var(--color-midnight-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-champagne)', display: 'block', marginBottom: '0.35rem', fontWeight: 700 }}>
                  Physical Address &bull; Level 54
                </span>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-cloud-ivory)' }}>
                  {loc.address || 'Level 54, Horizon Tower, 800 Skyline Boulevard'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-champagne)', display: 'block', marginBottom: '0.35rem', fontWeight: 700 }}>
                  VIP Arrival &amp; Elevator Protocol
                </span>
                <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  {loc.arrival_notes ||
                    'Complimentary VIP Valet at Horizon Tower South Porte-Cochère. Dedicated express high-speed elevators transport guests directly to Level 54 in 38 seconds.'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-champagne)', display: 'block', marginBottom: '0.35rem', fontWeight: 700 }}>
                  Concierge Desk &amp; Inquiries
                </span>
                <p style={{ color: 'var(--color-cloud-ivory)', fontSize: '1.1rem', fontFamily: 'var(--font-accent)', fontWeight: 600 }}>
                  {loc.phone || '+1 (555) 890-7599'}
                </p>
                <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.9rem' }}>
                  {loc.email || 'concierge@skyline-rooftop.com'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-champagne)', display: 'block', marginBottom: '0.35rem', fontWeight: 700 }}>
                  Service Hours
                </span>
                <div style={{ color: 'var(--color-cloud-ivory)', fontSize: '0.95rem' }}>
                  {typeof loc.hours === 'string'
                    ? loc.hours
                    : Array.isArray(loc.hours)
                    ? loc.hours.map((h, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <span>{h.day}</span>
                          <span style={{ color: 'var(--color-champagne)' }}>{h.time}</span>
                        </div>
                      ))
                    : 'Tuesday – Sunday: 12:00 PM – 23:30 PM (Lunch & Dinner Shifts)'}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem' }}>
              <button onClick={() => openReservation()} className="btn-skyline-primary" style={{ width: '100%', padding: '0.85rem' }}>
                Book Table For Tonight &rarr;
              </button>
            </div>
          </div>

          {/* Map / Architectural Elevation Card */}
          <div
            style={{
              backgroundColor: 'var(--color-midnight)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <span className="section-label" style={{ fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                ELEVATION SCHEMATIC
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-cloud-ivory)', marginBottom: '1rem' }}>
                Horizon Tower Elevation Profile
              </h3>
              <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                Positioned 220 meters above the metropolis, SKYLINE occupies the entire 54th floor crown of Horizon Tower with dedicated private express sky-lifts.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--color-twilight-slate)' }}>Total Elevation:</span>
                  <strong style={{ color: 'var(--color-champagne)' }}>220 Meters / 722 Feet</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--color-twilight-slate)' }}>Elevator Transit Time:</span>
                  <strong style={{ color: 'var(--color-champagne)' }}>38 Seconds</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--color-twilight-slate)' }}>Panoramic Coverage:</span>
                  <strong style={{ color: 'var(--color-champagne)' }}>360° Unobstructed Perimeter</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--color-twilight-slate)' }}>Valet Parking:</span>
                  <strong style={{ color: 'var(--color-champagne)' }}>Complimentary at South Porte-Cochère</strong>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-sunset-copper)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                Dress Code: Smart Elegant Attire
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

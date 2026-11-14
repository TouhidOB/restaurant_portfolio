import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function Footer() {
  const { content, openReservation } = useCMS();
  const hero = content?.hero || {};
  const loc = content?.location || {};
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#0A121D',
        borderTop: '1px solid var(--color-border)',
        padding: '5rem 2rem 2.5rem',
        color: 'var(--color-twilight-slate)',
        position: 'relative',
      }}
    >
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                background: 'linear-gradient(135deg, var(--color-skyline-blue) 0%, var(--color-midnight-card) 100%)',
                border: '1px solid var(--color-border)',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-champagne)',
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                fontWeight: 700,
              }}
            >
              S
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-cloud-ivory)', letterSpacing: '0.08em' }}>
              {hero.restaurant_name || 'SKYLINE'}
            </h3>
          </div>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '320px' }}>
            {hero.lead_description || 'Suspended 220 meters above the metropolis, SKYLINE unites architectural boldness, 360-degree panoramic vistas, and progressive fine dining above the clouds.'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-warm-amber)', boxShadow: '0 0 8px var(--color-warm-amber)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--color-champagne)', fontFamily: 'var(--font-accent)', fontWeight: 600 }}>
              Level 54 &bull; Elevation 220m &bull; Sunset Seating Active
            </span>
          </div>
        </div>

        {/* Location & Hours Column */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-accent)', fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-champagne)', marginBottom: '1.25rem', fontWeight: 700 }}>
            Skyline Coordinates
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-cloud-ivory)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            {loc.address || 'Level 54, Horizon Tower, 800 Skyline Boulevard'}
          </p>
          <p style={{ fontSize: '0.84rem', color: 'var(--color-twilight-slate)', marginBottom: '1rem' }}>
            {loc.coordinates || '40.7580° N, 73.9855° W'}
          </p>
          <div style={{ fontSize: '0.86rem', color: 'var(--color-champagne)' }}>
            <strong>Inquiries:</strong> {loc.phone || '+1 (555) 890-7599'}
          </div>
          <div style={{ fontSize: '0.86rem', color: 'var(--color-twilight-slate)', marginTop: '0.25rem' }}>
            {loc.email || 'concierge@skyline-rooftop.com'}
          </div>
        </div>

        {/* Operating Hours Column */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-accent)', fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-champagne)', marginBottom: '1.25rem', fontWeight: 700 }}>
            Service Hours
          </h4>
          <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--color-cloud-ivory)', marginBottom: '0.5rem' }}>
            {loc.hours || 'Tuesday - Sunday: 5:00 PM - 1:00 AM'}
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-twilight-slate)', marginBottom: '1.5rem' }}>
            Sunset Service begins daily at 5:30 PM. Twilight Tasting seatings at 6:30 PM &amp; 8:45 PM.
          </p>
          <button
            onClick={() => openReservation()}
            className="btn-skyline-primary"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.78rem' }}
          >
            Table Reservation
          </button>
        </div>

        {/* CMS Administration & Quick Links */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-accent)', fontSize: '0.82rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-champagne)', marginBottom: '1.25rem', fontWeight: 700 }}>
            Architecture &amp; CMS
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem' }}>
            <li>
              <a href="http://127.0.0.1:8001/cms/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-champagne)', textDecoration: 'none' }}>
                &rarr; Skyline CMS Studio (Admin Portal)
              </a>
            </li>
            <li>
              <a href="http://127.0.0.1:8001/api/content/" target="_blank" rel="noreferrer" style={{ color: 'var(--color-twilight-slate)', textDecoration: 'none' }}>
                &bull; Public Headless Content API (JSON)
              </a>
            </li>
            <li>
              <a href="#tour" style={{ color: 'var(--color-twilight-slate)', textDecoration: 'none' }}>
                &bull; 3D Rooftop WebGL Virtual Tour
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem' }}>
        <div>
          {content?.footer?.copyright || `© ${currentYear} SKYLINE Rooftop Restaurant & Horizon Lounge. All rights reserved.`}
        </div>
        <div style={{ color: 'var(--color-champagne)', fontFamily: 'var(--font-accent)' }}>
          Decoupled Architecture &bull; React 18 + Three.js &bull; Django 5 + DRF
        </div>
      </div>
    </footer>
  );
}

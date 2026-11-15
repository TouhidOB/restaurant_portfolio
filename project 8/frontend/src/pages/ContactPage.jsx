import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ContactPage() {
  const { content, openReservation } = useCMS();
  const loc = content?.location || {};

  return (
    <div style={{ backgroundColor: '#111314', color: 'var(--color-offwhite, #F1EEE7)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(145, 77, 55, 0.4) 0%, #111314 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '2px solid var(--color-brick, #914D37)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">{loc.subtitle || 'Heart of the Industrial Arts District'}</span>
          <h1 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '3.5rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
            {loc.title || 'Location, Hours & Host Desk'}
          </h1>
          <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1.15rem', lineHeight: '1.7' }}>
            Housed inside the historic 1920s locomotive foundry at 420 Ironworks Avenue. Direct access, on-site parking, and live host desk.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'stretch', marginBottom: '5rem' }}>
          {/* Warehouse Logistics Card */}
          <div
            style={{
              backgroundColor: 'var(--color-black-card, #181A1C)',
              border: '1px solid var(--color-border, #3a3d40)',
              borderRadius: '2px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-copper, #B87345)', display: 'block', marginBottom: '0.35rem', fontWeight: 800 }}>
                  Street Address
                </span>
                <p style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '1.45rem', color: 'var(--color-offwhite, #F1EEE7)', textTransform: 'uppercase' }}>
                  {loc.address || '420 Ironworks Avenue, Warehouse District'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-copper, #B87345)', display: 'block', marginBottom: '0.35rem', fontWeight: 800 }}>
                  Transit & Parking
                </span>
                <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {loc.transit || 'Foundry Station (Subway Lines B & D) • Free On-Site Parking Lot'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-copper, #B87345)', display: 'block', marginBottom: '0.35rem', fontWeight: 800 }}>
                  Host Desk Telephone
                </span>
                <p style={{ color: 'var(--color-copper, #B87345)', fontSize: '1.25rem', fontWeight: 700 }}>
                  {loc.phone || '+1 (555) 789-2044'}
                </p>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-copper, #B87345)', display: 'block', marginBottom: '0.35rem', fontWeight: 800 }}>
                  Electronic Inquiries
                </span>
                <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1rem' }}>
                  {loc.email || 'table@urbankitchen.com'}
                </p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-steel, #737A7D)', display: 'block', marginBottom: '0.75rem', fontWeight: 800 }}>
                Operating Schedule
              </span>
              {Array.isArray(loc.hours) ? (
                loc.hours.map((h, idx) => (
                  <div key={idx} style={{ fontSize: '0.88rem', color: 'var(--color-concrete, #B7B4AC)', display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span>{h.days} :</span>
                    <span style={{ color: 'var(--color-offwhite, #F1EEE7)', fontWeight: 600 }}>{h.hours}</span>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '0.88rem', color: 'var(--color-offwhite, #F1EEE7)', lineHeight: '1.6' }}>
                  {typeof loc.hours === 'string' ? loc.hours : 'Tuesday to Sunday: 12:00 PM – Midnight'}
                </div>
              )}
            </div>
          </div>

          {/* Location Atmosphere Graphic & Direct Booking */}
          <div
            style={{
              borderRadius: '2px',
              overflow: 'hidden',
              border: '2px solid var(--color-brick, #914D37)',
              position: 'relative',
              minHeight: '440px',
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
                background: 'linear-gradient(to top, rgba(17, 19, 20, 0.95) 0%, rgba(17, 19, 20, 0.4) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2.5rem',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2rem', textTransform: 'uppercase', color: 'var(--color-offwhite, #F1EEE7)', marginBottom: '0.75rem' }}>
                Join The Table Today
              </h3>
              <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
                Walk-ins welcomed at our 30-seat hammered copper bar. Reservations strongly encouraged for dining tables and private feasts.
              </p>
              <button onClick={() => openReservation()} className="btn-primary" style={{ padding: '0.9rem' }}>
                Reserve Table Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

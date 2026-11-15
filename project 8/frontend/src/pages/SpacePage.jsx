import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SpacePage() {
  const { content, openReservation } = useCMS();
  const interior = content?.interior || {};
  const details = interior.details || [];
  const stats = interior.stats || [];

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
          <span className="section-label">{interior.subtitle || 'Converted 1920s Industrial Warehouse'}</span>
          <h1 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '3.5rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
            {interior.title || 'Interior Architecture & Atmosphere'}
          </h1>
          <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1.15rem', lineHeight: '1.7' }}>
            Preserving a century of locomotive manufacturing heritage with exposed brick, heavy steel I-beams, and radiant open hearth fires.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Architectural Stats Grid */}
        {stats.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '5rem',
            }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-black-card, #181A1C)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '2px',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  borderTop: '3px solid var(--color-copper, #B87345)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2.5rem', color: 'var(--color-copper, #B87345)', fontWeight: 800, marginBottom: '0.35rem' }}>
                  {stat.value}
                </div>
                <div style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Details Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          {details.map((detail, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-black-card, #181A1C)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '2px',
                padding: '2.5rem',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-brick, #914D37)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ color: 'var(--color-copper, #B87345)', fontSize: '1.5rem', fontFamily: 'var(--font-display, Oswald)', fontWeight: 800, marginBottom: '0.75rem' }}>
                0{idx + 1}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--color-offwhite, #F1EEE7)', marginBottom: '0.85rem' }}>
                {detail.title}
              </h3>
              <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                {detail.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Atmosphere Quote & Reservation */}
        <div
          style={{
            textAlign: 'center',
            backgroundColor: 'var(--color-graphite, #252729)',
            border: '2px solid var(--color-brick, #914D37)',
            padding: '3.5rem 2rem',
            borderRadius: '2px',
          }}
        >
          {interior.quote && (
            <blockquote
              style={{
                fontFamily: 'var(--font-editorial, "DM Serif Display", serif)',
                fontSize: '1.5rem',
                fontStyle: 'italic',
                color: 'var(--color-offwhite, #F1EEE7)',
                maxWidth: '700px',
                margin: '0 auto 2rem',
                lineHeight: '1.6',
              }}
            >
              "{interior.quote}"
            </blockquote>
          )}
          <button onClick={() => openReservation('Main Warehouse Dining')} className="btn-primary" style={{ padding: '0.9rem 2.2rem' }}>
            Book A Table In The Warehouse
          </button>
        </div>
      </div>
    </div>
  );
}

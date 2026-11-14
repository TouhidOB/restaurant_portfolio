import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S08Interior() {
  const { content } = useCMS();
  const interior = content?.interior || {};

  return (
    <section id="interior" className="py-section" style={{ backgroundColor: 'var(--color-graphite)', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Left: Materials & Architecture Specifications */}
          <div>
            <span className="section-label">{interior.subtitle || 'Converted 1920s Industrial Warehouse'}</span>
            <h2 className="section-title">{interior.title || 'Interior Architecture & Atmosphere'}</h2>

            <div className="industrial-divider" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
              {(interior.details || []).map((item, idx) => (
                <div key={idx}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--color-offwhite)', marginBottom: '0.4rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: 'var(--color-copper)' }}>✦</span>
                    <span>{item.title}</span>
                  </h4>
                  <p style={{ color: 'var(--color-concrete)', fontSize: '0.92rem', lineHeight: '1.65', paddingLeft: '1.4rem' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {interior.quote && (
              <blockquote
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontStyle: 'italic',
                  fontSize: '1.2rem',
                  color: 'var(--color-offwhite)',
                  borderLeft: '3px solid var(--color-brick)',
                  paddingLeft: '1.25rem',
                  lineHeight: '1.6',
                }}
              >
                "{interior.quote}"
              </blockquote>
            )}
          </div>

          {/* Right: Atmosphere Image & Numerical Metrics */}
          <div>
            <div
              style={{
                borderRadius: '2px',
                overflow: 'hidden',
                border: '2px solid var(--color-brick)',
                boxShadow: '0 15px 45px rgba(0,0,0,0.5)',
                marginBottom: '2rem',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85"
                alt="Urban Table Industrial Atmosphere"
                style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Architecture Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.25rem',
              }}
            >
              {(interior.stats || [
                { value: '1924', label: 'Original Construction' },
                { value: '6,500 sq ft', label: 'Warehouse Footprint' },
                { value: '24 ft', label: 'Ceiling Clearance' },
                { value: '180', label: 'Seating Capacity' },
              ]).map((st, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'var(--color-black-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '2px',
                    padding: '1.25rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-copper)', fontWeight: 700, letterSpacing: '0.04em' }}>
                    {st.value}
                  </div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-steel)', marginTop: '0.2rem', fontWeight: 700 }}>
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

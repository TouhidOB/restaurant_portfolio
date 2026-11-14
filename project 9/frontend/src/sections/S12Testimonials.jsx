import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S12Testimonials() {
  const { content } = useCMS();
  const test = content?.testimonials || {};
  const reviews = test.reviews || [];

  return (
    <section id="press" className="section-pad" style={{ backgroundColor: 'var(--color-midnight-dark)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">{test.subtitle || 'Global Hospitality Recognition'}</span>
          <h2 className="section-title">{test.title || 'Critical Acclaim & Guest Honors'}</h2>
          <div className="horizon-divider horizon-divider-center" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--color-midnight)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '4px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-champagne)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-subtle)')}
            >
              <div>
                <div style={{ color: 'var(--color-sunset-copper)', fontSize: '1.25rem', marginBottom: '1rem', letterSpacing: '0.15em' }}>
                  &starf;&starf;&starf;&starf;&starf;
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    color: 'var(--color-cloud-ivory)',
                    marginBottom: '1.75rem',
                  }}
                >
                  "{rev.quote}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', paddingTop: '1.25rem' }}>
                <h4 style={{ fontFamily: 'var(--font-accent)', fontSize: '0.95rem', color: 'var(--color-champagne)', fontWeight: 700, letterSpacing: '0.04em' }}>
                  {rev.author}
                </h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-twilight-slate)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {rev.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

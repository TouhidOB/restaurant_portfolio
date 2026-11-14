import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S08Architecture() {
  const { content } = useCMS();
  const arch = content?.architecture || {};
  const features = arch.features || [];

  return (
    <section id="architecture" className="section-pad" style={{ backgroundColor: 'var(--color-midnight-dark)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">{arch.subtitle || 'Cantilevered Glass & Panoramic Vistas'}</span>
          <h2 className="section-title">{arch.title || 'Architectural Design & Engineering'}</h2>
          <div className="horizon-divider horizon-divider-center" />
          {arch.quote && (
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontStyle: 'italic',
                color: 'var(--color-champagne-light)',
                maxWidth: '780px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              "{arch.quote}"
              {arch.quote_author && (
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    color: 'var(--color-sunset-copper)',
                    fontFamily: 'var(--font-accent)',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    marginTop: '0.5rem',
                  }}
                >
                  &mdash; {arch.quote_author}
                </span>
              )}
            </p>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {features.map((feat, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--color-midnight)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '4px',
                padding: '2.25rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    color: 'var(--color-champagne)',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '0.75rem',
                  }}
                >
                  0{idx + 1}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-cloud-ivory)', marginBottom: '0.65rem' }}>
                  {feat.title}
                </h3>
                <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

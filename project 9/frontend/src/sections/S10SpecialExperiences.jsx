import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S10SpecialExperiences() {
  const { content, openReservation } = useCMS();
  const spec = content?.specialExperiences || {};
  const experiences = spec.experiences || [];

  return (
    <section id="experiences" className="section-pad" style={{ backgroundColor: 'var(--color-midnight-dark)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">{spec.subtitle || 'From Sunset Aperitivo to Stargazing Buyouts'}</span>
          <h2 className="section-title">{spec.title || 'Curated Horizon Celebrations'}</h2>
          <div className="horizon-divider horizon-divider-center" />
          <p className="section-subtitle">
            Unforgettable private celebrations and bespoke tasting journeys designed for discerning hosts and memorable milestones.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {experiences.map((exp, idx) => (
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
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-subtle)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: '0.74rem',
                    color: 'var(--color-sunset-copper)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '0.4rem',
                  }}
                >
                  {exp.time}
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-cloud-ivory)', marginBottom: '0.75rem' }}>
                  {exp.title}
                </h3>
                <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {exp.desc}
                </p>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-champagne)', fontWeight: 600, marginBottom: '1.25rem' }}>
                  {exp.price}
                </div>
                <button
                  onClick={() => openReservation(exp.title)}
                  className="btn-skyline-outline"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.78rem' }}
                >
                  Inquire Experience
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S05DiningExperience() {
  const { content, openReservation } = useCMS();
  const exp = content?.diningExperience || {};
  const spaces = exp.spaces || [];

  return (
    <section id="spaces" className="section-pad" style={{ backgroundColor: 'var(--color-midnight)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">{exp.subtitle || 'Atmosphere & Architecture'}</span>
          <h2 className="section-title">{exp.title || 'Distinct Rooftop Dining Dimensions'}</h2>
          <div className="horizon-divider horizon-divider-center" />
          <p className="section-subtitle">
            Whether dining alfresco beneath the open evening skies or inside our temperature-controlled glasshouse pavilion, every seat offers a front-row vantage point to the skyline.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {spaces.map((sp) => (
            <div
              key={sp.id}
              style={{
                background: 'var(--color-midnight-card)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '4px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
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
              {/* Space Photo */}
              <div style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={sp.image}
                  alt={sp.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(16, 28, 44, 0.85)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid var(--color-border)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '2px',
                    fontSize: '0.72rem',
                    color: 'var(--color-champagne)',
                    fontFamily: 'var(--font-accent)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {sp.tag}
                </span>
              </div>

              {/* Space Details */}
              <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-cloud-ivory)', marginBottom: '0.6rem' }}>
                    {sp.name}
                  </h3>
                  <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {sp.desc}
                  </p>

                  {sp.features && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {sp.features.map((feat, fi) => (
                        <li key={fi} style={{ fontSize: '0.82rem', color: 'var(--color-cloud-ivory)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ color: 'var(--color-sunset-copper)' }}>&bull;</span> {feat}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  onClick={() => openReservation(sp.id)}
                  className="btn-skyline-outline"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.78rem' }}
                >
                  Reserve Table In {sp.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

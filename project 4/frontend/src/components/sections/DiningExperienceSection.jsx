import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function DiningExperienceSection() {
  const { content } = useCMS();
  const s09 = content.sections?.dining_experience || {};
  const panels = content.dining_panels || [];

  return (
    <section id="experience" className="section-shell">
      <div className="container-brutal">
        <div className="section-header-block">
          <div className="section-tag">
            SECTION 09 // {s09.eyebrow || 'THE EXPERIENCE'}
          </div>
          <h2 className="section-heading">
            {s09.title || 'MORE THAN A MEAL.'}
          </h2>
          <p className="section-lead">
            {s09.subtitle || 'Three immersive dimensions framing every evening at Monolith.'}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {panels.map((p, idx) => (
            <div
              key={p.id || idx}
              className="brutalist-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
              }}
            >
              <div>
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/10', marginBottom: '1.25rem', border: '1px solid var(--border-steel)' }}>
                  <img
                    src={p.image_url}
                    alt={p.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      background: 'var(--bg-dark)',
                      border: '1px solid var(--border-steel)',
                      padding: '0.2rem 0.5rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--accent-orange)',
                    }}
                  >
                    {p.spec_badge}
                  </div>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  DIMENSION 0{idx + 1}
                </div>

                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>
                  {p.title}
                </h3>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--concrete-raw)', marginBottom: '1rem' }}>
                  {p.subtitle}
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {p.description}
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-steel)',
                  paddingTop: '0.75rem',
                  marginTop: '1.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}
              >
                EXPERIENTIAL PARAMETER // VERIFIED
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function DinerExperienceSection() {
  const { content } = useCMS();
  const expSection = content?.sections?.diner_experience || {};
  const panels = content?.dining_panels || [];

  return (
    <section id="experience" className="section-shell">
      <div className="container-diner">
        {/* Section Header */}
        <div className="section-header-block" style={{ maxWidth: '820px' }}>
          <span className="section-tag">
            {expSection.eyebrow || 'THE EXPERIENCE'}
          </span>
          <h2 className="section-heading">
            {expSection.title || 'GOOD FOOD. GOOD MUSIC. GOOD COMPANY.'}
          </h2>
          <p className="section-lead">
            {expSection.subtitle ||
              'Three immersive dimensions framing every visit to our retro-futuristic counter, designed for great taste and late-night connection.'}
          </p>
        </div>

        {/* 3 Panels Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {panels.map((panel, idx) => (
            <div
              key={panel.id || panel.slug}
              className="diner-card"
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/11',
                  overflow: 'hidden',
                  backgroundColor: '#0D1422',
                }}
              >
                <img
                  src={panel.image_url || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80'}
                  alt={panel.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    backgroundColor: 'rgba(9, 15, 27, 0.85)',
                    color: 'var(--neon-cyan)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid rgba(67, 217, 232, 0.4)',
                  }}
                >
                  {panel.spec_badge || 'EXPERIENCE ELEMENT'}
                </span>
              </div>

              {/* Text */}
              <div
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--cherry-red)',
                      letterSpacing: '0.1em',
                      marginBottom: '0.4rem',
                      fontWeight: 700,
                    }}
                  >
                    DIMENSION 0{idx + 1}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.9rem',
                      color: '#FFFFFF',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {panel.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--neon-cyan)',
                      display: 'block',
                      marginBottom: '1rem',
                    }}
                  >
                    {panel.subtitle}
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                      color: 'var(--text-cream)',
                      lineHeight: 1.6,
                    }}
                  >
                    {panel.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '1.75rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-diner)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span>CLASSIC TASTE</span>
                  <span>FUTURE ENERGY</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

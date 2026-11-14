import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function PhilosophySection() {
  const { content } = useCMS();
  const philosophy = content?.sections?.philosophy || {};
  const pillars = content?.pillars || [];

  return (
    <section id="philosophy" className="section-shell">
      <div className="container-diner">
        {/* Section Header */}
        <div className="section-header-block" style={{ maxWidth: '800px' }}>
          <span className="section-tag">
            {philosophy.eyebrow || 'OUR CORE PILLARS'}
          </span>
          <h2 className="section-heading">
            {philosophy.title || 'OLD-SCHOOL SOUL. NEW-SCHOOL ENERGY.'}
          </h2>
          <p className="section-lead">
            {philosophy.subtitle ||
              'Three guiding principles bringing together classic roadside soul and futuristic innovation, creating an experience that feels nostalgic yet electric.'}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.id || pillar.number}
              className="diner-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.75rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: 'var(--cherry-red)',
                      textShadow: '0 0 12px rgba(216, 58, 69, 0.4)',
                    }}
                  >
                    /{pillar.number}
                  </span>
                  <span
                    className="meta-chip"
                    style={{
                      backgroundColor: 'rgba(67, 217, 232, 0.12)',
                      borderColor: 'var(--neon-cyan)',
                      color: 'var(--neon-cyan)',
                    }}
                  >
                    ATOMIC PILLAR
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.95rem',
                    color: '#FFFFFF',
                    marginBottom: '0.85rem',
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: 'var(--neon-cyan)',
                    lineHeight: 1.45,
                    marginBottom: '1.25rem',
                  }}
                >
                  {pillar.statement}
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    color: 'var(--text-cream)',
                    lineHeight: 1.65,
                  }}
                >
                  {pillar.description}
                </p>
              </div>

              <div
                style={{
                  marginTop: '2.5rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-diner)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                }}
              >
                <span style={{ color: 'var(--cherry-red)' }}>★</span>
                <span>AUTHENTIC 1950S SOUL</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

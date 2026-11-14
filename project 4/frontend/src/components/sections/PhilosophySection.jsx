import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function PhilosophySection() {
  const { content } = useCMS();
  const s03 = content.sections?.philosophy || {};
  const pillars = content.pillars || [];

  return (
    <section id="philosophy" className="section-shell">
      <div className="container-brutal">
        <div className="section-header-block">
          <div className="section-tag">
            SECTION 03 // {s03.eyebrow || 'OUR PHILOSOPHY'}
          </div>
          <h2 className="section-heading">
            {s03.title || 'WE BELIEVE IN THE POWER OF SIMPLICITY.'}
          </h2>
          <p className="section-lead">
            {s03.subtitle || 'Three pillars form the structural bedrock of our culinary identity.'}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.id || pillar.number}
              className="brutalist-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '360px',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    color: 'var(--accent-orange)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    borderBottom: '1px solid var(--border-steel)',
                    paddingBottom: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{pillar.number} // PILLAR</span>
                  <span style={{ color: 'var(--text-muted)' }}>EST. 2021</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: 'var(--concrete-raw)',
                    marginBottom: '1.25rem',
                    lineHeight: 1.4,
                  }}
                >
                  {pillar.statement}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    borderTop: '1px solid var(--border-steel)',
                    paddingTop: '1rem',
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

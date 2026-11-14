import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function PhilosophySection() {
  const { content } = useCMS();
  const philosophy = content?.sections?.philosophy || {};
  const pillars = content?.pillars || [];

  return (
    <section id="philosophy" className="section-shell">
      <div className="container-tropical">
        {/* Section Header */}
        <div className="section-header-block" style={{ maxWidth: '800px' }}>
          <span className="section-tag">
            {philosophy.eyebrow || 'OUR PHILOSOPHY'}
          </span>
          <h2 className="section-heading">
            {philosophy.title || 'GOOD FOOD GROWS FROM GOOD THINKING.'}
          </h2>
          <p className="section-lead">
            {philosophy.subtitle ||
              'Three guiding pillars form the bedrock of our culinary and architectural approach, aligning human hospitality with the rhythms of nature.'}
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
              className="tropical-card"
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
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: 'var(--accent-terracotta)',
                    }}
                  >
                    /{pillar.number}
                  </span>
                  <span
                    className="meta-chip"
                    style={{
                      backgroundColor: 'rgba(82, 116, 90, 0.2)',
                      borderColor: 'var(--botanical-green)',
                      color: 'var(--sage-mist)',
                    }}
                  >
                    FOUNDATION
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.1rem',
                    color: 'var(--text-ivory)',
                    marginBottom: '0.85rem',
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: 'var(--accent-citrus)',
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
                    color: 'var(--text-sand)',
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
                  borderTop: '1px solid var(--border-botanical)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--sage-mist)',
                }}
              >
                <span>●</span>
                <span>AUTHENTIC BOTANICAL PRACTICE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

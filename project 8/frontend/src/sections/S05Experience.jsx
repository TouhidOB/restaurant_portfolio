import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S05Experience() {
  const { content } = useCMS();
  const exp = content?.experience || {};
  const pillars = exp.pillars || [
    {
      step: '01',
      title: 'The Craft',
      desc: 'Every cut is butchered in-house, dry-aged in our glass curing chamber, and smoked low-and-slow over seasoned hardwoods.',
    },
    {
      step: '02',
      title: 'The Atmosphere',
      desc: 'Soaring industrial heights, polished concrete floors, incandescent factory lighting, and an infectious playlist of blues and indie rock.',
    },
    {
      step: '03',
      title: 'The Hospitality',
      desc: 'Energetic, knowledgeable, and genuinely welcoming. We treat every guest like an insider seated at the chef’s personal table.',
    },
  ];

  return (
    <section id="experience" className="py-section" style={{ backgroundColor: 'var(--color-black)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="section-label">{exp.subtitle || 'Raw Architecture Meets Contemporary Culinary Culture'}</span>
          <h2 className="section-title">{exp.title || 'The Industrial Dining Experience'}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Built for shared feasts, bold conversations, and the sensory thrill of an active culinary hearth.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {pillars.map((p, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-black-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                padding: '2.5rem 2rem',
                position: 'relative',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--color-copper)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.8rem',
                  color: 'var(--color-copper)',
                  lineHeight: 1,
                  marginBottom: '1rem',
                  fontWeight: 700,
                  opacity: 0.9,
                }}
              >
                {p.step}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-offwhite)', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                {p.title}
              </h3>
              <p style={{ color: 'var(--color-concrete)', fontSize: '0.92rem', lineHeight: '1.65' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

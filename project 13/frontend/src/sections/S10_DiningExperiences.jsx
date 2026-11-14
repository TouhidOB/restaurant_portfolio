import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S10_DiningExperiences() {
  const { content, openReservationModal } = useCMS();
  const expData = content?.editorial_sections?.s10_experiences || {
    badge: "LATE NIGHT SPECIALS",
    title: "Curated Group Dining & Pocha Tables",
    description: "Planning a celebration with friends? Reserve our pocha group tables with feast pairings and chilled soju towers."
  };

  const experiences = content.dining_experiences || [];

  return (
    <section id="experiences" className="editorial-section" style={{ backgroundColor: '#0C0E11' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {expData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: '#F6F4F0',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {expData.title}
          </h2>
          <p style={{ color: 'var(--color-silver)', fontSize: '1rem', lineHeight: 1.7 }}>
            {expData.description}
          </p>
        </div>

        {/* Experiences Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
          }}
        >
          {experiences.map((exp) => (
            <div
              key={exp.id}
              style={{
                backgroundColor: 'var(--color-charcoal)',
                borderRadius: '12px',
                padding: '36px 30px',
                border: '1px solid var(--color-border)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'var(--color-magenta)';
                e.currentTarget.style.boxShadow = '0 16px 45px rgba(255, 46, 136, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                  <span className="badge-tag" style={{ background: 'rgba(255, 46, 136, 0.15)', color: 'var(--color-magenta)', borderColor: 'rgba(255, 46, 136, 0.4)' }}>
                    {exp.price}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-cyan)', fontWeight: 700, fontFamily: 'var(--font-condensed)' }}>
                    👥 {exp.capacity}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.75rem',
                    color: '#FFFFFF',
                    marginBottom: '4px',
                    lineHeight: 1.2,
                  }}
                >
                  {exp.title}
                </h3>

                {exp.subtitle && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-amber)', fontWeight: 600, marginBottom: '14px' }}>
                    {exp.subtitle}
                  </div>
                )}

                <p style={{ color: 'var(--color-silver)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  {exp.description}
                </p>

                {exp.features && exp.features.length > 0 && (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    {exp.features.map((feat, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', color: 'var(--color-silver)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--color-magenta)', fontWeight: 800 }}>✓</span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <button
                  onClick={openReservationModal}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px' }}
                >
                  Inquire For This Experience &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

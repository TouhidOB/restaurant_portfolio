import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S10_Experiences() {
  const { content, openReservationModal } = useCMS();
  const expData = content?.editorial_sections?.s10_experiences || {
    badge: "PRIVATE & EXCLUSIVE",
    title: "Curated Riviera Dining Encounters",
    description: "Bespoke moments designed for intimate celebrations, sunset toasts, and private sommelier journeys."
  };

  const experiences = content.dining_experiences || [];

  return (
    <section id="experiences" className="editorial-section" style={{ backgroundColor: 'var(--c-limestone-light)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {expData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: 'var(--c-navy)',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {expData.title}
          </h2>
          <p style={{ color: '#595752', fontSize: '1rem', lineHeight: 1.7 }}>
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
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '36px 30px',
                border: '1px solid var(--c-border)',
                boxShadow: '0 8px 30px rgba(38, 58, 72, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 45px rgba(38, 58, 72, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(38, 58, 72, 0.04)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                  <span className="badge-tag" style={{ background: '#FDE8CD', color: '#9D5B3E', borderColor: '#DECDB8' }}>
                    {exp.price}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: '#8C847B', fontWeight: 600 }}>
                    👥 {exp.capacity}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.75rem',
                    color: 'var(--c-navy)',
                    marginBottom: '6px',
                    lineHeight: 1.2,
                  }}
                >
                  {exp.title}
                </h3>

                {exp.subtitle && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--c-terracotta)', fontWeight: 600, marginBottom: '14px' }}>
                    {exp.subtitle}
                  </div>
                )}

                <p style={{ color: '#595752', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '20px' }}>
                  {exp.description}
                </p>

                {exp.features && exp.features.length > 0 && (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                    {exp.features.map((feat, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', color: '#4A4641', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--c-terracotta)', fontWeight: 700 }}>✓</span>
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

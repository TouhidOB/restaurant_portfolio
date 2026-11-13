import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function S10DiningExperiences({ experiences, onSelectExperience }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section
      id="experiences"
      style={{
        padding: 'var(--section-spacing) 0',
        backgroundColor: '#EBE7DD',
      }}
    >
      <div className="zen-container">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
          <div className="zen-eyebrow" style={{ justifyContent: 'center' }}>
            BESPOKE GATHERINGS
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, var(--section-heading-size))', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
            Private Dining &amp; Special Experiences
          </h2>
          <p className="font-jp" style={{ fontSize: '15px', color: 'var(--color-moss)' }}>
            特別なひとときとおもてなし
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {experiences.map((exp) => (
            <div
              key={exp.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 12px 30px rgba(0,0,0,0.04)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 18px 40px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.04)';
              }}
            >
              {exp.image && (
                <div style={{ width: '100%', height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={exp.image}
                    alt={exp.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(32, 35, 33, 0.9)',
                      color: 'var(--color-rice-paper)',
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '2px',
                    }}
                  >
                    {exp.price}
                  </div>
                </div>
              )}

              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '22px', color: 'var(--color-charcoal)' }}>
                    {exp.title}
                  </h3>
                </div>

                {exp.japaneseSubtitle && (
                  <div className="font-jp" style={{ fontSize: '13px', color: 'var(--color-moss)', marginBottom: '8px' }}>
                    {exp.japaneseSubtitle}
                  </div>
                )}

                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-bamboo)', marginBottom: '12px' }}>
                  {exp.tagline}
                </div>

                <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--color-charcoal)', opacity: 0.85, marginBottom: '20px' }}>
                  {exp.description}
                </p>

                {exp.capacity && (
                  <div style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-stone)', marginBottom: '20px' }}>
                    &bull; {exp.capacity}
                  </div>
                )}

                <button
                  onClick={() => onSelectExperience(exp.title)}
                  className="btn-zen btn-zen-outline"
                  style={{ marginTop: 'auto', width: '100%' }}
                >
                  <span>Inquire This Experience</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function TestimonialsSection() {
  const { content } = useCMS();
  const s11 = content.sections?.testimonials || {};
  const testimonials = content.testimonials || [];

  return (
    <section id="critique" className="section-shell">
      <div className="container-brutal">
        <div className="section-header-block">
          <div className="section-tag">
            SECTION 11 // {s11.eyebrow || 'CRITICAL ACCLAIM'}
          </div>
          <h2 className="section-heading">
            {s11.title || 'WORDS FROM THE TABLE.'}
          </h2>
          <p className="section-lead">
            {s11.subtitle || 'Reflections from architectural theorists, culinary journalists, and discerning patrons.'}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="brutalist-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '2rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div style={{ color: 'var(--accent-orange)', fontSize: '0.9rem', letterSpacing: '0.2em' }}>
                    ★★★★★
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {t.review_date}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.15rem',
                    lineHeight: 1.5,
                    color: 'var(--text-primary)',
                    marginBottom: '1.5rem',
                    fontStyle: 'normal',
                  }}
                >
                  "{t.review_text}"
                </p>
              </div>

              <div
                style={{
                  borderTop: '1px solid var(--border-steel)',
                  paddingTop: '1rem',
                }}
              >
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.95rem' }}>
                  {t.guest_name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-orange)', marginTop: '0.2rem' }}>
                  {t.source}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function TestimonialsSection() {
  const { content } = useCMS();
  const testSection = content?.sections?.testimonials || {};
  const reviews = content?.testimonials || [];

  return (
    <section id="testimonials" className="section-shell">
      <div className="container-tropical">
        {/* Section Header */}
        <div className="section-header-block" style={{ maxWidth: '820px' }}>
          <span className="section-tag">
            {testSection.eyebrow || 'GUEST EXPERIENCES'}
          </span>
          <h2 className="section-heading">
            {testSection.title || 'MOMENTS WORTH SHARING.'}
          </h2>
          <p className="section-lead">
            {testSection.subtitle ||
              'Reflections from food enthusiasts, architectural critics, and discerning travelers.'}
          </p>
        </div>

        {/* Reviews Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {reviews.map((rev) => (
            <div
              key={rev.id || rev.guest_name}
              className="tropical-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* 5 Stars */}
                <div style={{ color: 'var(--accent-citrus)', fontSize: '1.1rem', marginBottom: '1.25rem' }}>
                  {'★'.repeat(rev.rating || 5)}
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    fontStyle: 'italic',
                    color: 'var(--text-ivory)',
                    lineHeight: 1.5,
                    marginBottom: '1.75rem',
                  }}
                >
                  "{rev.review_text}"
                </p>
              </div>

              <div
                style={{
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-botanical)',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.2rem',
                      color: 'var(--text-ivory)',
                      lineHeight: 1.2,
                    }}
                  >
                    {rev.guest_name}
                  </h4>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.8rem',
                      color: 'var(--accent-terracotta)',
                    }}
                  >
                    {rev.source}
                  </span>
                </div>

                {rev.review_date && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--sage-mist)',
                    }}
                  >
                    {rev.review_date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

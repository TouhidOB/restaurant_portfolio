import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S12_Testimonials() {
  const { content, t, lang } = useCMS();
  const test = content?.testimonials || {};

  const subtitle = t(test.subtitle) || 'Guest Stories & Reviews';
  const title = t(test.title) || 'What Our Diners Say';
  const reviews = test.reviews || [];

  return (
    <section
      id="testimonials"
      aria-label="Guest Testimonials & Praise"
      style={{
        padding: '120px 0',
        backgroundColor: '#F4EBDD',
        color: 'var(--color-charcoal, #242321)',
        borderTop: '1px solid rgba(177, 138, 84, 0.25)',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-terracotta, #A6533B)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {subtitle}
          </div>
          <h2
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: 'var(--color-indigo, #26344A)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h2>
        </div>

        {/* Reviews 3-Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '30px',
          }}
        >
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '3px',
                border: '1px solid rgba(177, 138, 84, 0.28)',
                padding: '36px 30px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              }}
            >
              {/* Star Rating */}
              <div style={{ color: 'var(--color-terracotta, #A6533B)', fontSize: '16px', marginBottom: '16px' }}>
                {'★'.repeat(rev.rating || 5)}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
                  fontSize: '18px',
                  fontStyle: 'italic',
                  lineHeight: 1.65,
                  color: 'var(--color-indigo, #26344A)',
                  marginBottom: '24px',
                  flex: 1,
                }}
              >
                "{t(rev.quote)}"
              </p>

              {/* Author Info */}
              <div
                style={{
                  borderTop: '1px solid rgba(177, 138, 84, 0.2)',
                  paddingTop: '16px',
                }}
              >
                <div
                  style={{
                    fontFamily: lang === 'bn' ? 'var(--font-bengali-body)' : 'var(--font-body)',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--color-charcoal, #242321)',
                  }}
                >
                  {rev.author}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-brass, #B18A54)',
                    marginTop: '2px',
                  }}
                >
                  {t(rev.role)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

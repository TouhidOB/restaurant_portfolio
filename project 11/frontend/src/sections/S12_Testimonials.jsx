import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S12_Testimonials() {
  const { content } = useCMS();
  const test = content?.testimonials || {};
  const reviews = test.reviews || [];

  return (
    <section
      id="testimonials"
      aria-label="Community Testimonials"
      style={{
        padding: '120px 0',
        backgroundColor: '#FAF7F0',
        color: '#292D29',
        borderTop: '1px solid var(--color-border)',
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
              color: 'var(--color-copper, #A87958)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {test.subtitle || 'GUEST REFLECTIONS'}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: 'var(--color-forest)',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {test.title || 'Words From Our Community'}
          </h2>
        </div>

        {/* 3 Review Cards */}
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
                border: '1px solid rgba(38, 63, 53, 0.15)',
                padding: '36px 30px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 6px 20px rgba(38, 63, 53, 0.04)',
              }}
            >
              {/* Star Rating */}
              <div style={{ color: 'var(--color-copper)', fontSize: '15px', marginBottom: '16px' }}>
                {'★'.repeat(rev.rating || 5)}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '18px',
                  fontStyle: 'italic',
                  lineHeight: 1.65,
                  color: 'var(--color-forest)',
                  marginBottom: '24px',
                  flex: 1,
                }}
              >
                "{rev.quote}"
              </p>

              {/* Author */}
              <div style={{ borderTop: '1px solid rgba(38, 63, 53, 0.1)', paddingTop: '16px' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 700, color: '#292D29' }}>
                  {rev.author}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-olive)', marginTop: '2px' }}>
                  {rev.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

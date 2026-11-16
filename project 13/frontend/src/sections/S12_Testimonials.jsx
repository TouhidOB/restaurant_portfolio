import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S12_Testimonials() {
  const { content } = useCMS();
  const testData = content?.editorial_sections?.s12_testimonials || {
    badge: "COMMUNITY BUZZ",
    title: "What Street Foodies Are Saying",
    description: "Honest reviews from Seoul locals, night owls, and international travelers."
  };

  const testimonials = content.testimonials || [];

  return (
    <section id="testimonials" className="editorial-section" style={{ backgroundColor: '#0C0E11' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {testData.badge}
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
            {testData.title}
          </h2>
          <p style={{ color: 'var(--color-silver)', fontSize: '1rem', lineHeight: 1.7 }}>
            {testData.description}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              style={{
                backgroundColor: 'var(--color-charcoal)',
                borderRadius: '12px',
                padding: '38px 32px',
                border: '1px solid var(--color-border)',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                <div style={{ color: 'var(--color-amber)', fontSize: '1.2rem', marginBottom: '14px', letterSpacing: '2px' }}>
                  ★★★★★
                </div>

                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.25rem',
                    color: '#FFFFFF',
                    lineHeight: 1.6,
                    marginBottom: '24px',
                  }}
                >
                  "{t.quote}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-cyan)' }}>
                  {t.author}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-silver)', marginTop: '2px' }}>
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

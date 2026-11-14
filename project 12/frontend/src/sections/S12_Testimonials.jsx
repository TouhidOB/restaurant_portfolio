import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S12_Testimonials() {
  const { content } = useCMS();
  const testData = content?.editorial_sections?.s12_testimonials || {
    badge: "CRITICAL RECOGNITION",
    title: "Words from Critics & Patrons",
    description: "Honoring the artistry and tranquility experienced at our Cap-Ferrat estate."
  };

  const testimonials = content.testimonials || [];

  return (
    <section className="editorial-section" style={{ backgroundColor: 'var(--c-limestone-light)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {testData.badge}
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
            {testData.title}
          </h2>
          <p style={{ color: '#595752', fontSize: '1rem', lineHeight: 1.7 }}>
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
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '40px 32px',
                border: '1px solid var(--c-border)',
                boxShadow: '0 8px 30px rgba(38, 58, 72, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                <div style={{ color: '#F59E0B', fontSize: '1.2rem', marginBottom: '14px', letterSpacing: '2px' }}>
                  ★★★★★
                </div>

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.35rem',
                    fontStyle: 'italic',
                    color: 'var(--c-navy)',
                    lineHeight: 1.6,
                    marginBottom: '24px',
                  }}
                >
                  "{t.quote}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--c-border-light)', paddingTop: '16px' }}>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--c-charcoal)' }}>
                  {t.author}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--c-terracotta)', fontWeight: 600 }}>
                  {t.source_title}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

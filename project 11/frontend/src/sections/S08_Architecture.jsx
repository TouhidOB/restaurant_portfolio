import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S08_Architecture() {
  const { content } = useCMS();
  const arch = content?.architecture || {};
  const features = arch.features || [];

  return (
    <section
      id="architecture"
      aria-label="Conservatory Architecture and Craft"
      style={{
        padding: '120px 0',
        backgroundColor: '#FAF7F0',
        color: '#292D29',
        position: 'relative',
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
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px auto' }}>
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
            {arch.subtitle || 'DESIGN & SUSTAINABILITY'}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 600,
              color: 'var(--color-forest)',
              lineHeight: 1.2,
              marginBottom: '18px',
            }}
          >
            {arch.title || 'The Architecture of the Glass Conservatory'}
          </h2>
          {arch.quote && (
            <blockquote
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontStyle: 'italic',
                color: 'var(--color-charcoal)',
                lineHeight: 1.6,
                margin: '0 0 8px 0',
              }}
            >
              "{arch.quote}"
            </blockquote>
          )}
          {arch.quote_author && (
            <div style={{ fontSize: '12px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-olive)', fontWeight: 600 }}>
              — {arch.quote_author}
            </div>
          )}
        </div>

        {/* 2-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Architectural Image */}
          <div
            style={{
              borderRadius: '3px',
              overflow: 'hidden',
              boxShadow: '0 20px 45px rgba(38, 63, 53, 0.15)',
              border: '1px solid rgba(38, 63, 53, 0.2)',
            }}
          >
            <img
              src={arch.image || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85'}
              alt="Conservatory Architecture and Daylight"
              style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* 4 Feature Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {features.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '24px 28px',
                  borderRadius: '2px',
                  border: '1px solid rgba(38, 63, 53, 0.12)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(38, 63, 53, 0.08)',
                      color: 'var(--color-forest)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, color: 'var(--color-forest)', margin: 0 }}>
                    {feat.title}
                  </h3>
                </div>
                <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: 'rgba(41, 45, 41, 0.78)', margin: '0 0 0 38px' }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S12Testimonials() {
  const { content } = useCMS();
  const test = content?.testimonials || {};
  const items = test.items || [];

  return (
    <section className="py-section" style={{ backgroundColor: '#18191B', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
          <span className="section-label">{test.subtitle || 'Ce que disent les Guides & Épicuriens'}</span>
          <h2 className="section-title">{test.title || 'Éloges & Critiques'}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {items.map((t, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#202124',
                border: '1px solid rgba(197, 164, 109, 0.3)',
                borderRadius: '8px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-editorial)', fontSize: '1.05rem', fontStyle: 'italic' }}>
                    {t.source}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--color-gold-light)', fontWeight: 600 }}>
                    {t.rating}
                  </span>
                </div>
                <blockquote
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontStyle: 'italic',
                    fontSize: '1.15rem',
                    color: 'var(--color-ivory)',
                    lineHeight: '1.7',
                    marginBottom: '1.75rem',
                  }}
                >
                  « {t.quote} »
                </blockquote>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-taupe)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem' }}>
                — {t.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

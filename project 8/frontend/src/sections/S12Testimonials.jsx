import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S12Testimonials() {
  const { content } = useCMS();
  const test = content?.testimonials || {};
  const items = test.items || [];

  return (
    <section className="py-section" style={{ backgroundColor: 'var(--color-graphite)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="section-label">{test.subtitle || 'Honest Feedback From Our Community'}</span>
          <h2 className="section-title">{test.title || 'Guest Reviews & Social Proof'}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {items.map((t, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-black-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ color: 'var(--color-copper)', fontFamily: 'var(--font-display)', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {t.source}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-offwhite)', fontWeight: 800, background: 'rgba(145, 77, 55, 0.4)', padding: '0.2rem 0.5rem', borderRadius: '2px' }}>
                    {t.rating}
                  </span>
                </div>
                <blockquote
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontStyle: 'italic',
                    fontSize: '1.2rem',
                    color: 'var(--color-offwhite)',
                    lineHeight: '1.7',
                    marginBottom: '1.75rem',
                  }}
                >
                  "{t.quote}"
                </blockquote>
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-steel)', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                — {t.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

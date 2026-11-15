import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ExperiencePage({ onNavigateHome, onOpenReservation }) {
  const { content } = useCMS();
  const panels = content.dining_panels || [];

  return (
    <div style={{ paddingTop: 'calc(var(--header-height, 80px) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: '#1A2F25', color: '#F6F2E9' }}>
      <div className="container-tropical">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: '#AAB9A0', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'rgba(170, 185, 160, 0.4)' }}>/</span>
          <span style={{ color: '#BC7153' }}>07. DINING EXPERIENCE</span>
        </div>

        {/* Hero Header */}
        <div style={{ borderBottom: '1px solid rgba(170, 185, 160, 0.3)', paddingBottom: '2.5rem', marginBottom: '3.5rem' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            HOSPITALITY RHYTHMS &bull; THREE SENSORY DIMENSIONS
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0.5rem 0 1rem' }}>
            SLOW DOWN. SIT BACK. ENJOY.
          </h1>
          <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#AAB9A0', maxWidth: '820px', lineHeight: 1.6 }}>
            Three immersive dimensions framing every visit to our botanical haven, designed to restore pace and deepen culinary pleasure.
          </p>
        </div>

        {/* Experience Panels Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
          {panels.map((panel, idx) => (
            <div
              key={panel.id || idx}
              style={{
                background: '#243F32',
                border: '1px solid rgba(170, 185, 160, 0.25)',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: '#14251D' }}>
                <img
                  src={panel.image_url || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'}
                  alt={panel.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {panel.spec_badge && (
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#BC7153', color: '#fff', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.65rem', borderRadius: '3px' }}>
                    {panel.spec_badge}
                  </div>
                )}
              </div>

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.6rem', fontWeight: 700, color: '#D9B84E', marginBottom: '0.4rem' }}>
                    {panel.title}
                  </h3>
                  <h4 style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: '0.9rem', color: '#AAB9A0', fontWeight: 600, marginBottom: '1rem' }}>
                    {panel.subtitle}
                  </h4>
                  <p style={{ color: '#E5D7C2', fontSize: '0.92rem', lineHeight: 1.65 }}>
                    {panel.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ background: '#243F32', border: '1px solid #BC7153', borderRadius: '8px', padding: '3.5rem 2rem', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            READY FOR UNHURRIED HOSPITALITY?
          </h3>
          <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: '0.95rem', color: '#AAB9A0', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            Reserve your table in our garden pavilions or open-air timber dining rooms.
          </p>
          <button
            onClick={onOpenReservation}
            style={{
              padding: '0.85rem 2.2rem',
              background: '#BC7153',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            REQUEST A TABLE &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

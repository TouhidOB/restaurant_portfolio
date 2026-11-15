import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function BrandPage({ onNavigateHome, onOpenReservation }) {
  const { content } = useCMS();
  const restaurant = content.restaurant || {};
  const pillars = content.pillars || [];

  return (
    <div style={{ paddingTop: 'calc(var(--header-height, 80px) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: '#1A2F25', color: '#F6F2E9' }}>
      <div className="container-tropical">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: '#AAB9A0', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'rgba(170, 185, 160, 0.4)' }}>/</span>
          <span style={{ color: '#BC7153' }}>01. BRAND MANIFESTO</span>
        </div>

        {/* Hero Banner */}
        <div style={{ borderBottom: '1px solid rgba(170, 185, 160, 0.3)', paddingBottom: '2.5rem', marginBottom: '3.5rem' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            TROPICAL MODERNISM &bull; BOTANICAL SANCTUARY
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0.5rem 0 1rem' }}>
            WHERE NATURE MEETS THE TABLE.
          </h1>
          <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#AAB9A0', maxWidth: '820px', lineHeight: 1.6 }}>
            {restaurant.tagline || 'A contemporary dining destination immersed in lush botanical landscapes, open-air timber architecture, and nature-inspired gastronomy.'}
          </p>
        </div>

        {/* Story Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '4rem', alignItems: 'center' }}>
          <div>
            <div style={{ width: '40px', height: '3px', background: '#BC7153', marginBottom: '1.5rem' }} />
            <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: '#F6F2E9' }}>
              AN ARCHITECTURE OF LIGHT, LEAF &amp; EMBERS
            </h2>
            <p style={{ color: '#E5D7C2', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '1.25rem' }}>
              Verdant was conceived as an organic oasis where the barrier between indoor architecture and lush tropical landscape gently dissolves. Floor-to-ceiling glass and reclaimed teak pavilions open directly to the warm coastal air.
            </p>
            <p style={{ color: '#E5D7C2', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Every plate is a tribute to botanical vitality: vibrant heirloom citrus, ember-roasted wild sea bass, and cold-pressed botanical infusions, shared in the dappled afternoon light of living palm groves.
            </p>
          </div>

          <div style={{ position: 'relative', minHeight: '380px', background: '#243F32', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(170, 185, 160, 0.3)' }}>
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
              alt="Verdant Botanical Sanctuary"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(26, 47, 37, 0.92)', border: '1px solid rgba(170, 185, 160, 0.3)', padding: '0.5rem 0.85rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#D9B84E', borderRadius: '4px' }}>
              PALM GROVE WAY &bull; CANOPY PAVILION
            </div>
          </div>
        </div>

        {/* Philosophy Pillars */}
        <div style={{ borderTop: '1px solid rgba(170, 185, 160, 0.3)', paddingTop: '3.5rem', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            FOUNDATIONAL VALUES
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', fontWeight: 700, margin: '0.5rem 0 2.5rem' }}>
            THE THREE BOTANICAL PILLARS
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {pillars.map((pillar, idx) => (
              <div key={idx} style={{ background: '#243F32', border: '1px solid rgba(170, 185, 160, 0.25)', borderRadius: '6px', padding: '2rem' }}>
                <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '2.2rem', fontWeight: 700, color: '#AAB9A0', marginBottom: '0.75rem', opacity: 0.6 }}>
                  0{idx + 1}
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.4rem', fontWeight: 700, color: '#D9B84E', marginBottom: '0.75rem' }}>
                  {pillar.title}
                </h3>
                <p style={{ color: '#E5D7C2', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {pillar.statement || pillar.description || pillar.body_text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#243F32', border: '1px solid #BC7153', borderRadius: '8px', padding: '3.5rem 2rem', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            RESERVE YOUR TABLE IN THE LIVING CANOPY
          </h3>
          <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: '0.95rem', color: '#AAB9A0', maxWidth: '640px', margin: '0 auto 1.75rem' }}>
            Join us for lunch beneath the sunlit palms or evening dinner illuminated by warm terracotta lantern glow.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
              BOOK A TABLE &rarr;
            </button>
            <button
              onClick={onNavigateHome}
              style={{
                padding: '0.85rem 2.2rem',
                background: 'transparent',
                border: '1px solid rgba(170, 185, 160, 0.4)',
                borderRadius: '4px',
                color: '#F6F2E9',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              RETURN TO INDEX
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

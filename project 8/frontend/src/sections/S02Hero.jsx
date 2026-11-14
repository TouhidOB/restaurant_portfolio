import React from 'react';
import HeroScene from '../components/three/HeroScene';
import { useCMS } from '../context/CMSContext';

export default function S02Hero() {
  const { content, openReservation } = useCMS();
  const hero = content?.hero || {};

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'var(--nav-height)',
        overflow: 'hidden',
        backgroundColor: '#111314',
      }}
    >
      {/* 3D WebGL Canvas Layer */}
      <HeroScene />

      {/* Cinematic Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(17, 19, 20, 0.3) 0%, rgba(17, 19, 20, 0.88) 75%, #111314 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '140px',
          background: 'linear-gradient(to top, #111314, transparent)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Foreground Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ maxWidth: '820px', textAlign: 'left', margin: '2rem 0' }}>
          {/* Eyebrow Label */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.4rem 1.1rem',
              borderRadius: '2px',
              background: 'rgba(145, 77, 55, 0.45)',
              border: '1px solid var(--color-copper)',
              backdropFilter: 'blur(10px)',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ color: 'var(--color-copper)', fontSize: '0.85rem' }}>✦</span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-offwhite)',
                fontWeight: 800,
              }}
            >
              {hero.badge_text || 'Open Fire & Wood Hearth • 1924 Warehouse'}
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7.5vw, 6.2rem)',
              lineHeight: 0.95,
              fontWeight: 700,
              color: 'var(--color-offwhite)',
              marginBottom: '1rem',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
              textShadow: '0 4px 30px rgba(0,0,0,0.6)',
            }}
          >
            {hero.title || 'BOLD FLAVORS. RAW CHARACTER.'}
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
              color: 'var(--color-copper)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.75rem',
            }}
          >
            {hero.tagline || 'Urban Kitchen • Craft Smokehouse • Open Fire'}
          </div>

          <p
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.75,
              color: 'var(--color-concrete)',
              maxWidth: '680px',
              marginBottom: '2.5rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            {hero.lead_description ||
              'A contemporary dining destination built around open flame, honest ingredients, and the raw energy of an industrial open kitchen.'}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '3.5rem' }}>
            <a href="#menu" className="btn-primary">
              <span>🔥</span>
              <span>{hero.cta_primary_text || 'Explore The Menu'}</span>
            </a>
            <a href="#tour" className="btn-secondary">
              <span>{hero.cta_secondary_text || 'Discover Our Space'}</span>
            </a>
          </div>

          {/* Key Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1.5rem',
              borderTop: '2px solid var(--color-brick)',
              paddingTop: '2rem',
              maxWidth: '720px',
            }}
          >
            {(hero.stats || [
              { number: '1924', label: 'Converted Warehouse' },
              { number: '850°', label: 'Wood-Fired Hearth' },
              { number: '45-Day', label: 'Dry-Aged Steaks' },
              { number: '180', label: 'Warehouse Seats' },
            ]).map((stat, idx) => (
              <div key={idx}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    color: 'var(--color-copper)',
                    fontWeight: 700,
                    lineHeight: 1,
                    letterSpacing: '0.04em',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--color-steel)',
                    marginTop: '0.3rem',
                    fontWeight: 700,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Down Prompt */}
      <a
        href="#story"
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '3rem',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          textDecoration: 'none',
          color: 'var(--color-concrete)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 800,
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-copper)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-concrete)')}
      >
        <span>Scroll Down</span>
        <span>↓</span>
      </a>
    </section>
  );
}

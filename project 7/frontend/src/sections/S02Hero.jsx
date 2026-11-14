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
        backgroundColor: '#202124',
      }}
    >
      {/* 3D WebGL Canvas Layer */}
      <HeroScene />

      {/* Cinematic Vignette & Radial Gradients */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(32, 33, 36, 0.25) 0%, rgba(32, 33, 36, 0.88) 75%, #202124 100%)',
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
          background: 'linear-gradient(to top, #202124, transparent)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Hero Foreground Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ maxWidth: '780px', textAlign: 'left', margin: '2rem 0' }}>
          {/* Michelin Star Distinction Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.4rem 1.1rem',
              borderRadius: '30px',
              background: 'rgba(84, 37, 47, 0.45)',
              border: '1px solid rgba(197, 164, 109, 0.45)',
              backdropFilter: 'blur(10px)',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ color: 'var(--color-gold)', fontSize: '0.85rem' }}>✦</span>
            <span
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '0.85rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-gold-light)',
                fontWeight: 600,
              }}
            >
              {hero.badge_text || 'Étoilé Michelin 2026 • Place Vendôme'}
            </span>
          </div>

          {/* Main Title & Brand Tagline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
              lineHeight: 1.05,
              fontWeight: 500,
              color: 'var(--color-ivory)',
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              textShadow: '0 4px 30px rgba(0,0,0,0.5)',
            }}
          >
            {hero.restaurant_name || "L'ÉTOILE ROYALE"}
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.2rem, 2.4vw, 1.85rem)',
              color: 'var(--color-gold)',
              fontStyle: 'italic',
              marginBottom: '1.75rem',
              letterSpacing: '0.04em',
            }}
          >
            {hero.tagline || 'Salon Gastronomique & Bar à Champagne'}
          </div>

          <p
            style={{
              fontSize: '1.08rem',
              lineHeight: 1.75,
              color: 'var(--color-ivory-dim)',
              maxWidth: '640px',
              marginBottom: '2.5rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.4)',
            }}
          >
            {hero.lead_description ||
              "L'art culinaire français sublimé au cœur d'un hôtel particulier du XVIIIe siècle. Une symphonie de haute gastronomie, de flacons d'exception et de haute discrétion parisienne."}
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '3.5rem' }}>
            <button
              onClick={() => openReservation()}
              className="btn-primary"
            >
              <span>✦</span>
              <span>{hero.cta_primary_text || 'Réserver une Table'}</span>
            </button>
            <a
              href="#carte"
              className="btn-secondary"
            >
              <span>{hero.cta_secondary_text || 'Découvrir la Carte'}</span>
            </a>
          </div>

          {/* Key Stats Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '1.5rem',
              borderTop: '1px solid rgba(197, 164, 109, 0.25)',
              paddingTop: '2rem',
              maxWidth: '680px',
            }}
          >
            {(hero.stats || [
              { number: '2', label: 'Étoiles Michelin' },
              { number: '1788', label: 'Hôtel Particulier' },
              { number: '3 200', label: 'Flacons Rares' },
              { number: '18', label: 'Tables Exclusives' },
            ]).map((stat, idx) => (
              <div key={idx}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.85rem',
                    color: 'var(--color-gold)',
                    fontWeight: 600,
                    lineHeight: 1.1,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--color-taupe)',
                    marginTop: '0.2rem',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <a
        href="#heritage"
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '3rem',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          textDecoration: 'none',
          color: 'var(--color-taupe)',
          fontSize: '0.78rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          transition: 'color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-taupe)')}
      >
        <span>Faire Défiler</span>
        <span>↓</span>
      </a>
    </section>
  );
}

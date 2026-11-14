import React, { Suspense } from 'react';
import { useCMS } from '../../context/CMSContext';
import HeroScene from '../three/HeroScene';

export default function HeroSection() {
  const { content, openReservation } = useCMS();
  const hero = content?.sections?.hero || {};
  const restaurant = content?.restaurant || {};

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--bg-midnight-deep)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'var(--header-height)',
      }}
    >
      {/* 3D WebGL Background Canvas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      >
        <Suspense
          fallback={
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'var(--bg-midnight-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--neon-cyan)' }}>
                LOADING NEON DINER...
              </span>
            </div>
          }
        >
          <HeroScene />
        </Suspense>
      </div>

      {/* Directional Gradient Veil (Guarantees Maximum Contrast & Crisp Typography on the Left) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background: `
            linear-gradient(90deg, 
              rgba(9, 15, 27, 0.98) 0%, 
              rgba(9, 15, 27, 0.92) 36%, 
              rgba(9, 15, 27, 0.72) 58%, 
              rgba(9, 15, 27, 0.25) 80%, 
              rgba(9, 15, 27, 0.08) 100%
            ),
            linear-gradient(180deg, 
              rgba(9, 15, 27, 0.75) 0%, 
              transparent 25%, 
              transparent 70%, 
              rgba(9, 15, 27, 0.98) 100%
            )
          `,
        }}
      />

      {/* Content Container */}
      <div
        className="container-diner"
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        <div style={{ maxWidth: '780px' }}>
          {/* Eyebrow & Status Chip */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <span className="section-tag" style={{ margin: 0 }}>
              {hero.eyebrow || 'EST. 1955 // A NEW KIND OF DINER'}
            </span>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(216, 58, 69, 0.18)',
                border: '1px solid var(--cherry-red)',
                borderRadius: 'var(--radius-xs)',
                padding: '0.35rem 0.65rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#FFA5AC',
                letterSpacing: '0.06em',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--cherry-red)',
                  boxShadow: '0 0 8px var(--cherry-red)',
                }}
              />
              <span>NEON DINER OPEN // SEATING AVAILABLE</span>
            </div>
          </div>

          {/* Monumental Hero Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7.5vw, 6.2rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.6), 0 0 40px rgba(67, 217, 232, 0.25)',
            }}
          >
            {restaurant.hero_heading_line1 || 'GOOD TIMES.'}
            <br />
            <span style={{ color: 'var(--cherry-red)', textShadow: '0 0 24px rgba(216, 58, 69, 0.6)' }}>
              {restaurant.hero_heading_line2 || 'GREAT TASTE.'}
            </span>
            <br />
            {restaurant.hero_heading_line3 || 'NEXT LEVEL.'}
          </h1>

          {/* Hero Supporting Text */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              color: 'var(--text-cream)',
              lineHeight: 1.6,
              maxWidth: '56ch',
              marginBottom: '2.5rem',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.6)',
            }}
          >
            {hero.subtitle ||
              restaurant.hero_supporting_text ||
              'Step into a dining experience where classic American diner culture meets contemporary flavor, chrome aesthetics, and glowing neon energy.'}
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.25rem',
              marginBottom: 'clamp(3rem, 5vw, 4.5rem)',
            }}
          >
            <a href="#menu" className="btn-cherry">
              <span>EXPLORE THE MENU</span>
              <span>↓</span>
            </a>
            <a href="#tour" className="btn-neon">
              <span>3D VIRTUAL TOUR</span>
              <span>→</span>
            </a>
            <button
              onClick={openReservation}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--neon-cyan)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0',
                textDecoration: 'underline',
              }}
            >
              <span>Instant Booth Reservation ↗</span>
            </button>
          </div>

          {/* Metrics Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1.5rem',
              borderTop: '1px solid rgba(67, 217, 232, 0.3)',
              paddingTop: '1.75rem',
              maxWidth: '620px',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {restaurant.counter_stools || '24'} STOOLS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                Chrome Counter Seating
              </span>
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--cherry-red)',
                  display: 'block',
                  lineHeight: 1,
                  textShadow: '0 0 12px rgba(216, 58, 69, 0.4)',
                }}
              >
                {restaurant.atomic_booths || '18'} BOOTHS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                Red Leather Booths
              </span>
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--neon-cyan)',
                  display: 'block',
                  lineHeight: 1,
                  textShadow: '0 0 12px rgba(67, 217, 232, 0.4)',
                }}
              >
                {restaurant.jukebox_tracks || '120'} TRACKS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                Analog Neon Jukebox
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

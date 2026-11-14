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
        backgroundColor: 'var(--bg-forest-deep)',
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
                backgroundColor: 'var(--bg-forest-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--sage-mist)' }}>
                LOADING TROPICAL PAVILION...
              </span>
            </div>
          }
        >
          <HeroScene />
        </Suspense>
      </div>

      {/* Directional Gradient Veil (Guarantees Razor-Sharp Text Visibility on the Left) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background: `
            linear-gradient(90deg, 
              rgba(26, 47, 37, 0.97) 0%, 
              rgba(26, 47, 37, 0.92) 36%, 
              rgba(26, 47, 37, 0.72) 58%, 
              rgba(26, 47, 37, 0.25) 80%, 
              rgba(26, 47, 37, 0.1) 100%
            ),
            linear-gradient(180deg, 
              rgba(26, 47, 37, 0.75) 0%, 
              transparent 25%, 
              transparent 70%, 
              rgba(26, 47, 37, 0.98) 100%
            )
          `,
        }}
      />

      {/* Content Container */}
      <div
        className="container-tropical"
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          paddingTop: 'clamp(3rem, 6vw, 5rem)',
          paddingBottom: 'clamp(3rem, 6vw, 5rem)',
        }}
      >
        <div style={{ maxWidth: '780px' }}>
          {/* Status & Eyebrow Chip */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '1.5rem',
            }}
          >
            <span className="section-tag" style={{ margin: 0 }}>
              {hero.eyebrow || 'A CONTEMPORARY DINING EXPERIENCE'}
            </span>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: 'rgba(82, 116, 90, 0.25)',
                border: '1px solid var(--botanical-green)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.35rem 0.65rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--accent-citrus)',
                letterSpacing: '0.06em',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-citrus)',
                  boxShadow: '0 0 8px var(--accent-citrus)',
                }}
              />
              <span>CANOPY PAVILION OPEN</span>
            </div>
          </div>

          {/* Monumental Hero Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(3rem, 7.5vw, 6.2rem)',
              fontWeight: 600,
              color: 'var(--text-ivory)',
              lineHeight: 1.02,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
            }}
          >
            {restaurant.hero_heading_line1 || 'WHERE'}
            <br />
            <span style={{ color: 'var(--natural-sand)' }}>
              {restaurant.hero_heading_line2 || 'NATURE MEETS'}
            </span>
            <br />
            {restaurant.hero_heading_line3 || 'THE TABLE.'}
          </h1>

          {/* Hero Supporting Text */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              color: 'var(--text-sand)',
              lineHeight: 1.6,
              maxWidth: '56ch',
              marginBottom: '2.5rem',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {hero.subtitle ||
              restaurant.hero_supporting_text ||
              'Discover a thoughtful approach to food, atmosphere, and hospitality inspired by the beauty of natural spaces. Open-air pavilions framed by broad-leaf palms and warm sunlight.'}
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
            <a href="#menu" className="btn-terracotta">
              <span>EXPLORE OUR MENU</span>
              <span>↓</span>
            </a>
            <a href="#tour" className="btn-outline-tropical">
              <span>3D VIRTUAL TOUR</span>
              <span>→</span>
            </a>
            <button
              onClick={openReservation}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent-citrus)',
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
              <span>Instant Table Reservation ↗</span>
            </button>
          </div>

          {/* Metrics & Architecture Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1.5rem',
              borderTop: '1px solid rgba(82, 116, 90, 0.5)',
              paddingTop: '1.75rem',
              maxWidth: '620px',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: 'var(--text-ivory)',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {restaurant.tables_capacity || '72'} PAX
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  color: 'var(--sage-mist)',
                  textTransform: 'uppercase',
                }}
              >
                Outdoor Canopy Capacity
              </span>
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: 'var(--accent-citrus)',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {restaurant.daily_menu_courses || '10'} COURSES
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  color: 'var(--sage-mist)',
                  textTransform: 'uppercase',
                }}
              >
                Botanical Tasting Series
              </span>
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontWeight: 600,
                  color: 'var(--accent-terracotta)',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {restaurant.botanical_varietals || '180'}+ SPECIES
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.08em',
                  color: 'var(--sage-mist)',
                  textTransform: 'uppercase',
                }}
              >
                Living Flora Sanctuary
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

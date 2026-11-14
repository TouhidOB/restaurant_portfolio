import React from 'react';
import { useCMS } from '../context/CMSContext';
import HeroScene from '../components/three/HeroScene';

export default function S02_Hero() {
  const { content, openReservation } = useCMS();
  const hero = content?.hero || {};
  const stats = hero.stats || [];

  return (
    <section
      id="hero"
      aria-label="Verdant Atrium Botanical Glasshouse Hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '110px',
        paddingBottom: '50px',
        overflow: 'hidden',
        background: '#FAF7F0',
      }}
    >
      {/* 3D Interactive Glasshouse Pavilion Canvas (Background & Right Stage) */}
      <HeroScene />

      {/* Main Content Layout Container */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          pointerEvents: 'none', // Allows clicking through empty areas to 3D canvas
        }}
      >
        {/* Editorial Glassmorphic Panel (Left-Aligned for 100% Crystal-Clear Readability) */}
        <div
          style={{
            maxWidth: '620px',
            width: '100%',
            backgroundColor: 'rgba(250, 247, 240, 0.92)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(166, 181, 160, 0.5)',
            borderRadius: '4px',
            padding: '44px 40px',
            boxShadow: '0 25px 60px rgba(26, 43, 36, 0.14)',
            pointerEvents: 'auto', // Re-enable pointer events for form/buttons
            animation: 'fadeIn 0.6s ease-out',
          }}
        >
          {/* Eyebrow Pill */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(38, 63, 53, 0.08)',
              border: '1px solid rgba(38, 63, 53, 0.25)',
              padding: '6px 14px',
              borderRadius: '2px',
              marginBottom: '18px',
            }}
          >
            <span style={{ fontSize: '13px' }}>🌿</span>
            <span
              style={{
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 700,
                color: 'var(--color-forest, #263F35)',
              }}
            >
              {hero.eyebrow || 'ARCHITECTURAL BOTANICAL CAFÉ'}
            </span>
          </div>

          {/* High-Contrast Editorial Title */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4.8vw, 56px)',
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: '-0.01em',
              color: 'var(--color-forest-dark, #1A2B24)',
              margin: '0 0 16px 0',
            }}
          >
            {hero.title || 'Sunlight, Living Flora & Artisanal Coffee.'}
          </h1>

          {/* Subtitle / Tagline */}
          {hero.tagline && (
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '17px',
                fontStyle: 'italic',
                color: 'var(--color-copper, #A87958)',
                marginBottom: '16px',
                lineHeight: 1.4,
              }}
            >
              {hero.tagline}
            </div>
          )}

          {/* Clear Lead Paragraph */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'var(--color-charcoal, #292D29)',
              margin: '0 0 28px 0',
            }}
          >
            {hero.description || 'Step into a breathtaking pavilion where double-height structural glass, soaring fiddle-leaf figs, and warm natural timber frame the finest micro-lot coffees and botanical culinary creations.'}
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            <a
              href="#menu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '13px 26px',
                backgroundColor: 'var(--color-forest, #263F35)',
                color: '#FAF7F0',
                border: 'none',
                borderRadius: '2px',
                fontSize: '12.5px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 8px 20px rgba(38, 63, 53, 0.25)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1A2B24';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-forest, #263F35)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {hero.cta_primary || 'Explore Menu'}
            </a>

            <button
              onClick={() => openReservation()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '13px 24px',
                backgroundColor: 'var(--color-copper, #A87958)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '2px',
                fontSize: '12.5px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(168, 121, 88, 0.3)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#8c5f42')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-copper, #A87958)')}
            >
              Reserve a Table
            </button>

            <a
              href="#tour"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '13px 20px',
                backgroundColor: 'transparent',
                color: 'var(--color-forest, #263F35)',
                border: '1px solid rgba(38, 63, 53, 0.35)',
                borderRadius: '2px',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(38, 63, 53, 0.08)';
                e.currentTarget.style.borderColor = 'var(--color-forest, #263F35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(38, 63, 53, 0.35)';
              }}
            >
              Virtual Tour ↗
            </a>
          </div>
        </div>

        {/* 4 Architectural & Botanical Stat Cards (Clear, High-Contrast Banner) */}
        {stats.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
              width: '100%',
              maxWidth: '920px',
              pointerEvents: 'auto',
            }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.92)',
                  border: '1px solid rgba(166, 181, 160, 0.45)',
                  padding: '16px 20px',
                  borderRadius: '3px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 6px 18px rgba(38, 63, 53, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '32px',
                    fontWeight: 700,
                    color: 'var(--color-forest, #263F35)',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: '11.5px',
                    letterSpacing: '0.04em',
                    color: 'rgba(41, 45, 41, 0.8)',
                    lineHeight: 1.35,
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

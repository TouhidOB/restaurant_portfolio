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
        paddingBottom: '70px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #E7EDE7 0%, #FAF7F0 45%, #F4F0E6 100%)',
        color: '#292D29',
      }}
    >
      {/* 3D Glasshouse Pavilion Canvas */}
      <HeroScene />

      {/* Hero Content Overlay */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
        }}
      >
        {/* Cultural Eyebrow Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(38, 63, 53, 0.08)',
            border: '1px solid rgba(38, 63, 53, 0.25)',
            padding: '6px 14px',
            borderRadius: '2px',
            marginBottom: '18px',
            backdropFilter: 'blur(6px)',
          }}
        >
          <span style={{ fontSize: '13px' }}>🌿</span>
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: 'var(--color-forest)',
            }}
          >
            {hero.eyebrow || 'ARCHITECTURAL BOTANICAL CAFÉ'}
          </span>
          <span style={{ color: 'var(--color-copper)', fontSize: '12px' }}>•</span>
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.08em',
              color: 'var(--color-olive)',
              fontWeight: 600,
            }}
          >
            Biophilic Conservatory
          </span>
        </div>

        {/* Main Title */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(38px, 6vw, 70px)',
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            color: 'var(--color-forest)',
            maxWidth: '920px',
            margin: '0 0 18px 0',
            textShadow: '0 2px 15px rgba(255, 255, 255, 0.8)',
          }}
        >
          {hero.title || 'Sunlight, Living Flora & Artisanal Coffee.'}
        </h1>

        {/* Lead Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            lineHeight: 1.7,
            color: 'rgba(41, 45, 41, 0.88)',
            maxWidth: '680px',
            margin: '0 0 32px 0',
          }}
        >
          {hero.description || 'Step into a breathtaking pavilion where double-height structural glass, soaring fiddle-leaf figs, and warm natural timber frame the finest micro-lot coffees and botanical culinary creations.'}
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '54px',
          }}
        >
          <a
            href="#menu"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 28px',
              backgroundColor: 'var(--color-forest)',
              color: '#FAF7F0',
              border: 'none',
              borderRadius: '2px',
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 10px 25px rgba(38, 63, 53, 0.25)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1A2B24';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-forest)';
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
              padding: '14px 26px',
              backgroundColor: 'var(--color-copper)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              fontSize: '13px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(168, 121, 88, 0.3)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#8c5f42')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-copper)')}
          >
            Reserve a Table
          </button>

          <a
            href="#tour"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '14px 24px',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              color: 'var(--color-forest)',
              border: '1px solid rgba(38, 63, 53, 0.25)',
              borderRadius: '2px',
              fontSize: '13px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              textDecoration: 'none',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.borderColor = 'var(--color-forest)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.75)';
              e.currentTarget.style.borderColor = 'rgba(38, 63, 53, 0.25)';
            }}
          >
            {hero.cta_secondary || 'Virtual Glasshouse Tour'}
          </a>
        </div>

        {/* 4 Architectural & Botanical Stat Cards */}
        {stats.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              width: '100%',
              maxWidth: '1050px',
              borderTop: '1px solid rgba(38, 63, 53, 0.2)',
              paddingTop: '28px',
            }}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(38, 63, 53, 0.15)',
                  padding: '18px 20px',
                  borderRadius: '2px',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '34px',
                    fontWeight: 700,
                    color: 'var(--color-forest)',
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.04em',
                    color: 'rgba(41, 45, 41, 0.75)',
                    lineHeight: 1.4,
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

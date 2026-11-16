import React from 'react';
import { useCMS } from '../context/CMSContext';
import RivieraHeroScene from '../components/three/RivieraHeroScene';

export default function S02_Hero() {
  const { content, openReservationModal } = useCMS();
  const heroData = content?.editorial_sections?.s02_hero || {
    badge: "MEDITERRANEAN COASTAL FINE DINING",
    headline: "Where Warm Limestone Meets the Azure Horizon",
    subheadline: "An architectural sanctuary perched on the cliffs of Saint-Jean-Cap-Ferrat. Experience centuries of Mediterranean hospitality, wild sea harvest, and timeless coastal beauty.",
    primary_cta: "Reserve a Table",
    secondary_cta: "Explore 3D Villa Tour",
    stats: [
      { value: "3", label: "Michelin Stars" },
      { value: "1928", label: "Estate Founded" },
      { value: "480+", label: "Riviera Cellar Vintages" },
      { value: "100%", label: "Dawn Catch & Coastal Terroir" }
    ]
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '100px',
        paddingBottom: '60px',
        overflow: 'hidden',
        backgroundColor: '#263A48',
      }}
    >
      {/* 3D WebGL Canvas Layer */}
      <RivieraHeroScene />

      {/* Hero Content Container (High Contrast Glassmorphism) */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ maxWidth: '780px' }}>
          
          <div
            style={{
              background: 'rgba(24, 37, 46, 0.78)',
              backdropFilter: 'blur(16px)',
              borderRadius: '16px',
              padding: '40px 44px',
              border: '1px solid rgba(233, 223, 207, 0.25)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
            }}
          >
            {/* Eyebrow Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'var(--c-terracotta)',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontSize: '0.76rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: '#FFD2B8',
                }}
              >
                {heroData.badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
                color: '#FFFFFF',
                lineHeight: 1.08,
                fontWeight: 600,
                letterSpacing: '-0.02em',
                marginBottom: '20px',
                textShadow: '0 2px 10px rgba(0,0,0,0.4)',
              }}
            >
              {heroData.headline}
            </h1>

            {/* Subheadline */}
            <p
              style={{
                color: '#E9DFCF',
                fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
                lineHeight: 1.7,
                marginBottom: '32px',
                maxWidth: '680px',
              }}
            >
              {heroData.subheadline}
            </p>

            {/* Call To Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <button
                onClick={openReservationModal}
                className="btn-primary"
                style={{ padding: '1rem 2.4rem', fontSize: '0.88rem' }}
              >
                {heroData.primary_cta} &rarr;
              </button>
              <a
                href="#tour"
                className="btn-outline-white"
                style={{ padding: '1rem 2.2rem', fontSize: '0.88rem' }}
              >
                {heroData.secondary_cta}
              </a>
            </div>
          </div>

          {/* Key Statistics Strip */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '16px',
              marginTop: '24px',
            }}
          >
            {heroData.stats && heroData.stats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(24, 37, 46, 0.7)',
                  backdropFilter: 'blur(10px)',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1px solid rgba(233, 223, 207, 0.15)',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: '#FFD2B8',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#A9BDB5',
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

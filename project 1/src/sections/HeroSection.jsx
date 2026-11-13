import React from 'react';
import HeroScene from '../components/three/HeroScene';
import { Calendar, Compass, ChevronDown, MapPin } from 'lucide-react';

export default function HeroSection({ heroData, onOpenReservation }) {
  const handleScrollToTour = () => {
    const tourSection = document.getElementById('tour');
    if (tourSection) {
      tourSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollNext = () => {
    const storySection = document.getElementById('story');
    if (storySection) {
      storySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#0E1617',
      }}
    >
      {/* 3D Scene Background Canvas */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      >
        <HeroScene fallbackImage={heroData.fallbackImage} />
      </div>

      {/* Cinematic Gradient Overlays to preserve text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 25% 50%, rgba(14, 22, 23, 0.88) 0%, rgba(14, 22, 23, 0.45) 55%, rgba(14, 22, 23, 0.85) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background: 'linear-gradient(to top, #17191A 0%, transparent 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Hero Editorial Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '80px',
        }}
      >
        <div style={{ maxWidth: '640px' }} className="hero-content-box">
          {/* Eyebrow */}
          <div className="eyebrow" style={{ marginBottom: '18px' }}>
            {heroData.eyebrow}
          </div>

          {/* Location Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: 'rgba(18, 59, 53, 0.65)',
              border: '1px solid var(--color-border-gold)',
              borderRadius: '2px',
              marginBottom: '20px',
              fontSize: '11px',
              letterSpacing: '0.18em',
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
            }}
          >
            <MapPin size={12} />
            <span>{heroData.locationBadge}</span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(38px, 6.2vw, 84px)',
              fontWeight: 500,
              lineHeight: 1.08,
              color: 'var(--color-pearl)',
              marginBottom: '24px',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            {heroData.title}
          </h1>

          {/* Supporting Description */}
          <p
            style={{
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              lineHeight: 1.65,
              color: 'var(--color-pearl-muted)',
              marginBottom: '36px',
              maxWidth: '540px',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
            }}
          >
            {heroData.description}
          </p>

          {/* Hero CTAs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center',
            }}
            className="hero-buttons-row"
          >
            <button
              onClick={onOpenReservation}
              className="btn-primary"
              style={{ padding: '18px 36px', fontSize: '12px' }}
            >
              <Calendar size={15} />
              <span>{heroData.primaryCta}</span>
            </button>

            <button
              onClick={handleScrollToTour}
              className="btn-secondary"
              style={{ padding: '18px 32px', fontSize: '12px' }}
            >
              <Compass size={15} />
              <span>{heroData.secondaryCta}</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator at bottom */}
        <button
          onClick={handleScrollNext}
          aria-label="Scroll to discover our story"
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-gold)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: '8px',
            opacity: 0.85,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.85'; }}
        >
          <span style={{ fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--color-pearl-muted)' }}>
            DISCOVER
          </span>
          <ChevronDown size={18} className="scroll-chevron-bounce" />
        </button>
      </div>

      <style>{`
        @keyframes subtleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .scroll-chevron-bounce {
          animation: subtleBounce 2s infinite ease-in-out;
        }
        @media (max-width: 600px) {
          .hero-buttons-row {
            flex-direction: column;
            width: 100%;
          }
          .hero-buttons-row button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

import React from 'react';
import HeroScene from '../components/three/HeroScene';
import { ArrowDown } from 'lucide-react';

export default function S02Hero({ heroData, onOpenReservation }) {
  if (!heroData) return null;

  const scrollToTour = () => {
    const el = document.getElementById('tour');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#1E201F',
      }}
    >
      {/* 3D WebGL Zen Exterior Scene */}
      <HeroScene fallbackImage={heroData.fallbackImage} />

      {/* Atmospheric Vignette Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(32, 35, 33, 0.2) 0%, rgba(20, 22, 21, 0.75) 85%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '160px',
          background: 'linear-gradient(to top, var(--color-rice-paper), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Foreground Hero Content */}
      <div
        className="zen-container"
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '920px',
          paddingTop: '60px',
          color: 'var(--color-rice-paper)',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <span className="zen-seal">相</span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--color-bamboo)',
            }}
          >
            {heroData.eyebrow}
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(44px, 8vw, var(--hero-heading-size))',
            fontWeight: 500,
            lineHeight: 1.08,
            marginBottom: '10px',
            color: '#FFFFFF',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          {heroData.title}
        </h1>

        {heroData.japaneseSubtitle && (
          <div
            className="font-jp"
            style={{
              fontSize: '18px',
              letterSpacing: '0.2em',
              color: 'var(--color-bamboo-light)',
              marginBottom: '22px',
              fontWeight: 400,
            }}
          >
            {heroData.japaneseSubtitle}
          </div>
        )}

        <p
          style={{
            fontSize: '16px',
            lineHeight: 1.8,
            color: '#E0DDD5',
            maxWidth: '680px',
            margin: '0 auto 36px',
            textShadow: '0 1px 10px rgba(0,0,0,0.4)',
          }}
        >
          {heroData.description}
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          <button
            onClick={onOpenReservation}
            className="btn-zen btn-zen-primary"
            style={{
              backgroundColor: 'var(--color-bamboo)',
              borderColor: 'var(--color-bamboo)',
              color: '#FFFFFF',
              boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
            }}
          >
            {heroData.primaryCta}
          </button>

          <button
            onClick={scrollToTour}
            className="btn-zen btn-zen-outline-light"
          >
            {heroData.secondaryCta}
          </button>
        </div>

        {/* Location Badge */}
        {heroData.locationBadge && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-stone-light)',
            }}
          >
            <span>&bull;</span>
            <span>{heroData.locationBadge}</span>
            <span>&bull;</span>
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div
        onClick={scrollToTour}
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          zIndex: 10,
          color: 'var(--color-charcoal)',
        }}
      >
        <span style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Explore
        </span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}

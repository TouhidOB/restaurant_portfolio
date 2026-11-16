import React from 'react';
import { useCMS } from '../context/CMSContext';
import HeroScene from '../components/three/HeroScene';

export default function S02_Hero() {
  const { content, openReservationModal } = useCMS();
  const heroData = content?.editorial_sections?.s02_hero || {
    eyebrow: "CONTEMPORARY KOREAN STREET CULTURE",
    title: "SEOUL STREET FLAVORS. ALL NIGHT ENERGY.",
    korean_title: "밤이 깊어질수록 더 뜨거워지는 길거리의 맛",
    description: "Discover bold Korean street food, sizzling wok-fired dishes, crispy Korean fried chicken, and ice-cold soju under glowing Seoul neons.",
    primary_cta: "EXPLORE THE MENU",
    secondary_cta: "3D VILLA TOUR",
    location_badge: "Hongdae, Seoul",
    status_badge: "Open Tonight: 17:00 – 04:00",
    stats: [
      { value: "17:00 – 04:00", label: "Late Night Hours" },
      { value: "100%", label: "Authentic Street Recipe" },
      { value: "3x", label: "Double Crispy Fry Technique" },
      { value: "24+", label: "Korean Soju & Anju Combos" }
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
        paddingTop: '90px',
        paddingBottom: '60px',
        overflow: 'hidden',
        backgroundColor: '#111316',
      }}
    >
      {/* 3D WebGL Night Street Canvas */}
      <HeroScene />

      {/* Hero Editorial Card Layer (High Contrast) */}
      <div className="container" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div style={{ maxWidth: '800px' }}>
          
          <div
            style={{
              background: 'rgba(27, 29, 34, 0.82)',
              backdropFilter: 'blur(16px)',
              borderRadius: '16px',
              padding: '40px 44px',
              border: '1px solid rgba(255, 46, 136, 0.35)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 46, 136, 0.15)',
            }}
          >
            {/* Top Badges */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '18px' }}>
              <span
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.85rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: 'var(--color-cyan)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--color-magenta)', display: 'inline-block', boxShadow: '0 0 8px var(--color-magenta)' }} />
                {heroData.eyebrow}
              </span>

              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  background: 'rgba(33, 212, 232, 0.15)',
                  color: 'var(--color-cyan)',
                  border: '1px solid rgba(33, 212, 232, 0.4)',
                  fontWeight: 700,
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {heroData.status_badge}
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(2.4rem, 5.2vw, 4.2rem)',
                color: '#FFFFFF',
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                marginBottom: '8px',
                textShadow: '0 2px 14px rgba(0,0,0,0.5)',
              }}
            >
              {heroData.title}
            </h1>

            {/* Korean Subtitle */}
            {heroData.korean_title && (
              <div
                style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                  fontWeight: 700,
                  color: 'var(--color-magenta)',
                  marginBottom: '18px',
                  textShadow: '0 0 10px rgba(255, 46, 136, 0.4)',
                }}
              >
                {heroData.korean_title}
              </div>
            )}

            {/* Description */}
            <p
              style={{
                color: 'var(--color-silver)',
                fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                lineHeight: 1.7,
                marginBottom: '32px',
                maxWidth: '680px',
              }}
            >
              {heroData.description}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              <a
                href="#menu"
                className="btn-primary"
                style={{ padding: '1rem 2.4rem', fontSize: '0.88rem' }}
              >
                {heroData.primary_cta} &rarr;
              </a>
              <a
                href="#tour"
                className="btn-secondary"
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
              marginTop: '22px',
            }}
          >
            {heroData.stats && heroData.stats.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(27, 29, 34, 0.75)',
                  backdropFilter: 'blur(10px)',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: idx % 2 === 0 ? 'var(--color-magenta)' : 'var(--color-cyan)',
                    lineHeight: 1,
                    marginBottom: '4px',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-silver)',
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
    </section>
  );
}

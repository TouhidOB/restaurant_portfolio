import React from 'react';
import { Compass, Calendar, ArrowRight, Sparkles, Anchor } from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import HeroScene from '../three/HeroScene';

export default function HeroSection() {
  const { data, setIsReservationModalOpen } = useCMS();
  const settings = data.settings || {};
  const section = data.sections?.hero || {};

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
        background: 'radial-gradient(ellipse at 70% 30%, #E8F4F8 0%, #FAF9F5 65%)',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Editorial Headline & Actions */}
          <div style={{ maxWidth: '600px' }}>
            {/* Michelin / Season Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#174A63',
                background: 'rgba(201, 221, 224, 0.4)',
                border: '1px solid #C9DDE0',
                padding: '6px 16px',
                borderRadius: '30px',
                marginBottom: '24px',
              }}
            >
              <Sparkles size={13} color="#D6A854" />
              <span>{settings.hero_badge || section.badge || 'SEASON 2026 • MEDITERRANEAN RIVIERA'}</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 4.4rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                color: '#174A63',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                marginBottom: '24px',
              }}
            >
              {settings.hero_headline || section.title || 'WHERE THE COAST MEETS THE TABLE'}
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: '1.2rem',
                lineHeight: 1.65,
                color: '#4A4E4D',
                marginBottom: '36px',
                fontWeight: 300,
              }}
            >
              {settings.hero_subheadline || section.subtitle || 'Hand-harvested Adriatic crudo, ancient olive groves, and architectural dining suspended above the azure Mediterranean.'}
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '44px' }}>
              <button
                onClick={() => setIsReservationModalOpen(true)}
                className="btn-primary"
                style={{ padding: '16px 32px', fontSize: '0.95rem' }}
              >
                <Calendar size={16} />
                <span>{settings.hero_cta_primary || 'Reserve a Table'}</span>
              </button>

              <a
                href="#tour"
                className="btn-secondary"
                style={{ padding: '16px 30px', fontSize: '0.95rem' }}
              >
                <span>{settings.hero_cta_secondary || 'Explore 3D Tour'}</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Live Metrics Pill Strip */}
            <div
              style={{
                display: 'flex',
                gap: '24px',
                paddingTop: '24px',
                borderTop: '1px solid #E4DCD0',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, color: '#174A63' }}>
                  {settings.tables_available_today || 6}
                </span>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8C8981' }}>
                  Tables Left Today
                </span>
              </div>

              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, color: '#174A63' }}>
                  {settings.daily_fresh_catches || 8}
                </span>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8C8981' }}>
                  Daily Fresh Catches
                </span>
              </div>

              <div>
                <span style={{ display: 'block', fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 600, color: '#174A63' }}>
                  38 yrs
                </span>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8C8981' }}>
                  Cliffside Heritage
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive WebGL Architectural Hero Scene */}
          <div
            style={{
              position: 'relative',
              height: '540px',
              width: '100%',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(23, 74, 99, 0.12)',
              border: '1px solid rgba(200, 182, 155, 0.5)',
              background: '#E8F3F7',
            }}
          >
            <HeroScene />

            {/* Overlay Nautical Coordinates Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '18px',
                left: '20px',
                background: 'rgba(250, 249, 245, 0.92)',
                backdropFilter: 'blur(8px)',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #D8CCB8',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#174A63',
              }}
            >
              <Anchor size={13} color="#367E94" />
              <span>{settings.coordinates_display || '40.6281° N, 14.4850° E — Mooring Berth 04'}</span>
            </div>

            {/* Orbit Hint */}
            <div
              style={{
                position: 'absolute',
                top: '18px',
                right: '20px',
                background: 'rgba(23, 74, 99, 0.8)',
                color: '#FAF9F5',
                padding: '6px 12px',
                borderRadius: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                pointerEvents: 'none',
              }}
            >
              Interactive 3D Villa
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

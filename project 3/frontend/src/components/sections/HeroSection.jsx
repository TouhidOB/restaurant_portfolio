import React from 'react';
import { Compass, Calendar, ArrowRight, Sparkles, Anchor, Waves } from 'lucide-react';
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
        paddingTop: '110px',
        paddingBottom: '70px',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 75% 25%, #E2F0F5 0%, #FAF8F4 55%, #F5F1E8 100%)',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Editorial Headline & Actions */}
          <div style={{ maxWidth: '620px' }}>
            {/* Michelin & Provenance Emblem */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#9E7B36',
                background: 'rgba(197, 160, 89, 0.12)',
                border: '1px solid rgba(197, 160, 89, 0.45)',
                padding: '7px 18px',
                borderRadius: '30px',
                marginBottom: '28px',
                fontWeight: 600,
              }}
            >
              <Sparkles size={13} color="#C5A059" />
              <span>{settings.hero_badge || section.badge || 'MICHELIN SELECTED • POSITANO CLIFFSIDE • 2026'}</span>
            </div>

            {/* Main Headline with Serif Italic Distinction */}
            <h1
              style={{
                fontSize: 'clamp(3rem, 5.8vw, 4.8rem)',
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                color: '#081721',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '26px',
              }}
            >
              Where the Coast <br />
              <em
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#C5A059',
                  textTransform: 'none',
                  letterSpacing: '0',
                }}
              >
                Meets the Table
              </em>
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: '1.22rem',
                lineHeight: 1.7,
                color: '#4A5255',
                marginBottom: '38px',
                fontWeight: 300,
              }}
            >
              {settings.hero_subheadline || section.subtitle || 'Hand-harvested Adriatic crudo, cold-pressed hillside oils, and architectural dining suspended 60 meters above the azure Mediterranean.'}
            </p>

            {/* Luxury CTAs */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <button
                onClick={() => setIsReservationModalOpen(true)}
                className="btn-gold"
                style={{ padding: '17px 36px', fontSize: '0.9rem' }}
              >
                <Calendar size={16} />
                <span>{settings.hero_cta_primary || 'Reserve a Table'}</span>
              </button>

              <a
                href="#tour"
                className="btn-marine"
                style={{ padding: '17px 34px', fontSize: '0.9rem' }}
              >
                <span>{settings.hero_cta_secondary || 'Explore 3D Tour'}</span>
                <ArrowRight size={16} />
              </a>
            </div>

            {/* Telemetry Strip with Gilded Numerals */}
            <div
              style={{
                display: 'flex',
                gap: '32px',
                paddingTop: '28px',
                borderTop: '1px solid rgba(197, 160, 89, 0.3)',
                flexWrap: 'wrap',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.2rem',
                    fontWeight: 600,
                    color: '#C5A059',
                    lineHeight: 1,
                  }}
                >
                  {settings.tables_available_today || 6}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#7A7E80',
                    marginTop: '6px',
                    display: 'block',
                  }}
                >
                  Tables Left Today
                </span>
              </div>

              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.2rem',
                    fontWeight: 600,
                    color: '#081721',
                    lineHeight: 1,
                  }}
                >
                  {settings.daily_fresh_catches || 8}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#7A7E80',
                    marginTop: '6px',
                    display: 'block',
                  }}
                >
                  Daily Sea Catches
                </span>
              </div>

              <div>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.2rem',
                    fontWeight: 600,
                    color: '#081721',
                    lineHeight: 1,
                  }}
                >
                  38 yrs
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#7A7E80',
                    marginTop: '6px',
                    display: 'block',
                  }}
                >
                  Villa Heritage
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Architectural Hero Canvas Frame */}
          <div
            style={{
              position: 'relative',
              height: '580px',
              width: '100%',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 25px 70px rgba(8, 23, 33, 0.18)',
              border: '1px solid rgba(197, 160, 89, 0.45)',
              background: 'linear-gradient(180deg, #E2EFF4 0%, #D1E5EE 100%)',
            }}
          >
            <HeroScene />

            {/* Floating Top Telemetry Badge */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(8, 23, 33, 0.82)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                color: '#DFBA73',
                padding: '7px 16px',
                borderRadius: '30px',
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                pointerEvents: 'none',
              }}
            >
              <Waves size={12} color="#C5A059" />
              <span>Interactive 3D WebGL Villa</span>
            </div>

            {/* Floating Bottom Nautical Anchor Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                background: 'rgba(252, 251, 248, 0.94)',
                backdropFilter: 'blur(10px)',
                padding: '10px 18px',
                borderRadius: '12px',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#081721',
                boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
              }}
            >
              <Anchor size={14} color="#C5A059" />
              <span>{settings.coordinates_display || '40.6281° N, 14.4850° E — Mooring Berth 04'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

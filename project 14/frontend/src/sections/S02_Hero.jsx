import React from 'react';
import HeroScene from '../components/three/HeroScene';
import { useCMS } from '../context/CMSContext';
import { ChevronDown, MapPin } from 'lucide-react';

export default function S02_Hero() {
  const { data, openReservation } = useCMS();
  const hero = data?.content?.hero || {};

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'var(--color-obsidian)'
      }}
    >
      {/* 3D WebGL Exterior Scene */}
      <HeroScene />

      {/* Hero Content Overlay Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '920px',
          textAlign: 'center',
          padding: '120px 24px 80px',
          pointerEvents: 'none'
        }}
      >
        <div style={{ pointerEvents: 'auto' }}>
          {/* Eyebrow Label */}
          <div
            className="section-eyebrow"
            style={{
              justifyContent: 'center',
              background: 'rgba(16, 16, 16, 0.75)',
              padding: '6px 16px',
              borderRadius: '2px',
              display: 'inline-flex',
              backdropFilter: 'blur(6px)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '20px'
            }}
          >
            {hero.eyebrow || 'A REFINED CONTEMPORARY STEAKHOUSE'}
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 7vw, 92px)',
              fontWeight: 500,
              letterSpacing: '1px',
              lineHeight: 1.08,
              color: 'var(--color-ivory)',
              textShadow: '0 4px 28px rgba(0,0,0,0.95)',
              marginBottom: '24px'
            }}
          >
            {hero.title || 'THE ART OF THE STEAKHOUSE.'}
          </h1>

          {/* Supporting Narrative */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.4vw, 19px)',
              color: 'var(--color-ivory)',
              maxWidth: '680px',
              margin: '0 auto 36px',
              lineHeight: 1.75,
              textShadow: '0 2px 14px rgba(0,0,0,0.9)'
            }}
          >
            {hero.description ||
              'An intimate dining destination where exceptional prime beef, custom wood-fired embers, sculptural dark architecture, and refined hospitality converge.'}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#menu" className="btn-prime">
              {hero.primaryCta || 'EXPLORE THE MENU'}
            </a>
            <a href="#tour" className="btn-secondary">
              {hero.secondaryCta || 'DISCOVER OUR SPACE'}
            </a>
          </div>

          {/* Location Badge */}
          {hero.locationLabel && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '32px',
              color: 'var(--color-champagne)',
              fontFamily: 'var(--font-heading)',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              <MapPin size={13} color="var(--color-bronze)" />
              {hero.locationLabel}
            </div>
          )}
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <a
        href="#story"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          color: 'var(--color-taupe)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          fontSize: '10px',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}
      >
        <span>Scroll to Explore</span>
        <ChevronDown size={14} />
      </a>
    </section>
  );
}

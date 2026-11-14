import React from 'react';
import { useCMS } from '../../context/CMSContext';
import HeroScene from '../three/HeroScene';

export default function HeroSection() {
  const { content } = useCMS();
  const r = content.restaurant || {};
  const s01 = content.sections?.hero || {};

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'calc(var(--header-height) + 2.5rem)',
        paddingBottom: '4.5rem',
        borderBottom: '1px solid var(--border-steel)',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-dark)',
      }}
    >
      {/* 3D WebGL Canvas Layer */}
      <HeroScene />

      {/* High-Contrast Directional Vignette Veil (Guarantees Razor-Sharp Readability on Left) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'linear-gradient(90deg, rgba(32, 33, 31, 0.98) 0%, rgba(32, 33, 31, 0.93) 40%, rgba(32, 33, 31, 0.6) 65%, rgba(32, 33, 31, 0.15) 85%, transparent 100%)',
          zIndex: 2,
        }}
      />

      {/* Secondary Bottom Fade for Seamless Transition */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '140px',
          pointerEvents: 'none',
          background: 'linear-gradient(to top, var(--bg-dark) 0%, transparent 100%)',
          zIndex: 3,
        }}
      />

      {/* Structural Brutalist Grid Lines */}
      <div className="arch-grid-lines" style={{ zIndex: 1 }} />

      <div className="container-brutal" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '780px' }}>
          {/* Status & Telemetry Eyebrow with Solid High-Contrast Backing */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
            <div
              className="section-tag"
              style={{
                marginBottom: 0,
                backgroundColor: 'rgba(24, 25, 23, 0.95)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              {s01.eyebrow || r.hero_eyebrow || 'CONTEMPORARY DINING / EST. 2021'}
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--accent-orange)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(24, 25, 23, 0.92)',
                border: '1px solid var(--border-steel)',
                padding: '0.3rem 0.75rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
              }}
            >
              <span style={{ width: '8px', height: '8px', background: 'var(--accent-orange)', display: 'inline-block' }} />
              {s01.custom_content?.status_indicator || 'CURRENT STATUS: DINING ROOM OPEN // RESERVATIONS ACTIVE'}
            </div>
          </div>

          {/* Oversized Brutalist Headline with 100% Crisp Visibility */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3.4rem, 9.8vw, 7.8rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: '#FFFFFF',
              marginBottom: '1.75rem',
              textTransform: 'uppercase',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.95)',
            }}
          >
            {r.hero_heading_line1 || 'FOOD.'}<br />
            {r.hero_heading_line2 || 'FORM.'}<br />
            <span
              style={{
                color: 'var(--accent-orange)',
                textShadow: '0 4px 24px rgba(240, 90, 40, 0.25), 0 2px 10px rgba(0, 0, 0, 0.9)',
              }}
            >
              {r.hero_heading_line3 || 'EXPRESSION.'}
            </span>
          </h1>

          {/* Supporting Narrative with Enhanced Clarity */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
              color: '#E8E6DF',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
              maxWidth: '58ch',
              textShadow: '0 2px 12px rgba(0, 0, 0, 0.85)',
            }}
          >
            {r.hero_supporting_text || s01.subtitle || 'An exploration of contemporary cuisine, bold ingredients, and architecture-inspired dining. Raw materials elevated through discipline and fire.'}
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
            <a
              href="#menu"
              className="btn-orange"
              style={{
                boxShadow: '0 6px 20px rgba(240, 90, 40, 0.35)',
              }}
            >
              {r.hero_cta_primary || 'EXPLORE THE MENU'} &rarr;
            </a>
            <a
              href="#tour"
              className="btn-outline-brutal"
              style={{
                backgroundColor: 'rgba(32, 33, 31, 0.85)',
                backdropFilter: 'blur(6px)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
              }}
            >
              {r.hero_cta_secondary || 'DISCOVER OUR SPACE'}
            </a>
          </div>

          {/* Architectural Metrics Strip with High-Contrast Solid Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '1rem',
              maxWidth: '780px',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(39, 40, 37, 0.92)',
                border: '1px solid var(--border-steel)',
                padding: '1.1rem 1.25rem',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                SEATING CAPACITY
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#FFFFFF', lineHeight: 1 }}>
                {r.tables_capacity || 54} <span style={{ fontSize: '0.85rem', color: 'var(--accent-orange)' }}>PAX</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(39, 40, 37, 0.92)',
                border: '1px solid var(--border-steel)',
                padding: '1.1rem 1.25rem',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                DAILY MENU ARC
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#FFFFFF', lineHeight: 1 }}>
                {r.daily_menu_courses || 12} <span style={{ fontSize: '0.85rem', color: 'var(--accent-orange)' }}>COURSES</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(39, 40, 37, 0.92)',
                border: '1px solid var(--border-steel)',
                padding: '1.1rem 1.25rem',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                CELLAR ARCHIVE
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#FFFFFF', lineHeight: 1 }}>
                {r.curated_vintages || 420} <span style={{ fontSize: '0.85rem', color: 'var(--accent-orange)' }}>LABELS</span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(39, 40, 37, 0.92)',
                border: '1px solid var(--border-steel)',
                padding: '1.1rem 1.25rem',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                DISTRICT COORDINATES
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--concrete-raw)', lineHeight: 1.3 }}>
                {r.coordinates_display || '40.7128° N, 74.0060° W'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

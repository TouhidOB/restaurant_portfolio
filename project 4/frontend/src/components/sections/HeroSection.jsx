import React from 'react';
import { useCMS } from '../../context/CMSContext';
import HeroScene from '../three/HeroScene';

export default function HeroSection() {
  const { content, openReservation } = useCMS();
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
        paddingTop: 'calc(var(--header-height) + 2rem)',
        paddingBottom: '4rem',
        borderBottom: '1px solid var(--border-steel)',
        overflow: 'hidden',
      }}
    >
      {/* 3D WebGL Canvas Layer */}
      <HeroScene />

      {/* Structural Brutalist Grid Lines Overlay */}
      <div className="arch-grid-lines" />

      <div className="container-brutal" style={{ position: 'relative', zIndex: 10 }}>
        {/* Status / Telemetry Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div className="section-tag" style={{ marginBottom: 0 }}>
            {s01.eyebrow || r.hero_eyebrow || 'CONTEMPORARY DINING / EST. 2021'}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-orange)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span style={{ width: '8px', height: '8px', background: 'var(--accent-orange)', display: 'inline-block' }} />
            {s01.custom_content?.status_indicator || 'CURRENT STATUS: DINING ROOM OPEN // RESERVATIONS ACTIVE'}
          </div>
        </div>

        {/* Oversized Brutalist Headline */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.2rem, 9.5vw, 7.8rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            maxWidth: '14ch',
            color: 'var(--text-primary)',
            marginBottom: '1.75rem',
            textTransform: 'uppercase',
          }}
        >
          {r.hero_heading_line1 || 'FOOD.'}<br />
          {r.hero_heading_line2 || 'FORM.'}<br />
          <span style={{ color: 'var(--concrete-raw)' }}>
            {r.hero_heading_line3 || 'EXPRESSION.'}
          </span>
        </h1>

        {/* Supporting Narrative */}
        <p
          className="section-lead"
          style={{
            marginBottom: '2.5rem',
            maxWidth: '56ch',
            fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
          }}
        >
          {r.hero_supporting_text || s01.subtitle || 'An exploration of contemporary cuisine, bold ingredients, and architecture-inspired dining.'}
        </p>

        {/* Brutalist Action CTAs */}
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
          <a href="#menu" className="btn-orange">
            {r.hero_cta_primary || 'EXPLORE THE MENU'} &rarr;
          </a>
          <a href="#tour" className="btn-outline-brutal">
            {r.hero_cta_secondary || 'DISCOVER OUR SPACE'}
          </a>
        </div>

        {/* Architectural Metrics Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            borderTop: '1px solid var(--border-steel)',
            paddingTop: '2rem',
            maxWidth: '850px',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              SEATING CAPACITY
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--text-primary)' }}>
              {r.tables_capacity || 54} <span style={{ fontSize: '0.9rem', color: 'var(--accent-orange)' }}>PAX</span>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              DAILY MENU ARC
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--text-primary)' }}>
              {r.daily_menu_courses || 12} <span style={{ fontSize: '0.9rem', color: 'var(--accent-orange)' }}>COURSES</span>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              CELLAR ARCHIVE
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--text-primary)' }}>
              {r.curated_vintages || 420} <span style={{ fontSize: '0.9rem', color: 'var(--accent-orange)' }}>LABELS</span>
            </div>
          </div>

          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              DISTRICT COORDINATES
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              {r.coordinates_display || '40.7128° N, 74.0060° W'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useCMS } from '../context/CMSContext';
import HeroScene from '../components/three/HeroScene';

export default function S02Hero() {
  const { content, openReservation } = useCMS();
  const hero = content?.hero || {};
  const stats = hero.stats || [
    { number: '220m', label: 'Elevation Above City' },
    { number: '360°', label: 'Panoramic Horizon' },
    { number: '1,200', label: 'Rare Cellar Bottles' },
    { number: '54th', label: 'Tower Crown Level' },
  ];

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 'var(--nav-height)',
        overflow: 'hidden',
      }}
    >
      {/* 3D WebGL Canvas Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      >
        <HeroScene />
      </div>

      {/* Subtle Gradient Overlays for Readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'linear-gradient(to bottom, rgba(10, 18, 29, 0.4) 0%, transparent 40%, rgba(10, 18, 29, 0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Hero Editorial Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          padding: '4rem 2rem 2rem',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '1100px',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
          <span
            style={{
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              background: 'rgba(38, 63, 90, 0.65)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-champagne)',
              fontFamily: 'var(--font-accent)',
              fontSize: '0.76rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {hero.elevation_badge || 'Level 54 • 220m Above The City'}
          </span>
          <span style={{ color: 'var(--color-twilight-slate)', fontSize: '0.8rem', fontFamily: 'var(--font-accent)' }}>
            &bull; {hero.eyebrow || 'ELEVATED ROOFTOP DINING & HORIZON LOUNGE'}
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 7vw, 6.2rem)',
            color: 'var(--color-cloud-ivory)',
            letterSpacing: '0.04em',
            lineHeight: 1.05,
            marginBottom: '1.25rem',
            textTransform: 'uppercase',
            textShadow: '0 4px 30px rgba(0,0,0,0.6)',
          }}
        >
          {hero.title || 'WHERE THE CITY TOUCHES THE SKY'}
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            color: 'var(--color-champagne-light)',
            maxWidth: '680px',
            lineHeight: 1.6,
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
          }}
        >
          "{hero.tagline || 'Elevated Urban Dining • Panoramic Rooftop Terrace • Sunset Cocktails'}"
        </p>

        <p
          style={{
            fontSize: '0.98rem',
            color: 'var(--color-cloud-ivory)',
            maxWidth: '640px',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            opacity: 0.9,
          }}
        >
          {hero.lead_description ||
            'Suspended 220 meters above the metropolis, SKYLINE unites architectural boldness, 360-degree panoramic vistas, and progressive fine dining above the clouds.'}
        </p>

        {/* Hero Calls to Action */}
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => openReservation()} className="btn-skyline-primary">
            {hero.cta_primary_text || 'Reserve A Table'}
          </button>
          <a href="#tour" className="btn-skyline-outline">
            {hero.cta_secondary_text || 'Explore Virtual Tour'} &darr;
          </a>
        </div>
      </div>

      {/* Bottom Skyline Architectural Stats Strip */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          borderTop: '1px solid var(--color-border)',
          backgroundColor: 'rgba(10, 18, 29, 0.8)',
          backdropFilter: 'blur(12px)',
          padding: '1.5rem 2rem',
        }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center',
          }}
        >
          {stats.map((st, i) => (
            <div key={i} style={{ borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.1rem',
                  color: 'var(--color-champagne)',
                  fontWeight: 600,
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                {st.number}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.74rem',
                  color: 'var(--color-twilight-slate)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

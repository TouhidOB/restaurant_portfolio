import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function StoryPage() {
  const { content, openReservation } = useCMS();
  const story = content?.brandStory || {};
  const pillars = story.pillars || [];

  return (
    <div style={{ backgroundColor: 'var(--color-midnight-dark, #0a121d)', color: 'var(--color-cloud-ivory, #F3F0E9)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 90, 0.45) 0%, var(--color-midnight-dark, #0a121d) 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">{story.subtitle || 'Level 54 Heritage & Elevation'}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', letterSpacing: '0.04em', color: 'var(--color-champagne)', margin: '0.8rem 0 1.25rem' }}>
            {story.title || 'The Art of Horizon Gastronomy'}
          </h1>
          <div className="horizon-divider horizon-divider-center" />
          <p style={{ color: 'var(--color-twilight-slate)', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {story.lead || 'Suspended 220 meters above the metropolis, SKYLINE redefines high-altitude culinary art through architectural transparency, rare vintages, and elemental fire.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Narrative & Visual Split */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div>
            <span style={{ color: 'var(--color-champagne)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.75rem' }}>
              Level 54 &bull; Horizon Tower
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', marginBottom: '1.5rem', color: 'var(--color-cloud-ivory)' }}>
              Where Sky Meets Modern Gastronomy
            </h2>
            <p style={{ color: 'var(--color-twilight-slate)', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              {story.p1 || 'Conceived as a sky-high sanctuary of glass and steel, SKYLINE was engineered to blur the boundary between metropolitan skyline and fine dining table. Every angle of the dining room was calibrated to capture the shifting twilight hues over the bay.'}
            </p>
            <p style={{ color: 'var(--color-twilight-slate)', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {story.p2 || 'Our kitchen bridges global coastal harvests with Japanese binchotan charcoal grilling and progressive French saucier techniques. Paired with our 1,400-bottle glass wine tower suspended above the central rotunda, every dinner is a choreographed horizon journey.'}
            </p>

            {story.quote && (
              <blockquote
                style={{
                  borderLeft: '3px solid var(--color-champagne)',
                  paddingLeft: '1.5rem',
                  margin: '2rem 0',
                  color: 'var(--color-champagne)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{story.quote}&rdquo;
                {story.quote_author && (
                  <footer style={{ marginTop: '0.5rem', fontSize: '0.85rem', fontFamily: 'var(--font-accent)', fontStyle: 'normal', color: 'var(--color-sunset-copper)', textTransform: 'uppercase', fontWeight: 700 }}>
                    &mdash; {story.quote_author}
                  </footer>
                )}
              </blockquote>
            )}

            <button onClick={() => openReservation()} className="btn-skyline-primary" style={{ marginTop: '1rem', padding: '0.85rem 2rem' }}>
              Reserve Horizon Table
            </button>
          </div>

          <div>
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
                <img
                  src={story.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85'}
                  alt="Skyline Horizon View"
                  style={{ width: '100%', height: '420px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pillars / Values */}
        {pillars.length > 0 && (
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '4rem', marginBottom: '5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-label">Core Pillars</span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-champagne)' }}>
                The Sky Philosophy
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--color-midnight-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    padding: '2.25rem 1.75rem',
                  }}
                >
                  <div style={{ fontSize: '1.8rem', color: 'var(--color-champagne)', marginBottom: '0.75rem' }}>
                    0{idx + 1}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-cloud-ivory)', marginBottom: '0.75rem' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                    {pillar.description || pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

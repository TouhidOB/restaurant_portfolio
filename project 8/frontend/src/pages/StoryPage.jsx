import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function StoryPage() {
  const { content, openReservation } = useCMS();
  const story = content?.brandStory || {};
  const pillars = story.pillars || [];

  return (
    <div style={{ backgroundColor: '#111314', color: 'var(--color-offwhite, #F1EEE7)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(145, 77, 55, 0.4) 0%, #111314 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '2px solid var(--color-brick, #914D37)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">{story.subtitle || 'Our Story'}</span>
          <h1 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '3.5rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
            {story.title || 'Made With Fire & Craft'}
          </h1>
          <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1.15rem', lineHeight: '1.7' }}>
            Housed inside a preserved 1920s locomotive foundry, URBAN TABLE celebrates the primordial alchemy of smoke, open flame, and uncompromised butcher craft.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Narrative & Visual Split */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div>
            <span style={{ color: 'var(--color-copper, #B87345)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.75rem' }}>
              {story.badge || 'Est. 2018 • Industrial District'}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2.4rem', textTransform: 'uppercase', marginBottom: '1.5rem', color: 'var(--color-offwhite, #F1EEE7)' }}>
              Stripped Bare To The Elemental Heat
            </h2>
            <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1.02rem', lineHeight: '1.8', marginBottom: '1.25rem' }}>
              {story.body_paragraph_1 || 'Housed inside a preserved 1920s locomotive foundry, URBAN TABLE was born from a refusal of culinary pretension. We stripped away white tablecloths and velvet ropes to expose what matters: raw red brick, heavy black steel, roaring hickory coals, and intensely honest flavors.'}
            </p>
            <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1.02rem', lineHeight: '1.8', marginBottom: '2rem' }}>
              {story.body_paragraph_2 || 'Our culinary philosophy centers on primordial heat. Whether smoking prime brisket for fourteen hours over aged post oak or charring dry-aged ribeyes on our cast-iron open hearth, our kitchen celebrates the elemental alchemy of smoke, fire, and uncompromised produce.'}
            </p>

            {story.quote && (
              <blockquote
                style={{
                  borderLeft: '3px solid var(--color-copper, #B87345)',
                  paddingLeft: '1.5rem',
                  margin: '2rem 0',
                  color: 'var(--color-offwhite, #F1EEE7)',
                  fontFamily: 'var(--font-editorial, "DM Serif Display", serif)',
                  fontSize: '1.25rem',
                  fontStyle: 'italic',
                }}
              >
                "{story.quote}"
                {story.quote_author && (
                  <footer style={{ marginTop: '0.5rem', fontSize: '0.85rem', fontFamily: 'var(--font-body, Manrope)', fontStyle: 'normal', color: 'var(--color-copper, #B87345)', textTransform: 'uppercase', fontWeight: 700 }}>
                    — {story.quote_author}
                  </footer>
                )}
              </blockquote>
            )}

            <button onClick={() => openReservation('Main Warehouse Table')} className="btn-primary" style={{ marginTop: '1rem' }}>
              Reserve At The Table
            </button>
          </div>

          <div>
            <div style={{ position: 'relative' }}>
              <div style={{ borderRadius: '2px', overflow: 'hidden', border: '2px solid var(--color-brick, #914D37)', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' }}>
                <img
                  src={story.image_main || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85'}
                  alt="Urban Table Atmosphere"
                  style={{ width: '100%', height: '420px', objectFit: 'cover' }}
                />
              </div>
              {story.image_detail && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-2rem',
                    right: '-2rem',
                    width: '240px',
                    borderRadius: '2px',
                    overflow: 'hidden',
                    border: '2px solid var(--color-copper, #B87345)',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.8)',
                    display: 'none',
                  }}
                  className="desktop-detail-img"
                >
                  <img src={story.image_detail} alt="Craft Smokehouse Detail" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* The 3 Core Pillars */}
        {pillars.length > 0 && (
          <div style={{ marginTop: '5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span className="section-label">Foundation & Tenets</span>
              <h2 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2.5rem', textTransform: 'uppercase' }}>
                Three Tenets Of Our Forge
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--color-black-card, #181A1C)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '2.5rem',
                    borderRadius: '2px',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-copper, #B87345)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ color: 'var(--color-copper, #B87345)', fontSize: '1.6rem', fontFamily: 'var(--font-display, Oswald)', fontWeight: 800, marginBottom: '0.85rem' }}>
                    0{idx + 1}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '1.45rem', textTransform: 'uppercase', marginBottom: '0.85rem' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.95rem', lineHeight: '1.7' }}>
                    {pillar.desc}
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

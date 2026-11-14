import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function IntroSection() {
  const { content } = useCMS();
  const intro = content?.sections?.intro || {};

  return (
    <section id="intro" className="section-shell cream-theme">
      <div className="container-diner">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Editorial Text */}
          <div>
            <span className="section-tag">
              {intro.eyebrow || 'EDITORIAL INTRODUCTION'}
            </span>
            <h2
              className="section-heading"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--deep-charcoal)',
                marginBottom: '1.5rem',
              }}
            >
              {intro.title || 'A CLASSIC REIMAGINED.'}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.25rem',
                lineHeight: 1.6,
                color: 'var(--deep-charcoal)',
                fontWeight: 600,
                marginBottom: '1.5rem',
              }}
            >
              {intro.subtitle ||
                'Inspired by the energy of classic diners and the imagination of tomorrow, we bring together familiar comfort and a fresh approach to dining.'}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: '#4B525E',
                marginBottom: '1.25rem',
              }}
            >
              {intro?.custom_content?.paragraph_1 ||
                'Stardust Diner reimagines the legendary American roadside eatery through a retro-futuristic lens. Polished chrome counters, curved glass facades, and hand-bent neon glow warmly under the city skyline.'}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: '#4B525E',
                marginBottom: '2rem',
              }}
            >
              {intro?.custom_content?.paragraph_2 ||
                'Every plate celebrates the spirit of nostalgic diner cooking elevated with prime dry-aged cuts, house-baked brioche, caramelized onions, and neon milkshakes mixed right before your eyes.'}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 1.25rem',
                backgroundColor: 'rgba(216, 58, 69, 0.08)',
                border: '1px solid var(--cherry-red)',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--cherry-red)',
                letterSpacing: '0.1em',
              }}
            >
              <span>★</span>
              <span>{intro?.custom_content?.badge || 'ATOMIC AGE RETRO-FUTURISM // 01'}</span>
            </div>
          </div>

          {/* Right Column: Architectural Photography Collage */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                boxShadow: '0 20px 48px rgba(32, 36, 43, 0.25)',
                border: '2px solid var(--border-cream)',
                position: 'relative',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80"
                alt="Stardust Diner Retro Architecture"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Inset Quote Card */}
            <div
              style={{
                position: 'absolute',
                bottom: '-2rem',
                right: '1rem',
                backgroundColor: '#FFFFFF',
                padding: '1.5rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid var(--border-cream)',
                boxShadow: '0 12px 32px rgba(32, 36, 43, 0.18)',
                maxWidth: '280px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--deep-charcoal)',
                  lineHeight: 1.4,
                  marginBottom: '0.5rem',
                }}
              >
                "Where mid-century roadside nostalgia meets tomorrow's flavor."
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.08em',
                  color: 'var(--cherry-red)',
                  textTransform: 'uppercase',
                  display: 'block',
                }}
              >
                STARDUST DESIGN PHILOSOPHY
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

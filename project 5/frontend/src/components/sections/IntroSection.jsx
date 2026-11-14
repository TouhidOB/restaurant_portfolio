import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function IntroSection() {
  const { content } = useCMS();
  const intro = content?.sections?.intro || {};

  return (
    <section id="intro" className="section-shell ivory-theme">
      <div className="container-tropical">
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
                fontFamily: 'var(--font-serif)',
                color: 'var(--bg-forest-deep)',
                marginBottom: '1.5rem',
              }}
            >
              {intro.title || 'A NATURAL WAY TO DINE.'}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.25rem',
                lineHeight: 1.6,
                color: '#292D29',
                fontWeight: 500,
                marginBottom: '1.5rem',
              }}
            >
              {intro.subtitle ||
                'Rooted in the pleasure of good food and meaningful hospitality, our restaurant brings together contemporary dining and an atmosphere inspired by nature.'}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: '#555C56',
                marginBottom: '1.25rem',
              }}
            >
              {intro?.custom_content?.paragraph_1 ||
                'Verdant was conceived as an organic oasis where the barrier between indoor architecture and lush tropical landscape gently dissolves. Floor-to-ceiling glass and reclaimed teak pavilions open directly to the warm coastal air.'}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: '#555C56',
                marginBottom: '2rem',
              }}
            >
              {intro?.custom_content?.paragraph_2 ||
                'Every plate is a tribute to botanical vitality: vibrant heirloom citrus, ember-roasted wild sea bass, and cold-pressed botanical infusions, shared in the dappled afternoon light of living palm groves.'}
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 1.25rem',
                backgroundColor: 'rgba(82, 116, 90, 0.12)',
                border: '1px solid var(--botanical-green)',
                borderRadius: 'var(--radius-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--botanical-green)',
                letterSpacing: '0.1em',
              }}
            >
              <span>🌿</span>
              <span>{intro?.custom_content?.badge || 'TROPICAL MODERNISM // BOTANICAL 01'}</span>
            </div>
          </div>

          {/* Right Column: Architectural Photography Collage */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: '0 20px 48px rgba(36, 63, 50, 0.16)',
                border: '1px solid var(--border-ivory)',
                position: 'relative',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
                alt="Verdant Botanical Pavilion"
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
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-ivory)',
                boxShadow: '0 12px 32px rgba(36, 63, 50, 0.12)',
                maxWidth: '280px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  color: 'var(--bg-forest-deep)',
                  lineHeight: 1.4,
                  marginBottom: '0.5rem',
                }}
              >
                "Architecture must breathe with the surrounding canopy."
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.08em',
                  color: 'var(--accent-terracotta)',
                  textTransform: 'uppercase',
                  display: 'block',
                }}
              >
                ATELIER VERDANT DESIGN PRINCIPLE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

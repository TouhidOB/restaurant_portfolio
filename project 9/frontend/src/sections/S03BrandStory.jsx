import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S03BrandStory() {
  const { content } = useCMS();
  const story = content?.brandStory || {};
  const pillars = story.pillars || [];

  return (
    <section id="story" className="section-pad" style={{ backgroundColor: 'var(--color-midnight)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Narrative Column */}
          <div>
            <span className="section-label">{story.subtitle || 'Our Story & Vision'}</span>
            <h2 className="section-title">
              {story.title || 'Culinary Artistry Above the Horizon'}
            </h2>
            <div className="horizon-divider" />

            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--color-cloud-ivory)', marginBottom: '1.5rem', opacity: 0.95 }}>
              {story.body_paragraph_1 ||
                'Conceived as an architectural sanctuary above the urban frenzy, SKYLINE transforms the traditional dining experience into an elevated sensory journey. Here, the boundary between interior luxury and the endless atmospheric sky dissolves through frameless glass facades and open-air cantilevered decks.'}
            </p>

            <p style={{ fontSize: '0.98rem', lineHeight: 1.8, color: 'var(--color-twilight-slate)', marginBottom: '2.5rem' }}>
              {story.body_paragraph_2 ||
                'Our culinary philosophy celebrates the drama of twilight. As the sun dips beneath the metropolitan skyline, our kitchen presents visionary dishes that harmonize seasonal organic harvest, pristine oceanic catches, and the world\'s most sought-after vintage reserves.'}
            </p>

            {/* Quote Block */}
            {story.quote && (
              <div
                style={{
                  borderLeft: '2px solid var(--color-champagne)',
                  paddingLeft: '1.5rem',
                  marginBottom: '2rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontStyle: 'italic',
                    color: 'var(--color-champagne-light)',
                    lineHeight: 1.5,
                    marginBottom: '0.5rem',
                  }}
                >
                  "{story.quote}"
                </p>
                {story.quote_author && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-sunset-copper)', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                    &mdash; {story.quote_author}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Architectural Imagery Column */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                position: 'relative',
              }}
            >
              <img
                src={story.image_main || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85'}
                alt="Skyline Rooftop Dining Atmosphere"
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(16, 28, 44, 0.7) 0%, transparent 60%)',
                }}
              />
            </div>

            {/* Floating Overlap Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                left: '-1.5rem',
                background: 'var(--color-midnight-card)',
                border: '1px solid var(--color-border)',
                padding: '1.25rem 1.75rem',
                borderRadius: '3px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                maxWidth: '240px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-champagne)', fontWeight: 600, lineHeight: 1 }}>
                220M
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--color-twilight-slate)', fontFamily: 'var(--font-accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.3rem' }}>
                Cantilevered Above The Boulevard
              </div>
            </div>
          </div>
        </div>

        {/* Three Architectural Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginTop: '5rem',
            paddingTop: '3.5rem',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          {pillars.map((p, i) => (
            <div
              key={i}
              style={{
                background: 'var(--color-midnight-card)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: '3px',
                padding: '2rem',
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-champagne)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border-subtle)')}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  color: 'var(--color-sunset-copper)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.75rem',
                }}
              >
                0{i + 1}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.35rem',
                  color: 'var(--color-cloud-ivory)',
                  marginBottom: '0.65rem',
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-twilight-slate)', lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

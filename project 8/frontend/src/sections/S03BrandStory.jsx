import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S03BrandStory() {
  const { content } = useCMS();
  const story = content?.brandStory || {};

  return (
    <section id="story" className="py-section" style={{ backgroundColor: 'var(--color-black)', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Left: Asymmetrical Editorial Narrative */}
          <div>
            <span className="section-label">{story.subtitle || 'Our Story'}</span>
            <h2 className="section-title">
              {story.title || 'Made With Fire & Craft'}
            </h2>

            <div className="industrial-divider" />

            <p style={{ color: 'var(--color-offwhite)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.25rem' }}>
              {story.body_paragraph_1}
            </p>

            <p style={{ color: 'var(--color-concrete)', fontSize: '0.96rem', lineHeight: '1.75', marginBottom: '2rem' }}>
              {story.body_paragraph_2}
            </p>

            {/* Chef Quote */}
            {story.quote && (
              <div
                style={{
                  borderLeft: '3px solid var(--color-brick)',
                  paddingLeft: '1.5rem',
                  marginTop: '2rem',
                  marginBottom: '2rem',
                }}
              >
                <blockquote
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontStyle: 'italic',
                    fontSize: '1.25rem',
                    color: 'var(--color-offwhite)',
                    lineHeight: '1.6',
                    marginBottom: '0.5rem',
                  }}
                >
                  "{story.quote}"
                </blockquote>
                <cite style={{ fontSize: '0.8rem', color: 'var(--color-copper)', textTransform: 'uppercase', letterSpacing: '0.12em', fontStyle: 'normal', fontWeight: 800 }}>
                  — {story.quote_author || 'Chef Marcus Vance'}
                </cite>
              </div>
            )}

            {/* 3 Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '2.5rem' }}>
              {(story.pillars || []).map((pillar, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '2px',
                      background: 'rgba(145, 77, 55, 0.3)',
                      border: '1px solid var(--color-copper)',
                      color: 'var(--color-copper)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      flexShrink: 0,
                      marginTop: '0.2rem',
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--color-offwhite)', marginBottom: '0.2rem', textTransform: 'uppercase' }}>
                      {pillar.title}
                    </h4>
                    <p style={{ color: 'var(--color-concrete)', fontSize: '0.88rem', lineHeight: '1.6' }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Raw Photography Composition */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '2px',
                overflow: 'hidden',
                border: '2px solid var(--color-brick)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
              }}
            >
              <img
                src={story.image_main || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85'}
                alt="Urban Table Interior Warehouse"
                style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Overlapping Detail Frame */}
            <div
              style={{
                position: 'absolute',
                bottom: '-2.5rem',
                left: '-2rem',
                width: '270px',
                height: '240px',
                borderRadius: '2px',
                overflow: 'hidden',
                border: '2px solid var(--color-copper)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.7)',
                display: 'none',
              }}
              className="story-floating-img"
            >
              <img
                src={story.image_detail || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85'}
                alt="Wood fire smokehouse detail"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .story-floating-img {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}

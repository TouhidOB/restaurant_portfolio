import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S03_Story() {
  const { content } = useCMS();
  const story = content?.story || {};
  const pillars = story.pillars || [];

  return (
    <section
      id="story"
      aria-label="The Greenhouse Ethos & Story"
      style={{
        padding: '120px 0',
        backgroundColor: '#FAF7F0',
        color: '#292D29',
        position: 'relative',
        borderTop: '1px solid var(--color-border-subtle)',
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-copper, #A87958)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {story.subtitle || 'THE GREENHOUSE ETHOS'}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 600,
              color: 'var(--color-forest)',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            {story.title || 'A Sanctuary Where Architecture Meets Living Nature'}
          </h2>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: 'rgba(166, 181, 160, 0.25)',
              border: '1px solid var(--color-sage)',
              borderRadius: '2px',
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: 'var(--color-forest)',
              fontWeight: 600,
            }}
          >
            {story.badge || 'Vaulted Glasshouse Architecture • Biophilic Design'}
          </div>
        </div>

        {/* Narrative Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            alignItems: 'center',
            marginBottom: '70px',
          }}
        >
          {/* Text and Quote */}
          <div>
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.8,
                color: 'rgba(41, 45, 41, 0.88)',
                marginBottom: '20px',
              }}
            >
              {story.body_1}
            </p>
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.8,
                color: 'rgba(41, 45, 41, 0.88)',
                marginBottom: '32px',
              }}
            >
              {story.body_2}
            </p>

            {story.quote && (
              <blockquote
                style={{
                  margin: 0,
                  padding: '24px 28px',
                  backgroundColor: 'rgba(38, 63, 53, 0.05)',
                  borderLeft: '4px solid var(--color-copper)',
                  borderRadius: '2px',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '19px',
                    fontStyle: 'italic',
                    color: 'var(--color-forest)',
                    lineHeight: 1.6,
                    margin: '0 0 10px 0',
                  }}
                >
                  "{story.quote}"
                </p>
                {story.quote_author && (
                  <footer
                    style={{
                      fontSize: '12px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-olive)',
                      fontWeight: 600,
                    }}
                  >
                    — {story.quote_author}
                  </footer>
                )}
              </blockquote>
            )}
          </div>

          {/* Layered Editorial Visuals */}
          <div style={{ position: 'relative', minHeight: '440px' }}>
            <div
              style={{
                width: '84%',
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(38, 63, 53, 0.15)',
                border: '1px solid rgba(38, 63, 53, 0.2)',
              }}
            >
              <img
                src={story.image_main || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85'}
                alt="Verdant Atrium Glasshouse Interior"
                style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                right: 0,
                bottom: 0,
                width: '52%',
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                border: '3px solid #FAF7F0',
              }}
            >
              <img
                src={story.image_detail || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=85'}
                alt="Specialty Pour Over under Sunlight"
                style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>

        {/* 3 Greenhouse Pillars */}
        {pillars.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              borderTop: '1px solid rgba(38, 63, 53, 0.15)',
              paddingTop: '48px',
            }}
          >
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '28px',
                  borderRadius: '2px',
                  border: '1px solid rgba(38, 63, 53, 0.12)',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.03)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(38, 63, 53, 0.08)',
                    color: 'var(--color-forest)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '15px',
                    marginBottom: '16px',
                  }}
                >
                  0{idx + 1}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'var(--color-forest)',
                    marginBottom: '8px',
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 1.65,
                    color: 'rgba(41, 45, 41, 0.78)',
                    margin: 0,
                  }}
                >
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

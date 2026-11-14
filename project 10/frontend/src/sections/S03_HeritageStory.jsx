import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S03_HeritageStory() {
  const { content, t, lang } = useCMS();
  const story = content?.brandStory || {};

  const subtitle = t(story.subtitle) || 'Our Heritage, Our Story';
  const title = t(story.title) || 'Centuries of Culinary Artistry in Every Dish';
  const badge = t(story.badge) || 'Bengal Courtyard Architecture • Terracotta & Brass';
  const p1 = t(story.body_paragraph_1) || '';
  const p2 = t(story.body_paragraph_2) || '';
  const quote = t(story.quote) || '';
  const author = t(story.quote_author) || '';
  const pillars = story.pillars || [];
  const imgMain = story.image_main || 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1200&q=85';
  const imgDetail = story.image_detail || 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=85';

  return (
    <section
      id="story"
      aria-label="Bengal Culinary Heritage Story"
      style={{
        padding: '120px 0',
        backgroundColor: 'var(--color-bg-ivory, #F4EBDD)',
        color: 'var(--color-charcoal, #242321)',
        position: 'relative',
        overflow: 'hidden',
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
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-block',
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-terracotta, #A6533B)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            {subtitle}
          </div>
          <h2
            style={{
              fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 600,
              color: 'var(--color-indigo, #26344A)',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
          >
            {title}
          </h2>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: 'rgba(177, 138, 84, 0.15)',
              border: '1px solid rgba(177, 138, 84, 0.35)',
              borderRadius: '2px',
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: 'var(--color-brass, #B18A54)',
              fontWeight: 600,
            }}
          >
            {badge}
          </div>
        </div>

        {/* Narrative Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
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
                color: 'rgba(36, 35, 33, 0.88)',
                marginBottom: '20px',
              }}
            >
              {p1}
            </p>
            <p
              style={{
                fontSize: '16px',
                lineHeight: 1.8,
                color: 'rgba(36, 35, 33, 0.88)',
                marginBottom: '32px',
              }}
            >
              {p2}
            </p>

            {/* Cultural Quote Callout */}
            {quote && (
              <blockquote
                style={{
                  margin: '0',
                  padding: '24px 28px',
                  backgroundColor: 'rgba(38, 52, 74, 0.05)',
                  borderLeft: '4px solid var(--color-terracotta, #A6533B)',
                  borderRadius: '2px',
                }}
              >
                <p
                  style={{
                    fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
                    fontSize: '19px',
                    fontStyle: 'italic',
                    color: 'var(--color-indigo, #26344A)',
                    lineHeight: 1.6,
                    margin: '0 0 10px 0',
                  }}
                >
                  "{quote}"
                </p>
                {author && (
                  <footer
                    style={{
                      fontSize: '12px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-brass, #B18A54)',
                      fontWeight: 600,
                    }}
                  >
                    — {author}
                  </footer>
                )}
              </blockquote>
            )}
          </div>

          {/* Dual Layered Visuals */}
          <div style={{ position: 'relative', minHeight: '420px' }}>
            <div
              style={{
                width: '82%',
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: '0 20px 45px rgba(0,0,0,0.18)',
                border: '1px solid rgba(177, 138, 84, 0.35)',
              }}
            >
              <img
                src={imgMain}
                alt="Bengal Heritage Dining Ritual"
                style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                right: '0',
                bottom: '0',
                width: '54%',
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0,0,0,0.22)',
                border: '3px solid var(--color-bg-ivory, #F4EBDD)',
              }}
            >
              <img
                src={imgDetail}
                alt="Padma Shorshe Ilish on Bell Metal"
                style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>

        {/* 3 Heritage Pillars */}
        {pillars.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
              borderTop: '1px solid rgba(177, 138, 84, 0.3)',
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
                  border: '1px solid rgba(177, 138, 84, 0.25)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(166, 83, 59, 0.1)',
                    color: 'var(--color-terracotta, #A6533B)',
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
                    fontFamily: lang === 'bn' ? 'var(--font-bengali-display)' : 'var(--font-display)',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'var(--color-indigo, #26344A)',
                    marginBottom: '8px',
                  }}
                >
                  {t(pillar.title)}
                </h3>
                <p
                  style={{
                    fontSize: '13.5px',
                    lineHeight: 1.65,
                    color: 'rgba(36, 35, 33, 0.78)',
                    margin: 0,
                  }}
                >
                  {t(pillar.desc)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

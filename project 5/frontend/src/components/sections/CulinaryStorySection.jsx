import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function CulinaryStorySection() {
  const { content } = useCMS();
  const culinaryStory = content?.sections?.culinary_story || {};
  const stages = content?.story_stages || [];

  return (
    <section id="story" className="section-shell sand-theme">
      <div className="container-tropical">
        {/* Section Header */}
        <div className="section-header-block" style={{ maxWidth: '820px' }}>
          <span className="section-tag">
            {culinaryStory.eyebrow || 'CULINARY STORY'}
          </span>
          <h2 className="section-heading">
            {culinaryStory.title || 'FROM THE NATURAL WORLD TO YOUR TABLE.'}
          </h2>
          <p className="section-lead">
            {culinaryStory.subtitle ||
              'An authentic four-stage narrative tracing soil, sun, hearth, and palate through contemporary craft.'}
          </p>
        </div>

        {/* 4 Story Stages Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}
        >
          {stages.map((stage) => (
            <div
              key={stage.id || stage.stage_number}
              style={{
                backgroundColor: '#F6F2E9',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid #D9CBBA',
                boxShadow: '0 8px 24px rgba(36, 63, 50, 0.08)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Stage Image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/10',
                  overflow: 'hidden',
                  backgroundColor: '#D9CBBA',
                }}
              >
                <img
                  src={stage.image_url || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'}
                  alt={stage.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    backgroundColor: 'var(--accent-terracotta)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  STAGE /{stage.stage_number}
                </span>
              </div>

              {/* Stage Content */}
              <div
                style={{
                  padding: '1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.65rem',
                      color: 'var(--bg-forest-deep)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {stage.title}
                  </h3>

                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      color: 'var(--accent-terracotta)',
                      display: 'block',
                      marginBottom: '0.85rem',
                    }}
                  >
                    {stage.subtitle}
                  </span>

                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      color: '#4B534D',
                    }}
                  >
                    {stage.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #E3D7C6',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: '#71866A',
                    letterSpacing: '0.06em',
                  }}
                >
                  STEP {stage.stage_number} OF 04 // HARVEST CYCLE
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

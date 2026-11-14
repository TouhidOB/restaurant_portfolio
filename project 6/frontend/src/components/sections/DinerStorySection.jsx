import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function DinerStorySection() {
  const { content } = useCMS();
  const dinerStory = content?.sections?.diner_story || {};
  const stages = content?.story_stages || [];

  return (
    <section id="story" className="section-shell cream-theme">
      <div className="container-diner">
        {/* Section Header */}
        <div className="section-header-block" style={{ maxWidth: '820px' }}>
          <span className="section-tag">
            {dinerStory.eyebrow || 'THE STORY BEHIND THE EXPERIENCE'}
          </span>
          <h2 className="section-heading">
            {dinerStory.title || 'A LITTLE NOSTALGIA. A LOT OF IMAGINATION.'}
          </h2>
          <p className="section-lead">
            {dinerStory.subtitle ||
              'A four-stage voyage exploring the crossroads of chrome heritage, atomic optimism, and tomorrow’s comfort flavor.'}
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
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                border: '1px solid var(--border-cream)',
                boxShadow: '0 8px 24px rgba(32, 36, 43, 0.1)',
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
                  backgroundColor: '#E4D5BE',
                }}
              >
                <img
                  src={stage.image_url || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80'}
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
                    backgroundColor: 'var(--cherry-red)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-xs)',
                    boxShadow: '0 0 10px rgba(216, 58, 69, 0.4)',
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
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.65rem',
                      color: 'var(--deep-charcoal)',
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
                      color: 'var(--cherry-red)',
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
                      color: '#484E59',
                    }}
                  >
                    {stage.description}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border-cream)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: '#775744',
                    letterSpacing: '0.06em',
                  }}
                >
                  CHAPTER {stage.stage_number} OF 04 // STARDUST HERITAGE
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Zap, Award, Flame } from 'lucide-react';

export default function S03_BrandStory() {
  const { data } = useCMS();
  const config = data.config || {};

  return (
    <section
      id="story"
      style={{
        backgroundColor: '#FFF5E6',
        padding: '100px 24px',
        borderBottom: '4px solid #171717',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div
            style={{
              display: 'inline-block',
              backgroundColor: '#2455D6',
              color: '#FFF',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 800,
              padding: '6px 16px',
              borderRadius: '999px',
              border: '2px solid #171717',
              boxShadow: '3px 3px 0 #171717',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}
          >
            CHAPTER 01 // ORIGIN STORY
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              color: '#171717',
              margin: '0 0 16px 0',
              textShadow: '3px 3px 0 #FFD928'
            }}
          >
            {config.brand_story_title || 'WE MAKE FOOD A LITTLE MORE INTERESTING.'}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-headline)',
              fontSize: '1.25rem',
              color: '#F04438',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              margin: 0
            }}
          >
            FINE DINING TECHNIQUE. STREET FOOD SOUL. COMIC BOOK DRAMA.
          </p>
        </div>

        {/* Comic Panel Layout (3 Panels) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {/* Panel 1: The Manifesto */}
          <div
            style={{
              backgroundColor: '#FFF',
              border: '4px solid #171717',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '8px 8px 0 #FFD928',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  backgroundColor: '#F04438',
                  color: '#FFF',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  border: '2px solid #171717',
                  marginBottom: '20px'
                }}
              >
                PANEL #01: THE SPARK
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: '#171717',
                  margin: '0 0 16px 0'
                }}
              >
                THE REBELLION AGAINST THE BEIGE
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: '#333',
                  margin: 0
                }}
              >
                {config.brand_story_body ||
                  'Founded at the intersection of modern graphic art and street gastronomy, POP! Food Studio was created to shatter the beige boredom of conventional dining. We believe food should be electric, joyful, and visually shocking — without ever compromising on serious culinary technique.'}
              </p>
            </div>

            <div
              style={{
                marginTop: '24px',
                borderTop: '2px dashed #171717',
                paddingTop: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: '#2455D6',
                fontWeight: 700
              }}
            >
              "FOOD SHOULD MAKE YOU SMILE BEFORE THE FIRST BITE."
            </div>
          </div>

          {/* Panel 2: The Studio Visuals */}
          <div
            style={{
              backgroundColor: '#2455D6',
              color: '#FFF',
              border: '4px solid #171717',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '8px 8px 0 #F04438',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  backgroundColor: '#FFD928',
                  color: '#171717',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  border: '2px solid #171717',
                  marginBottom: '20px'
                }}
              >
                PANEL #02: CRAFT RULES
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: '#FFF',
                  margin: '0 0 16px 0'
                }}
              >
                100% SCRATCH KITCHEN
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: '#FFF5E6',
                  margin: 0
                }}
              >
                We bake our own milk brioche buns fresh at 5:00 AM every single morning. We blend 18 signature house sauces from fermented chilies, smoked bone marrow, and seasonal citrus. We grind our custom dry-aged beef cuts in-house daily.
              </p>
            </div>

            <div
              style={{
                marginTop: '24px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}
            >
              <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '12px', borderRadius: '10px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#FFD928' }}>650°F</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>Smash Griddle Heat</div>
              </div>
              <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '12px', borderRadius: '10px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#FFD928' }}>45-Day</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>Aged Beef Blend</div>
              </div>
            </div>
          </div>

          {/* Panel 3: Comic Dialogue Bubble */}
          <div
            style={{
              backgroundColor: '#FFD928',
              border: '4px solid #171717',
              borderRadius: '20px',
              padding: '32px',
              boxShadow: '8px 8px 0 #171717',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div
                style={{
                  backgroundColor: '#171717',
                  color: '#FFD928',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  border: '2px solid #171717',
                  marginBottom: '20px'
                }}
              >
                PANEL #03: THE EXPERIENCE
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: '#171717',
                  margin: '0 0 16px 0'
                }}
              >
                IMMERSIVE DINING PLAYGROUND
              </h3>

              {/* Speech Bubble */}
              <div
                style={{
                  backgroundColor: '#FFF',
                  border: '3px solid #171717',
                  borderRadius: '16px',
                  padding: '16px 20px',
                  boxShadow: '4px 4px 0 #171717',
                  position: 'relative',
                  marginBottom: '16px'
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontStyle: 'italic',
                    fontSize: '1rem',
                    lineHeight: 1.5,
                    color: '#171717',
                    margin: 0
                  }}
                >
                  "Dining at POP! feels like walking straight into a comic book splash page where everything tastes twice as good as it looks."
                </p>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#F04438',
                    marginTop: '8px'
                  }}
                >
                  — LOS ANGELES EATS REVIEW
                </div>
              </div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-headline)',
                fontSize: '1.1rem',
                color: '#171717',
                letterSpacing: '1px',
                textAlign: 'center'
              }}
            >
              VISIT US IN THE ARTS DISTRICT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

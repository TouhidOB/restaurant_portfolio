import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Flame, Zap, Award } from 'lucide-react';

export default function S03_BrandStory() {
  const { data } = useCMS();
  const config = data.config || {};

  return (
    <section
      id="story"
      style={{
        backgroundColor: '#090A0E',
        padding: '110px 24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '56px'
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <div className="pill-badge" style={{ marginBottom: '16px', color: '#FF6B8B', borderColor: 'rgba(255, 51, 102, 0.25)' }}>
            CHAPTER 01 // ORIGIN STORY
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-1px',
              margin: '0 0 16px 0'
            }}
          >
            {config.brand_story_title || 'WE MAKE FOOD A LITTLE MORE INTERESTING.'}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#CCFF00',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              margin: 0
            }}
          >
            FINE DINING DISCIPLINE. STREET FOOD ENERGY. CONTEMPORARY ART SOUL.
          </p>
        </div>

        {/* 3 Contemporary Editorial Panels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {/* Panel 1: The Spark */}
          <div
            style={{
              background: 'linear-gradient(180deg, #13151F 0%, #0E1017 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.25s ease'
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#FF6B8B',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  marginBottom: '16px'
                }}
              >
                // 01 THE REBELLION
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#FFF',
                  letterSpacing: '-0.3px',
                  margin: '0 0 16px 0'
                }}
              >
                BEYOND THE BEIGE BISTRO
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  lineHeight: 1.7,
                  color: '#9FA5B7',
                  margin: 0
                }}
              >
                {config.brand_story_body ||
                  'Founded at the intersection of modern graphic art and street gastronomy, POP! Food Studio was created to shatter the beige boredom of conventional dining. We believe food should be electric, joyful, and visually shocking — without ever compromising on serious culinary technique.'}
              </p>
            </div>

            <div
              style={{
                marginTop: '32px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#646A7E'
              }}
            >
              "FOOD SHOULD MAKE YOU SMILE BEFORE THE FIRST BITE."
            </div>
          </div>

          {/* Panel 2: The Craft */}
          <div
            style={{
              background: 'linear-gradient(180deg, #13151F 0%, #0E1017 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.25s ease'
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#CCFF00',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  marginBottom: '16px'
                }}
              >
                // 02 SERIOUS TECHNIQUE
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#FFF',
                  letterSpacing: '-0.3px',
                  margin: '0 0 16px 0'
                }}
              >
                100% SCRATCH KITCHEN
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14.5px',
                  lineHeight: 1.7,
                  color: '#9FA5B7',
                  margin: 0
                }}
              >
                We bake our own milk brioche buns fresh at 5:00 AM every single morning. We blend 18 signature house sauces from fermented chilies, smoked bone marrow, and seasonal citrus. We grind our custom dry-aged beef cuts in-house daily.
              </p>
            </div>

            <div
              style={{
                marginTop: '32px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#CCFF00' }}>650°F</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#646A7E', textTransform: 'uppercase' }}>Smash Griddle Heat</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, color: '#CCFF00' }}>45-Day</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#646A7E', textTransform: 'uppercase' }}>Aged Custom Beef</div>
              </div>
            </div>
          </div>

          {/* Panel 3: The Dining Playground */}
          <div
            style={{
              background: 'linear-gradient(180deg, #13151F 0%, #0E1017 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '36px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.25s ease'
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: '#00F0FF',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  marginBottom: '16px'
                }}
              >
                // 03 THE PLAYGROUND
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#FFF',
                  letterSpacing: '-0.3px',
                  margin: '0 0 16px 0'
                }}
              >
                IMMERSIVE DINING ART
              </h3>

              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '18px',
                  marginBottom: '16px'
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontStyle: 'italic',
                    fontSize: '14px',
                    lineHeight: 1.6,
                    color: '#D4D4D8',
                    margin: 0
                  }}
                >
                  "Dining at POP! feels like walking straight into a contemporary gallery where everything tastes twice as good as it looks."
                </p>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: '#FF6B8B',
                    fontWeight: 700,
                    marginTop: '8px'
                  }}
                >
                  — LOS ANGELES EATS EDITORIAL
                </div>
              </div>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: '#646A7E',
                letterSpacing: '0.5px'
              }}
            >
              LOCATED IN THE HEART OF ARTS DISTRICT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

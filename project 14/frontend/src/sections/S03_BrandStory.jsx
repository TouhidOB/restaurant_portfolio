import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S03_BrandStory() {
  const { data } = useCMS();
  const story = data?.content?.brand_story || {};

  return (
    <section id="story" style={{ backgroundColor: 'var(--color-charcoal)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="section-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Column: Brand Story Editorial */}
          <div>
            <div className="section-eyebrow">
              {story.eyebrow || 'A TRADITION OF EXCEPTIONAL DINING'}
            </div>

            <h2 className="section-title">
              {story.heading || 'BEYOND THE ORDINARY DINING EXPERIENCE.'}
            </h2>

            <p style={{
              fontSize: '16px',
              color: 'var(--color-taupe)',
              lineHeight: '1.85',
              marginBottom: '20px'
            }}>
              {story.main_text ||
                'Charred & Prime was conceived as an architectural sanctuary for carnivorous connoisseurs. Combining bespoke 45-day Himalayan salt dry-aging with custom white-oak Argentine parrillaworks, we celebrate the purity of heritage cattle and prime cuts in an environment of quiet, commanding luxury.'}
            </p>

            {story.secondary_text && (
              <p style={{
                fontSize: '15px',
                color: 'var(--color-taupe)',
                lineHeight: '1.8',
                marginBottom: '28px'
              }}>
                {story.secondary_text}
              </p>
            )}

            {/* Bronze Pull Quote */}
            {story.quote && (
              <div style={{
                borderLeft: '2px solid var(--color-champagne)',
                paddingLeft: '20px',
                margin: '28px 0',
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontStyle: 'italic',
                color: 'var(--color-ivory)',
                lineHeight: '1.5'
              }}>
                "{story.quote}"
              </div>
            )}

            <div style={{ display: 'flex', gap: '32px', marginTop: '32px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--color-champagne)', fontWeight: 600 }}>
                  45
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Days Salt Dry-Aged
                </div>
              </div>
              <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--color-champagne)', fontWeight: 600 }}>
                  1,200°
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Fahrenheit Embers
                </div>
              </div>
              <div style={{ width: '1px', background: 'var(--border-subtle)' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--color-champagne)', fontWeight: 600 }}>
                  2,400
                </div>
                <div style={{ fontSize: '11px', fontFamily: 'var(--font-heading)', color: 'var(--color-taupe)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Cellared Vintages
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Photography with architectural framing */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(0,0,0,0.85)',
              border: '1px solid var(--border-subtle)'
            }}>
              <img
                src={story.featured_image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'}
                alt="Charred & Prime Heritage Cut"
                style={{
                  width: '100%',
                  height: '520px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>
            {/* Subtle decorative offset border */}
            <div style={{
              position: 'absolute',
              top: '-14px',
              right: '-14px',
              width: '100%',
              height: '100%',
              border: '1px solid var(--color-bronze)',
              borderRadius: '2px',
              zIndex: -1,
              opacity: 0.4,
              pointerEvents: 'none'
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function StoryPage({ onNavigate }) {
  const { content, openReservation } = useCMS();
  const story = content?.story || {};
  const hero = content?.hero || {};
  const pillars = story.pillars || [];

  return (
    <div style={{ backgroundColor: '#1A2B24', color: '#F4F0E6', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 53, 0.45) 0%, #1A2B24 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(166, 181, 160, 0.25)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#A87958',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {story.subtitle || 'THE GREENHOUSE ETHOS'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: '3.5rem',
              letterSpacing: '0.04em',
              color: '#F4F0E6',
              margin: '0.8rem 0 1.25rem',
            }}
          >
            {story.title || 'A Sanctuary Where Architecture Meets Living Nature'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#A87958', margin: '1rem auto' }} />
          <p style={{ color: '#D8D2C5', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {hero.description || 'Step into a breathtaking pavilion where double-height structural glass, soaring fiddle-leaf figs, and warm natural timber frame the finest micro-lot coffees and botanical culinary creations.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Narrative & Visual Split */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div>
            <span style={{ color: '#A87958', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.75rem' }}>
              {story.badge || 'Vaulted Glasshouse Architecture • Biophilic Design'}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display, "Cormorant Garamond")',
                fontSize: '2.4rem',
                marginBottom: '1.5rem',
                color: '#F4F0E6',
              }}
            >
              Where Sunlight, Living Flora &amp; Specialty Coffee Converge
            </h2>
            <p style={{ color: '#D8D2C5', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              {story.body_1 || 'Conceived as an antidote to frantic urban density, Verdant Atrium redefines the specialty café experience. Designed around a restored 19th-century glass conservatory aesthetic infused with modern Nordic minimalism, sunlight washes across lush foliage, raw limestone, and oiled oak.'}
            </p>
            <p style={{ color: '#D8D2C5', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {story.body_2 || 'Here, time slows down. Every cup of coffee is ground to order, botanical infusions are distilled in-house with herbs from our living walls, and our seasonal brunch plates celebrate local organic terroir.'}
            </p>

            {story.quote && (
              <blockquote
                style={{
                  borderLeft: '3px solid #A87958',
                  paddingLeft: '1.5rem',
                  margin: '2rem 0',
                  color: '#A6B5A0',
                  fontFamily: 'var(--font-display, "Cormorant Garamond")',
                  fontSize: '1.35rem',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{story.quote}&rdquo;
                {story.quote_author && (
                  <footer style={{ fontSize: '0.9rem', color: '#F4F0E6', marginTop: '0.5rem', fontStyle: 'normal', fontWeight: 600 }}>
                    &mdash; {story.quote_author}
                  </footer>
                )}
              </blockquote>
            )}

            <button
              onClick={() => openReservation()}
              style={{
                backgroundColor: '#A87958',
                color: '#F4F0E6',
                border: 'none',
                padding: '1rem 2.2rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#8f6445')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#A87958')}
            >
              Reserve an Atrium Table
            </button>
          </div>

          <div>
            <div
              style={{
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid rgba(166, 181, 160, 0.3)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
              }}
            >
              <img
                src={story.image_main || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=85'}
                alt="Verdant Atrium Glasshouse"
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  background: 'linear-gradient(to top, rgba(26, 43, 36, 0.95), transparent)',
                  color: '#F4F0E6',
                  fontSize: '0.9rem',
                }}
              >
                <div style={{ fontWeight: 700, color: '#A87958' }}>Botanical Arts District Sanctuary</div>
                <div style={{ color: '#D8D2C5', fontSize: '0.8rem' }}>140+ living tropical species under 18m vaulted thermal glass</div>
              </div>
            </div>
          </div>
        </div>

        {/* Foundations Pillars */}
        {pillars.length > 0 && (
          <div style={{ marginBottom: '6rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ color: '#A87958', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Core Foundations
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display, "Cormorant Garamond")',
                  fontSize: '2.5rem',
                  marginTop: '0.5rem',
                  color: '#F4F0E6',
                }}
              >
                The Three Pillars of Our Conservatory
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#1E332B',
                    border: '1px solid rgba(166, 181, 160, 0.25)',
                    padding: '2.5rem 2rem',
                    borderRadius: '4px',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display, "Cormorant Garamond")',
                      fontSize: '3rem',
                      color: 'rgba(166, 181, 160, 0.25)',
                      lineHeight: 1,
                      marginBottom: '1rem',
                      fontWeight: 700,
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', color: '#A6B5A0', marginBottom: '1rem' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ color: '#D8D2C5', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

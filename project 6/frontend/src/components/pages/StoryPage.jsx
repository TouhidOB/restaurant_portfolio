import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function StoryPage({ onNavigateHome, onNavigatePage }) {
  const { content, openReservation } = useCMS();
  const story = content?.sections?.diner_story || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const milestones = [
    {
      year: '1956',
      title: 'THE CHROME FOUNDATION',
      desc: 'Built in New Jersey by the Master Diner Car Company and delivered by rail to Chicago. A 24-stool roadside haven for factory workers and night owls.',
    },
    {
      year: '1969',
      title: 'THE SPACE RACE ERA',
      desc: 'Infused with Apollo-age optimism. The curved neon roofline and celestial starburst clock were installed, renaming the diner STARDUST.',
    },
    {
      year: '1984',
      title: 'SYNTHWAVE & MIDNIGHT CRAFT',
      desc: 'Became an iconic haven for musicians, late-night writers, and midnight artists. The vintage Wurlitzer jukebox became the room’s heartbeat.',
    },
    {
      year: '2024+',
      title: 'RETRO-FUTURIST REBIRTH',
      desc: 'Restored down to the stainless steel rivets and supercharged with chef-driven smash burgers, botanical syrups, and interactive 3D digital tours.',
    },
  ];

  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', backgroundColor: 'var(--bg-midnight-deep)' }}>
      {/* Dedicated Page Hero Banner */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(3.5rem, 6vw, 6rem) 0 4rem',
          borderBottom: '1px solid var(--border-diner)',
          background: 'linear-gradient(180deg, rgba(17, 26, 43, 0.8) 0%, rgba(9, 15, 27, 0.98) 100%)',
        }}
      >
        <div className="container-diner">
          {/* Breadcrumbs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              color: 'var(--neon-cyan)',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
                fontSize: 'inherit',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              HOME (ALL SECTIONS)
            </button>
            <span>/</span>
            <span style={{ color: 'var(--atomic-yellow)' }}>OUR DINER STORY</span>
          </div>

          <div style={{ maxWidth: '880px' }}>
            <span className="section-tag">
              ★ {story.eyebrow || 'HERITAGE & REINVENTION'}
            </span>
            <h1
              className="section-heading"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                textShadow: '0 0 24px rgba(242, 201, 76, 0.3)',
              }}
            >
              {story.title || 'THE STARDUST CHRONICLES.'}
            </h1>
            <p
              className="section-lead"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                maxWidth: '75ch',
                marginBottom: '2.5rem',
              }}
            >
              {story.subtitle ||
                'How a vintage 1950s roadside dining car was transformed into a neon-lit, atomic-age sanctuary celebrating American comfort food and forward-looking energy.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={() => onNavigatePage('architecture')} className="btn-cherry">
                <span>EXPLORE ARCHITECTURE</span>
                <span>→</span>
              </button>
              <button onClick={openReservation} className="btn-cyan">
                <span>RESERVE A BOOTH</span>
              </button>
              <button
                onClick={onNavigateHome}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-diner)',
                  color: 'var(--text-cream)',
                  padding: '0.95rem 1.75rem',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                }}
              >
                ← BACK TO HOMEPAGE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="section-shell">
        <div className="container-diner">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '3.5rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span className="section-tag">CHAPTER 01</span>
              <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                BORN ON THE EDGE OF TOMORROW
              </h2>
              <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                In 1956, diners represented pure optimism. Polished chrome surfaces, neon tubes glowing against midnight rain, and the promise of a warm plate at any hour of the night.
              </p>
              <p style={{ color: 'var(--text-cream)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                When we restored Stardust, we didn’t want a sterile museum piece. We wanted to breathe living, cinematic energy into the space—pairing mid-century Streamline Moderne curves with chef-driven culinary rigor.
              </p>

              <div
                style={{
                  padding: '1.5rem',
                  backgroundColor: 'var(--bg-surface)',
                  borderLeft: '4px solid var(--cherry-red)',
                  borderRadius: 'var(--radius-xs)',
                }}
              >
                <p style={{ fontStyle: 'italic', color: '#FFF', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  "We keep the soul of the roadside diner alive: the smell of the flattop, the hiss of seltzer, and the warmth of a place where everyone has a seat."
                </p>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon-cyan)' }}>
                  — STARDUST FOUNDING CREW
                </span>
              </div>
            </div>

            {/* Archival Photography Preview */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-diner)',
                  boxShadow: '0 20px 48px rgba(0, 0, 0, 0.5)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                  alt="Stardust Diner Archival Dining Counter"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  left: '2rem',
                  backgroundColor: 'var(--bg-midnight)',
                  border: '1px solid var(--neon-cyan)',
                  padding: '0.85rem 1.5rem',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--neon-cyan)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                }}
              >
                ARCHIVE ITEM #56-CHI-COUNTER
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-shell cream-theme">
        <div className="container-diner">
          <div className="section-header-block" style={{ maxWidth: '800px' }}>
            <span className="section-tag" style={{ borderColor: 'var(--cherry-red)', color: 'var(--cherry-red)' }}>
              TIMELINE DEEP-DIVE
            </span>
            <h2 className="section-heading" style={{ color: 'var(--deep-charcoal)' }}>
              FOUR ERAS OF EVOLUTION
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {milestones.map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '2.25rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-cream)',
                  borderTop: '4px solid var(--cherry-red)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--cherry-red)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {item.year}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: 'var(--deep-charcoal)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: '#4A5568', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function PhilosophyPage({ onNavigateHome, onNavigatePage }) {
  const { content, openReservation } = useCMS();
  const philosophy = content?.sections?.philosophy || {};
  const pillars = content?.pillars || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', backgroundColor: 'var(--bg-midnight-deep)' }}>
      {/* Dedicated Page Hero Banner */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(3.5rem, 6vw, 6rem) 0 4rem',
          borderBottom: '1px solid var(--border-diner)',
          background: 'linear-gradient(180deg, rgba(17, 26, 43, 0.8) 0%, rgba(9, 15, 27, 0.98) 100%)',
          overflow: 'hidden',
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
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--neon-cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              HOME (ALL SECTIONS)
            </button>
            <span>/</span>
            <span style={{ color: 'var(--atomic-yellow)' }}>PHILOSOPHY</span>
          </div>

          <div style={{ maxWidth: '880px' }}>
            <span className="section-tag">
              ★ {philosophy.eyebrow || 'FOUNDATIONAL CREED & CULINARY ETHOS'}
            </span>
            <h1
              className="section-heading"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                textShadow: '0 0 24px rgba(67, 217, 232, 0.25)',
              }}
            >
              {philosophy.title || 'OLD-SCHOOL SOUL. NEW-SCHOOL ENERGY.'}
            </h1>
            <p
              className="section-lead"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                maxWidth: '75ch',
                marginBottom: '2.5rem',
              }}
            >
              {philosophy.subtitle ||
                'A dedicated exploration of the principles bridging 1950s roadside diner soul and futuristic culinary imagination.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={() => onNavigatePage('menu')} className="btn-cherry">
                <span>EXPLORE THE MENU</span>
                <span>→</span>
              </button>
              <button onClick={() => onNavigatePage('signatures')} className="btn-cyan">
                <span>VIEW SIGNATURES</span>
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
                ← BACK TO FULL LANDING PAGE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Core Pillars Section */}
      <section className="section-shell">
        <div className="container-diner">
          <div className="section-header-block" style={{ maxWidth: '750px' }}>
            <span className="section-tag">PILLAR DEEP-DIVE</span>
            <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
              THE THREE ATOMIC TENETS
            </h2>
            <p className="section-lead">
              Every burger flipped, shake spun, and cocktail poured adheres strictly to our foundational manifesto.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.id || idx}
                className="diner-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2.5rem',
                  borderTop: `3px solid ${idx === 0 ? 'var(--cherry-red)' : idx === 1 ? 'var(--neon-cyan)' : 'var(--atomic-yellow)'}`,
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        color: idx === 0 ? 'var(--cherry-red)' : idx === 1 ? 'var(--neon-cyan)' : 'var(--atomic-yellow)',
                      }}
                    >
                      {pillar.number || `0${idx + 1}`}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.12em',
                        color: 'var(--text-muted)',
                      }}
                    >
                      TENET ARCHIVE
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.65rem',
                      color: '#FFFFFF',
                      marginBottom: '1rem',
                      lineHeight: 1.2,
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--text-cream)',
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '1.25rem',
                    borderTop: '1px solid rgba(36, 53, 82, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--neon-cyan)',
                  }}
                >
                  <span>✓</span>
                  <span>CERTIFIED STARDUST STANDARD</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culinary Craft Deep-Dive */}
      <section className="section-shell cream-theme">
        <div className="container-diner">
          <div className="section-header-block" style={{ maxWidth: '800px' }}>
            <span className="section-tag" style={{ borderColor: 'var(--cherry-red)', color: 'var(--cherry-red)' }}>
              CRAFT & PROVENANCE
            </span>
            <h2 className="section-heading" style={{ color: 'var(--deep-charcoal)' }}>
              THE SCIENCE OF RETRO FLAVOR
            </h2>
            <p className="section-lead" style={{ color: '#4A5568' }}>
              We do not take shortcuts. From our custom brisket and short-rib beef blend to cold-steeped milkshake bases, our kitchen is a laboratory of nostalgic comfort.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2.25rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-cream)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🥩</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--deep-charcoal)', marginBottom: '0.75rem' }}>
                500°F Cast-Chrome Searing
              </h3>
              <p style={{ color: '#4A5568', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Every patty is smashed ultra-thin with custom 10-pound weighted presses onto solid cast-chrome griddles, locking in caramelization and creating our signature lace-crisp edges.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2.25rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-cream)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🥛</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--deep-charcoal)', marginBottom: '0.75rem' }}>
                Single-Herd Organic Malts
              </h3>
              <p style={{ color: '#4A5568', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Our milkshakes start with whole Guernsey dairy cream and Madagascar vanilla bean pods, spun in restored 1958 Hamilton Beach triple mixers for unmistakable velvety density.
              </p>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2.25rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-cream)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🍞</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--deep-charcoal)', marginBottom: '0.75rem' }}>
                Scratch Potato Brioche
              </h3>
              <p style={{ color: '#4A5568', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Baked fresh twice daily before each shift. Pillow-soft, lightly sweetened with cane sugar, and toasted with clarified cultured butter on the griddle face.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA Bar */}
      <section
        style={{
          padding: '4rem 0',
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-diner)',
        }}
      >
        <div className="container-diner" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: '#FFF', marginBottom: '1rem' }}>
            READY TO TASTE THE PHILOSOPHY?
          </h2>
          <p style={{ color: 'var(--text-cream)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
            Book your table today for lunch service or late-night cosmic dining. Walk-ins are always welcomed at our stainless steel counter.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <button onClick={openReservation} className="btn-cherry">
              <span>BOOK A TABLE NOW</span>
              <span>★</span>
            </button>
            <button onClick={() => onNavigatePage('menu')} className="btn-cyan">
              <span>VIEW FULL MENU</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

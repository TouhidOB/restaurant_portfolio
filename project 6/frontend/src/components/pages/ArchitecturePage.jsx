import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';

export default function ArchitecturePage({ onNavigateHome, onNavigatePage }) {
  const { content, openReservation } = useCMS();
  const arch = content?.sections?.diner_architecture || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const materials = [
    {
      title: 'AIRCRAFT-GRADE CHROME & STAINLESS STEEL',
      spec: 'Grade 304 Polished Stainless',
      desc: 'Seamless welded countertops, ribbed paneling, and polished trim reflecting ambient neon light throughout the dining room.',
    },
    {
      title: 'HAND-BLOWN ARGON & NEON GAS TUBING',
      spec: 'Custom 12mm Glass Tubes',
      desc: 'Curved along the exterior fascia and ceiling coffers, emitting signature electric turquoise and cherry crimson spectrums.',
    },
    {
      title: 'CHECKERBOARD TERRAZZO FLOORING',
      spec: 'Natural Marble Chip Composite',
      desc: 'Diamond-ground black and cream geometric tiles evoking classic atomic-age roadside diners while enduring decades of footsteps.',
    },
    {
      title: 'TURQUOISE RIVETED VINYL BOOTHS',
      spec: 'Heavy-Duty Marine Leatherette',
      desc: 'Deep, comfortable channel-tufted banquettes engineered for long conversations, late-night milkshakes, and timeless comfort.',
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
            <span style={{ color: 'var(--atomic-yellow)' }}>ARCHITECTURE & DESIGN</span>
          </div>

          <div style={{ maxWidth: '880px' }}>
            <span className="section-tag">
              ★ {arch.eyebrow || 'SPATIAL CRAFT & ATOMIC DESIGN'}
            </span>
            <h1
              className="section-heading"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                textShadow: '0 0 24px rgba(67, 217, 232, 0.3)',
              }}
            >
              {arch.title || 'STREAMLINE MODERNE IN PURSUIT OF THE FUTURE.'}
            </h1>
            <p
              className="section-lead"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                maxWidth: '75ch',
                marginBottom: '2.5rem',
              }}
            >
              {arch.subtitle ||
                'A dedicated examination of the architectural curves, extruded metals, neon luminance, and tactile diner materials that give Stardust its timeless atmosphere.'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={() => onNavigatePage('tour')} className="btn-cherry">
                <span>LAUNCH 3D SPATIAL TOUR</span>
                <span>🚀</span>
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

      {/* Material Specifications Grid */}
      <section className="section-shell">
        <div className="container-diner">
          <div className="section-header-block" style={{ maxWidth: '750px' }}>
            <span className="section-tag">MATERIAL PALETTE</span>
            <h2 className="section-heading" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)' }}>
              FOUR CORNERSTONES OF FORM
            </h2>
            <p className="section-lead">
              Our venue is built with authentic, long-lasting industrial materials that patina beautifully over time.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {materials.map((mat, idx) => (
              <div
                key={idx}
                className="diner-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '2.25rem',
                  borderTop: '3px solid var(--neon-cyan)',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--atomic-yellow)',
                      letterSpacing: '0.12em',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    SPEC: {mat.spec}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      color: '#FFF',
                      marginBottom: '1rem',
                      lineHeight: 1.25,
                    }}
                  >
                    {mat.title}
                  </h3>
                  <p style={{ color: 'var(--text-cream)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {mat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Tour Teaser Banner */}
      <section className="section-shell cream-theme">
        <div className="container-diner" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="section-tag" style={{ borderColor: 'var(--cherry-red)', color: 'var(--cherry-red)' }}>
            VIRTUAL EXPLORATION
          </span>
          <h2 className="section-heading" style={{ color: 'var(--deep-charcoal)', marginBottom: '1.25rem' }}>
            EXPERIENCE THE INTERIOR IN REAL-TIME 3D
          </h2>
          <p className="section-lead" style={{ color: '#4A5568', margin: '0 auto 2.5rem' }}>
            Take an interactive walk through our dining room using our WebGL spatial viewer. Rotate viewpoints, inspect booth seating, and view the bar counter.
          </p>
          <button onClick={() => onNavigatePage('tour')} className="btn-cherry">
            <span>OPEN 3D TOUR VIEWER</span>
            <span>→</span>
          </button>
        </div>
      </section>
    </div>
  );
}

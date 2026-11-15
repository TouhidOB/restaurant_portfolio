import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import TourSection from '../sections/TourSection';

export default function TourPage({ onNavigateHome, onNavigatePage }) {
  const { openReservation } = useCMS();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ paddingTop: 'var(--header-height)', minHeight: '100vh', backgroundColor: 'var(--bg-midnight-deep)' }}>
      {/* Dedicated Page Hero Banner */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(3.5rem, 6vw, 6rem) 0 3rem',
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
            <span style={{ color: 'var(--atomic-yellow)' }}>3D SPATIAL TOUR</span>
          </div>

          <div style={{ maxWidth: '880px' }}>
            <span className="section-tag">
              ★ IMMERSIVE WEBGL SPATIAL VIEWER
            </span>
            <h1
              className="section-heading"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                textShadow: '0 0 24px rgba(67, 217, 232, 0.3)',
              }}
            >
              STEP INSIDE THE NEON SANCTUARY.
            </h1>
            <p
              className="section-lead"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                maxWidth: '75ch',
                marginBottom: '2rem',
              }}
            >
              Rotate the 3D camera, switch viewpoints between our turquoise booths and stainless steel counter, and discover the atmosphere before you arrive.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={openReservation} className="btn-cherry">
                <span>RESERVE A TABLE</span>
                <span>★</span>
              </button>
              <button onClick={() => onNavigatePage('architecture')} className="btn-cyan">
                <span>VIEW ARCHITECTURE SPECS</span>
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

      {/* The 3D Tour Viewer Component */}
      <TourSection />

      {/* Spatial Tips & Controls */}
      <section className="section-shell" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="container-diner">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
            }}
          >
            <div className="diner-card" style={{ padding: '1.75rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-cyan)' }}>
                CONTROL TIP 01
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#FFF', margin: '0.5rem 0' }}>
                Camera Orbit & Pan
              </h3>
              <p style={{ color: 'var(--text-cream)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Click and drag anywhere on the 3D canvas to rotate the camera 360 degrees around the dining room.
              </p>
            </div>

            <div className="diner-card" style={{ padding: '1.75rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-cyan)' }}>
                CONTROL TIP 02
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#FFF', margin: '0.5rem 0' }}>
                Zoom In & Out
              </h3>
              <p style={{ color: 'var(--text-cream)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Use your mouse scroll wheel or pinch-to-zoom on touch screens to inspect booth textures and table settings.
              </p>
            </div>

            <div className="diner-card" style={{ padding: '1.75rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--neon-cyan)' }}>
                CONTROL TIP 03
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#FFF', margin: '0.5rem 0' }}>
                Spatial Hotspots
              </h3>
              <p style={{ color: 'var(--text-cream)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Click on the floating viewpoint buttons below the 3D canvas to instantly transition to different zones of the venue.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

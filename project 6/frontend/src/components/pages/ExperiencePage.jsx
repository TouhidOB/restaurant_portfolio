import React, { useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import DinerExperienceSection from '../sections/DinerExperienceSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import GallerySection from '../sections/GallerySection';

export default function ExperiencePage({ onNavigateHome, onNavigatePage }) {
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
            <span style={{ color: 'var(--atomic-yellow)' }}>THE EXPERIENCE</span>
          </div>

          <div style={{ maxWidth: '880px' }}>
            <span className="section-tag">
              ★ ATMOSPHERE, RHYTHM & NEON HOSPITALITY
            </span>
            <h1
              className="section-heading"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                textShadow: '0 0 24px rgba(216, 58, 69, 0.25)',
              }}
            >
              LATE-NIGHT DINING, REIMAGINED.
            </h1>
            <p
              className="section-lead"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                maxWidth: '75ch',
                marginBottom: '2.5rem',
              }}
            >
              From the warm hum of the vintage jukebox to the sizzling chrome flattop and cold craft sodas, every sensory detail at Stardust is engineered for timeless delight.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={openReservation} className="btn-cherry">
                <span>BOOK A BOOTH NOW</span>
                <span>★</span>
              </button>
              <button onClick={() => onNavigatePage('menu')} className="btn-cyan">
                <span>VIEW MENU & DRINKS</span>
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

      {/* Experience Highlights Section */}
      <DinerExperienceSection />

      {/* Guest Reviews & Critic Accolades */}
      <TestimonialsSection />

      {/* Atomic Photography Archive */}
      <GallerySection />
    </div>
  );
}

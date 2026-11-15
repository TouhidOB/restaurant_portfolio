import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, Eye, ArrowRight } from 'lucide-react';

export default function TourPage({ onNavigateHome, onNavigatePage }) {
  const { config, openReservation } = useCMS();
  const viewpoints = config?.tourViewpoints || [];
  const [activeViewpoint, setActiveViewpoint] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const currentPoint = viewpoints[activeViewpoint] || viewpoints[0] || {};

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#141715', color: '#F2EFE6' }}>
      {/* Header */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 7rem) 0 4rem',
          borderBottom: '1px solid rgba(182, 161, 123, 0.25)',
          background: 'linear-gradient(180deg, rgba(26, 30, 27, 0.98) 0%, rgba(20, 23, 21, 0.98) 100%)',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#B6A17B',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(242, 239, 230, 0.7)',
                cursor: 'pointer',
                padding: 0,
                fontSize: 'inherit',
                letterSpacing: 'inherit',
                textTransform: 'inherit',
              }}
            >
              HOME (ALL SECTIONS)
            </button>
            <span>/</span>
            <span style={{ color: '#C9B896' }}>3D SPATIAL SANCTUARY TOUR</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              円 SPATIAL DISCOVERY
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display, Cormorant Garamond)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: '#F2EFE6',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              Navigate the Five Chambers of Stillness.
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.85)', maxWidth: '720px' }}>
              Explore the transition from raked gravel garden and shoji screen hallways to the hinoki omakase counter and private tatami suites.
            </p>
          </div>
        </div>
      </section>

      {/* Tour Viewpoint Experience */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Viewpoint Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem', justifyContent: 'center' }}>
            {viewpoints.map((vp, idx) => (
              <button
                key={vp.id || idx}
                onClick={() => setActiveViewpoint(idx)}
                style={{
                  padding: '12px 20px',
                  backgroundColor: activeViewpoint === idx ? '#B6A17B' : '#1A1E1B',
                  color: activeViewpoint === idx ? '#141715' : '#F2EFE6',
                  border: activeViewpoint === idx ? '1px solid #B6A17B' : '1px solid rgba(182, 161, 123, 0.25)',
                  borderRadius: '2px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.25s ease',
                }}
              >
                <span style={{ fontFamily: 'Space Mono, monospace' }}>{vp.number || `0${idx + 1}`}</span>
                <span>{vp.name}</span>
              </button>
            ))}
          </div>

          {/* Featured Viewpoint Showcase */}
          <div
            style={{
              backgroundColor: '#1A1E1B',
              border: '1px solid rgba(182, 161, 123, 0.3)',
              borderRadius: '2px',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 0,
            }}
          >
            <div style={{ minHeight: '440px', position: 'relative' }}>
              <img
                src={currentPoint.image || 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1400&auto=format&fit=crop'}
                alt={currentPoint.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  backgroundColor: 'rgba(20, 23, 21, 0.85)',
                  padding: '6px 14px',
                  borderRadius: '2px',
                  color: '#B6A17B',
                  fontSize: '11px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                VIEWPOINT {currentPoint.number || '01'}
              </div>
            </div>

            <div style={{ padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ color: '#B6A17B', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                {currentPoint.caption || 'Chamber of Stillness'}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '2.4rem', color: '#F2EFE6', margin: '0.5rem 0 1.5rem' }}>
                {currentPoint.name}
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.8)', marginBottom: '2rem' }}>
                {currentPoint.description}
              </p>

              <button
                onClick={openReservation}
                style={{
                  padding: '14px 28px',
                  backgroundColor: '#B6A17B',
                  color: '#141715',
                  border: 'none',
                  borderRadius: '2px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                }}
              >
                Reserve in This Chamber →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

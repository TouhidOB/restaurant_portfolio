import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Award, Flame, HeartHandshake } from 'lucide-react';

export default function BrandPage({ onNavigateHome, onNavigatePage }) {
  const { config, openReservation } = useCMS();
  const philosophy = config?.philosophy || {};
  const diningPillars = config?.diningPillars || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#141715', color: '#F2EFE6' }}>
      {/* Hero Banner */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 7rem) 0 4rem',
          borderBottom: '1px solid rgba(182, 161, 123, 0.25)',
          background: 'linear-gradient(180deg, rgba(26, 30, 27, 0.98) 0%, rgba(20, 23, 21, 0.98) 100%)',
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumbs */}
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
            <span style={{ color: '#C9B896' }}>ZEN PHILOSOPHY & STORY</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              円 THE PHILOSOPHY OF ENSO
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
              {philosophy.title || 'Beauty in Simplicity. Excellence in Every Detail.'}
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.85)', maxWidth: '720px' }}>
              {philosophy.lead || 'We believe that an exceptional dining experience begins with intention.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Philosophy Narrative */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#B6A17B', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                WABI-SABI & MA SPATIAL BEAUTY
              </span>
              <h2 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '2.4rem', margin: '1rem 0 1.5rem', color: '#F2EFE6', lineHeight: 1.25 }}>
                A Sanctuary Away From The Hurried World
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.8)', marginBottom: '1.5rem' }}>
                {philosophy.description || 'Rooted in the ancient philosophy of the Zen circle, ENSO brings together the discipline of traditional Japanese culinary craftsmanship, natural cedar and stone architecture, and serene hospitality.'}
              </p>
              <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.8)', marginBottom: '2.5rem' }}>
                {philosophy.secondaryStatement || 'Less distraction. More meaning. A deeper appreciation of every moment.'}
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={openReservation}
                  style={{
                    padding: '14px 28px',
                    backgroundColor: '#B6A17B',
                    color: '#141715',
                    border: 'none',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Reserve Table Experience
                </button>
                <button
                  onClick={() => onNavigatePage && onNavigatePage('menu')}
                  style={{
                    padding: '14px 28px',
                    backgroundColor: 'transparent',
                    border: '1px solid #B6A17B',
                    color: '#B6A17B',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Explore Menu Repertoire →
                </button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  border: '1px solid rgba(182, 161, 123, 0.3)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                }}
              >
                <img
                  src={philosophy.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop'}
                  alt="ENSO Zen Sanctuary Atmosphere"
                  style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Dining Pillars */}
      {diningPillars.length > 0 && (
        <section style={{ padding: '5rem 0', backgroundColor: '#1A1E1B', borderTop: '1px solid rgba(182, 161, 123, 0.15)' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
              <span style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
                THREE SACRED FOUNDATIONS
              </span>
              <h2 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '2.5rem', color: '#F2EFE6', marginTop: '0.5rem' }}>
                The Three Pillars of ENSO Hospitality
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {diningPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#202422',
                    border: '1px solid rgba(182, 161, 123, 0.2)',
                    borderRadius: '2px',
                    padding: '2rem',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <div style={{ overflow: 'hidden', borderRadius: '2px', height: '200px', marginBottom: '1.5rem' }}>
                    <img src={pillar.image} alt={pillar.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ color: '#B6A17B', fontFamily: 'Space Mono, monospace', fontSize: '12px' }}>{pillar.number}</span>
                  <h3 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '1.6rem', color: '#F2EFE6', margin: '0.5rem 0' }}>
                    {pillar.title}
                  </h3>
                  <div style={{ color: '#69745B', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                    {pillar.lead}
                  </div>
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(242, 239, 230, 0.75)' }}>
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

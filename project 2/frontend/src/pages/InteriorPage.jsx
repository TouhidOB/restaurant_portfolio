import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

export default function InteriorPage({ onNavigateHome, onNavigatePage }) {
  const { config, openReservation } = useCMS();
  const architecture = config?.architecture || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
            <span style={{ color: '#C9B896' }}>ZEN ARCHITECTURE & DESIGN</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              円 ARCHITECTURAL PHILOSOPHY
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
              {architecture.title || 'A Sanctuary of Natural Cedar, Stone & Gentle Light.'}
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.85)', maxWidth: '720px' }}>
              {architecture.description}
            </p>
          </div>
        </div>
      </section>

      {/* Materials & Craftsmanship */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}>
            <span style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
              ORGANIC ELEMENTS
            </span>
            <h2 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '2.4rem', color: '#F2EFE6', marginTop: '0.5rem' }}>
              Materials That Age with Dignity & Grace
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
            {(architecture.materials || []).map((m, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#1A1E1B',
                  border: '1px solid rgba(182, 161, 123, 0.2)',
                  borderRadius: '2px',
                  padding: '2rem',
                }}
              >
                <div style={{ color: '#B6A17B', fontFamily: 'Space Mono, monospace', fontSize: '12px', marginBottom: '0.5rem' }}>
                  MATERIAL 0{idx + 1}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '1.5rem', color: '#F2EFE6', marginBottom: '0.75rem' }}>
                  {m.name}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(242, 239, 230, 0.75)' }}>
                  {m.description}
                </p>
              </div>
            ))}
          </div>

          {/* Architectural Metrics */}
          {architecture.statistics && (
            <div
              style={{
                backgroundColor: '#202422',
                border: '1px solid rgba(182, 161, 123, 0.25)',
                borderRadius: '2px',
                padding: '3rem 2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem',
                textAlign: 'center',
              }}
            >
              {architecture.statistics.map((s, idx) => (
                <div key={idx}>
                  <div style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '2.8rem', fontWeight: 700, color: '#B6A17B' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(242, 239, 230, 0.7)', marginTop: '0.5rem' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

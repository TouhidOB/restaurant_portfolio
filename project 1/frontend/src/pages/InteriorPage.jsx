import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, Compass, Layers } from 'lucide-react';

export default function InteriorPage({ onNavigateHome, onNavigatePage }) {
  const { config, openReservation } = useCMS();
  const interior = config?.interior || {};
  const highlights = interior.highlights || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#0D0F10', color: '#F3EDE1' }}>
      {/* Hero Header */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 7rem) 0 4rem',
          borderBottom: '1px solid rgba(214, 184, 121, 0.25)',
          background: 'linear-gradient(180deg, rgba(18, 59, 53, 0.95) 0%, rgba(13, 15, 16, 0.98) 100%)',
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
              color: '#D6B879',
              marginBottom: '1.5rem',
            }}
          >
            <button
              onClick={onNavigateHome}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(243, 237, 225, 0.7)',
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
            <span style={{ color: '#E8D3A2' }}>ARCHITECTURE & INTERIOR</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#D6B879', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              ★ 1920S ART DECO SPATIAL DESIGN
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: '#D6B879',
                lineHeight: 1.15,
                marginBottom: '1.5rem',
              }}
            >
              {interior.heading || 'Designed for Moments That Matter.'}
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'rgba(243, 237, 225, 0.85)', maxWidth: '700px' }}>
              {interior.description || 'Every corner of our grand salon has been sculpted to evoke the golden age of Art Deco ballrooms, combining emerald polished marble with forged brass screens.'}
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid rgba(214, 184, 121, 0.2)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {highlights.map((h, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(18, 59, 53, 0.35)',
                  border: '1px solid rgba(214, 184, 121, 0.3)',
                  padding: '2rem',
                  borderRadius: '4px',
                }}
              >
                <div style={{ color: '#D6B879', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  FEATURE 0{idx + 1}
                </div>
                <h3 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', color: '#FFFFFF', fontSize: '1.3rem', marginBottom: '10px' }}>
                  {h.label}
                </h3>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(243, 237, 225, 0.75)' }}>
                  {h.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Spatial Photography Showcase */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <div style={{ height: '360px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #D6B879' }}>
              <img
                src={interior.mainImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop'}
                alt="Main Dining Salon"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ height: '360px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #D6B879' }}>
              <img
                src={interior.subImage1 || 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop'}
                alt="Champagne Parlour"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ height: '360px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #D6B879' }}>
              <img
                src={interior.subImage2 || 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&auto=format&fit=crop'}
                alt="Private Enclave"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Reserve CTA */}
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button
              onClick={() => openReservation('Architecture')}
              style={{
                padding: '14px 32px',
                backgroundColor: '#123B35',
                border: '1px solid #D6B879',
                color: '#D6B879',
                fontFamily: 'var(--font-display, Bodoni Moda)',
                fontSize: '13px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              RESERVE A BOOTH IN THE SALON
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

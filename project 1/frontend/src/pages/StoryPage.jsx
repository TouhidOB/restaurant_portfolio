import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Award, UtensilsCrossed, Calendar } from 'lucide-react';

export default function StoryPage({ onNavigateHome, onNavigatePage }) {
  const { config, openReservation } = useCMS();
  const chef = config?.chef || {};

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
            <span style={{ color: '#E8D3A2' }}>MEET THE CHEF</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#D6B879', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              ★ THE GASTRONOMIC VISIONARY
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
              {chef.name || 'Chef Julian Thorne'}
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'rgba(243, 237, 225, 0.85)', maxWidth: '700px' }}>
              {chef.title || 'Executive Culinary Director & Master of the Hearth'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative Split */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid rgba(214, 184, 121, 0.2)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div style={{ height: '520px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #D6B879', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' }}>
              <img
                src={chef.image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=900&auto=format&fit=crop'}
                alt={chef.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <span style={{ color: '#D6B879', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
                CULINARY PEDIGREE
              </span>
              <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#D6B879', margin: '1rem 0 1.5rem' }}>
                French Classical Roots, Artisanal Hearth Soul.
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(243, 237, 225, 0.85)', marginBottom: '1.5rem' }}>
                {chef.bio || 'Trained in Paris and Lyon before orchestrating acclaimed dining salons across London and Dubai, Chef Julian brings over two decades of uncompromising fine dining pedigree to Aurelia.'}
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(243, 237, 225, 0.85)', marginBottom: '2rem' }}>
                His approach combines French classical reductions and intricate charcuterie with the raw, elemental heat of Japanese binchotan charcoal grilling.
              </p>

              <div
                style={{
                  backgroundColor: 'rgba(18, 59, 53, 0.35)',
                  borderLeft: '3px solid #D6B879',
                  padding: '1.5rem',
                  marginBottom: '2.5rem',
                  fontStyle: 'italic',
                  fontFamily: 'var(--font-accent, Cormorant Garamond)',
                  fontSize: '18px',
                  color: '#E8D3A2',
                }}
              >
                "{chef.quote || 'True luxury in gastronomy is not pretension—it is total reverence for the pure provenance of the ingredient.'}"
              </div>

              <button
                onClick={() => openReservation('Chef Table')}
                style={{
                  padding: '14px 28px',
                  backgroundColor: '#123B35',
                  border: '1px solid #D6B879',
                  color: '#D6B879',
                  fontFamily: 'var(--font-display, Bodoni Moda)',
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                RESERVE CHEF’S OMAKASE TABLE
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

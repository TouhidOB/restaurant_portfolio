import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Compass, Eye, Sparkles, Calendar } from 'lucide-react';

export default function TourPage({ onNavigateHome, onNavigatePage }) {
  const { config, openReservation } = useCMS();
  const viewpoints = config?.tourViewpoints || [
    {
      id: 'tour-1',
      title: 'The Grand Dining Salon',
      subtitle: 'Main Dining & Hearth View',
      description: 'Under soaring coffered ceilings and tiered brass chandeliers, guests dine on hand-polished emerald marble tables.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop',
    },
    {
      id: 'tour-2',
      title: 'The Emerald Bar & Champagne Parlour',
      subtitle: 'Artisan Libations & Grower Bubbles',
      description: 'Featuring a curved malachite-green stone bar counter, backlit brass shelves, and custom velvet barstools.',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1400&auto=format&fit=crop',
    },
    {
      id: 'tour-3',
      title: 'The Private Gold Room',
      subtitle: 'Exclusive VIP Enclave',
      description: 'An intimate dining salon enclosed by Art Deco lacquered screens and antique smoked mirrors, ideal for private celebrations.',
      image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1400&auto=format&fit=crop',
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const activePoint = viewpoints[activeIdx] || viewpoints[0];

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#0D0F10', color: '#F3EDE1' }}>
      {/* Hero Header */}
      <section
        style={{
          padding: 'clamp(4rem, 7vw, 7rem) 0 3.5rem',
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
            <span style={{ color: '#E8D3A2' }}>3D SPATIAL TOUR</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#D6B879', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              ★ INTERACTIVE SALON VIEWPOINTS
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
              Explore the Aurelia Sanctuaries.
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'rgba(243, 237, 225, 0.85)', maxWidth: '700px' }}>
              Step inside our grand dining salon virtually. Switch between vantage points and select your preferred enclave before reserving your table.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Tour Explorer */}
      <section style={{ padding: '4rem 0 6rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {/* Viewpoint Selector Tabs */}
          <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            {viewpoints.map((vp, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={vp.id || idx}
                  onClick={() => setActiveIdx(idx)}
                  style={{
                    fontFamily: 'var(--font-display, Bodoni Moda)',
                    fontSize: '13px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '12px 24px',
                    borderRadius: '2px',
                    border: `1px solid ${isActive ? '#D6B879' : 'rgba(214, 184, 121, 0.3)'}`,
                    backgroundColor: isActive ? '#123B35' : 'rgba(18, 59, 53, 0.25)',
                    color: isActive ? '#D6B879' : '#F3EDE1',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {vp.title}
                </button>
              );
            })}
          </div>

          {/* Active Viewpoint Display */}
          <div
            style={{
              position: 'relative',
              height: 'clamp(400px, 60vh, 650px)',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid #D6B879',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.8)',
            }}
          >
            <img
              src={activePoint.image}
              alt={activePoint.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(13, 15, 16, 0.9) 0%, rgba(13, 15, 16, 0.2) 60%, transparent 100%)',
              }}
            />

            {/* Viewpoint Info Overlay */}
            <div style={{ position: 'absolute', bottom: '2.5rem', left: '2.5rem', right: '2.5rem', maxWidth: '750px' }}>
              <div style={{ color: '#D6B879', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
                {activePoint.subtitle}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', color: '#FFFFFF', marginBottom: '12px' }}>
                {activePoint.title}
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'rgba(243, 237, 225, 0.9)', marginBottom: '1.5rem' }}>
                {activePoint.description}
              </p>
              <button
                onClick={() => openReservation(activePoint.title)}
                style={{
                  padding: '12px 28px',
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
                RESERVE IN THIS ZONE
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

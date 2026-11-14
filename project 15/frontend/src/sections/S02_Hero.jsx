import React from 'react';
import { useCMS } from '../context/CMSContext';
import HeroScene from '../components/three/HeroScene';
import { ArrowDown, Sparkles, Flame, Eye, Utensils } from 'lucide-react';

export default function S02_Hero() {
  const { data, setIsReservationModalOpen } = useCMS();
  const config = data.config || {};

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        backgroundColor: '#FFF5E6',
        backgroundImage: 'radial-gradient(#171717 10%, transparent 11%)',
        backgroundSize: '28px 28px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '140px 24px 60px 24px',
        overflow: 'hidden',
        borderBottom: '4px solid #171717'
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          alignItems: 'center',
          gap: '40px',
          position: 'relative',
          zIndex: 2
        }}
        className="hero-grid"
      >
        {/* Left Column: Comic Typography & CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Comic Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <span
              style={{
                backgroundColor: '#F04438',
                color: '#FFF',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: '8px',
                border: '2px solid #171717',
                boxShadow: '3px 3px 0 #171717',
                transform: 'rotate(-2deg)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Flame size={14} /> 100% FLAVOR GUARANTEED
            </span>

            <span
              style={{
                backgroundColor: '#FFD928',
                color: '#171717',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 800,
                padding: '6px 14px',
                borderRadius: '8px',
                border: '2px solid #171717',
                boxShadow: '3px 3px 0 #171717',
                transform: 'rotate(2deg)'
              }}
            >
              EST. 2024 • ARTS DISTRICT
            </span>
          </div>

          {/* Massive Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
              lineHeight: 0.95,
              color: '#171717',
              margin: 0,
              textShadow: '3px 3px 0 #FFD928'
            }}
          >
            {config.hero_headline || 'GOOD FOOD. BIG PERSONALITY.'}
          </h1>

          {/* Subheadline Comic Speech Box */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '3px solid #171717',
              borderRadius: '16px',
              padding: '18px 24px',
              boxShadow: '6px 6px 0 #2455D6',
              position: 'relative'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.15rem',
                lineHeight: 1.6,
                color: '#222',
                margin: 0
              }}
            >
              {config.hero_subheadline ||
                'A vibrant dining playground where oversized pop-art aesthetics meet culinary craftsmanship. Bold flavors, neon nights, and unapologetic plates.'}
            </p>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '10px' }}>
            <button
              onClick={() => setIsReservationModalOpen(true)}
              style={{
                backgroundColor: '#F04438',
                color: '#FFF',
                border: '3px solid #171717',
                borderRadius: '12px',
                padding: '14px 28px',
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                letterSpacing: '0.5px',
                boxShadow: '5px 5px 0 #171717',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translate(-2px, -2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              CLAIM A TABLE NOW
            </button>

            <a
              href="#menu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#FFD928',
                color: '#171717',
                border: '3px solid #171717',
                borderRadius: '12px',
                padding: '14px 24px',
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                textDecoration: 'none',
                boxShadow: '5px 5px 0 #171717',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translate(-2px, -2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <Utensils size={18} />
              <span>EXPLORE MENU</span>
            </a>

            <a
              href="#tour"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#FFF',
                color: '#171717',
                border: '3px solid #171717',
                borderRadius: '12px',
                padding: '14px 20px',
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                textDecoration: 'none',
                boxShadow: '5px 5px 0 #171717'
              }}
            >
              <Eye size={18} />
              <span>3D TOUR</span>
            </a>
          </div>

          {/* Stat Badges */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginTop: '16px'
            }}
          >
            {[
              { val: '1,200+', label: 'Daily Brioche Buns' },
              { val: '18', label: 'Scratch Sauces' },
              { val: '5.0★', label: 'Critic Score' },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#FFF',
                  border: '2px solid #171717',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  boxShadow: '3px 3px 0 #171717'
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#2455D6' }}>
                  {stat.val}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#666', fontWeight: 700 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Pop Food Canvas */}
        <div
          style={{
            height: '540px',
            position: 'relative',
            backgroundColor: '#FFD928',
            border: '4px solid #171717',
            borderRadius: '24px',
            boxShadow: '10px 10px 0 #171717',
            overflow: 'hidden'
          }}
        >
          {/* Halftone Overlay Grid */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(#171717 15%, transparent 16%)',
              backgroundSize: '16px 16px',
              opacity: 0.15,
              pointerEvents: 'none'
            }}
          />

          {/* Floating Sticker Stamp */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 10,
              backgroundColor: '#F04438',
              color: '#FFF',
              fontFamily: 'var(--font-display)',
              fontSize: '0.85rem',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '2px solid #171717',
              transform: 'rotate(-5deg)',
              boxShadow: '3px 3px 0 #171717'
            }}
          >
            DRAG TO ROTATE 3D!
          </div>

          <HeroScene />
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

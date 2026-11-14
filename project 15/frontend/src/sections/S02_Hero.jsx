import React from 'react';
import { useCMS } from '../context/CMSContext';
import HeroScene from '../components/three/HeroScene';
import { ArrowUpRight, Flame, Eye, Utensils, Sparkles } from 'lucide-react';

export default function S02_Hero() {
  const { data, setIsReservationModalOpen } = useCMS();
  const config = data.config || {};

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        backgroundColor: '#090A0E',
        backgroundImage: 'radial-gradient(circle at 80% 30%, rgba(255, 51, 102, 0.09) 0%, transparent 55%), radial-gradient(circle at 20% 70%, rgba(204, 255, 0, 0.05) 0%, transparent 50%)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '130px 24px 70px 24px',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1.05fr 1fr',
          alignItems: 'center',
          gap: '48px',
          position: 'relative',
          zIndex: 2
        }}
        className="hero-grid"
      >
        {/* Left Column: High-Fashion Editorial Typography */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Micro-Pill Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 51, 102, 0.12)',
                color: '#FF6B8B',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(255, 51, 102, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                letterSpacing: '0.5px'
              }}
            >
              <Flame size={13} color="#FF3366" />
              100% SCRATCH KITCHEN
            </span>

            <span
              style={{
                backgroundColor: 'rgba(204, 255, 0, 0.1)',
                color: '#CCFF00',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(204, 255, 0, 0.25)',
                letterSpacing: '0.5px'
              }}
            >
              EST. 2024 • ARTS DISTRICT LA
            </span>
          </div>

          {/* Architectural Headline */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 6.5vw, 5.4rem)',
              lineHeight: 1.0,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-1.5px',
              margin: 0
            }}
          >
            GOOD FOOD.<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #D4D4D8 40%, #CCFF00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              BIG PERSONALITY.
            </span>
          </h1>

          {/* Subheadline in Frosted Glass */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '18px 24px',
              maxWidth: '540px'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '15px',
                lineHeight: 1.65,
                color: '#9FA5B7',
                margin: 0
              }}
            >
              {config.hero_subheadline ||
                'A contemporary dining playground where oversized pop-art aesthetics meet serious culinary technique. Bold flavors, neon nights, and unapologetic plates.'}
            </p>
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '6px' }}>
            <button
              onClick={() => setIsReservationModalOpen(true)}
              style={{
                backgroundColor: '#CCFF00',
                color: '#0A0B0E',
                borderRadius: '999px',
                padding: '14px 30px',
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.3px',
                cursor: 'pointer',
                boxShadow: '0 0 25px rgba(204, 255, 0, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 35px rgba(204, 255, 0, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(204, 255, 0, 0.35)';
              }}
            >
              <span>CLAIM A TABLE</span>
              <ArrowUpRight size={17} />
            </button>

            <a
              href="#menu"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: '#FFF',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '999px',
                padding: '14px 24px',
                fontFamily: 'var(--font-display)',
                fontSize: '14px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              }}
            >
              <Utensils size={16} />
              <span>EXPLORE MENU</span>
            </a>

            <a
              href="#tour"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'transparent',
                color: '#9FA5B7',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '999px',
                padding: '14px 20px',
                fontFamily: 'var(--font-display)',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FFF';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9FA5B7';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <Eye size={16} />
              <span>3D STUDIO</span>
            </a>
          </div>

          {/* Minimalist Telemetry Stats Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              marginTop: '16px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {[
              { val: '1,200+', label: 'Daily Brioche Buns' },
              { val: '18', label: 'Scratch Sauces' },
              { val: '650°F', label: 'Smash Griddle Heat' },
              { val: '5.0★', label: 'Critic Score' },
            ].map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: '#FFF'
                  }}
                >
                  {stat.val}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '10px',
                    color: '#646A7E',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Pop Sculpture Studio Canvas */}
        <div
          style={{
            height: '560px',
            position: 'relative',
            background: 'radial-gradient(circle at 50% 50%, #151824 0%, #0E1017 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '28px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 51, 102, 0.08)',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Studio Interactive Badge */}
          <div
            style={{
              position: 'absolute',
              top: '18px',
              left: '18px',
              zIndex: 10,
              backgroundColor: 'rgba(9, 10, 14, 0.75)',
              backdropFilter: 'blur(12px)',
              color: '#CCFF00',
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '1px',
              padding: '6px 14px',
              borderRadius: '999px',
              border: '1px solid rgba(204, 255, 0, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={12} color="#CCFF00" />
            <span>INTERACTIVE 3D WEBGL SCULPTURE</span>
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

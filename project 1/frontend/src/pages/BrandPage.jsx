import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Award, Flame, HeartHandshake } from 'lucide-react';

export default function BrandPage({ onNavigateHome, onNavigatePage }) {
  const { config, openReservation } = useCMS();
  const brand = config?.brandIntro || {};

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#0D0F10', color: '#F3EDE1' }}>
      {/* Hero Banner */}
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
            <span style={{ color: '#E8D3A2' }}>OUR STORY & PHILOSOPHY</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#D6B879', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              ★ THE AURELIA HERITAGE
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
              {brand.heading || 'Where 1920s Elegance Meets Exceptional Taste.'}
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'rgba(243, 237, 225, 0.85)', maxWidth: '700px' }}>
              {brand.subheading || 'A grand dining salon created to revive the timeless glamour of the Roaring Twenties, harmonized with modern culinary precision.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative & Split Section */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid rgba(214, 184, 121, 0.2)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <span style={{ color: '#D6B879', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
                GENESIS & VISION
              </span>
              <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#D6B879', margin: '1rem 0 1.5rem' }}>
                A Sanctuary of Gastronomic Splendour.
              </h2>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(243, 237, 225, 0.85)', marginBottom: '1.5rem' }}>
                {brand.paragraph1 || 'Founded on the philosophy that dining should be a multisensory celebration, Aurelia transports guests to an era when every meal was an occasion. Hand-cut crystal chandeliers illuminate emerald marble tables, while the rhythmic hum of our charcoal hearth sets the stage for an extraordinary culinary journey.'}
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(243, 237, 225, 0.85)', marginBottom: '2rem' }}>
                {brand.paragraph2 || 'From single-origin spice sourcing in the hills of Sylhet to dry-aged heritage beef flown directly from Australia, every dish reflects an unyielding pursuit of excellence.'}
              </p>

              <button
                onClick={() => openReservation('Our Story')}
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
                RESERVE AN ENCLAVE
              </button>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ height: '480px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #D6B879', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' }}>
                <img
                  src={brand.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop'}
                  alt="Aurelia Grand Salon"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Excellence */}
      <section style={{ padding: '5rem 0', backgroundColor: 'rgba(18, 59, 53, 0.25)', borderBottom: '1px solid rgba(214, 184, 121, 0.2)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '2.5rem', color: '#D6B879', marginBottom: '1rem' }}>
              The Four Pillars of Aurelia
            </h2>
            <p style={{ color: 'rgba(243, 237, 225, 0.75)', fontSize: '15px' }}>
              Guiding principles that define our kitchen, cellar, and guest hospitality.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: <Flame size={24} color="#D6B879" />,
                title: 'Charcoal Hearth Mastery',
                desc: 'Binchotan white charcoal searing imparts a clean, deep wood-smoke essence to prime cuts and fresh ocean catches.',
              },
              {
                icon: <Sparkles size={24} color="#D6B879" />,
                title: 'Art Deco Salon Splendour',
                desc: 'Geometric brass detailing, deep velvet booths, and ambient lighting crafted for memorable conversations.',
              },
              {
                icon: <Award size={24} color="#D6B879" />,
                title: 'Rare Ingredients',
                desc: 'From fresh Périgord truffles to Bengal bay giant tiger prawns, we compromise on nothing.',
              },
              {
                icon: <HeartHandshake size={24} color="#D6B879" />,
                title: 'Anticipatory Hospitality',
                desc: 'Personalized concierge desk, bespoke shift allocations, and discreet table attendance throughout your visit.',
              },
            ].map((p, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#0D0F10',
                  border: '1px solid rgba(214, 184, 121, 0.25)',
                  padding: '2rem',
                  borderRadius: '4px',
                }}
              >
                <div style={{ marginBottom: '1rem' }}>{p.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', color: '#FFFFFF', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(243, 237, 225, 0.75)' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

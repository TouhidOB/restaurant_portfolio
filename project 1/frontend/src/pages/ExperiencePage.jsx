import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, GlassWater, Flame, Users, HeartHandshake } from 'lucide-react';

export default function ExperiencePage({ onNavigateHome, onNavigatePage }) {
  const { config, openReservation } = useCMS();
  const experiences = config?.specialExperiences || [
    {
      title: "Chef’s Charcoal Omakase",
      duration: "2.5 Hours",
      price: "৳4,500 / person",
      description: "An intimate 7-course tasting journey seated directly before the binchotan hearth, personally presented by Executive Chef Julian.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=900&auto=format&fit=crop"
    },
    {
      title: "Champagne & Caviar Salon",
      duration: "2 Hours",
      price: "৳3,800 / person",
      description: "A decadent pairing flight featuring single-vineyard grower champagnes and imperial oscietra caviar atop warm blinis.",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=900&auto=format&fit=crop"
    },
    {
      title: "Private Ballroom Buyout",
      duration: "Half / Full Day",
      price: "Custom Inquiries",
      description: "Exclusive buyout of the entire 1920s Grand Dining Salon and Champagne Parlour for galas, diplomatic dinners, and high-profile celebrations.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=900&auto=format&fit=crop"
    }
  ];

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
            <span style={{ color: '#E8D3A2' }}>SIGNATURE EXPERIENCES</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#D6B879', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              ★ BESPOKE OCCASIONS & TASTING FLIGHTS
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
              Extraordinary Dining Moments.
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'rgba(243, 237, 225, 0.85)', maxWidth: '700px' }}>
              Whether an intimate anniversary, a multi-course omakase journey, or an exclusive parlour buyout, our host desk curates every detail to perfection.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Cards Grid */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid rgba(214, 184, 121, 0.2)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'rgba(18, 59, 53, 0.3)',
                  border: '1px solid #D6B879',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ height: '240px', overflow: 'hidden' }}>
                  <img
                    src={exp.image}
                    alt={exp.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                      <span style={{ fontSize: '11px', color: '#D6B879', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                        {exp.duration}
                      </span>
                      <span style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '1.1rem', color: '#FFFFFF', fontWeight: 700 }}>
                        {exp.price}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '1.4rem', color: '#D6B879', marginBottom: '12px' }}>
                      {exp.title}
                    </h3>

                    <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(243, 237, 225, 0.8)', marginBottom: '1.5rem' }}>
                      {exp.description}
                    </p>
                  </div>

                  <button
                    onClick={() => openReservation(exp.title)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#123B35',
                      border: '1px solid #D6B879',
                      color: '#D6B879',
                      fontFamily: 'var(--font-display, Bodoni Moda)',
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#D6B879';
                      e.currentTarget.style.color = '#123B35';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#123B35';
                      e.currentTarget.style.color = '#D6B879';
                    }}
                  >
                    BOOK THIS EXPERIENCE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

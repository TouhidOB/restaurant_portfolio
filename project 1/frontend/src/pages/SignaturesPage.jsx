import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, Star, Clock, Flame, ArrowRight } from 'lucide-react';

export default function SignaturesPage({ onNavigateHome, onNavigatePage }) {
  const { config, openDish, openReservation } = useCMS();
  const signatures = config?.signatureDishes || [];
  const currency = config?.currency || '৳';

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
            <span style={{ color: '#E8D3A2' }}>SIGNATURE DISHES</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#D6B879', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              ★ CHEF’S HIGHEST GASTRONOMIC ACHIEVEMENTS
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
              Signature Masterpieces.
            </h1>
            <p style={{ fontSize: '17px', lineHeight: 1.75, color: 'rgba(243, 237, 225, 0.85)', maxWidth: '700px' }}>
              Each plate represents a culinary milestone, balancing rare imported delicacies with heritage charcoal roasting and French classical sauce mastery.
            </p>
          </div>
        </div>
      </section>

      {/* Signatures Grid */}
      <section style={{ padding: '5rem 0', borderBottom: '1px solid rgba(214, 184, 121, 0.2)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {signatures.map((dish) => (
              <div
                key={dish.id}
                onClick={() => openDish(dish)}
                style={{
                  backgroundColor: 'rgba(18, 59, 53, 0.3)',
                  border: '1px solid #D6B879',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(214, 184, 121, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {dish.tag && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#123B35',
                        border: '1px solid #D6B879',
                        color: '#D6B879',
                        padding: '4px 10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      ★ {dish.tag}
                    </div>
                  )}
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
                      <h3 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '1.4rem', color: '#FFFFFF' }}>
                        {dish.name}
                      </h3>
                      <span style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '1.4rem', fontWeight: 700, color: '#D6B879' }}>
                        {currency}{Number(dish.price).toLocaleString()}
                      </span>
                    </div>

                    <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(243, 237, 225, 0.75)', marginBottom: '1.5rem' }}>
                      {dish.description}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(214, 184, 121, 0.2)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#D6B879', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {dish.dietary || 'Chef Signature'}
                    </span>
                    <span style={{ color: '#E8D3A2', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      View Details & Reserve <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Reserve Table Banner */}
          <div
            style={{
              marginTop: '5rem',
              padding: '3rem',
              backgroundColor: 'rgba(18, 59, 53, 0.5)',
              border: '1px solid #D6B879',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-display, Bodoni Moda)', fontSize: '2.5rem', color: '#D6B879', marginBottom: '1rem' }}>
              Taste Our Signatures This Evening
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(243, 237, 225, 0.8)', maxWidth: '650px', margin: '0 auto 2rem' }}>
              Pair your favorite signature dish with a premier vintage from our Champagne Parlour cellar.
            </p>
            <button
              onClick={() => openReservation('Signatures')}
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
              RESERVE A TABLE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, Clock, ArrowRight } from 'lucide-react';

export default function SignaturesPage({ onNavigateHome, onNavigatePage }) {
  const { config, openDish, openReservation } = useCMS();
  const signatureDishes = config?.signatureDishes || [];

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
            <span style={{ color: '#C9B896' }}>SIGNATURE HIGHLIGHTS</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              円 CHEF KENJI'S MASTERPIECES
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
              Signatures of Fire, Knife & Stillness.
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.85)', maxWidth: '720px' }}>
              Plated with mindful restraint and Toyosu-grade sourcing. Click any creation to view origin notes, preparation technique, and caloric profile.
            </p>
          </div>
        </div>
      </section>

      {/* Signature Grid */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {signatureDishes.map((dish) => (
              <div
                key={dish.id || dish.name}
                onClick={() => openDish(dish)}
                style={{
                  backgroundColor: '#1A1E1B',
                  border: '1px solid rgba(182, 161, 123, 0.25)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#B6A17B';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(182, 161, 123, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      backgroundColor: 'rgba(20, 23, 21, 0.85)',
                      padding: '4px 10px',
                      borderRadius: '2px',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#B6A17B',
                    }}
                  >
                    {dish.category}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '14px',
                      right: '14px',
                      backgroundColor: '#202321',
                      padding: '4px 12px',
                      borderRadius: '2px',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#F2EFE6',
                    }}
                  >
                    {dish.price}
                  </div>
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '1.4rem', color: '#F2EFE6', margin: 0 }}>
                      {dish.name}
                    </h3>
                  </div>
                  {dish.japaneseName && (
                    <div style={{ fontFamily: 'var(--font-jp, Noto Serif JP)', fontSize: '13px', color: '#B6A17B', marginBottom: '12px' }}>
                      {dish.japaneseName}
                    </div>
                  )}
                  <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(242, 239, 230, 0.75)', marginBottom: '16px' }}>
                    {dish.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid rgba(182, 161, 123, 0.15)' }}>
                    <span style={{ fontSize: '12px', color: '#69745B', fontWeight: 600 }}>
                      {dish.prepTime ? `⏱ ${dish.prepTime}` : 'Chef Specialty'}
                    </span>
                    <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B6A17B', fontWeight: 600 }}>
                      Inspect Dish ↗
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

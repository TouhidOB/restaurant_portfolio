import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, ArrowRight, Award } from 'lucide-react';

export default function StoryPage({ onNavigateHome, onNavigatePage }) {
  const { config, openReservation } = useCMS();
  const chef = config?.chef || {};

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
            <span style={{ color: '#C9B896' }}>EXECUTIVE MASTER CHEF</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              円 CULINARY DIRECTION
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
              The Mastery & Knife Discipline of Chef Kenji Takahashi.
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.85)', maxWidth: '720px' }}>
              Over twenty-four years of classical training spanning Tokyo's Ginza district and Kyoto's traditional ryotei establishments.
            </p>
          </div>
        </div>
      </section>

      {/* Main Chef Showcase */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div
                style={{
                  position: 'relative',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  border: '1px solid rgba(182, 161, 123, 0.3)',
                }}
              >
                <img
                  src={chef.image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop'}
                  alt={chef.name || 'Master Chef'}
                  style={{ width: '100%', height: '540px', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div>
              <span style={{ color: '#B6A17B', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                {chef.position || 'Executive Master Chef'}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '2.5rem', margin: '0.5rem 0 1.5rem', color: '#F2EFE6' }}>
                {chef.name || 'Chef Kenji Takahashi'} {chef.japaneseName && <span style={{ fontFamily: 'var(--font-jp, Noto Serif JP)', color: '#B6A17B', fontSize: '1.8rem', marginLeft: '10px' }}>{chef.japaneseName}</span>}
              </h2>

              <blockquote
                style={{
                  fontFamily: 'var(--font-display, Cormorant Garamond)',
                  fontSize: '1.35rem',
                  fontStyle: 'italic',
                  color: '#C9B896',
                  paddingLeft: '1.5rem',
                  borderLeft: '3px solid #B6A17B',
                  margin: '0 0 2rem',
                  lineHeight: 1.6,
                }}
              >
                "{chef.quote || 'Great cooking begins with respect — for ingredients, technique, and the people who gather around the table.'}"
              </blockquote>

              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.8)', marginBottom: '1.5rem' }}>
                {chef.bio1}
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.8)', marginBottom: '2rem' }}>
                {chef.bio2}
              </p>

              {chef.awards && (
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                  {chef.awards.map((a, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '6px 14px',
                        backgroundColor: '#1A1E1B',
                        border: '1px solid rgba(182, 161, 123, 0.3)',
                        borderRadius: '2px',
                        fontSize: '12px',
                        color: '#B6A17B',
                      }}
                    >
                      ★ {a}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={openReservation}
                style={{
                  padding: '14px 28px',
                  backgroundColor: '#B6A17B',
                  color: '#141715',
                  border: 'none',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Reserve Omakase Counter Seating
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

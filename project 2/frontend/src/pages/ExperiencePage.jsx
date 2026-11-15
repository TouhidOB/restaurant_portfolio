import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { Sparkles, Calendar, ArrowRight, Clock, Users } from 'lucide-react';

export default function ExperiencePage({ onNavigateHome, onNavigatePage }) {
  const { config, openReservation } = useCMS();
  const experiences = config?.specialExperiences || [];

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
            <span style={{ color: '#C9B896' }}>CURATED ZEN EXPERIENCES</span>
          </div>

          <div style={{ maxWidth: '850px' }}>
            <div style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              円 SACRED DINING RITUALS
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
              Moments of Ritual & Gastronomic Transcendence.
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(242, 239, 230, 0.85)', maxWidth: '720px' }}>
              From intimate 14-course omakase journeys with Master Kenji to private sunken kotatsu tatami salons and ceremonial afternoon matcha whisking.
            </p>
          </div>
        </div>
      </section>

      {/* Experiences List */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {experiences.map((exp, idx) => (
              <div
                key={exp.id || idx}
                style={{
                  backgroundColor: '#1A1E1B',
                  border: '1px solid rgba(182, 161, 123, 0.25)',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 0,
                }}
              >
                <div style={{ height: '380px', position: 'relative' }}>
                  <img
                    src={exp.image}
                    alt={exp.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      backgroundColor: 'rgba(20, 23, 21, 0.88)',
                      padding: '4px 12px',
                      borderRadius: '2px',
                      color: '#B6A17B',
                      fontSize: '11px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    EXPERIENCE 0{idx + 1}
                  </div>
                </div>

                <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <span style={{ color: '#B6A17B', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                      {exp.tagline}
                    </span>
                    <span style={{ fontSize: '15px', color: '#B6A17B', fontWeight: 700 }}>{exp.price}</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-display, Cormorant Garamond)', fontSize: '2.2rem', color: '#F2EFE6', margin: '0.3rem 0 0.8rem' }}>
                    {exp.title}
                  </h2>
                  {exp.japaneseSubtitle && (
                    <div style={{ fontFamily: 'var(--font-jp, Noto Serif JP)', color: '#C9B896', fontSize: '14px', marginBottom: '1rem' }}>
                      {exp.japaneseSubtitle}
                    </div>
                  )}
                  <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(242, 239, 230, 0.8)', marginBottom: '1.5rem' }}>
                    {exp.description}
                  </p>
                  <div style={{ fontSize: '12px', color: '#69745B', fontWeight: 600, marginBottom: '2rem' }}>
                    👥 {exp.capacity}
                  </div>

                  <button
                    onClick={openReservation}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#B6A17B',
                      color: '#141715',
                      border: 'none',
                      borderRadius: '2px',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      alignSelf: 'flex-start',
                    }}
                  >
                    Inquire For This Experience →
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

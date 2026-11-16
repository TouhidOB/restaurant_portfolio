import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SpacePage() {
  const { content, openReservation } = useCMS();
  const exp = content?.diningExperience || {};
  const arch = content?.architecture || {};
  const spaces = exp.spaces || [];

  return (
    <div style={{ backgroundColor: 'var(--color-midnight-dark, #0a121d)', color: 'var(--color-cloud-ivory, #F3F0E9)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 90, 0.45) 0%, var(--color-midnight-dark, #0a121d) 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">{exp.subtitle || 'Atmosphere & Architecture'}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', letterSpacing: '0.04em', color: 'var(--color-champagne)', margin: '0.8rem 0 1.25rem' }}>
            {exp.title || 'Distinct Rooftop Dining Dimensions'}
          </h1>
          <div className="horizon-divider horizon-divider-center" />
          <p style={{ color: 'var(--color-twilight-slate)', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            From the open-air sunset terrace to the cantilevered glass atrium and the intimate midnight cocktail lounge.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4.5rem', marginBottom: '5rem' }}>
          {spaces.map((sp, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={sp.id || idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: '3.5rem',
                  alignItems: 'center',
                  backgroundColor: 'var(--color-midnight-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  padding: '2.5rem',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
                }}
              >
                <div style={{ order: isEven ? 2 : 1 }}>
                  <span className="section-label" style={{ fontSize: '0.75rem', marginBottom: '0.4rem' }}>
                    {sp.tag || `DIMENSION 0${idx + 1}`}
                  </span>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-cloud-ivory)', marginBottom: '1rem' }}>
                    {sp.name}
                  </h2>
                  <p style={{ color: 'var(--color-twilight-slate)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                    {sp.desc}
                  </p>

                  {sp.features && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                      {sp.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          style={{
                            padding: '0.35rem 0.8rem',
                            background: 'rgba(38, 63, 90, 0.3)',
                            border: '1px solid var(--color-border-subtle)',
                            borderRadius: '20px',
                            fontSize: '0.78rem',
                            color: 'var(--color-champagne)',
                            fontWeight: 600,
                          }}
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  )}

                  <button onClick={() => openReservation()} className="btn-skyline-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '0.82rem' }}>
                    Reserve in {sp.name.split(' ')[0]}
                  </button>
                </div>

                <div style={{ order: isEven ? 1 : 2 }}>
                  <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--color-border)', height: '340px' }}>
                    <img
                      src={sp.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85'}
                      alt={sp.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Architectural Overview */}
        {arch.title && (
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '4rem', textAlign: 'center' }}>
            <span className="section-label">{arch.subtitle || 'Architectural Innovation'}</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-champagne)', marginBottom: '1rem' }}>
              {arch.title}
            </h2>
            <p style={{ maxWidth: '780px', margin: '0 auto 2.5rem', color: 'var(--color-twilight-slate)', fontSize: '1.05rem', lineHeight: 1.8 }}>
              {arch.description}
            </p>
            <button onClick={() => openReservation()} className="btn-skyline-primary" style={{ padding: '0.9rem 2.5rem' }}>
              Reserve Horizon Table &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

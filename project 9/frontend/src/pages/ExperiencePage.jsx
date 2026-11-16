import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ExperiencePage() {
  const { content, openReservation } = useCMS();
  const spec = content?.specialExperiences || {};
  const experiences = spec.experiences || [];

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
          <span className="section-label">{spec.subtitle || 'From Sunset Aperitivo to Stargazing Buyouts'}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', letterSpacing: '0.04em', color: 'var(--color-champagne)', margin: '0.8rem 0 1.25rem' }}>
            {spec.title || 'Curated Horizon Celebrations'}
          </h1>
          <div className="horizon-divider horizon-divider-center" />
          <p style={{ color: 'var(--color-twilight-slate)', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            Transforming landmark personal and corporate milestones through tailored sommelier pairings, private rooftop buyouts, and sunset tastings.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-midnight-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 15px 40px rgba(0,0,0,0.4)',
                transition: 'transform 0.25s ease, border-color 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-accent)', color: 'var(--color-sunset-copper)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                    {exp.time || 'PRIVATE BOOKING'}
                  </span>
                  {exp.price && (
                    <span style={{ fontSize: '0.9rem', color: 'var(--color-champagne)', fontFamily: 'var(--font-accent)', fontWeight: 800 }}>
                      {exp.price}
                    </span>
                  )}
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--color-cloud-ivory)', marginBottom: '1rem' }}>
                  {exp.title}
                </h3>

                <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.94rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {exp.desc}
                </p>
              </div>

              <div>
                <button
                  onClick={() => openReservation()}
                  className="btn-skyline-primary"
                  style={{ width: '100%', padding: '0.75rem', fontSize: '0.82rem' }}
                >
                  Inquire For This Experience &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: 'var(--color-twilight-slate)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
            Seeking a fully customized bespoke event, wedding toast, or full floor buyout?
          </p>
          <button onClick={() => openReservation()} className="btn-skyline-primary" style={{ padding: '0.9rem 2.5rem' }}>
            Contact VIP Events Concierge &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

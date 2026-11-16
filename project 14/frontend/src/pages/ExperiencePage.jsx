import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ExperiencePage({ onNavigate }) {
  const { data, openReservation, openReservationModal } = useCMS();
  const triggerReservation = openReservationModal || openReservation;
  const experiences = data?.experiences || [];

  return (
    <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Header */}
      <section style={{ padding: '80px 0 60px 0', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '15%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(196, 168, 120, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
            PRIVATE ENTERTAINING & SALONS
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '20px', color: 'var(--color-ivory)' }}>
            Curated Dining Experiences
          </h1>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-bronze)', margin: '0 auto 24px auto' }} />
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.15rem', lineHeight: 1.8 }}>
            Intimate private dining rooms, tableside sommelier pairings, and full restaurant buyout packages in Manhattan Midtown East.
          </p>
        </div>
      </section>

      {/* Experiences Grid */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-charcoal)' }}>
        <div className="section-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '36px' }}>
            {experiences.map((exp) => (
              <div
                key={exp.id}
                style={{
                  background: 'var(--color-graphite)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div>
                  <div style={{ height: '240px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={exp.image_url}
                      alt={exp.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(16, 16, 16, 0.85)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '2px', border: '1px solid var(--border-subtle)', fontSize: '11px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {exp.capacity}
                    </div>
                  </div>

                  <div style={{ padding: '32px 28px 24px' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: '6px' }}>
                      {exp.tagline || "Exclusive Salon"}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', color: 'var(--color-ivory)', marginBottom: '10px' }}>
                      {exp.title}
                    </h3>
                    <div style={{ fontSize: '12px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', fontWeight: 600, marginBottom: '16px' }}>
                      Investment: {exp.price_guide}
                    </div>
                    <p style={{ color: 'var(--color-taupe)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '24px' }}>
                      {exp.description}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0 28px 28px' }}>
                  <button
                    onClick={() => triggerReservation(exp.title)}
                    style={{ width: '100%', padding: '14px', background: 'var(--color-bronze)', border: 'none', borderRadius: '2px', color: '#101010', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer', textAlign: 'center' }}
                  >
                    Request This Salon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sommelier Consultation Banner */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-obsidian)', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div className="section-container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
            TAILORED HOSPITALITY
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-ivory)', marginBottom: '16px' }}>
            Consult With Our Dining Concierge
          </h2>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.05rem', lineHeight: 1.75, marginBottom: '32px' }}>
            Have specialized wine requests, dietary requirements, or buy-out timing? Our event team will customize a dedicated menu and floor plan.
          </p>
          <button
            onClick={() => onNavigate && onNavigate('/contact')}
            style={{ padding: '14px 34px', background: 'transparent', border: '1px solid var(--color-champagne)', borderRadius: '2px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Contact Event Concierge
          </button>
        </div>
      </section>

    </div>
  );
}

import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S09Chef() {
  const { content, openReservation } = useCMS();
  const chef = content?.chef || {};
  const accolades = chef.accolades || [];

  return (
    <section id="chef" className="section-pad" style={{ backgroundColor: 'var(--color-midnight)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4.5rem', alignItems: 'center' }}>
          {/* Chef Portrait Column */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '4px',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              }}
            >
              <img
                src={chef.image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85'}
                alt={chef.name || 'Executive Chef Julian Moreau'}
                style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {/* Michelin / Heritage Badge */}
            <div
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(16, 28, 44, 0.9)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--color-champagne)',
                padding: '0.85rem 1.25rem',
                borderRadius: '3px',
                textAlign: 'center',
              }}
            >
              <div style={{ color: 'var(--color-champagne)', fontSize: '1.4rem' }}>&starf;&starf;&starf;</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--color-cloud-ivory)', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.2rem' }}>
                Michelin Laureate
              </div>
            </div>
          </div>

          {/* Chef Bio & Vision Column */}
          <div>
            <span className="section-label">CULINARY DIRECTION</span>
            <h2 className="section-title" style={{ marginBottom: '0.4rem' }}>
              {chef.name || 'Chef Julian Moreau'}
            </h2>
            <div style={{ fontSize: '1.05rem', color: 'var(--color-champagne)', fontFamily: 'var(--font-accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem' }}>
              {chef.title || 'Executive Chef & Culinary Director'}
            </div>
            <div className="horizon-divider" />

            <p style={{ fontSize: '1.02rem', lineHeight: 1.8, color: 'var(--color-cloud-ivory)', marginBottom: '1.5rem', opacity: 0.95 }}>
              {chef.bio ||
                'Trained across three-Michelin-starred kitchens in Paris, Tokyo, and San Francisco, Chef Julian Moreau brings over two decades of uncompromising mastery to SKYLINE. His cuisine pairs classical French technical rigor with the vibrant, umami-rich philosophies of modern Pacific culinary cultures.'}
            </p>

            {chef.quote && (
              <div
                style={{
                  borderLeft: '2px solid var(--color-sunset-copper)',
                  paddingLeft: '1.25rem',
                  marginBottom: '2rem',
                }}
              >
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--color-champagne-light)', lineHeight: 1.5 }}>
                  "{chef.quote}"
                </p>
              </div>
            )}

            {/* Accolades List */}
            {accolades.length > 0 && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-accent)', fontSize: '0.76rem', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem', fontWeight: 700 }}>
                  Career Distinctions & Honors
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {accolades.map((acc, ai) => (
                    <li key={ai} style={{ fontSize: '0.88rem', color: 'var(--color-cloud-ivory)', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ color: 'var(--color-champagne)' }}>&bull;</span> {acc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button onClick={() => openReservation()} className="btn-skyline-primary">
              Reserve Chef's Table Experience
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

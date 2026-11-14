import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S08Architecture() {
  const { content } = useCMS();
  const arch = content?.architecture || {};

  return (
    <section id="architecture" className="py-section" style={{ backgroundColor: '#18191B', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          {/* Left: Architecture Details */}
          <div>
            <span className="section-label">{arch.subtitle || "L'Écrin d'un Siècle"}</span>
            <h2 className="section-title">{arch.title || 'Architecture & Salons'}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginTop: '2rem', marginBottom: '2.5rem' }}>
              {(arch.details || []).map((item, idx) => (
                <div key={idx}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--color-ivory)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ color: 'var(--color-gold)' }}>✦</span>
                    <span>{item.title}</span>
                  </h4>
                  <p style={{ color: 'var(--color-taupe)', fontSize: '0.92rem', lineHeight: '1.65', paddingLeft: '1.4rem' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {arch.quote && (
              <blockquote
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontStyle: 'italic',
                  fontSize: '1.18rem',
                  color: 'var(--color-ivory-dim)',
                  borderLeft: '2px solid var(--color-gold)',
                  paddingLeft: '1.25rem',
                  lineHeight: '1.6',
                }}
              >
                « {arch.quote} »
              </blockquote>
            )}
          </div>

          {/* Right: Architectural Stats & Atmosphere Image */}
          <div>
            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid rgba(197, 164, 109, 0.3)',
                boxShadow: '0 15px 45px rgba(0,0,0,0.5)',
                marginBottom: '2rem',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1000&q=85"
                alt="Architecture des Salons Parisiens"
                style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Architecture Numerical Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.25rem',
              }}
            >
              {(arch.stats || [
                { value: '480 m²', label: 'Superficie de Salons' },
                { value: '18', label: 'Tables Espacées' },
                { value: '4.8 m', label: 'Hauteur sous Plafond' },
                { value: '3', label: 'Salons Privatisables' },
              ]).map((st, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#202124',
                    border: '1px solid var(--color-charcoal-border)',
                    borderRadius: '6px',
                    padding: '1.25rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-gold)', fontWeight: 600 }}>
                    {st.value}
                  </div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-taupe)', marginTop: '0.2rem' }}>
                    {st.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

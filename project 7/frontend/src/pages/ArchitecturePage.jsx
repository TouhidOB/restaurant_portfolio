import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ArchitecturePage() {
  const { content, openReservation } = useCMS();
  const arch = content?.architecture || {};
  const details = arch.details || [];
  const stats = arch.stats || [];

  return (
    <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, #3B1A21 0%, #202124 100%)', padding: '5rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(197, 164, 109, 0.3)' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
            {arch.subtitle || "L'Écrin d'un Siècle"}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--color-ivory)', marginBottom: '1.25rem', lineHeight: '1.2' }}>
            {arch.title || 'Architecture & Salons'}
          </h1>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', lineHeight: '1.75' }}>
            {arch.quote || "Entrer chez nous, c'est franchir le seuil d'une demeure privée où le temps suspend son vol pour honorer les sens."}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1100px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Stats Grid */}
        {stats.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
            {stats.map((s, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#25262A',
                  border: '1px solid rgba(197, 164, 109, 0.3)',
                  borderRadius: '8px',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-gold)', fontWeight: 700, marginBottom: '0.4rem' }}>
                  {s.value}
                </div>
                <div style={{ color: 'var(--color-taupe)', fontSize: '0.88rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Architectural Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          {details.map((d, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#25262A',
                border: '1px solid rgba(197, 164, 109, 0.25)',
                borderRadius: '8px',
                padding: '2.5rem',
              }}
            >
              <span style={{ color: 'var(--color-gold)', fontSize: '1.5rem', display: 'block', marginBottom: '1rem' }}>✦</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-ivory)', marginBottom: '0.75rem' }}>
                {d.title}
              </h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.92rem', lineHeight: '1.7' }}>
                {d.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#25262A', borderRadius: '12px', border: '1px solid rgba(197, 164, 109, 0.4)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--color-ivory)', marginBottom: '1rem' }}>
            Vivez l'Atmosphère des Salons Vendôme
          </h3>
          <p style={{ color: 'var(--color-taupe)', maxWidth: '520px', margin: '0 auto 2rem', fontSize: '1rem' }}>
            Réservez dès maintenant pour une immersion au sein du faste architectural du Siècle des Lumières.
          </p>
          <button onClick={() => openReservation()} className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '0.95rem' }}>
            Demander une Réservation
          </button>
        </div>
      </div>
    </div>
  );
}

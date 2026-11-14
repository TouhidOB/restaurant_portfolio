import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S10DiningExperiences() {
  const { content, openReservation } = useCMS();
  const exp = content?.experiences || {};
  const cards = exp.cards || [];

  return (
    <section id="experiences" className="py-section" style={{ backgroundColor: '#18191B', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="section-label">{exp.subtitle || 'Des Instants Conçus pour Marquer les Esprits'}</span>
          <h2 className="section-title">{exp.title || 'Expériences Singulières'}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Des salons feutrés aux cryptes privées, découvrez différentes manières de vivre la magie gastronomique de notre maison.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {cards.map((c) => (
            <div
              key={c.id}
              style={{
                backgroundColor: '#202124',
                border: '1px solid rgba(197, 164, 109, 0.3)',
                borderRadius: '8px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-gold)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(197, 164, 109, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      background: 'rgba(84, 37, 47, 0.4)',
                      border: '1px solid rgba(197, 164, 109, 0.4)',
                      color: 'var(--color-gold-light)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                    }}
                  >
                    {c.badge}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-taupe)' }}>
                    👥 {c.capacity}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', color: 'var(--color-ivory)', marginBottom: '0.85rem' }}>
                  {c.title}
                </h3>
                <p style={{ color: 'var(--color-ivory-dim)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                  {c.desc}
                </p>
              </div>

              <button
                onClick={() => openReservation(c.title)}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.82rem', padding: '0.75rem' }}
              >
                Demander Disponibilité
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

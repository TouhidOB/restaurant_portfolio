import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ExperiencePage() {
  const { content, openReservation } = useCMS();
  const experiences = content?.experiences || {};
  const cards = experiences.cards || [];

  return (
    <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, #3B1A21 0%, #202124 100%)', padding: '5rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(197, 164, 109, 0.3)' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
            {experiences.subtitle || 'Des Instants Conçus pour Marquer les Esprits'}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--color-ivory)', marginBottom: '1.25rem', lineHeight: '1.2' }}>
            {experiences.title || 'Expériences Singulières'}
          </h1>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', lineHeight: '1.75' }}>
            Du grand dîner au guéridon au bar à champagne clandestin et salons privatisables, choisissez le cadre de votre émotion.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1100px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          {cards.map((card, idx) => (
            <div
              key={card.id || idx}
              style={{
                backgroundColor: '#25262A',
                border: '1px solid rgba(197, 164, 109, 0.3)',
                borderRadius: '10px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <span
                  style={{
                    backgroundColor: 'rgba(84, 37, 47, 0.8)',
                    color: 'var(--color-gold-light)',
                    border: '1px solid var(--color-gold)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                  }}
                >
                  {card.badge}
                </span>
                <span style={{ color: 'var(--color-taupe)', fontSize: '0.82rem' }}>
                  {card.capacity}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--color-ivory)', marginBottom: '0.85rem' }}>
                {card.title}
              </h3>
              <p style={{ color: 'var(--color-taupe)', fontSize: '0.92rem', lineHeight: '1.7', flexGrow: 1, marginBottom: '2rem' }}>
                {card.desc}
              </p>

              <button
                onClick={() => openReservation(card.title)}
                className="btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.88rem' }}
              >
                Réserver Cette Expérience
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

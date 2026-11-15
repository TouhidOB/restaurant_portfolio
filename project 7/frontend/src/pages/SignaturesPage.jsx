import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SignaturesPage() {
  const { content, openReservation, setSelectedDish } = useCMS();
  const signatures = content?.signature_dishes || {};
  const dishes = signatures.dishes || [];

  return (
    <div style={{ backgroundColor: '#202124', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(180deg, #3B1A21 0%, #202124 100%)', padding: '5rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(197, 164, 109, 0.3)' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span style={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
            {signatures.subtitle || 'Les Joyaux de la Carte'}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--color-ivory)', marginBottom: '1.25rem', lineHeight: '1.2' }}>
            {signatures.title || 'Créations Emblématiques'}
          </h1>
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', lineHeight: '1.75' }}>
            Quatre chefs-d'œuvre gastronomiques consacrés par les guides, nés de la rencontre entre terroirs d'exception et sauces d'anthologie.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1100px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
          {dishes.map((dish, idx) => (
            <div
              key={dish.id || idx}
              style={{
                backgroundColor: '#25262A',
                border: '1px solid rgba(197, 164, 109, 0.3)',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                <img
                  src={dish.image}
                  alt={dish.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {dish.tag && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      backgroundColor: 'rgba(84, 37, 47, 0.9)',
                      color: 'var(--color-gold-light)',
                      border: '1px solid var(--color-gold)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    {dish.tag}
                  </span>
                )}
                <span
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    backgroundColor: 'rgba(24, 25, 27, 0.85)',
                    color: 'var(--color-gold)',
                    border: '1px solid rgba(197, 164, 109, 0.4)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                  }}
                >
                  {dish.price}
                </span>
              </div>

              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-ivory)', marginBottom: '0.4rem', lineHeight: '1.3' }}>
                  {dish.name}
                </h3>
                {dish.french_name && (
                  <div style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', color: 'var(--color-gold)', fontSize: '0.95rem', marginBottom: '1rem' }}>
                    « {dish.french_name} »
                  </div>
                )}
                <p style={{ color: 'var(--color-taupe)', fontSize: '0.9rem', lineHeight: '1.65', marginBottom: '1.5rem', flexGrow: 1 }}>
                  {dish.description}
                </p>

                {dish.wine_pairing && (
                  <div style={{ background: 'rgba(197, 164, 109, 0.1)', border: '1px solid rgba(197, 164, 109, 0.25)', padding: '0.65rem 0.9rem', borderRadius: '6px', fontSize: '0.82rem', color: 'var(--color-gold-light)', marginBottom: '1.5rem' }}>
                    🍷 Accord Sommelier : {dish.wine_pairing}
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => setSelectedDish(dish)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: 'transparent',
                      border: '1px solid var(--color-gold)',
                      color: 'var(--color-gold)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Inspecter le Plat
                  </button>
                  <button
                    onClick={() => openReservation(dish.name)}
                    className="btn-primary"
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      fontSize: '0.82rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Déguster
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div style={{ textAlign: 'center', padding: '3.5rem 2rem', background: '#25262A', borderRadius: '12px', border: '1px solid rgba(197, 164, 109, 0.3)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-ivory)', marginBottom: '0.75rem' }}>
            Menu Symphonie Royale en 8 Séquences
          </h3>
          <p style={{ color: 'var(--color-taupe)', maxWidth: '580px', margin: '0 auto 1.5rem', fontSize: '0.95rem' }}>
            L'intégralité de nos créations signatures réunies dans un grand voyage gustatif d'auteur (285 € par convive).
          </p>
          <button onClick={() => openReservation('Menu Symphonie Royale')} className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
            Réserver la Symphonie Royale
          </button>
        </div>
      </div>
    </div>
  );
}

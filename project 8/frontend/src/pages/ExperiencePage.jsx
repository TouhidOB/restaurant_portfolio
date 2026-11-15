import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ExperiencePage() {
  const { content, openReservation } = useCMS();
  const experiences = content?.experiences || {};
  const cards = experiences.cards || [];

  return (
    <div style={{ backgroundColor: '#111314', color: 'var(--color-offwhite, #F1EEE7)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(145, 77, 55, 0.4) 0%, #111314 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '2px solid var(--color-brick, #914D37)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">{experiences.subtitle || 'From Warehouse Feasts To Private Tastings'}</span>
          <h1 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '3.5rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
            {experiences.title || 'Special Dining Experiences'}
          </h1>
          <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1.15rem', lineHeight: '1.7' }}>
            Whether gathering at the pitmaster counter or reserving our mezzanine loft for a celebration, discover tailor-made smokehouse hospitality.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          {cards.map((card, idx) => (
            <div
              key={card.id || idx}
              style={{
                backgroundColor: 'var(--color-black-card, #181A1C)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '2px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-copper, #B87345)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    backgroundColor: 'rgba(184, 115, 69, 0.2)',
                    color: 'var(--color-copper, #B87345)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: 800,
                    padding: '0.3rem 0.75rem',
                    borderRadius: '2px',
                    border: '1px solid var(--color-copper, #B87345)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {card.badge || 'Dining Experience'}
                </span>

                <h3 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '1.8rem', textTransform: 'uppercase', color: 'var(--color-offwhite, #F1EEE7)', marginBottom: '1rem' }}>
                  {card.title}
                </h3>

                <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                  {card.desc}
                </p>

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem', marginBottom: '1.75rem', color: 'var(--color-amber, #E9A24B)', fontSize: '0.88rem', fontWeight: 700 }}>
                  👥 Capacity: {card.capacity}
                </div>
              </div>

              <button
                onClick={() => openReservation(card.title)}
                className="btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                Inquire For This Experience
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

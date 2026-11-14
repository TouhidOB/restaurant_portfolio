import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S10Experiences() {
  const { content, openReservation } = useCMS();
  const exp = content?.experiences || {};
  const cards = exp.cards || [];

  return (
    <section id="experiences" className="py-section" style={{ backgroundColor: 'var(--color-graphite)', position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="section-label">{exp.subtitle || 'From Warehouse Feasts To Private Tastings'}</span>
          <h2 className="section-title">{exp.title || 'Special Dining Experiences'}</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Elevated mezzanine lofts, front-row counter seats facing roaring embers, and full warehouse takeovers.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {cards.map((c) => (
            <div
              key={c.id}
              style={{
                backgroundColor: 'var(--color-black-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '2px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-copper)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span
                    style={{
                      background: 'rgba(145, 77, 55, 0.4)',
                      border: '1px solid var(--color-copper)',
                      color: 'var(--color-copper)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '2px',
                      fontWeight: 800,
                    }}
                  >
                    {c.badge}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-concrete)', fontWeight: 600 }}>
                    👥 {c.capacity}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-offwhite)', marginBottom: '0.85rem', textTransform: 'uppercase' }}>
                  {c.title}
                </h3>
                <p style={{ color: 'var(--color-concrete)', fontSize: '0.92rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                  {c.desc}
                </p>
              </div>

              <button
                onClick={() => openReservation(c.title)}
                className="btn-secondary"
                style={{ width: '100%', fontSize: '0.82rem', padding: '0.8rem' }}
              >
                Inquire For This Experience
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

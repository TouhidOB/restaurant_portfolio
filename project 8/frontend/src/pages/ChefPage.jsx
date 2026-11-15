import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function ChefPage() {
  const { content, openReservation } = useCMS();
  const chef = content?.chef || {};
  const tags = chef.philosophy_tags || ['Open Fire Cooking', 'In-House Whole Animal Butchery', 'Oak & Hickory Wood', 'Zero Shortcuts'];

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
          <span className="section-label">Culinary Fire Leadership</span>
          <h1 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '3.5rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '1.25rem' }}>
            Chef {chef.name || 'Marcus Vance'}
          </h1>
          <p style={{ color: 'var(--color-copper, #B87345)', fontSize: '1.15rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {chef.title || 'Executive Chef & Pitmaster'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4.5rem', alignItems: 'center', marginBottom: '5rem' }}>
          {/* Chef Image */}
          <div>
            <div
              style={{
                borderRadius: '2px',
                overflow: 'hidden',
                border: '2px solid var(--color-brick, #914D37)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
              }}
            >
              <img
                src={chef.image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85'}
                alt={chef.name || 'Chef Marcus Vance'}
                style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>

          {/* Chef Bio & Lineage */}
          <div>
            <span style={{ color: 'var(--color-copper, #B87345)', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginBottom: '0.5rem' }}>
              {chef.experience || '20+ Years Open-Fire Mastery • Culinary Institute Graduate'}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display, Oswald)', fontSize: '2.5rem', textTransform: 'uppercase', marginBottom: '1.5rem', color: 'var(--color-offwhite, #F1EEE7)' }}>
              Master Of Primordial Heat
            </h2>

            <p style={{ color: 'var(--color-concrete, #B7B4AC)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {chef.bio || 'Raised on the smokehouse traditions of the American South and honed in metropolitan wood-fired kitchens from Brooklyn to Austin, Chef Marcus Vance brings an uncompromising reverence for honest meat, prime firewood, and deep culinary technique.'}
            </p>

            {chef.quote && (
              <blockquote
                style={{
                  fontFamily: 'var(--font-editorial, "DM Serif Display", serif)',
                  fontStyle: 'italic',
                  fontSize: '1.3rem',
                  color: 'var(--color-offwhite, #F1EEE7)',
                  borderLeft: '3px solid var(--color-brick, #914D37)',
                  paddingLeft: '1.5rem',
                  lineHeight: '1.6',
                  margin: '2rem 0',
                }}
              >
                "{chef.quote}"
              </blockquote>
            )}

            {/* Philosophy Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.5rem' }}>
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(184, 115, 69, 0.15)',
                    border: '1px solid var(--color-copper, #B87345)',
                    color: 'var(--color-copper, #B87345)',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '2px',
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                  }}
                >
                  ✦ {tag}
                </span>
              ))}
            </div>

            <button onClick={() => openReservation('Chef Pitmaster Counter')} className="btn-primary" style={{ padding: '0.85rem 2rem' }}>
              Book Pitmaster Fire Counter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

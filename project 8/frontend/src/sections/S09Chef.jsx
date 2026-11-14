import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S09Chef() {
  const { content } = useCMS();
  const chef = content?.chef || {};

  return (
    <section id="chef" className="py-section" style={{ backgroundColor: 'var(--color-black)', position: 'relative' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4.5rem', alignItems: 'center' }}>
          {/* Left: Chef Portrait with Copper Industrial Frame */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                borderRadius: '2px',
                overflow: 'hidden',
                border: '2px solid var(--color-brick)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
              }}
            >
              <img
                src={chef.image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=85'}
                alt={chef.name || 'Chef Marcus Vance'}
                style={{ width: '100%', height: '520px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            {/* Title Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                right: '1.5rem',
                background: 'rgba(145, 77, 55, 0.95)',
                border: '1px solid var(--color-copper)',
                padding: '0.6rem 1.25rem',
                borderRadius: '2px',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', color: 'var(--color-offwhite)', fontSize: '1rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Executive Pitmaster
              </div>
            </div>
          </div>

          {/* Right: Bio & Philosophy */}
          <div>
            <span className="section-label">Culinary Fire Leadership</span>
            <h2 className="section-title">{chef.name || 'Marcus Vance'}</h2>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--color-copper)',
                marginBottom: '1.5rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {chef.title || 'Executive Chef & Pitmaster'}
            </div>

            <div className="industrial-divider" />

            <p style={{ color: 'var(--color-offwhite)', fontSize: '1.02rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {chef.bio}
            </p>

            {chef.quote && (
              <blockquote
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontStyle: 'italic',
                  fontSize: '1.25rem',
                  color: 'var(--color-offwhite)',
                  borderLeft: '3px solid var(--color-brick)',
                  paddingLeft: '1.5rem',
                  lineHeight: '1.6',
                  marginBottom: '2rem',
                }}
              >
                "{chef.quote}"
              </blockquote>
            )}

            {/* Philosophy Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
              {(chef.philosophy_tags || ['Open Fire Cooking', 'In-House Whole Animal Butchery', 'Oak & Hickory Wood', 'Zero Shortcuts']).map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(184, 115, 69, 0.15)',
                    border: '1px solid var(--color-copper)',
                    color: 'var(--color-copper)',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 800,
                  }}
                >
                  ✦ {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

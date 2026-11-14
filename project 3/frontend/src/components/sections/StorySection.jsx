import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function StorySection() {
  const { data } = useCMS();
  const section = data.sections?.story || {};

  const milestones = [
    { year: '1988', title: 'The Villa Restored', desc: 'Acquired by the Bellini family, preserving 19th-century limestone arches.' },
    { year: '2004', title: 'Belvedere Cantilever', desc: 'Constructed the floating stone terrace suspended 60 meters above the sea.' },
    { year: '2018', title: 'Michelin Recognition', desc: 'Awarded international gastronomic distinction for zero-mile seafood.' },
    { year: '2026', title: 'Spatial Digital Era', desc: 'Unveiling interactive 3D virtual exploration and decoupled seasonal CMS.' },
  ];

  return (
    <section id="story" className="section-wrapper" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'ARCHITECTURAL HERITAGE'}
          </div>
          <h2 className="section-title">
            {section.title || 'CARVED INTO THE CLIFFSIDE'}
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Founded in 1988 within a restored seaside villa, Aura Marina unites raw limestone geometry with effortless Mediterranean hospitality.'}
          </p>
        </div>

        {/* Narrative & Image Composition */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '50px',
            alignItems: 'center',
            marginBottom: '70px',
          }}
        >
          {/* Dual Layer Architectural Photography */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '88%',
                height: '420px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 12px 35px rgba(23, 74, 99, 0.1)',
                border: '1px solid #D8CCB8',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80"
                alt="Aura Marina Mediterranean Villa Architecture"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Overlapping smaller frame */}
            <div
              style={{
                position: 'absolute',
                bottom: '-25px',
                right: '0',
                width: '56%',
                height: '240px',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 16px 40px rgba(0, 0, 0, 0.15)',
                border: '4px solid #FAF9F5',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
                alt="Whitewashed Mediterranean Colonnade"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Text Essay */}
          <div>
            <h3
              style={{
                fontSize: '2.2rem',
                fontFamily: 'var(--font-serif)',
                color: '#174A63',
                marginBottom: '20px',
                lineHeight: 1.2,
              }}
            >
              Where Raw Limestone Meets The Gentle Tyrrhenian Breeze
            </h3>
            <p style={{ fontSize: '1.05rem', color: '#4A4E4D', lineHeight: 1.7, marginBottom: '18px' }}>
              Perched high upon the dramatic sheer cliffs of Positano, Aura Marina is an architectural sanctuary designed around natural illumination, cross-ventilating sea breezes, and native Italian materials.
            </p>
            <p style={{ fontSize: '1.05rem', color: '#4A4E4D', lineHeight: 1.7, marginBottom: '28px' }}>
              Hand-hewn travertine floor slabs, hand-troweled lime plaster arches, and chestnut wood pergolas blend effortlessly into the coastal geology. Here, the boundaries between the restaurant and the sea dissolve, inviting guests into a tranquil cadence shaped by the rising and setting sun.
            </p>

            <div style={{ display: 'flex', gap: '30px', borderTop: '1px solid #E8D9C2', paddingTop: '20px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: '#174A63' }}>
                  60m
                </span>
                <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8C8981' }}>
                  Suspended Above Sea
                </span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: '#174A63' }}>
                  100%
                </span>
                <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8C8981' }}>
                  Artisanal Terracotta
                </span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, color: '#174A63' }}>
                  180°
                </span>
                <span style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8C8981' }}>
                  Unobstructed Horizon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}
        >
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="luxury-card"
              style={{ padding: '24px', background: '#FFFFFF' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  color: '#367E94',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                {m.year}
              </span>
              <h4 style={{ fontSize: '1.25rem', color: '#174A63', marginBottom: '8px' }}>
                {m.title}
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#8C8981', lineHeight: 1.5 }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <section id="story" className="section-wrapper" style={{ backgroundColor: '#FCFBF8' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            {section.badge || 'ARCHITECTURAL HERITAGE'}
          </div>
          <h2 className="section-title">
            Carved into the <em>Cliffside</em>
          </h2>
          <p className="section-subtitle">
            {section.subtitle || 'Founded in 1988 within a restored seaside villa, Aura Marina unites raw limestone geometry with effortless Mediterranean hospitality.'}
          </p>
        </div>

        {/* Narrative & Arched Image Composition */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '60px',
            alignItems: 'center',
            marginBottom: '80px',
          }}
        >
          {/* Dual Layer Architectural Arched Photography */}
          <div style={{ position: 'relative' }}>
            {/* Monumental Arch Frame */}
            <div
              className="arch-frame"
              style={{
                width: '88%',
                height: '460px',
                position: 'relative',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=80"
                alt="Aura Marina Mediterranean Villa Architecture"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8, 23, 33, 0.4) 0%, transparent 40%)',
                }}
              />
            </div>

            {/* Overlapping Smaller Secondary Arch Frame */}
            <div
              className="arch-frame"
              style={{
                position: 'absolute',
                bottom: '-30px',
                right: '0',
                width: '58%',
                height: '270px',
                border: '4px solid #FCFBF8',
                boxShadow: '0 20px 50px rgba(8, 23, 33, 0.2)',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80"
                alt="Whitewashed Mediterranean Colonnade"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Editorial Essay */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#C5A059',
                display: 'block',
                marginBottom: '12px',
                fontWeight: 600,
              }}
            >
              EST. 1988 • POSITANO CLIFFS
            </span>

            <h3
              style={{
                fontSize: '2.4rem',
                fontFamily: 'var(--font-serif)',
                color: '#081721',
                marginBottom: '20px',
                lineHeight: 1.18,
              }}
            >
              Where Raw Limestone Dissolves Into The Tyrrhenian Sea
            </h3>

            <p style={{ fontSize: '1.08rem', color: '#4A5255', lineHeight: 1.75, marginBottom: '20px' }}>
              Perched high upon the dramatic sheer cliffs of Positano, Aura Marina is an architectural sanctuary designed around natural illumination, cross-ventilating sea breezes, and indigenous southern Italian materials.
            </p>

            <p style={{ fontSize: '1.08rem', color: '#4A5255', lineHeight: 1.75, marginBottom: '32px' }}>
              Hand-hewn travertine floor slabs, hand-troweled lime plaster arches, and chestnut pergolas blend effortlessly into the coastal terrain. Here, the boundary between the restaurant and the sea is merely a whisper of sea breeze.
            </p>

            {/* Micro Stats Strip */}
            <div style={{ display: 'flex', gap: '36px', borderTop: '1px solid rgba(197, 160, 89, 0.3)', paddingTop: '24px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 600, color: '#C5A059' }}>
                  60m
                </span>
                <span style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7A7E80' }}>
                  Cliff Elevation
                </span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 600, color: '#081721' }}>
                  100%
                </span>
                <span style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7A7E80' }}>
                  Bespoke Ceramics
                </span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 600, color: '#081721' }}>
                  180°
                </span>
                <span style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7A7E80' }}>
                  Panoramic Horizon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Heritage Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="luxury-card"
              style={{ padding: '28px 24px' }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  color: '#C5A059',
                  display: 'block',
                  marginBottom: '10px',
                }}
              >
                {m.year}
              </span>
              <h4 style={{ fontSize: '1.3rem', color: '#081721', marginBottom: '8px' }}>
                {m.title}
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#7A7E80', lineHeight: 1.6 }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function S08_Architecture() {
  const { content } = useCMS();
  const archData = content?.editorial_sections?.s08_architecture || {
    badge: "MATERIALITY & CRAFT",
    title: "The Physical Soul of the Villa",
    description: "Every surface at Villa Riviera has been selected for tactile warmth, organic longevity, and historical resonance.",
    materials: [
      {
        name: "Provençal Limestone Arches",
        details: "Chiseled by third-generation stonemasons, these soaring arches create a rhythmic transition between indoor salons and open sea horizon."
      },
      {
        name: "Handmade Terracotta Tiles",
        details: "Kiln-fired in Tuscany, our terracotta courtyard tiles retain daytime sun warmth and release a soothing earthy aroma into the evening air."
      },
      {
        name: "Centuries-Old Olive Wood",
        details: "Reclaimed timber from estate trees that have ended their fruiting cycle, crafted into dining tables and sommelier stations."
      },
      {
        name: "Sea Glass & Patinated Bronze",
        details: "Hand-blown lighting fixtures inspired by sea-tumbled glass, framed in muted architectural bronze."
      }
    ]
  };

  return (
    <section id="architecture" className="editorial-section" style={{ backgroundColor: 'var(--c-limestone-light)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-eyebrow" style={{ display: 'block', marginBottom: '8px' }}>
            {archData.badge}
          </span>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
              color: 'var(--c-navy)',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {archData.title}
          </h2>
          <p style={{ color: '#595752', fontSize: '1rem', lineHeight: 1.7 }}>
            {archData.description}
          </p>
        </div>

        {/* 4 Materials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '28px',
          }}
        >
          {archData.materials && archData.materials.map((mat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '36px 28px',
                border: '1px solid var(--c-border)',
                boxShadow: '0 8px 24px rgba(38, 58, 72, 0.04)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '10px',
                  backgroundColor: 'var(--c-ivory)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  marginBottom: '20px',
                  border: '1px solid var(--c-border)',
                }}
              >
                {idx === 0 ? '🏛️' : idx === 1 ? '🧱' : idx === 2 ? '🪵' : '✨'}
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.45rem',
                  color: 'var(--c-navy)',
                  marginBottom: '12px',
                  lineHeight: 1.25,
                }}
              >
                {mat.name}
              </h3>

              <p style={{ color: '#595752', fontSize: '0.9rem', lineHeight: 1.7 }}>
                {mat.details}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function SpacePage({ onNavigate }) {
  const { content, openReservationModal, openReservation } = useCMS();
  const triggerReservation = openReservation || openReservationModal;
  const archSection = content?.editorial_sections?.s08_architecture || {};
  const materials = archSection.materials || [
    {
      name: "Provençal Limestone Arches",
      details: "Chiseled by third-generation stonemasons, these soaring arches create a rhythmic transition between indoor salons and open sea horizon.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=85"
    },
    {
      name: "Handmade Terracotta Tiles",
      details: "Kiln-fired in Tuscany, our terracotta courtyard tiles retain daytime sun warmth and release a soothing earthy aroma into the evening air.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85"
    },
    {
      name: "Centuries-Old Olive Wood",
      details: "Reclaimed timber from estate trees that have ended their fruiting cycle, crafted into dining tables and sommelier stations.",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=85"
    },
    {
      name: "Sea Glass & Patinated Bronze",
      details: "Hand-blown lighting fixtures inspired by sea-tumbled glass, framed in muted architectural bronze.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=85"
    }
  ];

  return (
    <div style={{ backgroundColor: '#18252E', color: '#F7F3EA', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 58, 72, 0.65) 0%, #18252E 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid rgba(233, 223, 207, 0.2)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span
            style={{
              color: '#B96F4F',
              fontSize: '0.82rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              display: 'inline-block',
              marginBottom: '0.75rem',
            }}
          >
            {archSection.badge || 'MATERIALITY & CRAFT'}
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              letterSpacing: '0.03em',
              color: '#F7F3EA',
              margin: '0.6rem 0 1.25rem',
            }}
          >
            {archSection.title || 'The Physical Soul of the Villa'}
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#B96F4F', margin: '1rem auto' }} />
          <p style={{ color: '#E9DFCF', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {archSection.description || 'Every surface at Villa Riviera has been selected for tactile warmth, organic longevity, and historical resonance with Cap-Ferrat’s coastal crags.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4.5rem auto 6rem', padding: '0 1.5rem' }}>
        {/* Architectural Narrative Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
          {materials.map((mat, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: '#263A48',
                borderRadius: '6px',
                border: '1px solid rgba(233, 223, 207, 0.2)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img
                  src={mat.image || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=85'}
                  alt={mat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    color: '#B96F4F',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                    marginBottom: '0.4rem',
                  }}
                >
                  Element 0{idx + 1}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display, "Cormorant Garamond")',
                    fontSize: '1.6rem',
                    color: '#F7F3EA',
                    marginBottom: '0.85rem',
                  }}
                >
                  {mat.name}
                </h3>
                <p style={{ color: '#E9DFCF', fontSize: '0.92rem', lineHeight: 1.65, flex: 1 }}>
                  {mat.details}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Spatial Tour CTA */}
        <div
          style={{
            backgroundColor: '#263A48',
            borderRadius: '6px',
            border: '1px solid rgba(185, 111, 79, 0.35)',
            padding: '3.5rem 2rem',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display, "Cormorant Garamond")',
              fontSize: '2.4rem',
              color: '#F7F3EA',
              marginBottom: '1rem',
            }}
          >
            Immerse Yourself in 1928 Provençal Grandeur
          </h2>
          <p style={{ color: '#E9DFCF', maxWidth: '650px', margin: '0 auto 2rem', lineHeight: 1.65 }}>
            From morning espresso under the courtyard lemon trees to twilight dinners upon the cantilevered cliffside terrace.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={triggerReservation}
              style={{
                backgroundColor: '#B96F4F',
                color: '#FFFFFF',
                padding: '12px 30px',
                border: 'none',
                borderRadius: '3px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Reserve a Table
            </button>
            <button
              onClick={() => onNavigate && onNavigate('/tour')}
              style={{
                backgroundColor: 'transparent',
                color: '#E9DFCF',
                border: '1px solid rgba(233, 223, 207, 0.35)',
                padding: '12px 28px',
                borderRadius: '3px',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Explore 3D Virtual Tour →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

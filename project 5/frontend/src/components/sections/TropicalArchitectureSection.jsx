import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function TropicalArchitectureSection() {
  const { content } = useCMS();
  const architecture = content?.sections?.tropical_architecture || {};

  const architecturalMaterials = [
    {
      name: 'Reclaimed Teak Timber',
      role: 'Structural Framing & Eaves',
      detail: 'Sourced from heritage maritime structures, kiln-cured and hand-rubbed with natural tung oil to withstand coastal humidity.',
      metric: '45-YEAR AGED'
    },
    {
      name: 'Coral Limestone & Travertine',
      role: 'Foundational Plinths & Floors',
      detail: 'Honed non-slip natural stones that remain pleasantly cool under midday tropical temperatures, framed by crushed river gravel.',
      metric: 'NATURAL TEXTURE'
    },
    {
      name: 'Fluted Low-Iron Glass',
      role: 'Diffusing Enclosures',
      detail: 'Motorized louvered glass panels that open fully during ocean trade winds and filter sharp afternoon sun into warm golden glow.',
      metric: '94% CLARITY'
    },
    {
      name: 'Living Flora Canopy',
      role: 'Acoustic & Microclimate Shield',
      detail: 'Over 180 curated botanical species including silver bismarcks, fiddle-leaf figs, and climbing orchids cooling the ambient dining hall.',
      metric: 'MICROCLIMATE'
    }
  ];

  return (
    <section id="architecture" className="section-shell">
      <div className="container-tropical">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
          }}
        >
          <div style={{ maxWidth: '780px' }}>
            <span className="section-tag">
              {architecture.eyebrow || 'TROPICAL ARCHITECTURE'}
            </span>
            <h2 className="section-heading">
              {architecture.title || 'DESIGNED TO FEEL NATURAL.'}
            </h2>
            <p className="section-lead">
              {architecture.subtitle ||
                'Explore the materials, natural light, and architectural details that shape the atmosphere of our restaurant.'}
            </p>
          </div>

          <div
            style={{
              padding: '0.85rem 1.4rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-botanical)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--sage-mist)',
                display: 'block',
                marginBottom: '0.2rem',
              }}
            >
              ARCHITECTURAL COLLABORATION
            </span>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--accent-citrus)',
              }}
            >
              {architecture?.custom_content?.architect_credit || 'ATELIER VERDANT & PALM DESIGN GROUP // 2022'}
            </span>
          </div>
        </div>

        {/* 4 Materials Breakdown Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem',
          }}
        >
          {architecturalMaterials.map((mat) => (
            <div
              key={mat.name}
              className="tropical-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    className="meta-chip"
                    style={{
                      backgroundColor: 'rgba(188, 113, 83, 0.15)',
                      borderColor: 'var(--accent-terracotta)',
                      color: 'var(--accent-terracotta)',
                    }}
                  >
                    {mat.metric}
                  </span>
                  <span style={{ color: 'var(--botanical-green)' }}>✦</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.65rem',
                    color: 'var(--text-ivory)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {mat.name}
                </h3>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--sage-mist)',
                    display: 'block',
                    marginBottom: '1rem',
                  }}
                >
                  {mat.role}
                </span>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.92rem',
                    color: 'var(--text-sand)',
                    lineHeight: 1.6,
                  }}
                >
                  {mat.detail}
                </p>
              </div>

              <div
                style={{
                  marginTop: '1.75rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-botanical)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--accent-citrus)',
                }}
              >
                SUSTAINABLE HARVEST STANDARD
              </div>
            </div>
          ))}
        </div>

        {/* Big Architectural Photography Feature */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--border-botanical)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.4)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
            alt="Verdant Architectural Interior"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '520px',
              objectFit: 'cover',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '2.5rem',
              background: 'linear-gradient(to top, rgba(26, 47, 37, 0.95) 0%, rgba(26, 47, 37, 0.4) 60%, transparent 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--accent-citrus)',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                FEATURED SPATIAL PERSPECTIVE
              </span>
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  color: 'var(--text-ivory)',
                }}
              >
                The Acoustic Reflection Pool & Timber Sanctuary
              </h4>
            </div>

            <a href="#tour" className="btn-terracotta" style={{ padding: '0.75rem 1.75rem', fontSize: '0.85rem' }}>
              <span>EXPLORE VIA 3D TOUR</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

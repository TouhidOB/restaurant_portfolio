import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function DinerArchitectureSection() {
  const { content } = useCMS();
  const architecture = content?.sections?.diner_architecture || {};

  const architecturalMaterials = [
    {
      name: 'Polished Chrome & Trim',
      role: 'Streamline Modern Edging',
      detail: 'Aerodynamic ribbed bumpers and mirror-finish steel trims inspired by 1950s commercial aviation and classic American muscle cars.',
      metric: 'AERODYNAMIC'
    },
    {
      name: 'Red Leather & Cream Vinyl',
      role: 'Tufted Booth Seating',
      detail: 'Commercial heavy-gauge vinyl with deep channel-tufted cushions, engineered for hours of relaxed dining and late-night comfort.',
      metric: 'HAND-STITCHED'
    },
    {
      name: 'Checkerboard Ceramic Tile',
      role: 'Foundational Flooring',
      detail: 'Classic monochrome high-gloss tiles reflecting glowing neon signs and counter reflections across the entire main hall.',
      metric: 'TIMELESS MONOCHROME'
    },
    {
      name: 'Hand-Bent Neon Glass',
      role: 'Atmospheric Illumination',
      detail: 'Custom argon and neon glass tubing shaped by heritage glassblowers in cherry red, neon cyan, and atomic yellow.',
      metric: 'HAND-BLOWN'
    }
  ];

  return (
    <section id="architecture" className="section-shell">
      <div className="container-diner">
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
              {architecture.eyebrow || 'DINER ARCHITECTURE & INTERIOR'}
            </span>
            <h2 className="section-heading">
              {architecture.title || 'DESIGNED TO STAND OUT.'}
            </h2>
            <p className="section-lead">
              {architecture.subtitle ||
                'Explore the colors, materials, lighting, and details that shape the retro-futuristic character of our diner.'}
            </p>
          </div>

          <div
            style={{
              padding: '0.85rem 1.4rem',
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-diner)',
              borderRadius: 'var(--radius-xs)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: '0.2rem',
              }}
            >
              DESIGN & ATOMIC IDENTITY
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--neon-cyan)',
              }}
            >
              {architecture?.custom_content?.designer_credit || 'STUDIO ATOMICA & CHROME INTERIORS // 1955 / 2026'}
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
              className="diner-card"
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
                      backgroundColor: 'rgba(216, 58, 69, 0.15)',
                      borderColor: 'var(--cherry-red)',
                      color: 'var(--cherry-red)',
                    }}
                  >
                    {mat.metric}
                  </span>
                  <span style={{ color: 'var(--neon-cyan)' }}>★</span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.65rem',
                    color: '#FFFFFF',
                    marginBottom: '0.35rem',
                  }}
                >
                  {mat.name}
                </h3>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--neon-cyan)',
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
                    color: 'var(--text-cream)',
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
                  borderTop: '1px solid var(--border-diner)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--atomic-yellow)',
                }}
              >
                GENUINE MID-CENTURY CRAFT
              </div>
            </div>
          ))}
        </div>

        {/* Big Photography Showcase */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-sm)',
            overflow: 'hidden',
            border: '1px solid var(--border-diner)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
            alt="Stardust Diner Chrome Counter"
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
              background: 'linear-gradient(to top, rgba(9, 15, 27, 0.95) 0%, rgba(9, 15, 27, 0.4) 60%, transparent 100%)',
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
                  color: 'var(--neon-cyan)',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                FEATURED ARCHITECTURAL ZONE
              </span>
              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  color: '#FFFFFF',
                }}
              >
                The 40-Foot Stainless Steel Counter & Swivel Stools
              </h4>
            </div>

            <a href="#tour" className="btn-cherry" style={{ padding: '0.75rem 1.75rem', fontSize: '0.85rem' }}>
              <span>EXPLORE VIA 3D TOUR</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

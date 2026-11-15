import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function InteriorPage({ onNavigateHome, onOpenReservation }) {
  const { content, openLightbox } = useCMS();
  const gallery = content.gallery || [];

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
    <div style={{ paddingTop: 'calc(var(--header-height, 80px) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: '#1A2F25', color: '#F6F2E9' }}>
      <div className="container-tropical">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: '#AAB9A0', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'rgba(170, 185, 160, 0.4)' }}>/</span>
          <span style={{ color: '#BC7153' }}>05. TROPICAL ARCHITECTURE</span>
        </div>

        {/* Hero Header */}
        <div style={{ borderBottom: '1px solid rgba(170, 185, 160, 0.3)', paddingBottom: '2.5rem', marginBottom: '3.5rem' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            SPATIAL PHILOSOPHY &bull; TROPICAL MODERNISM
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '0.5rem 0 1rem' }}>
            DESIGNED TO FEEL NATURAL.
          </h1>
          <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#AAB9A0', maxWidth: '820px', lineHeight: 1.6 }}>
            Explore the materials, natural cross-ventilation, and architectural details that shape the atmosphere of Verdant. Open-air pavilions framed by broad-leaf palms and warm sunlight.
          </p>
        </div>

        {/* Material Palette Grid */}
        <div style={{ marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            MATERIAL HONESTY
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', fontWeight: 700, margin: '0.5rem 0 2.5rem' }}>
            THE ARCHITECTURAL ELEMENTS
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {architecturalMaterials.map((mat, idx) => (
              <div key={idx} style={{ background: '#243F32', border: '1px solid rgba(170, 185, 160, 0.25)', borderRadius: '8px', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#D9B84E', background: 'rgba(217, 184, 78, 0.15)', padding: '3px 8px', borderRadius: '3px' }}>
                    {mat.metric}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#AAB9A0' }}>
                    ELEMENT 0{idx + 1}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '1.4rem', fontWeight: 700, color: '#F6F2E9', marginBottom: '0.35rem' }}>
                  {mat.name}
                </h3>
                <h4 style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', marginBottom: '0.85rem' }}>
                  {mat.role}
                </h4>
                <p style={{ color: '#E5D7C2', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {mat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Visual Grid */}
        <div style={{ borderTop: '1px solid rgba(170, 185, 160, 0.3)', paddingTop: '3.5rem', marginBottom: '4rem' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#BC7153', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
            VISUAL ARCHIVE
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2.2rem', fontWeight: 700, margin: '0.5rem 0 2rem' }}>
            LIGHT &amp; BOTANICAL SPACES
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {gallery.map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => openLightbox && openLightbox(img)}
                style={{
                  position: 'relative',
                  height: '240px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(170, 185, 160, 0.25)',
                }}
              >
                <img
                  src={img.image_url}
                  alt={img.caption || img.title || 'Verdant Space'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.75rem 1rem', background: 'linear-gradient(transparent, rgba(26, 47, 37, 0.9))', color: '#F6F2E9', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem' }}>
                  {img.caption || img.title || 'Canopy Perspective'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spatial CTA */}
        <div style={{ background: '#243F32', border: '1px solid #BC7153', borderRadius: '8px', padding: '3.5rem 2rem', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-serif, serif)', fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            EXPLORE THE RESTAURANT IN 3D
          </h3>
          <p style={{ fontFamily: 'var(--font-sans, sans-serif)', fontSize: '0.95rem', color: '#AAB9A0', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            Step through all four architectural viewpoints including our Main Pavilion, Glasshouse Canopy, and Palm Terrace.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                window.history.pushState({}, '', '/tour');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              style={{
                padding: '0.85rem 2.2rem',
                background: '#BC7153',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              LAUNCH 3D SPATIAL TOUR &rarr;
            </button>
            <button
              onClick={onOpenReservation}
              style={{
                padding: '0.85rem 2.2rem',
                background: 'transparent',
                border: '1px solid rgba(170, 185, 160, 0.4)',
                borderRadius: '4px',
                color: '#F6F2E9',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              BOOK A TABLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

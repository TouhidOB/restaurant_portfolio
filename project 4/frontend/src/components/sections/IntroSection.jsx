import React from 'react';
import { useCMS } from '../../context/CMSContext';

export default function IntroSection() {
  const { content } = useCMS();
  const s02 = content.sections?.intro || {};

  return (
    <section id="intro" className="section-shell light-theme">
      <div className="container-brutal">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(2.5rem, 5vw, 5rem)', alignItems: 'center' }}>
          {/* Left Column: Editorial Manifesto */}
          <div>
            <div className="section-tag" style={{ border: '1px solid #20211F', color: '#20211F' }}>
              SECTION 02 // {s02.eyebrow || 'EDITORIAL INTRODUCTION'}
            </div>
            
            <h2
              className="section-heading"
              style={{ color: '#20211F', marginBottom: '1.5rem' }}
            >
              {s02.title || 'NOT JUST A PLACE TO EAT.'}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
                lineHeight: 1.4,
                color: '#20211F',
                fontWeight: 600,
                marginBottom: '1.5rem',
              }}
            >
              {s02.subtitle || 'A sensory intersection of architectural weight and culinary levity.'}
            </p>

            <p style={{ color: '#4A4D48', fontSize: '1rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              {s02.custom_content?.paragraph_1 || 'Monolith was conceived as an antithesis to ephemeral dining trends. We stripped away decorative distraction to reveal the tension between cast-in-place concrete and fire-rendered flavor.'}
            </p>

            <p style={{ color: '#4A4D48', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              {s02.custom_content?.paragraph_2 || 'Every plate is treated as a sculptural proposition: stark contrasts in texture, unvarnished natural acids, and charcoal minerality, orchestrated inside an acoustic sanctuary of board-formed concrete.'}
            </p>

            <div
              style={{
                display: 'inline-block',
                background: '#20211F',
                color: '#F1F0EA',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.4rem 0.8rem',
                letterSpacing: '0.05em',
              }}
            >
              {s02.custom_content?.badge || 'ARCHITECTURAL MANIFESTO // 01'}
            </div>
          </div>

          {/* Right Column: Visual Composition with Board-formed Concrete & Plating */}
          <div style={{ position: 'relative' }}>
            <div style={{ border: '2px solid #20211F', padding: '1rem', background: '#E2E0D8' }}>
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80"
                alt="Monolith Interior Architecture"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#4A4D48',
                }}
              >
                <span>FIG 01. MONOLITHIC AXIAL HALL</span>
                <span style={{ fontWeight: 700, color: '#20211F' }}>SECTOR 09</span>
              </div>
            </div>

            {/* Floating Brutalist Spec Tag */}
            <div
              style={{
                position: 'absolute',
                bottom: '-1.5rem',
                right: '1.5rem',
                background: 'var(--accent-orange)',
                color: '#000',
                padding: '0.75rem 1.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                boxShadow: '4px 4px 0px #20211F',
              }}
            >
              RAW CONCRETE &bull; 800°C WOOD FIRE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

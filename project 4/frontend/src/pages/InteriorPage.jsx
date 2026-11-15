import React from 'react';
import { useCMS } from '../context/CMSContext';

export default function InteriorPage({ onNavigateHome, onOpenReservation }) {
  const { content, openLightbox } = useCMS();
  const gallery = content.gallery || [];
  const architecturalImages = gallery.filter(g => g.category === 'interior' || g.category === 'exterior' || g.category === 'details');

  return (
    <div style={{ paddingTop: 'calc(var(--header-height) + 3rem)', paddingBottom: '6rem', minHeight: '100vh', backgroundColor: 'var(--bg-dark)' }}>
      <div className="container-brutal">
        {/* Navigation Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          <button onClick={onNavigateHome} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}>
            INDEX
          </button>
          <span style={{ color: 'var(--border-light)' }}>/</span>
          <span style={{ color: 'var(--accent-orange)' }}>07. ARCHITECTURE &amp; SPACE</span>
        </div>

        {/* Hero Header */}
        <div style={{ borderBottom: '2px solid var(--border-steel)', paddingBottom: '2.5rem', marginBottom: '3.5rem' }}>
          <span className="section-tag">SPATIAL ENGINEERING &bull; BRUTALIST CONCRETE</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, marginTop: '0.75rem', textTransform: 'uppercase' }}>
            THE ARCHITECTURE.
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 2vw, 1.15rem)', color: 'var(--accent-orange)', marginTop: '1rem', maxWidth: '800px', lineHeight: 1.6 }}>
            Constructed with board-formed concrete, flamed basalt monoliths, and blackened plate steel in District 09.
          </p>
        </div>

        {/* Spatial Specifications Matrix */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '1.75rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-orange)', marginBottom: '0.5rem' }}>
              MATERIAL 01
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              BOARD-FORMED CONCRETE
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Poured in-situ with rough-sawn Douglas fir forms. Natural wood grain transfers directly to the mineral matrix.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '1.75rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-orange)', marginBottom: '0.5rem' }}>
              MATERIAL 02
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              RAW VOLCANIC BASALT
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Sourced from Pacific tectonic flows. Tables cut from solid 3-ton monolithic blocks and flamed for subtle texture.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '1.75rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-orange)', marginBottom: '0.5rem' }}>
              MATERIAL 03
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              BLACKENED STEEL PORTALS
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              1/2-inch cold-rolled steel treated with hot beeswax patination to resist corrosion while preserving industrial honesty.
            </p>
          </div>

          <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-steel)', padding: '1.75rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-orange)', marginBottom: '0.5rem' }}>
              ACOUSTIC PROFILE
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              58 DB ACOUSTIC SOLITUDE
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Concealed sound traps behind concrete baffles drop ambient dining reverberation to an intimate conversational quiet.
            </p>
          </div>
        </div>

        {/* Architectural Photo Archive Grid */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            SPATIAL PHOTOGRAPHY ARCHIVE
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {architecturalImages.map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => openLightbox && openLightbox(img)}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-steel)',
                  cursor: 'pointer',
                  position: 'relative',
                  height: '240px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={img.image_url}
                  alt={img.title || img.caption}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', background: 'rgba(32,33,31,0.9)', padding: '0.5rem 0.75rem', border: '1px solid var(--border-steel)' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent-orange)', textTransform: 'uppercase' }}>
                    {img.category}
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                    {img.title || img.caption}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--accent-orange)', padding: '2.5rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            VISIT MONOLITH IN PERSON
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
            Located in District 09, New York. Open Tuesday through Sunday for Lunch and Dinner shifts.
          </p>
          <button onClick={onOpenReservation} className="btn-orange" style={{ padding: '0.75rem 2.5rem' }}>
            REQUEST RESERVATION &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

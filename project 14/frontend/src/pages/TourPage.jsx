import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function TourPage({ onNavigate }) {
  const { data, openReservation, openReservationModal, setLightboxImage } = useCMS();
  const triggerReservation = openReservationModal || openReservation;
  const viewpoints = data?.viewpoints || [];
  const [activeVp, setActiveVp] = useState(viewpoints[0] || null);

  return (
    <div style={{ backgroundColor: 'var(--color-obsidian)', color: 'var(--color-ivory)', minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Header */}
      <section style={{ padding: '80px 0 60px 0', borderBottom: '1px solid var(--border-subtle)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', left: '15%', width: '450px', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(148, 115, 79, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="section-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '820px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'inline-block', marginBottom: '12px' }}>
            VIRTUAL SPATIAL EXPLORER
          </span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 5vw, 4.2rem)', fontWeight: 600, lineHeight: 1.15, marginBottom: '18px', color: 'var(--color-ivory)' }}>
            3D Spatial Tour & Architecture
          </h1>
          <div style={{ width: '60px', height: '2px', background: 'var(--color-bronze)', margin: '0 auto 24px auto' }} />
          <p style={{ color: 'var(--color-taupe)', fontSize: '1.15rem', lineHeight: 1.8 }}>
            Immerse yourself in our dark luxury dining room: dark basalt monoliths, Argentine hearth coals, and the climate-controlled reserve wine vault.
          </p>
        </div>
      </section>

      {/* Main Interactive Stage */}
      {activeVp && (
        <section style={{ padding: '70px 0', backgroundColor: 'var(--color-charcoal)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '40px', alignItems: 'center' }}>
              
              <div
                style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-subtle)', height: '440px', position: 'relative', boxShadow: '0 25px 60px rgba(0,0,0,0.85)', cursor: 'pointer' }}
                onClick={() => setLightboxImage && setLightboxImage(activeVp.image || activeVp.image_url)}
              >
                <img
                  src={activeVp.image || activeVp.image_url}
                  alt={activeVp.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', bottom: '16px', right: '16px', background: 'rgba(16, 16, 16, 0.85)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '2px', border: '1px solid var(--border-subtle)', fontSize: '11px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Click to Expand ↗
                </div>
              </div>

              <div>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-champagne)', fontFamily: 'var(--font-heading)', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                  {activeVp.subtitle || "FEATURED PERSPECTIVE"}
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.6rem', color: 'var(--color-ivory)', marginBottom: '18px', lineHeight: 1.2 }}>
                  {activeVp.title}
                </h2>
                <p style={{ color: 'var(--color-taupe)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '32px' }}>
                  {activeVp.description}
                </p>
                <button
                  onClick={() => triggerReservation(activeVp.title)}
                  style={{ padding: '14px 34px', background: 'var(--color-bronze)', border: 'none', borderRadius: '2px', color: '#101010', fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}
                >
                  Reserve Table in This Zone
                </button>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Viewpoint Selector Thumbnails */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-obsidian)' }}>
        <div className="section-container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-ivory)' }}>
              Explore All 5 Spatial Viewpoints
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {viewpoints.map((vp) => {
              const isActive = activeVp && activeVp.id === vp.id;
              return (
                <div
                  key={vp.id}
                  onClick={() => setActiveVp(vp)}
                  style={{
                    background: 'var(--color-charcoal)',
                    border: isActive ? '1px solid var(--color-champagne)' : '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 0 20px rgba(196, 168, 120, 0.25)' : 'none',
                    transition: 'all 0.25s'
                  }}
                >
                  <div style={{ height: '140px', overflow: 'hidden' }}>
                    <img src={vp.image || vp.image_url} alt={vp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-bronze)', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                      VIEWPOINT 0{vp.id}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '16px', color: 'var(--color-ivory)', marginTop: '4px', fontWeight: 600 }}>
                      {vp.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

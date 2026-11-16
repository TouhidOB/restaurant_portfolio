import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';

export default function TourPage() {
  const { content, openReservation } = useCMS();
  const tour = content?.virtualTour || {};
  const viewpoints = tour.viewpoints || [];
  const [activeVp, setActiveVp] = useState(0);

  const current = viewpoints[activeVp] || viewpoints[0] || {};

  return (
    <div style={{ backgroundColor: 'var(--color-midnight-dark, #0a121d)', color: 'var(--color-cloud-ivory, #F3F0E9)', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Header Banner */}
      <div
        style={{
          background: 'linear-gradient(180deg, rgba(38, 63, 90, 0.45) 0%, var(--color-midnight-dark, #0a121d) 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto' }}>
          <span className="section-label">{tour.subtitle || 'Ascend Through 5 Architectural Viewpoints'}</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem', letterSpacing: '0.04em', color: 'var(--color-champagne)', margin: '0.8rem 0 1.25rem' }}>
            {tour.title || 'Skyline Rooftop Virtual Tour'}
          </h1>
          <div className="horizon-divider horizon-divider-center" />
          <p style={{ color: 'var(--color-twilight-slate)', fontSize: '1.15rem', lineHeight: 1.7, marginTop: '1.25rem' }}>
            {tour.description || 'Experience our rooftop architecture in immersive spatial dimensions, from the high-speed elevator arrival to the cantilevered sunset terrace.'}
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1140px', margin: '4rem auto', padding: '0 1.5rem' }}>
        {/* Interactive Viewpoint Browser */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {viewpoints.map((vp, idx) => (
                <button
                  key={vp.id || idx}
                  onClick={() => setActiveVp(idx)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    border: activeVp === idx ? '1px solid var(--color-champagne)' : '1px solid var(--color-border)',
                    background: activeVp === idx ? 'var(--color-champagne)' : 'rgba(16, 28, 44, 0.7)',
                    color: activeVp === idx ? 'var(--color-midnight-dark)' : 'var(--color-cloud-ivory)',
                    fontFamily: 'var(--font-accent)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {vp.number || `0${idx + 1}`} • {vp.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <span className="section-label" style={{ fontSize: '0.75rem', marginBottom: '0.4rem' }}>
              ZONE {current.number || '01'} &bull; ARCHITECTURAL CADENCE
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.4rem', color: 'var(--color-cloud-ivory)', marginBottom: '1rem' }}>
              {current.name}
            </h2>
            <p style={{ color: 'var(--color-twilight-slate)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {current.description || 'Panoramic floor-to-ceiling ultra-clear glass panels offering uninterrupted 360-degree vistas across the urban sprawl and ocean coastline.'}
            </p>

            <button onClick={() => openReservation()} className="btn-skyline-primary" style={{ padding: '0.85rem 2rem' }}>
              Reserve In This Zone &rarr;
            </button>
          </div>

          <div>
            <div
              style={{
                backgroundColor: 'var(--color-midnight-card)',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                position: 'relative',
                minHeight: '380px',
              }}
            >
              <img
                src={current.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85'}
                alt={current.name}
                style={{ width: '100%', height: '380px', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem 1.5rem',
                  background: 'linear-gradient(to top, rgba(10, 18, 29, 0.95) 0%, transparent 100%)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                }}
              >
                <div>
                  <div style={{ color: 'var(--color-champagne)', fontSize: '0.75rem', fontFamily: 'var(--font-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    SPATIAL VIEWPOINT
                  </div>
                  <div style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>
                    {current.name}
                  </div>
                </div>
                <div style={{ color: 'var(--color-sunset-copper)', fontSize: '0.82rem', fontFamily: 'var(--font-accent)', fontWeight: 700 }}>
                  ELEVATION 220M
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Viewpoint Cards Grid */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '4rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">All Perspectives</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', color: 'var(--color-champagne)' }}>
              Complete 360° Architectural Index
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {viewpoints.map((vp, idx) => (
              <div
                key={idx}
                onClick={() => setActiveVp(idx)}
                style={{
                  backgroundColor: 'var(--color-midnight-card)',
                  border: activeVp === idx ? '1px solid var(--color-champagne)' : '1px solid var(--color-border)',
                  borderRadius: '4px',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ color: 'var(--color-champagne)', fontFamily: 'var(--font-accent)', fontWeight: 700, fontSize: '1.1rem' }}>
                    {vp.number || `0${idx + 1}`}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-twilight-slate)', textTransform: 'uppercase' }}>
                    Perspective
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', color: 'var(--color-cloud-ivory)', marginBottom: '0.5rem' }}>
                  {vp.name}
                </h3>
                <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {vp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

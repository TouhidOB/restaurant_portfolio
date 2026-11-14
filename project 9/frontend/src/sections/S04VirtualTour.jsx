import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import RestaurantTour from '../components/three/RestaurantTour';

export default function S04VirtualTour() {
  const { content, openReservation } = useCMS();
  const tour = content?.virtualTour || {};
  const viewpoints = tour.viewpoints || [];
  const [activeIndex, setActiveIndex] = useState(0);

  const currentView = viewpoints[activeIndex] || viewpoints[0] || {};

  return (
    <section id="tour" className="section-pad" style={{ backgroundColor: 'var(--color-midnight-dark)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">{tour.subtitle || 'Ascend Through 5 Architectural Viewpoints'}</span>
          <h2 className="section-title">{tour.title || 'Skyline Rooftop Virtual Tour'}</h2>
          <div className="horizon-divider horizon-divider-center" />
          <p className="section-subtitle">
            {tour.description ||
              'Experience our rooftop architecture in immersive 3D, from the high-speed elevator arrival to the cantilevered sunset terrace.'}
          </p>
        </div>

        {/* 3D Interactive WebGL Canvas */}
        {viewpoints.length > 0 && (
          <RestaurantTour
            viewpoints={viewpoints}
            activeIndex={activeIndex}
            onSelectViewpoint={setActiveIndex}
          />
        )}

        {/* Current Viewpoint Details Grid */}
        {currentView && (
          <div
            style={{
              marginTop: '2.5rem',
              background: 'var(--color-midnight)',
              border: '1px solid var(--color-border)',
              borderRadius: '4px',
              padding: '2rem 2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: '0.78rem',
                  color: 'var(--color-sunset-copper)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '0.35rem',
                }}
              >
                SPATIAL VIEWPOINT {currentView.number} OF 05
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-cloud-ivory)', marginBottom: '0.6rem' }}>
                {currentView.name}
              </h3>
              <p style={{ color: 'var(--color-twilight-slate)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {currentView.description}
              </p>
            </div>

            {/* Architecture Details Chips */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-accent)', fontSize: '0.78rem', color: 'var(--color-champagne)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem', fontWeight: 700 }}>
                Architectural Specifications
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {currentView.details &&
                  currentView.details.map((det, di) => (
                    <span
                      key={di}
                      style={{
                        padding: '0.4rem 0.85rem',
                        background: 'var(--color-midnight-card)',
                        border: '1px solid var(--color-border-subtle)',
                        borderRadius: '2px',
                        fontSize: '0.8rem',
                        color: 'var(--color-cloud-ivory)',
                      }}
                    >
                      &bull; {det}
                    </span>
                  ))}
              </div>

              <button
                onClick={() => openReservation(currentView.id)}
                className="btn-skyline-primary"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.78rem' }}
              >
                Reserve Table In This Space
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
